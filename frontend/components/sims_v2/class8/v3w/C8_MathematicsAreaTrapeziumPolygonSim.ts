import type { SimDef } from '../../engine/types';
import C8_MathematicsAreaTrapeziumPolygonSim from '../../../simulations/c6_12/C8_MathematicsAreaTrapeziumPolygonSim';

/** v3 wrapped master — C8_MathematicsAreaTrapeziumPolygonSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsareatrapeziumpolygonsim: SimDef = {
    id: 'v3w_c8_mathematicsareatrapeziumpolygonsim',
    title: 'Area of a Triangle from a Parallelogram',
    subtitle: 'This node covers deriving the triangle area formula from the parallelogram area formula.',
    classLevel: 8, subject: 'mathematics', topic: 'Area of a Triangle from a Parallelogram',
    chapters: [],
    nodeIds: ['c8_math_ch14_4', 'c8_math_ch14_9', 'c8_math_ch14_1', 'c8_math_ch14_6', 'c8_math_ch14_10', 'c8_math_ch14_7', 'c8_math_ch14_8', 'c8_math_ch4_2', 'c8_math_ch4_12', 'c8_math_ch11_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are helping a tailor in Delhi cut triangular patches from a rectangular cloth of length 40 cm and.', goal: 'Master Area of a Triangle from a Parallelogram.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The area of any triangle is exactly half the.', text: 'The area of any triangle is exactly half the area of a parallelogram formed by duplicating the triangle and joining them along a corresponding side.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch14_4', title: 'The area of any triangle is exactly.',
          scaffold: { problem: 'A triangular traffic sign board has a base of 60 cm and a perpendicular height of 40 cm.',
            steps: [
            { text: 'Identify given values: base b = 60 cm, height h = 40 cm, rate = ₹15 per cm², two sides to paint.' },
            { text: 'Recall the formula derived from parallelogram: Area of one triangle = ½ × b × h.' },
            { text: 'Substitute values: Area = ½ × 60 cm × 40 cm = 30 cm × 40 cm = 1200 cm².' },
            { text: 'Total area to paint = 2 × 1200 cm² = 2400 cm². Total cost = 2400 × ₹15 = ₹36,000.' },
            { text: 'Verify: Parallelogram area would be 60×40=2400 cm²; triangle is half = 1200 cm². Two triangles = 2400 cm².', faded: true, blankAnswer: '₹36,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_9', title: 'The area of a compound shape is found.',
          scaffold: { problem: 'A rectangular playground in a school is 40 m long and 30 m wide. In the middle, there is a circular sand pit of radius 5 m.',
            steps: [
            { text: 'Identify the two shapes involved: the outer rectangle (whole playground) and the inner circle (sand pit) that is.' },
            { text: 'Write the formulas: Rectangle area = length × width; Circle area = π × radius².' },
            { text: 'Substitute the given values: Rectangle area = 40 × 30 = 1200 m². Circle area = 3.14 × 5² = 3.14 × 25 = 78.5 m².' },
            { text: 'Subtract to find the grass area: Grass area = 1200 − 78.5 = 1121.5 m².' },
            { text: 'Verify: The sand pit is small compared to the playground, so grass area should be slightly less than 1200 m².', faded: true, blankAnswer: '1121.5 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_1', title: 'The area of a rectangle is the measure.',
          scaffold: { problem: 'A rectangular classroom floor is 8.4 metres long and 6.5 metres wide. The school wants to cover it with square tiles of side 0.5 m.',
            steps: [
            { text: 'Identify given values: length = 8.4 m, width = 6.5 m, tile side = 0.5 m. We need number of tiles.' },
            { text: 'Find area of floor using A = l × w. Area_floor = 8.4 × 6.5.' },
            { text: 'Compute 8.4 × 6.5: ignore decimals → 84 × 65 = 5460. Two decimal places total → 54.60 m².' },
            { text: 'Find area of one tile: 0.5 × 0.5 = 0.25 m².' },
            { text: 'Divide floor area by tile area: 54.60 ÷ 0.25 = 5460 ÷ 25 = 218.4.' },
            { text: 'Answer: 218.4 tiles, so at least 219 tiles needed if cutting allowed; but with no cutting, the floor cannot be exactly.', faded: true, blankAnswer: '219 tiles (if cutting allowed to cover exactly); or 208.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_6', title: 'A trapezium is a quadrilateral with.',
          scaffold: { problem: 'A field is in the shape of a trapezium. Its parallel sides are 25 m and 35 m. The perpendicular distance between them is 12 m.',
            steps: [
            { text: 'Identify given values: a = 25 m, b = 35 m, h = 12 m. Rate = ₹50/m².' },
            { text: 'Write the trapezium area formula: Area = ½ × (a + b) × h.' },
            { text: 'Substitute: Area = ½ × (25 + 35) × 12 = ½ × 60 × 12.' },
            { text: 'Compute stepwise: ½ × 60 = 30; 30 × 12 = 360 m².' },
            { text: 'Calculate cost: Cost = Area × Rate = 360 × 50 = ₹18,000.', faded: true, blankAnswer: '₹18,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_10', title: 'The area of any polygon can be.',
          scaffold: { problem: 'A farmer\'s field is in the shape of a pentagon ABCDE. It can be divided into a rectangle ABDE of length 25 m and breadth 18 m, and a.',
            steps: [
            { text: 'Identify the two component shapes: rectangle ABDE and triangle BCD.' },
            { text: 'Write the area formulas: Area_rectangle = length × breadth; Area_triangle = ½ × base × height.' },
            { text: 'Substitute values for rectangle: Area_rectangle = 25 m × 18 m = 450 m².' },
            { text: 'Substitute values for triangle: Area_triangle = ½ × 25 m × 10 m = 125 m².' },
            { text: 'Add the areas: Total area = 450 m² + 125 m² = 575 m².', faded: true, blankAnswer: '575 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_7', title: 'Perimeter is the total length of the.',
          scaffold: { problem: 'A farmer has 100 metres of fencing wire. He wants to make a rectangular vegetable patch.',
            steps: [
            { text: 'Identify given: Total wire length = perimeter = 100 m. Design A: square. Design B: rectangle with length = 30 m.' },
            { text: 'For Design A (square), perimeter = 4 × side → side = 100/4 = 25 m. Area = side² = 25 × 25 = 625 m².' },
            { text: 'For Design B (rectangle), perimeter = 2(length + breadth) = 100 → length + breadth = 50.' },
            { text: 'Compare areas: Design A area = 625 m², Design B area = 600 m². Difference = 625 - 600 = 25 m².' },
            { text: 'Interpret: The square design gives 25 m² more planting area even though both use exactly 100 m of fencing.', faded: true, blankAnswer: 'Design A (square) gives 25 m² more area than Design B.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch14_9', title: 'Identify each idea',
          dissect: { specimen: 'Area of a Triangle from a Parallelogram', spots: [
            { id: 's1', label: 'The area of any triangle', prompt: 'Which idea is this? — The area of any triangle is exactly half the area of a parallelogram formed by.', answer: 'The area of any triangle', options: ['The area of any triangle', 'The area of a compound', 'The area of a rectangle', 'A trapezium is a quadrilateral'] },
            { id: 's2', label: 'The area of a compound', prompt: 'Which idea is this? — The area of a compound shape is found by decomposing it into simpler, non-overlapping.', answer: 'The area of a compound', options: ['The area of a compound', 'The area of any triangle', 'The area of a rectangle', 'A trapezium is a quadrilateral'] },
            { id: 's3', label: 'The area of a rectangle', prompt: 'Which idea is this? — The area of a rectangle is the measure of the two-dimensional space enclosed within its.', answer: 'The area of a rectangle', options: ['The area of a rectangle', 'The area of any triangle', 'The area of a compound', 'A trapezium is a quadrilateral'] },
            { id: 's4', label: 'A trapezium is a quadrilateral', prompt: 'Which idea is this? — A trapezium is a quadrilateral with exactly one pair of parallel sides.', answer: 'A trapezium is a quadrilateral', options: ['A trapezium is a quadrilateral', 'The area of any triangle', 'The area of a compound', 'The area of a rectangle'] },
            { id: 's5', label: 'The area of any polygon', prompt: 'Which idea is this? — The area of any polygon can be determined by partitioning it into a set of.', answer: 'The area of any polygon', options: ['The area of any polygon', 'The area of any triangle', 'The area of a compound', 'The area of a rectangle'] },
            { id: 's6', label: 'Perimeter is the total length', prompt: 'Which idea is this? — Perimeter is the total length of the boundary of a closed shape, while area is the.', answer: 'Perimeter is the total length', options: ['Perimeter is the total length', 'The area of any triangle', 'The area of a compound', 'The area of a rectangle'] }
          ] } }
    ],
    explore: { component: C8_MathematicsAreaTrapeziumPolygonSim, prompt: 'Explore the interactive — Area of a Triangle from a Parallelogram' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch14_4', difficulty: 'standard',
          question: 'The area of any triangle is exactly half the area of a parallelogram formed by.',
          hint: 'Revisit c8_math_ch14_3 (Area of a Parallelogram) and practice drawing perpendicular.',
          misconception: 'Students consistently use the slant height (side length) instead of the perpendicular height when the triangle is not.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of any triangle is exactly half the area of a parallelogram formed by',
                  options: ['The area of any triangle is exactly half the area of a parallelogram formed by', 'The area of a compound shape is found by decomposing it into simpler, non-overlapping', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'A trapezium is a quadrilateral with exactly one pair of parallel sides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently use the slant height (side length) instead of the perpendicular height when the triangle is not right-angled.' }
          ],
            remediations: { 'students-consistently-use-the-slant': { steps: ['Draw the triangle on grid paper.', 'Have the student trace the triangle, flip it, and join along the chosen base to form a parallelogram.', 'Ask: "What is the height of this parallelogram?" Measure the perpendicular distance between the two bases with a ruler.', 'Show that the slant side is longer.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_9', difficulty: 'standard',
          question: 'The area of a compound shape is found by decomposing it into simpler,.',
          hint: 'If stuck, revisit c8_math_ch14_1 through c8_math_ch14_6 for area formulas, and.',
          misconception: 'Students often misuse dimensions when a compound shape shares sides.',
          parts: [
                { id: 'a', prompt: 'Explain why, when finding the area of a rectangular sheet with a circular hole cut out, we subtract the circle\'s area from the rectangle\'s area instead of.', answer: 'The hole represents material that is *missing* from the original rectangle',
                  options: ['The hole represents material that is *missing* from the original rectangle', 'we subtract because the circle is inside'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often misuse dimensions when a compound shape shares sides.' }
          ],
            remediations: { 'students-often-misuse-dimensions-when': { steps: ['Have the student trace the compound shape on graph paper and shade each basic part with a different colour, ensuring no.', 'Ask them to write the dimensions *on each coloured part* directly from the diagram, not from the outer perimeter.', 'Practice the "cut-and-paste" method: physically cut out the compound shape, cut along the decomposition lines,.', 'Drill the rule: "Every small piece must have its own correct length and breadth.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_1', difficulty: 'standard',
          question: 'The area of a rectangle is the measure of the two-dimensional space enclosed.',
          hint: 'If stuck, revisit decimal multiplication (c7_math_ch03_008) and metric unit conversion.',
          misconception: 'Students often multiply length and width given in different units (e.g., metres and centimetres) without converting,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a rectangle is the measure of the two-dimensional space enclosed within its',
                  options: ['The area of a rectangle is the measure of the two-dimensional space enclosed within its', 'The area of any triangle is exactly half the area of a parallelogram formed by', 'The area of a compound shape is found by decomposing it into simpler, non-overlapping', 'A trapezium is a quadrilateral with exactly one pair of parallel sides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply length and width given in different units (e.g., metres and centimetres) without converting, producing an answer.' }
          ],
            remediations: { 'students-often-multiply-length-and': { steps: ['When this error occurs, have the student write both measurements with units, then explicitly convert the smaller unit.', 'Show that \\( 2 \\text{ m} \\times 50 \\text{ cm} = 2 \\text{ m} \\times 0.5 \\text{ m} = 1 \\text{ m}^2 \\).', 'Then have them redo the problem by converting both to centimetres: \\( 200 \\text{ cm} \\times 50 \\text{ cm} = 10,000.', 'This dual-conversion cements the squared-unit concept.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_6', difficulty: 'standard',
          question: 'A trapezium is a quadrilateral with exactly one pair of parallel sides.',
          hint: 'Revisit c8_math_ch14_3 (parallelogram area) and the "two trapeziums make a parallelogram".',
          misconception: 'Students often confuse the height with the slanted side length.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A trapezium is a quadrilateral with exactly one pair of parallel sides',
                  options: ['A trapezium is a quadrilateral with exactly one pair of parallel sides', 'The area of any triangle is exactly half the area of a parallelogram formed by', 'The area of a compound shape is found by decomposing it into simpler, non-overlapping', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the height with the slanted side length.' }
          ],
            remediations: { 'students-often-confuse-the-height': { steps: ['Draw a trapezium on grid paper.', 'Shade the perpendicular height with a dashed line and label it h.', 'Colour the slanted sides differently.', 'Ask: "If I tilt a book, does its height change?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_10', difficulty: 'standard',
          question: 'The area of any polygon can be determined by partitioning it into a set of.',
          hint: 'Revisit c8_math_ch14_2 (Area of a Triangle) and practice identifying the perpendicular.',
          misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and.',
          parts: [
                { id: 'a', prompt: 'A hexagon is decomposed into 4 triangles by drawing diagonals from one vertex. Another student decomposes the same hexagon into 2 rectangles and 2 triangles.', answer: 'Yes, both methods will yield the identical total area',
                  options: ['Yes, both methods will yield the identical total area', 'no, because the shapes are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and rectangle, then stall.' }
          ],
            remediations: { 'students-frequently-draw-a-diagonal': { steps: ['If a student creates a trapezoid, guide them to draw a perpendicular from one vertex of the trapezoid to the opposite.', 'If they use a side as height, have them physically place a set square or ruler to check perpendicularity: "Place your.', 'Now measure the straight-up distance to the opposite corner—that is the height." Practice identifying the perpendicular.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and.',
          parts: [
                { id: 'a', prompt: 'A hexagon is decomposed into 4 triangles by drawing diagonals from one vertex. Another student decomposes the same hexagon into 2 rectangles and 2 triangles.', answer: 'Yes, both methods will yield the identical total area',
                  options: ['Yes, both methods will yield the identical total area', 'no, because the shapes are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently draw a diagonal that creates a trapezoid or an irregular quadrilateral instead of a triangle and rectangle, then stall.' }
          ],
            remediations: { 'students-frequently-draw-a-diagonal': { steps: ['If a student creates a trapezoid, guide them to draw a perpendicular from one vertex of the trapezoid to the opposite.', 'If they use a side as height, have them physically place a set square or ruler to check perpendicularity: "Place your.', 'Now measure the straight-up distance to the opposite corner—that is the height." Practice identifying the perpendicular.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_7', difficulty: 'standard',
          question: 'Perimeter is the total length of the boundary of a closed shape, while area is.',
          hint: 'If stuck, revisit c6_math_ch08_087 (Area of Rectangles and Squares) and c6_math_ch08_088.',
          misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Perimeter is the total length of the boundary of a closed shape, while area is the',
                  options: ['Perimeter is the total length of the boundary of a closed shape, while area is the', 'The area of any triangle is exactly half the area of a parallelogram formed by', 'The area of a compound shape is found by decomposing it into simpler, non-overlapping', 'The area of a rectangle is the measure of the two-dimensional space enclosed within its'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter, they must have the same.' }
          ],
            remediations: { 'students-often-treat-perimeter-and': { steps: ['Have the student take a 24 cm string and form three different rectangles on grid paper: 6×6, 8×4, 10×2.', 'Count the squares inside each to find the area physically.', 'Record: 6×6 → 36 sq units, 8×4 → 32 sq units, 10×2 → 20 sq units.', 'Ask: "The string length didn\'t change, so why did the area change?" Guide them to see that the same boundary length can.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If you increase the perimeter of a shape, its area will always increase." Evaluate this statement with a counterexample or proof.', answer: 'The statement is false',
                  options: ['The statement is false', 'a direct proportional relationship between perimeter and area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat perimeter and area as directly linked: they assume that if two shapes have the same perimeter, they must have the same.' }
          ],
            remediations: { 'students-often-treat-perimeter-and': { steps: ['Have the student take a 24 cm string and form three different rectangles on grid paper: 6×6, 8×4, 10×2.', 'Count the squares inside each to find the area physically.', 'Record: 6×6 → 36 sq units, 8×4 → 32 sq units, 10×2 → 20 sq units.', 'Ask: "The string length didn\'t change, so why did the area change?" Guide them to see that the same boundary length can.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
