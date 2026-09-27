import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch12_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch12_p2: SimDef = {
    id: 'v3_c11_app_ch12_p2',
    title: 'Coordinate Geometry · Part 2/2',
    subtitle: 'This node covers the geometric definition of a parabola, derivation and properties of the.',
    classLevel: 11, subject: 'app', topic: 'Coordinate Geometry · Part 2/2',
    chapters: ['c11_app_ch12'],
    nodeIds: ['c11_app_cbse_12_007', 'c11_app_cbse_12_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Have you ever noticed the curved shape of a flashlight reflector or a satellite dish and wondered why it’s.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'For the parabola $y^2 = 12x$, a student claims the focus is at $(3,0)$ and the directrix is $x = -3$.',
        options: ['The first student is correct', 'midpoint of ZF', 'point F'],
        answer: 'The first student is correct',
        hook: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why.',
    },
    teaching: [
        { title: 'Parabola', text: 'A parabola is the set of all points in a plane that are equidistant from a fixed point (the **focus**) and a fixed line (the **directrix**); the line through the focus perpendicular to the directrix.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_007', title: 'Parabola',
          scaffold: { problem: 'A satellite dish has a parabolic cross-section. The dish is 4 metres wide at the opening and 0.5 metres deep at the vertex.',
            steps: [
            { text: 'Choose coordinate axes. Place the vertex of the parabola at the origin O(0,0).' },
            { text: 'Interpret dimensions. "4 m wide at opening" means the latus rectum width is not given directly; rather, the rim is.' },
            { text: 'Substitute point P into the equation to find \'a\'. $y^2 = 4ax \\Rightarrow (2)^2 = 4a(0.5) \\Rightarrow 4 = 2a \\Rightarrow.' },
            { text: 'State the focus coordinates. Focus is at $(a, 0) = (2, 0)$.' },
            { text: 'Interpret the result. The receiver should be placed **2 metres from the vertex** along the axis of the dish.', faded: true, blankAnswer: 'The receiver should be fixed 2 metres from the vertex along.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_008', title: 'Length of the Latus Rectum',
          scaffold: { problem: 'A satellite dish has a parabolic cross-section with its vertex at the origin and axis along the positive x-axis.',
            steps: [
            { text: 'Model the parabola. Vertex at (0,0), opens right $\\Rightarrow$ equation $y^2 = 4ax$.' },
            { text: 'Substitute $(1, 2)$ into $y^2 = 4ax$: $2^2 = 4a(1) \\Rightarrow 4 = 4a \\Rightarrow a = 1$.' },
            { text: 'Focus is at $(a, 0) = (1, 0)$. So the receiver should be placed 1 metre from the vertex along the axis.' },
            { text: 'Length of latus rectum = $4a = 4 \\times 1 = 4$ metres. This is the width of the dish at the focus level ($x = 1$).' },
            { text: 'Verify: At focus $x = 1$, $y^2 = 4(1)(1) = 4 \\Rightarrow y = \\pm 2$. Endpoints $(1, 2)$ and $(1, -2)$, distance = 4 m.', faded: true, blankAnswer: 'Focus at (1, 0) i.e., 1 m from vertex; Length of latus.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_12_008', title: 'Length of the Latus Rectum',
          caseStudy: { intro: 'Start by asking: *"You are designing a parabolic solar cooker. The focus is where you place the cooking pot.',
            decisions: [{ prompt: 'What is the length of the latus rectum of the parabola $y^2 = -12x$, and what are the coordinates of its endpoints?', options: [
                { text: 'The standard form is $y^2 = -4ax$ with $4a = 12 \\Rightarrow a = 3$', outcome: 'The standard form is $y^2 = -4ax$ with $4a = 12 \\Rightarrow a = 3$.' },
                { text: 'the latus rectum is the same as the focal length', outcome: 'Not quite — Students often believe **"the latus rectum is the same as the focal length"** or **"the latus.', reveals: 'the-latus-rectum-is-the' },
                { text: 'the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for all parabolas', outcome: 'Not quite — Students often believe **"the latus rectum is the same as the focal length"** or **"the latus.', reveals: 'the-latus-rectum-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_12_008', title: 'You made it',
          caseStudy: { intro: 'You finished Coordinate Geometry — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_12_007', difficulty: 'standard',
          question: 'A parabola is the set of all points in a plane that are equidistant from.',
          hint: 'If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the.',
          misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why.',
          parts: [
                { id: 'a', prompt: 'For the parabola $y^2 = 12x$, a student claims the focus is at $(3,0)$ and the directrix is $x = -3$.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'midpoint of ZF', 'point F', 'equidistant from focus and directrix'],
                  hint: 'If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the locus.',
                  misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why it happens:** In the diagram.' },
                { id: 'b', prompt: 'A parabolic arch bridge has its vertex at the highest point, 10 m above the road. The span (width at road level) is 40 m.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'midpoint of ZF', 'point F', 'equidistant from focus and directrix'],
                  hint: 'If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the locus.',
                  misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why it happens:** In the diagram.' },
                { id: 'c', prompt: 'Compare the parabolas $y^2 = 8x$ and $x^2 = 8y$. How do their axes, foci, directrices, and latus rectum lengths differ?', answer: 'For $y^2 = 8x$: $4a=8 \\Rightarrow a=2$',
                  options: ['For $y^2 = 8x$: $4a=8 \\Rightarrow a=2$', 'midpoint of ZF', 'point F', 'equidistant from focus and directrix'],
                  hint: 'If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the locus.',
                  misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why it happens:** In the diagram.' }
          ],
            remediations: { 'misconception-the-vertex-and-the': { steps: ['**Re-derive visually:** Draw the standard parabola $y^2 = 4ax$ step-by-step: mark Origin O, Focus F(a,0), Directrix.', 'Label distances: OF = a, OZ = a.', 'No, directrix is at x=-a." 2.', '**Focus-Directrix Distance Drill:** Give 5 equations (e.g., $x^2 = -12y$, $y^2 = 20x$).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why.',
          parts: [
                { id: 'a', prompt: 'Design a real-world problem (Indian context) where a parabolic shape is used, specifying all dimensions needed to find the focus.', answer: '**Example Problem:** *"A solar cooker at a community kitchen in Rajasthan uses a',
                  options: ['**Example Problem:** *"A solar cooker at a community kitchen in Rajasthan uses a', 'midpoint of ZF', 'point F', 'equidistant from focus and directrix'],
                  hint: 'If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the locus.',
                  misconception: '**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.* **Why it happens:** In the diagram.' }
          ],
            remediations: { 'misconception-the-vertex-and-the': { steps: ['**Re-derive visually:** Draw the standard parabola $y^2 = 4ax$ step-by-step: mark Origin O, Focus F(a,0), Directrix.', 'Label distances: OF = a, OZ = a.', 'No, directrix is at x=-a." 2.', '**Focus-Directrix Distance Drill:** Give 5 equations (e.g., $x^2 = -12y$, $y^2 = 20x$).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_008', difficulty: 'standard',
          question: 'The **latus rectum** of a parabola is the chord passing through the focus and.',
          hint: 'If stuck, review the "Parabola" node (c11_app_cbse_12_007) — specifically the derivation.',
          misconception: 'Students often believe **"the latus rectum is the same as the focal length"** or **"the latus rectum endpoints are.',
          parts: [
                { id: 'a', prompt: 'What is the length of the latus rectum of the parabola $y^2 = -12x$, and what are the coordinates of its endpoints?', answer: 'The standard form is $y^2 = -4ax$ with $4a = 12 \\Rightarrow a = 3$',
                  options: ['The standard form is $y^2 = -4ax$ with $4a = 12 \\Rightarrow a = 3$', 'the latus rectum is the same as the focal length', 'the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for all parabolas'],
                  hint: 'If stuck, review the "Parabola" node (c11_app_cbse_12_007) — specifically the derivation of $y^2.',
                  misconception: 'Students often believe **"the latus rectum is the same as the focal length"** or **"the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for.' },
                { id: 'b', prompt: 'A student claims: *"For the parabola $x^2 = 8y$, the latus rectum lies on the line $y = 2$ and has length 8."* Is this statement fully correct?', answer: 'The statement is **correct**',
                  options: ['The statement is **correct**', 'the latus rectum is the same as the focal length', 'the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for all parabolas'],
                  hint: 'If stuck, review the "Parabola" node (c11_app_cbse_12_007) — specifically the derivation of $y^2.',
                  misconception: 'Students often believe **"the latus rectum is the same as the focal length"** or **"the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for.' },
                { id: 'c', prompt: 'A parabolic reflector (cross-section $y^2 = 4ax$) has a diameter of 20 cm at its opening and is 5 cm deep.', answer: 'Place vertex at origin, axis along +x',
                  options: ['Place vertex at origin, axis along +x', 'the latus rectum is the same as the focal length', 'the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for all parabolas'],
                  hint: 'If stuck, review the "Parabola" node (c11_app_cbse_12_007) — specifically the derivation of $y^2.',
                  misconception: 'Students often believe **"the latus rectum is the same as the focal length"** or **"the latus rectum endpoints are $(\\pm a, \\pm 2a)$ for.' }
          ],
            remediations: { 'the-latus-rectum-is-the': { steps: ['If a student makes the above errors: 1.', '**Force derivation every time**: "Don\'t recall — re-derive.', 'For any standard parabola, write its equation, write focus coordinates, write the line through focus perpendicular.', 'The distance between the two solutions is the length." 2.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
