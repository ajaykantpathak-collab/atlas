import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch07_p1: SimDef = {
    id: 'v3_c10_math_ch07_p1',
    title: 'Coordinate Geometry · Part 1/2',
    subtitle: 'Give every point an address, then do geometry by arithmetic',
    classLevel: 10, subject: 'mathematics', topic: 'Coordinate Geometry · Part 1/2',
    chapters: ['c10_math_ch07'],
    nodeIds: ['c10_math_cbse_07_001', 'c10_math_cbse_07_002', 'c10_math_cbse_07_003', 'c10_math_cbse_07_004', 'c10_math_cbse_07_005', 'c10_math_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a map analyst working purely in numbers', intro: 'A map with no scale, no ruler, no compass — just coordinates. Your job is to measure distances, find exact division points, and prove a triangle is isosceles using nothing but x\'s and y\'s.', goal: 'Apply the distance, section and area formulas, and verify geometric properties of figures through coordinates.' },
    discovery: {
        question: 'Two cities sit at map coordinates (2, 3) and (7, 6). A friend measures the gap with a ruler and guesses \'about 6 cm.\' You get the exact answer without any ruler — just Pythagoras. What\'s the trick?',
        options: ['Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34', 'Add the x and y coordinates of both points together', 'Count grid squares diagonally between the cities', 'Distance between coordinates is impossible without measuring'],
        answer: 'Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34',
        hook: 'Coordinate geometry turns maps into algebra. Every distance formula is just Pythagoras wearing coordinates — subtract, square, add, root.',
    },
    teaching: [
        { title: 'Distance Formula: Derivation Using Pythagoras Theorem', text: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian plane is the length of the line segment joining them, derived by constructing a right-angled triangle with the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_07_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Turn a coordinate plane into a measuring lab: find distances between points, divide segments in exact ratios, and compute triangle areas — proving shapes are what you claim they are.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_001', title: 'Distance Formula: Derivation Using Pythagoras Theorem',
          scaffold: { problem: 'On a school sports field marked with a coordinate grid (1 unit = 1 metre), the flag post is at \\(F(2, 3)\\) and the water cooler is.',
            steps: [
            { text: 'Identify the given coordinates: \\(x_1 = 2, y_1 = 3\\) (flag post); \\(x_2 = 6, y_2 = 8\\) (water cooler).' },
            { text: 'Recall the distance formula derived from Pythagoras theorem: \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).' },
            { text: 'Substitute the values: \\(d = \\sqrt{(6 - 2)^2 + (8 - 3)^2}\\).' },
            { text: 'Simplify the differences: \\(d = \\sqrt{4^2 + 5^2} = \\sqrt{16 + 25}\\).' },
            { text: 'Add and take square root: \\(d = \\sqrt{41}\\) metres. Since 41 is prime, leave as \\(\\sqrt{41}\\) m.', faded: true, blankAnswer: '\\(\\sqrt{41}\\) metres (approximately 6.40 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_002', title: 'Distance Formula: Applications and Calculations',
          scaffold: { problem: 'A triangular park has vertices at A(2, 3), B(5, 7), and C(8, 3) on the city map where 1 unit = 100 metres.',
            steps: [
            { text: 'Identify the coordinates of the three vertices: A(2, 3), B(5, 7), C(8, 3).' },
            { text: 'Calculate AB: d = √[(5 - 2)² + (7 - 3)²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units.' },
            { text: 'Calculate BC: d = √[(8 - 5)² + (3 - 7)²] = √[3² + (-4)²] = √[9 + 16] = √25 = 5 units.' },
            { text: 'Calculate CA: d = √[(2 - 8)² + (3 - 3)²] = √[(-6)² + 0²] = √[36 + 0] = √36 = 6 units.' },
            { text: 'Perimeter = AB + BC + CA = 5 + 5 + 6 = 16 units. Since 1 unit = 100 m, perimeter = 16 × 100 = 1600 metres.' },
            { text: 'Triangle type: AB = BC = 5 units, CA = 6 units. Two sides equal → Isosceles triangle.', faded: true, blankAnswer: 'Perimeter = 1600 metres; Triangle is isosceles.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_003', title: 'Distance Between Points on the Same Axis (Horizontal/Vertical)',
          scaffold: { problem: 'A straight road runs east-west along the x-axis. The school gate is at point S(−15, 0) and the bus stop is at point B(25, 0).',
            steps: [
            { text: 'Identify that both points lie on the x-axis (y-coordinate = 0 for both).' },
            { text: 'Substitute x₁ = −15 (school gate), x₂ = 25 (bus stop). Distance SB = |25 − (−15)| = |25 + 15| = |40| = 40 metres.' },
            { text: 'The student returns halfway, so they cover 40/2 = 20 metres from the bus stop towards the school.' },
            { text: 'Distance of P from origin O(0,0): Since P is on x-axis, OP = |5 − 0| = 5 metres.' },
            { text: 'Verify: SP = |5 − (−15)| = 20 m (half of 40 m), PB = |25 − 5| = 20 m. Correct.', faded: true, blankAnswer: '(i) 40 m, (ii) (5, 0), (iii) 5 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_004', title: 'Section Formula: Internal Division of a Line Segment',
          scaffold: { problem: 'A telephone company wants to install a relay tower P on the straight line between two existing towers A(2, 3) and B(14, 15) such that the.',
            steps: [
            { text: 'Identify given points A(2,3) and B(14,15). The ratio AP:PB = 3:1, so m = 3, n = 1.' },
            { text: 'Write the internal section formula: x = (mx₂ + nx₁)/(m+n), y = (my₂ + ny₁)/(m+n).' },
            { text: 'Substitute values: x = (3×14 + 1×2)/(3+1) = (42+2)/4 = 44/4 = 11; y = (3×15 + 1×3)/4 = (45+3)/4 = 48/4 = 12.' },
            { text: 'Verify: AP distance = √((11-2)²+(12-3)²) = √(81+81) = √162 = 9√2; PB distance = √((14-11)²+(15-12)²) = √(9+9) = √18.' },
            { text: 'Interpret: The relay tower should be placed at coordinates (11, 12) on the map grid.', faded: true, blankAnswer: 'P(11, 12)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_005', title: 'Section Formula: Finding the Midpoint',
          scaffold: { problem: 'The endpoints of a diameter of a circular park are A(3, -4) and B(-5, 6).',
            steps: [
            { text: 'Identify the given information. Endpoints of diameter: A(3, -4) and B(-5, 6).' },
            { text: 'Write the midpoint formula: Centre (h, k) = ((x₁ + x₂)/2, (y₁ + y₂)/2).' },
            { text: 'Substitute the coordinates: h = (3 + (-5))/2, k = (-4 + 6)/2.' },
            { text: 'Simplify: h = (-2)/2 = -1; k = (2)/2 = 1.' },
            { text: 'State the answer with units: The fountain should be placed at (-1, 1) metres from the origin (park gate reference).', faded: true, blankAnswer: 'Centre = (-1, 1) metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_006', title: 'Section Formula: Applications in Real Problems',
          scaffold: { problem: 'A straight highway connects City A at (10, 20) and City B at (40, 50) on a state map (coordinates in km).',
            steps: [
            { text: 'Identify the given data. A(10, 20), B(40, 50). The rest stop is 3/7 of the way from A to B.' },
            { text: 'Write the section formula for internal division: x = (m x₂ + n x₁)/(m+n), y = (m y₂ + n y₁)/(m+n).' },
            { text: 'Substitute the values: x = (3×40 + 4×10)/(3+4) = (120 + 40)/7 = 160/7. y = (3×50 + 4×20)/7 = (150 + 80)/7 = 230/7.' },
            { text: 'Simplify the coordinates: x = 160/7 ≈ 22.857 km, y = 230/7 ≈ 32.857 km. Keep as fractions for exactness: (160/7, 230/7).' },
            { text: 'Verify by checking the ratio using distances or the other coordinate.', faded: true, blankAnswer: '(160/7, 230/7) or approximately (22.86, 32.86) km' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_07_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On the school\'s gridded sports field, a student must run straight from a flag post at one grid point to a water cooler 3 squares east and 4 squares north. He calculates the distance as \'3 + 4 = 7 squares\' and wonders why the straight path looks shorter.',
            decisions: [{ prompt: 'What is the actual straight-line distance, and why isn\'t it 7?', options: [
                { text: 'Five squares — the run is the hypotenuse of a right triangle whose legs are 3 and 4, so the distance formula gives √(3² + 4²) = √25 = 5. Adding the legs counts the corner-cutting walk along the grid edges, which is always longer than the direct diagonal — that is why the formula squares and roots instead of adding.', outcome: 'The distance formula is Pythagoras on a grid: horizontal and vertical gaps combine as squares because the direct path is the hypotenuse, never the sum of the legs.' },
                { text: 'He is right — distance is just total horizontal plus total vertical, so 3 + 4 = 7 squares.', outcome: 'That sum describes a path that walks right then up, not the straight line — the diagonal of a 3-4-5 triangle is 5, which is visibly shorter.', reveals: 'distance-is-sum' },
                { text: 'The distance is 3 × 4 = 12 squares, since distance equals area covered.', outcome: 'Multiplying the legs gives the rectangle\'s area, not the length of the diagonal — the distance formula uses squares added under a root, not the product.', reveals: 'distance-equals-area' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Descartes\' grid let geometry and algebra finally talk. Any question about lengths, midpoints or areas becomes arithmetic once the points have addresses.',
            decisions: [{ prompt: 'What comes next? Coordinate Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coordinate Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_07_001', difficulty: 'standard',
          question: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'The most frequent board exam error is writing the distance as \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = (x_2 - x_1).',
          parts: [
                { id: 'a', prompt: 'Find the distance between the points \\(A(-3, 4)\\) and \\(B(1, -2)\\). Show all steps including substitution, squaring, addition, and square root.', answer: 'Step 1: Identify coordinates: \\(x_1 = -3, y_1 = 4, x_2 = 1, y_2 = -2\\)',
                  options: ['Step 1: Identify coordinates: \\(x_1 = -3, y_1 = 4, x_2 = 1, y_2 = -2\\)', 'squaring a negative gives a negative'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and c9_math_ch1_2.',
                  misconception: 'The most frequent board exam error is writing the distance as \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = (x_2 - x_1) + (y_2 - y_1)\\).' },
                { id: 'b', prompt: 'A student derives the distance formula but writes the horizontal leg as \\((x_1 - x_2)\\) and vertical leg as \\((y_1 - y_2)\\) without absolute values.', answer: 'Error 1: The leg lengths are distances, so they must be non-negative',
                  options: ['Error 1: The leg lengths are distances, so they must be non-negative', 'missing squares', 'only points out "missing squares" misses the sign issue'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and c9_math_ch1_2.',
                  misconception: 'The most frequent board exam error is writing the distance as \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = (x_2 - x_1) + (y_2 - y_1)\\).' }
          ],
            remediations: { 'the-most-frequent-board-exam': { steps: ['Revisit the Pythagoras theorem visually: draw a 3-4-5 right triangle on graph paper, measure the hypotenuse, confirm.', 'Practice the "square root of sum is NOT sum of square roots" with numerical examples: \\(\\sqrt{9+16} \\neq.', 'Drill the definition: "Distance is the length of the segment, always \\(\\ge 0\\).', 'The symbol \\(\\sqrt{\\cdot}\\) means the principal (non-negative) square root." 4.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_002', difficulty: 'standard',
          question: 'The distance formula calculates the straight-line distance between two points.',
          hint: 'If stuck, revisit c7_math_ch10_003 (subtraction of integers with negative numbers) and.',
          misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2.',
          parts: [
                { id: 'a', prompt: 'Explain why the distance formula gives the same result regardless of which point you label as (x₁, y₁) and which as (x₂, y₂).', answer: 'The formula uses squares of differences: (x₂ - x₁)² = (x₁ - x₂)²',
                  options: ['The formula uses squares of differences: (x₂ - x₁)² = (x₁ - x₂)²', 'order matters because subtraction is not commutative'],
                  hint: 'If stuck, revisit c7_math_ch10_003 (subtraction of integers with negative numbers) and.',
                  misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2 instead of 2 - (-4).' }
          ],
            remediations: { 'students-consistently-make-sign-errors': { steps: ['Have the student practice "subtracting negatives" drills: 5 - (-3), -2 - (-7), -4 - 6, etc., using number line.', 'For the squaring error, make them expand (x - 2)² explicitly as (x - 2)(x - 2) = x² - 4x + 4 before substituting into.', 'For the ±√ error, ask: "Can a length be -5 cm?" Then show √25 = 5 (principal root) vs x² = 25 → x = ±5.', 'Give 5 mixed practice problems with negative coordinates and unknown coordinate finding, requiring them to write the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2.',
          parts: [
                { id: 'a', prompt: 'A student solved: "Find the distance between A(-4, -3) and B(2, 5)." Their working: d = √[(2 - (-4))² + (5 - (-3))²] = √[(2+4)² + (5+3)²] = √[6² + 8²] = √[36.', answer: 'The student\'s calculation is correct until the final step',
                  options: ['The student\'s calculation is correct until the final step', 'incorrect interpretation of square root symbol'],
                  hint: 'If stuck, revisit c7_math_ch10_003 (subtraction of integers with negative numbers) and.',
                  misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2 instead of 2 - (-4).' }
          ],
            remediations: { 'students-consistently-make-sign-errors': { steps: ['Have the student practice "subtracting negatives" drills: 5 - (-3), -2 - (-7), -4 - 6, etc., using number line.', 'For the squaring error, make them expand (x - 2)² explicitly as (x - 2)(x - 2) = x² - 4x + 4 before substituting into.', 'For the ±√ error, ask: "Can a length be -5 cm?" Then show √25 = 5 (principal root) vs x² = 25 → x = ±5.', 'Give 5 mixed practice problems with negative coordinates and unknown coordinate finding, requiring them to write the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_003', difficulty: 'standard',
          question: 'The distance between two points lying on the same axis (x-axis or y-axis).',
          hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) for |a−b| practice and.',
          misconception: 'Students incorrectly apply the simplified axis-distance formula |x₂−x₁| or |y₂−y₁| to points where only ONE point lies.',
          parts: [
                { id: 'a', prompt: 'What is the distance between point A(7, 0) and point B(−3, 0)? Write the formula you use and the final answer.', answer: 'Distance = |x₂ − x₁| = |−3 − 7| = |−10| = 10 units',
                  options: ['Distance = |x₂ − x₁| = |−3 − 7| = |−10| = 10 units', 'same axis', 'line parallel to axis'],
                  hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) for |a−b| practice and.',
                  misconception: 'Students incorrectly apply the simplified axis-distance formula |x₂−x₁| or |y₂−y₁| to points where only ONE point lies on an axis (e.g.' },
                { id: 'b', prompt: 'Explain why the distance between P(0, −6) and Q(0, 2) is 8 units, not 4 units. Use the distance formula to justify your answer.', answer: 'Using distance formula: √[(0−0)² + (2 − (−6))²] = √[0 + (8)²] = 8',
                  options: ['Using distance formula: √[(0−0)² + (2 − (−6))²] = √[0 + (8)²] = 8', 'same axis', 'line parallel to axis'],
                  hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) for |a−b| practice and.',
                  misconception: 'Students incorrectly apply the simplified axis-distance formula |x₂−x₁| or |y₂−y₁| to points where only ONE point lies on an axis (e.g.' },
                { id: 'c', prompt: 'Find the distance between R(−4, 0) and S(0, −4). Can you use the simplified axis-distance method here?', answer: 'No, the simplified method does NOT apply',
                  options: ['No, the simplified method does NOT apply', 'same axis', 'line parallel to axis'],
                  hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) for |a−b| practice and.',
                  misconception: 'Students incorrectly apply the simplified axis-distance formula |x₂−x₁| or |y₂−y₁| to points where only ONE point lies on an axis (e.g.' },
                { id: 'd', prompt: 'Points A(a, 0) and B(0, b) are on the x-axis and y-axis respectively. Point C is on the x-axis such that AC = 3 units and C lies to the right of A.', answer: 'Since C is on x-axis, its coordinates are (c, 0)',
                  options: ['Since C is on x-axis, its coordinates are (c, 0)', 'same axis', 'line parallel to axis'],
                  hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) for |a−b| practice and.',
                  misconception: 'Students incorrectly apply the simplified axis-distance formula |x₂−x₁| or |y₂−y₁| to points where only ONE point lies on an axis (e.g.' }
          ],
            remediations: { 'students-incorrectly-apply-the-simplified': { steps: ['Ask the student to plot both points on graph paper.', 'Have them identify if both points lie on the x-axis (y=0 for both) or y-axis (x=0 for both).', 'If yes, use |difference of non-zero coordinates|. If no, write the full distance formula √[(x₂−x₁)²+(y₂−y₁)²].', 'Practice 5 pairs: (a) (−2,0) & (5,0) — valid, (b) (0,−3) & (0,7) — valid, (c) (3,0) & (0,4) — invalid, different axes.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_004', difficulty: 'standard',
          question: 'The section formula for internal division states that if a point P(x, y).',
          hint: 'Review the concept of weighted average from Class 8 (c8_math_ch7_6) and solving linear.',
          misconception: 'The most common board exam error is swapping the weights m and n in the formula: students write x = (mx₁ + nx₂)/(m+n).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for internal division states that if a point P(x, y) divides the line',
                  options: ['The section formula for internal division states that if a point P(x, y) divides the line', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The distance formula calculates the straight-line distance between two points P(x₁, y₁)', 'The distance between two points lying on the same axis (x-axis or y-axis) is the absolute'],
                  hint: 'Review the concept of weighted average from Class 8 (c8_math_ch7_6) and solving linear equations.',
                  misconception: 'The most common board exam error is swapping the weights m and n in the formula: students write x = (mx₁ + nx₂)/(m+n) instead of x = (mx₂.' }
          ],
            remediations: { 'the-most-common-board-exam': { steps: ['Draw a diagram with A on left, B on right, P between them. Label AP = m units, PB = n units.', 'Explain that the x-coordinate of P is a weighted average: x = (weight_B·x_B + weight_A·x_A)/(total weight).', 'Practice with a simple example: A(0,0), B(10,0), ratio 1:3. Ask: "Is P closer to A or B?" (A, because AP=1, PB=3).', 'Give 3 drill problems with ratio order varied (2:1, 1:2, 3:2, 2:3) and have student say "weight for B is first number.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_005', difficulty: 'standard',
          question: 'The midpoint of a line segment joining two points A(x₁, y₁) and B(x₂, y₂).',
          hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
          misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁.',
          parts: [
                { id: 'a', prompt: 'State the midpoint formula for the line segment joining points P(x₁, y₁) and Q(x₂, y₂). Explain in one sentence what the formula calculates.', answer: 'The midpoint formula is M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
                  options: ['The midpoint formula is M = ((x₁ + x₂)/2, (y₁ + y₂)/2)', 'distance from origin'],
                  hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' },
                { id: 'b', prompt: 'The midpoint of segment AB is M(4, -2). If A has coordinates (6, 0), a student calculates B as (2, -4) by doing (6 - 4, 0 - (-2)). Is this correct?', answer: 'No, the student\'s method is incorrect',
                  options: ['No, the student\'s method is incorrect', 'distance from origin'],
                  hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' },
                { id: 'c', prompt: 'Find the midpoint of the line segment joining the points A(-3, 5) and B(7, -9). Show all steps.', answer: 'Step 1: Identify coordinates: x₁ = -3, y₁ = 5',
                  options: ['Step 1: Identify coordinates: x₁ = -3, y₁ = 5', 'distance from origin'],
                  hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' },
                { id: 'd', prompt: 'Points A(2, 3), B(6, 7), C(8, 3), and D(4, -1) form a quadrilateral.', answer: 'Find midpoints of diagonals AC and BD',
                  options: ['Find midpoints of diagonals AC and BD', 'diagonals of a parallelogram bisect each other', 'distance from origin'],
                  hint: 'If stuck, revisit c9_math_ch1_8 (Midpoint Formula: Special Case of Section Formula) and.',
                  misconception: 'Students often treat the midpoint formula as (x₂ - x₁)/2, (y₂ - y₁)/2 (i.e., half the difference) instead of (x₁ + x₂)/2, (y₁ + y₂)/2 (half.' }
          ],
            remediations: { 'students-often-treat-the-midpoint': { steps: ['If a student makes the "half-difference" error, do the following: 1) Draw a number line, mark points at 2 and 6.', 'Ask: "What number is exactly halfway?" They will say 4.', 'Show that (2+6)/2 = 4, while (6-2)/2 = 2.', '2) Extend to 2D: plot A(2,3) and B(6,7) on graph paper.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_006', difficulty: 'standard',
          question: 'The section formula for internal division states that if a point P(x, y).',
          hint: 'If stuck, revisit c10_math_cbse_07_004 (Section Formula: Internal Division) for formula.',
          misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first.',
          parts: [
                { id: 'a', prompt: 'State the section formula for internal division. If point P divides AB in the ratio m:n, what are the coordinates of P in terms of A(x₁, y₁) and B(x₂, y₂)?', answer: 'The coordinates are P((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n))',
                  options: ['The coordinates are P((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n))', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'If stuck, revisit c10_math_cbse_07_004 (Section Formula: Internal Division) for formula derivation.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' },
                { id: 'b', prompt: 'A student is asked: "Find the coordinates of the point that divides the segment joining (2, 3) and (8, 7) in the ratio 1:2." The student writes: x = (1×2.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'If stuck, revisit c10_math_cbse_07_004 (Section Formula: Internal Division) for formula derivation.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' },
                { id: 'c', prompt: 'Find the coordinates of the point that divides the line segment joining A(−4, 5) and B(6, −3) internally in the ratio 2:3.', answer: 'Given A(−4,5), B(6,−3), ratio m:n = 2:3',
                  options: ['Given A(−4,5), B(6,−3), ratio m:n = 2:3', 'ratio m:n', '"ratio m:n" means the first number multiplies the first point\'s coordinates'],
                  hint: 'If stuck, revisit c10_math_cbse_07_004 (Section Formula: Internal Division) for formula derivation.',
                  misconception: 'Students often confuse the order of the ratio: they think "ratio m:n" means the first number multiplies the first point\'s coordinates.' }
          ],
            remediations: { 'students-often-confuse-the-order': { steps: ['If a student makes the ratio-order error, do the following: 1) Draw a number line with points 0 and 10.', 'Ask: "Where is the point that divides 0 to 10 in ratio 1:4?" The answer is 2 (since 1 part out of 5 from 0).', 'Show that the weight of 10 is 1 and weight of 0 is 4.', '2) Write the formula with color coding: x = (m·x₂ + n·x₁)/(m+n).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
