import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch06_p2: SimDef = {
    id: 'v3_c11_stat_ch06_p2',
    title: 'Measures of Dispersion · Part 2/2',
    subtitle: 'Learn why identical averages can describe opposite worlds.',
    classLevel: 11, subject: 'statistics', topic: 'Measures of Dispersion · Part 2/2',
    chapters: ['c11_stat_ch06'],
    nodeIds: ['c11_stat_cbse_06_007', 'c11_stat_cbse_06_008', 'c11_stat_cbse_06_009', 'c11_stat_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fund allocator looking past the average', intro: 'Same average income, opposite district — one evenly middle, one feast-and-famine; only dispersion sees the difference.', goal: 'Use dispersion measures to expose what central tendency hides.' },
    discovery: {
        question: 'Districts A and B both average ₹50,000 household income — equal claims on the development fund?',
        options: ['No — B\'s ultra-rich few may hide mass poverty that A lacks; identical means with different dispersion are different realities', 'Yes — same mean, same need', 'Yes — allocation should follow averages', 'No — B should get less because it\'s richer'],
        answer: 'No — B\'s ultra-rich few may hide mass poverty that A lacks; identical means with different dispersion are different realities',
        hook: 'And dividing any absolute measure by the mean doesn\'t make it a CV — the coefficient of variation is specifically σ/mean; the rest have their own names.',
    },
    teaching: [
        { title: 'Variance and Its Relationship with Standard Deviation', text: 'Variance is the arithmetic mean of the squared deviations of each observation from the mean of the distribution; it is denoted by σ² (population) or s² (sample).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_06_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Show how two investments can share a 12% average return with wildly different risk, then judge when CV itself misleads.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_007', title: 'Variance and Its Relationship with Standard Deviation',
          scaffold: { problem: 'The daily wages (in ₹) of 10 workers are: 120, 130, 125, 140, 135, 128, 132, 138, 142, 130.',
            steps: [
            { text: 'Compute the mean x̄ = Σx / n = (120+130+125+140+135+128+132+138+142+130) / 10 = 1320 / 10 = 132.' },
            { text: 'Find deviations from mean: (120-132)=-12, (130-132)=-2, (125-132)=-7, (140-132)=8, (135-132)=3, (128-132)=-4.' },
            { text: 'Square each deviation: 144, 4, 49, 64, 9, 16, 0, 36, 100, 4.' },
            { text: 'Sum of squared deviations = 144+4+49+64+9+16+0+36+100+4 = 426.' },
            { text: 'Variance σ² = Σ(x - x̄)² / n = 426 / 10 = 42.6 (₹²).' },
            { text: 'Standard deviation σ = √(σ²) = √42.6 ≈ 6.527 ₹.', faded: true, blankAnswer: 'Variance = 42.6 ₹², Standard Deviation ≈ 6.53 ₹.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_008', title: 'Coefficient of Variation: Computation and Interpretation',
          scaffold: { problem: 'The weekly wages (in ₹) of 10 workers in Factory A are: 450, 480, 500, 520, 550, 580, 600, 620, 650, 680.',
            steps: [
            { text: 'Identify the data type — ungrouped (individual) series. We need mean (x̄) and standard deviation (σ).' },
            { text: 'Compute the mean: x̄ = (450+480+500+520+550+580+600+620+650+680)/10 = 5630/10 = 563.' },
            { text: 'Compute deviations from mean: (x_i - x̄) = -113, -83, -63, -43, -13, 17, 37, 57, 87, 117.' },
            { text: 'Variance = Σ(x_i - x̄)² / N = 51710 / 10 = 5171. Standard deviation σ = √5171 ≈ 71.91.' },
            { text: 'CV = (σ / x̄) × 100 = (71.91 / 563) × 100 ≈ 12.77%. Interpretation: The weekly wages have a relative dispersion.', faded: true, blankAnswer: 'CV ≈ 12.77%' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_009', title: 'Comparison of Different Measures of Dispersion',
          caseStudy: { intro: 'Imagine you are a farmer comparing the consistency of yield (in kg per acre) from two different wheat varieties over 10 years.',
            decisions: [{ prompt: 'What is the primary reason standard deviation is preferred over mean deviation for advanced statistical analysis?', options: [
                { text: 'Standard deviation is based on squared deviations', outcome: 'Standard deviation is based on squared deviations, which makes it amenable to algebraic.' },
                { text: 'standard deviation is easier to calculate', outcome: 'Not quite — Students often believe that standard deviation is always the "best" measure of dispersion because.', reveals: 'standard-deviation-is-always-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_06_010', title: 'Lorenz Curve: Construction and Interpretation of Inequality',
          scaffold: { problem: 'The monthly incomes (in ₹) of 8 workers in a factory are: 4500, 6000, 7500, 9000, 11000, 13000, 16000, 25000.',
            steps: [
            { text: 'Arrange incomes in ascending order (already sorted). Compute total income: Σx = 92000. Compute mean: x̄ = 11500.' },
            { text: 'Create cumulative frequency table. Cumulative workers: 1,2,3,4,5,6,7,8.' },
            { text: 'Compute cumulative income: 4500, 10500, 18000, 27000, 38000, 51000, 67000, 92000.' },
            { text: 'Add origin point (0%, 0%). Plot points: (0,0), (12.5,4.89), (25,11.41), (37.5,19.57), (50,29.35), (62.5,41.30).' },
            { text: 'Estimate Gini using trapezoidal rule. Area under Lorenz Curve (B) = Σ [(X_{i+1} - X_i) * (Y_{i+1} + Y_i) / 2] for i=0.' },
            { text: 'Interpret: Gini ≈ 0.073 indicates relatively low inequality among these 8 workers, though the top earner (25000).', faded: true, blankAnswer: 'Lorenz Curve points: (0,0), (12.5,4.89), (25,11.41).' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing two investment options both averaging 12% — one returns 11%, 12%, 13%; the other −20%, 12%, 44% — a student calls them \'equally good\', then computes every relative dispersion measure as \'absolute ÷ mean\' and names them all CV.',
            decisions: [{ prompt: 'What does dispersion analysis require?', options: [
                { text: 'Measure the spread and name the ratios correctly: equal means can hide opposite risk — the second option swings wildly, so dispersion is a necessity, not an extra. And each absolute measure has its OWN relative form: Coefficient of Range = (L−S)/(L+S), Coefficient of QD = (Q3−Q1)/(Q3+Q1), coefficient of MD divides by the same average used, and only (SD/Mean)×100 is the Coefficient of Variation.', outcome: 'The comparison becomes honest: averages alone can\'t rank options, and \'÷ mean\' isn\'t a universal recipe — each measure pairs with its specific denominator.' },
                { text: 'Keep \'equally good\' — same average return means same performance.', outcome: 'The mean summarises location, not risk: identical averages can sit on wildly different spreads — that\'s what dispersion exists to expose.', reveals: 'same-mean-same-data' },
                { text: 'Keep \'absolute ÷ mean\' for all — a relative measure is just the absolute over the average.', outcome: 'Each coefficient has its prescribed denominator — (L+S), (Q3+Q1), the matching average — CV is the name only for SD/mean.', reveals: 'all-relative-measures-divide-by-mean' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'The mean tells you the centre; dispersion tells you how much to trust it — a policy built on the first alone is half-blind.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_007', difficulty: 'standard',
          question: 'Variance is the arithmetic mean of the squared deviations of each observation.',
          hint: 'Revise c11_stat_cbse_06_006 (Standard Deviation calculation) and c10_math_cbse_13_001.',
          misconception: 'Students often treat variance and standard deviation as interchangeable "measures of spread" and forget that variance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Variance is the arithmetic mean of the squared deviations of each observation from the',
                  options: ['Variance is the arithmetic mean of the squared deviations of each observation from the', 'Measures of dispersion quantify the extent to', 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation, Standard', 'Range is the simplest absolute measure of dispersion defined as the difference between'],
                  hint: 'Revise c11_stat_cbse_06_006 (Standard Deviation calculation) and c10_math_cbse_13_001 (Mean.',
                  misconception: 'Students often treat variance and standard deviation as interchangeable "measures of spread" and forget that variance is in squared units.' }
          ],
            remediations: { 'students-often-treat-variance-and': { steps: ['Revisit the definition: variance = average of squared deviations; standard deviation = √(variance).', 'Write the units explicitly: if data is in kg, variance is kg², standard deviation is kg.', 'Practice converting between them: given σ² = 25 cm², σ = 5 cm; given σ = 3 kg, σ² = 9 kg².', 'Confirm with teacher that Class 11 uses denominator N (not n-1) for all series — individual, discrete, continuous.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_008', difficulty: 'standard',
          question: 'The Coefficient of Variation (CV) is a relative measure of dispersion defined.',
          hint: 'If stuck, revisit Standard Deviation: Calculation for Different Series.',
          misconception: 'Students often believe that a higher standard deviation always means more variability, ignoring the scale of the mean.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Coefficient of Variation (CV) is a relative measure of dispersion defined as the',
                  options: ['The Coefficient of Variation (CV) is a relative measure of dispersion defined as the', 'Measures of dispersion quantify the extent to', 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation, Standard', 'Range is the simplest absolute measure of dispersion defined as the difference between'],
                  hint: 'If stuck, revisit Standard Deviation: Calculation for Different Series (c11_stat_cbse_06_006) and.',
                  misconception: 'Students often believe that a higher standard deviation always means more variability, ignoring the scale of the mean.' }
          ],
            remediations: { 'a-higher-standard-deviation-always': { steps: ['Revisit the definition of relative vs absolute measures (node c11_stat_cbse_06_002).', 'Practice computing mean and SD for two datasets with different units (e.g., heights in cm and weights in kg) and force.', 'Drill the formula CV = (σ / x̄) × 100 with emphasis on the multiplication by 100.', 'Use a worked example where mean is negative or zero to demonstrate CV is undefined, reinforcing domain restrictions.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_009', difficulty: 'standard',
          question: 'Comparison of different measures of dispersion involves evaluating the.',
          hint: 'Revisit the step-deviation method for standard deviation (c11_stat_cbse_06_006) and the.',
          misconception: 'Students often believe that standard deviation is always the "best" measure of dispersion because it is the most.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason standard deviation is preferred over mean deviation for advanced statistical analysis?', answer: 'Standard deviation is based on squared deviations',
                  options: ['Standard deviation is based on squared deviations', 'standard deviation is easier to calculate'],
                  hint: 'Revisit the step-deviation method for standard deviation (c11_stat_cbse_06_006) and the coefficient.',
                  misconception: 'Students often believe that standard deviation is always the "best" measure of dispersion because it is the most commonly used in higher.' },
                { id: 'b', prompt: 'A data set has extreme outliers due to measurement errors. Which measure of dispersion is least affected by these outliers, and why?', answer: 'Quartile deviation (semi-interquartile range) is least affected',
                  options: ['Quartile deviation (semi-interquartile range) is least affected', 'standard deviation'],
                  hint: 'Revisit the step-deviation method for standard deviation (c11_stat_cbse_06_006) and the coefficient.',
                  misconception: 'Students often believe that standard deviation is always the "best" measure of dispersion because it is the most commonly used in higher.' }
          ],
            remediations: { 'standard-deviation-is-always-the': { steps: ['Ask the student to list the five absolute measures of dispersion studied.', 'For each, write one situation where it fails (e.g., range fails with outliers, mean deviation fails algebraic.', 'Have them match each failure to the measure that solves it (quartile deviation for outliers, standard deviation for.', 'Practice with three datasets: one with open ends, one with extreme outliers, one normal – and have them pick the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_06_010', difficulty: 'standard',
          question: 'The Lorenz Curve is a graphical representation of the cumulative distribution.',
          hint: 'Review Class 10 Maths Chapter 13: \'Graphical Representation: Cumulative Frequency Curve.',
          misconception: 'Students often believe the Lorenz Curve *is* the Gini coefficient, or that the Gini coefficient can be read directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Lorenz Curve is a graphical representation of the cumulative distribution of a',
                  options: ['The Lorenz Curve is a graphical representation of the cumulative distribution of a', 'Measures of dispersion quantify the extent to', 'Absolute measures of dispersion (Range, Quartile Deviation, Mean Deviation, Standard', 'Range is the simplest absolute measure of dispersion defined as the difference between'],
                  hint: 'Review Class 10 Maths Chapter 13: \'Graphical Representation: Cumulative Frequency Curve (Ogive)\'.',
                  misconception: 'Students often believe the Lorenz Curve *is* the Gini coefficient, or that the Gini coefficient can be read directly off the curve as.' }
          ],
            remediations: { 'the-lorenz-curve-is-the': { steps: ['Remediation: 1) Draw a large Lorenz Curve on graph paper with a known Gini (e.g., 0.25).', '2) Have the student physically shade the entire area between the curve and the line of equality, and the total area.', '3) Count squares (or use grid approximation) to compute the area ratio = Gini.', '4) Contrast this with the vertical gap at 50% population.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
