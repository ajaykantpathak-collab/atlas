import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch14_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch14_p2: SimDef = {
    id: 'v3_c8_math_ch14_p2',
    title: 'Area · Part 2/2',
    subtitle: 'Counting squares, catching unit traps',
    classLevel: 8, subject: 'mathematics', topic: 'Area · Part 2/2',
    chapters: ['c8_math_ch14'],
    nodeIds: ['c8_math_ch14_6', 'c8_math_ch14_7', 'c8_math_ch14_8', 'c8_math_ch14_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a flooring contractor', intro: 'Tiles are sold by the square metre and mistakes are sold by the thousand. Master l × w with decimals, fractions and variables — and never mix your units.', goal: 'Apply the rectangle area formula A = l × w across whole numbers, decimals, fractions and algebraic sides — always converting to common units first.' },
    discovery: {
        question: 'Ravi finds the area of a 5 m × 300 cm rectangle: 5 × 300 = 1500 m². Spot the disaster.',
        options: ['He multiplied metres by centimetres — convert first: 5 m × 3 m = 15 m²', 'Nothing — 1500 m² is correct', 'He should have added the sides instead', 'He forgot to divide by 2'],
        answer: 'He multiplied metres by centimetres — convert first: 5 m × 3 m = 15 m²',
        hook: 'Area is a count of unit squares — 4 rows of 3 tiles is why 4 × 3 = 12 cm². But the formula only speaks one unit at a time: mix metres with centimetres and your answer inflates a hundredfold.',
    },
    teaching: [
        { title: 'Area of a Trapezium: Half x (a + b) x h', text: 'A trapezium is a quadrilateral with exactly one pair of parallel sides.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch14_6', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Tile the world: compute areas with decimals (4.5 m × 3.2 m), fractions (¾ m × 2.5 m) and even algebra ((2x+3) by (x−1)) — then hunt the unit-mismatch bug before it ruins a floor order.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_6', title: 'Area of a Trapezium: Half x (a + b) x h',
          scaffold: { problem: 'A field is in the shape of a trapezium. Its parallel sides are 25 m and 35 m. The perpendicular distance between them is 12 m.',
            steps: [
            { text: 'Identify given values: a = 25 m, b = 35 m, h = 12 m. Rate = ₹50/m².' },
            { text: 'Write the trapezium area formula: Area = ½ × (a + b) × h.' },
            { text: 'Substitute: Area = ½ × (25 + 35) × 12 = ½ × 60 × 12.' },
            { text: 'Compute stepwise: ½ × 60 = 30; 30 × 12 = 360 m².' },
            { text: 'Calculate cost: Cost = Area × Rate = 360 × 50 = ₹18,000.', faded: true, blankAnswer: '₹18,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_8', title: 'Area of Irregular Shapes Using Grid Counting',
          scaffold: { problem: 'Riya traces a mango leaf on 1 cm graph paper for her biology project.',
            steps: [
            { text: 'Identify the given counts: Full (F) = 24, Half (H) = 10, More than half (M) = 6, Less than half (L) = 12 (ignored).' },
            { text: 'Recall the estimation formula: Area = F + 0.5H + M.' },
            { text: 'Substitute the values: Area = 24 + 0.5(10) + 6.' },
            { text: 'Compute stepwise: 0.5 × 10 = 5; then 24 + 5 = 29; then 29 + 6 = 35.' },
            { text: 'State the answer with units: The leaf\'s estimated area is 35 cm².', faded: true, blankAnswer: '35 cm²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_9', title: 'Area of Compound Shapes: Adding and Subtracting Areas',
          scaffold: { problem: 'A rectangular playground in a school is 40 m long and 30 m wide. In the middle, there is a circular sand pit of radius 5 m.',
            steps: [
            { text: 'Identify the two shapes involved: the outer rectangle (whole playground) and the inner circle (sand pit) that.' },
            { text: 'Write the formulas: Rectangle area = length × width; Circle area = π × radius².' },
            { text: 'Substitute the given values: Rectangle area = 40 × 30 = 1200 m². Circle area = 3.14 × 5² = 3.14 × 25 = 78.5 m².' },
            { text: 'Subtract to find the grass area: Grass area = 1200 − 78.5 = 1121.5 m².' },
            { text: 'Verify: The sand pit is small compared to the playground, so grass area should be slightly less than 1200 m².', faded: true, blankAnswer: '1121.5 m²' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch14_9', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch14_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Ordering a banner for the school gate, Rohan measures the space as 5 m long and 300 cm tall. He calculates the area as 5 × 300 = 1,500 m² and emails the printer for a quote on fifteen hundred square metres of vinyl.',
            decisions: [{ prompt: 'What mistake is in the order?', options: [
                { text: 'He multiplied metres by centimetres — both sides must share a unit first. Converting 300 cm to 3 m gives 5 × 3 = 15 m²; his figure is a hundred times too big and would buy a small wall\'s worth of vinyl for the price of a billboard.', outcome: 'This enforces unit consistency before multiplying — area is only meaningful when length and width are in the same unit.' },
                { text: 'The order is fine — multiplication works on any units since area is just length times width.', outcome: 'The formula needs compatible units; \'5 m × 300 cm\' does not produce m², and 1,500 m² would cover a parking lot.', reveals: 'mixed-units-ok' },
                { text: 'The error is using the area formula at all — banners are measured by perimeter, so he needed 5 + 300 = 305 m.', outcome: 'Covering a surface is an area problem; and perimeter too requires matching units — it would be 5 + 3 = 8 m either way.', reveals: 'area-is-perimeter' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch14_9', title: 'You made it',
          caseStudy: { intro: 'Area = length × width because you\'re counting rows of little squares. The formula never changes — but both sides must speak the same unit, or the maths lies.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch14_6', difficulty: 'standard',
          question: 'A trapezium is a quadrilateral with exactly one pair of parallel sides.',
          hint: 'Revisit c8_math_ch14_3 (parallelogram area) and the "two trapeziums make a parallelogram".',
          misconception: 'Students often confuse the height with the slanted side length.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A trapezium is a quadrilateral with exactly one pair of parallel sides',
                  options: ['A trapezium is a quadrilateral with exactly one pair of parallel sides', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'The area of any polygon can be determined by partitioning it into a set of', 'The area of a triangle is exactly half the area of a rectangle that shares the same base'],
                  hint: 'Revisit c8_math_ch14_3 (parallelogram area) and the "two trapeziums make a parallelogram" visual.',
                  misconception: 'Students often confuse the height with the slanted side length.' }
          ],
            remediations: { 'students-often-confuse-the-height': { steps: ['Draw a trapezium on grid paper.', 'Shade the perpendicular height with a dashed line and label it h.', 'Colour the slanted sides differently.', 'Ask: "If I tilt a book, does its height change?'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_7', difficulty: 'standard',
          question: 'Perimeter is the total length of the boundary of a closed shape, while area.',
          hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c6_math_ch08_088.',
          misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Perimeter is the total length of the boundary of a closed shape, while area is the',
                  options: ['Perimeter is the total length of the boundary of a closed shape, while area is the', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'The area of any polygon can be determined by partitioning it into a set of', 'The area of a triangle is exactly half the area of a rectangle that shares the same base'],
                  hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c6_math_ch08_088 (Area.',
                  misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter, they must have the same.' }
          ],
            remediations: { 'students-often-treat-perimeter-and': { steps: ['Have the student take a 24 cm string and form three different rectangles on grid paper: 6×6, 8×4, 10×2.', 'Count the squares inside each to find the area physically.', 'Record: 6×6 → 36 sq units, 8×4 → 32 sq units, 10×2 → 20 sq units.', 'Ask: "The string length didn\'t change, so why did the area change?" Guide them to see that the same boundary length can.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If you increase the perimeter of a shape, its area will always increase." Evaluate this statement with a counterexample or proof.', answer: 'The statement is false',
                  options: ['The statement is false', 'a direct proportional relationship between perimeter and area'],
                  hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c6_math_ch08_088 (Area.',
                  misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter, they must have the same.' }
          ],
            remediations: { 'students-often-treat-perimeter-and': { steps: ['Have the student take a 24 cm string and form three different rectangles on grid paper: 6×6, 8×4, 10×2.', 'Count the squares inside each to find the area physically.', 'Record: 6×6 → 36 sq units, 8×4 → 32 sq units, 10×2 → 20 sq units.', 'Ask: "The string length didn\'t change, so why did the area change?" Guide them to see that the same boundary length can.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_8', difficulty: 'standard',
          question: 'The area of an irregular shape can be estimated by placing it on a square grid.',
          hint: 'Revisit c6_math_ch08_086 (Introduction to Area) and practice covering rectangles with.',
          misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.',
          parts: [
                { id: 'a', prompt: 'What is the standard convention for counting a square that is exactly half covered by an irregular shape on grid paper?', answer: 'A half-covered square counts as 0.5 square units',
                  options: ['A half-covered square counts as 0.5 square units', 'touching the boundary', 'covering area'],
                  hint: 'Revisit c6_math_ch08_086 (Introduction to Area) and practice covering rectangles with unit squares.',
                  misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.' },
                { id: 'b', prompt: 'On 1 cm grid paper, an irregular shape covers 18 full squares, 6 half squares, 7 squares more than half, and 9 squares less than half.', answer: 'Step 1: Full squares = 18 × 1 = 18 cm²',
                  options: ['Step 1: Full squares = 18 × 1 = 18 cm²', 'touching the boundary', 'covering area'],
                  hint: 'Revisit c6_math_ch08_086 (Introduction to Area) and practice covering rectangles with unit squares.',
                  misconception: 'Students count every square that the shape touches — even a tiny corner — as 1 full square.' }
          ],
            remediations: { 'students-count-every-square-that': { steps: ['Give the student a transparent 1 cm grid overlay and a rectangle of known area (e.g., 4 cm × 5 cm = 20 cm²).', 'Have them place the grid on the rectangle and count using the correct convention — they should get exactly 20.', 'Then place the same grid on an irregular shape and practice classifying each square aloud: "This is full, this is half.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_9', difficulty: 'standard',
          question: 'The area of a compound shape is found by decomposing it into simpler.',
          hint: 'If stuck, revisit c8_math_ch14_1 through c8_math_ch14_6 for area formulas, and.',
          misconception: 'Students often misuse dimensions when a compound shape shares sides.',
          parts: [
                { id: 'a', prompt: 'Explain why, when finding the area of a rectangular sheet with a circular hole cut out, we subtract the circle\'s area from the rectangle\'s area instead.', answer: 'The hole represents material that is *missing* from the original rectangle',
                  options: ['The hole represents material that is *missing* from the original rectangle', 'we subtract because the circle is inside'],
                  hint: 'If stuck, revisit c8_math_ch14_1 through c8_math_ch14_6 for area formulas, and c7_math_ch03_008/009.',
                  misconception: 'Students often misuse dimensions when a compound shape shares sides.' }
          ],
            remediations: { 'students-often-misuse-dimensions-when': { steps: ['Have the student trace the compound shape on graph paper and shade each basic part with a different colour, ensuring.', 'Ask them to write the dimensions *on each coloured part* directly from the diagram, not from the outer perimeter.', 'Practice the "cut-and-paste" method: physically cut out the compound shape, cut along the decomposition lines.', 'Drill the rule: "Every small piece must have its own correct length and breadth.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
