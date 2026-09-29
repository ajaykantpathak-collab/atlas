import type { SimDef } from '../../engine/types';
import C6_MathematicsNumberLineSeeingSim from '../../../simulations/c6_12/C6_MathematicsNumberLineSeeingSim';

/** v3 wrapped master — C6_MathematicsNumberLineSeeingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicsnumberlineseeingsim: SimDef = {
    id: 'v3w_c6_mathematicsnumberlineseeingsim',
    title: 'Polygons: Regular and Irregular',
    subtitle: 'This node covers identification, naming, and classification of polygons (3 to 10 sides).',
    classLevel: 6, subject: 'mathematics', topic: 'Polygons: Regular and Irregular',
    chapters: [],
    nodeIds: ['c6_math_ch07_075', 'c6_math_ch01_001', 'c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed the shape of a street sign or the tiles on your floor?', goal: 'Master Polygons: Regular and Irregular.' },
    discovery: {
        question: 'What do we call a closed figure made of exactly five straight line segments?',
        options: ['It is called a pentagon', 'square', 'triangle'],
        answer: 'It is called a pentagon',
        hook: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a.',
    },
    teaching: [
        { title: 'A polygon is a simple, closed,.', text: 'A polygon is a simple, closed, two-dimensional figure formed by three or more straight line segments.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch07_075', title: 'A polygon is a simple, closed,.',
          scaffold: { problem: 'A park is shaped like a polygon with 6 sides of 10 metres each. All its interior angles are equal. Is it a regular or irregular hexagon?',
            steps: [
            { text: 'Identify sides (n=6) and confirm side lengths (all 10m).' },
            { text: 'Confirm angles are equal, so it is a regular hexagon.' },
            { text: 'Apply the sum formula: (n-2) x 180.' },
            { text: 'Substitute n=6: (6-2) x 180 = 4 x 180.' },
            { text: 'Calculate result: 720 degrees.', faded: true, blankAnswer: 'Regular hexagon; 720 degrees.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_001', title: 'Numbers in our everyday life are.',
          scaffold: { problem: 'You need to buy 4 pens at ₹15 each and 2 notebooks at ₹30 each. You have a ₹200 note. Estimate if you have enough money.',
            steps: [
            { text: 'Identify costs: 4 pens at 15 = 60; 2 notebooks at 30 = 60.' },
            { text: 'Sum the costs: 60 + 60 = 120.' },
            { text: 'Compare total cost (120) with available money (200).' },
            { text: 'Since 120 is less than 200, you have enough.', faded: true, blankAnswer: 'Yes, you have enough; total cost is ₹120.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_016', title: 'Integers are a set of numbers that.',
          scaffold: { problem: 'A thermometer in a cold storage unit shows 0°C. The temperature drops by 3 degrees, then drops another 2 degrees.',
            steps: [
            { text: 'Identify the starting point as 0.' },
            { text: 'Identify "drops" as movement to the left (negative direction).' },
            { text: 'The first drop of 3 degrees moves us to -3.' },
            { text: 'The second drop of 2 degrees from -3 moves us further left to -5.', faded: true, blankAnswer: '-5°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_017', title: 'A number line is a straight line that.',
          scaffold: { problem: 'A thermometer in Leh shows -4°C in the morning. By noon, the temperature rises by 6 degrees. What is the new temperature?',
            steps: [
            { text: 'Identify the starting point: -4 on the number line.' },
            { text: 'Identify the movement: "rise" means moving to the right (positive direction).' },
            { text: 'Count 6 units to the right from -4: -3, -2, -1, 0, 1, 2.' },
            { text: 'The result is 2.', faded: true, blankAnswer: '2°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_018', title: 'Comparing and ordering integers.',
          scaffold: { problem: 'A thermometer in Leh reads -7°C at night and -2°C in the afternoon. Which temperature is higher?',
            steps: [
            { text: 'Identify the two values: -7 and -2.' },
            { text: 'Visualize the number line where 0 is the freezing point.' },
            { text: 'Locate -2 and -7 to the left of 0.' },
            { text: 'Identify that -2 is closer to 0 than -7.' },
            { text: 'Conclude that -2 is to the right of -7.', faded: true, blankAnswer: '-2°C is higher.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_019', title: 'Adding integers is the process of.',
          scaffold: { problem: 'A submarine is at a depth of 50 metres below sea level (-50). It then rises 20 metres. What is its new depth?',
            steps: [
            { text: 'Identify current position as -50.' },
            { text: 'Identify "rising" as a positive movement of +20.' },
            { text: 'Set up the expression: (-50) + (+20).' },
            { text: 'On a number line, start at -50 and move 20 units to the right.' },
            { text: 'Landing point is -30.', faded: true, blankAnswer: '-30 metres (or 30 metres below sea level).' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch01_001', title: 'Identify each idea',
          dissect: { specimen: 'Polygons: Regular and Irregular', spots: [
            { id: 's1', label: 'A polygon is a simple', prompt: 'Which idea is this? — A polygon is a simple, closed, two-dimensional figure formed by three or more straight.', answer: 'A polygon is a simple', options: ['A polygon is a simple', 'Numbers in our everyday life', 'Integers are a set of', 'A number line is a'] },
            { id: 's2', label: 'Numbers in our everyday life', prompt: 'Which idea is this? — Numbers in our everyday life are specific values used to represent quantity, order, or.', answer: 'Numbers in our everyday life', options: ['Numbers in our everyday life', 'A polygon is a simple', 'Integers are a set of', 'A number line is a'] },
            { id: 's3', label: 'Integers are a set of', prompt: 'Which idea is this? — Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),.', answer: 'Integers are a set of', options: ['Integers are a set of', 'A polygon is a simple', 'Numbers in our everyday life', 'A number line is a'] },
            { id: 's4', label: 'A number line is a', prompt: 'Which idea is this? — A number line is a straight line that represents integers as points at equal distances.', answer: 'A number line is a', options: ['A number line is a', 'A polygon is a simple', 'Numbers in our everyday life', 'Integers are a set of'] },
            { id: 's5', label: 'Comparing and ordering integers involves', prompt: 'Which idea is this? — Comparing and ordering integers involves determining the relative size of whole numbers.', answer: 'Comparing and ordering integers involves', options: ['Comparing and ordering integers involves', 'A polygon is a simple', 'Numbers in our everyday life', 'Integers are a set of'] },
            { id: 's6', label: 'Adding integers is the process', prompt: 'Which idea is this? — Adding integers is the process of combining two numbers that include positive values,.', answer: 'Adding integers is the process', options: ['Adding integers is the process', 'A polygon is a simple', 'Numbers in our everyday life', 'Integers are a set of'] }
          ] } }
    ],
    explore: { component: C6_MathematicsNumberLineSeeingSim, prompt: 'Explore the interactive — Polygons: Regular and Irregular' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch07_075', difficulty: 'standard',
          question: 'A polygon is a simple, closed, two-dimensional figure formed by three or more.',
          hint: 'Review the definition of a line segment vs a curve.',
          misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a.',
          parts: [
                { id: 'a', prompt: 'What do we call a closed figure made of exactly five straight line segments?', answer: 'It is called a pentagon',
                  options: ['It is called a pentagon', 'square', 'triangle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' },
                { id: 'b', prompt: 'If a quadrilateral has all sides equal but its corners are not the same size, is it a regular polygon? Why or why not?', answer: 'No, it is not regular',
                  options: ['No, it is not regular', 'regular', 'symmetric'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' },
                { id: 'c', prompt: 'A shape has 6 sides of different lengths and different angles. Is it a polygon? If so, what is it called?', answer: 'Yes, it is a hexagon',
                  options: ['Yes, it is a hexagon', 'it is not a polygon', 'irregular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' }
          ],
            remediations: { 'regular-just-means-symmetric-or': { steps: ['Ask the student to take a ruler and measure the sides of their shape.', 'Say: "If you measure every side of a square, you find they are all 3cm.', 'If you measure a rectangle, you find two sides are 3cm and two are 5cm.', 'Does a rectangle have all equal sides?" This forces them to focus on measurement rather than visual intuition.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'standard',
          question: 'Numbers in our everyday life are specific values used to represent quantity,.',
          hint: 'Review basic place value (thousands, ten-thousands) to ensure you can compare magnitudes.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'Counting one by one is slow and prone to error, while estimation gives us a useful "about" value that is sufficient for planning.', answer: '**Correct Answer:** It is more efficient to estimate',
                  options: ['**Correct Answer:** It is more efficient to estimate', 'estimating is always more accurate than counting', 'estimation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'An example is 121. It is a palindrome because it reads the same forward and backward (1-2-1).', answer: '**Correct Answer:** A 3-digit palindrome is 121',
                  options: ['**Correct Answer:** A 3-digit palindrome is 121', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' },
                { id: 'b', prompt: 'Counting one by one is slow and prone to error, while estimation gives us a useful "about" value that is sufficient for planning.', answer: '**Correct Answer:** It is more efficient to estimate',
                  options: ['**Correct Answer:** It is more efficient to estimate', 'estimating is always more accurate than counting', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_016', difficulty: 'standard',
          question: 'Integers are a set of numbers that include all positive counting numbers (1, 2,.',
          hint: 'Review the number line for whole numbers (0, 1, 2, 3...) and how to compare them.',
          misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.',
          parts: [
                { id: 'a', prompt: 'What are the three components that make up the set of integers?', answer: 'Integers consist of positive whole numbers, negative whole numbers, and zero',
                  options: ['Integers consist of positive whole numbers, negative whole numbers, and zero', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' },
                { id: 'b', prompt: 'If the temperature in a city is -5°C and in another city it is -2°C, which city is colder? Explain why.', answer: 'The city at -5°C is colder',
                  options: ['The city at -5°C is colder', 'less than', 'bigger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' },
                { id: 'c', prompt: 'A bank account has a balance of 0. If you withdraw 500 rupees, how would you represent your new balance using an integer?', answer: 'The balance is -500 rupees',
                  options: ['The balance is -500 rupees', 'below zero', 'bigger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' }
          ],
            remediations: { '10-is-bigger-than-1': { steps: ['Draw a horizontal number line on paper with 0 in the middle.', 'Ask the student to place a marker at -1 and another at -10.', 'Ask, "If you are walking from the negative side toward zero, which number do you hit first?" Explain that the number.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.',
          parts: [
                { id: 'a', prompt: 'Is zero a positive or a negative integer? Defend your answer.', answer: 'Zero is neither positive nor negative',
                  options: ['Zero is neither positive nor negative', 'boundary', 'bigger', '-10 is "bigger" than -1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.' }
          ],
            remediations: { '10-is-bigger-than-1': { steps: ['Draw a horizontal number line on paper with 0 in the middle.', 'Ask the student to place a marker at -1 and another at -10.', 'Ask, "If you are walking from the negative side toward zero, which number do you hit first?" Explain that the number.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_017', difficulty: 'standard',
          question: 'A number line is a straight line that represents integers as points at equal.',
          hint: 'Review basic whole number ordering on a standard number ray starting from zero.',
          misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.',
          parts: [
                { id: 'a', prompt: 'What is the name of the central point on a number line that separates positive and negative numbers?', answer: 'The central point is called zero (0)',
                  options: ['The central point is called zero (0)', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'b', prompt: 'If you have two numbers, -3 and -7, which one is further to the right on the number line, and why?', answer: '-3 is further to the right',
                  options: ['-3 is further to the right', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'c', prompt: 'Plot the integers -4, 2, and 0 on a number line and list them in increasing order.', answer: 'The order is -4, 0, 2',
                  options: ['The order is -4, 0, 2', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' }
          ],
            remediations: { 'since-5-is-bigger-than': { steps: ['Direct the student to draw two separate lines: one for positive (0, 1, 2, 3, 4, 5) and one for negative (0, -1, -2, -3,.', 'Ask them: "If you have 5 rupees debt (-5) and 2 rupees debt (-2), which situation is better for your pocket?" Once they.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_017', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.',
          parts: [
                { id: 'a', prompt: 'If an elevator is at -2 and moves 3 units to the right, where does it end up?', answer: 'It ends at +1',
                  options: ['It ends at +1', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' },
                { id: 'b', prompt: 'Draw a number line and show where -6 and -1 are. If you were a person walking from -6 toward -1, would you be moving toward a larger or smaller number?', answer: 'You would be moving toward a larger number',
                  options: ['You would be moving toward a larger number', 'since 5 is bigger than 2, then -5 must be bigger than -2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that since 5 is bigger than 2, then -5 must be bigger than -2.' }
          ],
            remediations: { 'since-5-is-bigger-than': { steps: ['Direct the student to draw two separate lines: one for positive (0, 1, 2, 3, 4, 5) and one for negative (0, -1, -2, -3,.', 'Ask them: "If you have 5 rupees debt (-5) and 2 rupees debt (-2), which situation is better for your pocket?" Once they.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_018', difficulty: 'standard',
          question: 'Comparing and ordering integers involves determining the relative size of whole.',
          hint: 'Review the number line and the concept of 0 as a starting point.',
          misconception: 'Students often treat negative numbers like positive ones, assuming that because 10 is larger than 5, -10 must be larger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering integers involves determining the relative size of whole numbers',
                  options: ['Comparing and ordering integers involves determining the relative size of whole numbers', 'A polygon is a simple, closed, two-dimensional figure formed by three or more straight', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat negative numbers like positive ones, assuming that because 10 is larger than 5, -10 must be larger than -5.' }
          ],
            remediations: { 'students-often-treat-negative-numbers': { steps: ['Draw a vertical number line (like a thermometer or building floors).', 'Ask the student to place 0 in the middle.', 'Ask them to point to -5 and -10.', 'Ask, "If you are standing at -5, do you need to go up or down to reach -10?" Since they must go down, -10 is lower.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_019', difficulty: 'standard',
          question: 'Adding integers is the process of combining two numbers that include positive.',
          hint: 'Review the "Other Side of Zero" section regarding the number line and floor levels.',
          misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adding integers is the process of combining two numbers that include positive values,',
                  options: ['Adding integers is the process of combining two numbers that include positive values,', 'A polygon is a simple, closed, two-dimensional figure formed by three or more straight', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['If a student gets this wrong, have them draw a number line.', 'Ask them to put their finger on the first number (+3).', 'Then, tell them: "The second number is -7, which means move 7 steps to the left." Physically counting the steps.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
