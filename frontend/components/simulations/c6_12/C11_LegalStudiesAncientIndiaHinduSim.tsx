'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── 10 ISC LEGAL STUDIES NODE IDS ───
const NODE_C11_LEGAL_001 = 'c11_legal_001';
const NODE_C11_LEGAL_002 = 'c11_legal_002';
const NODE_C11_LEGAL_003 = 'c11_legal_003';
const NODE_C11_LEGAL_004 = 'c11_legal_004';
const NODE_C11_LEGAL_005 = 'c11_legal_005';
const NODE_C11_LEGAL_006 = 'c11_legal_006';
const NODE_C11_LEGAL_007 = 'c11_legal_007';
const NODE_C11_LEGAL_008 = 'c11_legal_008';
const NODE_C11_LEGAL_009 = 'c11_legal_009';
const NODE_C11_LEGAL_010 = 'c11_legal_010';

const ALL_NODE_IDS = [
  NODE_C11_LEGAL_001,
  NODE_C11_LEGAL_002,
  NODE_C11_LEGAL_003,
  NODE_C11_LEGAL_004,
  NODE_C11_LEGAL_005,
  NODE_C11_LEGAL_006,
  NODE_C11_LEGAL_007,
  NODE_C11_LEGAL_008,
  NODE_C11_LEGAL_009,
  NODE_C11_LEGAL_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Great Indian Jurisprudence Odyssey: From Dharma to the Digital Republic',
  intro: 'You are appointed Chief Legal Historian and Constitutional Advocate for the Law Reform Commission of India. A high-stakes national dispute has arisen spanning 3,000 years of legal traditions: from ancient Smriti custom and medieval Qazi courts, through colonial codification, to modern constitutional touchstones, international treaties, corporate personality, and commercial partnership.',
  context: 'Your mission is to examine evidence, adjudicate historical and modern legal dilemmas, weigh procedural rules (Vyavahara), test statutes against Constitutional touchstones (Article 13), and craft equitable resolutions.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In ancient Indian jurisprudence, was the King (Raja) considered sovereign above all laws, or was the ruler himself subordinate to a higher regulatory principle?',
  options: [
    'The King was an absolute monarch above all laws with no legal accountability',
    'The King was strictly bound by Dharma ("Dharma rakshati rakshitah") and could be judged for violating duty',
    'Law applied only to non-nobles, while the royal court had permanent diplomatic immunity',
    'Only foreign conquerors could place legal constraints on the King',
  ],
  correctIndex: 1,
  hintAfter: 'Ancient Indian legal thought pioneered the rule-of-law concept thousands of years before modern constitutionalism!',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Ancient Hindu Law & The Connotations of Dharma',
    instruction: 'Click on each ancient source of law (Shruti, Smriti, Achaara) to uncover how moral duty (Dharma) bound everyone from pauper to king.',
    interactionType: 'click-sources',
    nodeId: NODE_C11_LEGAL_001,
  },
  {
    title: '2. Ancient Judiciary & Procedural Stages (Vyavahara)',
    instruction: 'Trace a dispute from the village Kulani up to the King’s Court, and navigate the 4 stages of ancient civil procedure: Pratijna, Uttara, Kriya, and Vidhana.',
    interactionType: 'hierarchy-trace',
    nodeId: NODE_C11_LEGAL_002,
  },
  {
    title: '3. Medieval Islamic Legal Hierarchy & The Crown Court',
    instruction: 'Explore the 4 tiers (Pargana, Sarkar, Subah, Adalat-i-Alia) and see how assigned Vakils provided medieval free legal aid.',
    interactionType: 'islamic-courts',
    nodeId: NODE_C11_LEGAL_003,
  },
  {
    title: '4. The 5 Schools of Jurisprudence & The Constitutional Touchstone',
    instruction: 'Adjust the Legal Philosophy Balance slider to compare Natural, Positivist, Historical, Realist, and Sociological schools.',
    interactionType: 'jurisprudence-balance',
    nodeId: NODE_C11_LEGAL_005,
  },
  {
    title: '5. Corporate Mask & Partnership Mutual Agency',
    instruction: 'Toggle between the 5 Legal Personality theories (Fiction, Concession, Realist, Bracket, Purpose) and observe how partners bind each other under Section 19.',
    interactionType: 'personality-partnership',
    nodeId: NODE_C11_LEGAL_009,
  },
];

