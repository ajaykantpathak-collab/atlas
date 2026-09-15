import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch11_p1: SimDef = {
    id: 'v3_c6_math_ch11_p1',
    title: 'Practical Geometry · Part 1/2',
    subtitle: 'This node covers the introduction to geometric tools and the basic concept.',
    classLevel: 6, subject: 'mathematics', topic: 'Practical Geometry · Part 1/2',
    chapters: ['c6_math_ch11'],
    nodeIds: ['c6_math_ch11_113', 'c6_math_ch11_114', 'c6_math_ch11_115', 'c6_math_ch11_116', 'c6_math_ch11_117', 'c6_math_ch11_118'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are asked to draw a perfect square on a piece of paper; if you just use a pencil, it might look.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students argue over whose angle is bigger — one drew a small opening with very long arms, the other a wide opening with tiny arms. Who actually wins?',
        options: ['The wide opening — an angle is the turn at the vertex, and arm length does not matter', 'The long arms — longer lines always mean a bigger angle', 'They tie — every drawn angle is the same size', 'Neither — angles cannot be compared without colours'],
        answer: 'The wide opening — an angle is the turn at the vertex, and arm length does not matter',
        hook: 'Construction means replacing guessing with measuring — ruler for straight lines, compass for curves, protractor centred on the vertex. And you need not start at zero: drawing from the 1 cm mark to the 6 cm mark still gives exactly 5 cm.',
    },
    teaching: [
        { title: 'Introduction to Geometric Construction', text: 'Geometric construction is the systematic and precise process of drawing figures like lines, angles, and shapes using specific tools such as a ruler, compass, and protractor.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch11_113', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Open the geometry box — pick the right tool for each task — and construct a 5 cm segment and an exact angle, placing the protractor centre dead on the vertex.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_113', title: 'Introduction to Geometric Construction',
          scaffold: { problem: 'Draw a line segment AB of length 7.5 cm and then construct a 60° angle at point A.',
            steps: [
            { text: 'Use a ruler to mark point A at 0 cm and point B at 7.5 cm, then join them.' },
            { text: 'Place the protractor center on point A and align the 0° base line with segment AB.' },
            { text: 'Find the 60° mark on the protractor scale and make a small point on the paper.' },
            { text: 'Use the ruler to join point A to that new mark to create the second arm of the angle.' },
            { text: 'Label the angle to verify it is 60°.', faded: true, blankAnswer: 'A 7.5 cm line segment with a 60° angle at one end.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_114', title: 'Constructing Line Segments',
          scaffold: { problem: 'You need to create a base for a paper flag that is exactly 8.5 cm long.',
            steps: [
            { text: 'Identify that 8.5 cm is 8 cm and 5 small millimetre marks.' },
            { text: 'Lay the ruler flat on the paper and hold it firmly.' },
            { text: 'Mark a dot exactly at the \'0\' mark.' },
            { text: 'Count 8 full centimetres and 5 small notches, then place the second dot at 8.5 cm.' },
            { text: 'Draw a straight line connecting the two dots and label the segment.', faded: true, blankAnswer: 'A line segment of 8.5 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_115', title: 'Constructing Angles',
          scaffold: { problem: 'Vidya needs to construct an angle of 50° to design a stand for her photo frame.',
            steps: [
            { text: 'Draw a ray AB using a ruler, where A is the vertex.' },
            { text: 'Place the protractor’s centre on point A and align the base line with ray AB.' },
            { text: 'Identify the 0° mark on the protractor that sits on ray AB.' },
            { text: 'Follow that scale to the 50° mark and place a small dot.' },
            { text: 'Remove the protractor and use the ruler to draw a line from A through the dot, naming the new point C.', faded: true, blankAnswer: '∠BAC = 50°' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_116', title: 'Constructing Perpendicular Bisectors',
          scaffold: { problem: 'You have a 12 cm long wooden stick. Construct a perpendicular bisector to split it into two 6 cm pieces.',
            steps: [
            { text: 'Draw a 12 cm line segment AB using a ruler.' },
            { text: 'Open the compass to a radius of 7 cm (which is more than half of 12 cm).' },
            { text: 'Place the compass point on A and draw arcs above and below the line.' },
            { text: 'Keeping the compass at 7 cm, place the point on B and draw arcs intersecting the first two.' },
            { text: 'Use a ruler to join the two intersection points with a line.', faded: true, blankAnswer: 'A line crossing the 12 cm stick exactly at 6 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_117', title: 'Constructing Angle Bisectors',
          scaffold: { problem: 'You have a paper corner (a right angle) and want to create a 45° fold. How do you construct this using a compass?',
            steps: [
            { text: 'Identify that a 45° angle is half of a 90° angle.' },
            { text: 'Place the compass point on the vertex (the corner of the paper).' },
            { text: 'Draw an arc across both sides of the 90° angle.' },
            { text: 'With the same compass width, draw two intersecting arcs starting from where the first arc touched the sides.' },
            { text: 'Draw a line from the vertex through the intersection point.', faded: true, blankAnswer: 'A 45° bisector line.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_118', title: 'Constructing Triangles: SSS and SAS',
          scaffold: { problem: 'Construct a triangle with sides 5cm, 6cm, and 7cm.',
            steps: [
            { text: 'Use a ruler to draw a line segment AB = 7cm.' },
            { text: 'Open the compass to 5cm. Place the needle at A and draw an arc above the line.' },
            { text: 'Open the compass to 6cm. Place the needle at B and draw an arc intersecting the first one. Label this point C.' },
            { text: 'Use the ruler to join AC and BC.', faded: true, blankAnswer: 'A triangle with sides 5cm, 6cm, and 7cm.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch11_118', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch11_113', title: 'Use it in the wild',
          caseStudy: { intro: 'A student must measure an angle drawn in a tiny diagram — its arms are too short for the protractor to reach. Meanwhile a classmate claims the 40° angle on her small notebook is \'smaller\' than the 40° angle on the classroom chart.',
            decisions: [{ prompt: 'How do you measure the short-armed angle — and is the classmate right?', options: [
                { text: 'Extend the arms with a ruler — an angle is the amount of rotation between its arms, not their length, so making the arms longer changes nothing about the opening and lets the protractor sit properly. That is also why the classmate is wrong: a 40° angle is 40° whether drawn on a stamp or a wall.', outcome: 'Arm length is decoration; rotation is the angle. Extending the arms is the standard fix and it cannot alter the measurement.' },
                { text: 'Nothing can be done — short arms make the angle unmeasurable, so she should just guess.', outcome: 'The arms can always be extended with a straightedge — the opening between them stays identical while the arms grow.', reveals: 'short-arms-cant-measure' },
                { text: 'The classmate is right — a bigger drawing means a bigger angle, since the arms cover more paper.', outcome: 'Angles measure rotation, not reach — two 40° angles are identical however long their arms are drawn.', reveals: 'arm-length-changes-angle' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch11_118', title: 'The bigger picture',
          caseStudy: { intro: 'A freehand sketch hopes to be right; a construction knows it is right. The tools turn looking close into measuring exactly.',
            decisions: [{ prompt: 'What comes next? Practical Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Practical Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch11_113', difficulty: 'standard',
          question: 'Geometric construction is the systematic and precise process of drawing figures.',
          hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
          misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.',
          parts: [
                { id: 'a', prompt: 'If you need to draw a circle with a specific radius, which tool from your geometry box should you choose and why?', answer: 'You should choose the compass',
                  options: ['You should choose the compass', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' },
                { id: 'b', prompt: 'A student is asked to draw a line segment 5 cm long. They place the ruler on the paper and draw a line from the 1 cm mark to the 6 cm mark. Is this correct?', answer: 'Yes, this is correct',
                  options: ['Yes, this is correct', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' },
                { id: 'c', prompt: 'Why is it important to place the center of the protractor exactly on the vertex of an angle when measuring?', answer: 'The vertex is the point where the two rays (arms) of the angle meet',
                  options: ['The vertex is the point where the two rays (arms) of the angle meet', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' }
          ],
            remediations: { 'the-size-of-an-angle': { steps: ['Take two straws joined by a paper clip.', 'Rotate the arms to form an angle, then stretch the straws further out (without changing the angle).', 'Ask the student: "Did I turn the clip?" They will see the angle remains the same.', 'Explain that the angle is the "opening" or "turn" at the vertex, not the physical length of the lines.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_113', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.',
          parts: [
                { id: 'a', prompt: 'If you are asked to draw an angle and you only have a ruler, can you construct it accurately? Why or why not?', answer: 'No, a ruler can only draw straight lines',
                  options: ['No, a ruler can only draw straight lines', 'the size of an angle changes if the length of its arms changes'],
                  hint: 'Review the definitions of points, lines, and rays in the previous chapter.',
                  misconception: 'Students often assume that the size of an angle changes if the length of its arms changes.' }
          ],
            remediations: { 'the-size-of-an-angle': { steps: ['Take two straws joined by a paper clip.', 'Rotate the arms to form an angle, then stretch the straws further out (without changing the angle).', 'Ask the student: "Did I turn the clip?" They will see the angle remains the same.', 'Explain that the angle is the "opening" or "turn" at the vertex, not the physical length of the lines.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_114', difficulty: 'standard',
          question: 'A line segment is the shortest path between two distinct points on a surface.',
          hint: 'Review the "Point" and "Line Segment" definitions in the chapter introduction.',
          misconception: 'Students often start measuring from the very edge of the ruler (the physical end of the plastic) rather than the \'0\'.',
          parts: [
                { id: 'a', prompt: 'What are the two essential components that define a line segment?', answer: 'A line segment has two fixed endpoints and a specific, measurable length',
                  options: ['A line segment has two fixed endpoints and a specific, measurable length', 'it goes on forever'],
                  hint: 'Review the "Point" and "Line Segment" definitions in the chapter introduction to understand why.',
                  misconception: 'Students often start measuring from the very edge of the ruler (the physical end of the plastic) rather than the \'0\' mark.' }
          ],
            remediations: { 'students-often-start-measuring-from': { steps: ['Have the student look closely at the ruler to find the \'0\' line, not the physical edge of the plastic.', 'Ask them to place a small dot at \'0\' and another at \'5\'.', 'Remind them that the distance between the two dots is the length.', 'Practice by drawing a 3 cm segment starting at the \'0\' mark and checking it against the \'3\' mark.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_115', difficulty: 'standard',
          question: 'Constructing an angle is the process of using a protractor and a straightedge.',
          hint: 'Review the definition of a ray (starts at a point, goes on endlessly).',
          misconception: 'Students often mix up the inner and outer scales of the protractor, especially when the ray points to the left.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing an angle is the process of using a protractor and a straightedge to create a',
                  options: ['Constructing an angle is the process of using a protractor and a straightedge to create a', 'Geometric construction is the systematic and precise process of drawing figures like', 'A line segment is the shortest path between two distinct points on a surface, possessing', 'A perpendicular bisector of a line segment is a line that divides the segment into two'],
                  hint: 'Review the definition of a ray (starts at a point, goes on endlessly).',
                  misconception: 'Students often mix up the inner and outer scales of the protractor, especially when the ray points to the left.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['Ask the student to place their finger on the "0" mark where the ray starts.', 'Ask, "Does the 0 start on the inner scale or the outer scale?" Remind them that they must follow that same scale all.', 'Have them trace the ray with a highlighter to visually lock in the correct scale before marking the point.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_116', difficulty: 'standard',
          question: 'A perpendicular bisector of a line segment is a line that divides the segment.',
          hint: 'Review the "Line Segment" section in Chapter 11 to ensure you can identify endpoints.',
          misconception: 'Students often change the width of the compass after drawing the first set of arcs.',
          parts: [
                { id: 'a', prompt: 'What is the primary characteristic of a perpendicular bisector in relation to the line segment it crosses?', answer: 'It divides the segment into two equal parts and forms a 90-degree angle',
                  options: ['It divides the segment into two equal parts and forms a 90-degree angle', 'it just cuts the line in half', 'perpendicular', 'it just crosses at 90 degrees'],
                  hint: 'Review the "Line Segment" section in Chapter 11 to ensure you can identify endpoints correctly.',
                  misconception: 'Students often change the width of the compass after drawing the first set of arcs.' }
          ],
            remediations: { 'students-often-change-the-width': { steps: ['Ask the student to place the compass on point A and draw a circle, then keep that exact same compass width and place.', 'Explain that because the width (radius) didn\'t change, the two circles are identical, which is the secret to finding.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_117', difficulty: 'standard',
          question: 'An angle bisector is a ray that starts at the vertex of an angle and divides.',
          hint: 'Review how to draw arcs and circles with a compass.',
          misconception: 'Students often change the compass radius while drawing the two arcs from the intersection points.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of an angle bisector?', answer: 'An angle bisector divides an angle into two equal parts',
                  options: ['An angle bisector divides an angle into two equal parts', 'it makes the angle smaller'],
                  hint: 'Review how to draw arcs and circles with a compass.',
                  misconception: 'Students often change the compass radius while drawing the two arcs from the intersection points.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['If a student fails, have them draw a large 80° angle on paper.', 'Tell them to keep their compass locked by tightening the screw.', 'Watch them draw the first arc from the vertex.', 'Then, supervise them placing the needle on each side-mark without touching the adjustment knob.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_118', difficulty: 'standard',
          question: 'Constructing triangles using SSS (Side-Side-Side) and SAS (Side-Angle-Side).',
          hint: 'Review "Measuring Angles" and "Line Segments" from Chapter 2.',
          misconception: 'Students often try to draw the two shorter sides first without checking their intersection, or they measure the angle.',
          parts: [
                { id: 'a', prompt: 'In an SSS construction, what tool do you use to ensure the third vertex is exactly the right distance from the two ends of your base line?', answer: 'You use a compass',
                  options: ['You use a compass', 'a ruler'],
                  hint: 'Review "Measuring Angles" and "Line Segments" from Chapter 2.',
                  misconception: 'Students often try to draw the two shorter sides first without checking their intersection, or they measure the angle incorrectly by not.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student fails, have them re-measure their base line with a ruler to ensure it is exactly the length required.', 'Then, watch them set the compass: ensure they put the needle on 0 and the pencil on the required length mark on the.', 'Finally, guide them to keep the compass point firmly on the base-line endpoint while drawing the arc.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
