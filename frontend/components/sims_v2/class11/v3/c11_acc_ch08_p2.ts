import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch08_p2: SimDef = {
    id: 'v3_c11_acc_ch08_p2',
    title: 'Financial Statements - I · Part 2/2',
    subtitle: 'Construct the trading and P&L account and interpret gross vs net profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements - I · Part 2/2',
    chapters: ['c11_acc_ch08'],
    nodeIds: ['c11_acc_cbse_08_007', 'c11_acc_cbse_08_008', 'c11_acc_cbse_08_009', 'c11_acc_cbse_08_010', 'c11_acc_cbse_08_011', 'c11_acc_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst reading a small firm\'s first real profit statement', intro: 'Everyone asks \'did we make money?\' — accounting answers in two stages.', goal: 'Prepare trading and profit & loss accounts and correctly classify direct and indirect incomes and expenses.' },
    discovery: {
        question: 'A business earned ₹3,00,000 but its owner insists \'there\'s nothing to show\'. Looking only at the trading account vs the profit and loss account — where would the truth first appear?',
        options: ['Gross profit in the trading account, before overheads eat it down to net profit', 'Only in the bank balance', 'In the capital account, since profit always lands there first', 'Nowhere — profit is invisible until the balance sheet is drawn'],
        answer: 'Gross profit in the trading account, before overheads eat it down to net profit',
        hook: 'Profit arrives in layers — gross profit shows the core trade worked even when net profit disappoints.',
    },
    teaching: [
        { title: 'Balance Sheet: Assets Classification - Fixed and Current', text: 'In a balance sheet, assets are resources controlled by an enterprise from past events from which future economic benefits are expected to flow.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prepare a trading account and profit & loss account from raw balances, separating direct from indirect expenses.',
        labels: ['Balance Sheet: Assets Classification', 'Balance Sheet: Liabilities Classification', 'Closing Stock: Valuation', 'Adjustments in Final Accounts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_007', title: 'Balance Sheet: Assets Classification - Fixed and Current',
          caseStudy: { intro: 'Imagine you\'re helping your uncle prepare the balance sheet for his furniture shop.',
            decisions: [{ prompt: 'State the two criteria used to classify an asset as current under the operating cycle concept, and give one example of an asset that meets.', options: [
                { text: 'An asset is current if (1) it is expected to be realised/consumed in the normal operating', outcome: 'An asset is current if (1) it is expected to be realised/consumed in the normal operating cycle,.' },
                { text: 'fixed assets are only tangible things like buildings and machines', outcome: 'Not quite — Students believe "fixed assets are only tangible things like buildings and machines" and "current.', reveals: 'fixed-assets-are-only-tangible' },
                { text: 'current assets are only cash and stock', outcome: 'Not quite — Students believe "fixed assets are only tangible things like buildings and machines" and "current.', reveals: 'fixed-assets-are-only-tangible' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_008', title: 'Balance Sheet: Liabilities Classification - Fixed and Current',
          caseStudy: { intro: 'Imagine you are a bank manager reviewing a loan application from a small business.',
            decisions: [{ prompt: 'Define Current Liabilities and give two examples from a trading business.', options: [
                { text: '**Correct Answer:** Current Liabilities are obligations expected to be settled within 12', outcome: '**Correct Answer:** Current Liabilities are obligations expected to be settled within 12 months.' },
                { text: 'liabilities payable within a year', outcome: 'Not quite — **Misconception:** "Any loan from a bank is a Non-Current (Long-term) Liability." **Why students.', reveals: 'misconception-any-loan-from-a' },
                { text: 'Long-term Loan', outcome: 'Not quite — **Misconception:** "Any loan from a bank is a Non-Current (Long-term) Liability." **Why students.', reveals: 'misconception-any-loan-from-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_009', title: 'Closing Stock: Valuation and Treatment in Final Accounts',
          scaffold: { problem: 'M/s Sharma Traders provides the following balances for the year ended 31st March 2026: Opening Stock ₹80,000; Purchases ₹4,20,000; Purchase.',
            steps: [
            { text: 'Calculate Net Purchases = Purchases – Purchase Returns = ₹4,20,000 – ₹20,000 = ₹4,00,000.' },
            { text: 'Calculate Net Sales = Sales – Sales Returns = ₹6,50,000 – ₹30,000 = ₹6,20,000.' },
            { text: 'Identify Direct Expenses = Wages + Carriage Inwards = ₹50,000 + ₹15,000 = ₹65,000.' },
            { text: 'Compute Cost of Goods Sold = Opening Stock + Net Purchases + Direct Expenses – Closing Stock = ₹80,000 + ₹4,00,000.' },
            { text: 'Compute Gross Profit = Net Sales – COGS = ₹6,20,000 – ₹4,50,000 = ₹1,70,000.' },
            { text: 'Draft Trading Account with Opening Stock, Net Purchases, Direct Expenses on debit side; Net Sales, Closing Stock.', faded: true, blankAnswer: 'Gross Profit ₹1,70,000. Trading Account totals ₹7,15,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_010', title: 'Adjustments in Final Accounts: Outstanding and Prepaid Expenses',
          scaffold: { problem: 'M/s Gupta Traders\' trial balance on March 31, 2026 shows: Salaries ₹1,20,000 (Dr.), Rent ₹72,000 (Dr.).',
            steps: [
            { text: 'Identify adjustments: Outstanding Salaries ₹10,000 (expense incurred, not paid → add to expense, create liability).' },
            { text: 'Pass journal entries: (i) Salaries A/c Dr. 10,000 To Outstanding Salaries A/c 10,000. (ii) Prepaid Rent A/c Dr.' },
            { text: 'Prepare ledger accounts. Salaries A/c: Dr. side - Balance b/d 1,20,000; Cr.' },
            { text: 'Profit and Loss Account (extract): Dr. side - Salaries 1,30,000, Rent 60,000.' },
            { text: 'Balance Sheet (extract): Current Liabilities - Outstanding Salaries ₹10,000. Current Assets - Prepaid Rent ₹12,000.', faded: true, blankAnswer: 'Adjusted Salaries Expense = ₹1,30,000; Adjusted Rent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_012', title: 'Adjustments in Final Accounts: Depreciation and Bad Debts',
          scaffold: { problem: 'From the following Trial Balance of M/s Sharma Traders as on 31st March 2024, prepare the Profit & Loss Account and Balance Sheet after.',
            steps: [
            { text: 'Calculate depreciation on Plant & Machinery (SLM): 15% of ₹4,00,000 = ₹60,000.' },
            { text: 'Calculate depreciation on Furniture (WDV): 10% of ₹1,20,000 = ₹12,000.' },
            { text: 'Total Depreciation for P&L = ₹60,000 + ₹12,000 = ₹72,000 (debited to P&L).' },
            { text: 'Bad Debts treatment: Existing ₹3,000 (in TB) + Further ₹2,000 (adjustment) = ₹5,000 total debited to P&L.' },
            { text: 'Provision for Doubtful Debts: 5% on ₹78,000 = ₹3,900. This is an *additional* charge to P&L (not asked in this node but.' },
            { text: 'Balance Sheet: Plant & Machinery shown at ₹4,00,000 - ₹60,000 = ₹3,40,000.', faded: true, blankAnswer: 'P&L Charge: Depreciation ₹72,000; Bad Debts ₹5,000. Balance.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re helping your aunt finalise her bakery\'s accounts for the bank loan application. In the expense pile: a new deck oven ₹4.5 lakh, a major ₹1.2 lakh overhaul that added five years to the old mixer, routine servicing ₹18,000, and ₹1.8 lakh advance rent for the next three years. The clerk put everything except the oven under \'expenses\' because \'repairs and rent are never assets.\'',
            decisions: [{ prompt: 'Which items are wrongly classified?', options: [
                { text: 'The mixer overhaul is capital expenditure — it extends earning capacity beyond one period — and the advance rent is a prepaid asset, not this year\'s expense. Only the ₹18,000 servicing is pure revenue expenditure; the oven is capital.', outcome: 'The test is the period over which the benefit flows and whether earning capacity is increased or merely maintained — not the label \'repair\' or the size of the payment.' },
                { text: 'The clerk is right — repairs maintain an asset and rent is a classic expense, so both stay in the P&L.', outcome: 'A life-extending overhaul increases earning capacity (capital), and three-year advance rent benefits future periods (prepaid asset); labels mislead, benefits decide.', reveals: 'repairs-always-revenue' },
                { text: 'Everything above ₹1 lakh is capital expenditure — the amounts decide.', outcome: 'Size is irrelevant; a huge payment that benefits only this period is revenue expenditure, and a small upgrade can be capital.', reveals: 'big-amount-means-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_012', title: 'You made it',
          caseStudy: { intro: 'Financial statements turn a year\'s chaos into two questions: did the trade itself pay, and did the whole business?',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_007', difficulty: 'standard',
          question: 'In a balance sheet, assets are resources controlled by an enterprise from past.',
          hint: 'Review the definition of asset and the accounting equation from Chapter 1 (Financial.',
          misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash.',
          parts: [
                { id: 'a', prompt: 'A business has an operating cycle of 18 months. It holds raw materials that will be used in production in 14 months.', answer: 'Current asset',
                  options: ['Current asset', 'fixed assets are only tangible things like buildings and machines', 'current assets are only cash and stock'],
                  hint: 'Review the definition of asset and the accounting equation from Chapter 1 (Financial Accounting.',
                  misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash and stock".' },
                { id: 'b', prompt: 'Classify the following into Fixed (Tangible), Fixed (Intangible), or Current with one-line justification: (a) Goodwill purchased for ₹2,00,000, (b) Loose tools.', answer: 'Goodwill purchased for ₹2,00,000, (',
                  options: ['Goodwill purchased for ₹2,00,000, (', 'fixed assets are only tangible things like buildings and machines', 'current assets are only cash and stock'],
                  hint: 'Review the definition of asset and the accounting equation from Chapter 1 (Financial Accounting.',
                  misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash and stock".' }
          ],
            remediations: { 'fixed-assets-are-only-tangible': { steps: ['Revisit the definition of asset from c11_acc_cbse_08_001: future economic benefit, control, past event.', 'Draw a 2x2 matrix: Tangible/Intangible vs Fixed/Current.', 'Practice the operating cycle test: "Will this be sold/consumed in one operating cycle?" 4.', 'Use the NCERT list (cash, bank, debtors, stock, prepaid, investments, fixed assets, intangible) as a checklist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All intangible assets are fixed assets, but not all fixed assets are intangible." Is it correct?', answer: 'Correct',
                  options: ['Correct', 'current assets are only cash and stock'],
                  hint: 'Review the definition of asset and the accounting equation from Chapter 1 (Financial Accounting.',
                  misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash and stock".' },
                { id: 'b', prompt: 'Create a scenario where a single item (e.g., a vehicle) could be classified as fixed asset in one business but current asset in another.', answer: 'Scenario: A car dealership holds a vehicle for sale (inventory → current asset)',
                  options: ['Scenario: A car dealership holds a vehicle for sale (inventory → current asset)', 'fixed assets are only tangible things like buildings and machines', 'current assets are only cash and stock'],
                  hint: 'Review the definition of asset and the accounting equation from Chapter 1 (Financial Accounting.',
                  misconception: 'Students believe "fixed assets are only tangible things like buildings and machines" and "current assets are only cash and stock".' }
          ],
            remediations: { 'fixed-assets-are-only-tangible': { steps: ['Revisit the definition of asset from c11_acc_cbse_08_001: future economic benefit, control, past event.', 'Draw a 2x2 matrix: Tangible/Intangible vs Fixed/Current.', 'Practice the operating cycle test: "Will this be sold/consumed in one operating cycle?" 4.', 'Use the NCERT list (cash, bank, debtors, stock, prepaid, investments, fixed assets, intangible) as a checklist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_008', difficulty: 'standard',
          question: 'In a Balance Sheet, liabilities are classified as **Current Liabilities**.',
          hint: 'Review the "Analysis of Trial Balance" in NCERT Example 1 (page 282-283) where each.',
          misconception: '**Misconception:** "Any loan from a bank is a Non-Current (Long-term) Liability." **Why students make this error:**.',
          parts: [
                { id: 'a', prompt: 'A business has an operating cycle of 15 months. On the Balance Sheet date, it has a loan installment of ₹50,000 due in 14 months.', answer: '**Correct Answer:** Current Liability',
                  options: ['**Correct Answer:** Current Liability', 'Bank Loan ₹1,00,000', '₹20,000 repayable within a year'],
                  hint: 'Review the "Analysis of Trial Balance" in NCERT Example 1 (page 282-283) where each account.',
                  misconception: '**Misconception:** "Any loan from a bank is a Non-Current (Long-term) Liability." **Why students make this error:** Students associate.' },
                { id: 'b', prompt: 'Classify the following into Current and Non-Current Liabilities for a Balance Sheet as at 31st March 2026 (operating cycle = 12 months): 1.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Bank Loan ₹1,00,000', '₹20,000 repayable within a year'],
                  hint: 'Review the "Analysis of Trial Balance" in NCERT Example 1 (page 282-283) where each account.',
                  misconception: '**Misconception:** "Any loan from a bank is a Non-Current (Long-term) Liability." **Why students make this error:** Students associate.' }
          ],
            remediations: { 'misconception-any-loan-from-a': { steps: ['**Visual Timeline:** Draw a horizontal timeline with the Balance Sheet date in the middle.', 'Mark "12 months forward" and "Operating Cycle forward".', 'Place each liability on the timeline based on its due date.', '**Split the Loan:** Take the "Bank Loan" example.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_009', difficulty: 'standard',
          question: 'Closing stock represents the value of unsold goods remaining with the business.',
          hint: 'Revisit the Trading Account format (c11_acc_cbse_08_002) and the classification.',
          misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead.',
          parts: [
                { id: 'a', prompt: 'What is the correct journal entry to bring closing stock into the books of accounts at the end of the accounting period?', answer: 'Closing Stock A/c Dr',
                  options: ['Closing Stock A/c Dr', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Revisit the Trading Account format (c11_acc_cbse_08_002) and the classification of expenses into.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' },
                { id: 'b', prompt: 'Explain why closing stock is credited to the Trading Account and not debited, even though it represents goods (an asset) that the business owns.', answer: 'Closing stock is credited to the Trading Account',
                  options: ['Closing stock is credited to the Trading Account', 'it\'s an asset so debit', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Revisit the Trading Account format (c11_acc_cbse_08_002) and the classification of expenses into.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' },
                { id: 'c', prompt: 'Compare the effect on Gross Profit if closing stock is overvalued by ₹10,000 versus undervalued by ₹10,000.', answer: 'Overvaluation increases Gross Profit by ₹10,000 (since COGS is understated)',
                  options: ['Overvaluation increases Gross Profit by ₹10,000 (since COGS is understated)', 'both are equally bad', 'undervaluation is worse', 'lower of cost or NRV'],
                  hint: 'Revisit the Trading Account format (c11_acc_cbse_08_002) and the classification of expenses into.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' }
          ],
            remediations: { 'students-often-treat-closing-stock': { steps: ['If a student makes the above error: (1) Ask them to write the formula for Cost of Goods Sold and identify where closing.', '(2) Have them prepare a mini Trading Account with only Opening Stock, Purchases, and Closing Stock – no sales – to see.', '(3) Use the "shopkeeper" analogy: "You bought 100 pens, sold 70.', 'The 30 pens on the shelf are not an expense; they are an asset.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_010', difficulty: 'standard',
          question: 'Outstanding expenses are expenses incurred during the current accounting period.',
          hint: 'Revisit "Closing Entries" (node c11_acc_cbse_08_004) and "Balance Sheet: Liabilities.',
          misconception: 'Students treat outstanding expenses as "expenses not yet incurred" and therefore deduct them from the expense in P&L.',
          parts: [
                { id: 'a', prompt: 'State the journal entry for outstanding salaries of ₹8,500 at the end of the accounting year.', answer: '**Correct Answer:** Salaries A/c Dr',
                  options: ['**Correct Answer:** Salaries A/c Dr', 'outstanding', 'Outstanding wages ₹5,000 - so wages expense = ₹50,000 - ₹5,000 = ₹45,000', '"outstanding" means reducing the expense'],
                  hint: 'Revisit "Closing Entries" (node c11_acc_cbse_08_004) and "Balance Sheet: Liabilities.',
                  misconception: 'Students treat outstanding expenses as "expenses not yet incurred" and therefore deduct them from the expense in P&L (like prepaid),.' },
                { id: 'b', prompt: 'A trial balance shows "Rent Paid ₹48,000" for the year ended March 31, 2026.', answer: '**Correct Answer:** The ₹48,000 paid covers only 10 months (April-January)',
                  options: ['**Correct Answer:** The ₹48,000 paid covers only 10 months (April-January)', 'Outstanding wages ₹5,000 - so wages expense = ₹50,000 - ₹5,000 = ₹45,000'],
                  hint: 'Revisit "Closing Entries" (node c11_acc_cbse_08_004) and "Balance Sheet: Liabilities.',
                  misconception: 'Students treat outstanding expenses as "expenses not yet incurred" and therefore deduct them from the expense in P&L (like prepaid),.' }
          ],
            remediations: { 'students-treat-outstanding-expenses-as': { steps: ['Draw a timeline on paper. Mark the accounting year (Apr 1 - Mar 31).', 'Use the "3-Box Method" for each adjustment: Box 1 (P&L Effect): Does this period consume the benefit?', 'Practice 3 problems using only this visual method before returning to abstract rules.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_011', difficulty: 'standard',
          question: 'Accrued Income refers to income that has been earned during the current.',
          hint: 'If stuck, revisit the adjustment entries for Outstanding Expenses and Prepaid Expenses.',
          misconception: 'Students often confuse **Accrued Income** with **Unearned Income** because both involve a timing difference between.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Accrued Income refers to income that has been earned during the current accounting period',
                  options: ['Accrued Income refers to income that has been earned during the current accounting period', 'Financial statements are formal, structured reports prepared at the end of an accounting', 'A Trading Account is a nominal account prepared to determine the gross profit or gross', 'The Trading Account is a nominal account prepared to ascertain the gross profit or gross'],
                  hint: 'If stuck, revisit the adjustment entries for Outstanding Expenses and Prepaid Expenses in node.',
                  misconception: 'Students often confuse **Accrued Income** with **Unearned Income** because both involve a timing difference between cash flow and income.' }
          ],
            remediations: { 'students-often-confuse-accrued-income': { steps: ['Ask the student to state the *economic reality* in plain language: "Did we do the work?', 'Use the "Who owes whom?" test: Accrued income → Client owes us (Asset).', 'Practice 5 quick-fire items (e.g., "Interest accrued ₹5,000", "Subscription received in advance ₹12,000") where the.', 'Reinforce with the golden rule: **Accrued = Add to Income + Asset; Unearned = Deduct from Income + Liability.**'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_012', difficulty: 'standard',
          question: 'Depreciation is the systematic allocation of the depreciable amount of.',
          hint: 'Revisit c11_acc_cbse_08_010 (Outstanding and Prepaid) — practise the 4-step adjustment.',
          misconception: 'Students treat depreciation and bad debts as *cash expenses* and expect them to appear in the Cash Book or Bank column.',
          parts: [
                { id: 'a', prompt: 'Compare the effect on Net Profit and Balance Sheet total when: (a) Depreciation ₹15,000 is provided as adjustment, vs (b) Bad debts ₹15,000 are written off.', answer: 'Yes, effects are identical on *both* Net Profit and Balance Sheet total',
                  options: ['Yes, effects are identical on *both* Net Profit and Balance Sheet total', 'different because one is fixed asset, other current asset'],
                  hint: 'Revisit c11_acc_cbse_08_010 (Outstanding and Prepaid) — practise the 4-step adjustment pattern.',
                  misconception: 'Students treat depreciation and bad debts as *cash expenses* and expect them to appear in the Cash Book or Bank column.' }
          ],
            remediations: { 'students-treat-depreciation-and-bad': { steps: ['Ask the student to show the *original purchase entry* for the asset (e.g., Machinery A/c Dr. To Bank A/c).', 'Ask: "When you bought it, you credited Bank. Now, for depreciation, are you paying cash again?"', 'Show that depreciation credits the *same Machinery A/c* to reduce its book value — it\'s a book entry, not cash.', 'For bad debts, show the original sale entry (Debtor Dr. To Sales).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
