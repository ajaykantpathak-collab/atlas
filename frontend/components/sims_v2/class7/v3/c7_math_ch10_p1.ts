import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch10_p1: SimDef = {
    id: 'v3_c7_math_ch10_p1',
    title: 'Operations with Integers · Part 1/2',
    subtitle: 'Covers the conceptual identification and ordering of positive integers, negative.',
    classLevel: 7, subject: 'mathematics', topic: 'Operations with Integers · Part 1/2',
    chapters: ['c7_math_ch10'],
    nodeIds: ['c7_math_ch10_001', 'c7_math_ch10_002', 'c7_math_ch10_003', 'c7_math_ch10_004', 'c7_math_ch10_005', 'c7_math_ch10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are standing at ground level in a multi-story parking building in Delhi.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A weather app shows Shimla at -4 degrees and Srinagar at -7 degrees. A friend says Shimla is colder because 4 is less than 7. Settle the argument with the number line.',
        options: ['Srinagar is colder — -7 sits further left of zero than -4, and leftward always means smaller', 'Shimla is colder — 4 is the smaller digit', 'Both are equally cold — negatives are all the same', 'Shimla is colder — smaller numbers are always colder'],
        answer: 'Srinagar is colder — -7 sits further left of zero than -4, and leftward always means smaller',
        hook: 'Zero is the neutral border, neither positive nor negative. An elevator proves the logic: up 5, down 8, up 3 lands you right back at 0 — every step is just a signed number doing its job.',
    },
    teaching: [
        { title: 'Recap of Integers: Positive, Negative and Zero', text: 'Integers are a set of numbers that include all whole numbers and their negative counterparts, represented as $\\{..., -3, -2, -1, 0, 1, 2, 3, ...\\}$, where positive integers lie to the right of zero.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch10_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Ride the floors — start at ground 0, go up 5, down 8, up 3 — then rank three negative temperatures from warmest to coldest on the number line.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_002', title: 'Addition of Integers Using Number Line',
          scaffold: { problem: 'A bank account has a balance of ₹$-400$ (an overdraft). The customer deposits ₹$+700$. Use a number line model to find the new balance.',
            steps: [
            { text: 'Identify the starting position from the initial value, which is $-400$ on the number line.' },
            { text: 'Identify the operation and displacement: adding a positive deposit of $+700$ means moving to the right by $700$ units.' },
            { text: 'Perform the movement: starting from $-400$, move right by $400$ units to reach $0$, and then move another $300$ units.' },
            { text: 'Write down the mathematical expression and result: $(-400) + (+700) = +300$.' },
            { text: 'Interpret the final result with units: The new bank account balance is ₹$+300$ (a positive balance).', faded: true, blankAnswer: '₹$+300$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_003', title: 'Subtraction of Integers: Rules and Examples',
          scaffold: { problem: 'At 6:00 AM, the temperature in a mountain town in Himachal Pradesh was $-4^\\circ\\text{C}$.',
            steps: [
            { text: 'Identify the given values: 6:00 AM temperature = $-4^\\circ\\text{C}$, 2:00 PM temperature = $7^\\circ\\text{C}$, midnight.' },
            { text: 'Calculate the midnight temperature by subtracting the drop from the 2:00 PM reading: $7 - 11$.' },
            { text: 'Apply integer subtraction rule: $7 - 11 = 7 + (-11) = -4^\\circ\\text{C}$.' },
            { text: 'Calculate the temperature difference between 6:00 AM and midnight: $\\text{Midnight temperature} - \\text{6:00.' },
            { text: 'Apply the double negative rule: $-4 - (-4) = -4 + 4 = 0^\\circ\\text{C}$.', faded: true, blankAnswer: 'Midnight temperature is $-4^\\circ\\text{C}$ and the total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_004', title: 'Multiplication of Integers: Sign Rules',
          scaffold: { problem: 'A stock market tracker records a daily drop of 15 rupees in a share price for 4 consecutive days.',
            steps: [
            { text: 'Identify the given values and their signs. A daily drop of 15 rupees is represented as $-15$.' },
            { text: 'Set up the multiplication expression representing total change: $4 \\times (-15)$.' },
            { text: 'Apply the sign rule for multiplying a positive integer and a negative integer (+ $\\times$ - = -).' },
            { text: 'Multiply the absolute values: $4 \\times 15 = 60$, and apply the negative sign to get $-60$.' },
            { text: 'Verify the result with units: The total price change is $-60$ rupees (a loss of 60 rupees).', faded: true, blankAnswer: '-60 rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_005', title: 'Multiplying Two Negative Integers: Product is Positive',
          scaffold: { problem: 'A stock market investor records a loss of ₹15 per share on 4 specific shares, represented as $-15$ per share.',
            steps: [
            { text: 'Identify the given integers from the problem: $-15$ (loss per share) and $-2$ (the double reversal factor).' },
            { text: 'Set up the multiplication expression: $(-15) \\times (-2)$.' },
            { text: 'Multiply the absolute values of the numbers: $15 \\times 2 = 30$.' },
            { text: 'Apply the sign rule for multiplying two negative integers, which changes the product to positive: $+30$.' },
            { text: 'Interpret the result: The double reversal turns the negative transaction into a positive credit of ₹30.', faded: true, blankAnswer: '+30 (or ₹30 credit)' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_006', title: 'Multiplying Positive and Negative Integers',
          scaffold: { problem: 'A merchant incurs a loss of 15 rupees on each defective toy he sells.',
            steps: [
            { text: 'Identify the given values: loss per toy is $-15$ rupees, and the number of toys sold is $8$ (positive integer).' },
            { text: 'Set up the multiplication expression representing the total change: $8 \\times (-15)$.' },
            { text: 'Multiply the absolute values of the numbers: $8 \\times 15 = 120$.' },
            { text: 'Apply the sign rule for multiplying a positive integer by a negative integer: positive $\\times$ negative = negative,.' },
            { text: 'Interpret the result with proper units: the total financial change is $-120$ rupees (representing a loss of 120 rupees).', faded: true, blankAnswer: '-120 rupees' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch10_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A weather app shows Leh at −15°C and Kufri at −5°C. Planning a trip, Amaan says, \'Fifteen is bigger than five, so −15°C is the warmer place — let us go to Leh and pack light.\'',
            decisions: [{ prompt: 'Where does his reasoning break down?', options: [
                { text: 'On a number line, −15 sits further left of zero than −5, so it is the lower value — Leh at −15°C is colder, and he needs the heavy jackets, not light packing.', outcome: 'This reads signed numbers by position: among negatives, the bigger digit means a deeper deficit below zero, i.e. a smaller temperature.' },
                { text: 'Amaan is right — 15 beats 5, so −15°C must be warmer than −5°C.', outcome: 'The minus sign reverses the ordering: −15 is further below zero, meaning colder, not warmer.', reveals: 'bigger-digit-warmer' },
                { text: 'Both towns are below zero, so they are equally cold and the digits do not matter.', outcome: 'Negative values still have order — a −15 night can freeze what −5 cannot, so the digits matter a great deal.', reveals: 'all-negatives-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch10_006', title: 'The bigger picture',
          caseStudy: { intro: 'On the left of zero, bigger digits mean smaller values. The minus sign reverses everything — that is its whole job.',
            decisions: [{ prompt: 'What comes next? Operations with Integers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Operations with Integers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch10_001', difficulty: 'standard',
          question: 'Integers are a set of numbers that include all whole numbers and their negative.',
          hint: 'Review Class 6 concepts on integers on the number line (c6_math_ch02_017) to visualize.',
          misconception: 'Students often confuse the absolute magnitude of digits with the value of negative numbers, assuming that a larger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integers are a set of numbers that include all whole numbers and their negative',
                  options: ['Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Subtraction of integers involves finding the difference between two integers by adding', 'The sign rules for multiplication of integers state that the product of two integers with'],
                  hint: 'Review Class 6 concepts on integers on the number line (c6_math_ch02_017) to visualize how numbers.',
                  misconception: 'Students often confuse the absolute magnitude of digits with the value of negative numbers, assuming that a larger numeral with a negative.' }
          ],
            remediations: { 'students-often-confuse-the-absolute': { steps: ['Remind the student to visualize a horizontal number line where numbers increase as you move right and decrease as you.', 'Have them draw a vertical thermometer or number line: place $-12$ and $-98$ on it.', 'Ask: "If you owe a friend ₹98 versus owing ₹12, which financial situation is worse (smaller value)?" Show them that.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_002', difficulty: 'standard',
          question: 'The addition of integers using a number line is a visual method where positive.',
          hint: 'Review c6_math_ch02_017 to practice locating integers and understanding that numbers.',
          misconception: 'Students often confuse the sign of the integer being added with the operation sign, resulting in wrong directional.',
          parts: [
                { id: 'a', prompt: 'What direction on a horizontal number line do you move when adding a positive integer?', answer: 'You move to the right',
                  options: ['You move to the right', 'to the left', '"to the left"'],
                  hint: 'Review c6_math_ch02_017 to practice locating integers and understanding that numbers to the right.',
                  misconception: 'Students often confuse the sign of the integer being added with the operation sign, resulting in wrong directional movement.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['Guide the student by breaking the expression into two parts: "Where do we start?" and "Which way do we walk?" Have them.', 'Then, tell them: "Look at the sign attached directly to the second number—if it\'s a minus sign, face left; if it\'s.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_003', difficulty: 'standard',
          question: 'Subtraction of integers involves finding the difference between two integers.',
          hint: 'Review c7_math_ch10_001 to reinforce the concept of opposite numbers and additive.',
          misconception: 'Students frequently drop or misapply negative signs when converting subtraction to addition, especially when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subtraction of integers involves finding the difference between two integers by adding',
                  options: ['Subtraction of integers involves finding the difference between two integers by adding', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'The sign rules for multiplication of integers state that the product of two integers with'],
                  hint: 'Review c7_math_ch10_001 to reinforce the concept of opposite numbers and additive inverses.',
                  misconception: 'Students frequently drop or misapply negative signs when converting subtraction to addition, especially when encountering consecutive.' }
          ],
            remediations: { 'students-frequently-drop-or-misapply': { steps: ['When a student makes this sign error, pause and ask them to circle the two adjacent signs in the middle of the.', 'Remind them of the rule: "Two negatives side by side combine to make a big positive plus sign." Have them rewrite the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_004', difficulty: 'standard',
          question: 'The sign rules for multiplication of integers state that the product of two.',
          hint: 'Review Class 6 integer multiplication and the number line model of jumps to visualize why.',
          misconception: 'Students often apply the rules of integer addition (such as "keeping the sign of the larger absolute value").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sign rules for multiplication of integers state that the product of two integers with',
                  options: ['The sign rules for multiplication of integers state that the product of two integers with', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Subtraction of integers involves finding the difference between two integers by adding'],
                  hint: 'Review Class 6 integer multiplication and the number line model of jumps to visualize why signs.',
                  misconception: 'Students often apply the rules of integer addition (such as "keeping the sign of the larger absolute value") to multiplication.' }
          ],
            remediations: { 'students-often-apply-the-rules': { steps: ['Remind the student that multiplication is shorthand for repeated addition, not addition itself.', 'Show them that $(-5) \\times 2$ means adding $-5$ twice: $(-5) + (-5) = -10$.', 'Emphasize the sign rule memory aid: "Friends of my friends are friends (+), enemies of my enemies are friends (+).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_005', difficulty: 'standard',
          question: 'The multiplication of two negative integers always yields a positive product.',
          hint: 'Review c7_math_ch10_004 to practice single-sign integer multiplication and number line.',
          misconception: 'Students often carry over the addition rule for integers—where adding two negative numbers results in a more negative.',
          parts: [
                { id: 'a', prompt: 'What is the sign of the product when you multiply two negative integers together?', answer: 'The sign of the product is positive',
                  options: ['The sign of the product is positive', 'negative'],
                  hint: 'Review c7_math_ch10_004 to practice single-sign integer multiplication and number line patterns.',
                  misconception: 'Students often carry over the addition rule for integers—where adding two negative numbers results in a more negative number—into.' }
          ],
            remediations: { 'students-often-carry-over-the': { steps: ['Remind the student to check the operation: addition combines debts, but multiplication by a negative represents.', 'Write out the pattern starting from a positive multiplier decreasing through zero to negative multipliers to show the.', 'Have them circle both negative signs and cross them out to form a plus sign: $(-)\\times(-) = (+)$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often carry over the addition rule for integers—where adding two negative numbers results in a more negative.',
          parts: [
                { id: 'a', prompt: 'Evaluate the student work for this expression: $(-9) \\times (-3) = -27$. Is this correct? If not, identify the exact error and state the correct answer.', answer: 'The student work is incorrect',
                  options: ['The student work is incorrect', 'this is correct is confusing integer multiplication signs with addition rules'],
                  hint: 'Review c7_math_ch10_004 to practice single-sign integer multiplication and number line patterns.',
                  misconception: 'Students often carry over the addition rule for integers—where adding two negative numbers results in a more negative number—into.' }
          ],
            remediations: { 'students-often-carry-over-the': { steps: ['Remind the student to check the operation: addition combines debts, but multiplication by a negative represents.', 'Write out the pattern starting from a positive multiplier decreasing through zero to negative multipliers to show the.', 'Have them circle both negative signs and cross them out to form a plus sign: $(-)\\times(-) = (+)$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_006', difficulty: 'standard',
          question: 'The product of a positive integer and a negative integer is always a negative.',
          hint: 'Review c7_math_ch10_004 to practice basic sign rules and absolute value multiplication.',
          misconception: 'Students often apply the rule "two negatives make a positive" indiscriminately to any multiplication problem containing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of a positive integer and a negative integer is always a negative integer,',
                  options: ['The product of a positive integer and a negative integer is always a negative integer,', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Subtraction of integers involves finding the difference between two integers by adding'],
                  hint: 'Review c7_math_ch10_004 to practice basic sign rules and absolute value multiplication.',
                  misconception: 'Students often apply the rule "two negatives make a positive" indiscriminately to any multiplication problem containing a negative sign.' }
          ],
            remediations: { 'students-often-apply-the-rule': { steps: ['Guide the student by separating the problem into two distinct steps: sign determination and magnitude calculation.', 'Say: "First, ignore the signs and multiply the numbers normally ($6 \\times 5 = 30$).', 'Second, look at the original signs: one is negative and one is positive, which are unlike signs.', 'Unlike signs always fight and make a negative product, so put a negative sign in front to get $-30$." Reinforce this.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
