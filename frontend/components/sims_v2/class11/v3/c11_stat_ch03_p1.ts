import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch03_p1: SimDef = {
    id: 'v3_c11_stat_ch03_p1',
    title: 'Organisation of Data · Part 1/2',
    subtitle: 'Learn that grouping is a choice, not a format.',
    classLevel: 11, subject: 'statistics', topic: 'Organisation of Data · Part 1/2',
    chapters: ['c11_stat_ch03'],
    nodeIds: ['c11_stat_cbse_03_001', 'c11_stat_cbse_03_002', 'c11_stat_cbse_03_003', 'c11_stat_cbse_03_004', 'c11_stat_cbse_03_005', 'c11_stat_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data organiser deciding what the columns should mean', intro: 'The kabadiwallah sorting junk is classifying; the count per pile is just the receipt — decide the criterion first.', goal: 'Distinguish classification bases and choose array versus distribution correctly.' },
    discovery: {
        question: '500 families, number of children each ranging 0–8 — build a frequency distribution with class intervals?',
        options: ['No — a discrete variable with a tiny range wants a frequency array; grouping 0–8 into classes destroys information', 'Yes — all quantitative data needs classes', 'Yes — 0-2, 3-5, 6-8 will do', 'No — because families aren\'t data'],
        answer: 'No — a discrete variable with a tiny range wants a frequency array; grouping 0–8 into classes destroys information',
        hook: 'Classification is the decision, the frequency table merely its output — choosing \'by state\' versus \'by year\' versus \'by size\' is the actual analysis.',
    },
    teaching: [
        { title: 'Meaning and Objectives of Classification of Data', text: 'Classification of data is the systematic process of arranging raw, unorganised observations into homogeneous groups or classes based on shared characteristics or criteria, thereby transforming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_03_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Classify the same literacy data four ways — chronological, geographical, qualitative, quantitative — then defend why chronology beats labels for a GDP trend.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_001', title: 'Meaning and Objectives of Classification of Data',
          caseStudy: { intro: 'Imagine you are the class representative handed a sheet with the Mathematics marks of all 60 students in your class—written in the order they sat for the exam.',
            decisions: [{ prompt: 'Define \'classification of data\' in your own words and state its primary objective as per the NCERT framework for Class 11 Statistics.', options: [
                { text: 'Classification of data is the process of grouping raw, unorganised observations into', outcome: 'Classification of data is the process of grouping raw, unorganised observations into homogeneous.' },
                { text: 'classification is just making a frequency table', outcome: 'Not quite — Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think.', reveals: 'classification-and-frequency-distribution-are' },
                { text: 'classification is calculating the mean', outcome: 'Not quite — Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think.', reveals: 'classification-and-frequency-distribution-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_002', title: 'Basis of Classification: Chronological, Geographical, Qualitative, Quantitative',
          caseStudy: { intro: 'Imagine you are a policy analyst at NITI Aayog given a massive spreadsheet of raw data on Indian households: their state, year of survey, religion, monthly.',
            decisions: [{ prompt: 'A researcher has collected data on the literacy rate (%) of all Indian states for the year 2021.', options: [
                { text: 'The basis is **Geographical**', outcome: 'The basis is **Geographical** because the data is grouped by spatial location (states).' },
                { text: 'Quantitative', outcome: 'Not quite — Students often confuse the **nature of the variable** (qualitative vs quantitative) with the.', reveals: 'students-often-confuse-the-nature' },
                { text: 'Chronological', outcome: 'Not quite — Students often confuse the **nature of the variable** (qualitative vs quantitative) with the.', reveals: 'students-often-confuse-the-nature' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_003', title: 'Frequency Distribution: Meaning and Construction',
          scaffold: { problem: 'The daily wages (in ₹) of 30 workers in a factory are: 120, 135, 148, 162, 175, 189, 195, 210, 225, 240, 115, 130, 142, 158, 170, 185, 198.',
            steps: [
            { text: 'Identify the range. Minimum wage = ₹115, Maximum wage = ₹250. Range = 250 – 115 = ₹135.' },
            { text: 'Determine class width. Number of classes = 6 (given). Class width = Range / Number of classes = 135 / 6 = 22.5.' },
            { text: 'Set class limits (exclusive method). Start at a multiple of class width below minimum: ₹100.' },
            { text: 'Tally each wage into its class. Example: 120 → 100–125; 135 → 125–150; 148 → 125–150; 162 → 150–175; ...' },
            { text: 'Count tallies to get frequencies. 100–125: 3 (115, 118, 120); 125–150: 5 (130, 135, 138, 142, 148); 150–175: 5 (150.' },
            { text: 'Compute class marks for each class. 100–125: (100+125)/2 = 112.5; 125–150: 137.5; 150–175: 162.5; 175–200: 187.5.', faded: true, blankAnswer: 'Frequency distribution table with classes, tally marks.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_004', title: 'Types of Frequency Distribution: Univariate, Bivariate, Multivariate',
          caseStudy: { intro: 'Imagine you are analysing the performance of 50 students in your school.',
            decisions: [{ prompt: 'A researcher collects data on the monthly income (in ₹) of 200 households in a village.', options: [
                { text: 'This is a **univariate frequency distribution** involving **one variable** (monthly', outcome: 'This is a **univariate frequency distribution** involving **one variable** (monthly income).' },
                { text: 'bivariate', outcome: 'Not quite — **Misconception:** "Bivariate frequency distribution is just two univariate frequency distributions.', reveals: 'misconception-bivariate-frequency-distribution-i' },
                { text: 'two variables', outcome: 'Not quite — **Misconception:** "Bivariate frequency distribution is just two univariate frequency distributions.', reveals: 'misconception-bivariate-frequency-distribution-i' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_005', title: 'Class Intervals: Exclusive and Inclusive Types',
          scaffold: { problem: 'The monthly electricity consumption (in kWh) of 40 households is recorded.',
            steps: [
            { text: 'Identify the gap between upper limit of first class (99) and lower limit of second class (100): Gap = 100 – 99 = 1 kWh.' },
            { text: 'Calculate adjustment factor = Gap / 2 = 1 / 2 = 0.5 kWh.' },
            { text: 'Subtract 0.5 from all lower limits: 50 – 0.5 = 49.5; 100 – 0.5 = 99.5; 150 – 0.5 = 149.5; 200 – 0.5 = 199.5.' },
            { text: 'Add 0.5 to all upper limits: 99 + 0.5 = 99.5; 149 + 0.5 = 149.5; 199 + 0.5 = 199.5; 249 + 0.5 = 249.5.' },
            { text: 'Write exclusive classes: 49.5–99.5, 99.5–149.5, 149.5–199.5, 199.5–249.5.' },
            { text: 'Class mark of third class (150–199 inclusive): (150 + 199) / 2 = 174.5 kWh.' },
            { text: 'Class mark of third class (149.5–199.5 exclusive): (149.5 + 199.5) / 2 = 174.5 kWh. Note: class marks are the same!', faded: true, blankAnswer: 'Exclusive classes: 49.5–99.5, 99.5–149.5, 149.5–199.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_03_006', title: 'Class Limits, Class Boundaries, and Class Marks',
          scaffold: { problem: 'The following inclusive frequency distribution shows the daily wages (in ₹) of 30 workers in a factory.',
            steps: [
            { text: 'Identify that the variable (daily wages) is continuous and the classes are inclusive (gap between 109 and 110).' },
            { text: 'Calculate the adjustment factor: Gap = Lower limit of next class (110) - Upper limit of current class (109) = 1.' },
            { text: 'Subtract 0.5 from all lower limits and add 0.5 to all upper limits to get class boundaries.' },
            { text: 'Compute class marks for each class using adjusted boundaries: (LCB + UCB)/2.' },
            { text: 'Verify that the class marks are equally spaced (difference = 10) and lie exactly midway between boundaries.' },
            { text: 'Present the final exclusive frequency distribution with boundaries and class marks.', faded: true, blankAnswer: 'Exclusive Distribution:' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting project data, a student treats classification and frequency distribution as \'the same thing — tally marks\', and labels state-wise literacy rates \'quantitative classification because literacy is a percentage.\'',
            decisions: [{ prompt: 'What are classification and its bases really about?', options: [
                { text: 'Separate act from output: classification is the conceptual CHOICE of grouping criterion — the kabadiwallah sorting junk into papers, plastics and metals classifies without any frequency table; the frequency distribution is one output of quantitative classification. And the basis follows the GROUPING, not the variable\'s nature: literacy rate grouped by state is geographical classification, however numerical the variable.', outcome: 'He classifies by intent: four bases (chronological, geographical, qualitative, quantitative) answer \'grouped by what?\' — not \'is the data numeric?\'' },
                { text: 'Keep the synonymy — making a frequency table IS classifying.', outcome: 'Frequency tables are one output: qualitative classification produces groups without counts — the conceptual act precedes and exceeds the table.', reveals: 'classification-is-frequency-table' },
                { text: 'Keep \'quantitative\' for literacy rates — percentages are numbers, so it\'s quantitative.', outcome: 'The variable\'s nature isn\'t the criterion: grouping BY state is geographical whatever the variable — the basis names the grouping dimension.', reveals: 'variable-type-is-basis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'A frequency table isn\'t classification — it\'s what classification looks like once you\'ve decided what to group by.',
            decisions: [{ prompt: 'What comes next? Organisation of Data · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Organisation of Data · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_001', difficulty: 'standard',
          question: 'Classification of data is the systematic process of arranging raw, unorganised.',
          hint: 'Revisit Class 8 Maths \'Mean as a Balancing Point\' (c8_math_ch12_1) to see how unorganised.',
          misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Raw data is always better than classified data because classification causes loss of information.', answer: 'The student\'s argument is flawed',
                  options: ['The student\'s argument is flawed', 'constructing a frequency table with tally marks IS classification'],
                  hint: 'Revisit Class 8 Maths \'Mean as a Balancing Point\' (c8_math_ch12_1) to see how unorganised data.',
                  misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency table with tally.' },
                { id: 'b', prompt: 'Given the raw dataset of monthly household expenditures (in ₹) for 10 families: 1800, 2200, 1500, 3100, 2700, 1900, 2400, 2900, 1600, 3300.', answer: 'Step 1: Determine class intervals: 1500–2000, 2000–2500, 2500–3000, 3000–3500',
                  options: ['Step 1: Determine class intervals: 1500–2000, 2000–2500, 2500–3000, 3000–3500', 'no maximum concentration', 'constructing a frequency table with tally marks IS classification'],
                  hint: 'Revisit Class 8 Maths \'Mean as a Balancing Point\' (c8_math_ch12_1) to see how unorganised data.',
                  misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency table with tally.' },
                { id: 'c', prompt: 'Compare and contrast \'Qualitative Classification\' and \'Quantitative Classification\' with respect to: (a) nature of variable, (b) measurability, (c) examples.', answer: 'nature of variable, (',
                  options: ['nature of variable, (', 'income is qualitative', 'swaps examples (e', 'constructing a frequency table with tally marks IS classification'],
                  hint: 'Revisit Class 8 Maths \'Mean as a Balancing Point\' (c8_math_ch12_1) to see how unorganised data.',
                  misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency table with tally.' }
          ],
            remediations: { 'classification-and-frequency-distribution-are': { steps: ['Ask the student to classify their own school bag contents WITHOUT making a table—just physically group items (books.', 'Have them articulate the CRITERION used (e.g., "function: study vs non-study").', 'Show NCERT Example 3 (Population → Male/Female → Married/Unmarried) and ask: "Where is the frequency distribution here?"', 'Clarify: Classification = deciding groups + criterion; Frequency Distribution = counting how many in each group (only.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency.',
          parts: [
                { id: 'a', prompt: 'A researcher has data on the \'number of children per family\' for 500 families (values range 0–8). She wants to present this data.', answer: 'She should use a Frequency Array',
                  options: ['She should use a Frequency Array', 'constructing a frequency table with tally marks IS classification'],
                  hint: 'Revisit Class 8 Maths \'Mean as a Balancing Point\' (c8_math_ch12_1) to see how unorganised data.',
                  misconception: 'Students believe that \'classification\' and \'frequency distribution\' are synonymous—they think constructing a frequency table with tally.' }
          ],
            remediations: { 'classification-and-frequency-distribution-are': { steps: ['Ask the student to classify their own school bag contents WITHOUT making a table—just physically group items (books.', 'Have them articulate the CRITERION used (e.g., "function: study vs non-study").', 'Show NCERT Example 3 (Population → Male/Female → Married/Unmarried) and ask: "Where is the frequency distribution here?"', 'Clarify: Classification = deciding groups + criterion; Frequency Distribution = counting how many in each group (only.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_002', difficulty: 'standard',
          question: 'Classification of data is the process of arranging raw data into groups.',
          hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) and the.',
          misconception: 'Students often confuse the **nature of the variable** (qualitative vs quantitative) with the **basis.',
          parts: [
                { id: 'a', prompt: 'A researcher has collected data on the literacy rate (%) of all Indian states for the year 2021.', answer: 'The basis is **Geographical**',
                  options: ['The basis is **Geographical**', 'Quantitative', 'Chronological', 'any tabular arrangement is time-based'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) and the.',
                  misconception: 'Students often confuse the **nature of the variable** (qualitative vs quantitative) with the **basis of classification**.' },
                { id: 'b', prompt: 'Explain in your own words why the same raw dataset (e.g., Census 2011 data on individuals) can be classified using different bases.', answer: 'Classification basis depends on the *analytical objective*, not the data itself',
                  options: ['Classification basis depends on the *analytical objective*, not the data itself', 'Quantitative is always better'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) and the.',
                  misconception: 'Students often confuse the **nature of the variable** (qualitative vs quantitative) with the **basis of classification**.' },
                { id: 'c', prompt: 'Compare and contrast Qualitative and Quantitative classification using the variable "occupation" from a household survey.', answer: 'How would you create classes for each?',
                  options: ['How would you create classes for each?', 'Quantitative classification of occupation is just grouping by salary'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) and the.',
                  misconception: 'Students often confuse the **nature of the variable** (qualitative vs quantitative) with the **basis of classification**.' }
          ],
            remediations: { 'students-often-confuse-the-nature': { steps: ['**Concrete sorting activity:** Give the student 20 cards with household data (state, year, religion, income).', 'Ask: "Sort these cards to answer: \'Which state had highest income growth 2010-2020?\'" They will sort by state *then*.', '**Force the distinction:** "The variable is INCOME (quantitative).', 'But you just classified by STATE (geographical).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_003', difficulty: 'standard',
          question: 'A frequency distribution is a systematic arrangement of raw data into classes.',
          hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification).',
          misconception: 'Students believe that in the exclusive method, the upper class limit of one class and the lower class limit of the next.',
          parts: [
                { id: 'a', prompt: 'In the exclusive method, a value exactly equal to the upper class limit of a class — say 50 in the class 40–50 — is included in which class: 40–50 or 50–60?', answer: 'In the exclusive method, the value 50 goes to the next class 50–60',
                  options: ['In the exclusive method, the value 50 goes to the next class 50–60', 'upper limit excluded'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) to recall why.',
                  misconception: 'Students believe that in the exclusive method, the upper class limit of one class and the lower class limit of the next class are DIFFERENT.' },
                { id: 'b', prompt: 'Compare the frequency distribution in Example 4 (equal classes of width 10) and Table 3.7 (unequal classes).', answer: 'The central classes have high frequency concentration (63% of data in 40–70)',
                  options: ['The central classes have high frequency concentration (63% of data in 40–70)', 'to make total classes equal', 'random choice'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_001 (Meaning and Objectives of Classification) to recall why.',
                  misconception: 'Students believe that in the exclusive method, the upper class limit of one class and the lower class limit of the next class are DIFFERENT.' }
          ],
            remediations: { 'in-the-exclusive-method': { steps: ['Draw a number line. Mark 0, 10, 20, 30. Ask: "If class 1 is 0–10 (exclusive), it includes 0, 1, ... 9.999.', '"So next class starts at 10. What is its upper limit?" → 20. Write 10–20.', 'Contrast with inclusive: "If class 1 is 0–10 inclusive, it includes 10. Next class must start at 11." Write 11–20.', 'Give 5 raw values including boundaries (e.g., 10, 20, 30) and have student tally into both formats.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_004', difficulty: 'standard',
          question: 'A frequency distribution is classified as **univariate** when it summarises the.',
          hint: 'If stuck, revisit **c11_stat_cbse_03_003 (Frequency Distribution: Meaning and.',
          misconception: '**Misconception:** "Bivariate frequency distribution is just two univariate frequency distributions placed together.',
          parts: [
                { id: 'a', prompt: 'Given the raw paired data below for 10 firms (Sales in lakh ₹, Ad Expenditure in thousand ₹), construct a bivariate frequency distribution using classes: Sales.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'Bivariate Frequency Distribution'],
                  hint: 'If stuck, revisit **c11_stat_cbse_03_003 (Frequency Distribution: Meaning and Construction)**.',
                  misconception: '**Misconception:** "Bivariate frequency distribution is just two univariate frequency distributions placed together — one for rows, one for.' }
          ],
            remediations: { 'misconception-bivariate-frequency-distribution-i': { steps: ['**Step-by-step remediation:** 1.', '**Concrete pairing demo:** Take 5 students\' (Height, Weight) data: (150,45), (155,50), (160,55), (165,60), (170,65).', 'Ask: "If I give you only the Height frequency table and Weight frequency table separately, can you tell me which weight.', '**Show the loss:** Construct the two univariate tables.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_005', difficulty: 'standard',
          question: 'Exclusive class intervals are those in which the upper limit of a class.',
          hint: 'If stuck, revisit c11_stat_cbse_03_004 (Types of Frequency Distribution) to review.',
          misconception: 'Students believe that "exclusive means the upper limit is not included in any class" and "inclusive means both limits.',
          parts: [
                { id: 'a', prompt: 'A frequency distribution shows classes: 10–19, 20–29, 30–39. A data value of 20 is recorded. In which class does it belong if the intervals are inclusive?', answer: 'Inclusive: 20 belongs to 20–29 (both limits included)',
                  options: ['Inclusive: 20 belongs to 20–29 (both limits included)', 'exclusive means the upper limit is not included in any class', 'inclusive means both limits are included in the same class', '20 belongs to 10–19 in exclusive form'],
                  hint: 'If stuck, revisit c11_stat_cbse_03_004 (Types of Frequency Distribution) to review continuous.',
                  misconception: 'Students believe that "exclusive means the upper limit is not included in any class" and "inclusive means both limits are included in the.' }
          ],
            remediations: { 'exclusive-means-the-upper-limit': { steps: ['If the student confuses which limit is excluded/included: Draw a number line.', 'For exclusive 0–10, 10–20: shade 0 to 10 (not including 10), then 10 to 20 (including 10?', 'No — convention: lower included, upper excluded).', 'Show 10 is the START of the second class.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_03_006', difficulty: 'standard',
          question: 'Class limits are the smallest and largest values that can belong to a class.',
          hint: 'Revisit c11_stat_cbse_03_005 (Class Intervals: Exclusive and Inclusive Types) and.',
          misconception: 'Students often believe that class boundaries are only needed when the problem explicitly asks for "exclusive form".',
          parts: [
                { id: 'a', prompt: 'Define lower class limit, upper class limit, and class mark for the class interval 20–30 (exclusive type). Write the formula for class mark.', answer: 'Lower class limit = 20, Upper class limit = 30, Class mark = (20+30)/2 = 25',
                  options: ['Lower class limit = 20, Upper class limit = 30, Class mark = (20+30)/2 = 25', 'exclusive form', 'true class limits', 'class mark is 20 or 30, or using difference instead of sum'],
                  hint: 'Revisit c11_stat_cbse_03_005 (Class Intervals: Exclusive and Inclusive Types) and.',
                  misconception: 'Students often believe that class boundaries are only needed when the problem explicitly asks for "exclusive form" or "true class limits".' },
                { id: 'b', prompt: 'A frequency distribution uses inclusive classes: 10–19, 20–29, 30–39.', answer: 'Gap = lower limit of next class (30) – upper limit of current class (29) = 1',
                  options: ['Gap = lower limit of next class (30) – upper limit of current class (29) = 1', 'exclusive form', 'true class limits'],
                  hint: 'Revisit c11_stat_cbse_03_005 (Class Intervals: Exclusive and Inclusive Types) and.',
                  misconception: 'Students often believe that class boundaries are only needed when the problem explicitly asks for "exclusive form" or "true class limits".' },
                { id: 'c', prompt: 'The following inclusive frequency distribution shows the ages (in years) of 40 teachers in a school: Age: 25–29, 30–34, 35–39, 40–44, 45–49 Frequency: 5, 8.', answer: 'Gap = 30 – 29 = 1 → adjustment = 0.5',
                  options: ['Gap = 30 – 29 = 1 → adjustment = 0.5', 'exclusive form', 'true class limits'],
                  hint: 'Revisit c11_stat_cbse_03_005 (Class Intervals: Exclusive and Inclusive Types) and.',
                  misconception: 'Students often believe that class boundaries are only needed when the problem explicitly asks for "exclusive form" or "true class limits".' },
                { id: 'd', prompt: 'Compare the class marks obtained from the exclusive series 0–10, 10–20, 20–30 with those from the inclusive series 0–9, 10–19, 20–29 after adjustment.', answer: 'Exclusive class marks: 5, 15, 25',
                  options: ['Exclusive class marks: 5, 15, 25', 'exclusive form', 'true class limits'],
                  hint: 'Revisit c11_stat_cbse_03_005 (Class Intervals: Exclusive and Inclusive Types) and.',
                  misconception: 'Students often believe that class boundaries are only needed when the problem explicitly asks for "exclusive form" or "true class limits".' }
          ],
            remediations: { 'class-boundaries-are-only-needed': { steps: ['Ask the student: "If a student\'s height is 159.3 cm, and classes are 150–159, 160–169 (inclusive), which class does.', 'Demonstrate on a number line: mark 159 and 160, show the missing segment.', 'Explain that the adjustment factor = (160-159)/2 = 0.5 splits this gap equally.', 'Have them recalculate class marks for a continuous variable (weight, height, time) with inclusive limits, first without.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
