import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch13_p1: SimDef = {
    id: 'v3_c9_math_ch13_p1',
    title: 'Surface Areas and Volumes · Part 1/2',
    subtitle: 'This node covers total and lateral surface area of cuboids and cubes, including.',
    classLevel: 9, subject: 'mathematics', topic: 'Surface Areas and Volumes · Part 1/2',
    chapters: ['c9_math_ch13'],
    nodeIds: ['c9_math_ch13_1', 'c9_math_ch13_2', 'c9_math_ch13_3', 'c9_math_ch13_4', 'c9_math_ch13_5', 'c9_math_ch13_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Riya wants to paint the four walls of her rectangular room (length 5 m, breadth 4 m, height 3 m) but not the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two cones have the same base radius. Cone A has slant height 10 cm. Cone B has vertical height 10 cm. Which has larger Curved Surface Area?',
        options: ['Cone A has larger CSA', 'height', '"height" in the formula means vertical height'],
        answer: 'Cone A has larger CSA',
        hook: '**Using vertical height (h) instead of slant height (l) in the CSA formula.** Students see "height" in the problem and.',
    },
    teaching: [
        { title: 'Surface Area of a Cuboid and Cube', text: 'The **total surface area (TSA)** of a cuboid with length $l$, breadth $b$, and height $h$ is the sum of the areas of its six rectangular faces, given by $TSA = 2(lb + bh + hl)$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch13_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_1', title: 'Surface Area of a Cuboid and Cube',
          scaffold: { problem: 'A rectangular classroom is 8 m long, 6 m wide, and 4 m high. The four walls and ceiling are to be painted at ₹12 per m².',
            steps: [
            { text: 'Identify what is asked — cost of painting walls and ceiling (not floor).' },
            { text: 'Write known values: l = 8 m, b = 6 m, h = 4 m. Rate = ₹12/m². Door area each = 2 × 1 = 2 m² (total 4 m²).' },
            { text: 'Area to be painted = LSA + ceiling area - (doors + windows) = 2h(l+b) + lb - (4 + 6).' },
            { text: 'Substitute: LSA = 2 × 4 × (8+6) = 8 × 14 = 112 m². Ceiling = 8 × 6 = 48 m².' },
            { text: 'Cost = 150 × 12 = ₹1800.', faded: true, blankAnswer: '₹1800' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_2', title: 'Surface Area of a Right Circular Cylinder',
          scaffold: { problem: 'A cylindrical water tank (closed) has diameter 1.4 m and height 2 m. It is to be painted on the outside (including top and bottom).',
            steps: [
            { text: 'Identify given — diameter = 1.4 m → radius \\( r = \\frac{1.4}{2} = 0.7 \\) m; height \\( h = 2 \\) m.' },
            { text: 'Write formula — TSA = \\( 2\\pi r (r + h) \\).' },
            { text: 'Substitute — \\( 2 \\times \\frac{22}{7} \\times 0.7 \\times (0.7 + 2) \\).' },
            { text: 'Compute — \\( 2 \\times \\frac{22}{7} \\times 0.7 \\times 2.7 = 2 \\times 22 \\times 0.1 \\times 2.7 = 4.4 \\times 2.7 = 11.88.' },
            { text: 'Cost = area × rate = \\( 11.88 \\times 25 = ₹297 \\).', faded: true, blankAnswer: 'Area = 11.88 m², Cost = ₹297' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_3', title: 'Surface Area of a Right Circular Cone',
          scaffold: { problem: 'A conical tent is to be made for a school function. The base radius is 7 m and the vertical height is 24 m.',
            steps: [
            { text: 'Identify given values — radius r = 7 m, vertical height h = 24 m.' },
            { text: 'Find slant height l using Pythagoras theorem: l² = h² + r² = 24² + 7² = 576 + 49 = 625. So l = √625 = 25 m.' },
            { text: 'Apply CSA formula: CSA = πrl = (22/7) × 7 × 25. Simplify: The 7 in denominator cancels with r = 7 → CSA = 22 × 25 = 550.' },
            { text: 'Compute cost: Cost = CSA × Rate = 550 m² × ₹80/m² = ₹44,000.' },
            { text: 'Verify units and reasonableness: CSA in m², rate in ₹/m², cost in ₹.', faded: true, blankAnswer: '₹44,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_4', title: 'Surface Area of a Sphere and Hemisphere',
          scaffold: { problem: 'A decorative spherical ball used in Diwali rangoli has a diameter of 14 cm.',
            steps: [
            { text: 'Diameter = 14 cm → Radius r = diameter/2 = 14/2 = 7 cm' },
            { text: 'Surface area of sphere = 4πr² = 4 × (22/7) × (7)²' },
            { text: 'r² = 7 × 7 = 49 cm²' },
            { text: '4 × (22/7) × 49 = 4 × 22 × 7 = 616 cm² (since 49/7 = 7)' },
            { text: 'Cost = area × rate = 616 × 5 = ₹3080', faded: true, blankAnswer: '₹3080' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_5', title: 'Volume of a Cuboid and Cube',
          scaffold: { problem: 'A school is building a rectangular sandbox for primary students. It is 2.5 m long, 2 m wide, and 0.3 m deep.',
            steps: [
            { text: 'Identify given values: length l = 2.5 m, breadth b = 2 m, height h = 0.3 m (depth).' },
            { text: 'Recall volume formula for cuboid: V = l × b × h.' },
            { text: 'Substitute values: V = 2.5 × 2 × 0.3.' },
            { text: 'Compute stepwise: 2.5 × 2 = 5.0; 5.0 × 0.3 = 1.5.' },
            { text: 'State answer with correct units: V = 1.5 m³.', faded: true, blankAnswer: '1.5 m³' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_6', title: 'Volume of a Cylinder',
          scaffold: { problem: 'A cylindrical grain silo has a radius of 3 metres and a height of 10 metres. Calculate the volume of grain it can store in cubic metres.',
            steps: [
            { text: 'Identify given values—radius r = 3 m, height h = 10 m. Volume asked in m³.' },
            { text: 'Recall volume formula for cylinder: V = πr²h.' },
            { text: 'Substitute values: V = (22/7) × (3)² × 10.' },
            { text: 'Compute stepwise: (3)² = 9; (22/7) × 9 = 198/7; (198/7) × 10 = 1980/7.' },
            { text: 'Convert to mixed number or decimal: 1980 ÷ 7 = 282 remainder 6 → 282 6/7 m³ or ≈282.86 m³. Include units: V = 1980/7 m³.', faded: true, blankAnswer: '1980/7 m³ or approximately 282.86 m³' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch13_6', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch13_6', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Surface Areas and Volumes like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Surface Areas and Volumes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Surface Areas and Volumes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch13_1', difficulty: 'standard',
          question: 'The **total surface area (TSA)** of a cuboid with length $l$, breadth $b$, and.',
          hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c8_math_ch13_8.',
          misconception: '**Misconception:** Students use the TSA formula $2(lb + bh + hl)$ for "area of four walls" problems, or use LSA formula.',
          parts: [
                { id: 'a', prompt: 'A student calculates the lateral surface area of a cuboid of dimensions 10 cm × 8 cm × 6 cm as $2 \\times 6 \\times (10 + 8) = 216 \\text{ cm}^2$.', answer: '**Correct answer:** The first student is correct',
                  options: ['**Correct answer:** The first student is correct', 'lateral'],
                  hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c8_math_ch13_8 (Solving.',
                  misconception: '**Misconception:** Students use the TSA formula $2(lb + bh + hl)$ for "area of four walls" problems, or use LSA formula $2h(l+b)$ for.' }
          ],
            remediations: { 'misconception-students-use-the-tsa': { steps: ['Have the student draw a net of the cuboid/room and label each face (front, back, left, right, top, bottom).', 'Ask: "Which faces are the \'four walls\'?', 'Which faces are NOT painted?" 3.', 'Write the area of each coloured face separately: front = $lh$, back = $lh$, left = $bh$, right = $bh$.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** Students use the TSA formula $2(lb + bh + hl)$ for "area of four walls" problems, or use LSA formula.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the side of a cube whose total surface area is 294 cm²." Their working: $6a^2 = 294 \\Rightarrow a^2 = 294/6 = 49 \\Rightarrow a = 7.', answer: '**Correct answer:** Yes, the solution is correct',
                  options: ['**Correct answer:** Yes, the solution is correct', 'divide by 6 is wrong, should multiply by 6'],
                  hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c8_math_ch13_8 (Solving.',
                  misconception: '**Misconception:** Students use the TSA formula $2(lb + bh + hl)$ for "area of four walls" problems, or use LSA formula $2h(l+b)$ for.' }
          ],
            remediations: { 'misconception-students-use-the-tsa': { steps: ['Have the student draw a net of the cuboid/room and label each face (front, back, left, right, top, bottom).', 'Ask: "Which faces are the \'four walls\'?', 'Which faces are NOT painted?" 3.', 'Write the area of each coloured face separately: front = $lh$, back = $lh$, left = $bh$, right = $bh$.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_2', difficulty: 'standard',
          question: 'For a right circular cylinder of radius \\( r \\) and height \\( h \\), the.',
          hint: 'Revisit c6_math_ch07_076 (circle parts) and c6_math_ch08_089 (area of circle) to solidify.',
          misconception: '**Exact error:** Students use the **diameter** directly in the formula \\( 2\\pi r h \\) instead of halving it to get.',
          parts: [
                { id: 'a', prompt: 'A cylindrical drum is open at the top. Its radius is 14 cm and height is 50 cm. A student calculates the surface area as \\( 2\\pi r h + 2\\pi r^2 \\).', answer: '**Answer:** No, it is incorrect',
                  options: ['**Answer:** No, it is incorrect', 'open at the top'],
                  hint: 'Revisit c6_math_ch07_076 (circle parts) and c6_math_ch08_089 (area of circle) to solidify \\( \\pi.',
                  misconception: '**Exact error:** Students use the **diameter** directly in the formula \\( 2\\pi r h \\) instead of halving it to get radius.' },
                { id: 'b', prompt: 'A solid cylinder and a hollow cylinder (pipe) have the same external radius \\( R \\), same height \\( h \\), and the hollow cylinder has internal radius \\( r \\).', answer: '**Answer:** The hollow cylinder has **larger** TSA',
                  options: ['**Answer:** The hollow cylinder has **larger** TSA', 'solid has more area'],
                  hint: 'Revisit c6_math_ch07_076 (circle parts) and c6_math_ch08_089 (area of circle) to solidify \\( \\pi.',
                  misconception: '**Exact error:** Students use the **diameter** directly in the formula \\( 2\\pi r h \\) instead of halving it to get radius.' }
          ],
            remediations: { 'exact-error-students-use-the': { steps: ['**Circle the given measurement** in the problem and label it "diameter" or "radius" explicitly.', '**Write \\( r = \\frac{d}{2} \\)** as a separate step before substituting.', 'For hollow cylinders: **Draw a cross-section** showing two concentric circles.', 'Label outer radius \\( R \\), inner radius \\( r \\).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_3', difficulty: 'standard',
          question: 'The **Curved Surface Area (CSA)** of a right circular cone is the area of its.',
          hint: 'Revisit **c8_math_ch9_5 (Pythagoras theorem)** for l = √(h² + r²) and **c6_math_ch08_089.',
          misconception: '**Using vertical height (h) instead of slant height (l) in the CSA formula.** Students see "height" in the problem and.',
          parts: [
                { id: 'a', prompt: 'Write the formula for the Total Surface Area (TSA) of a right circular cone in terms of radius (r) and slant height (l).', answer: 'TSA = πr(l + r) or πrl + πr²',
                  options: ['TSA = πr(l + r) or πrl + πr²', 'CSA doubles or halves'],
                  hint: 'Revisit **c8_math_ch9_5 (Pythagoras theorem)** for l = √(h² + r²) and **c6_math_ch08_089 (Area.',
                  misconception: '**Using vertical height (h) instead of slant height (l) in the CSA formula.** Students see "height" in the problem and plug h into πrl.' },
                { id: 'b', prompt: 'Two cones have the same base radius. Cone A has slant height 10 cm. Cone B has vertical height 10 cm. Which has larger Curved Surface Area?', answer: 'Cone A has larger CSA',
                  options: ['Cone A has larger CSA', 'height', '"height" in the formula means vertical height'],
                  hint: 'Revisit **c8_math_ch9_5 (Pythagoras theorem)** for l = √(h² + r²) and **c6_math_ch08_089 (Area.',
                  misconception: '**Using vertical height (h) instead of slant height (l) in the CSA formula.** Students see "height" in the problem and plug h into πrl.' }
          ],
            remediations: { 'using-vertical-height-h-instead': { steps: ['If a student uses h instead of l: 1.', '**Draw the net**: Sketch the cone and its flattened sector side-by-side.', 'Label the sector radius as "l" and the cone\'s vertical height as "h".', 'Ask: "Which length goes from the tip to the base edge along the surface?" — that is l.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_4', difficulty: 'standard',
          question: 'The surface area of a sphere is the total area of its outer surface, calculated.',
          hint: 'Review circle area calculations (πr²) and ensure you can square decimals and fractions.',
          misconception: 'Students often calculate the surface area of a hemisphere as 2πr² and stop, believing this is the "total" area, because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The surface area of a sphere is the total area of its outer surface, calculated as 4πr²',
                  options: ['The surface area of a sphere is the total area of its outer surface, calculated as 4πr²', 'The **total surface area (TSA)** of a cuboid with length $l$, breadth $b$, and height $h$', 'For a right circular cylinder of radius \\( r \\) and height \\( h \\), the **Curved Surface', 'The **Curved Surface Area (CSA)** of a right circular cone is the area of its sloping'],
                  hint: 'Review circle area calculations (πr²) and ensure you can square decimals and fractions accurately.',
                  misconception: 'Students often calculate the surface area of a hemisphere as 2πr² and stop, believing this is the "total" area, because they think.' }
          ],
            remediations: { 'students-often-calculate-the-surface': { steps: ['Ask the student to physically draw a hemisphere and label: "What parts would get wet if I dipped this in paint?" Guide.', 'Then write: curved part = half of sphere = 2πr², base = circle = πr², total = 2πr² + πr² = 3πr².', 'Emphasize: "Half the volume doesn’t mean half the surface area – the cut creates a new surface."'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_5', difficulty: 'standard',
          question: 'The volume of a cuboid is the measure of the three-dimensional space.',
          hint: 'If stuck, revisit the concept of area of rectangle (c6_math_ch08_087) and how multiplying.',
          misconception: 'Students often calculate volume as l × b + h or l + b × h, incorrectly applying addition instead of multiplication for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The volume of a cuboid is the measure of the three-dimensional space it occupies,',
                  options: ['The volume of a cuboid is the measure of the three-dimensional space it occupies,', 'The **total surface area (TSA)** of a cuboid with length $l$, breadth $b$, and height $h$', 'For a right circular cylinder of radius \\( r \\) and height \\( h \\), the **Curved Surface', 'The **Curved Surface Area (CSA)** of a right circular cone is the area of its sloping'],
                  hint: 'If stuck, revisit the concept of area of rectangle (c6_math_ch08_087) and how multiplying by height.',
                  misconception: 'Students often calculate volume as l × b + h or l + b × h, incorrectly applying addition instead of multiplication for all three.' }
          ],
            remediations: { 'students-often-calculate-volume-as': { steps: ['Ask the student to visualize the cuboid as layers: first, find how many 1×1 squares fit in the base (l × b), then.', 'Emphasize that each layer has l×b unit cubes, and there are h layers, so total is (l×b)×h.', 'Use a diagram or blocks to show that adding dimensions doesn’t create layers—it only extends an edge.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_6', difficulty: 'standard',
          question: 'The volume of a right circular cylinder is the amount of three-dimensional.',
          hint: 'Review calculating area of a circle (c6_math_ch08_089) and solving equations like 3x = 12.',
          misconception: 'Students often confuse radius and diameter when substituting into V = πr²h, using the diameter value directly for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The volume of a right circular cylinder is the amount of three-dimensional space it',
                  options: ['The volume of a right circular cylinder is the amount of three-dimensional space it', 'The **total surface area (TSA)** of a cuboid with length $l$, breadth $b$, and height $h$', 'For a right circular cylinder of radius \\( r \\) and height \\( h \\), the **Curved Surface', 'The **Curved Surface Area (CSA)** of a right circular cone is the area of its sloping'],
                  hint: 'Review calculating area of a circle (c6_math_ch08_089) and solving equations like 3x = 12 for.',
                  misconception: 'Students often confuse radius and diameter when substituting into V = πr²h, using the diameter value directly for r without halving it.' }
          ],
            remediations: { 'students-often-confuse-radius-and': { steps: ['Ask the student to first write down what is given: "diameter = 14 cm." Then explicitly state: "The formula needs.', 'Only then substitute r = 7 cm into V = πr²h.', 'Emphasize: "Always check—does the formula use r or d?', 'If it’s r, and you’re given d, convert first." Practice with oral drills: "If diameter is 20 cm, what is radius?".'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
