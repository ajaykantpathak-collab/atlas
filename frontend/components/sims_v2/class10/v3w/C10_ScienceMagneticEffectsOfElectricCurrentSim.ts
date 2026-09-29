import type { SimDef } from '../../engine/types';
import C10_ScienceMagneticEffectsOfElectricCurrentSim from '../../../simulations/c6_12/C10_ScienceMagneticEffectsOfElectricCurrentSim';

/** v3 wrapped master — C10_ScienceMagneticEffectsOfElectricCurrentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencemagneticeffectsofelectriccurrentsim: SimDef = {
    id: 'v3w_c10_sciencemagneticeffectsofelectriccurrentsim',
    title: 'Magnetic Field Due to a Solenoid and Electromagnet',
    subtitle: 'Covers the magnetic field pattern of a solenoid, factors affecting its strength (current,.',
    classLevel: 10, subject: 'science', topic: 'Magnetic Field Due to a Solenoid and Electromagnet',
    chapters: [],
    nodeIds: ['c10_phy_cbse_02_004', 'c10_phy_cbse_02_009', 'c10_phy_cbse_02_007', 'c10_phy_cbse_02_001', 'c10_phy_cbse_02_002', 'c10_phy_cbse_02_003', 'c10_phy_cbse_02_005', 'c10_phy_cbse_02_008', 'c10_phy_cbse_02_010', 'c10_phy_cbse_01_004', 'c10_phy_cbse_01_008', 'c10_phy_cbse_01_009', 'c10_phy_cbse_01_010', 'c10_phy_cbse_01_011', 'c10_phy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a doorbell or an electric crane lifting scrap metal — both use electromagnets.', goal: 'Master Magnetic Field Due to a Solenoid and Electromagnet.' },
    discovery: {
        question: 'Two magnetic field lines are drawn intersecting each other in a student\'s diagram.',
        options: ['Magnetic field lines cannot intersect', 'intersection means stronger field', 'it\'s allowed in some cases'],
        answer: 'Magnetic field lines cannot intersect',
        hook: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like.',
    },
    teaching: [
        { title: 'A solenoid is a long helical coil of.', text: 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform magnetic field inside it when electric current passes through it, with field lines parallel to its axis and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_004', title: 'A solenoid is a long helical coil of.',
          scaffold: { problem: 'A solenoid of length 30 cm has 600 turns of insulated copper wire. It is connected to a 6 V battery through a variable resistor.',
            steps: [
            { text: 'Identify given quantities: initial current I₁ = 1.5 A, initial deflection θ₁ = 60°, new current I₂ = 3.0 A.' },
            { text: 'The compass needle aligns with the resultant of Earth\'s horizontal field (Bₑ) and solenoid\'s field (Bₛ).' },
            { text: 'Set up ratio: tan θ₂ / tan θ₁ = I₂ / I₁.' },
            { text: 'tan θ₁ = tan 60° = √3 ≈ 1.732. I₂/I₁ = 3.0 / 1.5 = 2. So tan θ₂ = 2 × 1.732 = 3.464.' },
            { text: 'θ₂ = tan⁻¹(3.464) ≈ 73.9°. The deflection increases from 60° to about 74°.', faded: true, blankAnswer: 'The new deflection is approximately 74°.' }
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
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_007', title: 'An electric fuse is a safety device.',
          scaffold: { problem: 'A household circuit has a 15 A fuse. The supply voltage is 220 V.',
            steps: [
            { text: 'Identify given: Fuse rating I_max = 15 A, V = 220 V, Power per bulb P_bulb = 60 W. Find: maximum number of bulbs n.' },
            { text: 'Current drawn by one bulb: I_bulb = P_bulb / V = 60 W / 220 V = 0.2727 A.' },
            { text: 'In parallel, total current I_total = n × I_bulb. For safety, I_total ≤ I_max (15 A).' },
            { text: 'n ≤ I_max / I_bulb = 15 A / 0.2727 A ≈ 55.0. Since n must be integer, maximum n = 55 bulbs.' },
            { text: 'Verify: 55 × 60 W = 3300 W total power. I_total = 3300/220 = 15 A exactly.', faded: true, blankAnswer: '55 bulbs' }
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
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_002', title: 'A current-carrying straight conductor.',
          scaffold: { problem: 'A long straight copper wire in a household circuit carries a current of 10 A.',
            steps: [
            { text: 'Identify given quantities: I = 10 A, r = 4.0 cm = 0.040 m, μ₀ = 4π × 10⁻⁷ T·m/A. Find: B_wire in tesla.' },
            { text: 'Write the formula for magnetic field due to infinite straight wire: B = μ₀I / (2πr).' },
            { text: 'Substitute values with units: B = (4π × 10⁻⁷ T·m/A × 10 A) / (2π × 0.040 m).' },
            { text: 'Simplify step by step: Cancel π: (4 × 10⁻⁷ × 10) / (2 × 0.040) = (40 × 10⁻⁷) / 0.080 = (4.0 × 10⁻⁶) / 0.080 = 5.0 ×.' },
            { text: 'Compare with Earth\'s field: B_wire = 5.0 × 10⁻⁵ T, B_earth ≈ 3.5 × 10⁻⁵ T.', faded: true, blankAnswer: 'B = 5.0 × 10⁻⁵ T (or 0.50 G). This exceeds Earth\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_003', title: 'The magnetic field at the centre of a.',
          scaffold: { problem: 'A circular coil of 20 turns and radius 8 cm is connected to a 12 V battery. The resistance of the coil is 4 Ω.',
            steps: [
            { text: 'Identify given quantities: Number of turns \\( N = 20 \\), radius \\( R = 8 \\, \\text{cm} = 0.08 \\, \\text{m} \\), battery.' },
            { text: 'First find the current using Ohm\'s law: \\( I = \\frac{V}{R_{\\text{coil}}} = \\frac{12}{4} = 3 \\, \\text{A} \\).' },
            { text: 'Substitute values: \\( B = \\frac{(4\\pi \\times 10^{-7}) \\times 20 \\times 3}{2 \\times 0.08} \\).' },
            { text: 'Compute stepwise: Numerator = \\( 4\\pi \\times 10^{-7} \\times 60 = 240\\pi \\times 10^{-7} \\). Denominator = \\( 0.16 \\).' },
            { text: 'Verify: For a small coil with moderate current, a field of ~0.5 mT is reasonable (Earth\'s field is ~0.05 mT).', faded: true, blankAnswer: '\\( 4.71 \\times 10^{-4} \\, \\text{T} \\) (or 0.471 mT)' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_02_009', title: 'Identify each idea',
          dissect: { specimen: 'Magnetic Field Due to a Solenoid and Electromagnet', spots: [
            { id: 's1', label: 'A solenoid is a long', prompt: 'Which idea is this? — A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform.', answer: 'A solenoid is a long', options: ['A solenoid is a long', 'An electric motor is a', 'An electric fuse is a', 'A magnetic field is the'] },
            { id: 's2', label: 'An electric motor is a', prompt: 'Which idea is this? — An electric motor is a device that converts electrical energy into mechanical energy of.', answer: 'An electric motor is a', options: ['An electric motor is a', 'A solenoid is a long', 'An electric fuse is a', 'A magnetic field is the'] },
            { id: 's3', label: 'An electric fuse is a', prompt: 'Which idea is this? — An electric fuse is a safety device consisting of a short length of wire made of a.', answer: 'An electric fuse is a', options: ['An electric fuse is a', 'A solenoid is a long', 'An electric motor is a', 'A magnetic field is the'] },
            { id: 's4', label: 'A magnetic field is the', prompt: 'Which idea is this? — A magnetic field is the region around a magnet or a current-carrying conductor where a.', answer: 'A magnetic field is the', options: ['A magnetic field is the', 'A solenoid is a long', 'An electric motor is a', 'An electric fuse is a'] },
            { id: 's5', label: 'A current-carrying straight conductor produces', prompt: 'Which idea is this? — A current-carrying straight conductor produces a magnetic field in the surrounding space.', answer: 'A current-carrying straight conductor produces', options: ['A current-carrying straight conductor produces', 'A solenoid is a long', 'An electric motor is a', 'An electric fuse is a'] },
            { id: 's6', label: 'The magnetic field at the', prompt: 'Which idea is this? — The magnetic field at the centre of a current-carrying circular loop is a vector quantity.', answer: 'The magnetic field at the', options: ['The magnetic field at the', 'A solenoid is a long', 'An electric motor is a', 'An electric fuse is a'] }
          ] } }
    ],
    explore: { component: C10_ScienceMagneticEffectsOfElectricCurrentSim, prompt: 'Explore the interactive — Magnetic Field Due to a Solenoid and Electromagnet' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_004', difficulty: 'standard',
          question: 'A solenoid is a long helical coil of insulated copper wire that produces a.',
          hint: 'If stuck, review the right-hand grip rule for a solenoid (c10_phy_cbse_02_003) and.',
          misconception: 'Students often think the magnetic field **outside** a solenoid is zero.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform',
                  options: ['A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform', 'An electric motor is a device that converts electrical energy into mechanical energy of', 'An electric fuse is a safety device consisting of a short length of wire made of a', 'A magnetic field is the region around a magnet or a current-carrying conductor where a'],
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
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_009', difficulty: 'standard',
          question: 'An electric motor is a device that converts electrical energy into mechanical.',
          hint: 'If stuck, immediately revise c10_phy_cbse_02_005 — practice 5-10 problems on Fleming\'s.',
          misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric motor is a device that converts electrical energy into mechanical energy of',
                  options: ['An electric motor is a device that converts electrical energy into mechanical energy of', 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform', 'An electric fuse is a safety device consisting of a short length of wire made of a', 'A magnetic field is the region around a magnet or a current-carrying conductor where a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the coil rotates because the magnetic field of the current-carrying coil interacts with the external magnet\'s field.' }
          ],
            remediations: { 'the-coil-rotates-because-the': { steps: ['Revisit c10_phy_cbse_02_005 (Force on a Current-Carrying Conductor) and practice Fleming\'s left-hand rule on straight.', 'Do the "half-stripped wire motor" experiment (Diagnostic 6) yourself.', 'Observe that the coil only gets a "kick" when current flows, and coasts when insulation breaks contact.', 'This proves rotation is due to instantaneous force on current, not continuous magnetic attraction.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_007', difficulty: 'standard',
          question: 'An electric fuse is a safety device consisting of a short length of wire made.',
          hint: 'Revisit c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat) —.',
          misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric fuse is a safety device consisting of a short length of wire made of a',
                  options: ['An electric fuse is a safety device consisting of a short length of wire made of a', 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform', 'An electric motor is a device that converts electrical energy into mechanical energy of', 'A magnetic field is the region around a magnet or a current-carrying conductor where a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance that accumulates.' }
          ],
            remediations: { 'the-fuse-wire-melts-because': { steps: ['If the student holds the "current accumulation" misconception: 1) Show a video of a fuse wire melting in slow motion —.', '2) Do the steel wool activity (Diagnostic 6) and measure the current at melting with an ammeter.', '3) Plot I vs time-to-blow for a sample fuse — the curve is hyperbolic (I²t = constant), proving it\'s about energy.', '4) Re-read Class 8 node c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat).'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance.',
          parts: [
                { id: 'a', prompt: 'A student replaces a blown 5 A fuse with a 15 A fuse "because it\'s stronger and won\'t blow again." Evaluate this action. Is it safe?', answer: 'Unsafe',
                  options: ['Unsafe', 'it\'s fine because the appliance only draws 5A'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the fuse wire melts because "too much current flows through it" as if current itself is a substance that accumulates.' }
          ],
            remediations: { 'the-fuse-wire-melts-because': { steps: ['If the student holds the "current accumulation" misconception: 1) Show a video of a fuse wire melting in slow motion —.', '2) Do the steel wool activity (Diagnostic 6) and measure the current at melting with an ammeter.', '3) Plot I vs time-to-blow for a sample fuse — the curve is hyperbolic (I²t = constant), proving it\'s about energy.', '4) Re-read Class 8 node c8_physics_ch2_6 (Joule\'s Law) and c8_physics_ch2_7 (factors affecting heat).'] } } },
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
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_002', difficulty: 'standard',
          question: 'A current-carrying straight conductor produces a magnetic field in the.',
          hint: 'Revisit c10_phy_cbse_02_001 for field line properties and c8_physics_ch2_2 for the.',
          misconception: 'Students believe the magnetic field lines around a straight wire are **spirals** or **helices** that move along the.',
          parts: [
                { id: 'a', prompt: 'Two identical long straight wires carry currents of 2 A and 4 A respectively.', answer: 'Ratio B₁:B₂ = 2:4 = **1:2**',
                  options: ['Ratio B₁:B₂ = 2:4 = **1:2**', 'the distance dependence changes the ratio'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the magnetic field lines around a straight wire are **spirals** or **helices** that move along the wire, because they.' }
          ],
            remediations: { 'the-magnetic-field-lines-around': { steps: ['** Have the student hold a pencil vertically (wire) and use their right hand to demonstrate: thumb up, fingers curl —.', '** Place a compass on a horizontal cardboard with a vertical wire through a hole.', '** Ask: "If field lines were helical, where would they go after one turn?', '** Contrast with solenoid (c10_phy_cbse_02_004) where field lines ARE helical inside — but that\'s a different geometry.'] } } },
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
            remediations: { 'the-right-hand-thumb-rule': { steps: ['Hold a straight wire vertically and use the right-hand grip rule (thumb = current, fingers = field circles) to recall.', 'Now bend the wire into a loop. Place your right hand so that the fingers follow the current around the loop; the thumb.', 'Practice with three different current directions (clockwise, anticlockwise, into/out of page) and draw the field.', 'Verify with a compass and a real loop: the compass needle aligns with the thumb direction.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
