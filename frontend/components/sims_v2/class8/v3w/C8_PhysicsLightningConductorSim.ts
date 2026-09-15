import type { SimDef } from '../../engine/types';
import C8_PhysicsLightningConductorSim from '../../../simulations/c6_12/C8_PhysicsLightningConductorSim';

/** v3 wrapped master — C8_PhysicsLightningConductorSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_physicslightningconductorsim: SimDef = {
    id: 'v3w_c8_physicslightningconductorsim',
    title: 'Lightning Conductor',
    subtitle: 'Covers the meteorological conditions, formation process, and life cycle stages of a.',
    classLevel: 8, subject: 'physics', topic: 'Thunderstorms: Formation and Conditions',
    chapters: [],
    nodeIds: ['c8_physics_ch4_9', 'c8_physics_ch2_1', 'c8_physics_ch2_2', 'c8_physics_ch2_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine standing on a playground in Delhi on a hot May afternoon: the air feels heavy and sticky, and.', goal: 'Master Lightning Conductor.' },
    discovery: {
        question: 'Why does a thunderstorm cloud (cumulonimbus) grow vertically to great heights instead of spreading horizontally like a stratus cloud?',
        options: ['The cloud grows vertically', 'wind pushes it up', 'it\'s just very tall'],
        answer: 'The cloud grows vertically',
        hook: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning).',
    },
    teaching: [
        { title: 'A thunderstorm is a violent, short-lived.', text: 'A thunderstorm is a violent, short-lived weather disturbance characterized by lightning, thunder, heavy rain or hail, and strong gusty winds, formed when warm, moist air rises rapidly in an unstable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch4_9', title: 'A thunderstorm is a violent,.',
          scaffold: { problem: 'On a hot April afternoon in Jaipur, the surface temperature is 42°C with dew point 24°C.',
            steps: [
            { text: 'Identify the three conditions needed: moisture, instability, lifting.' },
            { text: 'Calculate LCL (Lifting Condensation Level) height: ΔT = 42 - 24 = 18°C. LCL ≈ 125 m/°C × 18°C = 2250 m.' },
            { text: 'Check instability above LCL: Rising saturated air cools at moist adiabatic lapse rate (6°C/km).' },
            { text: 'Conclude: All three conditions met (moisture from dew point, instability from lapse rates, lifting from front).' },
            { text: 'Verify reasonableness: Pre-monsoon Jaipur often has such "dry line" thunderstorms.', faded: true, blankAnswer: 'Yes, thunderstorm development is supported. Cloud base.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_1', title: 'When an electric current flows through.',
          scaffold: { problem: 'In a school laboratory, a student connects a 1.5 V dry cell, a switch, and a 1-meter long insulated copper wire in series.',
            steps: [
            { text: 'Identify the given quantities - voltage = 1.5 V, wire orientation = north-south, current direction = south to north,.' },
            { text: 'Recall the principle - electric current produces a magnetic field forming concentric circles around the wire.' },
            { text: 'Apply the principle - for current south to north, the magnetic field above the wire points west (using right-hand rule:.' },
            { text: 'Analyze the interaction - the compass needle aligns with the net magnetic field.' },
            { text: 'Verify physically - the deflection is perpendicular to the wire, not toward it, confirming field is circular not.', faded: true, blankAnswer: 'The needle deflects west because the magnetic field.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_2', title: 'The magnetic field around a.',
          scaffold: { problem: 'A straight vertical wire passes through a horizontal cardboard. A current of 4 A flows downward through the wire.',
            steps: [
            { text: 'Identify given quantities: Current I = 4 A, direction = vertically downward. Compass position = 10 cm north of the wire.' },
            { text: 'Identify the principle: Right-hand thumb rule for a straight conductor.' },
            { text: 'Apply the rule: Grip the wire with right hand, thumb pointing downward.' },
            { text: 'The compass needle aligns with the magnetic field; its north pole points in the direction of the field, which is west.' },
            { text: 'Verify: If current were upward, field on north side would be east. Downward current reverses it to west.', faded: true, blankAnswer: 'The north pole of the compass needle points **west**.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_6', title: 'The heating effect of electric current.',
          scaffold: { problem: 'A 12 V car battery is connected to a headlight filament of resistance 4 Ω. Calculate the heat produced in the filament in 10 minutes.',
            steps: [
            { text: 'Identify given quantities: V = 12 V, R = 4 Ω, t = 10 min = 600 s. We need to find heat H.' },
            { text: 'We know Joule\'s Law H = I²Rt, but current I is not given directly. Use Ohm\'s Law I = V/R to find I.' },
            { text: 'Calculate I = 12 V / 4 Ω = 3 A. Now substitute into H = I²Rt: H = (3 A)² × 4 Ω × 600 s.' },
            { text: 'Compute with unit tracking: 9 A² × 4 Ω × 600 s = 36 × 600 J = 21,600 J. Unit check: A²·Ω·s = (C/s)²·(J·s/C²)·s = J.' },
            { text: 'Verify reasonableness: A car headlight uses tens of watts. Power P = I²R = 9×4 = 36 W.', faded: true, blankAnswer: '21,600 J (or 2.16 × 10⁴ J)' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch2_1', title: 'Identify each idea',
          dissect: { specimen: 'Lightning Conductor', spots: [
            { id: 's1', label: 'A thunderstorm is a violent', prompt: 'Which idea is this? — A thunderstorm is a violent, short-lived weather disturbance characterized by lightning,.', answer: 'A thunderstorm is a violent', options: ['A thunderstorm is a violent', 'When an electric current flows', 'The magnetic field around a', 'The heating effect of electric'] },
            { id: 's2', label: 'When an electric current flows', prompt: 'Which idea is this? — When an electric current flows through a conducting wire, it produces a magnetic field.', answer: 'When an electric current flows', options: ['When an electric current flows', 'A thunderstorm is a violent', 'The magnetic field around a', 'The heating effect of electric'] },
            { id: 's3', label: 'The magnetic field around a', prompt: 'Which idea is this? — The magnetic field around a current-carrying conductor is the region in space surrounding.', answer: 'The magnetic field around a', options: ['The magnetic field around a', 'A thunderstorm is a violent', 'When an electric current flows', 'The heating effect of electric'] },
            { id: 's4', label: 'The heating effect of electric', prompt: 'Which idea is this? — The heating effect of electric current is the phenomenon where electrical energy is.', answer: 'The heating effect of electric', options: ['The heating effect of electric', 'A thunderstorm is a violent', 'When an electric current flows', 'The magnetic field around a'] }
          ] } }
    ],
    explore: { component: C8_PhysicsLightningConductorSim, prompt: 'Explore the interactive — Lightning Conductor' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch4_9', difficulty: 'standard',
          question: 'A thunderstorm is a violent, short-lived weather disturbance characterized by.',
          hint: 'Review "Convection: Heat Transfer in Liquids and Gases" (c7_physics_ch03_004) and "Water.',
          misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning).',
          parts: [
                { id: 'a', prompt: 'Why does a thunderstorm cloud (cumulonimbus) grow vertically to great heights instead of spreading horizontally like a stratus cloud?', answer: 'The cloud grows vertically',
                  options: ['The cloud grows vertically', 'wind pushes it up', 'it\'s just very tall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning) and that **thunder.' },
                { id: 'b', prompt: 'Compare the dissipating stage of a thunderstorm with its mature stage. What specific change in the cloud\'s internal airflow causes the storm to weaken and die?', answer: 'In the mature stage, strong updrafts and downdrafts coexist, feeding the storm',
                  options: ['In the mature stage, strong updrafts and downdrafts coexist, feeding the storm', 'the rain stops', 'the cloud runs out of water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning) and that **thunder.' }
          ],
            remediations: { 'lightning-is-attracted-to-tall': { steps: ['**Demonstrate the "path of least resistance" concept:** Use a simple circuit with a battery, two parallel paths — one.', 'Show the bulb on the copper path lights up.', 'Explain: lightning doesn\'t get "attracted"; it takes the easiest path to ground.', '**Show thunder mechanism:** Stretch a rubber band, pluck it near ear — hear a snap.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning).',
          parts: [
                { id: 'a', prompt: 'A student claims: "Thunderstorms only happen in summer because that\'s when it\'s hottest." Evaluate this statement.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'pulling'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning) and that **thunder.' },
                { id: 'b', prompt: 'Compare the dissipating stage of a thunderstorm with its mature stage. What specific change in the cloud\'s internal airflow causes the storm to weaken and die?', answer: 'In the mature stage, strong updrafts and downdrafts coexist, feeding the storm',
                  options: ['In the mature stage, strong updrafts and downdrafts coexist, feeding the storm', 'the rain stops', 'the cloud runs out of water', 'pulling'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **lightning is attracted to tall metal objects** (like a lightning rod "pulling" lightning) and that **thunder.' }
          ],
            remediations: { 'lightning-is-attracted-to-tall': { steps: ['**Demonstrate the "path of least resistance" concept:** Use a simple circuit with a battery, two parallel paths — one.', 'Show the bulb on the copper path lights up.', 'Explain: lightning doesn\'t get "attracted"; it takes the easiest path to ground.', '**Show thunder mechanism:** Stretch a rubber band, pluck it near ear — hear a snap.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_1', difficulty: 'standard',
          question: 'When an electric current flows through a conducting wire, it produces a.',
          hint: 'If stuck, review Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and.',
          misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is.',
          parts: [
                { id: 'a', prompt: 'In Oersted\'s experiment, the compass needle deflects when placed above a horizontal wire carrying current from south to north.', answer: 'The needle will deflect in the opposite direction',
                  options: ['The needle will deflect in the opposite direction', 'deflection stays the same', 'needle stops deflecting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' },
                { id: 'b', prompt: 'A student sets up a circuit with a 1.5 V cell, a switch, and a long straight wire. The compass is placed 5 cm below the wire.', answer: 'The deflection angle will increase (become larger than 30°)',
                  options: ['The deflection angle will increase (become larger than 30°)', 'angle stays 30°', 'angle decreases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' },
                { id: 'c', prompt: 'Two identical circuits are set up side by side. Circuit A has a thick copper wire; Circuit B has a thin copper wire of the same length.', answer: 'Circuit A (thick wire) produces greater deflection',
                  options: ['Circuit A (thick wire) produces greater deflection', 'thin wire deflects more', 'both same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' }
          ],
            remediations: { 'the-wire-itself-becomes-a': { steps: ['Have the student hold a compass near a vertical wire connected to a battery.', 'Ask them to observe the needle direction when current flows UP vs DOWN (reverse battery).', 'Guide them to see the needle aligns PERPENDICULAR to the wire, not pointing AT the wire.', 'Use iron filings on cardboard with vertical wire to visualize circular field lines.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_2', difficulty: 'standard',
          question: 'The magnetic field around a current-carrying conductor is the region in space.',
          hint: 'If stuck, revisit the compass needle deflection activity (c8_physics_ch2_1) and practice.',
          misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire.',
          parts: [
                { id: 'a', prompt: 'Why do iron filings arrange themselves in concentric circles around a current-carrying straight wire, and not in straight lines radiating outward?', answer: 'Iron filings align along magnetic field lines',
                  options: ['Iron filings align along magnetic field lines', 'field lines start at the wire and go outwards', 'magnetic rays'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of a.' },
                { id: 'b', prompt: 'A straight horizontal wire carries a current of 2 A from west to east. A compass is placed 5 cm directly below the wire.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'magnetic rays'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of a.' }
          ],
            remediations: { 'the-magnetic-field-lines-around': { steps: ['Re-do the iron filings activity (or watch a video) with a vertical wire; explicitly trace one circle with a finger to.', 'Use a compass at 2 cm and 4 cm from the wire: count how many compass steps (degrees of deflection) occur at each.', 'Practice right-hand thumb rule with a physical wire model: hold a pencil as the wire, point thumb in current direction,.', 'Do this for current up, down, left, right until direction prediction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the current in a wire, the magnetic field lines become twice as far apart." Evaluate this statement.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'magnetic rays'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of a.' },
                { id: 'b', prompt: 'Design a simple experiment using only a battery, a switch, a long straight wire, a cardboard sheet, iron filings, and a compass to demonstrate that the.', answer: '**Expected answer:** 1',
                  options: ['**Expected answer:** 1', 'magnetic rays'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of a.' }
          ],
            remediations: { 'the-magnetic-field-lines-around': { steps: ['Re-do the iron filings activity (or watch a video) with a vertical wire; explicitly trace one circle with a finger to.', 'Use a compass at 2 cm and 4 cm from the wire: count how many compass steps (degrees of deflection) occur at each.', 'Practice right-hand thumb rule with a physical wire model: hold a pencil as the wire, point thumb in current direction,.', 'Do this for current up, down, left, right until direction prediction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_6', difficulty: 'standard',
          question: 'The heating effect of electric current is the phenomenon where electrical.',
          hint: 'If stuck, review Class 7 concept of electric current (c7_physics_ch02_003) and the.',
          misconception: 'Students think that if you double the current, the heat doubles.',
          parts: [
                { id: 'a', prompt: 'Why does the heat produced depend on the square of the current (I²) and not just on current (I)? Explain using the idea of electron collisions.', answer: 'Heat depends on I² because: (1) The number of electrons passing per second is',
                  options: ['Heat depends on I² because: (1) The number of electrons passing per second is', 'more current means more electrons so more heat', 'if you double the current, the heat doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that if you double the current, the heat doubles.' },
                { id: 'b', prompt: 'An electric kettle has a heating coil of resistance 25 Ω. If a current of 8 A flows through it for 3 minutes, calculate the heat produced in joules.', answer: 'Given: R = 25 Ω, I = 8 A, t = 3 min = 180 s',
                  options: ['Given: R = 25 Ω, I = 8 A, t = 3 min = 180 s', 'if you double the current, the heat doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that if you double the current, the heat doubles.' },
                { id: 'c', prompt: 'Two identical resistors are connected (a) in series and (b) in parallel across the same battery. In which arrangement is more heat produced per minute?', answer: 'Parallel arrangement produces more heat',
                  options: ['Parallel arrangement produces more heat', 'series because resistance is higher', 'if you double the current, the heat doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that if you double the current, the heat doubles.' }
          ],
            remediations: { 'if-you-double-the-current': { steps: ['Revisit the microscopic picture: current is charge per second.', 'Recall that the drift speed of electrons also doubles (for ohmic conductors), so each electron carries twice the.', 'Use the analogy of throwing balls at a wall: twice as many balls thrown twice as fast → 4 times the impact energy.', 'Do a quick numerical check: calculate H for I=1A, R=1Ω, t=1s (H=1J) and for I=2A (H=4J).'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think that if you double the current, the heat doubles.',
          parts: [
                { id: 'a', prompt: 'A student calculates heat produced in a 10 Ω resistor with 2 A current for 5 minutes and gets 600 J. Evaluate if this answer is correct. If not, find the error.', answer: 'Correct calculation: H = I²Rt = (2)² × 10 × (5×60) = 4 × 10 × 300 = 12,000 J',
                  options: ['Correct calculation: H = I²Rt = (2)² × 10 × (5×60) = 4 × 10 × 300 = 12,000 J', 'if you double the current, the heat doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that if you double the current, the heat doubles.' }
          ],
            remediations: { 'if-you-double-the-current': { steps: ['Revisit the microscopic picture: current is charge per second.', 'Recall that the drift speed of electrons also doubles (for ohmic conductors), so each electron carries twice the.', 'Use the analogy of throwing balls at a wall: twice as many balls thrown twice as fast → 4 times the impact energy.', 'Do a quick numerical check: calculate H for I=1A, R=1Ω, t=1s (H=1J) and for I=2A (H=4J).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
