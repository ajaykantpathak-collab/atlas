'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// ─── ISC COMMERCE NODE IDENTIFIERS ───
const NODE_C11_COMM_041 = 'c11_comm_041';
const NODE_C11_COMM_042 = 'c11_comm_042';
const NODE_C11_COMM_043 = 'c11_comm_043';
const NODE_C11_COMM_044 = 'c11_comm_044';
const NODE_C11_COMM_045 = 'c11_comm_045';
const NODE_C11_COMM_046 = 'c11_comm_046';
const NODE_C11_COMM_047 = 'c11_comm_047';
const NODE_C11_COMM_048 = 'c11_comm_048';
const NODE_C11_COMM_049 = 'c11_comm_049';
const NODE_C11_COMM_050 = 'c11_comm_050';

const ALL_NODE_IDS = [
  NODE_C11_COMM_041,
  NODE_C11_COMM_042,
  NODE_C11_COMM_043,
  NODE_C11_COMM_044,
  NODE_C11_COMM_045,
  NODE_C11_COMM_046,
  NODE_C11_COMM_047,
  NODE_C11_COMM_048,
  NODE_C11_COMM_049,
  NODE_C11_COMM_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Trade Nexus: From Kirana to Global Shipping',
  intro: 'Welcome to the Trade Directorate! You are managing a multi-tier Indian commercial enterprise, handling local street hawkers, Shoppers Stop departmental stores, Bata chain networks, and multi-crore international export shipments from JNPT to Rotterdam.',
  context: 'Master the mechanics of retail channels, discount accounting (Trade vs Cash), domestic trade documentation (Inquiry to Invoice, Debit/Credit Notes), and international trade pipelines (IEC, L/C, Shipping Bill, Bill of Lading, Certificate of Origin).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An Indian garment exporter in Tirupur ships 50,000 cotton T-shirts to Walmart USA. Who issues the Letter of Credit (L/C) that guarantees payment to the Indian exporter?',
  options: [
    'The Indian exporter’s bank in Tirupur (SBI)',
    'The foreign importer’s bank in New York (Citibank)',
    'The Directorate General of Foreign Trade (DGFT)',
    'The Shipping Line operating the container vessel (Maersk)',
  ],
  correctIndex: 1,
  hintAfter: 'A Letter of Credit is issued by the IMPORTER’S bank, substituting the bank’s credit for the foreign buyer’s credit! Let us explore the complete trade framework.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: c11_comm_041 (Itinerant vs Fixed)
  {
    id: 'ch_01_itinerant_test',
    nodeId: NODE_C11_COMM_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Imtiaz sets up a temporary crockery stall every Saturday at the Bandra haat in Mumbai, moving to other weekly markets on weekdays. Why is Imtiaz classified as an itinerant retailer and not a fixed shop?',
    options: [
      'Because he sells low-value crockery rather than branded electronics',
      'Because he lacks a permanent, year-round premises and moves between periodic haats',
      'Because he has not registered under the Companies Act 2013',
      'Because he accepts cash only and does not issue a tax invoice',
    ],
    correctIndex: 1,
    explanation: 'The test of a fixed shop is permanence and continuity of location throughout the year. A weekly haat trader operates from a temporary stall and moves to other markets, making him a market trader (an itinerant sub-type).',
    hints: [
      'Think about whether the physical structure remains open every working day all year.',
      'Recurrence at the same spot once a week is not the same as a year-round permanent shop.',
      'Itinerant means mobile; the test is permanent premises, not just returning to a weekly spot.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: c11_comm_042 (Departmental vs Chain)
  {
    id: 'ch_02_dept_vs_chain',
    nodeId: NODE_C11_COMM_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does Shoppers Stop (departmental store) fundamentally differ from Bata India (chain store network)?',
    options: [
      'Shoppers Stop sells one narrow line across 1,800 outlets; Bata sells many categories under one roof',
      'Shoppers Stop offers breadth (many unrelated categories under one roof); Bata offers depth (one line replicated across many identical stores)',
      'Shoppers Stop is an unorganised retailer; Bata is a government-owned enterprise',
      'Shoppers Stop uses automatic vending machines; Bata operates exclusively via e-commerce',
    ],
    correctIndex: 1,
    explanation: 'Departmental stores aggregate many distinct product departments under one roof (breadth), whereas chain stores replicate identical single-line outlets nationwide (depth in one line).',
    hints: [
      'Consider what you find when you walk into Shoppers Stop versus walking into Bata.',
      'Departmental stores offer one-stop shopping across apparel, cosmetics, and luggage.',
      'Chain stores specialize in a single product line like footwear across hundreds of locations.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: c11_comm_043 (Home Trade Sequence)
  {
    id: 'ch_03_home_docs_sort',
    nodeId: NODE_C11_COMM_043,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the five core documents of domestic home trade in their strict chronological order.',
    sortItems: ['Inquiry (Buyer asks)', 'Quotation (Seller offers)', 'Catalogue (Seller showcases range)', 'Order / Purchase Order (Buyer accepts)', 'Tax Invoice (Seller bills on dispatch)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The domestic transaction begins with the buyer’s Inquiry, followed by the seller’s Quotation and Catalogue, accepted by the buyer’s Purchase Order, culminating in the seller’s Tax Invoice upon dispatch.',
    hints: [
      'The buyer asks first before knowing the price.',
      'The seller provides the price offer (quotation) and product list (catalogue) before the buyer orders.',
      'The invoice is issued at the very end when goods are dispatched.',
    ],
  },
  // 4. Foundation: c11_comm_044 (Debit vs Credit Note)
  {
    id: 'ch_04_debit_credit_rule',
    nodeId: NODE_C11_COMM_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Surat retailer returns 50 defective Raymond shirts to the wholesaler. Which note does the retailer send, and why is it so named?',
    options: [
      'Credit Note — because the buyer credits his own bank account',
      'Debit Note — because the buyer debits the seller’s account in the buyer’s own ledger',
      'Invoice Note — because it cancels the previous GST bill',
      'Bill of Entry — because the goods are re-entering Surat city',
    ],
    correctIndex: 1,
    explanation: 'The note is named after the entry in the SENDER’s books. The buyer sends the note and debits the seller’s account (Wholesaler A/c Dr), reducing the payable. Hence it is a Debit Note.',
    hints: [
      'Remember the golden rule: the note is named after the entry made in the SENDER’s ledger.',
      'The buyer sends the note to reduce what he owes the seller.',
      'Debiting a creditor (seller) reduces the liability in the buyer’s books.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation: c11_comm_045 (Trade vs Cash Discount Definition)
  {
    id: 'ch_05_discount_distinction',
    nodeId: NODE_C11_COMM_045,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following statements correctly states the book-keeping and GST treatment of Trade Discount versus Cash Discount?',
    options: [
      'Trade discount is recorded in ledger books; Cash discount is excluded from GST',
      'Trade discount is deducted on the invoice and not recorded separately in ledger books; Cash discount is recorded in books (Discount Allowed/Received) and does not reduce GST taxable value',
      'Both discounts are recorded as operational expenses in the profit and loss account',
      'Cash discount is calculated on List Price; Trade discount is calculated on Invoice Price',
    ],
    correctIndex: 1,
    explanation: 'Trade discount is deducted before recording the sale and is excluded from GST (Section 15(3) CGST Act). Cash discount is an incentive for prompt payment recorded in books but does not reduce the already assessed GST taxable value.',
    hints: [
      'Which discount is deducted before the invoice price is established?',
      'Trade discount never appears as a separate ledger account in accounting books.',
      'Cash discount is a financial settlement adjustment recorded after supply has occurred.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation: c11_comm_046 (Internal vs International Trade)
  {
    id: 'ch_06_boundary_principle',
    nodeId: NODE_C11_COMM_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Mumbai manufacturer sells to a merchant in Sunauli (India-Nepal border, 1,500 km away) vs selling across the border in Bhairahawa, Nepal (10 km away). What makes the Nepal sale international trade?',
    options: [
      'The sheer distance transported in kilometres',
      'The crossing of a sovereign political boundary separating currencies, legal systems, and customs regimes',
      'The mode of transport shifting from road to maritime shipping',
      'The fact that goods sold to Nepal are automatically exempt from all inspections',
    ],
    correctIndex: 1,
    explanation: 'The defining criterion of international trade is the crossing of a sovereign political boundary, which triggers foreign exchange conversion, customs clearance, and foreign legal jurisdictions, regardless of distance.',
    hints: [
      'Is distance the cause or just a symptom?',
      'Consider what happens to currency and laws when stepping across the border line.',
      'Political boundaries separate legal jurisdictions and currency regimes.',
    ],
  },
  // 7. Foundation: c11_comm_049 (Indent & Shipping Order)
  {
    id: 'ch_07_export_doc_match',
    nodeId: NODE_C11_COMM_049,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the export document to its issuing authority: (1) Indent, (2) Shipping Order, (3) Shipping Bill.',
    options: [
      '1-Shipping Line, 2-Importer, 3-Customs Officer',
      '1-Importer (buyer), 2-Shipping Line (carrier), 3-Exporter (filed with Customs)',
      '1-Exporter, 2-DGFT, 3-Port Trust',
      '1-Advising Bank, 2-Issuing Bank, 3-Export Inspection Council',
    ],
    correctIndex: 1,
    explanation: 'The Indent is issued by the foreign importer; the Shipping Order is issued by the shipping line reserving cargo space; the Shipping Bill is filed by the exporter with Customs via ICEGATE.',
    hints: [
      'Who places the initial foreign purchase order?',
      'Who owns the ship and reserves container slots?',
      'Who files the statutory declaration to get customs clearance?',
    ],
  },
  // 8. Standard: c11_comm_041 (Street Vendors Act & PM SVANidhi)
  {
    id: 'ch_08_svanidhi_legal',
    nodeId: NODE_C11_COMM_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Lakshmi sells idli-sambar from a mobile cart near MG Road Metro, Bengaluru. Under what legal framework is her vending protected, and what credit facility was created for her sector?',
    options: [
      'Companies Act 2013; Startup India Seed Fund',
      'Street Vendors (Protection of Livelihood and Regulation) Act 2014; PM SVANidhi scheme (collateral-free working capital)',
      'State Shops and Establishments Act; SEBI Retail Framework',
      'Consumer Protection Act 2019; Mudra Tarun Loan only',
    ],
    correctIndex: 1,
    explanation: 'Under Section 13 of the Street Vendors Act 2014, Town Vending Committees issue ID cards to street vendors. The PM SVANidhi scheme provides collateral-free working capital loans of up to ₹10,000 for itinerant vendors.',
    hints: [
      'Which central Act enacted in 2014 protects urban street vendors in designated zones?',
      'Look for the scheme launched on June 1, 2020 specifically for Street Vendor AtmaNirbhar Nidhi.',
      'Town Vending Committees issue vending certificates under this 2014 law.',
    ],
  },
  // 9. Standard: c11_comm_042 (Shopping Mall vs Departmental Store)
  {
    id: 'ch_09_mall_vs_dept',
    nodeId: NODE_C11_COMM_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Phoenix Mall in Mumbai NOT a departmental store, while Shoppers Stop located inside it IS a departmental store?',
    options: [
      'Phoenix Mall is larger than Shoppers Stop in square footage',
      'Phoenix Mall is a multi-tenant real estate property housing separate independent businesses; Shoppers Stop is a single unified business with internal departments and centralized billing',
      'Phoenix Mall is government-owned while Shoppers Stop is a private enterprise',
      'Shoppers Stop only operates online while Phoenix Mall is brick-and-mortar',
    ],
    correctIndex: 1,
    explanation: 'A mall is a landlord renting space to separate legal entities. A departmental store is a single corporate entity (Shoppers Stop Ltd.) operating multiple departments under unified management and billing.',
    hints: [
      'Apply the "tenant vs department" test.',
      'Do Zara, McDonald\'s, and Hamleys in a mall share a single billing counter and cash register?',
      'Shoppers Stop runs its own internal apparel, cosmetics, and accessories departments as one company.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard: c11_comm_045 (Two-Step Discount Math)
  {
    id: 'ch_10_discount_numeric',
    nodeId: NODE_C11_COMM_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints quotes a list price of ₹4,000 per litre for Royale Emulsion. It offers a 40% Trade Discount and a 2% Cash Discount for payment within 10 days. A dealer orders 10 litres and pays on Day 5. What is the net amount payable before GST?',
    correctAnswer: 23520,
    tolerance: 10,
    unit: '₹',
    explanation: 'List Price = 10 × ₹4,000 = ₹40,000. Trade Discount (40%) = ₹16,000. Invoice Price = ₹24,000. Cash Discount = 2% of ₹24,000 (Invoice Price) = ₹480. Net Payable = ₹24,000 − ₹480 = ₹23,520.',
    hints: [
      'Step 1: Calculate Total List Price (10 × 4000 = 40,000).',
      'Step 2: Deduct 40% Trade Discount to find Invoice Price (40,000 − 16,000 = 24,000).',
      'Step 3: Calculate 2% Cash Discount on the INVOICE PRICE (2% of 24,000 = 480), then subtract.',
    ],
    misconceptionIndex: 3,
  },
  // 11. Standard: c11_comm_044 (GST Rule 37 & Credit Notes)
  {
    id: 'ch_11_gst_credit_scenario',
    nodeId: NODE_C11_COMM_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Mumbai distributor overcharges a Pune dealer by ₹20,000 plus 18% GST on an invoice. The dealer issues a debit note. What statutory action must the distributor take under GST Rule 37, and what happens to Input Tax Credit (ITC)?',
    options: [
      'Distributor destroys the old invoice and issues a cash memo; ITC remains untouched',
      'Distributor issues a Credit Note matching the debit note; dealer proportionately reverses ₹3,600 of claimed ITC in GSTR-2B',
      'Dealer files a police complaint under Consumer Protection Act',
      'Distributor pays a 100% fine directly to RBI without issuing any note',
    ],
    correctIndex: 1,
    explanation: 'Under CGST Rules Rule 37, the supplier issues a Credit Note reflecting the overcharge reduction, and the recipient must proportionately reverse the Input Tax Credit (18% of ₹20,000 = ₹3,600) to prevent tax mismatch on the GST portal.',
    hints: [
      'When an invoice value decreases, what must happen to the tax credit the buyer originally claimed?',
      'The seller issues a credit note to lower the taxable value and tax liability.',
      'The buyer reverses the corresponding Input Tax Credit on the GST portal.',
    ],
  },
  // 12. Standard: c11_comm_047 (Export 12-Step Pipeline)
  {
    id: 'ch_12_export_steps_sort',
    nodeId: NODE_C11_COMM_047,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these critical stages of the Indian Export Procedure in their mandatory legal sequence.',
    sortItems: [
      'Receipt of Indent & Opening of L/C by Buyer’s Bank',
      'Arranging Pre-Shipment Working Capital Finance',
      'Pre-Shipment Quality Inspection & Excise/GST Clearance',
      'Customs Clearance at Port (Filing Shipping Bill & Let-Export Order)',
      'Shipment of Cargo (Mate’s Receipt & Bill of Lading Issued)',
      'Negotiation of Shipping Documents & Payment Realisation',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Payment guarantee (L/C) precedes production funding (Pre-shipment finance), followed by inspection/tax clearance, customs let-export order, physical ship loading, and final bank document negotiation.',
    hints: [
      'The exporter requires payment security (L/C) before seeking bank production finance.',
      'Customs must inspect and clear goods at the port before the shipping line is allowed to load.',
      'Document negotiation with the bank occurs after obtaining the Bill of Lading from the carrier.',
    ],
  },
  // 13. Standard: c11_comm_048 (Import Procedure & Bill of Entry)
  {
    id: 'ch_13_import_bill_entry',
    nodeId: NODE_C11_COMM_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the exact distinction between a "Bill of Entry" and a "Bill of Lading" in an import transaction?',
    options: [
      'Bill of Entry is issued by the captain; Bill of Lading is filed with the Income Tax department',
      'Bill of Entry is a customs declaration filed by the importer under Section 46 Customs Act for duty assessment; Bill of Lading is a transport document and title deed issued by the shipping line',
      'Bill of Entry is only used for air cargo; Bill of Lading is only used for railway freight',
      'They are identical documents issued in duplicate by DGFT',
    ],
    correctIndex: 1,
    explanation: 'A Bill of Entry is a statutory customs document filed by the importer to assess import duties. A Bill of Lading is a maritime transport document and document of title issued by the shipping line acknowledging goods on board.',
    hints: [
      'One document is filed with Customs at the seaport/airport.',
      'The other document is given by the shipping carrier as a receipt and document of title.',
      'Remember: Bill of Entry = Customs duty calculation; Bill of Lading = Transport and ownership title.',
    ],
    misconceptionIndex: 4,
  },
  // 14. Standard: c11_comm_050 (Mate\'s Receipt to Bill of Lading)
  {
    id: 'ch_14_mates_receipt_conversion',
    nodeId: NODE_C11_COMM_050,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the correct export document labels to their corresponding operational roles at the port of departure.',
    dragItems: [
      { label: "Mate's Receipt", targetId: 'port_captain' },
      { label: 'Bill of Lading', targetId: 'shipping_office' },
      { label: 'Certificate of Origin', targetId: 'chamber_commerce' },
      { label: 'Consular Invoice', targetId: 'foreign_consulate' },
    ],
    correctMapping: {
      port_captain: "Mate's Receipt",
      shipping_office: 'Bill of Lading',
      chamber_commerce: 'Certificate of Origin',
      foreign_consulate: 'Consular Invoice',
    },
    explanation: 'The vessel captain issues a provisional Mate’s Receipt upon loading; the shipping office exchanges it for a formal Bill of Lading; the Chamber of Commerce (FIEO) issues the Certificate of Origin; the foreign consulate stamps the Consular Invoice.',
    hints: [
      'The ship\'s chief officer (mate) issues the immediate receipt on deck.',
      'The shipping line office exchanges that receipt for the title deed.',
      'Chambers of Commerce certify where goods were manufactured.',
      'Consulates of importing nations verify invoice valuation.',
    ],
  },
  // 15. Advanced: c11_comm_045 (GST on Trade vs Cash Discount)
  {
    id: 'ch_15_gst_valuation_eval',
    nodeId: NODE_C11_COMM_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'HUL sells detergent packs with List Price ₹1,00,000, Trade Discount 20% shown on invoice under pre-sale contract, and 3% Cash Discount for payment within 7 days. GST is 18%. On what taxable value is GST calculated?',
    options: [
      'On ₹1,00,000 (List Price) because discounts cannot reduce tax',
      'On ₹80,000 (Invoice Price post-Trade Discount) because pre-agreed trade discounts on the invoice are excluded under Section 15(3) CGST Act',
      'On ₹77,600 (Net post-Cash Discount value) because cash discounts always reduce GST',
      'On ₹1,18,000 including surcharge',
    ],
    correctIndex: 1,
    explanation: 'Under Section 15(3) of the CGST Act read with CBIC Circular 1053/32/2017-CX, trade discounts shown on the tax invoice are excluded from transaction value, so GST is assessed on ₹80,000. Subsequent cash discounts are post-supply financial settlements that do NOT alter the assessed GST taxable value.',
    hints: [
      'Does a cash discount given days after invoice issuance change the tax calculated on day 1?',
      'Trade discount is excluded from the GST base if stated on the invoice.',
      'GST is calculated on the post-trade discount invoice value: 1,00,000 − 20% = 80,000.',
    ],
    misconceptionIndex: 3,
  },
  // 16. Advanced: c11_comm_046 (Balance of Trade vs Payments)
  {
    id: 'ch_16_bot_vs_bop',
    nodeId: NODE_C11_COMM_046,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In FY2023, India had a merchandise trade deficit of USD 267 Billion, yet its overall foreign exchange reserves remained resilient. How is this explained using the distinction between Balance of Trade and Balance of Payments?',
    options: [
      'Balance of Trade includes software exports, while Balance of Payments excludes crude oil',
      'Balance of Trade covers visible merchandise only; Balance of Payments includes invisibles (software exports, remittances) and capital inflows (FDI) which offset the merchandise deficit',
      'Merchandise trade deficits are forgiven annually by the World Trade Organisation',
      'Balance of Payments only counts transactions in Indian Rupees',
    ],
    correctIndex: 1,
    explanation: 'Balance of Trade measures visible goods only (Exports − Imports). Balance of Payments includes invisible services (like Infosys/TCS software exports), remittances from NRI workers, and capital flows (FDI/FII), which bridged India’s goods gap.',
    hints: [
      'What happens to revenue from IT services and money sent home by Indian workers abroad?',
      'Balance of Trade = Goods only. Balance of Payments = Goods + Services + Capital.',
      'Services exports and remittances offset the physical merchandise trade deficit.',
    ],
  },
  // 17. Advanced: c11_comm_049 (Confirmed Irrevocable L/C Risk Analysis)
  {
    id: 'ch_17_lc_risk_eval',
    nodeId: NODE_C11_COMM_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Tirupur knitwear exporter sells to a new buyer in an economically volatile country. Why should the exporter insist on a CONFIRMED Irrevocable Letter of Credit rather than an unconfirmed one?',
    options: [
      'A confirmed L/C is cheaper and waives all shipping documentation checks',
      'A confirmed L/C adds a guarantee from a prime domestic bank (e.g., SBI Mumbai), protecting the exporter against foreign issuing bank insolvency and sovereign country risk',
      'An unconfirmed L/C allows the foreign buyer to cancel the order unilaterally after shipment',
      'Confirmation allows the goods to bypass Indian customs inspection',
    ],
    correctIndex: 1,
    explanation: 'In an unconfirmed L/C, the exporter depends solely on the foreign bank. In a confirmed L/C, a domestic confirming bank (such as SBI) adds its independent legal undertaking, eliminating foreign bank default and sovereign transfer risk.',
    hints: [
      'What happens if the foreign buyer\'s bank goes bankrupt or the foreign nation freezes dollar transfers?',
      'Confirmation adds a second bank\'s guarantee in the exporter\'s own home country.',
      'The confirming bank must pay even if the overseas issuing bank fails.',
    ],
  },
  // 18. Advanced: c11_comm_050 (Clean vs Claused B/L & L/C Refusal)
  {
    id: 'ch_18_foul_bl_crisis',
    nodeId: NODE_C11_COMM_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'During container loading at JNPT, the ship\'s mate notes "20 cartons crushed and leaking" on the Mate\'s Receipt. What will be the direct financial consequence under UCP 600 banking rules?',
    options: [
      'The shipping line will pay for the damaged goods immediately at the port',
      'The shipping line will issue a "Claused / Foul" Bill of Lading, causing the negotiating bank to reject documents and dishonour the Letter of Credit',
      'The Customs Department will confiscate the entire ship',
      'The Certificate of Origin will automatically be cancelled by FIEO',
    ],
    correctIndex: 1,
    explanation: 'Under documentary credit rules (UCP 600), banks demand a "Clean Bill of Lading" (no defect clauses). A claused B/L notation results in document rejection and non-payment under the L/C.',
    hints: [
      'Remarks on the Mate\'s Receipt transfer directly onto the formal Bill of Lading.',
      'Banks deal in documents, not goods; they require clean documents without defect annotations.',
      'A foul Bill of Lading violates standard Letter of Credit payment terms.',
    ],
  },
  // 19. Advanced: c11_comm_043 (E-Invoicing CBIC Mandate)
  {
    id: 'ch_19_e_invoice_compliance',
    nodeId: NODE_C11_COMM_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under CBIC Notification 13/2020 and CGST Section 31, why must Indian B2B suppliers with turnover above ₹5 Crore generate an IRN (Invoice Reference Number) via the IRP portal before issuing a Tax Invoice?',
    options: [
      'To enable the buyer to pay using crypto tokens',
      'To provide real-time visibility to tax authorities, prevent fake invoicing rackets, and auto-populate GSTR-1 and GSTR-2B for seamless ITC reconciliation',
      'To replace the need for physical transport of goods by road',
      'To allow suppliers to avoid GST audits for five years',
    ],
    correctIndex: 1,
    explanation: 'E-invoicing validates invoice parameters in real-time via the Invoice Registration Portal (IRP), generating an IRN and QR code that auto-populates GST returns and eliminates fraudulent ITC claims.',
    hints: [
      'What was the government trying to stop by making B2B invoices digital and verifiable on a central portal?',
      'IRN makes the invoice visible to tax authorities before the buyer receives it.',
      'Auto-population into GSTR-1 and GSTR-2B prevents fake invoice networks.',
    ],
  },
  // 20. Advanced: c11_comm_048 (Import Duty & Valuation)
  {
    id: 'ch_20_import_duty_calc',
    nodeId: NODE_C11_COMM_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An Indian electronics firm imports 1,000 display panels with Assessable CIF value of ₹10,00,000. Basic Customs Duty (BCD) is 10%, Social Welfare Surcharge (SWS) is 10% on BCD, and IGST is 18% on total value including duties. What is the total duty payable (BCD + SWS + IGST)?',
    correctAnswer: 309800,
    tolerance: 100,
    unit: '₹',
    explanation: 'BCD = 10% of 10,00,000 = ₹1,00,000. SWS = 10% of BCD (₹1,00,000) = ₹10,000. Subtotal value for IGST = ₹10,00,000 + ₹1,00,000 + ₹10,000 = ₹11,10,000. IGST = 18% of ₹11,10,000 = ₹1,99,800. Total Duty = ₹1,00,000 + ₹10,000 + ₹1,99,800 = ₹3,09,800.',
    hints: [
      'Step 1: Calculate BCD (10% of 10,00,000 = 1,00,000).',
      'Step 2: SWS is 10% of BCD only (10% of 1,00,000 = 10,000).',
      'Step 3: Calculate IGST (18%) on [Assessable Value + BCD + SWS] = 18% of 11,10,000 = 1,99,800.',
      'Step 4: Sum all three duties (1,00,000 + 10,000 + 1,99,800 = 3,09,800).',
    ],
  },
  // 21. Advanced: c11_comm_050 (Certificate of Origin under CEPA)
  {
    id: 'ch_21_cepa_origin',
    nodeId: NODE_C11_COMM_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the India-UAE Comprehensive Economic Partnership Agreement (CEPA 2022), an Indian jewellery exporter can export to Dubai at 0% tariff instead of 5%. Which mandatory document issued by FIEO must be submitted to Dubai Customs to claim this tariff preference?',
    options: [
      'A Consular Invoice signed by the Dubai Police',
      'A Preferential Certificate of Origin (Form I) issued by FIEO / Export Inspection Council certifying value addition in India',
      'A Mate’s Receipt from Nhava Sheva port',
      'An internal purchase order from the Tirupur factory',
    ],
    correctIndex: 1,
    explanation: 'Preferential tariff concessions under FTAs/CEPAs strictly require a statutory Certificate of Origin issued by an authorised agency like FIEO proving substantial value addition in India.',
    hints: [
      'Which document officially certifies the country of manufacture for trade treaty benefits?',
      'Chambers of Commerce and FIEO issue this certificate.',
      'It is called a Certificate of Origin.',
    ],
  },
  // 22. Advanced: c11_comm_042 (Vending Machine Strategic Trade-off)
  {
    id: 'ch_22_vending_economics',
    nodeId: NODE_C11_COMM_042,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the primary operational trade-off of Automatic Vending Machines compared to Chain Stores by selecting the two decisive contrasting factors.',
    availableParts: [
      '24x7 Unmanned Operation with Zero On-Site Staff Cost',
      'Extremely Narrow Product Assortment Limited to Pre-Packed Units',
      'Comprehensive Personal Sales Pitch by Staff',
      'Highest Mall Rental Footprint Requirement',
    ],
    targetState: '24x7 Unmanned Operation with Zero On-Site Staff Cost Extremely Narrow Product Assortment Limited to Pre-Packed Units',
    validationHint: 'Select the main merit (24x7 low labour) followed by the main demerit (narrow packaged range).',
    explanation: 'Automatic Vending Machines maximize operational efficiency through 24x7 unattended sales with minimal real-estate footprint, but are strictly constrained to uniform, pre-packed dispensable SKUs.',
    hints: [
      'Add the key advantage first: unattended round-the-clock sales without sales staff.',
      'Then add the key limitation: only small pre-packed goods can be dispensed.',
      'Click the buttons in order to assemble the strategic trade-off.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_COMM_041,
  title: 'ISC Class 11 Commerce: Comprehensive Retail, Wholesale, Trade Documents & International Operations',
  definition: 'An interactive simulation of Indian commercial trade architectures, spanning itinerant and fixed small-scale retail, departmental and chain formats, domestic invoice and discount mechanisms (Trade vs Cash discount, Debit/Credit notes), and 12-step export/import pipelines with statutory instruments.',
  eli5: 'Think of trade as a pipeline: local hawkers walk around while shops stay fixed; big stores either bring everything under one roof (Shoppers Stop) or copy one shop everywhere (Bata). In business, asking for price is an Inquiry, giving price is a Quotation, and the final bill is an Invoice. When shipping abroad, banks and customs step in with letters of credit, shipping bills, and bills of lading to make sure everyone gets paid and goods arrive safely.',
  misconceptions: [
    {
      misconception: 'A weekly haat trader returning to the same spot every Saturday is a fixed shop retailer.',
      correction: 'Fixed shops require permanent, year-round premises. Weekly haat traders dismantle their stalls and travel between markets, making them itinerant market traders.',
    },
    {
      misconception: 'Departmental stores and chain stores are identical large retail formats.',
      correction: 'Departmental stores aggregate many unrelated categories under one roof (breadth), while chain stores replicate identical single-product shops across many locations (depth).',
    },
    {
      misconception: 'A Debit Note means the sender’s own account is debited in his own books.',
      correction: 'A note is named after the entry in the SENDER’s ledger for the COUNTERPARTY: the buyer debits the seller’s account to reduce payables, hence Debit Note.',
    },
    {
      misconception: 'Cash discounts reduce the assessable value for GST calculation.',
      correction: 'Under CGST Act Section 15(3), only pre-agreed trade discounts shown on the invoice reduce GST assessable value. Post-supply cash discounts do not alter assessed GST.',
    },
    {
      misconception: 'Bill of Entry and Bill of Lading are interchangeable transport documents.',
      correction: 'A Bill of Entry is a statutory customs document filed for duty assessment; a Bill of Lading is a title deed and maritime transport receipt issued by shipping carriers.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which format provides one-stop shopping across apparel, groceries, and cosmetics under unified billing?', options: ['Specialty Shop', 'Chain Store', 'Departmental Store', 'Street Trader'], correctIndex: 2 },
    { question: 'What is the base price used to calculate a Cash Discount?', options: ['List / MRP Price', 'Post-Trade Discount Invoice Price', 'Cost of Goods Sold', 'Price including maximum GST'], correctIndex: 1 },
    { question: 'Who files the Shipping Bill under Section 50 of the Customs Act 1962?', options: ['Foreign Importer', 'Indian Exporter (via ICEGATE)', 'Vessel Captain', 'Commercial Bank'], correctIndex: 1 },
    { question: 'Which document serves as the document of title to maritime cargo?', options: ['Mate’s Receipt', 'Shipping Order', 'Bill of Lading', 'Certificate of Origin'], correctIndex: 2 },
    { question: 'What scheme provides up to ₹10,000 collateral-free working capital loans to Indian street vendors?', options: ['PM Kisan', 'PM SVANidhi', 'PMEGP', 'Standup India'], correctIndex: 1 },
    { question: 'When goods are returned by a buyer, what document does the seller issue in response to the buyer\'s debit note?', options: ['Tax Invoice', 'Credit Note', 'Consular Invoice', 'Indent'], correctIndex: 1 },
    { question: 'Which body issues the Certificate of Origin for preferential tariff claims under FTAs in India?', options: ['Reserve Bank of India', 'FIEO / Authorized Chambers of Commerce', 'Port Trust Authority', 'State GST Department'], correctIndex: 1 },
    { question: 'In the export procedure, which document must be obtained before physical loading onto the vessel?', options: ['Realisation Certificate', 'Let-Export Order from Customs', 'Final Payment Draft', 'Bill of Entry'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 syllabus nodes covering retail taxonomy, document flows, discount mathematics, and international trade pipelines with >85% accuracy.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Retail Format Matrix — Scale & Mobility',
    instruction: 'Click each retail archetype to compare capital requirements, risk, and structural organization.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_COMM_041,
  },
  {
    title: 'Lab 2: The Trade vs Cash Discount Engine',
    instruction: 'Manipulate List Price, Trade Discount %, and Cash Discount % to observe real-time ledger & GST splits.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_045,
  },
  {
    title: 'Lab 3: Domestic Correction Circuit (Debit & Credit Notes)',
    instruction: 'Simulate damaged stock return from Retailer to Wholesaler and track dual-ledger synchronization.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_COMM_044,
  },
  {
    title: 'Lab 4: 12-Step Export Supply Chain Simulator',
    instruction: 'Trace a containerized cargo journey from Tirupur factory gate to JNPT docks, customs, and bank payment.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_047,
  },
  {
    title: 'Lab 5: Export Maritime Document Authenticator',
    instruction: 'Inspect the four key shipping documents (Mate\'s Receipt, B/L, Origin, Consular) and verify clean status.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_COMM_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an exporter sells goods worth ₹1,00,000 with a 20% Trade Discount and 5% Cash Discount, will the government charge 18% GST on ₹1,00,000, ₹80,000, or ₹76,000?',
    options: ['On ₹1,00,000 (List MRP)', 'On ₹80,000 (Invoice Price post-Trade Discount)', 'On ₹76,000 (Net after Cash Discount)'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the sliders in Lab 2 to verify that GST assessable value freezes at the post-Trade Discount invoice price!',
    nodeId: NODE_C11_COMM_045,
  },
  {
    question: 'Predict: What happens if a ship captain writes "10 bags water-damaged" on the Mate\'s Receipt at JNPT port?',
    options: [
      'The shipping line fixes the bags for free',
      'The shipping line issues a Claused Bill of Lading, causing the bank to reject payment under the Letter of Credit',
      'The exporter gets an automatic tax refund from customs',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the document authenticator in Lab 5 to see how claused remarks break the banking payment chain!',
    nodeId: NODE_C11_COMM_050,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the discount simulator, why does changing the Cash Discount % change the Buyer’s Net Outflow but NOT the GST amount?',
    observableOptions: [
      'Because GST is calculated and locked on the Tax Invoice value before cash payment timing is determined',
      'Because cash discounts are illegal under Indian commercial law',
      'Because the simulator has a software error',
      'Because the seller absorbs 100% of the GST liability',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_COMM_045,
  },
  {
    question: 'Observation: In the export pipeline, why must Customs Clearance (Shipping Bill) occur BEFORE physical loading aboard the vessel?',
    observableOptions: [
      'Because the port authority needs to weigh the ship',
      'Because the carrier cannot legally load cargo without a statutory Let-Export Order from Customs',
      'Because the buyer’s bank refuses to open an L/C without ship coordinates',
      'Because international waters do not recognise Indian laws',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_COMM_047,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Boardroom Practicum: Execute an International Export Deal',
  description: 'You are appointed Head of Commercial Operations at Titan Watches Ltd. You have received an indent from a luxury department store in Dubai for 2,000 smartwatches valued at USD 200,000. Plan and execute the compliance workflow.',
  steps: [
    'Obtain / verify Importer-Exporter Code (IEC) from DGFT and secure an Irrevocable Confirmed L/C through Emirates NBD and SBI.',
    'Manufacture watches, obtain Pre-Shipment Quality Inspection Certificate, and file Shipping Bill on ICEGATE at Nhava Sheva (JNPT).',
    'Secure Let-Export Order, load containers, obtain Mate\'s Receipt, and exchange for a Clean Negotiable Bill of Lading.',
    'Obtain Preferential Certificate of Origin (Form I) from FIEO under the India-UAE CEPA for 0% Dubai tariff.',
    'Negotiate documents with SBI Tirupur/Mumbai, realize USD 200,000, and file Realisation Certificate with RBI via XOS return.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_CommerceTypesRetailTradeSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_COMM_041,
  title = DEFAULT_PROPS.title || 'Trade Operations Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commerce & Commercial Studies', emoji: '📈', color: 'indigo' };

  // Phase navigation
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryIdx, setSelectedDiscoveryIdx] = useState<number | null>(null);

  // Predict-Then-Check State
  const [predictionMade, setPredictionMade] = useState(false);

  // Observation State
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Exploration & Sandbox Sliders / Controls
  const [simListPrice, setSimListPrice] = useState<number>(50000);
  const [simTradeDiscountPct, setSimTradeDiscountPct] = useState<number>(20);
  const [simCashDiscountPct, setSimCashDiscountPct] = useState<number>(3);
  const [simGstRatePct, setSimGstRatePct] = useState<number>(18);
  const [selectedRetailArchetype, setSelectedRetailArchetype] = useState<'hawker' | 'kirana' | 'dept' | 'chain' | 'vending'>('dept');
  const [exportStepProgress, setExportStepProgress] = useState<number>(1);
  const [simReturnUnits, setSimReturnUnits] = useState<number>(10);
  const [activeDocInspect, setActiveDocInspect] = useState<'mate' | 'bl' | 'coo' | 'consular'>('bl');

  // Challenge Adaptive Engine
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

  // Challenge Types State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Sim-engine feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 200, y: 200 });

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── LIVE CALCULATIONS: TRADE VS CASH DISCOUNT & GST ───
  const discountCalculation = useMemo(() => {
    const listTotal = simListPrice;
    const tradeDiscountAmt = (listTotal * simTradeDiscountPct) / 100;
    const invoicePrice = listTotal - tradeDiscountAmt;
    const gstAmt = (invoicePrice * simGstRatePct) / 100;
    const totalInvoiceWithGst = invoicePrice + gstAmt;
    const cashDiscountAmt = (invoicePrice * simCashDiscountPct) / 100;
    const netPayable = totalInvoiceWithGst - cashDiscountAmt;

    return {
      listTotal,
      tradeDiscountAmt,
      invoicePrice,
      gstAmt,
      totalInvoiceWithGst,
      cashDiscountAmt,
      netPayable,
    };
  }, [simListPrice, simTradeDiscountPct, simCashDiscountPct, simGstRatePct]);

  // Data for Recharts Bar Chart
  const chartData = useMemo(() => [
    { name: 'List Price', value: discountCalculation.listTotal, fill: '#6366f1' },
    { name: 'Invoice Value', value: discountCalculation.invoicePrice, fill: '#3b82f6' },
    { name: 'GST (18%)', value: discountCalculation.gstAmt, fill: '#f59e0b' },
    { name: 'Cash Disc.', value: discountCalculation.cashDiscountAmt, fill: '#ef4444' },
    { name: 'Net Payable', value: discountCalculation.netPayable, fill: '#10b981' },
  ], [discountCalculation]);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const targetDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Cargo Vessel Sea Route Animation) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ocean waves
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, 25);
      for (let x = 0; x < canvas.width; x += 10) {
        const y = 25 + Math.sin((x + waveOffset) * 0.05) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = '#1e3a8a';
      ctx.fill();

      // Ship Position mapped to export step progress (1 to 12)
      const shipX = 30 + ((exportStepProgress - 1) / 11) * (canvas.width - 70);
      const shipY = 22 + Math.sin((shipX + waveOffset) * 0.05) * 3;

      // Draw cargo ship hull
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(shipX - 18, shipY);
      ctx.lineTo(shipX + 18, shipY);
      ctx.lineTo(shipX + 12, shipY + 10);
      ctx.lineTo(shipX - 12, shipY + 10);
      ctx.closePath();
      ctx.fill();

      // Containers
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(shipX - 10, shipY - 8, 8, 8);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(shipX, shipY - 8, 8, 8);

      // Flag mast
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shipX + 8, shipY - 8);
      ctx.lineTo(shipX + 8, shipY - 16);
      ctx.stroke();

      waveOffset += 0.8;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [exportStepProgress, phase]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('whoosh');
      speechManager.speak('Let us study the complete solution and statutory rationale together.');
    }
  }, [hintCount, activeChallenge]);

  // ─── AUTONOMOUS INACTIVITY TIMER (10s auto-hint) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // ─── DISCOVERY HANDLER CALLBACK ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setSelectedDiscoveryIdx(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Masterful insight! The foreign importer’s bank issues the L/C to guarantee international payment.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── PHASE ADVANCEMENT CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Commerce Labs. Manipulate each trade model to build intuitive mastery.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Exploration Sandbox unlocked. Test all pricing, discount, and document parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Entering the ISC Challenge Assessment. Apply your knowledge to real-world commercial scenarios.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Accurate observation! GST assessable value is locked on the tax invoice prior to cash discount.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Take another close look at the GST row while moving the Cash Discount slider.');
    }
  }, []);

  const handleArchetypeSelect = useCallback((type: 'hawker' | 'kirana' | 'dept' | 'chain' | 'vending') => {
    setSelectedRetailArchetype(type);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      hawker: 'Itinerant Hawker: Mobile handcart, low capital (₹3,000-₹5,000), protected under Street Vendors Act 2014.',
      kirana: 'Small-Scale Fixed General Store: Permanent year-round location, broad assortment, ~13 million across India.',
      dept: 'Departmental Store (Shoppers Stop): Many unrelated departments under one roof, unified billing, high capital.',
      chain: 'Chain Store (Bata India): One product line replicated across ~1,850 identical outlets with central pricing.',
      vending: 'Automatic Vending Machine: 24x7 unmanned dispensing of pre-packed convenience goods at transit hubs.',
    };
    speechManager.speak(descriptions[type] || '');
  }, []);

  const handleDocInspectSelect = useCallback((doc: 'mate' | 'bl' | 'coo' | 'consular') => {
    setActiveDocInspect(doc);
    audioManager.play('tap');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
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

  // ─── DRAG SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  // ─── COMPLETION HANDLER ───
  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the comprehensive ISC Trade simulation with a mastery score of ${finalScore} percent.`);
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  // ─── MASTER ANSWER VALIDATION HANDLER ───
  const handleAnswerSubmit = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Brilliant work! Accurate commercial reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setShowSparkle(true);

      // BKT & SRS updates
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, 'proficient');
      }
    } else {
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
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length === activeChallenge.sortItems?.length
      ? sortArrangement
      : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswerSubmit(currentOrder);
  }, [sortArrangement, activeChallenge, handleAnswerSubmit]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* HEADER SECTION with Motion */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-900/50"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center text-2xl border border-indigo-500/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ISC Class 11
              </span>
              <span className="text-xs text-slate-400">10 Core Trade Modules</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2">
          {['discovery', 'explore', 'sandbox', 'challenge', 'complete'].map((pName) => (
            <motion.div
              key={pName}
              animate={{ scale: phase === pName ? 1.05 : 1, opacity: phase === pName ? 1 : 0.5 }}
              className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border ${
                phase === pName
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {pName}
            </motion.div>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/40">
            <h2 className="text-xl font-bold text-indigo-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400 font-mono bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/50">
              🧭 Context: {SCENARIO.context}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800"
          >
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-3">
              <span>⚡ Discovery Question</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20">Ungraded Curiosity Check</span>
            </div>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    selectedDiscoveryIdx === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {selectedDiscoveryIdx === idx && (
                      <span className="text-lg">{idx === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎯 Spot on! Let us dive deep into the full trade mechanisms.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Trade Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-amber-400 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-300 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              {/* LAB 1: Retail Format Matrix */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'hawker' as const, label: 'Street Hawker', badge: 'Itinerant' },
                      { id: 'kirana' as const, label: 'Kirana Store', badge: 'Fixed Small' },
                      { id: 'dept' as const, label: 'Shoppers Stop', badge: 'Departmental' },
                      { id: 'chain' as const, label: 'Bata India', badge: 'Chain Store' },
                      { id: 'vending' as const, label: 'Vending Machine', badge: 'Automatic' },
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleArchetypeSelect(item.id)}
                        className={`p-3 rounded-xl text-center border transition-all ${
                          selectedRetailArchetype === item.id
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="text-xs text-indigo-200 font-mono mb-1">{item.badge}</div>
                        <div className="text-sm font-bold">{item.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Visual SVG Diagram for Retail Archetype */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 240" className="w-full h-auto">
                      <rect x="20" y="20" width="660" height="200" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      
                      {selectedRetailArchetype === 'hawker' && (
                        <g>
                          <circle cx="150" cy="120" r="50" fill="#f59e0b" opacity="0.2" />
                          <circle cx="150" cy="120" r="35" fill="#f59e0b" />
                          <text x="150" y="125" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="13">Mobile Cart</text>
                          <line x1="190" y1="120" x2="350" y2="120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" />
                          <rect x="360" y="60" width="280" height="120" rx="12" fill="#1e293b" stroke="#475569" />
                          <text x="380" y="90" fill="#fbbf24" fontWeight="bold" fontSize="14">Hawker / Itinerant Profile</text>
                          <text x="380" y="115" fill="#94a3b8" fontSize="12">• Capital: ₹1,000 – ₹10,000</text>
                          <text x="380" y="135" fill="#94a3b8" fontSize="12">• Law: Street Vendors Act 2014 (TVC ID Card)</text>
                          <text x="380" y="155" fill="#94a3b8" fontSize="12">• Finance: PM SVANidhi up to ₹10,000</text>
                        </g>
                      )}

                      {selectedRetailArchetype === 'dept' && (
                        <g>
                          <rect x="60" y="50" width="240" height="140" rx="12" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                          <text x="180" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Shoppers Stop (One Roof)</text>
                          <rect x="75" y="90" width="95" height="35" rx="6" fill="#4338ca" />
                          <text x="122" y="112" textAnchor="middle" fill="#ffffff" fontSize="10">Apparel Dept</text>
                          <rect x="185" y="90" width="95" height="35" rx="6" fill="#4338ca" />
                          <text x="232" y="112" textAnchor="middle" fill="#ffffff" fontSize="10">Cosmetics Dept</text>
                          <rect x="75" y="135" width="205" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                          <text x="177" y="160" textAnchor="middle" fill="#c7d2fe" fontSize="11">Centralised Billing Counter</text>
                          
                          <rect x="340" y="50" width="310" height="140" rx="12" fill="#1e293b" stroke="#475569" />
                          <text x="360" y="80" fill="#a5b4fc" fontWeight="bold" fontSize="14">Departmental Store Matrix</text>
                          <text x="360" y="105" fill="#94a3b8" fontSize="12">• Principle: BREADTH (Many categories under 1 roof)</text>
                          <text x="360" y="125" fill="#94a3b8" fontSize="12">• Capital: ₹50 – ₹100 Crore per large outlet</text>
                          <text x="360" y="145" fill="#94a3b8" fontSize="12">• Risk: High concentration in single property</text>
                          <text x="360" y="165" fill="#94a3b8" fontSize="12">• Companies Act 2013 registered entity</text>
                        </g>
                      )}

                      {selectedRetailArchetype === 'chain' && (
                        <g>
                          <rect x="50" y="60" width="70" height="110" rx="8" fill="#047857" stroke="#10b981" />
                          <text x="85" y="115" textAnchor="middle" fill="#ffffff" fontSize="10">Bata Delhi</text>
                          <rect x="135" y="60" width="70" height="110" rx="8" fill="#047857" stroke="#10b981" />
                          <text x="170" y="115" textAnchor="middle" fill="#ffffff" fontSize="10">Bata Mumbai</text>
                          <rect x="220" y="60" width="70" height="110" rx="8" fill="#047857" stroke="#10b981" />
                          <text x="255" y="115" textAnchor="middle" fill="#ffffff" fontSize="10">Bata Kolkata</text>

                          <rect x="330" y="50" width="320" height="140" rx="12" fill="#1e293b" stroke="#475569" />
                          <text x="350" y="80" fill="#6ee7b7" fontWeight="bold" fontSize="14">Chain Store / Multiple Shops</text>
                          <text x="350" y="105" fill="#94a3b8" fontSize="12">• Principle: DEPTH (1 line across ~1,850 outlets)</text>
                          <text x="350" y="125" fill="#94a3b8" fontSize="12">• Price: Uniform central pricing nationwide</text>
                          <text x="350" y="145" fill="#94a3b8" fontSize="12">• Risk: Low per store (failure of 1 does not sink chain)</text>
                          <text x="350" y="165" fill="#94a3b8" fontSize="12">• Bulk factory direct purchasing economies</text>
                        </g>
                      )}

                      {selectedRetailArchetype === 'vending' && (
                        <g>
                          <rect x="110" y="45" width="100" height="150" rx="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                          <rect x="125" y="60" width="70" height="50" rx="6" fill="#082f49" />
                          <text x="160" y="90" textAnchor="middle" fill="#38bdf8" fontSize="10">Dispenser</text>
                          <circle cx="160" cy="140" r="12" fill="#38bdf8" />
                          <text x="160" y="144" textAnchor="middle" fill="#000000" fontSize="10">₹/UPI</text>

                          <rect x="270" y="45" width="380" height="150" rx="12" fill="#1e293b" stroke="#475569" />
                          <text x="290" y="75" fill="#7dd3fc" fontWeight="bold" fontSize="14">Automatic Vending Machine Matrix</text>
                          <text x="290" y="100" fill="#94a3b8" fontSize="12">• Defining Feature: Zero human salesperson (Machine is POS)</text>
                          <text x="290" y="120" fill="#94a3b8" fontSize="12">• Merit: 24x7 unattended sales, minimal footprint in transit</text>
                          <text x="290" y="140" fill="#94a3b8" fontSize="12">• Demerit: Extremely narrow range (packaged goods only)</text>
                          <text x="290" y="160" fill="#94a3b8" fontSize="12">• Law: Food Safety and Standards Act (FSSAI) 2006</text>
                        </g>
                      )}

                      {selectedRetailArchetype === 'kirana' && (
                        <g>
                          <rect x="80" y="55" width="160" height="130" rx="10" fill="#d97706" stroke="#fbbf24" strokeWidth="2" />
                          <text x="160" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">Kirana General Store</text>
                          <text x="160" y="115" textAnchor="middle" fill="#fef3c7" fontSize="11">Residential Locality</text>
                          <text x="160" y="135" textAnchor="middle" fill="#fef3c7" fontSize="10">Permanent Year-Round</text>

                          <rect x="290" y="50" width="360" height="140" rx="12" fill="#1e293b" stroke="#475569" />
                          <text x="310" y="80" fill="#fcd34d" fontWeight="bold" fontSize="14">Small-Scale Fixed General Store</text>
                          <text x="310" y="105" fill="#94a3b8" fontSize="12">• Permanence: Open 365 days a year at fixed site</text>
                          <text x="310" y="125" fill="#94a3b8" fontSize="12">• Scale: ~13 Million Kirana stores across India</text>
                          <text x="310" y="145" fill="#94a3b8" fontSize="12">• Law: State Shops and Establishments Act</text>
                          <text x="310" y="165" fill="#94a3b8" fontSize="12">• Assortment: Groceries, toiletries, stationery</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 2: Trade vs Cash Discount Simulator */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict Then Check Hook */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800">
                      <p className="text-sm font-semibold text-indigo-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 text-left border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-800 flex items-center justify-between">
                      <span className="text-xs text-emerald-300">✓ Prediction recorded! Manipulate the sliders below to verify.</span>
                      <span className="text-xs text-slate-400 font-mono">Sec 15(3) CGST Act</span>
                    </div>
                  )}

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>List Price (Catalogue / MRP):</span>
                        <span className="font-bold text-indigo-400">₹{simListPrice.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={200000}
                        step={5000}
                        value={simListPrice}
                        aria-label="List Price"
                        onChange={(e) => setSimListPrice(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Trade Discount % (Shown on Invoice):</span>
                        <span className="font-bold text-indigo-400">{simTradeDiscountPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        step={5}
                        value={simTradeDiscountPct}
                        aria-label="Trade Discount Percentage"
                        onChange={(e) => setSimTradeDiscountPct(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Cash Discount % (Prompt Payment within terms):</span>
                        <span className="font-bold text-indigo-400">{simCashDiscountPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.5}
                        value={simCashDiscountPct}
                        aria-label="Cash Discount Percentage"
                        onChange={(e) => setSimCashDiscountPct(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>GST Rate % (Assessed on Invoice Value):</span>
                        <span className="font-bold text-amber-400">{simGstRatePct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={28}
                        step={6}
                        value={simGstRatePct}
                        aria-label="GST Rate Percentage"
                        onChange={(e) => setSimGstRatePct(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Real-time Calculation Breakdown + Recharts Visualization */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Financial Summary Table */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">1. Total List Price:</span>
                        <span className="font-mono text-white">₹{discountCalculation.listTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-rose-400">
                        <span>2. Less: Trade Discount ({simTradeDiscountPct}%):</span>
                        <span className="font-mono">− ₹{discountCalculation.tradeDiscountAmt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 bg-indigo-950/60 px-2 rounded font-bold border border-indigo-800 text-indigo-200">
                        <span>3. Invoice Price (GST Taxable Base):</span>
                        <span className="font-mono">₹{discountCalculation.invoicePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-amber-400">
                        <span>4. Add: GST @ {simGstRatePct}%:</span>
                        <span className="font-mono">+ ₹{discountCalculation.gstAmt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300 font-semibold">
                        <span>5. Total Invoice Value with GST:</span>
                        <span className="font-mono">₹{discountCalculation.totalInvoiceWithGst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-emerald-400">
                        <span>6. Less: Cash Discount ({simCashDiscountPct}% on Invoice):</span>
                        <span className="font-mono">− ₹{discountCalculation.cashDiscountAmt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 bg-emerald-950/80 px-2 rounded font-bold text-sm border border-emerald-700 text-emerald-200">
                        <span>7. Net Amount Payable by Buyer:</span>
                        <span className="font-mono">₹{discountCalculation.netPayable.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Recharts Bar Graph */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[220px]">
                      <p className="text-xs font-semibold text-slate-400 mb-2">Live Trade Valuation Flow (₹)</p>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                            formatter={(value: number | string | Array<number | string> | undefined) => [`₹${Number(value || 0).toLocaleString()}`, 'Amount']}
                          />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-semibold text-amber-400 mb-2">🔍 Observation Check:</p>
                      <p className="text-sm text-white mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg text-left border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* LAB 3: Debit Note & Credit Note Circuit */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-400">Defective Stock Returned by Retailer:</span>
                      <span className="text-sm font-bold text-amber-400">{simReturnUnits} Units (@ ₹500/unit = ₹{(simReturnUnits * 500).toLocaleString()})</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={simReturnUnits}
                      aria-label="Defective Stock Returned"
                      onChange={(e) => setSimReturnUnits(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Dual Ledger SVG Flow Diagram */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 220" className="w-full h-auto">
                      {/* Retailer Box (Buyer) */}
                      <rect x="30" y="30" width="280" height="160" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                      <text x="170" y="55" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="13">Surat Retailer (Buyer)</text>
                      <rect x="45" y="70" width="250" height="40" rx="6" fill="#0f172a" />
                      <text x="55" y="88" fill="#94a3b8" fontSize="10">Sends: <tspan fill="#f59e0b" fontWeight="bold">DEBIT NOTE</tspan></text>
                      <text x="55" y="102" fill="#94a3b8" fontSize="9">Reason: Returning {simReturnUnits} defective shirts</text>
                      <rect x="45" y="120" width="250" height="55" rx="6" fill="#0f172a" stroke="#1e3a8a" />
                      <text x="55" y="138" fill="#38bdf8" fontSize="10">Buyer’s Ledger Entry:</text>
                      <text x="55" y="152" fill="#e2e8f0" fontSize="9" fontFamily="monospace">Wholesaler A/c ..... Dr ₹{(simReturnUnits * 500).toLocaleString()}</text>
                      <text x="75" y="165" fill="#e2e8f0" fontSize="9" fontFamily="monospace">To Purchase Return A/c ₹{(simReturnUnits * 500).toLocaleString()}</text>

                      {/* Direction Arrows */}
                      <path d="M 320 70 L 380 70" stroke="#f59e0b" strokeWidth="2" />
                      <text x="350" y="65" textAnchor="middle" fill="#f59e0b" fontSize="9">Debit Note →</text>
                      <path d="M 380 150 L 320 150" stroke="#10b981" strokeWidth="2" />
                      <text x="350" y="145" textAnchor="middle" fill="#10b981" fontSize="9">← Credit Note</text>

                      {/* Wholesaler Box (Seller) */}
                      <rect x="390" y="30" width="280" height="160" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <text x="530" y="55" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="13">Mumbai Wholesaler (Seller)</text>
                      <rect x="405" y="70" width="250" height="40" rx="6" fill="#0f172a" />
                      <text x="415" y="88" fill="#94a3b8" fontSize="10">Replies with: <tspan fill="#10b981" fontWeight="bold">CREDIT NOTE</tspan></text>
                      <text x="415" y="102" fill="#94a3b8" fontSize="9">Effect: Reduces receivable by ₹{(simReturnUnits * 500).toLocaleString()}</text>
                      <rect x="405" y="120" width="250" height="55" rx="6" fill="#0f172a" stroke="#064e3b" />
                      <text x="415" y="138" fill="#4ade80" fontSize="10">Seller’s Ledger Entry:</text>
                      <text x="415" y="152" fill="#e2e8f0" fontSize="9" fontFamily="monospace">Sales Return A/c ..... Dr ₹{(simReturnUnits * 500).toLocaleString()}</text>
                      <text x="435" y="165" fill="#e2e8f0" fontSize="9" fontFamily="monospace">To Retailer A/c ₹{(simReturnUnits * 500).toLocaleString()}</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 4: 12-Step Export Supply Chain Simulator */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* Canvas Animation of Vessel */}
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                    <canvas ref={canvasRef} width={650} height={40} className="w-full h-12 block" />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-400">Step {exportStepProgress} of 12:</span>
                      <span className="font-bold text-indigo-300">
                        {[
                          '1. Trade Inquiry',
                          '2. Proforma Quotation',
                          '3. Export Order / Indent',
                          '4. Letter of Credit Opened (Citibank NYC)',
                          '5. Production at Tirupur Factory',
                          '6. Pre-Shipment Finance (SBI Working Capital)',
                          '7. Pre-Shipment Inspection (EIC Quality Check)',
                          '8. Excise & GST RoDTEP Clearance',
                          '9. Customs Let-Export Order (Shipping Bill)',
                          '10. Physical Cargo Loading (Mate\'s Receipt & B/L)',
                          '11. Bank Negotiation of Documents',
                          '12. Realisation of Proceeds (RBI XOS Filing)',
                        ][exportStepProgress - 1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={exportStepProgress}
                      aria-label="Export Step Progress"
                      onChange={(e) => setExportStepProgress(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  {/* Step Detail Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40 text-xs leading-relaxed">
                    <div className="text-indigo-300 font-bold text-sm mb-1">
                      {exportStepProgress <= 4 && 'Stage A: Pre-Production & Financial Security'}
                      {exportStepProgress > 4 && exportStepProgress <= 8 && 'Stage B: Manufacturing, Finance & Quality Certification'}
                      {exportStepProgress > 8 && exportStepProgress <= 10 && 'Stage C: Customs Clearance & Maritime Port Loading'}
                      {exportStepProgress > 10 && 'Stage D: Banking Document Negotiation & Forex Realisation'}
                    </div>
                    <p className="text-slate-300">
                      {exportStepProgress === 4 && 'The Letter of Credit substitutes Citibank New York\'s credit for Walmart\'s credit. The Indian exporter produces goods only after receiving the confirmed L/C.'}
                      {exportStepProgress === 9 && 'Under Section 50 of the Customs Act 1962, the exporter files a Shipping Bill on ICEGATE. Customs inspects cargo and issues the Let-Export Order allowing vessel entry.'}
                      {exportStepProgress === 10 && 'Cargo crosses the Indian border! The ship captain signs a temporary Mate\'s Receipt, exchanged at the Maersk shipping office for the title-bearing Bill of Lading.'}
                      {exportStepProgress !== 4 && exportStepProgress !== 9 && exportStepProgress !== 10 && 'Each step provides the prerequisite documentation for the subsequent stage in the international transaction chain.'}
                    </p>
                  </div>
                </div>
              )}

              {/* LAB 5: Export Maritime Document Authenticator */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mate' as const, label: "Mate's Receipt", issuer: "Ship's Master" },
                      { id: 'bl' as const, label: 'Bill of Lading', issuer: 'Shipping Carrier' },
                      { id: 'coo' as const, label: 'Cert. of Origin', issuer: 'FIEO / Chamber' },
                      { id: 'consular' as const, label: 'Consular Invoice', issuer: 'Importing Embassy' },
                    ].map(doc => (
                      <motion.button
                        key={doc.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDocInspectSelect(doc.id)}
                        className={`p-3 rounded-xl text-left border ${
                          activeDocInspect === doc.id
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="text-xs text-indigo-200 font-mono">{doc.issuer}</div>
                        <div className="text-sm font-bold">{doc.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Document Preview Certificate */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs">
                    {activeDocInspect === 'mate' && (
                      <div className="border border-dashed border-amber-500/50 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-amber-400 font-bold text-sm">
                          <span>MATE’S RECEIPT (Provisional Loading Slip)</span>
                          <span>MV Maersk Goa</span>
                        </div>
                        <p className="text-slate-400">Issued at: Nhava Sheva (JNPT) Port, Mumbai</p>
                        <p className="text-slate-300">Cargo: 500 Cartons Cotton Knitwear | Condition: <span className="text-emerald-400 font-bold">Clean (No Damage Noted)</span></p>
                        <p className="text-slate-500 italic">Notice: This is NOT a Document of Title. Exporter must surrender this receipt at shipping line office to obtain formal Bill of Lading.</p>
                      </div>
                    )}

                    {activeDocInspect === 'bl' && (
                      <div className="border border-indigo-500/50 p-4 rounded-xl space-y-2 bg-indigo-950/20">
                        <div className="flex justify-between text-indigo-300 font-bold text-sm">
                          <span>NEGOTIABLE BILL OF LADING (Title Document)</span>
                          <span>B/L No: MAEU-98765432</span>
                        </div>
                        <p className="text-slate-400">Carrier: Maersk Line India | Port of Loading: JNPT | Port of Discharge: Rotterdam</p>
                        <p className="text-slate-300">Statutory Functions under Indian Carriage of Goods by Sea Act 1925:</p>
                        <ul className="text-slate-400 space-y-1 list-disc list-inside">
                          <li>1. Official receipt for cargo shipped on board</li>
                          <li>2. Evidence of contract of carriage by sea</li>
                          <li>3. <span className="text-emerald-400 font-bold">Document of Title</span> (Lawful endorsed holder claims cargo at destination)</li>
                        </ul>
                      </div>
                    )}

                    {activeDocInspect === 'coo' && (
                      <div className="border border-emerald-500/50 p-4 rounded-xl space-y-2 bg-emerald-950/20">
                        <div className="flex justify-between text-emerald-300 font-bold text-sm">
                          <span>PREFERENTIAL CERTIFICATE OF ORIGIN (Form I)</span>
                          <span>FIEO / EIC Authorized</span>
                        </div>
                        <p className="text-slate-400">Trade Treaty: India-UAE CEPA / India-ASEAN FTA</p>
                        <p className="text-slate-300">Certifies: 100% Cotton manufactured in Tirupur, India with &gt;40% domestic value addition.</p>
                        <p className="text-emerald-400 font-bold">Benefit: Entitles importer to 0% preferential customs tariff instead of standard 5% duty.</p>
                      </div>
                    )}

                    {activeDocInspect === 'consular' && (
                      <div className="border border-purple-500/50 p-4 rounded-xl space-y-2 bg-purple-950/20">
                        <div className="flex justify-between text-purple-300 font-bold text-sm">
                          <span>CONSULAR INVOICE (Customs Valuation Stamp)</span>
                          <span>Consulate General of Saudi Arabia, Mumbai</span>
                        </div>
                        <p className="text-slate-400">Authenticating Authority: Diplomatic Consul stationed in exporting country</p>
                        <p className="text-slate-300">Purpose: Independently certifies commercial invoice valuation to prevent under-invoicing and customs duty fraud in the importing country.</p>
                      </div>
                    )}
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
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl disabled:opacity-40 border border-slate-700"
            >
              ← Prev Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">Free Practice Commercial Sandbox</h2>
              <p className="text-xs text-slate-400">Manipulate discount parameters, retail forms, and trade pipelines freely with zero grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-indigo-300">Interactive Price & Discount Engine</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>List Price:</span>
                  <span className="font-mono text-indigo-400 font-bold">₹{simListPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={250000}
                  step={5000}
                  value={simListPrice}
                  aria-label="List Price"
                  onChange={(e) => setSimListPrice(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Trade Discount:</span>
                  <span className="font-mono text-indigo-400 font-bold">{simTradeDiscountPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={simTradeDiscountPct}
                  aria-label="Trade Discount Percentage"
                  onChange={(e) => setSimTradeDiscountPct(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Cash Discount:</span>
                  <span className="font-mono text-indigo-400 font-bold">{simCashDiscountPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={simCashDiscountPct}
                  aria-label="Cash Discount Percentage"
                  onChange={(e) => setSimCashDiscountPct(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Accounting Output</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Invoice Price (GST Base):</span>
                  <span className="font-mono text-white font-bold">₹{discountCalculation.invoicePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">GST (18% on Invoice):</span>
                  <span className="font-mono text-amber-400 font-bold">₹{discountCalculation.gstAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Cash Discount Saving:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{discountCalculation.cashDiscountAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 bg-emerald-950/60 px-2 rounded border border-emerald-800">
                  <span className="text-emerald-300 font-bold">Net Final Settlement:</span>
                  <span className="font-mono text-emerald-200 font-bold">₹{discountCalculation.netPayable.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-2">
                *Section 15(3) CGST Act rule verified: Only trade discounts specified on invoice reduce GST taxable transaction value.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-mono">
                {activeChallenge.competencyLevel}
              </span>
            </div>

            {/* Hint Trigger Button */}
            {!showExplanation && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <span>💡 Hint ({hintCount}/3)</span>
              </motion.button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-medium text-white mb-6 leading-relaxed">
              {activeChallenge.question}
            </p>

            {/* TYPE 1: Classify / Distinguish / Match (MCQ Options) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswerSubmit(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span>{opt}</span>
                      {showExplanation && i === activeChallenge.correctIndex && (
                        <span className="text-emerald-400 font-bold text-lg">✓</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each document to its matching role:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'port_captain', title: "Issued by Ship's Master upon physical deck loading" },
                    { id: 'shipping_office', title: 'Formal Title Deed issued by Shipping Line Office' },
                    { id: 'chamber_commerce', title: 'Certifies manufacture origin for CEPA tariff reduction' },
                    { id: 'foreign_consulate', title: 'Stamped by importing country consul in Mumbai' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="text-[11px] text-slate-400 mb-2">{target.title}</div>
                      <div className="p-2 bg-slate-900 rounded-lg text-center font-mono font-bold text-sm text-indigo-300">
                        {droppedLabels[target.id] || '[ Drop Document Here ]'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSubmit(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Verify Document Matches
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder into strict chronological sequence:</p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl text-slate-200 text-sm border border-slate-700 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-bold font-mono">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg mt-2"
                >
                  Verify Chronological Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric Calculation Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">{activeChallenge.unit || '₹'}</span>
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter computed value"
                      className="pl-8 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-40"
                  >
                    Verify Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct / Formulation Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs rounded-xl"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 rounded-lg text-xs text-indigo-200 flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== cIdx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above in logical sequence</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSubmit(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-40"
                >
                  Verify Strategy Formulation
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-800/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-300 text-sm font-bold">
                  <span>📖 Progressive Commercial Solution:</span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-300 leading-relaxed"
                    >
                      <span className="font-bold text-indigo-400 font-mono">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-indigo-700/60 hover:bg-indigo-600/80 text-white rounded-lg text-xs font-semibold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 mt-3"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-500/40 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Assessment Complete!</h2>
            <div className="flex justify-center items-center gap-6 py-2">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Final Mastery Score</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 4)}%
                </div>
              </div>
              <div className="h-10 w-px bg-slate-700" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Adaptive Mastery Tier</div>
                <div className="text-xl font-bold text-indigo-300 capitalize">{masteryLevel}</div>
              </div>
            </div>

            {/* Prominent Spaced Repetition (SRS) Badge */}
            <div className="p-4 bg-indigo-900/40 rounded-2xl border border-indigo-500/50 max-w-md mx-auto my-3 flex items-center justify-center gap-3">
              <span className="text-2xl">🔁</span>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold">Recommended Spaced Review</div>
                <div className="text-base font-extrabold text-emerald-300">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </div>
              </div>
            </div>

            {/* Structured Motivational Feedback */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-indigo-700/50 max-w-xl mx-auto mt-2">
              <div className="text-lg font-bold text-amber-300 mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </div>
              <p className="text-xs text-slate-300">
                {errors === 0
                  ? 'Flawless execution across retail classifications, statutory GST discount rules, and international maritime documentation.'
                  : errors <= 3
                  ? 'Strong comprehension of commercial operations with minimal errors. You are well prepared for ISC examinations.'
                  : errors <= 7
                  ? 'Solid foundation established. Review the highlighted corrections to master edge cases.'
                  : 'Every commercial expert starts somewhere. Study the key distinctions below and attempt the challenges again.'}
              </p>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️ Your Targeted Misconception Review:</span>
              </h3>
              <p className="text-xs text-slate-400">These specific conceptual traps appeared during your session. Review the corrections carefully:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-rose-950 space-y-1">
                      <p className="text-xs text-rose-300 font-semibold">❌ Trap: {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Review Timeline */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-900/50 space-y-2">
            <h3 className="text-sm font-bold text-indigo-300">📅 Spaced Repetition Schedule (SM-2 Algorithm)</h3>
            <p className="text-xs text-slate-300">
              Based on your response performance ({errors} error{errors === 1 ? '' : 's'}), these 10 trade nodes are scheduled for automated memory consolidation with interval{' '}
              <span className="text-indigo-400 font-bold">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
              . Regular retrieval practice cements commercial law and documentation recall.
            </p>
          </div>

          {/* Real-World Activity Practicum */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>💼 {REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_CommerceTypesRetailTradeSim;