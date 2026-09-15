import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch08_p1: SimDef = {
    id: 'v3_c12_eco_ch08_p1',
    title: 'National Income Accounting · Part 1/2',
    subtitle: 'The diaspora\'s money doesn\'t do what the headline claims',
    classLevel: 12, subject: 'economics', topic: 'National Income Accounting · Part 1/2',
    chapters: ['c12_eco_ch08'],
    nodeIds: ['c12_eco_cbse_08_001', 'c12_eco_cbse_08_002', 'c12_eco_cbse_08_003', 'c12_eco_cbse_08_004', 'c12_eco_cbse_08_005', 'c12_eco_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'National accountant', intro: 'One number — GDP — drives every economic debate in the country. Learn what it counts, what it misses, and how it morphs into national income.', goal: 'Define GDP, GNP, NNP and National Income, and convert between aggregates using NFIA, depreciation and net indirect taxes.' },
    discovery: {
        question: 'A headline boasts \'GNP exceeds GDP — thank our diaspora\'s remittances!\' Sounds patriotic, but is the accounting right?',
        options: ['No — remittances are transfers, not factor income; India\'s net factor income from abroad is negative, so GNP sits below GDP', 'Yes — remittances are factor income', 'Yes — anything from abroad counts', 'No — GNP and GDP are identical measures'],
        answer: 'No — remittances are transfers, not factor income; India\'s net factor income from abroad is negative, so GNP sits below GDP',
        hook: 'GDP counts production inside the border; GNP counts income of residents wherever they are — bridged by net FACTOR income (wages, rent, interest, profit), not transfers. Then depreciation turns gross to net, and net indirect taxes turn market price into true factor cost.',
    },
    teaching: [
        { title: 'Basic Concepts: GDP, GNP, NNP and National Income', text: 'Gross Domestic Product (GDP) is the market value of all final goods and services produced within the domestic territory of a country in an accounting year.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the national accounts ladder yourself: climb GDP → GNP → NNP → National Income with real numbers, then test whether a growing GDP actually means a wealthier nation.',
        labels: ['Basic Concepts: GDP, GNP,', 'Gross and Net, Domestic', 'Nominal GDP and Real', 'Circular Flow and Three', 'Value Added Method (Product', 'Income Method: Factor Payments'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_001', title: 'Basic Concepts: GDP, GNP, NNP and National Income',
          scaffold: { problem: 'In 2022-23, India\'s GDP at market price was ₹272.41 lakh crore. Net factor income from abroad was -₹7.2 lakh crore.',
            steps: [
            { text: 'Identify the given data and the target aggregates. We have GDPmp = 272.41, NFIA = -7.2, Depreciation = 31.5, NIT = 24.8.' },
            { text: 'Apply the first identity: GNPmp = GDPmp + NFIA = 272.41 + (-7.2) = 265.21 lakh crore.' },
            { text: 'Apply the second identity: NNPmp = GNPmp - Depreciation = 265.21 - 31.5 = 233.71 lakh crore.' },
            { text: 'Apply the third identity: National Income (NIfc) = NNPmp - Net Indirect Taxes = 233.71 - 24.8 = 208.91 lakh crore.' },
            { text: 'Interpret: India\'s GNP is lower than GDP because factor income outflows exceed inflows.', faded: true, blankAnswer: 'GNPmp = ₹265.21 lakh crore; NNPmp = ₹233.71 lakh crore.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_002', title: 'Gross and Net, Domestic and National Aggregates: Distinctions',
          scaffold: { problem: 'India\'s GDPmp for 2023-24 is ₹295 lakh crore. Consumption of fixed capital is ₹32 lakh crore.',
            steps: [
            { text: 'Identify the target aggregates — NDPfc (domestic factor income) and NNPfc (national income).' },
            { text: 'Write the adjustment chain: GDPmp → (–CFC) → NDPmp → (–NIT) → NDPfc. Then NDPfc → (+NFIA) → NNPfc.' },
            { text: 'Compute NDPmp = GDPmp – CFC = 295 – 32 = ₹263 lakh crore.' },
            { text: 'Compute NDPfc = NDPmp – Net Indirect Taxes = 263 – 28 = ₹235 lakh crore.' },
            { text: 'Compute NNPfc = NDPfc + NFIA = 235 + (–4.5) = ₹230.5 lakh crore.' },
            { text: 'Interpret: Negative NFIA means India pays more factor income (interest, profits, wages) to foreign residents than.', faded: true, blankAnswer: 'NDPfc = ₹235 lakh crore; NNPfc (National Income) = ₹230.5.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_003', title: 'Nominal GDP and Real GDP: Meaning and GDP Deflator',
          caseStudy: { intro: 'Imagine you run a small workshop in Gujarat producing brass utensils. In 2023 you sold 1,000 plates at ₹200 each (Nominal GDP = ₹2,00,000).',
            decisions: [{ prompt: 'Define Nominal GDP and Real GDP. State the formula for GDP Deflator.', options: [
                { text: '**Correct Answer:** Nominal GDP = Σ (Current Year Quantity × Current Year Price) for all', outcome: '**Correct Answer:** Nominal GDP = Σ (Current Year Quantity × Current Year Price) for all final.' },
                { text: 'Real GDP = Σ (Base Year Quantity × Base Year Price)', outcome: 'Not quite — **Misconception:** "Real GDP is calculated using base-year quantities and base-year prices." **Why.', reveals: 'misconception-real-gdp-is-calculated' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_004', title: 'Circular Flow and Three Methods of Measuring National Income',
          scaffold: { problem: 'In a simple economy, a farmer produces wheat worth ₹40,000 (no intermediate inputs). A miller buys the wheat, produces flour worth ₹70,000.',
            steps: [
            { text: 'Identify production stages and transactions — Farmer (primary), Miller (secondary), Baker (secondary/tertiary); final.' },
            { text: 'Product Method (Value Added) — Farmer VA = ₹40,000 - ₹0 = ₹40,000; Miller VA = ₹70,000 - ₹40,000 = ₹30,000; Baker.' },
            { text: 'Income Method — Sum all factor payments across firms. Since no data given, use identity: Total Factor Income = Total.' },
            { text: 'Expenditure Method — Only final expenditure counts: Consumers buy bread for ₹1,00,000.' },
            { text: 'Verify — All three methods yield ₹1,00,000. The ₹40,000 wheat and ₹70,000 flour are intermediate goods, excluded from.', faded: true, blankAnswer: 'GDP = ₹1,00,000 by all three methods.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_005', title: 'Value Added Method (Product Method): Steps and Precautions',
          scaffold: { problem: 'A farmer in Haryana produces wheat. He sells ₹50,000 worth to a flour mill, retains ₹10,000 for self-consumption, and adds ₹5,000 to his.',
            steps: [
            { text: 'Identify Value of Output = Sales + Self-consumption + Change in Stock = 50,000 + 10,000 + 5,000 = ₹65,000.' },
            { text: 'Identify Intermediate Consumption = Seeds + Fertilizer + Diesel = 12,000 + 8,000 + 5,000 = ₹25,000.' },
            { text: 'Apply GVAMP formula = Value of Output – Intermediate Consumption = 65,000 – 25,000 = ₹40,000.' },
            { text: 'Verify precautions: Self-consumption included (Precaution 1), own-account production included, intermediate goods.' },
            { text: 'Economic interpretation: This ₹40,000 is the new value created by the farmer\'s land, labour, and capital; it will.', faded: true, blankAnswer: 'GVAMP = ₹40,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_006', title: 'Income Method: Factor Payments and Mixed Income',
          scaffold: { problem: 'In a hypothetical economy, the following data are available for 2023-24 (₹ crores): Wages and salaries = 1,200; Employer\'s contribution.',
            steps: [
            { text: 'Identify Compensation of Employees = Wages and salaries + Employer\'s social security contribution = 1,200 + 100 = 1,300.' },
            { text: 'Identify Profit = Dividends + Undistributed profits + Corporate profit tax = 150 + 100 + 50 = 300.' },
            { text: 'List all five factor income components: Compensation of Employees (1,300), Rent (300), Interest (250), Profit (300).' },
            { text: 'Sum them to get NDPfc = 1,300 + 300 + 250 + 300 + 800 = 2,950.' },
            { text: 'Add Net Factor Income from Abroad to get National Income = 2,950 + (-30) = 2,920.', faded: true, blankAnswer: 'NDPfc = ₹2,950 crores; National Income (NNPfc) = ₹2,920.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_001', title: 'A real-world call',
          caseStudy: { intro: 'An economy can grow fast by extracting resources now, or sustainably by growing slower. The fast path shows results this decade; the sustainable path pays off for the next generation.',
            decisions: [{ prompt: 'Who is growth actually for?', options: [
                { text: 'Now — poverty today can\'t wait for tomorrow\'s environment', outcome: 'The urgency argument; the trap is that \'now\' never ends — there\'s always another urgent reason to postpone sustainability.' },
                { text: 'Tomorrow — growth that destroys its own foundation isn\'t growth', outcome: 'The sustainability argument; the honest cost is slower improvement for people living now.' },
                { text: 'Both — the only wrong answer is pretending there\'s no trade-off', outcome: 'Development economics\' real position — green growth is possible but costs more upfront; someone has to fund that difference.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A headline claims India\'s GNP exceeds its GDP \'because of the huge remittances the diaspora sends home\'. A student repeats it in a class presentation on national income.',
            decisions: [{ prompt: 'Does the claim survive the definitions?', options: [
                { text: 'No — family remittances are transfers, not factor income; India\'s net factor income from abroad is actually negative, so GNP typically sits below GDP.', outcome: 'Only wages, rent, interest and profit crossing borders count as factor income — gifts and maintenance flows don\'t enter the GDP→GNP bridge.' },
                { text: 'Yes — money earned abroad and sent home is exactly what \'factor income from abroad\' means.', outcome: 'That confuses a transfer with a factor payment; remittances for family upkeep are unilateral transfers outside the accounts.', reveals: 'remittances-are-factor-income' },
                { text: 'Maybe — but if anything, subtracting NFIA from GDP gives GNP, so the headline could go either way.', outcome: 'The sign matters: GNP = GDP + NFIA; flipping the sign breaks every chained aggregate downstream.', reveals: 'nfia-sign-flipped' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now walk the whole GDP→GNP→NNP→NI chain without tripping on signs — the calculation boards repeat every single year.',
            decisions: [{ prompt: 'What comes next? National Income Accounting · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — National Income Accounting · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_001', difficulty: 'standard',
          question: 'Gross Domestic Product (GDP) is the market value of all final goods and.',
          hint: 'If confused between domestic and national, revisit the "domestic territory" definition.',
          misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes.',
          parts: [
                { id: 'a', prompt: 'Explain why GDP plus net factor income from abroad equals GNP, and give a concrete Indian example of a factor income flow that is added and one that.', answer: 'GNP measures income earned by a country\'s residents regardless of location',
                  options: ['GNP measures income earned by a country\'s residents regardless of location', 'Domestic', 'National'],
                  hint: 'If confused between domestic and national, revisit the "domestic territory" definition in Class 10.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' },
                { id: 'b', prompt: 'If GDP at market price = ₹250 lakh crore, net factor income from abroad = -₹5 lakh crore, depreciation = ₹15 lakh crore, and net indirect taxes = ₹10 lakh.', answer: 'Step 1: GNP = GDP + Net factor income from abroad = 250 + (-5) = ₹245 lakh crore',
                  options: ['Step 1: GNP = GDP + Net factor income from abroad = 250 + (-5) = ₹245 lakh crore', 'Domestic', 'National'],
                  hint: 'If confused between domestic and national, revisit the "domestic territory" definition in Class 10.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' },
                { id: 'c', prompt: 'Compare two economies: Country A has GDP = ₹100, depreciation = ₹10, net factor income from abroad = +₹5.', answer: 'Country A: GNP = 100+5=105',
                  options: ['Country A: GNP = 100+5=105', 'Domestic', 'National'],
                  hint: 'If confused between domestic and national, revisit the "domestic territory" definition in Class 10.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' }
          ],
            remediations: { 'students-treat-gross-and-net': { steps: ['If you cannot move fluently between the four aggregates, do this 3-step remediation: (1) Draw a 4-box flow diagram: GDP.', 'Label each arrow with the exact operation and sign.', '(2) Take the numerical example from Diagnostic Question 3 and re-calculate starting from National Income backwards.', '(3) Revisit Class 10 node c10_eco_cbse_02_003 (GDP basics) and Class 11 node c11_eco_cbse_08_005 (GDP growth.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes.',
          parts: [
                { id: 'a', prompt: 'A news report states: "India\'s GNP is larger than its GDP because of huge remittances from the Indian diaspora." Evaluate this statement using the correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Domestic', 'National'],
                  hint: 'If confused between domestic and national, revisit the "domestic territory" definition in Class 10.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' }
          ],
            remediations: { 'students-treat-gross-and-net': { steps: ['If you cannot move fluently between the four aggregates, do this 3-step remediation: (1) Draw a 4-box flow diagram: GDP.', 'Label each arrow with the exact operation and sign.', '(2) Take the numerical example from Diagnostic Question 3 and re-calculate starting from National Income backwards.', '(3) Revisit Class 10 node c10_eco_cbse_02_003 (GDP basics) and Class 11 node c11_eco_cbse_08_005 (GDP growth.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_002', difficulty: 'standard',
          question: 'Gross and Net aggregates differ by consumption of fixed capital (depreciation).',
          hint: 'If stuck, revisit the "Circular Flow of Income" (c12_eco_cbse_08_004) to see why factor.',
          misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital.',
          parts: [
                { id: 'a', prompt: 'An economy has GNPmp = ₹12,000 crore, NNPfc = ₹10,200 crore, Net Indirect Taxes = ₹800 crore. Find Consumption of Fixed Capital and NFIA.', answer: 'Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore',
                  options: ['Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore', 'NFIA = 0 or invents a value'],
                  hint: 'If stuck, revisit the "Circular Flow of Income" (c12_eco_cbse_08_004) to see why factor payments.',
                  misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital (depreciation).' }
          ],
            remediations: { 'students-treat-gross-net-as': { steps: ['Revisit c12_eco_cbse_08_001 (Basic Concepts) to relearn the definitions of GDP, GNP, NNP, depreciation, NFIA, net.', 'Draw the 2×2 matrix (Gross/Net × Domestic/National) on paper and fill it with arrows: ↓ subtract CFC, → add NFIA.', 'Do 5 numericals from NCERT Exercise Q4–Q8 where two aggregates are given and you derive the third.', 'Re-attempt Diagnostic Questions 3 and 4 with the matrix method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_003', difficulty: 'standard',
          question: 'Nominal GDP is the market value of all final goods and services produced within.',
          hint: 'Revise c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche) — Real GDP.',
          misconception: '**Misconception:** "Real GDP is calculated using base-year quantities and base-year prices." **Why it\'s wrong:** This.',
          parts: [
                { id: 'a', prompt: 'Compare GDP Deflator and Consumer Price Index (CPI) on three dimensions: (i) basket of goods, (ii) treatment of imported goods, (iii) base-year revision.', answer: '**Correct Answer:** | Dimension | GDP Deflator | CPI (India) |',
                  options: ['**Correct Answer:** | Dimension | GDP Deflator | CPI (India) |', 'GDP Deflator includes imports', 'CPI basket changes every year'],
                  hint: 'Revise c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche) — Real GDP is.',
                  misconception: '**Misconception:** "Real GDP is calculated using base-year quantities and base-year prices." **Why it\'s wrong:** This describes **Base-Year.' }
          ],
            remediations: { 'misconception-real-gdp-is-calculated': { steps: ['If the student confuses Real GDP with base-year GDP: 1.', 'Revisit the definition: "Real GDP values **current output** at **base-year prices**." 2.', 'Work through a 2-good, 2-year numerical example (like Diagnostic Q3) step by step, explicitly labelling which year each.', 'Draw a table: Columns = Goods, Rows = Base Year Qty/Price, Current Year Qty/Price.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_004', difficulty: 'standard',
          question: 'The circular flow of income illustrates the continuous flow of money, goods.',
          hint: 'If stuck on equivalence, revisit c12_eco_cbse_08_001 (GDP definition) and c9_eco_ch1_7.',
          misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method.',
          parts: [
                { id: 'a', prompt: 'In a simple two-sector economy with only households and firms, if households spend ₹1,000 crore on final goods and services in a year, what is the total factor.', answer: '₹1,000 crore',
                  options: ['₹1,000 crore', 'less than ₹1,000 crore', 'different things', 'production'],
                  hint: 'If stuck on equivalence, revisit c12_eco_cbse_08_001 (GDP definition) and c9_eco_ch1_7 (factors.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' },
                { id: 'b', prompt: 'A farmer sells wheat worth ₹20,000 to a miller. The miller sells flour worth ₹35,000 to a baker. The baker sells bread worth ₹50,000 to consumers.', answer: 'Value Added Method: Farmer VA = ₹20,000 (no intermediate input)',
                  options: ['Value Added Method: Farmer VA = ₹20,000 (no intermediate input)', 'different things', 'production', 'earnings'],
                  hint: 'If stuck on equivalence, revisit c12_eco_cbse_08_001 (GDP definition) and c9_eco_ch1_7 (factors.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' },
                { id: 'c', prompt: 'In the circular flow diagram, if households decide to save ₹200 crore out of their ₹1,000 crore income, and firms invest exactly ₹200 crore, what happens.', answer: 'The circular flow remains constant at ₹1,000 crore',
                  options: ['The circular flow remains constant at ₹1,000 crore', 'income falls to ₹800 crore', 'different things', 'production'],
                  hint: 'If stuck on equivalence, revisit c12_eco_cbse_08_001 (GDP definition) and c9_eco_ch1_7 (factors.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' }
          ],
            remediations: { 'the-three-methods-measure-different': { steps: ['If a student cannot see the equivalence, do this 3-step remediation: (1) Take a single transaction — a ₹500 haircut.', 'Identify: Expenditure = ₹500 (consumer pays); Value Added = ₹500 (barber\'s output minus ₹0 intermediate); Factor Income.', '(2) Draw a T-account for the barber: Revenue ₹500 (credit) = Wages ₹200 + Rent ₹100 + Profit ₹200 (debits).', 'Show revenue = factor payments.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_005', difficulty: 'standard',
          question: 'The Value Added Method (Product Method) measures national income by summing the.',
          hint: 'If stuck on classification, revisit the "final vs intermediate goods" table in Class 10.',
          misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.',
          parts: [
                { id: 'a', prompt: 'Define Gross Value Added at Market Price (GVAMP) and state its formula.', answer: 'GVAMP = Value of Output – Intermediate Consumption',
                  options: ['GVAMP = Value of Output – Intermediate Consumption', 'calculate NDPfc'],
                  hint: 'If stuck on classification, revisit the "final vs intermediate goods" table in Class 10 node.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' },
                { id: 'b', prompt: 'A textile firm reports: Sales ₹80 lakh, Opening Stock ₹10 lakh, Closing Stock ₹15 lakh, Purchase of raw cotton ₹30 lakh, Electricity ₹5 lakh, Rent paid ₹3.', answer: 'Step 1: Value of Output = Sales + ΔStock = 80 + (15–10) = ₹85 lakh',
                  options: ['Step 1: Value of Output = Sales + ΔStock = 80 + (15–10) = ₹85 lakh', 'calculate NDPfc'],
                  hint: 'If stuck on classification, revisit the "final vs intermediate goods" table in Class 10 node.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' },
                { id: 'c', prompt: 'Compare the "Final Output Approach" and "Value Added Approach" for measuring GDP. Which is more practical for a large economy like India and why?', answer: 'Final Output Approach sums only final goods (bread ₹2,000)',
                  options: ['Final Output Approach sums only final goods (bread ₹2,000)', 'calculate NDPfc'],
                  hint: 'If stuck on classification, revisit the "final vs intermediate goods" table in Class 10 node.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' }
          ],
            remediations: { 'students-treat-value-added-as': { steps: ['Revisit node c12_eco_cbse_08_001 (Basic Concepts) to relearn the identity: GVAMP ≡ Sum of Factor Incomes + Depreciation.', 'Use a T-account: write GVAMP on left, break into factor payments on right.', 'Practice: "A firm\'s GVAMP is ₹100.', 'It pays wages ₹40, rent ₹10, interest ₹5, depreciation ₹15, indirect tax ₹20, receives subsidy ₹5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_006', difficulty: 'standard',
          question: 'The Income Method measures National Income by summing all factor payments made.',
          hint: 'If stuck, immediately revisit **c8_eco_ch1_2** to **c8_eco_ch1_6** (Factors.',
          misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Income Method measures National Income by summing all factor payments made to the',
                  options: ['The Income Method measures National Income by summing all factor payments made to the', 'Gross Domestic Product (GDP) is the market value of all final goods and services produced', 'Gross and Net aggregates differ by consumption of fixed capital (depreciation): Net =', 'Nominal GDP is the market value of all final goods and services produced within a'],
                  hint: 'If stuck, immediately revisit **c8_eco_ch1_2** to **c8_eco_ch1_6** (Factors of Production) and make.',
                  misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income received.' }
          ],
            remediations: { 'students-often-include-transfer-payments': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c9_eco_ch1_7** (Factors of Production) to relink each factor.', 'Use a two-column table: Column A = "Transaction", Column B = "Factor Payment / Transfer / Not Included".', 'Practice classifying 10 items (e.g., salary, pension, dividend, gift, imputed rent, mixed income of farmer).', 'Re-attempt Diagnostic Question 5 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
