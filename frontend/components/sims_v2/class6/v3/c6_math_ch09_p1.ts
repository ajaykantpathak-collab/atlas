import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch09_p1: SimDef = {
    id: 'v3_c6_math_ch09_p1',
    title: 'Data Handling · Part 1/2',
    subtitle: 'This node covers the definition of data, collection methods, tally marks, frequency.',
    classLevel: 6, subject: 'mathematics', topic: 'Data Handling · Part 1/2',
    chapters: ['c6_math_ch09'],
    nodeIds: ['c6_math_ch09_095', 'c6_math_ch09_096', 'c6_math_ch09_097', 'c6_math_ch09_098', 'c6_math_ch09_099', 'c6_math_ch09_100'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you want to find out the favourite fruit of everyone in your class.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You asked 40 classmates their favourite fruit and now hold a messy list of words. Why does grouping it into a tally table suddenly reveal the winner?',
        options: ['The table counts how often each answer appears, so the most popular choice is visible at a glance', 'Tables make handwriting neater, which reveals the answer', 'The tallest column always belongs to your favourite fruit', 'Grouping deletes the unpopular answers'],
        answer: 'The table counts how often each answer appears, so the most popular choice is visible at a glance',
        hook: 'Tally marks are the counting tool; frequency is the final count. And tallies bundle in fives — a diagonal stroke across four bars — so big counts can be read in one look.',
    },
    teaching: [
        { title: 'Introduction to Data', text: 'Data is a collection of facts, numbers, measures, or observations that provide information about a specific topic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch09_095', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Run a real survey at the school gate — set categories, mark one tally per observation, bundle every five — then read the table to crown the most common choice.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch09_095', title: 'Introduction to Data',
          caseStudy: { intro: 'Imagine you want to find out the favourite fruit of everyone in your class.',
            decisions: [{ prompt: 'What is the specific name for the count of how many times a particular value appears in a collection of data?', options: [
                { text: 'The name is "Frequency."', outcome: 'The name is "Frequency." A student who answers "Tally" is confusing the *tool* used to count (the.' },
                { text: 'Frequency', outcome: 'Not quite — Students often fail to "group" tally marks correctly. When they reach 5, they often continue.', reveals: 'students-often-fail-to-group' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_096', title: 'Collecting and Organising Data',
          scaffold: { problem: 'A shopkeeper sells 15 notebooks: 5 Red, 3 Blue, 4 Green, 3 Red. Organize this into a frequency table.',
            steps: [
            { text: 'List the unique colors (Red, Blue, Green).' },
            { text: 'Tally the data: Red (5+3=8), Blue (3), Green (4).' },
            { text: 'Draw the table columns: "Notebook Color", "Tally Marks", "Frequency".' },
            { text: 'Fill in the tallies: Red (`||||| |||`), Blue (`|||`), Green (`||||`).' },
            { text: 'Total the frequency: 8 + 3 + 4 = 15.', faded: true, blankAnswer: 'Red: 8, Blue: 3, Green: 4.' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch09_097', title: 'Pictographs',
          caseStudy: { intro: 'Imagine you want to tell your friends how many mangoes everyone in your group ate, but you don\'t want to just write a list of numbers.',
            decisions: [{ prompt: 'If a pictograph uses one star symbol to represent 10 books, how many books does a row with 4 stars represent?', options: [
                { text: 'The row represents 40 books', outcome: 'The row represents 40 books. A wrong answer (like 4) suggests the student is counting the symbols.' },
                { text: 'entirely', outcome: 'Not quite — Students often assume every symbol always represents exactly "1" unit, regardless of what the key.', reveals: 'every-symbol-always-represents-exactly' },
                { text: 'every symbol always represents exactly "1" unit, regardless of what the key says', outcome: 'Not quite — Students often assume every symbol always represents exactly "1" unit, regardless of what the key.', reveals: 'every-symbol-always-represents-exactly' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch09_098', title: 'Bar Graphs',
          scaffold: { problem: 'A shopkeeper sold the following number of pens over 5 days: Monday (20), Tuesday (35), Wednesday (25), Thursday (40), Friday (30).',
            steps: [
            { text: 'Identify the range (20 to 40) and choose a scale where 1 unit = 5 pens.' },
            { text: 'Calculate heights: Monday: 20/5 = 4 units; Tuesday: 35/5 = 7 units; Wednesday: 25/5 = 5 units; Thursday: 40/5 = 8.' },
            { text: 'Draw the horizontal axis with 5 categories (days) and vertical axis with a 0-8 unit scale.' },
            { text: 'Draw bars for each day to their calculated height.' },
            { text: 'Verify that the gaps between bars are equal and labels are clear.', faded: true, blankAnswer: 'Heights are 4, 7, 5, 8, and 6 units respectively.' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch09_099', title: 'Double Bar Graphs',
          caseStudy: { intro: 'If your school wanted to compare the number of students who played Cricket versus Hockey in Class 6A and 6B, how would you show all that information at once?',
            decisions: [{ prompt: 'What is the main purpose of using a double bar graph instead of two separate single bar graphs?', options: [
                { text: 'The main purpose is to compare two related sets of data side-by-side', outcome: 'The main purpose is to compare two related sets of data side-by-side.' },
                { text: 'to show more numbers', outcome: 'Not quite — Students often try to add the values of the two side-by-side bars together.', reveals: 'students-often-try-to-add' },
                { text: 'stacked', outcome: 'Not quite — Students often try to add the values of the two side-by-side bars together.', reveals: 'students-often-try-to-add' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch09_100', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch09_095', title: 'Use it in the wild',
          caseStudy: { intro: 'A student runs a favourite-colour survey of 20 classmates and proudly shows her table: 10 chose red, 8 chose blue. Her teacher frowns: \'Your table says 18. You surveyed 20. What do you do first?\'',
            decisions: [{ prompt: 'What is the right first move?', options: [
                { text: 'Go back to the raw list — totals in the table must add up to the number surveyed, so the gap of 2 means two responses were never recorded or were miscounted, and the fix is to find them, not to write \'2 other\' and move on. This is exactly why tidy tables beat paragraphs: the mismatch is visible at a glance.', outcome: 'A frequency table is a check on itself — when the counts do not reach the sample size, the data has a hole that has to be found in the original list.' },
                { text: 'Just add a row labelled \'unknown, 2\' — every survey has a few who forgot to answer.', outcome: 'Assuming abstention invents data — the two responses may exist on the list but were never tallied, and inventing a category hides the real answer.', reveals: 'assume-missing-data' },
                { text: 'Redo the entire survey — once a table has a gap, the whole dataset is useless.', outcome: 'Only the missing two are in doubt — the eighteen recorded responses are still valid, so checking the raw list fixes it without resurveying.', reveals: 'one-gap-kills-dataset' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch09_100', title: 'The bigger picture',
          caseStudy: { intro: 'Raw data is noise; a frequency table is the pattern hiding inside it. Organize first, and the answer announces itself.',
            decisions: [{ prompt: 'What comes next? Data Handling · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Handling · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch09_095', difficulty: 'standard',
          question: 'Data is a collection of facts, numbers, measures, or observations that provide.',
          hint: 'Review basic addition and the concept of counting by groups.',
          misconception: 'Students often fail to "group" tally marks correctly. When they reach 5, they often continue drawing vertical lines.',
          parts: [
                { id: 'a', prompt: 'What is the specific name for the count of how many times a particular value appears in a collection of data?', answer: 'The name is "Frequency."',
                  options: ['The name is "Frequency."', 'Frequency'],
                  hint: 'Review basic addition and the concept of counting by groups.',
                  misconception: 'Students often fail to "group" tally marks correctly. When they reach 5, they often continue drawing vertical lines (`|||||`) instead.' }
          ],
            remediations: { 'students-often-fail-to-group': { steps: ['If a student struggles with tallying, ask them to count a pile of 10 pencils by grouping them into bundles of 5.', 'Show them that it is much faster to count "two groups of 5" than to count "1, 2, 3, 4, 5, 6, 7, 8, 9, 10." Demonstrate.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_096', difficulty: 'standard',
          question: 'Data handling is the process of collecting, organizing, and summarizing raw.',
          hint: 'Review basic addition and the concept of counting in groups (multiples of 5).',
          misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Data handling is the process of collecting, organizing, and summarizing raw information',
                  options: ['Data handling is the process of collecting, organizing, and summarizing raw information', 'Data is a collection of facts, numbers, measures, or observations that provide', 'A pictograph is a visual tool that uses small pictures or symbols to represent data,', 'A bar graph is a visual display of data using rectangular bars of equal width, where the'],
                  hint: 'Review basic addition and the concept of counting in groups (multiples of 5).',
                  misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).' }
          ],
            remediations: { 'students-often-skip-the-diagonal': { steps: ['Show the student a table with `|||||` and another with `|||||` (with the diagonal).', 'Ask them which is faster to count.', 'Explain that the diagonal line is a "shortcut" for our eyes to recognize a group of five instantly without counting.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_096', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).',
          parts: [
                { id: 'a', prompt: 'If two different categories in your table have the same frequency, can you still decide which one is "most popular"?', answer: 'No, if frequencies are equal, they are tied for the most popular',
                  options: ['No, if frequencies are equal, they are tied for the most popular', 'there must always be a single winner, ignoring the possibility of a tie'],
                  hint: 'Review basic addition and the concept of counting in groups (multiples of 5).',
                  misconception: 'Students often "skip" the diagonal line for the fifth tally, simply drawing five vertical lines (`|||||`).' }
          ],
            remediations: { 'students-often-skip-the-diagonal': { steps: ['Show the student a table with `|||||` and another with `|||||` (with the diagonal).', 'Ask them which is faster to count.', 'Explain that the diagonal line is a "shortcut" for our eyes to recognize a group of five instantly without counting.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_097', difficulty: 'standard',
          question: 'A pictograph is a visual tool that uses small pictures or symbols to represent.',
          hint: 'Review skip counting by 5s and 10s.',
          misconception: 'Students often assume every symbol always represents exactly "1" unit, regardless of what the key says.',
          parts: [
                { id: 'a', prompt: 'If a pictograph uses one star symbol to represent 10 books, how many books does a row with 4 stars represent?', answer: 'The row represents 40 books',
                  options: ['The row represents 40 books', 'entirely', 'every symbol always represents exactly "1" unit, regardless of what the key says'],
                  hint: 'Review skip counting by 5s and 10s.',
                  misconception: 'Students often assume every symbol always represents exactly "1" unit, regardless of what the key says.' },
                { id: 'b', prompt: 'If a pictograph shows 6 symbols for "Monday" and 3 symbols for "Tuesday" (with 1 symbol = 5 visitors), how can you determine which day had more visitors?', answer: 'You compare the number of symbols',
                  options: ['You compare the number of symbols', 'every symbol always represents exactly "1" unit, regardless of what the key says'],
                  hint: 'Review skip counting by 5s and 10s.',
                  misconception: 'Students often assume every symbol always represents exactly "1" unit, regardless of what the key says.' }
          ],
            remediations: { 'every-symbol-always-represents-exactly': { steps: ['If a student counts symbols as "1", ask them to point to the key/legend at the bottom of the graph.', 'Ask: "If this one icon is worth 10, does it mean we have 1 item or 10 items?" Write the multiplication sentence (e.g.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_098', difficulty: 'standard',
          question: 'A bar graph is a visual display of data using rectangular bars of equal width.',
          hint: 'Review how to count items in a list and organize them into a frequency table.',
          misconception: 'Students often start the vertical axis at a number other than zero or use inconsistent spacing between numbers (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A bar graph is a visual display of data using rectangular bars of equal width, where the',
                  options: ['A bar graph is a visual display of data using rectangular bars of equal width, where the', 'Data is a collection of facts, numbers, measures, or observations that provide', 'Data handling is the process of collecting, organizing, and summarizing raw information', 'A pictograph is a visual tool that uses small pictures or symbols to represent data,'],
                  hint: 'Review how to count items in a list and organize them into a frequency table.',
                  misconception: 'Students often start the vertical axis at a number other than zero or use inconsistent spacing between numbers (e.g., 0, 5, 20, 25).' }
          ],
            remediations: { 'students-often-start-the-vertical': { steps: ['If a student makes this error, have them redraw the axis using a ruler to ensure gaps between tick marks (e.g., 0, 5.', 'Tell them: "The distance between 0 and 5 must be the same length as the distance between 5 and 10, otherwise your.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_099', difficulty: 'standard',
          question: 'A double bar graph is a graphical display that uses two bars placed.',
          hint: 'Review simple bar graphs and how to read the y-axis values.',
          misconception: 'Students often try to add the values of the two side-by-side bars together.',
          parts: [
                { id: 'a', prompt: 'What is the main purpose of using a double bar graph instead of two separate single bar graphs?', answer: 'The main purpose is to compare two related sets of data side-by-side',
                  options: ['The main purpose is to compare two related sets of data side-by-side', 'to show more numbers', 'stacked', 'the total height of both bars combined is the value they need to report'],
                  hint: 'Review simple bar graphs and how to read the y-axis values.',
                  misconception: 'Students often try to add the values of the two side-by-side bars together.' },
                { id: 'b', prompt: 'If a double bar graph has bars for \'Rainfall in 2023\' and \'Rainfall in 2024\' for different months, why is it important to use a key or legend?', answer: 'The key identifies',
                  options: ['The key identifies', 'it looks pretty', 'stacked', 'the total height of both bars combined is the value they need to report'],
                  hint: 'Review simple bar graphs and how to read the y-axis values.',
                  misconception: 'Students often try to add the values of the two side-by-side bars together.' },
                { id: 'c', prompt: 'In a double bar graph showing marks of two students (Amit and Priya) in 5 subjects, if Amit’s bar is consistently taller than Priya\'s in all subjects, what.', answer: 'It tells you that Amit scored higher than Priya in every subject represented',
                  options: ['It tells you that Amit scored higher than Priya in every subject represented', 'Amit is smart', 'stacked', 'the total height of both bars combined is the value they need to report'],
                  hint: 'Review simple bar graphs and how to read the y-axis values.',
                  misconception: 'Students often try to add the values of the two side-by-side bars together.' }
          ],
            remediations: { 'students-often-try-to-add': { steps: ['Ask the student to point to just ONE bar and read its height against the vertical axis.', 'Explain that each bar represents an independent value.', 'Say: "We don\'t add them; we look at them side-by-side like two friends standing next to each other to see who.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch09_100', difficulty: 'standard',
          question: 'The mean (or average) is a single value that represents the central, typical.',
          hint: 'Review simple division tables and multi-digit addition.',
          misconception: 'Students often ignore zeros in a data set when calculating the mean (e.g., thinking 0, 5, 10 mean = 15/2 instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mean (or average) is a single value that represents the central, typical point of a',
                  options: ['The mean (or average) is a single value that represents the central, typical point of a', 'Data is a collection of facts, numbers, measures, or observations that provide', 'Data handling is the process of collecting, organizing, and summarizing raw information', 'A pictograph is a visual tool that uses small pictures or symbols to represent data,'],
                  hint: 'Review simple division tables and multi-digit addition.',
                  misconception: 'Students often ignore zeros in a data set when calculating the mean (e.g., thinking 0, 5, 10 mean = 15/2 instead of 15/3).' }
          ],
            remediations: { 'students-often-ignore-zeros-in': { steps: ['If a student fails to include zero, ask them: "If you played 3 games and scored 0, 5, and 10, did you play 3 games.', 'Have them list the count explicitly before dividing.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
