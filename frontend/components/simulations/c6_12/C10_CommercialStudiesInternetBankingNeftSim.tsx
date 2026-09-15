'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C10_COMMSTUD_041 = 'c10_commstud_041'; // Internet Banking: NEFT, RTGS, IMPS, Wallets
const NODE_C10_COMMSTUD_042 = 'c10_commstud_042'; // ATM, Credit & Debit Cards: Differences
const NODE_C10_COMMSTUD_043 = 'c10_commstud_043'; // Caution & Security Practices for Cards
const NODE_C10_COMMSTUD_044 = 'c10_commstud_044'; // Financial Frauds & Governing Statutes
const NODE_C10_COMMSTUD_045 = 'c10_commstud_045'; // Environment (Protection) Act, 1986
const NODE_C10_COMMSTUD_046 = 'c10_commstud_046'; // Central Pollution Control Board (CPCB) Functions

const ALL_NODE_IDS = [
  NODE_C10_COMMSTUD_041,
  NODE_C10_COMMSTUD_042,
  NODE_C10_COMMSTUD_043,
  NODE_C10_COMMSTUD_044,
  NODE_C10_COMMSTUD_045,
  NODE_C10_COMMSTUD_046,
];

// ─── SCENARIO CONTEXT ───
const SCENARIO = {
  title: 'FinTech & Environmental Compliance Command Center',
  intro: 'You are the Chief Operations & Compliance Analyst at Apex Enterprises, Mumbai. Your daily responsibility spans managing high-value fund transfers, securing digital payment systems against sophisticated financial cyber-frauds, and ensuring complete compliance with the Environment (Protection) Act 1986 and CPCB discharge standards.',
  context: 'From approving ₹15,00,000 vendor transfers via RTGS to protecting cardholders against skimming and auditing manufacturing plants for zero-liquid discharge, your decisions directly safeguard capital, security, and statutory legality.',
};

// ─── PREDICTION QUESTIONS ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_rtgs_min',
    question: 'If you attempt to send ₹50,000 using RTGS instead of NEFT or IMPS, what will happen in the banking rail system?',
    options: [
      'The transaction will be rejected because RTGS has a statutory minimum of ₹2,00,000',
      'The transaction will automatically convert into cash delivery at the branch',
      'The transaction will process instantly with a 10% statutory penalty fee',
      'The transaction will be split across 50 separate ₹1,000 batches over 50 hours'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the transfer amount slider below ₹2,00,000 and select RTGS to observe the statutory rejection message.',
    explanation: 'Under RBI regulations, RTGS is designated exclusively for high-value gross settlements and requires a mandatory minimum threshold of ₹2,00,000.'
  },
  {
    id: 'pred_credit_interest',
    question: 'If a credit card balance of ₹20,000 is left unpaid for 12 continuous months at 3.4% monthly interest, how will the total debt change?',
    options: [
      'It will remain exactly ₹20,000 because interest only applies to corporate loans',
      'It will balloon to nearly ₹30,000 due to compounding interest (~40% APR)',
      'The bank will write off the debt to ₹0 after 3 months without penalty',
      'It will only increase by a flat fee of ₹100'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Credit Card in Lab 2 and move the unpaid months slider to 12 to verify the compound interest growth.',
    explanation: 'Credit cards charge roughly 3.4% per month on rolling balances, which compounds to over 40% annually, escalating ₹20,000 to nearly ₹30,000.'
  }
];

