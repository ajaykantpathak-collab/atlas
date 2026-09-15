import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch04_p1: SimDef = {
    id: 'v3_c11_stat_ch04_p1',
    title: 'Presentation of Data · Part 1/2',
    subtitle: 'Decide when prose holds numbers and when only a table will do.',
    classLevel: 11, subject: 'statistics', topic: 'Presentation of Data · Part 1/2',
    chapters: ['c11_stat_ch04'],
    nodeIds: ['c11_stat_cbse_04_001', 'c11_stat_cbse_04_002', 'c11_stat_cbse_04_003', 'c11_stat_cbse_04_004', 'c11_stat_cbse_04_005', 'c11_stat_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a presenter choosing between a paragraph and a grid', intro: 'A sentence can say \'53 crore males\' precisely — but five cities and twelve months of rain won\'t fit in prose.', goal: 'Apply textual and tabular presentation appropriately and structure tables correctly.' },
    discovery: {
        question: 'A farmers\' income table has intervals and frequencies but no Note — is the omission harmless?',
        options: ['No — without a note the reader can\'t tell if the last open class (500000+) was handled, or the data\'s source and units; the note is part of the table', 'Yes — notes are decoration', 'Yes — titles cover everything', 'No — because tables must have footnotes legally'],
        answer: 'No — without a note the reader can\'t tell if the last open class (500000+) was handled, or the data\'s source and units; the note is part of the table',
        hook: 'And stubs and captions aren\'t fixed positions — put whichever comparison matters where the eye can compare it; layout serves the reader, not the rule.',
    },
    teaching: [
        { title: 'Textual Presentation of Data: Advantages and Limitations', text: 'Textual presentation of data is a method of describing statistical information entirely through written sentences or paragraphs, where numerical facts are embedded in narrative form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Present 102 crore of census data in text and feel its limits, then choose stubs versus captions for rainfall across 12 months and 5 cities.',
        labels: ['Textual Presentation of Data', 'Tabular Presentation of Data', 'Bar Diagrams: Simple, Multiple,', 'Pie Diagram: Construction', 'Histogram: Construction for Equal', 'Frequency Polygon: Construction from'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_001', title: 'Textual Presentation of Data: Advantages and Limitations',
          caseStudy: { intro: 'Imagine you are reading a newspaper report: "In the recent local election, Party A won 12 wards, Party B won 8 wards, and Party C won 5 wards out of 25 wards.',
            decisions: [{ prompt: 'Define textual presentation of data and state one advantage and one limitation mentioned in the NCERT textbook.', options: [
                { text: 'Textual presentation means describing data within the text using sentences', outcome: 'Textual presentation means describing data within the text using sentences.' },
                { text: 'advantage: easy to compare numbers', outcome: 'Not quite — Students often believe textual presentation is only for qualitative descriptions (e.g., "most.', reveals: 'textual-presentation-is-only-for' },
                { text: 'most people liked the product', outcome: 'Not quite — Students often believe textual presentation is only for qualitative descriptions (e.g., "most.', reveals: 'textual-presentation-is-only-for' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_002', title: 'Tabular Presentation of Data and Parts of a Table',
          caseStudy: { intro: 'Imagine you are the class representative and your teacher hands you a sheet with 50 students\' names, their heights in cm, weights in kg, and their residential.',
            decisions: [{ prompt: 'List all eight parts of a statistical table in the order they appear from top to bottom.', options: [
                { text: 'The eight parts in order: (1) Table Number, (2) Title, (3) Captions/Column Headings, (4)', outcome: 'The eight parts in order: (1) Table Number, (2) Title, (3) Captions/Column Headings, (4) Stubs/Row.' },
                { text: 'or placing', outcome: 'Not quite — Students believe "stubs are always the first column on the left" and "captions are always the top.', reveals: 'stubs-are-always-the-first' },
                { text: 'before', outcome: 'Not quite — Students believe "stubs are always the first column on the left" and "captions are always the top.', reveals: 'stubs-are-always-the-first' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_003', title: 'Bar Diagrams: Simple, Multiple, and Component Bar Diagrams',
          scaffold: { problem: 'The table below shows India\'s exports (in ₹ crore) to five major regions in 2022-23.',
            steps: [
            { text: 'Identify the categorical variable (Region - 5 categories) and numerical variable (Exports in ₹ crore).' },
            { text: 'Choose a suitable scale. Maximum value = 54,000. Graph paper height = 15 cm.' },
            { text: 'Calculate bar heights: USA = 54,000/5,000 = 10.8 cm; EU = 9.7 cm; China = 3.64 cm; UAE = 6.2 cm; ASEAN = 5.56 cm.' },
            { text: 'Draw x-axis (horizontal) for regions, y-axis (vertical) for exports.' },
            { text: 'Interpret: Highest = USA (10.8 cm = ₹54,000 crore). Lowest = China (3.64 cm = ₹18,200 crore).', faded: true, blankAnswer: 'USA received highest exports (₹54,000 crore), exceeding.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_004', title: 'Pie Diagram: Construction and Interpretation',
          scaffold: { problem: 'A survey of 200 Class 11 students in a Delhi school revealed their preferred stream after Class 10: Science 72, Commerce 56, Humanities 48.',
            steps: [
            { text: 'Identify given data — total students = 200; category frequencies: Science 72, Commerce 56, Humanities 48, Vocational.' },
            { text: 'Calculate percentage for each stream: Science = (72/200)×100 = 36%; Commerce = (56/200)×100 = 28%; Humanities.' },
            { text: 'Convert percentages to central angles using θ = Percentage × 3.6°: Science = 36 × 3.6 = 129.6°; Commerce = 28 × 3.6.' },
            { text: 'Verify angle sum = 129.6 + 100.8 + 86.4 + 43.2 = 360° ✓. This confirms no calculation error.' },
            { text: 'Construction: Draw circle with compass (radius ~4 cm). Mark center O. Draw radius OA as baseline.', faded: true, blankAnswer: 'Science: 129.6° (36%), Commerce: 100.8° (28%), Humanities.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_005', title: 'Histogram: Construction for Equal and Unequal Class Intervals',
          scaffold: { problem: 'The following data shows the distribution of monthly electricity consumption (in kWh) of 68 households in a colony.',
            steps: [
            { text: 'Verify class intervals are continuous and equal. Intervals are 50–60, 60–70, … 120–130.' },
            { text: 'Since intervals are equal and continuous, no boundary conversion needed.' },
            { text: 'Choose suitable scales. X-axis: 1 cm = 10 kWh (starting from 50). Y-axis: 1 cm = 2 households (max frequency = 16).' },
            { text: 'Draw rectangles with bases [50,60], [60,70], … [120,130] and heights 4, 8, 12, 16, 10, 9, 5, 4 respectively.' },
            { text: 'Identify modal class — the rectangle with greatest height. Here, 80–90 kWh has height 16 (maximum).', faded: true, blankAnswer: 'Histogram constructed with 8 adjacent rectangles; modal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_04_006', title: 'Frequency Polygon: Construction from Histogram',
          scaffold: { problem: 'The following frequency distribution shows the daily earnings (in Rs) of 85 wage earners in a locality.',
            steps: [
            { text: 'Convert the inclusive class intervals to exclusive (continuous) form by subtracting 0.5 from lower limits and adding.' },
            { text: 'Calculate the class mark (mid-point) for each class: (Lower + Upper)/2.' },
            { text: 'Draw the histogram with class boundaries on the x-axis and frequencies on the y-axis.' },
            { text: 'On the histogram, mark the mid-point of the top horizontal side of each rectangle.' },
            { text: 'Add two extra classes with zero frequency at the ends: preceding class 39.5–44.5 (class mark 42, frequency 0) and.' },
            { text: 'Join all points in sequence: (42,0) → (47,2) → (52,3) → ... → (117,3) → (122,0) with straight line segments.', faded: true, blankAnswer: 'Frequency polygon constructed with vertices at (42,0).' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a report, a teammate says: \'Text can\'t carry real numbers — keep prose for feelings.\' Laying out a rainfall table (12 months × 5 cities), he puts months down the side \'because stubs are always the first column, months come first.\'',
            decisions: [{ prompt: 'How should presentation modes be chosen?', options: [
                { text: 'Match form to purpose: textual presentation legitimately embeds precise figures (population numbers work fine in prose) — it\'s for small data volumes needing emphasis or nuance. And table anatomy serves the COMPARISON: if the question is \'which city is wettest in July?\', cities as stubs with a July column lets the eye scan down — orientation is analytical, not chronological decoration.', outcome: 'The report gets intentional: prose for pointed figures, tables oriented so the intended comparison reads straight off.' },
                { text: 'Keep numbers out of prose — text is for description, tables for data.', outcome: 'Textual presentation is a real mode for exact figures in small volumes — NCERT\'s own case embeds crore-level numbers in sentences.', reveals: 'text-cant-hold-numbers' },
                { text: 'Keep months-as-stubs — chronological order is the natural table rule.', outcome: 'Stub vs caption is a choice that serves the question: the layout should put the compared variable where scanning answers fastest.', reveals: 'table-layout-is-rigid' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Text can carry exact numbers — but the moment readers must compare, the table earns its grid.',
            decisions: [{ prompt: 'What comes next? Presentation of Data · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Presentation of Data · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_001', difficulty: 'standard',
          question: 'Textual presentation of data is a method of describing statistical information.',
          hint: 'Revisit Class 7 Mathematics nodes c7_math_ch13_001 and c7_math_ch13_002 on statistical.',
          misconception: 'Students often believe textual presentation is only for qualitative descriptions (e.g., "most people liked the.',
          parts: [
                { id: 'a', prompt: 'Define textual presentation of data and state one advantage and one limitation mentioned in the NCERT textbook.', answer: 'Textual presentation means describing data within the text using sentences',
                  options: ['Textual presentation means describing data within the text using sentences', 'advantage: easy to compare numbers', 'most people liked the product', 'textual presentation is only for qualitative descriptions (e'],
                  hint: 'Revisit Class 7 Mathematics nodes c7_math_ch13_001 and c7_math_ch13_002 on statistical questions.',
                  misconception: 'Students often believe textual presentation is only for qualitative descriptions (e.g., "most people liked the product") and cannot handle.' },
                { id: 'b', prompt: 'Convert the following textual description into a simple table: "In a survey of 50 households, 20 use LPG, 15 use firewood, 10 use electricity, and 5 use biogas.', answer: 'Table: Two columns (Fuel Type, Number of Households) with four rows',
                  options: ['Table: Two columns (Fuel Type, Number of Households) with four rows', 'instant visual comparison', 'most people liked the product', 'textual presentation is only for qualitative descriptions (e'],
                  hint: 'Revisit Class 7 Mathematics nodes c7_math_ch13_001 and c7_math_ch13_002 on statistical questions.',
                  misconception: 'Students often believe textual presentation is only for qualitative descriptions (e.g., "most people liked the product") and cannot handle.' },
                { id: 'c', prompt: 'Compare textual and tabular presentation on three criteria: (a) ease of comparing magnitudes, (b) ability to highlight a specific finding, (c) space efficiency.', answer: 'ease of comparing magnitudes, (',
                  options: ['ease of comparing magnitudes, (', 'small data', 'most people liked the product', 'textual presentation is only for qualitative descriptions (e'],
                  hint: 'Revisit Class 7 Mathematics nodes c7_math_ch13_001 and c7_math_ch13_002 on statistical questions.',
                  misconception: 'Students often believe textual presentation is only for qualitative descriptions (e.g., "most people liked the product") and cannot handle.' }
          ],
            remediations: { 'textual-presentation-is-only-for': { steps: ['Show the student NCERT Case 2 (Census 2001 data) and ask them to list every number mentioned.', 'Have them convert those numbers into a table.', 'Ask: "Could you have answered \'What is the rural male worker count?\' from the text alone without re-reading?" 4.', 'Highlight that the text *does* contain quantitative data, but extracting relationships requires tabular organization.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_002', difficulty: 'standard',
          question: 'Tabular presentation of data is the systematic arrangement of numerical.',
          hint: 'Revisit Class 7 Maths Chapter 13 "Collecting and Organising Data: Frequency Tables".',
          misconception: 'Students believe "stubs are always the first column on the left" and "captions are always the top row" as rigid.',
          parts: [
                { id: 'a', prompt: 'A student creates a table showing "Literacy Rate by State and Gender" with states as rows and gender as columns. The cells contain percentages like 82.1, 65.5.', answer: 'The title "Percentage" is insufficient',
                  options: ['The title "Percentage" is insufficient', 'stubs are always the first column on the left', 'captions are always the top row'],
                  hint: 'Revisit Class 7 Maths Chapter 13 "Collecting and Organising Data: Frequency Tables" — practice.',
                  misconception: 'Students believe "stubs are always the first column on the left" and "captions are always the top row" as rigid formatting rules.' }
          ],
            remediations: { 'stubs-are-always-the-first': { steps: ['Give the student two raw datasets: (A) "Population of 5 states over 10 years" and (B) "Literacy rate by gender for 5.', 'Ask: "For each, which variable should be stubs and which captions if we want to compare (i) trends over time, (ii).', 'Have them construct both orientations for each dataset.', 'Ask them to answer the comparison questions using their tables.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "stubs are always the first column on the left" and "captions are always the top row" as rigid.',
          parts: [
                { id: 'a', prompt: 'A researcher presents a table titled "Income Distribution of Farmers in Punjab" with class intervals: 0-50000, 50000-100000, 100000-200000, 200000-500000.', answer: 'The omission is **not acceptable**',
                  options: ['The omission is **not acceptable**', 'it\'s fine, the table is clear', 'stubs are always the first column on the left', 'captions are always the top row'],
                  hint: 'Revisit Class 7 Maths Chapter 13 "Collecting and Organising Data: Frequency Tables" — practice.',
                  misconception: 'Students believe "stubs are always the first column on the left" and "captions are always the top row" as rigid formatting rules.' }
          ],
            remediations: { 'stubs-are-always-the-first': { steps: ['Give the student two raw datasets: (A) "Population of 5 states over 10 years" and (B) "Literacy rate by gender for 5.', 'Ask: "For each, which variable should be stubs and which captions if we want to compare (i) trends over time, (ii).', 'Have them construct both orientations for each dataset.', 'Ask them to answer the comparison questions using their tables.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_003', difficulty: 'standard',
          question: 'Bar diagrams are one-dimensional geometric diagrams where rectangular bars.',
          hint: 'Revisit c11_stat_cbse_04_002 (Tabular Presentation) to practice converting raw data into.',
          misconception: 'Students believe component bar diagrams can be used for ANY multiple-variable data, not realizing they require the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bar diagrams are one-dimensional geometric diagrams where rectangular bars of equal width',
                  options: ['Bar diagrams are one-dimensional geometric diagrams where rectangular bars of equal width', 'Textual presentation of data is a method of describing statistical information entirely', 'Tabular presentation of data is the systematic arrangement of numerical information in', 'A pie diagram is a circular statistical graphic divided into sectors (slices) where each'],
                  hint: 'Revisit c11_stat_cbse_04_002 (Tabular Presentation) to practice converting raw data into structured.',
                  misconception: 'Students believe component bar diagrams can be used for ANY multiple-variable data, not realizing they require the variables to be mutually.' }
          ],
            remediations: { 'component-bar-diagrams-can-be': { steps: ['If a student constructs a component bar diagram for non-additive variables: (1) Ask: "What does the total height.', '(3) Contrast with correct example: Food (₹15k) + Rent (₹8k) + Transport (₹2k) = Total Expenses (₹25k).', '(4) Have them re-draw as multiple bar diagram.', '(5) Reinforce rule: "Stack only when parts make a whole."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_004', difficulty: 'standard',
          question: 'A pie diagram is a circular statistical graphic divided into sectors (slices).',
          hint: 'If stuck, revisit Class 8 Mathematics Chapter 8 "Percentages" (c8_math_ch8_1) for.',
          misconception: 'Students frequently believe that the radius of each sector can vary to represent magnitude (like a bar\'s height).',
          parts: [
                { id: 'a', prompt: 'What is the exact formula to convert a component\'s percentage value into its central angle in a pie diagram, and why is the multiplier 3.6° used?', answer: 'The formula is: Central Angle = Percentage × 3.6°',
                  options: ['The formula is: Central Angle = Percentage × 3.6°', 'multiply by 360', 'divide by 100'],
                  hint: 'If stuck, revisit Class 8 Mathematics Chapter 8 "Percentages" (c8_math_ch8_1) for percentage.',
                  misconception: 'Students frequently believe that the radius of each sector can vary to represent magnitude (like a bar\'s height), leading them to draw.' },
                { id: 'b', prompt: 'Given the same family expenditure data, you create both a pie diagram and a component bar diagram.', answer: 'ease of comparing Food vs Rent, (',
                  options: ['ease of comparing Food vs Rent, (', 'pie is always better for comparison'],
                  hint: 'If stuck, revisit Class 8 Mathematics Chapter 8 "Percentages" (c8_math_ch8_1) for percentage.',
                  misconception: 'Students frequently believe that the radius of each sector can vary to represent magnitude (like a bar\'s height), leading them to draw.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['If a student draws varying radii or uses raw values as angles: (1) Give them a circular paper cutout.', 'Ask: "Fold it in half — what angle?', 'This proves all sectors share the SAME radius; only the angle changes." (2) Have them calculate total frequency, then.', '1/5 of 360° = 72°." (3) Practice with 3 datasets: (a) equal frequencies (all angles equal), (b) one dominant category.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_005', difficulty: 'standard',
          question: 'A histogram is a two-dimensional graphical representation of a continuous.',
          hint: 'Revisit c11_stat_cbse_04_002 (Tabular Presentation) for class boundary conversion, and.',
          misconception: 'Students believe that for unequal class intervals, they can simply plot frequency as height and adjust rectangle widths.',
          parts: [
                { id: 'a', prompt: 'A student draws a histogram for the data: Class 0–10 (f=5), 10–20 (f=8), 20–30 (f=12), 30–40 (f=7), 40–50 (f=3) by making all rectangles of equal width and.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'area = frequency', 'height represents frequency', 'area represents frequency'],
                  hint: 'Revisit c11_stat_cbse_04_002 (Tabular Presentation) for class boundary conversion, and.',
                  misconception: 'Students believe that for unequal class intervals, they can simply plot frequency as height and adjust rectangle widths to match class.' },
                { id: 'b', prompt: 'For the data: Marks 0–20 (6 students), 20–50 (10 students), 50–70 (14 students), 70–100 (10 students).', answer: 'Class widths are unequal: 20, 30, 20, 30',
                  options: ['Class widths are unequal: 20, 30, 20, 30', 'area will automatically be proportional to frequency'],
                  hint: 'Revisit c11_stat_cbse_04_002 (Tabular Presentation) for class boundary conversion, and.',
                  misconception: 'Students believe that for unequal class intervals, they can simply plot frequency as height and adjust rectangle widths to match class.' }
          ],
            remediations: { 'for-unequal-class-intervals': { steps: ['Give the student a concrete unequal-interval example: Class 0–5 (f=10), 5–15 (f=10), 15–20 (f=10).', 'Show that areas are 50, 100, 50 — not equal — but all frequencies are 10, so areas should be equal.', 'Derive frequency density: 10/5=2, 10/10=1, 10/5=2. Draw new rectangles with heights 2, 1, 2 and same widths — areas now.', 'Have the student practice with 3 more unequal distributions until they automatically compute density before plotting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_04_006', difficulty: 'standard',
          question: 'A frequency polygon is a graphical representation of a grouped frequency.',
          hint: 'If stuck, revisit the histogram construction (c11_stat_cbse_04_005) and practice.',
          misconception: 'Students frequently believe the frequency polygon is drawn by joining the upper right corners (or upper left corners).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A frequency polygon is a graphical representation of a grouped frequency distribution',
                  options: ['A frequency polygon is a graphical representation of a grouped frequency distribution', 'Textual presentation of data is a method of describing statistical information entirely', 'Tabular presentation of data is the systematic arrangement of numerical information in', 'Bar diagrams are one-dimensional geometric diagrams where rectangular bars of equal width'],
                  hint: 'If stuck, revisit the histogram construction (c11_stat_cbse_04_005) and practice calculating class.',
                  misconception: 'Students frequently believe the frequency polygon is drawn by joining the upper right corners (or upper left corners) of the histogram.' }
          ],
            remediations: { 'students-frequently-believe-the-frequency': { steps: ['If a student joins rectangle corners, immediately draw a simple histogram with two rectangles of different heights.', 'Ask: "Where is the class mark of the first class?" (mid-point of base).', 'Ask: "Where is the point on the top edge directly above this class mark?" (mid-point of top edge).', 'Show that the upper right corner is above the upper class boundary, not the class mark.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
