import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch03_p2: SimDef = {
    id: 'v3_c11_stat_ch03_p2',
    title: 'Organisation of Data · Part 2/2',
    subtitle: 'Learn that grouping is a choice, not a format.',
    classLevel: 11, subject: 'statistics', topic: 'Organisation of Data · Part 2/2',
    chapters: ['c11_stat_ch03'],
    nodeIds: ['c11_stat_cbse_03_007', 'c11_stat_cbse_03_008', 'c11_stat_cbse_03_009', 'c11_stat_cbse_03_010', 'c11_stat_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data organiser deciding what the columns should mean', intro: 'The kabadiwallah sorting junk is classifying; the count per pile is just the receipt — decide the criterion first.', goal: 'Distinguish classification bases and choose array versus distribution correctly.' },
    discovery: {
        question: '500 families, number of children each ranging 0–8 — build a frequency distribution with class intervals?',
        options: ['No — a discrete variable with a tiny range wants a frequency array; grouping 0–8 into classes destroys information', 'Yes — all quantitative data needs classes', 'Yes — 0-2, 3-5, 6-8 will do', 'No — because families aren\'t data'],
        answer: 'No — a discrete variable with a tiny range wants a frequency array; grouping 0–8 into classes destroys information',
        hook: 'Classification is the decision, the frequency table merely its output — choosing \'by state\' versus \'by year\' versus \'by size\' is the actual analysis.',
    },
    teaching: [
        { title: 'Class Width or Magnitude of Class Intervals', text: 'Class width (or magnitude of class interval) is the difference between the upper class limit and the lower class limit of a class interval, representing the size of each class in a frequency.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_03_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Classify the same literacy data four ways — chronological, geographical, qualitative, quantitative — then defend why chronology beats labels for a GDP trend.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_007', title: 'Class Width or Magnitude of Class Intervals',
          scaffold: { problem: 'The monthly rent (in ₹) paid by 40 tenants in a housing society ranges from ₹3,200 to ₹18,800.',
            steps: [
            { text: 'Identify the minimum and maximum values from the problem. Minimum = ₹3,200, Maximum = ₹18,800.' },
            { text: 'Calculate the range. Range = Maximum − Minimum = 18,800 − 3,200 = ₹15,600.' },
            { text: 'Compute the ideal class width using the desired number of classes (8).' },
            { text: 'Round the class width to a convenient number for easy interpretation.' },
            { text: 'Construct exclusive class intervals starting from the minimum (or a convenient number ≤ minimum).' },
            { text: 'Verify the maximum value (18,800) falls in the last class (17000–19000). Yes, 18,800 ≥ 17,000 and < 19,000.', faded: true, blankAnswer: 'Class width = ₹2,000. Class intervals: 3000–5000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_008', title: 'Frequency Array for Discrete Variables',
          scaffold: { problem: 'In a survey of 30 families in a village, the number of earning members per family was recorded as: 1, 2, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 4.',
            steps: [
            { text: 'Identify the variable — "number of earning members" is discrete (values 1, 2, 3, 4 only).' },
            { text: 'List all distinct values in ascending order: 1, 2, 3, 4.' },
            { text: 'Tally each occurrence from the raw data: count 1s, 2s, 3s, 4s.' },
            { text: 'Convert tallies to frequencies: 1→10, 2→11, 3→5, 4→1. Verify sum = 30.' },
            { text: '(i) Mode = 2 (highest frequency 11). (ii) Percentage for 2 = (11/30)×100 = 36.67%.', faded: true, blankAnswer: 'Frequency Array: 1→10, 2→11, 3→5, 4→1. (i) Most common: 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_009', title: 'Bivariate Frequency Distribution: Construction and Interpretation',
          scaffold: { problem: 'A researcher collects data on 30 households in a Delhi neighbourhood: Monthly Income (₹ thousands) and Monthly Expenditure on Education (₹.',
            steps: [
            { text: 'Determine class intervals. Income range: 38 to 88. 5 classes starting at 35 with width = (88-35)/5 ≈ 10.6 → use width.' },
            { text: 'Draw a 5×6 grid (Education rows × Income columns). Label rows: 5–9, 9–13, 13–17, 17–21, 21–25.' },
            { text: 'Tally each pair. Example: (45,8) → Income 45 falls in 45–55 (exclusive: 45 included in upper class), Education 8 falls.' },
            { text: 'Count tallies per cell and write frequencies. Compute row totals (marginal for Education), column totals (marginal for.' },
            { text: 'Verify: Sum of all cell frequencies = 30. Check that marginal totals match univariate distributions of each variable.', faded: true, blankAnswer: 'Completed bivariate table with 5 rows × 6 columns, cell.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_011', title: 'Types of Tables: One-way, Two-way, and Three-way Tables',
          caseStudy: { intro: 'Imagine you\'re analysing the CBSE Class 12 results for your school.',
            decisions: [{ prompt: 'A researcher collects data on the "mode of transport" (bus, metro, car, walk) used by 500 commuters.', options: [
                { text: 'This is a one-way table classifying a single variable (mode of transport)', outcome: 'This is a one-way table classifying a single variable (mode of transport).' },
                { text: 'two-way table', outcome: 'Not quite — Students often think: "A table with many rows and columns is a three-way table." They confuse the.', reveals: 'a-table-with-many-rows' },
                { text: 'two variables', outcome: 'Not quite — Students often think: "A table with many rows and columns is a three-way table." They confuse the.', reveals: 'a-table-with-many-rows' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting project data, a student treats classification and frequency distribution as \'the same thing — tally marks\', and labels state-wise literacy rates \'quantitative classification because literacy is a percentage.\'',
            decisions: [{ prompt: 'What are classification and its bases really about?', options: [
                { text: 'Separate act from output: classification is the conceptual CHOICE of grouping criterion — the kabadiwallah sorting junk into papers, plastics and metals classifies without any frequency table; the frequency distribution is one output of quantitative classification. And the basis follows the GROUPING, not the variable\'s nature: literacy rate grouped by state is geographical classification, however numerical the variable.', outcome: 'He classifies by intent: four bases (chronological, geographical, qualitative, quantitative) answer \'grouped by what?\' — not \'is the data numeric?\'' },
                { text: 'Keep the synonymy — making a frequency table IS classifying.', outcome: 'Frequency tables are one output: qualitative classification produces groups without counts — the conceptual act precedes and exceeds the table.', reveals: 'classification-is-frequency-table' },
                { text: 'Keep \'quantitative\' for literacy rates — percentages are numbers, so it\'s quantitative.', outcome: 'The variable\'s nature isn\'t the criterion: grouping BY state is geographical whatever the variable — the basis names the grouping dimension.', reveals: 'variable-type-is-basis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'A frequency table isn\'t classification — it\'s what classification looks like once you\'ve decided what to group by.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_007', difficulty: 'standard',
          question: 'Class width (or magnitude of class interval) is the difference between the.',
          hint: 'If stuck, revisit c11_stat_cbse_03_006 (Class Limits, Class Boundaries, and Class Marks).',
          misconception: 'Students believe class width must always be a round number like 5, 10, or 100, and that the number of classes is fixed.',
          parts: [
                { id: 'a', prompt: 'Compare the class widths in this frequency distribution: 0–10 (f=5), 10–20 (f=12), 20–30 (f=20), 30–40 (f=15), 40–50 (f=8).', answer: 'All original classes have equal width 10',
                  options: ['All original classes have equal width 10', 'class mark becomes average of 5 and 15 = 10, so it\'s fine'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_006 (Class Limits, Class Boundaries, and Class Marks).',
                  misconception: 'Students believe class width must always be a round number like 5, 10, or 100, and that the number of classes is fixed at 10.' }
          ],
            remediations: { 'class-width-must-always-be': { steps: ['If a student insists on round-number widths, give them a dataset with range 97 and ask them to construct distributions.', 'Have them count classes in each (10, 11, 8) and evaluate which shows the data pattern best.', 'Then ask: "Does the data care that 10 is a round number?" Guide them to see that class width serves the data\'s.', 'Next, have them read the NCERT paragraph on "How many classes should we have?" and identify the two criteria: 6–15.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe class width must always be a round number like 5, 10, or 100, and that the number of classes is fixed.',
          parts: [
                { id: 'a', prompt: 'A researcher collects household income data ranging from ₹5,000 to ₹5,00,000 per month. She proposes 10 classes of equal width ₹49,500.', answer: 'Equal width is inappropriate here',
                  options: ['Equal width is inappropriate here', 'concentration of values'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_006 (Class Limits, Class Boundaries, and Class Marks).',
                  misconception: 'Students believe class width must always be a round number like 5, 10, or 100, and that the number of classes is fixed at 10.' }
          ],
            remediations: { 'class-width-must-always-be': { steps: ['If a student insists on round-number widths, give them a dataset with range 97 and ask them to construct distributions.', 'Have them count classes in each (10, 11, 8) and evaluate which shows the data pattern best.', 'Then ask: "Does the data care that 10 is a round number?" Guide them to see that class width serves the data\'s.', 'Next, have them read the NCERT paragraph on "How many classes should we have?" and identify the two criteria: 6–15.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_008', difficulty: 'standard',
          question: 'A Frequency Array is a tabular representation of a discrete variable where each.',
          hint: 'Revisit the distinction between discrete and continuous variables in node.',
          misconception: 'Students often treat discrete variables with many distinct values (e.g., "marks out of 100") as continuous and group.',
          parts: [
                { id: 'a', prompt: 'A student constructs a frequency array for "number of cars owned per household" from a survey of 50 households.', answer: 'Grouping discrete values into intervals (e.g., 0–1) loses the exact distribution',
                  options: ['Grouping discrete values into intervals (e.g., 0–1) loses the exact distribution', 'it\'s easier to read', 'large number of possible values', 'continuous nature'],
                  hint: 'Revisit the distinction between discrete and continuous variables in node c11_stat_cbse_03_004.',
                  misconception: 'Students often treat discrete variables with many distinct values (e.g., "marks out of 100") as continuous and group them into intervals.' },
                { id: 'b', prompt: 'Given the raw data on "number of defective items in 20 batches": 2, 0, 1, 3, 2, 0, 1, 2, 4, 1, 0, 2, 3, 1, 2, 0, 1, 2, 3, 1.', answer: 'Frequency array: 0→4, 1→6, 2→5, 3→3, 4→1',
                  options: ['Frequency array: 0→4, 1→6, 2→5, 3→3, 4→1', 'large number of possible values', 'continuous nature'],
                  hint: 'Revisit the distinction between discrete and continuous variables in node c11_stat_cbse_03_004.',
                  misconception: 'Students often treat discrete variables with many distinct values (e.g., "marks out of 100") as continuous and group them into intervals.' }
          ],
            remediations: { 'students-often-treat-discrete-variables': { steps: ['If a student groups discrete data into intervals: 1.', 'Ask: "Can a student score 33.5 marks?" (No, marks are integers).', 'Show: "If we group 30–40, we lose the count of students who got exactly 33 (pass) vs 34." 3.', 'Demonstrate: Construct both array and grouped table for a small dataset (e.g., 10 students\' marks) and compare.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_009', difficulty: 'standard',
          question: 'A Bivariate Frequency Distribution is a tabular arrangement that displays the.',
          hint: 'If stuck, revisit c11_stat_cbse_03_003 (Frequency Distribution Construction) and.',
          misconception: 'Students treat a bivariate frequency table as merely two univariate tables placed side-by-side, and read cell.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bivariate Frequency Distribution is a tabular arrangement that displays the joint',
                  options: ['A Bivariate Frequency Distribution is a tabular arrangement that displays the joint', 'Classification of data is the systematic process of arranging raw, unorganised', 'Classification of data is the process of arranging raw data into groups or classes based', 'A frequency distribution is a systematic arrangement of raw data into classes (groups)'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_003 (Frequency Distribution Construction) and.',
                  misconception: 'Students treat a bivariate frequency table as merely two univariate tables placed side-by-side, and read cell frequencies as if they were.' }
          ],
            remediations: { 'students-treat-a-bivariate-frequency': { steps: ['Have the student physically trace with a finger — left finger on the row label (advertising class), right finger on the.', 'Cover all other cells with a blank paper, revealing only the target cell.', 'Practice with a 2×2 simplified table first (e.g., High/Low sales × High/Low advertising) where each cell has a distinct.', 'Explicitly contrast "row total = firms with this advertising level (any sales)" vs "cell value = firms with THIS.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_010', difficulty: 'standard',
          question: 'A statistical table is a systematic arrangement of classified data in rows and.',
          hint: 'Revisit c11_stat_cbse_03_003 (Frequency Distribution: Meaning and Construction) and.',
          misconception: 'Students believe the "body" (data cells) is the only essential part of a table, and that titles, footnotes, and source.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A statistical table is a systematic arrangement of classified data in rows and columns',
                  options: ['A statistical table is a systematic arrangement of classified data in rows and columns', 'Classification of data is the systematic process of arranging raw, unorganised', 'Classification of data is the process of arranging raw data into groups or classes based', 'A frequency distribution is a systematic arrangement of raw data into classes (groups)'],
                  hint: 'Revisit c11_stat_cbse_03_003 (Frequency Distribution: Meaning and Construction) and.',
                  misconception: 'Students believe the "body" (data cells) is the only essential part of a table, and that titles, footnotes, and source notes are optional.' }
          ],
            remediations: { 'the-body-data-cells-is': { steps: ['If a student omits parts: (1) Give them a "table autopsy" worksheet: provide 5 incomplete tables (each missing 1–2.', '(2) Have them rebuild one table from raw data using a 7-part checklist: Number?', 'Title (What, Where, When, Unit)?', 'Footnotes (method, exceptions)?'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_011', difficulty: 'standard',
          question: 'A one-way table (univariate table) classifies data according to a single.',
          hint: 'Revisit c11_stat_cbse_03_004 (Types of Frequency Distribution: Univariate, Bivariate).',
          misconception: 'Students often think: "A table with many rows and columns is a three-way table." They confuse the NUMBER OF CATEGORIES.',
          parts: [
                { id: 'a', prompt: 'A researcher collects data on the "mode of transport" (bus, metro, car, walk) used by 500 commuters.', answer: 'This is a one-way table classifying a single variable (mode of transport)',
                  options: ['This is a one-way table classifying a single variable (mode of transport)', 'two-way table', 'two variables', 'A table with many rows and columns is a three-way table'],
                  hint: 'Revisit c11_stat_cbse_03_004 (Types of Frequency Distribution: Univariate, Bivariate) to reinforce.',
                  misconception: 'Students often think: "A table with many rows and columns is a three-way table." They confuse the NUMBER OF CATEGORIES (e.g., 5 rows × 4.' },
                { id: 'b', prompt: 'A two-way table shows "Gender (Male/Female) vs Employment Status (Employed/Unemployed)" for a village.', answer: 'The conditional distribution of employment status GIVEN male',
                  options: ['The conditional distribution of employment status GIVEN male', 'A table with many rows and columns is a three-way table', 'gives joint percentages (e'],
                  hint: 'Revisit c11_stat_cbse_03_004 (Types of Frequency Distribution: Univariate, Bivariate) to reinforce.',
                  misconception: 'Students often think: "A table with many rows and columns is a three-way table." They confuse the NUMBER OF CATEGORIES (e.g., 5 rows × 4.' }
          ],
            remediations: { 'a-table-with-many-rows': { steps: ['** Ask the student: "How many QUESTIONS were asked to generate this data?" One question (e.g., "What is your.', '** Show a 5×4 table and a three-way table (two 5×4 tables side by side for Male/Female).', '** Give practice: "Identify variables in: (a) Marks distribution of 100 students; (b) Marks × Gender; (c) Marks.', '** Emphasise: "Categories are ANSWERS to a question. Variables are the QUESTIONS."'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
