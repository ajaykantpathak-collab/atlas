import type { SimDef } from '../../engine/types';
import C11_EcoHumanCapitalCBSESim from '../../../simulations/c6_12_new/C11_EcoHumanCapitalCBSESim';

/** v3 wrapped master — C11_EcoHumanCapitalCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_ecohumancapitalcbsesim: SimDef = {
    id: 'v3w_c11_ecohumancapitalcbsesim',
    title: 'Human Capital vs Physical Capital: Meaning and Distinction',
    subtitle: 'This node covers the conceptual distinction between human capital and physical capital as.',
    classLevel: 11, subject: 'economics', topic: 'Human Capital vs Physical Capital: Meaning and Distinction',
    chapters: [],
    nodeIds: ['c11_eco_cbse_04_001', 'c11_eco_cbse_04_002', 'c11_eco_cbse_04_003', 'c11_eco_cbse_04_004', 'c11_eco_cbse_04_005', 'c11_eco_cbse_04_006', 'c11_eco_cbse_04_007', 'c11_eco_cbse_04_008', 'c11_eco_cbse_04_009', 'c11_eco_cbse_04_010', 'c11_eco_cbse_04_011', 'c11_eco_cbse_08_010', 'c11_eco_cbse_08_011', 'c11_eco_cbse_05_001', 'c11_eco_cbse_08_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine two Class 11 students: Rohan\'s father owns a textile factory with power looms worth ₹50 lakh, while.', goal: 'Master Human Capital vs Physical Capital: Meaning and Distinction.' },
    discovery: {
        question: 'Compare the mobility of physical capital and human capital across international borders.',
        options: ['Physical capital (machines, equipment) moves freely across borders barring trade', 'visa restrictions', 'human capital = educated people'],
        answer: 'Physical capital (machines, equipment) moves freely across borders barring trade',
        hook: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of.',
    },
    teaching: [
        { title: 'Human capital refers to the stock of.', text: 'Human capital refers to the stock of knowledge, skills, competencies, and health attributes embodied in individuals that enhance their productive capacity and future income-generating potential,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_001', title: 'Human capital refers to the stock of.',
          scaffold: { problem: 'Ramesh, a 22-year-old B.Com graduate from Delhi, earns ₹4.2 lakh/year.',
            steps: [
            { text: 'Identify all costs (investment outflows). Direct cost = 2 × ₹12L = ₹24L.' },
            { text: 'Model post-MBA earnings stream. First post-MBA salary (year 3) = ₹14L.' },
            { text: 'Calculate PV of post-MBA earnings at start of year 3 using growing annuity formula: PV₃ = 14/(0.08-0.10) × [1 -.' },
            { text: 'Discount PV₃ back to today (year 0): PV₀ = 465.5 / (1.08)² = 465.5 / 1.1664 = ₹399.1L.' },
            { text: 'Calculate PV of no-MBA earnings (counterfactual). Current salary ₹4.2L growing at 5% (assumed) for 30 years.' },
            { text: 'Incremental PV ΔY = 399.1 - 80.1 = ₹319L. Rate of return r = (319/32.4) × 100 = 984% (total undiscounted return over 30.', faded: true, blankAnswer: 'Approximate annualized internal rate of return = 18.5% per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_002', title: 'Human capital formation is the process.',
          scaffold: { problem: 'A small manufacturing firm in Gujarat employs 20 workers. It considers a 2-month on-the-job training programme costing ₹15,000 per worker.',
            steps: [
            { text: 'Identify the investment cost per worker = ₹15,000 (one-time).' },
            { text: 'Identify the monthly incremental benefit per worker = ₹4,000 (value of additional output).' },
            { text: 'Determine the relevant time horizon = 18 months (expected retention period).' },
            { text: 'Calculate total incremental benefit per worker = ₹4,000 × 18 = ₹72,000.' },
            { text: 'Compare total benefit (₹72,000) with cost (₹15,000). Net gain = ₹57,000 per worker.' },
            { text: 'Conclude that the investment is economically rational because net present value is positive even without discounting.', faded: true, blankAnswer: 'Yes, the firm should invest. Net gain per worker = ₹57,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_003', title: 'Human capital and economic growth share.',
          scaffold: { problem: 'In 1991, India\'s real per capita income was ₹15,748 and adult literacy rate was 52.21%.',
            steps: [
            { text: 'Identify the given data: PCI_1991 = 15748, PCI_2018 = 94054, Literacy_1991 = 52.21, Literacy_2018 = 78, n = 27 years.' },
            { text: 'Recall CAGR formula: CAGR = (End Value / Start Value)^(1/n) - 1.' },
            { text: 'Compute PCI CAGR: (94054/15748)^(1/27) - 1 = (5.972)^(0.03704) - 1 ≈ 1.067 - 1 = 0.067 = 6.7% per annum.' },
            { text: 'Compute literacy annual increase: (78 - 52.21) / 27 = 25.79 / 27 ≈ 0.955 percentage points per year.' },
            { text: 'Interpret: Real per capita income grew at 6.7% annually while literacy rose ~1 percentage point annually.', faded: true, blankAnswer: 'CAGR of real per capita income ≈ 6.7% per annum; literacy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_004', title: 'Education as a source of human capital.',
          scaffold: { problem: 'Rohan, a Class 12 student in Delhi, faces a choice: (A) Start working immediately at ₹18,000/month with 3% annual wage growth, or (B).',
            steps: [
            { text: 'Identify the incremental cash flows of Option B over Option A.' },
            { text: 'Calculate PV of costs during study years (t=1,2,3): PV_costs = 3,36,000/(1.08) + 3,36,000/(1.08)² + 3,36,000/(1.08)³ =.' },
            { text: 'Calculate PV of incremental earnings after graduation (t=4 to 38).' },
            { text: 'Incremental earnings grow at 5% (Option B) vs 3% (Option A). The difference grows at approximately 2% per year.' },
            { text: 'PV_benefits = 1,83,804/(0.08-0.02) × [1 - (1.02/1.08)^35] = 30,63,400 × [1 - 0.130] = 30,63,400 × 0.87 = ₹26,65,158.' },
            { text: 'NPV = PV_benefits - PV_costs = 21,16,200 - 8,65,905 = ₹12,50,295. Since NPV > 0, Rohan should pursue the degree.', faded: true, blankAnswer: 'NPV = ₹12,50,295 (positive). Rohan should pursue the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_005', title: 'Health as a source of human capital.',
          scaffold: { problem: 'A rural household has two adult workers earning ₹300/day each.',
            steps: [
            { text: 'Identify current annual income loss due to illness: (20 + 10) days × ₹300/day = ₹9,000.' },
            { text: 'Add current curative expenditure: ₹9,000 + ₹5,000 = ₹14,000 total annual health-related cost.' },
            { text: 'Estimate post-filter illness days: 30 days × (1 - 0.80) = 6 days.' },
            { text: 'Compute post-filter income loss: 6 days × ₹300 = ₹1,800.' },
            { text: 'Assume curative expenditure falls proportionally: ₹5,000 × (6/30) = ₹1,000.' },
            { text: 'Total post-filter cost = ₹1,800 + ₹1,000 = ₹2,800.' },
            { text: 'Annual savings = ₹14,000 - ₹2,800 = ₹11,200.' },
            { text: 'Net benefit in Year 1 = ₹11,200 - ₹2,000 (filter cost) = ₹9,200.', faded: true, blankAnswer: 'Net benefit in Year 1 = ₹9,200; from Year 2 onward, annual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_006', title: 'On-the-job training (OJT) is a form of.',
          scaffold: { problem: 'An IT firm in Hyderabad provides a 3-month cloud computing certification training to 20 fresh engineers.',
            steps: [
            { text: 'Identify total training cost per engineer = ₹1,20,000.' },
            { text: 'Calculate monthly additional revenue per engineer = ₹2,00,000 - ₹1,50,000 = ₹50,000.' },
            { text: 'Determine bond period in months = 2 years × 12 = 24 months.' },
            { text: 'Compute total additional revenue over bond period = ₹50,000 × 24 = ₹12,00,000.' },
            { text: 'Calculate net gain = Total additional revenue - Training cost = ₹12,00,000 - ₹1,20,000 = ₹10,80,000.' },
            { text: 'Compute rate of return = (Net gain / Training cost) × 100 = (₹10,80,000 / ₹1,20,000) × 100 = 900%.', faded: true, blankAnswer: 'Net gain per engineer = ₹10,80,000; Rate of return = 900%.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Capital vs Physical Capital: Meaning and Distinction', spots: [
            { id: 's1', label: 'Human capital refers to the', prompt: 'Which idea is this? — Human capital refers to the stock of knowledge, skills, competencies, and health.', answer: 'Human capital refers to the', options: ['Human capital refers to the', 'Human capital formation is the', 'Human capital and economic growth', 'Education as a source of'] },
            { id: 's2', label: 'Human capital formation is the', prompt: 'Which idea is this? — Human capital formation is the process of acquiring and increasing the stock of.', answer: 'Human capital formation is the', options: ['Human capital formation is the', 'Human capital refers to the', 'Human capital and economic growth', 'Education as a source of'] },
            { id: 's3', label: 'Human capital and economic growth', prompt: 'Which idea is this? — Human capital and economic growth share a bidirectional causal relationship: investment.', answer: 'Human capital and economic growth', options: ['Human capital and economic growth', 'Human capital refers to the', 'Human capital formation is the', 'Education as a source of'] },
            { id: 's4', label: 'Education as a source of', prompt: 'Which idea is this? — Education as a source of human capital refers to the deliberate investment in formal.', answer: 'Education as a source of', options: ['Education as a source of', 'Human capital refers to the', 'Human capital formation is the', 'Human capital and economic growth'] },
            { id: 's5', label: 'Health as a source of', prompt: 'Which idea is this? — Health as a source of human capital refers to the process where expenditures on.', answer: 'Health as a source of', options: ['Health as a source of', 'Human capital refers to the', 'Human capital formation is the', 'Human capital and economic growth'] },
            { id: 's6', label: 'On-the-job training OJT is a', prompt: 'Which idea is this? — On-the-job training (OJT) is a form of human capital investment where firms incur.', answer: 'On-the-job training OJT is a', options: ['On-the-job training OJT is a', 'Human capital refers to the', 'Human capital formation is the', 'Human capital and economic growth'] }
          ] } }
    ],
    explore: { component: C11_EcoHumanCapitalCBSESim, prompt: 'Explore the interactive — Human Capital vs Physical Capital: Meaning and Distinction' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_001', difficulty: 'standard',
          question: 'Human capital refers to the stock of knowledge, skills, competencies, and.',
          hint: 'If stuck, revisit c8_eco_ch1_5 (Capital as Factor of Production) and c8_eco_ch1_7 (Human.',
          misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of.',
          parts: [
                { id: 'a', prompt: 'Compare the mobility of physical capital and human capital across international borders.', answer: 'Physical capital (machines, equipment) moves freely across borders barring trade',
                  options: ['Physical capital (machines, equipment) moves freely across borders barring trade', 'visa restrictions', 'human capital = educated people'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of inputs* rather than.' }
          ],
            remediations: { 'human-capital-educated-people-and': { steps: ['Draw a T-table. Left column: "Flow (Investment/Expenditure)" — e.g., ₹2L tuition fees, ₹50k health checkup, 6 months.', 'Label the *person* as the *carrier*, not the capital.', 'Practice NCERT phrasing: "Investment in education *converts* human beings *into* human capital" (Recap point 1).', 'Write one board-style sentence: "Human capital is the *embodied* stock of knowledge and health; education expenditure.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since human capital creates positive externalities (social benefits), the government *must* fully fund all education and health.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'human capital = educated people', 'physical capital = machines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of inputs* rather than.' },
                { id: 'b', prompt: 'Compare the mobility of physical capital and human capital across international borders.', answer: 'Physical capital (machines, equipment) moves freely across borders barring trade',
                  options: ['Physical capital (machines, equipment) moves freely across borders barring trade', 'visa restrictions', 'human capital = educated people', 'physical capital = machines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "human capital = educated people" and "physical capital = machines," treating them as *categories of inputs* rather than.' }
          ],
            remediations: { 'human-capital-educated-people-and': { steps: ['Draw a T-table. Left column: "Flow (Investment/Expenditure)" — e.g., ₹2L tuition fees, ₹50k health checkup, 6 months.', 'Label the *person* as the *carrier*, not the capital.', 'Practice NCERT phrasing: "Investment in education *converts* human beings *into* human capital" (Recap point 1).', 'Write one board-style sentence: "Human capital is the *embodied* stock of knowledge and health; education expenditure.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_002', difficulty: 'standard',
          question: 'Human capital formation is the process of acquiring and increasing the stock of.',
          hint: 'If stuck, revisit Box 4.1 in NCERT (Physical and Human Capital) and the Class 8 node.',
          misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or.',
          parts: [
                { id: 'a', prompt: 'Name the five sources of human capital formation as per the NCERT framework.', answer: 'The five sources are: (1) Investment in education, (2) Investment in health, (3)',
                  options: ['The five sources are: (1) Investment in education, (2) Investment in health, (3)', 'getting a degree'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' },
                { id: 'b', prompt: 'Why do firms incur expenditure on on-the-job training even though it increases their costs in the short run?', answer: 'Firms invest in on-the-job training',
                  options: ['Firms invest in on-the-job training', 'firms do it out of charity', 'getting a degree'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' },
                { id: 'c', prompt: 'A rural household spends ₹30,000 on migrating a member to a city for a job that pays ₹8,000 more per month than the village job.', answer: 'Step 1: Identify monthly incremental earnings = ₹8,000',
                  options: ['Step 1: Identify monthly incremental earnings = ₹8,000', 'getting a degree'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' }
          ],
            remediations: { 'human-capital-formation-is-synonymous': { steps: ['Re-read Box 4.1 in NCERT to contrast physical vs human capital depreciation and mobility.', 'Create a table with five columns (Source, Who Invests, Cost Incurred, Expected Return, Example) and fill it with two.', 'Watch a 5-minute video on "Human Capital Formation Sources" (e.g., from NCERT\'s ePathshala) and note one new insight.', 'Explain the table to a peer in your own words — teaching forces clarification of the investment logic.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Expenditure on acquiring information about job markets is a waste because information is freely available on the internet."', answer: 'The statement is false',
                  options: ['The statement is false', 'getting a degree'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think human capital formation is synonymous with "getting a degree" and that only the government or schools are responsible.' }
          ],
            remediations: { 'human-capital-formation-is-synonymous': { steps: ['Re-read Box 4.1 in NCERT to contrast physical vs human capital depreciation and mobility.', 'Create a table with five columns (Source, Who Invests, Cost Incurred, Expected Return, Example) and fill it with two.', 'Watch a 5-minute video on "Human Capital Formation Sources" (e.g., from NCERT\'s ePathshala) and note one new insight.', 'Explain the table to a peer in your own words — teaching forces clarification of the investment logic.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_003', difficulty: 'standard',
          question: 'Human capital and economic growth share a bidirectional causal relationship:.',
          hint: 'Review Node c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and Node.',
          misconception: 'Students often think the relationship is unidirectional: either human capital causes growth OR growth causes human.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human capital and economic growth share a bidirectional causal relationship: investment',
                  options: ['Human capital and economic growth share a bidirectional causal relationship: investment', 'Human capital refers to the stock of knowledge, skills, competencies, and health', 'Human capital formation is the process of acquiring and increasing the stock of', 'Education as a source of human capital refers to the deliberate investment in formal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the relationship is unidirectional: either human capital causes growth OR growth causes human capital.' }
          ],
            remediations: { 'the-relationship-is-unidirectional-either': { steps: ['Re-read the NCERT paragraph on \'Empirical evidence...\' and identify the two directions explicitly.', 'Draw a two-way arrow diagram with labels.', 'Use a concrete Indian example: Kerala\'s high literacy (human capital) led to better health outcomes and remittances.', 'Practice explaining why measurement problems (quality vs quantity) make econometric proof difficult.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_004', difficulty: 'standard',
          question: 'Education as a source of human capital refers to the deliberate investment in.',
          hint: 'Revisit c10_eco_cbse_01_003 (Choice and Opportunity Cost) and c11_eco_cbse_04_001 (Human.',
          misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in.',
          parts: [
                { id: 'a', prompt: 'Explain why education is considered a merit good with positive externalities.', answer: 'Education is a merit good',
                  options: ['Education is a merit good', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' },
                { id: 'b', prompt: 'Using Table 4.1 data: Real per capita income rose from ₹7,651 (1951) to ₹94,054 (2018-22) while male literacy rose from 16.67% to 82%.', answer: 'Per capita income growth: (94,054/7,651)^(1/71) - 1 = 3.58% annually',
                  options: ['Per capita income growth: (94,054/7,651)^(1/71) - 1 = 3.58% annually', 'literacy grew faster', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' },
                { id: 'c', prompt: 'Analyze the following statement using the human capital vs human development distinction: "If a government program increases female literacy from 66% to 80%.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' }
          ],
            remediations: { 'higher-literacy-rates-automatically-cause': { steps: ['Re-read NCERT pages 64-65 on "Empirical evidence... nebulous" and "causality flows in either direction."', 'Calculate the correlation coefficient between literacy growth and income growth for 1951-2018 using Table 4.1.', 'Draw a two-way arrow diagram: Education → Productivity → Income → Education Spending → Education.', 'Distinguish private vs social return using a numerical example: If government spends ₹2 lakh subsidizing a degree.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in.',
          parts: [
                { id: 'a', prompt: 'Critique the argument: "Since private returns to higher education in India are estimated at 15-20% annually (exceeding the 6-7% cost of government borrowing),.', answer: 'The argument fails on three grounds: (1) Credit constraints: Poor students lack',
                  options: ['The argument fails on three grounds: (1) Credit constraints: Poor students lack', 'higher literacy rates automatically cause higher economic growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher literacy rates automatically cause higher economic growth" because they see the correlation in Table 4.1.' }
          ],
            remediations: { 'higher-literacy-rates-automatically-cause': { steps: ['Re-read NCERT pages 64-65 on "Empirical evidence... nebulous" and "causality flows in either direction."', 'Calculate the correlation coefficient between literacy growth and income growth for 1951-2018 using Table 4.1.', 'Draw a two-way arrow diagram: Education → Productivity → Income → Education Spending → Education.', 'Distinguish private vs social return using a numerical example: If government spends ₹2 lakh subsidizing a degree.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_005', difficulty: 'standard',
          question: 'Health as a source of human capital refers to the process where expenditures on.',
          hint: 'If stuck, revisit the "Sources of Human Capital" section in node c11_eco_cbse_04_002 and.',
          misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the.',
          parts: [
                { id: 'a', prompt: 'A factory employs 200 workers at ₹400/day. Due to a malaria outbreak, 15% of workers are absent for 10 days each.', answer: 'Step 1: Lost labor days without intervention = 200 workers × 15% × 10 days = 300',
                  options: ['Step 1: Lost labor days without intervention = 200 workers × 15% × 10 days = 300', 'profit of ₹1,20,000', 'loss of ₹2,00,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the productivity gains from.' },
                { id: 'b', prompt: 'Compare the productivity impact of two health interventions: (A) building a tertiary care hospital in a district, and (B) providing clean drinking water and.', answer: 'Intervention (B) generates larger aggregate human capital gains',
                  options: ['Intervention (B) generates larger aggregate human capital gains', 'preventive medicine, social medicine, and provision of clean drinking water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the productivity gains from.' }
          ],
            remediations: { 'health-expenditure-only-matters-when': { steps: ['Re-read the textbook paragraph listing "preventive medicine (vaccination), curative medicine, social medicine (spread.', 'Draw a two-column table: "Private Benefit" vs. "Social Benefit (Externality)" for each category.', 'Work through the "Work This Out" box in the textbook (construction worker/maid absent due to ill health) — trace the.', 'Revisit the distinction between human capital (means to productivity) and human development (end in itself) from node.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the.',
          parts: [
                { id: 'a', prompt: 'Compare the productivity impact of two health interventions: (A) building a tertiary care hospital in a district, and (B) providing clean drinking water and.', answer: 'Intervention (B) generates larger aggregate human capital gains',
                  options: ['Intervention (B) generates larger aggregate human capital gains', 'preventive medicine, social medicine, and provision of clean drinking water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **health expenditure only matters when someone is sick** (curative view) and that **the productivity gains from.' }
          ],
            remediations: { 'health-expenditure-only-matters-when': { steps: ['Re-read the textbook paragraph listing "preventive medicine (vaccination), curative medicine, social medicine (spread.', 'Draw a two-column table: "Private Benefit" vs. "Social Benefit (Externality)" for each category.', 'Work through the "Work This Out" box in the textbook (construction worker/maid absent due to ill health) — trace the.', 'Revisit the distinction between human capital (means to productivity) and human development (end in itself) from node.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_006', difficulty: 'standard',
          question: 'On-the-job training (OJT) is a form of human capital investment where firms.',
          hint: 'If stuck, review c11_eco_cbse_04_001 (Human Capital vs Physical Capital) and.',
          misconception: 'Students often think on-the-job training is just \'learning by doing\' and costs nothing, or that firms provide it purely.',
          parts: [
                { id: 'a', prompt: 'Why do firms insist on a minimum service period (bond) after providing on-the-job training?', answer: 'Firms require a bonding period',
                  options: ['Firms require a bonding period', 'to exploit workers', 'because of labour laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think on-the-job training is just \'learning by doing\' and costs nothing, or that firms provide it purely out of benevolence.' }
          ],
            remediations: { 'on-the-job-training-is': { steps: ['Revisit the definition of human capital (c11_eco_cbse_04_001) and sources (c11_eco_cbse_04_002).', 'Use a numerical example: a firm spends ₹10,000 on training; worker\'s daily output rises from 10 to 12 units; price per.', 'Discuss why the firm might not train if workers can quit after 50 days – introduce the hold-up problem and bonding.', 'Contrast with education where the individual bears cost and reaps return via higher wages generally.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
