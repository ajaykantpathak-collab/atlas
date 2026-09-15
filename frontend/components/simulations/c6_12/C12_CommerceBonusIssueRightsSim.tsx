'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals
const NODE_C12_COMM_031 = 'c12_comm_031';
const NODE_C12_COMM_032 = 'c12_comm_032';
const NODE_C12_COMM_033 = 'c12_comm_033';
const NODE_C12_COMM_034 = 'c12_comm_034';
const NODE_C12_COMM_035 = 'c12_comm_035';
const NODE_C12_COMM_036 = 'c12_comm_036';
const NODE_C12_COMM_037 = 'c12_comm_037';
const NODE_C12_COMM_038 = 'c12_comm_038';
const NODE_C12_COMM_039 = 'c12_comm_039';
const NODE_C12_COMM_040 = 'c12_comm_040';

const ALL_NODE_IDS = [
  NODE_C12_COMM_031,
  NODE_C12_COMM_032,
  NODE_C12_COMM_033,
  NODE_C12_COMM_034,
  NODE_C12_COMM_035,
  NODE_C12_COMM_036,
  NODE_C12_COMM_037,
  NODE_C12_COMM_038,
  NODE_C12_COMM_039,
  NODE_C12_COMM_040,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Capital Raising & Financial Markets Odyssey: Bharat Dynamics Ltd.',
  intro: 'Bharat Dynamics Ltd., a premier Indian engineering powerhouse, is embarking on a ₹1,000 Crore mega-expansion for electric mobility and aerospace systems. As the newly appointed Chief Financial Officer (CFO), you must design the optimal corporate finance architecture, tap short-term and long-term capital sources, and navigate the Indian stock market ecosystem under SEBI and Companies Act 2013 regulations.',
  context: 'Manage reserves capitalization (Bonus vs Rights), evaluate debt instruments, choose banking and non-banking short-term credit, supervise IPO-to-trading pipelines, and oversee Demat electronic settlements.',
};

// Discovery Hook Question (curiosity trigger)
const DISCOVERY_QUESTION = {
  question: 'Bharat Dynamics plans a 1:1 Bonus Issue. A retail investor holds 100 shares at ₹500 each (Portfolio = ₹50,000). The investor celebrates: "My wealth just doubled to ₹1,00,000 overnight!" Are they economically richer?',
  options: [
    'Yes — they own twice as many shares, so total wealth immediately doubles to ₹1,00,000',
    'No — share price halves to ~₹250; total holding value remains ₹50,000 as reserves merely convert to capital',
    'Yes — because the company gives them cash dividends alongside each bonus share',
    'No — because bonus shares take away voting rights completely and cannot be sold on stock exchanges'
  ],
  correctIndex: 1,
  hintAfter: "Let's explore the mathematics and balance sheet mechanics of Corporate Finance to see why a Bonus Issue is a reserve recapitalisation!",
};

// Exploration Steps (Brilliant.org style Learn-By-Doing)
const EXPLORATION_STEPS = [
  {
    title: 'Bonus Issue vs. Rights Issue Balance Sheet Lab',
    instruction: 'Adjust the Bonus Ratio and Rights Issue Subscription sliders to observe instantaneous balance sheet reclassifications, fresh cash inflows, and price adjustments.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_031,
  },
  {
    title: 'Corporate Cost of Capital & Tax Shield (Shares vs. Debentures)',
    instruction: 'Toggle between Equity, Preference Shares, and 8% Secured Debentures. Adjust the corporate tax rate to inspect the debt tax shield under Section 36(1)(iii).',
    interactionType: 'click-parts',
    nodeId: NODE_C12_COMM_033,
  },
  {
    title: 'Working Capital Wheel: Bank Facilities vs. Trade Credit & Factoring',
    instruction: 'Simulate liquidity crunches by adjusting inventory, receivables, and cash shortages. Assign Cash Credit, Bill Discounting, Overdraft, or Factoring.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_COMM_035,
  },
  {
    title: 'Secondary Market Ecosystem: SEBI, BSE/NSE & Brokers',
    instruction: 'Trace an order from retail investor to Demat electronic credit (T+1 Settlement) through SEBI regulatory checkposts and Depository Participants (NSDL/CDSL).',
    interactionType: 'drag-position',
    nodeId: NODE_C12_COMM_038,
  },
  {
    title: 'Market Indices, Market Cycles & FII Dynamics',
    instruction: 'Manipulate Foreign Institutional Investor (FII) net inflows/outflows to observe real-time impacts on SENSEX, NIFTY 50, and Bull/Bear market thresholds.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_039,
  },
];

