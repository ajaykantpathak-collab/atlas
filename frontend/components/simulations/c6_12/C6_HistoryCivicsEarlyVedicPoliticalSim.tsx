'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS ───
const NODE_C6_HISTCIV_021 = 'c6_histciv_021';
const NODE_C6_HISTCIV_022 = 'c6_histciv_022';
const NODE_C6_HISTCIV_023 = 'c6_histciv_023';
const NODE_C6_HISTCIV_024 = 'c6_histciv_024';
const NODE_C6_HISTCIV_025 = 'c6_histciv_025';
const NODE_C6_HISTCIV_026 = 'c6_histciv_026';
const NODE_C6_HISTCIV_027 = 'c6_histciv_027';
const NODE_C6_HISTCIV_028 = 'c6_histciv_028';
const NODE_C6_HISTCIV_029 = 'c6_histciv_029';
const NODE_C6_HISTCIV_030 = 'c6_histciv_030';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_021,
  NODE_C6_HISTCIV_022,
  NODE_C6_HISTCIV_023,
  NODE_C6_HISTCIV_024,
  NODE_C6_HISTCIV_025,
  NODE_C6_HISTCIV_026,
  NODE_C6_HISTCIV_027,
  NODE_C6_HISTCIV_028,
  NODE_C6_HISTCIV_029,
  NODE_C6_HISTCIV_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Vedic & Sramana Transformation',
  intro: 'You are an ancient chronicler journeying across Northern India from 1500 BCE to 500 BCE. You witness pastoral cattle clans in the Sapta Sindhu give way to iron-age territorial kingdoms in the Gangetic plain, sparking royal sacrifices, caste rigidity, and the revolutionary reform paths of Mahavira and Gautama Buddha.',
  context: 'Trace the political nesting of the Jana, social status of women, economic shift from cattle to iron-rice farming, and the rise of Jain and Buddhist philosophies across 10 core historical milestones.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In the Early Vedic Rig Veda, what did the Sanskrit word for battle — "gavishti" — literally mean?',
  options: [
    'Conquest of golden palaces',
    'Search or desire for cows',
    'Territorial annexation of lands',
    'Sacrifice to the fire gods',
  ],
  correctIndex: 1,
  hintAfter: 'Fascinating! In early pastoral times, wealth was measured in cattle, not land or gold coins. Let us explore why!',
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 COMPLIANT) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C6_HISTCIV_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the primary honorific title of the Early Vedic Rajan, linking him directly to the cattle-centred pastoral economy?',
    options: ['Samrat (Universal Emperor)', 'Gopa (Protector of cows)', 'Chakravartin (Wheel-turner)', 'Purohita (High Priest)'],
    correctIndex: 1,
    explanation: 'The Early Vedic Rajan was called "Gopa" (protector of cows) because his primary duty was guarding the tribal cattle herds, not governing a fixed territorial empire.',
    hints: [
      'Think about the most valuable animal in the Early Vedic economy.',
      'The word starts with "Go-", Sanskrit for cattle.',
      'Gopa literally translates to "protector of cows".',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2 (Understanding) - Drag Label
  {
    id: 'ch_02',
    nodeId: NODE_C6_HISTCIV_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the four political units of Early Vedic society into their proper nested order from largest to smallest.',
    dragItems: [
      { label: 'Jana (Tribe)', targetId: 'box_outer' },
      { label: 'Vis (Clan)', targetId: 'box_mid_outer' },
      { label: 'Gram (Village)', targetId: 'box_mid_inner' },
      { label: 'Kula (Joint Family)', targetId: 'box_inner' },
    ],
    correctMapping: {
      box_outer: 'Jana (Tribe)',
      box_mid_outer: 'Vis (Clan)',
      box_mid_inner: 'Gram (Village)',
      box_inner: 'Kula (Joint Family)',
    },
    explanation: 'Early Vedic society nested like wooden dolls: Jana (the entire tribe) contains Vis (clans), which contain Grams (villages), which contain Kulas (joint families led by the grihapati).',
    hints: [
      'The biggest unit is the entire tribe (Jana).',
      'Inside the tribe are clans (Vis), and inside clans are villages (Gram).',
      'The smallest, innermost joint-family unit is the Kula.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 3 (Recall)
  {
    id: 'ch_03',
    nodeId: NODE_C6_HISTCIV_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following female seers (rishikas) composed sacred hymns preserved in the Rig Veda itself?',
    options: ['Lopamudra and Ghosha', 'Mahaprajapati and Yashodhara', 'Trishala and Maya', 'Sita and Draupadi'],
    correctIndex: 0,
    explanation: 'Lopamudra (Mandala 1) and Ghosha (Mandala 10) were renowned rishikas whose compositions in the Rig Veda prove women held high educational and spiritual status in the Early Vedic age.',
    hints: [
      'Look for the two names associated with Rig Vedic hymn composition, not epic queens or Buddhist nuns.',
      'One composed verses in Mandala 1, and the other in Mandala 10.',
      'Lopamudra and Ghosha are the classic Rig Vedic female composers.',
    ],
    misconceptionIndex: 2,
  },
  // FOUNDATION 4 (Understanding)
  {
    id: 'ch_04',
    nodeId: NODE_C6_HISTCIV_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What was the staple agricultural crop and principal metal in the Early Vedic Sapta Sindhu region?',
    options: [
      'Wet-paddy rice (vrihi) and iron (krishna ayas)',
      'Barley (yava) and copper/bronze (ayas)',
      'Wheat and cast iron',
      'Sugarcane and silver bullion',
    ],
    correctIndex: 1,
    explanation: 'Early Vedic people grew barley (yava), which suited the semi-arid Punjab plains, and worked copper/bronze (ayas). Iron and wet-rice cultivation appeared only in the Later Vedic Gangetic era.',
    hints: [
      'Iron was NOT yet known in the Rig Vedic period.',
      'The staple grain was suited to dry plains, not flooded monsoon paddy.',
      'The pair is barley (yava) and copper/bronze (ayas).',
    ],
    misconceptionIndex: 3,
  },
  // FOUNDATION 5 (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C6_HISTCIV_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Jain lineage of 24 Tirthankaras, what was Vardhamana Mahavira\'s exact historical position?',
    options: ['First Tirthankara and founder', '24th and final Tirthankara (reviver)', '12th Tirthankara', '23rd Tirthankara (preceding Parshvanatha)'],
    correctIndex: 1,
    explanation: 'Mahavira was the 24th and last Tirthankara. Jain tradition began with Rishabhanatha (Adinatha); Mahavira systematised and revived the ancient Sramana path.',
    hints: [
      'Mahavira did not create Jainism from zero; he was the final teacher in a long line.',
      'Rishabhanatha was 1st, Parshvanatha was 23rd.',
      'Mahavira is universally recognised as the 24th Tirthankara.',
    ],
    misconceptionIndex: 4,
  },
  // FOUNDATION 6 (Recall)
  {
    id: 'ch_06',
    nodeId: NODE_C6_HISTCIV_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the four key life-events of Siddhartha Gautama with their correct historical sites:',
    options: [
      'Birth: Lumbini | Enlightenment: Bodh Gaya | 1st Sermon: Sarnath | Death: Kushinagar',
      'Birth: Bodh Gaya | Enlightenment: Lumbini | 1st Sermon: Kushinagar | Death: Sarnath',
      'Birth: Sarnath | Enlightenment: Pavapuri | 1st Sermon: Bodh Gaya | Death: Kundagrama',
      'Birth: Kapilavastu | Enlightenment: Rajgir | 1st Sermon: Vaishali | Death: Pataliputra',
    ],
    correctIndex: 0,
    explanation: 'Siddhartha was born at Lumbini (Nepal), attained Sambodhi under the Bodhi tree at Bodh Gaya (Bihar), preached his first sermon at Sarnath (Varanasi), and attained Mahaparinirvana at Kushinagar (UP).',
    hints: [
      'Birth took place in the foothills of Nepal.',
      'Enlightenment occurred under the sacred peepal tree at Bodh Gaya.',
      'The correct sequence begins with Lumbini and ends with Kushinagar.',
    ],
    misconceptionIndex: 4,
  },
  // FOUNDATION 7 (Understanding) - Drag Sort
  {
    id: 'ch_07',
    nodeId: NODE_C6_HISTCIV_025,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four ideal Brahmin life stages (Ashramas) in their natural chronological order:',
    sortItems: [
      'Brahmacharya (Celibate Student Stage)',
      'Grihastha (Married Householder Stage)',
      'Vanaprastha (Forest Hermit / Withdrawal Stage)',
      'Sannyasa (Complete Worldly Renunciation)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The four Ashramas codified in the Dharmasutras progress through life: student (Brahmacharya) → householder (Grihastha) → forest retreat (Vanaprastha) → wandering renunciant (Sannyasa).',
    hints: [
      'One begins as a student collecting bhiksha.',
      'Marriage and family life come second.',
      'Forest retirement precedes total renunciation (Sannyasa) at the end.',
    ],
  },
  // STANDARD 8 (Application) - Numeric
  {
    id: 'ch_08',
    nodeId: NODE_C6_HISTCIV_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Chandogya Upanishad, Shvetaketu entered the Gurukul of Uddalaka Aruni at age 12 and completed his full Vedic oral course at age 24. How many years did a standard Vedic education span?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'years',
    explanation: '24 - 12 = 12 years. A standard Gurukul course of oral memorisation, cattle care, and bhiksha lasted roughly 12 years.',
    hints: [
      'Subtract the starting age from the completion age.',
      '24 minus 12 equals...',
      'The standard Gurukul duration was 12 years.',
    ],
  },
  // STANDARD 9 (Analysis)
  {
    id: 'ch_09',
    nodeId: NODE_C6_HISTCIV_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the Sabha differ from the Samiti in the Early Vedic political machinery?',
    options: [
      'Sabha was a small elder council advising policy; Samiti was the broad popular tribal assembly',
      'Sabha was an army unit; Samiti was a religious temple committee',
      'Sabha was open only to kings; Samiti was composed strictly of conquered dasas',
      'There was no difference; both were identical names for the royal court',
    ],
    correctIndex: 0,
    explanation: 'The Sabha was a smaller council of senior elders and elites handling advisory/judicial matters, while the Samiti was the general assembly of the entire jana that voted on wars and royal election.',
    hints: [
      'Think of the Sabha as an elder cabinet and the Samiti as a whole-tribe assembly.',
      'One was smaller and advisory; the other was larger and popular.',
      'Option A correctly distinguishes size and deliberative function.',
    ],
    misconceptionIndex: 0,
  },
  // STANDARD 10 (Analysis)
  {
    id: 'ch_10',
    nodeId: NODE_C6_HISTCIV_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Later Vedic Ashvamedha (Horse Sacrifice) best classified as a political-military assertion rather than pure spiritual prayer?',
    options: [
      'A consecrated stallion roamed for a year backed by an army; any king stopping it had to submit or fight',
      'The horse was traded with Mesopotamian merchants for punch-marked silver coins',
      'It was a simple domestic fire offering performed inside the family kitchen',
      'It was designed solely to bless the rice harvest with rain',
    ],
    correctIndex: 0,
    explanation: 'The Ashvamedha was an imperial survey: the roaming horse, accompanied by the royal army, compelled every neighbouring ruler to accept sovereignty or wage battle, culminating in the title Samrat.',
    hints: [
      'Consider what happened to neighbours who blocked the horse\'s path.',
      'The king\'s army marched behind the horse for an entire year.',
      'It was a year-long military campaign legitimised by Brahminical ritual.',
    ],
  },
  // STANDARD 11 (Application)
  {
    id: 'ch_11',
    nodeId: NODE_C6_HISTCIV_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A wealthy Gangetic merchant in 550 BCE trades fine silks and metalware along river routes, yet finds himself ranked 3rd in the varna order below non-wealthy priests. Why would he eagerly fund Buddhist or Jain sanghas?',
    options: [
      'Both religions rejected hereditary birth-rank, praised honest commerce, and taught in common vernaculars',
      'Buddhism required him to spend all his profits on animal sacrifices',
      'Jainism promised to make him a hereditary Brahmin through secret rituals',
      'The sanghas gave him military soldiers to conquer neighbouring janapadas',
    ],
    correctIndex: 0,
    explanation: 'Vaishya traders suffered a mismatch between real economic power and low ritual status. Jainism and Buddhism rejected birth-based caste, banned wasteful animal sacrifice, and conducted discourses in Prakrit/Pali.',
    hints: [
      'Think about the social grievances of the Vaishya trading class.',
      'The new religions judged people by moral conduct and karma, not varna by birth.',
      'Egalitarian teachings and non-violence appealed directly to commercial prosperity.',
    ],
  },
  // STANDARD 12 (Construct)
  {
    id: 'ch_12',
    nodeId: NODE_C6_HISTCIV_028,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the Jain Triratna (Three Jewels) by clicking the three correct internal spiritual virtues in order:',
    availableParts: ['Right Faith', 'Right Knowledge', 'Right Conduct', 'Sangha', 'Buddha', 'Yajna', 'Ashvamedha'],
    targetState: 'Right Faith Right Knowledge Right Conduct',
    validationHint: 'Assemble the three internal jewels: Faith → Knowledge → Conduct.',
    explanation: 'The Jain Triratna consists of Right Faith (Samyak Darshana), Right Knowledge (Samyak Jnana), and Right Conduct (Samyak Charitra). Buddha, Dhamma, and Sangha are the Buddhist Three Jewels.',
    hints: [
      'Do not include Buddhist external refuges like Buddha or Sangha.',
      'The three parts all begin with "Right".',
      'The sequence is Right Faith, Right Knowledge, and Right Conduct.',
    ],
  },
  // STANDARD 13 (Analysis)
  {
    id: 'ch_13',
    nodeId: NODE_C6_HISTCIV_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How is the Eight-Fold Path (Ashtangika Marga) doctrinally connected to the Four Noble Truths in Buddhist philosophy?',
    options: [
      'The Eight-Fold Path IS the practical prescription of Magga, the 4th Noble Truth',
      'The Eight-Fold Path was a separate rival doctrine invented by Kanishka',
      'The Eight-Fold Path applies only to gods, whereas the 4 Noble Truths apply to animals',
      'The 4 Noble Truths are for monks, while the Eight-Fold Path is strictly for kings',
    ],
    correctIndex: 0,
    explanation: 'Like a medical diagnosis: 1. Dukkha (symptom) → 2. Samudaya (cause) → 3. Nirodha (cure possible) → 4. Magga (the treatment/prescription), which is the Eight-Fold Path itself.',
    hints: [
      'Think of the doctor analogy: diagnosis leads directly to the prescription.',
      'The fourth Noble Truth is "Magga" (the path to end suffering).',
      'The Eight-Fold Path is the actual content of the fourth truth.',
    ],
  },
  // STANDARD 14 (Analysis)
  {
    id: 'ch_14',
    nodeId: NODE_C6_HISTCIV_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What ecological event in Magadha around 300 BCE triggered the historical split between Digambara and Svetambara Jains?',
    options: [
      'A severe 12-year famine that forced Bhadrabahu\'s followers to migrate south to Karnataka',
      'A massive monsoon flood of the Saraswati River',
      'An invasion of Greek armies destroying all temples',
      'A volcanic eruption in the Gangetic plain',
    ],
    correctIndex: 0,
    explanation: 'A 12-year famine in Magadha led Bhadrabahu and his followers to Shravanabelagola (Karnataka), where strict asceticism led to total nudity (Digambara). Sthulabhadra\'s northern monks kept white robes (Svetambara).',
    hints: [
      'The schism originated from an ecological crisis and food shortage.',
      'It led to a southern migration under monk Bhadrabahu.',
      'A 12-year famine drove the migration and subsequent divergence in clothing rules.',
    ],
  },
  // STANDARD 15 (Analysis)
  {
    id: 'ch_15',
    nodeId: NODE_C6_HISTCIV_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following correctly captures the technological and economic engine behind the transition from Early to Later Vedic society?',
    options: [
      'Introduction of iron (krishna ayas) enabling forest clearance and wet-rice surplus in the Gangetic plain',
      'Discovery of steam engines in the Sapta Sindhu',
      'Complete abandonment of all farming in favour of ocean pearl fishing',
      'Import of plastic tools from Central Asian trade caravans',
    ],
    correctIndex: 0,
    explanation: 'Iron axes felled the dense Gangetic sal forests and iron ploughshares turned heavy alluvial soils, generating the agricultural rice surplus that funded territorial kingdoms and towns.',
    hints: [
      'Focus on the new "dark metal" first mentioned in the Atharva Veda.',
      'Iron enabled clearing of dense forests and deep tillage.',
      'Option A correctly explains the causal technology and economic transformation.',
    ],
  },
  // ADVANCED 16 (Evaluation)
  {
    id: 'ch_16',
    nodeId: NODE_C6_HISTCIV_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historians often describe Early Vedic political life as a "tribal democracy or consultative chiefdom". Which historical evidence most strongly justifies this characterisation?',
    options: [
      'The Rajan was elected/approved by the Samiti, advised by elder Sabha, and lacked a standing army or permanent tax',
      'The Rajan ruled as an absolute monarch with divine right and a hereditary bureaucracy',
      'All citizens held digital voting tokens made of nishka gold',
      'Foreign Greek ambassadors drafted all Vedic laws in formal parliaments',
    ],
    correctIndex: 0,
    explanation: 'The Early Vedic king lacked absolute power: his legitimacy rested on tribal consent in the Samiti, elder counsel in the Sabha, and voluntary gifts (bali) rather than coercive standing state apparatus.',
    hints: [
      'Look for the checks and balances imposed by popular assemblies.',
      'The king had no standing army and depended on tribal militia.',
      'Tribal democracy is evidenced by the active role of Sabha and Samiti in checking royal whims.',
    ],
  },
  // ADVANCED 17 (Analysis) - Drag Sort
  {
    id: 'ch_17',
    nodeId: NODE_C6_HISTCIV_025,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the full multi-step causal chain of the Later Vedic Iron Revolution from technology to urbanisation:',
    sortItems: [
      '1. Iron axes & ploughshares forged (krishna ayas)',
      '2. Dense Gangetic sal forests cleared & deep tillage',
      '3. Wet-rice (vrihi) cultivation yields massive surplus',
      '4. Population surges & specialised artisan classes emerge',
      '5. Riverine trade along Ganga leads to towns & Mahajanapadas',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Iron tools → Forest clearance → Deep ploughing & Rice surplus → Specialisation of crafts → Trade expansion and Second Urbanisation.',
    hints: [
      'Begin with the metallurgical tool innovation (iron).',
      'Tools clear trees and turn soil for agriculture.',
      'Surplus grain feeds non-farming artisans and town-dwellers.',
    ],
  },
  // ADVANCED 18 (Evaluation)
  {
    id: 'ch_18',
    nodeId: NODE_C6_HISTCIV_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Both Vardhamana Mahavira (Licchavi clan) and Siddhartha Gautama (Shakya clan) were Kshatriya princes. Why was their Kshatriya leadership of paramount symbolic and political importance?',
    options: [
      'It represented a direct challenge by the ruling warrior aristocracy to Brahminical claims of spiritual and ritual supremacy',
      'It proved that only wealthy kings were allowed to write holy books in ancient India',
      'It was required by Vedic law that all reform leaders must command cavalry regiments',
      'It showed that the two princes intended to conquer southern India by military force',
    ],
    correctIndex: 0,
    explanation: 'Brahmins claimed highest varna status through ritual monopoly. When royal Kshatriya princes renounced power to teach that moral conduct surpasses birth-rank, it shook the foundations of Brahmin supremacy.',
    hints: [
      'Consider the social hierarchy tension between the 1st (Brahmin) and 2nd (Kshatriya) varnas.',
      'Rulers who held physical power challenged priests who claimed divine supremacy.',
      'Option A articulates the aristocratic social protest at the heart of the Sramana movement.',
    ],
  },
  // ADVANCED 19 (Distinguish)
  {
    id: 'ch_19',
    nodeId: NODE_C6_HISTCIV_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Buddhist history, what do the terms "Hinayana" (Theravada) and "Mahayana" literally signify regarding their soteriological path?',
    options: [
      '"Lesser Vehicle" (individual Arhat liberation) vs "Greater Vehicle" (Bodhisattva carrying all sentient beings across)',
      '"Inferior bad Buddhism" vs "Superior good Buddhism"',
      '"Southern rich monks" vs "Northern poor beggars"',
      '"Original Sanskrit texts" vs "Later Pali translations"',
    ],
    correctIndex: 0,
    explanation: '"Yana" means vehicle or raft. Hinayana ("smaller boat") focuses on individual Arhat self-liberation, while Mahayana ("great ferry") envisions the Bodhisattva postponing Nirvana to save all living beings.',
    hints: [
      'The terms refer to the carrying capacity of the metaphorical raft across the river of suffering.',
      'It is NOT a value judgement of quality or superiority.',
      'Lesser = individual boat; Greater = universal ferry carrying all beings.',
    ],
    misconceptionIndex: 4,
  },
  // ADVANCED 20 (Analysis)
  {
    id: 'ch_20',
    nodeId: NODE_C6_HISTCIV_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which systemic shift best explains why women enjoyed high status (Upanayana, hymn composition, Swayamvara) in Early Vedic times but suffered severe curtailment in the Later Vedic era?',
    options: [
      'Shift from mobile pastoral clan sharing to settled agrarian private landownership with patrilineal lineage control',
      'A sudden royal decree issued by King Sudas banning women from public spaces',
      'Complete loss of all Sanskrit texts during a solar eclipse',
      'Total migration of all women to southern peninsular forests',
    ],
    correctIndex: 0,
    explanation: 'In pastoral herding, all hands (male and female) are essential for dairy, cattle, and survival. Settled agriculture created private inheritable land, turning lineage purity and female seclusion into property concerns.',
    hints: [
      'Connect economic production methods to family and property structures.',
      'Pastoralism requires communal contribution; agrarian land tenure demands strict patrilineal inheritance.',
      'Option A provides the deep economic-historical explanation.',
    ],
  },
  // ADVANCED 21 (Creativity / Application)
  {
    id: 'ch_21',
    nodeId: NODE_C6_HISTCIV_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Suppose you are drafting an ethical charter for a 21st-century environmental community based on the Buddhist Middle Path (Madhyama Pratipada). Which core principle must it embody?',
    options: [
      'Rejecting both reckless consumer exploitation and self-destructive severe privation in favour of balanced mindfulness',
      'Mandating total starvation and physical self-mortification for all members',
      'Encouraging unbounded luxury and endless plastic consumption',
      'Performing multi-million rupee animal sacrifices to control atmospheric weather',
    ],
    correctIndex: 0,
    explanation: 'The Buddha\'s Middle Path explicitly navigates between extreme self-indulgence and extreme self-mortification, providing a sustainable, mindful framework for ethical action.',
    hints: [
      'The Middle Way rejects two extreme poles.',
      'Neither palace indulgence nor forest starvation.',
      'A balanced, mindful harmony corresponds to modern sustainable living.',
    ],
  },
  // ADVANCED 22 (Evaluation)
  {
    id: 'ch_22',
    nodeId: NODE_C6_HISTCIV_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do modern historians emphasize that formal built stone temples did NOT exist in the Later Vedic period, despite the emergence of early image veneration?',
    options: [
      'Monumental structural stone temples developed centuries later during the Gupta and post-Gupta eras; Vedic worship was fire-altar (yajna) based',
      'Vedic people had no stones in the Gangetic valley',
      'All kings were strictly atheists who forbade building any structures',
      'Temples were outlawed by the Kushana emperors in Kashmir',
    ],
    correctIndex: 0,
    explanation: 'Vedic religious practice centred on open-air consecrated sacrificial fire altars (vedis). Monumental stone temple architecture emerged only under the Guptas (4th-6th century CE).',
    hints: [
      'Think about the primary ritual apparatus of the Vedas: the consecrated fire hearth (Yajna).',
      'Structural stone temples belong to the classical Gupta era.',
      'Vedic religion was altar-based, not temple-building.',
    ],
  },
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Early Vedic Nested Polity',
    instruction: 'Click on each political layer (Jana → Vis → Gram → Kula) to inspect how power was nested in the Sapta Sindhu.',
    interactionType: 'nested-polity',
    nodeId: NODE_C6_HISTCIV_021,
  },
  {
    title: '2. Cattle Wealth & Pastoral Economy',
    instruction: 'Slide the Cattle Herd size to observe how it alters tribal standing, gavishti warfare risk, and yava (barley) balance.',
    interactionType: 'pastoral-slider',
    nodeId: NODE_C6_HISTCIV_023,
  },
  {
    title: '3. The Iron Revolution & Gangetic Shift',
    instruction: 'Drag the Iron Tool Technology slider to clear Gangetic sal forests and unlock wet-rice (vrihi) surplus in real time.',
    interactionType: 'iron-agriculture',
    nodeId: NODE_C6_HISTCIV_025,
  },
  {
    title: '4. Varna Hardening & Assembly Decline',
    instruction: 'Adjust the Social Stratification dial to see how Sabha/Samiti assemblies withered as hereditary monarchies arose.',
    interactionType: 'varna-decline',
    nodeId: NODE_C6_HISTCIV_024,
  },
  {
    title: '5. The Sramana Reform Response',
    instruction: 'Select between the Jain 5 Vows and Buddhist Eight-Fold Middle Path to see how each dismantled Vedic social evils.',
    interactionType: 'sramana-comparison',
    nodeId: NODE_C6_HISTCIV_027,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: When the Aryans discover iron (krishna ayas) and move into the wet Gangetic plain, what will happen to the staple crop?',
    options: [
      'Barley remains the only crop grown',
      'Wet-rice (vrihi) cultivation explodes, yielding massive food surplus',
      'Farming collapses and people return to hunting',
      'Cotton replaces all edible grains',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Iron Technology slider to 100% and watch the agricultural surplus surge!',
    nodeId: NODE_C6_HISTCIV_025,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between iron tools and population in the Gangetic plain?',
    observableOptions: [
      'Iron ploughshares enabled deeper tillage, producing food surplus that supported dense towns',
      'Iron tools caused the soil to become barren, causing people to flee',
      'Iron was used only to make jewellery and had zero effect on food',
      'There was no observable change in population or trade',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_025,
  },
  {
    question: 'What happens to the influence of popular assemblies (Sabha and Samiti) as royal territorial power grows over time?',
    observableOptions: [
      'Assemblies wither away as kings assume hereditary divine status and conduct large royal sacrifices',
      'Assemblies become more powerful than the king and abolish the monarchy',
      'Assemblies remain completely unchanged from 1500 BCE to 500 BCE',
      'Assemblies become military regiments dedicated solely to chariot warfare',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_024,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Historian: Tracing Living Heritage in India',
  description: 'Connect ancient Vedic governance and Sramana ethics to modern democratic institutions and daily life in India today.',
  steps: [
    'Compare the Early Vedic Sabha & Samiti to modern Indian Gram Sabhas and the Lok Sabha parliament.',
    'Identify 3 common Prakrit or Sanskrit words still used in your regional language (e.g., Ahimsa, Karma, Gram, Gopa).',
    'Locate Sarnath or Bodh Gaya on a physical map of India and trace the ancient northern trade route (Uttarapatha).',
    'Discuss with a classmate how the Buddhist Middle Path offers guidance for balanced screen time and consumption today.',
  ],
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
  nodeId: NODE_C6_HISTCIV_021,
  title: 'Vedic Age & Sramana Reform Simulation',
  definition: 'An interactive exploration of the political, economic, social, and spiritual evolution from the Early Vedic tribal chiefdoms to Later Vedic kingdoms and the rise of Jainism and Buddhism.',
  eli5: 'Explore how ancient clans who measured wealth in cows discovered iron, built river kingdoms, and sparked great teachers like Mahavira and Buddha who taught peace and fairness for all.',
  misconceptions: [
    {
      misconception: 'The Early Vedic Rajan was an absolute emperor ruling over all of India with a standing army.',
      correction: 'The Early Vedic Rajan was a pastoral tribal chief (Gopa) whose power was limited by the Sabha and Samiti assemblies.',
    },
    {
      misconception: 'The rigid four-fold hereditary caste system existed from the very beginning of the Vedic period.',
      correction: 'Early Vedic society had loose occupational divisions (Arya/Dasa). The rigid four-varna hierarchy hardened only in the Later Vedic age.',
    },
    {
      misconception: 'Women were always excluded from religious learning and education in ancient India.',
      correction: 'In the Early Vedic period, girls underwent Upanayana, attended assemblies, and female rishikas like Lopamudra and Ghosha composed Rig Vedic hymns.',
    },
    {
      misconception: 'Early Vedic people used iron weapons and ate wet-paddy rice as their staple crop.',
      correction: 'Early Vedic people used copper/bronze (ayas) and ate barley (yava). Iron and rice farming appeared in the Later Vedic Gangetic era.',
    },
    {
      misconception: 'Mahavira was the founder of Jainism and Buddha created the Eight-Fold Path as an unrelated second philosophy.',
      correction: 'Mahavira was the 24th Tirthankara (reviver), and the Eight-Fold Path is the direct operational content of Magga (the 4th Noble Truth).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What was the smallest social-political unit in Early Vedic society?',
      options: ['Jana', 'Vis', 'Gram', 'Kula'],
      correctIndex: 3,
    },
    {
      question: 'Which Rig Vedic term for warfare literally translated to "the search for cows"?',
      options: ['Gavishti', 'Swayamvara', 'Upanayana', 'Ashvamedha'],
      correctIndex: 0,
    },
    {
      question: 'Where did Gautama Buddha deliver his first sermon (Dharmachakrapravartana)?',
      options: ['Lumbini', 'Bodh Gaya', 'Sarnath (Deer Park)', 'Kushinagar'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Demonstrates deep understanding of Vedic political nesting, agrarian technology, social stratification, and Sramana philosophy.',
};

// ─── MAIN COMPONENT ───
function C6_HistoryCivicsEarlyVedicPoliticalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_HISTCIV_021,
  title = DEFAULT_PROPS.title || 'Vedic Age & Sramana Reform Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Exploration State connected in real-time
  const [selectedNestedUnit, setSelectedNestedUnit] = useState<'jana' | 'vis' | 'gram' | 'kula'>('jana');
  const [cattleCount, setCattleCount] = useState<number>(60); // 10 to 150
  const [ironLevel, setIronLevel] = useState<number>(30); // 0 to 100%
  const [socialEra, setSocialEra] = useState<number>(20); // 0 = 1500 BCE (Early), 100 = 600 BCE (Later)
  const [selectedReform, setSelectedReform] = useState<'jain' | 'buddha'>('jain');

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Reflection State
  const [reflectionSurprise, setReflectionSurprise] = useState('');
  const [reflectionExplain, setReflectionExplain] = useState('');
  const [reflectionRealLife, setReflectionRealLife] = useState('');

  // Interactive Challenges State
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

  // Drag & drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  const [timelineYear, setTimelineYear] = useState<number>(1320);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [timelineYear, socialEra]);

  // ─── CANVAS 2D PARTICLES & RIVER FLOW ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + frame * 0.05) * 6;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = socialEra > 50 ? '#0284c7' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const px = (frame * 1.5 + i * 45) % canvas.width;
        const py = canvas.height / 2 + Math.sin(px * 0.04) * 8 + ((i % 3) - 1) * 6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = socialEra > 50 ? '#22c55e' : '#fbbf24';
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [socialEra]);

  // ─── CALLBACK HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Splendid discovery! Gavishti indeed meant the search for cows.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us step into ancient India and discover how society evolved.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setCattleCount(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test and manipulate all variables freely in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for your history mastery challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleNestedUnitClick = useCallback((unit: 'jana' | 'vis' | 'gram' | 'kula') => {
    setSelectedNestedUnit(unit);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      jana: 'Jana: The entire tribe led by the Rajan. Examples: Bharatas, Purus, Yadus.',
      vis: 'Vis: Clan subdivision of related kinship groups inside the Jana.',
      gram: 'Gram: Village settlement of agricultural and herding families.',
      kula: 'Kula: The foundational joint family household led by the Grihapati.',
    };
    speechManager.speak(descriptions[unit] || '');
  }, []);

  const handleCattleChange = useCallback((val: number) => {
    setCattleCount(val);
    audioManager.play('count');
  }, []);

  const handleIronChange = useCallback((val: number) => {
    setIronLevel(val);
    audioManager.play('count');
    if (val > 70 && predictionMade && !predictionVerified) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleSocialEraChange = useCallback((val: number) => {
    setSocialEra(val);
    const approxYear = Math.round(1500 - (val / 100) * 900);
    setTimelineYear(approxYear);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the Vedic and Sramana era.');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Excellent analysis! That is correct.');
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
          speechManager.speak('Let us review the historical evidence together.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

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

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATION ───
  const calculatedRiceSurplus = useMemo(() => Math.round(ironLevel * 1.8 + 10), [ironLevel]);
  const calculatedForestClearing = useMemo(() => Math.min(100, Math.round(ironLevel * 1.1)), [ironLevel]);
  const calculatedAssemblyInfluence = useMemo(() => Math.max(5, 100 - Math.round(socialEra * 0.9)), [socialEra]);
  const calculatedMonarchyPower = useMemo(() => Math.min(100, Math.round(socialEra * 0.95) + 10), [socialEra]);

  // Motivational feedback helper
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount >= 1 && errCount <= 3) return 'Great work!';
    if (errCount >= 4 && errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-amber-950/60 border border-amber-600/40 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-amber-400/90 font-medium tracking-wide">
              ICSE Class 6 History &amp; Civics • 1500 BCE – 500 BCE Transformation
            </p>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch mode to ${p}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge' && phase !== 'challenge') handleAdvanceToChallenge();
                else if (p === 'sandbox' && phase !== 'sandbox') handleAdvanceToSandbox();
                else if (p === 'explore' && phase !== 'explore') handleAdvanceToExploration();
                else setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-extrabold uppercase px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
              Historical Curiosity Hook
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-amber-200/90 font-mono">
              📜 Chronicler&apos;s Query: {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200 shadow-md'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-700 text-center text-xs leading-6 font-bold mr-2 text-amber-300">
                    {discoveryAnswered ? (idx === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on! ' : '💡 Historical Insight: '}
                  </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
                <motion.button
                  aria-label="Advance to exploration phase"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 whitespace-nowrap"
                >
                  Step Into the Past →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Interactive Discovery Lab • Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white mt-0.5">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 disabled:opacity-30 rounded-xl text-xs font-bold"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label="Next step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToSandbox();
                }}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next →' : 'Sandbox Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs text-amber-300/90 font-medium bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── INTERACTIVE STEP 1: NESTED POLITY ─── */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                <svg viewBox="0 0 360 280" className="w-full max-w-sm" aria-label="Nested Vedic political structure diagram">
                  <rect
                    x="20"
                    y="20"
                    width="320"
                    height="240"
                    rx="18"
                    fill={selectedNestedUnit === 'jana' ? '#451a03' : '#1e1b4b'}
                    stroke={selectedNestedUnit === 'jana' ? '#f59e0b' : '#4338ca'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleNestedUnitClick('jana')}
                    role="button"
                    tabIndex={0}
                    aria-label="Select Jana political layer"
                  />
                  <text x="40" y="45" fill="#fbbf24" fontSize="13" fontWeight="bold">
                    1. JANA (Tribe: Bharatas, Purus) • Led by Rajan
                  </text>

                  <rect
                    x="50"
                    y="65"
                    width="260"
                    height="180"
                    rx="14"
                    fill={selectedNestedUnit === 'vis' ? '#78350f' : '#1e293b'}
                    stroke={selectedNestedUnit === 'vis' ? '#fbbf24' : '#64748b'}
                    strokeWidth="2.5"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleNestedUnitClick('vis')}
                    role="button"
                    tabIndex={0}
                    aria-label="Select Vis political layer"
                  />
                  <text x="70" y="90" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                    2. VIS (Clan Subdivision)
                  </text>

                  <rect
                    x="80"
                    y="110"
                    width="200"
                    height="120"
                    rx="10"
                    fill={selectedNestedUnit === 'gram' ? '#92400e' : '#0f172a'}
                    stroke={selectedNestedUnit === 'gram' ? '#fde68a' : '#475569'}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleNestedUnitClick('gram')}
                    role="button"
                    tabIndex={0}
                    aria-label="Select Gram political layer"
                  />
                  <text x="100" y="133" fill="#94a3b8" fontSize="10" fontWeight="bold">
                    3. GRAM (Village Settlement)
                  </text>

                  <rect
                    x="110"
                    y="150"
                    width="140"
                    height="65"
                    rx="8"
                    fill={selectedNestedUnit === 'kula' ? '#b45309' : '#020617'}
                    stroke={selectedNestedUnit === 'kula' ? '#ffffff' : '#334155'}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleNestedUnitClick('kula')}
                    role="button"
                    tabIndex={0}
                    aria-label="Select Kula political layer"
                  />
                  <text x="180" y="175" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    4. KULA (Joint Family)
                  </text>
                  <text x="180" y="195" textAnchor="middle" fill="#fbbf24" fontSize="9">
                    Grihapati (Head)
                  </text>
                </svg>
                <span className="text-[10px] text-slate-400 mt-2">
                  Click on any nested box above to inspect its function
                </span>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Inspecting Unit: {selectedNestedUnit.toUpperCase()}
                  </span>
                  <h3 className="text-base font-black text-white mt-1">
                    {selectedNestedUnit === 'jana' && 'Jana — The Mobile Tribal Nation'}
                    {selectedNestedUnit === 'vis' && 'Vis — The Clan Kinship Group'}
                    {selectedNestedUnit === 'gram' && 'Gram — The Village Homestead'}
                    {selectedNestedUnit === 'kula' && 'Kula — The Domestic Hearth & Joint Family'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedNestedUnit === 'jana' &&
                      'The largest political collective in Sapta Sindhu. Governed by a Rajan (Gopa) who was limited by the Sabha (elders) and Samiti (popular assembly). No standing army existed; the jana fought as a unified militia.'}
                    {selectedNestedUnit === 'vis' &&
                      'A cluster of related families forming a clan. Several vis units united to form the jana during major battles like the Battle of the Ten Kings on the Parushni river.'}
                    {selectedNestedUnit === 'gram' &&
                      'The basic village community where cattle herding and barley farming were carried out. Householders gathered in village councils to coordinate grazing and defence.'}
                    {selectedNestedUnit === 'kula' &&
                      'The nuclear/joint household headed by the Grihapati, who maintained the sacred domestic fire (yajna), managed cattle wealth, and represented the family.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold block">Purohita</span>
                    <span className="text-slate-400 text-[11px]">Chief Priest &amp; Advisor (e.g., Vasishta under King Sudas)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold block">Senani</span>
                    <span className="text-slate-400 text-[11px]">Commander of tribal warriors in times of gavishti</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── INTERACTIVE STEP 2: PASTORAL CATTLE ECONOMY ─── */}
          {currentSlide === 1 && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Pastoral Herd Size</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">{cattleCount} Cows</div>
                  <span className="text-[10px] text-emerald-400">Primary Wealth Indicator</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Gavishti (Raid Risk)</span>
                  <div className="text-2xl font-black text-rose-400 mt-1">
                    {cattleCount > 80 ? 'High' : cattleCount > 40 ? 'Moderate' : 'Low'}
                  </div>
                  <span className="text-[10px] text-slate-400">Battle for Cattle prize</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Nishka Exchange Value</span>
                  <div className="text-2xl font-black text-gold-300 mt-1">
                    {Math.round(cattleCount / 12)} Ornaments
                  </div>
                  <span className="text-[10px] text-slate-400">Gift medium (not coin!)</span>
                </div>
              </div>

              {/* Real-time slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Adjust Clan Cattle Wealth (Heads of Cattle):</span>
                  <span className="text-amber-400">{cattleCount}</span>
                </label>
                <input
                  type="range"
                  aria-label="Cattle herd size range slider"
                  min={10}
                  max={150}
                  value={cattleCount}
                  onChange={e => handleCattleChange(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-around flex-wrap gap-2">
                {Array.from({ length: Math.min(24, Math.round(cattleCount / 6)) }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                    title="Rig Vedic Cow (Gopa wealth)"
                  >
                    🐄
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* ─── INTERACTIVE STEP 3: IRON REVOLUTION & GANGETIC SHIFT ─── */}
          {currentSlide === 2 && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              {!predictionMade ? (
                <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-800/60">
                  <span className="text-xs font-extrabold uppercase text-gold-300">
                    Predict Before You Experiment
                  </span>
                  <p className="text-sm font-semibold text-white mt-1">
                    {PREDICTION_QUESTIONS[0].question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Prediction option ${i + 1}: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left text-xs rounded-lg border border-slate-700 text-slate-200"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-gold-800/40 text-xs text-gold-200 flex items-center justify-between">
                  <span>💡 Prediction Logged: {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                  {predictionVerified && <span className="text-emerald-400 font-bold">✓ Verified!</span>}
                </div>
              )}

              {/* Real-time slider directly driving visualization */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Iron Smelting &amp; Tool Adoption (Krishna Ayas %):</span>
                  <span className="text-amber-400">{ironLevel}%</span>
                </label>
                <input
                  type="range"
                  aria-label="Iron smelting tool adoption percentage"
                  min={0}
                  max={100}
                  value={ironLevel}
                  onChange={e => handleIronChange(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Real-time Gangetic Forest Clearance & Iron Plough Cultivation */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 500 160" className="w-full max-w-lg" aria-label="Gangetic forest clearance and agriculture simulation diagram">
                  <rect x="0" y="0" width="500" height="160" rx="10" fill="#091428" />
                  <path d="M 0 130 Q 150 110 300 135 T 500 125 L 500 160 L 0 160 Z" fill="#0284c7" opacity="0.6" />
                  
                  {/* Forest Sal Trees (fading out as iron increases) */}
                  <g opacity={Math.max(0.1, (100 - ironLevel) / 100)}>
                    <circle cx="60" cy="70" r="24" fill="#15803d" />
                    <rect x="56" y="90" width="8" height="30" fill="#78350f" />
                    <circle cx="110" cy="60" r="30" fill="#166534" />
                    <rect x="105" y="85" width="10" height="35" fill="#78350f" />
                    <circle cx="160" cy="75" r="22" fill="#15803d" />
                    <rect x="156" y="95" width="8" height="25" fill="#78350f" />
                    <text x="60" y="40" fill="#86efac" fontSize="10" fontWeight="bold">Dense Sal Forest</text>
                  </g>

                  {/* Cleared Field & Rice Paddy (growing as iron increases) */}
                  <g opacity={Math.max(0.2, ironLevel / 100)}>
                    <rect x="230" y="85" width="250" height="40" rx="4" fill="#854d0e" opacity="0.4" />
                    <text x="250" y="75" fill="#fde047" fontSize="11" fontWeight="bold">
                      Wet-Rice Fields (Vrihi Paddy Surplus: {calculatedRiceSurplus} Q/Ha)
                    </text>
                    {Array.from({ length: Math.min(10, Math.floor(ironLevel / 10)) }).map((_, idx) => (
                      <path
                        key={idx}
                        d={`M ${250 + idx * 24} 115 Q ${255 + idx * 24} 95 ${260 + idx * 24} 90 Q ${265 + idx * 24} 95 ${270 + idx * 24} 115`}
                        stroke="#eab308"
                        strokeWidth="3"
                        fill="none"
                      />
                    ))}
                  </g>

                  <circle cx="210" cy="115" r="16" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                  <text x="210" y="119" textAnchor="middle" fill="#ffffff" fontSize="12">⛏️</text>
                </svg>
                <span className="text-[10px] text-slate-400 mt-2">
                  Live Agrarian Simulation: Iron axes fell forests while iron ploughshares turn heavy wet-rice soil.
                </span>
              </div>

              {/* Simulation Gauge Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Forest Clearance Rate</span>
                  <div className="text-lg font-black text-amber-400 mt-1">{calculatedForestClearing}%</div>
                  <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500"
                      animate={{ width: `${calculatedForestClearing}%` }}
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Rice (Vrihi) Food Surplus</span>
                  <div className="text-lg font-black text-emerald-400 mt-1">
                    {calculatedRiceSurplus} Quintals / Hectare
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500"
                      animate={{ width: `${Math.min(100, calculatedRiceSurplus / 2)}%` }}
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Second Urbanisation Status</span>
                  <div className="text-lg font-black text-gold-300 mt-1">
                    {ironLevel > 60 ? 'Rising Towns' : 'Rural Villages'}
                  </div>
                  <span className="text-[10px] text-slate-400">Trade on Ganga waterway</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── INTERACTIVE STEP 4: VARNA HARDENING & ASSEMBLY DECLINE ─── */}
          {currentSlide === 3 && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Vedic Chronology Transition (1500 BCE Early → 600 BCE Later):</span>
                  <span className="text-amber-400">{timelineYear} BCE</span>
                </label>
                <input
                  type="range"
                  aria-label="Vedic chronology timeline transition slider"
                  min={0}
                  max={100}
                  value={socialEra}
                  onChange={e => handleSocialEraChange(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div ref={timelineGsapRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">Sabha &amp; Samiti Assembly Voice</span>
                    <span className="text-xs font-black text-gold-400">{calculatedAssemblyInfluence}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gold-500"
                      animate={{ width: `${calculatedAssemblyInfluence}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {socialEra < 40
                      ? 'Early Vedic: Active assemblies debate policy, check royal power, and include women.'
                      : 'Later Vedic: Assemblies gradually wither as hereditary monarchy and royal sacrifices take over.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">Hereditary Royal Power (Samrat)</span>
                    <span className="text-xs font-black text-amber-400">{calculatedMonarchyPower}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500"
                      animate={{ width: `${calculatedMonarchyPower}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {socialEra > 50
                      ? 'Legitimised by expensive sacrifices: Ashvamedha (horse), Rajasuya (consecration), Vajapeya.'
                      : 'Pastoral chiefdom: Rajan relies on tribal consent and cattle protection.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Later Vedic Varna Stratification (Hereditary by Birth)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 bg-gold-950/70 border border-gold-700/50 rounded-lg">
                    <span className="font-bold text-gold-200 block">1. Brahmin</span>
                    <span className="text-[10px] text-slate-400">Priesthood &amp; Sanskrit study</span>
                  </div>
                  <div className="p-2 bg-amber-950/70 border border-amber-700/50 rounded-lg">
                    <span className="font-bold text-amber-200 block">2. Kshatriya</span>
                    <span className="text-[10px] text-slate-400">Rulers &amp; Warriors</span>
                  </div>
                  <div className="p-2 bg-emerald-950/70 border border-emerald-700/50 rounded-lg">
                    <span className="font-bold text-emerald-200 block">3. Vaishya</span>
                    <span className="text-[10px] text-slate-400">Traders &amp; Farmers</span>
                  </div>
                  <div className="p-2 bg-rose-950/70 border border-rose-700/50 rounded-lg">
                    <span className="font-bold text-rose-200 block">4. Shudra</span>
                    <span className="text-[10px] text-slate-400">Servants &amp; Labourers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── INTERACTIVE STEP 5: SRAMANA REFORM RESPONSE ─── */}
          {currentSlide === 4 && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex gap-2">
                <motion.button
                  aria-label="Select Jainism doctrine"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedReform('jain');
                    audioManager.play('tap');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    selectedReform === 'jain'
                      ? 'bg-amber-600 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Mahavira &amp; Jainism (24th Tirthankara)
                </motion.button>
                <motion.button
                  aria-label="Select Buddhism doctrine"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedReform('buddha');
                    audioManager.play('tap');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    selectedReform === 'buddha'
                      ? 'bg-amber-600 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Gautama Buddha &amp; Buddhism (Middle Path)
                </motion.button>
              </div>

              {/* Dharmachakra & Triratna Graphic */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 400 130" className="w-full max-w-sm" aria-label="Buddhist Wheel of Law and Jain Triratna iconographic diagram">
                  <rect x="0" y="0" width="400" height="130" rx="10" fill="#030712" />
                  
                  {selectedReform === 'buddha' ? (
                    <g>
                      <circle cx="80" cy="65" r="45" fill="none" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="80" cy="65" r="12" fill="#d97706" />
                      {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180;
                        const x2 = 80 + 45 * Math.cos(angle);
                        const y2 = 65 + 45 * Math.sin(angle);
                        return <line key={i} x1="80" y1="65" x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2.5" />;
                      })}
                      <text x="150" y="45" fill="#fef08a" fontSize="13" fontWeight="bold">Dharmachakrapravartana</text>
                      <text x="150" y="68" fill="#93c5fd" fontSize="11">Eight-Fold Path (Ashtangika Marga)</text>
                      <text x="150" y="88" fill="#cbd5e1" fontSize="10">Practical prescription of 4th Truth (Magga)</text>
                    </g>
                  ) : (
                    <g>
                      <circle cx="50" cy="80" r="18" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                      <text x="50" y="84" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Faith</text>
                      <circle cx="90" cy="80" r="18" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                      <text x="90" y="84" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Know</text>
                      <circle cx="70" cy="45" r="18" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                      <text x="70" y="49" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Conduct</text>
                      
                      <text x="135" y="45" fill="#fef08a" fontSize="13" fontWeight="bold">Jain Triratna (Three Jewels)</text>
                      <text x="135" y="68" fill="#cbd5e1" fontSize="11">Samyak Darshana • Jnana • Charitra</text>
                      <text x="135" y="88" fill="#86efac" fontSize="10">Combined with 5 Great Vows (Mahavratas)</text>
                    </g>
                  )}
                </svg>
              </div>

              {selectedReform === 'jain' ? (
                <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40 space-y-3">
                  <h3 className="text-sm font-bold text-amber-300">
                    Vardhamana Mahavira (599 BCE – 527 BCE, Nirvana at Pavapuri)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Born to the Jnatrika Kshatriya clan near Vaishali. Attained Kevala Jnana under a Sal tree.
                    Preached in Prakrit to ensure universal understanding.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                    {['1. Ahimsa (Non-violence)', '2. Satya (Truth)', '3. Asteya (Non-stealing)', '4. Brahmacharya (Purity)', '5. Aparigraha (Non-possession)'].map((vow, i) => (
                      <div key={i} className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="font-bold text-amber-400 block text-[11px]">{vow}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/40 space-y-3">
                  <h3 className="text-sm font-bold text-gold-300">
                    Gautama Buddha (563 BCE – 483 BCE, Mahaparinirvana at Kushinagar)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Born at Lumbini (Shakya clan). Attained Sambodhi at Bodh Gaya. Set Wheel of Law in motion at
                    Sarnath. Formulated the Middle Way (avoiding luxury &amp; severe starvation).
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    {['Dukkha (Suffering exists)', 'Samudaya (Origin: Craving)', 'Nirodha (Cessation possible)', 'Magga (Eight-Fold Path)'].map((truth, i) => (
                      <div key={i} className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="font-bold text-gold-300 block text-[11px]">Noble Truth {i + 1}</span>
                        <span className="text-[10px] text-slate-400">{truth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Animated Wave Canvas Indicator */}
          <canvas ref={canvasRef} width={600} height={35} className="w-full rounded-xl bg-slate-900/60 border border-slate-800" />
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX LAB ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-black text-white">Free-Play Historical Sandbox</h2>
            <p className="text-xs text-slate-300 mt-1">
              Test how altering the historical timeline year, iron availability, and cattle wealth changes ancient Indian society without any grading pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Vedic Timeline Era:</span>
                  <span className="text-amber-400">{timelineYear} BCE</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox Vedic timeline era slider"
                  min={0}
                  max={100}
                  value={socialEra}
                  onChange={e => handleSocialEraChange(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Iron Technology (Krishna Ayas %):</span>
                  <span className="text-emerald-400">{ironLevel}%</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox iron technology slider"
                  min={0}
                  max={100}
                  value={ironLevel}
                  onChange={e => handleIronChange(Number(e.target.value))}
                  className="w-full mt-2 accent-emerald-500"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Cattle Pen Size:</span>
                  <span className="text-gold-400">{cattleCount} cows</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox cattle herd slider"
                  min={10}
                  max={150}
                  value={cattleCount}
                  onChange={e => handleCattleChange(Number(e.target.value))}
                  className="w-full mt-2 accent-gold-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Simulated Historical Status
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Dominant Region:</span>
                  <span className="font-bold text-white">
                    {socialEra < 50 ? 'Sapta Sindhu (Punjab/Haryana)' : 'Gangetic Plain (Aryavarta)'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Political Form:</span>
                  <span className="font-bold text-white">
                    {socialEra < 50 ? 'Tribal Jana (Elected Rajan / Gopa)' : 'Territorial Janapada (Samrat)'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Primary Economy:</span>
                  <span className="font-bold text-white">
                    {ironLevel < 40 ? 'Pastoral & Barley (Yava)' : 'Wet-Rice (Vrihi) & Ganga Trade'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Social Order:</span>
                  <span className="font-bold text-white">
                    {socialEra < 40 ? 'Fluid Arya-Dasa Divisions' : 'Rigid Hereditary Four-Varna System'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Religious Trend:</span>
                  <span className="font-bold text-amber-300">
                    {socialEra > 70 ? 'Sramana Ferment (Jainism & Buddhism)' : 'Open-Air Nature Altars (Indra/Agni)'}
                  </span>
                </div>
              </div>

              <motion.button
                aria-label="Proceed to graded challenge questions"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 mt-2"
              >
                I Am Ready for Graded Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : difficulty === 'standard'
                      ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                      : 'bg-rose-950/60 border-rose-500 text-rose-300'
                  }`}
                >
                  {difficulty} tier
                </motion.span>
                <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wider">
                  NEP Level: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Mastery Score</span>
              <div className="text-sm font-black text-amber-400">
                {scoreBreakdown.correct} / {scoreBreakdown.total}
              </div>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Types with framer-motion shake animation on error */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-semibold transition-all border ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-5 h-5 rounded-md bg-slate-700 text-center text-xs leading-5 font-bold mr-2 text-amber-300">
                        {showExplanation ? (i === challenge.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type with accessibility role & aria-label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="w-full text-[11px] text-slate-400 font-bold mb-1">
                    Draggable Labels (Drag into target boxes below):
                  </span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-lg text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_outer', title: '1. Outermost Layer' },
                    { id: 'box_mid_outer', title: '2. Secondary Layer' },
                    { id: 'box_mid_inner', title: '3. Village Layer' },
                    { id: 'box_inner', title: '4. Innermost Family Layer' },
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target: ${target.title}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[10px] text-slate-400 font-bold">{target.title}</span>
                      <span className="text-xs font-black text-amber-300 mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify drag-and-drop mapping"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase"
                >
                  Verify Nested Mapping →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type with accessibility */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-bold block">
                  Click and reorder the items in correct chronological sequence:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 hover:bg-slate-700/90 rounded-xl border border-slate-700 text-xs md:text-sm font-semibold flex items-center justify-between cursor-grab"
                    >
                      <span>{item}</span>
                      <span className="text-slate-500 font-mono text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Submit sequence order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numeric answer input"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter number..."
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-amber-600 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-red-950 hover:text-white text-xs font-black"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble the answer</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify assembled formulation"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase disabled:opacity-40"
                >
                  Verify Formulation →
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  📜 Historical Step-by-Step Walkthrough:
                </span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step in explanation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Show Next Insight →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to next challenge or completion report"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Report →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 rounded-3xl border border-amber-600/40 text-center space-y-3">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Vedic &amp; Sramana Mastery Achieved!
            </h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl inline-block font-extrabold text-amber-300 text-base">
              {getMotivationalFeedback(errors)}
            </div>

            <div className="flex justify-center items-center gap-4 text-xs font-mono mt-2">
              <span className="px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-slate-300">
                Final Score: <strong className="text-amber-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </span>
              <span className="px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-slate-300">
                Mastery Status: <strong className="text-emerald-400">{masteryLevel.toUpperCase()}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-slate-300">
                Errors Logged: <strong className="text-rose-400">{errors}</strong>
              </span>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Post-Simulation Deep Reflection
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection question: What was the most surprising thing you learned?"
                  value={reflectionSurprise}
                  onChange={e => setReflectionSurprise(e.target.value)}
                  placeholder="e.g., That battle (gavishti) literally meant 'search for cows' and women composed Vedic hymns..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 min-h-[60px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection question: How would you explain this to a friend?"
                  value={reflectionExplain}
                  onChange={e => setReflectionExplain(e.target.value)}
                  placeholder="e.g., Early clans who herded cattle moved to river valleys, found iron, grew rice, and built kingdoms..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 min-h-[60px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection question: Where in real life might you use this?"
                  value={reflectionRealLife}
                  onChange={e => setReflectionRealLife(e.target.value)}
                  placeholder="e.g., Understanding democratic assemblies like Gram Sabhas and applying the Buddhist Middle Path to balanced lifestyle choices..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 min-h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-rose-900/40 space-y-3">
              <h3 className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Your Misconception Diagnostic Profile
              </h3>
              <p className="text-xs text-slate-400">
                Examine these historical misconceptions that were corrected during your simulation:
              </p>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400 font-semibold">✓ Historical Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-400">Spaced Repetition (SM-2 Algorithm):</span>
              <p className="text-slate-400 text-[11px]">
                To cement these Vedic concepts in long-term memory, your next optimal review is scheduled in{' '}
                <strong className="text-white">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                .
              </p>
            </div>
            <span className="text-2xl">⏳</span>
          </div>

          {/* Real-World Living Heritage Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </span>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Completed with Distinction!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_HistoryCivicsEarlyVedicPoliticalSim;