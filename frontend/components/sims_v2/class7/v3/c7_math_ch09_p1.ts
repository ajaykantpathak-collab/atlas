import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch09_p1: SimDef = {
    id: 'v3_c7_math_ch09_p1',
    title: 'Geometric Twins · Part 1/2',
    subtitle: 'Covers the fundamental definition and visual identification of congruent figures (line.',
    classLevel: 7, subject: 'mathematics', topic: 'Geometric Twins · Part 1/2',
    chapters: ['c7_math_ch09'],
    nodeIds: ['c7_math_ch09_001', 'c7_math_ch09_002', 'c7_math_ch09_003', 'c7_math_ch09_004', 'c7_math_ch09_005', 'c7_math_ch09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you buy two identical brand-new exercise notebooks from a stationery shop in your market for ₹40.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two equilateral triangles both have perfect 60-degree angles — but one has 4 cm sides and the other 8 cm. Geometric twins, or just lookalikes?',
        options: ['Lookalikes — congruence demands the same shape AND the same size, and 4 cm does not equal 8 cm', 'Twins — matching angles is all congruence needs', 'Twins — any two equilateral triangles are congruent', 'Neither is a real triangle'],
        answer: 'Lookalikes — congruence demands the same shape AND the same size, and 4 cm does not equal 8 cm',
        hook: 'Congruent means one figure can be laid exactly over the other — every side and angle matching. Beware the reverse trap too: two shapes can share the same perimeter or area and still not be congruent.',
    },
    teaching: [
        { title: 'Congruent Figures: Same Shape and Size', text: 'Congruent figures are geometric shapes that have the exact same shape and the exact same size, meaning one can be placed precisely over the other so that they cover each other completely through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch09_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Play congruence detective — test two line segments, two angles, and two cut pieces of a 24 square-centimetre rectangle — and declare which pairs truly match edge to edge.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_001', title: 'Congruent Figures: Same Shape and Size',
          scaffold: { problem: 'Priya has two rectangular garden plots at her school in Jaipur. Plot A has a length of $12\\text{ m}$ and a breadth of $5\\text{ m}$.',
            steps: [
            { text: 'Identify the given dimensions for Plot A ($l_1 = 12\\text{ m}$, $b_1 = 5\\text{ m}$) and Plot B ($l_2 = 12\\text{ m}$.' },
            { text: 'Compare corresponding dimensions: length of Plot A equals length of Plot B ($12\\text{ m} = 12\\text{ m}$) and breadth.' },
            { text: 'Conclude that since all corresponding sides are equal, the shapes are congruent.' },
            { text: 'Calculate perimeter for both plots using formula $P = 2(l + b)$. For Plot A: $P_A = 2(12 + 5) = 2(17) = 34\\text{ m}$.' },
            { text: 'Calculate area for both plots using formula $A = l \\times b$. $A_A = 12 \\times 5 = 60\\text{ m}^2$ and $A_B = 12 \\times.', faded: true, blankAnswer: 'The plots are congruent; Perimeter = $34\\text{ m}$, Area.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_002', title: 'Congruence of Triangles: Definition and Conditions',
          scaffold: { problem: 'Two triangular garden beds in a school in Jaipur are congruent, such that $\\triangle PQR \\cong \\triangle STU$.',
            steps: [
            { text: 'Identify the given congruence statement: $\\triangle PQR \\cong \\triangle STU$.' },
            { text: 'Match the required side $ST$ with its corresponding side in $\\triangle PQR$.' },
            { text: 'Substitute the known value of $PQ$ into the relationship: $ST = PQ = 6\\text{ m}$.' },
            { text: 'Match the required angle $\\angle S$ with its corresponding angle in $\\triangle PQR$.' },
            { text: 'Substitute the known value of $\\angle P$: $\\angle S = 37^\\circ$.', faded: true, blankAnswer: 'Length $ST = 6\\text{ m}$ and angle $\\angle S = 37^\\circ$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_003', title: 'Angles of Isosceles Triangles: Properties',
          scaffold: { problem: 'In an isosceles triangle $\\triangle ABC$, side $AB = AC$. If the vertex angle $\\angle A = 50^\\circ$, find the measure of base angles.',
            steps: [
            { text: 'Identify the given values from the problem statement: $\\triangle ABC$ is isosceles with $AB = AC$, and $\\angle.' },
            { text: 'Apply the isosceles triangle angle property: since sides $AB$ and $AC$ are equal, their opposite angles $\\angle C$ and.' },
            { text: 'Set up the angle sum equation for the triangle: $\\angle A + \\angle B + \\angle C = 180^\\circ$, which becomes $50^\\circ.' },
            { text: 'Perform algebraic manipulation to isolate $\\angle B$: subtract $50^\\circ$ from both sides to get $2\\angle B = 180^\\circ.' },
            { text: 'Divide by 2 to find the final angle: $\\angle B = 130^\\circ \\div 2 = 65^\\circ$, meaning $\\angle B = 65^\\circ$ and.', faded: true, blankAnswer: '$\\angle B = 65^\\circ$ and $\\angle C = 65^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_004', title: 'Angles of Equilateral Triangles: All Angles Equal',
          scaffold: { problem: 'In a school art project, Priya cuts an equilateral triangular card of side $8\\text{ cm}$.',
            steps: [
            { text: 'Identify that the original card is an equilateral triangle, so its three interior angles are $\\angle A = 60^\\circ$.' },
            { text: 'Note that the altitude creates two right-angled triangles by dropping a perpendicular from the top vertex to the base.' },
            { text: 'Calculate the divided top vertex angle: since the altitude bisects the $60^\\circ$ angle, the top angle in each smaller.' },
            { text: 'Verify the third angle of the smaller triangle using the angle sum property: $180^\\circ - (90^\\circ + 30^\\circ).' },
            { text: 'Conclude that the interior angles of each smaller right triangle are $30^\\circ$, $60^\\circ$, and $90^\\circ$.', faded: true, blankAnswer: '$30^\\circ$, $60^\\circ$, and $90^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_005', title: 'SSS Congruence Criterion: Three Sides Equal',
          scaffold: { problem: 'In a school craft project, Amit cuts two triangular cardboard pieces.',
            steps: [
            { text: 'List the given side lengths for both triangles: For $\\triangle PQR$: $PQ = 6\\text{ cm}$, $QR = 8\\text{ cm}$, $PR.' },
            { text: 'Match the corresponding sides by comparing lengths: $PQ = 6\\text{ cm}$ matches $XZ = 6\\text{ cm}$ ($PQ = XZ$).' },
            { text: 'Apply the SSS congruence criterion since all three pairs of corresponding sides are equal.' },
            { text: 'Write the correct vertex correspondence: Since $PQ = XZ$, $QR = XY$, and $PR = YZ$, vertex $P$ corresponds to $X$, $Q$.' },
            { text: 'Verify the result by confirming that every side in $\\triangle PQR$ has an equal counterpart in $\\triangle XZY$ with.', faded: true, blankAnswer: '$\\triangle PQR \\cong \\triangle XZY$ by SSS congruence.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch09_006', title: 'SAS Congruence Criterion: Two Sides and Included Angle',
          scaffold: { problem: 'A local park designer in Jaipur is creating two triangular flower beds.',
            steps: [
            { text: 'Identify all given matching components between the two triangles: $PQ = XY = 5\\text{ m}$, $QR = YZ = 7\\text{ m}$, and.' },
            { text: 'Check if the given angle is the included angle. Since $\\angle Q$ is formed between sides $PQ$ and $QR$, and $\\angle Y$.' },
            { text: 'Write the congruence relation: By the SAS congruence criterion, $\\triangle PQR \\cong \\triangle XYZ$.' },
            { text: 'Use corresponding parts of congruent triangles (CPCTC) to find unknown parts: Since corresponding sides are equal, side.' },
            { text: 'Substitute the given value: Given $XZ = 6\\text{ m}$, therefore $PR = 6\\text{ m}$.', faded: true, blankAnswer: '$\\triangle PQR \\cong \\triangle XYZ$ and $PR = 6\\text{ m}$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch09_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A photo studio prints the same picture as a passport photo and a big wall poster. Leela tells the shopkeeper the two prints are \'congruent\' because the picture looks identical on both.',
            decisions: [{ prompt: 'Is she using the word correctly?', options: [
                { text: 'No — congruent means same shape AND same size, so one figure could be laid exactly over the other. The photo and poster have the same shape but different sizes: they are similar, not congruent.', outcome: 'This separates congruence from similarity — matching angles alone never guarantees matching size.' },
                { text: 'Yes — since every angle and proportion matches, the two prints are congruent regardless of scale.', outcome: 'Identical angles with different side lengths is similarity; congruence fails the moment one print cannot cover the other.', reveals: 'similar-is-congruent' },
                { text: 'They cannot be compared at all, because congruence only applies to triangles drawn in geometry class.', outcome: 'Congruence applies to any figures — rectangles, stars, photos — the test is always exact match of shape and size.', reveals: 'congruence-only-triangles' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Same shape is only half the test — same size seals it. Congruent figures are geometric identical twins.',
            decisions: [{ prompt: 'What comes next? Geometric Twins · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geometric Twins · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch09_001', difficulty: 'standard',
          question: 'Congruent figures are geometric shapes that have the exact same shape and the.',
          hint: 'Review line segment measurement and angle comparison in c6_math_ch07_070.',
          misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like.',
          parts: [
                { id: 'a', prompt: 'What condition must two geometric figures satisfy to be called "congruent"?', answer: 'Two figures must have the exact same shape and the exact same size',
                  options: ['Two figures must have the exact same shape and the exact same size', 'similar', 'congruent'],
                  hint: 'Review line segment measurement and angle comparison in c6_math_ch07_070.',
                  misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like a small photo and a large.' },
                { id: 'b', prompt: 'Two triangles have identical interior angles measuring $60^\\circ$, $60^\\circ$, and $60^\\circ$.', answer: 'No, they are not congruent',
                  options: ['No, they are not congruent', 'similar', 'congruent', 'having the same angles is enough to guarantee congruence'],
                  hint: 'Review line segment measurement and angle comparison in c6_math_ch07_070.',
                  misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like a small photo and a large.' },
                { id: 'c', prompt: 'Line segment $AB$ has a length of $7.5\\text{ cm}$. Line segment $CD$ has a length of $7.5\\text{ cm}$. Are line segments $AB$ and $CD$ congruent?', answer: 'Yes, line segments $AB$ and $CD$ are congruent',
                  options: ['Yes, line segments $AB$ and $CD$ are congruent', 'similar', 'congruent'],
                  hint: 'Review line segment measurement and angle comparison in c6_math_ch07_070.',
                  misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like a small photo and a large.' }
          ],
            remediations: { 'students-often-confuse-similar-figures': { steps: ['Remind the student that congruence means "geometric twins"—they must match in size as well as shape.', 'Ask them to imagine trying to cover a large textbook with a small pocket notebook; even though both are rectangular.', 'Tell them: "Same shape AND same size means every matching side and every matching angle must measure identically."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like.',
          parts: [
                { id: 'a', prompt: 'Rohan claims that if you cut any rectangle of area $24\\text{ cm}^2$ into two pieces, the pieces will always be congruent to each other.', answer: 'Rohan\'s claim is false',
                  options: ['Rohan\'s claim is false', 'similar', 'congruent'],
                  hint: 'Review line segment measurement and angle comparison in c6_math_ch07_070.',
                  misconception: 'Students often confuse "similar" figures with "congruent" figures, assuming that if two objects look alike (like a small photo and a large.' }
          ],
            remediations: { 'students-often-confuse-similar-figures': { steps: ['Remind the student that congruence means "geometric twins"—they must match in size as well as shape.', 'Ask them to imagine trying to cover a large textbook with a small pocket notebook; even though both are rectangular.', 'Tell them: "Same shape AND same size means every matching side and every matching angle must measure identically."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_002', difficulty: 'standard',
          question: 'Congruence of triangles means that two triangles have the exact same shape and.',
          hint: 'Review c7_math_ch09_001 to understand how shapes match in size and shape before moving.',
          misconception: 'Students often assume that the letters in a triangle\'s name can be written in any random order when stating congruence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Congruence of triangles means that two triangles have the exact same shape and size, such',
                  options: ['Congruence of triangles means that two triangles have the exact same shape and size, such', 'Congruent figures are geometric shapes that have the exact same shape and the exact same', 'The angles opposite to the equal sides of an isosceles triangle are also equal in', 'An equilateral triangle is a triangle in'],
                  hint: 'Review c7_math_ch09_001 to understand how shapes match in size and shape before moving to triangles.',
                  misconception: 'Students often assume that the letters in a triangle\'s name can be written in any random order when stating congruence (e.g., writing.' }
          ],
            remediations: { 'the-letters-in-a-triangle': { steps: ['To fix this error, have the student physically label the vertices of two cut-out paper triangles with letters $A, B, C$.', 'Instruct them to place vertex $A$ directly on top of $P$, $B$ on top of $Q$, and $C$ on top of $R$, noting how they.', 'Show them that writing $\\triangle ABC \\cong \\triangle PQR$ matches the exact physical contact points, whereas mixing.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_003', difficulty: 'standard',
          question: 'The angles opposite to the equal sides of an isosceles triangle are also equal.',
          hint: 'Review c6_math_ch07_079 for triangle angle sums and c6_math_ch05_057 for solving linear.',
          misconception: 'Students frequently confuse which angles are equal in an isosceles triangle, setting the vertex angle equal to one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angles opposite to the equal sides of an isosceles triangle are also equal in',
                  options: ['The angles opposite to the equal sides of an isosceles triangle are also equal in', 'Congruent figures are geometric shapes that have the exact same shape and the exact same', 'Congruence of triangles means that two triangles have the exact same shape and size, such', 'An equilateral triangle is a triangle in'],
                  hint: 'Review c6_math_ch07_079 for triangle angle sums and c6_math_ch05_057 for solving linear equations.',
                  misconception: 'Students frequently confuse which angles are equal in an isosceles triangle, setting the vertex angle equal to one of the base angles.' }
          ],
            remediations: { 'students-frequently-confuse-which-angles': { steps: ['Guide the student by first asking them to trace the two equal sides with their fingers until they meet at a corner.', 'Point out that the angle *between* those two equal sides is the vertex angle, which can be different from the other two.', 'Remind them: "Equal sides look at equal angles; find the two sides that match, then look across from them to find the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_004', difficulty: 'standard',
          question: 'An equilateral triangle is a triangle in which all three sides are equal.',
          hint: 'Review c6_math_ch07_079 to practice calculating missing angles in triangles before.',
          misconception: 'Students often confuse the side length of an equilateral triangle with its angle measure, attempting to set side.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An equilateral triangle is a triangle in',
                  options: ['An equilateral triangle is a triangle in', 'Congruent figures are geometric shapes that have the exact same shape and the exact same', 'Congruence of triangles means that two triangles have the exact same shape and size, such', 'The angles opposite to the equal sides of an isosceles triangle are also equal in'],
                  hint: 'Review c6_math_ch07_079 to practice calculating missing angles in triangles before tackling.',
                  misconception: 'Students often confuse the side length of an equilateral triangle with its angle measure, attempting to set side lengths equal to angle.' }
          ],
            remediations: { 'students-often-confuse-the-side': { steps: ['Remind the student that side lengths and angle measures have entirely different units (centimetres vs.', 'degrees) and measure different properties of a shape.', 'Draw an equilateral triangle with small sides and one with large sides, and use a protractor to show that regardless.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_005', difficulty: 'standard',
          question: 'Two triangles are congruent by the Side-Side-Side (SSS) congruence criterion.',
          hint: 'Review c7_math_ch09_002 to understand how corresponding parts of triangles correspond.',
          misconception: 'Students often write congruence statements with mismatched vertices, such as writing $\\triangle ABC \\cong \\triangle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two triangles are congruent by the Side-Side-Side (SSS) congruence criterion if all three',
                  options: ['Two triangles are congruent by the Side-Side-Side (SSS) congruence criterion if all three', 'Congruent figures are geometric shapes that have the exact same shape and the exact same', 'Congruence of triangles means that two triangles have the exact same shape and size, such', 'The angles opposite to the equal sides of an isosceles triangle are also equal in'],
                  hint: 'Review c7_math_ch09_002 to understand how corresponding parts of triangles correspond, and.',
                  misconception: 'Students often write congruence statements with mismatched vertices, such as writing $\\triangle ABC \\cong \\triangle FED$ when side $AB$.' }
          ],
            remediations: { 'students-often-write-congruence-statements': { steps: ['When a student makes vertex-matching errors, tell them: "Pause and trace the side lengths with your fingers on both.', 'If side $AB$ is 5 cm and side $FE$ is 5 cm, then vertex $A$ and vertex $B$ must match up with vertex $F$ and vertex $E$.', 'Always list your letters in the exact order of matching side lengths: write $AB$ first, so write $FE$ first in the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch09_006', difficulty: 'standard',
          question: 'The SAS (Side-Angle-Side) Congruence Criterion states that two triangles are.',
          hint: 'Review c7_math_ch09_002 to reinforce how corresponding vertices and sides match up.',
          misconception: 'Students frequently confuse the "included angle" with *any* random angle in the triangle.',
          parts: [
                { id: 'a', prompt: 'In triangle $ABC$, if we are given the lengths of side $AB = 5\\text{ cm}$ and side $BC = 7\\text{ cm}$, which angle is considered the "included angle" required.', answer: 'B) $\\angle B$',
                  options: ['B) $\\angle B$', 'included', 'included angle'],
                  hint: 'Review c7_math_ch09_002 to reinforce how corresponding vertices and sides match up in congruent.',
                  misconception: 'Students frequently confuse the "included angle" with *any* random angle in the triangle.' },
                { id: 'b', prompt: 'Rohan claims that if triangle $XYZ$ has side $XY = 6\\text{ cm}$, side $YZ = 8\\text{ cm}$, and $\\angle X = 50^\\circ$, and triangle $PQR$ has side $PQ = 6\\text{.', answer: 'B) No',
                  options: ['B) No', 'included angle'],
                  hint: 'Review c7_math_ch09_002 to reinforce how corresponding vertices and sides match up in congruent.',
                  misconception: 'Students frequently confuse the "included angle" with *any* random angle in the triangle.' },
                { id: 'c', prompt: 'In $\\triangle ABC$ and $\\triangle DEF$, it is given that $AB = 4\\text{ cm}$, $DE = 4\\text{ cm}$, $\\angle B = 60^\\circ$, $\\angle E = 60^\\circ$, $BC = 7\\text{.', answer: 'B) $\\triangle ABC \\cong \\triangle DEF$',
                  options: ['B) $\\triangle ABC \\cong \\triangle DEF$', 'included angle'],
                  hint: 'Review c7_math_ch09_002 to reinforce how corresponding vertices and sides match up in congruent.',
                  misconception: 'Students frequently confuse the "included angle" with *any* random angle in the triangle.' },
                { id: 'd', prompt: 'Analyze the following scenario: Two triangles have two pairs of equal sides and one pair of equal non-included angles.', answer: 'B) No',
                  options: ['B) No', 'equal sides and angles', 'included angle'],
                  hint: 'Review c7_math_ch09_002 to reinforce how corresponding vertices and sides match up in congruent.',
                  misconception: 'Students frequently confuse the "included angle" with *any* random angle in the triangle.' }
          ],
            remediations: { 'students-frequently-confuse-the-included': { steps: ['If a student struggles with identifying the included angle, have them physically trace the two given sides with two.', 'Tell them: "The vertex where your two colored pencils touch and pinch together is your included angle!" Practice.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
