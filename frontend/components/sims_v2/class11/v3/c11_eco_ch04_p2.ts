import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch04_p2: SimDef = {
    id: 'v3_c11_eco_ch04_p2',
    title: 'Human Capital Formation in India · Part 2/2',
    subtitle: 'Distinguish embodied skill from sellable machines, and investment flow from capital stock.',
    classLevel: 11, subject: 'economics', topic: 'Human Capital Formation in India · Part 2/2',
    chapters: ['c11_eco_ch04'],
    nodeIds: ['c11_eco_cbse_04_007', 'c11_eco_cbse_04_008', 'c11_eco_cbse_04_009', 'c11_eco_cbse_04_010', 'c11_eco_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist pricing investments in people', intro: '₹50,000: a tractor or a nursing diploma? Both are bets on future returns — but only one walks away on its own feet.', goal: 'Define human capital, contrast it with physical capital, and identify its sources of formation.' },
    discovery: {
        question: 'One father owns a ₹50 lakh loom; another holds a ₹20 lakh engineering degree. Which capital can be sold without its owner showing up?',
        options: ['The loom — human capital is embodied in the person and cannot be transferred separately', 'The degree — certificates can be sold to the highest bidder', 'Both — capital is capital regardless of form', 'Neither — once bought, capital is locked to its owner'],
        answer: 'The loom — human capital is embodied in the person and cannot be transferred separately',
        hook: 'The engineer isn\'t the capital — the skills are. And unlike the loom, they can\'t be leased out or shipped abroad.',
    },
    teaching: [
        { title: 'Government Initiatives: Education Sector Policies', text: 'Government initiatives in the education sector refer to policy measures, legislative frameworks, and financial commitments undertaken by the Union and State governments to expand access, improve.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare a machine\'s depreciation against an operator\'s rising productivity, then price a family\'s migration as an investment with a payback period.',
        labels: ['Government Initiatives: Education Sector', 'Government Initiatives: Health Sector', 'Education Sector in India', 'Health Sector in India', 'Human Capital Formation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_007', title: 'Government Initiatives: Education Sector Policies',
          scaffold: { problem: 'Using Table 4.1 data, compute the compound annual growth rate (CAGR) of real per capita income from 1951 (Rs 7,651) to 2018-22 (Rs 94,054).',
            steps: [
            { text: 'Identify time period: 1951 to 2018-22 ≈ 68 years (use 2020 as midpoint).' },
            { text: 'Recall CAGR formula: (Ending Value / Beginning Value)^(1/n) - 1, where n = number of years.' },
            { text: 'Compute income CAGR: (94,054 / 7,651)^(1/68) - 1 = (12.29)^(0.0147) - 1 = 1.0378 - 1 = 3.78% per annum.' },
            { text: 'Compute education share CAGR: (4.47 / 0.64)^(1/68) - 1 = (6.984)^(0.0147) - 1 = 1.0296 - 1 = 2.96% per annum.' },
            { text: 'Interpret: Real per capita income grew faster (3.78%) than education expenditure share of GDP (2.96%), confirming the.' },
            { text: 'Economic reasoning: Income growth expands fiscal space (denominator of % GDP ratio), but education priority (numerator).', faded: true, blankAnswer: 'Income CAGR = 3.78% p.a.; Education share CAGR = 2.96%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_008', title: 'Government Initiatives: Health Sector Policies',
          scaffold: { problem: 'A rural household in Odisha has monthly consumption expenditure of ₹12,000.',
            steps: [
            { text: 'Identify threshold = 10% of monthly consumption = 0.10 × ₹12,000 = ₹1,200.' },
            { text: 'Calculate total OOP health spending = uncovered expenses only (since hospitalisation is covered) = ₹1,800.' },
            { text: 'Compare OOP (₹1,800) with threshold (₹1,200). Since ₹1,800 > ₹1,200, CHE occurs.' },
            { text: 'Interpret: Despite hospitalisation coverage, outpatient costs (medicines, transport) push the household into.' },
            { text: 'Policy implication: Ayushman Bharat\'s hospitalisation-only design leaves out the largest component of OOP spending.', faded: true, blankAnswer: 'Yes, the household faces CHE (₹1,800 > ₹1,200). The policy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_009', title: 'Education Sector in India: Achievements and Problems',
          scaffold: { problem: 'In 2020-21, State A spent ₹12,000 crore on elementary education for a child population (6-14 years) of 1.2 crore.',
            steps: [
            { text: 'Identify the formula for per-student expenditure: Total Expenditure / Child Population.' },
            { text: 'Compute State A: ₹12,000 crore / 1.2 crore = ₹10,000 per child.' },
            { text: 'Compute State B: ₹45,000 crore / 0.5 crore = ₹90,000 per child.' },
            { text: 'Compare: State A (₹10,000) is 60% below national average (₹25,000); State B (₹90,000) is 260% above.' },
            { text: 'Interpret: Such disparity means children in State A receive vastly inferior inputs (teacher quality, infrastructure.', faded: true, blankAnswer: 'State A: ₹10,000 per child; State B: ₹90,000 per child.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_010', title: 'Health Sector in India: Achievements and Problems',
          scaffold: { problem: 'Using NCERT Table 4.1, calculate the average annual rate of decline in Infant Mortality Rate (IMR) from 1951 (146) to 2020 (28) over 69.',
            steps: [
            { text: 'Identify initial IMR (1951) = 146 per 1000 live births; final IMR (2020) = 28 per 1000 live births.' },
            { text: 'Calculate absolute decline = 146 - 28 = 118 points over 69 years (2020-1951).' },
            { text: 'Compute average annual absolute decline = 118 / 69 ≈ 1.71 points per year.' },
            { text: 'Project to 2030 (10 years from 2020): 28 - (1.71 × 10) = 28 - 17.1 = 10.9 ≈ 11 per 1000.' },
            { text: 'Compare with SDG target 12 – projected 11 is slightly better, but note decline is non-linear (faster recently: 1991=80.' },
            { text: 'Economic interpretation: Recent acceleration due to NHM (2005-), Mission Indradhanush, but rural-urban gap persists.', faded: true, blankAnswer: 'Average annual decline ≈ 1.71 points/year; projected 2030.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_04_011', title: 'Human Capital Formation in India: Magnitude and Indicators',
          scaffold: { problem: 'Using Table 4.1 data, calculate the Compound Annual Growth Rate (CAGR) of real per capita income from 1951 (₹7,651) to 2018-22 (₹94,054).',
            steps: [
            { text: 'Identify the formula for CAGR = (Ending Value / Beginning Value)^(1/n) - 1, where n = number of years.' },
            { text: 'For real per capita income: Beginning = 7,651, Ending = 94,054, n = 2022 - 1951 = 71 years (using 2022 as endpoint).' },
            { text: 'For male literacy rate: Beginning = 16.67, Ending = 78, n = 71.' },
            { text: 'Compare: Income grew at 3.53% p.a., male literacy at 2.24% p.a. Income growth > literacy growth.' },
            { text: 'Interpret: Despite faster income growth, literacy growth lagged.', faded: true, blankAnswer: 'Real per capita income CAGR = 3.53% p.a.; Male literacy.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'A family can send a bright child to coaching for a competitive exam — expensive, but the exam opens doors — or to a good local college near home. The exam path risks everything on one test.',
            decisions: [{ prompt: 'Is investing in one child at the cost of stability ever justified?', options: [
                { text: 'Yes — human capital is the family\'s real wealth', outcome: 'The investment argument; it works only if the child succeeds — and the family\'s risk if they don\'t is real.' },
                { text: 'No — security first, ambition within means', outcome: 'The prudent path; but \'within means\' can quietly cap what a bright child from a poor family is allowed to attempt.' },
                { text: 'Invest — but never make the child carry the whole family\'s hope', outcome: 'The emotionally honest answer — the financial bet may be right; the weight placed on one teenager is the part to refuse.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbours debate investments: one buys a ₹15 lakh printing machine for his press; the other spends ₹15 lakh on his daughter\'s engineering degree. At the society meeting the first says: \'Mine is real capital — it can be sold anytime. A degree isn\'t capital at all; it can\'t even be resold.\'',
            decisions: [{ prompt: 'Who holds capital, and of what kind?', options: [
                { text: 'Both hold capital, of different kinds: the machine is physical capital — separable, saleable, depreciating; the daughter now embodies human capital — skills inseparable from her, unalienable, generating returns through her labour plus spillovers to society. The ₹15 lakh tuition was the investment flow; her skills are the stock.', outcome: 'Human capital fails the resale test precisely because it\'s embodied — but capital means productive stock, and skills qualify fully.' },
                { text: 'The first neighbour is right — capital must be a tangible asset you can sell; education is just consumption.', outcome: 'Tangibility isn\'t the criterion: the degree enhances productive capacity and future earnings exactly like the machine does — it\'s capital embodied in a person.', reveals: 'only-sellable-is-capital' },
                { text: 'The daughter IS the capital, and the ₹15 lakh itself is now human capital too.', outcome: 'Precision matters: the person embodies the capital (skills are the stock); the expenditure was the investment flow that built it — person and money are neither the stock.', reveals: 'person-and-fee-are-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'Human capital is spent into people — and because its benefits spill over to society, leaving it to private wallets alone underfunds it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_007', difficulty: 'standard',
          question: 'Government initiatives in the education sector refer to policy measures.',
          hint: 'Revisit c11_eco_cbse_04_001 Box 4.1 (external benefits of human capital) and.',
          misconception: 'Students believe the Right to Education (RTE) Act 2009 guarantees "free education" at all levels.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Government initiatives in the education sector refer to policy measures, legislative',
                  options: ['Government initiatives in the education sector refer to policy measures, legislative', 'Human capital refers to the stock of knowledge, skills, competencies, and health', 'Human capital formation is the process of acquiring and increasing the stock of', 'Human capital and economic growth share a bidirectional causal relationship: investment'],
                  hint: 'Revisit c11_eco_cbse_04_001 Box 4.1 (external benefits of human capital) and c9_eco_ch1_10 (public.',
                  misconception: 'Students believe the Right to Education (RTE) Act 2009 guarantees "free education" at all levels.' }
          ],
            remediations: { 'the-right-to-education-rte': { steps: ['If a student conflates RTE with universal free higher education: (1) Have them read RTE Section 3: "every child of age.', '(3) Use NSSO 2017-18 data: only 26.3% GER in higher education vs 96% primary completion — shows RTE\'s limited scope.', '(4) Calculate opportunity cost: a 14-year-old dropout earning Rs 3,000/month loses Rs 3.6 lakh lifetime earnings.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_008', difficulty: 'standard',
          question: 'Government health sector policies refer to the set of planned interventions.',
          hint: 'Review "Health as a Source of Human Capital" (c11_eco_cbse_04_005) for productivity link.',
          misconception: 'Students believe "government health spending = building hospitals." They ignore that 70% of India\'s health expenditure.',
          parts: [
                { id: 'a', prompt: 'Explain why the government provides free immunisation through Mission Indradhanush instead of leaving it to private markets, using the concepts.', answer: 'Immunisation generates herd immunity',
                  options: ['Immunisation generates herd immunity', 'affordability', 'government health spending = building hospitals', 'health insurance'],
                  hint: 'Review "Health as a Source of Human Capital" (c11_eco_cbse_04_005) for productivity link, and.',
                  misconception: 'Students believe "government health spending = building hospitals." They ignore that 70% of India\'s health expenditure is out-of-pocket.' },
                { id: 'b', prompt: 'Using the data: India\'s IMR fell from 146 (1951) to 28 (2018-22) while real per capita income rose from ₹7,651 to ₹94,054.', answer: 'Period: 1951 to 2020 ≈ 69 years',
                  options: ['Period: 1951 to 2020 ≈ 69 years', 'income growth caused IMR decline', 'government health spending = building hospitals', 'health insurance'],
                  hint: 'Review "Health as a Source of Human Capital" (c11_eco_cbse_04_005) for productivity link, and.',
                  misconception: 'Students believe "government health spending = building hospitals." They ignore that 70% of India\'s health expenditure is out-of-pocket.' }
          ],
            remediations: { 'government-health-spending-building-hospitals': { steps: ['Revisit the distinction between stock (hospitals) and flow (services delivered) using NCERT Table 4.1 — life expectancy.', 'Analyse NSSO 75th Round data: only 30% of ailments treated in public facilities; rest in private due to quality/access.', 'Map a patient journey for a diabetic rural woman — she needs monthly medicines (outpatient), not hospitalisation.', 'Conclude that "functional primary care" (regular drug supply, telemedicine, health & wellness centres) matters more.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "government health spending = building hospitals." They ignore that 70% of India\'s health expenditure.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Ayushman Bharat\'s hospitalisation coverage (₹5 lakh/family/year) is sufficient to protect poor households from catastrophic health.', answer: 'The statement is insufficient',
                  options: ['The statement is insufficient', 'government health spending = building hospitals', 'health insurance', 'universal health coverage'],
                  hint: 'Review "Health as a Source of Human Capital" (c11_eco_cbse_04_005) for productivity link, and.',
                  misconception: 'Students believe "government health spending = building hospitals." They ignore that 70% of India\'s health expenditure is out-of-pocket.' }
          ],
            remediations: { 'government-health-spending-building-hospitals': { steps: ['Revisit the distinction between stock (hospitals) and flow (services delivered) using NCERT Table 4.1 — life expectancy.', 'Analyse NSSO 75th Round data: only 30% of ailments treated in public facilities; rest in private due to quality/access.', 'Map a patient journey for a diabetic rural woman — she needs monthly medicines (outpatient), not hospitalisation.', 'Conclude that "functional primary care" (regular drug supply, telemedicine, health & wellness centres) matters more.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_009', difficulty: 'standard',
          question: 'The education sector in India encompasses the system of public and private.',
          hint: 'Revisit c11_eco_cbse_04_004 (returns to education) and c10_math_cbse_13_001 (statistical.',
          misconception: 'Students often believe that rising literacy rates (Table 4.2) automatically mean successful human capital formation.',
          parts: [
                { id: 'a', prompt: 'Analyze why unemployment rates are higher among educated youth (graduates) than among those with only primary education, using the NSSO 2011-12 data cited.', answer: 'Higher educated unemployment reflects a structural mismatch: the economy creates',
                  options: ['Higher educated unemployment reflects a structural mismatch: the economy creates', 'rising literacy rates (Table 4'],
                  hint: 'Revisit c11_eco_cbse_04_004 (returns to education) and c10_math_cbse_13_001 (statistical mean).',
                  misconception: 'Students often believe that rising literacy rates (Table 4.2) automatically mean successful human capital formation.' }
          ],
            remediations: { 'rising-literacy-rates-table-4': { steps: ['Re-read Box 4.1 (Physical vs Human Capital) to recall that human capital depreciates with ageing but *quality*.', 'Plot a simple graph: x-axis = years of schooling (1951-2022), y-axis = literacy rate AND y2-axis = graduate.', 'Write one paragraph explaining why more schooled persons can still be unemployable (skill mismatch, curriculum.', 'Re-attempt Diagnostic Question 4 with this framing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_010', difficulty: 'standard',
          question: 'The health sector in India refers to the organized system of public and private.',
          hint: 'If stuck, revisit c11_eco_cbse_04_005 "Health as a Source of Human Capital" – focus.',
          misconception: 'Students believe "more hospitals = better health" and equate health sector achievements solely with infrastructure.',
          parts: [
                { id: 'a', prompt: 'Explain why a decline in Crude Death Rate (CDR) from 25.1 to 6.0 between 1951 and 2020 does not necessarily mean the health sector has solved all its problems.', answer: 'CDR decline reflects broad improvements in disease control, sanitation, and food',
                  options: ['CDR decline reflects broad improvements in disease control, sanitation, and food', 'more hospitals = better health'],
                  hint: 'If stuck, revisit c11_eco_cbse_04_005 "Health as a Source of Human Capital" – focus on the sick.',
                  misconception: 'Students believe "more hospitals = better health" and equate health sector achievements solely with infrastructure numbers (beds.' },
                { id: 'b', prompt: 'Analyze why India\'s doctor-population ratio (1:1,445) fails the WHO norm (1:1,000) despite producing 50,000+ MBBS graduates annually.', answer: 'Structural factors: (1) Maldistribution – 75% doctors serve urban 30% population',
                  options: ['Structural factors: (1) Maldistribution – 75% doctors serve urban 30% population', 'not enough medical colleges', 'more hospitals = better health'],
                  hint: 'If stuck, revisit c11_eco_cbse_04_005 "Health as a Source of Human Capital" – focus on the sick.',
                  misconception: 'Students believe "more hospitals = better health" and equate health sector achievements solely with infrastructure numbers (beds.' }
          ],
            remediations: { 'more-hospitals-better-health-and': { steps: ['Revisit Table 4.1 – plot CDR, IMR, Life Expectancy on graph paper (x-axis: year, y-axis: value) to visualize trends.', 'Read Economic Survey 2023-24 Chapter on Social Sector – note OOPE share (48.8% in 2019-20) and public spending (1.35%.', 'Map your district\'s PHC/CHC data from NHM portal – compare IPHS norms vs actual staff/beds.', 'Write one paragraph linking high OOPE to dropout from labor force (c11_eco_cbse_04_005: sick worker loses wages → lower.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_04_011', difficulty: 'standard',
          question: 'Human Capital Formation in India: Magnitude and Indicators refers to the.',
          hint: 'If stuck on expenditure ratios, revisit "Government Budget and the Economy" (Class 12.',
          misconception: 'Students believe "higher literacy rate = better human capital formation" and treat all educational indicators.',
          parts: [
                { id: 'a', prompt: 'What are the two ways government expenditure on education is expressed according to the NCERT textbook, and what does each measure indicate?', answer: 'The two ways are: (i) as a percentage of total government expenditure',
                  options: ['The two ways are: (i) as a percentage of total government expenditure', 'higher literacy rate = better human capital formation', 'both measure the same thing or confusing with per capita expenditure'],
                  hint: 'If stuck on expenditure ratios, revisit "Government Budget and the Economy" (Class 12.',
                  misconception: 'Students believe "higher literacy rate = better human capital formation" and treat all educational indicators as interchangeable.' },
                { id: 'b', prompt: 'Using Table 4.1 data, calculate the percentage point increase in male and female literacy rates from 1951 to 2018-22.', answer: 'Male literacy: 16.67% (1951) → 78% (2018-22) = 61.33 percentage points increase',
                  options: ['Male literacy: 16.67% (1951) → 78% (2018-22) = 61.33 percentage points increase', 'higher literacy rate = better human capital formation'],
                  hint: 'If stuck on expenditure ratios, revisit "Government Budget and the Economy" (Class 12.',
                  misconception: 'Students believe "higher literacy rate = better human capital formation" and treat all educational indicators as interchangeable.' },
                { id: 'c', prompt: 'In 2020-21, Sikkim\'s per capita public expenditure on elementary education was ₹96,968 while Bihar\'s was ₹10,710.', answer: 'Sikkim total = ₹96,968 × 80,000 = ₹7,757.44 crore',
                  options: ['Sikkim total = ₹96,968 × 80,000 = ₹7,757.44 crore', 'higher literacy rate = better human capital formation'],
                  hint: 'If stuck on expenditure ratios, revisit "Government Budget and the Economy" (Class 12.',
                  misconception: 'Students believe "higher literacy rate = better human capital formation" and treat all educational indicators as interchangeable.' }
          ],
            remediations: { 'higher-literacy-rate-better-human': { steps: ['Re-read Box 4.1 distinction between physical and human capital — human capital is "endogenously built in body and.', 'Compare Table 4.1 (health indicators like life expectancy 37.2→68.6) with Table 4.2 (education indicators) — note.', 'Calculate "literacy growth rate" vs "primary completion growth rate" for females 1990-2018: literacy (37.9→66 = 74%.', 'Write one sentence distinguishing "access indicator" (enrollment, completion) from "outcome indicator" (literacy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
