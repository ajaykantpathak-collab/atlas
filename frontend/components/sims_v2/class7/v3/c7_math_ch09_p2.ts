import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch09_p2: SimDef = {
    id: 'v3_c7_math_ch09_p2',
    title: 'Geometric Twins · Part 2/2',
    subtitle: 'Covers triangles where two angles and the side between them are known or can be proven.',
    classLevel: 7, subject: 'mathematics', topic: 'Geometric Twins · Part 2/2',
    chapters: ['c7_math_ch09'],
    nodeIds: ['c7_math_ch09_007', 'c7_math_ch09_008', 'c7_math_ch09_009', 'c7_math_ch09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are a surveyor mapping a triangular plot of land in your village schoolyard, and you need.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two equilateral triangles both have perfect 60-degree angles — but one has 4 cm sides and the other 8 cm. Geometric twins, or just lookalikes?',
        options: ['Lookalikes — congruence demands the same shape AND the same size, and 4 cm does not equal 8 cm', 'Twins — matching angles is all congruence needs', 'Twins — any two equilateral triangles are congruent', 'Neither is a real triangle'],
        answer: 'Lookalikes — congruence demands the same shape AND the same size, and 4 cm does not equal 8 cm',
        hook: 'Congruent means one figure can be laid exactly over the other — every side and angle matching. Beware the reverse trap too: two shapes can share the same perimeter or area and still not be congruent.',
    },
    teaching: [
        { title: 'ASA Congruence Criterion: Two Angles and Included Side', text: 'The ASA (Angle-Side-Angle) Congruence Criterion states that if two angles and the included side of one triangle are equal to two angles and the included side of another triangle, then the two.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch09_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Play congruence detective — test two line segments, two angles, and two cut pieces of a 24 square-centimetre rectangle — and declare which pairs truly match edge to edge.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_007', title: 'ASA Congruence Criterion: Two Angles and Included Side',
          scaffold: { problem: 'In $\\triangle ABC$ and $\\triangle DEF$, it is given that $\\angle B = \\angle E = 70^\\circ$, $\\angle C = \\angle F = 50^\\circ$, and side $BC.',
            steps: [
            { text: 'Identify the given measurements for both triangles: $\\angle B = \\angle E$, side $BC = EF$, and $\\angle C = \\angle F$.' },
            { text: 'Verify that side $BC$ is the included side between $\\angle B$ and $\\angle C$, and side $EF$ is the included side.' },
            { text: 'Apply the ASA congruence criterion: Since two angles and the included side of $\\triangle ABC$ are equal to two angles.' },
            { text: 'Use the property of congruent triangles (CPCTC: Corresponding Parts of Congruent Triangles are Congruent) to find.' },
            { text: 'Substitute the given value: $AB = DE = 4.5\\text{ cm}$.', faded: true, blankAnswer: '$\\triangle ABC \\cong \\triangle DEF$, and $AB = 4.5\\text{.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_008', title: 'RHS Congruence Criterion: Right Angle-Hypotenuse-Side',
          scaffold: { problem: 'A farmer in Punjab wants to fence two identical right-angled triangular flower beds in his garden.',
            steps: [
            { text: 'Identify the given right angles in both triangles: $\\angle E = 90^\\circ$ in $\\triangle DEF$ and $\\angle S = 90^\\circ$.' },
            { text: 'Compare the given hypotenuses: Hypotenuse $DF = 17\\text{ m}$ and Hypotenuse $RT = 17\\text{ m}$ (Equal).' },
            { text: 'Compare the given legs: Leg $EF = 8\\text{ m}$ and Leg $ST = 8\\text{ m}$ (Equal).' },
            { text: 'Apply the RHS congruence criterion to state that $\\triangle DEF \\cong \\triangle RST$.' },
            { text: 'Use corresponding parts of congruent triangles (CPCT) or the Pythagorean theorem ($DE^2 + EF^2 = DF^2$) to find $DE$.', faded: true, blankAnswer: '$\\triangle DEF \\cong \\triangle RST$ by RHS, and length.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_009', title: 'Applying Congruence to Solve Geometric Problems',
          scaffold: { problem: 'In a local park in Delhi, a triangular flower bed $ABC$ has side $AB = 5\\text{ m}$ and side $AC = 5\\text{ m}$.',
            steps: [
            { text: 'Identify the given information in $\\triangle ABD$ and $\\triangle ACD$: $AB = AC = 5\\text{ m}$ (given), $AD$ is a common.' },
            { text: 'Choose the appropriate congruence criterion. Since we have a right angle, a hypotenuse ($AB = AC$), and a side ($AD.' },
            { text: 'Write the formal congruence statement matching corresponding vertices: $\\triangle ABD \\cong \\triangle ACD$ by RHS.' },
            { text: 'Apply CPCTC to determine unknown angle measures. Since $\\angle ADB$ and $\\angle ADC$ form a linear pair along line $BC$.' },
            { text: 'Compute the final angle: $\\angle ADB = \\frac{180^\\circ}{2} = 90^\\circ$.', faded: true, blankAnswer: '$\\angle ADB = 90^\\circ$ and $\\triangle ABD \\cong \\triangle.' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch09_010', title: 'Why AAA is Not a Congruence Criterion',
          caseStudy: { intro: 'Imagine you are drawing blueprints for a school playground slide; your little brother draws the exact same slide shape on a tiny postcard, and both drawings.',
            decisions: [{ prompt: 'What condition describes two triangles whose corresponding angles are all equal, and why is this distinct from congruence?', options: [
                { text: 'They are similar triangles, meaning they have the exact same shape but can be different', outcome: 'They are similar triangles, meaning they have the exact same shape but can be different sizes.' },
                { text: 'appearance', outcome: 'Not quite — Students often assume that because AAA proves triangles are identical in "appearance," they must.', reveals: 'because-aaa-proves-triangles-are' }
            ] }] } },
        { type: 'drill', nodeId: 'c7_math_ch09_010', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A photo studio prints the same picture as a passport photo and a big wall poster. Leela tells the shopkeeper the two prints are \'congruent\' because the picture looks identical on both.',
            decisions: [{ prompt: 'Is she using the word correctly?', options: [
                { text: 'No — congruent means same shape AND same size, so one figure could be laid exactly over the other. The photo and poster have the same shape but different sizes: they are similar, not congruent.', outcome: 'This separates congruence from similarity — matching angles alone never guarantees matching size.' },
                { text: 'Yes — since every angle and proportion matches, the two prints are congruent regardless of scale.', outcome: 'Identical angles with different side lengths is similarity; congruence fails the moment one print cannot cover the other.', reveals: 'similar-is-congruent' },
                { text: 'They cannot be compared at all, because congruence only applies to triangles drawn in geometry class.', outcome: 'Congruence applies to any figures — rectangles, stars, photos — the test is always exact match of shape and size.', reveals: 'congruence-only-triangles' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch09_010', title: 'You made it',
          caseStudy: { intro: 'Same shape is only half the test — same size seals it. Congruent figures are geometric identical twins.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch09_007', difficulty: 'standard',
          question: 'The ASA (Angle-Side-Angle) Congruence Criterion states that if two angles and.',
          hint: 'Review c7_math_ch09_002 to practice identifying corresponding parts of triangles before.',
          misconception: 'Students often pick a side that is NOT between the two given angles and mistakenly call it ASA.',
          parts: [
                { id: 'a', prompt: 'In $\\triangle PQR$, which side is the included side between $\\angle P$ and $\\angle Q$?', answer: 'The included side is side $PQ$',
                  options: ['The included side is side $PQ$', 'included side'],
                  hint: 'Review c7_math_ch09_002 to practice identifying corresponding parts of triangles before attempting.',
                  misconception: 'Students often pick a side that is NOT between the two given angles and mistakenly call it ASA.' }
          ],
            remediations: { 'students-often-pick-a-side': { steps: ['Direct the student to draw a rough sketch of the triangle and highlight the two given angles using colored pencils.', 'Ask them to trace the line segment that directly connects the vertices of those two highlighted angles.', 'Emphasize that the letter names of the side must match the vertex letters of the two angles.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_008', difficulty: 'standard',
          question: 'The RHS (Right angle-Hypotenuse-Side) congruence criterion states that if.',
          hint: 'Review c6_math_ch07_073 to practice identifying right-angled triangles and locating.',
          misconception: 'Students often try to apply the RHS criterion to triangles that do not have a $90^\\circ$ angle, or they confuse which.',
          parts: [
                { id: 'a', prompt: 'In $\\triangle ABC$, $\\angle B = 90^\\circ$. What is the name of the side opposite to $\\angle B$?', answer: 'the hypotenuse',
                  options: ['the hypotenuse', 'perpendicular'],
                  hint: 'Review c6_math_ch07_073 to practice identifying right-angled triangles and locating hypotenuses.',
                  misconception: 'Students often try to apply the RHS criterion to triangles that do not have a $90^\\circ$ angle, or they confuse which side is the.' }
          ],
            remediations: { 'students-often-try-to-apply': { steps: ['Remind the student to always scan for the square corner symbol ($90^\\circ$) first before attempting RHS.', 'Have them physically trace the two sides forming the right angle to find the vertex, and then find the side directly.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_009', difficulty: 'standard',
          question: 'Applying congruence involves using known triangle congruence criteria (SSS.',
          hint: 'Review c7_math_ch09_002 and c7_math_ch09_006 to practice identifying corresponding.',
          misconception: 'Students often mix up the corresponding order of vertices when applying CPCTC in complex figures.',
          parts: [
                { id: 'a', prompt: 'If two triangles $\\triangle ABC$ and $\\triangle PQR$ are congruent by the SAS criterion, what does CPCTC allow us to conclude about side $BC$ and side $QR$?', answer: 'CPCTC allows us to conclude that side $BC$ is equal in length to side $QR$',
                  options: ['CPCTC allows us to conclude that side $BC$ is equal in length to side $QR$', 'nothing, because SAS only deals with two sides and an angle'],
                  hint: 'Review c7_math_ch09_002 and c7_math_ch09_006 to practice identifying corresponding vertices and the.',
                  misconception: 'Students often mix up the corresponding order of vertices when applying CPCTC in complex figures.' },
                { id: 'b', prompt: 'A student looks at two triangles and says, "They have all three pairs of sides equal, so triangle $ABC$ is congruent to triangle $QRP$." Is the vertex matching.', answer: 'Yes, vertex matching order is vital',
                  options: ['Yes, vertex matching order is vital', 'order doesn\'t matter as long as the letters are the same'],
                  hint: 'Review c7_math_ch09_002 and c7_math_ch09_006 to practice identifying corresponding vertices and the.',
                  misconception: 'Students often mix up the corresponding order of vertices when applying CPCTC in complex figures.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['Remind the student to trace the triangles on their paper and write the congruence statement letter-by-letter, matching.', 'Say: "Put your finger on vertex A, then on vertex F.', 'If your congruence statement says $\\triangle ABC \\cong \\triangle FED$, then AB must pair with FE, not FD." Have them.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_010', difficulty: 'standard',
          question: 'The Angle-Angle-Angle (AAA) condition is a set of three equal angles between.',
          hint: 'Review the difference between similar figures (same shape, different size) and congruent.',
          misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent.',
          parts: [
                { id: 'a', prompt: 'If Triangle PQR has angles 50°, 60°, and 70°, and Triangle XYZ also has angles 50°, 60°, and 70°, can you conclude that Triangle PQR is congruent to Triangle.', answer: 'No, you cannot conclude congruence',
                  options: ['No, you cannot conclude congruence', 'appearance'],
                  hint: 'Review the difference between similar figures (same shape, different size) and congruent figures.',
                  misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent in size.' },
                { id: 'b', prompt: 'Triangle A has side lengths 4 cm, 5 cm, and 6 cm with angles 40°, 60°, and 80°.', answer: 'Step 1: Identify the given side lengths of Triangle A as 4 cm, 5 cm, and 6 cm',
                  options: ['Step 1: Identify the given side lengths of Triangle A as 4 cm, 5 cm, and 6 cm', 'appearance'],
                  hint: 'Review the difference between similar figures (same shape, different size) and congruent figures.',
                  misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent in size.' },
                { id: 'c', prompt: 'Analyze why the SSS, SAS, and ASA criteria require side measurements, whereas AAA fails to guarantee congruence.', answer: 'Side lengths provide a fixed physical scale or absolute unit of measurement',
                  options: ['Side lengths provide a fixed physical scale or absolute unit of measurement', 'appearance'],
                  hint: 'Review the difference between similar figures (same shape, different size) and congruent figures.',
                  misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent in size.' }
          ],
            remediations: { 'because-aaa-proves-triangles-are': { steps: ['Take out a ruler and draw two triangles with angles 40°, 60°, and 80° on your paper, but make the sides of the second.', 'Ask the student to measure the sides with a ruler and notice that while the corner angles match up perfectly when.', 'Explain clearly: "Angles tell us how sharp the corners are, but sides tell us how far apart the corners live.', 'Without a side measurement, we don\'t know the actual physical size."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "If I draw a triangle on a sheet of paper and use a photocopier to enlarge it by 200%, the new triangle is congruent to the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'appearance'],
                  hint: 'Review the difference between similar figures (same shape, different size) and congruent figures.',
                  misconception: 'Students often assume that because AAA proves triangles are identical in "appearance," they must also be congruent in size.' }
          ],
            remediations: { 'because-aaa-proves-triangles-are': { steps: ['Take out a ruler and draw two triangles with angles 40°, 60°, and 80° on your paper, but make the sides of the second.', 'Ask the student to measure the sides with a ruler and notice that while the corner angles match up perfectly when.', 'Explain clearly: "Angles tell us how sharp the corners are, but sides tell us how far apart the corners live.', 'Without a side measurement, we don\'t know the actual physical size."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
