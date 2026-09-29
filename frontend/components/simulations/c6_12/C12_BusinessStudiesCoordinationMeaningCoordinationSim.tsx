'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Bar, Cell, Area, AreaChart } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_BS_021 = 'c12_bs_021';
const NODE_C12_BS_022 = 'c12_bs_022';
const NODE_C12_BS_023 = 'c12_bs_023';
const NODE_C12_BS_024 = 'c12_bs_024';
const NODE_C12_BS_025 = 'c12_bs_025';
const NODE_C12_BS_026 = 'c12_bs_026';
const NODE_C12_BS_027 = 'c12_bs_027';
const NODE_C12_BS_028 = 'c12_bs_028';
const NODE_C12_BS_029 = 'c12_bs_029';
const NODE_C12_BS_030 = 'c12_bs_030';

const ALL_NODE_IDS = [
  NODE_C12_BS_021,
  NODE_C12_BS_022,
  NODE_C12_BS_023,
  NODE_C12_BS_024,
  NODE_C12_BS_025,
  NODE_C12_BS_026,
  NODE_C12_BS_027,
  NODE_C12_BS_028,
  NODE_C12_BS_029,
  NODE_C12_BS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'MegaCorp India: The Turnaround and Expansion Epic',
  intro: 'You have been appointed Chief Strategy & Financial Officer (CSFO) of "Bharat Mobility Ltd", a premier electric vehicle manufacturing conglomerate. The firm is preparing for a ₹5,000 crore pan-India EV ecosystem expansion while managing inter-departmental harmony, capital structure re-engineering, and working capital cycles.',
  context: 'From orchestrating R&D, production, sales, and treasury at launch (Reliance Jio and Chandrayaan-3 style) to navigating the IFDL quadrant, selecting optimal sources (equity, preference, bonus, sweat equity, debentures), and dodging Kingfisher-style liquidity insolvency, your financial and managerial prowess will decide the firm’s destiny.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Bharat Mobility’s Production Dept plans to assemble 100,000 EVs, Marketing spends ₹150 Cr on ads targeting 200,000 customers, and Finance reserves only ₹800 Cr (enough for 60,000 EVs). If all three heads work with 100% voluntary goodwill and cooperation, what will happen?',
  options: [
    'The company will succeed smoothly because team members are cooperative and enthusiastic.',
    'A severe crisis will occur: 140,000 customers will be turned away disappointed because cooperation without managerial synchronization (coordination) produces chaos.',
    'Marketing will automatically manufacture the missing EVs using their ad budget.',
    'The company will create a 6th function of management called "Supervision-Plus" to print extra money.',
  ],
  correctIndex: 1,
  hintAfter: 'Good thinking! Cooperation is voluntary goodwill, but coordination is the deliberate synchronization that aligns targets. Let us explore the core mechanics!',
};

