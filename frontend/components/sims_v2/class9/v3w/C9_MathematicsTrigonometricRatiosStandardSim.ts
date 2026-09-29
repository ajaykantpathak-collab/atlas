import type { SimDef } from '../../engine/types';
import C9_MathematicsTrigonometricRatiosStandardSim from '../../../simulations/c6_12/C9_MathematicsTrigonometricRatiosStandardSim';

/** v3 wrapped master — C9_MathematicsTrigonometricRatiosStandardSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicstrigonometricratiosstandardsim: SimDef = {
    id: 'v3w_c9_mathematicstrigonometricratiosstandardsim',
    title: 'Combination of Plane Figures: Composite Area Problems',
    subtitle: 'Covers composite figures made from rectangles, triangles (right, scalene using Heron\'s.',
    classLevel: 9, subject: 'mathematics', topic: 'Combination of Plane Figures: Composite Area Problems',
    chapters: [],
    nodeIds: ['c9_math_ch6_11', 'c9_math_ch6_4', 'c9_math_ch6_5', 'c9_math_ch6_7', 'c9_math_ch8_2'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a school is designing a new badge: a rectangular strip 10 cm by 3 cm with a semicircular top of.', goal: 'Master Combination of Plane Figures: Composite Area Problems.' },
    discovery: {
        question: 'In triangle ABC, angle B is obtuse (120°). Side AC is chosen as the base.',
        options: ['The foot lies on the extension of AC beyond A or C (outside the segment)', 'the formula doesn\'t work for obtuse triangles', 'height is measured to the segment only'],
        answer: 'The foot lies on the extension of AC beyond A or C (outside the segment)',
        hook: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if.',
    },
    teaching: [
        { title: 'A composite plane figure is a shape formed.', text: 'A composite plane figure is a shape formed by combining two or more basic plane figures (rectangles, triangles, circles, sectors, segments) such that they share boundaries but do not overlap.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch6_11', title: 'A composite plane figure is a shape.',
          scaffold: { problem: 'A window frame is shaped like a rectangle of length 2.5 m and breadth 1.2 m, with a semicircular top whose diameter equals the breadth of.',
            steps: [
            { text: 'Identify the composite shapes: The wood forms a rectangle (2.5 m × 1.2 m) and a semicircle on top.' },
            { text: 'Write area formulas: Area_rectangle = length × breadth. Area_semicircle = ½ × π × radius².' },
            { text: 'Substitute values: Area_rectangle = 2.5 × 1.2 = 3.0 m². Area_semicircle = ½ × 3.14 × (0.6)² = 0.5 × 3.14 × 0.36 =.' },
            { text: 'Add the areas (since the semicircle is added on top): Total area = 3.0 + 0.5652 = 3.5652 m².' },
            { text: 'Round to reasonable precision: 3.57 m² (or 3.565 m²).', faded: true, blankAnswer: '3.57 m² (approx)' }
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
        { type: 'scaffold', nodeId: 'c9_math_ch6_5', title: 'The area of a triangle is half the.',
          scaffold: { problem: 'A triangular traffic sign board has base 80 cm and height 60 cm. The board is to be painted with reflective paint costing ₹ 15 per cm².',
            steps: [
            { text: 'Identify given values: base = 80 cm, height = 60 cm. The triangle is a right triangle (standard sign board), so the.' },
            { text: 'Write the area formula for one side: Area = (1/2) × base × height.' },
            { text: 'Substitute values: Area = (1/2) × 80 × 60 = 40 × 60 = 2400 cm².' },
            { text: 'Since both sides are painted, total area = 2 × 2400 = 4800 cm².' },
            { text: 'Compute cost: Cost = Total area × rate = 4800 × 15 = ₹ 72,000.', faded: true, blankAnswer: '₹ 72,000' }
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
        { type: 'scaffold', nodeId: 'c9_math_ch8_2', title: 'An explicit rule for a sequence is a.',
          scaffold: { problem: 'A theatre has 12 seats in the first row, 15 in the second, 18 in the third, and so on, increasing by 3 seats each row.',
            steps: [
            { text: 'Identify the sequence type. List terms with positions: n=1 → 12, n=2 → 15, n=3 → 18.' },
            { text: 'Note the first term a = 12 and common difference d = 3.' },
            { text: 'Write the standard explicit rule for arithmetic sequence: aₙ = a + (n-1)d.' },
            { text: 'Substitute a=12, d=3 → aₙ = 12 + (n-1)×3 = 12 + 3n - 3 = 3n + 9.' },
            { text: 'Find 25th row seats: substitute n=25 → a₂₅ = 3(25) + 9 = 75 + 9 = 84 seats.', faded: true, blankAnswer: 'Explicit rule: aₙ = 3n + 9; 25th row has 84 seats.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_math_ch6_4', title: 'Identify each idea',
          dissect: { specimen: 'Combination of Plane Figures: Composite Area Problems', spots: [
            { id: 's1', label: 'A composite plane figure is', prompt: 'Which idea is this? — A composite plane figure is a shape formed by combining two or more basic plane figures.', answer: 'A composite plane figure is', options: ['A composite plane figure is', 'The area of a rectangle', 'The area of a triangle', 'Herons formula enables calculation of'] },
            { id: 's2', label: 'The area of a rectangle', prompt: 'Which idea is this? — The area of a rectangle is the product of its length and breadth (A = l × b), where.', answer: 'The area of a rectangle', options: ['The area of a rectangle', 'A composite plane figure is', 'The area of a triangle', 'Herons formula enables calculation of'] },
            { id: 's3', label: 'The area of a triangle', prompt: 'Which idea is this? — The area of a triangle is half the product of any side chosen as the base and the.', answer: 'The area of a triangle', options: ['The area of a triangle', 'A composite plane figure is', 'The area of a rectangle', 'Herons formula enables calculation of'] },
            { id: 's4', label: 'Herons formula enables calculation of', prompt: 'Which idea is this? — Heron\'s formula enables calculation of a triangle\'s area using only its three side.', answer: 'Herons formula enables calculation of', options: ['Herons formula enables calculation of', 'A composite plane figure is', 'The area of a rectangle', 'The area of a triangle'] },
            { id: 's5', label: 'An explicit rule for a', prompt: 'Which idea is this? — An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as.', answer: 'An explicit rule for a', options: ['An explicit rule for a', 'A composite plane figure is', 'The area of a rectangle', 'The area of a triangle'] }
          ] } }
    ],
    explore: { component: C9_MathematicsTrigonometricRatiosStandardSim, prompt: 'Explore the interactive — Combination of Plane Figures: Composite Area Problems' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch6_11', difficulty: 'standard',
          question: 'A composite plane figure is a shape formed by combining two or more basic plane.',
          hint: 'If stuck on a specific shape\'s area, revisit that shape\'s node: sector area.',
          misconception: 'Students frequently use the diameter directly in the circle area formula (πd² instead of πr²) when a semicircle or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A composite plane figure is a shape formed by combining two or more basic plane figures',
                  options: ['A composite plane figure is a shape formed by combining two or more basic plane figures', 'The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The area of a triangle is half the product of any side chosen as the base and the', 'Heron\'s formula enables calculation of a triangle\'s area using only its three side'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently use the diameter directly in the circle area formula (πd² instead of πr²) when a semicircle or quadrant is described by.' }
          ],
            remediations: { 'students-frequently-use-the-diameter': { steps: ['Radius = 5 cm.', 'Area = ½ × π × 5²." For segment confusion: Re-derive segment area = sector - triangle.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_4', difficulty: 'standard',
          question: 'The area of a rectangle is the product of its length and breadth (A = l × b),.',
          hint: 'If stuck, revisit Class 8 node c8_math_ch14_3 (Area of a Parallelogram: Base x Height).',
          misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the product of its length and breadth (A = l × b), where',
                  options: ['The area of a rectangle is the product of its length and breadth (A = l × b), where', 'A composite plane figure is a shape formed by combining two or more basic plane figures', 'The area of a triangle is half the product of any side chosen as the base and the', 'Heron\'s formula enables calculation of a triangle\'s area using only its three side'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).' }
          ],
            remediations: { 'students-use-the-slant-side': { steps: ['Draw a parallelogram on grid paper.', 'Draw the slant side of 10 cm at an angle.', 'Drop a perpendicular from the top vertex to the base — measure it: it\'s 8 cm, not 10 cm.', 'Cut along the perpendicular and slide the triangle to form a rectangle of dimensions 12 cm × 8 cm.'] } } },
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
        { type: 'subpart', nodeId: 'c9_math_ch6_7', difficulty: 'standard',
          question: 'Heron\'s formula enables calculation of a triangle\'s area using only its three.',
          hint: 'If stuck, revisit c9_math_ch6_6 (Heron\'s Formula for Area of a Triangle) and.',
          misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Heron\'s formula enables calculation of a triangle\'s area using only its three side',
                  options: ['Heron\'s formula enables calculation of a triangle\'s area using only its three side', 'A composite plane figure is a shape formed by combining two or more basic plane figures', 'The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The area of a triangle is half the product of any side chosen as the base and the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area = √[P(P-a)(P-b)(P-c)] where P =.' }
          ],
            remediations: { 'students-often-use-the-perimeter': { steps: ['Have the student compute s = (a+b+c)/2 separately and write it down before the formula.', 'Ask them to check: "Is s half of the perimeter?"', 'For a 3-4-5 triangle, compute both the correct way (s=6, area=6) and the wrong way (P=12, area≈77.76) and ask "Which.', 'Emphasise that Heron\'s formula uses semi-perimeter because it is derived from (1/2)×base×height and algebraic.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_2', difficulty: 'standard',
          question: 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ).',
          hint: 'Revisit c8_math_ch5_7 (algebraic explanation of parity patterns) and c7_math_ch04_005.',
          misconception: 'Students often write the explicit rule for an arithmetic sequence as aₙ = a₁ + n×d instead of aₙ = a₁ + (n-1)×d.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as',
                  options: ['An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as', 'A composite plane figure is a shape formed by combining two or more basic plane figures', 'The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The area of a triangle is half the product of any side chosen as the base and the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the explicit rule for an arithmetic sequence as aₙ = a₁ + n×d instead of aₙ = a₁ + (n-1)×d.' }
          ],
            remediations: { 'students-often-write-the-explicit': { steps: ['Have the student create a two-column table: Column 1 = term position n (1,2,3,4), Column 2 = term value.', 'Ask: "What value of n gives the first term?" They answer n=1.', 'Then say: "Substitute n=1 into your formula aₙ = 10 + 5n.', 'What do you get?" They get 15.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
