import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch02_p2: SimDef = {
    id: 'v3_c10_phy_ch02_p2',
    title: 'Magnetic Effects of Current · Part 2/2',
    subtitle: 'Turn a twitching compass needle into motors and power',
    classLevel: 10, subject: 'physics', topic: 'Magnetic Effects of Current · Part 2/2',
    chapters: ['c10_phy_ch02'],
    nodeIds: ['c10_phy_cbse_02_007', 'c10_phy_cbse_02_008', 'c10_phy_cbse_02_009', 'c10_phy_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an electrical engineer', intro: 'A wire lies over a compass; you close the switch and the needle jumps. You\'ve just witnessed the link between electricity and magnetism — the link that runs every fan, motor and MRI machine.', goal: 'Explain magnetic fields around current-carrying conductors, apply Fleming\'s rules, and connect electromagnetic induction and domestic circuits.' },
    discovery: {
        question: 'In 1820 Oersted held a compass near a wire, switched on the current — and the needle twitched. No magnet touched it, nothing visible moved. What did that twitch prove?',
        options: ['Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon', 'Compasses are simply unreliable near wires', 'The wire heated up and bent the needle physically', 'Static electricity in the air deflected the compass'],
        answer: 'Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon',
        hook: 'That twitching needle launched electromagnets, motors and generators. A current-carrying wire is secretly a magnet — and the right-hand thumb rule tells you which way its field curls.',
    },
    teaching: [
        { title: 'Electric Fuse and Short Circuit Protection', text: 'An electric fuse is a safety device consisting of a short length of wire made of a low-melting-point alloy (like tin-lead or copper) that melts and breaks the circuit when the current exceeds.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_02_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Map the invisible: trace field lines around straight wires, loops and solenoids, apply the right-hand rules, then wire up a motor and a fuse — harnessing force on conductors safely.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_007', title: 'Electric Fuse and Short Circuit Protection',
          scaffold: { problem: 'A household circuit has a 15 A fuse. The supply voltage is 220 V.',
            steps: [
            { text: 'Identify given: Fuse rating I_max = 15 A, V = 220 V, Power per bulb P_bulb = 60 W. Find: maximum number of bulbs n.' },
            { text: 'Current drawn by one bulb: I_bulb = P_bulb / V = 60 W / 220 V = 0.2727 A.' },
            { text: 'In parallel, total current I_total = n × I_bulb. For safety, I_total ≤ I_max (15 A).' },
            { text: 'n ≤ I_max / I_bulb = 15 A / 0.2727 A ≈ 55.0. Since n must be integer, maximum n = 55 bulbs.' },
            { text: 'Verify: 55 × 60 W = 3300 W total power. I_total = 3300/220 = 15 A exactly.', faded: true, blankAnswer: '55 bulbs' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_008', title: 'Electromagnetic Induction: Faraday\'s Law',
          scaffold: { problem: 'A rectangular coil of 100 turns has dimensions 20 cm × 10 cm. It is placed with its plane perpendicular to a uniform magnetic field of 0.4.',
            steps: [
            { text: 'Identify given quantities: N = 100 turns, A = 0.20 m × 0.10 m = 0.02 m², B_initial = 0.4 T, B_final = 0.1 T, Δt = 0.05.' },
            { text: 'Calculate initial and final flux per turn: Φ₁ = B₁A = 0.4 × 0.02 = 0.008 Wb; Φ₂ = B₂A = 0.1 × 0.02 = 0.002 Wb.' },
            { text: 'Change in flux per turn: ΔΦ = Φ₂ - Φ₁ = 0.002 - 0.008 = -0.006 Wb.' },
            { text: 'Apply Faraday\'s Law magnitude: |ε| = N |ΔΦ/Δt| = 100 × | -0.006 / 0.05 | = 100 × 0.12 = 12 V.' },
            { text: 'Check reasonableness: 12 V is a plausible voltage for a small coil in a lab experiment; units: turns × (Wb/s) = V.', faded: true, blankAnswer: '12 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_009', title: 'Electric Motor: Principle and Working',
          scaffold: { problem: 'A simple DC motor has a rectangular coil of 200 turns. The coil dimensions are 10 cm (length) × 6 cm (breadth).',
            steps: [
            { text: 'Identify given quantities with units. N = 200 turns, L_long = 10 cm = 0.10 m, L_short = 6 cm = 0.06 m, I = 2.0 A,.' },
            { text: 'Recall formula F = N B I L sinθ. For longer arms: sin 90° = 1. For shorter arms: sin 0° = 0.' },
            { text: 'Calculate force on one longer arm: F_long = 200 × 0.5 T × 2.0 A × 0.10 m × 1 = 20 N. (Units: T·A·m = N).' },
            { text: 'Calculate force on one shorter arm: F_short = 200 × 0.5 × 2.0 × 0.06 × 0 = 0 N.' },
            { text: 'Torque τ = force × perpendicular distance between the forces. The two longer arms experience equal and opposite forces.' },
            { text: 'Verify reasonableness: 20 N on a 10 cm arm with 200 turns in 0.5 T is plausible for a small motor.', faded: true, blankAnswer: '(a) 20 N on each longer arm, (b) 0 N on each shorter arm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_010', title: 'Electric Generator: AC and DC Generation',
          scaffold: { problem: 'A bicycle dynamo (AC generator) has a coil of 50 turns and area 20 cm² rotating in a magnetic field of 0.4 T.',
            steps: [
            { text: 'Identify given quantities with units. N = 50 turns, A = 20 cm² = 20 × 10⁻⁴ m² = 2 × 10⁻³ m², B = 0.4 T, rotation speed.' },
            { text: 'Convert rotation speed to frequency in Hz. f = 300 rpm = 300/60 = 5 Hz. Angular speed ω = 2πf = 2π × 5 = 10π rad/s.' },
            { text: 'Recall formula for maximum emf: ε_max = NBAω. Check units: T·m²·rad/s = (N/(A·m))·m²·s⁻¹ = N·m/(A·s) = J/C = V. Correct.' },
            { text: 'Substitute values: ε_max = 50 × 0.4 × (2 × 10⁻³) × (10π) = 50 × 0.4 × 2 × 10⁻³ × 10π = 50 × 0.4 × 0.02π = 50 × 0.008π.' },
            { text: 'Verify reasonableness: Bicycle dynamo typically produces a few volts (e.g., 6 V for a light).', faded: true, blankAnswer: '1.26 V (approx)' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a physics chart, a student draws a bar magnet\'s field lines: eight lines emerging from the north pole but only five curving back into the south pole. \'Three lines get used up in the middle,\' he explains.',
            decisions: [{ prompt: 'What is wrong with his diagram?', options: [
                { text: 'Field lines are continuous closed loops — every line that leaves the north pole returns to the south pole (and continues inside the magnet), so the counts must match. Lines also crowd near the poles, which is what shows the field is strongest there; lines cannot end, cross or vanish midway.', outcome: 'Correcting the drawing to equal lines in and out captures two real rules: field lines form closed curves and their density — not their survival — tells the field\'s strength.' },
                { text: 'He is right — some field lines dissipate in the air between the poles, so fewer reach the south end.', outcome: 'Field lines do not wear out or dissipate — each one is a closed loop, so the number leaving north always equals the number entering south.', reveals: 'field-lines-dissipate' },
                { text: 'The error is the opposite — more lines should enter the south pole than leave the north, because south \'pulls harder.\'', outcome: 'Neither pole outranks the other — the lines are shared closed loops, so the counts at both poles are always equal.', reveals: 'south-pulls-harder' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'Every electric motor on Earth is Oersted\'s compass writ large — current becomes magnetism, magnetism becomes motion, and a fuse stands guard over all of it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_007', difficulty: 'standard',
          question: 'An electric fuse is a safety device consisting of a short length of wire made.',
          hint: 'Revisit c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat).',
          misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric fuse is a safety device consisting of a short length of wire made of a',
                  options: ['An electric fuse is a safety device consisting of a short length of wire made of a', 'A magnetic field is the region around a magnet or a current-carrying conductor where a', 'A current-carrying straight conductor produces a magnetic field in the surrounding space', 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity'],
                  hint: 'Revisit c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat) — practice.',
                  misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance that accumulates.' }
          ],
            remediations: { 'the-fuse-wire-melts-because': { steps: ['If the student holds the "current accumulation" misconception: 1) Show a video of a fuse wire melting in slow motion.', '2) Do the steel wool activity (Diagnostic 6) and measure the current at melting with an ammeter.', '3) Plot I vs time-to-blow for a sample fuse — the curve is hyperbolic (I²t = constant), proving it\'s about energy.', '4) Re-read Class 8 node c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance.',
          parts: [
                { id: 'a', prompt: 'A student replaces a blown 5 A fuse with a 15 A fuse "because it\'s stronger and won\'t blow again." Evaluate this action. Is it safe?', answer: 'Unsafe',
                  options: ['Unsafe', 'it\'s fine because the appliance only draws 5A'],
                  hint: 'Revisit c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat) — practice.',
                  misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance that accumulates.' }
          ],
            remediations: { 'the-fuse-wire-melts-because': { steps: ['If the student holds the "current accumulation" misconception: 1) Show a video of a fuse wire melting in slow motion.', '2) Do the steel wool activity (Diagnostic 6) and measure the current at melting with an ammeter.', '3) Plot I vs time-to-blow for a sample fuse — the curve is hyperbolic (I²t = constant), proving it\'s about energy.', '4) Re-read Class 8 node c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_008', difficulty: 'standard',
          question: 'Electromagnetic induction is the phenomenon where a changing magnetic flux.',
          hint: 'Revisit magnetic flux definition (c10_phy_cbse_02_001) and right-hand thumb rule for.',
          misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.',
          parts: [
                { id: 'a', prompt: 'A circular coil of 50 turns and area 0.02 m² is placed perpendicular to a uniform magnetic field of 0.5 T. The field is reduced to zero uniformly in 0.1 s.', answer: 'Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb',
                  options: ['Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb', 'induced emf exists as long as magnetic field is present', 'a static magnetic field can induce a current in a stationary coil'],
                  hint: 'Revisit magnetic flux definition (c10_phy_cbse_02_001) and right-hand thumb rule for field.',
                  misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.' }
          ],
            remediations: { 'a-static-magnetic-field-can': { steps: ['Hold a coil connected to a galvanometer near a stationary bar magnet — observe zero deflection.', 'Move the magnet towards the coil — observe deflection only while moving.', 'Move the magnet away — deflection reverses.', 'Keep magnet stationary but rotate the coil — deflection appears.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_009', difficulty: 'standard',
          question: 'An electric motor is a device that converts electrical energy into mechanical.',
          hint: 'If stuck, immediately revise c10_phy_cbse_02_005 — practice 5-10 problems on Fleming\'s.',
          misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric motor is a device that converts electrical energy into mechanical energy of',
                  options: ['An electric motor is a device that converts electrical energy into mechanical energy of', 'A magnetic field is the region around a magnet or a current-carrying conductor where a', 'A current-carrying straight conductor produces a magnetic field in the surrounding space', 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity'],
                  hint: 'If stuck, immediately revise c10_phy_cbse_02_005 — practice 5-10 problems on Fleming\'s left-hand.',
                  misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the external magnet\'s field.' }
          ],
            remediations: { 'the-coil-rotates-because-the': { steps: ['Revisit c10_phy_cbse_02_005 (Force on a Current-Carrying Conductor) and practice Fleming\'s left-hand rule on straight.', 'Do the "half-stripped wire motor" experiment (Diagnostic 6) yourself.', 'Observe that the coil only gets a "kick" when current flows, and coasts when insulation breaks contact.', 'This proves rotation is due to instantaneous force on current, not continuous magnetic attraction.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_010', difficulty: 'standard',
          question: 'An electric generator is a device that converts mechanical energy into.',
          hint: 'If stuck, review node c10_phy_cbse_02_008 (Electromagnetic Induction: Faraday\'s Law) for.',
          misconception: 'Students often think the split-ring commutator in a DC generator "converts AC to DC" by some internal electronic.',
          parts: [
                { id: 'a', prompt: 'A rectangular coil of 100 turns, area 0.1 m², rotates at 60 rpm in a uniform magnetic field of 0.5 T. Calculate the maximum induced emf.', answer: 'Given: N = 100, B = 0.5 T, A = 0.1 m², f = 60 rpm = 1 Hz',
                  options: ['Given: N = 100, B = 0.5 T, A = 0.1 m², f = 60 rpm = 1 Hz', 'converts AC to DC'],
                  hint: 'If stuck, review node c10_phy_cbse_02_008 (Electromagnetic Induction: Faraday\'s Law) for flux.',
                  misconception: 'Students often think the split-ring commutator in a DC generator "converts AC to DC" by some internal electronic rectification, or that.' },
                { id: 'b', prompt: 'Compare the output waveforms of a single-coil AC generator and a single-coil DC generator. Sketch both waveforms for two full rotations and label the axes.', answer: 'AC output: sinusoidal wave alternating between +ε_max and -ε_max, period T = 1/f',
                  options: ['AC output: sinusoidal wave alternating between +ε_max and -ε_max, period T = 1/f', 'converts AC to DC'],
                  hint: 'If stuck, review node c10_phy_cbse_02_008 (Electromagnetic Induction: Faraday\'s Law) for flux.',
                  misconception: 'Students often think the split-ring commutator in a DC generator "converts AC to DC" by some internal electronic rectification, or that.' }
          ],
            remediations: { 'the-split-ring-commutator-in': { steps: ['Revisit Fleming\'s right-hand rule using a physical hand model — label fingers: Thumb = Motion of conductor, Forefinger.', 'Build a paper model of a split-ring commutator: cut two half-rings, attach to a paper coil, show how brushes contact.', 'Watch a slow-motion animation of a DC generator (search "DC generator commutator animation") and pause at 0°, 90°.', 'Solve the diagnostic questions again, focusing on Q2 and Q5.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
