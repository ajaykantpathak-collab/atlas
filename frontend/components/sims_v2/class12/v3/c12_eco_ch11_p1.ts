import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch11_p1: SimDef = {
    id: 'v3_c12_eco_ch11_p1',
    title: 'Government Budget and Balance of Payments · Part 1/2',
    subtitle: '₹9 lakh crore that\'s \'small\' and ₹50,000 crore that\'s \'capital\'',
    classLevel: 12, subject: 'economics', topic: 'Government Budget and Balance of Payments · Part 1/2',
    chapters: ['c12_eco_ch11'],
    nodeIds: ['c12_eco_cbse_11_001', 'c12_eco_cbse_11_002', 'c12_eco_cbse_11_003', 'c12_eco_cbse_11_004', 'c12_eco_cbse_11_005', 'c12_eco_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fiscal analyst', intro: 'Every February the government publishes its plans in two wallets — one for running the country, one for building it. Learn to read both.', goal: 'Split the budget into revenue and capital components and connect items to the objectives of allocation, redistribution and stabilisation.' },
    discovery: {
        question: 'A ₹9-lakh-crore interest payment and a ₹50,000-crore disinvestment receipt — students guess \'the bigger one is capital.\' Which is actually capital?',
        options: ['Disinvestment — it shrinks a government asset; interest is recurring revenue expenditure however huge the number', 'The interest — bigger money means capital budget', 'Both are capital', 'Neither — they\'re the same category'],
        answer: 'Disinvestment — it shrinks a government asset; interest is recurring revenue expenditure however huge the number',
        hook: 'Size is a decoy: revenue vs capital is about economic nature, not amount. Does it create an asset or change a liability? Then it\'s capital. Recurring and net-worth-neutral? Revenue. Free smartphones for students = revenue expenditure — the asset belongs to the child, not the state.',
    },
    teaching: [
        { title: 'Government Budget: Meaning, Components and Objectives', text: 'A government budget is an annual financial statement presenting the government\'s estimated receipts and expenditures for a fiscal year (April 1 to March 31 in India), reflecting its fiscal policy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_11_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Build a state government\'s budget from raw items: sort GST, salaries, borrowings, AIIMS construction and stake sales into revenue and capital wallets, then link each line to allocation, redistribution or stabilisation.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_001', title: 'Government Budget: Meaning, Components and Objectives',
          scaffold: { problem: 'From the Union Budget 2023-24 (actuals), Revenue Receipts = ₹26.3 lakh crore, Revenue Expenditure = ₹34.5 lakh crore, Capital Receipts.',
            steps: [
            { text: 'Identify Revenue Receipts (RR) = 26.3, Revenue Expenditure (RE) = 34.5.' },
            { text: 'Total Expenditure = RE + CE = 34.5 + 10.5 = 45.0 lakh crore. Total Receipts excluding borrowings = RR + (Capital.' },
            { text: 'Primary Deficit = Fiscal Deficit - Interest Payments = 15.4 - 10.8 = 4.6 lakh crore.' },
            { text: 'Interpret: Revenue deficit means day-to-day spending exceeds current income; fiscal deficit of 15.4 lakh crore.', faded: true, blankAnswer: '(a) Revenue Deficit = ₹8.2 lakh crore; (b) Fiscal Deficit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_002', title: 'Revenue Receipts and Capital Receipts: Distinction and Examples',
          scaffold: { problem: 'The Union Budget 2024-25 (Budget Estimates) shows the following receipts (in ₹ lakh crore): Gross Tax Revenue 38.31, Less: States\' Share.',
            steps: [
            { text: 'Identify revenue receipts components — Net Tax Revenue (₹26.12 lakh crore) and Non-Tax Revenue (₹3.00 lakh crore) are.' },
            { text: 'Compute Revenue Receipts = Net Tax Revenue + Non-Tax Revenue = 26.12 + 3.00 = ₹29.12 lakh crore.' },
            { text: 'Identify capital receipts components — Recovery of Loans (₹0.25), Disinvestment (₹0.50), Market Borrowings (₹14.13).' },
            { text: 'Compute Capital Receipts = 0.25 + 0.50 + 14.13 + 0.50 + 0.20 = ₹15.58 lakh crore.' },
            { text: 'Split capital receipts: Debt Capital = Market Borrowings + Short-term Borrowings + External Loans = 14.13 + 0.50 + 0.20.', faded: true, blankAnswer: '(a) Revenue Receipts = ₹29.12 lakh crore; (b) Capital.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_003', title: 'Revenue Expenditure and Capital Expenditure: Distinction and Examples',
          caseStudy: { intro: 'Imagine you are analyzing the Union Budget of India presented in February.',
            decisions: [{ prompt: 'Define revenue expenditure and capital expenditure in one sentence each, using the asset/liability criterion.', options: [
                { text: 'Revenue expenditure is government spending that neither creates assets nor reduces', outcome: 'Revenue expenditure is government spending that neither creates assets nor reduces liabilities.' },
                { text: 'long-term', outcome: 'Not quite — Students often think that any "large" or "long-term" spending is capital expenditure (e.g.', reveals: 'any-large-or-long-term' },
                { text: 'salaries are paid every year for many years, so they are capital', outcome: 'Not quite — Students often think that any "large" or "long-term" spending is capital expenditure (e.g.', reveals: 'any-large-or-long-term' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_004', title: 'Plan and Non-Plan Expenditure; Developmental and Non-Developmental Expenditure',
          scaffold: { problem: 'In Union Budget 2022-23 (actuals), total expenditure was ₹37.7 lakh crore. Developmental expenditure was ₹22.1 lakh crore.',
            steps: [
            { text: 'Identify the two independent partitions of total expenditure. Partition A: Plan (P) + Non-Plan (NP) = Total (T).' },
            { text: 'Write given data: T = 37.7, D = 22.1, NP = 23.1, P = 14.6 (all in lakh crore).' },
            { text: 'We need the cross-classification. Use the identity: P = P∩D + P∩ND and NP = NP∩D + NP∩ND. Also D = P∩D + NP∩D.' },
            { text: 'Compute: P∩D = 13.8 (given). Then P∩ND = P - P∩D = 14.6 - 13.8 = 0.8. NP∩D = D - P∩D = 22.1 - 13.8 = 8.3.' },
            { text: 'Interpret: Non-Plan Developmental (₹8.3 lakh crore) includes maintenance of existing schools/hospitals (revenue) and.', faded: true, blankAnswer: 'Matrix (lakh crore): Plan-Dev = 13.8, Plan-NonDev = 0.8.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_005', title: 'Revenue Deficit, Fiscal Deficit and Primary Deficit: Meaning and Implications',
          scaffold: { problem: 'From the Union Budget 2024-25 (simplified data): Tax Revenue = ₹26.02 lakh crore, Non-tax Revenue = ₹3.01 lakh crore, Revenue Expenditure.',
            steps: [
            { text: 'Identify Revenue Receipts = Tax Revenue + Non-tax Revenue = 26.02 + 3.01 = ₹29.03 lakh crore.' },
            { text: 'Compute Revenue Deficit = Revenue Expenditure – Revenue Receipts = 35.09 – 29.03 = ₹6.06 lakh crore.' },
            { text: 'Compute Total Expenditure = Revenue Expenditure + Capital Expenditure = 35.09 + 11.11 = ₹46.20 lakh crore.' },
            { text: 'Compute Non-debt Capital Receipts = Disinvestment + Loan Recoveries = 0.50 + 0.20 = ₹0.70 lakh crore.' },
            { text: 'Compute Total Receipts (excl. borrowings) = Revenue Receipts + Non-debt Capital Receipts = 29.03 + 0.70 = ₹29.73 lakh.' },
            { text: 'Compute Fiscal Deficit = Total Expenditure – Total Receipts (excl. borrowings) = 46.20 – 29.73 = ₹16.47 lakh crore.' },
            { text: 'Compute Primary Deficit = Fiscal Deficit – Interest Payments = 16.47 – 11.90 = ₹4.57 lakh crore.' },
            { text: 'Express as % of GDP: RD = (6.06/300)×100 = 2.02%; FD = (16.47/300)×100 = 5.49%; PD = (4.57/300)×100 = 1.52%.', faded: true, blankAnswer: 'Revenue Deficit = ₹6.06 lakh crore (2.02% of GDP); Fiscal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_006', title: 'Fiscal Deficit and Government Borrowing: Financing Methods',
          scaffold: { problem: 'From the following Budget 2024-25 (hypothetical) data, calculate Fiscal Deficit and its financing composition.',
            steps: [
            { text: 'Compute Fiscal Deficit = Total Expenditure – (Revenue Receipts + Non-Debt Capital Receipts) = 45,00,000 – (26,00,000.' },
            { text: 'Compute Net Market Borrowing = Gross Market Borrowing – Repayments – Switching = 12,00,000 – 2,50,000 – 1,00,000.' },
            { text: 'Sum all financing sources = Net Market Borrowing (8,50,000) + Net External Borrowing (50,000) + Net NSSF (1,50,000).' },
            { text: 'Notice the sum (11,00,000) ≠ Fiscal Deficit (16,00,000). The gap ₹5,00,000 crore must be financed by other domestic.' },
            { text: 'Conclude: Fiscal Deficit = Σ All Financing Items. The identity holds by construction in government accounting.', faded: true, blankAnswer: 'Fiscal Deficit = ₹16,00,000 crore. Financing composition.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting budget items for a civics project, a student files the government\'s PSU stake sale under \'revenue receipts\' — \'it\'s money coming in, so it\'s revenue\' — and a new AIIMS under revenue expenditure too.',
            decisions: [{ prompt: 'Where does the classification actually turn?', options: [
                { text: 'On assets and liabilities, not size or recurrence alone: selling a stake reduces a government asset → capital receipt; building a hospital creates one → capital expenditure.', outcome: 'The revenue/capital split asks \'does this change the government\'s balance sheet?\' — interest of ₹9 lakh crore stays revenue while a small disinvestment is capital.' },
                { text: 'He\'s right — any inflow is revenue, and salaries-like recurring spend is what revenue expenditure covers, so both filings stand.', outcome: 'Inflows that shrink assets (disinvestment) or create liabilities (borrowings) are capital receipts regardless of being \'income\'.', reveals: 'inflow-equals-revenue' },
                { text: 'Swap by size — big-ticket items like AIIMS are \'capital\' only because they\'re expensive.', outcome: 'The hospital is capital because it creates an asset, not because it\'s costly — a ₹1-lakh-crore interest bill is still revenue expenditure.', reveals: 'big-money-is-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now deconstruct any Union Budget headline — deficit targets, capex pushes, subsidy bills — into its true anatomy. Budget questions practically mark themselves once the split clicks.',
            decisions: [{ prompt: 'What comes next? Government Budget and Balance of Payments · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Government Budget and Balance of Payments · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_001', difficulty: 'standard',
          question: 'A government budget is an annual financial statement presenting the.',
          hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
          misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction.',
          parts: [
                { id: 'a', prompt: 'Explain why the budget is divided into Revenue Budget and Capital Budget. What economic distinction does this division capture?', answer: 'The division separates current/recurring transactions (revenue) from',
                  options: ['The division separates current/recurring transactions (revenue) from', 'revenue is for short term, capital for long term', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' },
                { id: 'b', prompt: 'Classify each of the following into Revenue Receipt, Revenue Expenditure, Capital Receipt, or Capital Expenditure: (a) Corporate tax collection, (b) Interest.', answer: 'Corporate tax collection, (',
                  options: ['Corporate tax collection, (', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' }
          ],
            remediations: { 'capital-budget-means-big-money': { steps: ['If the student confuses revenue vs capital classification: (1) Revisit the definition: "Does this create a government.', 'Otherwise → Revenue." (2) Practice with 10 items from the latest Union Budget (use budget.gov.in).', '(3) Draw a T-account for each item: left side asset/liability change?', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction.',
          parts: [
                { id: 'a', prompt: '"During high inflation, the government should increase capital expenditure on infrastructure to boost supply." Evaluate this statement using the stabilization.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' },
                { id: 'b', prompt: 'Construct a mini-budget for a hypothetical state government with the following items (in ₹ crore): GST collection 50,000; Salaries 30,000; Interest payments.', answer: 'Revenue Budget: Receipts = GST 50,000 (Revenue Receipt)',
                  options: ['Revenue Budget: Receipts = GST 50,000 (Revenue Receipt)', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' }
          ],
            remediations: { 'capital-budget-means-big-money': { steps: ['If the student confuses revenue vs capital classification: (1) Revisit the definition: "Does this create a government.', 'Otherwise → Revenue." (2) Practice with 10 items from the latest Union Budget (use budget.gov.in).', '(3) Draw a T-account for each item: left side asset/liability change?', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_002', difficulty: 'standard',
          question: 'Revenue receipts are government inflows that neither create a liability nor.',
          hint: 'If stuck on classification, revisit the accounting equation (Assets = Liabilities.',
          misconception: 'Students believe "revenue receipts are recurring and capital receipts are non-recurring" is the definition.',
          parts: [
                { id: 'a', prompt: 'The government receives ₹500 crore as dividend from the Reserve Bank of India and ₹500 crore from selling 5% stake in a public sector enterprise.', answer: 'RBI dividend is a revenue receipt',
                  options: ['RBI dividend is a revenue receipt', 'revenue receipts are recurring and capital receipts are non-recurring'],
                  hint: 'If stuck on classification, revisit the accounting equation (Assets = Liabilities + Capital) from.',
                  misconception: 'Students believe "revenue receipts are recurring and capital receipts are non-recurring" is the definition.' }
          ],
            remediations: { 'revenue-receipts-are-recurring-and': { steps: ['If the student cannot classify receipts correctly: (1) Revisit the two-question test: "Does it create a liability?', 'Does it reduce an asset?" — apply to each receipt type.', '(2) Use the Budget at a Glance document (available on indiabudget.gov.in) and practice classifying the first 20 line.', '(3) Re-do Worked Example 3 with a different year\'s data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_003', difficulty: 'standard',
          question: 'Revenue expenditure refers to government spending that does not create any.',
          hint: 'Review Class 11 Accounting nodes c11_acc_cbse_01_008 and c11_acc_cbse_01_009 for.',
          misconception: 'Students often think that any "large" or "long-term" spending is capital expenditure (e.g., "salaries are paid every.',
          parts: [
                { id: 'a', prompt: 'Classify the following items from a hypothetical budget: (a) ₹50,000 crore for payment of pensions, (b) ₹20,000 crore for purchase of shares in a public sector.', answer: '₹50,000 crore for payment of pensions, (',
                  options: ['₹50,000 crore for payment of pensions, (', 'long-term', 'salaries are paid every year for many years, so they are capital', 'any "large" or "long-term" spending is capital expenditure (e'],
                  hint: 'Review Class 11 Accounting nodes c11_acc_cbse_01_008 and c11_acc_cbse_01_009 for asset/liability.',
                  misconception: 'Students often think that any "large" or "long-term" spending is capital expenditure (e.g., "salaries are paid every year for many years.' },
                { id: 'b', prompt: 'Compare the impact on the fiscal deficit if the government shifts ₹1 lakh crore from revenue expenditure to capital expenditure, keeping total expenditure and.', answer: 'The fiscal deficit (total expenditure - total receipts) remains unchanged',
                  options: ['The fiscal deficit (total expenditure - total receipts) remains unchanged', 'long-term', 'salaries are paid every year for many years, so they are capital', 'any "large" or "long-term" spending is capital expenditure (e'],
                  hint: 'Review Class 11 Accounting nodes c11_acc_cbse_01_008 and c11_acc_cbse_01_009 for asset/liability.',
                  misconception: 'Students often think that any "large" or "long-term" spending is capital expenditure (e.g., "salaries are paid every year for many years.' }
          ],
            remediations: { 'any-large-or-long-term': { steps: ['If a student misclassifies items, have them revisit the definition: "Does this spending create an asset (something the.', 'No (it\'s a current expense).', 'So it\'s revenue expenditure." Then practice with 10 items from a real budget document (e.g., Union Budget 2023-24.', 'Re-diagnose with DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_004', difficulty: 'standard',
          question: 'Plan Expenditure refers to government spending on schemes and projects.',
          hint: 'If stuck on classification, revisit the "Public Goods" node (c9_eco_ch1_10) — ask: "Does.',
          misconception: 'Students conflate "Plan Expenditure" with "Capital Expenditure" and "Non-Plan Expenditure" with "Revenue Expenditure.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plan Expenditure refers to government spending on schemes and projects formulated under',
                  options: ['Plan Expenditure refers to government spending on schemes and projects formulated under', 'A government budget is an annual financial statement presenting the government\'s', 'Revenue receipts are government inflows that neither create a liability nor reduce assets', 'Revenue expenditure refers to government spending that does not create any physical or'],
                  hint: 'If stuck on classification, revisit the "Public Goods" node (c9_eco_ch1_10) — ask: "Does this.',
                  misconception: 'Students conflate "Plan Expenditure" with "Capital Expenditure" and "Non-Plan Expenditure" with "Revenue Expenditure." They think Plan.' }
          ],
            remediations: { 'students-conflate-plan-expenditure-with': { steps: ['Revisit c12_eco_cbse_11_003 (Revenue vs Capital Expenditure) — draw a 2×2 matrix with rows Plan/Non-Plan and columns.', 'Revisit c11_eco_cbse_02_001 (Five Year Plans) to understand Plan expenditure\'s origin.', 'Re-attempt Diagnostic Question 4 with the matrix — if inconsistent data appears, identify which partition.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_005', difficulty: 'standard',
          question: 'Revenue Deficit is the excess of government\'s revenue expenditure over revenue.',
          hint: 'If stuck on classification, revisit c12_eco_cbse_11_002 (receipts) and.',
          misconception: 'Students believe "Primary Deficit = Revenue Deficit – Interest Payments" because both involve \'deficit\' and \'interest\'.',
          parts: [
                { id: 'a', prompt: 'Define Revenue Deficit, Fiscal Deficit, and Primary Deficit with their respective formulas.', answer: 'Revenue Deficit = RE – RR',
                  options: ['Revenue Deficit = RE – RR', 'Revenue Deficit = Total Expenditure – Total Receipts', 'Primary Deficit = Revenue Deficit – Interest Payments'],
                  hint: 'If stuck on classification, revisit c12_eco_cbse_11_002 (receipts) and c12_eco_cbse_11_003.',
                  misconception: 'Students believe "Primary Deficit = Revenue Deficit – Interest Payments" because both involve \'deficit\' and \'interest\'.' },
                { id: 'b', prompt: 'The Union Budget 2023-24 showed Revenue Deficit of ₹8.7 lakh crore and Fiscal Deficit of ₹17.9 lakh crore.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'Primary Deficit = Revenue Deficit – Interest Payments'],
                  hint: 'If stuck on classification, revisit c12_eco_cbse_11_002 (receipts) and c12_eco_cbse_11_003.',
                  misconception: 'Students believe "Primary Deficit = Revenue Deficit – Interest Payments" because both involve \'deficit\' and \'interest\'.' },
                { id: 'c', prompt: 'Given: Revenue Receipts = ₹25 lakh crore, Revenue Expenditure = ₹32 lakh crore, Capital Expenditure = ₹10 lakh crore, Non-debt Capital Receipts = ₹3 lakh.', answer: 'Step 1: Revenue Deficit = RE – RR = 32 – 25 = ₹7 lakh crore',
                  options: ['Step 1: Revenue Deficit = RE – RR = 32 – 25 = ₹7 lakh crore', 'Primary Deficit = Revenue Deficit – Interest Payments'],
                  hint: 'If stuck on classification, revisit c12_eco_cbse_11_002 (receipts) and c12_eco_cbse_11_003.',
                  misconception: 'Students believe "Primary Deficit = Revenue Deficit – Interest Payments" because both involve \'deficit\' and \'interest\'.' },
                { id: 'd', prompt: 'Compare two economies: Economy A has Fiscal Deficit 6% of GDP, Primary Deficit 1% of GDP. Economy B has Fiscal Deficit 4% of GDP, Primary Deficit 3% of GDP.', answer: 'Interest Payments = Fiscal Deficit – Primary Deficit',
                  options: ['Interest Payments = Fiscal Deficit – Primary Deficit', 'Primary Deficit = Revenue Deficit – Interest Payments'],
                  hint: 'If stuck on classification, revisit c12_eco_cbse_11_002 (receipts) and c12_eco_cbse_11_003.',
                  misconception: 'Students believe "Primary Deficit = Revenue Deficit – Interest Payments" because both involve \'deficit\' and \'interest\'.' }
          ],
            remediations: { 'primary-deficit-revenue-deficit-interest': { steps: ['Revisit node c12_eco_cbse_11_002 (Revenue vs Capital Receipts) and c12_eco_cbse_11_003 (Revenue vs Capital.', 'Draw a T-account: Left side = Revenue Expenditure + Capital Expenditure; Right side = Revenue Receipts + Capital.', 'Practice 3 numerical problems from CBSE sample papers where you compute all three deficits from a budget table.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_006', difficulty: 'standard',
          question: 'Fiscal deficit is the excess of total government expenditure over total.',
          hint: 'If stuck, revisit c12_eco_cbse_11_005 worked examples on calculating fiscal deficit.',
          misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".',
          parts: [
                { id: 'a', prompt: 'In the Union Budget 2024-25, the Government of India estimates Total Expenditure at ₹47,65,768 crore and Total Receipts (excluding borrowings) at ₹30,80,000.', answer: 'Fiscal Deficit = ₹47,65,768 crore – ₹30,80,000 crore = ₹16,85,768 crore',
                  options: ['Fiscal Deficit = ₹47,65,768 crore – ₹30,80,000 crore = ₹16,85,768 crore', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'If stuck, revisit c12_eco_cbse_11_005 worked examples on calculating fiscal deficit, revenue.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' },
                { id: 'b', prompt: 'The government decides to finance ₹2 lakh crore of its fiscal deficit by issuing 10-year dated securities (G-Secs) to commercial banks.', answer: 'bank reserves, (',
                  options: ['bank reserves, (', 'money supply increases', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'If stuck, revisit c12_eco_cbse_11_005 worked examples on calculating fiscal deficit, revenue.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' },
                { id: 'c', prompt: 'Compare the macroeconomic impact of financing ₹1 lakh crore fiscal deficit through: (A) RBI purchasing government securities (monetization) vs.', answer: '(A) RBI credits government account → H increases directly (ΔH = ₹1 lakh crore)',
                  options: ['(A) RBI credits government account → H increases directly (ΔH = ₹1 lakh crore)', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'If stuck, revisit c12_eco_cbse_11_005 worked examples on calculating fiscal deficit, revenue.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' }
          ],
            remediations: { 'fiscal-deficit-borrowing-from-rbi': { steps: ['If the student holds the above misconception: (1) Revisit c12_eco_cbse_11_005 to re-derive Fiscal Deficit = Borrowing.', '(2) Use RBI\'s "Financing of Fiscal Deficit" table from the latest Budget (Annexure 2.1) — identify each line item.', '(3) Calculate the share of RBI (WMA + G-Sec purchases) vs.', '(4) Re-attempt Diagnostic Q4 with actual data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
