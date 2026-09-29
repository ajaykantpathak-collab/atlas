import type { SimDef } from '../../engine/types';
import C6_MathematicsLineLineSegmentSim from '../../../simulations/c6_12/C6_MathematicsLineLineSegmentSim';

/** v3 wrapped master — C6_MathematicsLineLineSegmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicslinelinesegmentsim: SimDef = {
    id: 'v3w_c6_mathematicslinelinesegmentsim',
    title: 'Introduction to Geometry: Points, Lines, Line Segments',
    subtitle: 'This node covers the identification and naming of points, lines, and line segments.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Geometry: Points, Lines, Line Segments',
    chapters: [],
    nodeIds: ['c6_math_ch07_070', 'c6_math_ch07_073', 'c6_math_ch07_074', 'c6_math_ch07_075', 'c6_math_ch07_072', 'c6_math_ch07_081', 'c6_math_ch11_113', 'c6_math_ch11_114', 'c6_math_ch11_116', 'c6_math_ch03_037', 'c6_math_ch07_071', 'c6_math_ch07_078', 'c6_math_ch07_082', 'c6_math_ch07_077', 'c6_math_ch03_029'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a map and seen cities marked as tiny dots?', goal: 'Master Introduction to Geometry: Points, Lines, Line Segments.' },
    discovery: {
        question: 'What are the two defining features of a line segment that make it different from a line?',
        options: ['A line segment has two fixed endpoints and a definite length', 'it is a line', 'it is finite because the paper ends'],
        answer: 'A line segment has two fixed endpoints and a definite length',
        hook: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is.',
    },
    teaching: [
        { title: 'A point is a precise location in space.', text: 'A point is a precise location in space represented by a dot, a line segment is the shortest path between two fixed endpoints, and a line is a collection of points that extends infinitely in two.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch07_070', title: 'A point is a precise location in space.',
          scaffold: { problem: 'Rihan is designing a path for a toy car. He marks point A at the start and point B near the toy garage.',
            steps: [
            { text: 'Identify the start (A) and end (B).' },
            { text: 'Recognize the shortest path between two points is a line segment.' },
            { text: 'Draw the segment AB using a ruler.' },
            { text: 'Label the endpoints A and B.', faded: true, blankAnswer: 'Line segment AB, characterized by having two endpoints and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_073', title: 'A triangle is a closed geometric figure.',
          scaffold: { problem: 'A triangular park has three fence sections. Two sections are 20 meters each, and the third is 10 meters. The first angle is 40°.',
            steps: [
            { text: 'Identify that it is an isosceles triangle (two sides are 20m).' },
            { text: 'Note the sum of angles is 180°.' },
            { text: 'Subtract the known angle: 180° - 40° = 140°.' },
            { text: 'Divide the remainder by 2 because the other two angles are equal: 140° / 2 = 70°.', faded: true, blankAnswer: '70° and 70°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_074', title: 'A quadrilateral is a closed.',
          scaffold: { problem: 'A park in the shape of a quadrilateral has three angles measuring 70°, 110°, and 70°.',
            steps: [
            { text: 'identify knowns (70°, 110°, 70°) and total sum (360°).' },
            { text: 'add the known angles: 70 + 110 + 70 = 250°.' },
            { text: 'subtract the sum of known angles from 360°: 360 - 250 = 110°.' },
            { text: 'the fourth angle is 110°.', faded: true, blankAnswer: '110°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_075', title: 'A polygon is a simple, closed,.',
          scaffold: { problem: 'A park is shaped like a polygon with 6 sides of 10 metres each. All its interior angles are equal. Is it a regular or irregular hexagon?',
            steps: [
            { text: 'Identify sides (n=6) and confirm side lengths (all 10m).' },
            { text: 'Confirm angles are equal, so it is a regular hexagon.' },
            { text: 'Apply the sum formula: (n-2) x 180.' },
            { text: 'Substitute n=6: (6-2) x 180 = 4 x 180.' },
            { text: 'Calculate result: 720 degrees.', faded: true, blankAnswer: 'Regular hexagon; 720 degrees.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_076', title: 'A circle is a closed plane figure where.',
          scaffold: { problem: 'A circular garden in a park has a radius of 7 meters. A gardener wants to place a rope across the widest part of the garden.',
            steps: [
            { text: 'Identify that the "widest part" refers to the diameter of the circle.' },
            { text: 'Identify the given radius (r = 7m).' },
            { text: 'Use the formula for diameter: d = 2 × r.' },
            { text: 'Calculate: d = 2 × 7 = 14m.' },
            { text: 'Conclude that the rope must be 14 meters long.', faded: true, blankAnswer: '14 meters' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_081', title: 'A perpendicular line is a line that.',
          scaffold: { problem: 'You have a line segment AB that is 10cm long. Construct its perpendicular bisector to find the center point.',
            steps: [
            { text: 'Place the compass point at A and open it to a width greater than 5cm (e.g., 7cm).' },
            { text: 'Draw an arc above and below the line segment.' },
            { text: 'Without changing the compass width, move the compass point to B.' },
            { text: 'Draw two more arcs that intersect the first two arcs above and below the line.' },
            { text: 'Use your ruler to draw a line connecting the two intersection points; this line passes through the 5cm mark.', faded: true, blankAnswer: 'A line crossing segment AB at the 5cm mark at a 90° angle.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch07_073', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Geometry: Points, Lines, Line Segments', spots: [
            { id: 's1', label: 'A point is a precise', prompt: 'Which idea is this? — A point is a precise location in space represented by a dot, a line segment is the.', answer: 'A point is a precise', options: ['A point is a precise', 'A triangle is a closed', 'A quadrilateral is a closed', 'A polygon is a simple'] },
            { id: 's2', label: 'A triangle is a closed', prompt: 'Which idea is this? — A triangle is a closed geometric figure formed by three straight line segments connected.', answer: 'A triangle is a closed', options: ['A triangle is a closed', 'A point is a precise', 'A quadrilateral is a closed', 'A polygon is a simple'] },
            { id: 's3', label: 'A quadrilateral is a closed', prompt: 'Which idea is this? — A quadrilateral is a closed two-dimensional shape formed by four straight line segments.', answer: 'A quadrilateral is a closed', options: ['A quadrilateral is a closed', 'A point is a precise', 'A triangle is a closed', 'A polygon is a simple'] },
            { id: 's4', label: 'A polygon is a simple', prompt: 'Which idea is this? — A polygon is a simple, closed, two-dimensional figure formed by three or more straight.', answer: 'A polygon is a simple', options: ['A polygon is a simple', 'A point is a precise', 'A triangle is a closed', 'A quadrilateral is a closed'] },
            { id: 's5', label: 'A circle is a closed', prompt: 'Which idea is this? — A circle is a closed plane figure where every point on the edge is at an equal distance.', answer: 'A circle is a closed', options: ['A circle is a closed', 'A point is a precise', 'A triangle is a closed', 'A quadrilateral is a closed'] },
            { id: 's6', label: 'A perpendicular line is a', prompt: 'Which idea is this? — A perpendicular line is a line that meets another at a right angle (90°), while an angle.', answer: 'A perpendicular line is a', options: ['A perpendicular line is a', 'A point is a precise', 'A triangle is a closed', 'A quadrilateral is a closed'] }
          ] } }
    ],
    explore: { component: C6_MathematicsLineLineSegmentSim, prompt: 'Explore the interactive — Introduction to Geometry: Points, Lines, Line Segments' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch07_070', difficulty: 'standard',
          question: 'A point is a precise location in space represented by a dot, a line segment is.',
          hint: 'Review the definition of a "point" as a precise location.',
          misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is.',
          parts: [
                { id: 'a', prompt: 'What are the two defining features of a line segment that make it different from a line?', answer: 'A line segment has two fixed endpoints and a definite length',
                  options: ['A line segment has two fixed endpoints and a definite length', 'it is a line', 'it is finite because the paper ends'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is finite because the paper.' },
                { id: 'b', prompt: 'If I draw two dots on a page, how many lines can I draw that pass through both of them?', answer: 'Exactly one',
                  options: ['Exactly one', 'it is finite because the paper ends'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is finite because the paper.' },
                { id: 'c', prompt: 'Draw a line segment AB and then extend it in both directions. What is the new name for your figure?', answer: 'It is now called Line AB or line $l$',
                  options: ['It is now called Line AB or line $l$', 'it is finite because the paper ends'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is finite because the paper.' }
          ],
            remediations: { 'students-often-confuse-a-line': { steps: ['Take a piece of paper and draw a line segment with two dots at the ends.', 'Then, draw arrows at the tips of the segment to show it keeps going.', 'Explain that the arrows are symbols meaning "this never stops," whereas the dots are "stops."'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_070', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is.',
          parts: [
                { id: 'a', prompt: 'Create a drawing with three points (A, B, and C) that are not on the same line, and connect them to form three different line segments.', answer: 'The student should draw a triangle-like shape with segments AB, BC, and CA',
                  options: ['The student should draw a triangle-like shape with segments AB, BC, and CA', 'it is finite because the paper ends'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse a line with a line segment because they see a drawing of a line on a page and assume it is finite because the paper.' }
          ],
            remediations: { 'students-often-confuse-a-line': { steps: ['Take a piece of paper and draw a line segment with two dots at the ends.', 'Then, draw arrows at the tips of the segment to show it keeps going.', 'Explain that the arrows are symbols meaning "this never stops," whereas the dots are "stops."'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_073', difficulty: 'standard',
          question: 'A triangle is a closed geometric figure formed by three straight line segments.',
          hint: 'Review the "Angle" node (c6_math_ch07_073_angles) to ensure you understand how to measure.',
          misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A triangle is a closed geometric figure formed by three straight line segments connected',
                  options: ['A triangle is a closed geometric figure formed by three straight line segments connected', 'A point is a precise location in space represented by a dot, a line segment is the', 'A quadrilateral is a closed two-dimensional shape formed by four straight line segments', 'A polygon is a simple, closed, two-dimensional figure formed by three or more straight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly believe that if a triangle is "equilateral" (all sides equal), its angles must also be different sizes.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['Ask the student to draw an equilateral triangle by carefully measuring all sides to be the same length (e.g., 5cm).', 'Then, have them use a protractor to measure each of the three corners.', 'They will discover that each corner measures 60 degrees.', 'Explain that because the sides are "balanced" or equal, the "opening" at each corner must also be balanced.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_074', difficulty: 'standard',
          question: 'A quadrilateral is a closed two-dimensional shape formed by four straight line.',
          hint: 'Review "Lines and Angles" to ensure understanding of what defines a vertex and an angle.',
          misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.',
          parts: [
                { id: 'a', prompt: 'What is the sum of all interior angles of any quadrilateral?', answer: 'The sum is 360 degrees',
                  options: ['The sum is 360 degrees', '180 degrees', 'if a shape has four equal sides, it MUST be a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.' },
                { id: 'b', prompt: 'Can a quadrilateral be a rectangle if it does not have four right angles? Why or why not?', answer: 'No, a rectangle must have all four angles equal to 90 degrees by definition',
                  options: ['No, a rectangle must have all four angles equal to 90 degrees by definition', 'if a shape has four equal sides, it MUST be a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.' },
                { id: 'c', prompt: 'A quadrilateral has three angles measuring 80°, 100°, and 80°. What is the measure of the fourth angle?', answer: 'The fourth angle is 100° (360 - 260 = 100)',
                  options: ['The fourth angle is 100° (360 - 260 = 100)', 'if a shape has four equal sides, it MUST be a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.' }
          ],
            remediations: { 'if-a-shape-has-four': { steps: ['Ask the student to draw two four-sided shapes with equal sides: one with square corners and one tilted like a diamond.', 'Label the square corners on the first and point out the "leaning" corners on the second.', 'Explain that the "leaning" one is called a rhombus because it lacks the 90-degree constraint.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_074', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.',
          parts: [
                { id: 'a', prompt: 'Draw a figure that is a quadrilateral but is neither a parallelogram nor a trapezium. Describe its properties.', answer: 'A kite or a generic irregular quadrilateral',
                  options: ['A kite or a generic irregular quadrilateral', 'if a shape has four equal sides, it MUST be a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a shape has four equal sides, it MUST be a square.' }
          ],
            remediations: { 'if-a-shape-has-four': { steps: ['Ask the student to draw two four-sided shapes with equal sides: one with square corners and one tilted like a diamond.', 'Label the square corners on the first and point out the "leaning" corners on the second.', 'Explain that the "leaning" one is called a rhombus because it lacks the 90-degree constraint.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_075', difficulty: 'standard',
          question: 'A polygon is a simple, closed, two-dimensional figure formed by three or more.',
          hint: 'Review the definition of a line segment vs a curve.',
          misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a.',
          parts: [
                { id: 'a', prompt: 'What do we call a closed figure made of exactly five straight line segments?', answer: 'It is called a pentagon',
                  options: ['It is called a pentagon', 'square', 'triangle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' },
                { id: 'b', prompt: 'If a quadrilateral has all sides equal but its corners are not the same size, is it a regular polygon? Why or why not?', answer: 'No, it is not regular',
                  options: ['No, it is not regular', 'regular', 'symmetric'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' },
                { id: 'c', prompt: 'A shape has 6 sides of different lengths and different angles. Is it a polygon? If so, what is it called?', answer: 'Yes, it is a hexagon',
                  options: ['Yes, it is a hexagon', 'it is not a polygon', 'irregular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "regular" just means "symmetric" or "looks normal." For example, they might call a rectangle a regular.' }
          ],
            remediations: { 'regular-just-means-symmetric-or': { steps: ['Ask the student to take a ruler and measure the sides of their shape.', 'Say: "If you measure every side of a square, you find they are all 3cm.', 'If you measure a rectangle, you find two sides are 3cm and two are 5cm.', 'Does a rectangle have all equal sides?" This forces them to focus on measurement rather than visual intuition.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_076', difficulty: 'standard',
          question: 'A circle is a closed plane figure where every point on the edge is at an equal.',
          hint: 'Review the definition of a line segment from the chapter on Lines and Angles.',
          misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.',
          parts: [
                { id: 'a', prompt: 'What is the name of the line segment that connects two points on a circle and passes through the center?', answer: 'The line segment is called the diameter',
                  options: ['The line segment is called the diameter', 'radius', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' },
                { id: 'b', prompt: 'A circular park has a diameter of 20 meters. If a path is built from the center to the edge, how long will the path be?', answer: 'The path (radius) will be 10 meters',
                  options: ['The path (radius) will be 10 meters', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' },
                { id: 'c', prompt: 'Why is the diameter considered a special type of chord?', answer: 'The diameter is a chord',
                  options: ['The diameter is a chord', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' }
          ],
            remediations: { 'any-line-segment-drawn-inside': { steps: ['If a student misidentifies parts, have them use a compass to draw a circle.', 'First, ask them to identify the center point they poked with the metal tip.', 'Tell them: "Any line starting from that specific hole is a radius." Then, have them draw a line through that hole to.', 'This physical action reinforces that the center point is the "anchor" for these measurements.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_076', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.',
          parts: [
                { id: 'a', prompt: 'If you draw a chord that does not pass through the center, is it still a diameter? Why or why not?', answer: 'No, it is not a diameter',
                  options: ['No, it is not a diameter', 'any line segment drawn inside a circle is a diameter or a radius'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line segment drawn inside a circle is a diameter or a radius.' }
          ],
            remediations: { 'any-line-segment-drawn-inside': { steps: ['If a student misidentifies parts, have them use a compass to draw a circle.', 'First, ask them to identify the center point they poked with the metal tip.', 'Tell them: "Any line starting from that specific hole is a radius." Then, have them draw a line through that hole to.', 'This physical action reinforces that the center point is the "anchor" for these measurements.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_081', difficulty: 'standard',
          question: 'A perpendicular line is a line that meets another at a right angle (90°), while.',
          hint: 'Review the definition of a line segment and how to measure length with a ruler.',
          misconception: 'Students often fail to change the compass width after drawing the first arc, or they change the width mid-construction,.',
          parts: [
                { id: 'a', prompt: 'What is the measure of the angle formed by two perpendicular lines?', answer: 'The angle is exactly 90 degrees',
                  options: ['The angle is exactly 90 degrees', '180 degrees', 'any angle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often fail to change the compass width after drawing the first arc, or they change the width mid-construction, which prevents the.' }
          ],
            remediations: { 'students-often-fail-to-change': { steps: ['If a student\'s arcs do not cross, guide them to: 1) Increase the compass opening to more than half the segment length.', '2) Ensure the point of the compass is exactly on the endpoint.', '3) Remind them that the same compass width must be used for both the \'above\' and \'below\' arcs to maintain symmetry.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
