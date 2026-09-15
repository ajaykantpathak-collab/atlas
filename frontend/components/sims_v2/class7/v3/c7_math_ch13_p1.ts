import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch13_p1: SimDef = {
    id: 'v3_c7_math_ch13_p1',
    title: 'Connecting the Dots · Part 1/2',
    subtitle: 'Covers distinguishing between statistical and non-statistical questions in real-world.',
    classLevel: 7, subject: 'mathematics', topic: 'Connecting the Dots · Part 1/2',
    chapters: ['c7_math_ch13'],
    nodeIds: ['c7_math_ch13_001', 'c7_math_ch13_002', 'c7_math_ch13_003', 'c7_math_ch13_004', 'c7_math_ch13_005', 'c7_math_ch13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you walk into your Class 7 mathematics classroom and ask two different questions: "How many students.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two questions: How many pens does Priya have in her pencil box? and How many pens do Class 7 students carry? One is a statistics question, the other is not. Which is which — and what decides?',
        options: ['The Class 7 question is statistical — it expects a variety of answers across a group, while Priya alone has one fixed answer', 'The Priya question is statistical — bags and boxes always vary', 'Both are statistical — any question with a number counts', 'Neither — statistics only happens in labs'],
        answer: 'The Class 7 question is statistical — it expects a variety of answers across a group, while Priya alone has one fixed answer',
        hook: 'A statistical question must anticipate variability — different answers from different people. Even a changing topic fails the test if the question asks for just one value, like the single hottest temperature in May.',
    },
    teaching: [
        { title: 'Statistical Questions vs Non-Statistical Questions', text: 'A statistical question is a question that anticipates variability in the data related to the question and accounts for it in the answers, whereas a non-statistical question expects a single, fixed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch13_001', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Sort six questions into statistical and not — from the capital of India to weekly TV hours of Grade 7 — then rewrite one boring question to make it statistical.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'case', nodeId: 'c7_math_ch13_001', title: 'Statistical Questions vs Non-Statistical Questions',
          caseStudy: { intro: 'Imagine you walk into your Class 7 mathematics classroom and ask two different questions: "How many students are in this room right now?" and "How many hours.',
            decisions: [{ prompt: 'Which of the following questions is a statistical question? A) What is the capital of India?', options: [
                { text: 'C', outcome: 'The correct answer is C. Question C expects a variety of different answers from different students.' },
                { text: 'statistical question', outcome: 'Not quite — Students often believe that any question containing numbers, measurements, or math words.', reveals: 'any-question-containing-numbers' },
                { text: 'How many sides does a triangle have?', outcome: 'Not quite — Students often believe that any question containing numbers, measurements, or math words.', reveals: 'any-question-containing-numbers' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_002', title: 'Collecting and Organising Data: Frequency Tables',
          scaffold: { problem: 'A teacher records the weekly pocket money (in rupees) of 15 students in a Class 7 section: 50, 100, 50, 200, 100, 50, 100, 50, 150, 200.',
            steps: [
            { text: 'Identify and list all unique data values in ascending order to create the table\'s first column: ₹50, ₹100, ₹150, ₹200.' },
            { text: 'Go through the raw data list item by item, crossing off each number and recording a corresponding tally mark in the.' },
            { text: 'Count the tally marks for each distinct value to determine the frequency: ₹50 appears 6 times (HI I), ₹100 appears 5.' },
            { text: 'Add all the frequencies together to verify the total: $6 + 5 + 2 + 2 = 15$, which matches the total number of students.' },
            { text: 'Present the final frequency table clearly with columns for Pocket Money (₹), Tally Marks, and Frequency.', faded: true, blankAnswer: 'Frequency table: ₹50 (Frequency: 6), ₹100 (Frequency: 5).' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_003', title: 'Representative Values: Mean, Median and Mode',
          scaffold: { problem: 'Five local shops sold mangoes weighing the following masses (in kg): 14, 22, 14, 30, 20.',
            steps: [
            { text: 'Write down the given data values: $14, 22, 14, 30, 20$. The number of observations $N = 5$.' },
            { text: 'Calculate the mean by summing all values and dividing by 5: $\\text{Sum} = 14 + 22 + 14 + 30 + 20 = 100$.' },
            { text: 'Sort the data in ascending order to find the median: $14, 14, 20, 22, 30$.' },
            { text: 'Identify the mode by finding the most frequent value in the sorted list: 14 appears twice, while all other numbers.' },
            { text: 'Interpret the results: Both the mean and median equal 20 kg, showing a balanced distribution around the center, whereas.', faded: true, blankAnswer: 'Mean = 20 kg, Median = 20 kg, Mode = 14 kg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_004', title: 'Mean of a Data Set: Calculation and Interpretation',
          scaffold: { problem: 'Five students in a Class 7 group recorded their daily pocket money expenses in rupees: 45, 60, 35, 50, and 70.',
            steps: [
            { text: 'Identify all given observations and count how many there are. The observations are 45, 60, 35, 50, 70, and the total.' },
            { text: 'State the formula for the arithmetic mean: $\\text{Mean} = \\frac{\\text{Sum of all observations}}{\\text{Total number.' },
            { text: 'Substitute the values into the numerator and compute the total sum: $\\text{Sum} = 45 + 60 + 35 + 50 + 70 = 260$.' },
            { text: 'Perform the division by the total count: $\\text{Mean} = \\frac{260}{5} = 52$.' },
            { text: 'Verify the result and attach the correct unit (rupees): The mean daily expense is ₹52, which lies reasonably between.', faded: true, blankAnswer: '₹52' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_005', title: 'Median of a Data Set: Finding the Middle Value',
          scaffold: { problem: 'A library records the number of story books borrowed by 8 students in a week: 12, 5, 8, 20, 15, 3, 10, 18.',
            steps: [
            { text: 'Identify the given data set and state that sorting is required. Data = {12, 5, 8, 20, 15, 3, 10, 18}.' },
            { text: 'Arrange the data points in ascending order from smallest to largest: 3, 5, 8, 10, 12, 15, 18, 20.' },
            { text: 'Since $n = 8$ is an even number, identify the two middle terms located at positions $\\frac{8}{2} = 4$th and.' },
            { text: 'Locate the 4th and 5th terms in our sorted list. The 4th term is 10, and the 5th term is 12.' },
            { text: 'Compute the arithmetic mean of these two middle values: Median = $\\frac{10 + 12}{2} = \\frac{22}{2} = 11$.', faded: true, blankAnswer: '11 books' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_006', title: 'Mode of a Data Set: Most Frequent Value',
          scaffold: { problem: 'A library records the number of books borrowed by 12 students in a week: 2, 4, 3, 2, 5, 2, 1, 4, 2, 3, 5, 2.',
            steps: [
            { text: 'List all distinct values present in the data set: 1, 2, 3, 4, 5.' },
            { text: 'Set up a frequency count for each distinct value by tallying occurrences from the raw data.' },
            { text: 'Count the tallies: Value 1 appears 1 time; Value 2 appears 5 times; Value 3 appears 2 times; Value 4 appears 2 times.' },
            { text: 'Compare all frequency counts to find the maximum value: max frequency = 5.' },
            { text: 'Identify the data value that corresponds to this maximum frequency, which is 2, and state the result with units.', faded: true, blankAnswer: '2 books' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch13_006', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a statistics project, Reema drafts two survey questions: \'How many students are in Class 7B right now?\' and \'How many hours of sleep did each Class 7B student get last night?\' She claims both are equally good data questions.',
            decisions: [{ prompt: 'Which question is genuinely statistical, and why?', options: [
                { text: 'Only the sleep question — it expects a different answer from every student, so it studies variability. The head-count question has one fixed answer; everyone asked gives the same number, so nothing varies to analyse.', outcome: 'This applies the variability test: a statistical question anticipates a spread of answers across a group, not a single lookup.' },
                { text: 'Both are statistical — any question whose answer is a number produces data for statistics.', outcome: 'A number answer alone is not enough; with zero variation across responses there is no distribution to study.', reveals: 'numbers-mean-statistics' },
                { text: 'Neither is statistical — real statistical questions must ask for an average or a percentage, not a plain count.', outcome: 'Summaries like averages come later; what makes a question statistical is the variable data it gathers, not the statistic computed afterward.', reveals: 'statistics-means-averages' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Statistics begins with a question that can disagree with itself. Ask a group, expect variety — ask one person, expect a number.',
            decisions: [{ prompt: 'What comes next? Connecting the Dots · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Connecting the Dots · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch13_001', difficulty: 'standard',
          question: 'A statistical question is a question that anticipates variability in the data.',
          hint: 'Review c6_math_ch09_095 to remember how information is gathered from everyday situations.',
          misconception: 'Students often believe that any question containing numbers, measurements, or math words is automatically.',
          parts: [
                { id: 'a', prompt: 'Which of the following questions is a statistical question? A) What is the capital of India? B) How tall is the tallest teacher in your school?', answer: 'How many hours do students in Grade 7 spend watching television each week?',
                  options: ['How many hours do students in Grade 7 spend watching television each week?', 'statistical question', 'How many sides does a triangle have?', 'What is 45 kilograms plus 12 kilograms?'],
                  hint: 'Review c6_math_ch09_095 to remember how information is gathered from everyday situations.',
                  misconception: 'Students often believe that any question containing numbers, measurements, or math words is automatically a "statistical question." For.' },
                { id: 'b', prompt: 'Classify the following question as statistical or non-statistical and justify your choice: "What was the highest daily maximum temperature recorded in New.', answer: 'that it is a non-statistical question',
                  options: ['that it is a non-statistical question', 'temperatures changing every day', 'statistical question', 'How many sides does a triangle have?'],
                  hint: 'Review c6_math_ch09_095 to remember how information is gathered from everyday situations.',
                  misconception: 'Students often believe that any question containing numbers, measurements, or math words is automatically a "statistical question." For.' }
          ],
            remediations: { 'any-question-containing-numbers': { steps: ['To fix this, guide the student to test a question using the "Two-Answer Test." Say to the student: "Before answering.', 'Emphasize that statistics is the study of variability, so if there is no variation in the expected answers, it is not.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any question containing numbers, measurements, or math words is automatically.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement made by a student: "The question \'How old is my mathematics teacher?\' is statistical because if I ask all the students in the.', answer: 'that the student is incorrect',
                  options: ['that the student is incorrect', 'statistical question', 'How many sides does a triangle have?', 'What is 45 kilograms plus 12 kilograms?'],
                  hint: 'Review c6_math_ch09_095 to remember how information is gathered from everyday situations.',
                  misconception: 'Students often believe that any question containing numbers, measurements, or math words is automatically a "statistical question." For.' }
          ],
            remediations: { 'any-question-containing-numbers': { steps: ['To fix this, guide the student to test a question using the "Two-Answer Test." Say to the student: "Before answering.', 'Emphasize that statistics is the study of variability, so if there is no variation in the expected answers, it is not.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_002', difficulty: 'standard',
          question: 'Collecting and organising raw data into a structured frequency table involves.',
          hint: 'Review basic counting techniques and whole number ordering from c6_math_ch01_004.',
          misconception: 'Students often fail to cross off or check off raw data items as they tally them, leading to missed entries.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Collecting and organising raw data into a structured frequency table involves',
                  options: ['Collecting and organising raw data into a structured frequency table involves', 'A statistical question is a question that anticipates variability in the data related to', 'Representative values are single summary numbers—namely the mean, median, and mode—that', 'The mean (or arithmetic mean) of a data set is a single representative value calculated'],
                  hint: 'Review basic counting techniques and whole number ordering from c6_math_ch01_004.',
                  misconception: 'Students often fail to cross off or check off raw data items as they tally them, leading to missed entries or double-counting.' }
          ],
            remediations: { 'students-often-fail-to-cross': { steps: ['Remind the student to use a pencil to lightly cross out each number in the raw list the exact moment a corresponding.', 'Show them how to write the distinct values in ascending order first before tallying to prevent scattering counts.', 'Emphasize that the final step must always be adding all frequency values together and matching that sum to the total.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_003', difficulty: 'standard',
          question: 'Representative values are single summary numbers—namely the mean, median, and.',
          hint: 'Review c6_math_ch09_101 for basic middle-value identification and sorting techniques.',
          misconception: 'Students frequently fail to sort data in ascending or descending order before attempting to find the median.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical definition of the *mode* of a data set?', answer: 'The mode is the value that appears most frequently in a data set',
                  options: ['The mode is the value that appears most frequently in a data set', 'the middle value', 'the sum divided by the count'],
                  hint: 'Review c6_math_ch09_101 for basic middle-value identification and sorting techniques.',
                  misconception: 'Students frequently fail to sort data in ascending or descending order before attempting to find the median.' },
                { id: 'b', prompt: 'If every number in a data set is increased by 5, how does the median of the data set change?', answer: 'The median will also increase by exactly 5',
                  options: ['The median will also increase by exactly 5', 'relative position', 'absolute value'],
                  hint: 'Review c6_math_ch09_101 for basic middle-value identification and sorting techniques.',
                  misconception: 'Students frequently fail to sort data in ascending or descending order before attempting to find the median.' }
          ],
            remediations: { 'students-frequently-fail-to-sort': { steps: ['If a student makes this sorting error, instruct them to physically underline every number as they cross it out from.', 'Remind them: "The median is a position-based value; without a proper queue from smallest to largest, position has.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_004', difficulty: 'standard',
          question: 'The mean (or arithmetic mean) of a data set is a single representative value.',
          hint: 'Review basic division and addition operations as well as Class 6 average calculations.',
          misconception: 'Students frequently divide the sum of the data set by a fixed number (like 2 or 10) or by the highest value in the set.',
          parts: [
                { id: 'a', prompt: 'What is the primary mathematical operation performed first when calculating the mean of a data set containing five numbers?', answer: 'addition (finding the sum of all the observations)',
                  options: ['addition (finding the sum of all the observations)', 'division', 'counting'],
                  hint: 'Review basic division and addition operations as well as Class 6 average calculations.',
                  misconception: 'Students frequently divide the sum of the data set by a fixed number (like 2 or 10) or by the highest value in the set instead of dividing.' }
          ],
            remediations: { 'students-frequently-divide-the-sum': { steps: ['Remind the student to count every single item in the data list with their finger before writing down the divisor.', 'Write out the formula explicitly: $\\text{Mean} = \\frac{\\text{Sum of all observations}}{\\text{Total count.', 'Have them verify that the number of terms they divided by matches the number of terms they added together in the.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_005', difficulty: 'standard',
          question: 'The median is the middle value of a data set when all the data points are.',
          hint: 'Review c6_math_ch01_004 to practice sorting numbers from smallest to largest before.',
          misconception: 'Students frequently fail to sort the data set into ascending or descending order before attempting to locate the middle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The median is the middle value of a data set when all the data points are arranged in',
                  options: ['The median is the middle value of a data set when all the data points are arranged in', 'A statistical question is a question that anticipates variability in the data related to', 'Collecting and organising raw data into a structured frequency table involves', 'Representative values are single summary numbers—namely the mean, median, and mode—that'],
                  hint: 'Review c6_math_ch01_004 to practice sorting numbers from smallest to largest before attempting.',
                  misconception: 'Students frequently fail to sort the data set into ascending or descending order before attempting to locate the middle value, or they.' }
          ],
            remediations: { 'students-frequently-fail-to-sort': { steps: ['Direct the student to physically rewrite the numbers on slips of paper or underline them from smallest to largest.', 'Say: "Before you touch the middle, your numbers must be marching in strict size order from smallest to giant.', 'Let\'s write them out with spaces: smallest first, largest last.', 'Now, cross off one from the left and one from the right simultaneously until only the center remains."'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_006', difficulty: 'standard',
          question: 'The mode of a data set is the value that appears most frequently, meaning.',
          hint: 'Review c7_math_ch13_002 to practice creating frequency tables before trying to spot the.',
          misconception: 'Students often confuse the mode with the mean or median, attempting to add all numbers together and divide by the total.',
          parts: [
                { id: 'a', prompt: 'What is the mode of the following data set representing daily pocket money amounts (in rupees): 10, 20, 10, 30, 10, 40, 20?', answer: 'The mode is 10 rupees',
                  options: ['The mode is 10 rupees', 'average'],
                  hint: 'Review c7_math_ch13_002 to practice creating frequency tables before trying to spot the highest.',
                  misconception: 'Students often confuse the mode with the mean or median, attempting to add all numbers together and divide by the total count when asked.' },
                { id: 'b', prompt: 'Can a data set consisting of five different numbers (e.g., 2, 5, 8, 12, 19) have a mode? Explain why or why not.', answer: 'No, this data set does not have a mode',
                  options: ['No, this data set does not have a mode', 'average'],
                  hint: 'Review c7_math_ch13_002 to practice creating frequency tables before trying to spot the highest.',
                  misconception: 'Students often confuse the mode with the mean or median, attempting to add all numbers together and divide by the total count when asked.' },
                { id: 'c', prompt: 'Find the mode of the following set of test scores out of 25: 14, 18, 14, 22, 18, 18, 20, 14, 18, 25. Show your frequency count.', answer: 'Step 1: List distinct scores: 14, 18, 20, 22, 25',
                  options: ['Step 1: List distinct scores: 14, 18, 20, 22, 25', 'average'],
                  hint: 'Review c7_math_ch13_002 to practice creating frequency tables before trying to spot the highest.',
                  misconception: 'Students often confuse the mode with the mean or median, attempting to add all numbers together and divide by the total count when asked.' },
                { id: 'd', prompt: 'A shoe shop records the daily shoe sizes sold: 6, 7, 6, 8, 7, 8, 6, 8.', answer: 'Size 6 appears 3 times, size 7 appears 2 times, and size 8 appears 3 times',
                  options: ['Size 6 appears 3 times, size 7 appears 2 times, and size 8 appears 3 times', 'average'],
                  hint: 'Review c7_math_ch13_002 to practice creating frequency tables before trying to spot the highest.',
                  misconception: 'Students often confuse the mode with the mean or median, attempting to add all numbers together and divide by the total count when asked.' }
          ],
            remediations: { 'students-often-confuse-the-mode': { steps: ['Remind the student that \'mode\' sounds like \'most\'—ask them: "Which number appears *most* often?" Have them physically.', 'Emphasize that finding the mode requires counting frequencies, not performing arithmetic operations like addition.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
