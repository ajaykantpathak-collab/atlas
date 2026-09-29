import type { SimDef } from '../../engine/types';
import C11_PhysicsGeostationarySatellitesSim from '../../../simulations/c6_12/C11_PhysicsGeostationarySatellitesSim';

/** v3 wrapped master — C11_PhysicsGeostationarySatellitesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsgeostationarysatellitessim: SimDef = {
    id: 'v3w_c11_physicsgeostationarysatellitessim',
    title: 'Orbital Velocity and Period of Satellite',
    subtitle: 'Covers circular orbits only; elliptical orbits are addressed in Kepler\'s laws node.',
    classLevel: 11, subject: 'physics', topic: 'Orbital Velocity and Period of Satellite',
    chapters: [],
    nodeIds: ['c11_phy_cbse_07_011', 'c11_phy_cbse_07_012', 'c11_phy_cbse_07_001', 'c11_phy_cbse_07_013', 'c11_phy_cbse_07_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Watch a video of the International Space Station passing overhead — it moves at about 7.7 km/s at 400 km.', goal: 'Master Orbital Velocity and Period of Satellite.' },
    discovery: {
        question: 'What is the orbital velocity of a satellite in a circular orbit just above Earth\'s surface (h ≈ 0)?',
        options: ['v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s', 'space has no gravity', 'satellites float'],
        answer: 'v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s',
        hook: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity".',
    },
    teaching: [
        { title: 'Orbital velocity is the minimum horizontal.', text: 'Orbital velocity is the minimum horizontal velocity required for a satellite to maintain a stable circular orbit around Earth at a given altitude, where the gravitational force provides exactly the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_011', title: 'Orbital velocity is the minimum.',
          scaffold: { problem: 'The Indian Remote Sensing satellite IRS-1A orbits at an altitude of 817 km. Calculate its orbital velocity and period.',
            steps: [
            { text: 'Identify given quantities: h = 817 km = 8.17×10⁵ m, R_E = 6370 km = 6.37×10⁶ m, G = 6.67×10⁻¹¹ N·m²/kg², M_E =.' },
            { text: 'Compute orbital radius r = R_E + h = 6.37×10⁶ + 8.17×10⁵ = 7.187×10⁶ m. Verify unit: m.' },
            { text: 'Calculate v = √(GM_E/r) = √((6.67×10⁻¹¹ × 5.97×10²⁴) / 7.187×10⁶) = √(3.98×10¹⁴ / 7.187×10⁶) = √(5.54×10⁷) = 7443 m/s ≈.' },
            { text: 'Calculate T = 2πr/v = 2π × 7.187×10⁶ / 7443 = 4.514×10⁷ / 7443 = 6065 s. Convert to minutes: 6065/60 = 101.1 minutes.' },
            { text: 'Verify reasonableness: ISS at 400 km has v ≈ 7.7 km/s, T ≈ 93 min. Higher altitude → lower v, longer T.', faded: true, blankAnswer: 'v = 7.44 km/s, T = 101.1 minutes (6065 s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_012', title: 'A geostationary satellite orbits Earth.',
          scaffold: { problem: 'Calculate the height above Earth\'s surface at which a satellite must orbit to be geostationary.',
            steps: [
            { text: 'Identify given: T = 24 h = 86,400 s, G, Mₑ, Rₑ = 6.4 × 10⁶ m. Find h.' },
            { text: 'Use Kepler\'s third law for circular orbits: T² = (4π²/GMₑ) r³ → r³ = GMₑT²/(4π²).' },
            { text: 'Compute GMₑ = (6.67×10⁻¹¹)(6.0×10²⁴) = 4.002×10¹⁴ m³/s². T² = (86,400)² = 7.465×10⁹ s².' },
            { text: 'r³ = (4.002×10¹⁴ × 7.465×10⁹) / (4 × π²) = (2.987×10²⁴) / 39.48 = 7.57×10²² m³.' },
            { text: 'r = (7.57×10²²)^(1/3) = 4.23×10⁷ m = 42,300 km. h = r - Rₑ = 42,300 - 6,400 = 35,900 km.' },
            { text: 'Check: Known value is ~35,786 km. Our approximation (using g=9.8, R=6400 km) gives 35,900 km — physically reasonable.', faded: true, blankAnswer: 'h ≈ 35,900 km (≈ 35,786 km with precise values)' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_07_001', title: 'Kepler\'s laws of planetary motion are.',
          caseStudy: { intro: 'Begin by asking students to observe the night sky over several weeks (or use a free planetarium app like Stellarium) and note that planets like Mars or Jupiter.',
            decisions: [{ prompt: 'State Kepler\'s three laws of planetary motion in your own words, using the terms *ellipse*, *focus*, *radius vector*, *semi-major axis*,.', options: [
                { text: '**Correct answer:** 1', outcome: '**Correct answer:** 1. **Law of Orbits:** Planets orbit the Sun in ellipses with the Sun at one.' },
                { text: 'circular orbits', outcome: 'Not quite — **Misconception:** "Kepler\'s first law says planets move in ellipses, so the Sun is at the *center*.', reveals: 'misconception-kepler-s-first-law' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_013', title: 'Weightlessness in satellites is the.',
          scaffold: { problem: 'An astronaut of mass 70 kg is in a satellite orbiting Earth at a height of 400 km.',
            steps: [
            { text: 'Convert height to meters: h = 400 km = 4.00×10⁵ m. R_E = 6400 km = 6.4×10⁶ m. Orbital radius r = R_E + h = 6.8×10⁶ m.' },
            { text: 'Calculate g\' at that height: g\' = G M_E / r² = (6.67×10⁻¹¹ × 6.0×10²⁴) / (6.8×10⁶)².' },
            { text: 'Compute numerator: 6.67×10⁻¹¹ × 6.0×10²⁴ = 4.002×10¹⁴. Denominator: (6.8×10⁶)² = 4.624×10¹³.' },
            { text: 'True weight = m g\' = 70 kg × 8.65 m/s² = 605.5 N.' },
            { text: 'Apparent weight = 0 N because satellite and astronaut are in free fall (a = g\').', faded: true, blankAnswer: '(a) True weight = 606 N (approx), (b) Apparent weight = 0 N.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_014', title: 'The total mechanical energy of a.',
          scaffold: { problem: 'The Indian satellite INSAT-3D (mass 2000 kg) is in a geostationary orbit at height 35,786 km above Earth\'s surface.',
            steps: [
            { text: 'Identify given quantities: m = 2000 kg, h = 35,786 km = 3.5786 × 10⁷ m, Rₑ = 6.37 × 10⁶ m, Mₑ = 5.97 × 10²⁴ kg, G =.' },
            { text: 'Compute orbital radius r = Rₑ + h = 6.37×10⁶ + 3.5786×10⁷ = 4.2156 × 10⁷ m. Check: geostationary radius ~42,164 km ✓' },
            { text: 'Calculate GMₑm = (6.67×10⁻¹¹) × (5.97×10²⁴) × (2000) = 7.966 × 10¹⁷ N·m²/kg' },
            { text: 'K = GMₑm/(2r) = 7.966×10¹⁷ / (2 × 4.2156×10⁷) = 9.45 × 10⁹ J. U = -GMₑm/r = -2K = -1.89 × 10¹⁰ J.' },
            { text: 'Verify: U = 2E, K = -E, E < 0 (bound orbit). All energies in joules. Magnitudes reasonable for geostationary satellite.', faded: true, blankAnswer: 'K = 9.45 × 10⁹ J, U = -1.89 × 10¹⁰ J, E = -9.45 × 10⁹ J' }
            ] } }
    ],
    explore: { component: C11_PhysicsGeostationarySatellitesSim, prompt: 'Explore the interactive — Orbital Velocity and Period of Satellite' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_011', difficulty: 'standard',
          question: 'Orbital velocity is the minimum horizontal velocity required for a satellite to.',
          hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal.',
          misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity".',
          parts: [
                { id: 'a', prompt: 'What is the orbital velocity of a satellite in a circular orbit just above Earth\'s surface (h ≈ 0)?', answer: 'v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s',
                  options: ['v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'b', prompt: 'A student claims: "If we double the altitude of a satellite, its orbital velocity becomes half." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'c', prompt: 'Calculate the orbital period of a satellite at height h = 400 km above Earth\'s surface. Given: G = 6.67×10⁻¹¹ N·m²/kg², M_E = 6.0×10²⁴ kg, R_E = 6400 km.', answer: 'r = 6400 + 400 = 6800 km = 6.8×10⁶ m',
                  options: ['r = 6400 + 400 = 6800 km = 6.8×10⁶ m', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' }
          ],
            remediations: { 'orbital-velocity-is-constant-for': { steps: ['Calculate g at ISS altitude: g\' = g(R_E/(R_E+h))² = 9.8×(6400/6800)² ≈ 8.7 m/s².', 'Show that if gravity were zero, the satellite would move in a straight line (Newton\'s first law), not a circle.', 'Demonstrate with a ball on a string: tension (gravity) provides centripetal force; cut the string (remove gravity) and.', 'Re-derive v = √(GM_E/r) emphasizing F_g = F_c.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_012', difficulty: 'standard',
          question: 'A geostationary satellite orbits Earth in the equatorial plane at an altitude.',
          hint: 'Review the derivation of orbital velocity and period in node c11_phy_cbse_07_011,.',
          misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).',
          parts: [
                { id: 'a', prompt: 'Why can a single geostationary satellite not provide continuous communication coverage for the polar regions (latitudes above 81°)? Explain using geometry.', answer: 'A geostationary satellite lies in the equatorial plane',
                  options: ['A geostationary satellite lies in the equatorial plane', 'signal too weak', 'stationary in space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' },
                { id: 'b', prompt: 'A polar remote-sensing satellite orbits at 720 km altitude. Calculate its orbital period in minutes.', answer: 'Step 1: Orbital radius r = Rₑ + h = 6400 km + 720 km = 7120 km = 7.12 × 10⁶ m',
                  options: ['Step 1: Orbital radius r = Rₑ + h = 6400 km + 720 km = 7120 km = 7.12 × 10⁶ m', 'stationary in space', 'stationary relative to Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' }
          ],
            remediations: { 'a-geostationary-satellite-is-stationary': { steps: ['Demonstrate with a globe and a string: tie string to equator (geostationary) — it stays over one spot as you rotate the.', 'Tilt the string to 30° — the contact point moves north-south.', 'Use a polar orbit simulation (e.g., NASA\'s Eyes) to show the ground track shifting.', 'Calculate the orbital speed at geostationary height: v = 2πr/T = 2π×4.2164×10⁷/86400 ≈ 3070 m/s.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we launch a satellite at 35,786 km altitude but with an inclination of 30°, it will still be geostationary because the period is 24.', answer: 'The claim is false',
                  options: ['The claim is false', 'geosynchronous', 'geostationary', 'stationary in space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' },
                { id: 'b', prompt: 'Design a simple observation activity using a smartphone app (e.g., Satellite Tracker or Heavens-Above) to distinguish a geostationary satellite from a polar.', answer: 'Record: (1) Time, azimuth, elevation of a bright satellite (e.g., INSAT-3D for',
                  options: ['Record: (1) Time, azimuth, elevation of a bright satellite (e.g., INSAT-3D for', 'watch for a week and see', 'stationary in space', 'stationary relative to Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a geostationary satellite is "stationary in space" (i.e., not moving).' }
          ],
            remediations: { 'a-geostationary-satellite-is-stationary': { steps: ['Demonstrate with a globe and a string: tie string to equator (geostationary) — it stays over one spot as you rotate the.', 'Tilt the string to 30° — the contact point moves north-south.', 'Use a polar orbit simulation (e.g., NASA\'s Eyes) to show the ground track shifting.', 'Calculate the orbital speed at geostationary height: v = 2πr/T = 2π×4.2164×10⁷/86400 ≈ 3070 m/s.'] } } },
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
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_013', difficulty: 'standard',
          question: 'Weightlessness in satellites is the condition where an astronaut (or any.',
          hint: 'If stuck, revisit Newton\'s second law (c9_physics_ch3_4) and uniform circular motion.',
          misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).',
          parts: [
                { id: 'a', prompt: 'A satellite of mass 500 kg orbits Earth at height 400 km. Calculate the gravitational force (true weight) on the satellite.', answer: 'Step 1: Orbital radius r = R_E + h = 6.4×10⁶ m + 4.0×10⁵ m = 6.8×10⁶ m',
                  options: ['Step 1: Orbital radius r = R_E + h = 6.4×10⁶ m + 4.0×10⁵ m = 6.8×10⁶ m', 'weightlessness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' },
                { id: 'b', prompt: 'Compare the apparent weight of an astronaut in three situations: (a) standing on Earth\'s surface, (b) in a satellite in circular orbit, (c) in a freely falling.', answer: 'standing on Earth\'s surface, (',
                  options: ['standing on Earth\'s surface, (', 'weightlessness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' }
          ],
            remediations: { 'weightlessness-means-there-is-no': { steps: ['Ask them to calculate g\' at h = 400 km using g\' = g(R_E/(R_E+h))². They will find g\' ≈ 8.7 m/s², not zero.', 'Use the elevator analogy: In a freely falling elevator, you feel weightless but gravity still pulls you down.', 'Emphasize that a spring balance measures contact force, not gravitational force.', 'Have them draw free-body diagrams for an astronaut on Earth (N = mg) and in orbit (N = 0, mg\' provides centripetal.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Astronauts in the International Space Station are weightless because they are far from Earth and gravity is negligible." Correct it.', answer: 'The statement is false',
                  options: ['The statement is false', 'weightlessness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' },
                { id: 'b', prompt: 'Design a simple experiment using a spring balance and a mass to demonstrate weightlessness in free fall.', answer: 'Setup: Attach a 1 kg mass to a spring balance calibrated in newtons',
                  options: ['Setup: Attach a 1 kg mass to a spring balance calibrated in newtons', 'weightlessness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' },
                { id: 'c', prompt: 'Compare the apparent weight of an astronaut in three situations: (a) standing on Earth\'s surface, (b) in a satellite in circular orbit, (c) in a freely falling.', answer: 'standing on Earth\'s surface, (',
                  options: ['standing on Earth\'s surface, (', 'weightlessness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weightlessness" means there is no gravitational force acting on the astronaut (zero gravity).' }
          ],
            remediations: { 'weightlessness-means-there-is-no': { steps: ['Ask them to calculate g\' at h = 400 km using g\' = g(R_E/(R_E+h))². They will find g\' ≈ 8.7 m/s², not zero.', 'Use the elevator analogy: In a freely falling elevator, you feel weightless but gravity still pulls you down.', 'Emphasize that a spring balance measures contact force, not gravitational force.', 'Have them draw free-body diagrams for an astronaut on Earth (N = mg) and in orbit (N = 0, mg\' provides centripetal.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_014', difficulty: 'standard',
          question: 'The total mechanical energy of a satellite in a stable orbit around Earth is.',
          hint: 'Review orbital velocity derivation (c11_phy_cbse_07_011) and gravitational potential.',
          misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will.',
          parts: [
                { id: 'a', prompt: 'What is the total mechanical energy of a 500 kg satellite in a circular orbit at a height of 400 km above Earth\'s surface?', answer: '-1.45 × 10¹⁰ J',
                  options: ['-1.45 × 10¹⁰ J', 'negative total energy', 'less than zero energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'b', prompt: 'A satellite in circular orbit has kinetic energy K and potential energy U. If the satellite\'s orbital radius is doubled, what happens to the ratio |U|/K?', answer: 'The ratio |U|/K remains exactly 2 for any circular orbit radius',
                  options: ['The ratio |U|/K remains exactly 2 for any circular orbit radius', 'negative total energy', 'less than zero energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'c', prompt: 'Calculate the minimum energy required to transfer a 1000 kg satellite from a circular orbit of radius 2Rₑ to a circular orbit of radius 4Rₑ.', answer: 'ΔE = +3.14 × 10⁹ J, ΔK = -3.14 × 10⁹ J, ΔU = +6.27 × 10⁹ J',
                  options: ['ΔE = +3.14 × 10⁹ J, ΔK = -3.14 × 10⁹ J, ΔU = +6.27 × 10⁹ J', 'negative total energy', 'less than zero energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' }
          ],
            remediations: { 'negative-total-energy-means-the': { steps: ['Revisit gravitational potential energy definition (c11_phy_cbse_07_008) - emphasize U = 0 at infinity, negative at.', 'Derive orbital velocity v = √(GM/r) again (c11_phy_cbse_07_011) and compute K = ½mv² to see K ∝ 1/r.', 'Plot E, K, U vs r on same graph to visualize: all negative, E and U become less negative (increase) with r, K decreases.', 'Do Example 7.8 from NCERT numerically to see energy transfer mechanics.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since the total energy of an orbiting satellite is negative, the satellite must be losing energy continuously and will eventually spiral.', answer: 'The statement is false',
                  options: ['The statement is false', 'negative energy', 'decreasing energy', 'negative total energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' },
                { id: 'b', prompt: 'Design a thought experiment: You have a satellite in circular orbit at height h.', answer: 'Not possible with one burn',
                  options: ['Not possible with one burn', 'negative total energy', 'less than zero energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "negative total energy" means the satellite has "less than zero energy" in an absolute sense and will fall to Earth.' }
          ],
            remediations: { 'negative-total-energy-means-the': { steps: ['Revisit gravitational potential energy definition (c11_phy_cbse_07_008) - emphasize U = 0 at infinity, negative at.', 'Derive orbital velocity v = √(GM/r) again (c11_phy_cbse_07_011) and compute K = ½mv² to see K ∝ 1/r.', 'Plot E, K, U vs r on same graph to visualize: all negative, E and U become less negative (increase) with r, K decreases.', 'Do Example 7.8 from NCERT numerically to see energy transfer mechanics.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
