import type { SimDef } from '../../engine/types';
import C12_AccountancyWorkingCapitalTurnoverSim from '../../../simulations/c6_12/C12_AccountancyWorkingCapitalTurnoverSim';

/** v3 wrapped master — C12_AccountancyWorkingCapitalTurnoverSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancyworkingcapitalturnoversim: SimDef = {
    id: 'v3w_c12_accountancyworkingcapitalturnoversim',
    title: 'Working Capital Turnover',
    subtitle: 'This node covers only Partner\'s Salary, Commission, and Interest on Partner\'s Loan.',
    classLevel: 12, subject: 'accountancy', topic: 'Partner\'s Salary, Commission and Interest on Partner\'s Loan',
    chapters: [],
    nodeIds: ['c12_acc_cbse_01_008', 'c12_acc_cbse_09_001', 'c12_acc_cbse_09_005', 'c12_acc_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a partnership firm where two partners, A and B, run a retail business.', goal: 'Master Working Capital Turnover.' },
    discovery: {
        question: 'A company purchases machinery worth ₹10,00,000 by issuing equity shares of the same value. How is this transaction treated in the Cash Flow Statement?',
        options: ['This transaction is NOT shown in the Cash Flow Statement', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
        answer: 'This transaction is NOT shown in the Cash Flow Statement',
        hook: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
    },
    teaching: [
        { title: 'Partner\'s Salary is a fixed periodic payment.', text: 'Partner\'s Salary is a fixed periodic payment to a working partner for active participation in the firm\'s management, treated as an **appropriation of profit** (debited to Profit and Loss.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_008', title: 'Partner\'s Salary is a fixed periodic.',
          scaffold: { problem: 'Partners X and Y share profits 3:2. X gets a monthly salary of ₹15,000.',
            steps: [
            { text: 'Identify charges vs appropriations. Interest on Y\'s loan is a charge (deed silent → 6% p.a.).' },
            { text: 'Calculate Interest on Loan = ₹4,00,000 × 6% × 9/12 = ₹18,000. Debit to P&L Account.' },
            { text: 'Calculate X\'s Salary = ₹15,000 × 12 = ₹1,80,000. Debit to P&L Appropriation.' },
            { text: 'Profit before Y\'s commission = ₹5,82,000 – ₹1,80,000 = ₹4,02,000. Commission = ₹4,02,000 × 10/110 = ₹36,545 (rounded).' },
            { text: 'Divisible Profit = ₹4,02,000 – ₹36,545 = ₹3,65,455. Share: X = ₹3,65,455 × 3/5 = ₹2,19,273; Y = ₹1,46,182.' },
            { text: 'Prepare P&L Appropriation Account: Dr. side — Salary ₹1,80,000, Commission ₹36,545, Profit transferred to Capital: X.', faded: true, blankAnswer: 'Interest on Loan ₹18,000 (charge); X\'s Salary ₹1,80,000;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_001', title: 'A Cash Flow Statement is a financial.',
          scaffold: { problem: 'Classify the following transactions for a TEXTILE MANUFACTURING COMPANY (non-financial enterprise) as per AS-3: (1) Cash sales of fabric.',
            steps: [
            { text: 'Identify the enterprise type — textile manufacturing = non-financial enterprise.' },
            { text: 'Recall AS-3 classification rules for non-financial enterprises: Operating = core business; Investing = long-term.' },
            { text: 'Classify each: (1) Operating inflow (core revenue), (2) Investing outflow (fixed asset), (3) Financing inflow.' },
            { text: 'Verify no transaction is missed and classification matches AS-3 rules.' },
            { text: 'Present in a table for clarity.', faded: true, blankAnswer: '(1) Operating Inflow, (2) Investing Outflow, (3) Financing.' }
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
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_010', title: 'A Cash Flow Statement prepared under.',
          scaffold: { problem: 'From the following information of **Aarav Ltd.**, prepare a Cash Flow Statement for the year ended 31st March 2024 using the Indirect.',
            steps: [
            { text: 'Calculate Net Profit before Tax and Extraordinary Items from the change in Surplus.' },
            { text: 'Adjust for non-cash and non-operating items. Add: Depreciation ₹1,50,000.' },
            { text: 'Adjust for Working Capital changes. Increase in Trade Receivables (₹2,00,000 - ₹1,50,000) = ₹50,000 → Deduct.' },
            { text: 'Deduct Income Tax Paid ₹80,000. Net Cash from Operating Activities = ₹3,00,000.' },
            { text: 'Investing Activities. Sale of Machinery ₹25,000 (inflow). Purchase of Machinery: Use Machinery Account.' },
            { text: 'Financing Activities. Issue of Equity Shares: 20,000 × ₹10 = ₹2,00,000 (inflow).' },
            { text: 'Net Increase in Cash = Operating ₹3,00,000 + Investing (₹4,45,000) + Financing (₹1,95,000) = (₹3,40,000).', faded: true, blankAnswer: 'Net Cash from Operating Activities: ₹3,00,000; Net Cash.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_acc_cbse_09_001', title: 'Identify each idea',
          dissect: { specimen: 'Working Capital Turnover', spots: [
            { id: 's1', label: 'Partners Salary is a fixed', prompt: 'Which idea is this? — Partner\'s Salary is a fixed periodic payment to a working partner for active.', answer: 'Partners Salary is a fixed', options: ['Partners Salary is a fixed', 'A Cash Flow Statement is', 'The indirect method of ascertaining', 'A Cash Flow Statement prepared'] },
            { id: 's2', label: 'A Cash Flow Statement is', prompt: 'Which idea is this? — A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3.', answer: 'A Cash Flow Statement is', options: ['A Cash Flow Statement is', 'Partners Salary is a fixed', 'The indirect method of ascertaining', 'A Cash Flow Statement prepared'] },
            { id: 's3', label: 'The indirect method of ascertaining', prompt: 'Which idea is this? — The indirect method of ascertaining cash flows from operating activities starts with net.', answer: 'The indirect method of ascertaining', options: ['The indirect method of ascertaining', 'Partners Salary is a fixed', 'A Cash Flow Statement is', 'A Cash Flow Statement prepared'] },
            { id: 's4', label: 'A Cash Flow Statement prepared', prompt: 'Which idea is this? — A Cash Flow Statement prepared under the indirect method (as per AS-3) reconciles net.', answer: 'A Cash Flow Statement prepared', options: ['A Cash Flow Statement prepared', 'Partners Salary is a fixed', 'A Cash Flow Statement is', 'The indirect method of ascertaining'] }
          ] } }
    ],
    explore: { component: C12_AccountancyWorkingCapitalTurnoverSim, prompt: 'Explore the interactive — Working Capital Turnover' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'standard',
          question: 'Partner\'s Salary is a fixed periodic payment to a working partner for active.',
          hint: 'If stuck, review the format of Profit and Loss Appropriation Account.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Partner\'s Salary is a fixed periodic payment to a working partner for active',
                  options: ['Partner\'s Salary is a fixed periodic payment to a working partner for active', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'The indirect method of ascertaining cash flows from operating activities starts with net', 'A Cash Flow Statement prepared under the indirect method (as per AS-3) reconciles net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate it.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'The partnership deed provides for a partner\'s commission of 12% on net profit **before** charging commission.', answer: 'Correct commission (before) = ₹5,00,000 × 12% = ₹60,000',
                  options: ['Correct commission (before) = ₹5,00,000 × 12% = ₹60,000', 'commission is a charge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate it.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'] } } },
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
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_005', difficulty: 'standard',
          question: 'The indirect method of ascertaining cash flows from operating activities starts.',
          hint: 'If stuck on working capital sign logic, revisit **c11_acc_cbse_08_010**.',
          misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"** by.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The indirect method of ascertaining cash flows from operating activities starts with net',
                  options: ['The indirect method of ascertaining cash flows from operating activities starts with net', 'Partner\'s Salary is a fixed periodic payment to a working partner for active', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'A Cash Flow Statement prepared under the indirect method (as per AS-3) reconciles net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **every increase in current assets as "add" and every increase in current liabilities as "deduct"** by rote, without.' }
          ],
            remediations: { 'students-treat-every-increase-in': { steps: ['Go back to **c12_acc_cbse_09_003** (Classification of Cash Flows) and re-learn the operating/investing/financing.', 'Revisit **c11_acc_cbse_08_010** (Adjustments: Outstanding/Prepaid Expenses) to master how accruals affect profit vs.', 'Practice the "Cash T-account" technique: for each working capital item, draw a T-account, post the opening/closing.', 'Re-attempt Diagnostic Question 3 with the T-account method for each working capital item.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_010', difficulty: 'standard',
          question: 'A Cash Flow Statement prepared under the indirect method (as per AS-3).',
          hint: 'If stuck, revisit **c11_acc_cbse_09_011** (Preparation of Adjusted Financial Statements.',
          misconception: '**Misconception**: "An increase in current liability always means cash inflow, so we add it; a decrease always means.',
          parts: [
                { id: 'a', prompt: 'In the indirect method, depreciation of ₹2,00,000 is added back to net profit before tax.', answer: 'The student\'s reasoning is flawed',
                  options: ['The student\'s reasoning is flawed', 'adding back', 'treating as income'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "An increase in current liability always means cash inflow, so we add it; a decrease always means cash outflow, so we.' }
          ],
            remediations: { 'misconception-an-increase-in-current': { steps: ['**Revisit classification fundamentals**: Go back to node **c12_acc_cbse_09_003** (Classification of Cash Flows) and.', 'Make a three-column table: Operating / Investing / Financing.', 'List every current asset and current liability from a sample Balance Sheet and decide its activity category.', '**Practice the "Why" for each adjustment**: For each line in the indirect method proforma (Exhibit 6.4), write a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
