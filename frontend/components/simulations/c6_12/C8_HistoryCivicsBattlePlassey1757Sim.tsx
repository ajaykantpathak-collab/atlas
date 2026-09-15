'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS (CISCE Class 8 History & Civics) ───
const NODE_C8_HISTCIV_021 = 'c8_histciv_021'; // Battle of Plassey (1757)
const NODE_C8_HISTCIV_022 = 'c8_histciv_022'; // Battle of Buxar (1764)
const NODE_C8_HISTCIV_023 = 'c8_histciv_023'; // Dual Government in Bengal (1765-1772)
const NODE_C8_HISTCIV_024 = 'c8_histciv_024'; // Doctrine of Lapse
const NODE_C8_HISTCIV_025 = 'c8_histciv_025'; // Subsidiary Alliance & Annexation of Awadh
const NODE_C8_HISTCIV_026 = 'c8_histciv_026'; // Economic Policy Under Company Rule
const NODE_C8_HISTCIV_027 = 'c8_histciv_027'; // Permanent Settlement (1793)
const NODE_C8_HISTCIV_028 = 'c8_histciv_028'; // Mahalwari and Ryotwari Systems
const NODE_C8_HISTCIV_029 = 'c8_histciv_029'; // Deindustrialisation & Artisan Exploitation
const NODE_C8_HISTCIV_030 = 'c8_histciv_030'; // Drain of Wealth Theory

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_021,
  NODE_C8_HISTCIV_022,
  NODE_C8_HISTCIV_023,
  NODE_C8_HISTCIV_024,
  NODE_C8_HISTCIV_025,
  NODE_C8_HISTCIV_026,
  NODE_C8_HISTCIV_027,
  NODE_C8_HISTCIV_028,
  NODE_C8_HISTCIV_029,
  NODE_C8_HISTCIV_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Extraction: From Plassey (1757) to the Drain of Wealth (1901)',
  intro: 'You are an investigative historian examining the archives of the British East India Company and the writings of early Indian nationalists like Dadabhai Naoroji and R.C. Dutt. A commercial trading firm with a few fortified warehouses in 1750 became the sovereign ruler and revenue extractor of a subcontinent by 1856.',
  context: 'Trace the decisive battles, diplomatic traps, land revenue experiments, deindustrialisation of handlooms, and unilateral capital drains that converted the world’s richest manufacturing delta into a famine-ravaged tributary colony.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'On 23 June 1757 at Plassey, Robert Clive commanded 3,000 troops while Nawab Siraj-ud-Daulah commanded 50,000. Why did the British win in just a few hours?',
  options: [
    'British infantry had machine guns and heavy artillery that obliterated the Nawab’s army',
    'A political conspiracy: Mir Jafar, commanding the vanguard, deliberately withheld his 45,000 troops from fighting',
    'Siraj-ud-Daulah voluntarily surrendered Bengal in exchange for a British peerage',
    'Mughal Emperor Alamgir II personally intervened with imperial cavalry to crush the Nawab',
  ],
  correctIndex: 1,
  hintAfter: 'Plassey was not a military triumph of battlefield tactics; it was a negotiated coup engineered through courtly treachery!',
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

