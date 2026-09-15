import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch09_p2: SimDef = {
    id: 'v3_c12_acc_ch09_p2',
    title: 'Cash Flow Statement · Part 2/2',
    subtitle: '₹50,000 profit, shrinking bank balance — solve the mystery of the missing cash.',
    classLevel: 12, subject: 'accountancy', topic: 'Cash Flow Statement · Part 2/2',
    chapters: ['c12_acc_ch09'],
    nodeIds: ['c12_acc_cbse_09_007', 'c12_acc_cbse_09_008', 'c12_acc_cbse_09_009', 'c12_acc_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'CFO explaining liquidity to investors', intro: 'Companies don\'t die of losses — they die of empty bank accounts. This statement is the early-warning system.', goal: 'Define cash and cash equivalents per AS-3 and classify flows into operating, investing and financing.' },
    discovery: {
        question: 'Your bakery\'s P&L shows ₹50,000 profit — yet your bank balance fell. Which statement explains the disappearance?',
        options: ['The Cash Flow Statement — it tracks actual cash, stripping out credit sales and non-cash items like depreciation', 'The Balance Sheet — it lists where every rupee went during the year', 'The P&L again — profit and cash are the same number if calculated correctly', 'The auditor\'s report — it reconciles profit to bank balance'],
        answer: 'The Cash Flow Statement — it tracks actual cash, stripping out credit sales and non-cash items like depreciation',
        hook: 'Profit is an opinion; cash is a fact. Credit sales inflate profit without moving a rupee, and depreciation cuts profit without spending one — AS-3 exists to expose that gap.',
    },
    teaching: [
        { title: 'Cash Flows from Financing Activities: Identification and Treatment', text: 'Cash flows from financing activities are the cash inflows and outflows that result in changes to the size and composition of an enterprise\'s owners\' capital (including preference share capital) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconcile profit to bank balance: classify movements into operating, investing and financing, then decide which near-cash items — 6-month FD, 45-day T-bills, blue-chip shares — qualify as cash equivalents.',
        labels: ['Cash Flows from Financing', 'Treatment of Specific Items', 'Preparation of Cash Flow'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_007', title: 'Cash Flows from Financing Activities: Identification and Treatment',
          scaffold: { problem: 'Greenfield Ltd. (a non-financial enterprise) provides the following information for the year ended 31st March 2024:',
            steps: [
            { text: 'Identify cash inflows from financing: Proceeds from issue of equity shares = Increase in equity capital = ₹25,00,000.' },
            { text: 'Identify cash outflows from financing: Redemption of preference shares = ₹2,00,000 + 10% premium = ₹2,20,000.' },
            { text: 'Calculate net cash flow from financing activities = Inflows - Outflows = ₹8,00,000 - ₹9,60,000 = -₹1,60,000 (net cash.' },
            { text: 'Present in the prescribed format with clear line items.' },
            { text: 'Verify that the change in each liability/capital account matches the cash flows and non-cash adjustments (e.g.', faded: true, blankAnswer: 'Cash Flows from Financing Activities' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_008', title: 'Treatment of Specific Items: Taxes on Profit and Extraordinary Items',
          caseStudy: { intro: 'Imagine you are analysing the cash flow statement of a company that suffered a massive flood loss and paid three types of taxes last year: regular income tax.',
            decisions: [{ prompt: 'According to AS-3, how should cash flows arising from taxes on income be classified if they cannot be specifically identified with.', options: [
                { text: 'They must be classified as cash flows from operating activities', outcome: 'They must be classified as cash flows from operating activities.' },
                { text: 'financing', outcome: 'Not quite — Students often treat "Income Tax Paid" as a single operating cash outflow without separating.', reveals: 'students-often-treat-income-tax' },
                { text: 'investing', outcome: 'Not quite — Students often treat "Income Tax Paid" as a single operating cash outflow without separating.', reveals: 'students-often-treat-income-tax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_009', title: 'Treatment of Specific Items: Interest, Dividend and Non-cash Transactions',
          caseStudy: { intro: 'Imagine you are analysing the cash flow statement of **Bajaj Finance Ltd.** (an NBFC — a financial enterprise) and **Tata Motors Ltd.** (a manufacturing.',
            decisions: [{ prompt: 'A non-financial enterprise receives ₹10 lakh as dividend on shares held as investment.', options: [
                { text: '**Correct answer:** Investing activity (cash inflow)', outcome: '**Correct answer:** Investing activity (cash inflow). **Why wrong answers reveal.' },
                { text: 'Operating activity', outcome: 'Not quite — **Misconception:** "Interest received is always operating activity because it\'s income." **Why.', reveals: 'misconception-interest-received-is-always' },
                { text: 'Interest received is always operating activity', outcome: 'Not quite — **Misconception:** "Interest received is always operating activity because it\'s income." **Why.', reveals: 'misconception-interest-received-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping in his uncle\'s bakery over the break, a student sees the P&L show ₹50,000 profit — but the bank balance has fallen. The uncle suspects the accountant fudged the books.',
            decisions: [{ prompt: 'What actually explains the gap?', options: [
                { text: 'Profit is accrual-based, cash is not: credit sales, a cash purchase of a new oven (investing outflow) and a loan repayment (financing outflow) can shrink cash while profit stays positive — a cash flow statement would show it.', outcome: 'AS-3 splits flows into operating, investing and financing so exactly this mystery — profit up, cash down — gets explained.' },
                { text: 'The accountant must be wrong — profit and bank balance are the same thing measured two ways.', outcome: 'Profit counts revenue when earned, not when cash arrives; non-cash charges like depreciation and credit sales decouple the two legitimately.', reveals: 'profit-equals-cash' },
                { text: 'The oven bought by issuing shares to the supplier should appear as an investing outflow in the cash flow statement.', outcome: 'No cash moved — AS-3 excludes non-cash investing/financing transactions from the statement (they\'re disclosed elsewhere), so it can\'t explain the cash drop.', reveals: 'non-cash-in-cashflow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You can now answer the question that bankrupts profitable companies: where did the cash go? AS-3 classification is a guaranteed board question — and the core skill of every CFO.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_007', difficulty: 'standard',
          question: 'Cash flows from financing activities are the cash inflows and outflows that.',
          hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_011 (Accounting Equation) and.',
          misconception: 'Students often treat "proposed dividend" as a cash outflow in the year it is proposed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cash flows from financing activities are the cash inflows and outflows that result in',
                  options: ['Cash flows from financing activities are the cash inflows and outflows that result in', 'A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3', 'As per Accounting Standard-3 (AS-3), **Cash** comprises cash in hand and demand deposits', 'Classification of cash flows is the process of categorizing all cash inflows and outflows'],
                  hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_011 (Accounting Equation) and c11_acc_cbse_08_008.',
                  misconception: 'Students often treat "proposed dividend" as a cash outflow in the year it is proposed.' }
          ],
            remediations: { 'students-often-treat-proposed-dividend': { steps: ['If the student makes this error, first clarify the timeline: "Proposed dividend → AGM approval → Dividend payable →.', 'Show that cash outflow occurs only in Year 2.', 'Next, give a mini-case: "Balance sheet shows proposed dividend ₹50,000 on 31/3/2023 and ₹60,000 on 31/3/2024.', 'Dividend paid during 2023-24 was ₹50,000." Ask them to identify the cash outflow for financing activities (₹50,000).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_008', difficulty: 'standard',
          question: 'Treatment of specific items in a Cash Flow Statement refers to the.',
          hint: 'Revisit c12_acc_cbse_09_003 (Classification) and c12_acc_cbse_09_005 (Indirect Method.',
          misconception: 'Students often treat "Income Tax Paid" as a single operating cash outflow without separating Dividend Distribution Tax.',
          parts: [
                { id: 'a', prompt: 'According to AS-3, how should cash flows arising from taxes on income be classified if they cannot be specifically identified with financing or investing.', answer: 'They must be classified as cash flows from operating activities',
                  options: ['They must be classified as cash flows from operating activities', 'financing', 'investing'],
                  hint: 'Revisit c12_acc_cbse_09_003 (Classification) and c12_acc_cbse_09_005 (Indirect Method proforma) and.',
                  misconception: 'Students often treat "Income Tax Paid" as a single operating cash outflow without separating Dividend Distribution Tax (financing) and.' },
                { id: 'b', prompt: 'A company pays ₹50 lakh as dividend distribution tax (DDT) on dividends declared.', answer: 'DDT is a financing cash outflow',
                  options: ['DDT is a financing cash outflow', 'operating'],
                  hint: 'Revisit c12_acc_cbse_09_003 (Classification) and c12_acc_cbse_09_005 (Indirect Method proforma) and.',
                  misconception: 'Students often treat "Income Tax Paid" as a single operating cash outflow without separating Dividend Distribution Tax (financing) and.' }
          ],
            remediations: { 'students-often-treat-income-tax': { steps: ['If a student misclassifies tax payments, take them back to the AS-3 rule: "Cash flows arising from taxes on income.', 'Have them re-do the Provision for Taxation account splitting the Bank payment into two lines: "Income Tax Paid" and.', 'Repeat with 3-4 variations until they can articulate the source-transaction link without prompting.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_009', difficulty: 'standard',
          question: 'As per AS-3, for a **non-financial enterprise**, interest paid and dividends.',
          hint: 'If stuck, re-read AS-3 paragraphs 31-33 in the NCERT text (pages 247-248) and redo the.',
          misconception: '**Misconception:** "Interest received is always operating activity because it\'s income." **Why students make this.',
          parts: [
                { id: 'a', prompt: 'A non-financial enterprise receives ₹10 lakh as dividend on shares held as investment.', answer: '**Correct answer:** Investing activity (cash inflow)',
                  options: ['**Correct answer:** Investing activity (cash inflow)', 'Operating activity', 'Interest received is always operating activity', 'Other Income'],
                  hint: 'If stuck, re-read AS-3 paragraphs 31-33 in the NCERT text (pages 247-248) and redo the "Test your.',
                  misconception: '**Misconception:** "Interest received is always operating activity because it\'s income." **Why students make this error:** They confuse.' },
                { id: 'b', prompt: 'Explain why interest paid by a bank (financial enterprise) is classified as an operating activity, whereas interest paid by a manufacturing company is.', answer: '**Correct answer:** For a financial enterprise, lending/borrowing is the **main',
                  options: ['**Correct answer:** For a financial enterprise, lending/borrowing is the **main', 'both are financing', 'both are operating', 'Interest received is always operating activity'],
                  hint: 'If stuck, re-read AS-3 paragraphs 31-33 in the NCERT text (pages 247-248) and redo the "Test your.',
                  misconception: '**Misconception:** "Interest received is always operating activity because it\'s income." **Why students make this error:** They confuse.' }
          ],
            remediations: { 'misconception-interest-received-is-always': { steps: ['**Revisit node c12_acc_cbse_09_003** (Classification of Activities) — re-read AS-3 paras 31-33 on interest/dividend.', '**Revisit node c12_acc_cbse_09_005** (Indirect Method) — practice the adjustment: "Interest received ₹X" → **deduct**.', 'Do 3 problems where you start from net profit and adjust for interest/dividend received/paid.', '**Re-diagnostic:** Take a trial balance with "Interest on Debentures Received ₹2 lakh" and "Interest on Loan Paid ₹3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Interest received is always operating activity because it\'s income." **Why students make this.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since dividend paid is a financing outflow, dividend received should also be a financing inflow for consistency." Evaluate this argument.', answer: '**Correct evaluation:** The argument is **incorrect**',
                  options: ['**Correct evaluation:** The argument is **incorrect**', 'Interest received is always operating activity', 'Other Income'],
                  hint: 'If stuck, re-read AS-3 paragraphs 31-33 in the NCERT text (pages 247-248) and redo the "Test your.',
                  misconception: '**Misconception:** "Interest received is always operating activity because it\'s income." **Why students make this error:** They confuse.' }
          ],
            remediations: { 'misconception-interest-received-is-always': { steps: ['**Revisit node c12_acc_cbse_09_003** (Classification of Activities) — re-read AS-3 paras 31-33 on interest/dividend.', '**Revisit node c12_acc_cbse_09_005** (Indirect Method) — practice the adjustment: "Interest received ₹X" → **deduct**.', 'Do 3 problems where you start from net profit and adjust for interest/dividend received/paid.', '**Re-diagnostic:** Take a trial balance with "Interest on Debentures Received ₹2 lakh" and "Interest on Loan Paid ₹3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_010', difficulty: 'standard',
          question: 'A Cash Flow Statement prepared under the indirect method (as per AS-3).',
          hint: 'If stuck, revisit **c11_acc_cbse_09_011** (Preparation of Adjusted Financial Statements.',
          misconception: '**Misconception**: "An increase in current liability always means cash inflow, so we add it; a decrease always means.',
          parts: [
                { id: 'a', prompt: 'In the indirect method, depreciation of ₹2,00,000 is added back to net profit before tax.', answer: 'The student\'s reasoning is flawed',
                  options: ['The student\'s reasoning is flawed', 'adding back', 'treating as income', 'add depreciation'],
                  hint: 'If stuck, revisit **c11_acc_cbse_09_011** (Preparation of Adjusted Financial Statements with.',
                  misconception: '**Misconception**: "An increase in current liability always means cash inflow, so we add it; a decrease always means cash outflow, so.' }
          ],
            remediations: { 'misconception-an-increase-in-current': { steps: ['**Revisit classification fundamentals**: Go back to node **c12_acc_cbse_09_003** (Classification of Cash Flows) and.', 'Make a three-column table: Operating / Investing / Financing.', 'List every current asset and current liability from a sample Balance Sheet and decide its activity category.', '**Practice the "Why" for each adjustment**: For each line in the indirect method proforma (Exhibit 6.4), write.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
