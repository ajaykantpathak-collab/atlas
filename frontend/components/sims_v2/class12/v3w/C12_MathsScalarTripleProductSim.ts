import type { SimDef } from '../../engine/types';
import C12_MathsScalarTripleProductSim from '../../../simulations/three/C12_MathsScalarTripleProductSim';

/** v3 wrapped master — C12_MathsScalarTripleProductSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathsscalartripleproductsim: SimDef = {
    id: 'v3w_c12_mathsscalartripleproductsim',
    title: 'Scalar (Dot) Product of Two Vectors',
    subtitle: 'This node covers the definition, geometric interpretation, algebraic computation,.',
    classLevel: 12, subject: 'mathematics', topic: 'Scalar (Dot) Product of Two Vectors',
    chapters: [],
    nodeIds: ['c12_math_cbse_10_004', 'c12_math_cbse_10_005', 'c12_math_cbse_10_006', 'c12_math_cbse_10_007', 'c12_math_cbse_10_008', 'c12_math_cbse_10_001', 'c12_math_cbse_10_002', 'c12_math_cbse_10_003', 'c12_math_cbse_03_004', 'c12_math_cbse_03_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a kite flying in the sky — the wind exerts a force \\(\\vec{F}\\) on the kite, but the kite moves only.', goal: 'Master Scalar (Dot) Product of Two Vectors.' },
    discovery: {
        question: 'Two vectors **a** and **b** are drawn in a plane. **a** starts at (1,2) and ends at (4,6). **b** starts at (-2,-1) and ends at (1,3).',
        options: ['Yes, **a** and **b** are equal', 'No, because they start at different points', 'Yes, because both have magnitude 5'],
        answer: 'Yes, **a** and **b** are equal',
        hook: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
    },
    teaching: [
        { title: 'The scalar (dot) product of two non-zero.', text: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by \\(\\vec{a} \\cdot \\vec{b}\\), is defined as the product of their magnitudes and the cosine of the angle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_004', title: 'The scalar (dot) product of two.',
          scaffold: { problem: 'A drone flies from point A(2, -1, 3) to point B(5, 2, -1) in metres.',
            steps: [
            { text: 'Find the displacement vector \\(\\vec{d} = \\vec{B} - \\vec{A} = (5-2)\\hat{i} + (2-(-1))\\hat{j} + (-1-3)\\hat{k} = 3\\hat{i}.' },
            { text: 'Write the force vector \\(\\vec{F} = 4\\hat{i} - 3\\hat{j} + 2\\hat{k}\\) N.' },
            { text: 'Compute the dot product \\(\\vec{F} \\cdot \\vec{d} = (4)(3) + (-3)(3) + (2)(-4) = 12 - 9 - 8 = -5\\).' },
            { text: 'The work done is \\(-5\\) joules. The negative sign means the wind opposes the motion overall.' },
            { text: 'Verify units: N × m = J. The magnitude is small, consistent with the drone\'s small displacement.', faded: true, blankAnswer: '-5 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_005', title: 'The vector (cross) product of two.',
          scaffold: { problem: 'A force **F** = (2**î** + 3**ĵ** − **k̂**) N acts at a point with position vector **r** = (**î** − 2**ĵ** + 4**k̂**) m relative to the.',
            steps: [
            { text: 'Identify given vectors in component form: **r** = 1**î** − 2**ĵ** + 4**k̂**, **F** = 2**î** + 3**ĵ** − 1**k̂**.' },
            { text: 'Set up the determinant for cross product: **τ** = det |**î** **ĵ** **k̂**; 1 −2 4; 2 3 −1|.' },
            { text: 'Expand using cofactor expansion (+ − + for first row): **τ** = **î**[ (−2)(−1) − (4)(3) ] − **ĵ**[ (1)(−1) − (4)(2) ] +.' },
            { text: 'Compute each component: **î**[2 − 12] = −10**î**; −**ĵ**[−1 − 8] = −**ĵ**(−9) = +9**ĵ**; **k̂**[3 + 4] = 7**k̂**.' },
            { text: 'Magnitude |**τ**| = √[(−10)² + 9² + 7²] = √(100+81+49) = √230 ≈ 15.17 N·m.', faded: true, blankAnswer: '**τ** = −10**î** + 9**ĵ** + 7**k̂** N·m; |**τ**| = √230 N·m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_006', title: 'The projection of a vector $\\vec{a}$ on.',
          scaffold: { problem: 'A drone flies with velocity $\\vec{v} = 6\\hat{i} + 8\\hat{j} + 10\\hat{k}$ m/s.',
            steps: [
            { text: 'Identify the vertical direction vector as $\\hat{k}$. Scalar projection on z-axis = $\\vec{v}\\cdot\\hat{k} = 10$ m/s.' },
            { text: 'For projection on $\\vec{d}$, compute $\\vec{v}\\cdot\\vec{d} = (6)(2) + (8)(-1) + (10)(2) = 12 - 8 + 20 = 24$.' },
            { text: 'Compute $|\\vec{d}|^2 = 2^2 + (-1)^2 + 2^2 = 4 + 1 + 4 = 9$.' },
            { text: 'Scalar multiplier = $\\frac{24}{9} = \\frac{8}{3}$.' },
            { text: 'Vector projection = $\\frac{8}{3}(2\\hat{i} - \\hat{j} + 2\\hat{k}) = \\frac{16}{3}\\hat{i} - \\frac{8}{3}\\hat{j} +.', faded: true, blankAnswer: 'Vertical component = 10 m/s (vector: $10\\hat{k}$ m/s)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_007', title: 'The section formula for vectors gives.',
          scaffold: { problem: 'A drone flies from point P(3, -2, 5) to point Q(-1, 4, -3). It stops at a point R that divides the journey internally in the ratio 2:3.',
            steps: [
            { text: 'Write position vectors of P and Q. **a** = 3**i** - 2**j** + 5**k**, **b** = -**i** + 4**j** - 3**k**.' },
            { text: 'Identify the formula for internal division. **r** = (m**b** + n**a**)/(m+n) with m=2, n=3.' },
            { text: 'Substitute values. **r** = (2(-**i**+4**j**-3**k**) + 3(3**i**-2**j**+5**k**))/(2+3).' },
            { text: 'Simplify numerator: 2(-**i**+4**j**-3**k**) = -2**i**+8**j**-6**k**; 3(3**i**-2**j**+5**k**) = 9**i**-6**j**+15**k**.' },
            { text: 'Divide by 5. **r** = (7/5)**i** + (2/5)**j** + (9/5)**k**. Coordinates: (1.4, 0.4, 1.8).', faded: true, blankAnswer: 'Position vector = (7/5)**i** + (2/5)**j** + (9/5)**k**;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_008', title: 'The vector equation of a line in.',
          scaffold: { problem: 'A drone takes off from a point A(2, -1, 3) on the school roof and flies in a straight line towards point B(5, 2, -1) on the water tank.',
            steps: [
            { text: 'Identify position vectors of A and B. **a = 2i - j + 3k**, **b = 5i + 2j - k**.' },
            { text: 'Write vector equation using point A and direction vector: **r = a + λ(b - a) = (2i - j + 3k) + λ(3i + 3j - 4k)**.' },
            { text: 'For λ = 2, substitute: **r = (2i - j + 3k) + 2(3i + 3j - 4k) = (2+6)i + (-1+6)j + (3-8)k = 8i + 5j - 5k**.' },
            { text: 'Distance from A = |λ| × |direction vector|. |direction| = √(3²+3²+(-4)²) = √(9+9+16) = √34.' },
            { text: 'Substitute λ = 7/√34 into **r** to get coordinates: **r = (2i - j + 3k) + (7/√34)(3i + 3j - 4k)** = (2 + 21/√34)i + (-1.', faded: true, blankAnswer: 'Vector equation: **r = (2i - j + 3k) + λ(3i + 3j - 4k)**..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_001', title: 'A vector is a quantity that possesses.',
          scaffold: { problem: 'A hiker walks 3 km due east from base camp to a waterfall, then 4 km due north to a viewpoint.',
            steps: [
            { text: 'Draw coordinate axes with base camp at origin O(0,0). East = +x, North = +y.' },
            { text: 'Vector **a** = displacement from O to A = directed line segment OA. Magnitude |**a**| = 3 km (scale: 3 cm).' },
            { text: '(i) **a** is a non-zero vector (magnitude 3 ≠ 0). It has definite direction (east).' },
            { text: '(ii) **a** is along x-axis, **b** is along y-axis. They are perpendicular, not parallel to the same line.' },
            { text: '(iii) Zero vector would occur if the hiker returned to a point and stayed there (e.g., displacement from viewpoint to.' },
            { text: '(iv) Unit vector in direction of **a** = **â** = **a**/|**a**|.', faded: true, blankAnswer: '(i) **a** is a non-zero, non-unit free vector. (ii) **a**.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_10_005', title: 'Identify each idea',
          dissect: { specimen: 'Scalar (Dot) Product of Two Vectors', spots: [
            { id: 's1', label: 'The scalar dot product of', prompt: 'Which idea is this? — The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by.', answer: 'The scalar dot product of', options: ['The scalar dot product of', 'The vector cross product of', 'The projection of a vector', 'The section formula for vectors'] },
            { id: 's2', label: 'The vector cross product of', prompt: 'Which idea is this? — The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×.', answer: 'The vector cross product of', options: ['The vector cross product of', 'The scalar dot product of', 'The projection of a vector', 'The section formula for vectors'] },
            { id: 's3', label: 'The projection of a vector', prompt: 'Which idea is this? — The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector component.', answer: 'The projection of a vector', options: ['The projection of a vector', 'The scalar dot product of', 'The vector cross product of', 'The section formula for vectors'] },
            { id: 's4', label: 'The section formula for vectors', prompt: 'Which idea is this? — The section formula for vectors gives the position vector of a point R that divides the.', answer: 'The section formula for vectors', options: ['The section formula for vectors', 'The scalar dot product of', 'The vector cross product of', 'The projection of a vector'] },
            { id: 's5', label: 'The vector equation of a', prompt: 'Which idea is this? — The vector equation of a line in three-dimensional space is given by **r = a + λ b**,.', answer: 'The vector equation of a', options: ['The vector equation of a', 'The scalar dot product of', 'The vector cross product of', 'The projection of a vector'] },
            { id: 's6', label: 'A vector is a quantity', prompt: 'Which idea is this? — A vector is a quantity that possesses both magnitude (a non-negative real number.', answer: 'A vector is a quantity', options: ['A vector is a quantity', 'The scalar dot product of', 'The vector cross product of', 'The projection of a vector'] }
          ] } }
    ],
    explore: { component: C12_MathsScalarTripleProductSim, prompt: 'Explore the interactive — Scalar (Dot) Product of Two Vectors' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_10_004', difficulty: 'standard',
          question: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\),.',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vector and direction cosines) and.',
          misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i} +.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by',
                  options: ['The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector component', 'The section formula for vectors gives the position vector of a point R that divides the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i} + (a_2b_2)\\hat{j} +.' }
          ],
            remediations: { 'the-dot-product-of-two': { steps: ['If a student writes the dot product as a vector, immediately ask: "What is the result of multiplying a 1×3 row matrix.', 'The dot product is exactly that." Then re-derive the component form from the distributive property: \\(\\vec{a} \\cdot.', 'Since \\(\\hat{i}\\cdot\\hat{i}=1\\) and \\(\\hat{i}\\cdot\\hat{j}=0\\), only \\(a_1b_1+a_2b_2+a_3b_3\\) remains.', 'For the angle error, draw two vectors tail-to-tail, measure the angle, then translate one vector to head-to-head and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_005', difficulty: 'standard',
          question: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by.',
          hint: 'If stuck, revisit 3×3 determinant expansion (Class 12 Determinants chapter) and the.',
          misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂** —.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×',
                  options: ['The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by', 'The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector component', 'The section formula for vectors gives the position vector of a point R that divides the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂** — missing the **minus.' }
          ],
            remediations: { 'students-often-write-the-cross': { steps: ['If a student makes the sign error in the **ĵ** component, have them re-derive the 3×3 determinant expansion step by.', 'Explicitly write: **î**(a₂b₃) + **ĵ**(a₃b₁) + **k̂**(a₁b₂) − **î**(a₃b₂) − **ĵ**(a₁b₃) − **k̂**(a₂b₁), then group by.', 'For order confusion, practice the right-hand rule physically: fingers from **a** to **b**, thumb gives **a** × **b**.', 'Drill 5 problems where they must state the direction before computing.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_006', difficulty: 'standard',
          question: 'The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector.',
          hint: 'Revisit dot product computation (c12_math_cbse_10_004) and practice finding magnitudes of.',
          misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection.',
          parts: [
                { id: 'a', prompt: 'If $\\vec{a} = 2\\hat{i} + 3\\hat{j}$ and $\\vec{b} = \\hat{i} - \\hat{j}$, the scalar projection of $\\vec{a}$ on $\\vec{b}$ is negative.', answer: 'The scalar projection is $|\\vec{a}|\\cos\\theta$',
                  options: ['The scalar projection is $|\\vec{a}|\\cos\\theta$', 'because the dot product is negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection formula.' }
          ],
            remediations: { 'students-often-confuse-the-scalar': { steps: ['If a student makes the denominator error, have them re-derive the vector projection from the scalar projection: scalar.', 'Practice 3 problems where they write both formulas side-by-side and verify they give the same vector.', 'Revisit the dot product node (c12_math_cbse_10_004) for magnitude calculations.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection.',
          parts: [
                { id: 'a', prompt: 'A student computes the projection of $\\vec{a} = 3\\hat{i} + 4\\hat{j}$ on $\\vec{b} = 5\\hat{i}$ as $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|} = \\frac{15}{5} = 3$ and.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'incorrect because vector projection formula has $|\\vec{b}|^2$'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the scalar projection formula $\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$ with the vector projection formula.' }
          ],
            remediations: { 'students-often-confuse-the-scalar': { steps: ['If a student makes the denominator error, have them re-derive the vector projection from the scalar projection: scalar.', 'Practice 3 problems where they write both formulas side-by-side and verify they give the same vector.', 'Revisit the dot product node (c12_math_cbse_10_004) for magnitude calculations.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_007', difficulty: 'standard',
          question: 'The section formula for vectors gives the position vector of a point R that.',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vectors) and c12_math_cbse_10_003.',
          misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for vectors gives the position vector of a point R that divides the',
                  options: ['The section formula for vectors gives the position vector of a point R that divides the', 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The projection of a vector $\\vec{a}$ on another vector $\\vec{b}$ is the vector component'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b** - n**a**)/(m-n),.' }
          ],
            remediations: { 'students-consistently-write-the-external': { steps: ['Revisit the derivation in NCERT Section 10.5.3 (Case II): draw the directed line OP, OQ, OR.', 'Write vector equations: **r** = **a** + **PR**, **b** = **a** + **PQ**.', 'For external division PR:RQ = m:n, so **PR** = (m/(m-n))**PQ**.', 'Substitute **PQ** = **b** - **a** to get **r** = **a** + (m/(m-n))(**b** - **a**) = (m**b** - n**a**)/(m-n).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_008', difficulty: 'standard',
          question: 'The vector equation of a line in three-dimensional space is given by **r = a +.',
          hint: 'Revisit c12_math_cbse_10_003 (vector addition) and c12_math_cbse_10_007 (section formula).',
          misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: **r = (i + 2j + 3k) + λ(2i + 3j + 4k)** and L₂: **r = (2i + 4j + 5k) + μ(4i + 6j + 8k)**.', answer: 'The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**',
                  options: ['The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**', 'intersecting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to subtract the.' }
          ],
            remediations: { 'students-often-write-the-cartesian': { steps: ['If a student makes the above error, have them: (1) Plot the point (x₁, y₁, z₁) and the origin on a 3D sketch.', '(2) Show that the vector from origin to a general point on the line is **a + λb**, not **λb**.', '(3) Derive Cartesian by equating components: x = x₁ + λa ⇒ λ = (x - x₁)/a.', '(4) Practice 5 conversions where the point is not the origin, e.g., through (2, -1, 3) parallel to (1, 2, -2).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: **r = (i + 2j + 3k) + λ(2i + 3j + 4k)** and L₂: **r = (2i + 4j + 5k) + μ(4i + 6j + 8k)**.', answer: 'The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**',
                  options: ['The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**', 'intersecting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to subtract the.' }
          ],
            remediations: { 'students-often-write-the-cartesian': { steps: ['If a student makes the above error, have them: (1) Plot the point (x₁, y₁, z₁) and the origin on a 3D sketch.', '(2) Show that the vector from origin to a general point on the line is **a + λb**, not **λb**.', '(3) Derive Cartesian by equating components: x = x₁ + λa ⇒ λ = (x - x₁)/a.', '(4) Practice 5 conversions where the point is not the origin, e.g., through (2, -1, 3) parallel to (1, 2, -2).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'standard',
          question: 'A vector is a quantity that possesses both magnitude (a non-negative real.',
          hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'Two vectors **a** and **b** are drawn in a plane. **a** starts at (1,2) and ends at (4,6). **b** starts at (-2,-1) and ends at (1,3).', answer: 'Yes, **a** and **b** are equal',
                  options: ['Yes, **a** and **b** are equal', 'No, because they start at different points', 'Yes, because both have magnitude 5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' },
                { id: 'b', prompt: 'Draw a vector **v** of magnitude 6 cm making an angle of 30° with the positive x-axis.', answer: 'a unit vector in the direction of **v**, (',
                  options: ['a unit vector in the direction of **v**, (', 'unit vector', 'vector of unit length in same direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Two vectors are equal if they have the same magnitude." Another student writes: "Two vectors are collinear if they have the same direction.".', answer: 'First statement is FALSE',
                  options: ['First statement is FALSE', 'If two vectors have the same magnitude, they are equal', 'coinitial', 'collinear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
