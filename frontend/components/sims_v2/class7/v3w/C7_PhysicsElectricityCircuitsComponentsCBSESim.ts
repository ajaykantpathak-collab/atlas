import type { SimDef } from '../../engine/types';
import C7_PhysicsElectricityCircuitsComponentsCBSESim from '../../../simulations/c6_12/C7_PhysicsElectricityCircuitsComponentsCBSESim';

/** v3 wrapped master — C7_PhysicsElectricityCircuitsComponentsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicselectricitycircuitscomponentscbsesim: SimDef = {
    id: 'v3w_c7_physicselectricitycircuitscomponentscbsesim',
    title: 'Torchlight: A Simple Electric Device',
    subtitle: 'Covers the physical structure, internal electrical components, and the closed circuit.',
    classLevel: 7, subject: 'physics', topic: 'Torchlight: A Simple Electric Device',
    chapters: [],
    nodeIds: ['c7_physics_ch02_002', 'c7_physics_ch02_005', 'c7_physics_ch02_006', 'c7_physics_ch02_008', 'c7_physics_ch02_011', 'c7_physics_ch02_001', 'c7_physics_ch02_003', 'c7_physics_ch02_004', 'c7_physics_ch02_007', 'c7_physics_ch02_009', 'c7_physics_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you slide the switch of a household torchlight in your room during a power cut, the bulb instantly.', goal: 'Master Torchlight: A Simple Electric Device.' },
    discovery: {
        question: 'What is the primary energy conversion that takes place inside the electric cell of a working torchlight before electricity reaches the lamp?',
        options: ['The electric cell converts stored chemical energy into electrical energy', 'light energy to electrical energy', 'consumed'],
        answer: 'The electric cell converts stored chemical energy into electrical energy',
        hook: 'Students often believe that a torchlight bulb lights up because electricity is "consumed" or "used up" inside the bulb.',
    },
    teaching: [
        { title: 'A torchlight is a portable handheld lighting.', text: 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch, and a small electric lamp housed in a casing to convert chemical energy into electrical energy and then into.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c7_physics_ch02_008', title: 'Circuit diagrams are standardized.',
          scaffold: { problem: 'A student is given a physical circuit containing one electric cell, one open switch, and one electric lamp connected by copper wires.',
            steps: [
            { text: 'Identify all physical components in the setup (1 cell, 1 open switch, 1 lamp, connecting wires).' },
            { text: 'Select the correct standard symbol for each component (cell = long/short parallel lines; open switch = tilted blade.' },
            { text: 'Arrange the symbols in a neat rectangular loop using straight ruler lines to represent connecting wires.' },
            { text: 'Verify that the switch symbol shows an open gap and that all terminal connections form a single continuous path if.', faded: true, blankAnswer: 'A rectangular schematic diagram showing a cell connected in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_011', title: 'Testing conductivity is the.',
          scaffold: { problem: 'A student in Delhi sets up a testing circuit using a 3 V battery, connecting wires, and a small torch bulb.',
            steps: [
            { text: 'Identify the testing setup components: power source (3 V battery), load (torch bulb), and sample object (plastic comb).' },
            { text: 'Analyze the role of the sample in the circuit loop: the plastic comb is inserted into the open gap of the circuit.' },
            { text: 'Evaluate current flow: because plastic is an electrical insulator, no electric current flows through the comb, leaving.' },
            { text: 'Count the active conducting pathways: number of closed conducting pathways = 0.' },
            { text: 'Conclude material classification: since the bulb does not glow and zero pathways are completed, the plastic comb is.', faded: true, blankAnswer: '0 completed pathways; material is an electrical insulator.' }
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
        { type: 'dissect', nodeId: 'c7_physics_ch02_005', title: 'Identify each idea',
          dissect: { specimen: 'Torchlight: A Simple Electric Device', spots: [
            { id: 's1', label: 'A torchlight is a portable', prompt: 'Which idea is this? — A torchlight is a portable handheld lighting device that uses an electric cell, a switch,.', answer: 'A torchlight is a portable', options: ['A torchlight is a portable', 'An electric lamp is a', 'A simple electric circuit is', 'Circuit diagrams are standardized graphical'] },
            { id: 's2', label: 'An electric lamp is a', prompt: 'Which idea is this? — An electric lamp is a device that converts electrical energy into light energy (and.', answer: 'An electric lamp is a', options: ['An electric lamp is a', 'A torchlight is a portable', 'A simple electric circuit is', 'Circuit diagrams are standardized graphical'] },
            { id: 's3', label: 'A simple electric circuit is', prompt: 'Which idea is this? — A simple electric circuit is a continuous, unbroken loop containing an energy source.', answer: 'A simple electric circuit is', options: ['A simple electric circuit is', 'A torchlight is a portable', 'An electric lamp is a', 'Circuit diagrams are standardized graphical'] },
            { id: 's4', label: 'Circuit diagrams are standardized graphical', prompt: 'Which idea is this? — Circuit diagrams are standardized graphical representations of electrical circuits using.', answer: 'Circuit diagrams are standardized graphical', options: ['Circuit diagrams are standardized graphical', 'A torchlight is a portable', 'An electric lamp is a', 'A simple electric circuit is'] },
            { id: 's5', label: 'Testing conductivity is the experimental', prompt: 'Which idea is this? — Testing conductivity is the experimental process of determining whether a material.', answer: 'Testing conductivity is the experimental', options: ['Testing conductivity is the experimental', 'A torchlight is a portable', 'An electric lamp is a', 'A simple electric circuit is'] },
            { id: 's6', label: 'Electricity and its uses in', prompt: 'Which idea is this? — Electricity and its uses in daily life encompass the generation, distribution, and.', answer: 'Electricity and its uses in', options: ['Electricity and its uses in', 'A torchlight is a portable', 'An electric lamp is a', 'A simple electric circuit is'] }
          ] } }
    ],
    explore: { component: C7_PhysicsElectricityCircuitsComponentsCBSESim, prompt: 'Explore the interactive — Torchlight: A Simple Electric Device' },
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
            remediations: { 'electricity-gets-used-up-or': { steps: ['To fix this, guide the student to build a physical circuit using one cell, one bulb holder, and two separate wires.', 'Have them systematically disconnect one wire at a time to observe that the bulb goes out instantly, proving that the.', 'Emphasize tracing the loop with a finger from the positive terminal, through the bulb, and back to the negative.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_008', difficulty: 'standard',
          question: 'Circuit diagrams are standardized graphical representations of electrical.',
          hint: 'Review c7_physics_ch02_006 to reconnect the physical components with their real-world.',
          misconception: 'Students often think that the length of the connecting lines in a circuit diagram changes the electrical properties or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Circuit diagrams are standardized graphical representations of electrical circuits using',
                  options: ['Circuit diagrams are standardized graphical representations of electrical circuits using', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric lamp is a device that converts electrical energy into light energy (and', 'A simple electric circuit is a continuous, unbroken loop containing an energy source'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the length of the connecting lines in a circuit diagram changes the electrical properties or resistance of the.' }
          ],
            remediations: { 'the-length-of-the-connecting': { steps: ['To fix this misconception, have the student take a physical circuit with a short wire and replace it with a long wire.', 'Then, explain that in a schematic diagram, lines are purely ideal conductors used to show connections, and their.', 'Practice redrawing the same physical circuit using different paper layouts to prove that shape and line length do not.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_011', difficulty: 'standard',
          question: 'Testing conductivity is the experimental process of determining whether a.',
          hint: 'Review c7_physics_ch02_006 to practice assembling basic circuits and verifying that all.',
          misconception: 'Students often believe that all solid objects found outdoors or in nature are electrical insulators, or conversely,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Testing conductivity is the experimental process of determining whether a material',
                  options: ['Testing conductivity is the experimental process of determining whether a material', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric lamp is a device that converts electrical energy into light energy (and', 'A simple electric circuit is a continuous, unbroken loop containing an energy source'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all solid objects found outdoors or in nature are electrical insulators, or conversely, that any shiny object.' }
          ],
            remediations: { 'all-solid-objects-found-outdoors': { steps: ['Provide the student with a multi-material testing kit containing a piece of graphite (pencil lead), a dry twig, an.', 'Have them systematically insert each into a battery-bulb circuit, record whether the bulb glows, and physically.'] } } },
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
            remediations: { 'electricity-is-consumed-or-used': { steps: ['To fix this, guide the student to touch an electric bulb or motor a few minutes after it has been switched on.', 'Ask them to feel the heat generated and listen to the sound or see the light.', 'Explain that the electrical energy flowing from the cell or socket did not vanish; it transformed into heat, light, and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
