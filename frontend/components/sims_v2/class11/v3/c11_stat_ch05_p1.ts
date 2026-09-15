import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch05_p1: SimDef = {
    id: 'v3_c11_stat_ch05_p1',
    title: 'Measures of Central Tendency · Part 1/2',
    subtitle: 'Catch the outlier that hijacks the mean.',
    classLevel: 11, subject: 'statistics', topic: 'Measures of Central Tendency · Part 1/2',
    chapters: ['c11_stat_ch05'],
    nodeIds: ['c11_stat_cbse_05_001', 'c11_stat_cbse_05_002', 'c11_stat_cbse_05_003', 'c11_stat_cbse_05_004', 'c11_stat_cbse_05_005', 'c11_stat_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst choosing which average deserves the headline', intro: 'Five numbers, one bully: the hundred pulls the mean off the page while the median calmly reports the middle.', goal: 'Choose between mean, median and mode by data shape and compute the assumed-mean method.' },
    discovery: {
        question: 'Data: 5, 7, 7, 8, 100. The \'average\' is 25.4 — a fair summary?',
        options: ['No — one outlier dragged the mean past every real value; the median or mode, 7, represents the data honestly', 'Yes — mean is the average, end of story', 'Yes — 25.4 is mathematically correct', 'No — the true average is 8'],
        answer: 'No — one outlier dragged the mean past every real value; the median or mode, 7, represents the data honestly',
        hook: 'And the assumed mean needn\'t be in the data — A is just a convenient origin; A = 16.5 gives the same mean as A = 15.',
    },
    teaching: [
        { title: 'Meaning and Objectives of Averages', text: 'An average (or measure of central tendency) is a single representative value that summarises an entire data set by identifying the central position around which all observations tend to cluster.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare two localities\' incomes where equal means hide opposite distributions, then compute a mean by the assumed-mean shortcut.',
        labels: ['Meaning and Objectives', 'Arithmetic Mean: Calculation', 'Properties of Arithmetic Mean', 'Weighted Arithmetic Mean: Calculation', 'Median: Calculation for Individual,', 'Quartiles, Deciles, and Percentiles'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_001', title: 'Meaning and Objectives of Averages',
          caseStudy: { intro: 'Imagine you are a policy analyst comparing the economic condition of farmers in two villages.',
            decisions: [{ prompt: 'Define "measure of central tendency" in your own words and give one example from daily life where you would use it.', options: [
                { text: 'A measure of central tendency is a single value that represents the centre of a data set,', outcome: 'A measure of central tendency is a single value that represents the centre of a data set, around.' },
                { text: 'it\'s the sum of all values', outcome: 'Not quite — Students believe "average" always means arithmetic mean and that the mean is the only or best.', reveals: 'average-always-means-arithmetic-mean' },
                { text: 'it\'s the most frequent value only', outcome: 'Not quite — Students believe "average" always means arithmetic mean and that the mean is the only or best.', reveals: 'average-always-means-arithmetic-mean' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_002', title: 'Arithmetic Mean: Calculation for Individual, Discrete, and Continuous Series',
          scaffold: { problem: 'The daily wages (in ₹) of 10 workers in a small factory are: 350, 400, 420, 380, 410, 390, 430, 370, 440, 400.',
            steps: [
            { text: 'Identify data type: Individual series (ungrouped), N = 10. Choose A = 400 (a central value).' },
            { text: 'Compute deviations d = X - A for each wage: -50, 0, 20, -20, 10, -10, 30, -30, 40, 0.' },
            { text: 'Sum the deviations: Σd = (-50)+0+20+(-20)+10+(-10)+30+(-30)+40+0 = -10.' },
            { text: 'Apply Assumed Mean formula: X̄ = A + Σd/N = 400 + (-10)/10 = 400 - 1 = 399.' },
            { text: 'Verify with Direct Method: ΣX = 350+400+420+380+410+390+430+370+440+400 = 3990. X̄ = 3990/10 = 399. Both match.', faded: true, blankAnswer: '₹399' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_003', title: 'Properties of Arithmetic Mean: Combined Mean and Deviations Sum',
          scaffold: { problem: 'The average monthly expenditure of 50 families in a village is ₹4,200.',
            steps: [
            { text: 'Identify the two groups with their sizes and means. Group 1: n₁ = 50, x̄₁ = ₹4,200. Group 2: n₂ = 30, x̄₂ = ₹5,800.' },
            { text: 'Recall the combined mean formula for two groups: x̄_c = (n₁x̄₁ + n₂x̄₂) / (n₁ + n₂).' },
            { text: 'Calculate the total expenditure for each group by multiplying size by mean. Total₁ = 50 × 4200 = ₹2,10,000.' },
            { text: 'Sum the totals and divide by total number of families. Combined total = ₹2,10,000 + ₹1,74,000 = ₹3,84,000.' },
            { text: 'Compute combined mean = ₹3,84,000 / 80 = ₹4,800. Verify it lies between ₹4,200 and ₹5,800 and is closer to ₹4,200.', faded: true, blankAnswer: '₹4,800' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_004', title: 'Weighted Arithmetic Mean: Calculation and Application',
          scaffold: { problem: 'A Class 11 student\'s final grade is calculated from three components: Unit Tests (30% weight), Half-Yearly Exam (30% weight), Final Exam.',
            steps: [
            { text: 'Identify values \\(x_i\\) and weights \\(w_i\\) for first scheme: \\(x = [72, 68, 85]\\), \\(w = [0.30, 0.30, 0.40]\\) (weights.' },
            { text: 'Apply formula \\(\\bar{X}_w = \\frac{\\sum w_i x_i}{\\sum w_i}\\). Since \\(\\sum w_i = 1\\), denominator = 1.' },
            { text: 'Compute numerator: \\(0.30 \\times 72 = 21.6\\), \\(0.30 \\times 68 = 20.4\\), \\(0.40 \\times 85 = 34.0\\). Sum = 76.0.' },
            { text: 'Weighted mean = 76.0 marks.' },
            { text: 'For new weights \\(w\' = [0.20, 0.30, 0.50]\\): numerator = \\(0.20 \\times 72 + 0.30 \\times 68 + 0.50 \\times 85 = 14.4.' },
            { text: 'Interpret: The grade increased because the highest score (85) got a larger weight (0.50 vs 0.40), pulling the mean.', faded: true, blankAnswer: 'First scheme: 76.0 marks; Second scheme: 77.3 marks. The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_005', title: 'Median: Calculation for Individual, Discrete, and Continuous Series',
          scaffold: { problem: 'The monthly incomes (in Rs) of 9 households in a village are: 4500, 3200, 5100, 2800, 4000, 3500, 4800, 3900, 4200. Find the median income.',
            steps: [
            { text: 'Arrange the data in ascending order: 2800, 3200, 3500, 3900, 4000, 4200, 4500, 4800, 5100.' },
            { text: 'Count the number of observations: N = 9 (odd).' },
            { text: 'Median position = (N+1)/2 = (9+1)/2 = 5th item.' },
            { text: 'The 5th value in the ordered list is 4000.' },
            { text: 'Interpret: The median monthly income is Rs 4000, meaning half the households earn ≤ Rs 4000 and half earn ≥ Rs 4000.', faded: true, blankAnswer: 'Rs 4000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_006', title: 'Quartiles, Deciles, and Percentiles: Calculation and Use',
          scaffold: { problem: 'The monthly wages (in ₹) of 15 factory workers are: 8500, 9200, 7800, 10500, 8900, 9500, 8200, 11000, 9800, 8700, 9100, 10200, 8400, 9600.',
            steps: [
            { text: 'Arrange the data in ascending order: 7800, 8200, 8400, 8500, 8700, 8900, 9000, 9100, 9200, 9500, 9600, 9800, 10200.' },
            { text: 'Calculate positions using ungrouped formulas: Q₁ position = (15+1)/4 = 4th item; Q₃ position = 3(15+1)/4 = 12th item.' },
            { text: 'Read values at integer positions: 4th item = 8500 (Q₁); 12th item = 9800 (Q₃).' },
            { text: 'Interpolate for fractional positions: D₄ = 6th item + 0.4 × (7th item - 6th item) = 8900 + 0.4(9000-8900) = 8940.' },
            { text: 'Interpret: 25% workers earn ≤ ₹8500 (Q₁); 75% earn ≤ ₹9800 (Q₃); 40% earn ≤ ₹8940 (D₄); 80% earn ≤ ₹10120 (P₈₀).', faded: true, blankAnswer: 'Q₁ = ₹8500, Q₃ = ₹9800, D₄ = ₹8940, P₈₀ = ₹10120.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising the dataset 5, 7, 7, 8, 100 for a class report, a student writes \'average = 25.4\' and later, for an assumed-mean calculation, stalls because \'A must be one of the observed values.\'',
            decisions: [{ prompt: 'What does choosing and computing an average require?', options: [
                { text: 'Choose by shape, not habit: the mean (25.4) is dragged by the outlier 100 — the median or mode (7) represents this skewed set far better; average ≠ always mean. And the assumed mean A is any convenient number — it needn\'t be in the data; A = 16.5 works as well as 15 because deviations correct for the choice.', outcome: 'He stops defaulting: selection criteria come first (skew? outliers? qualitative variable?), and A is a working pivot, not a data point.' },
                { text: 'Keep 25.4 — the mean uses every value, so it\'s the most complete average.', outcome: 'Using every value is exactly why outliers distort it: representativeness, not inclusiveness, is the test — the median says 7.', reveals: 'mean-is-always-best' },
                { text: 'Keep hunting for A in the data — the assumed mean must be an actual observation.', outcome: 'A is arbitrary by design: the correction term A + Σfd/N adjusts for any pivot — picking a convenient non-data value gives the identical mean.', reveals: 'assumed-mean-must-be-in-data' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'An average is a spokesman, not a summary — ask whether it\'s representing the data or just describing it.',
            decisions: [{ prompt: 'What comes next? Measures of Central Tendency · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Measures of Central Tendency · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_001', difficulty: 'standard',
          question: 'An average (or measure of central tendency) is a single representative value.',
          hint: 'Revise Class 10 Statistics: Mean of grouped data (Direct/Assumed Mean/Step Deviation).',
          misconception: 'Students believe "average" always means arithmetic mean and that the mean is the only or best average for any data.',
          parts: [
                { id: 'a', prompt: 'A teacher says: "The average mark of Class 11A is 72 and Class 11B is 68, so Class 11A performed better." Explain why this conclusion might be misleading even.', answer: 'The average alone hides the spread and shape of the distribution',
                  options: ['The average alone hides the spread and shape of the distribution', 'average'],
                  hint: 'Revise Class 10 Statistics: Mean of grouped data (Direct/Assumed Mean/Step Deviation), Median.',
                  misconception: 'Students believe "average" always means arithmetic mean and that the mean is the only or best average for any data.' },
                { id: 'b', prompt: 'A shoe store owner wants to stock only one size of a new sneaker model to maximise sales.', answer: 'Mode = 10 (appears 4 times)',
                  options: ['Mode = 10 (appears 4 times)', 'most popular', 'middle', 'balance point'],
                  hint: 'Revise Class 10 Statistics: Mean of grouped data (Direct/Assumed Mean/Step Deviation), Median.',
                  misconception: 'Students believe "average" always means arithmetic mean and that the mean is the only or best average for any data.' },
                { id: 'c', prompt: 'Consider two data sets: Set X: 10, 20, 30, 40, 50 Set Y: 10, 20, 30, 40, 500 Both have 5 observations. Compare their arithmetic means and medians.', answer: 'Set X: Mean = 30, Median = 30',
                  options: ['Set X: Mean = 30, Median = 30', 'average'],
                  hint: 'Revise Class 10 Statistics: Mean of grouped data (Direct/Assumed Mean/Step Deviation), Median.',
                  misconception: 'Students believe "average" always means arithmetic mean and that the mean is the only or best average for any data.' }
          ],
            remediations: { 'average-always-means-arithmetic-mean': { steps: ['Show the 5, 7, 7, 8, 100 example. Ask: "Which number best describes the typical value?"', 'Have them compute mean, median, mode.', 'Ask: "If this is daily wages of 5 workers, which average would the union leader quote? Which would the employer quote?', 'Explicitly list the decision rule: Symmetric data → mean; Skewed/outliers → median; Qualitative/most popular → mode.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_002', difficulty: 'standard',
          question: 'The Arithmetic Mean (X̄) is the sum of all observations divided by the total.',
          hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
          misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.',
          parts: [
                { id: 'a', prompt: 'In a continuous series with class intervals 0-10, 10-20, 20-30, a student uses the lower limits (0, 10, 20) instead of mid-points (5, 15, 25) to calculate the.', answer: 'No, the answer will be incorrect and systematically biased downward',
                  options: ['No, the answer will be incorrect and systematically biased downward', 'the Assumed Mean (A) must be one of the observed values in the dataset'],
                  hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
                  misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.' },
                { id: 'b', prompt: 'The monthly pocket money (in ₹) of 5 students is: 800, 1000, 1200, 1400, 1600.', answer: 'Step 1: A = 1200, c = 200',
                  options: ['Step 1: A = 1200, c = 200', 'the Assumed Mean (A) must be one of the observed values in the dataset'],
                  hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
                  misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.' },
                { id: 'c', prompt: 'Compare the Direct Method and Step Deviation Method for calculating the mean of a discrete series with large frequencies and large values (e.g., X = 1000.', answer: 'Step Deviation is more efficient',
                  options: ['Step Deviation is more efficient', 'Direct Method is always better', 'the Assumed Mean (A) must be one of the observed values in the dataset'],
                  hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
                  misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.' }
          ],
            remediations: { 'the-assumed-mean-a-must': { steps: ['If a student insists A must be from the data, do this: 1) Take a simple dataset (10, 20, 30).', '2) Calculate mean directly = 20.', '3) Use Assumed Mean with A=20 (existing) → show X̄=20.', '4) Use A=25 (not existing) → d = -15, -5, 5 → Σd = -15 → X̄ = 25 + (-15)/3 = 20.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.',
          parts: [
                { id: 'a', prompt: 'A teacher calculates the mean marks of a class test (max 50) for 30 students using the Assumed Mean method with A = 25. She gets Σfd = -150.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'we cannot tell without individual marks', 'the Assumed Mean (A) must be one of the observed values in the dataset'],
                  hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
                  misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.' },
                { id: 'b', prompt: 'Create a discrete series with 4 distinct values and frequencies such that the arithmetic mean calculated by Direct Method equals exactly 50, and the Assumed.', answer: 'Example: X = 40, 45, 55, 60',
                  options: ['Example: X = 40, 45, 55, 60', 'the Assumed Mean (A) must be one of the observed values in the dataset'],
                  hint: 'If stuck, revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
                  misconception: 'Students believe the Assumed Mean (A) must be one of the observed values in the dataset.' }
          ],
            remediations: { 'the-assumed-mean-a-must': { steps: ['If a student insists A must be from the data, do this: 1) Take a simple dataset (10, 20, 30).', '2) Calculate mean directly = 20.', '3) Use Assumed Mean with A=20 (existing) → show X̄=20.', '4) Use A=25 (not existing) → d = -15, -5, 5 → Σd = -15 → X̄ = 25 + (-15)/3 = 20.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_003', difficulty: 'standard',
          question: 'The arithmetic mean possesses two fundamental algebraic properties: (1) The sum.',
          hint: 'Review arithmetic mean calculation methods from c11_stat_cbse_05_002 and practice.',
          misconception: 'Students believe the sum of deviations from ANY value is zero, not just the arithmetic mean.',
          parts: [
                { id: 'a', prompt: 'State the algebraic sum of deviations of a set of n values from their arithmetic mean. Write the symbolic representation.', answer: 'The algebraic sum of deviations from the arithmetic mean is zero',
                  options: ['The algebraic sum of deviations from the arithmetic mean is zero', 'the sum of deviations from ANY value is zero, not just the arithmetic mean'],
                  hint: 'Review arithmetic mean calculation methods from c11_stat_cbse_05_002 and practice summation.',
                  misconception: 'Students believe the sum of deviations from ANY value is zero, not just the arithmetic mean.' },
                { id: 'b', prompt: 'The arithmetic mean of 10 observations is 25. If each observation is increased by 5, what is the new mean?', answer: 'New mean = 30',
                  options: ['New mean = 30', 'the sum of deviations from ANY value is zero, not just the arithmetic mean'],
                  hint: 'Review arithmetic mean calculation methods from c11_stat_cbse_05_002 and practice summation.',
                  misconception: 'Students believe the sum of deviations from ANY value is zero, not just the arithmetic mean.' },
                { id: 'c', prompt: 'A dataset has 5 observations: 12, 15, 18, 21, 24. Without calculating the mean, explain how you can verify the sum of deviations property once you find the.', answer: 'Mean = (12+15+18+21+24)/5 = 90/5 = 18',
                  options: ['Mean = (12+15+18+21+24)/5 = 90/5 = 18', 'the sum of deviations from ANY value is zero, not just the arithmetic mean'],
                  hint: 'Review arithmetic mean calculation methods from c11_stat_cbse_05_002 and practice summation.',
                  misconception: 'Students believe the sum of deviations from ANY value is zero, not just the arithmetic mean.' }
          ],
            remediations: { 'the-sum-of-deviations-from': { steps: ['Have the student take a small dataset (e.g., 3, 5, 7) and calculate the mean (5).', 'Ask them to compute deviations from 4 (sum = -1+1+3=3) and from 6 (sum = -3-1+1=-3).', 'Show only at the mean (5) do deviations sum to zero (-2+0+2=0).', 'For combined mean, use physical objects: 2 bags with 3 marbles each (avg 3) and 1 bag with 9 marbles (avg 9).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_004', difficulty: 'standard',
          question: 'Weighted Arithmetic Mean is a measure of central tendency where each.',
          hint: 'Revisit c11_stat_cbse_05_002 (Arithmetic Mean: Calculation) and c10_math_cbse_13_001.',
          misconception: 'Students often confuse **weights** with **frequencies**. In a frequency distribution, the frequency \\(f_i\\) is the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Weighted Arithmetic Mean is a measure of central tendency where each observation is',
                  options: ['Weighted Arithmetic Mean is a measure of central tendency where each observation is', 'An average (or measure of central tendency) is a single representative value that', 'The Arithmetic Mean (X̄) is the sum of all observations divided by the total number of', 'The arithmetic mean possesses two fundamental algebraic properties: (1) The sum of'],
                  hint: 'Revisit c11_stat_cbse_05_002 (Arithmetic Mean: Calculation) and c10_math_cbse_13_001 (Mean.',
                  misconception: 'Students often confuse **weights** with **frequencies**. In a frequency distribution, the frequency \\(f_i\\) is the count of how many times.' }
          ],
            remediations: { 'students-often-confuse-weights-with': { steps: ['If a student confuses weights with frequencies: (1) Give two side-by-side datasets: Dataset A: prices 10, 20 with.', 'Dataset B: prices 10, 20 with weights 0.6, 0.4 (budget shares).', '(2) Ask: "In which dataset does the number 3 mean \'this price appeared 3 times\'?', 'In which does 0.6 mean \'we decide this item matters 60%?" (3) Have them compute both means and interpret: Dataset.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_005', difficulty: 'standard',
          question: 'The median is a positional average that divides an ordered data set into two.',
          hint: 'If stuck, revisit "Cumulative Frequency Distribution" from Class 10 Statistics.',
          misconception: 'Students often use the continuous series formula (N/2) for discrete series, or vice versa.',
          parts: [
                { id: 'a', prompt: 'What is the position of the median in an individual series with 15 observations? State the formula and the position number.', answer: 'The position is given by (N+1)/2 = (15+1)/2 = 8th item',
                  options: ['The position is given by (N+1)/2 = (15+1)/2 = 8th item', '7.5th item', 'N/2 = 7.5'],
                  hint: 'If stuck, revisit "Cumulative Frequency Distribution" from Class 10 Statistics.',
                  misconception: 'Students often use the continuous series formula (N/2) for discrete series, or vice versa.' }
          ],
            remediations: { 'students-often-use-the-continuous': { steps: ['If a student makes this error, do the following: 1.', 'Have them write both formulas side by side: Individual/Discrete: Median = size of (N+1)/2-th item; Continuous: Median.', 'Ask: "In discrete series, do we know the exact values of all items?', 'No, we only know intervals." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_006', difficulty: 'standard',
          question: 'Quartiles, deciles, and percentiles are positional measures that divide.',
          hint: 'Revisit c11_stat_cbse_05_005 (Median) and c10_math_cbse_13_005 (Median of Grouped Data).',
          misconception: 'Students treat the formulas for ungrouped and grouped data as interchangeable, using (N+1)/4 for grouped data or N/4.',
          parts: [
                { id: 'a', prompt: 'What is the positional formula for the first quartile (Q₁) in an individual series of N observations, and what does Q₁ represent?', answer: 'Q₁ = size of (N+1)/4 th item',
                  options: ['Q₁ = size of (N+1)/4 th item', 'Q₁ = N/4 th item'],
                  hint: 'Revisit c11_stat_cbse_05_005 (Median) and c10_math_cbse_13_005 (Median of Grouped Data) focusing.',
                  misconception: 'Students treat the formulas for ungrouped and grouped data as interchangeable, using (N+1)/4 for grouped data or N/4 for ungrouped data.' }
          ],
            remediations: { 'students-treat-the-formulas-for': { steps: ['Have the student write both formulas side-by-side: Ungrouped Q₁ = size of (N+1)/4 th item; Grouped Q₁ = L + [(N/4.', 'Ask: "In ungrouped data, if N=10, what is the 2.75th item?', 'Show me how you get 2.75." Force them to compute (10+1)/4 = 2.75.', 'Then: "In grouped data, if N=100, which item marks Q₁?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