// ─── CHALLENGE DEFINITIONS ───
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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_BS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is coordination regarded in business management as the "essence of management" rather than a separate sixth function?',
    options: [
      'Because it is performed only after all other five functions are completed.',
      'Because it permeates and integrates all five functions (Planning, Organising, Staffing, Directing, Controlling) like a unifying thread.',
      'Because Section 129 of Companies Act 2013 abolishes the other five functions in favour of coordination.',
      'Because it is an informal emotional attitude identical to voluntary cooperation.',
    ],
    correctIndex: 1,
    explanation: 'Coordination is not a standalone 6th function; it is the integrating thread that binds planning, organising, staffing, directing, and controlling into a harmonious whole. The five functions are like the five fingers of a hand, and coordination is the ability to grasp together.',
    hints: [
      'Think about whether coordination happens in isolation or within planning and controlling.',
      'Remember the hand-and-fingers analogy from the syllabus.',
      'Coordination is the pervasive quality (essence) running through all 5 functions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_BS_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During the 2016 launch of Reliance Jio (laying 3 lakh km fibre, ₹200 Cr ad blitz, 1.6 lakh retail stores, ₹2 lakh Cr capex), what would have happened if Marketing launched ads in Chennai before Network fibre was laid?',
    options: [
      'Customer satisfaction would rise due to promotional anticipation.',
      'Severe brand damage and wasted ad spend as subscribers buy SIMs but find no network coverage.',
      'The Controlling function would automatically convert marketing hoardings into 4G antennas.',
      'Organising would eliminate the need for network infrastructure.',
    ],
    correctIndex: 1,
    explanation: 'Uncoordinated departmental timing leads to catastrophic failure. If marketing runs ahead of physical network readiness, customers experience stockouts and zero connectivity, destroying brand equity and wasting advertising capital.',
    hints: [
      'Consider the customer journey: seeing an ad, buying a SIM, and looking for a signal.',
      'What happens when promotional promises precede operational readiness?',
      'Coordination of timing across departments is required to prevent customer frustration.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_BS_022,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the business action to its IFDL quadrant: "Tata Motors allocating ₹7,500 crore to build an EV assembly line at Sanand".',
    options: [
      'Financing Decision (Liability side)',
      'Investment / Capital Budgeting Decision (Asset side)',
      'Dividend Decision (Appropriation of profit)',
      'Liquidity Decision (Cash management)',
    ],
    correctIndex: 1,
    explanation: 'Allocating funds to long-term productive assets (factories, EV platforms, machinery) is an Investment Decision (Capital Budgeting) on the asset side of the balance sheet.',
    hints: [
      'Look at whether the company is raising money or spending money on machinery/plants.',
      'Assets = Investment; Liabilities/Equity = Financing.',
      'Building an EV line deploys funds into long-term capital assets.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_BS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Kingfisher Airlines collapse in 2012 despite reporting positive operational revenue and accounting profits in several quarters?',
    options: [
      'Because it violated Section 180(1)(c) by refusing all passenger bookings.',
      'It suffered a catastrophic Liquidity crisis — cash was locked in receivables and aircraft leases while daily fuel bills and salaries fell due immediately.',
      'Because it maintained an excessively high debt-equity ratio of 0.01.',
      'Because its dividend payout ratio was legally capped at 100%.',
    ],
    correctIndex: 1,
    explanation: 'Profitability is not solvency. Kingfisher was profitable on paper in early phases but ran out of liquid cash to pay daily fuel bills (HPCL/IOC) and employee wages. A firm can die of an acute liquidity heart attack despite accounting profits.',
    hints: [
      'Distinguish between income statement profit and actual cash in the bank to pay today’s bills.',
      'What happens when card settlement takes 15 days but aviation turbine fuel demands immediate cash?',
      'Liquidity is about meeting short-term obligations as they fall due.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_BS_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the 4 core chronological stages of a corporate Financial Planning framework for a ₹1,500 Cr plant expansion:',
    sortItems: [
      '1. Estimate Fixed & Working Capital quantum needed',
      '2. Map timing schedule of fund outflows vs operational cash inflows',
      '3. Evaluate accessible debt & equity source options',
      '4. Finalise optimum debt-equity mix balancing cost of capital & insolvency risk',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Sound financial planning first forecasts the total quantum (fixed + working), maps cash flow timing, identifies accessible sources, and finally determines the optimal debt-equity capital mix.',
    hints: [
      'You cannot choose a debt-equity ratio until you know how much total capital is needed.',
      'Timing must be understood before negotiating tranches with lenders.',
      'The sequence moves from quantum estimation to timing to source evaluation to final mix.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_BS_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How has the enactment of the Insolvency and Bankruptcy Code (IBC) 2016 fundamentally transformed financial planning discipline for Indian boards (e.g., Jaypee Associates, Essar Steel)?',
    options: [
      'It allows promoters to operate indefinitely under BIFR shelter without repaying bank loans.',
      'A single default of statutory threshold triggers time-bound NCLT proceedings where promoters lose management control to an Insolvency Professional.',
      'It mandates that companies cannot issue equity shares if interest rates fall below 6%.',
      'It guarantees that the RBI pays all debenture coupons during industrial downturns.',
    ],
    correctIndex: 1,
    explanation: 'Post-IBC 2016, failure to plan for debt servicing leads to NCLT admission, stripping promoters of ownership and handing the company to an Resolution Professional. Financial planning is now an existential survival necessity.',
    hints: [
      'Compare the old slow BIFR regime with the time-bound 180/270 day NCLT mechanism.',
      'What happens to promoters when default is admitted by NCLT?',
      'Loss of promoter control makes cash-flow stress testing mandatory.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_BS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following factors specifically affects the QUANTUM OF FIXED CAPITAL, rather than the capital structure mix?',
    options: [
      'Tax shield on debt interest under Section 36(1)(iii)',
      'Stock market conditions (bull vs bear sentiment)',
      'Technique of production (capital-intensive automated robotics vs labour-intensive)',
      'Promoter fear of dilution of voting control',
    ],
    correctIndex: 2,
    explanation: 'Technique of production dictates how much money is locked in long-term physical machinery (fixed capital). In contrast, tax shields, market sentiment, and promoter dilution fears govern whether you raise debt or equity (capital structure).',
    hints: [
      'Distinguish between: "How much plant do we need?" vs "Should we borrow or sell shares?"',
      'Automated robotics directly changes machine asset requirements.',
      'Technique of production is an asset-side fixed capital determinant.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_BS_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A company has Total Assets of ₹100 Cr (financed by ₹50 Cr Equity, ₹50 Cr Debt @ 10% interest). If EBIT is ₹15 Cr and tax is 0%, what is the Return on Equity (ROE)? Enter percentage value (e.g., 20).',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: '%',
    explanation: 'EBIT = ₹15 Cr. Interest on ₹50 Cr debt @ 10% = ₹5 Cr. Profit after interest = ₹15 Cr - ₹5 Cr = ₹10 Cr. ROE = (₹10 Cr / ₹50 Cr Equity) × 100 = 20%. Because Return on Assets (15%) > Debt Cost (10%), Trading on Equity magnified equity returns from 15% to 20%!',
    hints: [
      'Calculate interest on debt first: 10% of 50 crore = 5 crore.',
      'Subtract interest from EBIT: 15 - 5 = 10 crore profit for equity.',
      'Divide by equity capital (50 crore) and multiply by 100: 10/50 * 100 = 20%.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_BS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Asian Paints holds ₹1,200 Cr inventory, ₹900 Cr debtors, ₹600 Cr cash, and owes ₹1,500 Cr to trade creditors. What is its NET Working Capital?',
    options: [
      '₹2,700 Crore',
      '₹1,200 Crore',
      '₹600 Crore',
      '₹4,200 Crore',
    ],
    correctIndex: 1,
    explanation: 'Gross Working Capital = Total Current Assets = ₹1,200 + ₹900 + ₹600 = ₹2,700 Cr. Net Working Capital = Gross Working Capital - Current Liabilities = ₹2,700 - ₹1,500 = ₹1,200 Cr.',
    hints: [
      'First calculate Gross Working Capital (Inventory + Debtors + Cash).',
      'Gross Working Capital = 1200 + 900 + 600 = 2700 Cr.',
      'Net Working Capital = Current Assets (2700) - Current Liabilities (1500) = 1200 Cr.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_BS_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Tata Consultancy Services (TCS) operate smoothly with negative net working capital while Asian Paints requires heavy positive working capital?',
    options: [
      'TCS violates RBI Master Directions on Lending 2022.',
      'TCS sells software employee services with zero raw material inventory and receives client advances while paying vendors on 45 days credit.',
      'Asian Paints has no physical manufacturing plants.',
      'TCS pays debenture interest before declaring revenue.',
    ],
    correctIndex: 1,
    explanation: 'Nature of business and operating cycle dictate working capital. Service IT firms have near-zero physical inventory and collect advances, allowing negative working capital where creditors/clients fund operations. Paint makers must store raw pigments and finished paint cans across thousands of dealer shelves.',
    hints: [
      'Think about physical stock: Does software code sit in a warehouse like paint buckets?',
      'Look at credit terms: client advances vs paint dealer credit.',
      'Service firms hold negligible inventory and enjoy rapid billing cycles.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_BS_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Infosys equity shares have a nominal face value of ₹1 (post-split) but traded at ~₹1,500 on the NSE. What explains this divergence?',
    options: [
      'It is an illegal accounting error prohibited by Section 43(a) of Companies Act 2013.',
      'Face value is an accounting entry at issuance, whereas market value reflects 30+ years of compounded earnings, brand value, and investor demand.',
      'The company is required by SEBI to multiply share price by the repo rate.',
      'Face value applies to debentures, while market value applies only to preference shares.',
    ],
    correctIndex: 1,
    explanation: 'Face value is the historic par value recorded in the company books. Market value is determined by secondary market demand, future growth expectations, and accumulated retained earnings.',
    hints: [
      'Face value is printed on the certificate; market value is traded on the stock exchange.',
      'Does a company’s worth stay frozen at its original founding nominal value?',
      'Compounded profits and business growth drive market price far above face value.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_BS_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why do high-growth early-stage startups like Zomato, Nykaa, and Swiggy finance their early years almost exclusively through Equity rather than Debentures?',
    options: [
      'Because banks legally prohibit tech startups from issuing equity.',
      'Because equity has no mandatory fixed payout obligation; if the startup incurs early losses, it skips dividends without triggering bankruptcy.',
      'Because debenture interest is taxed at 90% under Section 68.',
      'Because equity holders have zero voting rights in board resolutions.',
    ],
    correctIndex: 1,
    explanation: 'Equity provides crucial financial resilience: dividend is discretionary under Section 123 of Companies Act 2013. Loss-making startups cannot survive the rigid interest payment obligations of debentures.',
    hints: [
      'What happens to a loss-making company that owes fixed interest to debenture holders?',
      'Equity dividends can be skipped during losses without legal default.',
      'Discretionary payouts protect young firms from insolvency.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_BS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 50 of the Companies Act 2013, when do Preference Shareholders gain the legal right to vote in general meetings?',
    options: [
      'On every ordinary resolution including appointment of auditors.',
      'Only on resolutions directly affecting their rights (e.g., winding up, dividend rate reduction, variation of preference terms).',
      'Never under any circumstances, even upon liquidation.',
      'Whenever the stock market enters a bear phase.',
    ],
    correctIndex: 1,
    explanation: 'While preference shares carry no voting rights on general business resolutions, Section 50 strictly protects them by granting voting rights on resolutions that directly impact their financial rights or capital security.',
    hints: [
      'Preference shareholders give up ordinary voting in exchange for fixed priority returns.',
      'Can a company reduce their fixed 9% dividend to 2% without letting them vote?',
      'Section 50 protects them specifically on rights-affecting resolutions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_BS_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A company issued 9% Cumulative Preference Shares of ₹100 each. In Year 1 and Year 2 it suffered losses and skipped all dividends. In Year 3 it makes ₹50 Cr profit. How much dividend per share must be paid to them before ANY equity dividend is declared?',
    options: [
      '₹9 per share (only current year)',
      '₹27 per share (₹9 Year 1 + ₹9 Year 2 + ₹9 Year 3 arrears)',
      '₹0 because past dividends are cancelled in loss years',
      '₹29.43 due to 9% compound interest on arrears',
    ],
    correctIndex: 1,
    explanation: 'In "Cumulative" preference shares, unpaid dividends accumulate as arrears and must be paid in full (₹9 + ₹9 + ₹9 = ₹27) before equity shareholders receive a single rupee. Note: Arrears do NOT earn compound interest.',
    hints: [
      'Cumulative means skipped dividends carry forward.',
      'Add up Year 1 arrears (₹9), Year 2 arrears (₹9), and Year 3 current dividend (₹9).',
      '9 + 9 + 9 = 27 per share.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_BS_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Wipro announced a 1:1 Bonus Issue under Section 63 of the Companies Act 2013. A shareholder holds 100 shares priced at ₹400. What is the immediate effect on total shareholder wealth?',
    options: [
      'Wealth doubles instantly to ₹80,000 because 100 free shares are received.',
      'Wealth remains approximately ₹40,000 (holds 200 shares @ ~₹200 ex-bonus) because reserves are simply converted into share capital.',
      'Shareholder must pay ₹40,000 in cash within 15 days to SEBI.',
      'The company’s total net worth increases by ₹400 crore.',
    ],
    correctIndex: 1,
    explanation: 'A bonus issue capitalises free reserves into share capital. No fresh cash enters the company; the total pie remains the same size, divided into twice as many slices. The market price adjusts downward proportionately on the ex-date.',
    hints: [
      'Does the company receive any fresh cash from shareholders in a bonus issue?',
      'If reserves fall by ₹10 Cr and share capital rises by ₹10 Cr, does net worth change?',
      'Number of shares doubles, but share price halves, keeping total wealth constant.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_BS_028,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Map each specialized corporate equity issuance mechanism to its primary recipient and purpose:',
    dragItems: [
      { label: 'Rights Issue (Sec 62(1)(a))', targetId: 'target_existing_cash' },
      { label: 'Bonus Issue (Sec 63)', targetId: 'target_existing_free' },
      { label: 'ESOP (Sec 62(1)(b))', targetId: 'target_employees_vest' },
      { label: 'QIP (SEBI Ch. VII)', targetId: 'target_institutional_speed' },
    ],
    correctMapping: {
      target_existing_cash: 'Rights Issue (Sec 62(1)(a))',
      target_existing_free: 'Bonus Issue (Sec 63)',
      target_employees_vest: 'ESOP (Sec 62(1)(b))',
      target_institutional_speed: 'QIP (SEBI Ch. VII)',
    },
    explanation: 'Rights issues raise fresh cash from existing owners while preserving ownership proportion. Bonus issues capitalise reserves without cash. ESOPs retain employees through time-vested options. QIPs raise fast institutional equity from QIBs.',
    hints: [
      'Which one asks existing shareholders for cash at a discount? Rights Issue.',
      'Which one gives free shares by capitalising reserves? Bonus Issue.',
      'Which one is for employees vesting over 3-5 years? ESOP.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_BS_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is it dangerous and incorrect to assume that Retained Earnings are "completely free costless capital"?',
    options: [
      'Because the RBI levies an annual 18% penalty on reserves.',
      'Because retained earnings carry an Opportunity Cost equal to the return equity shareholders could have earned if the profit were distributed as dividends.',
      'Because Section 123 requires paying interest to creditors on retained profits.',
      'Because retained earnings must be physically converted into gold bullion.',
    ],
    correctIndex: 1,
    explanation: 'Retained earnings belong to equity shareholders. If retained, the company must earn at least the shareholders’ required rate of return (cost of equity); otherwise, retaining profits destroys shareholder wealth (the agency problem).',
    hints: [
      'What could shareholders have done if they received the cash as dividend?',
      'Foregone return on alternative investments is called Opportunity Cost.',
      'Retained earnings carry an implicit cost equal to the cost of equity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_BS_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Maruti Suzuki retains ₹5,600 Cr of profit. Shareholders could earn 11% in alternative market investments. If Maruti invests this ₹5,600 Cr in a factory expansion yielding only 7% ROI, what is the strategic evaluation?',
    options: [
      'The board created ₹392 Cr of surplus shareholder wealth.',
      'Value-destroying retention: The board destroyed ₹224 Cr of shareholder value (7% - 11% = -4% on ₹5,600 Cr), illustrating the managerial agency problem.',
      'The transaction is legally void under Companies Act Section 68.',
      'Maruti will be forced into mandatory liquidation by CRISIL.',
    ],
    correctIndex: 1,
    explanation: 'Earning 7% on capital when shareholders expect 11% destroys 4% of value per year (-₹224 Cr). In such cases, management should distribute the profits as dividends rather than empire-building in sub-par projects.',
    hints: [
      'Compare project return (7%) with shareholder opportunity cost (11%).',
      'Is 7% higher or lower than 11%?',
      'When project return < opportunity cost, retaining capital destroys value.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_BS_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an undeniable legal and structural feature of Debentures under Section 71 of the Companies Act 2013?',
    options: [
      'Debenture holders enjoy voting rights in proportion to debt value.',
      'Debenture interest is a "charge on profit" (tax-deductible expense), payable whether the company earns profit or incurs a loss.',
      'Debenture holders are paid liquidation proceeds after equity shareholders.',
      'Debenture coupon rates automatically fluctuate with annual dividend payouts.',
    ],
    correctIndex: 1,
    explanation: 'Debenture interest is a charge against profit (finance expense) under Section 36(1)(iii) of the Income Tax Act. It must be paid even during severe losses, and Section 71 strictly prohibits debentures with voting rights.',
    hints: [
      'Do debenture holders get to vote at the AGM? No (Sec 71).',
      'Is interest an optional gift or a mandatory legal charge?',
      'Interest is a charge on profit and creates a valuable tax shield.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_BS_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Steel issues ₹2,000 Cr of 8.0% NCDs. If the Indian corporate tax rate is 25%, what is the EFFECTIVE AFTER-TAX COST OF DEBT percentage? (e.g. 6.0)',
    correctAnswer: 6.0,
    tolerance: 0.1,
    unit: '%',
    explanation: 'After-tax Cost of Debt = Pre-tax Coupon × (1 - Tax Rate) = 8.0% × (1 - 0.25) = 8.0% × 0.75 = 6.0%. The ₹40 Cr annual tax shield under Section 36(1)(iii) reduces effective borrowing cost from 8% to 6%!',
    hints: [
      'Formula: After-tax Cost = Coupon × (1 - Tax Rate).',
      '1 - 0.25 = 0.75.',
      '8.0 × 0.75 = 6.0%.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_BS_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the optimal capital financing formula for a stable, high-EBIT FMCG firm expanding into rural distribution with low financial risk:',
    availableParts: ['High Low-Cost Debt (Tax Shield)', 'Moderate Retained Earnings', 'Zero Dilutive Equity', 'High Volatile Debt', 'Excess Short-Term Overdraft'],
    targetState: 'High Low-Cost Debt (Tax Shield) Moderate Retained Earnings Zero Dilutive Equity',
    validationHint: 'Select 3 parts that maximize the tax shield, utilize internal profits, and prevent ownership dilution.',
    explanation: 'For a stable cash-generative business, combining low-cost debt (benefiting from tax shield) with internal retained earnings avoids equity dilution while keeping bankruptcy risk negligible.',
    hints: [
      'Combine cheap tax-shielded debt with internal accruals.',
      'Avoid dilution of control by choosing zero dilutive equity.',
      'Click the three constructive components in sequence.',
    ],
  },
];

// ─── TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS (3+ SVGs) ───

// SVG 1: Coordination as Essence of Management
const CoordinationEssenceSvg = ({ alignmentScore }: { alignmentScore: number }) => (
  <svg className="w-full max-w-sm h-48 mx-auto" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="360" height="200" rx="16" fill="#0b0f19" stroke="#1e293b" strokeWidth="1.5" />
    {/* Concentric Integration Rings */}
    <circle cx="180" cy="100" r="70" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
    <circle cx="180" cy="100" r="45" fill="url(#coreGradient)" stroke={alignmentScore > 80 ? '#10b981' : '#f59e0b'} strokeWidth="2" />
    {/* Radial spokes linking 5 functions */}
    {[
      { label: 'Planning', cx: 180, cy: 30 },
      { label: 'Organising', cx: 250, cy: 65 },
      { label: 'Staffing', cx: 230, cy: 155 },
      { label: 'Directing', cx: 130, cy: 155 },
      { label: 'Controlling', cx: 110, cy: 65 },
    ].map((f, i) => (
      <g key={i}>
        <line x1="180" y1="100" x2={f.cx} y2={f.cy} stroke="#4f46e5" strokeWidth="1.5" opacity="0.7" />
        <circle cx={f.cx} cy={f.cy} r="16" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
        <text x={f.cx} y={f.cy + 3} fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">{f.label.slice(0, 4)}</text>
      </g>
    ))}
    {/* Center Core Text */}
    <text x="180" y="96" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">COORDINATION</text>
    <text x="180" y="108" fill={alignmentScore > 80 ? '#34d399' : '#fbbf24'} fontSize="8" fontWeight="bold" textAnchor="middle">
      {alignmentScore}% Essence
    </text>
    <defs>
      <radialGradient id="coreGradient" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#312e81" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
    </defs>
  </svg>
);

// SVG 2: IFDL Quadrant Decision Architecture
const IFDLQuadrantSvg = ({ activeQuadrant }: { activeQuadrant: 'I' | 'F' | 'D' | 'L' }) => (
  <svg className="w-full max-w-md h-48 mx-auto" viewBox="0 0 400 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="190" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="200" y1="15" x2="200" y2="175" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
    <line x1="15" y1="95" x2="385" y2="95" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
    {/* Quadrant I: Investment */}
    <rect x="25" y="25" width="165" height="62" rx="8" fill={activeQuadrant === 'I' ? '#1e3a8a' : '#0f172a'} stroke={activeQuadrant === 'I' ? '#60a5fa' : '#1e293b'} strokeWidth="1.5" />
    <text x="35" y="45" fill="#93c5fd" fontSize="11" fontWeight="bold">I: INVESTMENT (Assets)</text>
    <text x="35" y="60" fill="#cbd5e1" fontSize="8.5">Capital Budgeting • Plant Capex</text>
    <text x="35" y="73" fill="#64748b" fontSize="7.5">e.g. Tata Motors Sanand EV Line</text>
    {/* Quadrant F: Financing */}
    <rect x="210" y="25" width="165" height="62" rx="8" fill={activeQuadrant === 'F' ? '#581c87' : '#0f172a'} stroke={activeQuadrant === 'F' ? '#c084fc' : '#1e293b'} strokeWidth="1.5" />
    <text x="220" y="45" fill="#e9d5ff" fontSize="11" fontWeight="bold">F: FINANCING (Liabilities)</text>
    <text x="220" y="60" fill="#cbd5e1" fontSize="8.5">Debt-Equity Mix • Cost of Capital</text>
    <text x="220" y="73" fill="#64748b" fontSize="7.5">e.g. Reliance Rights Issue ₹53k Cr</text>
    {/* Quadrant D: Dividend */}
    <rect x="25" y="105" width="165" height="62" rx="8" fill={activeQuadrant === 'D' ? '#78350f' : '#0f172a'} stroke={activeQuadrant === 'D' ? '#fbbf24' : '#1e293b'} strokeWidth="1.5" />
    <text x="35" y="125" fill="#fef08a" fontSize="11" fontWeight="bold">D: DIVIDEND (Appropriation)</text>
    <text x="35" y="140" fill="#cbd5e1" fontSize="8.5">Payout Ratio vs Retained Earnings</text>
    <text x="35" y="153" fill="#64748b" fontSize="7.5">e.g. TCS ₹73/share dividend policy</text>
    {/* Quadrant L: Liquidity */}
    <rect x="210" y="105" width="165" height="62" rx="8" fill={activeQuadrant === 'L' ? '#064e3b' : '#0f172a'} stroke={activeQuadrant === 'L' ? '#34d399' : '#1e293b'} strokeWidth="1.5" />
    <text x="220" y="125" fill="#a7f3d0" fontSize="11" fontWeight="bold">L: LIQUIDITY (Solvency)</text>
    <text x="220" y="140" fill="#cbd5e1" fontSize="8.5">Working Capital • Daily Cash Flow</text>
    <text x="220" y="153" fill="#64748b" fontSize="7.5">e.g. Averting Kingfisher cash crunch</text>
  </svg>
);

// SVG 3: Working Capital Operating Cycle & Cash Conversion
const WorkingCapitalCycleSvg = ({ debtorDays, inventoryDays }: { debtorDays: number; inventoryDays: number }) => (
  <svg className="w-full max-w-md h-44 mx-auto" viewBox="0 0 420 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="420" height="170" rx="14" fill="#080e1a" stroke="#1e293b" strokeWidth="1.5" />
    {/* Circular Flow Arrow Pipeline */}
    <path d="M 60 85 C 60 35, 360 35, 360 85 C 360 135, 60 135, 60 85 Z" stroke="#334155" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M 60 85 C 60 35, 360 35, 360 85" stroke="#6366f1" strokeWidth="6" strokeDasharray="12 4" strokeLinecap="round" fill="none" />
    {/* Node 1: Cash Outflow to Raw Material */}
    <circle cx="60" cy="85" r="22" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
    <text x="60" y="82" fill="#e0e7ff" fontSize="8" fontWeight="bold" textAnchor="middle">CASH</text>
    <text x="60" y="93" fill="#a5b4fc" fontSize="6.5" textAnchor="middle">Outflow</text>
    {/* Node 2: Raw Material & WIP */}
    <circle cx="160" cy="40" r="20" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
    <text x="160" y="38" fill="#ecfdf5" fontSize="7.5" fontWeight="bold" textAnchor="middle">INVENTORY</text>
    <text x="160" y="48" fill="#6ee7b7" fontSize="6.5" textAnchor="middle">{inventoryDays} Days</text>
    {/* Node 3: Sales / Receivables */}
    <circle cx="260" cy="40" r="20" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
    <text x="260" y="38" fill="#fefce8" fontSize="7.5" fontWeight="bold" textAnchor="middle">DEBTORS</text>
    <text x="260" y="48" fill="#fde047" fontSize="6.5" textAnchor="middle">{debtorDays} Days</text>
    {/* Node 4: Cash Realisation */}
    <circle cx="360" cy="85" r="22" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
    <text x="360" y="82" fill="#f0fdfa" fontSize="8" fontWeight="bold" textAnchor="middle">COLLECTION</text>
    <text x="360" y="93" fill="#99f6e4" fontSize="6.5" textAnchor="middle">Inflow</text>
    {/* Cycle Formula in Centre */}
    <rect x="110" y="112" width="200" height="36" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
    <text x="210" y="126" fill="#94a3b8" fontSize="8" textAnchor="middle">Operating Cycle = Inventory + Debtors</text>
    <text x="210" y="140" fill="#38bdf8" fontSize="9.5" fontWeight="black" textAnchor="middle">
      Total Cycle: {inventoryDays + debtorDays} Days (Net: {inventoryDays + debtorDays - 40} Days)
    </text>
  </svg>
);

// SVG 4: Securities Waterfall (Risk, Return, Claim Hierarchy)
const SecuritiesWaterfallSvg = ({ selected }: { selected: 'equity' | 'preference' | 'retained' | 'debentures' }) => (
  <svg className="w-full max-w-md h-40 mx-auto" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" rx="12" fill="#080e1a" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="25" y1="20" x2="25" y2="135" stroke="#475569" strokeWidth="2" />
    <text x="18" y="78" fill="#94a3b8" fontSize="8" fontWeight="bold" transform="rotate(-90 18 78)" textAnchor="middle">SENIOR CLAIM → RESIDUAL</text>
    {/* Tier 1: Debentures */}
    <rect x="40" y="16" width="340" height="26" rx="6" fill={selected === 'debentures' ? '#881337' : '#1e1b4b'} stroke={selected === 'debentures' ? '#fb7185' : '#334155'} strokeWidth="1.2" />
    <text x="50" y="32" fill="#fda4af" fontSize="9" fontWeight="bold">1. SECURED DEBENTURES</text>
    <text x="240" y="32" fill="#cbd5e1" fontSize="7.5">Fixed Coupon • Tax Shield • Sec 71</text>
    {/* Tier 2: Preference Shares */}
    <rect x="40" y="47" width="340" height="26" rx="6" fill={selected === 'preference' ? '#581c87' : '#1e1b4b'} stroke={selected === 'preference' ? '#c084fc' : '#334155'} strokeWidth="1.2" />
    <text x="50" y="63" fill="#d8b4fe" fontSize="9" fontWeight="bold">2. PREFERENCE CAPITAL</text>
    <text x="240" y="63" fill="#cbd5e1" fontSize="7.5">Priority Dividend • Sec 43(b) & Sec 50</text>
    {/* Tier 3: Retained Earnings */}
    <rect x="40" y="78" width="340" height="26" rx="6" fill={selected === 'retained' ? '#064e3b' : '#1e1b4b'} stroke={selected === 'retained' ? '#34d399' : '#334155'} strokeWidth="1.2" />
    <text x="50" y="94" fill="#a7f3d0" fontSize="9" fontWeight="bold">3. RETAINED EARNINGS</text>
    <text x="240" y="94" fill="#cbd5e1" fontSize="7.5">Internal Accrual • Zero Dilution Cost</text>
    {/* Tier 4: Equity Shares */}
    <rect x="40" y="109" width="340" height="26" rx="6" fill={selected === 'equity' ? '#1e3a8a' : '#1e1b4b'} stroke={selected === 'equity' ? '#60a5fa' : '#334155'} strokeWidth="1.2" />
    <text x="50" y="125" fill="#bfdbfe" fontSize="9" fontWeight="bold">4. EQUITY SHARE CAPITAL</text>
    <text x="240" y="125" fill="#cbd5e1" fontSize="7.5">Full Voting (Sec 47) • Residual Claim</text>
  </svg>
);

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
  nodeId: NODE_C12_BS_021,
  title: 'Coordination & Business Finance Master Suite',
  definition: 'Comprehensive mastery of Coordination as the essence of management, the IFDL financial management quadrant, financial planning, capital structure, working capital dynamics, equity/preference/bonus instruments, retained earnings, and corporate debentures under the Companies Act 2013 and SEBI frameworks.',
  eli5: 'Think of running a massive company like conducting a 500-piece symphony orchestra while managing a multi-crore bank account. Coordination ensures every musician plays the right note at the right second, while finance ensures you have the money to build the concert hall, pay the artists, and grow the theatre without running out of cash.',
  misconceptions: [
    { misconception: 'Coordination is a separate sixth function of management alongside planning, organising, staffing, directing, and controlling.', correction: 'Coordination is NOT a 6th function; it is the integrating essence that permeates and synchronises all five functions.' },
    { misconception: 'Investment Decision and Financing Decision are the same thing.', correction: 'Investment is about WHERE to deploy funds (asset side); Financing is about FROM WHERE to raise funds (liability & equity side).' },
    { misconception: 'If a company reports high accounting profits, it cannot go bankrupt.', correction: 'Profitability does not guarantee liquidity. A firm can collapse in days if cash is locked in receivables while immediate obligations fall due (e.g. Kingfisher Airlines).' },
    { misconception: 'Factors affecting capital structure and factors affecting fixed capital are the same.', correction: 'Capital structure factors govern the debt-equity MIX; fixed capital factors govern the QUANTUM of long-term physical assets.' },
    { misconception: 'Working capital is simply the cash and bank balance held by the company.', correction: 'Working capital includes all current assets (inventory, receivables, cash, prepaid items) net of current liabilities; inventory and receivables often form over 70%.' },
  ],
  diagnosticQuestions: [
    { question: 'What is coordination in management?', options: ['An optional team-bonding event', 'The deliberate synchronization of group efforts to achieve common goals', 'A sixth function added by Companies Act 2013', 'A substitute for planning'], correctIndex: 1 },
    { question: 'Which IFDL decision addresses the asset side of the balance sheet?', options: ['Financing Decision', 'Investment Decision', 'Dividend Decision', 'Liquidity Decision'], correctIndex: 1 },
    { question: 'What does financial planning primarily estimate?', options: ['Past historical tax payments', 'Quantum, timing, and source-mix of required funds', 'Stock exchange holiday schedules', 'Employee bonus percentages only'], correctIndex: 1 },
    { question: 'Why is debt interest cheaper than equity dividends?', options: ['Because banks are non-profit charities', 'Interest is tax-deductible under Section 36(1)(iii) of the Income Tax Act', 'Dividends are paid before corporate tax', 'Debentures carry triple voting power'], correctIndex: 1 },
    { question: 'Net Working Capital is calculated as:', options: ['Total Assets minus Total Liabilities', 'Current Assets minus Current Liabilities', 'Cash in Hand minus Bank Overdraft', 'Gross Revenue minus Operating Expenses'], correctIndex: 1 },
    { question: 'What voting power do equity shareholders enjoy under Section 47?', options: ['No voting rights', 'One vote per share on all general resolutions', 'Voting only on liquidation resolutions', 'Two votes per share in loss years'], correctIndex: 1 },
    { question: 'A 1:1 Bonus Issue results in:', options: ['Doubling of company cash reserves', 'Capitalisation of free reserves with zero fresh cash inflow', 'Immediate 50% dilution of promoter holding', 'Cancellation of all preference shares'], correctIndex: 1 },
    { question: 'Under Section 71 of Companies Act 2013, Debentures:', options: ['Must carry 50% voting rights', 'Are strictly prohibited from carrying voting rights', 'Can be issued only to foreign central banks', 'Are non-redeemable by law'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across coordination as the essence of management, IFDL quadrants, financial planning, capital structure leverage, working capital calculation, and corporate securities selection.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'The Essence of Management: Departmental Harmony',
    instruction: 'Adjust the alignment sliders for R&D, Production, Marketing, and Finance. Watch the Organizational Launch Velocity reach 100% when all 4 synchronize!',
    interactionType: 'harmony-slider',
    nodeId: NODE_C12_BS_021,
  },
  {
    title: 'The IFDL Matrix: Balance Sheet Quadrants',
    instruction: 'Click each quadrant of the interactive corporate balance sheet (Investment, Financing, Dividend, Liquidity) to see real-world corporate actions.',
    interactionType: 'quadrant-click',
    nodeId: NODE_C12_BS_022,
  },
  {
    title: 'Trading on Equity & Financial Leverage Simulator',
    instruction: 'Vary the Debt percentage and Asset ROI sliders. Observe how financial leverage magnifies Return on Equity (ROE) when ROI > Interest rate!',
    interactionType: 'leverage-sim',
    nodeId: NODE_C12_BS_024,
  },
  {
    title: 'Working Capital Operating Cycle & Cash Conversion',
    instruction: 'Drag the slider to adjust Debtor Collection Period and Inventory Turnover Days. Watch Net Working Capital requirements shift in real time.',
    interactionType: 'working-cap-sim',
    nodeId: NODE_C12_BS_025,
  },
  {
    title: 'Securities Waterfall: Risk vs Return Architecture',
    instruction: 'Click on Debentures, Preference Shares, Retained Earnings, and Equity to compare their claim priority, tax shield, voting rights, and legal obligations.',
    interactionType: 'securities-waterfall',
    nodeId: NODE_C12_BS_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Bharat Mobility increases its Debt proportion from 10% to 70% at 8% interest while earning 16% on Assets, what will happen to Return on Equity (ROE)?',
    options: [
      'ROE will plummet because debt increases interest burden.',
      'ROE will dramatically surge because the company earns 16% on borrowed funds costing only 8% (Trading on Equity).',
      'ROE will remain exactly 16% regardless of debt proportion.',
      'The company will be automatically liquidated by the RBI.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the Debt slider to 70% and Asset ROI to 16% in the Leverage Lab below to verify the ROE surge!',
    nodeId: NODE_C12_BS_024,
  },
  {
    question: 'Predict: If an FMCG giant extends its customer credit period from 15 days to 90 days to boost sales volume, what will happen to its Working Capital requirement?',
    options: [
      'Working capital will drop to zero because sales are higher.',
      'Working capital requirement will swell significantly because massive funds get locked in Debtors.',
      'Current liabilities will automatically increase to cancel out debtors.',
      'The company will no longer need raw materials.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Debtor Credit Period slider to 90 days to see the Net Working Capital bar expand.',
    nodeId: NODE_C12_BS_025,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when Asset ROI drops below the Debt Interest rate (e.g. ROI = 4%, Debt Interest = 8%)?',
    observableOptions: [
      'ROE increases even faster.',
      'Financial leverage works in reverse: ROE collapses into negative territory because fixed interest eats up all operating earnings.',
      'Debenture holders voluntarily surrender their interest claims.',
      'The company’s fixed capital instantly turns into liquid cash.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BS_024,
  },
  {
    question: 'What pattern emerges between the production cycle duration and the working capital requirement in manufacturing?',
    observableOptions: [
      'Longer production cycles lock up capital in work-in-progress, demanding much higher working capital.',
      'Longer production cycles eliminate the need for trade credit.',
      'Production cycle length has zero correlation with working capital.',
      'Shipbuilders require less working capital than neighbourhood bakeries.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BS_025,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Board Strategy Simulation: ₹5,000 Cr Capital Blueprint',
  description: 'You are submitting the definitive capital strategy for Bharat Mobility Ltd to the Board of Directors and institutional lenders. Formulate your 4-point blueprint:',
  steps: [
    'Coordination Protocol: Establish cross-functional milestone reviews linking R&D prototyping with factory capex and nationwide dealership activations.',
    'IFDL Calibration: Recommend an optimal ₹5,000 Cr financing mix (₹2,000 Cr 7.5% Secured NCDs, ₹1,500 Cr Retained Accruals, ₹1,000 Cr QIP, ₹500 Cr ESOP/Sweat Equity).',
    'Working Capital Policy: Structure dealer credit terms at 30 days and negotiate vendor terms at 45 days to maintain a lean, resilient cash conversion cycle.',
    'Insolvency Shield: Stress-test cash flows against a 25% revenue dip to ensure EBIT interest coverage remains safely above 3.5x under IBC 2016.',
  ],
};

// ─── MAIN COMPONENT ───
export function C12_BusinessStudiesCoordinationMeaningCoordinationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BS_021,
  title = DEFAULT_PROPS.title || 'Coordination & Business Finance Master Suite',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['business_studies'] || { name: 'Business Studies', emoji: '🏢', color: 'indigo' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration Interactive State
  const [deptAlignment, setDeptAlignment] = useState({ rd: 85, prod: 80, mkt: 75, fin: 90 });
  const [activeQuadrant, setActiveQuadrant] = useState<'I' | 'F' | 'D' | 'L'>('I');
  const [simDebtRatio, setSimDebtRatio] = useState(40);
  const [simAssetRoi, setSimAssetRoi] = useState(14);
  const [simDebtorDays, setSimDebtorDays] = useState(45);
  const [simInventoryDays, setSimInventoryDays] = useState(60);
  const [selectedSecurity, setSelectedSecurity] = useState<'equity' | 'preference' | 'retained' | 'debentures'>('equity');

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Difficulty & BKT State
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

  // Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & COMPUTATIONS ───
  const launchCoordinationScore = useMemo(() => {
    return Math.round((deptAlignment.rd + deptAlignment.prod + deptAlignment.mkt + deptAlignment.fin) / 4);
  }, [deptAlignment]);

  const financialLeverageMetrics = useMemo(() => {
    const debt = simDebtRatio;
    const equity = 100 - debt;
    const totalAssets = 100; // in Cr
    const ebit = (simAssetRoi / 100) * totalAssets;
    const interestRate = 0.08;
    const interest = (debt / 100) * totalAssets * interestRate;
    const taxRate = 0.25;
    const pbt = Math.max(-50, ebit - interest);
    const tax = pbt > 0 ? pbt * taxRate : 0;
    const pat = pbt - tax;
    const roe = equity > 0 ? (pat / equity) * 100 : 0;
    const interestCoverage = interest > 0 ? (ebit / interest).toFixed(2) : 'Infinity';

    return { ebit, interest, pat, roe: roe.toFixed(1), interestCoverage, equity, debt };
  }, [simDebtRatio, simAssetRoi]);

  const workingCapitalMetrics = useMemo(() => {
    const dailySales = 5; // ₹5 Cr per day
    const debtors = simDebtorDays * dailySales;
    const inventory = simInventoryDays * 3.5;
    const cash = 50;
    const currentAssets = debtors + inventory + cash;
    const creditorDays = 40;
    const creditors = creditorDays * 3.2;
    const currentLiabilities = creditors + 20;
    const netWc = currentAssets - currentLiabilities;

    return { debtors, inventory, cash, currentAssets, creditors, currentLiabilities, netWc };
  }, [simDebtorDays, simInventoryDays]);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ───
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

  // Canvas Pulse / Radar animation loop with requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;
    let pulseRadius = 15;
    let expanding = true;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Outer boundary ring
      ctx.strokeStyle = '#312e81';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.stroke();

      // Middle ring
      ctx.strokeStyle = '#4338ca';
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing wave
      if (expanding) {
        pulseRadius += 0.4;
        if (pulseRadius >= 36) expanding = false;
      } else {
        pulseRadius -= 0.4;
        if (pulseRadius <= 15) expanding = true;
      }

      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = launchCoordinationScore > 80 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rotating radar beam
      angle += 0.04;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 38, angle, angle + 0.5);
      ctx.fillStyle = launchCoordinationScore > 80 ? 'rgba(52, 211, 153, 0.25)' : 'rgba(99, 102, 241, 0.25)';
      ctx.fill();

      // Center glowing beacon
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = launchCoordinationScore > 80 ? '#10b981' : '#f59e0b';
      ctx.shadowColor = launchCoordinationScore > 80 ? '#10b981' : '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [launchCoordinationScore]);

  // Clean inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
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
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step solution together.');
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! Coordination is the essence of management.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Strategy Labs. Explore and manipulate the live business systems.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Play Mode unlocked! Experiment with capital ratios and cash cycles with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning board-level challenges. Apply your analytical knowledge to master each competency.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis recorded! Now manipulate the live simulator to verify your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb deduction! Leverage cuts both ways.' : 'Notice how fixed interest eats operating profit when ROI is low.');
  }, []);

  const handleDeptAlignmentChange = useCallback((dept: 'rd' | 'prod' | 'mkt' | 'fin', val: number) => {
    setDeptAlignment(prev => ({ ...prev, [dept]: val }));
    audioManager.play('count');
  }, []);

  const handleQuadrantSelect = useCallback((quad: 'I' | 'F' | 'D' | 'L') => {
    setActiveQuadrant(quad);
    audioManager.play('tap');
    const labels = {
      I: 'Investment Decision: Deploying capital into high-ROI EV assets.',
      F: 'Financing Decision: Designing optimal debt vs equity capital structure.',
      D: 'Dividend Decision: Balancing shareholder returns with internal retention.',
      L: 'Liquidity Decision: Maintaining cash solvency to pay daily bills.',
    };
    speechManager.speak(labels[quad]);
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
      let base = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
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
    audioManager.play('celebration');
    speechManager.speak('Executive Simulation Complete! You have mastered ISC Class 12 Business Studies finance and coordination.');
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
      speechManager.speak('Spot on! Excellent business judgement.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Review the strategic breakdown carefully before proceeding.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-900/60 text-gold-300 border border-gold-700/50">
                ISC Class 12 • {subjectConfig.name}
              </span>
              <span className="text-xs text-slate-400">10 Core Nodes</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
              {title}
            </h1>
          </div>
        </div>

        {/* Phase Badges, Live Canvas Radar Indicator & Adaptive Level */}
        <div className="flex items-center gap-3">
          {/* Live requestAnimationFrame Canvas Sync Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <canvas ref={canvasRef} width={80} height={80} className="w-9 h-9 rounded-full bg-slate-950/80 border border-gold-900/50" />
            <div className="text-[10px] leading-tight">
              <div className="text-slate-400 font-semibold uppercase tracking-wider">Sync Radar</div>
              <div className={`font-bold ${launchCoordinationScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {launchCoordinationScore}% Live
              </div>
            </div>
          </div>

          <motion.div 
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60' :
              difficulty === 'advanced' ? 'bg-rose-950/60 text-rose-400 border-rose-700/60' :
              'bg-gold-950/60 text-gold-400 border-gold-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="text-xs text-slate-400 font-medium px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">
            Phase: <span className="text-white font-bold capitalize">{phase}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-1 uppercase tracking-wider">
              <span>🎯 Scenario Opening</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-gold-900/40 text-xs text-slate-400">
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="text-base font-bold text-amber-400 mb-2">🤔 Discovery Curiosity Hook:</h3>
            <p className="text-white font-medium text-sm md:text-base mb-4 leading-relaxed">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center font-bold text-xs text-slate-400 border border-slate-800">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <span className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Brilliance in action!' : '💡 Key Insight:'}
                  </span>
                  <p className="text-slate-300 text-xs mt-1">
                    {discoveryCorrect ? 'Cooperation is voluntary goodwill; coordination is deliberate managerial alignment.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Strategy Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-gold-600 text-white border-gold-500 shadow-md shadow-gold-600/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold text-gold-400 uppercase tracking-widest">
                  Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 font-medium mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: COORDINATION HARMONY RADAR + TOPIC SVG 1 (NODE 021) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                      {/* SVG DIAGRAM 1: Coordination as Essence of Management */}
                      <CoordinationEssenceSvg alignmentScore={launchCoordinationScore} />
                      <div className="text-center mt-2">
                        <div className="text-xs text-slate-400 font-medium">Organizational Launch Velocity</div>
                        <div className={`text-2xl font-black ${launchCoordinationScore > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {launchCoordinationScore}% Synchronized
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      {[
                        { key: 'rd' as const, label: 'R&D / Product Engineering (Battery & Specs)', color: '#6366f1' },
                        { key: 'prod' as const, label: 'Production Line (Sanand Assembly Output)', color: '#3b82f6' },
                        { key: 'mkt' as const, label: 'Marketing Blitz (National Media Ads)', color: '#ec4899' },
                        { key: 'fin' as const, label: 'Finance / Treasury (Disbursements)', color: '#10b981' },
                      ].map(dept => (
                        <div key={dept.key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-300">{dept.label}</span>
                            <span className="font-bold text-gold-300">{deptAlignment[dept.key]}%</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={100}
                            value={deptAlignment[dept.key]}
                            aria-label={`Alignment for ${dept.label}`}
                            onChange={e => handleDeptAlignmentChange(dept.key, Number(e.target.value))}
                            className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                          />
                        </div>
                      ))}

                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-200">
                        💡 <strong>Essence of Management:</strong> Coordination permeates every single function from Planning to Controlling, preventing costly departmental silos.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: IFDL QUADRANT INTERACTION + TOPIC SVG 2 (NODE 022) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 2: IFDL Quadrant Architecture */}
                  <IFDLQuadrantSvg activeQuadrant={activeQuadrant} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'I' as const, label: 'Investment', sub: 'Asset Side • Capital Budgeting', color: 'from-gold-600 to-gold-600' },
                      { id: 'F' as const, label: 'Financing', sub: 'Liability Side • Debt vs Equity', color: 'from-purple-600 to-pink-600' },
                      { id: 'D' as const, label: 'Dividend', sub: 'Profit Allocation • Sec 123', color: 'from-amber-600 to-orange-600' },
                      { id: 'L' as const, label: 'Liquidity', sub: 'Cash Solvency • Working Capital', color: 'from-emerald-600 to-teal-600' },
                    ].map(q => (
                      <motion.button
                        key={q.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleQuadrantSelect(q.id)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          activeQuadrant === q.id
                            ? 'bg-slate-800 border-gold-500 ring-2 ring-gold-500/30'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center font-black text-white text-sm mb-2`}>
                          {q.id}
                        </div>
                        <div className="font-bold text-white text-sm">{q.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{q.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Quadrant Visual Breakdown */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                    <AnimatePresence mode="wait">
                      {activeQuadrant === 'I' && (
                        <motion.div key="I" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <h4 className="text-sm font-bold text-gold-400">📈 Investment Decision (Capital Budgeting)</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong>Core Question:</strong> "Where do we deploy scarce funds on the asset side to maximize long-term firm value?"
                          </p>
                          <div className="p-3 bg-gold-950/40 rounded-lg border border-gold-900/50 text-xs text-gold-200">
                            🏢 <strong>Indian Example:</strong> Tata Motors investing ₹7,500 Cr into dedicated EV manufacturing at Sanand and battery research platforms.
                          </div>
                        </motion.div>
                      )}
                      {activeQuadrant === 'F' && (
                        <motion.div key="F" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <h4 className="text-sm font-bold text-purple-400">⚖️ Financing Decision (Capital Structure)</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong>Core Question:</strong> "From where on the liability & equity side do we raise funds at the lowest overall cost without excess risk?"
                          </p>
                          <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-900/50 text-xs text-purple-200">
                            🏢 <strong>Indian Example:</strong> Reliance Industries raising ₹53,125 Cr rights issue in May 2020 to achieve zero net-debt status.
                          </div>
                        </motion.div>
                      )}
                      {activeQuadrant === 'D' && (
                        <motion.div key="D" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <h4 className="text-sm font-bold text-amber-400">💰 Dividend Decision (Profit Retention Bridge)</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong>Core Question:</strong> "What fraction of post-tax profit is distributed to reward owners vs retained for internal expansion?"
                          </p>
                          <div className="p-3 bg-amber-950/40 rounded-lg border border-amber-900/50 text-xs text-amber-200">
                            🏢 <strong>Indian Example:</strong> TCS declaring ₹73/share final dividend (returning ~₹40,000 Cr) while retaining remaining billions for cloud R&D.
                          </div>
                        </motion.div>
                      )}
                      {activeQuadrant === 'L' && (
                        <motion.div key="L" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <h4 className="text-sm font-bold text-emerald-400">💧 Liquidity Decision (Cash Solvency)</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong>Core Question:</strong> "Do we hold sufficient cash and liquid reserves to honor daily payables, wages, and vendor invoices on time?"
                          </p>
                          <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-900/50 text-xs text-emerald-200">
                            🏢 <strong>Indian Contrast:</strong> HUL holding ₹2,847 Cr cash cushion to survive raw material swings vs Kingfisher collapsing due to zero liquid cash.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ── LAB 2: TRADING ON EQUITY & LEVERAGE (NODE 024) ── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-800 space-y-3">
                      <div className="text-xs font-bold text-gold-300 uppercase">🎯 Predict Before Testing</div>
                      <p className="text-xs md:text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 rounded-lg text-slate-300 hover:bg-slate-800 border border-slate-700/60"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="md:col-span-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-semibold">Debt Proportion: {simDebtRatio}% (Equity: {100 - simDebtRatio}%)</span>
                          <span className="text-gold-400 font-bold">D/E Ratio: {(simDebtRatio / Math.max(1, 100 - simDebtRatio)).toFixed(2)}:1</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={85}
                          value={simDebtRatio}
                          aria-label="Set debt proportion percentage"
                          onChange={e => {
                            setSimDebtRatio(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-semibold">Operating Return on Assets (ROI): {simAssetRoi}%</span>
                          <span className="text-amber-400 font-bold">Fixed Debt Rate: 8.0%</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={26}
                          value={simAssetRoi}
                          aria-label="Set operating return on assets"
                          onChange={e => {
                            setSimAssetRoi(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {predictionMade && !observationAnswered && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 mt-3">
                          <p className="text-xs text-amber-300 font-bold">{OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="space-y-1.5">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleObservation(i)}
                                className="w-full text-left p-2 text-xs bg-slate-950 rounded-lg text-slate-300 border border-slate-800 hover:bg-slate-850"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live Results Card */}
                    <div className="md:col-span-6 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Live Capital Performance</div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="p-2.5 bg-slate-950 rounded-lg">
                            <div className="text-[11px] text-slate-400">EBIT on ₹100 Cr</div>
                            <div className="text-lg font-black text-white">₹{financialLeverageMetrics.ebit.toFixed(1)} Cr</div>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg">
                            <div className="text-[11px] text-slate-400">Interest (@ 8%)</div>
                            <div className="text-lg font-black text-rose-400">₹{financialLeverageMetrics.interest.toFixed(1)} Cr</div>
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-gold-900/50">
                          <div className="text-xs text-slate-400">Return on Equity (ROE) after 25% Tax:</div>
                          <div className={`text-3xl font-black mt-0.5 ${Number(financialLeverageMetrics.roe) > simAssetRoi ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {financialLeverageMetrics.roe}%
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {Number(financialLeverageMetrics.roe) > simAssetRoi 
                              ? `🚀 Positive Leverage (+${(Number(financialLeverageMetrics.roe) - simAssetRoi).toFixed(1)}% ROE boost via Trading on Equity)`
                              : `⚠️ Negative Leverage (Interest rate exceeds asset earnings)`}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-3">
                        Interest Coverage Ratio: <strong className="text-slate-300">{financialLeverageMetrics.interestCoverage}x</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: WORKING CAPITAL CYCLE + TOPIC SVG 3 (NODE 025) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: Working Capital Operating Cycle */}
                  <WorkingCapitalCycleSvg debtorDays={simDebtorDays} inventoryDays={simInventoryDays} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Debtor Collection Period: {simDebtorDays} days</span>
                          <span className="text-gold-400 font-bold">₹{workingCapitalMetrics.debtors.toFixed(0)} Cr Debtors</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={120}
                          value={simDebtorDays}
                          aria-label="Set debtor collection period in days"
                          onChange={e => {
                            setSimDebtorDays(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Inventory Holding Period: {simInventoryDays} days</span>
                          <span className="text-gold-400 font-bold">₹{workingCapitalMetrics.inventory.toFixed(0)} Cr Stock</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={150}
                          value={simInventoryDays}
                          aria-label="Set inventory holding period in days"
                          onChange={e => {
                            setSimInventoryDays(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                        ⚡ <strong>Cash Conversion Cycle:</strong> {simDebtorDays + simInventoryDays - 40} Days from paying suppliers to collecting customer cash.
                      </div>
                    </div>

                    {/* Working Capital Balance Sheet Comparison */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Working Capital Ledger (Schedule III)</div>
                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between p-2 bg-slate-900 rounded">
                            <span className="text-slate-400">Total Current Assets (Gross WC):</span>
                            <span className="font-bold text-white">₹{workingCapitalMetrics.currentAssets.toFixed(1)} Cr</span>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-900 rounded">
                            <span className="text-slate-400">Less: Current Liabilities:</span>
                            <span className="font-bold text-rose-400">- ₹{workingCapitalMetrics.currentLiabilities.toFixed(1)} Cr</span>
                          </div>
                          <div className="flex justify-between p-2.5 bg-gold-950/60 border border-gold-700/60 rounded-lg text-sm">
                            <span className="font-bold text-gold-300">Net Working Capital Needed:</span>
                            <span className="font-black text-emerald-400">₹{workingCapitalMetrics.netWc.toFixed(1)} Cr</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2">
                        *Calculated under Companies Act 2013 Schedule III classification standards.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: SECURITIES WATERFALL + TOPIC SVG 4 (NODES 026-030) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 4: Securities Waterfall Architecture */}
                  <SecuritiesWaterfallSvg selected={selectedSecurity} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'debentures' as const, label: '1. Debentures', sub: 'Creditor • Tax Shield • Sec 71' },
                      { id: 'preference' as const, label: '2. Preference', sub: 'Hybrid • Priority Return • Sec 43(b)' },
                      { id: 'retained' as const, label: '3. Retained Earnings', sub: 'Internal • Zero Dilution • Reserves' },
                      { id: 'equity' as const, label: '4. Equity Shares', sub: 'Pure Owner • Voting • Sec 43(a)' },
                    ].map(sec => (
                      <motion.button
                        key={sec.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSecurity(sec.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedSecurity === sec.id
                            ? 'bg-gold-900/60 border-gold-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs md:text-sm">{sec.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{sec.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    <AnimatePresence mode="wait">
                      {selectedSecurity === 'debentures' && (
                        <motion.div key="deb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-bold text-rose-400">📜 Corporate Debentures (Debt Capital)</h4>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Priority 1 (Senior Claim)</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded"><strong>Return:</strong> Fixed Coupon (Charge on Profit)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Voting Rights:</strong> Strictly Prohibited (Sec 71)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Tax Shield:</strong> Yes (Sec 36(1)(iii) deductible)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Repayment:</strong> Mandatory at maturity</div>
                          </div>
                        </motion.div>
                      )}

                      {selectedSecurity === 'preference' && (
                        <motion.div key="pref" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-bold text-purple-400">🛡️ Preference Shares (Hybrid Capital)</h4>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Priority 2 (Ahead of Equity)</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded"><strong>Return:</strong> Fixed Rate Dividend (Appropriation)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Voting Rights:</strong> Rights-affecting only (Sec 50)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Tax Shield:</strong> No (Paid from post-tax profit)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Redemption:</strong> Max 20 yrs (Sec 55)</div>
                          </div>
                        </motion.div>
                      )}

                      {selectedSecurity === 'retained' && (
                        <motion.div key="ret" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-bold text-emerald-400">🌱 Retained Earnings (Ploughing Back Profits)</h4>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Internal Equity</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded"><strong>Issue Cost:</strong> ₹0 (Already in reserves)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Control Dilution:</strong> Zero (Existing owners)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Opportunity Cost:</strong> Foregone shareholder returns</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Discretion:</strong> Board Report (Sec 134(3)(j))</div>
                          </div>
                        </motion.div>
                      )}

                      {selectedSecurity === 'equity' && (
                        <motion.div key="eq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-bold text-gold-400">👑 Equity Shares (True Ownership Capital)</h4>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">Residual Claimant</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded"><strong>Return:</strong> Fluctuating Dividend (Sec 123)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Voting Rights:</strong> 1 vote per share (Sec 47)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Duration:</strong> Permanent (Non-redeemable)</div>
                            <div className="p-2 bg-slate-900 rounded"><strong>Dilution Risk:</strong> High when issuing new stock</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-500 font-bold">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    Unlock Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">🔬 Free Corporate Sandbox</span>
              <h3 className="text-xl font-black text-white">Full Financial Sandbox Simulator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Tweak capital ratios, asset productivity, and debtor collection speeds with zero evaluation pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-gold-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase">Capital Mix vs ROE Sensitivity</div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: '0% Debt', roe: (simAssetRoi * 0.75).toFixed(1), cost: 14 },
                    { name: '20% Debt', roe: ((simAssetRoi * 100 - 1.6 * 100) / 80 * 0.75).toFixed(1), cost: 12.8 },
                    { name: '40% Debt', roe: ((simAssetRoi * 100 - 3.2 * 100) / 60 * 0.75).toFixed(1), cost: 11.6 },
                    { name: '60% Debt', roe: ((simAssetRoi * 100 - 4.8 * 100) / 40 * 0.75).toFixed(1), cost: 10.4 },
                    { name: '80% Debt', roe: ((simAssetRoi * 100 - 6.4 * 100) / 20 * 0.75).toFixed(1), cost: 9.2 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="roe" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} name="Return on Equity" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase">Interactive Levers</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Debt Percentage ({simDebtRatio}%)</span>
                    <span className="text-gold-400 font-bold">ROE: {financialLeverageMetrics.roe}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={simDebtRatio}
                    aria-label="Set sandbox debt percentage"
                    onChange={e => setSimDebtRatio(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Debtor Credit ({simDebtorDays} Days)</span>
                    <span className="text-emerald-400 font-bold">Net WC: ₹{workingCapitalMetrics.netWc.toFixed(0)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={120}
                    value={simDebtorDays}
                    aria-label="Set sandbox debtor days"
                    onChange={e => setSimDebtorDays(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black px-3 py-1 rounded-xl bg-gold-950 text-gold-300 border border-gold-800">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Competency: <strong className="text-white">{challenge.competencyLevel}</strong>
              </span>
            </div>

            <div className="w-full md:w-64">
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
            wrongFlash ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/50' : 'border-slate-800 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Node ID: {challenge.nodeId}
              </span>
              <span className="text-xs text-amber-400 font-semibold">
                Tier: {challenge.difficulty.toUpperCase()}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-black text-white leading-relaxed mb-5">
              {challenge.question}
            </h3>

            {/* MCQ CLASSIFY / DISTINGUISH / MATCH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-xs text-slate-400 border border-slate-800">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Available Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_existing_cash', desc: 'Existing Owners paying cash at discount (Preserves %)' },
                    { id: 'target_existing_free', desc: 'Existing Owners receiving free shares via Capitalisation of Reserves' },
                    { id: 'target_employees_vest', desc: 'Employees granted options vesting over service years' },
                    { id: 'target_institutional_speed', desc: 'Institutional Buyers (QIBs) for rapid placement' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500'
                          : 'bg-slate-950 border-slate-700 hover:border-gold-400'
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-1">{target.desc}</div>
                      <div className="font-bold text-sm text-gold-300 min-h-[24px]">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '📥 Drop matching instrument label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify All Mappings →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIndex) => (
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
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <span className="text-slate-500 text-xs">☰ Drag to Reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="mt-3 px-6 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    aria-label="Enter numerical answer"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm w-48 focus:border-gold-500 focus:outline-none"
                  />
                  <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/80 border border-gold-700 text-gold-200 text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                    >
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-300 font-bold ml-1">✕</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Constructed Blueprint →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/80 to-slate-950 border border-gold-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gold-300 uppercase tracking-wider">
                    📚 Board Examiner's Analytical Solution:
                  </span>
                  <span className="text-xs text-slate-400">Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-gold-100 leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gold-900/50">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 text-white text-xs font-bold rounded-xl"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim()).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Executive Simulation →' : 'Next Board Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY WITH MOTIVATIONAL FEEDBACK & SPACED REPETITION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto border border-emerald-500">
              🏆
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed Successfully!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the comprehensive ISC Class 12 Business Studies Coordination and Business Finance suite.
            </p>

            {/* MANDATORY MOTIVATIONAL FEEDBACK BASED ON ERROR COUNT */}
            <div className={`p-4 rounded-2xl border text-center max-w-lg mx-auto ${
              errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' :
              errors <= 3 ? 'bg-gold-950/80 border-gold-500 text-gold-300' :
              errors <= 7 ? 'bg-amber-950/80 border-amber-500 text-amber-300' :
              'bg-rose-950/80 border-rose-500 text-rose-300'
            }`}>
              <div className="text-xl font-black">
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0 && 'Flawless strategic and financial judgment! You demonstrated complete mastery of coordination and corporate finance principles.'}
                {errors >= 1 && errors <= 3 && 'Impressive strategic acumen! You navigated corporate decisions with strong financial intuition.'}
                {errors >= 4 && errors <= 7 && 'You have built a solid foundation. Review the key formulas and legal provisions to sharpen your scores.'}
                {errors >= 8 && 'Persistence is the hallmark of every great leader. Study the analytical explanations and try again!'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Final Score</div>
                <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Mastery Level</div>
                <div className="text-xl font-black text-gold-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Recommended SRS Review</div>
                <div className="text-xl font-black text-amber-400">
                  {errors === 0 ? 'In 7 Days' : errors <= 3 ? 'In 3 Days' : 'In 1 Day'}
                </div>
              </div>
            </div>
          </div>

          {/* Spaced Repetition SRS Prominent Card */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/50 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SuperMemo SM-2 Protocol)
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                errors === 0 ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600' :
                errors <= 3 ? 'bg-gold-900/60 text-gold-300 border border-gold-600' :
                'bg-rose-900/60 text-rose-300 border border-rose-600'
              }`}>
                {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response accuracy ({scoreBreakdown.correct}/{scoreBreakdown.total}) and {errors} recorded missteps, the optimal memory consolidation window calculated by the algorithm requires you to review this topic again in <strong className="text-amber-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock these concepts into long-term retention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block font-semibold">0 Errors (Mastered)</span>
                <span className="text-emerald-400 font-bold text-sm">Review in 7 days</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block font-semibold">1-3 Errors (Consolidating)</span>
                <span className="text-gold-400 font-bold text-sm">Review in 3 days</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block font-semibold">4+ Errors (Reinforcing)</span>
                <span className="text-rose-400 font-bold text-sm">Review in 1 day</span>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🔍 Targeted Misconceptions Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/50 space-y-4">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-gold-900 text-gold-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BusinessStudiesCoordinationMeaningCoordinationSim;