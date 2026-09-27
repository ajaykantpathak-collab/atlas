import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch14 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch14: SimDef = {
    id: 'v3_c9_math_ch14',
    title: 'Statistics',
    subtitle: 'This node covers: definitions of data/types, raw data vs. organized data, array.',
    classLevel: 9, subject: 'mathematics', topic: 'Statistics',
    chapters: ['c9_math_ch14'],
    nodeIds: ['c9_math_ch14_1', 'c9_math_ch14_2', 'c9_math_ch14_3', 'c9_math_ch14_4', 'c9_math_ch14_5', 'c9_math_ch14_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '**Start here:** "Your school principal wants to know the **daily pocket money** (in ₹) of all 35 students.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A grouped frequency table for weights (kg) of 30 students is given: | Class Interval | Frequency | |----------------|-----------| | 30-35 | 4 | | 35-40 | 6 | |.',
        options: ['**Correct Answer:** 1', 'Inclusive Form', '35 appears twice'],
        answer: '**Correct Answer:** 1',
        hook: '**The "Inclusive Form Hangover":** Students carry the Class 6-8 habit of writing class intervals as **1-10, 11-20.',
    },
    teaching: [
        { title: 'Collection and Presentation of Data', text: '**Collection of Data** is the systematic process of gathering numerical facts or observations (raw data) relevant to a specific statistical investigation, classified as **Primary Data** (collected.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch14_1', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_1', title: 'Collection and Presentation of Data',
          scaffold: { problem: 'The **daily electricity consumption (in units)** of a household in Delhi for 30 days of June is recorded as:',
            steps: [
            { text: 'List the raw data clearly and count total observations (n = 30).' },
            { text: 'Identify all distinct values: 7, 8, 9, 10, 11, 12, 13, 14. Sort them ascending (Array).' },
            { text: 'Create a table with columns: Consumption (x), Tally Marks, Frequency (f).' },
            { text: 'Count tally marks for each value to get frequency. Verify Σf = 30.' },
            { text: 'Calculate Range = Maximum value - Minimum value = 14 - 7 = 7 units.', faded: true, blankAnswer: '| Consumption (units) | Tally Marks | Frequency |' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_2', title: 'Grouped Frequency Distribution Tables',
          scaffold: { problem: 'The daily maximum temperatures (in °C) recorded in Delhi for 30 days in May are: 42, 38, 40, 41, 39, 43, 44, 37, 36, 38, 40, 42, 41, 39.',
            steps: [
            { text: 'Identify the data range. Minimum = 36, Maximum = 45. Range = 45 – 36 = 9. Given class width = 2.' },
            { text: 'Write all class intervals (exclusive method, continuous): 36–38, 38–40, 40–42, 42–44, 44–46.' },
            { text: 'Tally each temperature into the correct class. Remember: 38 goes to 38–40, not 36–38.' },
            { text: 'Identify highest frequency. Three classes (38–40, 40–42, 42–44) have frequency 6 (modal classes).' },
            { text: 'Interpret: The temperature most frequently clustered around 39°C, 41°C, and 43°C (three peaks).', faded: true, blankAnswer: 'Grouped frequency table constructed. Highest frequency = 6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_3', title: 'Bar Graphs, Histograms and Frequency Polygons',
          scaffold: { problem: 'The daily earnings (in ₹) of 50 workers in a factory are given below. Construct a histogram and frequency polygon.',
            steps: [
            { text: 'Verify class intervals are continuous (100-150, 150-200…) and equal width (50).' },
            { text: 'Draw axes: x-axis = Daily Earnings (₹) from 100 to 350; y-axis = Number of Workers from 0 to 15.' },
            { text: 'Draw rectangles for each class: base = class interval, height = frequency. Bars touch (no gaps).' },
            { text: 'For frequency polygon, compute class marks: (100+150)/2=125, (150+200)/2=175, (200+250)/2=225, (250+300)/2=275.' },
            { text: 'Add imagined classes: 50-100 (mark 75, freq 0) and 350-400 (mark 375, freq 0).', faded: true, blankAnswer: 'Histogram with 5 touching rectangles (heights 8,12,15,10,5).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_4', title: 'Mean of Grouped and Ungrouped Data',
          scaffold: { problem: 'A teacher recorded the scores of 20 students in a mathematics quiz out of 25 marks.',
            steps: [
            { text: 'List all scores and count the number of students (n = 20).' },
            { text: 'Add all scores: 18+20+15+22+17+19+21+16+20+18+22+19+17+20+21+18+19+20+16+22 = 380' },
            { text: 'Write the formula for mean of ungrouped data: \\(\\bar{x} = \\frac{\\sum x_i}{n}\\)' },
            { text: 'Substitute values: \\(\\bar{x} = \\frac{380}{20}\\)' },
            { text: 'Divide: 380 ÷ 20 = 19', faded: true, blankAnswer: '19 marks' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_5', title: 'Median and Mode',
          scaffold: { problem: 'The weekly pocket money (in ₹) of 30 Class 9 students is recorded in the following grouped frequency table. Find the median pocket money.',
            steps: [
            { text: 'Find total frequency N = 4 + 7 + 10 + 6 + 3 = 30. Compute N/2 = 15.' },
            { text: 'Construct cumulative frequency column: 4, 11 (4+7), 21 (11+10), 27 (21+6), 30 (27+3).' },
            { text: 'Identify median class: The cumulative frequency just greater than N/2 = 15 is 21, corresponding to class 200–250.' },
            { text: 'Extract formula values: l = 200 (lower limit of median class), cf = 11 (cumulative frequency of class BEFORE median.' },
            { text: 'Apply median formula: Median = l + ((N/2 - cf)/f) × h = 200 + ((15 - 11)/10) × 50 = 200 + (4/10) × 50 = 200 + 20 = 220.', faded: true, blankAnswer: '₹220' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch14_6', title: 'Choosing the Right Central Tendency Measure',
          scaffold: { problem: 'The daily wages (in ₹) of 10 workers at a construction site in Jaipur are: 350, 360, 370, 380, 380, 390, 400, 410, 420, 2500.',
            steps: [
            { text: 'Organise data in ascending order (already sorted): 350, 360, 370, 380, 380, 390, 400, 410, 420, 2500. Identify n = 10.' },
            { text: 'Calculate mean = (sum of all wages) ÷ 10 = (350+360+370+380+380+390+400+410+420+2500) ÷ 10 = 5960 ÷ 10 = ₹596.' },
            { text: 'Calculate median = average of 5th and 6th values (since n=10 even) = (380 + 390) ÷ 2 = ₹385.' },
            { text: 'Calculate mode = value with highest frequency = 380 (appears twice, all others once).' },
            { text: 'Compare: Mean (₹596) is pulled up by the single outlier ₹2500 (likely the supervisor\'s own wage).' },
            { text: 'Conclusion: The supervisor\'s claim is misleading. The median ₹385 or mode ₹380 honestly represents typical wages.', faded: true, blankAnswer: 'Mean = ₹596, Median = ₹385, Mode = ₹380. Best measure.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch14_6', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch14_6', title: 'You made it',
          caseStudy: { intro: 'You finished Statistics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch14_1', difficulty: 'standard',
          question: '**Collection of Data** is the systematic process of gathering numerical facts.',
          hint: 'Revisit **c7_math_ch13_002 (Frequency Tables)** and **c8_math_ch12_11 (Range)**.',
          misconception: '**The "Inclusive Form Hangover":** Students carry the Class 6-8 habit of writing class intervals as **1-10, 11-20.',
          parts: [
                { id: 'a', prompt: 'A grouped frequency table for weights (kg) of 30 students is given: | Class Interval | Frequency | |----------------|-----------| | 30-35 | 4 | | 35-40 | 6 | |.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Inclusive Form', '35 appears twice'],
                  hint: 'Revisit **c7_math_ch13_002 (Frequency Tables)** and **c8_math_ch12_11 (Range)** — practice making.',
                  misconception: '**The "Inclusive Form Hangover":** Students carry the Class 6-8 habit of writing class intervals as **1-10, 11-20, 21-30**.' }
          ],
            remediations: { 'the-inclusive-form-hangover-students': { steps: ['**Step-by-step remediation:** 1.', '**Show the gap:** Give raw data: 10.5, 11.5, 19.5, 20.5.', 'Ask: "Put these in your table 1-10, 11-20..." Student sees 10.5 and 20.5 **have no class**.', '**Define the fix:** "For continuous data, Class 9 uses **Exclusive Form**: 10-20 means **10 ≤ x < 20**.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_2', difficulty: 'standard',
          question: 'A Grouped Frequency Distribution Table organizes raw numerical data into.',
          hint: 'Revisit c9_math_ch14_1 (Collection and Presentation of Data) and c7_math_ch13_002.',
          misconception: 'Students treat class limits as class boundaries in the inclusive method without adjustment.',
          parts: [
                { id: 'a', prompt: 'Why must class intervals in a grouped frequency distribution be mutually exclusive and exhaustive? Explain with an example of what goes wrong if they are not.', answer: 'Mutually exclusive ensures each data point belongs to exactly one class (no',
                  options: ['Mutually exclusive ensures each data point belongs to exactly one class (no', 'neatness', 'ease of reading'],
                  hint: 'Revisit c9_math_ch14_1 (Collection and Presentation of Data) and c7_math_ch13_002 (Frequency.',
                  misconception: 'Students treat class limits as class boundaries in the inclusive method without adjustment.' },
                { id: 'b', prompt: 'A student creates classes 0–10, 11–20, 21–30 for data ranging from 5 to 28.', answer: 'Flaw 1: Gaps between classes (10–11, 20–21)',
                  options: ['Flaw 1: Gaps between classes (10–11, 20–21)', 'make class width equal', 'add 0.5', 'only says "make class width equal" misses the gap issue'],
                  hint: 'Revisit c9_math_ch14_1 (Collection and Presentation of Data) and c7_math_ch13_002 (Frequency.',
                  misconception: 'Students treat class limits as class boundaries in the inclusive method without adjustment.' }
          ],
            remediations: { 'students-treat-class-limits-as': { steps: ['Ask the student to write two consecutive inclusive classes (e.g., 10–19, 20–29).', 'Ask "What is the upper boundary of the first class? The lower boundary of the second?" Guide them to average the two.', 'Show that the first class actually spans from 9.5 to 19.5 (lower boundary = (9+10)/2 = 9.5).', 'Compute width = 19.5 – 9.5 = 10.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_3', difficulty: 'standard',
          question: 'A **bar graph** represents categorical or discrete data using rectangular bars.',
          hint: 'If stuck, revisit c9_math_ch14_2 (Grouped Frequency Distribution Tables) and practice.',
          misconception: 'Students draw histograms with gaps between bars (like bar graphs) because they think "bars always have gaps".',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a bar graph and a histogram in terms of the data they represent and the spacing between bars?', answer: 'A bar graph represents categorical or discrete data with gaps between bars',
                  options: ['A bar graph represents categorical or discrete data with gaps between bars', 'both have gaps', 'histogram is just a prettier bar graph'],
                  hint: 'If stuck, revisit c9_math_ch14_2 (Grouped Frequency Distribution Tables) and practice making.',
                  misconception: 'Students draw histograms with gaps between bars (like bar graphs) because they think "bars always have gaps".' },
                { id: 'b', prompt: 'In a histogram with unequal class widths, why can\'t we simply use frequency as the height of the rectangles? What must we use instead?', answer: 'If class widths are unequal, using frequency as height misrepresents the data',
                  options: ['If class widths are unequal, using frequency as height misrepresents the data', 'use relative frequency', 'make all classes equal width'],
                  hint: 'If stuck, revisit c9_math_ch14_2 (Grouped Frequency Distribution Tables) and practice making.',
                  misconception: 'Students draw histograms with gaps between bars (like bar graphs) because they think "bars always have gaps".' },
                { id: 'c', prompt: 'A student draws a histogram for the data: Class 0-10 (freq 5), 10-20 (freq 8), 20-30 (freq 12), 30-50 (freq 10), 50-70 (freq 5).', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'it\'s fine if it looks neat', 'visual neatness matters more than mathematical accuracy of area ∝ frequency'],
                  hint: 'If stuck, revisit c9_math_ch14_2 (Grouped Frequency Distribution Tables) and practice making.',
                  misconception: 'Students draw histograms with gaps between bars (like bar graphs) because they think "bars always have gaps".' }
          ],
            remediations: { 'students-draw-histograms-with-gaps': { steps: ['**Revisit continuity:** Ask the student to measure their pencil length to the nearest mm — is it exactly 14 cm or 14.3.', 'Data is continuous → bars must touch.', '**Class mark drill:** Give 5 class intervals (e.g., 10-20, 20-30…), ask student to write class marks.', '**Frequency density practice:** Provide a table with unequal widths (e.g., 0-5, 5-15, 15-20).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_4', difficulty: 'standard',
          question: 'The mean of ungrouped data is the sum of all observations divided by the total.',
          hint: 'Review how to find the class mark (midpoint) of a class interval: add the lower and upper.',
          misconception: 'Students often add the frequencies and divide by the number of classes when calculating mean of grouped data, e.g., for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mean of ungrouped data is the sum of all observations divided by the total number of',
                  options: ['The mean of ungrouped data is the sum of all observations divided by the total number of', '**Collection of Data** is the systematic process of gathering numerical facts or', 'A Grouped Frequency Distribution Table organizes raw numerical data into mutually', 'A **bar graph** represents categorical or discrete data using rectangular bars of equal'],
                  hint: 'Review how to find the class mark (midpoint) of a class interval: add the lower and upper limits.',
                  misconception: 'Students often add the frequencies and divide by the number of classes when calculating mean of grouped data, e.g., for classes with.' }
          ],
            remediations: { 'students-often-add-the-frequencies': { steps: ['To fix this, explicitly ask: "What are we trying to find the average of?" Guide the student to write: "We want the.', 'Use a concrete example: "If 4 students got 5 marks each, their total is 20 — not 4."'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often add the frequencies and divide by the number of classes when calculating mean of grouped data, e.g., for.',
          parts: [
                { id: 'a', prompt: 'A student calculated the mean of grouped data as follows: Class: 0-10, 10-20, 20-30 Frequency: 3, 5, 2 They used lower limits (0, 10, 20) and got mean = (3×0.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'yes, it’s correct'],
                  hint: 'Review how to find the class mark (midpoint) of a class interval: add the lower and upper limits.',
                  misconception: 'Students often add the frequencies and divide by the number of classes when calculating mean of grouped data, e.g., for classes with.' }
          ],
            remediations: { 'students-often-add-the-frequencies': { steps: ['To fix this, explicitly ask: "What are we trying to find the average of?" Guide the student to write: "We want the.', 'Use a concrete example: "If 4 students got 5 marks each, their total is 20 — not 4."'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_5', difficulty: 'standard',
          question: 'The **median** of a data set is the value of the middle observation when the.',
          hint: 'Revisit c9_math_ch14_2 — practice making cumulative frequency tables and identifying.',
          misconception: 'Students use the **wrong cumulative frequency (cf)** in the median formula for grouped data: they take cf as the.',
          parts: [
                { id: 'a', prompt: 'A data set has 15 observations arranged in ascending order. Without knowing the actual values, at which position(s) will you find the median? Explain why.', answer: 'The median is at the 8th position',
                  options: ['The median is at the 8th position', '7th or 8th', 'average of 7th and 8th', 'median is always an average of two middle values'],
                  hint: 'Revisit c9_math_ch14_2 — practice making cumulative frequency tables and identifying "class.',
                  misconception: 'Students use the **wrong cumulative frequency (cf)** in the median formula for grouped data: they take cf as the cumulative frequency **of.' },
                { id: 'b', prompt: 'The marks of 10 students in a test (out of 20) are: 12, 15, 18, 12, 14, 15, 15, 17, 12, 16.', answer: 'No, it\'s incorrect',
                  options: ['No, it\'s incorrect', 'most often', 'middle position'],
                  hint: 'Revisit c9_math_ch14_2 — practice making cumulative frequency tables and identifying "class.',
                  misconception: 'Students use the **wrong cumulative frequency (cf)** in the median formula for grouped data: they take cf as the cumulative frequency **of.' }
          ],
            remediations: { 'students-use-the-wrong-cumulative': { steps: ['**For median cf error**: Make the student write the cumulative frequency column **explicitly** and circle the row.', 'Say: "cf is the running total UP TO the previous class — it\'s how many observations are strictly below the median.', '**For mode f0/f2 swap**: Draw the histogram bars.', 'Point: "f0 is the left neighbour bar\'s height, f2 is the right neighbour bar\'s height.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch14_6', difficulty: 'standard',
          question: 'Choosing the right measure of central tendency involves selecting among mean.',
          hint: 'If stuck, revisit c9_math_ch14_4 (mean calculation) and c9_math_ch14_5 (median/mode.',
          misconception: 'Students mechanically compute the mean for every dataset because it\'s the "default" formula they practised most.',
          parts: [
                { id: 'a', prompt: 'A survey records the favourite ice cream flavours of 50 students: Vanilla (18), Chocolate (22), Strawberry (7), Butterscotch (3).', answer: 'The mode is appropriate',
                  options: ['The mode is appropriate', 'median', 'mean" or "median'],
                  hint: 'If stuck, revisit c9_math_ch14_4 (mean calculation) and c9_math_ch14_5 (median/mode calculation).',
                  misconception: 'Students mechanically compute the mean for every dataset because it\'s the "default" formula they practised most.' }
          ],
            remediations: { 'students-mechanically-compute-the-mean': { steps: ['Give the student a dataset with an obvious outlier (e.g., pocket money: 200, 210, 220, 230, 2000).', 'Make them calculate median (220) and compare.', 'Show a categorical dataset (favourite subjects) — ask them to find the mean. When they can\'t, ask "Which measure works?"', 'Give a frequency table with open-ended classes — ask why mean fails but median works.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
