import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch02_p2: SimDef = {
    id: 'v3_c8_physics_ch02_p2',
    title: 'Electricity: Magnetic and Heating Effects · Part 2/2',
    subtitle: 'The twitching needle that joined two sciences',
    classLevel: 8, subject: 'physics', topic: 'Electricity: Magnetic and Heating Effects · Part 2/2',
    chapters: ['c8_physics_ch02'],
    nodeIds: ['c8_physics_ch2_5', 'c8_physics_ch2_6', 'c8_physics_ch2_7', 'c8_physics_ch2_8', 'c8_physics_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab assistant repeating Oersted\'s experiment', intro: 'One battery, one wire, one compass — and a needle that refuses to sit still. You\'re about to watch electricity reach out and bend magnetism.', goal: 'Understand that electric current produces a magnetic field (Oersted\'s experiment) — the needle deflects only while current flows, and its direction follows the current\'s direction.' },
    discovery: {
        question: 'A compass sits near a plain copper wire. Close the switch — the needle twitches. Open it — the needle swings back to north. The wire isn\'t a magnet, so what just happened?',
        options: ['The flowing current created a magnetic field around the wire — electricity and magnetism are secretly linked', 'The battery magnetised the wire permanently', 'The current flowed through the compass needle', 'The needle was just faulty'],
        answer: 'The flowing current created a magnetic field around the wire — electricity and magnetism are secretly linked',
        hook: 'The wire never becomes a magnet — it only hosts a field while current runs. Flip the battery and the needle flips too; add a second cell and the swing grows. Invisible field, very visible needle.',
    },
    teaching: [
        { title: 'Applications of Electromagnets: Lifting Magnets, Electric Bells', text: 'Applications of electromagnets utilize the temporary magnetism produced by electric current to perform mechanical work.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch2_5', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Recreate Oersted\'s experiment yourself: place a compass around a live wire, watch the needle align in circles, reverse the current to reverse the deflection — and prove the field only exists while electrons flow.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch2_5', title: 'Applications of Electromagnets: Lifting Magnets, Electric Bells',
          caseStudy: { intro: 'Begin by showing a video or image of a large crane in an Indian scrapyard (like Mayapuri, Delhi) lifting a heap of iron nails and sheets without any hooks.',
            decisions: [{ prompt: 'What is the key property of an electromagnet that makes it suitable for use in a lifting magnet at a scrapyard, which a permanent magnet.', options: [
                { text: 'An electromagnet\'s magnetism can be turned **on and off** by controlling the electric', outcome: 'An electromagnet\'s magnetism can be turned **on and off** by controlling the electric current.' },
                { text: 'electromagnet is stronger', outcome: 'Not quite — Students think the **electric bell rings because the electromagnet "vibrates" by itself**.', reveals: 'the-electric-bell-rings-because' },
                { text: 'vibrates', outcome: 'Not quite — Students think the **electric bell rings because the electromagnet "vibrates" by itself**.', reveals: 'the-electric-bell-rings-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_6', title: 'Heating Effect of Electric Current: Joule\'s Law',
          scaffold: { problem: 'A 12 V car battery is connected to a headlight filament of resistance 4 Ω. Calculate the heat produced in the filament in 10 minutes.',
            steps: [
            { text: 'Identify given quantities: V = 12 V, R = 4 Ω, t = 10 min = 600 s. We need to find heat H.' },
            { text: 'We know Joule\'s Law H = I²Rt, but current I is not given directly. Use Ohm\'s Law I = V/R to find I.' },
            { text: 'Calculate I = 12 V / 4 Ω = 3 A. Now substitute into H = I²Rt: H = (3 A)² × 4 Ω × 600 s.' },
            { text: 'Compute with unit tracking: 9 A² × 4 Ω × 600 s = 36 × 600 J = 21,600 J. Unit check: A²·Ω·s = (C/s)²·(J·s/C²)·s = J.' },
            { text: 'Verify reasonableness: A car headlight uses tens of watts. Power P = I²R = 9×4 = 36 W.', faded: true, blankAnswer: '21,600 J (or 2.16 × 10⁴ J)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_7', title: 'Factors Affecting Heat Produced: Current, Resistance, Time',
          scaffold: { problem: 'A 12 V car battery is connected to a headlamp filament of resistance 3 Ω. The headlamp is kept on for 10 minutes.',
            steps: [
            { text: 'Identify given quantities: V = 12 V, R = 3 Ω, t = 10 min = 600 s. We need H.' },
            { text: 'Choose formula H = V²t/R to avoid extra step. Check units: V²/R = (V²/Ω) = (J/C)² / (J·s/C²) = J/s = Watt.' },
            { text: 'Substitute values: H = (12)² × 600 / 3 = 144 × 600 / 3.' },
            { text: 'Compute: 144 / 3 = 48. Then 48 × 600 = 28,800 J. Convert to kJ: 28,800 / 1000 = 28.8 kJ.' },
            { text: 'Verify reasonableness: Power = V²/R = 144/3 = 48 W. In 600 s, energy = 48 × 600 = 28,800 J.', faded: true, blankAnswer: '28,800 J (or 28.8 kJ)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_8', title: 'Applications of Heating Effect: Electric Heater, Iron, Bulb',
          scaffold: { problem: 'An electric room heater has a nichrome coil of resistance 45 Ω. It is connected to 230 V mains for 15 minutes.',
            steps: [
            { text: 'Identify given: R = 45 Ω, V = 230 V, t = 15 min = 15 × 60 = 900 s. Find: I, P, H.' },
            { text: 'Use Ohm\'s law for current: I = V/R = 230/45 = 5.11 A. Use power formula: P = VI = 230 × 5.11 = 1175 W ≈ 1.18 kW.' },
            { text: 'Verify with P = V²/R = 230²/45 = 52900/45 = 1175 W. Consistent.' },
            { text: 'Calculate heat energy: H = P × t = 1175 W × 900 s = 1,057,500 J = 1.06 × 10⁶ J.' },
            { text: 'Check reasonableness: A typical heater is 1-2 kW; 15 min gives ~1 MJ. Units: W × s = J. Correct.', faded: true, blankAnswer: '(a) 5.11 A, (b) 1175 W (1.18 kW), (c) 1.06 × 10⁶ J' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch2_9', title: 'Electric Fuse: Working Principle and Purpose',
          scaffold: { problem: 'A household lighting circuit has a normal operating current of 3.5 A. The fuse wire used has a resistance of 0.15 Ω.',
            steps: [
            { text: 'Identify given quantities: Normal current = 3.5 A (not needed for calculation), Fault current I = 12 A, Fuse resistance.' },
            { text: 'Recall Joule\'s law formula H = I²Rt. Rearrange for t: t = H / (I²R).' },
            { text: 'Substitute values with units: t = 8.0 J / ( (12 A)² × 0.15 Ω ) = 8.0 / (144 × 0.15) s.' },
            { text: 'Compute denominator: 144 × 0.15 = 21.6. Then t = 8.0 / 21.6 = 0.37037... s.' },
            { text: 'Round to two significant figures (since inputs have two): t ≈ 0.37 s.', faded: true, blankAnswer: '0.37 s' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Rebuilding Oersted\'s demo on a desk, a student rests a compass near a wire, closes the switch and watches the needle swing. His lab partner concludes, \'The wire must have turned into a permanent magnet — it will attract iron pins even with the switch off.\'',
            decisions: [{ prompt: 'Is that what the needle\'s deflection shows?', options: [
                { text: 'No — the needle deflects only while the circuit is closed and springs back to north-south when it opens, so the magnetic field exists only while current flows; the wire never becomes a permanent magnet, and reversing the battery flips the deflection.', outcome: 'This reads the evidence correctly: current produces a field, and the field lives and dies with the current.' },
                { text: 'The partner is right — once a wire carries current it stays magnetised, which is why the needle moved.', outcome: 'Then the needle would stay deflected with the switch open; it does not, so the effect belongs to the flowing current, not a magnetised wire.', reveals: 'wire-becomes-magnet' },
                { text: 'The needle moves because current flows through the compass itself — the wire and needle are part of one circuit.', outcome: 'The needle is a free magnet outside the circuit; it is the wire\'s magnetic field, acting at a distance, that turns it.', reveals: 'current-in-needle' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Every current-carrying wire is wrapped in an invisible magnetic field — that\'s the discovery that eventually gave us motors, generators and the entire electric age.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch2_5', difficulty: 'standard',
          question: 'Applications of electromagnets utilize the temporary magnetism produced.',
          hint: 'If stuck, revisit c8_physics_ch2_3 (construction) and c8_physics_ch2_4 (factors affecting.',
          misconception: 'Students think the **electric bell rings because the electromagnet "vibrates" by itself**.',
          parts: [
                { id: 'a', prompt: 'A lifting magnet uses a soft iron core with 500 turns of insulated copper wire. When connected to a 12 V battery, it lifts a 200 kg iron plate.', answer: '**Step 1:** Identify given: N₁ = 500 turns, lifts 200 kg',
                  options: ['**Step 1:** Identify given: N₁ = 500 turns, lifts 200 kg', 'it will lift 400 kg', 'vibrates', 'the **electric bell rings'],
                  hint: 'If stuck, revisit c8_physics_ch2_3 (construction) and c8_physics_ch2_4 (factors affecting strength).',
                  misconception: 'Students think the **electric bell rings because the electromagnet "vibrates" by itself**. They imagine the coil physically shaking.' }
          ],
            remediations: { 'the-electric-bell-rings-because': { steps: ['** Disassemble a real electric bell (or show a transparent model).', '** With the bell operating, ask the student to gently hold the armature *still* with a non-magnetic tool (plastic.', '** Have the student draw the circuit diagram including the contact screw as a switch that the armature opens/closes.', '** Connect to c8_physics_ch2_3: the electromagnet is just a magnet that obeys the circuit; the mechanical motion is.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the **electric bell rings because the electromagnet "vibrates" by itself**.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a battery, insulated wire, an iron nail, and a switch to demonstrate the working principle of a lifting magnet.', answer: '**Good answer criteria:** 1',
                  options: ['**Good answer criteria:** 1', 'vibrates', 'the **electric bell rings'],
                  hint: 'If stuck, revisit c8_physics_ch2_3 (construction) and c8_physics_ch2_4 (factors affecting strength).',
                  misconception: 'Students think the **electric bell rings because the electromagnet "vibrates" by itself**. They imagine the coil physically shaking.' }
          ],
            remediations: { 'the-electric-bell-rings-because': { steps: ['** Disassemble a real electric bell (or show a transparent model).', '** With the bell operating, ask the student to gently hold the armature *still* with a non-magnetic tool (plastic.', '** Have the student draw the circuit diagram including the contact screw as a switch that the armature opens/closes.', '** Connect to c8_physics_ch2_3: the electromagnet is just a magnet that obeys the circuit; the mechanical motion is.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_6', difficulty: 'standard',
          question: 'The heating effect of electric current is the phenomenon where electrical.',
          hint: 'If stuck, review Class 7 concept of electric current (c7_physics_ch02_003) and the.',
          misconception: 'Students think that if you double the current, the heat doubles.',
          parts: [
                { id: 'a', prompt: 'Why does the heat produced depend on the square of the current (I²) and not just on current (I)? Explain using the idea of electron collisions.', answer: 'Heat depends on I² because: (1) The number of electrons passing per second is',
                  options: ['Heat depends on I² because: (1) The number of electrons passing per second is', 'more current means more electrons so more heat', 'if you double the current, the heat doubles'],
                  hint: 'If stuck, review Class 7 concept of electric current (c7_physics_ch02_003) and the definition.',
                  misconception: 'Students think that if you double the current, the heat doubles.' },
                { id: 'b', prompt: 'An electric kettle has a heating coil of resistance 25 Ω. If a current of 8 A flows through it for 3 minutes, calculate the heat produced in joules.', answer: 'Given: R = 25 Ω, I = 8 A, t = 3 min = 180 s',
                  options: ['Given: R = 25 Ω, I = 8 A, t = 3 min = 180 s', 'if you double the current, the heat doubles'],
                  hint: 'If stuck, review Class 7 concept of electric current (c7_physics_ch02_003) and the definition.',
                  misconception: 'Students think that if you double the current, the heat doubles.' },
                { id: 'c', prompt: 'Two identical resistors are connected (a) in series and (b) in parallel across the same battery. In which arrangement is more heat produced per minute?', answer: 'Parallel arrangement produces more heat',
                  options: ['Parallel arrangement produces more heat', 'series because resistance is higher', 'if you double the current, the heat doubles'],
                  hint: 'If stuck, review Class 7 concept of electric current (c7_physics_ch02_003) and the definition.',
                  misconception: 'Students think that if you double the current, the heat doubles.' }
          ],
            remediations: { 'if-you-double-the-current': { steps: ['Revisit the microscopic picture: current is charge per second.', 'Recall that the drift speed of electrons also doubles (for ohmic conductors), so each electron carries twice the.', 'Use the analogy of throwing balls at a wall: twice as many balls thrown twice as fast → 4 times the impact energy.', 'Do a quick numerical check: calculate H for I=1A, R=1Ω, t=1s (H=1J) and for I=2A (H=4J).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_7', difficulty: 'standard',
          question: 'The heat energy produced when an electric current passes through a resistor.',
          hint: 'If stuck, revisit c8_physics_ch2_6 (Joule\'s law statement) and c6_physics_ch03_017.',
          misconception: 'Students often believe that for a given voltage (like a 220 V mains supply), a *higher* resistance appliance produces.',
          parts: [
                { id: 'a', prompt: 'State the formula for heat produced by an electric current in a resistor and name the SI unit of each quantity.', answer: 'The formula is H = I²Rt',
                  options: ['The formula is H = I²Rt', 'resistance opposes current and creates heat'],
                  hint: 'If stuck, revisit c8_physics_ch2_6 (Joule\'s law statement) and c6_physics_ch03_017 (series.',
                  misconception: 'Students often believe that for a given voltage (like a 220 V mains supply), a *higher* resistance appliance produces *more* heat because.' },
                { id: 'b', prompt: 'An electric iron draws a current of 4 A from a 220 V supply. Its heating element has a resistance of 55 Ω.', answer: 'Given: I = 4 A, R = 55 Ω, t = 2 min = 120 s',
                  options: ['Given: I = 4 A, R = 55 Ω, t = 2 min = 120 s', 'resistance opposes current and creates heat'],
                  hint: 'If stuck, revisit c8_physics_ch2_6 (Joule\'s law statement) and c6_physics_ch03_017 (series.',
                  misconception: 'Students often believe that for a given voltage (like a 220 V mains supply), a *higher* resistance appliance produces *more* heat because.' },
                { id: 'c', prompt: 'Two identical resistors are connected (a) in series and (b) in parallel across the same battery. In which case is more heat produced per minute?', answer: 'More heat is produced in the parallel combination',
                  options: ['More heat is produced in the parallel combination', 'higher resistance always means more heat', 'resistance opposes current and creates heat'],
                  hint: 'If stuck, revisit c8_physics_ch2_6 (Joule\'s law statement) and c6_physics_ch03_017 (series.',
                  misconception: 'Students often believe that for a given voltage (like a 220 V mains supply), a *higher* resistance appliance produces *more* heat because.' }
          ],
            remediations: { 'for-a-given-voltage-like': { steps: ['Ask the student to write both formulas: H = I²Rt and H = V²t/R.', 'Give a concrete Indian context: "Compare a 100 W bulb (R = 484 Ω) and a 1000 W heater (R = 48.4 Ω) on 220 V."', 'Have them calculate heat for 1 minute using both formulas.', 'Guide them to see that the heater (lower R) produces 10× more heat.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_8', difficulty: 'standard',
          question: 'The heating effect of electric current is utilized in appliances like electric.',
          hint: 'Review c8_physics_ch2_6 (Joule\'s law) and c8_physics_ch2_7 (factors affecting heat).',
          misconception: 'Students think "thicker wire produces more heat because it has more material" – they confuse the heating element (thin.',
          parts: [
                { id: 'a', prompt: 'Name the material commonly used for the heating element in an electric iron and state ONE property that makes it suitable.', answer: 'Nichrome (nickel-chromium alloy) is used',
                  options: ['Nichrome (nickel-chromium alloy) is used', 'copper', 'thicker wire produces more heat'],
                  hint: 'Review c8_physics_ch2_6 (Joule\'s law) and c8_physics_ch2_7 (factors affecting heat) – practice.',
                  misconception: 'Students think "thicker wire produces more heat because it has more material" – they confuse the heating element (thin, high resistance).' },
                { id: 'b', prompt: 'An electric heater rated 1000 W operates on 230 V household supply. Calculate the current drawn and the resistance of its heating element.', answer: 'Step 1: P = 1000 W, V = 230 V',
                  options: ['Step 1: P = 1000 W, V = 230 V', 'thicker wire produces more heat'],
                  hint: 'Review c8_physics_ch2_6 (Joule\'s law) and c8_physics_ch2_7 (factors affecting heat) – practice.',
                  misconception: 'Students think "thicker wire produces more heat because it has more material" – they confuse the heating element (thin, high resistance).' },
                { id: 'c', prompt: 'Two identical electric irons (same resistance) are connected: one at 230 V, another at 110 V (using a step-down transformer).', answer: 'Heat H = (V²/R)t',
                  options: ['Heat H = (V²/R)t', 'half the voltage gives half the heat', 'thicker wire produces more heat'],
                  hint: 'Review c8_physics_ch2_6 (Joule\'s law) and c8_physics_ch2_7 (factors affecting heat) – practice.',
                  misconception: 'Students think "thicker wire produces more heat because it has more material" – they confuse the heating element (thin, high resistance).' }
          ],
            remediations: { 'thicker-wire-produces-more-heat': { steps: ['Revisit c8_physics_ch2_7 (Factors Affecting Heat Produced) to reinforce H = I²Rt.', 'Do a hands-on activity: Connect a thin nichrome wire and a thick copper wire in series with a battery; observe only.', 'Practice series/parallel bulb brightness comparisons using actual bulbs and a multimeter to measure resistance of each.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch2_9', difficulty: 'standard',
          question: 'An electric fuse is a safety device that protects electrical circuits and.',
          hint: 'If stuck, revisit c8_physics_ch2_6 (Heating Effect of Electric Current) and.',
          misconception: 'Students often believe that a fuse works because the current "burns" the wire like a flame, or that a thicker fuse wire.',
          parts: [
                { id: 'a', prompt: 'Why is the fuse wire made of an alloy like tin-lead instead of copper, even though copper is a good conductor?', answer: 'Copper has a high melting point (1085°C) and low resistivity',
                  options: ['Copper has a high melting point (1085°C) and low resistivity', 'copper is expensive', 'alloy is stronger'],
                  hint: 'If stuck, revisit c8_physics_ch2_6 (Heating Effect of Electric Current) and c6_physics_ch03_017.',
                  misconception: 'Students often believe that a fuse works because the current "burns" the wire like a flame, or that a thicker fuse wire is better because.' },
                { id: 'b', prompt: 'Two identical circuits are protected by fuses of different ratings: Fuse A (5 A) and Fuse B (10 A). The normal operating current in each circuit is 4 A.', answer: 'Fuse A (5 A) will blow first',
                  options: ['Fuse A (5 A) will blow first', 'both blow', 'Fuse B blows first'],
                  hint: 'If stuck, revisit c8_physics_ch2_6 (Heating Effect of Electric Current) and c6_physics_ch03_017.',
                  misconception: 'Students often believe that a fuse works because the current "burns" the wire like a flame, or that a thicker fuse wire is better because.' }
          ],
            remediations: { 'a-fuse-works-because-the': { steps: ['Take three wires of the same material (e.g., nichrome) but different thicknesses (thin, medium, thick).', 'Connect each in series with a 6 V battery and an ammeter.', 'Use a rheostat to slowly increase current.', 'Record the current at which each wire glows red and melts.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
