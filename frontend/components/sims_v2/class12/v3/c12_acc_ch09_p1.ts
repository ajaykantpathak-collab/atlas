import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch09_p1: SimDef = {
    id: 'v3_c12_acc_ch09_p1',
    title: 'Cash Flow Statement · Part 1/2',
    subtitle: '₹50,000 profit, shrinking bank balance — solve the mystery of the missing cash.',
    classLevel: 12, subject: 'accountancy', topic: 'Cash Flow Statement · Part 1/2',
    chapters: ['c12_acc_ch09'],
    nodeIds: ['c12_acc_cbse_09_001', 'c12_acc_cbse_09_002', 'c12_acc_cbse_09_003', 'c12_acc_cbse_09_004', 'c12_acc_cbse_09_005', 'c12_acc_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'CFO explaining liquidity to investors', intro: 'Companies don\'t die of losses — they die of empty bank accounts. This statement is the early-warning system.', goal: 'Define cash and cash equivalents per AS-3 and classify flows into operating, investing and financing.' },
    discovery: {
        question: 'Your bakery\'s P&L shows ₹50,000 profit — yet your bank balance fell. Which statement explains the disappearance?',
        options: ['The Cash Flow Statement — it tracks actual cash, stripping out credit sales and non-cash items like depreciation', 'The Balance Sheet — it lists where every rupee went during the year', 'The P&L again — profit and cash are the same number if calculated correctly', 'The auditor\'s report — it reconciles profit to bank balance'],
        answer: 'The Cash Flow Statement — it tracks actual cash, stripping out credit sales and non-cash items like depreciation',
        hook: 'Profit is an opinion; cash is a fact. Credit sales inflate profit without moving a rupee, and depreciation cuts profit without spending one — AS-3 exists to expose that gap.',
    },
    teaching: [
        { title: 'Cash Flow Statement: Meaning, Objectives and Scope (AS-3)', text: 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3 (AS-3) that shows the inflows and outflows of cash and cash equivalents of an enterprise during a specific period.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconcile profit to bank balance: classify movements into operating, investing and financing, then decide which near-cash items — 6-month FD, 45-day T-bills, blue-chip shares — qualify as cash equivalents.',
        labels: ['Cash Flow Statement: Meaning,', 'Cash and Cash Equivalents', 'Classification of Cash Flows', 'Cash Flows from Operating', 'Cash Flows from Investing'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_001', title: 'Cash Flow Statement: Meaning, Objectives and Scope (AS-3)',
          caseStudy: { intro: 'Imagine you run a small bakery. Your profit and loss statement shows a profit of ₹50,000, but your bank balance has actually decreased. Why?',
            decisions: [{ prompt: 'State the primary objective of a Cash Flow Statement as per AS-3.', options: [
                { text: 'The primary objective is to provide useful information about cash flows (inflows and', outcome: 'The primary objective is to provide useful information about cash flows (inflows and outflows).' },
                { text: 'to show profit', outcome: 'Not quite — Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash.', reveals: 'cash-flow-statement-shows-profit' },
                { text: 'to show financial position', outcome: 'Not quite — Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash.', reveals: 'cash-flow-statement-shows-profit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_002', title: 'Cash and Cash Equivalents: Definition and Components',
          caseStudy: { intro: 'Imagine you are the CFO of a startup. Your bank balance shows ₹50 lakh, but you also hold ₹20 lakh in a 6-month Fixed Deposit, ₹10 lakh in Treasury Bills.',
            decisions: [{ prompt: 'State the two components of "Cash" as defined in AS-3.', options: [
                { text: 'Correct Answer: (1) Cash in hand (physical currency), (2) Demand deposits with banks', outcome: 'Correct Answer: (1) Cash in hand (physical currency), (2) Demand deposits with banks (balances.' },
                { text: 'time deposits', outcome: 'Not quite — **Misconception:** "All short-term investments with maturity less than 3 months are Cash.', reveals: 'misconception-all-short-term-investments' },
                { text: 'cheques in hand not yet deposited', outcome: 'Not quite — **Misconception:** "All short-term investments with maturity less than 3 months are Cash.', reveals: 'misconception-all-short-term-investments' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_003', title: 'Classification of Cash Flows: Operating, Investing and Financing Activities',
          caseStudy: { intro: 'Imagine you run a small bakery. Cash comes in when customers buy cakes (operating), goes out when you buy a new oven (investing), and comes in when you take.',
            decisions: [{ prompt: 'State the three categories of cash flow activities as per AS-3 and give one typical cash inflow example for each.', options: [
                { text: 'The three categories are: (1) Operating activities', outcome: 'The three categories are: (1) Operating activities — e.g., cash receipts from sale of goods; (2).' },
                { text: 'purchase of raw material', outcome: 'Not quite — Students often think classification is based solely on the *asset/liability account* involved.', reveals: 'classification-is-based-solely-on' },
                { text: 'machinery → investing', outcome: 'Not quite — Students often think classification is based solely on the *asset/liability account* involved.', reveals: 'classification-is-based-solely-on' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_004', title: 'Cash Flows from Operating Activities: Direct Method',
          caseStudy: { intro: 'Imagine you run a small bakery. Your Profit & Loss shows ₹5,00,000 revenue, but how much actual cash did you collect? Some customers bought on credit.',
            decisions: [{ prompt: 'State the fundamental difference between the Direct Method and the Indirect Method of reporting cash flows from operating activities as per.', options: [
                { text: 'The Direct Method discloses major classes of gross cash receipts and gross cash payments', outcome: 'The Direct Method discloses major classes of gross cash receipts and gross cash payments (e.g.' },
                { text: 'Direct method starts with net profit', outcome: 'Not quite — Students often treat the Direct Method as just "rearranging the indirect method" and try to start.', reveals: 'students-often-treat-the-direct' },
                { text: 'more receivables means more sales', outcome: 'Not quite — Students often treat the Direct Method as just "rearranging the indirect method" and try to start.', reveals: 'students-often-treat-the-direct' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_005', title: 'Cash Flows from Operating Activities: Indirect Method',
          scaffold: { problem: 'From the following data of PQR Ltd. for the year ended 31st March 2024, calculate cash flows from operating activities using the indirect.',
            steps: [
            { text: 'Write the starting figure — Net Profit before Tax & Extraordinary Items = ₹8,50,000.' },
            { text: 'Add non-cash expenses: Depreciation ₹1,20,000 + Goodwill written off ₹30,000 = ₹1,50,000. Subtotal = ₹10,00,000.' },
            { text: 'Adjust non-operating items: Add back interest paid (financing outflow) ₹80,000; Deduct profit on sale of machinery.' },
            { text: 'Adjust working capital changes: Increase in Trade Receivables (↑ current asset) → deduct ₹70,000; Decrease in Trade.' },
            { text: 'Deduct Income Tax Paid ₹2,00,000 → Net Cash from Operating Activities = ₹6,70,000.', faded: true, blankAnswer: '₹6,70,000' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_006', title: 'Cash Flows from Investing Activities: Identification and Treatment',
          caseStudy: { intro: 'Imagine you are analyzing the financial health of a manufacturing company, "Bharat Machines Ltd." The company reports a profit of ₹50 lakh, but its bank.',
            decisions: [{ prompt: 'According to AS-3, which of the following is classified as a cash outflow from investing activities for a non-financial enterprise?', options: [
                { text: 'Correct answer: B) Purchase of machinery for production', outcome: 'Correct answer: B) Purchase of machinery for production. Explanation: AS-3 defines investing.' },
                { text: 'investing activities', outcome: 'Not quite — Students often believe that "investing activities" include *any* purchase of assets, including.', reveals: 'investing-activities-include-any-purchase' },
                { text: 'asset purchase', outcome: 'Not quite — Students often believe that "investing activities" include *any* purchase of assets, including.', reveals: 'investing-activities-include-any-purchase' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping in his uncle\'s bakery over the break, a student sees the P&L show ₹50,000 profit — but the bank balance has fallen. The uncle suspects the accountant fudged the books.',
            decisions: [{ prompt: 'What actually explains the gap?', options: [
                { text: 'Profit is accrual-based, cash is not: credit sales, a cash purchase of a new oven (investing outflow) and a loan repayment (financing outflow) can shrink cash while profit stays positive — a cash flow statement would show it.', outcome: 'AS-3 splits flows into operating, investing and financing so exactly this mystery — profit up, cash down — gets explained.' },
                { text: 'The accountant must be wrong — profit and bank balance are the same thing measured two ways.', outcome: 'Profit counts revenue when earned, not when cash arrives; non-cash charges like depreciation and credit sales decouple the two legitimately.', reveals: 'profit-equals-cash' },
                { text: 'The oven bought by issuing shares to the supplier should appear as an investing outflow in the cash flow statement.', outcome: 'No cash moved — AS-3 excludes non-cash investing/financing transactions from the statement (they\'re disclosed elsewhere), so it can\'t explain the cash drop.', reveals: 'non-cash-in-cashflow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now answer the question that bankrupts profitable companies: where did the cash go? AS-3 classification is a guaranteed board question — and the core skill of every CFO.',
            decisions: [{ prompt: 'What comes next? Cash Flow Statement · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cash Flow Statement · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'standard',
          question: 'A Cash Flow Statement is a financial statement prepared as per Accounting.',
          hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company purchases machinery worth ₹10,00,000 by issuing equity shares of the same value. How is this transaction treated in the Cash Flow Statement?', answer: 'This transaction is NOT shown in the Cash Flow Statement',
                  options: ['This transaction is NOT shown in the Cash Flow Statement', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to c11_acc_cbse_08_012).',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Classify the following for a non-financial enterprise: (a) Interest paid on debentures, (b) Dividend received on shares held as investment, (c) Cash receipts.', answer: 'Interest paid on debentures, (',
                  options: ['Interest paid on debentures, (', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to c11_acc_cbse_08_012).',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company reports a net profit of ₹10,00,000. During the year, trade receivables increased by ₹2,00,000, inventory decreased by ₹50,000, and trade payables.', answer: 'Cash from operations will be HIGHER than net profit by ₹50,000',
                  options: ['Cash from operations will be HIGHER than net profit by ₹50,000', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to c11_acc_cbse_08_012).',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Create a realistic scenario for a "Software Development Company" where the same activity — "Purchase of shares" — could be classified as operating for one.', answer: 'Scenario: Company A is a share brokerage firm (operating activity',
                  options: ['Scenario: Company A is a share brokerage firm (operating activity', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to c11_acc_cbse_08_012).',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_002', difficulty: 'standard',
          question: 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Balance Sheet: Assets Classification - Fixed.',
          misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits',
                  options: ['As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'Classification of cash flows is the process of categorizing all cash inflows and outflows', 'The Direct Method of presenting cash flows from operating activities reports major'],
                  hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Balance Sheet: Assets Classification - Fixed and.',
                  misconception: '**Misconception:** "All short-term investments with maturity less than 3 months are Cash Equivalents." **Why it\'s wrong:** Students.' }
          ],
            remediations: { 'misconception-all-short-term-investments': { steps: ['If the student cannot correctly classify items using both criteria: 1.', '**Revisit the NCERT definition (Section 6.3)** — read it aloud twice, highlighting the two criteria with different.', '**Create a 2×2 Decision Matrix** on paper: - Rows: Maturity ≤ 3 months?', '(Yes/No) - Columns: Insignificant value risk?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_003', difficulty: 'standard',
          question: 'Classification of cash flows is the process of categorizing all cash inflows.',
          hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001) to recall how.',
          misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery →.',
          parts: [
                { id: 'a', prompt: 'State the three categories of cash flow activities as per AS-3 and give one typical cash inflow example for each.', answer: 'The three categories are: (1) Operating activities',
                  options: ['The three categories are: (1) Operating activities', 'purchase of raw material', 'machinery → investing', 'loan → financing'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001) to recall how Profit & Loss.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' },
                { id: 'b', prompt: 'Classify the following into operating, investing, or financing activities with justification: (a) Cash paid for income tax on operating profit; (b) Cash paid.', answer: 'Cash paid for income tax on operating profit',
                  options: ['Cash paid for income tax on operating profit', 'machinery → investing', 'loan → financing', 'classification is based solely on the *asset/liability account* involved (e'],
                  hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001) to recall how Profit & Loss.',
                  misconception: 'Students often think classification is based solely on the *asset/liability account* involved (e.g., "machinery → investing", "loan →.' }
          ],
            remediations: { 'classification-is-based-solely-on': { steps: ['Re-read AS-3 paragraphs 6.5.1–6.5.3 in NCERT (pages 244–246) focusing on the phrases "principal revenue-generating.', 'Make a 3-column table labeled Operating/Investing/Financing. Write the **definition** of each in your own words (not.', 'Take the 33 items from "Test Your Understanding-I" (NCERT p.247) and classify each while saying aloud: "Is this the.', 'Re-attempt Diagnostic Questions 2, 3, 5. If any error persists, revisit the specific AS-3 paragraph for that item.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_004', difficulty: 'standard',
          question: 'The Direct Method of presenting cash flows from operating activities reports.',
          hint: 'If stuck, revisit Class 11 nodes on Adjustments in Final Accounts (c11_acc_cbse_09_001.',
          misconception: 'Students often treat the Direct Method as just "rearranging the indirect method" and try to start with Net Profit.',
          parts: [
                { id: 'a', prompt: 'In the Direct Method, why is Depreciation NOT shown as a cash outflow, whereas in the Indirect Method it is added back to net profit?', answer: 'Depreciation is a non-cash expense',
                  options: ['Depreciation is a non-cash expense', 'depreciation is added back in both methods', 'more receivables means more sales'],
                  hint: 'If stuck, revisit Class 11 nodes on Adjustments in Final Accounts (c11_acc_cbse_09_001.',
                  misconception: 'Students often treat the Direct Method as just "rearranging the indirect method" and try to start with Net Profit.' }
          ],
            remediations: { 'students-often-treat-the-direct': { steps: ['If the student struggles with sign conventions, have them draw T-accounts for each working capital item (Trade.', 'For Receivables: Debit side = Opening Balance + Credit Sales; Credit side = Cash Received + Closing Balance.', 'Rearrange: Cash Received = Opening + Credit Sales - Closing.', 'Do this for 3-4 items until the pattern "increase in asset → subtract; increase in liability → add" becomes intuitive.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_005', difficulty: 'standard',
          question: 'The indirect method of ascertaining cash flows from operating activities starts.',
          hint: 'If stuck on working capital sign logic, revisit **c11_acc_cbse_08_010**.',
          misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The indirect method of ascertaining cash flows from operating activities starts with net',
                  options: ['The indirect method of ascertaining cash flows from operating activities starts with net', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'Classification of cash flows is the process of categorizing all cash inflows and outflows'],
                  hint: 'If stuck on working capital sign logic, revisit **c11_acc_cbse_08_010** (Outstanding/Prepaid.',
                  misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"** by rote, without.' }
          ],
            remediations: { 'students-treat-every-increase-in': { steps: ['Go back to **c12_acc_cbse_09_003** (Classification of Cash Flows) and re-learn the operating/investing/financing.', 'Revisit **c11_acc_cbse_08_010** (Adjustments: Outstanding/Prepaid Expenses) to master how accruals affect profit.', 'Practice the "Cash T-account" technique: for each working capital item, draw a T-account, post the opening/closing.', 'Re-attempt Diagnostic Question 3 with the T-account method for each working capital item.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_006', difficulty: 'standard',
          question: 'Cash flows from investing activities represent the cash inflows and outflows.',
          hint: 'If stuck on ledger account reconstruction, revisit **c11_acc_cbse_03_010** (Posting from.',
          misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term.',
          parts: [
                { id: 'a', prompt: 'According to AS-3, which of the following is classified as a cash outflow from investing activities for a non-financial enterprise?', answer: 'Correct answer: B) Purchase of machinery for production',
                  options: ['Correct answer: B) Purchase of machinery for production', 'investing activities', 'asset purchase', 'long-term asset/investment purchase'],
                  hint: 'If stuck on ledger account reconstruction, revisit **c11_acc_cbse_03_010** (Posting from Journal.',
                  misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term investments.' },
                { id: 'b', prompt: 'From the following data, calculate the cash paid for purchase of machinery during the year: - Machinery (at cost) on 1.4.2022: ₹10,00,000 - Machinery (at cost).', answer: 'Correct answer: ₹6,00,000',
                  options: ['Correct answer: ₹6,00,000', 'investing activities', 'asset purchase', 'long-term asset/investment purchase'],
                  hint: 'If stuck on ledger account reconstruction, revisit **c11_acc_cbse_03_010** (Posting from Journal.',
                  misconception: 'Students often believe that "investing activities" include *any* purchase of assets, including inventory or short-term investments.' }
          ],
            remediations: { 'investing-activities-include-any-purchase': { steps: ['If a student misclassifies trading securities or cash equivalents as investing: 1.', 'Revisit node **c12_acc_cbse_09_002** (Cash and Cash Equivalents) — list the 3-month maturity and insignificant risk.', 'Revisit node **c12_acc_cbse_09_003** (Classification of Cash Flows) — study the "purpose test": Is it for trading.', 'Do a re-diagnostic: Give 5 transactions (e.g., buy 3-month T-bill, buy shares for long-term, buy raw material, buy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
