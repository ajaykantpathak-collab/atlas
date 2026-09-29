'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── ISC LEGAL STUDIES CLASS 11 SYLLABUS NODE CONSTANTS ───
const NODE_C11_LEGAL_011 = 'c11_legal_011';
const NODE_C11_LEGAL_012 = 'c11_legal_012';
const NODE_C11_LEGAL_013 = 'c11_legal_013';
const NODE_C11_LEGAL_014 = 'c11_legal_014';
const NODE_C11_LEGAL_015 = 'c11_legal_015';
const NODE_C11_LEGAL_016 = 'c11_legal_016';
const NODE_C11_LEGAL_017 = 'c11_legal_017';
const NODE_C11_LEGAL_018 = 'c11_legal_018';
const NODE_C11_LEGAL_019 = 'c11_legal_019';
const NODE_C11_LEGAL_020 = 'c11_legal_020';

const ALL_NODE_IDS = [
  NODE_C11_LEGAL_011, NODE_C11_LEGAL_012, NODE_C11_LEGAL_013, NODE_C11_LEGAL_014,
  NODE_C11_LEGAL_015, NODE_C11_LEGAL_016, NODE_C11_LEGAL_017, NODE_C11_LEGAL_018,
  NODE_C11_LEGAL_019, NODE_C11_LEGAL_020
];

// ─── NARRATIVE SCENARIOS ───
const SCENARIO = {
  title: 'Apex Law Chambers: The Multi-Disciplinary Legal Crisis',
  intro: 'Welcome, Junior Advocate! You have been inducted into Apex Law Chambers, New Delhi. A complex series of corporate, civil, commercial, and criminal disputes have landed on your desk — ranging from an unregistered Surat textile partnership and an ultra vires green-energy company to criminal trials under PMLA/IPC, hazardous chemical tort liabilities, and civil injunctions under the Code of Civil Procedure.',
  context: 'Your task is to analyze substantive statutory provisions and procedural mandates, guide clients through tiered court hierarchies, calculate statutory settlement waterfalls under Section 48, and enforce justice under the Indian legal system.',
  caseBrief: 'Case File No. ALC-2025/C11: The firm represents five major client portfolios encountering immediate statutory deadlines across the Supreme Court, High Courts, Commercial Courts, and Judicial Magistrate forums.'
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Ramesh and Suresh run an unregistered trading firm in Ahmedabad. A commercial buyer in Mumbai owes them ₹8,00,000 for delivered goods. Can the firm file a civil suit against the buyer to recover this contractual debt?',
  options: [
    'Yes — unregistered firms have full, unrestricted legal standing to sue any party in any court',
    'No — Section 69 of the Indian Partnership Act bars unregistered firms from suing third parties to enforce contractual rights',
    'Yes — but only if they deposit a mandatory 50% court penalty into the state treasury upfront',
    'No — because all unregistered partnerships are illegal entities and criminal conspiracies ab initio'
  ],
  correctIndex: 1,
  hintAfter: 'Registration is optional under Section 44, but Section 69 creates a severe one-sided procedural disability for unregistered plaintiff firms!'
};

// ─── PREDICTION QUESTIONS (Predict-then-verify Brilliant.org pattern) ───
interface PredictionQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
  linkedLabIndex: number;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001_s48',
    prompt: 'Predict: If a dissolving partnership has ₹4,00,000 in assets and ₹6,00,000 in outside creditor liabilities, who bears the remaining ₹2,00,000 deficiency under Section 48?',
    options: [
      'The State Registrar of Firms pays the remaining balance from the public insurance fund',
      'Outside creditors must forfeit their remaining claims completely without recourse',
      'The partners must contribute the deficiency rateably out of their personal property according to their profit-sharing ratio',
      'The company converting into an LLP absorbs the debt automatically without partner contribution'
    ],
    correctIndex: 2,
    explanation: 'Under Section 48(a) and 48(b) of the Indian Partnership Act 1932, losses including deficiencies of capital must be paid first out of profits, next out of capital, and lastly by the partners individually in the proportion in which they share profits.',
    verifyInstruction: 'Adjust the Creditor and Asset sliders in Discovery Lab 1 to observe how the net deficiency is computed and assigned.',
    linkedLabIndex: 0
  },
  {
    id: 'pred_002_tort',
    prompt: 'Predict: If an industrial chemical manufacturer leaks lethal gas due to an unprecedented cloudburst (Act of God), will they escape liability under Indian Law?',
    options: [
      'Yes, Vis Major (Act of God) is an absolute complete defence under English Strict Liability in Rylands v. Fletcher',
      'No, under the Indian Absolute Liability doctrine (M.C. Mehta v. Union of India), hazardous enterprises have zero defences even for Vis Major or third-party sabotage',
      'Yes, provided the factory had renewed its annual municipal pollution clearance certificate',
      'No, but damages are capped at a nominal statutory fee of ₹500 per victim'
    ],
    correctIndex: 1,
    explanation: 'In M.C. Mehta v. Union of India (1987), the Supreme Court established that an enterprise engaged in a hazardous or inherently dangerous industry owes an absolute and non-delegable duty to the community, admitting of NO exceptions or defences.',
    verifyInstruction: 'Increase the Enterprise Hazard Modulator in Discovery Lab 4 to 80% to see all traditional Rylands defences get struck out.',
    linkedLabIndex: 3
  }
];

// ─── OBSERVATION QUESTIONS ('What do you notice?' pattern) ───
interface ObservationQuestion {
  id: string;
  prompt: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
  labContext: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001_veil',
    labContext: 'Discovery Lab 2: Corporate Ultra Vires Analyzer',
    prompt: 'Observe the Ultra Vires Analyzer when testing the Casino Cruise activity against the Solar PV Memorandum of Association. What happens to the legal status indicator?',
    observableOptions: [
      'It turns green and marks the contract as voidable at the shareholder’s discretion',
      'It turns red, declaring the contract "ULTRA VIRES — VOID AB INITIO" and incapable of ratification even by 100% shareholder vote',
      'It suggests that filing an amendment with the Registrar automatically validates past acts retroactively',
      'It transfers personal liability exclusively to the lowest-ranking employee'
    ],
    correctIndex: 1,
    explanation: 'Under Ashbury Railway Carriage & Iron Co. v. Riche (1875), an ultra vires act is null and void from the beginning. Because the corporate entity lacked legal capacity, even unanimous shareholder approval cannot breathe life into it.',
  },
  {
    id: 'obs_002_cpc',
    labContext: 'Discovery Lab 5: Civil Jurisdiction & Order 39 Injunctions',
    prompt: 'Observe the Order 39 Injunction Evaluator when you toggle "Irreparable Injury" to FAILED. What is the immediate judicial decree outcome?',
    observableOptions: [
      'The injunction is granted conditionally upon posting a bond',
      'The suit is automatically converted into a criminal FIR under Section 420 IPC',
      'The injunction is REFUSED because all three conditions (prima facie case, balance of convenience, irreparable injury) must be satisfied conjunctively',
      'The High Court immediately transfers the case to arbitration under Section 89 CPC'
    ],
    correctIndex: 2,
    explanation: 'The triple test under Order 39 Rules 1 and 2 of the CPC is conjunctive. If any one pillar fails (e.g., if the harm can be adequately compensated in monetary damages), temporary injunction cannot be granted.',
  }
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Partnership: Section 69 Disability Bar & Section 48 Waterfall',
    instruction: 'Toggle firm registration and adjust creditor claims vs realized assets to analyze Section 69 locus standi and Section 48 liquidation priority.',
    interactionType: 'partnership-sim',
    nodeId: NODE_C11_LEGAL_011,
  },
  {
    title: 'Company Law: Corporate Veil & Ultra Vires Doctrine',
    instruction: 'Inspect the six mandatory MoA clauses (NOLICS) and test corporate contracts against the Object Clause under Section 4.',
    interactionType: 'company-charter',
    nodeId: NODE_C11_LEGAL_012,
  },
  {
    title: 'Criminal Hierarchy & Burden of Proof (Section 24 PMLA)',
    instruction: 'Navigate the tiered Indian criminal court hierarchy and evaluate statutory exceptions to the presumption of innocence in socio-economic offences.',
    interactionType: 'court-hierarchy',
    nodeId: NODE_C11_LEGAL_014,
  },
  {
    title: 'Substantive Torts: Strict vs Absolute Liability',
    instruction: 'Modulate the industrial hazard scale to observe the critical legal transition from English Strict Liability (Rylands) to Indian Absolute Liability (M.C. Mehta).',
    interactionType: 'tort-hazard',
    nodeId: NODE_C11_LEGAL_018,
  },
  {
    title: 'Civil Procedure: Jurisdictions & Order 39 Injunctions',
    instruction: 'Filter territorial and pecuniary limits (CPC S.15-20) and evaluate the conjunctive triple test for interim injunctions under Order 39.',
    interactionType: 'cpc-jurisdiction',
    nodeId: NODE_C11_LEGAL_020,
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
}

