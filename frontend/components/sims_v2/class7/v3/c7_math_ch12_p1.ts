import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch12_p1: SimDef = {
    id: 'v3_c7_math_ch12_p1',
    title: 'Another Peek Beyond the Point · Part 1/2',
    subtitle: 'Covers place value extension to thousandths, decimal representations on number lines, and.',
    classLevel: 7, subject: 'mathematics', topic: 'Another Peek Beyond the Point · Part 1/2',
    chapters: ['c7_math_ch12'],
    nodeIds: ['c7_math_ch12_001', 'c7_math_ch12_002', 'c7_math_ch12_003', 'c7_math_ch12_004', 'c7_math_ch12_005', 'c7_math_ch12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a vegetable market in India buying 2 kilograms and 350 grams of potatoes, and the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student sorts 0.5, 0.45, and 0.512 by peeking at the last digit of each and gets the order wrong. What one move makes decimal sorting foolproof?',
        options: ['Pad every decimal to the same number of places — 0.500, 0.450, 0.512 — then compare like whole numbers', 'Always trust the longest decimal to be biggest', 'Compare only the first digit after the point', 'Sort by the number of digits — fewer means smaller'],
        answer: 'Pad every decimal to the same number of places — 0.500, 0.450, 0.512 — then compare like whole numbers',
        hook: 'Each step right of the decimal point divides by ten — tenths, hundredths, thousandths. In 8.452, the digit 4 is worth 200 times the digit 2. Face value means nothing; place value is everything.',
    },
    teaching: [
        { title: 'Recap of Decimals: Place Value and Representation', text: 'Decimals are an extension of our place value system used to represent numbers smaller than one by utilizing powers of ten in the denominator, separated from the whole number part by a decimal point.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch12_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Turn 5 and 3/8 into a decimal by aiming for a denominator of 1000, then rank three tricky decimals by equalising their decimal places first.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c7_math_ch12_001', title: 'Recap of Decimals: Place Value and Representation',
          caseStudy: { intro: 'Imagine you are at a vegetable market in India buying 2 kilograms and 350 grams of potatoes, and the shopkeeper writes the price tag as ₹45.75.',
            decisions: [{ prompt: 'What is the place value of the digit $7$ in the decimal number $45.278$?', options: [
                { text: 'hundredths (or $\\frac{7}{100}$ or $0.07$)', outcome: 'The correct answer is hundredths (or $\\frac{7}{100}$ or $0.07$).' },
                { text: 'tenths', outcome: 'Not quite — Students often assume that the longer a decimal number is, the larger its value (e.g., believing.', reveals: 'the-longer-a-decimal-number' },
                { text: 'the longer a decimal number is, the larger its value (e', outcome: 'Not quite — Students often assume that the longer a decimal number is, the larger its value (e.g., believing.', reveals: 'the-longer-a-decimal-number' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_002', title: 'Decimal Multiplication: Multiplying by Whole Numbers',
          scaffold: { problem: 'A school cooperative store sells a geometry box for ₹54.50. If a teacher purchases 6 geometry boxes for the classroom, what is the total.',
            steps: [
            { text: 'Identify the given values: cost of one geometry box = ₹54.50, number of boxes = 6.' },
            { text: 'Set up the multiplication expression: $54.50 \\times 6$.' },
            { text: 'Multiply the numbers without the decimal point: $5450 \\times 6$.' },
            { text: 'Count the decimal places in the original decimal factor ($54.50$ has two decimal places).' },
            { text: 'Place the decimal point two places from the right in the product $32700$, resulting in $327.00$, with units in rupees.', faded: true, blankAnswer: '₹327.00' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_003', title: 'Decimal Multiplication: Multiplying Two Decimal Numbers',
          scaffold: { problem: 'Riya buys $3.5 \\text{ metres}$ of ribbon for a craft project. If each metre of ribbon costs ₹12.50, how much total money does Riya pay.',
            steps: [
            { text: 'Identify the given values: length = $3.5 \\text{ m}$ ($1$ decimal place), cost per metre = ₹$12.50$ ($2$ decimal places).' },
            { text: 'Set up the multiplication of the numbers without decimal points: $35 \\times 125$.' },
            { text: 'Perform whole number multiplication: $125 \\times 5 = 625$, and $125 \\times 30 = 3750$. Add them: $3750 + 625 = 4375$.' },
            { text: 'Count the total number of decimal places in the multipliers: $3.5$ has $1$ and $12.50$ has $2$, giving a total of $1.' },
            { text: 'Place the decimal point $3$ places from the right in $4375$, yielding $4.375$, which represents ₹$43.75$ when rounded.', faded: true, blankAnswer: '₹43.75' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_004', title: 'Decimal Division: Dividing by Whole Numbers',
          scaffold: { problem: 'A roll of ribbon is $9.36$ metres long. If Sunita cuts it into $4$ equal pieces for a craft project, what is the length of each piece?',
            steps: [
            { text: 'Identify the given values: Total length = $9.36$ m, Number of pieces = $4$.' },
            { text: 'Set up the long division problem as $9.36 \\div 4$.' },
            { text: 'Divide the whole number part ($9$ ones $\\div 4$): $9 \\div 4 = 2$ with a remainder of $1$.' },
            { text: 'Bring down the tenths digit ($3$) to make $13$ tenths; $13 \\div 4 = 3$ tenths with a remainder of $1$ tenth.' },
            { text: 'Bring down the hundredths digit ($6$) to combine with the remainder, making $16$ hundredths; $16 \\div 4 = 4$.', faded: true, blankAnswer: '2.34 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_005', title: 'Decimal Division: Dividing by Decimal Numbers',
          scaffold: { problem: 'A tailor has a ribbon of length $12.6$ metres. She wants to cut pieces that are $0.3$ metres long. How many pieces of ribbon can she cut?',
            steps: [
            { text: 'Identify the given values: Total length of ribbon (dividend) = $12.6$ m, length of each piece (divisor) = $0.3$ m.' },
            { text: 'Write the division expression as a fraction: $\\frac{12.6}{0.3}$.' },
            { text: 'Multiply both the numerator and the denominator by $10$ to eliminate the decimal point in the divisor: $\\frac{12.6.' },
            { text: 'Perform the whole-number division $126 \\div 3$. Since $12 \\div 3 = 4$ and $6 \\div 3 = 2$, the result is $42$.' },
            { text: 'Verify the result with units: $42 \\text{ pieces} \\times 0.3 \\text{ m/piece} = 12.6 \\text{ m}$, which matches the.', faded: true, blankAnswer: '42 pieces' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_006', title: 'Shifting Decimal Point When Multiplying/Dividing by 10, 100, 1000',
          scaffold: { problem: 'A school ordered $100$ science textbooks, and each textbook weighs $1.25$ kg. What is the total weight of the books in kilograms?',
            steps: [
            { text: 'Identify given information. Weight of one textbook = $1.25$ kg; number of textbooks = $100$.' },
            { text: 'Determine the mathematical operation required. Finding the total weight for multiple items requires multiplication.' },
            { text: 'Count the number of zeros in the multiplier ($100$ has two zeros), which tells us to shift the decimal point two places.' },
            { text: 'Perform the shift algebraically: starting at $1.25$, move the decimal point past $2$ and $5$, resulting in $125$.' },
            { text: 'Verify with units: $1.25 \\text{ kg} \\times 100 = 125 \\text{ kg}$.', faded: true, blankAnswer: '$125 \\text{ kg}$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch12_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A sports-day timer prints three 100 m times: Tara 14.2 s, Zoya 14.05 s, Isha 14.125 s. Handing out medals, a volunteer announces Zoya ran the slowest \'because .05 is the smallest decimal bit — only 5.\'',
            decisions: [{ prompt: 'How should the times really be ordered?', options: [
                { text: 'Pad to thousandths: 14.200, 14.050, 14.125 — so Zoya (14.05) is fastest, then Isha, then Tara. The decimal part is not a whole number; .2 means 2 tenths, i.e. 200 thousandths, far more than 50.', outcome: 'This equalises decimal places before comparing, which is the only reliable way to order decimals of different lengths.' },
                { text: 'The volunteer is right — with fewer digits after the point, 14.05 is plainly the smallest number and the slowest time.', outcome: 'That compares 5 to 200 to 125 as if the digits were whole numbers; the tenths place decides first, and 14.05 has the smallest tenth-digit block.', reveals: 'longer-decimal-bigger' },
                { text: 'Since all three are \'fourteen point something\', the times are tied and medals should be shared equally.', outcome: 'The fractional parts differ by hundredths of a second — exactly what a sprint timer exists to distinguish.', reveals: 'same-whole-same-time' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch12_006', title: 'The bigger picture',
          caseStudy: { intro: 'The decimal point is an anchor — wholes on the left, shrinking pieces on the right. Equalise the places and every comparison turns honest.',
            decisions: [{ prompt: 'What comes next? Another Peek Beyond the Point · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Another Peek Beyond the Point · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch12_001', difficulty: 'standard',
          question: 'Decimals are an extension of our place value system used to represent numbers.',
          hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right.',
          misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater.',
          parts: [
                { id: 'a', prompt: 'What is the place value of the digit $7$ in the decimal number $45.278$?', answer: 'hundredths (or $\\frac{7}{100}$ or $0.07$)',
                  options: ['hundredths (or $\\frac{7}{100}$ or $0.07$)', 'tenths', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of the decimal.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'b', prompt: 'Convert the mixed fraction $5 \\frac{3}{8}$ into a decimal number by finding an equivalent fraction with a denominator of $1,000$.', answer: '$5.375$',
                  options: ['$5.375$', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of the decimal.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'c', prompt: 'Analyze the number $8.452$. How many times larger is the value of the digit $4$ in the tenths place than the value of the digit $2$ in the thousandths place?', answer: '$200$ times larger',
                  options: ['$200$ times larger', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of the decimal.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' }
          ],
            remediations: { 'the-longer-a-decimal-number': { steps: ['Remind the student to pad shorter decimals with zeros on the right so that every number being compared has the same.', 'Ask them: "Which is larger, $500$ parts out of $1,000$ or $452$ parts out of $1,000$?" Emphasize that we always compare.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following student statement: "To order the decimals $0.5, 0.45$, and $0.512$ from least to greatest, I just look at the last digit, so the order.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of the decimal.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'b', prompt: 'Create a decimal number that satisfies all three conditions: (1) It has three decimal places, (2) The digit in the hundredths place is twice the digit in the.', answer: 'An expected correct answer is $4.521$ (since digits are $4, 5, 2, 1$',
                  options: ['An expected correct answer is $4.521$ (since digits are $4, 5, 2, 1$', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of the decimal.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' }
          ],
            remediations: { 'the-longer-a-decimal-number': { steps: ['Remind the student to pad shorter decimals with zeros on the right so that every number being compared has the same.', 'Ask them: "Which is larger, $500$ parts out of $1,000$ or $452$ parts out of $1,000$?" Emphasize that we always compare.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_002', difficulty: 'standard',
          question: 'Multiplying a decimal number by a whole number involves multiplying the numbers.',
          hint: 'Review whole number multiplication algorithms and place value expansion from Class 6.',
          misconception: 'Students often align the decimal points vertically as they do in addition and subtraction, or they miscount the total.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying a decimal number by a whole number involves multiplying the numbers as if',
                  options: ['Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying two decimal numbers involves multiplying their whole number values as if no', 'Decimal division by a whole number is the process of splitting a decimal quantity into a'],
                  hint: 'Review whole number multiplication algorithms and place value expansion from Class 6.',
                  misconception: 'Students often align the decimal points vertically as they do in addition and subtraction, or they miscount the total number of decimal.' }
          ],
            remediations: { 'students-often-align-the-decimal': { steps: ['Remind the student to ignore the decimal point initially and perform standard whole-number multiplication: write $125.', 'Next, instruct them to count the exact number of digits to the right of the decimal point in the original decimal.', 'Finally, have them start from the rightmost digit of the product and count back that exact number of places to insert.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_003', difficulty: 'standard',
          question: 'Multiplying two decimal numbers involves multiplying their whole number values.',
          hint: 'Review place value of decimals and whole number multiplication from c6_math_ch04_047.',
          misconception: 'Students often line up the decimal points vertically as they do in addition and subtraction ($1.5 \\times 0.23$ aligned.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying two decimal numbers involves multiplying their whole number values as if no',
                  options: ['Multiplying two decimal numbers involves multiplying their whole number values as if no', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Decimal division by a whole number is the process of splitting a decimal quantity into a'],
                  hint: 'Review place value of decimals and whole number multiplication from c6_math_ch04_047.',
                  misconception: 'Students often line up the decimal points vertically as they do in addition and subtraction ($1.5 \\times 0.23$ aligned at the dot), and.' }
          ],
            remediations: { 'students-often-line-up-the': { steps: ['Remind the student that decimal multiplication is like multiplying fractions where denominators ($10, 100, 1000$).', 'We never line up decimal points for multiplication.', 'First, multiply the numbers ignoring the dots completely.', 'Second, count every single digit that sits behind the decimal point in both numbers combined.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_004', difficulty: 'standard',
          question: 'Decimal division by a whole number is the process of splitting a decimal.',
          hint: 'Review c7_math_ch12_001 to solidify decimal place value before attempting division.',
          misconception: 'Students frequently misplace the decimal point in the quotient when the whole number part of the dividend is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decimal division by a whole number is the process of splitting a decimal quantity into a',
                  options: ['Decimal division by a whole number is the process of splitting a decimal quantity into a', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review c7_math_ch12_001 to solidify decimal place value before attempting division.',
                  misconception: 'Students frequently misplace the decimal point in the quotient when the whole number part of the dividend is smaller than the divisor.' }
          ],
            remediations: { 'students-frequently-misplace-the-decimal': { steps: ['If a student misplaces the decimal point, pause and ask them to estimate the answer first using whole numbers or bounds.', 'No, so our answer must be less than $1$.").', 'Guide them to write a $0$ in the ones place before looking at the tenths column, and mandate checking every division.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_005', difficulty: 'standard',
          question: 'Dividing a decimal number by another decimal number involves converting the.',
          hint: 'Review c7_math_ch12_001 to practice shifting decimal points when multiplying by powers.',
          misconception: 'Students often shift the decimal point in the divisor to make it a whole number but forget to shift the decimal point.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dividing a decimal number by another decimal number involves converting the divisor into',
                  options: ['Dividing a decimal number by another decimal number involves converting the divisor into', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review c7_math_ch12_001 to practice shifting decimal points when multiplying by powers of 10.',
                  misconception: 'Students often shift the decimal point in the divisor to make it a whole number but forget to shift the decimal point in the dividend.' }
          ],
            remediations: { 'students-often-shift-the-decimal': { steps: ['If a student makes this error, guide them back to fraction notation.', 'Ask them to write the division as a fraction: $\\frac{4.5}{0.2}$.', 'Remind them of the golden rule of fractions: whatever you multiply the denominator by to clear the decimal, you MUST.', 'Say: "If we multiply the bottom by $10$ to make it $2$, we must multiply the top by $10$ to make it $45$.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_006', difficulty: 'standard',
          question: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point.',
          hint: 'Review place value columns (tenths, hundredths, thousandths) and how each position is 10.',
          misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by',
                  options: ['Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Decimals are an extension of our place value system used to represent numbers smaller', 'Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying two decimal numbers involves multiplying their whole number values as if no'],
                  hint: 'Review place value columns (tenths, hundredths, thousandths) and how each position is 10 times.',
                  misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when trailing or leading.' }
          ],
            remediations: { 'students-often-miscount-the-number': { steps: ['If a student struggles with shift direction or adding place holders, have them physically write the number on squared.', 'Instruct them: "For multiplication (making the number bigger), slide your finger to the right by as many jumps as there.', 'For division (making the number smaller), slide your finger to the left.', 'If you run out of digits while jumping, fill the empty grid boxes with zeros."'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
