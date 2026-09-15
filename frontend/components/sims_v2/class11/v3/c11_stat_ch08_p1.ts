import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch08_p1: SimDef = {
    id: 'v3_c11_stat_ch08_p1',
    title: 'Index Numbers · Part 1/2',
    subtitle: 'Learn why inflation\'s headline number is a weighted argument.',
    classLevel: 11, subject: 'statistics', topic: 'Index Numbers · Part 1/2',
    chapters: ['c11_stat_ch08'],
    nodeIds: ['c11_stat_cbse_08_001', 'c11_stat_cbse_08_002', 'c11_stat_cbse_08_003', 'c11_stat_cbse_08_004', 'c11_stat_cbse_08_005', 'c11_stat_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist choosing the right basket for the right question', intro: 'Rent up 10%, chewing gum up 10% — a simple average calls them equal; your household budget disagrees.', goal: 'Construct weighted index numbers and select WPI versus CPI by purpose.' },
    discovery: {
        question: 'WPI covers far more commodities than CPI — so it\'s the better inflation measure for the common man?',
        options: ['No — coverage isn\'t relevance; the common man buys the consumer basket, which is exactly what CPI tracks', 'Yes — more commodities means better', 'Yes — wholesale is the real economy', 'No — CPI covers more items actually'],
        answer: 'No — coverage isn\'t relevance; the common man buys the consumer basket, which is exactly what CPI tracks',
        hook: 'An index isn\'t a mean of percentage changes — (10% + 20% + 30%)/3 forgets that a 10% rent rise bites harder than a 10% gum rise; weights carry the meaning.',
    },
    teaching: [
        { title: 'Meaning and Characteristics of Index Numbers', text: 'An index number is a statistical measure designed to show the average relative change in a group of related variables (such as prices, quantities, or values) between two time periods or across.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weight a household basket honestly, then defend Laspeyres versus Paasche as different questions — not equal formulas.',
        labels: ['Meaning and Characteristics', 'Uses and Importance', 'Construction of Simple Index', 'Weighted Index Numbers: Need', 'Laspeyre\'s Price Index Number', 'Paasche\'s Price Index Number'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_001', title: 'Meaning and Characteristics of Index Numbers',
          caseStudy: { intro: 'Imagine you hear on the news: "Retail inflation hit 6.5% in January." Have you ever wondered how a single number summarizes price changes for thousands.',
            decisions: [{ prompt: 'State the definition of an index number and identify the fixed reference value assigned to the base period.', options: [
                { text: 'An index number is a statistical measure that shows the average relative change in a', outcome: 'An index number is a statistical measure that shows the average relative change in a group.' },
                { text: 'base period value is 0', outcome: 'Not quite — Students often think an index number is just the arithmetic mean of percentage changes.', reveals: 'an-index-number-is-just' },
                { text: 'index number measures absolute change', outcome: 'Not quite — Students often think an index number is just the arithmetic mean of percentage changes.', reveals: 'an-index-number-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_002', title: 'Uses and Importance of Index Numbers in Economics',
          caseStudy: { intro: 'Imagine you hear on the news that "inflation is at 6%" – but what does that single number actually represent?',
            decisions: [{ prompt: 'What is the primary purpose of an index number in economics?', options: [
                { text: 'The primary purpose is to measure relative changes in a group of related variables (like', outcome: 'The primary purpose is to measure relative changes in a group of related variables (like prices.' },
                { text: 'to calculate absolute price levels', outcome: 'Not quite — Students often believe that an index number is just a "weighted average of prices" and therefore.', reveals: 'an-index-number-is-just' },
                { text: 'to find the average price of a single good', outcome: 'Not quite — Students often believe that an index number is just a "weighted average of prices" and therefore.', reveals: 'an-index-number-is-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_003', title: 'Construction of Simple Index Numbers: Price and Quantity Relatives',
          scaffold: { problem: 'Calculate the simple aggregative price index and the simple average of price relatives index for the following data (base year 2022.',
            steps: [
            { text: 'Identify the given data: four items with base-year prices (P0) and current-year prices (P1).' },
            { text: 'Compute the simple aggregative price index: sum P0 = 40+25+45+120 = 230; sum P1 = 44+28+50+130 = 252; index.' },
            { text: 'Compute price relatives for each item: Rice = (44/40)×100 = 110; Wheat = (28/25)×100 = 112; Sugar = (50/45)×100.' },
            { text: 'Compute the simple average of these relatives: (110 + 112 + 111.11 + 108.33) / 4 = 441.44 / 4 = 110.36.' },
            { text: 'Interpret: Both indices show about a 9.6% to 10.4% increase in prices overall; the average-of-relatives is slightly.', faded: true, blankAnswer: 'Simple Aggregative Price Index = 109.57; Simple Average.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_004', title: 'Weighted Index Numbers: Need and Methods',
          caseStudy: { intro: 'Imagine you are tracking the monthly expenses of a family in Delhi.',
            decisions: [{ prompt: 'Define weighted index numbers and state the fundamental limitation of simple index numbers that makes weighted indices necessary.', options: [
                { text: 'Weighted index numbers assign explicit weights to items based on their relative', outcome: 'Weighted index numbers assign explicit weights to items based on their relative importance (e.g.' },
                { text: 'weighted indices use more data', outcome: 'Not quite — Students often believe that "weighted index number" refers to a single unique formula, and that the.', reveals: 'weighted-index-number-refers-to' },
                { text: 'weighted index number', outcome: 'Not quite — Students often believe that "weighted index number" refers to a single unique formula, and that the.', reveals: 'weighted-index-number-refers-to' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_005', title: 'Laspeyre\'s Price Index Number: Formula and Calculation',
          scaffold: { problem: '** Calculate Laspeyre\'s Price Index for 2023 with 2018 as base year from the following data:',
            steps: [
            { text: 'Identify base year (2018) and current year (2023). Note that quantities given are for 2018 (q₀).' },
            { text: 'Write the formula: P₀₁ = [Σ(p₁q₀) / Σ(p₀q₀)] × 100.' },
            { text: 'Compute Σ(p₀q₀) = (30×20) + (20×15) + (40×10) + (35×5) = 600 + 300 + 400 + 175 = **1475**.' },
            { text: 'Compute Σ(p₁q₀) = (45×20) + (28×15) + (55×10) + (42×5) = 900 + 420 + 550 + 210 = **2080**.' },
            { text: 'Calculate index = (2080 / 1475) × 100 = **141.02**.' },
            { text: 'Interpret: The cost of the 2018 basket increased by 41.02% in 2023.', faded: true, blankAnswer: '** 141.02 (Price level rose 41.02% from 2018 to 2023)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_006', title: 'Paasche\'s Price Index Number: Formula and Calculation',
          scaffold: { problem: 'Calculate Paasche\'s Price Index for 2024 with base year 2022 using the following data for a household\'s monthly consumption:',
            steps: [
            { text: 'Identify the given values for each commodity: p₀ (2022 price), p₁ (2024 price), q₁ (2024 quantity).' },
            { text: 'Recall Paasche\'s formula: Pₚ = (Σp₁q₁ / Σp₀q₁) × 100. Note that both numerator and denominator use current year.' },
            { text: 'Compute p₁q₁ (current year expenditure at current prices) for each item: Wheat: 30 × 20 = 600; Rice: 40 × 15 = 600.' },
            { text: 'Compute p₀q₁ (current year expenditure at base year prices) for each item: Wheat: 25 × 20 = 500; Rice: 35 × 15 = 525.' },
            { text: 'Apply formula: Pₚ = (1700 / 1425) × 100 = 1.19298 × 100 = 119.30 (rounded to 2 decimal places).' },
            { text: 'Interpret: The Paasche Price Index is 119.30, meaning the cost of purchasing the 2024 consumption basket at 2024 prices.', faded: true, blankAnswer: 'Paasche\'s Price Index = 119.30 (19.30% price increase from.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a price index for a project, a student averages the percentage changes (10% + 20% + 30%)/3 = 20% and calls it the index, then says \'Laspeyres and Paasche are equally good — both are weighted averages of prices.\'',
            decisions: [{ prompt: 'What does a real index number require?', options: [
                { text: 'Weight by importance and respect the formulas\' biases: an index measures net relative change in a GROUP versus a base = 100 — a 10% rent rise outweighs a 10% chewing-gum rise, so a plain mean of relatives ignores weights. And the formulas aren\'t interchangeable: Laspeyres\' base-period weights overstate inflation when consumers substitute; Paasche\'s current weights understate it — choice of base, weights and formula shapes the answer.', outcome: 'The index gains meaning: relative change with economic weighting, and a formula choice that\'s a real analytical decision, not a coin toss.' },
                { text: 'Keep the 20% average — an index is just the mean of the item changes.', outcome: 'That discards relative importance: index numbers measure a group\'s net change with weights — treating rent and gum equally isn\'t an index, it\'s an average of ratios.', reveals: 'index-is-plain-average' },
                { text: 'Treat the formulas as equivalent — either weighted average is a valid index.', outcome: 'The weighting period is the whole difference: base vs current weights systematically bias the measure in opposite directions — the choice changes the interpretation.', reveals: 'laspeyres-equals-paasche' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'The base year and the basket are the index — change either and you\'re measuring a different economy.',
            decisions: [{ prompt: 'What comes next? Index Numbers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Index Numbers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_001', difficulty: 'standard',
          question: 'An index number is a statistical measure designed to show the average relative.',
          hint: 'Revisit Class 10 Math Chapter 13 (Mean of Grouped Data - Assumed Mean/Step Deviation.',
          misconception: 'Students often think an index number is just the arithmetic mean of percentage changes of individual items.',
          parts: [
                { id: 'a', prompt: 'Explain why an index number is called a "specialized average" and how it differs from a simple arithmetic mean of price relatives.', answer: 'An index number is a "specialized average"',
                  options: ['An index number is a "specialized average"', 'it\'s just an average of percentages'],
                  hint: 'Revisit Class 10 Math Chapter 13 (Mean of Grouped Data - Assumed Mean/Step Deviation Method) and.',
                  misconception: 'Students often think an index number is just the arithmetic mean of percentage changes of individual items.' },
                { id: 'b', prompt: 'A student calculates the simple average of price relatives for three commodities (A, B, C) and gets 120.', answer: 'The simple average ignores the quantities consumed (weights)',
                  options: ['The simple average ignores the quantities consumed (weights)', 'measures net change in a group of related variables'],
                  hint: 'Revisit Class 10 Math Chapter 13 (Mean of Grouped Data - Assumed Mean/Step Deviation Method) and.',
                  misconception: 'Students often think an index number is just the arithmetic mean of percentage changes of individual items.' }
          ],
            remediations: { 'an-index-number-is-just': { steps: ['If a student equates index number with simple average of percentages: 1.', 'Give a concrete counterexample: "Your family spends ₹20,000 on rent (up 5%) and ₹200 on gum (up 50%).', 'But your actual cost increase is (1000+100)/20200 ≈ 5.4%.', 'Walk through the weighted calculation step-by-step: weight_rent = 20000/20200, weight_gum = 200/20200; index = (105.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_002', difficulty: 'standard',
          question: 'Index numbers are statistical devices designed to measure the relative change.',
          hint: 'If stuck, revisit Class 8 Math percentage increase/decrease (c8_math_ch8_6) and the HDI.',
          misconception: 'Students often believe that an index number is just a "weighted average of prices" and therefore think any weighted.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why we cannot simply average the prices of wheat, cloth, and petrol to understand overall price changes in the economy.', answer: 'Averaging absolute prices is meaningless',
                  options: ['Averaging absolute prices is meaningless', 'we can average them if we convert to same units', 'weighted average of prices', 'any weighted average of prices serves as a valid index'],
                  hint: 'If stuck, revisit Class 8 Math percentage increase/decrease (c8_math_ch8_6) and the HDI example.',
                  misconception: 'Students often believe that an index number is just a "weighted average of prices" and therefore think any weighted average of prices.' },
                { id: 'b', prompt: 'The government revises dearness allowance (DA) for central government employees twice a year.', answer: 'The Consumer Price Index for Industrial Workers (CPI-IW) is used',
                  options: ['The Consumer Price Index for Industrial Workers (CPI-IW) is used', 'weighted average of prices', 'any weighted average of prices serves as a valid index'],
                  hint: 'If stuck, revisit Class 8 Math percentage increase/decrease (c8_math_ch8_6) and the HDI example.',
                  misconception: 'Students often believe that an index number is just a "weighted average of prices" and therefore think any weighted average of prices.' }
          ],
            remediations: { 'an-index-number-is-just': { steps: ['If a student exhibits this misconception, do the following: 1) Present two simple baskets (base year: 10 kg wheat @.', '2) Ask them to compute a "simple weighted average of prices" using base-year quantities as weights (Laspeyres) and then.', '3) Show the two results differ (Laspeyres ≈ 125, Paasche ≈ 122).', '4) Explain that both are "weighted averages of prices" but give different inflation signals – hence an index number.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that an index number is just a "weighted average of prices" and therefore think any weighted.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since the Wholesale Price Index (WPI) covers more commodities than the Consumer Price Index (CPI), WPI is a better measure.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'weighted average of prices', 'any weighted average of prices serves as a valid index'],
                  hint: 'If stuck, revisit Class 8 Math percentage increase/decrease (c8_math_ch8_6) and the HDI example.',
                  misconception: 'Students often believe that an index number is just a "weighted average of prices" and therefore think any weighted average of prices.' }
          ],
            remediations: { 'an-index-number-is-just': { steps: ['If a student exhibits this misconception, do the following: 1) Present two simple baskets (base year: 10 kg wheat @.', '2) Ask them to compute a "simple weighted average of prices" using base-year quantities as weights (Laspeyres) and then.', '3) Show the two results differ (Laspeyres ≈ 125, Paasche ≈ 122).', '4) Explain that both are "weighted averages of prices" but give different inflation signals – hence an index number.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_003', difficulty: 'standard',
          question: 'A simple index number measures the average relative change in a variable (price.',
          hint: 'Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with.',
          misconception: 'Students often believe that the simple aggregative method and the simple average of relatives method always yield the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the simple average of price relatives method might give a different result from the simple aggregative method for the same.', answer: 'The simple aggregative method weights each item by its absolute price level',
                  options: ['The simple aggregative method weights each item by its absolute price level', 'simple', 'unweighted'],
                  hint: 'Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with simple.',
                  misconception: 'Students often believe that the simple aggregative method and the simple average of relatives method always yield the same index number.' },
                { id: 'b', prompt: 'Given the following data for three items, compute the simple aggregative quantity index number for 2024 with 2023 as base year.', answer: 'Step 1: Sum base-year quantities: 10+5+20 = 35 kg',
                  options: ['Step 1: Sum base-year quantities: 10+5+20 = 35 kg', 'simple', 'unweighted'],
                  hint: 'Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with simple.',
                  misconception: 'Students often believe that the simple aggregative method and the simple average of relatives method always yield the same index number.' },
                { id: 'c', prompt: 'Compare the simple aggregative method and the simple average of relatives method in terms of the units of measurement of the items.', answer: 'The simple aggregative method is affected by the units of measurement',
                  options: ['The simple aggregative method is affected by the units of measurement', 'simple', 'unweighted'],
                  hint: 'Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with simple.',
                  misconception: 'Students often believe that the simple aggregative method and the simple average of relatives method always yield the same index number.' }
          ],
            remediations: { 'the-simple-aggregative-method-and': { steps: ['Have the student compute both indices for a dataset with widely varying price levels (e.g., a car and a pencil) and.', 'Ask them to express each item\'s contribution to the total sum in the aggregative method and compare it to its.', 'Guide them to articulate in their own words why the two methods weight items differently.', 'Provide a second dataset where prices are similar and show the indices converge, reinforcing that the divergence stems.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_004', difficulty: 'standard',
          question: 'Weighted index numbers are index numbers in which different items are assigned.',
          hint: 'Revisit the worked examples in node c11_stat_cbse_08_003 (simple index numbers) and the.',
          misconception: 'Students often believe that "weighted index number" refers to a single unique formula, and that the weights are.',
          parts: [
                { id: 'a', prompt: 'Define weighted index numbers and state the fundamental limitation of simple index numbers that makes weighted indices necessary.', answer: 'Weighted index numbers assign explicit weights to items based on their relative',
                  options: ['Weighted index numbers assign explicit weights to items based on their relative', 'weighted indices use more data', 'weighted index number'],
                  hint: 'Revisit the worked examples in node c11_stat_cbse_08_003 (simple index numbers) and the Class 10.',
                  misconception: 'Students often believe that "weighted index number" refers to a single unique formula, and that the weights are arbitrary numbers chosen.' },
                { id: 'b', prompt: 'Compare the weighted aggregative method and the weighted average of price relatives method in terms of (a) the form of weights they naturally accept, and (b).', answer: 'the form of weights they naturally accept, and (',
                  options: ['the form of weights they naturally accept, and (', 'they are the same thing', 'weighted index number'],
                  hint: 'Revisit the worked examples in node c11_stat_cbse_08_003 (simple index numbers) and the Class 10.',
                  misconception: 'Students often believe that "weighted index number" refers to a single unique formula, and that the weights are arbitrary numbers chosen.' }
          ],
            remediations: { 'weighted-index-number-refers-to': { steps: ['If a student holds this misconception, have them compute a simple price index and a weighted index for a 3-item basket.', 'Show how the simple index is swayed by the entertainment price change while the weighted index barely moves.', 'Then ask: "If we double all the weights, does the index change?" (No, because weights are relative).', 'Finally, ask: "Where do the weights 20000, 5000, 500 come from?" (Actual expenditure data).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_005', difficulty: 'standard',
          question: 'Laspeyre\'s Price Index Number is a weighted aggregative index that measures the.',
          hint: 'Review "Weighted Index Numbers: Need and Methods" (c11_stat_cbse_08_004) and practice.',
          misconception: '**Specific Error:** Students use **current-year quantities (q₁)** instead of base-year quantities (q₀) in the numerator.',
          parts: [
                { id: 'a', prompt: 'A student calculates Laspeyre\'s index for 3 commodities and gets 125.', answer: '**Correct Answer:** No, the statement is incorrect',
                  options: ['**Correct Answer:** No, the statement is incorrect', 'quantities', '"quantities" without registering the time subscript'],
                  hint: 'Review "Weighted Index Numbers: Need and Methods" (c11_stat_cbse_08_004) and practice computing.',
                  misconception: '**Specific Error:** Students use **current-year quantities (q₁)** instead of base-year quantities (q₀) in the numerator and denominator.' },
                { id: 'b', prompt: 'Given the data below, compute Laspeyre\'s Price Index for 2024 with 2020 as base year.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'quantities', '"quantities" without registering the time subscript'],
                  hint: 'Review "Weighted Index Numbers: Need and Methods" (c11_stat_cbse_08_004) and practice computing.',
                  misconception: '**Specific Error:** Students use **current-year quantities (q₁)** instead of base-year quantities (q₀) in the numerator and denominator.' },
                { id: 'c', prompt: 'Compare Laspeyre\'s and Paasche\'s Price Index Numbers in terms of the weights used.', answer: '**Correct Answer:** Laspeyre\'s uses base-year quantities (q₀) as weights',
                  options: ['**Correct Answer:** Laspeyre\'s uses base-year quantities (q₀) as weights', 'quantities', '"quantities" without registering the time subscript'],
                  hint: 'Review "Weighted Index Numbers: Need and Methods" (c11_stat_cbse_08_004) and practice computing.',
                  misconception: '**Specific Error:** Students use **current-year quantities (q₁)** instead of base-year quantities (q₀) in the numerator and denominator.' }
          ],
            remediations: { 'specific-error-students-use-current': { steps: ['**Highlight the subscript:** Write the formula large: Σ(p₁**q₀**)/Σ(p₀**q₀**) × 100.', 'Circle **q₀** in both numerator and denominator.', 'Say: "Laspeyre\'s = **L** for **L**ast year\'s quantities (base year)." 2.', '**Column-matching drill:** Give a table with 4 columns: Commodity, p₀, p₁, q₀, q₁.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_006', difficulty: 'standard',
          question: 'Paasche\'s Price Index Number is a weighted aggregative index that measures the.',
          hint: 'Revisit c11_stat_cbse_08_004 (Weighted Index Numbers: Need and Methods) to review the.',
          misconception: 'Students frequently **swap q₀ and q₁** when writing the Paasche formula, writing Pₚ = (Σp₁q₀/Σp₀q₀)×100 (which.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Paasche\'s index is said to use "current year weights" and how this differs conceptually from Laspeyre\'s index.', answer: 'Paasche\'s index uses current year quantities (q₁) as weights',
                  options: ['Paasche\'s index uses current year quantities (q₁) as weights', 'both use current quantities', 'Paasche uses base year quantities'],
                  hint: 'Revisit c11_stat_cbse_08_004 (Weighted Index Numbers: Need and Methods) to review the concept.',
                  misconception: 'Students frequently **swap q₀ and q₁** when writing the Paasche formula, writing Pₚ = (Σp₁q₀/Σp₀q₀)×100 (which is actually Laspeyre\'s).' }
          ],
            remediations: { 'students-frequently-swap-q-and': { steps: ['** Ask the student to write both formulas from memory side-by-side. **', '** Circle the quantity symbol in each (q₀ vs q₁) and ask: "Which basket are we pricing in Paasche—the one we bought.', '** Give a 2-commodity numerical example where q₀ ≠ q₁ (e.g., q₀=[10,5], q₁=[8,7]) and have them compute both indices.', '** Use the mnemonic: "P**a**asche = **A**ctual (current) quantities" vs "L**a**speyre = **L**ast year\'s quantities.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
