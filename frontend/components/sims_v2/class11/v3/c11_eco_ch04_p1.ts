import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch04_p1: SimDef = {
    id: 'v3_c11_eco_ch04_p1',
    title: 'Human Capital Formation in India · Part 1/2',
    subtitle: 'Distinguish embodied skill from sellable machines, and investment flow from capital stock.',
    classLevel: 11, subject: 'economics', topic: 'Human Capital Formation in India · Part 1/2',
    chapters: ['c11_eco_ch04'],
    nodeIds: ['c11_eco_cbse_04_001', 'c11_eco_cbse_04_002', 'c11_eco_cbse_04_003', 'c11_eco_cbse_04_004', 'c11_eco_cbse_04_005', 'c11_eco_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist pricing investments in people', intro: '₹50,000: a tractor or a nursing diploma? Both are bets on future returns — but only one walks away on its own feet.', goal: 'Define human capital, contrast it with physical capital, and identify its sources of formation.' },
    discovery: {
        question: 'One father owns a ₹50 lakh loom; another holds a ₹20 lakh engineering degree. Which capital can be sold without its owner showing up?',
        options: ['The loom — human capital is embodied in the person and cannot be transferred separately', 'The degree — certificates can be sold to the highest bidder', 'Both — capital is capital regardless of form', 'Neither — once bought, capital is locked to its owner'],
        answer: 'The loom — human capital is embodied in the person and cannot be transferred separately',
        hook: 'The engineer isn\'t the capital — the skills are. And unlike the loom, they can\'t be leased out or shipped abroad.',
    },
    teaching: [
        { title: 'Human Capital vs Physical Capital: Meaning and Distinction', text: 'Human capital refers to the stock of knowledge, skills, competencies, and health attributes embodied in individuals that enhance their productive capacity and future income-generating potential.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare a machine\'s depreciation against an operator\'s rising productivity, then price a family\'s migration as an investment with a payback period.',
        labels: ['Human Capital vs Physical', 'Human Capital Formation: Sources', 'Human Capital and Economic', 'Education as a Source', 'Health as a Source', 'On-the-Job Training and Human'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_001', title: 'Human Capital vs Physical Capital: Meaning and Distinction',
          scaffold: { problem: 'Ramesh, a 22-year-old B.Com graduate from Delhi, earns ₹4.2 lakh/year.',
            steps: [
            { text: 'Identify all costs (investment outflows). Direct cost = 2 × ₹12L = ₹24L.' },
            { text: 'Model post-MBA earnings stream. First post-MBA salary (year 3) = ₹14L.' },
            { text: 'Calculate PV of post-MBA earnings at start of year 3 using growing annuity formula: PV₃ = 14/(0.08-0.10) × [1.' },
            { text: 'Discount PV₃ back to today (year 0): PV₀ = 465.5 / (1.08)² = 465.5 / 1.1664 = ₹399.1L.' },
            { text: 'Calculate PV of no-MBA earnings (counterfactual). Current salary ₹4.2L growing at 5% (assumed) for 30 years.' },
            { text: 'Incremental PV ΔY = 399.1 - 80.1 = ₹319L. Rate of return r = (319/32.4) × 100 = 984% (total undiscounted return over 30.', faded: true, blankAnswer: 'Approximate annualized internal rate of return = 18.5% per.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_002', title: 'Human Capital Formation: Sources and Process',
          caseStudy: { intro: 'Imagine a farmer in Punjab deciding whether to spend ₹50,000 on a tractor (physical capital) or on his daughter\'s nursing diploma (human capital).',
            decisions: [{ prompt: 'Name the five sources of human capital formation as per the NCERT framework.', options: [
                { text: 'The five sources are: (1) Investment in education, (2) Investment in health, (3)', outcome: 'The five sources are: (1) Investment in education, (2) Investment in health, (3) On-the-job.' },
                { text: 'getting a degree', outcome: 'Not quite — Students often think human capital formation is synonymous with "getting a degree" and that only.', reveals: 'human-capital-formation-is-synonymous' },
                { text: 'only education and health', outcome: 'Not quite — Students often think human capital formation is synonymous with "getting a degree" and that only.', reveals: 'human-capital-formation-is-synonymous' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_003', title: 'Human Capital and Economic Growth: Interrelationship',
          scaffold: { problem: 'In 1991, India\'s real per capita income was ₹15,748 and adult literacy rate was 52.21%.',
            steps: [
            { text: 'Identify the given data: PCI_1991 = 15748, PCI_2018 = 94054, Literacy_1991 = 52.21, Literacy_2018 = 78, n = 27 years.' },
            { text: 'Recall CAGR formula: CAGR = (End Value / Start Value)^(1/n) - 1.' },
            { text: 'Compute PCI CAGR: (94054/15748)^(1/27) - 1 = (5.972)^(0.03704) - 1 ≈ 1.067 - 1 = 0.067 = 6.7% per annum.' },
            { text: 'Compute literacy annual increase: (78 - 52.21) / 27 = 25.79 / 27 ≈ 0.955 percentage points per year.' },
            { text: 'Interpret: Real per capita income grew at 6.7% annually while literacy rose ~1 percentage point annually.', faded: true, blankAnswer: 'CAGR of real per capita income ≈ 6.7% per annum; literacy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_004', title: 'Education as a Source of Human Capital: Returns and Benefits',
          scaffold: { problem: 'Rohan, a Class 12 student in Delhi, faces a choice: (A) Start working immediately at ₹18,000/month with 3% annual wage growth, or (B).',
            steps: [
            { text: 'Identify the incremental cash flows of Option B over Option A.' },
            { text: 'Calculate PV of costs during study years (t=1,2,3): PV_costs = 3,36,000/(1.08) + 3,36,000/(1.08)² + 3,36,000/(1.08)³.' },
            { text: 'Calculate PV of incremental earnings after graduation (t=4 to 38).' },
            { text: 'Incremental earnings grow at 5% (Option B) vs 3% (Option A). The difference grows at approximately 2% per year.' },
            { text: 'PV_benefits = 1,83,804/(0.08-0.02) × [1 - (1.02/1.08)^35] = 30,63,400 × [1 - 0.130] = 30,63,400 × 0.87 = ₹26,65,158.' },
            { text: 'NPV = PV_benefits - PV_costs = 21,16,200 - 8,65,905 = ₹12,50,295. Since NPV > 0, Rohan should pursue the degree.', faded: true, blankAnswer: 'NPV = ₹12,50,295 (positive). Rohan should pursue the.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_005', title: 'Health as a Source of Human Capital: Productivity Link',
          caseStudy: { intro: 'Imagine a daily-wage construction worker in Mumbai who contracts typhoid due to contaminated water.',
            decisions: [{ prompt: 'Define \'social medicine\' as a form of health expenditure and give one example of how it contributes to human capital formation without.', options: [
                { text: 'Social medicine refers to expenditure on spreading health literacy and awareness (e.g.,', outcome: 'Social medicine refers to expenditure on spreading health literacy and awareness (e.g., campaigns.' },
                { text: 'giving free medicines', outcome: 'Not quite — Students often believe that **health expenditure only matters when someone is sick** (curative.', reveals: 'health-expenditure-only-matters-when' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_006', title: 'On-the-Job Training and Human Capital Formation',
          scaffold: { problem: 'An IT firm in Hyderabad provides a 3-month cloud computing certification training to 20 fresh engineers.',
            steps: [
            { text: 'Identify total training cost per engineer = ₹1,20,000.' },
            { text: 'Calculate monthly additional revenue per engineer = ₹2,00,000 - ₹1,50,000 = ₹50,000.' },
            { text: 'Determine bond period in months = 2 years × 12 = 24 months.' },
            { text: 'Compute total additional revenue over bond period = ₹50,000 × 24 = ₹12,00,000.' },
            { text: 'Calculate net gain = Total additional revenue - Training cost = ₹12,00,000 - ₹1,20,000 = ₹10,80,000.' },
            { text: 'Compute rate of return = (Net gain / Training cost) × 100 = (₹10,80,000 / ₹1,20,000) × 100 = 900%.', faded: true, blankAnswer: 'Net gain per engineer = ₹10,80,000; Rate of return = 900%.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'A family can send a bright child to coaching for a competitive exam — expensive, but the exam opens doors — or to a good local college near home. The exam path risks everything on one test.',
            decisions: [{ prompt: 'Is investing in one child at the cost of stability ever justified?', options: [
                { text: 'Yes — human capital is the family\'s real wealth', outcome: 'The investment argument; it works only if the child succeeds — and the family\'s risk if they don\'t is real.' },
                { text: 'No — security first, ambition within means', outcome: 'The prudent path; but \'within means\' can quietly cap what a bright child from a poor family is allowed to attempt.' },
                { text: 'Invest — but never make the child carry the whole family\'s hope', outcome: 'The emotionally honest answer — the financial bet may be right; the weight placed on one teenager is the part to refuse.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbours debate investments: one buys a ₹15 lakh printing machine for his press; the other spends ₹15 lakh on his daughter\'s engineering degree. At the society meeting the first says: \'Mine is real capital — it can be sold anytime. A degree isn\'t capital at all; it can\'t even be resold.\'',
            decisions: [{ prompt: 'Who holds capital, and of what kind?', options: [
                { text: 'Both hold capital, of different kinds: the machine is physical capital — separable, saleable, depreciating; the daughter now embodies human capital — skills inseparable from her, unalienable, generating returns through her labour plus spillovers to society. The ₹15 lakh tuition was the investment flow; her skills are the stock.', outcome: 'Human capital fails the resale test precisely because it\'s embodied — but capital means productive stock, and skills qualify fully.' },
                { text: 'The first neighbour is right — capital must be a tangible asset you can sell; education is just consumption.', outcome: 'Tangibility isn\'t the criterion: the degree enhances productive capacity and future earnings exactly like the machine does — it\'s capital embodied in a person.', reveals: 'only-sellable-is-capital' },
                { text: 'The daughter IS the capital, and the ₹15 lakh itself is now human capital too.', outcome: 'Precision matters: the person embodies the capital (skills are the stock); the expenditure was the investment flow that built it — person and money are neither the stock.', reveals: 'person-and-fee-are-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Human capital is spent into people — and because its benefits spill over to society, leaving it to private wallets alone underfunds it.',
            decisions: [{ prompt: 'What comes next? Human Capital Formation in India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Capital Formation in India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_001', difficulty: 'standard',
          question: 'Human capital refers to the stock of knowledge, skills, competencies, and.',
          hint: 'If stuck, revisit c8_eco_ch1_5 (Capital as Factor of Production) and c8_eco_ch1_7 (Human.',
          misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories.',
          parts: [
                { id: 'a', prompt: 'Compare the mobility of physical capital and human capital across international borders.', answer: 'Physical capital (machines, equipment) moves freely across borders barring trade',
                  options: ['Physical capital (machines, equipment) moves freely across borders barring trade', 'visa restrictions', 'human capital = educated people', 'physical capital = machines'],
                  hint: 'If stuck, revisit c8_eco_ch1_5 (Capital as Factor of Production) and c8_eco_ch1_7 (Human Capital.',
                  misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of inputs* rather than.' }
          ],
            remediations: { 'human-capital-educated-people-and': { steps: ['Draw a T-table. Left column: "Flow (Investment/Expenditure)" — e.g., ₹2L tuition fees, ₹50k health checkup, 6 months.', 'Label the *person* as the *carrier*, not the capital.', 'Practice NCERT phrasing: "Investment in education *converts* human beings *into* human capital" (Recap point 1).', 'Write one board-style sentence: "Human capital is the *embodied* stock of knowledge and health; education expenditure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since human capital creates positive externalities (social benefits), the government *must* fully fund all education and health.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'human capital = educated people', 'physical capital = machines'],
                  hint: 'If stuck, revisit c8_eco_ch1_5 (Capital as Factor of Production) and c8_eco_ch1_7 (Human Capital.',
                  misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of inputs* rather than.' }
          ],
            remediations: { 'human-capital-educated-people-and': { steps: ['Draw a T-table. Left column: "Flow (Investment/Expenditure)" — e.g., ₹2L tuition fees, ₹50k health checkup, 6 months.', 'Label the *person* as the *carrier*, not the capital.', 'Practice NCERT phrasing: "Investment in education *converts* human beings *into* human capital" (Recap point 1).', 'Write one board-style sentence: "Human capital is the *embodied* stock of knowledge and health; education expenditure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_002', difficulty: 'standard',
          question: 'Human capital formation is the process of acquiring and increasing the stock.',
          hint: 'If stuck, revisit Box 4.1 in NCERT (Physical and Human Capital) and the Class 8 node.',
          misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government.',
          parts: [
                { id: 'a', prompt: 'Name the five sources of human capital formation as per the NCERT framework.', answer: 'The five sources are: (1) Investment in education, (2) Investment in health, (3)',
                  options: ['The five sources are: (1) Investment in education, (2) Investment in health, (3)', 'getting a degree', 'only education and health'],
                  hint: 'If stuck, revisit Box 4.1 in NCERT (Physical and Human Capital) and the Class 8 node c8_eco_ch1_7.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' },
                { id: 'b', prompt: 'Why do firms incur expenditure on on-the-job training even though it increases their costs in the short run?', answer: 'Firms invest in on-the-job training',
                  options: ['Firms invest in on-the-job training', 'firms do it out of charity', 'getting a degree'],
                  hint: 'If stuck, revisit Box 4.1 in NCERT (Physical and Human Capital) and the Class 8 node c8_eco_ch1_7.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' },
                { id: 'c', prompt: 'A rural household spends ₹30,000 on migrating a member to a city for a job that pays ₹8,000 more per month than the village job.', answer: 'Step 1: Identify monthly incremental earnings = ₹8,000',
                  options: ['Step 1: Identify monthly incremental earnings = ₹8,000', 'getting a degree'],
                  hint: 'If stuck, revisit Box 4.1 in NCERT (Physical and Human Capital) and the Class 8 node c8_eco_ch1_7.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' }
          ],
            remediations: { 'human-capital-formation-is-synonymous': { steps: ['Re-read Box 4.1 in NCERT to contrast physical vs human capital depreciation and mobility.', 'Create a table with five columns (Source, Who Invests, Cost Incurred, Expected Return, Example) and fill it with two.', 'Watch a 5-minute video on "Human Capital Formation Sources" (e.g., from NCERT\'s ePathshala) and note one new insight.', 'Explain the table to a peer in your own words — teaching forces clarification of the investment logic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_003', difficulty: 'standard',
          question: 'Human capital and economic growth share a bidirectional causal relationship.',
          hint: 'Review Node c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and Node.',
          misconception: 'Students often think the relationship is unidirectional: either human capital causes growth OR growth causes human.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human capital and economic growth share a bidirectional causal relationship: investment',
                  options: ['Human capital and economic growth share a bidirectional causal relationship: investment', 'Human capital refers to the stock of knowledge, skills, competencies, and health', 'Human capital formation is the process of acquiring and increasing the stock of', 'Education as a source of human capital refers to the deliberate investment in formal'],
                  hint: 'Review Node c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and Node c11_eco_cbse_04_002.',
                  misconception: 'Students often think the relationship is unidirectional: either human capital causes growth OR growth causes human capital.' }
          ],
            remediations: { 'the-relationship-is-unidirectional-either': { steps: ['Re-read the NCERT paragraph on \'Empirical evidence...\' and identify the two directions explicitly.', 'Draw a two-way arrow diagram with labels.', 'Use a concrete Indian example: Kerala\'s high literacy (human capital) led to better health outcomes and remittances.', 'Practice explaining why measurement problems (quality vs quantity) make econometric proof difficult.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_004', difficulty: 'standard',
          question: 'Education as a source of human capital refers to the deliberate investment.',
          hint: 'Revisit c10_eco_cbse_01_003 (Choice and Opportunity Cost) and c11_eco_cbse_04_001 (Human.',
          misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation.',
          parts: [
                { id: 'a', prompt: 'Explain why education is considered a merit good with positive externalities.', answer: 'Education is a merit good',
                  options: ['Education is a merit good', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Revisit c10_eco_cbse_01_003 (Choice and Opportunity Cost) and c11_eco_cbse_04_001 (Human.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' },
                { id: 'b', prompt: 'Using Table 4.1 data: Real per capita income rose from ₹7,651 (1951) to ₹94,054 (2018-22) while male literacy rose from 16.67% to 82%.', answer: 'Per capita income growth: (94,054/7,651)^(1/71) - 1 = 3.58% annually',
                  options: ['Per capita income growth: (94,054/7,651)^(1/71) - 1 = 3.58% annually', 'literacy grew faster', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Revisit c10_eco_cbse_01_003 (Choice and Opportunity Cost) and c11_eco_cbse_04_001 (Human.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' },
                { id: 'c', prompt: 'Analyze the following statement using the human capital vs human development distinction: "If a government program increases female literacy from 66% to 80%.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Revisit c10_eco_cbse_01_003 (Choice and Opportunity Cost) and c11_eco_cbse_04_001 (Human.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' }
          ],
            remediations: { 'higher-literacy-rates-automatically-cause': { steps: ['Re-read NCERT pages 64-65 on "Empirical evidence... nebulous" and "causality flows in either direction."', 'Calculate the correlation coefficient between literacy growth and income growth for 1951-2018 using Table 4.1.', 'Draw a two-way arrow diagram: Education → Productivity → Income → Education Spending → Education.', 'Distinguish private vs social return using a numerical example: If government spends ₹2 lakh subsidizing a degree.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_005', difficulty: 'standard',
          question: 'Health as a source of human capital refers to the process where expenditures.',
          hint: 'If stuck, revisit the "Sources of Human Capital" section in node c11_eco_cbse_04_002 and.',
          misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the.',
          parts: [
                { id: 'a', prompt: 'A factory employs 200 workers at ₹400/day. Due to a malaria outbreak, 15% of workers are absent for 10 days each.', answer: 'Step 1: Lost labor days without intervention = 200 workers × 15% × 10 days = 300',
                  options: ['Step 1: Lost labor days without intervention = 200 workers × 15% × 10 days = 300', 'profit of ₹1,20,000', 'loss of ₹2,00,000'],
                  hint: 'If stuck, revisit the "Sources of Human Capital" section in node c11_eco_cbse_04_002 and the worked.',
                  misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the productivity gains from.' },
                { id: 'b', prompt: 'Compare the productivity impact of two health interventions: (A) building a tertiary care hospital in a district, and (B) providing clean drinking water and.', answer: 'Intervention (B) generates larger aggregate human capital gains',
                  options: ['Intervention (B) generates larger aggregate human capital gains', 'preventive medicine, social medicine, and provision of clean drinking water'],
                  hint: 'If stuck, revisit the "Sources of Human Capital" section in node c11_eco_cbse_04_002 and the worked.',
                  misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the productivity gains from.' }
          ],
            remediations: { 'health-expenditure-only-matters-when': { steps: ['Re-read the textbook paragraph listing "preventive medicine (vaccination), curative medicine, social medicine (spread.', 'Draw a two-column table: "Private Benefit" vs. "Social Benefit (Externality)" for each category.', 'Work through the "Work This Out" box in the textbook (construction worker/maid absent due to ill health) — trace the.', 'Revisit the distinction between human capital (means to productivity) and human development (end in itself) from node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_006', difficulty: 'standard',
          question: 'On-the-job training (OJT) is a form of human capital investment where firms.',
          hint: 'If stuck, review c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and.',
          misconception: 'Students often think on-the-job training is just \'learning by doing\' and costs nothing, or that firms provide it purely.',
          parts: [
                { id: 'a', prompt: 'Why do firms insist on a minimum service period (bond) after providing on-the-job training?', answer: 'Firms require a bonding period',
                  options: ['Firms require a bonding period', 'to exploit workers', 'because of labour laws'],
                  hint: 'If stuck, review c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and c11_eco_cbse_04_002.',
                  misconception: 'Students often think on-the-job training is just \'learning by doing\' and costs nothing, or that firms provide it purely out of benevolence.' }
          ],
            remediations: { 'on-the-job-training-is': { steps: ['Revisit the definition of human capital (c11_eco_cbse_04_001) and sources (c11_eco_cbse_04_002).', 'Use a numerical example: a firm spends ₹10,000 on training; worker\'s daily output rises from 10 to 12 units; price per.', 'Discuss why the firm might not train if workers can quit after 50 days – introduce the hold-up problem and bonding.', 'Contrast with education where the individual bears cost and reaps return via higher wages generally.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
