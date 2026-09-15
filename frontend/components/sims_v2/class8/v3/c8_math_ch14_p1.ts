import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch14_p1: SimDef = {
    id: 'v3_c8_math_ch14_p1',
    title: 'Area · Part 1/2',
    subtitle: 'Counting squares, catching unit traps',
    classLevel: 8, subject: 'mathematics', topic: 'Area · Part 1/2',
    chapters: ['c8_math_ch14'],
    nodeIds: ['c8_math_ch14_1', 'c8_math_ch14_10', 'c8_math_ch14_2', 'c8_math_ch14_3', 'c8_math_ch14_4', 'c8_math_ch14_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a flooring contractor', intro: 'Tiles are sold by the square metre and mistakes are sold by the thousand. Master l × w with decimals, fractions and variables — and never mix your units.', goal: 'Apply the rectangle area formula A = l × w across whole numbers, decimals, fractions and algebraic sides — always converting to common units first.' },
    discovery: {
        question: 'Ravi finds the area of a 5 m × 300 cm rectangle: 5 × 300 = 1500 m². Spot the disaster.',
        options: ['He multiplied metres by centimetres — convert first: 5 m × 3 m = 15 m²', 'Nothing — 1500 m² is correct', 'He should have added the sides instead', 'He forgot to divide by 2'],
        answer: 'He multiplied metres by centimetres — convert first: 5 m × 3 m = 15 m²',
        hook: 'Area is a count of unit squares — 4 rows of 3 tiles is why 4 × 3 = 12 cm². But the formula only speaks one unit at a time: mix metres with centimetres and your answer inflates a hundredfold.',
    },
    teaching: [
        { title: 'Area of a Rectangle: length x width', text: 'The area of a rectangle is the measure of the two-dimensional space enclosed within its four sides, calculated by multiplying its length (the longer side) by its width (the shorter side), provided.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch14_1', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Tile the world: compute areas with decimals (4.5 m × 3.2 m), fractions (¾ m × 2.5 m) and even algebra ((2x+3) by (x−1)) — then hunt the unit-mismatch bug before it ruins a floor order.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_1', title: 'Area of a Rectangle: length x width',
          scaffold: { problem: 'A rectangular classroom floor is 8.4 metres long and 6.5 metres wide. The school wants to cover it with square tiles of side 0.5 m.',
            steps: [
            { text: 'Identify given values: length = 8.4 m, width = 6.5 m, tile side = 0.5 m. We need number of tiles.' },
            { text: 'Find area of floor using A = l × w. Area_floor = 8.4 × 6.5.' },
            { text: 'Compute 8.4 × 6.5: ignore decimals → 84 × 65 = 5460. Two decimal places total → 54.60 m².' },
            { text: 'Find area of one tile: 0.5 × 0.5 = 0.25 m².' },
            { text: 'Divide floor area by tile area: 54.60 ÷ 0.25 = 5460 ÷ 25 = 218.4.' },
            { text: 'Answer: 218.4 tiles, so at least 219 tiles needed if cutting allowed; but with no cutting, the floor cannot be exactly.', faded: true, blankAnswer: '219 tiles (if cutting allowed to cover exactly); or 208.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_10', title: 'Area of Polygons by Decomposition into Triangles and Rectangles',
          scaffold: { problem: 'A farmer\'s field is in the shape of a pentagon ABCDE. It can be divided into a rectangle ABDE of length 25 m and breadth 18 m, and.',
            steps: [
            { text: 'Identify the two component shapes: rectangle ABDE and triangle BCD.' },
            { text: 'Write the area formulas: Area_rectangle = length × breadth; Area_triangle = ½ × base × height.' },
            { text: 'Substitute values for rectangle: Area_rectangle = 25 m × 18 m = 450 m².' },
            { text: 'Substitute values for triangle: Area_triangle = ½ × 25 m × 10 m = 125 m².' },
            { text: 'Add the areas: Total area = 450 m² + 125 m² = 575 m².', faded: true, blankAnswer: '575 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_2', title: 'Area of a Triangle: Half of Rectangle Area',
          scaffold: { problem: 'A triangular traffic sign board has a base of 60 cm and a perpendicular height of 40 cm.',
            steps: [
            { text: 'Identify the given values: base \\(b = 60\\) cm, height \\(h = 40\\) cm, cost = ₹15 per cm².' },
            { text: 'Recall the triangle area formula: \\(A = \\frac{1}{2} \\times b \\times h\\).' },
            { text: 'Substitute the values: \\(A = \\frac{1}{2} \\times 60 \\times 40\\).' },
            { text: 'Compute stepwise: \\(\\frac{1}{2} \\times 60 = 30\\), then \\(30 \\times 40 = 1200\\) cm².' },
            { text: 'Multiply area by cost per cm²: \\(1200 \\times 15 = ₹18,000\\).', faded: true, blankAnswer: '₹18,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_3', title: 'Area of a Parallelogram: Base x Height',
          scaffold: { problem: 'A parallelogram-shaped plot of land has a base of 24.5 metres. The perpendicular distance from this base to the opposite side is 18 metres.',
            steps: [
            { text: 'Identify given values: base (b) = 24.5 m, height (h) = 18 m. The cost rate is ₹75/m².' },
            { text: 'Recall the area formula for a parallelogram: Area = base × height (A = b × h).' },
            { text: 'Substitute the values: A = 24.5 × 18. Compute: 24.5 × 10 = 245, 24.5 × 8 = 196, sum = 441. So Area = 441 m².' },
            { text: 'Calculate total cost: Cost = Area × rate = 441 × 75. Compute: 441 × 75 = 441 × (3 × 25) = (441 × 3) × 25 = 1323 × 25.' },
            { text: 'State final answers with units: Area = 441 m², Total cost = ₹33,075.', faded: true, blankAnswer: 'Area = 441 m², Total cost = ₹33,075' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_4', title: 'Area of a Triangle from a Parallelogram',
          scaffold: { problem: 'A triangular traffic sign board has a base of 60 cm and a perpendicular height of 40 cm.',
            steps: [
            { text: 'Identify given values: base b = 60 cm, height h = 40 cm, rate = ₹15 per cm², two sides to paint.' },
            { text: 'Recall the formula derived from parallelogram: Area of one triangle = ½ × b × h.' },
            { text: 'Substitute values: Area = ½ × 60 cm × 40 cm = 30 cm × 40 cm = 1200 cm².' },
            { text: 'Total area to paint = 2 × 1200 cm² = 2400 cm². Total cost = 2400 × ₹15 = ₹36,000.' },
            { text: 'Verify: Parallelogram area would be 60×40=2400 cm²; triangle is half = 1200 cm². Two triangles = 2400 cm².', faded: true, blankAnswer: '₹36,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_5', title: 'Area of a Rhombus Using Diagonals: Half x d1 x d2',
          scaffold: { problem: 'A rhombus-shaped field has diagonals measuring 48 metres and 36 metres.',
            steps: [
            { text: 'Identify the given values: diagonal d₁ = 48 m, diagonal d₂ = 36 m, rate = ₹25 per m².' },
            { text: 'Recall the formula for area of a rhombus using diagonals: Area = ½ × d₁ × d₂.' },
            { text: 'Substitute the values: Area = ½ × 48 × 36.' },
            { text: 'Compute step by step: ½ × 48 = 24; then 24 × 36 = 864 m². (Alternatively: 48 × 36 = 1728; half of 1728 = 864 m²).' },
            { text: 'Calculate total cost: Cost = Area × Rate = 864 × 25 = ₹21,600.', faded: true, blankAnswer: '₹21,600' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch14_5', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch14_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Ordering a banner for the school gate, Rohan measures the space as 5 m long and 300 cm tall. He calculates the area as 5 × 300 = 1,500 m² and emails the printer for a quote on fifteen hundred square metres of vinyl.',
            decisions: [{ prompt: 'What mistake is in the order?', options: [
                { text: 'He multiplied metres by centimetres — both sides must share a unit first. Converting 300 cm to 3 m gives 5 × 3 = 15 m²; his figure is a hundred times too big and would buy a small wall\'s worth of vinyl for the price of a billboard.', outcome: 'This enforces unit consistency before multiplying — area is only meaningful when length and width are in the same unit.' },
                { text: 'The order is fine — multiplication works on any units since area is just length times width.', outcome: 'The formula needs compatible units; \'5 m × 300 cm\' does not produce m², and 1,500 m² would cover a parking lot.', reveals: 'mixed-units-ok' },
                { text: 'The error is using the area formula at all — banners are measured by perimeter, so he needed 5 + 300 = 305 m.', outcome: 'Covering a surface is an area problem; and perimeter too requires matching units — it would be 5 + 3 = 8 m either way.', reveals: 'area-is-perimeter' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch14_5', title: 'The bigger picture',
          caseStudy: { intro: 'Area = length × width because you\'re counting rows of little squares. The formula never changes — but both sides must speak the same unit, or the maths lies.',
            decisions: [{ prompt: 'What comes next? Area · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Area · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch14_1', difficulty: 'standard',
          question: 'The area of a rectangle is the measure of the two-dimensional space enclosed.',
          hint: 'If stuck, revisit decimal multiplication (c7_math_ch03_008) and metric unit conversion.',
          misconception: 'Students often multiply length and width given in different units (e.g., metres and centimetres) without converting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the measure of the two-dimensional space enclosed within its',
                  options: ['The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'The area of any polygon can be determined by partitioning it into a set of', 'The area of a triangle is exactly half the area of a rectangle that shares the same base', 'The area of a parallelogram is the product of its base length and the corresponding'],
                  hint: 'If stuck, revisit decimal multiplication (c7_math_ch03_008) and metric unit conversion.',
                  misconception: 'Students often multiply length and width given in different units (e.g., metres and centimetres) without converting, producing an answer.' }
          ],
            remediations: { 'students-often-multiply-length-and': { steps: ['When this error occurs, have the student write both measurements with units, then explicitly convert the smaller unit.', 'Show that \\( 2 \\text{ m} \\times 50 \\text{ cm} = 2 \\text{ m} \\times 0.5 \\text{ m} = 1 \\text{ m}^2 \\).', 'Then have them redo the problem by converting both to centimetres: \\( 200 \\text{ cm} \\times 50 \\text{ cm} = 10,000.', 'This dual-conversion cements the squared-unit concept.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_10', difficulty: 'standard',
          question: 'The area of any polygon can be determined by partitioning it into a set.',
          hint: 'Revisit c8_math_ch14_2 (Area of a Triangle) and practice identifying the perpendicular.',
          misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and.',
          parts: [
                { id: 'a', prompt: 'A hexagon is decomposed into 4 triangles by drawing diagonals from one vertex. Another student decomposes the same hexagon into 2 rectangles and 2 triangles.', answer: 'Yes, both methods will yield the identical total area',
                  options: ['Yes, both methods will yield the identical total area', 'no, because the shapes are different'],
                  hint: 'Revisit c8_math_ch14_2 (Area of a Triangle) and practice identifying the perpendicular height.',
                  misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and rectangle, then stall.' }
          ],
            remediations: { 'students-frequently-draw-a-diagonal': { steps: ['If a student creates a trapezoid, guide them to draw a perpendicular from one vertex of the trapezoid to the opposite.', 'If they use a side as height, have them physically place a set square or ruler to check perpendicularity: "Place your.', 'Now measure the straight-up distance to the opposite corner—that is the height." Practice identifying the perpendicular.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_2', difficulty: 'standard',
          question: 'The area of a triangle is exactly half the area of a rectangle that shares the.',
          hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition).',
          misconception: 'Students often use any side length as "height" instead of the perpendicular height.',
          parts: [
                { id: 'a', prompt: 'What is the formula for the area of a triangle in terms of its base \\(b\\) and height \\(h\\)?', answer: 'The formula is \\(\\text{Area} = \\frac{1}{2} \\times b \\times h\\)',
                  options: ['The formula is \\(\\text{Area} = \\frac{1}{2} \\times b \\times h\\)', 'half of rectangle', 'side length', 'perpendicular height'],
                  hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce.',
                  misconception: 'Students often use any side length as "height" instead of the perpendicular height.' },
                { id: 'b', prompt: 'Find the area of a triangle with base 14 cm and corresponding height 9 cm.', answer: 'Step 1: Write formula: \\(A = \\frac{1}{2} \\times b \\times h\\)',
                  options: ['Step 1: Write formula: \\(A = \\frac{1}{2} \\times b \\times h\\)', 'side length', 'perpendicular height'],
                  hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce.',
                  misconception: 'Students often use any side length as "height" instead of the perpendicular height.' },
                { id: 'c', prompt: 'Two triangles have the same base 12 cm. Triangle A has height 8 cm. Triangle B has height 5 cm but is obtuse, with the height drawn outside the triangle.', answer: 'Triangle A area = \\(\\frac{1}{2} \\times 12 \\times 8 = 48\\) cm²',
                  options: ['Triangle A area = \\(\\frac{1}{2} \\times 12 \\times 8 = 48\\) cm²', 'side length', 'perpendicular height', 'height must always lie inside the triangle'],
                  hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce.',
                  misconception: 'Students often use any side length as "height" instead of the perpendicular height.' }
          ],
            remediations: { 'students-often-use-any-side': { steps: ['If a student uses the wrong side as height, draw the triangle on grid paper.', 'Ask: "Which side is the base you chose?', 'Now drop a perpendicular from the opposite vertex to that base — measure that perpendicular.', 'That is the height." Then have them recompute with the correct height.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often use any side length as "height" instead of the perpendicular height.',
          parts: [
                { id: 'a', prompt: 'A student calculates the area of a triangle with base 10 m and height 4 m as follows: \\(10 \\times 4 = 40\\), then \\(40 \\div 2 = 20\\) m².', answer: 'Both methods are mathematically correct',
                  options: ['Both methods are mathematically correct', 'side length', 'perpendicular height'],
                  hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce.',
                  misconception: 'Students often use any side length as "height" instead of the perpendicular height.' },
                { id: 'b', prompt: 'Create a real-life problem (in an Indian context) where you need to find the area of a triangle, but the given measurements are the sides of a rectangle that.', answer: 'Example problem: "A rectangular garden plot is 15 m by 8 m',
                  options: ['Example problem: "A rectangular garden plot is 15 m by 8 m', 'side length', 'perpendicular height'],
                  hint: 'Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce.',
                  misconception: 'Students often use any side length as "height" instead of the perpendicular height.' }
          ],
            remediations: { 'students-often-use-any-side': { steps: ['If a student uses the wrong side as height, draw the triangle on grid paper.', 'Ask: "Which side is the base you chose?', 'Now drop a perpendicular from the opposite vertex to that base — measure that perpendicular.', 'That is the height." Then have them recompute with the correct height.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_3', difficulty: 'standard',
          question: 'The area of a parallelogram is the product of its base length and the.',
          hint: 'If stuck, revisit c7_math_ch14_009 (Constructing Perpendicular from a Point to a Line).',
          misconception: 'Students consistently use the length of the slanted side as the \'height\' in the formula A = b × h.',
          parts: [
                { id: 'a', prompt: 'Two parallelograms have the same base length of 10 cm. Parallelogram A has a height of 6 cm.', answer: 'Both parallelograms have area = 10 × 6 = 60 cm²',
                  options: ['Both parallelograms have area = 10 × 6 = 60 cm²', 'B has smaller area'],
                  hint: 'If stuck, revisit c7_math_ch14_009 (Constructing Perpendicular from a Point to a Line) to practice.',
                  misconception: 'Students consistently use the length of the slanted side as the \'height\' in the formula A = b × h.' }
          ],
            remediations: { 'students-consistently-use-the-length': { steps: ['Have the student physically cut out a parallelogram from grid paper.', 'Ask them to draw and cut along the perpendicular height, then rearrange the pieces into a rectangle.', 'Count the grid squares in both shapes to prove area is unchanged.', 'Then measure the rectangle\'s dimensions: the base stays the same, the new width is exactly the perpendicular height.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_4', difficulty: 'standard',
          question: 'The area of any triangle is exactly half the area of a parallelogram formed.',
          hint: 'Revisit c8_math_ch14_3 (Area of a Parallelogram) and practice drawing perpendicular.',
          misconception: 'Students consistently use the slant height (side length) instead of the perpendicular height when the triangle is not.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of any triangle is exactly half the area of a parallelogram formed by',
                  options: ['The area of any triangle is exactly half the area of a parallelogram formed by', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'The area of any polygon can be determined by partitioning it into a set of', 'The area of a triangle is exactly half the area of a rectangle that shares the same base'],
                  hint: 'Revisit c8_math_ch14_3 (Area of a Parallelogram) and practice drawing perpendicular heights for.',
                  misconception: 'Students consistently use the slant height (side length) instead of the perpendicular height when the triangle is not right-angled.' }
          ],
            remediations: { 'students-consistently-use-the-slant': { steps: ['Draw the triangle on grid paper.', 'Have the student trace the triangle, flip it, and join along the chosen base to form a parallelogram.', 'Ask: "What is the height of this parallelogram?" Measure the perpendicular distance between the two bases with a ruler.', 'Show that the slant side is longer.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_5', difficulty: 'standard',
          question: 'The area of a rhombus is equal to half the product of its two diagonals.',
          hint: 'Revisit c8_math_ch14_2 (Area of a Triangle: Half of Rectangle Area) and c6_math_ch07_074.',
          misconception: 'Students often confuse the diagonals with the sides of the rhombus.',
          parts: [
                { id: 'a', prompt: 'What is the formula for the area of a rhombus if its diagonals are 12 cm and 16 cm?', answer: 'Area = ½ × 12 × 16 cm²',
                  options: ['Area = ½ × 12 × 16 cm²', 'Area = 12 × 16', 'Area = ½ × (12+16)'],
                  hint: 'Revisit c8_math_ch14_2 (Area of a Triangle: Half of Rectangle Area) and c6_math_ch07_074.',
                  misconception: 'Students often confuse the diagonals with the sides of the rhombus.' }
          ],
            remediations: { 'students-often-confuse-the-diagonals': { steps: ['If a student uses side length instead of diagonals, draw a rhombus on grid paper with diagonals 6 and 8 (side = 5.', 'Have them count squares inside — they will get 24.', 'Next, have them compute side × side = 25 and side × height (height = 4.8) = 24.', 'Point out that side × height works only if height is known, but diagonals are often easier to measure.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
