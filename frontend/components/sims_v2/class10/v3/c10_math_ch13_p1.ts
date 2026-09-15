import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch13_p1: SimDef = {
    id: 'v3_c10_math_ch13_p1',
    title: 'Statistics · Part 1/2',
    subtitle: 'Find the honest average hidden inside grouped data',
    classLevel: 10, subject: 'mathematics', topic: 'Statistics · Part 1/2',
    chapters: ['c10_math_ch13'],
    nodeIds: ['c10_math_cbse_13_001', 'c10_math_cbse_13_002', 'c10_math_cbse_13_003', 'c10_math_cbse_13_004', 'c10_math_cbse_13_005', 'c10_math_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data analyst decoding survey tables', intro: 'A newspaper hands you a wage table with ranges, not numbers — and asks for \'the average worker.\' Your job: make midpoints speak, then check whether the median or mode tells a truer story.', goal: 'Calculate mean, median and mode for grouped data and interpret which measure best represents a dataset.' },
    discovery: {
        question: 'A survey reports \'average daily wage of factory workers\' from grouped data — 0–100, 100–200, 200–300 — with worker counts per bracket. There are no exact wages, only ranges. How do you average data you can\'t fully see?',
        options: ['Use each class\'s midpoint (class mark) as its representative value, weight by frequency, and divide by total workers', 'Just average the class boundaries — no frequencies needed', 'You can\'t — grouped data has no mean', 'Use only the biggest class\'s midpoint'],
        answer: 'Use each class\'s midpoint (class mark) as its representative value, weight by frequency, and divide by total workers',
        hook: 'When raw numbers hide inside ranges, the midpoint becomes each group\'s spokesperson. The mean of grouped data is an honest estimate — assuming each class clusters at its centre.',
    },
    teaching: [
        { title: 'Mean of Grouped Data: Direct Method', text: 'The mean of grouped data using the direct method is the arithmetic average calculated by multiplying each class mark (midpoint of a class interval) by its corresponding frequency, summing these.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_13_001', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Compute mean by direct, assumed-mean and step-deviation methods on real frequency tables, then hunt the median and mode that resist the \'average\' story the mean tells.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_001', title: 'Mean of Grouped Data: Direct Method',
          scaffold: { problem: 'The following table shows the daily wages (in rupees) of 40 workers in a factory. Find the mean daily wage using the direct method.',
            steps: [
            { text: 'Identify the class intervals and frequencies. The class intervals are continuous (upper limit of one = lower limit.' },
            { text: 'Calculate the class mark (midpoint) for each class interval using \\(x_i = \\frac{\\text{lower limit} + \\text{upper.' },
            { text: 'Multiply each class mark by its frequency to get \\(f_i x_i\\).' },
            { text: 'Sum the frequencies and the \\(f_i x_i\\) column.' },
            { text: 'Apply the direct method formula \\(\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = \\frac{6040}{40} = 151\\).', faded: true, blankAnswer: 'Mean daily wage = ₹151' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_002', title: 'Mean of Grouped Data: Assumed Mean Method',
          scaffold: { problem: 'The following table shows the monthly expenditure (in ₹) on groceries for 40 families in a housing society.',
            steps: [
            { text: 'Find class marks \\(x_i\\) for each interval: (1000+1500)/2 = 1250, (1500+2000)/2 = 1750, (2000+2500)/2 = 2250.' },
            { text: 'Choose assumed mean \\(A\\). Since 2250 is the middle class mark and has the highest frequency, select \\(A = 2250\\).' },
            { text: 'Compute deviations \\(d_i = x_i - A\\): 1250-2250 = -1000, 1750-2250 = -500, 2250-2250 = 0, 2750-2250 = 500, 3250-2250.' },
            { text: 'Multiply each deviation by its frequency \\(f_i\\): 5×(-1000) = -5000, 8×(-500) = -4000, 12×0 = 0, 10×500 = 5000, 5×1000.' },
            { text: 'Sum frequencies \\(\\sum f_i = 5+8+12+10+5 = 40\\). Sum \\(f_i d_i = -5000 -4000 + 0 + 5000 + 5000 = 1000\\).' },
            { text: 'Apply formula: Mean = \\(A + \\frac{\\sum f_i d_i}{\\sum f_i} = 2250 + \\frac{1000}{40} = 2250 + 25 = 2275\\).', faded: true, blankAnswer: '₹2275' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_003', title: 'Mean of Grouped Data: Step-Deviation Method',
          scaffold: { problem: 'The following table shows the daily pocket money (in ₹) received by 50 students of Class 10 in a Delhi school.',
            steps: [
            { text: 'Identify class marks xᵢ, class size h, and choose assumed mean a. Class marks: 110, 130, 150, 170, 190.' },
            { text: 'Compute step-deviations uᵢ = (xᵢ - a)/h for each class. u₁ = (110-170)/20 = -3; u₂ = (130-170)/20 = -2; u₃.' },
            { text: 'Construct the calculation table with fᵢ, uᵢ, and fᵢuᵢ columns.' },
            { text: 'Apply the step-deviation formula: x̄ = a + h(Σfᵢuᵢ/Σfᵢ) = 170 + 20(-30/50) = 170 + 20(-0.6) = 170 - 12 = 158.' },
            { text: 'Verify using direct method as a check: Σfᵢxᵢ = 440 + 1040 + 1800 + 2720 + 1900 = 7900. Mean = 7900/50 = 158.', faded: true, blankAnswer: 'Mean daily pocket money = ₹158' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_004', title: 'Mode of Grouped Data: Formula and Calculation',
          scaffold: { problem: 'The following table shows the distribution of monthly household expenditure (in ₹) of 50 families in a village in Uttar Pradesh.',
            steps: [
            { text: 'Identify the modal class — the class with the highest frequency. Here, 2000-2500 has frequency 18 (maximum).' },
            { text: 'Extract the five required values from the table:' },
            { text: 'Substitute into the mode formula:' },
            { text: 'Simplify step by step:' },
            { text: 'Interpret the result: The modal monthly expenditure is **₹2100**.', faded: true, blankAnswer: '₹2100' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_005', title: 'Median of Grouped Data: Formula and Calculation',
          scaffold: { problem: 'The following table shows the daily wages (in ₹) of 50 workers in a factory. Find the median daily wage.',
            steps: [
            { text: 'Write the frequency table and compute cumulative frequencies. N = 12+14+8+6+10 = 50. N/2 = 25.' },
            { text: 'Cumulative frequencies: 100-120: 12; 120-140: 12+14=26; 140-160: 26+8=34; 160-180: 34+6=40; 180-200: 40+10=50.' },
            { text: 'Identify median class: The cumulative frequency first becomes ≥ 25 at class 120-140 (cf = 26).' },
            { text: 'Extract variables: l = 120 (lower limit of median class), cf = 12 (cumulative frequency of preceding class 100-120),.' },
            { text: 'Substitute into formula: Median = 120 + [(25 - 12)/14] × 20 = 120 + (13/14) × 20 = 120 + 18.57 = 138.57.' },
            { text: 'Interpret: The median daily wage is ₹138.57, meaning half the workers earn less than this and half earn more.', faded: true, blankAnswer: '₹138.57' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_006', title: 'Graphical Representation: Cumulative Frequency Curve (Ogive)',
          scaffold: { problem: 'The following table shows the daily wages (in ₹) of 50 workers in a factory.',
            steps: [
            { text: 'Identify the given data — grouped frequency distribution with 5 classes, total workers N = 50.' },
            { text: 'Construct the \'less than\' cumulative frequency table. Upper class boundaries: 120, 140, 160, 180, 200.' },
            { text: 'Construct the \'more than\' cumulative frequency table. Lower class boundaries: 100, 120, 140, 160, 180.' },
            { text: 'Choose scales. x-axis: 1 cm = ₹10 (range 100–200 fits in 10 cm). y-axis: 1 cm = 5 workers (range 0–50 fits in 10 cm).' },
            { text: 'Plot all 10 points carefully. Join the 5 \'less than\' points with a smooth freehand curve.' },
            { text: 'From intersection point P, draw a perpendicular to the x-axis. Read the x-coordinate: it is approximately ₹152.' },
            { text: 'Verify using median formula from c10_math_cbse_13_005. N/2 = 25.', faded: true, blankAnswer: 'Median daily wage ≈ ₹152 (graphical), verified by formula.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_13_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school health camp, the mean weight of 100 children comes out as 38.2 kg — then someone discovers the scale read 0.5 kg too low for every child. A volunteer says the whole table must be re-entered and the mean recalculated from scratch.',
            decisions: [{ prompt: 'Is a full recalculation really needed?', options: [
                { text: 'No — adding a fixed amount to every single data value shifts the mean by exactly that amount, so the corrected mean is simply 38.2 + 0.5 = 38.7 kg. The same shortcut works in reverse for any uniform error: the mean moves with the data.', outcome: 'Because the mean is the total divided by the count, bumping every entry by 0.5 adds 0.5 to the total\'s per-child share — one addition replaces a hundred corrections.' },
                { text: 'The volunteer is right — any measurement error means every entry must be corrected before the mean can be trusted.', outcome: 'Individual entries do need the +0.5, but the mean needs no rebuild — a uniform shift in all values produces the identical shift in the average.', reveals: 'mean-must-be-recomputed' },
                { text: 'The mean stays 38.2 kg anyway, since a constant error cancels out across so many children.', outcome: 'A constant offset does not average away — it shifts every value the same direction, so it shifts the mean by the full 0.5 kg, not by zero.', reveals: 'constant-error-cancels' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Mean, median, mode — three different witnesses describing the same data. Learn when they agree and when the \'average\' is lying to you politely.',
            decisions: [{ prompt: 'What comes next? Statistics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Statistics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_13_001', difficulty: 'standard',
          question: 'The mean of grouped data using the direct method is the arithmetic average.',
          hint: 'If stuck, revisit c7_math_ch13_002 (frequency tables) and c6_math_ch09_100 (mean.',
          misconception: 'Students consistently use the lower limit or upper limit of a class interval as the representative value (x_i) instead.',
          parts: [
                { id: 'a', prompt: 'Two students, A and B, calculate the mean of the same grouped data. Student A uses the direct method.', answer: 'Both methods are algebraically equivalent',
                  options: ['Both methods are algebraically equivalent', 'assumed mean is faster so it\'s different'],
                  hint: 'If stuck, revisit c7_math_ch13_002 (frequency tables) and c6_math_ch09_100 (mean of ungrouped data).',
                  misconception: 'Students consistently use the lower limit or upper limit of a class interval as the representative value (x_i) instead of the class mark.' }
          ],
            remediations: { 'students-consistently-use-the-lower': { steps: ['If a student uses class boundaries instead of class marks: (1) Ask them to list all integers in 20-30 and find their.', '(2) Show that the class mark formula (lower+upper)/2 is derived from this logic.', '(3) Make them redo one row of the table: "For 20-30 with frequency 5, what is the total of all 5 observations if each.', 'Which is more realistic?" (4) Have them practise 3 problems where they must write the class mark formula explicitly.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_002', difficulty: 'standard',
          question: 'The Assumed Mean Method calculates the mean of grouped data by choosing.',
          hint: 'Review c10_math_cbse_13_001 (Direct Method) and practice computing class marks and \\(\\sum.',
          misconception: 'Students often compute deviations as \\(d_i = A - x_i\\) instead of \\(x_i - A\\).',
          parts: [
                { id: 'a', prompt: 'Compare the assumed mean method and the direct method for the data in Diagnostic Question 3. Which method involves smaller numbers?', answer: 'The assumed mean method uses deviations (-40, -20, 0, 20, 40)',
                  options: ['The assumed mean method uses deviations (-40, -20, 0, 20, 40)', 'direct method is always easier'],
                  hint: 'Review c10_math_cbse_13_001 (Direct Method) and practice computing class marks and \\(\\sum f_i x_i\\).',
                  misconception: 'Students often compute deviations as \\(d_i = A - x_i\\) instead of \\(x_i - A\\).' }
          ],
            remediations: { 'students-often-compute-deviations-as': { steps: ['If a student makes this sign error, first ask: "What does deviation mean?', 'Is it how far x is from A, or how far A is from x?" Then demonstrate with a single class: if class mark is 110 and.', 'Write \\(d_i = x_i - A\\) on the board and have the student recompute one row.', 'Emphasise that the formula \\(\\bar{x} = A + \\frac{\\sum f_i d_i}{\\sum f_i}\\) is derived from \\(x_i = A + d_i\\),.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often compute deviations as \\(d_i = A - x_i\\) instead of \\(x_i - A\\).',
          parts: [
                { id: 'a', prompt: 'A student calculated the mean of the data in Diagnostic Question 3 using assumed mean A = 150 but wrote deviations as \\(d_i = A - x_i\\) (i.e., 40, 20, 0, -20.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'both are correct'],
                  hint: 'Review c10_math_cbse_13_001 (Direct Method) and practice computing class marks and \\(\\sum f_i x_i\\).',
                  misconception: 'Students often compute deviations as \\(d_i = A - x_i\\) instead of \\(x_i - A\\).' }
          ],
            remediations: { 'students-often-compute-deviations-as': { steps: ['If a student makes this sign error, first ask: "What does deviation mean?', 'Is it how far x is from A, or how far A is from x?" Then demonstrate with a single class: if class mark is 110 and.', 'Write \\(d_i = x_i - A\\) on the board and have the student recompute one row.', 'Emphasise that the formula \\(\\bar{x} = A + \\frac{\\sum f_i d_i}{\\sum f_i}\\) is derived from \\(x_i = A + d_i\\),.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_003', difficulty: 'standard',
          question: 'The Step-Deviation Method is a computational technique for finding the mean.',
          hint: 'If stuck, revisit the assumed mean method (c10_math_cbse_13_002) and verify you can.',
          misconception: 'Students incorrectly compute step-deviations as uᵢ = (xᵢ - a) instead of uᵢ = (xᵢ - a)/h, effectively using the assumed.',
          parts: [
                { id: 'a', prompt: 'Explain why the step-deviation method gives the same result as the direct method, even though we divide deviations by h and later multiply by h.', answer: 'The step-deviation method is algebraically equivalent to the direct method',
                  options: ['The step-deviation method is algebraically equivalent to the direct method', 'because we multiply and divide by the same number so it cancels'],
                  hint: 'If stuck, revisit the assumed mean method (c10_math_cbse_13_002) and verify you can compute.',
                  misconception: 'Students incorrectly compute step-deviations as uᵢ = (xᵢ - a) instead of uᵢ = (xᵢ - a)/h, effectively using the assumed mean method but.' }
          ],
            remediations: { 'students-incorrectly-compute-step-deviations': { steps: ['If a student makes this error, immediately return to the definition: "uᵢ is the number of CLASS SIZES the class mark.', 'Show that (xᵢ - a)/h counts how many steps of size h separate xᵢ from a.', 'Have them compute uᵢ for 3-4 classes manually on the number line: "From 35 to 15 is two steps of 10 left, so u = -2.".', 'Practice with a table where they must fill uᵢ, h·uᵢ, and xᵢ - a side by side to see the equality.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_004', difficulty: 'standard',
          question: 'The mode of grouped data is the value that lies in the class interval with the.',
          hint: 'If stuck, revisit **c10_math_cbse_13_001 (Mean of Grouped Data: Direct Method)**.',
          misconception: '**Students use the upper limit of the modal class instead of the lower limit (l) in the formula.** Example: For modal.',
          parts: [
                { id: 'a', prompt: 'In the formula for mode of grouped data, why do we use **both** (f₁ - f₀) and (f₁ - f₂) in the numerator and denominator?', answer: 'The formula uses **both** differences',
                  options: ['The formula uses **both** differences', 'lower limit', 'lower boundary'],
                  hint: 'If stuck, revisit **c10_math_cbse_13_001 (Mean of Grouped Data: Direct Method)** — specifically the.',
                  misconception: '**Students use the upper limit of the modal class instead of the lower limit (l) in the formula.** Example: For modal class 140-160, they.' },
                { id: 'b', prompt: 'Find the mode for the following distribution of daily wages (in ₹) of 40 workers in a factory: | Daily Wages (₹) | Number of Workers |.', answer: '**Step 1:** Identify modal class = 140-160 (highest frequency = 18)',
                  options: ['**Step 1:** Identify modal class = 140-160 (highest frequency = 18)', 'lower limit', 'lower boundary'],
                  hint: 'If stuck, revisit **c10_math_cbse_13_001 (Mean of Grouped Data: Direct Method)** — specifically the.',
                  misconception: '**Students use the upper limit of the modal class instead of the lower limit (l) in the formula.** Example: For modal class 140-160, they.' }
          ],
            remediations: { 'students-use-the-upper-limit': { steps: ['** Ask the student to read the modal class interval aloud: "140-160". **', '** Ask: "Which number is the **lower** limit? Which is the **upper**?" **', '** Point to the formula: **l = lower limit of modal class**. **', '** Have them circle the lower limit in the table and write it as \'l = ___\' before substituting. **'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_005', difficulty: 'standard',
          question: 'The median of grouped data is the value that divides the frequency distribution.',
          hint: 'If stuck, review cumulative frequency construction from c10_math_cbse_13_001 and median.',
          misconception: 'Students consistently use the cumulative frequency OF the median class (cf_median) instead of the cumulative frequency.',
          parts: [
                { id: 'a', prompt: 'A student finds the median class for a distribution with N = 50 by looking for the class where cumulative frequency first exceeds 25.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'median position = (n+1)/2'],
                  hint: 'If stuck, review cumulative frequency construction from c10_math_cbse_13_001 and median position.',
                  misconception: 'Students consistently use the cumulative frequency OF the median class (cf_median) instead of the cumulative frequency of the class.' }
          ],
            remediations: { 'students-consistently-use-the-cumulative': { steps: ['If a student uses cf of the median class, immediately stop and ask: "Which class does this cf=35 belong to?', 'Is it the class BEFORE 30-40 or the class 30-40 itself?" Have them circle the preceding class row and its cf value.', 'Then rewrite the formula with a subscript: Median = l + [(N/2 - cf_pre)/f]×h.', 'Make them solve 3 problems where N/2 exactly equals the cf of the median class (e.g., cf_pre=18, cf_median=25, N/2=25).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_13_006', difficulty: 'standard',
          question: 'A cumulative frequency curve (ogive) is a graphical representation of the.',
          hint: 'Revisit c9_math_ch1_2 for plotting points and c7_math_ch13_002 for making cumulative.',
          misconception: 'Students plot points using class marks (mid-points) instead of class boundaries for ogives, e.g., for class 10–20 they.',
          parts: [
                { id: 'a', prompt: 'Two students draw ogives for the same data. Student A plots points and joins them with straight line segments.', answer: 'Student B is correct',
                  options: ['Student B is correct', 'both are fine', 'justify your method'],
                  hint: 'Revisit c9_math_ch1_2 for plotting points and c7_math_ch13_002 for making cumulative frequency.',
                  misconception: 'Students plot points using class marks (mid-points) instead of class boundaries for ogives, e.g., for class 10–20 they plot (15, CF).' }
          ],
            remediations: { 'students-plot-points-using-class': { steps: ['If a student plots class marks, immediately stop and ask: "What does the cumulative frequency 13 at class 10–20.', 'Have them re-plot all points using upper boundaries for \'less than\' and lower boundaries for \'more than\'.', 'Practice with 3 different tables until they verbalise the rule: "Less than CF goes with upper limit; more than CF goes.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
