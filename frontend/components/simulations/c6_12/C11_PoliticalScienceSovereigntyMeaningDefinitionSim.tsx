'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY LITERAL DECLARATIONS) ───
const NODE_C11_POL_011 = 'c11_pol_011';
const NODE_C11_POL_012 = 'c11_pol_012';
const NODE_C11_POL_013 = 'c11_pol_013';
const NODE_C11_POL_014 = 'c11_pol_014';
const NODE_C11_POL_015 = 'c11_pol_015';
const NODE_C11_POL_016 = 'c11_pol_016';
const NODE_C11_POL_017 = 'c11_pol_017';
const NODE_C11_POL_018 = 'c11_pol_018';
const NODE_C11_POL_019 = 'c11_pol_019';
const NODE_C11_POL_020 = 'c11_pol_020';

const ALL_NODE_IDS = [
  NODE_C11_POL_011,
  NODE_C11_POL_012,
  NODE_C11_POL_013,
  NODE_C11_POL_014,
  NODE_C11_POL_015,
  NODE_C11_POL_016,
  NODE_C11_POL_017,
  NODE_C11_POL_018,
  NODE_C11_POL_019,
  NODE_C11_POL_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Constitution & Sovereign Statecraft Lab',
  intro: 'You are appointed as Chief Constitutional Advisor to the Republic of Bharat. A newly reorganised state requires governance laws, liberty protections, equality frameworks, and justice mechanisms.',
  context: 'Navigate the foundational concepts of political theory: Sovereignty (Bodin & Austin vs Pluralists), Sources and Kinds of Law, Negative and Positive Dimensions of Liberty, the 4-fold Ladder of Equality, and the rival Theories of Justice by John Rawls and Amartya Sen.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When Parliament amends the Constitution or enacts a national law under Article 368, what is the ultimate source that makes this authority legitimate in the Indian Republic?',
  options: [
    'The physical coercive power of the armed forces',
    'Popular sovereignty vested in "We, The People of India"',
    'The British Parliament under the Indian Independence Act 1947',
    'The individual discretion of the President of India',
  ],
  correctIndex: 1,
  hintAfter: 'Remember the opening words of the Preamble! Popular sovereignty is the anchor of the Indian democratic state.',
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

// ─── 22 RICH PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_pol_011)
  {
    id: 'ch_pol_001',
    nodeId: NODE_C11_POL_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who was the 16th-century French philosopher who first formulated sovereignty as a systematic political concept in "Six Books of the Commonwealth" (1576)?',
    options: ['Jean Bodin', 'John Austin', 'Harold Laski', 'Thomas Hobbes'],
    correctIndex: 0,
    explanation: 'Jean Bodin first systematically conceptualised sovereignty in 1576 as the supreme power over citizens and subjects unrestrained by law.',
    hints: [
      'Think of the French thinker during the religious civil wars of the 1500s.',
      'He wrote "Six Books of the Commonwealth" in 1576.',
      'His name begins with Jean B...',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c11_pol_011)
  {
    id: 'ch_pol_002',
    nodeId: NODE_C11_POL_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which characteristic of sovereignty means that sovereignty persists uninterrupted even if the government or Prime Minister changes?',
    options: ['Absoluteness', 'Permanence', 'Indivisibility', 'Inalienability'],
    correctIndex: 1,
    explanation: 'Permanence ensures that sovereignty continues as long as the State exists; governments change during elections, but state sovereignty endures.',
    hints: [
      'It means perpetual or lasting continuity over time.',
      'A change in ministry or ruling party does not destroy the state.',
      'The term is "Permanence".',
    ],
  },
  // 3. Foundation - Understanding (c11_pol_012)
  {
    id: 'ch_pol_003',
    nodeId: NODE_C11_POL_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In India���s parliamentary democracy, the President of India is the ________ sovereign, while the Prime Minister and Council of Ministers constitute the ________ sovereign.',
    options: [
      'Titular; Real',
      'De-facto; De-jure',
      'Political; Legal',
      'Popular; Constitutional',
    ],
    correctIndex: 0,
    explanation: 'Under Article 53 and Article 74, executive authority is vested nominally in the President (Titular), but real power is exercised on the aid and advice of the Council of Ministers (Real).',
    hints: [
      'One is sovereign in title/name only; the other wields actual operational power.',
      'Think of the constitutional position under Article 74.',
      'The pair is Titular and Real.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Drag-label (c11_pol_015)
  {
    id: 'ch_pol_004',
    nodeId: NODE_C11_POL_015,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each kind of law to its corresponding constitutional or administrative level in India.',
    dragItems: [
      { label: 'Constitutional Law', targetId: 'zone_apex' },
      { label: 'Statute Law', targetId: 'zone_parliament' },
      { label: 'Municipal Law', targetId: 'zone_local' },
      { label: 'Ordinance', targetId: 'zone_executive' },
    ],
    correctMapping: {
      zone_apex: 'Constitutional Law',
      zone_parliament: 'Statute Law',
      zone_local: 'Municipal Law',
      zone_executive: 'Ordinance',
    },
    explanation: 'Constitutional Law is supreme fundamental law (Article 13/368); Statute Law is enacted by Parliament; Ordinances are temporary executive decrees (Article 123); Municipal Laws are local civic by-laws.',
    hints: [
      'Supreme law at apex is Constitutional Law.',
      'Acts passed by Parliament are Statute Law.',
      'Temporary decrees by the President/Governor are Ordinances, and city by-laws are Municipal.',
    ],
  },
  // 5. Foundation - Recall (c11_pol_016)
  {
    id: 'ch_pol_005',
    nodeId: NODE_C11_POL_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which thinker is most famously known for formulating the classic distinction between "Negative Liberty" and "Positive Liberty" in "Two Concepts of Liberty" (1958)?',
    options: ['Isaiah Berlin', 'John Stuart Mill', 'Jeremy Bentham', 'Harold Laski'],
    correctIndex: 0,
    explanation: 'Sir Isaiah Berlin delivered the famous 1958 lecture defining negative liberty (absence of obstacle) and positive liberty (ability to be one’s own master).',
    hints: [
      'He was an Oxford political theorist.',
      'He wrote "Two Concepts of Liberty".',
      'His initials are I.B. (Isaiah Berlin).',
    ],
  },
  // 6. Foundation - Understanding (c11_pol_018)
  {
    id: 'ch_pol_006',
    nodeId: NODE_C11_POL_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which Article of the Indian Constitution abolishes "Untouchability" and forbids its practice in any form, serving as a pillar of Social Equality?',
    options: ['Article 17', 'Article 14', 'Article 19', 'Article 326'],
    correctIndex: 0,
    explanation: 'Article 17 explicitly abolishes untouchability and makes its practice in any form a punishable offence, guaranteeing social equality.',
    hints: [
      'It is placed between Article 16 (public employment) and Article 18 (abolition of titles).',
      'It is Article 17.',
      'It eradicates caste-based segregation.',
    ],
  },
  // 7. Foundation - Drag-sort (c11_pol_018)
  {
    id: 'ch_pol_007',
    nodeId: NODE_C11_POL_018,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4-tier Ladder of Equality in the logical constitutional order from basic legal foundation to substantive material equity.',
    sortItems: [
      'Legal Equality (Rule of Law - Art 14)',
      'Social Equality (Abolition of Caste/Gender barriers - Art 15/17)',
      'Political Equality (Universal Adult Franchise - Art 326)',
      'Economic Equality (Fair distribution & living wage - Art 39/MGNREGA)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Dr. Ambedkar structured equality as a ladder: Legal equality sets the non-arbitrary baseline, Social equality eliminates birth-based stigma, Political equality grants equal democratic voice, and Economic equality secures material capability.',
    hints: [
      'Start with the legal floor (Article 14).',
      'Follow with social emancipation (caste/gender).',
      'Next is voting rights (Article 326), and finally economic fair distribution.',
    ],
  },
  // 8. Standard - Application (c11_pol_011)
  {
    id: 'ch_pol_008',
    nodeId: NODE_C11_POL_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 2019, Parliament enacted the Jammu & Kashmir Reorganisation Act reorganising a state under Article 3. Which twin facets of Sovereignty did this historic constitutional exercise illustrate?',
    options: [
      'All-comprehensiveness internally, and independence from external dictation externally',
      'Division of sovereign power between Centre and State',
      'Subordination of domestic law to international treaties',
      'Temporary delegation of sovereignty to the judiciary',
    ],
    correctIndex: 0,
    explanation: 'The reorganisation showed Internal Sovereignty (all-comprehensive legislative reach over all territory) and External Sovereignty (refusal to permit outside foreign dictation over domestic boundaries).',
    hints: [
      'Think of internal supreme command over national territory and external independence from foreign bodies.',
      'Sovereignty is indivisible and all-comprehensive.',
      'The Supreme Court confirmed Indian sovereignty over J&K was always total.',
    ],
  },
  // 9. Standard - Analysis (c11_pol_013)
  {
    id: 'ch_pol_009',
    nodeId: NODE_C11_POL_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do Pluralist thinkers (Laski, Barker, MacIver) directly refute John Austin’s monistic definition of sovereignty?',
    options: [
      'By arguing that the State is only one association among many and sovereignty is functionally divided',
      'By demanding the complete dissolution of all legal institutions',
      'By asserting that the monarch has divine authority above society',
      'By claiming that international courts have absolute monistic sovereignty',
    ],
    correctIndex: 0,
    explanation: 'Pluralists argue that human beings belong to multiple associations (trade unions, universities, panchayats, churches) which claim legitimate authority, making the state a "first among equals" rather than an omnipotent Leviathan.',
    hints: [
      'Austin says sovereignty is single and indivisible; Pluralists say society is composed of many autonomous groups.',
      'Look for the option highlighting the State as one association among many.',
      'Harold Laski championed functional decentralisation.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Numeric (c11_pol_015)
  {
    id: 'ch_pol_009_num',
    nodeId: NODE_C11_POL_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Article 123 of the Indian Constitution, an Ordinance promulgated by the President ceases to operate how many WEEKS after the reassembly of Parliament if not approved earlier?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'weeks',
    explanation: 'Under Article 123(2)(a), an ordinance promulgated by the President must be laid before both Houses of Parliament and lapses within 6 weeks of Parliament’s reassembly.',
    hints: [
      'Think of the constitutional timeframe in weeks, not months.',
      'It is 1.5 months (approx 42 days).',
      'The exact number is 6 weeks.',
    ],
  },
  // 11. Standard - Application (c11_pol_014)
  {
    id: 'ch_pol_010',
    nodeId: NODE_C11_POL_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Article 371A gives constitutional protection to Naga traditional land ownership and social practices against ordinary parliamentary acts. Which primary source of law is constitutionally preserved here?',
    options: ['Custom', 'Scientific Commentary', 'Equity', 'International Treaty'],
    correctIndex: 0,
    explanation: 'Article 371A constitutionally protects customary law and practices of the Nagas, proving that custom remains an active, legally binding source of law in India.',
    hints: [
      'It refers to ancient, continuous community traditions.',
      'Think of customary tribal practices.',
      'The source is Custom.',
    ],
  },
  // 12. Standard - Analysis (c11_pol_016)
  {
    id: 'ch_pol_011_b',
    nodeId: NODE_C11_POL_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Supreme Court in K.S. Puttaswamy (2017) protected privacy from state surveillance, whereas Article 21A provides free mid-day meals and schooling. How do these reflect the dimensions of liberty?',
    options: [
      'Puttaswamy represents Negative Liberty (freedom from intrusion); Article 21A represents Positive Liberty (enabling conditions)',
      'Both are examples of strictly economic equality without liberty',
      'Puttaswamy is positive liberty while Article 21A is negative licence',
      'Neither represents liberty because both involve government policy',
    ],
    correctIndex: 0,
    explanation: 'Negative liberty is non-interference by the state (privacy/surveillance protection), while positive liberty provides enabling material capabilities (education, food, healthcare).',
    hints: [
      'Freedom FROM state intrusion is negative liberty.',
      'Enabling resources TO achieve potential is positive liberty.',
      'Option 1 pairs Puttaswamy with negative and Article 21A with positive.',
    ],
  },
  // 13. Standard - Construct (c11_pol_020)
  {
    id: 'ch_pol_012_const',
    nodeId: NODE_C11_POL_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct John Rawls’s Lexical Priority of Justice by ordering the theoretical components from first constraint to secondary distribution.',
    availableParts: [
      'Equal Basic Liberties (Liberty Principle)',
      'Fair Equality of Opportunity',
      'Difference Principle (Max Benefit to Least Advantaged)',
    ],
    targetState: 'Equal Basic Liberties (Liberty Principle) Fair Equality of Opportunity Difference Principle (Max Benefit to Least Advantaged)',
    validationHint: 'Rawls gives strict lexical priority: First basic liberties, then fair opportunity, then the difference principle.',
    explanation: 'Rawls asserts that basic liberties cannot be traded away for wealth. First comes the Liberty Principle, followed by Fair Equality of Opportunity, and finally the Difference Principle.',
    hints: [
      'Start with the Liberty Principle (freedom cannot be traded for money).',
      'Next add Fair Equality of Opportunity.',
      'Conclude with the Difference Principle for socio-economic distribution.',
    ],
  },
  // 14. Standard - Application (c11_pol_017)
  {
    id: 'ch_pol_013_b',
    nodeId: NODE_C11_POL_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A landless farm worker in a village is threatened with eviction by a moneylender if she votes for an opposition candidate. Which two kinds of liberty are violated here, and why?',
    options: [
      'Economic and Political Liberty — economic dependency strips her of free voting participation',
      'Civil and Natural Liberty only',
      'Constitutional and International Liberty',
      'Only Titular Liberty',
    ],
    correctIndex: 0,
    explanation: 'Economic coercion destroys the voter’s material independence, which in turn destroys her political liberty (franchise under Article 326), demonstrating Ambedkar’s thesis of interdependence.',
    hints: [
      'The threat involves livelihood/eviction (Economic) and the vote (Political).',
      'Ambedkar highlighted how economic servitude destroys political freedom.',
      'Select the option with Economic and Political Liberty.',
    ],
  },
  // 15. Standard - Evaluation (c11_pol_019)
  {
    id: 'ch_pol_014_c',
    nodeId: NODE_C11_POL_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does the Indian Constitution permit protective discrimination (reservations under Articles 15(4) and 16(4)) without violating Article 14 (Equality before Law)?',
    options: [
      'Because true justice requires "reasonable classification" to treat unequals differently so as to achieve real substantive equality',
      'Because the Constitution considers upper castes ineligible for fundamental rights',
      'Because Article 14 has been permanently repealed by Parliament',
      'Because justice is merely a procedural ritual with no social content',
    ],
    correctIndex: 0,
    explanation: 'Article 14 permits reasonable classification based on intelligible differentia; treating unequals equally perpetuates historical injustice. Protective discrimination realizes substantive justice.',
    hints: [
      'Think of the difference between formal sameness and substantive fairness.',
      'Treating historical unequals identically is itself a form of inequality.',
      'Look for the "reasonable classification" and substantive equality option.',
    ],
    misconceptionIndex: 2,
  },
  // 16. Advanced - Analysis (c11_pol_020)
  {
    id: 'ch_pol_015_adv',
    nodeId: NODE_C11_POL_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Contrast Amartya Sen’s "Realisation-focused Comparison" with John Rawls’s "Transcendental Institutionalism". Which statement accurately captures Sen’s critique?',
    options: [
      'Sen argues that instead of searching for an unattainable ideal institution, justice must assess actual lives, remove manifest unfreedoms, and expand real capabilities',
      'Sen demands that all public institutions be replaced by free-market algorithms',
      'Sen insists that income equality is the only metric of human flourishing',
      'Sen rejects democracy and replaces public reasoning with bureaucratic decrees',
    ],
    correctIndex: 0,
    explanation: 'Amartya Sen in "The Idea of Justice" focuses on "Niti" (institutional rules) vs "Nyaya" (realised justice), advocating comparative elimination of manifest injustices (hunger, illiteracy) over ideal institutional blue-printing.',
    hints: [
      'Sen prioritises comparing real alternatives (e.g. Kerala vs Bihar health metrics) over designing a flawless abstract state.',
      'He champions capabilities and the removal of "unfreedoms".',
      'Choose the option focusing on assessing actual lives and capabilities.',
    ],
  },
  // 17. Advanced - Evaluation (c11_pol_013)
  {
    id: 'ch_pol_016_adv',
    nodeId: NODE_C11_POL_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Kesavananda Bharati (1973), the Supreme Court ruled that Parliament cannot alter the "Basic Structure" of the Constitution. How does this doctrine evaluate Austin’s monistic theory of an unlimited sovereign in India?',
    options: [
      'It refutes Austin’s claim of an unlimited sovereign by placing constituent boundaries on Parliament, proving the Constitution is supreme over the legislature',
      'It fully vindicates Austin by giving Parliament unlimited sovereign power to rewrite the Constitution',
      'It abolishes judicial review and establishes military sovereignty',
      'It proves that India has no legal sovereign whatsoever',
    ],
    correctIndex: 0,
    explanation: 'Austin claimed the sovereign is legally unlimited. In India, Parliament’s amendatory power under Article 368 is limited by the Basic Structure doctrine, showing that constitutional supremacy supersedes parliamentary absolutism.',
    hints: [
      'Austin claimed the legal sovereign has NO legal limits.',
      'The Basic Structure doctrine prevents Parliament from destroying democracy, judicial review, or federalism.',
      'This shows India rejects Austinian unlimited parliamentary sovereignty.',
    ],
  },
  // 18. Advanced - Application (c11_pol_018)
  {
    id: 'ch_pol_017_adv',
    nodeId: NODE_C11_POL_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In 2024, the Supreme Court struck down the Electoral Bond Scheme in ADR v. Union of India. Which constitutional conflict between economic inequality and democratic equality was resolved?',
    options: [
      'Unlimited corporate money was creating an uneven electoral field, violating political equality (one person, one vote, one value) under Article 14/19',
      'It made political parties exempt from criminal and civil law',
      'It mandated equal salaries for all members of Parliament',
      'It restricted voting rights to property owners only',
    ],
    correctIndex: 0,
    explanation: 'The Supreme Court held that anonymous corporate financial dominance distorts voter information and undermines the political equality of ordinary citizens.',
    hints: [
      'Think about how immense corporate wealth can drown out the equal voice of everyday citizens.',
      'The ruling protected the voter’s right to know and the level playing field.',
      'Option 1 directly addresses the distortion of political equality by corporate money.',
    ],
  },
  // 19. Advanced - Creativity (c11_pol_020)
  {
    id: 'ch_pol_018_adv',
    nodeId: NODE_C11_POL_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an Aspirational District development index for a backward rural district. How would you synthesize Rawls’s Difference Principle with Sen’s Capability Approach?',
    options: [
      'Target maximum budget to the lowest-income households (Rawls) while converting funds into functioning primary health clinics, girls’ toilets, and nutritional midday meals (Sen)',
      'Distribute equal cash tokens to all citizens regardless of need and close schools',
      'Build a luxury airport to increase average GDP statistical figures',
      'Abolish all local elections and rely solely on market forces',
    ],
    correctIndex: 0,
    explanation: 'Combining Rawls (prioritising the worst-off segment) with Sen (ensuring converted capabilities in health, education, and nutrition) provides a complete blueprint for substantive justice.',
    hints: [
      'Rawls focuses on the least advantaged group.',
      'Sen focuses on real conversion into human capabilities (health, schooling, dignity).',
      'Select the comprehensive policy combining worst-off targeting with capability conversion.',
    ],
  },
  // 20. Advanced - Analysis (c11_pol_015)
  {
    id: 'ch_pol_019_adv',
    nodeId: NODE_C11_POL_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In D.C. Wadhwa v. State of Bihar (1987), the Supreme Court condemned the re-promulgation of ordinances without placing them before the legislature. Why was this practice declared a "fraud on the Constitution"?',
    options: [
      'It usurped the primary law-making role of the elected legislature through repetitive executive decree under Article 213',
      'It violated international trade tariffs with foreign states',
      'It allowed the judiciary to pass municipal taxation by-laws',
      'It extended President’s rule indefinitely during wartime',
    ],
    correctIndex: 0,
    explanation: 'Ordinance power is an emergency stopgap (Articles 123/213). Repetitive re-promulgation bypasses parliamentary debate and executive accountability, subverting the separation of powers.',
    hints: [
      'Ordinances are meant to be temporary executive provisions.',
      'Re-promulgating them without legislative voting replaces parliamentary democracy with executive rule.',
      'Choose the option explaining the usurpation of the elected legislature’s power.',
    ],
  },
  // 21. Advanced - Evaluation (c11_pol_012)
  {
    id: 'ch_pol_020_adv',
    nodeId: NODE_C11_POL_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate how De-jure and De-facto sovereignty interacted during the integration of princely states like Hyderabad and Junagadh in 1947–48.',
    options: [
      'Indian administration and security forces established de-facto control on the ground, which was subsequently formalized into de-jure sovereignty via Instruments of Accession and popular plebiscites',
      'The princely rulers retained eternal de-jure sovereignty without Indian constitutional reach',
      'The United Nations granted international mandate sovereignty over all princely territories',
      'Sovereignty was permanently surrendered to local zamindars',
    ],
    correctIndex: 0,
    explanation: 'In contested state formation, de-facto operational control often precedes or accompanies formal de-jure legal title, ultimately harmonised through constitutional integration.',
    hints: [
      'De-facto means factual physical control; De-jure means lawful constitutional recognition.',
      'India established peace on the ground, followed by constitutional accession.',
      'Select the option showing de-facto control followed by de-jure constitutional formalisation.',
    ],
  },
  // 22. Advanced - Analysis (c11_pol_016)
  {
    id: 'ch_pol_021_adv',
    nodeId: NODE_C11_POL_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did Isaiah Berlin express caution regarding the unchecked expansion of "Positive Liberty" in totalitarian regimes?',
    options: [
      'Because the state can claim to know a citizen’s "real higher self" and coerce them into obedience under the pretext of liberating them',
      'Because positive liberty makes laws too lenient for violent criminals',
      'Because positive liberty eliminates the collection of taxes',
      'Because positive liberty requires universal military conscription',
    ],
    correctIndex: 0,
    explanation: 'Berlin warned that positive liberty ("freedom for self-mastery") could be distorted by paternalistic states claiming they are forcing citizens to be free according to the state’s dogma.',
    hints: [
      'Think of authoritarian regimes dictating what is "good" for citizens.',
      'The danger of the state imposing its version of "true self-realisation".',
      'Look for the warning regarding state coercion disguised as higher liberation.',
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
  nodeId: NODE_C11_POL_011,
  title: 'Sovereignty, Law, Liberty, Equality & Justice',
  definition:
    'Sovereignty is the supreme, permanent, indivisible, and all-comprehensive authority of the State. Law represents the sovereign’s binding rules of conduct drawn from customs, statutes, and judicial precedents. Liberty balances non-interference (negative) with enabling capability (positive). Equality guarantees non-arbitrary legal standing, social dignity, universal franchise, and fair economic distribution. Justice harmonises these into an equitable society through Rawlsian fairness and Sen’s capabilities.',
  eli5: 'Think of a country like a giant cooperative school: Sovereignty means the school makes its own rules without outside bullies; Law is the rulebook; Liberty is your freedom to learn without harassment; Equality ensures everyone gets the same respect and chances; Justice makes sure struggling students get extra support so everyone can thrive.',
  misconceptions: [
    {
      misconception: 'Sovereignty and Independence are identical synonyms.',
      correction: 'Independence is only the external face of sovereignty; sovereignty also includes internal supreme command over all persons and associations within the territory.',
    },
    {
      misconception: 'The Indian President is sovereign because all bills are signed in their name.',
      correction: 'The President is the titular head; real executive power is exercised by the Council of Ministers under Article 74, while popular sovereignty resides in "We, The People".',
    },
    {
      misconception: 'Reservations violate Article 14 (Equality before Law).',
      correction: 'Article 14 permits reasonable classification; treating unequals equally entrenches historical injustice. Protective discrimination realizes substantive equality.',
    },
    {
      misconception: 'Rawls’s Difference Principle demands equal income for everyone.',
      correction: 'Rawls allows socio-economic inequalities provided they maximize the benefit to the least advantaged and remain open under fair equality of opportunity.',
    },
    {
      misconception: 'Positive liberty and negative liberty are hostile opposites that cannot co-exist.',
      correction: 'They are complementary: negative liberty protects personal space against coercion, while positive liberty provides enabling schools, healthcare, and livelihood.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is NOT one of the six classical characteristics of sovereignty?',
      options: ['Permanence', 'Indivisibility', 'Divisibility', 'All-comprehensiveness'],
      correctIndex: 2,
    },
    {
      question: 'Which Article of the Indian Constitution enshrines Universal Adult Franchise?',
      options: ['Article 326', 'Article 14', 'Article 21', 'Article 368'],
      correctIndex: 0,
    },
    {
      question: 'What is an Ordinance under Articles 123/213?',
      options: ['A temporary law issued by the executive during legislative recess', 'A permanent constitutional amendment', 'An international treaty', 'A municipal tax receipt'],
      correctIndex: 0,
    },
    {
      question: 'Who coined the phrase "Veil of Ignorance" in modern political philosophy?',
      options: ['John Rawls', 'Amartya Sen', 'Isaiah Berlin', 'Harold Laski'],
      correctIndex: 0,
    },
    {
      question: 'Which source of law represents binding judicial precedents in India?',
      options: ['Article 141 (Supreme Court rulings)', 'Gram Panchayat resolutions', 'Presidential tweets', 'Election manifestos'],
      correctIndex: 0,
    },
    {
      question: 'Civil liberty is protected primarily under which part of the Indian Constitution?',
      options: ['Part III (Fundamental Rights)', 'Part IV (Directive Principles)', 'Part XII (Finance)', 'Schedule 7'],
      correctIndex: 0,
    },
    {
      question: 'Amartya Sen argues that poverty is best understood as:',
      options: ['Capability deprivation (unfreedoms)', 'Merely low statistical income', 'Lack of natural talent', 'Refusal to work'],
      correctIndex: 0,
    },
    {
      question: 'The abrogation of Article 370 in 2019 demonstrated India’s:',
      options: ['Internal and External Sovereignty', 'Surrender of parliamentary power', 'De-facto partition', 'Subjugation to foreign law'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Master the 10 syllabus nodes covering Sovereignty, Law, Liberty, Equality, and Justice through interactive simulations and NEP competency challenges.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The State Sovereignty Balancer',
    instruction: 'Adjust the Internal Authority and External Autonomy sliders. Observe how Monistic vs Pluralist state stability reacts.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_POL_011,
  },
  {
    title: '2. The 4 Kinds of Sovereignty Matrix',
    instruction: 'Click each quadrant to reveal how Titular/Real, Legal/Political, De-Jure/De-Facto, and Popular Sovereignty operate in India.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_POL_012,
  },
  {
    title: '3. The Hierarchy & Sources of Law Lab',
    instruction: 'Interact with the 7 Sources of Law and classify laws into Constitutional, Statute, Municipal, and Ordinance tiers.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_POL_014,
  },
  {
    title: '4. Negative vs Positive Liberty Beam',
    instruction: 'Toggle State Non-Interference (Negative) and Welfare Enablers (Positive). Observe citizen self-realisation output.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_POL_016,
  },
  {
    title: '5. Theories of Justice: Rawls vs Sen Explorer',
    instruction: 'Activate the "Veil of Ignorance" to view Rawls’s Difference Principle, then toggle Sen’s "Capability Expander".',
    interactionType: 'click-parts',
    nodeId: NODE_C11_POL_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the State only protects Negative Liberty (zero regulation, zero public schools/hospitals), what happens to poor citizens?',
    options: [
      'They enjoy complete flourishing because the state leaves them alone',
      'Their formal liberty remains hollow because they lack material capability and health to exercise choices',
      'They automatically achieve economic equality through market miracles',
      'They become sovereign rulers of their districts',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Positive Liberty slider to 0% and observe the capability index plummet on the simulator.',
    nodeId: NODE_C11_POL_016,
  },
  {
    question: 'Predict: Under John Rawls’s "Veil of Ignorance", if people do not know their wealth, caste, or health in advance, which distribution principle will they rationally select?',
    options: [
      'Maximum wealth for the smartest 5%',
      'The Difference Principle: inequalities are permitted only if they maximize benefit to the worst-off',
      'Total military authoritarianism',
      'Random lottery with no rights',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click the "Drop Veil of Ignorance" switch in the Justice Lab to verify how rational choice protects the least advantaged.',
    nodeId: NODE_C11_POL_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you notice when Legal Equality (Art 14) is combined with Substantive Social Equality (Art 15/17)?',
    observableOptions: [
      'The democratic stability gauge turns green and inclusive participation peaks',
      'Parliament loses its legislative authority',
      'Citizens refuse to cast votes',
      'The Constitution becomes null and void',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_POL_018,
  },
  {
    question: 'In the Austinian vs Pluralist diagram, what happens when pluralist associations (panchayats, trade unions, universities) are empowered?',
    observableOptions: [
      'Authority becomes decentralised and responsive, transforming absolute command into democratic coordination',
      'Society instantly collapses into total chaos',
      'The Supreme Court is permanently closed',
      'Only the armed forces remain active',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_POL_013,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitution Architect: Design a Republic Charter',
  description:
    'Select an Indian policy scenario (e.g., universal digital education, clean drinking water under Jal Jeevan, or reservation in local bodies). Write a 3-point charter identifying the relevant Sovereign authority, the Kind of Law required, and how Rawls’s Difference Principle & Sen’s Capability Approach justify the scheme.',
  steps: [
    'Choose a core socio-economic right (Education, Health, or Environmental Dignity)',
    'Identify the constitutional source (Statute Act vs Constitutional Amendment under Art 368)',
    'Explain how it expands Positive Liberty and achieves Substantive Justice for the least advantaged',
    'Share your analysis with your teacher or study peer group',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
function C11_PoliticalScienceSovereigntyMeaningDefinitionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_POL_011,
  title = DEFAULT_PROPS.title || 'Political Science Master Lab',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['polscience'] || {
    name: 'Political Science',
    emoji: '⚖️',
    color: 'emerald',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive hooks & predictions
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Exploration interactive states
  const [internalSovereignty, setInternalSovereignty] = useState(80);
  const [externalSovereignty, setExternalSovereignty] = useState(85);
  const [pluralistAutonomy, setPluralistAutonomy] = useState(65);
  const [selectedKindQuadrant, setSelectedKindQuadrant] = useState<string | null>('titular-real');
  const [negativeLibertyLevel, setNegativeLibertyLevel] = useState(70);
  const [positiveLibertyLevel, setPositiveLibertyLevel] = useState(60);
  const [veilActive, setVeilActive] = useState(false);
  const [senCapabilityFocus, setSenCapabilityFocus] = useState<'education' | 'health' | 'dignity'>('education');
  const [activeLawTab, setActiveLawTab] = useState<'sources' | 'kinds'>('sources');
  const [selectedSource, setSelectedSource] = useState<string>('custom');

  // Challenge execution state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Wrong option tracking for shake animation
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);

  // Drag & Sort & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking & active filters
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [selectedArticleModal, setSelectedArticleModal] = useState<string | null>(null);
  const [sandboxSliderA, setSandboxSliderA] = useState(50);
  const [sandboxSliderB, setSandboxSliderB] = useState(50);
  const [searchArticleQuery, setSearchArticleQuery] = useState('');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ──��
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

  // ─── ESCALATING HINTS CALLBACK ───
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
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step constitutional explanation.');
    }
  }, [hintCount, challenge]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    if (!isCorrect) {
      setWrongOptionIndex(idx);
      setTimeout(() => setWrongOptionIndex(null), 500);
    }
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Outstanding! The Preamble vests ultimate authority in We, The People.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Statecraft Exploration Lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Experiment freely in the Sandbox before starting the CISCE challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('celebration');
    speechManager.speak('Commencing the graded Political Science Challenges.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your reasoning.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 0;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Examine the gauges closely.');
  }, []);

  const handleQuadrantClick = useCallback((quadrant: string) => {
    setSelectedKindQuadrant(quadrant);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      'titular-real': 'The President is titular head under Article 53, while the Prime Minister wields real power under Article 74.',
      'legal-political': 'Parliament is the legal sovereign; the 642 million voters are the political sovereign.',
      'dejure-defacto': 'De-jure is lawful constitutional title; de-facto is actual administrative control on the ground.',
      'popular': 'Popular sovereignty is enshrined in the Preamble: We, The People of India.',
    };
    speechManager.speak(speechMap[quadrant] || '');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Political Science Master Simulation.');
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
    setWrongOptionIndex(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
        if (!isCorrect && typeof answer === 'number') {
          setWrongOptionIndex(answer);
          setTimeout(() => setWrongOptionIndex(null), 500);
        }
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
        speechManager.speak('Correct! Precise constitutional analysis.');
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
          speechManager.speak('Hints exhausted. Let us study the constitutional solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
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
      audioManager.play('tap');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base =
        prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge.sortItems]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts((prev) => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ─── 2D CANVAS ANIMATION (REQUESTANIMATIONFRAME) ───
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

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(0.5, '#047857');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const angle = Math.sin(frame * 0.04) * 0.15;
      const midX = canvas.width / 2;
      const midY = canvas.height / 2;

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;

      // Beam
      ctx.beginPath();
      ctx.moveTo(midX - 70 * Math.cos(angle), midY - 70 * Math.sin(angle));
      ctx.lineTo(midX + 70 * Math.cos(angle), midY + 70 * Math.sin(angle));
      ctx.stroke();

      // Fulcrum
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(midX, midY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Left pan (Liberty)
      const leftX = midX - 70 * Math.cos(angle);
      const leftY = midY - 70 * Math.sin(angle) + 20;
      ctx.beginPath();
      ctx.arc(leftX, leftY, 14, 0, Math.PI);
      ctx.stroke();

      // Right pan (Equality)
      const rightX = midX + 70 * Math.cos(angle);
      const rightY = midY + 70 * Math.sin(angle) + 20;
      ctx.beginPath();
      ctx.arc(rightX, rightY, 14, 0, Math.PI);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED REAL-TIME VALUES ───
  const stateStabilityScore = useMemo(() => {
    return Math.round((internalSovereignty * 0.4 + externalSovereignty * 0.3 + pluralistAutonomy * 0.3));
  }, [internalSovereignty, externalSovereignty, pluralistAutonomy]);

  const capabilityIndex = useMemo(() => {
    return Math.round((negativeLibertyLevel * 0.4 + positiveLibertyLevel * 0.6));
  }, [negativeLibertyLevel, positiveLibertyLevel]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-emerald-900/60 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.15 }}
            className="text-3xl p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-700/50 flex items-center justify-center"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                ISC Class 11 Political Theory
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={
                  'text-xs font-bold px-2.5 py-0.5 rounded-full border ' +
                  (difficulty === 'foundation'
                    ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-900/40 text-rose-300 border-rose-700'
                    : 'bg-amber-900/40 text-amber-300 border-amber-700')
                }
              >
                {difficulty.toUpperCase()}
              </motion.span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase badges */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') resetInactivityTimer();
                setPhase(p);
                audioManager.play('tap');
              }}
              className={
                'px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ' +
                (phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800')
              }
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800/40"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <span>🏛️</span> NARRATIVE CASE BRIEFING
              </div>
              <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </motion.div>

            {/* Interactive Discovery Hook Question */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Curiosity Discovery Challenge
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(i)}
                    aria-label={`Discovery option: ${opt}`}
                    className={
                      'p-4 rounded-xl text-left text-sm font-semibold transition-all border ' +
                      (discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 border-slate-700 hover:border-emerald-500 text-slate-200')
                    }
                  >
                    <span className="mr-2 text-emerald-400 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-emerald-950/40 rounded-xl border border-emerald-800"
                >
                  <p className="text-sm text-emerald-300 font-medium">
                    {discoveryCorrect
                      ? '✓ Brilliant insight! "We, The People" gives birth to all constitutional sovereign power.'
                      : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-950 transition-all flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: EXPLORE (5 BRILLIANT INTERACTIVE STEPS) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Step Selector Bar */}
            <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={
                    'py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ' +
                    (currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800')
                  }
                >
                  Step {idx + 1}
                </motion.button>
              ))}
            </div>

            {/* Step Card Container */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Interactive Simulation Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <p className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-800/60">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── STEP 1: SOVEREIGNTY BALANCER (SVG DIAGRAM 1) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    {/* SVG Diagram 1: Territory & Monistic vs Pluralist Sovereignty */}
                    <svg viewBox="0 0 450 280" className="w-full h-auto">
                      <rect
                        x="20"
                        y="20"
                        width="410"
                        height="240"
                        rx="16"
                        fill="#0f172a"
                        stroke="#059669"
                        strokeWidth={Math.max(1, (externalSovereignty / 100) * 4)}
                        strokeDasharray={externalSovereignty < 50 ? '6,6' : 'none'}
                      />
                      <text x="40" y="45" fill="#34d399" fontSize="12" fontWeight="bold">
                        SOVEREIGN REPUBLIC OF BHARAT (Territory)
                      </text>

                      {/* Monistic Central Command */}
                      <circle
                        cx="225"
                        cy="130"
                        r={Math.max(30, (internalSovereignty / 100) * 55)}
                        fill="#065f46"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <text x="225" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        Central Sovereign
                      </text>
                      <text x="225" y="142" textAnchor="middle" fill="#a7f3d0" fontSize="9">
                        Parliament (Art 368)
                      </text>

                      {/* Pluralist Associations */}
                      {[
                        { name: 'Panchayats (Art 243)', x: 90, y: 100, color: '#38bdf8' },
                        { name: 'Universities & Press', x: 360, y: 100, color: '#f59e0b' },
                        { name: 'Trade Unions', x: 100, y: 210, color: '#ec4899' },
                        { name: 'Minority Inst (Art 30)', x: 350, y: 210, color: '#a855f7' },
                      ].map((assoc, i) => (
                        <g key={i}>
                          <line
                            x1="225"
                            y1="130"
                            x2={assoc.x}
                            y2={assoc.y}
                            stroke={assoc.color}
                            strokeWidth={Math.max(1, (pluralistAutonomy / 100) * 3)}
                            strokeDasharray="4,4"
                          />
                          <circle cx={assoc.x} cy={assoc.y} r="24" fill="#1e293b" stroke={assoc.color} strokeWidth="2" />
                          <text x={assoc.x} y={assoc.y + 3} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
                            {assoc.name.split(' ')[0]}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 font-semibold mb-1">
                          <span>Internal Supremacy (Bodin/Austin):</span>
                          <span className="text-emerald-400">{internalSovereignty}%</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={100}
                          value={internalSovereignty}
                          onChange={(e) => setInternalSovereignty(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="Internal Sovereignty Slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 font-semibold mb-1">
                          <span>External Autonomy (No Foreign Control):</span>
                          <span className="text-emerald-400">{externalSovereignty}%</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={100}
                          value={externalSovereignty}
                          onChange={(e) => setExternalSovereignty(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="External Sovereignty Slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 font-semibold mb-1">
                          <span>Pluralist Associational Autonomy (Laski):</span>
                          <span className="text-sky-400">{pluralistAutonomy}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={pluralistAutonomy}
                          onChange={(e) => setPluralistAutonomy(Number(e.target.value))}
                          className="w-full accent-sky-500 cursor-pointer"
                          aria-label="Pluralist Autonomy Slider"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/80">
                      <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
                        <span>State Health & Stability Index:</span>
                        <span className="text-lg text-emerald-400">{stateStabilityScore}/100</span>
                      </div>
                      <p className="text-slate-300 text-xs mt-1.5">
                        {stateStabilityScore > 75
                          ? '✓ Balanced Democratic Republic: Strong constitutional framework with rich pluralist civil society.'
                          : '⚠️ Skewed State: High monism risks authoritarianism; low external autonomy threatens subjection.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: 4 KINDS OF SOVEREIGNTY MATRIX ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        id: 'titular-real',
                        title: 'Titular vs Real',
                        icon: '👑',
                        sub: 'President (Art 53) vs PM & Cabinet (Art 74)',
                        desc: 'The President signs in nominal title; the elected Council of Ministers commands real executive power.',
                      },
                      {
                        id: 'legal-political',
                        title: 'Legal vs Political',
                        icon: '🗳️',
                        sub: 'Parliament (Statutes) vs 642M Electorate',
                        desc: 'Parliament enacts legal command; the electorate holds political sovereignty to change governments every 5 years.',
                      },
                      {
                        id: 'dejure-defacto',
                        title: 'De-Jure vs De-Facto',
                        icon: '📜',
                        sub: 'Lawful Title vs Real Effective Control',
                        desc: 'De-jure has legal constitutional mandate; de-facto wields factual administration on ground.',
                      },
                      {
                        id: 'popular',
                        title: 'Popular Sovereignty',
                        icon: '🇮🇳',
                        sub: '"We, The People of India" (Preamble)',
                        desc: 'Ultimate bedrock of authority; decentralised through 73rd/74th Amendments to Gram Sabhas.',
                      },
                    ].map((quad) => (
                      <motion.div
                        key={quad.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuadrantClick(quad.id)}
                        className={
                          'p-4 rounded-2xl cursor-pointer border transition-all ' +
                          (selectedKindQuadrant === quad.id
                            ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700')
                        }
                      >
                        <span className="text-2xl">{quad.icon}</span>
                        <h3 className="text-sm font-bold text-white mt-2">{quad.title}</h3>
                        <p className="text-xs text-emerald-400 mt-0.5">{quad.sub}</p>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{quad.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <div>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">Live Case Study: </span>
                      {selectedKindQuadrant === 'titular-real' &&
                        '2024 Cabinet Formation: President assents, PM & NDA ministers take executive oaths.'}
                      {selectedKindQuadrant === 'legal-political' &&
                        '2024 Lok Sabha Elections: 642 million political sovereigns shape the 18th Parliament.'}
                      {selectedKindQuadrant === 'dejure-defacto' &&
                        'Integration of J&K: Parliament established full de-jure & de-facto constitutional jurisdiction.'}
                      {selectedKindQuadrant === 'popular' &&
                        'Gram Sabha Meetings: Village citizens directly scrutinize local panchayat works and budgets.'}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: SOURCES & HIERARCHY OF LAW (SVG DIAGRAM 2) ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* SVG Diagram 2: Constitutional Pyramid of Laws */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-emerald-400 mb-2">Constitutional Hierarchy of Legal Authority</p>
                      <svg viewBox="0 0 400 220" className="w-full h-auto">
                        {/* Tier 1 - Apex Constitution */}
                        <polygon points="200,15 270,60 130,60" fill="#047857" stroke="#10b981" strokeWidth="2" />
                        <text x="200" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                          CONSTITUTIONAL LAW (Art 13/368)
                        </text>

                        {/* Tier 2 - Statutes & Ordinances */}
                        <polygon points="125,66 275,66 315,115 85,115" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.5" />
                        <text x="200" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                          PARLIAMENTARY STATUTES & ORDINANCES (Art 123)
                        </text>

                        {/* Tier 3 - Subordinate & Municipal Law */}
                        <polygon points="80,121 320,121 355,165 45,165" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="200" y="146" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="bold">
                          DELEGATED LEGISLATION & MUNICIPAL BY-LAWS
                        </text>

                        {/* Tier 4 - Customary and Case Precedents */}
                        <polygon points="40,171 360,171 390,210 10,210" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="200" y="194" textAnchor="middle" fill="#a5b4fc" fontSize="8.5" fontWeight="bold">
                          CUSTOMARY LAW (Art 371A) & JUDICIAL PRECEDENTS (Art 141)
                        </text>
                      </svg>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => setActiveLawTab('sources')}
                          className={
                            'px-3 py-1 text-xs font-bold rounded-lg border ' +
                            (activeLawTab === 'sources'
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400')
                          }
                        >
                          7 Sources of Law
                        </button>
                        <button
                          onClick={() => setActiveLawTab('kinds')}
                          className={
                            'px-3 py-1 text-xs font-bold rounded-lg border ' +
                            (activeLawTab === 'kinds'
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400')
                          }
                        >
                          6 Kinds of Law
                        </button>
                      </div>

                      {activeLawTab === 'sources' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            { id: 'custom', name: 'Customs', ex: 'Naga customary law (Art 371A)' },
                            { id: 'precedent', name: 'Judicial Precedents', ex: 'Art 141; Kesavananda Bharati 1973' },
                            { id: 'statute', name: 'Legislation', ex: 'Parliament Acts (BNS 2024, RTE Act)' },
                            { id: 'equity', name: 'Equity & Fairness', ex: 'Clean hands doctrine & natural justice' },
                          ].map((src) => (
                            <div
                              key={src.id}
                              onClick={() => setSelectedSource(src.id)}
                              className={
                                'p-2.5 rounded-xl border cursor-pointer ' +
                                (selectedSource === src.id
                                  ? 'bg-emerald-950 border-emerald-500 text-white'
                                  : 'bg-slate-950 border-slate-800 text-slate-300')
                              }
                            >
                              <p className="font-bold text-emerald-400">{src.name}</p>
                              <p className="text-slate-400 text-[11px] mt-0.5">{src.ex}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {[
                            { title: 'Constitutional', note: 'Supreme yardstick (Art 13)' },
                            { title: 'Statute Law', note: 'Acts of Parliament' },
                            { title: 'Ordinances', note: 'Temporary orders (Art 123)' },
                            { title: 'Municipal Law', note: 'City & civic by-laws' },
                          ].map((k, i) => (
                            <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                              <p className="font-bold text-white">{k.title}</p>
                              <p className="text-emerald-400 text-[11px] mt-0.5">{k.note}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: NEGATIVE VS POSITIVE LIBERTY (SVG DIAGRAM 3) ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                        Predict-Then-Check Experiment
                      </p>
                      <p className="text-sm text-white font-medium mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            animate={predictionIndex === i && i !== PREDICTION_QUESTIONS[0].correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* SVG Diagram 3: Isaiah Berlin Two Concepts of Liberty Spectrum */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-sky-400 mb-2">Two Dimensions of Freedom (Berlin Spectrum)</p>
                      <svg viewBox="0 0 400 200" className="w-full h-auto">
                        {/* Negative Liberty Zone */}
                        <rect x="20" y="20" width="170" height="160" rx="12" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
                        <text x="105" y="45" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">
                          NEGATIVE LIBERTY
                        </text>
                        <text x="105" y="65" textAnchor="middle" fill="#99f6e4" fontSize="8">
                          "Freedom FROM" State Intrusion
                        </text>
                        {/* Shield icon */}
                        <path d="M 105 85 L 140 100 L 140 135 C 140 155 105 168 105 168 C 105 168 70 155 70 135 L 70 100 Z" fill="#134e4a" stroke="#2dd4bf" strokeWidth="2" />
                        <text x="105" y="132" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                          Privacy & Speech
                        </text>

                        {/* Positive Liberty Zone */}
                        <rect x="210" y="20" width="170" height="160" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                        <text x="295" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">
                          POSITIVE LIBERTY
                        </text>
                        <text x="295" y="65" textAnchor="middle" fill="#e0e7ff" fontSize="8">
                          "Freedom TO" Actualize Capacity
                        </text>
                        {/* Ladder / Stair icon */}
                        <rect x="260" y="145" width="70" height="15" rx="3" fill="#4338ca" />
                        <rect x="270" y="120" width="50" height="15" rx="3" fill="#6366f1" />
                        <rect x="280" y="95" width="30" height="15" rx="3" fill="#818cf8" />
                        <text x="295" y="106" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                          Edu / Health
                        </text>
                      </svg>
                    </div>

                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between font-bold text-slate-300 mb-1">
                            <span>Negative Liberty (Privacy & Non-Interference):</span>
                            <span className="text-teal-400">{negativeLibertyLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={negativeLibertyLevel}
                            onChange={(e) => setNegativeLibertyLevel(Number(e.target.value))}
                            className="w-full accent-teal-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between font-bold text-slate-300 mb-1">
                            <span>Positive Liberty (Welfare & Capabilities):</span>
                            <span className="text-indigo-400">{positiveLibertyLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={positiveLibertyLevel}
                            onChange={(e) => setPositiveLibertyLevel(Number(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-emerald-950/60 to-slate-950 rounded-xl border border-emerald-800/60">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                          Substantive Human Flourishing Index
                        </span>
                        <div className="text-2xl font-black text-white mt-0.5">{capabilityIndex}/100</div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full rounded-full"
                            animate={{ width: `${capabilityIndex}%` }}
                          />
                        </div>
                      </div>

                      {/* Live translation of the two liberties into concrete quantities */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                          <p className="text-[10px] text-slate-500">Daily choices free of state veto (of 20)</p>
                          <p className="font-mono font-bold text-teal-300">{Math.round((negativeLibertyLevel / 100) * 20)} choices</p>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                          <p className="text-[10px] text-slate-500">Citizens who can USE their freedom (of 100)</p>
                          <p className="font-mono font-bold text-indigo-300">{positiveLibertyLevel} / 100 citizens</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Misconception killer: liberty is not one thing. At 100% negative liberty nobody pays tax — so no
                        school or clinic, and positive liberty collapses to 0. A pandemic lockdown trades negative liberty
                        (stay home) to protect positive liberty (the right to live). Try 100/0 vs 50/80 and compare indices.
                      </p>
                      <button
                        onClick={() => { setNegativeLibertyLevel(70); setPositiveLibertyLevel(60); }}
                        aria-label="Reset liberty sliders"
                        className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 self-start"
                      >
                        ↺ Reset liberty (70% / 60%)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5: RAWLS VS SEN THEORIES OF JUSTICE ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* John Rawls Card */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-indigo-900/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        John Rawls (A Theory of Justice)
                      </span>
                      <button
                        onClick={() => {
                          setVeilActive(!veilActive);
                          audioManager.play('pop');
                        }}
                        className={
                          'px-3 py-1 text-xs font-bold rounded-lg border ' +
                          (veilActive ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300')
                        }
                      >
                        {veilActive ? 'Veil of Ignorance: ACTIVE' : 'Toggle Veil of Ignorance'}
                      </button>
                    </div>

                    <p className="text-xs text-slate-300">
                      <strong>Original Position:</strong> Rational deliberators decide rules without knowing their caste, wealth, gender, or talents.
                    </p>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <p className="text-indigo-300 font-bold">1. Liberty Principle:</p>
                      <p className="text-slate-400">Equal basic liberties for all (lexical priority over wealth).</p>
                      <p className="text-indigo-300 font-bold">2. Difference Principle:</p>
                      <p className="text-slate-400">
                        Inequalities permitted ONLY if they work to the maximum benefit of the least advantaged (e.g., MGNREGA / EWS / SC-ST provisions).
                      </p>
                    </div>
                  </div>

                  {/* Amartya Sen Card */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-900/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Amartya Sen (The Idea of Justice)
                    </span>
                    <p className="text-xs text-slate-300">
                      <strong>Capability Approach:</strong> Justice is comparative ("Nyaya") rather than ideal institutional design ("Niti"). It focuses on expanding real substantive freedoms to achieve valued functionings.
                    </p>

                    <div className="flex gap-2">
                      {(['education', 'health', 'dignity'] as const).map((cap) => (
                        <button
                          key={cap}
                          onClick={() => {
                            setSenCapabilityFocus(cap);
                            audioManager.play('tap');
                          }}
                          className={
                            'px-3 py-1 text-xs font-bold rounded-lg capitalize border ' +
                            (senCapabilityFocus === cap
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400')
                          }
                        >
                          {cap}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      {senCapabilityFocus === 'education' && (
                        <p className="text-emerald-300">
                          RTE Act 2009 & NEP 2020: Removing the unfreedom of illiteracy so children convert knowledge into real life opportunities.
                        </p>
                      )}
                      {senCapabilityFocus === 'health' && (
                        <p className="text-emerald-300">
                          Mid-Day Meals & Ayushman Bharat: Eliminating stunting and disease so citizens have the bodily capability to work and learn.
                        </p>
                      )}
                      {senCapabilityFocus === 'dignity' && (
                        <p className="text-emerald-300">
                          Article 17 & Women’s 33% Panchayat Reservation: Eradicating social unfreedoms and caste stigma to ensure equal public voice.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Step
                </motion.button>

                <span className="text-xs text-slate-400 font-bold">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-sky-600 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Open Free Play Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Ungraded Exploration Laboratory
                </span>
                <h2 className="text-2xl font-black text-white">Constitutional Sandbox & Article Explorer</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Ready for CISCE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interactive Balance Canvas */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-slate-300 mb-2">Live 2D Scales of Justice Simulator</p>
                <canvas ref={canvasRef} width={380} height={140} className="w-full h-auto rounded-lg border border-slate-900" />
                <p className="text-xs text-slate-400 mt-2 text-center">
                  Balancing Liberty (Negative/Positive) with Equality (Legal, Social, Political, Economic).
                </p>
              </div>

              {/* Constitutional Article Quick Finder */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-300">Constitutional Articles Reference</p>
                  <input
                    type="text"
                    placeholder="Search e.g. 14, 21, 326..."
                    value={searchArticleQuery}
                    onChange={(e) => setSearchArticleQuery(e.target.value)}
                    className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
                  {[
                    { art: 'Preamble', desc: 'SOVEREIGN Socialist Secular Democratic Republic; Justice, Liberty, Equality, Fraternity' },
                    { art: 'Article 13', desc: 'Laws inconsistent with or in derogation of fundamental rights are void' },
                    { art: 'Article 14', desc: 'Equality before Law & Equal Protection of Laws' },
                    { art: 'Article 15(4)', desc: 'Special provisions for advancement of socially & educationally backward classes' },
                    { art: 'Article 17', desc: 'Abolition of Untouchability in any form' },
                    { art: 'Article 19', desc: 'Six Basic Freedoms subject to reasonable restrictions' },
                    { art: 'Article 21', desc: 'Protection of Life and Personal Liberty (Puttaswamy privacy, dignity)' },
                    { art: 'Article 21A', desc: 'Right to Free & Compulsory Education (6-14 yrs)' },
                    { art: 'Article 123', desc: 'President’s power to promulgate Ordinances during recess' },
                    { art: 'Article 141', desc: 'Law declared by Supreme Court binding on all courts' },
                    { art: 'Article 326', desc: 'Universal Adult Suffrage (one person, one vote, one value)' },
                    { art: 'Article 368', desc: 'Power of Parliament to amend the Constitution (Basic Structure limits)' },
                    { art: 'Article 371A', desc: 'Special constitutional protection for Naga customary laws and land' },
                  ]
                    .filter((item) => item.art.toLowerCase().includes(searchArticleQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchArticleQuery.toLowerCase()))
                    .map((item, idx) => (
                      <div key={idx} className="p-2 bg-slate-900/80 rounded-lg border border-slate-800/60">
                        <span className="font-bold text-emerald-400 mr-2">{item.art}:</span>
                        <span className="text-slate-300">{item.desc}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Competency: {challenge.competencyLevel.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={
                'p-6 rounded-2xl border transition-colors ' +
                (wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800')
              }
            >
              <h2 className="text-lg font-bold text-white leading-relaxed mb-6">{challenge.question}</h2>

              {/* 1. MCQ OPTIONS WITH SHAKE ANIMATION ON WRONG ANSWER BUTTONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="space-y-3">
                    {challenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={answerRevealed || showExplanation}
                        onClick={() => handleAnswer(i)}
                        className={
                          'w-full text-left p-4 rounded-xl text-sm font-semibold border transition-all ' +
                          (showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 shadow-md'
                            : wrongOptionIndex === i
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500 text-slate-200')
                        }
                      >
                        <span className="mr-3 text-emerald-400 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* 2. DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'zone_apex', title: 'Apex Constitutional Law' },
                      { id: 'zone_parliament', title: 'Parliamentary Statute' },
                      { id: 'zone_local', title: 'Local Municipal By-Law' },
                      { id: 'zone_executive', title: 'Temporary Ordinance' },
                    ].map((slot) => (
                      <div
                        key={slot.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(slot.id)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[100px] text-center"
                      >
                        <span className="text-xs text-slate-400 font-semibold mb-2">{slot.title}</span>
                        <span className="text-xs font-bold text-emerald-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          {droppedLabels[slot.id] || 'Drop Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Validate Classification →
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag items to rearrange into the proper sequential order:</p>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{idx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-sm">↕</span>
                    </motion.div>
                  ))}

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md mt-2"
                  >
                    Check Order →
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC INPUT */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter number..."
                      className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-bold w-44 focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Submit Answer →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-amber-300">{challenge.validationHint}</p>

                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConstructAdd(part)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 bg-emerald-950 border border-emerald-700 rounded-lg text-xs font-bold text-emerald-200 flex items-center gap-2"
                      >
                        <span>{i + 1}. {part}</span>
                        <button onClick={() => handleConstructRemove(i)} className="text-rose-400 hover:text-rose-300 font-bold">
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click blocks above to assemble the priority order...</span>
                    )}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Verify Construction →
                  </motion.button>
                </div>
              )}

              {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-emerald-950/40 rounded-xl border border-emerald-700/60 space-y-3"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step-by-Step Constitutional Breakdown
                  </p>

                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400">{idx + 1}.</span>{' '}
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps <
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    )}

                    {revealedSteps >=
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg ml-auto"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length
                          ? 'Finish Simulation →'
                          : 'Next CISCE Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETE ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl inline-block"
              >
                🎓
              </motion.div>
              <h2 className="text-3xl font-black text-white">Political Science Mastery Achieved!</h2>
              <div className="flex justify-center items-center gap-6 text-sm font-bold">
                <span className="text-emerald-400">Score: {Math.max(0, 100 - errors * 5)}%</span>
                <span className="text-slate-400">|</span>
                <span className="text-sky-400">Mastery: {masteryLevel.toUpperCase()}</span>
                <span className="text-slate-400">|</span>
                <span className="text-amber-400">Errors: {errors}</span>
              </div>

              <p className="text-slate-200 text-sm max-w-2xl mx-auto leading-relaxed">
                {errors === 0
                  ? 'PERFECT SCORE! You have mastered all 10 syllabus nodes covering Sovereignty, Law, Liberty, Equality, and Justice.'
                  : errors <= 3
                  ? 'Great performance! You possess strong conceptual clarity. Review your misconception profile below.'
                  : 'Good effort! Review the specific misconception corrections below and re-test to achieve complete mastery.'}
              </p>
            </div>

            {/* Misconception Review Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> Your Conceptual Remediation Profile:
                </h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-semibold">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spaced Repetition Schedule */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-amber-400">Spaced Repetition Schedule (SM-2):</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Based on your performance, this topic is scheduled for review in{' '}
                  <strong className="text-amber-300">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </strong>
                  .
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700"
              >
                Re-Explore Labs ↺
              </motion.button>
            </div>

            {/* Real World Activity Arc */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-400 border border-slate-800/80">
                    <span className="text-emerald-400 font-bold mr-1.5">{idx + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PoliticalScienceSovereigntyMeaningDefinitionSim;