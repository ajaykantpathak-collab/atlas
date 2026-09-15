import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch07_p3: SimDef = {
    id: 'v3_c6_math_ch07_p3',
    title: 'Geometry · Part 3/3',
    subtitle: 'This node covers identifying angle pairs and applying their properties (equality.',
    classLevel: 6, subject: 'mathematics', topic: 'Geometry · Part 3/3',
    chapters: ['c6_math_ch07'],
    nodeIds: ['c6_math_ch07_082', 'c6_math_ch07_083', 'c6_math_ch07_084'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a railway track with a diagonal metal rod crossing over the two parallel rails?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You mark two dots on a page and a friend claims they can draw many different straight lines through both dots. Can they?',
        options: ['No — exactly one straight line passes through two given points', 'Yes — as many lines as there are colours of pen', 'Yes — but only if the dots are close together', 'No — no line can pass through two points at once'],
        answer: 'No — exactly one straight line passes through two given points',
        hook: 'A line does not stop at the edge of your paper — the arrows mean it runs forever. A line segment, with its two endpoint dots, is the stopped, measurable piece of that endless line.',
    },
    teaching: [
        { title: 'Properties of Parallel Lines and Transversals', text: 'A transversal is a line that intersects two or more other lines at distinct points.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch07_082', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Draw a dot, connect two points into a segment, then stretch it past the page in both directions — and name each figure correctly as it transforms.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_082', title: 'Properties of Parallel Lines and Transversals',
          scaffold: { problem: 'Two parallel metal rods for a fence are cut by a diagonal support beam.',
            steps: [
            { text: 'Identify that the two rods are parallel and the beam is the transversal.' },
            { text: 'Recognize that the angle given and the required co-interior angle are on the same side of the transversal.' },
            { text: 'Apply the property that co-interior angles add up to 180°.' },
            { text: 'Calculate 180° - 70° = 110°.', faded: true, blankAnswer: '110°' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch07_083', title: 'Congruence of Shapes',
          caseStudy: { intro: 'Have you ever noticed that two identical pages from your notebook can be placed perfectly on top of each other?',
            decisions: [{ prompt: 'What is the primary condition for two shapes to be called congruent?', options: [
                { text: 'Two shapes are congruent if they have the same shape and the same size', outcome: 'Two shapes are congruent if they have the same shape and the same size.' },
                { text: 'congruent', outcome: 'Not quite — Students often confuse "congruent" with "similar." They think if shapes look alike (like two.', reveals: 'students-often-confuse-congruent-with' },
                { text: 'similar', outcome: 'Not quite — Students often confuse "congruent" with "similar." They think if shapes look alike (like two.', reveals: 'students-often-confuse-congruent-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch07_084', title: 'Geometry in Real Life',
          scaffold: { problem: 'A gardener wants to create a triangular flower bed in a corner of a rectangular yard. The yard is 5m by 3m.',
            steps: [
            { text: 'Visualize the original rectangular yard (4 corners).' },
            { text: 'A triangular cut at one corner replaces one corner with two new ones.' },
            { text: 'Count: 3 original corners + 2 new corners = 5 corners.' },
            { text: 'The removed piece is a triangle (3 sides).', faded: true, blankAnswer: '5 corners; the flower bed is a triangle.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch07_084', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch07_082', title: 'Use it in the wild',
          caseStudy: { intro: 'A student planning a toy-car track wants the shortest route from point A to point B. She also writes in her notebook: \'A line is just a very long line segment.\'',
            decisions: [{ prompt: 'What should the path be — and is her definition right?', options: [
                { text: 'The shortest route is the line segment AB — straight between two endpoints. And the definition is wrong: a segment ends at both ends, while a line runs forever in both directions with no endpoints at all. No amount of length turns a segment into a line — the difference is in the endpoints, not the length.', outcome: 'Naming matters in geometry: ray, line and segment are different objects, and the endpoint count — not size — is what separates them.' },
                { text: 'She is right on both — any path works for the car, and a long enough segment becomes a line.', outcome: 'Only the straight segment is shortest, and no finite segment can become a line — a line has no endpoints by definition.', reveals: 'line-is-long-segment' },
                { text: 'The shortest route is a curve, because curves can bend around and reach faster.', outcome: 'Any bend adds length — the straight segment between two points is always the shortest path.', reveals: 'curves-are-shorter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch07_084', title: 'You made it',
          caseStudy: { intro: 'Two points fix one line forever. Points are locations, segments are journeys with ends, and lines are journeys that never end.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch07_082', difficulty: 'standard',
          question: 'A transversal is a line that intersects two or more other lines at distinct.',
          hint: 'Review the definitions of vertically opposite angles and linear pairs.',
          misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.',
          parts: [
                { id: 'a', prompt: 'If a transversal cuts two parallel lines, how do we describe angles that are on the same side of the transversal and in the same relative position at each.', answer: 'These are called corresponding angles',
                  options: ['These are called corresponding angles', 'alternate', 'top-left', 'bottom-right'],
                  hint: 'Review the definitions of vertically opposite angles and linear pairs.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' },
                { id: 'b', prompt: 'If you have two parallel lines and a transversal, and you know one angle is 60°, how can you determine the measure of its co-interior angle?', answer: 'You subtract 60° from 180° to get 120°',
                  options: ['You subtract 60° from 180° to get 120°', 'ALL angles formed by a transversal cutting two parallel lines are equal', 'all angles created by a transversal are equal'],
                  hint: 'Review the definitions of vertically opposite angles and linear pairs.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' },
                { id: 'c', prompt: 'A transversal crosses two parallel lines. One angle is 110°. What is the measure of its vertically opposite angle, and what is its alternate interior angle?', answer: 'Both are 110°',
                  options: ['Both are 110°', 'property of vertically opposite or alternate angles', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Review the definitions of vertically opposite angles and linear pairs.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' },
                { id: 'd', prompt: 'Compare corresponding angles and co-interior angles. Which pair is always equal, and which pair always adds up to 180 degrees?', answer: 'Corresponding angles are always equal, while co-interior angles add up to 180°',
                  options: ['Corresponding angles are always equal, while co-interior angles add up to 180°', 'opening', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Review the definitions of vertically opposite angles and linear pairs.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' }
          ],
            remediations: { 'all-angles-formed-by-a': { steps: ['Ask the student to draw the parallel lines and transversal with a very sharp pencil and use two different colors: one.', 'Point out that all "color A" angles are equal to each other, and all "color B" angles are equal to each other.', 'Finally, show them that any acute angle plus any obtuse angle must form a straight line, totaling 180°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_082', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.',
          parts: [
                { id: 'a', prompt: 'If a line crosses two lines and the alternate interior angles are NOT equal, what can you conclude about the two lines?', answer: 'The lines are not parallel',
                  options: ['The lines are not parallel', 'ALL angles formed by a transversal cutting two parallel lines are equal'],
                  hint: 'Review the definitions of vertically opposite angles and linear pairs.',
                  misconception: 'Students often assume that ALL angles formed by a transversal cutting two parallel lines are equal.' }
          ],
            remediations: { 'all-angles-formed-by-a': { steps: ['Ask the student to draw the parallel lines and transversal with a very sharp pencil and use two different colors: one.', 'Point out that all "color A" angles are equal to each other, and all "color B" angles are equal to each other.', 'Finally, show them that any acute angle plus any obtuse angle must form a straight line, totaling 180°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_083', difficulty: 'standard',
          question: 'Two geometric shapes are congruent if they have the exact same shape and size.',
          hint: 'Review how to measure lengths and angles accurately.',
          misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different.',
          parts: [
                { id: 'a', prompt: 'What is the primary condition for two shapes to be called congruent?', answer: 'Two shapes are congruent if they have the same shape and the same size',
                  options: ['Two shapes are congruent if they have the same shape and the same size', 'congruent', 'similar', 'if shapes look alike (like two triangles of different sizes), they are congruent'],
                  hint: 'Review how to measure lengths and angles accurately.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' },
                { id: 'b', prompt: 'Compare a small photograph and a large poster of the same person. Are they congruent? Analyze the relationship between their shape and size.', answer: 'They are not congruent',
                  options: ['They are not congruent', 'congruent', 'similar', 'if shapes look alike (like two triangles of different sizes), they are congruent'],
                  hint: 'Review how to measure lengths and angles accurately.',
                  misconception: 'Students often confuse "congruent" with "similar." They think if shapes look alike (like two triangles of different sizes), they are.' }
          ],
            remediations: { 'students-often-confuse-congruent-with': { steps: ['Ask the student to place a small triangle on a larger one.', 'Ask: "Does the small one cover the large one exactly?" When they say "no," explain: "Congruence is a \'perfect fit\'—no.', 'If there is a difference in size, it\'s not congruent."'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch07_084', difficulty: 'standard',
          question: 'Geometry in real life is the identification and application of mathematical.',
          hint: 'Review Chapter 2 (Lines and Angles) to ensure they understand what makes an angle.',
          misconception: 'Students often believe that the size of an angle changes if the arms (the lines forming the angle) are drawn longer.',
          parts: [
                { id: 'a', prompt: 'If you look at an open door, how does the angle between the door and the wall change as you push it further open?', answer: 'The angle becomes larger (the amount of rotation increases)',
                  options: ['The angle becomes larger (the amount of rotation increases)', 'length', 'amount of turn'],
                  hint: 'Review Chapter 2 (Lines and Angles) to ensure they understand what makes an angle.',
                  misconception: 'Students often believe that the size of an angle changes if the arms (the lines forming the angle) are drawn longer.' }
          ],
            remediations: { 'the-size-of-an-angle': { steps: ['If a student thinks longer arms make a larger angle, have them draw two angles of the same measure (e.g., 40°) but with.', 'Ask them to place one over the other (superimposition).', 'Show them that the "turn" at the vertex is identical regardless of how far out the lines extend.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
