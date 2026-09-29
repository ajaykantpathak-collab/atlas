import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch01_p1: SimDef = {
    id: 'v3_c12_eco_ch01_p1',
    title: 'Introduction · Part 1/2',
    subtitle: 'Even billionaires can\'t buy a 25th hour',
    classLevel: 12, subject: 'economics', topic: 'Introduction · Part 1/2',
    chapters: ['c12_eco_ch01'],
    nodeIds: ['c12_eco_cbse_01_001', 'c12_eco_cbse_01_002', 'c12_eco_cbse_01_003', 'c12_eco_cbse_01_004', 'c12_eco_cbse_01_005', 'c12_eco_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economist', intro: 'Unlimited wants, limited resources — that collision is the whole of economics. Everything else is detail.', goal: 'Explain scarcity, choice and opportunity cost, and frame the economy\'s central problems on a PPF.' },
    discovery: {
        question: 'A billionaire and a street vendor both face scarcity. The billionaire has every rupee she needs — so what\'s still scarce for her?',
        options: ['Time, attention and unique goods — scarcity is unlimited wants versus limited resources, and no fortune buys a 25th hour', 'Nothing — scarcity is only a poor person\'s problem', 'Her accountant handles scarcity for her', 'Money — even billionaires run out eventually'],
        answer: 'Time, attention and unique goods — scarcity is unlimited wants versus limited resources, and no fortune buys a 25th hour',
        hook: 'Scarcity isn\'t shortage — a shortage is a temporary market gap; scarcity is permanent and universal. And opportunity cost isn\'t what you spent — it\'s the next best alternative you gave up, including the ₹3 lakh salary a student forgoes for college.',
    },
    teaching: [
        { title: 'Scarcity and Choice: The Fundamental Economic Problem', text: 'Scarcity is the fundamental economic condition where unlimited human wants exceed the limited resources available to satisfy them, forcing every economic agent (individuals, firms, government).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Put a price on every choice: compute the opportunity cost of a Sunday\'s three options, then draw the trade-offs a Punjab farmer faces choosing wheat over rice on the production possibility frontier.',
        labels: ['Scarcity and Choice', 'Central Problems of', 'Production Possibility Frontier: Construction', 'Opportunity Cost: Meaning', 'Marginal Rate of Transformation', 'Microeconomics and Macroeconomics: Distinction'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_001', title: 'Scarcity and Choice: The Fundamental Economic Problem',
          scaffold: { problem: 'A small textile firm in Surat has 200 metres of cloth and 500 labour-hours per week.',
            steps: [
            { text: 'Verify current resource usage: Shirts 40 → 80m cloth, 160 hrs labour; Kurtas 20 → 60m cloth, 100 hrs labour.' },
            { text: 'To reach PPF, find binding constraint. Cloth constraint: 2S + 3K = 200. Labour constraint: 4S + 5K = 500.' },
            { text: 'Correct approach: Since cloth is scarcer per unit (2m vs 3m but labour 4 vs 5), find max output on cloth constraint: 2S.' },
            { text: 'Original kurtas = 20. New kurtas = 33.33. Wait — kurtas *increased*? That means original point was inside PPF.' },
            { text: 'On PPF, 2S + 3K = 200 → K = (200-2S)/3. MRT = dK/dS = -2/3. Opportunity cost of 1 shirt = 2/3 kurta.', faded: true, blankAnswer: 'Opportunity cost of 10 additional shirts = 6.67 kurtas (at.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_002', title: 'Central Problems of an Economy: What, How and For Whom to Produce',
          caseStudy: { intro: 'Imagine a small farmer in Maharashtra with 2 hectares of land, family labour, some savings, and the choice to grow cotton, soyabean, or vegetables.',
            decisions: [{ prompt: 'Define the three central problems of an economy and state which scarce resource each problem primarily concerns.', options: [
                { text: 'The three central problems are: (1) **What to produce**', outcome: 'The three central problems are: (1) **What to produce** — concerns allocation of **land and.' },
                { text: 'resources', outcome: 'Not quite — Students often think the three central problems are **sequential** — first decide **What**, then.', reveals: 'the-three-central-problems-are' },
                { text: 'For whom to produce', outcome: 'Not quite — Students often think the three central problems are **sequential** — first decide **What**, then.', reveals: 'the-three-central-problems-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_003', title: 'Production Possibility Frontier: Construction and Properties',
          caseStudy: { intro: 'Imagine a farmer in Punjab who has 10 hectares of land and must decide how much wheat and rice to grow.',
            decisions: [{ prompt: 'What does a point lying exactly on the Production Possibility Frontier represent?', options: [
                { text: 'A point on the PPF represents a combination of two goods that is productively efficient', outcome: 'A point on the PPF represents a combination of two goods that is productively efficient — the.' },
                { text: 'it shows what the economy should produce', outcome: 'Not quite — Students often believe the PPF is always a straight line, or that any point on the PPF is "better".', reveals: 'the-ppf-is-always-a' },
                { text: 'it shows maximum profit', outcome: 'Not quite — Students often believe the PPF is always a straight line, or that any point on the PPF is "better".', reveals: 'the-ppf-is-always-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_004', title: 'Opportunity Cost: Meaning and Application via PPF',
          scaffold: { problem: 'A small island economy produces only fish (F) and coconuts (C). The following production possibilities are observed:',
            steps: [
            { text: 'Identify the two goods: Fish (horizontal axis, X) and Coconuts (vertical axis, Y).' },
            { text: 'Recall the formula for marginal opportunity cost of X: |ΔY / ΔX| between adjacent combinations.' },
            { text: 'Compute for each interval:' },
            { text: 'Observe the pattern: Opportunity cost rises from 1 to 3 coconuts per kg of fish.' },
            { text: 'Interpret economically: Resources (labour, boats, land) are specialized.', faded: true, blankAnswer: 'Marginal opportunity costs: A→B: 1, B→C: 1.5, C→D: 2, D→E.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_005', title: 'Marginal Rate of Transformation and Shape of PPF',
          scaffold: { problem: 'An economy produces only defence goods (D) and civilian goods (C). The PPF is given by the equation: C = 100 - 0.5 D^2, for 0 ≤ D ≤ 10√2.',
            steps: [
            { text: 'Recognize that MRT is the absolute value of the derivative dC/dD (slope of PPF).' },
            { text: 'Differentiate the PPF function: C = 100 - 0.5 D^2 → dC/dD = -D.' },
            { text: 'Take absolute value: MRT = |dC/dD| = D.' },
            { text: 'Evaluate at D = 4: MRT = 4. This means producing the 4th unit of defence goods requires sacrificing 4 units of civilian.' },
            { text: 'Evaluate at D = 8: MRT = 8. The sacrifice has doubled because resources are increasingly specialized for civilian.' },
            { text: 'Conclude that MRT increases with D, confirming the PPF is concave to the origin.', faded: true, blankAnswer: 'At D=4, MRT = 4 civilian goods per defence good. At D=8.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_006', title: 'Microeconomics and Macroeconomics: Distinction and Scope',
          caseStudy: { intro: 'Imagine you are reading two headlines: "Onion prices in Delhi mandis hit ₹80/kg due to crop failure" and "India\'s GDP growth slows to 6.1%, RBI may cut repo.',
            decisions: [{ prompt: 'Define microeconomics and macroeconomics in one sentence each, as per the NCERT textbook.', options: [
                { text: 'Microeconomics is the study of individual economic agents (consumers, producers) and', outcome: 'Microeconomics is the study of individual economic agents (consumers, producers) and their.' },
                { text: 'microeconomics studies small firms, macro studies large firms', outcome: 'Not quite — Students often think the distinction between micro and macro is merely about "small vs.', reveals: 'the-distinction-between-micro-and' },
                { text: 'the distinction between micro and macro is merely about "small vs', outcome: 'Not quite — Students often think the distinction between micro and macro is merely about "small vs.', reveals: 'the-distinction-between-micro-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On Sunday a student picks a free cricket match over a ₹500 tutoring shift and a study block, then tells his mother the outing \'cost nothing — entry was free\'.',
            decisions: [{ prompt: 'What did the afternoon actually cost?', options: [
                { text: 'The value of the next best alternative forgone — the ₹500 earnings if work outranks study for him; zero ticket price doesn\'t make the choice costless because his time was scarce.', outcome: 'Opportunity cost is what you gave up, not what you paid; a free event still consumes hours that had a best alternative use.' },
                { text: 'Nothing — with no money spent, there\'s no cost at all.', outcome: 'Scarcity binds through time even when price is zero; every choice forfeits a next-best use.', reveals: 'free-means-no-cost' },
                { text: 'The combined value of everything else he could have done — tutoring pay plus study gains together.', outcome: 'Opportunity cost is the single best alternative, not the sum of all forgone options — you could only ever have picked one of them.', reveals: 'cost-is-all-alternatives' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see the hidden price tag on every decision — the forgone alternative. That single idea powers everything from consumer theory to government budgets.',
            decisions: [{ prompt: 'What comes next? Introduction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_001', difficulty: 'standard',
          question: 'Scarcity is the fundamental economic condition where unlimited human wants.',
          hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6 (factors of production) and c9_eco_ch1_1.',
          misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality.',
          parts: [
                { id: 'a', prompt: 'A factory has 100 machine-hours and 50 labour-hours daily. It produces two goods: A (requires 2 machine-hours, 1 labour-hour per unit) and B (requires 1.', answer: 'Current usage: A=20 → 40 machine-hrs, 20 labour-hrs',
                  options: ['Current usage: A=20 → 40 machine-hrs, 20 labour-hrs', '5 units of B', 'people or countries —', 'government can just spend more'],
                  hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6 (factors of production) and c9_eco_ch1_1 to c9_eco_ch1_3.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' },
                { id: 'b', prompt: 'Compare how scarcity manifests for a household versus the Government of India. Use the concepts of budget constraint and fiscal deficit in your answer.', answer: 'A household faces a hard budget constraint: spending ≤ income + borrowing',
                  options: ['A household faces a hard budget constraint: spending ≤ income + borrowing', 'government has no scarcity', 'people or countries —', 'government can just spend more'],
                  hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6 (factors of production) and c9_eco_ch1_1 to c9_eco_ch1_3.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' }
          ],
            remediations: { 'scarcity-only-applies-to-poor': { steps: ['If the student holds this misconception, assign: (1) Re-read c9_eco_ch1_1 and c9_eco_ch1_2 with focus on "universal".', '(2) Work through a time-allocation PPF: 24 hours → sleep/study/leisure; plot combinations; calculate MRT between study.', '(3) Analyse India\'s 2023-24 budget: identify three expenditure trade-offs (e.g., defence vs education vs subsidies) and.', '(4) Re-attempt Diagnostic Questions 4 and 5 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality.',
          parts: [
                { id: 'a', prompt: 'Construct a real-life scenario involving a Class 12 student choosing between three activities on a Sunday: (a) studying Economics for 4 hours, (b) working.', answer: 'If the student chooses (a), opportunity cost = max(₹500, enjoyment of match)',
                  options: ['If the student chooses (a), opportunity cost = max(₹500, enjoyment of match)', 'people or countries —', 'government can just spend more', 'scarcity only applies to "poor" people or countries'],
                  hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6 (factors of production) and c9_eco_ch1_1 to c9_eco_ch1_3.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' }
          ],
            remediations: { 'scarcity-only-applies-to-poor': { steps: ['If the student holds this misconception, assign: (1) Re-read c9_eco_ch1_1 and c9_eco_ch1_2 with focus on "universal".', '(2) Work through a time-allocation PPF: 24 hours → sleep/study/leisure; plot combinations; calculate MRT between study.', '(3) Analyse India\'s 2023-24 budget: identify three expenditure trade-offs (e.g., defence vs education vs subsidies) and.', '(4) Re-attempt Diagnostic Questions 4 and 5 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_002', difficulty: 'standard',
          question: 'The central problems of an economy — **What to produce**, **How to produce**.',
          hint: 'If stuck, revisit Class 8 Economics nodes c8_eco_ch1_2 to c8_eco_ch1_6 on factors.',
          misconception: 'Students often think the three central problems are **sequential** — first decide **What**, then **How**, then **For.',
          parts: [
                { id: 'a', prompt: 'Define the three central problems of an economy and state which scarce resource each problem primarily concerns.', answer: 'The three central problems are: (1) **What to produce**',
                  options: ['The three central problems are: (1) **What to produce**', 'resources', 'For whom to produce', 'who consumes'],
                  hint: 'If stuck, revisit Class 8 Economics nodes c8_eco_ch1_2 to c8_eco_ch1_6 on factors of production and.',
                  misconception: 'Students often think the three central problems are **sequential** — first decide **What**, then **How**, then **For whom**.' },
                { id: 'b', prompt: 'Why does the problem "For whom to produce" not disappear in a market economy even though prices allocate goods? Explain using the concept of factor ownership.', answer: 'In a market economy, goods go to those who can pay the market price',
                  options: ['In a market economy, goods go to those who can pay the market price', 'For whom to produce', 'who consumes'],
                  hint: 'If stuck, revisit Class 8 Economics nodes c8_eco_ch1_2 to c8_eco_ch1_6 on factors of production and.',
                  misconception: 'Students often think the three central problems are **sequential** — first decide **What**, then **How**, then **For whom**.' },
                { id: 'c', prompt: 'A village panchayat has 100 hectares of irrigated land. It can allocate the land to either wheat (yield 4 tonnes/hectare, requires 2 labourers/hectare).', answer: 'Let \\(x\\) = hectares of wheat, \\(y\\) = hectares of cotton',
                  options: ['Let \\(x\\) = hectares of wheat, \\(y\\) = hectares of cotton', 'For whom to produce', 'who consumes'],
                  hint: 'If stuck, revisit Class 8 Economics nodes c8_eco_ch1_2 to c8_eco_ch1_6 on factors of production and.',
                  misconception: 'Students often think the three central problems are **sequential** — first decide **What**, then **How**, then **For whom**.' }
          ],
            remediations: { 'the-three-central-problems-are': { steps: ['If a student cannot distinguish the three problems or thinks they are solved independently: 1.', 'Revisit **c9_eco_ch1_4, c9_eco_ch1_5, c9_eco_ch1_6** (Class 9 nodes on What, How, For Whom) — read the examples.', 'Draw a 2x2 table: Rows = Problems (What, How, For Whom); Columns = Key Resource (Land, Labour, Capital.', 'Fill it with Indian examples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_003', difficulty: 'standard',
          question: 'The Production Possibility Frontier (PPF) is a graphical representation showing.',
          hint: 'If stuck, revisit the concept of scarcity and the central problems of an economy.',
          misconception: 'Students often believe the PPF is always a straight line, or that any point on the PPF is "better" than points inside.',
          parts: [
                { id: 'a', prompt: 'Why is the Production Possibility Frontier downward sloping from left to right?', answer: 'The PPF slopes downward',
                  options: ['The PPF slopes downward', 'because of the law of demand', 'because prices fall', 'better'],
                  hint: 'If stuck, revisit the concept of scarcity and the central problems of an economy.',
                  misconception: 'Students often believe the PPF is always a straight line, or that any point on the PPF is "better" than points inside.' },
                { id: 'b', prompt: 'An economy produces only robots and corn. The following production possibilities schedule is given: Combination | Robots (units) | Corn (tonnes) A | 0 | 100.', answer: '(1) Label axes: X = Robots (0-6), Y = Corn (0-100)',
                  options: ['(1) Label axes: X = Robots (0-6), Y = Corn (0-100)', 'per unit', 'better', 'opportunity cost as 1 robot per 15 corn, or using the wrong combination'],
                  hint: 'If stuck, revisit the concept of scarcity and the central problems of an economy.',
                  misconception: 'Students often believe the PPF is always a straight line, or that any point on the PPF is "better" than points inside.' },
                { id: 'c', prompt: 'Consider two economies, Alpha and Beta, each producing only capital goods and consumer goods.', answer: 'A straight-line PPF (Alpha) implies constant opportunity cost',
                  options: ['A straight-line PPF (Alpha) implies constant opportunity cost', 'better', 'both have increasing cost or confusing'],
                  hint: 'If stuck, revisit the concept of scarcity and the central problems of an economy.',
                  misconception: 'Students often believe the PPF is always a straight line, or that any point on the PPF is "better" than points inside.' }
          ],
            remediations: { 'the-ppf-is-always-a': { steps: ['If the student draws a straight-line PPF for specialized resources: (1) Revisit c12_eco_cbse_01_001 (Scarcity and.', '(2) Use a concrete example: 10 acres of land, 5 acres fertile for wheat, 5 acres suitable for factories.', 'Show that shifting production from wheat to machines initially uses the factory-suitable land (low opportunity cost).', '(3) Plot the resulting combinations to see the concave shape emerge.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_004', difficulty: 'standard',
          question: 'Opportunity cost is the value of the next best alternative forgone when.',
          hint: 'If stuck on calculating opportunity cost, go back to the PPF schedule.',
          misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500").',
          parts: [
                { id: 'a', prompt: 'An economy produces only two goods: robots (X) and wheat (Y). The following PPF schedule is given: | Combination | Robots (X) | Wheat (Y in tonnes) |.', answer: '**3rd robot (C→D):** ΔX = 1, ΔY = 55 - 75 = -20 tonnes',
                  options: ['**3rd robot (C→D):** ΔX = 1, ΔY = 55 - 75 = -20 tonnes', 'the cost of buying a textbook is ₹500', 'opportunity cost is the **monetary expenditure** (e'],
                  hint: 'If stuck on calculating opportunity cost, go back to the PPF schedule in c12_eco_cbse_01_003 and.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' },
                { id: 'b', prompt: 'The PPF for an economy is given by the equation: Y = 100 - 2X - 0.5X², where X is units of capital goods and Y is units of consumer goods.', answer: 'The slope (marginal opportunity cost) is dY/dX = -2 - X',
                  options: ['The slope (marginal opportunity cost) is dY/dX = -2 - X', 'the cost of buying a textbook is ₹500', 'opportunity cost is the **monetary expenditure** (e'],
                  hint: 'If stuck on calculating opportunity cost, go back to the PPF schedule in c12_eco_cbse_01_003 and.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' }
          ],
            remediations: { 'opportunity-cost-is-the-monetary': { steps: ['Revisit **c12_eco_cbse_01_003** (PPF Construction) and re-plot the PPF from the worked example in that node.', 'Pick two adjacent points (e.g., B and C) and compute ΔY/ΔX manually.', 'Draw the chord connecting them and the tangent at the midpoint; compare slopes.', 'Write a one-sentence economic reason for the difference (e.g., "Land shifted from wheat to rice is less fertile for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_005', difficulty: 'standard',
          question: 'The Marginal Rate of Transformation (MRT) is the rate at which one good must.',
          hint: 'Revisit the PPF schedule in node c12_eco_cbse_01_003 and practice computing the sacrifice.',
          misconception: 'Students often think MRT is the same as the ratio of marginal costs (MC_Y/MC_X) and therefore always equal to the price.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Marginal Rate of Transformation (MRT) is the rate at',
                  options: ['The Marginal Rate of Transformation (MRT) is the rate at', 'Scarcity is the fundamental economic condition where unlimited human wants exceed the', 'The central problems of an economy — **What to produce**, **How to produce**, and **For', 'The Production Possibility Frontier (PPF) is a graphical representation showing all'],
                  hint: 'Revisit the PPF schedule in node c12_eco_cbse_01_003 and practice computing the sacrifice of one.',
                  misconception: 'Students often think MRT is the same as the ratio of marginal costs (MC_Y/MC_X) and therefore always equal to the price ratio.' }
          ],
            remediations: { 'mrt-is-the-same-as': { steps: ['If a student cannot compute MRT from a table, return to node c12_eco_cbse_01_003 (PPF construction) and practice.', 'If they confuse MRT with MRS, revisit the definition of opportunity cost in node c12_eco_cbse_01_004 and emphasize: MRT.', 'Use a concrete example: "To produce 1 more tractor, how many tonnes of wheat must we give up?" vs "To consume 1 more.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents — households.',
          hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.', answer: 'The Great Depression showed that the classical belief',
                  options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and Class 12.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' },
                { id: 'b', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab deciding how much wheat to plant.', answer: 'A farmer in Punjab deciding how much wheat to plant',
                  options: ['A farmer in Punjab deciding how much wheat to plant', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and Class 12.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
