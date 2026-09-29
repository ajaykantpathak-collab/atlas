'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend } from 'recharts';

// ─── NODE ID STRING LITERALS ───
const NODE_C11_BS_021 = 'c11_bs_021';
const NODE_C11_BS_022 = 'c11_bs_022';
const NODE_C11_BS_023 = 'c11_bs_023';
const NODE_C11_BS_024 = 'c11_bs_024';
const NODE_C11_BS_025 = 'c11_bs_025';
const NODE_C11_BS_026 = 'c11_bs_026';
const NODE_C11_BS_027 = 'c11_bs_027';
const NODE_C11_BS_028 = 'c11_bs_028';
const NODE_C11_BS_029 = 'c11_bs_029';
const NODE_C11_BS_030 = 'c11_bs_030';

const ALL_NODE_IDS = [
  NODE_C11_BS_021,
  NODE_C11_BS_022,
  NODE_C11_BS_023,
  NODE_C11_BS_024,
  NODE_C11_BS_025,
  NODE_C11_BS_026,
  NODE_C11_BS_027,
  NODE_C11_BS_028,
  NODE_C11_BS_029,
  NODE_C11_BS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Surat Textiles to QuickMart: The Commerce & Banking Transformation',
  intro: 'Aarav runs "Surat Weaves", a fast-growing textile enterprise in Gujarat supplying retail fabrics across India. He must choose the right e-banking rails (RTGS/NEFT/IMPS/UPI) for payments, manage working capital float, structure wholesale distribution, decide whether to open dark stores or departmental outlets, and protect his business against insurable perils.',
  context: 'Manage ₹10,00,000 in monthly transactions, navigate credit card revolving traps vs debit cards, classify retailers from College Street bookstalls to Blinkit dark stores, and apply Frank Knight\'s 3-step insurability test to real business risks.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Surat Weaves must urgently send ₹5,00,000 to a yarn supplier on Sunday evening at 9 PM to release raw material. Tata Steel uses RTGS for ₹5 crore payments. Can Aarav use RTGS or UPI for his ₹5,00,000 Sunday payment?',
  options: [
    'UPI only — because RTGS is closed on weekends and IMPS cannot handle ₹5,00,000',
    'IMPS or RTGS — since RTGS is 24x7x365 (since Dec 2020) and IMPS limit is ₹5,00,000; standard UPI is capped at ₹1,00,000',
    'NEFT only — batch settlement is required on holidays',
    'Demand Draft only — digital rails do not operate on bank holidays',
  ],
  correctIndex: 1,
  hintAfter: 'Let us dive into the 6 Indian payment rails, wholesale-retail mechanics, card models, and risk frameworks!',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you try to transfer ₹1,50,000 using RTGS instead of NEFT or IMPS, what will happen in the payment engine?',
    options: [
      'The transaction will process instantly because RTGS handles any amount.',
      'The transaction will be rejected because RTGS has a mandatory statutory floor of ₹2,00,000.',
      'The bank will convert it into a Demand Draft automatically.',
      'The transaction will be split into two UPI transfers.',
    ],
    correctIndex: 1,
    explanation: 'RTGS has a statutory minimum floor of ₹2,00,000. Amounts below this threshold cannot be routed via RTGS and must use NEFT or IMPS.',
    verifyInstruction: 'Go to Lab 1, set the Transaction Amount slider to ₹1,50,000, and select the RTGS rail to observe the eligibility status.',
  },
  {
    id: 'pred_2',
    question: 'If Vikram makes a ₹50,000 purchase on his credit card and pays only the 5% minimum due each month for 6 months, how will his total debt evolve?',
    options: [
      'His total debt will decrease to nearly zero due to regular payments.',
      'His total debt will stay constant because the minimum due freezes interest.',
      'His debt will compound dramatically with revolving interest (approx 42% p.a.), accumulating substantial extra interest charges.',
      'The bank will convert the remaining 95% into zero-interest installment loans automatically.',
    ],
    correctIndex: 2,
    explanation: 'Paying only the 5% minimum due leaves the revolving unpaid balance exposed to 3.5% monthly compound interest (42% p.a.), creating a severe debt trap.',
    verifyInstruction: 'Go to Lab 2, set card spend to ₹50,000, toggle "Option B: Minimum Due", and adjust the revolve slider to 6 months to inspect the compound debt accumulation chart.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In Lab 3 (Contact Line Reduction diagram), what happens to the total number of contact transactions when a wholesale distributor is introduced between 3 producers and 4 retailers?',
    options: [
      'Contact lines increase from 7 to 12.',
      'Contact lines decrease from 12 lines (3 × 4 direct) to 7 lines (3 + 4 via wholesaler).',
      'The number of contact lines remains unchanged at 12.',
      'Producers no longer require any physical lines of distribution.',
    ],
    correctIndex: 1,
    explanation: 'Without a wholesaler, direct trade requires P × R = 12 contact lines. Introducing a wholesaler collapses the network complexity to P + R = 7 contact lines, saving 5 lines of operational friction.',
    observableOptions: [
      'Direct Contacts (3 Producers × 4 Retailers) = 12 Lines',
      'With Wholesaler (3 Producers + 4 Retailers) = 7 Lines',
      'Transactional Efficiency: 5 contact lines eliminated',
    ],
  },
  {
    id: 'obs_2',
    question: 'In Lab 5 (Frank Knight Risk Evaluator), what do you observe when comparing the "Short-Circuit Godown Fire" against "Reliance Retail 40% Price Discounts"?',
    options: [
      'Both cases pass all 3 filters and are legally insurable by IRDAI insurers.',
      'The godown fire passes all 3 filters (accidental, measurable, specific pure risk), while price competition fails because it is deliberate and speculative.',
      'Neither case is insurable under Indian insurance regulations.',
      'Price competition passes filter 1 because price drops are unpredictable accidents.',
    ],
    correctIndex: 1,
    explanation: 'Accidental fire is a pure risk with quantifiable loss specific to the insured. Commercial price competition is a speculative business strategy that is deliberate and uninsurable.',
    observableOptions: [
      'Fire: Accidental (✓), Measurable (✓), Specific (✓) → IRDAI Insurable',
      'Competition: Accidental (✗), Measurable (✗), Specific (✗) → Non-Insurable Commercial Risk',
    ],
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced with NEP 2020 Competencies) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_bs_021)
  {
    id: 'ch_01',
    nodeId: NODE_C11_BS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the mandatory minimum transaction limit for initiating an RTGS (Real Time Gross Settlement) payment in India?',
    options: ['₹1 (No minimum)', '₹10,000', '₹2,00,000', '₹5,00,000'],
    correctIndex: 2,
    explanation: 'RTGS is designed for high-value gross real-time settlement and has a statutory floor of ₹2,00,000 with no upper cap for online transfers. NEFT has no minimum floor.',
    hints: [
      'Think of why RTGS is chosen by large corporate treasuries like Tata Steel.',
      'It requires a high floor to avoid clogging gross settlement engines with tiny transactions.',
      'The minimum is exactly two lakh rupees (₹2,00,000).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c11_bs_024)
  {
    id: 'ch_02',
    nodeId: NODE_C11_BS_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does an educational institution or government tender demand a Demand Draft (DD) rather than an ordinary Cheque?',
    options: [
      'A Demand Draft is pre-paid by the bank upon issuance and cannot bounce due to insufficient funds.',
      'A Demand Draft is free of bank charges unlike cheques.',
      'A Demand Draft draws from the card network without bank involvement.',
      'A Cheque does not require an authorized signature.',
    ],
    correctIndex: 0,
    explanation: 'A Demand Draft is a pre-paid negotiable instrument debited from the applicant\'s account at the time of issue, guaranteeing payment to the drawee with zero bounce risk.',
    hints: [
      'What happens if a student writes a personal cheque with ₹0 in their bank account?',
      'A DD is pre-funded when the bank prints it.',
      'Because the bank already collected the funds upfront, a DD is guaranteed money.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Understanding (c11_bs_025)
  {
    id: 'ch_03',
    nodeId: NODE_C11_BS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Redington India Ltd. purchases 50,000 iPhones from Apple and distributes lots of 20 to Croma and local mobile shops. Who is Redington’s customer?',
    options: [
      'The individual walking into Croma to buy a personal phone',
      'The trade retailers (Croma, Reliance Digital, and local dealers)',
      'The Department of Telecommunications',
      'Apple Inc.',
    ],
    correctIndex: 1,
    explanation: 'Wholesalers operate in pure B2B trade. Their buyers are always trade retailers or industrial users, never the ultimate household consumer.',
    hints: [
      'Does Redington have a billing counter where you can buy 1 phone?',
      'Wholesalers sell exclusively to other businesses for resale.',
      'Redington\'s customers are the retail store businesses (B2B).',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Recall (c11_bs_027)
  {
    id: 'ch_04',
    nodeId: NODE_C11_BS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A vegetable vendor wheels a handcart through Dadar, Mumbai calling out prices. Under which retail sub-type is this classified?',
    options: ['Speciality Shop', 'Street Stall Holder', 'Hawker (Itinerant Retailer)', 'Second-hand Goods Dealer'],
    correctIndex: 2,
    explanation: 'Hawkers are itinerant retailers who carry their goods on a handcart or bicycle, moving from street to street with no permanent premises.',
    hints: [
      'Does the seller operate from a permanent shop with a fixed address?',
      'Moving with a handcart represents an itinerant sub-type.',
      'Sellers who move street-to-street with a cart are called hawkers.',
    ],
  },
  // 5. Foundation - Understanding (c11_bs_030)
  {
    id: 'ch_05',
    nodeId: NODE_C11_BS_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following business risks is INSURABLE under Indian insurance law (IRDAI)?',
    options: [
      'Loss of sales due to a new rival supermarket opening across the street',
      'Warehouse fabric inventory destroyed by an accidental electrical short-circuit fire',
      'Loss of demand caused by a government change in the GST slab',
      'Fall in value of company shares held in the stock market',
    ],
    correctIndex: 1,
    explanation: 'Under Frank Knight\'s doctrine, insurable risks must be pure (loss only), accidental, measurable in money, and specific to the insured. Fire satisfies all three conditions.',
    hints: [
      'Look for the risk that is accidental, measurable in money, and specific to one business.',
      'Competition, tax changes, and stock price swings are speculative or market-wide.',
      'Accidental warehouse fire is a classic insurable pure risk.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Drag-label (c11_bs_028)
  {
    id: 'ch_06',
    nodeId: NODE_C11_BS_028,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the three large-format retail models to their core operational attributes.',
    dragItems: [
      { label: 'Departmental Store', targetId: 'slot_wide' },
      { label: 'Chain Store', targetId: 'slot_standard' },
      { label: 'Dark Store', targetId: 'slot_online' },
    ],
    correctMapping: {
      slot_wide: 'Departmental Store',
      slot_standard: 'Chain Store',
      slot_online: 'Dark Store',
    },
    explanation: 'Departmental stores (Shoppers Stop) offer wide assortment under one roof; Chain stores (Westside) feature standardized narrow private label lines; Dark stores (Zepto/Blinkit) are online-only micro-warehouses.',
    hints: [
      'Which store has multiple departments (cosmetics, apparel, luggage) under one roof?',
      'Which format has identical branches across cities selling private labels?',
      'Which format has no walk-in customers and only serves 10-minute app deliveries?',
    ],
  },
  // 7. Foundation - Drag-sort (c11_bs_024)
  {
    id: 'ch_07',
    nodeId: NODE_C11_BS_024,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 operational steps for generating an Online Demand Draft via internet banking.',
    sortItems: [
      'Log in to Internet Banking with user credentials and 2FA OTP',
      'Enter Beneficiary Name, Amount, Drawee Branch, and Payable City',
      'Authorize debit of Principal Amount plus Bank Issuance Fee',
      'Download, print counterfoil, or receive dispatched physical DD',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Online DD issue begins with secure authentication, followed by beneficiary/drawee capture, debit authorization with fee, and document generation.',
    hints: [
      'You must authenticate into your banking portal before filling forms.',
      'Specify who gets paid and where before paying the fee.',
      'The bank debits your account before creating the printable pre-funded draft.',
    ],
  },
  // 8. Standard - Application (c11_bs_021)
  {
    id: 'ch_08',
    nodeId: NODE_C11_BS_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Surat textile merchant needs to pay ₹3,50,000 to a machinery vendor on a National Holiday. The vendor needs funds credited within 60 seconds. Which RBI/NPCI rail should he select?',
    options: [
      'Standard UPI (due to instant settlement)',
      'IMPS (Immediate Payment Service)',
      'NEFT (due to half-hourly batch clearing)',
      'Post-dated Crossed Cheque',
    ],
    correctIndex: 1,
    explanation: 'IMPS settles instantly 24x7x365 with an NPCI ceiling of ₹5,00,000. Standard UPI is capped at ₹1,00,000 per transaction, and NEFT settles in batches.',
    hints: [
      'The payment is ₹3.5 lakh. What is the standard UPI cap?',
      'Standard UPI cap is ₹1,00,000, so ₹3,50,000 exceeds UPI.',
      'IMPS has a ₹5,00,000 limit and operates 24x7 in real-time.',
    ],
  },
  // 9. Standard - Application / Numeric (c11_bs_024)
  {
    id: 'ch_09',
    nodeId: NODE_C11_BS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Vikram spends ₹40,000 on his credit card. His statement generates on the 1st. He pays only the minimum due of 5% (₹2,000) by the due date. If the bank charges 3.5% monthly interest on the revolving unpaid balance, calculate the interest charged in rupees for that month.',
    correctAnswer: 1330,
    tolerance: 10,
    unit: '₹',
    explanation: 'Unpaid revolving balance = ₹40,000 − ₹2,000 = ₹38,000. Monthly interest = ₹38,000 × 3.5% = ₹1,330. (Annualized at 42% p.a.).',
    hints: [
      'Find the unpaid balance: ₹40,000 - ₹2,000.',
      'Calculate 3.5% of the remaining ₹38,000.',
      '38,000 × 0.035 = 1,330 rupees.',
    ],
  },
  // 10. Standard - Analysis (c11_bs_026)
  {
    id: 'ch_10',
    nodeId: NODE_C11_BS_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Metro Cash & Carry (which operates large warehouse-style aisles with trolleys) legally classified as a WHOLESALER, while DMart is classified as a RETAILER?',
    options: [
      'Metro has larger store floor area than DMart.',
      'Metro sells exclusively to registered business buyers with GSTIN for resale/commercial use, whereas DMart sells to final household consumers.',
      'Metro sells imported goods while DMart sells indigenous goods.',
      'DMart offers discounts while Metro charges statutory MRP.',
    ],
    correctIndex: 1,
    explanation: 'The classification between wholesale and retail depends strictly on customer type (B2B vs B2C), not store size or visual layout.',
    hints: [
      'Can an ordinary walk-in student without a business GST number shop at Metro Cash & Carry?',
      'Store format does not decide wholesale vs retail.',
      'The buyer\'s identity (business vs final consumer) is the decisive legal discriminator.',
    ],
    misconceptionIndex: 3,
  },
  // 11. Standard - Application (c11_bs_022)
  {
    id: 'ch_11',
    nodeId: NODE_C11_BS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Kavita discovers an unauthorized debit of ₹30,000 on her account on Tuesday. She immediately notifies her bank via the helpline on Wednesday morning (within 24 hours). Under RBI\'s Limited Liability Circular (6 July 2017), what is her liability?',
    options: [
      'Full liability of ₹30,000 because internet banking carries inherent user risk',
      'Zero liability (100% reimbursed by the bank)',
      'Fixed penalty of ₹5,000',
      '50% co-sharing of the loss',
    ],
    correctIndex: 1,
    explanation: 'Under RBI rules, if a customer reports unauthorized electronic banking fraud within 3 working days, customer liability is ZERO.',
    hints: [
      'Notice she reported within 1 working day (well within the 3-day window).',
      'RBI protects prompt reporters with complete indemnity.',
      'Zero liability applies when reported within 3 working days.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - Analysis (c11_bs_029)
  {
    id: 'ch_12',
    nodeId: NODE_C11_BS_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A brand has 40 physical stores and an e-commerce website. Online inventory is separate, gift cards do not cross-operate, and web orders cannot be returned in stores. Which stage of retail integration is this?',
    options: ['Single-channel Retailing', 'Multichannel Retailing (Siloed)', 'Omnichannel Retailing (Unified)', 'Dark Store Network'],
    correctIndex: 1,
    explanation: 'Multichannel means multiple independent channels operating in silos with separated stock, separate CRM, and no cross-channel fulfillment.',
    hints: [
      'Are the store and website sharing inventory and returns?',
      'Multiple channels exist, but they are not integrated.',
      'Siloed channels without unified stock/returns = Multichannel.',
    ],
  },
  // 13. Standard - Construct (c11_bs_030)
  {
    id: 'ch_13',
    nodeId: NODE_C11_BS_030,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble Frank Knight\'s 3 essential tests for a business risk to be legally insurable.',
    availableParts: ['Accidental Chance Event', 'Measurable in Money', 'Specific to Insured (Non-Systematic)', 'Market Competition Outcome', 'Guaranteed Government Policy Shift'],
    targetState: 'Accidental Chance Event Measurable in Money Specific to Insured (Non-Systematic)',
    validationHint: 'Select the 3 criteria that define pure, quantifiable, non-systematic insurable risks.',
    explanation: 'To be insurable, an event must be accidental (not deliberate), measurable in monetary loss, and specific to the insured (not systematic market-wide collapse).',
    hints: [
      'Can an insurer cover a deliberate business price war?',
      'The risk must be an accidental event, measurable in financial terms, and specific.',
      'Add Accidental Chance Event, Measurable in Money, and Specific to Insured.',
    ],
  },
  // 14. Standard - Application (c11_bs_023)
  {
    id: 'ch_14',
    nodeId: NODE_C11_BS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A shopkeeper in a remote village uses USSD banking code *99# on a ₹1,200 basic 2G feature phone without internet. Which body operates this interoperable infrastructure under RBI oversight?',
    options: ['TRAI', 'NPCI (National Payments Corporation of India)', 'SWIFT', 'SEBI'],
    correctIndex: 1,
    explanation: 'NPCI operates the *99# USSD mobile banking service across all telecom service providers and banks, allowing non-smartphone users access to basic banking.',
    hints: [
      'Who runs UPI, IMPS, and RuPay in India?',
      'It is the umbrella organization for retail payment systems in India.',
      'NPCI (National Payments Corporation of India).',
    ],
  },
  // 15. Advanced - Evaluation (c11_bs_021)
  {
    id: 'ch_15',
    nodeId: NODE_C11_BS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the Digital Rupee (e₹ - CBDC) fundamentally differ from both UPI bank transfers and private cryptocurrencies like Bitcoin?',
    options: [
      'The Digital Rupee is a decentralised coin like Bitcoin, whereas UPI is bank-issued.',
      'The Digital Rupee represents direct sovereign central bank fiat liability (legal tender) holding value without intermediate commercial bank credit risk, unlike UPI which is a transfer rail between commercial bank deposit accounts.',
      'Digital Rupee charges 5% transaction fees while Bitcoin is governed by the RBI Act.',
      'There is no functional or legal difference between UPI balance and CBDC.',
    ],
    correctIndex: 1,
    explanation: 'CBDC (e₹) is sovereign currency backed directly by the RBI (legal tender in digital form). UPI is a messaging and settlement rail moving commercial bank deposits.',
    hints: [
      'Whose liability is a currency note in your pocket? The RBI governor promises to pay.',
      'Commercial bank accounts are liabilities of SBI or HDFC.',
      'e-Rupee is direct RBI sovereign liability, while UPI moves commercial bank money.',
    ],
  },
  // 16. Advanced - Evaluation / Strategic (c11_bs_025)
  {
    id: 'ch_16',
    nodeId: NODE_C11_BS_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A D2C beverage brand decides to eliminate wholesale distributors to "capture the 8% wholesale margin". According to Oliver Williamson\'s Transaction Cost Economics and Peter Drucker\'s distribution principles, what will likely occur?',
    options: [
      'Profits will automatically surge by exactly 8% across all 20,000 retail endpoints.',
      'The brand must internalize warehousing, transport fleets, credit risk, and retailer contact costs ((P×R) lines), which frequently exceed the 8% margin in scattered markets.',
      'The retailers will voluntarily cover all logistics costs for the brand.',
      'Retailers will start manufacturing the beverages themselves.',
    ],
    correctIndex: 1,
    explanation: 'Wholesalers reduce contact lines from (P×R) to (P+R) and provide economies of scale in warehousing and credit. By-passing them internalizes heavy operational costs.',
    hints: [
      'Who will deliver 2 cases of drinks to 20,000 individual shops across 15 states?',
      'The distribution functions (storage, last-mile, credit) cannot be eliminated—only shifted.',
      'Internalized logistics, warehousing, and credit administration costs often surpass the 8% distributor margin.',
    ],
  },
  // 17. Advanced - Analysis (c11_bs_028)
  {
    id: 'ch_17',
    nodeId: NODE_C11_BS_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trent Ltd. operates Westside (chain store) while Shoppers Stop operates departmental stores. How do their Porter Generic Strategies differ?',
    options: [
      'Westside pursues Focus; Shoppers Stop pursues pure Cost Leadership.',
      'Westside pursues Cost Leadership through scale in standardized private labels; Shoppers Stop pursues Differentiation through wide brand assortment and department experiences.',
      'Both pursue identical unsegmented marketing strategies.',
      'Shoppers Stop operates dark stores while Westside is purely online.',
    ],
    correctIndex: 1,
    explanation: 'Chain stores achieve cost leadership via standardized centralized buying of private labels. Departmental stores differentiate via immense brand width under one roof.',
    hints: [
      'Does Westside primarily sell its own brands (Zuba, ETA, Westsport)?',
      'Shoppers Stop curates hundreds of external cosmetics, fashion, and luxury brands.',
      'Standardized private label scale = Cost Leadership; Multi-category brand curation = Differentiation.',
    ],
  },
  // 18. Advanced - Evaluation (c11_bs_030)
  {
    id: 'ch_18',
    nodeId: NODE_C11_BS_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 2020 pandemic lockdowns, thousands of Indian SME retailers suffered massive revenue losses and claimed business interruption insurance. Why did IRDAI and insurers legally deny standard coverage?',
    options: [
      'SMEs failed to pay premium taxes.',
      'Pandemic lockdown is a systematic, government-mandated, non-accidental market-wide event that violates the pure-risk condition of specific, chance-based individual perils.',
      'Indian insurance companies are exempt from all business interruption policies.',
      'Retailers are classified as financial institutions under the Insurance Act 1938.',
    ],
    correctIndex: 1,
    explanation: 'Systematic risks affect all entities simultaneously. Insurers cannot pool or price market-wide government-mandated closures because risk pooling requires uncorrelated accidental events.',
    hints: [
      'Can an insurance company pay out claims to every single business in India simultaneously without going bankrupt?',
      'Was the lockdown an accidental localized fire, or a nationwide statutory order?',
      'Systematic, correlated, non-accidental market shutdowns fail the criteria for insurable risk pooling.',
    ],
  },
  // 19. Advanced - Application (c11_bs_029)
  {
    id: 'ch_19',
    nodeId: NODE_C11_BS_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Decathlon India enables a shopper in Pune to check real-time Sarjapur store stock on the app, reserve an item, try and buy in-store, and return it at any Indian branch with a unified loyalty account. What core architecture enables this omnichannel model?',
    options: [
      'Independent franchise websites operating separate balance sheets',
      'Unified ERP with real-time synchronized POS inventory, single CRM customer identity, and cross-channel logistics',
      'Multiple independent wholesale agents handling each store',
      'Pure digital dropshipping from international vendors',
    ],
    correctIndex: 1,
    explanation: 'Omnichannel success relies on tech integration: synchronized real-time inventory across stores and digital carts, unified customer data, and seamless returns.',
    hints: [
      'What backend database ensures the store POS and mobile app see the exact same stock count?',
      'It requires unified ERP, single customer ID, and integrated logistics.',
      'A synchronized inventory database + unified CRM constitutes true omnichannel architecture.',
    ],
  },
  // 20. Advanced - Drag-sort (c11_bs_026)
  {
    id: 'ch_20',
    nodeId: NODE_C11_BS_026,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the complete distribution & value-addition sequence of a packet of Tata Tea from tea garden to household consumer.',
    sortItems: [
      'Tata Consumer Products produces and packages tea lots at the processing plant',
      'District Wholesale Distributor buys bulk cartons, holds warehouse stock, and extends credit',
      'Local Kirana / Retailer purchases 10 kg mixed lots and displays on neighbourhood shelves',
      'Household consumer buys a 250g pack at MRP for immediate kitchen consumption (Possession Utility)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The channel moves from Producer (bulk packaging) → Wholesaler (storage/bulk-breaking) → Retailer (display/assortment) → Final Consumer (end possession utility).',
    hints: [
      'Start with tea packaging at the producer factory.',
      'Who breaks the bulk cartons before the neighborhood kirana gets its stock?',
      'The consumer at the end creates final possession utility.',
    ],
  },
  // 21. Advanced - Numeric (c11_bs_025)
  {
    id: 'ch_21',
    nodeId: NODE_C11_BS_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A wholesale distributor buys 2,000 cases of edible oil at ₹1,000/case from the manufacturer. He incurs ₹30/case in warehousing and logistics, and supplies 50 local retailers at ₹1,080/case. Calculate the wholesaler\'s NET PROFIT in rupees on this batch.',
    correctAnswer: 100000,
    tolerance: 500,
    unit: '₹',
    explanation: 'Gross margin per case = ₹1,080 − ₹1,000 = ₹80. Total Gross Margin = 2,000 × ₹80 = ₹1,60,000. Total Costs = 2,000 × ₹30 = ₹60,000. Net Profit = ₹1,60,000 − ₹60,000 = ₹1,00,000.',
    hints: [
      'Gross margin = (Selling Price ₹1,080 - Purchase Price ₹1,000) = ₹80 per case.',
      'Total gross revenue margin = 2,000 × ₹80 = ₹1,60,000.',
      'Subtract total operating costs (2,000 × ₹30 = ₹60,000) to get ₹1,00,000.',
    ],
  },
  // 22. Advanced - Creativity / Synthesis (c11_bs_027)
  {
    id: 'ch_22',
    nodeId: NODE_C11_BS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An itinerant street vendor operating a fruit cart under the Street Vendors Act 2014 wants to transition into a small-scale fixed shop retailer. Which strategic shift must he prepare for?',
    options: [
      'His costs will remain 100% variable based on daily sales.',
      'He transitions from variable daily costs to semi-fixed commitments (monthly rent, electricity, Shops & Establishments Act compliance) and must build location loyalty rather than mobile route timing.',
      'He will no longer be allowed to accept UPI payments.',
      'He automatically becomes a multi-brand departmental store.',
    ],
    correctIndex: 1,
    explanation: 'A fixed shop incurs irreversible fixed overheads (rent, municipal compliance, utilities) and relies on fixed-location repeat customer relationships, unlike a mobile cart with variable costs.',
    hints: [
      'What happens when it rains all day for a shop owner who must pay monthly rent regardless of footfall?',
      'The cost structure shifts from variable to semi-fixed.',
      'Fixed premises introduce fixed overheads and require building localized customer loyalty.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BS_021,
  title: 'e-Banking, Retail Networks & Business Risk Master Lab',
  definition: 'Comprehensive mastery of modern commercial systems: Indian payment rails (RTGS, NEFT, IMPS, UPI, e-Rupee), credit vs debit card models, wholesale and retail trade typologies, quick-commerce dark stores, omnichannel systems, and Frank Knight\'s business risk insurability framework.',
  eli5: 'Learn how money moves instantly across India, how goods flow from factories to neighborhood kiranas and 10-minute dark stores, and how businesses protect themselves from unexpected disasters.',
  misconceptions: [
    { misconception: 'RTGS and NEFT have the same rules, just different names.', correction: 'RTGS settles gross real-time with a ₹2,00,000 statutory minimum. NEFT settles in half-hourly batches with no minimum.' },
    { misconception: 'Credit cards provide free money with no downside.', correction: 'Credit cards offer a short grace period (up to 50 days), but revolving unpaid balances trigger 36-45% p.a. compound interest traps.' },
    { misconception: 'A Demand Draft is just an expensive paper cheque.', correction: 'A DD is pre-funded and guaranteed by the issuing bank; unlike a cheque, it cannot bounce due to insufficient funds.' },
    { misconception: 'Metro Cash & Carry and DMart are the same format because both look like supermarkets.', correction: 'Metro is a wholesaler selling strictly to registered B2B GSTIN holders. DMart is a retailer selling to final household consumers.' },
    { misconception: 'All business losses from price wars or pandemics can be covered by insurance.', correction: 'Insurable risks must be accidental, measurable in money, and specific (pure risks). Systematic or speculative risks cannot be insured.' },
  ],
  diagnosticQuestions: [
    { question: 'Which rail is used for instant ₹50 Kirana UPI QR payments?', options: ['RTGS', 'UPI via NPCI', 'NEFT batch', 'Demand Draft'], correctIndex: 1 },
    { question: 'What is the minimum floor limit for RTGS fund transfer?', options: ['₹0', '₹50,000', '₹2,00,000', '₹10,00,000'], correctIndex: 2 },
    { question: 'Does a wholesale distributor sell directly to final household consumers?', options: ['Yes, always', 'No, strictly B2B to retailers/industrial buyers', 'Only on weekends', 'Only for cash'], correctIndex: 1 },
    { question: 'A dark store (Zepto/Blinkit) is characterised by:', options: ['Huge display counters for walk-in luxury shoppers', 'Online-only micro-warehouse optimized for picking & rapid delivery', 'Selling second-hand goods', 'Operating only at weekly haats'], correctIndex: 1 },
    { question: 'What happens if you pay only the 5% minimum due on your credit card statement?', options: ['The bank waives the remaining 95%', 'The unpaid balance attracts 36-45% p.a. revolving compound interest', 'Your credit score immediately doubles', 'The card converts to a debit card'], correctIndex: 1 },
    { question: 'Under Frank Knight\'s doctrine, which condition makes a risk INSURABLE?', options: ['It is a deliberate price war with a competitor', 'It is an accidental, quantifiable pure risk specific to the insured', 'It is a speculative stock trade', 'It is a market-wide economic recession'], correctIndex: 1 },
    { question: 'What distinguishes omnichannel from multichannel retail?', options: ['Omnichannel has zero offline stores', 'Omnichannel integrates inventory, CRM, and cross-channel returns into one seamless tech stack', 'Multichannel is strictly for agricultural goods', 'Omnichannel charges higher GST'], correctIndex: 1 },
    { question: 'Under RBI rules, reporting unauthorized digital fraud within 3 working days gives the customer:', options: ['Zero Liability', '50% loss sharing', 'A ₹10,000 fine', 'Immediate account closure'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of Indian payment rails, wholesale/retail supply chains, store formats, card economics, and risk insurability principles.',
};

// ─── BRILLIANT.ORG EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Indian Payment Rails Engine (RBI & NPCI)',
    instruction: 'Adjust the transaction amount and urgency to observe how settlement mode, regulatory caps, and fees change across RTGS, NEFT, IMPS, and UPI.',
    interactionType: 'payment-rails-sim',
    nodeId: NODE_C11_BS_021,
  },
  {
    title: 'Lab 2: Debit vs Credit Card Economics & Debt Trap',
    instruction: 'Simulate a ₹50,000 purchase. Toggle between Full Payment and Minimum Due (5%) to see the 42% p.a. revolving interest compounding in real time.',
    interactionType: 'card-debt-sim',
    nodeId: NODE_C11_BS_024,
  },
  {
    title: 'Lab 3: The 4-Tier Distribution Pipeline & Margin Mechanics',
    instruction: 'Manipulate batch size and observe how storage, risk-bearing, and bulk-breaking by wholesalers reduce contact complexity from (P×R) to (P+R).',
    interactionType: 'distribution-pipeline-sim',
    nodeId: NODE_C11_BS_025,
  },
  {
    title: 'Lab 4: Retail Format Matrix (Kirana to Dark Store to Omnichannel)',
    instruction: 'Compare physical footprint, delivery speeds, and customer access across Kiranas, Departmental Stores, Chain Stores, and Quick-Commerce Dark Stores.',
    interactionType: 'retail-matrix-sim',
    nodeId: NODE_C11_BS_028,
  },
  {
    title: 'Lab 5: Frank Knight\'s 3-Filter Business Risk Evaluator',
    instruction: 'Test 5 diverse real-world business risks through the 3 filters: Accidental? Quantifiable? Specific? to determine IRDAI insurability.',
    interactionType: 'risk-insurability-sim',
    nodeId: NODE_C11_BS_030,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Executive Boardroom Strategy: Build Surat Weaves\' Commercial Plan',
  description: 'You are appointed Chief Financial & Commercial Officer of Surat Weaves Ltd. Apply your simulation findings to design a payment, distribution, retail, and risk mitigation roadmap for FY2026-27.',
  steps: [
    'Choose payment rails: RTGS for ₹10 Cr yarn consignments, UPI for retail webstore, and IMPS for urgent weekend vendor advances.',
    'Formulate retail channel strategy: Hybrid model pairing 15 flagship experience stores with 40 quick-commerce dark store inventory integrations (Omnichannel).',
    'Structure wholesale agreements: Appoint district wholesale distributors to absorb regional godown storage and retailer credit float.',
    'Underwrite risk portfolio: Execute Standard Fire & Special Perils policies with New India Assurance for factory plants while hedging yarn price swings via commodity futures.',
  ],
};

function C11_BusinessStudiesEbankingOnlineServicesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['business-studies'] || { name: 'Business Studies', emoji: '🏢', color: 'indigo' };

  // ─── STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab 1: Payment Rails Simulator
  const [paymentAmount, setPaymentAmount] = useState<number>(250000);
  const [selectedRail, setSelectedRail] = useState<'RTGS' | 'NEFT' | 'IMPS' | 'UPI' | 'CBDC'>('RTGS');
  const [isHoliday, setIsHoliday] = useState<boolean>(true);

  // Interactive Lab 2: Card Debt Calculator
  const [cardSpend, setCardSpend] = useState<number>(50000);
  const [paymentOption, setPaymentOption] = useState<'full' | 'minimum'>('minimum');
  const [revolvingMonths, setRevolvingMonths] = useState<number>(6);

  // Interactive Lab 3: Distribution Pipeline Simulator
  const [factoryBatchSize, setFactoryBatchSize] = useState<number>(5000);
  const [wholesalerMarginPct, setWholesalerMarginPct] = useState<number>(8);
  const [retailerMarkupPct, setRetailerMarkupPct] = useState<number>(15);

  // Interactive Lab 4: Retail Format Matrix
  const [selectedFormat, setSelectedFormat] = useState<'kirana' | 'dept' | 'chain' | 'dark' | 'omni'>('omni');

  // Interactive Lab 5: Risk Insurability Test Engine
  const [selectedRiskCase, setSelectedRiskCase] = useState<number>(0);

  // Interactive Challenges State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT and Timer references
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───
  // 1. Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Adapt difficulty dynamically upon score progression
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. 2D HTML Canvas Animation Loop
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

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(0.5, '#06b6d4');
      gradient.addColorStop(1, '#10b981');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 14, canvas.width, 4);

      for (let i = 0; i < 4; i++) {
        const x = (frame * (2 + i) + i * 80) % canvas.width;
        ctx.beginPath();
        ctx.arc(x, 16, 6, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#34d399';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // 4. Inactivity auto-hint timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 5. Reset challenge sub-states upon challenge change
  useEffect(() => {
    setDroppedLabels({});
    setSortArrangement([]);
    setNumericInput('');
    setConstructParts([]);
    setHintCount(0);
    setShowHint(false);
    setAnswerRevealed(false);
    setShowExplanation(false);
    setRevealedSteps(0);
  }, [currentChallenge]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${challenge.hints[nextLevel - 1]}`);
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
    speechManager.speak(isCorrect ? 'Outstanding understanding of RTGS 24x7 rules!' : 'Good attempt! Let us explore the mechanics in detail.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Commerce Labs. Manipulate each system to learn.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begins. Apply your concepts to real Indian business scenarios.');
  }, []);

  const handlePaymentRailChange = useCallback((rail: 'RTGS' | 'NEFT' | 'IMPS' | 'UPI' | 'CBDC') => {
    setSelectedRail(rail);
    audioManager.play('tap');
    speechManager.speak(`${rail} selected. Observing transaction thresholds and speed.`);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the Commerce Master Lab with ${finalScore} percent score.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding business analysis.');
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
        speechManager.speak('Let us review the detailed business explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  // ─── LIVE CALCULATIONS ───
  const cardDebtCalculation = useMemo(() => {
    const minDue = cardSpend * 0.05;
    const revolvingPrincipal = cardSpend - minDue;
    const monthlyRate = 0.035; // 42% p.a.
    let totalInterest = 0;
    let balance = revolvingPrincipal;
    const monthlyBreakdown = [];

    for (let m = 1; m <= revolvingMonths; m++) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance += interest;
      monthlyBreakdown.push({ month: `M${m}`, balance: Math.round(balance), interest: Math.round(interest) });
    }

    return {
      minDue,
      revolvingPrincipal,
      totalInterest: Math.round(totalInterest),
      finalRepayment: Math.round(cardSpend + totalInterest),
      monthlyBreakdown,
    };
  }, [cardSpend, revolvingMonths]);

  const distributionEconomics = useMemo(() => {
    const producerCost = 100;
    const wholesalePrice = producerCost * (1 + wholesalerMarginPct / 100);
    const retailPrice = wholesalePrice * (1 + retailerMarkupPct / 100);
    const contactsWithWholesaler = 1 + 50; // (1 Producer + 50 Retailers)
    const contactsDirect = 1 * 50;

    return {
      producerCost,
      wholesalePrice: wholesalePrice.toFixed(2),
      retailPrice: retailPrice.toFixed(2),
      wholesalerGross: (factoryBatchSize * (wholesalePrice - producerCost)).toFixed(0),
      retailerGross: (factoryBatchSize * (retailPrice - wholesalePrice)).toFixed(0),
      contactsSaved: contactsDirect - contactsWithWholesaler,
    };
  }, [factoryBatchSize, wholesalerMarginPct, retailerMarkupPct]);

  // Real Risk Cases for Lab 5
  const riskCases = useMemo(() => [
    {
      id: 0,
      title: 'Short-Circuit Fire in Surat Weaves Godown',
      details: '₹40,00,000 worth of packed synthetic silk destroyed by accidental short-circuit spark at midnight.',
      accidental: true,
      measurable: true,
      specific: true,
      verdict: 'INSURABLE (Pure Risk covered by Standard Fire & Special Perils Policy)',
      insurer: 'United India Insurance / New India Assurance',
    },
    {
      id: 1,
      title: 'Reliance Retail Enters Surat Market with 40% Discounts',
      details: 'A massive corporate competitor opens a retail hypermarket across the street, capturing 35% footfall.',
      accidental: false,
      measurable: false,
      specific: false,
      verdict: 'NON-INSURABLE (Speculative competition risk; managed via differentiation and branding, not insurance)',
      insurer: 'None — Commercial Market Risk',
    },
    {
      id: 2,
      title: 'GST Council Hikes Textile Tax Slab from 5% to 12%',
      details: 'Statutory parliamentary tax amendment increases compliance cost across all Indian textile mills simultaneously.',
      accidental: false,
      measurable: false,
      specific: false,
      verdict: 'NON-INSURABLE (Systematic policy shift affecting the entire national industry)',
      insurer: 'None — Sovereign Legislative Risk',
    },
    {
      id: 3,
      title: 'Burglary & Safe Theft of ₹5,00,000 Cash from Cash Counter',
      details: 'Forcible nighttime entry breaking lock and stealing physical weekend cash collections.',
      accidental: true,
      measurable: true,
      specific: true,
      verdict: 'INSURABLE (Burglary & Housebreaking Policy)',
      insurer: 'ICICI Lombard / SBI General',
    },
    {
      id: 4,
      title: 'Rupee Depreciation Swings Yarn Raw Material Cost by 8%',
      details: 'Foreign currency fluctuation affecting cotton import parity price.',
      accidental: false,
      measurable: true,
      specific: false,
      verdict: 'NON-INSURABLE by standard insurance (Speculative currency risk managed via forward contracts/derivatives)',
      insurer: 'Bank FX Hedging / MCX Futures',
    },
  ], []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/50 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">Class 11 ISC Commerce • Business Studies</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {difficulty} TIER
          </motion.span>
          <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs font-mono text-gold-300">
            Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
          </div>
        </div>
      </motion.div>

      {/* ─── LIVE PACKET CANVAS STREAM ─── */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
        <canvas ref={canvasRef} width={800} height={32} className="w-full h-8 block" />
        <div className="absolute inset-y-0 right-3 flex items-center text-[10px] font-mono text-slate-500">
          RBI / NPCI LIVE RAIL ENGINE (24x7x365)
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Case Scenario Launch</span>
            <h2 className="text-xl font-bold text-white mt-1 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-gold-300 font-mono">
              ⚡ Challenge Context: {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/70">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🤔</span>
              <h3 className="text-base font-bold text-white">Curiosity Challenge: Predict the Rail</h3>
            </div>
            <p className="text-slate-200 text-sm mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-gold-950/50 hover:border-gold-600'
                  }`}
                >
                  <span className="font-mono text-xs text-gold-400 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-900 border border-gold-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-xs ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! RTGS is 24x7x365 since Dec 2020 (₹2L min), and IMPS caps at ₹5L.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-900/70 text-slate-400 hover:text-white'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} of 5</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-xs sm:text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: E-BANKING PAYMENT RAILS ENGINE + TOPIC SVG 1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 1: Indian Payment Rails Architecture */}
                  <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-gold-900/50">
                    <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Diagram 1: RBI & NPCI Payment Settlement Rails Architecture
                    </span>
                    <svg viewBox="0 0 700 160" className="w-full h-auto max-h-44" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="10" width="150" height="140" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="85" y="35" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">RTGS (RBI)</text>
                      <text x="85" y="55" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">Real-Time Gross</text>
                      <text x="85" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Min: ₹2,00,000</text>
                      <text x="85" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">No Upper Cap</text>
                      <text x="85" y="115" fill="#34d399" fontSize="9" textAnchor="middle">24x7x365 Live</text>
                      <text x="85" y="133" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Corporate Treasury</text>

                      <rect x="180" y="10" width="150" height="140" rx="10" fill="#0f2942" stroke="#0ea5e9" strokeWidth="2" />
                      <text x="255" y="35" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">NEFT (RBI)</text>
                      <text x="255" y="55" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">Deferred Net Batch</text>
                      <text x="255" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Min: ₹1 (No Floor)</text>
                      <text x="255" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">30-Min Batches</text>
                      <text x="255" y="115" fill="#34d399" fontSize="9" textAnchor="middle">24x7 Settlement</text>
                      <text x="255" y="133" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Salaries / B2B Pay</text>

                      <rect x="350" y="10" width="160" height="140" rx="10" fill="#14342b" stroke="#10b981" strokeWidth="2" />
                      <text x="430" y="35" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">IMPS (NPCI)</text>
                      <text x="430" y="55" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">Immediate Payment</text>
                      <text x="430" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Cap: ₹5,00,000</text>
                      <text x="430" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Mobile/MMID/IFSC</text>
                      <text x="430" y="115" fill="#34d399" fontSize="9" textAnchor="middle">Instant 24x7</text>
                      <text x="430" y="133" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Weekend Emergency</text>

                      <rect x="530" y="10" width="160" height="140" rx="10" fill="#3b132c" stroke="#f43f5e" strokeWidth="2" />
                      <text x="610" y="35" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">UPI / e₹ (NPCI/RBI)</text>
                      <text x="610" y="55" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">Virtual ID / QR</text>
                      <text x="610" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Cap: ₹1,00,000 (Std)</text>
                      <text x="610" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Zero MDR Merchant</text>
                      <text x="610" y="115" fill="#34d399" fontSize="9" textAnchor="middle">Direct Bank VPA</text>
                      <text x="610" y="133" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Kirana Retail Flow</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Transaction Amount: <strong className="text-emerald-400 font-mono text-sm">₹{paymentAmount.toLocaleString('en-IN')}</strong></span>
                        <span>Mode Urgency: Instant</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set payment amount"
                        min={100}
                        max={1000000}
                        step={1000}
                        value={paymentAmount}
                        onChange={(e) => {
                          setPaymentAmount(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>₹100 (Retail UPI)</span>
                        <span>₹2,00,000 (RTGS Floor)</span>
                        <span>₹5,00,000 (IMPS Cap)</span>
                        <span>₹10,00,000</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-400">Calendar Timing:</span>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsHoliday(!isHoliday)}
                        className={`mt-2 py-1.5 px-3 rounded-lg font-bold border transition-all ${
                          isHoliday ? 'bg-amber-950/60 border-amber-600 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {isHoliday ? '📅 Sunday / Bank Holiday' : '🏢 Regular Working Day'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Rail Selector Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['RTGS', 'NEFT', 'IMPS', 'UPI', 'CBDC'] as const).map((rail) => (
                      <motion.button
                        key={rail}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePaymentRailChange(rail)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedRail === rail
                            ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-sm font-extrabold">{rail}</div>
                        <div className="text-[10px] opacity-75">
                          {rail === 'RTGS' ? 'Real-Time Gross' : rail === 'NEFT' ? 'Batch Net' : rail === 'IMPS' ? 'Instant NPCI' : rail === 'UPI' ? 'Mobile QR' : 'e₹ CBDC'}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Status Verdict Box */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block">ELIGIBILITY STATUS:</span>
                      {selectedRail === 'RTGS' && paymentAmount < 200000 && (
                        <span className="text-rose-400 font-bold">❌ INELIGIBLE (Below ₹2L RTGS minimum)</span>
                      )}
                      {selectedRail === 'RTGS' && paymentAmount >= 200000 && (
                        <span className="text-emerald-400 font-bold">✓ ELIGIBLE (Gross Real-Time 24x7)</span>
                      )}
                      {selectedRail === 'UPI' && paymentAmount > 100000 && (
                        <span className="text-rose-400 font-bold">❌ EXCEEDS standard ₹1 Lakh UPI limit</span>
                      )}
                      {selectedRail === 'UPI' && paymentAmount <= 100000 && (
                        <span className="text-emerald-400 font-bold">✓ ELIGIBLE (Instant Account-to-Account)</span>
                      )}
                      {selectedRail === 'IMPS' && paymentAmount > 500000 && (
                        <span className="text-rose-400 font-bold">❌ EXCEEDS ₹5 Lakh IMPS ceiling</span>
                      )}
                      {selectedRail === 'IMPS' && paymentAmount <= 500000 && (
                        <span className="text-emerald-400 font-bold">✓ ELIGIBLE (Instant 24x7x365)</span>
                      )}
                      {selectedRail === 'NEFT' && (
                        <span className="text-emerald-400 font-bold">✓ ELIGIBLE (Half-hourly batch settlement)</span>
                      )}
                      {selectedRail === 'CBDC' && (
                        <span className="text-emerald-400 font-bold">✓ ELIGIBLE (Direct RBI Sovereign Legal Tender)</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">SETTLEMENT SPEED:</span>
                      <span className="text-gold-300 font-bold">
                        {selectedRail === 'RTGS' ? 'Instant (< 5 seconds)' : selectedRail === 'NEFT' ? '30-minute Batch Net' : selectedRail === 'IMPS' ? 'Instant (24x7)' : selectedRail === 'UPI' ? 'Real-Time (< 2 seconds)' : 'Peer-to-Peer Instant'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">STATUTORY REGULATOR:</span>
                      <span className="text-amber-400 font-bold">
                        {selectedRail === 'UPI' || selectedRail === 'IMPS' ? 'NPCI under RBI Oversight' : 'Reserve Bank of India (PSS Act 2007)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: DEBIT VS CREDIT CARD REVOLVING INTEREST ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Card Purchase Spend: <strong className="text-emerald-400 font-mono text-sm">₹{cardSpend.toLocaleString('en-IN')}</strong></span>
                        <span>Interest Rate: 42% p.a. (3.5%/mo)</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set card spend amount"
                        min={10000}
                        max={150000}
                        step={5000}
                        value={cardSpend}
                        onChange={(e) => {
                          setCardSpend(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Revolve Period: <strong className="text-amber-400 font-mono">{revolvingMonths} Months</strong></span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set revolving period in months"
                        min={1}
                        max={12}
                        value={revolvingMonths}
                        onChange={(e) => setRevolvingMonths(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Repayment Toggle */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentOption('full')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        paymentOption === 'full' ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Option A: Full Repayment within 50-Day Grace Period (₹0 Interest)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentOption('minimum')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        paymentOption === 'minimum' ? 'bg-rose-950/70 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Option B: Minimum Due (5% = ₹{cardDebtCalculation.minDue.toLocaleString('en-IN')}) Revolving
                    </motion.button>
                  </div>

                  {/* Recharts Bar Chart of Debt Growth */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={paymentOption === 'full' ? [{ month: 'M1', balance: 0, interest: 0 }] : cardDebtCalculation.monthlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                        <Legend />
                        <Bar dataKey="balance" fill="#6366f1" name="Remaining Debt (₹)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="interest" fill="#f43f5e" name="Compound Interest (₹)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between items-center font-mono">
                    <span className="text-slate-400">Total Extra Interest Paid: <strong className="text-rose-400">₹{paymentOption === 'full' ? '0' : cardDebtCalculation.totalInterest.toLocaleString('en-IN')}</strong></span>
                    <span className="text-slate-400">Total Outflow: <strong className="text-white">₹{paymentOption === 'full' ? cardSpend.toLocaleString('en-IN') : cardDebtCalculation.finalRepayment.toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: DISTRIBUTION PIPELINE & TOPIC SVG 2 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 2: Transaction Contact Reduction Model */}
                  <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-gold-900/50">
                    <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Diagram 2: Williamson Transaction Cost Economics — Contact Line Reduction
                    </span>
                    <svg viewBox="0 0 700 150" className="w-full h-auto max-h-44" xmlns="http://www.w3.org/2000/svg">
                      {/* Left: Without Wholesaler (P x R) */}
                      <rect x="15" y="10" width="315" height="130" rx="10" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                      <text x="172" y="28" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Direct Contacts: (3 Producers × 4 Retailers) = 12 Lines</text>
                      {/* 3 Producers */}
                      <circle cx="50" cy="50" r="10" fill="#6366f1" />
                      <text x="50" y="53" fill="#fff" fontSize="8" textAnchor="middle">P1</text>
                      <circle cx="50" cy="80" r="10" fill="#6366f1" />
                      <text x="50" y="83" fill="#fff" fontSize="8" textAnchor="middle">P2</text>
                      <circle cx="50" cy="110" r="10" fill="#6366f1" />
                      <text x="50" y="113" fill="#fff" fontSize="8" textAnchor="middle">P3</text>
                      {/* 4 Retailers */}
                      <circle cx="280" cy="45" r="9" fill="#10b981" />
                      <circle cx="280" cy="70" r="9" fill="#10b981" />
                      <circle cx="280" cy="95" r="9" fill="#10b981" />
                      <circle cx="280" cy="120" r="9" fill="#10b981" />
                      {/* Intersecting lines */}
                      <line x1="60" y1="50" x2="271" y2="45" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="50" x2="271" y2="70" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="50" x2="271" y2="95" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="50" x2="271" y2="120" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="80" x2="271" y2="45" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="80" x2="271" y2="70" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="80" x2="271" y2="95" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="80" x2="271" y2="120" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="110" x2="271" y2="45" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="110" x2="271" y2="70" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="110" x2="271" y2="95" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />
                      <line x1="60" y1="110" x2="271" y2="120" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />

                      {/* Right: With Wholesaler (P + R) */}
                      <rect x="365" y="10" width="320" height="130" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="525" y="28" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">With Wholesaler: (3 Producers + 4 Retailers) = 7 Lines</text>
                      {/* 3 Producers */}
                      <circle cx="400" cy="50" r="10" fill="#6366f1" />
                      <circle cx="400" cy="80" r="10" fill="#6366f1" />
                      <circle cx="400" cy="110" r="10" fill="#6366f1" />
                      {/* Wholesaler Node */}
                      <rect x="500" y="60" width="50" height="40" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                      <text x="525" y="84" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">W / DIST</text>
                      {/* 4 Retailers */}
                      <circle cx="640" cy="45" r="9" fill="#10b981" />
                      <circle cx="640" cy="70" r="9" fill="#10b981" />
                      <circle cx="640" cy="95" r="9" fill="#10b981" />
                      <circle cx="640" cy="120" r="9" fill="#10b981" />
                      {/* Streamlined lines */}
                      <line x1="410" y1="50" x2="500" y2="75" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="410" y1="80" x2="500" y2="80" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="410" y1="110" x2="500" y2="85" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="550" y1="75" x2="631" y2="45" stroke="#34d399" strokeWidth="2" />
                      <line x1="550" y1="80" x2="631" y2="70" stroke="#34d399" strokeWidth="2" />
                      <line x1="550" y1="80" x2="631" y2="95" stroke="#34d399" strokeWidth="2" />
                      <line x1="550" y1="85" x2="631" y2="120" stroke="#34d399" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Wholesaler Gross Margin: <strong className="text-gold-400 font-mono">{wholesalerMarginPct}%</strong></label>
                      <input
                        type="range"
                        aria-label="Set wholesaler gross margin percentage"
                        min={3}
                        max={15}
                        value={wholesalerMarginPct}
                        onChange={(e) => setWholesalerMarginPct(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Retailer Consumer Markup: <strong className="text-emerald-400 font-mono">{retailerMarkupPct}%</strong></label>
                      <input
                        type="range"
                        aria-label="Set retailer consumer markup percentage"
                        min={5}
                        max={30}
                        value={retailerMarkupPct}
                        onChange={(e) => setRetailerMarkupPct(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Value Chain Stages Visualization */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-gold-900 text-center">
                      <span className="text-[10px] text-gold-400 font-bold block">1. PRODUCER</span>
                      <p className="text-sm font-bold text-white mt-1">Surat Weaves</p>
                      <p className="text-xs text-slate-400 font-mono">₹{distributionEconomics.producerCost}/m</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-gold-950 text-gold-300 text-[9px] rounded font-mono">Form Utility</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-gold-900 text-center">
                      <span className="text-[10px] text-gold-400 font-bold block">2. WHOLESALER</span>
                      <p className="text-sm font-bold text-white mt-1">Redington/District</p>
                      <p className="text-xs text-slate-400 font-mono">₹{distributionEconomics.wholesalePrice}/m</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-gold-950 text-gold-300 text-[9px] rounded font-mono">Time & Place Utility</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900 text-center">
                      <span className="text-[10px] text-emerald-400 font-bold block">3. RETAILER</span>
                      <p className="text-sm font-bold text-white mt-1">Local Kirana / DMart</p>
                      <p className="text-xs text-slate-400 font-mono">₹{distributionEconomics.retailPrice}/m (MRP)</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] rounded font-mono">Possession Utility</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-purple-900 text-center">
                      <span className="text-[10px] text-purple-400 font-bold block">4. FINAL CONSUMER</span>
                      <p className="text-sm font-bold text-white mt-1">Household Buyer</p>
                      <p className="text-xs text-slate-400 font-mono">Personal Consumption</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-purple-950 text-purple-300 text-[9px] rounded font-mono">End User</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono flex justify-between">
                    <span>Transactional Efficiency: Wholesaler saves <strong>{distributionEconomics.contactsSaved} lines</strong>.</span>
                    <span className="text-emerald-400">Total Batch Margin: ₹{parseInt(distributionEconomics.wholesalerGross) + parseInt(distributionEconomics.retailerGross)}</span>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: RETAIL FORMAT MATRIX ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'kirana', label: '1. Small Kirana (Fixed Small)' },
                      { id: 'dept', label: '2. Departmental Store (Shoppers Stop)' },
                      { id: 'chain', label: '3. Chain Store (Westside)' },
                      { id: 'dark', label: '4. Dark Store (Zepto/Blinkit)' },
                      { id: 'omni', label: '5. Omnichannel (Decathlon/JioMart)' },
                    ].map((f) => (
                      <motion.button
                        key={f.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedFormat(f.id as typeof selectedFormat)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedFormat === f.id
                            ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {f.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-3 font-mono">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">PRODUCT ASSORTMENT WIDTH:</span>
                      <strong className="text-gold-300">
                        {selectedFormat === 'dept' ? 'Very Wide (Apparel, Cosmetics, Home, Toys)' : selectedFormat === 'chain' ? 'Narrow (Private Label Apparel Only)' : selectedFormat === 'dark' ? 'Targeted Groceries (2,000 SKUs)' : selectedFormat === 'kirana' ? 'Neighborhood Staples' : 'Full Catalog Integrated'}
                      </strong>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">CUSTOMER WALK-IN ACCESS:</span>
                      <strong className="text-amber-400">
                        {selectedFormat === 'dark' ? 'ZERO Walk-in (Online App Orders Only)' : 'Physical Storefront Walk-in Browsing'}
                      </strong>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">PORTER GENERIC STRATEGY:</span>
                      <strong className="text-emerald-400">
                        {selectedFormat === 'dept' ? 'Differentiation (Assortment & Experience)' : selectedFormat === 'chain' ? 'Cost Leadership (Centralized Scale)' : selectedFormat === 'dark' ? 'Focus (10-Minute Speed)' : 'Seamless Customer Lifetime Value'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">LEGAL COMPLIANCE REGIME:</span>
                      <strong className="text-purple-300">
                        {selectedFormat === 'dark' ? 'DPIIT Quick-Commerce FDI Norms (2022)' : 'State Shops & Establishments Act / FDI 51% Multi-Brand'}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: FRANK KNIGHT'S 3-FILTER RISK EVALUATOR + TOPIC SVG 3 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 3: Frank Knight's 3-Filter Insurability Funnel */}
                  <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-gold-900/50">
                    <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Diagram 3: Frank Knight Insurable Risk Decision Funnel
                    </span>
                    <svg viewBox="0 0 700 130" className="w-full h-auto max-h-36" xmlns="http://www.w3.org/2000/svg">
                      {/* Gate 1 */}
                      <polygon points="20,10 200,10 180,120 40,120" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="110" y="45" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">FILTER 1</text>
                      <text x="110" y="65" fill="#fff" fontSize="10" textAnchor="middle">Accidental Peril?</text>
                      <text x="110" y="85" fill="#94a3b8" fontSize="8.5" textAnchor="middle">(Not deliberate/speculative)</text>

                      {/* Arrow 1 */}
                      <path d="M 195 65 L 235 65" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

                      {/* Gate 2 */}
                      <polygon points="245,20 415,20 395,110 265,110" fill="#0f2942" stroke="#0ea5e9" strokeWidth="2" />
                      <text x="330" y="50" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">FILTER 2</text>
                      <text x="330" y="70" fill="#fff" fontSize="10" textAnchor="middle">Measurable in ₹?</text>
                      <text x="330" y="90" fill="#94a3b8" fontSize="8.5" textAnchor="middle">(Quantifiable claim loss)</text>

                      {/* Arrow 2 */}
                      <path d="M 410 65 L 450 65" stroke="#38bdf8" strokeWidth="3" />

                      {/* Gate 3 */}
                      <polygon points="460,30 610,30 590,100 480,100" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="535" y="55" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">FILTER 3</text>
                      <text x="535" y="72" fill="#fff" fontSize="10" textAnchor="middle">Specific Risk?</text>
                      <text x="535" y="88" fill="#94a3b8" fontSize="8.5" textAnchor="middle">(Non-Systematic)</text>

                      {/* Verified Badge */}
                      <circle cx="655" cy="65" r="22" fill="#10b981" />
                      <text x="655" y="62" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">IRDAI</text>
                      <text x="655" y="74" fill="#fff" fontSize="8" textAnchor="middle">INSURABLE</text>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Select Real-World Incident Case:</span>
                    <select
                      aria-label="Select real-world incident case for risk analysis"
                      value={selectedRiskCase}
                      onChange={(e) => setSelectedRiskCase(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-gold-300 px-3 py-1 rounded-lg font-mono text-xs"
                    >
                      {riskCases.map((rc, idx) => (
                        <option key={rc.id} value={idx}>{rc.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-1">{riskCases[selectedRiskCase].title}</h4>
                    <p className="text-xs text-slate-300">{riskCases[selectedRiskCase].details}</p>
                  </div>

                  {/* 3 Frank Knight Interactive Filter Gates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 block font-mono">FILTER 1</span>
                      <strong className="text-white block">Accidental Event?</strong>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        riskCases[selectedRiskCase].accidental ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {riskCases[selectedRiskCase].accidental ? '✓ ACCIDENTAL' : '✗ DELIBERATE / INHERENT'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 block font-mono">FILTER 2</span>
                      <strong className="text-white block">Monetarily Measurable?</strong>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        riskCases[selectedRiskCase].measurable ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {riskCases[selectedRiskCase].measurable ? '✓ QUANTIFIABLE' : '✗ UNQUANTIFIABLE'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 block font-mono">FILTER 3</span>
                      <strong className="text-white block">Specific to Insured?</strong>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        riskCases[selectedRiskCase].specific ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {riskCases[selectedRiskCase].specific ? '✓ PURE SPECIFIC' : '✗ SYSTEMATIC / CORRELATED'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">IRDAI CLASSIFICATION VERDICT:</span>
                    <p className="text-amber-300 font-bold mt-1">{riskCases[selectedRiskCase].verdict}</p>
                    <span className="text-slate-500 text-[10px] block mt-1">Underwriter/Mechanism: {riskCases[selectedRiskCase].insurer}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950 rounded-2xl border border-gold-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Zero Pressure Sandbox</span>
              <h2 className="text-lg font-bold text-white">Full Commercial Cockpit Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">Experiment freely with all payment, credit, and supply chain sliders before starting the challenges.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              I am Ready for Challenges! 🚀
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sandbox Card 1: Fast Payment Switcher */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <strong className="text-gold-400 block font-mono">1. PAYMENT ROUTING ENGINE</strong>
              <div className="flex justify-between">
                <span>Amount: <strong className="text-emerald-400">₹{paymentAmount.toLocaleString('en-IN')}</strong></span>
                <span>Mode: <strong>{selectedRail}</strong></span>
              </div>
              <input
                type="range"
                aria-label="Set payment amount for sandbox routing engine"
                min={500}
                max={600000}
                step={500}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 font-mono text-[11px]">
                {paymentAmount >= 200000 ? '✅ Route via RTGS (Instant 24x7)' : paymentAmount <= 100000 ? '✅ Route via UPI (QR mobile zero MDR)' : '✅ Route via IMPS (Instant 24x7 up to ₹5L)'}
              </div>
            </div>

            {/* Sandbox Card 2: Wholesale-Retail Calculator */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <strong className="text-emerald-400 block font-mono">2. VALUE CHAIN MARGINS</strong>
              <div className="flex justify-between">
                <span>Wholesaler: <strong>{wholesalerMarginPct}%</strong></span>
                <span>Retailer: <strong>{retailerMarkupPct}%</strong></span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 font-mono text-[11px] space-y-1">
                <div>Ex-Factory: ₹100.00</div>
                <div>Wholesale Invoice: ₹{(100 * (1 + wholesalerMarginPct / 100)).toFixed(2)}</div>
                <div>Consumer MRP: ₹{(100 * (1 + wholesalerMarginPct / 100) * (1 + retailerMarkupPct / 100)).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Challenge Status Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div>
              <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono">
                Challenge {currentChallenge + 1} of {filteredChallenges.length} • {challenge.competencyLevel.toUpperCase()}
              </span>
              <h3 className="text-xs font-mono text-slate-300 mt-0.5">Node: {challenge.nodeId}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400">Hints Left: {3 - hintCount}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <div className={`p-6 bg-slate-800/70 rounded-3xl border transition-all ${
            wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-700 shadow-xl'
          }`}>
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 bg-gold-950 border border-gold-700 text-gold-300 text-xs font-mono font-bold rounded-lg mt-0.5">
                  Q{currentChallenge + 1}
                </span>
                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">{challenge.question}</p>
              </div>

              {/* 1. MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                          : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-gold-950/60 hover:border-gold-600'
                      }`}
                    >
                      <span className="font-mono text-xs text-gold-400 mr-2">({String.fromCharCode(65 + i)})</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Available Formats:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_wide')}
                      className="p-4 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 text-center space-y-2"
                    >
                      <span className="text-xs text-slate-400 block font-mono">Wide Assortment Under 1 Roof (Shoppers Stop)</span>
                      <div className="p-2 bg-slate-950 rounded-lg text-xs font-bold text-gold-300">
                        {droppedLabels.slot_wide || 'Drop Format Here'}
                      </div>
                    </div>

                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_standard')}
                      className="p-4 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 text-center space-y-2"
                    >
                      <span className="text-xs text-slate-400 block font-mono">Standardized Private Label Chain (Westside)</span>
                      <div className="p-2 bg-slate-950 rounded-lg text-xs font-bold text-gold-300">
                        {droppedLabels.slot_standard || 'Drop Format Here'}
                      </div>
                    </div>

                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_online')}
                      className="p-4 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 text-center space-y-2"
                    >
                      <span className="text-xs text-slate-400 block font-mono">Online-Only 10-Min Micro-Warehouse (Zepto)</span>
                      <div className="p-2 bg-slate-950 rounded-lg text-xs font-bold text-gold-300">
                        {droppedLabels.slot_online || 'Drop Format Here'}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Validate Mapping
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3 pt-2">
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
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="font-mono text-gold-400 font-bold">{displayIdx + 1}.</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Ordered Sequence
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC INPUT CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      aria-label="Enter numerical calculation answer"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 focus:outline-none"
                    />
                    <span className="text-sm font-mono text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Check Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConstructParts(prev => prev.includes(part) ? prev : [...prev, part])}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-gold-300 text-xs rounded-lg font-mono hover:border-gold-500"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gold-950 border border-gold-700 text-gold-200 text-xs rounded-lg flex items-center gap-2">
                        {part}
                        <button
                          type="button"
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 font-mono">Select filters to assemble criteria...</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Validate Criteria Assembly
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-slate-900 rounded-2xl border border-gold-900 space-y-3">
                <span className="text-xs font-bold text-amber-400 font-mono block">Step-by-Step Business Analysis:</span>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-gold-400 font-mono">[{idx + 1}]</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Lab →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & METACOGNITION PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 to-slate-900 rounded-3xl border border-gold-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-extrabold text-white">ISC Commerce Master Lab Certified</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Grade: <strong className="text-emerald-400 font-mono text-base">{Math.max(0, 100 - errors * 5)}%</strong> • Performance Tier: <strong className="text-gold-300 uppercase font-mono">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-xs sm:text-sm text-emerald-200">
            {errors === 0
              ? '🌟 PERFECT SCORE! You have mastered Indian payment rails, card mechanics, distribution networks, and risk doctrines with zero conceptual errors.'
              : errors <= 3
              ? '👏 Exemplary Performance! Solid conceptual understanding across wholesale, quick commerce, and banking frameworks.'
              : '📈 Commendable Effort! You have built practical commercial intuition. Review your misconception profile below to solidify memory.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconception Review
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                      <p className="text-rose-300">❌ Error Identified: {m.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Standard: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REQUIRED REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/70 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💭</span>
              <h3 className="text-base font-bold text-white">Metacognitive Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">Deepen your conceptual retention by reflecting on these core questions:</p>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-gold-300">1. What was the most surprising thing you learned?</span>
                <p className="text-xs text-slate-400">
                  e.g., How RTGS operates 24x7x365 with a strict ₹2,00,000 statutory minimum, or how paying only the 5% minimum due on a credit card compounds into a devastating 42% p.a. revolving debt spiral.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-gold-300">2. How would you explain this to a friend?</span>
                <p className="text-xs text-slate-400">
                  e.g., Wholesalers do not just mark up prices—they dramatically collapse market contact friction from (P × R) to (P + R), bearing godown storage risks and extending working capital credit so kiranas can survive.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-gold-300">3. Where in real life might you use this?</span>
                <p className="text-xs text-slate-400">
                  e.g., Selecting the optimal payment rail (UPI vs IMPS vs RTGS) for vendor remittances, understanding buyer rights under RBI zero-liability fraud rules, and deciding whether business perils can be insured under IRDAI policies.
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Activity: Boardroom Plan */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/70 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 bg-gold-950 text-gold-400 rounded font-mono font-bold mt-0.5">{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 flex justify-between items-center font-mono">
            <span>SM-2 Memory Retention Schedule:</span>
            <span className="text-gold-400 font-bold">
              Review due in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BUBBLE AND FX COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BusinessStudiesEbankingOnlineServicesSim;