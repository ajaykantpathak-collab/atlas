import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch05_p3: SimDef = {
    id: 'v3_c11_phy_ch05_p3',
    title: 'Work, Energy and Power',
    subtitle: 'The physics of getting things done — and why holding a heavy bag still isn\'t \'work\' at all.',
    classLevel: 11, subject: 'physics', topic: 'Work, Energy and Power',
    chapters: ['c11_phy_ch05'],
    nodeIds: ['c11_phy_cbse_05_013', 'c11_phy_cbse_05_014', 'c11_phy_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer rating a roller coaster', intro: 'Your coaster car must clear the second hill using only the energy from the first drop. Your job: check the energy math before anyone rides.', goal: 'Track energy as it converts — kinetic to potential and back — and compute real work and power.' },
    discovery: {
        question: 'You stand still holding a 10 kg bag for an hour. Exhausted — but a physicist says you did ZERO work on the bag. How?',
        options: ['No displacement = no work, however tired you feel', 'The bag was too light to count', 'You did work — the physicist is wrong', 'Only machines do work'],
        answer: 'No displacement = no work, however tired you feel',
        hook: 'Physics defines work as force × displacement — your muscles burned energy fighting your own cells, not moving the bag.',
    },
    teaching: [
        { title: 'Collisions: Elastic and Inelastic', text: 'A collision is an isolated event where two or more bodies exert strong impulsive forces on each other for a very short time interval Δt, resulting in a change in their momenta.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_05_013', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the energy track: drop the car from different heights and measure speed at the bottom — verify mgh really does become ½mv².',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_013', title: 'Collisions: Elastic and Inelastic',
          scaffold: { problem: 'A 0.05 kg tennis ball moving horizontally at 30 m/s collides head-on with a 0.15 kg cricket ball moving towards it at 20 m/s.',
            steps: [
            { text: 'Identify given quantities: m₁ = 0.05 kg, v₁i = +30 m/s; m₂ = 0.15 kg, v₂i = -20 m/s (opposite direction); v₁f = -10 m/s.' },
            { text: 'Apply momentum conservation: m₁v₁i + m₂v₂i = m₁v₁f + m₂v₂f. Substitute: (0.05)(30) + (0.15)(-20) = (0.05)(-10).' },
            { text: 'Compute coefficient of restitution: e = (v₂f - v₁f)/(v₁i - v₂i) = (-6.67 - (-10))/(30 - (-20)) = 3.33/50 = 0.0666.' },
            { text: 'Calculate kinetic energy loss: Kᵢ = ½(0.05)(30)² + ½(0.15)(20)² = 22.5 + 30 = 52.5 J.' },
            { text: 'Verify: ΔK negative confirms inelastic. Momentum check: pᵢ = -1.5 kg·m/s, p_f = (0.05)(-10) + (0.15)(-6.67) = -0.5.', faded: true, blankAnswer: '(a) v₂f = -6.67 m/s (cricket ball continues in its original.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_014', title: 'Collisions in One Dimension',
          scaffold: { problem: 'A 100 g ball moving at 6 m/s collides head-on elastically with a 200 g ball moving at 2 m/s in the opposite direction.',
            steps: [
            { text: 'Identify given: m₁ = 0.1 kg, u₁ = +6 m/s; m₂ = 0.2 kg, u₂ = -2 m/s (opposite direction). Find v₁, v₂.' },
            { text: 'Use elastic collision formulas: v₁ = (m₁-m₂)/(m₁+m₂)u₁ + 2m₂/(m₁+m₂)u₂; v₂ = 2m₁/(m₁+m₂)u₁ + (m₂-m₁)/(m₁+m₂)u₂' },
            { text: 'Compute mass ratios: m₁+m₂ = 0.3 kg; m₁-m₂ = -0.1 kg; m₂-m₁ = 0.1 kg' },
            { text: 'Substitute: v₁ = (-0.1/0.3)×6 + (2×0.2/0.3)×(-2) = -2 - 2.667 = -4.667 m/s; v₂ = (2×0.1/0.3)×6 + (0.1/0.3)×(-2) = 4.' },
            { text: 'Verify: Initial momentum = 0.1×6 + 0.2×(-2) = 0.6 - 0.4 = 0.2 kg·m/s.', faded: true, blankAnswer: 'v₁ = -4.67 m/s (rebounds), v₂ = +3.33 m/s (continues.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_015', title: 'Collisions in Two Dimensions',
          scaffold: { problem: 'A 0.5 kg hockey puck moving at 10 m/s along the x-axis strikes an identical stationary puck on a frictionless ice rink.',
            steps: [
            { text: 'Identify given quantities: \\( m_1 = m_2 = 0.5 \\) kg, \\( v_{1i} = 10 \\) m/s, \\( \\theta_1 = 40^\\circ \\), elastic.' },
            { text: 'Apply the equal-mass elastic 2D result: \\( \\theta_1 + \\theta_2 = 90^\\circ \\) → \\( \\theta_2 = 50^\\circ \\).' },
            { text: 'Write x-momentum conservation: \\( m v_{1i} = m v_{1f} \\cos40^\\circ + m v_{2f} \\cos50^\\circ \\).' },
            { text: 'Write y-momentum conservation: \\( 0 = m v_{1f} \\sin40^\\circ - m v_{2f} \\sin50^\\circ \\) → \\( v_{1f}(0.643).' },
            { text: 'Substitute Equation 2 into Equation 1: \\( 10 = (1.191 v_{2f})(0.766) + v_{2f}(0.643) = 0.912 v_{2f} + 0.643 v_{2f}.' },
            { text: 'Find \\( v_{1f} = 1.191 \\times 6.43 = 7.66 \\) m/s.' },
            { text: 'Verify energy conservation: Initial KE = \\( \\frac{1}{2}(0.5)(100) = 25 \\) J.', faded: true, blankAnswer: '\\( v_{1f} = 7.66 \\) m/s at 40°, \\( v_{2f} = 6.43 \\) m/s.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_013', title: 'A real-world call',
          caseStudy: { intro: 'Laws of motion let us design safer cars — crumple zones that sacrifice the car to save the passenger. A cheap car without them costs half as much; a family choosing it may be choosing between money and physics.',
            decisions: [{ prompt: 'Should safety features be mandatory even if they raise prices?', options: [
                { text: 'Yes — physics doesn\'t care about your budget', outcome: 'The regulation argument — momentum at 60 km/h is non-negotiable; but mandates price out the families who could only afford the cheap car.' },
                { text: 'No — let buyers choose their trade-off', outcome: 'The autonomy argument; it assumes buyers fully understand the physics of what they\'re declining.' },
                { text: 'Mandate the minimum, subsidise the rest', outcome: 'The design answer — a safety floor for everyone, help for those who can\'t reach it.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A coolie hauls a suitcase across the platform and a weightlifter holds a barbell overhead — a classmate claims both \'do lots of work since the forces are big.\' For a spring stretched with F = 2x over 3 m, he computes work as 6 × 3 = 18 J.',
            decisions: [{ prompt: 'What does the work definition actually compute?', options: [
                { text: 'Apply the dot product: W = F·d·cosθ — the coolie\'s upward force is perpendicular to horizontal displacement, so W = 0 despite the effort; the weightlifter\'s displacement is zero, also W = 0. And for a variable force you integrate: ∫₀³ 2x dx = 9 J — using the endpoint force double-counts what the growing force only reached at the end.', outcome: 'Effort stops masquerading as work: only the force component along displacement counts, and a changing force sums slice by slice — the area under the F–x curve.' },
                { text: 'Count both as work — sweating and straining are proof that work is being done.', outcome: 'Physiology isn\'t physics: without a force component along displacement, energy isn\'t transferred to the object — zero work however tired the worker.', reveals: 'effort-equals-work' },
                { text: 'Keep 18 J — final force times distance is a fair estimate for the spring.', outcome: 'The force was 2x throughout, not 6 the whole way: final-force × distance overestimates — the integral (area under the line) gives 9 J.', reveals: 'final-force-times-distance' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'Energy is the universe\'s currency — it never appears or disappears, only changes hands. Roller coasters, dams and your breakfast all run on the same ledger.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_013', difficulty: 'standard',
          question: 'A collision is an isolated event where two or more bodies exert strong.',
          hint: 'If stuck, review c9_physics_ch3_6 (momentum conservation) and c11_phy_cbse_05_005.',
          misconception: 'Students believe "elastic collision means objects bounce apart, inelastic means they stick together" — this is.',
          parts: [
                { id: 'a', prompt: 'A ball of mass m moving at speed v collides head-on with an identical ball at rest. After collision, the first ball stops and the second moves at speed v.', answer: 'Elastic',
                  options: ['Elastic', 'inelastic because the first ball stopped', 'stopping implies energy loss'],
                  hint: 'If stuck, review c9_physics_ch3_6 (momentum conservation) and c11_phy_cbse_05_005 (work-energy.',
                  misconception: 'Students believe "elastic collision means objects bounce apart, inelastic means they stick together" — this is a classification error.' }
          ],
            remediations: { 'elastic-collision-means-objects-bounce': { steps: ['Revisit Class 9 momentum conservation (c9_physics_ch3_6) — verify that Σp_initial = Σp_final holds for ANY isolated.', 'Perform a virtual lab (PhET Collision Lab) — set elasticity to 1, 0.5, 0; observe momentum vectors (always conserved).', 'Solve 5 problems computing both Δp and ΔK for same collision — tabulate results to see Δp = 0 always, ΔK < 0 for.', 'Derive e = √(K_f/Kᵢ) only for equal-mass 1D case to see the limited connection between e and energy ratio.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "elastic collision means objects bounce apart, inelastic means they stick together" — this is.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In any inelastic collision, kinetic energy is lost, so momentum cannot be conserved." Evaluate this statement and correct the misconception.', answer: 'Statement is FALSE',
                  options: ['Statement is FALSE', 'energy not conserved', 'momentum not conserved'],
                  hint: 'If stuck, review c9_physics_ch3_6 (momentum conservation) and c11_phy_cbse_05_005 (work-energy.',
                  misconception: 'Students believe "elastic collision means objects bounce apart, inelastic means they stick together" — this is a classification error.' }
          ],
            remediations: { 'elastic-collision-means-objects-bounce': { steps: ['Revisit Class 9 momentum conservation (c9_physics_ch3_6) — verify that Σp_initial = Σp_final holds for ANY isolated.', 'Perform a virtual lab (PhET Collision Lab) — set elasticity to 1, 0.5, 0; observe momentum vectors (always conserved).', 'Solve 5 problems computing both Δp and ΔK for same collision — tabulate results to see Δp = 0 always, ΔK < 0 for.', 'Derive e = √(K_f/Kᵢ) only for equal-mass 1D case to see the limited connection between e and energy ratio.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_014', difficulty: 'standard',
          question: 'A one-dimensional collision is an interaction between two bodies where their.',
          hint: 'If stuck, review Class 9 momentum conservation (c9_physics_ch3_6) and Class 11.',
          misconception: 'Students believe that in a completely inelastic collision, "kinetic energy is lost" means it disappears, violating.',
          parts: [
                { id: 'a', prompt: 'A 2 kg block moving at 3 m/s collides head-on with a stationary 1 kg block.', answer: 'Given: m₁ = 2 kg, u₁ = 3 m/s, m₂ = 1 kg, u₂ = 0',
                  options: ['Given: m₁ = 2 kg, u₁ = 3 m/s, m₂ = 1 kg, u₂ = 0', 'kinetic energy is lost', 'no collision happened', 'maximum kinetic energy loss consistent with momentum conservation'],
                  hint: 'If stuck, review Class 9 momentum conservation (c9_physics_ch3_6) and Class 11 work-energy theorem.',
                  misconception: 'Students believe that in a completely inelastic collision, "kinetic energy is lost" means it disappears, violating energy conservation.' },
                { id: 'b', prompt: 'A 500 g ball moving at 10 m/s collides completely inelastically with a 300 g ball moving at 4 m/s in the opposite direction.', answer: 'm₁ = 0.5 kg, u₁ = +10 m/s',
                  options: ['m₁ = 0.5 kg, u₁ = +10 m/s', 'kinetic energy is lost', 'no collision happened', 'maximum kinetic energy loss consistent with momentum conservation'],
                  hint: 'If stuck, review Class 9 momentum conservation (c9_physics_ch3_6) and Class 11 work-energy theorem.',
                  misconception: 'Students believe that in a completely inelastic collision, "kinetic energy is lost" means it disappears, violating energy conservation.' }
          ],
            remediations: { 'in-a-completely-inelastic-collision': { steps: ['If the student holds this misconception: (1) Demonstrate with a simple experiment: drop a bouncing ball (elastic) and.', 'Show clay doesn\'t rebound - its KE became heat (feel the clay warm up).', '(2) Write the energy equation explicitly: Initial KE = Final KE + ΔE_internal.', '(3) Solve a numerical problem where they calculate ΔE_internal = Initial KE - Final KE for a completely inelastic.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_015', difficulty: 'standard',
          question: 'A collision in two dimensions occurs when two bodies interact such that their.',
          hint: 'If stuck, revisit c11_phy_cbse_05_014 (1D collisions) to review momentum and energy.',
          misconception: 'Students often believe that in a 2D elastic collision with equal masses, the scattering angles \\( \\theta_1 \\) and \\.',
          parts: [
                { id: 'a', prompt: 'In a two-dimensional elastic collision with \\( m_2 \\) initially at rest, we have three equations (two momentum components + energy) but four unknowns (\\.', answer: 'Conservation laws constrain the final state but do not fix the exact trajectory',
                  options: ['Conservation laws constrain the final state but do not fix the exact trajectory', 'we need the collision time', 'energy is not conserved'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_014 (1D collisions) to review momentum and energy conservation.',
                  misconception: 'Students often believe that in a 2D elastic collision with equal masses, the scattering angles \\( \\theta_1 \\) and \\( \\theta_2 \\) are always.' }
          ],
            remediations: { 'in-a-2d-elastic-collision': { steps: ['Draw the momentum vector triangle: \\( \\vec{p}_i = \\vec{p}_{1f} + \\vec{p}_{2f} \\).', 'For equal masses, \\( \\vec{v}_i = \\vec{v}_{1f} + \\vec{v}_{2f} \\).', 'Use the Pythagorean theorem from energy conservation: \\( v_i^2 = v_{1f}^2 + v_{2f}^2 \\).', 'Recognize this is exactly the condition for a right triangle → angle between \\( \\vec{v}_{1f} \\) and \\( \\vec{v}_{2f} \\).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
