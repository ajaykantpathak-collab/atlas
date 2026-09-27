import type { SimDef } from '../../engine/types';
import C12_EconomicsCircularFlowIncomeSim from '../../../simulations/c6_12/C12_EconomicsCircularFlowIncomeSim';

/** v3 wrapped master — C12_EconomicsCircularFlowIncomeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicscircularflowincomesim: SimDef = {
    id: 'v3w_c12_economicscircularflowincomesim',
    title: 'Circular Flow Income',
    subtitle: 'Covers the historical origin of macroeconomics (Keynesian revolution), its scope.',
    classLevel: 12, subject: 'economics', topic: 'Macroeconomics: Emergence and Scope',
    chapters: [],
    nodeIds: ['c12_eco_cbse_07_001', 'c12_eco_cbse_07_003', 'c12_eco_cbse_07_004', 'c12_eco_cbse_07_005', 'c12_eco_cbse_07_006', 'c12_eco_cbse_07_007', 'c12_eco_cbse_07_008', 'c12_eco_cbse_08_004', 'c12_eco_cbse_01_002', 'c12_eco_cbse_01_008', 'c12_eco_cbse_01_009', 'c12_eco_cbse_01_010', 'c12_eco_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine reading a 2021 newspaper headline: "India\'s GDP contracts 7.3% in 2020-21, unemployment hits 9.1%,.', goal: 'Master Circular Flow Income.' },
    discovery: {
        question: 'Define macroeconomics and list three key aggregate variables it studies. How does it differ from microeconomics in its unit of analysis?',
        options: ['Macroeconomics studies the economy as a whole using aggregates like real GDP,', 'macroeconomics studies large firms', 'aggregate'],
        answer: 'Macroeconomics studies the economy as a whole using aggregates like real GDP,',
        hook: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of.',
    },
    teaching: [
        { title: 'Macroeconomics is the branch of economics.', text: 'Macroeconomics is the branch of economics that studies the behaviour and performance of an economy as a whole by focusing on aggregate measures such as total output (GDP), employment, aggregate price.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_001', title: 'Macroeconomics is the branch of.',
          scaffold: { problem: 'The Reserve Bank of India\'s Annual Report 2022-23 states: "Real GDP grew at 7.2% in 2022-23, CPI inflation averaged 6.7%, and the.',
            steps: [
            { text: 'Recall the definition of macroeconomics — study of aggregate economy-wide variables.' },
            { text: 'Classify by time dimension. Real GDP growth rate is a flow (change in output over a year).' },
            { text: 'Explain \'lagging indicator\'. Unemployment rate reacts *after* output changes.' },
            { text: 'Connect to business cycle. At cyclical turning points, GDP leads, inflation is coincident, unemployment lags.' },
            { text: 'Interpret for policy. RBI focuses on inflation (flow, forward-looking) while government watches unemployment (stock,.', faded: true, blankAnswer: 'All three are macro variables. Real GDP growth: flow. CPI.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_003', title: 'The circular flow of income in a.',
          scaffold: { problem: 'In a two-sector economy, 500 households each own 2 hectares of land and supply 300 hours of labour per year.',
            steps: [
            { text: 'Calculate total land and labour supplied by households. Land = 500 households × 2 hectares = 1,000 hectares.' },
            { text: 'Calculate factor payments. Rent = 1,000 hectares × ₹20,000 = ₹20,00,00,000 (₹20 crore).' },
            { text: 'Verify firms\' factor demand matches. Each firm hires 10 hectares → 50 firms × 10 = 500 hectares? Wait — mismatch!' },
            { text: 'Total factor income of households = Total factor payments received = ₹32.5 crore (since all payments go to households).' },
            { text: 'Total output = 50 firms × 5,000 units = 2,50,000 units. Total revenue = 2,50,000 × ₹100 = ₹25,00,00,000 = ₹25 crore.' },
            { text: 'Check identity: Factor payments (₹32.5 crore) ≠ Revenue (₹25 crore). This violates the circular flow identity!', faded: true, blankAnswer: 'With consistent data (assuming full employment of supplied.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_004', title: 'The three-sector model extends the.',
          scaffold: { problem: 'In a three-sector economy, households earn ₹10,000 crore as factor income.',
            steps: [
            { text: 'Disposable Income (Yd) = Factor Income - Direct Taxes + Transfer Payments = 10,000 - 1,500 + 500 = ₹9,000 crore.' },
            { text: 'Saving (S) = Yd - C = 9,000 - 7,200 = ₹1,800 crore.' },
            { text: 'Leakages = S + T = 1,800 + 1,500 = ₹3,300 crore. Injections = I + G = 1,800 + 2,000 = ₹3,800 crore.' },
            { text: 'Since Leakages (3,300) ≠ Injections (3,800), the economy is not in equilibrium. There is excess demand of ₹500 crore.' },
            { text: 'Equilibrium GDP (expenditure method) = C + I + G = 7,200 + 1,800 + 2,000 = ₹11,000 crore.', faded: true, blankAnswer: '(a) ₹9,000 crore, (b) ₹1,800 crore, (c) Leakages ₹3,300.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_005', title: 'A stock variable is an economic.',
          scaffold: { problem: '** On 1st April 2023, a firm\'s capital stock (machinery) was valued at ₹50 crore.',
            steps: [
            { text: 'Identify opening stock = ₹50 crore (capital stock on 1 Apr 2023).' },
            { text: 'Identify inflows (gross additions) = purchase of new machinery = ₹12 crore (flow during the year).' },
            { text: 'Identify outflows = sale of old machinery (book value ₹3 crore) + depreciation ₹4 crore = ₹7 crore (flows reducing.' },
            { text: 'Apply stock-flow identity: Closing Stock = Opening Stock + Inflows - Outflows = 50 + 12 - 7 = ₹55 crore.' },
            { text: 'Classify: Stocks — Capital stock (opening/closing). Flows — Gross investment (₹12 cr), Disinvestment/sale (₹3 cr),.', faded: true, blankAnswer: '** Capital stock on 31st March 2024 = ₹55 crore. Stocks:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_006', title: 'Leakages are withdrawals from the.',
          scaffold: { problem: 'In an economy, households save ₹200 crore, pay taxes ₹150 crore, and import goods worth ₹100 crore.',
            steps: [
            { text: 'Identify leakages: S = 200, T = 150, M = 100. Sum = 450 crore.' },
            { text: 'Identify injections: I = 180, G = 200, X = 70. Sum = 450 crore.' },
            { text: 'Compare total leakages and total injections. They are equal (450 = 450).' },
            { text: 'Conclude the economy is in equilibrium. National income will remain constant.' },
            { text: 'Interpret: Since leakages = injections, there is no tendency for income to change.', faded: true, blankAnswer: 'Yes, the economy is in equilibrium. National income will.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_007', title: 'The three phases of circular flow –.',
          scaffold: { problem: 'A small bakery in Delhi produces 2,500 loaves of bread per month, selling each at ₹40.',
            steps: [
            { text: 'Calculate value of output = 2,500 loaves × ₹40 = ₹1,00,000.' },
            { text: 'Calculate factor payments: Wages = 5 × ₹8,000 = ₹40,000; Rent = ₹20,000; Interest = ₹10,000. Sum = ₹70,000.' },
            { text: 'Profit = Value of output - (Wages+Rent+Interest) = ₹1,00,000 - ₹70,000 = ₹30,000.' },
            { text: 'Total factor income = ₹40,000 + ₹20,000 + ₹10,000 + ₹30,000 = ₹1,00,000. Identity verified.' },
            { text: 'Expenditure phase: All factor income (₹1,00,000) is spent on bread and other goods.', faded: true, blankAnswer: 'Value of output = ₹1,00,000. Factor incomes: Wages ₹40,000,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_07_003', title: 'Identify each idea',
          dissect: { specimen: 'Circular Flow Income', spots: [
            { id: 's1', label: 'Macroeconomics is the branch of', prompt: 'Which idea is this? — Macroeconomics is the branch of economics that studies the behaviour and performance of.', answer: 'Macroeconomics is the branch of', options: ['Macroeconomics is the branch of', 'The circular flow of income', 'The three-sector model extends the', 'A stock variable is an'] },
            { id: 's2', label: 'The circular flow of income', prompt: 'Which idea is this? — The circular flow of income in a two-sector model illustrates the continuous flow of.', answer: 'The circular flow of income', options: ['The circular flow of income', 'Macroeconomics is the branch of', 'The three-sector model extends the', 'A stock variable is an'] },
            { id: 's3', label: 'The three-sector model extends the', prompt: 'Which idea is this? — The three-sector model extends the circular flow by adding the government sector, which.', answer: 'The three-sector model extends the', options: ['The three-sector model extends the', 'Macroeconomics is the branch of', 'The circular flow of income', 'A stock variable is an'] },
            { id: 's4', label: 'A stock variable is an', prompt: 'Which idea is this? — A stock variable is an economic quantity measured at a specific point in time (e.g.,.', answer: 'A stock variable is an', options: ['A stock variable is an', 'Macroeconomics is the branch of', 'The circular flow of income', 'The three-sector model extends the'] },
            { id: 's5', label: 'Leakages are withdrawals from the', prompt: 'Which idea is this? — Leakages are withdrawals from the circular flow of income — specifically savings (S),.', answer: 'Leakages are withdrawals from the', options: ['Leakages are withdrawals from the', 'Macroeconomics is the branch of', 'The circular flow of income', 'The three-sector model extends the'] },
            { id: 's6', label: 'The three phases of circular', prompt: 'Which idea is this? — The three phases of circular flow – production, income generation, and expenditure –.', answer: 'The three phases of circular', options: ['The three phases of circular', 'Macroeconomics is the branch of', 'The circular flow of income', 'The three-sector model extends the'] }
          ] } }
    ],
    explore: { component: C12_EconomicsCircularFlowIncomeSim, prompt: 'Explore the interactive — Circular Flow Income' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_001', difficulty: 'standard',
          question: 'Macroeconomics is the branch of economics that studies the behaviour and.',
          hint: 'If confused about why macroeconomics is distinct, revisit the paradox of thrift using the.',
          misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of.',
          parts: [
                { id: 'a', prompt: 'Define macroeconomics and list three key aggregate variables it studies. How does it differ from microeconomics in its unit of analysis?', answer: 'Macroeconomics studies the economy as a whole using aggregates like real GDP,',
                  options: ['Macroeconomics studies the economy as a whole using aggregates like real GDP,', 'macroeconomics studies large firms', 'aggregate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves,.' },
                { id: 'b', prompt: 'The Great Depression (1929–33) saw US unemployment peak at 25% while wages and prices fell.', answer: 'Individually, a firm cutting wages reduces costs and may hire more',
                  options: ['Individually, a firm cutting wages reduces costs and may hire more', 'lower wages always increase employment', 'microeconomics added up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves,.' },
                { id: 'c', prompt: 'Given India\'s 2019–21 data: Real GDP (₹ lakh crore): 2019–20: 145.7, 2020–21: 135.1; Unemployment rate (%): 2019–20: 4.8, 2020–21: 9.1; CPI inflation (%):.', answer: 'Calculate the real GDP growth rate for 2020–21',
                  options: ['Calculate the real GDP growth rate for 2020–21', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves,.' }
          ],
            remediations: { 'macroeconomics-is-merely-microeconomics-added': { steps: ['Revisit c9_eco_ch1_3 (opportunity cost) and c10_eco_cbse_02_003 (GDP meaning) to rebuild the micro-macro distinction.', 'Work through the paradox of thrift numerically: Assume Y = C + I, C = 100 + 0.8Y, I = 50.', 'Initial equilibrium Y = 750, S = 50.', 'Now households try to save more: C = 80 + 0.8Y.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of.',
          parts: [
                { id: 'a', prompt: '"Paradox of Thrift: If every household tries to save more by cutting consumption, national saving will not rise; it may fall." Evaluate this statement using.', answer: 'In a closed economy with no government: Y = C + I, and S ≡ Y − C ≡ I',
                  options: ['In a closed economy with no government: Y = C + I, and S ≡ Y − C ≡ I', 'saving rises because Y − C rises', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves,.' },
                { id: 'b', prompt: 'Construct a short narrative (4–5 sentences) showing how a sudden drop in export demand for Indian textiles (an external shock) can trigger a recession through.', answer: 'A fall in textile exports reduces injections (X↓) into the circular flow',
                  options: ['A fall in textile exports reduces injections (X↓) into the circular flow', 'microeconomics added up', 'macroeconomics is merely "microeconomics added up"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe macroeconomics is merely "microeconomics added up" — e.g., "aggregate demand is just the sum of individual demand curves,.' }
          ],
            remediations: { 'macroeconomics-is-merely-microeconomics-added': { steps: ['Revisit c9_eco_ch1_3 (opportunity cost) and c10_eco_cbse_02_003 (GDP meaning) to rebuild the micro-macro distinction.', 'Work through the paradox of thrift numerically: Assume Y = C + I, C = 100 + 0.8Y, I = 50.', 'Initial equilibrium Y = 750, S = 50.', 'Now households try to save more: C = 80 + 0.8Y.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_003', difficulty: 'standard',
          question: 'The circular flow of income in a two-sector model illustrates the continuous.',
          hint: 'If confused about factor ownership, revisit c8_eco_ch1_2 to c8_eco_ch1_6.',
          misconception: 'Students draw the circular flow diagram with both real and monetary flows moving in the SAME direction (e.g., both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The circular flow of income in a two-sector model illustrates the continuous flow of',
                  options: ['The circular flow of income in a two-sector model illustrates the continuous flow of', 'Macroeconomics is the branch of economics that studies the behaviour and performance of', 'The three-sector model extends the circular flow by adding the government sector', 'A stock variable is an economic quantity measured at a specific point in time (e.g.,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students draw the circular flow diagram with both real and monetary flows moving in the SAME direction (e.g., both clockwise).' }
          ],
            remediations: { 'students-draw-the-circular-flow': { steps: ['Revisit c12_eco_cbse_07_001 (Macroeconomics: Emergence and Scope) to recall the distinction between micro and macro —.', 'Revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and c8_eco_ch1_4/5/6 (Land, Labour, Capital as.', 'Draw the diagram from scratch on paper: two circles (Households, Firms), two markets (Factor Market, Product Market).', 'Say aloud for each arrow: "Real flow: factor services FROM households TO firms.', 'Take the diagnostic question 4 again. If still wrong, watch a 5-minute animation of circular flow (search "circular.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_004', difficulty: 'standard',
          question: 'The three-sector model extends the circular flow by adding the government.',
          hint: 'If stuck, review c12_eco_cbse_07_003 (two-sector model) and practice drawing the diagram.',
          misconception: 'Students often treat government transfer payments (pensions, scholarships) as government purchases (G) and count them.',
          parts: [
                { id: 'a', prompt: 'Explain why imports (M) are treated as a leakage in the four-sector circular flow model, while exports (X) are an injection.', answer: 'Imports represent domestic income spent on foreign-produced goods',
                  options: ['Imports represent domestic income spent on foreign-produced goods', 'imports bring goods in, so they are an injection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat government transfer payments (pensions, scholarships) as government purchases (G) and count them as injections in the.' }
          ],
            remediations: { 'students-often-treat-government-transfer': { steps: ['Revisit node c12_eco_cbse_07_003 (two-sector model) and re-draw the diagram adding government: add a box "Government".', 'Write the identity S + T = I + G and verify with numbers: S=100, T=50, I=80, G=70 → leakages=150, injections=150.', 'Then add foreign sector: draw "Rest of World" with X arrow into firms, M arrow from households/firms to RoW.', 'Write S + T + M = I + G + X.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_005', difficulty: 'standard',
          question: 'A stock variable is an economic quantity measured at a specific point in time.',
          hint: 'If confused, revisit Class 11 Accountancy: "Financial Statements: Meaning and Objectives".',
          misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** "India\'s foreign exchange reserves stood at $640 billion on 31st March 2024.', answer: '**Correct:** Reserves ($640B) = stock (point in time)',
                  options: ['**Correct:** Reserves ($640B) = stock (point in time)', 'GDP is a stock because it measures the total size of the economy', 'Money supply is a flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' },
                { id: 'b', prompt: '**APPLY:** Classify each as stock (S) or flow (F): (a) Government debt outstanding on 31st March 2024 (b) Fiscal deficit for 2023-24 (c) Money supply (M3) on.', answer: '**Correct:** (a) S, (b) F, (c) S, (d) F, (e) F, (f) S',
                  options: ['**Correct:** (a) S, (b) F, (c) S, (d) F, (e) F, (f) S', 'deficit accumulates into debt', 'GDP is the size of the economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' },
                { id: 'c', prompt: '**ANALYZE:** "Net investment = Gross investment – Depreciation.', answer: '**Correct:** Net investment = 30 – 8 = ₹22 lakh crore',
                  options: ['**Correct:** Net investment = 30 – 8 = ₹22 lakh crore', 'GDP is a stock because it measures the total size of the economy', 'Money supply is a flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' }
          ],
            remediations: { 'gdp-is-a-stock-because': { steps: ['Revisit the "water tank" analogy: Stock = water in tank (litres), Flow = tap inflow / drain outflow (litres/minute).', 'Practice classifying 20 variables from RBI\'s "Handbook of Statistics on Indian Economy" (Table 1.1: Money Stock, Table.', 'Re-do Diagnostic Q3 and Q4 with a peer; explain aloud why each is stock/flow.', 'If stuck on net investment logic, review Class 11 Depreciation (c11_acc_cbse_07_001 to 07_006) — depreciation is a flow.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** "A country\'s money supply (M3) increased from ₹180 lakh crore to ₹200 lakh crore in one year.', answer: '**Correct:** The statement is conceptually wrong',
                  options: ['**Correct:** The statement is conceptually wrong', 'change in stock', 'money creation by RBI', 'GDP is a stock because it measures the total size of the economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "GDP is a stock because it measures the total size of the economy" — they confuse the *level* of activity (flow per year).' }
          ],
            remediations: { 'gdp-is-a-stock-because': { steps: ['Revisit the "water tank" analogy: Stock = water in tank (litres), Flow = tap inflow / drain outflow (litres/minute).', 'Practice classifying 20 variables from RBI\'s "Handbook of Statistics on Indian Economy" (Table 1.1: Money Stock, Table.', 'Re-do Diagnostic Q3 and Q4 with a peer; explain aloud why each is stock/flow.', 'If stuck on net investment logic, review Class 11 Depreciation (c11_acc_cbse_07_001 to 07_006) — depreciation is a flow.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_006', difficulty: 'standard',
          question: 'Leakages are withdrawals from the circular flow of income — specifically.',
          hint: 'If stuck, review the four-sector circular flow diagram (node c12_eco_cbse_07_004) and.',
          misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage.',
          parts: [
                { id: 'a', prompt: 'List the three leakages and three injections in a four-sector circular flow model.', answer: 'Leakages',
                  options: ['Correct answer: Leakages', 'goods leaving the country'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage because goods leave the.' },
                { id: 'b', prompt: 'Given the following data for an economy (in ₹ crore): S = 200, T = 150, M = 100, I = 180, G = 200, X = 70. Determine whether the economy is in equilibrium.', answer: 'Leakages = S + T + M = 200 + 150 + 100 = 450',
                  options: ['Leakages = S + T + M = 200 + 150 + 100 = 450', 'income will rise'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage because goods leave the.' }
          ],
            remediations: { 'imports-are-an-injection-because': { steps: ['If the student cannot correctly classify flows, have them revisit the four-sector diagram (node c12_eco_cbse_07_004).', 'Create a two-column table: "Flow" and "Leakage or Injection?" Fill it with: Household saving → Leakage, Firm investment.', 'For each, ask: "Does this flow represent domestic income leaving the spending stream (leakage) or external spending.', 'If the equilibrium calculation is wrong, practice the algebraic condition S + T + M = I + G + X with 3-4 numerical sets.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "To boost the economy during a recession, the government should increase both spending and taxes by the same amount." (Assume a simple.', answer: 'In a simple Keynesian model, the balanced-budget multiplier equals 1',
                  options: ['In a simple Keynesian model, the balanced-budget multiplier equals 1', 'no effect because they cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think imports are an injection because they bring goods into the country, and exports are a leakage because goods leave the.' }
          ],
            remediations: { 'imports-are-an-injection-because': { steps: ['If the student cannot correctly classify flows, have them revisit the four-sector diagram (node c12_eco_cbse_07_004).', 'Create a two-column table: "Flow" and "Leakage or Injection?" Fill it with: Household saving → Leakage, Firm investment.', 'For each, ask: "Does this flow represent domestic income leaving the spending stream (leakage) or external spending.', 'If the equilibrium calculation is wrong, practice the algebraic condition S + T + M = I + G + X with 3-4 numerical sets.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_007', difficulty: 'standard',
          question: 'The three phases of circular flow – production, income generation, and.',
          hint: 'Review factor payments and the circular flow two-sector model (node c12_eco_cbse_07_003).',
          misconception: 'Students often think the three phases occur sequentially in time (first production, then income, then expenditure).',
          parts: [
                { id: 'a', prompt: 'Why does the production phase necessarily precede the income generation phase in the circular flow? Explain using the concept of factor services.', answer: 'Production requires factor services (land, labour, capital, entrepreneurship)',
                  options: ['Production requires factor services (land, labour, capital, entrepreneurship)', 'income comes first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the three phases occur sequentially in time (first production, then income, then expenditure) rather than.' }
          ],
            remediations: { 'the-three-phases-occur-sequentially': { steps: ['If the student holds the sequential misconception, use a timeline diagram: show a factory operating continuously.', 'At any moment, it is producing (phase 1), has just paid wages for last month\'s work (phase 2), and workers are spending.', 'Have the student track a single rupee through the cycle in real time.', 'Revisit node c12_eco_cbse_07_003 (two-sector circular flow) to see the simultaneous inner and outer loops.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
