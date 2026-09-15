import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch02_p2: SimDef = {
    id: 'v3_c11_stat_ch02_p2',
    title: 'Collection of Data · Part 2/2',
    subtitle: 'Learn when yesterday\'s data beats today\'s survey.',
    classLevel: 11, subject: 'statistics', topic: 'Collection of Data · Part 2/2',
    chapters: ['c11_stat_ch02'],
    nodeIds: ['c11_stat_cbse_02_007', 'c11_stat_cbse_02_008', 'c11_stat_cbse_02_009', 'c11_stat_cbse_02_010', 'c11_stat_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher matching method to question, budget and clock', intro: 'The census exists — yet students still want to knock on a crore doors; knowing when existing data suffices is the skill.', goal: 'Choose between primary and secondary data and apply the direct investigation method correctly.' },
    discovery: {
        question: 'Secondary data is just a fallback — always collect primary data when you can. Sound policy?',
        options: ['No — secondary data often wins on cost, time and coverage; the research objective, not the data\'s origin, chooses the method', 'Yes — firsthand is always best', 'Yes — old data is useless', 'No — secondary data is always better'],
        answer: 'No — secondary data often wins on cost, time and coverage; the research objective, not the data\'s origin, chooses the method',
        hook: 'Handing someone a questionnaire isn\'t \'direct personal investigation\' — in DPI the investigator asks aloud and records; the respondent never writes.',
    },
    teaching: [
        { title: 'Random Sampling Methods: Simple, Stratified, and Systematic', text: 'Random sampling is a probability sampling technique where every unit in the population has a known, non-zero chance of being selected.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Pick the right collection method for a tight budget and a dispersed population, then argue three cases where DPI fails to be \'the best.\'',
        labels: ['Random Sampling Methods: Simple,', 'Non-Random Sampling Methods: Purposive,', 'Sampling Errors: Meaning', 'Non-Sampling Errors: Meaning', 'Census of India'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_02_007', title: 'Random Sampling Methods: Simple, Stratified, and Systematic',
          scaffold: { problem: '** A village has 450 households listed in a Gram Panchayat register.',
            steps: [
            { text: 'Identify population size N = 450. Since N is 3-digit, we use 3-digit random numbers (000–999).' },
            { text: 'Define valid range: 001 to 450 (since households numbered 1 to 450). Numbers 000, 451–999 are invalid and skipped.' },
            { text: 'Choose a random starting point in the table. Let\'s start at the first number: 124.' },
            { text: 'Read sequentially. 124 → Valid (≤450) → **Select HH 124**.' },
            { text: 'Next number 837 → Invalid (>450) → Skip.' },
            { text: 'Next number 045 → Valid → **Select HH 045**.' },
            { text: 'Next number 291 → Valid → **Select HH 291**.' },
            { text: 'Next number 360 → Valid → **Select HH 360**.' },
            { text: 'Next number 112 → Valid → **Select HH 112**.' },
            { text: 'Continue until 30 unique households are selected. (First 5: 124, 045, 291, 360, 112).', faded: true, blankAnswer: '** First 5 selected households: **124, 045, 291, 360, 112**.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_008', title: 'Non-Random Sampling Methods: Purposive, Quota, and Convenience',
          caseStudy: { intro: 'Imagine you need to quickly gauge Class 11 students\' opinion on the new Economics textbook but have only 15 minutes before the bell rings.',
            decisions: [{ prompt: 'Define non-random sampling and state the fundamental characteristic that distinguishes it from random sampling in terms of probability.', options: [
                { text: 'Non-random sampling is a method where the investigator selects sample units based on', outcome: 'Non-random sampling is a method where the investigator selects sample units based on judgment.' },
                { text: 'non-random sampling is when you pick randomly but without a computer', outcome: 'Not quite — Students often believe **quota sampling is a type of random sampling** because it "controls for.', reveals: 'quota-sampling-is-a-type' },
                { text: 'random', outcome: 'Not quite — Students often believe **quota sampling is a type of random sampling** because it "controls for.', reveals: 'quota-sampling-is-a-type' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_02_009', title: 'Sampling Errors: Meaning and Sources',
          scaffold: { problem: 'The monthly incomes (in ₹) of 6 households in a village are: 12000, 15000, 18000, 21000, 24000, 27000.',
            steps: [
            { text: 'Identify the population data (N=6) and compute the population parameter μ. Sum = 117000, μ = 117000/6 = 19500.' },
            { text: 'Identify the sample data (n=3) and compute the sample statistic x̄. Sum = 60000, x̄ = 60000/3 = 20000.' },
            { text: 'Apply the sampling error formula: Sampling Error = x̄ - μ = 20000 - 19500 = +500.' },
            { text: 'Interpret the sign: The sample overestimates the true mean by ₹500.' },
            { text: 'Address the second part: Increasing sample size to n=5 reduces the *variability* of possible sampling errors.' },
            { text: 'Verify: For n=5, the only possible samples are the population minus one element.', faded: true, blankAnswer: 'Sampling error = +₹500 (sample mean overestimates.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_010', title: 'Non-Sampling Errors: Meaning and Control',
          caseStudy: { intro: 'Imagine you conduct a census of all 500 households in a village to find average monthly expenditure on education.',
            decisions: [{ prompt: 'State the fundamental difference between sampling error and non-sampling error that determines whether increasing the sample size can.', options: [
                { text: 'Sampling error arises solely from using a subset (sample) instead of the whole population', outcome: 'Sampling error arises solely from using a subset (sample) instead of the whole population and.' },
                { text: 'both decrease with larger samples', outcome: 'Not quite — Students often confuse "sampling bias" (a non-sampling error) with "sampling error" because both.', reveals: 'students-often-confuse-sampling-bias' },
                { text: 'sampling bias', outcome: 'Not quite — Students often confuse "sampling bias" (a non-sampling error) with "sampling error" because both.', reveals: 'students-often-confuse-sampling-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_011', title: 'Census of India and NSSO as Data Sources',
          caseStudy: { intro: 'Imagine you are a policy analyst asked to estimate the current unemployment rate in rural Uttar Pradesh for a government report due next month.',
            decisions: [{ prompt: 'Name the two main national-level agencies in India that collect, process, and tabulate statistical data on socio-economic issues,.', options: [
                { text: 'The two main agencies are Census of India and National Sample Survey Office (NSSO)', outcome: 'The two main agencies are Census of India and National Sample Survey Office (NSSO).' },
                { text: 'more accurate', outcome: 'Not quite — Students often believe that because Census covers the entire population, it is "more accurate" than.', reveals: 'because-census-covers-the-entire' },
                { text: 'CSO or Labour Bureau as the primary ones', outcome: 'Not quite — Students often believe that because Census covers the entire population, it is "more accurate" than.', reveals: 'because-census-covers-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a survey for a school project, a teammate insists: \'Primary data is always better — secondary data is a fallback. Government publications are primary since they\'re authoritative. And handing respondents a printed form to fill is direct personal investigation.\'',
            decisions: [{ prompt: 'How do data sources and collection modes actually divide?', options: [
                { text: 'Judge by origin and fit: primary = first-hand collection by YOU for your purpose; secondary = already published by others — government data stays secondary however authoritative, and neither is inherently better; the objective, budget and population decide. And mode isn\'t instrument: in direct personal investigation the investigator ASKS and records — a form the respondent fills himself is a self-administered questionnaire, a different mode.', outcome: 'The design improves: source credibility isn\'t collection origin, \'better\' means fit-for-purpose, and who writes the answers defines the method.' },
                { text: 'Stand by \'primary is better\' — first-hand beats reused data, always.', outcome: 'NCERT\'s own point: secondary data saves time and cost — the choice depends on the study\'s objective, not a quality hierarchy.', reveals: 'primary-is-always-better' },
                { text: 'Keep \'authoritative = primary\' — official sources count as first-hand.', outcome: 'Authority isn\'t origin: published government data was collected for ITS purpose — reusing it makes it secondary however credible.', reveals: 'official-source-is-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Primary data answers your exact question at a price; secondary data answers nearly your question for free — choose by objective.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_007', difficulty: 'standard',
          question: 'Random sampling is a probability sampling technique where every unit in the.',
          hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** and.',
          misconception: '**Misconception:** "Stratified sampling means dividing the population into groups and then picking *convenient* samples.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study the yield of wheat across 500 farms in a district.', answer: '**Correct Answer:**',
                  options: ['**Correct Answer:**', 'quota sampling'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** and **c9_math_ch7_1.',
                  misconception: '**Misconception:** "Stratified sampling means dividing the population into groups and then picking *convenient* samples from each group.".' },
                { id: 'b', prompt: 'You have a sampling frame of 2,500 students (listed alphabetically) and need a sample of 100 using Systematic Random Sampling.', answer: '**Correct Answer:** Step 1: *k* = *N*/*n* = 2500/100 = **25**',
                  options: ['**Correct Answer:** Step 1: *k* = *N*/*n* = 2500/100 = **25**', 'the list must be random'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** and **c9_math_ch7_1.',
                  misconception: '**Misconception:** "Stratified sampling means dividing the population into groups and then picking *convenient* samples from each group.".' }
          ],
            remediations: { 'misconception-stratified-sampling-means-dividing': { steps: ['**Step-by-step remediation:** 1.', '**Revisit the definition:** Ask the student to write the definition of SRS from memory.', 'Highlight "every possible sample has equal probability".', '**Contrast with quota:** Present two scenarios: (A) Researcher randomly selects 10 from skilled list using random.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Stratified sampling means dividing the population into groups and then picking *convenient* samples.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Systematic Random Sampling is superior to Simple Random Sampling because it spreads the sample evenly across the population.', answer: '**Correct Answer:** The statement is **false**',
                  options: ['**Correct Answer:** The statement is **false**', 'even spread in list order', 'representativeness of population characteristics'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** and **c9_math_ch7_1.',
                  misconception: '**Misconception:** "Stratified sampling means dividing the population into groups and then picking *convenient* samples from each group.".' }
          ],
            remediations: { 'misconception-stratified-sampling-means-dividing': { steps: ['**Step-by-step remediation:** 1.', '**Revisit the definition:** Ask the student to write the definition of SRS from memory.', 'Highlight "every possible sample has equal probability".', '**Contrast with quota:** Present two scenarios: (A) Researcher randomly selects 10 from skilled list using random.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_008', difficulty: 'standard',
          question: 'Non-random sampling is a sampling technique where the selection of units from.',
          hint: 'Revisit c11_stat_cbse_02_007 (Random Sampling Methods) and practice distinguishing.',
          misconception: 'Students often believe **quota sampling is a type of random sampling** because it "controls for subgroups like.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study the spending habits of teenagers in a city.', answer: 'This is **convenience sampling**',
                  options: ['This is **convenience sampling**', 'random sampling because she didn\'t choose names', 'lack of deliberate bias', 'equal probability of selection'],
                  hint: 'Revisit c11_stat_cbse_02_007 (Random Sampling Methods) and practice distinguishing "random.',
                  misconception: 'Students often believe **quota sampling is a type of random sampling** because it "controls for subgroups like stratified sampling." They.' },
                { id: 'b', prompt: 'An NGO needs to survey 200 households in a slum cluster about access to clean water.', answer: 'This is **quota sampling**',
                  options: ['This is **quota sampling**', 'stratified sampling', 'controls for subgroups like stratified sampling', '— confusing'],
                  hint: 'Revisit c11_stat_cbse_02_007 (Random Sampling Methods) and practice distinguishing "random.',
                  misconception: 'Students often believe **quota sampling is a type of random sampling** because it "controls for subgroups like stratified sampling." They.' },
                { id: 'c', prompt: 'Compare and contrast purposive sampling and quota sampling on: (a) basis of subgroup formation, (b) role of investigator\'s judgment, and (c) ability to ensure.', answer: 'basis of subgroup formation, (',
                  options: ['basis of subgroup formation, (', 'both use judgment so they are the same', 'controls for subgroups like stratified sampling', '— confusing'],
                  hint: 'Revisit c11_stat_cbse_02_007 (Random Sampling Methods) and practice distinguishing "random.',
                  misconception: 'Students often believe **quota sampling is a type of random sampling** because it "controls for subgroups like stratified sampling." They.' }
          ],
            remediations: { 'quota-sampling-is-a-type': { steps: ['**Confront the confusion directly**: Draw a two-column table on the board: "Stratified Random Sampling" vs.', '"Quota Sampling." List steps side-by-side: (1) Define strata/quotas, (2) Obtain sampling frame for each stratum, (3).', '**Interview accessible units**.', '**Use a physical demonstration**: Put 20 red and 20 blue balls in a bag (population).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_009', difficulty: 'standard',
          question: 'Sampling error is the difference between a sample statistic (such as the sample.',
          hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** to clarify.',
          misconception: 'Students often believe **sampling error is a "mistake" or "bias" that can be eliminated by being more careful**.',
          parts: [
                { id: 'a', prompt: 'A population consists of 4 values: 10, 20, 30, 40. A researcher draws a sample of size 2: {10, 40}. Calculate the sampling error for the mean.', answer: 'Population mean = (10+20+30+40)/4 = 25',
                  options: ['Population mean = (10+20+30+40)/4 = 25', 'sampling error is never zero', 'mistake', 'sampling error is always positive/non-zero or confuse it with bias'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** to clarify the.',
                  misconception: 'Students often believe **sampling error is a "mistake" or "bias" that can be eliminated by being more careful**.' },
                { id: 'b', prompt: 'Consider a population of 100 students\' heights. You take a random sample of 10 students and compute the sample mean height.', answer: 'The spread (variability) of the 50 sample means would decrease',
                  options: ['The spread (variability) of the 50 sample means would decrease', 'spread increases', 'stays the same', 'mistake'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** to clarify the.',
                  misconception: 'Students often believe **sampling error is a "mistake" or "bias" that can be eliminated by being more careful**.' },
                { id: 'c', prompt: 'In the NCERT example (5 farmers with incomes 500, 550, 600, 650, 700), the population mean is 600. A sample of size 2 gives a sampling error of 50.', answer: 'Possible samples (10 total): (500,550)->mean=525, error=-75',
                  options: ['Possible samples (10 total): (500,550)->mean=525, error=-75', 'mistake'],
                  hint: 'If stuck, revisit **c11_stat_cbse_02_004 (Census vs Sample Investigation)** to clarify the.',
                  misconception: 'Students often believe **sampling error is a "mistake" or "bias" that can be eliminated by being more careful**.' }
          ],
            remediations: { 'sampling-error-is-a-mistake': { steps: ['**Revisit the NCERT example (5 farmers):** Explicitly show that the researcher did nothing "wrong" – they randomly.', 'Ask: "Where is the mistake?" There is none.', '**Contrast with non-sampling error:** Give a concrete scenario: "The investigator accidentally recorded 500 as 50.".', 'Ask the student to classify: "Is this sampling error?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_010', difficulty: 'standard',
          question: 'Non-sampling errors are systematic deviations of survey estimates from true.',
          hint: 'Revisit c11_stat_cbse_02_009 (Sampling Errors) and the Class 10 Statistics chapter.',
          misconception: 'Students often confuse "sampling bias" (a non-sampling error) with "sampling error" because both contain the word.',
          parts: [
                { id: 'a', prompt: 'In a national health survey, the questionnaire asks: "How many times did you visit a doctor in the last year?" Respondents tend to round their answers to the.', answer: 'No, the rounding error will not decrease',
                  options: ['No, the rounding error will not decrease', 'sampling bias', 'sampling error', 'sampling'],
                  hint: 'Revisit c11_stat_cbse_02_009 (Sampling Errors) and the Class 10 Statistics chapter.',
                  misconception: 'Students often confuse "sampling bias" (a non-sampling error) with "sampling error" because both contain the word "sampling." They think.' }
          ],
            remediations: { 'students-often-confuse-sampling-bias': { steps: ['If a student makes this confusion, do this 3-step remediation: (1) Draw two columns on paper: "Sampling Error" and.', '(2) Create a concrete scenario: "Population = 100 students (60 boys, 40 girls).', 'Sampling frame = only boys\' attendance register.', 'Sample = 30 boys selected randomly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_011', difficulty: 'standard',
          question: 'Census of India is a decennial complete enumeration of the population conducted.',
          hint: 'Revisit c11_stat_cbse_02_004 (Census vs Sample Investigation) and c11_stat_cbse_02_010.',
          misconception: 'Students often believe that because Census covers the entire population, it is "more accurate" than NSSO for *all*.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study the trend in literacy rates across Indian states for the period 1991–2021.', answer: 'She should use Census of India for 1991, 2001, 2011',
                  options: ['She should use Census of India for 1991, 2001, 2011', 'more accurate'],
                  hint: 'Revisit c11_stat_cbse_02_004 (Census vs Sample Investigation) and c11_stat_cbse_02_010.',
                  misconception: 'Students often believe that because Census covers the entire population, it is "more accurate" than NSSO for *all* indicators.' }
          ],
            remediations: { 'because-census-covers-the-entire': { steps: ['Ask the student to list three variables collected in Census (e.g., age, sex, literacy) and three in NSSO CES (e.g.', 'Have them compare the questionnaire length: Census ~29 questions vs. NSSO CES ~300+ items.', 'Explain that "accuracy" = 1/(sampling error + non-sampling error); Census eliminates sampling error but amplifies.', 'Assign a mini-case: "Estimate rural poverty line expenditure" – guide them to see that only NSSO has the required.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
