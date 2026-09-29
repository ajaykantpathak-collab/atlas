import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch05_p1: SimDef = {
    id: 'v3_c11_phy_ch05_p1',
    title: 'Work, Energy and Power',
    subtitle: 'The physics of getting things done — and why holding a heavy bag still isn\'t \'work\' at all.',
    classLevel: 11, subject: 'physics', topic: 'Work, Energy and Power',
    chapters: ['c11_phy_ch05'],
    nodeIds: ['c11_phy_cbse_05_001', 'c11_phy_cbse_05_002', 'c11_phy_cbse_05_003', 'c11_phy_cbse_05_004', 'c11_phy_cbse_05_005', 'c11_phy_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer rating a roller coaster', intro: 'Your coaster car must clear the second hill using only the energy from the first drop. Your job: check the energy math before anyone rides.', goal: 'Track energy as it converts — kinetic to potential and back — and compute real work and power.' },
    discovery: {
        question: 'You stand still holding a 10 kg bag for an hour. Exhausted — but a physicist says you did ZERO work on the bag. How?',
        options: ['No displacement = no work, however tired you feel', 'The bag was too light to count', 'You did work — the physicist is wrong', 'Only machines do work'],
        answer: 'No displacement = no work, however tired you feel',
        hook: 'Physics defines work as force × displacement — your muscles burned energy fighting your own cells, not moving the bag.',
    },
    teaching: [
        { title: 'Work Done by a Force: Definition', text: 'Work done by a constant force is defined as the scalar product of the force vector and the displacement vector of the point of application of the force.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_05_001', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the energy track: drop the car from different heights and measure speed at the bottom — verify mgh really does become ½mv².',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_001', title: 'Work Done by a Force: Definition',
          scaffold: { problem: 'A woman pushes a shopping cart with a force of 35 N directed at 25° below the horizontal.',
            steps: [
            { text: 'Identify given quantities: \\( F = 35 \\, \\text{N} \\), \\( \\theta = 25^\\circ \\) (angle below horizontal, so between force.' },
            { text: 'Formula: \\( W = F d \\cos\\theta \\). Check units: N × m × (dimensionless) = N·m = J. ✓' },
            { text: 'Substitute: \\( W = (35 \\, \\text{N}) \\times (12 \\, \\text{m}) \\times \\cos 25^\\circ \\).' },
            { text: 'Compute: \\( \\cos 25^\\circ \\approx 0.9063 \\). \\( W = 35 \\times 12 \\times 0.9063 = 380.646 \\, \\text{J} \\).' },
            { text: 'Verify: Force has a forward component, so work should be positive. 380 J is reasonable for a 35 N push over 12 m.', faded: true, blankAnswer: '380 J (or 3.8 × 10² J)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_002', title: 'Work Done: Variable Force Using Calculus',
          scaffold: { problem: 'A force \\( F(x) = (3x^2 - 4x + 5) \\) N acts on a particle moving along the x-axis.',
            steps: [
            { text: 'Identify given: \\( F(x) = 3x^2 - 4x + 5 \\) N, \\( x_i = 1 \\) m, \\( x_f = 4 \\) m. Find: \\( W \\) in joules.' },
            { text: 'Write the work integral: \\( W = \\int_{1}^{4} (3x^2 - 4x + 5) \\, dx \\).' },
            { text: 'Find antiderivative term-by-term: \\( \\int 3x^2 \\, dx = x^3 \\), \\( \\int -4x \\, dx = -2x^2 \\), \\( \\int 5 \\, dx = 5x \\).' },
            { text: 'Evaluate definite integral: \\( W = [x^3 - 2x^2 + 5x]_{1}^{4} = (64 - 32 + 20) - (1 - 2 + 5) = 52 - 4 = 48 \\) J.' },
            { text: 'Verify: The force is positive throughout [1, 4] (check: \\( F(1)=4 \\), \\( F(4)=37 \\)), so work should be positive.', faded: true, blankAnswer: '48 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_003', title: 'Work Done by Spring Force',
          scaffold: { problem: 'A spring-loaded toy gun has a spring constant \\(k = 800 \\text{ N/m}\\).',
            steps: [
            { text: 'Identify given quantities: \\(k = 800 \\text{ N/m}\\), \\(x_i = -0.050 \\text{ m}\\) (compression is negative displacement).' },
            { text: 'Select formula: \\(W_s = \\frac{1}{2}k(x_i^2 - x_f^2)\\). Check units: \\(\\text{N/m} \\times \\text{m}^2 = \\text{N·m}.' },
            { text: 'Substitute with units: \\(W_s = \\frac{1}{2}(800 \\text{ N/m})[(-0.050 \\text{ m})^2 - (0 \\text{ m})^2]\\).' },
            { text: 'Compute: \\((-0.050)^2 = 0.0025 \\text{ m}^2\\). \\(W_s = 400 \\times 0.0025 = 1.0 \\text{ J}\\).' },
            { text: 'Verify: The spring force and displacement are both in the positive direction during expansion, so work should.', faded: true, blankAnswer: '\\(+1.0 \\text{ J}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_004', title: 'Kinetic Energy: Definition and Formula',
          scaffold: { problem: 'A 50 g bullet is fired from a rifle with a muzzle velocity of 800 m/s. Calculate its kinetic energy in joules and in kilojoules.',
            steps: [
            { text: 'Identify given: m = 50 g = 0.050 kg, v_i = 800 m/s, v_f = 400 m/s. Find K_i, K_f, and W_resistive.' },
            { text: 'Use K = ½ m v². Check units: kg × (m/s)² = kg·m²/s² = J.' },
            { text: 'K_i = ½ × 0.050 × (800)² = 0.025 × 640,000 = 16,000 J = 16.0 kJ.' },
            { text: 'K_f = ½ × 0.050 × (400)² = 0.025 × 160,000 = 4,000 J = 4.0 kJ.' },
            { text: 'Work-energy theorem: W_net = ΔK = K_f - K_i = 4,000 - 16,000 = -12,000 J = -12 kJ.', faded: true, blankAnswer: 'Initial K = 16.0 kJ, Final K = 4.0 kJ, Work done by wood.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_005', title: 'Work-Energy Theorem: Derivation',
          scaffold: { problem: 'A 2000 kg truck accelerates uniformly from 5 m/s to 15 m/s over a distance of 100 m on a level road.',
            steps: [
            { text: 'Identify given: \\(m = 2000 \\text{ kg}\\), \\(v_i = 5 \\text{ m/s}\\), \\(v_f = 15 \\text{ m/s}\\), \\(d = 100 \\text{ m}\\).' },
            { text: 'Use work-energy theorem: \\(W_{\\text{net}} = \\Delta K = \\frac{1}{2}m(v_f^2 - v_i^2)\\).' },
            { text: 'Compute \\(\\Delta K = 0.5 \\times 2000 \\times (15^2 - 5^2) = 1000 \\times (225 - 25) = 1000 \\times 200 = 200,000 \\text{.' },
            { text: 'Net work also equals \\(F_{\\text{net}} \\cdot d\\) (force parallel to displacement).' },
            { text: 'Net force = engine force - resistive force (since they oppose).' },
            { text: 'Check units: work in J (N·m), forces in N, speeds in m/s. All consistent.', faded: true, blankAnswer: '(a) \\(W_{\\text{net}} = 2.00 \\times 10^5 \\text{ J}\\) (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_006', title: 'Work-Energy Theorem for Variable Force',
          scaffold: { problem: 'A 200 g toy car is launched from a horizontal spring (k = 50 N/m) compressed by 10 cm on a smooth floor.',
            steps: [
            { text: 'Identify given: m = 200 g = 0.2 kg, k = 50 N/m, initial compression x_i = 10 cm = 0.1 m, final position x_f = 0.' },
            { text: 'Net force is the spring force F(x) = -kx. Work done by spring from x_i to 0: W = ∫_{0.1}^{0} (-kx) dx = -k.' },
            { text: 'Apply work-energy theorem: ΔK = W. Final K = ½ m v_f² = 0.25 J.' },
            { text: 'Solve for v_f: v_f² = (2 × 0.25) / 0.2 = 0.5 / 0.2 = 2.5 m²/s². v_f = √2.5 ≈ 1.58 m/s.' },
            { text: 'Check units: N/m × m² = N·m = J; J / kg = m²/s²; sqrt gives m/s. Speed is reasonable for a toy car.', faded: true, blankAnswer: '1.58 m/s' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'Laws of motion let us design safer cars — crumple zones that sacrifice the car to save the passenger. A cheap car without them costs half as much; a family choosing it may be choosing between money and physics.',
            decisions: [{ prompt: 'Should safety features be mandatory even if they raise prices?', options: [
                { text: 'Yes — physics doesn\'t care about your budget', outcome: 'The regulation argument — momentum at 60 km/h is non-negotiable; but mandates price out the families who could only afford the cheap car.' },
                { text: 'No — let buyers choose their trade-off', outcome: 'The autonomy argument; it assumes buyers fully understand the physics of what they\'re declining.' },
                { text: 'Mandate the minimum, subsidise the rest', outcome: 'The design answer — a safety floor for everyone, help for those who can\'t reach it.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A coolie hauls a suitcase across the platform and a weightlifter holds a barbell overhead — a classmate claims both \'do lots of work since the forces are big.\' For a spring stretched with F = 2x over 3 m, he computes work as 6 × 3 = 18 J.',
            decisions: [{ prompt: 'What does the work definition actually compute?', options: [
                { text: 'Apply the dot product: W = F·d·cosθ — the coolie\'s upward force is perpendicular to horizontal displacement, so W = 0 despite the effort; the weightlifter\'s displacement is zero, also W = 0. And for a variable force you integrate: ∫₀³ 2x dx = 9 J — using the endpoint force double-counts what the growing force only reached at the end.', outcome: 'Effort stops masquerading as work: only the force component along displacement counts, and a changing force sums slice by slice — the area under the F–x curve.' },
                { text: 'Count both as work — sweating and straining are proof that work is being done.', outcome: 'Physiology isn\'t physics: without a force component along displacement, energy isn\'t transferred to the object — zero work however tired the worker.', reveals: 'effort-equals-work' },
                { text: 'Keep 18 J — final force times distance is a fair estimate for the spring.', outcome: 'The force was 2x throughout, not 6 the whole way: final-force × distance overestimates — the integral (area under the line) gives 9 J.', reveals: 'final-force-times-distance' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Energy is the universe\'s currency — it never appears or disappears, only changes hands. Roller coasters, dams and your breakfast all run on the same ledger.',
            decisions: [{ prompt: 'What comes next? Work, Energy and Power · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Work, Energy and Power · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_001', difficulty: 'standard',
          question: 'Work done by a constant force is defined as the scalar product of the force.',
          hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane).',
          misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the.',
          parts: [
                { id: 'a', prompt: 'A porter carries a 20 kg load on his head and walks 50 m on a level road at constant speed. What is the work done by the porter\'s upward force on the load?', answer: 'The work done is 0 J',
                  options: ['The work done is 0 J', 'work is done whenever a force is applied', 'force and displacement are parallel'],
                  hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10.',
                  misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.' },
                { id: 'b', prompt: 'A constant force \\( \\vec{F} = (3\\hat{i} + 4\\hat{j}) \\) N acts on a particle that undergoes a displacement \\( \\vec{d} = (2\\hat{i} - 1\\hat{j}) \\) m.', answer: '\\( W = \\vec{F} \\cdot \\vec{d} = (3)(2) + (4)(-1) = 6 - 4 = 2 \\) J',
                  options: ['\\( W = \\vec{F} \\cdot \\vec{d} = (3)(2) + (4)(-1) = 6 - 4 = 2 \\) J', 'work is done whenever a force is applied'],
                  hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10.',
                  misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.' },
                { id: 'c', prompt: 'A satellite orbits Earth in a perfectly circular orbit. The gravitational force on the satellite is always directed radially inward.', answer: 'Zero',
                  options: ['Zero', 'negative because gravity pulls inward', 'work is done whenever a force is applied'],
                  hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10.',
                  misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.' }
          ],
            remediations: { 'work-is-done-whenever-a': { steps: ['Revisit the definition: "No displacement, no work." Demonstrate by pushing a heavy table that doesn\'t move — ask: "Did.', 'Use a force sensor and motion sensor (or spring balance and meter scale) to pull a cart at 0°, 45°, 90° for the same.', 'Record force and compute \\( W = F d \\cos\\theta \\).', 'Plot \\( W \\) vs \\( \\theta \\) — the cosine dependence becomes visible.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the.',
          parts: [
                { id: 'a', prompt: 'A student argues: "When I push a wall and it doesn\'t move, I am applying a large force, so I am doing a lot of work." Evaluate this statement using the physics.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'work is done whenever a force is applied'],
                  hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10.',
                  misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using a spring balance, a wooden block, and a protractor to show that work done by a force depends on the angle between.', answer: 'Procedure: (1) Attach spring balance to block on a smooth table',
                  options: ['Procedure: (1) Attach spring balance to block on a smooth table', 'work is done whenever a force is applied'],
                  hint: 'Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10.',
                  misconception: 'Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.' }
          ],
            remediations: { 'work-is-done-whenever-a': { steps: ['Revisit the definition: "No displacement, no work." Demonstrate by pushing a heavy table that doesn\'t move — ask: "Did.', 'Use a force sensor and motion sensor (or spring balance and meter scale) to pull a cart at 0°, 45°, 90° for the same.', 'Record force and compute \\( W = F d \\cos\\theta \\).', 'Plot \\( W \\) vs \\( \\theta \\) — the cosine dependence becomes visible.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_002', difficulty: 'standard',
          question: 'Work done by a variable force is the definite integral of the force component.',
          hint: 'Review definite integration of polynomials from Class 11 Maths (Chapter 7: Integrals) and.',
          misconception: 'Students often treat variable force problems by plugging the *final* force value into \\( W = F \\cdot d \\), ignoring.',
          parts: [
                { id: 'a', prompt: 'A force \\( F(x) = 3x^2 \\) N acts on a block moving along the x-axis from \\( x = 1 \\) m to \\( x = 3 \\) m.', answer: 'We cannot use \\( F(3) \\times \\Delta x \\)',
                  options: ['We cannot use \\( F(3) \\times \\Delta x \\)', 'the integral gives average force times distance'],
                  hint: 'Review definite integration of polynomials from Class 11 Maths (Chapter 7: Integrals) and the.',
                  misconception: 'Students often treat variable force problems by plugging the *final* force value into \\( W = F \\cdot d \\), ignoring that force changes.' }
          ],
            remediations: { 'students-often-treat-variable-force': { steps: ['Revisit the Riemann sum concept: divide displacement into 5-10 small intervals \\( \\Delta x \\), compute \\( F(x_i) \\Delta.', 'Plot \\( F(x) \\) vs \\( x \\) on graph paper; shade the area under the curve and count squares to visually confirm the.', 'Practice 3-4 problems where the force function is simple (linear, quadratic) and compute both the "wrong way" (final.', 'Review Class 11 Maths integration techniques (power rule, definite integrals) if the calculus step itself is the.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_003', difficulty: 'standard',
          question: 'The work done by a spring force is the negative of the change in elastic.',
          hint: 'If stuck, revisit c11_phy_cbse_05_002 (Variable Force Using Calculus) for the integration.',
          misconception: 'Students believe the work done by a spring force is always negative because "springs oppose motion." They fail.',
          parts: [
                { id: 'a', prompt: 'A spring with \\(k = 200 \\text{ N/m}\\) is compressed from \\(x = 0\\) to \\(x = -0.1 \\text{ m}\\). Is the work done by the spring force positive, negative, or zero?', answer: 'The work done by the spring force is NEGATIVE',
                  options: ['The work done by the spring force is NEGATIVE', 'positive', 'compression stores energy so work must be positive', 'springs oppose motion'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_002 (Variable Force Using Calculus) for the integration method.',
                  misconception: 'Students believe the work done by a spring force is always negative because "springs oppose motion." They fail to distinguish between.' },
                { id: 'b', prompt: 'A 0.5 kg block is attached to a spring (\\(k = 400 \\text{ N/m}\\)) on a frictionless horizontal surface.', answer: 'Given: \\(k = 400 \\text{ N/m}\\), \\(x_i = +0.15 \\text{ m}\\), \\(x_f = 0 \\text{ m}\\)',
                  options: ['Given: \\(k = 400 \\text{ N/m}\\), \\(x_i = +0.15 \\text{ m}\\), \\(x_f = 0 \\text{ m}\\)', 'springs oppose motion', 'the work done by a spring force is always negative'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_002 (Variable Force Using Calculus) for the integration method.',
                  misconception: 'Students believe the work done by a spring force is always negative because "springs oppose motion." They fail to distinguish between.' },
                { id: 'c', prompt: 'The force-displacement graph for a spring is a straight line passing through (0,0) and (0.2 m, -10 N).', answer: 'Graph: Slope = \\(-10 / 0.2 = -50 \\text{ N/m} = -k\\), so \\(k = 50 \\text{ N/m}\\)',
                  options: ['Graph: Slope = \\(-10 / 0.2 = -50 \\text{ N/m} = -k\\), so \\(k = 50 \\text{ N/m}\\)', 'springs oppose motion', 'the work done by a spring force is always negative'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_002 (Variable Force Using Calculus) for the integration method.',
                  misconception: 'Students believe the work done by a spring force is always negative because "springs oppose motion." They fail to distinguish between.' }
          ],
            remediations: { 'the-work-done-by-a': { steps: ['If a student insists spring work is always negative, guide them through this physical demonstration: (1) Hold a spring.', '(2) Pull the mass down 5 cm and release — ask "As the mass moves UP toward equilibrium, is the spring force UP or DOWN?', 'Is displacement UP or DOWN?', 'Same direction → positive work." (3) Then ask "As the mass continues UP past equilibrium to the top, what happens.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_004', difficulty: 'standard',
          question: 'Kinetic energy is the energy possessed by a body due to its motion, defined.',
          hint: 'If stuck, review c11_phy_cbse_05_001 (Work Done by a Force) and Class 9 kinematic.',
          misconception: 'Students often treat kinetic energy as a vector because it depends on velocity, which is a vector.',
          parts: [
                { id: 'a', prompt: 'Write the SI unit of kinetic energy and state whether it is a scalar or vector quantity.', answer: 'The SI unit of kinetic energy is joule (J)',
                  options: ['The SI unit of kinetic energy is joule (J)', 'newton', 'vector'],
                  hint: 'If stuck, review c11_phy_cbse_05_001 (Work Done by a Force) and Class 9 kinematic equations (v².',
                  misconception: 'Students often treat kinetic energy as a vector because it depends on velocity, which is a vector.' },
                { id: 'b', prompt: 'A truck of mass 2000 kg and a bicycle of mass 20 kg are both moving at 10 m/s. Which has more kinetic energy?', answer: 'The truck has more kinetic energy (100,000 J vs 1,000 J)',
                  options: ['The truck has more kinetic energy (100,000 J vs 1,000 J)', 'they are equal', 'the \\( \\frac{1}{2} \\) is arbitrary'],
                  hint: 'If stuck, review c11_phy_cbse_05_001 (Work Done by a Force) and Class 9 kinematic equations (v².',
                  misconception: 'Students often treat kinetic energy as a vector because it depends on velocity, which is a vector.' }
          ],
            remediations: { 'students-often-treat-kinetic-energy': { steps: ['Revisit the scalar product: show \\( \\vec{v} \\cdot \\vec{v} = v^2 \\) has no direction.', 'Use the work-energy theorem derivation: \\( W = \\int \\vec{F} \\cdot d\\vec{s} = \\int m \\frac{d\\vec{v}}{dt} \\cdot.', 'Emphasize the dot product at each step.', 'Practice numerical problems where velocity changes direction (e.g., rebound) and require \\( \\Delta K = K_f - K_i \\).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_005', difficulty: 'standard',
          question: 'The work-energy theorem states that the net work done by all forces acting on.',
          hint: 'Review the derivation of \\(v^2-u^2=2as\\) from \\(v = u+at\\) and \\(s.',
          misconception: 'Students often believe the work-energy theorem applies *only* when a single constant force acts, or they think the.',
          parts: [
                { id: 'a', prompt: 'A block slides down a rough inclined plane of angle \\(\\theta\\). The forces acting are gravity, normal, and friction.', answer: '\\(W_g + W_N + W_f = \\Delta K\\)',
                  options: ['\\(W_g + W_N + W_f = \\Delta K\\)', 'the theorem is \\(W = \\frac{1}{2}mv^2\\) (using only final speed)'],
                  hint: 'Review the derivation of \\(v^2-u^2=2as\\) from \\(v = u+at\\) and \\(s = ut+\\frac{1}{2}at^2\\), and.',
                  misconception: 'Students often believe the work-energy theorem applies *only* when a single constant force acts, or they think the theorem is \\(W.' }
          ],
            remediations: { 'the-work-energy-theorem-applies': { steps: ['If the student struggles, first have them re-derive \\(v^2 - u^2 = 2as\\) from the definitions of acceleration and.', 'Then, using a free-body diagram, identify all forces and compute each work as \\(W = Fd\\cos\\theta\\).', 'Sum the works *as scalars* to get \\(W_{\\text{net}}\\).', 'Compute \\(\\Delta K\\) from measured speeds.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_006', difficulty: 'standard',
          question: 'The work-energy theorem for a variable force states that the change in kinetic.',
          hint: 'Review the Riemann sum interpretation of work (c11_phy_cbse_05_002) and the derivation.',
          misconception: 'Students often believe the work-energy theorem for variable forces is a new, separate principle from the constant-force.',
          parts: [
                { id: 'a', prompt: 'A block moves along the x-axis under a force \\(F(x) = 3x^2\\) N from \\(x = 1\\) m to \\(x = 3\\) m.', answer: 'Force varies with \\(x\\), so \\(F\\) is not constant',
                  options: ['Force varies with \\(x\\), so \\(F\\) is not constant', 'use average force', 'average force'],
                  hint: 'Review the Riemann sum interpretation of work (c11_phy_cbse_05_002) and the derivation of \\(K.',
                  misconception: 'Students often believe the work-energy theorem for variable forces is a new, separate principle from the constant-force version.' }
          ],
            remediations: { 'the-work-energy-theorem-for': { steps: ['Have the student physically replicate the Riemann-sum process: draw a large \\(F(x)\\) vs.', '\\(x\\) graph on graph paper for a simple force (e.g., \\(F=2x\\)), shade rectangular strips of width 0.5 m, compute the.', 'Show the sums approach the integral value.', 'Then explicitly write \\(\\Delta K = \\sum F \\Delta x \\to \\int F dx\\) to connect the discrete approximation to the.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
