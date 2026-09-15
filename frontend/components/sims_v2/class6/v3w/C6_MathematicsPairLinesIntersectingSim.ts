import type { SimDef } from '../../engine/types';
import C6_MathematicsPairLinesIntersectingSim from '../../../simulations/c6_12/C6_MathematicsPairLinesIntersectingSim';

/** v3 wrapped master — C6_MathematicsPairLinesIntersectingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicspairlinesintersectingsim: SimDef = {
    id: 'v3w_c6_mathematicspairlinesintersectingsim',
    title: 'Pair Lines Intersecting',
    subtitle: 'This node covers identifying and defining parallel, intersecting, and perpendicular line.',
    classLevel: 6, subject: 'mathematics', topic: 'Types of Lines: Parallel, Intersecting, Perpendicular',
    chapters: [],
    nodeIds: ['c6_math_ch07_071', 'c6_math_ch07_082', 'c6_math_ch07_080', 'c6_math_ch02_019', 'c6_math_ch11_116'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a railway track and wondered why the two iron rails never touch each other?', goal: 'Master Pair Lines Intersecting.' },
    discovery: {
        question: 'Two lines are drawn on a paper. One is horizontal and one is vertical. They meet at a corner. Are they parallel, intersecting, or perpendicular?',
        options: ['They are perpendicular', 'intersecting', 'perpendicular'],
        answer: 'They are perpendicular',
        hook: 'Students often believe that if two lines are "close" to each other but don\'t touch on the paper, they are parallel.',
    },
    teaching: [
        { title: 'Lines are classified by their mutual.', text: 'Lines are classified by their mutual position: parallel lines never intersect despite infinite extension, intersecting lines share exactly one common point, and perpendicular lines are a special case.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch07_071', title: 'Lines are classified by their mutual.',
          scaffold: { problem: 'A carpenter is building a wooden frame. He joins two beams of wood, each 2 metres long, such that they form a perfect corner of a book.',
            steps: [
            { text: 'Identify the beams as Beam A, Beam B, and Beam C.' },
            { text: 'Beam A and Beam B meet at a corner (right angle), so they are perpendicular.' },
            { text: 'Beam C is placed parallel to Beam A.' },
            { text: 'Since Beam C is parallel to A, and A is perpendicular to B, Beam C must also be perpendicular to B.', faded: true, blankAnswer: 'Beam A ⊥ Beam B; Beam A ∥ Beam C; Beam B ⊥ Beam C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_082', title: 'A transversal is a line that intersects.',
          scaffold: { problem: 'Two parallel metal rods for a fence are cut by a diagonal support beam.',
            steps: [
            { text: 'Identify that the two rods are parallel and the beam is the transversal.' },
            { text: 'Recognize that the angle given and the required co-interior angle are on the same side of the transversal.' },
            { text: 'Apply the property that co-interior angles add up to 180°.' },
            { text: 'Calculate 180° - 70° = 110°.', faded: true, blankAnswer: '110°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_080', title: 'Constructing triangles is the process.',
          scaffold: { problem: 'Construct a triangle with sides 4 cm, 5 cm, and 6 cm.',
            steps: [
            { text: 'Draw a line segment AB of 6 cm using a ruler.' },
            { text: 'Open the compass to 4 cm. Place the pointer on A and draw an arc above the line.' },
            { text: 'Open the compass to 5 cm. Place the pointer on B and draw another arc intersecting the first one at point C.' },
            { text: 'Use the ruler to draw lines AC and BC.' },
            { text: 'Verify the lengths of AC and BC with a ruler to ensure they are 4 cm and 5 cm.', faded: true, blankAnswer: 'A triangle ABC with sides AB=6cm, AC=4cm, BC=5cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_019', title: 'Adding integers is the process of.',
          scaffold: { problem: 'A submarine is at a depth of 50 metres below sea level (-50). It then rises 20 metres. What is its new depth?',
            steps: [
            { text: 'Identify current position as -50.' },
            { text: 'Identify "rising" as a positive movement of +20.' },
            { text: 'Set up the expression: (-50) + (+20).' },
            { text: 'On a number line, start at -50 and move 20 units to the right.' },
            { text: 'Landing point is -30.', faded: true, blankAnswer: '-30 metres (or 30 metres below sea level).' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_116', title: 'A perpendicular bisector of a line.',
          scaffold: { problem: 'You have a 12 cm long wooden stick. Construct a perpendicular bisector to split it into two 6 cm pieces.',
            steps: [
            { text: 'Draw a 12 cm line segment AB using a ruler.' },
            { text: 'Open the compass to a radius of 7 cm (which is more than half of 12 cm).' },
            { text: 'Place the compass point on A and draw arcs above and below the line.' },
            { text: 'Keeping the compass at 7 cm, place the point on B and draw arcs intersecting the first two.' },
            { text: 'Use a ruler to join the two intersection points with a line.', faded: true, blankAnswer: 'A line crossing the 12 cm stick exactly at 6 cm.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch07_082', title: 'Identify each idea',
          dissect: { specimen: 'Pair Lines Intersecting', spots: [
            { id: 's1', label: 'Lines are classified by their', prompt: 'Which idea is this? — Lines are classified by their mutual position: parallel lines never intersect despite.', answer: 'Lines are classified by their', options: ['Lines are classified by their', 'A transversal is a line', 'Constructing triangles is the process', 'Adding integers is the process'] },
            { id: 's2', label: 'A transversal is a line', prompt: 'Which idea is this? — A transversal is a line that intersects two or more other lines at distinct points.', answer: 'A transversal is a line', options: ['A transversal is a line', 'Lines are classified by their', 'Constructing triangles is the process', 'Adding integers is the process'] },
            { id: 's3', label: 'Constructing triangles is the process', prompt: 'Which idea is this? — Constructing triangles is the process of using a ruler and a compass to draw a triangle.', answer: 'Constructing triangles is the process', options: ['Constructing triangles is the process', 'Lines are classified by their', 'A transversal is a line', 'Adding integers is the process'] },
            { id: 's4', label: 'Adding integers is the process', prompt: 'Which idea is this? — Adding integers is the process of combining two numbers that include positive values,.', answer: 'Adding integers is the process', options: ['Adding integers is the process', 'Lines are classified by their', 'A transversal is a line', 'Constructing triangles is the process'] },
            { id: 's5', label: 'A perpendicular bisector of a', prompt: 'Which idea is this? — A perpendicular bisector of a line segment is a line that divides the segment into two.', answer: 'A perpendicular bisector of a', options: ['A perpendicular bisector of a', 'Lines are classified by their', 'A transversal is a line', 'Constructing triangles is the process'] }
          ] } }
    ],
    explore: { component: C6_MathematicsPairLinesIntersectingSim, prompt: 'Explore the interactive — Pair Lines Intersecting' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch07_071', difficulty: 'standard',
          question: 'Lines are classified by their mutual position: parallel lines never intersect.',
          hint: 'Review Section 2.3 of the textbook regarding the definition of a line.',
          misconception: 'Students often believe that if two lines are "close" to each other but don\'t touch on the paper, they are parallel.',
          parts: [
                { id: 'a', prompt: 'What do we call two lines that cross each other at a single point?', answer: 'These are called intersecting lines',
                  options: ['These are called intersecting lines', 'parallel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if two lines are "close" to each other but don\'t touch on the paper, they are parallel.' },
                { id: 'b', prompt: 'Two lines are drawn on a paper. One is horizontal and one is vertical. They meet at a corner. Are they parallel, intersecting, or perpendicular?', answer: 'They are perpendicular',
                  options: ['They are perpendicular', 'intersecting', 'perpendicular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if two lines are "close" to each other but don\'t touch on the paper, they are parallel.' },
                { id: 'c', prompt: 'If I extend two parallel lines for 1 kilometre, will they eventually meet? Why?', answer: 'No, they will never meet',
                  options: ['No, they will never meet', 'suggests the student thinks parallel lines are just'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if two lines are "close" to each other but don\'t touch on the paper, they are parallel.' }
          ],
            remediations: { 'if-two-lines-are-close': { steps: ['Ask the student to place a ruler along each line and extend the lines further off the edge of the paper using a pencil.', 'Ask: "If you keep drawing, will the gap between these lines grow or shrink?" If the gap changes, they are not parallel;.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_082', difficulty: 'standard',
          question: 'A transversal is a line that intersects two or more other lines at distinct.',
          hint: 'Review the definitions of vertically opposite angles and linear pairs.',
          misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.',
          parts: [
                { id: 'a', prompt: 'If a transversal cuts two parallel lines, how do we describe angles that are on the same side of the transversal and in the same relative position at each.', answer: 'These are called corresponding angles',
                  options: ['These are called corresponding angles', 'alternate', 'top-left'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' },
                { id: 'b', prompt: 'If you have two parallel lines and a transversal, and you know one angle is 60°, how can you determine the measure of its co-interior angle?', answer: 'You subtract 60° from 180° to get 120°',
                  options: ['You subtract 60° from 180° to get 120°', 'all angles created by a transversal are equal', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' },
                { id: 'c', prompt: 'A transversal crosses two parallel lines. One angle is 110°. What is the measure of its vertically opposite angle, and what is its alternate interior angle?', answer: 'Both are 110°',
                  options: ['Both are 110°', 'property of vertically opposite or alternate angles', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' }
          ],
            remediations: { 'all-angles-formed-by-a': { steps: ['Ask the student to draw the parallel lines and transversal with a very sharp pencil and use two different colors: one.', 'Point out that all "color A" angles are equal to each other, and all "color B" angles are equal to each other.', 'Finally, show them that any acute angle plus any obtuse angle must form a straight line, totaling 180°.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_082', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.',
          parts: [
                { id: 'a', prompt: 'If a line crosses two lines and the alternate interior angles are NOT equal, what can you conclude about the two lines?', answer: 'The lines are not parallel',
                  options: ['The lines are not parallel', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' }
          ],
            remediations: { 'all-angles-formed-by-a': { steps: ['Ask the student to draw the parallel lines and transversal with a very sharp pencil and use two different colors: one.', 'Point out that all "color A" angles are equal to each other, and all "color B" angles are equal to each other.', 'Finally, show them that any acute angle plus any obtuse angle must form a straight line, totaling 180°.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_080', difficulty: 'standard',
          question: 'Constructing triangles is the process of using a ruler and a compass to draw a.',
          hint: 'Review the definition of a "line segment" and "vertex" in Chapter 2.',
          misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing triangles is the process of using a ruler and a compass to draw a triangle',
                  options: ['Constructing triangles is the process of using a ruler and a compass to draw a triangle', 'Lines are classified by their mutual position: parallel lines never intersect despite', 'A transversal is a line that intersects two or more other lines at distinct points', 'Adding integers is the process of combining two numbers that include positive values,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs without measuring them.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student is stuck, have them draw a circle with the compass first.', 'Ask: "Every point on this circle is exactly 5 cm from the center, right?" Then, draw a second circle from the other.', 'Ask: "Where do these circles cross?" Explain that the intersection is the only point that is *both* 5 cm from the left.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_080', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs.',
          parts: [
                { id: 'a', prompt: 'If two students construct a triangle with the same measurements (SSS), will their triangles be identical in shape and size? Justify your answer.', answer: 'Yes, because the SSS criteria uniquely defines a triangle',
                  options: ['Yes, because the SSS criteria uniquely defines a triangle', 'change shape', 'triangles can "change shape" even when side lengths are restricted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs without measuring them.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student is stuck, have them draw a circle with the compass first.', 'Ask: "Every point on this circle is exactly 5 cm from the center, right?" Then, draw a second circle from the other.', 'Ask: "Where do these circles cross?" Explain that the intersection is the only point that is *both* 5 cm from the left.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_019', difficulty: 'standard',
          question: 'Adding integers is the process of combining two numbers that include positive.',
          hint: 'Review the "Other Side of Zero" section regarding the number line and floor levels.',
          misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adding integers is the process of combining two numbers that include positive values,',
                  options: ['Adding integers is the process of combining two numbers that include positive values,', 'Lines are classified by their mutual position: parallel lines never intersect despite', 'A transversal is a line that intersects two or more other lines at distinct points', 'Constructing triangles is the process of using a ruler and a compass to draw a triangle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the sign of the sum when adding a positive and a negative number.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['If a student gets this wrong, have them draw a number line.', 'Ask them to put their finger on the first number (+3).', 'Then, tell them: "The second number is -7, which means move 7 steps to the left." Physically counting the steps.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_116', difficulty: 'standard',
          question: 'A perpendicular bisector of a line segment is a line that divides the segment.',
          hint: 'Review the "Line Segment" section in Chapter 11 to ensure you can identify endpoints.',
          misconception: 'Students often change the width of the compass after drawing the first set of arcs.',
          parts: [
                { id: 'a', prompt: 'What is the primary characteristic of a perpendicular bisector in relation to the line segment it crosses?', answer: 'It divides the segment into two equal parts and forms a 90-degree angle',
                  options: ['It divides the segment into two equal parts and forms a 90-degree angle', 'it just cuts the line in half', 'perpendicular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often change the width of the compass after drawing the first set of arcs.' }
          ],
            remediations: { 'students-often-change-the-width': { steps: ['Ask the student to place the compass on point A and draw a circle, then keep that exact same compass width and place it.', 'Explain that because the width (radius) didn\'t change, the two circles are identical, which is the secret to finding.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
