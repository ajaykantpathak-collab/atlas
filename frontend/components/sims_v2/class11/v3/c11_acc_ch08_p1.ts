import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch08_p1: SimDef = {
    id: 'v3_c11_acc_ch08_p1',
    title: 'Financial Statements - I · Part 1/2',
    subtitle: 'Construct the trading and P&L account and interpret gross vs net profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements - I · Part 1/2',
    chapters: ['c11_acc_ch08'],
    nodeIds: ['c11_acc_cbse_08_001', 'c11_acc_cbse_08_002', 'c11_acc_cbse_08_003', 'c11_acc_cbse_08_004', 'c11_acc_cbse_08_005', 'c11_acc_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst reading a small firm\'s first real profit statement', intro: 'Everyone asks \'did we make money?\' — accounting answers in two stages.', goal: 'Prepare trading and profit & loss accounts and correctly classify direct and indirect incomes and expenses.' },
    discovery: {
        question: 'A business earned ₹3,00,000 but its owner insists \'there\'s nothing to show\'. Looking only at the trading account vs the profit and loss account — where would the truth first appear?',
        options: ['Gross profit in the trading account, before overheads eat it down to net profit', 'Only in the bank balance', 'In the capital account, since profit always lands there first', 'Nowhere — profit is invisible until the balance sheet is drawn'],
        answer: 'Gross profit in the trading account, before overheads eat it down to net profit',
        hook: 'Profit arrives in layers — gross profit shows the core trade worked even when net profit disappoints.',
    },
    teaching: [
        { title: 'Financial Statements: Meaning and Objectives', text: 'Financial statements are formal, structured reports prepared at the end of an accounting period that communicate the financial performance (profit/loss) and financial position.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prepare a trading account and profit & loss account from raw balances, separating direct from indirect expenses.',
        labels: ['Financial Statements: Meaning', 'Trading Account: Meaning', 'Trading Account: Calculation', 'Profit and Loss Account', 'Balance Sheet: Meaning'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_001', title: 'Financial Statements: Meaning and Objectives',
          caseStudy: { intro: 'Imagine you run a small bakery in Delhi. At year-end, your father asks "Did we make money?" your bank manager asks "Can you repay the loan?" and the tax.',
            decisions: [{ prompt: 'Define "financial statements" as per the Companies Act/NCERT framework and name the two primary statements prepared by a sole.', options: [
                { text: 'Financial statements are the end products of the accounting process that present a true', outcome: 'Financial statements are the end products of the accounting process that present a true and fair.' },
                { text: 'Capital Expenditure = Purchase of Fixed Assets only', outcome: 'Not quite — Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure.', reveals: 'capital-expenditure-purchase-of-fixed' },
                { text: 'Revenue Expenditure = All other expenses', outcome: 'Not quite — Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure.', reveals: 'capital-expenditure-purchase-of-fixed' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_002', title: 'Trading Account: Meaning and Preparation',
          scaffold: { problem: 'M/s Gupta Traders provides the following for the year ended 31st March 2026: Opening Stock ₹75,000; Purchases ₹4,20,000; Purchase Returns.',
            steps: [
            { text: 'Identify all items belonging to Trading Account — separate direct expenses (Wages, Carriage Inwards, Factory Rent) from.' },
            { text: 'Compute Net Purchases = Total Purchases ₹4,20,000 - Purchase Returns ₹15,000 = ₹4,05,000.' },
            { text: 'Compute Net Sales = Total Sales ₹7,50,000 - Sales Returns ₹30,000 = ₹7,20,000.' },
            { text: 'Compute Total Direct Expenses = Wages ₹60,000 + Carriage Inwards ₹12,000 + Factory Rent ₹24,000 = ₹96,000.' },
            { text: 'Compute Cost of Goods Sold = Opening Stock ₹75,000 + Net Purchases ₹4,05,000 + Direct Expenses ₹96,000 - Closing Stock.' },
            { text: 'Compute Gross Profit = Net Sales ₹7,20,000 - COGS ₹4,86,000 = ₹2,34,000.' },
            { text: 'Draft Trading Account with proper format: Dr side — Opening Stock, Purchases (less returns), Direct Expenses; Cr side.', faded: true, blankAnswer: 'Gross Profit = ₹2,34,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_003', title: 'Trading Account: Calculation of Gross Profit',
          scaffold: { problem: 'M/s Sharma Traders provides the following balances for the year ended 31st March 2026. Prepare the Trading Account and compute Gross Profit.',
            steps: [
            { text: 'Identify and net purchases and sales. Net Purchases = Purchases – Purchase Returns = ₹4,50,000 – ₹15,000 = ₹4,35,000.' },
            { text: 'Classify expenses. Direct expenses (factory-related): Wages ₹60,000, Carriage Inwards ₹18,000, Factory Rent ₹42,000.' },
            { text: 'Compute Cost of Goods Sold. COGS = Opening Stock + Net Purchases + Direct Expenses – Closing Stock = ₹80,000.' },
            { text: 'Compute Gross Profit. Gross Profit = Net Sales – COGS = ₹6,95,000 – ₹5,40,000 = ₹1,55,000.' },
            { text: 'Draft Trading Account. Dr. side: Opening Stock ₹80,000, Purchases ₹4,35,000, Wages ₹60,000, Carriage Inwards ₹18,000.', faded: true, blankAnswer: 'Gross Profit = ₹1,55,000. Trading Account totals.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_004', title: 'Profit and Loss Account: Meaning and Preparation',
          scaffold: { problem: 'From the following Trial Balance of M/s Gupta Traders as on 31st March 2026, prepare the Profit and Loss Account for the year ended 31st.',
            steps: [
            { text: 'Identify Gross Profit (₹ 1,20,000) as the starting credit balance brought down from Trading Account.' },
            { text: 'List all debit-balance accounts from Trial Balance (except those already used in Trading Account) — these are indirect.' },
            { text: 'List all credit-balance income accounts (except Sales) — these are other incomes: Commission Received, Discount.' },
            { text: 'Total the debit side (Indirect Expenses): 45,000 + 30,000 + 8,000 + 5,000 + 12,000 + 18,000 + 6,000 + 7,000 = ₹.' },
            { text: 'Total the credit side: Gross Profit 1,20,000 + Commission Received 15,000 + Discount Received 4,000 = ₹ 1,39,000.' },
            { text: 'Compute Net Profit = Credit Total – Debit Total = 1,39,000 – 1,31,000 = ₹ 8,000 (transferred to Capital Account).', faded: true, blankAnswer: 'Net Profit ₹ 8,000 (transferred to Capital Account).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_005', title: 'Profit and Loss Account: Calculation of Net Profit',
          scaffold: { problem: 'M/s Gupta Traders provides the following for the year ended 31st March 2026: Gross Profit ₹2,50,000; Salaries ₹45,000; Rent ₹30,000.',
            steps: [
            { text: 'Identify all indirect expenses (debit side): Salaries ₹45,000 + Rent ₹30,000 + Electricity ₹12,000 + Interest on Bank.' },
            { text: 'Identify all incomes/gains (credit side): Gross Profit ₹2,50,000 + Commission Received ₹8,000 + Discount Received.' },
            { text: 'Compute Net Profit = Total Credit – Total Debit = ₹2,59,500 – ₹97,000 = ₹1,62,500.' },
            { text: 'Verify by constructing the T-account: Debit side total ₹97,000 + Net Profit ₹1,62,500 = ₹2,59,500; Credit side total.' },
            { text: 'Record the closing entry for transfer of Net Profit: Profit & Loss A/c Dr. ₹1,62,500 To Capital A/c ₹1,62,500.', faded: true, blankAnswer: 'Net Profit = ₹1,62,500' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_006', title: 'Balance Sheet: Meaning and Objectives',
          caseStudy: { intro: 'Imagine you\'re the owner of a small kirana store in Delhi. It\'s March 31st, year-end.',
            decisions: [{ prompt: 'State whether the following is True or False and justify in one sentence: "A Balance Sheet shows the financial performance of a business.', options: [
                { text: '**False.** A Balance Sheet shows the *financial position* (assets, liabilities, capital)', outcome: '**False.** A Balance Sheet shows the *financial position* (assets, liabilities, capital) at.' },
                { text: 'position', outcome: 'Not quite — **Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance.', reveals: 'misconception-closing-stock-appears-in' },
                { text: 'performance', outcome: 'Not quite — **Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance.', reveals: 'misconception-closing-stock-appears-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re helping your aunt finalise her bakery\'s accounts for the bank loan application. In the expense pile: a new deck oven ₹4.5 lakh, a major ₹1.2 lakh overhaul that added five years to the old mixer, routine servicing ₹18,000, and ₹1.8 lakh advance rent for the next three years. The clerk put everything except the oven under \'expenses\' because \'repairs and rent are never assets.\'',
            decisions: [{ prompt: 'Which items are wrongly classified?', options: [
                { text: 'The mixer overhaul is capital expenditure — it extends earning capacity beyond one period — and the advance rent is a prepaid asset, not this year\'s expense. Only the ₹18,000 servicing is pure revenue expenditure; the oven is capital.', outcome: 'The test is the period over which the benefit flows and whether earning capacity is increased or merely maintained — not the label \'repair\' or the size of the payment.' },
                { text: 'The clerk is right — repairs maintain an asset and rent is a classic expense, so both stay in the P&L.', outcome: 'A life-extending overhaul increases earning capacity (capital), and three-year advance rent benefits future periods (prepaid asset); labels mislead, benefits decide.', reveals: 'repairs-always-revenue' },
                { text: 'Everything above ₹1 lakh is capital expenditure — the amounts decide.', outcome: 'Size is irrelevant; a huge payment that benefits only this period is revenue expenditure, and a small upgrade can be capital.', reveals: 'big-amount-means-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Financial statements turn a year\'s chaos into two questions: did the trade itself pay, and did the whole business?',
            decisions: [{ prompt: 'What comes next? Financial Statements - I · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Statements - I · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'standard',
          question: 'Financial statements are formal, structured reports prepared at the end of.',
          hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: 'A student says: "Capital expenditure is any large amount spent; revenue expenditure is any small amount spent." Using the NCERT criteria (benefit period.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal, Real.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: '"Operating Profit (EBIT) is a better measure of core business performance than Net Profit because it excludes financial and abnormal items." Critically.', answer: 'a bank assessing loan repayment capacity, (',
                  options: ['a bank assessing loan repayment capacity, (', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal, Real.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' },
                { id: 'b', prompt: 'Design a 10-item "Capital vs Revenue Classification Challenge" for your classmates. Include 5 expenditure items and 5 receipt items.', answer: 'A good answer lists 10 realistic items with correct classifications and precise',
                  options: ['A good answer lists 10 realistic items with correct classifications and precise', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal, Real.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_002', difficulty: 'standard',
          question: 'A Trading Account is a nominal account prepared to determine the gross profit.',
          hint: 'Revisit Class 8 Maths Ch8 (Profit/Loss basics) and the "Direct vs Indirect Expense".',
          misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory.',
          parts: [
                { id: 'a', prompt: 'A student records "Carriage Outwards" (delivery charges to customers) on the debit side of the Trading Account. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'expenses on goods', 'expenses to *acquire* goods', 'carriage'],
                  hint: 'Revisit Class 8 Maths Ch8 (Profit/Loss basics) and the "Direct vs Indirect Expense" classification.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' },
                { id: 'b', prompt: 'Compare two businesses: Business A has Gross Profit ₹2,00,000 on Sales ₹10,00,000 (GP ratio 20%).', answer: 'Business B has better trading efficiency (25% > 20%)',
                  options: ['Business B has better trading efficiency (25% > 20%)', '₹2,00,000 > ₹1,50,000'],
                  hint: 'Revisit Class 8 Maths Ch8 (Profit/Loss basics) and the "Direct vs Indirect Expense" classification.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' }
          ],
            remediations: { 'students-treat-all-factory-related': { steps: ['Draw a timeline: **Purchase → Transport Inwards → Factory Gate → Production → Saleable Condition → Warehouse →.', 'Ask: "At which point does the expense occur?" If *before* "Saleable Condition" → Direct (Trading A/c).', 'If *after* → Indirect (P&L A/c).', 'Practice classifying 10 expenses using this timeline (e.g., factory rent = before saleable → direct; factory manager.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_003', difficulty: 'standard',
          question: 'The Trading Account is a nominal account prepared to ascertain the gross profit.',
          hint: 'Revisit c11_acc_cbse_08_001 (capital/revenue distinction) and c11_acc_cbse_08_002.',
          misconception: 'Students treat "Wages and Salaries" as a single item and put the entire amount in Trading Account.',
          parts: [
                { id: 'a', prompt: 'A student records "Carriage Outwards ₹5,000" on the debit side of the Trading Account. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'sending goods out'],
                  hint: 'Revisit c11_acc_cbse_08_001 (capital/revenue distinction) and c11_acc_cbse_08_002 (Trading Account.',
                  misconception: 'Students treat "Wages and Salaries" as a single item and put the entire amount in Trading Account.' }
          ],
            remediations: { 'students-treat-wages-and-salaries': { steps: ['If a student lumps all wages/salaries into Trading Account: (1) Ask them to read the NCERT text: "Wages refer.', 'Salaries include salaries paid to the administration, godown and warehouse staff...', 'debited to profit and loss account." (2) Give a mini-case: "A firm pays ₹50,000 to factory workers and ₹30,000.', 'Show the split." (3) Drill: Provide 5 mixed items (factory wages, office salary, carriage inwards, carriage outwards.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_004', difficulty: 'standard',
          question: 'The Profit and Loss Account is a nominal account prepared to ascertain the net.',
          hint: 'Revisit the "Direct vs Indirect Expenses" classification table in c11_acc_cbse_08_003 and.',
          misconception: 'Students often treat **all expenses from the Trial Balance** as indirect expenses and dump them into the Profit and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Profit and Loss Account is a nominal account prepared to ascertain the net profit',
                  options: ['The Profit and Loss Account is a nominal account prepared to ascertain the net profit', 'Financial statements are formal, structured reports prepared at the end of an accounting', 'A Trading Account is a nominal account prepared to determine the gross profit or gross', 'The Trading Account is a nominal account prepared to ascertain the gross profit or gross'],
                  hint: 'Revisit the "Direct vs Indirect Expenses" classification table in c11_acc_cbse_08_003 and practice.',
                  misconception: 'Students often treat **all expenses from the Trial Balance** as indirect expenses and dump them into the Profit and Loss Account.' }
          ],
            remediations: { 'students-often-treat-all-expenses': { steps: ['Give the student a mixed list of 15 expenses (e.g., Wages, Office Rent, Factory Rent, Carriage Inwards, Carriage.', 'Ask them to sort each into "Trading Account (Direct)" or "P&L Account (Indirect)" using the rule: *Does this expense.', 'For each wrong placement, ask: "If we stopped this expense, would goods still reach the customer in saleable form?".', 'Have them re-do one full P&L preparation from a Trial Balance, highlighting every account\'s destination before writing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_005', difficulty: 'standard',
          question: 'Net Profit is the excess of total revenues (including gross profit and other.',
          hint: 'Revisit node c11_acc_cbse_08_003 (Trading Account: Calculation of Gross Profit) and.',
          misconception: 'Students often treat **all** expenses in the Trial Balance as indirect expenses for the P&L Account, forgetting that.',
          parts: [
                { id: 'a', prompt: 'What is the correct formula for calculating Net Profit in a Profit and Loss Account?', answer: 'Net Profit = Gross Profit + Other Incomes – Indirect Expenses',
                  options: ['Net Profit = Gross Profit + Other Incomes – Indirect Expenses', 'Net Profit = Sales – Purchases – All Expenses'],
                  hint: 'Revisit node c11_acc_cbse_08_003 (Trading Account: Calculation of Gross Profit) and practice.',
                  misconception: 'Students often treat **all** expenses in the Trial Balance as indirect expenses for the P&L Account, forgetting that direct expenses.' }
          ],
            remediations: { 'students-often-treat-all-expenses': { steps: ['Have the student redo the Trading Account (node c11_acc_cbse_08_003) for a simple case, explicitly listing direct.', 'Give a Trial Balance with 5 expenses: 2 direct, 3 indirect.', 'Ask them to highlight direct expenses in one color, indirect in another.', 'Prepare both accounts side-by-side, showing the "Gross Profit c/d" from Trading becoming "Gross Profit b/d" in P&L.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_006', difficulty: 'standard',
          question: 'A Balance Sheet is a positional statement prepared at a specific date.',
          hint: 'Revisit the "Closing Entries" section in node c11_acc_cbse_08_004/c11_acc_cbse_08_005.',
          misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture.',
          parts: [
                { id: 'a', prompt: 'A student prepares a Balance Sheet and writes "Sales ₹5,00,000" on the credit side under "Revenues." Another student says Sales should not appear in the.', answer: 'The second student is correct',
                  options: ['The second student is correct', 'Stock ₹30,000'],
                  hint: 'Revisit the "Closing Entries" section in node c11_acc_cbse_08_004/c11_acc_cbse_08_005.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' },
                { id: 'b', prompt: 'Two students marshall the same Balance Sheet differently. Student A uses Order of Permanence: Land → Building → Machinery → Furniture → Debtors → Cash.', answer: 'Both orders are acceptable',
                  options: ['Both orders are acceptable', 'one correct format', 'Stock ₹30,000'],
                  hint: 'Revisit the "Closing Entries" section in node c11_acc_cbse_08_004/c11_acc_cbse_08_005.',
                  misconception: '**Misconception:** "Closing Stock appears in the Trial Balance, so I just copy it to the Balance Sheet like Furniture or Debtors." **Why.' }
          ],
            remediations: { 'misconception-closing-stock-appears-in': { steps: ['** Ask the student to locate "Closing Stock" in the Trial Balance.', '** Demonstrate the adjustment entry on a blank sheet: Dr. Closing Stock A/c (new asset) / Cr.', '** Show the flow: This entry *creates* the Closing Stock account → balance carried to Balance Sheet (Asset side) →.', '** Give a 3-item practice: Opening Stock ₹10,000, Purchases ₹50,000, Closing Stock ₹8,000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
