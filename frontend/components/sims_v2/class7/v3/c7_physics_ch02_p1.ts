import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch02_p1: SimDef = {
    id: 'v3_c7_physics_ch02_p1',
    title: 'Electricity: Circuits and their Components · Part 1/2',
    subtitle: 'Covers the general utility and energy transformations of electricity in everyday.',
    classLevel: 7, subject: 'physics', topic: 'Electricity: Circuits and their Components · Part 1/2',
    chapters: ['c7_physics_ch02'],
    nodeIds: ['c7_physics_ch02_001', 'c7_physics_ch02_002', 'c7_physics_ch02_003', 'c7_physics_ch02_004', 'c7_physics_ch02_005', 'c7_physics_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Every morning in an Indian household, we see switches being flipped to turn on ceiling fans, tube lights, and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A family plugs a room heater and a water geyser into the same socket board at once — and the wiring starts to overheat. What went wrong with such ordinary appliances?',
        options: ['Two high-power devices drew a heavy combined current that overheated the wires — a fire risk', 'Nothing — the switch was on, so it was safe', 'Geysers and heaters cancel each other out', 'The appliances were artificial, not natural'],
        answer: 'Two high-power devices drew a heavy combined current that overheated the wires — a fire risk',
        hook: 'Electricity earns its keep by transforming — into heat in an iron, motion in a fan, light in a bulb. Copper wires carry it easily while plastic blocks it, and every socket has a safe load limit.',
    },
    teaching: [
        { title: 'Electricity and Its Uses in Daily Life', text: 'Electricity and its uses in daily life encompass the generation, distribution, and conversion of electrical energy into other forms of energy (such as light, heat, and mechanical work) to power.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch02_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Tour a household as an energy detective — match the iron, fan, bulb, and buzzer to the energy each converts electricity into, then flag the overloaded socket.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_001', title: 'Electricity and Its Uses in Daily Life',
          scaffold: { problem: 'A kitchen mixer grinder operates with a power rating of $500\\text{ W}$.',
            steps: [
            { text: 'Identify the given values with units: Power ($P$) = $500\\text{ W}$, Time ($t$) = $120\\text{ s}$.' },
            { text: 'Identify the relevant formula linking energy, power, and time: Energy ($E$) = $P \\times t$.' },
            { text: 'Substitute the numerical values and units into the formula: $E = 500\\text{ W} \\times 120\\text{ s}$.' },
            { text: 'Perform the arithmetic calculation and track unit cancellation ($1\\text{ Watt} = 1\\text{ Joule/second}$, so $\\text{W}.' },
            { text: 'Verify that the answer is physically reasonable for a high-power kitchen appliance running for two minutes, yielding.', faded: true, blankAnswer: '$60,000\\text{ J}$ (or $60\\text{ kJ}$)' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch02_002', title: 'Torchlight: A Simple Electric Device',
          caseStudy: { intro: 'When you slide the switch of a household torchlight in your room during a power cut, the bulb instantly lights up your study table.',
            decisions: [{ prompt: 'What is the primary energy conversion that takes place inside the electric cell of a working torchlight before electricity reaches the lamp?', options: [
                { text: 'The electric cell converts stored chemical energy into electrical energy', outcome: 'The electric cell converts stored chemical energy into electrical energy.' },
                { text: 'light energy to electrical energy', outcome: 'Not quite — Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used.', reveals: 'a-torchlight-bulb-lights-up' },
                { text: 'consumed', outcome: 'Not quite — Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used.', reveals: 'a-torchlight-bulb-lights-up' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_003', title: 'Electric Cell: Source of Electric Current',
          scaffold: { problem: 'A science kit circuit uses a fresh 1.5 V electric cell that drives a constant current of 0.25 A through a small LED indicator for 2.',
            steps: [
            { text: 'Identify given values with units: Current ($I$) = 0.25 A, Time ($t$) = 2 minutes.' },
            { text: 'Identify the required formula relating charge, current, and time: $Q = I \\times t$.' },
            { text: 'Substitute the numerical values and units into the formula: $Q = 0.25 \\text{ A} \\times 120 \\text{ s}$.' },
            { text: 'Compute the product and track unit cancellation (A $\\times$ s = C): $Q = 30 \\text{ C}$.' },
            { text: 'Verify that 30 Coulombs is a physically sensible charge for a small LED circuit running for 2 minutes.', faded: true, blankAnswer: '30 C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_004', title: 'Battery: Combination of Electric Cells',
          scaffold: { problem: 'A student is assembling a science project toy car in Delhi that requires a power source of 6.0 V.',
            steps: [
            { text: 'Identify the required total voltage ($V_{\\text{total}} = 6.0\\text{ V}$) and the voltage of a single cell ($V_1.' },
            { text: 'Identify the formula for cells in series: $V_{\\text{total}} = n \\times V_1$, where $n$ is the number of cells.' },
            { text: 'Rearrange to find the number of cells: $n = \\frac{V_{\\text{total}}}{V_1}$.' },
            { text: 'Substitute the given values with units: $n = \\frac{6.0\\text{ V}}{1.5\\text{ V}}$.' },
            { text: 'Compute the result and verify physical reasonableness: $n = 4$ cells.', faded: true, blankAnswer: '4 cells' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_005', title: 'Electric Lamp: Converting Electrical Energy to Light',
          scaffold: { problem: 'A study lamp connected to a household circuit has a potential difference of $220\\,\\text{V}$ across its terminals and draws a current.',
            steps: [
            { text: 'Identify given quantities with units: Potential difference ($V$) = $220\\,\\text{V}$, Current ($I$) = $0.25\\,\\text{A}$.' },
            { text: 'Identify the formula and check units: $P = V \\times I$, where $V$ is in volts and $I$ is in amperes.' },
            { text: 'Substitute values with units into the formula: $P = 220\\,\\text{V} \\times 0.25\\,\\text{A}$.' },
            { text: 'Compute the numerical value and track unit cancellation ($\\text{V} \\times \\text{A} = \\text{W}$): $220 \\times 0.25 = 55$.' },
            { text: 'Verify the answer is physically reasonable for a small desk lamp and state with units: $55\\,\\text{W}$.', faded: true, blankAnswer: '$55\\,\\text{W}$' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch02_006', title: 'Simple Electric Circuit: Components and Connections',
          caseStudy: { intro: 'When you flick the switch on a study lamp at your study desk in the evening, the bulb lights up instantly because you have completed an electrical pathway.',
            decisions: [{ prompt: 'What is the primary function of connecting wires in a simple electric circuit?', options: [
                { text: 'Connecting wires provide a continuous conducting path for electric current to travel', outcome: 'Connecting wires provide a continuous conducting path for electric current to travel between the.' },
                { text: 'gets used up', outcome: 'Not quite — Students often believe that electricity "gets used up" or flows out of both ends of a battery into.', reveals: 'electricity-gets-used-up-or' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a winter evening, Sameer plugs a room heater and a water geyser into the same wall socket to save time, saying \'electricity is electricity — the socket will manage.\' His mother reaches for the plug board.',
            decisions: [{ prompt: 'Who is right about the risk?', options: [
                { text: 'His mother — both are high-power heating appliances that draw heavy current together, which can overheat the wiring and cause a short circuit or fire; the socket\'s limit is about total load, not about whether the switch is on.', outcome: 'This recognises that appliances convert electrical energy to heat and that simultaneous heavy loads exceed safe current limits.' },
                { text: 'Sameer is right — a live socket supplies whatever is plugged in, so two heaters are no different from one.', outcome: 'Wiring is rated for a limited current; doubling high-power heating loads overheats conductors regardless of the switch position.', reveals: 'socket-handles-anything' },
                { text: 'The real danger is that electricity gets \'used up\' and disappears inside the heater, so running two wastes it faster.', outcome: 'Energy is not consumed into nothing — it converts to heat, light or motion; the issue here is excess current load, not depletion.', reveals: 'electricity-gets-used-up' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Electricity is a shapeshifter — it arrives as current and leaves as light, heat, sound, or spin. Respect the load, or the wires pay the price.',
            decisions: [{ prompt: 'What comes next? Electricity: Circuits and their Components · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electricity: Circuits and their Components · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch02_001', difficulty: 'standard',
          question: 'Electricity and its uses in daily life encompass the generation, distribution.',
          hint: 'Review c6_physics_ch03_012 on building a simple electrical circuit and how energy flows.',
          misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing.',
          parts: [
                { id: 'a', prompt: 'What is the primary energy transformation that occurs inside a working electric iron used for pressing clothes?', answer: 'Electrical energy is converted into heat energy',
                  options: ['Electrical energy is converted into heat energy', 'consumed'],
                  hint: 'Review c6_physics_ch03_012 on building a simple electrical circuit and how energy flows from a cell.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance.' },
                { id: 'b', prompt: 'Analyze a scenario where a ceiling fan runs slower than usual during summer evenings when many households in the neighborhood are using heavy appliances.', answer: 'When many appliances run simultaneously, the electrical load increases',
                  options: ['When many appliances run simultaneously, the electrical load increases', 'consumed', 'electrical supply is infinite and unaffected by total neighborhood demand'],
                  hint: 'Review c6_physics_ch03_012 on building a simple electrical circuit and how energy flows from a cell.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance.' }
          ],
            remediations: { 'electricity-is-consumed-or-used': { steps: ['To fix this, guide the student to touch an electric bulb or motor a few minutes after it has been switched on.', 'Ask them to feel the heat generated and listen to the sound or see the light.', 'Explain that the electrical energy flowing from the cell or socket did not vanish; it transformed into heat, light, and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Using an electric heater and an electric water geyser on the same switchboard socket simultaneously is always safe as long as the.', answer: 'This is incorrect',
                  options: ['This is incorrect', 'consumed'],
                  hint: 'Review c6_physics_ch03_012 on building a simple electrical circuit and how energy flows from a cell.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance.' }
          ],
            remediations: { 'electricity-is-consumed-or-used': { steps: ['To fix this, guide the student to touch an electric bulb or motor a few minutes after it has been switched on.', 'Ask them to feel the heat generated and listen to the sound or see the light.', 'Explain that the electrical energy flowing from the cell or socket did not vanish; it transformed into heat, light, and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_002', difficulty: 'standard',
          question: 'A torchlight is a portable handheld lighting device that uses an electric cell.',
          hint: 'Review c6_physics_ch03_012 to practice tracing current flow in a physical closed loop.',
          misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb.',
          parts: [
                { id: 'a', prompt: 'What is the primary energy conversion that takes place inside the electric cell of a working torchlight before electricity reaches the lamp?', answer: 'The electric cell converts stored chemical energy into electrical energy',
                  options: ['The electric cell converts stored chemical energy into electrical energy', 'light energy to electrical energy', 'consumed', 'used up'],
                  hint: 'Review c6_physics_ch03_012 to practice tracing current flow in a physical closed loop.',
                  misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb without needing.' }
          ],
            remediations: { 'a-torchlight-bulb-lights-up': { steps: ['Remediate by taking a torchlight apart in class.', 'First, connect a wire only from the positive terminal of a cell to the side of a bulb and observe that it does not glow.', 'Next, complete the loop by adding a second wire from the negative terminal to the bottom contact of the bulb, showing.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_003', difficulty: 'standard',
          question: 'An electric cell is a device that converts chemical energy stored within.',
          hint: 'Review the basic structure of a torchlight cell and how a closed circuit allows current.',
          misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather.',
          parts: [
                { id: 'a', prompt: 'Why does an electric cell eventually stop working or "run out" after being used in a toy for a long time?', answer: 'An electric cell stops working',
                  options: ['An electric cell stops working', 'electrons', 'electricity'],
                  hint: 'Review the basic structure of a torchlight cell and how a closed circuit allows current to flow.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' },
                { id: 'b', prompt: 'If you connect two identical electric cells in series such that the negative terminal of the first touches the positive terminal of the second, how does the.', answer: 'The total potential difference doubles',
                  options: ['The total potential difference doubles', 'electricity', 'electrons'],
                  hint: 'Review the basic structure of a torchlight cell and how a closed circuit allows current to flow.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' }
          ],
            remediations: { 'an-electric-cell-stores-ready': { steps: ['To fix this misconception, take a discharged dry cell and have a teacher carefully cut it open (or show a safe.', 'Explain that these active chemicals react with each other to produce the push on charges, and once those chemicals are.', 'Emphasize that no amount of physical shaking can recreate those original active chemicals.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_004', difficulty: 'standard',
          question: 'A battery is a combination of two or more electric cells connected together.',
          hint: 'Review node c7_physics_ch02_003 to master the structure and terminal identification of.',
          misconception: 'Students often believe that adding more cells to a battery increases the physical size of the current automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A battery is a combination of two or more electric cells connected together to provide a',
                  options: ['A battery is a combination of two or more electric cells connected together to provide a', 'Electricity and its uses in daily life encompass the generation, distribution, and', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into'],
                  hint: 'Review node c7_physics_ch02_003 to master the structure and terminal identification of a single.',
                  misconception: 'Students often believe that adding more cells to a battery increases the physical size of the current automatically without needing.' }
          ],
            remediations: { 'adding-more-cells-to-a': { steps: ['To fix this misconception, take two 1.5 V cells and connect them in various ways: first side-by-side with no wire.', 'Observe that the bulb only lights up brightly when the positive-to-negative series arrangement is used.', 'This tactile experiment proves that proper terminal alignment is essential for combining voltages.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_005', difficulty: 'standard',
          question: 'An electric lamp is a device that converts electrical energy into light energy.',
          hint: 'Review simple electrical circuits and how current flows through conducting paths.',
          misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity.',
          parts: [
                { id: 'a', prompt: 'Why is the filament of a traditional incandescent electric lamp made of tungsten rather than a thick copper wire?', answer: 'Tungsten has a very high melting point and high electrical resistance',
                  options: ['Tungsten has a very high melting point and high electrical resistance', 'uses up', 'consumes', 'copper should be used confuses good conductivity with heating ability'],
                  hint: 'Review simple electrical circuits and how current flows through conducting paths.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' },
                { id: 'b', prompt: 'A small flashlight bulb has a resistance of $5\\,\\Omega$ and draws a current of $0.6\\,\\text{A}$ from a cell.', answer: 'Given: Current ($I$) = $0.6\\,\\text{A}$, Resistance ($R$) = $5\\,\\Omega$',
                  options: ['Given: Current ($I$) = $0.6\\,\\text{A}$, Resistance ($R$) = $5\\,\\Omega$', 'uses up', 'consumes'],
                  hint: 'Review simple electrical circuits and how current flows through conducting paths.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' },
                { id: 'c', prompt: 'Analyze what happens to an electric lamp in a circuit if the thin filament inside the glass bulb breaks (forms a gap).', answer: 'When the filament breaks, the circuit becomes an open circuit',
                  options: ['When the filament breaks, the circuit becomes an open circuit', 'uses up', 'consumes'],
                  hint: 'Review simple electrical circuits and how current flows through conducting paths.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' }
          ],
            remediations: { 'an-electric-lamp-uses-up': { steps: ['To fix this misconception, have the student trace a complete circuit diagram from the positive terminal of a cell.', 'Emphasize that the exact same amount of current entering the lamp leaves the lamp, and explain that energy.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_006', difficulty: 'standard',
          question: 'A simple electric circuit is a continuous, unbroken loop containing an energy.',
          hint: 'Review node c6_physics_ch03_012 to practice physically building basic circuits with cells.',
          misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops.',
          parts: [
                { id: 'a', prompt: 'Explain why a torch bulb will not light up if there is a tiny gap between one of the connecting wires and the metal casing of the bulb, even though the cell.', answer: 'Electricity requires an unbroken, closed loop to flow',
                  options: ['Electricity requires an unbroken, closed loop to flow', 'gets used up'],
                  hint: 'Review node c6_physics_ch03_012 to practice physically building basic circuits with cells and bulbs.',
                  misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops there, or that a bulb.' },
                { id: 'b', prompt: 'A simple circuit uses a 1.5 V electric cell and a small bulb. If the total resistance of the circuit components results in a current of 0.25 A flowing through.', answer: 'Given: Current ($I$) = 0.25 A, Time ($t$) = 60 s',
                  options: ['Given: Current ($I$) = 0.25 A, Time ($t$) = 60 s', 'gets used up'],
                  hint: 'Review node c6_physics_ch03_012 to practice physically building basic circuits with cells and bulbs.',
                  misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops there, or that a bulb.' }
          ],
            remediations: { 'electricity-gets-used-up-or': { steps: ['To fix this, guide the student to build a physical circuit using one cell, one bulb holder, and two separate wires.', 'Have them systematically disconnect one wire at a time to observe that the bulb goes out instantly, proving that the.', 'Emphasize tracing the loop with a finger from the positive terminal, through the bulb, and back to the negative.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
