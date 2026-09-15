'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS (MANDATORY FOR PLATFORM TRACKING) ───
const NODE_C9_COMMSTUD_001 = 'c9_commstud_001';
const NODE_C9_COMMSTUD_002 = 'c9_commstud_002';
const NODE_C9_COMMSTUD_003 = 'c9_commstud_003';
const NODE_C9_COMMSTUD_004 = 'c9_commstud_004';
const NODE_C9_COMMSTUD_005 = 'c9_commstud_005';
const NODE_C9_COMMSTUD_006 = 'c9_commstud_006';
const NODE_C9_COMMSTUD_007 = 'c9_commstud_007';
const NODE_C9_COMMSTUD_008 = 'c9_commstud_008';
const NODE_C9_COMMSTUD_009 = 'c9_commstud_009';
const NODE_C9_COMMSTUD_010 = 'c9_commstud_010';

const ALL_NODE_IDS = [
  NODE_C9_COMMSTUD_001,
  NODE_C9_COMMSTUD_002,
  NODE_C9_COMMSTUD_003,
  NODE_C9_COMMSTUD_004,
  NODE_C9_COMMSTUD_005,
  NODE_C9_COMMSTUD_006,
  NODE_C9_COMMSTUD_007,
  NODE_C9_COMMSTUD_008,
  NODE_C9_COMMSTUD_009,
  NODE_C9_COMMSTUD_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Commerce Matrix',
  intro: 'From Mumbai corporate boardrooms to Punjab wheat farms, bustling Surat textile mandis, and Akshaya Patra kitchens — millions of activities power India daily. Are they commercial or charitable? Industry or commerce? Wholesale or retail?',
  context: 'As a junior economic consultant at NITI Aayog & MCA, you must analyze real Indian activities, classify them under statutory frameworks (Income Tax Act 1961, Companies Act 2013, CPA 2019), and optimize supply chains from farm to consumer.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Akshaya Patra cooks 20 lakh meals daily in mega industrial kitchens with 6,500+ paid staff. Is it a business?',
  options: [
    'Yes — because it uses industrial machinery and has huge turnover',
    'Yes — because it employs thousands of paid cooks and drivers',
    'No — because its motive is social welfare and surplus cannot be distributed',
    'No — because only listed companies on BSE can be businesses',
  ],
  correctIndex: 2,
  hintAfter: 'Remember: Scale and industrial equipment do NOT make a business — the primary motive and profit-distribution rule do!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall (001)
  {
    id: 'ch_01_comm_def',
    nodeId: NODE_C9_COMMSTUD_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 2(17) of the Income Tax Act 1961, what is the single distinguishing feature of a commercial activity?',
    options: [
      'It must always be carried out in an air-conditioned office',
      'The primary motive is earning profit or monetary remuneration',
      'It must always make an actual monetary profit every financial year',
      'It must receive continuous grants from the Central Government',
    ],
    correctIndex: 1,
    explanation: 'A commercial activity is undertaken with the primary motive of earning profit or remuneration. Actual loss in a given year does not change the motive.',
    hints: [
      'Focus on the driving intention or reward behind the human effort.',
      'Think about why Tata Motors sells cars or a shopkeeper opens his shutter.',
      'The presence of a profit or remuneration motive defines commercial activity.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation Drag-Label (002)
  {
    id: 'ch_02_bpe_drag',
    nodeId: NODE_C9_COMMSTUD_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each occupational reward type to its corresponding commercial occupation box.',
    dragItems: [
      { label: 'Profit & Capital Risk', targetId: 'box_business' },
      { label: 'Professional Fees (Statutory Reg.)', targetId: 'box_profession' },
      { label: 'Fixed Salary (Contract)', targetId: 'box_employment' },
    ],
    correctMapping: {
      box_business: 'Profit & Capital Risk',
      box_profession: 'Professional Fees (Statutory Reg.)',
      box_employment: 'Fixed Salary (Contract)',
    },
    explanation: 'Business earns profit and carries capital risk; Profession charges fees under a statutory body; Employment earns fixed salary under a contract.',
    hints: [
      'Who bears the loss if customers do not show up to a shop?',
      'Doctors and CAs charge professional fees under regulatory acts (ICAI, NMC).',
      'An employee at TCS receives a monthly pre-agreed salary.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation Understanding (003)
  {
    id: 'ch_03_char_regularity',
    nodeId: NODE_C9_COMMSTUD_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Class 9 student sells his old bicycle once on OLX for ₹3,500. Why is this transaction NOT a business activity?',
    options: [
      'Because bicycles cannot be traded in India',
      'Because the regularity characteristic is missing (it is an isolated personal disposal)',
      'Because payment was made via UPI rather than cash',
      'Because OLX does not charge sales tax on cycles',
    ],
    correctIndex: 1,
    explanation: 'Business requires regularity and continuity. A single isolated sale of a personal asset lacks systematic repetition and business capital deployment.',
    hints: [
      'Check the 6 business characteristics: does he sell cycles every day?',
      'A one-time sale of personal belongings is a capital asset disposal, not a business.',
      'Regularity separates genuine business from one-off personal sales.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation Classify (004)
  {
    id: 'ch_04_ind_comm_util',
    nodeId: NODE_C9_COMMSTUD_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Tata Steel converts iron ore into hot-rolled coils, while D-Mart stores and distributes FMCG products. Which utilities do they create?',
    options: [
      'Tata Steel creates Time utility; D-Mart creates Form utility',
      'Tata Steel creates Form utility; D-Mart creates Place and Time utility',
      'Both create Form utility exclusively',
      'Both create Natural utility without changing location or form',
    ],
    correctIndex: 1,
    explanation: 'Industry (Tata Steel) changes physical structure to create Form utility. Commerce (D-Mart) bridges distance and storage gaps to create Place and Time utility.',
    hints: [
      'Who physically changes ore into steel sheets?',
      'Who makes the finished item available on your neighborhood shelf when you need it?',
      'Industry = Form utility; Commerce = Place and Time utility.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation Recall (005)
  {
    id: 'ch_05_prim_ind_test',
    nodeId: NODE_C9_COMMSTUD_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following Indian enterprises is an example of PRIMARY EXTRACTIVE industry?',
    options: [
      'Maruti Suzuki assembling cars at its Manesar plant',
      'Coal India Ltd extracting coal from open-cast mines in Jharkhand',
      'Apollo Hospitals performing cardiac surgery in Chennai',
      'Flipkart delivering parcels across Tier-2 cities',
    ],
    correctIndex: 1,
    explanation: 'Coal India Ltd extracts raw mineral resources directly from nature (earth) with minimal processing, making it primary extractive industry.',
    hints: [
      'Look for the enterprise taking raw materials straight out of the earth or sea.',
      'Maruti is secondary manufacturing; Apollo & Flipkart are tertiary services.',
      'Coal India draws minerals directly from nature — primary extractive.',
    ],
  },
  // 6. Foundation Drag-Sort (005)
  {
    id: 'ch_06_supply_chain_sort',
    nodeId: NODE_C9_COMMSTUD_005,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of the cotton supply chain in order from Primary to Tertiary:',
    sortItems: [
      'Gujarat farmer harvests raw cotton bolls from agricultural fields',
      'Arvind Mills spins yarn and weaves denim jeans in Ahmedabad',
      'Delhivery couriers deliver packaged jeans to a consumer in Patna',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Primary (farming raw cotton) → Secondary (manufacturing denim cloth) → Tertiary (logistics and delivery service).',
    hints: [
      'Nature comes first (farming raw crop).',
      'Factory transformation follows (spinning and stitching).',
      'Distribution and service deliver the finished article to the customer.',
    ],
  },
  // 7. Standard Application (001)
  {
    id: 'ch_07_doctor_dual_role',
    nodeId: NODE_C9_COMMSTUD_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dr. Priya operates free on a BPL child at a charity camp on Sunday, and charges ₹75,000 for surgery at Fortis on Monday. How are these two acts classified?',
    options: [
      'Both are commercial because she holds an MBBS degree',
      'Sunday: Non-commercial social activity; Monday: Commercial activity (Profession)',
      'Both are non-commercial because healthcare is a noble cause',
      'Sunday: Business; Monday: Employment',
    ],
    correctIndex: 1,
    explanation: 'Classification depends on the motive and context of the specific act, not the person. Sunday has no remuneration motive (non-commercial); Monday earns professional fees (commercial).',
    hints: [
      'Does the nature of the surgery change, or the context and motive of payment?',
      'Free service to BPL patient = charitable non-commercial.',
      'Fee-based private hospital service = commercial profession.',
    ],
  },
  // 8. Standard Analysis (002)
  {
    id: 'ch_08_salon_vs_doctor',
    nodeId: NODE_C9_COMMSTUD_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A salon owner charges ₹500 for a haircut, and a lawyer charges ₹5,000 for a court appearance. Why is the lawyer in a profession while the salon owner is in business?',
    options: [
      'Because the lawyer charges 10 times more money',
      'Because the lawyer must hold an LL.B. and mandatory Bar Council registration under the Advocates Act 1961',
      'Because hairdressers do not pay income tax in India',
      'Because law involves reading books while hair cutting is purely physical',
    ],
    correctIndex: 1,
    explanation: 'A profession requires mandatory statutory qualification and registration with a statutory body (Bar Council). Salons hold trade licences, making them service businesses.',
    hints: [
      'Is there an Act of Parliament governing barbers with an enforceable code of ethics?',
      'Check the statutory body requirement (ICAI, Bar Council, NMC).',
      'Statutory registration under an Act of Parliament separates profession from business.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard Numeric (006)
  {
    id: 'ch_09_npo_85_rule',
    nodeId: NODE_C9_COMMSTUD_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 11 of the Income Tax Act 1961, an NGO receives ₹20 crore in donations. What MINIMUM amount (in ₹ Crore) must it spend on its charitable objects to remain tax-exempt?',
    correctAnswer: 17,
    tolerance: 0.1,
    unit: 'Crore',
    explanation: 'Under Section 11 of the Income Tax Act 1961, charitable trusts must apply at least 85% of their income to charitable objects. 85% of ₹20 Crore = ₹17 Crore.',
    hints: [
      'The Income Tax Act mandates applying at least 85% of income during the same financial year.',
      'Calculate 85% of 20: 0.85 × 20.',
      '0.85 × 20 = 17 Crore.',
    ],
  },
  // 10. Standard Application (008)
  {
    id: 'ch_10_four_quadrant_trade',
    nodeId: NODE_C9_COMMSTUD_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Moradabad brassware artisan sells 500 brass lamps in bulk to a department store chain in London, UK. How is this transaction classified in the trade matrix?',
    options: [
      'Retail Domestic Trade',
      'Wholesale Domestic Trade',
      'Wholesale Foreign Trade (Export)',
      'Retail Foreign Trade (Entrepot)',
    ],
    correctIndex: 2,
    explanation: 'Buyer is another business/retailer (Wholesale) and is located across national borders in the UK (Foreign/Export requiring DGFT IEC).',
    hints: [
      'Who is the buyer? A London department store chain (trader/bulk).',
      'Where is the buyer? Outside India (London, UK).',
      'Trader-to-trader across international borders = Wholesale Foreign Trade.',
    ],
  },
  // 11. Standard Match (007)
  {
    id: 'ch_11_aids_obstacles',
    nodeId: NODE_C9_COMMSTUD_007,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the Commercial Aid to Trade with the specific obstacle it removes from commerce:',
    options: [
      'Transport removes Time obstacle; Warehousing removes Risk obstacle',
      'Transport removes Place obstacle; Warehousing removes Time obstacle; Insurance removes Risk obstacle',
      'Banking removes Knowledge obstacle; Advertising removes Finance obstacle',
      'Packaging removes Place obstacle; Transport removes Knowledge obstacle',
    ],
    correctIndex: 1,
    explanation: 'Transport bridges place (distance); Warehousing bridges time (seasonality); Insurance mitigates financial risk of damage or loss.',
    hints: [
      'Where goods are made vs where they are wanted = Place (Transport).',
      'When goods are made vs when consumed = Time (Warehousing).',
      'Fear of goods catching fire in transit = Risk (Insurance).',
    ],
  },
  // 12. Standard Analysis (009)
  {
    id: 'ch_12_c2c_olx_analysis',
    nodeId: NODE_C9_COMMSTUD_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A college student sells her old Class 12 NCERT books to a junior student through OLX for ₹400. What e-commerce model is this?',
    options: [
      'B2B (Business-to-Business)',
      'B2C (Business-to-Consumer)',
      'C2C (Consumer-to-Consumer)',
      'G2B (Government-to-Business)',
    ],
    correctIndex: 2,
    explanation: 'Both the seller and the buyer are individual end-consumers transacting used personal goods; the platform only facilitates the listing.',
    hints: [
      'Is the seller an established commercial publishing company?',
      'Both parties are private individuals/students.',
      'Consumer selling to another Consumer = C2C.',
    ],
    misconceptionIndex: 4,
  },
  // 13. Standard Construct (007)
  {
    id: 'ch_13_construct_equation',
    nodeId: NODE_C9_COMMSTUD_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the fundamental Commercial equation of modern distribution from the given parts:',
    availableParts: ['Commerce', '=', 'Trade', '+', 'Aids to Trade', 'Industry', 'Profit'],
    targetState: 'Commerce = Trade + Aids to Trade',
    validationHint: 'The whole distribution system equals the buying/selling core plus its supporting tertiary services.',
    explanation: 'Commerce is defined as the sum total of Trade (exchange of goods/services) and Aids to Trade (transport, banking, insurance, warehousing, advertising).',
    hints: [
      'Start with the broader distribution term: Commerce.',
      'Add the equality sign (=).',
      'Combine the buying/selling core with the supporting services.',
    ],
  },
  // 14. Advanced Evaluation (001)
  {
    id: 'ch_14_tax_statutory_eval',
    nodeId: NODE_C9_COMMSTUD_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Indian tax law treat a private commercial school differently from a registered Section 12A educational trust, even if both offer the exact same ICSE syllabus?',
    options: [
      'Because commercial schools use digital smartboards while trusts only use chalkboards',
      'Because commercial schools distribute surplus profits to promoters, whereas Section 12A trusts are prohibited from profit distribution and must reinvest 85% in charitable objects',
      'Because trusts are exempt from all building safety and fire regulations in India',
      'Because ICSE board only recognizes private commercial schools',
    ],
    correctIndex: 1,
    explanation: 'Under the Income Tax Act 1961, commercial entities distribute dividends/profits to owners (taxable), while charitable trusts reinvest surplus into their public welfare mission without distribution.',
    hints: [
      'Evaluate the destination of any surplus cash at the end of the financial year.',
      'Who receives dividends in a private company vs a charitable trust?',
      'The non-distribution of profit constraint is what justifies tax-exempt status.',
    ],
  },
  // 15. Advanced Analysis (002)
  {
    id: 'ch_15_ca_as_cfo',
    nodeId: NODE_C9_COMMSTUD_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A qualified Chartered Accountant registered with ICAI leaves independent audit practice to join Infosys as Chief Financial Officer on a fixed package of ₹3 Crore/year. Her occupation is now:',
    options: [
      'Profession — because she holds an ICAI membership number forever',
      'Business — because Infosys is a large commercial corporation',
      'Employment — because she works under a contract of service for fixed remuneration (salary) without personal capital risk',
      'Non-commercial activity — because she advises on corporate ethics',
    ],
    correctIndex: 2,
    explanation: 'Occupation is determined by the reward and relationship structure. As CFO, she works under a contract of service for a fixed salary, making it employment regardless of professional qualifications.',
    hints: [
      'Does she bill Infosys as an external client per audit, or receive a monthly salary as an executive?',
      'Contract of service + fixed remuneration + employer supervision = Employment.',
      'Qualification provides eligibility, but the reward structure determines the occupational classification.',
    ],
  },
  // 16. Advanced Evaluation (010)
  {
    id: 'ch_16_transport_mode_eval',
    nodeId: NODE_C9_COMMSTUD_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A logistics officer must move 10,000 tonnes of iron ore from Odisha mines to a steel plant in Durgapur (350 km). Why is Indian Railways chosen over air cargo and road transport?',
    options: [
      'Air cargo cannot fly over West Bengal airspace',
      'Iron ore is a low-value bulk commodity; air cargo freight (₹40/kg) would exceed the ore value, and road would require 400+ trucks with high fuel costs and traffic delays',
      'Road transport is completely banned for all mining products under the Motor Vehicles Act',
      'Railways is the only mode legally authorized to weigh mineral goods',
    ],
    correctIndex: 1,
    explanation: 'Mode selection depends on the nature of goods (bulk/low-value vs perishable/high-value) and distance. Rail offers the lowest cost per tonne-kilometre for heavy bulk minerals.',
    hints: [
      'Calculate the cost of sending ₹5/kg iron ore by ₹40/kg air freight.',
      'Consider the massive volume (10,000 tonnes = 1-2 goods trains vs 400 trucks).',
      'Low-value bulk over land distance always demands heavy rail freight.',
    ],
  },
  // 17. Advanced Application (009)
  {
    id: 'ch_17_cpa_ecommerce_rules',
    nodeId: NODE_C9_COMMSTUD_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Consumer Protection (E-Commerce) Rules 2020, what statutory protection is granted to Indian consumers buying on platforms like Amazon.in and Flipkart?',
    options: [
      'All products bought online are completely non-returnable under central law',
      'Mandatory grievance officers, prohibition of deceptive dark patterns, seller identity disclosure, and refund within 48 hours of cancellation',
      'Online platforms are immune from all consumer court litigations',
      'Consumers must pay a mandatory 20% cyber security tax on every UPI checkout',
    ],
    correctIndex: 1,
    explanation: 'The Consumer Protection (E-Commerce) Rules 2020 mandate grievance officers, transparency of seller ratings, ban on dark patterns, and swift refunds.',
    hints: [
      'Review how government regulations protect consumers against online fraud and fake listings.',
      'Think about dark patterns (hidden charges, countdown timers) and return guarantees.',
      'The 2020 rules require grievance officers and 48-hour refund processing upon cancellation.',
    ],
  },
  // 18. Advanced Numeric (003)
  {
    id: 'ch_18_kirana_markup_calc',
    nodeId: NODE_C9_COMMSTUD_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Lucknow Kirana store buys 200 bags of basmati rice at ₹1,800/bag. He sells 150 bags at ₹2,200/bag and the remaining 50 bags at ₹2,000/bag. What is his total business profit (in Rupees)?',
    correctAnswer: 70000,
    tolerance: 100,
    unit: 'Rupees',
    explanation: 'Total Cost = 200 × 1800 = ₹3,60,000. Total Revenue = (150 × 2200) + (50 × 2000) = 3,30,000 + 1,00,000 = ₹4,30,000. Profit = ₹4,30,000 - ₹3,60,000 = ₹70,000.',
    hints: [
      'Step 1: Calculate total cost = 200 × ₹1,800.',
      'Step 2: Calculate total revenue from both batches = (150 × 2200) + (50 × 2000).',
      'Step 3: Profit = Revenue - Cost.',
    ],
  },
  // 19. Advanced Creativity/Scenario (008)
  {
    id: 'ch_19_export_strategy_design',
    nodeId: NODE_C9_COMMSTUD_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Solapur chappal maker wants to export directly to retail buyers in Germany without appointing a foreign distributor. What modern commercial combination should she deploy?',
    options: [
      'B2B Wholesale trade via local weekly mandi auctions',
      'B2C E-commerce via Amazon Global Selling with DGFT IEC and international courier aid',
      'Primary extractive mining with inland water transport',
      'C2C local swap meet at Solapur railway station',
    ],
    correctIndex: 1,
    explanation: 'B2C cross-border e-commerce allows an Indian producer to sell single retail units globally, backed by an IEC license, international logistics, and digital payment gateways.',
    hints: [
      'She wants to sell direct to retail end-consumers in Germany.',
      'What enables direct global retail from India? Cross-border B2C e-commerce + IEC + air courier.',
      'Amazon Global Selling + international courier provides global retail distribution without foreign middlemen.',
    ],
  },
  // 20. Advanced Analysis (004)
  {
    id: 'ch_20_itc_dual_branch',
    nodeId: NODE_C9_COMMSTUD_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'ITC Ltd operates paperboard manufacturing mills in Bhadrachalam and also runs the e-Choupal agricultural procurement and distribution network. How are these two classified?',
    options: [
      'Both are tertiary services',
      'Bhadrachalam mill is Industry (Form utility); e-Choupal is Commerce (Distribution, Place/Time utility)',
      'Both are primary extractive mining activities',
      'Bhadrachalam is Commerce; e-Choupal is Genetic Agriculture',
    ],
    correctIndex: 1,
    explanation: 'A single enterprise can encompass both branches: paperboard mills physically transform raw pulp (Industry/Form utility), while e-Choupal handles supply chain distribution and trade (Commerce/Place-Time utility).',
    hints: [
      'Which one converts wood pulp into finished paperboard boxes?',
      'Which one connects farmers to grain buyers through internet kiosks and storage warehouses?',
      'Manufacturing = Industry; Distribution network = Commerce.',
    ],
  },
  // 21. Advanced Evaluation (010)
  {
    id: 'ch_21_pipeline_vs_road',
    nodeId: NODE_C9_COMMSTUD_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'GAIL moves natural gas across 1,750 km via the Hazira-Vijaipur-Jagdishpur (HVJ) pipeline rather than tanker trucks. What is the key economic justification?',
    options: [
      'Tanker trucks are legally forbidden from carrying gas in Uttar Pradesh',
      'Pipelines provide 24x7 continuous mass fluid transport with zero traffic congestion, lowest running cost per cubic metre, and no road accident hazards',
      'Pipelines convert natural gas into petrol during transit',
      'Pipeline transport is completely exempt from all central safety inspections',
    ],
    correctIndex: 1,
    explanation: 'Pipelines require high initial capital but deliver unmatched operating efficiency, continuous flow, and minimal risk for large-scale fluid/gas transport over vast distances.',
    hints: [
      'Consider the continuous flow of gas required by massive fertilizer and power plants.',
      'How many thousands of tanker trucks would be needed daily on highways?',
      'Pipelines eliminate road bottlenecks, fuel wastage, and transit hazards for fluids.',
    ],
  },
  // 22. Advanced Drag-Sort (009)
  {
    id: 'ch_22_ecommerce_lifecycle',
    nodeId: NODE_C9_COMMSTUD_009,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 sequential stages of an Indian B2C E-commerce transaction (e.g. buying a laptop on Flipkart):',
    sortItems: [
      'Consumer browses catalog and compares product specifications on mobile app',
      'Order placement and instant digital payment authentication via UPI / Gateway',
      'Warehouse automated sorting and protective barcode packaging at fulfillment centre',
      'Logistics transit via air/road cargo express to regional delivery hub',
      'Last-mile delivery to consumer doorstep with OTP verification',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The modern e-commerce cycle progresses: App Discovery → Digital Checkout/Payment → Warehouse Fulfillment → Hub Logistics → Last-Mile OTP Handover.',
    hints: [
      'Discovery and catalog browsing is step 1.',
      'Checkout and payment precedes warehouse dispatch.',
      'Transit moves between hubs before last-mile delivery with OTP.',
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
  nodeId: NODE_C9_COMMSTUD_001,
  title: 'Commercial vs Non-Commercial Activities & Structure of Commerce',
  definition: 'Commercial activity is any human activity undertaken with the profit/remuneration motive through production, trade, or service delivery.',
  eli5: 'If you sell lemonade for ₹10 to make money, it is commercial. If you give it free to thirsty friends to help them, it is non-commercial.',
  misconceptions: [
    {
      misconception: 'All unpaid work is non-commercial, and all paid activities are business.',
      correction: 'Classification depends on profit motive and reward structure. Salaried teachers engage in employment (commercial); charitable hospital surgeons volunteering free do non-commercial service.',
    },
    {
      misconception: 'Anyone who provides a service is in a profession.',
      correction: 'Profession requires registration with a statutory professional body under an Act of Parliament (ICAI, Bar Council, NMC). Salons and caterers are service businesses.',
    },
    {
      misconception: 'Any single sale on OLX or a garage sale constitutes a business activity.',
      correction: 'Business requires regularity and continuous dealings. An isolated sale of personal assets is a one-time capital asset disposal, not a business.',
    },
    {
      misconception: 'Retailers belong to industry because they store and handle physical goods.',
      correction: 'Industry changes the physical form of goods (creating Form utility). Retailers only move and store goods (creating Place and Time utility), belonging to Commerce.',
    },
    {
      misconception: 'Non-profit organisations like Akshaya Patra cannot generate any financial surplus.',
      correction: 'NPOs can earn surplus donations over expenses, but the law strictly prohibits distributing surplus to trustees or members. All surplus must be reinvested.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary motive of a commercial activity?', options: ['Social service', 'Profit / Remuneration', 'Religious merit', 'Entertainment'], correctIndex: 1 },
    { question: 'Which statutory body governs Chartered Accountants in India?', options: ['UGC', 'ICAI under ICAI Act 1949', 'SEBI', 'Reserve Bank of India'], correctIndex: 1 },
    { question: 'Which characteristic separates business from an isolated OLX sale?', options: ['High technology', 'Regularity of transactions', 'Use of air cargo', 'Foreign trade license'], correctIndex: 1 },
    { question: 'What utility is created by a textile factory converting yarn into shirts?', options: ['Time utility', 'Form utility', 'Place utility', 'Possession utility'], correctIndex: 1 },
    { question: 'What is the maximum surplus an NGO can hold as reserve under Section 11 of Income Tax Act?', options: ['50%', '15%', '0%', '85%'], correctIndex: 1 },
    { question: 'What equation defines Commerce?', options: ['Commerce = Industry + Profit', 'Commerce = Trade + Aids to Trade', 'Commerce = Export - Import', 'Commerce = Banking + Insurance'], correctIndex: 1 },
    { question: 'Selling 500 bags of wheat to a grocery store chain is:', options: ['Retail Domestic Trade', 'Wholesale Domestic Trade', 'Foreign Entrepot', 'C2C E-commerce'], correctIndex: 1 },
    { question: 'Which transport mode is most economical for 5,000 tonnes of coal over 1,000 km?', options: ['Air transport', 'Rail transport', 'Helicopter express', 'Motorcycle courier'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands commercial vs non-commercial activities, business vs profession vs employment, industry vs commerce, and the 5 transport modes.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG LEARN-BY-DOING) ───
const EXPLORATION_STEPS = [
  {
    stepId: 0,
    title: 'Lab 1: The Profit-Motive Beam Splitter',
    instruction: 'Click on different Indian activities to send them through the Profit Motive Beam. Observe whether they divert into Commercial (Taxable) or Non-Commercial (Social / Personal).',
    interactionType: 'click-classify',
    nodeId: NODE_C9_COMMSTUD_001,
  },
  {
    stepId: 1,
    title: 'Lab 2: The Three Commercial Pillars',
    instruction: 'Select an occupation and adjust the Capital & Risk sliders to see how Business, Profession, and Employment balance across Statutory Regulation and Reward.',
    interactionType: 'slider-pillars',
    nodeId: NODE_C9_COMMSTUD_002,
  },
  {
    stepId: 2,
    title: 'Lab 3: The 6-Characteristic Business Engine',
    instruction: 'Toggle the 6 operational switches (Goods/Service, Exchange, Regularity, Profit, Risk, Capital). See when the engine turns into a Verified Business vs One-Time Sale.',
    interactionType: 'engine-toggle',
    nodeId: NODE_C9_COMMSTUD_003,
  },
  {
    stepId: 3,
    title: 'Lab 4: The Indian Supply Chain Transformation',
    instruction: 'Drag raw cotton from Gujarat farm through the Arvind Mills loom and Delhivery express truck to watch Form, Place, and Time utilities generate in real-time.',
    interactionType: 'utility-pipeline',
    nodeId: NODE_C9_COMMSTUD_004,
  },
  {
    stepId: 4,
    title: 'Lab 5: Transport Mode Optimizer',
    instruction: 'Choose a cargo type and distance. Move the cargo weight slider to see why Indian Railways, Blue Dart, or SpiceXpress wins the cost-speed balance.',
    interactionType: 'transport-optimizer',
    nodeId: NODE_C9_COMMSTUD_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an NGO receives ₹10 Crore in donations but spends only ₹6 Crore on meals, will it retain its tax-exempt status under Section 12A?',
    options: [
      'Yes — because it is registered as an NGO forever',
      'No — because it failed the 85% expenditure rule (spent only 60%)',
      'Yes — because surplus can be distributed to trustees as bonus',
      'No — because NGOs are forbidden from having any bank accounts',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 1 details: Section 11 mandates applying at least 85% of income to charitable objects!',
    nodeId: NODE_C9_COMMSTUD_006,
  },
  {
    question: 'Predict: If you transport 2,000 kg of fresh perishable Alphonso mangoes from Ratnagiri to London, which mode wins the cost-speed trade-off?',
    options: [
      'Water cargo ship (takes 28 days)',
      'Air Cargo Express (takes 10 hours)',
      'Inland railway rake (takes 12 days)',
      'Pipeline transport (takes 2 days)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 5: Perishable high-value goods over international distances require Air cargo to prevent spoilage!',
    nodeId: NODE_C9_COMMSTUD_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the Business Engine when you switch OFF "Regularity"?',
    observableOptions: [
      'It stays a business because money was received',
      'It turns into a one-time asset disposal (e.g., student selling old books on OLX)',
      'It immediately becomes a registered profession under ICAI',
      'It turns into a government ministry',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_COMMSTUD_003,
  },
  {
    question: 'Observation: Why does Tata Steel create Form Utility while Big Bazaar creates Place and Time Utility?',
    observableOptions: [
      'Because Tata Steel is in Jamshedpur and Big Bazaar is in Mumbai',
      'Tata Steel chemically/physically transforms ore into sheets; Big Bazaar stores and transports unchanged goods to consumers',
      'Because Big Bazaar charges GST while Tata Steel does not',
      'Both create the exact same Form utility',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_COMMSTUD_004,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Supply Chain Architect at NITI Aayog',
  description: 'Design a resilient commerce corridor for agricultural produce from Punjab farms to European retail shelves. Map the trade path, aids to trade, and tax compliance.',
  steps: [
    'Classify the Punjabi wheat farmer under Primary Genetic Industry.',
    'Select Rail transport (NMG rakes) from Ludhiana to JNPT Port, Mumbai to optimize bulk costs.',
    'Apply for DGFT IEC (Import Export Code) under Foreign Trade Policy 2023 for wholesale export.',
    'Ensure Marine Insurance (New India Assurance) covers transit loss against Arabian Sea monsoons.',
    'Settle B2B export billing via SWIFT banking and verify Section 12A trust partnerships for rural midday meals.',
  ],
};

function C9_CommercialStudiesCommercialNoncommercialActivitiesSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration Interactive State
  const [selectedActivityId, setSelectedActivityId] = useState<string>('amul_retail');
  const [activeOccupation, setActiveOccupation] = useState<'business' | 'profession' | 'employment'>('business');
  const [capitalSlider, setCapitalSlider] = useState<number>(80);
  const [riskSlider, setRiskSlider] = useState<number>(85);
  const [engineSwitches, setEngineSwitches] = useState<Record<string, boolean>>({
    goodsService: true,
    exchange: true,
    regularity: true,
    profitMotive: true,
    risk: true,
    capital: true,
  });
  const [pipelineStage, setPipelineStage] = useState<number>(0);
  const [selectedCargo, setSelectedCargo] = useState<'coal' | 'mangoes' | 'parcels' | 'gas'>('coal');
  const [cargoWeight, setCargoWeight] = useState<number>(5000); // in tonnes / kg
  const [transitDistance, setTransitDistance] = useState<number>(800); // in km

  // Predict & Observe State
  const [predIndex, setPredIndex] = useState<number>(-1);
  const [predSubmitted, setPredSubmitted] = useState<boolean>(false);
  const [obsIndex, setObsIndex] = useState<number>(-1);
  const [obsAnswered, setObsAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number>(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Challenge & Adaptive BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Reflection State
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explanation: '',
    application: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Interactive Drag & Drop / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback Component States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C9_COMMSTUD_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 55) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const newDiff = currentM === 'not-started' || currentM === 'beginner' ? 'foundation'
      : currentM === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── HTML5 2D CANVAS ANIMATION LOOP (CARGO TRANSIT VISUALIZATION) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let particleX = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw highway / track line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(10, 25);
      ctx.lineTo(canvas.width - 10, 25);
      ctx.stroke();

      // Draw active transit vehicle
      particleX = (particleX + 1.5) % (canvas.width - 40);
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(20 + particleX, 25, 8, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing destination node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 25, 6, 0, Math.PI * 2);
      ctx.fill();

      // Status text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Commerce In Motion • Corridor: ${transitDistance} km • Active Cargo: ${selectedCargo.toUpperCase()}`, 10, 52);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [transitDistance, selectedCargo]);

  // ─── ESCALATING HINT LOGIC ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints && challenge.hints[nextLvl - 1]) {
      const hintText = challenge.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── AUTO-INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── HANDLER: DISCOVERY ANSWER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setDiscoverySelected(idx);
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent intuition! Motive and distribution define a business.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Commerce Discovery Labs. Interact with each simulation.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all commercial variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begins! Apply your understanding to real Indian scenarios.');
  }, []);

  // ─── LAB INTERACTION HANDLERS ───
  const handleActivitySelect = useCallback((actId: string) => {
    setSelectedActivityId(actId);
    audioManager.play('tap');
  }, []);

  const handleOccupationSelect = useCallback((occ: 'business' | 'profession' | 'employment') => {
    setActiveOccupation(occ);
    audioManager.play('tap');
    if (occ === 'business') {
      setCapitalSlider(90);
      setRiskSlider(90);
    } else if (occ === 'profession') {
      setCapitalSlider(45);
      setRiskSlider(40);
    } else {
      setCapitalSlider(0);
      setRiskSlider(0);
    }
  }, []);

  const handleEngineToggle = useCallback((key: string) => {
    audioManager.play('pop');
    setEngineSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handlePipelineStep = useCallback((stepIdx: number) => {
    setPipelineStage(stepIdx);
    audioManager.play('count');
  }, []);

  const handleCargoChange = useCallback((cargo: 'coal' | 'mangoes' | 'parcels' | 'gas') => {
    setSelectedCargo(cargo);
    audioManager.play('tap');
    if (cargo === 'coal') {
      setCargoWeight(5000);
      setTransitDistance(900);
    } else if (cargo === 'mangoes') {
      setCargoWeight(500);
      setTransitDistance(4500);
    } else if (cargo === 'parcels') {
      setCargoWeight(15);
      setTransitDistance(350);
    } else {
      setCargoWeight(2000);
      setTransitDistance(1500);
    }
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePredictionSelect = useCallback((idx: number) => {
    setPredIndex(idx);
    setPredSubmitted(true);
    const isCorr = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'tap');
    speechManager.speak(isCorr ? 'Prediction confirmed!' : 'Interesting hypothesis. Let us test it in the model.');
  }, []);

  const handleObservationSelect = useCallback((idx: number) => {
    setObsIndex(idx);
    setObsAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Sharp economic observation!' : 'Look closer at the physical transformation of the goods.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`mastery_${nodeId || NODE_C9_COMMSTUD_001}`, JSON.stringify({
        score: finalScore,
        date: new Date().toISOString(),
        nodes: ALL_NODE_IDS,
      }));
    }
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with a score of ${finalScore} percent.`);
  }, [errors, nodeId, onComplete]);

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

  // ─── MAIN ANSWER SUBMISSION HANDLER ───
  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant understanding.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete statutory explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG & DROP EVENT HANDLERS ───
  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let base = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
      const [item] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, item);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── COMPUTED DERIVED STATES ───
  const isAllEngineTrue = useMemo(() => {
    return Object.values(engineSwitches).every(v => v === true);
  }, [engineSwitches]);

  const transportRecommendation = useMemo(() => {
    if (selectedCargo === 'gas') {
      return { mode: 'Pipeline (e.g. GAIL HVJ)', reason: 'Continuous fluid flow with zero road congestion & low operating cost.' };
    }
    if (selectedCargo === 'mangoes') {
      return { mode: 'Air Cargo Express (e.g. SpiceXpress)', reason: 'Rapid delivery under 24 hrs prevents perishable decay over international routes.' };
    }
    if (selectedCargo === 'coal' || cargoWeight >= 1000) {
      return { mode: 'Rail Freight (Indian Railways)', reason: 'Unbeatable low cost per tonne-km for heavy bulk commodities.' };
    }
    return { mode: 'Road Logistics (e.g. Blue Dart / Tata Ace)', reason: 'Door-to-door flexibility and rapid transit for small parcels.' };
  }, [selectedCargo, cargoWeight]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="p-3 bg-indigo-900/40 rounded-2xl border border-indigo-500/30 text-2xl">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800">
                ICSE Class 9 Commercial Studies
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                    : 'bg-rose-950/80 text-rose-300 border-rose-700'
                }`}
              >
                TIER: {difficulty.toUpperCase()}
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase Indicator */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p, idx) => (
            <div key={p} className="flex items-center gap-1.5">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-xs font-bold uppercase px-2 py-1 rounded-lg transition-all ${
                  phase === p
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p}
              </motion.span>
              {idx < 4 && <span className="text-slate-700">→</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <motion.div whileHover={{ scale: 1.005 }} className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/40 shadow-inner">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/80 mt-2 bg-indigo-900/30 p-2.5 rounded-xl border border-indigo-800/40">
              💡 <strong>Consultant Brief:</strong> {SCENARIO.context}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-amber-300 mb-3 flex items-center gap-2">
              <span>❓</span> Discovery Hook: What Do You Think?
            </h3>
            <p className="text-white text-base mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : i === discoverySelected
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-850 border border-slate-700">
                <p className={discoveryCorrect ? 'text-emerald-400 font-semibold text-sm' : 'text-amber-400 font-medium text-sm'}>
                  {discoveryCorrect
                    ? '✓ Spot on! The non-distribution of profit rule makes Akshaya Patra a non-profit trust under Section 12A.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress Tabs */}
          <div className="grid grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((s, idx) => (
              <motion.button
                key={s.stepId}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </motion.span>
                <h3 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-slate-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: PROFIT MOTIVE BEAM SPLITTER ─── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'amul_retail', label: 'Amul Milk Sale (₹58)', type: 'commercial', sub: 'Business Profit' },
                      { id: 'mom_cooking', label: 'Mother Cooking Dinner', type: 'non-comm-personal', sub: 'Love / Duty (Non-Econ)' },
                      { id: 'tcs_engineer', label: 'TCS Software Engineer', type: 'commercial', sub: 'Employment Salary' },
                      { id: 'akshaya_patra', label: 'Akshaya Patra Mid-Day Meals', type: 'non-comm-social', sub: 'Charitable Trust (Sec 12A)' },
                    ].map(act => (
                      <motion.button
                        key={act.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleActivitySelect(act.id)}
                        className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                          selectedActivityId === act.id
                            ? 'bg-indigo-900/60 border-indigo-400 text-white ring-2 ring-indigo-500/40'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <div className="font-bold text-sm text-white">{act.label}</div>
                        <div className="text-indigo-300 mt-0.5">{act.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Beam Visualization */}
                  <motion.div whileHover={{ scale: 1.005 }} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      <rect x="20" y="95" width="140" height="50" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                      <text x="90" y="125" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Human Activity
                      </text>

                      <polygon points="220,50 300,120 220,190" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                      <text x="245" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Profit Motive?
                      </text>

                      <path
                        d={
                          selectedActivityId === 'amul_retail' || selectedActivityId === 'tcs_engineer'
                            ? 'M 300 120 L 420 50'
                            : 'M 300 120 L 420 190'
                        }
                        stroke={selectedActivityId === 'amul_retail' || selectedActivityId === 'tcs_engineer' ? '#22c55e' : '#f59e0b'}
                        strokeWidth="4"
                        strokeDasharray="6 4"
                      />

                      <g opacity={selectedActivityId === 'amul_retail' || selectedActivityId === 'tcs_engineer' ? 1 : 0.4}>
                        <rect x="420" y="25" width="160" height="55" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="500" y="48" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                          COMMERCIAL
                        </text>
                        <text x="500" y="65" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                          Taxable (Sec 28 / Sec 15)
                        </text>
                      </g>

                      <g opacity={selectedActivityId === 'mom_cooking' || selectedActivityId === 'akshaya_patra' ? 1 : 0.4}>
                        <rect x="420" y="160" width="160" height="55" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                        <text x="500" y="183" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">
                          NON-COMMERCIAL
                        </text>
                        <text x="500" y="200" fill="#fcd34d" fontSize="10" textAnchor="middle">
                          Personal or Sec 12A Exempt
                        </text>
                      </g>
                    </svg>

                    <div className="mt-3 text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                      <strong>Analysis:</strong>{' '}
                      {selectedActivityId === 'amul_retail' && 'Amul butter sale at Kirana is a commercial business activity; markup creates profit.'}
                      {selectedActivityId === 'mom_cooking' && 'Mother cooking dinner is a personal non-economic activity done out of love; no monetary exchange.'}
                      {selectedActivityId === 'tcs_engineer' && 'Software engineer is employed on salary; commercial activity offering mental labor for remuneration.'}
                      {selectedActivityId === 'akshaya_patra' && 'Akshaya Patra feeds school children; economic & registered as Section 12A trust, surplus cannot be distributed.'}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── LAB 2: THREE PILLARS ─── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex gap-2">
                    {(['business', 'profession', 'employment'] as const).map(occ => (
                      <motion.button
                        key={occ}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOccupationSelect(occ)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm uppercase transition-all border ${
                          activeOccupation === occ
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {occ}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <motion.div whileHover={{ y: -2 }} className="space-y-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">1. Primary Reward</div>
                      <div className="text-base font-black text-emerald-400">
                        {activeOccupation === 'business' && 'PROFIT (Variable)'}
                        {activeOccupation === 'profession' && 'PROFESSIONAL FEES (Per service)'}
                        {activeOccupation === 'employment' && 'SALARY (Fixed monthly)'}
                      </div>
                      <p className="text-xs text-slate-400">
                        {activeOccupation === 'business' && 'Surplus of sales revenue over production/trade costs.'}
                        {activeOccupation === 'profession' && 'Charged directly to clients for expert advisory & audit.'}
                        {activeOccupation === 'employment' && 'Contractual remuneration under employer-employee agreement.'}
                      </p>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="space-y-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">2. Statutory Regulation</div>
                      <div className="text-base font-black text-indigo-400">
                        {activeOccupation === 'business' && 'Shops & Estab. / Trade Lic.'}
                        {activeOccupation === 'profession' && 'ICAI / Bar Council / NMC'}
                        {activeOccupation === 'employment' && 'Contract of Service'}
                      </div>
                      <p className="text-xs text-slate-400">
                        {activeOccupation === 'business' && 'General municipal licensing; open entry without statutory body.'}
                        {activeOccupation === 'profession' && 'Mandatory statutory degree & membership under Act of Parliament.'}
                        {activeOccupation === 'employment' && 'Job-specific qualification determined entirely by employer.'}
                      </p>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="space-y-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">3. Capital & Risk Gauge</div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Capital: {capitalSlider}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                          <motion.div className="h-full bg-amber-500 rounded-full" animate={{ width: `${capitalSlider}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Risk: {riskSlider}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                          <motion.div className="h-full bg-rose-500 rounded-full" animate={{ width: `${riskSlider}%` }} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 3: 6-CHARACTERISTIC BUSINESS ENGINE ─── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!obsAnswered && (
                    <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-3 bg-indigo-950/70 border border-indigo-700/60 rounded-xl">
                      <p className="text-xs font-bold text-indigo-300">Observation Checkpoint:</p>
                      <p className="text-sm text-slate-200 mt-1">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservationSelect(i)}
                            className="text-left text-xs p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: 'goodsService', label: '1. Goods / Services', desc: 'Tangible products or intangible services' },
                      { key: 'exchange', label: '2. Sale / Exchange', desc: 'Transferred for monetary consideration' },
                      { key: 'regularity', label: '3. Regularity', desc: 'Continuous repeated transactions' },
                      { key: 'profitMotive', label: '4. Profit Motive', desc: 'Primary intention to earn economic surplus' },
                      { key: 'risk', label: '5. Element of Risk', desc: 'Uncertainty of future demand/loss' },
                      { key: 'capital', label: '6. Capital Investment', desc: 'Funds deployed in premises/stock' },
                    ].map(sw => (
                      <motion.button
                        key={sw.key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleEngineToggle(sw.key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          engineSwitches[sw.key]
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-800 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>{sw.label}</span>
                          <span>{engineSwitches[sw.key] ? '✓ ON' : '✗ OFF'}</span>
                        </div>
                        <div className="text-xs mt-1 text-slate-400">{sw.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    animate={{ scale: isAllEngineTrue ? [1, 1.02, 1] : 1 }}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      isAllEngineTrue
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-amber-950/70 border-amber-600 text-amber-200'
                    }`}
                  >
                    <div className="text-lg font-black">
                      {isAllEngineTrue ? '⚡ VERIFIED BUSINESS ACTIVITY (e.g. D-Mart / Amul)' : '⚠️ DISQUALIFIED AS BUSINESS'}
                    </div>
                    <p className="text-xs mt-1">
                      {isAllEngineTrue
                        ? 'All 6 cumulative criteria satisfied. The activity qualifies under Section 2(17) Income Tax Act.'
                        : 'If any single characteristic is missing (e.g. Regularity missing = OLX one-time sale; Sale missing = Akshaya Patra free meals), it cannot be classified as a commercial business.'}
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── LAB 4: SUPPLY CHAIN UTILITY TRANSFORMATION ─── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!predSubmitted && (
                    <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-3 bg-amber-950/60 border border-amber-700/60 rounded-xl">
                      <p className="text-xs font-bold text-amber-300">Predict-Then-Check Checkpoint:</p>
                      <p className="text-sm text-slate-200 mt-1">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePredictionSelect(i)}
                            className="text-left text-xs p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { idx: 0, title: 'Primary (Farming)', comp: 'Gujarat Cotton Farm', util: 'Raw Material Extraction' },
                      { idx: 1, title: 'Secondary (Industry)', comp: 'Arvind Mills Factory', util: 'Form Utility (Fabric & Jeans)' },
                      { idx: 2, title: 'Commerce (Trade & Aids)', comp: 'Delhivery & Flipkart', util: 'Place & Time Utility' },
                    ].map(step => (
                      <motion.button
                        key={step.idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePipelineStep(step.idx)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          pipelineStage === step.idx
                            ? 'bg-indigo-900 border-indigo-400 text-white ring-2 ring-indigo-500/50'
                            : 'bg-slate-800/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase text-indigo-400">{step.title}</div>
                        <div className="text-sm font-bold text-white mt-1">{step.comp}</div>
                        <div className="text-xs text-emerald-400 mt-0.5">{step.util}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 160" className="w-full h-auto">
                      <circle cx="90" cy="80" r="40" fill={pipelineStage >= 0 ? '#10b981' : '#334155'} />
                      <text x="90" y="85" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        1. Raw Cotton
                      </text>
                      <line x1="130" y1="80" x2="250" y2="80" stroke="#4f46e5" strokeWidth="3" />
                      <circle cx="300" cy="80" r="40" fill={pipelineStage >= 1 ? '#6366f1' : '#334155'} />
                      <text x="300" y="85" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        2. Denim Mill
                      </text>
                      <line x1="340" y1="80" x2="460" y2="80" stroke="#4f46e5" strokeWidth="3" />
                      <circle cx="510" cy="80" r="40" fill={pipelineStage >= 2 ? '#ec4899' : '#334155'} />
                      <text x="510" y="85" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        3. Flipkart Retail
                      </text>
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 5: TRANSPORT MODE OPTIMIZER ─── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'coal' as const, label: 'Coal (5,000 Tonnes)', dist: 900 },
                      { id: 'mangoes' as const, label: 'Alphonso Mangoes (500 kg)', dist: 4500 },
                      { id: 'parcels' as const, label: 'E-commerce Parcel (15 kg)', dist: 350 },
                      { id: 'gas' as const, label: 'Natural Gas (1,500 km)', dist: 1500 },
                    ].map(c => (
                      <motion.button
                        key={c.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleCargoChange(c.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          selectedCargo === c.id
                            ? 'bg-indigo-900 border-indigo-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {c.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 font-bold">Transit Distance: {transitDistance} km</label>
                      <input
                        type="range"
                        min={50}
                        max={5000}
                        step={50}
                        value={transitDistance}
                        onChange={e => setTransitDistance(Number(e.target.value))}
                        className="w-full accent-indigo-500 mt-2"
                        aria-label="Set transit distance"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-bold">Consignment Mass / Quantity: {cargoWeight}</label>
                      <input
                        type="range"
                        min={5}
                        max={10000}
                        step={50}
                        value={cargoWeight}
                        onChange={e => setCargoWeight(Number(e.target.value))}
                        className="w-full accent-emerald-500 mt-2"
                        aria-label="Set cargo mass"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700">
                    <div className="text-xs font-bold uppercase text-indigo-300">Optimal Mode Selected:</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">{transportRecommendation.mode}</div>
                    <div className="text-xs text-slate-300 mt-1">{transportRecommendation.reason}</div>
                  </motion.div>
                </motion.div>
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
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-bold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-indigo-300">Interactive Commercial Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust cargo, distance, and switches freely. The 2D canvas corridor runs real-time simulations below.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <canvas ref={canvasRef} width={600} height={60} className="w-full h-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {(['coal', 'mangoes', 'parcels', 'gas'] as const).map(c => (
                <motion.button
                  key={c}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCargoChange(c)}
                  className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                    selectedCargo === c ? 'bg-indigo-900 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.01 }} className="p-4 mt-4 bg-slate-850 rounded-xl border border-slate-800 text-xs text-slate-300">
              💡 <strong>Observation Note:</strong> Notice how freight mass directly dictates whether Railways or Air cargo delivers the lower cost per tonne-kilometre. When you feel confident, proceed to the challenge phase!
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT + NEP 2020 COMPETENCY) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress & Tier Bar */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </div>
            <div className="flex items-center gap-2">
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-700">
                Competency: {challenge.competencyLevel}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-700">
                Tier: {challenge.difficulty}
              </motion.span>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{challenge.nodeId}</span>
            <p className="text-base md:text-lg font-bold text-white mt-1 leading-relaxed">{challenge.question}</p>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                      role="button"
                      aria-label={`Drag item: ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['box_business', 'box_profession', 'box_employment'].map(boxId => (
                    <motion.div
                      key={boxId}
                      whileHover={{ borderColor: '#6366f1' }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(boxId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                    >
                      <div className="text-xs font-bold text-slate-400 uppercase">
                        Target: {boxId.replace('box_', '')}
                      </div>
                      <div className="text-sm font-bold text-emerald-400">
                        {droppedLabels[boxId] ? `✓ ${droppedLabels[boxId]}` : 'Drop label here'}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromI = parseInt(draggedItem || '0');
                      handleSortMove(fromI, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm flex items-center justify-between cursor-grab"
                    role="button"
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                  >
                    <span>
                      <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">⇅ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculation"
                    className="px-4 py-2.5 bg-slate-850 border border-slate-700 rounded-xl text-white font-bold text-sm w-48 focus:border-indigo-500 outline-none"
                    aria-label="Enter numeric calculation"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Verify Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-700 rounded-lg text-xs font-bold text-indigo-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={i} className="px-3 py-1 bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-white"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble equation...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Validate Equation
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <div className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  Step-by-Step Statutory Breakdown:
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & CAPSTONE PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Commercial Studies Mastery Unlocked!</h2>
            <p className="text-sm text-slate-300">
              Final Composite Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong> • Adaptive Tier:{' '}
              <strong className="text-indigo-400 uppercase">{difficulty}</strong>
            </p>
          </motion.div>

          {/* Motivational Feedback */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-5 bg-emerald-950/60 border border-emerald-700 rounded-2xl">
            <h3 className="text-sm font-bold text-emerald-300">Performance Assessment:</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You possess complete mastery of Commercial Activities, Statutory Distinctions (Sec 12A vs Sec 28), and Logistics Optimization.'
                : errors <= 3
                ? 'EXEMPLARY PERFORMANCE! High conceptual clarity across business characteristics, occupational pillars, and utility generation.'
                : 'COMMENDABLE EFFORT! Review your targeted misconception profile below to reinforce tricky regulatory boundaries.'}
            </p>
          </motion.div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/50 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Identified Conceptual Gaps (For Review):</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <motion.div whileHover={{ x: 3 }} key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-bold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300 font-medium mt-1">✓ Correction: {item.correction}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Spaced Repetition Notification */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-4 bg-amber-950/50 border border-amber-800 rounded-xl text-xs text-slate-300">
            📅 <strong>SM-2 Spaced Repetition Schedule:</strong> Based on performance evidence, your next memory reinforcement review is scheduled in{' '}
            <strong className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
          </motion.div>

          {/* Capstone Activity */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-5 bg-indigo-950/60 border border-indigo-800 rounded-2xl space-y-3">
            <h3 className="text-base font-bold text-indigo-300">🏛️ Capstone: {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <motion.div whileHover={{ x: 2 }} key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{st}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── REFLECTION SECTION ─── */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💭</span>
              <div>
                <h3 className="text-lg font-black text-white">Post-Simulation Reflection</h3>
                <p className="text-xs text-slate-400">Deepen your conceptual mastery with these three closing reflections.</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.005 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. Learning that Akshaya Patra can generate surplus donations, but the statutory non-distribution rule keeps it charitable..."
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.005 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.explanation}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="e.g. Industry creates Form utility by transforming goods, whereas Commerce bridges distance and time via trade + aids to trade..."
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.005 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.application}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, application: e.target.value }))}
                  placeholder="e.g. Choosing between rail and air freight when running an export startup or structuring a non-profit trust..."
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </motion.div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('drop-correct');
                  speechManager.speak('Reflection recorded successfully.');
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
              >
                {reflectionSubmitted ? '✓ Reflection Saved' : 'Save Reflection Responses'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Phase Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_CommercialStudiesCommercialNoncommercialActivitiesSim;