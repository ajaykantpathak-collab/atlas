import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch03_p2: SimDef = {
    id: 'v3_c7_math_ch03_p2',
    title: 'A Peek Beyond the Point · Part 2/2',
    subtitle: 'Covers finite decimals up to thousandths place, including whole number comparisons and.',
    classLevel: 7, subject: 'mathematics', topic: 'A Peek Beyond the Point · Part 2/2',
    chapters: ['c7_math_ch03'],
    nodeIds: ['c7_math_ch03_007', 'c7_math_ch03_008', 'c7_math_ch03_009', 'c7_math_ch03_010', 'c7_math_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a local stationery shop in India buying notebooks, and you see two gel pens priced.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Your notebook edge lands somewhere between 14 cm and 15 cm — not quite either. Whole numbers just gave up. What rescues the measurement?',
        options: ['Divide one centimetre into 10 equal smaller parts — tenths fill the gap between the whole numbers', 'Round up to 15 and hope nobody checks', 'Use two rulers side by side', 'Declare the notebook unmeasurable'],
        answer: 'Divide one centimetre into 10 equal smaller parts — tenths fill the gap between the whole numbers',
        hook: 'More divisions mean smaller units — a hundredth is tinier than a tenth, not bigger. And 4.2 rupees is 4 whole rupees plus two-tenths of one rupee — 20 paise — not six whole rupees.',
    },
    teaching: [
        { title: 'Comparing and Ordering Decimals', text: 'Comparing and ordering decimals involves determining the relative magnitude of two or more decimal numbers by examining their place values sequentially from left to right, and arranging them.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch03_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Measure a pencil that lands between two marks — split the centimetre into tenths, write the length as a whole plus a fraction, and explain why whole numbers alone could not say it.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_008', title: 'Addition of Decimal Numbers',
          scaffold: { problem: 'Priya went to the market and bought $2.5\\text{ kg}$ of potatoes, $1.75\\text{ kg}$ of tomatoes, and $0.325\\text{ kg}$ of green chillies.',
            steps: [
            { text: 'Identify the given quantities and their units: Potatoes = $2.5\\text{ kg}$, Tomatoes = $1.75\\text{ kg}$, Chillies.' },
            { text: 'Append placeholder zeros so all numbers have the same number of decimal places (three places, matching thousandths).' },
            { text: 'Set up the vertical addition column aligning the decimal points:' },
            { text: 'Add column by column from right to left:' },
            { text: 'Place the decimal point directly aligned with the column, yielding $4.575\\text{ kg}$.', faded: true, blankAnswer: '$4.575\\text{ kg}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_009', title: 'Subtraction of Decimal Numbers',
          scaffold: { problem: 'Aarav went to the vegetable market with ₹100.00. He bought potatoes for ₹37.50 and tomatoes for ₹24.25.',
            steps: [
            { text: 'Identify the total money Aarav started with (₹100.00) and the individual costs (₹37.50 and ₹24.25).' },
            { text: 'Find the total amount spent by adding the two costs using decimal addition: $37.50 + 24.25 = 61.75$.' },
            { text: 'Set up the subtraction problem to find the remaining money: subtract the total spent from the starting amount: $100.00.' },
            { text: 'Align decimal points and annex placeholder zeros if needed: write $100.00$ and $61.75$, then perform column-wise.' },
            { text: 'Compute step by step: hundredths: $10 - 5 = 5$; tenths: $9 - 7 = 2$; ones: $9 - 1 = 8$; tens: $9 - 6 = 3$.', faded: true, blankAnswer: '₹38.25' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_010', title: 'Representing Decimals as Fractions and Vice Versa',
          scaffold: { problem: 'Rahul bought 2.65 litres of milk for his family. Express this quantity as a mixed fraction in its simplest form.',
            steps: [
            { text: 'Separate the whole number part and the decimal part from the given number: $2.65 = 2 + 0.65$.' },
            { text: 'Write the decimal part $0.65$ as a fraction by looking at its place value.' },
            { text: 'Simplify the fraction $\\frac{65}{100}$ by finding the greatest common divisor (GCD) of 65 and 100, which is 5.' },
            { text: 'Combine the whole number with the simplified fraction to write the final mixed fraction: $2 \\frac{13}{20}$.', faded: true, blankAnswer: '$2 \\frac{13}{20}$ litres' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch03_011', title: 'Decimal System and Place Value Relationships',
          caseStudy: { intro: 'Imagine you are at a vegetable market in India buying tomatoes, and the weighing scale shows 3.524 kilograms.',
            decisions: [{ prompt: 'In the decimal number 45.678, what is the exact value represented by the digit 7?', options: [
                { text: '$\\frac{7}{100}$ or $0.07$ (seven hundredths)', outcome: 'The correct answer is $\\frac{7}{100}$ or $0.07$ (seven hundredths).' },
                { text: '0.45 is greater than 0.5', outcome: 'Not quite — Students often assume that place values to the right of the decimal point increase in magnitude.', reveals: 'place-values-to-the-right' }
            ] }] } },
        { type: 'drill', nodeId: 'c7_math_ch03_011', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Measuring a table for a school project, Asha finds the edge lands between 84 cm and 85 cm. Her partner writes \'84 cm\' and says, \'Whole numbers are good enough — just pick the nearer mark.\'',
            decisions: [{ prompt: 'Is whole-number precision acceptable here, and what should they record?', options: [
                { text: 'No — the gap between 84 and 85 cm is real length, so divide that centimetre into 10 equal parts; if the edge sits at the 3rd mark, the true measure is 84 and 3/10 cm (84.3 cm), and the small marks exist exactly for this.', outcome: 'This recognises that measurement is continuous: tenths are smaller units that capture what whole numbers leave out.' },
                { text: 'The partner is right — measurements must always be whole numbers, so rounding to 84 is the only correct answer.', outcome: 'Whole numbers leave gaps between consecutive integers; rounding throws away real information, which is why rulers carry subdivisions.', reveals: 'measure-only-wholes' },
                { text: 'They should write 84.3 as \'84 cm and 3 whole centimetres extra\', since 0.3 means three more full units.', outcome: 'The digit after the decimal is three-tenths of one centimetre, not three whole centimetres — smaller units are parts of a whole, not new wholes.', reveals: 'tenth-is-whole-unit' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch03_011', title: 'You made it',
          caseStudy: { intro: 'The real world lives between the whole numbers. Slice the units finer, and every in-between length finally has a name.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch03_007', difficulty: 'standard',
          question: 'Comparing and ordering decimals involves determining the relative magnitude.',
          hint: 'Review c7_math_ch03_004 to practice reading decimal place values and padding numbers with.',
          misconception: 'Students often ignore place value length and compare decimals as if they were whole numbers based on the digits after.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering decimals involves determining the relative magnitude of two or',
                  options: ['Comparing and ordering decimals involves determining the relative magnitude of two or', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review c7_math_ch03_004 to practice reading decimal place values and padding numbers with trailing.',
                  misconception: 'Students often ignore place value length and compare decimals as if they were whole numbers based on the digits after the decimal point.' }
          ],
            remediations: { 'students-often-ignore-place-value': { steps: ['When a student struggles, stop and have them rewrite all decimal numbers with an equal number of decimal places.', 'Guide them to read the numbers aloud as fractions or place-value names (e.g., read $14.2$ as "14 and 20 hundredths" and.', 'Then have them compare the whole number part first, then the tenths column, then the hundredths column step by step.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_008', difficulty: 'standard',
          question: 'The addition of decimal numbers is the mathematical process of combining two.',
          hint: 'Review c7_math_ch03_004 to practice identifying place values before attempting addition.',
          misconception: 'Students frequently misalign decimal numbers by right-justifying them as if they were whole numbers (treating $12.4.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The addition of decimal numbers is the mathematical process of combining two or more',
                  options: ['The addition of decimal numbers is the mathematical process of combining two or more', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review c7_math_ch03_004 to practice identifying place values before attempting addition.',
                  misconception: 'Students frequently misalign decimal numbers by right-justifying them as if they were whole numbers (treating $12.4 + 3.15$ as $12.4.' }
          ],
            remediations: { 'students-frequently-misalign-decimal-numbers': { steps: ['When a student makes a right-alignment error, have them draw vertical grid lines for each place value column.', 'Physically force them to write the decimal points in the exact same vertical grid column before writing any digits.', 'Remind them: "The decimal point is the anchor; never move the anchor, fill empty spaces with placeholder zeros instead!"'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_009', difficulty: 'standard',
          question: 'Subtraction of decimal numbers is the process of finding the difference between.',
          hint: 'Review c7_math_ch03_004 to master decimal place values and c7_math_ch03_008 for column.',
          misconception: 'Students often align decimals by the right edge (like whole numbers) instead of aligning the decimal points, writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subtraction of decimal numbers is the process of finding the difference between two',
                  options: ['Subtraction of decimal numbers is the process of finding the difference between two', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review c7_math_ch03_004 to master decimal place values and c7_math_ch03_008 for column addition.',
                  misconception: 'Students often align decimals by the right edge (like whole numbers) instead of aligning the decimal points, writing $14.2 - 3.56$ as $14.2.' }
          ],
            remediations: { 'students-often-align-decimals-by': { steps: ['Remind the student to always vertical-align the decimal points like buttons on a shirt.', 'Have them draw a straight guideline down through the decimal points before writing any digits.', 'Next, teach them to fill empty trailing spaces with placeholder zeros so every number has the exact same number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_010', difficulty: 'standard',
          question: 'Representing decimals as fractions and vice versa is the mathematical process.',
          hint: 'Review place value columns in decimals and how to find common factors to simplify.',
          misconception: 'Students often drop trailing zeros or misalign decimal places when converting fractions with powers of 10, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Representing decimals as fractions and vice versa is the mathematical process of',
                  options: ['Representing decimals as fractions and vice versa is the mathematical process of', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review place value columns in decimals and how to find common factors to simplify fractions.',
                  misconception: 'Students often drop trailing zeros or misalign decimal places when converting fractions with powers of 10, or they write the decimal digits.' }
          ],
            remediations: { 'students-often-drop-trailing-zeros': { steps: ['When a student makes this error, guide them back to place value charts.', 'Say: "Let\'s read the decimal aloud using its place value name.', 'Is 0.07 read as \'seven-tenths\' or \'seven-hundredths\'?" Once they answer \'seven-hundredths\', ask: "What number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_011', difficulty: 'standard',
          question: 'The decimal system and place value relationships describe how each position.',
          hint: 'Review c7_math_ch03_004 to reinforce the names and fractional values of decimal place.',
          misconception: 'Students often assume that place values to the right of the decimal point increase in magnitude as the digits get.',
          parts: [
                { id: 'a', prompt: 'In the decimal number 45.678, what is the exact value represented by the digit 7?', answer: '$\\frac{7}{100}$ or $0.07$ (seven hundredths)',
                  options: ['$\\frac{7}{100}$ or $0.07$ (seven hundredths)', '0.45 is greater than 0.5'],
                  hint: 'Review c7_math_ch03_004 to reinforce the names and fractional values of decimal place columns.',
                  misconception: 'Students often assume that place values to the right of the decimal point increase in magnitude as the digits get larger numerically,.' },
                { id: 'b', prompt: 'Analyze the number 88.88. How many times larger is the value of the first 8 (in the tens place) compared to the third 8 (in the tenths place)?', answer: '1,000 times larger',
                  options: ['1,000 times larger', '0.45 is greater than 0.5'],
                  hint: 'Review c7_math_ch03_004 to reinforce the names and fractional values of decimal place columns.',
                  misconception: 'Students often assume that place values to the right of the decimal point increase in magnitude as the digits get larger numerically,.' }
          ],
            remediations: { 'place-values-to-the-right': { steps: ['If a student struggles, stop and draw a place value chart explicitly showing columns for Hundreds, Tens, Ones, .', '(Decimal Point), Tenths ($\\frac{1}{10}$), Hundredths ($\\frac{1}{100}$), and Thousandths ($\\frac{1}{1000}$).', 'Have them physically place digit cards into the chart and point out that moving one column right means dividing by 10.', 'Reinforce this with fraction equivalents (e.g., $0.1 = \\frac{1}{10}$).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that place values to the right of the decimal point increase in magnitude as the digits get.',
          parts: [
                { id: 'a', prompt: 'A student claims that shifting the decimal point of 5.42 one place to the right makes the number 10 times smaller because the digits move closer to the decimal.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '0.45 is greater than 0.5'],
                  hint: 'Review c7_math_ch03_004 to reinforce the names and fractional values of decimal place columns.',
                  misconception: 'Students often assume that place values to the right of the decimal point increase in magnitude as the digits get larger numerically,.' }
          ],
            remediations: { 'place-values-to-the-right': { steps: ['If a student struggles, stop and draw a place value chart explicitly showing columns for Hundreds, Tens, Ones, .', '(Decimal Point), Tenths ($\\frac{1}{10}$), Hundredths ($\\frac{1}{100}$), and Thousandths ($\\frac{1}{1000}$).', 'Have them physically place digit cards into the chart and point out that moving one column right means dividing by 10.', 'Reinforce this with fraction equivalents (e.g., $0.1 = \\frac{1}{10}$).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
