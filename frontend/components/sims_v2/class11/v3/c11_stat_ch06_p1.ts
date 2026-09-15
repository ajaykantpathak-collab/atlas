import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch06_p1: SimDef = {
    id: 'v3_c11_stat_ch06_p1',
    title: 'Measures of Dispersion · Part 1/2',
    subtitle: 'Learn why identical averages can describe opposite worlds.',
    classLevel: 11, subject: 'statistics', topic: 'Measures of Dispersion · Part 1/2',
    chapters: ['c11_stat_ch06'],
    nodeIds: ['c11_stat_cbse_06_001', 'c11_stat_cbse_06_002', 'c11_stat_cbse_06_003', 'c11_stat_cbse_06_004', 'c11_stat_cbse_06_005', 'c11_stat_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fund allocator looking past the average', intro: 'Same average income, opposite district — one evenly middle, one feast-and-famine; only dispersion sees the difference.', goal: 'Use dispersion measures to expose what central tendency hides.' },
    discovery: {
        question: 'Districts A and B both average ₹50,000 household income — equal claims on the development fund?',
        options: ['No — B\'s ultra-rich few may hide mass poverty that A lacks; identical means with different dispersion are different realities', 'Yes — same mean, same need', 'Yes — allocation should follow averages', 'No — B should get less because it\'s richer'],
        answer: 'No — B\'s ultra-rich few may hide mass poverty that A lacks; identical means with different dispersion are different realities',
        hook: 'And dividing any absolute measure by the mean doesn\'t make it a CV — the coefficient of variation is specifically σ/mean; the rest have their own names.',
    },
    teaching: [
        { title: 'Meaning and Significance of Measures of Dispersion', text: 'Measures of dispersion quantify the extent to which individual data points in a distribution deviate from a central value (mean, median, or mode), describing the spread, variability, or scatter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_06_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Show how two investments can share a 12% average return with wildly different risk, then judge when CV itself misleads.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_001', title: 'Meaning and Significance of Measures of Dispersion',
          caseStudy: { intro: 'Imagine two Class 11 sections, Section A and Section B, both have an average (mean) score of 75 in Statistics.',
            decisions: [{ prompt: 'Define "measure of dispersion" in your own words and state its primary purpose in statistical analysis.', options: [
                { text: 'A measure of dispersion is a statistical tool that quantifies the spread or variability', outcome: 'A measure of dispersion is a statistical tool that quantifies the spread or variability of data.' },
                { text: 'it finds the average', outcome: 'Not quite — Students believe that "average tells the whole story" and treat measures of central tendency.', reveals: 'average-tells-the-whole-story' },
                { text: 'it measures central tendency', outcome: 'Not quite — Students believe that "average tells the whole story" and treat measures of central tendency.', reveals: 'average-tells-the-whole-story' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_002', title: 'Absolute and Relative Measures of Dispersion',
          caseStudy: { intro: 'Imagine you are comparing the consistency of two batsmen: Virat scores an average of 50 runs with a standard deviation of 15 runs, while a bowler\'s economy.',
            decisions: [{ prompt: '**REMEMBER:** State the fundamental difference between an absolute measure of dispersion and a relative measure of dispersion in terms.', options: [
                { text: '**Correct Answer:** An absolute measure of dispersion is expressed in the same units as', outcome: '**Correct Answer:** An absolute measure of dispersion is expressed in the same units as the.' },
                { text: 'absolute measures are bigger numbers', outcome: 'Not quite — **Specific Error:** Students believe that "Relative measure = Absolute measure ÷ Mean" is.', reveals: 'specific-error-students-believe-that' },
                { text: 'relative measures are always percentages', outcome: 'Not quite — **Specific Error:** Students believe that "Relative measure = Absolute measure ÷ Mean" is.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_003', title: 'Range and Coefficient of Range: Calculation',
          scaffold: { problem: 'The daily milk production (in litres) of a dairy farm for 10 days is: 45, 52, 38, 60, 48, 55, 42, 50, 58, 40.',
            steps: [
            { text: 'Arrange data in ascending order to easily identify extremes: 38, 40, 42, 45, 48, 50, 52, 55, 58, 60.' },
            { text: 'Identify L = maximum value = 60 litres, S = minimum value = 38 litres.' },
            { text: 'Calculate Range = L - S = 60 - 38 = 22 litres.' },
            { text: 'Calculate Coefficient of Range = (L - S) / (L + S) = (60 - 38) / (60 + 38) = 22 / 98 ≈ 0.2245.' },
            { text: 'Interpret: The milk production varies by 22 litres, and the relative spread is about 22.45% of the sum of extremes.', faded: true, blankAnswer: 'Range = 22 litres; Coefficient of Range ≈ 0.2245 (or 22.45%)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_004', title: 'Quartile Deviation and Coefficient of Quartile Deviation',
          scaffold: { problem: 'Calculate Quartile Deviation and its Coefficient for the following individual series of daily wages (in ₹) of 11 workers: 80, 92, 95, 100.',
            steps: [
            { text: 'Verify data is arranged in ascending order (it is). N = 11.' },
            { text: 'Find position of Q₁ = (N+1)/4 = 12/4 = 3rd item. Q₁ = value of 3rd item = ₹95.' },
            { text: 'Find position of Q₃ = 3(N+1)/4 = 3×12/4 = 9th item. Q₃ = value of 9th item = ₹125.' },
            { text: 'Compute Quartile Deviation = (Q₃ - Q₁)/2 = (125 - 95)/2 = ₹15.' },
            { text: 'Compute Coefficient of Q.D. = (Q₃ - Q₁)/(Q₃ + Q₁) = (125 - 95)/(125 + 95) = 30/220 = 0.136.' },
            { text: 'Interpret: The middle 50% of workers\' wages deviate from the median by about ₹15 on average; relative dispersion.', faded: true, blankAnswer: 'Q.D. = ₹15; Coefficient of Q.D. = 0.136 (or 13.6%).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_005', title: 'Mean Deviation from Mean and Median: Calculation',
          scaffold: { problem: 'The daily wages (in ₹) of 10 workers in a small factory are: 120, 135, 140, 130, 155, 125, 145, 138, 132, 150.',
            steps: [
            { text: 'Arrange data in ascending order: 120, 125, 130, 132, 135, 138, 140, 145, 150, 155.' },
            { text: 'Compute mean: \\(\\bar{x} = \\frac{120+125+130+132+135+138+140+145+150+155}{10} = \\frac{1370}{10} = 137\\).' },
            { text: 'Compute median: \\(n=10\\) (even), median = average of 5th and 6th values = \\(\\frac{135+138}{2} = 136.5\\).' },
            { text: 'Find absolute deviations from mean: \\(|120-137|=17\\), \\(|125-137|=12\\), \\(|130-137|=7\\), \\(|132-137|=5\\).' },
            { text: 'Find absolute deviations from median: \\(|120-136.5|=16.5\\), \\(|125-136.5|=11.5\\), \\(|130-136.5|=6.5\\).' },
            { text: 'Interpret: Both are equal (8.6) because the distribution is nearly symmetric.', faded: true, blankAnswer: 'Mean deviation about mean = ₹8.6; Mean deviation about.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_006', title: 'Standard Deviation: Calculation for Different Series',
          scaffold: { problem: 'The daily wages (in ₹) of 10 workers in a factory are: 120, 135, 140, 125, 130, 145, 150, 128, 132, 138.',
            steps: [
            { text: 'Compute the arithmetic mean x̄ = Σxᵢ/N = (120+135+140+125+130+145+150+128+132+138)/10 = 1343/10 = 134.3' },
            { text: 'Find deviations from mean: (120-134.3), (135-134.3), ... = -14.3, 0.7, 5.7, -9.3, -4.3, 10.7, 15.7, -6.3, -2.3, 3.7' },
            { text: 'Square each deviation: 204.49, 0.49, 32.49, 86.49, 18.49, 114.49, 246.49, 39.69, 5.29, 13.69' },
            { text: 'Sum of squared deviations = 204.49+0.49+32.49+86.49+18.49+114.49+246.49+39.69+5.29+13.69 = 762.1' },
            { text: 'Variance = Σ(xᵢ - x̄)²/N = 762.1/10 = 76.21' },
            { text: 'Standard deviation σ = √76.21 ≈ 8.73', faded: true, blankAnswer: 'σ ≈ ₹8.73' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing two investment options both averaging 12% — one returns 11%, 12%, 13%; the other −20%, 12%, 44% — a student calls them \'equally good\', then computes every relative dispersion measure as \'absolute ÷ mean\' and names them all CV.',
            decisions: [{ prompt: 'What does dispersion analysis require?', options: [
                { text: 'Measure the spread and name the ratios correctly: equal means can hide opposite risk — the second option swings wildly, so dispersion is a necessity, not an extra. And each absolute measure has its OWN relative form: Coefficient of Range = (L−S)/(L+S), Coefficient of QD = (Q3−Q1)/(Q3+Q1), coefficient of MD divides by the same average used, and only (SD/Mean)×100 is the Coefficient of Variation.', outcome: 'The comparison becomes honest: averages alone can\'t rank options, and \'÷ mean\' isn\'t a universal recipe — each measure pairs with its specific denominator.' },
                { text: 'Keep \'equally good\' — same average return means same performance.', outcome: 'The mean summarises location, not risk: identical averages can sit on wildly different spreads — that\'s what dispersion exists to expose.', reveals: 'same-mean-same-data' },
                { text: 'Keep \'absolute ÷ mean\' for all — a relative measure is just the absolute over the average.', outcome: 'Each coefficient has its prescribed denominator — (L+S), (Q3+Q1), the matching average — CV is the name only for SD/mean.', reveals: 'all-relative-measures-divide-by-mean' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The mean tells you the centre; dispersion tells you how much to trust it — a policy built on the first alone is half-blind.',
            decisions: [{ prompt: 'What comes next? Measures of Dispersion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Measures of Dispersion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_001', difficulty: 'standard',
          question: 'Measures of dispersion quantify the extent to which individual data points in.',
          hint: 'Revisit Class 8 Math Chapter 12 (mean as balancing point, median vs mean) and Class 10.',
          misconception: 'Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries.',
          parts: [
                { id: 'a', prompt: 'Two cricket batsmen, Rohit and Virat, both have a batting average of 50 runs over 10 innings. Rohit\'s scores: 48, 49, 50, 51, 52, 48, 49, 50, 51, 52.', answer: 'The average of 50 is misleading',
                  options: ['The average of 50 is misleading', 'both are equally good', 'average fallacy', 'average tells the whole story'],
                  hint: 'Revisit Class 8 Math Chapter 12 (mean as balancing point, median vs mean) and Class 10 Math Chapter.',
                  misconception: 'Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries of data.' },
                { id: 'b', prompt: 'A factory produces 1000 bolts daily. The target length is 5.00 cm. The quality control manager only checks the mean length of a sample of 50 bolts each day.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'mean is enough if it matches target', 'use median instead', 'average tells the whole story'],
                  hint: 'Revisit Class 8 Math Chapter 12 (mean as balancing point, median vs mean) and Class 10 Math Chapter.',
                  misconception: 'Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries of data.' }
          ],
            remediations: { 'average-tells-the-whole-story': { steps: ['Present the "Two Hospitals" or "Two Batsmen" concrete example side-by-side in a table.', 'Ask the student to calculate mean for both — they\'ll get the same value.', 'Ask "Which hospital would you choose for a time-sensitive appointment?" — they\'ll intuitively pick the consistent one.', 'Point out: "Your intuition used dispersion! The mean lied to you.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries.',
          parts: [
                { id: 'a', prompt: 'A government policy uses "average household income" to allocate funds to districts. District A has mean income ₹50,000 with low dispersion.', answer: 'Using only the mean is neither fair nor effective',
                  options: ['Using only the mean is neither fair nor effective', 'mean is fair because it\'s the average', 'use median instead of dispersion', 'average tells the whole story'],
                  hint: 'Revisit Class 8 Math Chapter 12 (mean as balancing point, median vs mean) and Class 10 Math Chapter.',
                  misconception: 'Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries of data.' }
          ],
            remediations: { 'average-tells-the-whole-story': { steps: ['Present the "Two Hospitals" or "Two Batsmen" concrete example side-by-side in a table.', 'Ask the student to calculate mean for both — they\'ll get the same value.', 'Ask "Which hospital would you choose for a time-sensitive appointment?" — they\'ll intuitively pick the consistent one.', 'Point out: "Your intuition used dispersion! The mean lied to you.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_002', difficulty: 'standard',
          question: 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation.',
          hint: 'Revisit Class 10 Maths Statistics (c10_math_cbse_13_001 to 13_010) for Mean/Median.',
          misconception: '**Specific Error:** Students believe that "Relative measure = Absolute measure ÷ Mean" is a universal formula.',
          parts: [
                { id: 'a', prompt: '**APPLY:** The heights of 100 students are measured in centimeters (Mean = 165 cm, SD = 6 cm).', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'Relative measure = Absolute measure ÷ Mean', 'The Coefficient of Variation for this data is (Q3-Q1)/Mean'],
                  hint: 'Revisit Class 10 Maths Statistics (c10_math_cbse_13_001 to 13_010) for Mean/Median calculation.',
                  misconception: '**Specific Error:** Students believe that "Relative measure = Absolute measure ÷ Mean" is a universal formula applicable to *all* absolute.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted Remediation (3-step):** 1.', '**Confront the pattern-match:** Show a table with four rows: Absolute Measure | Its Relative Measure | Formula |.', 'Ask the student to fill it from memory.', 'The gaps will reveal the confusion.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_003', difficulty: 'standard',
          question: 'Range is the simplest absolute measure of dispersion defined as the difference.',
          hint: 'Revisit c8_math_ch12_11 (Range basics) and c10_math_cbse_13_001 (grouped data, class.',
          misconception: 'Students often confuse Range with "number of classes" or "class width" in grouped data.',
          parts: [
                { id: 'a', prompt: 'Calculate the Range and Coefficient of Range for the following daily profits (in ₹) of a shop over 7 days: 120, 150, 90, 200, 180, 110, 160.', answer: 'Step 1: Identify L = 200, S = 90',
                  options: ['Step 1: Identify L = 200, S = 90', 'number of classes', 'class width'],
                  hint: 'Revisit c8_math_ch12_11 (Range basics) and c10_math_cbse_13_001 (grouped data, class boundaries).',
                  misconception: 'Students often confuse Range with "number of classes" or "class width" in grouped data.' },
                { id: 'b', prompt: 'Two datasets have the same Range = 50. Dataset A: values between 100 and 150. Dataset B: values between 10 and 60.', answer: 'Coefficient A = (150−100)/(150+100) = 50/250 = 0.2',
                  options: ['Coefficient A = (150−100)/(150+100) = 50/250 = 0.2', 'number of classes', 'class width', 'both coefficients are equal'],
                  hint: 'Revisit c8_math_ch12_11 (Range basics) and c10_math_cbse_13_001 (grouped data, class boundaries).',
                  misconception: 'Students often confuse Range with "number of classes" or "class width" in grouped data.' }
          ],
            remediations: { 'students-often-confuse-range-with': { steps: ['If a student makes these errors: (1) Draw a number line and mark the class intervals.', 'Ask: "Where is the smallest possible value?', 'The largest?" (2) For discrete/individual series, have them circle the max and min in the raw data before calculating.', '(3) Practice with a dataset where class width ≠ Range (e.g., 5-15, 15-25, 25-35, 35-45: width=10, Range=40).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_004', difficulty: 'standard',
          question: 'Quartile Deviation (Q.D.) is an absolute measure of dispersion defined as half.',
          hint: 'Revisit Class 10 Maths Chapter 13 (Statistics), specifically the "Median of Grouped Data".',
          misconception: 'Students often confuse the positional formulas for discrete vs. continuous series.',
          parts: [
                { id: 'a', prompt: 'What is the formula for Coefficient of Quartile Deviation, and why is it a unit-free measure?', answer: 'The formula is (Q₃ - Q₁)/(Q₃ + Q₁)',
                  options: ['The formula is (Q₃ - Q₁)/(Q₃ + Q₁)', 'it has units of the variable'],
                  hint: 'Revisit Class 10 Maths Chapter 13 (Statistics), specifically the "Median of Grouped Data" topic.',
                  misconception: 'Students often confuse the positional formulas for discrete vs. continuous series.' }
          ],
            remediations: { 'students-often-confuse-the-positional': { steps: ['If a student interpolates in a discrete series: (1) Ask them to write the raw data expansion of the discrete series.', '(2) Ask them to find the median of the lower half manually by counting.', '(3) Show that this manual median matches the (N/4)th item in the cumulative frequency, not an interpolated value.', '(4) Explicitly contrast: "Continuous series = grouped data where exact values are lost → interpolation needed.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_005', difficulty: 'standard',
          question: 'Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each.',
          hint: 'If stuck, revisit c10_math_cbse_13_001 (mean of grouped data) and c10_math_cbse_13_005.',
          misconception: 'Students often think mean deviation about mean and mean deviation about median are always equal because both use.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each observation',
                  options: ['Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each observation', 'Measures of dispersion quantify the extent to', 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation, Standard', 'Range is the simplest absolute measure of dispersion defined as the difference between'],
                  hint: 'If stuck, revisit c10_math_cbse_13_001 (mean of grouped data) and c10_math_cbse_13_005 (median.',
                  misconception: 'Students often think mean deviation about mean and mean deviation about median are always equal because both use absolute deviations.' }
          ],
            remediations: { 'mean-deviation-about-mean-and': { steps: ['Ask the student to compute mean and median for a skewed dataset (e.g., 1, 2, 3, 4, 20).', 'Have them list deviations from each centre side by side.', 'Point out that the deviations differ because the centres differ.', 'Emphasise: "Mean deviation is defined relative to a specific central value; change the central value, change the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_006', difficulty: 'standard',
          question: 'Standard deviation (σ) is the positive square root of the arithmetic mean.',
          hint: 'Revisit the three methods of computing mean (direct, assumed mean, step-deviation) from.',
          misconception: 'Students often confuse the denominator in standard deviation formula: they use N-1 (sample formula) instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard deviation (σ) is the positive square root of the arithmetic mean of the squared',
                  options: ['Standard deviation (σ) is the positive square root of the arithmetic mean of the squared', 'Measures of dispersion quantify the extent to', 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation, Standard', 'Range is the simplest absolute measure of dispersion defined as the difference between'],
                  hint: 'Revisit the three methods of computing mean (direct, assumed mean, step-deviation) from Class 10.',
                  misconception: 'Students often confuse the denominator in standard deviation formula: they use N-1 (sample formula) instead of N (population formula) even.' }
          ],
            remediations: { 'students-often-confuse-the-denominator': { steps: ['If a student uses N-1, remind them: "In Class 11 Statistics, unless explicitly stated as a sample, we treat data.', 'The formula is σ = √[Σ(x-x̄)²/N].', 'The N-1 version is for sample standard deviation (s) in higher classes." For step-deviation errors, have them re-derive.', 'Substitute into σ formula to see σ = h × √[Σfu²/N - (Σfu/N)²].'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
