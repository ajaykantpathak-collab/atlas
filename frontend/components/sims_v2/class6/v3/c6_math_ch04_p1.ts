import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch04_p1: SimDef = {
    id: 'v3_c6_math_ch04_p1',
    title: 'Decimals · Part 1/2',
    subtitle: 'This node covers the introduction to decimals and their place-value representation.',
    classLevel: 6, subject: 'mathematics', topic: 'Decimals · Part 1/2',
    chapters: ['c6_math_ch04'],
    nodeIds: ['c6_math_ch04_042', 'c6_math_ch04_043', 'c6_math_ch04_044', 'c6_math_ch04_045', 'c6_math_ch04_046', 'c6_math_ch04_047'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a ruler and seen the small lines between the centimetres?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A scoreboard shows two jumps: 0.4 metres and 0.25 metres. A classmate insists 0.25 is the longer jump because 25 is bigger than 4. Settle the argument.',
        options: ['0.4 wins — it means 40 hundredths, while 0.25 is only 25 hundredths', '0.25 wins — more digits after the point always means a bigger number', 'They tie — both are less than one so both are equal', '0.4 wins only because it was written first'],
        answer: '0.4 wins — it means 40 hundredths, while 0.25 is only 25 hundredths',
        hook: 'Digits after the decimal point are not whole numbers — they are tenths and hundredths. Read them as fractions of one, and the mystery of 0.4 beating 0.25 disappears.',
    },
    teaching: [
        { title: 'Introduction to Decimals', text: 'Decimals are a way of writing fractions that have denominators of 10, 100, 1000, and so on, using a decimal point to separate the whole number from the fractional part.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch04_042', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Turn a ruler into a decimal machine — convert millimetres into tenths of a centimetre, then rank three jumps written as decimals.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch04_042', title: 'Introduction to Decimals',
          caseStudy: { intro: 'Have you ever looked at a ruler and seen the small lines between the centimetres?',
            decisions: [{ prompt: 'In the number 5.7, which digit is in the tenths place?', options: [
                { text: 'The digit 7 is in the tenths place', outcome: 'The digit 7 is in the tenths place. If a student answers "5," they are confusing the whole number.' },
                { text: '25 is bigger', outcome: 'Not quite — Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25.', reveals: '0' },
                { text: '0.4 is smaller than 0', outcome: 'Not quite — Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25.', reveals: '0' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_044', title: 'Comparing and Ordering Decimals',
          scaffold: { problem: 'You have ₹12.40, ₹12.05, and ₹12.50. Order them from the smallest amount to the largest.',
            steps: [
            { text: 'Identify the whole number parts: All are 12.' },
            { text: 'Look at the tenths place: 4, 0, and 5.' },
            { text: 'Compare the tenths: 0 is smallest, 4 is next, 5 is largest.' },
            { text: 'Arrange: 12.05 < 12.40 < 12.50.' },
            { text: 'Verify: 05 paise < 40 paise < 50 paise.', faded: true, blankAnswer: '₹12.05, ₹12.40, ₹12.50' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_045', title: 'Converting Fractions to Decimals and Vice Versa',
          scaffold: { problem: 'You bought 3/4 of a kilogram of apples. How much is this in decimal form?',
            steps: [
            { text: 'Identify numerator (3) and denominator (4).' },
            { text: 'Set up the division 3 ÷ 4.' },
            { text: 'Add a decimal point: 3.00 ÷ 4.' },
            { text: '30 ÷ 4 = 7 with remainder 2; 20 ÷ 4 = 5.' },
            { text: 'Result is 0.75 kg.', faded: true, blankAnswer: '0.75 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_046', title: 'Addition and Subtraction of Decimals',
          scaffold: { problem: 'Rahul bought a bottle of milk for ₹45.50 and a packet of biscuits for ₹12.75. What is the total amount he spent?',
            steps: [
            { text: 'Identify amounts: 45.50 and 12.75.' },
            { text: 'Align the decimal points vertically: 45.50 under 12.75.' },
            { text: 'Add the hundredths column: 0 + 5 = 5.' },
            { text: 'Add the tenths column: 5 + 7 = 12 (write 2, carry over 1 to the ones place).' },
            { text: 'Add the ones and tens columns: 5 + 2 + 1 (carry) = 8; 4 + 1 = 5.', faded: true, blankAnswer: '₹58.25' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch04_047', title: 'Multiplication of Decimals',
          caseStudy: { intro: 'Imagine you are at the grocery store buying 3.5 kilograms of rice, and the price is ₹42.50 per kilogram. How do you find the total cost?',
            decisions: [{ prompt: 'What is the first step in multiplying 1.2 by 0.3?', options: [
                { text: 'The first step is to multiply the numbers as if they were whole numbers (12 x 3 = 36)', outcome: 'The first step is to multiply the numbers as if they were whole numbers (12 x 3 = 36).' },
                { text: 'line up the decimal points', outcome: 'Not quite — Students often try to align decimal points vertically as they do in addition.', reveals: 'students-often-try-to-align' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch04_047', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch04_042', title: 'Use it in the wild',
          caseStudy: { intro: 'Two bottles sit on the table — one holds 0.5 litres, the other 0.45 litres. A little brother grabs the second bottle saying, \'45 is bigger than 5, so this one holds more.\'',
            decisions: [{ prompt: 'Which bottle actually holds more?', options: [
                { text: 'The 0.5 litre bottle — decimals are not whole numbers, and place value settles it: 0.5 is 0.50, which is more than 0.45. The digit after the point is tenths, the next is hundredths, so comparing \'5 versus 45\' mixes up the places and flips the answer.', outcome: 'Writing both to the same number of places — 0.50 versus 0.45 — makes the comparison as easy as 50 versus 45.' },
                { text: 'The brother is right — 45 beats 5, so 0.45 litres is more.', outcome: 'The digits after the point are tenths and hundredths, not whole numbers — 0.45 is forty-five hundredths while 0.5 is fifty hundredths.', reveals: 'more-digits-bigger-decimal' },
                { text: 'The bottles hold the same amount, since both numbers start with zero point something.', outcome: 'The leading zero only says \'less than one\' — the tenths digit decides the size, and 0.5 beats 0.45.', reveals: 'all-decimals-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch04_047', title: 'The bigger picture',
          caseStudy: { intro: 'The decimal point is a divider: wholes on the left, pieces of one on the right. Once you know the places, decimals stop being scary.',
            decisions: [{ prompt: 'What comes next? Decimals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Decimals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch04_042', difficulty: 'standard',
          question: 'Decimals are a way of writing fractions that have denominators of 10, 100.',
          hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
          misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.',
          parts: [
                { id: 'a', prompt: 'In the number 5.7, which digit is in the tenths place?', answer: 'The digit 7 is in the tenths place',
                  options: ['The digit 7 is in the tenths place', '25 is bigger', '0.4 is smaller than 0'],
                  hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
                  misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.' },
                { id: 'b', prompt: 'Explain why 0.5 is the same as the fraction 5/10.', answer: '0.5 means 5 tenths',
                  options: ['0.5 means 5 tenths', 'they are not the same', '25 is bigger', '0.4 is smaller than 0'],
                  hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
                  misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.' },
                { id: 'c', prompt: 'Convert the fraction 24/100 into a decimal.', answer: 'The answer is 0.24',
                  options: ['The answer is 0.24', '25 is bigger', '0.4 is smaller than 0'],
                  hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
                  misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.' }
          ],
            remediations: { '0': { steps: ['Ask the student to draw a square divided into 100 small equal blocks.', 'Shade 4 columns (40 blocks) and ask them to count how many are shaded (40/100 = 0.40).', 'Then shade 25 blocks and ask which area is larger.', 'Visually demonstrating that 4 tenths covers more space than 25 hundredths fixes the place-value confusion.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_042', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.',
          parts: [
                { id: 'a', prompt: 'If you have 8 rupees and 50 paise, how would you write this as a decimal in terms of rupees?', answer: 'It is 8.50 rupees',
                  options: ['It is 8.50 rupees', '25 is bigger', '0.4 is smaller than 0'],
                  hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
                  misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.' },
                { id: 'b', prompt: 'Write your own decimal number that is greater than 0.1 but less than 0.2.', answer: 'Any number like 0.11, 0.15, or 0.19 is correct',
                  options: ['Any number like 0.11, 0.15, or 0.19 is correct', '25 is bigger', '0.4 is smaller than 0'],
                  hint: 'Review the place-value chart for whole numbers (ones, tens, hundreds).',
                  misconception: 'Students often think that 0.4 is smaller than 0.25 because they see "4" and "25" and assume 25 is bigger.' }
          ],
            remediations: { '0': { steps: ['Ask the student to draw a square divided into 100 small equal blocks.', 'Shade 4 columns (40 blocks) and ask them to count how many are shaded (40/100 = 0.40).', 'Then shade 25 blocks and ask which area is larger.', 'Visually demonstrating that 4 tenths covers more space than 25 hundredths fixes the place-value confusion.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_043', difficulty: 'standard',
          question: 'Place value in decimals is an extension of the whole number system, where.',
          hint: 'Review the concept of fractions where the denominator is a multiple of 10.',
          misconception: 'Students often treat the digits to the right of the decimal point as whole numbers, believing that 0.45 is larger than.',
          parts: [
                { id: 'a', prompt: 'Why is the digit 3 in 0.03 worth less than the digit 3 in 0.3?', answer: 'The digit 3 in 0.3 is in the tenths place (3/10), while the 3 in 0.03 is in the',
                  options: ['The digit 3 in 0.3 is in the tenths place (3/10), while the 3 in 0.03 is in the', 'because it is on the right'],
                  hint: 'Review the concept of fractions where the denominator is a multiple of 10.',
                  misconception: 'Students often treat the digits to the right of the decimal point as whole numbers, believing that 0.45 is larger than 0.6 because "45.' }
          ],
            remediations: { 'students-often-treat-the-digits': { steps: ['Direct the student to draw a Place Value Chart including columns for "Tenths (1/10)" and "Hundredths (1/100)." Ask them.', 'Point out that 60 hundredths is clearly larger than 45 hundredths, correcting the whole-number bias.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_044', difficulty: 'standard',
          question: 'Comparing and ordering decimals is the process of determining which decimal.',
          hint: 'Review decimal place value charts.',
          misconception: 'Students often think a longer decimal is always larger (e.g., 0.125 > 0.2) because they treat the decimal part like.',
          parts: [
                { id: 'a', prompt: 'Which is greater: 2.7 or 2.15?', answer: '2.7 is greater',
                  options: ['2.7 is greater', 'a longer decimal is always larger (e'],
                  hint: 'Review decimal place value charts.',
                  misconception: 'Students often think a longer decimal is always larger (e.g., 0.125 > 0.2) because they treat the decimal part like a whole number.' },
                { id: 'b', prompt: 'Order these numbers from least to greatest: 1.2, 1.09, 1.15.', answer: 'The order is 1.09, 1.15, 1.2',
                  options: ['The order is 1.09, 1.15, 1.2', 'a longer decimal is always larger (e'],
                  hint: 'Review decimal place value charts.',
                  misconception: 'Students often think a longer decimal is always larger (e.g., 0.125 > 0.2) because they treat the decimal part like a whole number.' },
                { id: 'c', prompt: 'They are all equal in value. A student who thinks 5.400 is the largest shows they are counting digits instead of comparing the actual value represented by each.', answer: '**Correct Answer:** These numbers are equal in value',
                  options: ['**Correct Answer:** These numbers are equal in value', 'larger', 'a longer decimal is always larger (e'],
                  hint: 'Review decimal place value charts.',
                  misconception: 'Students often think a longer decimal is always larger (e.g., 0.125 > 0.2) because they treat the decimal part like a whole number.' }
          ],
            remediations: { 'a-longer-decimal-is-always': { steps: ['Write both numbers with the same number of digits by adding "placeholder" zeros (e.g., change 0.2 to 0.200).', 'Then, draw a place value table with columns for Ones, Tenths, and Hundredths.', 'Ask the student to fill in the digits and circle the first column from the left where the digits are different; the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_045', difficulty: 'standard',
          question: 'Fractions and decimals are two different ways of writing the same value;.',
          hint: 'Review long division basics, specifically how to add a decimal point and a zero.',
          misconception: 'Students often divide the larger number by the smaller number regardless of whether it is the numerator or the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fractions and decimals are two different ways of writing the same value',
                  options: ['Fractions and decimals are two different ways of writing the same value', 'Decimals are a way of writing fractions that have denominators of 10, 100, 1000, and so', 'Place value in decimals is an extension of the whole number system, where digits to the', 'Comparing and ordering decimals is the process of determining'],
                  hint: 'Review long division basics, specifically how to add a decimal point and a zero to continue.',
                  misconception: 'Students often divide the larger number by the smaller number regardless of whether it is the numerator or the denominator.' }
          ],
            remediations: { 'students-often-divide-the-larger': { steps: ['Remind the student that the numerator is the "part" and the denominator is the "whole." Tell them: "The fraction bar.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_046', difficulty: 'standard',
          question: 'Addition and subtraction of decimals is the process of combining or finding the.',
          hint: 'Review the concept of tenths and hundredths place value.',
          misconception: 'Students often align numbers to the right (like whole numbers) instead of aligning the decimal point.',
          parts: [
                { id: 'a', prompt: 'What is the most important rule to follow when setting up a problem to add 2.45 and 12.3?', answer: 'The decimal points must be aligned vertically',
                  options: ['The decimal points must be aligned vertically', 'adding the last digits first'],
                  hint: 'Review the concept of tenths and hundredths place value.',
                  misconception: 'Students often align numbers to the right (like whole numbers) instead of aligning the decimal point.' }
          ],
            remediations: { 'students-often-align-numbers-to': { steps: ['If a student fails, have them draw a vertical line through the decimal points of both numbers.', 'Tell them: "The decimal point is like a button on a shirt; if you don\'t line up the buttons, the shirt won\'t close.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_047', difficulty: 'standard',
          question: 'Multiplying decimals is a process where two decimal numbers are multiplied.',
          hint: 'Review basic whole number multiplication tables.',
          misconception: 'Students often try to align decimal points vertically as they do in addition.',
          parts: [
                { id: 'a', prompt: '2 x 0.5 = 1.0, while 2 x 5 = 10. The decimal point makes the multiplier "smaller than one," which reduces the total product significantly compared.', answer: '[Correct answer] The product of 2 x 0.5 is 1, while the product of 2 x 5 is 10',
                  options: ['[Correct answer] The product of 2 x 0.5 is 1, while the product of 2 x 5 is 10', 'as the whole number'],
                  hint: 'Review basic whole number multiplication tables.',
                  misconception: 'Students often try to align decimal points vertically as they do in addition.' }
          ],
            remediations: { 'students-often-try-to-align': { steps: ['If a student fails, ask them to write the decimals as fractions first (e.g., 2/10 x 3/10).', 'Show them that 2/10 x 3/10 = 6/100, which is 0.06.', 'This visualizes why the decimal point must move two places instead of one.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
