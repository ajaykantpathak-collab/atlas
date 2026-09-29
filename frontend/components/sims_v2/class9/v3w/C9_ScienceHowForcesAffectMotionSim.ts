import type { SimDef } from '../../engine/types';
import C9_ScienceHowForcesAffectMotionSim from '../../../simulations/c6_12/C9_ScienceHowForcesAffectMotionSim';

/** v3 wrapped master — C9_ScienceHowForcesAffectMotionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencehowforcesaffectmotionsim: SimDef = {
    id: 'v3w_c9_sciencehowforcesaffectmotionsim',
    title: 'Work-Energy Theorem: Statement and Meaning',
    subtitle: 'This node covers the statement, meaning, and scalar nature of the Work-Energy Theorem for.',
    classLevel: 9, subject: 'science', topic: 'Work-Energy Theorem: Statement and Meaning',
    chapters: [],
    nodeIds: ['c9_physics_ch4_3', 'c9_physics_ch4_2', 'c9_physics_ch4_7', 'c10_phy_cbse_01_004', 'c9_physics_ch5_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe a cricket ball being hit by a bat: the ball starts from rest and gains high speed.', goal: 'Master Work-Energy Theorem: Statement and Meaning.' },
    discovery: {
        question: 'A 2 kg block slides on a rough horizontal floor. An applied force of 10 N acts forward, and kinetic friction of 4 N acts backward. The block moves 5 m.',
        options: ['The theorem uses *net work*, not work by a single force', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
        answer: 'The theorem uses *net work*, not work by a single force',
        hook: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity =.',
    },
    teaching: [
        { title: 'The Work-Energy Theorem states that the net.', text: 'The Work-Energy Theorem states that the net work done by all forces acting on an object is equal to the change in its kinetic energy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch4_3', title: 'The Work-Energy Theorem states that the.',
          scaffold: { problem: 'A 200 g cricket ball is bowled at 30 m/s. The batsman hits it straight back at 40 m/s. The contact time is 0.01 s.',
            steps: [
            { text: 'Identify given: \\(m = 200\\,\\text{g} = 0.2\\,\\text{kg}\\), \\(u = +30\\,\\text{m/s}\\) (towards batsman), \\(v =.' },
            { text: 'Apply Work-Energy Theorem: \\(W_{\\text{net}} = \\frac{1}{2}m(v^2 - u^2)\\).' },
            { text: 'Compute: \\(W_{\\text{net}} = 0.5 \\times 0.2 \\times (40^2 - 30^2) = 0.1 \\times (1600 - 900) = 0.1 \\times 700 =.' },
            { text: 'For average force: \\(W_{\\text{net}} = F_{\\text{avg}} \\times s\\) (force and displacement in same direction during.' },
            { text: 'Verify: 70 J is reasonable for a cricket ball; 700 N ≈ 70 kg-weight, plausible for a bat impact.', faded: true, blankAnswer: '(a) 70 J, (b) 700 N' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_2', title: 'Work done by a force is zero when the.',
          scaffold: { problem: 'A 200 g stone is tied to a 1.5 m long string and whirled in a horizontal circle at a constant speed of 4 m/s.',
            steps: [
            { text: 'Identify given quantities: mass m = 200 g = 0.2 kg, radius r = 1.5 m, speed v = 4 m/s, tension T = 2.13 N.' },
            { text: 'Recall work formula W = F·s·cosθ. In circular motion, tension is always radial (toward centre), displacement is.' },
            { text: 'For (a) full revolution: displacement over full circle is zero (returns to start), but work is path integral.' },
            { text: 'For (b) quarter revolution: same reasoning — at every point on the quarter arc, tension ⟂ displacement → dW = 0 → total.' },
            { text: 'Verify: Speed is constant (4 m/s), so kinetic energy ½mv² = 0.5 × 0.2 × 16 = 1.6 J is unchanged.', faded: true, blankAnswer: '(a) 0 J, (b) 0 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_7', title: 'Mechanical energy is the total energy.',
          scaffold: { problem: 'A 50 g toy car is launched from a compressed spring on a horizontal frictionless track.',
            steps: [
            { text: 'Identify given quantities: mass m = 50 g = 0.05 kg, initial KE = 0.8 J, initial PE = 0 (reference at horizontal track),.' },
            { text: 'Apply mechanical energy conservation: Total ME = initial KE + initial PE = 0.8 J + 0 = 0.8 J.' },
            { text: '(a) At maximum height, v = 0 so KE = 0. Then ME = mgh_max → 0.8 = 0.05 × 10 × h_max → h_max = 0.8 / 0.5 = 1.6 m.' },
            { text: '(b) At h = 0.5 m, PE = mgh = 0.05 × 10 × 0.5 = 0.25 J. Then KE = ME - PE = 0.8 - 0.25 = 0.55 J.' },
            { text: 'Verify: At h=0.5 m, PE=0.25 J, KE=0.55 J, sum=0.8 J. At h_max=1.6 m, PE=0.05×10×1.6=0.8 J, KE=0. Both consistent.', faded: true, blankAnswer: '(a) Maximum height = 1.6 m; (b) Speed at height 0.5 m =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_004', title: 'Resistance is the property of a.',
          scaffold: { problem: 'A student connects a 12 V battery across a uniform wire of length 4 m and cross-sectional area 0.2 mm². The ammeter reads 0.6 A.',
            steps: [
            { text: 'Identify given quantities: V = 12 V, I = 0.6 A, L₁ = 4 m, A₁ = 0.2 mm² = 0.2 × 10⁻⁶ m², A₂ = 0.4 mm² = 0.4 × 10⁻⁶ m².' },
            { text: 'Use Ohm\'s law: R₁ = V/I = 12 V / 0.6 A = 20 Ω.' },
            { text: 'Resistance is inversely proportional to cross-sectional area: R ∝ 1/A. So R₂/R₁ = A₁/A₂ = (0.2)/(0.4) = 1/2.' },
            { text: 'Compute R₂ = R₁ × (1/2) = 20 Ω × 0.5 = 10 Ω.' },
            { text: 'Verify: thicker wire (double area) should have half the resistance. 10 Ω is half of 20 Ω, physically reasonable.', faded: true, blankAnswer: 'R₁ = 20 Ω, R₂ = 10 Ω' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_3', title: 'A sound wave is a longitudinal.',
          scaffold: { problem: 'A physics teacher stretches a slinky 4.0 m along the classroom floor.',
            steps: [
            { text: 'Identify given quantities: length of slinky L = 4.0 m, frequency f = 2.5 Hz, number of complete compressions visible =.' },
            { text: 'Recognise that 5 compressions mean 5 wavelengths fit in 4.0 m. So wavelength λ = L / 5 = 4.0 m / 5 = 0.80 m.' },
            { text: 'Use wave equation v = fλ. Check units: f in Hz = s⁻¹, λ in m, so v in m/s.' },
            { text: 'Substitute: v = (2.5 s⁻¹) × (0.80 m) = 2.0 m/s. Unit cancellation: s⁻¹ × m = m/s ✓.' },
            { text: 'Verify reasonableness: Slinky wave speeds are typically 1–5 m/s; 2.0 m/s is plausible for a loosely stretched spring.', faded: true, blankAnswer: '2.0 m/s' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch4_2', title: 'Identify each idea',
          dissect: { specimen: 'Work-Energy Theorem: Statement and Meaning', spots: [
            { id: 's1', label: 'The Work-Energy Theorem states that', prompt: 'Which idea is this? — The Work-Energy Theorem states that the net work done by all forces acting on an object.', answer: 'The Work-Energy Theorem states that', options: ['The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total', 'Resistance is the property of'] },
            { id: 's2', label: 'Work done by a force', prompt: 'Which idea is this? — Work done by a force is zero when the force applied on an object is perpendicular to the.', answer: 'Work done by a force', options: ['Work done by a force', 'The Work-Energy Theorem states that', 'Mechanical energy is the total', 'Resistance is the property of'] },
            { id: 's3', label: 'Mechanical energy is the total', prompt: 'Which idea is this? — Mechanical energy is the total energy possessed by an object due to its motion and.', answer: 'Mechanical energy is the total', options: ['Mechanical energy is the total', 'The Work-Energy Theorem states that', 'Work done by a force', 'Resistance is the property of'] },
            { id: 's4', label: 'Resistance is the property of', prompt: 'Which idea is this? — Resistance is the property of a conductor that opposes the flow of electric current.', answer: 'Resistance is the property of', options: ['Resistance is the property of', 'The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total'] },
            { id: 's5', label: 'A sound wave is a', prompt: 'Which idea is this? — A sound wave is a longitudinal mechanical wave in which particles of the medium oscillate.', answer: 'A sound wave is a', options: ['A sound wave is a', 'The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total'] }
          ] } }
    ],
    explore: { component: C9_ScienceHowForcesAffectMotionSim, prompt: 'Explore the interactive — Work-Energy Theorem: Statement and Meaning' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch4_3', difficulty: 'standard',
          question: 'The Work-Energy Theorem states that the net work done by all forces acting on.',
          hint: 'If stuck, revisit c9_physics_ch4_1 (work formula and sign conventions) and.',
          misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity =.',
          parts: [
                { id: 'a', prompt: 'A 2 kg block slides on a rough horizontal floor. An applied force of 10 N acts forward, and kinetic friction of 4 N acts backward. The block moves 5 m.', answer: 'The theorem uses *net work*, not work by a single force',
                  options: ['The theorem uses *net work*, not work by a single force', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' },
                { id: 'b', prompt: 'A 1500 kg car accelerates from 10 m/s to 25 m/s on a straight road. Calculate the net work done on the car. (Ignore unit conversion; answer in joules.)', answer: 'Given: \\(m = 1500\\,\\text{kg}\\), \\(u = 10\\,\\text{m/s}\\), \\(v = 25\\,\\text{m/s}\\)',
                  options: ['Given: \\(m = 1500\\,\\text{kg}\\), \\(u = 10\\,\\text{m/s}\\), \\(v = 25\\,\\text{m/s}\\)', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' },
                { id: 'c', prompt: 'Two identical trucks, one loaded (mass \\(2m\\)) and one empty (mass \\(m\\)), have the same net work done on them over the same distance. Both start from rest.', answer: 'Net work \\(W\\) is same for both',
                  options: ['Net work \\(W\\) is same for both', 'same speed because same work', 'work done by gravity = change in kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' }
          ],
            remediations: { 'the-work-energy-theorem-applies': { steps: ['Draw a free-body diagram showing *all* forces.', 'Calculate work done by *each* force separately (using \\(W = Fs\\cos\\theta\\)).', 'Sum them algebraically to get \\(W_{\\text{net}}\\).', 'Apply \\(W_{\\text{net}} = \\Delta K\\). Practice with a block pulled up a rough incline: list applied force, friction,.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity =.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "A 5 kg box is pushed with 20 N over 4 m on a frictionless surface. Find final speed." They write: \\(W = Fs = 80\\,\\text{J}\\).', answer: 'The solution is correct *only if* the box starts from rest (\\(u=0\\))',
                  options: ['The solution is correct *only if* the box starts from rest (\\(u=0\\))', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' }
          ],
            remediations: { 'the-work-energy-theorem-applies': { steps: ['Draw a free-body diagram showing *all* forces.', 'Calculate work done by *each* force separately (using \\(W = Fs\\cos\\theta\\)).', 'Sum them algebraically to get \\(W_{\\text{net}}\\).', 'Apply \\(W_{\\text{net}} = \\Delta K\\). Practice with a block pulled up a rough incline: list applied force, friction,.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_2', difficulty: 'standard',
          question: 'Work done by a force is zero when the force applied on an object is.',
          hint: 'Revisit c9_physics_ch4_1 (Work: Definition and Formula) to practice W = Fs cosθ with.',
          misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force.',
          parts: [
                { id: 'a', prompt: 'A coolie carries a 50 kg load on his head and walks horizontally at constant speed for 100 m. What is the work done by the coolie\'s upward force on the load?', answer: 'Work done = 0 J',
                  options: ['Work done = 0 J', 'a force is applied, so work must be done', 'keeps the object moving in a circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' },
                { id: 'b', prompt: 'A planet moves in a circular orbit around the Sun. The gravitational force is always directed toward the Sun.', answer: 'Work done is zero',
                  options: ['Work done is zero', 'gravity does work', 'a force is applied, so work must be done'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' },
                { id: 'c', prompt: 'A block of mass 2 kg slides on a frictionless horizontal table. A constant force of 10 N acts at 60° to the horizontal. The block moves 5 m horizontally.', answer: 'the applied force, (',
                  options: ['the applied force, (', 'a force is applied, so work must be done', 'keeps the object moving in a circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' }
          ],
            remediations: { 'a-force-is-applied': { steps: ['Hold a textbook horizontally and walk across the room at constant speed.', 'Swing a ball on a string horizontally. Mark a point on the string and time 10 revolutions. Calculate speed.', 'Draw force-displacement vectors at 4 points on a circle. Have students measure angle with protractor — always 90°.', 'Contrast with pushing a book horizontally (θ = 0°, work done) to cement the cosine factor difference.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In uniform circular motion, the centripetal force changes the direction of velocity, so it must be doing work because work is needed to.', answer: 'The statement is false',
                  options: ['The statement is false', 'change in velocity vector', 'change in speed', 'a force is applied, so work must be done'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' }
          ],
            remediations: { 'a-force-is-applied': { steps: ['Hold a textbook horizontally and walk across the room at constant speed.', 'Swing a ball on a string horizontally. Mark a point on the string and time 10 revolutions. Calculate speed.', 'Draw force-displacement vectors at 4 points on a circle. Have students measure angle with protractor — always 90°.', 'Contrast with pushing a book horizontally (θ = 0°, work done) to cement the cosine factor difference.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_7', difficulty: 'standard',
          question: 'Mechanical energy is the total energy possessed by an object due to its motion.',
          hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for.',
          misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or.',
          parts: [
                { id: 'a', prompt: 'State the formula for mechanical energy of an object of mass m moving with speed v at a height h above a chosen reference level. What is its SI unit?', answer: 'Mechanical energy = ½mv² + mgh',
                  options: ['Mechanical energy = ½mv² + mgh', 'mv² + mgh', '½mv² + ½mgh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'b', prompt: 'A 0.5 kg stone is dropped from a height of 20 m. Calculate its mechanical energy (i) at the start, (ii) after falling 5 m, and (iii) just before hitting the.', answer: '(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J',
                  options: ['(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J', 'the path length matters', 'the normal force does work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'c', prompt: 'Two identical balls are released from the same height: Ball A is dropped from rest, Ball B is thrown horizontally with speed 10 m/s.', answer: 'At release: Ball A has ME = mgh (KE=0)',
                  options: ['At release: Ball A has ME = mgh (KE=0)', 'both have same mechanical energy', 'the path length matters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' }
          ],
            remediations: { 'mechanical-energy-is-conserved-only': { steps: ['Place a dynamics cart on a frictionless air track inclined at 30°.', 'Mark three positions: top (h=0.5 m), middle (h=0.25 m), bottom (h=0).', 'Use a motion sensor to measure speed at each position.', 'Calculate KE=½mv² and PE=mgh at each point.', 'Show that KE+PE is constant (within sensor error).', 'Repeat with a curved track (same vertical drop) to demonstrate path independence.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a ball, a ramp, and a meter scale to demonstrate that mechanical energy is conserved when a ball rolls down a smooth incline.', answer: 'Set up a smooth ramp of length 2 m inclined at 30° (height 1 m)',
                  options: ['Set up a smooth ramp of length 2 m inclined at 30° (height 1 m)', 'the path length matters', 'the normal force does work', 'it travels farther'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' }
          ],
            remediations: { 'mechanical-energy-is-conserved-only': { steps: ['Place a dynamics cart on a frictionless air track inclined at 30°.', 'Mark three positions: top (h=0.5 m), middle (h=0.25 m), bottom (h=0).', 'Use a motion sensor to measure speed at each position.', 'Calculate KE=½mv² and PE=mgh at each point.', 'Show that KE+PE is constant (within sensor error).', 'Repeat with a curved track (same vertical drop) to demonstrate path independence.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_004', difficulty: 'standard',
          question: 'Resistance is the property of a conductor that opposes the flow of electric.',
          hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph.',
          misconception: 'Students often think that resistance depends only on the material and not on dimensions.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of resistance? Define resistance in terms of potential difference and current.', answer: 'The SI unit of resistance is the ohm (Ω)',
                  options: ['The SI unit of resistance is the ohm (Ω)', 'ampere', 'resistance depends only on the material and not on dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' },
                { id: 'b', prompt: 'A student says: "If I increase the length of a wire, its resistance decreases because the current has more space to flow." Explain why this statement is.', answer: 'Resistance is directly proportional to the length of the conductor',
                  options: ['Resistance is directly proportional to the length of the conductor', 'resistance depends only on the material and not on dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' },
                { id: 'c', prompt: 'A nichrome wire of length 2 m and cross-sectional area 0.5 mm² has a resistance of 10 Ω when a potential difference of 5 V is applied across it.', answer: 'Given: V = 5 V, R = 10 Ω',
                  options: ['Given: V = 5 V, R = 10 Ω', 'resistance depends only on the material and not on dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' }
          ],
            remediations: { 'resistance-depends-only-on-the': { steps: ['Revisit the water pipe analogy from Class 6 (c6_physics_ch03_014): a longer pipe offers more opposition to water flow;.', 'Perform a quick lab activity: take a uniform wire, measure resistance at lengths 10 cm, 20 cm, 30 cm (using multimeter.', 'Take wires of same material and length but different thicknesses (e.g., 24 gauge, 28 gauge).', 'Write the proportionalities: R ∝ L, R ∝ 1/A.', 'Practice a board-style question: "A wire of resistance R is stretched to double its length.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that resistance depends only on the material and not on dimensions.',
          parts: [
                { id: 'a', prompt: 'A student performs an experiment to study the effect of temperature on resistance of a copper wire.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'resistance depends only on the material and not on dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' }
          ],
            remediations: { 'resistance-depends-only-on-the': { steps: ['Revisit the water pipe analogy from Class 6 (c6_physics_ch03_014): a longer pipe offers more opposition to water flow;.', 'Perform a quick lab activity: take a uniform wire, measure resistance at lengths 10 cm, 20 cm, 30 cm (using multimeter.', 'Take wires of same material and length but different thicknesses (e.g., 24 gauge, 28 gauge).', 'Write the proportionalities: R ∝ L, R ∝ 1/A.', 'Practice a board-style question: "A wire of resistance R is stretched to double its length.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_3', difficulty: 'standard',
          question: 'A sound wave is a longitudinal mechanical wave in which particles of the medium.',
          hint: 'Revisit "Propagation of Sound: Need for a Medium" (c9_physics_ch5_2) and observe the.',
          misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: Define a longitudinal wave and state the direction of particle vibration relative to the direction of wave propagation in a sound.', answer: 'A longitudinal wave is a wave in',
                  options: ['A longitudinal wave is a wave in', 'perpendicular direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine curve as the.' }
          ],
            remediations: { 'sound-waves-are-transverse-because': { steps: ['** Use a slinky — have student create a longitudinal pulse and mark one coil with tape.', '** Draw a particle diagram: 10 dots at equilibrium. Push first dot right — it hits second, etc.', '** Plot displacement vs position for this snapshot — show zero displacement at compression centre. **', '** Contrast with transverse wave on string — shake vertically, wave travels horizontally — particle path ≠ wave.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student draws a pressure-distance graph for a sound wave and labels the peaks as "compressions" and troughs as "rarefactions".', answer: 'No, the second student is incorrect',
                  options: ['No, the second student is incorrect', 'yes, they match'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine curve as the.' }
          ],
            remediations: { 'sound-waves-are-transverse-because': { steps: ['** Use a slinky — have student create a longitudinal pulse and mark one coil with tape.', '** Draw a particle diagram: 10 dots at equilibrium. Push first dot right — it hits second, etc.', '** Plot displacement vs position for this snapshot — show zero displacement at compression centre. **', '** Contrast with transverse wave on string — shake vertically, wave travels horizontally — particle path ≠ wave.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
