'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_HISTCIV_051 = 'c7_histciv_051';
const NODE_C7_HISTCIV_052 = 'c7_histciv_052';
const NODE_C7_HISTCIV_053 = 'c7_histciv_053';
const NODE_C7_HISTCIV_054 = 'c7_histciv_054';
const NODE_C7_HISTCIV_055 = 'c7_histciv_055';
const NODE_C7_HISTCIV_056 = 'c7_histciv_056';
const NODE_C7_HISTCIV_057 = 'c7_histciv_057';
const NODE_C7_HISTCIV_058 = 'c7_histciv_058';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_051,
  NODE_C7_HISTCIV_052,
  NODE_C7_HISTCIV_053,
  NODE_C7_HISTCIV_054,
  NODE_C7_HISTCIV_055,
  NODE_C7_HISTCIV_056,
  NODE_C7_HISTCIV_057,
  NODE_C7_HISTCIV_058,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Constitution & Welfare Blueprint',
  intro: 'You are appointed as a Youth Legal Scholar assisting the Parliamentary Legislative Research Wing in New Delhi. A delegation of international students wants to understand how India transformed from an ancient empire with Ashoka’s Dhamma into a modern Sovereign Socialist Secular Democratic Republic committed to Justice, Liberty, Equality, and Fraternity.',
  context: 'Your task is to explore how the Preamble, the Fundamental Rights (Part III), the Directive Principles of State Policy (Part IV), and welfare legislation (MNREGA, RTE Act, Swachh Bharat) work together as a living constitutional architecture to build a vibrant Welfare State.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1950, India enforced its Constitution. Suppose the government fails to provide a citizen with a promised living wage or employment. Can that citizen immediately sue the government in the Supreme Court to force compliance under the Directive Principles (Part IV)?',
  options: [
    'Yes — all parts of the Constitution are equally enforceable in court.',
    'No — Directive Principles are non-justiciable under Article 37, yet fundamental to governance.',
    'Yes — but only if they file a petition in a local Gram Panchayat.',
    'No — the Constitution does not mention welfare or living wages at all.',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry! We are going to explore why Dr Ambedkar and the framers designed Part III as justiciable rights and Part IV as non-justiciable directives for a growing welfare state.',
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

// ─── CHALLENGES ARRAY (24 total: 8 foundation, 8 standard, 8 advanced) ───
const CHALLENGES: Challenge[] = [
  // ─── FOUNDATION TIER (1-8) ───
  {
    id: 'ch_f01',
    nodeId: NODE_C7_HISTCIV_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which constitutional Article expressly abolishes "Untouchability" and forbids its practice in any form, advancing Social Justice?',
    options: ['Article 14', 'Article 17', 'Article 19', 'Article 21'],
    correctIndex: 1,
    explanation: 'Article 17 abolishes untouchability and makes its practice in any form an offence punishable under law. This is a foundational pillar of social justice in India.',
    hints: [
      'Think about the specific provision in Part III dealing with untouchability.',
      'It comes right after Article 16 (equality of opportunity in public employment).',
      'Article 17 explicitly declares the abolition of untouchability.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C7_HISTCIV_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On which historical date did the Constitution of India formally come into force (enforcement), marking Republic Day?',
    options: ['15 August 1947', '26 November 1949', '26 January 1950', '24 January 1950'],
    correctIndex: 2,
    explanation: 'The Constitution was adopted on 26 November 1949 and came into full legal force (enforcement) on 26 January 1950, chosen to honour the 1930 Purna Swaraj declaration.',
    hints: [
      'Do not confuse the date of adoption with the date of enforcement.',
      'Adoption occurred in November 1949, but enforcement was celebrated in January 1950.',
      'Republic Day is celebrated every year on 26 January.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C7_HISTCIV_053,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary difference between a "Police State" and a "Welfare State"?',
    options: [
      'A police state provides free schools, while a welfare state relies only on private charities.',
      'A police state only maintains law, order, and border security; a welfare state actively secures social and economic well-being for all.',
      'A police state does not have police officers, whereas a welfare state has only doctors.',
      'A welfare state only cares about the rich, while a police state serves the poor.',
    ],
    correctIndex: 1,
    explanation: 'A police state restricts itself to maintaining order and defence. A welfare state retains the law and order function and adds the positive duty to provide healthcare, education, livelihood, and social security.',
    hints: [
      'Look at the active social responsibilities undertaken by a welfare government.',
      'A police state is minimal and passive toward citizen well-being.',
      'A welfare state actively guarantees public health, education, and social security.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C7_HISTCIV_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'From which country’s 1937 Constitution did the framers of the Indian Constitution borrow the concept of Directive Principles of State Policy (Part IV)?',
    options: ['United States of America', 'United Kingdom', 'Irish Constitution (Ireland)', 'Soviet Union'],
    correctIndex: 2,
    explanation: 'The Directive Principles in Part IV (Articles 36-51) were borrowed from Article 45 of the 1937 Irish Constitution (which had drawn from Spain).',
    hints: [
      'It is a European island republic that fought for independence.',
      'The US gave us Fundamental Rights; this nation gave us Directive Principles.',
      'Ireland (Irish Constitution of 1937) is the correct source.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C7_HISTCIV_055,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which constitutional Article directs the State to secure "equal pay for equal work for both men and women"?',
    options: ['Article 38', 'Article 39(d)', 'Article 42', 'Article 48'],
    correctIndex: 1,
    explanation: 'Article 39(d) specifically directs that there is equal pay for equal work for both men and women, implemented through the Equal Remuneration Act, 1976.',
    hints: [
      'Look at Article 39 sub-clauses.',
      'Sub-clause (a) is adequate livelihood; sub-clause (d) is equal pay for equal work.',
      'Article 39(d) is the exact provision.',
    ],
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C7_HISTCIV_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Gandhian Directive Principle directs the state to organise Village Panchayats as units of local self-government?',
    options: ['Article 40', 'Article 43', 'Article 47', 'Article 48'],
    correctIndex: 0,
    explanation: 'Article 40 directs the state to organise village panchayats. This was later given constitutional status and teeth via the 73rd Constitutional Amendment Act in 1992.',
    hints: [
      'It is the foundational Article for grassroots democracy and Gram Swaraj.',
      'It starts the cluster of Gandhian provisions.',
      'Article 40 is the mandate for village panchayats.',
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C7_HISTCIV_057,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Fundamental Rights called "justiciable" whereas Directive Principles are "non-justiciable"?',
    options: [
      'Fundamental Rights can be enforced in courts under Article 32/226; Directive Principles cannot be directly sued upon under Article 37.',
      'Directive Principles can send people to prison, while Fundamental Rights are just moral advice.',
      'Fundamental Rights are written in English, while Directive Principles are in Hindi.',
      'There is no difference; both can be challenged equally in any civil court.',
    ],
    correctIndex: 0,
    explanation: 'Article 32 & 226 make Fundamental Rights enforceable by judicial writs. Article 37 expressly states that Directive Principles shall not be enforceable by any court of law.',
    hints: [
      'Think about whether a citizen can file a writ petition in court.',
      'Justiciable means courts have jurisdiction to compel immediate enforcement.',
      'Part III is justiciable; Part IV is non-justiciable per Article 37.',
    ],
  },
  {
    id: 'ch_f08',
    nodeId: NODE_C7_HISTCIV_058,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which ancient Indian edicts record Emperor Ashoka establishing botanical gardens, wells, rest-houses, and hospitals for humans and animals?',
    options: [
      'Rock Edict II and Pillar Edict VII',
      'Kalinga War Rock Edict XIII only',
      'Allahabad Pillar Inscription of Samudragupta',
      'Iron Pillar of Mehrauli',
    ],
    correctIndex: 0,
    explanation: 'Rock Edict II and Pillar Edict VII document Ashoka’s comprehensive welfare measures, including medical care for humans and animals, shade trees, and wells.',
    hints: [
      'Look for the Mauryan edicts detailing Dhamma welfare measures.',
      'Rock Edict II specifically mentions human and animal medicine.',
      'Rock Edict II and Pillar Edict VII are the key sources.',
    ],
  },

  // ─── STANDARD TIER (9-16) ───
  {
    id: 'ch_s01',
    nodeId: NODE_C7_HISTCIV_051,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each Preamble Objective to its constitutional implementing Article or mechanism.',
    dragItems: [
      { label: 'Social Justice', targetId: 'slot_soc_just' },
      { label: 'Political Justice', targetId: 'slot_pol_just' },
      { label: 'Liberty of Speech', targetId: 'slot_lib_speech' },
      { label: 'Equality of Opportunity', targetId: 'slot_eq_opp' },
    ],
    correctMapping: {
      slot_soc_just: 'Social Justice',
      slot_pol_just: 'Political Justice',
      slot_lib_speech: 'Liberty of Speech',
      slot_eq_opp: 'Equality of Opportunity',
    },
    explanation: 'Social Justice is backed by Art 17 (untouchability ban), Political Justice by Art 326 (universal adult franchise), Liberty of Speech by Art 19(1)(a), and Equality of Opportunity by Art 16.',
    hints: [
      'Social justice eliminates caste discrimination (Article 17).',
      'Political justice gives voting power to all adults (Article 326).',
      'Liberty guarantees expression (Article 19), while Article 16 gives equal public employment opportunities.',
    ],
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C7_HISTCIV_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The 42nd Constitutional Amendment Act of 1976 is often termed a "Mini-Constitution". Which three crucial words did it add to the Preamble?',
    options: [
      'Democratic, Sovereign, Republic',
      'Socialist, Secular, Integrity',
      'Justice, Liberty, Equality',
      'Federal, Parliamentary, Unitary',
    ],
    correctIndex: 1,
    explanation: 'The 42nd Amendment of 1976 inserted the words "Socialist", "Secular", and changed "unity of the Nation" to "unity and Integrity of the Nation".',
    hints: [
      'These words were added in 1976 during the Emergency.',
      'One relates to state-guided economy, one to religious neutrality, one to national unity.',
      'Socialist, Secular, and Integrity are the three terms.',
    ],
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C7_HISTCIV_055,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does a "Living Wage" (Article 43) fundamentally differ from a statutory "Minimum Wage" (Minimum Wages Act, 1948)?',
    options: [
      'A minimum wage provides luxury goods; a living wage only buys raw bread.',
      'A minimum wage is the legally enforceable floor preventing bare exploitation; a living wage is a higher aspirational standard ensuring food, shelter, clothing, education, health, and dignity.',
      'There is no distinction; they are two synonyms in Indian labour law.',
      'Minimum wage applies only to foreign multinational workers; living wage applies to farmers.',
    ],
    correctIndex: 1,
    explanation: 'A minimum wage is the strict legal floor below which no employer may pay. A living wage (Article 43) is an aspirational benchmark providing a decent standard of life, social opportunities, and security for a worker’s family.',
    hints: [
      'Think about survival subsistence vs a dignified, comfortable life.',
      'The minimum wage is the statutory baseline enforced by labour inspectors.',
      'The living wage under Article 43 includes education, healthcare, and leisure.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C7_HISTCIV_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are Articles 40, 43, 46, 47, and 48 designated as "Gandhian Principles" in constitutional jurisprudence?',
    options: [
      'Because Mahatma Gandhi personally drafted these five Articles before 1947.',
      'Because they embody Gandhi’s social and economic philosophy (Gram Swaraj, khadi, Harijan uplift, prohibition, cattle protection) embedded by the Constituent Assembly.',
      'Because only citizens following Gandhian ashram rules are bound to obey them.',
      'Because they were enacted as a special treaty with the British Viceroy.',
    ],
    correctIndex: 1,
    explanation: 'Gandhi was assassinated in Jan 1948 and did not draft the Constitution. The Constituent Assembly, chaired by Dr Rajendra Prasad, incorporated his philosophies into Part IV as an enduring tribute.',
    hints: [
      'Did Gandhi draft the Constitution himself, or did the Assembly incorporate his ideas?',
      'Remember Gandhi was assassinated on 30 January 1948, before adoption in Nov 1949.',
      'They reflect his core philosophy, not his direct penmanship.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C7_HISTCIV_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 2002, the 86th Constitutional Amendment made a historic shift regarding education. What did it accomplish?',
    options: [
      'It abolished all government primary schools.',
      'It transferred free and compulsory education for children (6-14 years) from a non-justiciable Directive Principle (Article 45) to an enforceable Fundamental Right (Article 21A).',
      'It made college education completely free for everyone across the world.',
      'It removed education from state control and handed it to private corporations.',
    ],
    correctIndex: 1,
    explanation: 'The 86th Amendment inserted Article 21A, creating an enforceable Fundamental Right to free and compulsory education for ages 6–14, later operationalised by the RTE Act, 2009.',
    hints: [
      'Look for the upgrade from Part IV directive to Part III fundamental right.',
      'Article 21A is the right to education.',
      'It converted an aspirational goal in Article 45 into an enforceable right in Article 21A.',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C7_HISTCIV_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Mahatma Gandhi National Rural Employment Guarantee Act (MNREGA 2005), how many guaranteed days of wage employment per financial year are legally guaranteed to every rural household demanding unskilled manual work?',
    correctAnswer: 100,
    tolerance: 0,
    unit: 'days',
    explanation: 'MNREGA guarantees exactly 100 days of wage employment per financial year to every rural household whose adult members volunteer for unskilled manual labour.',
    hints: [
      'It is a round century number of days.',
      'It represents approximately three and a half months of guaranteed wage work.',
      'The number is exactly 100.',
    ],
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C7_HISTCIV_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the landmark Minerva Mills case (1980), how did the Supreme Court describe the relationship between Fundamental Rights and Directive Principles?',
    options: [
      'Directive Principles completely abolish Fundamental Rights during peacetime.',
      'Fundamental Rights and Directive Principles are like the two wheels of a chariot, forming a harmonious balance where neither destroys the other.',
      'Fundamental Rights are solely for the wealthy, while Directive Principles are for rural farmers.',
      'Directive Principles must be completely deleted from the Constitution.',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court held that the Constitution is founded on the bedrock of the balance between Parts III and IV. Like two wheels of a chariot, they work together in harmony.',
    hints: [
      'Look for the famous metaphor of harmony and mutual balance.',
      'Neither part is superior to the point of destroying the other.',
      'They are the two wheels of the constitutional chariot.',
    ],
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C7_HISTCIV_058,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'What is the most fundamental difference in the "BASIS" between Ashoka’s Dhamma welfare activities and modern Indian welfare schemes (MNREGA, RTE)?',
    options: [
      'Ashoka built hospitals with cement, whereas modern India only uses bricks.',
      'Ashoka’s welfare was ruler-driven, flowing from personal moral duty (Dhamma); modern welfare is rights-based and law-based, backed by constitutional directives and enforceable statutes.',
      'Ashoka provided welfare only to royal ministers, whereas modern welfare excludes children.',
      'There is no conceptual difference; Ashoka had a written parliamentary constitution.',
    ],
    correctIndex: 1,
    explanation: 'Ashoka acted out of personal Buddhist moral conviction (Dhamma) which could lapse under subsequent rulers. Modern Indian welfare is rooted in constitutional law, creating legal entitlements citizens can demand.',
    hints: [
      'Focus on the shift from a monarch’s moral charity to a citizen’s constitutional right.',
      'Could an ancient Mauryan citizen file a court case if a well was not dug?',
      'Modern welfare is rights-based and legal; Ashoka’s was moral and ruler-driven.',
    ],
    misconceptionIndex: 2,
  },

  // ─── ADVANCED TIER (17-24) ───
  {
    id: 'ch_a01',
    nodeId: NODE_C7_HISTCIV_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Maneka Gandhi v. Union of India (1978), the Supreme Court established the "Golden Triangle" doctrine. Which three Articles form this indivisible triangle?',
    options: [
      'Articles 14 (Equality), 19 (Freedoms/Liberty), and 21 (Life & Dignity)',
      'Articles 32 (Remedies), 226 (High Courts), and 368 (Amendments)',
      'Articles 38 (Social Order), 39 (Livelihood), and 40 (Panchayats)',
      'Articles 52 (President), 74 (Cabinet), and 75 (Prime Minister)',
    ],
    correctIndex: 0,
    explanation: 'The Golden Triangle connects Articles 14, 19, and 21. Any law restricting personal liberty must be just, fair, and reasonable, satisfying equality, freedom, and human dignity simultaneously.',
    hints: [
      'It links Equality, Liberty, and Life/Dignity.',
      'The Articles are consecutive numbers in Part III between 14 and 21.',
      'Articles 14, 19, and 21 constitute the Golden Triangle.',
    ],
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C7_HISTCIV_052,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the historical milestones of India’s constitutional evolution in chronological order.',
    sortItems: [
      'INC Lahore Session adopts Purna Swaraj declaration (26 Jan 1930)',
      'Constituent Assembly formally adopts the Constitution (26 Nov 1949)',
      'Dr Rajendra Prasad elected first President of India (24 Jan 1950)',
      'Constitution of India comes into full legal enforcement (26 Jan 1950)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1930 Purna Swaraj resolution inspired the 26 January date. The text was adopted 26 Nov 1949, Dr Prasad was elected 24 Jan 1950, and full enforcement began 26 Jan 1950.',
    hints: [
      'Purna Swaraj came first during the freedom struggle in 1930.',
      'Adoption happened late 1949; the President was elected two days before enforcement.',
      'Order: 1930 Purna Swaraj → Nov 1949 Adoption → 24 Jan 1950 Election → 26 Jan 1950 Enforcement.',
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C7_HISTCIV_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What crucial constitutional principle was established by the Supreme Court’s 7–6 majority in Kesavananda Bharati v. State of Kerala (1973)?',
    options: [
      'Parliament has absolute, unlimited power to abolish the Republic and remove elections.',
      'Parliament can amend provisions under Article 368, but cannot alter or destroy the "Basic Structure" of the Constitution.',
      'The Preamble is not a part of the Constitution and can be discarded.',
      'Fundamental Rights are completely subservient to ordinary municipal bylaws.',
    ],
    correctIndex: 1,
    explanation: 'The Basic Structure doctrine prevents Parliament from destroying core features such as secularism, democracy, the rule of law, federalism, and judicial review, keeping the Constitution a living yet protected document.',
    hints: [
      'Think about the judicial check on Parliament’s amendment powers.',
      'It preserves the foundational identity of the Republic.',
      'The "Basic Structure" cannot be amended away.',
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C7_HISTCIV_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A textile mill in Surat pays female spinning operators ₹350/day and male spinning operators ₹500/day for identical 8-hour shifts on identical machines. Which legal and constitutional remedy directly applies?',
    options: [
      'No remedy exists because private factory owners have absolute discretion over wages.',
      'Violation of Article 39(d) and the Equal Remuneration Act, 1976; workers can seek enforcement and back-pay via the Labour Court and High Court.',
      'Only Article 48 regarding animal breeds.',
      'The female workers can only ask for charity from local welfare trusts.',
    ],
    correctIndex: 1,
    explanation: 'Unequal pay for the same work based on gender directly violates Article 39(d) and violates the Equal Remuneration Act, 1976. Under Randhir Singh (1982), equal pay for equal work is enforceable when codified into statutory law.',
    hints: [
      'Check which specific directive principle prohibits wage discrimination for the same work.',
      'The Equal Remuneration Act 1976 was enacted to enforce Article 39(d).',
      'The Labour Court and constitutional courts enforce the Equal Remuneration Act.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C7_HISTCIV_056,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did the 73rd and 74th Constitutional Amendment Acts of 1992 revolutionise the implementation of Gandhian Article 40?',
    options: [
      'They dissolved all village councils and centralised power in New Delhi.',
      'They added Parts IX & IX-A to the Constitution, conferring constitutional status on Panchayats and Municipalities with mandatory 5-year elections and reservations for SC/ST and women.',
      'They banned village trade and mandated all citizens move to metropolitan cities.',
      'They replaced local panchayats with foreign commercial companies.',
    ],
    correctIndex: 1,
    explanation: 'The 73rd and 74th Amendments gave constitutional teeth to Article 40 (Gram Swaraj), mandating regular elections, State Election Commissions, State Finance Commissions, and at least 33% reservation for women.',
    hints: [
      'Look for the amendments that formalised three-tier local governance.',
      'They gave constitutional permanence to Panchayati Raj and Municipalities.',
      'They inserted Parts IX and IX-A with mandatory local elections and affirmative action.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C7_HISTCIV_057,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the constitutional pathway showing how a non-justiciable Directive Principle becomes an enforceable right for citizens.',
    availableParts: [
      'Directive Principle in Part IV (Art 45)',
      'Constitutional Amendment (86th Amend 2002)',
      'Fundamental Right in Part III (Art 21A)',
      'Parliamentary Statute (RTE Act 2009)',
      'Citizen Enforceability in High/Supreme Court',
    ],
    targetState: 'Directive Principle in Part IV (Art 45) Constitutional Amendment (86th Amend 2002) Fundamental Right in Part III (Art 21A) Parliamentary Statute (RTE Act 2009) Citizen Enforceability in High/Supreme Court',
    validationHint: 'Assemble all 5 components in logical order from Part IV directive to full judicial enforceability.',
    explanation: 'Education began as an aspirational directive in Art 45, was upgraded to Art 21A by the 86th Amendment, given statutory mechanics by the RTE Act 2009, and is now fully enforceable by courts.',
    hints: [
      'Start with the initial directive in Part IV (Article 45).',
      'Next is the 86th Amendment creating Article 21A in Part III.',
      'Then Parliament passes the RTE Act 2009, enabling citizens to enforce it in court.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C7_HISTCIV_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under MNREGA 2005, what is the crucial role of the "Social Audit" conducted by the Gram Sabha?',
    options: [
      'It is an entertainment dance program held during harvest.',
      'It empowers villagers to scrutinise muster rolls, physical assets, and bank payments, providing grassroots accountability and exposing wage corruption.',
      'It allows government contractors to secretly inflate project expenses without public oversight.',
      'It conducts military drills for village youth.',
    ],
    correctIndex: 1,
    explanation: 'Social audit by the Gram Sabha is a pioneering citizen-oversight mechanism under Section 17 of MNREGA that verifies records against on-ground reality, ensuring transparency and reducing corruption.',
    hints: [
      'Think about citizen oversight over public funds and employment rolls.',
      'It allows village residents to cross-check whether listed workers actually received wages.',
      'Social audits provide democratic accountability at the village level.',
    ],
  },
  {
    id: 'ch_a08',
    nodeId: NODE_C7_HISTCIV_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A state government passes an executive order forbidding members of a specific minority community from purchasing property or starting businesses in town. Which constitutional provisions does this order directly violate?',
    options: [
      'Only Article 48 regarding animal breeds.',
      'Article 14 (Equality before Law), Article 15 (Non-discrimination), Article 19(1)(g) (Right to Practice Profession/Trade), and the Preamble’s promise of Fraternity and Dignity.',
      'Only the Motor Vehicles Act.',
      'No provisions, because executive orders are above the Constitution.',
    ],
    correctIndex: 1,
    explanation: 'Targeted discrimination violates equality (Art 14), non-discrimination (Art 15), freedom of trade and residence (Art 19), and fractures the Preamble’s commitment to Fraternity assuring individual dignity.',
    hints: [
      'Consider the fundamental rights protecting equality and free trade.',
      'It violates multiple rights in Part III and the Preamble objectives.',
      'Articles 14, 15, 19, and the Preamble are breached.',
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
  nodeId: 'c7_histciv_051',
  title: 'Objectives of the Constitution & The Welfare State',
  definition: 'The Constitution of India promises four supreme objectives: Justice (social, economic, political), Liberty (thought, expression, belief, faith, worship), Equality (status, opportunity), and Fraternity (dignity, unity). Through Part III (Fundamental Rights) and Part IV (Directive Principles of State Policy), it commands the government to build a democratic Welfare State where public welfare is delivered as a legal entitlement rather than royal charity.',
  eli5: 'Think of India as a giant ship. The Preamble is the compass showing our destinations: fairness, freedom, equality, and friendship. Fundamental Rights are the safety railings that stop anyone from pushing you overboard. Directive Principles are the engine instructions telling the captain to steer toward good schools, hospitals, and fair wages for all passengers.',
  misconceptions: [
    {
      misconception: 'Mahatma Gandhi personally drafted the Gandhian Directive Principles (Articles 40, 43, 46, 47, 48).',
      correction: 'Gandhi was assassinated in January 1948 before the Constitution was adopted in November 1949. The Constituent Assembly incorporated his philosophy into Part IV as an enduring tribute.',
    },
    {
      misconception: 'The Constitution was adopted and enforced on the exact same date.',
      correction: 'It was formally adopted on 26 November 1949 (Constitution Day) and came into full legal enforcement on 26 January 1950 (Republic Day) to commemorate the 1930 Purna Swaraj declaration.',
    },
    {
      misconception: 'A Welfare State is just charity or free handouts for poor people.',
      correction: 'A Welfare State provides universal rights-based infrastructure (schools, healthcare, sanitation, guaranteed work) for ALL citizens as constitutional entitlements, not discretionary charity.',
    },
    {
      misconception: 'Directive Principles are unimportant and can be ignored because they cannot be enforced in court.',
      correction: 'Article 37 explicitly declares Directive Principles "fundamental to the governance of the country" and commands the State to apply them in all law-making.',
    },
    {
      misconception: 'Equal pay for equal work (Article 39(d)) means all professions (like doctors and clerks) must earn identical salaries.',
      correction: 'Equal pay for equal work requires that men and women performing the same work or work of similar skill receive the same wage without gender discrimination.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the tripartite definition of Justice in the Preamble?', options: ['Civil, Criminal, Military', 'Social, Economic, and Political', 'Local, State, and National', 'Religious, Cultural, Linguistic'], correctIndex: 1 },
    { question: 'Which amendment added "Socialist", "Secular", and "Integrity" to the Preamble?', options: ['1st Amendment 1951', '42nd Amendment 1976', '44th Amendment 1978', '73rd Amendment 1992'], correctIndex: 1 },
    { question: 'What does Article 37 declare about Directive Principles?', options: ['They are enforceable in Supreme Court', 'They are non-justiciable but fundamental to governance', 'They expire after 10 years', 'They apply only to Union Territories'], correctIndex: 1 },
    { question: 'Which Article commands the organisation of Village Panchayats?', options: ['Article 21', 'Article 32', 'Article 40', 'Article 51A'], correctIndex: 2 },
    { question: 'Which Act guarantees 100 days of rural wage employment?', options: ['RTE Act 2009', 'MNREGA 2005', 'Equal Remuneration Act 1976', 'Factories Act 1948'], correctIndex: 1 },
    { question: 'Which case established the "Basic Structure Doctrine"?', options: ['Maneka Gandhi (1978)', 'Kesavananda Bharati (1973)', 'Champakam Dorairajan (1951)', 'Minerva Mills (1980)'], correctIndex: 1 },
    { question: 'What are Fundamental Rights classified as in terms of state duty?', options: ['Positive obligations', 'Negative obligations (restraints on state power)', 'Commercial guidelines', 'Non-binding suggestions'], correctIndex: 1 },
    { question: 'Which ancient emperor documented state hospitals and roadside wells on rock edicts?', options: ['Chandragupta Maurya', 'Emperor Ashoka', 'Samudragupta', 'Harshavardhana'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands the four Preamble objectives, the adoption vs enforcement timeline, the mechanics of Part III vs Part IV, Gandhian and general economic directives, and the evolution of welfare from Ashoka to modern rights-based legislation.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Four Preamble Pillars',
    instruction: 'Click on each of the 4 constitutional pillars to examine its definition, implementing Articles, and real-life impact.',
    interactionType: 'click-pillar',
    nodeId: NODE_C7_HISTCIV_051,
  },
  {
    title: '2. The Chariot: Part III vs Part IV',
    instruction: 'Toggle between Fundamental Rights (Part III) and Directive Principles (Part IV) to see how the two wheels balance democratic governance.',
    interactionType: 'toggle-chariot',
    nodeId: NODE_C7_HISTCIV_057,
  },
  {
    title: '3. Gandhian & Economic Directives Lab',
    instruction: 'Adjust the Policy Allocation Sliders and watch the Welfare Index & Village Empowerment gauges update in real-time.',
    interactionType: 'slider-welfare',
    nodeId: NODE_C7_HISTCIV_055,
  },
  {
    title: '4. Historical Evolution Timeline',
    instruction: 'Slide across 2,200 years of history from Ashoka’s Dhamma (268 BCE) to modern welfare Acts (MNREGA, RTE, Swachh Bharat).',
    interactionType: 'timeline-history',
    nodeId: NODE_C7_HISTCIV_058,
  },
  {
    title: '5. The Constitutional Amendment Vault',
    instruction: 'Explore how Article 368 and landmark amendments (42nd, 73rd, 86th) keep the Constitution a dynamic "Living Document".',
    interactionType: 'click-amendment',
    nodeId: NODE_C7_HISTCIV_052,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a rural district increases MNREGA job allocations and strengthens Gram Sabha social audits, what will happen to local wage security and corruption?',
    options: [
      'Wage security will drop, and corruption will increase.',
      'Wage security will rise, and transparent social audits will reduce wage theft.',
      'Nothing will change because local panchayats have no authority.',
      'Farms will immediately shut down permanently.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Village Self-Rule & Work Guarantee sliders in the lab to test your hypothesis!',
    nodeId: NODE_C7_HISTCIV_058,
  },
  {
    question: 'Predict: If the government passes a law mandating equal wages for female and male tea plantation workers, which directive is activated?',
    options: [
      'Article 48 (Cow slaughter ban)',
      'Article 39(d) (Equal pay for equal work)',
      'Article 51 (International peace)',
      'Article 40 (Village Panchayats)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click the Economic Directives tab and observe Article 39(d) in action.',
    nodeId: NODE_C7_HISTCIV_055,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between Fundamental Rights and Directive Principles in the chariot simulation?',
    observableOptions: [
      'One wheel can function perfectly if the other is completely destroyed.',
      'Both wheels are essential: Rights protect individual freedom, while Directives guide social and economic uplift.',
      'Fundamental Rights are only for government officials, while Directives are for foreigners.',
      'The chariot moves backwards when social justice is introduced.',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_057,
  },
  {
    question: 'What pattern emerges when comparing Ashoka’s Rock Edicts with modern Acts like RTE and MNREGA?',
    observableOptions: [
      'Welfare activities (healthcare, wells/sanitation, shelter) have deep historical continuity, but the modern basis has evolved into legal citizen rights.',
      'Ashoka had computers to record biometric attendance for MNREGA.',
      'Modern India abolished all public hospitals and schools.',
      'Ancient rulers gave citizens the power to sue the King in the Supreme Court.',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_HISTCIV_058,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Youth Parliamentary Civic Audit',
  description: 'Conduct a civic survey in your school or neighbourhood. Investigate 3 public welfare touchpoints and determine which constitutional Article or Act guarantees them.',
  steps: [
    '1. Examine your school’s Mid-Day Meal or free textbook distribution (RTE Act 2009 / Article 21A & 45).',
    '2. Observe a local Primary Health Centre (PHC) or vaccination drive (Article 47 - Public Health).',
    '3. Check local neighbourhood sanitation and community toilets (Swachh Bharat Abhiyan / Article 48A).',
    '4. Note down whether these services are treated by staff as citizen rights or discretionary favours.',
  ],
};

// ─── MAIN COMPONENT ───
function C7_HistoryCivicsObjectivesJusticeLibertySim({
  nodeId = DEFAULT_PROPS.nodeId || 'c7_histciv_051',
  title = DEFAULT_PROPS.title || 'Objectives of the Constitution & The Welfare State',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // ─── 30+ STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery & Predict-then-check state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox state
  const [selectedPillar, setSelectedPillar] = useState<'justice' | 'liberty' | 'equality' | 'fraternity'>('justice');
  const [chariotTab, setChariotTab] = useState<'rights' | 'directives' | 'balance'>('balance');
  const [timelineEra, setTimelineEra] = useState<number>(1950);
  const [selectedAmendment, setSelectedAmendment] = useState<string>('42nd');
  const [activeLawFilter, setActiveLawFilter] = useState<'all' | 'gandhian' | 'economic' | 'modern'>('all');

  // Sliders for Welfare Sandbox
  const [workGuaranteeDays, setWorkGuaranteeDays] = useState<number>(100);
  const [educationFunding, setEducationFunding] = useState<number>(60);
  const [healthSanitationBudget, setHealthSanitationBudget] = useState<number>(50);
  const [panchayatAutonomy, setPanchayatAutonomy] = useState<number>(75);
  const [genderWageRatio, setGenderWageRatio] = useState<number>(100);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Derived Welfare Calculations
  const calculatedWelfareIndex = useMemo(() => {
    const raw = (workGuaranteeDays / 1.5) * 0.25 + educationFunding * 0.25 + healthSanitationBudget * 0.25 + (genderWageRatio / 100) * 25;
    return Math.min(100, Math.round(raw));
  }, [workGuaranteeDays, educationFunding, healthSanitationBudget, genderWageRatio]);

  const calculatedVillageScore = useMemo(() => {
    return Math.min(100, Math.round(panchayatAutonomy * 0.6 + (workGuaranteeDays / 150) * 40));
  }, [panchayatAutonomy, workGuaranteeDays]);

  const welfareChartData = useMemo(() => {
    return [
      { name: 'Work Security', value: Math.min(100, Math.round((workGuaranteeDays / 150) * 100)), fill: '#3b82f6' },
      { name: 'Education', value: educationFunding, fill: '#10b981' },
      { name: 'Health & San.', value: healthSanitationBudget, fill: '#f59e0b' },
      { name: 'Local Swaraj', value: panchayatAutonomy, fill: '#8b5cf6' },
      { name: 'Wage Equality', value: genderWageRatio, fill: '#ec4899' },
    ];
  }, [workGuaranteeDays, educationFunding, healthSanitationBudget, panchayatAutonomy, genderWageRatio]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeData = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───

  // 1. Load initial mastery from store
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Adaptive difficulty adjustment on score change
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

  // 3. GSAP Timeline Animation Effect when timeline era changes
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [timelineEra]);

  // 4. HTML5 Canvas Pulse Loop for Constitutional Pillars
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox' && phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw subtle glowing background wave
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, '#10b981');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height / 2 + Math.sin(x * 0.02 + frame * 0.05) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing Ashok Chakra replica
      const cx = width / 2;
      const cy = height / 2;
      const radius = 9 + Math.sin(frame * 0.08) * 1.5;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 24; i++) {
        const angle = (i * Math.PI * 2) / 24 + frame * 0.01;
        const x2 = cx + Math.cos(angle) * radius;
        const y2 = cy + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // 5. Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───

  // 1. Reset inactivity timer (10s auto-hint)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  // 2. Escalating hints handler
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeData.hints[nextLevel - 1]) {
      const hintText = currentChallengeData.hints[nextLevel - 1];
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
  }, [hintCount, currentChallengeData]);

  // 3. Discovery question handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand non-justiciability.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 4. Navigation callbacks
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Constitutional Exploration. Step through each pillar to discover the architecture.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are in the Free Welfare Sandbox. Manipulate state policies and observe the live gauges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setErrors(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begun. Apply your knowledge to solve real-world constitutional problems.');
  }, []);

  // 5. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Constitutional & Welfare State simulation.');
  }, [errors, onComplete]);

  // 6. Next Challenge handler
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

  // 7. Answer handler for all challenge types
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') {
      isCorrect = answer === currentChallengeData.correctIndex;
    } else if (currentChallengeData.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctMapping);
    } else if (currentChallengeData.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctOrder);
    } else if (currentChallengeData.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (currentChallengeData.correctAnswer || 0)) <= (currentChallengeData.tolerance || 0);
    } else if (currentChallengeData.type === 'construct') {
      isCorrect = (answer as string).trim() === (currentChallengeData.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well deduced.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeData.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + currentChallengeData.nodeId, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeData.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeData.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeData.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the full legal explanation below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeData.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeData, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // 8. Drag and drop handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  // 9. Drag-sort handlers
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? [...prev] : (currentChallengeData.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [currentChallengeData]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (currentChallengeData.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, currentChallengeData, handleAnswer]);

  // 10. Predict & Observe handlers
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now explore the visual controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great analytical eye!' : 'Review the balance between Part III and Part IV.');
  }, []);

  // 11. Pillar & Era selection handlers
  const handlePillarClick = useCallback((p: 'justice' | 'liberty' | 'equality' | 'fraternity') => {
    setSelectedPillar(p);
    audioManager.play('tap');
    const speechMap = {
      justice: 'Justice: Social, Economic, and Political fairness guaranteed through Articles 17, 23, and 326.',
      liberty: 'Liberty: Freedom of thought, expression, belief, faith, and worship under Article 19 and 25.',
      equality: 'Equality: Equality of status and opportunity under Articles 14, 15, and 16.',
      fraternity: 'Fraternity: Assuring individual dignity and national unity under Article 21 and Fundamental Duties.',
    };
    speechManager.speak(speechMap[p]);
  }, []);

  const handleTimelineEraClick = useCallback((era: number) => {
    setTimelineEra(era);
    audioManager.play('tap');
  }, []);

  // 12. Policy slider change handler
  const handlePolicySlider = useCallback((setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val);
    audioManager.play('count');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">ICSE Class 7 • Civics</span>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p === 'discovery' ? '1. Hook' : p === 'explore' ? '2. Explore' : p === 'sandbox' ? '3. Sandbox' : '4. Challenges'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── CONSTITUTIONAL CANVAS BANNER ─── */}
      <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
        <canvas ref={canvasRef} width={800} height={36} className="w-full h-9 block" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-[11px] font-semibold text-slate-400">
          <span>We, The People of India</span>
          <span className="text-amber-400/90 font-mono">Part III (Rights) ⚖️ Part IV (Directives)</span>
          <span>Sovereign Socialist Secular Democratic Republic</span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE (HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Box */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl select-none font-serif text-amber-300" aria-hidden="true">⚖️</div>
            <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-bold text-amber-300 mb-2">
              📜 Civic Scenario Hook
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/80 mt-3 font-medium bg-amber-900/30 p-2.5 rounded-xl border border-amber-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Question */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">?</span>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Predict Before You Learn</h3>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/50 border border-slate-700 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-amber-500/40'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Key Concept</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-850 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-semibold flex items-center gap-1 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <span>{discoveryCorrect ? '✓' : '💡'}</span>
                    <span>{discoveryCorrect ? 'Correct intuition!' : 'Key Learning Insight:'}</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  aria-label="Start Interactive Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 whitespace-nowrap"
                >
                  Start Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step header & Progress */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Interactive Discovery {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-1" aria-label={`Slide progress indicator: Step ${currentSlide + 1} of ${EXPLORATION_STEPS.length}`}>
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-amber-200/90 bg-amber-950/30 p-3 rounded-xl border border-amber-800/30 font-medium">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl"
            >
              {/* SLIDE 0: 4 PREAMBLE PILLARS VISUALIZER */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'justice' as const, title: 'JUSTICE', sub: 'Social, Economic, Political', icon: '⚖️', color: 'border-blue-500 bg-blue-950/40 text-blue-300' },
                      { id: 'liberty' as const, title: 'LIBERTY', sub: 'Thought, Expression, Belief, Worship', icon: '🕊️', color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300' },
                      { id: 'equality' as const, title: 'EQUALITY', sub: 'Status & Opportunity', icon: '🤝', color: 'border-amber-500 bg-amber-950/40 text-amber-300' },
                      { id: 'fraternity' as const, title: 'FRATERNITY', sub: 'Dignity & National Unity', icon: '🇮🇳', color: 'border-purple-500 bg-purple-950/40 text-purple-300' },
                    ].map(p => (
                      <motion.button
                        key={p.id}
                        aria-label={`Select pillar ${p.title}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePillarClick(p.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedPillar === p.id
                            ? `${p.color} ring-2 ring-amber-400/50 shadow-lg`
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-2xl mb-1">{p.icon}</div>
                        <h4 className="text-xs font-black tracking-wider">{p.title}</h4>
                        <p className="text-[10px] line-clamp-2 mt-0.5 opacity-80">{p.sub}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic SVG Pillar Diagram */}
                  <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto" role="img" aria-label="Constitutional Pillars Architecture diagram">
                      {/* Temple Foundation */}
                      <rect x="50" y="200" width="500" height="25" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <text x="300" y="217" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                        FOUNDATION OF DEMOCRATIC REPUBLIC (WE, THE PEOPLE)
                      </text>

                      {/* 4 Pillars */}
                      {[
                        { id: 'justice' as const, name: 'JUSTICE', x: 75, color: '#3b82f6', articles: 'Art 17, 23, 326' },
                        { id: 'liberty' as const, name: 'LIBERTY', x: 200, color: '#10b981', articles: 'Art 19(1)(a), 25-28' },
                        { id: 'equality' as const, name: 'EQUALITY', x: 325, color: '#f59e0b', articles: 'Art 14, 15, 16' },
                        { id: 'fraternity' as const, name: 'FRATERNITY', x: 450, color: '#a855f7', articles: 'Art 21, 51A' },
                      ].map(col => {
                        const isSelected = selectedPillar === col.id;
                        return (
                          <g key={col.id} role="button" tabIndex={0} aria-label={`Pillar ${col.name}`} onClick={() => handlePillarClick(col.id)} className="cursor-pointer">
                            <rect
                              x={col.x}
                              y={isSelected ? 55 : 70}
                              width="75"
                              height={isSelected ? 145 : 130}
                              rx="6"
                              fill={isSelected ? col.color : '#1e293b'}
                              opacity={isSelected ? 0.9 : 0.4}
                              stroke={col.color}
                              strokeWidth={isSelected ? '3' : '1'}
                              className="transition-all duration-300"
                            />
                            <text
                              x={col.x + 37}
                              y={isSelected ? 110 : 125}
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {col.name}
                            </text>
                            <text
                              x={col.x + 37}
                              y={isSelected ? 130 : 145}
                              fill="#e2e8f0"
                              fontSize="8"
                              textAnchor="middle"
                              opacity="0.8"
                            >
                              {col.articles}
                            </text>
                          </g>
                        );
                      })}

                      {/* Architraves Roof */}
                      <polygon points="50,45 300,10 550,45" fill="#334155" stroke="#475569" strokeWidth="2" />
                      <text x="300" y="38" fill="#fbbf24" fontSize="11" fontWeight="black" textAnchor="middle">
                        THE CONSTITUTION OF INDIA (PREAMBLE GOALS)
                      </text>
                    </svg>

                    {/* Explanatory breakdown card */}
                    <motion.div
                      key={selectedPillar}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs leading-relaxed"
                    >
                      {selectedPillar === 'justice' && (
                        <p>
                          <strong className="text-blue-400">⚖️ Tripartite Justice:</strong> Social (Abolishing untouchability via <span className="underline">Art 17</span> & SC/ST Act), Economic (Banning forced labour via <span className="underline">Art 23</span> & Minimum Wages Act 1948), Political (Universal adult voting under <span className="underline">Art 326</span>).
                        </p>
                      )}
                      {selectedPillar === 'liberty' && (
                        <p>
                          <strong className="text-emerald-400">🕊️ 5 Dimensions of Liberty:</strong> Thought, Expression, Belief, Faith, and Worship (<span className="underline">Art 19(1)(a) & 25-28</span>). Note: Liberty is not absolute; it is subject to reasonable restrictions under Art 19(2).
                        </p>
                      )}
                      {selectedPillar === 'equality' && (
                        <p>
                          <strong className="text-amber-400">🤝 Twofold Equality:</strong> Equality of Status (Equality before law under <span className="underline">Art 14</span>) and Equality of Opportunity (No discrimination in public employment under <span className="underline">Art 15 & 16</span>).
                        </p>
                      )}
                      {selectedPillar === 'fraternity' && (
                        <p>
                          <strong className="text-purple-400">🇮🇳 Fraternity & Human Dignity:</strong> Assures the dignity of every individual (<span className="underline">Art 21</span> right to live with dignity) and the unity/integrity of the nation (<span className="underline">Art 51A</span> brotherhood duties).
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: THE CHARIOT (PART III vs PART IV) */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict Then Check Trigger */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/50">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Predict First</span>
                      <p className="text-sm font-semibold text-white mt-1">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg bg-slate-855 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chariot Visualizer Tabs */}
                  <div className="flex gap-2 border-b border-slate-800 pb-2" role="tablist" aria-label="Chariot perspectives">
                    {[
                      { id: 'balance' as const, label: '⚔️ Balanced Chariot (Minerva Mills 1980)' },
                      { id: 'rights' as const, label: '🛡️ Part III: Fundamental Rights' },
                      { id: 'directives' as const, label: '🧭 Part IV: Directive Principles' },
                    ].map(t => (
                      <motion.button
                        key={t.id}
                        role="tab"
                        aria-selected={chariotTab === t.id}
                        aria-label={t.label}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setChariotTab(t.id);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          chariotTab === t.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Chariot Graphic */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 200" className="w-full max-w-lg h-auto" role="img" aria-label="Two wheels of chariot: Fundamental Rights and Directive Principles">
                      {/* Chariot Carriage */}
                      <rect x="175" y="50" width="150" height="70" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                      <text x="250" y="85" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        THE WELFARE STATE
                      </text>
                      <text x="250" y="103" fill="#a5b4fc" fontSize="9" textAnchor="middle">
                        Social & Economic Democracy
                      </text>

                      {/* Left Wheel: Part III (Rights) */}
                      <g role="button" tabIndex={0} aria-label="Part 3 Fundamental Rights wheel" className="cursor-pointer" onClick={() => setChariotTab('rights')}>
                        <circle
                          cx="130"
                          cy="135"
                          r="45"
                          fill="#0f172a"
                          stroke={chariotTab === 'rights' || chariotTab === 'balance' ? '#38bdf8' : '#334155'}
                          strokeWidth="4"
                        />
                        <circle cx="130" cy="135" r="8" fill="#38bdf8" />
                        <text x="130" y="132" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                          PART III
                        </text>
                        <text x="130" y="145" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                          Justiciable Rights
                        </text>
                      </g>

                      {/* Right Wheel: Part IV (Directives) */}
                      <g role="button" tabIndex={0} aria-label="Part 4 Directive Principles wheel" className="cursor-pointer" onClick={() => setChariotTab('directives')}>
                        <circle
                          cx="370"
                          cy="135"
                          r="45"
                          fill="#0f172a"
                          stroke={chariotTab === 'directives' || chariotTab === 'balance' ? '#f59e0b' : '#334155'}
                          strokeWidth="4"
                        />
                        <circle cx="370" cy="135" r="8" fill="#f59e0b" />
                        <text x="370" y="132" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                          PART IV
                        </text>
                        <text x="370" y="145" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                          Directive Principles
                        </text>
                      </g>

                      {/* Axle connecting wheels */}
                      <line x1="130" y1="135" x2="370" y2="135" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
                    </svg>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-3 text-xs">
                      <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-800/40">
                        <span className="font-bold text-blue-400">🛡️ Part III (Articles 12-35):</span>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>Justiciable: enforceable via Art 32 / 226</li>
                          <li>Negative obligations (tells State what NOT to do)</li>
                          <li>Guarantees Political Democracy</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40">
                        <span className="font-bold text-amber-400">🧭 Part IV (Articles 36-51):</span>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>Non-justiciable under Article 37</li>
                          <li>Positive obligations (tells State what it MUST pursue)</li>
                          <li>Guarantees Social & Economic Democracy</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400 mb-1">Observation Check: What do you notice?</p>
                      <p className="text-xs text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation answer ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 2: GANDHIAN & ECONOMIC DIRECTIVES LAB */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(['all', 'gandhian', 'economic', 'modern'] as const).map(f => (
                      <motion.button
                        key={f}
                        aria-label={`Filter directives by ${f}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveLawFilter(f);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeLawFilter === f
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {f === 'all' ? 'All Directives' : f === 'gandhian' ? 'Gandhian (40, 43, 46, 47, 48)' : f === 'economic' ? 'General Economic (38, 39, 41, 42)' : 'Implementing Acts'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Interactive Directives Matrix */}
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {[
                        { art: 'Article 38', cat: 'economic', text: 'Social order promoting justice & minimizing group income inequality.', law: 'Anti-Poverty Welfare Schemes' },
                        { art: 'Article 39(d)', cat: 'economic', text: 'Equal pay for equal work for men & women without discrimination.', law: 'Equal Remuneration Act 1976' },
                        { art: 'Article 40', cat: 'gandhian', text: 'Organise Village Panchayats as units of local self-government (Gram Swaraj).', law: '73rd Amendment Act 1992' },
                        { art: 'Article 41', cat: 'economic', text: 'Right to work, education & public assistance in sickness/old age.', law: 'MNREGA 2005' },
                        { art: 'Article 42', cat: 'economic', text: 'Just & humane conditions of work and maternity relief.', law: 'Maternity Benefit Act 1961 (26 wks)' },
                        { art: 'Article 43', cat: 'gandhian', text: 'Promote rural cottage industries & secure a dignified living wage.', law: 'KVIC 1957' },
                        { art: 'Article 46', cat: 'gandhian', text: 'Special care for educational & economic uplift of SC, ST & weaker sections.', law: 'SC/ST (Prevention of Atrocities) Act 1989' },
                        { art: 'Article 47', cat: 'gandhian', text: 'Prohibition of intoxicating drinks/drugs and raising public nutrition.', law: 'State Prohibition Acts' },
                        { art: 'Article 48', cat: 'gandhian', text: 'Modern agriculture, animal husbandry & cow slaughter prohibition.', law: 'State Cattle Protection Laws' },
                      ]
                        .filter(d => activeLawFilter === 'all' || d.cat === activeLawFilter || (activeLawFilter === 'modern' && d.law))
                        .map((d, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-400">{d.art}</span>
                              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                {d.cat}
                              </span>
                            </div>
                            <p className="text-slate-300 mt-1">{d.text}</p>
                            <p className="text-[11px] text-emerald-400 mt-1 font-mono">Enacted Law: {d.law}</p>
                          </div>
                        ))}
                    </div>

                    {/* Real-time policy simulator panel */}
                    <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Live Policy Simulator</h4>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <label htmlFor="explore-mnrega-slider">MNREGA Guaranteed Days (Art 41):</label>
                          <span className="text-blue-400 font-bold">{workGuaranteeDays} Days</span>
                        </div>
                        <input
                          id="explore-mnrega-slider"
                          type="range"
                          min={0}
                          max={150}
                          aria-label="MNREGA Guaranteed Work Days"
                          value={workGuaranteeDays}
                          onChange={e => handlePolicySlider(setWorkGuaranteeDays, Number(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <label htmlFor="explore-wage-slider">Gender Wage Parity (Art 39(d)):</label>
                          <span className="text-pink-400 font-bold">{genderWageRatio}%</span>
                        </div>
                        <input
                          id="explore-wage-slider"
                          type="range"
                          min={50}
                          max={100}
                          aria-label="Gender Wage Parity"
                          value={genderWageRatio}
                          onChange={e => handlePolicySlider(setGenderWageRatio, Number(e.target.value))}
                          className="w-full accent-pink-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <label htmlFor="explore-panchayat-slider">Panchayat Autonomy (Art 40):</label>
                          <span className="text-purple-400 font-bold">{panchayatAutonomy}%</span>
                        </div>
                        <input
                          id="explore-panchayat-slider"
                          type="range"
                          min={0}
                          max={100}
                          aria-label="Panchayat Autonomy"
                          value={panchayatAutonomy}
                          onChange={e => handlePolicySlider(setPanchayatAutonomy, Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Welfare State Score:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-black font-mono text-sm">
                          {calculatedWelfareIndex}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: HISTORICAL TIMELINE */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Era Selector buttons */}
                  <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-800">
                    {[
                      { era: -268, label: '268 BCE: Ashoka Dhamma' },
                      { era: 1930, label: '1930: Purna Swaraj' },
                      { era: 1949, label: '1949: Adoption (26 Nov)' },
                      { era: 1950, label: '1950: Republic Day (26 Jan)' },
                      { era: 1992, label: '1992: 73rd/74th Amend' },
                      { era: 2005, label: '2005: MNREGA' },
                      { era: 2009, label: '2009: RTE Act' },
                      { era: 2014, label: '2014: Swachh Bharat' },
                    ].map(item => (
                      <motion.button
                        key={item.era}
                        aria-label={`Select era ${item.label}`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleTimelineEraClick(item.era)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          timelineEra === item.era
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* GSAP animated era detail container */}
                  <div
                    ref={timelineGsapRef}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-[160px] flex flex-col justify-center"
                  >
                    {timelineEra === -268 && (
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Mauryan Empire (3rd Century BCE)</span>
                        <h4 className="text-lg font-black text-white mt-1">Emperor Ashoka’s Dhamma Welfare</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          <strong>Rock Edict II & Pillar Edict VII:</strong> Ordered hospitals for humans and animals, planted shade-giving banyan and mango trees, dug roadside wells, and appointed <em>Dhamma-mahamattas</em> to care for the vulnerable.
                        </p>
                        <p className="text-[11px] text-amber-300 mt-2 bg-amber-950/40 p-2 rounded-lg">
                          ⚖️ <strong>Basis:</strong> Moral duty of a Buddhist ruler. Dependent entirely on the monarch’s personal conscience; citizens could not demand welfare as a legal right in court.
                        </p>
                      </div>
                    )}

                    {timelineEra === 1930 && (
                      <div>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Lahore Congress Session</span>
                        <h4 className="text-lg font-black text-white mt-1">Purna Swaraj Declaration (26 January 1930)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          Under Jawaharlal Nehru’s presidency, the Indian National Congress pledged complete independence (Purna Swaraj) and celebrated 26 January 1930 as the first Independence Day.
                        </p>
                        <p className="text-[11px] text-blue-300 mt-2 bg-blue-950/40 p-2 rounded-lg">
                          🇮🇳 <strong>Significance:</strong> The framers waited until 26 January 1950 to enforce the Constitution specifically to honour this sacred freedom pledge.
                        </p>
                      </div>
                    )}

                    {timelineEra === 1949 && (
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Constitution Day</span>
                        <h4 className="text-lg font-black text-white mt-1">Formal Adoption (26 November 1949)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          The Constituent Assembly presided by Dr Rajendra Prasad approved and signed the final draft text after 2 years, 11 months, and 18 days of debate.
                        </p>
                        <p className="text-[11px] text-emerald-300 mt-2 bg-emerald-950/40 p-2 rounded-lg">
                          📝 <strong>Adoption vs Enforcement:</strong> Adoption is the formal approval of the text; full legal activation occurred two months later on Republic Day.
                        </p>
                      </div>
                    )}

                    {timelineEra === 1950 && (
                      <div>
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Inception of the Republic</span>
                        <h4 className="text-lg font-black text-white mt-1">Enforcement & First President (26 January 1950)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          The Constitution became operational supreme law. On 24 January 1950, Dr Rajendra Prasad was elected first President of India.
                        </p>
                      </div>
                    )}

                    {timelineEra === 1992 && (
                      <div>
                        <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Grassroots Self-Government</span>
                        <h4 className="text-lg font-black text-white mt-1">73rd & 74th Amendments (Parts IX & IX-A)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          Conferred constitutional status on Panchayati Raj Institutions and Urban Municipalities, making Gandhi’s Article 40 mandatory with reserved seats for women (33%) and SC/ST communities.
                        </p>
                      </div>
                    )}

                    {timelineEra === 2005 && (
                      <div>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Right to Work in Practice</span>
                        <h4 className="text-lg font-black text-white mt-1">MNREGA (Enacting Article 41)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          Legally guarantees 100 days of rural wage employment per household per year. Administered by Gram Panchayats with mandatory Gram Sabha Social Audits.
                        </p>
                      </div>
                    )}

                    {timelineEra === 2009 && (
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Right to Education</span>
                        <h4 className="text-lg font-black text-white mt-1">RTE Act 2009 (Enacting Article 21A)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          Upgraded the aspirational directive in Article 45 into a legally binding Fundamental Right under Article 21A for every child aged 6 to 14.
                        </p>
                      </div>
                    )}

                    {timelineEra === 2014 && (
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Public Sanitation</span>
                        <h4 className="text-lg font-black text-white mt-1">Swachh Bharat Abhiyan (2 October 2014)</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          Launched on Gandhi Jayanti to eliminate open defecation, construct household and community toilets, and manage waste, implementing Articles 47 & 48A.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: THE AMENDMENT VAULT */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase">Article 368: Amendment Engine</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Over 106 Amendments as of 2023. Balancing flexibility with stability while preserving the Basic Structure (Kesavananda 1973).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        name: 'Simple Majority',
                        thresh: '>50% present & voting',
                        ex: 'Creation of new States (Art 3), changes to citizenship & official languages.',
                        color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
                      },
                      {
                        name: 'Special Majority',
                        thresh: '50% total + 2/3 present & voting',
                        ex: 'Fundamental Rights (Part III) & Directive Principles (Part IV).',
                        color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
                      },
                      {
                        name: 'Special + State Ratification',
                        thresh: 'Special Maj + ≥50% State Assemblies',
                        ex: 'President election, Union-State division of powers, Article 368 itself.',
                        color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
                      },
                    ].map((m, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${m.color} text-xs`}>
                        <h5 className="font-bold">{m.name}</h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{m.thresh}</p>
                        <p className="text-slate-300 mt-2 text-[11px]">{m.ex}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-amber-400">🛡️ The Basic Structure Doctrine (1973):</span>
                    <p className="text-slate-300 mt-1">
                      In <em>Kesavananda Bharati</em>, a 7–6 majority held that Parliament cannot destroy core constitutional pillars like judicial review, democracy, rule of law, and secularism. Thus, the Constitution is a resilient "Living Document".
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Discovery Step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              ← Previous Pillar
            </motion.button>

            <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Discovery Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md shadow-amber-500/20"
              >
                Next Discovery →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 text-xs font-black hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔬 No Grading Pressure</span>
                <h2 className="text-xl font-black text-white">Welfare State Simulation Sandbox</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust policies freely. See how social rights, village autonomy, and health budgets impact the constitutional welfare metrics.
                </p>
              </div>
              <motion.button
                aria-label="Proceed to graded challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                Ready for Graded Challenges →
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Control Sliders */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">State Policy Levers</h3>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <label htmlFor="sandbox-mnrega">1. MNREGA Guaranteed Work Days (Article 41):</label>
                  <span className="text-blue-400 font-bold font-mono">{workGuaranteeDays} Days</span>
                </div>
                <input
                  id="sandbox-mnrega"
                  type="range"
                  min={0}
                  max={150}
                  aria-label="MNREGA Guaranteed Work Days Slider"
                  value={workGuaranteeDays}
                  onChange={e => handlePolicySlider(setWorkGuaranteeDays, Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <label htmlFor="sandbox-education">2. RTE & Education Budget Share (Article 21A & 45):</label>
                  <span className="text-emerald-400 font-bold font-mono">{educationFunding}%</span>
                </div>
                <input
                  id="sandbox-education"
                  type="range"
                  min={10}
                  max={100}
                  aria-label="Education Budget Share Slider"
                  value={educationFunding}
                  onChange={e => handlePolicySlider(setEducationFunding, Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <label htmlFor="sandbox-health">3. Public Health & Swachh Bharat (Articles 47 & 48A):</label>
                  <span className="text-amber-400 font-bold font-mono">{healthSanitationBudget}%</span>
                </div>
                <input
                  id="sandbox-health"
                  type="range"
                  min={10}
                  max={100}
                  aria-label="Public Health and Sanitation Budget Slider"
                  value={healthSanitationBudget}
                  onChange={e => handlePolicySlider(setHealthSanitationBudget, Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <label htmlFor="sandbox-panchayat">4. Gram Panchayat Autonomy & Social Audit (Article 40):</label>
                  <span className="text-purple-400 font-bold font-mono">{panchayatAutonomy}%</span>
                </div>
                <input
                  id="sandbox-panchayat"
                  type="range"
                  min={0}
                  max={100}
                  aria-label="Gram Panchayat Autonomy Slider"
                  value={panchayatAutonomy}
                  onChange={e => handlePolicySlider(setPanchayatAutonomy, Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <label htmlFor="sandbox-wage">5. Gender Wage Parity (Article 39(d)):</label>
                  <span className="text-pink-400 font-bold font-mono">{genderWageRatio}%</span>
                </div>
                <input
                  id="sandbox-wage"
                  type="range"
                  min={50}
                  max={100}
                  aria-label="Gender Wage Parity Ratio Slider"
                  value={genderWageRatio}
                  onChange={e => handlePolicySlider(setGenderWageRatio, Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>
            </div>

            {/* Live Chart & Metrics Output */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide mb-2">Live Policy Impact Distribution</h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={welfareChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 11 }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {welfareChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Overall Welfare Index</span>
                  <p className="text-xl font-black text-emerald-400 mt-1 font-mono">{calculatedWelfareIndex} / 100</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {calculatedWelfareIndex > 80 ? '🌟 Highly Progressive Welfare State' : calculatedWelfareIndex > 50 ? '📈 Developing Public Services' : '⚠️ Minimalist Police State'}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Village Swaraj Index</span>
                  <p className="text-xl font-black text-purple-400 mt-1 font-mono">{calculatedVillageScore} / 100</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {calculatedVillageScore > 75 ? '🏛️ Strong Grassroots Democracy' : '🏢 Centralised Bureaucracy'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Challenge header with adaptive badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : difficulty === 'standard'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {difficulty} tier
                </motion.span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono">
                  NEP: {currentChallengeData.competencyLevel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {currentChallengeData.question}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Current Mastery</span>
              <p className="text-xs font-bold text-amber-400 capitalize">{masteryLevel}</p>
            </div>
          </div>

          {/* Animated Challenge Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800" aria-label={`Progress: Challenge ${currentChallenge + 1} of ${filteredChallenges.length}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* CHALLENGE RENDERING: MCQ TYPES (classify, distinguish, match) */}
          {(currentChallengeData.type === 'classify' ||
            currentChallengeData.type === 'distinguish' ||
            currentChallengeData.type === 'match') &&
            currentChallengeData.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-4">
                {currentChallengeData.options.map((opt, i) => {
                  const isSelectedCorrect = showExplanation && i === currentChallengeData.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-200'
                          : isSelectedCorrect
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {wrongFlash && <span className="text-rose-400 font-bold">✗</span>}
                        {isSelectedCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                        <span>{opt}</span>
                      </span>
                      {isSelectedCorrect && <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

          {/* CHALLENGE RENDERING: DRAG-LABEL TYPE */}
          {currentChallengeData.type === 'drag-label' && currentChallengeData.dragItems && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold mb-2 block">Available Labels (Drag or Tap):</span>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeData.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDragStart(item.label)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-grab transition-all ${
                        draggedItem === item.label
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Target Drop Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'slot_soc_just', title: 'Article 17: Abolition of Untouchability & SC/ST Act' },
                  { id: 'slot_pol_just', title: 'Article 326: Universal Adult Franchise (Right to Vote)' },
                  { id: 'slot_lib_speech', title: 'Article 19(1)(a): Freedom of Speech & Expression' },
                  { id: 'slot_eq_opp', title: 'Article 16: Equal Opportunity in Public Employment' },
                ].map(slot => (
                  <div
                    key={slot.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Drop target for ${slot.title}`}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop(slot.id)}
                    onClick={() => handleDragDrop(slot.id)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer min-h-[70px] flex flex-col justify-between transition-all ${
                      droppedLabels[slot.id]
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-900 border-dashed border-slate-700 hover:border-amber-400/60'
                    }`}
                  >
                    <span className="text-[11px] text-slate-400 font-mono">{slot.title}</span>
                    <div className="mt-1 font-bold text-amber-300">
                      {droppedLabels[slot.id] ? `🎯 ✓ ${droppedLabels[slot.id]}` : 'Drop matching Preamble Goal here'}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                aria-label="Check Matched Labels"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40"
              >
                Check Matched Labels →
              </motion.button>
            </div>
          )}

          {/* CHALLENGE RENDERING: DRAG-SORT TYPE */}
          {currentChallengeData.type === 'drag-sort' && currentChallengeData.sortItems && (
            <div className="space-y-3 mt-4">
              <span className="text-xs text-slate-400">Drag or use arrow buttons to arrange in correct chronological order:</span>
              <div className="space-y-2">
                {(sortArrangement.length === currentChallengeData.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeData.sortItems![idx])
                  : currentChallengeData.sortItems
                ).map((item, idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    aria-label={`Item ${idx + 1}: ${item}`}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 font-medium">{item}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <motion.button
                        aria-label={`Move item ${idx + 1} up`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={idx === 0}
                        onClick={() => handleSortMove(idx, idx - 1)}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30"
                      >
                        ▲
                      </motion.button>
                      <motion.button
                        aria-label={`Move item ${idx + 1} down`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={idx === (currentChallengeData.sortItems?.length || 4) - 1}
                        onClick={() => handleSortMove(idx, idx + 1)}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30"
                      >
                        ▼
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                aria-label="Submit Chronological Order"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Submit Chronological Order →
              </motion.button>
            </div>
          )}

          {/* CHALLENGE RENDERING: NUMERIC TYPE */}
          {currentChallengeData.type === 'numeric' && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  aria-label="Enter number of days"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter exact days..."
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-48"
                />
                <span className="text-xs text-slate-400 font-semibold">{currentChallengeData.unit}</span>
                <motion.button
                  aria-label="Verify entered number"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40"
                >
                  Verify Number →
                </motion.button>
              </div>
            </div>
          )}

          {/* CHALLENGE RENDERING: CONSTRUCT TYPE */}
          {currentChallengeData.type === 'construct' && currentChallengeData.availableParts && (
            <div className="space-y-3 mt-4">
              <span className="text-xs text-slate-400">{currentChallengeData.validationHint}</span>

              {/* Available Palette */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                {currentChallengeData.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Add component ${part}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (!constructParts.includes(part)) {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-700/80 hover:bg-indigo-600 text-white text-xs font-semibold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              {/* Construction Canvas */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex flex-wrap items-center gap-2" role="region" aria-label="Constructed pathway steps">
                {constructParts.map((p, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    aria-label={`Constructed step ${i + 1}: ${p}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-xs text-amber-200"
                  >
                    <span>{i + 1}. {p}</span>
                    <button
                      aria-label={`Remove step ${p}`}
                      onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-amber-400 hover:text-rose-400 ml-1 font-bold"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500 italic">Click the components above in logical sequence...</span>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  aria-label="Verify Constructed Pathway"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length < 3}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40"
                >
                  Verify Constructed Pathway →
                </motion.button>
                <button
                  aria-label="Reset construction canvas"
                  onClick={() => setConstructParts([])}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* STEP-BY-STEP EXPLANATION CARD (PROGRESSIVE DISCLOSURE) */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-700/50 space-y-3"
            >
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                📜 Judicial Walkthrough & Step-by-Step Breakdown
              </span>

              <div className="space-y-2">
                {currentChallengeData.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-300 font-mono mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
                currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  aria-label="Show next breakdown point"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setRevealedSteps(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                >
                  Show Next Point →
                </motion.button>
              )}

              {revealedSteps >=
                currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation' : 'Next Challenge'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="mt-3 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & AUDIT REPORT PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700/50 text-center">
            <span className="text-5xl" aria-hidden="true">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">Constitutional Scholar Certified</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
              You have completed the comprehensive ICSE Civics mastery evaluation on the Preamble Objectives, Directive Principles, and the Welfare State.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-5">
              <div className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Accuracy Score</span>
                <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-bold">BKT Final Mastery</span>
                <p className="text-2xl font-black text-amber-400 capitalize font-mono mt-0.5">{masteryLevel}</p>
              </div>
              <div className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Total Inquiries</span>
                <p className="text-2xl font-black text-indigo-400 font-mono mt-0.5">{scoreBreakdown.total}</p>
              </div>
            </div>
          </div>

          {/* Motivational Personalized Guidance */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {errors === 0 ? '🏆' : errors <= 3 ? '👏' : errors <= 7 ? '👍' : '💪'}
              </span>
              <h4 className="font-black text-sm uppercase tracking-wide text-amber-400">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You demonstrated exceptional legal discernment regarding Part III, Part IV, and the historical continuity from Ashoka to modern welfare legislation.'
                : errors <= 3
                ? 'Great work! You have a solid grasp of the golden triangle and the non-justiciable character of Part IV. Review the minor points below to solidify your exam readiness.'
                : errors <= 7
                ? 'Good effort! You are building a strong foundation in constitutional law. Focus on distinguishing the 1949 Adoption from 1950 Enforcement and the difference between minimum vs living wage.'
                : 'Do not give up — You WILL get this! Constitutional principles take practice. Revisit the exploration labs to master how fundamental rights and directive principles reinforce each other.'}
            </p>
          </div>

          {/* Misconceptions audit (if hit) */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Your Targeted Misconception Review:</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold flex items-center gap-1.5">
                        <span>✗</span>
                        <span>Myth: {m.misconception}</span>
                      </p>
                      <p className="text-emerald-300 mt-1 flex items-center gap-1.5">
                        <span>✓</span>
                        <span>Constitutional Truth: {m.correction}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notice */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/40 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-400 uppercase">Spaced Repetition Schedule (SM-2):</span>
              <p className="text-slate-300 mt-0.5">
                Next active review recommended in{' '}
                <strong className="text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to ensure long-term retention for your board examinations.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>

          {/* Real World Civic Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
              🌍 Take-Home Field Action: {REAL_WORLD_ACTIVITY.title}
            </span>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <motion.button
              aria-label="Revisit Exploration Labs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                audioManager.play('tap');
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
            >
              🔄 Revisit Exploration Labs
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Tier Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_HistoryCivicsObjectivesJusticeLibertySim;