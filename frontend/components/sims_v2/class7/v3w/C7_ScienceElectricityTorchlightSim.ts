import type { SimDef } from '../../engine/types';
import C7_ScienceElectricityTorchlightSim from '../../../simulations/c6_12/C7_ScienceElectricityTorchlightSim';

/** v3 wrapped master — C7_ScienceElectricityTorchlightSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_scienceelectricitytorchlightsim: SimDef = {
    id: 'v3w_c7_scienceelectricitytorchlightsim',
    title: 'Electricity Torchlight',
    subtitle: 'Covers the physical structure, internal electrical components, and the closed circuit.',
    classLevel: 7, subject: 'science', topic: 'Torchlight: A Simple Electric Device',
    chapters: [],
    nodeIds: ['c7_physics_ch02_002', 'c7_physics_ch02_003', 'c7_physics_ch02_001', 'c7_physics_ch02_004', 'c7_physics_ch02_005', 'c7_physics_ch02_006', 'c7_physics_ch02_007', 'c7_physics_ch02_008', 'c7_physics_ch02_009', 'c7_physics_ch02_010', 'c7_physics_ch02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you slide the switch of a household torchlight in your room during a power cut, the bulb instantly.', goal: 'Master Electricity Torchlight.' },
    discovery: {
        question: 'What is the primary energy conversion that takes place inside the electric cell of a working torchlight before electricity reaches the lamp?',
        options: ['The electric cell converts stored chemical energy into electrical energy', 'light energy to electrical energy', 'consumed'],
        answer: 'The electric cell converts stored chemical energy into electrical energy',
        hook: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb.',
    },
    teaching: [
        { title: 'A torchlight is a portable handheld lighting.', text: 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch, and a small electric lamp housed in a casing to convert chemical energy into electrical energy and then into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch02_002', title: 'A torchlight is a portable handheld.',
          scaffold: { problem: 'A student examines a torchlight where the metal reflector touches the side terminal of the bulb.',
            steps: [
            { text: 'Identify given values with units: Current $I = 0.4\\,\\text{A}$, Time $t = 10\\,\\text{s}$.' },
            { text: 'Identify the correct formula relating charge, current, and time: $Q = I \\times t$.' },
            { text: 'Substitute the given values into the formula with their units: $Q = 0.4\\,\\text{A} \\times 10\\,\\text{s}$.' },
            { text: 'Compute the numerical value and track unit cancellation: $0.4 \\times 10 = 4$, and amperes $\\times$ seconds ($\\text{A}.' },
            { text: 'Verify the answer is physically reasonable: $4\\,\\text{C}$ of charge flowing in $10\\,\\text{seconds}$ for a small torch.', faded: true, blankAnswer: '$4\\,\\text{C}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_003', title: 'An electric cell is a device that.',
          scaffold: { problem: 'A science kit circuit uses a fresh 1.5 V electric cell that drives a constant current of 0.25 A through a small LED indicator for 2.',
            steps: [
            { text: 'Identify given values with units: Current ($I$) = 0.25 A, Time ($t$) = 2 minutes.' },
            { text: 'Identify the required formula relating charge, current, and time: $Q = I \\times t$.' },
            { text: 'Substitute the numerical values and units into the formula: $Q = 0.25 \\text{ A} \\times 120 \\text{ s}$.' },
            { text: 'Compute the product and track unit cancellation (A $\\times$ s = C): $Q = 30 \\text{ C}$.' },
            { text: 'Verify that 30 Coulombs is a physically sensible charge for a small LED circuit running for 2 minutes.', faded: true, blankAnswer: '30 C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_001', title: 'Electricity and its uses in daily life.',
          scaffold: { problem: 'A kitchen mixer grinder operates with a power rating of $500\\text{ W}$.',
            steps: [
            { text: 'Identify the given values with units: Power ($P$) = $500\\text{ W}$, Time ($t$) = $120\\text{ s}$.' },
            { text: 'Identify the relevant formula linking energy, power, and time: Energy ($E$) = $P \\times t$.' },
            { text: 'Substitute the numerical values and units into the formula: $E = 500\\text{ W} \\times 120\\text{ s}$.' },
            { text: 'Perform the arithmetic calculation and track unit cancellation ($1\\text{ Watt} = 1\\text{ Joule/second}$, so $\\text{W}.' },
            { text: 'Verify that the answer is physically reasonable for a high-power kitchen appliance running for two minutes, yielding.', faded: true, blankAnswer: '$60,000\\text{ J}$ (or $60\\text{ kJ}$)' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_004', title: 'A battery is a combination of two or.',
          scaffold: { problem: 'A student is assembling a science project toy car in Delhi that requires a power source of 6.0 V.',
            steps: [
            { text: 'Identify the required total voltage ($V_{\\text{total}} = 6.0\\text{ V}$) and the voltage of a single cell ($V_1 =.' },
            { text: 'Identify the formula for cells in series: $V_{\\text{total}} = n \\times V_1$, where $n$ is the number of cells.' },
            { text: 'Rearrange to find the number of cells: $n = \\frac{V_{\\text{total}}}{V_1}$.' },
            { text: 'Substitute the given values with units: $n = \\frac{6.0\\text{ V}}{1.5\\text{ V}}$.' },
            { text: 'Compute the result and verify physical reasonableness: $n = 4$ cells.', faded: true, blankAnswer: '4 cells' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_005', title: 'An electric lamp is a device that.',
          scaffold: { problem: 'A study lamp connected to a household circuit has a potential difference of $220\\,\\text{V}$ across its terminals and draws a current of.',
            steps: [
            { text: 'Identify given quantities with units: Potential difference ($V$) = $220\\,\\text{V}$, Current ($I$) = $0.25\\,\\text{A}$,.' },
            { text: 'Identify the formula and check units: $P = V \\times I$, where $V$ is in volts and $I$ is in amperes.' },
            { text: 'Substitute values with units into the formula: $P = 220\\,\\text{V} \\times 0.25\\,\\text{A}$.' },
            { text: 'Compute the numerical value and track unit cancellation ($\\text{V} \\times \\text{A} = \\text{W}$): $220 \\times 0.25 = 55$.' },
            { text: 'Verify the answer is physically reasonable for a small desk lamp and state with units: $55\\,\\text{W}$.', faded: true, blankAnswer: '$55\\,\\text{W}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_006', title: 'A simple electric circuit is a.',
          scaffold: { problem: 'A student sets up a circuit with a 1.5 V cell, a switch, and a bulb using copper wires. The bulb does not light up.',
            steps: [
            { text: 'Identify the components in the circuit (cell, switch, bulb, wires) and note the reported fault (bulb does not light).' },
            { text: 'Analyze the connection point where the wire touches another wire; recall that plastic is an electrical insulator.' },
            { text: 'Determine that the plastic insulation blocks the continuous flow of electric current, creating an open circuit.' },
            { text: 'Remove the insulation to expose the bare copper metal conductor and make direct metal-to-metal contact.' },
            { text: 'Verify that the circuit loop is now continuous, allowing current to flow and light the bulb.', faded: true, blankAnswer: 'The bulb stays dark because plastic insulation blocks.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch02_003', title: 'Identify each idea',
          dissect: { specimen: 'Electricity Torchlight', spots: [
            { id: 's1', label: 'A torchlight is a portable', prompt: 'Which idea is this? — A torchlight is a portable handheld lighting device that uses an electric cell, a switch,.', answer: 'A torchlight is a portable', options: ['A torchlight is a portable', 'An electric cell is a', 'Electricity and its uses in', 'A battery is a combination'] },
            { id: 's2', label: 'An electric cell is a', prompt: 'Which idea is this? — An electric cell is a device that converts chemical energy stored within it into.', answer: 'An electric cell is a', options: ['An electric cell is a', 'A torchlight is a portable', 'Electricity and its uses in', 'A battery is a combination'] },
            { id: 's3', label: 'Electricity and its uses in', prompt: 'Which idea is this? — Electricity and its uses in daily life encompass the generation, distribution, and.', answer: 'Electricity and its uses in', options: ['Electricity and its uses in', 'A torchlight is a portable', 'An electric cell is a', 'A battery is a combination'] },
            { id: 's4', label: 'A battery is a combination', prompt: 'Which idea is this? — A battery is a combination of two or more electric cells connected together to provide a.', answer: 'A battery is a combination', options: ['A battery is a combination', 'A torchlight is a portable', 'An electric cell is a', 'Electricity and its uses in'] },
            { id: 's5', label: 'An electric lamp is a', prompt: 'Which idea is this? — An electric lamp is a device that converts electrical energy into light energy (and.', answer: 'An electric lamp is a', options: ['An electric lamp is a', 'A torchlight is a portable', 'An electric cell is a', 'Electricity and its uses in'] },
            { id: 's6', label: 'A simple electric circuit is', prompt: 'Which idea is this? — A simple electric circuit is a continuous, unbroken loop containing an energy source.', answer: 'A simple electric circuit is', options: ['A simple electric circuit is', 'A torchlight is a portable', 'An electric cell is a', 'Electricity and its uses in'] }
          ] } }
    ],
    explore: { component: C7_ScienceElectricityTorchlightSim, prompt: 'Explore the interactive — Electricity Torchlight' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch02_002', difficulty: 'standard',
          question: 'A torchlight is a portable handheld lighting device that uses an electric cell,.',
          hint: 'Review c6_physics_ch03_012 to practice tracing current flow in a physical closed loop.',
          misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb.',
          parts: [
                { id: 'a', prompt: 'What is the primary energy conversion that takes place inside the electric cell of a working torchlight before electricity reaches the lamp?', answer: 'The electric cell converts stored chemical energy into electrical energy',
                  options: ['The electric cell converts stored chemical energy into electrical energy', 'light energy to electrical energy', 'consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb without needing a.' }
          ],
            remediations: { 'a-torchlight-bulb-lights-up': { steps: ['Remediate by taking a torchlight apart in class.', 'First, connect a wire only from the positive terminal of a cell to the side of a bulb and observe that it does not glow.', 'Next, complete the loop by adding a second wire from the negative terminal to the bottom contact of the bulb, showing.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "A torchlight can work perfectly even if the metal spring at the bottom of the casing is replaced by a thick dry wooden.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'it will work because wood still touches the cell', 'consumed', 'used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb without needing a.' },
                { id: 'b', prompt: 'Design a troubleshooting checklist for a student whose torchlight fails to light up when the switch is pushed.', answer: 'Criteria for a good answer: 1',
                  options: ['Criteria for a good answer: 1', 'consumed', 'used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb without needing a.' }
          ],
            remediations: { 'a-torchlight-bulb-lights-up': { steps: ['Remediate by taking a torchlight apart in class.', 'First, connect a wire only from the positive terminal of a cell to the side of a bulb and observe that it does not glow.', 'Next, complete the loop by adding a second wire from the negative terminal to the bottom contact of the bulb, showing.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_003', difficulty: 'standard',
          question: 'An electric cell is a device that converts chemical energy stored within it.',
          hint: 'Review the basic structure of a torchlight cell and how a closed circuit allows current.',
          misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather.',
          parts: [
                { id: 'a', prompt: 'Why does an electric cell eventually stop working or "run out" after being used in a toy for a long time?', answer: 'An electric cell stops working',
                  options: ['An electric cell stops working', 'electrons', 'electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' },
                { id: 'b', prompt: 'If you connect two identical electric cells in series such that the negative terminal of the first touches the positive terminal of the second, how does the.', answer: 'The total potential difference doubles',
                  options: ['The total potential difference doubles', 'electricity', 'electrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' }
          ],
            remediations: { 'an-electric-cell-stores-ready': { steps: ['To fix this misconception, take a discharged dry cell and have a teacher carefully cut it open (or show a safe.', 'Explain that these active chemicals react with each other to produce the push on charges, and once those chemicals are.', 'Emphasize that no amount of physical shaking can recreate those original active chemicals.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather.',
          parts: [
                { id: 'a', prompt: 'A student claims that an electric cell creates electricity from nothing inside the metal casing.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'electricity', 'electrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' },
                { id: 'b', prompt: 'If you connect two identical electric cells in series such that the negative terminal of the first touches the positive terminal of the second, how does the.', answer: 'The total potential difference doubles',
                  options: ['The total potential difference doubles', 'electricity', 'electrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that an electric cell stores ready-made "electricity" or "electrons" inside it as a fluid, rather than understanding.' }
          ],
            remediations: { 'an-electric-cell-stores-ready': { steps: ['To fix this misconception, take a discharged dry cell and have a teacher carefully cut it open (or show a safe.', 'Explain that these active chemicals react with each other to produce the push on charges, and once those chemicals are.', 'Emphasize that no amount of physical shaking can recreate those original active chemicals.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_001', difficulty: 'standard',
          question: 'Electricity and its uses in daily life encompass the generation, distribution,.',
          hint: 'Review c6_physics_ch03_012 on building a simple electrical circuit and how energy flows.',
          misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing.',
          parts: [
                { id: 'a', prompt: 'What is the primary energy transformation that occurs inside a working electric iron used for pressing clothes?', answer: 'Electrical energy is converted into heat energy',
                  options: ['Electrical energy is converted into heat energy', 'consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance,.' },
                { id: 'b', prompt: 'Analyze a scenario where a ceiling fan runs slower than usual during summer evenings when many households in the neighborhood are using heavy appliances.', answer: 'When many appliances run simultaneously, the electrical load increases',
                  options: ['When many appliances run simultaneously, the electrical load increases', 'consumed', 'electrical supply is infinite and unaffected by total neighborhood demand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance,.' }
          ],
            remediations: { 'electricity-is-consumed-or-used': { steps: ['To fix this, guide the student to touch an electric bulb or motor a few minutes after it has been switched on.', 'Ask them to feel the heat generated and listen to the sound or see the light.', 'Explain that the electrical energy flowing from the cell or socket did not vanish; it transformed into heat, light, and.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Using an electric heater and an electric water geyser on the same switchboard socket simultaneously is always safe as long as the.', answer: 'This is incorrect',
                  options: ['This is incorrect', 'consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance,.' },
                { id: 'b', prompt: 'Analyze a scenario where a ceiling fan runs slower than usual during summer evenings when many households in the neighborhood are using heavy appliances.', answer: 'When many appliances run simultaneously, the electrical load increases',
                  options: ['When many appliances run simultaneously, the electrical load increases', 'consumed', 'electrical supply is infinite and unaffected by total neighborhood demand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity is "consumed" or used up permanently and disappears completely after passing through an appliance,.' }
          ],
            remediations: { 'electricity-is-consumed-or-used': { steps: ['To fix this, guide the student to touch an electric bulb or motor a few minutes after it has been switched on.', 'Ask them to feel the heat generated and listen to the sound or see the light.', 'Explain that the electrical energy flowing from the cell or socket did not vanish; it transformed into heat, light, and.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_004', difficulty: 'standard',
          question: 'A battery is a combination of two or more electric cells connected together to.',
          hint: 'Review node c7_physics_ch02_003 to master the structure and terminal identification of a.',
          misconception: 'Students often believe that adding more cells to a battery increases the physical size of the current automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A battery is a combination of two or more electric cells connected together to provide a',
                  options: ['A battery is a combination of two or more electric cells connected together to provide a', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into', 'Electricity and its uses in daily life encompass the generation, distribution, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that adding more cells to a battery increases the physical size of the current automatically without needing a.' }
          ],
            remediations: { 'adding-more-cells-to-a': { steps: ['To fix this misconception, take two 1.5 V cells and connect them in various ways: first side-by-side with no wire.', 'Observe that the bulb only lights up brightly when the positive-to-negative series arrangement is used.', 'This tactile experiment proves that proper terminal alignment is essential for combining voltages.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_005', difficulty: 'standard',
          question: 'An electric lamp is a device that converts electrical energy into light energy.',
          hint: 'Review simple electrical circuits and how current flows through conducting paths in.',
          misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is.',
          parts: [
                { id: 'a', prompt: 'Why is the filament of a traditional incandescent electric lamp made of tungsten rather than a thick copper wire?', answer: 'Tungsten has a very high melting point and high electrical resistance',
                  options: ['Tungsten has a very high melting point and high electrical resistance', 'uses up', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' },
                { id: 'b', prompt: 'A small flashlight bulb has a resistance of $5\\,\\Omega$ and draws a current of $0.6\\,\\text{A}$ from a cell.', answer: 'Given: Current ($I$) = $0.6\\,\\text{A}$, Resistance ($R$) = $5\\,\\Omega$',
                  options: ['Given: Current ($I$) = $0.6\\,\\text{A}$, Resistance ($R$) = $5\\,\\Omega$', 'uses up', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' },
                { id: 'c', prompt: 'Analyze what happens to an electric lamp in a circuit if the thin filament inside the glass bulb breaks (forms a gap).', answer: 'When the filament breaks, the circuit becomes an open circuit',
                  options: ['When the filament breaks, the circuit becomes an open circuit', 'uses up', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' }
          ],
            remediations: { 'an-electric-lamp-uses-up': { steps: ['To fix this misconception, have the student trace a complete circuit diagram from the positive terminal of a cell,.', 'Emphasize that the exact same amount of current entering the lamp leaves the lamp, and explain that energy is.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An electric lamp creates new energy inside the bulb to make light." Is this statement scientifically correct according to the law of.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'uses up', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an electric lamp "uses up" or "consumes" electricity completely, or that electricity is stored inside the bulb.' }
          ],
            remediations: { 'an-electric-lamp-uses-up': { steps: ['To fix this misconception, have the student trace a complete circuit diagram from the positive terminal of a cell,.', 'Emphasize that the exact same amount of current entering the lamp leaves the lamp, and explain that energy is.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_006', difficulty: 'standard',
          question: 'A simple electric circuit is a continuous, unbroken loop containing an energy.',
          hint: 'Review node c6_physics_ch03_012 to practice physically building basic circuits with cells.',
          misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops.',
          parts: [
                { id: 'a', prompt: 'Explain why a torch bulb will not light up if there is a tiny gap between one of the connecting wires and the metal casing of the bulb, even though the cell is.', answer: 'Electricity requires an unbroken, closed loop to flow',
                  options: ['Electricity requires an unbroken, closed loop to flow', 'gets used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops there, or that a bulb.' },
                { id: 'b', prompt: 'A simple circuit uses a 1.5 V electric cell and a small bulb. If the total resistance of the circuit components results in a current of 0.25 A flowing through.', answer: 'Given: Current ($I$) = 0.25 A, Time ($t$) = 60 s',
                  options: ['Given: Current ($I$) = 0.25 A, Time ($t$) = 60 s', 'gets used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops there, or that a bulb.' }
          ],
            remediations: { 'electricity-gets-used-up-or': { steps: ['To fix this, guide the student to build a physical circuit using one cell, one bulb holder, and two separate wires.', 'Have them systematically disconnect one wire at a time to observe that the bulb goes out instantly, proving that the.', 'Emphasize tracing the loop with a finger from the positive terminal, through the bulb, and back to the negative.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops.',
          parts: [
                { id: 'a', prompt: 'Evaluate the safety and correctness of a student\'s setup who connects both ends of a single wire directly to the positive and negative terminals of an electric.', answer: 'This setup creates a dangerous short circuit',
                  options: ['This setup creates a dangerous short circuit', 'gets used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that electricity "gets used up" or flows out of both ends of a battery into a bulb and stops there, or that a bulb.' }
          ],
            remediations: { 'electricity-gets-used-up-or': { steps: ['To fix this, guide the student to build a physical circuit using one cell, one bulb holder, and two separate wires.', 'Have them systematically disconnect one wire at a time to observe that the bulb goes out instantly, proving that the.', 'Emphasize tracing the loop with a finger from the positive terminal, through the bulb, and back to the negative.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
