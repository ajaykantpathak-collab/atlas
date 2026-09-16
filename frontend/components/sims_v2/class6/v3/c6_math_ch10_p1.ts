import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch10_p1: SimDef = {
    id: 'v3_c6_math_ch10_p1',
    title: 'Symmetry · Part 1/2',
    subtitle: 'This node covers reflectional symmetry and identifying lines of symmetry in basic.',
    classLevel: 6, subject: 'mathematics', topic: 'Symmetry · Part 1/2',
    chapters: ['c6_math_ch10'],
    nodeIds: ['c6_math_ch10_105', 'c6_math_ch10_111', 'c6_math_ch10_108', 'c6_math_ch10_109'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a beautiful butterfly and noticed how the patterns on its left wing perfectly match.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You fold paper, cut half a heart, and open a perfect mirror-image shape. But a scalene triangle sliced into two equal-area pieces is not symmetric. Why does equal size fail the test?',
        options: ['Symmetry needs mirror-image halves that fold exactly onto each other — equal area alone is not enough', 'Because triangles can never be symmetric', 'Because the cut was not made with scissors', 'Equal size always proves symmetry — the triangle counts'],
        answer: 'Symmetry needs mirror-image halves that fold exactly onto each other — equal area alone is not enough',
        hook: 'The line of symmetry is a mirror, not a measuring tape. A butterfly proves it — and an equilateral triangle proves a shape can have not one but three such mirror lines.',
    },
    teaching: [
        { title: 'Introduction to Symmetry', text: 'Symmetry is a property where a shape or object can be divided by a line into two parts that are perfect mirror images of each other.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch10_105', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Hunt for mirror lines — fold a rectangle to find its two lines of symmetry, check the letter A, then draw a shape with at least two of your own.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_105', title: 'Introduction to Symmetry',
          scaffold: { problem: 'A rectangular piece of paper measures 10 cm by 6 cm. Find the lines of symmetry.',
            steps: [
            { text: 'Identify the shape as a rectangle.' },
            { text: 'Attempt to fold the paper vertically.' },
            { text: 'Check if the left and right sides overlap. (They do).' },
            { text: 'Attempt to fold the paper horizontally.' },
            { text: 'Check if the top and bottom sides overlap. (They do).', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_106', title: 'Lines of Symmetry in 2D Shapes',
          scaffold: { problem: 'A rectangular piece of chart paper measures 10 cm by 6 cm. How many lines of symmetry can be drawn on this paper?',
            steps: [
            { text: 'Analyze the rectangle (10 cm x 6 cm).' },
            { text: 'Test a vertical line through the center of the 10 cm sides. The sides will fold perfectly.' },
            { text: 'Test a horizontal line through the center of the 6 cm sides. The sides will fold perfectly.' },
            { text: 'Test a diagonal. When folded, the corners will not overlap.' },
            { text: 'Conclude there are exactly 2 lines of symmetry.', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_107', title: 'Symmetry in Letters and Numbers',
          scaffold: { problem: 'A student writes the letters "CODE" on a piece of paper. Which of these letters have at least one line of symmetry?',
            steps: [
            { text: 'Examine \'C\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Examine \'O\'. Fold it horizontally, then vertically. It matches in both. It has symmetry.' },
            { text: 'Examine \'D\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Examine \'E\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Verify results. All four letters have at least one line of symmetry.', faded: true, blankAnswer: 'C, O, D, and E all have at least one line of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_108', title: 'Rotational Symmetry',
          scaffold: { problem: 'A rectangular garden plot measures 4 meters by 2 meters. If you rotate the plan of the garden 180 degrees around its center, will it look.',
            steps: [
            { text: 'Identify the shape as a rectangle.' },
            { text: 'Mark the four corners as A, B, C, D.' },
            { text: 'Rotate the shape 180 degrees mentally.' },
            { text: 'Confirm that corner A moves to the position of C, and B to D, resulting in the same outline.' },
            { text: 'Check if it matches at any other angle (it does not, only at 180° and 360°).', faded: true, blankAnswer: 'Yes, it looks the same; the order of rotational symmetry.' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch10_109', title: 'Symmetry in Nature',
          caseStudy: { intro: 'Have you ever noticed how if you draw a line down the middle of a butterfly’s wings, the left side looks exactly like the right?',
            decisions: [{ prompt: 'What do we call a line that divides an object into two identical mirror images?', options: [
                { text: 'This is called a line of symmetry', outcome: 'This is called a line of symmetry. A wrong answer here suggests the student is confusing "symmetry".' },
                { text: 'symmetry', outcome: 'Not quite — Students often assume that if an object is "symmetrical," it must have a vertical mirror line.', reveals: 'if-an-object-is-symmetrical' },
                { text: 'balance', outcome: 'Not quite — Students often assume that if an object is "symmetrical," it must have a vertical mirror line.', reveals: 'if-an-object-is-symmetrical' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_110', title: 'Symmetry in Art and Architecture',
          scaffold: { problem: 'A rectangular garden plot is 10 metres long and 6 metres wide.',
            steps: [
            { text: 'Identify the shape: it is a rectangle.' },
            { text: 'Draw a vertical line through the center of the 10m sides.' },
            { text: 'Draw a horizontal line through the center of the 6m sides.' },
            { text: 'Check if folding along these lines results in identical halves. Both do.' },
            { text: 'Check if a diagonal line creates symmetry. In a non-square rectangle, diagonals do not overlap.', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch10_110', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch10_105', title: 'Use it in the wild',
          caseStudy: { intro: 'For a greeting-card contest, a student draws a house: door in the centre, window on the left side only. \'It\'s roughly balanced,\' she says, \'so it has a line of symmetry.\'',
            decisions: [{ prompt: 'Does the drawing have a line of symmetry?', options: [
                { text: 'No — a line of symmetry must make both halves mirror each other exactly. The centred door would mirror fine, but the window sits only on the left; folding the card puts it over blank wall, so no fold line works. \'Roughly balanced\' fails the mirror test — symmetry is exact or it is not symmetry.', outcome: 'The test is folding, not eyeballing — every feature on one side needs its twin on the other, and one unmatched window breaks it.' },
                { text: 'She is right — if a design looks balanced overall, that is close enough to count as symmetric.', outcome: 'Symmetry is a precise mirror match, not an overall impression — one unmatched window is enough to eliminate every possible fold line.', reveals: 'roughly-equal-is-symmetric' },
                { text: 'The drawing has two lines of symmetry, since the house shape itself is symmetric even if the window is not.', outcome: 'Symmetry applies to the whole drawing — the window is part of it, so its unmatched position removes all lines of symmetry.', reveals: 'parts-can-be-ignored' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch10_110', title: 'The bigger picture',
          caseStudy: { intro: 'Symmetry is a folding promise: one side must land exactly on the other. If the mirror completes the picture, the line is true.',
            decisions: [{ prompt: 'What comes next? Symmetry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Symmetry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch10_105', difficulty: 'standard',
          question: 'Symmetry is a property where a shape or object can be divided by a line into.',
          hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
          misconception: 'Students often confuse "symmetry" with "congruence" (equal size).',
          parts: [
                { id: 'a', prompt: 'What do we call the line that divides a shape into two identical mirror-image halves?', answer: 'It is called the line of symmetry',
                  options: ['It is called the line of symmetry', 'symmetry', 'congruence'],
                  hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'b', prompt: 'If you fold a paper shape along a line and the two halves do not overlap perfectly, is the shape symmetrical? Why or why not?', answer: 'No, it is not symmetrical',
                  options: ['No, it is not symmetrical', 'symmetry', 'equal size', 'congruence'],
                  hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'c', prompt: 'Draw a rectangle on a piece of paper. How many lines of symmetry can you find by folding it?', answer: 'A rectangle has two lines of symmetry: one horizontal and one vertical',
                  options: ['A rectangle has two lines of symmetry: one horizontal and one vertical', 'they are confusing a rectangle with a square', 'they likely missed the second axis of reflection'],
                  hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['Ask the student to place a small hand mirror on the line they drew through the shape.', 'Explain that if the reflection in the mirror makes the original shape look complete, then it is a line of symmetry.', 'If the reflection looks distorted or creates a different shape, the line is incorrect.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_105', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "symmetry" with "congruence" (equal size).',
          parts: [
                { id: 'a', prompt: 'Can a triangle have more than one line of symmetry? Explain your reasoning.', answer: 'Yes, an equilateral triangle has three lines of symmetry',
                  options: ['Yes, an equilateral triangle has three lines of symmetry', 'symmetry', 'congruence'],
                  hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'b', prompt: 'Design a simple shape that has at least two lines of symmetry and draw it on a grid.', answer: 'The student should draw a shape like a cross or a rectangle',
                  options: ['The student should draw a shape like a cross or a rectangle', 'symmetry', 'congruence'],
                  hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['Ask the student to place a small hand mirror on the line they drew through the shape.', 'Explain that if the reflection in the mirror makes the original shape look complete, then it is a line of symmetry.', 'If the reflection looks distorted or creates a different shape, the line is incorrect.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_106', difficulty: 'standard',
          question: 'A line of symmetry is an imaginary line that divides a 2D shape into two.',
          hint: 'Review the definitions of different types of triangles based on side lengths.',
          misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.',
          parts: [
                { id: 'a', prompt: 'How many lines of symmetry does a scalene triangle have?', answer: 'A scalene triangle has 0 lines of symmetry',
                  options: ['A scalene triangle has 0 lines of symmetry', 'scalene', 'any line that divides a shape into two equal areas is a line of symmetry'],
                  hint: 'Review the definitions of different types of triangles based on side lengths (equilateral.',
                  misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.' }
          ],
            remediations: { 'any-line-that-divides-a': { steps: ['Take the student back to the "folding test." Ask them to trace the shape on a piece of paper and cut it out.', 'Have them fold it along the line they think is a symmetry line.', 'If the edges don\'t match, ask them to identify where the overlap fails.', 'This physical feedback corrects the "area-division" error.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_107', difficulty: 'standard',
          question: 'A letter or number has a line of symmetry if it can be folded along a straight.',
          hint: 'Review the "Line of Symmetry" section in the chapter (Chapter 10, 9.1).',
          misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks.',
          parts: [
                { id: 'a', prompt: 'Which of these letters has a vertical line of symmetry: \'B\' or \'A\'?', answer: '\'A\' has a vertical line of symmetry',
                  options: ['\'A\' has a vertical line of symmetry', 'balance', 'symmetry', 'balanced'],
                  hint: 'Review the "Line of Symmetry" section in the chapter (Chapter 10, 9.1).',
                  misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks "balanced" or "pretty,".' }
          ],
            remediations: { 'students-often-confuse-balance-with': { steps: ['Ask the student to cut the letter out of paper.', 'Tell them: "If you cannot fold the cutout so that the edges touch perfectly on both sides of the crease, it is not.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_108', difficulty: 'standard',
          question: 'Rotational symmetry occurs when a shape is rotated around a central point.',
          hint: 'Review the concept of angles and a full circle being 360°.',
          misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of degrees you must rotate a square to see it look exactly like it did at the start?', answer: 'The answer is 90°',
                  options: ['The answer is 90°', 'full rotation', 'rotational symmetry', 'Order of Symmetry'],
                  hint: 'Review the concept of angles and a full circle being 360°.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' },
                { id: 'b', prompt: 'If a shape has an order of rotational symmetry of 3, how many times does it look the same in one full 360° turn?', answer: 'It looks the same 3 times',
                  options: ['It looks the same 3 times', 'Order of Symmetry'],
                  hint: 'Review the concept of angles and a full circle being 360°.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' },
                { id: 'c', prompt: 'A rectangle is rotated 180°. Does it look the same as it did at the start?', answer: 'Yes, it does',
                  options: ['Yes, it does', 'Order of Symmetry'],
                  hint: 'Review the concept of angles and a full circle being 360°.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' },
                { id: 'd', prompt: 'Compare a square and a regular hexagon. Which one has a higher order of rotational symmetry, and why?', answer: 'The hexagon has an order of 6, while the square has an order of 4',
                  options: ['The hexagon has an order of 6, while the square has an order of 4', 'Order of Symmetry'],
                  hint: 'Review the concept of angles and a full circle being 360°.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' }
          ],
            remediations: { 'students-often-confuse-order-of': { steps: ['Ask the student to draw the shape on a piece of paper and cut it out.', 'Place a pencil tip on the center point of the shape and hold it against the desk.', 'Have them rotate the cutout slowly while watching the corners.', 'Ask: "At what angle does the corner reach the spot where a different corner started?"'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_109', difficulty: 'standard',
          question: 'Symmetry in nature refers to the balanced, repeating, or mirror-like patterns.',
          hint: 'Review the concept of mirror images.',
          misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.',
          parts: [
                { id: 'a', prompt: 'What do we call a line that divides an object into two identical mirror images?', answer: 'This is called a line of symmetry',
                  options: ['This is called a line of symmetry', 'symmetry', 'balance', 'similarity'],
                  hint: 'Review the concept of mirror images.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' },
                { id: 'b', prompt: 'If a sunflower looks the same after being rotated by 90 degrees, does it possess symmetry? Explain why or why not.', answer: 'Yes, it possesses rotational symmetry',
                  options: ['Yes, it possesses rotational symmetry', 'symmetrical', 'if an object is "symmetrical," it must have a vertical mirror line'],
                  hint: 'Review the concept of mirror images.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' },
                { id: 'c', prompt: 'A starfish has five arms arranged around a center. If you rotate it, how many times will it look identical to its starting position before completing a full.', answer: 'It will look identical 5 times (including the final 360-degree position)',
                  options: ['It will look identical 5 times (including the final 360-degree position)', 'symmetrical', 'if an object is "symmetrical," it must have a vertical mirror line'],
                  hint: 'Review the concept of mirror images.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' }
          ],
            remediations: { 'if-an-object-is-symmetrical': { steps: ['Ask the student to trace the starfish on a piece of paper and cut it out.', 'Have them place a pin in the center and rotate the cutout over the drawing.', 'Ask, "Does the arm land on another arm?" When they see it does, explain that this "landing on" is rotational symmetry.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_110', difficulty: 'standard',
          question: 'Symmetry in art and architecture is the balanced distribution of shapes, lines.',
          hint: 'Review the concept of mirror halves in 2D shapes.',
          misconception: 'Students often confuse "symmetry" with "equality of size." They believe that if two sides of a building have the same.',
          parts: [
                { id: 'a', prompt: 'If a square-shaped courtyard has a pattern that looks the same after a 90-degree turn, does it have rotational symmetry?', answer: 'Yes, because it returns to its original appearance after a partial rotation',
                  options: ['Yes, because it returns to its original appearance after a partial rotation', 'look-alike', 'symmetry', 'equality of size'],
                  hint: 'Review the concept of mirror halves in 2D shapes.',
                  misconception: 'Students often confuse "symmetry" with "equality of size." They believe that if two sides of a building have the same amount of space,.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['If a student misses the definition, have them take a piece of paper, cut out a shape, and fold it.', 'Ask them to draw the fold line and check if the edges match exactly.', 'If they don\'t match, explain that the fold line is not a line of symmetry.', 'Repeat this with different shapes until they realize the "matching" part is essential.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
