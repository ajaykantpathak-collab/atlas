import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch07_p2: SimDef = {
    id: 'v3_c11_acc_ch07_p2',
    title: 'Depreciation, Provisions and Reserves · Part 2/2',
    subtitle: 'Calculate depreciation, distinguish provisions from reserves, and see their effect on profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Depreciation, Provisions and Reserves · Part 2/2',
    chapters: ['c11_acc_ch07'],
    nodeIds: ['c11_acc_cbse_07_007', 'c11_acc_cbse_07_008', 'c11_acc_cbse_07_009', 'c11_acc_cbse_07_010', 'c11_acc_cbse_07_011', 'c11_acc_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a finance manager deciding how fast a delivery fleet \'ages\' on paper', intro: 'Machines don\'t send you a bill for wearing out — you have to write it yourself.', goal: 'Compute depreciation by SLM and WDV methods and differentiate provisions, reserves and their disclosure.' },
    discovery: {
        question: 'A machine bought for ₹5,00,000 is worth far less after five years of use, even though nothing \'happened\' to it. Where did that value go in the accounts?',
        options: ['It was charged year by year as depreciation — an expense for the wear the machine suffered earning revenue', 'It vanished only when the machine was sold', 'It stays as profit until scrapped', 'It moved to the bank account automatically'],
        answer: 'It was charged year by year as depreciation — an expense for the wear the machine suffered earning revenue',
        hook: 'Assets quietly become expenses over time — depreciation is how the books admit that truth.',
    },
    teaching: [
        { title: 'Methods of Recording Depreciation: Charging to Asset Account', text: 'Charging depreciation to the asset account is a method of recording depreciation where the depreciation amount for each period is directly credited to the fixed asset account, reducing its book.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute depreciation by straight-line and written-down-value methods and see how each rewrites the profit story.',
        labels: ['Methods of Recording Depreciation', 'Provisions: Meaning and Types', 'Reserves: Meaning and Types', 'Distinction between Provisions', 'Secret Reserve: Meaning'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_007', title: 'Methods of Recording Depreciation: Charging to Asset Account',
          caseStudy: { intro: 'Imagine you buy a laptop for ₹60,000 for your freelance graphic design work. After one year, the laptop\'s value drops because of wear and tear.',
            decisions: [{ prompt: 'State the three journal entries required at the end of each accounting year when depreciation is charged directly to the asset account.', options: [
                { text: 'The three entries are: (1) Depreciation A/c Dr', outcome: 'The three entries are: (1) Depreciation A/c Dr. → Asset A/c (for charging depreciation to asset).' },
                { text: 'receiving money', outcome: 'Not quite — Students often believe that crediting the Asset Account for depreciation means the business.', reveals: 'crediting-the-asset-account-for' },
                { text: 'Bank A/c', outcome: 'Not quite — Students often believe that crediting the Asset Account for depreciation means the business.', reveals: 'crediting-the-asset-account-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_07_009', title: 'Provisions: Meaning and Types (Provision for Bad Debts, Depreciation, Tax)',
          scaffold: { problem: 'On 31st March 2024, the Trial Balance of M/s Gupta Traders shows: Sundry Debtors ₹1,20,000; Bad Debts ₹5,000; Provision for Doubtful Debts.',
            steps: [
            { text: 'Write off further bad debts: Debit Bad Debts Account ₹3,000; Credit Sundry Debtors Account ₹3,000.' },
            { text: 'Transfer bad debts to Profit & Loss: Debit Profit & Loss Account ₹3,000; Credit Bad Debts Account ₹3,000.' },
            { text: 'Compute adjusted debtors: ₹1,20,000 - ₹3,000 = ₹1,17,000.' },
            { text: 'Compute new provision required: 5% of ₹1,17,000 = ₹5,850.' },
            { text: 'Determine additional provision: New provision ₹5,850 - Old provision ₹4,000 = ₹1,850.' },
            { text: 'Debit Profit & Loss Account ₹1,850; Credit Provision for Doubtful Debts Account ₹1,850.', faded: true, blankAnswer: 'New Provision = ₹5,850; Additional Provision charged to P&L.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_010', title: 'Reserves: Meaning and Types (Revenue, Capital, General, Specific)',
          caseStudy: { intro: 'Imagine your family saves ₹50,000 from this year\'s surplus income in a separate "Future Education Fund" — this is not an expense for the current year, but.',
            decisions: [{ prompt: 'State the fundamental difference between a Provision and a Reserve in terms of their effect on the calculation of Net Profit.', options: [
                { text: 'A Provision is a charge against profit (debited to Profit & Loss Account) and must be', outcome: 'A Provision is a charge against profit (debited to Profit & Loss Account) and must be deducted.' },
                { text: 'both reduce net profit', outcome: 'Not quite — Students treat "Reserve Fund" (e.g., Workmen Compensation Fund) as a separate *asset*.', reveals: 'students-treat-reserve-fund-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_011', title: 'Distinction between Provisions and Reserves',
          caseStudy: { intro: 'Imagine you are analysing the balance sheet of a company and see two items on the liabilities side: "Provision for Taxation ₹50,000" and "General Reserve.',
            decisions: [{ prompt: 'State the basic nature of a provision and a reserve in one sentence each.', options: [
                { text: 'A provision is a charge against profit', outcome: 'A provision is a charge against profit; a reserve is an appropriation of profit.' },
                { text: 'provision', outcome: 'Not quite — Students often think "provision" and "reserve" are interchangeable terms for "money set aside".', reveals: 'provision-and-reserve-are-interchangeable' },
                { text: 'reserve', outcome: 'Not quite — Students often think "provision" and "reserve" are interchangeable terms for "money set aside".', reveals: 'provision-and-reserve-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_012', title: 'Secret Reserve: Meaning and Creation',
          caseStudy: { intro: 'Imagine you run a successful family sweets business in Delhi. Your competitors keep asking for your recipe because your profits are publicly visible in your.',
            decisions: [{ prompt: 'Define "Secret Reserve" in one sentence using the exact terminology from NCERT Class 11 Accountancy.', options: [
                { text: 'Secret Reserve is a reserve', outcome: 'Secret Reserve is a reserve which does not appear in the balance sheet, created by understating.' },
                { text: 'a reserve kept secretly by the owner', outcome: 'Not quite — Students often think "Secret Reserve = Capital Reserve" because both are not available for.', reveals: 'secret-reserve-capital-reserve-because' },
                { text: 'a reserve for emergencies', outcome: 'Not quite — Students often think "Secret Reserve = Capital Reserve" because both are not available for.', reveals: 'secret-reserve-capital-reserve-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family\'s catering business bought a delivery van for ₹9 lakh (expected life 6 years, scrap ₹90,000). Used vans are suddenly in demand and your father says: \'The van\'s market value has actually gone up this year — charging depreciation would be silly. And anyway, no cash went out, so it\'s not a real expense.\'',
            decisions: [{ prompt: 'Should the business still charge depreciation?', options: [
                { text: 'Yes — depreciation allocates the van\'s historical cost (₹9 lakh minus scrap) over its useful life so each year\'s revenue bears the cost of using it; it is a non-cash expense driven by the matching principle, not a mark-to-market adjustment.', outcome: 'Skipping it overstates this year\'s profit and understates future years\'; market value movements are irrelevant to cost allocation.' },
                { text: 'No — depreciation exists to write the asset down to market value, and the market value rose.', outcome: 'That confuses accounting depreciation (cost allocation) with economic depreciation (value change); the books charge the original cost regardless of resale prices.', reveals: 'depreciation-is-market-valuation' },
                { text: 'No — since no cash left the business this year, there is nothing to record.', outcome: 'Expense ≠ cash outflow; the van\'s cost was \'consumed\' helping earn this year\'s revenue, so a portion must be charged to match it.', reveals: 'expense-requires-cash' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'Depreciation is not about market value — it\'s about charging the cost of an asset to the years it serves.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_007', difficulty: 'standard',
          question: 'Charging depreciation to the asset account is a method of recording.',
          hint: 'Review journal entry rules for asset purchase (Asset Dr., Bank Cr.) and expense.',
          misconception: 'Students often believe that crediting the Asset Account for depreciation means the business is "receiving money".',
          parts: [
                { id: 'a', prompt: 'State the three journal entries required at the end of each accounting year when depreciation is charged directly to the asset account.', answer: 'The three entries are: (1) Depreciation A/c Dr',
                  options: ['The three entries are: (1) Depreciation A/c Dr', 'receiving money', 'Bank A/c', 'Depreciation A/c'],
                  hint: 'Review journal entry rules for asset purchase (Asset Dr., Bank Cr.) and expense recognition.',
                  misconception: 'Students often believe that crediting the Asset Account for depreciation means the business is "receiving money" or that the asset\'s market.' },
                { id: 'b', prompt: 'A machine costing ₹2,00,000 is purchased on 1st April 2023. Depreciation is charged at 10% p.a. on straight line basis. Books close on 31st March.', answer: 'Year 1 (2023-24): Depreciation = ₹20,000',
                  options: ['Year 1 (2023-24): Depreciation = ₹20,000', 'charge to asset', 'receiving money', 'Bank A/c'],
                  hint: 'Review journal entry rules for asset purchase (Asset Dr., Bank Cr.) and expense recognition.',
                  misconception: 'Students often believe that crediting the Asset Account for depreciation means the business is "receiving money" or that the asset\'s market.' }
          ],
            remediations: { 'crediting-the-asset-account-for': { steps: ['Ask the student to explain in their own words what "depreciation is a non-cash expense" means.', 'Show the journal entry: Depreciation A/c Dr. → Asset A/c. Emphasise: no Bank/Cash account appears.', 'Use a T-account visual: Asset A/c has Bank on debit (purchase), Depreciation on credit (reduction).', 'Contrast with a cash sale: Bank Dr. → Asset Cr.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that crediting the Asset Account for depreciation means the business is "receiving money".',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Charging depreciation to the asset account violates the historical cost principle because the asset no longer appears at its original.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'receiving money', 'Bank A/c', 'Depreciation A/c'],
                  hint: 'Review journal entry rules for asset purchase (Asset Dr., Bank Cr.) and expense recognition.',
                  misconception: 'Students often believe that crediting the Asset Account for depreciation means the business is "receiving money" or that the asset\'s market.' }
          ],
            remediations: { 'crediting-the-asset-account-for': { steps: ['Ask the student to explain in their own words what "depreciation is a non-cash expense" means.', 'Show the journal entry: Depreciation A/c Dr. → Asset A/c. Emphasise: no Bank/Cash account appears.', 'Use a T-account visual: Asset A/c has Bank on debit (purchase), Depreciation on credit (reduction).', 'Contrast with a cash sale: Bank Dr. → Asset Cr.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_008', difficulty: 'standard',
          question: 'The Provision for Depreciation (or Accumulated Depreciation) method is a system.',
          hint: 'If stuck on depreciation calculation, revisit c11_acc_cbse_07_004 (SLM) and.',
          misconception: 'Students often think that under the Provision for Depreciation method, the annual depreciation entry credits the Asset.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Provision for Depreciation (or Accumulated Depreciation) method is a system of',
                  options: ['The Provision for Depreciation (or Accumulated Depreciation) method is a system of', 'Depreciation is the systematic allocation of the depreciable cost of a tangible fixed', 'Depreciation causes are the specific reasons why a tangible fixed asset loses its book', 'The amount of depreciation charged each accounting period is determined by three factors:'],
                  hint: 'If stuck on depreciation calculation, revisit c11_acc_cbse_07_004 (SLM) and c11_acc_cbse_07_005.',
                  misconception: 'Students often think that under the Provision for Depreciation method, the annual depreciation entry credits the Asset Account (like in the.' }
          ],
            remediations: { 'under-the-provision-for-depreciation': { steps: ['If the student confuses the credit entry: Have them write both methods side-by-side and highlight the only difference.', 'Use a T-account visual: show Asset Account with only debit entries (purchases) and credit entries only on disposal.', 'For disposal errors: Give a step-by-step checklist: (1) Charge current year\'s depreciation, (2) Transfer total.', 'For capital vs revenue: Use the \'future benefit\' test — if the expenditure increases capacity/efficiency/life.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_009', difficulty: 'standard',
          question: 'A provision is an amount set aside out of current profits to meet a known.',
          hint: 'Review the matching principle and prudence concept from Chapter 2 (Accounting Principles).',
          misconception: 'Students often treat provisions and reserves interchangeably, thinking both are amounts set aside from profits.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A provision is an amount set aside out of current profits to meet a known liability or',
                  options: ['A provision is an amount set aside out of current profits to meet a known liability or', 'Depreciation is the systematic allocation of the depreciable cost of a tangible fixed', 'Depreciation causes are the specific reasons why a tangible fixed asset loses its book', 'The amount of depreciation charged each accounting period is determined by three factors:'],
                  hint: 'Review the matching principle and prudence concept from Chapter 2 (Accounting Principles) and the.',
                  misconception: 'Students often treat provisions and reserves interchangeably, thinking both are amounts set aside from profits.' }
          ],
            remediations: { 'students-often-treat-provisions-and': { steps: ['Revisit the definition of \'charge against profit\' vs \'appropriation of profit\' using the Profit & Loss Account format.', 'Use a T-account to show how Provision for Doubtful Debts is debited to P&L and credited to Provision account, reducing.', 'Contrast with General Reserve: show it is debited to Profit & Loss Appropriation Account (after net profit).', 'Practice identifying items from a list as provision or reserve with justification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_010', difficulty: 'standard',
          question: 'Reserves are appropriations of profit retained in the business to strengthen.',
          hint: 'Revisit c11_acc_cbse_07_009 (Provisions) and c11_acc_cbse_07_011 (Distinction) — focus.',
          misconception: 'Students treat "Reserve Fund" (e.g., Workmen Compensation Fund) as a separate *asset* (cash/set-aside money) rather.',
          parts: [
                { id: 'a', prompt: 'Compare: (a) Premium on issue of shares ₹10,00,000 transferred to Securities Premium Reserve, and (b) ₹10,00,000 retained from current year\'s profit to General.', answer: '(a) Securities Premium = **Capital Reserve** (source: capital profit, not from',
                  options: ['(a) Securities Premium = **Capital Reserve** (source: capital profit, not from', 'both are reserves so both are revenue'],
                  hint: 'Revisit c11_acc_cbse_07_009 (Provisions) and c11_acc_cbse_07_011 (Distinction) — focus on the.',
                  misconception: 'Students treat "Reserve Fund" (e.g., Workmen Compensation Fund) as a separate *asset* (cash/set-aside money) rather than an *appropriation.' }
          ],
            remediations: { 'students-treat-reserve-fund-e': { steps: ['If a student draws a "Reserve Bank Account" in ledger accounts: (1) Ask: "Does the journal entry credit Bank?" — No,.', '(2) Show that Reserves appear on Liabilities side — they are *claims of owners*, not assets.', '(3) Contrast with "Investment of Reserve" (e.g., DRR Investment) which *is* an asset.', '(4) Practice: Give 3 items — "General Reserve", "Investment of General Reserve", "Cash at Bank" — and ask to classify.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_011', difficulty: 'standard',
          question: 'A provision is a charge against profit created for a known liability or expense.',
          hint: 'Revisit the definitions and examples in nodes c11_acc_cbse_07_009 (Provisions) and.',
          misconception: 'Students often think "provision" and "reserve" are interchangeable terms for "money set aside".',
          parts: [
                { id: 'a', prompt: 'State the basic nature of a provision and a reserve in one sentence each.', answer: 'A provision is a charge against profit',
                  options: ['A provision is a charge against profit', 'provision', 'reserve', 'money set aside'],
                  hint: 'Revisit the definitions and examples in nodes c11_acc_cbse_07_009 (Provisions) and.',
                  misconception: 'Students often think "provision" and "reserve" are interchangeable terms for "money set aside".' }
          ],
            remediations: { 'provision-and-reserve-are-interchangeable': { steps: ['If the student conflates the two, take these steps: 1) Write the definitions side-by-side highlighting "charge against.', '2) Use a T-account to show provision debited to P&L (reducing profit) and reserve debited to Profit & Loss.', '3) Give a list of items (provision for tax, general reserve, provision for doubtful debts, debenture redemption.', '4) Emphasise the test: "Does it reduce taxable profit?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_012', difficulty: 'standard',
          question: 'Secret Reserve is a reserve that is not disclosed in the balance sheet, created.',
          hint: 'Revisit depreciation journal entries (c11_acc_cbse_07_007/008) and provision for doubtful.',
          misconception: 'Students often think "Secret Reserve = Capital Reserve" because both are not available for dividend.',
          parts: [
                { id: 'a', prompt: 'Define "Secret Reserve" in one sentence using the exact terminology from NCERT Class 11 Accountancy.', answer: 'Secret Reserve is a reserve',
                  options: ['Secret Reserve is a reserve', 'a reserve kept secretly by the owner', 'a reserve for emergencies', 'Secret Reserve = Capital Reserve'],
                  hint: 'Revisit depreciation journal entries (c11_acc_cbse_07_007/008) and provision for doubtful debts.',
                  misconception: 'Students often think "Secret Reserve = Capital Reserve" because both are not available for dividend.' },
                { id: 'b', prompt: 'A company purchases inventory for ₹5,00,000. Its net realizable value is ₹5,20,000. The accountant values it at ₹4,00,000 in the balance sheet.', answer: 'Secret reserve created = ₹5,00,000 (cost) - ₹4,00,000 (undervalued) = ₹1,00,000',
                  options: ['Secret reserve created = ₹5,00,000 (cost) - ₹4,00,000 (undervalued) = ₹1,00,000', 'Secret Reserve = Capital Reserve', '"Secret Reserve = Capital Reserve"'],
                  hint: 'Revisit depreciation journal entries (c11_acc_cbse_07_007/008) and provision for doubtful debts.',
                  misconception: 'Students often think "Secret Reserve = Capital Reserve" because both are not available for dividend.' }
          ],
            remediations: { 'secret-reserve-capital-reserve-because': { steps: ['Make a two-column table "Secret Reserve vs Capital Reserve vs Unrealized Gain" with rows: Source, Disclosure, Dividend.', 'Give three concrete transactions – one for each – and ask student to classify.', 'Emphasize the keyword "MANIPULATION" for secret reserve: it requires an *intentional accounting action* that deviates.', 'Practice one numerical where they must identify which of 5 given adjustments creates a secret reserve (only the ones.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
