import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch08_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch08_p2: SimDef = {
    id: 'v3_c12_acc_ch08_p2',
    title: 'Analysis of Financial Statements · Part 2/2',
    subtitle: 'The ratio says 2:1. The truth says \'depends\'. Learn the difference.',
    classLevel: 12, subject: 'accountancy', topic: 'Analysis of Financial Statements · Part 2/2',
    chapters: ['c12_acc_ch08'],
    nodeIds: ['c12_acc_cbse_08_007', 'c12_acc_cbse_08_008', 'c12_acc_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Credit analyst vetting a ₹50 lakh loan', intro: 'Financial statements are raw numbers until someone asks the right questions — that someone is the analyst.', goal: 'State the objectives of financial statement analysis and apply its limitations to real comparisons.' },
    discovery: {
        question: 'Two firms report identical current ratios of 2:1 — but one uses FIFO with straight-line depreciation, the other LIFO with written-down value. Can you say their liquidity is equal?',
        options: ['No — different accounting policies can manufacture identical ratios from very different realities', 'Yes — identical ratios always mean identical liquidity', 'Yes — ratio analysis eliminates all policy differences automatically', 'No — because LIFO is illegal under Indian accounting standards'],
        answer: 'No — different accounting policies can manufacture identical ratios from very different realities',
        hook: 'Numbers feel objective; they\'re not. Analysis begins where blind trust ends — every statement rests on historical cost, policy choices and estimates that the raw ratio never reveals.',
    },
    teaching: [
        { title: 'Common Size Statements: Preparation of Common Size Statement of Profit and Loss', text: 'A Common Size Statement of Profit and Loss expresses each item of the Statement of Profit and Loss as a percentage of Revenue from Operations (Net Sales), enabling vertical analysis to assess the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play the bank manager: take raw Balance Sheet and P&L data from a loan applicant, run the analysis, and stress-test your conclusion against the known limitations of financial statements.',
        labels: ['Common Size Statements: Preparation', 'Trend Analysis: Meaning, Base', 'Internal and External Analysis'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_007', title: 'Common Size Statements: Preparation of Common Size Statement of Profit and Loss',
          scaffold: { problem: 'Prepare a Common Size Statement of Profit and Loss for M/s. Sharma Electronics for the year ended 31st March 2024 from the following data:',
            steps: [
            { text: 'Identify the base — Revenue from Operations = ₹80,00,000 = 100%.' },
            { text: 'List all items in the order of the Statement of Profit and Loss (Schedule III): Revenue from Operations, Other Income.' },
            { text: 'For each item, compute Percentage = (Item Amount / ₹80,00,000) × 100. For Revenue from Operations, it is 100%.' },
            { text: 'Compute subtotals: Total Expenses = 40.00+10.00-2.50+15.00+3.75+5.00+12.50 = 83.75%.' },
            { text: 'Present in a two-column table: Particulars | Percentage (%). Verify that the percentages flow logically: 100 + 5.', faded: true, blankAnswer: 'Common Size Statement of Profit and Loss for M/s. Sharma.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_008', title: 'Trend Analysis: Meaning, Base Year Selection and Computation',
          scaffold: { problem: 'The following data relates to the Revenue from Operations of Z Ltd. for five years ending 31st March.',
            steps: [
            { text: 'Identify the base year figure. Base year = 2019, Base figure = ₹12,00,000.' },
            { text: 'Write the formula: Trend % = (Current Year Revenue / Base Year Revenue) × 100.' },
            { text: 'Compute for 2020: (13,80,000 / 12,00,000) × 100 = 1.15 × 100 = 115.' },
            { text: 'Compute for 2021: (11,40,000 / 12,00,000) × 100 = 0.95 × 100 = 95.' },
            { text: 'Compute for 2022: (15,60,000 / 12,00,000) × 100 = 1.30 × 100 = 130.' },
            { text: 'Compute for 2023: (16,80,000 / 12,00,000) × 100 = 1.40 × 100 = 140.' },
            { text: 'Tabulate results and interpret: Revenue dipped in 2021 (95) but recovered strongly, reaching 140 in 2023 — a 40%.', faded: true, blankAnswer: 'Trend Percentages: 2019=100, 2020=115, 2021=95, 2022=130.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_009', title: 'Internal and External Analysis: Distinction and Users',
          caseStudy: { intro: 'Imagine you are the CFO of a large Indian manufacturing company preparing the annual report.',
            decisions: [{ prompt: 'Name any four external users of financial statements and state one specific decision each user makes based on their analysis.', options: [
                { text: 'Correct answer: (1) Investors/Shareholders', outcome: 'Correct answer: (1) Investors/Shareholders — decide whether to buy, hold, or sell shares; (2).' },
                { text: 'management', outcome: 'Not quite — Students often believe "Internal Analysis = done by employees, External Analysis = done.', reveals: 'internal-analysis-done-by-employees' },
                { text: 'preparing financial statements', outcome: 'Not quite — Students often believe "Internal Analysis = done by employees, External Analysis = done.', reveals: 'internal-analysis-done-by-employees' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a bank\'s loan desk, a student appraises a textile firm: Current Ratio 2:1 (comfortable), but inventory is ₹50 lakh of the ₹80 lakh current assets and the Quick Ratio is 0.75:1 against an industry norm of 1:1. Her manager asks whether to sanction a ₹20 lakh working-capital loan.',
            decisions: [{ prompt: 'What does the analysis actually say?', options: [
                { text: 'Flag the divergence: the current ratio is inventory-driven while the quick ratio sits below industry — sanction only with conditions like inventory hypothecation and turnover monitoring.', outcome: 'Ratios are whistle-blowers, not verdicts: interpretation against benchmarks and composition turns numbers into a decision.' },
                { text: 'Approve unconditionally — a 2:1 current ratio meets the textbook norm, so liquidity is fine.', outcome: 'That\'s calculation, not analysis: 62% of the current assets are inventory, which the quick ratio exposes as weak immediate liquidity.', reveals: 'ratio-number-is-analysis' },
                { text: 'Reject outright — a quick ratio below 1:1 means the firm is insolvent.', outcome: 'A single sub-norm ratio signals risk, not death; analysis weighs the whole picture — strong gross current cover plus slow-moving stock argues for a conditional sanction, not a blanket no.', reveals: 'one-ratio-decides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_009', title: 'You made it',
          caseStudy: { intro: 'You now read statements like a lender — extracting signal while doubting the noise. Objective-and-limitation questions are board favourites; sceptical reading is a career skill.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_007', difficulty: 'standard',
          question: 'A Common Size Statement of Profit and Loss expresses each item of the Statement.',
          hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical.',
          misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100.',
          parts: [
                { id: 'a', prompt: 'What is the base (100%) used when preparing a Common Size Statement of Profit and Loss, and why is that specific item chosen as the base?', answer: 'The base is Revenue from Operations (Net Sales)',
                  options: ['The base is Revenue from Operations (Net Sales)', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' },
                { id: 'b', prompt: 'A student prepares a Common Size Statement of Profit and Loss and finds that the sum of all expense percentages equals 85%.', answer: 'Not always',
                  options: ['Not always', '100% minus expenses', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' },
                { id: 'c', prompt: 'Given the following data for a company for the year ended 31st March 2024, prepare a Common Size Statement of Profit and Loss (show percentages to two decimal.', answer: '**Step 1:** Base = Revenue from Operations = ₹50,00,000 (100%)',
                  options: ['**Step 1:** Base = Revenue from Operations = ₹50,00,000 (100%)', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' },
                { id: 'd', prompt: 'Two companies, A and B, have the following common size percentages for Cost of Materials Consumed: Company A = 55%, Company B = 45%.', answer: 'The argument is not necessarily valid',
                  options: ['The argument is not necessarily valid', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' }
          ],
            remediations: { 'the-common-size-percentage-for': { steps: ['If a student uses Total Expenses as base: 1.', 'Ask them to write the formula for "Gross Profit Ratio" (Gross Profit / Revenue from Operations × 100).', 'Point out that Common Size Statement is an extension of the same logic — every item is compared to the same denominator.', 'Give a 3-item mini-statement: Revenue ₹100, COGS ₹60, Wages ₹20.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100.',
          parts: [
                { id: 'a', prompt: 'A company\'s Common Size Statement of Profit and Loss shows Employee Benefits Expense at 12% for Year 1 and 15% for Year 2.', answer: 'The error is confusing percentage points with percent change',
                  options: ['The error is confusing percentage points with percent change', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' },
                { id: 'b', prompt: 'Create a mini-case: Invent a company with three years of data where Revenue from Operations grows 20% each year, but the Gross Profit % (Revenue minus Cost.', answer: '**Year 1:** Revenue = ₹1,00,00,000',
                  options: ['**Year 1:** Revenue = ₹1,00,00,000', 'Common Size percentage'],
                  hint: 'If stuck, revisit c12_acc_cbse_08_006 (Common Size Balance Sheet) to review the vertical analysis.',
                  misconception: 'Students often think the "Common Size percentage" for an expense is calculated as (Expense / Total Expenses) × 100, i.e., they treat the.' }
          ],
            remediations: { 'the-common-size-percentage-for': { steps: ['If a student uses Total Expenses as base: 1.', 'Ask them to write the formula for "Gross Profit Ratio" (Gross Profit / Revenue from Operations × 100).', 'Point out that Common Size Statement is an extension of the same logic — every item is compared to the same denominator.', 'Give a 3-item mini-statement: Revenue ₹100, COGS ₹60, Wages ₹20.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_008', difficulty: 'standard',
          question: 'Trend analysis is a technique of financial statement analysis that expresses.',
          hint: 'If stuck on percentage calculation, review Class 8 Math node c8_math_ch8_4.',
          misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).',
          parts: [
                { id: 'a', prompt: 'Why must the base year be a \'normal\' year rather than a year with exceptional profits due to a one-time gain like sale of land? Explain in your own words.', answer: 'If the base year contains a one-time gain, its figure is artificially inflated',
                  options: ['If the base year contains a one-time gain, its figure is artificially inflated', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'If stuck on percentage calculation, review Class 8 Math node c8_math_ch8_4.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' },
                { id: 'b', prompt: 'A company\'s Revenue from Operations for five years (2019-2023) is: 2019: ₹40,00,000; 2020: ₹44,00,000; 2021: ₹38,00,000; 2022: ₹50,00,000; 2023: ₹56,00,000.', answer: 'Step 1: Base year (2019) figure = ₹40,00,000 → Trend % = 100',
                  options: ['Step 1: Base year (2019) figure = ₹40,00,000 → Trend % = 100', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'If stuck on percentage calculation, review Class 8 Math node c8_math_ch8_4.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' },
                { id: 'c', prompt: 'Two companies, A and B, show the following trend percentages for Revenue from Operations (base year 2018=100): Company A: 2018=100, 2019=105, 2020=110.', answer: 'Company A shows steady, consistent growth of 5% per year (100→105→110→115→120),',
                  options: ['Company A shows steady, consistent growth of 5% per year (100→105→110→115→120),', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'If stuck on percentage calculation, review Class 8 Math node c8_math_ch8_4.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' }
          ],
            remediations: { 'the-base-year-must-always': { steps: ['Revisit the definition of \'normal base year\' in the NCERT text (Chapter 4, Analysis of Financial Statements).', 'Practice identifying abnormal years from a given 5-year profit statement (e.g., spot the year with \'Profit on sale.', 'Re-do Diagnostic Question 2 and 5, explicitly writing why the chosen base year is appropriate or not.', 'If percentage calculation is weak, review Class 8 Math node c8_math_ch8_1 (Percentages: Definition and Meaning) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_009', difficulty: 'standard',
          question: 'Internal analysis is the examination of financial statements by persons who.',
          hint: 'Revisit Class 11 Node c11_acc_cbse_01_004 — specifically the table "Users of Accounting.',
          misconception: 'Students often believe "Internal Analysis = done by employees, External Analysis = done by outsiders" and stop there.',
          parts: [
                { id: 'a', prompt: 'Name any four external users of financial statements and state one specific decision each user makes based on their analysis.', answer: 'Correct answer: (1) Investors/Shareholders',
                  options: ['Correct answer: (1) Investors/Shareholders', 'management', 'preparing financial statements', 'Internal Analysis = done by employees, External Analysis = done by outsiders'],
                  hint: 'Revisit Class 11 Node c11_acc_cbse_01_004 — specifically the table "Users of Accounting Information.',
                  misconception: 'Students often believe "Internal Analysis = done by employees, External Analysis = done by outsiders" and stop there.' },
                { id: 'b', prompt: 'Explain why an internal analyst (e.g., the Cost Accountant) can perform a more detailed variance analysis of manufacturing overheads than an external equity.', answer: 'Correct answer: The internal analyst has access to the detailed cost ledgers,',
                  options: ['Correct answer: The internal analyst has access to the detailed cost ledgers,', 'internal analysts are more qualified', 'external analysts don\'t know variance analysis', 'Internal Analysis = done by employees, External Analysis = done by outsiders'],
                  hint: 'Revisit Class 11 Node c11_acc_cbse_01_004 — specifically the table "Users of Accounting Information.',
                  misconception: 'Students often believe "Internal Analysis = done by employees, External Analysis = done by outsiders" and stop there.' },
                { id: 'c', prompt: 'A bank\'s credit officer is analysing the financial statements of a small private limited company applying for a term loan.', answer: 'Correct answer: The bank officer is an **external user**',
                  options: ['Correct answer: The bank officer is an **external user**', 'work closely with the company', 'Internal Analysis = done by employees, External Analysis = done by outsiders'],
                  hint: 'Revisit Class 11 Node c11_acc_cbse_01_004 — specifically the table "Users of Accounting Information.',
                  misconception: 'Students often believe "Internal Analysis = done by employees, External Analysis = done by outsiders" and stop there.' }
          ],
            remediations: { 'internal-analysis-done-by-employees': { steps: ['Revisit **c11_acc_cbse_01_004 (Users of Accounting Information: Internal and External)** — re-read the table.', 'Create a two-column table: Column A = "Internal User (e.g., Production Manager)", Column B = "External User (e.g., Bank.', 'Test yourself — pick a new user (e.g., "Government Inspector") and classify them with full justification using the.', 'If still stuck, ask: "Does this user sign the cheques or receive the cheques?" — payers (internal) need control data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
