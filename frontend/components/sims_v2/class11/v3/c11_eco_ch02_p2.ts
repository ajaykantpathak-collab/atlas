import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch02_p2: SimDef = {
    id: 'v3_c11_eco_ch02_p2',
    title: 'Indian Economy 1950-1990 · Part 2/2',
    subtitle: 'Weigh the four goals of planning and the agriculture-first bet of 1951.',
    classLevel: 11, subject: 'economics', topic: 'Indian Economy 1950-1990 · Part 2/2',
    chapters: ['c11_eco_ch02'],
    nodeIds: ['c11_eco_cbse_02_007', 'c11_eco_cbse_02_008', 'c11_eco_cbse_02_009', 'c11_eco_cbse_02_010', 'c11_eco_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planner allocating ₹1,960 crore in 1951', intro: '360 million people, food grain at 51 million tonnes, the Bengal famine eight years behind you. Spend the plan.', goal: 'Explain the goals of Five Year Plans and justify the First Plan\'s agricultural priority.' },
    discovery: {
        question: 'The First Five Year Plan poured 44.6% of its outlay into agriculture and irrigation. Critics called it backward-looking next to the Second Plan\'s steel plants. What was the real logic?',
        options: ['A model-based choice: food was the binding constraint and irrigation gave fast returns on little capital', 'Tradition — planners simply had no industrial model available', 'Foreign pressure forced food-first spending', 'Agriculture was already the most modern sector'],
        answer: 'A model-based choice: food was the binding constraint and irrigation gave fast returns on little capital',
        hook: 'Self-reliance never meant \'import nothing\' — it meant not importing what India could produce; food still came in under PL-480.',
    },
    teaching: [
        { title: 'Industry: Industrial Policy Resolution 1956 and Public Sector', text: 'The Industrial Policy Resolution 1956 (IPR 1956) was a landmark policy that classified all industries into three schedules: Schedule A (17 industries exclusively owned by the state), Schedule B (12.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Apply compound growth to First-Plan GDP, then test whether self-reliance banned imports or only needless ones.',
        labels: ['Industry: Industrial Policy Resolution', 'Small Scale Industries: Reservation', 'Trade Policy: Import Substitution', 'Import Substitution: Rationale', 'Critique of Planning Strategy'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_007', title: 'Industry: Industrial Policy Resolution 1956 and Public Sector',
          scaffold: { problem: 'Classify the following proposed industries in 1960s India into IPR 1956 schedules with justification: (a) A new integrated steel plant.',
            steps: [
            { text: 'Recall the three schedules: Schedule A (17 industries, exclusive state monopoly), Schedule B (12 industries, state.' },
            { text: 'Identify the nature of each industry. Steel and defense aircraft are explicitly listed in Schedule A in the actual.' },
            { text: 'Apply classification: (a) Bokaro steel -> Schedule A (iron and steel is Schedule A).' },
            { text: 'Verify against licensing requirement: Even Schedule C textile mill needs a license to start, but ownership is private.' },
            { text: 'Economic interpretation: Strategic/defense and basic infrastructure (steel) kept under state control; intermediate.', faded: true, blankAnswer: '(a) Schedule A, (b) Schedule B, (c) Schedule C, (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_008', title: 'Small Scale Industries: Reservation and Protection',
          scaffold: { problem: 'In 1985, the SSI investment ceiling was ₹35 lakh. A reserved product (leather footwear) can be made by an SSI unit with ₹28 lakh investment.',
            steps: [
            { text: 'Identify given data — SSI: Investment = ₹28 lakh, Workers = 14; Large: Investment = ₹140 lakh, Workers = 20.' },
            { text: 'Compute L/K ratios — SSI: 14/28 = 0.5 workers per ₹1 lakh = 5 workers per ₹10 lakh.' },
            { text: 'Calculate number of units possible — SSI units = 2800/28 = 100 units. Large units = 2800/140 = 20 units.' },
            { text: 'Compute total employment — SSI: 100 × 14 = 1400 workers. Large: 20 × 20 = 400 workers.' },
            { text: 'Compare with labour supply — SSI employs 1400 (70% of 2000), Large employs 400 (20%).' },
            { text: 'Evaluate output trade-off — Assume SSI output per ₹1 lakh = Q. Large output per ₹1 lakh = 1.4Q.', faded: true, blankAnswer: '(a) SSI L/K = 5 workers/₹10 lakh; Large L/K = 1.43.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_009', title: 'Trade Policy: Import Substitution Strategy',
          caseStudy: { intro: 'Imagine you run a small Indian bicycle factory in 1965. You see imported bicycles from Japan selling cheaper and better than yours.',
            decisions: [{ prompt: 'Define import substitution strategy and name the two specific policy instruments used to implement it in India during 1950-1990.', options: [
                { text: 'Import substitution is an inward-looking trade strategy that aims to replace imports with', outcome: 'Import substitution is an inward-looking trade strategy that aims to replace imports with domestic.' },
                { text: 'restrictions', outcome: 'Not quite — Students often believe import substitution means "zero imports" or "complete ban on foreign goods.".', reveals: 'import-substitution-means-zero-imports' },
                { text: 'zero imports', outcome: 'Not quite — Students often believe import substitution means "zero imports" or "complete ban on foreign goods.".', reveals: 'import-substitution-means-zero-imports' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_010', title: 'Import Substitution: Rationale and Limitations',
          scaffold: { problem: 'In 1975, India imposed a 150% tariff on fully built imported cars (world price ₹40,000).',
            steps: [
            { text: 'Calculate domestic price of imported car after tariff: World price ₹40,000 + 150% tariff = ₹40,000 + ₹60,000 = ₹100,000' },
            { text: 'Calculate domestic cost of imported components: World price ₹20,000 + 50% tariff = ₹20,000 + ₹10,000 = ₹30,000' },
            { text: 'Compute Value Added at Domestic Prices = Domestic final price - Domestic input cost = ₹100,000 - ₹30,000 = ₹70,000' },
            { text: 'Compute Value Added at Free Trade Prices = World final price - World input price = ₹40,000 - ₹20,000 = ₹20,000' },
            { text: 'Calculate ERP = [(₹70,000 - ₹20,000) / ₹20,000] × 100 = (₹50,000 / ₹20,000) × 100 = 250%', faded: true, blankAnswer: 'ERP = 250%. The domestic car assembly industry enjoys 2.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_011', title: 'Critique of Planning Strategy: Achievements and Failures',
          scaffold: { problem: 'Using the data below from India\'s National Accounts, compute the average annual growth rate of GDP for the entire planning period 1950-51.',
            steps: [
            { text: 'Identify the formula for compound annual growth rate (CAGR): r = (End Value / Start Value)^(1/n) - 1.' },
            { text: 'For 1950-51 to 1990-91 (n=40): r_full = (10,83,572 / 2,24,786)^(1/40) - 1 = (4.82)^(0.025) - 1.' },
            { text: 'For 1980-81 to 1990-91 (n=10): r_late = (10,83,572 / 5,78,432)^(1/10) - 1 = (1.873)^(0.1) - 1.' },
            { text: 'Compare: Full period growth = 4.01%, last decade = 6.48%. The acceleration in the 1980s (often attributed to fiscal.' },
            { text: 'Economic interpretation: While the overall 4% growth was respectable, the structural failure (occupational structure.', faded: true, blankAnswer: 'Full period (1950-91): 4.01% per annum; 1980-91: 6.48% per.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your economics society is simulating a Five Year Plan for a fictional 1950s India: budget covers only 40% of wishes — agriculture output (growth), heavy industry (modernisation/self-reliance), village schools (equity). A member allocates equally to all four goals \'because a plan must pursue growth, modernisation, self-reliance and equity simultaneously and equally — that\'s what planning means\'.',
            decisions: [{ prompt: 'Is equal simultaneous weighting how Indian plans actually worked?', options: [
                { text: 'No — with binding resource limits, each plan chose a lead goal: Plan I pushed agriculture for food security, Plan II chose heavy industry (modernisation + self-reliance) even at the cost of short-term consumption, later plans shifted with crises. Planning is prioritisation under constraint, not a parallel checklist.', outcome: 'The textbook says it plainly: different goals were emphasised in different plans — equal weights would have meant no strategy at all.' },
                { text: 'Yes — a plan that doesn\'t serve all four goals equally is biased and fails its mandate.', outcome: 'Scarce resources force sequencing; India\'s own plans prove it — Plan II knowingly sacrificed near-term consumption for steel and machines.', reveals: 'all-goals-equal-every-plan' },
                { text: 'Growth should always get the money — the other three goals are just outcomes of growth.', outcome: 'Growth without self-reliance left India food-and-tech dependent in the 1960s, and growth without equity concentrated gains — the goals interact but aren\'t automatic by-products.', reveals: 'growth-is-the-only-goal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Planning is rationing ambition — the early plans spent scarcest resources on the constraint that would have strangled everything else.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_007', difficulty: 'standard',
          question: 'The Industrial Policy Resolution 1956 (IPR 1956) was a landmark policy that.',
          hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 11 Chapter 2.1.',
          misconception: 'Students often think "public sector dominance meant the private sector was banned from heavy industries." In reality.',
          parts: [
                { id: 'a', prompt: 'Explain why the IPR 1956 placed industries in Schedule B under a unique "state starts new units, private sector supplements" arrangement instead of leaving.', answer: 'Correct answer: These industries (e.g., machine tools, fertilizers) were',
                  options: ['Correct answer: These industries (e.g., machine tools, fertilizers) were', 'private sector was weak'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 11 Chapter 2.1 (Introduction).',
                  misconception: 'Students often think "public sector dominance meant the private sector was banned from heavy industries." In reality, Schedule B explicitly.' },
                { id: 'b', prompt: 'The NCERT text states: "A big industrialist would get a license not for starting a new firm but to prevent competitors from starting new firms." Analyze how.', answer: 'Correct answer: Licensing created artificial entry barriers',
                  options: ['Correct answer: Licensing created artificial entry barriers', 'licensing ensured optimal capacity'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Mixed Economy) and Class 11 Chapter 2.1 (Introduction).',
                  misconception: 'Students often think "public sector dominance meant the private sector was banned from heavy industries." In reality, Schedule B explicitly.' }
          ],
            remediations: { 'public-sector-dominance-meant-the': { steps: ['Re-read the IPR 1956 classification table in NCERT (page 29) and create a three-column chart: Schedule A (State only).', 'For each schedule, write one sentence explaining the economic rationale (strategic importance, capital intensity.', 'Compare with the 1948 Industrial Policy Resolution (two-fold classification) to see the evolution.', 'Attempt Diagnostic Question 1 again without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_008', difficulty: 'standard',
          question: 'Small Scale Industries (SSI) are industrial units defined by a ceiling.',
          hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor.',
          misconception: 'Students think "small scale industry" means small physical size or few workers.',
          parts: [
                { id: 'a', prompt: 'State the investment ceiling that defined a Small Scale Industry in 1950 and the revised ceiling by 1990. Why was this ceiling periodically raised?', answer: 'In 1950, the ceiling was ₹5 lakh',
                  options: ['In 1950, the ceiling was ₹5 lakh', 'ceiling was lowered', 'ceiling never changed', 'small scale industry'],
                  hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor definitions.',
                  misconception: 'Students think "small scale industry" means small physical size or few workers.' },
                { id: 'b', prompt: 'The Karve Committee (1955) recommended promoting SSIs for rural development.', answer: 'SSIs are labour-intensive (high labour-capital ratio)',
                  options: ['SSIs are labour-intensive (high labour-capital ratio)', 'small size', 'low investment', 'small scale industry'],
                  hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor definitions.',
                  misconception: 'Students think "small scale industry" means small physical size or few workers.' },
                { id: 'c', prompt: 'A reserved product (handloom cloth) can be produced by an SSI using 10 workers and ₹20 lakh capital, or a large mill using 4 workers and ₹80 lakh capital.', answer: 'SSI: 10 workers / ₹20 lakh = 5 workers per ₹10 lakh',
                  options: ['SSI: 10 workers / ₹20 lakh = 5 workers per ₹10 lakh', 'small scale industry', 'why SSIs generate employment', 'because they are small'],
                  hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor definitions.',
                  misconception: 'Students think "small scale industry" means small physical size or few workers.' },
                { id: 'd', prompt: 'The government reserved 800+ products for SSIs but also gave them lower excise duty and priority bank lending.', answer: 'They are complements',
                  options: ['They are complements', 'small scale industry', 'why SSIs generate employment', 'because they are small'],
                  hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor definitions.',
                  misconception: 'Students think "small scale industry" means small physical size or few workers.' }
          ],
            remediations: { 'small-scale-industry-means-small': { steps: ['Revisit the definition — write "SSI = investment ≤ ceiling" on a card.', 'Calculate labour-capital ratio for 3 hypothetical firms (vary investment, hold workers constant).', 'Plot investment (x-axis) vs workers (y-axis) — SSI policy is a vertical line at the ceiling; units to the left are SSI.', 'Explain aloud: "The vertical line forces firms to use more labour per rupee of capital."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "small scale industry" means small physical size or few workers.',
          parts: [
                { id: 'a', prompt: 'Design a modified SSI policy for a hypothetical state with 40% urban unemployment and capital scarcity.', answer: 'investment ceiling, (',
                  options: ['investment ceiling, (', 'small scale industry', 'why SSIs generate employment', 'because they are small'],
                  hint: 'If stuck, revisit c8_eco_ch1_4 (labour) and c8_eco_ch1_5 (capital) to clarify factor definitions.',
                  misconception: 'Students think "small scale industry" means small physical size or few workers.' }
          ],
            remediations: { 'small-scale-industry-means-small': { steps: ['Revisit the definition — write "SSI = investment ≤ ceiling" on a card.', 'Calculate labour-capital ratio for 3 hypothetical firms (vary investment, hold workers constant).', 'Plot investment (x-axis) vs workers (y-axis) — SSI policy is a vertical line at the ceiling; units to the left are SSI.', 'Explain aloud: "The vertical line forces firms to use more labour per rupee of capital."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_009', difficulty: 'standard',
          question: 'Import substitution is an inward-looking trade strategy where a country.',
          hint: 'Revisit Class 9 market equilibrium (c9_eco_ch2_10) and Class 10 foreign trade.',
          misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India.',
          parts: [
                { id: 'a', prompt: 'Suppose India imposes a 50% tariff on imported cars. The world price of a car is ₹10 lakh.', answer: 'Step 1: World price = ₹10 lakh',
                  options: ['Step 1: World price = ₹10 lakh', 'zero imports', 'complete ban on foreign goods', 'import substitution means "zero imports" or "complete ban on foreign goods'],
                  hint: 'Revisit Class 9 market equilibrium (c9_eco_ch2_10) and Class 10 foreign trade (c10_eco_cbse_04_002).',
                  misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India never banned all.' },
                { id: 'b', prompt: 'Analyze how import substitution affected the following three variables in India during 1950-1990: (a) Industrial sector\'s share in GDP, (b) Variety.', answer: 'Industrial sector\'s share in GDP, (',
                  options: ['Industrial sector\'s share in GDP, (', 'zero imports', 'complete ban on foreign goods', 'import substitution means "zero imports" or "complete ban on foreign goods'],
                  hint: 'Revisit Class 9 market equilibrium (c9_eco_ch2_10) and Class 10 foreign trade (c10_eco_cbse_04_002).',
                  misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India never banned all.' }
          ],
            remediations: { 'import-substitution-means-zero-imports': { steps: ['Show the student India\'s actual import data - in 1990-91, imports were 8.3% of GDP, not zero.', 'Distinguish between "consumer goods imports" (heavily restricted) and "capital goods/technology imports" (permitted.', 'Use the car example - Premier Padmini and Ambassador were domestic cars, but India still imported CKD (completely.', 'Have the student re-read the NCERT line: "Protection from imports took two forms: tariffs and quotas" - neither is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_010', difficulty: 'standard',
          question: 'Import substitution is an inward-looking trade strategy where a country.',
          hint: 'Revisit the distinction between nominal tariff rate (on final good) and effective rate.',
          misconception: 'Students often believe import substitution failed because protection itself is economically wrong.',
          parts: [
                { id: 'a', prompt: 'Explain why Indian planners in the 1950s believed import substitution was necessary for a newly independent country.', answer: 'Planners argued that Indian industries were like \'infants\'',
                  options: ['Planners argued that Indian industries were like \'infants\'', 'import substitution failed'],
                  hint: 'Revisit the distinction between nominal tariff rate (on final good) and effective rate.',
                  misconception: 'Students often believe import substitution failed because protection itself is economically wrong.' },
                { id: 'b', prompt: 'In 1980, an Indian car manufacturer produced 50,000 units annually at ₹50,000 per car. A comparable Japanese car cost ₹30,000 internationally.', answer: 'Japanese car international price = ₹30,000',
                  options: ['Japanese car international price = ₹30,000', 'protection makes domestic industry genuinely competitive', 'import substitution failed'],
                  hint: 'Revisit the distinction between nominal tariff rate (on final good) and effective rate.',
                  misconception: 'Students often believe import substitution failed because protection itself is economically wrong.' }
          ],
            remediations: { 'import-substitution-failed-because-protection': { steps: ['Re-read the infant industry argument conditions — protection must be (a) time-bound, (b) conditional on export targets.', 'Compare with India\'s actual policy — no sunset clause, no performance conditions, applied to non-strategic consumer.', 'Use the telecom example from NCERT — government kept monopoly even after private sector could provide service, causing.', 'Conclude: the failure was in *governance of protection*, not the theoretical rationale.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_011', difficulty: 'standard',
          question: 'Critique of Planning Strategy refers to the systematic evaluation of India\'s.',
          hint: 'If stuck, revisit c11_eco_cbse_02_001 for goals, c11_eco_cbse_02_004/005 for agriculture.',
          misconception: 'Students believe "planning failed because India grew slowly (Hindu rate of growth ~3.5%)".',
          parts: [
                { id: 'a', prompt: 'Explain why the Green Revolution is considered an achievement of the planning strategy despite increasing regional disparities in its initial phase.', answer: 'The Green Revolution is an achievement',
                  options: ['The Green Revolution is an achievement', 'planning failed because India grew slowly (Hindu rate of growth ~3.5%)', '"planning failed'],
                  hint: 'If stuck, revisit c11_eco_cbse_02_001 for goals, c11_eco_cbse_02_004/005 for agriculture.',
                  misconception: 'Students believe "planning failed because India grew slowly (Hindu rate of growth ~3.5%)".' },
                { id: 'b', prompt: 'Using the sectoral GDP share data below, calculate the percentage point change in agriculture\'s share and industry\'s share between 1950-51 and 1990-91, and.', answer: 'Agriculture share change = 34.9 - 59.0 = -24.1 percentage points',
                  options: ['Agriculture share change = 34.9 - 59.0 = -24.1 percentage points', 'planning failed because India grew slowly (Hindu rate of growth ~3.5%)', '"planning failed'],
                  hint: 'If stuck, revisit c11_eco_cbse_02_001 for goals, c11_eco_cbse_02_004/005 for agriculture.',
                  misconception: 'Students believe "planning failed because India grew slowly (Hindu rate of growth ~3.5%)".' }
          ],
            remediations: { 'planning-failed-because-india-grew': { steps: ['Revisit c11_eco_cbse_02_001 (goals of planning) and c11_eco_cbse_02_010 (import substitution limitations) to separate.', 'Plot the occupational structure data (1950: 72.1% agriculture, 1990: 66.8%) alongside sectoral GDP shares (1950: 59%.', 'Read the "Modern Bread" and "telecommunication" examples in NCERT (pages 31-32) to distinguish strategic vs.', 'Write one paragraph explaining why "growth without structural change" is the core critique, not the growth rate itself.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
