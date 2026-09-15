import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch12_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch12_p2: SimDef = {
    id: 'v3_c7_math_ch12_p2',
    title: 'Another Peek Beyond the Point · Part 2/2',
    subtitle: 'Covers estimation through rounding (nearest whole number, tenth, hundredth, or front-end.',
    classLevel: 7, subject: 'mathematics', topic: 'Another Peek Beyond the Point · Part 2/2',
    chapters: ['c7_math_ch12'],
    nodeIds: ['c7_math_ch12_007', 'c7_math_ch12_008', 'c7_math_ch12_009', 'c7_math_ch12_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are buying 3.8 kilograms of potatoes at ₹24.50 per kg, and the vegetable vendor asks for ₹205.00.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student sorts 0.5, 0.45, and 0.512 by peeking at the last digit of each and gets the order wrong. What one move makes decimal sorting foolproof?',
        options: ['Pad every decimal to the same number of places — 0.500, 0.450, 0.512 — then compare like whole numbers', 'Always trust the longest decimal to be biggest', 'Compare only the first digit after the point', 'Sort by the number of digits — fewer means smaller'],
        answer: 'Pad every decimal to the same number of places — 0.500, 0.450, 0.512 — then compare like whole numbers',
        hook: 'Each step right of the decimal point divides by ten — tenths, hundredths, thousandths. In 8.452, the digit 4 is worth 200 times the digit 2. Face value means nothing; place value is everything.',
    },
    teaching: [
        { title: 'Estimation and Verification in Decimal Operations', text: 'Estimation and verification in decimal operations involve rounding numbers before calculating to predict an approximate result (estimation) and using reverse operations or alternative methods.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch12_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Turn 5 and 3/8 into a decimal by aiming for a denominator of 1000, then rank three tricky decimals by equalising their decimal places first.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_007', title: 'Estimation and Verification in Decimal Operations',
          scaffold: { problem: 'Sunita buys 4.7 kg of apples at ₹82.50 per kg. She calculates the total cost as ₹3,877.50.',
            steps: [
            { text: 'Identify given values and goal. Quantity = 4.7 kg, Price per kg = ₹82.50. Calculated Total = ₹3,877.50.' },
            { text: 'Round each decimal to a convenient whole number for estimation. 4.7 rounds up to 5 kg.' },
            { text: 'Perform exact calculation to find the true product. $4.7 \\times 82.50$: First compute $47 \\times 825 = 38,775$.' },
            { text: 'Compare exact calculation ($38.775$) with estimate ($\\text{₹}400$).' },
            { text: 'Verify using inverse operation (division). Divide exact total by quantity: $38.775 \\div 4.7 = 82.50$, confirming the.', faded: true, blankAnswer: 'The correct total cost is ₹38.78 (or ₹38.775), and Sunita\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_008', title: 'Word Problems Involving Decimal Multiplication and Division',
          scaffold: { problem: 'A container holds $12.5\\text{ litres}$ of mustard oil. If $1\\text{ litre}$ of oil has a mass of $0.92\\text{ kg}$, what is the total mass.',
            steps: [
            { text: 'Identify given values: Volume of oil = $12.5\\text{ litres}$, Mass of $1\\text{ litre}$ = $0.92\\text{ kg}$.' },
            { text: 'Determine operation: To find the total mass, multiply the volume by the mass per litre ($12.5 \\times 0.92$).' },
            { text: 'Perform multiplication ignoring decimals: $125 \\times 92$.' },
            { text: 'Count total decimal places: $12.5$ has $1$ decimal place and $0.92$ has $2$ decimal places, total = $3$ decimal places.' },
            { text: 'Interpret the result with units: The total mass is $11.5\\text{ kg}$.', faded: true, blankAnswer: '$11.5\\text{ kg}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_009', title: 'Converting Between Fractions and Decimals in Operations',
          scaffold: { problem: 'Riya bought $1\\frac{3}{4}$ metres of red ribbon and $2.5$ metres of blue ribbon for a school craft project.',
            steps: [
            { text: 'Identify the given lengths: red ribbon = $1\\frac{3}{4}$ m, blue ribbon = $2.5$ m.' },
            { text: 'Choose the target format: convert the mixed fraction $1\\frac{3}{4}$ into a decimal to match the blue ribbon\'s format.' },
            { text: 'Convert the fractional part $\\frac{3}{4}$ by multiplying numerator and denominator by $25$, giving $\\frac{75}{100}.' },
            { text: 'Set up the addition expression for total length: $1.75 + 2.50$.' },
            { text: 'Compute the sum: $1.75 + 2.50 = 4.25$ metres with proper alignment of decimal points.', faded: true, blankAnswer: '4.25 metres' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch12_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A sports-day timer prints three 100 m times: Tara 14.2 s, Zoya 14.05 s, Isha 14.125 s. Handing out medals, a volunteer announces Zoya ran the slowest \'because .05 is the smallest decimal bit — only 5.\'',
            decisions: [{ prompt: 'How should the times really be ordered?', options: [
                { text: 'Pad to thousandths: 14.200, 14.050, 14.125 — so Zoya (14.05) is fastest, then Isha, then Tara. The decimal part is not a whole number; .2 means 2 tenths, i.e. 200 thousandths, far more than 50.', outcome: 'This equalises decimal places before comparing, which is the only reliable way to order decimals of different lengths.' },
                { text: 'The volunteer is right — with fewer digits after the point, 14.05 is plainly the smallest number and the slowest time.', outcome: 'That compares 5 to 200 to 125 as if the digits were whole numbers; the tenths place decides first, and 14.05 has the smallest tenth-digit block.', reveals: 'longer-decimal-bigger' },
                { text: 'Since all three are \'fourteen point something\', the times are tied and medals should be shared equally.', outcome: 'The fractional parts differ by hundredths of a second — exactly what a sprint timer exists to distinguish.', reveals: 'same-whole-same-time' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch12_010', title: 'You made it',
          caseStudy: { intro: 'The decimal point is an anchor — wholes on the left, shrinking pieces on the right. Equalise the places and every comparison turns honest.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch12_007', difficulty: 'standard',
          question: 'Estimation and verification in decimal operations involve rounding numbers.',
          hint: 'Review rounding decimals (c6_math_ch04_050) and basic decimal multiplication placement.',
          misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Estimation and verification in decimal operations involve rounding numbers before',
                  options: ['Estimation and verification in decimal operations involve rounding numbers before', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review rounding decimals (c6_math_ch04_050) and basic decimal multiplication placement rules.',
                  misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity check.' }
          ],
            remediations: { 'students-frequently-misplace-the-decimal': { steps: ['Stop the student immediately when an unreasonable number is written down.', 'Say: "Let\'s pause and estimate first before looking at all the digits.', 'What whole numbers are these decimals closest to?" Guide them to round each factor to the nearest whole number (e.g.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_008', difficulty: 'standard',
          question: 'Solving word problems involving decimal multiplication and division requires.',
          hint: 'Review decimal place value and decimal multiplication/division rules in c7_math_ch12_003.',
          misconception: 'Students often misplace the decimal point during division in word problems because they forget to scale both the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Solving word problems involving decimal multiplication and division requires translating',
                  options: ['Solving word problems involving decimal multiplication and division requires translating', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review decimal place value and decimal multiplication/division rules in c7_math_ch12_003 and.',
                  misconception: 'Students often misplace the decimal point during division in word problems because they forget to scale both the dividend and the divisor.' }
          ],
            remediations: { 'students-often-misplace-the-decimal': { steps: ['Remind the student to always convert the divisor into a whole number first by shifting the decimal point to the right.', 'Count how many decimal places the divisor has, and shift the decimal point in the dividend by the exact same number.', 'Say: "Before you divide, clear the decimal from the number you are dividing *by* (the divisor) by multiplying both.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_009', difficulty: 'standard',
          question: 'Converting between fractions and decimals in operations involves seamlessly.',
          hint: 'Review c6_math_ch04_045 to strengthen basic conversion rules before attempting mixed.',
          misconception: 'Students often convert fractions to decimals incorrectly by dividing the denominator by the numerator instead of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Converting between fractions and decimals in operations involves seamlessly switching',
                  options: ['Converting between fractions and decimals in operations involves seamlessly switching', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review c6_math_ch04_045 to strengthen basic conversion rules before attempting mixed operations.',
                  misconception: 'Students often convert fractions to decimals incorrectly by dividing the denominator by the numerator instead of the numerator by the.' }
          ],
            remediations: { 'students-often-convert-fractions-to': { steps: ['Remind the student of the fraction-as-division rule: the fraction bar always means "divided by,".', 'Show them how to set up long division by adding a decimal point and zeros (e.g., $2.0 \\div 5 = 0.4$).', 'Practice converting simple fractions like $\\frac{1}{2}, \\frac{1}{4}, \\frac{3}{4}$, and $\\frac{1}{5}$ into decimals.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_010', difficulty: 'standard',
          question: 'Checking the reasonableness of answers involves using estimation, place value.',
          hint: 'Review rounding decimals (c6_math_ch04_050) and decimal multiplication/division rules.',
          misconception: 'Students often look only at the digits of a computed decimal answer and completely ignore the place value magnitude.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Checking the reasonableness of answers involves using estimation, place value logic, and',
                  options: ['Checking the reasonableness of answers involves using estimation, place value logic, and', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review rounding decimals (c6_math_ch04_050) and decimal multiplication/division rules.',
                  misconception: 'Students often look only at the digits of a computed decimal answer and completely ignore the place value magnitude, accepting answers like.' }
          ],
            remediations: { 'students-often-look-only-at': { steps: ['Stop the student immediately and guide them through a 3-step anchor routine: 1.', '"Before looking at decimals, round the numbers to simple whole numbers (e.g., $15 \\times 4$).', 'Write down this rough estimate." 2.', '"Ask yourself: should the final answer be bigger or smaller than our starting number?" 3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
