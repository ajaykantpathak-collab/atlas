'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C8_HISTCIV_011 = 'c8_histciv_011';
const NODE_C8_HISTCIV_012 = 'c8_histciv_012';
const NODE_C8_HISTCIV_013 = 'c8_histciv_013';
const NODE_C8_HISTCIV_014 = 'c8_histciv_014';
const NODE_C8_HISTCIV_015 = 'c8_histciv_015';
const NODE_C8_HISTCIV_016 = 'c8_histciv_016';
const NODE_C8_HISTCIV_017 = 'c8_histciv_017';
const NODE_C8_HISTCIV_018 = 'c8_histciv_018';
const NODE_C8_HISTCIV_019 = 'c8_histciv_019';
const NODE_C8_HISTCIV_020 = 'c8_histciv_020';

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_011,
  NODE_C8_HISTCIV_012,
  NODE_C8_HISTCIV_013,
  NODE_C8_HISTCIV_014,
  NODE_C8_HISTCIV_015,
  NODE_C8_HISTCIV_016,
  NODE_C8_HISTCIV_017,
  NODE_C8_HISTCIV_018,
  NODE_C8_HISTCIV_019,
  NODE_C8_HISTCIV_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great 18th & 19th Century Pivot: Revolutions, Civil Strife, and the Mughal Power Vacuum',
  intro: 'Between 1600 and 1865, two parallel transformations reshaped the world: in the Atlantic world, thirteen American colonies fought for liberty and later confronted their fatal contradiction over slavery; simultaneously in the Indian subcontinent, the mighty Mughal Empire fractured under imperial overreach, unleashing regional powers and paving the path for English mercantile domination.',
  context: 'As a comparative historian and constitutional archivist, your task is to analyse the strategic, economic, and institutional forces that built modern nations, broke empires, and altered global balance of power.',
};

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Primary Source Detective: Reading the Revolution',
  description:
    'Work like a real historian: pull up the US Declaration of Independence (1776) and the Gettysburg Address (1863) online or in a library, and compare their promises against the events you just explored.',
  steps: [
    'List three grievances the Declaration levels at King George III and match each to an event from the timeline (taxation, quartering, blocked trade).',
    'In the Gettysburg Address, find the phrase redefining the war’s purpose and write one sentence on how it connects back to 1776.',
    'On a map of India circa 1760, shade the regions where Mughal authority had collapsed and mark where the East India Company moved in first.',
    'Write a 4-line comparison: what did the colonies gain from revolution that the Indian subcontinent lost during the same century?',
  ],
};

