import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch02_p1: SimDef = {
    id: 'v3_c8_physics_ch02_p1',
    title: 'Electricity: Magnetic and Heating Effects · Part 1/2',
    subtitle: 'The twitching needle that joined two sciences',
    classLevel: 8, subject: 'physics', topic: 'Electricity: Magnetic and Heating Effects · Part 1/2',
    chapters: ['c8_physics_ch02'],
    nodeIds: ['c8_physics_ch2_1', 'c8_physics_ch2_10', 'c8_physics_ch2_11', 'c8_physics_ch2_2', 'c8_physics_ch2_3', 'c8_physics_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab assistant repeating Oersted\'s experiment', intro: 'One battery, one wire, one compass — and a needle that refuses to sit still. You\'re about to watch electricity reach out and bend magnetism.', goal: 'Understand that electric current produces a magnetic field (Oersted\'s experiment) — the needle deflects only while current flows, and its direction follows the current\'s direction.' },
    discovery: {
        question: 'A compass sits near a plain copper wire. Close the switch — the needle twitches. Open it — the needle swings back to north. The wire isn\'t a magnet, so what just happened?',
        options: ['The flowing current created a magnetic field around the wire — electricity and magnetism are secretly linked', 'The battery magnetised the wire permanently', 'The current flowed through the compass needle', 'The needle was just faulty'],
        answer: 'The flowing current created a magnetic field around the wire — electricity and magnetism are secretly linked',
        hook: 'The wire never becomes a magnet — it only hosts a field while current runs. Flip the battery and the needle flips too; add a second cell and the swing grows. Invisible field, very visible needle.',
    },
    teaching: [
        { title: 'Magnetic Effect of Electric Current: Compass Needle Deflection', text: 'When an electric current flows through a conducting wire, it produces a magnetic field around it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch2_1', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Recreate Oersted\'s experiment yourself: place a compass around a live wire, watch the needle align in circles, reverse the current to reverse the deflection — and prove the field only exists while electrons flow.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch2_1', title: 'Magnetic Effect of Electric Current: Compass Needle Deflection',
          caseStudy: { intro: 'Start with a real-world observation: when you bring a magnetic compass near a wire connected to a battery and switch, the needle moves when the switch.',
            decisions: [{ prompt: 'A compass needle points north-south when placed far from any wire.', options: [
                { text: 'The observation tells us that an electric current produces a magnetic field around the', outcome: 'The observation tells us that an electric current produces a magnetic field around the wire.' },
                { text: 'the battery attracts the needle', outcome: 'Not quite — Students often believe the wire itself becomes a permanent magnet when current flows, and that the.', reveals: 'the-wire-itself-becomes-a' },
                { text: 'the wire becomes a magnet permanently', outcome: 'Not quite — Students often believe the wire itself becomes a permanent magnet when current flows, and that the.', reveals: 'the-wire-itself-becomes-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_10', title: 'Compact Fluorescent Lamp (CFL) vs Incandescent Bulb: Efficiency',
          scaffold: { problem: 'An incandescent bulb rated 60 W is used for 4 hours. It produces light energy equivalent to 8 W of light power.',
            steps: [
            { text: 'Identify given quantities: Electrical power input = 60 W, Light power output = 8 W, Time = 4 h.' },
            { text: 'Identify formulas: Efficiency = (Light power output / Electrical power input) × 100%; Electrical energy = Power × Time.' },
            { text: 'Substitute values for efficiency: (8 W / 60 W) × 100% = 13.33%. For energy: 60 W × 4 h = 240 Wh = 0.24 kWh.' },
            { text: 'Compute with units: Efficiency = 0.1333 × 100% = 13.33%. Energy = 60 W × 4 h = 240 Wh = 0.24 kWh.' },
            { text: 'Verify reasonableness: Incandescent bulbs are typically 10-15% efficient, so 13.33% is plausible.', faded: true, blankAnswer: 'Efficiency = 13.33%, Electrical energy consumed = 0.24 kWh.' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch2_11', title: 'Rechargeable vs Non-Rechargeable Cells and Batteries',
          caseStudy: { intro: 'Observe a TV remote (uses AA alkaline cells that you throw away) and a mobile phone (uses a Li-ion battery you recharge daily).',
            decisions: [{ prompt: 'State the fundamental chemical difference between a rechargeable (secondary) cell and a non-rechargeable (primary) cell in one sentence.', options: [
                { text: 'A rechargeable cell employs a reversible chemical reaction that can be driven in the', outcome: 'A rechargeable cell employs a reversible chemical reaction that can be driven in the opposite.' },
                { text: 'rechargeable cells have more chemicals', outcome: 'Not quite — Students often believe that any "dead" battery can be revived by putting it in a charger, or that.', reveals: 'any-dead-battery-can-be' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_2', title: 'Magnetic Field Around a Current-Carrying Conductor',
          caseStudy: { intro: 'Observe a ceiling fan motor: when switched on, the wires inside carry current and create magnetism that makes the fan rotate.',
            decisions: [{ prompt: 'A student sets up a circuit with a straight vertical wire connected to a battery. The current flows upward.', options: [
                { text: 'The magnetic field at a point east of the wire points **north** (into the plane of the', outcome: 'The magnetic field at a point east of the wire points **north** (into the plane of the paper.' },
                { text: 'magnetic rays', outcome: 'Not quite — Students often think the magnetic field lines around a straight wire are straight lines radiating.', reveals: 'the-magnetic-field-lines-around' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_3', title: 'Electromagnet: Construction and Working Principle',
          caseStudy: { intro: 'Observe how a doorbell works — when you press the button, a metal striker hits the bell, but there is no permanent magnet inside.',
            decisions: [{ prompt: 'What are the three essential components needed to construct a basic electromagnet, and what material must the core be made of for it.', options: [
                { text: 'A basic electromagnet requires: (1) a coil of insulated copper wire, (2) a soft iron core', outcome: 'A basic electromagnet requires: (1) a coil of insulated copper wire, (2) a soft iron core (like.' },
                { text: 'steel core', outcome: 'Not quite — Students think the iron core becomes a permanent magnet that "stores" magnetism like a battery.', reveals: 'the-iron-core-becomes-a' },
                { text: 'permanent magnet core', outcome: 'Not quite — Students think the iron core becomes a permanent magnet that "stores" magnetism like a battery.', reveals: 'the-iron-core-becomes-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_4', title: 'Factors Affecting Strength of an Electromagnet',
          caseStudy: { intro: 'Observe a crane in a scrapyard lifting heavy iron pieces with a large circular magnet — that is an industrial electromagnet.',
            decisions: [{ prompt: 'State the three factors that affect the strength of an electromagnet and, for each, describe whether increasing it makes the electromagnet.', options: [
                { text: 'The three factors are: (1) Number of turns in the coil', outcome: 'The three factors are: (1) Number of turns in the coil — increasing turns increases strength.' },
                { text: 'more turns always means stronger magnet', outcome: 'Not quite — Students think "more turns always means stronger magnet" without considering that adding turns with.', reveals: 'more-turns-always-means-stronger' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Rebuilding Oersted\'s demo on a desk, a student rests a compass near a wire, closes the switch and watches the needle swing. His lab partner concludes, \'The wire must have turned into a permanent magnet — it will attract iron pins even with the switch off.\'',
            decisions: [{ prompt: 'Is that what the needle\'s deflection shows?', options: [
                { text: 'No — the needle deflects only while the circuit is closed and springs back to north-south when it opens, so the magnetic field exists only while current flows; the wire never becomes a permanent magnet, and reversing the battery flips the deflection.', outcome: 'This reads the evidence correctly: current produces a field, and the field lives and dies with the current.' },
                { text: 'The partner is right — once a wire carries current it stays magnetised, which is why the needle moved.', outcome: 'Then the needle would stay deflected with the switch open; it does not, so the effect belongs to the flowing current, not a magnetised wire.', reveals: 'wire-becomes-magnet' },
                { text: 'The needle moves because current flows through the compass itself — the wire and needle are part of one circuit.', outcome: 'The needle is a free magnet outside the circuit; it is the wire\'s magnetic field, acting at a distance, that turns it.', reveals: 'current-in-needle' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Every current-carrying wire is wrapped in an invisible magnetic field — that\'s the discovery that eventually gave us motors, generators and the entire electric age.',
            decisions: [{ prompt: 'What comes next? Electricity: Magnetic and Heating Effects · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electricity: Magnetic and Heating Effects · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch2_1', difficulty: 'standard',
          question: 'When an electric current flows through a conducting wire, it produces.',
          hint: 'If stuck, review Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and.',
          misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle.',
          parts: [
                { id: 'a', prompt: 'In Oersted\'s experiment, the compass needle deflects when placed above a horizontal wire carrying current from south to north.', answer: 'The needle will deflect in the opposite direction',
                  options: ['The needle will deflect in the opposite direction', 'deflection stays the same', 'needle stops deflecting', 'becomes magnetic'],
                  hint: 'If stuck, review Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and "Images.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' },
                { id: 'b', prompt: 'A student sets up a circuit with a 1.5 V cell, a switch, and a long straight wire. The compass is placed 5 cm below the wire.', answer: 'The deflection angle will increase (become larger than 30°)',
                  options: ['The deflection angle will increase (become larger than 30°)', 'angle stays 30°', 'angle decreases', 'the effect is binary (on/off) rather than proportional to current'],
                  hint: 'If stuck, review Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and "Images.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' },
                { id: 'c', prompt: 'Two identical circuits are set up side by side. Circuit A has a thick copper wire; Circuit B has a thin copper wire of the same length.', answer: 'Circuit A (thick wire) produces greater deflection',
                  options: ['Circuit A (thick wire) produces greater deflection', 'thin wire deflects more', 'both same'],
                  hint: 'If stuck, review Class 6 "Building a Simple Electrical Circuit" (c6_physics_ch03_012) and "Images.',
                  misconception: 'Students often believe the wire itself becomes a permanent magnet when current flows, and that the compass needle is attracted to the wire.' }
          ],
            remediations: { 'the-wire-itself-becomes-a': { steps: ['Have the student hold a compass near a vertical wire connected to a battery.', 'Ask them to observe the needle direction when current flows UP vs DOWN (reverse battery).', 'Guide them to see the needle aligns PERPENDICULAR to the wire, not pointing AT the wire.', 'Use iron filings on cardboard with vertical wire to visualize circular field lines.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_10', difficulty: 'standard',
          question: 'Efficiency of a light bulb is the ratio of useful light energy output to the.',
          hint: 'Revisit Joule\'s law of heating (c8_physics_ch2_6) and power calculation in electric.',
          misconception: 'Students think a bulb with higher wattage is always "more powerful" and therefore better, not realizing wattage.',
          parts: [
                { id: 'a', prompt: 'Two bulbs produce the same brightness: a 60 W incandescent bulb and a 14 W CFL. Which bulb is more efficient and why?', answer: 'The 14 W CFL is more efficient',
                  options: ['The 14 W CFL is more efficient', 'more powerful'],
                  hint: 'Revisit Joule\'s law of heating (c8_physics_ch2_6) and power calculation in electric circuits.',
                  misconception: 'Students think a bulb with higher wattage is always "more powerful" and therefore better, not realizing wattage indicates electrical energy.' },
                { id: 'b', prompt: 'A household replaces five 60 W incandescent bulbs with five 12 W CFLs.', answer: 'Step 1: Power saved per bulb = 60 W - 12 W = 48 W',
                  options: ['Step 1: Power saved per bulb = 60 W - 12 W = 48 W', 'more powerful'],
                  hint: 'Revisit Joule\'s law of heating (c8_physics_ch2_6) and power calculation in electric circuits.',
                  misconception: 'Students think a bulb with higher wattage is always "more powerful" and therefore better, not realizing wattage indicates electrical energy.' }
          ],
            remediations: { 'a-bulb-with-higher-wattage': { steps: ['Take two bulbs of similar brightness (e.g., 60 W incandescent and 14 W CFL) and light them side by side.', 'Hold your hand at the same distance from each; feel which radiates more heat.', 'Read the wattage labels and discuss: "Both give same light, but one uses 60 W, the other 14 W.', 'Calculate efficiency for each using a reference light output value (e.g., 800 lumens) to show CFL efficiency ~60 lm/W.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think a bulb with higher wattage is always "more powerful" and therefore better, not realizing wattage.',
          parts: [
                { id: 'a', prompt: 'A student claims: "A 100 W incandescent bulb is brighter than a 20 W CFL, so the incandescent bulb is more efficient." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'more powerful'],
                  hint: 'Revisit Joule\'s law of heating (c8_physics_ch2_6) and power calculation in electric circuits.',
                  misconception: 'Students think a bulb with higher wattage is always "more powerful" and therefore better, not realizing wattage indicates electrical energy.' }
          ],
            remediations: { 'a-bulb-with-higher-wattage': { steps: ['Take two bulbs of similar brightness (e.g., 60 W incandescent and 14 W CFL) and light them side by side.', 'Hold your hand at the same distance from each; feel which radiates more heat.', 'Read the wattage labels and discuss: "Both give same light, but one uses 60 W, the other 14 W.', 'Calculate efficiency for each using a reference light output value (e.g., 800 lumens) to show CFL efficiency ~60 lm/W.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_11', difficulty: 'standard',
          question: 'A rechargeable cell (secondary cell) uses a reversible chemical reaction that.',
          hint: 'If stuck, revisit the structure and working of a simple electric cell (zinc–carbon) from.',
          misconception: 'Students often believe that any "dead" battery can be revived by putting it in a charger, or that rechargeable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A rechargeable cell (secondary cell) uses a reversible chemical reaction that allows',
                  options: ['A rechargeable cell (secondary cell) uses a reversible chemical reaction that allows', 'When an electric current flows through a conducting wire, it produces a magnetic field', 'Efficiency of a light bulb is the ratio of useful light energy output to the total', 'The magnetic field around a current-carrying conductor is the region in space surrounding'],
                  hint: 'If stuck, revisit the structure and working of a simple electric cell (zinc–carbon) from Class 6.',
                  misconception: 'Students often believe that any "dead" battery can be revived by putting it in a charger, or that rechargeable batteries last forever.' }
          ],
            remediations: { 'any-dead-battery-can-be': { steps: ['Show a cut-away diagram of a NiMH cell and a zinc–carbon cell side by side; highlight that NiMH uses a metal-hydride.', 'Have students test a "dead" alkaline cell in a charger (with safety goggles) and observe heating/leaking, then discuss.', 'cycle number for a NiMH cell from a datasheet to visualize gradual fade.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_2', difficulty: 'standard',
          question: 'The magnetic field around a current-carrying conductor is the region in space.',
          hint: 'If stuck, revisit the compass needle deflection activity (c8_physics_ch2_1) and practice.',
          misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire.',
          parts: [
                { id: 'a', prompt: 'Why do iron filings arrange themselves in concentric circles around a current-carrying straight wire, and not in straight lines radiating outward?', answer: 'Iron filings align along magnetic field lines',
                  options: ['Iron filings align along magnetic field lines', 'field lines start at the wire and go outwards', 'magnetic rays'],
                  hint: 'If stuck, revisit the compass needle deflection activity (c8_physics_ch2_1) and practice the.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of.' },
                { id: 'b', prompt: 'A straight horizontal wire carries a current of 2 A from west to east. A compass is placed 5 cm directly below the wire.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'magnetic rays'],
                  hint: 'If stuck, revisit the compass needle deflection activity (c8_physics_ch2_1) and practice the.',
                  misconception: 'Students often think the magnetic field lines around a straight wire are straight lines radiating outward from the wire (like spokes of.' }
          ],
            remediations: { 'the-magnetic-field-lines-around': { steps: ['Re-do the iron filings activity (or watch a video) with a vertical wire; explicitly trace one circle with a finger.', 'Use a compass at 2 cm and 4 cm from the wire: count how many compass steps (degrees of deflection) occur at each.', 'Practice right-hand thumb rule with a physical wire model: hold a pencil as the wire, point thumb in current direction.', 'Do this for current up, down, left, right until direction prediction is automatic.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_3', difficulty: 'standard',
          question: 'An electromagnet is a temporary magnet created by passing an electric current.',
          hint: 'Revisit c8_physics_ch2_1 (magnetic effect of current) and c8_physics_ch2_2 (field around.',
          misconception: 'Students think the iron core becomes a permanent magnet that "stores" magnetism like a battery stores charge.',
          parts: [
                { id: 'a', prompt: 'You wind 100 turns of insulated copper wire around a soft iron nail and connect it to a 1.5 V cell. The nail picks up 5 paper clips.', answer: 'It will pick up MORE than 5 paper clips (likely 8-12)',
                  options: ['It will pick up MORE than 5 paper clips (likely 8-12)', 'stores', 'magnetization', 'permanent magnetization'],
                  hint: 'Revisit c8_physics_ch2_1 (magnetic effect of current) and c8_physics_ch2_2 (field around a coil).',
                  misconception: 'Students think the iron core becomes a permanent magnet that "stores" magnetism like a battery stores charge.' },
                { id: 'b', prompt: 'Two students build electromagnets with identical nails and identical cells.', answer: 'Student B\'s electromagnet (100 turns) will be stronger',
                  options: ['Student B\'s electromagnet (100 turns) will be stronger', 'stores', 'magnetization', 'permanent magnetization'],
                  hint: 'Revisit c8_physics_ch2_1 (magnetic effect of current) and c8_physics_ch2_2 (field around a coil).',
                  misconception: 'Students think the iron core becomes a permanent magnet that "stores" magnetism like a battery stores charge.' }
          ],
            remediations: { 'the-iron-core-becomes-a': { steps: ['Have the student build an electromagnet with a soft iron nail, pick up paper clips, then OPEN the switch and watch.', 'Repeat with a steel nail — observe weak residual magnetism (some clips may stick briefly).', 'Ask: "Where did the magnetism go when you opened the switch with the iron nail?" Guide them to: "The magnetic field.', 'Contrast with permanent magnet (compass needle) that stays aligned without any coil.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_4', difficulty: 'standard',
          question: 'The strength of an electromagnet is the magnetic force it exerts, measured.',
          hint: 'Revisit c8_physics_ch2_3 (electromagnet construction) and c6_physics_ch03_017 (series.',
          misconception: 'Students think "more turns always means stronger magnet" without considering that adding turns with the same battery.',
          parts: [
                { id: 'a', prompt: 'State the three factors that affect the strength of an electromagnet and, for each, describe whether increasing it makes the electromagnet stronger or weaker.', answer: 'The three factors are: (1) Number of turns in the coil',
                  options: ['The three factors are: (1) Number of turns in the coil', 'more turns always means stronger magnet'],
                  hint: 'Revisit c8_physics_ch2_3 (electromagnet construction) and c6_physics_ch03_017 (series circuits).',
                  misconception: 'Students think "more turns always means stronger magnet" without considering that adding turns with the same battery increases total wire.' },
                { id: 'b', prompt: 'An electromagnet with 100 turns and a current of 0.2 A lifts 12 paper clips.', answer: 'Given: Strength ∝ Current',
                  options: ['Given: Strength ∝ Current', 'more turns always means stronger magnet'],
                  hint: 'Revisit c8_physics_ch2_3 (electromagnet construction) and c6_physics_ch03_017 (series circuits).',
                  misconception: 'Students think "more turns always means stronger magnet" without considering that adding turns with the same battery increases total wire.' },
                { id: 'c', prompt: 'Compare two electromagnets: X has 200 turns of thin wire on a soft iron core with 0.5 A current.', answer: 'Electromagnet Y is stronger',
                  options: ['Electromagnet Y is stronger', 'more turns always wins', 'more turns always means stronger magnet'],
                  hint: 'Revisit c8_physics_ch2_3 (electromagnet construction) and c6_physics_ch03_017 (series circuits).',
                  misconception: 'Students think "more turns always means stronger magnet" without considering that adding turns with the same battery increases total wire.' }
          ],
            remediations: { 'more-turns-always-means-stronger': { steps: ['Build two electromagnets: same nail, same cell.', 'Coil A: 50 turns of thick wire (low resistance).', 'Coil B: 200 turns of thin wire (high resistance).', 'Measure current in each circuit with an ammeter (recall c6_physics_ch03_012).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
