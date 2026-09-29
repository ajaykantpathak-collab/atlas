import type { SimDef } from '../../engine/types';
import C6_MathematicsSymmetrySim from '../../../simulations/c6_12/C6_MathematicsSymmetrySim';

/** v3 wrapped master — C6_MathematicsSymmetrySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicssymmetrysim: SimDef = {
    id: 'v3w_c6_mathematicssymmetrysim',
    title: 'Introduction to Symmetry',
    subtitle: 'This node covers reflectional symmetry and identifying lines of symmetry in basic.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Symmetry',
    chapters: [],
    nodeIds: ['c6_math_ch10_105', 'c6_math_ch10_111', 'c6_math_ch10_108', 'c6_math_ch10_109'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a beautiful butterfly and noticed how the patterns on its left wing perfectly match.', goal: 'Master Introduction to Symmetry.' },
    discovery: {
        question: 'What do we call the line that divides a shape into two identical mirror-image halves?',
        options: ['It is called the line of symmetry', 'symmetry', 'congruence'],
        answer: 'It is called the line of symmetry',
        hook: 'Students often confuse "symmetry" with "congruence" (equal size).',
    },
    teaching: [
        { title: 'Symmetry is a property where a shape or.', text: 'Symmetry is a property where a shape or object can be divided by a line into two parts that are perfect mirror images of each other.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch10_105', title: 'Symmetry is a property where a shape or.',
          scaffold: { problem: 'A rectangular piece of paper measures 10 cm by 6 cm. Find the lines of symmetry.',
            steps: [
            { text: 'Identify the shape as a rectangle.' },
            { text: 'Attempt to fold the paper vertically.' },
            { text: 'Check if the left and right sides overlap. (They do).' },
            { text: 'Attempt to fold the paper horizontally.' },
            { text: 'Check if the top and bottom sides overlap. (They do).', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_106', title: 'A line of symmetry is an imaginary line.',
          scaffold: { problem: 'A rectangular piece of chart paper measures 10 cm by 6 cm. How many lines of symmetry can be drawn on this paper?',
            steps: [
            { text: 'Analyze the rectangle (10 cm x 6 cm).' },
            { text: 'Test a vertical line through the center of the 10 cm sides. The sides will fold perfectly.' },
            { text: 'Test a horizontal line through the center of the 6 cm sides. The sides will fold perfectly.' },
            { text: 'Test a diagonal. When folded, the corners will not overlap.' },
            { text: 'Conclude there are exactly 2 lines of symmetry.', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_107', title: 'A letter or number has a line of.',
          scaffold: { problem: 'A student writes the letters "CODE" on a piece of paper. Which of these letters have at least one line of symmetry?',
            steps: [
            { text: 'Examine \'C\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Examine \'O\'. Fold it horizontally, then vertically. It matches in both. It has symmetry.' },
            { text: 'Examine \'D\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Examine \'E\'. Fold it horizontally. The top and bottom match. It has horizontal symmetry.' },
            { text: 'Verify results. All four letters have at least one line of symmetry.', faded: true, blankAnswer: 'C, O, D, and E all have at least one line of symmetry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_108', title: 'Rotational symmetry occurs when a shape.',
          scaffold: { problem: 'A rectangular garden plot measures 4 meters by 2 meters. If you rotate the plan of the garden 180 degrees around its center, will it look.',
            steps: [
            { text: 'Identify the shape as a rectangle.' },
            { text: 'Mark the four corners as A, B, C, D.' },
            { text: 'Rotate the shape 180 degrees mentally.' },
            { text: 'Confirm that corner A moves to the position of C, and B to D, resulting in the same outline.' },
            { text: 'Check if it matches at any other angle (it does not, only at 180° and 360°).', faded: true, blankAnswer: 'Yes, it looks the same; the order of rotational symmetry is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_109', title: 'Symmetry in nature refers to the.',
          scaffold: { problem: 'A gardener has a circular flower bed with 6 identical white petals arranged evenly. How many angles of symmetry does this flower have?',
            steps: [
            { text: 'Identify the number of identical repeating parts (6 petals).' },
            { text: 'Determine the total degrees in a full circle (360 degrees).' },
            { text: 'Divide the total degrees by the number of petals to find the smallest angle (360 / 6 = 60).' },
            { text: 'List the multiples of this angle to find all rotation points: 60, 120, 180, 240, 300, 360.' },
            { text: 'Interpret: The flower looks the same at these 6 intervals.', faded: true, blankAnswer: '6 angles of symmetry (60°, 120°, 180°, 240°, 300°, 360°).' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_110', title: 'Symmetry in art and architecture is the.',
          scaffold: { problem: 'A rectangular garden plot is 10 metres long and 6 metres wide.',
            steps: [
            { text: 'Identify the shape: it is a rectangle.' },
            { text: 'Draw a vertical line through the center of the 10m sides.' },
            { text: 'Draw a horizontal line through the center of the 6m sides.' },
            { text: 'Check if folding along these lines results in identical halves. Both do.' },
            { text: 'Check if a diagonal line creates symmetry. In a non-square rectangle, diagonals do not overlap.', faded: true, blankAnswer: '2 lines of symmetry.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch10_106', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Symmetry', spots: [
            { id: 's1', label: 'Symmetry is a property where', prompt: 'Which idea is this? — Symmetry is a property where a shape or object can be divided by a line into two parts.', answer: 'Symmetry is a property where', options: ['Symmetry is a property where', 'A line of symmetry is', 'A letter or number has', 'Rotational symmetry occurs when a'] },
            { id: 's2', label: 'A line of symmetry is', prompt: 'Which idea is this? — A line of symmetry is an imaginary line that divides a 2D shape into two identical mirror.', answer: 'A line of symmetry is', options: ['A line of symmetry is', 'Symmetry is a property where', 'A letter or number has', 'Rotational symmetry occurs when a'] },
            { id: 's3', label: 'A letter or number has', prompt: 'Which idea is this? — A letter or number has a line of symmetry if it can be folded along a straight line such.', answer: 'A letter or number has', options: ['A letter or number has', 'Symmetry is a property where', 'A line of symmetry is', 'Rotational symmetry occurs when a'] },
            { id: 's4', label: 'Rotational symmetry occurs when a', prompt: 'Which idea is this? — Rotational symmetry occurs when a shape is rotated around a central point by less than a.', answer: 'Rotational symmetry occurs when a', options: ['Rotational symmetry occurs when a', 'Symmetry is a property where', 'A line of symmetry is', 'A letter or number has'] },
            { id: 's5', label: 'Symmetry in nature refers to', prompt: 'Which idea is this? — Symmetry in nature refers to the balanced, repeating, or mirror-like patterns found in.', answer: 'Symmetry in nature refers to', options: ['Symmetry in nature refers to', 'Symmetry is a property where', 'A line of symmetry is', 'A letter or number has'] },
            { id: 's6', label: 'Symmetry in art and architecture', prompt: 'Which idea is this? — Symmetry in art and architecture is the balanced distribution of shapes, lines, or.', answer: 'Symmetry in art and architecture', options: ['Symmetry in art and architecture', 'Symmetry is a property where', 'A line of symmetry is', 'A letter or number has'] }
          ] } }
    ],
    explore: { component: C6_MathematicsSymmetrySim, prompt: 'Explore the interactive — Introduction to Symmetry' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch10_105', difficulty: 'standard',
          question: 'Symmetry is a property where a shape or object can be divided by a line into.',
          hint: 'Review the properties of regular polygons and how to measure lengths of sides.',
          misconception: 'Students often confuse "symmetry" with "congruence" (equal size).',
          parts: [
                { id: 'a', prompt: 'What do we call the line that divides a shape into two identical mirror-image halves?', answer: 'It is called the line of symmetry',
                  options: ['It is called the line of symmetry', 'symmetry', 'congruence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'b', prompt: 'If you fold a paper shape along a line and the two halves do not overlap perfectly, is the shape symmetrical? Why or why not?', answer: 'No, it is not symmetrical',
                  options: ['No, it is not symmetrical', 'symmetry', 'equal size'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'c', prompt: 'Draw a rectangle on a piece of paper. How many lines of symmetry can you find by folding it?', answer: 'A rectangle has two lines of symmetry: one horizontal and one vertical',
                  options: ['A rectangle has two lines of symmetry: one horizontal and one vertical', 'they are confusing a rectangle with a square', 'they likely missed the second axis of reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['Ask the student to place a small hand mirror on the line they drew through the shape.', 'Explain that if the reflection in the mirror makes the original shape look complete, then it is a line of symmetry.', 'If the reflection looks distorted or creates a different shape, the line is incorrect.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_105', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "symmetry" with "congruence" (equal size).',
          parts: [
                { id: 'a', prompt: 'Can a triangle have more than one line of symmetry? Explain your reasoning.', answer: 'Yes, an equilateral triangle has three lines of symmetry',
                  options: ['Yes, an equilateral triangle has three lines of symmetry', 'symmetry', 'congruence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' },
                { id: 'b', prompt: 'Design a simple shape that has at least two lines of symmetry and draw it on a grid.', answer: 'The student should draw a shape like a cross or a rectangle',
                  options: ['The student should draw a shape like a cross or a rectangle', 'symmetry', 'congruence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "congruence" (equal size). They might think that any shape cut into two equal areas is symmetric.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['Ask the student to place a small hand mirror on the line they drew through the shape.', 'Explain that if the reflection in the mirror makes the original shape look complete, then it is a line of symmetry.', 'If the reflection looks distorted or creates a different shape, the line is incorrect.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_106', difficulty: 'standard',
          question: 'A line of symmetry is an imaginary line that divides a 2D shape into two.',
          hint: 'Review the definitions of different types of triangles based on side lengths.',
          misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.',
          parts: [
                { id: 'a', prompt: 'How many lines of symmetry does a scalene triangle have?', answer: 'A scalene triangle has 0 lines of symmetry',
                  options: ['A scalene triangle has 0 lines of symmetry', 'scalene', 'any line that divides a shape into two equal areas is a line of symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.' }
          ],
            remediations: { 'any-line-that-divides-a': { steps: ['Take the student back to the "folding test." Ask them to trace the shape on a piece of paper and cut it out.', 'Have them fold it along the line they think is a symmetry line.', 'If the edges don\'t match, ask them to identify where the overlap fails.', 'This physical feedback corrects the "area-division" error.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_106', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.',
          parts: [
                { id: 'a', prompt: 'Draw a shape that has exactly two lines of symmetry, and explain why a third line cannot exist for your shape.', answer: 'A rectangle (that is not a square) is a classic example',
                  options: ['A rectangle (that is not a square) is a classic example', 'any line that divides a shape into two equal areas is a line of symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any line that divides a shape into two equal areas is a line of symmetry.' }
          ],
            remediations: { 'any-line-that-divides-a': { steps: ['Take the student back to the "folding test." Ask them to trace the shape on a piece of paper and cut it out.', 'Have them fold it along the line they think is a symmetry line.', 'If the edges don\'t match, ask them to identify where the overlap fails.', 'This physical feedback corrects the "area-division" error.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_107', difficulty: 'standard',
          question: 'A letter or number has a line of symmetry if it can be folded along a straight.',
          hint: 'Review the "Line of Symmetry" section in the chapter (Chapter 10, 9.1).',
          misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks.',
          parts: [
                { id: 'a', prompt: 'Which of these letters has a vertical line of symmetry: \'B\' or \'A\'?', answer: '\'A\' has a vertical line of symmetry',
                  options: ['\'A\' has a vertical line of symmetry', 'balance', 'symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks "balanced" or "pretty,".' }
          ],
            remediations: { 'students-often-confuse-balance-with': { steps: ['Ask the student to cut the letter out of paper.', 'Tell them: "If you cannot fold the cutout so that the edges touch perfectly on both sides of the crease, it is not a.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_107', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks.',
          parts: [
                { id: 'a', prompt: 'If you fold a paper with the letter \'N\' vertically, do the halves match? Why or why not?', answer: 'No, they do not match',
                  options: ['No, they do not match', 'balance', 'symmetry', 'balanced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks "balanced" or "pretty,".' },
                { id: 'b', prompt: 'Create a list of three numbers that have absolutely no line of symmetry and explain why.', answer: 'Examples: 2, 5, 7',
                  options: ['Examples: 2, 5, 7', 'balance', 'symmetry', 'balanced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "balance" with "symmetry." They might think a letter like \'S\' is symmetric because it looks "balanced" or "pretty,".' }
          ],
            remediations: { 'students-often-confuse-balance-with': { steps: ['Ask the student to cut the letter out of paper.', 'Tell them: "If you cannot fold the cutout so that the edges touch perfectly on both sides of the crease, it is not a.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_108', difficulty: 'standard',
          question: 'Rotational symmetry occurs when a shape is rotated around a central point by.',
          hint: 'Review the concept of angles and a full circle being 360°.',
          misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of degrees you must rotate a square to see it look exactly like it did at the start?', answer: 'The answer is 90°',
                  options: ['The answer is 90°', 'full rotation', 'rotational symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' },
                { id: 'b', prompt: 'If a shape has an order of rotational symmetry of 3, how many times does it look the same in one full 360° turn?', answer: 'It looks the same 3 times',
                  options: ['It looks the same 3 times', 'Order of Symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' },
                { id: 'c', prompt: 'A rectangle is rotated 180°. Does it look the same as it did at the start?', answer: 'Yes, it does',
                  options: ['Yes, it does', 'Order of Symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' }
          ],
            remediations: { 'students-often-confuse-order-of': { steps: ['Ask the student to draw the shape on a piece of paper and cut it out.', 'Place a pencil tip on the center point of the shape and hold it against the desk.', 'Have them rotate the cutout slowly while watching the corners.', 'Ask: "At what angle does the corner reach the spot where a different corner started?"'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_108', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.',
          parts: [
                { id: 'a', prompt: 'Design a simple 2D figure that has rotational symmetry of order 2. Explain how you would verify this.', answer: 'A simple rectangle or a "Z" shape would work',
                  options: ['A simple rectangle or a "Z" shape would work', 'Order of Symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "Order of Symmetry" with the number of sides of a polygon.' }
          ],
            remediations: { 'students-often-confuse-order-of': { steps: ['Ask the student to draw the shape on a piece of paper and cut it out.', 'Place a pencil tip on the center point of the shape and hold it against the desk.', 'Have them rotate the cutout slowly while watching the corners.', 'Ask: "At what angle does the corner reach the spot where a different corner started?"'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_109', difficulty: 'standard',
          question: 'Symmetry in nature refers to the balanced, repeating, or mirror-like patterns.',
          hint: 'Review the concept of mirror images.',
          misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.',
          parts: [
                { id: 'a', prompt: 'What do we call a line that divides an object into two identical mirror images?', answer: 'This is called a line of symmetry',
                  options: ['This is called a line of symmetry', 'symmetry', 'balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' },
                { id: 'b', prompt: 'If a sunflower looks the same after being rotated by 90 degrees, does it possess symmetry? Explain why or why not.', answer: 'Yes, it possesses rotational symmetry',
                  options: ['Yes, it possesses rotational symmetry', 'symmetrical', 'if an object is "symmetrical," it must have a vertical mirror line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' },
                { id: 'c', prompt: 'A starfish has five arms arranged around a center. If you rotate it, how many times will it look identical to its starting position before completing a full.', answer: 'It will look identical 5 times (including the final 360-degree position)',
                  options: ['It will look identical 5 times (including the final 360-degree position)', 'symmetrical', 'if an object is "symmetrical," it must have a vertical mirror line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' }
          ],
            remediations: { 'if-an-object-is-symmetrical': { steps: ['Ask the student to trace the starfish on a piece of paper and cut it out.', 'Have them place a pin in the center and rotate the cutout over the drawing.', 'Ask, "Does the arm land on another arm?" When they see it does, explain that this "landing on" is rotational symmetry,.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_109', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.',
          parts: [
                { id: 'a', prompt: 'Is it possible for a natural object to have rotational symmetry but NO line of symmetry? Give an example.', answer: 'Yes, an example is a pinwheel-like flower or a spiral shell',
                  options: ['Yes, an example is a pinwheel-like flower or a spiral shell', 'symmetrical', 'if an object is "symmetrical," it must have a vertical mirror line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if an object is "symmetrical," it must have a vertical mirror line.' }
          ],
            remediations: { 'if-an-object-is-symmetrical': { steps: ['Ask the student to trace the starfish on a piece of paper and cut it out.', 'Have them place a pin in the center and rotate the cutout over the drawing.', 'Ask, "Does the arm land on another arm?" When they see it does, explain that this "landing on" is rotational symmetry,.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_110', difficulty: 'standard',
          question: 'Symmetry in art and architecture is the balanced distribution of shapes, lines,.',
          hint: 'Review the concept of mirror halves in 2D shapes.',
          misconception: 'Students often confuse "symmetry" with "equality of size." They believe that if two sides of a building have the same.',
          parts: [
                { id: 'a', prompt: 'If a square-shaped courtyard has a pattern that looks the same after a 90-degree turn, does it have rotational symmetry?', answer: 'Yes, because it returns to its original appearance after a partial rotation',
                  options: ['Yes, because it returns to its original appearance after a partial rotation', 'look-alike', 'symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "symmetry" with "equality of size." They believe that if two sides of a building have the same amount of space, it.' }
          ],
            remediations: { 'students-often-confuse-symmetry-with': { steps: ['If a student misses the definition, have them take a piece of paper, cut out a shape, and fold it.', 'Ask them to draw the fold line and check if the edges match exactly.', 'If they don\'t match, explain that the fold line is not a line of symmetry.', 'Repeat this with different shapes until they realize the "matching" part is essential.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
