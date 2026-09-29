import type { SimDef } from '../../engine/types';
import C6_MathematicsPerimeterAndAreaSim from '../../../simulations/c6_12/C6_MathematicsPerimeterAndAreaSim';

/** v3 wrapped master — C6_MathematicsPerimeterAndAreaSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicsperimeterandareasim: SimDef = {
    id: 'v3w_c6_mathematicsperimeterandareasim',
    title: 'Introduction to Perimeter',
    subtitle: 'This node covers the perimeter of rectangles, squares, triangles, and simple polygons.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Perimeter',
    chapters: [],
    nodeIds: ['c6_math_ch08_085', 'c6_math_ch08_086', 'c6_math_ch08_090', 'c6_math_ch07_073', 'c6_math_ch08_087', 'c6_math_ch08_088', 'c6_math_ch08_092', 'c6_math_ch07_074', 'c6_math_ch07_077'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are asked to put a decorative lace around your rectangular notebook cover.', goal: 'Master Introduction to Perimeter.' },
    discovery: {
        question: 'If you have a wire of length 20 cm, why does bending it into different rectangular shapes change the area but keep the perimeter the same?',
        options: ['The perimeter remains constant', 'perimeter', 'area and perimeter are always linked proportionally'],
        answer: 'The perimeter remains constant',
        hook: 'Students often confuse "perimeter" and "area" because they both involve length and width.',
    },
    teaching: [
        { title: 'Perimeter is the total length of the.', text: 'Perimeter is the total length of the boundary surrounding a closed 2D shape. It represents the distance you would travel if you walked exactly once along the entire edge of a figure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch08_085', title: 'Perimeter is the total length of the.',
          scaffold: { problem: 'A rectangular park is 150 m long and 100 m wide. If a man walks around it twice, what is the total distance he covers?',
            steps: [
            { text: 'Identify the length (150 m) and width (100 m).' },
            { text: 'Calculate the perimeter of one round using P = 2(l + w).' },
            { text: 'P = 2(150 + 100) = 2(250) = 500 m.' },
            { text: 'Since he walks around twice, multiply the perimeter by 2.' },
            { text: 'Total distance = 500 m × 2 = 1000 m.', faded: true, blankAnswer: '1000 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_086', title: 'Area is the total measure of the flat.',
          scaffold: { problem: 'A rectangular vegetable patch in a school garden is 10 metres long and 5 metres wide. The gardener wants to cover the path with fertilizer.',
            steps: [
            { text: 'Identify dimensions: l = 10 m, w = 5 m.' },
            { text: 'Use the formula for Area: A = l × w.' },
            { text: 'Calculate total area: 10 m × 5 m = 50 m².' },
            { text: 'Determine bags needed: 50 m² / 2 m² per bag = 25 bags.' },
            { text: 'Conclusion: 25 bags are required to cover the patch.', faded: true, blankAnswer: '25 bags' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_090', title: 'A composite shape is a complex figure.',
          scaffold: { problem: 'A floor plan is made of a living room (6m x 4m) and a kitchen (3m x 2m) joined together. Find the total area.',
            steps: [
            { text: 'Identify the two shapes: a 6x4 rectangle and a 3x2 rectangle.' },
            { text: 'Calculate Area of living room: 6m × 4m = 24 sq m.' },
            { text: 'Calculate Area of kitchen: 3m × 2m = 6 sq m.' },
            { text: 'Add the two areas: 24 + 6 = 30 sq m.', faded: true, blankAnswer: '30 sq metres.' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch08_094', title: 'Problem-solving in mensuration involves.',
          caseStudy: { intro: 'Imagine you are asked to buy a lace for a rectangular table cover versus buying paint for the top surface of the table.',
            decisions: [{ prompt: 'What is the difference between a perimeter and an area in terms of the units used?', options: [
                { text: 'Perimeter is measured in linear units (like cm or m), while area is measured in square', outcome: 'Perimeter is measured in linear units (like cm or m), while area is measured in square units (like.' },
                { text: 'perimeter', outcome: 'Not quite — Students often confuse "perimeter" and "area" because they both involve length and width.', reveals: 'students-often-confuse-perimeter-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_073', title: 'A triangle is a closed geometric figure.',
          scaffold: { problem: 'A triangular park has three fence sections. Two sections are 20 meters each, and the third is 10 meters. The first angle is 40°.',
            steps: [
            { text: 'Identify that it is an isosceles triangle (two sides are 20m).' },
            { text: 'Note the sum of angles is 180°.' },
            { text: 'Subtract the known angle: 180° - 40° = 140°.' },
            { text: 'Divide the remainder by 2 because the other two angles are equal: 140° / 2 = 70°.', faded: true, blankAnswer: '70° and 70°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_087', title: 'Area is the measure of the total.',
          scaffold: { problem: 'A farmer wants to cover a rectangular shed floor with concrete. The shed is 6 meters long and 4 meters wide.',
            steps: [
            { text: 'Identify length (6 m) and width (4 m).' },
            { text: 'Use Area = l × w to find the total floor area.' },
            { text: '6 m × 4 m = 24 m².' },
            { text: 'Divide total area (24 m²) by coverage per bag (3 m²/bag).' },
            { text: '24 ÷ 3 = 8 bags.', faded: true, blankAnswer: '8 bags' }
            ] } }
    ],
    explore: { component: C6_MathematicsPerimeterAndAreaSim, prompt: 'Explore the interactive — Introduction to Perimeter' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch08_085', difficulty: 'standard',
          question: 'Perimeter is the total length of the boundary surrounding a closed 2D shape.',
          hint: 'Review basic addition and the identification of shapes (sides and corners).',
          misconception: 'Students often add only two sides of a rectangle (length + width) and stop, forgetting that a rectangle has four sides.',
          parts: [
                { id: 'a', prompt: 'What is the perimeter of a shape?', answer: 'The perimeter is the total distance around the boundary of a closed figure',
                  options: ['The perimeter is the total distance around the boundary of a closed figure', 'the space inside the shape'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often add only two sides of a rectangle (length + width) and stop, forgetting that a rectangle has four sides (two lengths and two.' }
          ],
            remediations: { 'students-often-add-only-two': { steps: ['Ask the student to draw the shape on grid paper.', 'Have them trace the entire edge with a colored pencil, counting every unit segment they pass.', 'Explicitly ask, "Did you count the top, bottom, left, and right sides?" to ensure they realize all four segments must.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_086', difficulty: 'standard',
          question: 'Area is the total measure of the flat surface or region enclosed inside the.',
          hint: 'Review multiplication tables and the concept of square grids.',
          misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).',
          parts: [
                { id: 'a', prompt: 'If you have a square with a side length of 3 cm, what is its area and what is the unit used to express it?', answer: 'The area is 9 cm²',
                  options: ['The area is 9 cm²', 'has forgotten that area units must be'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).' },
                { id: 'b', prompt: 'Explain in your own words why we use "square units" instead of just "units" to measure area.', answer: 'We use square units',
                  options: ['We use square units', 'because it is standard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['Ask the student to draw a rectangle on a 1cm grid paper that is 3cm by 2cm.', 'Ask them to physically count the little squares inside the box.', 'Then, show them that 3 rows of 2 squares equals 6, which matches 3 × 2.', 'Reinforce that "Area = multiplication" because we are counting rows of squares.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_090', difficulty: 'standard',
          question: 'A composite shape is a complex figure formed by joining two or more basic.',
          hint: 'Review the "Area of a Rectangle" section in the textbook.',
          misconception: 'Students often try to include the "hidden" internal line where two shapes meet when calculating the perimeter.',
          parts: [
                { id: 'a', prompt: 'If you split an L-shaped figure into two rectangles, does the sum of their perimeters equal the perimeter of the L-shape? Why or why not?', answer: 'No, it does not',
                  options: ['No, it does not', 'perimeter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to include the "hidden" internal line where two shapes meet when calculating the perimeter.' }
          ],
            remediations: { 'students-often-try-to-include': { steps: ['Ask the student to take a crayon and trace only the path an ant would walk if it were walking along the very outside of.', 'Tell them: "If your crayon touches an internal line that is inside the figure, stop—that line is not part of the.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_094', difficulty: 'standard',
          question: 'Problem-solving in mensuration involves identifying whether a real-world.',
          hint: 'Review the definitions of a rectangle and square and how to add the lengths of all sides.',
          misconception: 'Students often confuse "perimeter" and "area" because they both involve length and width.',
          parts: [
                { id: 'a', prompt: 'If you have a wire of length 20 cm, why does bending it into different rectangular shapes change the area but keep the perimeter the same?', answer: 'The perimeter remains constant',
                  options: ['The perimeter remains constant', 'perimeter', 'area and perimeter are always linked proportionally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "perimeter" and "area" because they both involve length and width.' }
          ],
            remediations: { 'students-often-confuse-perimeter-and': { steps: ['If a student fails, have them draw the shape on a piece of graph paper.', 'Ask them to trace the boundary with a red pen (perimeter) and shade the interior with a blue pencil (area).', 'Ask: "If you were an ant walking, which line would you follow?" and "If you were a painter, which part would you.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_073', difficulty: 'standard',
          question: 'A triangle is a closed geometric figure formed by three straight line segments.',
          hint: 'Review the "Angle" node (c6_math_ch07_073_angles) to ensure you understand how to measure.',
          misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A triangle is a closed geometric figure formed by three straight line segments connected',
                  options: ['A triangle is a closed geometric figure formed by three straight line segments connected', 'Perimeter is the total length of the boundary surrounding a closed 2D shape', 'Area is the total measure of the flat surface or region enclosed inside the boundary of a', 'A composite shape is a complex figure formed by joining two or more basic shapes (like'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be different sizes.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['Ask the student to draw an equilateral triangle by carefully measuring all sides to be the same length (e.g., 5cm).', 'Then, have them use a protractor to measure each of the three corners.', 'They will discover that each corner measures 60 degrees.', 'Explain that because the sides are "balanced" or equal, the "opening" at each corner must also be balanced.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_087', difficulty: 'standard',
          question: 'Area is the measure of the total surface region covered by a closed.',
          hint: 'Review multiplication tables and the concept of an array.',
          misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the area of a rectangle if you are given its length and width?', answer: 'The formula is Area = length × width',
                  options: ['The formula is Area = length × width', 'length + width'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).' },
                { id: 'b', prompt: 'A rectangular garden is 8 meters long and 3 meters wide. How much space does it cover?', answer: '8 meters × 3 meters = 24 square meters (m²)',
                  options: ['8 meters × 3 meters = 24 square meters (m²)', '22 meters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).' }
          ],
            remediations: { 'students-often-confuse-perimeter-the': { steps: ['First, draw the shape on a piece of grid paper.', 'Count the individual 1 cm² squares inside the shape to see the area.', 'Then, show that perimeter is only the outer "fencing" of the shape.', 'Ask the student to calculate both for a small rectangle to see that the numbers are different, reinforcing that Area =.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
