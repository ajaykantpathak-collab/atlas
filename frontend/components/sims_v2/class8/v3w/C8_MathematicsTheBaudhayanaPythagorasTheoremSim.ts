import type { SimDef } from '../../engine/types';
import C8_MathematicsTheBaudhayanaPythagorasTheoremSim from '../../../simulations/c6_12/C8_MathematicsTheBaudhayanaPythagorasTheoremSim';

/** v3 wrapped master — C8_MathematicsTheBaudhayanaPythagorasTheoremSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsthebaudhayanapythagorastheoremsim: SimDef = {
    id: 'v3w_c8_mathematicsthebaudhayanapythagorastheoremsim',
    title: 'The Baudhayana Pythagoras Theorem',
    subtitle: 'This node covers the historical geometric insight from Baudhayana\'s Sulba-Sutra (c.',
    classLevel: 8, subject: 'mathematics', topic: 'Baudhayana\'s Sulba-Sutra: Doubling a Square',
    chapters: [],
    nodeIds: ['c8_math_ch9_1', 'c8_math_ch9_10', 'c8_math_ch9_2', 'c8_math_ch9_3', 'c8_math_ch9_4', 'c8_math_ch9_5', 'c8_math_ch9_7', 'c8_math_ch9_6', 'c8_math_ch9_8', 'c8_math_ch9_9', 'c8_math_ch14_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine a farmer in ancient India has a square field of side 10 metres and wants to mark out a new square.', goal: 'Master The Baudhayana Pythagoras Theorem.' },
    discovery: {
        question: 'What is the side length of a square whose area is double that of a square with side 5 cm, according to Baudhayana\'s Sulba-Sutra method?',
        options: ['The side length is the diagonal of the original 5 cm square', 'doubling the side doubles the area (confusing linear and quadratic scaling)', 'doubling the side length of a square doubles its area (e'],
        answer: 'The side length is the diagonal of the original 5 cm square',
        hook: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).',
    },
    teaching: [
        { title: 'Baudhayana\'s Sulba-Sutra describes a.', text: 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly twice the area of a given square: the side of the new square equals the diagonal of the original square.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch9_1', title: 'Baudhayana\'s Sulba-Sutra describes a.',
          scaffold: { problem: 'A square garden plot has side 8 metres. The owner wants to create a second square plot with exactly double the area using only a rope and.',
            steps: [
            { text: 'Identify the given — original square side = 8 m. Compute original area = 8 × 8 = 64 m².' },
            { text: 'Recall the Sulba-Sutra principle — the diagonal of the original square becomes the side of the double-area square.' },
            { text: 'The new square\'s side = diagonal of original square. By geometric property of squares, diagonal = side × √2 = 8√2 m.' },
            { text: 'Compute new area = (new side)² = (8√2)² = 64 × 2 = 128 m². Verify: 128 = 2 × 64 ✓' },
            { text: 'Interpret — the new plot has side 8√2 m (≈11.31 m) and area 128 m², exactly double the original 64 m².', faded: true, blankAnswer: 'New plot side = 8√2 m (approximately 11.31 m), area = 128.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_10', title: 'The converse of the.',
          scaffold: { problem: 'A builder in Bhopal wants to check if the corner of a rectangular plot is exactly 90°.',
            steps: [
            { text: 'Identify the three side lengths: 6 m, 8 m, and 10 m. The longest side is 10 m (the diagonal measured across the corner).' },
            { text: 'Label the longest side as c = 10 m, and the other two as a = 6 m, b = 8 m.' },
            { text: 'Compute the squares: \\(a^2 = 6^2 = 36\\), \\(b^2 = 8^2 = 64\\), \\(c^2 = 10^2 = 100\\).' },
            { text: 'Check the converse condition: \\(a^2 + b^2 = 36 + 64 = 100\\). Compare with \\(c^2 = 100\\).' },
            { text: 'Since \\(a^2 + b^2 = c^2\\) exactly, the triangle formed by the measurements is right-angled.', faded: true, blankAnswer: 'Yes, the corner is a right angle (90°).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_2', title: 'A square with double the area of a.',
          scaffold: { problem: 'A square courtyard has side 7 metres. Construct a square courtyard with double the area using only a compass and straightedge.',
            steps: [
            { text: 'Draw the given square ABCD with side 7 m. (Use compass to mark 7 m on a line, construct perpendiculars, complete.' },
            { text: 'Draw diagonal AC. By Pythagoras (or Baudhayana theorem), AC = \\(\\sqrt{7^2 + 7^2} = \\sqrt{98} = 7\\sqrt{2}\\) m.' },
            { text: 'At point A, construct a line perpendicular to AC. (Use compass: draw arc centered at A cutting AC at two points, then.' },
            { text: 'With compass set to length AC (\\(7\\sqrt{2}\\) m), place needle at A and mark point E on the perpendicular such that AE =.' },
            { text: 'Similarly at C, construct perpendicular to AC on the same side, and mark point F such that CF = AC.' },
            { text: 'Join E and F. Square ACEF is the required square.' },
            { text: 'Verify area: Side of new square = \\(7\\sqrt{2}\\) m. Area = \\((7\\sqrt{2})^2 = 49 \\times 2 = 98\\) m².', faded: true, blankAnswer: 'New square side = \\(7\\sqrt{2}\\) m (≈ 9.9 m), area = 98 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_3', title: 'Halving a square is the geometric.',
          scaffold: { problem: 'A square piece of cloth has a side length of 40 cm. A tailor wants to cut a smaller square from it that has exactly half the area.',
            steps: [
            { text: 'Identify given: original square side \\(a = 40\\) cm. Original area = \\(40^2 = 1600\\) cm².' },
            { text: 'Determine the side of the new square: \\(s = \\sqrt{800} = \\sqrt{400 \\times 2} = 20\\sqrt{2}\\) cm.' },
            { text: 'Construction: Draw square ABCD of side 40 cm. Draw diagonal AC.' },
            { text: 'Using a compass, mark length AO on a ray from A. Construct a square AEFG with side AE = AO.' },
            { text: 'Verify: Area of AEFG = \\((20\\sqrt{2})^2 = 400 \\times 2 = 800\\) cm². This matches half of 1600 cm².', faded: true, blankAnswer: 'Side length = \\(20\\sqrt{2}\\) cm (≈ 28.28 cm).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_4', title: 'In an isosceles right triangle, the two.',
          scaffold: { problem: 'A square sheet of aluminium foil has a side length of 15 cm. It is cut along its diagonal to make two identical triangular pieces.',
            steps: [
            { text: 'Identify the triangle formed. Cutting a square along its diagonal produces two isosceles right triangles.' },
            { text: 'Recall the relationship for an isosceles right triangle: hypotenuse = leg \\(\\times \\sqrt{2}\\), i.e., \\(h = a\\sqrt{2}\\).' },
            { text: 'Substitute the given leg length: \\(h = 15 \\times \\sqrt{2} = 15\\sqrt{2}\\) cm. This is the exact answer.' },
            { text: 'Compute the approximate decimal value using \\(\\sqrt{2} \\approx 1.414\\): \\(h \\approx 15 \\times 1.414 = 21.21\\) cm.' },
            { text: 'Verify by checking area of squares: Square on leg = \\(15^2 = 225\\) cm². Two such squares = 450 cm².', faded: true, blankAnswer: 'Exact: \\(15\\sqrt{2}\\) cm. Approximate: 21.21 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_5', title: 'The Baudhayana-Pythagoras Theorem.',
          scaffold: { problem: 'A rectangular field is 60 metres long and 25 metres wide. A farmer wants to walk diagonally across the field from one corner to the.',
            steps: [
            { text: 'Identify the right-angled triangle formed by the length (60 m), width (25 m), and the diagonal (hypotenuse \\(d\\)).' },
            { text: 'Write the Baudhayana-Pythagoras Theorem: \\(d^2 = 60^2 + 25^2\\).' },
            { text: 'Compute the squares: \\(60^2 = 3600\\), \\(25^2 = 625\\). Sum = \\(3600 + 625 = 4225\\).' },
            { text: 'Find the square root of 4225. Since \\(65^2 = 4225\\), the diagonal \\(d = 65\\) m.' },
            { text: 'Distance along sides = \\(60 + 25 = 85\\) m. Distance saved = \\(85 - 65 = 20\\) m.', faded: true, blankAnswer: 'The farmer saves 20 metres by walking diagonally.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch9_10', title: 'Identify each idea',
          dissect: { specimen: 'The Baudhayana Pythagoras Theorem', spots: [
            { id: 's1', label: 'Baudhayanas Sulba-Sutra describes a geometric', prompt: 'Which idea is this? — Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly.', answer: 'Baudhayanas Sulba-Sutra describes a geometric', options: ['Baudhayanas Sulba-Sutra describes a geometric', 'The converse of the Baudhayana-Pythagoras', 'A square with double the', 'Halving a square is the'] },
            { id: 's2', label: 'The converse of the Baudhayana-Pythagoras', prompt: 'Which idea is this? — The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the.', answer: 'The converse of the Baudhayana-Pythagoras', options: ['The converse of the Baudhayana-Pythagoras', 'Baudhayanas Sulba-Sutra describes a geometric', 'A square with double the', 'Halving a square is the'] },
            { id: 's3', label: 'A square with double the', prompt: 'Which idea is this? — A square with double the area of a given square can be constructed by using the diagonal.', answer: 'A square with double the', options: ['A square with double the', 'Baudhayanas Sulba-Sutra describes a geometric', 'The converse of the Baudhayana-Pythagoras', 'Halving a square is the'] },
            { id: 's4', label: 'Halving a square is the', prompt: 'Which idea is this? — Halving a square is the geometric construction of a new square whose area is exactly half.', answer: 'Halving a square is the', options: ['Halving a square is the', 'Baudhayanas Sulba-Sutra describes a geometric', 'The converse of the Baudhayana-Pythagoras', 'A square with double the'] },
            { id: 's5', label: 'In an isosceles right triangle', prompt: 'Which idea is this? — In an isosceles right triangle, the two legs (sides forming the right angle) are equal in.', answer: 'In an isosceles right triangle', options: ['In an isosceles right triangle', 'Baudhayanas Sulba-Sutra describes a geometric', 'The converse of the Baudhayana-Pythagoras', 'A square with double the'] },
            { id: 's6', label: 'The Baudhayana-Pythagoras Theorem states that', prompt: 'Which idea is this? — The Baudhayana-Pythagoras Theorem states that in a right-angled triangle, the area of the.', answer: 'The Baudhayana-Pythagoras Theorem states that', options: ['The Baudhayana-Pythagoras Theorem states that', 'Baudhayanas Sulba-Sutra describes a geometric', 'The converse of the Baudhayana-Pythagoras', 'A square with double the'] }
          ] } }
    ],
    explore: { component: C8_MathematicsTheBaudhayanaPythagorasTheoremSim, prompt: 'Explore the interactive — The Baudhayana Pythagoras Theorem' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch9_1', difficulty: 'standard',
          question: 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square.',
          hint: 'Revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c6_math_ch07_073.',
          misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).',
          parts: [
                { id: 'a', prompt: 'What is the side length of a square whose area is double that of a square with side 5 cm, according to Baudhayana\'s Sulba-Sutra method?', answer: 'The side length is the diagonal of the original 5 cm square',
                  options: ['The side length is the diagonal of the original 5 cm square', 'doubling the side doubles the area (confusing linear and quadratic scaling)', 'doubling the side length of a square doubles its area (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).' },
                { id: 'b', prompt: 'A square courtyard has side 12 m. Using the Sulba-Sutra method, what is the area of the square constructed on its diagonal? Show your steps.', answer: 'Step 1: Original square side = 12 m, area = 12² = 144 m²',
                  options: ['Step 1: Original square side = 12 m, area = 12² = 144 m²', 'doubling the side length of a square doubles its area (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).' },
                { id: 'c', prompt: 'Compare the Sulba-Sutra\'s "doubling a square" method with the modern formula for the diagonal of a square (d = a√2).', answer: 'Same: both recognise the diagonal as √2 times the side',
                  options: ['Same: both recognise the diagonal as √2 times the side', 'they are the same thing', 'doubling the side length of a square doubles its area (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).' }
          ],
            remediations: { 'doubling-the-side-length-of': { steps: ['Have the student draw a 4 cm square on grid paper, count squares (16).', 'Draw its diagonal, use that as side for a new square, count its squares (32).', 'Then draw a square of side 8 cm (double the original side), count squares (64).', 'Ask: "Which new square has exactly double the area?" Guide them to see the diagonal square = 32 = 2×16, while the.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).',
          parts: [
                { id: 'a', prompt: 'A student claims: "To double a square\'s area, just multiply the side by 1.5 because 1.5² = 2.25 which is close to 2." Evaluate this claim and explain why the.', answer: 'The claim is incorrect: 1.5² = 2.25 gives 12.5% excess area, not exact doubling',
                  options: ['The claim is incorrect: 1.5² = 2.25 gives 12.5% excess area, not exact doubling', 'doubling the side length of a square doubles its area (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe doubling the side length of a square doubles its area (e.g., side 5 cm → side 10 cm for double area).' }
          ],
            remediations: { 'doubling-the-side-length-of': { steps: ['Have the student draw a 4 cm square on grid paper, count squares (16).', 'Draw its diagonal, use that as side for a new square, count its squares (32).', 'Then draw a square of side 8 cm (double the original side), count squares (64).', 'Ask: "Which new square has exactly double the area?" Guide them to see the diagonal square = 32 = 2×16, while the.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_10', difficulty: 'standard',
          question: 'The converse of the Baudhayana-Pythagoras theorem states that in any triangle,.',
          hint: 'Revisit the Pythagoras theorem statement (c8_math_ch9_5) and practice identifying the.',
          misconception: 'Students often forget to identify the longest side first and instead arbitrarily pick two sides to square and add,.',
          parts: [
                { id: 'a', prompt: 'A student claims that a triangle with sides 8 cm, 15 cm, and 16 cm is right-angled because \\(8^2 + 15^2 = 64 + 225 = 289\\) and \\(16^2 = 256\\), and 289 is close.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'close enough'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to identify the longest side first and instead arbitrarily pick two sides to square and add, comparing with the.' }
          ],
            remediations: { 'students-often-forget-to-identify': { steps: ['If a student makes this error, guide them through a three-step routine: (1) Circle the largest number in the set of.', '(2) Label the other two \'a\' and \'b\'.', '(3) Only then compute \\(a^2 + b^2\\) and compare with \\(c^2\\).', 'Practice with a set where the largest side is not the last one given (e.g., 10, 6, 8) to reinforce that order in the.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_2', difficulty: 'standard',
          question: 'A square with double the area of a given square can be constructed by using the.',
          hint: 'Review constructing perpendiculars (Class 6 Construction c6_math_ch11_116) and area of.',
          misconception: 'Students often think that to double the area of a square, they should double the side length.',
          parts: [
                { id: 'a', prompt: 'What is the side length of the new square constructed to have double the area of a square of side 5 cm?', answer: 'The side length of the new square is the diagonal of the original square',
                  options: ['The side length of the new square is the diagonal of the original square', 'to double the area of a square, they should double the side length'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that to double the area of a square, they should double the side length.' },
                { id: 'b', prompt: 'Construct a square with double the area of a square of side 3 cm. Show the steps of construction and calculate the area of the new square to verify.', answer: 'Steps: 1) Draw square ABCD of side 3 cm',
                  options: ['Steps: 1) Draw square ABCD of side 3 cm', 'to double the area of a square, they should double the side length'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that to double the area of a square, they should double the side length.' }
          ],
            remediations: { 'to-double-the-area-of': { steps: ['If a student doubles the side, ask: "What is the area of the original square?', 'What is the area of your new square?', 'How many times larger is it?" Let them compute: original area = \\(s^2\\), new area = \\((2s)^2 = 4s^2\\).', 'Then ask: "We want exactly 2 times, not 4 times.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that to double the area of a square, they should double the side length.',
          parts: [
                { id: 'a', prompt: 'Design a real-world problem where a farmer needs to double the area of a square field using only a rope and pegs (no measuring tape).', answer: 'Problem: A farmer has a square field of side 20 m',
                  options: ['Problem: A farmer has a square field of side 20 m', 'to double the area of a square, they should double the side length'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that to double the area of a square, they should double the side length.' }
          ],
            remediations: { 'to-double-the-area-of': { steps: ['If a student doubles the side, ask: "What is the area of the original square?', 'What is the area of your new square?', 'How many times larger is it?" Let them compute: original area = \\(s^2\\), new area = \\((2s)^2 = 4s^2\\).', 'Then ask: "We want exactly 2 times, not 4 times.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_3', difficulty: 'standard',
          question: 'Halving a square is the geometric construction of a new square whose area is.',
          hint: 'If stuck, review constructing a perpendicular bisector (c6_math_ch07_081) and the area.',
          misconception: 'Students often think that halving the side length of a square halves its area.',
          parts: [
                { id: 'a', prompt: 'Given a square of side 10 cm, what is the side length of a square with half its area? Express your answer in simplest radical form.', answer: 'The side length is \\(5\\sqrt{2}\\) cm',
                  options: ['The side length is \\(5\\sqrt{2}\\) cm', 'halving the side halves the area (a common linear thinking error)', 'halving the side length of a square halves its area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that halving the side length of a square halves its area.' },
                { id: 'b', prompt: 'A square courtyard has an area of 200 m². You need to mark out a smaller square garden inside it with exactly half the area.', answer: 'Original area = 200 m²',
                  options: ['Original area = 200 m²', 'halving the side length of a square halves its area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that halving the side length of a square halves its area.' },
                { id: 'c', prompt: 'Compare the two methods for halving a square: (A) joining the midpoints of the original square, and (B) constructing a square on half the diagonal.', answer: 'Yes, they are congruent',
                  options: ['Yes, they are congruent', 'halving the side length of a square halves its area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that halving the side length of a square halves its area.' }
          ],
            remediations: { 'halving-the-side-length-of': { steps: ['If a student gives side = 5 cm for a 10 cm square, do not just say "wrong".', 'Instead: 1) Ask them to compute the area of the original square (100 cm²).', '2) Ask for half that area (50 cm²).', '3) Ask what number multiplied by itself gives 50.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that halving the side length of a square halves its area.',
          parts: [
                { id: 'a', prompt: 'A student constructs a square of side 8 cm, then draws its diagonal and claims the square built on the full diagonal has half the area.', answer: 'The claim is false',
                  options: ['The claim is false', 'the diagonal produces double the area', 'halving the side length of a square halves its area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that halving the side length of a square halves its area.' }
          ],
            remediations: { 'halving-the-side-length-of': { steps: ['If a student gives side = 5 cm for a 10 cm square, do not just say "wrong".', 'Instead: 1) Ask them to compute the area of the original square (100 cm²).', '2) Ask for half that area (50 cm²).', '3) Ask what number multiplied by itself gives 50.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_4', difficulty: 'standard',
          question: 'In an isosceles right triangle, the two legs (sides forming the right angle).',
          hint: 'Revisit the geometric construction of "doubling a square" (c8_math_ch9_1) by folding or.',
          misconception: 'Students often confuse the linear scale factor with the area scale factor.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In an isosceles right triangle, the two legs (sides forming the right angle) are equal in',
                  options: ['In an isosceles right triangle, the two legs (sides forming the right angle) are equal in', 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly', 'The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the', 'A square with double the area of a given square can be constructed by using the diagonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the linear scale factor with the area scale factor.' }
          ],
            remediations: { 'students-often-confuse-the-linear': { steps: ['If a student adds the legs, guide them through a concrete area comparison: 1.', 'Draw a 5 cm leg and construct a square on it (area 25 cm²).', 'Draw the second equal leg and its square (another 25 cm²).', 'Combine the two squares to form a larger square of area 50 cm².'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the linear scale factor with the area scale factor.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "The hypotenuse of an isosceles right triangle is \\(10\\sqrt{2}\\) cm.', answer: 'Yes, the solution is correct',
                  options: ['Yes, the solution is correct', 'cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the linear scale factor with the area scale factor.' }
          ],
            remediations: { 'students-often-confuse-the-linear': { steps: ['If a student adds the legs, guide them through a concrete area comparison: 1.', 'Draw a 5 cm leg and construct a square on it (area 25 cm²).', 'Draw the second equal leg and its square (another 25 cm²).', 'Combine the two squares to form a larger square of area 50 cm².'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_5', difficulty: 'standard',
          question: 'The Baudhayana-Pythagoras Theorem states that in a right-angled triangle, the.',
          hint: 'Revisit "Types of Triangles: Based on Angles" (c7_math_ch07_005) to recognise right.',
          misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.',
          parts: [
                { id: 'a', prompt: 'A student draws a triangle with sides 5 cm, 12 cm, and 13 cm and says, "This is a right-angled triangle because \\(5 + 12 = 17\\) and \\(13\\) is close to \\(17\\).".', answer: 'The student incorrectly adds the side lengths instead of squaring them',
                  options: ['The student incorrectly adds the side lengths instead of squaring them', 'the theorem applies to all triangles, not just right-angled ones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.' },
                { id: 'b', prompt: 'Two right-angled triangles have the same hypotenuse length of 10 cm. Triangle X has legs 6 cm and 8 cm. Triangle Y has legs 5 cm and 5 cm. Is this possible?', answer: 'No, it is not possible',
                  options: ['No, it is not possible', 'yes, both are right triangles', 'the theorem applies to all triangles, not just right-angled ones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.' }
          ],
            remediations: { 'the-theorem-applies-to-all': { steps: ['If a student applies the theorem to a non-right triangle, first ask them to identify the right angle in their diagram.', 'If none exists, remind them the theorem is *only* for right-angled triangles.', 'For the \\((a+b)^2\\) error, have them draw squares on each side on grid paper: count unit squares in the two smaller.', 'Show algebraically that \\((a+b)^2 = a^2 + 2ab + b^2\\), which includes an extra \\(2ab\\) term not present in the theorem.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.',
          parts: [
                { id: 'a', prompt: 'Ravi claims that any triangle with sides 7 cm, 24 cm, and 25 cm is right-angled because \\(7^2 + 24^2 = 49 + 576 = 625 = 25^2\\).', answer: 'Ravi is correct',
                  options: ['Ravi is correct', 'the theorem applies to all triangles, not just right-angled ones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.' },
                { id: 'b', prompt: 'Create a real-world problem (Indian context) that requires using the Baudhayana-Pythagoras Theorem to find a missing length.', answer: 'Example problem: A 13 m long bamboo pole leans against a vertical wall',
                  options: ['Example problem: A 13 m long bamboo pole leans against a vertical wall', 'the theorem applies to all triangles, not just right-angled ones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.' },
                { id: 'c', prompt: 'Two right-angled triangles have the same hypotenuse length of 10 cm. Triangle X has legs 6 cm and 8 cm. Triangle Y has legs 5 cm and 5 cm. Is this possible?', answer: 'No, it is not possible',
                  options: ['No, it is not possible', 'yes, both are right triangles', 'the theorem applies to all triangles, not just right-angled ones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the theorem applies to all triangles, not just right-angled ones.' }
          ],
            remediations: { 'the-theorem-applies-to-all': { steps: ['If a student applies the theorem to a non-right triangle, first ask them to identify the right angle in their diagram.', 'If none exists, remind them the theorem is *only* for right-angled triangles.', 'For the \\((a+b)^2\\) error, have them draw squares on each side on grid paper: count unit squares in the two smaller.', 'Show algebraically that \\((a+b)^2 = a^2 + 2ab + b^2\\), which includes an extra \\(2ab\\) term not present in the theorem.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