// ─── OBSERVATION QUESTIONS ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_rbi_timeline',
    question: 'Observing the RBI Zero-Liability timeline in Lab 3, what happens to customer liability if fraud is reported on Day 2 versus Day 6?',
    options: [
      'Day 2 carries ₹0 liability (100% bank protection), whereas Day 6 caps customer liability at ₹10,000/₹25,000',
      'Both Day 2 and Day 6 carry unlimited personal liability for the cardholder',
      'Day 2 incurs a penalty while Day 6 earns cash rewards for reporting',
      'Day 2 requires court litigation while Day 6 is automatically resolved by NPCI'
    ],
    observableOptions: [
      'Day 2 carries ₹0 liability (100% bank protection), whereas Day 6 caps customer liability at ₹10,000/₹25,000',
      'Both Day 2 and Day 6 carry unlimited personal liability for the cardholder',
      'Day 2 incurs a penalty while Day 6 earns cash rewards for reporting',
      'Day 2 requires court litigation while Day 6 is automatically resolved by NPCI'
    ],
    correctIndex: 0,
    explanation: 'RBI circular dated 20 July 2017 establishes that reporting within 3 working days grants complete zero liability, whereas reporting within 4-7 working days caps customer liability.'
  },
  {
    id: 'obs_cepi_pollution',
    question: 'When adjusting the effluent and stack emissions in Lab 5, at what CEPI index threshold does the regulatory status turn to "Critically Polluted Area"?',
    options: [
      'When CEPI index reaches 25 points',
      'When CEPI index exceeds 70 points',
      'When CEPI index stays below 10 points',
      'When CEPI index is exactly 100 points only'
    ],
    observableOptions: [
      'When CEPI index reaches 25 points',
      'When CEPI index exceeds 70 points',
      'When CEPI index stays below 10 points',
      'When CEPI index is exactly 100 points only'
    ],
    correctIndex: 1,
    explanation: 'Under CPCB criteria, a Comprehensive Environmental Pollution Index (CEPI) score above 70 designates an area as Critically Polluted, triggering statutory closure notices and environmental moratoriums.'
  }
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Apex Enterprises needs to transfer ₹15,00,000 to a Delhi supplier on Monday morning, and ₹8,000 to a freelance graphic designer at 11:30 PM on a Sunday night. What payment rails should be used?',
  options: [
    'RTGS for ₹15 Lakh (real-time gross settlement, ≥₹2 Lakh); IMPS for ₹8,00,000 max (instant 24x7 transfer)',
    'NEFT for ₹15 Lakh (only for large transactions); RTGS for ₹8,000 (settles instantly for small amounts)',
    'Mobile Wallet for ₹15 Lakh (open wallet); NEFT for ₹8,000 (cannot work after 6 PM)',
    'ATM withdrawal slip for both to avoid digital cyber fraud and OTP verification',
  ],
  correctIndex: 0,
  hintAfter: 'Remember: RTGS has a statutory minimum of ₹2,00,000 for gross individual real-time settlement, while IMPS (operated by NPCI) provides instant 24x7 settlement for amounts up to ₹5,00,000!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_neft_rtgs_diff',
    nodeId: NODE_C10_COMMSTUD_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the minimum transaction amount required to initiate an RTGS (Real Time Gross Settlement) payment in India?',
    options: ['₹10,000', '₹50,000', '₹2,00,000', 'No minimum limit'],
    correctIndex: 2,
    explanation: 'RTGS requires a statutory minimum of ₹2,00,000 per transaction with no upper ceiling. It settles each payment gross and individually in real time without batching.',
    hints: [
      'RTGS is specifically designed for high-value wholesale and corporate transfers.',
      'NEFT has no minimum limit, but RTGS has a defined threshold in lakhs.',
      'The minimum limit for RTGS is exactly ₹2 Lakh (₹2,00,000).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_card_source_funds',
    nodeId: NODE_C10_COMMSTUD_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a Debit Card fundamentally differ from a Credit Card in terms of fund source?',
    options: [
      'Debit draws directly from own bank account; Credit uses pre-approved bank credit line (a short-term loan)',
      'Debit allows borrowing up to ₹50,000; Credit spends money directly from your fixed deposit',
      'Both draw from the issuing bank’s reserves without affecting the user’s account',
      'Debit cards charge 40% annual interest; Credit cards never charge interest under any condition',
    ],
    correctIndex: 0,
    explanation: 'A debit card instantly debits the cardholder’s own savings/current account balance. A credit card borrows bank money up to a preset credit limit, generating a debt that must be settled in the billing cycle.',
    hints: [
      'Think about whose money is leaving at the precise second of the swipe.',
      'Debit = your deposit balance. Credit = bank’s short-term loan.',
      'Option A captures the exact distinction in source of funds.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_epa_year_article',
    nodeId: NODE_C10_COMMSTUD_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which Article of the Constitution was the Environment (Protection) Act, 1986 enacted, and what historic disaster triggered it?',
    options: [
      'Article 253; triggered by the Bhopal Gas Tragedy (December 1984)',
      'Article 370; triggered by the Chernobyl disaster (1986)',
      'Article 21; triggered by the Ganga Action Plan (1985)',
      'Article 356; triggered by the Mumbai flood crisis (2005)',
    ],
    correctIndex: 0,
    explanation: 'The Environment (Protection) Act 1986 was enacted under Article 253 of the Constitution (to implement international commitments) following the catastrophic methyl isocyanate gas leak at Bhopal in December 1984.',
    hints: [
      'The disaster occurred at the Union Carbide pesticide plant in Bhopal in 1984.',
      'Parliament used the specific constitutional provision for enacting international obligations.',
      'Article 253 and Bhopal Gas Tragedy (1984) is the correct pair.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cpcb_origin_statute',
    nodeId: NODE_C10_COMMSTUD_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When was the Central Pollution Control Board (CPCB) constituted, and under which founding statute?',
    options: [
      'September 1974 under Section 3 of the Water (Prevention and Control of Pollution) Act, 1974',
      'November 1986 under the Environment (Protection) Act, 1986',
      'January 1981 under the Air (Prevention and Control of Pollution) Act, 1981',
      'August 1947 by an Executive Cabinet Order during Independence',
    ],
    correctIndex: 0,
    explanation: 'The CPCB was established in September 1974 under Section 3 of the Water Act 1974. It later acquired air pollution functions under the Air Act 1981 and central powers under the EPA 1986.',
    hints: [
      'The CPCB originated as a water pollution body before expanding to air and general environment.',
      'Look for the earliest environmental statute enacted in independent India among these options.',
      'CPCB was constituted in September 1974 under the Water Act 1974.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_card_hotlisting_drag',
    nodeId: NODE_C10_COMMSTUD_043,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the security actions and helpline services to their statutory protective roles.',
    dragItems: [
      { label: 'Hotlisting Card', targetId: 'target_helpline' },
      { label: 'Zero Liability Window', targetId: 'target_rbi_time' },
      { label: 'ATM Slot Inspection', targetId: 'target_skimmer' },
    ],
    correctMapping: {
      target_helpline: 'Hotlisting Card',
      target_rbi_time: 'Zero Liability Window',
      target_skimmer: 'ATM Slot Inspection',
    },
    explanation: 'Hotlisting immediately freezes the card via 24x7 bank helplines; reporting within 3 working days gives zero liability under RBI 2017 norms; inspecting slots detects magnetic skimmers.',
    hints: [
      'Where do you report an immediate loss? To the bank helpline for hotlisting.',
      'The 3-day timeline guarantees customer zero liability.',
      'Slot inspection detects physical magnetic cloning devices.',
    ],
  },
  {
    id: 'ch_fraud_intent_distinction',
    nodeId: NODE_C10_COMMSTUD_044,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the definitive legal element that separates a financial fraud from an accounting error?',
    options: [
      'Intent to deceive: Fraud is deliberate deception for unlawful gain; error is unintentional',
      'Amount of money: Errors are below ₹10,000 while frauds always exceed ₹1 Crore',
      'Software used: Frauds only happen on computers; errors happen on physical paper',
      'Presence of auditors: Errors are noticed by auditors, frauds are never discovered',
    ],
    correctIndex: 0,
    explanation: 'The essential criterion is intentionality. An error is an inadvertent slip (corrected via journal entry), whereas fraud involves deliberate deceit to secure an unlawful advantage, attracting criminal liability.',
    hints: [
      'Consider whether the person acted accidentally or purposely with an agenda.',
      'A clerical typo in revenue is an error; fabricating ₹5,040 Cr of fake invoices (like Satyam) is fraud.',
      'Deliberate intent to deceive distinguishes fraud from error.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_epa_umbrella_nature',
    nodeId: NODE_C10_COMMSTUD_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the Environment (Protection) Act, 1986 described as an "Umbrella Legislation"?',
    options: [
      'It supplements and coordinates sector-specific laws (Water 1974, Air 1981) covering all media comprehensively',
      'It completely repealed and erased both the Water Act 1974 and the Air Act 1981',
      'It applies only during the monsoon season for rainwater conservation projects',
      'It protects only public sector undertaking factories while exempting private firms',
    ],
    correctIndex: 0,
    explanation: 'The EPA 1986 sits above the sector-specific Water (1974) and Air (1981) Acts as an overarching roof, regulating multi-media threats, hazardous substances, and environmental standards without repealing earlier Acts.',
    hints: [
      'Think of an umbrella covering multiple individual pillars below it.',
      'It does not replace existing Acts; it supplements them with broad central powers.',
      'Option A correctly explains the comprehensive supplementary coordination.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_satyam_case_analysis',
    nodeId: NODE_C10_COMMSTUD_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the famous Satyam scam (2009), ₹5,040 Crore of cash balances were fabricated using fake customer invoices and forged bank certificates. Under which statute is corporate false accounting prosecuted?',
    options: [
      'Section 447 of the Companies Act, 2013',
      'Section 15 of the Environment Protection Act, 1986',
      'Section 18 of the Water (Pollution Control) Act, 1974',
      'Motor Vehicles Act, 1988',
    ],
    correctIndex: 0,
    explanation: 'Corporate false accounting, balance-sheet falsification, and corporate fraud are prosecuted under Section 447 of the Companies Act 2013, providing imprisonment up to 10 years and heavy statutory fines.',
    hints: [
      'This involves fraudulent company balance sheets and misrepresentation to shareholders.',
      'Which Act governs corporate entities, directors, and statutory audits in India?',
      'Section 447 of the Companies Act, 2013.',
    ],
  },
  {
    id: 'ch_olx_cyber_fraud_eval',
    nodeId: NODE_C10_COMMSTUD_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A fraudster poses as an Indian Army officer on OLX and convinces an engineering student to send an advance token payment of ₹7,500 on UPI for a discounted motorcycle. Why is this classified as Cyber Fraud (Phishing) rather than Credit Card fraud?',
    options: [
      'The victim was deceived through online social engineering into voluntarily making a transfer without card compromise',
      'No money was lost because UPI is managed entirely by NPCI',
      'The transaction exceeded ₹2,00,000 which mandates RTGS classification',
      'The motorcycle was actually delivered so no crime occurred',
    ],
    correctIndex: 0,
    explanation: 'In cyber phishing/social engineering, the victim is manipulated into initiating a voluntary digital payment on an online platform. No card details or PINs were stolen or skimmed.',
    hints: [
      'Notice that no magnetic stripe, ATM skimmer, or physical credit card was used.',
      'The deception happened over the internet marketplace via social engineering.',
      'It is cyber fraud prosecuted under IT Act Section 66 read with IPC Section 420.',
    ],
  },
  {
    id: 'ch_rbi_zero_liability_calc',
    nodeId: NODE_C10_COMMSTUD_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A business executive discovers an unauthorized electronic debit of ₹65,000 on Friday afternoon and immediately hotlists the card and notifies the bank within 24 hours (Day 1). Under RBI Circular of 20 July 2017, what is the customer’s statutory liability amount in Rupees (₹)?',
    correctAnswer: 0,
    tolerance: 0,
    unit: '₹ (Zero)',
    explanation: 'Under the RBI Circular dated 20 July 2017, any unauthorized electronic banking transaction reported within 3 working days results in ZERO liability for the customer.',
    hints: [
      'The report was made on Day 1, which is well within the 3-working-day bracket.',
      'Does prompt reporting within 3 days carry zero or partial liability?',
      'The customer pays ₹0 (zero rupees).',
    ],
  },
  {
    id: 'ch_payment_mode_drag_sort',
    nodeId: NODE_C10_COMMSTUD_041,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the payment modes in order of statutory minimum transaction limit from LOWEST (₹0 / No minimum) to HIGHEST (���2,00,000).',
    sortItems: [
      'NEFT (No minimum limit; retail batch settlement)',
      'IMPS (No minimum limit; instant retail transfer up to ₹5 Lakh)',
      'Mobile Wallet (Prepaid balance transfer up to wallet limit)',
      'RTGS (Statutory minimum ₹2,00,000 for high-value real-time gross settlement)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'NEFT, IMPS, and Wallets have no statutory minimum threshold (can transfer ₹1), whereas RTGS strictly requires a minimum of ₹2,00,000.',
    hints: [
      'RTGS has the highest minimum threshold in Indian banking (₹2 Lakh).',
      'NEFT and IMPS allow retail payments starting from ₹1.',
      'The correct sequence places retail modes first and RTGS at the end.',
    ],
  },
  {
    id: 'ch_cpcb_roles_construct',
    nodeId: NODE_C10_COMMSTUD_046,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the statutory compliance sequence for a textile dyeing unit in Tirupur requiring wastewater discharge approval.',
    availableParts: [
      'CPCB sets national effluent standards',
      'TNPCB inspects & grants Consent to Operate (CTO)',
      'Unit installs Zero Liquid Discharge (ZLD) plant',
      'High Court / NGT enforces environmental penalties',
    ],
    targetState: 'CPCB sets national effluent standards TNPCB inspects & grants Consent to Operate (CTO) Unit installs Zero Liquid Discharge (ZLD) plant High Court / NGT enforces environmental penalties',
    validationHint: 'Standard Setting → State Consent → Industrial Technology Installation → Judicial Enforcement',
    explanation: 'CPCB lays down nationwide effluent norms; the State Board (TNPCB) grants local Consents; the unit implements ZLD recycling; judicial bodies handle statutory prosecution.',
    hints: [
      'Who defines the nationwide technical parameters first? The CPCB.',
      'Who gives the local permit in Tamil Nadu? The State Board (TNPCB).',
      'Follow the logical chain: Standard → Permit → Technology → Judicial Oversight.',
    ],
  },
  {
    id: 'ch_credit_card_interest_math',
    nodeId: NODE_C10_COMMSTUD_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a credit card holder carries an unpaid statement balance with an interest rate of 3.4% per month, what is the approximate compounded annual percentage rate (APR) in percentage?',
    correctAnswer: 40,
    tolerance: 3,
    unit: '% per annum',
    explanation: 'A monthly rate of 3.4% compounds to approximately 40% to 42% per annum, making rolling credit card debt one of the most expensive forms of consumer borrowing.',
    hints: [
      'Multiply roughly 3.4 by 12 and consider compounding effects.',
      'The annual rate is around 40%.',
      'Enter 40 as the representative percentage.',
    ],
  },
  {
    id: 'ch_cpcb_namp_purpose',
    nodeId: NODE_C10_COMMSTUD_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the purpose of the National Air Quality Monitoring Programme (NAMP) operated by the CPCB across 545+ cities?',
    options: [
      'Continuously measure ambient air pollutants (PM10, PM2.5, SO2, NOx) to track environmental health trends',
      'Issue traffic challans and driving licenses to vehicle drivers in metropolitan areas',
      'Sell carbon credits directly to private corporate aviation companies for profit',
      'Manufacture air conditioners and industrial chimney filters in government workshops',
    ],
    correctIndex: 0,
    explanation: 'NAMP is CPCB’s nationwide ambient air quality network running 1,300+ stations to systematically measure PM10, PM2.5, SO2, and NOx for regulatory planning.',
    hints: [
      'NAMP stands for National Air Quality Monitoring Programme.',
      'It is a data-collection and scientific surveillance initiative.',
      'Option A describes ambient pollutant monitoring.',
    ],
  },
  {
    id: 'ch_trademark_counterfeit_law',
    nodeId: NODE_C10_COMMSTUD_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A wholesaler in Ahmedabad sells 10,000 fake bottles of cough syrup marked with the registered "Vicks" trademark without licensing from Procter & Gamble. Under which Act is this Intellectual Property fraud prosecuted?',
    options: [
      'Trade Marks Act, 1999 read with IPC Section 420',
      'Indian Forest Act, 1927',
      'Payment and Settlement Systems Act, 2007',
      'Banking Regulation Act, 1949',
    ],
    correctIndex: 0,
    explanation: 'Unauthorized commercial use of registered brand marks, logos, and packaging is trademark infringement and fraud under the Trade Marks Act 1999 and IPC Section 420 (cheating).',
    hints: [
      'Vicks is a registered brand name and commercial trademark.',
      'Look for the statute dedicated to protecting logos, brand marks, and brand identity.',
      'Trade Marks Act, 1999.',
    ],
  },
  {
    id: 'ch_eval_upi_imps_relation',
    nodeId: NODE_C10_COMMSTUD_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "Because UPI was launched in 2016, the older IMPS infrastructure launched in 2010 is obsolete and can be decommissioned."',
    options: [
      'False: UPI is a user-experience layer built directly on top of IMPS backend rails; IMPS also supports high transfers up to ₹5 Lakh via account+IFSC',
      'True: UPI replaced all bank clearing houses and destroyed the need for underlying settlement systems',
      'True: IMPS was shut down by RBI in December 2019 when NEFT became 24x7',
      'False: UPI only works for foreign transactions while IMPS only works for local cash counters',
    ],
    correctIndex: 0,
    explanation: 'UPI does not replace IMPS; it uses IMPS as its core settlement backbone. Additionally, direct IMPS transfers via Account+IFSC allow transactions up to ₹5 Lakh for users without UPI IDs.',
    hints: [
      'Does UPI run independently or does it utilize NPCI’s existing settlement rails?',
      'UPI uses Virtual Payment Addresses (VPAs) on top of IMPS technology.',
      'Decommissioning IMPS would collapse UPI settlement.',
    ],
  },
  {
    id: 'ch_eval_epa_penal_math',
    nodeId: NODE_C10_COMMSTUD_045,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 15 of the Environment (Protection) Act, 1986, what is the maximum initial statutory prison sentence (in years) for non-compliance with emission standards?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'Years',
    explanation: 'Section 15 provides imprisonment up to 5 years, or fine up to ₹1,00,000, or both. If contravention continues beyond 1 year after conviction, imprisonment extends up to 7 years.',
    hints: [
      'Section 15 sets a multi-year term for corporate executives and plant managers.',
      'The initial statutory maximum term is 5 years.',
      'Enter 5.',
    ],
  },
  {
    id: 'ch_card_liability_tiered_analysis',
    nodeId: NODE_C10_COMMSTUD_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A cardholder detects fraudulent debits on Day 1 but delays notifying the bank until the 6th working day. What is the statutory liability rule under RBI guidelines?',
    options: [
      'Customer liability is capped at ₹10,000 for basic savings (₹25,000 for other accounts); full zero liability is forfeited',
      'The customer is automatically sent to prison under the IT Act for delayed reporting',
      'The bank is legally barred from communicating with the customer after 5 days',
      'The customer receives full zero liability regardless of the delay duration',
    ],
    correctIndex: 0,
    explanation: 'Reports between 4 to 7 working days fall into the second tier where customer liability is capped (up to ₹10,000 for basic accounts, ₹25,000 for regular savings). Prompt reporting within 3 days is essential for 100% zero liability.',
    hints: [
      'Notice the time window: 6th day falls in the 4 to 7 working day category.',
      'Is liability unlimited, zero, or capped at a statutory ceiling?',
      'Liability is capped at ₹10,000 / ₹25,000.',
    ],
  },
  {
    id: 'ch_cpcb_vs_spcb_drag_map',
    nodeId: NODE_C10_COMMSTUD_046,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map the administrative duties between Central (CPCB), State (SPCB), and Judicial bodies.',
    dragItems: [
      { label: 'Nationwide Standards & NAMP', targetId: 'target_cpcb' },
      { label: 'Issue Consent to Operate (CTO)', targetId: 'target_spcb' },
      { label: 'Prosecute & Impose Fines', targetId: 'target_courts' },
    ],
    correctMapping: {
      target_cpcb: 'Nationwide Standards & NAMP',
      target_spcb: 'Issue Consent to Operate (CTO)',
      target_courts: 'Prosecute & Impose Fines',
    },
    explanation: 'CPCB standardises across India; SPCBs issue factory-level Consents; courts/NGT hear criminal cases and adjudicate fines.',
    hints: [
      'CPCB does not issue factory consents or impose fines directly.',
      'State boards operate locally to inspect and grant permits.',
      'Courts possess judicial powers to punish polluters.',
    ],
  },
  {
    id: 'ch_fraud_insurance_life_eval',
    nodeId: NODE_C10_COMMSTUD_044,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A policyholder colludes with hospital staff to fabricate a fake death certificate and claim a ₹1 Crore payout from LIC of India on a living relative. How is this prosecuted?',
    options: [
      'Insurance Fraud under the Insurance Act, 1938 read with IPC Section 420 (Cheating and Forgery)',
      'A minor accounting adjustment where LIC merely writes off the amount as bad debt',
      'Consumer Dispute where the insurer must pay double damages under COPRA 2019',
      'Environmental non-compliance under CPCB effluent disposal rules',
    ],
    correctIndex: 0,
    explanation: 'Staging deaths or submitting forged certificates to claim insurance benefits is criminal Insurance Fraud prosecuted under the Insurance Act 1938 and IPC 420.',
    hints: [
      'This is intentional deceit aimed at an insurance corporation.',
      'Look for the Insurance Act 1938 and IPC 420.',
      'Option A correctly defines the criminal fraud classification.',
    ],
  },
  {
    id: 'ch_cepi_pollution_score',
    nodeId: NODE_C10_COMMSTUD_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under CPCB’s Comprehensive Environmental Pollution Index (CEPI), an industrial cluster scoring ABOVE what numerical threshold (0-100 scale) is categorized as "Critically Polluted"?',
    correctAnswer: 70,
    tolerance: 0,
    unit: 'CEPI Index Points',
    explanation: 'CEPI scores industrial clusters on a 0 to 100 scale. Clusters scoring above 70 are declared "Critically Polluted Industrial Areas" with strict moratoriums on new polluting facilities.',
    hints: [
      'The threshold represents high environmental stress on air, water, and soil.',
      'It is a round number in the seventies.',
      'Enter 70.',
    ],
  },
  {
    id: 'ch_neft_batch_mechanism',
    nodeId: NODE_C10_COMMSTUD_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing a treasury cash-flow schedule for a manufacturing company paying 500 small vendors ₹12,00,000 in total (avg ₹12,00,000 each). Why is NEFT technically and economically ideal compared to RTGS or individual cash withdrawals?',
    options: [
      'NEFT has no minimum limit, settles in automated half-hourly batches 24x7, and eliminates high cash handling risks and RTGS ₹2 Lakh thresholds',
      'NEFT gives vendors free credit cards with 50-day interest-free periods automatically',
      'RTGS is prohibited by RBI for manufacturing companies in Maharashtra',
      'NEFT bypasses all bank accounts and transmits physical currency via courier',
    ],
    correctIndex: 0,
    explanation: 'NEFT handles automated bulk retail payments seamlessly in half-hourly batches without minimum amount barriers, offering total 24x7 security.',
    hints: [
      '₹12,000 is below the ₹2,00,000 RTGS minimum.',
      'NEFT groups transactions in efficient half-hourly settlement batches.',
      'Option A details why NEFT fits multi-vendor corporate payroll and accounts payable.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_COMMSTUD_041,
  title: 'Banking Channels, Card Security, Financial Frauds & Environmental Regulations',
  definition: 'Comprehensive mastery of electronic banking channels (NEFT, RTGS, IMPS, Wallets), card mechanics (ATM, Debit, Credit), safety & zero-liability compliance, financial fraud statutes, Environment (Protection) Act 1986, and CPCB functions.',
  eli5: 'Learn how money moves safely on high-speed digital tracks, how to lock out fraudsters, and how Indian environmental laws hold big factories accountable for clean air and water.',
  misconceptions: [
    {
      misconception: 'RTGS can be used for small urgent payments like ₹500.',
      correction: 'RTGS has a statutory minimum of ₹2,00,000 per transaction. Small payments must use IMPS or NEFT.',
    },
    {
      misconception: 'Credit cards spend money straight from your savings bank account.',
      correction: 'Credit cards utilize the bank’s pre-approved credit line (a short-term loan). Debit cards spend your own deposit money.',
    },
    {
      misconception: 'The Environment (Protection) Act 1986 replaced and abolished the Water Act 1974.',
      correction: 'The EPA 1986 is an umbrella law that supplements, coordinates, and sits above the Water and Air Acts without repealing them.',
    },
    {
      misconception: 'The Central Pollution Control Board (CPCB) directly fines factories and prosecutes them in court.',
      correction: 'CPCB sets technical standards and issues closure directions. Prosecution is conducted through courts of law, and local permits are issued by State Boards.',
    },
    {
      misconception: 'An accidental clerical typo in a ledger is legally classified as fraud.',
      correction: 'Fraud strictly requires deliberate intent to deceive for unlawful gain. Unintentional mistakes are accounting errors.',
    },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across electronic payment limits, card security rules, statutory fraud definitions, EPA 1986 provisions, and CPCB regulatory functions.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Electronic Payment Rails Simulator (NEFT vs RTGS vs IMPS)',
    instruction: 'Adjust the transaction amount slider and switch settlement modes to observe speed, batching, and statutory eligibility.',
    interactionType: 'payment-rail-sim',
    nodeId: NODE_C10_COMMSTUD_041,
  },
  {
    title: 'Plastic Card Mechanics: Debit vs Credit Card Debt Engine',
    instruction: 'Swipe both cards for a ₹10,000 purchase. Toggle unpaid rollover months to see compound interest (40% APR) vs zero-interest debit.',
    interactionType: 'card-engine-sim',
    nodeId: NODE_C10_COMMSTUD_042,
  },
  {
    title: 'ATM Security & RBI Zero-Liability Incident Response',
    instruction: 'Inspect the ATM for skimmer attachments, then simulate reporting delay days (1 to 10 days) to see customer liability tiers.',
    interactionType: 'security-liability-lab',
    nodeId: NODE_C10_COMMSTUD_043,
  },
  {
    title: 'Corporate Financial Fraud Matrix (Satyam, IP, & Phishing)',
    instruction: 'Examine 4 corporate deception cases, match the intent element, and link to Companies Act 2013 / IT Act 2000 / Trade Marks Act 1999.',
    interactionType: 'fraud-matrix-sim',
    nodeId: NODE_C10_COMMSTUD_044,
  },
  {
    title: 'Environmental Umbrella & CPCB Air/Water Compliance Lab',
    instruction: 'Adjust industrial factory effluent discharge levels and observe CPCB CEPI pollution index score and statutory penalties.',
    interactionType: 'env-cpcb-compliance-lab',
    nodeId: NODE_C10_COMMSTUD_045,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Compliance Officer Action Plan',
  description: 'Apply your CISCE Commercial Studies knowledge to audit a mid-sized export house in Pune for digital banking hygiene, card safety policies, and zero-discharge environmental compliance.',
  steps: [
    'Create an electronic payment policy: assign NEFT for small vendor batches (<₹2L), RTGS for bulk textile raw material (>₹2L), and IMPS for emergency overnight contractor disbursements.',
    'Formulate an internal SOP for corporate cards: enforce zero PIN writing, daily mobile alert verification, and immediate 24x7 hotlisting within 24 hours of loss.',
    'Draft an Environmental Audit Checklist ensuring wastewater treatment complies with CPCB Zero Liquid Discharge (ZLD) norms before TNPCB / MPCB inspections.',
  ],
};

export default function C10_CommercialStudiesInternetBankingNeftSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_COMMSTUD_041,
  title = DEFAULT_PROPS.title || 'Commercial Studies Sim',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Exploration Interactive Sim State
  const [transferAmount, setTransferAmount] = useState<number>(250000);
  const [selectedRail, setSelectedRail] = useState<'NEFT' | 'RTGS' | 'IMPS' | 'WALLET'>('RTGS');
  const [unpaidMonths, setUnpaidMonths] = useState<number>(0);
  const [creditCardBalance] = useState<number>(20000);
  const [cardSwipedType, setCardSwipedType] = useState<'debit' | 'credit'>('debit');
  const [atmSkimmerFound, setAtmSkimmerFound] = useState<boolean>(false);
  const [reportingDelayDays, setReportingDelayDays] = useState<number>(1);
  const [factoryEffluentPPM, setFactoryEffluentPPM] = useState<number>(45);
  const [factoryStackEmission, setFactoryStackEmission] = useState<number>(55);
  const [inspectedFraudCase, setInspectedFraudCase] = useState<string>('satyam');

  // Challenge states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-completion reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Calculations
  const totalCreditDebt = useMemo(() => {
    if (unpaidMonths === 0) return creditCardBalance;
    return Math.round(creditCardBalance * Math.pow(1 + 0.034, unpaidMonths));
  }, [creditCardBalance, unpaidMonths]);

  const customerLiabilityTier = useMemo(() => {
    if (reportingDelayDays <= 3) return { liability: 0, status: 'Zero Liability (100% Bank Protection)', color: 'text-emerald-400' };
    if (reportingDelayDays <= 7) return { liability: 10000, status: 'Capped Liability (Up to ₹10,000 / ₹25,000)', color: 'text-amber-400' };
    return { liability: 65000, status: 'Bank Board Policy (Full Exposure Risk)', color: 'text-rose-400' };
  }, [reportingDelayDays]);

  const cepiScore = useMemo(() => {
    const raw = (factoryEffluentPPM * 0.5) + (factoryStackEmission * 0.5);
    return Math.min(100, Math.round(raw));
  }, [factoryEffluentPPM, factoryStackEmission]);

  const cepiClassification = useMemo(() => {
    if (cepiScore >= 70) return { category: 'Critically Polluted Area (CEPI > 70)', action: 'Immediate Closure Notice (Sec 18 Water/Air Act & Sec 15 EPA)', alertColor: 'bg-rose-950 border-rose-600 text-rose-300' };
    if (cepiScore >= 50) return { category: 'Severely Polluted Area (50-70)', action: 'Mandatory Pollution Control Audit & Upgraded ETP/ZLD', alertColor: 'bg-amber-950 border-amber-600 text-amber-300' };
    return { category: 'Normal Compliance Zone (< 50)', action: 'Consent to Operate Valid (Routine Monitoring)', alertColor: 'bg-emerald-950 border-emerald-600 text-emerald-300' };
  }, [cepiScore]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a helpful clue to guide your thinking.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
      setShowExplanation(true);
      speechManager.speak('Let us inspect the complete step-by-step statutory explanation.');
    }
    resetInactivityTimer();
  }, [hintCount, challenge, resetInactivityTimer]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Let us master the mechanics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive compliance labs. Tap and test the controls.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test all financial and environmental parameters freely in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setAnswerRevealed(false);
    setShowExplanation(false);
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase initialized. Apply your knowledge accurately.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === (challenge.sortItems?.length || 0)
        ? [...prev]
        : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the CISCE Commercial Studies simulation.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Statutory analysis verified.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      setErrors(e => e + 1);
      audioManager.play('drop-wrong');
      audioManager.play('error');
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
        speechManager.speak('All hints used. Review the statutory analysis below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = 15 + Math.sin((x + tick * 3) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseR = 4 + Math.sin(tick * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700 block cursor-default"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700">ICSE Class 10</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">Commercial Studies</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-rose-950/80 border-rose-500 text-rose-300' :
              'bg-blue-950/80 border-blue-500 text-blue-300'
            }`}
          >
            Level: {difficulty}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 rounded-full border border-slate-700 text-xs text-slate-300"
          >
            Mastery: <span className="font-bold text-indigo-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💼</span>
                <h2 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h2>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-indigo-900 text-xs text-indigo-200">
                ⚡ <strong>Your Decision Challenge:</strong> {SCENARIO.context}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-md"
            >
              <h3 className="text-base font-bold text-amber-300 mb-2">🤔 Discovery Curiosity Hook (Low Stakes — Test Your Intuition)</h3>
              <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left text-xs md:text-sm rounded-xl border transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-xs md:text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Spot on! RTGS handles ≥₹2 Lakh gross real-time transfers, while IMPS settles up to ₹5 Lakh 24x7 instantly.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg border border-indigo-400 flex items-center gap-2 shrink-0"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Lab Tab Navigation */}
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex gap-1 overflow-x-auto py-1">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setCurrentSlide(idx); audioManager.play('tap'); }}
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all whitespace-nowrap ${
                      currentSlide === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lab {idx + 1}
                  </motion.button>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-bold px-2">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="p-5 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-indigo-400">🔬 Lab {currentSlide + 1}:</span> {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <p className="text-xs md:text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>

                {/* LAB 1: Electronic Payment Rails Simulator (SVG #1) */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                            <span>Transfer Amount: ₹{transferAmount.toLocaleString('en-IN')}</span>
                            <span className={transferAmount >= 200000 ? 'text-emerald-400 font-black' : 'text-slate-400'}>
                              {transferAmount >= 200000 ? 'Eligible for RTGS (≥ ₹2 Lakh)' : 'Below RTGS ₹2L Limit'}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={500}
                            max={1000000}
                            step={5000}
                            value={transferAmount}
                            aria-label="Set Transfer Amount"
                            onChange={(e) => { setTransferAmount(Number(e.target.value)); audioManager.play('count'); }}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'NEFT', label: 'NEFT', desc: 'Half-Hourly Batches (No Min)' },
                            { id: 'RTGS', label: 'RTGS', desc: 'Gross Real-Time (Min ₹2L)' },
                            { id: 'IMPS', label: 'IMPS', desc: 'Instant 24x7 (Max ₹5L)' },
                            { id: 'WALLET', label: 'Mobile Wallet', desc: 'Prepaid Semi-Closed' },
                          ].map(rail => (
                            <motion.button
                              key={rail.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { setSelectedRail(rail.id as any); audioManager.play('tap'); }}
                              className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                                selectedRail === rail.id
                                  ? 'bg-indigo-950 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/30'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                              }`}
                            >
                              <div className="font-bold text-white">{rail.label}</div>
                              <div className="text-[10px] text-slate-400">{rail.desc}</div>
                            </motion.button>
                          ))}
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs space-y-1">
                          <div className="font-bold text-indigo-300">Statutory Regulatory Check:</div>
                          {selectedRail === 'RTGS' && transferAmount < 200000 && (
                            <p className="text-rose-400 font-semibold">❌ REJECTED: RTGS requires a statutory minimum of ₹2,00,000. Switch to IMPS or NEFT.</p>
                          )}
                          {selectedRail === 'RTGS' && transferAmount >= 200000 && (
                            <p className="text-emerald-400 font-semibold">✓ APPROVED: ₹{transferAmount.toLocaleString('en-IN')} will settle individually in real-time gross settlement.</p>
                          )}
                          {selectedRail === 'NEFT' && (
                            <p className="text-indigo-200">✓ APPROVED: Settle in next half-hourly batch (24x7x365 operated by RBI).</p>
                          )}
                          {selectedRail === 'IMPS' && transferAmount <= 500000 && (
                            <p className="text-emerald-400">✓ APPROVED: Instant settlement 24x7 via NPCI infrastructure.</p>
                          )}
                          {selectedRail === 'IMPS' && transferAmount > 500000 && (
                            <p className="text-amber-400">⚠️ NOTICE: ₹{transferAmount.toLocaleString('en-IN')} exceeds standard ₹5,00,000 per-transaction retail IMPS limit. Use RTGS.</p>
                          )}
                          {selectedRail === 'WALLET' && (
                            <p className="text-blue-300">ℹ️ WALLET: Prepaid payment instrument. Cannot earn interest; cannot withdraw cash at ATM if semi-closed (e.g., Paytm).</p>
                          )}
                        </div>
                      </div>

                      {/* SVG DIAGRAM 1: Electronic Payment Network Architecture */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center">
                        <svg viewBox="0 0 320 180" className="w-full h-auto" aria-label="Electronic Payment Rail Diagram">
                          <rect x="15" y="25" width="75" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                          <text x="52" y="47" fill="#e0e7ff" fontSize="9" fontWeight="bold" textAnchor="middle">Apex Mumbai</text>
                          <text x="52" y="58" fill="#94a3b8" fontSize="7" textAnchor="middle">Remitting Payer</text>

                          <circle cx="160" cy="90" r="32" fill="#0f172a" stroke={selectedRail === 'RTGS' && transferAmount < 200000 ? '#f43f5e' : '#10b981'} strokeWidth="3" />
                          <text x="160" y="87" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{selectedRail}</text>
                          <text x="160" y="99" fill="#a7f3d0" fontSize="7" textAnchor="middle">{selectedRail === 'RTGS' ? 'RBI Core RTGS' : selectedRail === 'NEFT' ? 'RBI Batch Pool' : 'NPCI IMPS Switch'}</text>

                          <rect x="230" y="110" width="75" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                          <text x="267" y="132" fill="#e0e7ff" fontSize="9" fontWeight="bold" textAnchor="middle">Delhi Vendor</text>
                          <text x="267" y="143" fill="#94a3b8" fontSize="7" textAnchor="middle">Beneficiary Account</text>

                          <motion.path
                            d="M 90 47 Q 160 47 160 58"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            animate={{ strokeDashoffset: [0, -20] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          />
                          <motion.path
                            d="M 160 122 Q 160 132 230 132"
                            fill="none"
                            stroke={selectedRail === 'RTGS' && transferAmount < 200000 ? '#f43f5e' : '#10b981'}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            animate={{ strokeDashoffset: [0, -20] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          />
                        </svg>

                        <div className="w-full mt-2 text-[10px] text-slate-300">
                          <div className="grid grid-cols-4 font-bold border-b border-slate-700 pb-1 text-slate-400">
                            <span>Mode</span><span>Settlement</span><span>Min Limit</span><span>Max Limit</span>
                          </div>
                          <div className="grid grid-cols-4 py-0.5 border-b border-slate-800">
                            <span className="font-bold text-indigo-300">NEFT</span><span>Batches (30m)</span><span>None (₹1)</span><span>No Ceiling</span>
                          </div>
                          <div className="grid grid-cols-4 py-0.5 border-b border-slate-800">
                            <span className="font-bold text-emerald-300">RTGS</span><span>Real-Time</span><span className="text-emerald-400 font-bold">₹2,00,000</span><span>No Ceiling</span>
                          </div>
                          <div className="grid grid-cols-4 py-0.5">
                            <span className="font-bold text-amber-300">IMPS</span><span>Instant</span><span>None (₹1)</span><span>₹5,00,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LAB 2: Debit vs Credit Card Debt Engine (SVG #2) */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setCardSwipedType('debit'); audioManager.play('tap'); }}
                            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                              cardSwipedType === 'debit' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            💳 Debit Card (SBI Global)
                            <div className="text-[10px] font-normal text-slate-400">Spends Own Savings Balance</div>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setCardSwipedType('credit'); audioManager.play('tap'); }}
                            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                              cardSwipedType === 'credit' ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            💳 Credit Card (HDFC MoneyBack)
                            <div className="text-[10px] font-normal text-slate-400">Bank Loan up to ₹50,000 Limit</div>
                          </motion.button>
                        </div>

                        {cardSwipedType === 'credit' && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3 p-3 bg-slate-900 rounded-xl border border-slate-800"
                          >
                            <div className="flex justify-between text-xs font-bold text-slate-300">
                              <span>Unpaid Rolling Debt: {unpaidMonths} Months</span>
                              <span className="text-rose-400">Interest: 3.4%/mo (~40% APR)</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={12}
                              value={unpaidMonths}
                              aria-label="Set Unpaid Months"
                              onChange={(e) => { setUnpaidMonths(Number(e.target.value)); audioManager.play('count'); }}
                              className="w-full accent-rose-500 cursor-pointer"
                            />
                            <p className="text-[11px] text-slate-400">
                              {unpaidMonths === 0
                                ? 'Paid within 50-day interest-free period: ₹0 interest charged!'
                                : `Carrying balance unpaid: ₹${creditCardBalance.toLocaleString()} grows to ₹${totalCreditDebt.toLocaleString()} due to compounding!`}
                            </p>
                          </motion.div>
                        )}

                        {cardSwipedType === 'debit' && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-emerald-300 space-y-1"
                          >
                            <p className="font-bold">✓ Zero Interest — Own Capital</p>
                            <p className="text-[11px] text-slate-400">Instant deduction of ₹{creditCardBalance.toLocaleString()} from your linked savings account. No monthly bill, no loan created.</p>
                          </motion.div>
                        )}
                      </div>

                      {/* SVG DIAGRAM 2: Card Architecture & Fund Flow */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between items-center">
                        <svg viewBox="0 0 320 160" className="w-full h-auto" aria-label="Card Fund Flow Diagram">
                          <rect x="20" y="20" width="130" height="75" rx="8" fill={cardSwipedType === 'debit' ? '#064e3b' : '#4c0519'} stroke={cardSwipedType === 'debit' ? '#10b981' : '#f43f5e'} strokeWidth="2" />
                          <rect x="30" y="32" width="24" height="18" rx="3" fill="#fbbf24" />
                          <text x="32" y="70" fill="#f8fafc" fontSize="10" fontFamily="monospace">•••• •••• •••• 4892</text>
                          <text x="32" y="84" fill="#cbd5e1" fontSize="7" fontWeight="bold">{cardSwipedType === 'debit' ? 'DEBIT (SAVINGS)' : 'CREDIT LINE (LOAN)'}</text>

                          <rect x="180" y="20" width="120" height="75" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                          <text x="240" y="38" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">FUND SOURCE</text>
                          <text x="240" y="55" fill={cardSwipedType === 'debit' ? '#34d399' : '#fb7185'} fontSize="9" fontWeight="bold" textAnchor="middle">
                            {cardSwipedType === 'debit' ? 'Depositor A/C' : 'Bank Credit Facility'}
                          </text>
                          <text x="240" y="72" fill="#94a3b8" fontSize="7" textAnchor="middle">
                            {cardSwipedType === 'debit' ? 'Balance: ₹50,000' : 'Limit: ₹50,000'}
                          </text>
                          <text x="240" y="85" fill={cardSwipedType === 'debit' ? '#34d399' : '#fb7185'} fontSize="7" textAnchor="middle">
                            {cardSwipedType === 'debit' ? 'APR: 0%' : 'APR: 40.8%'}
                          </text>

                          <path d="M 150 57 L 180 57" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="3 3" />
                          <rect x="20" y="110" width="280" height="35" rx="6" fill="#020617" stroke="#334155" />
                          <text x="160" y="125" fill="#e2e8f0" fontSize="8" textAnchor="middle">
                            Total Due: <tspan fill={cardSwipedType === 'debit' ? '#34d399' : '#fb7185'} fontWeight="bold">₹{cardSwipedType === 'debit' ? creditCardBalance.toLocaleString() : totalCreditDebt.toLocaleString()}</tspan> | Interest: <tspan fill="#f59e0b" fontWeight="bold">{cardSwipedType === 'debit' ? '₹0' : `+₹${(totalCreditDebt - creditCardBalance).toLocaleString()}`}</tspan>
                          </text>
                          <text x="160" y="137" fill="#64748b" fontSize="7" textAnchor="middle">ICSE Key Fact: Credit is a short-term bank loan, NOT free money</text>
                        </svg>

                        <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 w-full">
                          💡 <strong>Key Examination Takeaway:</strong> A credit card is NEVER free money. Failing to pay by statement due date triggers 40% annual interest, while debit cards strictly draw own funds.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LAB 3: ATM Security & RBI Zero-Liability (SVG #3) */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                          <div className="text-xs font-bold text-indigo-300">Step 1: Inspect ATM Card Slot for Skimmers</div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setAtmSkimmerFound(prev => !prev);
                              audioManager.play(atmSkimmerFound ? 'pop' : 'error');
                            }}
                            className={`w-full p-2.5 rounded-xl border text-xs font-bold transition-all ${
                              atmSkimmerFound ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {atmSkimmerFound ? '⚠️ Skimming Device Detected Attached to Card Slot!' : '🔍 Tap to Inspect ATM Card Slot'}
                          </motion.button>
                          <p className="text-[11px] text-slate-400">
                            {atmSkimmerFound
                              ? 'Warning: Magnetic stripe skimmer reads your card data while hidden cameras record the PIN! Never insert card if slot is loose or misaligned.'
                              : 'Always check the card reader and shield the PIN keypad with your other hand.'}
                          </p>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex justify-between text-xs font-bold text-slate-300">
                            <span>Step 2: Fraud Reporting Delay: {reportingDelayDays} Day(s)</span>
                            <span className={customerLiabilityTier.color}>{customerLiabilityTier.status}</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={10}
                            value={reportingDelayDays}
                            aria-label="Set Reporting Delay in Days"
                            onChange={(e) => { setReportingDelayDays(Number(e.target.value)); audioManager.play('count'); }}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                          <div className="text-[11px] text-slate-300">
                            Statutory Ceiling (RBI Circular 20 July 2017): Customer liability = <strong>₹{customerLiabilityTier.liability.toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>

                      {/* SVG DIAGRAM 3: ATM Security & RBI Tiered Liability Timeline */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <svg viewBox="0 0 320 120" className="w-full h-auto" aria-label="RBI Liability Timeline Diagram">
                          <line x1="20" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                          
                          {/* Zone 1: 0-3 days */}
                          <rect x="20" y="44" width="90" height="12" rx="6" fill="#10b981" opacity={reportingDelayDays <= 3 ? 1 : 0.4} />
                          <circle cx="20" cy="50" r="7" fill="#10b981" />
                          <text x="65" y="35" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">≤ 3 Days: ZERO</text>
                          <text x="65" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">100% Bank Liable</text>

                          {/* Zone 2: 4-7 days */}
                          <rect x="110" y="44" width="95" height="12" rx="6" fill="#f59e0b" opacity={reportingDelayDays > 3 && reportingDelayDays <= 7 ? 1 : 0.4} />
                          <circle cx="110" cy="50" r="7" fill="#f59e0b" />
                          <text x="157" y="35" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">4–7 Days: CAPPED</text>
                          <text x="157" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">Max ₹10k/₹25k</text>

                          {/* Zone 3: > 7 days */}
                          <rect x="205" y="44" width="95" height="12" rx="6" fill="#f43f5e" opacity={reportingDelayDays > 7 ? 1 : 0.4} />
                          <circle cx="205" cy="50" r="7" fill="#f43f5e" />
                          <text x="252" y="35" fill="#fb7185" fontSize="8" fontWeight="bold" textAnchor="middle">&gt; 7 Days: BOARD</text>
                          <text x="252" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">Bank Policy</text>

                          {/* Current marker */}
                          <circle cx={20 + Math.min(9, reportingDelayDays - 1) * 31.1} cy="50" r="9" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                        </svg>

                        <div className="space-y-2 text-xs">
                          <div className={`p-2 rounded-lg border ${reportingDelayDays <= 3 ? 'bg-emerald-950/80 border-emerald-500 font-bold text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                            Within 3 Working Days → ₹0 Liability (Zero Customer Loss)
                          </div>
                          <div className={`p-2 rounded-lg border ${reportingDelayDays > 3 && reportingDelayDays <= 7 ? 'bg-amber-950/80 border-amber-500 font-bold text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                            4 to 7 Working Days → Capped at ₹10,000 / ₹25,000
                          </div>
                          <div className={`p-2 rounded-lg border ${reportingDelayDays > 7 ? 'bg-rose-950/80 border-rose-500 font-bold text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                            Beyond 7 Working Days → Governed by Bank Board Policy
                          </div>
                        </div>

                        <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800 text-[11px] text-indigo-200">
                          📞 <strong>Immediate Action:</strong> Call SBI helpline (1800-112211) or National Cyber Crime 1930 to <em>Hotlist</em> card instantly!
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LAB 4: Corporate Financial Fraud Matrix */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { id: 'satyam', title: 'False Accounting', entity: 'Satyam 2009', law: 'Companies Act 2013 Sec 447' },
                        { id: 'skimming', title: 'Card Skimming', entity: 'ATM Breach 2016', law: 'IPC 420 + IT Act Sec 66' },
                        { id: 'trademark', title: 'IP / Trademark', entity: 'Counterfeit Puma 2023', law: 'Trade Marks Act 1999' },
                        { id: 'olx', title: 'Cyber Phishing', entity: 'OLX Bike 2022', law: 'IT Act 2000 Sec 66' },
                      ].map(fCase => (
                        <motion.button
                          key={fCase.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setInspectedFraudCase(fCase.id); audioManager.play('tap'); }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            inspectedFraudCase === fCase.id
                              ? 'bg-indigo-950 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          <div className="font-bold text-indigo-300">{fCase.title}</div>
                          <div className="text-[10px] text-slate-300 font-semibold mt-0.5">{fCase.entity}</div>
                          <div className="text-[9px] text-slate-500 mt-1">{fCase.law}</div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2">
                      {inspectedFraudCase === 'satyam' && (
                        <div>
                          <span className="font-bold text-amber-300">Case Audit — Satyam Computer Services (₹5,040 Cr):</span> Ramalinga Raju fabricated fictitious sales invoices and forged bank deposit certificates. <strong>Governing Statute:</strong> Section 447 of the Companies Act, 2013 (imprisonment 6m–10y + penalty up to 3x fraud amount).
                        </div>
                      )}
                      {inspectedFraudCase === 'skimming' && (
                        <div>
                          <span className="font-bold text-amber-300">Case Audit — 2016 ATM Debit Data Breach:</span> 3.2 million cards compromised by magnetic skimmers in ATMs. <strong>Governing Statute:</strong> IPC Section 420 read with IT Act 2000 Section 66.
                        </div>
                      )}
                      {inspectedFraudCase === 'trademark' && (
                        <div>
                          <span className="font-bold text-amber-300">Case Audit — Counterfeit Trademark Goods (Delhi 2023):</span> Manufacturing fake branded shoes bearing registered trademarks without permission. <strong>Governing Statute:</strong> Trade Marks Act, 1999.
                        </div>
                      )}
                      {inspectedFraudCase === 'olx' && (
                        <div>
                          <span className="font-bold text-amber-300">Case Audit �� OLX Army Bike UPI Scam (2022):</span> Social-engineering phishing tricking buyers to send advance token payments. <strong>Governing Statute:</strong> IT Act Section 66 + IPC 420.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* LAB 5: EPA 1986 & CPCB Compliance Lab */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                            <span>Factory Wastewater Chromium: {factoryEffluentPPM} PPM</span>
                            <span className={factoryEffluentPPM > 50 ? 'text-rose-400' : 'text-emerald-400'}>
                              {factoryEffluentPPM > 50 ? 'Violates CPCB Norms' : 'Within Standard'}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={factoryEffluentPPM}
                            aria-label="Set Factory Wastewater Chromium"
                            onChange={(e) => { setFactoryEffluentPPM(Number(e.target.value)); audioManager.play('count'); }}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                            <span>Chimney Particulate PM2.5/PM10: {factoryStackEmission} μg/m³</span>
                            <span className={factoryStackEmission > 60 ? 'text-rose-400' : 'text-emerald-400'}>
                              {factoryStackEmission > 60 ? 'Exceeds Stack Limits' : 'Clean Emissions'}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={factoryStackEmission}
                            aria-label="Set Chimney Particulate"
                            onChange={(e) => { setFactoryStackEmission(Number(e.target.value)); audioManager.play('count'); }}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>

                        <div className={`p-3 rounded-xl border text-xs ${cepiClassification.alertColor}`}>
                          <div className="font-bold">CPCB CEPI Rating: {cepiScore} / 100</div>
                          <div className="font-semibold mt-0.5">{cepiClassification.category}</div>
                          <div className="text-[11px] mt-1 opacity-90">Regulatory Order: {cepiClassification.action}</div>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="font-bold text-indigo-300 border-b border-slate-800 pb-1.5">
                          Statutory Environmental Architecture in India
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="font-bold text-white">1. MoEFCC (Ministry):</span> Policy-making Union Department; frames rules under EPA 1986.
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="font-bold text-indigo-400">2. CPCB (Central Board, Sep 1974):</span> Technical standard-setter, runs NAMP, assesses CEPI.
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="font-bold text-emerald-400">3. SPCBs (State Boards, e.g. MPCB):</span> Grants Consent to Establish & Operate; inspects factories.
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="font-bold text-rose-400">4. Section 15 Penalties:</span> Imprisonment up to 5 years (7 years continuing) + ₹1 Lakh fine.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-200 text-xs md:text-sm font-bold rounded-xl"
                  >
                    ← Previous Lab
                  </motion.button>

                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg"
                    >
                      Next Lab →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg"
                    >
                      Enter Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">🎮 Free Play Compliance Sandbox (Ungraded)</h3>
                  <p className="text-xs md:text-sm text-slate-300">Simulate any combination of payment amounts, debt rollover periods, and pollution discharges.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-black text-sm rounded-2xl shadow-xl border border-emerald-400 flex items-center gap-2"
                >
                  I Am Ready For Graded Challenges! 🎯 →
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="text-xs font-bold text-indigo-300">1. Instant Transfer Validator</div>
                  <div className="text-xs text-slate-300 font-bold">Amount: ₹{transferAmount.toLocaleString('en-IN')}</div>
                  <input
                    type="range"
                    min={1000}
                    max={1000000}
                    step={10000}
                    value={transferAmount}
                    aria-label="Set Sandbox Transfer Amount"
                    onChange={(e) => { setTransferAmount(Number(e.target.value)); audioManager.play('count'); }}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="p-2 bg-slate-900 rounded-lg text-[11px] text-slate-300">
                    {transferAmount >= 200000 ? '✅ RTGS Eligible (Real-Time)' : '⚠️ Below RTGS minimum. Use NEFT / IMPS'}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="text-xs font-bold text-rose-300">2. Credit Card Interest Compounding</div>
                  <div className="text-xs text-slate-300 font-bold">Rollover: {unpaidMonths} Months</div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={unpaidMonths}
                    aria-label="Set Sandbox Unpaid Months"
                    onChange={(e) => { setUnpaidMonths(Number(e.target.value)); audioManager.play('count'); }}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="p-2 bg-slate-900 rounded-lg text-[11px] text-rose-300 font-bold">
                    Total Due: ₹{totalCreditDebt.toLocaleString()} (40% APR)
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="text-xs font-bold text-emerald-300">3. CPCB CEPI Compliance Index</div>
                  <div className="text-xs text-slate-300 font-bold">Effluent: {factoryEffluentPPM} PPM</div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={factoryEffluentPPM}
                    aria-label="Set Sandbox Factory Effluent"
                    onChange={(e) => { setFactoryEffluentPPM(Number(e.target.value)); audioManager.play('count'); }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="p-2 bg-slate-900 rounded-lg text-[11px] text-slate-300">
                    CEPI Score: <strong className={cepiScore >= 70 ? 'text-rose-400' : 'text-emerald-400'}>{cepiScore} / 100</strong>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <canvas ref={canvasRef} width={600} height={30} className="w-full h-7 rounded-xl bg-slate-900 border border-slate-800" />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Competency: {challenge.competencyLevel} | Question {currentChallenge + 1} of {filteredChallenges.length}
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mt-0.5">{challenge.question}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-indigo-300">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </div>
            </div>

            {/* Motion Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-5 bg-slate-900 rounded-3xl border transition-all ${
                wrongFlash ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/50' : 'border-slate-800'
              }`}
            >
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs md:text-sm font-medium border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : wrongFlash
                          ? 'bg-rose-950/40 border-rose-600 text-rose-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 mr-2 self-center">Drag Badges:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                      <motion.div
                        key={targetId}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-2xl border-2 border-dashed flex flex-col justify-center items-center text-center transition-all min-h-[90px] ${
                          droppedLabels[targetId] ? 'bg-indigo-950/70 border-indigo-500' : 'bg-slate-950/60 border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] text-slate-400 font-semibold mb-1">Target: {targetId.replace('target_', '').toUpperCase()}</div>
                        <div className="text-xs font-bold text-emerald-300">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching label here'}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                  >
                    Verify Mappings →
                  </motion.button>
                </div>
              )}

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
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span><strong>{displayIdx + 1}.</strong> {item}</span>
                        <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                  >
                    Check Sequence Order →
                  </motion.button>
                </div>
              )}

              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label="Enter Numeric Value"
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-48 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput === ''}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 mr-2 self-center">Available Blocks:</span>
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-600 rounded-xl text-xs font-bold text-indigo-200"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 min-h-[80px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                      >
                        <span>{idx + 1}. {part}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-300 font-bold hover:text-white"
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Tap available blocks above to construct the correct sequence</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                  >
                    Verify Construction →
                  </motion.button>
                </div>
              )}

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-amber-950/40 border border-amber-700/80 rounded-2xl space-y-3"
                >
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Statutory Explanation & Analysis:</div>
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs rounded-xl"
                    >
                      Reveal Next Analysis Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Compliance Evaluation 🏆 →' : 'Next Statutory Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD SYNTHESIS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-3"
            >
              <span className="text-4xl">🎓</span>
              <h2 className="text-2xl font-black text-white">Commercial Studies Simulation Complete!</h2>
              <div className="flex justify-center gap-6 text-sm font-bold pt-2">
                <span className="text-emerald-400">Final Score: {Math.max(0, 100 - errors * 5)}%</span>
                <span className="text-indigo-300">Accuracy: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
                <span className="text-amber-300 capitalize">Mastery Level: {masteryLevel}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Performance Evaluation:</h3>
              <p className="text-xs md:text-sm text-slate-200">
                {errors === 0
                  ? '🌟 Flawless Mastery! You demonstrated exceptional comprehension across NEFT/RTGS settlement rails, card security rules, corporate fraud statutes, and CPCB environmental standards.'
                  : errors <= 3
                  ? '👍 Strong Performance! You have a solid grasp of ICSE Commercial Studies concepts. Review the slight statutory nuances below to achieve perfection.'
                  : '💪 Good Effort! You are building foundational knowledge. Review the misconceptions profile and spaced repetition schedule below to cement your retention.'}
              </p>
            </motion.div>

            {/* Reflection Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-900/80 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">💭</span>
                <h3 className="text-sm md:text-base font-bold text-indigo-300">Post-Simulation Reflective Thinking</h3>
              </div>
              <p className="text-xs text-slate-400">Consolidate your learning by briefly reflecting on these three core questions:</p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">1. What was the most surprising thing you learned?</label>
                  <input
                    type="text"
                    value={reflectionAnswers.q1}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q1: e.target.value }))}
                    placeholder="e.g., Credit card interest compounds at ~40% APR, or RTGS has a ₹2 Lakh minimum..."
                    disabled={reflectionSubmitted}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">2. How would you explain this to a friend?</label>
                  <input
                    type="text"
                    value={reflectionAnswers.q2}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q2: e.target.value }))}
                    placeholder="e.g., Debit is your money, credit is a loan; always report card fraud in 3 days for zero liability..."
                    disabled={reflectionSubmitted}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">3. Where in real life might you use this?</label>
                  <input
                    type="text"
                    value={reflectionAnswers.q3}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q3: e.target.value }))}
                    placeholder="e.g., Auditing business transfers, inspecting ATM card slots, checking environmental norms..."
                    disabled={reflectionSubmitted}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Save Reflections ✓
                </motion.button>
              ) : (
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-bold">
                  ✓ Reflection saved! Excellent critical thinking.
                </div>
              )}
            </motion.div>

            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3"
              >
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Identified Misconception Profile & Corrections:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, idx) => {
                    const item = misconceptions[mIdx];
                    if (!item) return null;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs"
                      >
                        <div className="text-rose-300 font-bold">❌ Myth: {item.misconception}</div>
                        <div className="text-emerald-300 mt-1">✓ Statutory Fact: {item.correction}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800 flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-xs font-bold text-amber-300">Spaced Repetition (SM-2 Algorithm):</div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Recommended next memory retention review: <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-300">🚀 {REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="flex gap-2"
                  >
                    <span className="font-bold text-indigo-400">{idx + 1}.</span> {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── TOASTS / OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Statutory Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}