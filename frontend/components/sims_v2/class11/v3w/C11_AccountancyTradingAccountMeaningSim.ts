import type { SimDef } from '../../engine/types';
import C11_AccountancyTradingAccountMeaningSim from '../../../simulations/c6_12/C11_AccountancyTradingAccountMeaningSim';

/** v3 wrapped master — C11_AccountancyTradingAccountMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancytradingaccountmeaningsim: SimDef = {
    id: 'v3w_c11_accountancytradingaccountmeaningsim',
    title: 'Financial Statements: Meaning and Objectives',
    subtitle: 'This node covers the meaning, objectives, and user groups of financial statements; the.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements: Meaning and Objectives',
    chapters: [],
    nodeIds: ['c11_acc_cbse_08_001', 'c11_acc_cbse_08_002', 'c11_acc_cbse_08_004', 'c11_acc_cbse_08_006', 'c11_acc_cbse_08_003', 'c11_acc_cbse_08_009', 'c11_acc_cbse_08_010', 'c11_acc_cbse_01_001', 'c11_acc_cbse_02_002', 'c11_acc_cbse_03_009', 'c11_acc_cbse_06_001', 'c11_acc_cbse_06_008', 'c11_acc_cbse_07_001', 'c11_acc_cbse_07_009', 'c11_acc_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you run a small bakery in Delhi. At year-end, your father asks "Did we make money?" your bank manager.', goal: 'Master Financial Statements: Meaning and Objectives.' },
    discovery: {
        question: 'A student says: "Capital expenditure is any large amount spent; revenue expenditure is any small amount spent." Using the NCERT criteria (benefit period,.',
        options: ['The statement is incorrect', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
        answer: 'The statement is incorrect',
        hook: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
    },
    teaching: [
        { title: 'Financial statements are formal, structured.', text: 'Financial statements are formal, structured reports prepared at the end of an accounting period that communicate the financial performance (profit/loss) and financial position.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_001', title: 'Financial statements are formal,.',
          scaffold: { problem: 'Ramesh runs a stationery shop. During 2024-25, he incurred the following expenditures.',
            steps: [
            { text: 'Identify the nature of each outflow — does it acquire/create an asset/benefit lasting >1 year (CapEx) or consume.' },
            { text: 'Apply the four NCERT criteria: (a) Benefit period >1 year? (b) Increases earning capacity? (c) Non-recurring?' },
            { text: 'For each item, write the classification and the specific criterion met.' },
            { text: 'For borderline items (3, 6), explain why they are CapEx despite being "repairs/legal fees".' },
            { text: 'Verify that the classification aligns with the journal entry: CapEx → Asset A/c Dr.; RevEx → Expense A/c Dr.', faded: true, blankAnswer: '1-CapEx (asset, 5-yr benefit), 2-RevEx (restoration,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_002', title: 'A Trading Account is a nominal account.',
          scaffold: { problem: 'M/s Gupta Traders provides the following for the year ended 31st March 2026: Opening Stock ₹75,000; Purchases ₹4,20,000; Purchase Returns.',
            steps: [
            { text: 'Identify all items belonging to Trading Account — separate direct expenses (Wages, Carriage Inwards, Factory Rent) from.' },
            { text: 'Compute Net Purchases = Total Purchases ₹4,20,000 - Purchase Returns ₹15,000 = ₹4,05,000.' },
            { text: 'Compute Net Sales = Total Sales ₹7,50,000 - Sales Returns ₹30,000 = ₹7,20,000.' },
            { text: 'Compute Total Direct Expenses = Wages ₹60,000 + Carriage Inwards ₹12,000 + Factory Rent ₹24,000 = ₹96,000.' },
            { text: 'Compute Cost of Goods Sold = Opening Stock ₹75,000 + Net Purchases ₹4,05,000 + Direct Expenses ₹96,000 - Closing Stock.' },
            { text: 'Compute Gross Profit = Net Sales ₹7,20,000 - COGS ₹4,86,000 = ₹2,34,000.' },
            { text: 'Draft Trading Account with proper format: Dr side — Opening Stock, Purchases (less returns), Direct Expenses; Cr side —.', faded: true, blankAnswer: 'Gross Profit = ₹2,34,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_004', title: 'The Profit and Loss Account is a.',
          scaffold: { problem: 'From the following Trial Balance of M/s Gupta Traders as on 31st March 2026, prepare the Profit and Loss Account for the year ended 31st.',
            steps: [
            { text: 'Identify Gross Profit (₹ 1,20,000) as the starting credit balance brought down from Trading Account.' },
            { text: 'List all debit-balance accounts from Trial Balance (except those already used in Trading Account) — these are indirect.' },
            { text: 'List all credit-balance income accounts (except Sales) — these are other incomes: Commission Received, Discount.' },
            { text: 'Total the debit side (Indirect Expenses): 45,000 + 30,000 + 8,000 + 5,000 + 12,000 + 18,000 + 6,000 + 7,000 = ₹.' },
            { text: 'Total the credit side: Gross Profit 1,20,000 + Commission Received 15,000 + Discount Received 4,000 = ₹ 1,39,000.' },
            { text: 'Compute Net Profit = Credit Total – Debit Total = 1,39,000 – 1,31,000 = ₹ 8,000 (transferred to Capital Account).', faded: true, blankAnswer: 'Net Profit ₹ 8,000 (transferred to Capital Account).' }
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
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_003', title: 'The Trading Account is a nominal.',
          scaffold: { problem: 'M/s Sharma Traders provides the following balances for the year ended 31st March 2026. Prepare the Trading Account and compute Gross Profit.',
            steps: [
            { text: 'Identify and net purchases and sales. Net Purchases = Purchases – Purchase Returns = ₹4,50,000 – ₹15,000 = ₹4,35,000.' },
            { text: 'Classify expenses. Direct expenses (factory-related): Wages ₹60,000, Carriage Inwards ₹18,000, Factory Rent ₹42,000 =.' },
            { text: 'Compute Cost of Goods Sold. COGS = Opening Stock + Net Purchases + Direct Expenses – Closing Stock = ₹80,000 +.' },
            { text: 'Compute Gross Profit. Gross Profit = Net Sales – COGS = ₹6,95,000 – ₹5,40,000 = ₹1,55,000.' },
            { text: 'Draft Trading Account. Dr. side: Opening Stock ₹80,000, Purchases ₹4,35,000, Wages ₹60,000, Carriage Inwards ₹18,000,.', faded: true, blankAnswer: 'Gross Profit = ₹1,55,000. Trading Account totals =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_009', title: 'Closing stock represents the value of.',
          scaffold: { problem: 'M/s Sharma Traders provides the following balances for the year ended 31st March 2026: Opening Stock ₹80,000; Purchases ₹4,20,000; Purchase.',
            steps: [
            { text: 'Calculate Net Purchases = Purchases – Purchase Returns = ₹4,20,000 – ₹20,000 = ₹4,00,000.' },
            { text: 'Calculate Net Sales = Sales – Sales Returns = ₹6,50,000 – ₹30,000 = ₹6,20,000.' },
            { text: 'Identify Direct Expenses = Wages + Carriage Inwards = ₹50,000 + ₹15,000 = ₹65,000.' },
            { text: 'Compute Cost of Goods Sold = Opening Stock + Net Purchases + Direct Expenses – Closing Stock = ₹80,000 + ₹4,00,000 +.' },
            { text: 'Compute Gross Profit = Net Sales – COGS = ₹6,20,000 – ₹4,50,000 = ₹1,70,000.' },
            { text: 'Draft Trading Account with Opening Stock, Net Purchases, Direct Expenses on debit side; Net Sales, Closing Stock on.', faded: true, blankAnswer: 'Gross Profit ₹1,70,000. Trading Account totals ₹7,15,000.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Financial Statements: Meaning and Objectives', spots: [
            { id: 's1', label: 'Financial statements are formal structured', prompt: 'Which idea is this? — Financial statements are formal, structured reports prepared at the end of an accounting.', answer: 'Financial statements are formal structured', options: ['Financial statements are formal structured', 'A Trading Account is a', 'The Profit and Loss Account', 'A Balance Sheet is a'] },
            { id: 's2', label: 'A Trading Account is a', prompt: 'Which idea is this? — A Trading Account is a nominal account prepared to determine the gross profit or gross.', answer: 'A Trading Account is a', options: ['A Trading Account is a', 'Financial statements are formal structured', 'The Profit and Loss Account', 'A Balance Sheet is a'] },
            { id: 's3', label: 'The Profit and Loss Account', prompt: 'Which idea is this? — The Profit and Loss Account is a nominal account prepared to ascertain the net profit.', answer: 'The Profit and Loss Account', options: ['The Profit and Loss Account', 'Financial statements are formal structured', 'A Trading Account is a', 'A Balance Sheet is a'] },
            { id: 's4', label: 'A Balance Sheet is a', prompt: 'Which idea is this? — A Balance Sheet is a positional statement prepared at a specific date (typically the end.', answer: 'A Balance Sheet is a', options: ['A Balance Sheet is a', 'Financial statements are formal structured', 'A Trading Account is a', 'The Profit and Loss Account'] },
            { id: 's5', label: 'The Trading Account is a', prompt: 'Which idea is this? — The Trading Account is a nominal account prepared to ascertain the gross profit or gross.', answer: 'The Trading Account is a', options: ['The Trading Account is a', 'Financial statements are formal structured', 'A Trading Account is a', 'The Profit and Loss Account'] },
            { id: 's6', label: 'Closing stock represents the value', prompt: 'Which idea is this? — Closing stock represents the value of unsold goods remaining with the business at the end.', answer: 'Closing stock represents the value', options: ['Closing stock represents the value', 'Financial statements are formal structured', 'A Trading Account is a', 'The Profit and Loss Account'] }
          ] } }
    ],
    explore: { component: C11_AccountancyTradingAccountMeaningSim, prompt: 'Explore the interactive — Financial Statements: Meaning and Objectives' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'standard',
          question: 'Financial statements are formal, structured reports prepared at the end of an.',
          hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal,.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: 'A student says: "Capital expenditure is any large amount spent; revenue expenditure is any small amount spent." Using the NCERT criteria (benefit period,.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.', 'Have the student re-classify 5 more items using *only* the two criteria, forbidding "it\'s a fixed asset" or "amount is.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: '"Operating Profit (EBIT) is a better measure of core business performance than Net Profit because it excludes financial and abnormal items." Critically.', answer: 'a bank assessing loan repayment capacity, (',
                  options: ['a bank assessing loan repayment capacity, (', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' },
                { id: 'b', prompt: 'Design a 10-item "Capital vs Revenue Classification Challenge" for your classmates. Include 5 expenditure items and 5 receipt items.', answer: 'A good answer lists 10 realistic items with correct classifications and precise',
                  options: ['A good answer lists 10 realistic items with correct classifications and precise', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.', 'Have the student re-classify 5 more items using *only* the two criteria, forbidding "it\'s a fixed asset" or "amount is.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_002', difficulty: 'standard',
          question: 'A Trading Account is a nominal account prepared to determine the gross profit.',
          hint: 'Revisit Class 8 Maths Ch8 (Profit/Loss basics) and the "Direct vs Indirect Expense".',
          misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory.',
          parts: [
                { id: 'a', prompt: 'A student records "Carriage Outwards" (delivery charges to customers) on the debit side of the Trading Account. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'expenses on goods', 'expenses to *acquire* goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' },
                { id: 'b', prompt: 'Compare two businesses: Business A has Gross Profit ₹2,00,000 on Sales ₹10,00,000 (GP ratio 20%).', answer: 'Business B has better trading efficiency (25% > 20%)',
                  options: ['Business B has better trading efficiency (25% > 20%)', '₹2,00,000 > ₹1,50,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' }
          ],
            remediations: { 'students-treat-all-factory-related': { steps: ['Draw a timeline: **Purchase → Transport Inwards → Factory Gate → Production → Saleable Condition → Warehouse →.', 'Ask: "At which point does the expense occur?" If *before* "Saleable Condition" → Direct (Trading A/c).', 'If *after* → Indirect (P&L A/c).', 'Practice classifying 10 expenses using this timeline (e.g., factory rent = before saleable → direct; factory manager.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory.',
          parts: [
                { id: 'a', prompt: 'Compare two businesses: Business A has Gross Profit ₹2,00,000 on Sales ₹10,00,000 (GP ratio 20%).', answer: 'Business B has better trading efficiency (25% > 20%)',
                  options: ['Business B has better trading efficiency (25% > 20%)', '₹2,00,000 > ₹1,50,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' }
          ],
            remediations: { 'students-treat-all-factory-related': { steps: ['Draw a timeline: **Purchase → Transport Inwards → Factory Gate → Production → Saleable Condition → Warehouse →.', 'Ask: "At which point does the expense occur?" If *before* "Saleable Condition" → Direct (Trading A/c).', 'If *after* → Indirect (P&L A/c).', 'Practice classifying 10 expenses using this timeline (e.g., factory rent = before saleable → direct; factory manager.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_004', difficulty: 'standard',
          question: 'The Profit and Loss Account is a nominal account prepared to ascertain the net.',
          hint: 'Revisit the "Direct vs Indirect Expenses" classification table in c11_acc_cbse_08_003 and.',
          misconception: 'Students often treat **all expenses from the Trial Balance** as indirect expenses and dump them into the Profit and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Profit and Loss Account is a nominal account prepared to ascertain the net profit',
                  options: ['The Profit and Loss Account is a nominal account prepared to ascertain the net profit', 'Financial statements are formal, structured reports prepared at the end of an accounting', 'A Trading Account is a nominal account prepared to determine the gross profit or gross', 'A Balance Sheet is a positional statement prepared at a specific date (typically the end'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat **all expenses from the Trial Balance** as indirect expenses and dump them into the Profit and Loss Account,.' }
          ],
            remediations: { 'students-often-treat-all-expenses': { steps: ['Give the student a mixed list of 15 expenses (e.g., Wages, Office Rent, Factory Rent, Carriage Inwards, Carriage.', 'Ask them to sort each into "Trading Account (Direct)" or "P&L Account (Indirect)" using the rule: *Does this expense.', 'For each wrong placement, ask: "If we stopped this expense, would goods still reach the customer in saleable form?" If.', 'Have them re-do one full P&L preparation from a Trial Balance, highlighting every account\'s destination before writing.'] } } },
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
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_003', difficulty: 'standard',
          question: 'The Trading Account is a nominal account prepared to ascertain the gross profit.',
          hint: 'Revisit c11_acc_cbse_08_001 (capital/revenue distinction) and c11_acc_cbse_08_002.',
          misconception: 'Students treat "Wages and Salaries" as a single item and put the entire amount in Trading Account.',
          parts: [
                { id: 'a', prompt: 'A student records "Carriage Outwards ₹5,000" on the debit side of the Trading Account. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'sending goods out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Wages and Salaries" as a single item and put the entire amount in Trading Account.' }
          ],
            remediations: { 'students-treat-wages-and-salaries': { steps: ['If a student lumps all wages/salaries into Trading Account: (1) Ask them to read the NCERT text: "Wages refer to.', 'Salaries include salaries paid to the administration, godown and warehouse staff...', 'debited to profit and loss account." (2) Give a mini-case: "A firm pays ₹50,000 to factory workers and ₹30,000 to.', 'Show the split." (3) Drill: Provide 5 mixed items (factory wages, office salary, carriage inwards, carriage outwards,.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_009', difficulty: 'standard',
          question: 'Closing stock represents the value of unsold goods remaining with the business.',
          hint: 'Revisit the Trading Account format (c11_acc_cbse_08_002) and the classification of.',
          misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of.',
          parts: [
                { id: 'a', prompt: 'What is the correct journal entry to bring closing stock into the books of accounts at the end of the accounting period?', answer: 'Closing Stock A/c Dr',
                  options: ['Closing Stock A/c Dr', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' },
                { id: 'b', prompt: 'Explain why closing stock is credited to the Trading Account and not debited, even though it represents goods (an asset) that the business owns.', answer: 'Closing stock is credited to the Trading Account',
                  options: ['Closing stock is credited to the Trading Account', 'it\'s an asset so debit', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' },
                { id: 'c', prompt: 'Compare the effect on Gross Profit if closing stock is overvalued by ₹10,000 versus undervalued by ₹10,000.', answer: 'Overvaluation increases Gross Profit by ₹10,000 (since COGS is understated)',
                  options: ['Overvaluation increases Gross Profit by ₹10,000 (since COGS is understated)', 'both are equally bad', 'undervaluation is worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' }
          ],
            remediations: { 'students-often-treat-closing-stock': { steps: ['If a student makes the above error: (1) Ask them to write the formula for Cost of Goods Sold and identify where closing.', '(2) Have them prepare a mini Trading Account with only Opening Stock, Purchases, and Closing Stock – no sales – to see.', '(3) Use the "shopkeeper" analogy: "You bought 100 pens, sold 70.', 'The 30 pens on the shelf are not an expense; they are an asset.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Closing stock appears in the Trial Balance because it is an asset." Evaluate this statement and explain why closing stock usually does NOT.', answer: 'The statement is false',
                  options: ['The statement is false', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' },
                { id: 'b', prompt: 'Create a scenario where a business has no opening stock, purchases of ₹5,00,000, direct expenses of ₹50,000, and sales of ₹7,00,000.', answer: 'Trading Account: Dr',
                  options: ['Trading Account: Dr', 'stock is goods, goods are purchased, purchases are debited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat closing stock as a revenue receipt or income and credit it to the Profit & Loss Account instead of the Trading.' }
          ],
            remediations: { 'students-often-treat-closing-stock': { steps: ['If a student makes the above error: (1) Ask them to write the formula for Cost of Goods Sold and identify where closing.', '(2) Have them prepare a mini Trading Account with only Opening Stock, Purchases, and Closing Stock – no sales – to see.', '(3) Use the "shopkeeper" analogy: "You bought 100 pens, sold 70.', 'The 30 pens on the shelf are not an expense; they are an asset.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
