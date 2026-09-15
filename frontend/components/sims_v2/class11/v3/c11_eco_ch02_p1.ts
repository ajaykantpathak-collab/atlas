import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch02_p1: SimDef = {
    id: 'v3_c11_eco_ch02_p1',
    title: 'Indian Economy 1950-1990 · Part 1/2',
    subtitle: 'Weigh the four goals of planning and the agriculture-first bet of 1951.',
    classLevel: 11, subject: 'economics', topic: 'Indian Economy 1950-1990 · Part 1/2',
    chapters: ['c11_eco_ch02'],
    nodeIds: ['c11_eco_cbse_02_001', 'c11_eco_cbse_02_002', 'c11_eco_cbse_02_003', 'c11_eco_cbse_02_004', 'c11_eco_cbse_02_005', 'c11_eco_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planner allocating ₹1,960 crore in 1951', intro: '360 million people, food grain at 51 million tonnes, the Bengal famine eight years behind you. Spend the plan.', goal: 'Explain the goals of Five Year Plans and justify the First Plan\'s agricultural priority.' },
    discovery: {
        question: 'The First Five Year Plan poured 44.6% of its outlay into agriculture and irrigation. Critics called it backward-looking next to the Second Plan\'s steel plants. What was the real logic?',
        options: ['A model-based choice: food was the binding constraint and irrigation gave fast returns on little capital', 'Tradition — planners simply had no industrial model available', 'Foreign pressure forced food-first spending', 'Agriculture was already the most modern sector'],
        answer: 'A model-based choice: food was the binding constraint and irrigation gave fast returns on little capital',
        hook: 'Self-reliance never meant \'import nothing\' — it meant not importing what India could produce; food still came in under PL-480.',
    },
    teaching: [
        { title: 'Planning and Five Year Plans: Objectives and Features', text: 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning Commission (now NITI Aayog) that specifies the quantitative targets and qualitative objectives for the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Apply compound growth to First-Plan GDP, then test whether self-reliance banned imports or only needless ones.',
        labels: ['Planning and Five Year', 'First Five Year Plan', 'Second Five Year Plan', 'Agriculture: Land Reforms', 'Green Revolution: HYV Seeds,', 'Green Revolution: Regional Spread'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_001', title: 'Planning and Five Year Plans: Objectives and Features',
          scaffold: { problem: 'India\'s real GDP (2011-12 base) was ₹2,24,786 crore in 1950-51 and ₹3,69,500 crore in 1980-81.',
            steps: [
            { text: 'Identify the CAGR formula: g = (GDP_end / GDP_start)^(1/n) - 1.' },
            { text: 'Substitute values: GDP_start = 2,24,786, GDP_end = 3,69,500, n = 30.' },
            { text: 'Compute ratio: 3,69,500 / 2,24,786 = 1.6438.' },
            { text: 'Compute 30th root: 1.6438^(1/30) = e^(ln(1.6438)/30) = e^(0.497/30) = e^0.01657 = 1.0167.' },
            { text: 'g = 1.0167 - 1 = 0.0167 = 1.67% per annum.' },
            { text: 'Rule of 72: Doubling time ≈ 72 / 1.67 ≈ 43 years.' },
            { text: 'Economic interpretation: At 1.67% annual growth, per capita income (with ~2% population growth) barely rose — this.', faded: true, blankAnswer: 'CAGR = 1.67% per annum; Doubling time ≈ 43 years.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_002', title: 'First Five Year Plan: Agriculture and Irrigation Focus',
          scaffold: { problem: 'The First Five Year Plan had a total outlay of ₹1,960 crore. Agriculture and irrigation received ₹874 crore.',
            steps: [
            { text: 'Verify agriculture allocation percentage: (874 / 1960) × 100 = 44.59% ≈ 44.6% — matches NCERT data' },
            { text: 'Harrod-Domar model: g = s/v → v = s/g. Target: v_target = 0.055 / 0.021 = 2.62.' },
            { text: 'Actual realised v: v_actual = s_actual / g_actual = 0.062 / 0.036 = 1.72.' },
            { text: 'Economic interpretation: Lower v_actual means investments were more productive than expected.' },
            { text: 'Decompose: If agriculture v=2.0 (weight 0.446), industry v=4.5 (weight 0.049), others v=3.0 (weight 0.505), weighted.', faded: true, blankAnswer: '(a) 44.6% verified. (b) Target v = 2.62. (c) Actual.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_003', title: 'Second Five Year Plan: Mahalanobis Model and Heavy Industry',
          caseStudy: { intro: 'Imagine you are a planner in 1956: India has low savings, no domestic machine-making industry, and must import all factory equipment using scarce foreign.',
            decisions: [{ prompt: 'State the two sectors in the Mahalanobis model and which sector receives priority investment in the Second Five Year Plan.', options: [
                { text: 'The two sectors are: (1) Capital goods sector (heavy industry producing machines, steel,', outcome: 'The two sectors are: (1) Capital goods sector (heavy industry producing machines, steel, equipment).' },
                { text: 'ignored agriculture', outcome: 'Not quite — Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only.', reveals: 'the-mahalanobis-model-ignored-agriculture' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_004', title: 'Agriculture: Land Reforms and Their Limited Success',
          scaffold: { problem: 'In a village, 100 hectares are cultivated by 40 tenant households under sharecropping (50% output share).',
            steps: [
            { text: 'Calculate current sharecropping income per tenant: 2.5 ha × 4 t/ha × ₹2,000/t × 50% share = ₹10,000' },
            { text: 'Calculate fixed-rent income per tenant: (2.5 ha × 5 t/ha × ₹2,000/t) - (2.5 ha × ₹25,000) = ₹25,000 - ₹62,500.' },
            { text: 'With well investment under sharecropping: extra yield = 2.5 ha × 1 t/ha = 2.5 tonnes; extra revenue = 2.5 × ₹2,000.' },
            { text: 'With well investment under fixed rent: extra revenue = ₹5,000 (full to tenant); net gain = ₹5,000 - ₹50,000 = -₹45,000' },
            { text: 'Both systems show negative return on well at current prices, but fixed rent gives tenant 100% of marginal return vs 50%.' },
            { text: 'At higher output price (₹3,000/t), sharecropping marginal gain = 2.5×1×₹3,000×0.5 - ₹50,000 = -₹46,250; fixed rent.', faded: true, blankAnswer: 'Sharecropping net income: ₹10,000; Fixed-rent net income.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_005', title: 'Green Revolution: HYV Seeds, Wheat and Rice Impact',
          scaffold: { problem: 'In 1966-67, India\'s wheat production was 11.4 million tonnes. By 1971-72, it reached 26.4 million tonnes.',
            steps: [
            { text: 'Identify beginning value (11.4 mt), ending value (26.4 mt), n = 5 years (1966-67 to 1971-72).' },
            { text: 'Apply CAGR formula: (26.4 / 11.4)^(1/5) - 1 = (2.3158)^(0.2) - 1.' },
            { text: 'Calculate: 2.3158^0.2 ≈ 1.1817, so CAGR = 0.1817 = 18.17% per annum.' },
            { text: 'Per capita growth rate ≈ Output growth rate - Population growth rate = 18.17% - 2.2% = 15.97% per annum.' },
            { text: 'Interpret: Wheat production grew nearly 8 times faster than population, explaining the rapid rise in per capita.', faded: true, blankAnswer: 'CAGR of wheat production = 18.17% per annum; Per capita.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_006', title: 'Green Revolution: Regional Spread and Equity Concerns',
          scaffold: { problem: 'In 1980-81, Punjab\'s wheat yield was 2,800 kg/ha with 95% area under HYV and 90% irrigated.',
            steps: [
            { text: 'Identify given yields and national average. Punjab = 2,800 kg/ha, Bihar = 1,100 kg/ha, National = 1,630 kg/ha.' },
            { text: 'Compute (a) Punjab % = (2,800 / 1,630) × 100 = 171.8%. (b) Bihar % = (1,100 / 1,630) × 100 = 67.5%.' },
            { text: 'Compute RDI = (Yield_max - Yield_min) / Yield_mean = (2,800 - 1,100) / 1,630 = 1,700 / 1,630 = 1.043.' },
            { text: 'Compute output shares. Punjab output = 2,800 kg/ha × 3.5 m ha = 9.8 mt.' },
            { text: 'Interpret: Despite Bihar having 48% larger wheat area (5.2 vs 3.5 m ha), Punjab produced 71% more wheat (9.8 vs 5.72.', faded: true, blankAnswer: '(a) 171.8%, (b) 67.5%, (c) RDI = 1.043, (d) Punjab share.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your economics society is simulating a Five Year Plan for a fictional 1950s India: budget covers only 40% of wishes — agriculture output (growth), heavy industry (modernisation/self-reliance), village schools (equity). A member allocates equally to all four goals \'because a plan must pursue growth, modernisation, self-reliance and equity simultaneously and equally — that\'s what planning means\'.',
            decisions: [{ prompt: 'Is equal simultaneous weighting how Indian plans actually worked?', options: [
                { text: 'No — with binding resource limits, each plan chose a lead goal: Plan I pushed agriculture for food security, Plan II chose heavy industry (modernisation + self-reliance) even at the cost of short-term consumption, later plans shifted with crises. Planning is prioritisation under constraint, not a parallel checklist.', outcome: 'The textbook says it plainly: different goals were emphasised in different plans — equal weights would have meant no strategy at all.' },
                { text: 'Yes — a plan that doesn\'t serve all four goals equally is biased and fails its mandate.', outcome: 'Scarce resources force sequencing; India\'s own plans prove it — Plan II knowingly sacrificed near-term consumption for steel and machines.', reveals: 'all-goals-equal-every-plan' },
                { text: 'Growth should always get the money — the other three goals are just outcomes of growth.', outcome: 'Growth without self-reliance left India food-and-tech dependent in the 1960s, and growth without equity concentrated gains — the goals interact but aren\'t automatic by-products.', reveals: 'growth-is-the-only-goal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Planning is rationing ambition — the early plans spent scarcest resources on the constraint that would have strangled everything else.',
            decisions: [{ prompt: 'What comes next? Indian Economy 1950-1990 · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Indian Economy 1950-1990 · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_001', difficulty: 'standard',
          question: 'A Five Year Plan in India is a comprehensive policy document formulated by the.',
          hint: 'If stuck, revisit c9_eco_ch1_1 (Scarcity) and c9_eco_ch1_3 (Opportunity Cost) to recall.',
          misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning',
                  options: ['A Five Year Plan in India is a comprehensive policy document formulated by the Planning', 'The First Five Year Plan (1951-56) was India\'s inaugural centralised economic plan based', 'The Mahalanobis Model, implemented in India\'s Second Five Year Plan (1956-61), is a', 'Land reforms refer to deliberate policy measures to change the ownership, tenancy, and'],
                  hint: 'If stuck, revisit c9_eco_ch1_1 (Scarcity) and c9_eco_ch1_3 (Opportunity Cost) to recall why every.',
                  misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal weight in every plan.' }
          ],
            remediations: { 'the-four-goals-growth': { steps: ['Re-read the NCERT paragraph: \'It will be unrealistic to expect all the goals of a plan to be given equal importance.', 'Create a timeline: Plan I (Agri/Growth) → Plan II (Industry/Modernisation+Self-reliance) → Plan III (Balance) → Plan.', 'For each plan, identify the *binding constraint* (food, capital goods, foreign exchange, poverty) and which goal was.', 'Practice the board-style question: \'Explain why the goal of self-reliance was emphasised in the first seven plans but.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_002', difficulty: 'standard',
          question: 'The First Five Year Plan (1951-56) was India\'s inaugural centralised economic.',
          hint: 'If stuck, revisit c11_eco_cbse_02_001 (planning goals) and c10_eco_cbse_02_008 (disguised.',
          misconception: 'Students believe the First Plan\'s agricultural focus was merely "traditional" or "backward-looking" compared to the.',
          parts: [
                { id: 'a', prompt: 'Calculate the annual compound growth rate of food grain production during the First Plan (1951: 51 MT, 1956: 65 MT).', answer: 'CAGR = (65/51)^(1/5) - 1 = (1.2745)^0.2 - 1 = 1.0498 - 1 = 4.98% ≈ 5.0%',
                  options: ['CAGR = (65/51)^(1/5) - 1 = (1.2745)^0.2 - 1 = 1.0498 - 1 = 4.98% ≈ 5.0%', 'better seeds', 'traditional', 'backward-looking'],
                  hint: 'If stuck, revisit c11_eco_cbse_02_001 (planning goals) and c10_eco_cbse_02_008 (disguised.',
                  misconception: 'Students believe the First Plan\'s agricultural focus was merely "traditional" or "backward-looking" compared to the Second Plan\'s "modern".' },
                { id: 'b', prompt: 'Compare the land reform strategy of the First Plan (abolition of intermediaries, tenancy reform, land ceiling) with the colonial zamindari system.', answer: 'Colonial zamindari: intermediaries (zamindars) collected rent without investing',
                  options: ['Colonial zamindari: intermediaries (zamindars) collected rent without investing', 'land ceiling', 'traditional', 'backward-looking'],
                  hint: 'If stuck, revisit c11_eco_cbse_02_001 (planning goals) and c10_eco_cbse_02_008 (disguised.',
                  misconception: 'Students believe the First Plan\'s agricultural focus was merely "traditional" or "backward-looking" compared to the Second Plan\'s "modern".' }
          ],
            remediations: { 'the-first-plan-s-agricultural': { steps: ['Re-read Box 2.5 (Ownership and Incentives) in NCERT — Soviet farmers packing rotten fruit illustrates why ownership.', 'Calculate capital-output ratio for Bhakra-Nangal: ₹245 crore investment → 1.4 Mha irrigation → 3-4 MT additional food.', 'Plot food grain production 1951-56 (51, 53, 57, 59, 65 MT) and compute year-on-year growth — see acceleration from.', 'Contrast with Second Plan allocation shift (agri 20%, industry 26%) and explain why wage-goods constraint forced First.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the First Plan\'s agricultural focus was merely "traditional" or "backward-looking" compared to the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The First Five Year Plan\'s success in achieving 3.6% growth proves the Harrod-Domar model is universally applicable to developing.', answer: 'The statement is false',
                  options: ['The statement is false', 'traditional', 'backward-looking', 'modern'],
                  hint: 'If stuck, revisit c11_eco_cbse_02_001 (planning goals) and c10_eco_cbse_02_008 (disguised.',
                  misconception: 'Students believe the First Plan\'s agricultural focus was merely "traditional" or "backward-looking" compared to the Second Plan\'s "modern".' }
          ],
            remediations: { 'the-first-plan-s-agricultural': { steps: ['Re-read Box 2.5 (Ownership and Incentives) in NCERT — Soviet farmers packing rotten fruit illustrates why ownership.', 'Calculate capital-output ratio for Bhakra-Nangal: ₹245 crore investment → 1.4 Mha irrigation → 3-4 MT additional food.', 'Plot food grain production 1951-56 (51, 53, 57, 59, 65 MT) and compute year-on-year growth — see acceleration from.', 'Contrast with Second Plan allocation shift (agri 20%, industry 26%) and explain why wage-goods constraint forced First.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_003', difficulty: 'standard',
          question: 'The Mahalanobis Model, implemented in India\'s Second Five Year Plan (1956-61).',
          hint: 'Revisit c11_eco_cbse_02_001 (goals of planning) and c11_eco_cbse_02_002 (First Plan).',
          misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture.',
          parts: [
                { id: 'a', prompt: 'In the Second Plan, total public sector outlay was ₹4,800 crore.', answer: 'Step 1: Total plan outlay = ₹4,800 crore',
                  options: ['Step 1: Total plan outlay = ₹4,800 crore', 'ignored agriculture'],
                  hint: 'Revisit c11_eco_cbse_02_001 (goals of planning) and c11_eco_cbse_02_002 (First Plan) — specifically.',
                  misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture vs ~30%.' },
                { id: 'b', prompt: 'The Industrial Policy Resolution 1956 classified industries into three schedules.', answer: 'Machine tools are the "machines that make machines"',
                  options: ['Machine tools are the "machines that make machines"', 'ignored agriculture'],
                  hint: 'Revisit c11_eco_cbse_02_001 (goals of planning) and c11_eco_cbse_02_002 (First Plan) — specifically.',
                  misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture vs ~30%.' }
          ],
            remediations: { 'the-mahalanobis-model-ignored-agriculture': { steps: ['Re-read the NCERT Box 2.3 on Mahalanobis and the paragraph on "Self-reliance" (page 21) — note the phrase "avoiding.', 'Draw the two-sector diagram: label axes "Capital Goods" and "Consumer Goods"; draw a production possibility frontier.', 'Compare with First Plan (node 002) — note First Plan *did* prioritize agriculture (irrigation).', 'Identify the missing link: the model assumed land reforms would raise agricultural productivity *without* large capital.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_004', difficulty: 'standard',
          question: 'Land reforms refer to deliberate policy measures to change the ownership.',
          hint: 'Revisit c8_eco_ch1_3 (Land as Factor of Production) and c9_eco_ch1_7 (Factors.',
          misconception: 'Students believe land reforms failed because "laws were not strict enough." In reality, laws were strict on paper but.',
          parts: [
                { id: 'a', prompt: 'A state imposes a land ceiling of 18 hectares for irrigated land. A landlord owns 100 hectares.', answer: 'Effective holding remains 100 hectares',
                  options: ['Effective holding remains 100 hectares', 'laws were not strict enough', 'land reforms failed'],
                  hint: 'Revisit c8_eco_ch1_3 (Land as Factor of Production) and c9_eco_ch1_7 (Factors of Production).',
                  misconception: 'Students believe land reforms failed because "laws were not strict enough." In reality, laws were strict on paper but deliberately.' },
                { id: 'b', prompt: 'Compare the land reform outcomes in Kerala/West Bengal versus Bihar/Uttar Pradesh.', answer: 'Kerala/West Bengal: (1) Left-front governments with ideological commitment to',
                  options: ['Kerala/West Bengal: (1) Left-front governments with ideological commitment to', 'laws were not strict enough', 'land reforms failed'],
                  hint: 'Revisit c8_eco_ch1_3 (Land as Factor of Production) and c9_eco_ch1_7 (Factors of Production).',
                  misconception: 'Students believe land reforms failed because "laws were not strict enough." In reality, laws were strict on paper but deliberately.' }
          ],
            remediations: { 'land-reforms-failed-because-laws': { steps: ['Re-read Box 2.5 (Ownership and Incentives) to internalize the principal-agent logic.', 'Construct a timeline: 1950 (abolition bills) → 1954 (first ceiling laws) → 1972 (national guidelines) → 1990s (most.', 'For each decade, identify ONE specific evasion tactic (e.g., 1950s: "self-cultivation" eviction; 1960s: Benami.', 'Map these to the three institutional weaknesses: legislative loopholes, judicial delays, administrative capture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_005', difficulty: 'standard',
          question: 'The Green Revolution refers to the transformative period (mid-1960s onwards).',
          hint: 'If stuck, review "Factors of Production" (c8_eco_ch1_2) and "Supply and Demand Basics".',
          misconception: 'Students often think the Green Revolution was *only* about seeds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Green Revolution refers to the transformative period (mid-1960s onwards) when Indian',
                  options: ['The Green Revolution refers to the transformative period (mid-1960s onwards) when Indian', 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning', 'The First Five Year Plan (1951-56) was India\'s inaugural centralised economic plan based', 'The Mahalanobis Model, implemented in India\'s Second Five Year Plan (1956-61), is a'],
                  hint: 'If stuck, review "Factors of Production" (c8_eco_ch1_2) and "Supply and Demand Basics".',
                  misconception: 'Students often think the Green Revolution was *only* about seeds.' }
          ],
            remediations: { 'the-green-revolution-was-only': { steps: ['Revisit the **production function** concept: Yield = f(Seeds, Water, Fertiliser, Labour, Management).', 'HYV seeds shift the function upward *only* when other inputs move along.', 'Use a numerical table: Show yield of traditional vs HYV wheat at 0, 50, 100, 150 kg N/ha.', 'Plot the two response curves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_006', difficulty: 'standard',
          question: 'The Green Revolution\'s regional spread refers to the uneven geographical.',
          hint: 'Revisit c11_eco_cbse_02_005 (HYV seed technology and marketed surplus) and.',
          misconception: 'Students often think the Green Revolution "failed" equity because it only helped rich farmers.',
          parts: [
                { id: 'a', prompt: 'What were the two main phases of the Green Revolution in India, and which crops and regions characterised each phase?', answer: 'Phase 1 (mid-1960s to mid-1970s): Wheat in Punjab, Haryana, Western UP',
                  options: ['Phase 1 (mid-1960s to mid-1970s): Wheat in Punjab, Haryana, Western UP', 'failed', 'did not eliminate inequality', 'increased inequality'],
                  hint: 'Revisit c11_eco_cbse_02_005 (HYV seed technology and marketed surplus) and c11_eco_cbse_02_004.',
                  misconception: 'Students often think the Green Revolution "failed" equity because it only helped rich farmers.' },
                { id: 'b', prompt: 'Why did the Green Revolution initially bypass rainfed regions like eastern Uttar Pradesh, Bihar, and Odisha despite high poverty and need for food?', answer: 'HYV seeds are input-responsive: they require assured irrigation, timely',
                  options: ['HYV seeds are input-responsive: they require assured irrigation, timely', 'farmers were lazy', 'soil was poor', 'failed'],
                  hint: 'Revisit c11_eco_cbse_02_005 (HYV seed technology and marketed surplus) and c11_eco_cbse_02_004.',
                  misconception: 'Students often think the Green Revolution "failed" equity because it only helped rich farmers.' },
                { id: 'c', prompt: 'A farmer in Punjab (irrigated) and a farmer in Bihar (rainfed) each cultivate 2 hectares of wheat.', answer: 'Step 1: Punjab yield = 5.5 t/ha × 2 ha = 11 tonnes',
                  options: ['Step 1: Punjab yield = 5.5 t/ha × 2 ha = 11 tonnes', 'failed', 'did not eliminate inequality', 'increased inequality'],
                  hint: 'Revisit c11_eco_cbse_02_005 (HYV seed technology and marketed surplus) and c11_eco_cbse_02_004.',
                  misconception: 'Students often think the Green Revolution "failed" equity because it only helped rich farmers.' },
                { id: 'd', prompt: 'The government provided subsidised fertiliser and low-interest credit to promote equity. Yet, studies show large farmers captured a disproportionate share.', answer: '1) Credit access: Institutional loans required land title as collateral',
                  options: ['1) Credit access: Institutional loans required land title as collateral', 'corruption', 'ignorance', 'failed'],
                  hint: 'Revisit c11_eco_cbse_02_005 (HYV seed technology and marketed surplus) and c11_eco_cbse_02_004.',
                  misconception: 'Students often think the Green Revolution "failed" equity because it only helped rich farmers.' }
          ],
            remediations: { 'the-green-revolution-failed-equity': { steps: ['Show data from NCERT — small farm yields caught up to large farm yields over time due to subsidies.', 'Contrast with Soviet Union example (Box 2.5) where *no* ownership led to *no* incentive — here, small farmers *had*.', 'Ask: "If subsidies were removed in 1970, would small farmers have adopted HYV?" Use the risk-aversion concept from.', 'Conclude: State intervention *mitigated* but could not *eliminate* structural disparities (irrigation, tenancy).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
