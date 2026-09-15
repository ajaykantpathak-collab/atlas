import type { SimDef } from '../../engine/types';
import C8_MathematicsTalesByDotsAndLinesSim from '../../../simulations/c6_12/C8_MathematicsTalesByDotsAndLinesSim';

/** v3 wrapped master — C8_MathematicsTalesByDotsAndLinesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicstalesbydotsandlinessim: SimDef = {
    id: 'v3w_c8_mathematicstalesbydotsandlinessim',
    title: 'Tales By Dots And Lines',
    subtitle: 'Covers construction and interpretation of line plots (for small to moderate discrete data.',
    classLevel: 8, subject: 'mathematics', topic: 'Line Plots and Bar Graphs for Data Representation',
    chapters: [],
    nodeIds: ['c8_math_ch12_12', 'c8_math_ch12_2'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine your Class 8 teacher asks: "How many hours did each student spend on homework last week?" You collect.', goal: 'Master Tales By Dots And Lines.' },
    discovery: {
        question: 'What does each dot represent in a dot plot, and how is the mean visually identified as a balancing point?',
        options: ['Each dot represents one occurrence of a data value', 'the dot in the middle', 'the highest dot'],
        answer: 'Each dot represents one occurrence of a data value',
        hook: 'Students think the mean is always one of the data values or the value with the most dots.',
    },
    teaching: [
        { title: 'A line plot (dot plot) displays individual.', text: 'A line plot (dot plot) displays individual data points as dots or X marks above a number line, showing the frequency of each value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch12_12', title: 'A line plot (dot plot) displays.',
          scaffold: { problem: 'A Class 8 teacher records the number of hours 20 students spent on a science project: 3, 5, 2, 4, 6, 3, 4, 5, 3, 2, 4, 5, 6, 3, 4, 2, 5, 4,.',
            steps: [
            { text: 'Organize raw data into a frequency table. Values range from 2 to 6.' },
            { text: 'For the line plot, draw a horizontal number line from 2 to 6. Above each value, place one dot per student: 2: ●●●, 3:.' },
            { text: 'For the bar graph, draw vertical axis (Frequency 0-5) and horizontal axis (Hours 2-6).' },
            { text: 'From line plot, mode is visible as tallest stacks: 3 and 5 hours (both 5 dots).' },
            { text: 'From bar graph, mode is tallest bars: 3 and 5 hours. Range = 6 - 2 = 4 hours.', faded: true, blankAnswer: 'Line plot and bar graph constructed as described. Mode = 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch12_2', title: 'A dot plot displays each data value as.',
          scaffold: { problem: 'The number of books read by 7 students in a month are: 3, 5, 4, 6, 4, 5, 7. Draw a dot plot and find the mean by balancing distances.',
            steps: [
            { text: 'Draw a number line from 3 to 7. Place dots: one at 3, two at 4, two at 5, one at 6, one at 7.' },
            { text: 'Guess the balance point. Try 5. Distances left: (5-3)=2, (5-4)=1 twice → total 4.' },
            { text: 'Adjust guess to 4.857? Better to compute arithmetic mean first: sum = 3+4+4+5+5+6+7 = 34, n=7, mean = 34/7 ≈ 4.857.' },
            { text: 'Check balance at 34/7. Left distances: (34/7 - 3) = 13/7 ≈ 1.857; (34/7 - 4) = 6/7 twice → 12/7 ≈ 1.714; total left =.' },
            { text: 'Mean = 34/7 ≈ 4.86 books. The visual balance matches the arithmetic mean.', faded: true, blankAnswer: 'Mean = 34/7 ≈ 4.86 books.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch12_2', title: 'Identify each idea',
          dissect: { specimen: 'Tales By Dots And Lines', spots: [
            { id: 's1', label: 'A line plot dot plot', prompt: 'Which idea is this? — A line plot (dot plot) displays individual data points as dots or X marks above a number.', answer: 'A line plot dot plot', options: ['A line plot dot plot', 'A dot plot displays each'] },
            { id: 's2', label: 'A dot plot displays each', prompt: 'Which idea is this? — A dot plot displays each data value as a dot above a number line; the mean is the balance.', answer: 'A dot plot displays each', options: ['A dot plot displays each', 'A line plot dot plot'] }
          ] } }
    ],
    explore: { component: C8_MathematicsTalesByDotsAndLinesSim, prompt: 'Explore the interactive — Tales By Dots And Lines' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch12_2', difficulty: 'standard',
          question: 'A dot plot displays each data value as a dot above a number line; the mean is.',
          hint: 'Review c6_math_ch09_100 for mean calculation and c6_math_ch09_097 for representing data.',
          misconception: 'Students think the mean is always one of the data values or the value with the most dots.',
          parts: [
                { id: 'a', prompt: 'What does each dot represent in a dot plot, and how is the mean visually identified as a balancing point?', answer: 'Each dot represents one occurrence of a data value',
                  options: ['Each dot represents one occurrence of a data value', 'the dot in the middle', 'the highest dot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' },
                { id: 'b', prompt: 'Explain why the sum of distances from the mean to data points on the left must equal the sum of distances on the right, using the definition of mean as (sum of.', answer: 'Let the mean be m',
                  options: ['Let the mean be m', 'it balances', 'balancing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' },
                { id: 'c', prompt: 'The dot plot shows scores: 8, 9, 9, 10, 11, 11, 11, 12. Find the mean by the balancing method. Show the distances you compare.', answer: 'Step 1: List values with frequencies: 8(1), 9(2), 10(1), 11(3), 12(1)',
                  options: ['Step 1: List values with frequencies: 8(1), 9(2), 10(1), 11(3), 12(1)', 'balancing', 'the mean must be a data value or the middle value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' }
          ],
            remediations: { 'the-mean-is-always-one': { steps: ['If a student insists the mean is the mode, have them physically balance a ruler with coins at each data point on a.', 'Move the fulcrum until it balances; the balance point is the mean.', 'Then calculate the arithmetic mean to confirm.', 'Emphasize: "Balancing uses distances, not counts.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch12_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the mean is always one of the data values or the value with the most dots.',
          parts: [
                { id: 'a', prompt: 'Create a data set of 6 whole numbers between 0 and 20 whose dot plot has a mean of 12 but no dot at 12.', answer: 'Example: 8, 10, 11, 13, 14, 16',
                  options: ['Example: 8, 10, 11, 13, 14, 16', 'balancing', 'the mean is always one of the data values or the value with the most dots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the mean is always one of the data values or the value with the most dots.' }
          ],
            remediations: { 'the-mean-is-always-one': { steps: ['If a student insists the mean is the mode, have them physically balance a ruler with coins at each data point on a.', 'Move the fulcrum until it balances; the balance point is the mean.', 'Then calculate the arithmetic mean to confirm.', 'Emphasize: "Balancing uses distances, not counts.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
