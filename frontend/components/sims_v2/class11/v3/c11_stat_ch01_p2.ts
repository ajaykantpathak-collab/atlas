import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch01_p2: SimDef = {
    id: 'v3_c11_stat_ch01_p2',
    title: 'Introduction to Statistics · Part 2/2',
    subtitle: 'Learn that the word \'statistics\' carries two meanings — and qualitative counts.',
    classLevel: 11, subject: 'statistics', topic: 'Introduction to Statistics · Part 2/2',
    chapters: ['c11_stat_ch01'],
    nodeIds: ['c11_stat_cbse_01_007', 'c11_stat_cbse_01_008', 'c11_stat_cbse_01_009', 'c11_stat_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a statistician defending the subject\'s borders', intro: 'Is \'statistics\' a number or a science? The answer decides what the subject is even allowed to study.', goal: 'Distinguish singular/plural statistics and qualitative from quantitative data.' },
    discovery: {
        question: '\'Gender\' and \'skill level\' can\'t be statistics — the subject only deals in numbers. True?',
        options: ['No — statistics handles qualitative data too; it classifies and counts attributes just as it measures quantities', 'Yes — no numbers, no statistics', 'Yes — but only at Class 11 level', 'No — because gender can be coded as numbers'],
        answer: 'No — statistics handles qualitative data too; it classifies and counts attributes just as it measures quantities',
        hook: '\'Statistics\' in the singular isn\'t a single number — it\'s the science of collecting, analysing and interpreting data; the plural is the data itself.',
    },
    teaching: [
        { title: 'Population and Sample: Key Distinctions', text: 'In statistics, a **population** (or universe) is the complete collection of all items, individuals, or units that share at least one common characteristic and are the subject of a particular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate singular from plural senses, then judge whether unpredictable human behaviour makes statistical forecasting of GDP useless.',
        labels: ['Population and Sample: Key', 'Variables: Continuous and Discrete', 'Types of Data: Qualitative', 'Stages of Statistical Investigation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_007', title: 'Population and Sample: Key Distinctions',
          caseStudy: { intro: 'Imagine the Government of India wants to estimate the average monthly household expenditure in rural Uttar Pradesh for the year 2024.',
            decisions: [{ prompt: 'A researcher wants to study the literacy rate among adults (age 15+) in a specific district of Bihar.', options: [
                { text: 'Population: All adults (age 15+) in that specific district of Bihar', outcome: 'Population: All adults (age 15+) in that specific district of Bihar.' },
                { text: 'population is the 2,000 adults', outcome: 'Not quite — Students often believe **"Population means the entire country\'s people" and "Sample means a small.', reveals: 'population-means-the-entire-country' },
                { text: 'population is all adults in Bihar', outcome: 'Not quite — Students often believe **"Population means the entire country\'s people" and "Sample means a small.', reveals: 'population-means-the-entire-country' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_008', title: 'Variables: Continuous and Discrete Types',
          caseStudy: { intro: 'Imagine you are surveying 50 households in your neighbourhood.',
            decisions: [{ prompt: 'Define a discrete variable and give one example from economics where the variable is inherently discrete (not made discrete by grouping).', options: [
                { text: 'A discrete variable takes only distinct, separate values (usually integers) with no', outcome: 'A discrete variable takes only distinct, separate values (usually integers) with no intermediate.' },
                { text: 'price of a share', outcome: 'Not quite — Students believe that **any variable involving whole numbers is discrete and any variable with.', reveals: 'any-variable-involving-whole-numbers' },
                { text: 'temperature', outcome: 'Not quite — Students believe that **any variable involving whole numbers is discrete and any variable with.', reveals: 'any-variable-involving-whole-numbers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_009', title: 'Types of Data: Qualitative and Quantitative',
          caseStudy: { intro: 'Imagine you are helping the government design a survey to understand farmer distress in Maharashtra.',
            decisions: [{ prompt: 'State the defining characteristic that distinguishes qualitative data from quantitative data, and give one example of each from an economic.', options: [
                { text: 'Qualitative data describes non-numerical attributes or categories (e.g., crop type:', outcome: 'Qualitative data describes non-numerical attributes or categories (e.g., crop type.' },
                { text: 'qualitative data is about quality', outcome: 'Not quite — Students often believe that any data expressed in numbers is quantitative, and any data expressed.', reveals: 'any-data-expressed-in-numbers' },
                { text: 'low/medium/high income', outcome: 'Not quite — Students often believe that any data expressed in numbers is quantitative, and any data expressed.', reveals: 'any-data-expressed-in-numbers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_010', title: 'Stages of Statistical Investigation',
          caseStudy: { intro: 'Imagine you are a Class 11 student asked by your Economics teacher: "Our school canteen wants to know why students prefer junk food over healthy meals.',
            decisions: [{ prompt: 'A researcher collects data on monthly household expenditure from 500 families in a village.', options: [
                { text: 'She is at the **Summarisation stage** (Stage 3)', outcome: 'She is at the **Summarisation stage** (Stage 3). Before this, she must have completed.' },
                { text: 'Collection stage', outcome: 'Not quite — **Misconception:** "The stages are just a checklist – you can do them in any order, or skip one.', reveals: 'misconception-the-stages-are-just' },
                { text: 'Analysis stage', outcome: 'Not quite — **Misconception:** "The stages are just a checklist – you can do them in any order, or skip one.', reveals: 'misconception-the-stages-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Prepping a stats-in-economics talk, a student defines \'statistics in the singular sense\' as \'a single number like an average\', and for the scope slide writes bullet definitions without examples — \'statistics helps in forecasting\', full stop.',
            decisions: [{ prompt: 'What do the two senses and the scope actually mean?', options: [
                { text: 'Correct the grammar and ground the scope: singular \'statistics\' is the DISCIPLINE — the methods of collecting, analysing and interpreting data; plural \'statistics\' is the numerical data itself. And each scope point needs a decision context: forecasting means WHAT is forecast (future demand), WHY (production targets) and WHICH data (past consumption, income) — e.g., RBI forecasting inflation to set the repo rate.', outcome: 'The talk gains substance: the discipline isn\'t one number, and applications live at the variable-and-decision level, not in bullet labels.' },
                { text: 'Keep \'a single statistic\' — singular sense must mean one number.', outcome: 'That\'s the grammatical trap: \'statistics\' takes a singular verb when naming the science — the singular sense is the whole method, not one value.', reveals: 'singular-is-one-number' },
                { text: 'Keep the generic bullets — the scope list is meant to be memorised.', outcome: 'Each bullet hides a decision: \'forecasting\' without variable, purpose and data is a slogan — examiners want \'crop-yield data fixing MSP\', not \'helps policies\'.', reveals: 'scope-is-memorised-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'Economics without statistics is intuition; governments plan crops, budgets and inflation targets on the forecasts intuition can\'t give.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_007', difficulty: 'standard',
          question: 'In statistics, a **population** (or universe) is the complete collection of all.',
          hint: 'Revisit "Sources of Data: Primary and Secondary Data" (c11_stat_cbse_01_006) to see how.',
          misconception: 'Students often believe **"Population means the entire country\'s people" and "Sample means a small number"**.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study the literacy rate among adults (age 15+) in a specific district of Bihar.', answer: 'Population: All adults (age 15+) in that specific district of Bihar',
                  options: ['Population: All adults (age 15+) in that specific district of Bihar', 'population is the 2,000 adults', 'population is all adults in Bihar', 'Population means the entire country\'s people'],
                  hint: 'Revisit "Sources of Data: Primary and Secondary Data" (c11_stat_cbse_01_006) to see how data.',
                  misconception: 'Students often believe **"Population means the entire country\'s people" and "Sample means a small number"**.' }
          ],
            remediations: { 'population-means-the-entire-country': { steps: ['If a student exhibits this misconception: (1) Give them three distinct research questions (e.g., "average height.', '(2) For each, ask: "Write the *exact* population definition in one sentence.', 'Does \'population\' mean the same thing in all three?" (3) Force them to identify the *sampling frame* for each (school.', '(4) Then ask: "If you measure 100 units in each study, is the sample size \'small\' in all three?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"Population means the entire country\'s people" and "Sample means a small number"**.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If we increase the sample size from 1,000 to 10,000, the sampling error will definitely decrease, so we should always take the largest.', answer: 'The argument is partially correct but dangerously incomplete',
                  options: ['The argument is partially correct but dangerously incomplete', 'Population means the entire country\'s people', 'Sample means a small number'],
                  hint: 'Revisit "Sources of Data: Primary and Secondary Data" (c11_stat_cbse_01_006) to see how data.',
                  misconception: 'Students often believe **"Population means the entire country\'s people" and "Sample means a small number"**.' },
                { id: 'b', prompt: 'Design a **hypothetical** sample survey to estimate the average daily screen time (in hours) of Class 11 students in *your* city.', answer: 'Target population definition (include inclusion/exclusion criteri',
                  options: ['Target population definition (include inclusion/exclusion criteri', 'Population means the entire country\'s people', 'Sample means a small number'],
                  hint: 'Revisit "Sources of Data: Primary and Secondary Data" (c11_stat_cbse_01_006) to see how data.',
                  misconception: 'Students often believe **"Population means the entire country\'s people" and "Sample means a small number"**.' }
          ],
            remediations: { 'population-means-the-entire-country': { steps: ['If a student exhibits this misconception: (1) Give them three distinct research questions (e.g., "average height.', '(2) For each, ask: "Write the *exact* population definition in one sentence.', 'Does \'population\' mean the same thing in all three?" (3) Force them to identify the *sampling frame* for each (school.', '(4) Then ask: "If you measure 100 units in each study, is the sample size \'small\' in all three?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_008', difficulty: 'standard',
          question: 'A variable is a characteristic or attribute that can be measured or observed.',
          hint: 'Revisit Class 6 Maths: "Integers on the Number Line" (c6_math_ch02_017) for discrete.',
          misconception: 'Students believe that **any variable involving whole numbers is discrete and any variable with decimals.',
          parts: [
                { id: 'a', prompt: 'A researcher records "number of times a family visits a ration shop in a month" and "quantity of wheat (in kg) purchased per visit".', answer: 'Visits: discrete (countable whole numbers)',
                  options: ['Visits: discrete (countable whole numbers)', 'yes, it becomes discrete'],
                  hint: 'Revisit Class 6 Maths: "Integers on the Number Line" (c6_math_ch02_017) for discrete gaps, and.',
                  misconception: 'Students believe that **any variable involving whole numbers is discrete and any variable with decimals is continuous**.' },
                { id: 'b', prompt: 'Compare the following two scenarios and identify which variable is discrete and which is continuous.', answer: '(a) Discrete — counting yields integers (0, 1, 2...)',
                  options: ['(a) Discrete — counting yields integers (0, 1, 2...)', 'trees are whole', 'height can be measured'],
                  hint: 'Revisit Class 6 Maths: "Integers on the Number Line" (c6_math_ch02_017) for discrete gaps, and.',
                  misconception: 'Students believe that **any variable involving whole numbers is discrete and any variable with decimals is continuous**.' }
          ],
            remediations: { 'any-variable-involving-whole-numbers': { steps: ['**Concrete sorting activity**: Give 15 cards with attributes (e.g., "pages in a book", "weight of a book", "ISBN of.', 'Student sorts into two piles: "Counting" vs.', '**Measurement simulation**: Use a ruler to measure a pencil (continuous) vs.', 'count pencils in a box (discrete).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_009', difficulty: 'standard',
          question: 'Qualitative data (also called categorical data) describes attributes.',
          hint: 'Revisit c11_stat_cbse_01_008 (Variables: Continuous and Discrete Types) and practice.',
          misconception: 'Students often believe that any data expressed in numbers is quantitative, and any data expressed in words.',
          parts: [
                { id: 'a', prompt: 'A researcher records the following for 50 households: (i) religion, (ii) monthly electricity consumption in kWh, (iii) type of ration card (APL/BPL/AAY), (iv).', answer: '(i) Religion – qualitative, nominal (no natural order)',
                  options: ['(i) Religion – qualitative, nominal (no natural order)', 'countable units'],
                  hint: 'Revisit c11_stat_cbse_01_008 (Variables: Continuous and Discrete Types) and practice identifying.',
                  misconception: 'Students often believe that any data expressed in numbers is quantitative, and any data expressed in words is qualitative.' }
          ],
            remediations: { 'any-data-expressed-in-numbers': { steps: ['Ask the student: "Can you meaningfully add, subtract, or average these values?', 'Contrast with a true quantitative variable: "If household incomes are ₹20,000 and ₹40,000, is ₹30,000 a meaningful.', 'Have them practice with 10 mixed examples (Aadhaar number, year, temperature, rating 1-5, blood group, etc.), forcing.', 'Explicitly teach that nominal numbers (ID codes, years as labels) are qualitative; ordinal numbers (ranks, Likert.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_01_010', difficulty: 'standard',
          question: 'The stages of statistical investigation form a systematic, sequential process.',
          hint: 'If stuck, revisit c11_stat_cbse_01_008 and c11_stat_cbse_01_009 to clarify variable.',
          misconception: '**Misconception:** "The stages are just a checklist – you can do them in any order, or skip one if you\'re short.',
          parts: [
                { id: 'a', prompt: 'A researcher collects data on monthly household expenditure from 500 families in a village.', answer: 'She is at the **Summarisation stage** (Stage 3)',
                  options: ['She is at the **Summarisation stage** (Stage 3)', 'Collection stage', 'Analysis stage', 'Collection stage" or "Analysis stage'],
                  hint: 'If stuck, revisit c11_stat_cbse_01_008 and c11_stat_cbse_01_009 to clarify variable types, and.',
                  misconception: '**Misconception:** "The stages are just a checklist – you can do them in any order, or skip one if you\'re short on time." **Why students.' }
          ],
            remediations: { 'misconception-the-stages-are-just': { steps: ['**Step-by-step remediation:** 1.', '**Confront the reversal:** Give the student a scrambled set of 20 raw survey responses (e.g., "3, 5, 2, 4, 1, 5, 3...").', 'Point out: "You just did Stage 2 before Stage 3.', 'Could you have done Stage 3 first?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
