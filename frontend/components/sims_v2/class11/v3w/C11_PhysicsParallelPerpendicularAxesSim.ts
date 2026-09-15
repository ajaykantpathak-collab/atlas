import type { SimDef } from '../../engine/types';
import C11_PhysicsParallelPerpendicularAxesSim from '../../../simulations/c6_12/C11_PhysicsParallelPerpendicularAxesSim';

/** v3 wrapped master — C11_PhysicsParallelPerpendicularAxesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsparallelperpendicularaxessim: SimDef = {
    id: 'v3w_c11_physicsparallelperpendicularaxessim',
    title: 'Parallel Perpendicular Axes',
    subtitle: 'This node covers the statement, proof, and application of the Parallel Axis Theorem for.',
    classLevel: 11, subject: 'physics', topic: 'Theorems of Moment of Inertia: Parallel Axis',
    chapters: [],
    nodeIds: ['c11_phy_cbse_06_009', 'c11_phy_cbse_06_010', 'c11_phy_cbse_06_011', 'c11_phy_cbse_03_003', 'c11_phy_cbse_03_004', 'c11_phy_cbse_03_005', 'c11_phy_cbse_06_003', 'c11_phy_cbse_06_007', 'c11_phy_cbse_06_008', 'c11_phy_cbse_03_008', 'c11_phy_cbse_05_015', 'c11_phy_cbse_04_007', 'c11_phy_cbse_08_007', 'c11_phy_cbse_14_001', 'c11_phy_cbse_06_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a ceiling fan in an Indian household: the blades rotate about the central axis through the motor.', goal: 'Master Parallel Perpendicular Axes.' },
    discovery: {
        question: 'State the x- and y-components of a force vector **F** = 20 N acting at an angle of 30° with the positive x-axis. Write the vector in unit vector notation.',
        options: ['Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N', 'part of the vector', 'disappears'],
        answer: 'Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N',
        hook: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a.',
    },
    teaching: [
        { title: 'The Parallel Axis Theorem states that the.', text: 'The Parallel Axis Theorem states that the moment of inertia \\(I\\) of a rigid body about any axis is equal to the moment of inertia \\(I_{\\text{cm}}\\) about a parallel axis passing through its centre.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_009', title: 'The Parallel Axis Theorem states that.',
          scaffold: { problem: 'A uniform circular disc of mass \\(5.0\\,\\text{kg}\\) and radius \\(0.40\\,\\text{m}\\) is rotating about an axis tangent to its rim and.',
            steps: [
            { text: 'Identify given quantities: \\(M = 5.0\\,\\text{kg}\\), \\(R = 0.40\\,\\text{m}\\), \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\).' },
            { text: 'Write the Parallel Axis Theorem formula: \\(I = I_{\\text{cm}} + M d^2\\).' },
            { text: 'Compute \\(I_{\\text{cm}} = \\frac{1}{2} \\times 5.0 \\times (0.40)^2 = 2.5 \\times 0.16 = 0.40\\,\\text{kg}\\,\\text{m}^2\\).' },
            { text: 'Compute \\(M d^2 = 5.0 \\times (0.40)^2 = 5.0 \\times 0.16 = 0.80\\,\\text{kg}\\,\\text{m}^2\\).' },
            { text: 'Add: \\(I = 0.40 + 0.80 = 1.20\\,\\text{kg}\\,\\text{m}^2\\). Verify: The moment of inertia about a tangent should be larger.', faded: true, blankAnswer: '\\(1.20\\,\\text{kg}\\,\\text{m}^2\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_010', title: 'The Perpendicular Axis Theorem states.',
          scaffold: { problem: 'A thin uniform square metal plate of side 40 cm and mass 3.0 kg rotates about an axis perpendicular to its plane passing through its.',
            steps: [
            { text: 'Identify given: square plate, side L = 0.40 m, mass M = 3.0 kg. Planar lamina → Perpendicular Axis Theorem applies.' },
            { text: 'For centre perpendicular axis, use theorem with in-plane axes through centre along sides.' },
            { text: 'Apply Perpendicular Axis Theorem at centre: \\( I_z = I_x + I_y = 0.04 + 0.04 = 0.08 \\) kg·m².' },
            { text: 'For corner axis, use Parallel Axis Theorem: distance from centre to corner \\( d = \\frac{L}{\\sqrt{2}} =.' },
            { text: 'Verify using Perpendicular Axis Theorem at corner: shift in-plane axes to corner.', faded: true, blankAnswer: 'Moment of inertia about centre perpendicular axis = 0.08.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_011', title: 'The moment of inertia of a rigid body.',
          scaffold: { problem: 'A flour mill (chakki) uses a solid stone disc of mass 50 kg and radius 0.5 m as a flywheel.',
            steps: [
            { text: 'Identify the body and axis. Solid disc, axis perpendicular to plane through centre → use I = ½ M R².' },
            { text: 'Substitute given values with units: M = 50 kg, R = 0.5 m.' },
            { text: 'Compute I_disc = ½ × 50 × (0.5)² = 25 × 0.25 = 6.25 kg m².' },
            { text: 'Radius of gyration k = √(I/M) = √(6.25/50) = √0.125 = 0.3536 m ≈ 0.354 m.' },
            { text: 'For thin ring about same axis, I_ring = M R² = 50 × 0.25 = 12.5 kg m².' },
            { text: 'Factor = I_ring / I_disc = 12.5 / 6.25 = 2. The ring has twice the moment of inertia.' },
            { text: 'Check reasonableness: Ring concentrates mass at larger distance, so larger I; factor 2 matches formula ratio (M R²) /.', faded: true, blankAnswer: '(a) 6.25 kg m², (b) 0.354 m, (c) Factor = 2 (ring has twice.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_003', title: 'The analytical method of vector.',
          scaffold: { problem: 'A drone flies from a warehouse with a velocity of 25 m/s at 53° above the horizontal towards the northeast.',
            steps: [
            { text: 'Identify given quantities and define coordinate system. Let +x = east, +y = north.' },
            { text: 'Resolve drone velocity into components. v_dx = 25 cos 53° = 25 × 0.6 = 15 m/s. v_dy = 25 sin 53° = 25 × 0.8 = 20 m/s.' },
            { text: 'Write vectors in component form. v_d = 15î + 20ĵ m/s. v_w = 10î + 0ĵ m/s.' },
            { text: 'Add components to get resultant. v_g = v_d + v_w = (15 + 10)î + (20 + 0)ĵ = 25î + 20ĵ m/s.' },
            { text: 'Compute magnitude. |v_g| = √(25² + 20²) = √(625 + 400) = √1025 ≈ 32.0 m/s.' },
            { text: 'Compute direction. tan θ = vy/vx = 20/25 = 0.8. θ = tan⁻¹(0.8) ≈ 38.7°.' },
            { text: 'Verify physical reasonableness. Wind adds to eastward component, so resultant should be more eastward than drone\'s.', faded: true, blankAnswer: 'v_g = (25î + 20ĵ) m/s; |v_g| ≈ 32.0 m/s; direction ≈ 38.7°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_004', title: 'Resolution of vectors is the process of.',
          scaffold: { problem: 'A drone flies with a velocity of 25 m/s at an angle of 53° above the horizontal towards the north-east.',
            steps: [
            { text: 'Identify given: magnitude v = 25 m/s, angle θ = 53° with +x axis (east). Find: vₓ (east), vᵧ (north).' },
            { text: 'Use resolution formulas: vₓ = v cosθ, vᵧ = v sinθ. Units: m/s.' },
            { text: 'Substitute: vₓ = 25 × 0.6 = 15 m/s; vᵧ = 25 × 0.8 = 20 m/s.' },
            { text: 'Verify magnitude: √(15² + 20²) = √(225+400) = √625 = 25 m/s. Consistent.' },
            { text: 'State answer with unit vectors: **v** = (15 **î** + 20 **ĵ**) m/s.', faded: true, blankAnswer: '**v** = (15 **î** + 20 **ĵ**) m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_005', title: 'Vector addition using components is the.',
          scaffold: { problem: 'A person walks 3.0 km at 30° north of east, then 4.0 km at 60° north of west, then 2.0 km due south.',
            steps: [
            { text: 'Identify given quantities and choose coordinate system. +x = east, +y = north.' },
            { text: 'Resolve each vector into components. **D₁**: D₁ₓ = 3.0 cos 30° = 3.0 × (√3/2) = 2.598 km, D₁ᵧ = 3.0 sin 30° = 3.0 × 0.5.' },
            { text: 'Add corresponding components. Rₓ = 2.598 + (−2.000) + 0 = 0.598 km. Rᵧ = 1.500 + 3.464 + (−2.000) = 2.964 km.' },
            { text: 'Compute magnitude and direction. R = √(0.598² + 2.964²) = √(0.358 + 8.785) = √9.143 = 3.024 km.' },
            { text: 'Express in unit-vector notation and verify. **R** = 0.598î + 2.964ĵ km.', faded: true, blankAnswer: '**R** = 3.02 km at 78.6° north of east (or 0.598î + 2.96ĵ.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_06_010', title: 'Identify each idea',
          dissect: { specimen: 'Parallel Perpendicular Axes', spots: [
            { id: 's1', label: 'The Parallel Axis Theorem states', prompt: 'Which idea is this? — The Parallel Axis Theorem states that the moment of inertia \\(I\\) of a rigid body about.', answer: 'The Parallel Axis Theorem states', options: ['The Parallel Axis Theorem states', 'The Perpendicular Axis Theorem states', 'The moment of inertia of', 'The analytical method of vector'] },
            { id: 's2', label: 'The Perpendicular Axis Theorem states', prompt: 'Which idea is this? — The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the.', answer: 'The Perpendicular Axis Theorem states', options: ['The Perpendicular Axis Theorem states', 'The Parallel Axis Theorem states', 'The moment of inertia of', 'The analytical method of vector'] },
            { id: 's3', label: 'The moment of inertia of', prompt: 'Which idea is this? — The moment of inertia of a rigid body about a given axis is the sum of the products of.', answer: 'The moment of inertia of', options: ['The moment of inertia of', 'The Parallel Axis Theorem states', 'The Perpendicular Axis Theorem states', 'The analytical method of vector'] },
            { id: 's4', label: 'The analytical method of vector', prompt: 'Which idea is this? — The analytical method of vector addition resolves each vector into its rectangular.', answer: 'The analytical method of vector', options: ['The analytical method of vector', 'The Parallel Axis Theorem states', 'The Perpendicular Axis Theorem states', 'The moment of inertia of'] },
            { id: 's5', label: 'Resolution of vectors is the', prompt: 'Which idea is this? — Resolution of vectors is the process of splitting a single vector into two or more.', answer: 'Resolution of vectors is the', options: ['Resolution of vectors is the', 'The Parallel Axis Theorem states', 'The Perpendicular Axis Theorem states', 'The moment of inertia of'] },
            { id: 's6', label: 'Vector addition using components is', prompt: 'Which idea is this? — Vector addition using components is the analytical method of finding the resultant of two.', answer: 'Vector addition using components is', options: ['Vector addition using components is', 'The Parallel Axis Theorem states', 'The Perpendicular Axis Theorem states', 'The moment of inertia of'] }
          ] } }
    ],
    explore: { component: C11_PhysicsParallelPerpendicularAxesSim, prompt: 'Explore the interactive — Parallel Perpendicular Axes' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_009', difficulty: 'standard',
          question: 'The Parallel Axis Theorem states that the moment of inertia \\(I\\) of a rigid.',
          hint: 'If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the.',
          misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis.',
          parts: [
                { id: 'a', prompt: 'Why must one of the two parallel axes pass through the centre of mass for the Parallel Axis Theorem to hold?', answer: 'In the derivation, we write the distance from the new axis as \\(r_i =',
                  options: ['In the derivation, we write the distance from the new axis as \\(r_i =', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' },
                { id: 'b', prompt: 'A uniform thin rod of mass \\(2.0\\,\\text{kg}\\) and length \\(1.0\\,\\text{m}\\) has a moment of inertia \\(I_{\\text{cm}} = \\frac{1}{12}ML^2\\) about an axis through.', answer: '**Step 1:** Identify given: \\(M = 2.0\\,\\text{kg}\\), \\(L = 1.0\\,\\text{m}\\),',
                  options: ['**Step 1:** Identify given: \\(M = 2.0\\,\\text{kg}\\), \\(L = 1.0\\,\\text{m}\\),', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' },
                { id: 'c', prompt: 'A solid disc of mass \\(M\\) and radius \\(R\\) has \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\) about its central perpendicular axis.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' }
          ],
            remediations: { 'the-parallel-axis-theorem-can': { steps: ['Re-derive the theorem on paper: write \\(I = \\sum m_i (\\vec{r}_{i,\\text{cm}} + \\vec{d})^2\\), expand, and explicitly show.', 'Draw a diagram of a rod with three parallel axes: through CM, through one end, and through a point at 1/3 length.', 'Label perpendicular distances \\(d_1\\) and \\(d_2\\).', 'Practice calculating \\(I\\) at the 1/3 point by first finding \\(I_{\\text{cm}}\\) from the end-axis value.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_010', difficulty: 'standard',
          question: 'The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat.',
          hint: 'If stuck, revisit c11_phy_cbse_06_008 (Moment of Inertia Definition) and practice.',
          misconception: 'Students believe the Perpendicular Axis Theorem applies to ANY body with perpendicular axes, such as a solid cube or a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the',
                  options: ['The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the', 'The Parallel Axis Theorem states that the moment of inertia \\(I\\) of a rigid body about', 'The moment of inertia of a rigid body about a given axis is the sum of the products of', 'The analytical method of vector addition resolves each vector into its rectangular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Perpendicular Axis Theorem applies to ANY body with perpendicular axes, such as a solid cube or a cylinder.' }
          ],
            remediations: { 'the-perpendicular-axis-theorem-applies': { steps: ['If the student applies the theorem to a 3D body: (1) Ask them to write the integral definitions: \\( I_x = \\int.', '(2) Have them compute \\( I_x + I_y - I_z = 2\\int z^2 dm \\).', '(3) Ask: "For a planar lamina in xy-plane, what is z for every mass element?" Answer: z = 0.', 'So the extra term vanishes.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_011', difficulty: 'standard',
          question: 'The moment of inertia of a rigid body about a given axis is the sum of the.',
          hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the.',
          misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.',
          parts: [
                { id: 'a', prompt: 'State the moment of inertia of a thin circular ring of mass M and radius R about an axis perpendicular to its plane passing through its centre.', answer: 'I = M R² (kg m²)',
                  options: ['I = M R² (kg m²)', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' },
                { id: 'b', prompt: 'A uniform rod of mass 2.0 kg and length 1.2 m rotates about an axis perpendicular to the rod through one end.', answer: 'Step 1: I_cm = (1/12) × 2.0 × (1.2)² = 0.24 kg m²',
                  options: ['Step 1: I_cm = (1/12) × 2.0 × (1.2)² = 0.24 kg m²', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' },
                { id: 'c', prompt: 'A solid cylinder and a hollow cylinder, both of mass 5 kg and radius 0.1 m, are released from rest on an inclined plane of angle 30°.', answer: 'The solid cylinder reaches first',
                  options: ['The solid cylinder reaches first', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' }
          ],
            remediations: { 'the-moment-of-inertia-of': { steps: ['Revisit node 06_008 (Moment of Inertia: Definition) to reinforce that I = Σ m r², so changing the axis changes r for.', 'Practice axis identification: for each standard body, draw the body, label the axis, and write the correct formula from.', 'Use a physical model (a ruler as a rod) to feel the difference in resistance when rotating about the centre vs.', 'For parallel axis theorem errors, always draw the two parallel axes, mark the centre of mass, measure the perpendicular.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.',
          parts: [
                { id: 'a', prompt: 'A student writes the moment of inertia of a thin rectangular plate (sides a and b, mass M) about an axis through its centre and perpendicular to its plane as I.', answer: 'The formula is incorrect',
                  options: ['The formula is incorrect', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' }
          ],
            remediations: { 'the-moment-of-inertia-of': { steps: ['Revisit node 06_008 (Moment of Inertia: Definition) to reinforce that I = Σ m r², so changing the axis changes r for.', 'Practice axis identification: for each standard body, draw the body, label the axis, and write the correct formula from.', 'Use a physical model (a ruler as a rod) to feel the difference in resistance when rotating about the centre vs.', 'For parallel axis theorem errors, always draw the two parallel axes, mark the centre of mass, measure the perpendicular.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_003', difficulty: 'standard',
          question: 'The analytical method of vector addition resolves each vector into its.',
          hint: 'If stuck, revisit c10_math_cbse_08_001 (trigonometric ratios) for computing sin/cos of.',
          misconception: 'Students believe that the angle θ in the formulas Ax = A cos θ, Ay = A sin θ is always measured from the positive.',
          parts: [
                { id: 'a', prompt: 'Why does the component method work for adding vectors that are not perpendicular to each other?', answer: 'The component method works',
                  options: ['The component method works', 'it works because of the parallelogram law'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle θ in the formulas Ax = A cos θ, Ay = A sin θ is always measured from the positive x-axis.' }
          ],
            remediations: { 'the-angle-in-the-formulas': { steps: ['Draw the vector on a coordinate system with its tail at the origin.', 'Identify the angle the vector makes with the +x-axis, measured counterclockwise (0° to 360°).', 'Use Ax = A cos θ, Ay = A sin θ with this θ.', 'Verify signs: if the vector points left, Ax must be negative; if it points down, Ay must be negative.', 'Practice with vectors in all four quadrants using angles like "30° above -x axis" (θ = 150°), "45° below -x axis" (θ =.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_004', difficulty: 'standard',
          question: 'Resolution of vectors is the process of splitting a single vector into two or.',
          hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles.',
          misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a.',
          parts: [
                { id: 'a', prompt: 'State the x- and y-components of a force vector **F** = 20 N acting at an angle of 30° with the positive x-axis. Write the vector in unit vector notation.', answer: 'Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N',
                  options: ['Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N', 'part of the vector', 'disappears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force,.' },
                { id: 'b', prompt: 'A velocity vector has components vₓ = -12 m/s and vᵧ = 5 m/s. In which quadrant does the vector lie?', answer: 'The vector lies in the second quadrant (vₓ negative, vᵧ positive)',
                  options: ['The vector lies in the second quadrant (vₓ negative, vᵧ positive)', 'part of the vector', 'disappears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force,.' },
                { id: 'c', prompt: 'A displacement vector **r** = (4î - 3ĵ) m. Find its magnitude and the angle it makes with the positive x-axis.', answer: 'Magnitude = √(4² + (-3)²) = √(16+9) = 5 m',
                  options: ['Magnitude = √(4² + (-3)²) = √(16+9) = 5 m', 'part of the vector', 'disappears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force,.' }
          ],
            remediations: { 'the-component-of-a-vector': { steps: ['Draw a vector **A** on graph paper.', 'Construct its x- and y-components by drawing perpendiculars to axes.', 'Measure the component lengths and verify Aₓ² + Aᵧ² = A² using a ruler.', 'Place a force sensor at the tip of **A** and then replace **A** with two perpendicular springs representing components;.', 'Emphasize: "Resolution is a mathematical tool; the vector is the single physical entity.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a.',
          parts: [
                { id: 'a', prompt: 'A student resolves a force **F** = 10 N at 60° to the horizontal into components Fₓ = 10 cos60° = 5 N and Fᵧ = 10 sin60° = 8.66 N.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force,.' },
                { id: 'b', prompt: 'Design a simple experiment using a force table (or a board with pulleys and weights) to demonstrate that a single force can be replaced by two perpendicular.', answer: 'Setup: Fix a central ring on a force table',
                  options: ['Setup: Fix a central ring on a force table', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force,.' }
          ],
            remediations: { 'the-component-of-a-vector': { steps: ['Draw a vector **A** on graph paper.', 'Construct its x- and y-components by drawing perpendiculars to axes.', 'Measure the component lengths and verify Aₓ² + Aᵧ² = A² using a ruler.', 'Place a force sensor at the tip of **A** and then replace **A** with two perpendicular springs representing components;.', 'Emphasize: "Resolution is a mathematical tool; the vector is the single physical entity.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_005', difficulty: 'standard',
          question: 'Vector addition using components is the analytical method of finding the.',
          hint: 'If stuck, revisit "Resolution of Vectors" (c11_phy_cbse_03_004) and practice finding.',
          misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g.,.',
          parts: [
                { id: 'a', prompt: 'A force vector **F** = 10 N acts at an angle of 120° measured counterclockwise from the +x-axis. What are its x and y components?', answer: '*Fₓ* = 10 cos 120° = 10 × (−½) = −5.0 N',
                  options: ['*Fₓ* = 10 cos 120° = 10 × (−½) = −5.0 N', '**R** is at 45° or 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' },
                { id: 'b', prompt: 'A displacement vector **D₁** = 5.0 m at 37° above +x-axis, and **D₂** = 8.0 m at 53° below +x-axis.', answer: '**Step 1:** Resolve **D₁**: *D₁ₓ* = 5.0 × 0.8 = 4.0 m, *D₁ᵧ* = 5.0 × 0.6 = 3.0 m',
                  options: ['**Step 1:** Resolve **D₁**: *D₁ₓ* = 5.0 × 0.8 = 4.0 m, *D₁ᵧ* = 5.0 × 0.6 = 3.0 m', '**R** is at 45° or 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' },
                { id: 'c', prompt: 'Three forces act on a point object: **F₁** = 10 N at 0°, **F₂** = 10 N at 120°, **F₃** = 10 N at 240°.', answer: 'The resultant force is **zero** (null vector)',
                  options: ['The resultant force is **zero** (null vector)', '**R** is at 45° or 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' }
          ],
            remediations: { 'the-angle-of-the-resultant': { steps: ['**Visualise components:** Draw each vector on an x-y grid, drop perpendiculars to axes, and label *Aₓ*, *Aᵧ* with signs.', '**Make a component table:** Create a table with columns: Vector | Magnitude | Angle | *x-comp* (mag × cos θ) | *y-comp*.', '**Sum columns separately:** Add all *x-comp* values → *Rₓ*; add all *y-comp* values → *Rᵧ*.', '**Check quadrant:** Use signs of *Rₓ* and *Rᵧ* to determine the resultant\'s quadrant (I: ++, II: −+, III: −−, IV: +−).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g.,.',
          parts: [
                { id: 'a', prompt: 'A student solves for the resultant of **A** = 6î − 8ĵ and **B** = −6î + 8ĵ and writes: *Rₓ* = 0, *Rᵧ* = 0, so *R* = 0, *θ* = 0°.', answer: 'No, the angle is **undefined** for a null vector',
                  options: ['No, the angle is **undefined** for a null vector', '**R** is at 45° or 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' },
                { id: 'b', prompt: 'Design a real-world scenario (Indian context) where three vectors must be added using components to solve a practical problem.', answer: '**Scenario:** A drone delivers a package in Delhi',
                  options: ['**Scenario:** A drone delivers a package in Delhi', '**R** is at 45° or 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' }
          ],
            remediations: { 'the-angle-of-the-resultant': { steps: ['**Visualise components:** Draw each vector on an x-y grid, drop perpendiculars to axes, and label *Aₓ*, *Aᵧ* with signs.', '**Make a component table:** Create a table with columns: Vector | Magnitude | Angle | *x-comp* (mag × cos θ) | *y-comp*.', '**Sum columns separately:** Add all *x-comp* values → *Rₓ*; add all *y-comp* values → *Rᵧ*.', '**Check quadrant:** Use signs of *Rₓ* and *Rᵧ* to determine the resultant\'s quadrant (I: ++, II: −+, III: −−, IV: +−).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
