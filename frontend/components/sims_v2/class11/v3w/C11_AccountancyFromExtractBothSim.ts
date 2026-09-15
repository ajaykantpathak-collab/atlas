import type { SimDef } from '../../engine/types';
import C11_AccountancyFromExtractBothSim from '../../../simulations/c6_12/C11_AccountancyFromExtractBothSim';

/** v3 wrapped master — C11_AccountancyFromExtractBothSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancyfromextractbothsim: SimDef = {
    id: 'v3w_c11_accountancyfromextractbothsim',
    title: 'From Extract Both',
    subtitle: 'This node covers the two primary methods of preparing a Trial Balance (Totals Method and.',
    classLevel: 11, subject: 'accountancy', topic: 'Preparation of Trial Balance: Totals Method and Balances Method',
    chapters: [],
    nodeIds: ['c11_acc_cbse_06_002', 'c11_acc_cbse_08_006', 'c11_acc_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re helping your uncle reconcile his shop\'s books at month-end.', goal: 'Master From Extract Both.' },
    discovery: {
        question: 'Two students marshall the same Balance Sheet differently. Student A uses Order of Permanence: Land → Building → Machinery → Furniture → Debtors → Cash.',
        options: ['Both orders are acceptable', 'one correct format', 'Stock ₹30,000'],
        answer: 'Both orders are acceptable',
        hook: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture.',
    },
    teaching: [
        { title: 'A Trial Balance is a statement that lists.', text: 'A Trial Balance is a statement that lists all ledger accounts with their respective debit or credit balances (Balances Method) or their debit and credit totals (Totals Method) to verify the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_002', title: 'A Trial Balance is a statement that.',
          scaffold: { problem: 'From the following ledger accounts of M/s Gupta Traders as on 31st March 2024, prepare a Trial Balance using the **Totals Method**.',
            steps: [
            { text: 'For each ledger account, compute the **Debit Total** (sum of all entries on Dr.' },
            { text: 'Create a Trial Balance table with columns: Account Title, L.F., Debit Total (₹), Credit Total (₹).' },
            { text: 'Enter each account\'s Debit Total in the Debit Total column and Credit Total in the Credit Total column.' },
            { text: 'Sum the Debit Total column and Credit Total column separately. Verify they are equal (double-entry guarantee).' },
            { text: 'Interpret: The totals match (₹9,60,000 each), confirming arithmetical accuracy of ledger totals.', faded: true, blankAnswer: '**Trial Balance of M/s Gupta Traders as on 31st March 2024.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_006', title: 'A Balance Sheet is a positional.',
          scaffold: { problem: 'From the following Trial Balance of Mr. Rajesh as on March 31, 2024, prepare a Balance Sheet. Net Profit for the year is ₹45,000.',
            steps: [
            { text: 'Verify Trial Balance totals. Debit ₹3,30,000 ≠ Credit ₹3,50,000. Difference ₹20,000 on credit side.' },
            { text: 'Identify Balance Sheet items. All accounts in Trial Balance *except* revenue/expense accounts (none shown here — this.' },
            { text: 'Adjust Capital. Closing Capital = Opening Capital (₹1,20,000) + Net Profit (₹45,000) – Drawings (₹15,000) = ₹1,50,000.' },
            { text: 'Marshall in Order of Permanence (standard for proprietorship unless specified).' },
            { text: 'Prepare Balance Sheet and verify Assets = Liabilities + Capital.', faded: true, blankAnswer: '**Balance Sheet of Mr. Rajesh as on March 31, 2024 (Order.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_02_009', title: 'The **Conservatism (Prudence) Concept**.',
          scaffold: { problem: 'M/s Gupta Traders has closing inventory of 200 units purchased at ₹500 per unit.',
            steps: [
            { text: 'Identify cost price per unit = ₹500 (given).' },
            { text: 'Calculate Net Realisable Value (NRV) = Estimated selling price (₹480) - Estimated selling expenses (₹20) = ₹460 per.' },
            { text: 'Compare Cost (₹500) with NRV (₹460). Since NRV < Cost, conservatism requires writing down to the lower value.' },
            { text: 'Compute total inventory value = 200 units × ₹460 = ₹92,000.' },
            { text: 'Verify: The loss of ₹8,000 (200 × ₹40) is recognised immediately in the current period\'s profit & loss, while the.', faded: true, blankAnswer: '₹92,000 (200 units × ₹460 NRV)' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_08_006', title: 'Identify each idea',
          dissect: { specimen: 'From Extract Both', spots: [
            { id: 's1', label: 'A Trial Balance is a', prompt: 'Which idea is this? — A Trial Balance is a statement that lists all ledger accounts with their respective debit.', answer: 'A Trial Balance is a', options: ['A Trial Balance is a', 'A Balance Sheet is a', 'The Conservatism Prudence Concept requires'] },
            { id: 's2', label: 'A Balance Sheet is a', prompt: 'Which idea is this? — A Balance Sheet is a positional statement prepared at a specific date (typically the end.', answer: 'A Balance Sheet is a', options: ['A Balance Sheet is a', 'A Trial Balance is a', 'The Conservatism Prudence Concept requires'] },
            { id: 's3', label: 'The Conservatism Prudence Concept requires', prompt: 'Which idea is this? — The **Conservatism (Prudence) Concept** requires that anticipated losses be recognised.', answer: 'The Conservatism Prudence Concept requires', options: ['The Conservatism Prudence Concept requires', 'A Trial Balance is a', 'A Balance Sheet is a'] }
          ] } }
    ],
    explore: { component: C11_AccountancyFromExtractBothSim, prompt: 'Explore the interactive — From Extract Both' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_002', difficulty: 'standard',
          question: 'A Trial Balance is a statement that lists all ledger accounts with their.',
          hint: 'If stuck, revisit ledger posting rules (Journal → Ledger) and practice balancing a single.',
          misconception: 'Students believe that in the Balances Method, an account with a zero balance should be **omitted** from the Trial.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Trial Balance is a statement that lists all ledger accounts with their respective debit',
                  options: ['A Trial Balance is a statement that lists all ledger accounts with their respective debit', 'A Balance Sheet is a positional statement prepared at a specific date (typically the end', 'The **Conservatism (Prudence) Concept** requires that anticipated losses be recognised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in the Balances Method, an account with a zero balance should be **omitted** from the Trial Balance.' }
          ],
            remediations: { 'in-the-balances-method': { steps: ['Show the student a ledger account that balances to zero (e.g., a temporary expense account fully paid off).', 'Ask: "If we omit this, how will anyone know the account existed and was correctly closed?" 2.', 'Demonstrate with the NCERT example: Rawat\'s Capital has a credit balance of ₹60,000—if it were zero, the capital.', 'Practice: Give 5 ledger accounts, two with zero balances.'] } } },
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
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_009', difficulty: 'standard',
          question: 'The **Conservatism (Prudence) Concept** requires that anticipated losses be.',
          hint: 'Revisit c11_acc_cbse_02_001 (GAAP) to see how concepts fit into the hierarchy, and.',
          misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Conservatism and Materiality: can they ever conflict? Give a concrete situation where applying one concept might seem to violate the other.', answer: 'Correct answer: They can appear to conflict',
                  options: ['Correct answer: They can appear to conflict', 'they never conflict', 'always choose the lowest value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000 can be ignored".' }
          ],
            remediations: { 'conservatism-means-always-choose-the': { steps: ['If a student exhibits this misconception: (1) Show the NCERT line: "deliberate attempt to underestimate the value of.', '(3) Ask: "If we write down inventory below net realisable value, who benefits and who is harmed?" to reveal that.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Conservatism ensures that financial statements show the worst-case scenario, so they are always reliable for creditors.".', answer: 'Correct answer: Refute',
                  options: ['Correct answer: Refute', 'agree, worst-case is safest', 'deliberate attempt to underestimate', 'always choose the lowest value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000 can be ignored".' },
                { id: 'b', prompt: 'Create a new scenario (different from bakery) involving a small manufacturing firm where both Conservatism and Materiality must be applied.', answer: 'Good answer: Firm buys 1,000 units of raw material at ₹100/unit',
                  options: ['Good answer: Firm buys 1,000 units of raw material at ₹100/unit', 'always choose the lowest value', 'anything under ₹5,000 can be ignored'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000 can be ignored".' },
                { id: 'c', prompt: 'Compare and contrast Conservatism and Materiality: can they ever conflict? Give a concrete situation where applying one concept might seem to violate the other.', answer: 'Correct answer: They can appear to conflict',
                  options: ['Correct answer: They can appear to conflict', 'they never conflict', 'always choose the lowest value', 'anything under ₹5,000 can be ignored'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000 can be ignored".' }
          ],
            remediations: { 'conservatism-means-always-choose-the': { steps: ['If a student exhibits this misconception: (1) Show the NCERT line: "deliberate attempt to underestimate the value of.', '(3) Ask: "If we write down inventory below net realisable value, who benefits and who is harmed?" to reveal that.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
