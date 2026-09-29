import type { SimDef } from '../../engine/types';
import C12_AccountancyComparativeStatementsMeaningSim from '../../../simulations/c6_12/C12_AccountancyComparativeStatementsMeaningSim';

/** v3 wrapped master — C12_AccountancyComparativeStatementsMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancycomparativestatementsmeaningsim: SimDef = {
    id: 'v3w_c12_accountancycomparativestatementsmeaningsim',
    title: 'Financial Statement Analysis: Meaning, Significance and Objectives',
    subtitle: 'This node covers the meaning, significance, and objectives of financial statement.',
    classLevel: 12, subject: 'accountancy', topic: 'Financial Statement Analysis: Meaning, Significance and Objectives',
    chapters: [],
    nodeIds: ['c12_acc_cbse_08_001', 'c12_acc_cbse_08_008', 'c12_acc_cbse_08_002', 'c12_acc_cbse_08_003', 'c12_acc_cbse_08_004', 'c12_acc_cbse_08_005', 'c12_acc_cbse_08_006', 'c12_acc_cbse_08_007', 'c12_acc_cbse_08_009', 'c12_acc_cbse_07_001', 'c12_acc_cbse_07_003', 'c12_acc_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a bank manager deciding whether to sanction a ₹50 lakh loan to a small manufacturing firm.', goal: 'Master Financial Statement Analysis: Meaning, Significance and Objectives.' },
    discovery: {
        question: 'A student says: "Financial statement analysis is only useful for external users like investors and banks; management already knows everything about the.',
        options: ['The statement is incorrect', 'calculating ratios IS financial statement analysis', '"calculating ratios IS financial statement analysis'],
        answer: 'The statement is incorrect',
        hook: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio.',
    },
    teaching: [
        { title: 'Financial Statement Analysis is the.', text: 'Financial Statement Analysis is the systematic process of examining and interpreting a company\'s financial statements (Balance Sheet, Statement of Profit and Loss, Cash Flow Statement) to evaluate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_001', title: 'Financial Statement Analysis is the.',
          scaffold: { problem: 'Ramesh, a bank loan officer, receives the Balance Sheet of "Shree Ganesh Textiles" showing Current Assets ₹80 lakh, Current Liabilities ₹40.',
            steps: [
            { text: 'Identify the ratios calculated — Current Ratio 2:1 (above norm 2:1), Quick Ratio 0.75:1 (below industry 1:1).' },
            { text: 'Interpret the divergence — High Current Ratio driven by high Inventory (₹50L out of ₹80L CA); Quick Ratio excludes.' },
            { text: 'Apply cross-sectional analysis — Quick Ratio below industry average signals higher risk of inability to meet urgent.' },
            { text: 'Formulate decision — Recommend conditional sanction: approve loan but with condition of inventory audit and.', faded: true, blankAnswer: 'Credit Appraisal Note: "Current Ratio 2:1 appears.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_008', title: 'Trend analysis is a technique of.',
          scaffold: { problem: 'The following data relates to the Revenue from Operations of Z Ltd. for five years ending 31st March.',
            steps: [
            { text: 'Identify the base year figure. Base year = 2019, Base figure = ₹12,00,000.' },
            { text: 'Write the formula: Trend % = (Current Year Revenue / Base Year Revenue) × 100.' },
            { text: 'Compute for 2020: (13,80,000 / 12,00,000) × 100 = 1.15 × 100 = 115.' },
            { text: 'Compute for 2021: (11,40,000 / 12,00,000) × 100 = 0.95 × 100 = 95.' },
            { text: 'Compute for 2022: (15,60,000 / 12,00,000) × 100 = 1.30 × 100 = 130.' },
            { text: 'Compute for 2023: (16,80,000 / 12,00,000) × 100 = 1.40 × 100 = 140.' },
            { text: 'Tabulate results and interpret: Revenue dipped in 2021 (95) but recovered strongly, reaching 140 in 2023 — a 40%.', faded: true, blankAnswer: 'Trend Percentages: 2019=100, 2020=115, 2021=95, 2022=130,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_002', title: 'Limitations of Financial Statement.',
          scaffold: { problem: 'Company P and Company Q are in the same industry. Company P uses FIFO for inventory valuation and straight-line depreciation.',
            steps: [
            { text: 'Recognize that the Current Ratio uses Current Assets (including Inventory) and Current Liabilities.' },
            { text: 'Recognize that Gross Profit Ratio = (Revenue - Cost of Goods Sold) / Revenue.' },
            { text: 'Identify the limitation: "Variations in Accounting Practices" (different inventory valuation and depreciation methods).' },
            { text: 'Note that "Ignores Price-level Changes" compounds the problem because the distortion arises specifically during.' },
            { text: 'Conclude that the analyst must restate both companies\' financials to a common policy (e.g., FIFO) and/or use.', faded: true, blankAnswer: 'The conclusion is invalid due to (1) Variations in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_003', title: 'Horizontal Analysis compares financial.',
          scaffold: { problem: 'A student is given the following data for Z Ltd. and asked to identify the type of analysis represented by each calculation.',
            steps: [
            { text: 'Identify the two items being compared in Calculation A — Revenue 2023 vs Revenue 2022 (same item, different years).' },
            { text: 'Recognise this is a time-series comparison → Horizontal Analysis.' },
            { text: 'Identify the two items in Calculation B — Cost of Revenue 2023 vs Revenue 2023 (different items, same year, common base.' },
            { text: 'Recognise this is a cross-sectional structural comparison within one period → Vertical Analysis.' },
            { text: 'State the final classification with reasoning.', faded: true, blankAnswer: 'Calculation A = Horizontal Analysis (Year-over-year revenue.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_004', title: 'A Comparative Balance Sheet is a.',
          scaffold: { problem: 'Prepare a Comparative Balance Sheet from the following data of XYZ Ltd. as on 31st March 2023 and 2024:',
            steps: [
            { text: 'Set up the Comparative Balance Sheet format with six columns: Particulars, Note No., 2023 (₹), 2024 (₹), Absolute.' },
            { text: 'List all items in Schedule III order — Equity & Liabilities: Shareholders\' Funds (Equity Share Capital, Reserves &.' },
            { text: 'For each item, calculate Absolute Change = 2024 Amount – 2023 Amount.' },
            { text: 'For each item, calculate Percentage Change = (Absolute Change ÷ 2023 Amount) × 100. Round to two decimal places.' },
            { text: 'Compute sub-totals: Shareholders\' Funds, Non-current Liabilities, Current Liabilities, Total Equity & Liabilities;.' },
            { text: 'Interpret key changes: Equity Share Capital +20% (fresh issue), Debentures –33.33% (redemption), Trade Receivables.', faded: true, blankAnswer: '| Particulars | Note No. | 2023 (₹) | 2024 (₹) | Absolute.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_005', title: 'A Comparative Statement of Profit and.',
          scaffold: { problem: 'Prepare a Comparative Statement of Profit and Loss for XYZ Ltd.',
            steps: [
            { text: 'Create the format with columns: Particulars, 2023 (Previous Year), 2024 (Current Year), Absolute Change (2024 – 2023),.' },
            { text: 'List all line items in proper P&L order: Revenue from Operations, Other Income, Total Revenue, then each expense,.' },
            { text: 'Calculate Total Revenue for each year (Revenue from Operations + Other Income): 2023 = 5,200; 2024 = 6,800.' },
            { text: 'Calculate Total Expenses for each year (sum of all expense items): 2023 = 4,550; 2024 = 6,300.' },
            { text: 'Calculate Profit Before Tax (Total Revenue – Total Expenses): 2023 = 650; 2024 = 500.' },
            { text: 'Calculate Profit After Tax (PBT – Tax Expense): 2023 = 350; 2024 = 250.' },
            { text: 'For each row, compute Absolute Change = 2024 – 2023, and % Change = (Change/2023) × 100.' },
            { text: 'Interpret key trends: Revenue grew 30.8%, but Total Expenses grew 38.5% (driven by Materials +44%, Finance +66.7%),.', faded: true, blankAnswer: 'Comparative Statement of Profit and Loss of XYZ Ltd. for.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_acc_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Financial Statement Analysis: Meaning, Significance and Objectives', spots: [
            { id: 's1', label: 'Financial Statement Analysis is the', prompt: 'Which idea is this? — Financial Statement Analysis is the systematic process of examining and interpreting a.', answer: 'Financial Statement Analysis is the', options: ['Financial Statement Analysis is the', 'Trend analysis is a technique', 'Limitations of Financial Statement Analysis', 'Horizontal Analysis compares financial statement'] },
            { id: 's2', label: 'Trend analysis is a technique', prompt: 'Which idea is this? — Trend analysis is a technique of financial statement analysis that expresses each item of.', answer: 'Trend analysis is a technique', options: ['Trend analysis is a technique', 'Financial Statement Analysis is the', 'Limitations of Financial Statement Analysis', 'Horizontal Analysis compares financial statement'] },
            { id: 's3', label: 'Limitations of Financial Statement Analysis', prompt: 'Which idea is this? — Limitations of Financial Statement Analysis refer to the inherent constraints and.', answer: 'Limitations of Financial Statement Analysis', options: ['Limitations of Financial Statement Analysis', 'Financial Statement Analysis is the', 'Trend analysis is a technique', 'Horizontal Analysis compares financial statement'] },
            { id: 's4', label: 'Horizontal Analysis compares financial statement', prompt: 'Which idea is this? — Horizontal Analysis compares financial statement items across multiple accounting periods.', answer: 'Horizontal Analysis compares financial statement', options: ['Horizontal Analysis compares financial statement', 'Financial Statement Analysis is the', 'Trend analysis is a technique', 'Limitations of Financial Statement Analysis'] },
            { id: 's5', label: 'A Comparative Balance Sheet is', prompt: 'Which idea is this? — A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,.', answer: 'A Comparative Balance Sheet is', options: ['A Comparative Balance Sheet is', 'Financial Statement Analysis is the', 'Trend analysis is a technique', 'Limitations of Financial Statement Analysis'] },
            { id: 's6', label: 'A Comparative Statement of Profit', prompt: 'Which idea is this? — A Comparative Statement of Profit and Loss is a horizontal analysis tool that presents.', answer: 'A Comparative Statement of Profit', options: ['A Comparative Statement of Profit', 'Financial Statement Analysis is the', 'Trend analysis is a technique', 'Limitations of Financial Statement Analysis'] }
          ] } }
    ],
    explore: { component: C12_AccountancyComparativeStatementsMeaningSim, prompt: 'Explore the interactive — Financial Statement Analysis: Meaning, Significance and Objectives' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_001', difficulty: 'standard',
          question: 'Financial Statement Analysis is the systematic process of examining and.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_001** (Financial Statements: Meaning and Objectives).',
          misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio.',
          parts: [
                { id: 'a', prompt: 'A student says: "Financial statement analysis is only useful for external users like investors and banks; management already knows everything about the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'calculating ratios IS financial statement analysis', '"calculating ratios IS financial statement analysis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio = CA/CL) but cannot.' }
          ],
            remediations: { 'calculating-ratios-is-financial-statement': { steps: ['If the student equates analysis with calculation: 1.', 'Ask: "You calculated Current Ratio = 2.5:1.', 'Now, the CEO asks: \'Is this good?\' What do you reply?" — force interpretation.', 'Revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Meaning and Objectives) to recall that financial.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio.',
          parts: [
                { id: 'a', prompt: '"Ratio analysis is a substitute for financial statement analysis." Critically evaluate this statement using at least three limitations of ratio analysis from.', answer: 'The statement is false',
                  options: ['The statement is false', 'calculating ratios IS financial statement analysis', '"calculating ratios IS financial statement analysis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio = CA/CL) but cannot.' }
          ],
            remediations: { 'calculating-ratios-is-financial-statement': { steps: ['If the student equates analysis with calculation: 1.', 'Ask: "You calculated Current Ratio = 2.5:1.', 'Now, the CEO asks: \'Is this good?\' What do you reply?" — force interpretation.', 'Revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Meaning and Objectives) to recall that financial.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_008', difficulty: 'standard',
          question: 'Trend analysis is a technique of financial statement analysis that expresses.',
          hint: 'If stuck on percentage calculation, review Class 8 Math node c8_math_ch8_4.',
          misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).',
          parts: [
                { id: 'a', prompt: 'Why must the base year be a \'normal\' year rather than a year with exceptional profits due to a one-time gain like sale of land? Explain in your own words.', answer: 'If the base year contains a one-time gain, its figure is artificially inflated',
                  options: ['If the base year contains a one-time gain, its figure is artificially inflated', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' },
                { id: 'b', prompt: 'A company\'s Revenue from Operations for five years (2019-2023) is: 2019: ₹40,00,000; 2020: ₹44,00,000; 2021: ₹38,00,000; 2022: ₹50,00,000; 2023: ₹56,00,000.', answer: 'Step 1: Base year (2019) figure = ₹40,00,000 → Trend % = 100',
                  options: ['Step 1: Base year (2019) figure = ₹40,00,000 → Trend % = 100', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' },
                { id: 'c', prompt: 'Two companies, A and B, show the following trend percentages for Revenue from Operations (base year 2018=100): Company A: 2018=100, 2019=105, 2020=110,.', answer: 'Company A shows steady, consistent growth of 5% per year (100→105→110→115→120),',
                  options: ['Company A shows steady, consistent growth of 5% per year (100→105→110→115→120),', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' }
          ],
            remediations: { 'the-base-year-must-always': { steps: ['Revisit the definition of \'normal base year\' in the NCERT text (Chapter 4, Analysis of Financial Statements).', 'Practice identifying abnormal years from a given 5-year profit statement (e.g., spot the year with \'Profit on sale of.', 'Re-do Diagnostic Question 2 and 5, explicitly writing why the chosen base year is appropriate or not.', 'If percentage calculation is weak, review Class 8 Math node c8_math_ch8_1 (Percentages: Definition and Meaning) and.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).',
          parts: [
                { id: 'a', prompt: 'A student computes trend percentages for a company\'s Net Profit using 2020 as base year.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'the base year must always be the earliest year in the data set (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the base year must always be the earliest year in the data set (e.g., Year 1).' }
          ],
            remediations: { 'the-base-year-must-always': { steps: ['Revisit the definition of \'normal base year\' in the NCERT text (Chapter 4, Analysis of Financial Statements).', 'Practice identifying abnormal years from a given 5-year profit statement (e.g., spot the year with \'Profit on sale of.', 'Re-do Diagnostic Question 2 and 5, explicitly writing why the chosen base year is appropriate or not.', 'If percentage calculation is weak, review Class 8 Math node c8_math_ch8_1 (Percentages: Definition and Meaning) and.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_002', difficulty: 'standard',
          question: 'Limitations of Financial Statement Analysis refer to the inherent constraints.',
          hint: 'If stuck, revisit Class 11 nodes c11_acc_cbse_02_003 (Money Measurement Concept) and.',
          misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the limitations "Ignores Price-level Changes" and "Variations in Accounting Practices" in terms of their impact on (a) intra-firm.', answer: '(a) Price-level changes primarily distort intra-firm analysis',
                  options: ['Correct answer: (a) Price-level changes primarily distort intra-firm analysis', 'limitations of financial statement analysis', 'limitations of ratio formulas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current ratio doesn\'t.' }
          ],
            remediations: { 'limitations-of-financial-statement-analysis': { steps: ['If the student cannot distinguish the two categories of limitations, have them create a two-column table: left column.', 'Map each NCERT bullet to the correct column using the textbook\'s Section 5.4 headings.', 'Then give them a fresh case: "A firm changes its depreciation method from SLM to WDV.', 'Which category does this fall under?" (Answer: Limitations of Accounting Data — Variations in Accounting Practices).'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since ratio analysis has so many limitations, management should stop using ratios and rely only on qualitative judgment for.', answer: 'The statement is flawed',
                  options: ['Correct answer: The statement is flawed', 'limitations of financial statement analysis', 'limitations of ratio formulas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current ratio doesn\'t.' },
                { id: 'b', prompt: 'Compare and contrast the limitations "Ignores Price-level Changes" and "Variations in Accounting Practices" in terms of their impact on (a) intra-firm.', answer: '(a) Price-level changes primarily distort intra-firm analysis',
                  options: ['Correct answer: (a) Price-level changes primarily distort intra-firm analysis', 'limitations of financial statement analysis', 'limitations of ratio formulas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current ratio doesn\'t.' }
          ],
            remediations: { 'limitations-of-financial-statement-analysis': { steps: ['If the student cannot distinguish the two categories of limitations, have them create a two-column table: left column.', 'Map each NCERT bullet to the correct column using the textbook\'s Section 5.4 headings.', 'Then give them a fresh case: "A firm changes its depreciation method from SLM to WDV.', 'Which category does this fall under?" (Answer: Limitations of Accounting Data — Variations in Accounting Practices).'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_003', difficulty: 'standard',
          question: 'Horizontal Analysis compares financial statement items across multiple.',
          hint: 'Revisit Class 11 Financial Statements preparation (c11_acc_cbse_08_001 to 08_012) —.',
          misconception: 'Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis = Common Size.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Horizontal Analysis compares financial statement items across multiple accounting periods',
                  options: ['Horizontal Analysis compares financial statement items across multiple accounting periods', 'Financial Statement Analysis is the systematic process of examining and interpreting a', 'Trend analysis is a technique of financial statement analysis that expresses each item of', 'Limitations of Financial Statement Analysis refer to the inherent constraints and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis = Common Size Statements** as if they are.' }
          ],
            remediations: { 'horizontal-analysis-comparative-statements-and': { steps: ['**Revisit the definitions**: Write one sentence each: "Horizontal Analysis answers: How has X changed *over time*?" and.', '**Do the "Two-Column Test"**: Take any financial statement.', 'Column A: Calculate year-over-year % change for each item (Horizontal).', 'Column B: Calculate each item as % of Revenue/Total Assets for the latest year (Vertical).'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_004', difficulty: 'standard',
          question: 'A Comparative Balance Sheet is a horizontal analysis tool that presents the.',
          hint: 'If stuck, revisit Class 11 Balance Sheet format (c11_acc_cbse_08_006,.',
          misconception: 'Students consistently calculate Percentage Change using the Current Year as the base (denominator) instead of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,',
                  options: ['A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,', 'Financial Statement Analysis is the systematic process of examining and interpreting a', 'Trend analysis is a technique of financial statement analysis that expresses each item of', 'Limitations of Financial Statement Analysis refer to the inherent constraints and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently calculate Percentage Change using the Current Year as the base (denominator) instead of the Previous Year.' }
          ],
            remediations: { 'students-consistently-calculate-percentage-chang': { steps: ['If the student uses Current Year as denominator: 1) Write the correct formula prominently: %Δ = (CY – PY)/PY × 100.', '2) Have them re-calculate 5 items from Worked Example 1 using both formulas and circle the difference.', '3) Explain: "PY is the starting line; we measure how far we\'ve moved *from* it." If they miss negative signs on.', '2) Practice 3 items where amount falls — insist on brackets.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_005', difficulty: 'standard',
          question: 'A Comparative Statement of Profit and Loss is a horizontal analysis tool that.',
          hint: 'If stuck on format, revisit c11_acc_cbse_08_004 for P&L line items.',
          misconception: 'Students treat percentage change in individual line items as independent indicators of performance.',
          parts: [
                { id: 'a', prompt: 'A student prepares a Comparative Statement and finds that Revenue from Operations increased by 20% but Cost of Materials Consumed increased by 35%.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'interpret the comparative statement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat percentage change in individual line items as independent indicators of performance.' },
                { id: 'b', prompt: 'Given: Previous Year Revenue from Operations = ₹12,00,000; Current Year Revenue from Operations = ₹15,00,000; Previous Year Cost of Materials Consumed =.', answer: 'Revenue: Absolute Change = ₹3,00,000',
                  options: ['Revenue: Absolute Change = ₹3,00,000', 'margin improved because Gross Profit increased'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat percentage change in individual line items as independent indicators of performance.' }
          ],
            remediations: { 'students-treat-percentage-change-in': { steps: ['Revisit c11_acc_cbse_08_004 and c11_acc_cbse_08_005 to reconstruct the Statement of Profit and Loss format and.', 'Practice calculating Gross Profit, Operating Profit, PBT, PAT for single years until automatic.', 'Take a simple 2-year dataset (e.g., NCERT Illustration 1), build the comparative statement manually on paper — write.', 'For each line item, write one sentence interpreting the change (e.g., "Revenue grew 20% due to volume increase;.', 'Re-attempt Diagnostic Question 3. If margin interpretation still wrong, review c8_math_ch8_6 (Percentage.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat percentage change in individual line items as independent indicators of performance.',
          parts: [
                { id: 'a', prompt: 'A company\'s Comparative Statement shows: Finance Costs increased by 200% (from ₹50,000 to ₹1,50,000), while Profit Before Tax decreased by 40%.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', '3% of revenue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat percentage change in individual line items as independent indicators of performance.' }
          ],
            remediations: { 'students-treat-percentage-change-in': { steps: ['Revisit c11_acc_cbse_08_004 and c11_acc_cbse_08_005 to reconstruct the Statement of Profit and Loss format and.', 'Practice calculating Gross Profit, Operating Profit, PBT, PAT for single years until automatic.', 'Take a simple 2-year dataset (e.g., NCERT Illustration 1), build the comparative statement manually on paper — write.', 'For each line item, write one sentence interpreting the change (e.g., "Revenue grew 20% due to volume increase;.', 'Re-attempt Diagnostic Question 3. If margin interpretation still wrong, review c8_math_ch8_6 (Percentage.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
