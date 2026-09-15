import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch08_p1: SimDef = {
    id: 'v3_c12_acc_ch08_p1',
    title: 'Analysis of Financial Statements · Part 1/2',
    subtitle: 'The ratio says 2:1. The truth says \'depends\'. Learn the difference.',
    classLevel: 12, subject: 'accountancy', topic: 'Analysis of Financial Statements · Part 1/2',
    chapters: ['c12_acc_ch08'],
    nodeIds: ['c12_acc_cbse_08_001', 'c12_acc_cbse_08_002', 'c12_acc_cbse_08_003', 'c12_acc_cbse_08_004', 'c12_acc_cbse_08_005', 'c12_acc_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Credit analyst vetting a ₹50 lakh loan', intro: 'Financial statements are raw numbers until someone asks the right questions — that someone is the analyst.', goal: 'State the objectives of financial statement analysis and apply its limitations to real comparisons.' },
    discovery: {
        question: 'Two firms report identical current ratios of 2:1 — but one uses FIFO with straight-line depreciation, the other LIFO with written-down value. Can you say their liquidity is equal?',
        options: ['No — different accounting policies can manufacture identical ratios from very different realities', 'Yes — identical ratios always mean identical liquidity', 'Yes — ratio analysis eliminates all policy differences automatically', 'No — because LIFO is illegal under Indian accounting standards'],
        answer: 'No — different accounting policies can manufacture identical ratios from very different realities',
        hook: 'Numbers feel objective; they\'re not. Analysis begins where blind trust ends — every statement rests on historical cost, policy choices and estimates that the raw ratio never reveals.',
    },
    teaching: [
        { title: 'Financial Statement Analysis: Meaning, Significance and Objectives', text: 'Financial Statement Analysis is the systematic process of examining and interpreting a company\'s financial statements (Balance Sheet, Statement of Profit and Loss, Cash Flow Statement) to evaluate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play the bank manager: take raw Balance Sheet and P&L data from a loan applicant, run the analysis, and stress-test your conclusion against the known limitations of financial statements.',
        labels: ['Financial Statement Analysis: Meaning,', 'Limitations of Financial Statement', 'Horizontal Analysis vs Vertical', 'Comparative Statements: Preparation', 'Common Size Statements: Preparation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_001', title: 'Financial Statement Analysis: Meaning, Significance and Objectives',
          caseStudy: { intro: 'Imagine you are a bank manager deciding whether to sanction a ₹50 lakh loan to a small manufacturing firm.',
            decisions: [{ prompt: 'State the primary purpose of financial statement analysis according to NCERT. Why is it considered an "integral part of accounting"?', options: [
                { text: 'The primary purpose is to meet the information needs of decision-makers (internal and', outcome: 'The primary purpose is to meet the information needs of decision-makers (internal and external.' },
                { text: 'information', outcome: 'Not quite — Students often believe that "calculating ratios IS financial statement analysis." They memorise.', reveals: 'calculating-ratios-is-financial-statement' },
                { text: 'to calculate profit', outcome: 'Not quite — Students often believe that "calculating ratios IS financial statement analysis." They memorise.', reveals: 'calculating-ratios-is-financial-statement' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_002', title: 'Limitations of Financial Statement Analysis',
          caseStudy: { intro: 'Imagine you are an investor comparing two companies: Company A uses FIFO inventory valuation and straight-line depreciation, while Company B uses LIFO and.',
            decisions: [{ prompt: 'State any two limitations of financial statement analysis that arise directly from the use of historical cost accounting.', options: [
                { text: 'Correct answer: (1) Financial statements ignore price-level changes (inflation), making', outcome: 'Correct answer: (1) Financial statements ignore price-level changes (inflation), making.' },
                { text: 'ratios are hard to calculate', outcome: 'Not quite — Students often think "limitations of financial statement analysis" means "limitations of ratio.', reveals: 'limitations-of-financial-statement-analysis' },
                { text: 'limitations of financial statement analysis', outcome: 'Not quite — Students often think "limitations of financial statement analysis" means "limitations of ratio.', reveals: 'limitations-of-financial-statement-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_003', title: 'Horizontal Analysis vs Vertical Analysis: Distinction',
          caseStudy: { intro: 'Imagine you are analysing the financial health of a company like Tata Motors.',
            decisions: [{ prompt: 'State the primary base of comparison used in Vertical Analysis of a Statement of Profit and Loss.', options: [
                { text: 'The primary base is **Revenue from Operations (Net Sales)**, expressed as 100%, against', outcome: 'The primary base is **Revenue from Operations (Net Sales)**, expressed as 100%, against which all.' },
                { text: 'Total Assets', outcome: 'Not quite — Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis.', reveals: 'horizontal-analysis-comparative-statements-and' },
                { text: 'Previous Year\'s Revenue', outcome: 'Not quite — Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis.', reveals: 'horizontal-analysis-comparative-statements-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_004', title: 'Comparative Statements: Preparation of Comparative Balance Sheet',
          scaffold: { problem: 'Prepare a Comparative Balance Sheet from the following data of XYZ Ltd. as on 31st March 2023 and 2024:',
            steps: [
            { text: 'Set up the Comparative Balance Sheet format with six columns: Particulars, Note No., 2023 (₹), 2024 (₹), Absolute.' },
            { text: 'List all items in Schedule III order — Equity & Liabilities: Shareholders\' Funds (Equity Share Capital, Reserves &.' },
            { text: 'For each item, calculate Absolute Change = 2024 Amount – 2023 Amount.' },
            { text: 'For each item, calculate Percentage Change = (Absolute Change ÷ 2023 Amount) × 100. Round to two decimal places.' },
            { text: 'Compute sub-totals: Shareholders\' Funds, Non-current Liabilities, Current Liabilities, Total Equity & Liabilities.' },
            { text: 'Interpret key changes: Equity Share Capital +20% (fresh issue), Debentures –33.33% (redemption), Trade Receivables.', faded: true, blankAnswer: '| Particulars | Note No. | 2023 (₹) | 2024 (₹) | Absolute.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_005', title: 'Comparative Statements: Preparation of Comparative Statement of Profit and Loss',
          scaffold: { problem: 'Prepare a Comparative Statement of Profit and Loss for XYZ Ltd.',
            steps: [
            { text: 'Create the format with columns: Particulars, 2023 (Previous Year), 2024 (Current Year), Absolute Change (2024 – 2023).' },
            { text: 'List all line items in proper P&L order: Revenue from Operations, Other Income, Total Revenue, then each expense.' },
            { text: 'Calculate Total Revenue for each year (Revenue from Operations + Other Income): 2023 = 5,200; 2024 = 6,800.' },
            { text: 'Calculate Total Expenses for each year (sum of all expense items): 2023 = 4,550; 2024 = 6,300.' },
            { text: 'Calculate Profit Before Tax (Total Revenue – Total Expenses): 2023 = 650; 2024 = 500.' },
            { text: 'Calculate Profit After Tax (PBT – Tax Expense): 2023 = 350; 2024 = 250.' },
            { text: 'For each row, compute Absolute Change = 2024 – 2023, and % Change = (Change/2023) × 100.' },
            { text: 'Interpret key trends: Revenue grew 30.8%, but Total Expenses grew 38.5% (driven by Materials +44%, Finance +66.7%).', faded: true, blankAnswer: 'Comparative Statement of Profit and Loss of XYZ Ltd. for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_08_006', title: 'Common Size Statements: Preparation of Common Size Balance Sheet',
          scaffold: { problem: 'Prepare a Common Size Balance Sheet from the following Balance Sheet of **Suvidha Traders** as on 31st March 2024.',
            steps: [
            { text: 'Verify the Balance Sheet balances (Total Assets = Total Liabilities & Equity = ₹10,00,000).' },
            { text: 'Set up a 3-column format: Particulars, Amount (₹), Percentage (%).' },
            { text: 'For **each asset item**, calculate % = (Item Amount / 10,00,000) × 100.' },
            { text: 'For **each liability/equity item**, calculate % = (Item Amount / 10,00,000) × 100.' },
            { text: 'Verify column totals: Assets % = 40+10+20+15+10+5 = 100%. Liabilities & Equity % = 50+10+20+15+5 = 100%.', faded: true, blankAnswer: '**Common Size Balance Sheet of Suvidha Traders as on 31st.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a bank\'s loan desk, a student appraises a textile firm: Current Ratio 2:1 (comfortable), but inventory is ₹50 lakh of the ₹80 lakh current assets and the Quick Ratio is 0.75:1 against an industry norm of 1:1. Her manager asks whether to sanction a ₹20 lakh working-capital loan.',
            decisions: [{ prompt: 'What does the analysis actually say?', options: [
                { text: 'Flag the divergence: the current ratio is inventory-driven while the quick ratio sits below industry — sanction only with conditions like inventory hypothecation and turnover monitoring.', outcome: 'Ratios are whistle-blowers, not verdicts: interpretation against benchmarks and composition turns numbers into a decision.' },
                { text: 'Approve unconditionally — a 2:1 current ratio meets the textbook norm, so liquidity is fine.', outcome: 'That\'s calculation, not analysis: 62% of the current assets are inventory, which the quick ratio exposes as weak immediate liquidity.', reveals: 'ratio-number-is-analysis' },
                { text: 'Reject outright — a quick ratio below 1:1 means the firm is insolvent.', outcome: 'A single sub-norm ratio signals risk, not death; analysis weighs the whole picture — strong gross current cover plus slow-moving stock argues for a conditional sanction, not a blanket no.', reveals: 'one-ratio-decides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read statements like a lender — extracting signal while doubting the noise. Objective-and-limitation questions are board favourites; sceptical reading is a career skill.',
            decisions: [{ prompt: 'What comes next? Analysis of Financial Statements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Analysis of Financial Statements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_001', difficulty: 'standard',
          question: 'Financial Statement Analysis is the systematic process of examining and.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_001** (Financial Statements: Meaning and Objectives).',
          misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio.',
          parts: [
                { id: 'a', prompt: 'A student says: "Financial statement analysis is only useful for external users like investors and banks; management already knows everything about the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'calculating ratios IS financial statement analysis', '"calculating ratios IS financial statement analysis'],
                  hint: 'If stuck, revisit **c11_acc_cbse_08_001** (Financial Statements: Meaning and Objectives) and.',
                  misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio = CA/CL) but cannot.' }
          ],
            remediations: { 'calculating-ratios-is-financial-statement': { steps: ['If the student equates analysis with calculation: 1.', 'Ask: "You calculated Current Ratio = 2.5:1.', 'Now, the CEO asks: \'Is this good?\' What do you reply?" — force interpretation.', 'Revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Meaning and Objectives) to recall that financial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio.',
          parts: [
                { id: 'a', prompt: '"Ratio analysis is a substitute for financial statement analysis." Critically evaluate this statement using at least three limitations of ratio analysis from.', answer: 'The statement is false',
                  options: ['The statement is false', 'calculating ratios IS financial statement analysis', '"calculating ratios IS financial statement analysis'],
                  hint: 'If stuck, revisit **c11_acc_cbse_08_001** (Financial Statements: Meaning and Objectives) and.',
                  misconception: 'Students often believe that "calculating ratios IS financial statement analysis." They memorise formulas (Current Ratio = CA/CL) but cannot.' }
          ],
            remediations: { 'calculating-ratios-is-financial-statement': { steps: ['If the student equates analysis with calculation: 1.', 'Ask: "You calculated Current Ratio = 2.5:1.', 'Now, the CEO asks: \'Is this good?\' What do you reply?" — force interpretation.', 'Revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Meaning and Objectives) to recall that financial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_002', difficulty: 'standard',
          question: 'Limitations of Financial Statement Analysis refer to the inherent constraints.',
          hint: 'If stuck, revisit Class 11 nodes c11_acc_cbse_02_003 (Money Measurement Concept) and.',
          misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the limitations "Ignores Price-level Changes" and "Variations in Accounting Practices" in terms of their impact on (a) intra-firm.', answer: 'Correct answer: (a) Price-level changes primarily distort intra-firm analysis',
                  options: ['Correct answer: (a) Price-level changes primarily distort intra-firm analysis', 'limitations of financial statement analysis', 'limitations of ratio formulas'],
                  hint: 'If stuck, revisit Class 11 nodes c11_acc_cbse_02_003 (Money Measurement Concept) and.',
                  misconception: 'Students often think "limitations of financial statement analysis" means "limitations of ratio formulas" (e.g., current ratio doesn\'t.' }
          ],
            remediations: { 'limitations-of-financial-statement-analysis': { steps: ['If the student cannot distinguish the two categories of limitations, have them create a two-column table: left column.', 'Map each NCERT bullet to the correct column using the textbook\'s Section 5.4 headings.', 'Then give them a fresh case: "A firm changes its depreciation method from SLM to WDV.', 'Which category does this fall under?" (Answer: Limitations of Accounting Data — Variations in Accounting Practices).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_003', difficulty: 'standard',
          question: 'Horizontal Analysis compares financial statement items across multiple.',
          hint: 'Revisit Class 11 Financial Statements preparation (c11_acc_cbse_08_001 to 08_012).',
          misconception: 'Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis = Common Size.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Horizontal Analysis compares financial statement items across multiple accounting periods',
                  options: ['Horizontal Analysis compares financial statement items across multiple accounting periods', 'Financial Statement Analysis is the systematic process of examining and interpreting a', 'Limitations of Financial Statement Analysis refer to the inherent constraints and', 'A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,'],
                  hint: 'Revisit Class 11 Financial Statements preparation (c11_acc_cbse_08_001 to 08_012) — specifically.',
                  misconception: 'Students often believe **Horizontal Analysis = Comparative Statements** and **Vertical Analysis = Common Size Statements** as if they are.' }
          ],
            remediations: { 'horizontal-analysis-comparative-statements-and': { steps: ['**Revisit the definitions**: Write one sentence each: "Horizontal Analysis answers: How has X changed *over time*?" and.', '**Do the "Two-Column Test"**: Take any financial statement.', 'Column A: Calculate year-over-year % change for each item (Horizontal).', 'Column B: Calculate each item as % of Revenue/Total Assets for the latest year (Vertical).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_004', difficulty: 'standard',
          question: 'A Comparative Balance Sheet is a horizontal analysis tool that presents the.',
          hint: 'If stuck, revisit Class 11 Balance Sheet format (c11_acc_cbse_08_006.',
          misconception: 'Students consistently calculate Percentage Change using the Current Year as the base (denominator) instead of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,',
                  options: ['A Comparative Balance Sheet is a horizontal analysis tool that presents the assets,', 'Financial Statement Analysis is the systematic process of examining and interpreting a', 'Limitations of Financial Statement Analysis refer to the inherent constraints and', 'Horizontal Analysis compares financial statement items across multiple accounting periods'],
                  hint: 'If stuck, revisit Class 11 Balance Sheet format (c11_acc_cbse_08_006, c11_acc_cbse_08_007) and the.',
                  misconception: 'Students consistently calculate Percentage Change using the Current Year as the base (denominator) instead of the Previous Year.' }
          ],
            remediations: { 'students-consistently-calculate-percentage-chang': { steps: ['If the student uses Current Year as denominator: 1) Write the correct formula prominently: %Δ = (CY – PY)/PY × 100.', '2) Have them re-calculate 5 items from Worked Example 1 using both formulas and circle the difference.', '3) Explain: "PY is the starting line; we measure how far we\'ve moved *from* it." If they miss negative signs.', '2) Practice 3 items where amount falls — insist on brackets.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_005', difficulty: 'standard',
          question: 'A Comparative Statement of Profit and Loss is a horizontal analysis tool that.',
          hint: 'If stuck on format, revisit c11_acc_cbse_08_004 for P&L line items.',
          misconception: 'Students treat percentage change in individual line items as independent indicators of performance.',
          parts: [
                { id: 'a', prompt: 'A student prepares a Comparative Statement and finds that Revenue from Operations increased by 20% but Cost of Materials Consumed increased by 35%.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'interpret the comparative statement'],
                  hint: 'If stuck on format, revisit c11_acc_cbse_08_004 for P&L line items.',
                  misconception: 'Students treat percentage change in individual line items as independent indicators of performance.' },
                { id: 'b', prompt: 'Given: Previous Year Revenue from Operations = ₹12,00,000; Current Year Revenue from Operations = ₹15,00,000; Previous Year Cost of Materials Consumed.', answer: 'Revenue: Absolute Change = ₹3,00,000',
                  options: ['Revenue: Absolute Change = ₹3,00,000', 'margin improved because Gross Profit increased'],
                  hint: 'If stuck on format, revisit c11_acc_cbse_08_004 for P&L line items.',
                  misconception: 'Students treat percentage change in individual line items as independent indicators of performance.' }
          ],
            remediations: { 'students-treat-percentage-change-in': { steps: ['Revisit c11_acc_cbse_08_004 and c11_acc_cbse_08_005 to reconstruct the Statement of Profit and Loss format and.', 'Practice calculating Gross Profit, Operating Profit, PBT, PAT for single years until automatic.', 'Take a simple 2-year dataset (e.g., NCERT Illustration 1), build the comparative statement manually on paper — write.', 'For each line item, write one sentence interpreting the change (e.g., "Revenue grew 20% due to volume increase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_08_006', difficulty: 'standard',
          question: 'A Common Size Balance Sheet expresses each item of the Balance Sheet (assets.',
          hint: 'If stuck, revisit Class 11 Balance Sheet classification (c11_acc_cbse_08_007.',
          misconception: 'Students often treat Common Size Balance Sheet as merely "adding a percentage column" without grasping that **the base.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Common Size Balance Sheet expresses each item of the Balance Sheet (assets,',
                  options: ['A Common Size Balance Sheet expresses each item of the Balance Sheet (assets,', 'Financial Statement Analysis is the systematic process of examining and interpreting a', 'Limitations of Financial Statement Analysis refer to the inherent constraints and', 'Horizontal Analysis compares financial statement items across multiple accounting periods'],
                  hint: 'If stuck, revisit Class 11 Balance Sheet classification (c11_acc_cbse_08_007, c11_acc_cbse_08_008).',
                  misconception: 'Students often treat Common Size Balance Sheet as merely "adding a percentage column" without grasping that **the base must be Total Assets.' }
          ],
            remediations: { 'students-often-treat-common-size': { steps: ['If the student cannot identify the correct base or the two sides don\'t sum to 100%: 1.', '**Revisit the Accounting Equation:** Use node `c11_acc_cbse_01_011` (Accounting Equation: Assets = Liabilities.', '**Practice the "100% Check":** Give a 5-item Balance Sheet.', 'Have the student calculate percentages for *all* items on both sides.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
