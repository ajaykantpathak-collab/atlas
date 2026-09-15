import type { SimDef } from '../../engine/types';
import C10_MathematicsCoordinateGeometrySim from '../../../simulations/c6_12/C10_MathematicsCoordinateGeometrySim';

/** v3 wrapped master — C10_MathematicsCoordinateGeometrySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicscoordinategeometrysim: SimDef = {
    id: 'v3w_c10_mathematicscoordinategeometrysim',
    title: 'Coordinate Geometry',
    subtitle: 'This node covers the midpoint formula as a special case of the internal section formula.',
    classLevel: 10, subject: 'mathematics', topic: 'Section Formula: Finding the Midpoint',
    chapters: [],
    nodeIds: ['c10_math_cbse_07_005', 'c10_math_cbse_07_006', 'c10_math_cbse_07_007', 'c10_math_cbse_07_008', 'c10_math_cbse_07_009', 'c10_math_cbse_06_007', 'c10_math_cbse_06_009', 'c10_math_cbse_06_011', 'c10_math_cbse_10_003', 'c10_math_cbse_10_006', 'c10_math_cbse_10_008', 'c10_math_cbse_10_010', 'c10_math_cbse_11_010', 'c10_math_cbse_07_001', 'c10_math_cbse_07_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are designing a rectangular garden plot for your school\'s eco-club.', goal: 'Master Coordinate Geometry.' },
    discovery: {
        question: 'Points A(2, 3), B(6, 7), C(8, 3), and D(4, -1) form a quadrilateral.',
        options: ['Find midpoints of diagonals AC and BD', 'diagonals of a parallelogram bisect each other', 'distance from origin'],
        answer: 'Find midpoints of diagonals AC and BD',
        hook: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ +.',
    },
    teaching: [
        { title: 'The midpoint of a line segment joining two.', text: 'The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂) is the point M(x, y) that divides the segment internally in the ratio 1:1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_005', title: 'The midpoint of a line segment joining.',
          scaffold: { problem: 'The endpoints of a diameter of a circular park are A(3, -4) and B(-5, 6).',
            steps: [
            { text: 'Identify the given information. Endpoints of diameter: A(3, -4) and B(-5, 6).' },
            { text: 'Write the midpoint formula: Centre (h, k) = ((x₁ + x₂)/2, (y₁ + y₂)/2).' },
            { text: 'Substitute the coordinates: h = (3 + (-5))/2, k = (-4 + 6)/2.' },
            { text: 'Simplify: h = (-2)/2 = -1; k = (2)/2 = 1.' },
            { text: 'State the answer with units: The fountain should be placed at (-1, 1) metres from the origin (park gate reference).', faded: true, blankAnswer: 'Centre = (-1, 1) metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_006', title: 'The section formula for internal.',
          scaffold: { problem: 'A straight highway connects City A at (10, 20) and City B at (40, 50) on a state map (coordinates in km).',
            steps: [
            { text: 'Identify the given data. A(10, 20), B(40, 50). The rest stop is 3/7 of the way from A to B.' },
            { text: 'Write the section formula for internal division: x = (m x₂ + n x₁)/(m+n), y = (m y₂ + n y₁)/(m+n).' },
            { text: 'Substitute the values: x = (3×40 + 4×10)/(3+4) = (120 + 40)/7 = 160/7. y = (3×50 + 4×20)/7 = (150 + 80)/7 = 230/7.' },
            { text: 'Simplify the coordinates: x = 160/7 ≈ 22.857 km, y = 230/7 ≈ 32.857 km. Keep as fractions for exactness: (160/7, 230/7).' },
            { text: 'Verify by checking the ratio using distances or the other coordinate.', faded: true, blankAnswer: '(160/7, 230/7) or approximately (22.86, 32.86) km' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_007', title: 'The area of a triangle with vertices.',
          scaffold: { problem: 'A triangular garden in a school in Delhi has corners marked at coordinates A(3, 2), B(7, 5), C(9, 1) on the school map (1 unit = 10.',
            steps: [
            { text: 'Identify the given coordinates: A(3,2), B(7,5), C(9,1). Note the scale: 1 unit = 10 m, so 1 sq unit = 100 sq m.' },
            { text: 'Write the area formula: Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|' },
            { text: 'Substitute the coordinates: x₁=3, y₁=2; x₂=7, y₂=5; x₃=9, y₃=1.' },
            { text: 'Simplify step by step:' },
            { text: 'Convert to actual area: 11 sq units × 100 sq m/sq unit = 1100 sq m.', faded: true, blankAnswer: 'Area = 1100 m², Total cost = ₹49,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_009', title: 'Three points A(x₁, y₁), B(x₂, y₂), and.',
          scaffold: { problem: 'A straight road passes through three milestones located at coordinates A(2, 5), B(5, 11), and C(8, k) on a survey map (units in.',
            steps: [
            { text: 'Identify the given coordinates: A(2, 5) → x₁=2, y₁=5; B(5, 11) → x₂=5, y₂=11; C(8, k) → x₃=8, y₃=k.' },
            { text: 'Write the collinearity condition using the area formula: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0.' },
            { text: 'Substitute the known values: 2(11 - k) + 5(k - 5) + 8(5 - 11) = 0.' },
            { text: 'Simplify step by step: 2(11 - k) = 22 - 2k; 5(k - 5) = 5k - 25; 8(5 - 11) = 8(-6) = -48.' },
            { text: 'Combine like terms: 22 - 25 - 48 = -51; -2k + 5k = 3k. So: 3k - 51 = 0 → 3k = 51 → k = 17.' },
            { text: 'Verify by substituting k=17 back: 2(11-17) + 5(17-5) + 8(5-11) = 2(-6) + 5(12) + 8(-6) = -12 + 60 - 48 = 0. ✓', faded: true, blankAnswer: 'k = 17 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_007', title: 'The SAS (Side-Angle-Side) similarity.',
          scaffold: { problem: 'A vertical pole of height 2.5 m casts a shadow 1.2 m long on the ground. At the same time, a tower casts a shadow 48 m long.',
            steps: [
            { text: 'Identify the two right triangles: Triangle 1 formed by the pole (vertical), its shadow (horizontal), and the sun ray.' },
            { text: 'Verify SAS similarity: In both triangles, the included angle (angle of elevation) is equal.' },
            { text: 'Set up proportion: 2.5 / h = 1.2 / 48, where h = height of tower in metres.' },
            { text: 'Cross-multiply: 2.5 × 48 = 1.2 × h → 120 = 1.2h → h = 120 / 1.2 = 100.' },
            { text: 'Interpret: The tower is 100 m high. Check: scale factor = 48/1.2 = 40; 2.5 × 40 = 100. Correct.', faded: true, blankAnswer: '100 m' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_07_006', title: 'Identify each idea',
          dissect: { specimen: 'Coordinate Geometry', spots: [
            { id: 's1', label: 'The midpoint of a line', prompt: 'Which idea is this? — The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂) is the point.', answer: 'The midpoint of a line', options: ['The midpoint of a line', 'The section formula for internal', 'The area of a triangle', 'Three points Ax y Bx'] },
            { id: 's2', label: 'The section formula for internal', prompt: 'Which idea is this? — The section formula for internal division states that if a point P(x, y) divides the line.', answer: 'The section formula for internal', options: ['The section formula for internal', 'The midpoint of a line', 'The area of a triangle', 'Three points Ax y Bx'] },
            { id: 's3', label: 'The area of a triangle', prompt: 'Which idea is this? — The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian.', answer: 'The area of a triangle', options: ['The area of a triangle', 'The midpoint of a line', 'The section formula for internal', 'Three points Ax y Bx'] },
            { id: 's4', label: 'Three points Ax y Bx', prompt: 'Which idea is this? — Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only if the area of.', answer: 'Three points Ax y Bx', options: ['Three points Ax y Bx', 'The midpoint of a line', 'The section formula for internal', 'The area of a triangle'] },
            { id: 's5', label: 'The SAS Side-Angle-Side similarity criterion', prompt: 'Which idea is this? — The SAS (Side-Angle-Side) similarity criterion states that if one angle of a triangle is.', answer: 'The SAS Side-Angle-Side similarity criterion', options: ['The SAS Side-Angle-Side similarity criterion', 'The midpoint of a line', 'The section formula for internal', 'The area of a triangle'] }
          ] } }
    ],
    explore: { component: C10_MathematicsCoordinateGeometrySim, prompt: 'Explore the interactive — Coordinate Geometry' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_07_005', difficulty: 'standard',
          question: 'The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂) is.',
          hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
          misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ +.',
          parts: [
                { id: 'a', prompt: 'State the midpoint formula for the line segment joining points P(x₁, y₁) and Q(x₂, y₂). Explain in one sentence what the formula calculates.', answer: 'The midpoint formula is M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
                  options: ['The midpoint formula is M = ((x₁ + x₂)/2, (y₁ + y₂)/2)', 'distance from origin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' },
                { id: 'b', prompt: 'The midpoint of segment AB is M(4, -2). If A has coordinates (6, 0), a student calculates B as (2, -4) by doing (6 - 4, 0 - (-2)). Is this correct?', answer: 'No, the student\'s method is incorrect',
                  options: ['No, the student\'s method is incorrect', 'distance from origin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' },
                { id: 'c', prompt: 'Find the midpoint of the line segment joining the points A(-3, 5) and B(7, -9). Show all steps.', answer: 'Step 1: Identify coordinates: x₁ = -3, y₁ = 5',
                  options: ['Step 1: Identify coordinates: x₁ = -3, y₁ = 5', 'distance from origin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' }
          ],
            remediations: { 'students-often-treat-the-midpoint': { steps: ['If a student makes the "half-difference" error, do the following: 1) Draw a number line, mark points at 2 and 6.', 'Ask: "What number is exactly halfway?" They will say 4.', 'Show that (2+6)/2 = 4, while (6-2)/2 = 2.', '2) Extend to 2D: plot A(2,3) and B(6,7) on graph paper.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ +.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the point on the x-axis equidistant from A(2, -5) and B(-2, 9)." They write: "Let point be P(x, 0).', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'equidistant point on an axis', 'midpoint', 'distance from origin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' }
          ],
            remediations: { 'students-often-treat-the-midpoint': { steps: ['If a student makes the "half-difference" error, do the following: 1) Draw a number line, mark points at 2 and 6.', 'Ask: "What number is exactly halfway?" They will say 4.', 'Show that (2+6)/2 = 4, while (6-2)/2 = 2.', '2) Extend to 2D: plot A(2,3) and B(6,7) on graph paper.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_006', difficulty: 'standard',
          question: 'The section formula for internal division states that if a point P(x, y).',
          hint: 'If stuck, revisit c10_math_cbse_07_004 (Section Formula: Internal Division) for formula.',
          misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first.',
          parts: [
                { id: 'a', prompt: 'State the section formula for internal division. If point P divides AB in the ratio m:n, what are the coordinates of P in terms of A(x₁, y₁) and B(x₂, y₂)?', answer: 'The coordinates are P((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n))',
                  options: ['The coordinates are P((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n))', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' },
                { id: 'b', prompt: 'A student is asked: "Find the coordinates of the point that divides the segment joining (2, 3) and (8, 7) in the ratio 1:2." The student writes: x = (1×2 +.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' },
                { id: 'c', prompt: 'Find the coordinates of the point that divides the line segment joining A(−4, 5) and B(6, −3) internally in the ratio 2:3.', answer: 'Given A(−4,5), B(6,−3), ratio m:n = 2:3',
                  options: ['Given A(−4,5), B(6,−3), ratio m:n = 2:3', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['If a student makes the ratio-order error, do the following: 1) Draw a number line with points 0 and 10.', 'Ask: "Where is the point that divides 0 to 10 in ratio 1:4?" The answer is 2 (since 1 part out of 5 from 0).', 'Show that the weight of 10 is 1 and weight of 0 is 4.', '2) Write the formula with color coding: x = (m·x₂ + n·x₁)/(m+n).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the ratio in which the point (−1, 6) divides the segment joining (−3, 10) and (6, −8)." The student sets up: (-1) = (m×6 +.', answer: 'The student\'s method is correct and the answer is correct',
                  options: ['The student\'s method is correct and the answer is correct', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' },
                { id: 'b', prompt: 'Create a real-life problem (Indian context) that requires using the section formula to find an unknown coordinate.', answer: 'Example problem: "A straight road connects two villages A and B',
                  options: ['Example problem: "A straight road connects two villages A and B', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['If a student makes the ratio-order error, do the following: 1) Draw a number line with points 0 and 10.', 'Ask: "Where is the point that divides 0 to 10 in ratio 1:4?" The answer is 2 (since 1 part out of 5 from 0).', 'Show that the weight of 10 is 1 and weight of 0 is 4.', '2) Write the formula with color coding: x = (m·x₂ + n·x₁)/(m+n).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_007', difficulty: 'standard',
          question: 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the.',
          hint: 'If stuck, revisit c9_math_ch1_11 (Class 9 area formula) and c6_math_ch08_088 (basic.',
          misconception: 'Students often forget the absolute value bars and report negative area.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian',
                  options: ['The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian', 'The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂) is the point', 'The section formula for internal division states that if a point P(x, y) divides the line', 'The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and \\(C(x_3,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget the absolute value bars and report negative area.' }
          ],
            remediations: { 'students-often-forget-the-absolute': { steps: ['If a student forgets absolute value: Ask them to plot the points and see if area can be negative.', 'Demonstrate with two vertex orders: (1,1), (4,5), (7,2) vs (1,1), (7,2), (4,5).', 'Show the determinant changes sign but area is same.', 'Make them write "| |" in the formula every time.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_008', difficulty: 'standard',
          question: 'The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and.',
          hint: 'If stuck, review the derivation of the area formula in node c10_math_cbse_07_007 and.',
          misconception: '**Misconception 1: Forgetting the absolute value bars.** Students compute \\(x_1(y_2-y_3)+...\\) and get a negative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and \\(C(x_3,',
                  options: ['The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and \\(C(x_3,', 'The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂) is the point', 'The section formula for internal division states that if a point P(x, y) divides the line', 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1: Forgetting the absolute value bars.** Students compute \\(x_1(y_2-y_3)+...\\) and get a negative number (e.g., -12) and.' }
          ],
            remediations: { 'misconception-1-forgetting-the-absolute': { steps: ['** Ask them to plot the points (0,0), (4,0), (0,3) and (0,0), (0,3), (4,0) on graph paper. **', '** Compute area using the formula for both orders. Show that one gives +6, the other -6. **', '** Explain that area is a physical quantity, always positive. The formula without absolute value gives "signed area".', '** Drill: "Always write | ... | before evaluating." If they forget \\(\\frac{1}{2}\\): Remind them the formula comes from.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_009', difficulty: 'standard',
          question: 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only if.',
          hint: 'If stuck, revisit c10_math_cbse_07_007 (Area of Triangle Formula) and practice 5-10.',
          misconception: 'Students often write the collinearity condition as |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| = 0 (with absolute value).',
          parts: [
                { id: 'a', prompt: 'State the exact algebraic condition for three points A(x₁, y₁), B(x₂, y₂), C(x₃, y₃) to be collinear using the area of triangle formula.', answer: 'The condition is: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0',
                  options: ['The condition is: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0', 'Area = 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the collinearity condition as |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| = 0 (with absolute value) and then drop the.' }
          ],
            remediations: { 'students-often-write-the-collinearity': { steps: ['If a student makes sign errors in the differences (y₂ - y₃), (y₃ - y₁), (y₁ - y₂), use this remediation: 1.', 'Have them write the three points vertically with labels: Point 1: (x₁, y₁), Point 2: (x₂, y₂), Point 3: (x₃, y₃).', 'Make them write the three differences as a chant: "y₂ minus y₃, y₃ minus y₁, y₁ minus y₂" — notice the cyclic pattern:.', 'Practice with a fixed template: x₁( y₂ - y₃ ) + x₂( y₃ - y₁ ) + x₃( y₁ - y₂ ) = 0.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_007', difficulty: 'standard',
          question: 'The SAS (Side-Angle-Side) similarity criterion states that if one angle of a.',
          hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics.',
          misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR and ΔXYZ, ∠Q = ∠Y = 50°. The sides are PQ = 6 cm, QR = 8 cm, XY = 9 cm, YZ = 12 cm.', answer: 'Correct answer: The student is INCORRECT',
                  options: ['Correct answer: The student is INCORRECT', 'including', 'the sides must be equal, not proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' },
                { id: 'b', prompt: 'ΔABC has AB = 4 cm, AC = 6 cm, and ∠A = 40°. ΔDEF has DE = 6 cm, DF = 9 cm, and ∠D = 40°. Are the triangles similar? If yes, find BC if EF = 7.5 cm.', answer: 'Correct answer: Yes, ΔABC ~ ΔDEF by SAS',
                  options: ['Correct answer: Yes, ΔABC ~ ΔDEF by SAS', 'the sides must be equal, not proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' },
                { id: 'c', prompt: 'Two triangles have two pairs of sides proportional: AB/DE = AC/DF = 3/4. The angles given are ∠B = ∠E = 50°. Can you conclude the triangles are similar by SAS?', answer: 'Correct answer: No, you cannot conclude similarity by SAS',
                  options: ['Correct answer: No, you cannot conclude similarity by SAS', 'included angle', 'the sides must be equal, not proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' }
          ],
            remediations: { 'students-often-confuse-sas-similarity': { steps: ['If a student makes the "non-included angle" error: (1) Draw two triangles with the same two side lengths but different.', '(2) Label the sides and angle clearly: "The angle MUST be the one BETWEEN the two sides you are comparing." (3).', '(4) Use a colour-coding technique: highlight the angle in red, the two sides in blue.', 'Only if the red angle sits between the two blue sides in BOTH triangles can you use SAS.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "In ΔABC and ΔPQR, AB/PQ = AC/PR = 2/5 and ∠A = ∠P = 30°. If BC = 6 cm, find QR." The student writes: QR = (5/2) × 6 = 15 cm.', answer: 'Correct answer: The student\'s solution is CORRECT',
                  options: ['Correct answer: The student\'s solution is CORRECT', 'the sides must be equal, not proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' }
          ],
            remediations: { 'students-often-confuse-sas-similarity': { steps: ['If a student makes the "non-included angle" error: (1) Draw two triangles with the same two side lengths but different.', '(2) Label the sides and angle clearly: "The angle MUST be the one BETWEEN the two sides you are comparing." (3).', '(4) Use a colour-coding technique: highlight the angle in red, the two sides in blue.', 'Only if the red angle sits between the two blue sides in BOTH triangles can you use SAS.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
