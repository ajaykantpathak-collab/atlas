import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch07_p2: SimDef = {
    id: 'v3_c10_math_ch07_p2',
    title: 'Coordinate Geometry · Part 2/2',
    subtitle: 'Give every point an address, then do geometry by arithmetic',
    classLevel: 10, subject: 'mathematics', topic: 'Coordinate Geometry · Part 2/2',
    chapters: ['c10_math_ch07'],
    nodeIds: ['c10_math_cbse_07_007', 'c10_math_cbse_07_008', 'c10_math_cbse_07_009', 'c10_math_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a map analyst working purely in numbers', intro: 'A map with no scale, no ruler, no compass — just coordinates. Your job is to measure distances, find exact division points, and prove a triangle is isosceles using nothing but x\'s and y\'s.', goal: 'Apply the distance, section and area formulas, and verify geometric properties of figures through coordinates.' },
    discovery: {
        question: 'Two cities sit at map coordinates (2, 3) and (7, 6). A friend measures the gap with a ruler and guesses \'about 6 cm.\' You get the exact answer without any ruler — just Pythagoras. What\'s the trick?',
        options: ['Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34', 'Add the x and y coordinates of both points together', 'Count grid squares diagonally between the cities', 'Distance between coordinates is impossible without measuring'],
        answer: 'Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34',
        hook: 'Coordinate geometry turns maps into algebra. Every distance formula is just Pythagoras wearing coordinates — subtract, square, add, root.',
    },
    teaching: [
        { title: 'Area of a Triangle Using Coordinates: Formula', text: 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian plane is given by the absolute value of half the determinant formed by the coordinates: Area = ½ |x₁(y₂ − y₃).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_07_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Turn a coordinate plane into a measuring lab: find distances between points, divide segments in exact ratios, and compute triangle areas — proving shapes are what you claim they are.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_007', title: 'Area of a Triangle Using Coordinates: Formula',
          scaffold: { problem: 'A triangular garden in a school in Delhi has corners marked at coordinates A(3, 2), B(7, 5), C(9, 1) on the school map (1 unit = 10.',
            steps: [
            { text: 'Identify the given coordinates: A(3,2), B(7,5), C(9,1). Note the scale: 1 unit = 10 m, so 1 sq unit = 100 sq m.' },
            { text: 'Write the area formula: Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|' },
            { text: 'Substitute the coordinates: x₁=3, y₁=2; x₂=7, y₂=5; x₃=9, y₃=1.' },
            { text: 'Simplify step by step:' },
            { text: 'Convert to actual area: 11 sq units × 100 sq m/sq unit = 1100 sq m.', faded: true, blankAnswer: 'Area = 1100 m², Total cost = ₹49,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_009', title: 'Collinearity of Three Points Using Area Formula',
          scaffold: { problem: 'A straight road passes through three milestones located at coordinates A(2, 5), B(5, 11), and C(8, k) on a survey map (units.',
            steps: [
            { text: 'Identify the given coordinates: A(2, 5) → x₁=2, y₁=5; B(5, 11) → x₂=5, y₂=11; C(8, k) → x₃=8, y₃=k.' },
            { text: 'Write the collinearity condition using the area formula: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0.' },
            { text: 'Substitute the known values: 2(11 - k) + 5(k - 5) + 8(5 - 11) = 0.' },
            { text: 'Simplify step by step: 2(11 - k) = 22 - 2k; 5(k - 5) = 5k - 25; 8(5 - 11) = 8(-6) = -48.' },
            { text: 'Combine like terms: 22 - 25 - 48 = -51; -2k + 5k = 3k. So: 3k - 51 = 0 → 3k = 51 → k = 17.' },
            { text: 'Verify by substituting k=17 back: 2(11-17) + 5(17-5) + 8(5-11) = 2(-6) + 5(12) + 8(-6) = -12 + 60 - 48 = 0. ✓', faded: true, blankAnswer: 'k = 17 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_010', title: 'Finding Coordinates of Points Using Section Formula',
          scaffold: { problem: 'A school playground has two flag poles at coordinates \\( A(3, -2) \\) and \\( B(7, 4) \\). A rope is tied between them.',
            steps: [
            { text: 'Identify the given coordinates: \\( x_1 = 3, y_1 = -2 \\) (pole A); \\( x_2 = 7, y_2 = 4 \\) (pole B).' },
            { text: 'Write the section formula for internal division: \\( x = \\frac{m x_2 + n x_1}{m+n} \\), \\( y = \\frac{m y_2 + n y_1}{m+n}.' },
            { text: 'Substitute the values: \\( x = \\frac{2 \\times 7 + 3 \\times 3}{2+3} = \\frac{14 + 9}{5} = \\frac{23}{5} = 4.6 \\); \\(.' },
            { text: 'Verify the point lies between A and B: x-coordinate 4.6 is between 3 and 7; y-coordinate 0.4 is between -2 and 4.' },
            { text: 'State the final answer with units: The flag should be attached at \\( (4.6, 0.4) \\) (or \\( \\left( \\frac{23}{5}.', faded: true, blankAnswer: '\\( \\left( \\frac{23}{5}, \\frac{2}{5} \\right) \\) or (4.6, 0.4)' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_07_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On the school\'s gridded sports field, a student must run straight from a flag post at one grid point to a water cooler 3 squares east and 4 squares north. He calculates the distance as \'3 + 4 = 7 squares\' and wonders why the straight path looks shorter.',
            decisions: [{ prompt: 'What is the actual straight-line distance, and why isn\'t it 7?', options: [
                { text: 'Five squares — the run is the hypotenuse of a right triangle whose legs are 3 and 4, so the distance formula gives √(3² + 4²) = √25 = 5. Adding the legs counts the corner-cutting walk along the grid edges, which is always longer than the direct diagonal — that is why the formula squares and roots instead of adding.', outcome: 'The distance formula is Pythagoras on a grid: horizontal and vertical gaps combine as squares because the direct path is the hypotenuse, never the sum of the legs.' },
                { text: 'He is right — distance is just total horizontal plus total vertical, so 3 + 4 = 7 squares.', outcome: 'That sum describes a path that walks right then up, not the straight line — the diagonal of a 3-4-5 triangle is 5, which is visibly shorter.', reveals: 'distance-is-sum' },
                { text: 'The distance is 3 × 4 = 12 squares, since distance equals area covered.', outcome: 'Multiplying the legs gives the rectangle\'s area, not the length of the diagonal — the distance formula uses squares added under a root, not the product.', reveals: 'distance-equals-area' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'Descartes\' grid let geometry and algebra finally talk. Any question about lengths, midpoints or areas becomes arithmetic once the points have addresses.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_07_007', difficulty: 'standard',
          question: 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the.',
          hint: 'If stuck, revisit c9_math_ch1_11 (Class 9 area formula) and c6_math_ch08_088 (basic.',
          misconception: 'Students often forget the absolute value bars and report negative area.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian',
                  options: ['The area of a triangle with vertices A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in the Cartesian', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The distance formula calculates the straight-line distance between two points P(x₁, y₁)', 'The distance between two points lying on the same axis (x-axis or y-axis) is the absolute'],
                  hint: 'If stuck, revisit c9_math_ch1_11 (Class 9 area formula) and c6_math_ch08_088 (basic triangle area).',
                  misconception: 'Students often forget the absolute value bars and report negative area.' }
          ],
            remediations: { 'students-often-forget-the-absolute': { steps: ['If a student forgets absolute value: Ask them to plot the points and see if area can be negative.', 'Demonstrate with two vertex orders: (1,1), (4,5), (7,2) vs (1,1), (7,2), (4,5).', 'Show the determinant changes sign but area is same.', 'Make them write "| |" in the formula every time.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_008', difficulty: 'standard',
          question: 'The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and.',
          hint: 'If stuck, review the derivation of the area formula in node c10_math_cbse_07_007 and.',
          misconception: '**Misconception 1: Forgetting the absolute value bars.** Students compute \\(x_1(y_2-y_3)+...\\) and get a negative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and \\(C(x_3,',
                  options: ['The area of a triangle with vertices \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and \\(C(x_3,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The distance formula calculates the straight-line distance between two points P(x₁, y₁)', 'The distance between two points lying on the same axis (x-axis or y-axis) is the absolute'],
                  hint: 'If stuck, review the derivation of the area formula in node c10_math_cbse_07_007 and practice.',
                  misconception: '**Misconception 1: Forgetting the absolute value bars.** Students compute \\(x_1(y_2-y_3)+...\\) and get a negative number (e.g., -12) and.' }
          ],
            remediations: { 'misconception-1-forgetting-the-absolute': { steps: ['** Ask them to plot the points (0,0), (4,0), (0,3) and (0,0), (0,3), (4,0) on graph paper. **', '** Compute area using the formula for both orders. Show that one gives +6, the other -6. **', '** Explain that area is a physical quantity, always positive. The formula without absolute value gives "signed area".', '** Drill: "Always write | ... | before evaluating." If they forget \\(\\frac{1}{2}\\): Remind them the formula comes from.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_009', difficulty: 'standard',
          question: 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only.',
          hint: 'If stuck, revisit c10_math_cbse_07_007 (Area of Triangle Formula) and practice 5-10.',
          misconception: 'Students often write the collinearity condition as |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| = 0 (with absolute value).',
          parts: [
                { id: 'a', prompt: 'State the exact algebraic condition for three points A(x₁, y₁), B(x₂, y₂), C(x₃, y₃) to be collinear using the area of triangle formula.', answer: 'The condition is: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0',
                  options: ['The condition is: x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) = 0', 'Area = 0'],
                  hint: 'If stuck, revisit c10_math_cbse_07_007 (Area of Triangle Formula) and practice 5-10 substitution.',
                  misconception: 'Students often write the collinearity condition as |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| = 0 (with absolute value) and then drop the.' }
          ],
            remediations: { 'students-often-write-the-collinearity': { steps: ['If a student makes sign errors in the differences (y₂ - y₃), (y₃ - y₁), (y₁ - y₂), use this remediation: 1.', 'Have them write the three points vertically with labels: Point 1: (x₁, y₁), Point 2: (x₂, y₂), Point 3: (x₃, y₃).', 'Make them write the three differences as a chant: "y₂ minus y₃, y₃ minus y₁, y₁ minus y₂" — notice the cyclic pattern.', 'Practice with a fixed template: x₁( y₂ - y₃ ) + x₂( y₃ - y₁ ) + x₃( y₁ - y₂ ) = 0.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_010', difficulty: 'standard',
          question: 'The section formula for internal division states that if a point \\( P(x, y) \\).',
          hint: 'Review the derivation of the section formula using similar triangles (c9_math_ch1_7) and.',
          misconception: 'Students consistently swap the ratio weights: they write \\( x = \\frac{m x_1 + n x_2}{m+n} \\) instead of \\( \\frac{m x_2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for internal division states that if a point \\( P(x, y) \\) divides',
                  options: ['The section formula for internal division states that if a point \\( P(x, y) \\) divides', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The distance formula calculates the straight-line distance between two points P(x₁, y₁)', 'The distance between two points lying on the same axis (x-axis or y-axis) is the absolute'],
                  hint: 'Review the derivation of the section formula using similar triangles (c9_math_ch1_7) and practice.',
                  misconception: 'Students consistently swap the ratio weights: they write \\( x = \\frac{m x_1 + n x_2}{m+n} \\) instead of \\( \\frac{m x_2 + n x_1}{m+n} \\).' }
          ],
            remediations: { 'students-consistently-swap-the-ratio': { steps: ['To fix the weight-swap error, use the mnemonic: "The ratio part multiplies the OPPOSITE endpoint." Draw a diagram.', 'The distance from A to P is \\( \\frac{m}{m+n} \\) of AB, so the weight for B\'s coordinate is m.', 'Practice with color-coded coordinates: write A\'s coordinates in red, B\'s in blue.', 'Write the ratio as m:n with m in blue (for B) and n in red (for A).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
