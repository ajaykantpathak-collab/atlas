import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ca_ch02 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ca_ch02: SimDef = {
    id: 'v3_c12_ca_ch02',
    title: 'Basic Concepts Of Spreadsheet',
    subtitle: 'One missing $ sign just zeroed 99 rows of GST',
    classLevel: 12, subject: 'computerised_accounting', topic: 'Basic Concepts Of Spreadsheet',
    chapters: ['c12_ca_ch02'],
    nodeIds: ['c12_ca_cbse_02_001', 'c12_ca_cbse_02_002', 'c12_ca_cbse_02_003', 'c12_ca_cbse_02_004', 'c12_ca_cbse_02_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Spreadsheet modeller', intro: 'A spreadsheet isn\'t a digital table — it\'s a live model where one input change recalculates everything. Learn to control it.', goal: 'Master cell referencing, formulas vs functions, and build what-if models for accounting data.' },
    discovery: {
        question: 'You write =E2*G1 for GST (rate in G1) and copy it down 100 rows. Row 2 is perfect; everything below is zero. What went wrong?',
        options: ['G1 was a relative reference — copied down it became G2, G3… empty cells, so GST silently computed as zero', 'Excel can only copy formulas 10 rows down', 'The formula needed to be typed fresh in every row', 'Zero means those rows owed no GST'],
        answer: 'G1 was a relative reference — copied down it became G2, G3… empty cells, so GST silently computed as zero',
        hook: 'The deadliest spreadsheet error is silent: relative references shift as you copy, and a missing $ turns one rate cell into a column of wrong answers that look right. Absolute referencing ($G$1) is the fix — and the most-tested practical skill.',
    },
    teaching: [
        { title: 'Basic Concepts Of Spreadsheet', text: 'A spreadsheet is a computer application that organizes data in a grid of rows and columns forming cells, where each cell can hold a value (numeric, text, date), a formula (arithmetic expression.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ca_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a what-if accounting model for a wholesale store: revenue, GST and totals across 200 rows using relative, absolute and named references — then change the tax rate in one cell and watch every figure ripple.',
        labels: ['Basic Concepts Of Spreadsheet', 'Data Entry, Text Management', 'Data Formatting', 'Output Reports', 'Preparation Of Reports Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_001', title: 'Basic Concepts Of Spreadsheet',
          caseStudy: { intro: 'Imagine you are the accountant for a small Delhi-based wholesale kirana store.',
            decisions: [{ prompt: 'What is the cell address of the cell located at the intersection of column IV and row 65536 in Excel 2007, and how many total cells exist.', options: [
                { text: 'The cell address is IV65536', outcome: 'The cell address is IV65536. Total cells = 65,536 rows × 256 columns = 16,777,216 cells.' },
                { text: 'IV65536 has 1,65,00,000 cells', outcome: 'Not quite — Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead.', reveals: 'formulas-and-functions-are-the' },
                { text: 'formulas and functions are the same thing', outcome: 'Not quite — Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead.', reveals: 'formulas-and-functions-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_002', title: 'Data Entry, Text Management And Cell',
          caseStudy: { intro: 'Imagine you are maintaining a sales register for a small shop: every day you enter the date, product name, quantity sold, and price.',
            decisions: [{ prompt: 'What is the purpose of the fill handle in Excel, and how does it differ from using the Fill Series command on the Home tab?', options: [
                { text: 'The fill handle (small black square at the bottom-right of a selected cell) allows quick', outcome: 'The fill handle (small black square at the bottom-right of a selected cell) allows quick dragging.' },
                { text: 'fill handle only copies values', outcome: 'Not quite — Students often think the TEXT function changes the underlying cell value.', reveals: 'the-text-function-changes-the' },
                { text: 'the TEXT function changes the underlying cell value', outcome: 'Not quite — Students often think the TEXT function changes the underlying cell value.', reveals: 'the-text-function-changes-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_003', title: 'Data Formatting',
          caseStudy: { intro: 'Imagine you have just received a raw sales dump from your family\'s small wholesale business: 500 rows of dates, product codes, quantities, unit prices, and.',
            decisions: [{ prompt: 'What is the default alignment for text and numeric values in an Excel cell before any formatting is applied?', options: [
                { text: 'By default, text is left-aligned and numeric values (including dates and times) are', outcome: 'By default, text is left-aligned and numeric values (including dates and times) are right-aligned.' },
                { text: 'both are centered', outcome: 'Not quite — Students believe that applying a format (e.g., Currency, Percentage, Date) *changes the stored.', reveals: 'applying-a-format-e' },
                { text: 'text is right-aligned', outcome: 'Not quite — Students believe that applying a format (e.g., Currency, Percentage, Date) *changes the stored.', reveals: 'applying-a-format-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_004', title: 'Output Reports',
          caseStudy: { intro: 'Imagine you are an accounts intern at a Delhi-based firm. Your manager asks you to print a "Monthly Sales Summary" for the last quarter — but only the.',
            decisions: [{ prompt: 'What is the default print behavior in Excel if no print area is defined?', options: [
                { text: 'By default, Excel prints all data on the current worksheet (all cells with content)', outcome: 'By default, Excel prints all data on the current worksheet (all cells with content).' },
                { text: 'only the selected cells', outcome: 'Not quite — Students believe "Print Area" and "Print Selection" are the same.', reveals: 'print-area-and-print-selection' },
                { text: 'only the visible screen area', outcome: 'Not quite — Students believe "Print Area" and "Print Selection" are the same.', reveals: 'print-area-and-print-selection' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_ca_cbse_02_005', title: 'Preparation Of Reports Using Pivot Table',
          scaffold: { problem: 'M/s Sharma Electronics has monthly sales data for 6 months (Jan-Jun) across 3 products (Mobile, Laptop, Tablet) in 2 regions (North.',
            steps: [
            { text: 'Set up base model in cells B1:D4. B1: Mobile units (120), C1: Laptop units (45), D1: Tablet units (80).' },
            { text: 'In column F (F5:F9), enter growth rates: 5%, 10%, 15%, 20%, 25%.' },
            { text: 'Select range F4:G9. Go to Data → What-If Analysis → Data Table. Column input cell: $B$1 (Mobile units cell).' },
            { text: 'Observe column G now shows projected July revenue for each growth rate: 5%→₹71,29,500, 10%→₹74,69,000, 15%→₹78,08,500.' },
            { text: 'Verify manually: 5% growth → Mobile units = 126 → Revenue = 126×15000 + 45×55000 + 80×22000 = 18,90,000 + 24,75,000.', faded: true, blankAnswer: 'Projected July revenues: 5% growth = ₹61,25,000; 10%.' }
            ] } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An accountant builds a GST column: revenue in E, the 18% rate sitting in cell G1, and writes =E2*G1 in F2. Row 2 is correct, but after copying down, every row below shows GST as zero.',
            decisions: [{ prompt: 'What went wrong and what\'s the fix?', options: [
                { text: 'The rate reference was relative — copying shifted it to G2, G3… which are empty; rewrite it as =E2*$G$1 so the rate cell stays locked while E2 slides down each row.', outcome: 'Absolute referencing ($G$1) pins the constant while the relative part tracks the row — one input cell then drives what-if changes everywhere.' },
                { text: 'Excel broke — the only reliable fix is to retype =E3*G1, =E4*G1 and so on by hand for every row.', outcome: 'Retyping each row defeats the point and invites typos; locking the reference once is exactly what the fill operation is built for.', reveals: 'retype-formula-each-row' },
                { text: 'Cell references never move when copied, so the zeroes must come from bad data in column E.', outcome: 'Relative references shift by design — that\'s why the row-2 result looked right while everything below silently multiplied by empty cells.', reveals: 'references-never-shift' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_02_005', title: 'You made it',
          caseStudy: { intro: 'You now build models, not tables — one input cell drives hundreds of correct answers. This is the exact skill board practicals and real accounting desks both grade you on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_001', difficulty: 'standard',
          question: 'A spreadsheet is a computer application that organizes data in a grid of rows.',
          hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
          misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2`.',
          parts: [
                { id: 'a', prompt: 'What is the cell address of the cell located at the intersection of column IV and row 65536 in Excel 2007, and how many total cells exist in one worksheet?', answer: 'The cell address is IV65536',
                  options: ['The cell address is IV65536', 'IV65536 has 1,65,00,000 cells', 'formulas and functions are the same thing'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' },
                { id: 'b', prompt: 'In cell E4 you enter the formula `=B4*C4` to calculate Revenue (Qty × Price). You copy this formula down to E5:E100.', answer: 'In E5 the formula becomes `=B5*C5`, in E6 `=B6*C6`, ..., in E100 `=B100*C100`',
                  options: ['In E5 the formula becomes `=B5*C5`, in E6 `=B6*C6`, ..., in E100 `=B100*C100`', 'references stay B4 and C4', 'references become $B$4 and $C$4', 'formulas and functions are the same thing'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' },
                { id: 'c', prompt: 'You have GST rate 18% in cell G1. In column F you want GST Amount = Revenue × GST_Rate for rows 2 to 100.', answer: 'Correct formula: `=E2*$G$1` (or `=E2*G$1`',
                  options: ['Correct formula: `=E2*$G$1` (or `=E2*G$1`', 'formulas and functions are the same thing'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' },
                { id: 'd', prompt: 'Compare the formulas `=IF(A2>10000, "High", "Low")` and `=IF(A2>10000, "High", IF(A2>5000, "Medium", "Low"))`.', answer: 'First formula returns "Low" (7500 ≤ 10000)',
                  options: ['First formula returns "Low" (7500 ≤ 10000)', 'both return Low', 'nested IF gives error', 'formulas and functions are the same thing'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' }
          ],
            remediations: { 'formulas-and-functions-are-the': { steps: ['If the student confuses formulas/functions or misuses cell references: (1) Have them create a 5-row sheet: Col A=Qty.', 'In C2 type `=A2*B2` (formula).', 'In C7 type `=SUM(C2:C6)` (function).', 'Ask: "What happens if I insert a row between 3 and 4?" — formula in new C4 auto-fills, SUM expands to C2:C7.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2`.',
          parts: [
                { id: 'a', prompt: 'A student writes `=VLOOKUP(100, A2:D10, 5, FALSE)` to find a value in the 5th column of a 4-column table (A:D). What error will Excel return, and why?', answer: 'Excel returns `#REF!`',
                  options: ['Excel returns `#REF!`', '#VALUE!', 'column not found', 'lookup value not found'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' },
                { id: 'b', prompt: 'Design a mini-spreadsheet (describe layout, not build) to calculate EMI for a ₹10 lakh home loan at 8.5% p.a. for 20 years, using the PMT function.', answer: 'which cells hold inputs (rate, nper, pv), (',
                  options: ['which cells hold inputs (rate, nper, pv), (', 'formulas and functions are the same thing'],
                  hint: 'If stuck on cell references: revisit c9_math_ch1_1 (coordinate geometry) and practice "A1.',
                  misconception: 'Students believe "formulas and functions are the same thing" and write `=SUM(A1+A2)` instead of `=A1+A2` or `=SUM(A1:A2)`.' }
          ],
            remediations: { 'formulas-and-functions-are-the': { steps: ['If the student confuses formulas/functions or misuses cell references: (1) Have them create a 5-row sheet: Col A=Qty.', 'In C2 type `=A2*B2` (formula).', 'In C7 type `=SUM(C2:C6)` (function).', 'Ask: "What happens if I insert a row between 3 and 4?" — formula in new C4 auto-fills, SUM expands to C2:C7.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_002', difficulty: 'standard',
          question: 'Data entry in spreadsheets refers to the process of inputting, validating, and.',
          hint: 'If stuck, review c12_ca_cbse_02_001: practice moving with arrow keys, entering.',
          misconception: 'Students often think the TEXT function changes the underlying cell value.',
          parts: [
                { id: 'a', prompt: 'A student imports a CSV file where the first row contains column headers "Date,Product,Qty,Price".', answer: 'Left alignment indicates Excel treated the dates as text, likely',
                  options: ['Left alignment indicates Excel treated the dates as text, likely', 're-import with different settings', 'the TEXT function changes the underlying cell value'],
                  hint: 'If stuck, review c12_ca_cbse_02_001: practice moving with arrow keys, entering =SUM(A1:A5), and.',
                  misconception: 'Students often think the TEXT function changes the underlying cell value.' },
                { id: 'b', prompt: 'Compare a drop-down list created via Data Validation → List with source =$G$3:$G$9 versus typing "Sales,Finance,HR" directly in the Source box.', answer: 'Using a named range (or cell reference) is better',
                  options: ['Using a named range (or cell reference) is better', 'both are same', 'the TEXT function changes the underlying cell value'],
                  hint: 'If stuck, review c12_ca_cbse_02_001: practice moving with arrow keys, entering =SUM(A1:A5), and.',
                  misconception: 'Students often think the TEXT function changes the underlying cell value.' }
          ],
            remediations: { 'the-text-function-changes-the': { steps: ['Revisit the difference between cell formatting (Format Cells → Number tab) and the TEXT function: formatting changes.', 'Practice: In a blank sheet, enter 1234.5 in A1.', 'Observe C1=1244.5, D1=#VALUE!.', 'Review CONCATENATE: =CONCATENATE("Price: ", 1234.5) → "Price: 1234.5".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_003', difficulty: 'standard',
          question: 'Data formatting in spreadsheets refers to the systematic application of visual.',
          hint: 'If confused about why a formula gives unexpected results after formatting, revisit the.',
          misconception: 'Students believe that applying a format (e.g., Currency, Percentage, Date) *changes the stored value* in the cell.',
          parts: [
                { id: 'a', prompt: 'Compare "Format as Table" (Home → Styles → Format as Table) with manually applying banded row fill colors via Conditional Formatting → New Rule → Use a formula.', answer: '"Format as Table" is more robust',
                  options: ['"Format as Table" is more robust', 'applying a format (e'],
                  hint: 'If confused about why a formula gives unexpected results after formatting, revisit the "Value Rule".',
                  misconception: 'Students believe that applying a format (e.g., Currency, Percentage, Date) *changes the stored value* in the cell.' }
          ],
            remediations: { 'applying-a-format-e': { steps: ['Have the student enter `0.18` in A1, apply % format (shows `18%`), then in B1 enter `=A1*100`.', 'Why?" (Shows 18, not 1800).', 'Open Format Cells → Number tab → click between Category and Sample: point out "The sample changes, the value in the.', 'Assign a micro-task: create a column of 5 decimals (0.05, 0.12, etc.), apply % format, then use SUM on the column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_004', difficulty: 'standard',
          question: 'Output Reports in a spreadsheet refer to the process of configuring.',
          hint: 'Revisit c12_ca_cbse_02_001 (cell addressing, workbook/worksheet structure) and.',
          misconception: 'Students believe "Print Area" and "Print Selection" are the same.',
          parts: [
                { id: 'a', prompt: 'A student sets a print area as A1:D20, then later adds data in column E. They print and column E is missing. Why did this happen, and how to fix it?', answer: 'The print area is static',
                  options: ['The print area is static', 'Excel updates print area automatically', 'Print Area', 'Print Selection'],
                  hint: 'Revisit c12_ca_cbse_02_001 (cell addressing, workbook/worksheet structure) and c12_ca_cbse_02_003.',
                  misconception: 'Students believe "Print Area" and "Print Selection" are the same.' },
                { id: 'b', prompt: 'Compare printing a non-contiguous range (e.g., A1:C10 and E1:G10) vs. printing the whole worksheet. How does Excel handle page breaks in each case?', answer: 'Non-contiguous ranges print on separate pages (each selection = new page)',
                  options: ['Non-contiguous ranges print on separate pages (each selection = new page)', 'they print side-by-side on one page', 'Print Area', 'Print Selection'],
                  hint: 'Revisit c12_ca_cbse_02_001 (cell addressing, workbook/worksheet structure) and c12_ca_cbse_02_003.',
                  misconception: 'Students believe "Print Area" and "Print Selection" are the same.' }
          ],
            remediations: { 'print-area-and-print-selection': { steps: ['Open a sample workbook with data in A1:F20 and G1:J20.', 'Select A1:F20 → Page Layout → Print Area → Set Print Area.', 'Save, close, reopen → verify Print Area persists.', 'Now select G1:J20 → Ctrl+P → Print Selection → print to PDF.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_02_005', difficulty: 'standard',
          question: 'A Pivot Table is an interactive data summarization tool that dynamically.',
          hint: 'Revisit c12_ca_cbse_02_002 (Data Entry) for cleaning data, c12_ca_cbse_02_001 (Basic.',
          misconception: 'Students believe **Pivot Tables automatically update when source data changes** — they don\'t.',
          parts: [
                { id: 'a', prompt: 'A student creates a Pivot Table with \'Region\' in Rows, \'Product\' in Columns, and \'Sales\' in Values (default Sum).', answer: 'The discrepancy occurs',
                  options: ['The discrepancy occurs', 'Pivot Tables are inaccurate', 'change to Average', '**Pivot Tables automatically update when source data changes**'],
                  hint: 'Revisit c12_ca_cbse_02_002 (Data Entry) for cleaning data, c12_ca_cbse_02_001 (Basic Concepts) for.',
                  misconception: 'Students believe **Pivot Tables automatically update when source data changes** — they don\'t.' }
          ],
            remediations: { 'pivot-tables-automatically-update-when': { steps: ['If a student cannot create a correct Pivot Table: (1) Verify source data structure: headers in row 1, no blanks.', '(2) Practice field placement with a 10-row toy dataset: drag one field at a time, observe changes.', '(3) Master Value Field Settings: right-click any value → Value Field Settings → change Sum to Average/Count/% of Column.', '(4) Drill the distinction: Data Tables = formula sensitivity (c12_ca_cbse_02_005 section 2.5.1-2.5.2); Pivot Tables.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
