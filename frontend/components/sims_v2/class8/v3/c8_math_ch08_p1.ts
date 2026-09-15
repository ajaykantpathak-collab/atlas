import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch08_p1: SimDef = {
    id: 'v3_c8_math_ch08_p1',
    title: 'Fractions in Disguise · Part 1/2',
    subtitle: 'Fractions in a \'per hundred\' disguise',
    classLevel: 8, subject: 'mathematics', topic: 'Fractions in Disguise · Part 1/2',
    chapters: ['c8_math_ch08'],
    nodeIds: ['c8_math_ch8_1', 'c8_math_ch8_10', 'c8_math_ch8_11', 'c8_math_ch8_12', 'c8_math_ch8_2', 'c8_math_ch8_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fair-comparison referee', intro: 'Test scores, sale boards, juice bottles — the world keeps handing you fractions with different bottoms. Percentages flatten them all onto one ruler of 100. Learn to use it.', goal: 'Understand percentage as \'per hundred\' (x% = x/100) — a common base for comparing fractions and ratios — and avoid the decimal-vs-percent trap.' },
    discovery: {
        question: 'You score 36/50, your friend scores 72/100. Who actually did better — and how do you compare two different \'out of\' scores fairly?',
        options: ['It\'s a tie — scale 36/50 to 72/100 and both are 72 per hundred; that\'s what a percentage IS', 'Your friend — 72 is bigger than 36', 'You — 36 out of 50 looks harder', 'Impossible to compare different denominators'],
        answer: 'It\'s a tie — scale 36/50 to 72/100 and both are 72 per hundred; that\'s what a percentage IS',
        hook: 'The % symbol isn\'t a label like \'kg\' — it\'s an instruction: divide by 100. That\'s why 0.6 is 60%, not 0.6%. Once every score sits on the same 100-base, comparing discounts, marks and juice content becomes trivial.',
    },
    teaching: [
        { title: 'Percentages: Definition and Meaning (per cent = per hundred)', text: 'Percentage is a way of expressing a number as a fraction of 100. The symbol % means "per hundred", so x% = x/100.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch8_1', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Put everything on the 100-grid: convert 30-out-of-40 attendance, decode a \'12% real juice\' label, catch Rahul writing 0.6% for 3/5 — and explain why a shop\'s \'50% off\' is a relative cut, not ₹50 off.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'case', nodeId: 'c8_math_ch8_1', title: 'Percentages: Definition and Meaning (per cent = per hundred)',
          caseStudy: { intro: 'Imagine you and your friend take different tests: you score 36 out of 50, your friend scores 72 out of 100. Who did better?',
            decisions: [{ prompt: 'What does the symbol % mean? Write the meaning in words and as a mathematical expression.', options: [
                { text: 'The symbol % means "per hundred"', outcome: 'The symbol % means "per hundred". Mathematically, x% = x/100. For example, 25% = 25/100 = 1/4.' },
                { text: '% means divide by 10', outcome: 'Not quite — Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided.', reveals: 'students-treat-as-a-unit' },
                { text: '% is just a label', outcome: 'Not quite — Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided.', reveals: 'students-treat-as-a-unit' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_10', title: 'Applications of Simple Interest in Real Life',
          scaffold: { problem: 'Arjun takes a loan of ₹80,000 from a bank at 7.5% simple interest per annum to start a small business.',
            steps: [
            { text: 'Identify given values: Principal P = ₹80,000, Rate R = 7.5% per annum, Time = 3 years 4 months.' },
            { text: 'Convert time to years: 4 months = 4/12 year = 1/3 year ≈ 0.3333 years. So T = 3 + 1/3 = 10/3 years (or 3.333... years).' },
            { text: 'Write the simple interest formula: SI = (P × R × T) / 100.' },
            { text: 'Substitute values: SI = (80000 × 7.5 × 10/3) / 100. Simplify stepwise: 80000 × 7.5 = 600,000; 600,000 × 10/3.' },
            { text: 'Find total Amount A = P + SI = 80,000 + 20,000 = ₹100,000. Verify: Interest per year = 80,000 × 7.5% = 6,000.', faded: true, blankAnswer: '₹1,00,000 (one lakh rupees)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_11', title: 'Discount: Definition and Calculating Discount Amount',
          scaffold: { problem: 'A bookstore marks a novel at ₹350. During a weekend sale, they offer a 12% discount. How much does a customer pay for the novel?',
            steps: [
            { text: 'Identify given values: Marked Price = ₹350, Discount Percentage = 12%. We need to find Selling Price.' },
            { text: 'Recall the formula: Discount Amount = (Discount % × Marked Price) ÷ 100.' },
            { text: 'Calculate Discount Amount = (12 × 350) ÷ 100 = 4200 ÷ 100 = ₹42.' },
            { text: 'Calculate Selling Price = ₹350 - ₹42 = ₹308.' },
            { text: 'Verify: 12% of 350 is 42 (since 10% = 35, 2% = 7, sum = 42). 350 - 42 = 308. Answer is reasonable.', faded: true, blankAnswer: '₹308' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_12', title: 'Goods and Services Tax (GST): Basic Concept',
          scaffold: { problem: 'Rohan buys a cricket bat with a taxable price of ₹2,500. The GST rate on sports equipment is 12%.',
            steps: [
            { text: 'Identify given values: Taxable Value = ₹2,500, GST Rate = 12%.' },
            { text: 'Recall formula: GST Amount = (GST Rate / 100) × Taxable Value.' },
            { text: 'Substitute: GST Amount = (12 / 100) × 2500 = 0.12 × 2500.' },
            { text: 'Compute: 0.12 × 2500 = 12 × 25 = ₹300. (Alternatively: 12/100 × 2500 = 12 × 25 = 300).' },
            { text: 'Final Price = Taxable Value + GST Amount = 2500 + 300 = ₹2,800.', faded: true, blankAnswer: 'GST Amount = ₹300, Final Price = ₹2,800.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_2', title: 'Expressing Fractions as Percentages',
          scaffold: { problem: 'In a school election, 3 out of 5 students voted for the winning candidate. What percentage of students voted for the winner?',
            steps: [
            { text: 'Identify the fraction representing the part: \\(\\frac{3}{5}\\).' },
            { text: 'Recall the conversion rule: multiply the fraction by 100%.' },
            { text: 'Substitute: \\(\\frac{3}{5} \\times 100\\%\\).' },
            { text: 'Simplify: \\(\\frac{3 \\times 100}{5} = \\frac{300}{5} = 60\\).' },
            { text: 'Add the percent sign and interpret: 60% of students voted for the winner.', faded: true, blankAnswer: '60%' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_3', title: 'Converting Percentages to Fractions and Decimals',
          scaffold: { problem: 'A survey shows that 36% of students in a school of 500 students prefer cricket.',
            steps: [
            { text: 'Write 36% as a fraction over 100: 36/100.' },
            { text: 'Simplify the fraction by dividing numerator and denominator by their HCF (4): 36÷4 / 100÷4 = 9/25.' },
            { text: 'Convert 36% to decimal by dividing 36 by 100: 36 ÷ 100 = 0.36 (shift decimal two places left).' },
            { text: 'Find number of students using fraction: 9/25 of 500 = (9/25) × 500 = 9 × 20 = 180.' },
            { text: 'Verify using decimal: 0.36 × 500 = 180. Both methods give 180 students.', faded: true, blankAnswer: 'Fraction = 9/25, Decimal = 0.36, Number of students = 180' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch8_3', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch8_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Sana scored 36 out of 50 on a quiz; her friend in another section scored 40 out of 80. Comparing mark sheets, Sana converts hers: \'36/50 = 0.72, so I got 0.72% — my friend must have done far better.\'',
            decisions: [{ prompt: 'Where does her comparison go wrong?', options: [
                { text: '0.72 is a decimal, not a percentage — % means \'per hundred\', so she must rescale to 72/100 = 72%. Her friend\'s 40/80 = 50/100 = 50%. On the common base of 100, Sana actually scored far higher.', outcome: 'This applies the definition of % as a shared denominator of 100 — the whole point of percentages is comparing different wholes fairly.' },
                { text: 'Sana is right — a decimal answer like 0.72 can be written straight as 0.72% since they are the same number.', outcome: '0.72% means 0.72/100, a hundred times smaller than 0.72; sticking % on a decimal shrinks it by two places.', reveals: 'decimal-is-percent' },
                { text: 'Neither score can be compared at all — percentages only work when both tests are already out of 100.', outcome: 'Comparing unlike totals is exactly what percentages are for: rescaling any fraction to 100 makes 36/50 and 40/80 comparable.', reveals: 'percent-needs-100-total' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch8_3', title: 'The bigger picture',
          caseStudy: { intro: 'A percentage is a fraction wearing a standard uniform — out of 100. It exists because comparing 36/50 to 72/100 is painful, but 72% to 72% is instant.',
            decisions: [{ prompt: 'What comes next? Fractions in Disguise · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fractions in Disguise · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch8_1', difficulty: 'standard',
          question: 'Percentage is a way of expressing a number as a fraction of 100.',
          hint: 'Revisit equivalent fractions (c6_math_ch03_031) and fraction as division.',
          misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".',
          parts: [
                { id: 'a', prompt: 'What does the symbol % mean? Write the meaning in words and as a mathematical expression.', answer: 'The symbol % means "per hundred"',
                  options: ['The symbol % means "per hundred"', '% means divide by 10', '% is just a label', 'out of 100'],
                  hint: 'Revisit equivalent fractions (c6_math_ch03_031) and fraction as division (c6_math_ch03_040).',
                  misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".' },
                { id: 'b', prompt: 'A shopkeeper says, "This shirt has a 50% discount." A student says, "That means the price becomes half." Is the student correct?', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', '50% means ₹50 off', 'percentage is an absolute amount, not a relative fraction of the whole'],
                  hint: 'Revisit equivalent fractions (c6_math_ch03_031) and fraction as division (c6_math_ch03_040).',
                  misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".' },
                { id: 'c', prompt: 'Compare the two statements: (a) "20% of the students in Class A are girls." (b) "The ratio of girls to boys in Class B is 1:4." Which class has a higher.', answer: 'Class A has 20% girls',
                  options: ['Class A has 20% girls', 'Class B has more'],
                  hint: 'Revisit equivalent fractions (c6_math_ch03_031) and fraction as division (c6_math_ch03_040).',
                  misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".' }
          ],
            remediations: { 'students-treat-as-a-unit': { steps: ['Use a 10×10 grid (100 squares).', 'Shade 1 square → 1/100 = 1%.', 'Shade 25 squares → 25/100 = 25%.', 'Shade 75 squares → 75/100 = 75%.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".',
          parts: [
                { id: 'a', prompt: 'Rahul solved: "Convert 3/5 to percentage." His working: 3/5 = 0.6 = 0.6%. Is his answer correct? If not, identify the error and give the correct percentage.', answer: 'Rahul is incorrect',
                  options: ['Rahul is incorrect', 'Rahul is correct'],
                  hint: 'Revisit equivalent fractions (c6_math_ch03_031) and fraction as division (c6_math_ch03_040).',
                  misconception: 'Students treat % as a unit label (like "cm" or "kg") rather than an operator meaning "divided by 100".' }
          ],
            remediations: { 'students-treat-as-a-unit': { steps: ['Use a 10×10 grid (100 squares).', 'Shade 1 square → 1/100 = 1%.', 'Shade 25 squares → 25/100 = 25%.', 'Shade 75 squares → 75/100 = 75%.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_10', difficulty: 'standard',
          question: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times.',
          hint: 'Revisit c8_math_ch8_9 (Simple Interest: Formula and Calculation) and c8_math_ch8_3.',
          misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead.',
          parts: [
                { id: 'a', prompt: 'Compare the interest earned on ₹10,000 at 8% for 3 years versus ₹12,000 at 6% for 2 years. Which gives more interest, and by how much?', answer: 'Option A: \\(SI_A = \\frac{10000 \\times 8 \\times 3}{100} = ₹2,400\\)',
                  options: ['Option A: \\(SI_A = \\frac{10000 \\times 8 \\times 3}{100} = ₹2,400\\)', 'Option B because 12,000 > 10,000, or miscalculating one SI'],
                  hint: 'Revisit c8_math_ch8_9 (Simple Interest: Formula and Calculation) and c8_math_ch8_3 (Converting.',
                  misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead of T=0.5) OR they.' }
          ],
            remediations: { 'students-often-use-the-time': { steps: ['If a student uses months directly as years: Ask "What does \'per annum\' mean?', 'If you keep money for 6 months, is that a full year?" Guide them to write "6 months = 6/12 year = 0.5 year" before.', 'If they forget /100: Ask "Is 6% equal to 6 or 0.06?" Show that \\(6\\% = \\frac{6}{100}\\), so the formula has /100 built.', 'Have them redo the problem writing the rate as a fraction \\(\\frac{R}{100}\\) to see the 100 in the denominator.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_11', difficulty: 'standard',
          question: 'Discount is a reduction offered on the marked price (list price) of an item.',
          hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15%.',
          misconception: 'Students calculate discount percentage on the selling price instead of the marked price.',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the discount amount when the marked price and discount percentage are given?', answer: 'Discount Amount = (Discount Percentage × Marked Price) ÷ 100',
                  options: ['Discount Amount = (Discount Percentage × Marked Price) ÷ 100', 'Discount Amount = (Discount Percentage × Selling Price) ÷ 100', 'discount is always on marked price'],
                  hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15% of 200?".',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'b', prompt: 'A shirt has a marked price of ₹800 and is sold at a discount of 15%. The shopkeeper says the discount amount is ₹120.', answer: '10% of ₹800 is ₹80, so 15% is ₹80 + ₹40 = ₹120',
                  options: ['10% of ₹800 is ₹80, so 15% is ₹80 + ₹40 = ₹120', 'discount is always on marked price'],
                  hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15% of 200?".',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'c', prompt: 'A pair of shoes is marked at ₹1,200. During a sale, a discount of 25% is offered. Calculate the selling price of the shoes.', answer: 'Step 1: Marked Price = ₹1,200, Discount % = 25%',
                  options: ['Step 1: Marked Price = ₹1,200, Discount % = 25%', 'discount is always on marked price'],
                  hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15% of 200?".',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' },
                { id: 'd', prompt: 'Two shops sell the same bicycle. Shop A marks it at ₹5,000 and offers a 20% discount. Shop B marks it at ₹4,800 and offers a 10% discount.', answer: 'Shop A: Discount = 20% of 5000 = ₹1000, Selling Price = ₹4000',
                  options: ['Shop A: Discount = 20% of 5000 = ₹1000, Selling Price = ₹4000', '10% discount on a lower marked price', 'discount is always on marked price'],
                  hint: 'Revisit c8_math_ch8_4 (Finding Percentage of a Given Quantity) and practice "what is 15% of 200?".',
                  misconception: 'Students calculate discount percentage on the selling price instead of the marked price.' }
          ],
            remediations: { 'students-calculate-discount-percentage-on': { steps: ['Write "Discount % = (Discount Amount ÷ Marked Price) × 100" on a card.', 'Give 5 practice problems where only marked price and selling price are given.', 'For each, force the student to: (1) circle the marked price, (2) write "Base = Marked Price" below it, (3) compute.', 'Repeat until they automatically identify the base.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_12', difficulty: 'standard',
          question: 'Goods and Services Tax (GST) is a single indirect tax levied on the supply.',
          hint: 'Review c8_math_ch8_3 (converting percentages to fractions/decimals) and c8_math_ch8_4.',
          misconception: 'Students often calculate GST on the final price (inclusive of GST) instead of the taxable value.',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the GST amount when the taxable value and GST rate are given?', answer: 'GST Amount = (GST Rate / 100) × Taxable Value',
                  options: ['GST Amount = (GST Rate / 100) × Taxable Value', 'GST = Taxable Value × GST Rate'],
                  hint: 'Review c8_math_ch8_3 (converting percentages to fractions/decimals) and c8_math_ch8_4 (finding.',
                  misconception: 'Students often calculate GST on the final price (inclusive of GST) instead of the taxable value.' },
                { id: 'b', prompt: 'The final price of a toy including 12% GST is ₹560. Compare these two methods to find the taxable value: (A) Divide ₹560 by 1.12.', answer: 'Method A is correct',
                  options: ['Method A is correct', 'base confusion', 'GST is calculated on the final price, a classic "base confusion" error'],
                  hint: 'Review c8_math_ch8_3 (converting percentages to fractions/decimals) and c8_math_ch8_4 (finding.',
                  misconception: 'Students often calculate GST on the final price (inclusive of GST) instead of the taxable value.' }
          ],
            remediations: { 'students-often-calculate-gst-on': { steps: ['Draw a bar model: a bar for taxable value (100%), a smaller bar for GST (18%), combined bar for final price (118%).', 'Label the combined bar with the given final price (₹1,180).', 'Ask "What is 118% equal to?" → ₹1,180.', 'Find 1% (1180 ÷ 118 = 10), then 100% (10 × 100 = ₹1,000).'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_2', difficulty: 'standard',
          question: 'Expressing a fraction as a percentage means converting the fraction to.',
          hint: 'Revisit multiplication of fractions (c6_math_ch03_035) and equivalent fractions.',
          misconception: 'Students often forget to multiply by 100 and simply write the numerator as the percentage if the denominator is 100,.',
          parts: [
                { id: 'a', prompt: 'Why do we multiply a fraction by 100 to convert it to a percentage? Explain using the meaning of "per cent".', answer: '"Per cent" means "per hundred"',
                  options: ['"Per cent" means "per hundred"', 'because the formula says so', 'to make the number bigger'],
                  hint: 'Revisit multiplication of fractions (c6_math_ch03_035) and equivalent fractions (c6_math_ch03_031).',
                  misconception: 'Students often forget to multiply by 100 and simply write the numerator as the percentage if the denominator is 100, or they multiply only.' }
          ],
            remediations: { 'students-often-forget-to-multiply': { steps: ['Draw a rectangle divided into 4 equal columns (representing \\(\\frac{3}{4}\\)).', 'Now divide each column into 25 small squares (total 100 squares).', 'Write \\(\\frac{75}{100} = 75\\%\\).', 'Connect to calculation: \\(\\frac{3}{4} \\times 100 = \\frac{300}{4} = 75\\).'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_3', difficulty: 'standard',
          question: 'A percentage is a fraction with denominator 100. To convert a percentage to.',
          hint: 'If stuck, revisit c6_math_ch03_031 (Equivalent Fractions) for simplification and.',
          misconception: 'Students treat the % symbol as a unit that can be dropped without dividing by 100.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A percentage is a fraction with denominator 100',
                  options: ['A percentage is a fraction with denominator 100', 'Percentage is a way of expressing a number as a fraction of 100', 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'Discount is a reduction offered on the marked price (list price) of an item, expressed as'],
                  hint: 'If stuck, revisit c6_math_ch03_031 (Equivalent Fractions) for simplification and c6_math_ch04_045.',
                  misconception: 'Students treat the % symbol as a unit that can be dropped without dividing by 100.' }
          ],
            remediations: { 'students-treat-the-symbol-as': { steps: ['Have the student write the percentage as a fraction over 100 explicitly: 25% = 25/100, 0.5% = 0.5/100.', 'Then ask "What does the fraction bar mean?" (division).', 'Perform the division: 25 ÷ 100 = 0.25, 0.5 ÷ 100 = 0.005.', 'Use place value language: "dividing by 100 shifts digits two places right".'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
