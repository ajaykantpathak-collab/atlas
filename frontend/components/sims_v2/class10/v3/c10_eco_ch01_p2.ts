import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch01_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch01_p2: SimDef = {
    id: 'v3_c10_eco_ch01_p2',
    title: 'Development · Part 2/2',
    subtitle: 'Discover why \'a better life\' means different things to different people',
    classLevel: 10, subject: 'economics', topic: 'Development · Part 2/2',
    chapters: ['c10_eco_ch01'],
    nodeIds: ['c10_eco_cbse_01_007', 'c10_eco_cbse_01_008', 'c10_eco_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a panchayat advisor deciding how to spend a development fund', intro: 'A district gets money for exactly one project — a watershed, a skill centre, or a cold storage. Every group in the village wants a different one, and each has a point.', goal: 'Explain that development goals vary and conflict, and separate income goals from freedom, equality and security.' },
    discovery: {
        question: 'A mining company offers a tribal district roads, schools and jobs. The Gram Sabha rejects it to protect their forest and way of life. Who understands \'development\' correctly?',
        options: ['Both — development means different things to different people, and their goals can genuinely clash', 'Only the company — roads and jobs are real development, forests are sentimental', 'Only the Gram Sabha — development always means refusing industry', 'Neither — development has one fixed definition that settles this'],
        answer: 'Both — development means different things to different people, and their goals can genuinely clash',
        hook: 'There is no single scoreboard for a good life. A wage, a forest, a safe walk to school — what counts as \'developed\' depends on whose life you\'re measuring.',
    },
    teaching: [
        { title: 'Sustainability of Development: Environmental Concerns', text: 'Sustainability of development refers to a pattern of economic growth that meets the needs of the present generation without compromising the ability of future generations to meet their own needs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Interview four people in a village — a landless labourer, a farmer, a schoolgirl, a factory owner — and prove their versions of \'development\' can\'t all be bought with the same rupee.',
        labels: ['Sustainability of Development: Environmental', 'Body Mass Index (BMI)', 'Limitations of Per Capita'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_007', title: 'Sustainability of Development: Environmental Concerns',
          caseStudy: { intro: 'Imagine a farmer in Punjab who has grown rice-wheat crops for decades using tube wells.',
            decisions: [{ prompt: 'Define "sustainable development" in the context of Class 10 Economics, mentioning the core principle of intergenerational equity.', options: [
                { text: 'Sustainable development is development that meets the needs of the present without', outcome: 'Sustainable development is development that meets the needs of the present without compromising the.' },
                { text: 'protecting the environment', outcome: 'Not quite — Students often believe "sustainable development means zero economic growth or stopping all.', reveals: 'sustainable-development-means-zero-economic' },
                { text: 'planting trees', outcome: 'Not quite — Students often believe "sustainable development means zero economic growth or stopping all.', reveals: 'sustainable-development-means-zero-economic' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_01_008', title: 'Body Mass Index (BMI): Measuring Health and Nutrition',
          scaffold: { problem: 'A 16-year-old girl in a Jharkhand tribal village has height 148 cm and weight 35 kg.',
            steps: [
            { text: 'Convert height to meters: 148 cm = 1.48 m.' },
            { text: 'Square the height: 1.48 × 1.48 = 2.1904 m².' },
            { text: 'Apply BMI formula: BMI = 35 / 2.1904 = 15.98 kg/m².' },
            { text: 'Classify using WHO cut-offs: BMI < 18.5 → Underweight (severe thinness if <16).' },
            { text: 'Interpret: Severe underweight indicates chronic undernutrition; village needs ICDS strengthening, food security, and.', faded: true, blankAnswer: 'BMI = 15.98 kg/m² (Severe underweight); implies urgent need.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_01_009', title: 'Limitations of Per Capita Income as a Development Indicator',
          scaffold: { problem: 'Country Alpha has total GDP ₹2,40,000 crore and population 8 crore. Country Beta has total GDP ₹1,80,000 crore and population 4 crore.',
            steps: [
            { text: 'Identify the formula — Per Capita Income = Total GDP / Population.' },
            { text: 'Calculate for Alpha: ₹2,40,000 crore / 8 crore = ₹30,000 per person.' },
            { text: 'Calculate for Beta: ₹1,80,000 crore / 4 crore = ₹45,000 per person.' },
            { text: 'Note Beta has higher per capita income (₹45,000 > ₹30,000).' },
            { text: 'Interpret Gini: 0.55 (Alpha) = high inequality; 0.30 (Beta) = moderate inequality.' },
            { text: 'Conclude: Despite Alpha\'s lower average, its high inequality means the *median* income (typical citizen) could be far.', faded: true, blankAnswer: '(a) Alpha: ₹30,000; Beta: ₹45,000. (b) Beta\'s typical.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_007', title: 'A real-world call',
          caseStudy: { intro: 'A district can raise its average income by attracting one large factory, or spread the same money across hundreds of small farms. The average looks identical. The lives don\'t.',
            decisions: [{ prompt: 'Is \'development\' the average or the distribution?', options: [
                { text: 'The factory — big growth lifts everyone eventually', outcome: 'The growth-first argument; \'eventually\' is the word every displaced farmer learns to distrust.' },
                { text: 'The farms — development that isn\'t shared isn\'t development', outcome: 'The distribution argument; slower numbers, but the money reaches people who need it now.' },
                { text: 'Both — but in the right order', outcome: 'The sequencing answer — which is really saying: who bears the cost during the transition matters most.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A farming family is offered good money to sell their land to a factory. The son wants to sell — the salary looks big. The grandmother refuses — the land is security, food and their way of life. The daughter wants enough money only to fund her college seat.',
            decisions: [{ prompt: 'Who is \'right\' about what development means here?', options: [
                { text: 'Each is right about their own goal — development means different things to different people. The son seeks higher income, the grandmother seeks security and way of life, the daughter seeks education and opportunity. There is no single \'development\' that fits all three.', outcome: 'This is the core lesson: development goals vary with a person\'s situation — income matters, but so do freedom, security and dignity. What is development for one may be a loss for another.' },
                { text: 'The son is objectively right — whoever brings the highest income defines development, so the family should sell.', outcome: 'Income is only one goal; for the grandmother the lost security and land may outweigh any salary, and income figures alone hide that trade-off.', reveals: 'income-is-development' },
                { text: 'The grandmother is right for everyone — development should always mean protecting land and tradition over money.', outcome: 'Her goals are legitimate for her, but imposing them on the son and daughter makes the same mistake — treating one person\'s goals as universal.', reveals: 'one-goal-fits-all' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_01_009', title: 'You made it',
          caseStudy: { intro: 'Income is a means, not the destination. Real development is a bundle of goals — freedom, equality, security — that sometimes even collide with each other.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_007', difficulty: 'standard',
          question: 'Sustainability of development refers to a pattern of economic growth that meets.',
          hint: 'If stuck, revisit Class 8 node c8_eco_ch1_12 (Sustainable Production: Efficient Use.',
          misconception: 'Students often believe "sustainable development means zero economic growth or stopping all industrial activity.".',
          parts: [
                { id: 'a', prompt: 'Compare the following two development scenarios for a tribal district in Odisha: Scenario A: Allow bauxite mining, generating ₹500 crore/year revenue for 20.', answer: 'Scenario B aligns with sustainable development',
                  options: ['Scenario B aligns with sustainable development', '₹500 crore > ₹80 crore'],
                  hint: 'If stuck, revisit Class 8 node c8_eco_ch1_12 (Sustainable Production: Efficient Use of Resources).',
                  misconception: 'Students often believe "sustainable development means zero economic growth or stopping all industrial activity." In reality, sustainable.' }
          ],
            remediations: { 'sustainable-development-means-zero-economic': { steps: ['If the student holds this misconception, do this 3-step remediation: 1.', 'Show data: India\'s GDP grew ~7% annually (2010-2020) while renewable energy capacity grew from 20 GW to 100+.', 'Use a numerical example: A mine earns ₹100 cr/year for 10 years.', 'If ₹30 cr/year is invested in a solar park yielding ₹10 cr/year forever, future generations get ₹10 cr/year perpetually.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_008', difficulty: 'standard',
          question: 'Body Mass Index (BMI) is a numerical indicator of nutritional status calculated.',
          hint: 'If stuck, review metric unit conversion (cm to m) and practice squaring decimals; also.',
          misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.',
          parts: [
                { id: 'a', prompt: 'State the exact formula for calculating Body Mass Index (BMI) and the standard unit of measurement.', answer: 'BMI = weight in kilograms / (height in meters)²',
                  options: ['BMI = weight in kilograms / (height in meters)²', 'normal'],
                  hint: 'If stuck, review metric unit conversion (cm to m) and practice squaring decimals; also revisit.',
                  misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.' },
                { id: 'b', prompt: 'Calculate the BMI for a 30-year-old male agricultural worker in Punjab with height 1.70 m and weight 85 kg.', answer: 'Step 1: Height² = 1.70 × 1.70 = 2.89 m²',
                  options: ['Step 1: Height² = 1.70 × 1.70 = 2.89 m²', 'normal'],
                  hint: 'If stuck, review metric unit conversion (cm to m) and practice squaring decimals; also revisit.',
                  misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.' },
                { id: 'c', prompt: 'Compare the BMI profiles of two Indian states: Kerala (average BMI 22.1) and Madhya Pradesh (average BMI 19.8).', answer: 'Kerala\'s average (normal range) indicates better overall nutritional access and',
                  options: ['Kerala\'s average (normal range) indicates better overall nutritional access and', 'Kerala is higher', 'normal'],
                  hint: 'If stuck, review metric unit conversion (cm to m) and practice squaring decimals; also revisit.',
                  misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.' }
          ],
            remediations: { 'bmi-directly-measures-body-fat': { steps: ['Revisit the formula: practice 5 calculations with mixed units (cm, kg) converting height to meters first.', 'Plot a simple scatter graph of height vs weight for 10 classmates; draw BMI contour lines (18.5, 25, 30) to visualize.', 'Read the NCERT "Development" chapter box on BMI limitations (page 12-13) and list three specific limitations with.', 'Explain to a peer why BMI alone cannot determine anemia or vitamin D deficiency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.',
          parts: [
                { id: 'a', prompt: 'Critique the argument: "Since BMI is a simple ratio, it should replace per capita income as the primary measure of development because it directly captures.', answer: 'BMI captures only nutritional status, ignoring education, income, gender equity,',
                  options: ['BMI captures only nutritional status, ignoring education, income, gender equity,', 'normal'],
                  hint: 'If stuck, review metric unit conversion (cm to m) and practice squaring decimals; also revisit.',
                  misconception: 'Students often believe BMI directly measures body fat percentage and that a "normal" BMI guarantees good health.' }
          ],
            remediations: { 'bmi-directly-measures-body-fat': { steps: ['Revisit the formula: practice 5 calculations with mixed units (cm, kg) converting height to meters first.', 'Plot a simple scatter graph of height vs weight for 10 classmates; draw BMI contour lines (18.5, 25, 30) to visualize.', 'Read the NCERT "Development" chapter box on BMI limitations (page 12-13) and list three specific limitations with.', 'Explain to a peer why BMI alone cannot determine anemia or vitamin D deficiency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_01_009', difficulty: 'standard',
          question: 'Per capita income is the average income earned per person in a given area in.',
          hint: 'If stuck, revisit c10_eco_cbse_01_004 (Per Capita Income and Comparison of States.',
          misconception: 'Students believe "higher per capita income automatically means better development" and write in exams: *"Punjab is more.',
          parts: [
                { id: 'a', prompt: 'Define per capita income and state the formula used to calculate it.', answer: 'Per capita income = Total National Income / Total Population',
                  options: ['Per capita income = Total National Income / Total Population', 'total income of the country', 'average income of the rich', 'higher per capita income automatically means better development'],
                  hint: 'If stuck, revisit c10_eco_cbse_01_004 (Per Capita Income and Comparison of States in India) and.',
                  misconception: 'Students believe "higher per capita income automatically means better development" and write in exams: *"Punjab is more developed than.' },
                { id: 'b', prompt: 'Two countries, X and Y, have identical per capita income of $10,000.', answer: 'Per capita income is an *average* that masks distribution',
                  options: ['Per capita income is an *average* that masks distribution', 'both are equally developed', 'higher per capita income automatically means better development', 'Punjab is more developed than Kerala'],
                  hint: 'If stuck, revisit c10_eco_cbse_01_004 (Per Capita Income and Comparison of States in India) and.',
                  misconception: 'Students believe "higher per capita income automatically means better development" and write in exams: *"Punjab is more developed than.' }
          ],
            remediations: { 'higher-per-capita-income-automatically': { steps: ['Revisit the Kerala-Punjab comparison table in NCERT (Chapter 1, Table 1.3) — note Kerala\'s lower per capita income but.', 'Draw a Lorenz curve sketch for two imaginary states with same mean income but different inequality — shade the area.', 'List 5 things your family *cannot buy* with money alone (clean air, trust, leisure, dignity, biodiversity) — connect.', 'Attempt Diagnostic Question 4 again, this time writing the limitation *next to* the data column it explains.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
