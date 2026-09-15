import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch06_p1: SimDef = {
    id: 'v3_c11_phy_ch06_p1',
    title: 'System of Particles and Rotational Motion · Part 1/3',
    subtitle: 'Watch a hundred fragments obey one invisible point.',
    classLevel: 11, subject: 'physics', topic: 'System of Particles and Rotational Motion · Part 1/3',
    chapters: ['c11_phy_ch06'],
    nodeIds: ['c11_phy_cbse_06_001', 'c11_phy_cbse_06_002', 'c11_phy_cbse_06_003', 'c11_phy_cbse_06_004', 'c11_phy_cbse_06_005', 'c11_phy_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tracker following a point with no mass in it', intro: 'Each blade particle of a fan circles differently, yet the fan \'as a whole\' moves simply — that average point does all the bookkeeping.', goal: 'Compute centre of mass and explain why internal forces can\'t deflect its motion.' },
    discovery: {
        question: 'A Diwali rocket explodes mid-flight into a hundred fragments — where does the centre of mass go?',
        options: ['It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM', 'It falls straight down once the pieces scatter', 'It speeds up from the explosion\'s energy', 'It stops — the system no longer exists'],
        answer: 'It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM',
        hook: 'A uniform ring\'s centre of mass sits at its geometric centre — a point containing zero mass; the CM needn\'t live inside the material at all.',
    },
    teaching: [
        { title: 'Centre of Mass: Definition and Formula', text: 'The centre of mass of a system of particles is the unique point where the entire mass of the system can be considered to be concentrated for the purpose of analyzing its translational motion under.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_06_001', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Find the CM of an L-shaped lamina of three unit squares, then argue why the exploding bomb\'s fragments can\'t move their shared centre.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_001', title: 'Centre of Mass: Definition and Formula',
          scaffold: { problem: 'Three particles of masses 100 g, 150 g, and 200 g are placed at the vertices of an equilateral triangle of side 0.5 m.',
            steps: [
            { text: 'Choose coordinate system. Place origin at 100 g mass (vertex O). Let x-axis along side OA. Then O=(0,0), A=(0.5, 0).' },
            { text: 'Assign masses to vertices: m_O = 100 g at (0,0); m_A = 150 g at (0.5, 0); m_B = 200 g at (0.25, 0.433).' },
            { text: 'Total mass M = 0.1 + 0.15 + 0.2 = 0.45 kg.' },
            { text: 'Compute X_CM = (m_O x_O + m_A x_A + m_B x_B) / M = (0.1×0 + 0.15×0.5 + 0.2×0.25) / 0.45 = (0 + 0.075 + 0.05) / 0.45.' },
            { text: 'Compute Y_CM = (m_O y_O + m_A y_A + m_B y_B) / M = (0.1×0 + 0.15×0 + 0.2×0.433) / 0.45 = 0.0866 / 0.45 = 0.1924.' },
            { text: 'Verify physically: CM should be closer to heavier mass (200 g at B). B is at (0.25, 0.433).', faded: true, blankAnswer: 'X_CM = 5/18 m ≈ 0.278 m, Y_CM = √3/9 m ≈ 0.192 m from the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_002', title: 'Motion of Centre of Mass',
          scaffold: { problem: 'A 4 kg block moving at 10 m/s on a smooth horizontal surface explodes into two fragments of masses 1 kg and 3 kg.',
            steps: [
            { text: 'Identify given quantities: m₁ = 1 kg, m₂ = 3 kg, M = 4 kg, initial velocity Vᵢ = 10 m/s (forward), v₁ = 20 m/s.' },
            { text: 'Apply conservation of linear momentum (no external horizontal force): M Vᵢ = m₁ v₁ + m₂ v₂.' },
            { text: 'Substitute values with units: (4 kg)(10 m/s) = (1 kg)(20 m/s) + (3 kg) v₂ → 40 kg·m/s = 20 kg·m/s + 3 kg·v₂.' },
            { text: 'Solve for v₂: 3 kg·v₂ = 20 kg·m/s → v₂ = 6.67 m/s (forward). Compute V_cm before = 10 m/s; after = (1×20 + 3×6.67)/4.' },
            { text: 'Verify: V_cm unchanged (10 m/s) as expected because F_ext = 0. Units consistent: kg·m/s / kg = m/s.', faded: true, blankAnswer: 'Velocity of 3 kg fragment = 6.67 m/s forward; V_cm before.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_003', title: 'Vector Product (Cross Product) of Vectors',
          scaffold: { problem: 'A force **F** = (3**î** + 4**ĵ** − 2**k̂**) N acts on a particle at position **r** = (2**î** − **ĵ** + 3**k̂**) m relative to the origin.',
            steps: [
            { text: 'Identify given vectors with units: **r** = (2, −1, 3) m, **F** = (3, 4, −2) N.' },
            { text: 'Set up the determinant for cross product: **τ** = |**î** **ĵ** **k̂**; 2 −1 3; 3 4 −2|.' },
            { text: 'Expand: **τ** = **î**[ (−1)(−2) − (3)(4) ] − **ĵ**[ (2)(−2) − (3)(3) ] + **k̂**[ (2)(4) − (−1)(3) ] = **î**[2 − 12].' },
            { text: 'Magnitude |**τ**| = √[(−10)² + 13² + 11²] = √(100 + 169 + 121) = √390 ≈ 19.75 N·m.' },
            { text: 'Verify physically: **τ** is perpendicular to both **r** and **F**.', faded: true, blankAnswer: '**τ** = (−10**î** + 13**ĵ** + 11**k̂**) N·m; |**τ**| ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_004', title: 'Torque: Definition and Calculation',
          scaffold: { problem: 'A force **F** = (3î + 4ĵ - 5k̂) N acts on a particle at position **r** = (2î - 1ĵ + 3k̂) m relative to the origin.',
            steps: [
            { text: 'Identify given vectors: **r** = (2, -1, 3) m, **F** = (3, 4, -5) N. Required: **τ** = **r** × **F**.' },
            { text: 'Set up determinant for cross product: **τ** = det | î ĵ k̂ ; 2 -1 3 ; 3 4 -5 |.' },
            { text: 'Compute components: τ_x = (-1)(-5) - (3)(4) = 5 - 12 = -7; τ_y = (3)(3) - (2)(-5) = 9 + 10 = 19; τ_z = (2)(4) - (-1)(3).' },
            { text: 'Write vector: **τ** = (-7î + 19ĵ + 11k̂) N·m. Magnitude τ = √[(-7)² + 19² + 11²] = √(49 + 361 + 121) = √531 ≈ 23.0 N·m.' },
            { text: 'Verify: **τ** · **r** = (-7)(2) + 19(-1) + 11(3) = -14 -19 +33 = 0; **τ** · **F** = (-7)(3) + 19(4) + 11(-5) = -21 +76.', faded: true, blankAnswer: '**τ** = (-7î + 19ĵ + 11k̂) N·m; |**τ**| ≈ 23.0 N·m' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_005', title: 'Angular Momentum: Definition and Conservation',
          scaffold: { problem: 'A particle of mass 0.5 kg moves in the x-y plane with velocity v = (4î + 3ĵ) m/s.',
            steps: [
            { text: 'Identify given quantities: m = 0.5 kg, v = (4î + 3ĵ) m/s, position w.r.t origin r_O = (3î + 4ĵ) m, position w.r.t point.' },
            { text: 'Compute linear momentum p = mv = 0.5(4î + 3ĵ) = (2î + 1.5ĵ) kg·m/s.' },
            { text: 'For (a) origin: L_O = r_O × p = (3î + 4ĵ) × (2î + 1.5ĵ). Use determinant: î(0) - ĵ(0) + k̂(3×1.5 - 4×2) = k̂(4.5 - 8).' },
            { text: 'For (b) point (1,2): L_P = r_P × p = (2î + 2ĵ) × (2î + 1.5ĵ) = k̂(2×1.5 - 2×2) = k̂(3 - 4) = -1 k̂ kg·m²/s.' },
            { text: 'Verify: L_O ≠ L_P because reference point changed. Check units: m × (kg·m/s) = kg·m²/s ✓.' },
            { text: 'Physical interpretation: The particle\'s motion is not circular about either point; angular momentum is defined for any.', faded: true, blankAnswer: '(a) L = -3.5 k̂ kg·m²/s; (b) L = -1 k̂ kg·m²/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_006', title: 'Equilibrium of a Rigid Body',
          scaffold: { problem: 'A uniform ladder of length 5.0 m and mass 15 kg rests against a smooth vertical wall with its foot on a rough horizontal floor.',
            steps: [
            { text: 'Identify all forces with units. Ladder weight W_L = 15 × 9.8 = 147 N acting at midpoint (2.5 m from foot).' },
            { text: 'Geometry. Ladder length L = 5.0 m, base distance = 3.0 m → height on wall = √(5² - 3²) = 4.0 m.' },
            { text: 'Translational equilibrium. ΣFx = 0 → N_W - f = 0 → f = N_W. ΣFy = 0 → N_F - W_L - W_P = 0 → N_F = 147 + 588 = 735 N.' },
            { text: 'Rotational equilibrium. Take moments about foot (point A) to eliminate N_F and f.' },
            { text: 'Compute. N_W × 4.0 = 147 × 1.5 + 588 × 2.4 = 220.5 + 1411.2 = 1631.7. N_W = 1631.7 / 4.0 = 407.925 N ≈ 408 N.' },
            { text: 'Minimum μ. f_max = μ N_F → μ_min = f / N_F = 408 / 735 = 0.555.', faded: true, blankAnswer: '(a) N_W = 408 N, (b) N_F = 735 N, (c) μ_min = 0.555' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Modelling a Diwali rocket\'s explosion in a simulation, a teammate makes the fragments\' centre of mass veer off \'because the pieces now fly in different directions\', and refuses to place a ring\'s centre of mass at its centre \'since there\'s no mass there.\'',
            decisions: [{ prompt: 'What does centre-of-mass physics actually say?', options: [
                { text: 'Apply both rules: the CM is a mass-weighted average position — a ring\'s CM sits at its geometric centre in empty space; it needn\'t lie in material. And internal forces cancel in action-reaction pairs, so MA_cm = F_ext: the exploded rocket\'s CM keeps tracing the original parabola under gravity alone, however the fragments scatter.', outcome: 'The simulation corrects: explosions rearrange mass but can\'t redirect the CM — only external forces can, and emptiness doesn\'t disqualify a CM.' },
                { text: 'Let the CM veer — after the blast the mass distribution changed, so its path must too.', outcome: 'Internal forces sum to zero by Newton\'s third law: the CM responds only to external forces — gravity — and stays on the parabola.', reveals: 'explosion-moves-cm' },
                { text: 'Force the ring\'s CM inside the material — a centre of mass must sit on mass.', outcome: 'CM is a weighted average of positions, not a piece of matter: rings, boomerangs and hollow spheres all have CMs in empty space.', reveals: 'cm-must-be-inside-body' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Fragments fly every direction; the mass-weighted average keeps falling like nothing happened — internal chaos can\'t bend an external path.',
            decisions: [{ prompt: 'What comes next? System of Particles and Rotational Motion · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — System of Particles and Rotational Motion · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_001', difficulty: 'standard',
          question: 'The centre of mass of a system of particles is the unique point where the.',
          hint: 'If stuck, revisit Class 9 Maths Chapter 1 (Coordinate Geometry) section formula and Class.',
          misconception: 'Students believe the centre of mass of a body must always lie within the physical material of the body.',
          parts: [
                { id: 'a', prompt: 'Four particles of equal mass m are placed at the vertices of a square of side a.', answer: 'With four equal masses, by symmetry the CM is at the square\'s centre (0,0)',
                  options: ['With four equal masses, by symmetry the CM is at the square\'s centre (0,0)', 'CM remains at origin', 'CM moves to that vertex'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 1 (Coordinate Geometry) section formula and Class 10 Maths.',
                  misconception: 'Students believe the centre of mass of a body must always lie within the physical material of the body.' }
          ],
            remediations: { 'the-centre-of-mass-of': { steps: ['Take a circular ring (or bangle) and balance it on a pencil tip at its geometric centre - it balances perfectly.', 'Draw a horseshoe shape on cardboard, cut it out, suspend from different corners with a plumb line - the intersection.', 'Re-derive the formula X_CM = Σ m_i x_i / M - note that x_i are coordinates of mass elements, but X_CM is a mathematical.', 'Practice NCERT Exercise 6.1: "Does the centre of mass of a body necessarily lie inside the body?" - answer: No, e.g.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_002', difficulty: 'standard',
          question: 'The motion of the centre of mass of a system of particles is governed by the.',
          hint: 'If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton\'s laws.',
          misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates*.',
          parts: [
                { id: 'a', prompt: 'State the formula for the velocity of the centre of mass of a system of n particles and give its SI unit.', answer: '\\( \\vec{V}_{cm} = \\frac{\\sum_{i=1}^n m_i \\vec{v}_i}{M} \\), SI unit: m/s',
                  options: ['\\( \\vec{V}_{cm} = \\frac{\\sum_{i=1}^n m_i \\vec{v}_i}{M} \\), SI unit: m/s', 'the pieces are moving differently now'],
                  hint: 'If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton\'s laws.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' },
                { id: 'b', prompt: 'Two particles of masses 2 kg and 3 kg move along the x-axis with velocities \\( 4 \\hat{i} \\) m/s and \\( -2 \\hat{i} \\) m/s respectively.', answer: 'Given: \\( m_1 = 2 \\) kg, \\( \\vec{v}_1 = 4 \\hat{i} \\) m/s',
                  options: ['Given: \\( m_1 = 2 \\) kg, \\( \\vec{v}_1 = 4 \\hat{i} \\) m/s', 'the pieces are moving differently now'],
                  hint: 'If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton\'s laws.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' }
          ],
            remediations: { 'if-a-system-breaks-apart': { steps: ['Revisit the derivation \\( M \\vec{A}_{cm} = \\sum \\vec{F}_{ext} + \\sum \\vec{F}_{int} \\) and explicitly write the internal.', 'Use the "exploding projectile" simulation (PhET or similar) — pause at explosion, mark the centre of mass of all.', 'Solve a problem where a moving object splits into two unequal masses; calculate fragment velocities using momentum.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates*.',
          parts: [
                { id: 'a', prompt: 'A student argues: "When a bomb at rest explodes into two pieces, the pieces fly in opposite directions with equal speeds because momentum is conserved.".', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'the pieces are moving differently now'],
                  hint: 'If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton\'s laws.',
                  misconception: 'Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path*.' }
          ],
            remediations: { 'if-a-system-breaks-apart': { steps: ['Revisit the derivation \\( M \\vec{A}_{cm} = \\sum \\vec{F}_{ext} + \\sum \\vec{F}_{int} \\) and explicitly write the internal.', 'Use the "exploding projectile" simulation (PhET or similar) — pause at explosion, mark the centre of mass of all.', 'Solve a problem where a moving object splits into two unequal masses; calculate fragment velocities using momentum.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_003', difficulty: 'standard',
          question: 'The vector product (cross product) of two vectors **a** and **b** is a vector.',
          hint: 'Review Class 11 Physics Chapter 4 (Motion in a Plane) vector algebra section and Class 11.',
          misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number,".',
          parts: [
                { id: 'a', prompt: 'State the magnitude and direction of the vector product **c** = **a** × **b** in terms of |**a**|, |**b**|, and the angle θ between them.', answer: 'Magnitude: |**c**| = |**a**||**b**|sinθ where 0° ≤ θ ≤ 180°',
                  options: ['Magnitude: |**c**| = |**a**||**b**|sinθ where 0° ≤ θ ≤ 180°', 'multiplication usually gives a number'],
                  hint: 'Review Class 11 Physics Chapter 4 (Motion in a Plane) vector algebra section and Class 11 Maths.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' },
                { id: 'b', prompt: 'Explain why the vector product is not commutative: **a** × **b** ≠ **b** × **a**, even though their magnitudes are equal.', answer: '**a** × **b** and **b** × **a** have the same magnitude ab sinθ and both are',
                  options: ['**a** × **b** and **b** × **a** have the same magnitude ab sinθ and both are', 'multiplication usually gives a number', 'they are equal, or that the difference is only in magnitude'],
                  hint: 'Review Class 11 Physics Chapter 4 (Motion in a Plane) vector algebra section and Class 11 Maths.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' },
                { id: 'c', prompt: 'A force **F** = 4**î** + 3**ĵ** N acts at a point with position vector **r** = 2**î** − **ĵ** + **k̂** m relative to the origin.', answer: '**τ** = **r** × **F** = |**î** **ĵ** **k̂**',
                  options: ['**τ** = **r** × **F** = |**î** **ĵ** **k̂**', 'multiplication usually gives a number'],
                  hint: 'Review Class 11 Physics Chapter 4 (Motion in a Plane) vector algebra section and Class 11 Maths.',
                  misconception: 'Students often think the cross product **a** × **b** is a scalar because "multiplication usually gives a number," or they confuse the.' }
          ],
            remediations: { 'the-cross-product-a-b': { steps: ['Revisit the right-hand rule physically — hold a pen as **a**, another as **b**, curl right-hand fingers from first.', 'Practice the determinant mnemonic: write **î** **ĵ** **k̂** in first row, components of **a** in second, **b**.', 'Verify **î** × **ĵ** = **k̂**, **ĵ** × **k̂** = **î**, **k̂** × **î** = **ĵ** cyclically; reverse order gives minus.', 'Solve 5 cross product problems from NCERT Exercise 6.4 and 6.5, checking each with the right-hand rule.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_004', difficulty: 'standard',
          question: 'Torque (or moment of force) is the rotational analogue of force, defined as the.',
          hint: 'If stuck, revisit node c11_phy_cbse_06_003 (Vector Product) and practice cross product.',
          misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.',
          parts: [
                { id: 'a', prompt: 'A force **F** = 10 N acts on a particle at position **r** = (2 m, 0, 0) from the origin. The force is directed along the positive y-axis.', answer: '**τ** = **r** × **F** = (2î) × (10ĵ) = 20 **k̂** N·m',
                  options: ['**τ** = **r** × **F** = (2î) × (10ĵ) = 20 **k̂** N·m', '**torque and work are the same physical quantity'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_003 (Vector Product) and practice cross product calculations.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' },
                { id: 'b', prompt: 'A force of 25 N is applied at the end of a 0.40 m long wrench at an angle of 30° to the wrench handle.', answer: 'Given: F = 25 N, r = 0.40 m, θ = 30°',
                  options: ['Given: F = 25 N, r = 0.40 m, θ = 30°', '**torque and work are the same physical quantity'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_003 (Vector Product) and practice cross product calculations.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' },
                { id: 'c', prompt: 'Two forces act on a rigid body: **F₁** = 5 N at **r₁** = (1, 0, 0) m along +y, and **F₂** = 5 N at **r₂** = (0, 1, 0) m along -x.', answer: '**τ₁** = **r₁** × **F₁** = (1î) × (5ĵ) = 5 **k̂** N·m',
                  options: ['**τ₁** = **r₁** × **F₁** = (1î) × (5ĵ) = 5 **k̂** N·m', '**torque and work are the same physical quantity'],
                  hint: 'If stuck, revisit node c11_phy_cbse_06_003 (Vector Product) and practice cross product calculations.',
                  misconception: 'Students often believe that **torque and work are the same physical quantity because both have the unit N·m (joule)**.' }
          ],
            remediations: { 'torque-and-work-are-the': { steps: ['**Unit distinction**: Write "Torque unit = N·m (vector)" and "Work unit = J = N·m (scalar)" on a card.', 'Emphasise that N·m for torque is *never* written as joule.', '**Physical difference**: Perform the "door push" experiment: Push a door at the handle (large torque, small.', 'push near hinge (small torque, same displacement).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_005', difficulty: 'standard',
          question: 'Angular momentum (L) of a particle about a point O is the cross product of its.',
          hint: 'Review vector cross product (c11_phy_cbse_06_003) – specifically the determinant method.',
          misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.',
          parts: [
                { id: 'a', prompt: 'Two identical particles of mass m move in opposite directions along parallel lines separated by distance d, each with speed v.', answer: 'Choose origin O',
                  options: ['Choose origin O', 'origin-independence', 'conservation', 'conservation of angular momentum'],
                  hint: 'Review vector cross product (c11_phy_cbse_06_003) – specifically the determinant method for r ×.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' },
                { id: 'b', prompt: 'A uniform rod of mass 4 kg and length 1.2 m rotates freely about a vertical axis through its centre.', answer: 'Step 1: Initial I = I_rod + I_rings(at centre) = (4×1.2²)/12 + 0 = 0.48 kg·m²',
                  options: ['Step 1: Initial I = I_rod + I_rings(at centre) = (4×1.2²)/12 + 0 = 0.48 kg·m²', 'conservation of angular momentum'],
                  hint: 'Review vector cross product (c11_phy_cbse_06_003) – specifically the determinant method for r ×.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' },
                { id: 'c', prompt: 'A horizontal platform (moment of inertia I_p) rotates freely at angular speed ω_0.', answer: 'Initial I_i = I_p + 2m_wR²',
                  options: ['Initial I_i = I_p + 2m_wR²', 'conservation of angular momentum', 'conservation of mechanical energy'],
                  hint: 'Review vector cross product (c11_phy_cbse_06_003) – specifically the determinant method for r ×.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' }
          ],
            remediations: { 'conservation-of-angular-momentum-means': { steps: ['Revisit cross product (c11_phy_cbse_06_003): practice r × p calculations with varying angles.', 'Re-derive dL/dt = τ from l = r × p for single particle, then extend to system.', 'Do the "two-disc coupling" thought experiment: draw free-body diagrams showing internal friction forces on each disc.', 'Practice defining system boundaries: list all objects, identify which forces are internal/external.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_006', difficulty: 'standard',
          question: 'A rigid body is in mechanical equilibrium when both its linear momentum and.',
          hint: 'If stuck on torque direction or moment arm geometry, revisit c11_phy_cbse_06_004 (Torque.',
          misconception: 'Students believe that for a body to be in equilibrium, the net torque must be zero only about the centre of mass.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A rigid body is in mechanical equilibrium when both its linear momentum and angular',
                  options: ['A rigid body is in mechanical equilibrium when both its linear momentum and angular', 'The centre of mass of a system of particles is the unique point where the entire mass of', 'The motion of the centre of mass of a system of particles is governed by the equation \\(', 'The vector product (cross product) of two vectors **a** and **b** is a vector **c** ='],
                  hint: 'If stuck on torque direction or moment arm geometry, revisit c11_phy_cbse_06_004 (Torque.',
                  misconception: 'Students believe that for a body to be in equilibrium, the net torque must be zero only about the centre of mass or only about a fixed.' }
          ],
            remediations: { 'for-a-body-to-be': { steps: ['Take a metre scale, support it at two points (not the centre) with two spring balances. Hang a weight at some point.', 'Calculate net torque about the left support — it\'s zero.', 'Calculate net torque about the right support — it\'s zero.', 'Calculate net torque about the centre — it\'s zero.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
