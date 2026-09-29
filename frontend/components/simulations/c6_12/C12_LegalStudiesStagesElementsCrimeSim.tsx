'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (Named Constants) ───
const NODE_C12_LEGAL_001 = 'c12_legal_001';
const NODE_C12_LEGAL_002 = 'c12_legal_002';
const NODE_C12_LEGAL_003 = 'c12_legal_003';
const NODE_C12_LEGAL_004 = 'c12_legal_004';
const NODE_C12_LEGAL_005 = 'c12_legal_005';
const NODE_C12_LEGAL_006 = 'c12_legal_006';
const NODE_C12_LEGAL_007 = 'c12_legal_007';
const NODE_C12_LEGAL_008 = 'c12_legal_008';
const NODE_C12_LEGAL_009 = 'c12_legal_009';
const NODE_C12_LEGAL_010 = 'c12_legal_010';

const ALL_NODE_IDS = [
  NODE_C12_LEGAL_001,
  NODE_C12_LEGAL_002,
  NODE_C12_LEGAL_003,
  NODE_C12_LEGAL_004,
  NODE_C12_LEGAL_005,
  NODE_C12_LEGAL_006,
  NODE_C12_LEGAL_007,
  NODE_C12_LEGAL_008,
  NODE_C12_LEGAL_009,
  NODE_C12_LEGAL_010,
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'What happens to criminal culpability if Mens Rea is 100% (malice aforethought) but Actus Reus is 0% (pure internal thought)?',
    options: [
      'Full criminal liability under Section 302 IPC',
      'No punishable crime because mere intention lacks overt actus reus',
      'Civil tort liability with mandatory statutory fine',
      'Attempt liability under Section 511 IPC',
    ],
    correctIndex: 1,
    predictionExplanation: 'Under the foundational maxim "Actus non facit reum nisi mens sit rea", thoughts alone are never punished under Indian criminal law without an overt prohibited act or omission.',
    verifyInstruction: 'In Lab 1, drag the Mens Rea slider to 100% and Actus Reus slider to 0% to verify how the Scale of Justice determines liability!',
  },
  {
    id: 'pred_2',
    question: 'If a high-speed intoxicated driver causes death without direct intention to kill, can the prosecution frame charges under Section 304 Part II rather than Section 304A?',
    options: [
      'No, without premeditated intention it can only ever be Section 304A negligence',
      'Yes, subjective knowledge of extreme fatal hazard satisfies Section 304 Part II culpable homicide',
      'No, drunken driving is completely exempt from substantive criminal charges',
      'Yes, but only if the incident occurred on a National Highway',
    ],
    correctIndex: 1,
    predictionExplanation: 'Subjective knowledge of dangerous consequences elevates rash conduct from simple Section 304A negligence to Section 304 Part II culpable homicide not amounting to murder (Alistair Pereira precedent).',
    verifyInstruction: 'Go to the Jurisprudence Sandbox and select "Section 304 Part II" under Defense Arguments to verify the High Court ruling!',
  },
];

// ─── OBSERVATION QUESTIONS (What-Do-You-Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observe the Four Stages of Crime timeline in Lab 2. At which developmental stage does statutory penal liability first attach under the IPC?',
    options: [
      'Stage 1: Intention (Mental Formulation)',
      'Stage 2: Preparation (Arranging Means)',
      'Stage 3: Attempt (Direct Overt Movement under Sec 511)',
      'Stage 4 only: Completed Accomplishment',
    ],
    observableOptions: [
      'Stage 1: Intention (Mental Formulation)',
      'Stage 2: Preparation (Arranging Means)',
      'Stage 3: Attempt (Direct Overt Movement under Sec 511)',
      'Stage 4 only: Completed Accomplishment',
    ],
    correctIndex: 2,
    explanation: 'The timeline illustrates that Stages 1 & 2 are in the non-punishable green zone (unless specific statutory exceptions apply), whereas Stage 3 (Attempt) crosses the threshold into statutory criminality under Section 511 IPC.',
  },
  {
    id: 'obs_2',
    question: 'Observe the Legal Aid Access Gate in Lab 4. What happens to a female applicant\'s eligibility when her annual income is adjusted to Rs. 10 Lakhs?',
    options: [
      'She immediately becomes ineligible due to the Rs. 3 Lakh income ceiling',
      'She remains fully eligible because Section 12(c) exempts all women regardless of income',
      'She must pay a 50% surcharge to the DLSA panel advocate',
      'Her case is compulsorily transferred to private commercial arbitration',
    ],
    observableOptions: [
      'She immediately becomes ineligible due to the Rs. 3 Lakh income ceiling',
      'She remains fully eligible because Section 12(c) exempts all women regardless of income',
      'She must pay a 50% surcharge to the DLSA panel advocate',
      'Her case is compulsorily transferred to private commercial arbitration',
    ],
    correctIndex: 1,
    explanation: 'Under Section 12(c) of the Legal Services Authorities Act, 1987, women and children enjoy categorical eligibility for free legal aid irrespective of their financial status or annual income.',
  },
];

// ��── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Chambers of the High Court Advocate: Master of Jurisprudence',
  intro: 'You are an apprentice judicial clerk at the Supreme Court of India & Delhi High Court chambers. Fresh dossiers have arrived: homicide vs manslaughter trials, corporate contract disputes, environmental tribunal matters, and PIL legal aid petitions.',
  context: 'Your senior advocate demands rigorous statutory analysis, constitutional grounding under Article 39A, Indian Penal Code distinctions, and ADR strategies before taking these landmark briefs into court.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Ramesh purchases rat poison and keeps it in his locked cabinet intending to poison his business rival next month. He has taken no other step. Has Ramesh committed a punishable offence under the Indian Penal Code, 1860?',
  options: [
    'Yes — having the intention to murder is punishable with life imprisonment',
    'Yes — purchasing poison is punishable as the stage of preparation under Section 511',
    'No — mere intention and preparation are generally not punishable under Indian criminal law',
    'Yes — this constitutes an attempted murder under Section 307 IPC',
  ],
  correctIndex: 2,
  hintAfter: 'Remember: Criminal liability requires passing beyond intention and preparation into an overt attempt or accomplishment, unless a specific statutory exception applies!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_legal_001)
  {
    id: 'ch_001_mens_rea',
    nodeId: NODE_C12_LEGAL_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fundamental Latin maxim establishing that an act alone does not constitute guilt without a guilty mental state?',
    options: [
      'Volenti non fit injuria',
      'Actus non facit reum nisi mens sit rea',
      'Pacta sunt servanda',
      'Ex turpi causa non oritur actio',
    ],
    correctIndex: 1,
    explanation: '"Actus non facit reum nisi mens sit rea" means the act does not make a person guilty unless the mind is also guilty. This requires the concurrence of Mens Rea (mental element) and Actus Reus (physical conduct).',
    hints: [
      'Look for the phrase containing both "actus" (act) and "mens" (mind).',
      'It affirms that physical conduct must be accompanied by blameworthy intent or recklessness.',
      'The maxim begins with "Actus non facit reum...".',
    ],
    misconceptionIndex: 2,
  },

  // 2. Foundation - Drag Label: 4 Stages of Crime (c12_legal_001)
  {
    id: 'ch_002_stages_drag',
    nodeId: NODE_C12_LEGAL_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each stage of crime to its correct developmental stage on the timeline.',
    dragItems: [
      { label: 'Intention', targetId: 'stage_1' },
      { label: 'Preparation', targetId: 'stage_2' },
      { label: 'Attempt', targetId: 'stage_3' },
      { label: 'Accomplishment', targetId: 'stage_4' },
    ],
    correctMapping: {
      stage_1: 'Intention',
      stage_2: 'Preparation',
      stage_3: 'Attempt',
      stage_4: 'Accomplishment',
    },
    explanation: 'The four sequential stages of crime are: 1. Intention (mental formation), 2. Preparation (gathering means), 3. Attempt (direct overt act towards commission punishable under Sec 511), and 4. Accomplishment (completed harm).',
    hints: [
      'The process begins purely in the human mind.',
      'After the idea, the perpetrator gathers tools before taking direct action.',
      'Attempt comes third, right before the crime is actually accomplished.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Understanding (c12_legal_002)
  {
    id: 'ch_003_inchoate_def',
    nodeId: NODE_C12_LEGAL_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does Indian criminal law punish inchoate crimes such as criminal conspiracy (Sec 120A) and attempt (Sec 511) even if no actual harm occurred?',
    options: [
      'Because all moral sins are automatically criminalized under the IPC',
      'Because the offender has demonstrated culpable dangerous intent and taken active steps toward harm',
      'Because inchoate crimes are civil torts with mandatory fines',
      'Because the police have unrestricted discretion to prosecute thoughts',
    ],
    correctIndex: 1,
    explanation: 'Inchoate means incomplete or just begun. The law punishes inchoate offences preventively and retributively because the culpable mental state has manifested in dangerous overt acts or agreements threatening societal peace.',
    hints: [
      'Think about public safety and preventing crimes before victims are hurt.',
      'The offender crossed the boundary from harmless thought into dangerous action.',
      'Choice 2 accurately reflects preventive criminal jurisprudence.',
    ],
    misconceptionIndex: 0,
  },

  // 4. Foundation - Recall: Article 39A (c12_legal_008)
  {
    id: 'ch_004_art39a_recall',
    nodeId: NODE_C12_LEGAL_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Constitutional Amendment inserted Article 39A directing the State to provide free legal aid and promote equal justice?',
    options: [
      '24th Amendment Act, 1971',
      '42nd Amendment Act, 1976',
      '44th Amendment Act, 1978',
      '86th Amendment Act, 2002',
    ],
    correctIndex: 1,
    explanation: 'Article 39A was inserted into the Directive Principles of State Policy by the 42nd Constitutional Amendment Act, 1976, creating a constitutional imperative for accessible justice.',
    hints: [
      'It was the major mini-constitution amendment enacted during 1976.',
      'It inserted several Directive Principles along with Fundamental Duties.',
      'Select the 42nd Amendment Act, 1976.',
    ],
  },

  // 5. Foundation - Understanding: Valid Contract Essentials (c12_legal_009)
  {
    id: 'ch_005_contract_sec10',
    nodeId: NODE_C12_LEGAL_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Section 10 of the Indian Contract Act, 1872, which of the following is NOT a mandatory statutory requirement for a valid contract?',
    options: [
      'Free consent of parties competent to contract',
      'Lawful consideration and lawful object',
      'Equal financial value exchanged (adequacy of consideration)',
      'Agreement not expressly declared to be void',
    ],
    correctIndex: 2,
    explanation: 'Under Indian law (Chinnaya v. Ramayya, 1882), consideration must be real and lawful, but need NOT be adequate. Parties are free to set their own bargain value so long as consent is free.',
    hints: [
      'Consideration must exist, but does a court measure if Rs. 10 is equal to a book worth Rs. 500?',
      'Adequacy of consideration is not required for contract validity.',
      'Party autonomy permits unequal exchanges provided consent is uncoerced.',
    ],
    misconceptionIndex: 3,
  },

  // 6. Foundation - Drag Sort: Hierarchy of Legal Services (c12_legal_008)
  {
    id: 'ch_006_legal_aid_sort',
    nodeId: NODE_C12_LEGAL_008,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the Legal Services Authorities in descending hierarchical order (Apex to Grassroots).',
    sortItems: [
      'National Legal Services Authority (NALSA - CJI as Patron-in-Chief)',
      'State Legal Services Authority (SLSA - High Court Chief Justice)',
      'District Legal Services Authority (DLSA - District Judge)',
      'Taluka Legal Services Committee (Senior Civil Judge)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The three-tier institutional structure established under the Legal Services Authorities Act, 1987 flows from NALSA at the national apex, to SLSA at the state level, DLSA at district level, down to Taluka committees.',
    hints: [
      'National body is at the very top.',
      'State follows national, then district, then taluka/sub-divisional.',
      'The current order 0 -> 1 -> 2 -> 3 represents apex to grassroots.',
    ],
  },

  // 7. Foundation - Distinguish: Coercion vs Undue Influence (c12_legal_010)
  {
    id: 'ch_007_coercion_vs_undue',
    nodeId: NODE_C12_LEGAL_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary difference between Coercion (Section 15) and Undue Influence (Section 16) under the Indian Contract Act?',
    options: [
      'Coercion is purely financial whereas Undue Influence requires physical imprisonment',
      'Coercion involves physical threat or committing an IPC offence; Undue Influence involves moral/mental domination exploiting a fiduciary relation',
      'Coercion makes a contract valid whereas Undue Influence makes it void ab initio',
      'There is no legal difference in Indian jurisprudence',
    ],
    correctIndex: 1,
    explanation: 'Coercion (Sec 15) is physical or threat-based compulsion committing or threatening an IPC offence. Undue Influence (Sec 16) is psychological/moral domination where one party in a position of trust or authority dominates the will of the other.',
    hints: [
      'Think gun to head vs spiritual guru dominating a devotee.',
      'One relies on physical terror/criminal acts, the other on relational dominance.',
      'Section 15 is physical/threat, Section 16 is relational/moral domination.',
    ],
  },

  // 8. Standard - Application: Motive vs Intention (c12_legal_001)
  {
    id: 'ch_008_motive_apply',
    nodeId: NODE_C12_LEGAL_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Anand poisons his uncle to inherit his ancestral tea estate in Assam. In criminal analysis, what are the intention and motive?',
    options: [
      'Intention is to inherit the tea estate; Motive is to cause death',
      'Intention is to cause death; Motive is to inherit the tea estate',
      'Both intention and motive are identical: financial greed',
      'Motive is an essential statutory ingredient of Section 300 IPC murder',
    ],
    correctIndex: 1,
    explanation: 'Intention is the immediate aim/purpose to bring about a consequence (causing death). Motive is the ulterior emotional reason or desire driving that intention (inheriting the estate). Motive is relevant under Section 8 Evidence Act, but intention is the statutory ingredient.',
    hints: [
      'Intention = the direct aim of the physical act (death).',
      'Motive = the "why" / background reason (inheriting wealth).',
      'Select option 2: Intention is to cause death; Motive is to inherit.',
    ],
    misconceptionIndex: 0,
  },

  // 9. Standard - Application: Culpable Homicide vs Murder (c12_legal_003)
  {
    id: 'ch_009_virsa_singh',
    nodeId: NODE_C12_LEGAL_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Virsa Singh v. State of Punjab (1958), the Supreme Court established the four-step test for Section 300 clause (c) IPC. If an accused intentionally inflicts a bodily injury that is sufficient in the ordinary course of nature to cause death, what offence is committed?',
    options: [
      'Simple Hurt under Section 323 IPC',
      'Causing death by negligence under Section 304A IPC',
      'Murder under Section 302 IPC (unless an Exception to Section 300 applies)',
      'Grievous Hurt on provocation under Section 335 IPC',
    ],
    correctIndex: 2,
    explanation: 'Under the Virsa Singh rule: 1. Prove bodily injury, 2. Prove nature of injury is sufficient in the ordinary course of nature to cause death, 3. Prove intention to inflict that particular injury. Once met, it is Murder under Sec 300(c) punishable under Sec 302 IPC.',
    hints: [
      'Section 300 clause (c) directly defines this form of culpable homicide as murder.',
      'If the intended injury is medically sufficient to cause death, it falls under Murder.',
      'The landmark ruling classified this squarely as Murder under Section 302.',
    ],
  },

  // 10. Standard - Numeric: Dowry Death Statutory Timeline (c12_legal_003)
  {
    id: 'ch_010_dowry_numeric',
    nodeId: NODE_C12_LEGAL_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 304B of the Indian Penal Code and Section 113B of the Indian Evidence Act, what is the maximum number of years from marriage within which an unnatural death of a woman subjected to dowry cruelty triggers the statutory presumption of dowry death?',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'years',
    explanation: 'Section 304B IPC mandates that the death of a woman must occur within 7 years of marriage by burns, bodily injury, or unnatural circumstances with proof of cruelty for dowry "soon before death".',
    hints: [
      'Think of the seven-year statutory period enacted in the 1983/1986 amendments.',
      'It is greater than 5 and less than 10 years.',
      'The exact statutory number is 7 years.',
    ],
  },

  // 11. Standard - Application: Property Offence Distinction (c12_legal_004)
  {
    id: 'ch_011_property_cbt',
    nodeId: NODE_C12_LEGAL_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A warehouse manager in Kolkata is lawfully entrusted with 1,000 bags of basmati rice. He dishonestly sells 200 bags on the black market and pockets the cash. What specific IPC offence has he committed?',
    options: [
      'Theft under Section 378 IPC (taking without consent)',
      'Extortion under Section 383 IPC (delivery by fear)',
      'Criminal Breach of Trust under Section 405/406 IPC',
      'Dishonest Misappropriation of found property under Section 403 IPC',
    ],
    correctIndex: 2,
    explanation: 'Because the property was lawfully entrusted to him and he had dominion over it, his subsequent dishonest conversion constitutes Criminal Breach of Trust under Section 405 (punishable under Sec 406 IPC). Theft does not apply because initial possession was lawful.',
    hints: [
      'Notice the key ingredient: lawful initial entrustment / custody.',
      'Theft requires taking out of possession without consent at inception.',
      'Lawful entrustment followed by dishonest conversion = Criminal Breach of Trust.',
    ],
  },

  // 12. Standard - Analysis: Judicial vs Quasi-Judicial (c12_legal_005)
  {
    id: 'ch_012_tribunal_analysis',
    nodeId: NODE_C12_LEGAL_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In L. Chandra Kumar v. Union of India (1997), what did the 7-judge Constitution Bench rule regarding Tribunals like NGT and ITAT versus High Courts?',
    options: [
      'Tribunals completely abolish the writ jurisdiction of High Courts under Articles 226/227',
      'Tribunals are supplementary to High Courts; all tribunal decisions remain subject to judicial review under Articles 226/227',
      'Tribunal members have higher judicial immunity than Supreme Court judges',
      'Quasi-judicial tribunals cannot take evidence or hear arguments',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court held that judicial review under Articles 226/227 and 32 is part of the Basic Structure of the Constitution. Tribunals supplement regular courts but can never supplant them; their orders remain reviewable by High Courts.',
    hints: [
      'Basic structure doctrine protects the High Court and Supreme Court writ powers.',
      'Tribunals act as expert supplementary bodies, not sovereign replacements.',
      'Select option 2: Tribunals are supplementary and subject to judicial review.',
    ],
  },

  // 13. Standard - Construct: Arbitration Agreement Requirements (c12_legal_006)
  {
    id: 'ch_013_arbitration_construct',
    nodeId: NODE_C12_LEGAL_006,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct a legally valid Arbitration Clause compliant with Section 7 of the Arbitration and Conciliation Act, 1996 by selecting all essential terms.',
    availableParts: [
      'In Writing and Signed',
      'Defined Legal Relationship',
      'Submission of Disputes to Arbitrator',
      'Arbitral Award Binding on Parties',
      'Oral Handshake Promise',
      'Subject to Unilateral Cancellation',
    ],
    targetState: 'In Writing and Signed Defined Legal Relationship Submission of Disputes to Arbitrator Arbitral Award Binding on Parties',
    validationHint: 'Select the 4 valid statutory elements under Section 7 and exclude non-statutory or invalid terms like oral promises.',
    explanation: 'Under Section 7 of the 1996 Act, an arbitration agreement MUST be in writing, relate to a defined legal relationship, submit disputes to arbitration, and culminate in an enforceable award (Pacta Sunt Servanda).',
    hints: [
      'Section 7 strictly bars oral arbitration agreements.',
      'Add all 4 formal and binding elements and avoid handshake/unilateral cancel terms.',
      'Click the 4 positive legal components in sequence.',
    ],
  },

  // 14. Standard - Match ADR Modes (c12_legal_007)
  {
    id: 'ch_014_adr_match',
    nodeId: NODE_C12_LEGAL_007,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the ADR mechanism with its legal decision-making characteristic:',
    options: [
      'Mediation -> Facilitator assists parties to reach own settlement; Conciliation -> Neutral suggests solutions; Lok Adalat -> Compromise award deemed civil decree',
      'Mediation -> Imposed by judge; Conciliation -> Purely oral; Lok Adalat -> Appealable to Supreme Court',
      'Mediation -> Criminal penalty; Conciliation -> Non-binding; Lok Adalat -> Private arbitration',
      'Mediation -> Unilateral order; Conciliation -> Administrative tribunal; Lok Adalat -> Police inquiry',
    ],
    correctIndex: 0,
    explanation: 'A mediator facilitates discussion; a conciliator can actively propose settlement terms; a Lok Adalat bench facilitates compromise resulting in a final non-appealable award deemed to be a civil court decree under Section 21 of the 1987 Act.',
    hints: [
      'Review the distinction between facilitative (mediation) and evaluative (conciliation).',
      'Lok Adalat awards carry the status of a civil court decree.',
      'Option 1 correctly defines all three mechanisms.',
    ],
  },

  // 15. Standard - Application: Void Agreement Categories (c12_legal_010)
  {
    id: 'ch_015_void_agreements_classify',
    nodeId: NODE_C12_LEGAL_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Pooja signs an agreement with her employer containing a clause: "Employee agrees never to practice homeopathy medicine or start any clinic anywhere in India for the rest of her life after leaving this firm." Under Section 27 of the Indian Contract Act, what is the status of this clause?',
    options: [
      'Completely valid because employee voluntarily signed it',
      'Void as an unreasonable restraint of trade/profession',
      'Valid only if employer pays Rs. 50,000 severance',
      'Voidable at the employer\'s option',
    ],
    correctIndex: 1,
    explanation: 'Under Section 27 of the Indian Contract Act, 1872, every agreement by which anyone is restrained from exercising a lawful profession, trade, or business is to that extent VOID (Superintendence Co. v. Krishan Murgai, 1980).',
    hints: [
      'Look at Section 27 dealing with restraint of trade and profession.',
      'Agreements imposing total lifelong bans on practicing a profession are void.',
      'Select option 2: Void as an unreasonable restraint of trade.',
    ],
  },

  // 16. Advanced - Analysis: Section 8 CPC Referral Test (c12_legal_006)
  {
    id: 'ch_016_sec8_arbitration_apply',
    nodeId: NODE_C12_LEGAL_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Company X files a commercial suit in the Civil Court against Company Y. The underlying contract contains a valid arbitration clause. Company Y files an application under Section 8 of the 1996 Act before submitting its written statement. What MUST the Civil Court do?',
    options: [
      'Dismiss Company Y\'s application and conduct a full 5-year civil trial',
      'Mandatorily refer the parties to arbitration unless the agreement is null, void, inoperative, or incapable of being performed',
      'Impose a criminal penalty on Company X for filing a suit',
      'Refer the matter directly to the Supreme Court for advisory opinion',
    ],
    correctIndex: 1,
    explanation: 'Under Section 8 of the Arbitration and Conciliation Act, 1996 (reaffirmed in Vidya Drolia v. Durga Trading Corp, 2021), the judicial authority has a mandatory statutory duty to refer parties to arbitration upon timely application, respecting party autonomy and Kompetenz-Kompetenz.',
    hints: [
      'Section 8 uses mandatory statutory language: "shall refer".',
      'The civil court cannot ignore a binding arbitration clause if invoked before filing the written statement.',
      'Select the mandatory referral option.',
    ],
  },

  // 17. Advanced - Evaluation: Lok Adalat Finality vs Natural Justice (c12_legal_007)
  {
    id: 'ch_017_lok_adalat_eval',
    nodeId: NODE_C12_LEGAL_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Lok Adalat award under Section 21 of the Legal Services Authorities Act, 1987 is final and non-appealable. If an award was obtained by egregious fraud or forged signatures, what is the aggrieved party\'s constitutional remedy?',
    options: [
      'No remedy exists under any circumstances',
      'Filing a regular first appeal before the District Magistrate',
      'Filing a Writ Petition under Article 226 or Article 227 before the High Court',
      'Filing an FIR against the Lok Adalat presiding officer only',
    ],
    correctIndex: 2,
    explanation: 'As held in State of Punjab v. Jalour Singh (2008), while no statutory appeal lies against a Lok Adalat award under Section 21, the supervisory and writ jurisdiction of the High Court under Articles 226/227 remains available to quash awards vitiated by fraud, coercion, or lack of consent.',
    hints: [
      'Statutory appeals are barred, but constitutional remedies are never extinguished.',
      'High Courts exercise supervisory jurisdiction over all subordinate forums.',
      'The remedy is a Constitutional Writ Petition under Articles 226/227.',
    ],
  },

  // 18. Advanced - Analysis: Section 12 Legal Aid Eligibility (c12_legal_008)
  {
    id: 'ch_018_legal_aid_eligibility',
    nodeId: NODE_C12_LEGAL_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sunita, a corporate executive earning Rs. 15,00,000 per annum, is subjected to severe domestic violence by her spouse. She applies to the District Legal Services Authority (DLSA) for a free panel advocate. Is she eligible under Section 12 of the Legal Services Authorities Act, 1987?',
    options: [
      'No — her income exceeds the Rs. 3,00,000 general ceiling',
      'Yes — under Section 12(c), all women are eligible for free legal aid irrespective of their income',
      'No — legal aid is strictly restricted to BPL card holders',
      'Yes — but only if she agrees to pay 50% of the court fees',
    ],
    correctIndex: 1,
    explanation: 'Under Section 12(c) of the Legal Services Authorities Act, 1987, special categories (such as women, children, SC/ST, persons in custody, disabled persons) are entitled to free legal aid irrespective of income limits. The income ceiling applies only to the residual category.',
    hints: [
      'Section 12 contains categorical exemptions.',
      'Women and children enjoy statutory legal aid protection regardless of financial status.',
      'Select option 2: Eligible under Section 12(c) irrespective of income.',
    ],
  },

  // 19. Advanced - Application: Minor\'s Contract Doctrine (c12_legal_009)
  {
    id: 'ch_019_mohori_bibee',
    nodeId: NODE_C12_LEGAL_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the landmark case of Mohori Bibee v. Dharmodas Ghose (1903), the Privy Council laid down a foundational rule regarding agreements with minors under Section 11 of the Indian Contract Act. What is this rule?',
    options: [
      'A minor\'s agreement is voidable at the option of the adult promisor',
      'A minor\'s agreement is void ab initio (void from the very beginning)',
      'A minor is bound to perform once turning 18 years of age',
      'A minor must always refund mortgage money under Section 65',
    ],
    correctIndex: 1,
    explanation: 'Mohori Bibee established that a minor lacks competence to contract under Section 11; therefore, any agreement entered into by a minor is void ab initio and no enforceable contract ever comes into legal existence.',
    hints: [
      'It is not merely voidable; it is void from day one.',
      'Latin term "void ab initio" signifies total legal nullity from inception.',
      'Option 2 correctly states the Privy Council\'s historic holding.',
    ],
    misconceptionIndex: 4,
  },

  // 20. Advanced - Analysis: Section 23 Unlawful Objects (c12_legal_010)
  {
    id: 'ch_020_sec23_unlawful',
    nodeId: NODE_C12_LEGAL_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A politician pays Rs. 20 lakhs to a government official on a written agreement that the official will drop a pending corruption inquiry against him. What makes this agreement void under Section 23 of the Indian Contract Act?',
    options: [
      'Only because the consideration was paid via cheque rather than cash',
      'Its object is forbidden by law, defeats statutory provisions, and is opposed to public policy / administration of justice',
      'It is valid if both parties sign before a notary public',
      'It is voidable only at the option of the politician',
    ],
    correctIndex: 1,
    explanation: 'Under Section 23, any agreement whose object or consideration is forbidden by law, defeats the law, or is opposed to public policy (such as stifling criminal prosecution or bribing public servants) is void ab initio (Ex turpi causa non oritur actio).',
    hints: [
      'Stifling criminal prosecution strikes at public justice.',
      'Section 23 forbids agreements that undermine statutory governance or public policy.',
      'Select option 2.',
    ],
  },

  // 21. Advanced - Evaluation: Negligence vs Murder in Hit-and-Run (c12_legal_003)
  {
    id: 'ch_021_negligence_eval',
    nodeId: NODE_C12_LEGAL_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A speeding driver while intoxicated runs over two pedestrians at 2:00 AM on a deserted road. In framing charges, what is the critical legal difference between Section 304A (causing death by negligence) and Section 304 Part II (culpable homicide not amounting to murder)?',
    options: [
      'Section 304A requires proof of intention to kill, whereas 304 Part II requires no intention',
      'Section 304A applies to rash or negligent acts without knowledge that death is likely; 304 Part II applies where the act is done with subjective knowledge that it is likely to cause death',
      'Section 304A carries capital punishment, whereas Section 304 Part II carries only a Rs. 500 fine',
      'There is no distinction; both sections are mutually interchangeable at police discretion',
    ],
    correctIndex: 1,
    explanation: 'Section 304A covers rash/negligent acts where death is caused without intention or knowledge of likelihood of death. Section 304 Part II applies when the accused acted with knowledge that the dangerous act was likely to cause death (as seen in high-speed drunken driving precedents).',
    hints: [
      'Focus on the mental element: absence of knowledge vs presence of subjective knowledge of danger.',
      'Rashness/negligence = Section 304A; Knowledge of likely death = Section 304 Part II.',
      'Select option 2.',
    ],
  },

  // 22. Advanced - Creativity: Legal Strategy Blueprint (c12_legal_008)
  {
    id: 'ch_022_creativity_blueprint',
    nodeId: NODE_C12_LEGAL_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an emergency legal aid intervention for undertrial prisoners stranded in a central prison for 4 years without legal representation for bailable offences. Which integrated legal strategy best operationalizes Hussainara Khatoon (1979) and the Legal Services Authorities Act, 1987?',
    options: [
      'Direct prisoners to wait until private advocates offer pro bono help outside the prison gate',
      'Deploy DLSA panel lawyers + trained Para-Legal Volunteers (PLVs) to file Sec 436A CrPC bail petitions and list matters before an urgent Special Jail Lok Adalat',
      'Advise prisoners to file commercial arbitration claims against the State',
      'Recommend that the prison superintendent conduct criminal trials inside barracks',
    ],
    correctIndex: 1,
    explanation: 'Under Hussainara Khatoon and NALSA mandates, DLSAs deploy PLVs and legal aid clinics inside prisons to identify long-detained undertrials, invoke Section 436A CrPC for statutory bail, and achieve immediate release through Special Jail Lok Adalats.',
    hints: [
      'Think of an active bridge: DLSA + PLVs + Section 436A CrPC + Lok Adalats.',
      'This reflects modern constitutional access-to-justice jurisprudence under Article 39A/21.',
      'Select option 2.',
    ],
  },
];

// ─── DEFAULT PROPS ───
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
  nodeId: NODE_C12_LEGAL_001,
  title: 'Stages and Elements of Crime & Foundational Jurisprudence',
  definition: 'Criminal liability requires the simultaneous concurrence of Mens Rea (guilty mind) and Actus Reus (guilty act) across four stages: Intention, Preparation, Attempt, and Accomplishment.',
  eli5: 'Think of crime like building a fire. Thinking about it is intention, gathering wood is preparation, striking the match is attempt, and the blaze is accomplishment. The law only punishes when you actually strike the match or burn something down!',
  misconceptions: [
    {
      misconception: 'Motive and Intention are legally identical in Indian criminal law.',
      correction: 'Intention is the immediate aim to cause a prohibited consequence (a statutory ingredient under Sec 300 IPC), whereas Motive is the background emotional reason (relevant under Sec 8 Evidence Act but not an ingredient of an offence).',
    },
    {
      misconception: 'Mere preparation to commit any crime is always punishable.',
      correction: 'Preparation is generally not punishable because it is remote and ambiguous. Only specific statutory exceptions (like waging war Sec 122 or dacoity Sec 399) or attempt under Sec 511 are punishable.',
    },
    {
      misconception: 'Mens Rea and Actus Reus can occur at separate times without invalidating liability.',
      correction: 'The mental and physical elements must coincide in time (actus non facit reum nisi mens sit rea). An abandoned past intention cannot be attached to a subsequent accidental act.',
    },
    {
      misconception: 'Adequacy of consideration is required for a valid contract under Section 10.',
      correction: 'Consideration must be real and lawful under Section 2(d), but the law does not require adequacy (Chinnaya v. Ramayya). Parties are free to set their own exchange value.',
    },
    {
      misconception: 'A minor\'s contract is voidable at the option of the parties.',
      correction: 'Under Mohori Bibee v. Dharmodas Ghose (1903), an agreement with a minor is void ab initio (void from the very beginning) because of incapacity under Section 11.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What are the two essential pillars of every crime under the IPC?', options: ['Motive and Consequence', 'Mens Rea and Actus Reus', 'Bail and Charge-sheet', 'FIR and Police diary'], correctIndex: 1 },
    { question: 'Which stage of crime is punished under Section 511 IPC?', options: ['Intention', 'Preparation', 'Attempt', 'Daydreaming'], correctIndex: 2 },
    { question: 'Which landmark case laid down the four-step test for Section 300(c) Murder?', options: ['Virsa Singh v. State of Punjab', 'Balfour v. Balfour', 'Mohori Bibee', 'Carlill v. Carbolic Smoke Ball'], correctIndex: 0 },
    { question: 'What distinguishes theft from extortion?', options: ['Theft uses fear; extortion is stealth', 'Theft is taking without consent; extortion induces delivery through fear', 'Theft is a civil tort', 'Extortion involves only immovable property'], correctIndex: 1 },
    { question: 'What is the statutory source of court-referred ADR in civil procedure?', options: ['Section 89 CPC, 1908', 'Section 302 IPC', 'Article 21', 'Section 124A'], correctIndex: 0 },
    { question: 'Are Lok Adalat awards subject to regular civil appeals?', options: ['Yes, up to High Court', 'Yes, before District Judge', 'No, awards are final and deemed civil decrees with no appeal', 'Only if above Rs. 1 crore'], correctIndex: 2 },
    { question: 'Who is eligible for free legal aid under Section 12 irrespective of income?', options: ['All private landlords', 'Women, children, SC/ST, custody detainees', 'Corporations with turnover under 10 crore', 'Foreign tourists'], correctIndex: 1 },
    { question: 'What makes an agreement void under Section 23 of the Contract Act?', options: ['Unlawful object, defeating law, or opposed to public policy', 'Written on plain paper', 'Not having five witnesses', 'Contract executed on Sunday'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master the stages & elements of crime, IPC offences against body and property, judicial tribunals vs ADR mechanisms, legal aid under Art 39A, and contract validity & void agreements.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Crime Concurrence Scale',
    instruction: 'Adjust the Mens Rea and Actus Reus sliders to test criminal liability across different factual scenarios.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_LEGAL_001,
  },
  {
    title: 'Lab 2: The Four Stages of Crime Chamber',
    instruction: 'Click each stage of the criminal lifecycle to see where statutory liability attaches under the IPC.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_LEGAL_001,
  },
  {
    title: 'Lab 3: The Dispute Resolution Matrix (Court vs ADR)',
    instruction: 'Select dispute types and compare formal adjudication, Arbitration, Mediation, and Lok Adalat.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_LEGAL_005,
  },
  {
    title: 'Lab 4: Legal Aid Access Gate (Section 12 LSA Act)',
    instruction: 'Toggle applicant profiles to test statutory legal aid eligibility under Article 39A and Section 12.',
    interactionType: 'toggle-evaluate',
    nodeId: NODE_C12_LEGAL_008,
  },
  {
    title: 'Lab 5: The Contract Enforceability Validator',
    instruction: 'Adjust contract ingredients (Consent, Capacity, Object, Consideration) and observe contract validity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_LEGAL_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Judicial Clerkship Moot: Draft a Legal Brief',
  description: 'Select a contemporary Indian scenario (e.g., a commercial software breach dispute or a hit-and-run bail application). Analyse the elements, identify the appropriate court or ADR forum, cite relevant IPC sections or Contract Act clauses, and outline your arguments under Article 39A and Section 89 CPC.',
  steps: [
    'Choose a case type: Criminal (IPC Offences against Body/Property) or Civil/Commercial (Contract & ADR)',
    'List the Mens Rea and Actus Reus elements or the 5 Contract Essentials present in the facts',
    'Determine the ideal dispute forum: High Court, NGT/Tribunal, Arbitration under 1996 Act, or Lok Adalat',
    'Assess legal aid eligibility under Section 12 of the Legal Services Authorities Act, 1987',
    'Present your 1-page reasoned brief to your teacher or peer moot court panel',
  ],
};

export default function C12_LegalStudiesStagesElementsCrimeSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_LEGAL_001,
  title = DEFAULT_PROPS.title || 'Legal Studies Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['legal'] || { name: 'Legal Studies', emoji: '⚖️', color: 'amber' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [showPredFeedback, setShowPredFeedback] = useState(false);

  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [showObsFeedback, setShowObsFeedback] = useState(false);

  // ─── INTERACTION STATES ───
  const [mensReaScore, setMensReaScore] = useState(50);
  const [actusReusScore, setActusReusScore] = useState(50);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [selectedADRType, setSelectedADRType] = useState<'court' | 'arbitration' | 'mediation' | 'lokadalat'>('arbitration');
  const [applicantGender, setApplicantGender] = useState<'woman' | 'man'>('woman');
  const [applicantIncome, setApplicantIncome] = useState(250000);
  const [applicantCategory, setApplicantCategory] = useState<'general' | 'sc_st' | 'custody' | 'disabled'>('general');
  const [contractConsent, setContractConsent] = useState<'free' | 'coerced' | 'undue_influence' | 'fraud'>('free');
  const [contractCapacity, setContractCapacity] = useState<'major_sound' | 'minor' | 'unsound'>('major_sound');
  const [contractObject, setContractObject] = useState<'lawful' | 'unlawful_statute' | 'opposed_public_policy'>('lawful');

  // Discovery & Verification States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenge Flow & Adaptive Difficulty
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Moot Court Simulator State
  const [mootTab, setMootTab] = useState<'brief' | 'arguments' | 'verdict'>('brief');
  const [mootEvidenceAdmitted, setMootEvidenceAdmitted] = useState(false);
  const [mootPlea, setMootPlea] = useState<'302_murder' | '304_culpable' | '304A_negligence'>('304_culpable');

  // BKT State Ref & Inactivity Timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED VALUES FOR LAB VISUALIZATIONS ───
  const crimeLiabilityAssessment = useMemo(() => {
    const totalScore = (mensReaScore * 0.5) + (actusReusScore * 0.5);
    if (mensReaScore < 20 && actusReusScore < 20) return { status: 'No Crime', color: 'text-emerald-400', barColor: 'bg-emerald-500', desc: 'No guilty mind and no prohibited conduct.' };
    if (mensReaScore > 40 && actusReusScore < 15) return { status: 'Mere Intention / Thought', color: 'text-amber-400', barColor: 'bg-amber-500', desc: 'Thoughts alone are not punishable under the IPC (actus non facit reum nisi mens sit rea).' };
    if (mensReaScore < 15 && actusReusScore > 50) return { status: 'Accident / Involuntary Act', color: 'text-gold-400', barColor: 'bg-gold-500', desc: 'Actus Reus without Mens Rea generally lacks criminal culpability (unless strict liability applies).' };
    if (totalScore >= 75) return { status: 'Full Criminal Culpability', color: 'text-rose-400', barColor: 'bg-rose-500', desc: 'Concurrence of blameworthy Mens Rea and prohibited Actus Reus establishes complete criminal liability.' };
    return { status: 'Inchoate / Negligent Boundary', color: 'text-yellow-400', barColor: 'bg-yellow-500', desc: 'Partial concurrence: may attract attempt under Section 511 or negligence under Section 304A.' };
  }, [mensReaScore, actusReusScore]);

  const legalAidEligible = useMemo(() => {
    if (applicantGender === 'woman') return { eligible: true, reason: 'Eligible under Section 12(c) of LSA Act, 1987 (All women are entitled to free legal aid regardless of income).' };
    if (applicantCategory === 'sc_st') return { eligible: true, reason: 'Eligible under Section 12(a) (Members of SC/ST have categorical legal aid protection).' };
    if (applicantCategory === 'custody') return { eligible: true, reason: 'Eligible under Section 12(g) (Persons in custody/undertrials are entitled to free representation).' };
    if (applicantCategory === 'disabled') return { eligible: true, reason: 'Eligible under Section 12(d) (Persons with disabilities).' };
    if (applicantIncome <= 300000) return { eligible: true, reason: 'Eligible under Section 12(h) (Annual income is within the prescribed Rs. 3,00,000 threshold).' };
    return { eligible: false, reason: 'Not eligible: Income exceeds Rs. 3,00,000 and applicant does not fall under any exempt statutory category.' };
  }, [applicantGender, applicantCategory, applicantIncome]);

  const contractValidityResult = useMemo(() => {
    if (contractCapacity === 'minor') return { status: 'Void ab initio', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500', reason: 'Mohori Bibee v. Dharmodas Ghose (1903): An agreement with a minor is void from inception under Section 11.' };
    if (contractCapacity === 'unsound') return { status: 'Void ab initio', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500', reason: 'Section 11/12: A person of unsound mind lacks capacity to form binding legal obligations.' };
    if (contractObject === 'unlawful_statute' || contractObject === 'opposed_public_policy') return { status: 'Void ab initio', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500', reason: 'Section 23: Object is unlawful, forbidden by statute, or opposed to public policy (Ex turpi causa non oritur actio).' };
    if (contractConsent === 'coerced') return { status: 'Voidable (Section 19)', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500', reason: 'Section 15/19: Consent obtained by coercion is voidable at the option of the aggrieved party.' };
    if (contractConsent === 'undue_influence') return { status: 'Voidable (Section 19A)', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500', reason: 'Section 16/19A: Consent induced by dominating fiduciary position is voidable at the aggrieved party\'s option.' };
    if (contractConsent === 'fraud') return { status: 'Voidable + Damages in Tort', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500', reason: 'Section 17/19: Intentional deceit renders agreement voidable and attracts deceit damages.' };
    return { status: 'Fully Valid & Enforceable Contract', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500', reason: 'Satisfies all Section 10 essentials: Competent parties, Free consent, Lawful object, and Real consideration (Chinnaya v. Ramayya).' };
  }, [contractConsent, contractCapacity, contractObject]);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE GENERATOR ───
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) {
      return {
        badge: 'PERFECT SCORE!',
        text: '🏆 PERFECT SCORE! Flawless command of IPC offences, ADR mechanisms, and Contract Act provisions without a single mistake.',
        color: 'text-emerald-300',
        bg: 'bg-emerald-950/50 border-emerald-500',
      };
    }
    if (errors >= 1 && errors <= 3) {
      return {
        badge: 'Great work!',
        text: '🌟 Great work! Your statutory analysis and case-law application reflect strong judicial competence.',
        color: 'text-gold-300',
        bg: 'bg-gold-950/50 border-gold-500',
      };
    }
    if (errors >= 4 && errors <= 7) {
      return {
        badge: 'Good effort!',
        text: '📈 Good effort! Review the specific misconception corrections below to consolidate your legal mastery.',
        color: 'text-amber-300',
        bg: 'bg-amber-950/50 border-amber-500',
      };
    }
    return {
      badge: 'Do not give up — You WILL get this!',
      text: '💪 Do not give up — You WILL get this! Jurisprudence takes practice. Review each section carefully and re-attempt to solidify your foundation.',
      color: 'text-rose-300',
      bg: 'bg-rose-950/50 border-rose-500',
    };
  }, [errors]);

  // ─── USEEFFECT HOOKS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    if (phase === 'explore') {
      speechManager.speak(`Exploring ${EXPLORATION_STEPS[currentSlide].title}. ${EXPLORATION_STEPS[currentSlide].instruction}`);
    }
  }, [phase, currentSlide]);

  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, 5);
      ctx.lineTo(centerX, canvas.height - 5);
      ctx.stroke();

      const pulse = Math.sin(frame * 0.08) * 3;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6 + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Scale of Justice: ISC Legal Studies Chamber`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HOOKS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate legal analysis!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Form your legal hypothesis first. Predict, then interact to verify!');
  }, []);

  const handlePredSelect = useCallback((optIdx: number) => {
    setPredAnswers(prev => ({ ...prev, [predIndex]: optIdx }));
    setShowPredFeedback(true);
    const isCorrect = optIdx === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [predIndex]);

  const handleNextPrediction = useCallback(() => {
    setShowPredFeedback(false);
    if (predIndex + 1 < PREDICTION_QUESTIONS.length) {
      setPredIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Now verify your predictions in the interactive jurisprudence labs.');
    }
  }, [predIndex]);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('Observation check: What do you notice from the interactive chambers?');
  }, []);

  const handleObsSelect = useCallback((optIdx: number) => {
    setObsAnswers(prev => ({ ...prev, [obsIndex]: optIdx }));
    setShowObsFeedback(true);
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [obsIndex]);

  const handleNextObservation = useCallback(() => {
    setShowObsFeedback(false);
    if (obsIndex + 1 < OBSERVATION_QUESTIONS.length) {
      setObsIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
      speechManager.speak('Enter the Jurisprudence Sandbox. Test variables freely before tackling court challenges.');
    }
  }, [obsIndex]);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Chamber challenges initiated. Apply statutory provisions with precision.');
  }, []);

  const handleMensReaChange = useCallback((val: number) => {
    setMensReaScore(val);
    audioManager.play('count');
  }, []);

  const handleActusReusChange = useCallback((val: number) => {
    setActusReusScore(val);
    audioManager.play('count');
  }, []);

  const handleStageClick = useCallback((stageIdx: number) => {
    setActiveStageIndex(stageIdx);
    audioManager.play('tap');
    const stageNames = ['Intention', 'Preparation', 'Attempt', 'Accomplishment'];
    const descriptions = [
      'Intention: Pure mental design. Not punishable under Indian criminal law.',
      'Preparation: Arranging means. Generally not punishable (except waging war Sec 122).',
      'Attempt: Direct movement towards commission. Punishable under Section 511 / Section 307 IPC!',
      'Accomplishment: Completed substantive offence (e.g. Murder Sec 302, Theft Sec 379).',
    ];
    speechManager.speak(`${stageNames[stageIdx]}. ${descriptions[stageIdx]}`);
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
      const initial = prev.length === 0 && activeChallenge.sortItems ? activeChallenge.sortItems.map((_, i) => i) : prev;
      const updated = [...initial];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Chamber judicial training completed with a score of ${finalScore} percent!`);
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Well reasoned.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, 'proficient');
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
        speechManager.speak('Let us review the statutory basis together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="text-3xl p-2 bg-amber-500/10 rounded-xl border border-amber-500/30"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              ISC Class 12 • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-gold-950/70 border-gold-500 text-gold-300'
                : 'bg-rose-950/70 border-rose-500 text-rose-300'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Mastery: <span className="text-amber-300 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-800/60 to-slate-900 rounded-2xl border border-amber-500/30">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              📜 {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/80 mt-2 italic bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              Chamber Brief: {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <span>⚡ Discovery Question</span>
              <span className="text-slate-500">• Low-Stakes Curiosity Hook</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-850 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-850 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-700 space-y-3"
              >
                <div
                  className={`p-3.5 rounded-xl text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border border-emerald-600 text-emerald-300'
                      : 'bg-amber-950/50 border border-amber-600 text-amber-300'
                  }`}
                >
                  <span className="font-bold">{discoveryCorrect ? '✓ Spot on!' : '💡 Jurisprudence Insight:'}</span>{' '}
                  {discoveryCorrect
                    ? 'Under Indian law, mere intention and preparation are unpunished because internal thoughts are hard to prove and lack public harm.'
                    : DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToPredict}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  Advance to Predict-Then-Check Phase →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 1.5: PREDICTION QUESTIONS (Predict-Then-Check Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-r from-gold-950/60 via-slate-800 to-slate-900 rounded-2xl border border-gold-500/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                🔮 Step 1: Predict Before You Interact ({predIndex + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400 font-mono">Brilliant Predict-Then-Check Pattern</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-2">
              {PREDICTION_QUESTIONS[predIndex].question}
            </h2>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="grid grid-cols-1 gap-2.5">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, idx) => {
                const selected = predAnswers[predIndex] === idx;
                const isCorrect = idx === PREDICTION_QUESTIONS[predIndex].correctIndex;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handlePredSelect(idx)}
                    disabled={showPredFeedback}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showPredFeedback && isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : showPredFeedback && selected && !isCorrect
                        ? 'bg-rose-950/50 border-rose-500 text-rose-300'
                        : 'bg-slate-850 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {showPredFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gold-950/40 border border-gold-500/50 rounded-xl space-y-2.5"
              >
                <div className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                  <span>🧠 Legal Hypothesis Assessment:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {PREDICTION_QUESTIONS[predIndex].predictionExplanation}
                </p>
                <div className="p-2.5 bg-gold-900/40 rounded-lg border border-gold-500/30 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>🔍 Verification Mission:</span>
                  <span>{PREDICTION_QUESTIONS[predIndex].verifyInstruction}</span>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextPrediction}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl text-sm shadow-md shadow-gold-500/20"
                  >
                    {predIndex + 1 < PREDICTION_QUESTIONS.length
                      ? 'Next Prediction Question →'
                      : 'Launch Interactive Exploration Labs →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Slide Chamber */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>⚖️</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: CRIME CONCURRENCE SCALE (WITH TOPIC SVG #1) ─── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-5">
                  {/* Topic SVG #1: Crime Concurrence Scale Visualization */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full">
                      {/* Base stand */}
                      <path d="M 280 120 L 320 120 L 305 70 L 295 70 Z" fill="#475569" />
                      {/* Fulcrum pillar */}
                      <rect x="296" y="25" width="8" height="50" fill="#64748b" rx="2" />
                      {/* Tilting balance beam based on sliders */}
                      {(() => {
                        const tiltAngle = ((actusReusScore - mensReaScore) / 100) * 15;
                        const leftY = 35 + Math.sin((tiltAngle * Math.PI) / 180) * 150;
                        const rightY = 35 - Math.sin((tiltAngle * Math.PI) / 180) * 150;
                        return (
                          <g>
                            <line x1="150" y1={leftY} x2="450" y2={rightY} stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                            {/* Fulcrum Center Point */}
                            <circle cx="300" cy="35" r="6" fill="#fbbf24" />

                            {/* Left Pan: Mens Rea */}
                            <line x1="150" y1={leftY} x2="130" y2={leftY + 30} stroke="#94a3b8" strokeWidth="2" />
                            <line x1="150" y1={leftY} x2="170" y2={leftY + 30} stroke="#94a3b8" strokeWidth="2" />
                            <path d={`M 120 ${leftY + 30} Q 150 ${leftY + 45} 180 ${leftY + 30} Z`} fill="#f43f5e" opacity="0.8" />
                            <text x="150" y={leftY + 58} fill="#fda4af" fontSize="10" textAnchor="middle" fontWeight="bold">
                              Mens Rea ({mensReaScore}%)
                            </text>

                            {/* Right Pan: Actus Reus */}
                            <line x1="450" y1={rightY} x2="430" y2={rightY + 30} stroke="#94a3b8" strokeWidth="2" />
                            <line x1="450" y1={rightY} x2="470" y2={rightY + 30} stroke="#94a3b8" strokeWidth="2" />
                            <path d={`M 420 ${rightY + 30} Q 450 ${rightY + 45} 480 ${rightY + 30} Z`} fill="#3b82f6" opacity="0.8" />
                            <text x="450" y={rightY + 58} fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold">
                              Actus Reus ({actusReusScore}%)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mens Rea Slider */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-rose-400">🧠 Mens Rea (Guilty Mind)</span>
                        <span className="text-white">{mensReaScore}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={mensReaScore}
                        onChange={(e) => handleMensReaChange(Number(e.target.value))}
                        aria-label="Set Mens Rea Score"
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">
                        {mensReaScore < 20 ? 'Innocent / No criminal intention' : mensReaScore < 60 ? 'Recklessness / Knowledge of risk' : 'Direct deliberate intention to cause harm'}
                      </p>
                    </div>

                    {/* Actus Reus Slider */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gold-400">⚡ Actus Reus (Guilty Conduct)</span>
                        <span className="text-white">{actusReusScore}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={actusReusScore}
                        onChange={(e) => handleActusReusChange(Number(e.target.value))}
                        aria-label="Set Actus Reus Score"
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">
                        {actusReusScore < 20 ? 'No physical act or prohibited omission' : actusReusScore < 60 ? 'Overt preparation / Attempt' : 'Completed prohibited physical act'}
                      </p>
                    </div>
                  </div>

                  {/* Real-time Dynamic Result Gauge */}
                  <motion.div
                    layout
                    className="p-4 bg-slate-900/90 rounded-xl border border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Legal Determination</span>
                      <span className={`text-sm font-bold ${crimeLiabilityAssessment.color}`}>
                        {crimeLiabilityAssessment.status}
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${crimeLiabilityAssessment.barColor}`}
                        animate={{ width: `${(mensReaScore + actusReusScore) / 2}%` }}
                        transition={{ ease: 'easeOut', duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 italic">{crimeLiabilityAssessment.desc}</p>
                    <div className="text-[11px] text-amber-400 font-mono pt-1">
                      Maxim: "Actus non facit reum nisi mens sit rea" (State of Maharashtra v. Mayer Hans Peter, 1980)
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 2: FOUR STAGES OF CRIME (WITH TOPIC SVG #2) ─── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { name: '1. Intention', desc: 'Mental formulation of criminal design', status: 'NOT Punishable', color: 'border-slate-700' },
                      { name: '2. Preparation', desc: 'Arranging weapons/means to execute', status: 'Generally NOT Punishable', color: 'border-yellow-700/60' },
                      { name: '3. Attempt', desc: 'Direct overt step towards execution', status: 'PUNISHABLE (Sec 511)', color: 'border-rose-600' },
                      { name: '4. Accomplishment', desc: 'Offence completed, harm executed', status: 'FULL OFFENCE (Sec 302/379)', color: 'border-emerald-600' },
                    ].map((stage, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleStageClick(i)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          activeStageIndex === i
                            ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/20'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{stage.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{stage.desc}</div>
                        <div className={`text-[10px] font-bold mt-2 ${
                          i >= 2 ? 'text-rose-400' : 'text-slate-500'
                        }`}>
                          {stage.status}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Topic SVG #2: SVG Stage Visualizer */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 120" className="w-full">
                      {/* Timeline bar */}
                      <line x1="50" y1="60" x2="550" y2="60" stroke="#334155" strokeWidth="4" />
                      {/* Safe zone line */}
                      <line x1="50" y1="60" x2="300" y2="60" stroke="#10b981" strokeWidth="4" />
                      {/* Danger/Criminal zone */}
                      <line x1="300" y1="60" x2="550" y2="60" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" />

                      {/* Nodes */}
                      {[
                        { cx: 100, label: 'Intention', sub: 'Mental', punished: false },
                        { cx: 240, label: 'Preparation', sub: 'Gathering Means', punished: false },
                        { cx: 380, label: 'Attempt', sub: 'Sec 511 IPC', punished: true },
                        { cx: 500, label: 'Accomplishment', sub: 'Completed', punished: true },
                      ].map((n, idx) => (
                        <g key={idx} onClick={() => handleStageClick(idx)} style={{ cursor: 'pointer' }}>
                          <circle
                            cx={n.cx}
                            cy="60"
                            r={activeStageIndex === idx ? '18' : '14'}
                            fill={activeStageIndex === idx ? '#f59e0b' : n.punished ? '#ef4444' : '#10b981'}
                            stroke="#1e293b"
                            strokeWidth="3"
                          />
                          <text x={n.cx} y="64" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                            {idx + 1}
                          </text>
                          <text x={n.cx} y="95" textAnchor="middle" fill={activeStageIndex === idx ? '#fbbf24' : '#e2e8f0'} fontSize="11" fontWeight="bold">
                            {n.label}
                          </text>
                          <text x={n.cx} y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">
                            {n.sub}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: DISPUTE RESOLUTION MATRIX ─── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'court', label: '🏛️ Regular Civil Court' },
                      { id: 'arbitration', label: '⚖️ Arbitration (1996 Act)' },
                      { id: 'mediation', label: '🤝 Mediation (2023 Act)' },
                      { id: 'lokadalat', label: '👥 Lok Adalat (1987 Act)' },
                    ].map((m) => (
                      <motion.button
                        key={m.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedADRType(m.id as any)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedADRType === m.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {m.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Detail Panel */}
                  <motion.div
                    key={selectedADRType}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3"
                  >
                    {selectedADRType === 'court' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Traditional Court Hierarchy (CPC, 1908)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Adversarial, public trial, strict CPC & Evidence rules, binding decree with multiple tiers of first & second appeals. Often takes years due to heavy pendency.
                        </p>
                      </div>
                    )}
                    {selectedADRType === 'arbitration' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Arbitration (Section 7, 8, 31-36 Arbitration & Conciliation Act, 1996)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Parties choose private arbitrator. Enforceable as a court decree (Sec 36). Very limited grounds of challenge under Section 34 (no appeal on merits). Governed by Pacta Sunt Servanda & Kompetenz-Kompetenz.
                        </p>
                      </div>
                    )}
                    {selectedADRType === 'mediation' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Mediation (Section 89 CPC & Mediation Act, 2023)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Neutral mediator facilitates confidential discussions. Mediator NEVER imposes solutions; parties craft their own agreement. Settlement agreement is enforceable as a court decree under Section 28 of the 2023 Act.
                        </p>
                      </div>
                    )}
                    {selectedADRType === 'lokadalat' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Lok Adalat (Section 19-22 Legal Services Authorities Act, 1987)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          "People\'s Court": Informal compromise forum. Disposes pending and pre-litigation disputes (motor accidents, bank loans, compoundable offences). Award is deemed a civil court decree with NO appeal (final & binding).
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 4: LEGAL AID ELIGIBILITY (WITH TOPIC SVG #3) ─── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  {/* Topic SVG #3: Legal Services Authorities Hierarchy & Gate */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 110" className="w-full">
                      {/* Pyramid / Tier Structure */}
                      <polygon points="300,10 490,100 110,100" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      {/* Tier dividers */}
                      <line x1="255" y1="35" x2="345" y2="35" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="210" y1="60" x2="390" y2="60" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="160" y1="82" x2="440" y2="82" stroke="#64748b" strokeWidth="1.5" />

                      {/* Tier Texts */}
                      <text x="300" y="27" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">NALSA (Apex - CJI)</text>
                      <text x="300" y="50" fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold">SLSA (State - HC Chief Justice)</text>
                      <text x="300" y="73" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">DLSA (District Judge)</text>
                      <text x="300" y="94" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">Taluka Committee (Grassroots)</text>

                      {/* Article 39A Callout */}
                      <rect x="15" y="15" width="130" height="40" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                      <text x="80" y="32" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">Article 39A DPSP</text>
                      <text x="80" y="46" fill="#94a3b8" fontSize="8" textAnchor="middle">Free Legal Aid Mandate</text>

                      {/* Section 12 Callout */}
                      <rect x="455" y="15" width="130" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                      <text x="520" y="32" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">Section 12 LSA Act</text>
                      <text x="520" y="46" fill="#94a3b8" fontSize="8" textAnchor="middle">Statutory Eligibility Gate</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Gender */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] font-bold text-amber-400 block mb-1.5">Gender</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setApplicantGender('woman')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                            applicantGender === 'woman' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Woman / Child
                        </button>
                        <button
                          onClick={() => setApplicantGender('man')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                            applicantGender === 'man' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Man (Adult)
                        </button>
                      </div>
                    </div>

                    {/* Special Category */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] font-bold text-amber-400 block mb-1.5">Special Category</label>
                      <select
                        value={applicantCategory}
                        onChange={(e) => setApplicantCategory(e.target.value as any)}
                        className="w-full bg-slate-800 text-xs text-white p-1.5 rounded-lg border border-slate-700"
                      >
                        <option value="general">General Citizen</option>
                        <option value="sc_st">Scheduled Caste / ST</option>
                        <option value="custody">Person in Custody / Undertrial</option>
                        <option value="disabled">Person with Disability</option>
                      </select>
                    </div>

                    {/* Annual Income */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-amber-400">Annual Income</span>
                        <span className="text-white">₹{(applicantIncome / 100000).toFixed(1)} Lakh</span>
                      </div>
                      <input
                        type="range"
                        min={50000}
                        max={1000000}
                        step={25000}
                        value={applicantIncome}
                        onChange={(e) => setApplicantIncome(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Statutory Eligibility Result */}
                  <motion.div
                    layout
                    className={`p-4 rounded-xl border ${
                      legalAidEligible.eligible
                        ? 'bg-emerald-950/40 border-emerald-500'
                        : 'bg-rose-950/40 border-rose-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{legalAidEligible.eligible ? '✅' : '❌'}</span>
                      <span className={`text-sm font-bold ${
                        legalAidEligible.eligible ? 'text-emerald-300' : 'text-rose-300'
                      }`}>
                        {legalAidEligible.eligible ? 'ELIGIBLE FOR FREE LEGAL AID' : 'INELIGIBLE UNDER GENERAL CRITERIA'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{legalAidEligible.reason}</p>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 5: CONTRACT VALIDITY VALIDATOR ─── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Consent */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] font-bold text-amber-400 block mb-1">Consent (Sec 13-18)</label>
                      <select
                        value={contractConsent}
                        onChange={(e) => setContractConsent(e.target.value as any)}
                        className="w-full bg-slate-800 text-xs text-white p-1.5 rounded-lg border border-slate-700"
                      >
                        <option value="free">Free Consent</option>
                        <option value="coerced">Coercion (Sec 15 - Threat)</option>
                        <option value="undue_influence">Undue Influence (Sec 16)</option>
                        <option value="fraud">Fraud (Sec 17 - Lying)</option>
                      </select>
                    </div>

                    {/* Capacity */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] font-bold text-amber-400 block mb-1">Capacity (Sec 11)</label>
                      <select
                        value={contractCapacity}
                        onChange={(e) => setContractCapacity(e.target.value as any)}
                        className="w-full bg-slate-800 text-xs text-white p-1.5 rounded-lg border border-slate-700"
                      >
                        <option value="major_sound">Major (18+) & Sound Mind</option>
                        <option value="minor">Minor (Age under 18)</option>
                        <option value="unsound">Person of Unsound Mind</option>
                      </select>
                    </div>

                    {/* Object */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] font-bold text-amber-400 block mb-1">Object & Purpose (Sec 23)</label>
                      <select
                        value={contractObject}
                        onChange={(e) => setContractObject(e.target.value as any)}
                        className="w-full bg-slate-800 text-xs text-white p-1.5 rounded-lg border border-slate-700"
                      >
                        <option value="lawful">Lawful Trade / Service</option>
                        <option value="unlawful_statute">Forbidden by Law (Smuggling)</option>
                        <option value="opposed_public_policy">Stifling Criminal Prosecution</option>
                      </select>
                    </div>
                  </div>

                  {/* Contract Validity Card */}
                  <motion.div
                    layout
                    className={`p-4 rounded-xl border ${contractValidityResult.bg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">Contract Status (Sec 10)</span>
                      <span className={`text-sm font-bold ${contractValidityResult.color}`}>
                        {contractValidityResult.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed">{contractValidityResult.reason}</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-sm font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-bold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-sm font-bold shadow-md shadow-amber-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObserve}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-600/30"
              >
                Go to "What Do You Notice?" Observation Check →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2.5: OBSERVATION QUESTIONS (What-Do-You-Notice Pattern) ─── */}
      {phase === 'observe' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-r from-teal-950/60 via-slate-800 to-slate-900 rounded-2xl border border-teal-500/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                👁️ Step 2: What Do You Notice? ({obsIndex + 1} of {OBSERVATION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400 font-mono">Visual Jurisprudence Check</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-2">
              {OBSERVATION_QUESTIONS[obsIndex].question}
            </h2>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="grid grid-cols-1 gap-2.5">
              {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, idx) => {
                const selected = obsAnswers[obsIndex] === idx;
                const isCorrect = idx === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObsSelect(idx)}
                    disabled={showObsFeedback}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showObsFeedback && isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : showObsFeedback && selected && !isCorrect
                        ? 'bg-rose-950/50 border-rose-500 text-rose-300'
                        : 'bg-slate-850 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-teal-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {showObsFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-teal-950/40 border border-teal-500/50 rounded-xl space-y-2.5"
              >
                <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <span>✨ Observation Analysis:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {OBSERVATION_QUESTIONS[obsIndex].explanation}
                </p>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextObservation}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 font-bold rounded-xl text-sm shadow-md shadow-teal-500/20"
                  >
                    {obsIndex + 1 < OBSERVATION_QUESTIONS.length
                      ? 'Next Observation Check →'
                      : 'Enter Jurisprudence Sandbox →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-5 bg-gradient-to-r from-slate-800 to-slate-850 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>🧪 Free Exploration Sandbox</span>
              <span className="text-slate-500">• Ungraded Practice</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">The Legal Studies Moot Court & Case Analyzer</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Test legal scenarios, compare court and ADR forums, and formulate defense arguments without time limits or penalties.
            </p>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setMootTab('brief')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mootTab === 'brief' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              1. Case Fact Pattern
            </button>
            <button
              onClick={() => setMootTab('arguments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mootTab === 'arguments' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              2. Defense Arguments
            </button>
            <button
              onClick={() => setMootTab('verdict')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mootTab === 'verdict' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              3. Judicial Determination
            </button>
          </div>

          {/* Tab 1: Brief */}
          {mootTab === 'brief' && (
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-sm font-bold text-amber-300">Case Brief: State of Maharashtra v. Rajesh (Hit-and-Run Incident)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rajesh was driving his luxury SUV at 1:30 AM at 110 km/h in a 40 km/h city zone. Blood tests reveal an alcohol level of 80 mg/100 ml (legal limit is 30 mg). He crashed into two pedestrians crossing at a zebra crossing, causing instant fatal injuries.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Admit Forensic Evidence & Eyewitness Statements</span>
                <button
                  onClick={() => {
                    setMootEvidenceAdmitted(!mootEvidenceAdmitted);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    mootEvidenceAdmitted ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {mootEvidenceAdmitted ? '✓ Evidence Admitted' : '+ Admit Evidence'}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Arguments */}
          {mootTab === 'arguments' && (
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-sm font-bold text-amber-300">Framing the Charge & Defense Plea</h3>
              <p className="text-xs text-slate-300">Select which substantive IPC section applies based on Mens Rea:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: '302_murder', label: 'Section 302 IPC (Murder)', sub: 'Requires direct intention to cause death' },
                  { id: '304_culpable', label: 'Section 304 Part II (Culpable Homicide)', sub: 'Requires subjective knowledge that act is likely to cause death' },
                  { id: '304A_negligence', label: 'Section 304A IPC (Death by Negligence)', sub: 'Requires rashness/negligence without intent or knowledge' },
                ].map((plea) => (
                  <button
                    key={plea.id}
                    onClick={() => {
                      setMootPlea(plea.id as any);
                      audioManager.play('tap');
                    }}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      mootPlea === plea.id
                        ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{plea.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{plea.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Verdict */}
          {mootTab === 'verdict' && (
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-sm font-bold text-amber-300">High Court Judicial Ruling</h3>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white">
                  Selected Charge: <span className="text-amber-400 uppercase">{mootPlea.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mootPlea === '304_culpable'
                    ? '✓ Accused convicted under Section 304 Part II IPC! High-speed drunken driving carries subjective knowledge of the fatal hazard, satisfying the threshold for culpable homicide not amounting to murder (Alistair Pereira v. State of Maharashtra).'
                    : mootPlea === '302_murder'
                    ? '⚠️ Section 302 Murder charge fails because the prosecution cannot establish direct premeditated intention to murder these specific pedestrians.'
                    : '⚠️ Section 304A is too lenient: driving at 110 km/h while intoxicated goes beyond simple negligence into subjective knowledge of probable death.'}
                </p>
              </div>
            </div>
          )}

          {/* Advance to Graded Challenges */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <span>Ready for Graded Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Canvas Animation Bar */}
          <canvas ref={canvasRef} width={600} height={24} className="w-full bg-slate-950 rounded-lg border border-slate-800" />

          {/* Header & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="text-[11px] text-slate-400">
                Competency Level: <span className="text-amber-300 font-bold uppercase">{activeChallenge.competencyLevel}</span>
              </div>
            </div>

            <motion.div
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/70 border-gold-500 text-gold-300'
                  : 'bg-rose-950/70 border-rose-500 text-rose-300'
              }`}
            >
              {difficulty} TIER
            </motion.div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 sm:p-6 bg-slate-800/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/50 border-rose-500' : 'border-slate-700'
            }`}
          >
            <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
              {activeChallenge.question}
            </p>

            {/* 1. MCQ OPTIONS (Classify / Distinguish / Match) WITH REQUIRED SHAKE ANIMATION */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-4">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : wrongFlash && i !== activeChallenge.correctIndex
                        ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                        : 'bg-slate-850 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl cursor-grab shadow-md shadow-amber-500/20"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Zones */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['stage_1', 'stage_2', 'stage_3', 'stage_4'].map((targetId, idx) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[90px] flex flex-col items-center justify-center text-center transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase text-slate-400 mb-1">Stage {idx + 1} Slot</span>
                      <span className="text-xs">{droppedLabels[targetId] || 'Drop Stage Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm disabled:opacity-40"
                >
                  Verify Stage Mapping →
                </motion.button>
              </div>
            )}

            {/* 3. DRAG SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
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
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-855 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-400">↕ Drag to Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm"
                >
                  Confirm Hierarchy Order →
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC INPUT CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter number..."
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm w-44 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm disabled:opacity-40"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-amber-300 italic">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-650 text-white rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-slate-900 hover:text-red-700 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click statutory components above to build the agreement...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm disabled:opacity-40"
                >
                  Validate Clause Construction →
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION (Progressive Disclosure) */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span>📖</span>
                  <span>Judicial Reasoning & Step-by-Step Explanation:</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="text-amber-400 font-bold mr-1.5">[{sIdx + 1}]</span>
                        {sentence}{!sentence.endsWith('.') ? '.' : ''}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-600/20"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Chamber Evaluation →' : 'Next Court Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Score Header */}
          <div className="p-6 bg-gradient-to-br from-amber-950/60 via-slate-800 to-slate-900 rounded-2xl border border-amber-500/40 text-center space-y-2">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-2xl font-bold text-white">ISC Legal Studies Mastery Achieved!</h2>
            <p className="text-sm text-amber-300">
              Final Evaluated Score: <strong className="text-white text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Competency Mastery: <span className="text-emerald-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (Exact threshold-based message) */}
          <div className={`p-4 rounded-xl border ${motivationalFeedback.bg} space-y-1`}>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold uppercase tracking-wide ${motivationalFeedback.color}`}>
                {motivationalFeedback.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {motivationalFeedback.text}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-600/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Personalized Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-400">❌ Misconception: {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ Judicial Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner (Highly Visible SRS Recommendation) */}
          <div className="p-5 bg-gradient-to-r from-amber-950/50 via-slate-800 to-slate-900 rounded-2xl border border-amber-500/50 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SM-2 Algorithm)
              </h4>
              <span className="text-[11px] px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full font-mono border border-amber-500/40">
                SRS Memory Engine
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors === 0
                  ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs text-slate-400 font-medium">0 Errors (Mastered)</div>
                <div className="text-base font-bold text-emerald-300 mt-1">review in 7 days</div>
                <div className="text-[10px] text-slate-500 mt-1">Long-term consolidation</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-gold-950/80 border-gold-500 ring-2 ring-gold-500/40'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs text-slate-400 font-medium">1–3 Errors (Developing)</div>
                <div className="text-base font-bold text-gold-300 mt-1">review in 3 days</div>
                <div className="text-[10px] text-slate-500 mt-1">Medium recall interval</div>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 4
                  ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/40'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs text-slate-400 font-medium">4+ Errors (Reinforce)</div>
                <div className="text-base font-bold text-rose-300 mt-1">review in 1 day</div>
                <div className="text-[10px] text-slate-500 mt-1">Rapid re-testing cycle</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              Your personalized recall target: <strong className="text-amber-400 font-bold">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </strong> (based on {errors} recorded error{errors === 1 ? '' : 's'}). Returning on schedule cements statutory definitions for the ISC Board Examinations.
            </p>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-amber-300">🏛️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Jurisprudence Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}