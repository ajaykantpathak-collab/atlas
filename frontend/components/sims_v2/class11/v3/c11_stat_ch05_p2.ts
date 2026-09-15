import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch05_p2: SimDef = {
    id: 'v3_c11_stat_ch05_p2',
    title: 'Measures of Central Tendency · Part 2/2',
    subtitle: 'Catch the outlier that hijacks the mean.',
    classLevel: 11, subject: 'statistics', topic: 'Measures of Central Tendency · Part 2/2',
    chapters: ['c11_stat_ch05'],
    nodeIds: ['c11_stat_cbse_05_007', 'c11_stat_cbse_05_008', 'c11_stat_cbse_05_009', 'c11_stat_cbse_05_010', 'c11_stat_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst choosing which average deserves the headline', intro: 'Five numbers, one bully: the hundred pulls the mean off the page while the median calmly reports the middle.', goal: 'Choose between mean, median and mode by data shape and compute the assumed-mean method.' },
    discovery: {
        question: 'Data: 5, 7, 7, 8, 100. The \'average\' is 25.4 — a fair summary?',
        options: ['No — one outlier dragged the mean past every real value; the median or mode, 7, represents the data honestly', 'Yes — mean is the average, end of story', 'Yes — 25.4 is mathematically correct', 'No — the true average is 8'],
        answer: 'No — one outlier dragged the mean past every real value; the median or mode, 7, represents the data honestly',
        hook: 'And the assumed mean needn\'t be in the data — A is just a convenient origin; A = 16.5 gives the same mean as A = 15.',
    },
    teaching: [
        { title: 'Mode: Calculation for Different Series and Merits', text: 'Mode is the value that occurs with the highest frequency in a data set; for discrete series it is the variable value with maximum frequency, and for continuous series it is calculated using the modal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare two localities\' incomes where equal means hide opposite distributions, then compute a mean by the assumed-mean shortcut.',
        labels: ['Mode: Calculation for Different', 'Relationship Between Mean, Median,', 'Geometric Mean: Calculation', 'Harmonic Mean: Calculation', 'Comparative Merits and Limitations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_007', title: 'Mode: Calculation for Different Series and Merits',
          scaffold: { problem: 'A survey of 50 households in a village recorded the number of milk-producing animals per household. Find the mode.',
            steps: [
            { text: 'Identify that this is a discrete series because the variable (number of animals) takes distinct integer values.' },
            { text: 'Locate the maximum frequency in the frequency column. The frequencies are 5, 12, 18, 10, 3, 2. The highest is 18.' },
            { text: 'Find the variable value corresponding to this maximum frequency. Frequency 18 corresponds to "2 animals".' },
            { text: 'State the mode. Mode = 2 animals.' },
            { text: 'Interpret: The most typical household has 2 milk-producing animals.', faded: true, blankAnswer: 'Mode = 2 animals' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_008', title: 'Relationship Between Mean, Median, and Mode',
          scaffold: { problem: 'In a study of daily wages (in ₹) of workers in a small factory, the arithmetic mean wage is ₹420 and the median wage is ₹380.',
            steps: [
            { text: 'Identify the given values: Mean (X̄) = ₹420, Median (M) = ₹380.' },
            { text: 'Recall the empirical formula: Mode (Z) = 3 Median – 2 Mean.' },
            { text: 'Substitute the values: Z = 3(380) – 2(420) = 1140 – 840 = 300.' },
            { text: 'The estimated modal wage is ₹300. Verify the order: Mean (420) > Median (380) > Mode (300).' },
            { text: 'Interpretation: The typical worker (mode) earns ₹300, half the workers earn ≤ ₹380 (median), but the average (mean).', faded: true, blankAnswer: 'Estimated Modal Wage = ₹300. The distribution is positively.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_009', title: 'Geometric Mean: Calculation and Application',
          scaffold: { problem: 'The annual growth rates of a startup\'s revenue over 4 years were: 20%, 30%, -10%, 40%.',
            steps: [
            { text: 'Convert percentage growth rates to growth factors (decimal multipliers): Year 1: 1 + 20/100 = 1.20; Year 2: 1.30; Year.' },
            { text: 'Take logarithm (base 10) of each factor: log(1.20) = 0.07918; log(1.30) = 0.11394; log(0.90) = -0.04576; log(1.40).' },
            { text: 'Sum the logarithms: 0.07918 + 0.11394 + (-0.04576) + 0.14613 = 0.29349.' },
            { text: 'Divide by number of years (n = 4): 0.29349 / 4 = 0.07337.' },
            { text: 'Take antilog (10^0.07337) = 1.1837. This is the average growth factor.' },
            { text: 'Convert back to percentage: (1.1837 - 1) × 100 = 18.37% per annum.' },
            { text: 'Verify by direct product method: (1.20 × 1.30 × 0.90 × 1.40)^(1/4) = (1.9656)^(0.25) = 1.1837.', faded: true, blankAnswer: '18.37% per annum (Geometric Mean growth rate). The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_05_010', title: 'Harmonic Mean: Calculation and When to Use',
          scaffold: { problem: 'A truck driver travels from Mumbai to Pune (150 km) at 50 km/h and returns at 60 km/h. Find the average speed for the entire journey.',
            steps: [
            { text: 'Identify the physical situation — equal distances (150 km each way), different speeds.' },
            { text: 'Recall the HM formula for two values: \\(HM = \\frac{2}{\\frac{1}{v_1} + \\frac{1}{v_2}}\\) or derive from definition.' },
            { text: 'Compute time for each leg: \\(t_1 = \\frac{150}{50} = 3 \\text{ hours}\\), \\(t_2 = \\frac{150}{60} = 2.5 \\text{ hours}\\).' },
            { text: 'Total distance = 300 km, Total time = 5.5 hours. Average speed = \\(300 / 5.5 = 54.545 \\text{ km/h}\\).' },
            { text: 'Verify using HM formula directly: \\(HM = \\frac{2}{\\frac{1}{50} + \\frac{1}{60}} = \\frac{2}{0.02 + 0.01667}.' },
            { text: 'Interpret — The average speed (54.55 km/h) is less than the arithmetic mean (55 km/h) because more time was spent.', faded: true, blankAnswer: '54.55 km/h (approx)' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_011', title: 'Comparative Merits and Limitations of Different Averages',
          caseStudy: { intro: 'Imagine you are a policy analyst for the NITI Aayog reviewing a report stating "The average annual income in District X is ₹12 lakh" based on data where 95%.',
            decisions: [{ prompt: 'List the six criteria used in NCERT Class 11 Statistics for comparing the merits and limitations of different averages.', options: [
                { text: 'The six criteria are: (1) Rigidly defined, (2) Based on all observations, (3) Capable of', outcome: 'The six criteria are: (1) Rigidly defined, (2) Based on all observations, (3) Capable of algebraic.' },
                { text: 'easy to calculate', outcome: 'Not quite — Students believe "Arithmetic Mean is the default average; use others only when AM fails." This.', reveals: 'arithmetic-mean-is-the-default' },
                { text: 'uses all data', outcome: 'Not quite — Students believe "Arithmetic Mean is the default average; use others only when AM fails." This.', reveals: 'arithmetic-mean-is-the-default' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising the dataset 5, 7, 7, 8, 100 for a class report, a student writes \'average = 25.4\' and later, for an assumed-mean calculation, stalls because \'A must be one of the observed values.\'',
            decisions: [{ prompt: 'What does choosing and computing an average require?', options: [
                { text: 'Choose by shape, not habit: the mean (25.4) is dragged by the outlier 100 — the median or mode (7) represents this skewed set far better; average ≠ always mean. And the assumed mean A is any convenient number — it needn\'t be in the data; A = 16.5 works as well as 15 because deviations correct for the choice.', outcome: 'He stops defaulting: selection criteria come first (skew? outliers? qualitative variable?), and A is a working pivot, not a data point.' },
                { text: 'Keep 25.4 — the mean uses every value, so it\'s the most complete average.', outcome: 'Using every value is exactly why outliers distort it: representativeness, not inclusiveness, is the test — the median says 7.', reveals: 'mean-is-always-best' },
                { text: 'Keep hunting for A in the data — the assumed mean must be an actual observation.', outcome: 'A is arbitrary by design: the correction term A + Σfd/N adjusts for any pivot — picking a convenient non-data value gives the identical mean.', reveals: 'assumed-mean-must-be-in-data' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'An average is a spokesman, not a summary — ask whether it\'s representing the data or just describing it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_007', difficulty: 'standard',
          question: 'Mode is the value that occurs with the highest frequency in a data set; for.',
          hint: 'Review c11_stat_cbse_05_005 (Median) for cumulative frequency conversion and class.',
          misconception: 'Students often apply the continuous series mode formula to discrete series by converting variables into class intervals.',
          parts: [
                { id: 'a', prompt: 'A student computes the mode for the following discrete series and gets 30. Variable: 10, 20, 30, 40, 50; Frequency: 2, 8, 20, 10, 5.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'mode is 20'],
                  hint: 'Review c11_stat_cbse_05_005 (Median) for cumulative frequency conversion and class interval.',
                  misconception: 'Students often apply the continuous series mode formula to discrete series by converting variables into class intervals of width 1 (e.g.' },
                { id: 'b', prompt: 'Compare the mode calculated from the continuous series in Question 3 with the mode you would get if you treated the same data as a discrete series using the.', answer: 'Discrete mode using mid-points: highest frequency 20 at mid-point 25 → mode = 25',
                  options: ['Discrete mode using mid-points: highest frequency 20 at mid-point 25 → mode = 25', 'they are the same'],
                  hint: 'Review c11_stat_cbse_05_005 (Median) for cumulative frequency conversion and class interval.',
                  misconception: 'Students often apply the continuous series mode formula to discrete series by converting variables into class intervals of width 1 (e.g.' }
          ],
            remediations: { 'students-often-apply-the-continuous': { steps: ['If a student uses the formula on discrete data, ask: "What is the actual observed value that occurs most often?" Have.', 'For inclusive intervals, give a simple example: classes 10–19, 20–29 with frequencies 5, 10.', 'Ask: "What is the lower limit of the modal class?" They say 20.', 'Then ask: "If a value is 19.5, which class does it belong to?" They realise 19.5 falls in a gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often apply the continuous series mode formula to discrete series by converting variables into class intervals.',
          parts: [
                { id: 'a', prompt: 'A factory produces shirts in sizes S, M, L, XL with frequencies 50, 120, 80, 30.', answer: 'Mode (M) is more appropriate',
                  options: ['Mode (M) is more appropriate', 'mean is better because it uses all data'],
                  hint: 'Review c11_stat_cbse_05_005 (Median) for cumulative frequency conversion and class interval.',
                  misconception: 'Students often apply the continuous series mode formula to discrete series by converting variables into class intervals of width 1 (e.g.' }
          ],
            remediations: { 'students-often-apply-the-continuous': { steps: ['If a student uses the formula on discrete data, ask: "What is the actual observed value that occurs most often?" Have.', 'For inclusive intervals, give a simple example: classes 10–19, 20–29 with frequencies 5, 10.', 'Ask: "What is the lower limit of the modal class?" They say 20.', 'Then ask: "If a value is 19.5, which class does it belong to?" They realise 19.5 falls in a gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_008', difficulty: 'standard',
          question: 'For a moderately skewed unimodal distribution, the empirical relationship.',
          hint: 'Review the median and mode formulas for continuous series (nodes c11_stat_cbse_05_005 and.',
          misconception: '**Misconception:** "The formula Mode = 3 Median – 2 Mean is an exact mathematical theorem that holds for *any*.',
          parts: [
                { id: 'a', prompt: 'Explain why the empirical relationship Mode = 3 Median – 2 Mean is **not** applicable to: (a) a perfectly symmetric distribution, (b) a bimodal distribution.', answer: 'a perfectly symmetric distribution, (',
                  options: ['a perfectly symmetric distribution, (', 'it works for all distributions'],
                  hint: 'Review the median and mode formulas for continuous series (nodes c11_stat_cbse_05_005 and.',
                  misconception: '**Misconception:** "The formula Mode = 3 Median – 2 Mean is an exact mathematical theorem that holds for *any* dataset." **Why it arises:**.' }
          ],
            remediations: { 'misconception-the-formula-mode-3': { steps: ['**Revisit skewness visually:** Draw three histograms on the board—symmetric, positively skewed (tail right), negatively.', 'Mark Mean, Median, Mode on each.', 'Which average gets pulled toward the tail?" (Mean).', '"Which stays in the middle?" (Median).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_009', difficulty: 'standard',
          question: 'The Geometric Mean (GM) is the n-th root of the product of n positive.',
          hint: 'If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant.',
          misconception: 'Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros".',
          parts: [
                { id: 'a', prompt: 'State the formula for Geometric Mean of n positive observations \\( x_1, x_2, ..., x_n \\) and explain why all observations must be strictly positive.', answer: 'The formula is \\( GM = (x_1 \\times x_2 \\times',
                  options: ['The formula is \\( GM = (x_1 \\times x_2 \\times', 'zero is allowed', 'we can use absolute values', 'ignoring zeros'],
                  hint: 'If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant ratio.',
                  misconception: 'Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros" or "taking absolute.' },
                { id: 'b', prompt: 'A student calculates the average growth rate of a bacteria culture that doubles every hour for 3 hours as \\( \\frac{2+2+2}{3} = 2 \\) (200% per hour).', answer: 'The student used Arithmetic Mean on growth factors (2, 2, 2), but growth is',
                  options: ['The student used Arithmetic Mean on growth factors (2, 2, 2), but growth is', 'ignoring zeros', 'taking absolute values'],
                  hint: 'If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant ratio.',
                  misconception: 'Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros" or "taking absolute.' },
                { id: 'c', prompt: 'Calculate the Geometric Mean of the data set: 4, 9, 16 using the logarithmic method. Show all steps including finding antilog.', answer: 'Step 1: Take log of each value: log 4 = 0.6021, log 9 = 0.9542, log 16 = 1.2041',
                  options: ['Step 1: Take log of each value: log 4 = 0.6021, log 9 = 0.9542, log 16 = 1.2041', 'ignoring zeros', 'taking absolute values'],
                  hint: 'If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant ratio.',
                  misconception: 'Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros" or "taking absolute.' },
                { id: 'd', prompt: 'Compare the Geometric Mean and Arithmetic Mean for the data: 2, 8, 32. Prove that GM ≤ AM and explain when equality holds.', answer: 'AM = (2+8+32)/3 = 14',
                  options: ['AM = (2+8+32)/3 = 14', 'AM is always better', 'GM can exceed AM', 'ignoring zeros'],
                  hint: 'If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant ratio.',
                  misconception: 'Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros" or "taking absolute.' }
          ],
            remediations: { 'geometric-mean-can-be-calculated': { steps: ['If a student attempts GM on non-positive data: (1) Ask: "What is log(0) or log(-5)?" to expose the domain error.', '(2) Show the growth interpretation: a -100% return (factor 0) means capital is wiped out – no recovery possible,.', '(3) Demonstrate with a concrete example: ₹1000 → 0 → any positive number is impossible.', '(4) Redirect to the correct approach: for growth rates including -100%, either exclude that period with a footnote,.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_010', difficulty: 'standard',
          question: 'The Harmonic Mean (HM) is a measure of central tendency defined as the.',
          hint: 'If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)**.',
          misconception: '**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values.',
          parts: [
                { id: 'a', prompt: 'Define Harmonic Mean mathematically for a set of n positive observations \\(x_1, x_2, \\ldots, x_n\\).', answer: '**Correct Answer:** \\(HM = \\frac{n}{\\sum_{i=1}^n \\frac{1}{x_i}}\\)',
                  options: ['**Correct Answer:** \\(HM = \\frac{n}{\\sum_{i=1}^n \\frac{1}{x_i}}\\)', 'when data has extreme values', 'when values are multiplied', 'just another average'],
                  hint: 'If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)** — specifically.',
                  misconception: '**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values (like median) or when.' },
                { id: 'b', prompt: 'A car travels 100 km at 50 km/h, then another 100 km at 100 km/h. A student calculates average speed as (50+100)/2 = 75 km/h.', answer: '**Correct Answer:** The student used Arithmetic Mean',
                  options: ['**Correct Answer:** The student used Arithmetic Mean', 'AM is fine because there are only two speeds', 'HM is for more than 2 values', 'just another average'],
                  hint: 'If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)** — specifically.',
                  misconception: '**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values (like median) or when.' },
                { id: 'c', prompt: 'Calculate the Harmonic Mean for the following discrete series: | Value (x) | 4 | 8 | 12 | 16 | | Frequency (f) | 2 | 3 | 4 | 1 | Show all steps including the.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'just another average', 'HM is for rates', 'robust to outliers'],
                  hint: 'If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)** — specifically.',
                  misconception: '**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values (like median) or when.' },
                { id: 'd', prompt: 'For any set of positive numbers, the relationship \\(HM \\le GM \\le AM\\) holds. Prove this for the two numbers 4 and 16 by calculating all three means.', answer: '**Correct Answer:** - \\(AM = \\frac{4+16}{2} = 10\\) - \\(GM = \\sqrt{4 \\times 16} =',
                  options: ['**Correct Answer:** - \\(AM = \\frac{4+16}{2} = 10\\) - \\(GM = \\sqrt{4 \\times 16} =', 'HM is smaller because it uses reciprocals', 'just another average', 'HM is for rates'],
                  hint: 'If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)** — specifically.',
                  misconception: '**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values (like median) or when.' }
          ],
            remediations: { 'specific-error-students-believe-harmonic': { steps: ['**Targeted Remediation Steps:** 1.', '**Concrete Physical Derivation:** Draw a distance-time diagram for the round-trip problem.', 'Mark distances (equal), times (unequal).', 'Show that total distance / total time = \\(2d / (d/v_1 + d/v_2) = 2 / (1/v_1 + 1/v_2)\\).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_05_011', difficulty: 'standard',
          question: 'The comparative merits and limitations of different averages refers to the.',
          hint: 'If stuck, immediately revisit c11_stat_cbse_05_003 (AM properties), c11_stat_cbse_05_005.',
          misconception: 'Students believe "Arithmetic Mean is the default average; use others only when AM fails." This stems from middle-school.',
          parts: [
                { id: 'a', prompt: 'A factory produces 1000 items daily. The production manager wants a single average to represent "typical daily output" for annual planning.', answer: 'Mean = (0+950+980+1000+1020+1050+2000)/7 = 7000/7 = 1000',
                  options: ['Mean = (0+950+980+1000+1020+1050+2000)/7 = 7000/7 = 1000', 'extremes exist', 'Arithmetic Mean is the default average', '"Arithmetic Mean is the default average'],
                  hint: 'If stuck, immediately revisit c11_stat_cbse_05_003 (AM properties), c11_stat_cbse_05_005 (Median.',
                  misconception: 'Students believe "Arithmetic Mean is the default average; use others only when AM fails." This stems from middle-school exposure where.' },
                { id: 'b', prompt: 'Compare the behavior of Arithmetic Mean, Geometric Mean, and Harmonic Mean for the dataset: 2, 4, 8, 16, 32.', answer: 'AM = 62/5 = 12.4',
                  options: ['AM = 62/5 = 12.4', 'Arithmetic Mean is the default average', '"Arithmetic Mean is the default average'],
                  hint: 'If stuck, immediately revisit c11_stat_cbse_05_003 (AM properties), c11_stat_cbse_05_005 (Median.',
                  misconception: 'Students believe "Arithmetic Mean is the default average; use others only when AM fails." This stems from middle-school exposure where.' }
          ],
            remediations: { 'arithmetic-mean-is-the-default': { steps: ['Revisit c11_stat_cbse_05_009 (Geometric Mean) and c11_stat_cbse_05_010 (Harmonic Mean) to internalize their *defining.', 'Create a 3-column table: Variable Type (Additive/Amount, Multiplicative/Growth, Rate/Speed) → Correct Average (AM,.', 'Practice NCERT Exercise Q1 (page 72) which lists 7 scenarios — write a one-sentence justification for each choice using.', 'Solve Example 9 from NCERT (quartiles) to reinforce that positional averages (Median, Quartiles) work for open-ended.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
