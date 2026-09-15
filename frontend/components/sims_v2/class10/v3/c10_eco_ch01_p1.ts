import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch01_p1: SimDef = {
    id: 'v3_c10_eco_ch01_p1',
    title: 'Development · Part 1/2',
    subtitle: 'Discover why \'a better life\' means different things to different people',
    classLevel: 10, subject: 'economics', topic: 'Development · Part 1/2',
    chapters: ['c10_eco_ch01'],
    nodeIds: ['c10_eco_cbse_01_001', 'c10_eco_cbse_01_002', 'c10_eco_cbse_01_003', 'c10_eco_cbse_01_004', 'c10_eco_cbse_01_005', 'c10_eco_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a panchayat advisor deciding how to spend a development fund', intro: 'A district gets money for exactly one project — a watershed, a skill centre, or a cold storage. Every group in the village wants a different one, and each has a point.', goal: 'Explain that development goals vary and conflict, and separate income goals from freedom, equality and security.' },
    discovery: {
        question: 'A mining company offers a tribal district roads, schools and jobs. The Gram Sabha rejects it to protect their forest and way of life. Who understands \'development\' correctly?',
        options: ['Both — development means different things to different people, and their goals can genuinely clash', 'Only the company — roads and jobs are real development, forests are sentimental', 'Only the Gram Sabha — development always means refusing industry', 'Neither — development has one fixed definition that settles this'],
        answer: 'Both — development means different things to different people, and their goals can genuinely clash',
        hook: 'There is no single scoreboard for a good life. A wage, a forest, a safe walk to school — what counts as \'developed\' depends on whose life you\'re measuring.',
    },
    teaching: [
        { title: 'Development: Different Notions and Goals of Different People', text: 'Development refers to the process of improving the quality of life and economic well-being of people, which varies across individuals and groups based on their aspirations, needs, and circumstances.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Interview four people in a village — a landless labourer, a farmer, a schoolgirl, a factory owner — and prove their versions of \'development\' can\'t all be bought with the same rupee.',
        labels: ['Development: Different Notions', 'Income and Other Goals', 'National Development: Comparison', 'Per Capita Income', 'Public Facilities: Health, Education', 'Human Development Index (HDI)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_002', title: 'Income and Other Goals: Beyond Money (Freedom, Equality, Security)',
          caseStudy: { intro: 'Imagine two Class 10 students, Rohan and Aisha, both from families earning ₹25,000 per month per capita.',
            decisions: [{ prompt: 'Define "development goals beyond income" in one sentence using the three core dimensions from the chapter.', options: [
                { text: 'Development goals beyond income are the non-monetary aspirations', outcome: 'Development goals beyond income are the non-monetary aspirations — freedom (autonomy in choices).' },
                { text: 'goals like education and health', outcome: 'Not quite — Students think "non-income goals" are just a list of services (education, health, sanitation) and.', reveals: 'non-income-goals-are-just' },
                { text: 'non-income goals', outcome: 'Not quite — Students think "non-income goals" are just a list of services (education, health, sanitation) and.', reveals: 'non-income-goals-are-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_01_003', title: 'National Development: Comparison of Countries by Income',
          scaffold: { problem: 'In 2023, Country Alpha had a Gross National Income (GNI) of $4.2 trillion and a population of 140 million.',
            steps: [
            { text: 'Identify the given data — Country Alpha: GNI = $4.2 trillion = $4,200,000,000,000; Population = 140 million.' },
            { text: 'Recall the PCI formula: PCI = Total GNI / Total Population.' },
            { text: 'Calculate PCI for Alpha: $4,200,000,000,000 ÷ 140,000,000 = $30,000 per person per year.' },
            { text: 'Calculate PCI for Beta: $1,800,000,000,000 ÷ 30,000,000 = $60,000 per person per year.' },
            { text: 'Classify using World Bank thresholds: Alpha\'s PCI $30,000 > $13,845 → **High income**.' },
            { text: 'Explain: Total GNI measures the *size of the economy*, not the *average person\'s income*.', faded: true, blankAnswer: 'Country Alpha PCI = $30,000 (High income); Country Beta PCI.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_01_004', title: 'Per Capita Income and Comparison of States in India',
          scaffold: { problem: 'According to RBI data (2022-23), Karnataka\'s NSDP is ₹22,41,000 crore and its projected population is 6.8 crore.',
            steps: [
            { text: 'Identify the formula: PCI = NSDP ÷ Population.' },
            { text: 'Note given data: NSDP = ₹22,41,000 crore, Population = 6.8 crore.' },
            { text: 'Perform division: 22,41,000 ÷ 6.8 = 3,29,558.82... ≈ ₹3,29,559 (rounded to nearest rupee).' },
            { text: 'Compare with Tamil Nadu\'s PCI: ₹3,29,559 > ₹2,70,000.' },
            { text: 'Conclude: Karnataka has higher Per Capita Income than Tamil Nadu for this year.', faded: true, blankAnswer: 'Karnataka\'s PCI = ₹3,29,559 per annum; Karnataka has higher.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_005', title: 'Public Facilities: Health, Education and Infrastructure',
          caseStudy: { intro: 'Imagine two Class 10 students, Arjun and Meena, both living in families earning ₹15,000 per month.',
            decisions: [{ prompt: 'Define "public facilities" in the context of economic development and give two examples each of physical infrastructure and social.', options: [
                { text: 'Public facilities are essential services and infrastructure provided by the government', outcome: 'Public facilities are essential services and infrastructure provided by the government for.' },
                { text: 'publicly accessible', outcome: 'Not quite — Students believe "public facilities are free goods provided by the government at no cost.', reveals: 'public-facilities-are-free-goods' },
                { text: 'publicly provided', outcome: 'Not quite — Students believe "public facilities are free goods provided by the government at no cost.', reveals: 'public-facilities-are-free-goods' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_01_006', title: 'Human Development Index (HDI): Measurement and Indicators',
          scaffold: { problem: 'Calculate the HDI for a country with the following data: Life Expectancy = 75 years, Mean Years of Schooling = 10 years, Expected Years.',
            steps: [
            { text: 'Identify the three dimensions and their indicators. Health: Life Expectancy (LE) = 75.' },
            { text: 'Recall the goalposts for normalization. Health: min=20, max=85. Education MYS: min=0, max=15.' },
            { text: 'Calculate each dimension index using the normalization formulas.' },
            { text: 'Compute HDI as geometric mean of the three dimension indices.' },
            { text: 'Interpret the result. HDI = 0.809 (rounded to 3 decimals). This places the country in the "Very High Human Development".', faded: true, blankAnswer: 'HDI = 0.809 (Very High Human Development)' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_001', title: 'A real-world call',
          caseStudy: { intro: 'A district can raise its average income by attracting one large factory, or spread the same money across hundreds of small farms. The average looks identical. The lives don\'t.',
            decisions: [{ prompt: 'Is \'development\' the average or the distribution?', options: [
                { text: 'The factory — big growth lifts everyone eventually', outcome: 'The growth-first argument; \'eventually\' is the word every displaced farmer learns to distrust.' },
                { text: 'The farms — development that isn\'t shared isn\'t development', outcome: 'The distribution argument; slower numbers, but the money reaches people who need it now.' },
                { text: 'Both — but in the right order', outcome: 'The sequencing answer — which is really saying: who bears the cost during the transition matters most.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A farming family is offered good money to sell their land to a factory. The son wants to sell — the salary looks big. The grandmother refuses — the land is security, food and their way of life. The daughter wants enough money only to fund her college seat.',
            decisions: [{ prompt: 'Who is \'right\' about what development means here?', options: [
                { text: 'Each is right about their own goal — development means different things to different people. The son seeks higher income, the grandmother seeks security and way of life, the daughter seeks education and opportunity. There is no single \'development\' that fits all three.', outcome: 'This is the core lesson: development goals vary with a person\'s situation — income matters, but so do freedom, security and dignity. What is development for one may be a loss for another.' },
                { text: 'The son is objectively right — whoever brings the highest income defines development, so the family should sell.', outcome: 'Income is only one goal; for the grandmother the lost security and land may outweigh any salary, and income figures alone hide that trade-off.', reveals: 'income-is-development' },
                { text: 'The grandmother is right for everyone — development should always mean protecting land and tradition over money.', outcome: 'Her goals are legitimate for her, but imposing them on the son and daughter makes the same mistake — treating one person\'s goals as universal.', reveals: 'one-goal-fits-all' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Income is a means, not the destination. Real development is a bundle of goals — freedom, equality, security — that sometimes even collide with each other.',
            decisions: [{ prompt: 'What comes next? Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_001', difficulty: 'standard',
          question: 'Development refers to the process of improving the quality of life and economic.',
          hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and.',
          misconception: 'Students often think development means the same thing for everyone – usually equating it with higher income or GDP.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Development refers to the process of improving the quality of life and economic',
                  options: ['Development refers to the process of improving the quality of life and economic', 'Development goals beyond income refer to the non-monetary aspirations that individuals', 'National development comparison by income uses **Per Capita Income (PCI)**', 'Per Capita Income (PCI) of a state is the average income earned per person in that state'],
                  hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and \'Choice.',
                  misconception: 'Students often think development means the same thing for everyone – usually equating it with higher income or GDP growth.' }
          ],
            remediations: { 'development-means-the-same-thing': { steps: ['If a student holds this misconception, use a structured activity: (1) List 5 people from different backgrounds (e.g.', '(2) For each, write their top 3 development goals.', '(3) Identify which goals are common and which conflict.', '(4) Discuss why income alone cannot capture all goals.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_002', difficulty: 'standard',
          question: 'Development goals beyond income refer to the non-monetary aspirations that.',
          hint: 'Revisit Class 9 "Public Goods" (c9_eco_ch1_10) and Class 6 "Social Infrastructure".',
          misconception: 'Students think "non-income goals" are just a list of services (education, health, sanitation) and memorize them.',
          parts: [
                { id: 'a', prompt: 'Define "development goals beyond income" in one sentence using the three core dimensions from the chapter.', answer: 'Development goals beyond income are the non-monetary aspirations',
                  options: ['Development goals beyond income are the non-monetary aspirations', 'goals like education and health', 'non-income goals'],
                  hint: 'Revisit Class 9 "Public Goods" (c9_eco_ch1_10) and Class 6 "Social Infrastructure".',
                  misconception: 'Students think "non-income goals" are just a list of services (education, health, sanitation) and memorize them as separate bullet points.' }
          ],
            remediations: { 'non-income-goals-are-just': { steps: ['Take any service (e.g., mid-day meal).', 'Ask: "Which goal does it serve?" — Security (nutrition), Equality (caste-blind dining), Freedom (child can learn, not.', 'Practice converting 5 services into goal-statements using the template: "______ advances ______ (goal) by ______."', 'Solve 2 case-based questions from CBSE sample papers where the answer requires naming the *goal*, not the service.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "non-income goals" are just a list of services (education, health, sanitation) and memorize them.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "If we ensure high per capita income growth, freedom, equality, and security will automatically follow." Use the concept.', answer: 'The statement is false',
                  options: ['The statement is false', 'trickle-down', 'non-income goals'],
                  hint: 'Revisit Class 9 "Public Goods" (c9_eco_ch1_10) and Class 6 "Social Infrastructure".',
                  misconception: 'Students think "non-income goals" are just a list of services (education, health, sanitation) and memorize them as separate bullet points.' },
                { id: 'b', prompt: 'Design a 3-indicator "Non-Income Development Index" for your district.', answer: 'Example: (1) % women in local governance',
                  options: ['Example: (1) % women in local governance', 'non-income goals'],
                  hint: 'Revisit Class 9 "Public Goods" (c9_eco_ch1_10) and Class 6 "Social Infrastructure".',
                  misconception: 'Students think "non-income goals" are just a list of services (education, health, sanitation) and memorize them as separate bullet points.' }
          ],
            remediations: { 'non-income-goals-are-just': { steps: ['Take any service (e.g., mid-day meal).', 'Ask: "Which goal does it serve?" — Security (nutrition), Equality (caste-blind dining), Freedom (child can learn, not.', 'Practice converting 5 services into goal-statements using the template: "______ advances ______ (goal) by ______."', 'Solve 2 case-based questions from CBSE sample papers where the answer requires naming the *goal*, not the service.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_003', difficulty: 'standard',
          question: 'National development comparison by income uses **Per Capita Income (PCI)**.',
          hint: 'If stuck, revisit Class 8 "Population Density: People Per Square Kilometre".',
          misconception: 'Students believe **higher total national income automatically means a country is more developed**.',
          parts: [
                { id: 'a', prompt: 'Country X has a total national income of $2 trillion and a population of 200 million.', answer: 'Country X PCI = $2,000,000,000,000 / 200,000,000 = $10,000',
                  options: ['Country X PCI = $2,000,000,000,000 / 200,000,000 = $10,000', '$2 trillion > $1.5 trillion', 'Country X because "$2 trillion > $1.5 trillion', '**higher total national income automatically means a country is more developed**'],
                  hint: 'If stuck, revisit Class 8 "Population Density: People Per Square Kilometre" (c8_eco_ch2_5) —.',
                  misconception: 'Students believe **higher total national income automatically means a country is more developed**.' },
                { id: 'b', prompt: 'Two countries, P and Q, have identical Per Capita Income of ₹1,00,000 per year.', answer: 'Country Q likely has better human development outcomes',
                  options: ['Country Q likely has better human development outcomes', 'both are same because PCI is same', '**higher total national income automatically means a country is more developed**'],
                  hint: 'If stuck, revisit Class 8 "Population Density: People Per Square Kilometre" (c8_eco_ch2_5) —.',
                  misconception: 'Students believe **higher total national income automatically means a country is more developed**.' }
          ],
            remediations: { 'higher-total-national-income-automatically': { steps: ['Revisit the definition of Per Capita Income as a *ratio* (total income ÷ population) — not a standalone total.', 'Practice with a table: give 5 country pairs with total income and population; calculate PCI for each; classify using.', 'For each pair, write one sentence: "Although Country X has higher total income, Country Y has higher PCI because..."', 'Connect to Class 8 population density concept (c8_eco_ch2_5): just as population density = people/area, PCI.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_004', difficulty: 'standard',
          question: 'Per Capita Income (PCI) of a state is the average income earned per person.',
          hint: 'If stuck, review c10_eco_cbse_01_003 (national per capita income) and c8_eco_ch2_3.',
          misconception: 'Students believe "higher total state income (NSDP) automatically means higher development level." They write.',
          parts: [
                { id: 'a', prompt: 'State A has NSDP of ₹12 lakh crore and population 8 crore. State B has NSDP of ₹4 lakh crore and population 1 crore. Which state has higher Per Capita Income?', answer: 'State A PCI = ₹12,00,000 crore / 8 crore = ₹1,50,000',
                  options: ['State A PCI = ₹12,00,000 crore / 8 crore = ₹1,50,000', 'higher total state income (NSDP) automatically means higher development level', 'Maharashtra is more developed than Punjab', '"higher total state income (NSDP) automatically means higher development level'],
                  hint: 'If stuck, review c10_eco_cbse_01_003 (national per capita income) and c8_eco_ch2_3 (population.',
                  misconception: 'Students believe "higher total state income (NSDP) automatically means higher development level." They write: "Maharashtra is more.' },
                { id: 'b', prompt: 'Calculate the Per Capita Income of a state with NSDP ₹9,50,000 crore and population 19 crore.', answer: 'Step 1: Current PCI = 9,50,000 / 19 = ₹50,000',
                  options: ['Step 1: Current PCI = 9,50,000 / 19 = ₹50,000', 'higher total state income (NSDP) automatically means higher development level', 'Maharashtra is more developed than Punjab', '"higher total state income (NSDP) automatically means higher development level'],
                  hint: 'If stuck, review c10_eco_cbse_01_003 (national per capita income) and c8_eco_ch2_3 (population.',
                  misconception: 'Students believe "higher total state income (NSDP) automatically means higher development level." They write: "Maharashtra is more.' }
          ],
            remediations: { 'higher-total-state-income-nsdp': { steps: ['Revisit the definition: PCI = NSDP ÷ Population.', 'Take two states from RBI\'s latest bulletin (e.g., Gujarat and Haryana).', 'Ask: "If Gujarat\'s NSDP is higher but PCI lower, which average citizen earns more?" Answer using your numbers.', 'Explain in one sentence why total NSDP misleads.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_005', difficulty: 'standard',
          question: 'Public facilities are essential services and infrastructure — such.',
          hint: 'Revisit Class 9 "Public Goods: Characteristics and Government Provision" (c9_eco_ch1_10).',
          misconception: 'Students believe "public facilities are free goods provided by the government at no cost to anyone." In reality, public.',
          parts: [
                { id: 'a', prompt: 'Why does the government need to provide health and education facilities instead of leaving them entirely to private markets?', answer: 'Health and education generate positive externalities',
                  options: ['Health and education generate positive externalities', 'government provides', 'public facility', 'any government service'],
                  hint: 'Revisit Class 9 "Public Goods: Characteristics and Government Provision" (c9_eco_ch1_10) and Class.',
                  misconception: 'Students believe "public facilities are free goods provided by the government at no cost to anyone." In reality, public facilities are.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which correctly explains the Kerala-Punjab development paradox. Justify your choice.', answer: 'Statement Y is correct',
                  options: ['Statement Y is correct', 'public facility', 'any government service'],
                  hint: 'Revisit Class 9 "Public Goods: Characteristics and Government Provision" (c9_eco_ch1_10) and Class.',
                  misconception: 'Students believe "public facilities are free goods provided by the government at no cost to anyone." In reality, public facilities are.' }
          ],
            remediations: { 'public-facilities-are-free-goods': { steps: ['Revisit the Kerala-Punjab data table in the textbook (Chapter 1, Table 1.6).', 'Calculate the "health outcome per ₹1,000 income" ratio for both states — this quantifies efficiency of public spending.', 'Watch the 5-minute CBSE video "Public Facilities: Kerala vs Punjab" (available on DIKSHA).', 'Write a 3-sentence explanation in your own words: "Kerala achieves better health at lower income because ___."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_006', difficulty: 'standard',
          question: 'The Human Development Index (HDI) is a composite statistical measure created.',
          hint: 'If stuck on dimension index normalization, revisit the concept of "goalposts" and.',
          misconception: 'Students believe HDI is simply an average of health, education, and income indices, and that a country can "make up".',
          parts: [
                { id: 'a', prompt: 'State the three dimensions of the Human Development Index (HDI) and the specific indicator used for each dimension in the current UNDP methodology.', answer: 'The three dimensions are: (1) Long and healthy life',
                  options: ['The three dimensions are: (1) Long and healthy life', 'GDP per capita', 'GNI per capita at PPP', 'make up'],
                  hint: 'If stuck on dimension index normalization, revisit the concept of "goalposts" and "normalization.',
                  misconception: 'Students believe HDI is simply an average of health, education, and income indices, and that a country can "make up" for poor health.' },
                { id: 'b', prompt: 'Country X has: Life expectancy at birth = 70 years, Mean years of schooling = 8 years, Expected years of schooling = 14 years, GNI per capita (PPP $) = 10,000.', answer: 'Step 1: Calculate Health Index = (70 - 20) / (85 - 20) = 50/65 = 0.7692',
                  options: ['Step 1: Calculate Health Index = (70 - 20) / (85 - 20) = 50/65 = 0.7692', 'make up', 'uses arithmetic mean for the final step (0'],
                  hint: 'If stuck on dimension index normalization, revisit the concept of "goalposts" and "normalization.',
                  misconception: 'Students believe HDI is simply an average of health, education, and income indices, and that a country can "make up" for poor health.' },
                { id: 'c', prompt: 'Compare two countries: Country A has HDI 0.85 (Health 0.90, Education 0.85, Income 0.80). Country B has HDI 0.85 (Health 0.70, Education 0.90, Income 0.95).', answer: 'Country A has more balanced development',
                  options: ['Country A has more balanced development', 'both are equal because HDI is same', 'make up'],
                  hint: 'If stuck on dimension index normalization, revisit the concept of "goalposts" and "normalization.',
                  misconception: 'Students believe HDI is simply an average of health, education, and income indices, and that a country can "make up" for poor health.' }
          ],
            remediations: { 'hdi-is-simply-an-average': { steps: ['Revisit the geometric mean property: calculate (0.9 × 0.9 × 0.1)^(1/3) = 0.43 vs arithmetic mean = 0.63.', 'Plot the income index function: y = (ln(x) - ln(100)) / (ln(75000) - ln(100)).', 'Read the UNDP rationale: "The geometric mean reflects the fact that the three dimensions are equally essential."', 'Practice one board-style case study where a country\'s HDI rank is lower than its per capita income rank (e.g., India.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