// Predict-Then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If Bharat Dynamics announces a 1:1 Bonus Issue by converting ₹100 Cr of Free Reserves into Share Capital, what happens to the total Shareholders\' Funds (Net Worth)?',
    options: [
      'Increases by ₹100 Crore',
      'Decreases by ₹100 Crore',
      'Remains completely unchanged',
      'Doubles because new shares are created'
    ],
    correctIndex: 2,
    verifyInstruction: 'Drag the Bonus Slider to 1:1 in the simulation below and verify Net Worth on the live Balance Sheet balance gauge!',
    nodeId: NODE_C12_COMM_031,
  },
  {
    question: 'Prediction: If corporate tax increases from 25% to 30%, what happens to the Effective Post-Tax Cost of an 8% Debenture [Kd = Coupon × (1 - Tax)]?',
    options: [
      'Effective cost rises because taxes are higher',
      'Effective cost drops from 6.0% to 5.6% due to higher tax shield savings',
      'Remains constant at 8.0%',
      'Cost becomes zero because debenture interest is mandatory'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Tax Slider from 25% to 30% in the Cost of Capital engine to confirm the post-tax shield calculation!',
    nodeId: NODE_C12_COMM_033,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you execute a Rights Issue at ₹400 per share with a 1:5 ratio, what happens to the Cash/Bank balance and Net Worth?',
    observableOptions: [
      'Both Cash and Net Worth increase because fresh capital enters the company',
      'Reserves decrease while cash stays zero',
      'Total net worth stays constant just like a bonus issue',
      'The company loses money because it offers a discount to market price'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_COMM_031,
  },
  {
    question: 'Observation: In the Demat Settlement simulation, when an equity buy trade occurs on Monday morning under T+1, on which day are shares credited to the buyer\'s BO ID?',
    observableOptions: [
      'Monday afternoon (Same-day T+0)',
      'Tuesday (T+1 Settlement)',
      'Wednesday (T+2 Settlement)',
      'Friday at end-of-week settlement'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_040,
  },
];

// Challenge Interface
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

// Comprehensive Challenge Database (21 challenges across all 10 nodes)
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_COMM_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 63 of the Companies Act 2013, which of the following is a permissible source for issuing fully paid-up Bonus Shares?',
    options: [
      'Revaluation Reserve created by revaluing fixed assets',
      'Free Reserves, Securities Premium Account, or Capital Redemption Reserve',
      'Borrowed funds from commercial banks',
      'Customer advance payments received for contracts'
    ],
    correctIndex: 1,
    explanation: 'Section 63 explicitly permits bonus issues only out of free reserves, securities premium account, or capital redemption reserve. It prohibits bonus issues out of revaluation reserves.',
    hints: [
      'Think about genuinely accumulated operational profits rather than artificial asset revaluation.',
      'Securities premium and free reserves represent realized surplus.',
      'Section 63 mandates free reserves, securities premium, or capital redemption reserve.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_COMM_040,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the three interconnected accounts required for online stock trading in India to their primary operational functions.',
    dragItems: [
      { label: 'Demat Account (NSDL/CDSL)', targetId: 'part_custody' },
      { label: 'Trading Account (Broker)', targetId: 'part_order' },
      { label: 'Bank Savings/Current A/c', targetId: 'part_money' },
    ],
    correctMapping: {
      part_custody: 'Demat Account (NSDL/CDSL)',
      part_order: 'Trading Account (Broker)',
      part_money: 'Bank Savings/Current A/c',
    },
    explanation: 'Online trading operates via a three-tier architecture: the Trading Account places orders, the Bank Account transfers money, and the Demat Account holds electronic securities.',
    hints: [
      'Where do your electronic shares actually sit?',
      'Which account connects your terminal to the BSE/NSE order matching book?',
      'Which account handles the cash consideration on settlement day?'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_COMM_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Retained Earnings classified as an "Internal" source of finance, unlike Debentures or Public Deposits?',
    options: [
      'Because they are borrowed from domestic Indian banks rather than foreign institutions',
      'Because they are generated organically from operating profits without approaching external creditors or issuing new instruments',
      'Because they do not require payment of government taxes',
      'Because they are only accessible to company directors and promoters'
    ],
    correctIndex: 1,
    explanation: 'Retained earnings (ploughing back of profits) arise internally from the company\'s dividend retention policy. No outside investors or lenders supply the funds.',
    hints: [
      'Consider who provides the money — an external party or the company\'s own operations?',
      'It represents post-tax profit kept in the business instead of paid as dividend.',
      'No prospectus, underwriting, or external liability is involved.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_COMM_039,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly pairs India\'s benchmark stock indices with their respective stock exchanges and base parameters?',
    options: [
      'SENSEX = NSE (50 stocks, Base 1000); NIFTY = BSE (30 stocks, Base 100)',
      'SENSEX = BSE (30 stocks, Base 1978-79 = 100); NIFTY 50 = NSE (50 stocks, Base 1995 = 1000)',
      'SENSEX = SEBI (100 stocks, Base 2000); NIFTY = RBI (500 stocks, Base 2010)',
      'SENSEX = MCX (Commodities); NIFTY = CDSL (Dematerialized units)'
    ],
    correctIndex: 1,
    explanation: 'BSE SENSEX tracks 30 blue-chip stocks with 1978-79 as base year (100). NSE NIFTY 50 tracks 50 liquid stocks with 1995 as base year (1000).',
    hints: [
      'Remember: Sensex belongs to Dalal Street (BSE) and Nifty belongs to NSE.',
      'Sensex is older (base 100, 1978-79); Nifty is newer (base 1000, 1995).',
      'Sensex has 30 constituent companies; Nifty has 50.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_COMM_037,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequential journey of an equity share from corporate capital raising to secondary market trading.',
    sortItems: [
      'Company files Red Herring Prospectus (RHP) with SEBI for IPO',
      'Primary market subscription and allotment to investors',
      'Listing of equity shares on BSE/NSE trading platform',
      'Secondary market trading between investors on T+1 settlement'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The primary issue (IPO) creates shares and raises funds for the company. Subsequent trading on stock exchanges occurs in the secondary market without company fund flows.',
    hints: [
      'A company must first get regulatory clearance before collecting IPO subscriptions.',
      'Listing occurs after allotment is finalized.',
      'Secondary market trading can only happen once the stock is listed on an exchange.'
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_COMM_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 12 of the SEBI Act 1992, who is legally required to obtain a certificate of registration from SEBI to operate in the capital market?',
    options: [
      'Only retail investors buying more than 1,000 shares',
      'Stock brokers, sub-brokers, merchant bankers, depository participants, and underwriters',
      'Only foreign companies listed on NASDAQ',
      'All commercial bank tellers handling cash deposits'
    ],
    correctIndex: 1,
    explanation: 'Section 12 of the SEBI Act 1992 mandates registration for all market intermediaries including stock brokers, merchant bankers, DPs, and underwriters.',
    hints: [
      'Think of the intermediaries who execute trades or manage issues.',
      'Investors do not register with SEBI; their agents and facilitators must.',
      'All market intermediaries are governed by SEBI registration.'
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_COMM_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Ludhiana woollen textile mill holds ₹1.5 Crore in finished cardigans in its warehouse. Which commercial bank short-term facility is specifically secured by the hypothecation of this inventory?',
    options: [
      'Bank Overdraft against Fixed Deposit',
      'Cash Credit (CC) limit with monthly stock statements',
      'Bill Discounting of promissory notes',
      'Long-term term loan from IDBI'
    ],
    correctIndex: 1,
    explanation: 'Cash Credit is granted against the hypothecation of stock/inventory where drawing power is assessed via monthly stock statements.',
    hints: [
      'The facility is secured directly by physical merchandise/goods.',
      'The borrower retains possession while the bank maintains a legal charge.',
      'This revolving facility for inventory is Cash Credit.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_COMM_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Motors Ltd. has 20 Lakh equity shares of ₹10 face value trading at ₹600. It offers a 1:4 Rights Issue at a subscription price of ₹400 per share. How much fresh cash capital (in ₹ Crores) enters the company treasury?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'Crores',
    explanation: '1:4 ratio on 20 Lakh shares = 20 / 4 = 5 Lakh new shares. Fresh capital raised = 5,00,000 shares × ₹400 = ₹20,00,00,000 = ₹20 Crore.',
    hints: [
      'Find the number of new rights shares issued: 20 Lakh shares ÷ 4.',
      'Multiply the new rights shares (5 Lakh) by the subscription price (₹400).',
      '₹20,00,00,000 equals 20 Crores.'
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_COMM_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Steel issues 8% Non-Convertible Debentures (NCDs) of ₹100 Crore. If the corporate income tax rate is 25%, what is the effective post-tax cost of debt [Kd = Coupon × (1 - Tax)] in percentage?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Interest is tax-deductible under Section 36(1)(iii). Post-tax cost of debt = 8% × (1 - 0.25) = 8% × 0.75 = 6.0%.',
    hints: [
      'Debenture interest reduces taxable profit, creating a tax shield.',
      'Multiply the coupon rate by (1 - 0.25).',
      '8 × 0.75 = 6%.'
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_COMM_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An auto-parts maker sells ₹80 Lakh of invoices due in 60 days from Maruti Suzuki to SBI Global Factors under a Non-Recourse Factoring agreement. If Maruti unexpectedly defaults, who absorbs the loss?',
    options: [
      'The auto-parts maker must immediately refund SBI Global Factors with interest',
      'SBI Global Factors absorbs the credit loss because non-recourse transfers credit risk to the factor',
      'Maruti Suzuki\'s directors personally pay from their personal bank accounts within 24 hours',
      'SEBI compensates the manufacturer from the Investor Protection Fund'
    ],
    correctIndex: 1,
    explanation: 'In Non-Recourse Factoring, the factor assumes the credit risk of debtor insolvency. In Recourse Factoring, the client bears the risk.',
    hints: [
      'Pay attention to the term "Non-Recourse".',
      'Non-recourse means the factor cannot seek recourse against the seller if the buyer defaults.',
      'The factor takes full credit risk.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_COMM_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar cell manufacturing unit in Coimbatore requires ₹35 Crore for imported German machinery with a 15-year life and 2-year setup. Which financing institution and mechanism is most appropriate?',
    options: [
      'A 30-day bill discounting facility with a local co-operative society',
      'A 12-year project loan with a 2-year moratorium from SIDBI/IREDA',
      'A 180-day Inter-Corporate Deposit from an unlisted group entity',
      'Customer advances collected from retail buyers'
    ],
    correctIndex: 1,
    explanation: 'Development Financial Institutions (DFIs) like SIDBI/IREDA provide 5-25 year project finance with moratorium periods matching long-gestation capital expenditure.',
    hints: [
      'Capital assets require long-term matching tenure, not 30-day credit.',
      'A 2-year setup period requires a moratorium where principal is not repaid immediately.',
      'Specialized DFIs (SIDBI/IREDA) handle term project finance.'
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_COMM_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In March 2020, the BSE SENSEX fell from 42,000 to 26,000 within 4 weeks (a 38% decline). How is this market phenomenon officially characterized?',
    options: [
      'A normal daily volatility oscillation',
      'A Bear Market (sustained decline exceeding the 20% peak-to-trough threshold)',
      'A Bull Market rally with temporary profit booking',
      'A Forward Delivery contract default by BSE brokers'
    ],
    correctIndex: 1,
    explanation: 'A bear market is defined by financial convention as a sustained downturn of 20% or more from recent peak levels, marked by widespread pessimism and selling pressure.',
    hints: [
      'Calculate the percentage drop: (42,000 - 26,000) / 42,000 = 38%.',
      'A drop greater than 20% enters bear market territory.',
      'The animal that swipes downward represents this market state.'
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_COMM_038,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the regulatory definition of SEBI by assembling the three statutory pillars of its mandate under Section 11 of the SEBI Act 1992.',
    availableParts: ['Protect Investor Interests', 'Promote Market Development', 'Regulate Securities Market', 'Fix Share Market Prices', 'Guarantee Profit Returns'],
    targetState: 'Protect Investor Interests Promote Market Development Regulate Securities Market',
    validationHint: 'Select the 3 legitimate statutory duties of SEBI in correct order (Protection, Development, Regulation).',
    explanation: 'Section 11 sets forth SEBI\'s tripartite mandate: (1) Protect the interests of investors, (2) Promote the development of securities markets, and (3) Regulate the securities market.',
    hints: [
      'SEBI does not fix market prices or guarantee profits.',
      'Its 3 core statutory pillars are Protection, Development, and Regulation.',
      'Combine: Protect Investor Interests + Promote Market Development + Regulate Securities Market.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_COMM_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluating the opportunity cost of Retained Earnings (Kr): Why is it dangerous for management to treat retained profits as "free zero-cost capital"?',
    options: [
      'Because banks charge penalty interest if companies retain too much profit',
      'Because shareholders expect the company to earn at least their required return (Ke); low returns destroy shareholder wealth',
      'Because the government confiscates retained earnings after 3 financial years',
      'Because retained earnings can only be kept as physical currency notes in bank vaults'
    ],
    correctIndex: 1,
    explanation: 'Retained earnings have an implicit opportunity cost (Kr ≈ Ke). If management invests retained funds in sub-par projects yielding less than the cost of equity, shareholder value is destroyed.',
    hints: [
      'Shareholders could have reinvested those dividends elsewhere if distributed.',
      'The opportunity cost equals what shareholders forfeit in outside markets.',
      'Management must earn at least the cost of equity on retained funds.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_COMM_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish between a Bonus Issue and a Stock Split on accounting and statutory parameters:',
    options: [
      'Bonus issue requires fresh cash payments; stock split is completely free',
      'Bonus issue transfers Free Reserves to Paid-Up Capital (retaining face value); Stock Split subdivides the Face Value without altering reserves or capital totals',
      'Bonus issue increases total Net Worth by 50%; stock split reduces Net Worth by 50%',
      'Bonus issue is governed by RBI; stock split is governed by IRDAI'
    ],
    correctIndex: 1,
    explanation: 'In a bonus issue, reserves are capitalized into share capital (face value remains ₹10). In a stock split, face value is reduced (e.g., from ₹10 to ₹1) while reserves and total capital remain identical.',
    hints: [
      'Check what happens to the nominal Face Value per share.',
      'Look at the internal movement within Shareholders\' Funds.',
      'Bonus issue alters Reserves & Surplus; Stock Split only changes Face Value.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_COMM_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A cyclical steel manufacturing company with volatile operating earnings (EBIT) is debating between 100% Debenture financing vs. an Equity Rights Issue for a ₹500 Cr plant. Which critical risk makes debentures hazardous?',
    options: [
      'Debenture holders will take over voting control in the Annual General Meeting',
      'Fixed interest charge must be serviced regardless of losses, risking debt default and insolvency under IBC 2016 during industry downcycles',
      'Debentures cannot be redeemed for 50 years under Companies Act rules',
      'Interest on debentures is taxed at 80% punitive rates'
    ],
    correctIndex: 1,
    explanation: 'Debenture interest is a fixed legal charge. During cyclical downturns when EBIT plunges, fixed interest commitments can push the company into default and insolvency under IBC 2016.',
    hints: [
      'Consider what happens during a severe economic recession when revenue collapses.',
      'Can debenture interest be skipped if profits are zero?',
      'Fixed obligations in cyclical industries create severe solvency risk.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_COMM_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under Section 76 of the Companies Act 2013, an eligible public company accepts Public Deposits from retail citizens. What is the statutory ceiling on deposit tenure and total amount?',
    options: [
      'Tenure up to 10 years; Amount up to 100% of turnover',
      'Tenure maximum 36 months (3 years); Amount capped at 25% of aggregate Paid-Up Capital + Free Reserves (+10% from members)',
      'Tenure minimum 5 years; Amount unlimited provided interest is below 5%',
      'Tenure 90 days only; Capped at ₹10 Lakh per company'
    ],
    correctIndex: 1,
    explanation: 'The Companies (Acceptance of Deposits) Rules 2014 mandate a maximum tenure of 36 months and cap public deposits at 25% of net worth (paid-up capital + free reserves + securities premium).',
    hints: [
      'Public deposits are medium/short-term unsecured funds.',
      'The maximum tenure is 3 years.',
      'The standard general public limit is 25% of net worth.'
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_COMM_039,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During 2022, Foreign Institutional Investors (FIIs) net sold ₹1.2 Lakh Crore in Indian equities, yet the NIFTY index remained remarkably resilient. What structural market development explains this cushion?',
    options: [
      'SEBI banned all stock sales for foreign investors',
      'Domestic Institutional Investors (DIIs) and retail investors sustained massive inflows through monthly Mutual Fund SIPs (~₹15,000+ Cr/month)',
      'The RBI purchased all listed equities directly onto its sovereign balance sheet',
      'Stock exchanges automatically converted all equity shares into fixed debentures'
    ],
    correctIndex: 1,
    explanation: 'The massive surge in domestic Systematic Investment Plans (SIPs) by Indian retail investors provided a formidable counterbalancing liquidity wall that absorbed foreign capital outflows.',
    hints: [
      'Look at the behavior of domestic retail and institutional investors.',
      'What regular monthly investment mechanism grew exponentially in India post-2020?',
      'Domestic Institutional Investors (DIIs) absorbed the selling pressure.'
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_COMM_035,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Compare a Bank Overdraft on a Current Account vs. a Commercial Bank Cash Credit (CC) facility for a multi-crore business:',
    options: [
      'Overdraft charges interest on the full sanctioned limit; Cash Credit charges no interest ever',
      'Cash Credit is a separate account secured by hypothecation of business stock/inventory; Overdraft is attached to an existing Current A/c secured by collateral like FDs/securities',
      'Cash Credit is only given to government departments; Overdraft is for foreign tourists',
      'Overdraft is for 20 years; Cash Credit is settled within 24 hours'
    ],
    correctIndex: 1,
    explanation: 'Cash Credit is tied to hypothecated inventory with monthly drawing power statements. Overdraft is a limit extended on a regular Current Account against collateral like fixed deposits or property.',
    hints: [
      'Examine the underlying security: stock hypothecation vs. financial collateral.',
      'Look at account structure: separate CC account vs. existing Current Account.',
      'Both charge interest only on the actual amount utilized.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_COMM_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A company executive privy to confidential Q3 profit doubling buys 50,000 shares 2 days before results announcement. Under SEBI PIT Regulations 2015, how is this classified and what function is invoked?',
    options: [
      'Legal arbitrage under SEBI Developmental Functions',
      'Illegal Insider Trading based on Unpublished Price Sensitive Information (UPSI); SEBI executes its Protective Function to penalize and debar',
      'Standard Employee Stock Option exercise under LODR guidelines',
      'Forward Delivery transaction permitted by BSE byelaws'
    ],
    correctIndex: 1,
    explanation: 'Trading on Unpublished Price Sensitive Information (UPSI) violates SEBI (Prohibition of Insider Trading) Regulations 2015. SEBI invokes its Protective function to preserve market integrity and fairness.',
    hints: [
      'The executive traded using confidential, unreleased financial knowledge.',
      'This violates equal access to information.',
      'SEBI\'s Protective function prosecutes insider trading.'
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_COMM_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design an optimal executive incentive and talent retention package for a high-growth AI startup looking to align tech leaders with long-term company valuation without depleting upfront cash reserves:',
    options: [
      'Pay immediate cash bonuses funded via 3-month Inter-Corporate Deposits',
      'Grant Employee Stock Option Plans (ESOPs) with a 3-year vesting schedule and Sweat Equity for founding architects of patented algorithms',
      'Distribute 10-year unsecured bearer debentures',
      'Issue irredeemable preference shares with 20% guaranteed annual payout'
    ],
    correctIndex: 1,
    explanation: 'ESOPs (governed by SEBI SBEB Regulations 2021) align employee wealth with equity valuation over multi-year vesting periods, while Sweat Equity rewards intellectual property contributions without cash outflow.',
    hints: [
      'The company wants zero immediate cash strain while aligning multi-year incentives.',
      'Options that vest over 3-5 years prevent employee attrition.',
      'ESOPs and Sweat Equity turn key personnel into equity partners.'
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_COMM_031,
  title: 'Corporate Finance, Capital Structure & Indian Stock Markets',
  definition: 'Comprehensive mastery of long-term and short-term sources of business finance, equity corporate actions (Bonus, Rights, ESOP, Sweat Equity, QIP), debentures, financial institution lending, commercial banking facilities, non-bank short term sources, stock exchange architecture, SEBI regulation, market indices (SENSEX/NIFTY), and Demat electronic settlement.',
  eli5: 'Think of corporate finance like fueling a spaceship: Bonus issues cut your existing fuel tank into smaller equal cubes without adding fuel. Rights issues let your existing co-pilots buy extra fuel at a discount. Debentures are borrowed fuel tanks with fixed meter charges. The Stock Exchange is the cosmic spaceport where tickets are bought and sold, SEBI is the safety space police, and your Demat account is the digital locker storing your space tickets electronically!',
  misconceptions: [
    {
      misconception: 'A Bonus Issue makes shareholders richer because their number of shares doubles.',
      correction: 'A Bonus Issue is a reserve recapitalization. Total net worth remains unchanged, and market price per share adjusts downward proportionally (total portfolio value is preserved).'
    },
    {
      misconception: 'Retained earnings are completely free money with zero cost of capital.',
      correction: 'Retained earnings carry an implicit opportunity cost (Kr ≈ Ke). Shareholders forfeit alternative returns if the company invests retained funds at sub-par yields.'
    },
    {
      misconception: 'SENSEX and NIFTY 50 are stock exchanges.',
      correction: 'SENSEX and NIFTY are benchmark statistical indices measuring market performance on the BSE and NSE respectively; they are not exchanges themselves.'
    },
    {
      misconception: 'Cash Credit and Bank Overdraft are identical facilities with different names.',
      correction: 'Cash Credit is a separate borrowing account secured by hypothecated stock/inventory; Overdraft is an attached limit on an existing Current Account against securities or fixed deposits.'
    },
    {
      misconception: 'A Demat Account and a Trading Account are the same thing.',
      correction: 'A Trading Account places orders on the exchange; a Demat Account electronically holds the securities in custody with depositories (NSDL/CDSL).'
    }
  ],
  diagnosticQuestions: [
    { question: 'What happens to total net worth after a 1:1 Bonus Issue?', options: ['Doubles', 'Halves', 'Remains unchanged', 'Increases by 50%'], correctIndex: 2 },
    { question: 'Why is debenture interest cheaper than equity dividend after tax?', options: ['Debentures are riskier for the firm', 'Interest is tax-deductible under Section 36(1)(iii)', 'Dividends carry 0% return', 'SEBI fixes debenture rates at 1%'], correctIndex: 1 },
    { question: 'Which facility is secured by hypothecation of stock?', options: ['Bank Overdraft', 'Cash Credit', 'Bill Discounting', 'Factoring'], correctIndex: 1 },
    { question: 'Who is the apex financial institution for MSME term loans in India?', options: ['NABARD', 'EXIM Bank', 'SIDBI', 'IRFC'], correctIndex: 2 },
    { question: 'What is the standard equity trade settlement cycle in India since 2023?', options: ['T+0', 'T+1', 'T+2', 'T+5'], correctIndex: 1 },
    { question: 'Who maintains the central electronic ledger for demat shares in India?', options: ['SEBI', 'Reserve Bank of India', 'NSDL and CDSL', 'Individual Stock Brokers'], correctIndex: 2 },
    { question: 'What index benchmark belongs to the National Stock Exchange (NSE)?', options: ['SENSEX', 'NIFTY 50', 'BSE 500', 'NASDAQ'], correctIndex: 1 },
    { question: 'Non-recourse factoring protects the seller from:', options: ['Invoice stamp duty', 'Debtor default and credit risk', 'All taxation', 'Bank interest charges'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of CISCE Class 12 Commerce corporate finance, debt vs equity, banking/non-banking credit, stock markets, SEBI regulations, and Demat operations.',
};

// Real-World Analyst Project Arc
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Financial Officer Portfolio Simulation: Tata Motors EV Spin-Off',
  description: 'Tata Motors plans to raise ₹3,000 Crore to expand its electric commercial vehicle battery manufacturing ecosystem in Pune. As Senior Investment Banking Advisor, create the comprehensive capital blueprint.',
  steps: [
    'Recommend the optimal mix between 1:5 Rights Issue to existing shareholders and 7.5% Secured NCDs (Debentures).',
    'Structure a 3-tier working capital framework combining Cash Credit for raw lithium cell inventory and Factoring for state transport undertaking receivables.',
    'Formulate an ESOP allocation pool (up to 5% of equity) under SEBI SBEB Regulations 2021 to retain electric battery chemical engineers.',
    'Draft the T+1 Demat settlement and listing roadmap on NSE NEAT platform adhering to SEBI LODR 2015 disclosure mandates.'
  ],
};

function C12_CommerceBonusIssueRightsSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_COMM_031,
    title = DEFAULT_PROPS.title || 'Corporate Finance & Stock Markets',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['comm'] || { name: 'Commerce', emoji: '📈', color: 'emerald' };

  // Phase navigation: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and reveal
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and drop & construction states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Live Simulation Interactive Variables
  const [bonusRatio, setBonusRatio] = useState<number>(0);
  const [rightsShares, setRightsShares] = useState<number>(0);
  const [rightsPrice, setRightsPrice] = useState<number>(400);
  const [taxRate, setTaxRate] = useState<number>(25);
  const [debentureCoupon, setDebentureCoupon] = useState<number>(8);
  const [fiiFlow, setFiiFlow] = useState<number>(1000);
  const [selectedFacility, setSelectedFacility] = useState<string>('cash_credit');
  const [inventoryValue, setInventoryValue] = useState<number>(200);
  const [receivablesValue, setReceivablesValue] = useState<number>(150);
  const [temporaryCashGap, setTemporaryCashGap] = useState<number>(50);
  const [settlementStep, setSettlementStep] = useState<number>(0);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Dynamic Financial Calculations
  const calculatedBalanceSheet = useMemo(() => {
    const baseShareCapital = 100;
    const baseReserves = 500;
    const baseSharesCount = 10;
    const basePrice = 600;

    const bonusNewShares = baseSharesCount * bonusRatio;
    const bonusCapitalTransfer = bonusNewShares * 10;
    const postBonusReserves = Math.max(0, baseReserves - bonusCapitalTransfer);
    const postBonusCapital = baseShareCapital + bonusCapitalTransfer;

    const rightsNewShares = rightsShares;
    const rightsCashInflow = rightsNewShares * rightsPrice;
    const rightsNominalCapital = rightsNewShares * 10;
    const rightsSecuritiesPremium = rightsNewShares * (rightsPrice - 10);

    const totalShareCapital = postBonusCapital + rightsNominalCapital;
    const totalReserves = postBonusReserves + rightsSecuritiesPremium;
    const totalNetWorth = totalShareCapital + totalReserves;
    const totalShares = baseSharesCount + bonusNewShares + rightsNewShares;
    
    const initialMarketCap = baseSharesCount * basePrice;
    const newMarketCap = initialMarketCap + rightsCashInflow;
    const theoreticalExPrice = totalShares > 0 ? Math.round(newMarketCap / totalShares) : basePrice;

    return {
      shareCapital: totalShareCapital,
      reserves: totalReserves,
      netWorth: totalNetWorth,
      totalShares: totalShares,
      exPrice: theoreticalExPrice,
      cashAdded: rightsCashInflow,
    };
  }, [bonusRatio, rightsShares, rightsPrice]);

  const calculatedCostOfDebt = useMemo(() => {
    const postTaxCost = debentureCoupon * (1 - taxRate / 100);
    const equityCostBenchmark = 14.0;
    const taxShieldSavings = debentureCoupon * (taxRate / 100);
    return {
      preTax: debentureCoupon,
      postTax: parseFloat(postTaxCost.toFixed(2)),
      taxShield: parseFloat(taxShieldSavings.toFixed(2)),
      equityCost: equityCostBenchmark,
    };
  }, [debentureCoupon, taxRate]);

  const calculatedMarketIndex = useMemo(() => {
    const baseSensex = 70000;
    const baseNifty = 21000;
    const indexImpact = (fiiFlow / 1000) * 450;
    const currentSensex = Math.round(baseSensex + indexImpact);
    const currentNifty = Math.round(baseNifty + indexImpact / 3.3);
    const marketState = currentSensex >= 73000 ? 'Bull Market 🐂' : currentSensex <= 56000 ? 'Bear Market 🐻' : 'Consolidation / Neutral ⚖️';

    return {
      sensex: currentSensex,
      nifty: currentNifty,
      marketState,
    };
  }, [fiiFlow]);

  // Load Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive Difficulty via BKT
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

  // Canvas 2D Live Animation Loop for Financial Trading Heartbeat
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseRadius = 4 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 20, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('SEBI / T+1 Live Feed Active', 10, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Escalating hints callback
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // Discovery Answer Callback
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic reasoning!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Navigation callbacks
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive finance lab. Manipulate the sliders to discover corporate balance sheet mechanics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with market parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing CISCE Competency Assessment Challenges. Apply your corporate finance skills!');
  }, []);

  // Predict-Then-Check Callbacks
  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb market observation!' : 'Examine the financial figures closely.');
  }, []);

  // Complete Callback
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Corporate Finance and Indian Stock Markets.');
  }, [errors, onComplete]);

  // Next Challenge Callback
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

  // Auto Hint Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Master Answer Handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      isCorrect = (answer as string).trim() === activeChallenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant understanding.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the complete step-by-step statutory rationale.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Drag & Sort Handlers
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
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  // Slider change callbacks for real-time reactivity
  const handleBonusSlider = useCallback((val: number) => {
    setBonusRatio(val);
    audioManager.play('balance');
  }, []);

  const handleRightsSlider = useCallback((val: number) => {
    setRightsShares(val);
    audioManager.play('count');
  }, []);

  const handleTaxSlider = useCallback((val: number) => {
    setTaxRate(val);
    audioManager.play('tap');
  }, []);

  const handleFiiSlider = useCallback((val: number) => {
    setFiiFlow(val);
    audioManager.play('swoop');
  }, []);

  const handleFacilitySelect = useCallback((facility: string) => {
    setSelectedFacility(facility);
    audioManager.play('pop');
    const messages: Record<string, string> = {
      cash_credit: 'Cash Credit: Secured by hypothecated inventory with monthly drawing power statements.',
      bill_discounting: 'Bill Discounting: Bank advances immediate cash on trade bills of exchange before maturity.',
      overdraft: 'Overdraft: Current account overdrawn against fixed deposits or financial collateral.',
      factoring: 'Factoring: Outright sale of receivables to SBI Global Factors with collection management.',
    };
    speechManager.speak(messages[facility] || '');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleReflectionChange = useCallback((index: number, val: string) => {
    setReflectionAnswers(prev => ({ ...prev, [index]: val }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Motivational feedback helper
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'You demonstrated flawless mastery of corporate actions, cost of debt tax shields, and secondary markets!' };
    if (errors <= 3) return { title: 'Great work!', desc: 'You possess strong corporate finance competence. Review your diagnostic traps below to achieve flawless precision.' };
    if (errors <= 7) return { title: 'Good effort!', desc: 'Every error is a stepping stone. Revisit the interactive labs and focus on the statutory distinctions.' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Mastering Indian corporate finance takes practice. Re-examine the interactive balance sheet and test again!' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Top Header Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-3xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 12 Commerce
              </span>
              <span className="text-xs font-medium text-slate-400">CISCE 2026 Ready</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Dynamic Mode Indicators */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 text-xs font-bold rounded-xl border bg-indigo-950/80 text-indigo-300 border-indigo-700 uppercase"
          >
            Mode: {phase}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 text-xs font-bold rounded-xl border uppercase ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-amber-950 text-amber-400 border-amber-700'
                  : 'bg-rose-950 text-rose-400 border-rose-700'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/80 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚀</span>
              <h2 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 <span className="font-semibold text-slate-200">Executive Context:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/40">
                Curiosity Hook Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">(Low-stakes, ungraded exploration)</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl border bg-slate-950/90 border-indigo-900/80 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={`font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Exceptional Intuition!' : '💡 Key Insight:'}
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    {discoveryCorrect
                      ? 'You correctly understood that bonus shares reclassify reserves without creating economic cash wealth.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 text-sm whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Guided Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Stage Indicators */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="font-bold text-indigo-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-emerald-400 w-6' : i < currentSlide ? 'bg-indigo-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Slide Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-sm font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── Interactive Visualization Step 0: Bonus vs Rights Balance Sheet ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Predict Then Check Box */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800">
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                        Predict-Then-Check Exercise
                      </p>
                      <p className="text-sm text-slate-200 font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(idx)}
                            aria-label={`Predict option ${idx + 1}`}
                            className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left rounded-lg text-xs font-medium text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Control Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Bonus Issue Ratio</span>
                        <span className="text-emerald-400">{bonusRatio === 0 ? 'None (0:1)' : `${bonusRatio}:1 Ratio`}</span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={2}
                        step={1}
                        value={bonusRatio}
                        onChange={e => handleBonusSlider(Number(e.target.value))}
                        aria-label="Set Bonus Issue Ratio"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0:1 (None)</span>
                        <span>1:1 (+10L sh)</span>
                        <span>2:1 (+20L sh)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Rights Issue Shares</span>
                        <span className="text-cyan-400">{rightsShares} Lakh Shares</span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={rightsShares}
                        onChange={e => handleRightsSlider(Number(e.target.value))}
                        aria-label="Set Rights Issue New Shares"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0 Lakhs</span>
                        <span>5 Lakhs</span>
                        <span>10 Lakhs</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Rights Issue Price</span>
                        <span className="text-amber-400">₹{rightsPrice} / Share</span>
                      </label>
                      <input
                        type="range"
                        min={300}
                        max={600}
                        step={25}
                        value={rightsPrice}
                        onChange={e => setRightsPrice(Number(e.target.value))}
                        aria-label="Set Rights Issue Subscription Price"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>₹300 (Deep Disc.)</span>
                        <span>₹450</span>
                        <span>₹600 (Market)</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Representation Live Balance Sheet & Price Adjustment */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Visual Balance Sheet Cards */}
                    <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Balance Sheet: Shareholders' Funds</span>
                        <span className="text-emerald-400 text-xs">Sec. 63 / 62 Co. Act</span>
                      </h4>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-300">Paid-Up Equity Share Capital:</span>
                          <span className="font-bold text-white font-mono">₹{calculatedBalanceSheet.shareCapital} Lakhs</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-300">Reserves & Surplus:</span>
                          <span className="font-bold text-indigo-400 font-mono">₹{calculatedBalanceSheet.reserves} Lakhs</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-emerald-900/50 bg-emerald-950/20">
                          <span className="text-emerald-300 font-bold">Total Net Worth:</span>
                          <span className="font-black text-emerald-400 font-mono text-sm">₹{calculatedBalanceSheet.netWorth} Lakhs</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-cyan-900/50 bg-cyan-950/20">
                          <span className="text-cyan-300 font-semibold">Fresh Cash Raised into Bank:</span>
                          <span className="font-bold text-cyan-400 font-mono">₹{calculatedBalanceSheet.cashAdded} Lakhs</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Price Adjustment & Comparison Diagram (SVG 1) */}
                    <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Market Price Per Share (Ex-Bonus / Ex-Rights)
                        </h4>
                        <div className="mt-4 flex items-baseline gap-3">
                          <span className="text-3xl font-black text-amber-400 font-mono">
                            ₹{calculatedBalanceSheet.exPrice}
                          </span>
                          <span className="text-xs text-slate-400 line-through">Base ₹600</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Total Shares: {calculatedBalanceSheet.totalShares} Lakhs
                          </span>
                        </div>
                      </div>

                      {/* SVG 1: Bonus & Rights Transformation */}
                      <svg viewBox="0 0 350 90" className="w-full bg-slate-900 rounded-lg border border-slate-800 p-2">
                        <defs>
                          <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                          </marker>
                        </defs>
                        <rect x="10" y="15" width="100" height="60" rx="6" fill="#312e81" stroke="#6366f1" />
                        <text x="60" y="42" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Original 10L Sh</text>
                        <text x="60" y="58" textAnchor="middle" fill="#818cf8" fontSize="8">@ ₹600 (₹60 Cr)</text>

                        <path d="M 120 45 L 155 45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow1)" />

                        <rect x="165" y="15" width="170" height="60" rx="6" fill="#064e3b" stroke="#10b981" />
                        <text x="250" y="40" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                          {calculatedBalanceSheet.totalShares}L Shares @ ₹{calculatedBalanceSheet.exPrice}
                        </text>
                        <text x="250" y="58" textAnchor="middle" fill="#34d399" fontSize="8">
                          Market Cap: ₹{Math.round((calculatedBalanceSheet.totalShares * calculatedBalanceSheet.exPrice) / 100)} Cr
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Observation check */}
                  {bonusRatio > 0 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-400 mb-2">🔍 Observation Check:</p>
                      <p className="text-xs text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-950 border border-slate-700 text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── Interactive Visualization Step 1: Shares vs Debentures & Tax Shield (SVG 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Debenture Coupon Interest Rate</span>
                        <span className="text-amber-400">{debentureCoupon}% p.a.</span>
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={12}
                        step={0.5}
                        value={debentureCoupon}
                        onChange={e => setDebentureCoupon(Number(e.target.value))}
                        aria-label="Set Debenture Coupon Rate"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>5% (AAA Rated)</span>
                        <span>8%</span>
                        <span>12% (High Yield)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Corporate Tax Rate (Sec. 36(1)(iii) Shield)</span>
                        <span className="text-emerald-400">{taxRate}%</span>
                      </label>
                      <input
                        type="range"
                        min={15}
                        max={35}
                        step={1}
                        value={taxRate}
                        onChange={e => handleTaxSlider(Number(e.target.value))}
                        aria-label="Set Corporate Income Tax Rate"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>15% (New Mfg)</span>
                        <span>25% (Standard)</span>
                        <span>35% (Base+Surcharge)</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG 2: Section 36(1)(iii) Debt Tax Shield Visual Mechanism */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tax Shield Architecture (Section 36(1)(iii) Income Tax Act)
                    </h4>
                    <svg viewBox="0 0 500 110" className="w-full bg-slate-900 rounded-lg border border-slate-800 p-2">
                      {/* Pre-tax bar */}
                      <rect x="20" y="20" width="180" height="30" rx="4" fill="#d97706" />
                      <text x="110" y="39" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        Pre-Tax Coupon: {calculatedCostOfDebt.preTax}%
                      </text>

                      {/* Minus sign */}
                      <text x="215" y="40" fill="#94a3b8" fontSize="16" fontWeight="bold">−</text>

                      {/* Tax shield block */}
                      <rect x="235" y="20" width="100" height="30" rx="4" fill="#059669" />
                      <text x="285" y="39" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                        Tax Shield ({taxRate}%): {calculatedCostOfDebt.taxShield}%
                      </text>

                      {/* Equals sign */}
                      <text x="350" y="40" fill="#94a3b8" fontSize="16" fontWeight="bold">=</text>

                      {/* Net post tax cost */}
                      <rect x="370" y="20" width="110" height="30" rx="4" fill="#4338ca" />
                      <text x="425" y="39" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        Net Kd = {calculatedCostOfDebt.postTax}%
                      </text>

                      {/* Sub-label explanation */}
                      <text x="250" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Formula: Kd = Coupon × (1 − Tax) = {debentureCoupon}% × (1 − {taxRate / 100}) = {calculatedCostOfDebt.postTax}% Effective Cost
                      </text>
                    </svg>
                  </div>

                  {/* Statutory Distinction Cards */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-300 mb-1">Key ISC Statutory Differences:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <strong className="text-slate-200">Equity Shares:</strong> Ownership capital, variable dividend from post-tax profit, voting rights, permanent capital.
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <strong className="text-slate-200">Debentures (Sec 2(30)):</strong> Loan capital, fixed charge interest, no voting rights, DRR reserve under Rule 18.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Interactive Visualization Step 2: Working Capital Selector ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'cash_credit', label: 'Cash Credit (CC)', desc: 'Inventory hypothecation' },
                      { id: 'bill_discounting', label: 'Bill Discounting', desc: 'Trade bills before maturity' },
                      { id: 'overdraft', label: 'Bank Overdraft', desc: 'Current account buffer' },
                      { id: 'factoring', label: 'Factoring (SBI Factors)', desc: 'Receivables sale' },
                    ].map(fac => (
                      <motion.button
                        key={fac.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFacilitySelect(fac.id)}
                        aria-label={`Select facility ${fac.label}`}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedFacility === fac.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold">{fac.label}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{fac.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Facility Interactive Visual */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                    {selectedFacility === 'cash_credit' && (
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-400">Inventory Holding Value:</span>
                          <span className="font-mono text-white font-bold">₹{inventoryValue} Lakhs</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={500}
                          value={inventoryValue}
                          onChange={e => setInventoryValue(Number(e.target.value))}
                          aria-label="Set Inventory Value"
                          className="w-full accent-emerald-500"
                        />
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                          🏦 <strong>Bank Drawing Power (80% Drawing Power, 20% Margin):</strong>{' '}
                          <span className="text-emerald-400 font-bold font-mono">₹{Math.round(inventoryValue * 0.8)} Lakhs</span>.
                          Interest is charged <em>only</em> on the utilized portion, not the sanctioned limit!
                        </div>
                      </div>
                    )}

                    {selectedFacility === 'bill_discounting' && (
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-cyan-400">Trade Bill of Exchange (90-Day Credit):</span>
                          <span className="font-mono text-white font-bold">₹{receivablesValue} Lakhs</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={300}
                          value={receivablesValue}
                          onChange={e => setReceivablesValue(Number(e.target.value))}
                          aria-label="Set Trade Bill Value"
                          className="w-full accent-cyan-500"
                        />
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                          📜 <strong>Immediate Bank Cash Advance:</strong>{' '}
                          <span className="text-cyan-400 font-bold font-mono">₹{Math.round(receivablesValue * 0.97)} Lakhs</span> (after deducting 3% 90-day discounting charge).
                          Self-liquidating when drawee pays on maturity.
                        </div>
                      </div>
                    )}

                    {selectedFacility === 'overdraft' && (
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-400">Temporary Cash Deficit:</span>
                          <span className="font-mono text-white font-bold">₹{temporaryCashGap} Lakhs</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={temporaryCashGap}
                          onChange={e => setTemporaryCashGap(Number(e.target.value))}
                          aria-label="Set Temporary Cash Gap"
                          className="w-full accent-amber-500"
                        />
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                          💳 <strong>Overdraft Facility:</strong> Linked to Current A/c backed by ₹{temporaryCashGap + 20} Lakhs FD collateral.
                          Immediate withdrawal buffer for wage disbursement or emergency payments.
                        </div>
                      </div>
                    )}

                    {selectedFacility === 'factoring' && (
                      <div className="space-y-3 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 space-y-2">
                          <div className="font-bold text-purple-300">Factoring Architecture (Factoring Regulation Act 2011):</div>
                          <p>
                            Client sells receivables book to <strong>SBI Global Factors</strong>. Factor advances 80-85% cash immediately, manages sales ledger collections, and in <em>Non-Recourse Factoring</em>, absorbs debtor default loss.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── Interactive Visualization Step 3: Secondary Market Pipeline & Demat (SVG 3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">Trade-to-Demat T+1 Electronic Settlement Cycle:</span>
                      <span className="text-emerald-400 font-bold">Phase: {settlementStep === 0 ? 'Order Placed (T)' : settlementStep === 1 ? 'Clearing & Matching' : 'Electronic Demat Credit (T+1)'}</span>
                    </div>

                    {/* SVG 3: T+1 Demat Electronic Settlement Architecture */}
                    <svg viewBox="0 0 520 120" className="w-full bg-slate-900 rounded-lg border border-slate-800 p-2">
                      <defs>
                        <marker id="arrow3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                      </defs>

                      {/* Node 1: Investor Trading App */}
                      <rect x="10" y="25" width="100" height="65" rx="6" fill={settlementStep === 0 ? '#312e81' : '#1e293b'} stroke={settlementStep === 0 ? '#818cf8' : '#475569'} strokeWidth="2" />
                      <text x="60" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Investor App</text>
                      <text x="60" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Broker Terminal (T)</text>

                      {/* Flow arrow 1 */}
                      <path d="M 115 57 L 145 57" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow3)" />

                      {/* Node 2: NSE / BSE Order Book */}
                      <rect x="150" y="25" width="105" height="65" rx="6" fill={settlementStep === 1 ? '#064e3b' : '#1e293b'} stroke={settlementStep === 1 ? '#34d399' : '#475569'} strokeWidth="2" />
                      <text x="202" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">NSE / BSE Engine</text>
                      <text x="202" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Order Matching</text>

                      {/* Flow arrow 2 */}
                      <path d="M 260 57 L 290 57" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow3)" />

                      {/* Node 3: Clearing Corporation */}
                      <rect x="295" y="25" width="105" height="65" rx="6" fill={settlementStep === 1 ? '#064e3b' : '#1e293b'} stroke={settlementStep === 1 ? '#34d399' : '#475569'} strokeWidth="2" />
                      <text x="347" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Clearing Corp</text>
                      <text x="347" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Funds & Share Netting</text>

                      {/* Flow arrow 3 */}
                      <path d="M 405 57 L 435 57" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow3)" />

                      {/* Node 4: NSDL / CDSL Demat */}
                      <rect x="440" y="25" width="70" height="65" rx="6" fill={settlementStep === 2 ? '#1e1b4b' : '#1e293b'} stroke={settlementStep === 2 ? '#a855f7' : '#475569'} strokeWidth="2" />
                      <text x="475" y="48" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">NSDL/CDSL</text>
                      <text x="475" y="65" textAnchor="middle" fill="#c084fc" fontSize="8">T+1 Credit</text>

                      {/* Regulatory Banner */}
                      <text x="260" y="105" textAnchor="middle" fill="#64748b" fontSize="9">
                        Governed by Depositories Act 1996 & SEBI Intermediaries Regulations
                      </text>
                    </svg>

                    {/* Step-by-Step Flow buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSettlementStep(0)}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          settlementStep === 0 ? 'bg-indigo-950 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold">1. Order Placement (T Day)</div>
                        <p className="text-[10px] mt-1">Trading App (Broker/DP) routes buy order to NSE NEAT matching engine.</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSettlementStep(1)}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          settlementStep === 1 ? 'bg-indigo-950 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold">2. SEBI & Clearing Corp</div>
                        <p className="text-[10px] mt-1">Clearing Corp verifies funds from bank and delivery from seller demat.</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSettlementStep(2)}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          settlementStep === 2 ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold">3. Demat Credit (T+1 Day)</div>
                        <p className="text-[10px] mt-1">Shares credited to 16-digit BO ID with NSDL/CDSL depositories.</p>
                      </motion.div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                      🛡️ <strong>Depositories Act 1996:</strong> Demat eliminates fake certificates, signature mismatches, bad deliveries, and saves stamp duty on transfer.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Interactive Visualization Step 4: SENSEX, NIFTY & FII Inflows (SVG 4) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>FII (Foreign Institutional Investor) Net Inflow / Outflow</span>
                        <span className={fiiFlow >= 0 ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
                          {fiiFlow >= 0 ? `+₹${fiiFlow} Cr (Net Inflow)` : `-₹${Math.abs(fiiFlow)} Cr (Net Outflow)`}
                        </span>
                      </label>
                      <input
                        type="range"
                        min={-20000}
                        max={20000}
                        step={1000}
                        value={fiiFlow}
                        onChange={e => handleFiiSlider(Number(e.target.value))}
                        aria-label="Set FII Net Inflow"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>-₹20,000 Cr (Panic Outflow)</span>
                        <span>₹0</span>
                        <span>+₹20,000 Cr (Bull Rush)</span>
                      </div>
                    </div>

                    {/* SVG 4: Market Dynamics & Index Gauge */}
                    <svg viewBox="0 0 500 100" className="w-full bg-slate-900 rounded-lg border border-slate-800 p-2">
                      {/* Base Track */}
                      <line x1="40" y1="50" x2="460" y2="50" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                      
                      {/* Bear Zone */}
                      <line x1="40" y1="50" x2="160" y2="50" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
                      <text x="95" y="35" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Bear Zone (&lt;56k)</text>

                      {/* Consolidation Zone */}
                      <line x1="160" y1="50" x2="340" y2="50" stroke="#eab308" strokeWidth="8" />
                      <text x="250" y="35" textAnchor="middle" fill="#facc15" fontSize="9" fontWeight="bold">Consolidation (56k-73k)</text>

                      {/* Bull Zone */}
                      <line x1="340" y1="50" x2="460" y2="50" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                      <text x="400" y="35" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Bull Zone (&gt;73k)</text>

                      {/* Live Market Pointer */}
                      {(() => {
                        const minSensex = 52000;
                        const maxSensex = 88000;
                        const clampedSensex = Math.max(minSensex, Math.min(maxSensex, calculatedMarketIndex.sensex));
                        const pointerX = 40 + ((clampedSensex - minSensex) / (maxSensex - minSensex)) * 420;
                        return (
                          <g>
                            <polygon points={`${pointerX},40 ${pointerX - 6},25 ${pointerX + 6},25`} fill="#fff" />
                            <circle cx={pointerX} cy="50" r="7" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                            <text x={pointerX} y="75" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                              {calculatedMarketIndex.sensex}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">BSE SENSEX (30 Stocks)</span>
                        <p className="text-2xl font-black text-white font-mono mt-1">{calculatedMarketIndex.sensex}</p>
                        <span className="text-[10px] text-slate-500">Base 1978-79 = 100</span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">NSE NIFTY 50 (50 Stocks)</span>
                        <p className="text-2xl font-black text-cyan-400 font-mono mt-1">{calculatedMarketIndex.nifty}</p>
                        <span className="text-[10px] text-slate-500">Base 1995 = 1000</span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center flex flex-col justify-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">Market Regime</span>
                        <p className="text-sm font-bold text-amber-400 mt-1">{calculatedMarketIndex.marketState}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous Slide"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                aria-label="Next Slide"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play, No Grading Pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎮</span> CFO Sandbox: Free Corporate Finance Architecture Simulator
              </h3>
              <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                Ungraded Free Play
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Test multi-variable corporate finance configurations. Adjust bonus ratios, rights issues, debt coupons, and FII flows concurrently to see instantaneous balance sheet reactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capital Structure Controls</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Bonus Ratio:</span>
                  <span className="text-emerald-400 font-bold">{bonusRatio}:1</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2}
                  value={bonusRatio}
                  onChange={e => handleBonusSlider(Number(e.target.value))}
                  aria-label="Sandbox Bonus Ratio"
                  className="w-full accent-emerald-500"
                />

                <div className="flex justify-between mt-3">
                  <span>Rights Issue Shares:</span>
                  <span className="text-cyan-400 font-bold">{rightsShares}L Shares</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={rightsShares}
                  onChange={e => handleRightsSlider(Number(e.target.value))}
                  aria-label="Sandbox Rights Shares"
                  className="w-full accent-cyan-500"
                />

                <div className="flex justify-between mt-3">
                  <span>Debenture Coupon:</span>
                  <span className="text-amber-400 font-bold">{debentureCoupon}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={12}
                  step={0.5}
                  value={debentureCoupon}
                  onChange={e => setDebentureCoupon(Number(e.target.value))}
                  aria-label="Sandbox Debenture Coupon"
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between text-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulated Corporate Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-slate-950 rounded">
                  <span>Total Share Capital:</span>
                  <span className="font-mono font-bold text-white">₹{calculatedBalanceSheet.shareCapital} Lakhs</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded">
                  <span>Reserves & Surplus:</span>
                  <span className="font-mono font-bold text-indigo-400">₹{calculatedBalanceSheet.reserves} Lakhs</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded">
                  <span>Ex-Issue Share Price:</span>
                  <span className="font-mono font-bold text-amber-400">₹{calculatedBalanceSheet.exPrice}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded">
                  <span>Post-Tax Cost of Debt (Kd):</span>
                  <span className="font-mono font-bold text-emerald-400">{calculatedCostOfDebt.postTax}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40"
            >
              I Am Ready for Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive BKT & NEP Competency Questions) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Real-Time Trading Canvas Animation */}
          <canvas ref={canvasRef} width={600} height={32} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

          {/* Progress Bar & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold border border-indigo-900">
                  NEP Level: {activeChallenge.competencyLevel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Mastery: {masteryLevel}
                </span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* 1. MCQ Type Rendering */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag Label Type Rendering */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'part_custody', title: 'Electronic Custody Layer', sub: 'Holds demat shares with NSDL/CDSL' },
                    { id: 'part_order', title: 'Action / Order Layer', sub: 'Places buy/sell on BSE/NSE' },
                    { id: 'part_money', title: 'Cash Consideration Layer', sub: 'Funds transfer on T+1 settlement' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[110px]"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-300">{target.title}</p>
                        <p className="text-[10px] text-slate-500">{target.sub}</p>
                      </div>
                      <div className="mt-3 p-2 bg-slate-900 rounded text-center text-xs font-bold font-mono text-emerald-400 border border-slate-800">
                        {droppedLabels[target.id] || 'Drop Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit Drag Labels"
                  className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Architecture
                </motion.button>
              </div>
            )}

            {/* 3. Drag Sort Type Rendering */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Order Sequence"
                  className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Type Rendering */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:border-indigo-500 outline-none w-48"
                  />
                  <span className="text-slate-400 text-xs font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric answer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Calculate
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Type Rendering */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-emerald-900 border border-emerald-700 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs">Click available statutory pillars above to assemble</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Check constructed definition"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Verify Definition
                </motion.button>
              </div>
            )}

            {/* Click-to-Reveal Step-by-Step Explanation Banner */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-slate-950 to-indigo-950/40 rounded-xl border border-indigo-900/80 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    Statutory Analysis & Step-by-Step Rationale:
                  </span>
                </div>

                <div className="space-y-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-indigo-400 font-bold">{i + 1}.</span>
                        <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Rationale Step →
                    </motion.button>
                  )}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Portfolio Score →' : 'Next Challenge →'}
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
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-700 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mastery Assessment Complete!</h2>
            <div className="flex justify-center gap-6 text-sm font-mono">
              <span className="px-4 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-emerald-400 font-bold">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-4 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-indigo-300 font-bold">
                Mastery Tier: {masteryLevel.toUpperCase()}
              </span>
            </div>

            {/* Motivational Feedback Banner */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-emerald-500/40 max-w-2xl mx-auto space-y-1">
              <p className="text-lg font-black text-emerald-400">{motivationalFeedback.title}</p>
              <p className="text-xs md:text-sm text-slate-300">{motivationalFeedback.desc}</p>
            </div>
          </div>

          {/* Prominent Spaced Repetition Schedule (SRS) Banner */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>🔄</span> Spaced Repetition (SRS) Review Schedule
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {errors === 0
                ? 'Flawless retention! Optimal spaced review interval calculated: review in 7 days.'
                : errors <= 3
                ? 'Strong understanding! Consolidate memory traces with your scheduled review: review in 3 days.'
                : 'Core concepts require active reinforcement. Recommended review schedule: review in 1 day.'}
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span>📅 Next Spaced Review:</span>
              <strong className="text-amber-400">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </strong>
              <span className="text-slate-500 font-mono">• SuperMemo SM-2 Adaptive Decay</span>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Personalized Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const item = misconceptions?.[idx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1.5">
                      <p className="text-rose-300 font-semibold">❌ Trap: {item.misconception}</p>
                      <p className="text-emerald-300">✓ Accurate Concept: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deep Learning Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🤔</span> Post-Simulation Deep Learning Reflection
            </h3>
            <div className="space-y-4">
              {[
                { q: 'What was the most surprising thing you learned?', placeholder: 'e.g., How bonus shares adjust market price without altering total shareholders funds...' },
                { q: 'How would you explain this to a friend?', placeholder: 'e.g., Explaining debt tax shields vs equity dilution in simple terms...' },
                { q: 'Where in real life might you use this?', placeholder: 'e.g., Evaluating corporate rights issues, Demat accounts, or investing in the stock market...' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200">{item.q}</label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers[i] || ''}
                    onChange={e => handleReflectionChange(i, e.target.value)}
                    placeholder={item.placeholder}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>💼</span> Real-World CFO Capstone Project: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Modals & Burst Feedback */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Corporate Finance Mastery Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_CommerceBonusIssueRightsSim;