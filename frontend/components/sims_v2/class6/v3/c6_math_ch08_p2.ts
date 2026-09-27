import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch08_p2: SimDef = {
    id: 'v3_c6_math_ch08_p2',
    title: 'Mensuration · Part 2/2',
    subtitle: 'This node covers the volume of cubes and cuboids based on length, width, and height.',
    classLevel: 6, subject: 'mathematics', topic: 'Mensuration · Part 2/2',
    chapters: ['c6_math_ch08'],
    nodeIds: ['c6_math_ch08_091', 'c6_math_ch08_092', 'c6_math_ch08_093', 'c6_math_ch08_094'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you have a cardboard box and you want to fill it with small, solid wooden blocks that are each 1.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A gardener orders fencing for a 10 metre by 5 metre garden by adding 10 + 5 = 15 metres. When the wire arrives, half the garden stands open. What did they forget?',
        options: ['A rectangle has four sides — the real boundary is 10 + 5 + 10 + 5 = 30 metres', 'Nothing — 15 metres is the correct perimeter', 'They forgot to multiply by the height of the fence', 'They should have measured the area inside instead'],
        answer: 'A rectangle has four sides — the real boundary is 10 + 5 + 10 + 5 = 30 metres',
        hook: 'Perimeter is the full walk around the edge, not just the numbers printed in the question. Bonus twist: two different rectangles, like 6 by 2 and 5 by 3, can share the same perimeter.',
    },
    teaching: [
        { title: 'Introduction to Volume', text: 'Volume is the measure of the total amount of space inside a three-dimensional object. It tells us how many unit cubes (like 1 cm × 1 cm × 1 cm cubes) can fit perfectly inside a shape.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch08_091', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Walk the boundary of a garden, a triangle, and a notebook — total every side — then work backwards to find a missing side when only the perimeter is known.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_091', title: 'Introduction to Volume',
          scaffold: { problem: 'A rectangular water tank is 4 metres long, 3 metres wide, and 2 metres high. What is the total volume of the tank?',
            steps: [
            { text: 'Identify given values: length (l) = 4 m, width (w) = 3 m, height (h) = 2 m.' },
            { text: 'Select formula: Volume = l × w × h.' },
            { text: 'Multiply: 4 m × 3 m = 12 m² (this is the base area).' },
            { text: 'Multiply by height: 12 m² × 2 m = 24 m³.' },
            { text: 'Verify units: Since we multiplied metres three times, the unit is m³.', faded: true, blankAnswer: '24 m³' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch08_092', title: 'Surface Area of Cubes and Cuboids',
          scaffold: { problem: 'A lunchbox is 10 cm long, 5 cm wide, and 3 cm high. Find the total surface area to be covered by a sticker.',
            steps: [
            { text: 'Identify dimensions: l=10, w=5, h=3.' },
            { text: 'Calculate area of each pair: lw=50, lh=30, wh=15.' },
            { text: 'Add these: 50 + 30 + 15 = 95.' },
            { text: 'Multiply by 2: 95 x 2 = 190.', faded: true, blankAnswer: '190 cm²' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch08_093', title: 'Volume and Surface Area of Cylinders',
          caseStudy: { intro: 'Imagine you are buying a tin of energy drink. How much liquid can it hold, and how much metal sheet is needed to make the tin?',
            decisions: [{ prompt: 'What are the three components you must calculate to find the total surface area of a cylinder?', options: [
                { text: 'The three components are the area of the top circle, the area of the bottom circle, and', outcome: 'The three components are the area of the top circle, the area of the bottom circle, and the area.' },
                { text: 'the volume', outcome: 'Not quite — Students often confuse "squaring" the radius (r × r) with "multiplying by two" (r × 2).', reveals: 'students-often-confuse-squaring-the' },
                { text: 'the circumference', outcome: 'Not quite — Students often confuse "squaring" the radius (r × r) with "multiplying by two" (r × 2).', reveals: 'students-often-confuse-squaring-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch08_094', title: 'Problem Solving in Mensuration',
          caseStudy: { intro: 'Imagine you are asked to buy a lace for a rectangular table cover versus buying paint for the top surface of the table.',
            decisions: [{ prompt: 'What is the difference between a perimeter and an area in terms of the units used?', options: [
                { text: 'Perimeter is measured in linear units (like cm or m), while area is measured in square', outcome: 'Perimeter is measured in linear units (like cm or m), while area is measured in square units (like.' },
                { text: 'perimeter', outcome: 'Not quite — Students often confuse "perimeter" and "area" because they both involve length and width.', reveals: 'students-often-confuse-perimeter-and' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch08_094', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch08_091', title: 'Use it in the wild',
          caseStudy: { intro: 'Two students each get 12 equal sticks. One lays out a square; the other lays out a long, flat rectangle. \'My shape is longer,\' says the second, \'so my perimeter must be bigger.\'',
            decisions: [{ prompt: 'Which shape really has the bigger perimeter?', options: [
                { text: 'Neither — both use the same 12 sticks, so both perimeters total the same length. Perimeter is just the total boundary, and reshaping the same material cannot stretch it. What actually changed is the area: the square encloses more space than the flat rectangle, even though the fences match.', outcome: 'Perimeter tracks the edge\'s length, not the shape\'s look — the same sticks always make the same perimeter, while the area inside can differ a lot.' },
                { text: 'The rectangle has the bigger perimeter — a longer shape always has a longer boundary.', outcome: 'Looking longer is not being longer — both boundaries are built from the same 12 sticks, so both perimeters are equal.', reveals: 'longer-shape-longer-perimeter' },
                { text: 'The square has the bigger perimeter — a balanced shape always has more edge.', outcome: 'Balance affects area, not perimeter — equal sticks mean equal boundaries either way.', reveals: 'square-has-more-edge' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch08_094', title: 'You made it',
          caseStudy: { intro: 'Perimeter answers one question only: how far is the trip around the outside? Trace every edge, and no side gets left behind.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch08_091', difficulty: 'standard',
          question: 'Volume is the measure of the total amount of space inside a three-dimensional.',
          hint: 'Review the area of a rectangle to ensure they understand how multiplying two sides fills.',
          misconception: 'Students often confuse "Perimeter," "Area," and "Volume." They might try to add the dimensions (l + w + h) or multiply.',
          parts: [
                { id: 'a', prompt: 'What is the standard unit used to measure the volume of a box that has dimensions in centimetres?', answer: 'The unit is cubic centimetres (cm³)',
                  options: ['The unit is cubic centimetres (cm³)', 'Perimeter', 'Volume'],
                  hint: 'Review the area of a rectangle to ensure they understand how multiplying two sides fills a 2D plane.',
                  misconception: 'Students often confuse "Perimeter," "Area," and "Volume." They might try to add the dimensions (l + w + h) or multiply only two (l × w).' },
                { id: 'b', prompt: 'If you have a cube with a side length of 2 cm, why is its volume 8 cm³ and not 6 cm³?', answer: 'The volume is 2 × 2 × 2 = 8 cm³',
                  options: ['The volume is 2 × 2 × 2 = 8 cm³', 'Perimeter', 'Volume'],
                  hint: 'Review the area of a rectangle to ensure they understand how multiplying two sides fills a 2D plane.',
                  misconception: 'Students often confuse "Perimeter," "Area," and "Volume." They might try to add the dimensions (l + w + h) or multiply only two (l × w).' },
                { id: 'c', prompt: 'A shipping box is 5 m long, 2 m wide, and 3 m high. Calculate its volume.', answer: 'Volume = 5 m × 2 m × 3 m = 30 m³',
                  options: ['Volume = 5 m × 2 m × 3 m = 30 m³', 'Perimeter', 'Volume'],
                  hint: 'Review the area of a rectangle to ensure they understand how multiplying two sides fills a 2D plane.',
                  misconception: 'Students often confuse "Perimeter," "Area," and "Volume." They might try to add the dimensions (l + w + h) or multiply only two (l × w).' },
                { id: 'd', prompt: 'If you double the length, width, and height of a cube, does the volume also double? Explain why or why not.', answer: 'No, the volume increases by 8 times (2 × 2 × 2 = 8)',
                  options: ['No, the volume increases by 8 times (2 × 2 × 2 = 8)', 'double', 'Perimeter', 'Volume'],
                  hint: 'Review the area of a rectangle to ensure they understand how multiplying two sides fills a 2D plane.',
                  misconception: 'Students often confuse "Perimeter," "Area," and "Volume." They might try to add the dimensions (l + w + h) or multiply only two (l × w).' }
          ],
            remediations: { 'students-often-confuse-perimeter': { steps: ['If a student adds dimensions, ask them to draw a 1 cm cube.', 'Then, ask them to draw a 2 cm × 2 cm × 1 cm layer and count the cubes.', 'Show them that to fill the *entire* space, they must account for the "depth" or "height" by multiplying, not adding.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_092', difficulty: 'standard',
          question: 'The surface area of a 3D object is the total amount of space covered by all its.',
          hint: 'Review the area of a rectangle formula (l x w).',
          misconception: 'Students often confuse surface area with volume. They might try to multiply length x width x height instead of adding.',
          parts: [
                { id: 'a', prompt: 'What does "surface area" mean in the context of a 3D box?', answer: 'It is the total area of all the outer faces of the object',
                  options: ['It is the total area of all the outer faces of the object', 'the space inside the box'],
                  hint: 'Review the area of a rectangle formula (l x w).',
                  misconception: 'Students often confuse surface area with volume. They might try to multiply length x width x height instead of adding the areas of the.' }
          ],
            remediations: { 'students-often-confuse-surface-area': { steps: ['Ask the student to draw the net of the cuboid (the flattened version).', 'Have them write the dimensions on each of the six rectangles in the net.', 'Guide them to calculate the area of each rectangle separately and then sum them up, showing that this total is the same.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_093', difficulty: 'standard',
          question: 'A cylinder is a 3D solid object with two identical circular bases connected.',
          hint: 'Review the definition of a circle and how to calculate its area using pi.',
          misconception: 'Students often confuse "squaring" the radius (r × r) with "multiplying by two" (r × 2).',
          parts: [
                { id: 'a', prompt: 'If you double the height of a cylinder but keep the radius the same, what happens to the volume?', answer: 'The volume doubles',
                  options: ['The volume doubles', 'squaring', 'multiplying by two'],
                  hint: 'Review the definition of a circle and how to calculate its area using pi.',
                  misconception: 'Students often confuse "squaring" the radius (r × r) with "multiplying by two" (r × 2).' },
                { id: 'b', prompt: 'A cylinder has a radius of 3 cm and a height of 10 cm. Using 3.14 for pi, calculate its volume.', answer: 'Step 1: Calculate base area = 3.14 × 3 × 3 = 28.26',
                  options: ['Step 1: Calculate base area = 3.14 × 3 × 3 = 28.26', 'squaring', 'multiplying by two'],
                  hint: 'Review the definition of a circle and how to calculate its area using pi.',
                  misconception: 'Students often confuse "squaring" the radius (r × r) with "multiplying by two" (r × 2).' }
          ],
            remediations: { 'students-often-confuse-squaring-the': { steps: ['Ask the student to draw a square on graph paper with a side of 3 and count the squares to find the area (9).', 'Then ask them to draw a rectangle with sides 3 and 2 and count those (6).', 'Show them that the area of a square is "side times side," which is why r × r is used for the circle base area, not.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch08_094', difficulty: 'standard',
          question: 'Problem-solving in mensuration involves identifying whether a real-world.',
          hint: 'Review the definitions of a rectangle and square and how to add the lengths of all sides.',
          misconception: 'Students often confuse "perimeter" and "area" because they both involve length and width.',
          parts: [
                { id: 'a', prompt: 'If you have a wire of length 20 cm, why does bending it into different rectangular shapes change the area but keep the perimeter the same?', answer: 'The perimeter remains constant',
                  options: ['The perimeter remains constant', 'perimeter', 'area and perimeter are always linked proportionally'],
                  hint: 'Review the definitions of a rectangle and square and how to add the lengths of all sides.',
                  misconception: 'Students often confuse "perimeter" and "area" because they both involve length and width.' }
          ],
            remediations: { 'students-often-confuse-perimeter-and': { steps: ['If a student fails, have them draw the shape on a piece of graph paper.', 'Ask them to trace the boundary with a red pen (perimeter) and shade the interior with a blue pencil (area).', 'Ask: "If you were an ant walking, which line would you follow?" and "If you were a painter, which part would you.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
