import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch11_p2: SimDef = {
    id: 'v3_c9_math_ch11_p2',
    title: 'Triangles: Congruence and Properties · Part 2/2',
    subtitle: 'This node covers the Triangle Inequality Theorem (sum of two sides > third side) for.',
    classLevel: 9, subject: 'mathematics', topic: 'Triangles: Congruence and Properties · Part 2/2',
    chapters: ['c9_math_ch11'],
    nodeIds: ['c9_math_ch11_7', 'c9_math_ch11_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Imagine you have three sticks of lengths 4 cm, 7 cm, and 12 cm.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State the Triangle Inequality Theorem for a triangle with sides of lengths $x$, $y$, and $z$. Write all three inequalities.',
        options: ['The three inequalities are: $x + y > z$, $y + z > x$, and $z + x > y$', 'up to 17', 'less than 17'],
        answer: 'The three inequalities are: $x + y > z$, $y + z > x$, and $z + x > y$',
        hook: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends.',
    },
    teaching: [
        { title: 'Triangle Inequalities: Sum of Two Sides', text: 'In any triangle, the sum of the lengths of any two sides is strictly greater than the length of the remaining side.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch11_7', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_7', title: 'Triangle Inequalities: Sum of Two Sides',
          scaffold: { problem: 'A triangular garden plot in a school in Jaipur has two sides measuring 18 metres and 25 metres.',
            steps: [
            { text: 'Identify the given sides: let $a = 18$ m, $b = 25$ m. Let the third side be $x$ metres (positive integer).' },
            { text: 'Apply the Triangle Inequality Theorem. Since $18 < 25$, the three inequalities are: $x + 18 > 25$, $x + 25 > 18$, and.' },
            { text: 'Simplify each inequality:' },
            { text: 'Combine the valid bounds: $7 < x < 43$. Since $x$ is an integer, $x \\in \\{8, 9, 10, \\dots, 42\\}$.' },
            { text: 'Count the integers: from 8 to 42 inclusive, there are $42 - 8 + 1 = 35$ possible lengths.', faded: true, blankAnswer: '35 different integer lengths (8 m to 42 m inclusive).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_8', title: 'Inequalities Between Angles and Sides',
          scaffold: { problem: 'A triangular park has sides measuring 40 m, 55 m, and 65 m. The municipal corporation wants to install a fountain at the vertex with the.',
            steps: [
            { text: 'Identify the given side lengths: PQ = 40 m, QR = 55 m, RP = 65 m.' },
            { text: 'Order the sides from shortest to longest: PQ (40 m) < QR (55 m) < RP (65 m).' },
            { text: 'Recall the theorem: the largest angle is opposite the longest side. The longest side is RP = 65 m.' },
            { text: 'Determine which angle is opposite side RP. Side RP connects vertices R and P, so the opposite vertex is Q.' },
            { text: 'Conclude: ∠Q is the largest angle. The fountain should be placed at vertex Q.', faded: true, blankAnswer: 'Vertex Q (angle ∠Q is the largest).' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch11_8', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch11_8', title: 'You made it',
          caseStudy: { intro: 'You finished Triangles: Congruence and Properties — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch11_7', difficulty: 'standard',
          question: 'In any triangle, the sum of the lengths of any two sides is strictly greater.',
          hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some.',
          misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends.',
          parts: [
                { id: 'a', prompt: 'State the Triangle Inequality Theorem for a triangle with sides of lengths $x$, $y$, and $z$. Write all three inequalities.', answer: 'The three inequalities are: $x + y > z$, $y + z > x$, and $z + x > y$',
                  options: ['The three inequalities are: $x + y > z$, $y + z > x$, and $z + x > y$', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' },
                { id: 'b', prompt: 'Rahul claims that sticks of lengths 5 cm, 5 cm, and 10 cm can form a triangle because $5 + 5 = 10$, and "equal should be okay since the ends meet." Is.', answer: 'Rahul is incorrect',
                  options: ['Rahul is incorrect', 'three sticks touching', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' },
                { id: 'c', prompt: 'Two sides of a triangle are 8 cm and 13 cm. Find the range of possible integer lengths for the third side.', answer: 'Let the third side be $x$ cm',
                  options: ['Let the third side be $x$ cm', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' },
                { id: 'd', prompt: 'A triangle has sides $a$, $b$, $c$ with $a \\le b \\le c$. Prove that checking only $a + b > c$ is sufficient to confirm all three triangle inequalities hold.', answer: 'Given $a \\le b \\le c$, we know $a + c \\ge a + b > c \\ge b$, so $a + c > b$ holds',
                  options: ['Given $a \\le b \\le c$, we know $a + c \\ge a + b > c \\ge b$, so $a + c > b$ holds', 'we only need to check the two smallest sides', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Try to make a triangle with sides 3 cm and 7 cm using a compass: draw arcs of radius 3 and 7 from A and B.', 'They won\'t meet — show the gap.', 'Now try 4 cm and 6 cm ($4+6=10$): arcs meet exactly at one point *on* line AB — the triangle is flat.', 'Try 5 cm and 6 cm ($5+6>10$): arcs meet *above* AB — a real triangle forms.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends.',
          parts: [
                { id: 'a', prompt: 'Priya solves a problem: "Can sides 7 cm, 10 cm, and 18 cm form a triangle?" She writes: $7 + 10 = 17 < 18$, so no.', answer: 'Priya\'s first part is correct: $7 + 10 = 17 < 18$, so no triangle',
                  options: ['Priya\'s first part is correct: $7 + 10 = 17 < 18$, so no triangle', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' },
                { id: 'b', prompt: 'Create a real-world problem (Indian context) where the Triangle Inequality Theorem is used to decide if a construction or route is possible.', answer: 'Example problem: "A farmer in Punjab has fencing wires of lengths 30 m and 45 m',
                  options: ['Example problem: "A farmer in Punjab has fencing wires of lengths 30 m and 45 m', 'up to 17', 'less than 17'],
                  hint: 'If stuck, revisit Class 7 construction of triangles (SSS) — specifically, why some triplets like 3.',
                  misconception: 'Students often write $a + b \\ge c$ instead of $a + b > c$, thinking that if the sum equals the third side, the ends "just meet" and form.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Try to make a triangle with sides 3 cm and 7 cm using a compass: draw arcs of radius 3 and 7 from A and B.', 'They won\'t meet — show the gap.', 'Now try 4 cm and 6 cm ($4+6=10$): arcs meet exactly at one point *on* line AB — the triangle is flat.', 'Try 5 cm and 6 cm ($5+6>10$): arcs meet *above* AB — a real triangle forms.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_8', difficulty: 'standard',
          question: 'In any triangle, the side opposite the larger angle is longer than the side.',
          hint: 'Revisit c9_math_ch11_7 (Triangle Inequalities: Sum of Two Sides) and practice identifying.',
          misconception: 'Students consistently match an angle to its *adjacent* sides instead of its *opposite* side.',
          parts: [
                { id: 'a', prompt: 'In ΔABC, AB = 8 cm, BC = 6 cm, and CA = 7 cm. Write the angles ∠A, ∠B, ∠C in increasing order of their measures.', answer: 'Sides in increasing order: BC (6 cm) < CA (7 cm) < AB (8 cm)',
                  options: ['Sides in increasing order: BC (6 cm) < CA (7 cm) < AB (8 cm)', 'AB is longest, so ∠A is largest'],
                  hint: 'Revisit c9_math_ch11_7 (Triangle Inequalities: Sum of Two Sides) and practice identifying opposite.',
                  misconception: 'Students consistently match an angle to its *adjacent* sides instead of its *opposite* side.' },
                { id: 'b', prompt: 'Two students argue about ΔXYZ where XY = 10 cm, YZ = 8 cm, XZ = 6 cm. Student A says ∠X is the largest. Student B says ∠Z is the largest. Who is correct?', answer: 'Student B is correct',
                  options: ['Student B is correct', 'AB is longest, so ∠A is largest'],
                  hint: 'Revisit c9_math_ch11_7 (Triangle Inequalities: Sum of Two Sides) and practice identifying opposite.',
                  misconception: 'Students consistently match an angle to its *adjacent* sides instead of its *opposite* side.' }
          ],
            remediations: { 'students-consistently-match-an-angle': { steps: ['Draw a large triangle on paper. Label vertices A, B, C.', 'Measure sides with a ruler, angles with a protractor.', 'For each side, draw an arrow to the angle *opposite* it (not touching it).', 'Make a table: Side | Length | Opposite Angle | Angle Measure.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
