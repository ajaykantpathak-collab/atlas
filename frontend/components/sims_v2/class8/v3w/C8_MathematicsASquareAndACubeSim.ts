import type { SimDef } from '../../engine/types';
import C8_MathematicsASquareAndACubeSim from '../../../simulations/c6_12/C8_MathematicsASquareAndACubeSim';

/** v3 wrapped master — C8_MathematicsASquareAndACubeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsasquareandacubesim: SimDef = {
    id: 'v3w_c8_mathematicsasquareandacubesim',
    title: 'ASquare And ACube',
    subtitle: 'This node covers the definition of square numbers, the notation \\( n^2 \\), and computing.',
    classLevel: 8, subject: 'mathematics', topic: 'Square Numbers: Definition and Notation (n squared)',
    chapters: [],
    nodeIds: ['c8_math_ch1_1', 'c8_math_ch1_10', 'c8_math_ch1_2', 'c8_math_ch1_3', 'c8_math_ch1_9', 'c8_math_ch11_7', 'c8_math_ch11_8', 'c8_math_ch6_7', 'c8_math_ch6_9', 'c8_math_ch1_11', 'c8_math_ch1_12', 'c8_math_ch1_4', 'c8_math_ch1_5', 'c8_math_ch1_6', 'c8_math_ch1_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are tiling a square floor in your classroom using 1 m × 1 m tiles.', goal: 'Master ASquare And ACube.' },
    discovery: {
        question: 'Explain why \\( 5^2 \\) is not the same as \\( 2 \\times 5 \\). Use the area of a square in your explanation.',
        options: ['\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)', 'both give 10', 'the 2 just means multiply by 2'],
        answer: '\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)',
        hook: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think.',
    },
    teaching: [
        { title: 'A square number is the product obtained when.', text: 'A square number is the product obtained when a natural number is multiplied by itself. For any natural number \\( n \\), its square is denoted by \\( n^2 \\) and calculated as \\( n \\times n \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch1_1', title: 'A square number is the product obtained.',
          scaffold: { problem: 'A square classroom has a side length of 12 metres. The school wants to cover the floor with 1 m × 1 m tiles. How many tiles are needed?',
            steps: [
            { text: 'Identify the side length of the square floor: 12 m.' },
            { text: 'Recall that the area of a square = side × side, which is written as \\( (\\text{side})^2 \\).' },
            { text: 'Compute \\( 12^2 = 12 \\times 12 \\). Break 12 into 10 + 2: \\( 12 \\times 12 = 12 \\times (10 + 2) = (12 \\times 10) + (12.' },
            { text: 'Calculate: \\( 12 \\times 10 = 120 \\); \\( 12 \\times 2 = 24 \\); \\( 120 + 24 = 144 \\).' },
            { text: 'Interpret the result: 144 tiles are needed. The unit is square metres (m²) because we multiplied metres by metres.', faded: true, blankAnswer: '\\( 12^2 = 144 \\) tiles (or 144 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_10', title: 'A cube number is the result of.',
          scaffold: { problem: 'A cubical gift box has a side length of 12 cm. What is its volume in cubic centimetres?',
            steps: [
            { text: 'Identify the outer side length = 12 cm. Volume of outer cube = side³ = 12³.' },
            { text: 'Compute 12³ = 12 × 12 × 12. First 12 × 12 = 144. Then 144 × 12 = 144 × (10 + 2) = 1440 + 288 = 1728 cm³.' },
            { text: 'Inner hollow side length = 12 - 2×1 = 10 cm (1 cm thickness on each side).' },
            { text: 'Volume of wood = outer volume - inner volume = 1728 - 1000 = 728 cm³.' },
            { text: 'Verify: 12³ = 1728, 10³ = 1000, difference = 728. Units are cm³.', faded: true, blankAnswer: 'Outer volume = 1728 cm³, Volume of wood = 728 cm³.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_2', title: 'A perfect square is a natural number.',
          scaffold: { problem: 'A gardener wants to plant 1296 saplings in a square grid (same number of rows and columns). Can she do it without leaving any sapling out?',
            steps: [
            { text: 'Identify the problem — we need to check if 1296 is a perfect square.' },
            { text: 'Recall the rule — a number is a perfect square if all exponents in its prime factorization are even.' },
            { text: 'Prime factorize 1296:' },
            { text: 'Check exponents — both 4 and 4 are even. Therefore, 1296 is a perfect square.' },
            { text: 'Find the square root for the grid size: √1296 = 2² × 3² = 4 × 9 = 36. The gardener can make a 36 × 36 grid.', faded: true, blankAnswer: 'Yes, 1296 is a perfect square (36²). The gardener can plant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_3', title: 'The units digit of a perfect square.',
          scaffold: { problem: 'A school auditorium has chairs arranged in a square formation. The total number of chairs is a perfect square between 5000 and 6000.',
            steps: [
            { text: 'Let the number of rows be \\( n \\). Then total chairs \\( = n^2 \\).' },
            { text: 'From the units-digit pattern, \\( n^2 \\) ends in 4 only when \\( n \\) ends in 2 or 8 (since \\( 2^2=4 \\), \\( 8^2=64 \\)).' },
            { text: 'Estimate \\( n \\): \\( \\sqrt{5000} \\approx 70.7 \\), \\( \\sqrt{6000} \\approx 77.5 \\).' },
            { text: 'List integers 71–77 and pick those ending in 2 or 8: 72 ends in 2, 78 is too high, so only 72 qualifies.' },
            { text: 'Verify: \\( 72^2 = 5184 \\) (ends in 4, between 5000 and 6000). The units digit of the number of rows is 2.', faded: true, blankAnswer: 'The units digit of the number of rows must be 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_9', title: 'Estimating square roots is the process.',
          scaffold: { problem: 'A square classroom has a floor area of 85 square metres. The school wants to buy a decorative border for the perimeter.',
            steps: [
            { text: 'Identify perfect squares around 85. 9² = 81, 10² = 100. So √85 is between 9 and 10.' },
            { text: 'Compute the gap between squares: 100 - 81 = 19. Compute how far 85 is from the lower square: 85 - 81 = 4.' },
            { text: 'Use linear interpolation: fraction = 4/19 ≈ 0.21. Add to lower root: 9 + 0.21 = 9.21.' },
            { text: 'Round to one decimal place: 9.21 ≈ 9.2 m.' },
            { text: 'Verify: 9.2² = 84.64 (error 0.36), 9.3² = 86.49 (error 1.49). 9.2 is closer. Perimeter ≈ 4 × 9.2 = 36.8 m.', faded: true, blankAnswer: 'Side length ≈ 9.2 m, border needed ≈ 36.8 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_7', title: 'A net of a 3D solid is a.',
          scaffold: { problem: 'Ravi has a cuboidal gift box of length 20 cm, breadth 15 cm, and height 10 cm.',
            steps: [
            { text: 'Identify the faces of the cuboid — there are 3 pairs of identical rectangles: top/bottom (20×15), front/back (20×10),.' },
            { text: 'Choose a base face for the net layout — select the 20×15 rectangle as the bottom face. Draw it first.' },
            { text: 'Attach the four side faces to the four edges of the bottom face — attach a 20×10 rectangle to one 20 cm edge (front), a.' },
            { text: 'Attach the top face (20×15) to one of the side faces — for example, attach it to the free 20 cm edge of the front face.' },
            { text: 'Verify the net — check that all 6 faces are present, each edge of the cuboid appears exactly twice in the net (once on.', faded: true, blankAnswer: 'Net drawn with one 20×15 rectangle central, four side.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch1_10', title: 'Identify each idea',
          dissect: { specimen: 'ASquare And ACube', spots: [
            { id: 's1', label: 'A square number is the', prompt: 'Which idea is this? — A square number is the product obtained when a natural number is multiplied by itself.', answer: 'A square number is the', options: ['A square number is the', 'A cube number is the', 'A perfect square is a', 'The units digit of a'] },
            { id: 's2', label: 'A cube number is the', prompt: 'Which idea is this? — A cube number is the result of multiplying an integer by itself three times.', answer: 'A cube number is the', options: ['A cube number is the', 'A square number is the', 'A perfect square is a', 'The units digit of a'] },
            { id: 's3', label: 'A perfect square is a', prompt: 'Which idea is this? — A perfect square is a natural number that can be expressed as the square of an integer.', answer: 'A perfect square is a', options: ['A perfect square is a', 'A square number is the', 'A cube number is the', 'The units digit of a'] },
            { id: 's4', label: 'The units digit of a', prompt: 'Which idea is this? — The units digit of a perfect square depends only on the units digit of the original.', answer: 'The units digit of a', options: ['The units digit of a', 'A square number is the', 'A cube number is the', 'A perfect square is a'] },
            { id: 's5', label: 'Estimating square roots is the', prompt: 'Which idea is this? — Estimating square roots is the process of finding an approximate value for the square.', answer: 'Estimating square roots is the', options: ['Estimating square roots is the', 'A square number is the', 'A cube number is the', 'A perfect square is a'] },
            { id: 's6', label: 'A net of a 3D', prompt: 'Which idea is this? — A net of a 3D solid is a two-dimensional arrangement of polygons (faces) connected along.', answer: 'A net of a 3D', options: ['A net of a 3D', 'A square number is the', 'A cube number is the', 'A perfect square is a'] }
          ] } }
    ],
    explore: { component: C8_MathematicsASquareAndACubeSim, prompt: 'Explore the interactive — ASquare And ACube' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch1_1', difficulty: 'standard',
          question: 'A square number is the product obtained when a natural number is multiplied by.',
          hint: 'If stuck, revisit multiplication of two-digit numbers (Class 6) and integer sign rules.',
          misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( 5^2 \\) is not the same as \\( 2 \\times 5 \\). Use the area of a square in your explanation.', answer: '\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)',
                  options: ['\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)', 'both give 10', 'the 2 just means multiply by 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think "multiply by 2".' }
          ],
            remediations: { 'students-often-interpret-n-2': { steps: ['If a student writes \\( 8^2 = 16 \\), ask: "What does the little 2 mean?', 'Let\'s read it: \'8 squared\' means 8 multiplied by itself.', 'Show me 8 times 8 using repeated addition or the area model." Draw a 8×8 grid and count.', 'For the negative sign error, write both \\( (-5)^2 \\) and \\( -5^2 \\) side by side.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_10', difficulty: 'standard',
          question: 'A cube number is the result of multiplying an integer by itself three times.',
          hint: 'If stuck, revisit integer multiplication (c7_math_ch10_004, c7_math_ch10_005) and the.',
          misconception: 'Students often interpret \\( n^3 \\) as \\( n \\times 3 \\) (multiplying the base by the exponent) instead of \\( n \\times n.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( 5^3 \\) is not equal to \\( 3 \\times 5 \\). Use the geometric meaning of a cube to justify your answer.', answer: '\\( 5^3 = 5 \\times 5 \\times 5 = 125 \\)',
                  options: ['\\( 5^3 = 5 \\times 5 \\times 5 = 125 \\)', 'both give 15', 'multiplication is the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often interpret \\( n^3 \\) as \\( n \\times 3 \\) (multiplying the base by the exponent) instead of \\( n \\times n \\times n \\).' }
          ],
            remediations: { 'students-often-interpret-n-3': { steps: ['If a student computes \\( n^3 \\) as \\( n \\times 3 \\), first ask: "What does the little 3 mean in \\( 2^3 \\)?" Guide them.', 'Use physical cubes (e.g., centimetre cubes) to build a 2×2×2 cube and count the blocks (8).', 'Then build 3×3×3 and count (27).', 'Contrast with 2×3=6 blocks arranged in a rectangle.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_2', difficulty: 'standard',
          question: 'A perfect square is a natural number that can be expressed as the square of an.',
          hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products.',
          misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of.',
          parts: [
                { id: 'a', prompt: 'Which of the following numbers is **guaranteed** to be a perfect square based only on its units digit? A) 324 B) 156 C) 289 D) 432', answer: 'Correct answer: A) 324 and C) 289 (both end in 4 or 9',
                  options: ['Correct answer: A) 324 and C) 289 (both end in 4 or 9', '**any** number ending in 0,1,4,5,6,9 is a perfect square (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' },
                { id: 'b', prompt: 'Riya says: "1200 is a perfect square because it ends with two zeros." Is she correct?', answer: 'Riya is **incorrect**',
                  options: ['Riya is **incorrect**', 'must have even zeros', 'if it has even zeros, it is a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' },
                { id: 'c', prompt: 'Determine whether 1764 is a perfect square using prime factorization. Show all steps.', answer: '**Step 1:** Prime factorize 1764',
                  options: ['**Step 1:** Prime factorize 1764', 'not a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' }
          ],
            remediations: { 'if-a-number-passes-the': { steps: ['Write the number’s prime factorization clearly.', 'Circle each prime’s exponent.', 'Ask: "Is **every** exponent even?" If any is odd, stop — it’s not a perfect square.', 'Practice with numbers that pass digit/zero tests but fail factorization (e.g., 1640, 2000, 360).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since 1 + 3 + 5 + 7 + 9 = 25, and 25 is 5², then 1 + 3 + 5 + 7 + 9 + 11 must be 6² = 36." Is the student\'s reasoning valid?', answer: 'Yes, the reasoning is **valid**',
                  options: ['Yes, the reasoning is **valid**', 'we need to calculate to be sure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' }
          ],
            remediations: { 'if-a-number-passes-the': { steps: ['Write the number’s prime factorization clearly.', 'Circle each prime’s exponent.', 'Ask: "Is **every** exponent even?" If any is odd, stop — it’s not a perfect square.', 'Practice with numbers that pass digit/zero tests but fail factorization (e.g., 1640, 2000, 360).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_3', difficulty: 'standard',
          question: 'The units digit of a perfect square depends only on the units digit of the.',
          hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and.',
          misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.',
          parts: [
                { id: 'a', prompt: 'What are the possible units digits of a perfect square? List them.', answer: 'The possible units digits are 0, 1, 4, 5, 6, 9',
                  options: ['The possible units digits are 0, 1, 4, 5, 6, 9', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'b', prompt: 'Explain why a number ending in 2 can never be a perfect square, using the algebraic form \\( (10a+b)^2 \\).', answer: 'For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)',
                  options: ['For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'c', prompt: 'Find the units digit of \\( 237^2 \\) without calculating the full square.', answer: 'Step 1: The units digit of 237 is 7',
                  options: ['Step 1: The units digit of 237 is 7', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' }
          ],
            remediations: { 'if-a-number-ends-in': { steps: ['Have the student list squares of 1–20 and circle only the units digits.', 'Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares).', 'Use the algebraic form \\( (10a+b)^2 = 100a^2+20ab+b^2 \\) to prove the units digit depends only on \\( b \\).', 'Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since 169 ends in 9, it must be a perfect square." Evaluate this statement and give a counterexample if it is false.', answer: 'The statement is false',
                  options: ['The statement is false', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'b', prompt: 'Create a three-digit number that cannot be a perfect square and explain why using the units digit pattern.', answer: 'Example 1: 237 (ends in 7) → cannot be a perfect square',
                  options: ['Example 1: 237 (ends in 7) → cannot be a perfect square', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' }
          ],
            remediations: { 'if-a-number-ends-in': { steps: ['Have the student list squares of 1–20 and circle only the units digits.', 'Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares).', 'Use the algebraic form \\( (10a+b)^2 = 100a^2+20ab+b^2 \\) to prove the units digit depends only on \\( b \\).', 'Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_9', difficulty: 'standard',
          question: 'Estimating square roots is the process of finding an approximate value for the.',
          hint: 'If stuck, revisit c8_math_ch1_8 (square root definition) and c6_math_ch01_006 (estimation.',
          misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.',
          parts: [
                { id: 'a', prompt: 'What are the two consecutive whole numbers between which √85 lies?', answer: '√85 lies between 9 and 10',
                  options: ['√85 lies between 9 and 10', '8 and 9'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.' },
                { id: 'b', prompt: 'Without calculating, explain why √30 is closer to 5 than to 6.', answer: '30 is 5 away from 25 (5²) but 6 away from 36 (6²)',
                  options: ['30 is 5 away from 25 (5²) but 6 away from 36 (6²)', '30 is between 25 and 36'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.' }
          ],
            remediations: { 'the-square-root-function-is': { steps: ['Draw a number line marking 49, 50, 64.', 'Ask: "How many steps from 49 to 50?', 'How many from 50 to 64?" Then mark 7, ?, 8 below.', 'Have the student compute 7.1² = 50.41 and 7.5² = 56.25 to see which is closer.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_7', difficulty: 'standard',
          question: 'A net of a 3D solid is a two-dimensional arrangement of polygons (faces).',
          hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) to review.',
          misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.',
          parts: [
                { id: 'a', prompt: 'How many square faces must a net of a cube have, and what is the maximum number of squares that can meet at a single vertex in the folded cube?', answer: 'A cube net must have exactly 6 square faces',
                  options: ['A cube net must have exactly 6 square faces', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' },
                { id: 'b', prompt: 'A student draws a straight line of 6 squares connected edge-to-edge and claims it is a net of a cube.', answer: 'A straight line of 6 squares cannot form a cube',
                  options: ['A straight line of 6 squares cannot form a cube', 'it works because there are 6 squares', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' },
                { id: 'c', prompt: 'A net of a cuboid has three pairs of identical rectangles. The net shows rectangles of dimensions: 8 cm × 5 cm (two pieces), 8 cm × 3 cm (two pieces), and 5 cm.', answer: 'The cuboid has length = 8 cm, breadth = 5 cm, height = 3 cm',
                  options: ['The cuboid has length = 8 cm, breadth = 5 cm, height = 3 cm', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' }
          ],
            remediations: { 'any-arrangement-of-the-correct': { steps: ['Give the student squared paper and scissors.', 'Have them draw the problematic net (e.g., straight line of 6 squares), cut it out, and physically attempt to fold it.', 'Ask them to label each square as Front, Back, Top, Bottom, Left, Right before folding.', 'As they fold, they will see the overlap.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.',
          parts: [
                { id: 'a', prompt: 'A student claims the following is a net of a cylinder: a rectangle of height 10 cm and width 31.4 cm, with a circle of radius 5 cm attached to one of the 10 cm.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' }
          ],
            remediations: { 'any-arrangement-of-the-correct': { steps: ['Give the student squared paper and scissors.', 'Have them draw the problematic net (e.g., straight line of 6 squares), cut it out, and physically attempt to fold it.', 'Ask them to label each square as Front, Back, Top, Bottom, Left, Right before folding.', 'As they fold, they will see the overlap.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
