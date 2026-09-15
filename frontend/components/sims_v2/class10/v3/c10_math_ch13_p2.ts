import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch13_p2: SimDef = {
    id: 'v3_c10_math_ch13_p2',
    title: 'Statistics · Part 2/2',
    subtitle: 'Find the honest average hidden inside grouped data',
    classLevel: 10, subject: 'mathematics', topic: 'Statistics · Part 2/2',
    chapters: ['c10_math_ch13'],
    nodeIds: ['c10_math_cbse_13_007', 'c10_math_cbse_13_008', 'c10_math_cbse_13_009', 'c10_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data analyst decoding survey tables', intro: 'A newspaper hands you a wage table with ranges, not numbers — and asks for \'the average worker.\' Your job: make midpoints speak, then check whether the median or mode tells a truer story.', goal: 'Calculate mean, median and mode for grouped data and interpret which measure best represents a dataset.' },
    discovery: {
        question: 'A survey reports \'average daily wage of factory workers\' from grouped data — 0–100, 100–200, 200–300 — with worker counts per bracket. There are no exact wages, only ranges. How do you average data you can\'t fully see?',
        options: ['Use each class\'s midpoint (class mark) as its representative value, weight by frequency, and divide by total workers', 'Just average the class boundaries — no frequencies needed', 'You can\'t — grouped data has no mean', 'Use only the biggest class\'s midpoint'],
        answer: 'Use each class\'s midpoint (class mark) as its representative value, weight by frequency, and divide by total workers',
        hook: 'When raw numbers hide inside ranges, the midpoint becomes each group\'s spokesperson. The mean of grouped data is an honest estimate — assuming each class clusters at its centre.',
    },
    teaching: [
        { title: 'Finding Median from an Ogive (Less Than and More Than Type)', text: 'The median of a grouped frequency distribution can be determined graphically by drawing either a \'less than\' ogive or a \'more than\' ogive (or both on the same axes).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_13_007', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Compute mean by direct, assumed-mean and step-deviation methods on real frequency tables, then hunt the median and mode that resist the \'average\' story the mean tells.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_007', title: 'Finding Median from an Ogive (Less Than and More Than Type)',
          scaffold: { problem: 'The following table gives the daily wages (in ₹) of 110 workers in a factory. Draw a \'less than\' ogive and find the median wage.',
            steps: [
            { text: 'Calculate cumulative frequencies (less than type). Upper class boundaries: 120, 140, 160, 180, 200.' },
            { text: 'Choose suitable scale. x-axis: 1 cm = ₹10 (starting from 100). y-axis: 1 cm = 10 workers.' },
            { text: 'Draw a smooth freehand curve through the points. This is the \'less than\' ogive.' },
            { text: 'Find N/2 = 110/2 = 55. Mark 55 on y-axis. Draw a horizontal line from 55 to meet the ogive at point P.' },
            { text: 'From P, draw a perpendicular to the x-axis meeting at M. Read the x-coordinate of M. Median wage ≈ ₹155.' },
            { text: 'Verify with formula. Median class = 140-160 (cf=65 ≥ 55). l=140, cf=30, f=35, h=20.', faded: true, blankAnswer: 'Median wage ≈ ₹155 (graphical), ₹154.29 (formula).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_008', title: 'Relation Between Mean, Median and Mode (Empirical Formula)',
          scaffold: { problem: 'For a moderately skewed distribution, the mean is 50 and the median is 52. Find the mode using the empirical relationship.',
            steps: [
            { text: 'State the empirical formula: Mode = 3 × Median − 2 × Mean.' },
            { text: 'Substitute the given values: Mode = 3(52) − 2(50).' },
            { text: 'Compute: Mode = 156 − 100 = 56.' },
            { text: 'Verify: In a moderately skewed distribution, the mode should be the farthest from the mean.', faded: true, blankAnswer: 'Mode = 56.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_009', title: 'Choosing the Appropriate Method: Direct vs Assumed Mean vs Step-Deviation',
          scaffold: { problem: 'The following table shows the daily wages (in ₹) of 30 workers in a small factory.',
            steps: [
            { text: 'Examine the data. Class marks are 110, 130, 150, 170, 190. Frequencies are small (max 10).' },
            { text: 'Choose Step-Deviation Method. Let assumed mean A = 150 (mid-value of middle class). Class width h = 20.' },
            { text: 'Compute ui = (xi – A)/h for each class.' },
            { text: 'Multiply fi ui and sum.' },
            { text: 'Apply formula: Mean = A + h × (Σfi ui / Σfi) = 150 + 20 × (-2/30) = 150 - 40/30 = 150 - 1.333... = 148.67 (approx).', faded: true, blankAnswer: 'Mean daily wage = ₹148.67 (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_010', title: 'Word Problems: Interpreting Frequency Distribution Tables',
          scaffold: { problem: 'The following table shows the daily pocket allowance (in ₹) of 50 students of a school.',
            steps: [
            { text: 'Identify what is given and what is asked. Given: grouped frequency table with one missing frequency f, class intervals.' },
            { text: 'Choose the step-deviation method because class marks are large and h is constant.' },
            { text: 'Construct the calculation table:' },
            { text: 'Apply step-deviation formula: Mean = a + h(Σfiui/Σfi). Substitute: 18 = 18 + 2 × ((-20 + f)/(44 + f)).' },
            { text: 'Solve for f: 0 = 2(-20 + f)/(44 + f) → 0 = -20 + f → f = 20.' },
            { text: 'Verify: Total N = 64. Σfixi = 7×12 + 6×14 + 9×16 + 13×18 + 20×20 + 5×22 + 4×24 = 84+84+144+234+400+110+96 = 1152.', faded: true, blankAnswer: 'f = 20' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_13_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school health camp, the mean weight of 100 children comes out as 38.2 kg — then someone discovers the scale read 0.5 kg too low for every child. A volunteer says the whole table must be re-entered and the mean recalculated from scratch.',
            decisions: [{ prompt: 'Is a full recalculation really needed?', options: [
                { text: 'No — adding a fixed amount to every single data value shifts the mean by exactly that amount, so the corrected mean is simply 38.2 + 0.5 = 38.7 kg. The same shortcut works in reverse for any uniform error: the mean moves with the data.', outcome: 'Because the mean is the total divided by the count, bumping every entry by 0.5 adds 0.5 to the total\'s per-child share — one addition replaces a hundred corrections.' },
                { text: 'The volunteer is right — any measurement error means every entry must be corrected before the mean can be trusted.', outcome: 'Individual entries do need the +0.5, but the mean needs no rebuild — a uniform shift in all values produces the identical shift in the average.', reveals: 'mean-must-be-recomputed' },
                { text: 'The mean stays 38.2 kg anyway, since a constant error cancels out across so many children.', outcome: 'A constant offset does not average away — it shifts every value the same direction, so it shifts the mean by the full 0.5 kg, not by zero.', reveals: 'constant-error-cancels' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_13_010', title: 'You made it',
          caseStudy: { intro: 'Mean, median, mode — three different witnesses describing the same data. Learn when they agree and when the \'average\' is lying to you politely.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_13_007', difficulty: 'standard',
          question: 'The median of a grouped frequency distribution can be determined graphically.',
          hint: 'Review node c10_math_cbse_13_006 for step-by-step ogive construction, especially plotting.',
          misconception: 'Students often confuse the axes when reading the median: they drop the perpendicular from the curve to the y-axis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The median of a grouped frequency distribution can be determined graphically by drawing',
                  options: ['The median of a grouped frequency distribution can be determined graphically by drawing', 'The mean of grouped data using the direct method is the arithmetic average calculated by', 'The Assumed Mean Method calculates the mean of grouped data by choosing an arbitrary', 'The Step-Deviation Method is a computational technique for finding the mean of grouped'],
                  hint: 'Review node c10_math_cbse_13_006 for step-by-step ogive construction, especially plotting.',
                  misconception: 'Students often confuse the axes when reading the median: they drop the perpendicular from the curve to the y-axis (cumulative frequency.' }
          ],
            remediations: { 'students-often-confuse-the-axes': { steps: ['If a student drops the perpendicular to the wrong axis, ask: "What does the horizontal axis represent?', 'What does the vertical axis represent?', 'The median is a value of the variable (like marks in ₹, height in cm), so which axis gives the variable?" Have them.', 'Practice: given a plotted ogive, physically trace with finger from N/2 on y-axis → curve → x-axis while saying.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_008', difficulty: 'standard',
          question: 'The empirical relationship between mean, median, and mode for a moderately.',
          hint: 'Review the definitions and formulas for mean (c10_math_cbse_13_001), median.',
          misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.',
          parts: [
                { id: 'a', prompt: 'State the empirical relationship between mean, median, and mode.', answer: 'Mode = 3 × Median − 2 × Mean',
                  options: ['Mode = 3 × Median − 2 × Mean', 'Mean = 3 Mode − 2 Median'],
                  hint: 'Review the definitions and formulas for mean (c10_math_cbse_13_001), median (c10_math_cbse_13_004).',
                  misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.' },
                { id: 'b', prompt: 'In a symmetric distribution, what is the relationship between mean, median, and mode?', answer: 'In a symmetric distribution, Mean = Median = Mode',
                  options: ['In a symmetric distribution, Mean = Median = Mode', 'they are different even in symmetric distributions'],
                  hint: 'Review the definitions and formulas for mean (c10_math_cbse_13_001), median (c10_math_cbse_13_004).',
                  misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['Write the formula Mode = 3 Median − 2 Mean on a flashcard and practice deriving each variable from the other two.', 'For a symmetric distribution, show that all three measures coincide and the formula gives Mode = Mean = Median.', 'Practice 10 problems: given two measures, find the third.', 'Emphasise: this is an APPROXIMATE relationship for moderately skewed data, not an exact theorem.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.',
          parts: [
                { id: 'a', prompt: 'Why is the formula called "empirical"?', answer: 'The formula is called empirical',
                  options: ['The formula is called empirical', 'because it was proved by an empiricist', 'empirical'],
                  hint: 'Review the definitions and formulas for mean (c10_math_cbse_13_001), median (c10_math_cbse_13_004).',
                  misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.' },
                { id: 'b', prompt: 'A frequency distribution has Mean = 25, Median = 26, and Mode = 28. Verify whether the empirical relationship holds.', answer: 'Check: 3 × Median − 2 × Mean = 3(26) − 2(25) = 78 − 50 = 28',
                  options: ['Check: 3 × Median − 2 × Mean = 3(26) − 2(25) = 78 − 50 = 28', '28 ≠ 26, so it doesn\'t hold'],
                  hint: 'Review the definitions and formulas for mean (c10_math_cbse_13_001), median (c10_math_cbse_13_004).',
                  misconception: 'Students often confuse the formula direction: Mode = 3 Median − 2 Mean, NOT Mean = 3 Mode − 2 Median.' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['Write the formula Mode = 3 Median − 2 Mean on a flashcard and practice deriving each variable from the other two.', 'For a symmetric distribution, show that all three measures coincide and the formula gives Mode = Mean = Median.', 'Practice 10 problems: given two measures, find the third.', 'Emphasise: this is an APPROXIMATE relationship for moderately skewed data, not an exact theorem.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_009', difficulty: 'standard',
          question: 'Choosing the appropriate method for finding the mean of grouped data involves.',
          hint: 'If stuck, revisit nodes c10_math_cbse_13_001, 002, 003 and practice identifying equal.',
          misconception: 'Students believe the Step-Deviation method can be applied to any grouped data by simply "choosing h as the average.',
          parts: [
                { id: 'a', prompt: 'List the three methods for finding the mean of grouped data and state one specific condition when each method is most efficient.', answer: 'The three methods are: 1',
                  options: ['The three methods are: 1', 'Step-Deviation works for any data', 'choosing h as the average class width', 'using the first interval\'s width for all classes'],
                  hint: 'If stuck, revisit nodes c10_math_cbse_13_001, 002, 003 and practice identifying equal class.',
                  misconception: 'Students believe the Step-Deviation method can be applied to any grouped data by simply "choosing h as the average class width" or "using.' },
                { id: 'b', prompt: 'For the following frequency distribution, which method would you choose? Justify your choice in one sentence.', answer: 'Choose the Direct Method',
                  options: ['Choose the Direct Method', 'choosing h as the average class width', 'using the first interval\'s width for all classes'],
                  hint: 'If stuck, revisit nodes c10_math_cbse_13_001, 002, 003 and practice identifying equal class.',
                  misconception: 'Students believe the Step-Deviation method can be applied to any grouped data by simply "choosing h as the average class width" or "using.' }
          ],
            remediations: { 'the-step-deviation-method-can': { steps: ['Show the student a concrete unequal-interval distribution (e.g., 0–10, 10–20, 20–40 with frequencies 5, 5, 5).', 'Compute the true mean using Direct Method (class marks 5, 15, 30 → mean = 50/3 ≈ 16.67).', 'Attempt Step-Deviation with h = 10 (wrong) → ui = (5–15)/10 = -1, (15–15)/10 = 0, (30–15)/10 = 1.5 → mean = 15.', 'Wait, that accidentally works?'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_010', difficulty: 'standard',
          question: 'Word problems on interpreting frequency distribution tables require extracting.',
          hint: 'If stuck, immediately revisit c10_math_cbse_13_005 (Median of Grouped Data) and.',
          misconception: 'Students consistently use the cumulative frequency OF the median class (cf = 24 in Diagnostic 3) instead of the.',
          parts: [
                { id: 'a', prompt: 'The following table shows the literacy rate (in %) of 35 cities: | Literacy Rate | 45-55 | 55-65 | 65-75 | 75-85 | 85-95 |.', answer: 'Step 1: Total frequency N = 3+10+11+8+3 = 35',
                  options: ['Step 1: Total frequency N = 3+10+11+8+3 = 35', 'cumulative frequency before median class', 'cumulative frequency of median class'],
                  hint: 'If stuck, immediately revisit c10_math_cbse_13_005 (Median of Grouped Data) and.',
                  misconception: 'Students consistently use the cumulative frequency OF the median class (cf = 24 in Diagnostic 3) instead of the cumulative frequency BEFORE.' }
          ],
            remediations: { 'students-consistently-use-the-cumulative': { steps: ['If a student makes this error, do NOT just say "check the formula." Instead: (1) Have them write the median formula.', '(2) Ask: "What does \'preceding\' mean?" (3) Make them rebuild the cumulative frequency column on paper, then physically.', '(5) Finally, have them solve one full problem while verbally justifying each substitution: "I am taking cf = 13 because.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
