import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch03_p1: SimDef = {
    id: 'v3_c6_physics_ch03_p1',
    title: 'Electricity: Circuits and Components',
    subtitle: 'Your first real circuits — make a bulb glow, break it, and learn why.',
    classLevel: 6, subject: 'physics', topic: 'Electricity: Circuits and Components · Part 1/2',
    chapters: ['c6_physics_ch03'],
    nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young inventor fixing a torch', intro: 'Your torch went dark at the worst moment. Battery\'s fine, bulb\'s fine — so what part of the loop gave up?', goal: 'Build working circuits from cells, wires and bulbs — and know why a circuit must be a complete loop.' },
    discovery: {
        question: 'A torch has a battery and a working bulb but won\'t light. What\'s the most likely reason?',
        options: ['The circuit isn\'t a complete loop — current needs a path back', 'The battery is always the problem', 'Bulbs need two batteries', 'Torches need sunlight first'],
        answer: 'The circuit isn\'t a complete loop — current needs a path back',
        hook: 'Electricity can\'t travel one way — it needs a circle. Break the circle anywhere and everything stops.',
    },
    teaching: [
        { title: 'A Torchlight and Its Parts', text: 'A torchlight is a portable electrical system that generates light by creating a complete path—called a circuit—for electricity to flow from a battery to a bulb.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch03_011', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'On the circuit board: complete the loop to light the bulb — then break it in three different places and predict what happens each time.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch03_011', title: 'A Torchlight and Its Parts',
          caseStudy: { intro: 'Have you ever wondered why your torchlight doesn\'t stay on all the time, even when the battery is inside?',
            decisions: [{ prompt: 'Name the three basic components found inside a standard torchlight that allow it to function.', options: [
                { text: 'The three components are the battery, the bulb, and the switch', outcome: 'The three components are the battery, the bulb, and the switch.' },
                { text: 'used up', outcome: 'Not quite — Students often think electricity is "used up" by the bulb and vanishes.', reveals: 'electricity-is-used-up-by' },
                { text: 'electricity is "used up" by the bulb and vanishes', outcome: 'Not quite — Students often think electricity is "used up" by the bulb and vanishes.', reveals: 'electricity-is-used-up-by' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_012', title: 'Building a Simple Electrical Circuit',
          caseStudy: { intro: 'Have you ever wondered how the light bulb in your room turns on the moment you flip a switch?',
            decisions: [{ prompt: 'What are the four basic components required to build a simple electrical circuit?', options: [
                { text: 'The four components are a power source (battery or cell), a load (bulb or motor),', outcome: 'The four components are a power source (battery or cell), a load (bulb or motor), connecting wires.' },
                { text: 'electricity "pours" into the bulb from one wire and just disappears', outcome: 'Not quite — Students often believe electricity "pours" into the bulb from one wire and just disappears.', reveals: 'electricity-pours-into-the-bulb' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_013', title: 'Circuit Diagrams and Symbols',
          caseStudy: { intro: 'Imagine you are trying to explain how a flashlight works to a friend living far away; would you spend hours drawing a realistic battery and bulb, or would you.',
            decisions: [{ prompt: 'In a circuit diagram, what does the symbol of a circle with a cross inside it represent?', options: [
                { text: 'It represents a bulb', outcome: 'It represents a bulb. If a student answers "a battery" or "a power source," they are confusing the.' },
                { text: 'a battery', outcome: 'Not quite — Students often think a "circuit diagram" must look exactly like the physical layout of the desk.', reveals: 'a-circuit-diagram-must-look' },
                { text: 'a power source', outcome: 'Not quite — Students often think a "circuit diagram" must look exactly like the physical layout of the desk.', reveals: 'a-circuit-diagram-must-look' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_014', title: 'Electrical Conductors and Insulators',
          caseStudy: { intro: 'Have you ever wondered why your mother uses a plastic handle to lift a hot metal pan, or why the wires connecting your television to the wall are covered.',
            decisions: [{ prompt: 'Name two materials that are good electrical conductors and two materials that are good electrical insulators.', options: [
                { text: 'Copper and iron are conductors', outcome: 'Copper and iron are conductors; rubber and plastic are insulators.' },
                { text: 'if an object is hard or solid, it must be a conductor', outcome: 'Not quite — Students often believe that if an object is hard or solid, it must be a conductor.', reveals: 'if-an-object-is-hard' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_015', title: 'Switches: Opening and Closing Circuits',
          caseStudy: { intro: 'Have you ever wondered why the light in your room turns on only when you press a specific button?',
            decisions: [{ prompt: 'What happens to the flow of electricity when you move a switch to the "OFF" position?', options: [
                { text: 'The circuit is broken (opened)', outcome: 'The circuit is broken (opened), which stops the flow of current.' },
                { text: 'it still flows', outcome: 'Not quite — Students often think "Open" means "On" (like opening a door to let people in).', reveals: 'open-means-on-like-opening' },
                { text: '"Open" means "On" (like opening a door to let people in)', outcome: 'Not quite — Students often think "Open" means "On" (like opening a door to let people in).', reveals: 'open-means-on-like-opening' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_016', title: 'Electric Cells and Batteries',
          caseStudy: { intro: 'Think about the remote control you use for your TV; have you ever noticed the "+" and "-" signs on the batteries inside?',
            decisions: [{ prompt: 'What is the primary function of an electric cell inside a device like a torch?', options: [
                { text: 'An electric cell converts chemical energy into electrical energy', outcome: 'An electric cell converts chemical energy into electrical energy.' },
                { text: 'stored', outcome: 'Not quite — Students often believe that electricity is "stored" inside the battery as actual current, rather.', reveals: 'electricity-is-stored-inside-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_011', title: 'Use it in the wild',
          caseStudy: { intro: 'A torch stops working. A student checks: the battery is new, the bulb is fine, but inside the compartment the metal spring has rusted and one battery sits backwards. \'The battery must just be dead,\' he concludes, and reaches for another.',
            decisions: [{ prompt: 'What is actually stopping the torch?', options: [
                { text: 'The circuit is broken in two ways — the rusted spring no longer conducts well and the reversed battery breaks the proper direction of the path. A torch needs a complete loop of conducting material: current must leave one end of the battery, pass through the bulb, and return to the other end. Any gap, insulator or reversed cell interrupts the loop and the light dies.', outcome: 'Checking a circuit means checking the path, not just the parts — a good battery cannot push current through rust, plastic or a wrong-way cell.' },
                { text: 'He is right — when a torch fails, the battery is always to blame, so just swap in another.', outcome: 'A new battery in a broken path changes nothing — the fault here is in the connections, not the power source.', reveals: 'always-blame-battery' },
                { text: 'The bulb is at fault — if the battery and wires are fine, the filament must have burnt out.', outcome: 'The bulb was already checked — the remaining suspects are the conducting path itself: the rusty spring and the reversed battery.', reveals: 'always-blame-bulb' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_016', title: 'The bigger picture',
          caseStudy: { intro: 'You just learned the rule every electrician lives by: current only flows in complete loops. Every switch, fuse and plug is a controlled way to open or close one.',
            decisions: [{ prompt: 'What comes next? Electricity: Circuits and Components · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electricity: Circuits and Components · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch03_011', difficulty: 'standard',
          question: 'A torchlight is a portable electrical system that generates light by creating.',
          hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
          misconception: 'Students often think electricity is "used up" by the bulb and vanishes.',
          parts: [
                { id: 'a', prompt: 'Name the three basic components found inside a standard torchlight that allow it to function.', answer: 'The three components are the battery, the bulb, and the switch',
                  options: ['The three components are the battery, the bulb, and the switch', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' },
                { id: 'b', prompt: 'If you take the battery out of your torchlight, the bulb will not light up even if the switch is in the "ON" position. Why?', answer: 'The battery is the source of electrical energy',
                  options: ['The battery is the source of electrical energy', 'the switch is broken', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' },
                { id: 'c', prompt: 'A torchlight has a switch. If the switch is "OFF," how would you describe the status of the electrical circuit?', answer: 'The circuit is "broken" or "incomplete," meaning electricity cannot flow',
                  options: ['The circuit is "broken" or "incomplete," meaning electricity cannot flow', 'the circuit is still working', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' },
                { id: 'd', prompt: 'If a torchlight is "ON" but the bulb is not glowing, what is one possible reason related to the circuit components?', answer: 'The bulb might be fused (broken filament) or the battery might be dead',
                  options: ['The bulb might be fused (broken filament) or the battery might be dead', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' }
          ],
            remediations: { 'electricity-is-used-up-by': { steps: ['First, ask the student to trace the entire path from one end of the battery, through the bulb, and back to the other.', 'Tell them: "If the path has a gap, the electricity cannot return, and the bulb will not glow." Have them draw the loop.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think electricity is "used up" by the bulb and vanishes.',
          parts: [
                { id: 'a', prompt: 'Is a torchlight with the switch in the "OFF" position considered a "complete" circuit? Justify your answer.', answer: 'No, it is an "open" or "broken" circuit',
                  options: ['No, it is an "open" or "broken" circuit', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' }
          ],
            remediations: { 'electricity-is-used-up-by': { steps: ['First, ask the student to trace the entire path from one end of the battery, through the bulb, and back to the other.', 'Tell them: "If the path has a gap, the electricity cannot return, and the bulb will not glow." Have them draw the loop.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_012', difficulty: 'standard',
          question: 'A simple electrical circuit is a complete, continuous path of conducting.',
          hint: 'Review the anatomy of a battery and a light bulb (the two contact points).',
          misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.',
          parts: [
                { id: 'a', prompt: 'If your bulb is connected to a battery with a single wire, why does it not light up?', answer: 'The bulb does not light up',
                  options: ['The bulb does not light up', 'electricity "pours" into the bulb from one wire and just disappears'],
                  hint: 'Review the anatomy of a battery and a light bulb (the two contact points).',
                  misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.' },
                { id: 'b', prompt: 'You have a battery, a bulb, and two wires. If you connect one wire to the positive side of the battery and the other end of that same wire to the negative side.', answer: 'The current bypasses the bulb, creating a short circuit',
                  options: ['The current bypasses the bulb, creating a short circuit', 'electricity "pours" into the bulb from one wire and just disappears'],
                  hint: 'Review the anatomy of a battery and a light bulb (the two contact points).',
                  misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.' }
          ],
            remediations: { 'electricity-pours-into-the-bulb': { steps: ['Ask the student to trace the path of electricity with their finger on a drawing of a circuit, starting from the.', 'If they get stuck at the bulb, ask: "If the electricity goes in, where does it go next to finish its journey?" Explain.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_013', difficulty: 'standard',
          question: 'A circuit diagram is a standard, simplified representation of an electrical.',
          hint: 'Review the definition of a closed circuit where current flows from the positive terminal.',
          misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.',
          parts: [
                { id: 'a', prompt: 'In a circuit diagram, what does the symbol of a circle with a cross inside it represent?', answer: 'It represents a bulb',
                  options: ['It represents a bulb', 'a battery', 'a power source', 'circuit diagram'],
                  hint: 'Review the definition of a closed circuit where current flows from the positive terminal to the.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' },
                { id: 'b', prompt: 'If you have a battery and a bulb, draw the circuit diagram and explain what happens when the switch symbol is drawn as an open, disconnected line.', answer: 'The switch is "open," meaning the circuit is broken, and the current cannot flow',
                  options: ['The switch is "open," meaning the circuit is broken, and the current cannot flow', 'circuit diagram'],
                  hint: 'Review the definition of a closed circuit where current flows from the positive terminal to the.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' },
                { id: 'c', prompt: 'Compare a battery symbol to a bulb symbol. How does their structure tell you which one provides energy and which one uses it?', answer: 'The battery symbol (two parallel lines) indicates a difference in potential',
                  options: ['The battery symbol (two parallel lines) indicates a difference in potential', 'circuit diagram'],
                  hint: 'Review the definition of a closed circuit where current flows from the positive terminal to the.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' }
          ],
            remediations: { 'a-circuit-diagram-must-look': { steps: ['Ask the student to trace the path of the electricity with their finger on the physical circuit.', 'Then, ask them to draw that path on paper using only straight horizontal and vertical lines.', 'Remind them that in a diagram, "how the wire bends" doesn\'t matter, but "what the wire connects" is everything.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_014', difficulty: 'standard',
          question: 'An electrical conductor is a material that allows electric current to flow.',
          hint: 'Review the properties of metals versus non-metals in your science textbook.',
          misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.',
          parts: [
                { id: 'a', prompt: 'Name two materials that are good electrical conductors and two materials that are good electrical insulators.', answer: 'Copper and iron are conductors',
                  options: ['Copper and iron are conductors', 'if an object is hard or solid, it must be a conductor'],
                  hint: 'Review the properties of metals versus non-metals in your science textbook.',
                  misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.' }
          ],
            remediations: { 'if-an-object-is-hard': { steps: ['Perform a simple test: take a battery, a small light bulb, and a piece of wire.', 'Create a loop, then break it and insert a metal nail; observe the bulb light up.', 'Then, replace the nail with a glass rod or plastic ruler and observe the bulb stays dark.', 'Explain that "hardness" does not mean "conducts electricity," and that only specific materials, primarily metals, allow.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_015', difficulty: 'standard',
          question: 'A switch is a mechanical device in an electrical circuit that controls the flow.',
          hint: 'Review the concept of a "Closed Loop" in a circuit.',
          misconception: 'Students often think "Open" means "On" (like opening a door to let people in).',
          parts: [
                { id: 'a', prompt: 'What happens to the flow of electricity when you move a switch to the "OFF" position?', answer: 'The circuit is broken (opened)',
                  options: ['The circuit is broken (opened)', 'it still flows', '"Open" means "On" (like opening a door to let people in)'],
                  hint: 'Review the concept of a "Closed Loop" in a circuit.',
                  misconception: 'Students often think "Open" means "On" (like opening a door to let people in).' },
                { id: 'b', prompt: 'You are drawing a circuit diagram to control a fan. If you want the fan to stay ON, should you draw the switch connection as touching or with a gap?', answer: 'You should draw it touching (closed)',
                  options: ['You should draw it touching (closed)', '"Open" means "On" (like opening a door to let people in)'],
                  hint: 'Review the concept of a "Closed Loop" in a circuit.',
                  misconception: 'Students often think "Open" means "On" (like opening a door to let people in).' }
          ],
            remediations: { 'open-means-on-like-opening': { steps: ['Ask the student to visualize a bridge over a river.', 'Tell them: "If the bridge is \'Open\' for ships to pass, the road for cars is broken—no cars can cross.', 'Similarly, if a switch is \'Open,\' the electrical path is broken and no current can cross." Have them draw a bridge and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_016', difficulty: 'standard',
          question: 'An electric cell is a device that converts stored chemical energy into.',
          hint: 'Review the basic idea of energy sources (like food for humans or fuel for cars).',
          misconception: 'Students often believe that electricity is "stored" inside the battery as actual current, rather than as chemical.',
          parts: [
                { id: 'a', prompt: 'What is the primary function of an electric cell inside a device like a torch?', answer: 'An electric cell converts chemical energy into electrical energy',
                  options: ['An electric cell converts chemical energy into electrical energy', 'stored'],
                  hint: 'Review the basic idea of energy sources (like food for humans or fuel for cars).',
                  misconception: 'Students often believe that electricity is "stored" inside the battery as actual current, rather than as chemical potential energy.' },
                { id: 'b', prompt: 'A student connects a wire from one terminal of a cell to the other terminal of the same cell. What happens, and why?', answer: 'Current flows through the wire',
                  options: ['Current flows through the wire', 'stored'],
                  hint: 'Review the basic idea of energy sources (like food for humans or fuel for cars).',
                  misconception: 'Students often believe that electricity is "stored" inside the battery as actual current, rather than as chemical potential energy.' }
          ],
            remediations: { 'electricity-is-stored-inside-the': { steps: ['First, ask the student to imagine a ball held high above the ground; explain that the ball has "potential" to move.', 'Explain that the chemicals are like a coiled spring, and when the circuit is closed, the spring is released.', 'Use the analogy of a water pump: the cell is the pump, not the water itself.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
