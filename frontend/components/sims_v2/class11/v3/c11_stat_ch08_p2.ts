import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch08_p2: SimDef = {
    id: 'v3_c11_stat_ch08_p2',
    title: 'Index Numbers · Part 2/2',
    subtitle: 'Learn why inflation\'s headline number is a weighted argument.',
    classLevel: 11, subject: 'statistics', topic: 'Index Numbers · Part 2/2',
    chapters: ['c11_stat_ch08'],
    nodeIds: ['c11_stat_cbse_08_007', 'c11_stat_cbse_08_008', 'c11_stat_cbse_08_009', 'c11_stat_cbse_08_010', 'c11_stat_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist choosing the right basket for the right question', intro: 'Rent up 10%, chewing gum up 10% — a simple average calls them equal; your household budget disagrees.', goal: 'Construct weighted index numbers and select WPI versus CPI by purpose.' },
    discovery: {
        question: 'WPI covers far more commodities than CPI — so it\'s the better inflation measure for the common man?',
        options: ['No — coverage isn\'t relevance; the common man buys the consumer basket, which is exactly what CPI tracks', 'Yes — more commodities means better', 'Yes — wholesale is the real economy', 'No — CPI covers more items actually'],
        answer: 'No — coverage isn\'t relevance; the common man buys the consumer basket, which is exactly what CPI tracks',
        hook: 'An index isn\'t a mean of percentage changes — (10% + 20% + 30%)/3 forgets that a 10% rent rise bites harder than a 10% gum rise; weights carry the meaning.',
    },
    teaching: [
        { title: 'Fisher\'s Ideal Index Number: Formula and Properties', text: 'Fisher\'s Ideal Index Number is a weighted price index calculated as the geometric mean of Laspeyres\' and Paasche\'s price indices, expressed as \\( P_{01} = \\sqrt{P_L \\times P_P} \\times 100 \\), where.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weight a household basket honestly, then defend Laspeyres versus Paasche as different questions — not equal formulas.',
        labels: ['Fisher\'s Ideal Index Number', 'Consumer Price Index (CPI)', 'Wholesale Price Index (WPI)', 'Inflation and Index Numbers', 'Limitations of Index Numbers'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_007', title: 'Fisher\'s Ideal Index Number: Formula and Properties',
          scaffold: { problem: '** The following data shows prices (₹/kg) and quantities (kg) of three food items for a rural household in base year 2020 and current year.',
            steps: [
            { text: 'Identify given data — we have \\( p_0, q_0, p_1, q_1 \\) for 3 commodities.' },
            { text: 'Create a calculation table with columns for each commodity and each required product:' },
            { text: 'Sum each column:' },
            { text: 'Compute Laspeyres and Paasche indices:' },
            { text: 'Compute Fisher\'s Ideal Index as geometric mean:' },
            { text: 'Interpret — Fisher\'s index of 120.06 means prices rose by 20.06% from 2020 to 2024, using a hybrid basket that accounts.', faded: true, blankAnswer: '** Fisher\'s Ideal Price Index = 120.06 (base 2020 = 100).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_008', title: 'Consumer Price Index (CPI): Construction and Use',
          scaffold: { problem: 'The following data relates to the consumption basket of industrial workers in a city for base year 2020 and current year 2024.',
            steps: [
            { text: 'Identify the formula — CPI (Laspeyres) = (Σ p₁q₀ / Σ p₀q₀) × 100.' },
            { text: 'Compute base-year expenditure (p₀q₀) for each commodity: Rice = 35×25 = 875; Wheat = 22×20 = 440; Dal = 80×5 = 400.' },
            { text: 'Compute current-year cost of base basket (p₁q₀): Rice = 45×25 = 1125; Wheat = 28×20 = 560; Dal = 110×5 = 550; Edible.' },
            { text: 'Handle Miscellaneous group: Its weight = 15 means base-year expenditure share = 15% of total.' },
            { text: 'Total Σp₀q₀ = 6358.82; Total Σp₁q₀ = (1125+560+550+560+950+2800) + 1240 = 6545 + 1240 = 7785.' },
            { text: 'CPI = (7785 / 6358.82) × 100 = 122.43. Interpret: Industrial workers need 22.43% more income in 2024 to buy the 2020.', faded: true, blankAnswer: 'CPI (2024, Base 2020=100) = 122.43' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_009', title: 'Wholesale Price Index (WPI): Meaning and Significance',
          caseStudy: { intro: 'Imagine you read a headline: "WPI inflation surges to 14% in March, highest in 10 years." A Class 11 student might wonder: *Does this mean my grocery bill will.',
            decisions: [{ prompt: 'Define Wholesale Price Index (WPI) in one sentence, specifying the stage of transaction and the type of items covered.', options: [
                { text: 'WPI measures the average change in prices of **goods only** (excluding services) at the', outcome: 'WPI measures the average change in prices of **goods only** (excluding services) at the.' },
                { text: 'WPI measures retail price changes for consumers', outcome: 'Not quite — **Misconception**: "WPI and CPI measure the same inflation; WPI is just the old name for CPI.".', reveals: 'misconception-wpi-and-cpi-measure' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_08_010', title: 'Inflation and Index Numbers: Inflation Rate Calculation',
          scaffold: { problem: 'The Consumer Price Index (CPI) for Industrial Workers in India was 126 in January 2022 and 134 in January 2023.',
            steps: [
            { text: 'Identify the base period index (I₀) = 126 (January 2022) and current period index (I₁) = 134 (January 2023).' },
            { text: 'Write the inflation rate formula: Inflation Rate = [(I₁ - I₀) / I₀] × 100.' },
            { text: 'Substitute the values: [(134 - 126) / 126] × 100 = (8 / 126) × 100.' },
            { text: 'Compute the division: 8 ÷ 126 ≈ 0.06349.' },
            { text: 'Multiply by 100 to get percentage: 0.06349 × 100 = 6.349% ≈ 6.35%.', faded: true, blankAnswer: '6.35% (year-on-year CPI inflation for January 2023)' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_011', title: 'Limitations of Index Numbers',
          caseStudy: { intro: 'Imagine you read in the newspaper that "CPI inflation is 5%" but your household expenses feel like they\'ve risen by 15%. Why this gap?',
            decisions: [{ prompt: 'State any three limitations of index numbers as per the NCERT Class 11 curriculum.', options: [
                { text: 'Correct answer: Any three of: (1) Choice of base year bias, (2) Fixed weights not', outcome: 'Correct answer: Any three of: (1) Choice of base year bias, (2) Fixed weights not reflecting.' },
                { text: 'index numbers are difficult to calculate', outcome: 'Not quite — Students believe that **using Fisher\'s Ideal Index eliminates all limitations of index numbers**.', reveals: 'using-fisher-s-ideal-index' },
                { text: 'Fisher\'s index is ideal so it has no limitations', outcome: 'Not quite — Students believe that **using Fisher\'s Ideal Index eliminates all limitations of index numbers**.', reveals: 'using-fisher-s-ideal-index' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a price index for a project, a student averages the percentage changes (10% + 20% + 30%)/3 = 20% and calls it the index, then says \'Laspeyres and Paasche are equally good — both are weighted averages of prices.\'',
            decisions: [{ prompt: 'What does a real index number require?', options: [
                { text: 'Weight by importance and respect the formulas\' biases: an index measures net relative change in a GROUP versus a base = 100 — a 10% rent rise outweighs a 10% chewing-gum rise, so a plain mean of relatives ignores weights. And the formulas aren\'t interchangeable: Laspeyres\' base-period weights overstate inflation when consumers substitute; Paasche\'s current weights understate it — choice of base, weights and formula shapes the answer.', outcome: 'The index gains meaning: relative change with economic weighting, and a formula choice that\'s a real analytical decision, not a coin toss.' },
                { text: 'Keep the 20% average — an index is just the mean of the item changes.', outcome: 'That discards relative importance: index numbers measure a group\'s net change with weights — treating rent and gum equally isn\'t an index, it\'s an average of ratios.', reveals: 'index-is-plain-average' },
                { text: 'Treat the formulas as equivalent — either weighted average is a valid index.', outcome: 'The weighting period is the whole difference: base vs current weights systematically bias the measure in opposite directions — the choice changes the interpretation.', reveals: 'laspeyres-equals-paasche' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'The base year and the basket are the index — change either and you\'re measuring a different economy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_007', difficulty: 'standard',
          question: 'Fisher\'s Ideal Index Number is a weighted price index calculated as the.',
          hint: 'If stuck, revisit c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche).',
          misconception: '**Misconception:** "Fisher\'s Ideal Index is just the average of Laspeyres and Paasche indices, so I can compute it.',
          parts: [
                { id: 'a', prompt: 'Write the formula for Fisher\'s Ideal Price Index using summation notation with \\( p_0, p_1, q_0, q_1 \\) and explain what each symbol represents.', answer: '**Correct answer:** Fisher\'s Ideal Price Index \\( P_{01} = \\sqrt{ \\frac{\\sum p_1',
                  options: ['**Correct answer:** Fisher\'s Ideal Price Index \\( P_{01} = \\sqrt{ \\frac{\\sum p_1', 'average'],
                  hint: 'If stuck, revisit c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche) — practice.',
                  misconception: '**Misconception:** "Fisher\'s Ideal Index is just the average of Laspeyres and Paasche indices, so I can compute it as \\( \\frac{P_L.' },
                { id: 'b', prompt: 'A student calculates Laspeyres index as 130 and Paasche index as 110 for the same data.', answer: '**Correct answer:** No',
                  options: ['**Correct answer:** No', 'yes, 120 is correct'],
                  hint: 'If stuck, revisit c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche) — practice.',
                  misconception: '**Misconception:** "Fisher\'s Ideal Index is just the average of Laspeyres and Paasche indices, so I can compute it as \\( \\frac{P_L.' }
          ],
            remediations: { 'misconception-fisher-s-ideal-index': { steps: ['**Step-by-step remediation:** 1.', '**Confront the error directly:** "You used arithmetic mean.', 'But Fisher explicitly defined his index as the *geometric* mean.', 'Let\'s see why that matters." Show two numbers where AM ≠ GM clearly: e.g., \\( P_L = 144, P_P = 100 \\).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_008', difficulty: 'standard',
          question: 'Consumer Price Index (CPI) is a weighted index number that measures the average.',
          hint: 'Revisit c11_stat_cbse_08_005 (Laspeyres Price Index) — practice 3-4 numerical problems.',
          misconception: 'Students believe CPI measures "general inflation" for the *entire economy* and that a single CPI number applies.',
          parts: [
                { id: 'a', prompt: 'Compare CPI-IW (Industrial Workers) and CPI-AL (Agricultural Labourers) in terms of: (a) commodity basket composition, (b) weight distribution for food group.', answer: 'CPI-IW basket includes more processed foods, transport, education, medical',
                  options: ['CPI-IW basket includes more processed foods, transport, education, medical', 'both measure same inflation', 'difference is only in base year', 'general inflation'],
                  hint: 'Revisit c11_stat_cbse_08_005 (Laspeyres Price Index) — practice 3-4 numerical problems computing.',
                  misconception: 'Students believe CPI measures "general inflation" for the *entire economy* and that a single CPI number applies to everyone.' }
          ],
            remediations: { 'cpi-measures-general-inflation-for': { steps: ['If a student exhibits this misconception: (1) Have them construct *two* mini-CPIs: one for "rural agricultural.', '(2) Ask: "If you spend 50% on rent (up 10%) and 10% on food (up 5%), but CPI weight for rent is 15% and food 45%, does.', '(4) Assign reading: RBI\'s "CPI vs.', 'WPI" FAQ and NSSO 68th Round consumption patterns table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe CPI measures "general inflation" for the *entire economy* and that a single CPI number applies.',
          parts: [
                { id: 'a', prompt: 'A government decides to update CPI weights using a 2023 family budget survey but keeps the base year as 2012 for continuity.', answer: 'The criticism is *partially valid but standard practice*',
                  options: ['The criticism is *partially valid but standard practice*', 'this makes CPI wrong', 'base year and weight year must be same', 'general inflation'],
                  hint: 'Revisit c11_stat_cbse_08_005 (Laspeyres Price Index) — practice 3-4 numerical problems computing.',
                  misconception: 'Students believe CPI measures "general inflation" for the *entire economy* and that a single CPI number applies to everyone.' },
                { id: 'b', prompt: 'Design a mini-CPI for "Class 11 Students in Urban India" with exactly 5 commodity groups.', answer: 'Example: (a) Groups: Tuition/Coaching, Stationery/Books, Transport, Snacks/Food,',
                  options: ['Example: (a) Groups: Tuition/Coaching, Stationery/Books, Transport, Snacks/Food,', 'general inflation', 'If CPI is 6%, my personal expenses rose 6%'],
                  hint: 'Revisit c11_stat_cbse_08_005 (Laspeyres Price Index) — practice 3-4 numerical problems computing.',
                  misconception: 'Students believe CPI measures "general inflation" for the *entire economy* and that a single CPI number applies to everyone.' }
          ],
            remediations: { 'cpi-measures-general-inflation-for': { steps: ['If a student exhibits this misconception: (1) Have them construct *two* mini-CPIs: one for "rural agricultural.', '(2) Ask: "If you spend 50% on rent (up 10%) and 10% on food (up 5%), but CPI weight for rent is 15% and food 45%, does.', '(4) Assign reading: RBI\'s "CPI vs.', 'WPI" FAQ and NSSO 68th Round consumption patterns table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_009', difficulty: 'standard',
          question: 'The Wholesale Price Index (WPI) is a statistical measure that tracks the.',
          hint: 'Revisit the definition of index number, base period, and current period in node.',
          misconception: '**Misconception**: "WPI and CPI measure the same inflation; WPI is just the old name for CPI." **Why it arises**: Both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Wholesale Price Index (WPI) is a statistical measure that tracks the average change',
                  options: ['The Wholesale Price Index (WPI) is a statistical measure that tracks the average change', 'An index number is a statistical measure designed to show the average relative change in', 'Index numbers are statistical devices designed to measure the relative change in a group', 'A simple index number measures the average relative change in a variable (price or'],
                  hint: 'Revisit the definition of index number, base period, and current period in node.',
                  misconception: '**Misconception**: "WPI and CPI measure the same inflation; WPI is just the old name for CPI." **Why it arises**: Both are called "price.' }
          ],
            remediations: { 'misconception-wpi-and-cpi-measure': { steps: ['**Create a side-by-side comparison table** with columns: Parameter | WPI | CPI.', 'Fill rows: Stage (Wholesale vs Retail), Coverage (Goods only vs Goods+Services), Target Group (Producers vs Consumers).', '**Trace a specific commodity** (e.g., cotton): Farm gate price → Wholesale mandi price (WPI) → Yarn mill gate price.', 'Calculate mark-ups at each stage to visualize the wedge.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_010', difficulty: 'standard',
          question: 'Inflation rate is the percentage change in a general price index (such as the.',
          hint: 'Revisit Class 8 Mathematics: Percentage Increase and Decrease (c8_math_ch8_6) and.',
          misconception: 'Students often believe that a higher index number (e.g., CPI = 200 vs CPI = 150) automatically means higher inflation.',
          parts: [
                { id: 'a', prompt: 'The WPI for March 2023 is 140 and for March 2024 is 147. Calculate the annual inflation rate based on WPI.', answer: 'WPI inflation = (147-140)/140 × 100 = 5%',
                  options: ['WPI inflation = (147-140)/140 × 100 = 5%', 'a higher index number (e'],
                  hint: 'Revisit Class 8 Mathematics: Percentage Increase and Decrease (c8_math_ch8_6) and practice with.',
                  misconception: 'Students often believe that a higher index number (e.g., CPI = 200 vs CPI = 150) automatically means higher inflation.' },
                { id: 'b', prompt: 'Compare the following two statements: (A) "The CPI increased from 180 to 190." (B) "The inflation rate is 5.56%." Are they equivalent?', answer: 'Yes, they are equivalent for the same base and current periods',
                  options: ['Yes, they are equivalent for the same base and current periods', 'a higher index number (e'],
                  hint: 'Revisit Class 8 Mathematics: Percentage Increase and Decrease (c8_math_ch8_6) and practice with.',
                  misconception: 'Students often believe that a higher index number (e.g., CPI = 200 vs CPI = 150) automatically means higher inflation.' }
          ],
            remediations: { 'a-higher-index-number-e': { steps: ['Ask the student to calculate the percentage increase from 100 to 110 and from 200 to 210 separately.', 'Point out that the absolute increase is the same (10 points) but the percentage differs because the base changed.', 'Use a simple analogy: a ₹10 increase on a ₹100 item is 10%, but on a ₹200 item it\'s only 5%.', 'Have them practice with varying base indices until they consistently use the base period index as the denominator.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_08_011', difficulty: 'standard',
          question: 'Limitations of index numbers refer to the inherent constraints and potential.',
          hint: 'Revisit c11_stat_cbse_08_005 and c11_stat_cbse_08_006: Re-work the numerical examples.',
          misconception: 'Students believe that **using Fisher\'s Ideal Index eliminates all limitations of index numbers** because it satisfies.',
          parts: [
                { id: 'a', prompt: 'Explain why a Consumer Price Index (CPI) with a base year of 2012 might overstate the true cost-of-living increase for a typical urban household in 2024.', answer: 'Correct answer: The 2012 base year uses consumption weights from 2012',
                  options: ['Correct answer: The 2012 base year uses consumption weights from 2012', 'prices have risen', 'Fisher\'s index is ideal so it has no limitations'],
                  hint: 'Revisit c11_stat_cbse_08_005 and c11_stat_cbse_08_006: Re-work the numerical examples comparing.',
                  misconception: 'Students believe that **using Fisher\'s Ideal Index eliminates all limitations of index numbers** because it satisfies Time Reversal and.' }
          ],
            remediations: { 'using-fisher-s-ideal-index': { steps: ['Ask student to list the 6 limitations from memory.', 'For each, ask "Does Fisher\'s formula fix this?"', 'Show concrete counterexample: Fisher\'s index with 2012 base year still cannot capture 2024 smartphone prices.', 'Create a 2-column table: Column A = Formula Properties (Time Reversal, Factor Reversal, Circular Test), Column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
