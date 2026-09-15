import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch08_p2: SimDef = {
    id: 'v3_c11_eco_ch08_p2',
    title: 'Comparative Development Experiences of India and Its Neighbours · Part 2/2',
    subtitle: 'Read the India-Pakistan-China comparison as a contest of strategies, not just growth rates.',
    classLevel: 11, subject: 'economics', topic: 'Comparative Development Experiences of India and Its Neighbours · Part 2/2',
    chapters: ['c11_eco_ch08'],
    nodeIds: ['c11_eco_cbse_08_007', 'c11_eco_cbse_08_008', 'c11_eco_cbse_08_009', 'c11_eco_cbse_08_010', 'c11_eco_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a development economist comparing three cousins\' trajectories', intro: 'Same start line around 1950, three different scorecards. Ask which policies aged well — and which aged fast.', goal: 'Compare the development strategies and outcomes of India, China and Pakistan.' },
    discovery: {
        question: 'China outlives and out-educates India on every human development table. A common story credits the 1978 market reforms. What does the timing show?',
        options: ['The gains were built pre-1978 — commune health schemes, barefoot doctors and universal primary schooling created the capacity reforms later exploited', 'Correct — markets alone produced the health and literacy lead', 'China\'s lead is just statistical inflation', 'India actually matches China once income is adjusted'],
        answer: 'The gains were built pre-1978 — commune health schemes, barefoot doctors and universal primary schooling created the capacity reforms later exploited',
        hook: 'Reforms released growth; they didn\'t build the capacity — that was decades of health, schooling and land equity laid earlier.',
    },
    teaching: [
        { title: 'Human Development Indicators: HDI Ranking and Components', text: 'The Human Development Index (HDI) is a composite statistic of life expectancy, education (mean years of schooling and expected years of schooling), and per capita income (GNI per capita at PPP).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Use the rule of 70 on Pakistan\'s 1.96% population growth versus China\'s -0.10%, then separate what pre- and post-reform China each contributed.',
        labels: ['Human Development Indicators: HDI', 'Human Development: Literacy, Life', 'China\'s Great Leap Forward', 'Pakistan\'s Development Path: Mixed', 'Lessons from Chinese'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_007', title: 'Human Development Indicators: HDI Ranking and Components',
          scaffold: { problem: 'Using Table 8.5 data, calculate the Education Index for India given: Mean Years of Schooling (MYS) = 6.9 years, Expected Years of Schooling.',
            steps: [
            { text: 'Identify the formula for Education Index components: MYSI = (MYS - 0) / (15 - 0); EYSI = (EYS - 0) / (18 - 0).' },
            { text: 'Calculate MYSI for India: MYSI = (6.9 - 0) / 15 = 6.9 / 15 = 0.460' },
            { text: 'Calculate EYSI for India: EYSI = (12.2 - 0) / 18 = 12.2 / 18 = 0.678' },
            { text: 'Compute Education Index: (0.460 + 0.678) / 2 = 1.138 / 2 = 0.569' },
            { text: 'Interpret: India\'s Education Index of 0.569 indicates it has achieved 56.9% of the maximum possible education.', faded: true, blankAnswer: 'Education Index for India = 0.569 (MYSI = 0.460, EYSI.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_008', title: 'Human Development: Literacy, Life Expectancy and Health',
          scaffold: { problem: 'Using Table 8.5 data, compute the "Health Sub-Index" for India, China, and Pakistan using the UNDP\'s current goalpost method (life.',
            steps: [
            { text: 'Identify life expectancy values from Table 8.5: India = 72.0, China = 78.0, Pakistan = 67.6 years.' },
            { text: 'Recall the health sub-index formula: I_Health = (LE - 20) / (85 - 20) = (LE - 20) / 65.' },
            { text: 'Calculate for India: I_Health = (72.0 - 20) / 65 = 52.0 / 65 = 0.800.' },
            { text: 'Calculate for China: I_Health = (78.0 - 20) / 65 = 58.0 / 65 = 0.892.' },
            { text: 'Calculate for Pakistan: I_Health = (67.6 - 20) / 65 = 47.6 / 65 = 0.732.' },
            { text: 'Interpret: China\'s health sub-index (0.892) is 11.5% higher than India\'s (0.800) and 21.9% higher than Pakistan\'s.', faded: true, blankAnswer: 'India = 0.800, China = 0.892, Pakistan = 0.732.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_009', title: 'China\'s Great Leap Forward and Economic Reforms',
          caseStudy: { intro: 'Imagine a Chinese village in 1958 where families surrender their cooking pots to melt into useless "backyard steel" while farming collectively on communes with.',
            decisions: [{ prompt: 'What were the two main components of the Great Leap Forward campaign launched in 1958 in China?', options: [
                { text: 'The two main components were the establishment of backyard industries (especially', outcome: 'The two main components were the establishment of backyard industries (especially small-scale steel.' },
                { text: 'household responsibility system', outcome: 'Not quite — Students often conflate the Great Leap Forward (a top-down forced collectivization and.', reveals: 'students-often-conflate-the-great' },
                { text: 'special economic zones', outcome: 'Not quite — Students often conflate the Great Leap Forward (a top-down forced collectivization and.', reveals: 'students-often-conflate-the-great' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_010', title: 'Pakistan\'s Development Path: Mixed Economy and Reforms',
          scaffold: { problem: 'Using Table 8.2, compute the average annual GDP growth rate for Pakistan during 1980-90 and 2015-17.',
            steps: [
            { text: 'From Table 8.2, Pakistan\'s average annual GDP growth: 1980-90 = 6.3%, 2015-17 = 5.3%.' },
            { text: 'From Table 8.3, Pakistan 2022 sectoral shares: Agriculture GVA 24%, workforce 36%; Industry GVA 21%, workforce 26%.' },
            { text: 'Compute productivity ratio = (GVA share %) / (Workforce share %). Agriculture: 24/36 = 0.67. Industry: 21/26 = 0.81.' },
            { text: 'Compare ratios: Agriculture productivity is 33% below average, industry 19% below, services 45% above.' },
            { text: 'Interpret: Pakistan\'s workforce has not shifted adequately from agriculture to industry (industry workforce share only.', faded: true, blankAnswer: 'Growth decline = 1.0 percentage point. Productivity ratios.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_011', title: 'Lessons from Chinese and Pakistani Reforms for India',
          caseStudy: { intro: 'Imagine you are advising the Indian Finance Ministry in 2025: India\'s manufacturing share in GVA is stuck at 28% (Table 8.3) while China\'s is 38%, and India\'s.',
            decisions: [{ prompt: 'According to NCERT Table 8.2, what was China\'s annual GDP growth rate during 1980–90, and how did it compare to India and Pakistan in the.', options: [
                { text: 'China: 10.3%; India: 5.7%; Pakistan: 6.3%', outcome: 'China: 10.3%; India: 5.7%; Pakistan: 6.3%. A wrong answer (e.g., stating India grew faster) reveals.' },
                { text: 'India grew faster', outcome: 'Not quite — Students believe India\'s 1991 reforms *failed* because China grew faster, ignoring that India\'s.', reveals: 'india-s-1991-reforms-failed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_007', title: 'A real-world call',
          caseStudy: { intro: 'Infrastructure projects — roads, ports — unlock growth but displace communities and cost ecosystems. Every development decision is also a decision about who bears the cost.',
            decisions: [{ prompt: 'Can development be both fast and fair?', options: [
                { text: 'Fast — delays are their own injustice', outcome: 'The urgency answer; \'fast\' has a history of meaning \'fast for some, displaced for others\'.' },
                { text: 'Fair — speed that breaks people isn\'t development', outcome: 'The process answer; slower, and honest that some urgent needs genuinely can\'t wait.' },
                { text: 'Fast where consent is real, slow where it isn\'t', outcome: 'The consent-calibrated answer — the pace should match whether the people affected actually agreed.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a model-UN economics briefing you compare India, Pakistan and China, all starting planned development ~1950. A delegate argues: \'Pakistan grew 6.3% in the 1980s versus India\'s 5.7% — so Pakistan was more developed. And China\'s boom is simple: markets were freed in 1978, so capitalism alone explains it.\'',
            decisions: [{ prompt: 'What\'s wrong with both claims?', options: [
                { text: 'A higher growth rate off a lower base isn\'t a higher development level — Pakistan\'s 1980s spurt didn\'t sustain, and its HDI trails India\'s. And China\'s post-1978 acceleration rode a pre-1978 foundation: communes delivered food equity, barefoot doctors and education built human capital — the capacity that market reforms then unleashed. Timing and institutions, not capitalism alone, explain the divergence.', outcome: 'Development comparison = levels + sustainability + human indicators, not one decade\'s growth rate; and reform success depends on what was built before it.' },
                { text: 'The delegate is right on both counts — faster growth is more development, and 1978 market reform is the whole China story.', outcome: 'Rate ≠ level (base effects, unsustained spurts), and China\'s human-capital groundwork predates the reforms — both claims mistake a snapshot for the path.', reveals: 'growth-rate-equals-development' },
                { text: 'China succeeded only because of its one-party system — democracy is why India lagged.', outcome: 'The comparison doesn\'t support that monocausal claim either: India\'s democratic plan still delivered Green Revolution and institutions; the decisive gap was reform timing (1978 vs 1991) and pre-reform human capital.', reveals: 'democracy-caused-the-gap' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'Three neighbours, one starting line — the scoreboard at 2020 was written by choices made decades apart.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_007', difficulty: 'standard',
          question: 'The Human Development Index (HDI) is a composite statistic of life expectancy.',
          hint: 'Review Class 10 Maths statistics (c10_math_cbse_13_001) for mean calculation methods, and.',
          misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate Health Index for India, China, and Pakistan using the HDI formula: Health Index = (LE - 20) / (85 - 20), where LE is life expectancy.', answer: 'Health Index = (LE - 20) / 65',
                  options: ['Health Index = (LE - 20) / 65', 'HDI ranking directly reflects current government policy effectiveness'],
                  hint: 'Review Class 10 Maths statistics (c10_math_cbse_13_001) for mean calculation methods, and Class 9.',
                  misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.' }
          ],
            remediations: { 'hdi-ranking-directly-reflects-current': { steps: ['Re-read the textbook\'s Section 8.6 "Development Strategies — An Appraisal" paragraph on China: "Before the introduction.', 'Create a two-column table: "Pre-1978 Investments" (barefoot doctors, commune schools, land reform) vs "Post-1978.', 'Map each HDI component in Table 8.5 to the column that primarily drove it - life expectancy and schooling map.', 'Practice explaining why Pakistan\'s post-1988 reforms failed to improve HDI despite similar policy shifts - answer: lack.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "China\'s one-child policy was the primary driver of its superior HDI performance compared to India and Pakistan." Use evidence from Table.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'HDI ranking directly reflects current government policy effectiveness'],
                  hint: 'Review Class 10 Maths statistics (c10_math_cbse_13_001) for mean calculation methods, and Class 9.',
                  misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.' }
          ],
            remediations: { 'hdi-ranking-directly-reflects-current': { steps: ['Re-read the textbook\'s Section 8.6 "Development Strategies — An Appraisal" paragraph on China: "Before the introduction.', 'Create a two-column table: "Pre-1978 Investments" (barefoot doctors, commune schools, land reform) vs "Post-1978.', 'Map each HDI component in Table 8.5 to the column that primarily drove it - life expectancy and schooling map.', 'Practice explaining why Pakistan\'s post-1988 reforms failed to improve HDI despite similar policy shifts - answer: lack.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_008', difficulty: 'standard',
          question: 'Human development indicators—literacy rate, life expectancy at birth, and.',
          hint: 'If confused by "mean years of schooling" vs "literacy rate", revisit c10_eco_cbse_01_006.',
          misconception: 'Students believe "higher GDP growth automatically improves literacy, life expectancy, and health indicators" because.',
          parts: [
                { id: 'a', prompt: 'Using Table 8.5 data, explain why China\'s infant mortality rate (4.8) is less than one-fifth of India\'s (25.5) and Pakistan\'s (51) despite all three countries.', answer: 'China\'s low IMR stems from pre-reform (pre-1978) investments: the commune system',
                  options: ['China\'s low IMR stems from pre-reform (pre-1978) investments: the commune system', 'flow vs stock'],
                  hint: 'If confused by "mean years of schooling" vs "literacy rate", revisit c10_eco_cbse_01_006 (HDI.',
                  misconception: 'Students believe "higher GDP growth automatically improves literacy, life expectancy, and health indicators" because they confuse the.' }
          ],
            remediations: { 'higher-gdp-growth-automatically-improves': { steps: ['Re-read Table 8.5 and note China\'s 1980 life expectancy (68) vs India\'s (54)—the 14-year gap existed *before* China\'s.', 'Plot India\'s IMR decline (1990: 80 → 2023: 25.5) against GDP growth—observe the bend in IMR curve *after* NRHM (2005).', 'Compare workforce formalisation: China\'s manufacturing share (32% workforce, Table 8.3) vs India\'s (26%)—formal jobs.', 'Write one paragraph: "Growth *composition* and *initial social infrastructure stock* determine HDI trajectory, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_009', difficulty: 'standard',
          question: 'The Great Leap Forward (1958–1962) was a Chinese state-led campaign to rapidly.',
          hint: 'Review the definitions of command economy, mixed economy, and market economy from Class 9.',
          misconception: 'Students often conflate the Great Leap Forward (a top-down forced collectivization and industrialization drive) with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Great Leap Forward (1958–1962) was a Chinese state-led campaign to rapidly',
                  options: ['The Great Leap Forward (1958–1962) was a Chinese state-led campaign to rapidly', 'Comparative development analysis is the systematic examination of economic and human', 'Economic reforms refer to deliberate policy changes initiated by governments to improve', 'Demographic indicators are quantitative measures that describe the size, structure,'],
                  hint: 'Review the definitions of command economy, mixed economy, and market economy from Class 9.',
                  misconception: 'Students often conflate the Great Leap Forward (a top-down forced collectivization and industrialization drive) with the 1978 reforms (a.' }
          ],
            remediations: { 'students-often-conflate-the-great': { steps: ['If a student conflates the two periods, have them build a two-column table: "Great Leap Forward (1958)" vs "1978.', 'Fill using NCERT: GLF → backyard steel, communes, plan-driven, famine; 1978 → household responsibility, TVEs, dual.', 'Then ask: "Which policy gave farmers surplus claim?', 'Which caused 30 million deaths?" This concrete comparison corrects the confusion by forcing explicit contrast.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_010', difficulty: 'standard',
          question: 'Pakistan\'s development path refers to its adoption of a mixed economy framework.',
          hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 10 Economics Chapter 4.',
          misconception: 'Students often believe Pakistan\'s 1988 reforms were as comprehensive as India\'s 1991 reforms because both involved.',
          parts: [
                { id: 'a', prompt: 'Using Table 8.2, calculate the percentage point decline in Pakistan\'s average annual GDP growth rate between 1980-90 and 2015-17.', answer: 'Decline = 6.3% - 5.3% = 1.0 percentage point',
                  options: ['Decline = 6.3% - 5.3% = 1.0 percentage point', 'liberalisation', 'privatisation'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 10 Economics Chapter 4 (Globalisation.',
                  misconception: 'Students often believe Pakistan\'s 1988 reforms were as comprehensive as India\'s 1991 reforms because both involved "liberalisation" and.' },
                { id: 'b', prompt: 'Compare the sources of foreign exchange earnings for Pakistan and India in the 1980s-90s.', answer: 'Pakistan relied on remittances from Middle-East migrants and exports of volatile',
                  options: ['Pakistan relied on remittances from Middle-East migrants and exports of volatile', 'like export earnings', 'liberalisation', 'privatisation'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 10 Economics Chapter 4 (Globalisation.',
                  misconception: 'Students often believe Pakistan\'s 1988 reforms were as comprehensive as India\'s 1991 reforms because both involved "liberalisation" and.' }
          ],
            remediations: { 'pakistan-s-1988-reforms-were': { steps: ['If a student holds this misconception, have them create a two-column comparison: list India\'s 1991 reform components.', 'Then map each to outcomes using Table 8.2 (growth rates) and Table 8.3 (sectoral shares).', 'Emphasise that Pakistan\'s manufacturing workforce share stayed stuck at 26% from 1980s to 2022, while India\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_011', difficulty: 'standard',
          question: 'Lessons from Chinese and Pakistani reforms for India refer to the comparative.',
          hint: 'If stuck, revisit c11_eco_cbse_08_009 (China\'s reforms) and c11_eco_cbse_08_010.',
          misconception: 'Students believe India\'s 1991 reforms *failed* because China grew faster, ignoring that India\'s reforms were.',
          parts: [
                { id: 'a', prompt: 'According to NCERT Table 8.2, what was China\'s annual GDP growth rate during 1980–90, and how did it compare to India and Pakistan in the same period?', answer: 'China: 10.3%; India: 5.7%; Pakistan: 6.3%',
                  options: ['China: 10.3%; India: 5.7%; Pakistan: 6.3%', 'India grew faster'],
                  hint: 'If stuck, revisit c11_eco_cbse_08_009 (China\'s reforms) and c11_eco_cbse_08_010 (Pakistan\'s.',
                  misconception: 'Students believe India\'s 1991 reforms *failed* because China grew faster, ignoring that India\'s reforms were crisis-forced (BoP crisis).' }
          ],
            remediations: { 'india-s-1991-reforms-failed': { steps: ['Re-read NCERT Section 8.6 "DEVELOPMENT STRATEGIES — AN APPRAISAL" focusing on the *comparative* paragraphs for China.', 'Create a 3-column table: Reform Trigger (voluntary/crisis), Pre-reform Foundation (health/education/land), Sequencing.', 'For each country, write one sentence explaining *why* the outcome followed from the trigger+foundation+sequencing.', 'Attempt Diagnostic Questions 4 and 5 again using this table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