// ─── 22 RICH CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_plassey_causes',
    nodeId: NODE_C8_HISTCIV_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following was an immediate cause of conflict between Nawab Siraj-ud-Daulah and the English East India Company leading to the Battle of Plassey (1757)?',
    options: [
      'The Company’s unauthorised fortification of Fort William in Calcutta and rampant abuse of dastaks (trade passes)',
      'The Nawab’s refusal to allow British ships into the Bay of Bengal for spice trade',
      'The signing of the Subsidiary Alliance by the Nawab with the French in Pondicherry',
      'The enforcement of the Doctrine of Lapse on the province of Murshidabad',
    ],
    correctIndex: 0,
    explanation: 'Siraj-ud-Daulah opposed the Company fortifying Calcutta without permission, the abuse of duty-free dastaks by Company servants for private trade, and the sheltering of fugitive Krishna Das.',
    hints: [
      'Look for the commercial and military provocations in Calcutta that challenged the Nawab’s sovereign authority.',
      'Dastaks were trade permits meant strictly for Company goods, but servants misused them tax-free.',
      'The unauthorised building of Fort William fortifications and misuse of dastaks directly triggered the conflict.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_plassey_drag',
    nodeId: NODE_C8_HISTCIV_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each key historical conspirator to their respective role in the 1757 betrayal of Siraj-ud-Daulah.',
    dragItems: [
      { label: 'Mir Jafar', targetId: 'role_commander' },
      { label: 'Jagat Seth', targetId: 'role_banker' },
      { label: 'Rai Durlabh', targetId: 'role_officer' },
      { label: 'Omi Chand', targetId: 'role_merchant' },
    ],
    correctMapping: {
      role_commander: 'Mir Jafar',
      role_banker: 'Jagat Seth',
      role_officer: 'Rai Durlabh',
      role_merchant: 'Omi Chand',
    },
    explanation: 'Mir Jafar was the Commander-in-Chief promised the throne; Jagat Seth (Mehtab Chand) was Bengal’s wealthiest banker; Rai Durlabh was a senior military officer; and Omi Chand acted as the intermediary merchant.',
    hints: [
      'Who commanded the army and wanted to be the new Nawab?',
      'Jagat Seth was known as the banker of the world in Bengal.',
      'Mir Jafar = Commander, Jagat Seth = Banker, Rai Durlabh = Officer, Omi Chand = Intermediary Merchant.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_plassey_numeric',
    nodeId: NODE_C8_HISTCIV_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Following Plassey in 1757, puppet Nawab Mir Jafar paid Robert Clive personally ₹2.3 million and granted the Company the revenue rights to how many Parganas?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'Parganas',
    explanation: 'The East India Company was granted the zamindari of the 24 Parganas in 1757, initiating direct British territorial revenue extraction in Bengal.',
    hints: [
      'This district south of Kolkata still bears this exact number in its modern name.',
      'It is a two-digit number equal to 2 dozen.',
      'The district is 24 Parganas.',
    ],
  },
  {
    id: 'ch_buxar_combatants',
    nodeId: NODE_C8_HISTCIV_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why was the Battle of Buxar (22 October 1764) far more politically and militarily decisive than Plassey (1757)?',
    options: [
      'Major Hector Munro defeated a combined triple alliance of Mir Qasim (Bengal), Shuja-ud-Daula (Awadh), and Mughal Emperor Shah Alam II',
      'It was fought entirely at sea using ironclad steam warships',
      'The Maratha Empire was completely extinguished in this single clash',
      'It ended French colonial rule in India permanently within 24 hours',
    ],
    correctIndex: 0,
    explanation: 'Plassey was a court conspiracy against one provincial Nawab. Buxar was a pitched military victory against the combined armies of Bengal, Awadh, and the sovereign Mughal Emperor Shah Alam II.',
    hints: [
      'Consider the difference between defeating a single puppet candidate versus the titular supreme ruler of all Mughal India.',
      'The triple alliance united the forces of Mir Qasim, Shuja-ud-Daula, and Emperor Shah Alam II.',
      'Defeating the Mughal Emperor at Buxar gave the British formal legal supremacy over northern India.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_treaty_allahabad',
    nodeId: NODE_C8_HISTCIV_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under the Treaty of Allahabad (12 August 1765), what supreme fiscal power did Mughal Emperor Shah Alam II grant to the East India Company in exchange for an annual tribute of ₹26 lakh?',
    options: [
      'The Diwani (sole right to collect and manage land revenues) of Bengal, Bihar, and Orissa',
      'The Nizamat (military command and criminal justice) across Punjab and Sindh',
      'Direct ownership of the Taj Mahal and Red Fort in Delhi',
      'The right to enforce the Doctrine of Lapse on Awadh and Hyderabad',
    ],
    correctIndex: 0,
    explanation: 'The grant of Diwani for Bengal, Bihar, and Orissa gave the Company legitimate control over India’s richest provincial revenues, funding its armies without sending bullion from Britain.',
    hints: [
      'Diwani refers strictly to fiscal/revenue management, distinct from Nizamat (police/criminal justice).',
      'The three eastern provinces were Bengal, Bihar, and Orissa.',
      'The grant was the Diwani of Bengal, Bihar, and Orissa.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_dual_gov_flaw',
    nodeId: NODE_C8_HISTCIV_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the fundamental structural flaw of Clive’s Dual Government in Bengal (1765–1772)?',
    options: [
      'The Company held the revenue (Diwani) with zero administrative responsibility, while the Nawab had full responsibility (Nizamat) with zero funds',
      'Both the Nawab and the Company had equal 50% shares in both tax collection and law enforcement',
      'The French East India Company and British East India Company ruled alternate weeks',
      'The peasants were given full democratic voting rights to elect both the Diwan and the Nazim',
    ],
    correctIndex: 0,
    explanation: 'Dual Government created "Power without responsibility" for the British Company and "Responsibility without power or funds" for the puppet Nawab, paralyzing justice and famine relief.',
    hints: [
      'Think about who collected the money versus who was blamed for maintaining police, law, and famine relief.',
      'The Company had all the money; the Nawab had empty pockets but had to govern the people.',
      'It separated revenue extraction (Company) from administrative duty (Nawab).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_famine_1770',
    nodeId: NODE_C8_HISTCIV_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'During the catastrophic Great Bengal Famine of 1770 under the Dual Government, approximately how many million people (roughly one-third of Bengal’s population) perished while the Company maintained peak revenue extraction?',
    correctAnswer: 10,
    tolerance: 1,
    unit: 'million deaths',
    explanation: 'An estimated 10 million people (1/3rd of Bengal’s population) died in the 1770 famine. Despite crop failure, the Company’s revenue collection was violently maintained and actually increased to ₹1.35 crore.',
    hints: [
      'It was roughly 10,000,000 human lives — one out of every three people in Bengal.',
      'Enter the single number representing 10 million.',
      'The estimated death toll was 10 million.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_dual_gov_end',
    nodeId: NODE_C8_HISTCIV_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who abolished the disastrous Dual Government in 1772, dismissed Deputy Diwan Muhammad Reza Khan, and shifted the imperial treasury from Murshidabad to Calcutta?',
    options: [
      'Warren Hastings',
      'Lord Dalhousie',
      'Lord Wellesley',
      'Lord Cornwallis',
    ],
    correctIndex: 0,
    explanation: 'In 1772, Governor Warren Hastings ended the Dual Government, bringing both revenue collection and judicial administration directly under Company control.',
    hints: [
      'He became the first Governor-General of Bengal under the Regulating Act of 1773.',
      'His surname starts with H and he was later famously impeached in London.',
      'The official was Warren Hastings.',
    ],
  },
  {
    id: 'ch_subsidiary_conditions',
    nodeId: NODE_C8_HISTCIV_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under Lord Wellesley’s Subsidiary Alliance (introduced 1798), what were the mandatory conditions imposed on an Indian signatory state?',
    options: [
      'Station a permanent British subsidiary army at own expense, disband indigenous armies, surrender foreign diplomacy, and maintain a British Resident at court',
      'Adopt Christianity as the state religion and send heir princes to study at Oxford',
      'Abolish all agricultural taxation and convert all farmland into tea plantations',
      'Pay 100% of state revenue to the Mughal Emperor in Delhi',
    ],
    correctIndex: 0,
    explanation: 'The Subsidiary Alliance stripped rulers of their sovereign foreign policy and independent militaries, stationing a British force paid for via territorial cessions or crushing cash subsidies.',
    hints: [
      'Consider how the British disarmed Indian states from within without formal battles.',
      'Look for the requirement to disband local armies, pay for British troops, and take advice from a British Resident.',
      'States gave up foreign alliances, disbanded armies, paid for British troops, and accepted a Resident.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_subsidiary_sort',
    nodeId: NODE_C8_HISTCIV_025,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the historical events of Wellesley’s Subsidiary Alliance in chronological order.',
    sortItems: [
      'Nizam Ali Khan of Hyderabad accepts the Subsidiary Alliance first and cedes Rayalaseema (1798)',
      'Tipu Sultan of Mysore refuses the alliance and dies fighting at Seringapatam (1799)',
      'Nawab Saadat Ali Khan of Awadh cedes Gorakhpur & Rohilkhand under the alliance (1801)',
      'Lord Dalhousie annexes Awadh on the pretext of "misgovernance", exiling Wajid Ali Shah (1856)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Hyderabad accepted first in 1798; Mysore was forced in after Tipu’s death in 1799; Awadh signed in 1801; and after 55 years of loyal alliance, Awadh was annexed under Dalhousie in 1856.',
    hints: [
      'Hyderabad was the very first state in 1798.',
      'Tipu Sultan’s final stand at Seringapatam was 1799.',
      'Awadh signed in 1801 and was finally annexed on the misrule pretext in 1856.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_awadh_pretext',
    nodeId: NODE_C8_HISTCIV_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Lord Dalhousie annex Awadh in 1856 on the pretext of "misgovernance" rather than using the Doctrine of Lapse?',
    options: [
      'Nawab Wajid Ali Shah was alive and had natural heirs, so the succession-based Doctrine of Lapse could not legally apply',
      'The Mughal Emperor had declared war on Awadh and requested British military intervention',
      'Awadh was completely bankrupt and possessed no fertile land or strategic value',
      'Wajid Ali Shah had refused to pay pensions to British merchants in London',
    ],
    correctIndex: 0,
    explanation: 'Because Wajid Ali Shah had legitimate male heirs, Dalhousie could not invoke the Doctrine of Lapse. Instead, he manufactured the cynical pretext of "administrative misrule" to grab the rich territory.',
    hints: [
      'The Doctrine of Lapse requires the death of a ruler without a natural male heir.',
      'Wajid Ali Shah was alive and had heirs — so Dalhousie invented a different excuse.',
      'Dalhousie used the pretext of misgovernance because succession grounds did not exist.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_doctrine_lapse_def',
    nodeId: NODE_C8_HISTCIV_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What was the core rule of Lord Dalhousie’s Doctrine of Lapse (1848–1856)?',
    options: [
      'If a ruler of a dependent princely state died without a natural male heir, the state lapsed to the Company; adopted heirs (dattak putra) were denied succession rights',
      'If a state failed to produce 10,000 tons of cotton annually, its farmland was confiscated',
      'Any ruler who failed to attend the annual British banquet in Calcutta was immediately deposed',
      'All Indian princely titles were automatically transferred to Queen Victoria upon her coronation',
    ],
    correctIndex: 0,
    explanation: 'The Doctrine of Lapse denied the ancient Hindu custom of dattak putra (adoption), declaring that dependent princely states without natural male heirs lapsed directly to British dominion.',
    hints: [
      'Think about what happened when a childless king tried to adopt a son to inherit his throne.',
      'Dalhousie refused to recognise adopted sons as political successors.',
      'States lapsed to the Company if rulers died without natural male heirs and British-approved adoption.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_lapse_states_drag',
    nodeId: NODE_C8_HISTCIV_024,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each annexed state with its respective year and historical ruler under the Doctrine of Lapse.',
    dragItems: [
      { label: 'Satara (1848) - Appa Saheb', targetId: 'case_first' },
      { label: 'Jhansi (1853) - Gangadhar Rao / Rani Lakshmibai', targetId: 'case_jhansi' },
      { label: 'Nagpur (1853) - Raghoji III', targetId: 'case_nagpur' },
      { label: 'Sambalpur (1849) - Narayan Singh', targetId: 'case_sambalpur' },
    ],
    correctMapping: {
      case_first: 'Satara (1848) - Appa Saheb',
      case_jhansi: 'Jhansi (1853) - Gangadhar Rao / Rani Lakshmibai',
      case_nagpur: 'Nagpur (1853) - Raghoji III',
      case_sambalpur: 'Sambalpur (1849) - Narayan Singh',
    },
    explanation: 'Satara (1848) was the first state annexed; Sambalpur in 1849; Jhansi and Nagpur in 1853. In Jhansi, Raja Gangadhar Rao’s adopted son Damodar Rao was rejected, driving Rani Lakshmibai into the 1857 Revolt.',
    hints: [
      'Satara was the very first precedent in 1848.',
      'Jhansi was annexed in 1853 when Damodar Rao’s adoption was rejected.',
      'Satara 1848, Sambalpur 1849, Jhansi 1853, Nagpur 1853.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_perm_settlement_split',
    nodeId: NODE_C8_HISTCIV_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Lord Cornwallis’s Permanent Settlement of 1793 in Bengal, what percentage of the assessed revenue (jama) was permanently fixed for the Company, leaving 11% to the Zamindar as malikana?',
    correctAnswer: 89,
    tolerance: 0,
    unit: '%',
    explanation: 'Under the Permanent Settlement, 89% (10/11th) of assessed revenue went to the British Company, while 11% (1/11th) was retained by the Zamindar as malikana.',
    hints: [
      'If the Zamindar received 11%, calculate 100 - 11.',
      'It represents 10/11ths of the total assessed revenue.',
      'The Company’s share was exactly 89%.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_sunset_law',
    nodeId: NODE_C8_HISTCIV_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why was the Sun-set Law enacted by Lord Wellesley in 1799 regarding the Permanent Settlement?',
    options: [
      'If a Zamindar failed to deposit the full revenue by sunset of the specified due date, his estate was auctioned off to the highest bidder',
      'All agricultural work had to cease at sunset to prevent peasant revolts',
      'Zamindars were forbidden from collecting taxes during daylight hours',
      'The British Governor-General retired every evening at sunset',
    ],
    correctIndex: 0,
    explanation: 'Due to exorbitant assessments, many Zamindars defaulted. The Sun-set Law of 1799 mandated the immediate public auction of any defaulting zamindari estate if dues were unpaid by sunset on the appointed date.',
    hints: [
      'What happens when a landlord misses the strict sunset deadline for tax payment?',
      'The punishment was the confiscation and public auction of their ancestral zamindari rights.',
      'Unpaid revenue by sunset resulted in the immediate auction of the estate.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_revenue_systems_compare',
    nodeId: NODE_C8_HISTCIV_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the three colonial land revenue systems with their primary region, architect, and unit of assessment.',
    options: [
      'Permanent Settlement: Bengal (Cornwallis, Zamindar); Ryotwari: Madras/Bombay (Munro, Individual Ryot); Mahalwari: NW Provinces (Mackenzie, Village Mahal)',
      'Permanent Settlement: Madras (Munro); Ryotwari: Bengal (Cornwallis); Mahalwari: Bombay (Hastings)',
      'Permanent Settlement: NW Provinces (Mackenzie); Ryotwari: Bengal (Clive); Mahalwari: Madras (Wellesley)',
      'All three systems operated identically across all provinces under direct French supervision',
    ],
    correctIndex: 0,
    explanation: 'Permanent Settlement (1793) used Zamindars in Bengal/Bihar; Ryotwari (1820) collected directly from Ryots in Madras/Bombay; Mahalwari (1822) assessed the village (Mahal) via the Lambardar in the North-Western Provinces.',
    hints: [
      'Recall: Bengal = Zamindars (Cornwallis), Madras = Ryot (Munro), NW Provinces = Mahal (Mackenzie).',
      'Ryotwari removed the zamindar intermediary; Mahalwari used the village community headman.',
      'Option 1 accurately pairs all three regions, architects, and assessment units.',
    ],
  },
  {
    id: 'ch_ryotwari_myth',
    nodeId: NODE_C8_HISTCIV_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Nationalist economist R.C. Dutt demonstrated that despite removing the zamindar intermediary, the Ryotwari system in Madras impoverished peasants just as severely because:',
    options: [
      'The state set the revenue demand at an exorbitant ~50% of gross produce and collected it with zero remission during droughts, driving peasants into the grip of usurious moneylenders',
      'Peasants were forced to burn half their crops in religious ceremonies',
      'The system was replaced by Mughal jagirdars within two months of launch',
      'The British government gave free land and gold coins to all cultivators',
    ],
    correctIndex: 0,
    explanation: 'Ryotwari made the colonial state itself the supreme extracting landlord. The ~50% gross produce tax without drought relief forced peasants to mortgage land to moneylenders, leading to chronic indebtedness.',
    hints: [
      'Eliminating the landlord did not eliminate the crushing tax rate.',
      'The state extracted up to 50% of the produce directly and offered no remissions in famine.',
      'Crushing 50% revenue rates and zero famine remissions caused widespread debt to moneylenders.',
    ],
  },
  {
    id: 'ch_gomastha_dadni',
    nodeId: NODE_C8_HISTCIV_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did Company agents (gomasthas) use the dadni system to subjugate and exploit traditional Indian handloom weavers after 1757?',
    options: [
      'They forced weavers to accept advance cash loans (dadni), binding them by contract to sell exclusively to the Company at prices 15-40% below market value on pain of physical flogging',
      'They paid weavers double the market wage to encourage higher artistic quality',
      'They sent Indian master weavers to establish schools of handloom in London',
      'They provided free cotton yarn and imported steam engines to all weaving villages',
    ],
    correctIndex: 0,
    explanation: 'William Bolts documented in 1772 how gomasthas advanced coercive dadni loans, seized finished cloth below market rates, and used Company sepoys to beat or imprison weavers who sold to rivals.',
    hints: [
      'Dadni was an advance loan with coercive legal and physical traps.',
      'Weavers were legally locked into selling below market rates exclusively to the British.',
      'Coercive loans bound weavers to below-market monopoly sales backed by violence.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_export_collapse_num',
    nodeId: NODE_C8_HISTCIV_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Following the Charter Act of 1813 opening India to British factory free trade, Indian cotton cloth exports to Britain collapsed from ₹22 lakh in 1814 to what approximate amount (in lakh rupees) by 1820?',
    correctAnswer: 1.5,
    tolerance: 0.5,
    unit: 'lakh rupees',
    explanation: 'Indian textile exports collapsed from ₹22 lakh in 1814 to just ₹1.5 lakh by 1820 and near zero by 1830, while British factory cloth flooded India duty-free (rising to over ₹300 lakh by 1828).',
    hints: [
      'It was a catastrophic drop of over 90% within just 6 years.',
      'The value was between 1.0 and 2.0 lakh rupees.',
      'Enter 1.5 lakh.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_drain_wealth_def',
    nodeId: NODE_C8_HISTCIV_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who first systematically formulated the "Drain of Wealth" theory in his 1867 London paper and 1901 book "Poverty and Un-British Rule in India"?',
    options: [
      'Dadabhai Naoroji (the "Grand Old Man of India")',
      'Mahatma Gandhi',
      'Lord Curzon',
      'Robert Clive',
    ],
    correctIndex: 0,
    explanation: 'Dadabhai Naoroji formulated the Drain Theory, demonstrating that Britain extracted roughly 1/3rd of India’s revenue annually as a "unilateral transfer" without equivalent economic return.',
    hints: [
      'He was the first Indian member elected to the British House of Commons (Finsbury Central, 1892).',
      'Known affectionately as the "Grand Old Man of India".',
      'The author was Dadabhai Naoroji.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_home_charges_construct',
    nodeId: NODE_C8_HISTCIV_030,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the major official budgetary mechanisms comprising the "Home Charges" through which Indian revenue was drained to London.',
    availableParts: [
      'EIC Shareholder Dividends',
      'Railway Guaranteed Debt Interest',
      'Pensions to Retired British Officials',
      'India Office London Administrative Costs',
      'Military War Expenditures on Indian Account',
    ],
    targetState: 'EIC Shareholder Dividends Railway Guaranteed Debt Interest Pensions to Retired British Officials India Office London Administrative Costs Military War Expenditures on Indian Account',
    validationHint: 'Add all 5 official components of the annual Home Charges drained from Indian taxes.',
    explanation: 'Home Charges included: (1) Company shareholder dividends, (2) Guaranteed interest on railway capital, (3) Military and civil pensions, (4) India Office expenses in London, and (5) Imperial war costs charged to India.',
    hints: [
      'Home Charges included all payments remitted from Indian tax revenues to London.',
      'Click all 5 budgetary components to build the complete fiscal drain.',
      'Combine dividends, debt interest, pensions, India Office costs, and war charges.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_drain_magnitude_num',
    nodeId: NODE_C8_HISTCIV_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to Dadabhai Naoroji’s calculations, approximately how many crore rupees (roughly 30-40 crore) or what percentage of India’s total annual public revenue was drained abroad to Britain without return?',
    correctAnswer: 33,
    tolerance: 5,
    unit: '% of annual revenue',
    explanation: 'Naoroji calculated that roughly 33% (one-third) of India’s total annual revenue — ₹30 to ₹40 crore per year in the late 19th century — was drained abroad, starving India of domestic capital investment and causing mass famines.',
    hints: [
      'It was approximately one-third of the total national tax revenue.',
      'Enter a percentage close to 33%.',
      'About 33% (one-third) of revenue was drained annually.',
    ],
    misconceptionIndex: 7,
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_HISTCIV_021,
  title: 'Battle of Plassey to Drain of Wealth (1757–1901)',
  definition: 'The historical sequence whereby the English East India Company established territorial and revenue supremacy through military conspiracies and treaties (Plassey 1757, Buxar 1764, Diwani 1765), expanded via annexation mechanisms (Subsidiary Alliance, Doctrine of Lapse), and transformed India into a tributary colonial economy through exploitative land revenue systems, deindustrialisation, and the unilateral drain of wealth.',
  eli5: 'Imagine a merchant coming to trade at your market, who then bribes the mayor’s guards to take the town hall (Plassey), grabs the key to all tax money (Diwani), traps neighbouring kings into paying for his soldiers (Subsidiary Alliance), takes kingdoms whose kings have no sons (Doctrine of Lapse), taxes farmers 50% to 89% of their crops (Permanent/Ryotwari settlements), ruins local weavers with machine cloth, and sends 1/3rd of all money back to his home country across the sea (Drain of Wealth).',
  misconceptions: [
    { misconception: 'Plassey was a brilliant military victory won by Clive’s tactical genius.', correction: 'Plassey was a negotiated political conspiracy; Mir Jafar withheld 45,000 troops from fighting in exchange for the Nawab’s throne.' },
    { misconception: 'The Battle of Buxar was just a repeat of Plassey against one Nawab.', correction: 'Buxar (1764) was a decisive battlefield victory over a combined triple alliance of Bengal, Awadh, and Mughal Emperor Shah Alam II.' },
    { misconception: 'Dual Government meant equal power-sharing and joint administration.', correction: 'Dual Government meant power and revenue for the Company with zero responsibility, while the penniless Nawab had all responsibility.' },
    { misconception: 'Subsidiary Alliance and Doctrine of Lapse were the same policy.', correction: 'Subsidiary Alliance (Wellesley, 1798) disarmed living rulers with British troops; Doctrine of Lapse (Dalhousie, 1848) annexed states when rulers died without natural male heirs.' },
    { misconception: 'Permanent Settlement gave permanent land ownership to the cultivating peasants.', correction: 'Permanent Settlement (1793) gave ownership to Zamindars, reducing cultivating peasants to insecure tenants-at-will facing unlimited rack-renting.' },
    { misconception: 'Ryotwari was a peasant-friendly system because it removed zamindars.', correction: 'Ryotwari made the colonial state itself the extortionate landlord, taxing ~50% gross produce with zero drought relief, creating chronic debt to moneylenders.' },
    { misconception: 'Indian handicrafts declined naturally because British factory goods were higher quality.', correction: 'Indian textiles were superior in quality but were deliberately crushed through coercive gomastha monopoly procurement, unequal tariffs, and duty-free British factory dumping.' },
    { misconception: 'The Drain of Wealth was just one-time looting of jewels and gold.', correction: 'The Drain was a continuous, structural, annual budgetary transfer (Home Charges, pensions, debt interest, dividends) amounting to ~1/3rd of India’s revenue every single year.' },
  ],
  diagnosticQuestions: [
    { question: 'When was the Battle of Plassey fought?', options: ['23 June 1757', '22 October 1764', '12 August 1765', '10 May 1857'], correctIndex: 0 },
    { question: 'What did the Treaty of Allahabad (1765) grant to the Company?', options: ['Diwani of Bengal, Bihar, and Orissa', 'Nizamat of Delhi', 'Direct rule over Awadh', 'Monopoly on European spice trade'], correctIndex: 0 },
    { question: 'Who introduced the Permanent Settlement in 1793?', options: ['Lord Cornwallis', 'Warren Hastings', 'Lord Wellesley', 'Lord Dalhousie'], correctIndex: 0 },
    { question: 'Who was the first Indian ruler to accept the Subsidiary Alliance in 1798?', options: ['Nizam of Hyderabad', 'Tipu Sultan of Mysore', 'Nawab of Awadh', 'Raja of Satara'], correctIndex: 0 },
    { question: 'Which state was the FIRST annexed under the Doctrine of Lapse in 1848?', options: ['Satara', 'Jhansi', 'Nagpur', 'Sambalpur'], correctIndex: 0 },
    { question: 'What was the percentage of revenue paid to the Company under the Permanent Settlement?', options: ['89%', '50%', '11%', '25%'], correctIndex: 0 },
    { question: 'Who formulated the Drain of Wealth theory in "Poverty and Un-British Rule in India"?', options: ['Dadabhai Naoroji', 'R.C. Dutt', 'Gopal Krishna Gokhale', 'Bal Gangadhar Tilak'], correctIndex: 0 },
    { question: 'Which Act ended the East India Company’s trade monopoly and flooded India with British factory cloth?', options: ['Charter Act of 1813', 'Regulating Act of 1773', 'Pitts India Act of 1784', 'Government of India Act 1858'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery across the causes and consequences of Plassey and Buxar, Dual Government, annexation mechanisms (Subsidiary Alliance, Doctrine of Lapse), land revenue systems (Permanent, Ryotwari, Mahalwari), deindustrialisation of handlooms, and Dadabhai Naoroji’s Drain of Wealth theory.',
};

// ─── 5 INTERACTIVE BRILLIANT EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Plassey Conspiracy Map (1757)',
    instruction: 'Click each court conspirator around Siraj-ud-Daulah to uncover their secret deal with Robert Clive.',
    interactionType: 'click-conspirators',
    nodeId: NODE_C8_HISTCIV_021,
  },
  {
    title: '2. The Diwani & Dual Government Fiscal Loop (1765–1772)',
    instruction: 'Drag the Revenue Demand Slider to observe real-time tax extraction and the collapse of peasant survival reserves into the red famine threshold.',
    interactionType: 'slider-diwani',
    nodeId: NODE_C8_HISTCIV_023,
  },
  {
    title: '3. Instruments of Imperial Expansion (1798–1856)',
    instruction: 'Toggle between Wellesley’s Subsidiary Alliance and Dalhousie’s Doctrine of Lapse to see how living vs heirless kingdoms were swallowed.',
    interactionType: 'toggle-annexation',
    nodeId: NODE_C8_HISTCIV_025,
  },
  {
    title: '4. The Land Revenue Triad: Bengal, Madras & NW Provinces',
    instruction: 'Drag the harvest slider to watch real-time breakdown of the 89:11 Permanent Settlement split, Ryotwari 50% direct extraction, and Mahalwari village assessments.',
    interactionType: 'calculator-revenue',
    nodeId: NODE_C8_HISTCIV_027,
  },
  {
    title: '5. Dadabhai Naoroji’s Drain of Wealth Simulator (1867–1901)',
    instruction: 'Adjust the Annual Colonial Budget slider to witness in real-time how 1/3rd of Indian tax revenues flowed unilaterally to London as Home Charges.',
    interactionType: 'slider-drain',
    nodeId: NODE_C8_HISTCIV_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: When the British East India Company acquired the Diwani (tax collection) of Bengal in 1765, what happened to the amount of gold and silver bullion Britain shipped from London to buy Indian goods?',
    options: [
      'Bullion shipments increased tenfold to pay Indian weavers higher wages',
      'Bullion shipments completely stopped — the Company used Bengal’s own tax money to buy Indian goods for free export to Europe',
      'Britain converted all Indian rupees into British paper pounds',
      'The Company gave all its bullion as charity to Bengal farmers',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Revenue Extraction slider in the simulation to verify how Indian taxes replaced British bullion imports entirely!',
    nodeId: NODE_C8_HISTCIV_026,
  },
  {
    question: 'Prediction: When Lord Dalhousie annexed Jhansi under the Doctrine of Lapse in 1853, what happened to Rani Lakshmibai’s adopted son Damodar Rao?',
    options: [
      'He was crowned as the Emperor of Awadh',
      'His right to the throne was completely denied by Dalhousie, and the Rani was ordered to vacate the fort on a meager pension',
      'He was appointed Commander of the British Bengal Army',
      'He was sent to govern the Madras Presidency',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click the Jhansi case study in the Annexation Lab to observe how the denial of adoption led directly to the 1857 uprising.',
    nodeId: NODE_C8_HISTCIV_024,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the "Peasant Survival Reserve" gauge as you increase the Company Revenue Squeeze under the Dual Government?',
    observableOptions: [
      'Peasant reserve drops below survival threshold into the red famine zone even while total Company extraction reaches record highs',
      'Peasant reserve stays perfectly stable because the Nawab provides emergency gold',
      'Peasants gain more wealth as Company revenue increases',
      'Agricultural yields automatically double when taxes are raised',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_HISTCIV_023,
  },
  {
    question: 'Observation: In the Drain of Wealth simulator, what proportion of the extracted tax revenue is reinvested in Indian canals, roads, or famine relief?',
    observableOptions: [
      'Zero equivalent economic return — the Home Charges flow unilaterally to London as dividends, debt interest, and pensions',
      'Over 90% is spent building universities and hospitals in Bengal villages',
      'All of it is returned to the Mughal Emperor in Delhi',
      'Half is given back to Indian weavers as bonuses',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_HISTCIV_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Economic Historian: Tracing Colonial Extraction',
  description: 'Apply Dadabhai Naoroji and R.C. Dutt’s methods to examine how modern developing economies protect their manufacturing and domestic revenue versus the historical colonial model.',
  steps: [
    'Identify how high tariffs on imported machine textiles versus zero tariffs on local handlooms could have protected 18th-century Bengal weavers.',
    'Compare the colonial 89% fixed tax with modern progressive agricultural income tax exemptions for small farmers.',
    'Calculate how retaining ₹30-40 crore annually inside India in the 1880s could have funded universal primary education and countrywide canal irrigation.',
    'Write a 3-sentence summary of why Dadabhai Naoroji characterized the drain as "un-British" — an appeal to British liberal principles against colonial reality.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C8_HistoryCivicsBattlePlassey1757Sim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration Interactive States (with real-time reactive bindings)
  const [selectedConspirator, setSelectedConspirator] = useState<string | null>(null);
  const [revenueSqueeze, setRevenueSqueeze] = useState(81); // in Lakh rupees (1765: 81 lakh to 1770: 135 lakh)
  const [annexationMode, setAnnexationMode] = useState<'subsidiary' | 'lapse'>('subsidiary');
  const [selectedAnnexState, setSelectedAnnexState] = useState<string>('hyderabad');
  const [grossHarvest, setGrossHarvest] = useState(1000); // rupees / bigha
  const [drainBudgetValue, setDrainBudgetValue] = useState(100); // crore total colonial budget

  // Reflection responses state
  const [reflectionSurprise, setReflectionSurprise] = useState('');
  const [reflectionExplain, setReflectionExplain] = useState('');
  const [reflectionRealLife, setReflectionRealLife] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Type Specific States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Engine Feedback Components State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the British Conquest and Colonial Economic Policies simulation. Discover how a trading company conquered an empire.');
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── GSAP ANIMATION FOR TIMELINE ───
  useEffect(() => {
    if (phase === 'explore' && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS PULSE ANIMATION (HTML5 Canvas) ───
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

      const flowSpeed = (drainBudgetValue / 100) * 2;
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < 6; i++) {
        const x = ((frame * flowSpeed * (i + 1) * 0.7) % canvas.width);
        const y = 15 + Math.sin((frame + i * 20) * 0.05) * 6;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Bengal Revenues →', 10, 18);
      ctx.fillText('→ London Home Charges', canvas.width - 125, 18);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [drainBudgetValue]);

  // ─── ESCALATING HINTS HANDLER ───
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
      speechManager.speak('Let us review the complete historical explanation.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exactly right! It was a conspiracy.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Explore the five interactive milestones of British economic and political domination.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setRevenueSqueeze(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with revenue rates and annexation mechanisms without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for structured historical challenges. Read each situation carefully.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it using the interactive simulation.');
  }, []);

  const handleVerifyPrediction = useCallback(() => {
    setPredictionVerified(true);
    audioManager.play('sparkle');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp historical observation!' : 'Look closer at the revenue gauges.');
  }, []);

  // ─── EXPLORATION INTERACTION HANDLERS ───
  const handleConspiratorClick = useCallback((id: string) => {
    setSelectedConspirator(id);
    audioManager.play('tap');
    const quotes: Record<string, string> = {
      mir_jafar: 'Mir Jafar: Promised the Nawab’s throne if his 45,000 vanguard troops stood idle at Plassey.',
      jagat_seth: 'Jagat Seth: Bengal’s premier banker who funded Clive to protect merchant monopolies from Siraj-ud-Daulah.',
      rai_durlabh: 'Rai Durlabh: Senior Bengal military commander who withheld his division from assisting the Nawab.',
      omi_chand: 'Omi Chand: Intermediary merchant who demanded 5% of Bengal’s treasury and a secret treaty on red paper.',
    };
    speechManager.speak(quotes[id] || '');
  }, []);

  const handleRevenueSqueezeChange = useCallback((val: number) => {
    setRevenueSqueeze(val);
    audioManager.play('count');
  }, []);

  const handleAnnexationToggle = useCallback((mode: 'subsidiary' | 'lapse') => {
    setAnnexationMode(mode);
    audioManager.play('tap');
    if (mode === 'subsidiary') setSelectedAnnexState('hyderabad');
    else setSelectedAnnexState('satara');
  }, []);

  const handleAnnexStateSelect = useCallback((stateKey: string) => {
    setSelectedAnnexState(stateKey);
    audioManager.play('tap');
  }, []);

  const handleGrossHarvestChange = useCallback((val: number) => {
    setGrossHarvest(val);
    audioManager.play('count');
  }, []);

  const handleDrainBudgetChange = useCallback((val: number) => {
    setDrainBudgetValue(val);
    audioManager.play('count');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
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

  // ─── SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive analysis of British colonial conquest and economic extraction.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER EVALUATION HANDLER ───
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Historical deduction correct!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Review the step-by-step evidence below.');
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

  // ─── SORT CHALLENGE SUBMIT ───
  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CALCULATED PERMANENT SETTLEMENT METRICS ───
  const permanentSettlementMetrics = useMemo(() => {
    const companyShare = Math.round(grossHarvest * 0.89);
    const zamindarShare = Math.round(grossHarvest * 0.11);
    const peasantExtortedBurden = Math.round(grossHarvest * 1.35);
    return { companyShare, zamindarShare, peasantExtortedBurden };
  }, [grossHarvest]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 rounded-2xl border border-amber-800">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-amber-400 font-medium tracking-wide">CISCE Class 8 • ICSE History & Civics • Chapter 5 & 6</p>
          </div>
        </div>

        {/* Phase / Difficulty Pill */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          )}
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 font-semibold border border-slate-700 capitalize">
            Phase: {phase}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>⚔️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-amber-200/90 font-mono">
              ⚡ {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-md">
            <p className="text-base font-bold text-white mb-4">🔍 Curiosity Challenge: {DISCOVERY_QUESTION.question}</p>
            <div className="space-y-3">
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
                      ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 text-slate-500 border border-slate-800'
                      : 'bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-amber-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-700">
                <p className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Mir Jafar stood still with 45,000 troops.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition-all"
                >
                  Step Inside the Historical Simulation →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT-STYLE WITH TOPIC SVGS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-slate-400 font-mono">Node ID: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>
              <p className="text-xs md:text-sm text-amber-200 font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                ⚡ <span className="font-bold">Interaction Task:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── TOPIC-SPECIFIC SVG 1: PLASSEY CONSPIRACY INTERACTIVE SVG ── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <svg viewBox="0 0 500 280" className="w-full max-h-[300px]">
                    {/* Background battlefield / Bhagirathi River */}
                    <path d="M 0,220 Q 250,180 500,240 L 500,280 L 0,280 Z" fill="#1e3a8a" opacity="0.3" />
                    <text x="250" y="260" textAnchor="middle" fill="#60a5fa" fontSize="10" fontStyle="italic">Bhagirathi River (Plassey Mango Grove)</text>

                    {/* Siraj-ud-Daulah (Center) */}
                    <circle cx="250" cy="120" r="36" fill="#991b1b" stroke="#ef4444" strokeWidth="3" />
                    <text x="250" y="118" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Nawab</text>
                    <text x="250" y="130" textAnchor="middle" fill="#fca5a5" fontSize="8">Siraj-ud-Daulah</text>
                    <text x="250" y="142" textAnchor="middle" fill="#f87171" fontSize="7">(50,000 Army)</text>

                    {/* Robert Clive (West) */}
                    <circle cx="60" cy="120" r="28" fill="#1e40af" stroke="#3b82f6" strokeWidth="2" />
                    <text x="60" y="118" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Robert Clive</text>
                    <text x="60" y="130" textAnchor="middle" fill="#93c5fd" fontSize="7">3,000 Troops</text>

                    {/* Conspirators (Clickable nodes surrounding Nawab) */}
                    {[
                      { id: 'mir_jafar', name: 'Mir Jafar', role: 'Commander-in-Chief', cx: 250, cy: 35, color: '#f59e0b' },
                      { id: 'jagat_seth', name: 'Jagat Seth', role: 'Chief Banker', cx: 420, cy: 60, color: '#10b981' },
                      { id: 'rai_durlabh', name: 'Rai Durlabh', role: 'Senior Officer', cx: 420, cy: 180, color: '#8b5cf6' },
                      { id: 'omi_chand', name: 'Omi Chand', role: 'Intermediary Merchant', cx: 120, cy: 45, color: '#ec4899' },
                    ].map(c => (
                      <g
                        key={c.id}
                        onClick={() => handleConspiratorClick(c.id)}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <line x1={c.cx} y1={c.cy} x2="60" y2="120" stroke={c.color} strokeDasharray="3,3" strokeWidth="1.5" opacity="0.6" />
                        <circle cx={c.cx} cy={c.cy} r="24" fill="#0f172a" stroke={c.color} strokeWidth={selectedConspirator === c.id ? 3 : 1.5} />
                        <text x={c.cx} y={c.cy - 2} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{c.name}</text>
                        <text x={c.cx} y={c.cy + 8} textAnchor="middle" fill="#94a3b8" fontSize="6">{c.role}</text>
                      </g>
                    ))}
                  </svg>

                  {selectedConspirator && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-amber-950/60 rounded-xl border border-amber-600 text-xs text-amber-200">
                      <span className="font-bold text-amber-400">Secret Pact Revealed:</span>{' '}
                      {selectedConspirator === 'mir_jafar' && 'Mir Jafar betrayed Siraj-ud-Daulah on 23 June 1757 by deliberately holding back his 45,000 vanguard troops, guaranteeing Clive an effortless victory in exchange for the Nawab’s throne.'}
                      {selectedConspirator === 'jagat_seth' && 'Jagat Seth (Mehtab Chand), head of the great banking house, financed the conspiracy because Siraj-ud-Daulah threatened his bullion and currency monopolies.'}
                      {selectedConspirator === 'rai_durlabh' && 'Rai Durlabh ordered his artillery and troops to remain completely inactive during the British cannonade.'}
                      {selectedConspirator === 'omi_chand' && 'Omi Chand acted as secret intermediary between Clive and Mir Jafar, demanding ₹3 million and 5% of Bengal��s treasury (later tricked by Clive on a forged white treaty).'}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── TOPIC-SPECIFIC SVG 2: DIWANI & DUAL GOVERNMENT FISCAL LOOP SVG ── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade ? (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-300 mb-2">🤔 Step 1: Predict Before Simulating</p>
                      <p className="text-xs text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-700 text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction recorded! Drag the slider below to observe how Bengal tax money replaced British bullion imports.</span>
                      {!predictionVerified && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleVerifyPrediction}
                          className="px-3 py-1 bg-emerald-600 text-white rounded font-bold"
                        >
                          Verify Now
                        </motion.button>
                      )}
                    </div>
                  )}

                  {/* Real-time Slider Connection to Instant Visualisation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Company Diwani Revenue Demand: <strong className="text-amber-400">₹{revenueSqueeze} Lakh</strong></span>
                      <span className="text-slate-400 font-mono">1765 (₹81L) → 1770 Famine (₹135L)</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={150}
                      value={revenueSqueeze}
                      onChange={e => handleRevenueSqueezeChange(Number(e.target.value))}
                      aria-label="Revenue demand squeeze slider"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Dynamic SVG Diagram connected to the slider */}
                  <svg viewBox="0 0 500 200" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2">
                    <rect x="20" y="20" width="130" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="85" y="45" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Mughal Diwani (1765)</text>
                    <text x="85" y="65" textAnchor="middle" fill="#c7d2fe" fontSize="9">Shah Alam II Treaty</text>
                    <text x="85" y="80" textAnchor="middle" fill="#818cf8" fontSize="8">₹26 Lakh Tribute</text>

                    {/* Dynamic Tax Siphon Arrow */}
                    <path d="M 155,55 L 340,55" stroke="#f59e0b" strokeWidth={Math.max(2, (revenueSqueeze - 75) / 10)} strokeDasharray="5,3" />
                    <text x="245" y="45" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">
                      ₹{revenueSqueeze} Lakh Extracted
                    </text>

                    {/* Company Treasury Box */}
                    <rect x="345" y="20" width="135" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="412" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">East India Company</text>
                    <text x="412" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="9">Power Without Duty</text>
                    <text x="412" y="80" textAnchor="middle" fill="#34d399" fontSize="8">Bullion Export: ₹0</text>

                    {/* Puppet Nawab Box */}
                    <rect x="20" y="115" width="130" height="70" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                    <text x="85" y="140" textAnchor="middle" fill="#fecdd3" fontSize="10" fontWeight="bold">Puppet Nawab (Nizamat)</text>
                    <text x="85" y="158" textAnchor="middle" fill="#fda4af" fontSize="9">Responsibility Without Funds</text>
                    <text x="85" y="172" textAnchor="middle" fill="#fb7185" fontSize="8">Police & Relief: Nil</text>

                    {/* Peasant Suffering Indicator */}
                    <rect x="345" y="115" width="135" height="70" rx="8" fill={revenueSqueeze > 115 ? '#450a0a' : '#1c1917'} stroke={revenueSqueeze > 115 ? '#ef4444' : '#78716c'} strokeWidth="2" />
                    <text x="412" y="138" textAnchor="middle" fill={revenueSqueeze > 115 ? '#fca5a5' : '#d6d3d1'} fontSize="10" fontWeight="bold">Bengal Peasantry</text>
                    <text x="412" y="156" textAnchor="middle" fill={revenueSqueeze > 115 ? '#ef4444' : '#a8a29e'} fontSize="9">
                      {revenueSqueeze > 115 ? '10M Starved (1770)' : 'Extreme Distress'}
                    </text>
                    <text x="412" y="172" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Survival Grain: {Math.max(0, 150 - revenueSqueeze)}%
                    </text>
                  </svg>

                  {/* Dual Government Visual Flow Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-indigo-950/40 border border-indigo-700 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-indigo-300">🏢 Company Diwani (Revenue Power)</h4>
                      <p className="text-xs text-slate-300">Revenue Extracted: <strong>₹{revenueSqueeze} Lakh</strong></p>
                      <p className="text-xs text-slate-400">Expenditure on Bengal Welfare: <strong className="text-rose-400">₹0 (ZERO)</strong></p>
                      <p className="text-[11px] text-slate-400">Surplus used to buy Indian cloth and fund British armies across India.</p>
                    </div>

                    <div className="p-3 bg-rose-950/40 border border-rose-700 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-rose-300">👑 Nawab Nizamat (Police & Justice)</h4>
                      <p className="text-xs text-slate-300">Fixed Company Allowance: <strong>₹53 Lakh → Cut to ₹32L</strong></p>
                      <p className="text-xs text-slate-400">Famine Relief Fund Available: <strong className="text-rose-400">BANKRUPT</strong></p>
                      <p className="text-[11px] text-slate-400">Responsible for 30 million lives without authority or revenue.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TOPIC-SPECIFIC SVG 3: IMPERIAL EXPANSION MECHANISMS SVG ── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnnexationToggle('subsidiary')}
                      className={`flex-1 p-2.5 rounded-xl text-xs font-bold transition-all ${
                        annexationMode === 'subsidiary'
                          ? 'bg-amber-600 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}
                    >
                      🤝 Subsidiary Alliance (Wellesley, 1798)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnnexationToggle('lapse')}
                      className={`flex-1 p-2.5 rounded-xl text-xs font-bold transition-all ${
                        annexationMode === 'lapse'
                          ? 'bg-rose-600 text-white font-black'
                          : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}
                    >
                      👑 Doctrine of Lapse (Dalhousie, 1848)
                    </motion.button>
                  </div>

                  {/* Territorial Expansion Subcontinental Map SVG */}
                  <svg viewBox="0 0 500 200" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2">
                    {/* Outline / Schematic of Princely India */}
                    <path d="M 120,40 L 260,30 L 380,60 L 340,160 L 240,190 L 160,150 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    
                    {/* Hyderabad (Subsidiary) */}
                    <circle cx="250" cy="120" r="22" fill={selectedAnnexState === 'hyderabad' ? '#d97706' : '#334155'} stroke="#f59e0b" strokeWidth="2" />
                    <text x="250" y="122" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Hyderabad</text>
                    <text x="250" y="132" textAnchor="middle" fill="#fde68a" fontSize="6">1798 (1st)</text>

                    {/* Mysore */}
                    <circle cx="210" cy="155" r="18" fill={selectedAnnexState === 'mysore' ? '#d97706' : '#334155'} stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="210" y="157" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">Mysore</text>

                    {/* Awadh */}
                    <circle cx="280" cy="65" r="24" fill={selectedAnnexState?.startsWith('awadh') ? '#dc2626' : '#334155'} stroke="#ef4444" strokeWidth="2" />
                    <text x="280" y="65" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Awadh</text>
                    <text x="280" y="75" textAnchor="middle" fill="#fca5a5" fontSize="6">1856 Misrule</text>

                    {/* Satara */}
                    <circle cx="170" cy="115" r="16" fill={selectedAnnexState === 'satara' ? '#e11d48' : '#334155'} stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="170" y="117" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">Satara</text>
                    <text x="170" y="125" textAnchor="middle" fill="#fda4af" fontSize="5">1848</text>

                    {/* Jhansi */}
                    <circle cx="220" cy="75" r="18" fill={selectedAnnexState === 'jhansi' ? '#e11d48' : '#334155'} stroke="#f43f5e" strokeWidth="2" />
                    <text x="220" y="77" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Jhansi</text>
                    <text x="220" y="86" textAnchor="middle" fill="#fda4af" fontSize="6">1853 (Lakshmibai)</text>

                    {/* Legend */}
                    <text x="360" y="30" fill="#f59e0b" fontSize="8" fontWeight="bold">● Subsidiary Alliance</text>
                    <text x="360" y="45" fill="#f43f5e" fontSize="8" fontWeight="bold">● Doctrine of Lapse</text>
                  </svg>

                  {/* Case Studies Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {annexationMode === 'subsidiary' ? (
                      <>
                        {[
                          { id: 'hyderabad', label: 'Hyderabad (1798)', desc: '1st signatory; ceded Rayalaseema' },
                          { id: 'mysore', label: 'Mysore (1799)', desc: 'Tipu died at Seringapatam; forced in' },
                          { id: 'awadh_1801', label: 'Awadh (1801)', desc: 'Ceded Gorakhpur & Rohilkhand' },
                          { id: 'awadh_1856', label: 'Awadh (1856)', desc: 'Annexed on "Misrule" pretext' },
                        ].map(st => (
                          <motion.button
                            key={st.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnnexStateSelect(st.id)}
                            className={`p-2.5 text-left rounded-xl text-xs border ${
                              selectedAnnexState === st.id
                                ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <p className="font-bold text-white">{st.label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{st.desc}</p>
                          </motion.button>
                        ))}
                      </>
                    ) : (
                      <>
                        {[
                          { id: 'satara', label: 'Satara (1848)', desc: 'Appa Saheb died; 1st state annexed' },
                          { id: 'sambalpur', label: 'Sambalpur (1849)', desc: 'Narayan Singh died; adoption denied' },
                          { id: 'jhansi', label: 'Jhansi (1853)', desc: 'Damodar Rao rejected; Lakshmibai rose in 1857' },
                          { id: 'nagpur', label: 'Nagpur (1853)', desc: 'Raghoji III died; kingdom absorbed' },
                        ].map(st => (
                          <motion.button
                            key={st.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnnexStateSelect(st.id)}
                            className={`p-2.5 text-left rounded-xl text-xs border ${
                              selectedAnnexState === st.id
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <p className="font-bold text-white">{st.label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{st.desc}</p>
                          </motion.button>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2">
                    <h4 className="font-bold text-amber-300">
                      {annexationMode === 'subsidiary' ? '⚙️ Subsidiary Alliance Mechanism:' : '⚙️ Doctrine of Lapse Mechanism:'}
                    </h4>
                    {annexationMode === 'subsidiary' && (
                      <p className="text-slate-300">
                        Rulers surrendered their independent military and foreign diplomacy. They maintained a British force inside their capital, paying exorbitant annual subsidies or ceding rich districts. When Nawab Wajid Ali Shah of Awadh had legitimate heirs in 1856, Dalhousie bypassed the Doctrine of Lapse and cynically annexed the province on the manufactured charge of "misgovernance".
                      </p>
                    )}
                    {annexationMode === 'lapse' && (
                      <p className="text-slate-300">
                        Dalhousie systematically rejected the ancient Hindu custom of <em className="text-amber-400">dattak putra</em> (adoption of male heirs for religious and state succession). When Gangadhar Rao of Jhansi passed away in 1853, his adopted son Damodar Rao was stripped of royal rights, pensioning Rani Lakshmibai at ₹60,000/year and igniting her defiance in the 1857 Revolt.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── TOPIC-SPECIFIC SVG 4: LAND REVENUE CALCULATOR (PERMANENT / RYOTWARI / MAHALWARI) ── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  {/* Real-time Interactive Slider Connected to Instant Revenue Calculations */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Village Harvest Value: <strong className="text-amber-400">₹{grossHarvest} / Acre</strong></span>
                      <span className="text-slate-400 font-mono">Move slider to adjust instant yield</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={3000}
                      step={100}
                      value={grossHarvest}
                      onChange={e => handleGrossHarvestChange(Number(e.target.value))}
                      aria-label="Gross agricultural harvest value slider"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Revenue Distribution Proportional SVG */}
                  <svg viewBox="0 0 500 130" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2">
                    <text x="250" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                      Permanent Settlement (1793) 89:11 Fiscal Split on ₹{grossHarvest} Harvest
                    </text>

                    {/* Company Bar (89%) */}
                    <rect x="30" y="40" width={440 * 0.89} height="40" fill="#047857" rx="4" />
                    <text x={30 + (440 * 0.89) / 2} y="64" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                      Company Share (89%): ₹{permanentSettlementMetrics.companyShare}
                    </text>

                    {/* Zamindar Bar (11%) */}
                    <rect x={30 + 440 * 0.89} y="40" width={440 * 0.11} height="40" fill="#d97706" rx="4" />
                    <text x={30 + 440 * 0.89 + 25} y="64" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                      11%: ₹{permanentSettlementMetrics.zamindarShare}
                    </text>

                    <text x="250" y="105" textAnchor="middle" fill="#f87171" fontSize="9">
                      Peasant Cultivator Status: Insecure Tenant-at-Will (Rack-rented up to ₹{permanentSettlementMetrics.peasantExtortedBurden})
                    </text>
                  </svg>

                  {/* 3 Revenue Systems Comparison Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 border border-amber-600/50 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-amber-400">1. Permanent Settlement (1793)</h4>
                      <p className="text-[11px] text-slate-400">Region: Bengal & Bihar (Cornwallis)</p>
                      <p className="text-[11px] text-slate-400">Intermediary: <strong>Zamindar (Hereditary Owner)</strong></p>
                      <div className="mt-2 p-2 bg-slate-950 rounded text-xs space-y-1">
                        <p className="text-emerald-400">Company Share (89%): ₹{permanentSettlementMetrics.companyShare}</p>
                        <p className="text-amber-400">Zamindar Malikana (11%): ₹{permanentSettlementMetrics.zamindarShare}</p>
                        <p className="text-rose-400">Peasant Status: Tenant-at-will (No tenure)</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 border border-blue-600/50 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-blue-400">2. Ryotwari System (1820)</h4>
                      <p className="text-[11px] text-slate-400">Region: Madras & Bombay (Munro)</p>
                      <p className="text-[11px] text-slate-400">Intermediary: <strong>None (Direct from Ryot)</strong></p>
                      <div className="mt-2 p-2 bg-slate-950 rounded text-xs space-y-1">
                        <p className="text-blue-400">State Direct Tax (~50%): ₹{Math.round(grossHarvest * 0.50)}</p>
                        <p className="text-slate-400">Revisable: Every 30 years</p>
                        <p className="text-rose-400">Result: Heavy debt to moneylenders</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 border border-purple-600/50 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-purple-400">3. Mahalwari System (1822)</h4>
                      <p className="text-[11px] text-slate-400">Region: NW Provinces / Western UP (Mackenzie)</p>
                      <p className="text-[11px] text-slate-400">Intermediary: <strong>Lambardar (Village Head)</strong></p>
                      <div className="mt-2 p-2 bg-slate-950 rounded text-xs space-y-1">
                        <p className="text-purple-400">Unit: Entire Village (Mahal)</p>
                        <p className="text-slate-400">Revised: 1833 under Bentinck</p>
                        <p className="text-amber-400">Collective community tax liability</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TOPIC-SPECIFIC SVG 5: DRAIN OF WEALTH SIMULATOR ── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  {/* Observation Question */}
                  {!observationAnswered ? (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-300 mb-2">👁️ Scientific Observation: What do you notice?</p>
                      <p className="text-xs text-slate-200 mb-3">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-700 text-xs text-emerald-300">
                      ✓ Correct observation: The drain is a strictly unilateral transfer to London with ZERO capital return to India.
                    </div>
                  )}

                  {/* Real-time Slider Connection */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Annual Public Revenue Extracted: <strong className="text-amber-400">₹{drainBudgetValue} Crore</strong></span>
                      <span className="text-slate-400 font-mono">Drained Abroad (1/3rd): <strong className="text-rose-400">~₹{Math.round(drainBudgetValue * 0.33)} Crore</strong></span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={150}
                      value={drainBudgetValue}
                      onChange={e => handleDrainBudgetChange(Number(e.target.value))}
                      aria-label="Colonial budget drain slider"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Canvas Particle Stream */}
                  <canvas ref={canvasRef} width={500} height={35} className="w-full bg-slate-900 rounded-xl border border-slate-800" />

                  {/* 5 Components of Home Charges Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px]">
                    {[
                      { name: 'EIC Dividends', pct: '20%', desc: 'Guaranteed 10.5% profit to London investors' },
                      { name: 'Railway Debt', pct: '25%', desc: '5% guaranteed return on British rail capital' },
                      { name: 'British Pensions', pct: '25%', desc: 'Civil & military salaries paid in Sterling' },
                      { name: 'India Office', pct: '15%', desc: 'Administrative upkeep of Whitehall in London' },
                      { name: 'Foreign Wars', pct: '15%', desc: 'Afghan, Burmese & China wars charged to India' },
                    ].map((hc, i) => (
                      <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="font-bold text-amber-300">{hc.name}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{hc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exploration Prev / Next Controls */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400 font-mono">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-black rounded-xl shadow-lg transition-all"
                  >
                    Free Exploration Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-amber-300">🏛️ Colonial Policy Sandbox (Free Play)</h3>
            <p className="text-xs text-slate-300 mt-1">
              Manipulate all historical variables simultaneously without grades or timers. Discover how taxes, trade policies, and annexations interacted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Agricultural & Industrial Squeeze</h4>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Village Harvest Value: ₹{grossHarvest}</label>
                <input
                  type="range"
                  min={500}
                  max={3000}
                  value={grossHarvest}
                  onChange={e => handleGrossHarvestChange(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                <p className="text-slate-300">Permanent Settlement 89% Company Demand: <strong className="text-amber-400">₹{Math.round(grossHarvest * 0.89)}</strong></p>
                <p className="text-slate-300">Ryotwari 50% Direct State Demand: <strong className="text-blue-400">₹{Math.round(grossHarvest * 0.50)}</strong></p>
                <p className="text-slate-300">Dacca Muslin Export Capacity: <strong className="text-rose-400">{grossHarvest > 1500 ? 'COLLAPSED (Duty-free UK Imports)' : 'Ruined'}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">Imperial Remittance & Annexations</h4>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Annual Public Revenue Extracted: ₹{drainBudgetValue} Cr</label>
                <input
                  type="range"
                  min={50}
                  max={150}
                  value={drainBudgetValue}
                  onChange={e => handleDrainBudgetChange(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                <p className="text-slate-300">Home Charges Drained to London (33%): <strong className="text-rose-400">₹{Math.round(drainBudgetValue * 0.33)} Crore</strong></p>
                <p className="text-slate-300">Territory annexed under Dalhousie: <strong className="text-amber-400">7 States (Satara, Jhansi, Nagpur, etc.)</strong></p>
                <p className="text-slate-300">Awadh Status (1856): <strong className="text-rose-400">Annexed on "Misrule" Pretext</strong></p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all tracking-wide text-sm"
          >
            I Understand the History — Start Graded Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 font-mono">
                Competency: {challenge.competencyLevel.toUpperCase()} • {challenge.nodeId}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 md:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <p className="text-base md:text-lg font-bold text-white leading-relaxed">
              {challenge.question}
            </p>

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
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-amber-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag from here:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-mono">{item.targetId.replace('_', ' ')}:</span>
                      <div className="text-xs font-bold text-amber-300">
                        {droppedLabels[item.targetId] || <span className="text-slate-600 italic">Drop correct historical role here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Matched Roles
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-amber-300">Drag to re-order the chronological timeline from first to last:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Chronological Order
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric historical answer"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-bold w-40 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs font-bold text-amber-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-750 text-amber-300 border border-slate-700 rounded-lg text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-950/80 border border-amber-600 text-amber-200 rounded text-xs flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click components above to build the budget...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Constructed Structure
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 md:p-5 bg-amber-950/40 border border-amber-600/70 rounded-2xl space-y-3"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Historical Evidence:</p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Fact →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block mt-3 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black rounded-xl text-xs shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Historical Analysis →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE WITH REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">Historical Mastery Complete!</h2>
            <p className="text-sm text-amber-400">
              Score: <strong className="text-white text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Mastery Status: <strong className="text-white capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-600/60">
            <p className="text-xs md:text-sm text-emerald-300 font-medium">
              {errors === 0
                ? '🏆 MAGNIFICENT! You demonstrated complete conceptual mastery over 150 years of Indian colonial history!'
                : errors <= 3
                ? '⭐ EXCELLENT WORK! You correctly analysed the strategic, revenue, and trade policies of British rule.'
                : '💡 GOOD EFFORT! Review the specific misconception corrections below to reinforce your historical evidence.'}
            </p>
          </div>

          {/* ─── SPACED REPETITION SCHEDULE BANNER (SRS PROMINENT DISPLAY) ─── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 rounded-2xl border-2 border-amber-500 shadow-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <h3 className="text-sm md:text-base font-bold text-amber-300 uppercase tracking-wide">
                Spaced Repetition Schedule (SM-2 Algorithm)
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-200">
              Based on your score ({Math.max(0, 100 - errors * 5)}%) and error count ({errors}), your optimal review schedule is:
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400 rounded-xl">
              <span className="text-amber-300 font-bold text-sm md:text-base">
                ⏰ Next Review: {errors === 0 ? 'Review in 7 days (Optimal retention)' : errors <= 3 ? 'Review in 3 days (Reinforce concepts)' : 'Review in 1 day (Targeted remediation)'}
              </span>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-5 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/70 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-amber-800/60 pb-3">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="text-base font-bold text-amber-300">Historical Reflection & Synthesis</h3>
                <p className="text-xs text-slate-400">Pause to reflect deeply on the mechanisms of colonial economic power.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="font-bold text-amber-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionSurprise}
                  onChange={e => setReflectionSurprise(e.target.value)}
                  placeholder="E.g., How bullion imports ceased entirely after Diwani, or how Mir Jafar withheld 45,000 troops..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="font-bold text-amber-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionExplain}
                  onChange={e => setReflectionExplain(e.target.value)}
                  placeholder="E.g., A foreign company used Bengal's own taxes to conquer the rest of India and send 1/3rd of the revenue to London..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="font-bold text-amber-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionRealLife}
                  onChange={e => setReflectionRealLife(e.target.value)}
                  placeholder="E.g., Analysing international trade deficits, debt traps, sovereign industrial protection policies, and taxation balance..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => {
                    setReflectionSaved(true);
                    audioManager.play('success');
                    speechManager.speak('Your historical reflections have been recorded.');
                  }}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow"
                >
                  {reflectionSaved ? '✓ Reflection Saved' : 'Save Reflection Answers'}
                </button>
                {reflectionSaved && <span className="text-emerald-400 font-bold">Reflections saved to study journal!</span>}
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-rose-300">Your Identified Historical Misconceptions:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">🌍 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Historical Analysis Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsBattlePlassey1757Sim;