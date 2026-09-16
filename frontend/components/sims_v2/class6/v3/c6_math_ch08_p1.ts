import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch08_p1: SimDef = {
    id: 'v3_c6_math_ch08_p1',
    title: 'Mensuration · Part 1/2',
    subtitle: 'This node covers the perimeter of rectangles, squares, triangles, and simple polygons.',
    classLevel: 6, subject: 'mathematics', topic: 'Mensuration · Part 1/2',
    chapters: ['c6_math_ch08'],
    nodeIds: ['c6_math_ch08_085', 'c6_math_ch08_086', 'c6_math_ch08_087', 'c6_math_ch08_088', 'c6_math_ch08_092', 'c6_math_ch08_090'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are asked to put a decorative lace around your rectangular notebook cover.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A gardener orders fencing for a 10 metre by 5 metre garden by adding 10 + 5 = 15 metres. When the wire arrives, half the garden stands open. What did they forget?',
        options: ['A rectangle has four sides — the real boundary is 10 + 5 + 10 + 5 = 30 metres', 'Nothing — 15 metres is the correct perimeter', 'They forgot to multiply by the height of the fence', 'They should have measured the area inside instead'],
        answer: 'A rectangle has four sides — the real boundary is 10 + 5 + 10 + 5 = 30 metres',
        hook: 'Perimeter is the full walk around the edge, not just the numbers printed in the question. Bonus twist: two different rectangles, like 6 by 2 and 5 by 3, can share the same perimeter.',
    },
    teaching: [
        { title: 'Introduction to Perimeter', text: 'Perimeter is the total length of the boundary surrounding a closed 2D shape. It represents the distance you would travel if you walked exactly once along the entire edge of a figure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch08_085', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Walk the boundary of a garden, a triangle, and a notebook — total every side — then work backwards to find a missing side when only the perimeter is known.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_085', title: 'Introduction to Perimeter',
          scaffold: { problem: 'A rectangular park is 150 m long and 100 m wide. If a man walks around it twice, what is the total distance he covers?',
            steps: [
            { text: 'Identify the length (150 m) and width (100 m).' },
            { text: 'Calculate the perimeter of one round using P = 2(l + w).' },
            { text: 'P = 2(150 + 100) = 2(250) = 500 m.' },
            { text: 'Since he walks around twice, multiply the perimeter by 2.' },
            { text: 'Total distance = 500 m × 2 = 1000 m.', faded: true, blankAnswer: '1000 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_086', title: 'Introduction to Area',
          scaffold: { problem: 'A rectangular vegetable patch in a school garden is 10 metres long and 5 metres wide. The gardener wants to cover the path with fertilizer.',
            steps: [
            { text: 'Identify dimensions: l = 10 m, w = 5 m.' },
            { text: 'Use the formula for Area: A = l × w.' },
            { text: 'Calculate total area: 10 m × 5 m = 50 m².' },
            { text: 'Determine bags needed: 50 m² / 2 m² per bag = 25 bags.' },
            { text: 'Conclusion: 25 bags are required to cover the patch.', faded: true, blankAnswer: '25 bags' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_087', title: 'Area of Rectangles and Squares',
          scaffold: { problem: 'A farmer wants to cover a rectangular shed floor with concrete. The shed is 6 meters long and 4 meters wide.',
            steps: [
            { text: 'Identify length (6 m) and width (4 m).' },
            { text: 'Use Area = l × w to find the total floor area.' },
            { text: '6 m × 4 m = 24 m².' },
            { text: 'Divide total area (24 m²) by coverage per bag (3 m²/bag).' },
            { text: '24 ÷ 3 = 8 bags.', faded: true, blankAnswer: '8 bags' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch08_088', title: 'Area of Triangles and Parallelograms',
          caseStudy: { intro: 'If you wanted to cover your rectangular desk with square stickers, you would count how many fit.',
            decisions: [{ prompt: 'What is the formula to calculate the area of a triangle if you know its base ($b$) and its perpendicular height ($h$)?', options: [
                { text: 'The formula is $A = \\frac{1}{2} \\times b \\times h$', outcome: 'The formula is $A = \\frac{1}{2} \\times b \\times h$. A wrong answer like $A = b \\times h$ indicates.' },
                { text: 'slanting side', outcome: 'Not quite — Students often use the length of the "slanting side" (the slanted edge of the parallelogram.', reveals: 'students-often-use-the-length' },
                { text: 'height', outcome: 'Not quite — Students often use the length of the "slanting side" (the slanted edge of the parallelogram.', reveals: 'students-often-use-the-length' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch08_089', title: 'Area of Circles',
          caseStudy: { intro: 'Imagine you are helping your friend cut a circular piece of card paper for a school project.',
            decisions: [{ prompt: 'What is the formula used to calculate the area of a circle?', options: [
                { text: 'The formula is A = π × r²', outcome: 'The formula is A = π × r². A student who says "A = 2 × π × r" is confusing the area formula with.' },
                { text: 'A = 2 × π × r', outcome: 'Not quite — Students often confuse the area of a circle (πr²) with the circumference (2πr).', reveals: 'students-often-confuse-the-area' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_090', title: 'Perimeter and Area of Composite Shapes',
          scaffold: { problem: 'A floor plan is made of a living room (6m x 4m) and a kitchen (3m x 2m) joined together. Find the total area.',
            steps: [
            { text: 'Identify the two shapes: a 6x4 rectangle and a 3x2 rectangle.' },
            { text: 'Calculate Area of living room: 6m × 4m = 24 sq m.' },
            { text: 'Calculate Area of kitchen: 3m × 2m = 6 sq m.' },
            { text: 'Add the two areas: 24 + 6 = 30 sq m.', faded: true, blankAnswer: '30 sq metres.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch08_090', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch08_085', title: 'Use it in the wild',
          caseStudy: { intro: 'Two students each get 12 equal sticks. One lays out a square; the other lays out a long, flat rectangle. \'My shape is longer,\' says the second, \'so my perimeter must be bigger.\'',
            decisions: [{ prompt: 'Which shape really has the bigger perimeter?', options: [
                { text: 'Neither — both use the same 12 sticks, so both perimeters total the same length. Perimeter is just the total boundary, and reshaping the same material cannot stretch it. What actually changed is the area: the square encloses more space than the flat rectangle, even though the fences match.', outcome: 'Perimeter tracks the edge\'s length, not the shape\'s look — the same sticks always make the same perimeter, while the area inside can differ a lot.' },
                { text: 'The rectangle has the bigger perimeter — a longer shape always has a longer boundary.', outcome: 'Looking longer is not being longer — both boundaries are built from the same 12 sticks, so both perimeters are equal.', reveals: 'longer-shape-longer-perimeter' },
                { text: 'The square has the bigger perimeter — a balanced shape always has more edge.', outcome: 'Balance affects area, not perimeter — equal sticks mean equal boundaries either way.', reveals: 'square-has-more-edge' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch08_090', title: 'The bigger picture',
          caseStudy: { intro: 'Perimeter answers one question only: how far is the trip around the outside? Trace every edge, and no side gets left behind.',
            decisions: [{ prompt: 'What comes next? Mensuration · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mensuration · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch08_085', difficulty: 'standard',
          question: 'Perimeter is the total length of the boundary surrounding a closed 2D shape.',
          hint: 'Review basic addition and the identification of shapes (sides and corners).',
          misconception: 'Students often add only two sides of a rectangle (length + width) and stop, forgetting that a rectangle has four sides.',
          parts: [
                { id: 'a', prompt: 'What is the perimeter of a shape?', answer: 'The perimeter is the total distance around the boundary of a closed figure',
                  options: ['The perimeter is the total distance around the boundary of a closed figure', 'the space inside the shape'],
                  hint: 'Review basic addition and the identification of shapes (sides and corners).',
                  misconception: 'Students often add only two sides of a rectangle (length + width) and stop, forgetting that a rectangle has four sides (two lengths and two.' }
          ],
            remediations: { 'students-often-add-only-two': { steps: ['Ask the student to draw the shape on grid paper.', 'Have them trace the entire edge with a colored pencil, counting every unit segment they pass.', 'Explicitly ask, "Did you count the top, bottom, left, and right sides?" to ensure they realize all four segments must.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_086', difficulty: 'standard',
          question: 'Area is the total measure of the flat surface or region enclosed inside the.',
          hint: 'Review multiplication tables and the concept of square grids.',
          misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).',
          parts: [
                { id: 'a', prompt: 'If you have a square with a side length of 3 cm, what is its area and what is the unit used to express it?', answer: 'The area is 9 cm²',
                  options: ['The area is 9 cm²', 'has forgotten that area units must be'],
                  hint: 'Review multiplication tables and the concept of square grids.',
                  misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).' },
                { id: 'b', prompt: 'Explain in your own words why we use "square units" instead of just "units" to measure area.', answer: 'We use square units',
                  options: ['We use square units', 'because it is standard'],
                  hint: 'Review multiplication tables and the concept of square grids.',
                  misconception: 'Students often confuse the formula for perimeter (2 × (l + w)) with the formula for area (l × w).' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['Ask the student to draw a rectangle on a 1cm grid paper that is 3cm by 2cm.', 'Ask them to physically count the little squares inside the box.', 'Then, show them that 3 rows of 2 squares equals 6, which matches 3 × 2.', 'Reinforce that "Area = multiplication" because we are counting rows of squares.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_087', difficulty: 'standard',
          question: 'Area is the measure of the total surface region covered by a closed.',
          hint: 'Review multiplication tables and the concept of an array.',
          misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the area of a rectangle if you are given its length and width?', answer: 'The formula is Area = length × width',
                  options: ['The formula is Area = length × width', 'length + width'],
                  hint: 'Review multiplication tables and the concept of an array.',
                  misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).' },
                { id: 'b', prompt: 'A rectangular garden is 8 meters long and 3 meters wide. How much space does it cover?', answer: '8 meters × 3 meters = 24 square meters (m²)',
                  options: ['8 meters × 3 meters = 24 square meters (m²)', '22 meters'],
                  hint: 'Review multiplication tables and the concept of an array.',
                  misconception: 'Students often confuse Perimeter (the distance around) with Area (the space inside).' }
          ],
            remediations: { 'students-often-confuse-perimeter-the': { steps: ['First, draw the shape on a piece of grid paper.', 'Count the individual 1 cm² squares inside the shape to see the area.', 'Then, show that perimeter is only the outer "fencing" of the shape.', 'Ask the student to calculate both for a small rectangle to see that the numbers are different, reinforcing that Area.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_088', difficulty: 'standard',
          question: 'The area of a parallelogram is the product of its base and its perpendicular.',
          hint: 'Review identifying altitudes and base lines in geometric figures.',
          misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the.',
          parts: [
                { id: 'a', prompt: 'What is the formula to calculate the area of a triangle if you know its base ($b$) and its perpendicular height ($h$)?', answer: 'The formula is $A = \\frac{1}{2} \\times b \\times h$',
                  options: ['The formula is $A = \\frac{1}{2} \\times b \\times h$', 'slanting side', 'height'],
                  hint: 'Review identifying altitudes and base lines in geometric figures.',
                  misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the "height." They do this.' },
                { id: 'b', prompt: 'If you are given a parallelogram with a base of 10 cm and two side lengths of 6 cm and 8 cm, why can you not simply multiply 10 by 6 to find the area?', answer: 'Because the area formula requires the perpendicular height, not the side length',
                  options: ['Because the area formula requires the perpendicular height, not the side length', 'slanting side', 'height'],
                  hint: 'Review identifying altitudes and base lines in geometric figures.',
                  misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the "height." They do this.' },
                { id: 'c', prompt: 'A triangle has a base of 8 m and a height of 5 m. Calculate its area.', answer: '$A = \\frac{1}{2} \\times 8 \\times 5 = \\frac{1}{2} \\times 40 = 20 \\text{ m}^2$',
                  options: ['$A = \\frac{1}{2} \\times 8 \\times 5 = \\frac{1}{2} \\times 40 = 20 \\text{ m}^2$', 'slanting side', 'height'],
                  hint: 'Review identifying altitudes and base lines in geometric figures.',
                  misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the "height." They do this.' }
          ],
            remediations: { 'students-often-use-the-length': { steps: ['Draw the shape on grid paper.', 'Ask the student to draw a line from the top corner straight down to the base and count the grid squares to find the.', 'Explain that the height must be the "shortest path" to the base, forming a square corner (90 degrees).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_088', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the.',
          parts: [
                { id: 'a', prompt: 'If you double the height of a triangle while keeping the base the same, what happens to the total area? Justify your answer.', answer: 'The area also doubles',
                  options: ['The area also doubles', 'slanting side', 'height'],
                  hint: 'Review identifying altitudes and base lines in geometric figures.',
                  misconception: 'Students often use the length of the "slanting side" (the slanted edge of the parallelogram or triangle) as the "height." They do this.' }
          ],
            remediations: { 'students-often-use-the-length': { steps: ['Draw the shape on grid paper.', 'Ask the student to draw a line from the top corner straight down to the base and count the grid squares to find the.', 'Explain that the height must be the "shortest path" to the base, forming a square corner (90 degrees).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_089', difficulty: 'standard',
          question: 'The area of a circle is the total amount of flat space enclosed within its.',
          hint: 'Review multiplication of numbers and the concept of "square units" from the Area.',
          misconception: 'Students often confuse the area of a circle (πr²) with the circumference (2πr).',
          parts: [
                { id: 'a', prompt: 'What is the formula used to calculate the area of a circle?', answer: 'The formula is A = π × r²',
                  options: ['The formula is A = π × r²', 'A = 2 × π × r'],
                  hint: 'Review multiplication of numbers and the concept of "square units" from the Area of Rectangles.',
                  misconception: 'Students often confuse the area of a circle (πr²) with the circumference (2πr).' }
          ],
            remediations: { 'students-often-confuse-the-area': { steps: ['If the student is confused, ask them to draw a square inside a circle and a circle inside a square on grid paper.', 'Have them count the squares covered by the circle.', 'Remind them that "Area" is always "squared units" because we are filling a 2D surface, while "Perimeter" is just.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_090', difficulty: 'standard',
          question: 'A composite shape is a complex figure formed by joining two or more basic.',
          hint: 'Review the "Area of a Rectangle" section in the textbook.',
          misconception: 'Students often try to include the "hidden" internal line where two shapes meet when calculating the perimeter.',
          parts: [
                { id: 'a', prompt: 'If you split an L-shaped figure into two rectangles, does the sum of their perimeters equal the perimeter of the L-shape? Why or why not?', answer: 'No, it does not',
                  options: ['No, it does not', 'perimeter'],
                  hint: 'Review the "Area of a Rectangle" section in the textbook.',
                  misconception: 'Students often try to include the "hidden" internal line where two shapes meet when calculating the perimeter.' }
          ],
            remediations: { 'students-often-try-to-include': { steps: ['Ask the student to take a crayon and trace only the path an ant would walk if it were walking along the very outside.', 'Tell them: "If your crayon touches an internal line that is inside the figure, stop—that line is not part of the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