// ─── DISCOVERY QUESTION (HOOK) ───
const DISCOVERY_QUESTION = {
  question: 'In 1775-1776, American colonists fired "the shot heard round the world" and declared independence. Did the Declaration of Independence happen at the immediate outbreak of the war?',
  options: [
    'Yes — colonists declared independence on the very day fighting began at Lexington in April 1775',
    'No — they fought for over a year defending rights as British subjects before declaring independence on 4 July 1776',
    'No — independence was declared only after the war ended at Yorktown in 1781',
    'Yes — George Washington drafted the Declaration before taking military command',
  ],
  correctIndex: 1,
  hintAfter: 'Curious nuance! The war began on 19 April 1775, but the Declaration of Independence was adopted over a year later on 4 July 1776 after peaceful reconciliation failed.',
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
    question: 'What do you observe about the relationship between "no taxation without representation" and the American Revolution?',
    observableOptions: [
      'British taxation without colonial representation in Parliament directly fueled revolutionary sentiment (✓)',
      'Taxation had no role in the revolution (✗)',
      'Colonists wanted higher taxes (✗)',
      'Parliament granted full representation before the revolution (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When comparing the American and French Revolutions, what shared underlying cause emerges?',
    observableOptions: [
      'Both were driven by Enlightenment ideas and opposition to arbitrary monarchical authority (✓)',
      'Both were caused solely by weather (✗)',
      'Both were purely economic with no ideological basis (✗)',
      'Both were started by the same person (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. NODE 011 - Foundation - Recall
  {
    id: 'ch_hist_001',
    nodeId: NODE_C8_HISTCIV_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and on what exact date did the first military clash of the American War of Independence occur ("the shot heard round the world")?',
    options: [
      'Philadelphia on 4 July 1776',
      'Lexington and Concord on 19 April 1775',
      'Saratoga on 17 October 1777',
      'Yorktown on 19 October 1781',
    ],
    correctIndex: 1,
    explanation: 'The war began on 19 April 1775 at Lexington and Concord in Massachusetts when British regulars marched to seize colonial munitions and clashed with armed colonial Minutemen.',
    hints: [
      'Think about the Massachusetts village green where Minutemen gathered.',
      'It happened in the spring of 1775, over a year before the Declaration of Independence.',
      'The exact date is 19 April 1775 at Lexington and Concord.',
    ],
    misconceptionIndex: 0,
  },
  // 2. NODE 011 - Drag-label - Understanding
  {
    id: 'ch_hist_002',
    nodeId: NODE_C8_HISTCIV_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the key milestones of the American Revolution to their respective historical significance.',
    dragItems: [
      { label: 'Outbreak of War (Minutemen)', targetId: 'milestone_lexington' },
      { label: 'Declaration of Independence (Jefferson)', targetId: 'milestone_philly' },
      { label: 'Turning Point bringing French Alliance', targetId: 'milestone_saratoga' },
      { label: 'Final Decisive Siege & Surrender', targetId: 'milestone_yorktown' },
    ],
    correctMapping: {
      milestone_lexington: 'Outbreak of War (Minutemen)',
      milestone_philly: 'Declaration of Independence (Jefferson)',
      milestone_saratoga: 'Turning Point bringing French Alliance',
      milestone_yorktown: 'Final Decisive Siege & Surrender',
    },
    explanation: 'Lexington (1775) started fighting, Philadelphia (1776) birthed the republic, Saratoga (1777) secured the French alliance, and Yorktown (1781) forced Cornwallis to surrender.',
    hints: [
      'Where was the Declaration drafted? (Philadelphia).',
      'Which battle in New York convinced King Louis XVI of France to send troops and navy? (Saratoga).',
      'Yorktown was where Cornwallis was trapped by Washington and the French fleet.',
    ],
    misconceptionIndex: 1,
  },
  // 3. NODE 011 - Standard - Analysis
  {
    id: 'ch_hist_003',
    nodeId: NODE_C8_HISTCIV_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Battle of Saratoga (October 1777) categorized by historians as the pivotal turning point rather than Yorktown (1781)?',
    options: [
      'Because the British King surrendered immediately following Saratoga',
      'Because Saratoga convinced France to enter the war as an official American ally with money, troops, and naval power',
      'Because Saratoga was the only battle fought on colonial soil',
      'Because George Washington was captured and then released after Saratoga',
    ],
    correctIndex: 1,
    explanation: 'The American victory over General Burgoyne at Saratoga proved that the colonists could defeat a major British field army, persuading France to sign the 1778 alliance and supply indispensable naval supremacy.',
    hints: [
      'Look at international diplomatic intervention.',
      'France was waiting for concrete proof that Americans could win before committing their navy.',
      'Saratoga brought French entry in 1778, which made the victory at Yorktown possible.',
    ],
    misconceptionIndex: 1,
  },
  // 4. NODE 012 - Foundation - Recall
  {
    id: 'ch_hist_004',
    nodeId: NODE_C8_HISTCIV_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following statistics accurately portrays the structural economic divide between the US North and South by 1860?',
    options: [
      'North had 18,000 factories; South had 110,000 factories with 4 million wage earners',
      'North had over 110,000 factories (1.3M workers); South had 18,000 factories and ~4 million enslaved people',
      'Both regions were equally agrarian with identical factory counts',
      'The South produced 97% of firearms while the North relied on cotton exports',
    ],
    correctIndex: 1,
    explanation: 'By 1860, the industrial North boasted over 110,000 manufacturing factories with 1.3 million wage workers, whereas the agrarian South operated only 18,000 factories and rested entirely on cotton plantations worked by ~4 million enslaved African Americans.',
    hints: [
      'The North was heavily industrialised and favoured protective tariffs.',
      'The South was agrarian, export-oriented (King Cotton), and dependent on enslaved labour.',
      'North: 110k+ factories vs South: 18k factories.',
    ],
  },
  // 5. NODE 012 - Standard - Understanding
  {
    id: 'ch_hist_005',
    nodeId: NODE_C8_HISTCIV_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did the protective tariff issue create diametrically opposed economic interests between Northern and Southern states?',
    options: [
      'Tariffs taxed cotton exports, devastating Northern fabric mills',
      'Tariffs shielded Northern manufactured goods from British competition but raised import prices and risked retaliatory duties on Southern cotton',
      'Tariffs eliminated all taxes on western lands under the Homestead Act',
      'Tariffs forced the South to industrialise faster than the North',
    ],
    correctIndex: 1,
    explanation: 'Protective tariffs raised the price of foreign imports, allowing Northern factories to flourish without British competition, but forced the agrarian South to pay higher prices for manufactured goods while endangering European demand for their exported raw cotton.',
    hints: [
      'Who manufactured goods? (North). Who bought manufactured goods from abroad? (South).',
      'Tariffs protect domestic producers but harm import-dependent agrarian exporters.',
      'The North wanted high tariffs; the South demanded free trade.',
    ],
  },
  // 6. NODE 012 - Standard - Application
  {
    id: 'ch_hist_006',
    nodeId: NODE_C8_HISTCIV_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A newly organized US territory in 1854 prepares to vote on permitting slavery under the doctrine of "popular sovereignty." Which legislation authorized this vote and what immediate crisis did it trigger?',
    options: [
      'Missouri Compromise of 1820 -> Nullification Crisis',
      'Kansas-Nebraska Act of 1854 -> "Bleeding Kansas" armed clashes',
      'Treaty of Paris 1783 -> Shay\'s Rebellion',
      'Homestead Act of 1862 -> Secession of South Carolina',
    ],
    correctIndex: 1,
    explanation: 'The Kansas-Nebraska Act of 1854 overturned the geographic 36°30\' line of the 1820 Missouri Compromise by introducing popular sovereignty, causing pro- and anti-slavery partisans to flood into Kansas and trigger the violent guerrilla conflict known as "Bleeding Kansas."',
    hints: [
      'Think of the act named after two Great Plains territories.',
      'It replaced a fixed geographic latitude line with a local vote.',
      'The resulting armed violence was called "Bleeding Kansas".',
    ],
    misconceptionIndex: 2,
  },
  // 7. NODE 013 - Foundation - Recall
  {
    id: 'ch_hist_007',
    nodeId: NODE_C8_HISTCIV_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many words did Abraham Lincoln deliver in the iconic Gettysburg Address on 19 November 1863 (in contrast to Edward Everett\'s 2-hour speech)?',
    correctAnswer: 272,
    tolerance: 5,
    unit: 'words',
    explanation: 'Abraham Lincoln delivered the Gettysburg Address in just 272 words over approximately two minutes, defining American democracy as "government of the people, by the people, for the people."',
    hints: [
      'The speech was famously brief — delivered in about two minutes.',
      'It is between 260 and 280 words.',
      'The exact historical count is 272 words.',
    ],
  },
  // 8. NODE 013 - Standard - Analysis
  {
    id: 'ch_hist_008',
    nodeId: NODE_C8_HISTCIV_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Lincoln\'s Emancipation Proclamation (1 January 1863) deliberately EXCLUDE the four loyal Union border states (Maryland, Kentucky, Missouri, Delaware)?',
    options: [
      'Because slavery had already been abolished in those states by state referendum',
      'Because it was issued under commander-in-chief wartime powers against rebel territory, and Lincoln feared pushing loyal border states into the Confederacy',
      'Because the Supreme Court had declared border states immune from federal executive orders',
      'Because Lincoln intended to keep slavery permanently in the North',
    ],
    correctIndex: 1,
    explanation: 'The Proclamation was a military measure targeting the rebellion. Lincoln lacked constitutional authority to confiscate property in loyal states during peace, and alienating border states like Maryland would have geographically isolated the capital, Washington D.C.',
    hints: [
      'Think of Lincoln\'s constitutional limits and geographic danger to Washington D.C.',
      'The border states were loyal to the Union but held ~500,000 enslaved people.',
      'Universal abolition required a constitutional amendment (the 13th Amendment in 1865).',
    ],
    misconceptionIndex: 0,
  },
  // 9. NODE 014 - Drag-sort - Sequence
  {
    id: 'ch_hist_009',
    nodeId: NODE_C8_HISTCIV_014,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the Reconstruction Amendments and Civil War concluding milestones in chronological order:',
    sortItems: [
      'Homestead Act enacted (160 acres western land)',
      'Lee surrenders at Appomattox & Lincoln assassinated (April 1865)',
      '13th Amendment ratified (Abolition of slavery everywhere)',
      '14th Amendment ratified (Citizenship & Equal Protection)',
      '15th Amendment ratified (Voting rights regardless of race)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Homestead Act (1862) -> Appomattox/Assassination (April 1865) -> 13th Amendment (Dec 1865) -> 14th Amendment (July 1868) -> 15th Amendment (Feb 1870).',
    hints: [
      'The Homestead Act was passed during the war in 1862.',
      'The surrender and assassination occurred in April 1865.',
      'The amendments are in numerical order: 13th (1865), 14th (1868), 15th (1870).',
    ],
  },
  // 10. NODE 014 - Advanced - Evaluation
  {
    id: 'ch_hist_010',
    nodeId: NODE_C8_HISTCIV_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do constitutional historians characterize the post-Civil War outcome as a "decisive structural transformation but an incomplete social revolution"?',
    options: [
      'Because the South immediately recovered all its pre-war wealth and factories',
      'Because while slavery and secession were permanently eradicated, Jim Crow laws, poll taxes, and literacy tests disenfranchised Black Americans for another century',
      'Because the 13th Amendment was repealed by the Supreme Court in 1877',
      'Because the federal government surrendered its supremacy back to the states',
    ],
    correctIndex: 1,
    explanation: 'The war permanently established federal supremacy and abolished slavery, but the withdrawal of federal enforcement after Reconstruction allowed Southern states to erect Jim Crow segregation until the Civil Rights Acts of 1964-1965.',
    hints: [
      'Consider the difference between legal constitutional text and lived reality in the South.',
      'Did Black Americans receive instant economic and voting equality in practice?',
      'Disenfranchisement persisted through Black Codes, poll taxes, and literacy tests.',
    ],
  },
  // 11. NODE 015 - Foundation - Recall
  {
    id: 'ch_hist_011',
    nodeId: NODE_C8_HISTCIV_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How long did Emperor Aurangzeb spend campaigning in the Deccan against Bijapur, Golconda, and the Marathas, and what was its financial result?',
    options: [
      '5 years (1702-1707); doubled the imperial treasury',
      '25 years (1681-1707); emptied the imperial treasury and crippled northern governance',
      '10 years (1658-1668); restored Akbar\'s mansabdari equilibrium',
      '50 years (1658-1707); conquered all of south India with zero casualties',
    ],
    correctIndex: 1,
    explanation: 'Aurangzeb\'s 25-year Deccan campaign (1681-1707) drained the imperial treasury accumulated since Akbar, overextended the army, and detached the Emperor from Delhi for a quarter-century.',
    hints: [
      'Aurangzeb died at Ahmednagar in 1707 after decades in the south.',
      'He left Delhi in 1681 and never returned to the northern capital.',
      '25 years (1681-1707).',
    ],
  },
  // 12. NODE 015 - Standard - Analysis
  {
    id: 'ch_hist_012',
    nodeId: NODE_C8_HISTCIV_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the structural core of the "Jagirdari Crisis" that undermined the Mughal administrative machine by 1707?',
    options: [
      'European traders seized all agricultural land in Bengal and Awadh',
      'The number of mansabdars (nobles) multiplied rapidly while revenue-yielding jagirs (land grants) became scarce, leaving officers unpaid',
      'Peasants stopped farming because of severe 50-year droughts throughout Punjab',
      'The Chhatrapati Shahu outlawed the collection of land revenue across northern India',
    ],
    correctIndex: 1,
    explanation: 'The mansabdari system required jagirs to sustain nobles and their cavalry. As ranks were recklessly granted to reward loyalty during the Deccan wars, mansabdars far exceeded available fertile jagirs (be-jagiri), causing unpaid nobles to rebel or defect.',
    hints: [
      'Think about supply and demand for revenue-yielding land grants.',
      'Mansabdars needed jagirs to pay their soldiers.',
      'Too many nobles chasing too few jagirs created the crisis.',
    ],
  },
  // 13. NODE 015 - Standard - Understanding
  {
    id: 'ch_hist_013',
    nodeId: NODE_C8_HISTCIV_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of Aurangzeb\'s policies alienated the Rajputs, Sikhs, and Marathas, converting long-standing imperial allies into armed adversaries?',
    options: [
      'Abolition of all pilgrimage taxes and opening of royal courts to all faiths',
      'Reimposition of Jizya (1679), temple demolitions, and the 1675 execution of Guru Tegh Bahadur',
      'Granting trade farmans to the English East India Company at Surat',
      'Banning Persian and Marathi literature across the empire',
    ],
    correctIndex: 1,
    explanation: 'Aurangzeb reversed Akbar\'s policy of religious conciliation by reimposing jizya in 1679, executing the ninth Sikh Guru Tegh Bahadur in 1675, and meddling in Rajput succession (Marwar/Mewar), creating widespread armed resistance.',
    hints: [
      'Recall which tax Akbar had abolished in 1564 that Aurangzeb brought back.',
      'Which Sikh Guru was martyred in Delhi in 1675?',
      'Jizya (1679) and Guru Tegh Bahadur (1675).',
    ],
  },
  // 14. NODE 016 - Foundation - Recall
  {
    id: 'ch_hist_014',
    nodeId: NODE_C8_HISTCIV_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who were the "Sayyid Brothers" (Abdullah Khan and Hussain Ali Khan) in the court of the Later Mughals (1713-1720)?',
    options: [
      'Afghan generals under Ahmad Shah Abdali who sacked Lahore',
      'Powerful "Kingmakers" who installed, controlled, blinded, and deposed emperors including Farrukhsiyar',
      'Persian ambassadors who accompanied Nadir Shah to Delhi',
      'Maratha Peshwas who collected Chauth from Bengal',
    ],
    correctIndex: 1,
    explanation: 'The Sayyid Brothers earned the title of "Kingmakers" because between 1713 and 1720 they controlled the throne, enthroning Farrukhsiyar, blinding and murdering him when he resisted, and crowning Muhammad Shah.',
    hints: [
      'They were Turani/Hindustani nobles who dictated who sat on the Peacock Throne.',
      'They were called "Kingmakers".',
      'They installed and assassinated Farrukhsiyar.',
    ],
  },
  // 15. NODE 016 - Standard - Analysis
  {
    id: 'ch_hist_015',
    nodeId: NODE_C8_HISTCIV_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between the foreign invasion of Nadir Shah (1739) and the invasions of Ahmad Shah Abdali (1748-1767):',
    options: [
      'Nadir Shah was Afghan and fought at Panipat; Abdali was Persian and took the Peacock Throne',
      'Nadir Shah was Persian (sacked Delhi in 1739, took Peacock Throne & Koh-i-Noor); Abdali was Afghan (invaded repeatedly, won 3rd Panipat in 1761)',
      'Both were French admirals attacking the English East India Company',
      'Nadir Shah allied with the Marathas while Abdali allied with the Sikhs',
    ],
    correctIndex: 1,
    explanation: 'Nadir Shah of Persia invaded in 1739, winning at Karnal and looting Delhi for 57 days (taking 70 crore rupees + Peacock Throne + Koh-i-Noor). Ahmad Shah Abdali of Afghanistan invaded five times, crushing the Marathas at the Third Battle of Panipat on 14 January 1761.',
    hints: [
      'Nadir Shah = Persia (1739, Peacock Throne).',
      'Ahmad Shah Abdali = Afghanistan (Third Battle of Panipat 1761).',
      'Do not confuse the Persian single catastrophic sack with the Afghan multi-year campaign.',
    ],
    misconceptionIndex: 2,
  },
  // 16. NODE 017 - Drag-label - Matching
  {
    id: 'ch_hist_016',
    nodeId: NODE_C8_HISTCIV_017,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each 18th-century independent regional kingdom with its founding Mughal governor and capital city:',
    dragItems: [
      { label: 'Nizam-ul-Mulk Asaf Jah I (1724) — Hyderabad', targetId: 'reg_hyderabad' },
      { label: 'Saadat Khan Burhan-ul-Mulk (1722) — Faizabad/Lucknow', targetId: 'reg_awadh' },
      { label: 'Murshid Quli Khan (1717) — Murshidabad', targetId: 'reg_bengal' },
    ],
    correctMapping: {
      reg_hyderabad: 'Nizam-ul-Mulk Asaf Jah I (1724) — Hyderabad',
      reg_awadh: 'Saadat Khan Burhan-ul-Mulk (1722) — Faizabad/Lucknow',
      reg_bengal: 'Murshid Quli Khan (1717) — Murshidabad',
    },
    explanation: 'Murshid Quli Khan established de facto autonomous Bengal in 1717 (Murshidabad), Saadat Khan founded Awadh in 1722 (Faizabad/Lucknow), and Asaf Jah I founded Hyderabad in 1724.',
    hints: [
      'Who founded Hyderabad in the Deccan in 1724? (Asaf Jah I).',
      'Who governed Bengal from a capital named after himself? (Murshid Quli Khan).',
      'Saadat Khan Burhan-ul-Mulk governed the fertile Gangetic plain of Awadh.',
    ],
  },
  // 17. NODE 017 - Advanced - Evaluation
  {
    id: 'ch_hist_017',
    nodeId: NODE_C8_HISTCIV_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the founders of Hyderabad, Awadh, and Bengal maintain nominal allegiance (khutba & coins in the Mughal Emperor\'s name) despite being completely independent sovereign rulers?',
    options: [
      'Because Mughal imperial troops were stationed inside their private palaces',
      'To maintain legal legitimacy, deter rival usurpers, and avoid provoking hostile coalitions by presenting their rule as lawful administration rather than rebellion',
      'Because they were legally obligated under the Treaty of Paris',
      'Because the Emperor in Delhi retained full control over their army payrolls',
    ],
    correctIndex: 1,
    explanation: 'Nominal allegiance provided a shield of political legitimacy in the 18th-century Indian state system. By reading the khutba and minting coins in the Mughal Emperor\'s name, governors exercised sovereign power without looking like rebel usurpers.',
    hints: [
      'Think of legitimacy and political psychology.',
      'The Mughal name still carried immense ceremonial prestige across India.',
      'It prevented rivals from claiming they were illegitimate rebels.',
    ],
  },
  // 18. NODE 018 - Standard - Application
  {
    id: 'ch_hist_018',
    nodeId: NODE_C8_HISTCIV_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did warrior-community states (Sikh Misls, Rajputs, Mysore) differ fundamentally in origin from the governor-founded kingdoms (Hyderabad, Awadh, Bengal)?',
    options: [
      'Warrior states inherited existing Mughal offices; governor states were created by European treaties',
      'Warrior states emerged from armed resistance and conquest from below; governor states arose when imperial bureaucrats converted existing appointments into hereditary dynasties',
      'Warrior states were solely Catholic Christian settlements',
      'There was no difference whatsoever in origin or administration',
    ],
    correctIndex: 1,
    explanation: 'Hyderabad, Awadh, and Bengal were administrative transitions where appointed Subedars/Diwans stopped remitting taxes. In contrast, the Sikhs (Banda Bahadur & 12 Misls), Rajputs (Ajit Singh & Jai Singh II), and Mysore (Hyder Ali & Tipu Sultan) fought their way to sovereignty through military resistance.',
    hints: [
      'Were Banda Bahadur and Tipu Sultan appointed as Mughal tax collectors?',
      'One group inherited an administrative machine; the other built power from armed revolt.',
      'Origin from below (rebellion/conquest) vs origin from above (bureaucratic usurpation).',
    ],
  },
  // 19. NODE 018 - Standard - Recall
  {
    id: 'ch_hist_019',
    nodeId: NODE_C8_HISTCIV_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which military technology and scientific legacy are associated with Tipu Sultan of Mysore and Sawai Jai Singh II of Amber respectively?',
    options: [
      'Tipu: Iron-cased rocket artillery; Jai Singh II: Astronomical observatories (Jantar Mantar) and planned city of Jaipur (1727)',
      'Tipu: Steam engines; Jai Singh II: Gunpowder muskets',
      'Tipu: Royal Navy galleons; Jai Singh II: Telegraph cables',
      'Tipu: Cavalry bows; Jai Singh II: French infantry rifles',
    ],
    correctIndex: 0,
    explanation: 'Tipu Sultan modernized Mysore\'s army with French-trained forces and iron-cased rocket artillery (inspiring British Congreve rockets), while Raja Jai Singh II built the Jantar Mantar observatories and planned Jaipur in 1727.',
    hints: [
      'Mysore is world-famous for early military rocket technology.',
      'Jai Singh II founded Jaipur and built UNESCO-recognized astronomical sundials (Jantar Mantar).',
    ],
  },
  // 20. NODE 019 - Advanced - Analysis
  {
    id: 'ch_hist_020',
    nodeId: NODE_C8_HISTCIV_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the formula for the Maratha military revenue system by assembling the two levies that funded the Peshwas\' cavalry campaigns beyond Maharashtra:',
    availableParts: ['Chauth (25% / 1/4th)', 'Sardeshmukhi (10% / 1/10th)', 'Jizya (Poll Tax)', 'Zakat (Alms)', 'Permanent Settlement (89%)'],
    targetState: 'Chauth (25% / 1/4th) + Sardeshmukhi (10% / 1/10th)',
    validationHint: 'Select the 1/4th levy and the 1/10th hereditary levy used by Peshwas.',
    explanation: 'The Maratha military machine was financed by Chauth (25% or 1/4th of revenue in exchange for protection from raids) and Sardeshmukhi (an additional 10% claimed as hereditary overlord rights).',
    hints: [
      'Chauth means one-fourth (25%).',
      'Sardeshmukhi means one-tenth (10%).',
      'Assemble: Chauth (25% / 1/4th) + Sardeshmukhi (10% / 1/10th).',
    ],
  },
  // 21. NODE 019 - Standard - Understanding
  {
    id: 'ch_hist_021',
    nodeId: NODE_C8_HISTCIV_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the immediate and long-term consequence of the Third Battle of Panipat (14 January 1761) for the Marathas and India?',
    options: [
      'The Maratha Empire was completely eradicated on the spot and British took Pune in 1761',
      'Maratha northward expansion was permanently halted and leadership was decimated, creating an opening for the British East India Company to conquer India piecemeal',
      'Ahmad Shah Abdali established a permanent Afghan Empire across all of south India',
      'Baji Rao I captured Delhi and crowned himself Emperor of India',
    ],
    correctIndex: 1,
    explanation: 'Panipat 1761 was catastrophic: Vishwasrao and Sadashivrao Bhau died, halting Maratha advance into Punjab and fracturing central Peshwa control into a loose confederacy, leaving no single Indian power strong enough to block British expansion.',
    hints: [
      'Did the Marathas disappear entirely? No, but their dream of a pan-Indian northern empire died.',
      'Who benefited most from the mutual exhaustion of Marathas and Afghans?',
      'The British East India Company exploited the vacuum.',
    ],
    misconceptionIndex: 1,
  },
  // 22. NODE 020 - Drag-sort - Chronology
  {
    id: 'ch_hist_022',
    nodeId: NODE_C8_HISTCIV_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the sequence of the English East India Company\'s transformation from coastal merchants to territorial contenders in exact chronological order:',
    sortItems: [
      'Queen Elizabeth I grants Royal Charter to London merchants (31 Dec 1600)',
      'First factory established at Surat following Jahangir\'s farman (1613)',
      'Fort St. George built at Madras (1639) — first fortified presidency nucleus',
      'Bombay acquired via Catherine of Braganza dowry & leased to Company (1668)',
      'Fort William established at Calcutta on the Hughli river (1690)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: '1600 Charter -> 1613 Surat factory -> 1639 Fort St. George (Madras) -> 1668 Bombay -> 1690 Fort William (Calcutta). This sequence shows the evolution from commercial warehouse (factory) to fortified military presidency (fort).',
    hints: [
      'Charter was 1600.',
      'First factory was Surat on the west coast in 1613.',
      'The three Presidency forts followed: Madras (1639), Bombay (1668), Calcutta (1690).',
    ],
  },
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
  nodeId: NODE_C8_HISTCIV_011,
  title: 'American Revolution, Civil War & The 18th-Century Indian Power Vacuum',
  definition:
    'A dual comparative analysis of Atlantic constitutional nation-building (American Independence 1775-1783, Civil War 1861-1865) alongside the decline of the Mughal Empire (1707-1761), the rise of successor regional powers (Hyderabad, Awadh, Bengal, Rajputs, Sikhs, Mysore, Marathas), and the militarisation of the English East India Company (1600-1757).',
  eli5:
    'Think of the 18th century as a giant global classroom where old headmasters lost control. In America, 13 colonies broke free from the British king in 1776, but later fought a bitter civil war over slavery in 1861 to decide if all men were truly equal. Meanwhile in India, the giant Mughal Empire ran out of money after Aurangzeb, leaving independent regional kings and clever British merchants to fill the empty throne.',
  misconceptions: [
    {
      misconception: 'America declared independence on the very day the war started in April 1775.',
      correction: 'War broke out on 19 April 1775 at Lexington and Concord, but the Declaration of Independence was adopted over a year later on 4 July 1776 after peaceful petitions failed.',
    },
    {
      misconception: 'The American Civil War was fought purely on moral grounds by individuals without economic or territorial disputes.',
      correction: 'Deep structural economic divides (industrial tariff-loving North vs agrarian slave-based cotton South) and Senate balance over new western territories were the primary structural drivers.',
    },
    {
      misconception: 'The Emancipation Proclamation of 1863 immediately freed all enslaved people across every US state.',
      correction: 'It applied exclusively to Confederate states in rebellion. The ~500,000 enslaved people in loyal border states were freed only by the 13th Amendment in December 1865.',
    },
    {
      misconception: 'Aurangzeb’s religious policies were the only cause of the Mughal Empire’s decline.',
      correction: 'Structural economic factors like the Jagirdari Crisis (too many mansabdars, too few jagirs), 25 years of treasury drain in the Deccan, and absence of primogeniture were decisive.',
    },
    {
      misconception: 'Regional kingdoms like Hyderabad, Awadh, and Bengal fought bloody wars of independence to break away from Delhi.',
      correction: 'Mughal governors (Subedars/Diwans) simply stopped sending revenue and troops to a weakened Delhi while still paying nominal respect on coins and sermons.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'When did the American War of Independence officially begin?',
      options: ['19 April 1775 at Lexington and Concord', '4 July 1776 at Philadelphia', '17 October 1777 at Saratoga', '3 September 1783 at Paris'],
      correctIndex: 0,
    },
    {
      question: 'Which battle was the military turning point that brought French naval and military intervention in the American Revolution?',
      options: ['Bunker Hill', 'Battle of Saratoga (1777)', 'Battle of Yorktown (1781)', 'Battle of Gettysburg (1863)'],
      correctIndex: 1,
    },
    {
      question: 'What was the key economic characteristic of the American Southern states before 1860?',
      options: ['Over 110,000 factories and high protective tariffs', 'Cotton plantation economy dependent on ~4 million enslaved people', 'Shipbuilding and overseas banking', 'Heavy steel and locomotive production'],
      correctIndex: 1,
    },
    {
      question: 'Which constitutional amendment permanently abolished slavery throughout the entire United States in December 1865?',
      options: ['13th Amendment', '14th Amendment', '15th Amendment', 'Bill of Rights'],
      correctIndex: 0,
    },
    {
      question: 'How long did Emperor Aurangzeb wage war in the Deccan (1681-1707)?',
      options: ['5 years', '12 years', '25 years', '40 years'],
      correctIndex: 2,
    },
    {
      question: 'Who sacked Delhi in 1739 and looted the Peacock Throne and the Koh-i-Noor diamond?',
      options: ['Ahmad Shah Abdali of Afghanistan', 'Nadir Shah of Persia', 'Baji Rao I', 'Robert Clive'],
      correctIndex: 1,
    },
    {
      question: 'Which Mughal governor founded the independent state of Hyderabad in 1724?',
      options: ['Saadat Khan Burhan-ul-Mulk', 'Murshid Quli Khan', 'Nizam-ul-Mulk Asaf Jah I', 'Banda Bahadur'],
      correctIndex: 2,
    },
    {
      question: 'What were the two taxes extracted by the Marathas across central India under the Peshwas?',
      options: ['Jizya and Zakat', 'Chauth (1/4th) and Sardeshmukhi (1/10th)', 'Ryotwari and Mahalwari', 'Stamp Duty and Octroi'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student demonstrates deep conceptual understanding of 18th-century geopolitical transformations, comparing constitutional struggles in America with the structural collapse and regional fragmentation of Mughal India.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Atlantic Spark: Lexington to Yorktown',
    instruction: 'Drag the timeline slider to trace how a local militia skirmish transformed into a global war supported by France and sealed by the Treaty of Paris.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_HISTCIV_011,
  },
  {
    title: '2. The American Divide: Factories vs Cotton Plantations',
    instruction: 'Adjust the Tariff Rate slider to observe why protective tariffs enriched Northern industrialists while infuriating Southern cotton exporters.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_HISTCIV_012,
  },
  {
    title: '3. Lincoln’s Wartime Leadership & The 272 Words',
    instruction: 'Click on the border states vs rebel states to see how Lincoln strategically balanced constitutional limits and military necessity in 1863.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_HISTCIV_013,
  },
  {
    title: '4. The Mughal Implosion: 25-Year Deccan Drain',
    instruction: 'Move the Aurangzeb Campaign Duration slider to watch the Imperial Treasury deplete while the Jagirdari shortage triggers widespread noble rebellions.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_HISTCIV_015,
  },
  {
    title: '5. The Power Vacuum & EIC Fortified Enclaves',
    instruction: 'Click on regional power nodes (Hyderabad, Awadh, Bengal, Peshwa Marathas, Mysore, EIC) to examine how real power shifted away from Delhi.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_HISTCIV_017,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the US North doubles the protective tariff on manufactured goods, what happens to Southern plantation profits?',
    options: [
      'Southern profits rise because cotton prices surge in New York',
      'Southern profits fall because imported goods cost more and European buyers threaten retaliatory tariffs on raw cotton',
      'No change because tariffs applied only to gold bullion',
      'The South immediately builds 100,000 new factories',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Tariff Slider to +40% in the simulation below to verify the economic gauge changes.',
    nodeId: NODE_C8_HISTCIV_012,
  },
  {
    question: 'Predict: When Aurangzeb prolonged his Deccan military camp to 25 years (1681-1707), what happened to administrative stability in North India?',
    options: [
      'Northern provinces became completely self-funding and peaceful',
      'Central supervision vanished, nobles rebelled due to jagir shortages, and the imperial treasury emptied',
      'Mughal revenue doubled because Bijapur paid perpetual cash tribute',
      'Nadir Shah immediately formed an alliance with Delhi',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Deccan Campaign slider to 25 Years and watch the Northern Imperial Stability index plummet.',
    nodeId: NODE_C8_HISTCIV_015,
  },
];

// ─── MAIN SIMULATION FUNCTION ───
function C8_HistoryCivicsAmericanIndependenceBeginningSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Interactive Exploration & Sandbox Sliders
  const [revolutionYear, setRevolutionYear] = useState(1775); // 1775 to 1783
  const [tariffRate, setTariffRate] = useState(20); // 0 to 50%
  const [selectedRegionNode, setSelectedRegionNode] = useState<string | null>(null);
  const [selectedCivilWarState, setSelectedCivilWarState] = useState<string | null>(null);
  const [deccanYears, setDeccanYears] = useState(10); // 0 to 25 years
  const [jagirDeficit, setJagirDeficit] = useState(40); // 0 to 100%

  // Challenge dynamic inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED HISTORICAL CALCULATIONS ───
  const northernIndustrialProfit = useMemo(() => Math.round(50 + tariffRate * 1.2), [tariffRate]);
  const southernExportMargin = useMemo(() => Math.round(90 - tariffRate * 1.5), [tariffRate]);
  const mughalTreasuryBalance = useMemo(() => Math.max(0, Math.round(100 - deccanYears * 3.8)), [deccanYears]);
  const nobleRebellionRisk = useMemo(() => Math.min(100, Math.round(deccanYears * 2.5 + jagirDeficit * 0.5)), [
    deccanYears,
    jagirDeficit,
  ]);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE BASED ON ERROR COUNT ───
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount >= 1 && errCount <= 3) return 'Great work!';
    if (errCount >= 4 && errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── USEEFFECT CALLS ───
  // 1. Initial Mastery Load
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
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

  // 3. Canvas Radar Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Dynamic geopolitical wave
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.03 + frame * 0.05) * 12 * Math.cos(frame * 0.02) +
          Math.sin(x * 0.01) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing node markers
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(60, canvas.height / 2, pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(canvas.width - 60, canvas.height / 2, pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('1775: Lexington / 1707: Mughal Peak', 15, 14);
      ctx.fillText('1865: Appomattox / 1761: Panipat', canvas.width - 190, 14);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // 4. GSAP Timeline Animation
  useEffect(() => {
    if (timelineGsapRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // 5. Cleanup Inactivity Timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
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
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Manipulate the historical maps and sliders to learn.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try free play in the sandbox. Move all variables with no grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge with adaptive competency challenges.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now move the slider to verify your hypothesis.');
  }, []);

  const handleRegionNodeClick = useCallback((nodeKey: string) => {
    setSelectedRegionNode(nodeKey);
    audioManager.play('tap');
    const regionNames: Record<string, string> = {
      hyderabad: 'Hyderabad: Nizam Asaf Jah I declared independence in 1724, keeping nominal Mughal coins.',
      awadh: 'Awadh: Saadat Khan Burhan-ul-Mulk founded independent rule in 1722 in the fertile Gangetic plain.',
      bengal: 'Bengal: Murshid Quli Khan governed autonomously from Murshidabad since 1717.',
      maratha: 'Marathas: Peshwa Baji Rao I won 41 battles and reached the gates of Delhi in 1737.',
      mysore: 'Mysore: Hyder Ali (1761) & Tipu Sultan pioneered iron-cased rocket artillery.',
      eic: 'English East India Company: Fort St. George 1639, Bombay 1668, Fort William 1690.',
    };
    speechManager.speak(regionNames[nodeKey] || '');
  }, []);

  const handleCivilWarStateClick = useCallback((st: string) => {
    setSelectedCivilWarState(st);
    audioManager.play('tap');
    if (st === 'border') {
      speechManager.speak(
        'Loyal Border States: Maryland, Kentucky, Missouri, Delaware. Enslaved people here were excluded from the 1863 Proclamation!'
      );
    } else if (st === 'confederate') {
      speechManager.speak('Confederate South: 11 seceded states. Emancipation Proclamation applied here as a war measure.');
    } else {
      speechManager.speak('Union North: Industrial powerhouse with over 110,000 factories.');
    }
  }, []);

  const handleTariffSlider = useCallback((val: number) => {
    setTariffRate(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && Math.abs(val - 40) <= 5) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleDeccanSlider = useCallback((val: number) => {
    setDeccanYears(val);
    audioManager.play('count');
  }, []);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery achieved! Review your spaced repetition schedule and reflection prompts.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Historical rationale verified.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
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
          speechManager.speak('Let us study the complete historical breakdown together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === 0 ? (challenge.sortItems || []).map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="text-3xl p-2 bg-amber-500/20 rounded-2xl border border-amber-500/30"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              ICSE Class 8 • History & Civics
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-gold-950/80 text-gold-300 border-gold-600'
            }`}
          >
            {difficulty} Tier
          </motion.div>
          <div className="text-xs bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 font-medium">
            BKT Mastery: <span className="text-amber-400 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Historical Case Arc</span>
            <h2 className="text-xl font-bold text-white mt-1 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-gold-900/50 text-xs text-gold-200">
              🎯 <strong>Mission:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
                Discovery Question
              </span>
              <span className="text-xs text-slate-400">Make an intuitive prediction:</span>
            </div>
            <p className="text-white font-semibold text-base mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 mr-1.5 font-bold">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 mr-1.5 font-bold">✗</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm text-slate-300">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on!' : '💡 Essential Distinction!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-gold-600 text-white font-bold rounded-xl text-sm whitespace-nowrap shadow-lg"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Step Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Exploration Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:
              </span>
              <span className="text-xs font-semibold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
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
              className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-4"
            >
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-300">
                👉 <strong>Interaction Prompt:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </div>

              {/* SLIDE 0: SVG DIAGRAM 1 — REVOLUTION TIMELINE & BATTLES */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="rev-slider" className="text-xs text-slate-300 font-bold">
                      Selected Year: <span className="text-amber-400 font-mono text-base">{revolutionYear}</span>
                    </label>
                    <span className="text-xs text-slate-400">Drag to advance the Revolution</span>
                  </div>
                  <input
                    id="rev-slider"
                    aria-label="American Revolution Timeline Year Slider"
                    type="range"
                    min={1775}
                    max={1783}
                    step={1}
                    value={revolutionYear}
                    onChange={(e) => setRevolutionYear(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  {/* SVG DIAGRAM 1: American War of Independence Interactive Progression */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 240" className="w-full h-auto" role="img" aria-label="American Revolution Timeline and Milestones Diagram">
                      {/* Timeline baseline */}
                      <line x1="50" y1="120" x2="650" y2="120" stroke="#334155" strokeWidth="4" />

                      {/* Milestones */}
                      {[
                        { yr: 1775, x: 80, label: 'Lexington & Concord', detail: '19 Apr 1775: "Shot heard round the world"' },
                        { yr: 1776, x: 220, label: 'Declaration of Independence', detail: '4 Jul 1776: Jefferson drafts "All men equal"' },
                        { yr: 1777, x: 360, label: 'Battle of Saratoga', detail: 'Oct 1777: Turning point; France enters 1778' },
                        { yr: 1781, x: 500, label: 'Surrender at Yorktown', detail: '19 Oct 1781: Cornwallis trapped by French Navy' },
                        { yr: 1783, x: 620, label: 'Treaty of Paris', detail: '3 Sep 1783: USA recognized (Miss. R to Gt Lakes)' },
                      ].map((m) => {
                        const isReached = revolutionYear >= m.yr;
                        const isCurrent = revolutionYear === m.yr;
                        return (
                          <g key={m.yr}>
                            <circle
                              cx={m.x}
                              cy="120"
                              r={isCurrent ? 14 : 9}
                              fill={isCurrent ? '#f59e0b' : isReached ? '#10b981' : '#1e293b'}
                              stroke={isReached ? '#34d399' : '#475569'}
                              strokeWidth="2"
                              className="transition-all"
                            />
                            <text
                              x={m.x}
                              y="90"
                              textAnchor="middle"
                              fill={isCurrent ? '#fbbf24' : isReached ? '#e2e8f0' : '#64748b'}
                              fontSize="10"
                              fontWeight="bold"
                            >
                              {m.yr}
                            </text>
                            <text
                              x={m.x}
                              y="150"
                              textAnchor="middle"
                              fill={isCurrent ? '#fbbf24' : isReached ? '#94a3b8' : '#475569'}
                              fontSize="9"
                            >
                              {m.label}
                            </text>
                            {isCurrent && (
                              <g>
                                <rect
                                  x={Math.min(Math.max(m.x - 120, 10), 450)}
                                  y="170"
                                  width="240"
                                  height="45"
                                  rx="8"
                                  fill="#1e293b"
                                  stroke="#f59e0b"
                                  strokeWidth="1.5"
                                />
                                <text
                                  x={Math.min(Math.max(m.x, 130), 570)}
                                  y="198"
                                  textAnchor="middle"
                                  fill="#fef08a"
                                  fontSize="9.5"
                                  fontWeight="600"
                                >
                                  {m.detail}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 1: SVG DIAGRAM 2 — US SECTIONAL ECONOMIC DIVIDE */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* PREDICTION HOOK */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/70 border border-gold-700 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-amber-300">PREDICT-THEN-CHECK:</p>
                      <p className="text-white text-xs font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-2.5 bg-slate-900 border border-amber-500/50 rounded-xl text-xs text-amber-300">
                      💡 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* SVG DIAGRAM 2: North vs South Sectional Economic Infrastructure */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 200" className="w-full h-auto" role="img" aria-label="North vs South Sectional Economies SVG Diagram">
                      {/* North Section Box */}
                      <rect x="20" y="20" width="315" height="160" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="35" y="45" fill="#60a5fa" fontSize="13" fontWeight="bold">🏭 Northern Industrial Economy (1860)</text>
                      <text x="35" y="70" fill="#94a3b8" fontSize="10">• 110,000+ Factories (1.3M Wage Workers)</text>
                      <text x="35" y="90" fill="#94a3b8" fontSize="10">• 97% of US Firearms & 96% Railroad Equipment</text>
                      <text x="35" y="110" fill="#94a3b8" fontSize="10">• Favoured High Protective Import Tariffs</text>
                      <rect x="35" y="125" width="280" height="20" rx="4" fill="#1e293b" />
                      <rect x="35" y="125" width={Math.min(280, (northernIndustrialProfit / 100) * 280)} height="20" rx="4" fill="#3b82f6" />
                      <text x="45" y="139" fill="#ffffff" fontSize="9" fontWeight="bold">Factory Profit Index: {northernIndustrialProfit}%</text>

                      {/* South Section Box */}
                      <rect x="365" y="20" width="315" height="160" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                      <text x="380" y="45" fill="#fbbf24" fontSize="13" fontWeight="bold">🌱 Southern Agrarian Economy (1860)</text>
                      <text x="380" y="70" fill="#94a3b8" fontSize="10">• 18,000 Small Workshops</text>
                      <text x="380" y="90" fill="#94a3b8" fontSize="10">• ~4 Million Enslaved African Americans</text>
                      <text x="380" y="110" fill="#94a3b8" fontSize="10">• King Cotton Exported to British Textile Mills</text>
                      <rect x="380" y="125" width="280" height="20" rx="4" fill="#1e293b" />
                      <rect x="380" y="125" width={Math.min(280, (southernExportMargin / 100) * 280)} height="20" rx="4" fill={southernExportMargin < 40 ? '#ef4444' : '#f59e0b'} />
                      <text x="390" y="139" fill="#ffffff" fontSize="9" fontWeight="bold">Export Prosperity Index: {southernExportMargin}%</text>
                    </svg>
                  </div>

                  {/* Interactive Tariff Slider */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor="tariff-slider" className="text-slate-300">
                        Protective Import Tariff on Foreign Goods: <strong className="text-gold-400 font-mono text-sm">{tariffRate}%</strong>
                      </label>
                      <span className="text-slate-400">Impact on regional economies in real-time</span>
                    </div>
                    <input
                      id="tariff-slider"
                      aria-label="Protective Tariff Percentage Slider"
                      type="range"
                      min={0}
                      max={50}
                      value={tariffRate}
                      onChange={(e) => handleTariffSlider(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 2: LINCOLN & EMANCIPATION MAP */}
              {currentSlide === 2 && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300">
                    Click the state categories to understand why the Emancipation Proclamation (1 Jan 1863) excluded border states:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.button
                      aria-label="Select Union North details"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCivilWarStateClick('union')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedCivilWarState === 'union'
                          ? 'bg-gold-950/80 border-gold-500 text-gold-200'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-gold-400">Union North</p>
                      <p className="text-[11px] text-slate-400 mt-1">23 States • 110,000 factories • Wage labour</p>
                    </motion.button>

                    <motion.button
                      aria-label="Select Loyal Border States details"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCivilWarStateClick('border')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedCivilWarState === 'border'
                          ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-amber-400">Loyal Border States</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        MD, KY, MO, DE • 500,000 enslaved • Excluded from Proclamation
                      </p>
                    </motion.button>

                    <motion.button
                      aria-label="Select Confederacy South details"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCivilWarStateClick('confederate')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedCivilWarState === 'confederate'
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-rose-400">Confederacy (South)</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        11 States • 3.5M enslaved • Freed as military measure
                      </p>
                    </motion.button>
                  </div>

                  {/* Gettysburg 272-word Analyzer Box */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                      <span className="font-bold text-amber-400">Gettysburg Address (19 Nov 1863)</span>
                      <span>272 Words vs Everett's 2 Hours</span>
                    </div>
                    <blockquote className="italic text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border-l-4 border-amber-500">
                      "...that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth."
                    </blockquote>
                  </div>
                </div>
              )}

              {/* SLIDE 3: SVG DIAGRAM 3 — MUGHAL IMPLOSION & DECCAN DRAIN */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="deccan-slider" className="text-slate-300">
                      Aurangzeb’s Deccan Campaign Duration: <strong className="text-amber-400 font-mono text-sm">{deccanYears} Years</strong> (1681-1707)
                    </label>
                    <span className="text-slate-400">Bijapur (1686) & Golconda (1687)</span>
                  </div>
                  <input
                    id="deccan-slider"
                    aria-label="Aurangzeb Deccan Campaign Duration Slider"
                    type="range"
                    min={0}
                    max={25}
                    value={deccanYears}
                    onChange={(e) => handleDeccanSlider(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  {/* SVG DIAGRAM 3: Mughal Imperial Overstretch & Treasury Drain Schematic */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 180" className="w-full h-auto" role="img" aria-label="Mughal Imperial Drain and Jagirdari Crisis Diagram">
                      {/* Central Imperial Delhi Core */}
                      <rect x="40" y="30" width="180" height="120" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="130" y="55" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Imperial Capital (Delhi)</text>
                      <text x="130" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">Absence: {deccanYears} Years</text>
                      <text x="130" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Treasury: {mughalTreasuryBalance}%</text>
                      <text x="130" y="115" fill="#f87171" fontSize="9" textAnchor="middle">Noble Revolt: {nobleRebellionRisk}%</text>

                      {/* Arrow of Resource Flow to Deccan War */}
                      <path d="M 230 90 L 320 90" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="275" y="80" fill="#fbbf24" fontSize="9" textAnchor="middle">Constant Drain ➔</text>

                      {/* Deccan War Zone */}
                      <rect x="330" y="30" width="330" height="120" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                      <text x="495" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Deccan Campaign War Front (1681-1707)</text>
                      <text x="495" y="78" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">• Bijapur annexed (1686) | Golconda annexed (1687)</text>
                      <text x="495" y="98" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">• Maratha Guerrilla Resistance (Santaji & Dhanaji)</text>
                      <text x="495" y="118" fill="#fde047" fontSize="9.5" textAnchor="middle">• Jagirdari Crisis: Be-jagiri (Too many mansabdars, zero jagirs)</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: REGIONAL KINGDOMS & EIC POWER VACUUM MAP */}
              {currentSlide === 4 && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300">
                    Click any regional power center to inspect how it established de facto independence after 1707:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {[
                      { id: 'hyderabad', title: 'Hyderabad (1724)', sub: 'Asaf Jah I • Deccan' },
                      { id: 'awadh', title: 'Awadh (1722)', sub: 'Saadat Khan • Doab' },
                      { id: 'bengal', title: 'Bengal (1717)', sub: 'Murshid Quli Khan' },
                      { id: 'maratha', title: 'Marathas (Peshwas)', sub: 'Baji Rao I (41 wins)' },
                      { id: 'mysore', title: 'Mysore (1761)', sub: 'Hyder Ali & Tipu (Rockets)' },
                      { id: 'eic', title: 'EIC Forts (1600-90)', sub: 'Madras, Bombay, Calcutta' },
                    ].map((reg) => (
                      <motion.button
                        key={reg.id}
                        aria-label={`Inspect ${reg.title}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRegionNodeClick(reg.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedRegionNode === reg.id
                            ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <p className="text-xs font-bold text-amber-400">{reg.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{reg.sub}</p>
                      </motion.button>
                    ))}
                  </div>

                  {selectedRegionNode && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-950 rounded-xl border border-amber-500/40 text-xs text-amber-200"
                    >
                      ℹ️ Selected: <strong>{selectedRegionNode.toUpperCase()}</strong> — Nominal Mughal allegiance remained on coins, but military, finance, and territory were fully autonomous.
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to Previous Exploration Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Advance to Next Exploration Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Advance to Free Play Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO PRESSURE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Playground</span>
              <h3 className="text-base font-bold text-white">Comparative Geopolitical Sandbox</h3>
              <p className="text-xs text-slate-400">
                Explore variables across both the Transatlantic and Subcontinental theaters with zero test stress.
              </p>
            </div>
            <motion.button
              aria-label="Ready to start challenge questions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-gold-600 text-white text-xs font-black rounded-xl shadow-lg whitespace-nowrap"
            >
              I Am Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: US Tariff & Sectional Tension */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400">US Sectional Tariff Sandbox</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tariff Level: {tariffRate}%</span>
                <span>North Profit: {northernIndustrialProfit}% | South Export: {southernExportMargin}%</span>
              </div>
              <input
                aria-label="Sandbox Tariff Rate Slider"
                type="range"
                min={0}
                max={50}
                value={tariffRate}
                onChange={(e) => setTariffRate(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="p-2 bg-slate-900 rounded-lg text-[11px] text-slate-400">
                Notice: Higher tariffs protect 110,000 Northern factories but trigger British retaliation on Southern cotton.
              </div>
            </div>

            {/* Box 2: Mughal Deccan & Jagir Crisis */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400">Mughal Imperial Drain Sandbox</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Deccan War: {deccanYears} Yrs</span>
                <span>Treasury: {mughalTreasuryBalance}% | Noble Revolt: {nobleRebellionRisk}%</span>
              </div>
              <input
                aria-label="Sandbox Deccan Campaign Duration Slider"
                type="range"
                min={0}
                max={25}
                value={deccanYears}
                onChange={(e) => setDeccanYears(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="p-2 bg-slate-900 rounded-lg text-[11px] text-slate-400">
                Notice: 25 years in the south completely emptied the treasury and triggered the Jagirdari shortage.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES (NEP 2020 & CISCE 2026) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Challenge Radar Canvas Banner */}
          <canvas ref={canvasRef} width={600} height={40} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

          {/* Progress Bar & Badges */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Challenge <strong>{currentChallenge + 1}</strong> of <strong>{filteredChallenges.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-gold-300 uppercase font-mono text-[10px]">
                Competency: {challenge.competencyLevel}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 uppercase font-mono text-[10px]">
                Type: {challenge.type}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-gold-600 h-full rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-rose-900/50 shadow-lg'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <p className="text-white font-semibold text-base mb-4 leading-relaxed">{challenge.question}</p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => {
                    const isSelectedAndWrong = showExplanation && i !== challenge.correctIndex;
                    const isCorrect = showExplanation && i === challenge.correctIndex;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                          isCorrect
                            ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-bold'
                            : isSelectedAndWrong
                            ? 'bg-rose-950/60 border-rose-800 text-slate-400'
                            : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                        {isCorrect && <span className="text-emerald-400 font-bold mr-2">✓</span>}
                        {isSelectedAndWrong && <span className="text-rose-400 font-bold mr-2">✗</span>}
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* Drag-label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-semibold shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-600 min-h-[55px] flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 capitalize">{targetId.replace('_', ' ')}:</span>
                      <span className="text-xs font-bold text-amber-300">
                        {droppedLabels[targetId] || '👉 Drop corresponding item here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Target Allocations"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Target Allocations
                </motion.button>
              </div>
            )}

            {/* Drag-sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to rearrange into correct historical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${displayIndex + 1}: ${item}. Drag to reorder.`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-md font-bold text-xs">
                        {displayIndex + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check Chronological Sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Check Chronological Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label={`Enter numerical value in ${challenge.unit}`}
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value..."
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 outline-none"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Numerical Value Check"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Figure
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[45px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-900/60 border border-amber-500 rounded-lg text-xs text-amber-200 flex items-center gap-1.5">
                      {part}
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble formula</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Formula"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  className="px-5 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Constructed Formula
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure: Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-700/70 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Step-by-Step Historical Breakdown
                  </span>
                  <span className="text-[10px] text-amber-400/80">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-amber-100">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="leading-relaxed"
                      >
                        <strong className="text-amber-400">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Step of Historical Explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Advance to Next Historical Challenge or Finalize"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Module →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 to-slate-900 rounded-3xl border border-gold-800 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-2xl font-black text-white">Module Completed with Distinction!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have mastered the foundational mechanics of the American Revolution, the Civil War, and the 18th-century Indian Power Vacuum.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 w-32">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-amber-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 w-32">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 to-gold-950/60 rounded-2xl border border-amber-500/50 text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Performance Assessment</span>
            <h3 className="text-xl font-black text-white">
              {getMotivationalMessage(errors)}
            </h3>
            <p className="text-xs text-slate-300">
              Total errors logged during challenge evaluations: <strong className="text-amber-300">{errors}</strong>
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Specific Misconception Profile (Gaps to Review):
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = DEFAULT_PROPS.misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Status */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-400">Spaced Repetition Schedule (SM-2):</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Next automated memory retention review scheduled in{' '}
                <strong className="text-amber-300 font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                .
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Real-World Application</span>
            <h3 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pl-4 list-disc">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Mastery Certified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsAmericanIndependenceBeginningSim;