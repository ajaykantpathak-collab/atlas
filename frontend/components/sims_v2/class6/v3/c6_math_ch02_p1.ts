import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch02_p1: SimDef = {
    id: 'v3_c6_math_ch02_p1',
    title: 'Integers · Part 1/3',
    subtitle: 'This node covers the definition of integers, their representation on a number line, and.',
    classLevel: 6, subject: 'mathematics', topic: 'Integers · Part 1/3',
    chapters: ['c6_math_ch02'],
    nodeIds: ['c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are in an elevator of a building with a basement. When you press the \'0\' button, you are at the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two cities report their temperatures: one is -5 degrees, the other -2. A classmate says the -5 city is warmer because 5 is bigger than 2. Where did they slip?',
        options: ['The minus sign flips the rule — -5 is further below zero, so that city is colder', 'Nowhere — 5 really is bigger than 2', 'Both cities are equally cold because both are negative', '-5 is warmer only at night'],
        answer: 'The minus sign flips the rule — -5 is further below zero, so that city is colder',
        hook: 'On the negative side of the number line, bigger digits mean smaller values. -10 is less than -1 because it sits further from zero — the sign changes everything.',
    },
    teaching: [
        { title: 'Introduction to Integers', text: 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...), their negative counterparts (-1, -2, -3...), and zero.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch02_016', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Ride an elevator that goes below ground — label the basement floors with negative numbers, then decide which of two frosty cities is colder.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch02_016', title: 'Introduction to Integers',
          caseStudy: { intro: 'Imagine you are in an elevator of a building with a basement. When you press the \'0\' button, you are at the ground level (the Welcome Hall).',
            decisions: [{ prompt: 'What are the three components that make up the set of integers?', options: [
                { text: 'Integers consist of positive whole numbers, negative whole numbers, and zero', outcome: 'Integers consist of positive whole numbers, negative whole numbers, and zero.' },
                { text: 'bigger', outcome: 'Not quite — Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.', reveals: '10-is-bigger-than-1' },
                { text: '-10 is "bigger" than -1', outcome: 'Not quite — Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.', reveals: '10-is-bigger-than-1' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch02_017', title: 'Integers on the Number Line',
          caseStudy: { intro: 'Imagine you are standing in an elevator in a building with underground parking.',
            decisions: [{ prompt: 'What is the name of the central point on a number line that separates positive and negative numbers?', options: [
                { text: 'The central point is called zero (0)', outcome: 'The central point is called zero (0). A wrong answer suggests the student has not yet internalized.' },
                { text: 'since 5 is bigger than 2, then -5 must be bigger than -2', outcome: 'Not quite — Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.', reveals: 'since-5-is-bigger-than' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_019', title: 'Addition of Integers',
          scaffold: { problem: 'A submarine is at a depth of 50 metres below sea level (-50). It then rises 20 metres. What is its new depth?',
            steps: [
            { text: 'Identify current position as -50.' },
            { text: 'Identify "rising" as a positive movement of +20.' },
            { text: 'Set up the expression: (-50) + (+20).' },
            { text: 'On a number line, start at -50 and move 20 units to the right.' },
            { text: 'Landing point is -30.', faded: true, blankAnswer: '-30 metres (or 30 metres below sea level).' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_020', title: 'Subtraction of Integers',
          scaffold: { problem: 'A submarine is at 40 metres below sea level (-40m). It descends another 30 metres. What is its new position?',
            steps: [
            { text: 'Identify starting position (-40) and movement (down 30 means -30).' },
            { text: 'The expression is (-40) - (+30).' },
            { text: 'Apply the rule: (-40) + (-30).' },
            { text: 'Add the two negative values: -(40 + 30) = -70.' },
            { text: 'The new position is 70 metres below sea level.', faded: true, blankAnswer: '-70 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_021', title: 'Additive Inverse and Zero',
          scaffold: { problem: 'A submarine is at a depth of 200 metres below sea level. It then rises 200 metres. What is its final position relative to sea level?',
            steps: [
            { text: 'Identify the starting position as -200 (since it is below sea level).' },
            { text: 'Identify the movement as +200 (since it is rising).' },
            { text: 'Apply the additive inverse rule: (-200) + (+200).' },
            { text: 'Compute the sum: (-200) + 200 = 0.' },
            { text: 'Interpret the result: The submarine is at 0 metres, which is exactly at sea level.', faded: true, blankAnswer: '0 metres (Sea Level)' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch02_021', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch02_016', title: 'Use it in the wild',
          caseStudy: { intro: 'A cold-storage display shows the temperature falling below zero, and a student compares two accounts: one is ₹200 in debt, the other ₹100 in debt. He claims, \'minus 200 is bigger than minus 100, since 200 beats 100.\'',
            decisions: [{ prompt: 'Is -200 really bigger than -100?', options: [
                { text: 'No — on the number line, more negative means further left, which means smaller: -200 sits far below -100, so -200 is the smaller number and the bigger debt. The sign reverses the comparison: with negatives, the larger-looking number is actually worth less.', outcome: 'Distance from zero still tells size — -200 is 200 below zero while -100 is only 100 below, so the first position is lower on the line.' },
                { text: 'He is right — 200 is bigger than 100, and the minus sign does not change the comparison.', outcome: 'The minus changes everything — it measures debt or depth below zero, so -200 is lower than -100 on the number line, not higher.', reveals: 'minus-doesnt-matter' },
                { text: 'Neither is bigger — negative numbers cannot be compared at all.', outcome: 'They compare perfectly well on the number line — the one further left of zero is smaller, so -200 < -100.', reveals: 'negatives-cant-compare' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch02_021', title: 'The bigger picture',
          caseStudy: { intro: 'Zero is the border, not a team member. Negative numbers are not debts to fear — they are just positions on the other side.',
            decisions: [{ prompt: 'What comes next? Integers · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Integers · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch02_016', difficulty: 'standard',
          question: 'Integers are a set of numbers that include all positive counting numbers (1, 2.',
          hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
          misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.',
          parts: [
                { id: 'a', prompt: 'What are the three components that make up the set of integers?', answer: 'Integers consist of positive whole numbers, negative whole numbers, and zero',
                  options: ['Integers consist of positive whole numbers, negative whole numbers, and zero', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' },
                { id: 'b', prompt: 'If the temperature in a city is -5°C and in another city it is -2°C, which city is colder? Explain why.', answer: 'The city at -5°C is colder',
                  options: ['The city at -5°C is colder', 'less than', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' },
                { id: 'c', prompt: 'A bank account has a balance of 0. If you withdraw 500 rupees, how would you represent your new balance using an integer?', answer: 'The balance is -500 rupees',
                  options: ['The balance is -500 rupees', 'below zero', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' },
                { id: 'd', prompt: 'Compare the two numbers -10 and -1. Which is greater, and how does their position on the number line prove it?', answer: '-1 is greater than -10',
                  options: ['-1 is greater than -10', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' }
          ],
            remediations: { '10-is-bigger-than-1': { steps: ['Draw a horizontal number line on paper with 0 in the middle.', 'Ask the student to place a marker at -1 and another at -10.', 'Ask, "If you are walking from the negative side toward zero, which number do you hit first?" Explain that the number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.',
          parts: [
                { id: 'a', prompt: 'Is zero a positive or a negative integer? Defend your answer.', answer: 'Zero is neither positive nor negative',
                  options: ['Zero is neither positive nor negative', 'boundary', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' }
          ],
            remediations: { '10-is-bigger-than-1': { steps: ['Draw a horizontal number line on paper with 0 in the middle.', 'Ask the student to place a marker at -1 and another at -10.', 'Ask, "If you are walking from the negative side toward zero, which number do you hit first?" Explain that the number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_017', difficulty: 'standard',
          question: 'A number line is a straight line that represents integers as points at equal.',
          hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
          misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.',
          parts: [
                { id: 'a', prompt: 'What is the name of the central point on a number line that separates positive and negative numbers?', answer: 'The central point is called zero (0)',
                  options: ['The central point is called zero (0)', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'b', prompt: 'If you have two numbers, -3 and -7, which one is further to the right on the number line, and why?', answer: '-3 is further to the right',
                  options: ['-3 is further to the right', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'c', prompt: 'Plot the integers -4, 2, and 0 on a number line and list them in increasing order.', answer: 'The order is -4, 0, 2',
                  options: ['The order is -4, 0, 2', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'd', prompt: 'Compare the position of 5 and -5 on the number line. Are they the same distance from zero?', answer: 'Yes, they are the same distance from zero in opposite directions',
                  options: ['Yes, they are the same distance from zero in opposite directions', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' }
          ],
            remediations: { 'since-5-is-bigger-than': { steps: ['Direct the student to draw two separate lines: one for positive (0, 1, 2, 3, 4, 5) and one for negative (0, -1, -2, -3.', 'Ask them: "If you have 5 rupees debt (-5) and 2 rupees debt (-2), which situation is better for your pocket?" Once they.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_018', difficulty: 'standard',
          question: 'Comparing and ordering integers involves determining the relative size of whole.',
          hint: 'Review the number line and the concept of 0 as a starting point.',
          misconception: 'Students often treat negative numbers like positive ones, assuming that because 10 is larger than 5, -10 must be larger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering integers involves determining the relative size of whole numbers',
                  options: ['Comparing and ordering integers involves determining the relative size of whole numbers', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),', 'A number line is a straight line that represents integers as points at equal distances', 'Adding integers is the process of combining two numbers that include positive values,'],
                  hint: 'Review the number line and the concept of 0 as a starting point.',
                  misconception: 'Students often treat negative numbers like positive ones, assuming that because 10 is larger than 5, -10 must be larger than -5.' }
          ],
            remediations: { 'students-often-treat-negative-numbers': { steps: ['Draw a vertical number line (like a thermometer or building floors).', 'Ask the student to place 0 in the middle.', 'Ask them to point to -5 and -10.', 'Ask, "If you are standing at -5, do you need to go up or down to reach -10?" Since they must go down, -10 is lower.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_019', difficulty: 'standard',
          question: 'Adding integers is the process of combining two numbers that include positive.',
          hint: 'Review the "Other Side of Zero" section regarding the number line and floor levels.',
          misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adding integers is the process of combining two numbers that include positive values,',
                  options: ['Adding integers is the process of combining two numbers that include positive values,', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),', 'A number line is a straight line that represents integers as points at equal distances', 'Comparing and ordering integers involves determining the relative size of whole numbers'],
                  hint: 'Review the "Other Side of Zero" section regarding the number line and floor levels.',
                  misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['If a student gets this wrong, have them draw a number line.', 'Ask them to put their finger on the first number (+3).', 'Then, tell them: "The second number is -7, which means move 7 steps to the left." Physically counting the steps.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_020', difficulty: 'standard',
          question: 'Subtraction of integers is the mathematical operation of finding the difference.',
          hint: 'Review the concept of "Zero Pairs" (adding a number to its inverse equals zero).',
          misconception: 'Students often treat the subtraction sign as a "remove" instruction only, failing to realize that subtracting.',
          parts: [
                { id: 'a', prompt: 'What is the rule for subtracting an integer?', answer: 'Subtracting an integer is the same as adding its opposite',
                  options: ['Subtracting an integer is the same as adding its opposite', 'you just make it smaller', 'you always take away'],
                  hint: 'Review the concept of "Zero Pairs" (adding a number to its inverse equals zero).',
                  misconception: 'Students often treat the subtraction sign as a "remove" instruction only, failing to realize that subtracting a negative number acts like.' },
                { id: 'b', prompt: 'Why does the expression 5 - (-3) result in 8 instead of 2?', answer: 'Because subtracting a negative is equivalent to adding a positive (5 + 3 = 8)',
                  options: ['Because subtracting a negative is equivalent to adding a positive (5 + 3 = 8)', 'double negative'],
                  hint: 'Review the concept of "Zero Pairs" (adding a number to its inverse equals zero).',
                  misconception: 'Students often treat the subtraction sign as a "remove" instruction only, failing to realize that subtracting a negative number acts like.' }
          ],
            remediations: { 'students-often-treat-the-subtraction': { steps: ['If a student fails, have them draw a "Building of Fun" number line.', 'Ask them: "If you are on -2 and the operator removes a negative (a red token), what happens to your total?" Show them.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_021', difficulty: 'standard',
          question: 'The additive inverse of an integer is another integer that, when added to the.',
          hint: 'Review the "Building of Fun" or thermometer models of the number line.',
          misconception: 'Students often believe that the additive inverse of a negative number must also be negative.',
          parts: [
                { id: 'a', prompt: 'What is the additive inverse of -15?', answer: 'The additive inverse is +15',
                  options: ['The additive inverse is +15', 'reveals that the student confuses', 'the identity', 'the additive inverse of a negative number must also be negative'],
                  hint: 'Review the "Building of Fun" or thermometer models of the number line.',
                  misconception: 'Students often believe that the additive inverse of a negative number must also be negative.' },
                { id: 'b', prompt: 'If your bank account balance is -₹50 (a debt), what amount must be credited to make your balance exactly ₹0?', answer: 'You must credit ₹50',
                  options: ['You must credit ₹50', 'the additive inverse of a negative number must also be negative'],
                  hint: 'Review the "Building of Fun" or thermometer models of the number line.',
                  misconception: 'Students often believe that the additive inverse of a negative number must also be negative.' },
                { id: 'c', prompt: 'Compare the additive inverse of 7 with the additive inverse of -7. Are they the same?', answer: 'No, they are not the same',
                  options: ['No, they are not the same', 'the additive inverse of a negative number must also be negative'],
                  hint: 'Review the "Building of Fun" or thermometer models of the number line.',
                  misconception: 'Students often believe that the additive inverse of a negative number must also be negative.' }
          ],
            remediations: { 'the-additive-inverse-of-a': { steps: ['To fix this, draw a vertical number line (like a thermometer).', 'Ask the student: "If you are at -8°C, how many degrees must you move to reach 0°C?" When they say "up 8 degrees," write.', 'Explain that since -8 + 8 = 0, the number +8 is the inverse.', 'Repeat this with a positive example to show the pattern.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
