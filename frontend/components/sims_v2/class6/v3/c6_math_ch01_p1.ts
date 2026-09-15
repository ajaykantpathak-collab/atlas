import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch01_p1: SimDef = {
    id: 'v3_c6_math_ch01_p1',
    title: 'Number System · Part 1/3',
    subtitle: 'This node covers the role of numbers in daily life, basic number patterns, estimation.',
    classLevel: 6, subject: 'mathematics', topic: 'Number System · Part 1/3',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'How many times have you checked the clock this morning or counted the coins in your pocket?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stadium holds thousands of cheering people and the organizer announces the crowd size minutes after the gates close. Nobody counted heads one by one — so how did they get a number?',
        options: ['They counted a small sample area, estimated the rest, and got a close-enough total fast', 'They made up a random big number', 'They weighed the stadium before and after', 'They asked every person to raise a hand at once'],
        answer: 'They counted a small sample area, estimated the rest, and got a close-enough total fast',
        hook: 'Estimation is not random guessing. It is a logical shortcut — when exact counting is slow or impossible, a smart about-value is enough to plan with.',
    },
    teaching: [
        { title: 'Numbers in Our Everyday Life', text: 'Numbers in our everyday life are specific values used to represent quantity, order, or measurement, helping us organize and understand the world around us.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch01_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Face a crowd too big to count — pick a sample patch, scale it up, and defend your estimated total against someone demanding an exact count.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch01_001', title: 'Numbers in Our Everyday Life',
          caseStudy: { intro: 'How many times have you checked the clock this morning or counted the coins in your pocket? We use numbers constantly without even realizing it.',
            decisions: [{ prompt: 'What is one way we use numbers in a classroom setting besides counting students?', options: [
                { text: 'We use numbers to measure time (like the duration of a period) or to identify the date', outcome: 'We use numbers to measure time (like the duration of a period) or to identify the date.' },
                { text: 'numbers are only for math', outcome: 'Not quite — Students often believe that "estimation" is just a wild guess with no logical basis.', reveals: 'estimation-is-just-a-wild' },
                { text: 'estimation', outcome: 'Not quite — Students often believe that "estimation" is just a wild guess with no logical basis.', reveals: 'estimation-is-just-a-wild' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch01_002', title: 'Natural Numbers and Whole Numbers',
          caseStudy: { intro: 'Imagine you are organizing your bookshelf. If you start counting your books one by one, you say "one, two, three..."—these are your Natural Numbers.',
            decisions: [{ prompt: 'Is the number 0 a natural number? Why or why not?', options: [
                { text: 'No, 0 is not a natural number', outcome: 'No, 0 is not a natural number. Natural numbers are defined as "counting numbers," and we always.' },
                { text: '0 is a natural number', outcome: 'Not quite — Students often believe that 0 is a natural number because they see it on a number line alongside 1.', reveals: '0-is-a-natural-number' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_003', title: 'Place Value and Face Value',
          scaffold: { problem: 'A shopkeeper has 4,528 marbles. What is the place value of the digit \'5\' and the digit \'2\'?',
            steps: [
            { text: 'Identify the digits and their positions in 4,528.' },
            { text: '5 is in the hundreds place, 2 is in the tens place.' },
            { text: 'Multiply the face value by the position: 5 × 100 and 2 × 10.' },
            { text: 'Calculate: 500 and 20.' },
            { text: 'Verify that the total sum of all place values matches the original number.', faded: true, blankAnswer: 'Place value of 5 is 500; place value of 2 is 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_006', title: 'Rounding Numbers: Estimation',
          scaffold: { problem: 'You bought a notebook for ₹128. Round this cost to the nearest ten to tell your friend.',
            steps: [
            { text: 'Identify the tens digit (2) and the neighbor to its right (8).' },
            { text: 'Compare 8 to 5. Since 8 > 5, we round up.' },
            { text: 'Increase the tens digit (2) by 1 to get 3.' },
            { text: 'Change all digits to the right of the tens place to zero.' },
            { text: 'The result is 130.', faded: true, blankAnswer: '₹130' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch01_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At the stationery shop, a student holds a ₹200 note and wants 4 pens at ₹15 each plus 2 notebooks at ₹30 each. The queue behind is growing and the shopkeeper is waiting.',
            decisions: [{ prompt: 'How can she quickly know whether ₹200 is enough?', options: [
                { text: 'Estimate — 4 pens cost about 4 × 15 = ₹60 and the notebooks about 2 × 30 = ₹60, so roughly ₹120, comfortably inside ₹200. Estimation is not guessing: it is a quick, close-enough calculation that answers the actual question — \'can I afford this\' — without needing the exact figure.', outcome: 'Mental rounding gives the answer in seconds, and ₹120 versus ₹200 leaves no doubt — the right tool for a decision that needs a fast approximate answer.' },
                { text: 'She cannot know until the shopkeeper computes the exact total — estimation is just guessing.', outcome: 'Estimation is structured arithmetic with rounded numbers, not a guess — 4 × 15 and 2 × 30 are already easy, and the rough total settles the question.', reveals: 'estimation-is-guessing' },
                { text: 'She should just hand over the ₹200 and trust the change will be roughly right.', outcome: 'Skipping the estimate means she cannot catch a billing error — the quick mental total is exactly what protects her change.', reveals: 'never-check-the-total' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Numbers are tools, not just symbols — they tell you if you have enough money, enough time, and roughly how many people showed up.',
            decisions: [{ prompt: 'What comes next? Number System · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Number System · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'standard',
          question: 'Numbers in our everyday life are specific values used to represent quantity.',
          hint: 'Review basic place value (thousands, ten-thousands) to ensure you can compare magnitudes.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'Counting one by one is slow and prone to error, while estimation gives us a useful "about" value that is sufficient for planning.', answer: '**Correct Answer:** It is more efficient to estimate',
                  options: ['**Correct Answer:** It is more efficient to estimate', 'estimating is always more accurate than counting', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Review basic place value (thousands, ten-thousands) to ensure you can compare magnitudes correctly.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'An example is 121. It is a palindrome because it reads the same forward and backward (1-2-1).', answer: '**Correct Answer:** A 3-digit palindrome is 121',
                  options: ['**Correct Answer:** A 3-digit palindrome is 121', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Review basic place value (thousands, ten-thousands) to ensure you can compare magnitudes correctly.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_002', difficulty: 'standard',
          question: 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while.',
          hint: 'Review basic counting skills with physical objects until the student consistently.',
          misconception: 'Students often believe that 0 is a natural number because they see it on a number line alongside 1, 2, and 3.',
          parts: [
                { id: 'a', prompt: 'Is the number 0 a natural number? Why or why not?', answer: 'No, 0 is not a natural number',
                  options: ['No, 0 is not a natural number', '0 is a natural number'],
                  hint: 'Review basic counting skills with physical objects until the student consistently identifies the.',
                  misconception: 'Students often believe that 0 is a natural number because they see it on a number line alongside 1, 2, and 3.' },
                { id: 'b', prompt: 'If I have a set of natural numbers, can I always find a predecessor for every number in that set? Explain.', answer: 'No, because the number 1 has no predecessor in the set of natural numbers',
                  options: ['No, because the number 1 has no predecessor in the set of natural numbers', '0 is a natural number'],
                  hint: 'Review basic counting skills with physical objects until the student consistently identifies the.',
                  misconception: 'Students often believe that 0 is a natural number because they see it on a number line alongside 1, 2, and 3.' },
                { id: 'c', prompt: 'Compare the sets of Natural Numbers and Whole Numbers. Which set is "larger" and why?', answer: 'The set of Whole Numbers is larger',
                  options: ['The set of Whole Numbers is larger', '0 is a natural number'],
                  hint: 'Review basic counting skills with physical objects until the student consistently identifies the.',
                  misconception: 'Students often believe that 0 is a natural number because they see it on a number line alongside 1, 2, and 3.' }
          ],
            remediations: { '0-is-a-natural-number': { steps: ['Ask the student to count a pile of pencils.', 'Say, "Start counting—what is the first number you say?" When they say "one," explain that natural numbers are for.', 'Then, ask them to describe the number of pencils in their hand if they drop them all.', 'Since the count is "none," explain that we use 0 to represent "none," and 0 is the "whole" number that isn\'t.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_003', difficulty: 'standard',
          question: 'The face value of a digit is its own value regardless of its position, while.',
          hint: 'Review basic addition and the concept of groups of ten.',
          misconception: 'Students often confuse the digit itself (face value) with its contribution to the total number (place value).',
          parts: [
                { id: 'a', prompt: 'What is the difference between the face value and the place value of the digit 7 in the number 4,782?', answer: 'The face value is 7, and the place value is 700',
                  options: ['The face value is 7, and the place value is 700', 'the place value is 70'],
                  hint: 'Review basic addition and the concept of groups of ten.',
                  misconception: 'Students often confuse the digit itself (face value) with its contribution to the total number (place value).' }
          ],
            remediations: { 'students-often-confuse-the-digit': { steps: ['If a student fails, have them draw a Place Value Table with columns for Thousands, Hundreds, Tens, and Ones.', 'Ask them to write the number 3,402 into the table digit by digit.', 'Then, have them write the value of each column head (1000, 100, 10, 1) above the digits and perform the multiplication.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_004', difficulty: 'standard',
          question: 'Comparing numbers is the process of determining the relative size of two.',
          hint: 'Review Place Value of Numbers (Chapter 1, Section 1.2).',
          misconception: 'Students often compare the "size" of the numbers by looking only at the first digit they see (from left to right).',
          parts: [
                { id: 'a', prompt: 'When comparing 5,672 and 5,627, why do we start looking at the thousands place instead of the ones place?', answer: 'We start from the left',
                  options: ['We start from the left', 'all digits contribute equally to a number\'s magnitude'],
                  hint: 'Review Place Value of Numbers (Chapter 1, Section 1.2).',
                  misconception: 'Students often compare the "size" of the numbers by looking only at the first digit they see (from left to right) without checking the.' }
          ],
            remediations: { 'students-often-compare-the-size': { steps: ['Ask the student to write both numbers in a column, aligning the places (thousands, hundreds, tens, ones).', 'Ask them to count the total digits in each number aloud.', 'Remind them: "More digits always mean a larger number, no matter what the digits are."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_005', difficulty: 'standard',
          question: 'The Indian number system is a method of grouping and naming large numbers using.',
          hint: 'Review basic place value charts (Ones, Tens, Hundreds, Thousands).',
          misconception: 'Students often try to place commas every three digits (e.g., 10,000,000 instead of 1,00,00,000) because calculators and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian number system is a method of grouping and naming large numbers using specific',
                  options: ['The Indian number system is a method of grouping and naming large numbers using specific', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review basic place value charts (Ones, Tens, Hundreds, Thousands).',
                  misconception: 'Students often try to place commas every three digits (e.g., 10,000,000 instead of 1,00,00,000) because calculators and computers often.' }
          ],
            remediations: { 'students-often-try-to-place': { steps: ['Direct the student to write the number in a place value table with columns labeled: Crores, Ten Lakhs, Lakhs, Ten.', 'Have them fill the digits into the columns first, then draw the commas only at the boundaries of these columns.', 'Remind them: "Indian commas are only at the boundary of the hundreds, then every two steps after that."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_006', difficulty: 'standard',
          question: 'Rounding numbers is the process of replacing an exact number with a nearby.',
          hint: 'Review the "Number Play" section on place value and identifying digits.',
          misconception: 'Students often try to round by looking at the wrong digit, such as rounding 167 to the nearest ten by looking at the 1.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rounding numbers is the process of replacing an exact number with a nearby, simpler value',
                  options: ['Rounding numbers is the process of replacing an exact number with a nearby, simpler value', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review the "Number Play" section on place value and identifying digits.',
                  misconception: 'Students often try to round by looking at the wrong digit, such as rounding 167 to the nearest ten by looking at the 1 instead of the 7.' }
          ],
            remediations: { 'students-often-try-to-round': { steps: ['Ask the student to underline the digit in the place they are rounding to (e.g., the tens place).', 'Then, tell them to draw an arrow to the digit immediately to its right.', 'Explain: "The arrow points to the \'boss\' digit—it decides whether the underlined digit stays the same or goes up."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
