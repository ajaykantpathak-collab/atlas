import type { SimDef } from '../../engine/types';
import C11_AccountancyBasicTermsDrawerSim from '../../../simulations/c6_12/C11_AccountancyBasicTermsDrawerSim';

/** v3 wrapped master — C11_AccountancyBasicTermsDrawerSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancybasictermsdrawersim: SimDef = {
    id: 'v3w_c11_accountancybasictermsdrawersim',
    title: 'Basic Terms Drawer',
    subtitle: 'This node covers the meaning, objectives, characteristics, and basic structure of a.',
    classLevel: 11, subject: 'accountancy', topic: 'Balance Sheet: Meaning and Objectives',
    chapters: [],
    nodeIds: ['c11_acc_cbse_08_006', 'c11_acc_cbse_09_008', 'c11_acc_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re the owner of a small kirana store in Delhi. It\'s March 31st, year-end.', goal: 'Master Basic Terms Drawer.' },
    discovery: {
        question: 'Two students marshall the same Balance Sheet differently. Student A uses Order of Permanence: Land → Building → Machinery → Furniture → Debtors → Cash.',
        options: ['Both orders are acceptable', 'one correct format', 'Stock ₹30,000'],
        answer: 'Both orders are acceptable',
        hook: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture.',
    },
    teaching: [
        { title: 'A Balance Sheet is a positional statement.', text: 'A Balance Sheet is a positional statement prepared at a specific date (typically the end of an accounting period) that presents the financial position of a business enterprise by summarising its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_006', title: 'A Balance Sheet is a positional.',
          scaffold: { problem: 'From the following Trial Balance of Mr. Rajesh as on March 31, 2024, prepare a Balance Sheet. Net Profit for the year is ₹45,000.',
            steps: [
            { text: 'Verify Trial Balance totals. Debit ₹3,30,000 ≠ Credit ₹3,50,000. Difference ₹20,000 on credit side.' },
            { text: 'Identify Balance Sheet items. All accounts in Trial Balance *except* revenue/expense accounts (none shown here — this.' },
            { text: 'Adjust Capital. Closing Capital = Opening Capital (₹1,20,000) + Net Profit (₹45,000) – Drawings (₹15,000) = ₹1,50,000.' },
            { text: 'Marshall in Order of Permanence (standard for proprietorship unless specified).' },
            { text: 'Prepare Balance Sheet and verify Assets = Liabilities + Capital.', faded: true, blankAnswer: '**Balance Sheet of Mr. Rajesh as on March 31, 2024 (Order.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_008', title: 'Interest on Capital is an appropriation.',
          scaffold: { problem: 'Rohan started business on 1st April 2023 with capital ₹4,00,000. He introduced additional capital ₹1,00,000 on 1st October 2023.',
            steps: [
            { text: 'Identify opening capital (₹4,00,000) and additional capital (₹1,00,000 on 1st Oct).' },
            { text: 'Apply formula: Interest on Opening Capital = ₹4,00,000 × 12% × 12/12 = ₹48,000.' },
            { text: 'Total Interest on Capital = ₹48,000 + ₹6,000 = ₹54,000.' },
            { text: 'Journal Entry: Interest on Capital A/c Dr. ₹54,000 To Capital A/c ₹54,000 (Being interest on capital provided @12%.' },
            { text: 'Verify treatment: ₹54,000 debited to P&L Account (reduces net profit); ₹54,000 added to Capital in Balance Sheet.', faded: true, blankAnswer: 'Interest on Capital = ₹54,000; Journal Entry: Interest on.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_010', title: 'Unrecorded transactions are business.',
          scaffold: { problem: 'M/s Gupta Traders\' trial balance shows Purchases ₹4,00,000, Wages ₹50,000, Sales ₹6,00,000.',
            steps: [
            { text: 'Identify the three unrecorded transactions: (a) Goods withdrawn by proprietor - should reduce purchases and increase.' },
            { text: 'Pass journal entry for goods withdrawn: Drawings A/c Dr. ₹15,000 To Purchases A/c ₹15,000.' },
            { text: 'Pass journal entry for wages capitalisation: Godown A/c Dr. ₹10,000 To Wages A/c ₹10,000.' },
            { text: 'Calculate Profit before commission: Gross Profit ₹1,80,000 - Other Expenses ₹60,000 = ₹1,20,000.' },
            { text: 'Apply formula for commission on profit AFTER commission: Commission = ₹1,20,000 × 10/(100+10) = ₹1,20,000 × 10/110 =.' },
            { text: 'Pass journal entry for commission: Profit and Loss A/c Dr. ₹10,909 To Manager\'s Commission A/c ₹10,909.' },
            { text: 'Verify: Profit after commission = ₹1,20,000 - ₹10,909 = ₹1,09,091. 10% of ₹1,09,091 = ₹10,909. ✓', faded: true, blankAnswer: 'Manager\'s Commission = ₹10,909. Journal Entries: (1).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Basic Terms Drawer', spots: [
            { id: 's1', label: 'A Balance Sheet is a', prompt: 'Which idea is this? — A Balance Sheet is a positional statement prepared at a specific date (typically the end.', answer: 'A Balance Sheet is a', options: ['A Balance Sheet is a', 'Interest on Capital is an', 'Unrecorded transactions are business events'] },
            { id: 's2', label: 'Interest on Capital is an', prompt: 'Which idea is this? — Interest on Capital is an appropriation of profit calculated at an agreed rate on the.', answer: 'Interest on Capital is an', options: ['Interest on Capital is an', 'A Balance Sheet is a', 'Unrecorded transactions are business events'] },
            { id: 's3', label: 'Unrecorded transactions are business events', prompt: 'Which idea is this? — Unrecorded transactions are business events that have occurred but were not entered in.', answer: 'Unrecorded transactions are business events', options: ['Unrecorded transactions are business events', 'A Balance Sheet is a', 'Interest on Capital is an'] }
          ] } }
    ],
    explore: { component: C11_AccountancyBasicTermsDrawerSim, prompt: 'Explore the interactive — Basic Terms Drawer' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_006', difficulty: 'standard',
          question: 'A Balance Sheet is a positional statement prepared at a specific date.',
          hint: 'Revisit the "Closing Entries" section in node c11_acc_cbse_08_004/c11_acc_cbse_08_005 —.',
          misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture.',
          parts: [
                { id: 'a', prompt: 'A student prepares a Balance Sheet and writes "Sales ₹5,00,000" on the credit side under "Revenues." Another student says Sales should not appear in the.', answer: 'The second student is correct',
                  options: ['The second student is correct', 'Stock ₹30,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' },
                { id: 'b', prompt: 'Two students marshall the same Balance Sheet differently. Student A uses Order of Permanence: Land → Building → Machinery → Furniture → Debtors → Cash.', answer: 'Both orders are acceptable',
                  options: ['Both orders are acceptable', 'one correct format', 'Stock ₹30,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' }
          ],
            remediations: { 'misconception-closing-stock-appears-in': { steps: ['** Ask the student to locate "Closing Stock" in the Trial Balance.', '** Demonstrate the adjustment entry on a blank sheet: Dr. Closing Stock A/c (new asset) / Cr.', '** Show the flow: This entry *creates* the Closing Stock account → balance carried to Balance Sheet (Asset side) →.', '** Give a 3-item practice: Opening Stock ₹10,000, Purchases ₹50,000, Closing Stock ₹8,000.', '** Ask: "If you forgot the entry, what happens to Gross Profit?" (Answer: GP overstated by ₹8,000 because COGS includes.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since the Balance Sheet always balances (Assets = Liabilities + Capital), it proves the books are free from errors." Provide two.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'balancing', 'correctness', 'Stock ₹30,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' },
                { id: 'b', prompt: 'Two students marshall the same Balance Sheet differently. Student A uses Order of Permanence: Land → Building → Machinery → Furniture → Debtors → Cash.', answer: 'Both orders are acceptable',
                  options: ['Both orders are acceptable', 'one correct format', 'Stock ₹30,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' }
          ],
            remediations: { 'misconception-closing-stock-appears-in': { steps: ['** Ask the student to locate "Closing Stock" in the Trial Balance.', '** Demonstrate the adjustment entry on a blank sheet: Dr. Closing Stock A/c (new asset) / Cr.', '** Show the flow: This entry *creates* the Closing Stock account → balance carried to Balance Sheet (Asset side) →.', '** Give a 3-item practice: Opening Stock ₹10,000, Purchases ₹50,000, Closing Stock ₹8,000.', '** Ask: "If you forgot the entry, what happens to Gross Profit?" (Answer: GP overstated by ₹8,000 because COGS includes.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_008', difficulty: 'standard',
          question: 'Interest on Capital is an appropriation of profit calculated at an agreed rate.',
          hint: 'Revise Class 8 Mathematics Chapter 8 "Simple Interest" (c8_math_ch8_9) — practice 10.',
          misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if.',
          parts: [
                { id: 'a', prompt: 'State the journal entry for providing interest on capital at 10% p.a. on opening capital of ₹2,00,000.', answer: 'Correct entry: Interest on Capital A/c Dr',
                  options: ['Correct entry: Interest on Capital A/c Dr', 'Capital A/c Dr', 'opposite entries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' },
                { id: 'b', prompt: 'Capital on 1st April: ₹3,00,000. Additional capital introduced on 1st August: ₹1,00,000. Rate: 10% p.a.', answer: 'Step 1: Interest on opening capital = ₹3,00,000 × 10% × 12/12 = ₹30,000',
                  options: ['Step 1: Interest on opening capital = ₹3,00,000 × 10% × 12/12 = ₹30,000', 'opposite entries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' },
                { id: 'c', prompt: 'Compare the effect on Net Profit and Capital when: (a) Interest on Capital ₹15,000 is provided, (b) Interest on Drawings ₹5,000 is charged.', answer: 'Interest on Capital ₹15,000 is provided, (',
                  options: ['Interest on Capital ₹15,000 is provided, (', 'capital increases by ₹15,000 in (a) and decreases by ₹5,000 in (b)', 'opposite entries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' }
          ],
            remediations: { 'interest-on-capital-and-interest': { steps: ['Ask them to prepare P&L Account showing both items separately — "Where does Interest on Capital appear?', 'Show that netting changes Net Profit figure — "If profit before adjustments is ₹1,00,000, what is net profit after.', 'Demonstrate capital account for each partner — "Partner A gets interest on capital ₹20,000 but charged interest on.', 'Emphasise the rule: "Every adjustment has two effects — one in P&L, one in Balance Sheet.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if.',
          parts: [
                { id: 'a', prompt: '"Interest on drawings should be calculated on the opening balance of drawings account." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'opposite entries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interest on Capital and Interest on Drawings are "opposite entries" that can be netted off — e.g., if Interest on Capital.' }
          ],
            remediations: { 'interest-on-capital-and-interest': { steps: ['Ask them to prepare P&L Account showing both items separately — "Where does Interest on Capital appear?', 'Show that netting changes Net Profit figure — "If profit before adjustments is ₹1,00,000, what is net profit after.', 'Demonstrate capital account for each partner — "Partner A gets interest on capital ₹20,000 but charged interest on.', 'Emphasise the rule: "Every adjustment has two effects — one in P&L, one in Balance Sheet.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_010', difficulty: 'standard',
          question: 'Unrecorded transactions are business events that have occurred but were not.',
          hint: 'If stuck on journal entries: Revisit c11_acc_cbse_09_003 and c11_acc_cbse_09_004 for the.',
          misconception: 'Students treat "unrecorded transactions" as a separate category of adjustments like "outstanding expenses" and memorise.',
          parts: [
                { id: 'a', prompt: 'Explain why the formula for manager\'s commission on profit AFTER charging commission is: Profit before commission × Rate/(100 + Rate), and not simply Profit.', answer: 'Because commission itself reduces the profit on',
                  options: ['Because commission itself reduces the profit on', 'it\'s just a different formula'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "unrecorded transactions" as a separate category of adjustments like "outstanding expenses" and memorise journal entries for.' }
          ],
            remediations: { 'students-treat-unrecorded-transactions-as': { steps: ['If a student cannot identify unrecorded transactions: Give them a trial balance with 3-4 additional information items.', 'Ask: "For each item, what is the CURRENT wrong state in the books?', 'What SHOULD be the correct state?', 'What entry fixes it?" Do this for 5 different types (goods withdrawn, private expense in business, asset erection.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
