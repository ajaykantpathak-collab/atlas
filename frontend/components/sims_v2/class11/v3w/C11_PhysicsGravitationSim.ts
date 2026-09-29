import type { SimDef } from '../../engine/types';
import C11_PhysicsGravitationSim from '../../../simulations/c6_12/C11_PhysicsGravitationSim';

/** v3 wrapped master — C11_PhysicsGravitationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsgravitationsim: SimDef = {
    id: 'v3w_c11_physicsgravitationsim',
    title: 'Kepler\'s Laws of Planetary Motion',
    subtitle: 'This node covers the *statement, geometric meaning, and basic application* of Kepler\'s.',
    classLevel: 11, subject: 'physics', topic: 'Kepler\'s Laws of Planetary Motion',
    chapters: [],
    nodeIds: ['c11_phy_cbse_07_001', 'c11_phy_cbse_07_002', 'c11_phy_cbse_07_003', 'c11_phy_cbse_07_004', 'c11_phy_cbse_07_005', 'c11_phy_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe the night sky over several weeks (or use a free planetarium app like.', goal: 'Master Kepler\'s Laws of Planetary Motion.' },
    discovery: {
        question: 'State the exact formula for acceleration due to gravity at a height \\(h\\) above the Earth\'s surface in terms of \\(g\\), \\(R_E\\), and \\(h\\).',
        options: ['Exact formula: \\(g_h = g \\left(\\frac{R_E}{R_E + h}\\right)^2\\)', 'zero gravity', '"zero gravity" exists in orbit'],
        answer: 'Exact formula: \\(g_h = g \\left(\\frac{R_E}{R_E + h}\\right)^2\\)',
        hook: 'Students often believe that "zero gravity" exists in orbit because astronauts float.',
    },
    teaching: [
        { title: 'Kepler\'s laws of planetary motion are three.', text: 'Kepler\'s laws of planetary motion are three empirical principles describing the motion of planets around the Sun: (1) **Law of Orbits** – Every planet moves in an elliptical orbit with the Sun at one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_phy_cbse_07_001', title: 'Kepler\'s laws of planetary motion are.',
          caseStudy: { intro: 'Begin by asking students to observe the night sky over several weeks (or use a free planetarium app like Stellarium) and note that planets like Mars or Jupiter.',
            decisions: [{ prompt: 'State Kepler\'s three laws of planetary motion in your own words, using the terms *ellipse*, *focus*, *radius vector*, *semi-major axis*,.', options: [
                { text: '**Correct answer:** 1', outcome: '**Correct answer:** 1. **Law of Orbits:** Planets orbit the Sun in ellipses with the Sun at one.' },
                { text: 'circular orbits', outcome: 'Not quite — **Misconception:** "Kepler\'s first law says planets move in ellipses, so the Sun is at the *center*.', reveals: 'misconception-kepler-s-first-law' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_002', title: 'Newton\'s Law of Universal Gravitation.',
          scaffold: { problem: 'Two identical lead spheres, each of mass \\(10.0 \\, \\text{kg}\\) and radius \\(0.05 \\, \\text{m}\\), are placed in contact.',
            steps: [
            { text: 'Identify given quantities: \\(m_1 = m_2 = 10.0 \\, \\text{kg}\\). The spheres are in contact, so the distance between their.' },
            { text: 'Write the formula for magnitude: \\(F = G \\frac{m_1 m_2}{r^2}\\).' },
            { text: 'Substitute values with units: \\(F = (6.67 \\times 10^{-11}) \\frac{(10.0)(10.0)}{(0.10)^2}\\).' },
            { text: 'Compute step-by-step: Numerator: \\(10.0 \\times 10.0 = 100\\). Denominator: \\((0.10)^2 = 0.0100\\).' },
            { text: 'Verify reasonableness: The force is microscopic (\\(\\sim 0.67 \\, \\mu\\text{N}\\)), consistent with the weakness of gravity.', faded: true, blankAnswer: '\\(6.67 \\times 10^{-7} \\, \\text{N}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_003', title: 'The gravitational constant \\( G \\) is.',
          scaffold: { problem: 'In a Cavendish experiment performed in a school laboratory, the following data is recorded: Mass of each large lead sphere \\( M = 2.0 \\,.',
            steps: [
            { text: 'Identify all given quantities with units: \\( M = 2.0 \\, \\text{kg} \\), \\( m = 0.05 \\, \\text{kg} \\), \\( d = 0.04 \\,.' },
            { text: 'Write the torque equilibrium equation: Gravitational torque = Restoring torque → \\( F \\times L = \\tau \\theta \\).' },
            { text: 'Rearrange for \\( G \\): \\( G = \\frac{\\tau \\theta d^2}{M m L} \\).' },
            { text: 'Substitute values with powers of ten: \\( \\tau \\theta = (2.5 \\times 10^{-7}) \\times (2.0 \\times 10^{-3}) = 5.0 \\times.' },
            { text: 'Compute \\( G = \\frac{8.0 \\times 10^{-13}}{0.04} = 2.0 \\times 10^{-11} \\, \\text{N m}^2 \\text{kg}^{-2} \\).' },
            { text: 'Check reasonableness: The accepted value is \\( 6.67 \\times 10^{-11} \\).', faded: true, blankAnswer: '\\( G = 2.0 \\times 10^{-11} \\, \\text{N m}^2 \\text{kg}^{-2} \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_004', title: 'The acceleration due to gravity (g) at.',
          scaffold: { problem: 'A 2 kg mass is placed on the surface of the Earth. Given M_E = 6.0 × 10^24 kg, R_E = 6.4 × 10^6 m, and G = 6.67 × 10^{-11} N·m²/kg²,.',
            steps: [
            { text: 'Identify given: m = 2 kg, M_E = 6.0×10^24 kg, R_E = 6.4×10^6 m, G = 6.67×10^{-11} N·m²/kg². Find F and a.' },
            { text: 'Gravitational force formula: F = G M_E m / R_E^2. Check units: (N·m²/kg² × kg × kg) / m² = N. Correct.' },
            { text: 'Substitute: F = (6.67×10^{-11} × 6.0×10^24 × 2) / (6.4×10^6)^2 = (8.004×10^14) / (4.096×10^13) = 19.54 N.' },
            { text: 'Acceleration a = F/m = 19.54 N / 2 kg = 9.77 m/s². Alternatively, directly a = G M_E / R_E^2 = same value.' },
            { text: 'Note that m cancelled in a = F/m = G M_E / R_E^2. If m were 5 kg, F would be 48.85 N but a would still be 9.77 m/s².', faded: true, blankAnswer: '(a) F = 19.5 N (b) a = 9.8 m/s² (independent of mass)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_005', title: 'The acceleration due to gravity at a.',
          scaffold: { problem: 'A mountaineer carries a 2 kg mass to the summit of Mount Everest (height 8848 m).',
            steps: [
            { text: 'Identify given: \\(m = 2 \\text{ kg}\\), \\(h = 8848 \\text{ m} = 8.848 \\text{ km}\\), \\(R_E = 6370 \\text{ km}\\), \\(g = 9.8.' },
            { text: 'Use exact formula \\(g_h = g \\left(\\frac{R_E}{R_E + h}\\right)^2\\).' },
            { text: 'Substitute: \\(g_h = 9.8 \\times \\left(\\frac{6370}{6370 + 8.848}\\right)^2 = 9.8 \\times.' },
            { text: 'Weight at summit \\(W_h = 2 \\times 9.773 = 19.546 \\text{ N}\\). Weight at sea level \\(W_0 = 2 \\times 9.8 = 19.6 \\text{.' },
            { text: 'Verify: \\(h/R_E \\approx 0.0014 \\ll 1\\), so approximate formula \\(g_h \\approx 9.8(1 - 2 \\times 0.0014) = 9.773 \\text{.', faded: true, blankAnswer: 'Weight at summit = 19.55 N (approx), percentage decrease =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_006', title: 'The acceleration due to gravity at a.',
          scaffold: { problem: 'The Kolar Gold Fields in Karnataka have mines reaching a depth of 3.2 km.',
            steps: [
            { text: 'Identify given quantities: \\(d = 3.2\\) km = \\(3200\\) m, \\(R_E = 6400\\) km = \\(6.4 \\times 10^6\\) m, \\(g = 9.8\\) m/s².' },
            { text: 'Write the formula for \\(g\\) at depth: \\(g(d) = g \\left(1 - \\frac{d}{R_E}\\right)\\).' },
            { text: 'Substitute values using km for convenience: \\(d/R_E = 3.2 / 6400 = 0.0005\\).' },
            { text: 'Compute \\(g(d) = 9.8 \\times (1 - 0.0005) = 9.8 \\times 0.9995 = 9.7951\\) m/s².' },
            { text: 'Percentage decrease = \\(\\frac{g - g(d)}{g} \\times 100\\% = \\frac{d}{R_E} \\times 100\\% = 0.05\\%\\).', faded: true, blankAnswer: '\\(g(d) = 9.7951\\) m/s²; percentage decrease = 0.05%.' }
            ] } }
    ],
    explore: { component: C11_PhysicsGravitationSim, prompt: 'Explore the interactive — Kepler\'s Laws of Planetary Motion' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_001', difficulty: 'standard',
          question: 'Kepler\'s laws of planetary motion are three empirical principles describing the.',
          hint: 'If stuck, revisit Class 9 Chapter 9 (Force and Laws of Motion) – specifically the concept.',
          misconception: '**Misconception:** "Kepler\'s first law says planets move in ellipses, so the Sun is at the *center* of the ellipse.".',
          parts: [
                { id: 'a', prompt: 'State Kepler\'s three laws of planetary motion in your own words, using the terms *ellipse*, *focus*, *radius vector*, *semi-major axis*, and *period*.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'circular orbits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Kepler\'s first law says planets move in ellipses, so the Sun is at the *center* of the ellipse." **Exact wrong.' }
          ],
            remediations: { 'misconception-kepler-s-first-law': { steps: ['**Physical construction:** Have the student draw an ellipse using the string-and-pins method (NCERT Fig.', 'Place two pins (foci) 8 cm apart, use a 20 cm string loop.', 'Mark the center (midpoint of foci) and one focus as the Sun.', '**Measure distances:** Measure the distance from the Sun-focus to the curve at several points, especially the closest.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_002', difficulty: 'standard',
          question: 'Newton\'s Law of Universal Gravitation states that every particle in the.',
          hint: 'Review Newton\'s second and third laws (c9_physics_ch3_4, c9_physics_ch3_5) and.',
          misconception: 'Students believe that the gravitational force described by Newton\'s law is only significant between astronomical bodies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Newton\'s Law of Universal Gravitation states that every particle in the universe attracts',
                  options: ['Newton\'s Law of Universal Gravitation states that every particle in the universe attracts', 'Kepler\'s laws of planetary motion are three empirical principles describing the motion of', 'The gravitational constant \\( G \\) is the universal proportionality constant in Newton\'s', 'The acceleration due to gravity (g) at the Earth\'s surface is the uniform acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the gravitational force described by Newton\'s law is only significant between astronomical bodies (like Earth and.' }
          ],
            remediations: { 'the-gravitational-force-described-by': { steps: ['**Calculate the force between two students:** Take two \\(60 \\, \\text{kg}\\) students sitting \\(1 \\, \\text{m}\\) apart.', 'Compute \\(F = G (60)^2 / 1^2 \\approx 2.4 \\times 10^{-7} \\, \\text{N}\\).', 'Compare this to the weight of a single grain of rice (\\(\\sim 10^{-5} \\, \\text{N}\\)) to show it is real but negligible.', '**Dimensional analysis drill:** Write the units of \\(G\\) from the formula \\(F = G m_1 m_2 / r^2\\) → \\([G] = [F] [r]^2 /.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_003', difficulty: 'standard',
          question: 'The gravitational constant \\( G \\) is the universal proportionality constant in.',
          hint: 'Revisit Newton\'s law of gravitation (c11_phy_cbse_07_002) and the concept of a couple.',
          misconception: 'Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \\( G \\) is found by measuring the.',
          parts: [
                { id: 'a', prompt: 'In a Cavendish experiment, the torsion constant \\( \\tau = 1.2 \\times 10^{-7} \\, \\text{N} \\, \\text{m} \\, \\text{rad}^{-1} \\), the angle of twist \\( \\theta =.', answer: '**Step 1:** Identify formula: \\( G = \\frac{\\tau \\theta d^2}{M m L} \\)',
                  options: ['**Step 1:** Identify formula: \\( G = \\frac{\\tau \\theta d^2}{M m L} \\)', 'weighs the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \\( G \\) is found by measuring the attraction between.' }
          ],
            remediations: { 'the-cavendish-experiment-weighs-the': { steps: ['Revisit the Cavendish apparatus diagram (NCERT Fig 7.6) and trace the force pairs: large sphere on small sphere → force.', 'Write the torque equilibrium equation \\( \\tau \\theta = F L \\) and substitute \\( F = G \\frac{M m}{d^2} \\) to derive \\( G.', 'Perform a dimensional analysis of each term to confirm \\( G \\) has units \\( \\text{N m}^2 \\text{kg}^{-2} \\), distinct.', 'Solve a numerical problem where \\( \\tau \\) is determined from a separate calibration step (hanging a known mass on the.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \\( G \\) is found by measuring the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Cavendish experiment measures the gravitational force directly by measuring the twist angle, so we don\'t need to know the torsion.', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'weighs the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \\( G \\) is found by measuring the attraction between.' },
                { id: 'b', prompt: 'Design a thought experiment: If you were to measure \\( G \\) on the International Space Station (microgravity environment), what modification to the Cavendish.', answer: 'On the ISS, the torsion wire would not hang vertically under gravity',
                  options: ['On the ISS, the torsion wire would not hang vertically under gravity', 'weighs the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \\( G \\) is found by measuring the attraction between.' }
          ],
            remediations: { 'the-cavendish-experiment-weighs-the': { steps: ['Revisit the Cavendish apparatus diagram (NCERT Fig 7.6) and trace the force pairs: large sphere on small sphere → force.', 'Write the torque equilibrium equation \\( \\tau \\theta = F L \\) and substitute \\( F = G \\frac{M m}{d^2} \\) to derive \\( G.', 'Perform a dimensional analysis of each term to confirm \\( G \\) has units \\( \\text{N m}^2 \\text{kg}^{-2} \\), distinct.', 'Solve a numerical problem where \\( \\tau \\) is determined from a separate calibration step (hanging a known mass on the.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_004', difficulty: 'standard',
          question: 'The acceleration due to gravity (g) at the Earth\'s surface is the uniform.',
          hint: 'If stuck, revisit c11_phy_cbse_07_002 (universal gravitation) for the force formula and.',
          misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for.',
          parts: [
                { id: 'a', prompt: 'State the formula for acceleration due to gravity at the Earth\'s surface in terms of G, M_E, and R_E. What is its SI unit?', answer: 'g = GM_E/R_E^2, SI unit: m/s²',
                  options: ['g = GM_E/R_E^2, SI unit: m/s²', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for heavier objects) with.' },
                { id: 'b', prompt: 'Two balls of different masses (100 g and 500 g) are dropped from the same height in a vacuum. Which one has greater acceleration?', answer: 'Both have the same acceleration g',
                  options: ['Both have the same acceleration g', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for heavier objects) with.' },
                { id: 'c', prompt: 'If the Earth\'s radius were halved while its mass remained the same, how would g change?', answer: 'g ∝ M_E/R_E^2',
                  options: ['g ∝ M_E/R_E^2', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for heavier objects) with.' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Re-derive g from F = GMm/R² = mg, explicitly cancelling m.', 'Drop a book and a sheet of paper (flat) then crumpled paper – discuss air resistance vs.', 'Practice unit analysis: write units of each symbol in g = GM/R² and verify result is m/s².', 'If stuck on inverse-square, revisit Coulomb\'s law analogy (c12_phy_cbse_01_003) or geometry of flux through a sphere.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for.',
          parts: [
                { id: 'a', prompt: 'A student calculates g using g = GM_E/R_E^2 but uses R_E = 6370 km without converting to meters. The result is 9.8 × 10^{-6} m/s².', answer: 'The student used R_E in km but G is in N·m²/kg², so R_E must be in meters',
                  options: ['The student used R_E in km but G is in N·m²/kg², so R_E must be in meters', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for heavier objects) with.' },
                { id: 'b', prompt: 'Design a simple experiment to measure g in a school lab using a simple pendulum.', answer: 'Measure length L of pendulum and time period T for small oscillations',
                  options: ['Measure length L of pendulum and time period T for small oscillations', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "heavier objects fall faster" because they confuse gravitational force (which is larger for heavier objects) with.' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Re-derive g from F = GMm/R² = mg, explicitly cancelling m.', 'Drop a book and a sheet of paper (flat) then crumpled paper – discuss air resistance vs.', 'Practice unit analysis: write units of each symbol in g = GM/R² and verify result is m/s².', 'If stuck on inverse-square, revisit Coulomb\'s law analogy (c12_phy_cbse_01_003) or geometry of flux through a sphere.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_005', difficulty: 'standard',
          question: 'The acceleration due to gravity at a height \\(h\\) above the Earth\'s surface is.',
          hint: 'Revisit the derivation of \\(g = GM_E/R_E^2\\) in node c11_phy_cbse_07_004 and practice.',
          misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.',
          parts: [
                { id: 'a', prompt: 'State the exact formula for acceleration due to gravity at a height \\(h\\) above the Earth\'s surface in terms of \\(g\\), \\(R_E\\), and \\(h\\).', answer: 'Exact formula: \\(g_h = g \\left(\\frac{R_E}{R_E + h}\\right)^2\\)',
                  options: ['Exact formula: \\(g_h = g \\left(\\frac{R_E}{R_E + h}\\right)^2\\)', 'zero gravity', '"zero gravity" exists in orbit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.' },
                { id: 'b', prompt: 'Why does the acceleration due to gravity decrease with altitude? Explain using the inverse-square law and the concept of gravitational field lines.', answer: 'Gravitational field strength is proportional to the density of field lines',
                  options: ['Gravitational field strength is proportional to the density of field lines', 'g decreases because mass decreases', 'g decreases linearly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.' },
                { id: 'c', prompt: 'Compare the rate of decrease of \\(g\\) with altitude (for \\(h \\ll R_E\\)) to the rate of decrease with depth (for \\(d \\ll R_E\\)).', answer: 'For altitude: \\(g_h \\approx g(1 - 2h/R_E)\\) → rate = \\(-2g/R_E\\) per metre',
                  options: ['For altitude: \\(g_h \\approx g(1 - 2h/R_E)\\) → rate = \\(-2g/R_E\\) per metre', 'depth decreases faster', 'same rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.' }
          ],
            remediations: { 'zero-gravity-exists-in-orbit': { steps: ['Re-derive \\(g_h\\) from \\(F = \\frac{GM_E m}{(R_E + h)^2}\\) and \\(F = m g_h\\).', 'Plot \\(g_h\\) vs \\(h\\) for \\(h = 0\\) to \\(2R_E\\) using the exact formula to see it never reaches zero.', 'Watch a video of ISS astronauts and identify that they are falling *towards* Earth, not floating *away*.', 'Practice binomial expansion: \\((1 + x)^{-2} \\approx 1 - 2x\\) for \\(x \\ll 1\\) with \\(x = h/R_E\\).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.',
          parts: [
                { id: 'a', prompt: 'Design a thought experiment to measure the variation of \\(g\\) with altitude using a simple pendulum and a stopwatch.', answer: 'Use \\(T = 2\\pi\\sqrt{L/g}\\) → \\(g = 4\\pi^2 L / T^2\\)',
                  options: ['Use \\(T = 2\\pi\\sqrt{L/g}\\) → \\(g = 4\\pi^2 L / T^2\\)', 'zero gravity', '"zero gravity" exists in orbit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "zero gravity" exists in orbit because astronauts float.' }
          ],
            remediations: { 'zero-gravity-exists-in-orbit': { steps: ['Re-derive \\(g_h\\) from \\(F = \\frac{GM_E m}{(R_E + h)^2}\\) and \\(F = m g_h\\).', 'Plot \\(g_h\\) vs \\(h\\) for \\(h = 0\\) to \\(2R_E\\) using the exact formula to see it never reaches zero.', 'Watch a video of ISS astronauts and identify that they are falling *towards* Earth, not floating *away*.', 'Practice binomial expansion: \\((1 + x)^{-2} \\approx 1 - 2x\\) for \\(x \\ll 1\\) with \\(x = h/R_E\\).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_006', difficulty: 'standard',
          question: 'The acceleration due to gravity at a depth \\(d\\) below the Earth\'s surface,.',
          hint: 'Review the shell theorem in NCERT Section 7.3 (two special cases) and the derivation of.',
          misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply.',
          parts: [
                { id: 'a', prompt: 'State the formula for acceleration due to gravity at a depth \\(d\\) below the Earth\'s surface, assuming uniform density. Define each symbol and give its SI unit.', answer: 'The formula is \\(g(d) = g \\left(1 - \\frac{d}{R_E}\\right)\\)',
                  options: ['The formula is \\(g(d) = g \\left(1 - \\frac{d}{R_E}\\right)\\)', 'you are closer to the centre of the Earth', '\\(g\\) *increases* with depth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply the point-mass formula.' },
                { id: 'b', prompt: 'Explain why the gravitational force on a particle inside a uniform spherical shell is zero.', answer: 'For a particle inside a uniform spherical shell, every mass element attracts the',
                  options: ['For a particle inside a uniform spherical shell, every mass element attracts the', 'mass above pulls up', 'you are closer to the centre of the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply the point-mass formula.' },
                { id: 'c', prompt: 'A graph of \\(g\\) vs. distance from Earth\'s centre \\(r\\) is plotted for \\(0 \\le r \\le 2R_E\\). Describe the shape of the graph for \\(r < R_E\\) and \\(r > R_E\\).', answer: 'For \\(r < R_E\\) (inside), \\(g(r) = \\frac{GM_E}{R_E^3}r\\)',
                  options: ['For \\(r < R_E\\) (inside), \\(g(r) = \\frac{GM_E}{R_E^3}r\\)', 'graph is discontinuous', 'graph is flat inside'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply the point-mass formula.' }
          ],
            remediations: { 'g-increases-with-depth-because': { steps: ['Revisit the shell theorem proof (NCERT Section 7.3, two special cases).', 'Draw a diagram of a point inside a spherical shell and show force cancellation using symmetry.', 'Practice the derivation: \\(M_{\\text{inside}} = \\rho \\cdot \\frac{4}{3}\\pi (R_E-d)^3\\), then \\(g(d) = G M_{\\text{inside}}.', 'Compare with altitude formula: \\(g(h) = g/(1+h/R_E)^2 \\approx g(1-2h/R_E)\\).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply.',
          parts: [
                { id: 'a', prompt: 'A student claims: "At the centre of the Earth (\\(d = R_E\\)), \\(g\\) should be infinite because \\(r=0\\) in Newton\'s law \\(F = GMm/r^2\\)." Evaluate this claim and.', answer: 'The claim is false',
                  options: ['The claim is false', 'you are closer to the centre of the Earth', '\\(g\\) *increases* with depth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(g\\) *increases* with depth because "you are closer to the centre of the Earth." They misapply the point-mass formula.' }
          ],
            remediations: { 'g-increases-with-depth-because': { steps: ['Revisit the shell theorem proof (NCERT Section 7.3, two special cases).', 'Draw a diagram of a point inside a spherical shell and show force cancellation using symmetry.', 'Practice the derivation: \\(M_{\\text{inside}} = \\rho \\cdot \\frac{4}{3}\\pi (R_E-d)^3\\), then \\(g(d) = G M_{\\text{inside}}.', 'Compare with altitude formula: \\(g(h) = g/(1+h/R_E)^2 \\approx g(1-2h/R_E)\\).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
