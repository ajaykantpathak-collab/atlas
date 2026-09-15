import type { SimDef } from '../../engine/types';
import C6_MathematicsTheOtherSideOfZeroSim from '../../../simulations/c6_12/C6_MathematicsTheOtherSideOfZeroSim';

/** v3 wrapped master — C6_MathematicsTheOtherSideOfZeroSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicstheothersideofzerosim: SimDef = {
    id: 'v3w_c6_mathematicstheothersideofzerosim',
    title: 'The Other Side Of Zero',
    subtitle: 'This node covers the definition of integers, their representation on a number line, and.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Integers',
    chapters: [],
    nodeIds: ['c6_math_ch02_016', 'c6_math_ch07_073', 'c6_math_ch07_078', 'c6_math_ch07_083', 'c6_math_ch11_119', 'c6_math_ch10_106', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021', 'c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_025', 'c6_math_ch02_026'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are in an elevator of a building with a basement. When you press the \'0\' button, you are at the.', goal: 'Master The Other Side Of Zero.' },
    discovery: {
        question: 'What are the three components that make up the set of integers?',
        options: ['Integers consist of positive whole numbers, negative whole numbers, and zero', 'bigger', '-10 is "bigger" than -1'],
        answer: 'Integers consist of positive whole numbers, negative whole numbers, and zero',
        hook: 'Students often believe that -10 is "bigger" than -1 because 10 is bigger than 1.',
    },
    teaching: [
        { title: 'Integers are a set of numbers that include.', text: 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...), their negative counterparts (-1, -2, -3...), and zero.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch02_016', title: 'Integers are a set of numbers that.',
          scaffold: { problem: 'A thermometer in a cold storage unit shows 0°C. The temperature drops by 3 degrees, then drops another 2 degrees.',
            steps: [
            { text: 'Identify the starting point as 0.' },
            { text: 'Identify "drops" as movement to the left (negative direction).' },
            { text: 'The first drop of 3 degrees moves us to -3.' },
            { text: 'The second drop of 2 degrees from -3 moves us further left to -5.', faded: true, blankAnswer: '-5°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_073', title: 'A triangle is a closed geometric figure.',
          scaffold: { problem: 'A triangular park has three fence sections. Two sections are 20 meters each, and the third is 10 meters. The first angle is 40°.',
            steps: [
            { text: 'Identify that it is an isosceles triangle (two sides are 20m).' },
            { text: 'Note the sum of angles is 180°.' },
            { text: 'Subtract the known angle: 180° - 40° = 140°.' },
            { text: 'Divide the remainder by 2 because the other two angles are equal: 140° / 2 = 70°.', faded: true, blankAnswer: '70° and 70°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_078', title: 'Symmetry exists when a shape can be.',
          scaffold: { problem: 'A rectangular piece of chart paper measures 10 cm by 6 cm. How many lines of symmetry does it have and where are they?',
            steps: [
            { text: 'Visualize the rectangle as a four-sided shape with two pairs of equal sides.' },
            { text: 'Attempt a fold along the horizontal axis (bisecting the 6 cm sides).' },
            { text: 'Attempt a fold along the vertical axis (bisecting the 10 cm sides).' },
            { text: 'Attempt a diagonal fold. Observe that the corners do not touch.' },
            { text: 'Conclude that there are 2 lines of symmetry.', faded: true, blankAnswer: '2 lines of symmetry (one horizontal, one vertical).' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_083', title: 'Two geometric shapes are congruent if.',
          scaffold: { problem: 'You have two triangular metal plates. Plate A has sides of 3 cm, 4 cm, and 5 cm. Plate B has sides of 3 cm, 4 cm, and 5 cm.',
            steps: [
            { text: 'Identify the measurements of Plate A (3, 4, 5 cm).' },
            { text: 'Identify the measurements of Plate B (3, 4, 5 cm).' },
            { text: 'Compare corresponding sides (3=3, 4=4, 5=5).' },
            { text: 'Apply the SSS rule for congruence.' },
            { text: 'Conclude that since all corresponding sides match, they are congruent.', faded: true, blankAnswer: 'Yes, they are congruent.' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch11_119', title: 'Constructing triangles using ASA.',
          caseStudy: { intro: 'Imagine you are a carpenter building a triangular frame and you know exactly how long one side is and what angles it should make with the other two sides; how.',
            decisions: [{ prompt: 'In an ASA construction, what does the "included side" refer to? A) Any side of the triangle.', options: [
                { text: 'B) The side lying between the two given angles', outcome: 'B) The side lying between the two given angles. A wrong answer suggests the student confuses.' },
                { text: 'included', outcome: 'Not quite — Students often try to draw the two angles first and then the side, or they try to place the angles.', reveals: 'students-often-try-to-draw' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_106', title: 'A line of symmetry is an imaginary line.',
          scaffold: { problem: 'A rectangular piece of chart paper measures 10 cm by 6 cm. How many lines of symmetry can be drawn on this paper?',
            steps: [
            { text: 'Analyze the rectangle (10 cm x 6 cm).' },
            { text: 'Test a vertical line through the center of the 10 cm sides. The sides will fold perfectly.' },
            { text: 'Test a horizontal line through the center of the 6 cm sides. The sides will fold perfectly.' },
            { text: 'Test a diagonal. When folded, the corners will not overlap.' },
            { text: 'Conclude there are exactly 2 lines of symmetry.', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } }
    ],
    explore: { component: C6_MathematicsTheOtherSideOfZeroSim, prompt: 'Explore the interactive — The Other Side Of Zero' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c6_math_ch07_073', difficulty: 'standard',
          question: 'A triangle is a closed geometric figure formed by three straight line segments.',
          hint: 'Review the "Angle" node (c6_math_ch07_073_angles) to ensure you understand how to measure.',
          misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A triangle is a closed geometric figure formed by three straight line segments connected',
                  options: ['A triangle is a closed geometric figure formed by three straight line segments connected', 'Integers are a set of numbers that include all positive counting numbers (1, 2, 3...),', 'Symmetry exists when a shape can be divided into two identical halves that mirror each', 'Two geometric shapes are congruent if they have the exact same shape and size, meaning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be different sizes.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['Ask the student to draw an equilateral triangle by carefully measuring all sides to be the same length (e.g., 5cm).', 'Then, have them use a protractor to measure each of the three corners.', 'They will discover that each corner measures 60 degrees.', 'Explain that because the sides are "balanced" or equal, the "opening" at each corner must also be balanced.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_078', difficulty: 'standard',
          question: 'Symmetry exists when a shape can be divided into two identical halves that.',
          hint: 'Review the definition of a line segment and how to measure equal lengths.',
          misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.',
          parts: [
                { id: 'a', prompt: 'Does a circle have a limited number of lines of symmetry? Explain your reasoning.', answer: 'No, a circle has infinitely many lines of symmetry',
                  options: ['No, a circle has infinitely many lines of symmetry', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' },
                { id: 'b', prompt: 'If you draw a rectangle that is not a square, how many lines of symmetry can you find?', answer: 'A rectangle has exactly two lines of symmetry: one horizontal and one vertical',
                  options: ['A rectangle has exactly two lines of symmetry: one horizontal and one vertical', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' }
          ],
            remediations: { 'a-shape-only-has-symmetry': { steps: ['Take a physical sheet of paper cut into the shape.', 'Ask the student to fold it vertically; if it doesn\'t match, ask them to rotate the paper 90 degrees and try folding.', 'By physically manipulating the object, they learn that symmetry is a property of the shape\'s geometry, not the.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_078', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Every triangle has at least one line of symmetry." Is this true?', answer: 'This is false; a scalene triangle has no lines of symmetry',
                  options: ['This is false; a scalene triangle has no lines of symmetry', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' },
                { id: 'b', prompt: 'Draw a shape that has exactly three lines of symmetry. Label where these lines would be.', answer: 'An equilateral triangle is the correct shape',
                  options: ['An equilateral triangle is the correct shape', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' }
          ],
            remediations: { 'a-shape-only-has-symmetry': { steps: ['Take a physical sheet of paper cut into the shape.', 'Ask the student to fold it vertically; if it doesn\'t match, ask them to rotate the paper 90 degrees and try folding.', 'By physically manipulating the object, they learn that symmetry is a property of the shape\'s geometry, not the.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_083', difficulty: 'standard',
          question: 'Two geometric shapes are congruent if they have the exact same shape and size,.',
          hint: 'Review how to measure lengths and angles accurately.',
          misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different.',
          parts: [
                { id: 'a', prompt: 'What is the primary condition for two shapes to be called congruent?', answer: 'Two shapes are congruent if they have the same shape and the same size',
                  options: ['Two shapes are congruent if they have the same shape and the same size', 'congruent', 'similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' },
                { id: 'b', prompt: 'Compare a small photograph and a large poster of the same person. Are they congruent? Analyze the relationship between their shape and size.', answer: 'They are not congruent',
                  options: ['They are not congruent', 'congruent', 'similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' }
          ],
            remediations: { 'students-often-confuse-congruent-with': { steps: ['Ask the student to place a small triangle on a larger one.', 'Ask: "Does the small one cover the large one exactly?" When they say "no," explain: "Congruence is a \'perfect fit\'—no.', 'If there is a difference in size, it\'s not congruent."'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_083', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "If two triangles have the same angles, they must be congruent." Is this always true?', answer: 'This is false',
                  options: ['This is false', 'congruent', 'similar', 'angles alone define size'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' },
                { id: 'b', prompt: 'Compare a small photograph and a large poster of the same person. Are they congruent? Analyze the relationship between their shape and size.', answer: 'They are not congruent',
                  options: ['They are not congruent', 'congruent', 'similar', 'if shapes look alike (like two triangles of different sizes), they are congruent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' }
          ],
            remediations: { 'students-often-confuse-congruent-with': { steps: ['Ask the student to place a small triangle on a larger one.', 'Ask: "Does the small one cover the large one exactly?" When they say "no," explain: "Congruence is a \'perfect fit\'—no.', 'If there is a difference in size, it\'s not congruent."'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_119', difficulty: 'standard',
          question: 'Constructing triangles using ASA (Angle-Side-Angle) and RHS.',
          hint: 'Review the "Drawing Angles" section in Chapter 11/12 regarding the use of a protractor.',
          misconception: 'Students often try to draw the two angles first and then the side, or they try to place the angles on the same side of.',
          parts: [
                { id: 'a', prompt: 'In an ASA construction, what does the "included side" refer to? A) Any side of the triangle. B) The side lying between the two given angles.', answer: 'B) The side lying between the two given angles',
                  options: ['B) The side lying between the two given angles', 'included'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to draw the two angles first and then the side, or they try to place the angles on the same side of the base line.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student fails, tell them: "Always draw the \'Side\' in ASA or the \'Leg\' in RHS as your very first step." Then, have.', 'Instruct them to place the center of the protractor on one of those dots, ensuring the 0-degree line lies exactly on.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_106', difficulty: 'standard',
          question: 'A line of symmetry is an imaginary line that divides a 2D shape into two.',
          hint: 'Review the definitions of different types of triangles based on side lengths.',
          misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.',
          parts: [
                { id: 'a', prompt: 'How many lines of symmetry does a scalene triangle have?', answer: 'A scalene triangle has 0 lines of symmetry',
                  options: ['A scalene triangle has 0 lines of symmetry', 'scalene', 'any line that divides a shape into two equal areas is a line of symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.' }
          ],
            remediations: { 'any-line-that-divides-a': { steps: ['Take the student back to the "folding test." Ask them to trace the shape on a piece of paper and cut it out.', 'Have them fold it along the line they think is a symmetry line.', 'If the edges don\'t match, ask them to identify where the overlap fails.', 'This physical feedback corrects the "area-division" error.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_106', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.',
          parts: [
                { id: 'a', prompt: 'Draw a shape that has exactly two lines of symmetry, and explain why a third line cannot exist for your shape.', answer: 'A rectangle (that is not a square) is a classic example',
                  options: ['A rectangle (that is not a square) is a classic example', 'any line that divides a shape into two equal areas is a line of symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.' }
          ],
            remediations: { 'any-line-that-divides-a': { steps: ['Take the student back to the "folding test." Ask them to trace the shape on a piece of paper and cut it out.', 'Have them fold it along the line they think is a symmetry line.', 'If the edges don\'t match, ask them to identify where the overlap fails.', 'This physical feedback corrects the "area-division" error.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
