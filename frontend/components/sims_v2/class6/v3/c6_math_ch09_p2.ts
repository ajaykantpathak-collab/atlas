import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch09_p2: SimDef = {
    id: 'v3_c6_math_ch09_p2',
    title: 'Data Handling · Part 2/2',
    subtitle: 'This node covers finding the median for simple numerical data sets with odd or even.',
    classLevel: 6, subject: 'mathematics', topic: 'Data Handling · Part 2/2',
    chapters: ['c6_math_ch09'],
    nodeIds: ['c6_math_ch09_101', 'c6_math_ch09_102', 'c6_math_ch09_103', 'c6_math_ch09_104'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you and your friends line up by height. To find the "middle" person, you naturally arrange yourselves.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You asked 40 classmates their favourite fruit and now hold a messy list of words. Why does grouping it into a tally table suddenly reveal the winner?',
        options: ['The table counts how often each answer appears, so the most popular choice is visible at a glance', 'Tables make handwriting neater, which reveals the answer', 'The tallest column always belongs to your favourite fruit', 'Grouping deletes the unpopular answers'],
        answer: 'The table counts how often each answer appears, so the most popular choice is visible at a glance',
        hook: 'Tally marks are the counting tool; frequency is the final count. And tallies bundle in fives — a diagonal stroke across four bars — so big counts can be read in one look.',
    },
    teaching: [
        { title: 'Median: Middle Value', text: 'The median is the middle value of a data set that has been arranged in order from smallest to largest (ascending order).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch09_101', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Run a real survey at the school gate — set categories, mark one tally per observation, bundle every five — then read the table to crown the most common choice.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_101', title: 'Median: Middle Value',
          scaffold: { problem: 'A teacher records the marks of 5 students in a math test: 15, 10, 20, 5, 25. What is the median mark?',
            steps: [
            { text: 'Identify the values given: 15, 10, 20, 5, 25. Total values (n) = 5.' },
            { text: 'Arrange the values in ascending order: 5, 10, 15, 20, 25.' },
            { text: 'Find the middle position. Since 5 is odd, the middle is the (5+1)/2 = 3rd position.' },
            { text: 'Identify the 3rd value in the sorted list, which is 15.' },
            { text: 'Verify that there are two values below 15 and two values above it.', faded: true, blankAnswer: '15 marks' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_102', title: 'Mode: Most Frequent Value',
          scaffold: { problem: 'A shopkeeper sold different kg of rice over 7 days: 5kg, 8kg, 5kg, 3kg, 5kg, 8kg, 2kg. What is the mode of the rice sales?',
            steps: [
            { text: 'List all unique values (2, 3, 5, 8).' },
            { text: 'Count the frequency of each (2: once, 3: once, 5: three times, 8: twice).' },
            { text: 'Compare frequencies (3 is the highest frequency).' },
            { text: 'Identify the value corresponding to the highest frequency (5).' },
            { text: 'Verify that no other number appears 3 or more times.', faded: true, blankAnswer: '5 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_103', title: 'Introduction to Probability',
          scaffold: { problem: 'A box contains 4 red pens, 6 blue pens, and 2 black pens. What is the probability of picking a blue pen?',
            steps: [
            { text: 'Identify the number of blue pens (favourable = 6).' },
            { text: 'Calculate the total number of pens (4 + 6 + 2 = 12).' },
            { text: 'Apply the formula: P = 6 / 12.' },
            { text: 'Simplify the fraction: 6/12 = 1/2.' },
            { text: 'State the result: The probability is 1/2 or 0.5.', faded: true, blankAnswer: '1/2' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_104', title: 'Real-Life Applications of Data Handling',
          scaffold: { problem: 'A shopkeeper sold the following number of pens in a week: Monday (20), Tuesday (35), Wednesday (25), Thursday (30), Friday (40).',
            steps: [
            { text: 'List the frequencies: Mon=20, Tue=35, Wed=25, Thu=30, Fri=40.' },
            { text: 'Divide each frequency by the scale (5) to find the bar heights: Mon=4, Tue=7, Wed=5, Thu=6, Fri=8.' },
            { text: 'Draw a vertical axis representing the number of units (1 to 8) and a horizontal axis for the days.' },
            { text: 'Draw bars for each day at the calculated heights with equal widths and gaps.', faded: true, blankAnswer: 'A bar graph with bars of heights 4, 7, 5, 6, and 8 units.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch09_104', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch09_101', title: 'Use it in the wild',
          caseStudy: { intro: 'A student runs a favourite-colour survey of 20 classmates and proudly shows her table: 10 chose red, 8 chose blue. Her teacher frowns: \'Your table says 18. You surveyed 20. What do you do first?\'',
            decisions: [{ prompt: 'What is the right first move?', options: [
                { text: 'Go back to the raw list — totals in the table must add up to the number surveyed, so the gap of 2 means two responses were never recorded or were miscounted, and the fix is to find them, not to write \'2 other\' and move on. This is exactly why tidy tables beat paragraphs: the mismatch is visible at a glance.', outcome: 'A frequency table is a check on itself — when the counts do not reach the sample size, the data has a hole that has to be found in the original list.' },
                { text: 'Just add a row labelled \'unknown, 2\' — every survey has a few who forgot to answer.', outcome: 'Assuming abstention invents data — the two responses may exist on the list but were never tallied, and inventing a category hides the real answer.', reveals: 'assume-missing-data' },
                { text: 'Redo the entire survey — once a table has a gap, the whole dataset is useless.', outcome: 'Only the missing two are in doubt — the eighteen recorded responses are still valid, so checking the raw list fixes it without resurveying.', reveals: 'one-gap-kills-dataset' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch09_104', title: 'You made it',
          caseStudy: { intro: 'Raw data is noise; a frequency table is the pattern hiding inside it. Organize first, and the answer announces itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch09_101', difficulty: 'standard',
          question: 'The median is the middle value of a data set that has been arranged in order.',
          hint: 'Review identifying the smaller and larger of two numbers.',
          misconception: 'Students often try to find the median without sorting the numbers first.',
          parts: [
                { id: 'a', prompt: 'If you have the numbers 7, 2, and 9, what is the first thing you must do before finding the median?', answer: 'You must arrange the numbers in ascending order (2, 7, 9)',
                  options: ['You must arrange the numbers in ascending order (2, 7, 9)', 'the median is simply the middle number'],
                  hint: 'Review identifying the smaller and larger of two numbers.',
                  misconception: 'Students often try to find the median without sorting the numbers first.' }
          ],
            remediations: { 'students-often-try-to-find': { steps: ['Ask the student to physically rearrange the items or numbers on their desk from smallest to largest using cards.', 'Say: "Before we look for the center, we must make sure the line is organized by size, just like a queue." Once they.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_102', difficulty: 'standard',
          question: 'The mode is the value in a data set that appears the most often.',
          hint: 'Review the chapter on tally marks and frequency tables.',
          misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.',
          parts: [
                { id: 'a', prompt: 'What is the definition of the mode in a data set?', answer: 'The mode is the value that occurs with the highest frequency in a data set',
                  options: ['The mode is the value that occurs with the highest frequency in a data set', 'the average'],
                  hint: 'Review the chapter on tally marks and frequency tables.',
                  misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.' },
                { id: 'b', prompt: 'If a list of shoe sizes is 4, 5, 5, 6, 6, 6, 7, why is 6 the mode?', answer: '6 is the mode because it appears 3 times',
                  options: ['6 is the mode because it appears 3 times', 'because it is in the middle'],
                  hint: 'Review the chapter on tally marks and frequency tables.',
                  misconception: 'Students often choose the highest *numerical value* in the list as the mode instead of the *most frequent value*.' }
          ],
            remediations: { 'students-often-choose-the-highest': { steps: ['If a student picks the largest number, ask them to count how many times each number appears in the list.', 'Have them write a frequency table with two columns: "Number" and "How many times it appears." Once the table.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_103', difficulty: 'standard',
          question: 'Probability is a numerical measure of the likelihood that a specific event will.',
          hint: 'Review "Fractions of a collection" in the Data Handling chapter.',
          misconception: 'Students often mistake the "total outcomes" by only counting the outcomes that are different from the one they want.',
          parts: [
                { id: 'a', prompt: 'If you flip a standard coin, what is the probability of getting "Tails"?', answer: 'The probability is 1/2 or 0.5',
                  options: ['The probability is 1/2 or 0.5', 'it\'s 50/50'],
                  hint: 'Review "Fractions of a collection" in the Data Handling chapter.',
                  misconception: 'Students often mistake the "total outcomes" by only counting the outcomes that are different from the one they want.' }
          ],
            remediations: { 'students-often-mistake-the-total': { steps: ['Ask the student to physically list all possible outcomes on a piece of paper.', 'For the marble bag, have them write: "Red, Blue, Green, Yellow, White." Then, have them count the total list (5).', 'Finally, ask them to circle the ones that match their goal (the "favourable" ones).', 'Always emphasize "Total = Everything that could possibly happen."'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_104', difficulty: 'standard',
          question: 'Data handling is the process of collecting, organizing, and displaying raw.',
          hint: 'Review simple tally counting and frequency tables.',
          misconception: 'Students often confuse the "scale" with the "frequency." They might think that if a pictograph key says "1 image = 5.',
          parts: [
                { id: 'a', prompt: 'If a pictograph uses a symbol of a star to represent 10 books, what does "half a star" represent?', answer: 'Half a star represents 5 books',
                  options: ['Half a star represents 5 books', 'They might think that if a pictograph key says'],
                  hint: 'Review simple tally counting and frequency tables.',
                  misconception: 'Students often confuse the "scale" with the "frequency." They might think that if a pictograph key says "1 image = 5 units," then the.' }
          ],
            remediations: { 'students-often-confuse-the-scale': { steps: ['If a student draws too many symbols, ask them: "If each symbol is a \'bundle\' of 5, how many bundles do you need.', 'Remind them that the symbol is a placeholder for a group, not a single unit.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
