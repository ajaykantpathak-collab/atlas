import type { SimDef } from '../../engine/types';
import C8_MathematicsIntroductionToGraphsSim from '../../../simulations/c6_12/C8_MathematicsIntroductionToGraphsSim';

/** v3 wrapped master — C8_MathematicsIntroductionToGraphsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsintroductiontographssim: SimDef = {
    id: 'v3w_c8_mathematicsintroductiontographssim',
    title: 'Proportional Relationships: Identifying Proportionality',
    subtitle: 'This node covers identifying proportionality from multiple representations (tables,.',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Relationships: Identifying Proportionality',
    chapters: [],
    nodeIds: ['c8_math_ch7_5', 'c8_math_ch7_8', 'c8_math_ch10_1', 'c8_math_ch10_8', 'c8_math_ch14_8', 'c8_math_ch12_12'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are buying mangoes at a fruit stall in Mumbai. The vendor sells them at ₹80 per kilogram.', goal: 'Master Proportional Relationships: Identifying Proportionality.' },
    discovery: {
        question: 'Explain why the equation \\(y = \\frac{k}{x}\\) represents inverse proportion, and describe what happens to \\(y\\) when \\(x\\) is doubled.',
        options: ['The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)', '\\(y\\) also doubles', 'it is direct proportion or does not understand the reciprocal relationship'],
        answer: 'The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)',
        hook: 'Students often write the equation as \\(y = kx\\) (direct proportion) instead of \\(y = k/x\\) or \\(xy = k\\).',
    },
    teaching: [
        { title: 'A proportional relationship exists between.', text: 'A proportional relationship exists between two quantities when their ratio remains constant across all pairs of corresponding values, meaning one quantity is a constant multiple of the other (y = kx,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch7_5', title: 'A proportional relationship exists.',
          scaffold: { problem: 'A tailor in Jaipur stitches shirts. The table shows the number of shirts stitched and the total metres of cloth used.',
            steps: [
            { text: 'Identify the two quantities: number of shirts (s) and metres of cloth (c). We need to check if c/s is constant.' },
            { text: 'Compute the ratio cloth/shirts for each row: 6/4 = 1.5, 10.5/7 = 1.5, 15/10 = 1.5, 19.5/13 = 1.5.' },
            { text: 'Observe that all ratios equal 1.5. Therefore, the relationship is proportional.' },
            { text: 'The constant of proportionality k = 1.5 metres per shirt. Write the equation: c = 1.5s.' },
            { text: 'Verify with a new value: for 20 shirts, cloth = 1.5 × 20 = 30 m. The ratio 30/20 = 1.5 holds.', faded: true, blankAnswer: 'Yes, proportional. Constant of proportionality = 1.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_8', title: 'Two quantities are in direct proportion.',
          scaffold: { problem: 'A car travels at a constant speed of 60 km/h. The distance travelled is directly proportional to the time taken.',
            steps: [
            { text: 'Identify the given pair to find the constant ratio. From the table, when time = 1 h, distance = 60 km.' },
            { text: 'Verify the constant with another pair. For time = 2 h, distance = 120 km: \\(\\frac{120}{2} = 60\\).' },
            { text: 'Write the algebraic relationship: Distance = 60 × Time, or \\(d = 60t\\).' },
            { text: 'Find missing values. For time = 5 h: \\(d = 60 \\times 5 = 300\\) km. For distance = 420 km: \\(t = \\frac{420}{60} = 7\\) h.' },
            { text: 'Complete the table and state the constant of proportionality with units: \\(k = 60\\) km/h.', faded: true, blankAnswer: 'Completed table: Time 5 h → 300 km; Distance 420 km → 7 h..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_1', title: 'The cross-multiplication method states.',
          scaffold: { problem: 'A recipe for 6 people requires 2.5 kg of flour. How many kilograms of flour are needed for 15 people?',
            steps: [
            { text: 'Identify the known ratio (people : flour) = 6 : 2.5. The unknown ratio is 15 : x.' },
            { text: 'Apply cross-multiplication: Multiply numerator of first fraction by denominator of second (6 × x) and denominator of.' },
            { text: 'Solve for x using inverse operations. Divide both sides by 6: x = 37.5 / 6.' },
            { text: 'Compute the division: 37.5 ÷ 6 = 6.25. (Check: 6 × 6 = 36, remainder 1.5; 1.5/6 = 0.25).' },
            { text: 'Interpret result: 6.25 kg of flour needed. Verify by checking ratios: 6/2.5 = 2.4 and 15/6.25 = 2.4. Equal, so correct.', faded: true, blankAnswer: '6.25 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_8', title: 'In inverse proportion, two quantities.',
          scaffold: { problem: 'A school has 20 classrooms each with 40 desks. If they rearrange to have 25 desks per classroom, how many classrooms will be needed?',
            steps: [
            { text: 'Identify the two quantities: number of classrooms (\\(c\\)) and desks per classroom (\\(d\\)).' },
            { text: 'Find the constant product \\(k = c \\times d = 20 \\times 40 = 800\\) desks.' },
            { text: 'Write the inverse proportion equation: \\(c \\times d = 800\\) or \\(c = \\frac{800}{d}\\).' },
            { text: 'Substitute the new desks per classroom \\(d = 25\\): \\(c = \\frac{800}{25} = 32\\).' },
            { text: 'Interpret: 32 classrooms are needed. Verify: \\(32 \\times 25 = 800\\) desks, matches total.', faded: true, blankAnswer: '32 classrooms' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_8', title: 'The area of an irregular shape can be.',
          scaffold: { problem: 'Riya traces a mango leaf on 1 cm graph paper for her biology project.',
            steps: [
            { text: 'Identify the given counts: Full (F) = 24, Half (H) = 10, More than half (M) = 6, Less than half (L) = 12 (ignored).' },
            { text: 'Recall the estimation formula: Area = F + 0.5H + M.' },
            { text: 'Substitute the values: Area = 24 + 0.5(10) + 6.' },
            { text: 'Compute stepwise: 0.5 × 10 = 5; then 24 + 5 = 29; then 29 + 6 = 35.' },
            { text: 'State the answer with units: The leaf\'s estimated area is 35 cm².', faded: true, blankAnswer: '35 cm²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_12', title: 'A line plot (dot plot) displays.',
          scaffold: { problem: 'A Class 8 teacher records the number of hours 20 students spent on a science project: 3, 5, 2, 4, 6, 3, 4, 5, 3, 2, 4, 5, 6, 3, 4, 2, 5, 4,.',
            steps: [
            { text: 'Organize raw data into a frequency table. Values range from 2 to 6.' },
            { text: 'For the line plot, draw a horizontal number line from 2 to 6. Above each value, place one dot per student: 2: ●●●, 3:.' },
            { text: 'For the bar graph, draw vertical axis (Frequency 0-5) and horizontal axis (Hours 2-6).' },
            { text: 'From line plot, mode is visible as tallest stacks: 3 and 5 hours (both 5 dots).' },
            { text: 'From bar graph, mode is tallest bars: 3 and 5 hours. Range = 6 - 2 = 4 hours.', faded: true, blankAnswer: 'Line plot and bar graph constructed as described. Mode = 3.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch7_8', title: 'Identify each idea',
          dissect: { specimen: 'Proportional Relationships: Identifying Proportionality', spots: [
            { id: 's1', label: 'A proportional relationship exists between', prompt: 'Which idea is this? — A proportional relationship exists between two quantities when their ratio remains.', answer: 'A proportional relationship exists between', options: ['A proportional relationship exists between', 'Two quantities are in direct', 'The cross-multiplication method states that', 'In inverse proportion two quantities'] },
            { id: 's2', label: 'Two quantities are in direct', prompt: 'Which idea is this? — Two quantities are in direct proportion if they increase or decrease together in such a.', answer: 'Two quantities are in direct', options: ['Two quantities are in direct', 'A proportional relationship exists between', 'The cross-multiplication method states that', 'In inverse proportion two quantities'] },
            { id: 's3', label: 'The cross-multiplication method states that', prompt: 'Which idea is this? — The cross-multiplication method states that if two ratios are equal (a proportion), the.', answer: 'The cross-multiplication method states that', options: ['The cross-multiplication method states that', 'A proportional relationship exists between', 'Two quantities are in direct', 'In inverse proportion two quantities'] },
            { id: 's4', label: 'In inverse proportion two quantities', prompt: 'Which idea is this? — In inverse proportion, two quantities vary such that their product remains constant: when.', answer: 'In inverse proportion two quantities', options: ['In inverse proportion two quantities', 'A proportional relationship exists between', 'Two quantities are in direct', 'The cross-multiplication method states that'] },
            { id: 's5', label: 'The area of an irregular', prompt: 'Which idea is this? — The area of an irregular shape can be estimated by placing it on a square grid and.', answer: 'The area of an irregular', options: ['The area of an irregular', 'A proportional relationship exists between', 'Two quantities are in direct', 'The cross-multiplication method states that'] },
            { id: 's6', label: 'A line plot dot plot', prompt: 'Which idea is this? — A line plot (dot plot) displays individual data points as dots or X marks above a number.', answer: 'A line plot dot plot', options: ['A line plot dot plot', 'A proportional relationship exists between', 'Two quantities are in direct', 'The cross-multiplication method states that'] }
          ] } }
    ],
    explore: { component: C8_MathematicsIntroductionToGraphsSim, prompt: 'Explore the interactive — Proportional Relationships: Identifying Proportionality' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch7_5', difficulty: 'standard',
          question: 'A proportional relationship exists between two quantities when their ratio.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and multiplicative vs additive change.',
          misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.',
          parts: [
                { id: 'a', prompt: 'A student claims that the relationship shown in the table below is proportional because "as x increases, y increases." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' },
                { id: 'b', prompt: 'Compare the two relationships below. Which one is proportional? Justify by analyzing the structure of each equation.', answer: 'Relationship B is proportional',
                  options: ['Relationship B is proportional', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' }
          ],
            remediations: { 'if-a-graph-is-a': { steps: ['Remediation: 1) Have the student compute y/x for at least three points from the table or graph of y = 5x + 10.', '2) Ask them to observe that the ratios are different.', '3) Guide them to see that the equation has an extra "+10" term, which adds a fixed amount regardless of x, breaking the.', '4) Contrast with y = 5x, where every ratio is 5.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.',
          parts: [
                { id: 'a', prompt: 'A classmate argues that the graph of a proportional relationship must be a straight line passing through the origin.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' },
                { id: 'b', prompt: 'Compare the two relationships below. Which one is proportional? Justify by analyzing the structure of each equation.', answer: 'Relationship B is proportional',
                  options: ['Relationship B is proportional', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' }
          ],
            remediations: { 'if-a-graph-is-a': { steps: ['Remediation: 1) Have the student compute y/x for at least three points from the table or graph of y = 5x + 10.', '2) Ask them to observe that the ratios are different.', '3) Guide them to see that the equation has an extra "+10" term, which adds a fixed amount regardless of x, breaking the.', '4) Contrast with y = 5x, where every ratio is 5.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_8', difficulty: 'standard',
          question: 'Two quantities are in direct proportion if they increase or decrease together.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and unitary method (c8_math_ch7_6) to practice.',
          misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.',
          parts: [
                { id: 'a', prompt: 'The table below shows values of \\(x\\) and \\(y\\). Explain why this relationship is NOT a direct proportion, even though both \\(x\\) and \\(y\\) increase.', answer: 'For direct proportion, \\(\\frac{y}{x}\\) must be constant',
                  options: ['For direct proportion, \\(\\frac{y}{x}\\) must be constant', 'it is direct proportion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.' }
          ],
            remediations: { 'if-two-quantities-both-increase': { steps: ['Ask the student to compute \\(\\frac{y}{x}\\) for every pair in the table and write the results in a new row.', 'Have them compare the values: "Are they all the same number?', 'If not, it\'s not direct proportion." 3.', 'Use a visual aid: plot the points on graph paper.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_1', difficulty: 'standard',
          question: 'The cross-multiplication method states that if two ratios are equal (a.',
          hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice.',
          misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cross-multiplication method states that if two ratios are equal (a proportion), the',
                  options: ['The cross-multiplication method states that if two ratios are equal (a proportion), the', 'A proportional relationship exists between two quantities when their ratio remains', 'Two quantities are in direct proportion if they increase or decrease together in such a', 'In inverse proportion, two quantities vary such that their product remains constant: when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead of cross-multiplying (a×d.' }
          ],
            remediations: { 'students-consistently-multiply-the-two': { steps: ['Draw the proportion as two fractions side by side.', 'Use a coloured pen to draw an X connecting numerator of first to denominator of second (extremes) and denominator of.', 'Say aloud: "Top-left times bottom-right equals bottom-left times top-right." 4.', 'Practice 5 problems where the unknown is in each of the four positions (top-left, bottom-left, top-right, bottom-right).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_8', difficulty: 'standard',
          question: 'In inverse proportion, two quantities vary such that their product remains.',
          hint: 'Review c8_math_ch10_7 (inverse proportion definition) and c7_math_ch15_003 (solving.',
          misconception: 'Students often write the equation as \\(y = kx\\) (direct proportion) instead of \\(y = k/x\\) or \\(xy = k\\).',
          parts: [
                { id: 'a', prompt: 'Explain why the equation \\(y = \\frac{k}{x}\\) represents inverse proportion, and describe what happens to \\(y\\) when \\(x\\) is doubled.', answer: 'The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)',
                  options: ['The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)', '\\(y\\) also doubles', 'it is direct proportion or does not understand the reciprocal relationship'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation as \\(y = kx\\) (direct proportion) instead of \\(y = k/x\\) or \\(xy = k\\).' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['Remediation: 1) Have the student physically model with counters: "6 workers × 10 days = 60 worker-days".', '2) Ask: "If we double workers to 12, what happens to days?', '3) Show the product stays 60.', '4) Contrast with direct proportion: "If 6 workers earn ₹600 in 10 days, what do 12 workers earn in 10 days?" (double,.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_8', difficulty: 'standard',
          question: 'The area of an irregular shape can be estimated by placing it on a square grid.',
          hint: 'Revisit c6_math_ch08_086 (Introduction to Area) and practice covering rectangles with.',
          misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.',
          parts: [
                { id: 'a', prompt: 'What is the standard convention for counting a square that is exactly half covered by an irregular shape on grid paper?', answer: 'A half-covered square counts as 0.5 square units',
                  options: ['A half-covered square counts as 0.5 square units', 'touching the boundary', 'covering area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.' },
                { id: 'b', prompt: 'On 1 cm grid paper, an irregular shape covers 18 full squares, 6 half squares, 7 squares more than half, and 9 squares less than half.', answer: 'Step 1: Full squares = 18 × 1 = 18 cm²',
                  options: ['Step 1: Full squares = 18 × 1 = 18 cm²', 'touching the boundary', 'covering area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.' }
          ],
            remediations: { 'students-count-every-square-that': { steps: ['Give the student a transparent 1 cm grid overlay and a rectangle of known area (e.g., 4 cm × 5 cm = 20 cm²).', 'Have them place the grid on the rectangle and count using the correct convention — they should get exactly 20.', 'Then place the same grid on an irregular shape and practice classifying each square aloud: "This is full, this is half,.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.',
          parts: [
                { id: 'a', prompt: 'A student traces a shape on 1 cm grid paper and counts: 12 full squares, 8 half squares, and 5 more-than-half squares.', answer: 'Incorrect',
                  options: ['Incorrect', 'touching the boundary', 'covering area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.' }
          ],
            remediations: { 'students-count-every-square-that': { steps: ['Give the student a transparent 1 cm grid overlay and a rectangle of known area (e.g., 4 cm × 5 cm = 20 cm²).', 'Have them place the grid on the rectangle and count using the correct convention — they should get exactly 20.', 'Then place the same grid on an irregular shape and practice classifying each square aloud: "This is full, this is half,.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_12', difficulty: 'standard',
          question: 'A line plot (dot plot) displays individual data points as dots or X marks above.',
          hint: 'Revisit frequency table construction (c7_math_ch13_002) and bar graph drawing.',
          misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A line plot (dot plot) displays individual data points as dots or X marks above a number',
                  options: ['A line plot (dot plot) displays individual data points as dots or X marks above a number', 'A proportional relationship exists between two quantities when their ratio remains', 'Two quantities are in direct proportion if they increase or decrease together in such a', 'The cross-multiplication method states that if two ratios are equal (a proportion), the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal axis as time.' }
          ],
            remediations: { 'students-confuse-line-plots-dot': { steps: ['Show side-by-side: a line plot (dots only) vs line graph (connected points over time).', 'Emphasize: "Line plots stack dots; line graphs connect points." 2.', 'Give a data set of 60 values; ask student to make a line plot.', 'When dots become unreadable, introduce grouped frequency and histogram.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_12', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal.',
          parts: [
                { id: 'a', prompt: 'A student draws a bar graph for "Favorite Cricket Players" with players on horizontal axis and number of votes on vertical axis. The bars touch each other.', answer: 'Error: Bars touch each other',
                  options: ['Error: Bars touch each other', 'touching bars look better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse line plots (dot plots) with line graphs: they connect the dots with lines, treating the horizontal axis as time.' }
          ],
            remediations: { 'students-confuse-line-plots-dot': { steps: ['Show side-by-side: a line plot (dots only) vs line graph (connected points over time).', 'Emphasize: "Line plots stack dots; line graphs connect points." 2.', 'Give a data set of 60 values; ask student to make a line plot.', 'When dots become unreadable, introduce grouped frequency and histogram.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