// ─── 21 COMPREHENSIVE CHALLENGES (7 Foundation, 7 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // ── 7 FOUNDATION CHALLENGES ──
  {
    id: 'ch_001_f1',
    nodeId: NODE_C11_LEGAL_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Indian Partnership Act, 1932, what is the exact legal status regarding the registration of a partnership firm?',
    options: [
      'Registration is compulsory under Section 3, and failure to register is a cognizable criminal offence',
      'Registration is optional under Section 44, but Section 69 imposes severe procedural disabilities on unregistered firms seeking to sue third parties',
      'Registration is strictly prohibited for firms with fewer than 10 working partners',
      'Registration is automatic upon executing an unregistered partnership deed on stamp paper'
    ],
    correctIndex: 1,
    explanation: 'Section 44 of the Indian Partnership Act, 1932 makes registration optional. However, Section 69 creates a potent indirect inducement: an unregistered firm cannot file a suit in civil court against third parties to enforce a contract.',
    hints: [
      'Look at Section 44 versus Section 69 of the Indian Partnership Act, 1932.',
      'Unlike joint-stock companies, the birth of a partnership does not strictly depend on a state charter.',
      'The statute uses an indirect disability bar rather than direct penal illegality.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_002_f2',
    nodeId: NODE_C11_LEGAL_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each fundamental Memorandum of Association (MoA) clause under Section 4 of Companies Act 2013 to its statutory purpose.',
    dragItems: [
      { label: 'Name Clause', targetId: 'target_name' },
      { label: 'Object Clause', targetId: 'target_obj' },
      { label: 'Situation Clause', targetId: 'target_sit' },
      { label: 'Liability Clause', targetId: 'target_liab' }
    ],
    correctMapping: {
      target_name: 'Name Clause',
      target_obj: 'Object Clause',
      target_sit: 'Situation Clause',
      target_liab: 'Liability Clause'
    },
    explanation: 'The MoA contains six charter clauses (NOLICS). The Name Clause defines corporate identity; Object Clause sets outer power boundaries; Situation Clause establishes RoC domicile; Liability Clause establishes limited liability protection.',
    hints: [
      'The clause that governs whether contracts are intra vires or ultra vires is the Object Clause.',
      'The clause that fixes the State jurisdiction of the Registrar of Companies is the Situation/Registered Office Clause.',
      'The Liability Clause specifies if member liability is limited by shares or guarantee.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_003_f3',
    nodeId: NODE_C11_LEGAL_011,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'XYZ Textiles dissolves with ₹5,00,000 in realized assets and ₹8,00,000 in third-party creditor debts. What is the total deficiency loss (in Lakhs) to be contributed rateably by partners X, Y, and Z under Section 48?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'Lakhs',
    explanation: 'Deficiency = Creditor Liabilities (₹8 Lakhs) - Realized Assets (₹5 Lakhs) = ₹3 Lakhs. Under Section 48(a), this remaining loss must be contributed rateably by the partners.',
    hints: [
      'Subtract total realized assets from total outside third-party creditor liabilities.',
      '₹8 Lakhs - ₹5 Lakhs = ?',
      'The net deficiency to be satisfied is 3 Lakhs.'
    ]
  },
  {
    id: 'ch_004_f4',
    nodeId: NODE_C11_LEGAL_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 29 of the Code of Criminal Procedure (CrPC), 1973, what is the maximum term of imprisonment that a Judicial Magistrate of the First Class (JMFC) can pass?',
    options: [
      'Imprisonment for life or death sentence',
      'Imprisonment for a term not exceeding 7 years',
      'Imprisonment for a term not exceeding 3 years, or fine not exceeding ₹10,000, or both',
      'Imprisonment for a term not exceeding 1 year, or fine not exceeding ₹5,000'
    ],
    correctIndex: 2,
    explanation: 'Under Section 29(2) CrPC, the Court of a Magistrate of the First Class may pass a sentence of imprisonment for a term not exceeding three years, or of fine not exceeding ten thousand rupees, or of both.',
    hints: [
      'Review the statutory sentencing limits for First Class Judicial Magistrates under CrPC Section 29.',
      'Chief Judicial Magistrates (CJM) can sentence up to 7 years.',
      'JMFC is capped at 3 years and ₹10,000 fine.'
    ]
  },
  {
    id: 'ch_005_f5',
    nodeId: NODE_C11_LEGAL_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the foundational Latin maxim that translates to "Where there is a legal right, there is a legal remedy"?',
    options: [
      'Volenti non fit injuria',
      'Ubi jus ibi remedium',
      'Damnum sine injuria',
      'Res ipsa loquitur'
    ],
    correctIndex: 1,
    explanation: 'The maxim "Ubi jus ibi remedium" was famously expounded in Ashby v. White (1703) by Chief Justice Holt, establishing that the law will provide a remedy wherever a recognized civil right is infringed.',
    hints: [
      'Look for the phrase meaning "where there is a right (jus), there is a remedy (remedium)".',
      'This was established in the landmark voting rights case of Ashby v. White.',
      'The correct maxim is Ubi jus ibi remedium.'
    ]
  },
  {
    id: 'ch_006_f6',
    nodeId: NODE_C11_LEGAL_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 11 of the Indian Contract Act, 1872, what is the legal effect of an agreement entered into by an individual who has not attained the age of majority?',
    options: [
      'The agreement is valid and fully enforceable against the minor’s personal assets',
      'The agreement is voidable at the option of the adult party',
      'The agreement is void ab initio (void from the very beginning)',
      'The agreement is converted into a binding mortgage upon attaining 18 years'
    ],
    correctIndex: 2,
    explanation: 'In the landmark Privy Council ruling of Mohori Bibee v. Dharmodas Ghose (1903), it was held that a contract with a minor is void ab initio, and the minor cannot be sued on contract nor can estoppel apply.',
    hints: [
      'Remember the landmark 1903 Privy Council decision involving Dharmodas Ghose.',
      'Minors lack statutory capacity under Section 11.',
      'Such agreements are treated as non-existent in the eyes of law (void ab initio).'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_007_f7',
    nodeId: NODE_C11_LEGAL_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Section 9 of the Code of Civil Procedure (CPC), 1908, what is the general rule regarding the jurisdiction of civil courts in India?',
    options: [
      'Civil courts have jurisdiction to try all suits of a civil nature, EXCEPT those of which their cognizance is either expressly or impliedly barred',
      'Civil courts can only hear suits that have received prior written sanction from the Governor',
      'Civil courts are restricted strictly to family marriage disputes and probate matters',
      'Civil courts have jurisdiction only over foreign nationals living in metropolitan cities'
    ],
    correctIndex: 0,
    explanation: 'Section 9 CPC establishes plenary civil jurisdiction: courts have jurisdiction to try all suits of a civil nature unless their cognizance is expressly barred by a specific statute (e.g., NGT Act, Industrial Disputes Act) or impliedly barred.',
    hints: [
      'Section 9 is the gateway to civil justice in India.',
      'Civil courts possess inherent jurisdiction over civil disputes unless an express statute confers exclusive jurisdiction elsewhere.',
      'Check the clause regarding express or implied statutory bars.'
    ]
  },

  // ── 7 STANDARD CHALLENGES ──
  {
    id: 'ch_008_s1',
    nodeId: NODE_C11_LEGAL_011,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the statutory sequence for the application of partnership assets upon dissolution under Section 48 of the Indian Partnership Act, 1932.',
    sortItems: [
      'Payment of third-party debts and outside liabilities of the firm',
      'Payment to each partner rateably of advances/loans made beyond capital',
      'Payment to each partner rateably of what is due on account of capital',
      'Division of remaining surplus residue among partners in profit-sharing ratio'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Section 48 establishes strict asset application priority: (1) Outside creditors first, (2) Partner advances/loans second, (3) Partner capital third, (4) Residue surplus in profit-sharing ratio.',
    hints: [
      'Outside third-party creditors must always be satisfied before any partner gets a single rupee.',
      'Partner loans/advances take precedence over partner equity capital contributions.',
      'The final remaining residue is split according to the profit-sharing ratio.'
    ]
  },
  {
    id: 'ch_009_s2',
    nodeId: NODE_C11_LEGAL_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar energy company whose Object Clause authorizes only "solar panel fabrication" enters into an agreement to purchase luxury casinos in Goa. What is the legal status of this contract?',
    options: [
      'Valid, because the Board of Directors possesses inherent commercial authority to diversify',
      'Ultra vires and void ab initio; cannot be ratified even by a 100% unanimous vote of shareholders',
      'Voidable at the election of the casino vendor upon giving 30 days notice',
      'Valid provided the company files Form MGT-14 within 300 days with the Registrar'
    ],
    correctIndex: 1,
    explanation: 'Under Ashbury Railway Carriage v. Riche and Section 4 of the Companies Act 2013, any transaction beyond the Object Clause of the MoA is ultra vires and completely void ab initio, incapable of ratification.',
    hints: [
      'Does the MoA mention running passenger cruise lines or casinos?',
      'Acts beyond the Object Clause are "ultra vires" (beyond powers).',
      'Recall that ultra vires contracts cannot be ratified even by 100% shareholder agreement.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_010_s3',
    nodeId: NODE_C11_LEGAL_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Section 24 of the Prevention of Money Laundering Act, 2002 (PMLA) modify the traditional common-law presumption of innocence?',
    options: [
      'It completely eliminates the requirement for the prosecution to establish the existence of any scheduled predicate crime',
      'Once prosecution establishes property as proceeds of crime, the statutory burden shifts to the accused to prove the property is untainted',
      'It converts money laundering into a summary civil tort actionable only by municipal corporations',
      'It requires the trial judge to provide personal sureties for the defendant'
    ],
    correctIndex: 1,
    explanation: 'In socio-economic offences like PMLA, Section 24 reverses the burden of proof regarding the source of funds because financial transaction trails and shell entities are in the exclusive knowledge of the accused.',
    hints: [
      'Think about why socio-economic offences receive special statutory treatment.',
      'Who possesses the records and banking books of complex corporate layers?',
      'The burden shifts to the accused only on the specific issue of whether the funds are untainted.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_011_s4',
    nodeId: NODE_C11_LEGAL_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Can a juristic corporation in Maharashtra be prosecuted and fined for criminal offences under Section 11 of the Indian Penal Code (IPC)?',
    options: [
      'No, because only biological natural human beings possess criminal mens rea and physical bodies',
      'Yes, because Section 11 IPC explicitly defines "Person" to include any Company, Association, or body of persons (Standard Chartered Bank v. Directorate of Enforcement)',
      'No, corporations enjoy sovereign criminal immunity under Article 361 of the Constitution',
      'Yes, but only if all shareholders are sentenced to mandatory community service'
    ],
    correctIndex: 1,
    explanation: 'Section 11 IPC provides that the word "Person" includes any Company or Association or body of persons, whether incorporated or not. As held in Standard Chartered Bank (2005), corporations can be prosecuted and penalised with fines.',
    hints: [
      'Check the statutory definition of "Person" in the general explanations of the IPC.',
      'Does Section 11 restrict criminal responsibility strictly to natural biological persons?',
      'Corporate criminal liability allows juristic persons to be prosecuted and fined.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_012_s5',
    nodeId: NODE_C11_LEGAL_015,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the four essential statutory ingredients to construct a valid charge of Dowry Death under Section 304B IPC read with Section 113B Indian Evidence Act.',
    availableParts: [
      'Death caused by burns or bodily injury or abnormal circumstances',
      'Death occurring within 7 years of marriage',
      'Cruelty or harassment by husband or in-laws for dowry demands',
      'Cruelty inflicted soon before death',
      'Death occurring after 15 years of marriage',
      'Victim owning commercial real estate in ancestral village'
    ],
    targetState: 'Death caused by burns or bodily injury or abnormal circumstances Death occurring within 7 years of marriage Cruelty or harassment by husband or in-laws for dowry demands Cruelty inflicted soon before death',
    validationHint: 'Select the 4 statutory ingredients: abnormal death + within 7 years + dowry cruelty + soon before death.',
    explanation: 'Section 304B IPC requires: (1) Death by bodily injury/burns/abnormal conditions, (2) Within 7 years of marriage, (3) Cruelty/harassment by husband or relatives, (4) In connection with dowry demands soon before death.',
    hints: [
      'Remember the statutory 7-year time frame from date of marriage.',
      'The harassment must have a direct nexus to dowry demands.',
      'The cruelty must be shown to have occurred "soon before death".'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_013_s6',
    nodeId: NODE_C11_LEGAL_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the sine qua non (essential dividing element) that distinguishes Criminal Breach of Trust (Section 405 IPC) from Dishonest Misappropriation of Property (Section 403 IPC)?',
    options: [
      'The market value of the property involved in the transaction',
      'The presence of Entrustment — CBT requires initial lawful custody via fiduciary trust, whereas Misappropriation occurs when property is found or acquired without initial entrustment',
      'CBT applies exclusively to real estate, while Misappropriation applies exclusively to cash',
      'Misappropriation requires the use of deadly weapons, whereas CBT requires electronic fraud'
    ],
    correctIndex: 1,
    explanation: 'As held in K. Narayanaswamy v. State of Karnataka, "Entrustment" is the sine qua non of Criminal Breach of Trust (Section 405). If property is merely found on the road without entrustment and dishonestly retained, it falls under Section 403.',
    hints: [
      'Think about giving your watch to a jeweler for repair versus finding a watch on the pavement.',
      'Was confidence and fiduciary custody deliberately reposed in the accused?',
      'Entrustment creates lawful initial custody before the subsequent dishonest conversion occurs.'
    ]
  },
  {
    id: 'ch_014_s7',
    nodeId: NODE_C11_LEGAL_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A minor aged 16 obtains ₹50,000 worth of necessary food and medical care from a local guardian. Under Section 68 of the Indian Contract Act, how can this reimbursement be recovered?',
    options: [
      'The minor can be personally arrested and detained in civil prison',
      'Reimbursement can be claimed only out of the minor’s estate/property, with zero personal liability against the minor',
      'The claim is void ab initio and no reimbursement is permissible under any circumstance',
      'The minor’s school principal becomes personally liable to discharge the debt'
    ],
    correctIndex: 1,
    explanation: 'Section 68 provides a quasi-contractual remedy for "necessaries supplied to person incapable of contracting": the supplier is entitled to be reimbursed from the property of such incapable person, but the minor incurs no personal liability.',
    hints: [
      'Review Section 68 on necessaries supplied to minors.',
      'Does the law impose personal liability or proprietary liability?',
      'Reimbursement is limited strictly to the minor’s estate or property.'
    ]
  },

  // ── 7 ADVANCED CHALLENGES ──
  {
    id: 'ch_015_a1',
    nodeId: NODE_C11_LEGAL_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An unregistered firm files a suit against a debtor for ₹10 Lakhs. During the pendency of the suit, the firm completes its registration with the Registrar of Firms. Does this subsequent registration cure the initial Section 69 defect?',
    options: [
      'Yes, registration relates back to the date of execution of the partnership deed automatically',
      'No, subsequent registration does not validate a suit that was void and non-maintainable at the date of its institution (CIT v. Jayalakshmi Cloth Stores)',
      'Yes, provided the trial judge issues a curative certificate under Section 151 CPC',
      'Yes, but only if the defendant files an affidavit consenting to the jurisdiction'
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court in CIT v. Jayalakshmi Cloth Stores held that registration of a firm is a condition precedent to the institution of a suit under Section 69(2). A suit instituted by an unregistered firm is void ab initio and cannot be validated by subsequent registration during its pendency; the firm must file a fresh suit after registration.',
    hints: [
      'Is registration a condition precedent or a curable procedural irregularity?',
      'Look at whether the court possessed jurisdiction on the exact day the plaint was presented.',
      'The firm must withdraw the defective suit and file a fresh suit after registration is completed.'
    ]
  },
  {
    id: 'ch_016_a2',
    nodeId: NODE_C11_LEGAL_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In corporate jurisprudence, when can Indian courts pierce the corporate veil under the doctrine established in Daimler Co. v. Continental Tyre and Tata Engineering v. State of Bihar?',
    options: [
      'Whenever the company fails to declare a 10% annual dividend to equity shareholders',
      'Where the corporate character is used as a cloak for fraud, tax evasion, enemy character, or to evade statutory/welfare obligations',
      'Whenever the company transitions from a Private Limited to a Public Limited entity',
      'Whenever a company issues debentures with a tenure exceeding 5 years'
    ],
    correctIndex: 1,
    explanation: 'As held in Tata Engineering (1965) and LIC v. Escorts Ltd. (1986), the corporate veil is pierced only in exceptional circumstances: fraud, sham entities created to evade taxes (Sir Dinshaw Maneckjee Petit), trading with the enemy (Daimler), or avoiding statutory labor obligations (Workmen of Associated Rubber Industry).',
    hints: [
      'Separate legal personality (Salomon) is the rule; veil lifting is the judicial exception.',
      'Why would a court look behind the company to the actual human controllers?',
      'Look for elements of fraud, tax evasion, or circumventing mandatory welfare statutes.'
    ]
  },
  {
    id: 'ch_017_a3',
    nodeId: NODE_C11_LEGAL_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 17-year-old child in conflict with law is alleged to have committed a heinous offence punishable with over 7 years imprisonment. Under Section 15 of the Juvenile Justice Act, 2015, what is the mandatory statutory protocol?',
    options: [
      'The JJB must pass a death sentence immediately without inquiry',
      'The JJB must conduct a preliminary assessment of mental/physical capacity and ability to understand consequences, assisted by psychologists, before deciding whether to transfer the trial to the Children’s Court',
      'The child is automatically released with zero inquiry under an irrebuttable presumption of doli incapax',
      'The child is transferred directly to an adult central jail without any JJB assessment'
    ],
    correctIndex: 1,
    explanation: 'Section 15 JJ Act 2015 empowers the JJB to conduct a preliminary assessment of mental/physical capacity and understanding of consequences for 16-18 year-olds in heinous offences, before deciding whether the child should be tried as an adult in the Children’s Court (Section 18(3)).',
    hints: [
      'Recall the post-2012 Nirbhaya legislative reform incorporated in the 2015 Act.',
      'The JJB conducts an inquiry with psychologists into cognitive maturity.',
      'Even if transferred, Section 21 strictly bars the death penalty and life imprisonment without parole.'
    ]
  },
  {
    id: 'ch_018_a4',
    nodeId: NODE_C11_LEGAL_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In M.C. Mehta v. Union of India (1987) (Oleum Gas Leak), how did the Supreme Court explicitly distinguish Indian Absolute Liability from the English Strict Liability rule in Rylands v. Fletcher (1868)?',
    options: [
      'Absolute liability allows defences of Act of God and sabotage, whereas Strict liability does not',
      'Absolute liability applies strictly to hazardous/inherently dangerous enterprises and admits NO exceptions/defences whatsoever, whereas Rylands strict liability is subject to numerous common-law defences',
      'Absolute liability caps all compensation to nominal damages of ₹10,000 per claimant',
      'Absolute liability requires simultaneous proof of criminal premeditation under IPC Section 300'
    ],
    correctIndex: 1,
    explanation: 'Justice P.N. Bhagwati established that Indian jurisprudence must forge its own legal principles. Absolute Liability admits ZERO defences (no Act of God, no third-party sabotage, no plaintiff consent) for enterprises engaged in hazardous activities.',
    hints: [
      'Did the Oleum gas leak case allow the Shriram factory to plead sabotage or natural forces?',
      'Justice Bhagwati created an indigenous rule free from English 19th-century exceptions.',
      'Absolute liability = strict liability minus all defences + enterprise capacity.'
    ]
  },
  {
    id: 'ch_019_a5',
    nodeId: NODE_C11_LEGAL_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Rohit (aged 17) fraudulently represents himself as 22 years old and purchases an expensive motorcycle on credit. He refuses to pay. Can the dealer invoke the doctrine of promissory estoppel against Rohit?',
    options: [
      'Yes, because deliberate fraud by a minor creates an equitable estoppel overriding statutory minority',
      'No, because there can be no estoppel against a statute (Section 11 Contract Act); however, the court may order restitution of the specific motorcycle under Section 33 Specific Relief Act, 1963',
      'Yes, the dealer can obtain a decree for 10 years rigorous imprisonment',
      'Yes, because motorcycle purchases are deemed statutory necessaries for minors under Section 68'
    ],
    correctIndex: 1,
    explanation: 'Under Mohori Bibee and Leslie v. Sheill, estoppel cannot be invoked against a minor to make a void agreement binding. However, under the doctrine of restitution (codified in Section 33 of the Specific Relief Act, 1963), the court may compel the minor to restore any traceable property obtained through fraud.',
    hints: [
      'Can an equitable rule like estoppel override an express statutory disqualification in Section 11?',
      'Check Section 33 of the Specific Relief Act, 1963 regarding restoring traceable property.',
      'The contract remains void, but unjust enrichment is prevented via restitution.'
    ]
  },
  {
    id: 'ch_020_a6',
    nodeId: NODE_C11_LEGAL_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A commercial plaintiff seeks a temporary injunction under Order 39 Rules 1 & 2 CPC to restrain the demolition of a warehouse. What three conjunctive conditions must be established before the court can grant interim relief?',
    options: [
      'Registration of an FIR, sanction of the District Collector, and payment of 50% court fees',
      'Prima facie case, Balance of convenience in plaintiff’s favour, and Irreparable injury that cannot be compensated by monetary damages',
      'Unanimous shareholder vote, corporate seal endorsement, and high court original side clearance',
      'Affidavits from 3 gazetted officers, municipal NOC, and solvency certificate'
    ],
    correctIndex: 1,
    explanation: 'Under Dorab Cawasji Patel v. Bai Sugra (1972) and Order 39 CPC, the triple test for temporary injunctions requires: (1) Prima facie case (serious question to be tried), (2) Balance of convenience (greater hardship if refused), and (3) Irreparable injury (harm incapable of pecuniary compensation).',
    hints: [
      'Think of the three foundational pillars every civil judge examines before granting ad-interim stay.',
      'Does the plaintiff have a plausible right on first look? (Prima facie)',
      'Will greater hardship be caused by refusing the injunction? Is monetary compensation inadequate?'
    ]
  },
  {
    id: 'ch_021_a7',
    nodeId: NODE_C11_LEGAL_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 366 of the Code of Criminal Procedure (CrPC), 1973, when a Court of Session passes a sentence of death, what mandatory statutory step is required before the sentence can be executed?',
    options: [
      'The death sentence can be executed immediately upon signature of the Sessions Judge',
      'The proceedings must be submitted to the High Court, and the sentence cannot be executed unless confirmed by a Bench of at least two High Court Judges (Section 368/369 CrPC)',
      'The convict is automatically pardoned if no executioner is available within 30 days',
      'The death sentence is executed only after obtaining a resolution passed by the State Legislative Assembly'
    ],
    correctIndex: 1,
    explanation: 'Under Section 366 CrPC, a Court of Session cannot execute a capital sentence without submission to and confirmation by the High Court. Under Section 369 CrPC, such confirmation must be signed by at least two High Court Judges.',
    hints: [
      'Look at the relationship between Court of Session capital powers and High Court confirmation.',
      'Check Section 366 and Section 369 CrPC.',
      'The sentence remains inoperative until confirmed by a Division Bench of the High Court.'
    ]
  }
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_LEGAL_011,
  title: 'Class 11 Legal Studies: Partnership, Corporate Personality, Criminal Justice & Civil Procedure',
  definition: 'Mastery of ISC Class 11 Legal Studies spanning Partnership dissolution (Sections 39-48, 69), Company characteristics and Ultra Vires doctrine, Criminal Court Hierarchy (IPC/CrPC), Law of Torts (Strict vs Absolute Liability), and CPC 1908 (Order 39 Injunctions).',
  eli5: 'Think of the Indian legal system like a giant city rulebook: business laws organize companies, criminal and tort laws protect citizens from injury, and civil procedure provides the court maps to resolve disputes.',
  misconceptions: [
    { misconception: 'Registration of a partnership firm is legally compulsory under the 1932 Act.', correction: 'Section 44 makes registration optional; Section 69 creates a procedural disability barring unregistered firms from suing third parties.' },
    { misconception: 'A company incorporated under the Companies Act 2013 is an Indian citizen with all fundamental rights.', correction: 'A company is a separate legal person, but NOT a citizen under the Constitution or Citizenship Act 1955 (Tata Engineering v. State of Bihar).' },
    { misconception: 'In socio-economic crimes under PMLA, the accused is presumed completely guilty of all charges.', correction: 'Section 24 PMLA shifts the burden only on the specific issue of whether the proceeds of crime are untainted; the underlying crime must still be established.' },
    { misconception: 'A corporate company cannot commit an IPC offence because it lacks a physical body.', correction: 'Section 11 IPC defines "Person" to include any Company or Association, allowing corporate criminal prosecution and fines.' },
    { misconception: 'A dowry death charge under Section 304B applies regardless of how long the couple was married.', correction: 'Section 304B strictly applies only when the woman dies under abnormal circumstances within 7 years of marriage.' }
  ],
  masteryCriteria: 'Student must demonstrate comprehensive knowledge of Indian Partnership, Corporate Personality, IPC offences, Criminal court hierarchy, Law of Torts, Contract law, and Civil Procedure jurisdictions.'
};

const REAL_WORLD_ACTIVITY = {
  title: 'Apex Chambers: Lead Moot Court Counsel Brief',
  description: 'You are representing a client before the National Green Tribunal and the High Court of Delhi in a multi-pronged dispute involving an unregistered solar firm, corporate veil fraud, and an industrial chemical leak.',
  steps: [
    'Draft an application under the Section 69(3) proviso to cure partnership non-registration during suit pendency or initiate dissolution accounts.',
    'Formulate pleadings under Section 4 of the Companies Act 2013 establishing that an ultra vires contract cannot bind the company.',
    'Argue against the availability of Rylands defences by invoking the Absolute Liability rule in M.C. Mehta v. Union of India (1987).',
    'Submit an application for a temporary injunction under Order 39 Rules 1 & 2 CPC satisfying the conjunctive triple test (prima facie case, balance of convenience, irreparable injury).'
  ]
};

// ─── MAIN COMPONENT ───
export default function C11_LegalStudiesPartnershipRegistrationDissolutionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_LEGAL_011,
  title = DEFAULT_PROPS.title || 'Class 11 Legal Studies Master Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Prediction State (Predict-then-verify pattern)
  const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  // Observation State ('What do you notice?' pattern)
  const [currentObservationIndex, setCurrentObservationIndex] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  // Reflection responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Variables
  const [firmRegistered, setFirmRegistered] = useState(false);
  const [firmAssets, setFirmAssets] = useState(4); // in Lakhs
  const [firmDebts, setFirmDebts] = useState(6); // in Lakhs
  const [selectedMoAClause, setSelectedMoAClause] = useState<string>('Object');
  const [isUltraVires, setIsUltraVires] = useState(false);
  const [corporateActivity, setCorporateActivity] = useState<string>('Manufacture Solar PV Panels');
  const [selectedCourtLevel, setSelectedCourtLevel] = useState<number>(0);
  const [pmlaReversalActive, setPmlaReversalActive] = useState(false);
  const [hazardLevel, setHazardLevel] = useState<number>(30);
  const [strictDefencesAvailable, setStrictDefencesAvailable] = useState(true);
  const [selectedTerritory, setSelectedTerritory] = useState<'Delhi' | 'Mumbai' | 'Chennai'>('Delhi');
  const [claimValuation, setClaimValuation] = useState<number>(8);
  const [injunctionPrimaFacie, setInjunctionPrimaFacie] = useState(true);
  const [injunctionBalanceConvenience, setInjunctionBalanceConvenience] = useState(true);
  const [injunctionIrreparableHarm, setInjunctionIrreparableHarm] = useState(true);

  // Drag & Sort States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback & Answer Revelation States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

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
    if (timelineGsapRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.04;
      const swing = Math.sin(angle) * 0.2;

      ctx.save();
      ctx.translate(canvas.width / 2, 22);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 16);
      ctx.stroke();

      ctx.save();
      ctx.rotate(swing);
      ctx.beginPath();
      ctx.moveTo(-35, -8);
      ctx.lineTo(35, -8);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(-35, 8, 8, 0, Math.PI);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(35, 8, 8, 0, Math.PI);
      ctx.fill();
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent legal intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
  }, []);

  const handlePredictionAnswer = useCallback((idx: number) => {
    setPredictionSelected(idx);
    setPredictionSubmitted(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[currentPredictionIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    if (isCorrect) {
      setShowSparkles(true);
    }
  }, [currentPredictionIndex]);

  const handleNextPredictionOrLab = useCallback(() => {
    const p = PREDICTION_QUESTIONS[currentPredictionIndex];
    if (currentPredictionIndex + 1 < PREDICTION_QUESTIONS.length) {
      // Proceed to the specific lab linked, then come back or advance
      setCurrentSlide(p.linkedLabIndex);
      setPhase('explore');
    } else {
      setCurrentSlide(p.linkedLabIndex);
      setPhase('explore');
    }
  }, [currentPredictionIndex]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
  }, []);

  const handleObservationAnswer = useCallback((idx: number) => {
    setObservationSelected(idx);
    setObservationSubmitted(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[currentObservationIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    if (isCorrect) {
      setShowSparkles(true);
    }
  }, [currentObservationIndex]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handleHazardChange = useCallback((val: number) => {
    setHazardLevel(val);
    const defencesOpen = val < 70;
    setStrictDefencesAvailable(defencesOpen);
    audioManager.play('count');
  }, []);

  const handleCorporateActivityToggle = useCallback((activity: string, ultra: boolean) => {
    setCorporateActivity(activity);
    setIsUltraVires(ultra);
    audioManager.play('tap');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
    } else {
      setShowHint(false);
      setAnswerRevealed(true);
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setShowHint(false);
    setAnswerRevealed(false);
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowSparkles(true);
      setAnswerRevealed(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const section48Deficiency = useMemo(() => {
    return Math.max(0, firmDebts - firmAssets);
  }, [firmDebts, firmAssets]);

  const properCourtDetails = useMemo(() => {
    let jurisdictionText = 'Junior Civil Judge / Munsif Court';
    if (claimValuation > 10) jurisdictionText = 'Commercial Court / High Court Original Side';
    else if (claimValuation > 5) jurisdictionText = 'Senior Civil Judge / District Court';
    return {
      court: `${selectedTerritory} ${jurisdictionText}`,
      summarySuitEligible: claimValuation <= 10
    };
  }, [claimValuation, selectedTerritory]);

  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-amber-500/20 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 rounded-xl border border-amber-500/30">⚖️</span>
          <div>
            <h1 className="text-lg md:text-xl font-black text-amber-300 tracking-wide">{title}</h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 11 Legal Studies • Chapters 3, 4 & 5</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <canvas ref={canvasRef} width={120} height={40} className="rounded-lg bg-slate-950/60 border border-slate-800" aria-label="Animated Scales of Justice" />
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-600' :
              difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border-rose-600' :
              'bg-amber-950 text-amber-400 border-amber-600'
            }`}
          >
            {difficulty}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-700/40 shadow-xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Chambers Induction Case
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-amber-200/90 leading-relaxed font-mono">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Initial Legal Inquiry (Ungraded Discovery Hook):
            </h3>
            <p className="text-sm font-semibold text-white leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-amber-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && ' ✗'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Section 69 creates a one-sided procedural bar.' : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Advance to Predict-then-Check Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Prediction Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PREDICTION PHASE (Brilliant.org Predict-then-verify pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider">
                Brilliant Inquiry • Prediction {currentPredictionIndex + 1} of {PREDICTION_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400">Predict before interacting</span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {PREDICTION_QUESTIONS[currentPredictionIndex].prompt}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {PREDICTION_QUESTIONS[currentPredictionIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Prediction option ${String.fromCharCode(65 + i)}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePredictionAnswer(i)}
                  disabled={predictionSubmitted}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    predictionSubmitted && i === PREDICTION_QUESTIONS[currentPredictionIndex].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : predictionSubmitted && predictionSelected === i
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                      : 'bg-slate-950/80 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-amber-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-3">
                <div className="text-xs text-amber-200">
                  <span className="font-bold text-amber-400">Legal Principle: </span>
                  {PREDICTION_QUESTIONS[currentPredictionIndex].explanation}
                </div>
                <div className="p-2.5 bg-amber-950/30 rounded-lg border border-amber-900/40 text-xs font-mono text-amber-300">
                  🔬 <strong>How to Verify in Lab: </strong> {PREDICTION_QUESTIONS[currentPredictionIndex].verifyInstruction}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <motion.button
                    aria-label="Verify in Visual Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextPredictionOrLab}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-lg"
                  >
                    Launch Interactive Lab to Verify →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Interactive Discovery Lab {currentSlide + 1} of 5</span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous Exploration Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 disabled:opacity-40 text-xs font-bold rounded-lg"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label="Next Exploration Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToObservation();
                }}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-lg"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Observation Quiz →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm text-amber-300/90 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 min-h-[460px]"
            >
              {/* LAB 1: Partnership Dissolution & Section 48 Multi-Representation + SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* TOP: SVG Diagram Representation of S.48 Waterfall */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      Representation A: Section 48 Statutory Waterfall Flowchart (SVG Diagram)
                    </span>
                    <svg viewBox="0 0 760 110" className="w-full h-auto max-h-28 text-slate-100 font-sans" role="img" aria-label="Section 48 Asset Distribution Waterfall Diagram">
                      <defs>
                        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      {/* Box 1: Outside Creditors */}
                      <rect x="10" y="20" width="165" height="70" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="92" y="45" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. Outside Creditors</text>
                      <text x="92" y="65" fill="#ffffff" fontSize="9" textAnchor="middle">Debts to third parties</text>
                      <text x="92" y="78" fill="#fca5a5" fontSize="8" textAnchor="middle">(Strict 1st Priority)</text>

                      {/* Arrow 1 */}
                      <path d="M 175 55 L 205 55" stroke="#f59e0b" strokeWidth="3" />
                      <polygon points="205,50 215,55 205,60" fill="#f59e0b" />

                      {/* Box 2: Partner Advances */}
                      <rect x="215" y="20" width="165" height="70" rx="10" fill="#0f291e" stroke="#10b981" strokeWidth="2" />
                      <text x="297" y="45" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">2. Partner Advances</text>
                      <text x="297" y="65" fill="#ffffff" fontSize="9" textAnchor="middle">Loans/advances rateably</text>
                      <text x="297" y="78" fill="#a7f3d0" fontSize="8" textAnchor="middle">(2nd Priority)</text>

                      {/* Arrow 2 */}
                      <path d="M 380 55 L 410 55" stroke="#f59e0b" strokeWidth="3" />
                      <polygon points="410,50 420,55 410,60" fill="#f59e0b" />

                      {/* Box 3: Partner Capital */}
                      <rect x="420" y="20" width="160" height="70" rx="10" fill="#31133f" stroke="#c084fc" strokeWidth="2" />
                      <text x="500" y="45" fill="#e9d5ff" fontSize="11" fontWeight="bold" textAnchor="middle">3. Partner Capital</text>
                      <text x="500" y="65" fill="#ffffff" fontSize="9" textAnchor="middle">Capital refund rateably</text>
                      <text x="500" y="78" fill="#f5d0fe" fontSize="8" textAnchor="middle">(3rd Priority)</text>

                      {/* Arrow 3 */}
                      <path d="M 580 55 L 600 55" stroke="#f59e0b" strokeWidth="3" />
                      <polygon points="600,50 610,55 600,60" fill="#f59e0b" />

                      {/* Box 4: Surplus Residue */}
                      <rect x="610" y="20" width="140" height="70" rx="10" fill="#2d1b06" stroke="#f59e0b" strokeWidth="2" />
                      <text x="680" y="45" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">4. Surplus Residue</text>
                      <text x="680" y="65" fill="#ffffff" fontSize="9" textAnchor="middle">Split in profit ratio</text>
                      <text x="680" y="78" fill="#fed7aa" fontSize="8" textAnchor="middle">(Final Residue)</text>
                    </svg>
                  </div>

                  {/* BOTTOM: Dynamic Numerical Equation + Interactive Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-amber-300 uppercase">Representation B: Dynamic Formula & Controls</h3>
                      <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="text-xs font-bold">Registration Status:</div>
                        <motion.button
                          aria-label="Toggle partnership registration status"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setFirmRegistered(!firmRegistered);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                            firmRegistered ? 'bg-emerald-600 text-white' : 'bg-rose-700 text-white'
                          }`}
                        >
                          {firmRegistered ? '✓ Registered with RoF' : '✗ Unregistered Firm'}
                        </motion.button>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <label htmlFor="creditor-slider" className="text-xs font-bold text-slate-300 block">Outside Creditor Debts: ₹{firmDebts} Lakhs</label>
                        <input id="creditor-slider" aria-label="Outside Creditor Debts Slider" type="range" min={1} max={10} value={firmDebts} onChange={e => setFirmDebts(Number(e.target.value))} className="w-full accent-amber-500" />
                        <label htmlFor="assets-slider" className="text-xs font-bold text-slate-300 block">Realized Assets: ₹{firmAssets} Lakhs</label>
                        <input id="assets-slider" aria-label="Realized Assets Slider" type="range" min={1} max={10} value={firmAssets} onChange={e => setFirmAssets(Number(e.target.value))} className="w-full accent-amber-500" />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Representation C: Settlement Mathematical Formula</span>
                        <div className="mt-3 p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 font-mono text-xs text-amber-300">
                          <code>Deficiency Loss = Creditor Claims (₹{firmDebts}L) - Realized Assets (₹{firmAssets}L) = ₹{section48Deficiency} Lakhs</code>
                        </div>

                        <div className="mt-3 space-y-2 text-xs">
                          <div className={`p-2.5 rounded-lg border ${firmRegistered ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300'}`}>
                            {firmRegistered ? '✓ Firm Suit Against 3rd Party: ALLOWED' : '✗ Firm Suit Against 3rd Party: BARRED under S. 69(1)'}
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                            ✓ 3rd Party Suit Against Firm: ALWAYS MAINTAINABLE
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 text-[11px] text-slate-400">
                        ⚖️ <em>Section 48 IPA, 1932</em>: Partners share losses in profit-sharing ratio.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: Company Law, MoA NOLICS & Ultra Vires */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-amber-300 uppercase">Memorandum Clauses (NOLICS)</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['Name', 'Office/Situation', 'Object', 'Liability', 'Capital', 'Subscription'].map(cl => (
                        <motion.button
                          key={cl}
                          aria-label={`Select MoA ${cl} Clause`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedMoAClause(cl);
                            audioManager.play('tap');
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedMoAClause === cl ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          {cl} Clause
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <span className="text-amber-400 font-bold">{selectedMoAClause} Clause Details:</span>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedMoAClause === 'Object' ? 'Defines the outer boundaries of the company’s lawful activities. Any contract outside this clause is ultra vires and completely void ab initio (Ashbury v. Riche).' :
                         selectedMoAClause === 'Name' ? 'Mandates "Limited" for public or "Private Limited" for private companies to put the commercial world on notice.' :
                         selectedMoAClause === 'Office/Situation' ? 'Specifies the Indian State in which the registered office is situated, fixing RoC and High Court territorial jurisdiction.' :
                         selectedMoAClause === 'Liability' ? 'Declares whether members have limited liability capped to unpaid share capital under Section 2(22).' :
                         selectedMoAClause === 'Capital' ? 'States authorised share capital divided into shares of fixed denomination.' :
                         'Contains subscriber covenants agreeing to take shares and incorporate.'}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-300">Test Corporate Contract Scope:</h4>
                      <div className="flex gap-2">
                        <button
                          aria-label="Set Intra Vires Solar Activity"
                          onClick={() => handleCorporateActivityToggle('Manufacture Solar PV Panels', false)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${!isUltraVires ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          ✓ Solar PV (In MoA)
                        </button>
                        <button
                          aria-label="Set Ultra Vires Casino Activity"
                          onClick={() => handleCorporateActivityToggle('Acquire Casino Cruise Ships', true)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${isUltraVires ? 'bg-rose-900/60 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          ✗ Casino Cruise (Not in MoA)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ultra Vires Doctrine Analyzer</span>
                      <div className={`mt-4 p-4 rounded-xl border ${isUltraVires ? 'bg-rose-950/60 border-rose-600' : 'bg-emerald-950/60 border-emerald-600'}`}>
                        <div className="text-sm font-black text-white">{corporateActivity}</div>
                        <div className={`text-xs font-bold mt-1 ${isUltraVires ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {isUltraVires ? '✗ ⛔ ULTRA VIRES — VOID AB INITIO' : '✓ INTRA VIRES — FULLY ENFORCEABLE'}
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                          {isUltraVires ? 'Cannot be validated or ratified even if 100% of shareholders vote in favour at an AGM.' : 'Within the four corners of the Object Clause. Valid corporate obligation.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                      🏢 <em>Salomon v. Salomon (1897)</em> & <em>Tata Engineering (1965)</em>: Company is a distinct legal person, but NOT a citizen under Part III of the Constitution.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: Criminal Hierarchy + SVG 2 */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* TOP: SVG Diagram of Indian Criminal Court Hierarchy */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      Representation A: Indian Criminal Court Hierarchy Pyramid (SVG Diagram)
                    </span>
                    <svg viewBox="0 0 760 120" className="w-full h-auto max-h-32 text-slate-100 font-sans" role="img" aria-label="Indian Criminal Court Hierarchy Diagram">
                      {/* Tier 1: Apex Supreme Court */}
                      <polygon points="380,10 460,40 300,40" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                      <text x="380" y="32" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">Supreme Court (Art. 124)</text>

                      {/* Tier 2: High Court */}
                      <polygon points="300,43 460,43 510,73 250,73" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="380" y="62" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">High Courts (Art. 214 / S. 366 CrPC Death Confirmation)</text>

                      {/* Tier 3: Sessions Court */}
                      <polygon points="250,76 510,76 560,98 200,98" fill="#132a22" stroke="#34d399" strokeWidth="1.5" />
                      <text x="380" y="90" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Court of Session (Sessions Judge - S. 302/376 Trials)</text>

                      {/* Tier 4: Magistrates */}
                      <polygon points="200,101 560,101 610,118 150,118" fill="#31133f" stroke="#c084fc" strokeWidth="1.5" />
                      <text x="380" y="113" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle">Judicial Magistrate 1st Class / Metropolitan Magistrate (Base Trial Court)</text>
                    </svg>
                  </div>

                  {/* BOTTOM: PMLA Reversal & Hierarchy Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-amber-300 uppercase">Representation B: Court Tier Details</h3>
                      <div className="space-y-2">
                        {[
                          { title: 'Supreme Court of India (Art 124)', power: 'Apex constitutional court, special leave petitions under Art 136.' },
                          { title: 'High Court of the State (Art 214)', power: 'Appeals, revisions, mandatory confirmation of death sentences under S.366 CrPC.' },
                          { title: 'Court of Session (Sessions Judge)', power: 'Tries serious offences (murder S.302, dowry death S.304B).' },
                          { title: 'Judicial Magistrate 1st Class / MM', power: 'Imprisonment up to 3 years, fine up to ₹10,000 (S.29 CrPC).' }
                        ].map((crt, idx) => (
                          <motion.div
                            key={idx}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select ${crt.title}`}
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              setSelectedCourtLevel(idx);
                              audioManager.play('tap');
                            }}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                              selectedCourtLevel === idx ? 'bg-amber-950/60 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="text-xs font-bold">{crt.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{crt.power}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Presumption of Innocence vs Section 24 PMLA</h4>
                        <button
                          aria-label="Toggle PMLA Section 24 Burden Reversal"
                          onClick={() => {
                            setPmlaReversalActive(!pmlaReversalActive);
                            audioManager.play('tap');
                          }}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all mb-3 ${
                            pmlaReversalActive ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          {pmlaReversalActive ? '✓ PMLA S.24 Reversal ACTIVE (Burden on Accused)' : '✗ Standard Common Law Trial (Burden on Prosecution)'}
                        </button>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Burden of Proof:</span>
                            <span className="text-amber-300 font-bold">
                              {pmlaReversalActive ? 'On Accused (to prove untainted)' : 'On Prosecution (Beyond doubt)'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Rationale:</span>
                            <span className="text-slate-200">
                              {pmlaReversalActive ? 'Shell account layers in exclusive knowledge' : 'Article 21 presumption'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 mt-3">
                        ⚖️ <em>D.K. Basu (1997)</em>: 11 mandatory arrest guidelines ensure procedural fairness under Art 21.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: Law of Torts + SVG 3 */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* TOP: SVG Diagram Comparing Strict vs Absolute Liability */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      Representation A: English Strict Liability vs Indian Absolute Liability (SVG Comparison)
                    </span>
                    <svg viewBox="0 0 760 110" className="w-full h-auto max-h-28 text-slate-100 font-sans" role="img" aria-label="Tort Liability Comparison Diagram">
                      {/* Left: English Strict Liability */}
                      <rect x="20" y="15" width="340" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="190" y="38" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Strict Liability (Rylands, 1868)</text>
                      <text x="190" y="58" fill="#e2e8f0" fontSize="10" textAnchor="middle">Non-natural use + Escape of dangerous thing</text>
                      <text x="190" y="78" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">✓ Defences Allowed (Act of God, Sabotage, Consent)</text>

                      {/* Right: Indian Absolute Liability */}
                      <rect x="400" y="15" width="340" height="80" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                      <text x="570" y="38" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">Absolute Liability (M.C. Mehta, 1987)</text>
                      <text x="570" y="58" fill="#fee2e2" fontSize="10" textAnchor="middle">Inherently hazardous / Toxic gas enterprise</text>
                      <text x="570" y="78" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">✗ ZERO Defences Allowed (Non-delegable enterprise risk)</text>
                    </svg>
                  </div>

                  {/* BOTTOM: Hazard Slider & Defence Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-amber-300 uppercase">Representation B: Dynamic Hazard Modulator</h3>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Enterprise Hazard Level:</span>
                          <span className={`font-bold ${hazardLevel > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{hazardLevel}% ({hazardLevel > 70 ? 'Hazardous Chemical / Gas' : 'Ordinary Commercial Storage'})</span>
                        </div>
                        <input
                          aria-label="Industrial Hazard Scale Slider"
                          type="range"
                          min={10}
                          max={100}
                          value={hazardLevel}
                          onChange={e => handleHazardChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="text-slate-400 font-bold">Available Rylands v. Fletcher Defences:</div>
                        {['Act of God (Vis Major)', 'Sabotage by Unknown Stranger', 'Plaintiff’s Own Default', 'Statutory Authority'].map((def, i) => (
                          <div key={i} className={`p-2 rounded-lg border flex items-center justify-between ${strictDefencesAvailable ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-rose-950/30 border-rose-900 text-rose-500 line-through'}`}>
                            <span>{def}</span>
                            <span className="text-[10px] font-bold">{strictDefencesAvailable ? '✓ VALID DEFENCE' : '✗ BARRED UNDER MEHTA'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Applicable Legal Principle</span>
                        <div className={`mt-3 p-3.5 rounded-xl border ${hazardLevel > 70 ? 'bg-rose-950/50 border-rose-600' : 'bg-gold-950/50 border-gold-600'}`}>
                          <div className="text-sm font-black text-white">
                            {hazardLevel > 70 ? 'ABSOLUTE LIABILITY (M.C. Mehta v. UOI, 1987)' : 'STRICT LIABILITY (Rylands v. Fletcher, 1868)'}
                          </div>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            {hazardLevel > 70
                              ? 'Justice Bhagwati held that hazardous enterprises have an absolute, non-delegable social duty. ZERO defences can be pleaded.'
                              : 'Defendant is liable for escape of dangerous non-natural things, but recognised common-law defences remain open.'}
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-amber-200/80">
                        💡 <em>Ubi jus ibi remedium</em>: Where there is a right to safety, tort law provides unliquidated damages.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: CPC Civil Procedure & Order 39 Injunctions */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-amber-300 uppercase">Choosing Proper Court (CPC S.20)</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Delhi', 'Mumbai', 'Chennai'] as const).map(city => (
                        <button
                          key={city}
                          aria-label={`Select jurisdiction city ${city}`}
                          onClick={() => {
                            setSelectedTerritory(city);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-xl text-xs font-bold border ${selectedTerritory === city ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Claim Valuation:</span>
                        <span className="text-amber-400 font-bold">₹{claimValuation} Lakhs</span>
                      </div>
                      <input
                        aria-label="Claim Valuation Slider"
                        type="range"
                        min={1}
                        max={25}
                        value={claimValuation}
                        onChange={e => setClaimValuation(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-400">Competent Forum:</div>
                      <div className="text-amber-300 font-bold">{properCourtDetails.court}</div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Order 39 Triple Injunction Test</h4>
                      <div className="space-y-2 text-xs">
                        {[
                          { label: '1. Prima Facie Case', val: injunctionPrimaFacie, toggle: () => setInjunctionPrimaFacie(!injunctionPrimaFacie) },
                          { label: '2. Balance of Convenience', val: injunctionBalanceConvenience, toggle: () => setInjunctionBalanceConvenience(!injunctionBalanceConvenience) },
                          { label: '3. Irreparable Injury (No money cure)', val: injunctionIrreparableHarm, toggle: () => setInjunctionIrreparableHarm(!injunctionIrreparableHarm) }
                        ].map((t, idx) => (
                          <div
                            key={idx}
                            role="button"
                            tabIndex={0}
                            aria-label={`Toggle condition ${t.label}`}
                            onClick={() => {
                              t.toggle();
                              audioManager.play('tap');
                            }}
                            className={`p-2.5 rounded-lg border cursor-pointer flex justify-between items-center ${t.val ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300'}`}
                          >
                            <span>{t.label}</span>
                            <span className="font-bold">{t.val ? '✓ SATISFIED' : '✗ FAILED'}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`mt-3 p-3 rounded-lg border text-center text-xs font-bold ${injunctionPrimaFacie && injunctionBalanceConvenience && injunctionIrreparableHarm ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200' : 'bg-rose-900/60 border-rose-500 text-rose-200'}`}>
                        {injunctionPrimaFacie && injunctionBalanceConvenience && injunctionIrreparableHarm
                          ? '🏛️ ✓ TEMPORARY INJUNCTION GRANTED'
                          : '🚫 ✗ INJUNCTION REFUSED — ALL 3 CONDITIONS MANDATORY'}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      📜 <em>Dorab Cawasji Patel v. Bai Sugra (1972)</em>: Injunctions cannot issue on sympathy alone.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── OBSERVATION PHASE ('What do you notice?' pattern) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gold-500/20 text-gold-300 text-xs font-bold rounded-full uppercase tracking-wider">
                Brilliant Observation • Question {currentObservationIndex + 1} of {OBSERVATION_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400">{OBSERVATION_QUESTIONS[currentObservationIndex].labContext}</span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {OBSERVATION_QUESTIONS[currentObservationIndex].prompt}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {OBSERVATION_QUESTIONS[currentObservationIndex].observableOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Observation option ${String.fromCharCode(65 + i)}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleObservationAnswer(i)}
                  disabled={observationSubmitted}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    observationSubmitted && i === OBSERVATION_QUESTIONS[currentObservationIndex].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : observationSubmitted && observationSelected === i
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                      : 'bg-slate-950/80 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <span className="text-gold-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {observationSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-950 rounded-xl border border-gold-500/30 space-y-3">
                <div className="text-xs text-gold-200">
                  <span className="font-bold text-gold-400">Observation Ratio: </span>
                  {OBSERVATION_QUESTIONS[currentObservationIndex].explanation}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  {currentObservationIndex + 1 < OBSERVATION_QUESTIONS.length ? (
                    <motion.button
                      aria-label="Next Observation Question"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentObservationIndex(idx => idx + 1);
                        setObservationSelected(null);
                        setObservationSubmitted(false);
                      }}
                      className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-slate-950 text-xs font-black rounded-xl shadow-lg"
                    >
                      Next Observation Question →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to Legal Sandbox"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-lg"
                    >
                      Enter Legal Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full uppercase">
                Ungraded Legal Sandbox
              </span>
              <h2 className="text-xl font-black text-white mt-2">Chambers Multi-Parameter Testing Bench</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tinker with partnership liabilities, corporate ultra vires clauses, and tort scales without risk.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to Graded Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-2"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase">Partnership S.48 Calculator</h4>
              <div className="space-y-2 text-xs">
                <div>Creditor Claims: ₹{firmDebts}L</div>
                <input aria-label="Sandbox Creditor Debts" type="range" min={1} max={15} value={firmDebts} onChange={e => setFirmDebts(Number(e.target.value))} className="w-full accent-amber-500" />
                <div>Realized Assets: ₹{firmAssets}L</div>
                <input aria-label="Sandbox Realized Assets" type="range" min={1} max={15} value={firmAssets} onChange={e => setFirmAssets(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-amber-300">
                Net Deficiency: ₹{section48Deficiency} Lakhs
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase">Tort Hazard Modulator</h4>
              <div className="text-xs">Hazard Setting: {hazardLevel}%</div>
              <input aria-label="Sandbox Hazard Modulator" type="range" min={10} max={100} value={hazardLevel} onChange={e => handleHazardChange(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className={`p-2.5 rounded-lg text-xs font-bold ${hazardLevel > 70 ? 'bg-rose-950 text-rose-300' : 'bg-gold-950 text-gold-300'}`}>
                {hazardLevel > 70 ? '✗ Absolute Liability (Zero Defences)' : '✓ Strict Liability (Defences Intact)'}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase">CPC Jurisdiction Finder</h4>
              <div className="text-xs">Valuation: ₹{claimValuation}L in {selectedTerritory}</div>
              <input aria-label="Sandbox Claim Valuation" type="range" min={1} max={30} value={claimValuation} onChange={e => setClaimValuation(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-amber-200 truncate">
                {properCourtDetails.court}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 uppercase tracking-wider">
                Competency: {challenge.competencyLevel} • {challenge.difficulty}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="mb-4">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md border border-amber-500/20">
                {challenge.nodeId}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-3 leading-relaxed">
                {challenge.question}
              </h3>
            </div>

            {/* TYPE A: MCQ / Classify / Distinguish */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      answerRevealed && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : answerRevealed && i !== challenge.correctIndex
                        ? 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                        : 'bg-slate-950/80 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-amber-500/50'
                    }`}
                  >
                    <span className="text-amber-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    {answerRevealed && i === challenge.correctIndex && ' ✓ (Correct)'}
                    {answerRevealed && i !== challenge.correctIndex && ' ✗'}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE B: Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each clause label to its matching box below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable clause: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-amber-600/90 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-lg cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_name', label: 'Identity / "Ltd" or "Pvt Ltd" Notice' },
                    { id: 'target_obj', label: 'Ultra Vires Outer Power Boundaries' },
                    { id: 'target_sit', label: 'State of Registered Office Jurisdiction' },
                    { id: 'target_liab', label: 'Limited Liability Ceiling of Members' }
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.label}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400">{target.label}</span>
                      <div className="text-sm font-bold text-amber-300 mt-2">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching clause here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Clause Mappings"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={answerRevealed || Object.keys(droppedLabels).length < 4}
                  className="w-full py-3 bg-amber-600 disabled:opacity-40 text-slate-950 font-black rounded-xl text-sm shadow-lg"
                >
                  Verify Clauses →
                </motion.button>
              </div>
            )}

            {/* TYPE C: Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder into the correct statutory hierarchy:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs font-semibold cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sorted Order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={answerRevealed}
                  className="w-full py-3 bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg mt-2"
                >
                  Check Order →
                </motion.button>
              </div>
            )}

            {/* TYPE D: Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <input
                    aria-label="Calculated deficiency input"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated deficiency..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Numeric Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={answerRevealed || !numericInput}
                    className="px-6 py-2.5 bg-amber-600 text-slate-950 font-black rounded-lg text-sm"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE E: Construct Legal Charge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add ingredient ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-2">
                  <div className="text-xs text-slate-500">Constructed Legal Formulation:</div>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-amber-950/80 border border-amber-700 text-amber-200 text-xs rounded-md flex items-center gap-1.5"
                      >
                        <span>{part}</span>
                        <button
                          aria-label={`Remove ingredient ${part}`}
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Charge Composition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={answerRevealed || constructParts.length === 0}
                  className="w-full py-3 bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg"
                >
                  Verify Charge Composition →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation — only when answerRevealed is true */}
            {answerRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                    Statutory Ratio Decidendi (Step {revealedSteps + 1}):
                  </span>
                </div>

                <div className="space-y-2 text-xs text-amber-100 leading-relaxed font-sans">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2 bg-slate-950/50 rounded-lg border border-amber-900/40"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {step}{!step.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Legal Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-lg ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Trial →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE (MOTIVATIONAL FEEDBACK + REFLECTION) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/40 text-center space-y-3">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-2xl font-black text-white">Chambers Advocacy Assessment Concluded</h2>

            {/* MANDATORY MOTIVATIONAL FEEDBACK */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl my-3">
              <h3 className="text-xl font-black text-amber-300 uppercase tracking-wide">
                {motivationalMessage}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0 ? 'Flawless execution! You mastered every statutory clause and precedent.' :
                 errors <= 3 ? 'You demonstrated a deep understanding of Indian procedural and substantive laws.' :
                 errors <= 7 ? 'Good effort! Review the misconceptions below to solidify your understanding.' :
                 'Keep practicing — statutory mastery comes with continuous legal inquiry!'}
              </p>
            </div>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Errors</div>
                <div className="text-2xl font-black text-rose-400">{errors}</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Mastery Rating</div>
                <div className="text-2xl font-black text-emerald-400 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* MANDATORY REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-amber-500/30 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase flex items-center gap-2">
              <span>📝</span> Judicial Practice Reflection:
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-1" className="text-xs font-bold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-1"
                  aria-label="What was the most surprising thing you learned?"
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="E.g., That Section 69 creates a one-sided bar, or that Absolute Liability has ZERO defences..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-2" className="text-xs font-bold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-2"
                  aria-label="How would you explain this to a friend?"
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="E.g., Companies are separate legal entities, and factories causing toxic leaks cannot blame God or strangers..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-3" className="text-xs font-bold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-3"
                  aria-label="Where in real life might you use this?"
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="E.g., Reviewing partnership registration before suing debtors, or filing interim injunctions under Order 39..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Identified Misconceptions to Rectify:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Myth: {m.misconception}</div>
                      <div className="text-emerald-400 font-semibold">✓ Correct Law: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-300">Next SRS Spaced Review Scheduled:</span>
              <p className="text-slate-400">Optimal memory consolidation in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.</p>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg">SM-2 Active</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 uppercase">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkles && <SparkleBurst onComplete={() => setShowSparkles(false)} />}
    </div>
  );
}