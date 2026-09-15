import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch05_p1: SimDef = {
    id: 'v3_c7_math_ch05_p1',
    title: 'Parallel and Intersecting Lines · Part 1/2',
    subtitle: 'Covers the definition of intersecting lines, identifying the point of intersection.',
    classLevel: 7, subject: 'mathematics', topic: 'Parallel and Intersecting Lines · Part 1/2',
    chapters: ['c7_math_ch05'],
    nodeIds: ['c7_math_ch05_001', 'c7_math_ch05_002', 'c7_math_ch05_003', 'c7_math_ch05_004', 'c7_math_ch05_005', 'c7_math_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking down a street in your neighborhood where two straight roads cross each other at a junction.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two straight roads cross at a junction, and a friend claims that if the roads were longer they could cross a second time. Why can two straight lines never meet twice?',
        options: ['Two straight lines can share exactly one point — to cross again they would have to bend, and bending makes them no longer straight', 'They can — if the paper is big enough', 'They cross twice whenever both lines are long', 'Straight lines never cross at all'],
        answer: 'Two straight lines can share exactly one point — to cross again they would have to bend, and bending makes them no longer straight',
        hook: 'Wherever two lines cross, they always carve out four angles around the point — even a perfect perpendicular crossing makes four right angles, not two. Three lines can share one point too, if they are concurrent.',
    },
    teaching: [
        { title: 'Intersecting Lines: Point of Intersection and Angles Formed', text: 'Intersecting lines are two or more straight lines in a plane that meet or cross each other at a single common point called the point of intersection, forming four angles at that junction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch05_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Draw two intersecting lines, label the point of intersection, count and name all four angles — then try to make three lines share a single crossing point.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_001', title: 'Intersecting Lines: Point of Intersection and Angles Formed',
          scaffold: { problem: 'Two straight wire ropes, line $PQ$ and line $RS$, cross each other at a construction site in Mumbai to form a support structure.',
            steps: [
            { text: 'Identify the given information from the problem statement: two straight wire ropes represented by lines $PQ$ and $RS$.' },
            { text: 'Determine the point of intersection by locating the shared meeting point named in the problem, which is point $M$.' },
            { text: 'Count the number of straight lines involved in this specific intersection, which is 2 lines ($PQ$ and $RS$).' },
            { text: 'Apply the geometric rule that two intersecting straight lines always divide the surrounding space into 4 distinct.' },
            { text: 'Verify the result by sketching the two lines crossing; observe that four wedge-shaped regions (angles) are created.', faded: true, blankAnswer: 'Point of intersection is $M$; 2 lines intersect; 4 angles.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_002', title: 'Linear Pair of Angles: Sum Equals 180 Degrees',
          scaffold: { problem: 'A local park path splits into two diverging trails forming a linear pair.',
            steps: [
            { text: 'Identify given values: Angle 1 = $48^\\circ$, Angle 2 = $y^\\circ$, and note they form a linear pair.' },
            { text: 'Write down the linear pair equation: $48^\\circ + y^\\circ = 180^\\circ$.' },
            { text: 'Isolate the variable $y$ by subtracting $48$ from both sides: $y = 180 - 48$.' },
            { text: 'Compute the subtraction: $180 - 48 = 132$.' },
            { text: 'Verify the result: $48^\\circ + 132^\\circ = 180^\\circ$, confirming the straight line sum.', faded: true, blankAnswer: '$132^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_003', title: 'Vertically Opposite Angles: Equality and Proof',
          scaffold: { problem: 'Two straight roads, MG Road and Station Road, intersect at a crossing point O.',
            steps: [
            { text: 'Identify the geometric relationship. Since MG Road and Station Road are straight lines crossing each other, the angles.' },
            { text: 'Set up the algebraic equation based on the equality of vertically opposite angles: $3x + 15 = 5x - 5$.' },
            { text: 'Rearrange terms to isolate variable $x$ on one side by subtracting $3x$ from both sides: $15 = 5x - 3x - 5 \\implies 15.' },
            { text: 'Add $5$ to both sides and divide by $2$: $15 + 5 = 2x \\implies 20 = 2x \\implies x = 10$.' },
            { text: 'Substitute $x = 10$ back into one expression to verify the angle measure: $3(10) + 15 = 30 + 15 = 45^\\circ$, and $5(10).', faded: true, blankAnswer: '$x = 10$, and the angle measure is $45^\\circ$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_004', title: 'Parallel Lines: Definition and Properties',
          scaffold: { problem: 'A local park in Jaipur has two parallel walking tracks. Track 1 is defined along a grid line where its perpendicular distance from.',
            steps: [
            { text: 'Identify that parallel lines maintain a constant perpendicular distance from a fixed reference line.' },
            { text: 'Set up the equation using the given expression for the distance at $x = 10$: $\\text{Distance} = 2x - 11.5$.' },
            { text: 'Substitute the value $x = 10$ into the expression: $\\text{Distance} = 2(10) - 11.5$.' },
            { text: 'Perform algebraic multiplication and subtraction: $\\text{Distance} = 20 - 11.5 = 8.5$.' },
            { text: 'Substitute $m = 3$ back into either expression to find the constant distance: $3(3) - 2 = 9 - 2 = 7$ metres.', faded: true, blankAnswer: '7 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch05_005', title: 'Perpendicular Lines: Right Angle Intersection',
          scaffold: { problem: 'In a school courtyard, a vertical flagpole $AB$ stands on a flat horizontal playground pavement $CD$.',
            steps: [
            { text: 'Identify the given conditions and what is asked. We are given that flagpole $AB$ is perpendicular to ground $CD$ ($AB.' },
            { text: 'Set up the equation using the definition of perpendicular lines.' },
            { text: 'Isolate the variable $x$ by dividing both sides of the equation by 5.' },
            { text: 'Perform the division calculation: $x = \\frac{90}{5}$.' },
            { text: 'Compute the final value: $x = 18$, and verify by substituting back: $5(18) = 90^\\circ$.', faded: true, blankAnswer: '$x = 18$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch05_006', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Sketching a rangoli with two straight chalk lines crossing, Farid tells his teammate: \'Make the lines cross at two spots so the junction looks stable.\' Meanwhile another student says the X they drew makes only two angles.',
            decisions: [{ prompt: 'What does the geometry of two straight lines actually allow?', options: [
                { text: 'Two distinct straight lines can cross at exactly one point — a second crossing would force a line to bend — and that single point of intersection always creates four angles around it, even when all four are right angles.', outcome: 'This applies both facts correctly: one intersection point per pair of straight lines, and four angles formed there.' },
                { text: 'Farid is right — long straight lines can dip back and cross again, giving two points of intersection.', outcome: 'If a line crossed the same straight line twice it would have to curve between the points, which means it was never straight.', reveals: 'lines-cross-twice' },
                { text: 'The second student is right — an X is two strokes, so only two angles exist at the crossing.', outcome: 'Count the regions, not the strokes: four rays leave the point and bound four angles — a right-angled cross makes four 90-degree angles, not two.', reveals: 'cross-makes-two-angles' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'One crossing, one point, four angles. Straight lines are honest — they meet once and never double back.',
            decisions: [{ prompt: 'What comes next? Parallel and Intersecting Lines · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Parallel and Intersecting Lines · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch05_001', difficulty: 'standard',
          question: 'Intersecting lines are two or more straight lines in a plane that meet or cross.',
          hint: 'Review c6_math_ch07_071 to reinforce how lines intersect versus run parallel.',
          misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines.',
          parts: [
                { id: 'a', prompt: 'What is the special name given to the exact point where two straight lines cross each other?', answer: 'the point of intersection',
                  options: ['the point of intersection', 'endpoint', 'vertex', 'point of intersection'],
                  hint: 'Review c6_math_ch07_071 to reinforce how lines intersect versus run parallel.',
                  misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines can have multiple.' },
                { id: 'b', prompt: 'If two straight lines intersect in a plane, what is the maximum number of points where they can cross each other?', answer: 'exactly one point',
                  options: ['exactly one point', 'two points', 'infinite points', 'point of intersection'],
                  hint: 'Review c6_math_ch07_071 to reinforce how lines intersect versus run parallel.',
                  misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines can have multiple.' },
                { id: 'c', prompt: 'Two straight lines, $AB$ and $CD$, intersect at point $O$. If one of the angles formed at the intersection point measures $75^\\circ$, how many total angles are.', answer: '4 angles',
                  options: ['4 angles', 'point of intersection', 'intersecting lines can have multiple crossing points without curving'],
                  hint: 'Review c6_math_ch07_071 to reinforce how lines intersect versus run parallel.',
                  misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines can have multiple.' }
          ],
            remediations: { 'students-often-confuse-the-point': { steps: ['Guide the student by drawing two distinct, infinitely extending straight lines on paper using a sharp pencil and.', 'Ask them to trace each line with a different colored crayon until their fingers meet at the exact spot where the.', 'Say: "A line goes on forever, so it has no endpoints.', 'The only place where two different lines interact is where they cross over each other.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines.',
          parts: [
                { id: 'a', prompt: 'A student claims that when two lines intersect at right angles, there are only two angles formed at the intersection point.', answer: 'that the claim is false',
                  options: ['that the claim is false', 'point of intersection', 'intersecting lines can have multiple crossing points without curving'],
                  hint: 'Review c6_math_ch07_071 to reinforce how lines intersect versus run parallel.',
                  misconception: 'Students often confuse the "point of intersection" with the endpoints of line segments or think that intersecting lines can have multiple.' }
          ],
            remediations: { 'students-often-confuse-the-point': { steps: ['Guide the student by drawing two distinct, infinitely extending straight lines on paper using a sharp pencil and.', 'Ask them to trace each line with a different colored crayon until their fingers meet at the exact spot where the.', 'Say: "A line goes on forever, so it has no endpoints.', 'The only place where two different lines interact is where they cross over each other.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_002', difficulty: 'standard',
          question: 'A linear pair of angles is a pair of adjacent angles formed when two lines.',
          hint: 'Review c6_math_ch05_057 for solving linear equations and c6_math_ch07_072 for straight.',
          misconception: 'Students frequently confuse the linear pair sum property ($180^\\circ$) with complementary angles ($90^\\circ$).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear pair of angles is a pair of adjacent angles formed when two lines intersect,',
                  options: ['A linear pair of angles is a pair of adjacent angles formed when two lines intersect,', 'Intersecting lines are two or more straight lines in a plane that meet or cross each', 'When two straight lines intersect each other, the pairs of opposite angles formed at the', 'Parallel lines are two or more lines in a single plane that never intersect or meet, no'],
                  hint: 'Review c6_math_ch05_057 for solving linear equations and c6_math_ch07_072 for straight angle.',
                  misconception: 'Students frequently confuse the linear pair sum property ($180^\\circ$) with complementary angles ($90^\\circ$) or full-turn angles.' }
          ],
            remediations: { 'students-frequently-confuse-the-linear': { steps: ['Remind the student to draw a straight line on paper with a protractor baseline marked at $180^\\circ$.', 'Write down the exact rule: "Linear Pair = Straight Line = $180^\\circ$." Guide them step-by-step: first write the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_003', difficulty: 'standard',
          question: 'When two straight lines intersect each other, the pairs of opposite angles.',
          hint: 'Review c7_math_ch05_002 to practice identifying linear pairs and summing angles.',
          misconception: 'Students frequently confuse vertically opposite angles with linear pairs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When two straight lines intersect each other, the pairs of opposite angles formed at the',
                  options: ['When two straight lines intersect each other, the pairs of opposite angles formed at the', 'Intersecting lines are two or more straight lines in a plane that meet or cross each', 'A linear pair of angles is a pair of adjacent angles formed when two lines intersect,', 'Parallel lines are two or more lines in a single plane that never intersect or meet, no'],
                  hint: 'Review c7_math_ch05_002 to practice identifying linear pairs and summing angles to $180^\\circ$.',
                  misconception: 'Students frequently confuse vertically opposite angles with linear pairs.' }
          ],
            remediations: { 'students-frequently-confuse-vertically-opposite': { steps: ['Stop and draw the two intersecting lines on paper with a highlighter.', 'Trace one angle, then trace the angle directly across from it through the vertex, emphasizing that they do not share.', 'Remind the student: "Neighbors share a wall and add to $180^\\circ$; opposites stare at each other across the room and.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_004', difficulty: 'standard',
          question: 'Parallel lines are two or more lines in a single plane that never intersect.',
          hint: 'Review c6_math_ch07_071 to practice distinguishing between intersecting and.',
          misconception: 'Students often think that lines are parallel simply because they do not intersect within the visible drawing on their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Parallel lines are two or more lines in a single plane that never intersect or meet, no',
                  options: ['Parallel lines are two or more lines in a single plane that never intersect or meet, no', 'Intersecting lines are two or more straight lines in a plane that meet or cross each', 'A linear pair of angles is a pair of adjacent angles formed when two lines intersect,', 'When two straight lines intersect each other, the pairs of opposite angles formed at the'],
                  hint: 'Review c6_math_ch07_071 to practice distinguishing between intersecting and non-intersecting line.',
                  misconception: 'Students often think that lines are parallel simply because they do not intersect within the visible drawing on their notebook page.' }
          ],
            remediations: { 'lines-are-parallel-simply-because': { steps: ['To fix this, draw two slightly slanted lines on the blackboard that do not touch within the drawn segment.', 'Ask the student: "If you walk infinitely far along both paths, will your paths ever cross?" Then, use a ruler.', 'Emphasize that parallelism requires checking the perpendicular distance across the entire infinite span, not just the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_005', difficulty: 'standard',
          question: 'Perpendicular lines are two intersecting lines that meet at an exact right.',
          hint: 'Review angle measurements with a protractor and revisit the definition of a right angle.',
          misconception: 'Students often assume that any two intersecting lines that look "sort of upright" or form a cross are perpendicular,.',
          parts: [
                { id: 'a', prompt: 'If line $P$ intersects line $Q$ at a single point and forms one angle measuring $90^\\circ$, what must the measures of the other three angles formed at that.', answer: 'that all three remaining angles must also measure $90^\\circ$',
                  options: ['that all three remaining angles must also measure $90^\\circ$', 'sort of upright', 'the other angles could be different (e'],
                  hint: 'Review angle measurements with a protractor and revisit the definition of a right angle from Class.',
                  misconception: 'Students often assume that any two intersecting lines that look "sort of upright" or form a cross are perpendicular, or they confuse.' },
                { id: 'b', prompt: 'Line segment $EF$ is perpendicular to line segment $GH$ at point $O$.', answer: '$x = 30$',
                  options: ['$x = 30$', 'sort of upright'],
                  hint: 'Review angle measurements with a protractor and revisit the definition of a right angle from Class.',
                  misconception: 'Students often assume that any two intersecting lines that look "sort of upright" or form a cross are perpendicular, or they confuse.' },
                { id: 'c', prompt: 'Two lines, $AB$ and $CD$, intersect at point $O$. Angle $AOC$ is given as $2x + 10$ and angle $BOD$ is a right angle formed because $AB \\perp CD$.', answer: '$x = 40$, and yes, they are perpendicular',
                  options: ['$x = 40$, and yes, they are perpendicular', 'sort of upright'],
                  hint: 'Review angle measurements with a protractor and revisit the definition of a right angle from Class.',
                  misconception: 'Students often assume that any two intersecting lines that look "sort of upright" or form a cross are perpendicular, or they confuse.' }
          ],
            remediations: { 'any-two-intersecting-lines-that': { steps: ['If a student makes these errors, take a sheet of paper and fold it in half twice so the crease forms a crisp "plus".', 'Explain: "When you unfold this paper, every single corner where the creases meet is a square corner measuring exactly.', 'Have them practice rewriting every word problem statement like "$AB \\perp CD$" into the numerical equation "$\\angle.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch05_006', difficulty: 'standard',
          question: 'A transversal is a line that intersects two or more lines at distinct, separate.',
          hint: 'Review c7_math_ch05_001 to practice identifying intersection points before attempting.',
          misconception: 'Students often confuse a line segment or ray that terminates before crossing all lines as a full transversal, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A transversal is a line that intersects two or more lines at distinct, separate points',
                  options: ['A transversal is a line that intersects two or more lines at distinct, separate points', 'Intersecting lines are two or more straight lines in a plane that meet or cross each', 'A linear pair of angles is a pair of adjacent angles formed when two lines intersect,', 'When two straight lines intersect each other, the pairs of opposite angles formed at the'],
                  hint: 'Review c7_math_ch05_001 to practice identifying intersection points before attempting multi-line.',
                  misconception: 'Students often confuse a line segment or ray that terminates before crossing all lines as a full transversal, or they believe that any line.' }
          ],
            remediations: { 'students-often-confuse-a-line': { steps: ['Remind the student to trace the line with their finger from one end to the other.', 'Ask: "Does this line cross Line 1 at one spot, and then keep going to cross Line 2 at a completely *different* spot?".', 'Emphasize that a transversal must slice through multiple distinct locations to create the interior and exterior zones.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
