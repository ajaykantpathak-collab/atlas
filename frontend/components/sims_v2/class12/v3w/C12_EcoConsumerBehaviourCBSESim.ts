import type { SimDef } from '../../engine/types';
import C12_EcoConsumerBehaviourCBSESim from '../../../simulations/c6_12_new/C12_EcoConsumerBehaviourCBSESim';

/** v3 wrapped master — C12_EcoConsumerBehaviourCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_ecoconsumerbehaviourcbsesim: SimDef = {
    id: 'v3w_c12_ecoconsumerbehaviourcbsesim',
    title: 'Relationship Between MPC and MPS',
    subtitle: 'This node covers the algebraic derivation and economic interpretation of MPC + MPS = 1,.',
    classLevel: 12, subject: 'economics', topic: 'Relationship Between MPC and MPS',
    chapters: [],
    nodeIds: ['c12_eco_cbse_10_004', 'c12_eco_cbse_01_006', 'c12_eco_cbse_01_004', 'c12_eco_cbse_07_001', 'c12_eco_cbse_07_002', 'c12_eco_cbse_03_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a farmer in Punjab receives an unexpected ₹10,000 bonus from a bumper wheat harvest.', goal: 'Master Relationship Between MPC and MPS.' },
    discovery: {
        question: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.',
        options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
        answer: 'The Great Depression showed that the classical belief',
        hook: 'Students often think the distinction between micro and macro is merely about "small vs.',
    },
    teaching: [
        { title: 'The relationship between Marginal Propensity.', text: 'The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to Save (MPS) is a fundamental macroeconomic identity stating that the sum of MPC and MPS always equals 1 (MPC +.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_004', title: 'The relationship between Marginal.',
          scaffold: { problem: 'In a hypothetical Indian village economy, the following data is observed over two years:',
            steps: [
            { text: 'Calculate change in income: ΔY = Y₂ - Y₁ = 60,000 - 50,000 = ₹10,000 crore.' },
            { text: 'Calculate change in consumption: ΔC = C₂ - C₁ = 47,000 - 40,000 = ₹7,000 crore.' },
            { text: 'Compute MPC = ΔC/ΔY = 7,000 / 10,000 = 0.7.' },
            { text: 'Compute MPS using the identity: MPS = 1 - MPC = 1 - 0.7 = 0.3.' },
            { text: 'Verify by calculating saving directly: S₁ = Y₁ - C₁ = 10,000, S₂ = Y₂ - C₂ = 13,000, ΔS = 3,000, MPS = ΔS/ΔY =.' },
            { text: 'Compute investment multiplier k = 1/MPS = 1/0.3 = 3.33 (or 10/3).', faded: true, blankAnswer: 'MPC = 0.7, MPS = 0.3, MPC + MPS = 1, k = 3.33 (or 10/3).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_006', title: 'Microeconomics studies the behaviour of.',
          scaffold: { problem: 'An Indian newspaper headline reads: "RBI keeps repo rate unchanged at 6.5% to balance inflation and growth." Identify whether this is a.',
            steps: [
            { text: 'Identify the decision-maker: Reserve Bank of India (RBI), which is the central bank and a statutory body.' },
            { text: 'Identify the objective: "balance inflation and growth" – these are aggregate goals (price stability and output growth).' },
            { text: 'Recognise the policy tool: repo rate (the interest rate at which RBI lends to commercial banks) is a monetary policy.' },
            { text: 'Determine the sectors involved: Government (RBI acts on behalf of the state), Firms (borrowing costs change),.' },
            { text: 'Conclude: This is a macroeconomic issue because it involves a macroeconomic agent (RBI) using a policy tool to target.', faded: true, blankAnswer: 'Macroeconomic. Sectors: Government (RBI), Firms,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_004', title: 'Opportunity cost is the value of the.',
          scaffold: { problem: 'A small island economy produces only fish (F) and coconuts (C). The following production possibilities are observed:',
            steps: [
            { text: 'Identify the two goods: Fish (horizontal axis, X) and Coconuts (vertical axis, Y).' },
            { text: 'Recall the formula for marginal opportunity cost of X: |ΔY / ΔX| between adjacent combinations.' },
            { text: 'Compute for each interval:' },
            { text: 'Observe the pattern: Opportunity cost rises from 1 to 3 coconuts per kg of fish.' },
            { text: 'Interpret economically: Resources (labour, boats, land) are specialized.', faded: true, blankAnswer: 'Marginal opportunity costs: A→B: 1, B→C: 1.5, C→D: 2, D→E:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_001', title: 'Macroeconomics is the branch of.',
          scaffold: { problem: 'The Reserve Bank of India\'s Annual Report 2022-23 states: "Real GDP grew at 7.2% in 2022-23, CPI inflation averaged 6.7%, and the.',
            steps: [
            { text: 'Recall the definition of macroeconomics — study of aggregate economy-wide variables.' },
            { text: 'Classify by time dimension. Real GDP growth rate is a flow (change in output over a year).' },
            { text: 'Explain \'lagging indicator\'. Unemployment rate reacts *after* output changes.' },
            { text: 'Connect to business cycle. At cyclical turning points, GDP leads, inflation is coincident, unemployment lags.' },
            { text: 'Interpret for policy. RBI focuses on inflation (flow, forward-looking) while government watches unemployment (stock,.', faded: true, blankAnswer: 'All three are macro variables. Real GDP growth: flow. CPI.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_002', title: 'Microeconomics studies the behaviour of.',
          scaffold: { problem: 'Read the following news headlines from an Indian newspaper and classify each as Microeconomic (MI) or Macroeconomic (MA).',
            steps: [
            { text: 'Identify the decision-making unit or variable in each headline.' },
            { text: 'Determine if it refers to an individual agent (firm, household, specific market) or an economy-wide aggregate.' },
            { text: 'Apply the definition: Micro = individual agents / specific markets; Macro = aggregates (total output, price level,.' },
            { text: 'Classify and write justification.' },
            { text: 'Check for fallacy of composition traps (e.g., FCI procurement is a government agency\'s action but it\'s an aggregate.', faded: true, blankAnswer: '1. MA (central bank policy rate affects entire economy\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_002', title: 'Total Product (TP) is the total output.',
          scaffold: { problem: 'A farm in Haryana produces wheat using fixed land of 5 hectares and variable labour.',
            steps: [
            { text: 'Compute MP = TP(L) - TP(L-1) for L=1 to 8.' },
            { text: 'Compute AP = TP/L for L=1 to 8.' },
            { text: 'Identify where MP > 0 and rising (Stage I), MP > 0 but falling (Stage II), MP < 0 (Stage III).' },
            { text: 'Locate where MP = AP (maximum AP) and where MP = 0 (maximum TP).' },
            { text: 'Interpret economically: Stage I — increasing returns to labour; Stage II — diminishing but positive returns (rational.', faded: true, blankAnswer: 'MP: 8, 12, 16, 12, 7, 3, 0, -2. AP: 8, 10, 12, 12, 11,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_01_006', title: 'Identify each idea',
          dissect: { specimen: 'Relationship Between MPC and MPS', spots: [
            { id: 's1', label: 'The relationship between Marginal Propensity', prompt: 'Which idea is this? — The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to.', answer: 'The relationship between Marginal Propensity', options: ['The relationship between Marginal Propensity', 'Microeconomics studies the behaviour of', 'Opportunity cost is the value', 'Macroeconomics is the branch of'] },
            { id: 's2', label: 'Microeconomics studies the behaviour of', prompt: 'Which idea is this? — Microeconomics studies the behaviour of individual economic agents — households and firms.', answer: 'Microeconomics studies the behaviour of', options: ['Microeconomics studies the behaviour of', 'The relationship between Marginal Propensity', 'Opportunity cost is the value', 'Macroeconomics is the branch of'] },
            { id: 's3', label: 'Opportunity cost is the value', prompt: 'Which idea is this? — Opportunity cost is the value of the next best alternative forgone when a choice is made;.', answer: 'Opportunity cost is the value', options: ['Opportunity cost is the value', 'The relationship between Marginal Propensity', 'Microeconomics studies the behaviour of', 'Macroeconomics is the branch of'] },
            { id: 's4', label: 'Macroeconomics is the branch of', prompt: 'Which idea is this? — Macroeconomics is the branch of economics that studies the behaviour and performance of.', answer: 'Macroeconomics is the branch of', options: ['Macroeconomics is the branch of', 'The relationship between Marginal Propensity', 'Microeconomics studies the behaviour of', 'Opportunity cost is the value'] },
            { id: 's5', label: 'Total Product TP is the', prompt: 'Which idea is this? — Total Product (TP) is the total output produced by a firm using a given quantity of.', answer: 'Total Product TP is the', options: ['Total Product TP is the', 'The relationship between Marginal Propensity', 'Microeconomics studies the behaviour of', 'Opportunity cost is the value'] }
          ] } }
    ],
    explore: { component: C12_EcoConsumerBehaviourCBSESim, prompt: 'Explore the interactive — Relationship Between MPC and MPS' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_004', difficulty: 'standard',
          question: 'The relationship between Marginal Propensity to Consume (MPC) and Marginal.',
          hint: 'Revisit the derivation: start with Y = C + S, take changes ΔY = ΔC + ΔS, divide both.',
          misconception: 'Students often treat MPC and MPS as independent behavioural parameters that can change separately.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to',
                  options: ['The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to', 'Microeconomics studies the behaviour of individual economic agents', 'Opportunity cost is the value of the next best alternative forgone when a choice is made', 'Macroeconomics is the branch of economics that studies the behaviour and performance of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat MPC and MPS as independent behavioural parameters that can change separately.' }
          ],
            remediations: { 'students-often-treat-mpc-and': { steps: ['If the student cannot derive MPC + MPS = 1 from Y = C + S, return to node c12_eco_cbse_10_002 (Consumption Function).', 'Re-do the algebraic derivation: Y = C + S → ΔY = ΔC + ΔS → ΔY/ΔY = ΔC/ΔY + ΔS/ΔY → 1 = MPC + MPS.', 'Practice with 5 numerical pairs: given MPC, find MPS; given MPS, find MPC; verify sum = 1 each time.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents — households.',
          hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.', answer: 'The Great Depression showed that the classical belief',
                  options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' },
                { id: 'b', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab deciding how much wheat to plant.', answer: 'A farmer in Punjab deciding how much wheat to plant',
                  options: ['A farmer in Punjab deciding how much wheat to plant', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Macroeconomics is just the sum of microeconomics; if we understand all individual markets, we don\'t need a separate.', answer: 'The statement is false',
                  options: ['The statement is false', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_004', difficulty: 'standard',
          question: 'Opportunity cost is the value of the next best alternative forgone when a.',
          hint: 'If stuck on calculating opportunity cost, go back to the PPF schedule in.',
          misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500").',
          parts: [
                { id: 'a', prompt: 'An economy produces only two goods: robots (X) and wheat (Y). The following PPF schedule is given: | Combination | Robots (X) | Wheat (Y in tonnes) |.', answer: '**3rd robot (C→D):** ΔX = 1, ΔY = 55 - 75 = -20 tonnes',
                  options: ['**3rd robot (C→D):** ΔX = 1, ΔY = 55 - 75 = -20 tonnes', 'the cost of buying a textbook is ₹500', 'opportunity cost is the **monetary expenditure** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' },
                { id: 'b', prompt: 'The PPF for an economy is given by the equation: Y = 100 - 2X - 0.5X², where X is units of capital goods and Y is units of consumer goods.', answer: 'The slope (marginal opportunity cost) is dY/dX = -2 - X',
                  options: ['The slope (marginal opportunity cost) is dY/dX = -2 - X', 'the cost of buying a textbook is ₹500', 'opportunity cost is the **monetary expenditure** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' }
          ],
            remediations: { 'opportunity-cost-is-the-monetary': { steps: ['Revisit **c12_eco_cbse_01_003** (PPF Construction) and re-plot the PPF from the worked example in that node.', 'Pick two adjacent points (e.g., B and C) and compute ΔY/ΔX manually.', 'Draw the chord connecting them and the tangent at the midpoint; compare slopes.', 'Write a one-sentence economic reason for the difference (e.g., "Land shifted from wheat to rice is less fertile for.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500").',
          parts: [
                { id: 'a', prompt: '"Opportunity cost is zero if the economy is operating inside the PPF (i.e., with unemployment)." Evaluate this statement as True, False, or Uncertain, and.', answer: '**False.** Opportunity cost exists whenever a choice involves a trade-off',
                  options: ['**False.** Opportunity cost exists whenever a choice involves a trade-off', 'inside PPF', 'no trade-off ever', 'the cost of buying a textbook is ₹500'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' },
                { id: 'b', prompt: 'The PPF for an economy is given by the equation: Y = 100 - 2X - 0.5X², where X is units of capital goods and Y is units of consumer goods.', answer: 'The slope (marginal opportunity cost) is dY/dX = -2 - X',
                  options: ['The slope (marginal opportunity cost) is dY/dX = -2 - X', 'the cost of buying a textbook is ₹500', 'opportunity cost is the **monetary expenditure** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think opportunity cost is the **monetary expenditure** (e.g., "the cost of buying a textbook is ₹500") rather than the.' }
          ],
            remediations: { 'opportunity-cost-is-the-monetary': { steps: ['Revisit **c12_eco_cbse_01_003** (PPF Construction) and re-plot the PPF from the worked example in that node.', 'Pick two adjacent points (e.g., B and C) and compute ΔY/ΔX manually.', 'Draw the chord connecting them and the tangent at the midpoint; compare slopes.', 'Write a one-sentence economic reason for the difference (e.g., "Land shifted from wheat to rice is less fertile for.'] } } },
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
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_002', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents (households,.',
          hint: 'If stuck, review the demand-supply model for a single market (c9_eco_ch2_10) and practice.',
          misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.',
          parts: [
                { id: 'a', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab decides to switch from wheat to cotton.', answer: 'A farmer in Punjab decides to switch from wheat to cotton',
                  options: ['A farmer in Punjab decides to switch from wheat to cotton', 'macroeconomics = microeconomics × number of agents', 'market demand for a good'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.' }
          ],
            remediations: { 'macroeconomics-microeconomics-number-of-agents': { steps: ['Revisit c9_eco_ch2_10 (Market Equilibrium) to recall how individual demand curves are summed horizontally *holding.', 'Study c11_stat_cbse_05_002 (Arithmetic Mean) to see how averages (like price level) differ from sums.', 'Draw two diagrams side-by-side: (a) micro demand curve for onions (price of onions on Y-axis, quantity of onions on.', 'Note the different Y-axis variables.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Macroeconomics is just the sum of microeconomics; if we understand every individual market perfectly, we automatically understand the.', answer: 'The statement is false due to the fallacy of composition',
                  options: ['The statement is false due to the fallacy of composition', 'macroeconomics = microeconomics × number of agents', 'market demand for a good', 'aggregate demand for all goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.' },
                { id: 'b', prompt: 'Create a simple numerical example with 3 firms showing how each firm\'s rational decision to reduce output when its own price falls can lead to a fall in.', answer: 'Firm A, B, C each produce 100 units at price ₹10',
                  options: ['Firm A, B, C each produce 100 units at price ₹10', 'macroeconomics = microeconomics × number of agents', 'market demand for a good', 'aggregate demand for all goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "macroeconomics = microeconomics × number of agents" and treat aggregates as simple sums.' }
          ],
            remediations: { 'macroeconomics-microeconomics-number-of-agents': { steps: ['Revisit c9_eco_ch2_10 (Market Equilibrium) to recall how individual demand curves are summed horizontally *holding.', 'Study c11_stat_cbse_05_002 (Arithmetic Mean) to see how averages (like price level) differ from sums.', 'Draw two diagrams side-by-side: (a) micro demand curve for onions (price of onions on Y-axis, quantity of onions on.', 'Note the different Y-axis variables.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_002', difficulty: 'standard',
          question: 'Total Product (TP) is the total output produced by a firm using a given.',
          hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
          misconception: 'Students often believe that when MP is negative, TP becomes negative.',
          parts: [
                { id: 'a', prompt: 'Given the TP schedule below, compute MP and AP for each level of labour. Identify where AP is maximum.', answer: 'Step 1: MP at L=1 = 10-0 = 10',
                  options: ['Step 1: MP at L=1 = 10-0 = 10', 'when MP is negative, TP becomes negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' },
                { id: 'b', prompt: 'A firm’s TP curve is given by TP = 20L + 6L² - 0.5L³. Derive the MP and AP functions. At what labour level does AP reach its maximum?', answer: 'MP = d(TP)/dL = 20 + 12L - 1.5L²',
                  options: ['MP = d(TP)/dL = 20 + 12L - 1.5L²', 'when MP is negative, TP becomes negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' }
          ],
            remediations: { 'when-mp-is-negative': { steps: ['If a student confuses the MP-AP intersection, have them: (1) Revisit the average-marginal analogy using a simple.', '(2) Re-plot TP, MP, AP from a numerical schedule (like Diagnostic Q3) on graph paper, drawing rays from origin to TP.', '(3) Practice deriving MP and AP from a cubic TP function (Diagnostic Q4) using calculus.', '(4) Re-read the NCERT section “Total Product, Average Product and Marginal Product” (Chapter 3, pages 36-38) focusing.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that when MP is negative, TP becomes negative.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “If marginal product is falling, average product must also be falling.” Provide a counterexample using a TP schedule.', answer: 'The statement is false',
                  options: ['The statement is false', 'when MP is negative, TP becomes negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' },
                { id: 'b', prompt: 'Construct a hypothetical TP schedule for 5 units of labour that exhibits: (a) increasing MP for first two units, (b) diminishing but positive MP for next two,.', answer: 'Example: L=0 TP=0',
                  options: ['Example: L=0 TP=0', 'when MP is negative, TP becomes negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' },
                { id: 'c', prompt: 'A firm’s TP curve is given by TP = 20L + 6L² - 0.5L³. Derive the MP and AP functions. At what labour level does AP reach its maximum?', answer: 'MP = d(TP)/dL = 20 + 12L - 1.5L²',
                  options: ['MP = d(TP)/dL = 20 + 12L - 1.5L²', 'when MP is negative, TP becomes negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' }
          ],
            remediations: { 'when-mp-is-negative': { steps: ['If a student confuses the MP-AP intersection, have them: (1) Revisit the average-marginal analogy using a simple.', '(2) Re-plot TP, MP, AP from a numerical schedule (like Diagnostic Q3) on graph paper, drawing rays from origin to TP.', '(3) Practice deriving MP and AP from a cubic TP function (Diagnostic Q4) using calculus.', '(4) Re-read the NCERT section “Total Product, Average Product and Marginal Product” (Chapter 3, pages 36-38) focusing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
