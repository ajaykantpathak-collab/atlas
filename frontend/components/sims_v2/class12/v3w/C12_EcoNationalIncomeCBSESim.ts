import type { SimDef } from '../../engine/types';
import C12_EcoNationalIncomeCBSESim from '../../../simulations/c6_12_new/C12_EcoNationalIncomeCBSESim';

/** v3 wrapped master — C12_EcoNationalIncomeCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_econationalincomecbsesim: SimDef = {
    id: 'v3w_c12_econationalincomecbsesim',
    title: 'Basic Concepts: GDP, GNP, NNP and National Income',
    subtitle: 'This node covers the definitions and algebraic interrelationships of the four main.',
    classLevel: 12, subject: 'economics', topic: 'Basic Concepts: GDP, GNP, NNP and National Income',
    chapters: [],
    nodeIds: ['c12_eco_cbse_08_001', 'c12_eco_cbse_08_002', 'c12_eco_cbse_08_004', 'c12_eco_cbse_08_005', 'c12_eco_cbse_08_006', 'c12_eco_cbse_08_008', 'c12_eco_cbse_08_009', 'c12_eco_cbse_08_010', 'c12_eco_cbse_01_006', 'c12_eco_cbse_01_008', 'c12_eco_cbse_07_001', 'c12_eco_cbse_07_002', 'c12_eco_cbse_07_005', 'c12_eco_cbse_10_003', 'c12_eco_cbse_10_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you read a headline: "India\'s GDP grows at 7.2% in 2023-24." GDP measures production inside India\'s.', goal: 'Master Basic Concepts: GDP, GNP, NNP and National Income.' },
    discovery: {
        question: 'Explain why GDP plus net factor income from abroad equals GNP, and give a concrete Indian example of a factor income flow that is added and one that is.',
        options: ['GNP measures income earned by a country\'s residents regardless of location', 'Domestic', 'National'],
        answer: 'GNP measures income earned by a country\'s residents regardless of location',
        hook: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes.',
    },
    teaching: [
        { title: 'Gross Domestic Product (GDP) is the market.', text: 'Gross Domestic Product (GDP) is the market value of all final goods and services produced within the domestic territory of a country in an accounting year.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_001', title: 'Gross Domestic Product (GDP) is the.',
          scaffold: { problem: 'In 2022-23, India\'s GDP at market price was ₹272.41 lakh crore. Net factor income from abroad was -₹7.2 lakh crore.',
            steps: [
            { text: 'Identify the given data and the target aggregates. We have GDPmp = 272.41, NFIA = -7.2, Depreciation = 31.5, NIT = 24.8.' },
            { text: 'Apply the first identity: GNPmp = GDPmp + NFIA = 272.41 + (-7.2) = 265.21 lakh crore.' },
            { text: 'Apply the second identity: NNPmp = GNPmp - Depreciation = 265.21 - 31.5 = 233.71 lakh crore.' },
            { text: 'Apply the third identity: National Income (NIfc) = NNPmp - Net Indirect Taxes = 233.71 - 24.8 = 208.91 lakh crore.' },
            { text: 'Interpret: India\'s GNP is lower than GDP because factor income outflows exceed inflows.', faded: true, blankAnswer: 'GNPmp = ₹265.21 lakh crore; NNPmp = ₹233.71 lakh crore;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_002', title: 'Gross and Net aggregates differ by.',
          scaffold: { problem: 'India\'s GDPmp for 2023-24 is ₹295 lakh crore. Consumption of fixed capital is ₹32 lakh crore.',
            steps: [
            { text: 'Identify the target aggregates — NDPfc (domestic factor income) and NNPfc (national income).' },
            { text: 'Write the adjustment chain: GDPmp → (–CFC) → NDPmp → (–NIT) → NDPfc. Then NDPfc → (+NFIA) → NNPfc.' },
            { text: 'Compute NDPmp = GDPmp – CFC = 295 – 32 = ₹263 lakh crore.' },
            { text: 'Compute NDPfc = NDPmp – Net Indirect Taxes = 263 – 28 = ₹235 lakh crore.' },
            { text: 'Compute NNPfc = NDPfc + NFIA = 235 + (–4.5) = ₹230.5 lakh crore.' },
            { text: 'Interpret: Negative NFIA means India pays more factor income (interest, profits, wages) to foreign residents than it.', faded: true, blankAnswer: 'NDPfc = ₹235 lakh crore; NNPfc (National Income) = ₹230.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_004', title: 'The circular flow of income illustrates.',
          scaffold: { problem: 'In a simple economy, a farmer produces wheat worth ₹40,000 (no intermediate inputs). A miller buys the wheat, produces flour worth ₹70,000.',
            steps: [
            { text: 'Identify production stages and transactions — Farmer (primary), Miller (secondary), Baker (secondary/tertiary); final.' },
            { text: 'Product Method (Value Added) — Farmer VA = ₹40,000 - ₹0 = ₹40,000; Miller VA = ₹70,000 - ₹40,000 = ₹30,000; Baker VA =.' },
            { text: 'Income Method — Sum all factor payments across firms. Since no data given, use identity: Total Factor Income = Total.' },
            { text: 'Expenditure Method — Only final expenditure counts: Consumers buy bread for ₹1,00,000.' },
            { text: 'Verify — All three methods yield ₹1,00,000. The ₹40,000 wheat and ₹70,000 flour are intermediate goods, excluded from.', faded: true, blankAnswer: 'GDP = ₹1,00,000 by all three methods.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_005', title: 'The Value Added Method (Product Method).',
          scaffold: { problem: 'A farmer in Haryana produces wheat. He sells ₹50,000 worth to a flour mill, retains ₹10,000 for self-consumption, and adds ₹5,000 to his.',
            steps: [
            { text: 'Identify Value of Output = Sales + Self-consumption + Change in Stock = 50,000 + 10,000 + 5,000 = ₹65,000.' },
            { text: 'Identify Intermediate Consumption = Seeds + Fertilizer + Diesel = 12,000 + 8,000 + 5,000 = ₹25,000.' },
            { text: 'Apply GVAMP formula = Value of Output – Intermediate Consumption = 65,000 – 25,000 = ₹40,000.' },
            { text: 'Verify precautions: Self-consumption included (Precaution 1), own-account production included, intermediate goods.' },
            { text: 'Economic interpretation: This ₹40,000 is the new value created by the farmer\'s land, labour, and capital; it will.', faded: true, blankAnswer: 'GVAMP = ₹40,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_006', title: 'The Income Method measures National.',
          scaffold: { problem: 'In a hypothetical economy, the following data are available for 2023-24 (₹ crores): Wages and salaries = 1,200; Employer\'s contribution to.',
            steps: [
            { text: 'Identify Compensation of Employees = Wages and salaries + Employer\'s social security contribution = 1,200 + 100 = 1,300.' },
            { text: 'Identify Profit = Dividends + Undistributed profits + Corporate profit tax = 150 + 100 + 50 = 300.' },
            { text: 'List all five factor income components: Compensation of Employees (1,300), Rent (300), Interest (250), Profit (300),.' },
            { text: 'Sum them to get NDPfc = 1,300 + 300 + 250 + 300 + 800 = 2,950.' },
            { text: 'Add Net Factor Income from Abroad to get National Income = 2,950 + (-30) = 2,920.', faded: true, blankAnswer: 'NDPfc = ₹2,950 crores; National Income (NNPfc) = ₹2,920.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_008', title: 'Net Exports (NX) is the difference.',
          scaffold: { problem: 'In 2023-24, India\'s merchandise exports were ₹36.5 lakh crore, services exports ₹25.8 lakh crore, merchandise imports ₹57.2 lakh crore,.',
            steps: [
            { text: 'Identify total exports X = Merchandise Exports + Services Exports = 36.5 + 25.8 = ₹62.3 lakh crore.' },
            { text: 'Identify total imports M = Merchandise Imports + Services Imports = 57.2 + 13.4 = ₹70.6 lakh crore.' },
            { text: 'Compute Net Exports NX = X – M = 62.3 – 70.6 = –₹8.3 lakh crore (trade deficit).' },
            { text: 'Compute Factor Income Received = 0.8 + 3.2 = ₹4.0 lakh crore.' },
            { text: 'Compute Factor Income Paid = 0.3 + 4.5 = ₹4.8 lakh crore.' },
            { text: 'Compute NFIA = Received – Paid = 4.0 – 4.8 = –₹0.8 lakh crore (net outflow).', faded: true, blankAnswer: 'Net Exports = –₹8.3 lakh crore; NFIA = –₹0.8 lakh crore.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Basic Concepts: GDP, GNP, NNP and National Income', spots: [
            { id: 's1', label: 'Gross Domestic Product GDP is', prompt: 'Which idea is this? — Gross Domestic Product (GDP) is the market value of all final goods and services produced.', answer: 'Gross Domestic Product GDP is', options: ['Gross Domestic Product GDP is', 'Gross and Net aggregates differ', 'The circular flow of income', 'The Value Added Method Product'] },
            { id: 's2', label: 'Gross and Net aggregates differ', prompt: 'Which idea is this? — Gross and Net aggregates differ by consumption of fixed capital (depreciation): Net =.', answer: 'Gross and Net aggregates differ', options: ['Gross and Net aggregates differ', 'Gross Domestic Product GDP is', 'The circular flow of income', 'The Value Added Method Product'] },
            { id: 's3', label: 'The circular flow of income', prompt: 'Which idea is this? — The circular flow of income illustrates the continuous flow of money, goods, and services.', answer: 'The circular flow of income', options: ['The circular flow of income', 'Gross Domestic Product GDP is', 'Gross and Net aggregates differ', 'The Value Added Method Product'] },
            { id: 's4', label: 'The Value Added Method Product', prompt: 'Which idea is this? — The Value Added Method (Product Method) measures national income by summing the gross.', answer: 'The Value Added Method Product', options: ['The Value Added Method Product', 'Gross Domestic Product GDP is', 'Gross and Net aggregates differ', 'The circular flow of income'] },
            { id: 's5', label: 'The Income Method measures National', prompt: 'Which idea is this? — The Income Method measures National Income by summing all factor payments made to the.', answer: 'The Income Method measures National', options: ['The Income Method measures National', 'Gross Domestic Product GDP is', 'Gross and Net aggregates differ', 'The circular flow of income'] },
            { id: 's6', label: 'Net Exports NX is the', prompt: 'Which idea is this? — Net Exports (NX) is the difference between a country\'s total exports of goods and.', answer: 'Net Exports NX is the', options: ['Net Exports NX is the', 'Gross Domestic Product GDP is', 'Gross and Net aggregates differ', 'The circular flow of income'] }
          ] } }
    ],
    explore: { component: C12_EcoNationalIncomeCBSESim, prompt: 'Explore the interactive — Basic Concepts: GDP, GNP, NNP and National Income' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_001', difficulty: 'standard',
          question: 'Gross Domestic Product (GDP) is the market value of all final goods and.',
          hint: 'If confused between domestic and national, revisit the "domestic territory" definition in.',
          misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes.',
          parts: [
                { id: 'a', prompt: 'Explain why GDP plus net factor income from abroad equals GNP, and give a concrete Indian example of a factor income flow that is added and one that is.', answer: 'GNP measures income earned by a country\'s residents regardless of location',
                  options: ['GNP measures income earned by a country\'s residents regardless of location', 'Domestic', 'National'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' },
                { id: 'b', prompt: 'If GDP at market price = ₹250 lakh crore, net factor income from abroad = -₹5 lakh crore, depreciation = ₹15 lakh crore, and net indirect taxes = ₹10 lakh.', answer: 'Step 1: GNP = GDP + Net factor income from abroad = 250 + (-5) = ₹245 lakh crore',
                  options: ['Step 1: GNP = GDP + Net factor income from abroad = 250 + (-5) = ₹245 lakh crore', 'Domestic', 'National'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' },
                { id: 'c', prompt: 'Compare two economies: Country A has GDP = ₹100, depreciation = ₹10, net factor income from abroad = +₹5.', answer: 'Country A: GNP = 100+5=105',
                  options: ['Country A: GNP = 100+5=105', 'Domestic', 'National'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' }
          ],
            remediations: { 'students-treat-gross-and-net': { steps: ['If you cannot move fluently between the four aggregates, do this 3-step remediation: (1) Draw a 4-box flow diagram: GDP.', 'Label each arrow with the exact operation and sign.', '(2) Take the numerical example from Diagnostic Question 3 and re-calculate starting from National Income backwards to.', '(3) Revisit Class 10 node c10_eco_cbse_02_003 (GDP basics) and Class 11 node c11_eco_cbse_08_005 (GDP growth.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes.',
          parts: [
                { id: 'a', prompt: 'A news report states: "India\'s GNP is larger than its GDP because of huge remittances from the Indian diaspora." Evaluate this statement using the correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Domestic', 'National'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross" and "Net" as mere adjectives and forget that "Gross" includes depreciation while "Net" excludes it.' }
          ],
            remediations: { 'students-treat-gross-and-net': { steps: ['If you cannot move fluently between the four aggregates, do this 3-step remediation: (1) Draw a 4-box flow diagram: GDP.', 'Label each arrow with the exact operation and sign.', '(2) Take the numerical example from Diagnostic Question 3 and re-calculate starting from National Income backwards to.', '(3) Revisit Class 10 node c10_eco_cbse_02_003 (GDP basics) and Class 11 node c11_eco_cbse_08_005 (GDP growth.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_002', difficulty: 'standard',
          question: 'Gross and Net aggregates differ by consumption of fixed capital (depreciation):.',
          hint: 'If stuck, revisit the "Circular Flow of Income" (c12_eco_cbse_08_004) to see why factor.',
          misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital.',
          parts: [
                { id: 'a', prompt: 'An economy has GNPmp = ₹12,000 crore, NNPfc = ₹10,200 crore, Net Indirect Taxes = ₹800 crore. Find Consumption of Fixed Capital and NFIA.', answer: 'Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore',
                  options: ['Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore', 'NFIA = 0 or invents a value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital (depreciation).' }
          ],
            remediations: { 'students-treat-gross-net-as': { steps: ['Revisit c12_eco_cbse_08_001 (Basic Concepts) to relearn the definitions of GDP, GNP, NNP, depreciation, NFIA, net.', 'Draw the 2×2 matrix (Gross/Net × Domestic/National) on paper and fill it with arrows: ↓ subtract CFC, → add NFIA.', 'Do 5 numericals from NCERT Exercise Q4–Q8 where two aggregates are given and you derive the third.', 'Re-attempt Diagnostic Questions 3 and 4 with the matrix method.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital.',
          parts: [
                { id: 'a', prompt: 'An economy has GNPmp = ₹12,000 crore, NNPfc = ₹10,200 crore, Net Indirect Taxes = ₹800 crore. Find Consumption of Fixed Capital and NFIA.', answer: 'Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore',
                  options: ['Step 1: NNPmp = NNPfc + Net Indirect Taxes = 10,200 + 800 = ₹11,000 crore', 'NFIA = 0 or invents a value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Gross → Net" as subtracting "capital loss" (e.g., fire damage) instead of consumption of fixed capital (depreciation).' }
          ],
            remediations: { 'students-treat-gross-net-as': { steps: ['Revisit c12_eco_cbse_08_001 (Basic Concepts) to relearn the definitions of GDP, GNP, NNP, depreciation, NFIA, net.', 'Draw the 2×2 matrix (Gross/Net × Domestic/National) on paper and fill it with arrows: ↓ subtract CFC, → add NFIA.', 'Do 5 numericals from NCERT Exercise Q4–Q8 where two aggregates are given and you derive the third.', 'Re-attempt Diagnostic Questions 3 and 4 with the matrix method.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_004', difficulty: 'standard',
          question: 'The circular flow of income illustrates the continuous flow of money, goods,.',
          hint: 'If stuck on equivalence, revisit c12_eco_cbse_08_001 (GDP definition) and c9_eco_ch1_7.',
          misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method.',
          parts: [
                { id: 'a', prompt: 'In a simple two-sector economy with only households and firms, if households spend ₹1,000 crore on final goods and services in a year, what is the total factor.', answer: '₹1,000 crore',
                  options: ['₹1,000 crore', 'less than ₹1,000 crore', 'different things'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' },
                { id: 'b', prompt: 'A farmer sells wheat worth ₹20,000 to a miller. The miller sells flour worth ₹35,000 to a baker. The baker sells bread worth ₹50,000 to consumers.', answer: 'Value Added Method: Farmer VA = ₹20,000 (no intermediate input)',
                  options: ['Value Added Method: Farmer VA = ₹20,000 (no intermediate input)', 'different things', 'production'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' },
                { id: 'c', prompt: 'In the circular flow diagram, if households decide to save ₹200 crore out of their ₹1,000 crore income, and firms invest exactly ₹200 crore, what happens to.', answer: 'The circular flow remains constant at ₹1,000 crore',
                  options: ['The circular flow remains constant at ₹1,000 crore', 'income falls to ₹800 crore', 'different things'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' }
          ],
            remediations: { 'the-three-methods-measure-different': { steps: ['If a student cannot see the equivalence, do this 3-step remediation: (1) Take a single transaction — a ₹500 haircut.', 'Identify: Expenditure = ₹500 (consumer pays); Value Added = ₹500 (barber\'s output minus ₹0 intermediate); Factor Income.', '(2) Draw a T-account for the barber: Revenue ₹500 (credit) = Wages ₹200 + Rent ₹100 + Profit ₹200 (debits).', 'Show revenue = factor payments.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The Income Method of measuring GDP is more accurate than the Product Method because it directly measures what people earn, avoiding.', answer: 'The statement is false',
                  options: ['The statement is false', 'different things', 'production', 'earnings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' },
                { id: 'b', prompt: 'Construct a two-sector circular flow diagram for an economy where households own all factors of production, firms produce only consumption goods, and there is.', answer: 'Base diagram: Inner clockwise loop (real flows)',
                  options: ['Base diagram: Inner clockwise loop (real flows)', 'different things', 'production', 'earnings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three methods measure "different things" — Product Method measures "production," Income Method measures "earnings,".' }
          ],
            remediations: { 'the-three-methods-measure-different': { steps: ['If a student cannot see the equivalence, do this 3-step remediation: (1) Take a single transaction — a ₹500 haircut.', 'Identify: Expenditure = ₹500 (consumer pays); Value Added = ₹500 (barber\'s output minus ₹0 intermediate); Factor Income.', '(2) Draw a T-account for the barber: Revenue ₹500 (credit) = Wages ₹200 + Rent ₹100 + Profit ₹200 (debits).', 'Show revenue = factor payments.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_005', difficulty: 'standard',
          question: 'The Value Added Method (Product Method) measures national income by summing the.',
          hint: 'If stuck on classification, revisit the "final vs intermediate goods" table in Class 10.',
          misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.',
          parts: [
                { id: 'a', prompt: 'Define Gross Value Added at Market Price (GVAMP) and state its formula.', answer: 'GVAMP = Value of Output – Intermediate Consumption',
                  options: ['GVAMP = Value of Output – Intermediate Consumption', 'calculate NDPfc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' },
                { id: 'b', prompt: 'A textile firm reports: Sales ₹80 lakh, Opening Stock ₹10 lakh, Closing Stock ₹15 lakh, Purchase of raw cotton ₹30 lakh, Electricity ₹5 lakh, Rent paid ₹3.', answer: 'Step 1: Value of Output = Sales + ΔStock = 80 + (15–10) = ₹85 lakh',
                  options: ['Step 1: Value of Output = Sales + ΔStock = 80 + (15–10) = ₹85 lakh', 'calculate NDPfc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' },
                { id: 'c', prompt: 'Compare the "Final Output Approach" and "Value Added Approach" for measuring GDP. Which is more practical for a large economy like India and why?', answer: 'Final Output Approach sums only final goods (bread ₹2,000)',
                  options: ['Final Output Approach sums only final goods (bread ₹2,000)', 'calculate NDPfc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' }
          ],
            remediations: { 'students-treat-value-added-as': { steps: ['Revisit node c12_eco_cbse_08_001 (Basic Concepts) to relearn the identity: GVAMP ≡ Sum of Factor Incomes + Depreciation.', 'Use a T-account: write GVAMP on left, break into factor payments on right.', 'Practice: "A firm\'s GVAMP is ₹100.', 'It pays wages ₹40, rent ₹10, interest ₹5, depreciation ₹15, indirect tax ₹20, receives subsidy ₹5.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Imputed rent of owner-occupied houses should be excluded from GDP because no actual transaction occurs." Is this correct? Justify.', answer: 'Incorrect',
                  options: ['Incorrect', 'calculate NDPfc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' },
                { id: 'b', prompt: 'Construct a 3-stage production chain (farmer → processor → retailer) with your own numbers. Show that sum of value added equals final sale value.', answer: 'Example: Farmer output ₹500 (IC=0) → VA=500',
                  options: ['Example: Farmer output ₹500 (IC=0) → VA=500', 'calculate NDPfc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Value Added" as "Profit" — they subtract wages, rent, interest from GVAMP.' }
          ],
            remediations: { 'students-treat-value-added-as': { steps: ['Revisit node c12_eco_cbse_08_001 (Basic Concepts) to relearn the identity: GVAMP ≡ Sum of Factor Incomes + Depreciation.', 'Use a T-account: write GVAMP on left, break into factor payments on right.', 'Practice: "A firm\'s GVAMP is ₹100.', 'It pays wages ₹40, rent ₹10, interest ₹5, depreciation ₹15, indirect tax ₹20, receives subsidy ₹5.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_006', difficulty: 'standard',
          question: 'The Income Method measures National Income by summing all factor payments made.',
          hint: 'If stuck, immediately revisit **c8_eco_ch1_2** to **c8_eco_ch1_6** (Factors of.',
          misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Income Method measures National Income by summing all factor payments made to the',
                  options: ['The Income Method measures National Income by summing all factor payments made to the', 'Gross Domestic Product (GDP) is the market value of all final goods and services produced', 'Gross and Net aggregates differ by consumption of fixed capital (depreciation): Net =', 'The circular flow of income illustrates the continuous flow of money, goods, and services'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income received by.' }
          ],
            remediations: { 'students-often-include-transfer-payments': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c9_eco_ch1_7** (Factors of Production) to relink each factor.', 'Use a two-column table: Column A = "Transaction", Column B = "Factor Payment / Transfer / Not Included".', 'Practice classifying 10 items (e.g., salary, pension, dividend, gift, imputed rent, mixed income of farmer).', 'Re-attempt Diagnostic Question 5 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since transfer payments like old-age pensions and unemployment benefits are income received by households, they should be included in.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'income received by households'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income received by.' },
                { id: 'b', prompt: 'Construct a hypothetical example of a self-employed tailor in an Indian town.', answer: '**Example:** Rekha runs a tailoring shop from a room in her owned house',
                  options: ['**Example:** Rekha runs a tailoring shop from a room in her owned house', 'income received by households'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **include transfer payments (pensions, scholarships, gifts) in factor income** because they are "income received by.' }
          ],
            remediations: { 'students-often-include-transfer-payments': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c9_eco_ch1_7** (Factors of Production) to relink each factor.', 'Use a two-column table: Column A = "Transaction", Column B = "Factor Payment / Transfer / Not Included".', 'Practice classifying 10 items (e.g., salary, pension, dividend, gift, imputed rent, mixed income of farmer).', 'Re-attempt Diagnostic Question 5 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_008', difficulty: 'standard',
          question: 'Net Exports (NX) is the difference between a country\'s total exports of goods.',
          hint: 'If stuck, immediately review the "Domestic vs National" table in c12_eco_cbse_08_001 and.',
          misconception: 'Students treat Net Exports and Net Factor Income from Abroad as the same concept because both involve "net" and.',
          parts: [
                { id: 'a', prompt: 'India\'s exports are ₹30 lakh crore, imports are ₹42 lakh crore.', answer: 'Net Exports = 30 – 42 = –₹12 lakh crore (trade deficit)',
                  options: ['Net Exports = 30 – 42 = –₹12 lakh crore (trade deficit)', 'received/paid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Net Exports and Net Factor Income from Abroad as the same concept because both involve "net" and "abroad".' }
          ],
            remediations: { 'students-treat-net-exports-and': { steps: ['Revisit c12_eco_cbse_08_001 (Basic Concepts: GDP, GNP, NNP) to clarify the domestic vs national distinction.', 'Draw a two-column table: Column A "Trade Flows (Goods/Services)" → Exports, Imports, Net Exports.', 'Practice 5 numerical problems where only one of NX or NFIA is non-zero, then both non-zero.', 'Re-attempt Diagnostic Question 3 and 4. If errors persist, review the circular flow diagram in c12_eco_cbse_08_004 to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
