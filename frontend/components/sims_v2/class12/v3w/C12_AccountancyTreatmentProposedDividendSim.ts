import type { SimDef } from '../../engine/types';
import C12_AccountancyTreatmentProposedDividendSim from '../../../simulations/c6_12/C12_AccountancyTreatmentProposedDividendSim';

/** v3 wrapped master — C12_AccountancyTreatmentProposedDividendSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancytreatmentproposeddividendsim: SimDef = {
    id: 'v3w_c12_accountancytreatmentproposeddividendsim',
    title: 'Treatment Proposed Dividend',
    subtitle: 'This node covers the meaning, objectives, benefits, scope (AS-3 applicability),.',
    classLevel: 12, subject: 'accountancy', topic: 'Cash Flow Statement: Meaning, Objectives and Scope (AS-3)',
    chapters: [],
    nodeIds: ['c12_acc_cbse_09_001', 'c12_acc_cbse_09_002', 'c12_acc_cbse_09_003', 'c12_acc_cbse_09_005', 'c12_acc_cbse_09_006', 'c12_acc_cbse_09_007', 'c12_acc_cbse_09_008', 'c12_acc_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you run a small bakery. Your profit and loss statement shows a profit of ₹50,000, but your bank.', goal: 'Master Treatment Proposed Dividend.' },
    discovery: {
        question: 'A company purchases machinery worth ₹10,00,000 by issuing equity shares of the same value. How is this transaction treated in the Cash Flow Statement?',
        options: ['This transaction is NOT shown in the Cash Flow Statement', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
        answer: 'This transaction is NOT shown in the Cash Flow Statement',
        hook: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
    },
    teaching: [
        { title: 'A Cash Flow Statement is a financial.', text: 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3 (AS-3) that shows the inflows and outflows of cash and cash equivalents of an enterprise during a specific period,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_001', title: 'A Cash Flow Statement is a financial.',
          scaffold: { problem: 'Classify the following transactions for a TEXTILE MANUFACTURING COMPANY (non-financial enterprise) as per AS-3: (1) Cash sales of fabric.',
            steps: [
            { text: 'Identify the enterprise type — textile manufacturing = non-financial enterprise.' },
            { text: 'Recall AS-3 classification rules for non-financial enterprises: Operating = core business; Investing = long-term.' },
            { text: 'Classify each: (1) Operating inflow (core revenue), (2) Investing outflow (fixed asset), (3) Financing inflow.' },
            { text: 'Verify no transaction is missed and classification matches AS-3 rules.' },
            { text: 'Present in a table for clarity.', faded: true, blankAnswer: '(1) Operating Inflow, (2) Investing Outflow, (3) Financing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_002', title: 'As per Accounting Standard-3 (AS-3),.',
          scaffold: { problem: 'On 31st March 2024, the Balance Sheet of XYZ Ltd. shows the following under Current Assets: (i) Cash in hand ₹45,000, (ii) Current Account.',
            steps: [
            { text: 'Identify items meeting "Cash" definition: Cash in hand (₹45,000) + Demand deposit (Current Account ₹3,20,000) =.' },
            { text: 'Evaluate each investment for Cash Equivalent criteria: (a) SBI FD: maturity 2 months (< 3 months from 1 Feb to 31 Mar),.' },
            { text: 'Sum Cash Equivalents: SBI FD ₹5,00,000 + Commercial Paper ₹20,00,000 = ₹25,00,000.' },
            { text: 'Total Cash and Cash Equivalents = Cash (₹3,65,000) + Cash Equivalents (₹25,00,000) = ₹28,65,000.' },
            { text: 'Verify: ICICI FD (₹10,00,000) and TCS Shares (₹15,00,000) are excluded.', faded: true, blankAnswer: '₹28,65,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_003', title: 'Classification of cash flows is the.',
          scaffold: { problem: 'Classify the following for a **textile manufacturing company** with justification: (1) Cash received from sale of fabric; (2) Cash paid for.',
            steps: [
            { text: 'Identify the enterprise\'s main business — manufacturing and selling fabric (operating).' },
            { text: 'For each item, ask: Does it arise from main operations? → Operating. Does it involve long-term asset/investment?' },
            { text: 'Apply to each: (1) Sale of fabric = main revenue → Operating inflow.' },
            { text: 'Verify no item is a non-cash transaction or extraordinary item here.' },
            { text: 'Present final classification in a table.', faded: true, blankAnswer: 'Operating: (1) Inflow, (2) Outflow, (8) Outflow' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_005', title: 'The indirect method of ascertaining.',
          scaffold: { problem: 'From the following data of PQR Ltd. for the year ended 31st March 2024, calculate cash flows from operating activities using the indirect.',
            steps: [
            { text: 'Write the starting figure — Net Profit before Tax & Extraordinary Items = ₹8,50,000.' },
            { text: 'Add non-cash expenses: Depreciation ₹1,20,000 + Goodwill written off ₹30,000 = ₹1,50,000. Subtotal = ₹10,00,000.' },
            { text: 'Adjust non-operating items: Add back interest paid (financing outflow) ₹80,000; Deduct profit on sale of machinery.' },
            { text: 'Adjust working capital changes: Increase in Trade Receivables (↑ current asset) → deduct ₹70,000; Decrease in Trade.' },
            { text: 'Deduct Income Tax Paid ₹2,00,000 → Net Cash from Operating Activities = ₹6,70,000.', faded: true, blankAnswer: '₹6,70,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_006', title: 'Cash flows from investing activities.',
          scaffold: { problem: 'From the following Balance Sheet extracts of "Shree Cement Ltd.", calculate cash flows from investing activities for the year ended 31st.',
            steps: [
            { text: 'Identify all investing activity items from Balance Sheet changes — Plant & Machinery (gross), Patents, Non-current.' },
            { text: 'Prepare Plant & Machinery Account to find cash paid for purchase.' },
            { text: 'Prepare Patents Account. Opening ₹20,00,000 - Amortisation ₹2,00,000 = Closing ₹18,00,000, but given ₹15,00,000 →.' },
            { text: 'Non-current Investments: Opening ₹10,00,000 + Purchases (?) = Closing ₹25,00,000 → Purchases = ₹15,00,000 (no sale.' },
            { text: 'Compile investing activities:', faded: true, blankAnswer: 'Net cash used in investing activities = ₹34,00,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_007', title: 'Cash flows from financing activities.',
          scaffold: { problem: 'Greenfield Ltd. (a non-financial enterprise) provides the following information for the year ended 31st March 2024:',
            steps: [
            { text: 'Identify cash inflows from financing: Proceeds from issue of equity shares = Increase in equity capital = ₹25,00,000 -.' },
            { text: 'Identify cash outflows from financing: Redemption of preference shares = ₹2,00,000 + 10% premium = ₹2,20,000.' },
            { text: 'Calculate net cash flow from financing activities = Inflows - Outflows = ₹8,00,000 - ₹9,60,000 = -₹1,60,000 (net cash.' },
            { text: 'Present in the prescribed format with clear line items.' },
            { text: 'Verify that the change in each liability/capital account matches the cash flows and non-cash adjustments (e.g.,.', faded: true, blankAnswer: 'Cash Flows from Financing Activities' }
            ] } },
        { type: 'dissect', nodeId: 'c12_acc_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Treatment Proposed Dividend', spots: [
            { id: 's1', label: 'A Cash Flow Statement is', prompt: 'Which idea is this? — A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3.', answer: 'A Cash Flow Statement is', options: ['A Cash Flow Statement is', 'As per Accounting Standard-3 AS-3', 'Classification of cash flows is', 'The indirect method of ascertaining'] },
            { id: 's2', label: 'As per Accounting Standard-3 AS-3', prompt: 'Which idea is this? — As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits.', answer: 'As per Accounting Standard-3 AS-3', options: ['As per Accounting Standard-3 AS-3', 'A Cash Flow Statement is', 'Classification of cash flows is', 'The indirect method of ascertaining'] },
            { id: 's3', label: 'Classification of cash flows is', prompt: 'Which idea is this? — Classification of cash flows is the process of categorizing all cash inflows and outflows.', answer: 'Classification of cash flows is', options: ['Classification of cash flows is', 'A Cash Flow Statement is', 'As per Accounting Standard-3 AS-3', 'The indirect method of ascertaining'] },
            { id: 's4', label: 'The indirect method of ascertaining', prompt: 'Which idea is this? — The indirect method of ascertaining cash flows from operating activities starts with net.', answer: 'The indirect method of ascertaining', options: ['The indirect method of ascertaining', 'A Cash Flow Statement is', 'As per Accounting Standard-3 AS-3', 'Classification of cash flows is'] },
            { id: 's5', label: 'Cash flows from investing activities', prompt: 'Which idea is this? — Cash flows from investing activities represent the cash inflows and outflows arising from.', answer: 'Cash flows from investing activities', options: ['Cash flows from investing activities', 'A Cash Flow Statement is', 'As per Accounting Standard-3 AS-3', 'Classification of cash flows is'] },
            { id: 's6', label: 'Cash flows from financing activities', prompt: 'Which idea is this? — Cash flows from financing activities are the cash inflows and outflows that result in.', answer: 'Cash flows from financing activities', options: ['Cash flows from financing activities', 'A Cash Flow Statement is', 'As per Accounting Standard-3 AS-3', 'Classification of cash flows is'] }
          ] } }
    ],
    explore: { component: C12_AccountancyTreatmentProposedDividendSim, prompt: 'Explore the interactive — Treatment Proposed Dividend' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'standard',
          question: 'A Cash Flow Statement is a financial statement prepared as per Accounting.',
          hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company purchases machinery worth ₹10,00,000 by issuing equity shares of the same value. How is this transaction treated in the Cash Flow Statement?', answer: 'This transaction is NOT shown in the Cash Flow Statement',
                  options: ['This transaction is NOT shown in the Cash Flow Statement', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Classify the following for a non-financial enterprise: (a) Interest paid on debentures, (b) Dividend received on shares held as investment, (c) Cash receipts.', answer: 'Interest paid on debentures, (',
                  options: ['Interest paid on debentures, (', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company" is.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company reports a net profit of ₹10,00,000. During the year, trade receivables increased by ₹2,00,000, inventory decreased by ₹50,000, and trade payables.', answer: 'Cash from operations will be HIGHER than net profit by ₹50,000',
                  options: ['Cash from operations will be HIGHER than net profit by ₹50,000', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Create a realistic scenario for a "Software Development Company" where the same activity — "Purchase of shares" — could be classified as operating for one.', answer: 'Scenario: Company A is a share brokerage firm (operating activity',
                  options: ['Scenario: Company A is a share brokerage firm (operating activity', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company" is.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_002', difficulty: 'standard',
          question: 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Balance Sheet: Assets Classification - Fixed.',
          misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits',
                  options: ['As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'Classification of cash flows is the process of categorizing all cash inflows and outflows', 'The indirect method of ascertaining cash flows from operating activities starts with net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s wrong:** Students.' }
          ],
            remediations: { 'misconception-all-short-term-investments': { steps: ['If the student cannot correctly classify items using both criteria: 1.', '**Revisit the NCERT definition (Section 6.3)** — read it aloud twice, highlighting the two criteria with different.', '**Create a 2×2 Decision Matrix** on paper: - Rows: Maturity ≤ 3 months?', '(Yes/No) - Columns: Insignificant value risk?'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: *"Any investment with a maturity of less than 3 months automatically qualifies as a Cash Equivalent."* Provide a counter-example from.', answer: 'Correct Answer: The statement is **false**',
                  options: ['Correct Answer: The statement is **false**', 'True, 3 months is the rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s wrong:** Students.' }
          ],
            remediations: { 'misconception-all-short-term-investments': { steps: ['If the student cannot correctly classify items using both criteria: 1.', '**Revisit the NCERT definition (Section 6.3)** — read it aloud twice, highlighting the two criteria with different.', '**Create a 2×2 Decision Matrix** on paper: - Rows: Maturity ≤ 3 months?', '(Yes/No) - Columns: Insignificant value risk?'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_003', difficulty: 'standard',
          question: 'Classification of cash flows is the process of categorizing all cash inflows.',
          hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001) to recall how.',
          misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery →.',
          parts: [
                { id: 'a', prompt: 'State the three categories of cash flow activities as per AS-3 and give one typical cash inflow example for each.', answer: 'The three categories are: (1) Operating activities',
                  options: ['The three categories are: (1) Operating activities', 'purchase of raw material', 'machinery → investing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' },
                { id: 'b', prompt: 'Classify the following into operating, investing, or financing activities with justification: (a) Cash paid for income tax on operating profit; (b) Cash paid.', answer: 'Cash paid for income tax on operating profit',
                  options: ['Cash paid for income tax on operating profit', 'machinery → investing', 'loan → financing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' }
          ],
            remediations: { 'classification-is-based-solely-on': { steps: ['Re-read AS-3 paragraphs 6.5.1–6.5.3 in NCERT (pages 244–246) focusing on the phrases "principal revenue-generating.', 'Make a 3-column table labeled Operating/Investing/Financing. Write the **definition** of each in your own words (not.', 'Take the 33 items from "Test Your Understanding-I" (NCERT p.247) and classify each while saying aloud: "Is this the.', 'Re-attempt Diagnostic Questions 2, 3, 5. If any error persists, revisit the specific AS-3 paragraph for that item.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery →.',
          parts: [
                { id: 'a', prompt: '"Interest paid is always a financing activity." Evaluate this statement with reference to AS-3 for financial and non-financial enterprises.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'machinery → investing', 'loan → financing', 'classification is based solely on the *asset/liability account* involved (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' },
                { id: 'b', prompt: 'Create a table with 3 columns (Operating, Investing, Financing) and list 3 distinct cash inflows and 3 distinct cash outflows for a **software development.', answer: '**Operating**: Inflows',
                  options: ['**Operating**: Inflows', 'machinery → investing', 'loan → financing', 'classification is based solely on the *asset/liability account* involved (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' }
          ],
            remediations: { 'classification-is-based-solely-on': { steps: ['Re-read AS-3 paragraphs 6.5.1–6.5.3 in NCERT (pages 244–246) focusing on the phrases "principal revenue-generating.', 'Make a 3-column table labeled Operating/Investing/Financing. Write the **definition** of each in your own words (not.', 'Take the 33 items from "Test Your Understanding-I" (NCERT p.247) and classify each while saying aloud: "Is this the.', 'Re-attempt Diagnostic Questions 2, 3, 5. If any error persists, revisit the specific AS-3 paragraph for that item.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_005', difficulty: 'standard',
          question: 'The indirect method of ascertaining cash flows from operating activities starts.',
          hint: 'If stuck on working capital sign logic, revisit **c11_acc_cbse_08_010**.',
          misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"** by.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The indirect method of ascertaining cash flows from operating activities starts with net',
                  options: ['The indirect method of ascertaining cash flows from operating activities starts with net', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'Classification of cash flows is the process of categorizing all cash inflows and outflows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"** by rote, without.' }
          ],
            remediations: { 'students-treat-every-increase-in': { steps: ['Go back to **c12_acc_cbse_09_003** (Classification of Cash Flows) and re-learn the operating/investing/financing.', 'Revisit **c11_acc_cbse_08_010** (Adjustments: Outstanding/Prepaid Expenses) to master how accruals affect profit vs.', 'Practice the "Cash T-account" technique: for each working capital item, draw a T-account, post the opening/closing.', 'Re-attempt Diagnostic Question 3 with the T-account method for each working capital item.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_006', difficulty: 'standard',
          question: 'Cash flows from investing activities represent the cash inflows and outflows.',
          hint: 'If stuck on ledger account reconstruction, revisit **c11_acc_cbse_03_010** (Posting from.',
          misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term.',
          parts: [
                { id: 'a', prompt: 'According to AS-3, which of the following is classified as a cash outflow from investing activities for a non-financial enterprise?', answer: 'B) Purchase of machinery for production',
                  options: ['Correct answer: B) Purchase of machinery for production', 'investing activities', 'asset purchase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term investments.' },
                { id: 'b', prompt: 'From the following data, calculate the cash paid for purchase of machinery during the year: - Machinery (at cost) on 1.4.2022: ₹10,00,000 - Machinery (at cost).', answer: '₹6,00,000',
                  options: ['Correct answer: ₹6,00,000', 'investing activities', 'asset purchase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term investments.' }
          ],
            remediations: { 'investing-activities-include-any-purchase': { steps: ['If a student misclassifies trading securities or cash equivalents as investing: 1.', 'Revisit node **c12_acc_cbse_09_002** (Cash and Cash Equivalents) — list the 3-month maturity and insignificant risk.', 'Revisit node **c12_acc_cbse_09_003** (Classification of Cash Flows) — study the "purpose test": Is it for trading.', 'Do a re-diagnostic: Give 5 transactions (e.g., buy 3-month T-bill, buy shares for long-term, buy raw material, buy.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Since the purchase of a building by issuing equity shares does not involve cash, it should be completely ignored in the Cash.', answer: 'Critique: The statement is incorrect',
                  options: ['Critique: The statement is incorrect', 'ignore completely', 'investing activities', 'asset purchase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term investments.' }
          ],
            remediations: { 'investing-activities-include-any-purchase': { steps: ['If a student misclassifies trading securities or cash equivalents as investing: 1.', 'Revisit node **c12_acc_cbse_09_002** (Cash and Cash Equivalents) — list the 3-month maturity and insignificant risk.', 'Revisit node **c12_acc_cbse_09_003** (Classification of Cash Flows) — study the "purpose test": Is it for trading.', 'Do a re-diagnostic: Give 5 transactions (e.g., buy 3-month T-bill, buy shares for long-term, buy raw material, buy.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_007', difficulty: 'standard',
          question: 'Cash flows from financing activities are the cash inflows and outflows that.',
          hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_011 (Accounting Equation) and.',
          misconception: 'Students often treat "proposed dividend" as a cash outflow in the year it is proposed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cash flows from financing activities are the cash inflows and outflows that result in',
                  options: ['Cash flows from financing activities are the cash inflows and outflows that result in', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'Classification of cash flows is the process of categorizing all cash inflows and outflows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "proposed dividend" as a cash outflow in the year it is proposed.' }
          ],
            remediations: { 'students-often-treat-proposed-dividend': { steps: ['If the student makes this error, first clarify the timeline: "Proposed dividend → AGM approval → Dividend payable →.', 'Show that cash outflow occurs only in Year 2.', 'Next, give a mini-case: "Balance sheet shows proposed dividend ₹50,000 on 31/3/2023 and ₹60,000 on 31/3/2024.', 'Dividend paid during 2023-24 was ₹50,000." Ask them to identify the cash outflow for financing activities (₹50,000).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
