import type { SimDef } from '../../engine/types';
import C10_PhysicsTurningEffectForceSim from '../../../simulations/c6_12/C10_PhysicsTurningEffectForceSim';

/** v3 wrapped master — C10_PhysicsTurningEffectForceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_physicsturningeffectforcesim: SimDef = {
    id: 'v3w_c10_physicsturningeffectforcesim',
    title: 'Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule)',
    subtitle: 'This node covers the magnetic field produced by a current-carrying circular loop (single.',
    classLevel: 10, subject: 'physics', topic: 'Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule)',
    chapters: [],
    nodeIds: ['c10_phy_cbse_02_003', 'c10_phy_cbse_02_008', 'c10_phy_cbse_02_009', 'c10_phy_cbse_02_004', 'c10_phy_cbse_02_001', 'c10_phy_cbse_02_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Begin with a real-world observation: take a circular copper wire loop (like a bangle) connected to a battery.', goal: 'Master Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule).' },
    discovery: {
        question: 'A circular coil of 50 turns and area 0.02 m² is placed perpendicular to a uniform magnetic field of 0.5 T. The field is reduced to zero uniformly in 0.1 s.',
        options: ['Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb', 'induced emf exists as long as magnetic field is present', 'a static magnetic field can induce a current in a stationary coil'],
        answer: 'Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb',
        hook: 'Students think that a static magnetic field can induce a current in a stationary coil.',
    },
    teaching: [
        { title: 'The magnetic field at the centre of a.', text: 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity directed perpendicular to the plane of the loop, with magnitude given by \\( B = \\frac{\\mu_0 I}{2R} \\) for a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_003', title: 'The magnetic field at the centre of a.',
          scaffold: { problem: 'A circular coil of 20 turns and radius 8 cm is connected to a 12 V battery. The resistance of the coil is 4 Ω.',
            steps: [
            { text: 'Identify given quantities: Number of turns \\( N = 20 \\), radius \\( R = 8 \\, \\text{cm} = 0.08 \\, \\text{m} \\), battery.' },
            { text: 'First find the current using Ohm\'s law: \\( I = \\frac{V}{R_{\\text{coil}}} = \\frac{12}{4} = 3 \\, \\text{A} \\).' },
            { text: 'Substitute values: \\( B = \\frac{(4\\pi \\times 10^{-7}) \\times 20 \\times 3}{2 \\times 0.08} \\).' },
            { text: 'Compute stepwise: Numerator = \\( 4\\pi \\times 10^{-7} \\times 60 = 240\\pi \\times 10^{-7} \\). Denominator = \\( 0.16 \\).' },
            { text: 'Verify: For a small coil with moderate current, a field of ~0.5 mT is reasonable (Earth\'s field is ~0.05 mT).', faded: true, blankAnswer: '\\( 4.71 \\times 10^{-4} \\, \\text{T} \\) (or 0.471 mT)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_008', title: 'Electromagnetic induction is the.',
          scaffold: { problem: 'A rectangular coil of 100 turns has dimensions 20 cm × 10 cm. It is placed with its plane perpendicular to a uniform magnetic field of 0.4.',
            steps: [
            { text: 'Identify given quantities: N = 100 turns, A = 0.20 m × 0.10 m = 0.02 m², B_initial = 0.4 T, B_final = 0.1 T, Δt = 0.05.' },
            { text: 'Calculate initial and final flux per turn: Φ₁ = B₁A = 0.4 × 0.02 = 0.008 Wb; Φ₂ = B₂A = 0.1 × 0.02 = 0.002 Wb.' },
            { text: 'Change in flux per turn: ΔΦ = Φ₂ - Φ₁ = 0.002 - 0.008 = -0.006 Wb.' },
            { text: 'Apply Faraday\'s Law magnitude: |ε| = N |ΔΦ/Δt| = 100 × | -0.006 / 0.05 | = 100 × 0.12 = 12 V.' },
            { text: 'Check reasonableness: 12 V is a plausible voltage for a small coil in a lab experiment; units: turns × (Wb/s) = V.', faded: true, blankAnswer: '12 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_009', title: 'An electric motor is a device that.',
          scaffold: { problem: 'A simple DC motor has a rectangular coil of 200 turns. The coil dimensions are 10 cm (length) × 6 cm (breadth).',
            steps: [
            { text: 'Identify given quantities with units. N = 200 turns, L_long = 10 cm = 0.10 m, L_short = 6 cm = 0.06 m, I = 2.0 A, B =.' },
            { text: 'Recall formula F = N B I L sinθ. For longer arms: sin 90° = 1. For shorter arms: sin 0° = 0.' },
            { text: 'Calculate force on one longer arm: F_long = 200 × 0.5 T × 2.0 A × 0.10 m × 1 = 20 N. (Units: T·A·m = N).' },
            { text: 'Calculate force on one shorter arm: F_short = 200 × 0.5 × 2.0 × 0.06 × 0 = 0 N.' },
            { text: 'Torque τ = force × perpendicular distance between the forces. The two longer arms experience equal and opposite forces.' },
            { text: 'Verify reasonableness: 20 N on a 10 cm arm with 200 turns in 0.5 T is plausible for a small motor.', faded: true, blankAnswer: '(a) 20 N on each longer arm, (b) 0 N on each shorter arm,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_004', title: 'A solenoid is a long helical coil of.',
          scaffold: { problem: 'A solenoid of length 30 cm has 600 turns of insulated copper wire. It is connected to a 6 V battery through a variable resistor.',
            steps: [
            { text: 'Identify given quantities: initial current I₁ = 1.5 A, initial deflection θ₁ = 60°, new current I₂ = 3.0 A.' },
            { text: 'The compass needle aligns with the resultant of Earth\'s horizontal field (Bₑ) and solenoid\'s field (Bₛ).' },
            { text: 'Set up ratio: tan θ₂ / tan θ₁ = I₂ / I₁.' },
            { text: 'tan θ₁ = tan 60° = √3 ≈ 1.732. I₂/I₁ = 3.0 / 1.5 = 2. So tan θ₂ = 2 × 1.732 = 3.464.' },
            { text: 'θ₂ = tan⁻¹(3.464) ≈ 73.9°. The deflection increases from 60° to about 74°.', faded: true, blankAnswer: 'The new deflection is approximately 74°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_001', title: 'A magnetic field is the region around a.',
          scaffold: { problem: 'A student uses a plotting compass to map magnetic field lines around a bar magnet.',
            steps: [
            { text: 'Identify the given quantities — B₁ = 4.0 × 10⁻⁴ T at start (2 cm from N pole), B₂ = 8.0 × 10⁻⁴ T at south pole, path.' },
            { text: 'Recall the principle — magnetic field strength is proportional to the density of field lines (number of lines per unit.' },
            { text: 'Analyze the geometry — near the poles, field lines are crowded (high density) because the same number of lines emerge.' },
            { text: 'Apply the concept — at 2 cm from north pole, lines have spread out, so density is lower (B₁ = 4.0 × 10⁻⁴ T).' },
            { text: 'Conclude — field line length is irrelevant; field strength depends on how closely lines are packed.' },
            { text: 'Verify physical reasonableness — field is strongest at poles, weaker away from magnet; values are in correct order.', faded: true, blankAnswer: 'The magnetic field strength increases because field line.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_005', title: 'The force experienced by a.',
          scaffold: { problem: 'A copper wire of length 20 cm is placed perpendicular to a uniform magnetic field of 0.4 T.',
            steps: [
            { text: 'Identify given quantities: L = 20 cm = 0.20 m, B = 0.4 T, I = 3 A, θ = 90° (perpendicular), mass m = 5 g = 0.005 kg.' },
            { text: 'Formula for force: F = B I L sinθ. Since θ = 90°, sinθ = 1. Formula for acceleration: a = F/m (Newton\'s second law).' },
            { text: 'Substitute into force formula: F = (0.4 T) × (3 A) × (0.20 m) × 1 = 0.24 N.' },
            { text: 'Check units: T·A·m = (N/(A·m))·A·m = N. Correct.' },
            { text: 'Calculate acceleration: a = F/m = 0.24 N / 0.005 kg = 48 m/s².', faded: true, blankAnswer: 'Force = 0.24 N, Acceleration = 48 m/s².' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule)', spots: [
            { id: 's1', label: 'The magnetic field at the', prompt: 'Which idea is this? — The magnetic field at the centre of a current-carrying circular loop is a vector quantity.', answer: 'The magnetic field at the', options: ['The magnetic field at the', 'Electromagnetic induction is the phenomenon', 'An electric motor is a', 'A solenoid is a long'] },
            { id: 's2', label: 'Electromagnetic induction is the phenomenon', prompt: 'Which idea is this? — Electromagnetic induction is the phenomenon where a changing magnetic flux through a.', answer: 'Electromagnetic induction is the phenomenon', options: ['Electromagnetic induction is the phenomenon', 'The magnetic field at the', 'An electric motor is a', 'A solenoid is a long'] },
            { id: 's3', label: 'An electric motor is a', prompt: 'Which idea is this? — An electric motor is a device that converts electrical energy into mechanical energy of.', answer: 'An electric motor is a', options: ['An electric motor is a', 'The magnetic field at the', 'Electromagnetic induction is the phenomenon', 'A solenoid is a long'] },
            { id: 's4', label: 'A solenoid is a long', prompt: 'Which idea is this? — A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform.', answer: 'A solenoid is a long', options: ['A solenoid is a long', 'The magnetic field at the', 'Electromagnetic induction is the phenomenon', 'An electric motor is a'] },
            { id: 's5', label: 'A magnetic field is the', prompt: 'Which idea is this? — A magnetic field is the region around a magnet or a current-carrying conductor where a.', answer: 'A magnetic field is the', options: ['A magnetic field is the', 'The magnetic field at the', 'Electromagnetic induction is the phenomenon', 'An electric motor is a'] },
            { id: 's6', label: 'The force experienced by a', prompt: 'Which idea is this? — The force experienced by a current-carrying conductor placed in a uniform magnetic field.', answer: 'The force experienced by a', options: ['The force experienced by a', 'The magnetic field at the', 'Electromagnetic induction is the phenomenon', 'An electric motor is a'] }
          ] } }
    ],
    explore: { component: C10_PhysicsTurningEffectForceSim, prompt: 'Explore the interactive — Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule)' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_003', difficulty: 'standard',
          question: 'The magnetic field at the centre of a current-carrying circular loop is a.',
          hint: 'If stuck, revisit c10_phy_cbse_02_002 and practice the right-hand thumb rule for a.',
          misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb in.',
          parts: [
                { id: 'a', prompt: 'Two identical circular loops A and B carry equal currents. Loop A has a single turn; loop B has 10 turns but the same radius.', answer: 'Magnitude: \\( B_B = 10 \\times B_A \\)',
                  options: ['Magnitude: \\( B_B = 10 \\times B_A \\)', 'magnitude becomes 1/10th'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb in the direction of.' }
          ],
            remediations: { 'the-right-hand-thumb-rule': { steps: ['Hold a straight wire vertically and use the right-hand grip rule (thumb = current, fingers = field circles) to recall.', 'Now bend the wire into a loop. Place your right hand so that the fingers follow the current around the loop; the thumb.', 'Practice with three different current directions (clockwise, anticlockwise, into/out of page) and draw the field.', 'Verify with a compass and a real loop: the compass needle aligns with the thumb direction.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb in.',
          parts: [
                { id: 'a', prompt: 'Two identical circular loops A and B carry equal currents. Loop A has a single turn; loop B has 10 turns but the same radius.', answer: 'Magnitude: \\( B_B = 10 \\times B_A \\)',
                  options: ['Magnitude: \\( B_B = 10 \\times B_A \\)', 'magnitude becomes 1/10th'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb in the direction of.' }
          ],
            remediations: { 'the-right-hand-thumb-rule': { steps: ['Hold a straight wire vertically and use the right-hand grip rule (thumb = current, fingers = field circles) to recall.', 'Now bend the wire into a loop. Place your right hand so that the fingers follow the current around the loop; the thumb.', 'Practice with three different current directions (clockwise, anticlockwise, into/out of page) and draw the field.', 'Verify with a compass and a real loop: the compass needle aligns with the thumb direction.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_008', difficulty: 'standard',
          question: 'Electromagnetic induction is the phenomenon where a changing magnetic flux.',
          hint: 'Revisit magnetic flux definition (c10_phy_cbse_02_001) and right-hand thumb rule for.',
          misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.',
          parts: [
                { id: 'a', prompt: 'A circular coil of 50 turns and area 0.02 m² is placed perpendicular to a uniform magnetic field of 0.5 T. The field is reduced to zero uniformly in 0.1 s.', answer: 'Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb',
                  options: ['Initial flux per turn Φ₁ = BA cos0° = 0.5 × 0.02 × 1 = 0.01 Wb', 'induced emf exists as long as magnetic field is present', 'a static magnetic field can induce a current in a stationary coil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.' }
          ],
            remediations: { 'a-static-magnetic-field-can': { steps: ['Hold a coil connected to a galvanometer near a stationary bar magnet — observe zero deflection.', 'Move the magnet towards the coil — observe deflection only while moving.', 'Move the magnet away — deflection reverses.', 'Keep magnet stationary but rotate the coil — deflection appears.', 'Conclude: emf requires *change* in flux (by changing B, A, or θ).'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a coil, a bar magnet, a galvanometer, and a stopwatch to verify that the magnitude of induced emf is proportional to the rate.', answer: 'Procedure: Connect coil to galvanometer',
                  options: ['Procedure: Connect coil to galvanometer', 'induced emf exists as long as magnetic field is present', 'a static magnetic field can induce a current in a stationary coil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that a static magnetic field can induce a current in a stationary coil.' }
          ],
            remediations: { 'a-static-magnetic-field-can': { steps: ['Hold a coil connected to a galvanometer near a stationary bar magnet — observe zero deflection.', 'Move the magnet towards the coil — observe deflection only while moving.', 'Move the magnet away — deflection reverses.', 'Keep magnet stationary but rotate the coil — deflection appears.', 'Conclude: emf requires *change* in flux (by changing B, A, or θ).'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_009', difficulty: 'standard',
          question: 'An electric motor is a device that converts electrical energy into mechanical.',
          hint: 'If stuck, immediately revise c10_phy_cbse_02_005 — practice 5-10 problems on Fleming\'s.',
          misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric motor is a device that converts electrical energy into mechanical energy of',
                  options: ['An electric motor is a device that converts electrical energy into mechanical energy of', 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity', 'Electromagnetic induction is the phenomenon where a changing magnetic flux through a', 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the external magnet\'s field.' }
          ],
            remediations: { 'the-coil-rotates-because-the': { steps: ['Revisit c10_phy_cbse_02_005 (Force on a Current-Carrying Conductor) and practice Fleming\'s left-hand rule on straight.', 'Do the "half-stripped wire motor" experiment (Diagnostic 6) yourself.', 'Observe that the coil only gets a "kick" when current flows, and coasts when insulation breaks contact.', 'This proves rotation is due to instantaneous force on current, not continuous magnetic attraction.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_004', difficulty: 'standard',
          question: 'A solenoid is a long helical coil of insulated copper wire that produces a.',
          hint: 'If stuck, review the right-hand grip rule for a solenoid (c10_phy_cbse_02_003) and.',
          misconception: 'Students often think the magnetic field **outside** a solenoid is zero.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform',
                  options: ['A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform', 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity', 'Electromagnetic induction is the phenomenon where a changing magnetic flux through a', 'An electric motor is a device that converts electrical energy into mechanical energy of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field **outside** a solenoid is zero.' }
          ],
            remediations: { 'the-magnetic-field-outside-a': { steps: ['Revisit the magnetic field of a single circular loop (c10_phy_cbse_02_003) and draw field lines for 2-3 loops.', 'Use a compass to map the field around a real solenoid (or a spring) connected to a battery; observe deflection inside,.', 'Apply the right-hand grip rule to each turn and verify thumb direction gives the north pole.', 'Compare with a bar magnet\'s field pattern using iron filings or a plotting compass.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the magnetic field **outside** a solenoid is zero.',
          parts: [
                { id: 'a', prompt: 'A student claims: "An electromagnet made with a soft iron core can be used to separate magnetic materials from non-magnetic ones in a scrapyard, but it cannot.', answer: 'The statement is **partially incorrect**',
                  options: ['The statement is **partially incorrect**', 'the magnetic field **outside** a solenoid is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field **outside** a solenoid is zero.' }
          ],
            remediations: { 'the-magnetic-field-outside-a': { steps: ['Revisit the magnetic field of a single circular loop (c10_phy_cbse_02_003) and draw field lines for 2-3 loops.', 'Use a compass to map the field around a real solenoid (or a spring) connected to a battery; observe deflection inside,.', 'Apply the right-hand grip rule to each turn and verify thumb direction gives the north pole.', 'Compare with a bar magnet\'s field pattern using iron filings or a plotting compass.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_001', difficulty: 'standard',
          question: 'A magnetic field is the region around a magnet or a current-carrying conductor.',
          hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1.',
          misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like.',
          parts: [
                { id: 'a', prompt: 'Two magnetic field lines are drawn intersecting each other in a student\'s diagram.', answer: 'Magnetic field lines cannot intersect',
                  options: ['Magnetic field lines cannot intersect', 'intersection means stronger field', 'it\'s allowed in some cases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'b', prompt: 'A student draws magnetic field lines for a bar magnet as straight lines radiating outward from the north pole and inward to the south pole.', answer: 'The error is drawing straight radial lines',
                  options: ['The error is drawing straight radial lines', 'field lines cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'c', prompt: 'A plotting compass is placed at point P near a bar magnet. The compass needle aligns at 30° to the horizontal.', answer: 'The compass needle aligns with the resultant magnetic field vector',
                  options: ['The compass needle aligns with the resultant magnetic field vector', 'field lines cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' }
          ],
            remediations: { 'magnetic-field-lines-start-at': { steps: ['Revisit the iron filings pattern — observe that filings form continuous curves with no breaks at the poles.', 'Use a plotting compass to trace a single field line all the way around — physically move the compass from outside north.', 'Explicitly state: "No magnetic monopoles exist → field lines cannot start or end → they must close on themselves."', 'Practice drawing 3 complete loops for a bar magnet, showing internal continuation with dashed lines.', 'Solve a board-style question: "Draw magnetic field lines for a bar magnet.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Magnetic field lines begin at the north pole and end at the south pole." Is it fully correct?', answer: 'The statement is incomplete/incorrect',
                  options: ['The statement is incomplete/incorrect', 'field lines cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'b', prompt: 'Design a simple experiment using a bar magnet, a plotting compass, and a sheet of paper to map the magnetic field lines around the magnet.', answer: 'Procedure: (1) Fix white paper on a board',
                  options: ['Procedure: (1) Fix white paper on a board', 'field lines cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' }
          ],
            remediations: { 'magnetic-field-lines-start-at': { steps: ['Revisit the iron filings pattern — observe that filings form continuous curves with no breaks at the poles.', 'Use a plotting compass to trace a single field line all the way around — physically move the compass from outside north.', 'Explicitly state: "No magnetic monopoles exist → field lines cannot start or end → they must close on themselves."', 'Practice drawing 3 complete loops for a bar magnet, showing internal continuation with dashed lines.', 'Solve a board-style question: "Draw magnetic field lines for a bar magnet.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_005', difficulty: 'standard',
          question: 'The force experienced by a current-carrying conductor placed in a uniform.',
          hint: 'If stuck, review c10_phy_cbse_02_002 (Magnetic Field Due to a Current-Carrying Straight.',
          misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse.',
          parts: [
                { id: 'a', prompt: 'State the formula for the force on a current-carrying conductor in a magnetic field. Define each symbol and its SI unit.', answer: 'The formula is \\( F = B I L \\sin\\theta \\)',
                  options: ['The formula is \\( F = B I L \\sin\\theta \\)', 'parallel', 'aligned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' },
                { id: 'b', prompt: 'Two identical wires of length \\( L \\) carry the same current \\( I \\) and are placed in the same uniform magnetic field \\( B \\).', answer: 'Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)',
                  options: ['Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)', 'parallel', 'aligned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' }
          ],
            remediations: { 'the-force-is-maximum-when': { steps: ['Revisit the experimental observation: a wire jumps only when perpendicular to the field.', 'Practice Fleming\'s left-hand rule with a physical hand model: label fingers on a paper cutout.', 'Solve five numerical problems where \\( \\theta \\) is not 90°, explicitly writing \\( \\sin\\theta \\) each time.', 'Draw vector diagrams showing \\( \\vec{I} \\), \\( \\vec{B} \\), and \\( \\vec{F} \\) for \\( \\theta = 30^\\circ, 90^\\circ,.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse.',
          parts: [
                { id: 'a', prompt: 'A student sets up an experiment to verify \\( F = BIL\\sin\\theta \\). They measure force for different angles and plot \\( F \\) vs \\( \\theta \\).', answer: 'The graph of \\( F \\) vs \\( \\theta \\) matching a sine curve supports the angular',
                  options: ['The graph of \\( F \\) vs \\( \\theta \\) matching a sine curve supports the angular', 'parallel', 'aligned', 'alignment gives maximum interaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' },
                { id: 'b', prompt: 'Two identical wires of length \\( L \\) carry the same current \\( I \\) and are placed in the same uniform magnetic field \\( B \\).', answer: 'Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)',
                  options: ['Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)', 'parallel', 'aligned', 'alignment gives maximum interaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' }
          ],
            remediations: { 'the-force-is-maximum-when': { steps: ['Revisit the experimental observation: a wire jumps only when perpendicular to the field.', 'Practice Fleming\'s left-hand rule with a physical hand model: label fingers on a paper cutout.', 'Solve five numerical problems where \\( \\theta \\) is not 90°, explicitly writing \\( \\sin\\theta \\) each time.', 'Draw vector diagrams showing \\( \\vec{I} \\), \\( \\vec{B} \\), and \\( \\vec{F} \\) for \\( \\theta = 30^\\circ, 90^\\circ,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
