import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch07_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch07_p3: SimDef = {
    id: 'v3_c11_phy_ch07_p3',
    title: 'Gravitation · Part 3/3',
    subtitle: 'Halve the guess, quarter the force — gravity squares, not halves.',
    classLevel: 11, subject: 'physics', topic: 'Gravitation · Part 3/3',
    chapters: ['c11_phy_ch07'],
    nodeIds: ['c11_phy_cbse_07_013', 'c11_phy_cbse_07_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an astronomer checking Newton\'s inverse-square arithmetic', intro: 'The apple falls and the Moon doesn\'t — yet the same pull, weakened 3600-fold over 60 Earth-radii, explains both.', goal: 'Apply the inverse-square law and Kepler\'s laws correctly, distinguishing G from g.' },
    discovery: {
        question: 'Two 1 kg masses at 1 m pull each other with 6.67 × 10⁻¹¹ N. Double the distance — the force halves?',
        options: ['No — gravity is inverse-square: twice the distance means one quarter the force, 1.67 × 10⁻¹¹ N', 'Yes — force shrinks linearly with distance', 'Yes — 3.33 × 10⁻¹¹ N', 'No — it drops to zero beyond a metre'],
        answer: 'No — gravity is inverse-square: twice the distance means one quarter the force, 1.67 × 10⁻¹¹ N',
        hook: 'And the Sun is not at the centre of the ellipse — it sits at a focus; symmetry of the orbit is not symmetry of the pull.',
    },
    teaching: [
        { title: 'Weightlessness in Satellites', text: 'Weightlessness in satellites is the condition where an astronaut (or any object) inside an orbiting satellite experiences zero contact force (normal force) from the satellite surface because both the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_07_013', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Test Kepler\'s second law against a \'symmetric halves take equal time\' claim, then judge whether two students on a bench really do attract each other.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_013', title: 'Weightlessness in Satellites',
          scaffold: { problem: 'An astronaut of mass 70 kg is in a satellite orbiting Earth at a height of 400 km.',
            steps: [
            { text: 'Convert height to meters: h = 400 km = 4.00×10⁵ m. R_E = 6400 km = 6.4×10⁶ m. Orbital radius r = R_E + h = 6.8×10⁶ m.' },
            { text: 'Calculate g\' at that height: g\' = G M_E / r² = (6.67×10⁻¹¹ × 6.0×10²⁴) / (6.8×10⁶)².' },
            { text: 'Compute numerator: 6.67×10⁻¹¹ × 6.0×10²⁴ = 4.002×10¹⁴. Denominator: (6.8×10⁶)² = 4.624×10¹³.' },
            { text: 'True weight = m g\' = 70 kg × 8.65 m/s² = 605.5 N.' },
            { text: 'Apparent weight = 0 N because satellite and astronaut are in free fall (a = g\').', faded: true, blankAnswer: '(a) True weight = 606 N (approx), (b) Apparent weight = 0 N.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_014', title: 'Energy of an Orbiting Satellite',
          scaffold: { problem: 'The Indian satellite INSAT-3D (mass 2000 kg) is in a geostationary orbit at height 35,786 km above Earth\'s surface.',
            steps: [
            { text: 'Identify given quantities: m = 2000 kg, h = 35,786 km = 3.5786 × 10⁷ m, Rₑ = 6.37 × 10⁶ m, Mₑ = 5.97 × 10²⁴ kg,.' },
            { text: 'Compute orbital radius r = Rₑ + h = 6.37×10⁶ + 3.5786×10⁷ = 4.2156 × 10⁷ m. Check: geostationary radius ~42,164 km ✓' },
            { text: 'Calculate GMₑm = (6.67×10⁻¹¹) × (5.97×10²⁴) × (2000) = 7.966 × 10¹⁷ N·m²/kg' },
            { text: 'K = GMₑm/(2r) = 7.966×10¹⁷ / (2 × 4.2156×10⁷) = 9.45 × 10⁹ J. U = -GMₑm/r = -2K = -1.89 × 10¹⁰ J.' },
            { text: 'Verify: U = 2E, K = -E, E < 0 (bound orbit). All energies in joules. Magnitudes reasonable for geostationary satellite.', faded: true, blankAnswer: 'K = 9.45 × 10⁹ J, U = -1.89 × 10¹⁰ J, E = -9.45 × 10⁹ J' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Drawing the solar system for a poster, a student puts the Sun at the ellipse\'s centre, measures the semi-major axis from there, and in a gravity problem uses g = 9.8 in place of G — \'same thing, gravity constant.\'',
            decisions: [{ prompt: 'What do Kepler and Newton actually specify?', options: [
                { text: 'Fix the geometry and the constants: the Sun sits at a FOCUS of the ellipse, not the centre — that\'s why perihelion and aphelion differ and equal areas sweep in equal times. And G (6.67×10⁻¹¹ N·m²/kg²) is the universal constant in F = Gm₁m₂/r²; g = 9.8 m/s² is Earth\'s local surface acceleration — derived from G, not interchangeable with it.', outcome: 'The poster and the problem both correct: focus for the Sun, G for the universal law, g for the local consequence.' },
                { text: 'Keep the Sun at the centre — a focus is just the middle of an ellipse.', outcome: 'Centre ≠ focus: placing the Sun centrally makes the planet-distance uniform and destroys the area law\'s varying radius vector.', reveals: 'sun-at-ellipse-centre' },
                { text: 'Swap g for G — both are \'the gravity constant\', so either works in the formula.', outcome: 'They differ in kind and scale: G is universal and tiny; g is Earth\'s local field strength — substituting one for the other wrecks both formula and units.', reveals: 'g-equals-big-g' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_07_014', title: 'You made it',
          caseStudy: { intro: 'The Moon\'s acceleration is g/3600 — matching the distance ratio squared; Newton unified the falling apple and the unfalling Moon with one law.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_013', difficulty: 'standard',
          question: 'Weightlessness in satellites is the condition where an astronaut (or any.',
          hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
          misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).',
          parts: [
                { id: 'a', prompt: 'A satellite of mass 500 kg orbits Earth at height 400 km. Calculate the gravitational force (true weight) on the satellite.', answer: 'Step 1: Orbital radius r = R_E + h = 6.4×10⁶ m + 4.0×10⁵ m = 6.8×10⁶ m',
                  options: ['Step 1: Orbital radius r = R_E + h = 6.4×10⁶ m + 4.0×10⁵ m = 6.8×10⁶ m', 'weightlessness'],
                  hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' },
                { id: 'b', prompt: 'Compare the apparent weight of an astronaut in three situations: (a) standing on Earth\'s surface, (b) in a satellite in circular orbit, (c) in a freely falling.', answer: 'standing on Earth\'s surface, (',
                  options: ['standing on Earth\'s surface, (', 'weightlessness'],
                  hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' }
          ],
            remediations: { 'weightlessness-means-there-is-no': { steps: ['Ask them to calculate g\' at h = 400 km using g\' = g(R_E/(R_E+h))². They will find g\' ≈ 8.7 m/s², not zero.', 'Use the elevator analogy: In a freely falling elevator, you feel weightless but gravity still pulls you down.', 'Emphasize that a spring balance measures contact force, not gravitational force.', 'Have them draw free-body diagrams for an astronaut on Earth (N = mg) and in orbit (N = 0, mg\' provides centripetal.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Astronauts in the International Space Station are weightless because they are far from Earth and gravity is negligible." Correct.', answer: 'The statement is false',
                  options: ['The statement is false', 'weightlessness'],
                  hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' },
                { id: 'b', prompt: 'Design a simple experiment using a spring balance and a mass to demonstrate weightlessness in free fall.', answer: 'Setup: Attach a 1 kg mass to a spring balance calibrated in newtons',
                  options: ['Setup: Attach a 1 kg mass to a spring balance calibrated in newtons', 'weightlessness'],
                  hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' }
          ],
            remediations: { 'weightlessness-means-there-is-no': { steps: ['Ask them to calculate g\' at h = 400 km using g\' = g(R_E/(R_E+h))². They will find g\' ≈ 8.7 m/s², not zero.', 'Use the elevator analogy: In a freely falling elevator, you feel weightless but gravity still pulls you down.', 'Emphasize that a spring balance measures contact force, not gravitational force.', 'Have them draw free-body diagrams for an astronaut on Earth (N = mg) and in orbit (N = 0, mg\' provides centripetal.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_014', difficulty: 'standard',
          question: 'The total mechanical energy of a satellite in a stable orbit around Earth.',
          hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential.',
          misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will.',
          parts: [
                { id: 'a', prompt: 'What is the total mechanical energy of a 500 kg satellite in a circular orbit at a height of 400 km above Earth\'s surface?', answer: '-1.45 × 10¹⁰ J',
                  options: ['-1.45 × 10¹⁰ J', 'negative total energy', 'less than zero energy'],
                  hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential energy sign.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'b', prompt: 'A satellite in circular orbit has kinetic energy K and potential energy U. If the satellite\'s orbital radius is doubled, what happens to the ratio |U|/K?', answer: 'The ratio |U|/K remains exactly 2 for any circular orbit radius',
                  options: ['The ratio |U|/K remains exactly 2 for any circular orbit radius', 'negative total energy', 'less than zero energy'],
                  hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential energy sign.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'c', prompt: 'Calculate the minimum energy required to transfer a 1000 kg satellite from a circular orbit of radius 2Rₑ to a circular orbit of radius 4Rₑ.', answer: 'ΔE = +3.14 × 10⁹ J, ΔK = -3.14 × 10⁹ J, ΔU = +6.27 × 10⁹ J',
                  options: ['ΔE = +3.14 × 10⁹ J, ΔK = -3.14 × 10⁹ J, ΔU = +6.27 × 10⁹ J', 'negative total energy', 'less than zero energy'],
                  hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential energy sign.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'd', prompt: 'Two identical satellites orbit Earth: Satellite A in a circular orbit of radius r, Satellite B in an elliptical orbit with the same semi-major axis a = r.', answer: 'Total energies are equal (both = -GMm/(2r))',
                  options: ['Total energies are equal (both = -GMm/(2r))', 'negative total energy', 'less than zero energy'],
                  hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential energy sign.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' }
          ],
            remediations: { 'negative-total-energy-means-the': { steps: ['Revisit gravitational potential energy definition (c11_phy_cbse_07_008) - emphasize U = 0 at infinity, negative.', 'Derive orbital velocity v = √(GM/r) again (c11_phy_cbse_07_011) and compute K = ½mv² to see K ∝ 1/r.', 'Plot E, K, U vs r on same graph to visualize: all negative, E and U become less negative (increase) with r, K decreases.', 'Do Example 7.8 from NCERT numerically to see energy transfer mechanics.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
