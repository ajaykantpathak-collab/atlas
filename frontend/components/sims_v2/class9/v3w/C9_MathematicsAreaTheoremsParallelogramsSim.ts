import type { SimDef } from '../../engine/types';
import C9_MathematicsAreaTheoremsParallelogramsSim from '../../../simulations/c6_12/C9_MathematicsAreaTheoremsParallelogramsSim';

/** v3 wrapped master — C9_MathematicsAreaTheoremsParallelogramsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicsareatheoremsparallelogramssim: SimDef = {
    id: 'v3w_c9_mathematicsareatheoremsparallelogramssim',
    title: 'Area of Rectangle and Parallelogram: Formulas',
    subtitle: 'Covers the derivation and application of area formulas for rectangles and parallelograms.',
    classLevel: 9, subject: 'mathematics', topic: 'Area of Rectangle and Parallelogram: Formulas',
    chapters: [],
    nodeIds: ['c9_math_ch6_4', 'c9_math_ch1_6', 'c9_math_ch6_6', 'c9_math_ch1_5', 'c9_math_ch1_8', 'c9_math_ch5_1', 'c9_math_ch5_3', 'c9_math_ch5_8', 'c9_math_ch6_1', 'c9_math_ch6_10', 'c9_math_ch6_11', 'c9_math_ch6_2', 'c9_math_ch6_5', 'c9_math_ch6_7', 'c9_math_ch6_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are designing a rectangular garden bed of length 12 m and breadth 8 m, and a parallelogram-shaped.', goal: 'Master Area of Rectangle and Parallelogram: Formulas.' },
    discovery: {
        question: 'Explain why every diameter of a circle is a chord, but not every chord is a diameter. Use the definitions of chord and diameter in your reasoning.',
        options: ['A chord is any segment joining two points on the circle', 'diameter is longer', 'they are the same'],
        answer: 'A chord is any segment joining two points on the circle',
        hook: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.',
    },
    teaching: [
        { title: 'The area of a rectangle is the product of.', text: 'The area of a rectangle is the product of its length and breadth (A = l × b), where length and breadth are perpendicular adjacent sides.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch6_4', title: 'The area of a rectangle is the product.',
          scaffold: { problem: 'A rectangular garden has a perimeter of 100 m. Its length is 10 m more than its breadth. Find the area of the garden in square metres.',
            steps: [
            { text: 'Let breadth = x metres. Then length = (x + 10) metres. Write perimeter formula: P = 2(l + b).' },
            { text: 'Substitute given perimeter and expressions: 2(x + 10 + x) = 100 → 2(2x + 10) = 100.' },
            { text: 'Simplify: 4x + 20 = 100 → 4x = 80 → x = 20. So breadth = 20 m, length = 30 m.' },
            { text: 'Compute area: A = l × b = 30 × 20 = 600 m².' },
            { text: 'Verify: Perimeter = 2(30+20) = 100 m ✓. Area = 600 m².', faded: true, blankAnswer: '600 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_6', title: 'The distance formula calculates the.',
          scaffold: { problem: 'A town planner marks the locations of a hospital \\(H(3, 4)\\), a fire station \\(F(7, 1)\\), and a police station \\(P(1, 2)\\) on a coordinate.',
            steps: [
            { text: 'Identify the coordinates: \\(P(1,2)\\), \\(H(3,4)\\), \\(F(7,1)\\). The route is \\(P \\to H \\to F \\to P\\).' },
            { text: 'Write the distance formula for each pair. \\(PH = \\sqrt{(3-1)^2 + (4-2)^2}\\), \\(HF = \\sqrt{(7-3)^2 + (1-4)^2}\\), \\(FP =.' },
            { text: 'Substitute and simplify each:' },
            { text: 'Add the three distances: Total distance = \\(2\\sqrt{2} + 5 + \\sqrt{37}\\) km.' },
            { text: 'Approximate for practical interpretation: \\(2\\sqrt{2} \\approx 2.828\\), \\(\\sqrt{37} \\approx 6.083\\).', faded: true, blankAnswer: 'Total distance = \\(5 + 2\\sqrt{2} + \\sqrt{37}\\) km (exact) ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_6', title: 'Heron\'s Formula calculates the area of.',
          scaffold: { problem: 'A triangular traffic island in Delhi has sides measuring 15 m, 20 m, and 25 m. The municipal corporation wants to plant grass on it.',
            steps: [
            { text: 'Identify the given sides: a = 15 m, b = 20 m, c = 25 m. We need to find area using Heron\'s Formula since height is not.' },
            { text: 'Compute the semi-perimeter s = (a+b+c)/2 = (15+20+25)/2 = 60/2 = 30 m.' },
            { text: 'Compute each factor: s-a = 30-15 = 15, s-b = 30-20 = 10, s-c = 30-25 = 5.' },
            { text: 'Substitute into Heron\'s Formula: Area = √[s(s-a)(s-b)(s-c)] = √[30 × 15 × 10 × 5] = √[22500].' },
            { text: 'Simplify: √22500 = √(225 × 100) = 15 × 10 = 150 m². Cost = 150 × ₹50 = ₹7500.', faded: true, blankAnswer: 'Area = 150 m², Cost = ₹7500' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_5', title: 'The distance between two points on a.',
          scaffold: { problem: 'Two trees are planted on the same east-west boundary line of a farm.',
            steps: [
            { text: 'Identify the given coordinates: A(15, 10) and B(-8, 10). Note the y-coordinates are both 10.' },
            { text: 'Since y-coordinates are equal, the trees lie on a horizontal line (parallel to x-axis).' },
            { text: 'Substitute x₁ = 15, x₂ = -8 into the formula: Distance = |-8 - 15|.' },
            { text: 'Compute the subtraction inside absolute value: -8 - 15 = -23. Then take absolute value: |-23| = 23.' },
            { text: 'Interpret the result: The distance between the trees is 23 metres.', faded: true, blankAnswer: '23 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_8', title: 'The midpoint formula is a special case.',
          scaffold: { problem: 'A straight highway connects City P at (12, -8) and City Q at (-4, 16) on a state map.',
            steps: [
            { text: 'Identify the given endpoints: P(12, -8) and Q(-4, 16). The rest house is at the midpoint M.' },
            { text: 'Apply the midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).' },
            { text: 'Substitute coordinates: x = (12 + (-4))/2 = 8/2 = 4; y = (-8 + 16)/2 = 8/2 = 4. So M = (4, 4).' },
            { text: 'Find distance from P to M using distance formula: √[(4-12)² + (4-(-8))²] = √[(-8)² + (12)²] = √[64 + 144] = √208 = 4√13.' },
            { text: 'Convert to kilometres: 4√13 units × 5 km/unit = 20√13 km ≈ 72.11 km. Since M is midpoint, distance to Q is the same.', faded: true, blankAnswer: 'Rest house at (4, 4); distance from each city = 20√13 km (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_1', title: 'A circle is the set of all points in a.',
          scaffold: { problem: 'A circular fountain in a park has centre O. The distance from O to the edge is 6 m.',
            steps: [
            { text: 'Identify the given fixed distance from centre to edge = 6 m. This is the radius. So OA = OB = OC = OD = 6 m.' },
            { text: 'The pipe AB passes through centre O and has endpoints on the circle. By definition, this is a diameter.' },
            { text: 'The rope CD joins two points on the circle but does not pass through O.' },
            { text: 'The gardener\'s curved path from C to D along the circle is an arc. Since it\'s the shorter path, it\'s the minor arc CD.' },
            { text: 'The region bounded by radii OC, OD and arc CD is a sector (sector O-CD).', faded: true, blankAnswer: '(i) Radius = 6 m (e.g., OA), (ii) Diameter AB = 12 m, (iii).' }
            ] } },
        { type: 'dissect', nodeId: 'c9_math_ch1_6', title: 'Identify each idea',
          dissect: { specimen: 'Area of Rectangle and Parallelogram: Formulas', spots: [
            { id: 's1', label: 'The area of a rectangle', prompt: 'Which idea is this? — The area of a rectangle is the product of its length and breadth (A = l × b), where.', answer: 'The area of a rectangle', options: ['The area of a rectangle', 'The distance formula calculates the', 'Herons Formula calculates the area', 'The distance between two points'] },
            { id: 's2', label: 'The distance formula calculates the', prompt: 'Which idea is this? — The distance formula calculates the length of the line segment joining two points.', answer: 'The distance formula calculates the', options: ['The distance formula calculates the', 'The area of a rectangle', 'Herons Formula calculates the area', 'The distance between two points'] },
            { id: 's3', label: 'Herons Formula calculates the area', prompt: 'Which idea is this? — Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,.', answer: 'Herons Formula calculates the area', options: ['Herons Formula calculates the area', 'The area of a rectangle', 'The distance formula calculates the', 'The distance between two points'] },
            { id: 's4', label: 'The distance between two points', prompt: 'Which idea is this? — The distance between two points on a line parallel to the x-axis is the absolute.', answer: 'The distance between two points', options: ['The distance between two points', 'The area of a rectangle', 'The distance formula calculates the', 'Herons Formula calculates the area'] },
            { id: 's5', label: 'The midpoint formula is a', prompt: 'Which idea is this? — The midpoint formula is a special case of the section formula for internal division where.', answer: 'The midpoint formula is a', options: ['The midpoint formula is a', 'The area of a rectangle', 'The distance formula calculates the', 'Herons Formula calculates the area'] },
            { id: 's6', label: 'A circle is the set', prompt: 'Which idea is this? — A circle is the set of all points in a plane that are at a fixed distance (called the.', answer: 'A circle is the set', options: ['A circle is the set', 'The area of a rectangle', 'The distance formula calculates the', 'Herons Formula calculates the area'] }
          ] } }
    ],
    explore: { component: C9_MathematicsAreaTheoremsParallelogramsSim, prompt: 'Explore the interactive — Area of Rectangle and Parallelogram: Formulas' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch6_4', difficulty: 'standard',
          question: 'The area of a rectangle is the product of its length and breadth (A = l × b),.',
          hint: 'If stuck, revisit Class 8 node c8_math_ch14_3 (Area of a Parallelogram: Base x Height).',
          misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the product of its length and breadth (A = l × b), where',
                  options: ['The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The distance formula calculates the length of the line segment joining two points', 'Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,', 'The distance between two points on a line parallel to the x-axis is the absolute'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).' }
          ],
            remediations: { 'students-use-the-slant-side': { steps: ['Draw a parallelogram on grid paper.', 'Draw the slant side of 10 cm at an angle.', 'Drop a perpendicular from the top vertex to the base — measure it: it\'s 8 cm, not 10 cm.', 'Cut along the perpendicular and slide the triangle to form a rectangle of dimensions 12 cm × 8 cm.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_6', difficulty: 'standard',
          question: 'The distance formula calculates the length of the line segment joining two.',
          hint: 'If stuck, revisit c9_math_ch1_4 (derivation) to see the right triangle, and.',
          misconception: 'Students often incorrectly apply the distance formula when one or both points have negative coordinates.',
          parts: [
                { id: 'a', prompt: 'A student claims that the distance between \\(A(1, 2)\\) and \\(B(4, 6)\\) is 7 because \\(4-1=3\\) and \\(6-2=4\\) and \\(3+4=7\\).', answer: 'The student incorrectly added the horizontal and vertical differences (Manhattan',
                  options: ['The student incorrectly added the horizontal and vertical differences (Manhattan', 'the answer is 7, they are confusing the sum of legs with the hypotenuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly apply the distance formula when one or both points have negative coordinates.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student makes sign errors with negative coordinates, have them rewrite the substitution step explicitly: "\\(x_1 =.', 'Use a number line to show that the distance between -3 and 1 is 4, not -2.', 'For the squaring error, remind them: "If \\(\\sqrt{A} = d\\), then \\(A = d^2\\).', 'The square root covers the whole sum, so squaring removes it entirely." Practice 5 problems where coordinates are.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_6', difficulty: 'standard',
          question: 'Heron\'s Formula calculates the area of a triangle when the lengths of all three.',
          hint: 'If stuck, review c8_math_ch1_8 (square roots) and c8_math_ch1_9 (estimating square roots).',
          misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).',
          parts: [
                { id: 'a', prompt: 'Two triangles have the same perimeter: Triangle P has sides 6 cm, 8 cm, 10 cm. Triangle Q has sides 7 cm, 7 cm, 10 cm.', answer: 'Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²',
                  options: ['Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²', 'same perimeter means same area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).' }
          ],
            remediations: { 'students-compute-s-a-b': { steps: ['If a student uses full perimeter instead of semi-perimeter: (1) Ask them to compute the perimeter of a 3-4-5 triangle.', '(2) Have them recalculate Heron\'s Formula with s=6: √[6×3×2×1] = √36 = 6, matching ½×3×4=6.', '(3) Then with s=12: √[12×9×8×7] = √6048 ≈ 77.8, clearly wrong.', '(4) Emphasize: "s is ALWAYS half the perimeter.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).',
          parts: [
                { id: 'a', prompt: 'Two triangles have the same perimeter: Triangle P has sides 6 cm, 8 cm, 10 cm. Triangle Q has sides 7 cm, 7 cm, 10 cm.', answer: 'Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²',
                  options: ['Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²', 'same perimeter means same area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).' }
          ],
            remediations: { 'students-compute-s-a-b': { steps: ['If a student uses full perimeter instead of semi-perimeter: (1) Ask them to compute the perimeter of a 3-4-5 triangle.', '(2) Have them recalculate Heron\'s Formula with s=6: √[6×3×2×1] = √36 = 6, matching ½×3×4=6.', '(3) Then with s=12: √[12×9×8×7] = √6048 ≈ 77.8, clearly wrong.', '(4) Emphasize: "s is ALWAYS half the perimeter.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_5', difficulty: 'standard',
          question: 'The distance between two points on a line parallel to the x-axis is the.',
          hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) and c9_math_ch1_3.',
          misconception: 'Students often subtract coordinates in the wrong order and forget the absolute value, writing distance = y₁ - y₂ (or x₁.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points on a line parallel to the x-axis is the absolute',
                  options: ['The distance between two points on a line parallel to the x-axis is the absolute', 'The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The distance formula calculates the length of the line segment joining two points', 'Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often subtract coordinates in the wrong order and forget the absolute value, writing distance = y₁ - y₂ (or x₁ - x₂) which can.' }
          ],
            remediations: { 'students-often-subtract-coordinates-in': { steps: ['If a student gives a negative distance, ask: "Can the length of a segment be negative?', 'What does the absolute value bars mean?" Guide them to place the larger coordinate first or use | |.', 'If they use the full formula, ask: "What is (x₂-x₁) when x-coordinates are same?', 'What does the formula become then?" Have them derive the simplified rule from the general formula once, then practice 5.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_8', difficulty: 'standard',
          question: 'The midpoint formula is a special case of the section formula for internal.',
          hint: 'If stuck, revisit c9_math_ch1_7 (Section Formula: Internal Division) and practice.',
          misconception: 'Students often treat the midpoint formula as (x₁ + x₂, y₁ + y₂) — i.e., they add the coordinates but forget to divide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The midpoint formula is a special case of the section formula for internal division where',
                  options: ['The midpoint formula is a special case of the section formula for internal division where', 'The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The distance formula calculates the length of the line segment joining two points', 'Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the midpoint formula as (x₁ + x₂, y₁ + y₂) — i.e., they add the coordinates but forget to divide by 2.' }
          ],
            remediations: { 'students-often-treat-the-midpoint': { steps: ['Ask them to find the midpoint of (0,0) and (10,0) on a number line. They will say 5.', 'Show that (0+10)/2 = 5, but (0+10) = 10 which is the endpoint.', 'Generalize: midpoint = (sum)/2. For sign errors:', 'Use a number line to show -3 and 1 have midpoint -1.', 'Compute (-3+1)/2 = -1.', 'Practice 5 examples with mixed signs, emphasizing that the midpoint lies between the numbers, so its coordinate must be.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_1', difficulty: 'standard',
          question: 'A circle is the set of all points in a plane that are at a fixed distance.',
          hint: 'Review Class 6 Geometry: Points, Lines, Line Segments (c6_math_ch07_070) and Circle.',
          misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.',
          parts: [
                { id: 'a', prompt: 'Explain why every diameter of a circle is a chord, but not every chord is a diameter. Use the definitions of chord and diameter in your reasoning.', answer: 'A chord is any segment joining two points on the circle',
                  options: ['A chord is any segment joining two points on the circle', 'diameter is longer', 'they are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' },
                { id: 'b', prompt: 'In a circle with centre O and radius 7 cm, points A, B, C lie on the circumference such that AB passes through O and AC does not.', answer: '(i) AB (passes through O, length 14 cm)',
                  options: ['(i) AB (passes through O, length 14 cm)', 'passes through centre'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' },
                { id: 'c', prompt: 'Compare a sector and a segment of a circle. Draw a labelled diagram for each and explain which radii/chords bound them.', answer: 'A sector is bounded by two radii and an arc',
                  options: ['A sector is bounded by two radii and an arc', 'segment is larger', 'they are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' }
          ],
            remediations: { 'students-treat-chord-and-diameter': { steps: ['Return to the definition: "A radius is a segment from the centre to the circle." Have the student physically place a.', 'For diameter: "Fold a circular paper so the edges match – the crease passes through the centre.', 'Practice: Give 5 diagrams; for each, ask "Is this a radius?', 'Why/why not?" forcing the student to check both endpoints.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
