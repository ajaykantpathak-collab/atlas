import type { SimDef } from '../../engine/types';
import C7_MathematicsMultiplicationDivisionIntegersSim from '../../../simulations/c6_12/C7_MathematicsMultiplicationDivisionIntegersSim';

/** v3 wrapped master — C7_MathematicsMultiplicationDivisionIntegersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsmultiplicationdivisionintegerssim: SimDef = {
    id: 'v3w_c7_mathematicsmultiplicationdivisionintegerssim',
    title: 'Multiplication Division Integers',
    subtitle: 'Covers the conceptual identification and ordering of positive integers, negative.',
    classLevel: 7, subject: 'mathematics', topic: 'Recap of Integers: Positive, Negative and Zero',
    chapters: [],
    nodeIds: ['c7_math_ch10_001', 'c7_math_ch10_002', 'c7_math_ch10_006', 'c7_math_ch10_009', 'c7_math_ch10_010', 'c7_math_ch02_002', 'c7_math_ch02_008', 'c7_math_ch02_010', 'c7_math_ch04_006', 'c7_math_ch04_007', 'c7_math_ch01_011', 'c7_math_ch15_004', 'c7_math_ch10_008', 'c7_math_ch10_004', 'c7_math_ch10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are standing at ground level in a multi-story parking building in Delhi.', goal: 'Master Multiplication Division Integers.' },
    discovery: {
        question: 'At 6:00 PM, the temperature in Shimla was 2 °C. By midnight, the temperature dropped by 5 °C. Which integer represents the temperature at midnight?',
        options: ['The correct answer is -3 °C', 'below sea level', 'temperature drop'],
        answer: 'The correct answer is -3 °C',
        hook: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
    },
    teaching: [
        { title: 'Integers are a set of numbers that include.', text: 'Integers are a set of numbers that include all whole numbers and their negative counterparts, represented as $\\{..., -3, -2, -1, 0, 1, 2, 3, ...\\}$, where positive integers lie to the right of zero,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch10_001', title: 'Integers are a set of numbers that.',
          scaffold: { problem: 'During a winter night in Ladakh, the temperature dropped from $+4^\\circ\\text{C}$ at sunset to $-6^\\circ\\text{C}$ by midnight.',
            steps: [
            { text: 'Identify the given temperature at sunset as $+4^\\circ\\text{C}$ (above zero, positive) and midnight as.' },
            { text: 'Set up a number line reference where $0$ is the freezing point, positive numbers are to the right, and negative numbers.' },
            { text: 'Locate $+4$ and $-6$ on the number line to compare their positions relative to zero.' },
            { text: 'Analyze position: $-6$ lies to the left of $+4$, meaning $-6$ is smaller than $+4$.' },
            { text: 'Verify with units: $-6^\\circ\\text{C}$ is colder than $+4^\\circ\\text{C}$.', faded: true, blankAnswer: '$+4^\\circ\\text{C}$ and $-6^\\circ\\text{C}$;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_002', title: 'The addition of integers using a number.',
          scaffold: { problem: 'A bank account has a balance of ₹$-400$ (an overdraft). The customer deposits ₹$+700$. Use a number line model to find the new balance.',
            steps: [
            { text: 'Identify the starting position from the initial value, which is $-400$ on the number line.' },
            { text: 'Identify the operation and displacement: adding a positive deposit of $+700$ means moving to the right by $700$ units.' },
            { text: 'Perform the movement: starting from $-400$, move right by $400$ units to reach $0$, and then move another $300$ units.' },
            { text: 'Write down the mathematical expression and result: $(-400) + (+700) = +300$.' },
            { text: 'Interpret the final result with units: The new bank account balance is ₹$+300$ (a positive balance).', faded: true, blankAnswer: '₹$+300$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_006', title: 'The product of a positive integer and a.',
          scaffold: { problem: 'A merchant incurs a loss of 15 rupees on each defective toy he sells.',
            steps: [
            { text: 'Identify the given values: loss per toy is $-15$ rupees, and the number of toys sold is $8$ (positive integer).' },
            { text: 'Set up the multiplication expression representing the total change: $8 \\times (-15)$.' },
            { text: 'Multiply the absolute values of the numbers: $8 \\times 15 = 120$.' },
            { text: 'Apply the sign rule for multiplying a positive integer by a negative integer: positive $\\times$ negative = negative, so.' },
            { text: 'Interpret the result with proper units: the total financial change is $-120$ rupees (representing a loss of 120 rupees).', faded: true, blankAnswer: '-120 rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_009', title: 'Word problems with integers involve.',
          scaffold: { problem: 'At 5:00 AM, the temperature in a mountain village was -8 °C. By 2:00 PM, the temperature rose by 12 °C.',
            steps: [
            { text: 'Identify the initial temperature at 5:00 AM as an integer, which is -8 °C.' },
            { text: 'Account for the first change (rise of 12 °C), which is represented by adding +12.' },
            { text: 'Compute the afternoon temperature: -8 + 12 = +4 °C.' },
            { text: 'Account for the second change (drop of 15 °C), which is represented by subtracting 15 or adding -15.' },
            { text: 'Compute the final midnight temperature: +4 - 15 = -11 °C.', faded: true, blankAnswer: '-11 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_010', title: 'Patterns in integer operations involve.',
          scaffold: { problem: 'A submarine in the Indian Ocean descends at a steady rate of 25 metres per minute.',
            steps: [
            { text: 'Write the given rate and initial known calculations for positive time: $(-25) \\times 3 = -75$, $(-25) \\times 2 = -50$,.' },
            { text: 'Identify the pattern rule in the products: as the time multiplier decreases by 1 unit, the product increases by 25.' },
            { text: 'Extend the pattern downward to 0 and negative time multipliers: $(-25) \\times 0 = 0$, $(-25) \\times (-1) = +25$, $(-25).' },
            { text: 'Continue the pattern for the final required step: $(-25) \\times (-3) = +50 + 25 = +75$.' },
            { text: 'Interpret the result in context: mathematically, the pattern reveals $+75$ metres, indicating position relative to a.', faded: true, blankAnswer: '+75 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_002', title: 'Evaluating an arithmetic expression.',
          scaffold: { problem: 'Riya went to a book fair in Kolkata and bought 4 storybooks at ₹50 each and 3 science comics at ₹30 each.',
            steps: [
            { text: 'Identify the given expression: $4 \\times 50 + 3 \\times 30 + 20 - 15$.' },
            { text: 'Apply BODMAS by identifying multiplication operations that must be computed first: $4 \\times 50$ and $3 \\times 30$.' },
            { text: 'Compute the multiplications: $4 \\times 50 = 200$ and $3 \\times 30 = 90$, so the expression updates to $200 + 90 + 20 -.' },
            { text: 'Perform addition and subtraction from left to right: first compute $200 + 90 = 290$, then $290 + 20 = 310$, and finally.' },
            { text: 'Verify the steps and append the correct unit (rupees): Total amount paid is ₹295.', faded: true, blankAnswer: '₹295' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch10_002', title: 'Identify each idea',
          dissect: { specimen: 'Multiplication Division Integers', spots: [
            { id: 's1', label: 'Integers are a set of', prompt: 'Which idea is this? — Integers are a set of numbers that include all whole numbers and their negative.', answer: 'Integers are a set of', options: ['Integers are a set of', 'The addition of integers using', 'The product of a positive', 'Word problems with integers involve'] },
            { id: 's2', label: 'The addition of integers using', prompt: 'Which idea is this? — The addition of integers using a number line is a visual method where positive integers.', answer: 'The addition of integers using', options: ['The addition of integers using', 'Integers are a set of', 'The product of a positive', 'Word problems with integers involve'] },
            { id: 's3', label: 'The product of a positive', prompt: 'Which idea is this? — The product of a positive integer and a negative integer is always a negative integer,.', answer: 'The product of a positive', options: ['The product of a positive', 'Integers are a set of', 'The addition of integers using', 'Word problems with integers involve'] },
            { id: 's4', label: 'Word problems with integers involve', prompt: 'Which idea is this? — Word problems with integers involve translating real-world scenarios—such as changing.', answer: 'Word problems with integers involve', options: ['Word problems with integers involve', 'Integers are a set of', 'The addition of integers using', 'The product of a positive'] },
            { id: 's5', label: 'Patterns in integer operations involve', prompt: 'Which idea is this? — Patterns in integer operations involve observing, analyzing, and generalizing.', answer: 'Patterns in integer operations involve', options: ['Patterns in integer operations involve', 'Integers are a set of', 'The addition of integers using', 'The product of a positive'] },
            { id: 's6', label: 'Evaluating an arithmetic expression requires', prompt: 'Which idea is this? — Evaluating an arithmetic expression requires computing its final numerical value by.', answer: 'Evaluating an arithmetic expression requires', options: ['Evaluating an arithmetic expression requires', 'Integers are a set of', 'The addition of integers using', 'The product of a positive'] }
          ] } }
    ],
    explore: { component: C7_MathematicsMultiplicationDivisionIntegersSim, prompt: 'Explore the interactive — Multiplication Division Integers' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch10_001', difficulty: 'standard',
          question: 'Integers are a set of numbers that include all whole numbers and their negative.',
          hint: 'Review Class 6 concepts on integers on the number line (c6_math_ch02_017) to visualize.',
          misconception: 'Students often confuse the absolute magnitude of digits with the value of negative numbers, assuming that a larger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integers are a set of numbers that include all whole numbers and their negative',
                  options: ['Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'The product of a positive integer and a negative integer is always a negative integer,', 'Word problems with integers involve translating real-world scenarios—such as changing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the absolute magnitude of digits with the value of negative numbers, assuming that a larger numeral with a negative.' }
          ],
            remediations: { 'students-often-confuse-the-absolute': { steps: ['Remind the student to visualize a horizontal number line where numbers increase as you move right and decrease as you.', 'Have them draw a vertical thermometer or number line: place $-12$ and $-98$ on it.', 'Ask: "If you owe a friend ₹98 versus owing ₹12, which financial situation is worse (smaller value)?" Show them that.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_002', difficulty: 'standard',
          question: 'The addition of integers using a number line is a visual method where positive.',
          hint: 'Review c6_math_ch02_017 to practice locating integers and understanding that numbers to.',
          misconception: 'Students often confuse the sign of the integer being added with the operation sign, resulting in wrong directional.',
          parts: [
                { id: 'a', prompt: 'What direction on a horizontal number line do you move when adding a positive integer?', answer: 'You move to the right',
                  options: ['You move to the right', 'to the left'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the sign of the integer being added with the operation sign, resulting in wrong directional movement.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['Guide the student by breaking the expression into two parts: "Where do we start?" and "Which way do we walk?" Have them.', 'Then, tell them: "Look at the sign attached directly to the second number—if it\'s a minus sign, face left; if it\'s a.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_006', difficulty: 'standard',
          question: 'The product of a positive integer and a negative integer is always a negative.',
          hint: 'Review c7_math_ch10_004 to practice basic sign rules and absolute value multiplication.',
          misconception: 'Students often apply the rule "two negatives make a positive" indiscriminately to any multiplication problem containing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of a positive integer and a negative integer is always a negative integer,',
                  options: ['The product of a positive integer and a negative integer is always a negative integer,', 'Integers are a set of numbers that include all whole numbers and their negative', 'The addition of integers using a number line is a visual method where positive integers', 'Word problems with integers involve translating real-world scenarios—such as changing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the rule "two negatives make a positive" indiscriminately to any multiplication problem containing a negative sign,.' }
          ],
            remediations: { 'students-often-apply-the-rule': { steps: ['Guide the student by separating the problem into two distinct steps: sign determination and magnitude calculation.', 'Say: "First, ignore the signs and multiply the numbers normally ($6 \\times 5 = 30$).', 'Second, look at the original signs: one is negative and one is positive, which are unlike signs.', 'Unlike signs always fight and make a negative product, so put a negative sign in front to get $-30$." Reinforce this by.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'standard',
          question: 'Word problems with integers involve translating real-world scenarios—such as.',
          hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
          parts: [
                { id: 'a', prompt: 'At 6:00 PM, the temperature in Shimla was 2 °C. By midnight, the temperature dropped by 5 °C. Which integer represents the temperature at midnight?', answer: 'The correct answer is -3 °C',
                  options: ['The correct answer is -3 °C', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'b', prompt: 'A miner is working in a coal mine at an elevation of -65 metres.', answer: 'The correct answer is -40 metres',
                  options: ['The correct answer is -40 metres', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'c', prompt: 'Two mountaineers start at different elevations. Mountaineer A is at an elevation of +1,200 metres, and Mountaineer B is at an elevation of -150 metres (in a.', answer: 'The correct answer is 1,350 metres (or -1,350 metres depending on direction of',
                  options: ['The correct answer is 1,350 metres (or -1,350 metres depending on direction of', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
          parts: [
                { id: 'a', prompt: 'A student solves a temperature problem: "The temperature started at -4 °C and rose by 7 °C.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_010', difficulty: 'standard',
          question: 'Patterns in integer operations involve observing, analyzing, and generalizing.',
          hint: 'Review c7_math_ch10_005 to reinforce why multiplying two negative integers yields a.',
          misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives.',
          parts: [
                { id: 'a', prompt: 'Study the pattern: $(-3) \\times 4 = -12$, $(-3) \\times 3 = -9$, $(-3) \\times 2 = -6$, $(-3) \\times 1 = -3$, $(-3) \\times 0 = 0$.', answer: 'The next calculation is $(-3) \\times (-1) = +3$',
                  options: ['The next calculation is $(-3) \\times (-1) = +3$', 'negatives make things smaller or worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives make things smaller.' }
          ],
            remediations: { 'operations-involving-negative-numbers-always': { steps: ['When a student makes this error, guide them to write out the full sequence of numbers on a vertical table.', 'Point to the multiplier column and ask: "As the multiplier goes down from 1 to 0, and then to $-1$, what is happening.', 'Emphasize that the rule of the pattern dictates the next number, overriding intuition about the word "negative."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following student claim: "Since $5 + (-5) = 0$ and $4 + (-4) = 0$, if I follow the pattern for addition of opposites, $(-5) + 5$ must equal $-0$.".', answer: 'The claim is invalid',
                  options: ['The claim is invalid', 'negatives make things smaller or worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives make things smaller.' }
          ],
            remediations: { 'operations-involving-negative-numbers-always': { steps: ['When a student makes this error, guide them to write out the full sequence of numbers on a vertical table.', 'Point to the multiplier column and ask: "As the multiplier goes down from 1 to 0, and then to $-1$, what is happening.', 'Emphasize that the rule of the pattern dictates the next number, overriding intuition about the word "negative."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_002', difficulty: 'standard',
          question: 'Evaluating an arithmetic expression requires computing its final numerical.',
          hint: 'Review c6_math_ch02_022 and c6_math_ch02_019 to ensure solid foundational computation.',
          misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of.',
          parts: [
                { id: 'a', prompt: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?', answer: 'The letter \'D\' stands for Division',
                  options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of multiplication and.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Circle all multiplication and division chunks (e.g., $5 \\times 2$).', 'Calculate those chunks first.', 'Rewrite the expression with the new values.', 'Now do addition and subtraction from left to right.\' Practice this boxing technique with 3 mixed-operation problems.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
