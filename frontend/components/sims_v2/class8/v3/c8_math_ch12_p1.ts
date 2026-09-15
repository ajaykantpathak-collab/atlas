import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch12_p1: SimDef = {
    id: 'v3_c8_math_ch12_p1',
    title: 'Tales by Dots and Lines · Part 1/2',
    subtitle: 'The mean is a seesaw, not a middle',
    classLevel: 8, subject: 'mathematics', topic: 'Tales by Dots and Lines · Part 1/2',
    chapters: ['c8_math_ch12'],
    nodeIds: ['c8_math_ch12_1', 'c8_math_ch12_10', 'c8_math_ch12_11', 'c8_math_ch12_12', 'c8_math_ch12_2', 'c8_math_ch12_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data-balancing acrobat', intro: 'Picture every data point as a kid on a seesaw. There\'s exactly one spot to place the pivot so nobody tips — and once you find it, you can even recover a missing kid\'s weight.', goal: 'Understand the mean as the balancing point of a data set — where signed deviations sum to zero — and use that property to find missing values.' },
    discovery: {
        question: 'Five friends hold 2, 4, 6, 8, 10 marbles. The mean is 6 — but what makes 6 THE balancing point and not, say, 5 or 7?',
        options: ['At the mean, the total shortfall below it exactly cancels the total excess above it — the signed distances always sum to zero', 'Because 6 is the middle number in the list', 'Because 6 is the most common value', 'Because the teacher said so'],
        answer: 'At the mean, the total shortfall below it exactly cancels the total excess above it — the signed distances always sum to zero',
        hook: 'The mean isn\'t the \'middle number\' — it\'s a seesaw pivot. For 2, 4, 6, 10, 18 the mean is 8 even though more points sit below it than above: distance matters, not headcount. That\'s also how you can find a missing value from the mean alone.',
    },
    teaching: [
        { title: 'Mean as a Balancing Point: Sum of Distances on Both Sides', text: 'The mean of a data set is the unique value where the sum of the signed deviations of all data points from it equals zero; equivalently, the total distance of points below the mean equals the total.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch12_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Test the seesaw: take a data set, compute the mean, then add up the distances below and above it until they match. Then work backwards — given the mean is 10 for 5, 9, 13 and a mystery x, pin down x without guessing.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_1', title: 'Mean as a Balancing Point: Sum of Distances on Both Sides',
          scaffold: { problem: 'The monthly pocket money (in rupees) of six students is: 200, 250, 300, 350, 400, 450.',
            steps: [
            { text: 'Calculate the mean. Sum = 200+250+300+350+400+450 = 1950. Number of students = 6. Mean = 1950 ÷ 6 = 325 rupees.' },
            { text: 'List each value and its signed deviation from the mean (value - mean).' },
            { text: 'Separate the negative and positive deviations. Negative deviations: -125, -75, -25. Positive deviations: +25, +75, +125.' },
            { text: 'Sum the absolute distances on each side. Below mean: |−125| + |−75| + |−25| = 125+75+25 = 225.' },
            { text: 'Compare the sums. Both sides sum to 225, so the balancing property holds. The mean 325 is indeed the balancing point.', faded: true, blankAnswer: 'The mean is ₹325. The sum of distances below the mean.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_10', title: 'Comparing Mean, Median, and Mode: Choosing the Best Measure',
          scaffold: { problem: 'A small kirana store records daily sales (in ₹) for 7 days: 4200, 4500, 4300, 4400, 4600, 4350, 12000.',
            steps: [
            { text: 'Organise the data and calculate the mean. Sum = 4200+4500+4300+4400+4600+4350+12000 = 38350.' },
            { text: 'Calculate the median. Sort data: 4200, 4300, 4350, 4400, 4500, 4600, 12000. Middle (4th) value = ₹4400.' },
            { text: 'Calculate the mode. No value repeats, so there is no mode (or all values are modes).' },
            { text: 'Visualise with a dot plot mentally: six values clustered between 4200–4600, one extreme value at 12000 (a festival day).' },
            { text: 'Compare measures to the cluster. Mean (5478) is pulled toward the 12000 and lies outside the cluster.', faded: true, blankAnswer: 'Median = ₹4400 is the best measure. Mean = ₹5478.57.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_11', title: 'Range: Measuring the Spread of Data',
          scaffold: { problem: 'The weights (in kg) of 8 students in a class are: 34, 42, 38, 45, 31, 40, 36, 44. Find the range of the weights.',
            steps: [
            { text: 'Identify the given data set: 34, 42, 38, 45, 31, 40, 36, 44. We need to find the range.' },
            { text: 'Recall the formula: Range = Maximum value − Minimum value. To apply this, first find the maximum and minimum.' },
            { text: 'Order the data to easily spot min and max: 31, 34, 36, 38, 40, 42, 44, 45. Minimum = 31 kg, Maximum = 45 kg.' },
            { text: 'Substitute into formula: Range = 45 − 31 = 14.' },
            { text: 'Interpret: The weights of students vary by 14 kg. The spread from lightest to heaviest is 14 kg.', faded: true, blankAnswer: '14 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_12', title: 'Line Plots and Bar Graphs for Data Representation',
          scaffold: { problem: 'A Class 8 teacher records the number of hours 20 students spent on a science project: 3, 5, 2, 4, 6, 3, 4, 5, 3, 2, 4, 5, 6, 3, 4, 2, 5, 4.',
            steps: [
            { text: 'Organize raw data into a frequency table. Values range from 2 to 6.' },
            { text: 'For the line plot, draw a horizontal number line from 2 to 6. Above each value, place one dot per student: 2: ●●●, 3.' },
            { text: 'For the bar graph, draw vertical axis (Frequency 0-5) and horizontal axis (Hours 2-6).' },
            { text: 'From line plot, mode is visible as tallest stacks: 3 and 5 hours (both 5 dots).' },
            { text: 'From bar graph, mode is tallest bars: 3 and 5 hours. Range = 6 - 2 = 4 hours.', faded: true, blankAnswer: 'Line plot and bar graph constructed as described. Mode = 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_2', title: 'Visualising Mean Using Dot Plots',
          scaffold: { problem: 'The number of books read by 7 students in a month are: 3, 5, 4, 6, 4, 5, 7. Draw a dot plot and find the mean by balancing distances.',
            steps: [
            { text: 'Draw a number line from 3 to 7. Place dots: one at 3, two at 4, two at 5, one at 6, one at 7.' },
            { text: 'Guess the balance point. Try 5. Distances left: (5-3)=2, (5-4)=1 twice → total 4.' },
            { text: 'Adjust guess to 4.857? Better to compute arithmetic mean first: sum = 3+4+4+5+5+6+7 = 34, n=7, mean = 34/7 ≈ 4.857.' },
            { text: 'Check balance at 34/7. Left distances: (34/7 - 3) = 13/7 ≈ 1.857; (34/7 - 4) = 6/7 twice → 12/7 ≈ 1.714; total left.' },
            { text: 'Mean = 34/7 ≈ 4.86 books. The visual balance matches the arithmetic mean.', faded: true, blankAnswer: 'Mean = 34/7 ≈ 4.86 books.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_3', title: 'Effect of Adding or Removing a Value on the Mean',
          scaffold: { problem: 'In a class of 25 students, the average weight is 42 kg. A new student weighing 50 kg joins the class.',
            steps: [
            { text: 'Identify the given values: Old Mean = 42 kg, Old Count = 25, New Value = 50 kg.' },
            { text: 'Compute the deviation of the new value from the old mean: Deviation = 50 - 42 = 8 kg.' },
            { text: 'Determine the new count: New Count = 25 + 1 = 26.' },
            { text: 'Calculate the shift in the mean: Shift = Deviation / New Count = 8 / 26 = 4/13 ≈ 0.3077 kg.' },
            { text: 'Find the new mean: New Mean = Old Mean + Shift = 42 + 0.3077 = 42.3077 kg ≈ 42.31 kg.', faded: true, blankAnswer: '42.31 kg (approx)' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch12_3', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch12_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Five friends\' marble counts are 2, 4, 6, 8 and 10, with mean 6. Planning a redistribution game, a student argues the mean is \'just the middle number\' and any central number balances the group the same way.',
            decisions: [{ prompt: 'What makes the mean a true balance point?', options: [
                { text: 'Distances below and above it must cancel: 2 sits 4 below the mean and 4 sits 2 below (total 6 below); 8 sits 2 above and 10 sits 4 above (total 6 above). Only the mean makes the two sides equal; shift it and the balance breaks.', outcome: 'This uses the defining property — signed deviations from the mean always sum to zero — so \'6\' is provably the pivot, not merely \'the middle.\'' },
                { text: 'He is right — the mean is whichever number sits in the middle, so 4, 6 or 8 all balance equally well.', outcome: 'Try 4: the below-side is only 2 while the above-side sums to 14 — wildly unbalanced; centrality-by-position is not the balancing property.', reveals: 'mean-is-middle' },
                { text: 'The mean balances only when data is symmetric like this set; in general the deviations need not cancel.', outcome: 'The cancellation holds for every data set by definition of the mean — symmetry is not required, only that total below-distance equals total above-distance.', reveals: 'balance-needs-symmetry' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch12_3', title: 'The bigger picture',
          caseStudy: { intro: 'The mean is where a data set balances: everything below pulls down exactly as hard as everything above pulls up. Sum of deviations = 0 — always, no exceptions.',
            decisions: [{ prompt: 'What comes next? Tales by Dots and Lines · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tales by Dots and Lines · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch12_1', difficulty: 'standard',
          question: 'The mean of a data set is the unique value where the sum of the signed.',
          hint: 'Review signed deviations: practice finding the difference between each data point and the.',
          misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the.',
          parts: [
                { id: 'a', prompt: 'What is the sum of the deviations of all data points from their mean? (Answer in one sentence.)', answer: 'The sum of deviations from the mean is always zero',
                  options: ['The sum of deviations from the mean is always zero', 'it depends on the data', 'middle number', 'the balancing property means there are an equal number of points on each side'],
                  hint: 'Review signed deviations: practice finding the difference between each data point and the mean.',
                  misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property.' },
                { id: 'b', prompt: 'The weights (in kg) of five boxes are 12, 15, 18, 21, and 24. Verify the balancing property by calculating the sum of distances below the mean and the sum.', answer: 'Mean = (12+15+18+21+24)/5 = 90/5 = 18 kg',
                  options: ['Mean = (12+15+18+21+24)/5 = 90/5 = 18 kg', 'middle number', 'the balancing property means there are an equal number of points on each side'],
                  hint: 'Review signed deviations: practice finding the difference between each data point and the mean.',
                  misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property.' },
                { id: 'c', prompt: 'A data set has four values: 5, 9, 13, and one unknown \\(x\\). The mean of the set is 10.', answer: 'The known values: 5 (dev -5), 9 (dev -1), 13 (dev +3)',
                  options: ['The known values: 5 (dev -5), 9 (dev -1), 13 (dev +3)', 'x is less than 10', 'middle number', 'the balancing property means there are an equal number of points on each side'],
                  hint: 'Review signed deviations: practice finding the difference between each data point and the mean.',
                  misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property.' }
          ],
            remediations: { 'the-mean-is-simply-the': { steps: ['If a student confuses counting with summing distances, guide them through a concrete physical model: use a ruler as.', 'The balance point is the mean.', 'Have them measure the distance of each coin from the balance point and multiply by the number of coins (all 1 here).', 'They will see that the total "moment" on each side is equal.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the data set 4, 7, 10, 13, the mean is 8.5. The distances below the mean are 4.5 and 1.5; above are 1.5 and 4.5.', answer: 'The student is correct',
                  options: ['The student is correct', 'middle number', 'the balancing property means there are an equal number of points on each side'],
                  hint: 'Review signed deviations: practice finding the difference between each data point and the mean.',
                  misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property.' },
                { id: 'b', prompt: 'Create a data set of five whole numbers between 1 and 20 (inclusive) such that the mean is 12 and the balancing property is satisfied.', answer: 'Example: 8, 10, 12, 14, 16',
                  options: ['Example: 8, 10, 12, 14, 16', 'middle number', 'the balancing property means there are an equal number of points on each side'],
                  hint: 'Review signed deviations: practice finding the difference between each data point and the mean.',
                  misconception: 'Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property.' }
          ],
            remediations: { 'the-mean-is-simply-the': { steps: ['If a student confuses counting with summing distances, guide them through a concrete physical model: use a ruler as.', 'The balance point is the mean.', 'Have them measure the distance of each coin from the balance point and multiply by the number of coins (all 1 here).', 'They will see that the total "moment" on each side is equal.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_10', difficulty: 'standard',
          question: 'The choice of the best measure of central tendency (mean, median, or mode).',
          hint: 'Revisit c8_math_ch12_2 (Visualising Mean Using Dot Plots) and c8_math_ch12_8 (Median.',
          misconception: 'Students believe the mean is always the "best" average because it is the most commonly used and uses all data points.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason for choosing the median over the mean when a data set has extreme outliers?', answer: 'The median is resistant to outliers',
                  options: ['The median is resistant to outliers', 'median is easier to calculate'],
                  hint: 'Revisit c8_math_ch12_2 (Visualising Mean Using Dot Plots) and c8_math_ch12_8 (Median vs Mean: When.',
                  misconception: 'Students believe the mean is always the "best" average because it is the most commonly used and uses all data points.' }
          ],
            remediations: { 'the-mean-is-always-the': { steps: ['If a student automatically computes the mean for every data set: 1) Give them a dot plot with a clear outlier (e.g.', '2) Ask: "Where are most dots clustered?" (75–82).', '3) Ask: "Does the mean (67) sit in that cluster?" No.', '4) Ask: "Where does the median (78) sit?" In the cluster.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_11', difficulty: 'standard',
          question: 'Range is the difference between the maximum and minimum values in a data set.',
          hint: 'If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017.',
          misconception: 'Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3.',
          parts: [
                { id: 'a', prompt: 'What is the range of the data set: 12, 7, 19, 5, 14, 22, 9?', answer: 'Correct answer: 17 (22 − 5 = 17)',
                  options: ['Correct answer: 17 (22 − 5 = 17)', 'number of values'],
                  hint: 'If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017.',
                  misconception: 'Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are.' },
                { id: 'b', prompt: 'Two classes took a math test. Class A has a range of 15 marks. Class B has a range of 40 marks. Both classes have the same mean score of 65.', answer: 'Correct answer: Class A has more consistent performance',
                  options: ['Correct answer: Class A has more consistent performance', 'number of values', 'larger range means more consistency'],
                  hint: 'If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017.',
                  misconception: 'Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are.' },
                { id: 'c', prompt: 'The daily high temperatures (in °C) in Delhi for a week were: 32, 35, 30, 28, 34, 36, 31. Find the range.', answer: 'Correct answer: Original range = 36 − 28 = 8°C',
                  options: ['Correct answer: Original range = 36 − 28 = 8°C', 'range decreases', 'number of values', 'keeps range as 8°C reveals the student did not update the maximum'],
                  hint: 'If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017.',
                  misconception: 'Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are.' },
                { id: 'd', prompt: 'Consider three data sets with the same mean (50) and same range (20): Set X: 40, 45, 50, 55, 60 Set Y: 40, 40, 50, 60, 60 Set Z: 40, 40, 40, 60, 60, 60 All.', answer: 'Correct answer: No, they do not have the same spread',
                  options: ['Correct answer: No, they do not have the same spread', 'yes, same range means same spread', 'number of values', 'range captures the full distribution shape'],
                  hint: 'If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017.',
                  misconception: 'Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are.' }
          ],
            remediations: { 'students-often-confuse-range-with': { steps: ['If a student confuses range with count: Have them physically plot the numbers on a number line.', 'Ask: "How far apart are the leftmost and rightmost dots?" Count the jumps, not the dots.', 'If they use mean/median: Give two data sets with same mean but different ranges (like the cricket example).', 'Ask: "If both have same average, why do they feel different?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_12', difficulty: 'standard',
          question: 'A line plot (dot plot) displays individual data points as dots or X marks above.',
          hint: 'Revisit frequency table construction (c7_math_ch13_002) and bar graph drawing.',
          misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A line plot (dot plot) displays individual data points as dots or X marks above a number',
                  options: ['A line plot (dot plot) displays individual data points as dots or X marks above a number', 'The mean of a data set is the unique value where the sum of the signed deviations of all', 'The choice of the best measure of central tendency (mean, median, or mode) depends on the', 'Range is the difference between the maximum and minimum values in a data set'],
                  hint: 'Revisit frequency table construction (c7_math_ch13_002) and bar graph drawing (c6_math_ch09_098).',
                  misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal axis as time.' }
          ],
            remediations: { 'students-confuse-line-plots-dot': { steps: ['Show side-by-side: a line plot (dots only) vs line graph (connected points over time).', 'Emphasize: "Line plots stack dots; line graphs connect points." 2.', 'Give a data set of 60 values; ask student to make a line plot.', 'When dots become unreadable, introduce grouped frequency and histogram.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_2', difficulty: 'standard',
          question: 'A dot plot displays each data value as a dot above a number line; the mean.',
          hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data.',
          misconception: 'Students think the mean is always one of the data values or the value with the most dots.',
          parts: [
                { id: 'a', prompt: 'What does each dot represent in a dot plot, and how is the mean visually identified as a balancing point?', answer: 'Each dot represents one occurrence of a data value',
                  options: ['Each dot represents one occurrence of a data value', 'the dot in the middle', 'the highest dot', 'balancing'],
                  hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data with.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' },
                { id: 'b', prompt: 'Explain why the sum of distances from the mean to data points on the left must equal the sum of distances on the right, using the definition of mean as (sum.', answer: 'Let the mean be m',
                  options: ['Let the mean be m', 'it balances', 'balancing', 'the mean is always one of the data values or the value with the most dots'],
                  hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data with.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' },
                { id: 'c', prompt: 'The dot plot shows scores: 8, 9, 9, 10, 11, 11, 11, 12. Find the mean by the balancing method. Show the distances you compare.', answer: 'Step 1: List values with frequencies: 8(1), 9(2), 10(1), 11(3), 12(1)',
                  options: ['Step 1: List values with frequencies: 8(1), 9(2), 10(1), 11(3), 12(1)', 'balancing', 'the mean must be a data value or the middle value', 'the mean is always one of the data values or the value with the most dots'],
                  hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data with.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' },
                { id: 'd', prompt: 'Two dot plots have the same mean but different spreads. Plot A: 5,5,5,15,15,15. Plot B: 9,10,10,10,10,11. Both have mean 10.', answer: 'Plot A distances: |5-10|=5 three times → 15',
                  options: ['Plot A distances: |5-10|=5 three times → 15', 'balancing', 'the mean is always one of the data values or the value with the most dots'],
                  hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data with.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' }
          ],
            remediations: { 'the-mean-is-always-one': { steps: ['If a student insists the mean is the mode, have them physically balance a ruler with coins at each data point on.', 'Move the fulcrum until it balances; the balance point is the mean.', 'Then calculate the arithmetic mean to confirm.', 'Emphasize: "Balancing uses distances, not counts.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_3', difficulty: 'standard',
          question: 'When a new value is added to a data set, the new mean equals the old mean plus.',
          hint: 'Revisit c8_math_ch12_1 (Mean as a Balancing Point) and practice finding deviations from.',
          misconception: 'Students often divide the deviation by the old number of values instead of the new number of values.',
          parts: [
                { id: 'a', prompt: 'The mean of 8 numbers is 15. One number, 10, is removed. Will the new mean be greater than, less than, or equal to 15? Explain why without calculating.', answer: 'The new mean will be greater than 15',
                  options: ['The new mean will be greater than 15', 'removing any value lowers the mean or does not grasp the balancing point concept'],
                  hint: 'Revisit c8_math_ch12_1 (Mean as a Balancing Point) and practice finding deviations from the mean.',
                  misconception: 'Students often divide the deviation by the old number of values instead of the new number of values.' }
          ],
            remediations: { 'students-often-divide-the-deviation': { steps: ['If a student divides by the old count, first ask: "After adding the new value, how many values are there now?" Have.', 'Then say: "The total deviation is shared equally among all current values.', 'So we must divide by the current number of values." Practice with a dot plot: show the deviation as a length, then cut.', 'Repeat with 3-4 examples until they automatically write the new count.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
