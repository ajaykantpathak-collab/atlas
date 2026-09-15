import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch05_p2: SimDef = {
    id: 'v3_c7_math_ch05_p2',
    title: 'Parallel and Intersecting Lines · Part 2/2',
    subtitle: 'Covers the identification and angle relationship calculations of corresponding angles.',
    classLevel: 7, subject: 'mathematics', topic: 'Parallel and Intersecting Lines · Part 2/2',
    chapters: ['c7_math_ch05'],
    nodeIds: ['c7_math_ch05_007', 'c7_math_ch05_008', 'c7_math_ch05_009', 'c7_math_ch05_010', 'c7_math_ch05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are walking down a railway track in your town where two parallel rails are crossed diagonally.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two straight roads cross at a junction, and a friend claims that if the roads were longer they could cross a second time. Why can two straight lines never meet twice?',
        options: ['Two straight lines can share exactly one point — to cross again they would have to bend, and bending makes them no longer straight', 'They can — if the paper is big enough', 'They cross twice whenever both lines are long', 'Straight lines never cross at all'],
        answer: 'Two straight lines can share exactly one point — to cross again they would have to bend, and bending makes them no longer straight',
        hook: 'Wherever two lines cross, they always carve out four angles around the point — even a perfect perpendicular crossing makes four right angles, not two. Three lines can share one point too, if they are concurrent.',
    },
    teaching: [
        { title: 'Corresponding Angles Formed by a Transversal', text: 'Corresponding angles are pairs of angles formed when two lines are crossed by a third line (called a transversal), occupying the same relative position at each intersection—specifically, one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch05_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Draw two intersecting lines, label the point of intersection, count and name all four angles — then try to make three lines share a single crossing point.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_007', title: 'Corresponding Angles Formed by a Transversal',
          scaffold: { problem: 'In a school carpentry workshop, two parallel wooden beams representing lines $AB$ and $CD$ are crossed by a metal brace acting as.',
            steps: [
            { text: 'Identify that lines $AB$ and $CD$ are parallel and cut by transversal $EF$, meaning the given angles are corresponding.' },
            { text: 'Set up the algebraic equation equating the two corresponding angle expressions: $4x + 10 = 70$.' },
            { text: 'Perform inverse operations to isolate the variable term by subtracting 10 from both sides: $4x = 70 - 10$, which.' },
            { text: 'Divide both sides by 4 to solve for $x$: $x = \\frac{60}{4} = 15$.' },
            { text: 'Substitute $x = 15$ back into the expression to verify: $4(15) + 10 = 60 + 10 = 70^\\circ$, confirming the calculation.', faded: true, blankAnswer: '$x = 15$, angle measure = $70^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_008', title: 'Alternate Angles Formed by a Transversal',
          scaffold: { problem: 'Two parallel railway tracks in a Mumbai station yard are intersected by a straight signal wire serving as a transversal.',
            steps: [
            { text: 'Identify the given angle expressions: $\\angle 1 = 4x - 15$ and $\\angle 2 = 2x + 25$, and note that alternate interior.' },
            { text: 'Set up the algebraic equation by equating the two expressions: $4x - 15 = 2x + 25$.' },
            { text: 'Rearrange terms to bring variable terms to one side by subtracting $2x$ from both sides: $4x - 2x - 15 = 25 \\implies 2x.' },
            { text: 'Add $15$ to both sides of the equation: $2x = 25 + 15 \\implies 2x = 40$.' },
            { text: 'Divide by $2$ to find $x$: $x = 20$. Substitute $x = 20$ into one expression: $4(20) - 15 = 80 - 15 = 65^\\circ$.', faded: true, blankAnswer: 'x = 20, angle measure = 65 degrees' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_009', title: 'Interior Angles on Same Side of Transversal',
          scaffold: { problem: 'In a school architectural design, two parallel fences, Fence 1 and Fence 2, are crossed by a straight metal rod serving as a transversal.',
            steps: [
            { text: 'Identify that the fences are parallel, which means the interior angles on the same side of the transversal are.' },
            { text: 'Set up the equation using the supplementary rule where their sum equals $180^\\circ$: $3x + (2x + 30^\\circ) = 180^\\circ$.' },
            { text: 'Combine like terms on the left side of the equation: $5x + 30 = 180$.' },
            { text: 'Isolate the variable term by subtracting 30 from both sides: $5x = 180 - 30$, which simplifies to $5x = 150$.' },
            { text: 'Substitute $x = 30$ back into the angle expressions: $\\text{Angle}_1 = 3(30) = 90^\\circ$ and $\\text{Angle}_2 = 2(30).', faded: true, blankAnswer: 'x = 30, Angle 1 = 90 degrees, Angle 2 = 90 degrees' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_010', title: 'Drawing Parallel Lines Using Ruler and Compass',
          scaffold: { problem: 'Construct a line parallel to a given line $AB$ through a point $P$ that lies outside $AB$, using only a ruler and a compass.',
            steps: [
            { text: 'Draw a line $AB$ and mark a point $P$ not on $AB$. Take any point $Q$ on line $AB$ and join $P$ to $Q$ to form.' },
            { text: 'With $Q$ as center and any convenient radius, draw an arc intersecting line $AB$ at point $X$ and transversal $PQ$.' },
            { text: 'With $P$ as center and the exact same radius (without changing the compass width), draw an arc cutting transversal $PQ$.' },
            { text: 'Measure the distance between $X$ and $Y$ using the compass. With $Z$ as center and radius equal to length $XY$, draw.' },
            { text: 'Draw a straight line passing through $P$ and $W$ using a ruler, producing line $CD$ parallel to $AB$.', faded: true, blankAnswer: 'Line $CD$ passing through $P$ is parallel to line $AB$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_011', title: 'Properties of Angles When Parallel Lines Are Cut by a Transversal',
          scaffold: { problem: 'In a local park in Delhi, two parallel iron railings ($AB \\parallel CD$) are crossed by a decorative metal rod acting as a transversal.',
            steps: [
            { text: 'Identify that the given angles are alternate interior angles formed by a transversal cutting two parallel lines.' },
            { text: 'Recall the property that alternate interior angles are equal when lines are parallel, giving the equation $4x - 20 = 2x.' },
            { text: 'Transpose terms to isolate $x$ by subtracting $2x$ from both sides: $4x - 2x - 20 = 40 \\implies 2x - 20 = 40$.' },
            { text: 'Add 20 to both sides: $2x = 40 + 20 \\implies 2x = 60$.' },
            { text: 'Divide by 2: $x = 30$, and substitute back: $4(30) - 20 = 120 - 20 = 100^\\circ$.', faded: true, blankAnswer: '$x = 30$, and each angle measures $100^\\circ$.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch05_011', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sketching a rangoli with two straight chalk lines crossing, Farid tells his teammate: \'Make the lines cross at two spots so the junction looks stable.\' Meanwhile another student says the X they drew makes only two angles.',
            decisions: [{ prompt: 'What does the geometry of two straight lines actually allow?', options: [
                { text: 'Two distinct straight lines can cross at exactly one point — a second crossing would force a line to bend — and that single point of intersection always creates four angles around it, even when all four are right angles.', outcome: 'This applies both facts correctly: one intersection point per pair of straight lines, and four angles formed there.' },
                { text: 'Farid is right — long straight lines can dip back and cross again, giving two points of intersection.', outcome: 'If a line crossed the same straight line twice it would have to curve between the points, which means it was never straight.', reveals: 'lines-cross-twice' },
                { text: 'The second student is right — an X is two strokes, so only two angles exist at the crossing.', outcome: 'Count the regions, not the strokes: four rays leave the point and bound four angles — a right-angled cross makes four 90-degree angles, not two.', reveals: 'cross-makes-two-angles' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch05_011', title: 'You made it',
          caseStudy: { intro: 'One crossing, one point, four angles. Straight lines are honest — they meet once and never double back.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch05_007', difficulty: 'standard',
          question: 'Corresponding angles are pairs of angles formed when two lines are crossed by.',
          hint: 'Review c7_math_ch05_006 for transversal anatomy and c6_math_ch05_057 for solving linear.',
          misconception: 'Students frequently confuse corresponding angles with alternate interior angles or consecutive interior angles.',
          parts: [
                { id: 'a', prompt: 'If two lines are cut by a transversal and one pair of corresponding angles measures 75° each, can we guarantee that the two main lines are parallel?', answer: 'Yes, we can guarantee the lines are parallel',
                  options: ['Yes, we can guarantee the lines are parallel', 'we need more information'],
                  hint: 'Review c7_math_ch05_006 for transversal anatomy and c6_math_ch05_057 for solving linear equations.',
                  misconception: 'Students frequently confuse corresponding angles with alternate interior angles or consecutive interior angles.' }
          ],
            remediations: { 'students-frequently-confuse-corresponding-angles': { steps: ['To fix this error, guide the student to trace the position of both angles relative to the transversal line using.', 'Remind them: "Same side, same spot = equal!" Have them physically place a tracing paper over the first intersection and.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_008', difficulty: 'standard',
          question: 'Alternate interior or exterior angles are pairs of angles formed on opposite.',
          hint: 'Review solving linear equations and practice identifying "Z-shapes" or "N-shapes" formed.',
          misconception: 'Students frequently confuse alternate interior angles with consecutive interior angles on the same side of the.',
          parts: [
                { id: 'a', prompt: 'What term describes a pair of angles that lie on opposite sides of a transversal, in interior positions between the two intersected lines, but do not share.', answer: 'alternate interior angles',
                  options: ['alternate interior angles', 'corresponding angles', 'vertically opposite angles'],
                  hint: 'Review solving linear equations and practice identifying "Z-shapes" or "N-shapes" formed.',
                  misconception: 'Students frequently confuse alternate interior angles with consecutive interior angles on the same side of the transversal.' }
          ],
            remediations: { 'students-frequently-confuse-alternate-interior': { steps: ['Draw a clear diagram of two parallel lines cut by a transversal and use a colored highlighter to trace out a large "Z".', 'Show the student that the two corners inside the "Z" sit snugly against each other and must therefore be identical.', 'Remind them: "Alternate means opposite sides of the road (transversal), so they match; consecutive means same side team.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_009', difficulty: 'standard',
          question: 'Interior angles on the same side of a transversal (also known as consecutive.',
          hint: 'Review c7_math_ch05_002 (Linear Pair of Angles) and c6_math_ch05_057 (Solving Linear.',
          misconception: 'Students frequently confuse interior angles on the same side of a transversal with alternate interior angles.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interior angles on the same side of a transversal (also known as consecutive interior',
                  options: ['Interior angles on the same side of a transversal (also known as consecutive interior', 'Intersecting lines are two or more straight lines in a plane that meet or cross each', 'A linear pair of angles is a pair of adjacent angles formed when two lines intersect,', 'When two straight lines intersect each other, the pairs of opposite angles formed at the'],
                  hint: 'Review c7_math_ch05_002 (Linear Pair of Angles) and c6_math_ch05_057 (Solving Linear Equations).',
                  misconception: 'Students frequently confuse interior angles on the same side of a transversal with alternate interior angles or corresponding angles.' }
          ],
            remediations: { 'students-frequently-confuse-interior-angles': { steps: ['Guide the student back to visual definitions: ask them to point to the interior region between the two parallel lines.', 'Remind them that alternate and corresponding angles are *equal*, but co-interior angles are "cooperative" partners that.', 'Have them physically draw a straight line extended from the transversal to see how the co-interior angles combine.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_010', difficulty: 'standard',
          question: 'Drawing parallel lines using a ruler and a compass is a geometric construction.',
          hint: 'Review how to copy an angle with a compass by measuring arc chord lengths before.',
          misconception: 'Students often change the compass radius halfway through copying an angle between the transversal intersection and the.',
          parts: [
                { id: 'a', prompt: 'What geometric instrument besides a compass is required to draw a straight line through a constructed point when making parallel lines?', answer: 'A ruler (or straightedge)',
                  options: ['A ruler (or straightedge)', 'protractor', 'set-square'],
                  hint: 'Review how to copy an angle with a compass by measuring arc chord lengths before attempting.',
                  misconception: 'Students often change the compass radius halfway through copying an angle between the transversal intersection and the external point.' },
                { id: 'b', prompt: 'When constructing a line parallel to line $L$ through an external point $P$ using a transversal $PQ$, if the angle formed at the transversal with line $L$.', answer: 'Corresponding angles (or alternate interior angles) are equal',
                  options: ['Corresponding angles (or alternate interior angles) are equal', 'perpendicular distance'],
                  hint: 'Review how to copy an angle with a compass by measuring arc chord lengths before attempting.',
                  misconception: 'Students often change the compass radius halfway through copying an angle between the transversal intersection and the external point.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student that a compass is a tool for transferring exact distances.', 'Say: "Your compass width is like a locked measuring tape; once you measure the distance from the baseline to the arc.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_011', difficulty: 'standard',
          question: 'When two parallel lines are cut by a transversal line, specific geometric angle.',
          hint: 'Review c7_math_ch05_007 and c6_math_ch05_057 to practice identifying angle pairs and.',
          misconception: 'Students frequently confuse consecutive interior angles (which are supplementary, summing to $180^\\circ$) with.',
          parts: [
                { id: 'a', prompt: 'Analyze a situation where a student measures a transversal cutting two lines and finds alternate interior angles are $72^\\circ$ and $78^\\circ$.', answer: 'No, the lines cannot be parallel',
                  options: ['No, the lines cannot be parallel', 'yes, because they are both acute angles'],
                  hint: 'Review c7_math_ch05_007 and c6_math_ch05_057 to practice identifying angle pairs and solving.',
                  misconception: 'Students frequently confuse consecutive interior angles (which are supplementary, summing to $180^\\circ$) with alternate interior angles.' }
          ],
            remediations: { 'students-frequently-confuse-consecutive-interior': { steps: ['When a student makes this error, stop and draw a quick sketch of the "C" shape formed by consecutive interior angles.', 'Say: "Look at the letter shape made by these two angles.', 'If they form a \'C\' or U-shape trapped between the parallel lines on the same side, they are interior co-interior angles.', 'If they cross over the transversal in a \'Z\' shape, they are alternate and equal.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
