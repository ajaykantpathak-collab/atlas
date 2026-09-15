import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch02_p2: SimDef = {
    id: 'v3_c7_physics_ch02_p2',
    title: 'Electricity: Circuits and their Components · Part 2/2',
    subtitle: 'Covers mechanical toggle, slide, and push-button switches in simple direct current (DC).',
    classLevel: 7, subject: 'physics', topic: 'Electricity: Circuits and their Components · Part 2/2',
    chapters: ['c7_physics_ch02'],
    nodeIds: ['c7_physics_ch02_007', 'c7_physics_ch02_008', 'c7_physics_ch02_009', 'c7_physics_ch02_010', 'c7_physics_ch02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you walk into your classroom and press the wall switch to turn on the ceiling fan, you hear a click and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A family plugs a room heater and a water geyser into the same socket board at once — and the wiring starts to overheat. What went wrong with such ordinary appliances?',
        options: ['Two high-power devices drew a heavy combined current that overheated the wires — a fire risk', 'Nothing — the switch was on, so it was safe', 'Geysers and heaters cancel each other out', 'The appliances were artificial, not natural'],
        answer: 'Two high-power devices drew a heavy combined current that overheated the wires — a fire risk',
        hook: 'Electricity earns its keep by transforming — into heat in an iron, motion in a fan, light in a bulb. Copper wires carry it easily while plastic blocks it, and every socket has a safe load limit.',
    },
    teaching: [
        { title: 'Electric Switch: Opening and Closing a Circuit', text: 'An electric switch is a simple mechanical or electronic device used to open or close an electric circuit safely, thereby controlling the flow of electric current without needing to disconnect wires.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch02_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Tour a household as an energy detective — match the iron, fan, bulb, and buzzer to the energy each converts electricity into, then flag the overloaded socket.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch02_007', title: 'Electric Switch: Opening and Closing a Circuit',
          caseStudy: { intro: 'When you walk into your classroom and press the wall switch to turn on the ceiling fan, you hear a click and the fan starts spinning.',
            decisions: [{ prompt: 'What is the primary function of an electric switch in a simple circuit, and what state must it be in for an electric lamp to glow?', options: [
                { text: 'The primary function of a switch is to control the flow of electric current by opening or', outcome: 'The primary function of a switch is to control the flow of electric current by opening or closing.' },
                { text: 'stores', outcome: 'Not quite — Students often believe that a switch "stores" or "consumes" electricity when turned off, or they.', reveals: 'a-switch-stores-or-consumes' },
                { text: 'consumes', outcome: 'Not quite — Students often believe that a switch "stores" or "consumes" electricity when turned off, or they.', reveals: 'a-switch-stores-or-consumes' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_010', title: 'Electrical Insulators: Materials That Block Current Flow',
          scaffold: { problem: 'In an Indian household wiring repair, an electrician wraps a bare copper wire carrying a current with a PVC (plastic) tape of resistance.',
            steps: [
            { text: 'Identify given values: Voltage $V = 220 \\text{ V}$, Resistance $R = 2,000,000 \\ \\Omega$.' },
            { text: 'Identify the relevant formula from Ohm\'s Law rearranged for current: $I = \\frac{V}{R}$.' },
            { text: 'Substitute values with units into the formula: $I = \\frac{220 \\text{ V}}{2,000,000 \\ \\Omega}$.' },
            { text: 'Compute the value and track unit cancellation ($\\frac{\\text{V}}{\\Omega} = \\text{A}$): $I = 0.00011 \\text{ A}$ ($0.11.' },
            { text: 'Verify the answer: The leakage current is extremely small ($0.11 \\text{ milliamperes}$), proving PVC is an excellent.', faded: true, blankAnswer: '0.00011 A (or 0.11 mA)' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a winter evening, Sameer plugs a room heater and a water geyser into the same wall socket to save time, saying \'electricity is electricity — the socket will manage.\' His mother reaches for the plug board.',
            decisions: [{ prompt: 'Who is right about the risk?', options: [
                { text: 'His mother — both are high-power heating appliances that draw heavy current together, which can overheat the wiring and cause a short circuit or fire; the socket\'s limit is about total load, not about whether the switch is on.', outcome: 'This recognises that appliances convert electrical energy to heat and that simultaneous heavy loads exceed safe current limits.' },
                { text: 'Sameer is right — a live socket supplies whatever is plugged in, so two heaters are no different from one.', outcome: 'Wiring is rated for a limited current; doubling high-power heating loads overheats conductors regardless of the switch position.', reveals: 'socket-handles-anything' },
                { text: 'The real danger is that electricity gets \'used up\' and disappears inside the heater, so running two wastes it faster.', outcome: 'Energy is not consumed into nothing — it converts to heat, light or motion; the issue here is excess current load, not depletion.', reveals: 'electricity-gets-used-up' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch02_011', title: 'You made it',
          caseStudy: { intro: 'Electricity is a shapeshifter — it arrives as current and leaves as light, heat, sound, or spin. Respect the load, or the wires pay the price.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch02_007', difficulty: 'standard',
          question: 'An electric switch is a simple mechanical or electronic device used to open.',
          hint: 'Review c7_physics_ch02_006 to reinforce how a complete circuit is structured before.',
          misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity.',
          parts: [
                { id: 'a', prompt: 'A circuit contains a 3V battery, an open switch, and a small electric lamp connected in series.', answer: 'When the switch is open, the current is 0 A',
                  options: ['When the switch is open, the current is 0 A', 'stores', 'consumes'],
                  hint: 'Review c7_physics_ch02_006 to reinforce how a complete circuit is structured before analyzing how.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of.' },
                { id: 'b', prompt: 'Analyze a circuit diagram where a switch is placed *after* the lamp relative to the positive terminal of the battery.', answer: 'Yes, the lamp will light up when the switch is closed',
                  options: ['Yes, the lamp will light up when the switch is closed', 'used up', 'stores', 'consumes'],
                  hint: 'Review c7_physics_ch02_006 to reinforce how a complete circuit is structured before analyzing how.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of.' }
          ],
            remediations: { 'a-switch-stores-or-consumes': { steps: ['To fix this, guide the student to build a simple circuit with a battery, bulb, and homemade switch using a paper clip.', 'Have them disconnect the wire returning from the bulb to the negative terminal of the battery while the switch.', 'Then explain that electricity always requires a complete round-trip loop, and a switch simply acts as a movable.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement made by a classmate: "A switch uses up electricity when it is open to stop the bulb from glowing." Is this statement correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'stores', 'consumes'],
                  hint: 'Review c7_physics_ch02_006 to reinforce how a complete circuit is structured before analyzing how.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of.' }
          ],
            remediations: { 'a-switch-stores-or-consumes': { steps: ['To fix this, guide the student to build a simple circuit with a battery, bulb, and homemade switch using a paper clip.', 'Have them disconnect the wire returning from the bulb to the negative terminal of the battery while the switch.', 'Then explain that electricity always requires a complete round-trip loop, and a switch simply acts as a movable.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_008', difficulty: 'standard',
          question: 'Circuit diagrams are standardized graphical representations of electrical.',
          hint: 'Review c7_physics_ch02_006 to reconnect the physical components with their real-world.',
          misconception: 'Students often think that the length of the connecting lines in a circuit diagram changes the electrical properties.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Circuit diagrams are standardized graphical representations of electrical circuits using',
                  options: ['Circuit diagrams are standardized graphical representations of electrical circuits using', 'Electricity and its uses in daily life encompass the generation, distribution, and', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into'],
                  hint: 'Review c7_physics_ch02_006 to reconnect the physical components with their real-world appearance.',
                  misconception: 'Students often think that the length of the connecting lines in a circuit diagram changes the electrical properties or resistance of the.' }
          ],
            remediations: { 'the-length-of-the-connecting': { steps: ['To fix this misconception, have the student take a physical circuit with a short wire and replace it with a long wire.', 'Then, explain that in a schematic diagram, lines are purely ideal conductors used to show connections, and their.', 'Practice redrawing the same physical circuit using different paper layouts to prove that shape and line length do not.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_009', difficulty: 'standard',
          question: 'Electrical conductors are materials that permit electric current to flow.',
          hint: 'Review simple circuit construction and the difference between open and closed paths.',
          misconception: 'Students often think that all solid objects conduct electricity equally well, or that shiny objects are always.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electrical conductors are materials that permit electric current to flow through them',
                  options: ['Electrical conductors are materials that permit electric current to flow through them', 'Electricity and its uses in daily life encompass the generation, distribution, and', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into'],
                  hint: 'Review simple circuit construction and the difference between open and closed paths.',
                  misconception: 'Students often think that all solid objects conduct electricity equally well, or that shiny objects are always conductors regardless.' }
          ],
            remediations: { 'all-solid-objects-conduct-electricity': { steps: ['To fix this, guide the student to build a basic tester circuit with an electric cell and a bulb.', 'Have them test a shiny plastic wrapper, a painted wooden block, and a real metal paperclip side-by-side.', 'Let them physically experience that only materials with free internal charge carriers allow the circuit to close and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_010', difficulty: 'standard',
          question: 'Electrical insulators are materials that completely block the flow of electric.',
          hint: 'Review c7_physics_ch02_009 to re-examine how conductors allow current flow, then contrast.',
          misconception: 'Students often think that *all* non-metallic materials are electrical insulators, and *all* solid substances can.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electrical insulators are materials that completely block the flow of electric current',
                  options: ['Electrical insulators are materials that completely block the flow of electric current', 'Electricity and its uses in daily life encompass the generation, distribution, and', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into'],
                  hint: 'Review c7_physics_ch02_009 to re-examine how conductors allow current flow, then contrast it with.',
                  misconception: 'Students often think that *all* non-metallic materials are electrical insulators, and *all* solid substances can be neatly sorted into.' }
          ],
            remediations: { 'all-non-metallic-materials-are': { steps: ['To fix this, guide the student to test everyday items in different states: dry wood vs.', 'wet wood, or dry cloth vs.', 'wet cloth, using a simple continuity tester circuit.', 'Show them that water containing salts (like tap water) allows current to pass, proving that surface conditions and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_011', difficulty: 'standard',
          question: 'Testing conductivity is the experimental process of determining whether.',
          hint: 'Review c7_physics_ch02_006 to practice assembling basic circuits and verifying that all.',
          misconception: 'Students often believe that all solid objects found outdoors or in nature are electrical insulators, or conversely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Testing conductivity is the experimental process of determining whether a material',
                  options: ['Testing conductivity is the experimental process of determining whether a material', 'Electricity and its uses in daily life encompass the generation, distribution, and', 'A torchlight is a portable handheld lighting device that uses an electric cell, a switch,', 'An electric cell is a device that converts chemical energy stored within it into'],
                  hint: 'Review c7_physics_ch02_006 to practice assembling basic circuits and verifying that all connections.',
                  misconception: 'Students often believe that all solid objects found outdoors or in nature are electrical insulators, or conversely, that any shiny object.' }
          ],
            remediations: { 'all-solid-objects-found-outdoors': { steps: ['Provide the student with a multi-material testing kit containing a piece of graphite (pencil lead), a dry twig,.', 'Have them systematically insert each into a battery-bulb circuit, record whether the bulb glows, and physically.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
