import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ca_ch04 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ca_ch04: SimDef = {
    id: 'v3_c12_ca_ch04',
    title: 'OVERVIEW OF',
    subtitle: 'The pie chart that hid five years of decline',
    classLevel: 12, subject: 'computerised_accounting', topic: 'OVERVIEW OF',
    chapters: ['c12_ca_ch04'],
    nodeIds: ['c12_ca_cbse_04_001', 'c12_ca_cbse_04_002', 'c12_ca_cbse_04_003', 'c12_ca_cbse_04_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Data storyteller', intro: 'Rows of numbers hide every pattern; the right chart makes them shout. Choose wrong, and it whispers a lie.', goal: 'Identify chart elements and select the correct chart type for a given business question.' },
    discovery: {
        question: 'An accountant plots five years of quarterly revenue as a pie chart to \'show the trend clearly.\' Why will the boss be misled?',
        options: ['A pie chart shows proportions of one whole at one moment — it can\'t hold five years of series or display change over time; a line chart can', 'Nothing — pie charts are always clearest', 'The pie is fine, it just needs more slices', 'Revenue can\'t be charted at all — only expenses can'],
        answer: 'A pie chart shows proportions of one whole at one moment — it can\'t hold five years of series or display change over time; a line chart can',
        hook: 'Students assume Excel will fit any data into any chart. Charts have hard rules: pies take one positive series, lines need a continuous axis, doughnuts take multiple rings. Choosing the chart IS the analysis — the wrong one lies politely.',
    },
    teaching: [
        { title: 'Graphs And Charts', text: 'A graph or chart in computerised accounting is a visual representation of financial or business data plotted on two or more axes (X, Y, and optionally Z) using spreadsheet software like MS Excel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ca_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Turn a 24-number grid of quarterly product sales into decisions: pick the chart type that reveals the fastest-growing product, expose the best quarter, and defend every choice against a chart that would mislead.',
        labels: ['Graphs And Charts', 'Basics Steps', 'Advantages In Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ca_cbse_04_001', title: 'Graphs And Charts',
          caseStudy: { intro: 'Imagine you are the accountant of a small manufacturing firm. The owner hands you a spreadsheet with quarterly sales figures for six products over the last.',
            decisions: [{ prompt: 'What are the two axes in a standard 2-D Excel chart called, and what type of data does each typically represent?', options: [
                { text: 'The horizontal axis is the Category Axis (X-axis) representing independent categories', outcome: 'The horizontal axis is the Category Axis (X-axis) representing independent categories (e.g.' },
                { text: 'horizontal/vertical', outcome: 'Not quite — Students believe that "any data can be put into any chart type — Excel will figure it out.".', reveals: 'any-data-can-be-put' },
                { text: 'any data can be put into any chart type', outcome: 'Not quite — Students believe that "any data can be put into any chart type — Excel will figure it out.".', reveals: 'any-data-can-be-put' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_04_002', title: 'Basics Steps For',
          caseStudy: { intro: 'Imagine you are the accountant for ABC Manufacturing and the manager asks: "Show me which product contributed most to total sales in 2007-08 — and give me.',
            decisions: [{ prompt: 'What are the two mandatory steps to create any chart in Excel, according to the NCERT textbook?', options: [
                { text: 'Step 1: Enter data in a worksheet with proper row and column titles', outcome: 'Step 1: Enter data in a worksheet with proper row and column titles.' },
                { text: 'format the chart first', outcome: 'Not quite — Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across.', reveals: 'a-pie-chart-can-display' },
                { text: 'save the file', outcome: 'Not quite — Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across.', reveals: 'a-pie-chart-can-display' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_04_003', title: 'Advantages In Using',
          caseStudy: { intro: 'Imagine you are the CFO of a mid-size textile firm in Surat. The board asks: "Why did our profit margin drop in Q3 despite higher sales?" You have 50,000 rows.',
            decisions: [{ prompt: '**REMEMBER:** List the three advantages of using graphs/charts as per NCERT Section 4.3, and give a one-line business context for each.', options: [
                { text: '**Correct answer:** 1', outcome: '**Correct answer:** 1. **Help to Explore** — e.g., plotting GNP vs infant mortality to discover.' },
                { text: 'beautification', outcome: 'Not quite — **Misconception:** "Graphs are just for making reports look professional; the real analysis happens.', reveals: 'misconception-graphs-are-just-for' },
                { text: 'saving paper', outcome: 'Not quite — **Misconception:** "Graphs are just for making reports look professional; the real analysis happens.', reveals: 'misconception-graphs-are-just-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a board practical, a student is asked to show the trend of quarterly revenue across five years, including one loss quarter. He inserts a pie chart \'because it shows percentages clearly\'.',
            decisions: [{ prompt: 'Is the pie chart the right choice?', options: [
                { text: 'No — a pie shows one series\' share of a whole at a single point; a 20-quarter trend with a negative value needs a line or column chart, where the loss quarter dips below the axis.', outcome: 'Chart type follows the question: proportions → pie, trends over time → line, category comparison → column; Excel won\'t rescue a mismatched choice.' },
                { text: 'Yes — Excel will arrange any data into any chart type correctly.', outcome: 'Pie charts take exactly one positive series of up to seven categories; the other quarters are silently dropped and a loss can\'t even be a slice.', reveals: 'any-chart-works' },
                { text: 'Yes — and he can add a second ring to the pie to show both this year and last year.', outcome: 'That\'s a doughnut chart, and stacking rings of shares still can\'t render a time trend or negative quarters.', reveals: 'pie-for-time-trend' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_04_004', title: 'You made it',
          caseStudy: { intro: 'You can now match a business question to the chart that answers it — and spot the chart that quietly lies. That\'s the whole of this chapter and half of real-world reporting.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ca_cbse_04_001', difficulty: 'standard',
          question: 'A graph or chart in computerised accounting is a visual representation.',
          hint: 'If stuck, revisit Class 11 Statistics Chapter 4 nodes c11_stat_cbse_04_003 (Bar.',
          misconception: 'Students believe that "any data can be put into any chart type — Excel will figure it out." In reality, chart types.',
          parts: [
                { id: 'a', prompt: 'A student creates a pie chart in Excel using a dataset that has three columns: Product Name, Q1 Sales, and Q2 Sales.', answer: 'A pie chart can plot only ONE data series (one column of values) at a time',
                  options: ['A pie chart can plot only ONE data series (one column of values) at a time', 'pie chart can show two series if you add a legend', 'any data can be put into any chart type', '"any data can be put into any chart type'],
                  hint: 'If stuck, revisit Class 11 Statistics Chapter 4 nodes c11_stat_cbse_04_003 (Bar Diagrams).',
                  misconception: 'Students believe that "any data can be put into any chart type — Excel will figure it out." In reality, chart types have strict structural.' },
                { id: 'b', prompt: 'You have monthly profit/loss data for a year: some months show profit (positive), others loss (negative).', answer: 'Column charts, bar charts, and line charts can display negative values',
                  options: ['Column charts, bar charts, and line charts can display negative values', 'pie chart can show negative values as slices', 'negative values disappear', 'any data can be put into any chart type'],
                  hint: 'If stuck, revisit Class 11 Statistics Chapter 4 nodes c11_stat_cbse_04_003 (Bar Diagrams).',
                  misconception: 'Students believe that "any data can be put into any chart type — Excel will figure it out." In reality, chart types have strict structural.' },
                { id: 'c', prompt: 'Compare a doughnut chart and a pie chart for representing the market share of five smartphone brands.', answer: 'A doughnut chart is preferred',
                  options: ['A doughnut chart is preferred', 'use two pie charts side by side', 'any data can be put into any chart type', '"any data can be put into any chart type'],
                  hint: 'If stuck, revisit Class 11 Statistics Chapter 4 nodes c11_stat_cbse_04_003 (Bar Diagrams).',
                  misconception: 'Students believe that "any data can be put into any chart type — Excel will figure it out." In reality, chart types have strict structural.' }
          ],
            remediations: { 'any-data-can-be-put': { steps: ['Revisit c11_stat_cbse_04_003 (Bar Diagrams) and c11_stat_cbse_04_004 (Pie Diagram) to reinforce the one-series.', 'Open Excel, enter a 3-column dataset (Product, Q1, Q2), and deliberately try to create a pie chart — observe the.', 'Create a column chart with the same data; use "Switch Row/Column" (Design tab) to see how series/category assignment.', 'Re-attempt Diagnostic Questions 2 and 4, writing a one-sentence justification for each answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_04_002', difficulty: 'standard',
          question: 'The basic steps for creating graphs/charts in Excel involve: (1) entering.',
          hint: 'If stuck on axis assignment, revisit c11_stat_cbse_04_003 (Bar Diagrams) and practice.',
          misconception: 'Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across 4 quarters) because.',
          parts: [
                { id: 'a', prompt: 'What are the two mandatory steps to create any chart in Excel, according to the NCERT textbook?', answer: 'Step 1: Enter data in a worksheet with proper row and column titles',
                  options: ['Step 1: Enter data in a worksheet with proper row and column titles', 'format the chart first', 'save the file', 'multiple slices'],
                  hint: 'If stuck on axis assignment, revisit c11_stat_cbse_04_003 (Bar Diagrams) and practice: "For this.',
                  misconception: 'Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across 4 quarters) because they see "multiple.' },
                { id: 'b', prompt: 'A student creates a column chart for quarterly sales of six products.', answer: 'Design tab → Data group → Switch Row/Column',
                  options: ['Design tab → Data group → Switch Row/Column', 're-select data and insert new chart', 'change chart type', 'multiple slices'],
                  hint: 'If stuck on axis assignment, revisit c11_stat_cbse_04_003 (Bar Diagrams) and practice: "For this.',
                  misconception: 'Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across 4 quarters) because they see "multiple.' }
          ],
            remediations: { 'a-pie-chart-can-display': { steps: ['Revisit **c12_ca_cbse_04_001** (Graphs And Charts) to relearn the definition of data series vs.', 'Open Excel, enter the exact Figure 4.4 data.', 'Select the whole block → Insert Pie → observe only Product 1 appears.', 'Undo, select only Product names + Total Sales column (Ctrl+select) → Insert Pie → observe 6 slices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across 4 quarters) because.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since 3-D charts look more impressive, we should always use 3-D column charts instead of 2-D for business reports." Evaluate this statement.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'multiple slices', 'categories', 'series'],
                  hint: 'If stuck on axis assignment, revisit c11_stat_cbse_04_003 (Bar Diagrams) and practice: "For this.',
                  misconception: 'Students believe a pie chart can display multiple data series (e.g., sales of all 6 products across 4 quarters) because they see "multiple.' }
          ],
            remediations: { 'a-pie-chart-can-display': { steps: ['Revisit **c12_ca_cbse_04_001** (Graphs And Charts) to relearn the definition of data series vs.', 'Open Excel, enter the exact Figure 4.4 data.', 'Select the whole block → Insert Pie → observe only Product 1 appears.', 'Undo, select only Product names + Total Sales column (Ctrl+select) → Insert Pie → observe 6 slices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_04_003', difficulty: 'standard',
          question: 'The advantages of using graphs and charts in computerised accounting refer.',
          hint: 'If unsure which chart type serves which advantage, return to **c12_ca_cbse_04_001 Figure.',
          misconception: '**Misconception:** "Graphs are just for making reports look professional; the real analysis happens in pivot tables.".',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** List the three advantages of using graphs/charts as per NCERT Section 4.3, and give a one-line business context for each.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'beautification', 'saving paper', 'making reports longer'],
                  hint: 'If unsure which chart type serves which advantage, return to **c12_ca_cbse_04_001 Figure 4.1**.',
                  misconception: '**Misconception:** "Graphs are just for making reports look professional; the real analysis happens in pivot tables." **Why students make.' },
                { id: 'b', prompt: '**ANALYZE:** Compare the **presentation** advantage of a *pie chart* vs a *stacked 100% bar chart* for showing "Product-wise revenue share % for FY 2023-24".', answer: '**Correct answer:** | Criterion | Pie Chart | Stacked 100% Bar Chart |',
                  options: ['**Correct answer:** | Criterion | Pie Chart | Stacked 100% Bar Chart |', 'pie charts are better for percentages'],
                  hint: 'If unsure which chart type serves which advantage, return to **c12_ca_cbse_04_001 Figure 4.1**.',
                  misconception: '**Misconception:** "Graphs are just for making reports look professional; the real analysis happens in pivot tables." **Why students make.' }
          ],
            remediations: { 'misconception-graphs-are-just-for': { steps: ['**Revisit node c12_ca_cbse_04_001 (Graphs And Charts)** — specifically the "Elements of a Chart" and "2D vs 3D".', 'Identify *which visual channel* (position, length, angle, area) each chart type uses.', '**Re-do Diagnostic Q4** with a fresh dataset: create both a pie and stacked 100% bar for the same 7-category data.', 'Physically measure slice angles vs bar lengths with a ruler — quantify the perception error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_04_004', difficulty: 'standard',
          question: 'Chart selection and interpretation in computerised accounting is the skill.',
          hint: 'Work step by step.',
          misconception: 'Students pick the prettiest chart type rather than the matching one — a pie of monthly sales tells nothing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Chart selection and interpretation in computerised accounting is the skill of matching',
                  options: ['Chart selection and interpretation in computerised accounting is the skill of matching', 'A graph or chart in computerised accounting is a visual representation of financial or', 'The basic steps for creating graphs/charts in Excel involve: (1) entering structured data', 'The advantages of using graphs and charts in computerised accounting refer to the three'],
                  hint: 'Recall the definition.',
                  misconception: 'Students pick the prettiest chart type rather than the matching one — a pie of monthly sales tells nothing.' }
          ],
            remediations: { 'students-pick-the-prettiest-chart': { steps: ['Name the data\'s question first: \'how does it change over time\' → line; \'what share does each part take\' → pie; \'which.', 'Then read the axes before reading the shape.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
