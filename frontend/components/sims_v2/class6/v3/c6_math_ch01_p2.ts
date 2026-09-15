import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch01_p2: SimDef = {
    id: 'v3_c6_math_ch01_p2',
    title: 'Number System · Part 2/3',
    subtitle: 'This node covers basic Roman numeral symbols and the rules for combining them.',
    classLevel: 6, subject: 'mathematics', topic: 'Number System · Part 2/3',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are looking at the face of an old clock or the copyright date on a book, and you see "MCMXCV.".', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stadium holds thousands of cheering people and the organizer announces the crowd size minutes after the gates close. Nobody counted heads one by one — so how did they get a number?',
        options: ['They counted a small sample area, estimated the rest, and got a close-enough total fast', 'They made up a random big number', 'They weighed the stadium before and after', 'They asked every person to raise a hand at once'],
        answer: 'They counted a small sample area, estimated the rest, and got a close-enough total fast',
        hook: 'Estimation is not random guessing. It is a logical shortcut — when exact counting is slow or impossible, a smart about-value is enough to plan with.',
    },
    teaching: [
        { title: 'Roman Numerals', text: 'Roman Numerals are a non-place-value number system developed by ancient Romans that uses seven specific Latin letters (I, V, X, L, C, D, M) to represent values.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch01_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Face a crowd too big to count — pick a sample patch, scale it up, and defend your estimated total against someone demanding an exact count.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_007', title: 'Roman Numerals',
          scaffold: { problem: 'Convert the number 76 into Roman Numerals.',
            steps: [
            { text: 'Split 76 into its parts: 70 and 6.' },
            { text: 'Represent 70 as (50 + 10 + 10) = LXX.' },
            { text: 'Represent 6 as (5 + 1) = VI.' },
            { text: 'Combine the parts: LXX + VI = LXXVI.', faded: true, blankAnswer: 'LXXVI' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_009', title: 'Operations on Large Numbers: Subtraction',
          scaffold: { problem: 'A farmer harvested 45,670 kg of wheat. He sold 28,945 kg to the government. How much wheat is left in his storehouse?',
            steps: [
            { text: 'Identify the minuend (45,670) and subtrahend (28,945).' },
            { text: 'Set up the columns: 45,670 - 28,945.' },
            { text: 'Start from ones: 0-5. Borrow from tens: 10-5 = 5. Tens column: 6-4 = 2.' },
            { text: 'Hundreds column: 6-9. Borrow from thousands: 16-9 = 7.' },
            { text: 'Thousands column: 4-8. Borrow from ten-thousands: 14-8 = 6.' },
            { text: 'Ten-thousands: 3-2 = 1.', faded: true, blankAnswer: '16,725 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_010', title: 'Operations on Large Numbers: Multiplication',
          scaffold: { problem: 'A local dairy farm produces 425 litres of milk every day. How many litres of milk are produced in 15 days?',
            steps: [
            { text: 'Identify given values: 425 litres per day and 15 days.' },
            { text: 'Method: Multiply 425 by 15 (break 15 into 10 + 5).' },
            { text: 'First partial product: 425 × 5 = 2125.' },
            { text: 'Second partial product: 425 × 10 = 4250.' },
            { text: 'Final sum: 2125 + 4250 = 6375.', faded: true, blankAnswer: '6375 litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_012', title: 'Estimating Sums, Differences, and Products',
          scaffold: { problem: 'A library bought 1,245 storybooks and 2,876 science books. Estimate the total number of books bought by rounding to the nearest hundred.',
            steps: [
            { text: 'Identify the hundreds place: 1,245 -> 2 is the digit; 2,876 -> 8 is the digit.' },
            { text: 'Check the digit to the right: 1,245 -> 4 is less than 5; 2,876 -> 7 is 5 or more.' },
            { text: 'Round: 1,245 rounds to 1,200; 2,876 rounds to 2,900.' },
            { text: 'Add: 1,200 + 2,900 = 4,100.' },
            { text: 'Interpret: The library bought approximately 4,100 books.', faded: true, blankAnswer: '4,100 books' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch01_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At the stationery shop, a student holds a ₹200 note and wants 4 pens at ₹15 each plus 2 notebooks at ₹30 each. The queue behind is growing and the shopkeeper is waiting.',
            decisions: [{ prompt: 'How can she quickly know whether ₹200 is enough?', options: [
                { text: 'Estimate — 4 pens cost about 4 × 15 = ₹60 and the notebooks about 2 × 30 = ₹60, so roughly ₹120, comfortably inside ₹200. Estimation is not guessing: it is a quick, close-enough calculation that answers the actual question — \'can I afford this\' — without needing the exact figure.', outcome: 'Mental rounding gives the answer in seconds, and ₹120 versus ₹200 leaves no doubt — the right tool for a decision that needs a fast approximate answer.' },
                { text: 'She cannot know until the shopkeeper computes the exact total — estimation is just guessing.', outcome: 'Estimation is structured arithmetic with rounded numbers, not a guess — 4 × 15 and 2 × 30 are already easy, and the rough total settles the question.', reveals: 'estimation-is-guessing' },
                { text: 'She should just hand over the ₹200 and trust the change will be roughly right.', outcome: 'Skipping the estimate means she cannot catch a billing error — the quick mental total is exactly what protects her change.', reveals: 'never-check-the-total' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Numbers are tools, not just symbols — they tell you if you have enough money, enough time, and roughly how many people showed up.',
            decisions: [{ prompt: 'What comes next? Number System · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Number System · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch01_007', difficulty: 'standard',
          question: 'Roman Numerals are a non-place-value number system developed by ancient Romans.',
          hint: 'Review basic addition/subtraction and the concept of regrouping numbers.',
          misconception: 'Students often try to subtract any smaller number from any larger number, such as writing 95 as "VX" (100-5) or 99.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Roman Numerals are a non-place-value number system developed by ancient Romans that uses',
                  options: ['Roman Numerals are a non-place-value number system developed by ancient Romans that uses', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review basic addition/subtraction and the concept of regrouping numbers.',
                  misconception: 'Students often try to subtract any smaller number from any larger number, such as writing 95 as "VX" (100-5) or 99 as "IC" (100-1).' }
          ],
            remediations: { 'students-often-try-to-subtract': { steps: ['If a student uses an invalid subtractive pair, ask them to "deconstruct" the number into its tens and ones place first.', 'Show them that 90 must be written as XC (100-10) and 5 as V, resulting in XCV.', 'Remind them that they can never skip a place value when subtracting.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_008', difficulty: 'standard',
          question: 'Addition of large numbers is the process of calculating the total value of two.',
          hint: 'Review basic addition facts and column alignment for 3-digit numbers.',
          misconception: 'Students often forget to include the "carried" digit when summing the next column.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Addition of large numbers is the process of calculating the total value of two or more',
                  options: ['Addition of large numbers is the process of calculating the total value of two or more', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review basic addition facts and column alignment for 3-digit numbers.',
                  misconception: 'Students often forget to include the "carried" digit when summing the next column.' }
          ],
            remediations: { 'students-often-forget-to-include': { steps: ['If a student forgets carries, have them physically write the carried number in a small circle above the next column.', 'Tell them: "Always add the number in the circle FIRST before adding the other two digits in the column." Practice two.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_009', difficulty: 'standard',
          question: 'Subtraction of large numbers is the process of finding the difference between.',
          hint: 'Review the "Place Value" concept, specifically how 1 ten is equal to 10 ones.',
          misconception: 'The "Always Subtract Smaller from Larger" error: Students often subtract the smaller digit from the larger digit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subtraction of large numbers is the process of finding the difference between two values',
                  options: ['Subtraction of large numbers is the process of finding the difference between two values', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review the "Place Value" concept, specifically how 1 ten is equal to 10 ones.',
                  misconception: 'The "Always Subtract Smaller from Larger" error: Students often subtract the smaller digit from the larger digit regardless of whether.' }
          ],
            remediations: { 'the-always-subtract-smaller-from': { steps: ['If a student subtracts the smaller from the larger digit regardless of position, ask them to model the problem with.', 'Say: "If you have 2 rupees, can you give me 8 rupees?" When they say "no," explain that the borrowing process is like.', 'Show them how the "2" becomes "12" after borrowing from the tens place, making the subtraction possible.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_010', difficulty: 'standard',
          question: 'Multiplication is a mathematical operation representing repeated addition.',
          hint: 'Review place value up to the thousands column and single-digit multiplication facts.',
          misconception: 'Students often forget to include the "placeholder" zero when multiplying by the tens digit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplication is a mathematical operation representing repeated addition of the same',
                  options: ['Multiplication is a mathematical operation representing repeated addition of the same', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review place value up to the thousands column and single-digit multiplication facts.',
                  misconception: 'Students often forget to include the "placeholder" zero when multiplying by the tens digit.' }
          ],
            remediations: { 'students-often-forget-to-include': { steps: ['Ask the student to write the multiplier in expanded form (e.g., 21 as 20 + 1).', 'Have them multiply 123 by 1, then 123 by 20, emphasizing that 20 is "two tens." Show them that 123 × 20 must result.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_011', difficulty: 'standard',
          question: 'Division is the mathematical process of splitting a total quantity into equal.',
          hint: 'Review the "multiplication facts" for the specific divisor (e.g., if dividing by 13.',
          misconception: 'Students often "drop" a number and forget to place a placeholder zero in the quotient.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Division is the mathematical process of splitting a total quantity into equal groups or',
                  options: ['Division is the mathematical process of splitting a total quantity into equal groups or', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review the "multiplication facts" for the specific divisor (e.g., if dividing by 13, write out.',
                  misconception: 'Students often "drop" a number and forget to place a placeholder zero in the quotient.' }
          ],
            remediations: { 'students-often-drop-a-number': { steps: ['If a student gets 12 instead of 102, ask them to check their work by multiplying their answer (12) by the divisor (8).', 'When they see 12 * 8 = 96, which is not 816, explain that the quotient must be closer to the original number.', 'Remind them: "Every time you bring down a digit, you MUST put a digit in the quotient, even if that digit is a zero."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_012', difficulty: 'standard',
          question: 'Estimation is the process of finding an approximate value that is close enough.',
          hint: 'Review place value charts to identify the thousands, hundreds, and tens columns.',
          misconception: 'Students often round the wrong digit or "double round" (e.g., rounding 4,499 to 5,000 because 4,499 is close to 4,500).',
          parts: [
                { id: 'a', prompt: 'What is the rule for rounding a digit if the digit to its right is 4 or less?', answer: 'You keep the digit the same and replace all digits to the right with zeros',
                  options: ['You keep the digit the same and replace all digits to the right with zeros', 'round up'],
                  hint: 'Review place value charts to identify the thousands, hundreds, and tens columns.',
                  misconception: 'Students often round the wrong digit or "double round" (e.g., rounding 4,499 to 5,000 because 4,499 is close to 4,500).' }
          ],
            remediations: { 'students-often-round-the-wrong': { steps: ['If a student rounds incorrectly, ask them to underline the target place value (e.g., the hundreds place) and circle.', 'Ask: "Is that circled number 5 or bigger?" If yes, add 1 to the underlined number; if no, keep it the same, and turn.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
