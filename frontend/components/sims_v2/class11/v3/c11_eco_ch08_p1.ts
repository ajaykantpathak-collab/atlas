import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch08_p1: SimDef = {
    id: 'v3_c11_eco_ch08_p1',
    title: 'Comparative Development Experiences of India and Its Neighbours · Part 1/2',
    subtitle: 'Read the India-Pakistan-China comparison as a contest of strategies, not just growth rates.',
    classLevel: 11, subject: 'economics', topic: 'Comparative Development Experiences of India and Its Neighbours · Part 1/2',
    chapters: ['c11_eco_ch08'],
    nodeIds: ['c11_eco_cbse_08_001', 'c11_eco_cbse_08_002', 'c11_eco_cbse_08_003', 'c11_eco_cbse_08_004', 'c11_eco_cbse_08_005', 'c11_eco_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a development economist comparing three cousins\' trajectories', intro: 'Same start line around 1950, three different scorecards. Ask which policies aged well — and which aged fast.', goal: 'Compare the development strategies and outcomes of India, China and Pakistan.' },
    discovery: {
        question: 'China outlives and out-educates India on every human development table. A common story credits the 1978 market reforms. What does the timing show?',
        options: ['The gains were built pre-1978 — commune health schemes, barefoot doctors and universal primary schooling created the capacity reforms later exploited', 'Correct — markets alone produced the health and literacy lead', 'China\'s lead is just statistical inflation', 'India actually matches China once income is adjusted'],
        answer: 'The gains were built pre-1978 — commune health schemes, barefoot doctors and universal primary schooling created the capacity reforms later exploited',
        hook: 'Reforms released growth; they didn\'t build the capacity — that was decades of health, schooling and land equity laid earlier.',
    },
    teaching: [
        { title: 'Comparative Analysis: India, Pakistan and China Background', text: 'Comparative development analysis is the systematic examination of economic and human development trajectories across countries using standardized indicators (GDP growth, sectoral composition.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Use the rule of 70 on Pakistan\'s 1.96% population growth versus China\'s -0.10%, then separate what pre- and post-reform China each contributed.',
        labels: ['Comparative Analysis: India, Pakistan', 'Economic Reforms: India (1991),', 'Demographic Indicators: Population, Birth', 'Demographic Transition: Comparison Across', 'Economic Indicators: GDP Growth', 'Sectoral Growth: Agriculture, Industry'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_001', title: 'Comparative Analysis: India, Pakistan and China Background',
          caseStudy: { intro: 'Imagine you\'re at a family dinner where three cousins — born the same year — share their life stories: one became a doctor (China), one an engineer (India).',
            decisions: [{ prompt: 'What were the starting years of planned development for India, Pakistan, and China, and what common planning instrument did all three adopt?', options: [
                { text: 'India (1951), Pakistan (1956), China (1953)', outcome: 'India (1951), Pakistan (1956), China (1953) — all adopted Five Year Plans.' },
                { text: 'India started in 1947 or China in 1949', outcome: 'Not quite — Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms.', reveals: 'china-s-higher-gdp-growth' },
                { text: 'China\'s higher GDP growth (Table 8', outcome: 'Not quite — Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms.', reveals: 'china-s-higher-gdp-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_002', title: 'Economic Reforms: India (1991), Pakistan (1988) and China (1978)',
          caseStudy: { intro: 'Imagine three neighboring families (India, Pakistan, China) running household economies.',
            decisions: [{ prompt: 'What were the years when economic reforms were initiated in China, Pakistan, and India respectively?', options: [
                { text: 'China: 1978; Pakistan: 1988; India: 1991', outcome: 'China: 1978; Pakistan: 1988; India: 1991. A wrong answer (e.g., swapping years) reveals the student.' },
                { text: 'liberalization packages', outcome: 'Not quite — Students often think all three countries\' reforms were similar "liberalization packages" imposed.', reveals: 'all-three-countries-reforms-were' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_003', title: 'Demographic Indicators: Population, Birth Rate and Death Rate',
          scaffold: { problem: 'Using Table 8.1 data, compute the approximate crude birth rate (CBR) for India if the crude death rate (CDR) is 7 per 1,000 and net.',
            steps: [
            { text: 'Identify given data: Growth rate = 0.81% per year, CDR = 7 per 1,000, NMR ≈ 0, Population = 1,428 million = 1,428,000.' },
            { text: 'Recall formula: Growth rate (%) = (CBR - CDR + NMR) / 10. Rearrange: CBR = (Growth rate × 10) + CDR - NMR.' },
            { text: 'Substitute values: CBR = (0.81 × 10) + 7 - 0 = 8.1 + 7 = 15.1 per 1,000.' },
            { text: 'Calculate annual live births: Births = CBR × Population (in thousands) = 15.1 × 1,428,000 = 21,562,800 ≈ 21.6 million.' },
            { text: 'Interpret economically: Despite below-replacement fertility (TFR 2.0), India adds ~21.6 million people annually due.', faded: true, blankAnswer: 'CBR ≈ 15.1 per 1,000; Annual live births ≈ 21.6 million.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_004', title: 'Demographic Transition: Comparison Across Three Nations',
          scaffold: { problem: 'Using Table 8.1 data, compute the approximate number of females per 1000 males for India, China, and Pakistan.',
            steps: [
            { text: 'Extract sex ratios from Table 8.1: India 930, China 898, Pakistan 948 (females per 1000 males).' },
            { text: 'Compute deficit from biological norm (952): India deficit = 952 - 930 = 22; China deficit = 952 - 898 = 54; Pakistan.' },
            { text: 'Apply to female population: India female pop ≈ 1428m × (930/1930) ≈ 688m; missing women ≈ 688m × (22/930) ≈ 16.3.' },
            { text: 'Interpret: China\'s massive deficit reflects decades of sex-selective abortion under one-child policy; India\'s deficit.' },
            { text: 'Economic implications: Skewed sex ratios lead to marriage squeeze, trafficking, surplus male labour, and reduced female.', faded: true, blankAnswer: 'India: ~16.3 million missing women; China: ~40.1 million.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_005', title: 'Economic Indicators: GDP Growth and Per Capita Income',
          scaffold: { problem: 'Using Table 8.2 and 8.3 data, compute the contribution of each sector to China\'s overall GDP growth in 2014-18.',
            steps: [
            { text: 'Identify sectoral growth rates (g_i) and GVA shares (w_i) for China 2014-18 from Table 8.4 and 8.3: Agri g=3.1%, w=8%.' },
            { text: 'Recall the formula for sectoral contribution to overall GDP growth: Contribution_i = w_i × g_i (where w_i is in decimal.' },
            { text: 'Calculate each sector\'s contribution: Agriculture = 0.08 × 3.1 = 0.248 pp; Industry = 0.38 × 5.3 = 2.014 pp; Services.' },
            { text: 'Sum contributions: 0.248 + 2.014 + 3.834 = 6.096 percentage points ≈ 6.1% overall GDP growth.' },
            { text: 'Interpret: Services contributed 63% (3.834/6.096) of China\'s growth despite industry\'s larger weight, because services.' },
            { text: 'Contrast with India 2014-18 (Table 8.4): Agri 3.1% (w=18%), Ind 6.9% (w=28%), Ser 7.6% (w=54%).', faded: true, blankAnswer: 'China 2014-18 sectoral contributions: Agriculture 0.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_006', title: 'Sectoral Growth: Agriculture, Industry and Services Comparison',
          scaffold: { problem: 'In 2022, Country X has Total GVA = ₹200 lakh crore. Agriculture GVA = ₹36 lakh crore, Industry GVA = ₹56 lakh crore, Services GVA = ₹108.',
            steps: [
            { text: 'Compute sectoral GVA shares: Agriculture = (36/200)×100 = 18%; Industry = (56/200)×100 = 28%; Services = (108/200)×100.' },
            { text: 'Compute sectoral workforce shares: Agriculture = (215/500)×100 = 43%; Industry = (130/500)×100 = 26%; Services.' },
            { text: 'Compute labour productivity (GVA per worker in ₹ lakh): Agriculture = 36 lakh crore / 215 million = 36,00,000 / 215 ≈.' },
            { text: 'Industry-to-agriculture productivity ratio = 4.308 / 1.674 ≈ 2.57.' },
            { text: 'Interpret: Industry worker produces 2.57 times more value than agriculture worker, explaining why shifting labour.', faded: true, blankAnswer: '(a) Agriculture 18%, Industry 28%, Services 54%. (b).' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_001', title: 'A real-world call',
          caseStudy: { intro: 'Infrastructure projects — roads, ports — unlock growth but displace communities and cost ecosystems. Every development decision is also a decision about who bears the cost.',
            decisions: [{ prompt: 'Can development be both fast and fair?', options: [
                { text: 'Fast — delays are their own injustice', outcome: 'The urgency answer; \'fast\' has a history of meaning \'fast for some, displaced for others\'.' },
                { text: 'Fair — speed that breaks people isn\'t development', outcome: 'The process answer; slower, and honest that some urgent needs genuinely can\'t wait.' },
                { text: 'Fast where consent is real, slow where it isn\'t', outcome: 'The consent-calibrated answer — the pace should match whether the people affected actually agreed.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a model-UN economics briefing you compare India, Pakistan and China, all starting planned development ~1950. A delegate argues: \'Pakistan grew 6.3% in the 1980s versus India\'s 5.7% — so Pakistan was more developed. And China\'s boom is simple: markets were freed in 1978, so capitalism alone explains it.\'',
            decisions: [{ prompt: 'What\'s wrong with both claims?', options: [
                { text: 'A higher growth rate off a lower base isn\'t a higher development level — Pakistan\'s 1980s spurt didn\'t sustain, and its HDI trails India\'s. And China\'s post-1978 acceleration rode a pre-1978 foundation: communes delivered food equity, barefoot doctors and education built human capital — the capacity that market reforms then unleashed. Timing and institutions, not capitalism alone, explain the divergence.', outcome: 'Development comparison = levels + sustainability + human indicators, not one decade\'s growth rate; and reform success depends on what was built before it.' },
                { text: 'The delegate is right on both counts — faster growth is more development, and 1978 market reform is the whole China story.', outcome: 'Rate ≠ level (base effects, unsustained spurts), and China\'s human-capital groundwork predates the reforms — both claims mistake a snapshot for the path.', reveals: 'growth-rate-equals-development' },
                { text: 'China succeeded only because of its one-party system — democracy is why India lagged.', outcome: 'The comparison doesn\'t support that monocausal claim either: India\'s democratic plan still delivered Green Revolution and institutions; the decisive gap was reform timing (1978 vs 1991) and pre-reform human capital.', reveals: 'democracy-caused-the-gap' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Three neighbours, one starting line — the scoreboard at 2020 was written by choices made decades apart.',
            decisions: [{ prompt: 'What comes next? Comparative Development Experiences of India and Its Neighbours · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Comparative Development Experiences of India and Its Neighbours · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_001', difficulty: 'standard',
          question: 'Comparative development analysis is the systematic examination of economic and.',
          hint: 'Revisit Class 10 Development chapter (HDI, per capita income limitations) and Class 9.',
          misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s.',
          parts: [
                { id: 'a', prompt: 'What were the starting years of planned development for India, Pakistan, and China, and what common planning instrument did all three adopt?', answer: 'India (1951), Pakistan (1956), China (1953)',
                  options: ['India (1951), Pakistan (1956), China (1953)', 'India started in 1947 or China in 1949', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Revisit Class 10 Development chapter (HDI, per capita income limitations) and Class 9 Economic.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' },
                { id: 'b', prompt: 'Using Table 8.1, calculate how many years it would take for Pakistan\'s population to double at its 2021-23 annual growth rate of 1.96%, and compare with.', answer: 'Pakistan doubling time = 70/1.96 ≈ 35.7 years (Rule of 70)',
                  options: ['Pakistan doubling time = 70/1.96 ≈ 35.7 years (Rule of 70)', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Revisit Class 10 Development chapter (HDI, per capita income limitations) and Class 9 Economic.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' },
                { id: 'c', prompt: 'Table 8.3 shows China\'s industry sector employs 32% of workforce but contributes 38% to GVA, while India\'s industry employs 26% but contributes 28%.', answer: 'China industry productivity ratio = 38/32 = 1.1875',
                  options: ['China industry productivity ratio = 38/32 = 1.1875', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Revisit Class 10 Development chapter (HDI, per capita income limitations) and Class 9 Economic.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' }
          ],
            remediations: { 'china-s-higher-gdp-growth': { steps: ['Re-read Table 8.5 footnote — China\'s poverty 0.0% (2023) vs India/Pakistan 21.9%.', 'Trace this to pre-1978 commune system (equitable food distribution) and rural health network (barefoot doctors).', 'Compare with India\'s pre-1991 license raj (growth 3.5% "Hindu rate") and Pakistan\'s dependence on remittances/volatile.', 'Practice writing: "China\'s growth *accelerated* post-1978, but its human development *foundation* was pre-1978." Use.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_002', difficulty: 'standard',
          question: 'Economic reforms refer to deliberate policy changes initiated by governments.',
          hint: 'Review Class 9 \'Planned Economy vs Market Economy\' and Class 10 \'India\'s Post-1991.',
          misconception: 'Students often think all three countries\' reforms were similar "liberalization packages" imposed by the World Bank/IMF.',
          parts: [
                { id: 'a', prompt: 'What were the years when economic reforms were initiated in China, Pakistan, and India respectively?', answer: 'China: 1978; Pakistan: 1988; India: 1991',
                  options: ['China: 1978; Pakistan: 1988; India: 1991', 'liberalization packages'],
                  hint: 'Review Class 9 \'Planned Economy vs Market Economy\' and Class 10 \'India\'s Post-1991 Economic.',
                  misconception: 'Students often think all three countries\' reforms were similar "liberalization packages" imposed by the World Bank/IMF.' },
                { id: 'b', prompt: 'Compare the role of the agricultural sector in the initial reform phase of China (1978) and India (1991). What does this indicate about their reform strategies?', answer: 'China started reforms in agriculture (household responsibility system)',
                  options: ['China started reforms in agriculture (household responsibility system)', 'liberalization packages'],
                  hint: 'Review Class 9 \'Planned Economy vs Market Economy\' and Class 10 \'India\'s Post-1991 Economic.',
                  misconception: 'Students often think all three countries\' reforms were similar "liberalization packages" imposed by the World Bank/IMF.' }
          ],
            remediations: { 'all-three-countries-reforms-were': { steps: ['If a student conflates the reform triggers, have them create a timeline: 1978 China (no crisis, leadership change).', 'Then map each to the textbook phrases: "China did not have any compulsion...', 'dictated by World Bank and IMF to India and Pakistan." Use the worked example 1 to practice distinguishing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think all three countries\' reforms were similar "liberalization packages" imposed by the World Bank/IMF.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Pakistan\'s reform process led to worsening of all economic indicators." Use evidence from the textbook.', answer: 'The textbook states scholars argue Pakistan\'s reform process worsened economic',
                  options: ['The textbook states scholars argue Pakistan\'s reform process worsened economic', 'liberalization packages'],
                  hint: 'Review Class 9 \'Planned Economy vs Market Economy\' and Class 10 \'India\'s Post-1991 Economic.',
                  misconception: 'Students often think all three countries\' reforms were similar "liberalization packages" imposed by the World Bank/IMF.' }
          ],
            remediations: { 'all-three-countries-reforms-were': { steps: ['If a student conflates the reform triggers, have them create a timeline: 1978 China (no crisis, leadership change).', 'Then map each to the textbook phrases: "China did not have any compulsion...', 'dictated by World Bank and IMF to India and Pakistan." Use the worked example 1 to practice distinguishing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_003', difficulty: 'standard',
          question: 'Demographic indicators are quantitative measures that describe the size.',
          hint: 'If stuck, review c8_eco_ch2_6 (Birth Rate and Death Rate) for rate definitions and.',
          misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0.',
          parts: [
                { id: 'a', prompt: 'Using Table 8.1 data, explain why China\'s population density (150 persons/sq.km) is lower than India\'s (473 persons/sq.km) even though their total populations.', answer: 'Density = Population / Land Area',
                  options: ['Density = Population / Land Area', 'China\'s one-child policy', 'India\'s population problem is solved'],
                  hint: 'If stuck, review c8_eco_ch2_6 (Birth Rate and Death Rate) for rate definitions and c7_math_ch06_062.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' },
                { id: 'b', prompt: 'Compare the sex ratios of the three countries (India 930, China 898, Pakistan 948 females per 1,000 males).', answer: 'All three ratios below 1,000 indicate son preference',
                  options: ['All three ratios below 1,000 indicate son preference', 'poverty', 'illiteracy', 'India\'s population problem is solved'],
                  hint: 'If stuck, review c8_eco_ch2_6 (Birth Rate and Death Rate) for rate definitions and c7_math_ch06_062.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' }
          ],
            remediations: { 'students-often-treat-population-growth': { steps: ['Revisit Class 8 node c8_eco_ch2_6 (Birth Rate and Death Rate) to distinguish crude rates from total fertility rate.', 'Draw a population pyramid for India (broad base) vs China (narrowing base) using age-group data from Class 8.', 'Calculate "population momentum" by applying current age-specific fertility rates to the actual age distribution — this.', 'Practice with the formula: Growth rate = (CBR – CDR)/10 + NMR/10, using CBR derived from age-specific rates × age.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_004', difficulty: 'standard',
          question: 'Demographic transition is the historical shift from high birth and death rates.',
          hint: 'Review Class 8 Economics Chapter 2 (Dynamics of Population) nodes c8_eco_ch2_6 and.',
          misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off.".',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate annual population increase in millions for India and Pakistan using 2021-23 data: India population 1428 million, growth 0.81%.', answer: 'Step 1: India increase = 1428 × 0.0081 = 11.57 million',
                  options: ['Step 1: India increase = 1428 × 0.0081 = 11.57 million', 'developed', 'better off'],
                  hint: 'Review Class 8 Economics Chapter 2 (Dynamics of Population) nodes c8_eco_ch2_6 and c8_eco_ch2_9.',
                  misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off." They confuse the.' }
          ],
            remediations: { 'a-declining-population-growth-rate': { steps: ['Revisit the demographic transition model diagram (Class 8, c8_eco_ch2_8) and label each country\'s approximate position.', 'Calculate old-age dependency ratio proxies: for China, note fertility 1.2 implies fewer future workers per retiree; for.', 'Read NCERT paragraph on "one-child norm implications" (page 139) and list three economic costs of rapid aging.', 'Practice interpreting population pyramids for each stage using c8_math_ch12_12 (line plots) to visualise age structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_005', difficulty: 'standard',
          question: 'GDP Growth Rate measures the annual percentage change in the inflation-adjusted.',
          hint: 'Revisit Class 10 node c10_eco_cbse_01_003 (National Development: Comparison of Countries.',
          misconception: 'Students equate "higher GDP growth rate" with "better economic performance" and assume India\'s 6.5% (2024) beating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'GDP Growth Rate measures the annual percentage change in the inflation-adjusted market',
                  options: ['GDP Growth Rate measures the annual percentage change in the inflation-adjusted market', 'Comparative development analysis is the systematic examination of economic and human', 'Economic reforms refer to deliberate policy changes initiated by governments to improve', 'Demographic indicators are quantitative measures that describe the size, structure,'],
                  hint: 'Revisit Class 10 node c10_eco_cbse_01_003 (National Development: Comparison of Countries by Income).',
                  misconception: 'Students equate "higher GDP growth rate" with "better economic performance" and assume India\'s 6.5% (2024) beating China\'s 5.0% means India.' }
          ],
            remediations: { 'students-equate-higher-gdp-growth': { steps: ['Re-read Table 8.2 and 8.5 together. Compute absolute GDP increment: China 5% × $35T = $1.75T; India 6.5% × $15T.', 'Calculate PCI ratio: 22,029/9,047 = 2.43.', 'Map to structural data (Table 8.3) — China industry productivity ratio = 38/32 = 1.19; India = 28/26 = 1.08.', 'Write one paragraph explaining why "growth rate alone is insufficient" using these four numbers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_006', difficulty: 'standard',
          question: 'Sectoral growth comparison analyses the structural transformation of an economy.',
          hint: 'If stuck, review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
          misconception: 'Students believe that a rising services share in GDP automatically indicates advanced development, confusing.',
          parts: [
                { id: 'a', prompt: 'State the formula for calculating the sectoral share of a country\'s Gross Value Added (GVA) and define each variable.', answer: 'Sectoral Share (%) = (Sectoral GVA / Total GVA) × 100',
                  options: ['Sectoral Share (%) = (Sectoral GVA / Total GVA) × 100', 'structural transformation', 'premature deindustrialisation'],
                  hint: 'If stuck, review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
                  misconception: 'Students believe that a rising services share in GDP automatically indicates advanced development, confusing "structural transformation".' },
                { id: 'b', prompt: 'Explain why a country can have a high share of workforce in agriculture but a low share of agriculture in GVA, using the concept of labour productivity.', answer: 'Labour productivity = Sectoral GVA / Workforce in that sector',
                  options: ['Labour productivity = Sectoral GVA / Workforce in that sector', 'agriculture is backward', 'structural transformation', 'premature deindustrialisation'],
                  hint: 'If stuck, review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
                  misconception: 'Students believe that a rising services share in GDP automatically indicates advanced development, confusing "structural transformation".' },
                { id: 'c', prompt: 'Using Table 8.3 data, calculate the approximate labour productivity ratio (Industry GVA per worker / Agriculture GVA per worker) for India in 2022.', answer: 'Step 1: Agriculture: 43 workers produce 18 GVA → productivity = 18/43 ≈ 0.419',
                  options: ['Step 1: Agriculture: 43 workers produce 18 GVA → productivity = 18/43 ≈ 0.419', 'structural transformation', 'premature deindustrialisation'],
                  hint: 'If stuck, review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
                  misconception: 'Students believe that a rising services share in GDP automatically indicates advanced development, confusing "structural transformation".' },
                { id: 'd', prompt: 'Compare the sectoral growth trajectories of China (1980-90) and India (2014-18) using Table 8.4.', answer: 'China 1980-90: Industry 10.8%, Services 13.5%',
                  options: ['China 1980-90: Industry 10.8%, Services 13.5%', 'structural transformation', 'premature deindustrialisation'],
                  hint: 'If stuck, review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
                  misconception: 'Students believe that a rising services share in GDP automatically indicates advanced development, confusing "structural transformation".' }
          ],
            remediations: { 'a-rising-services-share-in': { steps: ['Revisit Table 8.3 and compute labour productivity (GVA per worker) for each sector in all three countries using the.', 'Plot a simple bar chart comparing productivity ratios (Industry/Agriculture, Services/Agriculture).', 'Read the NCERT paragraph on "In the normal course of development..." and identify the classical sequence.', 'Write a 100-word note explaining why India\'s pattern is called "premature deindustrialisation" using your calculated.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
