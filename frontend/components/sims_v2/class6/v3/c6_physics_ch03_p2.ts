import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch03_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch03_p2: SimDef = {
    id: 'v3_c6_physics_ch03_p2',
    title: 'Electricity: Circuits and Components',
    subtitle: 'Your first real circuits — make a bulb glow, break it, and learn why.',
    classLevel: 6, subject: 'physics', topic: 'Electricity: Circuits and Components',
    chapters: ['c6_physics_ch03'],
    nodeIds: ['c6_physics_ch03_017', 'c6_physics_ch03_018'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young inventor fixing a torch', intro: 'Your torch went dark at the worst moment. Battery\'s fine, bulb\'s fine — so what part of the loop gave up?', goal: 'Build working circuits from cells, wires and bulbs — and know why a circuit must be a complete loop.' },
    discovery: {
        question: 'A torch has a battery and a working bulb but won\'t light. What\'s the most likely reason?',
        options: ['The circuit isn\'t a complete loop — current needs a path back', 'The battery is always the problem', 'Bulbs need two batteries', 'Torches need sunlight first'],
        answer: 'The circuit isn\'t a complete loop — current needs a path back',
        hook: 'Electricity can\'t travel one way — it needs a circle. Break the circle anywhere and everything stops.',
    },
    teaching: [
        { title: 'Series Circuits: One Path for Current', text: 'A series circuit is an electrical arrangement where components are connected end-to-end, creating one single, continuous path for the electric current to flow.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch03_017', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'On the circuit board: complete the loop to light the bulb — then break it in three different places and predict what happens each time.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch03_017', title: 'Series Circuits: One Path for Current',
          caseStudy: { intro: 'Have you ever noticed a string of small decorative fairy lights where, if one bulb goes out, the whole string stops glowing?',
            decisions: [{ prompt: 'In a series circuit with three bulbs, what happens to the other two bulbs if you unscrew one of them?', options: [
                { text: 'The other two bulbs will immediately go off', outcome: 'The other two bulbs will immediately go off. A student who says "they stay on" fails to realize.' },
                { text: 'they stay on', outcome: 'Not quite — Students often think that electricity "gets used up" as it travels through each bulb, causing them.', reveals: 'electricity-gets-used-up-as' },
                { text: 'gets used up', outcome: 'Not quite — Students often think that electricity "gets used up" as it travels through each bulb, causing them.', reveals: 'electricity-gets-used-up-as' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_017', title: 'Use it in the wild',
          caseStudy: { intro: 'A torch stops working. A student checks: the battery is new, the bulb is fine, but inside the compartment the metal spring has rusted and one battery sits backwards. \'The battery must just be dead,\' he concludes, and reaches for another.',
            decisions: [{ prompt: 'What is actually stopping the torch?', options: [
                { text: 'The circuit is broken in two ways — the rusted spring no longer conducts well and the reversed battery breaks the proper direction of the path. A torch needs a complete loop of conducting material: current must leave one end of the battery, pass through the bulb, and return to the other end. Any gap, insulator or reversed cell interrupts the loop and the light dies.', outcome: 'Checking a circuit means checking the path, not just the parts — a good battery cannot push current through rust, plastic or a wrong-way cell.' },
                { text: 'He is right — when a torch fails, the battery is always to blame, so just swap in another.', outcome: 'A new battery in a broken path changes nothing — the fault here is in the connections, not the power source.', reveals: 'always-blame-battery' },
                { text: 'The bulb is at fault — if the battery and wires are fine, the filament must have burnt out.', outcome: 'The bulb was already checked — the remaining suspects are the conducting path itself: the rusty spring and the reversed battery.', reveals: 'always-blame-bulb' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch03_018', title: 'You made it',
          caseStudy: { intro: 'You just learned the rule every electrician lives by: current only flows in complete loops. Every switch, fuse and plug is a controlled way to open or close one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch03_017', difficulty: 'standard',
          question: 'A series circuit is an electrical arrangement where components are connected.',
          hint: 'Review the basic components of a circuit (battery, wire, switch, bulb).',
          misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first.',
          parts: [
                { id: 'a', prompt: 'In a series circuit with three bulbs, what happens to the other two bulbs if you unscrew one of them?', answer: 'The other two bulbs will immediately go off',
                  options: ['The other two bulbs will immediately go off', 'they stay on', 'gets used up', 'the first bulb is brighter than the last'],
                  hint: 'Review the basic components of a circuit (battery, wire, switch, bulb).',
                  misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first bulb is brighter.' }
          ],
            remediations: { 'electricity-gets-used-up-as': { steps: ['First, ask the student to draw a single loop of string representing the wire.', 'Then, ask them to place paper clips at two points on the string to represent bulbs.', 'Tell them to cut the string at one clip and ask, "Can the string still form a circle?" Explain that electricity needs.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_017', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first.',
          parts: [
                { id: 'a', prompt: 'Is it better to connect house lights in series or in a different way? Why?', answer: 'It is not better to connect house lights in series',
                  options: ['It is not better to connect house lights in series', 'gets used up', 'the first bulb is brighter than the last'],
                  hint: 'Review the basic components of a circuit (battery, wire, switch, bulb).',
                  misconception: 'Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first bulb is brighter.' }
          ],
            remediations: { 'electricity-gets-used-up-as': { steps: ['First, ask the student to draw a single loop of string representing the wire.', 'Then, ask them to place paper clips at two points on the string to represent bulbs.', 'Tell them to cut the string at one clip and ask, "Can the string still form a circle?" Explain that electricity needs.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch03_018', difficulty: 'standard',
          question: 'A parallel circuit is an electrical arrangement where components are connected.',
          hint: 'Review the basic requirement that electricity needs a closed path to flow.',
          misconception: 'Students often confuse parallel circuits with series circuits, believing that current must pass through one bulb.',
          parts: [
                { id: 'a', prompt: 'If you connect two bulbs in parallel to a 9V battery, how much voltage does each bulb receive?', answer: 'Each bulb receives the full 9V',
                  options: ['Each bulb receives the full 9V', 'shared'],
                  hint: 'Review the basic requirement that electricity needs a closed path to flow.',
                  misconception: 'Students often confuse parallel circuits with series circuits, believing that current must pass through one bulb to reach the next.' }
          ],
            remediations: { 'students-often-confuse-parallel-circuits': { steps: ['Ask the student to trace the path from the positive terminal of the battery to the bulb and back to the negative.', 'Have them repeat this for two bulbs side-by-side.', 'Point out that if they trace one path and it never crosses the other bulb\'s path, they have successfully created.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
