import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch12_p2: SimDef = {
    id: 'v3_c8_math_ch12_p2',
    title: 'Tales by Dots and Lines · Part 2/2',
    subtitle: 'The mean is a seesaw, not a middle',
    classLevel: 8, subject: 'mathematics', topic: 'Tales by Dots and Lines · Part 2/2',
    chapters: ['c8_math_ch12'],
    nodeIds: ['c8_math_ch12_4', 'c8_math_ch12_5', 'c8_math_ch12_6', 'c8_math_ch12_7', 'c8_math_ch12_8', 'c8_math_ch12_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data-balancing acrobat', intro: 'Picture every data point as a kid on a seesaw. There\'s exactly one spot to place the pivot so nobody tips — and once you find it, you can even recover a missing kid\'s weight.', goal: 'Understand the mean as the balancing point of a data set — where signed deviations sum to zero — and use that property to find missing values.' },
    discovery: {
        question: 'Five friends hold 2, 4, 6, 8, 10 marbles. The mean is 6 — but what makes 6 THE balancing point and not, say, 5 or 7?',
        options: ['At the mean, the total shortfall below it exactly cancels the total excess above it — the signed distances always sum to zero', 'Because 6 is the middle number in the list', 'Because 6 is the most common value', 'Because the teacher said so'],
        answer: 'At the mean, the total shortfall below it exactly cancels the total excess above it — the signed distances always sum to zero',
        hook: 'The mean isn\'t the \'middle number\' — it\'s a seesaw pivot. For 2, 4, 6, 10, 18 the mean is 8 even though more points sit below it than above: distance matters, not headcount. That\'s also how you can find a missing value from the mean alone.',
    },
    teaching: [
        { title: 'Unchanging Mean: Adding and Removing Values Strategically', text: 'The mean of a data set remains unchanged when values are added or removed if and only if the sum of the added values equals the product of the original mean and the number of added values, or the sum.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch12_4', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Test the seesaw: take a data set, compute the mean, then add up the distances below and above it until they match. Then work backwards — given the mean is 10 for 5, 9, 13 and a mystery x, pin down x without guessing.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_4', title: 'Unchanging Mean: Adding and Removing Values Strategically',
          scaffold: { problem: 'The average score of a class of 25 students in a Mathematics test is 68 marks. Two students were absent and took the test later.',
            steps: [
            { text: 'Identify given values. Original count n = 25, original mean M = 68. Number of added values k = 2. One added value = 58.' },
            { text: 'Use the condition for unchanged mean: Sum of added values = k × M. So, 58 + x = 2 × 68.' },
            { text: 'Compute the right side: 2 × 68 = 136.' },
            { text: 'Solve for x: 58 + x = 136 → x = 136 - 58 = 78.' },
            { text: 'Verify: Total original sum = 25 × 68 = 1700. New sum = 1700 + 58 + 78 = 1836. New count = 27.', faded: true, blankAnswer: '78 marks' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_5', title: 'Effect of Adding a Constant to Every Value on the Mean',
          scaffold: { problem: 'The mean weight of 7 boxes of mangoes is 18.4 kg. During packing, 0.6 kg of packaging material is added to each box.',
            steps: [
            { text: 'Identify the given information: original mean = 18.4 kg, number of boxes = 7, constant added to each box = 0.6 kg.' },
            { text: 'Recall the rule: when a constant \\(k\\) is added to every value, the new mean = original mean + \\(k\\).' },
            { text: 'Substitute the values: new mean = 18.4 + 0.6.' },
            { text: 'Compute: 18.4 + 0.6 = 19.0 kg.' },
            { text: 'Verify by full calculation: original total = 18.4 × 7 = 128.8 kg. Added total = 0.6 × 7 = 4.2 kg. New total = 133.0 kg.', faded: true, blankAnswer: '19.0 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_6', title: 'Effect of Multiplying Every Value by a Constant on the Mean',
          scaffold: { problem: 'A farmer records the milk production (in litres) of his 5 cows for a day: 8, 10, 12, 14, 16. The mean production is 12 litres.',
            steps: [
            { text: 'Identify the original mean. The problem states the mean production is 12 litres.' },
            { text: 'Identify the constant multiplier. To convert litres to millilitres, multiply by 1000. So \\( k = 1000 \\).' },
            { text: 'Apply the rule: new mean = original mean × constant multiplier.' },
            { text: 'Compute: new mean = 12 × 1000 = 12000.' },
            { text: 'State the answer with units. The new mean production is 12000 millilitres.', faded: true, blankAnswer: '12000 mL' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_7', title: 'Median: Definition and Finding Median from Data',
          scaffold: { problem: 'The daily wages (in rupees) of 7 workers at a construction site are: 350, 400, 380, 420, 360, 390, 410. Find the median wage.',
            steps: [
            { text: 'Write down the given data and identify n. Data: 350, 400, 380, 420, 360, 390, 410. n = 7 (odd).' },
            { text: 'Arrange the data in ascending order. 350, 360, 380, 390, 400, 410, 420.' },
            { text: 'Find the middle position using formula \\(\\frac{n+1}{2}\\). Position = \\(\\frac{7+1}{2} = 4\\).' },
            { text: 'Identify the value at the 4th position in the ordered list. The 4th value is 390.' },
            { text: 'State the median with units. Median wage = ₹390.', faded: true, blankAnswer: '₹390' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_8', title: 'Median vs Mean: When to Use Each Measure',
          scaffold: { problem: 'The daily sales (in ₹) of a small kirana store for 9 days are: 4200, 4500, 4300, 4400, 4600, 4350, 4450, 4550, 25000.',
            steps: [
            { text: 'Organize the data in ascending order: 4200, 4300, 4350, 4400, 4450, 4500, 4550, 4600, 25000.' },
            { text: 'Calculate the mean: Sum = 4200+4300+4350+4400+4450+4500+4550+4600+25000 = 60350. Mean = 60350 / 9 = ₹6705.56.' },
            { text: 'Calculate the median: n=9 (odd), so median is the 5th value in ordered list = ₹4450.' },
            { text: 'Compare with data context: 8 out of 9 days have sales between ₹4200-₹4600. The ₹25000 is a festival day outlier.' },
            { text: 'Conclusion: Use median (₹4450) as the typical daily sales because the data is right-skewed with a high outlier.', faded: true, blankAnswer: 'Median = ₹4450 is the appropriate measure; mean = ₹6705.56.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_9', title: 'Mode: Definition and Finding Mode from Data',
          scaffold: { problem: 'A survey of 25 Class 8 students asked: "How many hours do you spend on homework each week?" The responses (in hours) are: 5, 7, 6, 8, 5, 6.',
            steps: [
            { text: 'List the data values and count frequency of each: 5 appears 8 times, 6 appears 7 times, 7 appears 6 times, 8 appears 3.' },
            { text: 'Identify the highest frequency: 8 (for value 5)' },
            { text: 'The mode is the value with highest frequency: 5 hours' },
            { text: 'Verify no other value has frequency 8 (no - next highest is 7)' },
            { text: 'Interpret: Most students (8 out of 25) spend 5 hours/week on homework; this is the most common homework time', faded: true, blankAnswer: 'Mode = 5 hours' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch12_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch12_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Five friends\' marble counts are 2, 4, 6, 8 and 10, with mean 6. Planning a redistribution game, a student argues the mean is \'just the middle number\' and any central number balances the group the same way.',
            decisions: [{ prompt: 'What makes the mean a true balance point?', options: [
                { text: 'Distances below and above it must cancel: 2 sits 4 below the mean and 4 sits 2 below (total 6 below); 8 sits 2 above and 10 sits 4 above (total 6 above). Only the mean makes the two sides equal; shift it and the balance breaks.', outcome: 'This uses the defining property — signed deviations from the mean always sum to zero — so \'6\' is provably the pivot, not merely \'the middle.\'' },
                { text: 'He is right — the mean is whichever number sits in the middle, so 4, 6 or 8 all balance equally well.', outcome: 'Try 4: the below-side is only 2 while the above-side sums to 14 — wildly unbalanced; centrality-by-position is not the balancing property.', reveals: 'mean-is-middle' },
                { text: 'The mean balances only when data is symmetric like this set; in general the deviations need not cancel.', outcome: 'The cancellation holds for every data set by definition of the mean — symmetry is not required, only that total below-distance equals total above-distance.', reveals: 'balance-needs-symmetry' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch12_9', title: 'You made it',
          caseStudy: { intro: 'The mean is where a data set balances: everything below pulls down exactly as hard as everything above pulls up. Sum of deviations = 0 — always, no exceptions.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch12_4', difficulty: 'standard',
          question: 'The mean of a data set remains unchanged when values are added or removed.',
          hint: 'If stuck, revisit c8_math_ch12_1 (balancing point/deviations) and c6_math_ch05_057.',
          misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed.',
          parts: [
                { id: 'a', prompt: 'A data set has mean 15. Two values are removed and the mean stays 15. One removed value is 10.', answer: 'The deviations of removed values from the mean must sum to zero',
                  options: ['The deviations of removed values from the mean must sum to zero', 'the other must be 15'],
                  hint: 'If stuck, revisit c8_math_ch12_1 (balancing point/deviations) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed value must equal the.' },
                { id: 'b', prompt: 'The mean of 6 numbers is 12. Two numbers are added and the mean remains 12. One added number is 8. Find the other added number.', answer: 'Original sum = 6 × 12 = 72',
                  options: ['Original sum = 6 × 12 = 72', 'the added numbers must each be the mean, ignoring that their sum must be 24'],
                  hint: 'If stuck, revisit c8_math_ch12_1 (balancing point/deviations) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed value must equal the.' },
                { id: 'c', prompt: 'A class of 20 students has average weight 45 kg. Two students leave and the average remains 45 kg. The weights of the two students are in the ratio 2:3.', answer: 'Sum of weights of two students = 2 × 45 = 90 kg',
                  options: ['Sum of weights of two students = 2 × 45 = 90 kg', 'each must equal the mean'],
                  hint: 'If stuck, revisit c8_math_ch12_1 (balancing point/deviations) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed value must equal the.' }
          ],
            remediations: { 'to-keep-the-mean-unchanged': { steps: ['Remediation: Use the "balance scale" model from c8_math_ch12_1.', 'Draw the mean as the fulcrum.', 'Show that adding a value 5 below the mean (deviation -5) requires adding another value 5 above (deviation +5) to keep.', 'Have the student physically place weights on a number line.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If the mean of a data set is 50, and I add three numbers whose average is 50, the mean will stay 50." Is this claim correct?', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'no, each must be 50'],
                  hint: 'If stuck, revisit c8_math_ch12_1 (balancing point/deviations) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students believe that to keep the mean unchanged, every added value must equal the original mean, and every removed value must equal the.' }
          ],
            remediations: { 'to-keep-the-mean-unchanged': { steps: ['Remediation: Use the "balance scale" model from c8_math_ch12_1.', 'Draw the mean as the fulcrum.', 'Show that adding a value 5 below the mean (deviation -5) requires adding another value 5 above (deviation +5) to keep.', 'Have the student physically place weights on a number line.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_5', difficulty: 'standard',
          question: 'When a constant value \\(k\\) is added to every observation in a data set, the.',
          hint: 'Review the algebraic derivation: \\(\\frac{(x_1+k)+(x_2+k)+\\dots+(x_n+k)}{n} = \\frac{\\sum.',
          misconception: 'Students often think the mean increases by \\(k \\times n\\) (constant times number of values) because they confuse the.',
          parts: [
                { id: 'a', prompt: 'A data set has mean 36. After adding a constant \\(k\\) to each value, the new mean is 53.', answer: 'The new mean is also 53',
                  options: ['The new mean is also 53', 'the shift depends on sample size'],
                  hint: 'Review the algebraic derivation: \\(\\frac{(x_1+k)+(x_2+k)+\\dots+(x_n+k)}{n} = \\frac{\\sum x_i.',
                  misconception: 'Students often think the mean increases by \\(k \\times n\\) (constant times number of values) because they confuse the change in the SUM.' }
          ],
            remediations: { 'the-mean-increases-by-k': { steps: ['Ask the student: "If the sum increases by 15 and there are 5 numbers, how much does the AVERAGE increase?" Guide them.', 'New mean = (old sum + 15)/5 = old sum/5 + 15/5 = old mean + 3.', 'Use a dot plot: draw 5 dots, mark the mean, slide each dot 3 right, show the balancing point moves 3 right.', 'Emphasise: "The mean is the sum DIVIDED by count.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_6', difficulty: 'standard',
          question: 'When every value in a data set is multiplied by a constant \\( k \\), the new.',
          hint: 'Review mean calculation from c7_math_ch13_004 and multiplication of decimals/fractions.',
          misconception: 'Students often treat multiplication by a constant as if it were addition: they add the constant to the mean instead.',
          parts: [
                { id: 'a', prompt: 'State the rule for how the mean changes when every value in a data set is multiplied by a constant \\( k \\).', answer: 'The new mean equals \\( k \\) times the original mean',
                  options: ['The new mean equals \\( k \\) times the original mean', 'the mean increases by \\( k \\)', 'the mean stays the same'],
                  hint: 'Review mean calculation from c7_math_ch13_004 and multiplication of decimals/fractions from.',
                  misconception: 'Students often treat multiplication by a constant as if it were addition: they add the constant to the mean instead of multiplying.' }
          ],
            remediations: { 'students-often-treat-multiplication-by': { steps: ['If a student adds the constant, remind them: "Adding a constant shifts the mean; multiplying a constant scales the mean.', 'Let\'s check with a tiny data set: values 2, 4, 6.', 'Multiply each by 3 → 6, 12, 18.', 'No, we multiplied by 3." Then have them write the algebraic proof: \\( \\frac{\\sum k x_i}{n} = k \\frac{\\sum x_i}{n} \\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_7', difficulty: 'standard',
          question: 'The median is the middle value of a data set when the values are arranged.',
          hint: 'If stuck, revisit c6_math_ch01_004 (Comparing and Ordering Numbers) and c7_math_ch03_007.',
          misconception: 'Students often forget to order the data before finding the middle position.',
          parts: [
                { id: 'a', prompt: 'A student says: "For the data 4, 7, 2, 9, the median is 5.5 because the middle two numbers are 4 and 7." Is the student correct? Explain why or why not.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'median depends on the original order, not the sorted order'],
                  hint: 'If stuck, revisit c6_math_ch01_004 (Comparing and Ordering Numbers) and c7_math_ch03_007 (Comparing.',
                  misconception: 'Students often forget to order the data before finding the middle position.' }
          ],
            remediations: { 'students-often-forget-to-order': { steps: ['Order.', 'Count n.', 'Find position(s).', 'Read value(s).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_8', difficulty: 'standard',
          question: 'The mean is the arithmetic average (sum of values divided by count) and is the.',
          hint: 'Review the balancing point model of mean (c8_math_ch12_1) and the positional definition.',
          misconception: 'Students believe the mean is always the "true" average because it uses every data point, and they treat the median as.',
          parts: [
                { id: 'a', prompt: 'State the one-word property that makes the median a better choice than the mean when a data set contains extreme outliers.', answer: 'Resistant (or resistance)',
                  options: ['Resistant (or resistance)', 'middle', 'position', 'mean > median'],
                  hint: 'Review the balancing point model of mean (c8_math_ch12_1) and the positional definition of median.',
                  misconception: 'Students believe the mean is always the "true" average because it uses every data point, and they treat the median as a fallback only when.' },
                { id: 'b', prompt: 'The monthly pocket money (in ₹) of 7 friends is: 200, 250, 250, 300, 300, 300, 2000.', answer: 'Mean = (200+250+250+300+300+300+2000)/7 = 3600/7 ≈ ₹514.29',
                  options: ['Mean = (200+250+250+300+300+300+2000)/7 = 3600/7 ≈ ₹514.29', 'mean > median', 'data is generally higher', 'right tail exists'],
                  hint: 'Review the balancing point model of mean (c8_math_ch12_1) and the positional definition of median.',
                  misconception: 'Students believe the mean is always the "true" average because it uses every data point, and they treat the median as a fallback only when.' },
                { id: 'c', prompt: 'Two data sets have the same median (50) but different means: Set A mean = 50, Set B mean = 65.', answer: 'Set A is roughly symmetric (mean ≈ median)',
                  options: ['Set A is roughly symmetric (mean ≈ median)', 'mean > median', 'data is generally higher', 'right tail exists'],
                  hint: 'Review the balancing point model of mean (c8_math_ch12_1) and the positional definition of median.',
                  misconception: 'Students believe the mean is always the "true" average because it uses every data point, and they treat the median as a fallback only when.' }
          ],
            remediations: { 'the-mean-is-always-the': { steps: ['Have the student physically balance a ruler with coins: place 6 coins at the 30cm mark and 1 coin at the 90cm mark.', 'The balance point (mean) shifts toward 90cm, but the median coin is still at 30cm.', 'Ask: "If you want to know where most coins are, which measure helps?" 3.', 'Revisit the definition of median as the middle position, not a calculated average.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_9', difficulty: 'standard',
          question: 'The mode is the value that appears most frequently in a data set; a data set.',
          hint: 'Review c7_math_ch13_002 (frequency tables) and practice identifying the value.',
          misconception: 'Students confuse "mode" with "frequency" - they state the frequency count (e.g., "12") as the mode instead of the data.',
          parts: [
                { id: 'a', prompt: 'A survey of 20 students\' favourite fruits gives: Apple, Banana, Mango, Apple, Guava, Mango, Apple, Banana, Mango, Apple, Orange, Mango, Apple, Banana, Mango.', answer: 'The mode is Apple (appears 6 times)',
                  options: ['The mode is Apple (appears 6 times)', '- they state the frequency count (e.g', ') as the mode instead of the data value (e.g'],
                  hint: 'Review c7_math_ch13_002 (frequency tables) and practice identifying the value corresponding to the.',
                  misconception: 'Students confuse "mode" with "frequency" - they state the frequency count (e.g., "12") as the mode instead of the data value (e.g., "2.' },
                { id: 'b', prompt: 'Rahul says: "The mode of the data set 12, 15, 12, 18, 15, 12, 18, 15 is 12 because it appears first in the list." Is Rahul correct? Explain why or why not.', answer: 'Rahul is incorrect',
                  options: ['Rahul is incorrect', '- they state the frequency count (e.g', ') as the mode instead of the data value (e.g'],
                  hint: 'Review c7_math_ch13_002 (frequency tables) and practice identifying the value corresponding to the.',
                  misconception: 'Students confuse "mode" with "frequency" - they state the frequency count (e.g., "12") as the mode instead of the data value (e.g., "2.' },
                { id: 'c', prompt: 'The frequency table shows the number of books read by students in a month: | Books read | 0 | 1 | 2 | 3 | 4 | 5 | |------------|---|---|---|---|---|---| |.', answer: 'The mode is 2 books (12 students read 2 books)',
                  options: ['The mode is 2 books (12 students read 2 books)', '(median) reveals confusion between mode and median', '- they state the frequency count (e.g', ') as the mode instead of the data value (e.g'],
                  hint: 'Review c7_math_ch13_002 (frequency tables) and practice identifying the value corresponding to the.',
                  misconception: 'Students confuse "mode" with "frequency" - they state the frequency count (e.g., "12") as the mode instead of the data value (e.g., "2.' },
                { id: 'd', prompt: 'Two data sets have the same mode but different means. Data Set A: 4, 4, 4, 10, 20. Data Set B: 4, 4, 4, 5, 6. Both have mode 4.', answer: 'Set A mean = (4+4+4+10+20)/5 = 42/5 = 8.4',
                  options: ['Set A mean = (4+4+4+10+20)/5 = 42/5 = 8.4', 'both have same centre', '- they state the frequency count (e.g', ') as the mode instead of the data value (e.g'],
                  hint: 'Review c7_math_ch13_002 (frequency tables) and practice identifying the value corresponding to the.',
                  misconception: 'Students confuse "mode" with "frequency" - they state the frequency count (e.g., "12") as the mode instead of the data value (e.g., "2.' }
          ],
            remediations: { 'students-confuse-mode-with-frequency': { steps: ['First, have the student circle the frequency column and the value column in different colours.', 'Ask: "Which column shows WHAT we\'re measuring?', 'Which shows HOW MANY?" Then practice with a tiny data set: 3, 3, 5.', 'Ask "What appears most?" (3) "How many times?" (2).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
