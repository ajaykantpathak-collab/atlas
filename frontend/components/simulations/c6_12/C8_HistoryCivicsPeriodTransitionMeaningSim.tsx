'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE CONSTANTS (CISCE Class 8 History & Civics) ───
const NODE_C8_HISTCIV_001 = 'c8_histciv_001';
const NODE_C8_HISTCIV_002 = 'c8_histciv_002';
const NODE_C8_HISTCIV_003 = 'c8_histciv_003';
const NODE_C8_HISTCIV_004 = 'c8_histciv_004';
const NODE_C8_HISTCIV_005 = 'c8_histciv_005';
const NODE_C8_HISTCIV_006 = 'c8_histciv_006';
const NODE_C8_HISTCIV_007 = 'c8_histciv_007';
const NODE_C8_HISTCIV_008 = 'c8_histciv_008';
const NODE_C8_HISTCIV_009 = 'c8_histciv_009';
const NODE_C8_HISTCIV_010 = 'c8_histciv_010';

const ALL_HISTCIV_NODE_IDS = [
  NODE_C8_HISTCIV_001,
  NODE_C8_HISTCIV_002,
  NODE_C8_HISTCIV_003,
  NODE_C8_HISTCIV_004,
  NODE_C8_HISTCIV_005,
  NODE_C8_HISTCIV_006,
  NODE_C8_HISTCIV_007,
  NODE_C8_HISTCIV_008,
  NODE_C8_HISTCIV_009,
  NODE_C8_HISTCIV_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Hinge: Reconstructing the Modern World (1453–1815)',
  intro: 'You are an apprentice curator at the National Museum Archives in Kolkata. A massive collection of historical records, maps, mechanical blueprints, and revolutionary pamphlets has arrived from across Europe and South Asia spanning 1453 to 1815.',
  context: 'From the fall of Constantinople to the rise and fall of Napoleon, and the colonial transformation of Bengal to the American Revolution, you must investigate sources, trace revolutions, and evaluate how the modern world was forged.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 2024, an Indian historian reads a freshly printed modern paperback copy of François Bernier’s 1671 journal recounting his eyewitness travels in Mughal Delhi. How is this paperback classified?',
  options: [
    'Secondary source — because it was printed recently on modern paper in 2024',
    'Primary source — because Bernier was an eyewitness living in Delhi in 1671 and the content is firsthand',
    'Unreliable folklore — because any European account is automatically discarded',
    'Secondary source — because it has been translated and edited for modern readers',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry if you thought the year of printing mattered! In history, the relationship of the content to the event determines whether a source is primary, not the age of the paper.',
};

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
  nodeId: NODE_C8_HISTCIV_001,
  title: 'The Period of Transition & The Birth of the Modern World',
  definition: 'The Period of Transition (1453 to mid-1700s) bridges the Medieval and Modern Ages, triggered by the fall of Constantinople and leading to the Renaissance, Voyages, Industrial Revolution, Imperialism, and Atlantic Revolutions.',
  eli5: 'Think of history like a giant bridge between Medieval Town (castles, feudal lords, handlooms) and Modern City (factories, voting rights, global sea routes). This simulation lets you explore the forces and revolutions that built that bridge.',
  misconceptions: [
    { misconception: 'Primary vs Secondary depends on the age of the physical book or paper.', correction: 'Classification depends on the content’s relationship to the event. A 2024 reprint of an eyewitness 1671 diary is still a Primary source.' },
    { misconception: 'Vasco da Gama "discovered" India in 1498.', correction: 'India was already a bustling, wealthy trading civilization for millennia. Da Gama discovered a direct ocean sea route from Europe to Calicut bypassing Ottoman tariffs.' },
    { misconception: 'The Industrial Revolution was a sudden military or political overthrow like the French Revolution.', correction: 'It was a gradual 80-year technological and economic transformation (1760–1840) replacing muscle/water power with steam and machines.' },
    { misconception: 'Railways and English education were philanthropic gifts to develop India.', correction: 'They were instruments of colonial extraction: railways connected raw cotton and mineral reserves to export ports and moved troops to restive regions; Indian taxpayers paid for them.' },
    { misconception: 'The Boston Tea Party happened because tea was too expensive.', correction: 'The Tea Act (1773) actually made tea cheaper. Colonists protested the constitutional principle of "No taxation without representation" and the East India Company’s monopoly.' },
  ],
  diagnosticQuestions: [
    { question: 'What conventional event opens the Period of Transition in 1453?', options: ['The Fall of Constantinople to Ottoman Turks', 'The storming of the Bastille', 'The coronation of Napoleon', 'The invention of the steam engine'], correctIndex: 0 },
    { question: 'Which machine invented by James Hargreaves in 1764 multiplied spinning yarn output eightfold?', options: ['Power Loom', 'Spinning Jenny', 'Water Frame', 'Rocket Locomotive'], correctIndex: 1 },
    { question: 'Dadabhai Naoroji formulated the "Drain of Wealth" theory in his landmark 1901 work. What was its core finding?', options: ['India was naturally barren', '£200–300 million was siphoned annually from India to Britain without return', 'Indian weavers refused to use machines', 'Britain paid higher taxes than India'], correctIndex: 1 },
    { question: 'Which social group formed roughly 98% of France’s population in 1789 yet bore all direct taxes like the taille and gabelle?', options: ['First Estate (Clergy)', 'Second Estate (Nobility)', 'Third Estate (Commoners & Bourgeoisie)', 'The Royal Guard'], correctIndex: 2 },
    { question: 'What did the delegates swear at the Tennis Court Oath on 20 June 1789?', options: ['To execute the King immediately', 'To never disband until France had a written constitution', 'To declare war on Great Britain', 'To restore feudal manorial dues'], correctIndex: 1 },
    { question: 'What was the legal code promulgated by Napoleon in 1804 that established equality before the law but restricted women’s rights?', options: ['Magna Carta', 'Declaration of Rights', 'Napoleonic Civil Code', 'Treaty of Tordesillas'], correctIndex: 2 },
    { question: 'Why did the American colonists dump 342 chests of tea into Boston Harbour on 16 Dec 1773?', options: ['The tea was poisoned', 'To protest taxation without representation and the EIC monopoly', 'To support French merchants', 'Because they preferred coffee'], correctIndex: 1 },
    { question: 'What was the demographic collapse of Dhaka muslin weavers between 1757 and 1820s caused by?', options: ['A sudden pest epidemic', 'Colonial tariff discrimination and dumping of cheap Lancashire mill-cloth', 'Discovery of silk in Bengal', 'Peasants voluntarily leaving looms'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate deep conceptual mastery across primary source analysis, Industrial Revolution mechanisms, colonial deindustrialisation, French revolutionary milestones, Napoleonic reforms, and the American constitutional crisis.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_hist_001',
    nodeId: NODE_C8_HISTCIV_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A research scholar in New Delhi examines a copper plate inscribed with a royal firman issued by Emperor Akbar in 1582. How is this source classified?',
    options: [
      'Primary source — an original contemporary state document from Akbar’s reign',
      'Secondary source — because copper metal degrades over centuries',
      'Secondary source — because modern historians have deciphered it',
      'Tertiary source — because it is administrative rather than literary',
    ],
    correctIndex: 0,
    explanation: 'An original administrative firman produced at the time of the events by the imperial chancery is a firsthand primary source.',
    hints: [
      'Ask: Was this artifact created directly during the historical period being studied?',
      'The copper firman was stamped under Akbar’s imperial order contemporaneously in 1582.',
      'Because it is an original firsthand relic from the period, it is unambiguously primary.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_hist_002',
    nodeId: NODE_C8_HISTCIV_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 31 October 1517, Martin Luther initiated the Protestant Reformation in Germany. What specific action did he take?',
    options: [
      'He sailed around the Cape of Good Hope to reach Asia',
      'He nailed his 95 Theses to the church door in Wittenberg protesting indulgences',
      'He led the storming of the Bastille prison in Paris',
      'He invented the steam engine with a separate condenser',
    ],
    correctIndex: 1,
    explanation: 'Luther’s 95 Theses challenged the papal sale of indulgences and asserted that faith and personal conscience alone guide salvation.',
    hints: [
      'Think about religious reform and protests against Church corruption in 1517.',
      'Luther challenged the authority of the Pope over salvation.',
      'He posted 95 theological arguments on the church door at Wittenberg.',
    ],
  },
  {
    id: 'ch_hist_003',
    nodeId: NODE_C8_HISTCIV_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the revolutionary textile and transport inventions to their historical inventors.',
    dragItems: [
      { label: 'James Watt (1776)', targetId: 'slot_steam' },
      { label: 'James Hargreaves (1764)', targetId: 'slot_jenny' },
      { label: 'Edmund Cartwright (1785)', targetId: 'slot_loom' },
      { label: 'George Stephenson (1829)', targetId: 'slot_rail' },
    ],
    correctMapping: {
      slot_steam: 'James Watt (1776)',
      slot_jenny: 'James Hargreaves (1764)',
      slot_loom: 'Edmund Cartwright (1785)',
      slot_rail: 'George Stephenson (1829)',
    },
    explanation: 'Hargreaves invented the Spinning Jenny (1764), Watt improved the Steam Engine (1776), Cartwright mechanised weaving with the Power Loom (1785), and Stephenson built the Rocket Locomotive (1829).',
    hints: [
      'Watt is synonymous with steam condensers; Hargreaves with multi-spindle spinning.',
      'Cartwright mechanised weaving looms; Stephenson opened the railway age with Rocket.',
      'Match the 18th-century pioneers into their respective invention slots.',
    ],
  },
  {
    id: 'ch_hist_004',
    nodeId: NODE_C8_HISTCIV_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the French Old Regime prior to 1789, which social group constituted the Second Estate?',
    options: [
      'The Roman Catholic Clergy (~130,000 people)',
      'The Feudal Nobility (~400,000 people)',
      'The Bourgeois merchants, lawyers, and peasants (~25 million people)',
      'The Paris Municipal Commune',
    ],
    correctIndex: 1,
    explanation: 'The Second Estate consisted of the hereditary nobility (~400,000 individuals) who held vast estates and enjoyed extensive tax exemptions.',
    hints: [
      'First Estate was the Church/Clergy; Third was commoners.',
      'The Second Estate held aristocratic titles, swords, and manorial rights.',
      'It consisted of the nobility.',
    ],
  },
  {
    id: 'ch_hist_005',
    nodeId: NODE_C8_HISTCIV_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did the Parisian citizens storm the Bastille fortress on 14 July 1789?',
    options: [
      'To rescue hundreds of imprisoned political philosophers',
      'To seize gunpowder arsenals and demolish a hated symbol of royal absolutism',
      'To crown Maximilien Robespierre as the new monarch',
      'To sign a trade treaty with the American Thirteen Colonies',
    ],
    correctIndex: 1,
    explanation: 'Although holding only 7 inmates, the Bastille fortress stored gunpowder and stood as the physical embodiment of royal tyranny in Paris.',
    hints: [
      'The crowd needed ammunition and gunpowder after the King sacked Necker.',
      'The fortress held very few prisoners, but loomed over the city as a symbol of despotism.',
      'Its capture marked the collapse of royal military control in Paris.',
    ],
  },
  {
    id: 'ch_hist_006',
    nodeId: NODE_C8_HISTCIV_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Between 1607 and 1732, how many British colonies were established along the Atlantic coast of North America?',
    options: ['7 colonies', '13 colonies', '25 colonies', '50 colonies'],
    correctIndex: 1,
    explanation: 'The Thirteen Colonies stretched from Jamestown, Virginia (founded 1607) to Georgia (founded 1732).',
    hints: [
      'Think of the original stripes on the American flag.',
      'Jamestown (1607) was first, Georgia (1732) was the thirteenth.',
      'The number is 13.',
    ],
  },
  {
    id: 'ch_hist_007',
    nodeId: NODE_C8_HISTCIV_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the crucial difference between pre-modern conquest (e.g. Delhi Sultanate) and modern industrial imperialism (e.g. British Empire in India)?',
    options: [
      'Conquest empires used steamships while imperialists only rode horses',
      'Conquest extracted tribute while leaving village crafts intact; industrial imperialism systematically restructured the entire colonial economy to serve metropolitan factories',
      'Conquest abolished all taxes while imperialism gave free land to all peasants',
      'There is no historical difference; both terms mean identical military actions',
    ],
    correctIndex: 1,
    explanation: 'Pre-modern empires collected tribute from existing production; industrial imperialism dismantled indigenous manufactures (like Dhaka muslin) and enforced raw-material export monoculture.',
    hints: [
      'Look at how the village economy and artisanal looms were affected.',
      'Imperialism reoriented transport, tariffs, and agriculture towards Manchester and Lancashire.',
      'It restructured production rather than merely collecting taxes.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_hist_008',
    nodeId: NODE_C8_HISTCIV_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate these two historical works: (A) François Bernier’s "Travels in the Mughal Empire" (1671) vs (B) Prof. Irfan Habib’s "The Agrarian System of Mughal India" (1963). Which classification is correct?',
    options: [
      'Both are primary sources because both discuss Emperor Aurangzeb',
      '(A) is Primary (contemporary eyewitness); (B) is Secondary (modern scholarly synthesis based on primary records)',
      '(A) is Secondary (because it is biased); (B) is Primary (because it is academic and objective)',
      'Both are secondary sources because modern readers access them through English translations',
    ],
    correctIndex: 1,
    explanation: 'Bernier was a direct eyewitness physician in Aurangzeb’s court (Primary). Habib analysed primary Mughal tax records 300 years later (Secondary). Bias does not alter source classification.',
    hints: [
      'The test is the author’s relationship to the events in time.',
      'Bernier lived in 17th-century Delhi; Habib wrote in 1963 analysing past archives.',
      'Eyewitness contemporary = Primary; later analytical synthesis = Secondary.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_hist_009',
    nodeId: NODE_C8_HISTCIV_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Before machine flooding, Dhaka’s artisan population was ~150,000 in 1757. By the 1820s, after British machine cloth flooded Bengal, it plunged to ~60,000. What was the net population loss of Dhaka?',
    correctAnswer: 90000,
    tolerance: 1000,
    unit: 'weavers/residents',
    explanation: '150,000 - 60,000 = 90,000 people displaced or starved as Dhaka’s world-famous muslin industry was dismantled by colonial tariff policies.',
    hints: [
      'Calculate the difference between 150,000 (1757) and 60,000 (1820s).',
      '150,000 minus 60,000.',
      'The net decrease is 90,000.',
    ],
  },
  {
    id: 'ch_hist_010',
    nodeId: NODE_C8_HISTCIV_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Dadabhai Naoroji calculated that Britain drained £200–300 million annually from India. Which of the following constituted a major component of this "Home Charges" drain?',
    options: [
      'Direct famine relief funds sent from London to Bengal',
      'Pensions of retired British civil/military officers, interest on railway debt, and costs of British imperial wars fought abroad charged to Indian revenues',
      'Subsidies given to Indian handloom weavers to purchase steam engines',
      'Reimbursements paid by the British Parliament to Indian princely states for grain',
    ],
    correctIndex: 1,
    explanation: 'Home Charges were non-reciprocal payments extracted from Indian tax revenues remitted to London for British administration, pensions, guaranteed railway returns, and foreign military campaigns.',
    hints: [
      'Think about where Indian tax money flowed without any goods returned.',
      'It paid for imperial pensions in England and interest on British capital investments.',
      'Option 2 describes the structural mechanisms of the Drain of Wealth.',
    ],
  },
  {
    id: 'ch_hist_011',
    nodeId: NODE_C8_HISTCIV_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the escalating causal events of the French Revolution in strict chronological sequence (1778 to 1789).',
    sortItems: [
      'France aids American War of Independence; national debt hits 4 billion livres (1778–83)',
      'Controller-General Calonne warns King Louis XVI of imminent state bankruptcy (1786)',
      'Assembly of Notables rejects taxes on nobility; demands representative assembly (1787)',
      'Severe winter and 1788 harvest failure double Paris bread prices to 14 sous (1788–89)',
      'King Louis XVI convenes Estates-General at Versailles for first time since 1614 (May 1789)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'American war debt created fiscal collapse (1783) -> Calonne’s bankruptcy alert (1786) -> Noble tax refusal (1787) -> Bread price crisis (1788) -> Convocation of Estates-General (May 1789).',
    hints: [
      'War debt came first, followed by Calonne’s warnings to the King.',
      'The noble resistance in 1787 preceded the harvest failure of 1788.',
      'The convocation on 5 May 1789 is the culminating trigger.',
    ],
  },
  {
    id: 'ch_hist_012',
    nodeId: NODE_C8_HISTCIV_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'The "Declaration of the Rights of Man and Citizen" (26 August 1789) proclaimed universal liberty. Which significant historical limitation was highlighted by Olympe de Gouges?',
    options: [
      'It abolished private property for all citizens',
      'It excluded women from political franchise and legal rights, for which De Gouges drafted the Declaration of the Rights of Woman before being guillotined in 1793',
      'It made Roman Catholicism the mandatory religion of Europe',
      'It barred peasants from buying grain in Paris markets',
    ],
    correctIndex: 1,
    explanation: 'The Declaration proclaimed "men are born free and equal," explicitly withholding voting and legal autonomy from women and maintaining colonial slavery until uprisings forced change.',
    hints: [
      'Consider the gender and colonial boundaries of 18th-century rights documents.',
      'Olympe de Gouges challenged the male monopoly on revolutionary citizenship.',
      'She wrote a parallel charter for women and was executed during the Terror.',
    ],
  },
  {
    id: 'ch_hist_013',
    nodeId: NODE_C8_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Napoleon Bonaparte represent BOTH the preserver and the betrayer of the French Revolution?',
    options: [
      'He restored the Bourbon dynasty while executing all revolutionary soldiers',
      'He codified equality before the law, meritocracy, and abolished feudalism (Preserver), but crowned himself Emperor, censored the press, and restored colonial slavery in 1802 (Betrayer)',
      'He gave up all French territory to Britain while making peace with the Pope',
      'He abolished the French language in favour of Latin across his empire',
    ],
    correctIndex: 1,
    explanation: 'Napoleon institutionalised the legal gains of 1789 (Civil Code, merit over birth) while destroying republican democracy with an authoritarian dictatorship.',
    hints: [
      'Think about the Napoleonic Code vs his self-coronation in 1804.',
      'He spread legal equality but instituted secret police, press censorship, and restored colonial slavery in 1802.',
      'Look for the option contrasting legal reform with political dictatorship.',
    ],
  },
  {
    id: 'ch_hist_014',
    nodeId: NODE_C8_HISTCIV_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did American colonists furiously reject the Tea Act of 1773 even though it made British East India Company tea CHEAPER than smuggled Dutch tea?',
    options: [
      'The tea was known to be stale and harmful to health',
      'Accepting cheaper tea meant acknowledging Parliament’s unconstitutional claim to levy taxes without colonial representation and yielding to an East India Company monopoly',
      'Colonists were forbidden by their religion from drinking tea',
      'The French fleet blocked all tea shipments into American harbours',
    ],
    correctIndex: 1,
    explanation: 'The protest was constitutional, not financial. Paying the 3d tax embedded in the cheap tea would set a legal precedent legitimising taxation without representation.',
    hints: [
      'Focus on constitutional principle over the price tag.',
      'The slogan was "No taxation without representation".',
      'Accepting the tea conceded the British Parliament’s right to tax colonists.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_hist_015',
    nodeId: NODE_C8_HISTCIV_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the imperialist feedback loop connecting the Industrial Revolution to colonial territorial expansion.',
    availableParts: [
      'Industrial Overproduction',
      '->',
      'Need for Captive Markets & Raw Materials',
      'Political Subjugation of Colonies',
      'Colonial Economy Restructured for Export',
    ],
    targetState: 'Industrial Overproduction -> Need for Captive Markets & Raw Materials -> Political Subjugation of Colonies -> Colonial Economy Restructured for Export',
    validationHint: 'Assemble the 4 stages with arrows in causal order from factory surplus to restructured colonial land.',
    explanation: 'Industrial output creates surplus -> domestic market saturates -> requires guaranteed markets/materials -> state establishes political conquest -> colonial economy is forcibly reorganised.',
    hints: [
      'Start with the factory output surplus: Industrial Overproduction.',
      'Add an arrow, then the search for markets and cotton.',
      'Follow with political control, and finally economic reorganisation.',
    ],
  },
  {
    id: 'ch_hist_016',
    nodeId: NODE_C8_HISTCIV_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Court historian Abul Fazl wrote the "Akbarnama" in the 1590s, lavishly praising Akbar’s virtues while omitting imperial military setbacks. A student argues: "Because it is biased propaganda, the Akbarnama is NOT a primary source." How should a historian evaluate this claim?',
    options: [
      'The student is correct; biased texts are reclassified as secondary opinions',
      'The student is incorrect; bias affects reliability, not classification. Akbarnama is primary because it is a contemporary 16th-century court record revealing how the Mughal state projected power',
      'The student is correct; only independent European travelers count as primary sources',
      'The student is incorrect; all ancient manuscripts are 100% accurate truth',
    ],
    correctIndex: 1,
    explanation: 'Primary classification depends solely on contemporaneity and firsthand relationship to the era. Evaluating bias and perspective is the historian’s secondary task during critical cross-examination.',
    hints: [
      'Does bias disqualify a contemporary document from being primary evidence?',
      'Primary status = created during the era by someone with direct access.',
      'A biased royal chronicle is invaluable primary evidence of court ideology.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_hist_017',
    nodeId: NODE_C8_HISTCIV_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Historian R. P. Dutt argued that British industrialisation was critically accelerated by the "Plassey Plunder" after 1757. How did the conquest of Bengal directly fuel England’s Industrial Revolution?',
    options: [
      'Bengal weavers were imported to Manchester to teach English workers how to knit',
      'Surplus land revenues drained from Bengal were remitted to London banks, providing the liquid investment capital needed to finance steam engines, canals, and textile factories',
      'The British Crown gave all Bengal farmland to English coal miners',
      'Bengal supplied 100% of the coal used in British steam engines',
    ],
    correctIndex: 1,
    explanation: 'Following Plassey (1757) and the Diwani grant (1765), Bengal’s tax surplus was transferred to Britain, supplying the massive liquid capital required for fixed industrial capital investments.',
    hints: [
      'Consider the role of colonial capital accumulation in funding technological infrastructure.',
      'Bengal was not a source of coal, but a massive source of liquid financial surplus.',
      'The plunder of Bengal’s treasury and tax revenues capitalized British banking houses.',
    ],
  },
  {
    id: 'ch_hist_018',
    nodeId: NODE_C8_HISTCIV_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 1876–78 Madras Famine, ~5.5 million people died while record quantities of Indian grain were exported to Europe. Historian Mike Davis terms these "Late Victorian Holocausts." What colonial policy caused this catastrophe?',
    options: [
      'Total biological crop failure across all continents simultaneously',
      'Rigid adherence to laissez-faire free-market dogma and export contracts, refusing government price controls or relief grain distribution while collecting taxes',
      'A royal decree that banned all railway transportation during dry seasons',
      'Indian farmers hoarding all grain underground to drive prices up',
    ],
    correctIndex: 1,
    explanation: 'Colonial authorities refused to halt grain exports or intervene in market pricing under strict free-trade doctrine (Lord Lytton administration), turning a meteorological drought into mass starvation.',
    hints: [
      'Was the famine purely natural or aggravated by colonial export policy?',
      'Grain trains were running to ports for export while surrounding peasants starved.',
      'Colonial administrators enforced strict laissez-faire non-intervention.',
    ],
  },
  {
    id: 'ch_hist_019',
    nodeId: NODE_C8_HISTCIV_008,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the revolutionary milestones of 1789 that dismantled France’s feudal order.',
    sortItems: [
      'Tennis Court Oath: Third Estate proclaims itself the National Assembly (20 June 1789)',
      'Dismissal of reform minister Jacques Necker sparks Parisian panic (11 July 1789)',
      'Storming of the Bastille: Royal military authority collapses in Paris (14 July 1789)',
      'Night of August 4: National Assembly formally abolishes all feudal privileges and tithes (4 Aug 1789)',
      'Adoption of the Declaration of the Rights of Man and Citizen (26 Aug 1789)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Tennis Court Oath (20 June) -> Necker dismissed (11 July) -> Bastille (14 July) -> Feudalism abolished (4 Aug) -> Rights of Man (26 Aug).',
    hints: [
      'The Tennis Court Oath created the Assembly before Paris erupted.',
      'Necker’s dismissal immediately triggered the Bastille assault 3 days later.',
      'The Night of August 4 abolished feudal dues before the Rights of Man codified legal equality.',
    ],
  },
  {
    id: 'ch_hist_020',
    nodeId: NODE_C8_HISTCIV_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What was the "Paradox of Napoleonic Nationalism" across conquered German and Italian territories?',
    options: [
      'Conquered people loved Napoleon so much they all voluntarily renamed their cities after him',
      'By abolishing feudalism and imposing unified legal codes, French armies spread Enlightenment ideals of popular sovereignty, which inspired conquered populations to unite nationalistically to expel the French occupiers',
      'Napoleon forced all conquered states to adopt British parliamentary rule',
      'Italian and German states immediately restored feudal serfdom to please France',
    ],
    correctIndex: 1,
    explanation: 'Napoleon’s modernising reforms broke feudal fragmentation; however, foreign military occupation, high taxes, and conscription forged modern national identities defined by anti-French resistance.',
    hints: [
      'How did modern legal unity backfire against the foreign occupier?',
      'French ideas taught that the nation belongs to the people, not foreign emperors.',
      'Conquered populations used French revolutionary concepts of nationhood to fight against French rule.',
    ],
  },
  {
    id: 'ch_hist_021',
    nodeId: NODE_C8_HISTCIV_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Following the Boston Tea Party, British Parliament enacted the Coercive (Intolerable) Acts of 1774 to punish Massachusetts. What unexpected outcome did these punitive acts produce?',
    options: [
      'The other 12 colonies abandoned Massachusetts and paid the British East India Company in full',
      'Rather than isolating Massachusetts, the punitive acts galvanized inter-colonial solidarity, leading directly to the First Continental Congress in Philadelphia (Sept 1774)',
      'King George III immediately granted full voting representation to all American colonies',
      'The colonies declared immediate military surrender and disbanded all local assemblies',
    ],
    correctIndex: 1,
    explanation: 'Parliament intended to isolate Boston by closing its port and revoking Massachusetts’ charter; instead, it proved to all 13 colonies that their liberties were under threat, forging colonial unity.',
    hints: [
      'Did punitive laws divide the colonies or unite them against London?',
      'Delegates from 12 colonies met in Philadelphia to coordinate mutual defense.',
      'The Intolerable Acts created the First Continental Congress.',
    ],
  },
  {
    id: 'ch_hist_022',
    nodeId: NODE_C8_HISTCIV_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'British cotton cloth exports dumped into India expanded from £1.2 million in 1814 to £18.0 million in 1870. By what factor did British textile exports to India multiply over these 56 years?',
    correctAnswer: 15,
    tolerance: 0.5,
    unit: 'times (factor)',
    explanation: '18.0 / 1.2 = 15. British mill-cloth sales in India grew 15-fold, demonstrating the massive deindustrialising deluge that crushed indigenous handlooms.',
    hints: [
      'Divide 18.0 million by 1.2 million.',
      '18 divided by 1.2 equals 15.',
      'The factor is exactly 15 times.',
    ],
  },
];

// ��── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Source Detective — Primary vs Secondary',
    instruction: 'Click on artifacts to inspect their contemporary origin, author eyewitness status, and determine if bias alters classification.',
    interactionType: 'source-detective',
    nodeId: NODE_C8_HISTCIV_001,
  },
  {
    title: 'Lab 2: The Three Hinge Movements (1453–1517)',
    instruction: 'Drag the timeline slider to witness how the Ottoman blockade of Constantinople triggered voyages and the Reformation.',
    interactionType: 'timeline-hinge',
    nodeId: NODE_C8_HISTCIV_002,
  },
  {
    title: 'Lab 3: The Industrial Engine & Colonial Drain',
    instruction: 'Manipulate the Coal, Steam Power, and Bengal Capital sliders to observe factory cloth output vs Dhaka weaver displacement.',
    interactionType: 'industrial-drain',
    nodeId: NODE_C8_HISTCIV_003,
  },
  {
    title: 'Lab 4: The Three Estates & 1789 Revolutionary Flashpoint',
    instruction: 'Toggle between the 1st, 2nd, and 3rd Estates. Observe tax burdens, population shares, and trigger the Tennis Court Oath.',
    interactionType: 'estates-revolution',
    nodeId: NODE_C8_HISTCIV_007,
  },
  {
    title: 'Lab 5: Atlantic Crisis — The 13 Colonies & Boston Harbor',
    instruction: 'Adjust Parliament’s tax acts and observe colonial tea boycott levels and the Boston Tea Party reaction.',
    interactionType: 'boston-tea',
    nodeId: NODE_C8_HISTCIV_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the British colonial government doubles tariff exemptions for Lancashire cotton while taxing Indian textile exports, what will happen to Dhaka muslin weavers?',
    options: [
      'Dhaka weavers will easily buy steam factories and double their profits',
      'Dhaka weavers will face rapid collapse and deindustrialisation, forcing millions into impoverished farming',
      'British consumers will refuse to wear English machine cloth and buy Indian handlooms',
      'The price of Indian cotton cloth in England will become five times cheaper',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the "Colonial Tariff Ratio" in the Industrial Drain lab and watch the weaver population plummet.',
    nodeId: NODE_C8_HISTCIV_004,
  },
  {
    question: 'Predict: When King Louis XVI summoned the Estates-General in May 1789, the 1st and 2nd Estates demanded voting "by order" (one vote per estate). What did this guarantee?',
    options: [
      'The Third Estate (98% of people) would always be outvoted 2-to-1 by the two privileged orders',
      'Every single peasant in France would receive a personal ballot',
      'The King would be immediately removed from power by universal vote',
      'The clergy would pay all taxes for the entire nation',
    ],
    correctIndex: 0,
    verifyInstruction: 'Toggle the voting system in Lab 4 to see how "voting by order" mathematically silenced 98% of France.',
    nodeId: NODE_C8_HISTCIV_007,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Industrial-Colonial simulation, what happens to domestic Indian cloth production as Bengal surplus capital and Lancashire steam output max out?',
    observableOptions: [
      'Indian handloom production plummets to near zero as cheap machine cloth floods the domestic market',
      'Indian handloom production surges to world dominance',
      'British factories shut down because of Indian competition',
      'No change occurs; both economies grow at the exact same rate',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_HISTCIV_004,
  },
  {
    question: 'In the Three Estates lab, what proportion of the national tax burden (taille, gabelle, tithes) was carried by the 3rd Estate alone?',
    observableOptions: [
      'Almost 100% of direct taxes, despite owning only ~65% of the land and holding zero political power',
      'Exactly 33%, equally divided among all three estates',
      'Zero percent — the Nobility paid all national expenses',
      'Only 10% — the Clergy paid the remaining 90%',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_HISTCIV_007,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Archivist: The Curatorial Dossier',
  description: 'Apply your understanding of the Period of Transition to modern historical analysis. Synthesise how the economic drain of Bengal, French republican ideals of liberty, and American constitutional representation continue to shape contemporary Indian democratic and economic institutions.',
  steps: [
    'Analyze a modern 2024 reprint of an ancient source and justify its primary status to a visitor.',
    'Formulate a 3-point policy comparison: how modern independent India protects domestic craft weavers vs colonial deindustrialisation.',
    'Identify where the French ideals of Liberty, Equality, Fraternity and the American concept of Constitutional Rights are enshrined in Part III of the Constitution of India.',
    'Share your curatorial dossier with your peers or teacher for final evaluation.',
  ],
};

function C8_HistoryCivicsPeriodTransitionMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_HISTCIV_001,
  title = DEFAULT_PROPS.title || 'The Period of Transition',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Exploration States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1: Source Detective Interactive State
  const [selectedSourceId, setSelectedSourceId] = useState<'firman' | 'bernier' | 'habib' | 'textbook'>('firman');
  const [viewMode, setViewMode] = useState<'matrix' | 'venn'>('matrix');

  // Lab 2: Timeline Hinge Interactive State
  const [timelineYear, setTimelineYear] = useState<number>(1453);

  // Lab 3: Industrial-Drain Engine Interactive State
  const [steamPowerLevel, setSteamPowerLevel] = useState<number>(40);
  const [bengalCapitalDrain, setBengalCapitalDrain] = useState<number>(60);
  const [colonialTariffLevel, setColonialTariffLevel] = useState<number>(75);

  // Lab 4: Estates & Revolution Interactive State
  const [selectedEstate, setSelectedEstate] = useState<'1st' | '2nd' | '3rd'>('3rd');
  const [votingSystem, setVotingSystem] = useState<'by_order' | 'by_head'>('by_order');
  const [tennisOathTriggered, setTennisOathTriggered] = useState<boolean>(false);

  // Lab 5: Boston Tea Crisis Interactive State
  const [dumpedChestsCount, setDumpedChestsCount] = useState<number>(0);

  // Reflection States
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Challenge & Mastery State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── GSAP ANIMATION FOR TIMELINE LAB ───
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 1 && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide, timelineYear]);

  // ─── HTML CANVAS REQUEST ANIMATION FRAME (Steam Engine Gear Simulation) ───
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 2 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let angle = 0;
      let pistonY = 0;

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const speed = (steamPowerLevel / 100) * 0.08 + 0.01;
        angle += speed;
        pistonY = Math.sin(angle) * 20;

        // Draw Flywheel
        const centerX = 80;
        const centerY = 60;
        const radius = 35;

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Flywheel spokes
        for (let i = 0; i < 4; i++) {
          const spAngle = angle + (i * Math.PI) / 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + Math.cos(spAngle) * radius, centerY + Math.sin(spAngle) * radius);
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Connecting Rod to Piston
        const pinX = centerX + Math.cos(angle) * (radius - 10);
        const pinY = centerY + Math.sin(angle) * (radius - 10);
        const pistonX = 200;
        const currentPistonY = 60 + pistonY;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pinX, pinY);
        ctx.lineTo(pistonX, currentPistonY);
        ctx.stroke();

        // Piston Cylinder
        ctx.fillStyle = '#334155';
        ctx.fillRect(190, 30, 80, 60);

        // Piston Head
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(pistonX - 10, currentPistonY - 15, 20, 30);

        // Steam Vapor particles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 5; i++) {
          const steamOffset = (angle * 20 + i * 15) % 40;
          ctx.beginPath();
          ctx.arc(240 + steamOffset, 40 + Math.sin(angle + i) * 8, 3 + (steamOffset / 10), 0, Math.PI * 2);
          ctx.fill();
        }

        // Labels
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Watt Steam Condenser (${steamPowerLevel}% output)`, 70, 110);

        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [phase, currentSlide, steamPowerLevel]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      const hintMsg = activeChallenge.hints[nextLvl - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand the content test.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Manipulate each simulation to discover the concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in the free sandbox. Test variables freely before entering the graded challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering graded challenges. Take your time and use hints if needed.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number, qIndex: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const targetQ = OBSERVATION_QUESTIONS[qIndex] || OBSERVATION_QUESTIONS[0];
    const isCorrect = idx === targetQ.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical observation!' : 'Look closely at the data gauges and graphs.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_HISTCIV_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Period of Transition curriculum.');
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

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well reasoned.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the step-by-step historical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleBostonTeaDump = useCallback(() => {
    setDumpedChestsCount(prev => {
      const next = Math.min(342, prev + 57);
      if (next >= 342) {
        audioManager.play('celebration');
        speechManager.speak('All 342 chests of British East India Company tea dumped into Boston Harbour!');
      } else {
        audioManager.play('pop');
      }
      return next;
    });
  }, []);

  // ─── DERIVED METRICS FOR LABS ───
  const calculatedWeaverSurvival = useMemo(() => {
    const impact = (steamPowerLevel * 0.4) + (bengalCapitalDrain * 0.3) + (colonialTariffLevel * 0.3);
    return Math.max(10, Math.round(150 - (impact * 0.95)));
  }, [steamPowerLevel, bengalCapitalDrain, colonialTariffLevel]);

  const calculatedLancashireOutput = useMemo(() => {
    return Math.round((steamPowerLevel * 1.5) + (bengalCapitalDrain * 1.2));
  }, [steamPowerLevel, bengalCapitalDrain]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE GENERATOR ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! Outstanding mastery of the transition era!';
    if (errCount >= 1 && errCount <= 3) return 'Great work! You have built solid historical analysis skills.';
    if (errCount >= 4 && errCount <= 7) return 'Good effort! Review the diagnostic profile to strengthen weak areas.';
    return 'Do not give up — You WILL get this! Re-examine the interactive labs and try again.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── HEADER & NAVIGATION BAR ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 20, scale: 1.15 }}
            className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              CISCE Class 8 • Humanities & Civics • Nodes 001–010
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ── 1. DISCOVERY HOOK PHASE ── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scenario Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/40 border border-amber-500/30 rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest rounded-full">
                  Curatorial Mission
                </span>
                <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
                <p className="text-slate-400 text-xs mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  📜 <span className="text-slate-200 font-semibold">Your Challenge:</span> {SCENARIO.context}
                </p>
              </div>
            </motion.div>

            {/* Discovery Question */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">🔍</span>
                <h3 className="text-base font-bold text-amber-300">Warm-up Historical Inquiry (Ungraded)</h3>
              </div>
              <p className="text-white text-base font-semibold leading-relaxed">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-2xl border transition-all text-sm leading-relaxed flex items-center justify-between ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && !discoveryCorrect
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <span>
                      <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3"
                >
                  <p className={`text-sm font-semibold flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                    <span>{discoveryCorrect ? '✓' : '💡'}</span>
                    {discoveryCorrect ? 'Spot on! You applied the Content Test over the Date Test.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label="Enter Interactive Labs"
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 text-sm flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. INTERACTIVE EXPLORATION (Brilliant.org Style Guided Labs) ── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Slide Navigation */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">🧪</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous lab step"
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-xl disabled:opacity-30"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next lab step"
                  onClick={() => {
                    if (currentSlide < EXPLORATION_STEPS.length - 1) {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    } else {
                      handleAdvanceToSandbox();
                    }
                  }}
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Lab →'}
                </motion.button>
              </div>
            </div>

            <p className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
              👉 <span className="text-amber-300 font-semibold">Interactive Task:</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ── LAB 1: SOURCE DETECTIVE (Multi-representation Matrix & Venn) ── */}
            {currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-300">Representation Mode</h4>
                  <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      aria-label="Switch to matrix representation"
                      onClick={() => setViewMode('matrix')}
                      className={`px-3 py-1 rounded-lg font-bold ${viewMode === 'matrix' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      Source Matrix
                    </button>
                    <button
                      aria-label="Switch to Venn diagram representation"
                      onClick={() => setViewMode('venn')}
                      className={`px-3 py-1 rounded-lg font-bold ${viewMode === 'venn' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      Venn / Relational View
                    </button>
                  </div>
                </div>

                {viewMode === 'matrix' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-3xl border border-slate-800">
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase text-amber-400">Archive Vault (Click to Inspect)</h4>
                      {[
                        { id: 'firman', title: '1582 Mughal Copper Firman', author: 'Imperial Chancery (Akbar)', type: 'Primary' },
                        { id: 'bernier', title: '1671 "Travels in Mughal Empire" (2024 Paperback)', author: 'François Bernier (Eyewitness)', type: 'Primary' },
                        { id: 'habib', title: '1963 "Agrarian System of Mughal India"', author: 'Prof. Irfan Habib (Modern Scholar)', type: 'Secondary' },
                        { id: 'textbook', title: '2023 ICSE History Textbook', author: 'Modern Education Board', type: 'Secondary' },
                      ].map(src => (
                        <motion.button
                          key={src.id}
                          whileHover={{ scale: 1.02, x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Inspect ${src.title}`}
                          onClick={() => {
                            setSelectedSourceId(src.id as 'firman' | 'bernier' | 'habib' | 'textbook');
                            audioManager.play('tap');
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex justify-between items-center ${
                            selectedSourceId === src.id
                              ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <p className="text-white font-semibold">{src.title}</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">{src.author}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                            src.type === 'Primary' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600' : 'bg-gold-950 text-gold-400 border border-gold-600'
                          }`}>
                            {src.type === 'Primary' ? '✓ Primary' : '📘 Secondary'}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                          Curator’s Content Test Analysis
                        </span>
                        <h5 className="text-lg font-bold text-white mt-1">
                          {selectedSourceId === 'firman' && '📜 Imperial Firman on Copper'}
                          {selectedSourceId === 'bernier' && '📖 2024 Reprint of Bernier (1671)'}
                          {selectedSourceId === 'habib' && '📊 Irfan Habib’s Agrarian System (1963)'}
                          {selectedSourceId === 'textbook' && '📚 Modern History Textbook'}
                        </h5>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {selectedSourceId === 'firman' && 'Original administrative artifact stamped under Akbar. Firsthand contemporary evidence of land revenue administration.'}
                          {selectedSourceId === 'bernier' && 'Bernier was a French physician living in Delhi in 1671. Even when reprinted in 2024, the content remains firsthand eyewitness observation.'}
                          {selectedSourceId === 'habib' && 'Synthesises hundreds of primary revenue firmans centuries after the events. It is an analytical interpretation built upon primary evidence.'}
                          {selectedSourceId === 'textbook' && 'A modern synthesis for students. It relies entirely on secondary and primary scholarship to teach concepts.'}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-amber-300">
                        💡 <span className="font-bold">Core Law:</span> Contemporaneity of Content &gt; Age of Paper.
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MULTI-REPRESENTATION 2: Venn / Relational Diagram */
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                    <h4 className="text-xs font-black uppercase text-amber-400 mb-3">Relational Structure: Primary vs Secondary</h4>
                    <svg viewBox="0 0 600 240" className="w-full">
                      <circle cx="230" cy="120" r="95" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
                      <circle cx="370" cy="120" r="95" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2" />
                      <text x="190" y="80" fill="#34d399" fontSize="13" fontWeight="bold">Primary Sources</text>
                      <text x="190" y="105" fill="#94a3b8" fontSize="10">• Contemporary to era</text>
                      <text x="190" y="125" fill="#94a3b8" fontSize="10">• Eyewitness accounts</text>
                      <text x="190" y="145" fill="#94a3b8" fontSize="10">• Royal decrees/firmans</text>

                      <text x="410" y="80" fill="#60a5fa" fontSize="13" fontWeight="bold">Secondary Sources</text>
                      <text x="410" y="105" fill="#94a3b8" fontSize="10">• Scholarly analysis</text>
                      <text x="410" y="125" fill="#94a3b8" fontSize="10">• Written post-event</text>
                      <text x="410" y="145" fill="#94a3b8" fontSize="10">• Synthesises records</text>

                      <text x="300" y="115" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Historical</text>
                      <text x="300" y="130" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Evidence Base</text>
                    </svg>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── LAB 2: THE THREE HINGE MOVEMENTS (SVG 1) ── */}
            {currentSlide === 1 && (
              <motion.div
                ref={timelineGsapRef}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">1453 to 1517: The Trigger Chain</h4>
                    <p className="text-xs text-slate-400">Slide the year to observe how the Ottoman blockade of Constantinople triggered voyages and the Reformation.</p>
                  </div>
                  <span className="px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-sm rounded-xl">
                    Year: {timelineYear}
                  </span>
                </div>

                <input
                  type="range"
                  min={1450}
                  max={1520}
                  step={1}
                  value={timelineYear}
                  aria-label="Timeline year slider"
                  onChange={(e) => {
                    setTimelineYear(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                {/* SVG 1: Timeline Hinge Diagram */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 700 200" className="w-full">
                    <line x1="50" y1="100" x2="650" y2="100" stroke="#334155" strokeWidth="4" />
                    {[
                      { year: 1453, label: 'Fall of Constantinople', x: 80, active: timelineYear >= 1453 },
                      { year: 1488, label: 'Dias: Cape of Good Hope', x: 230, active: timelineYear >= 1488 },
                      { year: 1492, label: 'Columbus: Americas', x: 370, active: timelineYear >= 1492 },
                      { year: 1498, label: 'Da Gama: Calicut, India', x: 500, active: timelineYear >= 1498 },
                      { year: 1517, label: 'Luther: 95 Theses', x: 620, active: timelineYear >= 1517 },
                    ].map((node, i) => (
                      <g key={i}>
                        <circle
                          cx={node.x}
                          cy="100"
                          r={node.active ? "14" : "9"}
                          fill={node.active ? "#f59e0b" : "#1e293b"}
                          stroke={node.active ? "#fbbf24" : "#475569"}
                          strokeWidth="3"
                          className="transition-all duration-300"
                        />
                        <text x={node.x} y="70" textAnchor="middle" fill={node.active ? "#fbbf24" : "#64748b"} fontSize="11" fontWeight="bold">
                          {node.year}
                        </text>
                        <text x={node.x} y="135" textAnchor="middle" fill={node.active ? "#ffffff" : "#475569"} fontSize="10">
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ── LAB 3: THE INDUSTRIAL-COLONIAL ENGINE (Canvas Animation + SVG 3) ── */}
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6"
              >
                {/* Predict-Then-Check */}
                {!predictionMade ? (
                  <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-3">
                    <p className="text-xs font-black uppercase text-amber-400">💡 Predict-Then-Check Inquiry</p>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Prediction option: ${opt}`}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 rounded-xl border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center justify-between">
                    <p className="text-xs text-emerald-300 font-semibold flex items-center gap-2">
                      <span>✓</span> Prediction registered! Manipulate sliders below to verify the real-time economic outcome.
                    </p>
                  </div>
                )}

                {/* HTML Canvas Animation */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-xs text-amber-400 font-bold uppercase mb-2">
                    Steam Engine Mechanical Motion (<span className="text-emerald-400">HTML5 Canvas Animation</span>)
                  </span>
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={130}
                    className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800"
                  />
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Steam Power (Watt 1776)</span>
                      <span className="text-amber-400">{steamPowerLevel}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={steamPowerLevel}
                      aria-label="Steam Power Level Slider"
                      onChange={(e) => {
                        setSteamPowerLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full mt-2 accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Bengal Capital Drain</span>
                      <span className="text-amber-400">{bengalCapitalDrain}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={bengalCapitalDrain}
                      aria-label="Bengal Capital Drain Slider"
                      onChange={(e) => {
                        setBengalCapitalDrain(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full mt-2 accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Colonial Tariff Discrimination</span>
                      <span className="text-amber-400">{colonialTariffLevel}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={colonialTariffLevel}
                      aria-label="Colonial Tariff Discrimination Slider"
                      onChange={(e) => {
                        setColonialTariffLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full mt-2 accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* SVG 3: Drain of Wealth & Deindustrialisation Loop */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <h5 className="text-xs font-bold text-amber-400 uppercase mb-2">Triangular Imperialist Extraction Feedback Loop</h5>
                  <svg viewBox="0 0 600 130" className="w-full">
                    <rect x="20" y="25" width="150" height="80" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="95" y="55" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Bengal Treasury</text>
                    <text x="95" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9">Diwani Tax Surplus (£)</text>

                    <path d="M 180 50 L 270 50" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                    <text x="225" y="40" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Capital Drain</text>

                    <rect x="280" y="25" width="150" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="355" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Lancashire Mills</text>
                    <text x="355" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9">Steam Power Mech</text>

                    <path d="M 355 110 L 355 125 L 95 125 L 95 110" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" />
                    <text x="225" y="120" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Dumping of cheap mill cloth → Crushes Dhaka Weavers</text>
                  </svg>
                </div>

                {/* Real-time Economic Outcome Gauges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 uppercase font-bold">Lancashire Factory Output Index</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-black text-amber-400">{calculatedLancashireOutput}k</span>
                      <span className="text-xs text-emerald-400 font-semibold">bolts of cloth/mo</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                        animate={{ width: `${Math.min(100, calculatedLancashireOutput / 2.7)}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 uppercase font-bold">Dhaka Handloom Weaver Population</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-black text-rose-400">{calculatedWeaverSurvival}k</span>
                      <span className="text-xs text-rose-300 font-semibold">(Plunged from 150k in 1757)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-rose-500"
                        animate={{ width: `${(calculatedWeaverSurvival / 150) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Observation Check */}
                {!observationAnswered && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-amber-300">Observation Check: What pattern do you observe?</p>
                    <div className="grid grid-cols-1 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          aria-label={`Observation option: ${opt}`}
                          onClick={() => handleObservation(i, 0)}
                          className="p-3 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-xl border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── LAB 4: THE THREE ESTATES & 1789 FLASHPOINT (SVG 2) ── */}
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6"
              >
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex gap-2">
                    {(['1st', '2nd', '3rd'] as const).map(est => (
                      <motion.button
                        key={est}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select ${est} estate`}
                        onClick={() => {
                          setSelectedEstate(est);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedEstate === est
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {est === '1st' && '1st Estate (Clergy)'}
                        {est === '2nd' && '2nd Estate (Nobles)'}
                        {est === '3rd' && '3rd Estate (98% People)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 px-2 font-semibold">Voting Rule:</span>
                    <button
                      aria-label="Vote by Order"
                      onClick={() => setVotingSystem('by_order')}
                      className={`px-2 py-1 rounded-lg font-bold ${votingSystem === 'by_order' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      By Order (1 vote/estate)
                    </button>
                    <button
                      aria-label="Vote by Head"
                      onClick={() => setVotingSystem('by_head')}
                      className={`px-2 py-1 rounded-lg font-bold ${votingSystem === 'by_head' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      By Head (1 vote/delegate)
                    </button>
                  </div>
                </div>

                {/* SVG 2: Social Pyramid of the Old Regime */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Old Regime Social Pyramid</h5>
                    <svg viewBox="0 0 280 180" className="w-full">
                      {/* Top Tier: 1st Estate */}
                      <polygon points="140,20 110,65 170,65" fill={selectedEstate === '1st' ? '#fbbf24' : '#334155'} stroke="#f59e0b" strokeWidth="2" />
                      <text x="140" y="50" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1st: Clergy (&lt;1%)</text>

                      {/* Middle Tier: 2nd Estate */}
                      <polygon points="110,67 170,67 205,115 75,115" fill={selectedEstate === '2nd' ? '#fbbf24' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" />
                      <text x="140" y="95" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">2nd: Nobility (2%)</text>

                      {/* Bottom Tier: 3rd Estate */}
                      <polygon points="75,117 205,117 250,170 30,170" fill={selectedEstate === '3rd' ? '#f43f5e' : '#0f172a'} stroke="#f43f5e" strokeWidth="2" />
                      <text x="140" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">3rd: Commoners (98% pop / 100% tax)</text>
                    </svg>
                  </div>

                  {/* Estates-General Simulation Result */}
                  <div className="flex flex-col justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Estates-General Vote Result</span>
                      <p className="text-xs font-bold text-white mt-1">
                        {votingSystem === 'by_order'
                          ? '✗ 1st & 2nd Estates Vote Together: Third Estate Outvoted 2-to-1!'
                          : '✓ Vote by Head: Third Estate (600 reps) + Reformers Command Majority!'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        {votingSystem === 'by_order'
                          ? 'Because each estate got only one collective vote, the two tax-exempt orders always combined to defeat any tax reform on the nobility.'
                          : 'Voting by head recognized popular sovereignty. When King Louis XVI locked the Third Estate out, they walked to the Tennis Court!'}
                      </p>
                    </div>

                    {!tennisOathTriggered ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Swear Tennis Court Oath"
                        onClick={() => {
                          setTennisOathTriggered(true);
                          audioManager.play('celebration');
                          speechManager.speak('20 June 1789: The Third Estate swears the Tennis Court Oath!');
                        }}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black rounded-xl"
                      >
                        Swear the Tennis Court Oath (20 June 1789) →
                      </motion.button>
                    ) : (
                      <div className="mt-3 p-2 bg-emerald-950/60 border border-emerald-500 rounded-xl text-center text-xs text-emerald-300 font-bold">
                        📜 National Assembly Formed: "We will not disband until France has a Constitution!"
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── LAB 5: ATLANTIC CRISIS & BOSTON HARBOUR ── */}
            {currentSlide === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">16 December 1773: The Boston Tea Party</h4>
                    <p className="text-xs text-slate-400">Dump the 342 chests of British East India Company tea into Boston Harbour.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Dump Tea Chests into Boston Harbour"
                    onClick={handleBostonTeaDump}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg"
                  >
                    🫖 Dump Tea Chests (+57)
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 font-semibold">Chests Dumped</span>
                    <p className="text-3xl font-black text-amber-400 mt-1">{dumpedChestsCount} / 342</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                      <motion.div className="bg-amber-500 h-full" animate={{ width: `${(dumpedChestsCount / 342) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 font-semibold">Estimated Value</span>
                    <p className="text-3xl font-black text-rose-400 mt-1">£{Math.round((dumpedChestsCount / 342) * 9659)}</p>
                    <span className="text-[11px] text-slate-500">18th-century pounds</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">Parliament's Retaliation</span>
                    <p className="text-xs text-slate-200 font-bold mt-1">
                      {dumpedChestsCount >= 342
                        ? '🚨 Intolerable Acts (1774): Boston Harbour closed, Massachusetts charter revoked -> First Continental Congress!'
                        : 'Protest in progress... Dump all chests to trigger Parliament’s reaction.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. SANDBOX PHASE (Free Play, No Grading) ── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase rounded-full">
                Free Exploration Sandbox
              </span>
              <h2 className="text-xl font-bold text-white mt-3">Macro-Historical Simulation Studio</h2>
              <p className="text-slate-300 text-xs mt-1">
                Freely experiment with the industrial engine, source classification matrix, and revolutionary variables without any penalty.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-400">Industrial & Trade Modifiers</h4>
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Steam Engine Efficiency</span>
                      <span className="text-amber-400 font-bold">{steamPowerLevel}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={steamPowerLevel}
                      aria-label="Sandbox Steam Power Slider"
                      onChange={(e) => setSteamPowerLevel(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Colonial Capital Siphon (£ Millions)</span>
                      <span className="text-amber-400 font-bold">£{bengalCapitalDrain * 3}M/yr</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={bengalCapitalDrain}
                      aria-label="Sandbox Bengal Capital Slider"
                      onChange={(e) => setBengalCapitalDrain(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-amber-400">Simulated Global Impacts</h4>
                    <ul className="text-xs text-slate-300 space-y-2 mt-3">
                      <li>• <strong>Manchester Mill Output:</strong> {calculatedLancashireOutput}k bolts/mo</li>
                      <li>• <strong>Dhaka Artisan Survival:</strong> {calculatedWeaverSurvival}k weavers</li>
                      <li>• <strong>Drain of Wealth Index:</strong> £{bengalCapitalDrain * 3}M annual non-reciprocal transfer</li>
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Proceed to graded challenges"
                    onClick={handleAdvanceToChallenge}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
                  >
                    I am Ready for Graded Challenges →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. GRADED CHALLENGE PHASE ── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key={`challenge-${currentChallenge}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-semibold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Competency: {activeChallenge.competencyLevel}
                </p>
              </div>

              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {activeChallenge.question}
              </h3>

              {/* MCQ TYPES */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`text-left p-4 rounded-2xl border transition-all text-sm leading-relaxed flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/50 hover:bg-slate-900'
                      }`}
                    >
                      <span>
                        <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                      </span>
                      {showExplanation && (
                        <span className="font-black text-xs ml-2">
                          {i === activeChallenge.correctIndex ? '✓ Correct' : '��'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* DRAG-LABEL TYPE */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable inventor label: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs cursor-grab"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'slot_steam', title: 'Steam Engine w/ Separate Condenser' },
                      { id: 'slot_jenny', title: 'Multi-Spindle Spinning Jenny' },
                      { id: 'slot_loom', title: 'Mechanised Power Loom' },
                      { id: 'slot_rail', title: 'Rocket Railway Locomotive' },
                    ].map(slot => (
                      <div
                        key={slot.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(slot.id)}
                        className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col justify-between min-h-[90px]"
                      >
                        <span className="text-xs text-slate-400 font-semibold">{slot.title}</span>
                        <p className="text-xs font-bold text-amber-300 mt-2">
                          {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop Inventor Label Here'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Validate dragged inventions"
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Validate Inventions →
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT TYPE */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3 pt-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Chronological item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 font-black rounded-lg text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Check Chronological Order"
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Check Chronological Order →
                  </motion.button>
                </div>
              )}

              {/* NUMERIC TYPE */}
              {activeChallenge.type === 'numeric' && (
                <div className="pt-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label="Computed numeric answer"
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter computed value"
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-bold w-48"
                    />
                    <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Check numeric answer"
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation}
                      className="px-5 py-3 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CONSTRUCT TYPE */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="pt-2 space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add block: ${part}`}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-amber-500/20 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/40"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap items-center gap-2">
                    {constructParts.map((p, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs flex items-center gap-2"
                      >
                        {p}
                        <button
                          aria-label={`Remove block ${p}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 italic">Click building blocks above to assemble the feedback loop...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Validate causal chain"
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Validate Causal Chain →
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-4"
                >
                  <p className="text-xs font-black uppercase text-amber-400">Step-by-Step Historical Explanation</p>
                  <div className="space-y-2">
                    {activeChallenge.explanation
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
                          <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Reveal next sentence of explanation"
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        aria-label="Proceed to next challenge"
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 5. COMPLETION, REFLECTION & MASTERY PROFILE PHASE ── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4">
              <span className="text-4xl" aria-hidden="true">🏛️</span>
              <h2 className="text-2xl font-black text-white">Curatorial Certification Complete!</h2>
              <p className="text-xs text-slate-400">Class 8 History & Civics: Period of Transition (1453–1815)</p>

              <div className="flex justify-center gap-6 py-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-3xl font-black text-amber-400 mt-1">{Math.max(0, 100 - errors * 4)}%</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Mastery Level</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1 capitalize">{masteryLevel}</p>
                </div>
              </div>

              {/* Motivational Feedback Banner */}
              <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed border ${
                errors === 0
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : errors <= 3
                  ? 'bg-gold-950/40 border-gold-500/40 text-gold-300'
                  : errors <= 7
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                {getMotivationalFeedback(errors)}
              </div>
            </div>

            {/* Spaced Repetition Schedule (SRS) Card */}
            <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-gold-950/50 border-2 border-amber-500/50 rounded-3xl text-slate-200 shadow-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">🔄</span>
                  <div>
                    <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider">
                      Spaced Repetition Schedule (SRS)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Optimised memory retention interval based on your performance
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider shadow-md">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>
                  🧠 <strong>Next Recommended Review:</strong>{' '}
                  <span className="text-amber-300 font-bold">
                    {errors === 0
                      ? '7 days (Mastery retained — 0 errors)'
                      : errors <= 3
                      ? '3 days (Minor reinforcement — 1 to 3 errors)'
                      : '1 day (Immediate reinforcement required — 4+ errors)'}
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">SM-2 Algorithm Interval</span>
              </div>
            </div>

            {/* Reflection Questions Section */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider">
                💭 Post-Simulation Reflection
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <input
                    type="text"
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g. How a 2024 reprint of Bernier is still a primary source..."
                    aria-label="Reflection question 1"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <input
                    type="text"
                    value={reflectionAnswers.explain}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="e.g. History is like a bridge where colonial trade reshaped world economies..."
                    aria-label="Reflection question 2"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <input
                    type="text"
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g. In evaluating modern news sources for primary vs secondary evidence..."
                    aria-label="Reflection question 3"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Tracking Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/30 border border-rose-500/40 rounded-3xl space-y-4">
                <h3 className="text-sm font-black uppercase text-rose-300 tracking-wider">
                  ⚠️ Your Diagnostic Misconception Profile
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                        <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Historical Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Capstone Real-World Activity */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                    <span className="text-amber-400 font-bold mr-2">{i + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsPeriodTransitionMeaningSim;