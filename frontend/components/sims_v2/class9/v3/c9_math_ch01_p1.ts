import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch01_p1: SimDef = {
    id: 'v3_c9_math_ch01_p1',
    title: 'Coordinate Geometry · Part 1/2',
    subtitle: 'An address for every point on the page',
    classLevel: 9, subject: 'mathematics', topic: 'Coordinate Geometry · Part 1/2',
    chapters: ['c9_math_ch01'],
    nodeIds: ['c9_math_ch1_1', 'c9_math_ch1_10', 'c9_math_ch1_11', 'c9_math_ch1_2', 'c9_math_ch1_3', 'c9_math_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mapmaker inventing coordinates', intro: 'One number line can only mark points along itself. Cross it with a second one and suddenly every point on the page gets its own unique address — if you read the pair in the right order.', goal: 'Understand the Cartesian plane — x and y axes, origin (0,0), and ordered pairs as signed distances from each axis, with order and sign carrying direction.' },
    discovery: {
        question: 'Is the point (3, 5) the same spot as (5, 3)? They use the same two numbers, after all.',
        options: ['No — coordinates are an ordered pair: the first number is always distance from the y-axis, the second from the x-axis; swapping teleports the point', 'Yes — same numbers, same point', 'Only sometimes, on Tuesdays', 'Yes, as long as both are positive'],
        answer: 'No — coordinates are an ordered pair: the first number is always distance from the y-axis, the second from the x-axis; swapping teleports the point',
        hook: 'A coordinate is an address, not a shopping list — order is everything. \'x walks horizontally, y climbs vertically.\' And the origin isn\'t (1,1): it\'s (0,0), the one spot sitting exactly ON both axes.',
    },
    teaching: [
        { title: 'Cartesian Coordinate System: Axes and Origin', text: 'The Cartesian coordinate system is a two-dimensional plane formed by two perpendicular number lines intersecting at their zero points; the horizontal line is the x-axis, the vertical line is the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch1_1', title: 'Your mission',
          mission: { widget: 'globe', validate: 'globe:tilt=60',
            instruction: 'On the lab: tilt the axis — which hemisphere gets more light?.',
        context: 'Build the Cartesian plane yourself: draw the two axes crossing at (0,0), plot points that live on the axes (why does everything on the x-axis end in 0?), and describe a bench\'s location for a phone call using two perpendicular distances.',
            observePrompt: 'What did the globe interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_10', title: 'Collinearity of Three Points Using Distance Formula',
          scaffold: { problem: 'A telephone company wants to lay a straight underground cable between three junction boxes located at coordinates A(1, 2), B(4, 6), and.',
            steps: [
            { text: 'Identify the coordinates: A(1,2), B(4,6), C(7,10). We need to check collinearity using the distance formula condition.' },
            { text: 'Calculate distance AB = √[(4−1)² + (6−2)²] = √[3² + 4²] = √(9+16) = √25 = 5 units.' },
            { text: 'Calculate distance BC = √[(7−4)² + (10−6)²] = √[3² + 4²] = √25 = 5 units.' },
            { text: 'Calculate distance AC = √[(7−1)² + (10−2)²] = √[6² + 8²] = √(36+64) = √100 = 10 units.' },
            { text: 'Check condition: AB + BC = 5 + 5 = 10 = AC. Since the sum of the two smaller distances equals the largest distance.', faded: true, blankAnswer: 'Yes, the three junction boxes are collinear. The total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_11', title: 'Area of a Triangle Using Coordinates: Formula',
          scaffold: { problem: 'A triangular plot of land in a village in Maharashtra has corners marked by survey coordinates: A(2, 3), B(5, 7), C(8, 3).',
            steps: [
            { text: 'Identify the coordinates: (x1, y1) = (2, 3), (x2, y2) = (5, 7), (x3, y3) = (8, 3).' },
            { text: 'Write the area formula: Area = 1/2 | x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2) |.' },
            { text: 'Substitute the values: Area = 1/2 | 2(7 - 3) + 5(3 - 3) + 8(3 - 7) |.' },
            { text: 'Simplify inside the absolute value: 2(4) + 5(0) + 8(-4) = 8 + 0 - 32 = -24.' },
            { text: 'Take absolute value and multiply by 1/2: Area = 1/2 * | -24 | = 1/2 * 24 = 12 square metres.', faded: true, blankAnswer: '12 square metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_2', title: 'Plotting Points on the Cartesian Plane',
          scaffold: { problem: 'A city planner in Bengaluru uses a coordinate grid where 1 unit = 100 metres. The town hall is at the origin (0, 0).',
            steps: [
            { text: 'Identify the scale and axes — 1 unit = 100 m, so east = +x, north = +y, west = -x, south = -y.' },
            { text: 'Convert each location to coordinates. Park: 300 m east = +3 units x, 400 m north = +4 units y → (3, 4).' },
            { text: 'Choose graph paper scale — e.g., 1 cm = 1 unit. Mark axes from -6 to +6 on x, -3 to +5 on y to fit all points.' },
            { text: 'Plot each point. Park: from origin, move 3 cm right, 4 cm up, mark P. School: move 5 cm left, 2 cm down, mark S.' },
            { text: 'Verify by reading back coordinates from the graph — Park at (3, 4), School at (-5, -2), Hospital at (6, 0). All match.', faded: true, blankAnswer: 'Park: (3, 4); School: (-5, -2); Hospital: (6, 0). All.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_4', title: 'Distance Formula: Derivation Using Pythagoras Theorem',
          scaffold: { problem: 'Derive the distance formula for points A(2, 3) and B(5, 7) by drawing the right triangle on the Cartesian plane, labelling all lengths, and.',
            steps: [
            { text: 'Plot A(2, 3) and B(5, 7). Draw horizontal line from A to C(5, 3) and vertical line from C to B.' },
            { text: 'Identify leg lengths: AC is horizontal, so length = \\(x_2 - x_1 = 5 - 2 = 3\\).' },
            { text: 'Apply Pythagoras theorem: \\(AB^2 = AC^2 + CB^2 = 3^2 + 4^2\\).' },
            { text: 'Compute: \\(AB^2 = 9 + 16 = 25\\). Take square root: \\(AB = \\sqrt{25} = 5\\).' },
            { text: 'Generalise: For any points \\((x_1, y_1)\\) and \\((x_2, y_2)\\), horizontal leg = \\(|x_2 - x_1|\\), vertical leg = \\(|y_2.', faded: true, blankAnswer: 'Distance AB = 5 units. General formula: \\(d = \\sqrt{(x_2.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch1_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Marking seating spots on graph paper for a school drill, the PE teacher reads \'(3, 5): three right, five up from the origin.\' A student plots it as three up and five right, arguing \'3 and 5 are 3 and 5 — same point either way.\'',
            decisions: [{ prompt: 'Does the order inside the pair matter?', options: [
                { text: 'Completely — (3, 5) means 3 units from the vertical axis then 5 from the horizontal one; (5, 3) is a different square entirely. The pair is ordered by convention — horizontal first, vertical second — and only the line y = x is where a swap coincidentally lands on the same spot.', outcome: 'This applies the fixed convention that makes coordinates unambiguous — shared language, not personal preference.' },
                { text: 'The student is right — the pair is just the two numbers, and the point exists wherever you place them.', outcome: 'Coordinates are signed distances from specific axes; swapping them moves the point, which is why the convention exists.', reveals: 'order-doesnt-matter' },
                { text: 'Neither is standard — teachers let each student choose which number goes horizontal.', outcome: 'The convention is universal: x first, y second; letting everyone choose would make every shared map meaningless.', reveals: 'axes-are-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'Two number lines at right angles = an address system for every point in the universe of a page. First number: how far sideways from the y-axis. Second: how far up or down from the x-axis. Order matters, signs matter.',
            decisions: [{ prompt: 'What comes next? Coordinate Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coordinate Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'globe', prompt: 'Explore the globe interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'globe', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch1_1', difficulty: 'standard',
          question: 'The Cartesian coordinate system is a two-dimensional plane formed by two.',
          hint: 'If stuck, revisit "Integers on the Number Line" (c6_math_ch02_017) and "Perpendicular.',
          misconception: 'Students often confuse the order of coordinates and write (y, x) instead of (x, y), especially when the point is in the.',
          parts: [
                { id: 'a', prompt: 'Compare the number line (one dimension) and the Cartesian plane (two dimensions).', answer: 'A number line locates points using one coordinate (signed distance from zero)',
                  options: ['A number line locates points using one coordinate (signed distance from zero)', 'it has two axes'],
                  hint: 'If stuck, revisit "Integers on the Number Line" (c6_math_ch02_017) and "Perpendicular Lines".',
                  misconception: 'Students often confuse the order of coordinates and write (y, x) instead of (x, y), especially when the point is in the first quadrant.' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['If a student writes (y, x), have them physically walk the axes: stand at origin, move horizontally first (x), then.', 'Say aloud: "x tells left/right, y tells up/down." Use a mnemonic: "x is a cross (horizontal), y goes up to the sky.".'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the order of coordinates and write (y, x) instead of (x, y), especially when the point is in the.',
          parts: [
                { id: 'a', prompt: 'A student draws the x-axis vertically and the y-axis horizontally, labels the origin, and plots (2, 3) as 2 units up and 3 units right. Is this acceptable?', answer: 'No, it is not acceptable by standard convention',
                  options: ['No, it is not acceptable by standard convention', 'it\'s fine as long as you\'re consistent'],
                  hint: 'If stuck, revisit "Integers on the Number Line" (c6_math_ch02_017) and "Perpendicular Lines".',
                  misconception: 'Students often confuse the order of coordinates and write (y, x) instead of (x, y), especially when the point is in the first quadrant.' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['If a student writes (y, x), have them physically walk the axes: stand at origin, move horizontally first (x), then.', 'Say aloud: "x tells left/right, y tells up/down." Use a mnemonic: "x is a cross (horizontal), y goes up to the sky.".'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_10', difficulty: 'standard',
          question: 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only.',
          hint: 'If stuck, revisit c9_math_ch1_4 (Distance Formula derivation and practice) and.',
          misconception: 'Students often assume that if the three distances AB, BC, AC are all different, the points cannot be collinear.',
          parts: [
                { id: 'a', prompt: 'Three points P(1, 2), Q(4, 6), and R(7, 10) are given. A student calculates PQ = 5, QR = 5, and PR = 10, then says "PQ + QR = PR, so the points are collinear.".', answer: 'Yes, the conclusion is correct',
                  options: ['Yes, the conclusion is correct', 'No, because PQ = QR so it\'s an isosceles triangle', 'We need to check slopes'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (Distance Formula derivation and practice) and c8_math_ch9_5.',
                  misconception: 'Students often assume that if the three distances AB, BC, AC are all different, the points cannot be collinear.' },
                { id: 'b', prompt: 'Points A(–2, 1), B(2, 3), and C(6, 5) are plotted. Calculate AB, BC, and AC using the distance formula. Determine if A, B, C are collinear. Show all steps.', answer: 'AB = √[(2−(−2))² + (3−1)²] = √[4² + 2²] = √(16+4) = √20 = 2√5 ≈ 4.472',
                  options: ['AB = √[(2−(−2))² + (3−1)²] = √[4² + 2²] = √(16+4) = √20 = 2√5 ≈ 4.472', 'not collinear because AB ≠ BC', 'collinearity requires equal distances'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (Distance Formula derivation and practice) and c8_math_ch9_5.',
                  misconception: 'Students often assume that if the three distances AB, BC, AC are all different, the points cannot be collinear.' }
          ],
            remediations: { 'if-the-three-distances-ab': { steps: ['If a student makes the above error, first ask: "Draw three points on a line where the middle point is NOT exactly.', 'Are two of them equal?" Then guide: "Collinearity only requires the whole segment to equal the sum of its two parts.', 'Simplify: √8=2√2, √18=3√2, √50=5√2.', 'Emphasize: "The numbers inside the square roots (8, 18, 50) are not perfect squares, but the radicals combine because.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_11', difficulty: 'standard',
          question: 'The area of a triangle with vertices at coordinates \\(A(x_1, y_1)\\), \\(B(x_2.',
          hint: 'If stuck, revisit plotting points (c9_math_ch1_2) and the distance formula.',
          misconception: 'Students often write the formula as \\(\\frac{1}{2} [x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)]\\) without the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices at coordinates \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and',
                  options: ['The area of a triangle with vertices at coordinates \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and', 'The Cartesian coordinate system is a two-dimensional plane formed by two perpendicular', 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only if the sum of', 'Plotting a point on the Cartesian plane means locating its exact position using an'],
                  hint: 'If stuck, revisit plotting points (c9_math_ch1_2) and the distance formula (c9_math_ch1_4).',
                  misconception: 'Students often write the formula as \\(\\frac{1}{2} [x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)]\\) without the absolute value bars, and.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['If a student makes sign errors, have them write the coordinates in a column and repeat the first coordinate at the.', 'Then use the "shoelace" method: multiply diagonally down-right and sum, multiply diagonally up-right and sum, subtract.', 'This visual method reduces sign mistakes.', 'Practice with both clockwise and anticlockwise vertex orders until they see the absolute value gives the same positive.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_2', difficulty: 'standard',
          question: 'Plotting a point on the Cartesian plane means locating its exact position using.',
          hint: 'Revisit "Integers on the Number Line" (c6_math_ch02_017) and "Locating Decimals on the.',
          misconception: 'Students often plot (-3, 2) by moving 3 units right (treating -3 as positive) and 2 units up, or they swap coordinates.',
          parts: [
                { id: 'a', prompt: 'Plot the points A(2.5, -1.5), B(-3, 2), C(0, 4), and D(-2, -3) on a Cartesian plane with 1 cm = 1 unit. Which point lies in the third quadrant?', answer: 'Point D(-2, -3) lies in the third quadrant',
                  options: ['Point D(-2, -3) lies in the third quadrant', 'negative x and positive y is third quadrant (it\'s second)'],
                  hint: 'Revisit "Integers on the Number Line" (c6_math_ch02_017) and "Locating Decimals on the Number Line".',
                  misconception: 'Students often plot (-3, 2) by moving 3 units right (treating -3 as positive) and 2 units up, or they swap coordinates and plot (2, -3).' }
          ],
            remediations: { 'students-often-plot-3': { steps: ['Have the student stand at a classroom corner (origin).', 'Say "Move -3 steps along the wall (x-axis)" — they must step backward (left if wall goes right).', 'Then "Move +2 steps into the room (y-axis)" — they step forward.', 'Repeat with coordinates on paper: trace the path with a finger — right/left for x, then up/down for y — saying.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_3', difficulty: 'standard',
          question: 'The Cartesian plane is divided into four quadrants by the x-axis and y-axis.',
          hint: 'If stuck, revisit plotting points (c9_math_ch1_2) and practice moving from origin using.',
          misconception: 'Students often confuse the order of quadrants, thinking Quadrant III is bottom-right (+,−) and Quadrant IV.',
          parts: [
                { id: 'a', prompt: 'If a point (a, b) lies in Quadrant II, what can you say about the signs of a and b?', answer: 'In Quadrant II, a < 0 (negative) and b > 0 (positive)',
                  options: ['In Quadrant II, a < 0 (negative) and b > 0 (positive)', 'Quadrant III'],
                  hint: 'If stuck, revisit plotting points (c9_math_ch1_2) and practice moving from origin using "x steps.',
                  misconception: 'Students often confuse the order of quadrants, thinking Quadrant III is bottom-right (+,−) and Quadrant IV is bottom-left (−,−).' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['Draw a large Cartesian plane on paper.', 'Label the axes with arrows: +x → East, −x → West, +y → North, −y → South.', 'Move right 3 (say "+x"), then up 2 (say "+y") → Quadrant I.', 'Move left 3 ("−x"), up 2 ("+y") → Quadrant II.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_4', difficulty: 'standard',
          question: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'Students often write \\(\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} = (x_2-x_1) + (y_2-y_1)\\), incorrectly distributing the square.',
          parts: [
                { id: 'a', prompt: 'State the distance formula between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian plane.', answer: 'The distance formula is \\(PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)',
                  options: ['The distance formula is \\(PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)', 'distances add linearly'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and c9_math_ch1_2.',
                  misconception: 'Students often write \\(\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} = (x_2-x_1) + (y_2-y_1)\\), incorrectly distributing the square root over addition.' },
                { id: 'b', prompt: 'Explain why the distance formula uses \\((x_2 - x_1)^2 + (y_2 - y_1)^2\\) instead of \\((x_1 - x_2)^2 + (y_1 - y_2)^2\\), and why we do not need absolute value.', answer: 'Because \\((x_2 - x_1)^2 = (x_1 - x_2)^2\\) and \\((y_2 - y_1)^2 = (y_1 - y_2)^2\\)',
                  options: ['Because \\((x_2 - x_1)^2 = (x_1 - x_2)^2\\) and \\((y_2 - y_1)^2 = (y_1 - y_2)^2\\)', 'we always subtract smaller from larger'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and c9_math_ch1_2.',
                  misconception: 'Students often write \\(\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} = (x_2-x_1) + (y_2-y_1)\\), incorrectly distributing the square root over addition.' }
          ],
            remediations: { 'students-often-write-sqrt-x': { steps: ['Draw a right triangle on grid paper with legs 3 and 4.', 'Ask the student to measure the hypotenuse with a ruler (it\'s 5).', 'Then show the calculation: \\(\\sqrt{3^2+4^2} = \\sqrt{9+16} = \\sqrt{25} = 5\\).', 'Emphasise: "The square root of a sum is NOT the sum of square roots." Practise with Pythagorean triples (3,4,5).'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
