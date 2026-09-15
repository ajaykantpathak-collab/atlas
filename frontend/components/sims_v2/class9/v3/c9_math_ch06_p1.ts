import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch06_p1: SimDef = {
    id: 'v3_c9_math_ch06_p1',
    title: 'Perimeter and Area · Part 1/2',
    subtitle: 'The distance around — and its traps',
    classLevel: 9, subject: 'mathematics', topic: 'Perimeter and Area · Part 1/2',
    chapters: ['c9_math_ch06'],
    nodeIds: ['c9_math_ch6_1', 'c9_math_ch6_10', 'c9_math_ch6_11', 'c9_math_ch6_2', 'c9_math_ch6_3', 'c9_math_ch6_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fencing contractor', intro: 'Wire costs by the metre and fields come in every shape. Master the boundary formulas for rectangles, squares and triangles — then spot the answers that look right but can\'t exist.', goal: 'Apply perimeter formulas for rectangles, squares and triangles — including algebraic side lengths, missing-side problems and the triangle-inequality feasibility check.' },
    discovery: {
        question: 'A farmer finds a triangle\'s sides: 12 cm, 18 cm, 30 cm — the perimeter adds up perfectly to 60. Ready to build?',
        options: ['No — 12 + 18 = 30 exactly, so the \'triangle\' is a flat line; two sides must STRICTLY beat the third', 'Yes — the maths checks out', 'Yes — perimeter is all that matters', 'No — triangles need all sides equal'],
        answer: 'No — 12 + 18 = 30 exactly, so the \'triangle\' is a flat line; two sides must STRICTLY beat the third',
        hook: 'Perimeter arithmetic can be perfectly right while the shape is impossible — always sanity-check against geometry. And a sneaky truth: among rectangles sharing a perimeter, the square always traps the most area.',
    },
    teaching: [
        { title: 'Perimeter of Plane Figures: Rectangle, Triangle, Square', text: 'The perimeter of a plane figure is the total length of its boundary, calculated as the sum of the lengths of all its sides.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch6_1', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Fence it all: compute the wire and cost for a 12×8 m garden at ₹45/m, solve for a missing side when a square and rectangle share a perimeter, and crack the isosceles triangle whose base is 4 cm short of each equal side.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_1', title: 'Perimeter of Plane Figures: Rectangle, Triangle, Square',
          scaffold: { problem: 'A rectangular playground has length 35 m and breadth 20 m. The school wants to put a boundary rope around it. The rope costs ₹12 per metre.',
            steps: [
            { text: 'Identify given values: length $l = 35$ m, breadth $b = 20$ m, cost per metre = ₹12, budget = ₹1500.' },
            { text: 'Recall perimeter formula for rectangle: $P = 2(l + b)$. This gives total metres of rope needed.' },
            { text: 'Substitute values: $P = 2(35 + 20) = 2 \\times 55 = 110$ m. So 110 metres of rope is needed.' },
            { text: 'Calculate total cost: Cost = perimeter × rate per metre = $110 \\times 12 = ₹1320$.' },
            { text: 'Compare with budget: ₹1320 < ₹1500, so budget is enough. Surplus = ₹1500 - ₹1320 = ₹180.', faded: true, blankAnswer: 'Yes, the budget is enough. Total cost = ₹1320, surplus.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_10', title: 'Area of a Segment of a Circle',
          scaffold: { problem: 'A circular garden has a radius of 14 m. A chord subtends an angle of 60° at the centre. Find the area of the minor segment.',
            steps: [
            { text: 'Identify given values: radius r = 14 m, central angle θ = 60°.' },
            { text: 'Recall the formula for area of minor segment: Area = (θ/360) × πr² - (1/2) r² sin θ.' },
            { text: 'Compute area of sector: (60/360) × (22/7) × 14² = (1/6) × (22/7) × 196 = (1/6) × 22 × 28 = (1/6) × 616 = 102.67 m².' },
            { text: 'Compute area of triangle: (1/2) × 14² × sin 60° = (1/2) × 196 × (√3/2) = 98 × (√3/2) = 49√3 ≈ 49 × 1.732 = 84.87 m².' },
            { text: 'Subtract triangle area from sector area: 102.67 - 84.87 = 17.8 m² (approximately).', faded: true, blankAnswer: 'Approximately 17.8 m² (or exactly (308/3 - 49√3) m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_11', title: 'Combination of Plane Figures: Composite Area Problems',
          scaffold: { problem: 'A window frame is shaped like a rectangle of length 2.5 m and breadth 1.2 m, with a semicircular top whose diameter equals the breadth.',
            steps: [
            { text: 'Identify the composite shapes: The wood forms a rectangle (2.5 m × 1.2 m) and a semicircle on top.' },
            { text: 'Write area formulas: Area_rectangle = length × breadth. Area_semicircle = ½ × π × radius².' },
            { text: 'Substitute values: Area_rectangle = 2.5 × 1.2 = 3.0 m². Area_semicircle = ½ × 3.14 × (0.6)² = 0.5 × 3.14 × 0.36.' },
            { text: 'Add the areas (since the semicircle is added on top): Total area = 3.0 + 0.5652 = 3.5652 m².' },
            { text: 'Round to reasonable precision: 3.57 m² (or 3.565 m²).', faded: true, blankAnswer: '3.57 m² (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_2', title: 'Circumference of a Circle: Formula and Irrationality of Pi',
          scaffold: { problem: 'A circular well has a diameter of 3.5 m. Find the cost of plastering its inner curved surface at ₹20 per square metre, if the well is 10.',
            steps: [
            { text: 'Identify that we need the curved surface area of a cylinder (well), which is circumference × depth.' },
            { text: 'Radius r = d/2 = 3.5/2 = 1.75 m. Use C = 2πr = 2 × (22/7) × 1.75.' },
            { text: 'Compute: 2 × (22/7) × 1.75 = (44/7) × 1.75 = 44 × 0.25 = 11 m. (Circumference = 11 m)' },
            { text: 'Curved surface area = Circumference × depth = 11 m × 10 m = 110 m².' },
            { text: 'Cost = Area × rate = 110 × ₹20 = ₹2200.', faded: true, blankAnswer: '₹2200' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_3', title: 'Arc Length of a Circle: Formula and Applications',
          scaffold: { problem: 'A circular park has a radius of 21 m. A jogging path is built along an arc that subtends an angle of 120° at the centre.',
            steps: [
            { text: 'Identify the given values: radius r = 21 m, central angle θ = 120°. The problem asks for arc length L.' },
            { text: 'Recall the arc length formula: L = (θ/360°) × 2πr. This formula works because the arc is a fraction θ/360° of the full.' },
            { text: 'Substitute the values into the formula: L = (120/360) × 2 × (22/7) × 21.' },
            { text: 'Simplify step by step: 120/360 = 1/3. 2 × (22/7) × 21 = 2 × 22 × 3 = 132. Then L = (1/3) × 132 = 44 m.' },
            { text: 'Verify: Full circumference = 2 × (22/7) × 21 = 132 m. 120° is 1/3 of 360°, so arc should be 1/3 of 132 = 44 m.', faded: true, blankAnswer: '44 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch6_4', title: 'Area of Rectangle and Parallelogram: Formulas',
          scaffold: { problem: 'A rectangular garden has a perimeter of 100 m. Its length is 10 m more than its breadth. Find the area of the garden in square metres.',
            steps: [
            { text: 'Let breadth = x metres. Then length = (x + 10) metres. Write perimeter formula: P = 2(l + b).' },
            { text: 'Substitute given perimeter and expressions: 2(x + 10 + x) = 100 → 2(2x + 10) = 100.' },
            { text: 'Simplify: 4x + 20 = 100 → 4x = 80 → x = 20. So breadth = 20 m, length = 30 m.' },
            { text: 'Compute area: A = l × b = 30 × 20 = 600 m².' },
            { text: 'Verify: Perimeter = 2(30+20) = 100 m ✓. Area = 600 m².', faded: true, blankAnswer: '600 m²' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch6_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch6_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Fencing a rectangular garden 12 m by 8 m, a student tells the hardware shop: \'Perimeter is 12 + 8 = 20 metres, so 20 m of wire at ₹45 a metre.\' His uncle counts the corners and frowns.',
            decisions: [{ prompt: 'How much wire is actually needed?', options: [
                { text: '40 m — perimeter is the whole boundary, and a rectangle\'s two lengths and two breadths give 2(l + b) = 2(20) = 40 m, costing ₹1,800. The student priced only half the fence — the semi-perimeter — and would come home short.', outcome: 'This applies the full-boundary definition and shows why the distributive 2 must reach both dimensions.' },
                { text: 'The student is right — one length plus one breadth is the perimeter of any rectangle.', outcome: 'That measures only two of the four sides; wire must close the loop, which doubles the 20 m to 40 m.', reveals: 'half-boundary-enough' },
                { text: 'Neither — the real figure is 12 × 8 = 96 m, since fencing covers the area inside.', outcome: 'Area and perimeter are different measures: wire runs around the edge (metres), while 96 m² is the grass inside it.', reveals: 'perimeter-is-area' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch6_4', title: 'The bigger picture',
          caseStudy: { intro: 'Perimeter is the whole boundary walk — 2(l+b), 4a, a+b+c — and it doubles as an equation for finding missing sides. But a correct sum can still describe an impossible shape.',
            decisions: [{ prompt: 'What comes next? Perimeter and Area · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Perimeter and Area · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch6_1', difficulty: 'standard',
          question: 'The perimeter of a plane figure is the total length of its boundary, calculated.',
          hint: 'Review c7_math_ch15_003 (solving linear equations: systematic method) and.',
          misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add.',
          parts: [
                { id: 'a', prompt: 'Write the formula for the perimeter of a rectangle in terms of its length $l$ and breadth $b$.', answer: 'The perimeter of a rectangle is $P = 2(l + b)$',
                  options: ['The perimeter of a rectangle is $P = 2(l + b)$', '2(l+b)'],
                  hint: 'Review c7_math_ch15_003 (solving linear equations: systematic method) and c7_math_ch15_007 (setting.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' },
                { id: 'b', prompt: 'An isosceles triangle has a perimeter of 36 cm. The base is 4 cm less than each equal side. Find the length of each side.', answer: 'Let each equal side be $x$ cm',
                  options: ['Let each equal side be $x$ cm', '4 cm less', '2(l+b)'],
                  hint: 'Review c7_math_ch15_003 (solving linear equations: systematic method) and c7_math_ch15_007 (setting.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' }
          ],
            remediations: { 'students-treat-the-perimeter-formula': { steps: ['Have the student physically measure a rectangular notebook with a ruler.', 'Write $P = l + b + l + b$ on paper, then factor: $P = 2l + 2b = 2(l+b)$.', 'For the "2l + b" error, substitute numbers: $l=10, b=5$. Correct: $2(10+5)=30$. Wrong: $2(10)+5=25$.', 'For triangle problems, insist on labelling ALL three sides with algebraic expressions BEFORE writing the perimeter sum.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem where a farmer has 200 m of fencing wire to make a rectangular pen for goats. The length must be 10 m more than twice the breadth.', answer: 'Problem: "A farmer has 200 m fencing',
                  options: ['Problem: "A farmer has 200 m fencing', '2(l+b)'],
                  hint: 'Review c7_math_ch15_003 (solving linear equations: systematic method) and c7_math_ch15_007 (setting.',
                  misconception: 'Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given.' }
          ],
            remediations: { 'students-treat-the-perimeter-formula': { steps: ['Have the student physically measure a rectangular notebook with a ruler.', 'Write $P = l + b + l + b$ on paper, then factor: $P = 2l + 2b = 2(l+b)$.', 'For the "2l + b" error, substitute numbers: $l=10, b=5$. Correct: $2(10+5)=30$. Wrong: $2(10)+5=25$.', 'For triangle problems, insist on labelling ALL three sides with algebraic expressions BEFORE writing the perimeter sum.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_10', difficulty: 'standard',
          question: 'The area of a segment of a circle is the region bounded by a chord and the arc.',
          hint: 'Review the formula for area of a sector (c9_math_ch6_9) and the formula for area of.',
          misconception: 'Students often forget that the triangle area formula (1/2 r² sin θ) requires the angle in degrees and the sine of that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a segment of a circle is the region bounded by a chord and the arc subtended',
                  options: ['The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'A composite plane figure is a shape formed by combining two or more basic plane figures', 'The circumference of a circle is the perimeter or the total distance around the circle,'],
                  hint: 'Review the formula for area of a sector (c9_math_ch6_9) and the formula for area of a triangle.',
                  misconception: 'Students often forget that the triangle area formula (1/2 r² sin θ) requires the angle in degrees and the sine of that angle.' }
          ],
            remediations: { 'students-often-forget-that-the': { steps: ['If a student makes this error, first verify they can find the area of a triangle given two sides and included angle.', 'Remind them that in the sector, the two radii are the sides and the included angle is θ.', 'Draw the sector and triangle, label the sides and angle.', 'Then guide them: Area of triangle = 1/2 × r × r × sin θ.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_11', difficulty: 'standard',
          question: 'A composite plane figure is a shape formed by combining two or more basic plane.',
          hint: 'If stuck on a specific shape\'s area, revisit that shape\'s node: sector area.',
          misconception: 'Students frequently use the diameter directly in the circle area formula (πd² instead of πr²) when a semicircle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A composite plane figure is a shape formed by combining two or more basic plane figures',
                  options: ['A composite plane figure is a shape formed by combining two or more basic plane figures', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'The circumference of a circle is the perimeter or the total distance around the circle,'],
                  hint: 'If stuck on a specific shape\'s area, revisit that shape\'s node: sector area (c9_math_ch6_9).',
                  misconception: 'Students frequently use the diameter directly in the circle area formula (πd² instead of πr²) when a semicircle or quadrant is described.' }
          ],
            remediations: { 'students-frequently-use-the-diameter': { steps: ['Radius = 5 cm.', 'Area = ½ × π × 5²." For segment confusion: Re-derive segment area = sector - triangle.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_2', difficulty: 'standard',
          question: 'The circumference of a circle is the perimeter or the total distance around the.',
          hint: 'Revisit c6_math_ch07_076 for circle parts and c7_math_ch03_004 for decimal operations.',
          misconception: 'Students often treat \\(\\pi\\) as a variable that can be cancelled algebraically like \\(x\\).',
          parts: [
                { id: 'a', prompt: 'Why is \\(\\pi\\) called an irrational number? If a student says "\\(\\pi = 22/7\\) exactly", what is wrong with that statement?', answer: '\\(\\pi\\) is irrational',
                  options: ['\\(\\pi\\) is irrational', '\\(\\pi = 22/7\\) exactly'],
                  hint: 'Revisit c6_math_ch07_076 for circle parts and c7_math_ch03_004 for decimal operations; also review.',
                  misconception: 'Students often treat \\(\\pi\\) as a variable that can be cancelled algebraically like \\(x\\).' }
          ],
            remediations: { 'students-often-treat-pi-as': { steps: ['If a student cancels \\(\\pi\\) incorrectly: Write \\(C = 2\\pi r\\) and \\(C = 44\\).', 'Substitute \\(\\pi = 22/7\\) explicitly: \\(44 = 2 \\times \\frac{22}{7} \\times r\\).', 'Show that \\(\\pi\\) is a number (22/7), not a variable, so it stays in the arithmetic.', 'Solve step by step: \\(44 = \\frac{44}{7}r\\), multiply both sides by 7: \\(308 = 44r\\), divide by 44: \\(r = 7\\).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_3', difficulty: 'standard',
          question: 'The arc length of a circle is the distance along the curved line forming.',
          hint: 'If stuck, revisit c9_math_ch6_2 (Circumference of a Circle) to reinforce C = 2πr, and.',
          misconception: 'Students often confuse the arc length formula with the area of sector formula, writing L = (θ/360°) × πr² instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The arc length of a circle is the distance along the curved line forming a portion of the',
                  options: ['The arc length of a circle is the distance along the curved line forming a portion of the', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'A composite plane figure is a shape formed by combining two or more basic plane figures'],
                  hint: 'If stuck, revisit c9_math_ch6_2 (Circumference of a Circle) to reinforce C = 2πr, and c8_math_ch7_6.',
                  misconception: 'Students often confuse the arc length formula with the area of sector formula, writing L = (θ/360°) × πr² instead of L = (θ/360°) × 2πr.' }
          ],
            remediations: { 'students-often-confuse-the-arc': { steps: ['If a student uses πr², ask: "What are the units of your answer?', 'Arc length is a distance, so its unit is cm, m, etc.', 'Does πr² give cm or cm²?" Then guide: "Circumference is 2πr (units: cm).', 'The arc is a fraction of the circumference, so the formula must be (fraction) × 2πr.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch6_4', difficulty: 'standard',
          question: 'The area of a rectangle is the product of its length and breadth (A = l × b).',
          hint: 'If stuck, revisit Class 8 node c8_math_ch14_3 (Area of a Parallelogram: Base x Height).',
          misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the product of its length and breadth (A = l × b), where',
                  options: ['The area of a rectangle is the product of its length and breadth (A = l × b), where', 'The perimeter of a plane figure is the total length of its boundary, calculated as the', 'The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'A composite plane figure is a shape formed by combining two or more basic plane figures'],
                  hint: 'If stuck, revisit Class 8 node c8_math_ch14_3 (Area of a Parallelogram: Base x Height) and practice.',
                  misconception: 'Students use the slant side length as the height in the parallelogram area formula (A = base × slant side).' }
          ],
            remediations: { 'students-use-the-slant-side': { steps: ['Draw a parallelogram on grid paper.', 'Draw the slant side of 10 cm at an angle.', 'Drop a perpendicular from the top vertex to the base — measure it: it\'s 8 cm, not 10 cm.', 'Cut along the perpendicular and slide the triangle to form a rectangle of dimensions 12 cm × 8 cm.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
