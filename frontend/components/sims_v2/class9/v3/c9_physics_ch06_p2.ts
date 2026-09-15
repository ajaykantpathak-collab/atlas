import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch06_p2: SimDef = {
    id: 'v3_c9_physics_ch06_p2',
    title: 'Earth\'s Atmosphere and Climate · Part 2/2',
    subtitle: 'Why the poles freeze and the equator bakes',
    classLevel: 9, subject: 'physics', topic: 'Earth\'s Atmosphere and Climate · Part 2/2',
    chapters: ['c9_physics_ch06'],
    nodeIds: ['c9_physics_ch6_5', 'c9_physics_ch6_6', 'c9_physics_ch6_7', 'c9_physics_ch6_8', 'c9_physics_ch6_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a solar-energy mapper', intro: 'Same Sun, same planet — wildly different heating. Follow one sunbeam from equator to pole and watch it stretch thin, and discover the cosine rule that runs Earth\'s entire climate engine.', goal: 'Explain uneven solar heating — angle of incidence, area spread, atmospheric path and day length — driven by Earth\'s spherical shape and 23.5° axial tilt.' },
    discovery: {
        question: 'Earth is closest to the Sun in January — yet that\'s when the Northern Hemisphere freezes through winter. If distance controlled the seasons, shouldn\'t January be the warmest?',
        options: ['No — the 23.5° axial tilt wins: the hemisphere tilted away gets slanted rays spread thin over more area, no matter the small distance change', 'Yes — it should be warmer; the seasons are broken', 'The calendar is misaligned with the Sun', 'January is actually Earth\'s farthest point'],
        answer: 'No — the 23.5° axial tilt wins: the hemisphere tilted away gets slanted rays spread thin over more area, no matter the small distance change',
        hook: 'Slant is everything: the same sunbeam covering 1 m² at the equator spreads across ~2 m² at 60° latitude, halving the heating. And in June, the far north\'s 18-hour days can out-collect the equator\'s intense noon — day length can beat ray angle.',
    },
    teaching: [
        { title: 'Planetary Winds: Trade Winds and Westerlies', text: 'Electric current is the rate of flow of electric charge through a conductor, defined as I = Q/t, where I is current (amperes, A), Q is charge (coulombs, C), and t is time (seconds, s).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch6_5', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Quantify the slant: use insolation = solar constant × cos(zenith angle) to find noon heating at 45°, prove why poles stay cold, and test whether 60°N\'s endless June day really beats the equator\'s blazing noon.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_5', title: 'Planetary Winds: Trade Winds and Westerlies',
          scaffold: { problem: 'A battery drives 30 coulombs of charge through a circuit in 6 seconds. Calculate the current.',
            steps: [
            { text: 'Identify the formula. I = Q/t.' },
            { text: 'Substitute. I = 30/6 = 5 A.' },
            { text: 'Interpret. The current is 5 amperes — 5 coulombs of charge pass per second.', faded: true, blankAnswer: 'I = 30/6 = 5 A. The current is 5 amperes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_6', title: 'Ocean Currents: Causes and Types',
          scaffold: { problem: 'A battery does 45 J of work to move 15 C of charge through a circuit. Calculate the potential difference.',
            steps: [
            { text: 'Identify the formula. V = W/Q.' },
            { text: 'Substitute. V = 45/15 = 3 V.' },
            { text: 'Interpret. The potential difference is 3 volts — 3 joules of work per coulomb.', faded: true, blankAnswer: 'V = 45/15 = 3 V. The potential difference is 3 volts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_7', title: 'Water Cycle: Evaporation, Condensation, Precipitation',
          scaffold: { problem: 'A 6 V battery is connected across a 3 ohm resistor. Calculate the current.',
            steps: [
            { text: 'Identify the formula. I = V/R.' },
            { text: 'Substitute. I = 6/3 = 2 A.' },
            { text: 'Interpret. The current is 2 amperes.', faded: true, blankAnswer: 'I = 6/3 = 2 A. The current is 2 amperes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_8', title: 'Carbon Cycle: Processes and Reservoirs',
          scaffold: { problem: 'A copper wire has resistivity 1.7e-8 ohm*m, length 5 m, and cross-sectional area 2e-6 m^2. Calculate its resistance.',
            steps: [
            { text: 'Identify the formula. R = rho * L / A.' },
            { text: 'Substitute. R = 1.7e-8 * 5 / 2e-6 = 8.5e-8 / 2e-6 = 4.25e-2 = 0.0425 ohms.' },
            { text: 'Interpret. The resistance is 0.0425 ohms — very low, as expected for copper (good conductor).', faded: true, blankAnswer: 'R = 1.7e-8 * 5 / 2e-6 = 0.0425 ohms. The resistance.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_9', title: 'Nitrogen Cycle: Fixation and Denitrification',
          scaffold: { problem: 'Three resistors (2, 3, 5 ohms) are connected in series with a 10 V battery.',
            steps: [
            { text: 'Equivalent resistance. R_eq = 2 + 3 + 5 = 10 ohms.' },
            { text: 'Current. I = V/R_eq = 10/10 = 1 A.' },
            { text: 'Voltages. V1 = I * R1 = 1 * 2 = 2 V. V2 = I * R2 = 1 * 3 = 3 V. V3 = I * R3 = 1 * 5 = 5 V.' },
            { text: 'Verify. V1 + V2 + V3 = 2 + 3 + 5 = 10 V = V. Correct.', faded: true, blankAnswer: 'R_eq = 10 ohms. I = 1 A. V1 = 2 V, V2 = 3 V, V3 = 5 V.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch6_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Reading that Earth is closest to the Sun in January, a student concludes: \'So Delhi\'s January should be its warmest month — less distance, more heat. The tilt idea is a myth.\'',
            decisions: [{ prompt: 'What actually drives the seasons?', options: [
                { text: 'Geometry, not distance: Earth\'s 23.5° tilt makes the Sun\'s rays strike the northern hemisphere at a slant in January, spreading the same beam over more area and shortening the day — that is why it is winter while Earth is near perihelion. The distance change is only a few per cent; the angle change is the dominant term.', outcome: 'This applies the cosine-of-zenith-angle idea — slanted light is diluted light — and correctly ranks tilt above orbital distance.' },
                { text: 'The student is right — nearer the Sun always means hotter, so the calendar confirms it.', outcome: 'The orbit is nearly circular — perihelion changes sunlight by only ~7% — while tilted incidence and day length swing heating far more; the Southern Hemisphere is in summer at the same moment.', reveals: 'distance-drives-seasons' },
                { text: 'Neither matters — seasons come from ocean currents carrying warm and cold water around the globe.', outcome: 'Currents redistribute heat but cannot create the global winter-summer pattern; the input is uneven insolation set by tilt and solar angle.', reveals: 'currents-make-seasons' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch6_9', title: 'You made it',
          caseStudy: { intro: 'It\'s not how far the Sun is — it\'s how squarely its rays hit. Spherical geometry, axial tilt and day length together decide who bakes and who freezes, driving every wind and current on Earth.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch6_5', difficulty: 'standard',
          question: 'Electric current is the rate of flow of electric charge through a conductor.',
          hint: 'Revisit c9_physics_ch6_1 (Introduction to Electricity) for the basic framework.',
          misconception: 'Students confuse current (rate of flow) with charge (amount). The exact error: they think "more current" means "more.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electric current is the rate of flow of electric charge through a conductor, defined as I',
                  options: ['Electric current is the rate of flow of electric charge through a conductor, defined as I', 'Uneven heating of the Earth by solar radiation is the phenomenon where different regions', 'The oxygen cycle is the biogeochemical cycle that describes the movement of oxygen atoms', 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and'],
                  hint: 'Revisit c9_physics_ch6_1 (Introduction to Electricity) for the basic framework of electric circuits.',
                  misconception: 'Students confuse current (rate of flow) with charge (amount). The exact error: they think "more current" means "more charge in the wire.".' }
          ],
            remediations: { 'students-confuse-current-rate-of': { steps: ['"How much water" = charge (coulombs).', '"How fast it flows" = current (amperes).', 'Practice: given Q and t, find I; given I and t, find Q.', 'Direction: conventional current (positive to negative) vs.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_6', difficulty: 'standard',
          question: 'Electric potential at a point is the electric potential energy per unit charge.',
          hint: 'Revisit c9_physics_ch6_5 (Electric Current) for the concept of current and.',
          misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but.',
          parts: [
                { id: 'a', prompt: 'Calculate the potential difference if 24 J of work moves 6 C of charge.', answer: 'V = W/Q = 24/6 = 4 V',
                  options: ['V = W/Q = 24/6 = 4 V', 'voltage is the same as current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) for the concept of current and c9_physics_ch6_1.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow.' },
                { id: 'b', prompt: 'Explain the analogy between potential difference and water pressure.', answer: 'Water flows from high pressure to low pressure',
                  options: ['Water flows from high pressure to low pressure', 'voltage is like water volume', 'voltage is the same as current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) for the concept of current and c9_physics_ch6_1.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow.' }
          ],
            remediations: { 'voltage-is-the-same-as': { steps: ['Pump = battery (creates pressure/voltage).', 'Pressure difference = voltage.', 'Practice: given W and Q, find V; given V and Q, find W.', 'Emphasize: voltage is the push, current is the flow.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but.',
          parts: [
                { id: 'a', prompt: 'A 9 V battery does 9 J of work on each coulomb. If 3 C of charge pass through, how much energy is delivered?', answer: 'V = W/Q, so W = V * Q = 9 * 3 = 27 J',
                  options: ['V = W/Q, so W = V * Q = 9 * 3 = 27 J', 'voltage is the same as current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) for the concept of current and c9_physics_ch6_1.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow.' },
                { id: 'b', prompt: 'A student says: "A higher voltage battery has more current." Evaluate this statement.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'voltage is the same as current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) for the concept of current and c9_physics_ch6_1.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow.' }
          ],
            remediations: { 'voltage-is-the-same-as': { steps: ['Pump = battery (creates pressure/voltage).', 'Pressure difference = voltage.', 'Practice: given W and Q, find V; given V and Q, find W.', 'Emphasize: voltage is the push, current is the flow.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_7', difficulty: 'standard',
          question: 'Ohm\'s Law states that the current through a conductor is directly proportional.',
          hint: 'Revisit c9_physics_ch6_5 (Electric Current) and c9_physics_ch6_6 (Electric Potential) for.',
          misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and.',
          parts: [
                { id: 'a', prompt: 'A 12 V battery produces a current of 3 A through a resistor. Calculate the resistance.', answer: 'R = V/I = 12/3 = 4 ohms',
                  options: ['R = V/I = 12/3 = 4 ohms', 'resistance changes with voltage or current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) and c9_physics_ch6_6 (Electric Potential) for the.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if.' },
                { id: 'b', prompt: 'A 10 ohm resistor has a current of 0.5 A flowing through it. What is the potential difference across it?', answer: 'V = I * R = 0.5 * 10 = 5 V',
                  options: ['V = I * R = 0.5 * 10 = 5 V', 'resistance changes with voltage or current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) and c9_physics_ch6_6 (Electric Potential) for the.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if.' },
                { id: 'c', prompt: 'What is the unit of resistance, and how is it defined?', answer: 'The unit of resistance is the ohm (symbol: capital omega)',
                  options: ['The unit of resistance is the ohm (symbol: capital omega)', 'ohm is the unit of current', 'resistance changes with voltage or current'],
                  hint: 'Revisit c9_physics_ch6_5 (Electric Current) and c9_physics_ch6_6 (Electric Potential) for the.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if.' }
          ],
            remediations: { 'resistance-changes-with-voltage-or': { steps: ['Set up a circuit with a resistor.', 'Conclude: V and I are proportional; R is constant (property of the material).', 'Practice: given any two, find the third.', 'Condition: constant temperature.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_8', difficulty: 'standard',
          question: 'Resistance is the opposition a conductor offers to electric current, measured.',
          hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for the definition of resistance as R = V/I.',
          misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that.',
          parts: [
                { id: 'a', prompt: 'A copper wire has resistivity 1.7e-8 ohm*m, length 10 m, and cross-sectional area 0.0001 m^2. Calculate its resistance.', answer: 'R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms',
                  options: ['R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms', 'more material', 'thicker wires have more resistance'],
                  hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for the definition of resistance as R = V/I.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' },
                { id: 'b', prompt: 'If a wire\'s length is doubled (same material and cross-section), what happens to its resistance?', answer: 'Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R',
                  options: ['Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R', 'resistance stays the same', 'more material', 'thicker wires have more resistance'],
                  hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for the definition of resistance as R = V/I.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' }
          ],
            remediations: { 'thicker-wires-have-more-resistance': { steps: ['Long pipe = more resistance (more friction).', 'Wide pipe = less resistance (more space).', 'L in numerator (more L = more R).', 'A in denominator (more A = less R).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_9', difficulty: 'standard',
          question: 'Series combination of resistors is a circuit arrangement where resistors are.',
          hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for V = IR and c9_physics_ch6_8 (Resistance) for the.',
          misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel).',
          parts: [
                { id: 'a', prompt: 'In a series circuit, what is the relationship between the current through each resistor?', answer: 'The current is the same through all resistors: I = I1 = I2 = I3 =',
                  options: ['The current is the same through all resistors: I = I1 = I2 = I3 =', 'current divides among resistors'],
                  hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for V = IR and c9_physics_ch6_8 (Resistance) for the concept.',
                  misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel) and current divides.' },
                { id: 'b', prompt: 'Why does the total resistance in series increase when more resistors are added?', answer: 'In series, R_eq = R1 + R2 +',
                  options: ['In series, R_eq = R1 + R2 +', 'adding resistors gives more paths'],
                  hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for V = IR and c9_physics_ch6_8 (Resistance) for the concept.',
                  misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel) and current divides.' }
          ],
            remediations: { 'students-confuse-the-series-and': { steps: ['Draw a series circuit with 3 resistors.', 'Trace the current: one path, same I everywhere.', 'Add more resistors: R_eq increases.', 'Voltage divides: V = V1 + V2 + V3, where V_i = I * R_i.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
