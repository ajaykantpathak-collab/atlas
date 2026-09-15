import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch06_p2: SimDef = {
    id: 'v3_c11_phy_ch06_p2',
    title: 'System of Particles and Rotational Motion · Part 2/3',
    subtitle: 'Watch a hundred fragments obey one invisible point.',
    classLevel: 11, subject: 'physics', topic: 'System of Particles and Rotational Motion · Part 2/3',
    chapters: ['c11_phy_ch06'],
    nodeIds: ['c11_phy_cbse_06_007', 'c11_phy_cbse_06_008', 'c11_phy_cbse_06_009', 'c11_phy_cbse_06_010', 'c11_phy_cbse_06_011', 'c11_phy_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tracker following a point with no mass in it', intro: 'Each blade particle of a fan circles differently, yet the fan \'as a whole\' moves simply — that average point does all the bookkeeping.', goal: 'Compute centre of mass and explain why internal forces can\'t deflect its motion.' },
    discovery: {
        question: 'A Diwali rocket explodes mid-flight into a hundred fragments — where does the centre of mass go?',
        options: ['It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM', 'It falls straight down once the pieces scatter', 'It speeds up from the explosion\'s energy', 'It stops — the system no longer exists'],
        answer: 'It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM',
        hook: 'A uniform ring\'s centre of mass sits at its geometric centre — a point containing zero mass; the CM needn\'t live inside the material at all.',
    },
    teaching: [
        { title: 'Principle of Moments', text: 'The Principle of Moments states that for a rigid body in rotational equilibrium under the action of coplanar forces, the algebraic sum of the moments (torques) of all forces about any point in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_06_007', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Find the CM of an L-shaped lamina of three unit squares, then argue why the exploding bomb\'s fragments can\'t move their shared centre.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_007', title: 'Principle of Moments',
          scaffold: { problem: 'A uniform steel rod of length 2.0 m and mass 5.0 kg is supported horizontally on two knife-edges placed at 0.3 m and 1.7 m from the left.',
            steps: [
            { text: 'Identify all forces with units. Weight of rod W_rod = 5.0 × 9.8 = 49 N acting at centre (1.0 m from left end).' },
            { text: 'Apply translational equilibrium (ΣF_y = 0). Upward forces = R₁ + R₂. Downward forces = 49 + 29.4 = 78.4 N.' },
            { text: 'Apply rotational equilibrium (Στ = 0) about left support (0.3 m) to eliminate R₁.' },
            { text: 'Compute moments. Clockwise moments = (49 × 0.7) + (29.4 × 0.2) = 34.3 + 5.88 = 40.18 N·m.' },
            { text: 'Solve for R₂. R₂ = 40.18 / 1.4 = 28.7 N (approx).' },
            { text: 'Substitute in Equation 1. R₁ = 78.4 - 28.7 = 49.7 N.' },
            { text: 'Verify by taking moments about right support (1.7 m). Distances: R₁ at 1.4 m (clockwise), rod at 0.7 m (anticlockwise).', faded: true, blankAnswer: 'R₁ = 49.7 N (at left knife-edge), R₂ = 28.7 N (at right.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_008', title: 'Moment of Inertia: Definition',
          scaffold: { problem: 'Four particles of masses 1 kg, 2 kg, 3 kg, and 4 kg are placed at the corners of a square of side 0.5 m.',
            steps: [
            { text: 'Identify given quantities: m₁ = 1 kg at axis (r₁ = 0), m₂ = 2 kg at adjacent corner (r₂ = 0.5 m), m₃ = 3 kg at opposite.' },
            { text: 'Formula: I = Σ m_i r_i². Check units: kg × m² = kg·m² ✓.' },
            { text: 'Substitute values: I = (1 × 0²) + (2 × 0.5²) + (3 × (0.5√2)²) + (4 × 0.5²) = 0 + 2 × 0.25 + 3 × (0.25 × 2) + 4 × 0.25.' },
            { text: 'Compute: 0 + 0.5 + 3 × 0.5 + 1.0 = 0.5 + 1.5 + 1.0 = 3.0 kg·m².' },
            { text: 'Verify: All terms positive, I > 0. Largest contribution from m₃ (3 kg) at largest distance (diagonal). Reasonable.', faded: true, blankAnswer: '3.0 kg·m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_009', title: 'Theorems of Moment of Inertia: Parallel Axis',
          scaffold: { problem: 'A uniform circular disc of mass \\(5.0\\,\\text{kg}\\) and radius \\(0.40\\,\\text{m}\\) is rotating about an axis tangent to its rim and.',
            steps: [
            { text: 'Identify given quantities: \\(M = 5.0\\,\\text{kg}\\), \\(R = 0.40\\,\\text{m}\\), \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\).' },
            { text: 'Write the Parallel Axis Theorem formula: \\(I = I_{\\text{cm}} + M d^2\\).' },
            { text: 'Compute \\(I_{\\text{cm}} = \\frac{1}{2} \\times 5.0 \\times (0.40)^2 = 2.5 \\times 0.16 = 0.40\\,\\text{kg}\\,\\text{m}^2\\).' },
            { text: 'Compute \\(M d^2 = 5.0 \\times (0.40)^2 = 5.0 \\times 0.16 = 0.80\\,\\text{kg}\\,\\text{m}^2\\).' },
            { text: 'Add: \\(I = 0.40 + 0.80 = 1.20\\,\\text{kg}\\,\\text{m}^2\\). Verify: The moment of inertia about a tangent should be larger.', faded: true, blankAnswer: '\\(1.20\\,\\text{kg}\\,\\text{m}^2\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_010', title: 'Theorems of Moment of Inertia: Perpendicular Axis',
          scaffold: { problem: 'A thin uniform square metal plate of side 40 cm and mass 3.0 kg rotates about an axis perpendicular to its plane passing through its.',
            steps: [
            { text: 'Identify given: square plate, side L = 0.40 m, mass M = 3.0 kg. Planar lamina → Perpendicular Axis Theorem applies.' },
            { text: 'For centre perpendicular axis, use theorem with in-plane axes through centre along sides.' },
            { text: 'Apply Perpendicular Axis Theorem at centre: \\( I_z = I_x + I_y = 0.04 + 0.04 = 0.08 \\) kg·m².' },
            { text: 'For corner axis, use Parallel Axis Theorem: distance from centre to corner \\( d = \\frac{L}{\\sqrt{2}}.' },
            { text: 'Verify using Perpendicular Axis Theorem at corner: shift in-plane axes to corner.', faded: true, blankAnswer: 'Moment of inertia about centre perpendicular axis = 0.08.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_011', title: 'Moment of Inertia of Common Bodies',
          scaffold: { problem: 'A flour mill (chakki) uses a solid stone disc of mass 50 kg and radius 0.5 m as a flywheel.',
            steps: [
            { text: 'Identify the body and axis. Solid disc, axis perpendicular to plane through centre → use I = ½ M R².' },
            { text: 'Substitute given values with units: M = 50 kg, R = 0.5 m.' },
            { text: 'Compute I_disc = ½ × 50 × (0.5)² = 25 × 0.25 = 6.25 kg m².' },
            { text: 'Radius of gyration k = √(I/M) = √(6.25/50) = √0.125 = 0.3536 m ≈ 0.354 m.' },
            { text: 'For thin ring about same axis, I_ring = M R² = 50 × 0.25 = 12.5 kg m².' },
            { text: 'Factor = I_ring / I_disc = 12.5 / 6.25 = 2. The ring has twice the moment of inertia.' },
            { text: 'Check reasonableness: Ring concentrates mass at larger distance, so larger I; factor 2 matches formula ratio (M R²).', faded: true, blankAnswer: '(a) 6.25 kg m², (b) 0.354 m, (c) Factor = 2 (ring has twice.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_012', title: 'Kinematics of Rotational Motion',
          scaffold: { problem: 'A ceiling fan starts from rest and reaches a speed of 300 rpm in 20 seconds.',
            steps: [
            { text: 'Identify given quantities with units. ω₀ = 0 rad/s (starts from rest), ω = 300 rpm = 300 × 2π/60 = 10π rad/s, t = 20.' },
            { text: 'Select the appropriate kinematic equation. For (a) use ω = ω₀ + αt. For (b) use θ = ω₀t + ½αt².' },
            { text: 'Substitute values with units. (a) α = (ω - ω₀)/t = (10π - 0)/20 = 0.5π rad/s² ≈ 1.57 rad/s².' },
            { text: 'Track unit cancellation. rpm × (2π rad/rev) × (1 min/60 s) = rad/s. rad/s² × s = rad/s. rad/s × m = m/s.' },
            { text: 'Verify physical reasonableness. 300 rpm is a typical fan speed; 1.57 rad/s² is a gentle acceleration; 9.4 m/s tip speed.', faded: true, blankAnswer: '(a) 1.57 rad/s², (b) 50 revolutions, (c) 9.42 m/s' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Modelling a Diwali rocket\'s explosion in a simulation, a teammate makes the fragments\' centre of mass veer off \'because the pieces now fly in different directions\', and refuses to place a ring\'s centre of mass at its centre \'since there\'s no mass there.\'',
            decisions: [{ prompt: 'What does centre-of-mass physics actually say?', options: [
                { text: 'Apply both rules: the CM is a mass-weighted average position — a ring\'s CM sits at its geometric centre in empty space; it needn\'t lie in material. And internal forces cancel in action-reaction pairs, so MA_cm = F_ext: the exploded rocket\'s CM keeps tracing the original parabola under gravity alone, however the fragments scatter.', outcome: 'The simulation corrects: explosions rearrange mass but can\'t redirect the CM — only external forces can, and emptiness doesn\'t disqualify a CM.' },
                { text: 'Let the CM veer — after the blast the mass distribution changed, so its path must too.', outcome: 'Internal forces sum to zero by Newton\'s third law: the CM responds only to external forces — gravity — and stays on the parabola.', reveals: 'explosion-moves-cm' },
                { text: 'Force the ring\'s CM inside the material — a centre of mass must sit on mass.', outcome: 'CM is a weighted average of positions, not a piece of matter: rings, boomerangs and hollow spheres all have CMs in empty space.', reveals: 'cm-must-be-inside-body' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'Fragments fly every direction; the mass-weighted average keeps falling like nothing happened — internal chaos can\'t bend an external path.',
            decisions: [{ prompt: 'What comes next? System of Particles and Rotational Motion · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — System of Particles and Rotational Motion · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_007', difficulty: 'standard',
          question: 'The Principle of Moments states that for a rigid body in rotational equilibrium.',
          hint: 'Review the Torque node (c11_phy_cbse_06_004) for τ = r × F calculation and the.',
          misconception: 'Students believe the Principle of Moments only applies when forces are perpendicular to the lever arm.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Principle of Moments states that for a rigid body in rotational equilibrium under the',
                  options: ['The Principle of Moments states that for a rigid body in rotational equilibrium under the', 'The centre of mass of a system of particles is the unique point where the entire mass of', 'The motion of the centre of mass of a system of particles is governed by the equation \\(', 'The vector product (cross product) of two vectors **a** and **b** is a vector **c** ='],
                  hint: 'Review the Torque node (c11_phy_cbse_06_004) for τ = r × F calculation and the Equilibrium node.',
                  misconception: 'Students believe the Principle of Moments only applies when forces are perpendicular to the lever arm.' }
          ],
            remediations: { 'the-principle-of-moments-only': { steps: ['If the student makes this error: (1) Draw the lever and force vector on paper.', '(2) Drop a perpendicular from the fulcrum to the line of action of the force — measure this perpendicular distance.', '(3) Resolve the force into components perpendicular and parallel to the lever; only the perpendicular component (F.', '(4) Practice with a door: push at the handle at different angles (perpendicular, 45°, parallel to door) and feel the.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_008', difficulty: 'standard',
          question: 'Moment of inertia (I) of a rigid body about a given axis of rotation is defined.',
          hint: 'If stuck on perpendicular distance, review coordinate geometry (c9_math_ch1_1.',
          misconception: 'Students often confuse moment of inertia with mass or with moment of force (torque).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Moment of inertia (I) of a rigid body about a given axis of rotation is defined as the',
                  options: ['Moment of inertia (I) of a rigid body about a given axis of rotation is defined as the', 'The centre of mass of a system of particles is the unique point where the entire mass of', 'The motion of the centre of mass of a system of particles is governed by the equation \\(', 'The vector product (cross product) of two vectors **a** and **b** is a vector **c** ='],
                  hint: 'If stuck on perpendicular distance, review coordinate geometry (c9_math_ch1_1, c9_math_ch1_4).',
                  misconception: 'Students often confuse moment of inertia with mass or with moment of force (torque).' }
          ],
            remediations: { 'students-often-confuse-moment-of': { steps: ['Revisit the definition: I = Σ m_i r_i².', 'Emphasize "perpendicular distance from axis" – draw the axis and drop perpendiculars from each mass.', 'Do a quick comparison: Take two identical masses on a light rod.', 'Slide them from centre to ends.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_009', difficulty: 'standard',
          question: 'The Parallel Axis Theorem states that the moment of inertia \\(I\\) of a rigid.',
          hint: 'If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the.',
          misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis.',
          parts: [
                { id: 'a', prompt: 'Why must one of the two parallel axes pass through the centre of mass for the Parallel Axis Theorem to hold?', answer: 'In the derivation, we write the distance from the new axis as \\(r_i =',
                  options: ['In the derivation, we write the distance from the new axis as \\(r_i =', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the summation.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' },
                { id: 'b', prompt: 'A uniform thin rod of mass \\(2.0\\,\\text{kg}\\) and length \\(1.0\\,\\text{m}\\) has a moment of inertia \\(I_{\\text{cm}} = \\frac{1}{12}ML^2\\) about an axis through.', answer: '**Step 1:** Identify given: \\(M = 2.0\\,\\text{kg}\\), \\(L = 1.0\\,\\text{m}\\),',
                  options: ['**Step 1:** Identify given: \\(M = 2.0\\,\\text{kg}\\), \\(L = 1.0\\,\\text{m}\\),', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the summation.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' },
                { id: 'c', prompt: 'A solid disc of mass \\(M\\) and radius \\(R\\) has \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\) about its central perpendicular axis.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'the Parallel Axis Theorem can be applied between **any two parallel axes** (e'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the summation.',
                  misconception: 'Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis.' }
          ],
            remediations: { 'the-parallel-axis-theorem-can': { steps: ['Re-derive the theorem on paper: write \\(I = \\sum m_i (\\vec{r}_{i,\\text{cm}} + \\vec{d})^2\\), expand, and explicitly show.', 'Draw a diagram of a rod with three parallel axes: through CM, through one end, and through a point at 1/3 length.', 'Label perpendicular distances \\(d_1\\) and \\(d_2\\).', 'Practice calculating \\(I\\) at the 1/3 point by first finding \\(I_{\\text{cm}}\\) from the end-axis value.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_010', difficulty: 'standard',
          question: 'The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat.',
          hint: 'If stuck, revisit c11_phy_cbse_06_008 (Moment of Inertia Definition) and practice.',
          misconception: 'Students believe the Perpendicular Axis Theorem applies to ANY body with perpendicular axes, such as a solid cube or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the',
                  options: ['The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the', 'The centre of mass of a system of particles is the unique point where the entire mass of', 'The motion of the centre of mass of a system of particles is governed by the equation \\(', 'The vector product (cross product) of two vectors **a** and **b** is a vector **c** ='],
                  hint: 'If stuck, revisit c11_phy_cbse_06_008 (Moment of Inertia Definition) and practice calculating \\(.',
                  misconception: 'Students believe the Perpendicular Axis Theorem applies to ANY body with perpendicular axes, such as a solid cube or a cylinder.' }
          ],
            remediations: { 'the-perpendicular-axis-theorem-applies': { steps: ['If the student applies the theorem to a 3D body: (1) Ask them to write the integral definitions: \\( I_x = \\int.', '(2) Have them compute \\( I_x + I_y - I_z = 2\\int z^2 dm \\).', '(3) Ask: "For a planar lamina in xy-plane, what is z for every mass element?" Answer: z = 0.', 'So the extra term vanishes.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_011', difficulty: 'standard',
          question: 'The moment of inertia of a rigid body about a given axis is the sum of the.',
          hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the.',
          misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.',
          parts: [
                { id: 'a', prompt: 'State the moment of inertia of a thin circular ring of mass M and radius R about an axis perpendicular to its plane passing through its centre.', answer: 'I = M R² (kg m²)',
                  options: ['I = M R² (kg m²)', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the theorems.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' },
                { id: 'b', prompt: 'A uniform rod of mass 2.0 kg and length 1.2 m rotates about an axis perpendicular to the rod through one end.', answer: 'Step 1: I_cm = (1/12) × 2.0 × (1.2)² = 0.24 kg m²',
                  options: ['Step 1: I_cm = (1/12) × 2.0 × (1.2)² = 0.24 kg m²', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the theorems.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' },
                { id: 'c', prompt: 'A solid cylinder and a hollow cylinder, both of mass 5 kg and radius 0.1 m, are released from rest on an inclined plane of angle 30°.', answer: 'The solid cylinder reaches first',
                  options: ['The solid cylinder reaches first', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the theorems.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' }
          ],
            remediations: { 'the-moment-of-inertia-of': { steps: ['Revisit node 06_008 (Moment of Inertia: Definition) to reinforce that I = Σ m r², so changing the axis changes r for.', 'Practice axis identification: for each standard body, draw the body, label the axis, and write the correct formula from.', 'Use a physical model (a ruler as a rod) to feel the difference in resistance when rotating about the centre vs.', 'For parallel axis theorem errors, always draw the two parallel axes, mark the centre of mass, measure the perpendicular.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.',
          parts: [
                { id: 'a', prompt: 'A student writes the moment of inertia of a thin rectangular plate (sides a and b, mass M) about an axis through its centre and perpendicular to its plane as.', answer: 'The formula is incorrect',
                  options: ['The formula is incorrect', 'the moment of inertia of a body is a single fixed number, like mass'],
                  hint: 'If stuck, review node 06_008 for the definition and nodes 06_009 and 06_010 for the theorems.',
                  misconception: 'Students often believe that the moment of inertia of a body is a single fixed number, like mass.' }
          ],
            remediations: { 'the-moment-of-inertia-of': { steps: ['Revisit node 06_008 (Moment of Inertia: Definition) to reinforce that I = Σ m r², so changing the axis changes r for.', 'Practice axis identification: for each standard body, draw the body, label the axis, and write the correct formula from.', 'Use a physical model (a ruler as a rod) to feel the difference in resistance when rotating about the centre vs.', 'For parallel axis theorem errors, always draw the two parallel axes, mark the centre of mass, measure the perpendicular.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_012', difficulty: 'standard',
          question: 'Kinematics of rotational motion describes the motion of a rigid body rotating.',
          hint: 'Revisit Class 9 Physics Chapter 2 (Equations of Motion) and Class 11 Physics Chapter 6.',
          misconception: 'Students often believe that the rotational kinematic equations (ω = ω₀ + αt, etc.) can be used for any rotational.',
          parts: [
                { id: 'a', prompt: 'A wheel rotates about a fixed horizontal axis. Its angular velocity vector points east.', answer: 'The angular acceleration vector points west (opposite to ω)',
                  options: ['The angular acceleration vector points west (opposite to ω)', 'α also points east', 'the rotational kinematic equations (ω = ω₀ + αt, etc'],
                  hint: 'Revisit Class 9 Physics Chapter 2 (Equations of Motion) and Class 11 Physics Chapter 6 Node 003.',
                  misconception: 'Students often believe that the rotational kinematic equations (ω = ω₀ + αt, etc.) can be used for any rotational motion, even when angular.' },
                { id: 'b', prompt: 'A potter\'s wheel starts from rest and reaches an angular speed of 180 rpm in 8.0 s with constant angular acceleration.', answer: 'the angular acceleration in rad/s², (',
                  options: ['the angular acceleration in rad/s², (', 'the rotational kinematic equations (ω = ω₀ + αt, etc'],
                  hint: 'Revisit Class 9 Physics Chapter 2 (Equations of Motion) and Class 11 Physics Chapter 6 Node 003.',
                  misconception: 'Students often believe that the rotational kinematic equations (ω = ω₀ + αt, etc.) can be used for any rotational motion, even when angular.' },
                { id: 'c', prompt: 'A point on a rotating disc is 0.40 m from the axis. At a certain instant, the disc has ω = 10 rad/s and α = 5 rad/s².', answer: 'Tangential acceleration a_t = αr = 5 × 0.40 = 2.0 m/s²',
                  options: ['Tangential acceleration a_t = αr = 5 × 0.40 = 2.0 m/s²', 'the rotational kinematic equations (ω = ω₀ + αt, etc'],
                  hint: 'Revisit Class 9 Physics Chapter 2 (Equations of Motion) and Class 11 Physics Chapter 6 Node 003.',
                  misconception: 'Students often believe that the rotational kinematic equations (ω = ω₀ + αt, etc.) can be used for any rotational motion, even when angular.' }
          ],
            remediations: { 'the-rotational-kinematic-equations-t': { steps: ['Revisit the derivation of ω = ω₀ + αt from α = dω/dt with constant α (integration).', 'Note that if α varies, the integral becomes ∫α dt, not αt.', 'Use a rotating chair or a spinning bicycle wheel: spin it up (ω and α same direction) and let it slow down due.', 'Physically feel the difference.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
