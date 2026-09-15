import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch04_p2: SimDef = {
    id: 'v3_c6_math_ch04_p2',
    title: 'Decimals · Part 2/2',
    subtitle: 'This node covers dividing a decimal by a decimal and a decimal by a whole number.',
    classLevel: 6, subject: 'mathematics', topic: 'Decimals · Part 2/2',
    chapters: ['c6_math_ch04'],
    nodeIds: ['c6_math_ch04_048', 'c6_math_ch04_049', 'c6_math_ch04_050', 'c6_math_ch04_051'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you have 4.5 metres of ribbon and you want to cut it into small pieces that are each 0.5 metres long.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A scoreboard shows two jumps: 0.4 metres and 0.25 metres. A classmate insists 0.25 is the longer jump because 25 is bigger than 4. Settle the argument.',
        options: ['0.4 wins — it means 40 hundredths, while 0.25 is only 25 hundredths', '0.25 wins — more digits after the point always means a bigger number', 'They tie — both are less than one so both are equal', '0.4 wins only because it was written first'],
        answer: '0.4 wins — it means 40 hundredths, while 0.25 is only 25 hundredths',
        hook: 'Digits after the decimal point are not whole numbers — they are tenths and hundredths. Read them as fractions of one, and the mystery of 0.4 beating 0.25 disappears.',
    },
    teaching: [
        { title: 'Division of Decimals', text: 'Division of decimals is the process of splitting a decimal number into equal parts, performed by adjusting the divisor into a whole number before dividing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch04_048', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Turn a ruler into a decimal machine — convert millimetres into tenths of a centimetre, then rank three jumps written as decimals.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_048', title: 'Division of Decimals',
          scaffold: { problem: 'A container has 7.5 litres of milk. You want to pour it into bottles that hold 0.25 litres each. How many bottles do you need?',
            steps: [
            { text: 'Identify dividend (7.5) and divisor (0.25).' },
            { text: 'Multiply both by 100 to shift decimals: 7.5 becomes 750, 0.25 becomes 25.' },
            { text: 'Set up the division: 750 ÷ 25.' },
            { text: 'Divide: 75 ÷ 25 = 3, so 750 ÷ 25 = 30.' },
            { text: 'Verify: 30 bottles × 0.25 litres = 7.5 litres.', faded: true, blankAnswer: '30 bottles' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_049', title: 'Decimals in Real Life: Money and Measurement',
          scaffold: { problem: 'Meena has ₹200. She buys a bag of flour for ₹85.75 and a carton of milk for ₹42.50. How much change should she receive?',
            steps: [
            { text: 'Identify the total cost by adding ₹85.75 and ₹42.50.' },
            { text: 'Align the decimals: 85.75 + 42.50.' },
            { text: 'Compute total cost: 5+0=5, 7+5=12 (carry 1), 5+2+1=8, 8+4=12. Total = ₹128.25.' },
            { text: 'Subtract total cost from the budget: 200.00 - 128.25.' },
            { text: 'Perform subtraction by borrowing across the zeros.', faded: true, blankAnswer: '₹71.75' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_050', title: 'Rounding Decimals',
          scaffold: { problem: 'A tailor measures a cloth length as 12.67 metres. Round this to the nearest tenth of a metre.',
            steps: [
            { text: 'Identify the tenths place (6).' },
            { text: 'Identify the digit to the right (7).' },
            { text: 'Compare 7 with the rounding rule (7 > 5).' },
            { text: 'Round up the 6 to 7.' },
            { text: 'Result is 12.7 metres.', faded: true, blankAnswer: '12.7 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch04_051', title: 'Problem Solving with Decimals',
          scaffold: { problem: 'A student buys 3 notebooks at 25.50 rupees each and 2 pens at 12.25 rupees each. How much money did the student spend in total?',
            steps: [
            { text: 'Calculate the cost of 3 notebooks: 3 x 25.50 = 76.50 rupees.' },
            { text: 'Calculate the cost of 2 pens: 2 x 12.25 = 24.50 rupees.' },
            { text: 'Add the two subtotals: 76.50 + 24.50.' },
            { text: 'Align decimals and add: 76.50 + 24.50 = 101.00.', faded: true, blankAnswer: '101.00 rupees' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch04_051', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch04_048', title: 'Use it in the wild',
          caseStudy: { intro: 'Two bottles sit on the table — one holds 0.5 litres, the other 0.45 litres. A little brother grabs the second bottle saying, \'45 is bigger than 5, so this one holds more.\'',
            decisions: [{ prompt: 'Which bottle actually holds more?', options: [
                { text: 'The 0.5 litre bottle — decimals are not whole numbers, and place value settles it: 0.5 is 0.50, which is more than 0.45. The digit after the point is tenths, the next is hundredths, so comparing \'5 versus 45\' mixes up the places and flips the answer.', outcome: 'Writing both to the same number of places — 0.50 versus 0.45 — makes the comparison as easy as 50 versus 45.' },
                { text: 'The brother is right — 45 beats 5, so 0.45 litres is more.', outcome: 'The digits after the point are tenths and hundredths, not whole numbers — 0.45 is forty-five hundredths while 0.5 is fifty hundredths.', reveals: 'more-digits-bigger-decimal' },
                { text: 'The bottles hold the same amount, since both numbers start with zero point something.', outcome: 'The leading zero only says \'less than one\' — the tenths digit decides the size, and 0.5 beats 0.45.', reveals: 'all-decimals-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch04_051', title: 'You made it',
          caseStudy: { intro: 'The decimal point is a divider: wholes on the left, pieces of one on the right. Once you know the places, decimals stop being scary.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch04_048', difficulty: 'standard',
          question: 'Division of decimals is the process of splitting a decimal number into equal.',
          hint: 'Review long division of whole numbers and multiplication of decimals by 10, 100, and 1000.',
          misconception: 'Students often try to "move the decimal" only in the dividend or forget to move it in the dividend after moving it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Division of decimals is the process of splitting a decimal number into equal parts,',
                  options: ['Division of decimals is the process of splitting a decimal number into equal parts,', 'Decimals are a way of writing fractions that have denominators of 10, 100, 1000, and so', 'Place value in decimals is an extension of the whole number system, where digits to the', 'Comparing and ordering decimals is the process of determining'],
                  hint: 'Review long division of whole numbers and multiplication of decimals by 10, 100, and 1000.',
                  misconception: 'Students often try to "move the decimal" only in the dividend or forget to move it in the dividend after moving it in the divisor.' }
          ],
            remediations: { 'students-often-try-to-move': { steps: ['If a student is stuck, have them write the division as a fraction: 4.5 / 0.5.', 'Ask them, "What can we multiply the denominator by to make it a whole number?" Once they say 10, tell them, "Since.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_049', difficulty: 'standard',
          question: 'Decimals in real life are a way of expressing parts of a whole unit, such.',
          hint: 'Review the "Place Value" chapter to ensure the student understands that the first.',
          misconception: 'Students often treat the digits after the decimal point as whole numbers, such as thinking 0.50 is "fifty" and 0.5.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decimals in real life are a way of expressing parts of a whole unit, such as money (where',
                  options: ['Decimals in real life are a way of expressing parts of a whole unit, such as money (where', 'Decimals are a way of writing fractions that have denominators of 10, 100, 1000, and so', 'Place value in decimals is an extension of the whole number system, where digits to the', 'Comparing and ordering decimals is the process of determining'],
                  hint: 'Review the "Place Value" chapter to ensure the student understands that the first position after.',
                  misconception: 'Students often treat the digits after the decimal point as whole numbers, such as thinking 0.50 is "fifty" and 0.5 is "five," leading them.' }
          ],
            remediations: { 'students-often-treat-the-digits': { steps: ['If a student struggles, draw a 10x10 square grid on paper.', 'Shade 50 small squares for 0.50 and 5 columns (each with 10 squares) for 0.5.', 'Show them that both represent the same amount of the total square, explaining that the zero at the end is just.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_050', difficulty: 'standard',
          question: 'Rounding decimals is the process of approximating a number to a specific place.',
          hint: 'Review place value charts for decimals (tenths, hundredths, thousandths).',
          misconception: 'Students often try to round by looking at the very last digit in a long decimal (e.g., rounding 3.472 by looking at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rounding decimals is the process of approximating a number to a specific place value to',
                  options: ['Rounding decimals is the process of approximating a number to a specific place value to', 'Decimals are a way of writing fractions that have denominators of 10, 100, 1000, and so', 'Place value in decimals is an extension of the whole number system, where digits to the', 'Comparing and ordering decimals is the process of determining'],
                  hint: 'Review place value charts for decimals (tenths, hundredths, thousandths).',
                  misconception: 'Students often try to round by looking at the very last digit in a long decimal (e.g., rounding 3.472 by looking at the 2 instead of the.' }
          ],
            remediations: { 'students-often-try-to-round': { steps: ['Ask the student to circle only the digit immediately to the right of the target place.', 'Tell them: "Ignore everything else to the right of that circle; it is just \'noise\' that doesn\'t change the rounding.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch04_051', difficulty: 'standard',
          question: 'Problem solving with decimals involves using operations like addition.',
          hint: 'Review place value charts to see how tenths and hundredths relate to whole numbers.',
          misconception: 'Students often "align digits to the right" instead of aligning the decimal points.',
          parts: [
                { id: 'a', prompt: 'Compare 5.50 rupees and 5.5 rupees. Are they the same value? Why or why not?', answer: 'Yes, they are equal',
                  options: ['Yes, they are equal', 'more digits always mean a larger number'],
                  hint: 'Review place value charts to see how tenths and hundredths relate to whole numbers.',
                  misconception: 'Students often "align digits to the right" instead of aligning the decimal points.' }
          ],
            remediations: { 'students-often-align-digits-to': { steps: ['If a student struggles with alignment, have them use a grid paper.', 'Instruct them to place the decimal point in its own dedicated box.', 'Tell them to "fill the empty spaces with zeros" so every number has the same number of decimal places (e.g., change 0.5.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
