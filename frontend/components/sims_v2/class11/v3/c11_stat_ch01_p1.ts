import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch01_p1: SimDef = {
    id: 'v3_c11_stat_ch01_p1',
    title: 'Introduction to Statistics · Part 1/2',
    subtitle: 'Learn that the word \'statistics\' carries two meanings — and qualitative counts.',
    classLevel: 11, subject: 'statistics', topic: 'Introduction to Statistics · Part 1/2',
    chapters: ['c11_stat_ch01'],
    nodeIds: ['c11_stat_cbse_01_001', 'c11_stat_cbse_01_002', 'c11_stat_cbse_01_003', 'c11_stat_cbse_01_004', 'c11_stat_cbse_01_005', 'c11_stat_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a statistician defending the subject\'s borders', intro: 'Is \'statistics\' a number or a science? The answer decides what the subject is even allowed to study.', goal: 'Distinguish singular/plural statistics and qualitative from quantitative data.' },
    discovery: {
        question: '\'Gender\' and \'skill level\' can\'t be statistics — the subject only deals in numbers. True?',
        options: ['No — statistics handles qualitative data too; it classifies and counts attributes just as it measures quantities', 'Yes — no numbers, no statistics', 'Yes — but only at Class 11 level', 'No — because gender can be coded as numbers'],
        answer: 'No — statistics handles qualitative data too; it classifies and counts attributes just as it measures quantities',
        hook: '\'Statistics\' in the singular isn\'t a single number — it\'s the science of collecting, analysing and interpreting data; the plural is the data itself.',
    },
    teaching: [
        { title: 'Meaning of Statistics in Plural and Singular Sense', text: 'Statistics in the **plural sense** refers to numerical data or quantitative facts systematically collected for a predetermined purpose (e.g., "Statistics show India\'s GDP grew by 7.2%").', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate singular from plural senses, then judge whether unpredictable human behaviour makes statistical forecasting of GDP useless.',
        labels: ['Meaning of Statistics', 'Scope and Applications', 'Functions and Importance', 'Limitations of Statistics', 'Statistics and Economics: Interrelationship', 'Sources of Data: Primary'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_001', title: 'Meaning of Statistics in Plural and Singular Sense',
          caseStudy: { intro: 'Imagine you are reading a news headline: "Statistics reveal that 68% of Indian households use LPG as primary cooking fuel." Ask yourself: does "statistics".',
            decisions: [{ prompt: '**REMEMBER**: State the two senses in which the term "statistics" is used in economics, and give one example of each sense from daily life.', options: [
                { text: '**Correct answer**: Plural sense = numerical data (e.g., "The statistics of Class 11', outcome: '**Correct answer**: Plural sense = numerical data (e.g., "The statistics of Class 11 marks show.' },
                { text: 'population statistics', outcome: 'Not quite — Students often think "statistics in singular sense" means "a single statistic" (e.g., one number.', reveals: 'statistics-in-singular-sense-means' },
                { text: 'cricket statistics', outcome: 'Not quite — Students often think "statistics in singular sense" means "a single statistic" (e.g., one number.', reveals: 'statistics-in-singular-sense-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_002', title: 'Scope and Applications of Statistics in Economics',
          caseStudy: { intro: 'Imagine you are an economic advisor to the Government of India in 2024. The Prime Minister asks: "Global crude oil prices have doubled.',
            decisions: [{ prompt: 'State the definition of statistics as given in the NCERT Class 11 textbook and list the four fundamental operations it performs.', options: [
                { text: 'Statistics is defined as the study of collection, analysis, interpretation, and', outcome: 'Statistics is defined as the study of collection, analysis, interpretation, and presentation.' },
                { text: 'statistics is only calculating averages', outcome: 'Not quite — Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean.', reveals: 'scope-of-statistics-in-economics' },
                { text: 'Scope of Statistics in Economics', outcome: 'Not quite — Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean.', reveals: 'scope-of-statistics-in-economics' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_003', title: 'Functions and Importance of Statistics',
          caseStudy: { intro: 'Imagine the Government of India must decide how many kilograms of wheat to procure from farmers in Punjab for the Public Distribution System in 2025.',
            decisions: [{ prompt: 'State the five functions of statistics in economics as described in your textbook, and give a one-sentence economic illustration for each.', options: [
                { text: 'The five functions are: (1) Presenting facts in precise/definite form—e.g., "India\'s rice', outcome: 'The five functions are: (1) Presenting facts in precise/definite form—e.g., "India\'s rice.' },
                { text: 'functions of statistics', outcome: 'Not quite — Students believe "functions of statistics" means "statistics solves economic problems.', reveals: 'functions-of-statistics-means-statistics' },
                { text: 'statistics solves economic problems automatically', outcome: 'Not quite — Students believe "functions of statistics" means "statistics solves economic problems.', reveals: 'functions-of-statistics-means-statistics' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_004', title: 'Limitations of Statistics and Misuse of Statistical Data',
          caseStudy: { intro: 'Start with the NCERT story: a family of four tries to cross a river because the average height of family members is greater than the average depth of the.',
            decisions: [{ prompt: 'What is the fundamental limitation of statistics highlighted by the river-crossing story in the NCERT textbook?', options: [
                { text: 'The story illustrates that statistical averages (mean depth, mean height) do not reflect', outcome: 'The story illustrates that statistical averages (mean depth, mean height) do not reflect the.' },
                { text: 'statistics is useless', outcome: 'Not quite — Students often think "limitations of statistics" means "statistics is unreliable or useless." They.', reveals: 'limitations-of-statistics-means-statistics' },
                { text: 'limitations of statistics', outcome: 'Not quite — Students often think "limitations of statistics" means "statistics is unreliable or useless." They.', reveals: 'limitations-of-statistics-means-statistics' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_005', title: 'Statistics and Economics: Interrelationship',
          caseStudy: { intro: 'Imagine the government announces a new policy: "Free electricity up to 200 units for all households." As a student of economics, you ask: How did they decide.',
            decisions: [{ prompt: 'State the definition of Economics given in the NCERT textbook that highlights the connection between scarce resources, alternative uses.', options: [
                { text: 'Correct answer: "Economics is the study of how people and society choose to employ scarce', outcome: 'Correct answer: "Economics is the study of how people and society choose to employ scarce resources.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe "Statistics proves Economic theories" — they think running a regression.', reveals: 'statistics-proves-economic-theories-they' },
                { text: 'Economics is about production only', outcome: 'Not quite — Students believe "Statistics proves Economic theories" — they think running a regression.', reveals: 'statistics-proves-economic-theories-they' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_006', title: 'Sources of Data: Primary and Secondary Data',
          caseStudy: { intro: 'Imagine you are a Class 11 student tasked with finding out the average monthly pocket money of students in your school. How would you get this information?',
            decisions: [{ prompt: 'What is the fundamental difference between primary data and secondary data in terms of who collects the data and for what purpose?', options: [
                { text: 'Primary data is collected by the investigator themselves for a specific research', outcome: 'Primary data is collected by the investigator themselves for a specific research objective, whereas.' },
                { text: 'primary data is always more accurate', outcome: 'Not quite — Students often believe that primary data is inherently "better" or "more accurate" than secondary.', reveals: 'primary-data-is-inherently-better' },
                { text: 'secondary data is old data', outcome: 'Not quite — Students often believe that primary data is inherently "better" or "more accurate" than secondary.', reveals: 'primary-data-is-inherently-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Prepping a stats-in-economics talk, a student defines \'statistics in the singular sense\' as \'a single number like an average\', and for the scope slide writes bullet definitions without examples — \'statistics helps in forecasting\', full stop.',
            decisions: [{ prompt: 'What do the two senses and the scope actually mean?', options: [
                { text: 'Correct the grammar and ground the scope: singular \'statistics\' is the DISCIPLINE — the methods of collecting, analysing and interpreting data; plural \'statistics\' is the numerical data itself. And each scope point needs a decision context: forecasting means WHAT is forecast (future demand), WHY (production targets) and WHICH data (past consumption, income) — e.g., RBI forecasting inflation to set the repo rate.', outcome: 'The talk gains substance: the discipline isn\'t one number, and applications live at the variable-and-decision level, not in bullet labels.' },
                { text: 'Keep \'a single statistic\' — singular sense must mean one number.', outcome: 'That\'s the grammatical trap: \'statistics\' takes a singular verb when naming the science — the singular sense is the whole method, not one value.', reveals: 'singular-is-one-number' },
                { text: 'Keep the generic bullets — the scope list is meant to be memorised.', outcome: 'Each bullet hides a decision: \'forecasting\' without variable, purpose and data is a slogan — examiners want \'crop-yield data fixing MSP\', not \'helps policies\'.', reveals: 'scope-is-memorised-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Economics without statistics is intuition; governments plan crops, budgets and inflation targets on the forecasts intuition can\'t give.',
            decisions: [{ prompt: 'What comes next? Introduction to Statistics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Statistics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_001', difficulty: 'standard',
          question: 'Statistics in the **plural sense** refers to numerical data or quantitative.',
          hint: 'Revisit Class 8 Mathematics Chapter 12 (Mean as a Balancing Point) and Class 10.',
          misconception: 'Students often think "statistics in singular sense" means "a single statistic" (e.g., one number like the mean).',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: A student says, "The statistics in this report are misleading because the sample size was too small." Identify whether "statistics" here.', answer: '**Correct answer**: Plural sense (the reported numbers/data)',
                  options: ['**Correct answer**: Plural sense (the reported numbers/data)', 'singular sense because it\'s about methodology', 'statistics in singular sense', 'a single statistic'],
                  hint: 'Revisit Class 8 Mathematics Chapter 12 (Mean as a Balancing Point) and Class 10 Mathematics Chapter.',
                  misconception: 'Students often think "statistics in singular sense" means "a single statistic" (e.g., one number like the mean).' },
                { id: 'b', prompt: '**APPLY**: Classify each statement as plural sense (P) or singular sense (S): (a) "Statistics show that literacy rate in Kerala is 94%." (b) "Statistics.', answer: '**Correct answer**: (a) P',
                  options: ['**Correct answer**: (a) P', 'revising data', 'revising methods', 'statistics in singular sense'],
                  hint: 'Revisit Class 8 Mathematics Chapter 12 (Mean as a Balancing Point) and Class 10 Mathematics Chapter.',
                  misconception: 'Students often think "statistics in singular sense" means "a single statistic" (e.g., one number like the mean).' }
          ],
            remediations: { 'statistics-in-singular-sense-means': { steps: ['Write "Statistics (plural) = The Numbers" and "Statistics (singular) = The Science" on two cards.', 'Give the student 5 mixed statements (news headlines, textbook lines).', 'Ask them to hold up the correct card for each occurrence of the word.', 'For every misclassification, ask: "Does this sentence talk about *what the numbers say* or *how the numbers were.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "statistics in singular sense" means "a single statistic" (e.g., one number like the mean).',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: Critique this statement: "Qualitative data like \'gender\' or \'skill level\' are not statistics because statistics only deals with numbers." Use the.', answer: '**Correct answer**: The statement is false',
                  options: ['**Correct answer**: The statement is false', 'statistics', 'quantitative data only', 'statistics in singular sense'],
                  hint: 'Revisit Class 8 Mathematics Chapter 12 (Mean as a Balancing Point) and Class 10 Mathematics Chapter.',
                  misconception: 'Students often think "statistics in singular sense" means "a single statistic" (e.g., one number like the mean).' }
          ],
            remediations: { 'statistics-in-singular-sense-means': { steps: ['Write "Statistics (plural) = The Numbers" and "Statistics (singular) = The Science" on two cards.', 'Give the student 5 mixed statements (news headlines, textbook lines).', 'Ask them to hold up the correct card for each occurrence of the word.', 'For every misclassification, ask: "Does this sentence talk about *what the numbers say* or *how the numbers were.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_002', difficulty: 'standard',
          question: 'Scope and Applications of Statistics in Economics refers to the systematic use.',
          hint: 'Revisit Class 10 Maths Chapter 13 (Statistics: Mean/Median/Mode of Grouped Data) and.',
          misconception: 'Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean, median, correlation).',
          parts: [
                { id: 'a', prompt: 'State the definition of statistics as given in the NCERT Class 11 textbook and list the four fundamental operations it performs on numerical data.', answer: 'Statistics is defined as the study of collection, analysis, interpretation, and',
                  options: ['Statistics is defined as the study of collection, analysis, interpretation, and', 'statistics is only calculating averages', 'Scope of Statistics in Economics', 'list of formulas we will learn'],
                  hint: 'Revisit Class 10 Maths Chapter 13 (Statistics: Mean/Median/Mode of Grouped Data) and Class 10.',
                  misconception: 'Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean, median, correlation).' },
                { id: 'b', prompt: 'The textbook states: "Statistics is an indispensable tool for an economist that helps him to understand an economic problem." Explain in your own words why.', answer: 'Statistics is needed',
                  options: ['Statistics is needed', 'statistics solves poverty directly', 'Statistics solves economic problems', 'Scope of Statistics in Economics'],
                  hint: 'Revisit Class 10 Maths Chapter 13 (Statistics: Mean/Median/Mode of Grouped Data) and Class 10.',
                  misconception: 'Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean, median, correlation).' },
                { id: 'c', prompt: 'A state government wants to decide the Minimum Support Price (MSP) for wheat for the next crop year.', answer: 'calculating average cost of cultivation, (',
                  options: ['calculating average cost of cultivation, (', 'calculation', 'Scope of Statistics in Economics', 'list of formulas we will learn'],
                  hint: 'Revisit Class 10 Maths Chapter 13 (Statistics: Mean/Median/Mode of Grouped Data) and Class 10.',
                  misconception: 'Students believe "Scope of Statistics in Economics" means "list of formulas we will learn" (mean, median, correlation).' }
          ],
            remediations: { 'scope-of-statistics-in-economics': { steps: ['Ask the student to pick *one* newspaper headline about an economic decision (e.g., "Govt raises MSP for paddy by 5%").', 'Have them write the *exact statistical question* that decision answered (e.g., "What is the weighted average cost.', 'Map that question to *one* textbook application (condensation of mass data into a policy variable).', 'Repeat for 3 different headlines until they can do the mapping automatically.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_003', difficulty: 'standard',
          question: 'Statistics in economics refers to the systematic application of quantitative.',
          hint: 'Revisit c11_stat_cbse_01_001 (Meaning of Statistics) for the singular/plural distinction.',
          misconception: 'Students believe "functions of statistics" means "statistics solves economic problems automatically." They write.',
          parts: [
                { id: 'a', prompt: 'A state government wants to decide how many new primary health centres to open in rural districts.', answer: 'understanding the problem, (',
                  options: ['understanding the problem, (', 'health data', 'functions of statistics', 'statistics solves economic problems automatically'],
                  hint: 'Revisit c11_stat_cbse_01_001 (Meaning of Statistics) for the singular/plural distinction, and.',
                  misconception: 'Students believe "functions of statistics" means "statistics solves economic problems automatically." They write: "Statistics removes.' }
          ],
            remediations: { 'functions-of-statistics-means-statistics': { steps: ['If a student conflates statistics with policy solutions: (1) Ask: "The 2011 Census gave precise literacy rates.', 'Did literacy rise automatically after the Census?" (2) Show the chain: Data → Analysis → Policy Option A/B/C →.', '(3) Assign: "Find one Indian policy where statistics *recommended* X but government chose Y.', 'Explain why." (4) Reinforce: "Statistics is the stethoscope, not the surgery." Repeat with 2-3 examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_004', difficulty: 'standard',
          question: 'Statistics has inherent limitations: it deals with aggregates not individuals.',
          hint: 'Revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001.',
          misconception: 'Students often think "limitations of statistics" means "statistics is unreliable or useless." They confuse the tool\'s.',
          parts: [
                { id: 'a', prompt: 'A student calculates the average marks of two classes: Class A (30 students, average 75) and Class B (20 students, average 80).', answer: 'Her method is wrong',
                  options: ['Her method is wrong', 'limitations of statistics', 'statistics is unreliable or useless', '"limitations of statistics" means "statistics is unreliable or useless'],
                  hint: 'Revisit Class 10 Maths Chapter 13 (Statistics) nodes c10_math_cbse_13_001, c10_math_cbse_13_004.',
                  misconception: 'Students often think "limitations of statistics" means "statistics is unreliable or useless." They confuse the tool\'s constraints (e.g.' }
          ],
            remediations: { 'limitations-of-statistics-means-statistics': { steps: ['If a student holds this misconception, do the following: 1) Distinguish between "limitation" (inherent to the method).', '2) Use the river story: the limitation is that average depth doesn\'t tell you the maximum depth; the misuse is assuming.', '3) Give a table of data with an outlier; compute mean and median; ask which represents the "typical" value.', '4) Have the student write one limitation and one misuse in their own words, then swap with a peer to classify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_005', difficulty: 'standard',
          question: 'Statistics and Economics are interdependent disciplines where Economics.',
          hint: 'Revisit Class 9 Economics Chapter 1: "Scarcity: The Fundamental Economic Problem" and.',
          misconception: 'Students believe "Statistics proves Economic theories" — they think running a regression or calculating a correlation.',
          parts: [
                { id: 'a', prompt: 'Compare these two statements: (i) "India\'s GDP grew by 7.2% in 2022-23." (ii) "India\'s development has improved." Which is a statistical statement?', answer: 'Correct answer: (i) is a statistical statement',
                  options: ['Correct answer: (i) is a statistical statement', 'GDP growth proves development', 'Statistics proves Economic theories', 'price rise causes demand fall'],
                  hint: 'Revisit Class 9 Economics Chapter 1: "Scarcity: The Fundamental Economic Problem" and "Choice and.',
                  misconception: 'Students believe "Statistics proves Economic theories" — they think running a regression or calculating a correlation coefficient confirms.' }
          ],
            remediations: { 'statistics-proves-economic-theories-they': { steps: ['Ask the student to write down the exact difference between "correlation" and "causation" in their own words without.', 'Give them the ice cream-drowning example and ask: "What would a purely statistical analysis conclude?', 'Have them re-read the NCERT line: "Whether such relationships exist or not can be easily verified by applying.', 'Assign a mini-task: Find two economic variables that move together but have no causal link (e.g., number of temples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_006', difficulty: 'standard',
          question: 'Primary data refers to original data collected firsthand by the investigator.',
          hint: 'Revisit the meaning of statistics in plural sense (c11_stat_cbse_01_001) and the link.',
          misconception: 'Students often believe that primary data is inherently "better" or "more accurate" than secondary data, leading them.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between primary data and secondary data in terms of who collects the data and for what purpose?', answer: 'Primary data is collected by the investigator themselves for a specific research',
                  options: ['Primary data is collected by the investigator themselves for a specific research', 'primary data is always more accurate', 'secondary data is old data', 'better'],
                  hint: 'Revisit the meaning of statistics in plural sense (c11_stat_cbse_01_001) and the link between.',
                  misconception: 'Students often believe that primary data is inherently "better" or "more accurate" than secondary data, leading them to always prefer.' },
                { id: 'b', prompt: 'A researcher uses data from the "Census of India 2011" to analyse population growth trends. Is this primary or secondary data for the researcher?', answer: 'This is secondary data',
                  options: ['This is secondary data', 'official', 'large-scale', 'better'],
                  hint: 'Revisit the meaning of statistics in plural sense (c11_stat_cbse_01_001) and the link between.',
                  misconception: 'Students often believe that primary data is inherently "better" or "more accurate" than secondary data, leading them to always prefer.' },
                { id: 'c', prompt: 'You want to study the impact of a new mobile banking app on the saving habits of street vendors in your city.', answer: 'Step 1: Use direct personal investigation (structured interview schedule)',
                  options: ['Step 1: Use direct personal investigation (structured interview schedule)', 'mailed questionnaire', 'using bank records', 'better'],
                  hint: 'Revisit the meaning of statistics in plural sense (c11_stat_cbse_01_001) and the link between.',
                  misconception: 'Students often believe that primary data is inherently "better" or "more accurate" than secondary data, leading them to always prefer.' },
                { id: 'd', prompt: 'Compare the suitability of primary vs secondary data for studying: (a) the current consumer sentiment about a newly launched electric vehicle, and (b) the.', answer: 'the current consumer sentiment about a newly launched electric vehicle, and (',
                  options: ['the current consumer sentiment about a newly launched electric vehicle, and (', 'better', 'more accurate'],
                  hint: 'Revisit the meaning of statistics in plural sense (c11_stat_cbse_01_001) and the link between.',
                  misconception: 'Students often believe that primary data is inherently "better" or "more accurate" than secondary data, leading them to always prefer.' }
          ],
            remediations: { 'primary-data-is-inherently-better': { steps: ['If a student insists primary data is always better, guide them through a cost-benefit comparison: ask them to estimate.', 'Then show how the Census uses a complete enumeration with standardized definitions, while their survey would suffer.', 'Finally, ask them to identify one situation where primary data is indispensable (e.g., "student satisfaction with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
