import type { SimDef } from '../../engine/types';
import C6_MathematicsCollectionOrganisationDataSim from '../../../simulations/c6_12/C6_MathematicsCollectionOrganisationDataSim';

/** v3 wrapped master — C6_MathematicsCollectionOrganisationDataSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicscollectionorganisationdatasim: SimDef = {
    id: 'v3w_c6_mathematicscollectionorganisationdatasim',
    title: 'Collection Organisation Data',
    subtitle: 'This node covers the definition of data, collection methods, tally marks, frequency.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Data',
    chapters: [],
    nodeIds: ['c6_math_ch09_095', 'c6_math_ch09_096', 'c6_math_ch09_102', 'c6_math_ch09_104'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you want to find out the favourite fruit of everyone in your class.', goal: 'Master Collection Organisation Data.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Data is a collection of facts, numbers,.', text: 'Data is a collection of facts, numbers, measures, or observations that provide information about a specific topic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch09_095', title: 'Data is a collection of facts, numbers,.',
          scaffold: { problem: 'You record the following favourite subjects for 15 students: Math, Science, Math, English, Math, Science, English, Math, Science, Math,.',
            steps: [
            { text: 'Identify categories: Math, Science, English.' },
            { text: 'Tally each entry one by one: Math (|||||), Science (||||), English (||||).' },
            { text: 'Count the tallies: Math=6, Science=5, English=4.' },
            { text: 'Verify total: 6 + 5 + 4 = 15. The sum matches the number of students.', faded: true, blankAnswer: 'Math: 6, Science: 5, English: 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_096', title: 'Data handling is the process of.',
          scaffold: { problem: 'A shopkeeper sells 15 notebooks: 5 Red, 3 Blue, 4 Green, 3 Red. Organize this into a frequency table.',
            steps: [
            { text: 'List the unique colors (Red, Blue, Green).' },
            { text: 'Tally the data: Red (5+3=8), Blue (3), Green (4).' },
            { text: 'Draw the table columns: "Notebook Color", "Tally Marks", "Frequency".' },
            { text: 'Fill in the tallies: Red (`||||| |||`), Blue (`|||`), Green (`||||`).' },
            { text: 'Total the frequency: 8 + 3 + 4 = 15.', faded: true, blankAnswer: 'Red: 8, Blue: 3, Green: 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_102', title: 'The mode is the value in a data set.',
          scaffold: { problem: 'A shopkeeper sold different kg of rice over 7 days: 5kg, 8kg, 5kg, 3kg, 5kg, 8kg, 2kg. What is the mode of the rice sales?',
            steps: [
            { text: 'List all unique values (2, 3, 5, 8).' },
            { text: 'Count the frequency of each (2: once, 3: once, 5: three times, 8: twice).' },
            { text: 'Compare frequencies (3 is the highest frequency).' },
            { text: 'Identify the value corresponding to the highest frequency (5).' },
            { text: 'Verify that no other number appears 3 or more times.', faded: true, blankAnswer: '5 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_104', title: 'Data handling is the process of.',
          scaffold: { problem: 'A shopkeeper sold the following number of pens in a week: Monday (20), Tuesday (35), Wednesday (25), Thursday (30), Friday (40).',
            steps: [
            { text: 'List the frequencies: Mon=20, Tue=35, Wed=25, Thu=30, Fri=40.' },
            { text: 'Divide each frequency by the scale (5) to find the bar heights: Mon=4, Tue=7, Wed=5, Thu=6, Fri=8.' },
            { text: 'Draw a vertical axis representing the number of units (1 to 8) and a horizontal axis for the days.' },
            { text: 'Draw bars for each day at the calculated heights with equal widths and gaps.', faded: true, blankAnswer: 'A bar graph with bars of heights 4, 7, 5, 6, and 8 units.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch09_096', title: 'Identify each idea',
          dissect: { specimen: 'Collection Organisation Data', spots: [
            { id: 's1', label: 'Data is a collection of', prompt: 'Which idea is this? — Data is a collection of facts, numbers, measures, or observations that provide.', answer: 'Data is a collection of', options: ['Data is a collection of', 'Data handling is the process', 'The mode is the value'] },
            { id: 's2', label: 'Data handling is the process', prompt: 'Which idea is this? — Data handling is the process of collecting, organizing, and summarizing raw information.', answer: 'Data handling is the process', options: ['Data handling is the process', 'Data is a collection of', 'The mode is the value'] },
            { id: 's3', label: 'The mode is the value', prompt: 'Which idea is this? — The mode is the value in a data set that appears the most often.', answer: 'The mode is the value', options: ['The mode is the value', 'Data is a collection of', 'Data handling is the process'] }
          ] } }
    ],
    explore: { component: C6_MathematicsCollectionOrganisationDataSim, prompt: 'Explore the interactive — Collection Organisation Data' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch09_095', difficulty: 'standard',
          question: 'Data is a collection of facts, numbers, measures, or observations that provide.',
          hint: 'Review basic addition and the concept of counting by groups.',
          misconception: 'Students often fail to "group" tally marks correctly. When they reach 5, they often continue drawing vertical lines.',
          parts: [
                { id: 'a', prompt: 'What is the specific name for the count of how many times a particular value appears in a collection of data?', answer: 'The name is "Frequency."',
                  options: ['The name is "Frequency."', 'Frequency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often fail to "group" tally marks correctly. When they reach 5, they often continue drawing vertical lines (`|||||`) instead of.' }
          ],
            remediations: { 'students-often-fail-to-group': { steps: ['If a student struggles with tallying, ask them to count a pile of 10 pencils by grouping them into bundles of 5.', 'Show them that it is much faster to count "two groups of 5" than to count "1, 2, 3, 4, 5, 6, 7, 8, 9, 10." Demonstrate.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_096', difficulty: 'standard',
          question: 'Data handling is the process of collecting, organizing, and summarizing raw.',
          hint: 'Review basic addition and the concept of counting in groups (multiples of 5).',
          misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Data handling is the process of collecting, organizing, and summarizing raw information',
                  options: ['Data handling is the process of collecting, organizing, and summarizing raw information', 'Data is a collection of facts, numbers, measures, or observations that provide', 'The mode is the value in a data set that appears the most often', 'Data handling is the process of collecting, organizing, and displaying raw information as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).' }
          ],
            remediations: { 'students-often-skip-the-diagonal': { steps: ['Show the student a table with `|||||` and another with `|||||` (with the diagonal).', 'Ask them which is faster to count.', 'Explain that the diagonal line is a "shortcut" for our eyes to recognize a group of five instantly without counting.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_096', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).',
          parts: [
                { id: 'a', prompt: 'If two different categories in your table have the same frequency, can you still decide which one is "most popular"?', answer: 'No, if frequencies are equal, they are tied for the most popular',
                  options: ['No, if frequencies are equal, they are tied for the most popular', 'there must always be a single winner, ignoring the possibility of a tie'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).' }
          ],
            remediations: { 'students-often-skip-the-diagonal': { steps: ['Show the student a table with `|||||` and another with `|||||` (with the diagonal).', 'Ask them which is faster to count.', 'Explain that the diagonal line is a "shortcut" for our eyes to recognize a group of five instantly without counting.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_102', difficulty: 'standard',
          question: 'The mode is the value in a data set that appears the most often.',
          hint: 'Review the chapter on tally marks and frequency tables.',
          misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.',
          parts: [
                { id: 'a', prompt: 'What is the definition of the mode in a data set?', answer: 'The mode is the value that occurs with the highest frequency in a data set',
                  options: ['The mode is the value that occurs with the highest frequency in a data set', 'the average'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.' },
                { id: 'b', prompt: 'If a list of shoe sizes is 4, 5, 5, 6, 6, 6, 7, why is 6 the mode?', answer: '6 is the mode because it appears 3 times',
                  options: ['6 is the mode because it appears 3 times', 'because it is in the middle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.' }
          ],
            remediations: { 'students-often-choose-the-highest': { steps: ['If a student picks the largest number, ask them to count how many times each number appears in the list.', 'Have them write a frequency table with two columns: "Number" and "How many times it appears." Once the table is.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_104', difficulty: 'standard',
          question: 'Data handling is the process of collecting, organizing, and displaying raw.',
          hint: 'Review simple tally counting and frequency tables.',
          misconception: 'Students often confuse the "scale" with the "frequency." They might think that if a pictograph key says "1 image = 5.',
          parts: [
                { id: 'a', prompt: 'If a pictograph uses a symbol of a star to represent 10 books, what does "half a star" represent?', answer: 'Half a star represents 5 books',
                  options: ['Half a star represents 5 books', 'They might think that if a pictograph key says'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "scale" with the "frequency." They might think that if a pictograph key says "1 image = 5 units," then the.' }
          ],
            remediations: { 'students-often-confuse-the-scale': { steps: ['If a student draws too many symbols, ask them: "If each symbol is a \'bundle\' of 5, how many bundles do you need to.', 'Remind them that the symbol is a placeholder for a group, not a single unit.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
