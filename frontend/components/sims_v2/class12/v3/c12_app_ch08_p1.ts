import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch08_p1: SimDef = {
    id: 'v3_c12_app_ch08_p1',
    title: 'Index Numbers Time Based · Part 1/2',
    subtitle: 'This node covers the conceptual foundation of index numbers: definition, purpose.',
    classLevel: 12, subject: 'app', topic: 'Index Numbers Time Based · Part 1/2',
    chapters: ['c12_app_ch08'],
    nodeIds: ['c12_app_cbse_08_001', 'c12_app_cbse_08_002', 'c12_app_cbse_08_003', 'c12_app_cbse_08_004', 'c12_app_cbse_08_005', 'c12_app_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "Your parents say \'everything cost half as much in 2000!\' How do economists.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What does an index number of 125 for the year 2023 with base year 2010 indicate about price levels?',
        options: ['An index of 125 means prices in 2023 are 25% higher than in the base year 2010', 'prices increased by 125%', '140% increase'],
        answer: 'An index of 125 means prices in 2023 are 25% higher than in the base year 2010',
        hook: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather.',
    },
    teaching: [
        { title: 'LEARNING OUTCOMES', text: 'An index number is a statistical measure that tracks the relative change in a group of related variables (prices, quantities, or values) over two different situations — typically two time periods.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_001', title: 'LEARNING OUTCOMES',
          scaffold: { problem: 'The price of a representative basket of goods was ₹2,500 in base year 2015 and ₹3,375 in 2023.',
            steps: [
            { text: 'Identify base period value (p₀ = 2500) and current period value (pₙ = 3375).' },
            { text: 'Recall the relative index formula: Iₙ = (pₙ / p₀) × 100.' },
            { text: 'Substitute values: I₂₀₂₃ = (3375 / 2500) × 100 = 1.35 × 100 = 135.' },
            { text: 'Interpret: Index 135 means the basket costs 35% more in 2023 than in 2015.' },
            { text: 'Policy phrasing: "Consumer prices have risen 35% since 2015, eroding real incomes if wages haven\'t kept pace."', faded: true, blankAnswer: 'Price Index for 2023 (base 2015) = 135. This indicates.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_002', title: 'Applied Mathematics',
          scaffold: { problem: 'A household consumes 3 items: Rice (20 kg/month), Wheat (15 kg/month), Dal (5 kg/month). Prices in base year 2020: ₹40/kg, ₹30/kg, ₹80/kg.',
            steps: [
            { text: 'Identify given data — base year (2020) prices p₀ and quantities q₀; current year (2024) prices pₙ and quantities qₙ.' },
            { text: 'Set up computation table with columns: Commodity, p₀, pₙ, q₀, qₙ, p₀q₀, pₙq₀, p₀qₙ, pₙqₙ.' },
            { text: 'Compute each product:' },
            { text: 'Apply formulas:' },
            { text: 'Interpret: Laspeyres (123.64) > Paasche (123.57) — household substituted toward wheat (price rose 20% vs rice 25%, dal.', faded: true, blankAnswer: 'Laspeyres = 123.64, Paasche = 123.57, Fisher = 123.60.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_003', title: 'Concept Map',
          scaffold: { problem: 'The price of 1 kg of tur dal (arhar) was ₹80 in 2015 (base year) and ₹112 in 2023.',
            steps: [
            { text: 'Identify base period price (p₀) = ₹80 (2015) and current period price (pₙ) = ₹112 (2023).' },
            { text: 'Recall the relative index formula: Iₙ = (pₙ / p₀) × 100.' },
            { text: 'Substitute values: I₂₀₂₃ = (112 / 80) × 100 = 1.4 × 100 = 140.' },
            { text: 'Interpret: The index is 140, meaning tur dal price in 2023 is 40% higher than in 2015.' },
            { text: 'Policy framing: "Retail price of tur dal has risen 40% since 2015, contributing to food inflation pressure.', faded: true, blankAnswer: 'Price relative index for 2023 = 140. Interpretation: Tur.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_004', title: 'Introduction',
          scaffold: { problem: 'The table shows prices of three essential commodities in a village shop. 2015 is the base year.',
            steps: [
            { text: 'Identify base period (2015) and current period (2022); confirm units match for each commodity (kg/kg, litre/litre).' },
            { text: 'Recall formula \\( I_n = \\frac{p_n}{p_0} \\times 100 \\). Apply to each commodity separately.' },
            { text: 'Wheat: \\( \\frac{28}{20} \\times 100 = 140 \\). Mustard Oil: \\( \\frac{160}{100} \\times 100 = 160 \\).' },
            { text: 'Interpret: Wheat index 140 → 40% increase. Mustard Oil index 160 → 60% increase. Salt index 120 → 20% increase.' },
            { text: 'Compare percentage increases: Mustard Oil (60%) > Wheat (40%) > Salt (20%).', faded: true, blankAnswer: 'Price Relative Indices (2022, base 2015): Wheat = 140.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_005', title: 'Index Number',
          scaffold: { problem: 'The price of 1 kg of tur dal (pigeon peas) was ₹85 in 2018 (base year) and ₹119 in 2024. Compute the price relative index number for 2024.',
            steps: [
            { text: 'Identify given data: p0 = 85, pn = 119, Q0 = 30, Qn = 25. Base year = 2018, current year = 2024.' },
            { text: 'Recall the formula for single-commodity price relative index: I_price = (pn / p0) × 100.' },
            { text: 'Compute price index: (119 / 85) × 100 = 1.4 × 100 = 140.' },
            { text: 'Compute quantity index: (25 / 30) × 100 = 0.8333 × 100 = 83.33.' },
            { text: 'Interpret: Price index 140 means tur dal price in 2024 is 40% higher than in 2018.', faded: true, blankAnswer: 'Price relative index = 140 (40% increase). Quantity.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_006', title: 'Use of Index Numbers',
          scaffold: { problem: 'The All-India Consumer Price Index for Industrial Workers (CPI-IW) with base 2016 = 100 was 126.5 in July 2023.',
            steps: [
            { text: 'Identify given: Base Index = 100 (2016), Current Index (July 2023) = 126.5, Neutral Point = 115, Basic Pay = ₹35,000.' },
            { text: 'Calculate index points above neutral point: \\(126.5 - 115 = 11.5\\) points.' },
            { text: 'Calculate DA percentage: \\(11.5 \\times 0.5\\% = 5.75\\%\\).' },
            { text: 'Calculate DA amount: \\(5.75\\% \\times ₹35,000 = ₹2,012.50\\).' },
            { text: 'Interpret: The index 126.5 means prices are 26.5% above 2016; DA compensates only for rise above 115 (15% above 2016).', faded: true, blankAnswer: 'Monthly DA = **₹2,012.50**' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_08_005', title: 'Index Number',
          caseStudy: { intro: 'Start by asking: "If your parents say \'everything cost half as much in 2000\', how would you verify that using data?" Introduce the problem: comparing prices.',
            decisions: [{ prompt: 'What is the index number of the base period by definition, and why is it assigned this specific value?', options: [
                { text: 'The index number of the base period is always 100', outcome: 'The index number of the base period is always 100. It is assigned this value by convention to serve.' },
                { text: 'it depends', outcome: 'Not quite — Students consistently treat the index number *itself* as the percentage change.', reveals: 'students-consistently-treat-the-index' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Index Numbers Time Based like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Index Numbers Time Based · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Index Numbers Time Based · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_08_001', difficulty: 'standard',
          question: 'An index number is a statistical measure that tracks the relative change in.',
          hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
          misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather.',
          parts: [
                { id: 'a', prompt: 'What does an index number of 125 for the year 2023 with base year 2010 indicate about price levels?', answer: 'An index of 125 means prices in 2023 are 25% higher than in the base year 2010',
                  options: ['An index of 125 means prices in 2023 are 25% higher than in the base year 2010', 'prices increased by 125%', '140% increase'],
                  hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
                  misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather than a relative.' },
                { id: 'b', prompt: 'A news report states: "The Consumer Price Index (CPI) rose from 160 to 176 this year." Calculate the percentage increase in the price level and explain why you.', answer: 'Percentage increase = ((176 - 160) / 160) × 100 = 10%',
                  options: ['Percentage increase = ((176 - 160) / 160) × 100 = 10%', '140% increase'],
                  hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
                  misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather than a relative.' },
                { id: 'c', prompt: 'Compare and contrast: Price Index, Quantity Index, and Value Index. Give one real-world example of each used in India.', answer: 'Price Index measures price changes (e.g., CPI',
                  options: ['Price Index measures price changes (e.g., CPI', 'CPI is a quantity index', '140% increase', 'swaps examples (e'],
                  hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
                  misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather than a relative.' }
          ],
            remediations: { 'an-index-number-of-140': { steps: ['Revisit the definition: "Index = (Current value / Base value) × 100" — emphasize the division happens FIRST, then ×100.', 'Practice: Given base price ₹50, current ₹70 → index = (70/50)×100 = 140.', 'Ask: "Is this a 140% increase?" No, (70-50)/50 = 40%.', 'Drill 5 rapid conversions: index 115 → +15%, 95 → -5%, 100 → 0%, 200 → +100%, 50 → -50%.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since the Wholesale Price Index (WPI) increased from 120 to 132, the purchasing power of money decreased by 10%."', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '140% increase'],
                  hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
                  misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather than a relative.' },
                { id: 'b', prompt: 'Design a simple index series to track the "cost of a student\'s monthly snack budget" over 5 months.', answer: 'Example: Base = January',
                  options: ['Example: Base = January', '140% increase'],
                  hint: 'If stuck on percentage interpretation, review Class 8 Mathematics: "Comparing Quantities".',
                  misconception: 'Students believe an index number of 140 means "140% increase" — they treat the index as an absolute percentage rather than a relative.' }
          ],
            remediations: { 'an-index-number-of-140': { steps: ['Revisit the definition: "Index = (Current value / Base value) × 100" — emphasize the division happens FIRST, then ×100.', 'Practice: Given base price ₹50, current ₹70 → index = (70/50)×100 = 140.', 'Ask: "Is this a 140% increase?" No, (70-50)/50 = 40%.', 'Drill 5 rapid conversions: index 115 → +15%, 95 → -5%, 100 → 0%, 200 → +100%, 50 → -50%.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_002', difficulty: 'standard',
          question: 'An index number is a statistical measure expressed as a pure number (typically.',
          hint: 'If stuck on Σ manipulations or geometric mean, review c11_app_cbse_01_008 (Laws.',
          misconception: '**Misconception:** "Laspeyres index uses base-year prices as weights; Paasche uses current-year prices as weights.".',
          parts: [
                { id: 'a', prompt: 'What is the index number of the base period by definition, and why is it always expressed as a pure number without units or percentage sign?', answer: 'The index number of the base period is **always 100** by definition',
                  options: ['The index number of the base period is **always 100** by definition', 'weights = prices', '"weights = prices'],
                  hint: 'If stuck on Σ manipulations or geometric mean, review c11_app_cbse_01_008 (Laws of Logarithms) and.',
                  misconception: '**Misconception:** "Laspeyres index uses base-year prices as weights; Paasche uses current-year prices as weights." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'A student computes the simple aggregative price index for 4 commodities and gets 125.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'weights = prices', '"weights = prices'],
                  hint: 'If stuck on Σ manipulations or geometric mean, review c11_app_cbse_01_008 (Laws of Logarithms) and.',
                  misconception: '**Misconception:** "Laspeyres index uses base-year prices as weights; Paasche uses current-year prices as weights." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-laspeyres-index-uses-base': { steps: ['If a student confuses weights (prices vs quantities): 1.', '**Revisit c12_app_cbse_08_007 (Construction of Index Number)** — specifically the weighted aggregative method.', '**Do a concrete drill**: Take 2 commodities.', 'Let p₀=[10,100], pₙ=[15,120], q₀=[100,10], qₙ=[80,12].'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_003', difficulty: 'standard',
          question: 'An index number is a statistical measure that shows the relative change in.',
          hint: 'If stuck, review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for weighted.',
          misconception: '**Misconception**: "Index number = Percentage change." **Why it happens**: Students see the formula (Current/Base.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why an index number is called a "special type of average" (as per NCERT), and give one reason why it is NOT a simple arithmetic mean.', answer: 'An index number is a "special type of average"',
                  options: ['An index number is a "special type of average"', 'it\'s just an average of price relatives'],
                  hint: 'If stuck, review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for weighted averages and.',
                  misconception: '**Misconception**: "Index number = Percentage change." **Why it happens**: Students see the formula (Current/Base × 100) and the "%.' },
                { id: 'b', prompt: 'A newspaper reports: "The Consumer Price Index (CPI) for industrial workers rose from 145 in 2018 to 174 in 2023." Calculate the percentage increase in the.', answer: 'Percentage increase = ((174 - 145) / 145) × 100 = 20%',
                  options: ['Percentage increase = ((174 - 145) / 145) × 100 = 20%', '29% increase'],
                  hint: 'If stuck, review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for weighted averages and.',
                  misconception: '**Misconception**: "Index number = Percentage change." **Why it happens**: Students see the formula (Current/Base × 100) and the "%.' },
                { id: 'c', prompt: 'Compare and contrast: Price Index vs Quantity Index vs Value Index.', answer: '- **Price Index**: Measures change in prices over time',
                  options: ['- **Price Index**: Measures change in prices over time', 'swaps examples (e'],
                  hint: 'If stuck, review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for weighted averages and.',
                  misconception: '**Misconception**: "Index number = Percentage change." **Why it happens**: Students see the formula (Current/Base × 100) and the "%.' }
          ],
            remediations: { 'misconception-index-number-percentage-change': { steps: ['**Revisit the base convention**: Write down 5 index numbers (e.g., 100, 110, 95, 125, 80) and for each, state: "Base.', 'This means ___% increase/decrease." Do this until automatic.', '**Practice the conversion**: Given index numbers for 3 years (e.g., 2018: 100, 2020: 115, 2022: 132), compute.', '**Re-diagnostic**: Ask the student: "If CPI = 200, what is the purchasing power of ₹100 relative to base year?".'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_004', difficulty: 'standard',
          question: 'An index number is a statistical measure designed to show the average change.',
          hint: 'If stuck on "index vs % change", review Class 8 percentage basics: "If a shirt cost ₹200.',
          misconception: '**Misconception:** "Index number = Percentage change." Students repeatedly write "Index 140 means 140% increase".',
          parts: [
                { id: 'a', prompt: 'What is the index number of the base period by definition, and why is it assigned this specific value?', answer: 'The index number of the base period is always **100**',
                  options: ['The index number of the base period is always **100**', 'the actual price'],
                  hint: 'If stuck on "index vs % change", review Class 8 percentage basics: "If a shirt cost ₹200 and now.',
                  misconception: '**Misconception:** "Index number = Percentage change." Students repeatedly write "Index 140 means 140% increase" or "Inflation = Current.' }
          ],
            remediations: { 'misconception-index-number-percentage-change': { steps: ['**Re-visit the crude oil example (NCERT p.4–5):** Recompute each year\'s index *and* explicitly write "Index = 140 → %.', '**Drill 5 quick conversions:** Given index values (105, 95, 120, 80, 100), write the % change each time: +5%, −5%.', '**Create a 2-commodity table** where base prices differ wildly (e.g., car vs pencil); compute relatives and verify that.', '**Re-diagnostic:** Ask the student: "If base year index is 100 and current year index is 118, what is the percentage.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_005', difficulty: 'standard',
          question: 'An index number is a statistical measure designed to show the average change.',
          hint: 'If stuck on percentage-change logic, revisit Class 8 Comparing Quantities (profit/loss %.',
          misconception: 'Students consistently treat the index number *itself* as the percentage change.',
          parts: [
                { id: 'a', prompt: 'What is the index number of the base period by definition, and why is it assigned this specific value?', answer: 'The index number of the base period is always 100',
                  options: ['The index number of the base period is always 100', 'it depends'],
                  hint: 'If stuck on percentage-change logic, revisit Class 8 Comparing Quantities (profit/loss %, discount.',
                  misconception: 'Students consistently treat the index number *itself* as the percentage change.' }
          ],
            remediations: { 'students-consistently-treat-the-index': { steps: ['If a student writes "140% increase" for index 140: (1) Make them compute (pn/p0)×100 for 3 simple cases (e.g., 20→30.', '(2) Ask: "If base = 100 and current = 140, what is (current - base)?" → 40.', '"What is 40 as a % of base?" → 40%.', '(3) Drill: "Index = 100 + %change" — so %change = Index - 100.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_006', difficulty: 'standard',
          question: 'An index number is a statistical measure designed to show the average change.',
          hint: 'If stuck on interpretation, immediately revisit **c11_app_cbse_11_001 (Percentage Change.',
          misconception: '**Misconception:** *"Index number = Percentage. So CPI 150 means 150% inflation."* **Exact Wrong Reasoning:** Students.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An index number is a statistical measure designed to show the average change in a',
                  options: ['An index number is a statistical measure designed to show the average change in a', 'An index number is a statistical measure that tracks the relative change in a group of', 'An index number is a statistical measure expressed as a pure number (typically with base', 'An index number is a statistical measure that shows the relative change in a variable (or'],
                  hint: 'If stuck on interpretation, immediately revisit **c11_app_cbse_11_001 (Percentage Change & Growth.',
                  misconception: '**Misconception:** *"Index number = Percentage. So CPI 150 means 150% inflation."* **Exact Wrong Reasoning:** Students see the formula \\(I.' }
          ],
            remediations: { 'misconception-index-number-percentage': { steps: ['**Immediate Re-teach (5 mins):** Write on board: \\(\\text{Index} = \\frac{P_1}{P_0} \\times 100\\) \\(\\%\\Delta = \\frac{P_1.', '*"If Index = 200, %Δ = ?"* (100%).', 'Drill 5 rapid-fire conversions.', '**Visual Anchor:** Draw a number line: 0 — 100 (Base) — 150 (Index) — 200.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
