import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch04_p2: SimDef = {
    id: 'v3_c11_stat_ch04_p2',
    title: 'Presentation of Data · Part 2/2',
    subtitle: 'Decide when prose holds numbers and when only a table will do.',
    classLevel: 11, subject: 'statistics', topic: 'Presentation of Data · Part 2/2',
    chapters: ['c11_stat_ch04'],
    nodeIds: ['c11_stat_cbse_04_007', 'c11_stat_cbse_04_008', 'c11_stat_cbse_04_009', 'c11_stat_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a presenter choosing between a paragraph and a grid', intro: 'A sentence can say \'53 crore males\' precisely — but five cities and twelve months of rain won\'t fit in prose.', goal: 'Apply textual and tabular presentation appropriately and structure tables correctly.' },
    discovery: {
        question: 'A farmers\' income table has intervals and frequencies but no Note — is the omission harmless?',
        options: ['No — without a note the reader can\'t tell if the last open class (500000+) was handled, or the data\'s source and units; the note is part of the table', 'Yes — notes are decoration', 'Yes — titles cover everything', 'No — because tables must have footnotes legally'],
        answer: 'No — without a note the reader can\'t tell if the last open class (500000+) was handled, or the data\'s source and units; the note is part of the table',
        hook: 'And stubs and captions aren\'t fixed positions — put whichever comparison matters where the eye can compare it; layout serves the reader, not the rule.',
    },
    teaching: [
        { title: 'Frequency Curve: Meaning and Types', text: 'A frequency curve is a smooth, freehand curve drawn through the midpoints of the tops of the rectangles of a histogram (or the points of a frequency polygon) that represents the limiting form of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Present 102 crore of census data in text and feel its limits, then choose stubs versus captions for rainfall across 12 months and 5 cities.',
        labels: ['Frequency Curve: Meaning', 'Ogive: Less Than', 'Arithmetic Line Graph: Time', 'Types of Diagrams: One-Dimensional,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_007', title: 'Frequency Curve: Meaning and Types',
          caseStudy: { intro: 'Imagine you have the daily wages of 100 workers in a factory grouped into classes.',
            decisions: [{ prompt: 'What is the primary difference between a frequency polygon and a frequency curve in terms of how they are drawn?', options: [
                { text: 'A frequency polygon is drawn by joining the midpoints of the tops of histogram rectangles', outcome: 'A frequency polygon is drawn by joining the midpoints of the tops of histogram rectangles with.' },
                { text: 'both are drawn with straight lines', outcome: 'Not quite — Students often think a frequency curve must pass through every point of the frequency polygon.', reveals: 'a-frequency-curve-must-pass' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_008', title: 'Ogive: Less Than and More Than Cumulative Frequency Curves',
          scaffold: { problem: 'The following data shows the daily wages (in ₹) of 50 workers in a factory.',
            steps: [
            { text: 'Verify classes are continuous (they are: 100-120, 120-140...).' },
            { text: 'Construct \'less than\' cumulative frequency table: Less than 120: 4, Less than 140: 10, Less than 160: 20, Less than.' },
            { text: 'Construct \'more than\' cumulative frequency table: More than 100: 50, More than 120: 46, More than 140: 40, More than.' },
            { text: 'Choose suitable scale: x-axis 1 cm = 20 ₹ (wages), y-axis 1 cm = 5 workers (cumulative frequency).' },
            { text: 'Join points of each ogive with smooth freehand curves. \'Less than\' ogive rises from left to right; \'more than\' ogive.' },
            { text: 'Read median from x-coordinate of M. Graphically, median ≈ ₹168.', faded: true, blankAnswer: 'Median wage ≈ ₹168 (graphical), ₹166.67 (formula). Both.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_009', title: 'Arithmetic Line Graph: Time Series Representation',
          scaffold: { problem: 'The following table shows India\'s exports and imports (in ₹ 100 crores) from 2010-11 to 2013-14.',
            steps: [
            { text: 'Identify the variables — Time (years) is independent variable for x-axis; Exports and Imports (₹ 100 crores) are.' },
            { text: 'Choose scales — X-axis: 4 years (2010-11 to 2013-14), use 2 cm = 1 year.' },
            { text: 'Plot points for exports: (2010-11, 11370), (2011-12, 14660), (2012-13, 16343), (2013-14, 19050).' },
            { text: 'Join consecutive points for each series with straight lines using different colours/styles (solid for exports, dashed.' },
            { text: 'Interpret — (a) Trade deficit = Imports - Exports. Calculate for each year: 2010-11: 5465; 2011-12: 8795; 2012-13.' },
            { text: 'Verify — Check that slopes are positive for both (upward trend), imports line stays above exports line throughout.', faded: true, blankAnswer: '(a) 2012-13 (trade deficit = ₹ 1,03,490 crores). (b).' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_010', title: 'Types of Diagrams: One-Dimensional, Two-Dimensional, and Three-Dimensional',
          caseStudy: { intro: 'Imagine you\'re comparing the monthly expenditure of two families using a bar diagram and a pie diagram.',
            decisions: [{ prompt: 'State the dimensional classification of a simple bar diagram and explain which geometric property represents the data magnitude.', options: [
                { text: 'A simple bar diagram is a one-dimensional diagram', outcome: 'A simple bar diagram is a one-dimensional diagram. Only the height (or length) of the bar.' },
                { text: 'two-dimensional', outcome: 'Not quite — Students believe that any diagram using rectangles (bars, histograms, component bars) is the same.', reveals: 'any-diagram-using-rectangles-bars' },
                { text: 'width also matters', outcome: 'Not quite — Students believe that any diagram using rectangles (bars, histograms, component bars) is the same.', reveals: 'any-diagram-using-rectangles-bars' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a report, a teammate says: \'Text can\'t carry real numbers — keep prose for feelings.\' Laying out a rainfall table (12 months × 5 cities), he puts months down the side \'because stubs are always the first column, months come first.\'',
            decisions: [{ prompt: 'How should presentation modes be chosen?', options: [
                { text: 'Match form to purpose: textual presentation legitimately embeds precise figures (population numbers work fine in prose) — it\'s for small data volumes needing emphasis or nuance. And table anatomy serves the COMPARISON: if the question is \'which city is wettest in July?\', cities as stubs with a July column lets the eye scan down — orientation is analytical, not chronological decoration.', outcome: 'The report gets intentional: prose for pointed figures, tables oriented so the intended comparison reads straight off.' },
                { text: 'Keep numbers out of prose — text is for description, tables for data.', outcome: 'Textual presentation is a real mode for exact figures in small volumes — NCERT\'s own case embeds crore-level numbers in sentences.', reveals: 'text-cant-hold-numbers' },
                { text: 'Keep months-as-stubs — chronological order is the natural table rule.', outcome: 'Stub vs caption is a choice that serves the question: the layout should put the compared variable where scanning answers fastest.', reveals: 'table-layout-is-rigid' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'Text can carry exact numbers — but the moment readers must compare, the table earns its grid.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_007', difficulty: 'standard',
          question: 'A frequency curve is a smooth, freehand curve drawn through the midpoints.',
          hint: 'If stuck, revisit the construction of a frequency polygon (node c11_stat_cbse_04_006).',
          misconception: 'Students often think a frequency curve must pass through every point of the frequency polygon, treating it like.',
          parts: [
                { id: 'a', prompt: 'If a frequency curve has a longer tail on the right side and the peak is shifted to the left, what type of skewness does it indicate?', answer: 'This indicates positive skewness (right-skewed)',
                  options: ['This indicates positive skewness (right-skewed)', 'it\'s negatively skewed or that mean < median'],
                  hint: 'If stuck, revisit the construction of a frequency polygon (node c11_stat_cbse_04_006), focusing.',
                  misconception: 'Students often think a frequency curve must pass through every point of the frequency polygon, treating it like a dot-to-dot drawing.' },
                { id: 'b', prompt: 'Compare the usefulness of a frequency curve versus a histogram when you want to compare the shapes of two different distributions on the same graph.', answer: 'A frequency curve is preferred',
                  options: ['A frequency curve is preferred', 'histograms are better'],
                  hint: 'If stuck, revisit the construction of a frequency polygon (node c11_stat_cbse_04_006), focusing.',
                  misconception: 'Students often think a frequency curve must pass through every point of the frequency polygon, treating it like a dot-to-dot drawing.' }
          ],
            remediations: { 'a-frequency-curve-must-pass': { steps: ['If a student insists the curve must pass through all polygon points, have them draw a frequency polygon for a small.', 'What smooth shape would emerge?" Guide them to trace a smooth curve that follows the general trend, not every vertex.', 'For confusion with ogive, explicitly contrast: frequency curve uses simple frequencies on y-axis; ogive uses cumulative.', 'For shape recognition, provide a set of sketched curves (symmetrical, positively skewed, negatively skewed, U-shaped.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_008', difficulty: 'standard',
          question: 'An ogive is a cumulative frequency curve where cumulative frequencies are.',
          hint: 'If stuck, revisit the construction of continuous class intervals from discrete data.',
          misconception: 'Students plot \'less than\' ogive points using **class marks (midpoints)** instead of **upper class limits**, and \'more.',
          parts: [
                { id: 'a', prompt: 'Compare the shapes of \'less than\' and \'more than\' ogives for the same distribution.', answer: 'The \'less than\' ogive is never decreasing',
                  options: ['The \'less than\' ogive is never decreasing', 'less than ogive goes up'],
                  hint: 'If stuck, revisit the construction of continuous class intervals from discrete data (Class 10.',
                  misconception: 'Students plot \'less than\' ogive points using **class marks (midpoints)** instead of **upper class limits**, and \'more than\' ogive points.' }
          ],
            remediations: { 'students-plot-less-than-ogive': { steps: ['Have the student physically point to the upper boundary of a class interval on a number line and say: "Less than this.', 'Draw a single class 40-60 with frequency 10.', 'Ask: "If 5 students scored less than 50, where does the 50th percentile lie?', 'At 50 or 60?" Guide them to see that cumulative frequency at 60 includes the full class.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_009', difficulty: 'standard',
          question: 'An arithmetic line graph (time series graph) is a diagrammatic representation.',
          hint: 'Revisit Class 9 Maths Chapter 3 (Coordinate Geometry) — specifically plotting points and.',
          misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the.',
          parts: [
                { id: 'a', prompt: 'Given the following data for a company\'s quarterly profit (₹ crore): Q1: 12, Q2: 15, Q3: 10, Q4: 18, Q5: 14, Q6: 20.', answer: '(1) X-axis: quarters 1-6, 1 cm = 1 quarter',
                  options: ['(1) X-axis: quarters 1-6, 1 cm = 1 quarter', 'GDP grew steadily each month between 2019 and 2020'],
                  hint: 'Revisit Class 9 Maths Chapter 3 (Coordinate Geometry) — specifically plotting points and.',
                  misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the variable between.' },
                { id: 'b', prompt: 'Two arithmetic line graphs are drawn for the same monthly temperature data (Jan-Dec): Graph A uses 1 cm = 1 month on x-axis and 1 cm = 5°C on y-axis; Graph.', answer: 'Graph A will show steeper slopes (larger visual angle)',
                  options: ['Graph A will show steeper slopes (larger visual angle)', 'interpret the graph', 'GDP grew steadily each month between 2019 and 2020'],
                  hint: 'Revisit Class 9 Maths Chapter 3 (Coordinate Geometry) — specifically plotting points and.',
                  misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the variable between.' }
          ],
            remediations: { 'the-straight-line-segments-in': { steps: ['If a student insists the line shows actual intermediate values: (1) Show them monthly export data for a single year.', '(2) Then plot the *same year* as a single point on an annual graph.', '(3) Ask: "Does the straight line from 2022 to 2023 on the annual graph match the monthly zigzag?" (4) Explain: "The.', 'The straight line is a *drawing convention*, not data." (5) Practice: Give them quarterly GDP data and ask them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "An arithmetic line graph of annual rainfall over 30 years with points joined by straight lines proves that rainfall changes linearly.', answer: 'The statement is false',
                  options: ['The statement is false', 'GDP grew steadily each month between 2019 and 2020'],
                  hint: 'Revisit Class 9 Maths Chapter 3 (Coordinate Geometry) — specifically plotting points and.',
                  misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the variable between.' },
                { id: 'b', prompt: 'Design a time series data set (minimum 8 time points) for two related economic variables (e.g., production and inventory) such that when plotted on the same.', answer: 'Example: Quarterly data (₹ crore): Q1: Prod=100, Inv=120',
                  options: ['Example: Quarterly data (₹ crore): Q1: Prod=100, Inv=120', 'GDP grew steadily each month between 2019 and 2020'],
                  hint: 'Revisit Class 9 Maths Chapter 3 (Coordinate Geometry) — specifically plotting points and.',
                  misconception: 'Students believe that the straight line segments in an arithmetic line graph represent the *actual path* of the variable between.' }
          ],
            remediations: { 'the-straight-line-segments-in': { steps: ['If a student insists the line shows actual intermediate values: (1) Show them monthly export data for a single year.', '(2) Then plot the *same year* as a single point on an annual graph.', '(3) Ask: "Does the straight line from 2022 to 2023 on the annual graph match the monthly zigzag?" (4) Explain: "The.', 'The straight line is a *drawing convention*, not data." (5) Practice: Give them quarterly GDP data and ask them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_010', difficulty: 'standard',
          question: 'Diagrams in statistics are classified by the number of dimensions that carry.',
          hint: 'Revisit histogram construction (c11_stat_cbse_04_005) focusing on frequency density.',
          misconception: 'Students believe that any diagram using rectangles (bars, histograms, component bars) is the same "type" because they.',
          parts: [
                { id: 'a', prompt: 'State the dimensional classification of a simple bar diagram and explain which geometric property represents the data magnitude.', answer: 'A simple bar diagram is a one-dimensional diagram',
                  options: ['A simple bar diagram is a one-dimensional diagram', 'two-dimensional', 'width also matters', 'one-dimensional bar charts'],
                  hint: 'Revisit histogram construction (c11_stat_cbse_04_005) focusing on frequency density.',
                  misconception: 'Students believe that any diagram using rectangles (bars, histograms, component bars) is the same "type" because they look similar.' },
                { id: 'b', prompt: 'Given a frequency distribution with unequal class intervals, a student draws a histogram using frequency as height for all rectangles.', answer: 'No, it will not correctly represent the data',
                  options: ['No, it will not correctly represent the data', 'yes, height shows frequency', 'one-dimensional bar charts'],
                  hint: 'Revisit histogram construction (c11_stat_cbse_04_005) focusing on frequency density.',
                  misconception: 'Students believe that any diagram using rectangles (bars, histograms, component bars) is the same "type" because they look similar.' }
          ],
            remediations: { 'any-diagram-using-rectangles-bars': { steps: ['Have the student draw a bar diagram and a histogram side-by-side for the SAME dataset (e.g., marks of 30 students).', 'Ask: "In the bar diagram, what does the width of each bar represent?', 'Make them calculate: if a histogram class interval doubles but frequency stays same, what happens to height?', 'Contrast with bar diagram: if a category value doubles, what happens to width? (Nothing — width unchanged).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
