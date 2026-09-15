import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch02_p1: SimDef = {
    id: 'v3_c10_phy_ch02_p1',
    title: 'Magnetic Effects of Current · Part 1/2',
    subtitle: 'Turn a twitching compass needle into motors and power',
    classLevel: 10, subject: 'physics', topic: 'Magnetic Effects of Current · Part 1/2',
    chapters: ['c10_phy_ch02'],
    nodeIds: ['c10_phy_cbse_02_001', 'c10_phy_cbse_02_002', 'c10_phy_cbse_02_003', 'c10_phy_cbse_02_004', 'c10_phy_cbse_02_005', 'c10_phy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an electrical engineer', intro: 'A wire lies over a compass; you close the switch and the needle jumps. You\'ve just witnessed the link between electricity and magnetism — the link that runs every fan, motor and MRI machine.', goal: 'Explain magnetic fields around current-carrying conductors, apply Fleming\'s rules, and connect electromagnetic induction and domestic circuits.' },
    discovery: {
        question: 'In 1820 Oersted held a compass near a wire, switched on the current — and the needle twitched. No magnet touched it, nothing visible moved. What did that twitch prove?',
        options: ['Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon', 'Compasses are simply unreliable near wires', 'The wire heated up and bent the needle physically', 'Static electricity in the air deflected the compass'],
        answer: 'Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon',
        hook: 'That twitching needle launched electromagnets, motors and generators. A current-carrying wire is secretly a magnet — and the right-hand thumb rule tells you which way its field curls.',
    },
    teaching: [
        { title: 'Magnetic Field and Field Lines: Properties and Representation', text: 'A magnetic field is the region around a magnet or a current-carrying conductor where a magnetic force can be experienced by another magnet, a magnetic material (like iron), or a moving charge.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_02_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Map the invisible: trace field lines around straight wires, loops and solenoids, apply the right-hand rules, then wire up a motor and a fuse — harnessing force on conductors safely.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_001', title: 'Magnetic Field and Field Lines: Properties and Representation',
          caseStudy: { intro: 'Begin with a real-world observation: sprinkle iron filings on a sheet of paper placed over a bar magnet — the filings align in curved patterns revealing the.',
            decisions: [{ prompt: 'What is the direction of magnetic field lines outside a bar magnet, and what does the closeness of field lines indicate about the magnetic.', options: [
                { text: 'Outside a bar magnet, magnetic field lines emerge from the north pole and enter the south', outcome: 'Outside a bar magnet, magnetic field lines emerge from the north pole and enter the south pole.' },
                { text: 'lines go from south to north outside', outcome: 'Not quite — Students often believe magnetic field lines start at the north pole and end at the south pole.', reveals: 'magnetic-field-lines-start-at' },
                { text: 'closeness indicates direction only', outcome: 'Not quite — Students often believe magnetic field lines start at the north pole and end at the south pole.', reveals: 'magnetic-field-lines-start-at' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_002', title: 'Magnetic Field Due to a Current-Carrying Straight Conductor',
          scaffold: { problem: 'A long straight copper wire in a household circuit carries a current of 10 A.',
            steps: [
            { text: 'Identify given quantities: I = 10 A, r = 4.0 cm = 0.040 m, μ₀ = 4π × 10⁻⁷ T·m/A. Find: B_wire in tesla.' },
            { text: 'Write the formula for magnetic field due to infinite straight wire: B = μ₀I / (2πr).' },
            { text: 'Substitute values with units: B = (4π × 10⁻⁷ T·m/A × 10 A) / (2π × 0.040 m).' },
            { text: 'Simplify step by step: Cancel π: (4 × 10⁻⁷ × 10) / (2 × 0.040) = (40 × 10⁻⁷) / 0.080 = (4.0 × 10⁻⁶) / 0.080 = 5.0.' },
            { text: 'Compare with Earth\'s field: B_wire = 5.0 × 10⁻⁵ T, B_earth ≈ 3.5 × 10⁻⁵ T.', faded: true, blankAnswer: 'B = 5.0 × 10⁻⁵ T (or 0.50 G). This exceeds Earth\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_003', title: 'Magnetic Field Due to a Circular Loop (Right-Hand Thumb Rule)',
          scaffold: { problem: 'A circular coil of 20 turns and radius 8 cm is connected to a 12 V battery. The resistance of the coil is 4 Ω.',
            steps: [
            { text: 'Identify given quantities: Number of turns \\( N = 20 \\), radius \\( R = 8 \\, \\text{cm} = 0.08 \\, \\text{m} \\), battery.' },
            { text: 'First find the current using Ohm\'s law: \\( I = \\frac{V}{R_{\\text{coil}}} = \\frac{12}{4} = 3 \\, \\text{A} \\).' },
            { text: 'Substitute values: \\( B = \\frac{(4\\pi \\times 10^{-7}) \\times 20 \\times 3}{2 \\times 0.08} \\).' },
            { text: 'Compute stepwise: Numerator = \\( 4\\pi \\times 10^{-7} \\times 60 = 240\\pi \\times 10^{-7} \\). Denominator = \\( 0.16 \\).' },
            { text: 'Verify: For a small coil with moderate current, a field of ~0.5 mT is reasonable (Earth\'s field is ~0.05 mT).', faded: true, blankAnswer: '\\( 4.71 \\times 10^{-4} \\, \\text{T} \\) (or 0.471 mT)' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_004', title: 'Magnetic Field Due to a Solenoid and Electromagnet',
          caseStudy: { intro: 'Observe a doorbell or an electric crane lifting scrap metal — both use electromagnets.',
            decisions: [{ prompt: 'State the direction of the magnetic field inside a long solenoid carrying current, and name the rule used to determine the polarity of its.', options: [
                { text: 'Inside a long solenoid, magnetic field lines are straight, parallel to the axis, and', outcome: 'Inside a long solenoid, magnetic field lines are straight, parallel to the axis, and directed from.' },
                { text: 'field lines are circular inside', outcome: 'Not quite — Students often think the magnetic field **outside** a solenoid is zero.', reveals: 'the-magnetic-field-outside-a' },
                { text: 'the magnetic field **outside** a solenoid is zero', outcome: 'Not quite — Students often think the magnetic field **outside** a solenoid is zero.', reveals: 'the-magnetic-field-outside-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_005', title: 'Force on a Current-Carrying Conductor in a Magnetic Field',
          scaffold: { problem: 'A copper wire of length 20 cm is placed perpendicular to a uniform magnetic field of 0.4 T.',
            steps: [
            { text: 'Identify given quantities: L = 20 cm = 0.20 m, B = 0.4 T, I = 3 A, θ = 90° (perpendicular), mass m = 5 g = 0.005 kg.' },
            { text: 'Formula for force: F = B I L sinθ. Since θ = 90°, sinθ = 1. Formula for acceleration: a = F/m (Newton\'s second law).' },
            { text: 'Substitute into force formula: F = (0.4 T) × (3 A) × (0.20 m) × 1 = 0.24 N.' },
            { text: 'Check units: T·A·m = (N/(A·m))·A·m = N. Correct.' },
            { text: 'Calculate acceleration: a = F/m = 0.24 N / 0.005 kg = 48 m/s².', faded: true, blankAnswer: 'Force = 0.24 N, Acceleration = 48 m/s².' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_02_006', title: 'Domestic Electric Circuits: Live, Neutral, Earth Wires',
          scaffold: { problem: 'A household has a 220 V supply. The following appliances are connected in parallel: a 60 W LED bulb, a 1200 W electric kettle, and a 300.',
            steps: [
            { text: 'Identify given values: V = 220 V (same for all parallel appliances), P₁ = 60 W, P₂ = 1200 W, P₃ = 300 W.' },
            { text: 'Use formula I = P / V for each appliance. Check units: watt / volt = ampere.' },
            { text: 'Compute I₁ = 60 W / 220 V = 0.273 A. I₂ = 1200 W / 220 V = 5.45 A. I₃ = 300 W / 220 V = 1.36 A.' },
            { text: 'Total current in parallel = sum of branch currents: I_total = 0.273 + 5.45 + 1.36 = 7.08 A.' },
            { text: 'Compare I_total (7.08 A) with fuse rating (10 A). Since 7.08 A < 10 A, the fuse will NOT blow.', faded: true, blankAnswer: '(a) LED bulb: 0.27 A; Kettle: 5.45 A; Refrigerator: 1.36 A.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a physics chart, a student draws a bar magnet\'s field lines: eight lines emerging from the north pole but only five curving back into the south pole. \'Three lines get used up in the middle,\' he explains.',
            decisions: [{ prompt: 'What is wrong with his diagram?', options: [
                { text: 'Field lines are continuous closed loops — every line that leaves the north pole returns to the south pole (and continues inside the magnet), so the counts must match. Lines also crowd near the poles, which is what shows the field is strongest there; lines cannot end, cross or vanish midway.', outcome: 'Correcting the drawing to equal lines in and out captures two real rules: field lines form closed curves and their density — not their survival — tells the field\'s strength.' },
                { text: 'He is right — some field lines dissipate in the air between the poles, so fewer reach the south end.', outcome: 'Field lines do not wear out or dissipate — each one is a closed loop, so the number leaving north always equals the number entering south.', reveals: 'field-lines-dissipate' },
                { text: 'The error is the opposite — more lines should enter the south pole than leave the north, because south \'pulls harder.\'', outcome: 'Neither pole outranks the other — the lines are shared closed loops, so the counts at both poles are always equal.', reveals: 'south-pulls-harder' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every electric motor on Earth is Oersted\'s compass writ large — current becomes magnetism, magnetism becomes motion, and a fuse stands guard over all of it.',
            decisions: [{ prompt: 'What comes next? Magnetic Effects of Current · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Magnetic Effects of Current · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_001', difficulty: 'standard',
          question: 'A magnetic field is the region around a magnet or a current-carrying conductor.',
          hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1.',
          misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like.',
          parts: [
                { id: 'a', prompt: 'Two magnetic field lines are drawn intersecting each other in a student\'s diagram.', answer: 'Magnetic field lines cannot intersect',
                  options: ['Magnetic field lines cannot intersect', 'intersection means stronger field', 'it\'s allowed in some cases', 'field lines cancel'],
                  hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1 (force.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'b', prompt: 'A student draws magnetic field lines for a bar magnet as straight lines radiating outward from the north pole and inward to the south pole.', answer: 'The error is drawing straight radial lines',
                  options: ['The error is drawing straight radial lines', 'field lines cancel'],
                  hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1 (force.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'c', prompt: 'A plotting compass is placed at point P near a bar magnet. The compass needle aligns at 30° to the horizontal.', answer: 'The compass needle aligns with the resultant magnetic field vector',
                  options: ['The compass needle aligns with the resultant magnetic field vector', 'field lines cancel'],
                  hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1 (force.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' }
          ],
            remediations: { 'magnetic-field-lines-start-at': { steps: ['Revisit the iron filings pattern — observe that filings form continuous curves with no breaks at the poles.', 'Use a plotting compass to trace a single field line all the way around — physically move the compass from outside north.', 'Explicitly state: "No magnetic monopoles exist → field lines cannot start or end → they must close on themselves."', 'Practice drawing 3 complete loops for a bar magnet, showing internal continuation with dashed lines.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Magnetic field lines begin at the north pole and end at the south pole." Is it fully correct?', answer: 'The statement is incomplete/incorrect',
                  options: ['The statement is incomplete/incorrect', 'field lines cancel'],
                  hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1 (force.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' },
                { id: 'b', prompt: 'Design a simple experiment using a bar magnet, a plotting compass, and a sheet of paper to map the magnetic field lines around the magnet.', answer: 'Procedure: (1) Fix white paper on a board',
                  options: ['Procedure: (1) Fix white paper on a board', 'field lines cancel'],
                  hint: 'If stuck, revisit c8_physics_ch2_1 (compass needle deflection) and c9_physics_ch3_1 (force.',
                  misconception: 'Students often believe magnetic field lines start at the north pole and end at the south pole, treating them like electric field lines from.' }
          ],
            remediations: { 'magnetic-field-lines-start-at': { steps: ['Revisit the iron filings pattern — observe that filings form continuous curves with no breaks at the poles.', 'Use a plotting compass to trace a single field line all the way around — physically move the compass from outside north.', 'Explicitly state: "No magnetic monopoles exist → field lines cannot start or end → they must close on themselves."', 'Practice drawing 3 complete loops for a bar magnet, showing internal continuation with dashed lines.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_002', difficulty: 'standard',
          question: 'A current-carrying straight conductor produces a magnetic field in the.',
          hint: 'Revisit c10_phy_cbse_02_001 for field line properties and c8_physics_ch2_2 for the.',
          misconception: 'Students believe the magnetic field lines around a straight wire are **spirals** or **helices** that move along the.',
          parts: [
                { id: 'a', prompt: 'Two identical long straight wires carry currents of 2 A and 4 A respectively.', answer: 'Ratio B₁:B₂ = 2:4 = **1:2**',
                  options: ['Ratio B₁:B₂ = 2:4 = **1:2**', 'the distance dependence changes the ratio'],
                  hint: 'Revisit c10_phy_cbse_02_001 for field line properties and c8_physics_ch2_2 for the compass.',
                  misconception: 'Students believe the magnetic field lines around a straight wire are **spirals** or **helices** that move along the wire, because they.' }
          ],
            remediations: { 'the-magnetic-field-lines-around': { steps: ['** Have the student hold a pencil vertically (wire) and use their right hand to demonstrate: thumb up, fingers curl.', '** Place a compass on a horizontal cardboard with a vertical wire through a hole.', '** Ask: "If field lines were helical, where would they go after one turn?', '** Contrast with solenoid (c10_phy_cbse_02_004) where field lines ARE helical inside — but that\'s a different geometry.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_003', difficulty: 'standard',
          question: 'The magnetic field at the centre of a current-carrying circular loop is.',
          hint: 'If stuck, revisit c10_phy_cbse_02_002 and practice the right-hand thumb rule for.',
          misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb.',
          parts: [
                { id: 'a', prompt: 'Two identical circular loops A and B carry equal currents. Loop A has a single turn; loop B has 10 turns but the same radius.', answer: 'Magnitude: \\( B_B = 10 \\times B_A \\)',
                  options: ['Magnitude: \\( B_B = 10 \\times B_A \\)', 'magnitude becomes 1/10th'],
                  hint: 'If stuck, revisit c10_phy_cbse_02_002 and practice the right-hand thumb rule for a straight wire.',
                  misconception: 'Students often think the right-hand thumb rule for a loop is the same as for a straight wire: they point the thumb in the direction.' }
          ],
            remediations: { 'the-right-hand-thumb-rule': { steps: ['Hold a straight wire vertically and use the right-hand grip rule (thumb = current, fingers = field circles) to recall.', 'Now bend the wire into a loop. Place your right hand so that the fingers follow the current around the loop; the thumb.', 'Practice with three different current directions (clockwise, anticlockwise, into/out of page) and draw the field.', 'Verify with a compass and a real loop: the compass needle aligns with the thumb direction.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_004', difficulty: 'standard',
          question: 'A solenoid is a long helical coil of insulated copper wire that produces.',
          hint: 'If stuck, review the right-hand grip rule for a solenoid (c10_phy_cbse_02_003) and.',
          misconception: 'Students often think the magnetic field **outside** a solenoid is zero.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform',
                  options: ['A solenoid is a long helical coil of insulated copper wire that produces a nearly uniform', 'A magnetic field is the region around a magnet or a current-carrying conductor where a', 'A current-carrying straight conductor produces a magnetic field in the surrounding space', 'The magnetic field at the centre of a current-carrying circular loop is a vector quantity'],
                  hint: 'If stuck, review the right-hand grip rule for a solenoid (c10_phy_cbse_02_003) and practice drawing.',
                  misconception: 'Students often think the magnetic field **outside** a solenoid is zero.' }
          ],
            remediations: { 'the-magnetic-field-outside-a': { steps: ['Revisit the magnetic field of a single circular loop (c10_phy_cbse_02_003) and draw field lines for 2-3 loops.', 'Use a compass to map the field around a real solenoid (or a spring) connected to a battery; observe deflection inside.', 'Apply the right-hand grip rule to each turn and verify thumb direction gives the north pole.', 'Compare with a bar magnet\'s field pattern using iron filings or a plotting compass.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_005', difficulty: 'standard',
          question: 'The force experienced by a current-carrying conductor placed in a uniform.',
          hint: 'If stuck, review c10_phy_cbse_02_002 (Magnetic Field Due to a Current-Carrying Straight.',
          misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse.',
          parts: [
                { id: 'a', prompt: 'State the formula for the force on a current-carrying conductor in a magnetic field. Define each symbol and its SI unit.', answer: 'The formula is \\( F = B I L \\sin\\theta \\)',
                  options: ['The formula is \\( F = B I L \\sin\\theta \\)', 'parallel', 'aligned', 'alignment gives maximum interaction'],
                  hint: 'If stuck, review c10_phy_cbse_02_002 (Magnetic Field Due to a Current-Carrying Straight Conductor).',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' },
                { id: 'b', prompt: 'Two identical wires of length \\( L \\) carry the same current \\( I \\) and are placed in the same uniform magnetic field \\( B \\).', answer: 'Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)',
                  options: ['Force on Wire A: \\( F_A = BIL\\sin 90^\\circ = BIL \\)', 'parallel', 'aligned', '\\( \\theta = 45^\\circ \\'],
                  hint: 'If stuck, review c10_phy_cbse_02_002 (Magnetic Field Due to a Current-Carrying Straight Conductor).',
                  misconception: 'Students often think the force is maximum when the conductor is parallel to the magnetic field because they confuse "parallel" with.' }
          ],
            remediations: { 'the-force-is-maximum-when': { steps: ['Revisit the experimental observation: a wire jumps only when perpendicular to the field.', 'Practice Fleming\'s left-hand rule with a physical hand model: label fingers on a paper cutout.', 'Solve five numerical problems where \\( \\theta \\) is not 90°, explicitly writing \\( \\sin\\theta \\) each time.', 'Draw vector diagrams showing \\( \\vec{I} \\), \\( \\vec{B} \\), and \\( \\vec{F} \\) for \\( \\theta = 30^\\circ, 90^\\circ.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_02_006', difficulty: 'standard',
          question: 'A domestic electric circuit is a parallel arrangement of electrical appliances.',
          hint: 'Revisit Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and Class 7.',
          misconception: 'Students often think the earth wire carries current during normal operation of an appliance (like a third "return".',
          parts: [
                { id: 'a', prompt: 'Name the three wires in a domestic electric circuit, give their standard colour codes (as per the new Indian convention), and state the potential of each wire.', answer: 'Live wire – brown (old: red), at 220 V AC relative to ground',
                  options: ['Live wire – brown (old: red), at 220 V AC relative to ground', 'return', 'earth wire completes the circuit', 'current flows live → appliance → earth'],
                  hint: 'Revisit Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and Class 7 "Simple.',
                  misconception: 'Students often think the earth wire carries current during normal operation of an appliance (like a third "return" path).' },
                { id: 'b', prompt: 'A 1500 W electric geyser is connected to the 220 V mains. Calculate the current drawn by the geyser.', answer: 'Given: Power P = 1500 W, Voltage V = 220 V',
                  options: ['Given: Power P = 1500 W, Voltage V = 220 V', 'return', 'earth wire completes the circuit', 'current flows live → appliance → earth'],
                  hint: 'Revisit Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and Class 7 "Simple.',
                  misconception: 'Students often think the earth wire carries current during normal operation of an appliance (like a third "return" path).' }
          ],
            remediations: { 'the-earth-wire-carries-current': { steps: ['To correct this, perform a simple activity: Take a three‑pin plug, identify the earth pin (longer, thicker).', 'Use a multimeter in current‑measuring mode (or a clamp meter) on the earth wire of a working appliance (e.g., a table.', 'Then simulate a fault by connecting a resistor (e.g., 100 Ω) between the live pin and the earth pin (with the appliance.', 'This shows earth carries current only during a fault.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
