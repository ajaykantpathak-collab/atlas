import type { SimDef } from '../../engine/types';
import C11_PhysicsRotationalMotionTorqueSim from '../../../simulations/c6_12/C11_PhysicsRotationalMotionTorqueSim';

/** v3 wrapped master — C11_PhysicsRotationalMotionTorqueSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsrotationalmotiontorquesim: SimDef = {
    id: 'v3w_c11_physicsrotationalmotiontorquesim',
    title: 'Rotational Motion Torque',
    subtitle: 'This node covers the precise statement of Newton\'s Third Law, identification of.',
    classLevel: 11, subject: 'physics', topic: 'Newton\'s Third Law: Action and Reaction',
    chapters: [],
    nodeIds: ['c11_phy_cbse_04_004', 'c11_phy_cbse_04_007', 'c11_phy_cbse_04_014', 'c11_phy_cbse_06_002', 'c11_phy_cbse_06_003', 'c11_phy_cbse_06_004', 'c11_phy_cbse_06_005', 'c11_phy_cbse_06_006', 'c11_phy_cbse_06_012', 'c11_phy_cbse_06_013', 'c11_phy_cbse_06_015', 'c11_phy_cbse_04_003', 'c11_phy_cbse_06_007', 'c11_phy_cbse_06_011', 'c11_phy_cbse_06_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Place a heavy book on a spring balance held vertically. Observe the reading.', goal: 'Master Rotational Motion Torque.' },
    discovery: {
        question: 'A student argues: "A book lying on a table is in equilibrium because the weight **mg** and the normal reaction **R** are an action-reaction pair, so they.',
        options: ['The reasoning is incorrect', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
        answer: 'The reasoning is incorrect',
        hook: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs.',
    },
    teaching: [
        { title: 'Newton\'s Third Law states that for every.', text: 'Newton\'s Third Law states that for every force exerted by body A on body B, there exists a simultaneous force of equal magnitude but opposite direction exerted by body B on body A.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_004', title: 'Newton\'s Third Law states that for.',
          scaffold: { problem: 'A 10 kg block rests on a smooth horizontal table. A 3 kg block is placed on top of it.',
            steps: [
            { text: 'Define systems. System 1 = both blocks together (13 kg). System 2 = 3 kg block alone. System 3 = 10 kg block alone.' },
            { text: 'For System 1: F_net = 50 N (only external horizontal force). m_total = 13 kg. a = F_net / m_total = 50/13 ≈ 3.846 m/s².' },
            { text: 'For System 2 (3 kg block): Only horizontal force = contact force F_c (from 10 kg block).' },
            { text: 'For System 3 (10 kg block): Forces = 50 N forward, F_c\' backward (from 3 kg block).' },
            { text: 'Verify Third Law: F_c (on 3 kg by 10 kg) = +11.54 N (forward), F_c\' (on 10 kg by 3 kg) = –11.54 N (backward).', faded: true, blankAnswer: '(a) a = 50/13 ≈ 3.85 m/s², (b) Contact force = 150/13 ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_007', title: 'Equilibrium of a particle is the state.',
          scaffold: { problem: 'A traffic signal of mass 12 kg is suspended by two light cables attached to a horizontal beam.',
            steps: [
            { text: 'Identify the system (traffic signal as a particle), list given quantities: m = 12 kg, g = 10 m/s² → W = mg = 120 N.' },
            { text: 'Draw free-body diagram — dot for signal, three arrows: T₁ (up-left, 30° to horizontal), T₂ (up-right, 60° to.' },
            { text: 'Resolve forces into components: T₁ₓ = -T₁ cos30° = -T₁(√3/2), T₁ᵧ = T₁ sin30° = T₁(½); T₂ₓ = T₂ cos60° = T₂(½), T₂ᵧ =.' },
            { text: 'Apply equilibrium equations: ΣFₓ = 0 → -T₁(√3/2) + T₂(½) = 0 → T₂ = T₁√3. ΣFᵧ = 0 → T₁(½) + T₂(√3/2) - 120 = 0.' },
            { text: 'Verify: T₁ₓ = -51.96 N, T₂ₓ = 51.96 N → ΣFₓ = 0. T₁ᵧ = 30 N, T₂ᵧ = 90 N, W = -120 N → ΣFᵧ = 0.', faded: true, blankAnswer: 'T₁ = 60 N (left cable), T₂ = 60√3 N ≈ 103.9 N (right cable)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_014', title: 'A Free Body Diagram (FBD) is a.',
          scaffold: { problem: 'A 40 kg sack of rice is pulled up a 20° rough ramp (μ_k = 0.15) by a rope parallel to the ramp with tension T = 300 N.',
            steps: [
            { text: 'Identify system = sack. Draw FBD: weight mg = 400 N vertically down, normal N perpendicular to ramp, kinetic friction.' },
            { text: 'Resolve weight: mg_x = mg sin20° = 400 × 0.342 = 136.8 N (down ramp), mg_y = mg cos20° = 400 × 0.94 = 376 N (into ramp).' },
            { text: 'Write ΣF_y = 0 (no acceleration perpendicular to ramp): N - mg cos20° = 0 → N = 376 N.' },
            { text: 'Write ΣF_x = m a_x: T - mg sin20° - f_k = m a → 300 - 136.8 - 56.4 = 40 a → 106.8 = 40 a → a = 2.67 m/s² up the ramp.' },
            { text: 'Work by tension: W_T = T × s = 300 × 5 = 1500 J. Work by friction: W_f = -f_k × s = -56.4 × 5 = -282 J.', faded: true, blankAnswer: '(a) a = 2.67 m/s² up the ramp, (b) W_T = 1500 J, (c) W_f =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_002', title: 'The motion of the centre of mass of a.',
          scaffold: { problem: 'A 4 kg block moving at 10 m/s on a smooth horizontal surface explodes into two fragments of masses 1 kg and 3 kg.',
            steps: [
            { text: 'Identify given quantities: m₁ = 1 kg, m₂ = 3 kg, M = 4 kg, initial velocity Vᵢ = 10 m/s (forward), v₁ = 20 m/s.' },
            { text: 'Apply conservation of linear momentum (no external horizontal force): M Vᵢ = m₁ v₁ + m₂ v₂.' },
            { text: 'Substitute values with units: (4 kg)(10 m/s) = (1 kg)(20 m/s) + (3 kg) v₂ → 40 kg·m/s = 20 kg·m/s + 3 kg·v₂.' },
            { text: 'Solve for v₂: 3 kg·v₂ = 20 kg·m/s → v₂ = 6.67 m/s (forward). Compute V_cm before = 10 m/s; after = (1×20 + 3×6.67)/4 =.' },
            { text: 'Verify: V_cm unchanged (10 m/s) as expected because F_ext = 0. Units consistent: kg·m/s / kg = m/s.', faded: true, blankAnswer: 'Velocity of 3 kg fragment = 6.67 m/s forward; V_cm before =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_003', title: 'The vector product (cross product) of.',
          scaffold: { problem: 'A force **F** = (3**î** + 4**ĵ** − 2**k̂**) N acts on a particle at position **r** = (2**î** − **ĵ** + 3**k̂**) m relative to the origin.',
            steps: [
            { text: 'Identify given vectors with units: **r** = (2, −1, 3) m, **F** = (3, 4, −2) N.' },
            { text: 'Set up the determinant for cross product: **τ** = |**î** **ĵ** **k̂**; 2 −1 3; 3 4 −2|.' },
            { text: 'Expand: **τ** = **î**[ (−1)(−2) − (3)(4) ] − **ĵ**[ (2)(−2) − (3)(3) ] + **k̂**[ (2)(4) − (−1)(3) ] = **î**[2 − 12] −.' },
            { text: 'Magnitude |**τ**| = √[(−10)² + 13² + 11²] = √(100 + 169 + 121) = √390 ≈ 19.75 N·m.' },
            { text: 'Verify physically: **τ** is perpendicular to both **r** and **F**.', faded: true, blankAnswer: '**τ** = (−10**î** + 13**ĵ** + 11**k̂**) N·m; |**τ**| ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_004', title: 'Torque (or moment of force) is the.',
          scaffold: { problem: 'A force **F** = (3î + 4ĵ - 5k̂) N acts on a particle at position **r** = (2î - 1ĵ + 3k̂) m relative to the origin.',
            steps: [
            { text: 'Identify given vectors: **r** = (2, -1, 3) m, **F** = (3, 4, -5) N. Required: **τ** = **r** × **F**.' },
            { text: 'Set up determinant for cross product: **τ** = det | î ĵ k̂ ; 2 -1 3 ; 3 4 -5 |.' },
            { text: 'Compute components: τ_x = (-1)(-5) - (3)(4) = 5 - 12 = -7; τ_y = (3)(3) - (2)(-5) = 9 + 10 = 19; τ_z = (2)(4) - (-1)(3).' },
            { text: 'Write vector: **τ** = (-7î + 19ĵ + 11k̂) N·m. Magnitude τ = √[(-7)² + 19² + 11²] = √(49 + 361 + 121) = √531 ≈ 23.0 N·m.' },
            { text: 'Verify: **τ** · **r** = (-7)(2) + 19(-1) + 11(3) = -14 -19 +33 = 0; **τ** · **F** = (-7)(3) + 19(4) + 11(-5) = -21 +76.', faded: true, blankAnswer: '**τ** = (-7î + 19ĵ + 11k̂) N·m; |**τ**| ≈ 23.0 N·m' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_04_007', title: 'Identify each idea',
          dissect: { specimen: 'Rotational Motion Torque', spots: [
            { id: 's1', label: 'Newtons Third Law states that', prompt: 'Which idea is this? — Newton\'s Third Law states that for every force exerted by body A on body B, there exists.', answer: 'Newtons Third Law states that', options: ['Newtons Third Law states that', 'Equilibrium of a particle is', 'A Free Body Diagram FBD', 'The motion of the centre'] },
            { id: 's2', label: 'Equilibrium of a particle is', prompt: 'Which idea is this? — Equilibrium of a particle is the state in which the vector sum of all external forces.', answer: 'Equilibrium of a particle is', options: ['Equilibrium of a particle is', 'Newtons Third Law states that', 'A Free Body Diagram FBD', 'The motion of the centre'] },
            { id: 's3', label: 'A Free Body Diagram FBD', prompt: 'Which idea is this? — A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system).', answer: 'A Free Body Diagram FBD', options: ['A Free Body Diagram FBD', 'Newtons Third Law states that', 'Equilibrium of a particle is', 'The motion of the centre'] },
            { id: 's4', label: 'The motion of the centre', prompt: 'Which idea is this? — The motion of the centre of mass of a system of particles is governed by the equation \\(.', answer: 'The motion of the centre', options: ['The motion of the centre', 'Newtons Third Law states that', 'Equilibrium of a particle is', 'A Free Body Diagram FBD'] },
            { id: 's5', label: 'The vector product cross product', prompt: 'Which idea is this? — The vector product (cross product) of two vectors **a** and **b** is a vector **c** =.', answer: 'The vector product cross product', options: ['The vector product cross product', 'Newtons Third Law states that', 'Equilibrium of a particle is', 'A Free Body Diagram FBD'] },
            { id: 's6', label: 'Torque or moment of force', prompt: 'Which idea is this? — Torque (or moment of force) is the rotational analogue of force, defined as the vector.', answer: 'Torque or moment of force', options: ['Torque or moment of force', 'Newtons Third Law states that', 'Equilibrium of a particle is', 'A Free Body Diagram FBD'] }
          ] } }
    ],
    explore: { component: C11_PhysicsRotationalMotionTorqueSim, prompt: 'Explore the interactive — Rotational Motion Torque' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_004', difficulty: 'standard',
          question: 'Newton\'s Third Law states that for every force exerted by body A on body B,.',
          hint: 'If stuck, revisit c11_phy_cbse_04_003 (Newton\'s Second Law) and practice drawing FBDs for.',
          misconception: '**Misconception:** "Action and reaction forces cancel each other, so nothing can ever accelerate." **Exact wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Newton\'s Third Law states that for every force exerted by body A on body B, there exists',
                  options: ['Newton\'s Third Law states that for every force exerted by body A on body B, there exists', 'Equilibrium of a particle is the state in', 'A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system)', 'The motion of the centre of mass of a system of particles is governed by the equation \\('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Action and reaction forces cancel each other, so nothing can ever accelerate." **Exact wrong reasoning:** Students see.' }
          ],
            remediations: { 'misconception-action-and-reaction-forces': { steps: ['**Draw the system boundary explicitly:** Circle the body you are analyzing.', 'List ONLY forces **on** that body.', 'Cross out any force **by** that body.', '**Name every force as "Force on X by Y":** Write "Force on book by Earth" (weight) and "Force on book by Table".'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_007', difficulty: 'standard',
          question: 'Equilibrium of a particle is the state in which the vector sum of all external.',
          hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
          misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs.',
          parts: [
                { id: 'a', prompt: 'A student argues: "A book lying on a table is in equilibrium because the weight **mg** and the normal reaction **R** are an action-reaction pair, so they.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'b', prompt: 'A 5 kg mass is suspended from a ceiling by a light string. A horizontal force **F** is applied to the mass so that the string makes an angle of 30° with the.', answer: '**Given:** m = 5 kg, θ = 30°, g = 10 m/s² → weight W = mg = 50 N downward',
                  options: ['**Given:** m = 5 kg, θ = 30°, g = 10 m/s² → weight W = mg = 50 N downward', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'c', prompt: 'Two identical smooth spheres of weight W each are placed inside a smooth hollow cylinder of diameter D such that they touch each other and the cylinder wall at.', answer: 'Consider the **upper sphere** as the system',
                  options: ['Consider the **upper sphere** as the system', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' }
          ],
            remediations: { 'equilibrium-means-no-forces-act': { steps: ['If the student holds this misconception: 1.', '**Revisit Newton\'s First Law** (c11_phy_cbse_04_002): Ask "If I push a box with 10 N right and friction pushes 10 N.', 'What is the net force?" — forces exist, net force is zero.', '**Revisit Newton\'s Third Law** (c11_phy_cbse_04_004): Draw two separate free-body diagrams — one for the book (showing.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs.',
          parts: [
                { id: 'a', prompt: 'A particle is acted upon by four forces in a plane: **F₁** = 10 N at 0°, **F₂** = 10 N at 90°, **F₃** = 10 N at 180°, **F₄** = 10 N at 270°.', answer: 'The claim is **true for this specific set**',
                  options: ['The claim is **true for this specific set**', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body', 'gravity and normal force are action-reaction, so they cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'b', prompt: 'Design a simple experiment using a force table (or a circular board with pulleys at the edge and strings tied to a central ring) to verify the triangle law of.', answer: 'the measurable quantities, (',
                  options: ['the measurable quantities, (', 'measure angles and see if they add to 360°', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' }
          ],
            remediations: { 'equilibrium-means-no-forces-act': { steps: ['If the student holds this misconception: 1.', '**Revisit Newton\'s First Law** (c11_phy_cbse_04_002): Ask "If I push a box with 10 N right and friction pushes 10 N.', 'What is the net force?" — forces exist, net force is zero.', '**Revisit Newton\'s Third Law** (c11_phy_cbse_04_004): Draw two separate free-body diagrams — one for the book (showing.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_014', difficulty: 'standard',
          question: 'A Free Body Diagram (FBD) is a schematic representation of an isolated body (or.',
          hint: 'If stuck, revisit **c11_phy_cbse_04_003 (Newton\'s Second Law)** for ΣF = ma,.',
          misconception: '**Misconception:** "The normal reaction force N is always equal to mg." **Exact Wrong Reasoning:** Students memorize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system)',
                  options: ['A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system)', 'Newton\'s Third Law states that for every force exerted by body A on body B, there exists', 'Equilibrium of a particle is the state in', 'The motion of the centre of mass of a system of particles is governed by the equation \\('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The normal reaction force N is always equal to mg." **Exact Wrong Reasoning:** Students memorize the equilibrium.' }
          ],
            remediations: { 'misconception-the-normal-reaction-force': { steps: ['** Revisit **c11_phy_cbse_04_007 (Equilibrium of a Particle)** and **c11_phy_cbse_04_008 (Common Forces in Mechanics)**.', '** Perform this **mental experiment**: Place a book on a table (N = mg).', '** Solve **three targeted problems** where N ≠ mg: (a) Block on frictionless incline (θ = 30°), (b) Block in lift.', '** Check NCERT Example 4.6 (rope pulled horizontally at midpoint) — notice N is not even vertical!'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_002', difficulty: 'standard',
          question: 'The motion of the centre of mass of a system of particles is governed by the.',
          hint: 'If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton\'s laws.',
          misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or.',
          parts: [
                { id: 'a', prompt: 'State the formula for the velocity of the centre of mass of a system of n particles and give its SI unit.', answer: '\\( \\vec{V}_{cm} = \\frac{\\sum_{i=1}^n m_i \\vec{v}_i}{M} \\), SI unit: m/s',
                  options: ['\\( \\vec{V}_{cm} = \\frac{\\sum_{i=1}^n m_i \\vec{v}_i}{M} \\), SI unit: m/s', 'the pieces are moving differently now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' },
                { id: 'b', prompt: 'Two particles of masses 2 kg and 3 kg move along the x-axis with velocities \\( 4 \\hat{i} \\) m/s and \\( -2 \\hat{i} \\) m/s respectively.', answer: 'Given: \\( m_1 = 2 \\) kg, \\( \\vec{v}_1 = 4 \\hat{i} \\) m/s',
                  options: ['Given: \\( m_1 = 2 \\) kg, \\( \\vec{v}_1 = 4 \\hat{i} \\) m/s', 'the pieces are moving differently now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' }
          ],
            remediations: { 'if-a-system-breaks-apart': { steps: ['Revisit the derivation \\( M \\vec{A}_{cm} = \\sum \\vec{F}_{ext} + \\sum \\vec{F}_{int} \\) and explicitly write the internal.', 'Use the "exploding projectile" simulation (PhET or similar) — pause at explosion, mark the centre of mass of all.', 'Solve a problem where a moving object splits into two unequal masses; calculate fragment velocities using momentum.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or.',
          parts: [
                { id: 'a', prompt: 'A student argues: "When a bomb at rest explodes into two pieces, the pieces fly in opposite directions with equal speeds because momentum is conserved.".', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'the pieces are moving differently now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' }
          ],
            remediations: { 'if-a-system-breaks-apart': { steps: ['Revisit the derivation \\( M \\vec{A}_{cm} = \\sum \\vec{F}_{ext} + \\sum \\vec{F}_{int} \\) and explicitly write the internal.', 'Use the "exploding projectile" simulation (PhET or similar) — pause at explosion, mark the centre of mass of all.', 'Solve a problem where a moving object splits into two unequal masses; calculate fragment velocities using momentum.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_003', difficulty: 'standard',
          question: 'The vector product (cross product) of two vectors **a** and **b** is a vector.',
          hint: 'Review Class 11 Physics Chapter 4 (Motion in a Plane) vector algebra section and Class 11.',
          misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or.',
          parts: [
                { id: 'a', prompt: 'State the magnitude and direction of the vector product **c** = **a** × **b** in terms of |**a**|, |**b**|, and the angle θ between them.', answer: 'Magnitude: |**c**| = |**a**||**b**|sinθ where 0° ≤ θ ≤ 180°',
                  options: ['Magnitude: |**c**| = |**a**||**b**|sinθ where 0° ≤ θ ≤ 180°', 'multiplication usually gives a number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' },
                { id: 'b', prompt: 'Explain why the vector product is not commutative: **a** × **b** ≠ **b** × **a**, even though their magnitudes are equal.', answer: '**a** × **b** and **b** × **a** have the same magnitude ab sinθ and both are',
                  options: ['**a** × **b** and **b** × **a** have the same magnitude ab sinθ and both are', 'multiplication usually gives a number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' },
                { id: 'c', prompt: 'A force **F** = 4**î** + 3**ĵ** N acts at a point with position vector **r** = 2**î** − **ĵ** + **k̂** m relative to the origin.', answer: '**τ** = **r** × **F** = |**î** **ĵ** **k̂**',
                  options: ['**τ** = **r** × **F** = |**î** **ĵ** **k̂**', 'multiplication usually gives a number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' }
          ],
            remediations: { 'the-cross-product-a-b': { steps: ['Revisit the right-hand rule physically — hold a pen as **a**, another as **b**, curl right-hand fingers from first to.', 'Practice the determinant mnemonic: write **î** **ĵ** **k̂** in first row, components of **a** in second, **b** in.', 'Verify **î** × **ĵ** = **k̂**, **ĵ** × **k̂** = **î**, **k̂** × **î** = **ĵ** cyclically; reverse order gives minus.', 'Solve 5 cross product problems from NCERT Exercise 6.4 and 6.5, checking each with the right-hand rule.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If **a** × **b** = **0**, then either **a** = **0** or **b** = **0**." Evaluate this statement. Is it always true?', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'multiplication usually gives a number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' },
                { id: 'b', prompt: 'Design a simple classroom experiment using a metre scale, a known mass, and a spring balance to demonstrate that the turning effect (torque) depends on the.', answer: 'Pivot the metre scale horizontally at the 0 cm mark',
                  options: ['Pivot the metre scale horizontally at the 0 cm mark', 'multiplication usually gives a number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' }
          ],
            remediations: { 'the-cross-product-a-b': { steps: ['Revisit the right-hand rule physically — hold a pen as **a**, another as **b**, curl right-hand fingers from first to.', 'Practice the determinant mnemonic: write **î** **ĵ** **k̂** in first row, components of **a** in second, **b** in.', 'Verify **î** × **ĵ** = **k̂**, **ĵ** × **k̂** = **î**, **k̂** × **î** = **ĵ** cyclically; reverse order gives minus.', 'Solve 5 cross product problems from NCERT Exercise 6.4 and 6.5, checking each with the right-hand rule.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_004', difficulty: 'standard',
          question: 'Torque (or moment of force) is the rotational analogue of force, defined as the.',
          hint: 'If stuck, revisit node c11_phy_cbse_06_003 (Vector Product) and practice cross product.',
          misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.',
          parts: [
                { id: 'a', prompt: 'A force **F** = 10 N acts on a particle at position **r** = (2 m, 0, 0) from the origin. The force is directed along the positive y-axis.', answer: '**τ** = **r** × **F** = (2î) × (10ĵ) = 20 **k̂** N·m',
                  options: ['**τ** = **r** × **F** = (2î) × (10ĵ) = 20 **k̂** N·m', '**torque and work are the same physical quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' },
                { id: 'b', prompt: 'A force of 25 N is applied at the end of a 0.40 m long wrench at an angle of 30° to the wrench handle.', answer: 'Given: F = 25 N, r = 0.40 m, θ = 30°',
                  options: ['Given: F = 25 N, r = 0.40 m, θ = 30°', '**torque and work are the same physical quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' },
                { id: 'c', prompt: 'Two forces act on a rigid body: **F₁** = 5 N at **r₁** = (1, 0, 0) m along +y, and **F₂** = 5 N at **r₂** = (0, 1, 0) m along -x.', answer: '**τ₁** = **r₁** × **F₁** = (1î) × (5ĵ) = 5 **k̂** N·m',
                  options: ['**τ₁** = **r₁** × **F₁** = (1î) × (5ĵ) = 5 **k̂** N·m', '**torque and work are the same physical quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' }
          ],
            remediations: { 'torque-and-work-are-the': { steps: ['**Unit distinction**: Write "Torque unit = N·m (vector)" and "Work unit = J = N·m (scalar)" on a card.', 'Emphasise that N·m for torque is *never* written as joule.', '**Physical difference**: Perform the "door push" experiment: Push a door at the handle (large torque, small.', 'push near hinge (small torque, same displacement).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a force passes through the centre of mass of a body, its torque about the centre of mass is always zero, but its torque about any other.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', '**torque and work are the same physical quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' }
          ],
            remediations: { 'torque-and-work-are-the': { steps: ['**Unit distinction**: Write "Torque unit = N·m (vector)" and "Work unit = J = N·m (scalar)" on a card.', 'Emphasise that N·m for torque is *never* written as joule.', '**Physical difference**: Perform the "door push" experiment: Push a door at the handle (large torque, small.', 'push near hinge (small torque, same displacement).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
