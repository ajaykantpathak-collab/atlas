import type { SimDef } from '../../engine/types';
import C9_MathematicsSidesTriangleGreaterSim from '../../../simulations/c6_12/C9_MathematicsSidesTriangleGreaterSim';

/** v3 wrapped master — C9_MathematicsSidesTriangleGreaterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicssidestrianglegreatersim: SimDef = {
    id: 'v3w_c9_mathematicssidestrianglegreatersim',
    title: 'Perimeter of Plane Figures: Rectangle, Triangle, Square',
    subtitle: 'Covers perimeter formulas for rectangles, squares, and triangles (including isosceles and.',
    classLevel: 9, subject: 'mathematics', topic: 'Perimeter of Plane Figures: Rectangle, Triangle, Square',
    chapters: [],
    nodeIds: ['c9_math_ch6_1', 'c9_math_ch6_5', 'c9_math_ch6_6', 'c9_math_ch6_7', 'c9_math_ch6_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are helping your family fence a rectangular garden that is 12 metres long and 8 metres wide.', goal: 'Master Perimeter of Plane Figures: Rectangle, Triangle, Square.' },
    discovery: {
        question: 'An isosceles triangle has a perimeter of 36 cm. The base is 4 cm less than each equal side. Find the length of each side.',
        options: ['Let each equal side be $x$ cm', '4 cm less', '2(l+b)'],
        answer: 'Let each equal side be $x$ cm',
        hook: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add.',
    },
    teaching: [
        { title: 'The perimeter of a plane figure is the total.', text: 'The perimeter of a plane figure is the total length of its boundary, calculated as the sum of the lengths of all its sides.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch6_1', title: 'The perimeter of a plane figure is the.',
          scaffold: { problem: 'A rectangular playground has length 35 m and breadth 20 m. The school wants to put a boundary rope around it. The rope costs ₹12 per metre.',
            steps: [
            { text: 'Identify given values: length $l = 35$ m, breadth $b = 20$ m, cost per metre = ₹12, budget = ₹1500.' },
            { text: 'Recall perimeter formula for rectangle: $P = 2(l + b)$. This gives total metres of rope needed.' },
            { text: 'Substitute values: $P = 2(35 + 20) = 2 \\times 55 = 110$ m. So 110 metres of rope is needed.' },
            { text: 'Calculate total cost: Cost = perimeter × rate per metre = $110 \\times 12 = ₹1320$.' },
            { text: 'Compare with budget: ₹1320 < ₹1500, so budget is enough. Surplus = ₹1500 - ₹1320 = ₹180.', faded: true, blankAnswer: 'Yes, the budget is enough. Total cost = ₹1320, surplus =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_5', title: 'The area of a triangle is half the.',
          scaffold: { problem: 'A triangular traffic sign board has base 80 cm and height 60 cm. The board is to be painted with reflective paint costing ₹ 15 per cm².',
            steps: [
            { text: 'Identify given values: base = 80 cm, height = 60 cm. The triangle is a right triangle (standard sign board), so the.' },
            { text: 'Write the area formula for one side: Area = (1/2) × base × height.' },
            { text: 'Substitute values: Area = (1/2) × 80 × 60 = 40 × 60 = 2400 cm².' },
            { text: 'Since both sides are painted, total area = 2 × 2400 = 4800 cm².' },
            { text: 'Compute cost: Cost = Total area × rate = 4800 × 15 = ₹ 72,000.', faded: true, blankAnswer: '₹ 72,000' }
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
        { type: 'scaffold', nodeId: 'c9_math_ch6_7', title: 'Heron\'s formula enables calculation of.',
          scaffold: { problem: 'A triangular agricultural field has sides measuring 120 m, 170 m, and 250 m.',
            steps: [
            { text: 'Identify the given side lengths: a = 120 m, b = 170 m, c = 250 m. The rate is ₹25/m². We need total cost = area × rate.' },
            { text: 'Compute the semi-perimeter s = (a + b + c)/2 = (120 + 170 + 250)/2 = 540/2 = 270 m.' },
            { text: 'Apply Heron\'s formula: Area = √[s(s-a)(s-b)(s-c)] = √[270 × (270-120) × (270-170) × (270-250)] = √[270 × 150 × 100 ×.' },
            { text: 'Simplify the product stepwise: 270 × 150 = 40500; 100 × 20 = 2000; product = 40500 × 2000 = 81,000,000.' },
            { text: 'Total cost = Area × Rate = 9000 m² × ₹25/m² = ₹2,25,000.', faded: true, blankAnswer: '₹2,25,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_4', title: 'The area of a rectangle is the product.',
          scaffold: { problem: 'A rectangular garden has a perimeter of 100 m. Its length is 10 m more than its breadth. Find the area of the garden in square metres.',
            steps: [
            { text: 'Let breadth = x metres. Then length = (x + 10) metres. Write perimeter formula: P = 2(l + b).' },
            { text: 'Substitute given perimeter and expressions: 2(x + 10 + x) = 100 → 2(2x + 10) = 100.' },
            { text: 'Simplify: 4x + 20 = 100 → 4x = 80 → x = 20. So breadth = 20 m, length = 30 m.' },
            { text: 'Compute area: A = l × b = 30 × 20 = 600 m².' },
            { text: 'Verify: Perimeter = 2(30+20) = 100 m ✓. Area = 600 m².', faded: true, blankAnswer: '600 m²' }
            ] } },
        { type: 'dissect', nodeId: 'c9_math_ch6_5', title: 'Identify each idea',
          dissect: { specimen: 'Perimeter of Plane Figures: Rectangle, Triangle, Square', spots: [
            { id: 's1', label: 'The perimeter of a plane', prompt: 'Which idea is this? — The perimeter of a plane figure is the total length of its boundary, calculated as the.', answer: 'The perimeter of a plane', options: ['The perimeter of a plane', 'The area of a triangle', 'Herons Formula calculates the area', 'Herons formula enables calculation of'] },
            { id: 's2', label: 'The area of a triangle', prompt: 'Which idea is this? — The area of a triangle is half the product of any side chosen as the base and the.', answer: 'The area of a triangle', options: ['The area of a triangle', 'The perimeter of a plane', 'Herons Formula calculates the area', 'Herons formula enables calculation of'] },
            { id: 's3', label: 'Herons Formula calculates the area', prompt: 'Which idea is this? — Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,.', answer: 'Herons Formula calculates the area', options: ['Herons Formula calculates the area', 'The perimeter of a plane', 'The area of a triangle', 'Herons formula enables calculation of'] },
            { id: 's4', label: 'Herons formula enables calculation of', prompt: 'Which idea is this? — Heron\'s formula enables calculation of a triangle\'s area using only its three side.', answer: 'Herons formula enables calculation of', options: ['Herons formula enables calculation of', 'The perimeter of a plane', 'The area of a triangle', 'Herons Formula calculates the area'] },
            { id: 's5', label: 'The area of a rectangle', prompt: 'Which idea is this? — The area of a rectangle is the product of its length and breadth (A = l × b), where.', answer: 'The area of a rectangle', options: ['The area of a rectangle', 'The perimeter of a plane', 'The area of a triangle', 'Herons Formula calculates the area'] }
          ] } }
    ],
    explore: { component: C9_MathematicsSidesTriangleGreaterSim, prompt: 'Explore the interactive — Perimeter of Plane Figures: Rectangle, Triangle, Square' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch6_1', difficulty: 'standard',
          question: 'The perimeter of a plane figure is the total length of its boundary, calculated.',
          hint: 'Review c7_math_ch15_003 (solving linear equations: systematic method) and.',
          misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add.',
          parts: [
                { id: 'a', prompt: 'Write the formula for the perimeter of a rectangle in terms of its length $l$ and breadth $b$.', answer: 'The perimeter of a rectangle is $P = 2(l + b)$',
                  options: ['The perimeter of a rectangle is $P = 2(l + b)$', '2(l+b)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' },
                { id: 'b', prompt: 'An isosceles triangle has a perimeter of 36 cm. The base is 4 cm less than each equal side. Find the length of each side.', answer: 'Let each equal side be $x$ cm',
                  options: ['Let each equal side be $x$ cm', '4 cm less', '2(l+b)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' }
          ],
            remediations: { 'students-treat-the-perimeter-formula': { steps: ['Have the student physically measure a rectangular notebook with a ruler.', 'Write $P = l + b + l + b$ on paper, then factor: $P = 2l + 2b = 2(l+b)$.', 'For the "2l + b" error, substitute numbers: $l=10, b=5$. Correct: $2(10+5)=30$. Wrong: $2(10)+5=25$.', 'For triangle problems, insist on labelling ALL three sides with algebraic expressions BEFORE writing the perimeter sum.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem where a farmer has 200 m of fencing wire to make a rectangular pen for goats. The length must be 10 m more than twice the breadth.', answer: 'Problem: "A farmer has 200 m fencing',
                  options: ['Problem: "A farmer has 200 m fencing', '2(l+b)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' }
          ],
            remediations: { 'students-treat-the-perimeter-formula': { steps: ['Have the student physically measure a rectangular notebook with a ruler.', 'Write $P = l + b + l + b$ on paper, then factor: $P = 2l + 2b = 2(l+b)$.', 'For the "2l + b" error, substitute numbers: $l=10, b=5$. Correct: $2(10+5)=30$. Wrong: $2(10)+5=25$.', 'For triangle problems, insist on labelling ALL three sides with algebraic expressions BEFORE writing the perimeter sum.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_5', difficulty: 'standard',
          question: 'The area of a triangle is half the product of any side chosen as the base and.',
          hint: 'Revisit c7_math_ch07_006 (constructions related to altitudes of triangles) and.',
          misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if.',
          parts: [
                { id: 'a', prompt: 'In triangle ABC, angle B is obtuse (120°). Side AC is chosen as the base.', answer: 'The foot lies on the extension of AC beyond A or C (outside the segment)',
                  options: ['The foot lies on the extension of AC beyond A or C (outside the segment)', 'the formula doesn\'t work for obtuse triangles', 'height is measured to the segment only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if base = 7 cm, they.' },
                { id: 'b', prompt: 'Two triangles share the same base of length 10 cm. Triangle P has height 6 cm.', answer: 'Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²',
                  options: ['Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²', 'Triangle Q\'s area is less', 'the altitude must intersect the base segment for the formula to apply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if base = 7 cm, they.' }
          ],
            remediations: { 'students-treat-any-side-adjacent': { steps: ['Draw the triangle and label the chosen base.', 'Using a set square or ruler, draw a line through the opposite vertex perpendicular to the base line (extend the base if.', 'Mark the intersection point — this is the foot of the altitude.', 'Measure the perpendicular segment from vertex to foot — that is the height.', 'Emphasize: "Height is always perpendicular to the base line, not necessarily to the base segment.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if.',
          parts: [
                { id: 'a', prompt: 'Two triangles share the same base of length 10 cm. Triangle P has height 6 cm.', answer: 'Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²',
                  options: ['Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²', 'Triangle Q\'s area is less', 'the altitude must intersect the base segment for the formula to apply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if base = 7 cm, they.' }
          ],
            remediations: { 'students-treat-any-side-adjacent': { steps: ['Draw the triangle and label the chosen base.', 'Using a set square or ruler, draw a line through the opposite vertex perpendicular to the base line (extend the base if.', 'Mark the intersection point — this is the foot of the altitude.', 'Measure the perpendicular segment from vertex to foot — that is the height.', 'Emphasize: "Height is always perpendicular to the base line, not necessarily to the base segment.'] } } },
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
        { type: 'subpart', nodeId: 'c9_math_ch6_7', difficulty: 'standard',
          question: 'Heron\'s formula enables calculation of a triangle\'s area using only its three.',
          hint: 'If stuck, revisit c9_math_ch6_6 (Heron\'s Formula for Area of a Triangle) and.',
          misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Heron\'s formula enables calculation of a triangle\'s area using only its three side',
                  options: ['Heron\'s formula enables calculation of a triangle\'s area using only its three side', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a triangle is half the product of any side chosen as the base and the', 'Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area = √[P(P-a)(P-b)(P-c)] where P =.' }
          ],
            remediations: { 'students-often-use-the-perimeter': { steps: ['Have the student compute s = (a+b+c)/2 separately and write it down before the formula.', 'Ask them to check: "Is s half of the perimeter?"', 'For a 3-4-5 triangle, compute both the correct way (s=6, area=6) and the wrong way (P=12, area≈77.76) and ask "Which.', 'Emphasise that Heron\'s formula uses semi-perimeter because it is derived from (1/2)×base×height and algebraic.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_4', difficulty: 'standard',
          question: 'The area of a rectangle is the product of its length and breadth (A = l × b),.',
          hint: 'If stuck, revisit Class 8 node c8_math_ch14_3 (Area of a Parallelogram: Base x Height).',
          misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the product of its length and breadth (A = l × b), where',
                  options: ['The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a triangle is half the product of any side chosen as the base and the', 'Heron\'s Formula calculates the area of a triangle when the lengths of all three sides (a,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).' }
          ],
            remediations: { 'students-use-the-slant-side': { steps: ['Draw a parallelogram on grid paper.', 'Draw the slant side of 10 cm at an angle.', 'Drop a perpendicular from the top vertex to the base — measure it: it\'s 8 cm, not 10 cm.', 'Cut along the perpendicular and slide the triangle to form a rectangle of dimensions 12 cm × 8 cm.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
