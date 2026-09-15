import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch07_p2: SimDef = {
    id: 'v3_c11_phy_ch07_p2',
    title: 'Gravitation · Part 2/3',
    subtitle: 'Halve the guess, quarter the force — gravity squares, not halves.',
    classLevel: 11, subject: 'physics', topic: 'Gravitation · Part 2/3',
    chapters: ['c11_phy_ch07'],
    nodeIds: ['c11_phy_cbse_07_007', 'c11_phy_cbse_07_008', 'c11_phy_cbse_07_009', 'c11_phy_cbse_07_010', 'c11_phy_cbse_07_011', 'c11_phy_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an astronomer checking Newton\'s inverse-square arithmetic', intro: 'The apple falls and the Moon doesn\'t — yet the same pull, weakened 3600-fold over 60 Earth-radii, explains both.', goal: 'Apply the inverse-square law and Kepler\'s laws correctly, distinguishing G from g.' },
    discovery: {
        question: 'Two 1 kg masses at 1 m pull each other with 6.67 × 10⁻¹¹ N. Double the distance — the force halves?',
        options: ['No — gravity is inverse-square: twice the distance means one quarter the force, 1.67 × 10⁻¹¹ N', 'Yes — force shrinks linearly with distance', 'Yes — 3.33 × 10⁻¹¹ N', 'No — it drops to zero beyond a metre'],
        answer: 'No — gravity is inverse-square: twice the distance means one quarter the force, 1.67 × 10⁻¹¹ N',
        hook: 'And the Sun is not at the centre of the ellipse — it sits at a focus; symmetry of the orbit is not symmetry of the pull.',
    },
    teaching: [
        { title: 'Variation of g Due to Rotation of Earth', text: 'The effective acceleration due to gravity (\\(g_{\\text{eff}}\\)) at a point on Earth\'s surface is the vector sum of the true gravitational acceleration (\\(g = GM/R^2\\), directed toward Earth\'s centre).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_07_007', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Test Kepler\'s second law against a \'symmetric halves take equal time\' claim, then judge whether two students on a bench really do attract each other.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_007', title: 'Variation of g Due to Rotation of Earth',
          scaffold: { problem: 'Calculate the effective acceleration due to gravity at the equator (\\(\\lambda = 0^\\circ\\)).',
            steps: [
            { text: 'Identify given quantities: \\(g = 9.80\\,\\text{m/s}^2\\), \\(R = 6400\\,\\text{km} = 6.4 \\times 10^6\\,\\text{m}\\), \\(\\omega.' },
            { text: 'Formula: \\(g_{\\text{eff}} = g - \\omega^2 R \\cos^2\\lambda\\). At equator \\(\\cos 0^\\circ = 1\\), so \\(g_{\\text{eff}} =.' },
            { text: 'Compute \\(\\omega^2 R = (7.29 \\times 10^{-5})^2 \\times (6.4 \\times 10^6) = 5.314 \\times 10^{-9} \\times 6.4 \\times 10^6.' },
            { text: 'Subtract: \\(g_{\\text{eff}} = 9.80 - 0.0340 = 9.766\\,\\text{m/s}^2\\).' },
            { text: 'Verify: reduction is \\(0.034/9.80 \\approx 0.35\\%\\), physically reasonable. Round to three significant figures.', faded: true, blankAnswer: '\\(9.77\\,\\text{m/s}^2\\) (or \\(9.766\\,\\text{m/s}^2\\))' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_008', title: 'Gravitational Potential Energy',
          scaffold: { problem: 'Two identical lead spheres, each of mass 10 kg, are placed with their centres 0.5 m apart in a school laboratory.',
            steps: [
            { text: 'Identify given quantities: \\(m_1 = 10 \\, \\text{kg}\\), \\(m_2 = 10 \\, \\text{kg}\\), \\(r = 0.5 \\, \\text{m}\\), \\(G = 6.67.' },
            { text: 'Select the formula for a pair of point masses: \\(U = -\\frac{G m_1 m_2}{r}\\).' },
            { text: 'Substitute values with units: \\(U = -\\frac{(6.67 \\times 10^{-11}) \\times 10 \\times 10}{0.5}\\).' },
            { text: 'Compute numerator: \\(6.67 \\times 10^{-11} \\times 100 = 6.67 \\times 10^{-9}\\).' },
            { text: 'Verify reasonableness: The energy is very small (order \\(10^{-8} \\, \\text{J}\\)) because \\(G\\) is tiny and masses are.', faded: true, blankAnswer: '\\(-1.33 \\times 10^{-8} \\, \\text{J}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_009', title: 'Gravitational Potential',
          scaffold: { problem: 'A satellite of mass 500 kg is in a circular orbit at a height of 800 km above Earth\'s surface.',
            steps: [
            { text: 'Identify given quantities: m = 500 kg (not needed for V), h = 800 km = 8.0 × 10^5 m, R_E = 6.4 × 10^6 m, M_E = 6.0.' },
            { text: 'Compute orbital radius r = R_E + h = 6.4 × 10^6 + 8.0 × 10^5 = 7.2 × 10^6 m. Formula: V = -GM/r.' },
            { text: 'Substitute with units: V = -(6.67 × 10^-11 N·m²/kg² × 6.0 × 10^24 kg) / (7.2 × 10^6 m).' },
            { text: 'Compute numerator: 6.67 × 6.0 = 40.02; 10^-11 × 10^24 = 10^13.' },
            { text: 'Verify: Units: (N·m²/kg² × kg)/m = N·m/kg = J/kg ✓. Magnitude: Surface V = -GM/R_E ≈ -6.25 × 10^7 J/kg.', faded: true, blankAnswer: 'V = -5.56 × 10^7 J/kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_010', title: 'Escape Velocity: Derivation',
          scaffold: { problem: 'The mass of Earth is \\(6.0 \\times 10^{24}\\) kg and its radius is \\(6.4 \\times 10^6\\) m. Calculate the escape velocity from Earth\'s surface.',
            steps: [
            { text: 'Identify given quantities: \\(M = 6.0 \\times 10^{24}\\) kg, \\(R = 6.4 \\times 10^6\\) m, \\(G = 6.67 \\times 10^{-11}\\).' },
            { text: 'Write the formula \\(v_e = \\sqrt{\\frac{2GM}{R}}\\). Check units: \\(GM/R\\) has units (N·m²/kg² × kg)/m = (kg·m/s²·m²/kg)/m.' },
            { text: 'Substitute values: \\(v_e = \\sqrt{\\frac{2 \\times 6.67 \\times 10^{-11} \\times 6.0 \\times 10^{24}}{6.4 \\times 10^6}}\\).' },
            { text: 'Compute numerator: \\(2 \\times 6.67 \\times 6.0 = 80.04\\). Powers of 10: \\(10^{-11} \\times 10^{24} = 10^{13}\\).' },
            { text: 'Divide by \\(R\\): \\(\\frac{8.004 \\times 10^{14}}{6.4 \\times 10^6} = 1.2506 \\times 10^8\\) m²/s².' },
            { text: 'Square root: \\(\\sqrt{1.2506 \\times 10^8} = \\sqrt{1.2506} \\times 10^4 \\approx 1.118 \\times 10^4\\) m/s = 11.18 km/s ≈.' },
            { text: 'Verify reasonableness: Known value is 11.2 km/s. The calculation matches.', faded: true, blankAnswer: '11.2 km/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_011', title: 'Orbital Velocity and Period of Satellite',
          scaffold: { problem: 'The Indian Remote Sensing satellite IRS-1A orbits at an altitude of 817 km. Calculate its orbital velocity and period.',
            steps: [
            { text: 'Identify given quantities: h = 817 km = 8.17×10⁵ m, R_E = 6370 km = 6.37×10⁶ m, G = 6.67×10⁻¹¹ N·m²/kg², M_E.' },
            { text: 'Compute orbital radius r = R_E + h = 6.37×10⁶ + 8.17×10⁵ = 7.187×10⁶ m. Verify unit: m.' },
            { text: 'Calculate v = √(GM_E/r) = √((6.67×10⁻¹¹ × 5.97×10²⁴) / 7.187×10⁶) = √(3.98×10¹⁴ / 7.187×10⁶) = √(5.54×10⁷) = 7443 m/s ≈.' },
            { text: 'Calculate T = 2πr/v = 2π × 7.187×10⁶ / 7443 = 4.514×10⁷ / 7443 = 6065 s. Convert to minutes: 6065/60 = 101.1 minutes.' },
            { text: 'Verify reasonableness: ISS at 400 km has v ≈ 7.7 km/s, T ≈ 93 min. Higher altitude → lower v, longer T.', faded: true, blankAnswer: 'v = 7.44 km/s, T = 101.1 minutes (6065 s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_012', title: 'Geostationary and Polar Satellites',
          scaffold: { problem: 'Calculate the height above Earth\'s surface at which a satellite must orbit to be geostationary.',
            steps: [
            { text: 'Identify given: T = 24 h = 86,400 s, G, Mₑ, Rₑ = 6.4 × 10⁶ m. Find h.' },
            { text: 'Use Kepler\'s third law for circular orbits: T² = (4π²/GMₑ) r³ → r³ = GMₑT²/(4π²).' },
            { text: 'Compute GMₑ = (6.67×10⁻¹¹)(6.0×10²⁴) = 4.002×10¹⁴ m³/s². T² = (86,400)² = 7.465×10⁹ s².' },
            { text: 'r³ = (4.002×10¹⁴ × 7.465×10⁹) / (4 × π²) = (2.987×10²⁴) / 39.48 = 7.57×10²² m³.' },
            { text: 'r = (7.57×10²²)^(1/3) = 4.23×10⁷ m = 42,300 km. h = r - Rₑ = 42,300 - 6,400 = 35,900 km.' },
            { text: 'Check: Known value is ~35,786 km. Our approximation (using g=9.8, R=6400 km) gives 35,900 km — physically reasonable.', faded: true, blankAnswer: 'h ≈ 35,900 km (≈ 35,786 km with precise values)' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Drawing the solar system for a poster, a student puts the Sun at the ellipse\'s centre, measures the semi-major axis from there, and in a gravity problem uses g = 9.8 in place of G — \'same thing, gravity constant.\'',
            decisions: [{ prompt: 'What do Kepler and Newton actually specify?', options: [
                { text: 'Fix the geometry and the constants: the Sun sits at a FOCUS of the ellipse, not the centre — that\'s why perihelion and aphelion differ and equal areas sweep in equal times. And G (6.67×10⁻¹¹ N·m²/kg²) is the universal constant in F = Gm₁m₂/r²; g = 9.8 m/s² is Earth\'s local surface acceleration — derived from G, not interchangeable with it.', outcome: 'The poster and the problem both correct: focus for the Sun, G for the universal law, g for the local consequence.' },
                { text: 'Keep the Sun at the centre — a focus is just the middle of an ellipse.', outcome: 'Centre ≠ focus: placing the Sun centrally makes the planet-distance uniform and destroys the area law\'s varying radius vector.', reveals: 'sun-at-ellipse-centre' },
                { text: 'Swap g for G — both are \'the gravity constant\', so either works in the formula.', outcome: 'They differ in kind and scale: G is universal and tiny; g is Earth\'s local field strength — substituting one for the other wrecks both formula and units.', reveals: 'g-equals-big-g' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'The Moon\'s acceleration is g/3600 — matching the distance ratio squared; Newton unified the falling apple and the unfalling Moon with one law.',
            decisions: [{ prompt: 'What comes next? Gravitation · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Gravitation · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_007', difficulty: 'standard',
          question: 'The effective acceleration due to gravity (\\(g_{\\text{eff}}\\)) at a point.',
          hint: 'Review uniform circular motion (centripetal acceleration \\(a = \\omega^2 r\\)) and vector.',
          misconception: 'Students often believe the centrifugal force due to Earth\'s rotation acts **vertically upward** at all latitudes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The effective acceleration due to gravity (\\(g_{\\text{eff}}\\)) at a point on Earth\'s',
                  options: ['The effective acceleration due to gravity (\\(g_{\\text{eff}}\\)) at a point on Earth\'s', 'Kepler\'s laws of planetary motion are three empirical principles describing the motion of', 'Newton\'s Law of Universal Gravitation states that every particle in the universe attracts', 'The gravitational constant \\( G \\) is the universal proportionality constant in Newton\'s'],
                  hint: 'Review uniform circular motion (centripetal acceleration \\(a = \\omega^2 r\\)) and vector resolution.',
                  misconception: 'Students often believe the centrifugal force due to Earth\'s rotation acts **vertically upward** at all latitudes.' }
          ],
            remediations: { 'the-centrifugal-force-due-to': { steps: ['Revisit the concept of centrifugal acceleration in a rotating frame (Class 11 Laws of Motion): \\(a_c = \\omega^2 r\\).', 'Draw a 3D diagram: Earth sphere, rotation axis, a point at latitude \\(\\lambda\\).', 'Show the centrifugal vector perpendicular to the axis.', 'Resolve this vector into two components: (a) along the radius (opposite to \\(g\\)) → magnitude \\(\\omega^2.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_008', difficulty: 'standard',
          question: 'Gravitational potential energy of a system of two point masses is the work done.',
          hint: 'If stuck, review Class 9 Work and Energy (nodes c9_physics_ch4_1, c9_physics_ch4_3.',
          misconception: 'Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has.',
          parts: [
                { id: 'a', prompt: 'Two students debate the sign of gravitational potential energy.', answer: 'Student B is correct',
                  options: ['Student B is correct', 'the satellite has potential energy', 'gravitational potential energy is a property of a single object (e'],
                  hint: 'If stuck, review Class 9 Work and Energy (nodes c9_physics_ch4_1, c9_physics_ch4_3.',
                  misconception: 'Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has potential energy") rather.' },
                { id: 'b', prompt: 'A 2 kg satellite is in a circular orbit of radius \\(R\\) around Earth. Its gravitational potential energy is \\(U_1\\).', answer: '\\(U_1 = -\\frac{GM_Em}{R}\\), \\(U_2 = -\\frac{GM_Em}{2R} = \\frac{1}{2}U_1\\)',
                  options: ['\\(U_1 = -\\frac{GM_Em}{R}\\), \\(U_2 = -\\frac{GM_Em}{2R} = \\frac{1}{2}U_1\\)', 'higher orbit = more negative', 'the satellite has potential energy', '\\(U_2\\'],
                  hint: 'If stuck, review Class 9 Work and Energy (nodes c9_physics_ch4_1, c9_physics_ch4_3.',
                  misconception: 'Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has potential energy") rather.' }
          ],
            remediations: { 'gravitational-potential-energy-is-a': { steps: ['Revisit Class 9 Work-Energy theorem (node c9_physics_ch4_3) to reinforce that potential energy is defined for.', 'Perform a graphical activity: Plot \\(F = k/r^2\\) and shade area under curve from \\(r_1\\) to \\(r_2\\).', 'Show this area equals \\(k(1/r_1 - 1/r_2)\\), which is \\(-\\Delta U\\).', 'This visualizes why \\(U \\propto -1/r\\).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "Find the change in gravitational potential energy when a 1 kg mass is lifted from Earth\'s surface (\\(R_E = 6400 \\, \\text{km}\\)).', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'the satellite has potential energy', 'gravitational potential energy is a property of a single object (e'],
                  hint: 'If stuck, review Class 9 Work and Energy (nodes c9_physics_ch4_1, c9_physics_ch4_3.',
                  misconception: 'Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has potential energy") rather.' }
          ],
            remediations: { 'gravitational-potential-energy-is-a': { steps: ['Revisit Class 9 Work-Energy theorem (node c9_physics_ch4_3) to reinforce that potential energy is defined for.', 'Perform a graphical activity: Plot \\(F = k/r^2\\) and shade area under curve from \\(r_1\\) to \\(r_2\\).', 'Show this area equals \\(k(1/r_1 - 1/r_2)\\), which is \\(-\\Delta U\\).', 'This visualizes why \\(U \\propto -1/r\\).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_009', difficulty: 'standard',
          question: 'Gravitational potential at a point in a gravitational field is defined as the.',
          hint: 'If stuck, revisit c11_phy_cbse_07_008 (Gravitational Potential Energy) and Class 11 Maths.',
          misconception: 'Students often think gravitational potential is zero at the centre of a massive body (like Earth) because the.',
          parts: [
                { id: 'a', prompt: 'Two identical point masses M are placed at a distance d apart.', answer: 'At midpoint: distance to each mass = d/2',
                  options: ['At midpoint: distance to each mass = d/2', 'they are equal, or perpendicular point is more negative'],
                  hint: 'If stuck, revisit c11_phy_cbse_07_008 (Gravitational Potential Energy) and Class 11 Maths.',
                  misconception: 'Students often think gravitational potential is zero at the centre of a massive body (like Earth) because the gravitational field is zero.' }
          ],
            remediations: { 'gravitational-potential-is-zero-at': { steps: ['Re-derive V for a uniform sphere: V(r) = -GM/(2R) [3 - (r/R)²] for r ≤ R.', 'Plot V(r) vs r from 0 to ∞. Show V is continuous, minimum at centre, zero at infinity.', 'Plot g(r) = -dV/dr. Show g=0 at centre but V≠0.', 'Do a numerical example: Earth M=6×10^24 kg, R=6.4×10^6 m. V_surface = -6.25×10^7 J/kg, V_centre = -9.38×10^7 J/kg.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_010', difficulty: 'standard',
          question: 'Escape velocity is the minimum speed required for an object to escape the.',
          hint: 'If stuck, revisit gravitational potential energy (c11_phy_cbse_07_008) and the.',
          misconception: 'Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity.',
          parts: [
                { id: 'a', prompt: 'State the formula for escape velocity from the surface of a planet of mass M and radius R. Write the SI unit of each quantity in the formula.', answer: 'The formula is \\(v_e = \\sqrt{\\frac{2GM}{R}}\\)',
                  options: ['The formula is \\(v_e = \\sqrt{\\frac{2GM}{R}}\\)', 'break free', 'escaped', 'a satellite orbiting at 7'],
                  hint: 'If stuck, revisit gravitational potential energy (c11_phy_cbse_07_008) and the work-energy theorem.',
                  misconception: 'Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity becomes zero at that.' },
                { id: 'b', prompt: 'Calculate the escape velocity from the surface of Mars given: mass of Mars \\(M = 6.42 \\times 10^{23}\\) kg, radius of Mars \\(R = 3.39 \\times 10^6\\) m, \\(G.', answer: 'Step 1: Identify formula \\(v_e = \\sqrt{2GM/R}\\)',
                  options: ['Step 1: Identify formula \\(v_e = \\sqrt{2GM/R}\\)', 'break free', 'escaped', 'a satellite orbiting at 7'],
                  hint: 'If stuck, revisit gravitational potential energy (c11_phy_cbse_07_008) and the work-energy theorem.',
                  misconception: 'Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity becomes zero at that.' },
                { id: 'c', prompt: 'A projectile is fired from Earth\'s surface with speed 15 km/s. Ignoring atmospheric drag and other celestial bodies, will it escape Earth\'s gravity?', answer: 'Yes, because 15 km/s > 11.2 km/s',
                  options: ['Yes, because 15 km/s > 11.2 km/s', 'break free', 'escaped', 'a satellite orbiting at 7'],
                  hint: 'If stuck, revisit gravitational potential energy (c11_phy_cbse_07_008) and the work-energy theorem.',
                  misconception: 'Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity becomes zero at that.' }
          ],
            remediations: { 'escape-velocity-is-the-speed': { steps: ['If a student holds the above misconceptions: 1.', 'Re-derive escape velocity from the energy equation \\(\\frac{1}{2}mv^2 + U(r) = E\\), plotting \\(U(r) = -GMm/r\\) and.', 'Emphasise that at \\(E=0\\), \\(v_\\infty = 0\\) but \\(F \\neq 0\\).', 'Contrast with orbital velocity: for a circular orbit, \\(v_o = \\sqrt{GM/R}\\); total energy \\(E = -\\frac{GMm}{2R} < 0\\).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_011', difficulty: 'standard',
          question: 'Orbital velocity is the minimum horizontal velocity required for a satellite.',
          hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal.',
          misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity".',
          parts: [
                { id: 'a', prompt: 'What is the orbital velocity of a satellite in a circular orbit just above Earth\'s surface (h ≈ 0)?', answer: 'v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s',
                  options: ['v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s', 'space has no gravity', 'satellites float'],
                  hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal gravitation (this.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'b', prompt: 'A student claims: "If we double the altitude of a satellite, its orbital velocity becomes half." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'space has no gravity', 'satellites float'],
                  hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal gravitation (this.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'c', prompt: 'Calculate the orbital period of a satellite at height h = 400 km above Earth\'s surface. Given: G = 6.67×10⁻¹¹ N·m²/kg², M_E = 6.0×10²⁴ kg, R_E = 6400 km.', answer: 'r = 6400 + 400 = 6800 km = 6.8×10⁶ m',
                  options: ['r = 6400 + 400 = 6800 km = 6.8×10⁶ m', 'space has no gravity', 'satellites float'],
                  hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal gravitation (this.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'd', prompt: 'Two satellites A and B orbit Earth in circular orbits. Satellite A is at altitude h_A = 200 km, satellite B at h_B = 800 km.', answer: 'v_A > v_B because v ∝ 1/√r and r_A < r_B',
                  options: ['v_A > v_B because v ∝ 1/√r and r_A < r_B', 'space has no gravity', 'satellites float'],
                  hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal gravitation (this.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' }
          ],
            remediations: { 'orbital-velocity-is-constant-for': { steps: ['Calculate g at ISS altitude: g\' = g(R_E/(R_E+h))² = 9.8×(6400/6800)² ≈ 8.7 m/s².', 'Show that if gravity were zero, the satellite would move in a straight line (Newton\'s first law), not a circle.', 'Demonstrate with a ball on a string: tension (gravity) provides centripetal force; cut the string (remove gravity) and.', 'Re-derive v = √(GM_E/r) emphasizing F_g = F_c.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_012', difficulty: 'standard',
          question: 'A geostationary satellite orbits Earth in the equatorial plane at an altitude.',
          hint: 'Review the derivation of orbital velocity and period in node c11_phy_cbse_07_011.',
          misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).',
          parts: [
                { id: 'a', prompt: 'Why can a single geostationary satellite not provide continuous communication coverage for the polar regions (latitudes above 81°)? Explain using geometry.', answer: 'A geostationary satellite lies in the equatorial plane',
                  options: ['A geostationary satellite lies in the equatorial plane', 'signal too weak', 'stationary in space', 'stationary relative to Earth'],
                  hint: 'Review the derivation of orbital velocity and period in node c11_phy_cbse_07_011, especially the.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' },
                { id: 'b', prompt: 'A polar remote-sensing satellite orbits at 720 km altitude. Calculate its orbital period in minutes.', answer: 'Step 1: Orbital radius r = Rₑ + h = 6400 km + 720 km = 7120 km = 7.12 × 10⁶ m',
                  options: ['Step 1: Orbital radius r = Rₑ + h = 6400 km + 720 km = 7120 km = 7.12 × 10⁶ m', 'stationary in space', 'stationary relative to Earth', 'zero velocity'],
                  hint: 'Review the derivation of orbital velocity and period in node c11_phy_cbse_07_011, especially the.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' }
          ],
            remediations: { 'a-geostationary-satellite-is-stationary': { steps: ['Demonstrate with a globe and a string: tie string to equator (geostationary) — it stays over one spot as you rotate the.', 'Tilt the string to 30° — the contact point moves north-south.', 'Use a polar orbit simulation (e.g., NASA\'s Eyes) to show the ground track shifting.', 'Calculate the orbital speed at geostationary height: v = 2πr/T = 2π×4.2164×10⁷/86400 ≈ 3070 m/s.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
