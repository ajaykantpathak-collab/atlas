import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch02_p2: SimDef = {
    id: 'v3_c6_math_ch02_p2',
    title: 'Integers · Part 2/3',
    subtitle: 'This node covers the multiplication of integers including zero and negative numbers.',
    classLevel: 6, subject: 'mathematics', topic: 'Integers · Part 2/3',
    chapters: ['c6_math_ch02'],
    nodeIds: ['c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_024', 'c6_math_ch02_025', 'c6_math_ch02_026', 'c6_math_ch02_027'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are at the "Building of Fun" and the lift button presses represent integers.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two cities report their temperatures: one is -5 degrees, the other -2. A classmate says the -5 city is warmer because 5 is bigger than 2. Where did they slip?',
        options: ['The minus sign flips the rule — -5 is further below zero, so that city is colder', 'Nowhere — 5 really is bigger than 2', 'Both cities are equally cold because both are negative', '-5 is warmer only at night'],
        answer: 'The minus sign flips the rule — -5 is further below zero, so that city is colder',
        hook: 'On the negative side of the number line, bigger digits mean smaller values. -10 is less than -1 because it sits further from zero — the sign changes everything.',
    },
    teaching: [
        { title: 'Multiplication of Integers', text: 'Multiplication of integers is the process of finding the product of two whole numbers that includes their signs, where the final sign depends on whether the signs of the numbers are the same.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch02_022', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Ride an elevator that goes below ground — label the basement floors with negative numbers, then decide which of two frosty cities is colder.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_022', title: 'Multiplication of Integers',
          scaffold: { problem: 'A submarine is at sea level (0 metres). It dives down at a speed of 5 metres per minute. What will be its depth after 8 minutes?',
            steps: [
            { text: 'Identify "diving down" as a negative movement ($-5$ m/min) and time as positive ($8$ min).' },
            { text: 'Set up the expression: $(-5) \\times 8$.' },
            { text: 'Multiply the absolute values: $5 \\times 8 = 40$.' },
            { text: 'Apply the sign rule: different signs (negative and positive) result in a negative.' },
            { text: 'The result is $-40$ metres.', faded: true, blankAnswer: '$-40$ metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_023', title: 'Division of Integers',
          scaffold: { problem: 'A company lost ₹1800 over 9 months, losing an equal amount each month. What was the integer representing the monthly profit/loss?',
            steps: [
            { text: 'Total loss is -1800, time is 9 months.' },
            { text: 'Use division: total / time = monthly change.' },
            { text: 'Expression: (-1800) / 9.' },
            { text: 'Divide absolute values: 1800 / 9 = 200.' },
            { text: 'Apply sign: Negative / Positive = Negative. Result is -200.', faded: true, blankAnswer: '-200 rupees' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch02_025', title: 'Absolute Value of Integers',
          caseStudy: { intro: 'Imagine you are in a lift in "Bela’s Building of Fun." Whether you go 3 floors up to the Book Store (+3) or 3 floors down to the Video Games shop (-3), the.',
            decisions: [{ prompt: 'What is the absolute value of -12?', options: [
                { text: 'The absolute value is 12', outcome: 'The absolute value is 12. A student who answers -12 likely forgets that absolute value measures.' },
                { text: 'negative', outcome: 'Not quite — Students often believe that vertical bars act like a "negative" sign, turning positive numbers into.', reveals: 'vertical-bars-act-like-a' },
                { text: 'do something', outcome: 'Not quite — Students often believe that vertical bars act like a "negative" sign, turning positive numbers into.', reveals: 'vertical-bars-act-like-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch02_026', title: 'Real-Life Applications of Integers',
          caseStudy: { intro: 'Have you ever wondered how a lift knows to go to "Floor -1" in a basement, or how a weather reporter says it is "minus 5 degrees"?',
            decisions: [{ prompt: 'What is the difference between a positive integer and a negative integer?', options: [
                { text: 'A positive integer is greater than zero, while a negative integer is less than zero', outcome: 'A positive integer is greater than zero, while a negative integer is less than zero.' },
                { text: '-10 is "larger" than -2', outcome: 'Not quite — Students often believe that -10 is "larger" than -2 because 10 is a larger number than 2.', reveals: '10-is-larger-than-2' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_027', title: 'Patterns with Integers',
          scaffold: { problem: 'A submarine starts at a depth of 20 metres below sea level. Every minute, it descends another 5 metres.',
            steps: [
            { text: 'Start at -20 (below sea level is negative).' },
            { text: 'The rule is a decrease of 5, which is -5 per minute.' },
            { text: 'Calculate for 4 minutes: -20 + (-5) + (-5) + (-5) + (-5).' },
            { text: 'Compute: -20 - 5 = -25; -25 - 5 = -30; -30 - 5 = -35; -35 - 5 = -40.' },
            { text: 'The depth is 40 metres below sea level.', faded: true, blankAnswer: '-40 metres (or 40 metres below sea level)' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch02_027', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch02_022', title: 'Use it in the wild',
          caseStudy: { intro: 'A cold-storage display shows the temperature falling below zero, and a student compares two accounts: one is ₹200 in debt, the other ₹100 in debt. He claims, \'minus 200 is bigger than minus 100, since 200 beats 100.\'',
            decisions: [{ prompt: 'Is -200 really bigger than -100?', options: [
                { text: 'No — on the number line, more negative means further left, which means smaller: -200 sits far below -100, so -200 is the smaller number and the bigger debt. The sign reverses the comparison: with negatives, the larger-looking number is actually worth less.', outcome: 'Distance from zero still tells size — -200 is 200 below zero while -100 is only 100 below, so the first position is lower on the line.' },
                { text: 'He is right — 200 is bigger than 100, and the minus sign does not change the comparison.', outcome: 'The minus changes everything — it measures debt or depth below zero, so -200 is lower than -100 on the number line, not higher.', reveals: 'minus-doesnt-matter' },
                { text: 'Neither is bigger — negative numbers cannot be compared at all.', outcome: 'They compare perfectly well on the number line — the one further left of zero is smaller, so -200 < -100.', reveals: 'negatives-cant-compare' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch02_027', title: 'The bigger picture',
          caseStudy: { intro: 'Zero is the border, not a team member. Negative numbers are not debts to fear — they are just positions on the other side.',
            decisions: [{ prompt: 'What comes next? Integers · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Integers · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch02_022', difficulty: 'standard',
          question: 'Multiplication of integers is the process of finding the product of two whole.',
          hint: 'Review the number line and the concept of "negative" as a direction.',
          misconception: 'Students often mistakenly apply the addition rule for signs to multiplication.',
          parts: [
                { id: 'a', prompt: 'What is the rule for the sign of the product when multiplying a positive integer by a negative integer?', answer: 'The product is always negative',
                  options: ['The product is always negative', 'positive'],
                  hint: 'Review the number line and the concept of "negative" as a direction.',
                  misconception: 'Students often mistakenly apply the addition rule for signs to multiplication.' },
                { id: 'b', prompt: 'Without calculating, is the product of $(-7) \\times (-4)$ positive or negative, and why?', answer: 'It is positive because both integers have the same (negative) sign',
                  options: ['It is positive because both integers have the same (negative) sign', 'negative', 'same sign'],
                  hint: 'Review the number line and the concept of "negative" as a direction.',
                  misconception: 'Students often mistakenly apply the addition rule for signs to multiplication.' }
          ],
            remediations: { 'students-often-mistakenly-apply-the': { steps: ['If a student adds instead of multiplies, ask them to write the problem as repeated addition: $(-3) \\times 4$ means.', 'Then, show them that $(-3) \\times (-4)$ represents the opposite of adding $(-3)$ four times, which leads to $+12$.', 'Use the "same signs = positive" rule as a final memory hook.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_023', difficulty: 'standard',
          question: 'The division of integers is the process of splitting an integer into equal.',
          hint: 'Review the multiplication sign rules: same signs = positive, different signs = negative.',
          misconception: 'Students often apply the "two negatives make a positive" rule to addition instead of multiplication and division.',
          parts: [
                { id: 'a', prompt: 'What is the rule for the sign of the quotient when you divide two integers with different signs?', answer: 'The quotient is always negative',
                  options: ['The quotient is always negative', 'positive'],
                  hint: 'Review the multiplication sign rules: same signs = positive, different signs = negative.',
                  misconception: 'Students often apply the "two negatives make a positive" rule to addition instead of multiplication and division.' },
                { id: 'b', prompt: 'If you divide 0 by -5, what is the result, and why is it possible to do this, unlike dividing -5 by 0?', answer: 'The result is 0 because 0 multiplied by -5 is 0',
                  options: ['The result is 0 because 0 multiplied by -5 is 0', 'undefined'],
                  hint: 'Review the multiplication sign rules: same signs = positive, different signs = negative.',
                  misconception: 'Students often apply the "two negatives make a positive" rule to addition instead of multiplication and division.' }
          ],
            remediations: { 'students-often-apply-the-two': { steps: ['If a student confuses sign rules, ask them to write the division as a multiplication sentence.', 'For (-10) / (-2) = ?, ask: "What number multiplied by -2 gives -10?" They will see it must be +5.', 'For addition, use the "Building of Fun" lift analogy: "If you go down 10 floors and then down 2 more, are you higher.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_024', difficulty: 'standard',
          question: 'The properties of integer operations are fundamental rules that describe how.',
          hint: 'Review the \'Building of Fun\' lift movement exercises in Chapter 2, Section 10.1.',
          misconception: 'Students often try to apply the commutative and associative properties to subtraction and division (e.g., thinking 10.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The properties of integer operations are fundamental rules that describe how we can',
                  options: ['The properties of integer operations are fundamental rules that describe how we can', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),', 'A number line is a straight line that represents integers as points at equal distances', 'Comparing and ordering integers involves determining the relative size of whole numbers'],
                  hint: 'Review the \'Building of Fun\' lift movement exercises in Chapter 2, Section 10.1.',
                  misconception: 'Students often try to apply the commutative and associative properties to subtraction and division (e.g., thinking 10 - 5 = 5 - 10).' }
          ],
            remediations: { 'students-often-try-to-apply': { steps: ['If a student applies these properties to subtraction, ask them to calculate the two sides separately.', 'Say: "Let\'s check 5 - 3 and 3 - 5.', 'Do you get the same result?', 'If the result changes, the property cannot hold for subtraction." Then, have them use the \'Building of Fun\' model.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_025', difficulty: 'standard',
          question: 'The absolute value of an integer is its distance from zero on the number line.',
          hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
          misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.',
          parts: [
                { id: 'a', prompt: 'What is the absolute value of -12?', answer: 'The absolute value is 12',
                  options: ['The absolute value is 12', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' },
                { id: 'b', prompt: 'If |x| = 5, does x have to be 5? Explain why or why not.', answer: 'No, x could be 5 or -5',
                  options: ['No, x could be 5 or -5', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' },
                { id: 'c', prompt: 'A diver is at 8 metres below sea level, and a bird is flying 8 metres above sea level. Represent their distances from sea level using absolute value notation.', answer: 'The diver is at |-8| = 8 metres, and the bird is at |8| = 8 metres',
                  options: ['The diver is at |-8| = 8 metres, and the bird is at |8| = 8 metres', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' },
                { id: 'd', prompt: 'Compare |-10| and |4|. Which is greater?', answer: '|-10| is 10 and |4| is 4',
                  options: ['|-10| is 10 and |4| is 4', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' }
          ],
            remediations: { 'vertical-bars-act-like-a': { steps: ['Ask the student to draw a number line and mark 0, 5, and -5.', 'Ask them to count the steps from 0 to 5, and then from 0 to -5.', 'Remind them that "distance" is just a count of steps, and since you cannot take a negative number of steps, the answer.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_025', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.',
          parts: [
                { id: 'a', prompt: 'Can the absolute value of an integer ever be negative? Justify your answer using the concept of the number line.', answer: 'No, because the absolute value measures distance from zero',
                  options: ['No, because the absolute value measures distance from zero', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' },
                { id: 'b', prompt: 'Create a scenario involving money (credits and debits) where two different amounts result in the same absolute value.', answer: 'A credit of ₹50 (+50) and a debit of ₹50 (-50) both have an absolute value of 50',
                  options: ['A credit of ₹50 (+50) and a debit of ₹50 (-50) both have an absolute value of 50', 'negative', 'do something'],
                  hint: 'Review the "Building of Fun" floors in the NCERT chapter to visualize distance from zero.',
                  misconception: 'Students often believe that vertical bars act like a "negative" sign, turning positive numbers into negative ones.' }
          ],
            remediations: { 'vertical-bars-act-like-a': { steps: ['Ask the student to draw a number line and mark 0, 5, and -5.', 'Ask them to count the steps from 0 to 5, and then from 0 to -5.', 'Remind them that "distance" is just a count of steps, and since you cannot take a negative number of steps, the answer.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_026', difficulty: 'standard',
          question: 'Integers are a collection of numbers that include all natural numbers (1, 2.',
          hint: 'Review basic number line plotting (0 to 10).',
          misconception: 'Students often believe that -10 is "larger" than -2 because 10 is a larger number than 2.',
          parts: [
                { id: 'a', prompt: 'If you are at sea level (0m) and dive to a depth of 50m, how would you represent your position as an integer?', answer: 'You would represent it as -50m',
                  options: ['You would represent it as -50m', 'larger', '-10 is "larger" than -2'],
                  hint: 'Review basic number line plotting (0 to 10).',
                  misconception: 'Students often believe that -10 is "larger" than -2 because 10 is a larger number than 2.' },
                { id: 'b', prompt: 'Compare -10 and -2. Which is greater and why?', answer: '-2 is greater than -10',
                  options: ['-2 is greater than -10', 'larger', '-10 is "larger" than -2'],
                  hint: 'Review basic number line plotting (0 to 10).',
                  misconception: 'Students often believe that -10 is "larger" than -2 because 10 is a larger number than 2.' },
                { id: 'c', prompt: 'If a bank account has a balance of -200 rupees, what does that mean in real terms?', answer: 'It means the account holder owes the bank 200 rupees',
                  options: ['It means the account holder owes the bank 200 rupees', 'they have 200 rupees', 'larger', '-10 is "larger" than -2'],
                  hint: 'Review basic number line plotting (0 to 10).',
                  misconception: 'Students often believe that -10 is "larger" than -2 because 10 is a larger number than 2.' }
          ],
            remediations: { '10-is-larger-than-2': { steps: ['Ask the student to draw a vertical number line (like a thermometer).', 'Have them place 0 at the middle, then -2 and -10.', 'Ask: "Which number is higher up on the thermometer?" When they see -2 is higher, explain that "higher" on a thermometer.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_027', difficulty: 'standard',
          question: 'Patterns with integers are sequences of numbers that follow a specific.',
          hint: 'Review the "Building of Fun" or a horizontal number line to visualize jumps of fixed size.',
          misconception: 'Students often fail to cross the zero barrier correctly. For example, in the sequence 2, 0, -2, ..., they might guess.',
          parts: [
                { id: 'a', prompt: 'If a sequence starts with -2, -4, -8, -16, ..., what is the rule being applied to each term?', answer: 'The rule is multiplying by 2 (or by positive 2)',
                  options: ['The rule is multiplying by 2 (or by positive 2)', 'subtracting 2'],
                  hint: 'Review the "Building of Fun" or a horizontal number line to visualize jumps of fixed size.',
                  misconception: 'Students often fail to cross the zero barrier correctly. For example, in the sequence 2, 0, -2, ..., they might guess "0" or "1" next.' }
          ],
            remediations: { 'students-often-fail-to-cross': { steps: ['If a student struggles, draw a vertical "Building of Fun" (number line) and have them physically place markers on the.', 'Tell them: "If you are on floor -2 and you go down 2 more floors, count the floors down: -3, then -4." Say: "Moving.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
