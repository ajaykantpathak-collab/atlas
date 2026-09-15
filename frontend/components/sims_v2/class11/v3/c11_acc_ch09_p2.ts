import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch09_p2: SimDef = {
    id: 'v3_c11_acc_ch09_p2',
    title: 'Financial Statements - II · Part 2/2',
    subtitle: 'Apply year-end adjustments and assemble the complete balance sheet.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements - II · Part 2/2',
    chapters: ['c11_acc_ch09'],
    nodeIds: ['c11_acc_cbse_09_007', 'c11_acc_cbse_09_008', 'c11_acc_cbse_09_009', 'c11_acc_cbse_09_010', 'c11_acc_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an accountant closing a firm\'s books on 31 March', intro: 'The trial balance is nearly honest. Your adjustments are the last mile between records and reality.', goal: 'Pass adjustment entries and prepare a balance sheet showing true financial position.' },
    discovery: {
        question: 'A firm counts closing stock twice — once in the trading account, once among balance-sheet assets. A student calls it double counting. Why is it actually correct?',
        options: ['The same stock is unexpired cost this year in trading and a resource owned at year-end in the balance sheet', 'It is double counting and should be struck from the balance sheet', 'Stock only belongs in the balance sheet, never in trading', 'Because stock is both income and expense simultaneously'],
        answer: 'The same stock is unexpired cost this year in trading and a resource owned at year-end in the balance sheet',
        hook: 'One figure, two lenses — closing stock adjusts the cost of what you sold and reports what you still hold.',
    },
    teaching: [
        { title: 'Adjustment: Provision for Discount on Debtors', text: 'Provision for Discount on Debtors is an estimated liability created against the expected cash discount that a business anticipates allowing to its debtors for prompt payment during the next.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take a trial balance with adjustments — outstanding expenses, prepaid, depreciation, closing stock — and produce a full balance sheet.',
        labels: ['Adjustment: Provision for Discount', 'Adjustment: Interest on Capital', 'Adjustment: Goods Sent', 'Adjustment: Unrecorded Transactions', 'Preparation of Adjusted Financial'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_007', title: 'Adjustment: Provision for Discount on Debtors',
          scaffold: { problem: 'M/s Sharma Traders has the following balances on 31 March 2024:',
            steps: [
            { text: 'Identify the given data — Sundry Debtors ₹4,00,000, Further Bad Debts ₹5,000, existing Provision for Doubtful Debts.' },
            { text: 'Calculate Debtors after Further Bad Debts = ₹4,00,000 - ₹5,000 = ₹3,95,000.' },
            { text: 'Calculate New Provision for Doubtful Debts = 5% × ₹3,95,000 = ₹19,750.' },
            { text: 'Calculate Good Debtors = Debtors after Further Bad Debts - New Provision for Doubtful Debts = ₹3,95,000 - ₹19,750.' },
            { text: 'Calculate Provision for Discount on Debtors = 2% × ₹3,75,250 = ₹7,505.' },
            { text: 'Pass journal entry: Profit and Loss A/c Dr. ₹7,505 To Provision for Discount on Debtors A/c ₹7,505.', faded: true, blankAnswer: 'Provision for Discount on Debtors = ₹7,505. Journal Entry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_008', title: 'Adjustment: Interest on Capital and Drawings',
          scaffold: { problem: 'Rohan started business on 1st April 2023 with capital ₹4,00,000. He introduced additional capital ₹1,00,000 on 1st October 2023.',
            steps: [
            { text: 'Identify opening capital (₹4,00,000) and additional capital (₹1,00,000 on 1st Oct).' },
            { text: 'Apply formula: Interest on Opening Capital = ₹4,00,000 × 12% × 12/12 = ₹48,000.' },
            { text: 'Total Interest on Capital = ₹48,000 + ₹6,000 = ₹54,000.' },
            { text: 'Journal Entry: Interest on Capital A/c Dr. ₹54,000 To Capital A/c ₹54,000 (Being interest on capital provided @12%.' },
            { text: 'Verify treatment: ₹54,000 debited to P&L Account (reduces net profit); ₹54,000 added to Capital in Balance Sheet.', faded: true, blankAnswer: 'Interest on Capital = ₹54,000; Journal Entry: Interest.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_009', title: 'Adjustment: Goods Sent on Approval Basis',
          scaffold: { problem: 'On March 20, 2024, M/s Sharma Traders sent goods costing ₹40,000 to a customer on approval basis at a sale price of ₹50,000 (profit 25%.',
            steps: [
            { text: 'Identify the original wrong entry: Debtors A/c Dr. ₹50,000 To Sales A/c ₹50,000 (recorded at invoice price).' },
            { text: 'Since approval not received by year-end, reverse the sale at the same invoice price: Sales A/c Dr.' },
            { text: 'The goods are still the property of Sharma Traders and must be included in closing stock at cost price: Stock.' },
            { text: 'In Trading Account, show Sales reduced by ₹50,000 (on credit side) and Closing Stock increased by ₹40,000 (on credit.' },
            { text: 'In Balance Sheet, show Debtors reduced by ₹50,000 (Current Assets) and add "Stock with Customers on Approval" ₹40,000.', faded: true, blankAnswer: 'Journal Entries:' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_010', title: 'Adjustment: Unrecorded Transactions and Manager\'s Commission',
          scaffold: { problem: 'M/s Gupta Traders\' trial balance shows Purchases ₹4,00,000, Wages ₹50,000, Sales ₹6,00,000.',
            steps: [
            { text: 'Identify the three unrecorded transactions: (a) Goods withdrawn by proprietor - should reduce purchases and increase.' },
            { text: 'Pass journal entry for goods withdrawn: Drawings A/c Dr. ₹15,000 To Purchases A/c ₹15,000.' },
            { text: 'Pass journal entry for wages capitalisation: Godown A/c Dr. ₹10,000 To Wages A/c ₹10,000.' },
            { text: 'Calculate Profit before commission: Gross Profit ₹1,80,000 - Other Expenses ₹60,000 = ₹1,20,000.' },
            { text: 'Apply formula for commission on profit AFTER commission: Commission = ₹1,20,000 × 10/(100+10) = ₹1,20,000 × 10/110.' },
            { text: 'Pass journal entry for commission: Profit and Loss A/c Dr. ₹10,909 To Manager\'s Commission A/c ₹10,909.' },
            { text: 'Verify: Profit after commission = ₹1,20,000 - ₹10,909 = ₹1,09,091. 10% of ₹1,09,091 = ₹10,909. ✓', faded: true, blankAnswer: 'Manager\'s Commission = ₹10,909. Journal Entries: (1).' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s tuition centre closes its books on 31 March. In July they paid ₹24,000 for a 12-month insurance policy; in March a corporate client signed up for a 10-month course paying ₹50,000 in advance, only one month of which falls in this year. Your friend says: \'Just put insurance and commission fully in this year\'s P&L — the cash moved this year, and adjustments are only for fixing mistakes anyway.\'',
            decisions: [{ prompt: 'How much of each belongs in this year\'s profit?', options: [
                { text: 'Insurance: 9 of 12 months = ₹18,000 to P&L, ₹6,000 prepaid to the balance sheet. Advance fee: 1 of 10 months = ₹5,000 to P&L, ₹45,000 unearned income as a liability. Adjustments aren\'t error-fixes — they apply accrual: recognise income when earned, expenses when incurred.', outcome: 'Every adjustment asks \'what belongs to this period?\' — the rest goes to the balance sheet as an asset or liability.' },
                { text: 'Both fully in this year\'s P&L — cash moved this year, so the expense and income are this year\'s.', outcome: 'That\'s the cash basis; accrual matching sends the future-period share to the balance sheet, otherwise profit is distorted in both years.', reveals: 'cash-paid-means-this-year' },
                { text: 'Adjust the insurance (expenses need adjusting) but take the full ₹50,000 as income — income doesn\'t need adjustments.', outcome: 'The same accrual logic runs both ways: income received in advance is a liability until earned, exactly like prepaid expense is an asset until used.', reveals: 'only-expenses-get-adjusted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'Adjustments are where accounting grows up: the books finally match economic reality, not just cash movements.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_007', difficulty: 'standard',
          question: 'Provision for Discount on Debtors is an estimated liability created against the.',
          hint: 'Revisit "Provision for Doubtful Debts" (c11_acc_cbse_09_006) — focus on the calculation.',
          misconception: '**The Sequential Base Error:** Students calculate Provision for Discount on Debtors on the **wrong base**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Provision for Discount on Debtors is an estimated liability created against the expected',
                  options: ['Provision for Discount on Debtors is an estimated liability created against the expected', 'Adjustments in financial statements are necessary accounting entries made at the end of', 'Closing Stock represents the cost of unsold goods remaining in the business at the end of', 'Outstanding expenses are expenses that have been incurred during the current accounting'],
                  hint: 'Revisit "Provision for Doubtful Debts" (c11_acc_cbse_09_006) — focus on the calculation of new.',
                  misconception: '**The Sequential Base Error:** Students calculate Provision for Discount on Debtors on the **wrong base**.' }
          ],
            remediations: { 'the-sequential-base-error-students': { steps: ['**Step-by-step remediation:** 1.', '**Visual Scaffold:** Draw a "Debtors Waterfall" on paper: ``` SUNDRY DEBTORS (Trial Balance) │ ▼ Less: FURTHER BAD.', '**Drill the Mantra:** "First bad, then doubtful, then discount — that\'s the order of the accountant." Have student say.', '**Contrast Practice:** Give two side-by-side problems identical except one has "Provision for Doubtful Debts = 0%".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The Sequential Base Error:** Students calculate Provision for Discount on Debtors on the **wrong base**.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since provision for discount on debtors reduces profit, and provision for doubtful debts also reduces profit, why not just combine them into.', answer: '**Correct Answer:** The argument is **flawed** for three reasons: 1',
                  options: ['**Correct Answer:** The argument is **flawed** for three reasons: 1', 'both reduce profit'],
                  hint: 'Revisit "Provision for Doubtful Debts" (c11_acc_cbse_09_006) — focus on the calculation of new.',
                  misconception: '**The Sequential Base Error:** Students calculate Provision for Discount on Debtors on the **wrong base**.' }
          ],
            remediations: { 'the-sequential-base-error-students': { steps: ['**Step-by-step remediation:** 1.', '**Visual Scaffold:** Draw a "Debtors Waterfall" on paper: ``` SUNDRY DEBTORS (Trial Balance) │ ▼ Less: FURTHER BAD.', '**Drill the Mantra:** "First bad, then doubtful, then discount — that\'s the order of the accountant." Have student say.', '**Contrast Practice:** Give two side-by-side problems identical except one has "Provision for Doubtful Debts = 0%".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_008', difficulty: 'standard',
          question: 'Interest on Capital is an appropriation of profit calculated at an agreed rate.',
          hint: 'Revise Class 8 Mathematics Chapter 8 "Simple Interest" (c8_math_ch8_9) — practice 10.',
          misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g.,.',
          parts: [
                { id: 'a', prompt: 'State the journal entry for providing interest on capital at 10% p.a. on opening capital of ₹2,00,000.', answer: 'Correct entry: Interest on Capital A/c Dr',
                  options: ['Correct entry: Interest on Capital A/c Dr', 'Capital A/c Dr', 'opposite entries'],
                  hint: 'Revise Class 8 Mathematics Chapter 8 "Simple Interest" (c8_math_ch8_9) — practice 10 problems.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' },
                { id: 'b', prompt: 'Capital on 1st April: ₹3,00,000. Additional capital introduced on 1st August: ₹1,00,000. Rate: 10% p.a.', answer: 'Step 1: Interest on opening capital = ₹3,00,000 × 10% × 12/12 = ₹30,000',
                  options: ['Step 1: Interest on opening capital = ₹3,00,000 × 10% × 12/12 = ₹30,000', 'opposite entries'],
                  hint: 'Revise Class 8 Mathematics Chapter 8 "Simple Interest" (c8_math_ch8_9) — practice 10 problems.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' },
                { id: 'c', prompt: 'Compare the effect on Net Profit and Capital when: (a) Interest on Capital ₹15,000 is provided, (b) Interest on Drawings ₹5,000 is charged.', answer: 'Interest on Capital ₹15,000 is provided, (',
                  options: ['Interest on Capital ₹15,000 is provided, (', 'capital increases by ₹15,000 in (a) and decreases by ₹5,000 in (b)', 'opposite entries'],
                  hint: 'Revise Class 8 Mathematics Chapter 8 "Simple Interest" (c8_math_ch8_9) — practice 10 problems.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' }
          ],
            remediations: { 'interest-on-capital-and-interest': { steps: ['Ask them to prepare P&L Account showing both items separately — "Where does Interest on Capital appear?', 'Show that netting changes Net Profit figure — "If profit before adjustments is ₹1,00,000, what is net profit after.', 'Demonstrate capital account for each partner — "Partner A gets interest on capital ₹20,000 but charged interest.', 'Emphasise the rule: "Every adjustment has two effects — one in P&L, one in Balance Sheet.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_009', difficulty: 'standard',
          question: 'Goods sent on approval basis (or sale on approval) refers to a transaction.',
          hint: 'If stuck, revisit "Need for Adjustments" (c11_acc_cbse_09_001) to recall the accrual.',
          misconception: 'Students often think that "goods sent on approval" requires creating a **provision for unrealized profit** (like.',
          parts: [
                { id: 'a', prompt: 'A trader sends goods costing ₹8,000 to a customer on approval basis at a sale price of ₹10,000 on March 25. The accountant records it as a regular sale.', answer: '**Correct Answer:** Sales A/c Dr',
                  options: ['**Correct Answer:** Sales A/c Dr', 'goods sent on approval'],
                  hint: 'If stuck, revisit "Need for Adjustments" (c11_acc_cbse_09_001) to recall the accrual concept, and.',
                  misconception: 'Students often think that "goods sent on approval" requires creating a **provision for unrealized profit** (like in consignment) instead.' },
                { id: 'b', prompt: 'In the same scenario (goods costing ₹8,000 sent at ₹10,000 on approval, recorded as sale, unapproved at year-end), a student passes only the first entry.', answer: '**Correct Answer:** Without the second entry (Stock on Approval A/c Dr',
                  options: ['**Correct Answer:** Without the second entry (Stock on Approval A/c Dr', 'goods sent on approval'],
                  hint: 'If stuck, revisit "Need for Adjustments" (c11_acc_cbse_09_001) to recall the accrual concept, and.',
                  misconception: 'Students often think that "goods sent on approval" requires creating a **provision for unrealized profit** (like in consignment) instead.' },
                { id: 'c', prompt: 'Goods costing ₹12,000 were sent on approval at ₹15,000 on March 20 and recorded as sales. On March 31, the customer approves the goods.', answer: '**Correct Answer:** True',
                  options: ['**Correct Answer:** True', 'False, we still need to adjust', 'goods sent on approval', 'goods awaiting approval at year-end'],
                  hint: 'If stuck, revisit "Need for Adjustments" (c11_acc_cbse_09_001) to recall the accrual concept, and.',
                  misconception: 'Students often think that "goods sent on approval" requires creating a **provision for unrealized profit** (like in consignment) instead.' },
                { id: 'd', prompt: 'Compare the treatment of "Goods sent on approval" with "Goods sent on consignment" at year-end when goods remain unsold/unapproved.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'stock reserve', 'goods sent on approval'],
                  hint: 'If stuck, revisit "Need for Adjustments" (c11_acc_cbse_09_001) to recall the accrual concept, and.',
                  misconception: 'Students often think that "goods sent on approval" requires creating a **provision for unrealized profit** (like in consignment) instead.' }
          ],
            remediations: { 'goods-sent-on-approval-requires': { steps: ['Sales A/c Dr. 15,000 → Debtors A/c 15,000 (sale gone, debtor gone) -', 'Stock on Approval A/c Dr. 10,000 → Trading A/c 10,000 (your stock back at cost) 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_010', difficulty: 'standard',
          question: 'Unrecorded transactions are business events that have occurred but were not.',
          hint: 'If stuck on journal entries: Revisit c11_acc_cbse_09_003 and c11_acc_cbse_09_004 for the.',
          misconception: 'Students treat "unrecorded transactions" as a separate category of adjustments like "outstanding expenses" and memorise.',
          parts: [
                { id: 'a', prompt: 'Explain why the formula for manager\'s commission on profit AFTER charging commission is: Profit before commission × Rate/(100 + Rate), and not simply Profit.', answer: 'Because commission itself reduces the profit on',
                  options: ['Because commission itself reduces the profit on', 'it\'s just a different formula'],
                  hint: 'If stuck on journal entries: Revisit c11_acc_cbse_09_003 and c11_acc_cbse_09_004 for the.',
                  misconception: 'Students treat "unrecorded transactions" as a separate category of adjustments like "outstanding expenses" and memorise journal entries for.' }
          ],
            remediations: { 'students-treat-unrecorded-transactions-as': { steps: ['If a student cannot identify unrecorded transactions: Give them a trial balance with 3-4 additional information items.', 'Ask: "For each item, what is the CURRENT wrong state in the books?', 'What SHOULD be the correct state?', 'What entry fixes it?" Do this for 5 different types (goods withdrawn, private expense in business, asset erection.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_011', difficulty: 'standard',
          question: 'Preparation of Adjusted Financial Statements with Multiple Adjustments is the.',
          hint: 'If stuck, revisit c11_acc_cbse_09_003 (outstanding/prepaid) and c11_acc_cbse_09_005.',
          misconception: 'Students often treat each adjustment in isolation and forget the "double effect" rule: they might credit closing stock.',
          parts: [
                { id: 'a', prompt: 'Explain why closing stock is credited to the Trading Account but also shown on the asset side of the Balance Sheet.', answer: 'Closing stock is credited to Trading Account',
                  options: ['Closing stock is credited to Trading Account', 'it\'s income'],
                  hint: 'If stuck, revisit c11_acc_cbse_09_003 (outstanding/prepaid) and c11_acc_cbse_09_005 (depreciation).',
                  misconception: 'Students often treat each adjustment in isolation and forget the "double effect" rule: they might credit closing stock to Trading Account.' }
          ],
            remediations: { 'students-often-treat-each-adjustment': { steps: ['If a student misses the dual effect, make them write the journal entry for each adjustment first (e.g., Depreciation.', 'Then ask: "Which account goes to P&L?', 'Which goes to Balance Sheet?" Have them tick off each adjustment on a checklist with two columns: "P&L Effect" and.', 'Practice with a 3-adjustment mini-case until they consistently show both effects.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
