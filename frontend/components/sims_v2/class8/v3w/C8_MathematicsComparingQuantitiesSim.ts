import type { SimDef } from '../../engine/types';
import C8_MathematicsComparingQuantitiesSim from '../../../simulations/c6_12/C8_MathematicsComparingQuantitiesSim';

/** v3 wrapped master — C8_MathematicsComparingQuantitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicscomparingquantitiessim: SimDef = {
    id: 'v3w_c8_mathematicscomparingquantitiessim',
    title: 'Comparing Quantities',
    subtitle: 'This node covers multi-term ratios with up to four terms, including simplification using.',
    classLevel: 8, subject: 'mathematics', topic: 'Ratios with More Than Two Terms: Multi-Term Ratios',
    chapters: [],
    nodeIds: ['c8_math_ch10_4', 'c8_math_ch8_10', 'c8_math_ch8_11', 'c8_math_ch8_7', 'c8_math_ch10_3', 'c8_math_ch7_10', 'c8_math_ch8_1', 'c8_math_ch8_2', 'c8_math_ch8_3', 'c8_math_ch8_4', 'c8_math_ch8_5', 'c8_math_ch8_6', 'c8_math_ch10_10', 'c8_math_ch10_5', 'c8_math_ch10_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine three friends — Anil, Bina, and Chirag — invest ₹12,000, ₹18,000, and ₹30,000 respectively in a small.', goal: 'Master Comparing Quantities.' },
    discovery: {
        question: 'What is the formula to calculate the discount amount when the marked price and discount percentage are given?',
        options: ['Discount Amount = (Discount Percentage × Marked Price) ÷ 100', 'Discount Amount = (Discount Percentage × Selling Price) ÷ 100', 'discount is always on marked price'],
        answer: 'Discount Amount = (Discount Percentage × Marked Price) ÷ 100',
        hook: 'Students calculate discount percentage on the selling price instead of the marked price.',
    },
    teaching: [
        { title: 'A multi-term ratio compares three or more.', text: 'A multi-term ratio compares three or more quantities of the same kind, written as \\(a:b:c:\\dots\\) where each term represents a relative part.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch10_4', title: 'A multi-term ratio compares three or.',
          scaffold: { problem: 'A school allocates ₹48,000 for prizes in three categories — Academics, Sports, and Arts — in the ratio 5:3:2.',
            steps: [
            { text: 'Identify the given ratio 5:3:2 and the total amount ₹48,000.' },
            { text: 'Find the total number of parts by adding the ratio terms: 5 + 3 + 2 = 10 parts.' },
            { text: 'Calculate the value of one part: ₹48,000 ÷ 10 = ₹4,800.' },
            { text: 'Multiply each ratio term by the value of one part: Academics = 5 × ₹4,800 = ₹24,000; Sports = 3 × ₹4,800 = ₹14,400;.' },
            { text: 'Verify by adding the amounts: ₹24,000 + ₹14,400 + ₹9,600 = ₹48,000. The sum matches the total.', faded: true, blankAnswer: 'Academics ₹24,000, Sports ₹14,400, Arts ₹9,600.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_10', title: 'Simple interest applications involve.',
          scaffold: { problem: 'Arjun takes a loan of ₹80,000 from a bank at 7.5% simple interest per annum to start a small business.',
            steps: [
            { text: 'Identify given values: Principal P = ₹80,000, Rate R = 7.5% per annum, Time = 3 years 4 months.' },
            { text: 'Convert time to years: 4 months = 4/12 year = 1/3 year ≈ 0.3333 years. So T = 3 + 1/3 = 10/3 years (or 3.333... years).' },
            { text: 'Write the simple interest formula: SI = (P × R × T) / 100.' },
            { text: 'Substitute values: SI = (80000 × 7.5 × 10/3) / 100. Simplify stepwise: 80000 × 7.5 = 600,000; 600,000 × 10/3 =.' },
            { text: 'Find total Amount A = P + SI = 80,000 + 20,000 = ₹100,000. Verify: Interest per year = 80,000 × 7.5% = 6,000.', faded: true, blankAnswer: '₹1,00,000 (one lakh rupees)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_11', title: 'Discount is a reduction offered on the.',
          scaffold: { problem: 'A bookstore marks a novel at ₹350. During a weekend sale, they offer a 12% discount. How much does a customer pay for the novel?',
            steps: [
            { text: 'Identify given values: Marked Price = ₹350, Discount Percentage = 12%. We need to find Selling Price.' },
            { text: 'Recall the formula: Discount Amount = (Discount % × Marked Price) ÷ 100.' },
            { text: 'Calculate Discount Amount = (12 × 350) ÷ 100 = 4200 ÷ 100 = ₹42.' },
            { text: 'Calculate Selling Price = ₹350 - ₹42 = ₹308.' },
            { text: 'Verify: 12% of 350 is 42 (since 10% = 35, 2% = 7, sum = 42). 350 - 42 = 308. Answer is reasonable.', faded: true, blankAnswer: '₹308' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_7', title: 'Profit and loss are financial outcomes.',
          scaffold: { problem: 'A fruit vendor buys 10 kg of apples at ₹120 per kg. He sells them at ₹150 per kg. Find his total profit or loss.',
            steps: [
            { text: 'Identify given values. Cost Price per kg = ₹120, Selling Price per kg = ₹150, Quantity = 10 kg.' },
            { text: 'Calculate total Cost Price (CP) and total Selling Price (SP). Total CP = 10 × ₹120 = ₹1,200.' },
            { text: 'Compare SP and CP. Since ₹1,500 > ₹1,200, there is a profit.' },
            { text: 'Apply profit formula: Profit = Total SP - Total CP = ₹1,500 - ₹1,200 = ₹300.' },
            { text: 'State answer with units. The vendor makes a profit of ₹300.', faded: true, blankAnswer: 'Profit of ₹300' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_3', title: 'Calculating actual distances from map.',
          scaffold: { problem: 'On a map of Rajasthan with RF 1 : 2,000,000, the distance between Jaipur and Jodhpur measures 3.6 cm.',
            steps: [
            { text: 'Identify given values: RF = 1 : 2,000,000, map distance = 3.6 cm. Required: actual distance in km.' },
            { text: 'Write the proportion: map distance / actual distance = 1 / 2,000,000.' },
            { text: 'Multiply: 3.6 × 2,000,000 = 7,200,000 cm. (3.6 × 2 = 7.2; append six zeros → 7,200,000)' },
            { text: 'Convert cm to km: 1 km = 100,000 cm. Divide 7,200,000 by 100,000 = 72 km. (Cancel five zeros: 7,200,000 / 100,000 = 72)' },
            { text: 'Interpret: The actual straight-line distance between Jaipur and Jodhpur on this map scale is 72 km.', faded: true, blankAnswer: '72 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_10', title: 'When an image is scaled (enlarged or.',
          scaffold: { problem: 'A school\'s rectangular notice board is 120 cm wide and 80 cm tall.',
            steps: [
            { text: 'Identify given values: original width w₁ = 120 cm, original height h₁ = 80 cm, new width w₂ = 45 cm.' },
            { text: 'Check if similarity is required — "same shape" means the two rectangles must be similar, so aspect ratio must be.' },
            { text: 'Set up the proportion: 120/80 = 45/h₂. Simplify left side: 120/80 = 12/8 = 3/2. So 3/2 = 45/h₂.' },
            { text: 'Solve by cross-multiplication: 3 × h₂ = 2 × 45 → 3h₂ = 90 → h₂ = 90/3 = 30.' },
            { text: 'Verify: new dimensions 45 cm × 30 cm give ratio 45/30 = 3/2, matching original 3/2. Units are cm. Answer: 30 cm.', faded: true, blankAnswer: '30 cm' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch8_10', title: 'Identify each idea',
          dissect: { specimen: 'Comparing Quantities', spots: [
            { id: 's1', label: 'A multi-term ratio compares three', prompt: 'Which idea is this? — A multi-term ratio compares three or more quantities of the same kind, written as.', answer: 'A multi-term ratio compares three', options: ['A multi-term ratio compares three', 'Simple interest applications involve using', 'Discount is a reduction offered', 'Profit and loss are financial'] },
            { id: 's2', label: 'Simple interest applications involve using', prompt: 'Which idea is this? — Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times.', answer: 'Simple interest applications involve using', options: ['Simple interest applications involve using', 'A multi-term ratio compares three', 'Discount is a reduction offered', 'Profit and loss are financial'] },
            { id: 's3', label: 'Discount is a reduction offered', prompt: 'Which idea is this? — Discount is a reduction offered on the marked price (list price) of an item, expressed as.', answer: 'Discount is a reduction offered', options: ['Discount is a reduction offered', 'A multi-term ratio compares three', 'Simple interest applications involve using', 'Profit and loss are financial'] },
            { id: 's4', label: 'Profit and loss are financial', prompt: 'Which idea is this? — Profit and loss are financial outcomes determined by comparing the Selling Price (SP) of.', answer: 'Profit and loss are financial', options: ['Profit and loss are financial', 'A multi-term ratio compares three', 'Simple interest applications involve using', 'Discount is a reduction offered'] },
            { id: 's5', label: 'Calculating actual distances from map', prompt: 'Which idea is this? — Calculating actual distances from map scales uses the Representative Fraction (RF) or.', answer: 'Calculating actual distances from map', options: ['Calculating actual distances from map', 'A multi-term ratio compares three', 'Simple interest applications involve using', 'Discount is a reduction offered'] },
            { id: 's6', label: 'When an image is scaled', prompt: 'Which idea is this? — When an image is scaled (enlarged or reduced), its width-to-height ratio (aspect ratio).', answer: 'When an image is scaled', options: ['When an image is scaled', 'A multi-term ratio compares three', 'Simple interest applications involve using', 'Discount is a reduction offered'] }
          ] } }
    ],
    explore: { component: C8_MathematicsComparingQuantitiesSim, prompt: 'Explore the interactive — Comparing Quantities' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch10_4', difficulty: 'standard',
          question: 'A multi-term ratio compares three or more quantities of the same kind, written.',
          hint: 'Revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) and c7_math_ch11_002 (HCF) to.',
          misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A multi-term ratio compares three or more quantities of the same kind, written as',
                  options: ['A multi-term ratio compares three or more quantities of the same kind, written as', 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'Discount is a reduction offered on the marked price (list price) of an item, expressed as', 'Profit and loss are financial outcomes determined by comparing the Selling Price (SP) of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially (e.g., for 12:18:30,.' }
          ],
            remediations: { 'students-often-try-to-simplify': { steps: ['If a student simplifies pairwise, write the three terms vertically and circle the common factors of all three numbers.', 'Ask: "What number divides 12, 18, and 30 exactly?" Guide them to find HCF = 6.', 'Then show: 12÷6=2, 18÷6=3, 30÷6=5 → 2:3:5.', 'Emphasise: "One division step for all terms." Practice with 2-3 more examples where pairwise cancellation gives a.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially.',
          parts: [
                { id: 'a', prompt: 'A recipe for fruit punch uses apple, orange, and mango juice in the ratio 3:2:1.', answer: 'Mango = 1 part = 150 mL → 1 part = 150 mL',
                  options: ['Mango = 1 part = 150 mL → 1 part = 150 mL', 'orange runs out first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially (e.g., for 12:18:30,.' }
          ],
            remediations: { 'students-often-try-to-simplify': { steps: ['If a student simplifies pairwise, write the three terms vertically and circle the common factors of all three numbers.', 'Ask: "What number divides 12, 18, and 30 exactly?" Guide them to find HCF = 6.', 'Then show: 12÷6=2, 18÷6=3, 30÷6=5 → 2:3:5.', 'Emphasise: "One division step for all terms." Practice with 2-3 more examples where pairwise cancellation gives a.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_10', difficulty: 'standard',
          question: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R.',
          hint: 'Revisit c8_math_ch8_9 (Simple Interest: Formula and Calculation) and c8_math_ch8_3.',
          misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times',
                  options: ['Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'A multi-term ratio compares three or more quantities of the same kind, written as', 'Discount is a reduction offered on the marked price (list price) of an item, expressed as', 'Profit and loss are financial outcomes determined by comparing the Selling Price (SP) of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead of T=0.5) OR they.' }
          ],
            remediations: { 'students-often-use-the-time': { steps: ['If a student uses months directly as years: Ask "What does \'per annum\' mean?', 'If you keep money for 6 months, is that a full year?" Guide them to write "6 months = 6/12 year = 0.5 year" before.', 'If they forget /100: Ask "Is 6% equal to 6 or 0.06?" Show that \\(6\\% = \\frac{6}{100}\\), so the formula has /100 built.', 'Have them redo the problem writing the rate as a fraction \\(\\frac{R}{100}\\) to see the 100 in the denominator.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_11', difficulty: 'standard',
          question: 'Discount is a reduction offered on the marked price (list price) of an item,.',
          hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15%.',
          misconception: 'Students calculate discount percentage on the selling price instead of the marked price.',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the discount amount when the marked price and discount percentage are given?', answer: 'Discount Amount = (Discount Percentage × Marked Price) ÷ 100',
                  options: ['Discount Amount = (Discount Percentage × Marked Price) ÷ 100', 'Discount Amount = (Discount Percentage × Selling Price) ÷ 100', 'discount is always on marked price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'b', prompt: 'A shirt has a marked price of ₹800 and is sold at a discount of 15%. The shopkeeper says the discount amount is ₹120.', answer: '10% of ₹800 is ₹80, so 15% is ₹80 + ₹40 = ₹120',
                  options: ['10% of ₹800 is ₹80, so 15% is ₹80 + ₹40 = ₹120', 'discount is always on marked price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'c', prompt: 'A pair of shoes is marked at ₹1,200. During a sale, a discount of 25% is offered. Calculate the selling price of the shoes.', answer: 'Step 1: Marked Price = ₹1,200, Discount % = 25%',
                  options: ['Step 1: Marked Price = ₹1,200, Discount % = 25%', 'discount is always on marked price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' }
          ],
            remediations: { 'students-calculate-discount-percentage-on': { steps: ['Write "Discount % = (Discount Amount ÷ Marked Price) × 100" on a card.', 'Give 5 practice problems where only marked price and selling price are given.', 'For each, force the student to: (1) circle the marked price, (2) write "Base = Marked Price" below it, (3) compute.', 'Repeat until they automatically identify the base.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students calculate discount percentage on the selling price instead of the marked price.',
          parts: [
                { id: 'a', prompt: 'A student solved this problem: "A toy marked at ₹600 is sold for ₹540. Find the discount percentage." Their working: Discount = 600 - 540 = 60.', answer: 'Incorrect',
                  options: ['Incorrect', 'percentage of what', 'discount is always on marked price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'b', prompt: 'Create a real-life word problem where a customer buys two different items with different marked prices and different discount percentages, but the discount.', answer: 'Example: Item 1: Marked Price = ₹1,000, Discount = 20% → Discount Amount = ₹200',
                  options: ['Example: Item 1: Marked Price = ₹1,000, Discount = 20% → Discount Amount = ₹200', 'discount is always on marked price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' }
          ],
            remediations: { 'students-calculate-discount-percentage-on': { steps: ['Write "Discount % = (Discount Amount ÷ Marked Price) × 100" on a card.', 'Give 5 practice problems where only marked price and selling price are given.', 'For each, force the student to: (1) circle the marked price, (2) write "Base = Marked Price" below it, (3) compute.', 'Repeat until they automatically identify the base.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_7', difficulty: 'standard',
          question: 'Profit and loss are financial outcomes determined by comparing the Selling.',
          hint: 'If stuck, revisit subtraction of decimals (c6_math_ch04_046) and the concept of.',
          misconception: 'Students often write "Profit = CP - SP" or "Loss = SP - CP", reversing the subtraction order.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Profit and loss are financial outcomes determined by comparing the Selling Price (SP) of',
                  options: ['Profit and loss are financial outcomes determined by comparing the Selling Price (SP) of', 'A multi-term ratio compares three or more quantities of the same kind, written as', 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'Discount is a reduction offered on the marked price (list price) of an item, expressed as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "Profit = CP - SP" or "Loss = SP - CP", reversing the subtraction order.' }
          ],
            remediations: { 'students-often-write-profit-cp': { steps: ['Have the student physically model the transaction with play money: "You are the shopkeeper.', 'Take ₹500 (your cost) from the drawer.', 'Now a customer gives you ₹450.', 'Count what\'s left in the drawer.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'standard',
          question: 'Calculating actual distances from map scales uses the Representative Fraction.',
          hint: 'Revisit decimal multiplication (c7_math_ch12_002) and metric conversion ladder.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'Two maps show the same region. Map A has RF 1 : 100,000. Map B has RF 1 : 200,000. On Map A, a road measures 5 cm. On Map B, the same road measures 2.5 cm.', answer: 'The product of map distance and RF denominator is invariant',
                  options: ['Correct answer: The product of map distance and RF denominator is invariant', 'because the scales are different', 'because 5 cm is double 2.5 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "Map scale 1 : 50,000. Map distance = 8 cm. Find actual distance in metres." Their working: 8 × 50,000 = 400,000 cm.', answer: 'Correct evaluation: Yes, the method and answer are correct',
                  options: ['Correct evaluation: Yes, the method and answer are correct', 'incorrect because you should divide by 1000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' },
                { id: 'b', prompt: 'Two maps show the same region. Map A has RF 1 : 100,000. Map B has RF 1 : 200,000. On Map A, a road measures 5 cm. On Map B, the same road measures 2.5 cm.', answer: 'The product of map distance and RF denominator is invariant',
                  options: ['Correct answer: The product of map distance and RF denominator is invariant', 'because the scales are different', 'because 5 cm is double 2.5 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'standard',
          question: 'When an image is scaled (enlarged or reduced), its width-to-height ratio.',
          hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A rectangular image has width 18 cm and height 12 cm. What is its width-to-height ratio in simplest form?', answer: 'The ratio is 18:12',
                  options: ['The ratio is 18:12', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Riya has a 10 cm × 6 cm photo. She wants to enlarge it to a width of 25 cm.', answer: 'The original aspect ratio is 10:6 = 5:3',
                  options: ['The original aspect ratio is 10:6 = 5:3', 'adding keeps the shape the same', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'c', prompt: 'A movie poster is 60 cm wide and 90 cm tall. You want to make a smaller version with a height of 30 cm for a brochure.', answer: 'Step 1: Original ratio = width/height = 60/90 = 2/3',
                  options: ['Step 1: Original ratio = width/height = 60/90 = 2/3', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles on.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension by.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "A 4 cm × 6 cm image is scaled to a width of 10 cm. Find the new height." Their working: 4/6 = 10/h → 4h = 60 → h = 15.', answer: 'The answer 15 cm is incorrect',
                  options: ['The answer 15 cm is incorrect', 'change', 'an error'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Create a real-world problem (Indian context) where a student must scale an image while preserving similarity, and the scale factor is NOT a whole number.', answer: 'Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall',
                  options: ['Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles on.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension by.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
