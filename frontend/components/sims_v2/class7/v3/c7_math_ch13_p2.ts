import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch13_p2: SimDef = {
    id: 'v3_c7_math_ch13_p2',
    title: 'Connecting the Dots · Part 2/2',
    subtitle: 'Covers the construction and basic interpretation of single bar graphs and pictographs.',
    classLevel: 7, subject: 'mathematics', topic: 'Connecting the Dots · Part 2/2',
    chapters: ['c7_math_ch13'],
    nodeIds: ['c7_math_ch13_007', 'c7_math_ch13_008', 'c7_math_ch13_009', 'c7_math_ch13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you conducted a survey in your class of 40 students asking for their favourite sports (Cricket.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two questions: How many pens does Priya have in her pencil box? and How many pens do Class 7 students carry? One is a statistics question, the other is not. Which is which — and what decides?',
        options: ['The Class 7 question is statistical — it expects a variety of answers across a group, while Priya alone has one fixed answer', 'The Priya question is statistical — bags and boxes always vary', 'Both are statistical — any question with a number counts', 'Neither — statistics only happens in labs'],
        answer: 'The Class 7 question is statistical — it expects a variety of answers across a group, while Priya alone has one fixed answer',
        hook: 'A statistical question must anticipate variability — different answers from different people. Even a changing topic fails the test if the question asks for just one value, like the single hottest temperature in May.',
    },
    teaching: [
        { title: 'Visualising Data: Bar Graphs and Pictographs', text: 'Visualising data through bar graphs and pictographs involves representing numerical information graphically using rectangular bars of uniform width or symbols/icons where each symbol represents.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch13_007', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Sort six questions into statistical and not — from the capital of India to weekly TV hours of Grade 7 — then rewrite one boring question to make it statistical.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_007', title: 'Visualising Data: Bar Graphs and Pictographs',
          scaffold: { problem: 'A school library recorded the number of story books borrowed over 4 days: Monday = 45, Tuesday = 30, Wednesday = 60, Thursday = 75.',
            steps: [
            { text: 'Identify the given frequencies: Monday ($45$), Tuesday ($30$), Wednesday ($60$), Thursday ($75$).' },
            { text: 'Identify the given scale factor: $1\\text{ cm} = 15\\text{ books}$.' },
            { text: 'Set up the formula for bar height: $\\text{Bar Height} = \\frac{\\text{Frequency}}{\\text{Scale Factor}}$.' },
            { text: 'Calculate the height for each day:' },
            { text: 'Verify by checking that all heights fit standard graph paper and represent the data proportionally.', faded: true, blankAnswer: 'Heights are: Monday = 3 cm, Tuesday = 2 cm, Wednesday = 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_008', title: 'Interpreting Graphs: Reading and Drawing Conclusions',
          scaffold: { problem: 'A line graph records the height of a sapling in a nursery measured at the end of every month from January (Month 1) to June (Month 6).',
            steps: [
            { text: 'Extract the initial value in January ($10\\text{ cm}$) and the final value in June ($50\\text{ cm}$).' },
            { text: 'Compute total growth by subtracting initial height from final height: $\\text{Total Growth} = 50 - 10 = 40\\text{ cm}$.' },
            { text: 'Calculate growth for each monthly interval: Jan-Feb ($15 - 10 = 5$), Feb-Mar ($25 - 15 = 10$), Mar-Apr ($25 - 25 = 0$).' },
            { text: 'Compare all interval growth values ($5, 10, 0, 10, 15$) to find the maximum.' },
            { text: 'Verify results and state answers with proper units ($40\\text{ cm}$ total growth, greatest growth between May and June).', faded: true, blankAnswer: 'Total growth is 40 cm; greatest growth occurred between May.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch13_009', title: 'Data Detective: Analysing Real-World Data Sets',
          scaffold: { problem: 'A local fruit vendor recorded his daily mango sales (in kilograms) over 6 days as follows: 25, 30, 25, 45, 60, 25.',
            steps: [
            { text: 'Identify all given data points and total number of days ($n = 6$). Data set: {25, 30, 25, 45, 60, 25}.' },
            { text: 'Calculate the mean by summing all values and dividing by 6. Sum = 25 + 30 + 25 + 45 + 60 + 25 = 210.' },
            { text: 'Find the median by first arranging the data in ascending order: {25, 25, 25, 30, 45, 60}.' },
            { text: 'Find the mode by identifying the most frequently occurring value. The number 25 appears 3 times, so Mode = 25 kg.' },
            { text: 'Interpret the findings. The mode (25 kg) and median (27.5 kg) reflect the vendor\'s everyday baseline sales better than.', faded: true, blankAnswer: 'Mean = 35 kg, Median = 27.5 kg, Mode = 25 kg; Mode.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch13_010', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a statistics project, Reema drafts two survey questions: \'How many students are in Class 7B right now?\' and \'How many hours of sleep did each Class 7B student get last night?\' She claims both are equally good data questions.',
            decisions: [{ prompt: 'Which question is genuinely statistical, and why?', options: [
                { text: 'Only the sleep question — it expects a different answer from every student, so it studies variability. The head-count question has one fixed answer; everyone asked gives the same number, so nothing varies to analyse.', outcome: 'This applies the variability test: a statistical question anticipates a spread of answers across a group, not a single lookup.' },
                { text: 'Both are statistical — any question whose answer is a number produces data for statistics.', outcome: 'A number answer alone is not enough; with zero variation across responses there is no distribution to study.', reveals: 'numbers-mean-statistics' },
                { text: 'Neither is statistical — real statistical questions must ask for an average or a percentage, not a plain count.', outcome: 'Summaries like averages come later; what makes a question statistical is the variable data it gathers, not the statistic computed afterward.', reveals: 'statistics-means-averages' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch13_010', title: 'You made it',
          caseStudy: { intro: 'Statistics begins with a question that can disagree with itself. Ask a group, expect variety — ask one person, expect a number.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch13_007', difficulty: 'standard',
          question: 'Visualising data through bar graphs and pictographs involves representing.',
          hint: 'Review c7_math_ch13_002 to ensure data is correctly tabulated before attempting graphical.',
          misconception: 'Students often fail to maintain a consistent scale or forget to calculate the value of partial symbols in a pictograph.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Visualising data through bar graphs and pictographs involves representing numerical',
                  options: ['Visualising data through bar graphs and pictographs involves representing numerical', 'A statistical question is a question that anticipates variability in the data related to', 'Collecting and organising raw data into a structured frequency table involves', 'Representative values are single summary numbers—namely the mean, median, and mode—that'],
                  hint: 'Review c7_math_ch13_002 to ensure data is correctly tabulated before attempting graphical.',
                  misconception: 'Students often fail to maintain a consistent scale or forget to calculate the value of partial symbols in a pictograph.' }
          ],
            remediations: { 'students-often-fail-to-maintain': { steps: ['Remind the student to always check the scale box first before looking at any bars or pictures.', 'Write down the scaling rule explicitly as an equation: `1 symbol = [X] units`, then for any given count, calculate.', 'When drawing, check that every increment on the axis increases by the exact same amount.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_008', difficulty: 'standard',
          question: 'Interpreting graphs involves reading visual data representations (such as line.',
          hint: 'Review plotting points and reading scales on a number line using c6_math_ch02_017.',
          misconception: 'Students often read a line graph as if it were a physical picture or a literal map of a route (e.g., thinking a rising.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interpreting graphs involves reading visual data representations (such as line graphs and',
                  options: ['Interpreting graphs involves reading visual data representations (such as line graphs and', 'A statistical question is a question that anticipates variability in the data related to', 'Collecting and organising raw data into a structured frequency table involves', 'Representative values are single summary numbers—namely the mean, median, and mode—that'],
                  hint: 'Review plotting points and reading scales on a number line using c6_math_ch02_017.',
                  misconception: 'Students often read a line graph as if it were a physical picture or a literal map of a route (e.g., thinking a rising line means the road.' }
          ],
            remediations: { 'students-often-read-a-line': { steps: ['To fix this, guide the student back to the axis labels step by step.', 'Ask: "What does the horizontal axis measure?', 'What does the vertical axis measure?" Emphasize that a line going up simply means the *value* of the vertical quantity.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_009', difficulty: 'standard',
          question: 'Analysing real-world data sets involves examining collected numbers.',
          hint: 'Review c7_math_ch13_003 to refresh how different representative values describe different.',
          misconception: 'Students frequently look at an isolated data point or a single statistic like the mode when analysing a real-world data.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Analysing real-world data sets involves examining collected numbers, measurements, or',
                  options: ['Analysing real-world data sets involves examining collected numbers, measurements, or', 'A statistical question is a question that anticipates variability in the data related to', 'Collecting and organising raw data into a structured frequency table involves', 'Representative values are single summary numbers—namely the mean, median, and mode—that'],
                  hint: 'Review c7_math_ch13_003 to refresh how different representative values describe different aspects.',
                  misconception: 'Students frequently look at an isolated data point or a single statistic like the mode when analysing a real-world data set, completely.' }
          ],
            remediations: { 'students-frequently-look-at-an': { steps: ['Guide the student to list all three measures of central tendency (mean, median, mode) and the range whenever they look.', 'Ask them: \'Does this single number tell us about every single day, or just the most common one?\' Force them to compute.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch13_010', difficulty: 'standard',
          question: 'Choosing an appropriate representative value involves analyzing the.',
          hint: 'Review c7_math_ch13_003 to ensure you can calculate all three representative values.',
          misconception: 'Students often assume that the "mean" is always the correct and default choice for "average" in every real-world.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Choosing an appropriate representative value involves analyzing the distribution, spread,',
                  options: ['Choosing an appropriate representative value involves analyzing the distribution, spread,', 'A statistical question is a question that anticipates variability in the data related to', 'Collecting and organising raw data into a structured frequency table involves', 'Representative values are single summary numbers—namely the mean, median, and mode—that'],
                  hint: 'Review c7_math_ch13_003 to ensure you can calculate all three representative values correctly.',
                  misconception: 'Students often assume that the "mean" is always the correct and default choice for "average" in every real-world scenario, regardless.' }
          ],
            remediations: { 'the-mean-is-always-the': { steps: ['When a student defaults to using the mean blindly, ask them: "Does this average number actually describe a typical item.', 'If the mean is drastically different from the middle values because of an extreme outlier, explain that the mean has.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
