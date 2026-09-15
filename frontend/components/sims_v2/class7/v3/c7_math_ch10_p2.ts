import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch10_p2: SimDef = {
    id: 'v3_c7_math_ch10_p2',
    title: 'Operations with Integers · Part 2/2',
    subtitle: 'Covers the commutative property for the multiplication of two or more integers, including.',
    classLevel: 7, subject: 'mathematics', topic: 'Operations with Integers · Part 2/2',
    chapters: ['c7_math_ch10'],
    nodeIds: ['c7_math_ch10_007', 'c7_math_ch10_008', 'c7_math_ch10_009', 'c7_math_ch10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a school sports event in Delhi, arranging chairs for the annual function.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A weather app shows Shimla at -4 degrees and Srinagar at -7 degrees. A friend says Shimla is colder because 4 is less than 7. Settle the argument with the number line.',
        options: ['Srinagar is colder — -7 sits further left of zero than -4, and leftward always means smaller', 'Shimla is colder — 4 is the smaller digit', 'Both are equally cold — negatives are all the same', 'Shimla is colder — smaller numbers are always colder'],
        answer: 'Srinagar is colder — -7 sits further left of zero than -4, and leftward always means smaller',
        hook: 'Zero is the neutral border, neither positive nor negative. An elevator proves the logic: up 5, down 8, up 3 lands you right back at 0 — every step is just a signed number doing its job.',
    },
    teaching: [
        { title: 'Properties of Integer Multiplication: Commutativity', text: 'The commutative property of integer multiplication states that changing the order of two integers being multiplied does not change their product; mathematically expressed as $a \\times b = b \\times a$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch10_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Ride the floors — start at ground 0, go up 5, down 8, up 3 — then rank three negative temperatures from warmest to coldest on the number line.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_007', title: 'Properties of Integer Multiplication: Commutativity',
          scaffold: { problem: 'A store in Jaipur records a daily stock loss of 8 items for 15 consecutive days, represented as $15 \\times (-8)$.',
            steps: [
            { text: 'Identify the given expression: $15 \\times (-8)$.' },
            { text: 'Apply the commutative property of multiplication ($a \\times b = b \\times a$) to swap the factors: $(-8) \\times 15$.' },
            { text: 'Determine the sign of the product using integer sign rules (negative $\\times$ positive = negative).' },
            { text: 'Multiply the absolute values: $8 \\times 15 = 120$.' },
            { text: 'Attach the negative sign to get the final product: $-120$ items.', faded: true, blankAnswer: '-120 items' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_008', title: 'Division of Integers: Sign Rules',
          scaffold: { problem: 'A submarine is descending into the Indian Ocean. Over 5 equal time intervals, its total change in depth is −350 metres.',
            steps: [
            { text: 'Identify the total change in depth (dividend) as −350 metres and the number of intervals (divisor) as $+5$.' },
            { text: 'Set up the integer division expression: $(-350) \\div (+5)$.' },
            { text: 'Apply the sign rule for unlike signs (negative divided by positive), which states the quotient will be negative.' },
            { text: 'Divide the absolute values: $350 \\div 5 = 70$.' },
            { text: 'Combine the sign and absolute value to get the final result with units: $-70$ metres per interval.', faded: true, blankAnswer: '−70 metres per interval' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_009', title: 'Word Problems with Integers (Temperature, Elevation)',
          scaffold: { problem: 'At 5:00 AM, the temperature in a mountain village was -8 °C. By 2:00 PM, the temperature rose by 12 °C.',
            steps: [
            { text: 'Identify the initial temperature at 5:00 AM as an integer, which is -8 °C.' },
            { text: 'Account for the first change (rise of 12 °C), which is represented by adding +12.' },
            { text: 'Compute the afternoon temperature: -8 + 12 = +4 °C.' },
            { text: 'Account for the second change (drop of 15 °C), which is represented by subtracting 15 or adding -15.' },
            { text: 'Compute the final midnight temperature: +4 - 15 = -11 °C.', faded: true, blankAnswer: '-11 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_010', title: 'Patterns in Integer Operations: Exploring Properties',
          scaffold: { problem: 'A submarine in the Indian Ocean descends at a steady rate of 25 metres per minute.',
            steps: [
            { text: 'Write the given rate and initial known calculations for positive time: $(-25) \\times 3 = -75$, $(-25) \\times 2 = -50$.' },
            { text: 'Identify the pattern rule in the products: as the time multiplier decreases by 1 unit, the product increases by 25.' },
            { text: 'Extend the pattern downward to 0 and negative time multipliers: $(-25) \\times 0 = 0$, $(-25) \\times (-1) = +25$, $(-25).' },
            { text: 'Continue the pattern for the final required step: $(-25) \\times (-3) = +50 + 25 = +75$.' },
            { text: 'Interpret the result in context: mathematically, the pattern reveals $+75$ metres, indicating position relative to.', faded: true, blankAnswer: '+75 metres' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch10_010', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A weather app shows Leh at −15°C and Kufri at −5°C. Planning a trip, Amaan says, \'Fifteen is bigger than five, so −15°C is the warmer place — let us go to Leh and pack light.\'',
            decisions: [{ prompt: 'Where does his reasoning break down?', options: [
                { text: 'On a number line, −15 sits further left of zero than −5, so it is the lower value — Leh at −15°C is colder, and he needs the heavy jackets, not light packing.', outcome: 'This reads signed numbers by position: among negatives, the bigger digit means a deeper deficit below zero, i.e. a smaller temperature.' },
                { text: 'Amaan is right — 15 beats 5, so −15°C must be warmer than −5°C.', outcome: 'The minus sign reverses the ordering: −15 is further below zero, meaning colder, not warmer.', reveals: 'bigger-digit-warmer' },
                { text: 'Both towns are below zero, so they are equally cold and the digits do not matter.', outcome: 'Negative values still have order — a −15 night can freeze what −5 cannot, so the digits matter a great deal.', reveals: 'all-negatives-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch10_010', title: 'You made it',
          caseStudy: { intro: 'On the left of zero, bigger digits mean smaller values. The minus sign reverses everything — that is its whole job.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch10_007', difficulty: 'standard',
          question: 'The commutative property of integer multiplication states that changing the.',
          hint: 'Review c7_math_ch10_004 and c7_math_ch10_006 to practice basic signed integer.',
          misconception: 'Students often believe that swapping the positions of negative numbers alters the sign of the final product, thinking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The commutative property of integer multiplication states that changing the order of two',
                  options: ['The commutative property of integer multiplication states that changing the order of two', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Subtraction of integers involves finding the difference between two integers by adding'],
                  hint: 'Review c7_math_ch10_004 and c7_math_ch10_006 to practice basic signed integer multiplication.',
                  misconception: 'Students often believe that swapping the positions of negative numbers alters the sign of the final product, thinking that $(-a) \\times b$.' }
          ],
            remediations: { 'swapping-the-positions-of-negative': { steps: ['Remind the student that the commutative property is about order, not value alteration.', 'Write out both forms side-by-side: $(-4) \\times 5 = -20$ and $5 \\times (-4) = -20$.', 'Point out that the numbers simply traded places, but the sign rule (negative $\\times$ positive = negative) remains.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_008', difficulty: 'standard',
          question: 'The division of integers follows specific sign rules: dividing two integers.',
          hint: 'Review multiplication of integers (c7_math_ch10_004) to remember how signs interact.',
          misconception: 'Students often apply addition rules to division, mistakenly believing that two negative signs combine to make the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The division of integers follows specific sign rules: dividing two integers with like',
                  options: ['The division of integers follows specific sign rules: dividing two integers with like', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Subtraction of integers involves finding the difference between two integers by adding'],
                  hint: 'Review multiplication of integers (c7_math_ch10_004) to remember how signs interact.',
                  misconception: 'Students often apply addition rules to division, mistakenly believing that two negative signs combine to make the result more negative.' }
          ],
            remediations: { 'students-often-apply-addition-rules': { steps: ['Remind the student of the family of facts connecting multiplication and division: if $3 \\times (-4) = -12$, then $(-12).', 'Have them write down the sign rule card: Like signs (+ and +, or − and −) always make a POSITIVE quotient; Unlike signs.', 'Walk through crossing out the negative signs in $(-12) \\div (-4)$ to visually show them canceling out into a positive.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'standard',
          question: 'Word problems with integers involve translating real-world scenarios—such.',
          hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level".',
          parts: [
                { id: 'a', prompt: 'At 6:00 PM, the temperature in Shimla was 2 °C. By midnight, the temperature dropped by 5 °C. Which integer represents the temperature at midnight?', answer: '-3 °C',
                  options: ['-3 °C', 'below sea level', 'temperature drop'],
                  hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting word problems.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'b', prompt: 'A miner is working in a coal mine at an elevation of -65 metres.', answer: '-40 metres',
                  options: ['-40 metres', 'below sea level', 'temperature drop'],
                  hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting word problems.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'c', prompt: 'Two mountaineers start at different elevations. Mountaineer A is at an elevation of +1,200 metres, and Mountaineer B is at an elevation of -150 metres (in.', answer: '1,350 metres (or -1,350 metres depending on direction of subtraction)',
                  options: ['1,350 metres (or -1,350 metres depending on direction of subtraction)', 'below sea level', 'temperature drop'],
                  hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting word problems.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level".',
          parts: [
                { id: 'a', prompt: 'A student solves a temperature problem: "The temperature started at -4 °C and rose by 7 °C.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'below sea level', 'temperature drop'],
                  hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting word problems.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_010', difficulty: 'standard',
          question: 'Patterns in integer operations involve observing, analyzing, and generalizing.',
          hint: 'Review c7_math_ch10_005 to reinforce why multiplying two negative integers yields.',
          misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives.',
          parts: [
                { id: 'a', prompt: 'Study the pattern: $(-3) \\times 4 = -12$, $(-3) \\times 3 = -9$, $(-3) \\times 2 = -6$, $(-3) \\times 1 = -3$, $(-3) \\times 0 = 0$.', answer: 'The next calculation is $(-3) \\times (-1) = +3$',
                  options: ['The next calculation is $(-3) \\times (-1) = +3$', 'negatives make things smaller or worse'],
                  hint: 'Review c7_math_ch10_005 to reinforce why multiplying two negative integers yields a positive.',
                  misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives make things smaller.' }
          ],
            remediations: { 'operations-involving-negative-numbers-always': { steps: ['When a student makes this error, guide them to write out the full sequence of numbers on a vertical table.', 'Point to the multiplier column and ask: "As the multiplier goes down from 1 to 0, and then to $-1$, what is happening.', 'Emphasize that the rule of the pattern dictates the next number, overriding intuition about the word "negative."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
