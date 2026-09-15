import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch09_p1: SimDef = {
    id: 'v3_c11_acc_ch09_p1',
    title: 'Financial Statements - II · Part 1/2',
    subtitle: 'Apply year-end adjustments and assemble the complete balance sheet.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements - II · Part 1/2',
    chapters: ['c11_acc_ch09'],
    nodeIds: ['c11_acc_cbse_09_001', 'c11_acc_cbse_09_002', 'c11_acc_cbse_09_003', 'c11_acc_cbse_09_004', 'c11_acc_cbse_09_005', 'c11_acc_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an accountant closing a firm\'s books on 31 March', intro: 'The trial balance is nearly honest. Your adjustments are the last mile between records and reality.', goal: 'Pass adjustment entries and prepare a balance sheet showing true financial position.' },
    discovery: {
        question: 'A firm counts closing stock twice — once in the trading account, once among balance-sheet assets. A student calls it double counting. Why is it actually correct?',
        options: ['The same stock is unexpired cost this year in trading and a resource owned at year-end in the balance sheet', 'It is double counting and should be struck from the balance sheet', 'Stock only belongs in the balance sheet, never in trading', 'Because stock is both income and expense simultaneously'],
        answer: 'The same stock is unexpired cost this year in trading and a resource owned at year-end in the balance sheet',
        hook: 'One figure, two lenses — closing stock adjusts the cost of what you sold and reports what you still hold.',
    },
    teaching: [
        { title: 'Need for Adjustments in Financial Statements', text: 'Adjustments in financial statements are necessary accounting entries made at the end of an accounting period to ensure that revenues are recognised when earned (not when received) and expenses are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take a trial balance with adjustments — outstanding expenses, prepaid, depreciation, closing stock — and produce a full balance sheet.',
        labels: ['Need for Adjustments', 'Adjustment: Closing Stock', 'Adjustment: Outstanding Expenses', 'Adjustment: Accrued Income', 'Adjustment: Depreciation and its', 'Adjustment: Bad Debts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_001', title: 'Need for Adjustments in Financial Statements',
          caseStudy: { intro: 'Imagine you paid ₹12,000 for a 12-month insurance policy on July 1, 2023, but your financial year ends March 31, 2024.',
            decisions: [{ prompt: 'What is the fundamental accounting concept that creates the need for adjustments in financial statements, and how does it differ from the.', options: [
                { text: 'The accrual concept requires revenues to be recognised when earned and expenses when', outcome: 'The accrual concept requires revenues to be recognised when earned and expenses when incurred.' },
                { text: 'matching concept', outcome: 'Not quite — Students treat adjustments as "extra entries to fix mistakes" rather than *necessary consequences.', reveals: 'students-treat-adjustments-as-extra' },
                { text: 'going concern', outcome: 'Not quite — Students treat adjustments as "extra entries to fix mistakes" rather than *necessary consequences.', reveals: 'students-treat-adjustments-as-extra' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_002', title: 'Adjustment: Closing Stock and its Treatment',
          scaffold: { problem: 'From the following Trial Balance of M/s Sharma Traders as on March 31, 2024, prepare the Trading Account showing closing stock adjustment.',
            steps: [
            { text: 'Identify the valuation rule - lower of cost or net realisable value. Cost = ₹55,000, Market Value = ₹60,000.' },
            { text: 'Write the adjustment journal entry: Closing Stock A/c Dr. ₹55,000 To Trading A/c ₹55,000.' },
            { text: 'Construct Trading Account. Dr. side: Opening Stock ₹40,000, Purchases ₹2,50,000, Wages ₹30,000, Carriage Inwards.' },
            { text: 'Cr. side: Sales ₹4,00,000, Closing Stock ₹55,000. Total Cr. = ₹4,55,000.' },
            { text: 'Gross Profit = Cr. total - Dr. total = ₹4,55,000 - ₹3,30,000 = ₹1,25,000.', faded: true, blankAnswer: 'Closing Stock valued at ₹55,000. Adjustment Entry: Closing.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_004', title: 'Adjustment: Accrued Income and Income Received in Advance',
          caseStudy: { intro: 'Imagine you run a coaching centre. On March 31st (year-end), you have taught classes for March but the students will pay fees in April — this is **Accrued.',
            decisions: [{ prompt: 'A trial balance shows "Commission Received ₹5,000". Additional information states: "Commission of ₹1,500 is still receivable for the.', options: [
                { text: 'Correct entry: Accrued Commission A/c Dr', outcome: 'Correct entry: Accrued Commission A/c Dr. ₹1,500 To Commission Received A/c ₹1,500.' },
                { text: 'receivable', outcome: 'Not quite — Students consistently reverse the journal entries: For Accrued Income, they debit the Income.', reveals: 'students-consistently-reverse-the-journal' },
                { text: 'payable', outcome: 'Not quite — Students consistently reverse the journal entries: For Accrued Income, they debit the Income.', reveals: 'students-consistently-reverse-the-journal' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_09_005', title: 'Adjustment: Depreciation and its Dual Effect',
          scaffold: { problem: 'A firm purchased a machine on 1st October 2023 for ₹6,00,000. The accounting year ends 31st March 2024.',
            steps: [
            { text: 'Identify given data: Cost = ₹6,00,000, Rate = 15% p.a., Purchase date = 1 Oct 2023, Year-end = 31 Mar 2024.' },
            { text: 'Calculate depreciation: ₹6,00,000 × 15% × 6/12 = ₹45,000. (Formula: Cost × Rate × Months/12)' },
            { text: 'Pass adjustment entry: Depreciation A/c Dr. ₹45,000 To Machinery A/c ₹45,000. (Debit expense, credit asset)' },
            { text: 'Show in Profit & Loss Account: Debit side under "Depreciation on Machinery" ₹45,000. This reduces net profit by ₹45,000.' },
            { text: 'Show in Balance Sheet: Assets side → Machinery ₹6,00,000 Less: Depreciation ₹45,000 = ₹5,55,000 (Written Down Value).', faded: true, blankAnswer: 'Depreciation = ₹45,000. Entry: Depreciation A/c Dr. 45,000.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s tuition centre closes its books on 31 March. In July they paid ₹24,000 for a 12-month insurance policy; in March a corporate client signed up for a 10-month course paying ₹50,000 in advance, only one month of which falls in this year. Your friend says: \'Just put insurance and commission fully in this year\'s P&L — the cash moved this year, and adjustments are only for fixing mistakes anyway.\'',
            decisions: [{ prompt: 'How much of each belongs in this year\'s profit?', options: [
                { text: 'Insurance: 9 of 12 months = ₹18,000 to P&L, ₹6,000 prepaid to the balance sheet. Advance fee: 1 of 10 months = ₹5,000 to P&L, ₹45,000 unearned income as a liability. Adjustments aren\'t error-fixes — they apply accrual: recognise income when earned, expenses when incurred.', outcome: 'Every adjustment asks \'what belongs to this period?\' — the rest goes to the balance sheet as an asset or liability.' },
                { text: 'Both fully in this year\'s P&L — cash moved this year, so the expense and income are this year\'s.', outcome: 'That\'s the cash basis; accrual matching sends the future-period share to the balance sheet, otherwise profit is distorted in both years.', reveals: 'cash-paid-means-this-year' },
                { text: 'Adjust the insurance (expenses need adjusting) but take the full ₹50,000 as income — income doesn\'t need adjustments.', outcome: 'The same accrual logic runs both ways: income received in advance is a liability until earned, exactly like prepaid expense is an asset until used.', reveals: 'only-expenses-get-adjusted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Adjustments are where accounting grows up: the books finally match economic reality, not just cash movements.',
            decisions: [{ prompt: 'What comes next? Financial Statements - II · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Statements - II · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_001', difficulty: 'standard',
          question: 'Adjustments in financial statements are necessary accounting entries made.',
          hint: 'Revisit the difference between cash basis and accrual basis using a simple timeline: draw.',
          misconception: 'Students treat adjustments as "extra entries to fix mistakes" rather than *necessary consequences of the accrual.',
          parts: [
                { id: 'a', prompt: 'A business pays ₹24,000 on October 1, 2023 for a one-year rent agreement. The accounting year ends March 31, 2024.', answer: 'Only 6 months (Oct–Mar) relate to the current year',
                  options: ['Only 6 months (Oct–Mar) relate to the current year', 'it\'s a prepaid expense so we adjust'],
                  hint: 'Revisit the difference between cash basis and accrual basis using a simple timeline: draw when cash.',
                  misconception: 'Students treat adjustments as "extra entries to fix mistakes" rather than *necessary consequences of the accrual basis*.' },
                { id: 'b', prompt: 'Compare: (a) Prepaid Insurance and (b) Outstanding Wages. For each, state: (i) Is it an asset or liability? (ii) Does it increase or decrease profit?', answer: 'Prepaid Insurance and (',
                  options: ['Prepaid Insurance and (', 'paid in advance', 'unpaid but incurred'],
                  hint: 'Revisit the difference between cash basis and accrual basis using a simple timeline: draw when cash.',
                  misconception: 'Students treat adjustments as "extra entries to fix mistakes" rather than *necessary consequences of the accrual basis*.' }
          ],
            remediations: { 'students-treat-adjustments-as-extra': { steps: ['Draw a timeline: Mark the accounting year (Apr–Mar).', 'Plot the transaction (e.g., insurance paid Jul 1 for 12 months).', 'Shade the part in *this* year vs.', 'Ask: "Which part helped earn *this year\'s* revenue?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_002', difficulty: 'standard',
          question: 'Closing Stock represents the cost of unsold goods remaining in the business.',
          hint: 'Revisit the Trading Account format from Chapter 8 (Financial Statements - I) and practice.',
          misconception: 'Students often treat closing stock as a revenue item and credit it to Sales Account instead of Trading Account, or they.',
          parts: [
                { id: 'a', prompt: 'State the exact adjustment journal entry for closing stock when it is given as additional information outside the Trial Balance.', answer: 'Closing Stock A/c Dr',
                  options: ['Closing Stock A/c Dr', 'Trading A/c Dr', 'stock is an expense to be debited, not an asset to be recognised'],
                  hint: 'Revisit the Trading Account format from Chapter 8 (Financial Statements - I) and practice COGS.',
                  misconception: 'Students often treat closing stock as a revenue item and credit it to Sales Account instead of Trading Account, or they debit it.' },
                { id: 'b', prompt: 'Explain why closing stock is credited to the Trading Account and not debited, even though stock is an asset.', answer: 'Closing stock is credited to Trading Account',
                  options: ['Closing stock is credited to Trading Account', 'assets are always debited'],
                  hint: 'Revisit the Trading Account format from Chapter 8 (Financial Statements - I) and practice COGS.',
                  misconception: 'Students often treat closing stock as a revenue item and credit it to Sales Account instead of Trading Account, or they debit it.' }
          ],
            remediations: { 'students-often-treat-closing-stock': { steps: ['Draw a T-account for Trading Account. Show Opening Stock and Purchases on Dr. side.', 'Show the accounting equation: Assets = Liabilities + Capital. Closing Stock is an asset → must appear on Balance Sheet.', 'Link both: The credit to Trading Account increases Gross Profit → increases Capital; the debit to Closing Stock Account.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat closing stock as a revenue item and credit it to Sales Account instead of Trading Account, or they.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If closing stock is overvalued by ₹5,000 due to ignoring the lower of cost or NRV rule, both Gross Profit and Current Assets will.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'only profit is affected'],
                  hint: 'Revisit the Trading Account format from Chapter 8 (Financial Statements - I) and practice COGS.',
                  misconception: 'Students often treat closing stock as a revenue item and credit it to Sales Account instead of Trading Account, or they debit it.' }
          ],
            remediations: { 'students-often-treat-closing-stock': { steps: ['Draw a T-account for Trading Account. Show Opening Stock and Purchases on Dr. side.', 'Show the accounting equation: Assets = Liabilities + Capital. Closing Stock is an asset → must appear on Balance Sheet.', 'Link both: The credit to Trading Account increases Gross Profit → increases Capital; the debit to Closing Stock Account.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_003', difficulty: 'standard',
          question: 'Outstanding expenses are expenses that have been incurred during the current.',
          hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and focus on the insurance premium.',
          misconception: 'Students often think "Outstanding expense means we haven\'t recorded it at all, so we debit Outstanding Expense A/c".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Outstanding expenses are expenses that have been incurred during the current accounting',
                  options: ['Outstanding expenses are expenses that have been incurred during the current accounting', 'Adjustments in financial statements are necessary accounting entries made at the end of', 'Closing Stock represents the cost of unsold goods remaining in the business at the end of', 'Accrued Income refers to revenue earned during the current accounting period but not yet'],
                  hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and focus on the insurance premium example.',
                  misconception: 'Students often think "Outstanding expense means we haven\'t recorded it at all, so we debit Outstanding Expense A/c" — they treat the.' }
          ],
            remediations: { 'outstanding-expense-means-we-haven': { steps: ['If a student makes the above error, do NOT just re-teach the entry.', 'Instead: (1) Show a T-account for the expense (e.g., Wages) with the trial balance amount on debit side.', 'Ask: "We need total wages for the year to be ₹8,500 but only ₹8,000 is here.', 'How do we increase a debit balance?" → Debit Wages ₹500.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_004', difficulty: 'standard',
          question: 'Accrued Income refers to revenue earned during the current accounting period.',
          hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and c11_acc_cbse_09_003.',
          misconception: 'Students consistently reverse the journal entries: For Accrued Income, they debit the Income Account and credit Accrued.',
          parts: [
                { id: 'a', prompt: 'A trial balance shows "Commission Received ₹5,000". Additional information states: "Commission of ₹1,500 is still receivable for the current year." What is the.', answer: 'Correct entry: Accrued Commission A/c Dr',
                  options: ['Correct entry: Accrued Commission A/c Dr', 'receivable', 'payable', 'received in advance'],
                  hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and c11_acc_cbse_09_003 (Outstanding/Prepaid.',
                  misconception: 'Students consistently reverse the journal entries: For Accrued Income, they debit the Income Account and credit Accrued Income Account.' },
                { id: 'b', prompt: 'A business receives ₹12,000 rent on March 1, 2024 for 12 months (March 2024 – February 2025). The accounting year ends March 31, 2024.', answer: 'Violation: Only 1 month (March) rent ₹1,000 (12,000/12) belongs to current year',
                  options: ['Violation: Only 1 month (March) rent ₹1,000 (12,000/12) belongs to current year', 'receivable', 'payable', 'received in advance'],
                  hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and c11_acc_cbse_09_003 (Outstanding/Prepaid.',
                  misconception: 'Students consistently reverse the journal entries: For Accrued Income, they debit the Income Account and credit Accrued Income Account.' },
                { id: 'c', prompt: 'Trial Balance shows: Interest Received ₹8,000. Additional Info: (i) Interest accrued on investments ₹2,000; (ii) Interest received in advance for next quarter.', answer: 'Entries: (1) Accrued Interest A/c Dr',
                  options: ['Entries: (1) Accrued Interest A/c Dr', 'receivable', 'payable', 'received in advance'],
                  hint: 'Revisit c11_acc_cbse_09_001 (Need for Adjustments) and c11_acc_cbse_09_003 (Outstanding/Prepaid.',
                  misconception: 'Students consistently reverse the journal entries: For Accrued Income, they debit the Income Account and credit Accrued Income Account.' }
          ],
            remediations: { 'students-consistently-reverse-the-journal': { steps: ['Draw a **T-account visual** for each. For Accrued Income: Left side (Debit) = Accrued Income Asset (increase); Right.', 'Use the **"Who owes whom?" test**: Accrued → Customer owes us → Our Asset (Debit).', 'Practice 3 questions where ONLY the additional information changes (same trial balance) — one with accrued only, one.', 'Have student explain in Hindi/English: "Accrued = Humne kaam kiya, paisa aana baaki → Asset.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_005', difficulty: 'standard',
          question: 'Depreciation is the systematic allocation of the depreciable amount of.',
          hint: 'If stuck, revisit c11_acc_cbse_09_001 (Need for Adjustments) to recall accrual concept.',
          misconception: 'Students believe depreciation is "saving money to buy a new asset" – they think the depreciation expense debited to P&L.',
          parts: [
                { id: 'a', prompt: 'State the journal entry for providing depreciation on machinery at 10% p.a. when machinery appears in the trial balance at ₹2,00,000.', answer: 'Correct answer: Journal entry: Depreciation A/c Dr',
                  options: ['Correct answer: Journal entry: Depreciation A/c Dr', 'Machinery A/c Dr', 'Cash A/c Dr', 'saving money to buy a new asset'],
                  hint: 'If stuck, revisit c11_acc_cbse_09_001 (Need for Adjustments) to recall accrual concept, and.',
                  misconception: 'Students believe depreciation is "saving money to buy a new asset" – they think the depreciation expense debited to P&L creates a cash.' },
                { id: 'b', prompt: 'A student says: "Depreciation is a cash expense because the asset loses value, so we must pay cash to replace it." Explain why this statement is incorrect.', answer: 'Correct explanation: Depreciation is a non-cash expense',
                  options: ['Correct explanation: Depreciation is a non-cash expense', 'saving money to buy a new asset', 'the depreciation expense debited to P&L creates a cash reserve'],
                  hint: 'If stuck, revisit c11_acc_cbse_09_001 (Need for Adjustments) to recall accrual concept, and.',
                  misconception: 'Students believe depreciation is "saving money to buy a new asset" – they think the depreciation expense debited to P&L creates a cash.' },
                { id: 'c', prompt: 'Machinery was purchased on 1st July 2023 for ₹5,00,000. Depreciation is charged at 10% p.a. on straight-line method. The accounting year ends 31st March 2024.', answer: 'Correct answer: Machinery used for 9 months (July to March)',
                  options: ['Correct answer: Machinery used for 9 months (July to March)', 'saving money to buy a new asset', 'the depreciation expense debited to P&L creates a cash reserve'],
                  hint: 'If stuck, revisit c11_acc_cbse_09_001 (Need for Adjustments) to recall accrual concept, and.',
                  misconception: 'Students believe depreciation is "saving money to buy a new asset" – they think the depreciation expense debited to P&L creates a cash.' },
                { id: 'd', prompt: 'Compare the impact on net profit and asset value in Year 1 and Year 2 for a machine costing ₹1,00,000 depreciated at 20% p.a.', answer: 'Correct analysis: SLM: Year 1 dep = ₹20,000, asset value = ₹80,000',
                  options: ['Correct analysis: SLM: Year 1 dep = ₹20,000, asset value = ₹80,000', 'saving money to buy a new asset', 'the depreciation expense debited to P&L creates a cash reserve'],
                  hint: 'If stuck, revisit c11_acc_cbse_09_001 (Need for Adjustments) to recall accrual concept, and.',
                  misconception: 'Students believe depreciation is "saving money to buy a new asset" – they think the depreciation expense debited to P&L creates a cash.' }
          ],
            remediations: { 'depreciation-is-saving-money-to': { steps: ['Ask the student: "When you bought the asset, which account did you debit and which did you credit?" (Answer: Asset A/c.', 'Ask: "Did cash go out at that time or now?" (Answer: At purchase time).', 'Explain: "Depreciation is just spreading that past cash outflow over the years the asset helps earn revenue.', 'Show the T-accounts: Asset A/c (Dr. balance) → credit side gets depreciation → balance reduces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_09_006', difficulty: 'standard',
          question: 'Bad Debts represent the irrecoverable amount from debtors that is written off.',
          hint: 'Revisit c11_acc_cbse_09_003 (Outstanding Expenses) — the entry pattern (Expense Dr.',
          misconception: '**Students treat "Provision for Doubtful Debts" as a liability (like a fund) instead of a contra-asset.** They show.',
          parts: [
                { id: 'a', prompt: '"Provision for doubtful debts is created to *ensure* we have cash to pay off bad debts when they happen." Do you agree?', answer: '**Disagree.** Provision is **not a cash reserve**',
                  options: ['**Disagree.** Provision is **not a cash reserve**', 'provision', 'saving money', 'recognizing expense early'],
                  hint: 'Revisit c11_acc_cbse_09_003 (Outstanding Expenses) — the entry pattern (Expense Dr.',
                  misconception: '**Students treat "Provision for Doubtful Debts" as a liability (like a fund) instead of a contra-asset.** They show it on the **Liabilities.' },
                { id: 'b', prompt: 'Trial Balance shows: Sundry Debtors ₹80,000; Bad Debts ₹2,000; Provision for Doubtful Debts ₹4,000 (Cr.).', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'create provision at 5%', '"create provision at 5%" always means debit P&L for the full new amount'],
                  hint: 'Revisit c11_acc_cbse_09_003 (Outstanding Expenses) — the entry pattern (Expense Dr.',
                  misconception: '**Students treat "Provision for Doubtful Debts" as a liability (like a fund) instead of a contra-asset.** They show it on the **Liabilities.' }
          ],
            remediations: { 'students-treat-provision-for-doubtful': { steps: ['** Ask student to define "Contra-asset" and give two examples (Accumulated Depreciation, Provision for Doubtful Debts).', '** Show the accounting equation impact: Creating provision → Dr. P&L (Expense ↑) → Cr.', '** Give a mini-case: Debtors ₹50,000, Provision ₹3,000. Ask: "If we collect ₹47,000 cash next year, what entries?" →.', '** Practice 3 Balance Sheet extracts with only the Assets side — force them to present Debtors net of provision every.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
