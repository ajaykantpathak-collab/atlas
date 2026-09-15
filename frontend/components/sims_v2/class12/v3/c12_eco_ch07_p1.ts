import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch07_p1: SimDef = {
    id: 'v3_c12_eco_ch07_p1',
    title: 'Introduction to Macroeconomics · Part 1/2',
    subtitle: 'Why did the Depression need a whole new economics?',
    classLevel: 12, subject: 'economics', topic: 'Introduction to Macroeconomics · Part 1/2',
    chapters: ['c12_eco_ch07'],
    nodeIds: ['c12_eco_cbse_07_001', 'c12_eco_cbse_07_002', 'c12_eco_cbse_07_003', 'c12_eco_cbse_07_004', 'c12_eco_cbse_07_005', 'c12_eco_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Macroeconomist', intro: 'When 25% unemployment wouldn\'t fix itself, economists admitted markets don\'t always clear. Macroeconomics was born in that admission.', goal: 'Explain why aggregate outcomes differ from summed individual behaviours and identify the core macroeconomic variables.' },
    discovery: {
        question: 'Every household decides to save more by cutting spending. Classical logic says the nation gets richer — the Great Depression said otherwise. What goes wrong when everyone saves at once?',
        options: ['Fallacy of composition — less spending means less income for everyone, so actual national saving can fall even as planned saving rises', 'Nothing — more saving always means more investment', 'Banks steal the savings', 'Savings vanish into taxes'],
        answer: 'Fallacy of composition — less spending means less income for everyone, so actual national saving can fall even as planned saving rises',
        hook: 'Macro isn\'t micro scaled up — it\'s a different beast. Wage cuts help one firm hire; economy-wide wage cuts shrink everyone\'s income and demand, so hiring falls. That feedback loop is why Keynes invented macroeconomics in the Depression\'s rubble.',
    },
    teaching: [
        { title: 'Macroeconomics: Emergence and Scope', text: 'Macroeconomics is the branch of economics that studies the behaviour and performance of an economy as a whole by focusing on aggregate measures such as total output (GDP), employment, aggregate price.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the economy\'s vital signs — GDP, unemployment, inflation, growth — and trace how one collapsed sector (say, textile exports) cascades through the circular flow into a full recession via the multiplier.',
        labels: ['Macroeconomics: Emergence and Scope', 'Distinction Between Microeconomics', 'Circular Flow of Income', 'Stocks and Flows: Meaning', 'Leakages and Injections'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_001', title: 'Macroeconomics: Emergence and Scope',
          caseStudy: { intro: 'Imagine reading a 2021 newspaper headline: "India\'s GDP contracts 7.3% in 2020-21, unemployment hits 9.1%, but CPI inflation stays at 6.2%." You recall Class.',
            decisions: [{ prompt: 'Define macroeconomics and list three key aggregate variables it studies. How does it differ from microeconomics in its unit of analysis?', options: [
                { text: 'Macroeconomics studies the economy as a whole using aggregates like real GDP,', outcome: 'Macroeconomics studies the economy as a whole using aggregates like real GDP, unemployment rate.' },
                { text: 'macroeconomics studies large firms', outcome: 'Not quite — Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand.', reveals: 'macroeconomics-is-merely-microeconomics-added' },
                { text: 'aggregate', outcome: 'Not quite — Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand.', reveals: 'macroeconomics-is-merely-microeconomics-added' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_002', title: 'Distinction Between Microeconomics and Macroeconomics',
          caseStudy: { intro: 'Imagine you open a newspaper: the front page screams "India\'s GDP grows at 7.2%" while the business page says "Onion prices surge to ₹80/kg in Delhi mandis".',
            decisions: [{ prompt: 'Define microeconomics and macroeconomics in one sentence each, using the terms "individual economic agents" and "aggregate measures".', options: [
                { text: 'Microeconomics studies the behaviour of individual economic agents (households, firms) in', outcome: 'Microeconomics studies the behaviour of individual economic agents (households, firms) in specific.' },
                { text: 'individual', outcome: 'Not quite — Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates.', reveals: 'macroeconomics-microeconomics-number-of-agents' },
                { text: 'aggregate', outcome: 'Not quite — Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates.', reveals: 'macroeconomics-microeconomics-number-of-agents' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_003', title: 'Circular Flow of Income: Two-Sector Model',
          scaffold: { problem: 'In a two-sector economy, 500 households each own 2 hectares of land and supply 300 hours of labour per year.',
            steps: [
            { text: 'Calculate total land and labour supplied by households. Land = 500 households × 2 hectares = 1,000 hectares.' },
            { text: 'Calculate factor payments. Rent = 1,000 hectares × ₹20,000 = ₹20,00,00,000 (₹20 crore).' },
            { text: 'Verify firms\' factor demand matches. Each firm hires 10 hectares → 50 firms × 10 = 500 hectares? Wait — mismatch!' },
            { text: 'Total factor income of households = Total factor payments received = ₹32.5 crore (since all payments go to households).' },
            { text: 'Total output = 50 firms × 5,000 units = 2,50,000 units. Total revenue = 2,50,000 × ₹100 = ₹25,00,00,000 = ₹25 crore.' },
            { text: 'Check identity: Factor payments (₹32.5 crore) ≠ Revenue (₹25 crore). This violates the circular flow identity!', faded: true, blankAnswer: 'With consistent data (assuming full employment of supplied.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_004', title: 'Circular Flow of Income: Three-Sector and Four-Sector Models',
          scaffold: { problem: 'In a three-sector economy, households earn ₹10,000 crore as factor income.',
            steps: [
            { text: 'Disposable Income (Yd) = Factor Income - Direct Taxes + Transfer Payments = 10,000 - 1,500 + 500 = ₹9,000 crore.' },
            { text: 'Saving (S) = Yd - C = 9,000 - 7,200 = ₹1,800 crore.' },
            { text: 'Leakages = S + T = 1,800 + 1,500 = ₹3,300 crore. Injections = I + G = 1,800 + 2,000 = ₹3,800 crore.' },
            { text: 'Since Leakages (3,300) ≠ Injections (3,800), the economy is not in equilibrium. There is excess demand of ₹500 crore.' },
            { text: 'Equilibrium GDP (expenditure method) = C + I + G = 7,200 + 1,800 + 2,000 = ₹11,000 crore.', faded: true, blankAnswer: '(a) ₹9,000 crore, (b) ₹1,800 crore, (c) Leakages ₹3,300.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_005', title: 'Stocks and Flows: Meaning and Distinction with Examples',
          scaffold: { problem: '** On 1st April 2023, a firm\'s capital stock (machinery) was valued at ₹50 crore.',
            steps: [
            { text: 'Identify opening stock = ₹50 crore (capital stock on 1 Apr 2023).' },
            { text: 'Identify inflows (gross additions) = purchase of new machinery = ₹12 crore (flow during the year).' },
            { text: 'Identify outflows = sale of old machinery (book value ₹3 crore) + depreciation ₹4 crore = ₹7 crore (flows reducing.' },
            { text: 'Apply stock-flow identity: Closing Stock = Opening Stock + Inflows - Outflows = 50 + 12 - 7 = ₹55 crore.' },
            { text: 'Classify: Stocks — Capital stock (opening/closing). Flows — Gross investment (₹12 cr), Disinvestment/sale (₹3 cr).', faded: true, blankAnswer: '** Capital stock on 31st March 2024 = ₹55 crore. Stocks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_006', title: 'Leakages and Injections in the Circular Flow',
          scaffold: { problem: 'In an economy, households save ₹200 crore, pay taxes ₹150 crore, and import goods worth ₹100 crore.',
            steps: [
            { text: 'Identify leakages: S = 200, T = 150, M = 100. Sum = 450 crore.' },
            { text: 'Identify injections: I = 180, G = 200, X = 70. Sum = 450 crore.' },
            { text: 'Compare total leakages and total injections. They are equal (450 = 450).' },
            { text: 'Conclude the economy is in equilibrium. National income will remain constant.' },
            { text: 'Interpret: Since leakages = injections, there is no tendency for income to change.', faded: true, blankAnswer: 'Yes, the economy is in equilibrium. National income will.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a downturn, an op-ed urges every household to slash spending and save more, claiming \'if each family saves more, national saving must rise — it\'s just addition\'.',
            decisions: [{ prompt: 'Does everyone saving more lift national saving?', options: [
                { text: 'Not necessarily — the paradox of thrift: if all households cut consumption together, aggregate demand and income fall, and actual saving (S = I) can stay flat or even shrink despite bigger saving intentions.', outcome: 'What\'s true for one household is false for all at once — income is endogenous, so the aggregate doesn\'t behave like a scaled-up family budget.' },
                { text: 'Yes — the economy is just a big household, so saving more at the micro level always sums to more saving at the macro level.', outcome: 'That\'s the fallacy of composition: planned saving rises while the income drop it triggers erases the gain.', reveals: 'macro-is-scaled-micro' },
                { text: 'Yes — since saving equals Y minus C, cutting C mathematically must raise S.', outcome: 'Only if Y were fixed — but Y falls with the demand collapse, so the identity gives no free rise in S.', reveals: 'intent-equals-outcome' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see the economy as a system of feedbacks, not a pile of separate markets. That\'s the lens the rest of macro — and every Budget speech — is built on.',
            decisions: [{ prompt: 'What comes next? Introduction to Macroeconomics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Macroeconomics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_001', difficulty: 'standard',
          question: 'Macroeconomics is the branch of economics that studies the behaviour and.',
          hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the.',
          misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum.',
          parts: [
                { id: 'a', prompt: 'Define macroeconomics and list three key aggregate variables it studies. How does it differ from microeconomics in its unit of analysis?', answer: 'Macroeconomics studies the economy as a whole using aggregates like real GDP,',
                  options: ['Macroeconomics studies the economy as a whole using aggregates like real GDP,', 'macroeconomics studies large firms', 'aggregate', 'large-scale'],
                  hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the numerical.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves.' },
                { id: 'b', prompt: 'The Great Depression (1929–33) saw US unemployment peak at 25% while wages and prices fell.', answer: 'Individually, a firm cutting wages reduces costs and may hire more',
                  options: ['Individually, a firm cutting wages reduces costs and may hire more', 'lower wages always increase employment', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the numerical.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves.' },
                { id: 'c', prompt: 'Given India\'s 2019–21 data: Real GDP (₹ lakh crore): 2019–20: 145.7, 2020–21: 135.1; Unemployment rate (%): 2019–20: 4.8, 2020–21: 9.1; CPI inflation (%).', answer: 'Calculate the real GDP growth rate for 2020–21',
                  options: ['Calculate the real GDP growth rate for 2020–21', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the numerical.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves.' }
          ],
            remediations: { 'macroeconomics-is-merely-microeconomics-added': { steps: ['Revisit c9_eco_ch1_3 (opportunity cost) and c10_eco_cbse_02_003 (GDP meaning) to rebuild the micro-macro distinction.', 'Work through the paradox of thrift numerically: Assume Y = C + I, C = 100 + 0.8Y, I = 50.', 'Initial equilibrium Y = 750, S = 50.', 'Now households try to save more: C = 80 + 0.8Y.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum.',
          parts: [
                { id: 'a', prompt: '"Paradox of Thrift: If every household tries to save more by cutting consumption, national saving will not rise; it may fall." Evaluate this statement using.', answer: 'In a closed economy with no government: Y = C + I, and S ≡ Y − C ≡ I',
                  options: ['In a closed economy with no government: Y = C + I, and S ≡ Y − C ≡ I', 'saving rises because Y − C rises', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the numerical.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves.' },
                { id: 'b', prompt: 'Construct a short narrative (4–5 sentences) showing how a sudden drop in export demand for Indian textiles (an external shock) can trigger a recession through.', answer: 'A fall in textile exports reduces injections (X↓) into the circular flow',
                  options: ['A fall in textile exports reduces injections (X↓) into the circular flow', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the numerical.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves.' }
          ],
            remediations: { 'macroeconomics-is-merely-microeconomics-added': { steps: ['Revisit c9_eco_ch1_3 (opportunity cost) and c10_eco_cbse_02_003 (GDP meaning) to rebuild the micro-macro distinction.', 'Work through the paradox of thrift numerically: Assume Y = C + I, C = 100 + 0.8Y, I = 50.', 'Initial equilibrium Y = 750, S = 50.', 'Now households try to save more: C = 80 + 0.8Y.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_002', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents (households.',
          hint: 'If stuck, review the demand-supply model for a single market (c9_eco_ch2_10) and practice.',
          misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.',
          parts: [
                { id: 'a', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab decides to switch from wheat to cotton.', answer: 'A farmer in Punjab decides to switch from wheat to cotton',
                  options: ['A farmer in Punjab decides to switch from wheat to cotton', 'macroeconomics = microeconomics × number of agents', 'market demand for a good', 'aggregate demand for all goods'],
                  hint: 'If stuck, review the demand-supply model for a single market (c9_eco_ch2_10) and practice.',
                  misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.' }
          ],
            remediations: { 'macroeconomics-microeconomics-number-of-agents': { steps: ['Revisit c9_eco_ch2_10 (Market Equilibrium) to recall how individual demand curves are summed horizontally *holding.', 'Study c11_stat_cbse_05_002 (Arithmetic Mean) to see how averages (like price level) differ from sums.', 'Draw two diagrams side-by-side: (a) micro demand curve for onions (price of onions on Y-axis, quantity of onions.', 'Note the different Y-axis variables.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_003', difficulty: 'standard',
          question: 'The circular flow of income in a two-sector model illustrates the continuous.',
          hint: 'If confused about factor ownership, revisit c8_eco_ch1_2 to c8_eco_ch1_6.',
          misconception: 'Students draw the circular flow diagram with both real and monetary flows moving in the SAME direction (e.g., both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The circular flow of income in a two-sector model illustrates the continuous flow of',
                  options: ['The circular flow of income in a two-sector model illustrates the continuous flow of', 'Macroeconomics is the branch of economics that studies the behaviour and performance of', 'Microeconomics studies the behaviour of individual economic agents (households, firms)', 'The three-sector model extends the circular flow by adding the government sector'],
                  hint: 'If confused about factor ownership, revisit c8_eco_ch1_2 to c8_eco_ch1_6.',
                  misconception: 'Students draw the circular flow diagram with both real and monetary flows moving in the SAME direction (e.g., both clockwise).' }
          ],
            remediations: { 'students-draw-the-circular-flow': { steps: ['Revisit c12_eco_cbse_07_001 (Macroeconomics: Emergence and Scope) to recall the distinction between micro and macro.', 'Revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and c8_eco_ch1_4/5/6 (Land, Labour, Capital.', 'Draw the diagram from scratch on paper: two circles (Households, Firms), two markets (Factor Market, Product Market).', 'Say aloud for each arrow: "Real flow: factor services FROM households TO firms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_004', difficulty: 'standard',
          question: 'The three-sector model extends the circular flow by adding the government.',
          hint: 'If stuck, review c12_eco_cbse_07_003 (two-sector model) and practice drawing the diagram.',
          misconception: 'Students often treat government transfer payments (pensions, scholarships) as government purchases (G) and count them.',
          parts: [
                { id: 'a', prompt: 'Explain why imports (M) are treated as a leakage in the four-sector circular flow model, while exports (X) are an injection.', answer: 'Imports represent domestic income spent on foreign-produced goods',
                  options: ['Imports represent domestic income spent on foreign-produced goods', 'imports bring goods in, so they are an injection'],
                  hint: 'If stuck, review c12_eco_cbse_07_003 (two-sector model) and practice drawing the diagram with.',
                  misconception: 'Students often treat government transfer payments (pensions, scholarships) as government purchases (G) and count them as injections in the.' }
          ],
            remediations: { 'students-often-treat-government-transfer': { steps: ['Revisit node c12_eco_cbse_07_003 (two-sector model) and re-draw the diagram adding government: add a box "Government".', 'Write the identity S + T = I + G and verify with numbers: S=100, T=50, I=80, G=70 → leakages=150, injections=150.', 'Then add foreign sector: draw "Rest of World" with X arrow into firms, M arrow from households/firms to RoW.', 'Write S + T + M = I + G + X.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_005', difficulty: 'standard',
          question: 'A stock variable is an economic quantity measured at a specific point in time.',
          hint: 'If confused, revisit Class 11 Accountancy: "Financial Statements: Meaning and Objectives".',
          misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level*.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** "India\'s foreign exchange reserves stood at $640 billion on 31st March 2024.', answer: '**Correct:** Reserves ($640B) = stock (point in time)',
                  options: ['**Correct:** Reserves ($640B) = stock (point in time)', 'GDP is a stock because it measures the total size of the economy', 'Money supply is a flow', 'with the *noun*'],
                  hint: 'If confused, revisit Class 11 Accountancy: "Financial Statements: Meaning and Objectives".',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' },
                { id: 'b', prompt: '**APPLY:** Classify each as stock (S) or flow (F): (a) Government debt outstanding on 31st March 2024 (b) Fiscal deficit for 2023-24 (c) Money supply (M3).', answer: '**Correct:** (a) S, (b) F, (c) S, (d) F, (e) F, (f) S',
                  options: ['**Correct:** (a) S, (b) F, (c) S, (d) F, (e) F, (f) S', 'deficit accumulates into debt', 'GDP is the size of the economy', 'GDP is a stock because it measures the total size of the economy'],
                  hint: 'If confused, revisit Class 11 Accountancy: "Financial Statements: Meaning and Objectives".',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' },
                { id: 'c', prompt: '**ANALYZE:** "Net investment = Gross investment – Depreciation.', answer: '**Correct:** Net investment = 30 – 8 = ₹22 lakh crore',
                  options: ['**Correct:** Net investment = 30 – 8 = ₹22 lakh crore', 'GDP is a stock because it measures the total size of the economy', 'Money supply is a flow', 'with the *noun*'],
                  hint: 'If confused, revisit Class 11 Accountancy: "Financial Statements: Meaning and Objectives".',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' }
          ],
            remediations: { 'gdp-is-a-stock-because': { steps: ['Revisit the "water tank" analogy: Stock = water in tank (litres), Flow = tap inflow / drain outflow (litres/minute).', 'Practice classifying 20 variables from RBI\'s "Handbook of Statistics on Indian Economy" (Table 1.1: Money Stock, Table.', 'Re-do Diagnostic Q3 and Q4 with a peer; explain aloud why each is stock/flow.', 'If stuck on net investment logic, review Class 11 Depreciation (c11_acc_cbse_07_001 to 07_006) — depreciation is a flow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_006', difficulty: 'standard',
          question: 'Leakages are withdrawals from the circular flow of income — specifically.',
          hint: 'If stuck, review the four-sector circular flow diagram (node c12_eco_cbse_07_004) and.',
          misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage.',
          parts: [
                { id: 'a', prompt: 'List the three leakages and three injections in a four-sector circular flow model.', answer: 'Correct answer: Leakages',
                  options: ['Correct answer: Leakages', 'goods leaving the country', 'swaps any pair (e', 'omits one component shows incomplete knowledge of the four-sector model'],
                  hint: 'If stuck, review the four-sector circular flow diagram (node c12_eco_cbse_07_004) and practice.',
                  misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage because goods leave the.' },
                { id: 'b', prompt: 'Given the following data for an economy (in ₹ crore): S = 200, T = 150, M = 100, I = 180, G = 200, X = 70. Determine whether the economy is in equilibrium.', answer: 'Leakages = S + T + M = 200 + 150 + 100 = 450',
                  options: ['Leakages = S + T + M = 200 + 150 + 100 = 450', 'income will rise', 'miscalculates either sum (e'],
                  hint: 'If stuck, review the four-sector circular flow diagram (node c12_eco_cbse_07_004) and practice.',
                  misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage because goods leave the.' }
          ],
            remediations: { 'imports-are-an-injection-because': { steps: ['If the student cannot correctly classify flows, have them revisit the four-sector diagram (node c12_eco_cbse_07_004).', 'Create a two-column table: "Flow" and "Leakage or Injection?" Fill it with: Household saving → Leakage, Firm investment.', 'For each, ask: "Does this flow represent domestic income leaving the spending stream (leakage) or external spending.', 'If the equilibrium calculation is wrong, practice the algebraic condition S + T + M = I + G + X with 3-4 numerical sets.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