// ─── PREDICTION-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an ordinary statute passed by Parliament directly contradicts a Fundamental Right guaranteed in Part III, what happens under Article 13 of the Constitution?',
    options: [
      'The statute automatically amends the Constitution to eliminate the conflict',
      'The Supreme Court / High Courts declare the inconsistent statute void and strike it down',
      'The statute remains valid until the President issues an executive ordinance',
      'The statute is transferred to the International Court of Justice for mediation',
    ],
    correctIndex: 1,
    verifyInstruction: 'Interact with the Constitutional Touchstone Analyzer below to test Section 66A IT Act against Article 19(1)(a)!',
    nodeId: NODE_C11_LEGAL_007,
  },
  {
    question: 'Predict: If two partners run a textile firm, and Partner A secretly buys personal real estate using firm money without Partner B’s consent, does Section 19(2) bind the firm?',
    options: [
      'Yes, all partner actions automatically bind the firm under unlimited agency',
      'No, Section 19(2)(h) expressly bars acquiring immovable property without co-partner consent',
      'Yes, provided Partner A pays 10% interest back to the firm within six months',
      'No, but only if the firm is an incorporated company under the Companies Act',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the Implied Authority matrix in the interactive simulation to verify statutory limits under Section 19(2)!',
    nodeId: NODE_C11_LEGAL_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the difference between Civil and Criminal standards of proof when adjusting the Burden of Proof balance?',
    observableOptions: [
      'Both civil and criminal trials require identical mathematical 50% proof',
      'Criminal law requires the strict "Beyond Reasonable Doubt" standard to protect personal liberty (Art 21), whereas Civil law uses "Preponderance of Probabilities"',
      'Civil law requires 100% certainty while criminal law allows intuitive guesswork',
      'Standard of proof is determined solely by the financial wealth of the plaintiff',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_LEGAL_006,
  },
  {
    question: 'What pattern emerges when comparing the ancient Kulani / Sreni courts with modern ADR institutions?',
    observableOptions: [
      'Ancient India lacked any dispute resolution before the British arrived in 1726',
      'The decentralised Kulani and specialised Sreni guild courts directly anticipated modern Lok Adalats and NCLT commercial tribunals',
      'Guild courts were only permitted to handle criminal treason and capital punishment',
      'Lok Adalats were established under the Charter of 1600 by Queen Elizabeth I',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_LEGAL_002,
  },
];

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

// ─── 24 RICH CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_f_recall',
    nodeId: NODE_C11_LEGAL_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the three primary classical sources of Hindu Law recognized in ancient jurisprudence?',
    options: [
      'Shruti (revealed Vedas), Smriti (remembered codes), and Achaara (immemorial custom)',
      'Statute, Executive Ordinance, and Royal Charter',
      'Common Law, Equity, and Justice of Peace',
      'Farman, Ijma, and Qiyas',
    ],
    correctIndex: 0,
    explanation: 'Classical Hindu law derived from three primary sources: Shruti (divine revelation/Vedas), Smriti (codified recollections like Manusmriti and Yajnavalkya Smriti), and Achaara (established customary usages).',
    hints: [
      'Think of "heard" revelations, "remembered" treatises, and continuous community customs.',
      'The Sanskrit terms are Shruti, Smriti, and Achaara.',
      'The correct set starts with the Vedas (divine revelation).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_002_f_drag_sort',
    nodeId: NODE_C11_LEGAL_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four procedural stages of ancient Indian civil litigation (Vyavahara) in chronological sequence.',
    sortItems: [
      'Pratijna (Filing the written Plaint/Claim)',
      'Uttara (Defendant filing the Written Reply/Statement)',
      'Kriya (Trial: Evidence, Witnesses & Proof)',
      'Vidhana (Final Judgment and Decree)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The procedural stages of Vyavahara systematically mirrored modern civil procedure: Plaint (Pratijna) -> Written Reply (Uttara) -> Evidence (Kriya) -> Judgment (Vidhana).',
    hints: [
      'First, a claim must be initiated in writing.',
      'Second, the opponent replies; third, witnesses/documents are evaluated.',
      'The sequence ends with the judicial decision (Vidhana).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_f_recall',
    nodeId: NODE_C11_LEGAL_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the medieval Islamic judicial hierarchy in India, which court operated at the provincial capital tier?',
    options: [
      'The Subah Court presided over by the Qazi-i-Subah',
      'The Pargana Court for village clusters',
      'The Sarkar Court at the district level',
      'The Mayor’s Court established under the Charter of 1726',
    ],
    correctIndex: 0,
    explanation: 'The medieval hierarchy rose from Pargana (village cluster) -> Sarkar (district) -> Subah (provincial) -> Adalat-i-Alia (Emperor’s Apex Court).',
    hints: [
      'Pargana was local, Sarkar was district.',
      'Subah represents the grand provincial province ruled by a Subahdar.',
      'The court at the province was the Subah Court.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_004_f_drag_label',
    nodeId: NODE_C11_LEGAL_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each British colonial landmark with its structural constitutional impact.',
    dragItems: [
      { label: 'Charter of 1726', targetId: 'target_1726' },
      { label: 'Regulating Act 1773', targetId: 'target_1773' },
      { label: 'Govt of India Act 1935', targetId: 'target_1935' },
    ],
    correctMapping: {
      target_1726: 'Charter of 1726',
      target_1773: 'Regulating Act 1773',
      target_1935: 'Govt of India Act 1935',
    },
    explanation: 'Charter of 1726 established Mayor’s Courts introducing English common law; Regulating Act 1773 created the Supreme Court at Calcutta; Govt of India Act 1935 supplied ~250 articles to our 1950 Constitution.',
    hints: [
      '1726 introduced Mayor’s courts across Presidencies.',
      '1773 created the Supreme Court at Calcutta under Warren Hastings.',
      '1935 was the structural blueprint containing the federal lists and emergency provisions.',
    ],
  },
  {
    id: 'ch_005_f_distinguish',
    nodeId: NODE_C11_LEGAL_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does John Austin’s Positivist School define Law, contrasting with the Natural Law school?',
    options: [
      'Law is the command of the unconstrained sovereign backed by threat of sanction, separate from morality',
      'Law is purely divine reason discoverable through meditation',
      'Law is whatever the jury votes by emotional instinct',
      'Law is an informal social handshake without state enforcement',
    ],
    correctIndex: 0,
    explanation: 'Austin’s analytical positivism asserts that law is the "command of the sovereign backed by sanction", strictly separating legal validity ("is") from moral righteousness ("ought").',
    hints: [
      'Think of command, sovereign, and penalty (sanction).',
      'Positivists focus on law as it IS, not as it ought to be.',
      'Austin rejects the idea that morality is required for legal validity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_006_f_recall',
    nodeId: NODE_C11_LEGAL_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who represents the prosecuting party in a criminal trial for grave offences in India?',
    options: [
      'The State, through an appointed Public Prosecutor under Section 24 CrPC',
      'The victim acting as the sole private plaintiff',
      'The village Panchayat elders without legal counsel',
      'A private arbitrator selected by the accused',
    ],
    correctIndex: 0,
    explanation: 'Criminal wrongs injure society at large. Therefore, the State steps in as prosecutor under Section 24 CrPC, while the victim is primarily a witness/informant.',
    hints: [
      'Crimes are regarded as offences against the whole public/state order.',
      'The lawyer representing the sovereign is the Public Prosecutor.',
      'The victim is a witness, not the controller of the criminal suit.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_007_f_recall',
    nodeId: NODE_C11_LEGAL_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the core distinction between a "Constitution" and "Constitutionalism"?',
    options: [
      'A Constitution is the written legal instrument; Constitutionalism is the philosophy of limited governance that checks arbitrary power',
      'A Constitution is British law; Constitutionalism is ancient Sanskrit law',
      'They are identical synonyms with no legal difference',
      'Constitutionalism means the military can dissolve courts anytime',
    ],
    correctIndex: 0,
    explanation: 'A Constitution is the foundational legal document, whereas Constitutionalism is the political/legal doctrine demanding that governmental power must be restrained by law to prevent tyranny.',
    hints: [
      'A country can have a written constitution on paper yet lack constitutionalism if rulers govern by arbitrary decree.',
      'Constitutionalism means "government of laws and not of men".',
      'One is the document, the other is the spirit of limitation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_008_f_numeric',
    nodeId: NODE_C11_LEGAL_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Approximately how many of the 395 Articles of the original 1950 Constitution of India were derived or adapted from the Government of India Act 1935?',
    correctAnswer: 250,
    tolerance: 10,
    unit: 'Articles',
    explanation: 'Approximately 250 of the original 395 Articles of the Indian Constitution drew structural inspiration from the Government of India Act 1935.',
    hints: [
      'It represents nearly two-thirds of the total articles.',
      'The number is roughly two hundred and fifty.',
      'Enter approximately 250.',
    ],
  },
  {
    id: 'ch_009_s_application',
    nodeId: NODE_C11_LEGAL_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farming community in coastal Odisha has continuously observed a customary rule for 220 years granting married daughters equal tenancy rights. A local landholder challenges this. Under classical Hindu jurisprudence on Achaara, how will the court decide?',
    options: [
      'The custom is valid because it is ancient, continuous, certain, and not contrary to morality or public policy',
      'The custom is instantly invalid because all customary practices were abolished by the Rig Veda',
      'The custom is void unless personally approved by the British Privy Council',
      'Only male heads of family may create valid community usages',
    ],
    correctIndex: 0,
    explanation: 'Achaara (custom) is a recognized source of law if it satisfies four tests: antiquity (ancient), continuity, certainty, and non-repugnance to public policy or justice.',
    hints: [
      'Recall the four essential tests for a valid custom.',
      'Over 200 years satisfies the requirement of ancient and continuous practice.',
      'Equal rights promote justice and are not opposed to public policy.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_010_s_distinguish',
    nodeId: NODE_C11_LEGAL_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the ancient Sreni (guild) courts operate as an early precursor to modern specialised commercial tribunals like the NCLT?',
    options: [
      'Sreni tribunals comprised trade peers with subject-matter expertise who swiftly adjudicated commercial contracts and wage disputes',
      'Sreni courts dealt exclusively with military espionage during wartime',
      'Sreni tribunals had no legal power and could only offer spiritual advice',
      'Sreni judges were appointed directly by the British East India Company',
    ],
    correctIndex: 0,
    explanation: 'Sreni (merchant/artisan guilds) and Gana tribunals provided specialized commercial dispute resolution through subject-matter experts, functioning exactly like modern tribunals (NCLT/Consumer Commissions).',
    hints: [
      'Think about commercial peers resolving trade disputes without traveling to the King’s apex court.',
      'Specialized subject expertise is the key similarity with modern tribunals.',
      'Guild courts adjudicated business, debts, quality of merchandise, and wages.',
    ],
  },
  {
    id: 'ch_011_s_application',
    nodeId: NODE_C11_LEGAL_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An indigent farmer in Mughal Delhi cannot afford to hire a legal representative before the Sarkar Court. Under the medieval Islamic legal administration, what institutional mechanism provided assistance?',
    options: [
      'The Mir Adl and Wazir’s department assigned an official Vakil at state expense to ensure access to justice',
      'The farmer was automatically imprisoned for filing an unauthorized dispute',
      'The farmer had to sell family land before being granted a hearing',
      'The dispute was permanently dismissed without remedy',
    ],
    correctIndex: 0,
    explanation: 'Medieval Islamic administration provided free legal aid through the office of Mir Adl and the Wazir, assigning Vakils to poor litigants, directly anticipating Article 39A and NALSA.',
    hints: [
      'Recall the discussion of early free legal aid in medieval India.',
      'The state assigned a Vakil (advocate) so poverty was not an absolute bar.',
      'Mir Adl handled administrative justice and indigent representation.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_012_s_analysis',
    nodeId: NODE_C11_LEGAL_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the famous Cossijurah Case (1779), what fatal structural defect of the Regulating Act 1773 was exposed?',
    options: [
      'The undefined jurisdiction of the Supreme Court at Calcutta, triggering direct conflict with the Governor-General’s executive council',
      'The total absence of any Governor-General in Bengal',
      'The prohibition of English common law across India',
      'The immediate merger of the East India Company into the Indian National Congress',
    ],
    correctIndex: 0,
    explanation: 'The Regulating Act 1773 failed to demarcate the Supreme Court’s jurisdiction versus the Governor-General’s Council, causing executive troops to confront the Sheriff in Cossijurah, solved by the Amending Act 1781.',
    hints: [
      'Think of jurisdictional ambiguity between judges and the executive council.',
      'Warren Hastings and Chief Justice Elijah Impey collided over who controlled revenue zamindars.',
      'The defect was undefined judicial vs executive jurisdiction.',
    ],
  },
  {
    id: 'ch_013_s_application',
    nodeId: NODE_C11_LEGAL_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Shreya Singhal v. Union of India (2015), why did the Supreme Court strike down Section 66A of the IT Act 2000?',
    options: [
      'The provision was vague and over-broad, creating a chilling effect on freedom of speech under Article 19(1)(a) without falling under 19(2) exceptions',
      'The IT Act had not been signed by the Chief Justice of India',
      'Online speech is completely immune from all criminal laws under international maritime law',
      'The statute was drafted in English instead of classical Sanskrit',
    ],
    correctIndex: 0,
    explanation: 'Section 66A was struck down under Article 13 because terms like "annoyance" and "grossly offensive" were excessively vague, violating free speech under Article 19(1)(a) without valid Article 19(2) tailoring.',
    hints: [
      'Look at freedom of speech and expression in Article 19(1)(a).',
      'Vague terms caused citizens to be arrested for harmless social media posts.',
      'The Court applied the doctrine of over-breadth and vagueness.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_014_s_evaluation',
    nodeId: NODE_C11_LEGAL_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In the Kulbhushan Jadhav Case (India v. Pakistan, ICJ 2019), on what jurisdictional foundation did the International Court of Justice order review of the death sentence?',
    options: [
      'Both nations had consented to the Optional Protocol to the Vienna Convention on Consular Relations 1963 granting ICJ jurisdiction',
      'The ICJ has automatic universal police power to overturn any domestic military verdict without state consent',
      'The UN Security Council unanimously abolished all Pakistani domestic courts in 2017',
      'India and Pakistan signed a full political merger treaty at The Hague',
    ],
    correctIndex: 0,
    explanation: 'ICJ jurisdiction is consensual. Both nations were signatories to the Vienna Convention on Consular Relations 1963 and its Optional Protocol, empowering the ICJ to find a breach of Article 36 consular access.',
    hints: [
      'Remember that International Law relies upon state consent (pacta sunt servanda).',
      'The Vienna Convention on Consular Relations 1963 contains an Optional Protocol for ICJ adjudication.',
      'Article 36 guarantees foreign detainees the right to communicate with their consulate.',
    ],
  },
  {
    id: 'ch_015_s_construct',
    nodeId: NODE_C11_LEGAL_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct chain of legal reasoning showing why a Hindu temple idol is recognized as a juristic person capable of owning property in India.',
    availableParts: [
      'Deity consecrated in temple',
      'Law confers legal personality (mask)',
      'Idol holds title to land',
      'Shebait acts as human manager/agent',
      'Shareholders take personal dividends',
    ],
    targetState: 'Deity consecrated in temple Law confers legal personality (mask) Idol holds title to land Shebait acts as human manager/agent',
    validationHint: 'Select the 4 steps representing the juristic idol doctrine established in Pramath Nath Mullick (1925), omitting corporate shareholder dividends.',
    explanation: 'As held in Pramath Nath Mullick (1925), a consecrated deity is draped with the mask of legal personality: the idol owns the dedicated endowment, while the human Shebait acts as trustee/manager.',
    hints: [
      'Start with the consecrated deity, add the legal mask of personality.',
      'Show that the idol holds property title and the Shebait acts as manager.',
      'Do not include corporate shareholder dividends!',
    ],
  },
  {
    id: 'ch_016_s_application',
    nodeId: NODE_C11_LEGAL_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Kabir, aged 16, is admitted to the benefits of an existing partnership firm with the consent of all partners under Section 30. When the firm incurs a Rs 10 Lakh debt, what is Kabir’s liability?',
    options: [
      'Kabir’s liability is strictly confined to his share in firm assets; his personal private property cannot be touched',
      'Kabir is personally bankrupt and must sell his personal books and bicycle to pay the debt',
      'Kabir is liable for the entire Rs 10 Lakh with unlimited joint liability',
      'Kabir loses his citizenship under Section 11 of the Contract Act',
    ],
    correctIndex: 0,
    explanation: 'Under Section 30 of the Indian Partnership Act 1932, a minor admitted to benefits enjoys profit shares, but their liability is limited strictly to their share in the firm property without personal liability.',
    hints: [
      'A minor is protected because they lack full contractual capacity (Section 11 Contract Act).',
      'The minor’s personal assets are shielded from creditors.',
      'Only the minor’s accumulated share in the firm can be applied toward debts.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_017_a_evaluation',
    nodeId: NODE_C11_LEGAL_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the ancient maxim "Dharma rakshati rakshitah" (Dharma protects those who uphold it) conceptually align with the modern Basic Structure Doctrine established in Kesavananda Bharati (1973)?',
    options: [
      'Both establish that sovereign governing bodies (King or Parliament) do not hold unlimited arbitrary power, but remain bound by supreme enduring legal principles',
      'Both require modern High Court judges to conduct trials by fire ordeal',
      'Both state that international law can never be cited in Indian courtrooms',
      'Both declare that written constitutions automatically expire every 50 years',
    ],
    correctIndex: 0,
    explanation: 'In Kesavananda Bharati (1973), the Supreme Court held that Parliament’s amending power under Art 368 cannot destroy the Constitution’s core identity — directly mirroring the classical principle that even the King is subordinate to Dharma.',
    hints: [
      'Look for the philosophical parallel regarding limitations on sovereign power.',
      'Neither the ancient Raja nor the modern Parliament is absolute above the foundational norm.',
      'This reflects constitutional supremacy and the rule of law across millennia.',
    ],
  },
  {
    id: 'ch_018_a_analysis',
    nodeId: NODE_C11_LEGAL_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Savigny’s Historical School ("Volksgeist") differ decisively from Roscoe Pound’s Sociological School ("Social Engineering") in explaining legal change?',
    options: [
      'Savigny views law as an organic, unconscious growth rooted in popular spirit and custom; Pound views law as a deliberate functional tool used by judges and legislators to balance competing societal interests',
      'Savigny believes only military dictators make law; Pound believes law comes from stars',
      'Savigny advocates instant statutory revolutions; Pound insists on zero parliamentary legislation',
      'There is no distinction; both were members of the First Law Commission under Macaulay',
    ],
    correctIndex: 0,
    explanation: 'Savigny (Historical) argued law cannot be manufactured overnight by decree because it develops organically from the people’s spirit (Volksgeist); Pound (Sociological) viewed law as purposeful "social engineering" balancing conflicting claims.',
    hints: [
      'Volksgeist means the organic "spirit of the people".',
      'Social engineering implies deliberate balancing of social interests through legislation.',
      'Savigny is organic/historical; Pound is functional/instrumental.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_019_a_evaluation',
    nodeId: NODE_C11_LEGAL_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An industrial company discharges toxic chemicals into a municipal river, causing acute respiratory distress to 400 citizens and poisoning aquatic life. Evaluate the simultaneous civil and criminal legal remedies available under Indian law.',
    options: [
      'Civil: Citizens sue for compensatory damages/injunction under Tort and NGT Act (preponderance of probability); Criminal: State prosecutes corporate officers under BNS/IPC and Water Act (beyond reasonable doubt)',
      'The company is immune because civil and criminal remedies can never arise from the same physical event',
      'Only the International Criminal Court at The Hague has jurisdiction over local river pollution',
      'The company pays a 100 rupee fine to the municipal ward and all claims extinguish',
    ],
    correctIndex: 0,
    explanation: 'A single act can generate dual liabilities: a civil proceeding (plaintiff vs defendant for compensation on preponderance of probabilities) and a criminal prosecution (State vs accused for punishment beyond reasonable doubt).',
    hints: [
      'Remember that one harmful act can harm private rights AND violate public safety laws.',
      'Civil seeks compensation/restoration; criminal seeks deterrence and punishment.',
      'Different standards of proof and parties apply concurrently.',
    ],
  },
  {
    id: 'ch_020_a_creativity',
    nodeId: NODE_C11_LEGAL_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'The High Court of Uttarakhand in Mohd. Salim (2017) declared Rivers Ganga and Yamuna to be "living human entities / juristic persons". Which jurisprudential theory of legal personality provides the strongest foundation for this ecological innovation?',
    options: [
      'The Realist Theory (Gierke) combined with the Purpose Theory — recognizing that ecological entities have vital collective reality and independent purpose requiring judicial protection through human guardians (loco parentis)',
      'The Austinian Command Theory — proving rivers issue oral commands backed by police batons',
      'The Bracket Theory — proving rivers are commercial partnerships registered under the 1932 Act',
      'The Roman Slavery Code �� treating rivers as chattel res without standing',
    ],
    correctIndex: 0,
    explanation: 'Extending legal personality to rivers leverages Realist and Purpose theories: recognizing an eco-system’s vital reality and dedicated purpose so that state custodians (parens patriae) can sue polluters on its behalf.',
    hints: [
      'Consider why courts give standing to non-humans: to protect their distinct purpose and collective reality.',
      'The river cannot speak, so the law designates human guardians.',
      'Realist/Purpose theories explain conferring personality beyond biological humans.',
    ],
  },
  {
    id: 'ch_021_a_application',
    nodeId: NODE_C11_LEGAL_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Vikram and Sneha run a registered medical supplies partnership in Pune. Sneha retires from the firm but fails to publish a public notice. Vikram continues to issue invoices bearing Sneha’s name. A supplier extends Rs 15 Lakh credit relying on Sneha’s creditworthiness. Is Sneha liable?',
    options: [
      'Yes, under the Doctrine of Holding-Out (Section 28), Sneha is liable because her failure to give public notice allowed third parties to reasonably believe she remained a partner',
      'No, because retiring partners are automatically immune from all past and future liabilities without notice',
      'No, because medical partnerships are exempt from the Indian Partnership Act 1932',
      'Yes, but only if the Supreme Court initiates criminal contempt proceedings against Sneha',
    ],
    correctIndex: 0,
    explanation: 'Under Section 28 and Section 32(3) of the Indian Partnership Act 1932, a retiring partner remains liable to third parties for subsequent acts of the firm unless public notice of retirement is issued (Doctrine of Holding-Out).',
    hints: [
      'Think of Section 28: representation to third parties.',
      'Third parties who rely on a person’s apparent partner status in good faith are protected.',
      'Giving public notice is mandatory to cut off ongoing implied authority and holding-out liability.',
    ],
  },
  {
    id: 'ch_022_a_distinguish',
    nodeId: NODE_C11_LEGAL_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does India’s constitutional mechanism under Article 253 synthesize the Monist and Dualist doctrines regarding international treaties?',
    options: [
      'India follows a dualist model where international treaties signed by the executive do not automatically alter domestic municipal law without implementing legislation by Parliament under Article 253, but courts apply customary international law that does not conflict with domestic law',
      'India is 100% strictly monist, meaning every UN speech instantly repeals Indian statutes without parliamentary vote',
      'India completely forbids any interaction with international organizations under Article 51',
      'Article 253 vests exclusive treaty enforcement power in the Governor of each State',
    ],
    correctIndex: 0,
    explanation: 'Under Article 253, India adopts a dualist approach for treaties: executive ratification requires Parliamentary legislation to become enforceable domestic law, while compatible customary international law is applied directly.',
    hints: [
      'Monism = automatic merger; Dualism = separate systems requiring legislative transformation.',
      'Look at Article 253: Parliament has exclusive power to enact laws implementing international treaties.',
      'See how Indian courts harmonize domestic statutes with international obligations.',
    ],
  },
  {
    id: 'ch_023_a_numeric',
    nodeId: NODE_C11_LEGAL_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under Section 30(5) of the Indian Partnership Act 1932, within how many months of attaining the age of majority (18 years) must a minor give public notice electing whether to become a full partner?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'months',
    explanation: 'Section 30(5) gives a minor exactly 6 months from attaining majority or from obtaining knowledge of their admission to benefits (whichever is later) to decide whether to become a partner.',
    hints: [
      'It is half of a calendar year.',
      'Count the months: exactly six months.',
      'Enter the number 6.',
    ],
  },
  {
    id: 'ch_024_a_creativity',
    nodeId: NODE_C11_LEGAL_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Imagine Parliament passes an Emergency Surveillance Act authorizing indefinite detention without trial and barring all High Courts from entertaining habeas corpus writs. How would the Supreme Court evaluate this statute today?',
    options: [
      'Strike down the statute as ultra vires Part III and the Basic Structure Doctrine, affirming that judicial review (Art 32/226) and the rule of law (Art 21) cannot be abrogated even by constitutional amendment',
      'Uphold the law immediately because Parliament has sovereign supremacy over all fundamental rights',
      'Refer the matter to the British Crown for colonial arbitration',
      'Dissolve the Supreme Court and establish military rule under the Regulating Act 1773',
    ],
    correctIndex: 0,
    explanation: 'Post-Kesavananda Bharati (1973) and Maneka Gandhi (1978), judicial review and personal liberty under Article 21 are non-negotiable basic structure elements. Any statute abolishing judicial review is unconstitutional.',
    hints: [
      'Recall the supremacy of the Basic Structure Doctrine.',
      'Articles 32 and 226 are fundamental pillars of Indian constitutionalism.',
      'The court acts as sentinel on the qui vive to strike down abusive statutes.',
    ],
  },
];

// ─── COMPONENT PROPS INTERFACE ───
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
  nodeId: NODE_C11_LEGAL_001,
  title: 'Historical Evolution & Foundations of Indian Jurisprudence',
  definition: 'An integrated study of the historical evolution of the Indian legal system from classical Hindu Dharma and ancient courts (Vyavahara), medieval Islamic administration and Qazi tribunals, through British colonial codification, to modern jurisprudence, civil vs criminal law distinctions, constitutional supremacy under Article 13, international sovereignty, corporate personality, and partnership law.',
  eli5: 'Think of Indian law as a great banyan tree that grew over 3,000 years. Its deep roots are ancient duties (Dharma) and local community councils; its trunk was shaped by medieval courts and colonial statutes; and its crown is our modern Constitution that protects everyone’s fundamental rights and limits arbitrary government power.',
  misconceptions: [
    {
      misconception: 'Dharma is merely religious ritual identical to modern statutory law.',
      correction: 'Dharma is an all-encompassing cosmic and ethical order of righteousness and duty. Only its enforceable social regulation corresponds to law; its scope is far broader than modern state legislation.',
    },
    {
      misconception: 'The King in ancient and medieval India was an absolute autocrat above all legal restraint.',
      correction: 'Under both ancient Hindu jurisprudence (Dharma) and medieval Islamic theory (Adl/Sharia), rulers were morally and legally bound by higher duties; tyrannical rulers were considered self-destroying.',
    },
    {
      misconception: 'The Supreme Court of India was created by the Regulating Act of 1773.',
      correction: 'The Regulating Act 1773 created the colonial Supreme Court at Calcutta (1774). The modern Supreme Court of India was established under Article 124 of the Constitution on 28 January 1950.',
    },
    {
      misconception: 'In a criminal trial, the injured victim is the opposing party controlling prosecution.',
      correction: 'Crimes are public wrongs against society; hence the State (through the Public Prosecutor) conducts the prosecution under Section 24 CrPC, while the victim is a witness/informant.',
    },
    {
      misconception: 'Sharing profits alone is conclusive proof of a legal partnership.',
      correction: 'As held in Cox v. Hickman and codified in Section 6 of the Partnership Act 1932, the decisive test is Mutual Agency ("acting for all"), not profit-sharing alone.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which ancient Sanskrit legal source literally means "that which is remembered"?',
      options: ['Shruti', 'Smriti', 'Achaara', 'Samhita'],
      correctIndex: 1,
    },
    {
      question: 'What was the lowest tier of the ancient Indian judicial hierarchy?',
      options: ['King’s Sabha', 'Pradeshika Court', 'Kulani (Village Council)', 'Sreni Guild Court'],
      correctIndex: 2,
    },
    {
      question: 'Who presided over the district-level court in medieval Mughal administration?',
      options: ['Qazi-i-Sarkar', 'Qazi-i-Pargana', 'Qazi-i-Subah', 'Mir Bakhshi'],
      correctIndex: 0,
    },
    {
      question: 'Which colonial statute introduced dyarchy in the provinces?',
      options: ['Regulating Act 1773', 'Govt of India Act 1919', 'Govt of India Act 1935', 'Indian High Courts Act 1861'],
      correctIndex: 1,
    },
    {
      question: 'Which jurisprudence school views law as a tool of "social engineering" balancing competing interests?',
      options: ['Natural School', 'Positivist School', 'Sociological School', 'Historical School'],
      correctIndex: 2,
    },
    {
      question: 'What is the required standard of proof in Indian civil suits?',
      options: ['Beyond Reasonable Doubt', 'Preponderance of Probabilities', 'Absolute Certainty', 'Judicial Guesswork'],
      correctIndex: 1,
    },
    {
      question: 'Which landmark Supreme Court case struck down Section 66A of the IT Act 2000?',
      options: ['Kesavananda Bharati (1973)', 'Shreya Singhal (2015)', 'Maneka Gandhi (1978)', 'Shah Bano (1985)'],
      correctIndex: 1,
    },
    {
      question: 'Which Privy Council ruling established the legal personality of a consecrated Hindu idol?',
      options: ['Salomon v. Salomon (1897)', 'Pramath Nath Mullick (1925)', 'Cox v. Hickman (1860)', 'Cossijurah Case (1779)'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student demonstrates deep understanding of Indian legal history, jurisprudential schools, constitutional review under Article 13, standards of proof, legal personality doctrines, and partnership relations inter-se.',
};

// ─── REAL WORLD ACTIVITY (SCENARIO COMPLETION) ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Amicus Curiae: Drafting a Constitutional Audit & Law Reform Brief',
  description: 'As your final task on the Law Reform Commission, synthesize what you have learned across the 10 nodes to audit a modern policy proposal.',
  steps: [
    '1. Choose a contemporary legal challenge (e.g., AI Liability, River Rights, or Social Media Regulation).',
    '2. Identify which jurisprudential school (Natural, Sociological, Positivist) should guide the policy.',
    '3. Apply the Article 13 Touchstone test: Does the proposal violate Fundamental Rights (Art 14, 19, 21)?',
    '4. Determine whether the regulatory agency operates under Civil or Criminal standards of proof.',
    '5. Conclude with how ancient community dispute resolution (Kulani/Sreni) can assist in reducing case backlogs.',
  ],
};

// ══════════════════════════════════════════════════════════════════
// ─── MAIN REACT COMPONENT ───
// ══════════════════════════════════════════════════════════════════
export function C11_LegalStudiesAncientIndiaHinduSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_LEGAL_001,
  title = DEFAULT_PROPS.title || 'Legal Studies Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['legal'] || { name: 'Legal Studies', emoji: '⚖️', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders / Toggles
  const [activeLegalSource, setActiveLegalSource] = useState<'shruti' | 'smriti' | 'achaara'>('shruti');
  const [ancientHierarchyTier, setAncientHierarchyTier] = useState<number>(0);
  const [selectedIslamicTier, setSelectedIslamicTier] = useState<string>('pargana');
  const [jurisprudenceSlider, setJurisprudenceSlider] = useState<number>(50); // 0=Strict Positivism -> 100=Natural Justice
  const [personalityTheory, setPersonalityTheory] = useState<'fiction' | 'concession' | 'realist' | 'bracket' | 'purpose'>('concession');
  const [standardOfProofSlider, setStandardOfProofSlider] = useState<number>(51); // 51% (civil) to 95% (criminal)
  const [statuteVaguenessSlider, setStatuteVaguenessSlider] = useState<number>(30); // for Section 66A test

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Audio FX States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [shakingOptionIndex, setShakingOptionIndex] = useState<number | null>(null);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT 3: REAL-TIME 2D CANVAS ANIMATION LOOP (JUSTICE SCALES) ───
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

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const tilt = Math.sin(frame * 0.04) * (jurisprudenceSlider - 50) * 0.2;

      // Stand
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, height - 10);
      ctx.lineTo(centerX, 25);
      ctx.stroke();

      // Fulcrum top
      ctx.fillStyle = '#a5b4fc';
      ctx.beginPath();
      ctx.arc(centerX, 25, 6, 0, Math.PI * 2);
      ctx.fill();

      // Beam
      const beamLength = 100;
      const leftY = 25 - tilt;
      const rightY = 25 + tilt;
      ctx.beginPath();
      ctx.moveTo(centerX - beamLength, leftY);
      ctx.lineTo(centerX + beamLength, rightY);
      ctx.stroke();

      // Left Pan (Natural Law / Rights)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX - beamLength, leftY + 20, 14, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#6ee7b7';
      ctx.beginPath();
      ctx.moveTo(centerX - beamLength, leftY);
      ctx.lineTo(centerX - beamLength, leftY + 20);
      ctx.stroke();

      // Right Pan (Sovereign Command / Positivism)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(centerX + beamLength, rightY + 20, 14, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fcd34d';
      ctx.beginPath();
      ctx.moveTo(centerX + beamLength, rightY);
      ctx.lineTo(centerX + beamLength, rightY + 20);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [jurisprudenceSlider]);

  // ─── EFFECT 4: AUTO-HINT INACTIVITY TIMER ───
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, hintCount, answerRevealed, showExplanation]);

  // ─── EFFECT 5: PERSIST LOCALSTORAGE ───
  useEffect(() => {
    if (typeof localStorage !== 'undefined' && scoreBreakdown.total > 0) {
      localStorage.setItem(`mastery_${nodeId}`, JSON.stringify({
        score: scoreBreakdown.correct,
        total: scoreBreakdown.total,
        masteryLevel,
        difficulty,
      }));
    }
  }, [scoreBreakdown, masteryLevel, difficulty, nodeId]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const showNextHint = useCallback(() => {
    const next = hintCount + 1;
    if (next <= 3 && challenge.hints[next - 1]) {
      setCurrentHint(challenge.hints[next - 1]);
      setShowHint(true);
      setHintCount(next);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[next - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    if (!correct) {
      setShakingOptionIndex(idx);
      setTimeout(() => setShakingOptionIndex(null), 500);
    }
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Brilliant insight! In ancient India, the King was bound by Dharma.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Let us uncover 3000 years of Indian jurisprudence.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now enter the Jurisprudence Sandbox. Test principles, sliders, and statutes freely with no grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your analytical legal reasoning to the test.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive analyzer to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (!correct) {
      setShakingOptionIndex(idx);
      setTimeout(() => setShakingOptionIndex(null), 500);
    }
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Outstanding observation!' : 'Review the visualization closely.');
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
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const current = sortArrangement.length === challenge.sortItems?.length
      ? sortArrangement
      : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(current) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      setShowConfetti(true);
      setShowExplanation(true);
      audioManager.play('success');
      speechManager.speak('Correct procedural sequence!');
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      audioManager.play('error');
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | string, optionIndex?: number) => {
    resetInactivityTimer();
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding legal reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      if (typeof optionIndex === 'number') {
        setShakingOptionIndex(optionIndex);
        setTimeout(() => setShakingOptionIndex(null), 500);
      }
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
        speechManager.speak('Let us review the statutory explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the Foundations of Indian Jurisprudence.');
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
    setShakingOptionIndex(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // Personalized Motivational Feedback Message based on error count
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return { message: 'PERFECT SCORE!', color: 'text-emerald-400', badge: 'bg-emerald-500/20 border-emerald-500/50', icon: '🌟' };
    if (errCount <= 3) return { message: 'Great work!', color: 'text-teal-400', badge: 'bg-teal-500/20 border-teal-500/50', icon: '👏' };
    if (errCount <= 7) return { message: 'Good effort!', color: 'text-amber-400', badge: 'bg-amber-500/20 border-amber-500/50', icon: '👍' };
    return { message: 'Do not give up — You WILL get this!', color: 'text-rose-400', badge: 'bg-rose-500/20 border-rose-500/50', icon: '💪' };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase">
                ISC Class 11 Legal Studies
              </span>
              <span className="text-xs text-slate-400">Section 1–3 Compendium</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigator Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs" role="tablist" aria-label="Learning phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(tab => (
            <motion.button
              key={tab}
              role="tab"
              aria-selected={phase === tab}
              aria-label={`Switch to ${tab} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(tab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                phase === tab
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span aria-hidden="true">🏛️</span> Narrative Case Study
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs md:text-sm text-indigo-200">
              💡 <strong>Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
              <span aria-hidden="true">🔍</span> Discovery Question (Ungraded Curiosity Hook)
            </h3>
            <p className="text-white text-base md:text-lg font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isWrongSelected = shakingOptionIndex === i;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={isWrongSelected ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-2 ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-800/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && (
                      <span className="font-bold text-base" aria-hidden="true">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓ Correct!' : '✗ Note:'}</span> {discoveryCorrect ? 'Dharma was supreme over the sovereign.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Begin interactive exploration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Begin Interactive Exploration <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-white mb-2">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-amber-400 text-sm mb-5 font-medium flex items-center gap-2">
                <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── STEP 0: THREE SOURCES OF ANCIENT HINDU LAW (SVG DIAGRAM 1) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'shruti' as const, title: '1. Shruti (Heard)', sub: 'Vedic Revelation', desc: 'Rig, Yajur, Sama, Atharva Vedas. Regarded as sacred divine revelation establishing cosmic truth (Rita).' },
                      { id: 'smriti' as const, title: '2. Smriti (Remembered)', sub: 'Human Legal Codes', desc: 'Manusmriti, Yajnavalkya Smriti, Narada Smriti. Practical codified rules governing duties and property.' },
                      { id: 'achaara' as const, title: '3. Achaara (Custom)', sub: 'Immemorial Usage', desc: 'Continuous community custom. Valid if ancient, certain, continuous, and not opposed to public morality.' },
                    ].map(src => (
                      <motion.button
                        key={src.id}
                        aria-label={`Select source: ${src.title}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveLegalSource(src.id);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          activeLegalSource === src.id
                            ? 'bg-indigo-950 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                            : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        <h4 className="font-bold text-white text-base">{src.title}</h4>
                        <span className="text-xs font-semibold text-indigo-300 block mb-1">{src.sub}</span>
                        <p className="text-xs text-slate-300">{src.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 1: Classical Hindu Legal Sources Ecosystem */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <svg viewBox="0 0 500 160" className="w-full max-w-lg h-36" role="img" aria-label="Diagram of Dharma and Ancient Hindu Legal Sources">
                      <title>Dharma Cosmic Order and Classical Legal Sources</title>
                      <circle cx="250" cy="80" r="50" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="250" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">DHARMA</text>
                      <text x="250" y="92" textAnchor="middle" fill="#a5b4fc" fontSize="10">Duty & Cosmic Law</text>

                      {/* Surrounding Nodes */}
                      <g className="cursor-pointer" tabIndex={0} role="button" aria-label="Shruti source node" onClick={() => setActiveLegalSource('shruti')}>
                        <circle cx="90" cy="80" r="35" fill={activeLegalSource === 'shruti' ? '#4f46e5' : '#1e293b'} stroke="#6366f1" strokeWidth="1.5" />
                        <text x="90" y="83" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">SHRUTI</text>
                      </g>

                      <g className="cursor-pointer" tabIndex={0} role="button" aria-label="Smriti source node" onClick={() => setActiveLegalSource('smriti')}>
                        <circle cx="250" cy="25" r="22" fill={activeLegalSource === 'smriti' ? '#4f46e5' : '#1e293b'} stroke="#6366f1" strokeWidth="1.5" />
                        <text x="250" y="28" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">SMRITI</text>
                      </g>

                      <g className="cursor-pointer" tabIndex={0} role="button" aria-label="Achaara custom node" onClick={() => setActiveLegalSource('achaara')}>
                        <circle cx="410" cy="80" r="35" fill={activeLegalSource === 'achaara' ? '#4f46e5' : '#1e293b'} stroke="#6366f1" strokeWidth="1.5" />
                        <text x="410" y="83" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">ACHAARA</text>
                      </g>

                      {/* Connectors */}
                      <line x1="125" y1="80" x2="200" y2="80" stroke="#6366f1" strokeDasharray="4" />
                      <line x1="300" y1="80" x2="375" y2="80" stroke="#6366f1" strokeDasharray="4" />
                      <line x1="250" y1="47" x2="250" y2="55" stroke="#6366f1" strokeDasharray="4" />
                    </svg>
                    <div className="text-xs text-slate-300 max-w-xs space-y-1">
                      <p className="font-bold text-indigo-400">Selected Source Active:</p>
                      <p className="text-slate-200 uppercase font-mono">{activeLegalSource}</p>
                      <p className="text-slate-400">
                        {activeLegalSource === 'shruti' && 'Shruti overrides Smriti in case of conflict; divine authority foundation.'}
                        {activeLegalSource === 'smriti' && 'Smritis provided practical 18 titles of litigation (Vyavaharapadas).'}
                        {activeLegalSource === 'achaara' && 'Custom can modify textual Smriti rules when proven immemorial and continuous.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 1: ANCIENT JUDICIAL HIERARCHY & VYAVAHARA (SVG DIAGRAM 2) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { index: 0, name: '1. Kulani (Village)', desc: 'Elders/Panchayat resolving local petty debts and family disputes' },
                      { index: 1, name: '2. Sreni (Guild)', desc: 'Merchant/craft tribunals resolving commercial contracts' },
                      { index: 2, name: '3. Pradeshika (Town)', desc: 'Town and provincial administrators hearing appeals' },
                      { index: 3, name: '4. King’s Sabha', desc: 'Apex sovereign tribunal for final decrees and grave offences' },
                    ].map(tier => (
                      <motion.button
                        key={tier.index}
                        aria-label={`Select judicial tier: ${tier.name}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setAncientHierarchyTier(tier.index);
                          audioManager.play('count');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          ancientHierarchyTier === tier.index
                            ? 'bg-indigo-900/80 border-indigo-500 font-bold text-white ring-2 ring-indigo-500/30'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <p className="font-bold mb-1">{tier.name}</p>
                        <p className="text-[11px] text-slate-400">{tier.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 2: Ancient Indian Court Hierarchy & 4 Stages of Vyavahara */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full h-32" role="img" aria-label="Ancient Indian Judicial Hierarchy and Procedural Pipeline">
                      <title>Ancient Vyavahara Civil Litigation Workflow</title>
                      {/* 4 Procedural Steps */}
                      <g>
                        {/* Step 1 */}
                        <rect x="20" y="20" width="120" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="80" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. Pratijna</text>
                        <text x="80" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">Plaint (Claim)</text>

                        {/* Arrow 1 */}
                        <path d="M 145 40 L 165 40 M 160 35 L 165 40 L 160 45" stroke="#818cf8" strokeWidth="2" fill="none" />

                        {/* Step 2 */}
                        <rect x="170" y="20" width="120" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="230" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">2. Uttara</text>
                        <text x="230" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">Written Reply</text>

                        {/* Arrow 2 */}
                        <path d="M 295 40 L 315 40 M 310 35 L 315 40 L 310 45" stroke="#818cf8" strokeWidth="2" fill="none" />

                        {/* Step 3 */}
                        <rect x="320" y="20" width="120" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="380" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">3. Kriya</text>
                        <text x="380" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">Trial / Evidence</text>

                        {/* Arrow 3 */}
                        <path d="M 445 40 L 465 40 M 460 35 L 465 40 L 460 45" stroke="#818cf8" strokeWidth="2" fill="none" />

                        {/* Step 4 */}
                        <rect x="470" y="20" width="110" height="40" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="525" y="38" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">4. Vidhana</text>
                        <text x="525" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">Final Decree</text>
                      </g>

                      {/* Hierarchy Indicator Bottom */}
                      <rect x="20" y="80" width="560" height="35" rx="6" fill="#0f172a" stroke="#334155" />
                      <text x="300" y="102" textAnchor="middle" fill="#e2e8f0" fontSize="11">
                        Active Appellate Tier: <tspan fill="#38bdf8" fontWeight="bold">{ancientHierarchyTier === 0 ? 'Kulani (Village)' : ancientHierarchyTier === 1 ? 'Sreni (Guild Tribunal)' : ancientHierarchyTier === 2 ? 'Pradeshika (Provincial Court)' : 'King’s Sabha (Sovereign Apex)'}</tspan>
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── STEP 2: MEDIEVAL ISLAMIC JUDICIAL HIERARCHY (SVG DIAGRAM 3) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'pargana', name: 'Pargana Court', judge: 'Qazi-i-Pargana', level: 'Village Cluster Tier' },
                      { id: 'sarkar', name: 'Sarkar Court', judge: 'Qazi-i-Sarkar', level: 'District Tier' },
                      { id: 'subah', name: 'Subah Court', judge: 'Qazi-i-Subah', level: 'Provincial Capital Tier' },
                      { id: 'emperor', name: 'Adalat-i-Alia', judge: 'Sultan / Padshah', level: 'Imperial Apex Court' },
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        aria-label={`Select Islamic Court tier: ${item.name}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedIslamicTier(item.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          selectedIslamicTier === item.id
                            ? 'bg-amber-950/80 border-amber-500 font-bold text-amber-200 ring-2 ring-amber-500/30'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <p className="font-bold text-sm text-white mb-0.5">{item.name}</p>
                        <p className="text-amber-400 text-xs">{item.judge}</p>
                        <p className="text-[10px] text-slate-400">{item.level}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 3: Medieval Mughal Judicial Pyramid & Vakil Legal Aid */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 140" className="w-full h-36" role="img" aria-label="Medieval Islamic 4-Tier Judicial Hierarchy in India">
                      <title>Mughal Judicial Pyramid & Legal Aid System</title>
                      {/* Pyramid Tiers */}
                      <polygon points="300,15 390,45 210,45" fill={selectedIslamicTier === 'emperor' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="300" y="38" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">Apex: Adalat-i-Alia</text>

                      <polygon points="210,48 390,48 440,78 160,78" fill={selectedIslamicTier === 'subah' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="300" y="68" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">Provincial: Subah Court (Qazi-i-Subah)</text>

                      <polygon points="160,81 440,81 490,108 110,108" fill={selectedIslamicTier === 'sarkar' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="300" y="99" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">District: Sarkar Court (Qazi-i-Sarkar)</text>

                      <polygon points="110,111 490,111 540,135 60,135" fill={selectedIslamicTier === 'pargana' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="300" y="126" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">Cluster: Pargana Court (Qazi-i-Pargana)</text>
                    </svg>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                        <span aria-hidden="true">⛺</span> Qazi-i-Aksar (Mobile Military Court)
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Accompanied the army on campaign, ensuring troops and camp followers had instant access to justice even in transit.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                        <span aria-hidden="true">⚖️</span> Medieval Free Legal Aid (Mir Adl & Vakils)
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Assigned official Vakils to indigent litigants at state expense, directly anticipating Article 39A and NALSA!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: 5 SCHOOLS OF JURISPRUDENCE & STATUTE TOUCHSTONE ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Positivism (Austin / Bentham: Sovereign Command)</span>
                      <span>Natural Law (Aquinas / Locke: Moral Reason)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={jurisprudenceSlider}
                      aria-label="Jurisprudence philosophy balance slider"
                      onChange={e => {
                        setJurisprudenceSlider(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500"
                    />

                    <div className="flex items-center justify-between">
                      <canvas ref={canvasRef} width={280} height={70} className="rounded-lg bg-slate-900 border border-slate-800" aria-label="Animated scales of justice" />
                      <div className="text-xs text-right text-slate-300 space-y-1 max-w-xs">
                        <p className="font-bold text-indigo-400">Jurisprudential Emphasis:</p>
                        <p className="font-mono text-white">
                          {jurisprudenceSlider < 40 ? 'Positivist: Law as Sovereign Command (IPC 1860)' :
                           jurisprudenceSlider > 60 ? 'Natural Law: Moral Justice & Fundamental Rights (Art 21)' :
                           'Harmonized: Sociological & Realist Balance (Roscoe Pound)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Predict-then-Check: Article 13 Touchstone */}
                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2">Predict-Then-Check: Article 13 Touchstone Test</h4>
                    {!predictionMade ? (
                      <div className="space-y-2">
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs border border-slate-700 text-slate-300"
                            >
                              <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span> {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs space-y-2">
                        <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <span>✓ Verified:</span> Under Article 13(2), any statute inconsistent with Fundamental Rights is void and struck down by Constitutional Courts (e.g., Shreya Singhal 2015 striking Section 66A IT Act)!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 4: LEGAL PERSONALITY & PARTNERSHIP AGENCY ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'concession' as const, name: 'Concession Theory', desc: 'Personality is a grant by the sovereign State (Companies Act 2013 registration)' },
                      { id: 'fiction' as const, name: 'Fiction Theory (Savigny)', desc: 'Only humans are real; non-human legal personality is a juristic fiction' },
                      { id: 'realist' as const, name: 'Realist Theory (Gierke)', desc: 'Corporate groups possess real, independent collective will' },
                      { id: 'purpose' as const, name: 'Purpose Theory', desc: 'Personality belongs to distinct, dedicated legal endowments/purposes' },
                      { id: 'bracket' as const, name: 'Bracket Theory (Ihering)', desc: 'The corporate form is a bracket around the real human members' },
                    ].map(t => (
                      <motion.button
                        key={t.id}
                        aria-label={`Select personality theory: ${t.name}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setPersonalityTheory(t.id);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-2 rounded-xl text-xs border font-medium transition-all ${
                          personalityTheory === t.id
                            ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        {t.name}
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive Partnership Mutual Agency Sandbox Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider block">
                      Section 4 Partnership Mutual Agency & Implied Authority (Sec 19)
                    </span>
                    <p className="text-slate-300">
                      "A business carried on by all or any of them acting for all." Each partner is both principal and agent.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-lg">
                        <span className="font-bold text-emerald-300">✓ Implied Authority (Sec 19)</span>
                        <p className="text-slate-300 text-[11px] mt-0.5">Purchasing stock, paying debts, hiring shop employees in normal trade.</p>
                      </div>
                      <div className="p-2.5 bg-rose-950/40 border border-rose-700/50 rounded-lg">
                        <span className="font-bold text-rose-300">✗ Prohibited Acts (Sec 19(2))</span>
                        <p className="text-slate-300 text-[11px] mt-0.5">Acquiring immovable property, opening bank account in personal name, submitting to arbitration.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Exploration Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous Step
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox 🚀
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX (NO PRESSURE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-white">Jurisprudence & Statutory Simulation Sandbox</h2>
                <p className="text-xs text-slate-400">Manipulate variables across Ancient, Medieval, Constitutional, and Commercial Law without grading.</p>
              </div>
              <motion.button
                aria-label="Advance to Challenge Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 text-sm"
              >
                Ready for Challenges <span>→</span>
              </motion.button>
            </div>

            {/* Sub-Sandbox Controllers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Controller 1: Civil vs Criminal Standard of Proof */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-300 uppercase">Standard of Proof Gauge</span>
                  <span className="text-xs font-mono text-amber-400">{standardOfProofSlider}% Probability</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={99}
                  value={standardOfProofSlider}
                  aria-label="Standard of proof probability slider"
                  onChange={e => {
                    setStandardOfProofSlider(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-indigo-500"
                />
                <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-white">
                    {standardOfProofSlider <= 60
                      ? '⚖️ Civil Law: Preponderance of Probabilities (>50%)'
                      : standardOfProofSlider >= 90
                      ? '🔒 Criminal Law: Beyond Reasonable Doubt (~95%+)'
                      : '🔄 Transition Zone (Quasi-Criminal / Administrative Proceedings)'}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {standardOfProofSlider <= 60
                      ? 'Governed by CPC 1908 & Evidence Act Sec 101. Plaintiff vs Defendant for compensation/restitution.'
                      : 'Governed by CrPC 1973 & BNS. State vs Accused to safeguard personal liberty under Article 21.'}
                  </p>
                </div>
              </div>

              {/* Controller 2: Constitutional Touchstone (Art 13 Vagueness Meter) */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-300 uppercase">Article 13 Vagueness & Over-breadth Meter</span>
                  <span className="text-xs font-mono text-rose-400">{statuteVaguenessSlider}% Vagueness</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={statuteVaguenessSlider}
                  aria-label="Article 13 statutory vagueness slider"
                  onChange={e => {
                    setStatuteVaguenessSlider(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-rose-500"
                />
                <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                  <p className={`font-bold flex items-center gap-1.5 ${statuteVaguenessSlider > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    <span>{statuteVaguenessSlider > 50 ? '✗' : '✓'}</span>
                    {statuteVaguenessSlider > 50
                      ? 'Struck Down under Article 13: Unconstitutional (Vague / Chilling Free Speech)'
                      : 'Constitutional: Saved by Narrow Interpretation or Read Down under Art 19(2)'}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {statuteVaguenessSlider > 50
                      ? 'Shreya Singhal (2015) landmark: Section 66A IT Act struck down for indefiniteness.'
                      : 'Subramanian Swamy (2016): Section 499 IPC upheld as reasonable restriction.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Observation Question in Sandbox */}
            <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
              <h4 className="text-xs font-bold text-amber-300 uppercase mb-2">Observation Question</h4>
              <p className="text-xs text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => {
                  const isWrongSelected = shakingOptionIndex === i;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Observation option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={isWrongSelected ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleObservation(i)}
                      className={`text-left p-2.5 rounded-lg text-xs border transition-all flex items-start gap-1.5 ${
                        observationAnswered
                          ? i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      <span className="flex-1">{opt}</span>
                      {observationAnswered && (
                        <span className="font-bold" aria-hidden="true">
                          {i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono">Node: {challenge.nodeId}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">Competency: {challenge.competencyLevel.toUpperCase()}</h3>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                    : 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <div className="text-xs text-slate-400 font-mono">
                Mastery: <strong className="text-white capitalize">{masteryLevel}</strong>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Main Challenge Card with Visual Shake/Flash */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/50 shadow-xl'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-lg md:text-xl font-medium text-white mb-6 leading-snug">{challenge.question}</p>

            {/* ── MCQ TYPES: CLASSIFY, DISTINGUISH, MATCH ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => {
                  const isOptionShaking = shakingOptionIndex === i;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={isOptionShaking ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i, i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl border text-sm md:text-base transition-all flex items-start gap-3 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-md'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && (
                        <span className="font-bold text-base" aria-hidden="true">
                          {i === challenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── DRAG-LABEL TYPE ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold uppercase w-full mb-1">Drag Labels Palette:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'target_1726', title: 'Mayor’s Courts & English Law', sub: 'Charter of 1726' },
                    { id: 'target_1773', title: 'Supreme Court at Calcutta', sub: 'Regulating Act 1773' },
                    { id: 'target_1935', title: '~250 Articles of 1950 Constitution', sub: 'Govt of India Act 1935' },
                  ].map(target => (
                    <div
                      key={target.id}
                      role="region"
                      aria-label={`Drop target for ${target.title}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 transition-all text-center min-h-[100px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-slate-400 mb-1">{target.title}</span>
                      <span className="text-sm font-bold text-amber-300">
                        {droppedLabels[target.id] || 'Drop Statute Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Statute Mappings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* ── DRAG-SORT TYPE ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click to re-order the procedural sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(i => challenge.sortItems![i])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Reorderable step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm cursor-grab flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Submit ordered procedural sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md mt-2"
                >
                  Submit Ordered Sequence →
                </motion.button>
              </div>
            )}

            {/* ── NUMERIC TYPE ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter numeric answer"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-slate-400 font-semibold">{challenge.unit}</span>
                </div>
                <motion.button
                  aria-label="Verify numeric input"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Verify Number →
                </motion.button>
              </div>
            )}

            {/* ── CONSTRUCT TYPE ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold uppercase w-full mb-1">Available Building Blocks:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs italic">Click the building blocks above in sequential order...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed doctrine chain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-40"
                >
                  Verify Constructed Doctrine →
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE DISCLOSURE EXPLANATION CARD ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/90 to-slate-900 rounded-2xl border border-indigo-700/60 shadow-xl space-y-4"
              >
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <span aria-hidden="true">📜</span> Step-by-Step Legal Reasoning Walkthrough:
                </h4>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-slate-200 text-sm leading-relaxed"
                      >
                        <strong className="text-indigo-400 mr-2">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next explanation step"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step <span>↓</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to next challenge or final mastery"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery 🏁' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Completion Header Card with Personalized Motivational Feedback */}
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Curriculum Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BADGE */}
            {(() => {
              const feedback = getMotivationalFeedback(errors);
              return (
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-lg font-black uppercase tracking-wide ${feedback.badge} ${feedback.color} mx-auto shadow-lg`}>
                  <span aria-hidden="true">{feedback.icon}</span>
                  <span>{feedback.message}</span>
                </div>
              );
            })()}

            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base">
              You have successfully traversed ancient Dharma, Islamic Adalat tribunals, colonial codification, constitutional touchstones, and commercial jurisprudence.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4 text-center">
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Errors Corrected</span>
                <span className="text-2xl font-black text-amber-400">{errors}</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Review Schedule</span>
                <span className="text-2xl font-black text-teal-400">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </span>
              </div>
            </div>
          </div>

          {/* Misconceptions Remediation Profile */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Personalized Misconceptions Remediation Profile
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="font-bold text-rose-400 flex items-center gap-1.5">
                        <span aria-hidden="true">✗</span> Misconception: {m.misconception}
                      </p>
                      <p className="text-emerald-300 flex items-center gap-1.5">
                        <span aria-hidden="true">✓</span> Accurate Legal Principle: {m.correction}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Scenario Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">📝</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM FLOATING FEEDBACK FX ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_LegalStudiesAncientIndiaHinduSim;