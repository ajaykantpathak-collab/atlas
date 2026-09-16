import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch11_p2: SimDef = {
    id: 'v3_c6_math_ch11_p2',
    title: 'Practical Geometry · Part 2/2',
    subtitle: 'This node covers triangle construction using ASA and RHS criteria.',
    classLevel: 6, subject: 'mathematics', topic: 'Practical Geometry · Part 2/2',
    chapters: ['c6_math_ch11'],
    nodeIds: ['c6_math_ch11_113', 'c6_math_ch11_114'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are a carpenter building a triangular frame and you know exactly how long one side is and what.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students argue over whose angle is bigger — one drew a small opening with very long arms, the other a wide opening with tiny arms. Who actually wins?',
        options: ['The wide opening — an angle is the turn at the vertex, and arm length does not matter', 'The long arms — longer lines always mean a bigger angle', 'They tie — every drawn angle is the same size', 'Neither — angles cannot be compared without colours'],
        answer: 'The wide opening — an angle is the turn at the vertex, and arm length does not matter',
        hook: 'Construction means replacing guessing with measuring — ruler for straight lines, compass for curves, protractor centred on the vertex. And you need not start at zero: drawing from the 1 cm mark to the 6 cm mark still gives exactly 5 cm.',
    },
    teaching: [
        { title: 'Constructing Triangles: ASA and RHS', text: 'Constructing triangles using ASA (Angle-Side-Angle) and RHS (Right-angle-Hypotenuse-Side) criteria allows us to draw a unique triangle by precisely replicating two angles and the included side, or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch11_119', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Open the geometry box — pick the right tool for each task — and construct a 5 cm segment and an exact angle, placing the protractor centre dead on the vertex.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch11_119', title: 'Constructing Triangles: ASA and RHS',
          caseStudy: { intro: 'Imagine you are a carpenter building a triangular frame and you know exactly how long one side is and what angles it should make with the other two sides; how.',
            decisions: [{ prompt: 'In an ASA construction, what does the "included side" refer to? A) Any side of the triangle.', options: [
                { text: 'B) The side lying between the two given angles', outcome: 'B) The side lying between the two given angles. A wrong answer suggests the student confuses.' },
                { text: 'included', outcome: 'Not quite — Students often try to draw the two angles first and then the side, or they try to place the angles.', reveals: 'students-often-try-to-draw' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch11_120', title: 'Practical Applications of Geometric Construction',
          scaffold: { problem: 'A carpenter is building a wooden frame. One corner must be a 60° angle. He has a piece of wood 50cm long. How can he mark the 60° angle?',
            steps: [
            { text: 'Identify the vertex point on the wood where the turn begins.' },
            { text: 'Use a pencil and ruler to draw a straight base line on the wood.' },
            { text: 'Align the protractor center with the vertex and the zero line with the base line.' },
            { text: 'Mark the 60° point on the wood by looking at the protractor scale.' },
            { text: 'Draw a second line from the vertex through the 60° mark.', faded: true, blankAnswer: 'A 60° angle marked correctly on the wood.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch11_120', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch11_119', title: 'Use it in the wild',
          caseStudy: { intro: 'A student must measure an angle drawn in a tiny diagram — its arms are too short for the protractor to reach. Meanwhile a classmate claims the 40° angle on her small notebook is \'smaller\' than the 40° angle on the classroom chart.',
            decisions: [{ prompt: 'How do you measure the short-armed angle — and is the classmate right?', options: [
                { text: 'Extend the arms with a ruler — an angle is the amount of rotation between its arms, not their length, so making the arms longer changes nothing about the opening and lets the protractor sit properly. That is also why the classmate is wrong: a 40° angle is 40° whether drawn on a stamp or a wall.', outcome: 'Arm length is decoration; rotation is the angle. Extending the arms is the standard fix and it cannot alter the measurement.' },
                { text: 'Nothing can be done — short arms make the angle unmeasurable, so she should just guess.', outcome: 'The arms can always be extended with a straightedge — the opening between them stays identical while the arms grow.', reveals: 'short-arms-cant-measure' },
                { text: 'The classmate is right — a bigger drawing means a bigger angle, since the arms cover more paper.', outcome: 'Angles measure rotation, not reach — two 40° angles are identical however long their arms are drawn.', reveals: 'arm-length-changes-angle' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch11_120', title: 'You made it',
          caseStudy: { intro: 'A freehand sketch hopes to be right; a construction knows it is right. The tools turn looking close into measuring exactly.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch11_119', difficulty: 'standard',
          question: 'Constructing triangles using ASA (Angle-Side-Angle) and RHS.',
          hint: 'Review the "Drawing Angles" section in Chapter 11/12 regarding the use of a protractor.',
          misconception: 'Students often try to draw the two angles first and then the side, or they try to place the angles on the same side.',
          parts: [
                { id: 'a', prompt: 'In an ASA construction, what does the "included side" refer to? A) Any side of the triangle. B) The side lying between the two given angles.', answer: 'B) The side lying between the two given angles',
                  options: ['B) The side lying between the two given angles', 'included'],
                  hint: 'Review the "Drawing Angles" section in Chapter 11/12 regarding the use of a protractor and ruler.',
                  misconception: 'Students often try to draw the two angles first and then the side, or they try to place the angles on the same side of the base line.' }
          ],
            remediations: { 'students-often-try-to-draw': { steps: ['If a student fails, tell them: "Always draw the \'Side\' in ASA or the \'Leg\' in RHS as your very first step." Then, have.', 'Instruct them to place the center of the protractor on one of those dots, ensuring the 0-degree line lies exactly.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch11_120', difficulty: 'standard',
          question: 'Practical applications of geometric construction involve using basic tools like.',
          hint: 'Review the definition of an angle and the use of a protractor.',
          misconception: 'Students often confuse the length of the arms of an angle with the "size" of the angle.',
          parts: [
                { id: 'a', prompt: 'You are asked to draw a path for a toy car that makes a 45° turn. How would you start this using a ruler and protractor?', answer: 'First, draw a straight line (the base ray) using the ruler',
                  options: ['First, draw a straight line (the base ray) using the ruler', 'the tool'],
                  hint: 'Review the definition of an angle and the use of a protractor.',
                  misconception: 'Students often confuse the length of the arms of an angle with the "size" of the angle.' }
          ],
            remediations: { 'students-often-confuse-the-length': { steps: ['If a student thinks a long line means a larger angle, have them draw two angles of 30° on a paper—one with short 2cm.', 'Use a protractor to show they both measure 30°.', 'Explain that the angle depends only on the "opening" or rotation between the lines, not how far the lines extend.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
