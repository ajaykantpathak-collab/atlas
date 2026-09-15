import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch10_p1: SimDef = {
    id: 'v3_c12_math_ch10_p1',
    title: 'Vector Algebra · Part 1/2',
    subtitle: '5 N east ≠ 5 N north — direction is half the vector',
    classLevel: 12, subject: 'mathematics', topic: 'Vector Algebra · Part 1/2',
    chapters: ['c12_math_ch10'],
    nodeIds: ['c12_math_cbse_10_001', 'c12_math_cbse_10_002', 'c12_math_cbse_10_003', 'c12_math_cbse_10_004', 'c12_math_cbse_10_005', 'c12_math_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vector classifier', intro: 'Speed is a number; a delivery needs a direction. The difference is the entire subject of vectors.', goal: 'Define vectors by magnitude and direction — and classify zero, unit, collinear, equal and negative correctly.' },
    discovery: {
        question: 'Push a box northeast while your friend pushes east — where does it actually go?',
        options: ['A single resultant direction — vectors add head-to-tail', 'Northeast then east alternately', 'The stronger push wins entirely', 'It spins in place'],
        answer: 'A single resultant direction — vectors add head-to-tail',
        hook: 'Forces, velocities, fields — the world is made of arrows that add. This chapter teaches you to add them.',
    },
    teaching: [
        { title: 'Vectors: Definition and Types', text: 'A vector is a quantity that possesses both magnitude (a non-negative real number representing length or size) and direction (orientation in space).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_10_001', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'Add vector b to a — is the result just the lengths added?',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'case', nodeId: 'c12_math_cbse_10_001', title: 'Vectors: Definition and Types',
          caseStudy: { intro: 'Imagine a cricket bowler running up to deliver the ball. The scoreboard shows his speed: 140 km/h — that\'s a scalar (only magnitude).',
            decisions: [{ prompt: 'Classify each of the following as a scalar or a vector quantity: (i) 50 kg of rice, (ii) 20 m/s towards east, (iii) 100 J of energy, (iv).', options: [
                { text: '(i) Scalar (mass has only magnitude), (ii) Vector (velocity has magnitude and direction),', outcome: '(i) Scalar (mass has only magnitude), (ii) Vector (velocity has magnitude and direction), (iii).' },
                { text: '20 m/s is scalar', outcome: 'Not quite — Students often think: "If two vectors have the same magnitude, they are equal." This is wrong.', reveals: 'if-two-vectors-have-the' },
                { text: 'force is scalar because it\'s measured in newtons', outcome: 'Not quite — Students often think: "If two vectors have the same magnitude, they are equal." This is wrong.', reveals: 'if-two-vectors-have-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_002', title: 'Position Vector and Direction Cosines',
          scaffold: { problem: 'A drone takes off from a warehouse at the origin O(0, 0, 0) and hovers at point P.',
            steps: [
            { text: 'Identify given data. Coordinates of P: x = 12, y = -4, z = 3. Scale: 1 unit = 10 m.' },
            { text: 'Compute the magnitude (distance from origin). \\(r = |\\vec{OP}| = \\sqrt{x^2 + y^2 + z^2} = \\sqrt{12^2 + (-4)^2 + 3^2}.' },
            { text: 'Find direction cosines using \\(l = \\frac{x}{r}, m = \\frac{y}{r}, n = \\frac{z}{r}\\).' },
            { text: 'Find direction angles. \\(\\alpha = \\cos^{-1}(l) = \\cos^{-1}(12/13) \\approx 22.6^\\circ\\), \\(\\beta = \\cos^{-1}(m).' },
            { text: 'Interpret results. The drone is 130 m from the warehouse. Its position vector points mostly along +x (acute angle).', faded: true, blankAnswer: '(i) \\(\\vec{OP} = 12\\hat{i} - 4\\hat{j} + 3\\hat{k}\\) (ii) 130.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_003', title: 'Addition of Vectors: Triangle and Parallelogram Law',
          scaffold: { problem: 'A man walks 3 km due east, then 4 km due north. Find his resultant displacement from the starting point using the triangle law.',
            steps: [
            { text: 'Identify the two displacement vectors: \\(\\vec{OA} = 3\\,\\text{km}\\) east, \\(\\vec{AB} = 4\\,\\text{km}\\) north.' },
            { text: 'Apply triangle law: place tail of \\(\\vec{AB}\\) at head of \\(\\vec{OA}\\). The resultant \\(\\vec{OB}\\) is from O to B.' },
            { text: 'Use Pythagoras theorem (since angle is 90°): \\(|\\vec{OB}| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5\\,\\text{km}\\).' },
            { text: 'Find direction: \\(\\tan\\phi = \\frac{4}{3} \\Rightarrow \\phi = \\tan^{-1}(4/3) \\approx 53.1°\\) north of east.' },
            { text: 'Interpret: The man is 5 km away from start at an angle 53.1° north of east.', faded: true, blankAnswer: '5 km at 53.1° north of east.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_004', title: 'Scalar (Dot) Product of Two Vectors',
          scaffold: { problem: 'A drone flies from point A(2, -1, 3) to point B(5, 2, -1) in metres.',
            steps: [
            { text: 'Find the displacement vector \\(\\vec{d} = \\vec{B} - \\vec{A} = (5-2)\\hat{i} + (2-(-1))\\hat{j} + (-1-3)\\hat{k} = 3\\hat{i}.' },
            { text: 'Write the force vector \\(\\vec{F} = 4\\hat{i} - 3\\hat{j} + 2\\hat{k}\\) N.' },
            { text: 'Compute the dot product \\(\\vec{F} \\cdot \\vec{d} = (4)(3) + (-3)(3) + (2)(-4) = 12 - 9 - 8 = -5\\).' },
            { text: 'The work done is \\(-5\\) joules. The negative sign means the wind opposes the motion overall.' },
            { text: 'Verify units: N × m = J. The magnitude is small, consistent with the drone\'s small displacement.', faded: true, blankAnswer: '-5 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_005', title: 'Vector (Cross) Product of Two Vectors',
          scaffold: { problem: 'A force **F** = (2**î** + 3**ĵ** − **k̂**) N acts at a point with position vector **r** = (**î** − 2**ĵ** + 4**k̂**) m relative to the.',
            steps: [
            { text: 'Identify given vectors in component form: **r** = 1**î** − 2**ĵ** + 4**k̂**, **F** = 2**î** + 3**ĵ** − 1**k̂**.' },
            { text: 'Set up the determinant for cross product: **τ** = det |**î** **ĵ** **k̂**; 1 −2 4; 2 3 −1|.' },
            { text: 'Expand using cofactor expansion (+ − + for first row): **τ** = **î**[ (−2)(−1) − (4)(3) ] − **ĵ**[ (1)(−1) − (4)(2) ].' },
            { text: 'Compute each component: **î**[2 − 12] = −10**î**; −**ĵ**[−1 − 8] = −**ĵ**(−9) = +9**ĵ**; **k̂**[3 + 4] = 7**k̂**.' },
            { text: 'Magnitude |**τ**| = √[(−10)² + 9² + 7²] = √(100+81+49) = √230 ≈ 15.17 N·m.', faded: true, blankAnswer: '**τ** = −10**î** + 9**ĵ** + 7**k̂** N·m; |**τ**| = √230 N·m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_006', title: 'Projection of a Vector on Another Vector',
          scaffold: { problem: 'A drone flies with velocity $\\vec{v} = 6\\hat{i} + 8\\hat{j} + 10\\hat{k}$ m/s.',
            steps: [
            { text: 'Identify the vertical direction vector as $\\hat{k}$. Scalar projection on z-axis = $\\vec{v}\\cdot\\hat{k} = 10$ m/s.' },
            { text: 'For projection on $\\vec{d}$, compute $\\vec{v}\\cdot\\vec{d} = (6)(2) + (8)(-1) + (10)(2) = 12 - 8 + 20 = 24$.' },
            { text: 'Compute $|\\vec{d}|^2 = 2^2 + (-1)^2 + 2^2 = 4 + 1 + 4 = 9$.' },
            { text: 'Scalar multiplier = $\\frac{24}{9} = \\frac{8}{3}$.' },
            { text: 'Vector projection = $\\frac{8}{3}(2\\hat{i} - \\hat{j} + 2\\hat{k}) = \\frac{16}{3}\\hat{i} - \\frac{8}{3}\\hat{j}.', faded: true, blankAnswer: 'Vertical component = 10 m/s (vector: $10\\hat{k}$ m/s).' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_10_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Programming a delivery drone to fly from the warehouse to a building at (3, −4, 12), a junior computes the direction cosines as (3/13, 4/13, 12/13) — \'angles and cosines are positive, so drop the minus.\' The drone heads for the wrong block.',
            decisions: [{ prompt: 'Where did the navigation break?', options: [
                { text: 'At the sign — direction cosines are the components of the unit vector, so they keep the direction ratios\' signs; y = −4 forces m = −4/13, and stripping the minus turned the southbound leg into a northbound one.', outcome: 'The chapter\'s identity: l, m, n are coordinates divided by magnitude — they encode which octant the vector points into, so a flipped sign is a flipped direction.' },
                { text: 'Nowhere mathematically — cosines should be positive; the drone hardware must be faulty.', outcome: 'Direction cosines aren\'t unsigned angles\' absolute values — cosβ is negative for an obtuse angle with the axis; \'always positive\' discards the information the sign was carrying.', reveals: 'cosines-always-positive' },
                { text: 'In the magnitude — he should have used the raw components (3, −4, 12) as the direction cosines.', outcome: 'Raw components are direction ratios, not cosines — cosines must satisfy l²+m²+n²=1; skipping the division by 13 keeps the sign problem and adds a unit problem.', reveals: 'ratios-are-cosines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Components, dot, cross — you now navigate in the language physics and game engines share.',
            decisions: [{ prompt: 'What comes next? Vector Algebra · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Vector Algebra · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'standard',
          question: 'A vector is a quantity that possesses both magnitude (a non-negative real.',
          hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'Two vectors **a** and **b** are drawn in a plane. **a** starts at (1,2) and ends at (4,6). **b** starts at (-2,-1) and ends at (1,3).', answer: 'Yes, **a** and **b** are equal',
                  options: ['Yes, **a** and **b** are equal', 'No, because they start at different points', 'Yes, because both have magnitude 5', 'If two vectors have the same magnitude, they are equal'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002 (3D distance.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' },
                { id: 'b', prompt: 'Draw a vector **v** of magnitude 6 cm making an angle of 30° with the positive x-axis.', answer: 'a unit vector in the direction of **v**, (',
                  options: ['a unit vector in the direction of **v**, (', 'unit vector', 'vector of unit length in same direction', 'If two vectors have the same magnitude, they are equal'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002 (3D distance.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Two vectors are equal if they have the same magnitude." Another student writes: "Two vectors are collinear if they have the same direction.".', answer: 'First statement is FALSE',
                  options: ['First statement is FALSE', 'If two vectors have the same magnitude, they are equal', 'coinitial', 'collinear'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002 (3D distance.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_002', difficulty: 'standard',
          question: 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0).',
          hint: 'If stuck, revisit c11_math_cbse_12_001 (3D coordinates) and c11_math_cbse_12_002 (3D.',
          misconception: 'Students confuse **direction ratios** with **direction cosines**.',
          parts: [
                { id: 'a', prompt: 'Find the position vector of a point P which is at a distance 13 units from the origin and has direction cosines \\(\\left(\\frac{3}{13}, \\frac{-4}{13}.', answer: 'Given \\(r = 13\\) and \\(l = \\frac{3}{13}, m = \\frac{-4}{13}, n = \\frac{12}{13}\\)',
                  options: ['Given \\(r = 13\\) and \\(l = \\frac{3}{13}, m = \\frac{-4}{13}, n = \\frac{12}{13}\\)', 'position vector', 'unit vector', 'position vector of P'],
                  hint: 'If stuck, revisit c11_math_cbse_12_001 (3D coordinates) and c11_math_cbse_12_002 (3D distance.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' },
                { id: 'b', prompt: 'Two vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) have direction cosines \\((l_1, m_1, n_1)\\) and \\((l_2, m_2, n_2)\\) respectively.', answer: 'Correct answer: (A)',
                  options: ['Correct answer: (A)', 'position vector of P', 'unit vector along OP'],
                  hint: 'If stuck, revisit c11_math_cbse_12_001 (3D coordinates) and c11_math_cbse_12_002 (3D distance.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' }
          ],
            remediations: { 'students-confuse-direction-ratios-with': { steps: ['If a student makes the above errors: 1.', '**Revisit c11_math_cbse_12_001** (Coordinates of a Point in 3D Space) — ensure they can plot points and identify.', '**Revisit c11_math_cbse_12_002** (Distance Between Two Points in 3D) — practice magnitude calculation.', '**Do this remedial drill**: Take vector \\(\\vec{v} = -2\\hat{i} + 3\\hat{j} - 6\\hat{k}\\).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_003', difficulty: 'standard',
          question: 'The triangle law of vector addition states that if two vectors are represented.',
          hint: 'Revisit c12_math_cbse_10_001 for vector definitions and c12_math_cbse_10_002 for position.',
          misconception: 'Students often place vectors tail-to-tail when applying the triangle law, effectively using the parallelogram.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The triangle law of vector addition states that if two vectors are represented as two',
                  options: ['The triangle law of vector addition states that if two vectors are represented as two', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the', 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by'],
                  hint: 'Revisit c12_math_cbse_10_001 for vector definitions and c12_math_cbse_10_002 for position vectors.',
                  misconception: 'Students often place vectors tail-to-tail when applying the triangle law, effectively using the parallelogram construction but then taking.' }
          ],
            remediations: { 'students-often-place-vectors-tail': { steps: ['If a student makes the tail-to-tail error, have them physically act out the displacement: walk 3 steps forward, then 4.', 'For magnitude addition error, revisit c12_math_cbse_10_001 (vectors have direction) and c12_math_cbse_10_002 (position.', 'Practice drawing vectors head-to-tail for 5 different angle values and measure the resultant with a ruler to see it’s.', 'Re-do the cosine rule derivation from the triangle to reinforce the formula.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_004', difficulty: 'standard',
          question: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\).',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vector and direction cosines) and.',
          misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i}.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by',
                  options: ['The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the', 'The triangle law of vector addition states that if two vectors are represented as two'],
                  hint: 'If stuck, revisit c12_math_cbse_10_002 (position vector and direction cosines) and.',
                  misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i} + (a_2b_2)\\hat{j}.' }
          ],
            remediations: { 'the-dot-product-of-two': { steps: ['If a student writes the dot product as a vector, immediately ask: "What is the result of multiplying a 1×3 row matrix.', 'The dot product is exactly that." Then re-derive the component form from the distributive property: \\(\\vec{a} \\cdot.', 'Since \\(\\hat{i}\\cdot\\hat{i}=1\\) and \\(\\hat{i}\\cdot\\hat{j}=0\\), only \\(a_1b_1+a_2b_2+a_3b_3\\) remains.', 'For the angle error, draw two vectors tail-to-tail, measure the angle, then translate one vector to head-to-head and.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_005', difficulty: 'standard',
          question: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted.',
          hint: 'If stuck, revisit 3×3 determinant expansion (Class 12 Determinants chapter) and the.',
          misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×',
                  options: ['The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the', 'The triangle law of vector addition states that if two vectors are represented as two'],
                  hint: 'If stuck, revisit 3×3 determinant expansion (Class 12 Determinants chapter) and the right-hand.',
                  misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂** — missing the **minus.' }
          ],
            remediations: { 'students-often-write-the-cross': { steps: ['If a student makes the sign error in the **ĵ** component, have them re-derive the 3×3 determinant expansion step.', 'Explicitly write: **î**(a₂b₃) + **ĵ**(a₃b₁) + **k̂**(a₁b₂) − **î**(a₃b₂) − **ĵ**(a₁b₃) − **k̂**(a₂b₁), then group.', 'For order confusion, practice the right-hand rule physically: fingers from **a** to **b**, thumb gives **a** × **b**.', 'Drill 5 problems where they must state the direction before computing.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_006', difficulty: 'standard',
          question: 'The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector.',
          hint: 'Revisit dot product computation (c12_math_cbse_10_004) and practice finding magnitudes.',
          misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection.',
          parts: [
                { id: 'a', prompt: 'If $\\vec{a} = 2\\hat{i} + 3\\hat{j}$ and $\\vec{b} = \\hat{i} - \\hat{j}$, the scalar projection of $\\vec{a}$ on $\\vec{b}$ is negative.', answer: 'The scalar projection is $|\\vec{a}|\\cos\\theta$',
                  options: ['The scalar projection is $|\\vec{a}|\\cos\\theta$', 'because the dot product is negative'],
                  hint: 'Revisit dot product computation (c12_math_cbse_10_004) and practice finding magnitudes of vectors.',
                  misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection formula.' }
          ],
            remediations: { 'students-often-confuse-the-scalar': { steps: ['If a student makes the denominator error, have them re-derive the vector projection from the scalar projection: scalar.', 'Practice 3 problems where they write both formulas side-by-side and verify they give the same vector.', 'Revisit the dot product node (c12_math_cbse_10_004) for magnitude calculations.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
