import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch06_p2: SimDef = {
    id: 'v3_c9_math_ch06_p2',
    title: 'Perimeter and Area · Part 2/2',
    subtitle: 'The distance around — and its traps',
    classLevel: 9, subject: 'mathematics', topic: 'Perimeter and Area · Part 2/2',
    chapters: ['c9_math_ch06'],
    nodeIds: ['c9_math_ch6_5', 'c9_math_ch6_6', 'c9_math_ch6_7', 'c9_math_ch6_8', 'c9_math_ch6_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fencing contractor', intro: 'Wire costs by the metre and fields come in every shape. Master the boundary formulas for rectangles, squares and triangles — then spot the answers that look right but can\'t exist.', goal: 'Apply perimeter formulas for rectangles, squares and triangles — including algebraic side lengths, missing-side problems and the triangle-inequality feasibility check.' },
    discovery: {
        question: 'A farmer finds a triangle\'s sides: 12 cm, 18 cm, 30 cm — the perimeter adds up perfectly to 60. Ready to build?',
        options: ['No — 12 + 18 = 30 exactly, so the \'triangle\' is a flat line; two sides must STRICTLY beat the third', 'Yes — the maths checks out', 'Yes — perimeter is all that matters', 'No — triangles need all sides equal'],
        answer: 'No — 12 + 18 = 30 exactly, so the \'triangle\' is a flat line; two sides must STRICTLY beat the third',
        hook: 'Perimeter arithmetic can be perfectly right while the shape is impossible — always sanity-check against geometry. And a sneaky truth: among rectangles sharing a perimeter, the square always traps the most area.',
    },
    teaching: [
        { title: 'Area of a Triangle: Base and Height Method', text: 'The area of a triangle is half the product of any side chosen as the base and the corresponding altitude (height), where the altitude is the perpendicular distance from the opposite vertex to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch6_5', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Fence it all: compute the wire and cost for a 12×8 m garden at ₹45/m, solve for a missing side when a square and rectangle share a perimeter, and crack the isosceles triangle whose base is 4 cm short of each equal side.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_5', title: 'Area of a Triangle: Base and Height Method',
          scaffold: { problem: 'A triangular traffic sign board has base 80 cm and height 60 cm. The board is to be painted with reflective paint costing ₹ 15 per cm².',
            steps: [
            { text: 'Identify given values: base = 80 cm, height = 60 cm. The triangle is a right triangle (standard sign board), so the.' },
            { text: 'Write the area formula for one side: Area = (1/2) × base × height.' },
            { text: 'Substitute values: Area = (1/2) × 80 × 60 = 40 × 60 = 2400 cm².' },
            { text: 'Since both sides are painted, total area = 2 × 2400 = 4800 cm².' },
            { text: 'Compute cost: Cost = Total area × rate = 4800 × 15 = ₹ 72,000.', faded: true, blankAnswer: '₹ 72,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_6', title: 'Heron\'s Formula for Area of a Triangle',
          scaffold: { problem: 'A triangular traffic island in Delhi has sides measuring 15 m, 20 m, and 25 m. The municipal corporation wants to plant grass on it.',
            steps: [
            { text: 'Identify the given sides: a = 15 m, b = 20 m, c = 25 m. We need to find area using Heron\'s Formula since height is not.' },
            { text: 'Compute the semi-perimeter s = (a+b+c)/2 = (15+20+25)/2 = 60/2 = 30 m.' },
            { text: 'Compute each factor: s-a = 30-15 = 15, s-b = 30-20 = 10, s-c = 30-25 = 5.' },
            { text: 'Substitute into Heron\'s Formula: Area = √[s(s-a)(s-b)(s-c)] = √[30 × 15 × 10 × 5] = √[22500].' },
            { text: 'Simplify: √22500 = √(225 × 100) = 15 × 10 = 150 m². Cost = 150 × ₹50 = ₹7500.', faded: true, blankAnswer: 'Area = 150 m², Cost = ₹7500' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_7', title: 'Heron\'s Formula: Applications in Real-Life Problems',
          scaffold: { problem: 'A triangular agricultural field has sides measuring 120 m, 170 m, and 250 m.',
            steps: [
            { text: 'Identify the given side lengths: a = 120 m, b = 170 m, c = 250 m. The rate is ₹25/m². We need total cost = area × rate.' },
            { text: 'Compute the semi-perimeter s = (a + b + c)/2 = (120 + 170 + 250)/2 = 540/2 = 270 m.' },
            { text: 'Apply Heron\'s formula: Area = √[s(s-a)(s-b)(s-c)] = √[270 × (270-120) × (270-170) × (270-250)] = √[270 × 150 × 100.' },
            { text: 'Simplify the product stepwise: 270 × 150 = 40500; 100 × 20 = 2000; product = 40500 × 2000 = 81,000,000.' },
            { text: 'Total cost = Area × Rate = 9000 m² × ₹25/m² = ₹2,25,000.', faded: true, blankAnswer: '₹2,25,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_8', title: 'Area of a Circle: Formula and Derivation',
          scaffold: { problem: 'A circular garden has a radius of 21 m. Calculate its area. (Use pi = 22/7.) Then calculate the cost of turfing it at Rs 15 per m^2.',
            steps: [
            { text: 'Identify the formula. A = pi * r^2.' },
            { text: 'Substitute. A = (22/7) * (21)^2 = (22/7) * 441 = 22 * 63 = 1386 m^2.' },
            { text: 'Calculate cost. Cost = Area * Rate = 1386 * 15 = Rs 20,790.', faded: true, blankAnswer: 'Area = (22/7) * (21)^2 = 1386 m^2. Cost of turfing = 1386 *.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_9', title: 'Area of a Sector of a Circle',
          scaffold: { problem: 'A circular pizza of radius 21 cm is cut into 8 equal slices. Find the area of one slice. (Use π = 22/7)',
            steps: [
            { text: 'Identify given values: radius r = 21 cm, number of equal slices = 8.' },
            { text: 'Write the sector area formula: Area = (θ/360) × πr².' },
            { text: 'Substitute the values: Area = (45/360) × (22/7) × (21)².' },
            { text: 'Simplify step by step: 45/360 = 1/8; 21² = 441. So Area = (1/8) × (22/7) × 441 = (1/8) × 22 × 63 = (1/8) × 1386.' },
            { text: 'Verify: Total pizza area = πr² = (22/7) × 441 = 1386 cm². One-eighth of that is 1386/8 = 173.25 cm².', faded: true, blankAnswer: '173.25 cm²' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch6_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch6_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Fencing a rectangular garden 12 m by 8 m, a student tells the hardware shop: \'Perimeter is 12 + 8 = 20 metres, so 20 m of wire at ₹45 a metre.\' His uncle counts the corners and frowns.',
            decisions: [{ prompt: 'How much wire is actually needed?', options: [
                { text: '40 m — perimeter is the whole boundary, and a rectangle\'s two lengths and two breadths give 2(l + b) = 2(20) = 40 m, costing ₹1,800. The student priced only half the fence — the semi-perimeter — and would come home short.', outcome: 'This applies the full-boundary definition and shows why the distributive 2 must reach both dimensions.' },
                { text: 'The student is right — one length plus one breadth is the perimeter of any rectangle.', outcome: 'That measures only two of the four sides; wire must close the loop, which doubles the 20 m to 40 m.', reveals: 'half-boundary-enough' },
                { text: 'Neither — the real figure is 12 × 8 = 96 m, since fencing covers the area inside.', outcome: 'Area and perimeter are different measures: wire runs around the edge (metres), while 96 m² is the grass inside it.', reveals: 'perimeter-is-area' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch6_9', title: 'You made it',
          caseStudy: { intro: 'Perimeter is the whole boundary walk — 2(l+b), 4a, a+b+c — and it doubles as an equation for finding missing sides. But a correct sum can still describe an impossible shape.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch6_5', difficulty: 'standard',
          question: 'The area of a triangle is half the product of any side chosen as the base and.',
          hint: 'Revisit c7_math_ch07_006 (constructions related to altitudes of triangles) and.',
          misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm,.',
          parts: [
                { id: 'a', prompt: 'In triangle ABC, angle B is obtuse (120°). Side AC is chosen as the base.', answer: 'The foot lies on the extension of AC beyond A or C (outside the segment)',
                  options: ['The foot lies on the extension of AC beyond A or C (outside the segment)', 'the formula doesn\'t work for obtuse triangles', 'height is measured to the segment only'],
                  hint: 'Revisit c7_math_ch07_006 (constructions related to altitudes of triangles) and c8_math_ch14_4 (area.',
                  misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if base = 7 cm, they.' },
                { id: 'b', prompt: 'Two triangles share the same base of length 10 cm. Triangle P has height 6 cm.', answer: 'Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²',
                  options: ['Area of P = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\) cm²', 'Triangle Q\'s area is less', 'the altitude must intersect the base segment for the formula to apply'],
                  hint: 'Revisit c7_math_ch07_006 (constructions related to altitudes of triangles) and c8_math_ch14_4 (area.',
                  misconception: 'Students treat any side adjacent to the base as the height. For example, in a triangle with sides 5 cm, 6 cm, 7 cm, if base = 7 cm, they.' }
          ],
            remediations: { 'students-treat-any-side-adjacent': { steps: ['Draw the triangle and label the chosen base.', 'Using a set square or ruler, draw a line through the opposite vertex perpendicular to the base line (extend the base.', 'Mark the intersection point — this is the foot of the altitude.', 'Measure the perpendicular segment from vertex to foot — that is the height.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_6', difficulty: 'standard',
          question: 'Heron\'s Formula calculates the area of a triangle when the lengths of all three.',
          hint: 'If stuck, review c8_math_ch1_8 (square roots) and c8_math_ch1_9 (estimating square roots).',
          misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).',
          parts: [
                { id: 'a', prompt: 'Two triangles have the same perimeter: Triangle P has sides 6 cm, 8 cm, 10 cm. Triangle Q has sides 7 cm, 7 cm, 10 cm.', answer: 'Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²',
                  options: ['Triangle P (6-8-10) is a right triangle, area = ½ × 6 × 8 = 24 cm²', 'same perimeter means same area'],
                  hint: 'If stuck, review c8_math_ch1_8 (square roots) and c8_math_ch1_9 (estimating square roots) for.',
                  misconception: 'Students compute s = a+b+c (full perimeter) instead of s = (a+b+c)/2 (semi-perimeter).' }
          ],
            remediations: { 'students-compute-s-a-b': { steps: ['If a student uses full perimeter instead of semi-perimeter: (1) Ask them to compute the perimeter of a 3-4-5 triangle.', '(2) Have them recalculate Heron\'s Formula with s=6: √[6×3×2×1] = √36 = 6, matching ½×3×4=6.', '(3) Then with s=12: √[12×9×8×7] = √6048 ≈ 77.8, clearly wrong.', '(4) Emphasize: "s is ALWAYS half the perimeter.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_7', difficulty: 'standard',
          question: 'Heron\'s formula enables calculation of a triangle\'s area using only its three.',
          hint: 'If stuck, revisit c9_math_ch6_6 (Heron\'s Formula for Area of a Triangle) and.',
          misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Heron\'s formula enables calculation of a triangle\'s area using only its three side',
                  options: ['Heron\'s formula enables calculation of a triangle\'s area using only its three side', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'A composite plane figure is a shape formed by combining two or more basic plane figures'],
                  hint: 'If stuck, revisit c9_math_ch6_6 (Heron\'s Formula for Area of a Triangle) and c8_math_ch9_8.',
                  misconception: 'Students often use the perimeter instead of semi-perimeter in Heron\'s formula, i.e., they compute Area = √[P(P-a)(P-b)(P-c)] where.' }
          ],
            remediations: { 'students-often-use-the-perimeter': { steps: ['Have the student compute s = (a+b+c)/2 separately and write it down before the formula.', 'Ask them to check: "Is s half of the perimeter?"', 'For a 3-4-5 triangle, compute both the correct way (s=6, area=6) and the wrong way (P=12, area≈77.76) and ask "Which.', 'Emphasise that Heron\'s formula uses semi-perimeter because it is derived from (1/2)×base×height and algebraic.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_8', difficulty: 'standard',
          question: 'The area of a circle is the two-dimensional space enclosed by the.',
          hint: 'Revisit c9_math_ch6_2 (Circumference) to distinguish circumference (1D) from area (2D).',
          misconception: 'Students confuse area (pi*r^2) with circumference (2*pi*r). The exact error: they use 2*pi*r when asked for area,.',
          parts: [
                { id: 'a', prompt: 'Derive the area formula A = pi * r^2 using the sector-rearrangement method.', answer: 'Divide the circle into many thin sectors',
                  options: ['Divide the circle into many thin sectors', 'area = pi * diameter'],
                  hint: 'Revisit c9_math_ch6_2 (Circumference) to distinguish circumference (1D) from area (2D), and.',
                  misconception: 'Students confuse area (pi*r^2) with circumference (2*pi*r). The exact error: they use 2*pi*r when asked for area, or pi*r^2 when asked for.' }
          ],
            remediations: { 'students-confuse-area-pi-r': { steps: ['Draw a circle and ask: "Is the area inside or the boundary around?" (Area is inside, circumference is the boundary.) 2.', 'Show: A = pi*r^2 (area, squared) and C = 2*pi*r (circumference, linear).', 'Practice: "Find the area" means use pi*r^2.', '"Find the circumference" means use 2*pi*r.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_9', difficulty: 'standard',
          question: 'The area of a sector of a circle is the region enclosed by two radii and the.',
          hint: 'If stuck, revisit the derivation of the circle area formula (c9_math_ch6_8) and practice.',
          misconception: 'Students often confuse the sector area formula with the arc length formula.',
          parts: [
                { id: 'a', prompt: 'State the formula for the area of a sector of a circle with radius r and central angle θ (in degrees).', answer: 'The formula is Area = (θ/360) × πr²',
                  options: ['The formula is Area = (θ/360) × πr²', 'the full angle is 180° (like a semicircle) instead of 360°'],
                  hint: 'If stuck, revisit the derivation of the circle area formula (c9_math_ch6_8) and practice.',
                  misconception: 'Students often confuse the sector area formula with the arc length formula.' }
          ],
            remediations: { 'students-often-confuse-the-sector': { steps: ['If a student makes the arc-length formula error, first ask them to write both formulas side by side: Arc length.', 'Have them identify the difference: one has 2r, the other has r².', 'Then give a simple numerical example: full circle r=1, θ=360°.', 'Arc length = 2π, Area = π.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
