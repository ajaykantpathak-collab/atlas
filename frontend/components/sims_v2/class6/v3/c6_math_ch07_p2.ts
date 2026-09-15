import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch07_p2: SimDef = {
    id: 'v3_c6_math_ch07_p2',
    title: 'Geometry · Part 2/3',
    subtitle: 'This node covers the identification and basic properties of radii, diameters, chords, and.',
    classLevel: 6, subject: 'mathematics', topic: 'Geometry · Part 2/3',
    chapters: ['c6_math_ch07'],
    nodeIds: ['c6_math_ch07_076', 'c6_math_ch07_077', 'c6_math_ch07_078', 'c6_math_ch07_079', 'c6_math_ch07_080', 'c6_math_ch07_081'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a bicycle wheel or a round dinner plate and wondered how we describe its parts?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You mark two dots on a page and a friend claims they can draw many different straight lines through both dots. Can they?',
        options: ['No — exactly one straight line passes through two given points', 'Yes — as many lines as there are colours of pen', 'Yes — but only if the dots are close together', 'No — no line can pass through two points at once'],
        answer: 'No — exactly one straight line passes through two given points',
        hook: 'A line does not stop at the edge of your paper — the arrows mean it runs forever. A line segment, with its two endpoint dots, is the stopped, measurable piece of that endless line.',
    },
    teaching: [
        { title: 'Circle: Radius, Diameter, Chord, Arc', text: 'A circle is a closed plane figure where every point on the edge is at an equal distance from a fixed center point; the line segments describing this shape include the radius (center to edge).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch07_076', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Draw a dot, connect two points into a segment, then stretch it past the page in both directions — and name each figure correctly as it transforms.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_076', title: 'Circle: Radius, Diameter, Chord, Arc',
          scaffold: { problem: 'A circular garden in a park has a radius of 7 meters. A gardener wants to place a rope across the widest part of the garden.',
            steps: [
            { text: 'Identify that the "widest part" refers to the diameter of the circle.' },
            { text: 'Identify the given radius (r = 7m).' },
            { text: 'Use the formula for diameter: d = 2 × r.' },
            { text: 'Calculate: d = 2 × 7 = 14m.' },
            { text: 'Conclude that the rope must be 14 meters long.', faded: true, blankAnswer: '14 meters' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_078', title: 'Symmetry in Shapes',
          scaffold: { problem: 'A rectangular piece of chart paper measures 10 cm by 6 cm. How many lines of symmetry does it have and where are they?',
            steps: [
            { text: 'Visualize the rectangle as a four-sided shape with two pairs of equal sides.' },
            { text: 'Attempt a fold along the horizontal axis (bisecting the 6 cm sides).' },
            { text: 'Attempt a fold along the vertical axis (bisecting the 10 cm sides).' },
            { text: 'Attempt a diagonal fold. Observe that the corners do not touch.' },
            { text: 'Conclude that there are 2 lines of symmetry.', faded: true, blankAnswer: '2 lines of symmetry (one horizontal, one vertical).' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch07_079', title: 'Angles in Triangles and Quadrilaterals',
          caseStudy: { intro: 'Imagine you are building a paper kite (quadrilateral) and a triangular flag.',
            decisions: [{ prompt: 'What is the sum of all interior angles in any triangle?', options: [
                { text: 'The sum is 180 degrees', outcome: 'The sum is 180 degrees. If a student answers "360 degrees," they are confusing it with the.' },
                { text: '360 degrees', outcome: 'Not quite — Students often apply the "180-degree rule" to quadrilaterals or the "360-degree rule" to triangles.', reveals: 'students-often-apply-the-180' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_080', title: 'Constructing Triangles',
          scaffold: { problem: 'Construct a triangle with sides 4 cm, 5 cm, and 6 cm.',
            steps: [
            { text: 'Draw a line segment AB of 6 cm using a ruler.' },
            { text: 'Open the compass to 4 cm. Place the pointer on A and draw an arc above the line.' },
            { text: 'Open the compass to 5 cm. Place the pointer on B and draw another arc intersecting the first one at point C.' },
            { text: 'Use the ruler to draw lines AC and BC.' },
            { text: 'Verify the lengths of AC and BC with a ruler to ensure they are 4 cm and 5 cm.', faded: true, blankAnswer: 'A triangle ABC with sides AB=6cm, AC=4cm, BC=5cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_081', title: 'Constructing Perpendicular Lines and Bisectors',
          scaffold: { problem: 'You have a line segment AB that is 10cm long. Construct its perpendicular bisector to find the center point.',
            steps: [
            { text: 'Place the compass point at A and open it to a width greater than 5cm (e.g., 7cm).' },
            { text: 'Draw an arc above and below the line segment.' },
            { text: 'Without changing the compass width, move the compass point to B.' },
            { text: 'Draw two more arcs that intersect the first two arcs above and below the line.' },
            { text: 'Use your ruler to draw a line connecting the two intersection points; this line passes through the 5cm mark.', faded: true, blankAnswer: 'A line crossing segment AB at the 5cm mark at a 90° angle.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch07_081', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch07_076', title: 'Use it in the wild',
          caseStudy: { intro: 'A student planning a toy-car track wants the shortest route from point A to point B. She also writes in her notebook: \'A line is just a very long line segment.\'',
            decisions: [{ prompt: 'What should the path be — and is her definition right?', options: [
                { text: 'The shortest route is the line segment AB — straight between two endpoints. And the definition is wrong: a segment ends at both ends, while a line runs forever in both directions with no endpoints at all. No amount of length turns a segment into a line — the difference is in the endpoints, not the length.', outcome: 'Naming matters in geometry: ray, line and segment are different objects, and the endpoint count — not size — is what separates them.' },
                { text: 'She is right on both — any path works for the car, and a long enough segment becomes a line.', outcome: 'Only the straight segment is shortest, and no finite segment can become a line — a line has no endpoints by definition.', reveals: 'line-is-long-segment' },
                { text: 'The shortest route is a curve, because curves can bend around and reach faster.', outcome: 'Any bend adds length — the straight segment between two points is always the shortest path.', reveals: 'curves-are-shorter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch07_081', title: 'The bigger picture',
          caseStudy: { intro: 'Two points fix one line forever. Points are locations, segments are journeys with ends, and lines are journeys that never end.',
            decisions: [{ prompt: 'What comes next? Geometry · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geometry · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch07_076', difficulty: 'standard',
          question: 'A circle is a closed plane figure where every point on the edge is at an equal.',
          hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
          misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.',
          parts: [
                { id: 'a', prompt: 'What is the name of the line segment that connects two points on a circle and passes through the center?', answer: 'The line segment is called the diameter',
                  options: ['The line segment is called the diameter', 'radius', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' },
                { id: 'b', prompt: 'A circular park has a diameter of 20 meters. If a path is built from the center to the edge, how long will the path be?', answer: 'The path (radius) will be 10 meters',
                  options: ['The path (radius) will be 10 meters', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' },
                { id: 'c', prompt: 'Why is the diameter considered a special type of chord?', answer: 'The diameter is a chord',
                  options: ['The diameter is a chord', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' }
          ],
            remediations: { 'any-line-segment-drawn-inside': { steps: ['If a student misidentifies parts, have them use a compass to draw a circle.', 'First, ask them to identify the center point they poked with the metal tip.', 'Tell them: "Any line starting from that specific hole is a radius." Then, have them draw a line through that hole.', 'This physical action reinforces that the center point is the "anchor" for these measurements.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_076', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.',
          parts: [
                { id: 'a', prompt: 'If you draw a chord that does not pass through the center, is it still a diameter? Why or why not?', answer: 'No, it is not a diameter',
                  options: ['No, it is not a diameter', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' }
          ],
            remediations: { 'any-line-segment-drawn-inside': { steps: ['If a student misidentifies parts, have them use a compass to draw a circle.', 'First, ask them to identify the center point they poked with the metal tip.', 'Tell them: "Any line starting from that specific hole is a radius." Then, have them draw a line through that hole.', 'This physical action reinforces that the center point is the "anchor" for these measurements.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_077', difficulty: 'standard',
          question: 'Three-dimensional (3D) shapes are solid objects that occupy space and possess.',
          hint: 'Review basic polygon definitions and the concept of vertices/edges in 2D shapes.',
          misconception: 'Students often confuse the \'face\' of a 3D shape with its \'edge,\' or they forget to count the \'hidden\' faces and edges.',
          parts: [
                { id: 'a', prompt: 'If you hold a ball, does it have any edges or vertices? Explain why.', answer: 'No, a sphere has no edges or vertices',
                  options: ['No, a sphere has no edges or vertices', 'one edge'],
                  hint: 'Review basic polygon definitions and the concept of vertices/edges in 2D shapes.',
                  misconception: 'Students often confuse the \'face\' of a 3D shape with its \'edge,\' or they forget to count the \'hidden\' faces and edges that are not visible.' }
          ],
            remediations: { 'students-often-confuse-the-face': { steps: ['To fix this, use a physical object like a dice or a soap box.', 'Ask the student to place a small sticker on every face they can identify, then turn the object over to find the ones.', 'Explain that an edge is specifically the line segment where two flat faces meet, and a vertex is the corner point where.', 'Physically touching these parts is essential to bridge the gap between a 2D drawing and a 3D reality.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_078', difficulty: 'standard',
          question: 'Symmetry exists when a shape can be divided into two identical halves that.',
          hint: 'Review the definition of a line segment and how to measure equal lengths.',
          misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.',
          parts: [
                { id: 'a', prompt: 'Does a circle have a limited number of lines of symmetry? Explain your reasoning.', answer: 'No, a circle has infinitely many lines of symmetry',
                  options: ['No, a circle has infinitely many lines of symmetry', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Review the definition of a line segment and how to measure equal lengths.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' },
                { id: 'b', prompt: 'If you draw a rectangle that is not a square, how many lines of symmetry can you find?', answer: 'A rectangle has exactly two lines of symmetry: one horizontal and one vertical',
                  options: ['A rectangle has exactly two lines of symmetry: one horizontal and one vertical', 'cut in half', 'a shape only has symmetry if it is "cut in half" by a vertical line'],
                  hint: 'Review the definition of a line segment and how to measure equal lengths.',
                  misconception: 'Students often think a shape only has symmetry if it is "cut in half" by a vertical line.' }
          ],
            remediations: { 'a-shape-only-has-symmetry': { steps: ['Take a physical sheet of paper cut into the shape.', 'Ask the student to fold it vertically; if it doesn\'t match, ask them to rotate the paper 90 degrees and try folding.', 'By physically manipulating the object, they learn that symmetry is a property of the shape\'s geometry, not the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_079', difficulty: 'standard',
          question: 'A triangle is a closed shape with three sides where the interior angles always.',
          hint: 'Review the "Making Rotating Arms" activity to visualize that angles are rotations.',
          misconception: 'Students often apply the "180-degree rule" to quadrilaterals or the "360-degree rule" to triangles.',
          parts: [
                { id: 'a', prompt: 'What is the sum of all interior angles in any triangle?', answer: 'The sum is 180 degrees',
                  options: ['The sum is 180 degrees', '360 degrees'],
                  hint: 'Review the "Making Rotating Arms" activity to visualize that angles are rotations.',
                  misconception: 'Students often apply the "180-degree rule" to quadrilaterals or the "360-degree rule" to triangles.' }
          ],
            remediations: { 'students-often-apply-the-180': { steps: ['If the student is confused, first draw a triangle and a square.', 'Ask them to tear the corners off the triangle and see if they form a straight line (180°).', 'Then, show that a square is just two triangles joined together, making it 180 + 180 = 360°.', 'Have them write the "180" and "360" labels clearly on their notebook cover as a reference.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_080', difficulty: 'standard',
          question: 'Constructing triangles is the process of using a ruler and a compass to draw.',
          hint: 'Review the definition of a "line segment" and "vertex" in Chapter 2.',
          misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing triangles is the process of using a ruler and a compass to draw a triangle',
                  options: ['Constructing triangles is the process of using a ruler and a compass to draw a triangle', 'A point is a precise location in space represented by a dot, a line segment is the', 'Lines are classified by their mutual position: parallel lines never intersect despite', 'An angle is the amount of rotation between two rays that share a common starting point,'],
                  hint: 'Review the definition of a "line segment" and "vertex" in Chapter 2.',
                  misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs without measuring them.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student is stuck, have them draw a circle with the compass first.', 'Ask: "Every point on this circle is exactly 5 cm from the center, right?" Then, draw a second circle from the other.', 'Ask: "Where do these circles cross?" Explain that the intersection is the only point that is *both* 5 cm from the left.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_081', difficulty: 'standard',
          question: 'A perpendicular line is a line that meets another at a right angle (90°), while.',
          hint: 'Review the definition of a line segment and how to measure length with a ruler.',
          misconception: 'Students often fail to change the compass width after drawing the first arc, or they change the width mid-construction.',
          parts: [
                { id: 'a', prompt: 'What is the measure of the angle formed by two perpendicular lines?', answer: 'The angle is exactly 90 degrees',
                  options: ['The angle is exactly 90 degrees', '180 degrees', 'any angle'],
                  hint: 'Review the definition of a line segment and how to measure length with a ruler.',
                  misconception: 'Students often fail to change the compass width after drawing the first arc, or they change the width mid-construction, which prevents the.' }
          ],
            remediations: { 'students-often-fail-to-change': { steps: ['If a student\'s arcs do not cross, guide them to: 1) Increase the compass opening to more than half the segment length.', '2) Ensure the point of the compass is exactly on the endpoint.', '3) Remind them that the same compass width must be used for both the \'above\' and \'below\' arcs to maintain symmetry.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
