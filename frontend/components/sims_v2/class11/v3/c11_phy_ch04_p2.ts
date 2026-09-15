import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch04_p2: SimDef = {
    id: 'v3_c11_phy_ch04_p2',
    title: 'Laws of Motion · Part 2/3',
    subtitle: 'Unmask the hidden force that made Aristotle\'s fallacy feel true.',
    classLevel: 11, subject: 'physics', topic: 'Laws of Motion · Part 2/3',
    chapters: ['c11_phy_ch04'],
    nodeIds: ['c11_phy_cbse_04_007', 'c11_phy_cbse_04_008', 'c11_phy_cbse_04_009', 'c11_phy_cbse_04_010', 'c11_phy_cbse_04_011', 'c11_phy_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Galileo rerunning the incline in thought', intro: 'A marble on carpet stops, on smooth floor rolls far, on frictionless ice — never. Removing the confounder was the whole insight.', goal: 'State the first law as net-force-zero and distinguish inertia from a force.' },
    discovery: {
        question: '\'Stop pedalling and my bicycle stops — so Galileo was wrong and motion does need force.\' Evaluate.',
        options: ['Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it', 'Completely right — Aristotle stands', 'Completely wrong — bicycles don\'t stop', 'Right — because road contact is a force'],
        answer: 'Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it',
        hook: 'Inertia isn\'t a force keeping things moving — it\'s the property that makes a force necessary to change velocity at all.',
    },
    teaching: [
        { title: 'Equilibrium of a Particle', text: 'Equilibrium of a particle is the state in which the vector sum of all external forces acting on the particle is zero (Σ**F** = 0), resulting in zero acceleration.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_04_007', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Run Galileo\'s double incline to its flat conclusion — same height, then infinite distance — then find the friction on a box pushed steadily at 2 m/s.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_007', title: 'Equilibrium of a Particle',
          scaffold: { problem: 'A traffic signal of mass 12 kg is suspended by two light cables attached to a horizontal beam.',
            steps: [
            { text: 'Identify the system (traffic signal as a particle), list given quantities: m = 12 kg, g = 10 m/s² → W = mg = 120.' },
            { text: 'Draw free-body diagram — dot for signal, three arrows: T₁ (up-left, 30° to horizontal), T₂ (up-right, 60°.' },
            { text: 'Resolve forces into components: T₁ₓ = -T₁ cos30° = -T₁(√3/2), T₁ᵧ = T₁ sin30° = T₁(½); T₂ₓ = T₂ cos60° = T₂(½), T₂ᵧ.' },
            { text: 'Apply equilibrium equations: ΣFₓ = 0 → -T₁(√3/2) + T₂(½) = 0 → T₂ = T₁√3. ΣFᵧ = 0 → T₁(½) + T₂(√3/2) - 120 = 0.' },
            { text: 'Verify: T₁ₓ = -51.96 N, T₂ₓ = 51.96 N → ΣFₓ = 0. T₁ᵧ = 30 N, T₂ᵧ = 90 N, W = -120 N → ΣFᵧ = 0.', faded: true, blankAnswer: 'T₁ = 60 N (left cable), T₂ = 60√3 N ≈ 103.9 N (right cable)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_008', title: 'Common Forces in Mechanics',
          scaffold: { problem: 'A 4 kg suitcase is dragged across a rough horizontal floor of a railway station using a strap at 30° above horizontal.',
            steps: [
            { text: 'Identify given: m = 4 kg, T = 50 N, θ = 30°, μk = 0.25, g = 10 m/s². Find: a (m/s²).' },
            { text: 'Draw free-body diagram. Forces: Weight mg down, Normal N up, Tension T at 30° up from horizontal, Kinetic friction.' },
            { text: 'Vertical equilibrium (no vertical acceleration): N + Ty = mg → N = mg - T sin 30° = 4×10 - 50×0.5 = 40 - 25 = 15 N.' },
            { text: 'Friction: fk = μk N = 0.25 × 15 = 3.75 N. Horizontal net force: F_net_x = Tx - fk = T cos 30° - fk = 50×(√3/2) - 3.75 ≈.' },
            { text: 'Newton\'s second law: a = F_net_x / m = 39.55 / 4 ≈ 9.89 m/s². Check: a < g, reasonable. Answer: 9.9 m/s² forward.', faded: true, blankAnswer: '9.9 m/s² horizontally forward' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_009', title: 'Friction: Static and Kinetic',
          scaffold: { problem: 'A 4 kg block rests on a rough horizontal floor of a railway carriage.',
            steps: [
            { text: 'Identify given: m = 4 kg, μ_s = 0.3, a_carriage = 2.5 m/s², g = 10 m/s². Find: does block slide? If yes, a_block_ground.' },
            { text: 'In the carriage frame (non-inertial), block experiences pseudo force ma_carriage backward.' },
            { text: 'Pseudo force magnitude = m × a_carriage = 4 × 2.5 = 10 N. Since 10 N < 12 N, static friction can provide 10 N to keep.' },
            { text: 'In ground frame (inertial), block accelerates with carriage at 2.5 m/s².' },
            { text: 'Answer: Block does not slide. Its acceleration relative to ground is 2.5 m/s² forward.', faded: true, blankAnswer: 'Block does not slide. Acceleration relative to ground = 2.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_010', title: 'Laws of Friction: Coefficient of Friction',
          scaffold: { problem: 'A 4 kg block rests on a rough horizontal floor (μ_s = 0.3, μ_k = 0.2). A horizontal force of 10 N is applied. (a) Does the block move?',
            steps: [
            { text: 'Calculate normal force N = mg = 4 kg × 10 m/s² = 40 N.' },
            { text: 'Find maximum static friction f_s_max = μ_s N = 0.3 × 40 N = 12 N.' },
            { text: 'Compare applied force (10 N) with f_s_max (12 N). Since 10 N < 12 N, block does not move.' },
            { text: 'For 15 N applied force: 15 N > 12 N, so block moves. Kinetic friction f_k = μ_k N = 0.2 × 40 N = 8 N.' },
            { text: 'Net force = 15 N - 8 N = 7 N. Acceleration a = F_net/m = 7 N / 4 kg = 1.75 m/s².', faded: true, blankAnswer: '(a) No, block remains at rest; static friction = 10 N. (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_011', title: 'Rolling Friction and Lubrication',
          scaffold: { problem: 'A solid steel sphere of mass 5 kg rolls without slipping on a horizontal steel surface at constant velocity.',
            steps: [
            { text: 'Identify given quantities: m = 5 kg, μᵣ = 0.0015, g = 9.8 m/s², constant velocity ⇒ acceleration a = 0.' },
            { text: 'Determine the normal force N. Since the surface is horizontal and no vertical acceleration, N = mg = 5 × 9.8 = 49 N.' },
            { text: 'Calculate rolling friction force fᵣ = μᵣ N = 0.0015 × 49 = 0.0735 N.' },
            { text: 'Apply Newton\'s first law horizontally. For constant velocity, net force = 0.' },
            { text: 'Check reasonableness: 0.0735 N is very small (≈ 7.5 gf), consistent with rolling friction being much smaller than.', faded: true, blankAnswer: '0.0735 N (or 7.35 × 10⁻² N) in the direction of motion.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_012', title: 'Circular Motion: Dynamics',
          scaffold: { problem: 'A 1200 kg car travels at 25 m/s on a flat circular track of radius 80 m.',
            steps: [
            { text: 'Identify given quantities: \\(m = 1200\\ \\text{kg}\\), \\(v = 25\\ \\text{m/s}\\), \\(R = 80\\ \\text{m}\\), \\(\\mu_s = 0.7\\), \\(g.' },
            { text: 'Use the formula for centripetal force: \\(F_c = \\frac{m v^2}{R}\\). Check units: kg·(m/s)²/m = kg·m/s² = N.' },
            { text: 'Substitute values: \\(F_c = \\frac{1200 \\times (25)^2}{80} = \\frac{1200 \\times 625}{80} = \\frac{750000}{80} = 9375\\.' },
            { text: 'Compute maximum static friction: \\(f_{s,\\max} = \\mu_s m g = 0.7 \\times 1200 \\times 10 = 8400\\ \\text{N}\\).' },
            { text: 'Compare: \\(F_c = 9375\\ \\text{N} > f_{s,\\max} = 8400\\ \\text{N}\\).', faded: true, blankAnswer: 'The car will skid. The required centripetal force is 9375.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mechanics debate, a student defends Aristotle: \'A car cruising at 60 km/h clearly needs the engine\'s forward force to keep moving — without it, motion dies. Inertia is just the force that resists stopping.\'',
            decisions: [{ prompt: 'What did Galileo and Newton actually establish?', options: [
                { text: 'Expose the hidden balancing: the engine force doesn\'t sustain motion — it cancels friction and drag, leaving F_net = 0, which is why velocity is constant. Galileo\'s incline argument showed that removing friction lets motion continue forever. And inertia isn\'t a force at all — it\'s mass\'s resistance to CHANGE in velocity, the reason a net force is needed to accelerate, not to keep going.', outcome: 'The debate resolves: uniform motion and rest are the same state (zero acceleration); the car proves Aristotle wrong precisely because its forces balance.' },
                { text: 'Side with Aristotle — remove the engine and the car stops, so force sustains motion.', outcome: 'What stops the car is friction, not absence of a \'mover\': on frictionless ice the puck glides on — Galileo\'s whole point.', reveals: 'force-needed-to-sustain-motion' },
                { text: 'Accept \'inertia is a force\' — something must push back when motion changes.', outcome: 'Inertia is a property, not an agent: \'force of inertia\' is a category error — mass resists acceleration; no pushing force exists.', reveals: 'inertia-is-a-force' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'A car cruising at constant 60 has engine thrust exactly balancing drag — net force zero, motion sustained; force changes motion, it doesn\'t keep it.',
            decisions: [{ prompt: 'What comes next? Laws of Motion · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Laws of Motion · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_007', difficulty: 'standard',
          question: 'Equilibrium of a particle is the state in which the vector sum of all external.',
          hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
          misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs.',
          parts: [
                { id: 'a', prompt: 'A student argues: "A book lying on a table is in equilibrium because the weight **mg** and the normal reaction **R** are an action-reaction pair, so they.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body', 'gravity and normal force are action-reaction, so they cancel'],
                  hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'b', prompt: 'A 5 kg mass is suspended from a ceiling by a light string. A horizontal force **F** is applied to the mass so that the string makes an angle of 30° with the.', answer: '**Given:** m = 5 kg, θ = 30°, g = 10 m/s² → weight W = mg = 50 N downward',
                  options: ['**Given:** m = 5 kg, θ = 30°, g = 10 m/s² → weight W = mg = 50 N downward', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body', 'gravity and normal force are action-reaction, so they cancel'],
                  hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'c', prompt: 'Two identical smooth spheres of weight W each are placed inside a smooth hollow cylinder of diameter D such that they touch each other and the cylinder wall.', answer: 'Consider the **upper sphere** as the system',
                  options: ['Consider the **upper sphere** as the system', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body', 'gravity and normal force are action-reaction, so they cancel'],
                  hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' }
          ],
            remediations: { 'equilibrium-means-no-forces-act': { steps: ['If the student holds this misconception: 1.', '**Revisit Newton\'s First Law** (c11_phy_cbse_04_002): Ask "If I push a box with 10 N right and friction pushes 10.', 'What is the net force?" — forces exist, net force is zero.', '**Revisit Newton\'s Third Law** (c11_phy_cbse_04_004): Draw two separate free-body diagrams — one for the book (showing.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs.',
          parts: [
                { id: 'a', prompt: 'A particle is acted upon by four forces in a plane: **F₁** = 10 N at 0°, **F₂** = 10 N at 90°, **F₃** = 10 N at 180°, **F₄** = 10 N at 270°.', answer: 'The claim is **true for this specific set**',
                  options: ['The claim is **true for this specific set**', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body', 'gravity and normal force are action-reaction, so they cancel'],
                  hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' },
                { id: 'b', prompt: 'Design a simple experiment using a force table (or a circular board with pulleys at the edge and strings tied to a central ring) to verify the triangle law.', answer: 'the measurable quantities, (',
                  options: ['the measurable quantities, (', 'measure angles and see if they add to 360°', 'equilibrium means no forces act on the particle', 'action-reaction pairs cancel to produce equilibrium on a single body'],
                  hint: 'If stuck, review c11_phy_cbse_04_002 (First Law) for the physical meaning of ΣF = 0, and.',
                  misconception: 'Students often believe that **"equilibrium means no forces act on the particle"** or that **"action-reaction pairs cancel to produce.' }
          ],
            remediations: { 'equilibrium-means-no-forces-act': { steps: ['If the student holds this misconception: 1.', '**Revisit Newton\'s First Law** (c11_phy_cbse_04_002): Ask "If I push a box with 10 N right and friction pushes 10.', 'What is the net force?" — forces exist, net force is zero.', '**Revisit Newton\'s Third Law** (c11_phy_cbse_04_004): Draw two separate free-body diagrams — one for the book (showing.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_008', difficulty: 'standard',
          question: 'Common forces in mechanics are the fundamental contact and non-contact forces.',
          hint: 'Review c11_phy_cbse_04_007 (Equilibrium of a Particle) for free-body diagram technique.',
          misconception: 'Students believe friction always opposes motion. They incorrectly draw friction opposite to velocity in all cases.',
          parts: [
                { id: 'a', prompt: 'A block rests on an inclined plane at angle θ. The coefficient of static friction is μs.', answer: 'Weight mg resolves into mg sin θ down the plane and mg cos θ perpendicular',
                  options: ['Weight mg resolves into mg sin θ down the plane and mg cos θ perpendicular', 'heavier blocks have more friction so they don\'t slide', 'opposes relative motion between surfaces', 'opposes absolute motion of the body'],
                  hint: 'Review c11_phy_cbse_04_007 (Equilibrium of a Particle) for free-body diagram technique and.',
                  misconception: 'Students believe friction always opposes motion. They incorrectly draw friction opposite to velocity in all cases.' },
                { id: 'b', prompt: 'A 5 kg block is pulled horizontally by a force of 30 N on a rough surface with μk = 0.2. Find the acceleration of the block. Take g = 10 m/s².', answer: 'Given: m = 5 kg, F = 30 N, μk = 0.2, g = 10 m/s²',
                  options: ['Given: m = 5 kg, F = 30 N, μk = 0.2, g = 10 m/s²', 'opposes relative motion between surfaces', 'opposes absolute motion of the body', 'friction always opposes motion'],
                  hint: 'Review c11_phy_cbse_04_007 (Equilibrium of a Particle) for free-body diagram technique and.',
                  misconception: 'Students believe friction always opposes motion. They incorrectly draw friction opposite to velocity in all cases.' },
                { id: 'c', prompt: 'Two blocks of masses 2 kg and 3 kg are connected by a light string over a frictionless pulley.', answer: 'The 2 kg block accelerates downward, so net force on it is downward: 2g - T = 2a',
                  options: ['The 2 kg block accelerates downward, so net force on it is downward: 2g - T = 2a', 'opposes relative motion between surfaces', 'opposes absolute motion of the body', 'friction always opposes motion'],
                  hint: 'Review c11_phy_cbse_04_007 (Equilibrium of a Particle) for free-body diagram technique and.',
                  misconception: 'Students believe friction always opposes motion. They incorrectly draw friction opposite to velocity in all cases.' }
          ],
            remediations: { 'friction-always-opposes-motion': { steps: ['Place a coin on a book cover. Accelerate the book horizontally.', 'Walk slowly, feeling the ground push your foot forward.', 'Re-state the definition: "Friction opposes *relative* motion (or tendency) between the two surfaces in contact."', 'Practice drawing free-body diagrams for block-on-truck and walking person, explicitly labeling the two surfaces and the.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_009', difficulty: 'standard',
          question: 'Friction is a contact force that opposes the relative motion or tendency.',
          hint: 'If stuck, review c11_phy_cbse_04_003 (Newton\'s second law) for F=ma application and.',
          misconception: 'Students believe that friction always opposes motion. They incorrectly draw friction opposite to the block\'s velocity.',
          parts: [
                { id: 'a', prompt: 'A block of mass 2 kg rests on a horizontal table. The coefficient of static friction between the block and table is 0.4.', answer: 'Maximum static friction f_s(max) = μ_s N = μ_s mg = 0.4 × 2 kg × 10 m/s² = 8 N',
                  options: ['Maximum static friction f_s(max) = μ_s N = μ_s mg = 0.4 × 2 kg × 10 m/s² = 8 N', 'friction always opposes motion'],
                  hint: 'If stuck, review c11_phy_cbse_04_003 (Newton\'s second law) for F=ma application and.',
                  misconception: 'Students believe that friction always opposes motion. They incorrectly draw friction opposite to the block\'s velocity in all cases.' },
                { id: 'b', prompt: 'A 5 kg block is pulled horizontally by a force of 30 N on a rough surface with μ_k = 0.2. Calculate the acceleration of the block. (Take g = 10 m/s²)', answer: 'Step 1: Weight = mg = 5 × 10 = 50 N',
                  options: ['Step 1: Weight = mg = 5 × 10 = 50 N', 'friction always opposes motion'],
                  hint: 'If stuck, review c11_phy_cbse_04_003 (Newton\'s second law) for F=ma application and.',
                  misconception: 'Students believe that friction always opposes motion. They incorrectly draw friction opposite to the block\'s velocity in all cases.' },
                { id: 'c', prompt: 'A block slides down an inclined plane at constant velocity. The angle of inclination is θ.', answer: 'For constant velocity: mg sinθ = f_k = μ_k mg cosθ → μ_k = tanθ',
                  options: ['For constant velocity: mg sinθ = f_k = μ_k mg cosθ → μ_k = tanθ', 'it slides slower', 'friction always opposes motion'],
                  hint: 'If stuck, review c11_phy_cbse_04_003 (Newton\'s second law) for F=ma application and.',
                  misconception: 'Students believe that friction always opposes motion. They incorrectly draw friction opposite to the block\'s velocity in all cases.' }
          ],
            remediations: { 'friction-always-opposes-motion': { steps: ['Place a coin on a textbook cover. Accelerate the textbook forward horizontally.', 'Draw free-body diagram of coin: only horizontal force is static friction forward.', 'Generalize: friction opposes RELATIVE motion between surfaces, not absolute motion.', 'Practice 3 problems: (a) block on accelerating conveyor belt, (b) block pressed against vertical wall, (c) two blocks.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_010', difficulty: 'standard',
          question: 'The coefficient of friction (μ) is a dimensionless scalar quantity that.',
          hint: 'If stuck, review free-body diagrams on inclined planes (c11_phy_cbse_04_008) and the.',
          misconception: 'Students often believe that the friction force is always equal to μN (i.e., f = μN) for both static and kinetic cases.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of the coefficient of static friction and write the mathematical condition that static friction satisfies before motion begins.', answer: 'The coefficient of static friction μ_s is dimensionless (no SI unit)',
                  options: ['The coefficient of static friction μ_s is dimensionless (no SI unit)', 'the friction force is always equal to μN (i'],
                  hint: 'If stuck, review free-body diagrams on inclined planes (c11_phy_cbse_04_008) and the definition.',
                  misconception: 'Students often believe that the friction force is always equal to μN (i.e., f = μN) for both static and kinetic cases.' },
                { id: 'b', prompt: 'A block of mass 5 kg rests on a rough horizontal table. The coefficient of static friction is 0.4. A horizontal force of 15 N is applied.', answer: 'Maximum static friction f_s_max = μ_s N = 0.4 × (5×10) = 20 N',
                  options: ['Maximum static friction f_s_max = μ_s N = 0.4 × (5×10) = 20 N', 'the friction force is always equal to μN (i'],
                  hint: 'If stuck, review free-body diagrams on inclined planes (c11_phy_cbse_04_008) and the definition.',
                  misconception: 'Students often believe that the friction force is always equal to μN (i.e., f = μN) for both static and kinetic cases.' },
                { id: 'c', prompt: 'A 10 kg block is placed on a rough inclined plane with θ = 30°. The coefficient of static friction is 0.5. Determine whether the block will slide down.', answer: 'Component down plane = mg sin30° = 10×10×0.5 = 50 N',
                  options: ['Component down plane = mg sin30° = 10×10×0.5 = 50 N', 'the friction force is always equal to μN (i'],
                  hint: 'If stuck, review free-body diagrams on inclined planes (c11_phy_cbse_04_008) and the definition.',
                  misconception: 'Students often believe that the friction force is always equal to μN (i.e., f = μN) for both static and kinetic cases.' }
          ],
            remediations: { 'the-friction-force-is-always': { steps: ['Have the student perform a "push-and-observe" activity: place a spring balance attached to a block on a table.', 'Pull horizontally with gradually increasing force while recording the spring balance reading and whether the block.', 'The graph will show a linear increase (f = F) up to a maximum (μ_s N), then a drop to a lower constant value (μ_k N).', 'This visualizes the self-adjusting nature of static friction and the transition to kinetic friction.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_011', difficulty: 'standard',
          question: 'Rolling friction is the resistive force that opposes the motion of a body (such.',
          hint: 'If stuck, review c11_phy_cbse_04_009 (Friction: Static and Kinetic) and.',
          misconception: 'Students often believe that rolling friction is a type of static friction because the contact point is instantaneously.',
          parts: [
                { id: 'a', prompt: 'A cylinder rolls without slipping on a horizontal surface at constant speed.', answer: 'Although the contact point has zero instantaneous velocity, the surfaces deform',
                  options: ['Although the contact point has zero instantaneous velocity, the surfaces deform', 'no force is needed'],
                  hint: 'If stuck, review c11_phy_cbse_04_009 (Friction: Static and Kinetic) and c11_phy_cbse_04_010 (Laws.',
                  misconception: 'Students often believe that rolling friction is a type of static friction because the contact point is instantaneously at rest.' },
                { id: 'b', prompt: 'Compare the mechanisms by which (a) lubricating oil and (b) ball bearings reduce friction in a rotating shaft.', answer: 'lubricating oil and (',
                  options: ['lubricating oil and (', 'oil is always better'],
                  hint: 'If stuck, review c11_phy_cbse_04_009 (Friction: Static and Kinetic) and c11_phy_cbse_04_010 (Laws.',
                  misconception: 'Students often believe that rolling friction is a type of static friction because the contact point is instantaneously at rest.' }
          ],
            remediations: { 'rolling-friction-is-a-type': { steps: ['Revisit c11_phy_cbse_04_009 (Friction: Static and Kinetic) to recall that static friction opposes *impending* relative.', 'Rolling friction opposes rolling motion, which involves no relative motion at the contact point in the ideal case.', 'Perform the "book vs pencil on incline" experiment from Diagnostic Question 6.', 'The pencil rolls at a much smaller angle, proving a resistive force exists even without sliding.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_012', difficulty: 'standard',
          question: 'Centripetal force is the net force directed toward the center of a circular.',
          hint: 'If stuck, review Newton\'s second law (c11_phy_cbse_04_003) and uniform circular motion.',
          misconception: 'Students often believe that centripetal force is an additional force that appears in the free-body diagram alongside.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Centripetal force is the net force directed toward the center of a circular path that',
                  options: ['Centripetal force is the net force directed toward the center of a circular path that', 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force is', 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its state of', 'Newton\'s Second Law states that the rate of change of linear momentum of a body is'],
                  hint: 'If stuck, review Newton\'s second law (c11_phy_cbse_04_003) and uniform circular motion kinematics.',
                  misconception: 'Students often believe that centripetal force is an additional force that appears in the free-body diagram alongside tension, friction.' }
          ],
            remediations: { 'centripetal-force-is-an-additional': { steps: ['To correct this, have the student draw free-body diagrams for three cases: (1) a stone whirled in a horizontal circle.', 'In each case, list only the real forces (tension, weight, normal, friction).', 'Then ask: "Which force or component of a force points toward the center?" That component **is** the centripetal force.', 'Emphasize that centripetal force is a role, not a new force.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
