import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch08_p2: SimDef = {
    id: 'v3_c8_math_ch08_p2',
    title: 'Fractions in Disguise · Part 2/2',
    subtitle: 'Fractions in a \'per hundred\' disguise',
    classLevel: 8, subject: 'mathematics', topic: 'Fractions in Disguise · Part 2/2',
    chapters: ['c8_math_ch08'],
    nodeIds: ['c8_math_ch8_4', 'c8_math_ch8_5', 'c8_math_ch8_6', 'c8_math_ch8_7', 'c8_math_ch8_8', 'c8_math_ch8_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fair-comparison referee', intro: 'Test scores, sale boards, juice bottles — the world keeps handing you fractions with different bottoms. Percentages flatten them all onto one ruler of 100. Learn to use it.', goal: 'Understand percentage as \'per hundred\' (x% = x/100) — a common base for comparing fractions and ratios — and avoid the decimal-vs-percent trap.' },
    discovery: {
        question: 'You score 36/50, your friend scores 72/100. Who actually did better — and how do you compare two different \'out of\' scores fairly?',
        options: ['It\'s a tie — scale 36/50 to 72/100 and both are 72 per hundred; that\'s what a percentage IS', 'Your friend — 72 is bigger than 36', 'You — 36 out of 50 looks harder', 'Impossible to compare different denominators'],
        answer: 'It\'s a tie — scale 36/50 to 72/100 and both are 72 per hundred; that\'s what a percentage IS',
        hook: 'The % symbol isn\'t a label like \'kg\' — it\'s an instruction: divide by 100. That\'s why 0.6 is 60%, not 0.6%. Once every score sits on the same 100-base, comparing discounts, marks and juice content becomes trivial.',
    },
    teaching: [
        { title: 'Finding Percentage of a Given Quantity', text: 'Finding the percentage of a given quantity means calculating the part of the quantity that corresponds to a given percentage value, using the relationship that "per cent" means "per hundred".', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch8_4', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Put everything on the 100-grid: convert 30-out-of-40 attendance, decode a \'12% real juice\' label, catch Rahul writing 0.6% for 3/5 — and explain why a shop\'s \'50% off\' is a relative cut, not ₹50 off.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_4', title: 'Finding Percentage of a Given Quantity',
          scaffold: { problem: 'A school has 800 students. On a particular day, 15% of the students were absent. How many students were present that day?',
            steps: [
            { text: 'Identify the given quantity (total students = 800) and the percentage to find (15% absent).' },
            { text: 'Convert 15% to a fraction: 15% = 15/100. Simplify if possible: 15/100 = 3/20.' },
            { text: 'Multiply the fraction by the total quantity: Number absent = (3/20) × 800.' },
            { text: 'Compute: (3 × 800) / 20 = 2400 / 20 = 120. So 120 students were absent.' },
            { text: 'Find present students: Total - Absent = 800 - 120 = 680. Answer with units: 680 students.', faded: true, blankAnswer: '680 students' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_5', title: 'Expressing One Quantity as a Percentage of Another',
          scaffold: { problem: 'In a class of 48 students, 36 students passed the Mathematics exam. What percentage of the class passed? What percentage failed?',
            steps: [
            { text: 'Identify the whole = total students = 48. The part for "passed" = 36 students.' },
            { text: 'Write the fraction for passed = 36/48. Simplify by dividing numerator and denominator by 12: 36/48 = 3/4.' },
            { text: 'Convert to percentage: (3/4) × 100% = 3 × 25% = 75%.' },
            { text: 'For failed: part = 48 - 36 = 12 students. Fraction = 12/48 = 1/4. Percentage = (1/4) × 100% = 25%.' },
            { text: 'Verify: 75% + 25% = 100%, which makes sense as every student either passed or failed.', faded: true, blankAnswer: '75% passed, 25% failed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_6', title: 'Percentage Increase and Decrease',
          scaffold: { problem: 'The price of a bicycle was ₹3,000 last year. This year the price increased to ₹3,300. What is the percentage increase in the price?',
            steps: [
            { text: 'Identify the original value (₹3,000) and the new value (₹3,300).' },
            { text: 'Calculate the absolute increase: Increase = New Value - Original Value = 3,300 - 3,000 = ₹300.' },
            { text: 'Write the increase as a fraction of the original value: Increase / Original Value = 300 / 3,000.' },
            { text: 'Convert the fraction to a percentage by multiplying by 100: (300 / 3,000) × 100 = (1/10) × 100 = 10%.' },
            { text: 'Interpret the result: The price increased by 10% compared to last year\'s price.', faded: true, blankAnswer: '10%' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_7', title: 'Profit and Loss: Basic Concepts and Formula',
          scaffold: { problem: 'A fruit vendor buys 10 kg of apples at ₹120 per kg. He sells them at ₹150 per kg. Find his total profit or loss.',
            steps: [
            { text: 'Identify given values. Cost Price per kg = ₹120, Selling Price per kg = ₹150, Quantity = 10 kg.' },
            { text: 'Calculate total Cost Price (CP) and total Selling Price (SP). Total CP = 10 × ₹120 = ₹1,200.' },
            { text: 'Compare SP and CP. Since ₹1,500 > ₹1,200, there is a profit.' },
            { text: 'Apply profit formula: Profit = Total SP - Total CP = ₹1,500 - ₹1,200 = ₹300.' },
            { text: 'State answer with units. The vendor makes a profit of ₹300.', faded: true, blankAnswer: 'Profit of ₹300' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_8', title: 'Calculating Profit Percentage and Loss Percentage',
          scaffold: { problem: 'A fruit vendor buys 50 kg of apples at ₹80 per kg. He spends ₹200 on transportation. He sells the apples at ₹100 per kg.',
            steps: [
            { text: 'Calculate total cost price: Cost of apples = 50 × 80 = ₹4,000. Add transportation: Total CP = 4000 + 200 = ₹4,200.' },
            { text: 'Calculate total selling price: SP = 50 × 100 = ₹5,000.' },
            { text: 'Determine profit: Profit = SP – CP = 5000 – 4200 = ₹800.' },
            { text: 'Calculate profit percentage: Profit% = (Profit / CP) × 100 = (800 / 4200) × 100.' },
            { text: 'Simplify: 800/4200 = 8/42 = 4/21. (4/21) × 100 = 400/21 ≈ 19.05%.', faded: true, blankAnswer: 'Profit% ≈ 19.05%' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_9', title: 'Simple Interest: Formula and Calculation',
          scaffold: { problem: 'Meena borrows ₹25,000 from a bank at 9% per annum simple interest. She repays the loan after 3 years and 4 months.',
            steps: [
            { text: 'Identify given values: P = ₹25,000, R = 9% p.a., T = 3 years 4 months = 3 + 4/12 = 3 + 1/3 = 10/3 years.' },
            { text: 'Write the formula for Simple Interest: SI = (P × R × T) / 100.' },
            { text: 'Substitute values: SI = (25000 × 9 × 10/3) / 100.' },
            { text: 'Simplify stepwise: SI = (25000 × 9 × 10) / (3 × 100) = (25000 × 90) / 300 = 2250000 / 300 = ₹7,500.' },
            { text: 'Calculate Amount = Principal + SI = ₹25,000 + ₹7,500 = ₹32,500. Verify: Yearly interest = (25000 × 9)/100 = ₹2,250.', faded: true, blankAnswer: '₹32,500' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch8_9', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch8_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Sana scored 36 out of 50 on a quiz; her friend in another section scored 40 out of 80. Comparing mark sheets, Sana converts hers: \'36/50 = 0.72, so I got 0.72% — my friend must have done far better.\'',
            decisions: [{ prompt: 'Where does her comparison go wrong?', options: [
                { text: '0.72 is a decimal, not a percentage — % means \'per hundred\', so she must rescale to 72/100 = 72%. Her friend\'s 40/80 = 50/100 = 50%. On the common base of 100, Sana actually scored far higher.', outcome: 'This applies the definition of % as a shared denominator of 100 — the whole point of percentages is comparing different wholes fairly.' },
                { text: 'Sana is right — a decimal answer like 0.72 can be written straight as 0.72% since they are the same number.', outcome: '0.72% means 0.72/100, a hundred times smaller than 0.72; sticking % on a decimal shrinks it by two places.', reveals: 'decimal-is-percent' },
                { text: 'Neither score can be compared at all — percentages only work when both tests are already out of 100.', outcome: 'Comparing unlike totals is exactly what percentages are for: rescaling any fraction to 100 makes 36/50 and 40/80 comparable.', reveals: 'percent-needs-100-total' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch8_9', title: 'You made it',
          caseStudy: { intro: 'A percentage is a fraction wearing a standard uniform — out of 100. It exists because comparing 36/50 to 72/100 is painful, but 72% to 72% is instant.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch8_4', difficulty: 'standard',
          question: 'Finding the percentage of a given quantity means calculating the part of the.',
          hint: 'Revisit c8_math_ch8_3 (converting percentages to fractions/decimals) and c6_math_ch03_035.',
          misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical expression for finding 15% of 80 kg?', answer: 'The expression is (15/100) × 80 kg or 0.15 × 80 kg',
                  options: ['The expression is (15/100) × 80 kg or 0.15 × 80 kg', 'per cent'],
                  hint: 'Revisit c8_math_ch8_3 (converting percentages to fractions/decimals) and c6_math_ch03_035.',
                  misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 = 3000 instead.' }
          ],
            remediations: { 'students-often-treat-the-percentage': { steps: ['If a student makes this error, have them rewrite the percentage as a fraction over 100 every single time for a week.', 'Say: "Write 15% as 15/100.', 'Now read it: \'15 per 100\'.', 'So 15/100 × 200." Do 5 problems daily where step 1 is mandatory: "Write percentage as fraction/decimal".'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200.',
          parts: [
                { id: 'a', prompt: 'A student solved "Find 40% of 250" as follows: 40% = 40/100 = 2/5, then 2/5 of 250 = 2 × 50 = 100. Is this correct? Justify.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'you must use 40/100'],
                  hint: 'Revisit c8_math_ch8_3 (converting percentages to fractions/decimals) and c6_math_ch03_035.',
                  misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 = 3000 instead.' }
          ],
            remediations: { 'students-often-treat-the-percentage': { steps: ['If a student makes this error, have them rewrite the percentage as a fraction over 100 every single time for a week.', 'Say: "Write 15% as 15/100.', 'Now read it: \'15 per 100\'.', 'So 15/100 × 200." Do 5 problems daily where step 1 is mandatory: "Write percentage as fraction/decimal".'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_5', difficulty: 'standard',
          question: 'Expressing one quantity as a percentage of another means finding what fraction.',
          hint: 'Review c8_math_ch8_2 (expressing fractions as percentages) and c6_math_ch04_045.',
          misconception: 'Students consistently reverse the part and whole in the fraction, calculating (whole/part) × 100% instead.',
          parts: [
                { id: 'a', prompt: 'Compare: 18 kg as a percentage of 60 kg, and 18 g as a percentage of 60 g. Are the percentages equal? Explain without calculating both fully.', answer: 'Yes, the percentages are equal (both 30%)',
                  options: ['Yes, the percentages are equal (both 30%)', 'kg is bigger than g'],
                  hint: 'Review c8_math_ch8_2 (expressing fractions as percentages) and c6_math_ch04_045 (converting.',
                  misconception: 'Students consistently reverse the part and whole in the fraction, calculating (whole/part) × 100% instead of (part/whole) × 100%.' }
          ],
            remediations: { 'students-consistently-reverse-the-part': { steps: ['Have the student identify in words: "Which quantity is the part? Which is the whole?"', 'Write the fraction as (part)/(whole) in words first, then with numbers.', 'Check units: "Are both in the same unit? If not, convert the larger unit to the smaller one."', 'Only then multiply by 100%. Practice with 5 problems where the part is smaller than the whole, then 3 where the part.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_6', difficulty: 'standard',
          question: 'Percentage increase is the change in a quantity expressed as a percentage.',
          hint: 'If stuck, revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and.',
          misconception: 'Students consistently use the new value (the value after change) as the denominator when calculating percentage.',
          parts: [
                { id: 'a', prompt: 'A shirt\'s price is increased by 20% and then decreased by 20%. Does the final price equal the original price? If not, which is higher and why?', answer: 'No, the final price is lower than the original',
                  options: ['No, the final price is lower than the original', 'yes, it returns to original'],
                  hint: 'If stuck, revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and c8_math_ch8_3.',
                  misconception: 'Students consistently use the new value (the value after change) as the denominator when calculating percentage increase/decrease, instead.' }
          ],
            remediations: { 'students-consistently-use-the-new': { steps: ['Draw a bar model: represent the original value as a full bar (100%).', 'Show the increase as an extra piece added to the bar, making the new bar 100% + increase%.', 'Visually demonstrate that the increase% is a fraction of the *first* bar, not the combined bar.', 'Use the unitary method: "If 125% (original + 25% increase) equals ₹250, then 1% equals ₹250/125 = ₹2, so 100%.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_7', difficulty: 'standard',
          question: 'Profit and loss are financial outcomes determined by comparing the Selling.',
          hint: 'If stuck, revisit subtraction of decimals (c6_math_ch04_046) and the concept.',
          misconception: 'Students often write "Profit = CP - SP" or "Loss = SP - CP", reversing the subtraction order.',
          parts: [
                { id: 'a', prompt: 'Compare these two transactions: (A) CP = ₹500, SP = ₹600; (B) CP = ₹1,000, SP = ₹1,050. Which transaction yields a higher absolute profit?', answer: 'Transaction A: Profit = ₹100',
                  options: ['Transaction A: Profit = ₹100', 'B has higher profit'],
                  hint: 'If stuck, revisit subtraction of decimals (c6_math_ch04_046) and the concept of "difference".',
                  misconception: 'Students often write "Profit = CP - SP" or "Loss = SP - CP", reversing the subtraction order.' }
          ],
            remediations: { 'students-often-write-profit-cp': { steps: ['Have the student physically model the transaction with play money: "You are the shopkeeper.', 'Take ₹500 (your cost) from the drawer.', 'Now a customer gives you ₹450.', 'Count what\'s left in the drawer.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_8', difficulty: 'standard',
          question: 'Profit percentage is the profit expressed as a percentage of the cost price.',
          hint: 'If stuck, revisit "Finding Percentage of a Given Quantity" (c8_math_ch8_4) and practice.',
          misconception: 'Students calculate profit/loss percentage on selling price instead of cost price.',
          parts: [
                { id: 'a', prompt: 'Compare: Item A has CP = ₹200, SP = ₹250. Item B has CP = ₹500, SP = ₹600. Which gives a higher profit percentage?', answer: 'Both give the same profit percentage (25%)',
                  options: ['Both give the same profit percentage (25%)', 'profit is ₹100 vs ₹50'],
                  hint: 'If stuck, revisit "Finding Percentage of a Given Quantity" (c8_math_ch8_4) and practice "what.',
                  misconception: 'Students calculate profit/loss percentage on selling price instead of cost price. For example, if CP = ₹500, SP = ₹600, profit = ₹100.' }
          ],
            remediations: { 'students-calculate-profit-loss-percentage': { steps: ['If a student uses selling price as base, draw a number line: mark CP at 0, SP at +profit.', 'Ask: "The profit grew FROM the cost price.', 'So the base is where we started." For overheads, use a concrete example: "You buy a phone for ₹10,000, spend ₹500 on.', 'If you sell for ₹11,000, is your profit ₹1,000 or ₹500?" Make them list all money spent before selling.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_9', difficulty: 'standard',
          question: 'Simple Interest is the extra money paid or earned on a principal amount for.',
          hint: 'If stuck, revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and.',
          misconception: 'Students treat the annual rate as a decimal (e.g., 8% as 0.08) but still divide by 100 in the formula, effectively.',
          parts: [
                { id: 'a', prompt: 'Explain why the simple interest earned in the 1st year and the 5th year on the same principal at the same rate is exactly the same.', answer: 'Simple interest is calculated only on the original principal every year',
                  options: ['Simple interest is calculated only on the original principal every year', 'money grows'],
                  hint: 'If stuck, revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and c7_math_ch04_009.',
                  misconception: 'Students treat the annual rate as a decimal (e.g., 8% as 0.08) but still divide by 100 in the formula, effectively dividing by 100 twice.' }
          ],
            remediations: { 'students-treat-the-annual-rate': { steps: ['Ask the student to read the rate aloud: "8 percent" and write it as 8/100.', 'Show that (P × 8/100 × T) = (P × 8 × T)/100 — the /100 is already inside the rate conversion.', 'Give two side-by-side calculations: one with R=8 using formula /100, one with R=0.08 without /100, proving they give.', 'Practice 5 problems where rate is given as percentage, decimal, and fraction (e.g., 6%, 0.06, 6/100) requiring the.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
