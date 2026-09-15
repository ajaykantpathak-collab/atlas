import type { SimDef } from '../../engine/types';
import C6_PhysicsElectricityCircuitsCBSESim from '../../../simulations/c6_12/C6_PhysicsElectricityCircuitsCBSESim';

/** v3 wrapped master — C6_PhysicsElectricityCircuitsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_physicselectricitycircuitscbsesim: SimDef = {
    id: 'v3w_c6_physicselectricitycircuitscbsesim',
    title: 'Electricity Circuits CBSE',
    subtitle: 'This node covers the basic components and the concept of an "open" vs.',
    classLevel: 6, subject: 'physics', topic: 'A Torchlight and Its Parts',
    chapters: [],
    nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_017', 'c6_physics_ch03_018', 'c6_physics_ch03_016'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why your torchlight doesn\'t stay on all the time, even when the battery is inside?', goal: 'Master Electricity Circuits CBSE.' },
    discovery: {
        question: 'Name the three basic components found inside a standard torchlight that allow it to function.',
        options: ['The three components are the battery, the bulb, and the switch', 'used up', 'electricity is "used up" by the bulb and vanishes'],
        answer: 'The three components are the battery, the bulb, and the switch',
        hook: 'Students often think electricity is "used up" by the bulb and vanishes.',
    },
    teaching: [
        { title: 'A torchlight is a portable electrical system.', text: 'A torchlight is a portable electrical system that generates light by creating a complete path—called a circuit—for electricity to flow from a battery to a bulb.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_physics_ch03_011', title: 'A torchlight is a portable electrical.',
          caseStudy: { intro: 'Have you ever wondered why your torchlight doesn\'t stay on all the time, even when the battery is inside?',
            decisions: [{ prompt: 'Name the three basic components found inside a standard torchlight that allow it to function.', options: [
                { text: 'The three components are the battery, the bulb, and the switch', outcome: 'The three components are the battery, the bulb, and the switch.' },
                { text: 'used up', outcome: 'Not quite — Students often think electricity is "used up" by the bulb and vanishes.', reveals: 'electricity-is-used-up-by' },
                { text: 'electricity is "used up" by the bulb and vanishes', outcome: 'Not quite — Students often think electricity is "used up" by the bulb and vanishes.', reveals: 'electricity-is-used-up-by' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch03_012', title: 'A simple electrical circuit is a.',
          scaffold: { problem: 'You have a battery (5 cm wire), a bulb, and another wire (5 cm). You need to connect them to light the bulb. List the steps.',
            steps: [
            { text: 'Identify the two contact points on the bulb (the side and the bottom).' },
            { text: 'Attach one wire to the positive terminal of the battery and the bottom of the bulb.' },
            { text: 'Attach the second wire to the negative terminal of the battery.' },
            { text: 'Touch the free end of the second wire to the side of the bulb to close the loop.', faded: true, blankAnswer: 'The bulb will glow when the second wire completes the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch03_013', title: 'A circuit diagram is a standard,.',
          scaffold: { problem: 'Draw a circuit diagram for a battery, a switch, and a bulb connected in a single loop. Explain why the lines must be straight.',
            steps: [
            { text: 'Identify components: 1 battery, 1 switch, 1 bulb.' },
            { text: 'Draw the battery symbol (long line, short line).' },
            { text: 'Draw a line from the positive terminal to a switch symbol, then to a bulb symbol.' },
            { text: 'Complete the loop back to the negative terminal of the battery.' },
            { text: 'Ensure all corners are square for neatness and clarity.', faded: true, blankAnswer: 'A closed loop schematic with clearly labeled standard.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch03_014', title: 'An electrical conductor is a material.',
          scaffold: { problem: 'A student wants to test which items conduct electricity: a gold ring, a rubber eraser, a silver coin, and a piece of wool.',
            steps: [
            { text: 'List the items given: gold ring, rubber eraser, silver coin, wool.' },
            { text: 'Recall that metals are generally good conductors.' },
            { text: 'Check each item: Gold is a metal (conductor), Rubber is a synthetic polymer (insulator), Silver is a metal (conductor),.' },
            { text: 'Classify the list.', faded: true, blankAnswer: 'Gold ring (Conductor), Silver coin (Conductor), Rubber.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch03_015', title: 'A switch is a mechanical device in an.',
          scaffold: { problem: 'A student has a battery, a bulb, and a switch. The bulb is currently OFF.',
            steps: [
            { text: 'Check the source (battery) to see if it is connected correctly.' },
            { text: 'Check the switch contact points to ensure the metal is touching.' },
            { text: 'Inspect the wire for breaks or loose connections.' },
            { text: 'Check if the bulb filament is intact.', faded: true, blankAnswer: 'The battery is dead, the switch is faulty (non-conductive),.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch03_017', title: 'A series circuit is an electrical.',
          caseStudy: { intro: 'Have you ever noticed a string of small decorative fairy lights where, if one bulb goes out, the whole string stops glowing?',
            decisions: [{ prompt: 'In a series circuit with three bulbs, what happens to the other two bulbs if you unscrew one of them?', options: [
                { text: 'The other two bulbs will immediately go off', outcome: 'The other two bulbs will immediately go off. A student who says "they stay on" fails to realize.' },
                { text: 'they stay on', outcome: 'Not quite — Students often think that electricity "gets used up" as it travels through each bulb, causing them.', reveals: 'electricity-gets-used-up-as' },
                { text: 'gets used up', outcome: 'Not quite — Students often think that electricity "gets used up" as it travels through each bulb, causing them.', reveals: 'electricity-gets-used-up-as' }
            ] }] } }
    ],
    explore: { component: C6_PhysicsElectricityCircuitsCBSESim, prompt: 'Explore the interactive — Electricity Circuits CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch03_011', difficulty: 'standard',
          question: 'A torchlight is a portable electrical system that generates light by creating a.',
          hint: 'Review the concept of a "loop" or "circle" where a starting point connects back to itself.',
          misconception: 'Students often think electricity is "used up" by the bulb and vanishes.',
          parts: [
                { id: 'a', prompt: 'Name the three basic components found inside a standard torchlight that allow it to function.', answer: 'The three components are the battery, the bulb, and the switch',
                  options: ['The three components are the battery, the bulb, and the switch', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' },
                { id: 'b', prompt: 'If you take the battery out of your torchlight, the bulb will not light up even if the switch is in the "ON" position. Why?', answer: 'The battery is the source of electrical energy',
                  options: ['The battery is the source of electrical energy', 'the switch is broken', 'used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' },
                { id: 'c', prompt: 'A torchlight has a switch. If the switch is "OFF," how would you describe the status of the electrical circuit?', answer: 'The circuit is "broken" or "incomplete," meaning electricity cannot flow',
                  options: ['The circuit is "broken" or "incomplete," meaning electricity cannot flow', 'the circuit is still working', 'used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' }
          ],
            remediations: { 'electricity-is-used-up-by': { steps: ['First, ask the student to trace the entire path from one end of the battery, through the bulb, and back to the other.', 'Tell them: "If the path has a gap, the electricity cannot return, and the bulb will not glow." Have them draw the loop.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think electricity is "used up" by the bulb and vanishes.',
          parts: [
                { id: 'a', prompt: 'Is a torchlight with the switch in the "OFF" position considered a "complete" circuit? Justify your answer.', answer: 'No, it is an "open" or "broken" circuit',
                  options: ['No, it is an "open" or "broken" circuit', 'used up', 'electricity is "used up" by the bulb and vanishes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think electricity is "used up" by the bulb and vanishes.' }
          ],
            remediations: { 'electricity-is-used-up-by': { steps: ['First, ask the student to trace the entire path from one end of the battery, through the bulb, and back to the other.', 'Tell them: "If the path has a gap, the electricity cannot return, and the bulb will not glow." Have them draw the loop.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_012', difficulty: 'standard',
          question: 'A simple electrical circuit is a complete, continuous path of conducting.',
          hint: 'Review the anatomy of a battery and a light bulb (the two contact points).',
          misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.',
          parts: [
                { id: 'a', prompt: 'If your bulb is connected to a battery with a single wire, why does it not light up?', answer: 'The bulb does not light up',
                  options: ['The bulb does not light up', 'electricity "pours" into the bulb from one wire and just disappears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.' },
                { id: 'b', prompt: 'You have a battery, a bulb, and two wires. If you connect one wire to the positive side of the battery and the other end of that same wire to the negative side.', answer: 'The current bypasses the bulb, creating a short circuit',
                  options: ['The current bypasses the bulb, creating a short circuit', 'electricity "pours" into the bulb from one wire and just disappears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe electricity "pours" into the bulb from one wire and just disappears.' }
          ],
            remediations: { 'electricity-pours-into-the-bulb': { steps: ['Ask the student to trace the path of electricity with their finger on a drawing of a circuit, starting from the.', 'If they get stuck at the bulb, ask: "If the electricity goes in, where does it go next to finish its journey?" Explain.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_013', difficulty: 'standard',
          question: 'A circuit diagram is a standard, simplified representation of an electrical.',
          hint: 'Review the definition of a closed circuit where current flows from the positive terminal.',
          misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.',
          parts: [
                { id: 'a', prompt: 'In a circuit diagram, what does the symbol of a circle with a cross inside it represent?', answer: 'It represents a bulb',
                  options: ['It represents a bulb', 'a battery', 'a power source'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' },
                { id: 'b', prompt: 'If you have a battery and a bulb, draw the circuit diagram and explain what happens when the switch symbol is drawn as an open, disconnected line.', answer: 'The switch is "open," meaning the circuit is broken, and the current cannot flow',
                  options: ['The switch is "open," meaning the circuit is broken, and the current cannot flow', 'circuit diagram'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' },
                { id: 'c', prompt: 'Compare a battery symbol to a bulb symbol. How does their structure tell you which one provides energy and which one uses it?', answer: 'The battery symbol (two parallel lines) indicates a difference in potential',
                  options: ['The battery symbol (two parallel lines) indicates a difference in potential', 'circuit diagram'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a "circuit diagram" must look exactly like the physical layout of the desk or table.' }
          ],
            remediations: { 'a-circuit-diagram-must-look': { steps: ['Ask the student to trace the path of the electricity with their finger on the physical circuit.', 'Then, ask them to draw that path on paper using only straight horizontal and vertical lines.', 'Remind them that in a diagram, "how the wire bends" doesn\'t matter, but "what the wire connects" is everything.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_014', difficulty: 'standard',
          question: 'An electrical conductor is a material that allows electric current to flow.',
          hint: 'Review the properties of metals versus non-metals in your science textbook.',
          misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.',
          parts: [
                { id: 'a', prompt: 'Name two materials that are good electrical conductors and two materials that are good electrical insulators.', answer: 'Copper and iron are conductors',
                  options: ['Copper and iron are conductors', 'if an object is hard or solid, it must be a conductor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.' }
          ],
            remediations: { 'if-an-object-is-hard': { steps: ['Perform a simple test: take a battery, a small light bulb, and a piece of wire.', 'Create a loop, then break it and insert a metal nail; observe the bulb light up.', 'Then, replace the nail with a glass rod or plastic ruler and observe the bulb stays dark.', 'Explain that "hardness" does not mean "conducts electricity," and that only specific materials, primarily metals, allow.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.',
          parts: [
                { id: 'a', prompt: 'Imagine you are stranded and need to fix a broken wire in a toy. You have a piece of dry wood, a steel nail, and a thick piece of rubber.', answer: 'You would use the steel nail',
                  options: ['You would use the steel nail', 'if an object is hard or solid, it must be a conductor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is hard or solid, it must be a conductor.' }
          ],
            remediations: { 'if-an-object-is-hard': { steps: ['Perform a simple test: take a battery, a small light bulb, and a piece of wire.', 'Create a loop, then break it and insert a metal nail; observe the bulb light up.', 'Then, replace the nail with a glass rod or plastic ruler and observe the bulb stays dark.', 'Explain that "hardness" does not mean "conducts electricity," and that only specific materials, primarily metals, allow.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_015', difficulty: 'standard',
          question: 'A switch is a mechanical device in an electrical circuit that controls the flow.',
          hint: 'Review the concept of a "Closed Loop" in a circuit.',
          misconception: 'Students often think "Open" means "On" (like opening a door to let people in).',
          parts: [
                { id: 'a', prompt: 'What happens to the flow of electricity when you move a switch to the "OFF" position?', answer: 'The circuit is broken (opened)',
                  options: ['The circuit is broken (opened)', 'it still flows', '"Open" means "On" (like opening a door to let people in)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Open" means "On" (like opening a door to let people in).' },
                { id: 'b', prompt: 'You are drawing a circuit diagram to control a fan. If you want the fan to stay ON, should you draw the switch connection as touching or with a gap?', answer: 'You should draw it touching (closed)',
                  options: ['You should draw it touching (closed)', '"Open" means "On" (like opening a door to let people in)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Open" means "On" (like opening a door to let people in).' }
          ],
            remediations: { 'open-means-on-like-opening': { steps: ['Ask the student to visualize a bridge over a river.', 'Tell them: "If the bridge is \'Open\' for ships to pass, the road for cars is broken—no cars can cross.', 'Similarly, if a switch is \'Open,\' the electrical path is broken and no current can cross." Have them draw a bridge and.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Open" means "On" (like opening a door to let people in).',
          parts: [
                { id: 'a', prompt: 'If a metal piece inside a switch is rusted and cannot touch the contact point, will the device turn on? Why?', answer: 'No, the device will not turn on',
                  options: ['No, the device will not turn on', '"Open" means "On" (like opening a door to let people in)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Open" means "On" (like opening a door to let people in).' }
          ],
            remediations: { 'open-means-on-like-opening': { steps: ['Ask the student to visualize a bridge over a river.', 'Tell them: "If the bridge is \'Open\' for ships to pass, the road for cars is broken—no cars can cross.', 'Similarly, if a switch is \'Open,\' the electrical path is broken and no current can cross." Have them draw a bridge and.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_017', difficulty: 'standard',
          question: 'A series circuit is an electrical arrangement where components are connected.',
          hint: 'Review the basic components of a circuit (battery, wire, switch, bulb).',
          misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first.',
          parts: [
                { id: 'a', prompt: 'In a series circuit with three bulbs, what happens to the other two bulbs if you unscrew one of them?', answer: 'The other two bulbs will immediately go off',
                  options: ['The other two bulbs will immediately go off', 'they stay on', 'gets used up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first bulb is brighter.' }
          ],
            remediations: { 'electricity-gets-used-up-as': { steps: ['First, ask the student to draw a single loop of string representing the wire.', 'Then, ask them to place paper clips at two points on the string to represent bulbs.', 'Tell them to cut the string at one clip and ask, "Can the string still form a circle?" Explain that electricity needs a.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_017', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first.',
          parts: [
                { id: 'a', prompt: 'Is it better to connect house lights in series or in a different way? Why?', answer: 'It is not better to connect house lights in series',
                  options: ['It is not better to connect house lights in series', 'gets used up', 'the first bulb is brighter than the last'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first bulb is brighter.' }
          ],
            remediations: { 'electricity-gets-used-up-as': { steps: ['First, ask the student to draw a single loop of string representing the wire.', 'Then, ask them to place paper clips at two points on the string to represent bulbs.', 'Tell them to cut the string at one clip and ask, "Can the string still form a circle?" Explain that electricity needs a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
