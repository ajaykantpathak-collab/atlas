import type { SimDef } from '../../engine/types';
import C6_MathematicsConstructionsDrawingLineSim from '../../../simulations/c6_12/C6_MathematicsConstructionsDrawingLineSim';

/** v3 wrapped master — C6_MathematicsConstructionsDrawingLineSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicsconstructionsdrawinglinesim: SimDef = {
    id: 'v3w_c6_mathematicsconstructionsdrawinglinesim',
    title: 'Introduction to Geometric Construction',
    subtitle: 'This node covers the introduction to geometric tools and the basic concept of.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Geometric Construction',
    chapters: [],
    nodeIds: ['c6_math_ch11_113', 'c6_math_ch11_114', 'c6_math_ch11_115', 'c6_math_ch10_108', 'c6_math_ch07_080', 'c6_math_ch07_081', 'c6_math_ch11_118', 'c6_math_ch11_117', 'c6_math_ch07_070', 'c6_math_ch07_071', 'c6_math_ch07_072', 'c6_math_ch11_116', 'c6_math_ch10_105', 'c6_math_ch10_109'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are asked to draw a perfect square on a piece of paper; if you just use a pencil, it might look.', goal: 'Master Introduction to Geometric Construction.' },
    discovery: {
        question: 'What is a "line of symmetry" in a paper-cutting activity? [Recall]',
        options: ['It is the specific line along', 'overlapping', 'mirroring'],
        answer: 'It is the specific line along',
        hook: 'Students often confuse line symmetry with rotational symmetry.',
    },
    teaching: [
        { title: 'Geometric construction is the systematic and.', text: 'Geometric construction is the systematic and precise process of drawing figures like lines, angles, and shapes using specific tools such as a ruler, compass, and protractor.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch11_113', title: 'Geometric construction is the.',
          scaffold: { problem: 'Draw a line segment AB of length 7.5 cm and then construct a 60° angle at point A.',
            steps: [
            { text: 'Use a ruler to mark point A at 0 cm and point B at 7.5 cm, then join them.' },
            { text: 'Place the protractor center on point A and align the 0° base line with segment AB.' },
            { text: 'Find the 60° mark on the protractor scale and make a small point on the paper.' },
            { text: 'Use the ruler to join point A to that new mark to create the second arm of the angle.' },
            { text: 'Label the angle to verify it is 60°.', faded: true, blankAnswer: 'A 7.5 cm line segment with a 60° angle at one end.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_114', title: 'A line segment is the shortest path.',
          scaffold: { problem: 'You need to create a base for a paper flag that is exactly 8.5 cm long.',
            steps: [
            { text: 'Identify that 8.5 cm is 8 cm and 5 small millimetre marks.' },
            { text: 'Lay the ruler flat on the paper and hold it firmly.' },
            { text: 'Mark a dot exactly at the \'0\' mark.' },
            { text: 'Count 8 full centimetres and 5 small notches, then place the second dot at 8.5 cm.' },
            { text: 'Draw a straight line connecting the two dots and label the segment.', faded: true, blankAnswer: 'A line segment of 8.5 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_115', title: 'Constructing an angle is the process of.',
          scaffold: { problem: 'Vidya needs to construct an angle of 50° to design a stand for her photo frame.',
            steps: [
            { text: 'Draw a ray AB using a ruler, where A is the vertex.' },
            { text: 'Place the protractor’s centre on point A and align the base line with ray AB.' },
            { text: 'Identify the 0° mark on the protractor that sits on ray AB.' },
            { text: 'Follow that scale to the 50° mark and place a small dot.' },
            { text: 'Remove the protractor and use the ruler to draw a line from A through the dot, naming the new point C.', faded: true, blankAnswer: '∠BAC = 50°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_112', title: 'Creating symmetric shapes involves.',
          scaffold: { problem: 'You have a rectangular piece of paper (10cm x 6cm). You fold it once horizontally to make a line of symmetry.',
            steps: [
            { text: 'Identify that folding creates a line of symmetry at the center.' },
            { text: 'The triangle is 2cm above the fold, so its reflection will be 2cm below the fold.' },
            { text: 'Total distance = Distance above fold + Distance below fold.' },
            { text: '2cm + 2cm = 4cm.', faded: true, blankAnswer: '4 cm' }
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
        { type: 'scaffold', nodeId: 'c6_math_ch07_081', title: 'A perpendicular line is a line that.',
          scaffold: { problem: 'You have a line segment AB that is 10cm long. Construct its perpendicular bisector to find the center point.',
            steps: [
            { text: 'Place the compass point at A and open it to a width greater than 5cm (e.g., 7cm).' },
            { text: 'Draw an arc above and below the line segment.' },
            { text: 'Without changing the compass width, move the compass point to B.' },
            { text: 'Draw two more arcs that intersect the first two arcs above and below the line.' },
            { text: 'Use your ruler to draw a line connecting the two intersection points; this line passes through the 5cm mark.', faded: true, blankAnswer: 'A line crossing segment AB at the 5cm mark at a 90° angle.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch11_114', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Geometric Construction', spots: [
            { id: 's1', label: 'Geometric construction is the systematic', prompt: 'Which idea is this? — Geometric construction is the systematic and precise process of drawing figures like.', answer: 'Geometric construction is the systematic', options: ['Geometric construction is the systematic', 'A line segment is the', 'Constructing an angle is the', 'Creating symmetric shapes involves constructing'] },
            { id: 's2', label: 'A line segment is the', prompt: 'Which idea is this? — A line segment is the shortest path between two distinct points on a surface, possessing.', answer: 'A line segment is the', options: ['A line segment is the', 'Geometric construction is the systematic', 'Constructing an angle is the', 'Creating symmetric shapes involves constructing'] },
            { id: 's3', label: 'Constructing an angle is the', prompt: 'Which idea is this? — Constructing an angle is the process of using a protractor and a straightedge to create a.', answer: 'Constructing an angle is the', options: ['Constructing an angle is the', 'Geometric construction is the systematic', 'A line segment is the', 'Creating symmetric shapes involves constructing'] },
            { id: 's4', label: 'Creating symmetric shapes involves constructing', prompt: 'Which idea is this? — Creating symmetric shapes involves constructing a figure where one part is a perfect.', answer: 'Creating symmetric shapes involves constructing', options: ['Creating symmetric shapes involves constructing', 'Geometric construction is the systematic', 'A line segment is the', 'Constructing an angle is the'] },
            { id: 's5', label: 'Constructing triangles is the process', prompt: 'Which idea is this? — Constructing triangles is the process of using a ruler and a compass to draw a triangle.', answer: 'Constructing triangles is the process', options: ['Constructing triangles is the process', 'Geometric construction is the systematic', 'A line segment is the', 'Constructing an angle is the'] },
            { id: 's6', label: 'A perpendicular line is a', prompt: 'Which idea is this? — A perpendicular line is a line that meets another at a right angle (90°), while an angle.', answer: 'A perpendicular line is a', options: ['A perpendicular line is a', 'Geometric construction is the systematic', 'A line segment is the', 'Constructing an angle is the'] }
          ] } }
    ],
    explore: { component: C6_MathematicsConstructionsDrawingLineSim, prompt: 'Explore the interactive — Introduction to Geometric Construction' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch11_113', difficulty: 'standard',
          question: 'Geometric construction is the systematic and precise process of drawing figures.',
          hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
          misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.',
          parts: [
                { id: 'a', prompt: 'If you need to draw a circle with a specific radius, which tool from your geometry box should you choose and why?', answer: 'You should choose the compass',
                  options: ['You should choose the compass', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' },
                { id: 'b', prompt: 'A student is asked to draw a line segment 5 cm long. They place the ruler on the paper and draw a line from the 1 cm mark to the 6 cm mark. Is this correct?', answer: 'Yes, this is correct',
                  options: ['Yes, this is correct', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' },
                { id: 'c', prompt: 'Why is it important to place the center of the protractor exactly on the vertex of an angle when measuring?', answer: 'The vertex is the point where the two rays (arms) of the angle meet',
                  options: ['The vertex is the point where the two rays (arms) of the angle meet', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' }
          ],
            remediations: { 'the-size-of-an-angle': { steps: ['Take two straws joined by a paper clip.', 'Rotate the arms to form an angle, then stretch the straws further out (without changing the angle).', 'Ask the student: "Did I turn the clip?" They will see the angle remains the same.', 'Explain that the angle is the "opening" or "turn" at the vertex, not the physical length of the lines.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_113', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.',
          parts: [
                { id: 'a', prompt: 'If you are asked to draw an angle and you only have a ruler, can you construct it accurately? Why or why not?', answer: 'No, a ruler can only draw straight lines',
                  options: ['No, a ruler can only draw straight lines', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' }
          ],
            remediations: { 'the-size-of-an-angle': { steps: ['Take two straws joined by a paper clip.', 'Rotate the arms to form an angle, then stretch the straws further out (without changing the angle).', 'Ask the student: "Did I turn the clip?" They will see the angle remains the same.', 'Explain that the angle is the "opening" or "turn" at the vertex, not the physical length of the lines.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_114', difficulty: 'standard',
          question: 'A line segment is the shortest path between two distinct points on a surface,.',
          hint: 'Review the "Point" and "Line Segment" definitions in the chapter introduction to.',
          misconception: 'Students often start measuring from the very edge of the ruler (the physical end of the plastic) rather than the \'0\'.',
          parts: [
                { id: 'a', prompt: 'What are the two essential components that define a line segment?', answer: 'A line segment has two fixed endpoints and a specific, measurable length',
                  options: ['A line segment has two fixed endpoints and a specific, measurable length', 'it goes on forever'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often start measuring from the very edge of the ruler (the physical end of the plastic) rather than the \'0\' mark.' }
          ],
            remediations: { 'students-often-start-measuring-from': { steps: ['Have the student look closely at the ruler to find the \'0\' line, not the physical edge of the plastic.', 'Ask them to place a small dot at \'0\' and another at \'5\'.', 'Remind them that the distance between the two dots is the length.', 'Practice by drawing a 3 cm segment starting at the \'0\' mark and checking it against the \'3\' mark.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_115', difficulty: 'standard',
          question: 'Constructing an angle is the process of using a protractor and a straightedge.',
          hint: 'Review the definition of a ray (starts at a point, goes on endlessly).',
          misconception: 'Students often mix up the inner and outer scales of the protractor, especially when the ray points to the left.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing an angle is the process of using a protractor and a straightedge to create a',
                  options: ['Constructing an angle is the process of using a protractor and a straightedge to create a', 'Geometric construction is the systematic and precise process of drawing figures like', 'A line segment is the shortest path between two distinct points on a surface, possessing', 'Creating symmetric shapes involves constructing a figure where one part is a perfect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mix up the inner and outer scales of the protractor, especially when the ray points to the left.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['Ask the student to place their finger on the "0" mark where the ray starts.', 'Ask, "Does the 0 start on the inner scale or the outer scale?" Remind them that they must follow that same scale all.', 'Have them trace the ray with a highlighter to visually lock in the correct scale before marking the point.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_112', difficulty: 'standard',
          question: 'Creating symmetric shapes involves constructing a figure where one part is a.',
          hint: 'Review the properties of basic 2D shapes and distance measurement on a grid.',
          misconception: 'Students often confuse line symmetry with rotational symmetry.',
          parts: [
                { id: 'a', prompt: 'What is a "line of symmetry" in a paper-cutting activity? [Recall]', answer: 'It is the specific line along',
                  options: ['It is the specific line along', 'overlapping', 'mirroring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse line symmetry with rotational symmetry.' },
                { id: 'b', prompt: 'Draw a rectangle on a grid. If you are given a vertical line of symmetry passing through the center, how do you find the position of a point that is 2 units to.', answer: 'You place the corresponding point 2 units to the left of the line',
                  options: ['You place the corresponding point 2 units to the left of the line', '3 units', 'same side'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse line symmetry with rotational symmetry.' }
          ],
            remediations: { 'students-often-confuse-line-symmetry': { steps: ['First, ask the student to trace the shape on a piece of paper.', 'Have them physically fold the paper in different directions.', 'If the shapes don\'t align, tell them: "If it doesn\'t fold perfectly, it doesn\'t have line symmetry." Then, have them.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_080', difficulty: 'standard',
          question: 'Constructing triangles is the process of using a ruler and a compass to draw a.',
          hint: 'Review the definition of a "line segment" and "vertex" in Chapter 2.',
          misconception: 'Students often try to draw the third side first by guessing its length or by using a ruler to "connect" the arcs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing triangles is the process of using a ruler and a compass to draw a triangle',
                  options: ['Constructing triangles is the process of using a ruler and a compass to draw a triangle', 'Geometric construction is the systematic and precise process of drawing figures like', 'A line segment is the shortest path between two distinct points on a surface, possessing', 'Constructing an angle is the process of using a protractor and a straightedge to create a'],
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
