import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch07_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch07_p2: SimDef = {
    id: 'v3_c6_physics_ch07_p2',
    title: 'Heat: Conduction, Convection, Radiation · Part 2/2',
    subtitle: 'This node covers the definition and examples of thermal insulators and their role.',
    classLevel: 6, subject: 'physics', topic: 'Heat: Conduction, Convection, Radiation · Part 2/2',
    chapters: ['c6_physics_ch07'],
    nodeIds: ['c6_physics_ch07_025', 'c6_physics_ch07_019'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why the handle of a metal frying pan is often made of plastic or wood instead.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You hold an ice cube and your friend announces that cold is flowing into your hand. What is actually moving — and in which direction?',
        options: ['Heat flows out of your warm hand into the ice — cold is just the absence of heat, not a thing that travels', 'Cold flows from the ice into your hand, exactly as your friend said', 'Nothing moves — the feeling is imaginary', 'Heat and cold swap places and trade spots'],
        answer: 'Heat flows out of your warm hand into the ice — cold is just the absence of heat, not a thing that travels',
        hook: 'Heat is energy that always runs downhill from hot to cold until both match. It moves three ways — through solids by conduction, through air and water by convection, and through empty space by radiation.',
    },
    teaching: [
        { title: 'Insulators: Materials That Block Heat', text: 'An insulator is a material that resists the flow of heat, acting as a barrier to keep heat from moving from one area to another. It essentially blocks or slows down the transfer of thermal energy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch07_025', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Track three heat journeys — a spoon in hot tea, warm air rising off a heater, and sunlight crossing space — and name which mode of transfer each one uses.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch07_025', title: 'Insulators: Materials That Block Heat',
          caseStudy: { intro: 'Have you ever wondered why the handle of a metal frying pan is often made of plastic or wood instead of metal?',
            decisions: [{ prompt: 'What is the primary function of an insulator?', options: [
                { text: 'An insulator is designed to slow down or prevent the flow of heat', outcome: 'An insulator is designed to slow down or prevent the flow of heat.' },
                { text: 'an insulator makes things hotter', outcome: 'Not quite — Students often think insulators "create cold." This is incorrect; insulators do not produce.', reveals: 'insulators-create-cold' },
                { text: 'create cold', outcome: 'Not quite — Students often think insulators "create cold." This is incorrect; insulators do not produce.', reveals: 'insulators-create-cold' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_026', title: 'Applications of Heat Transfer in Daily Life',
          caseStudy: { intro: 'Have you ever wondered why the handle of your frying pan is often made of wood or plastic instead of metal?',
            decisions: [{ prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass.', options: [
                { text: 'The process is radiation', outcome: 'The process is radiation. A wrong answer like "conduction" suggests the student thinks the sun must.' },
                { text: 'conduction', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' },
                { text: 'insulators', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_025', title: 'Use it in the wild',
          caseStudy: { intro: 'Standing a few metres from a bonfire on a cold evening, a student feels her face grow hot even though the air around her stays chilly. \'The hot air must be reaching my face,\' she says — but the wind is blowing sideways, away from her.',
            decisions: [{ prompt: 'How is the heat actually reaching her?', options: [
                { text: 'By radiation — the fire sends heat directly through the air like light rays, no air current needed. Conduction needs touching and convection needs moving warm air, but her face warms across open space with the breeze blowing the wrong way, which is the signature of radiant heat.', outcome: 'The three modes carry heat differently — through solids by conduction, through fluids by convection, and straight through empty air by radiation, which is the bonfire-to-face route.' },
                { text: 'She is right — heat always travels through air, so the wind direction doesn\'t matter.', outcome: 'Moving air is convection — with the wind carrying warmth sideways, the heat reaching her face must be travelling without air, which is radiation.', reveals: 'heat-needs-air' },
                { text: 'Her face warms because the fire is big — distance and wind cannot affect heat.', outcome: 'Fire size affects intensity, not the mode — the interesting fact is that the heat crosses cool air at all, which only radiation explains.', reveals: 'size-beats-mode' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_026', title: 'You made it',
          caseStudy: { intro: 'There is no such thing as a flow of cold. Every chill you feel is heat leaving you for somewhere cooler.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch07_025', difficulty: 'standard',
          question: 'An insulator is a material that resists the flow of heat, acting as a barrier.',
          hint: 'Review the process of heat moving through solid objects (conduction).',
          misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply.',
          parts: [
                { id: 'a', prompt: 'What is the primary function of an insulator?', answer: 'An insulator is designed to slow down or prevent the flow of heat',
                  options: ['An insulator is designed to slow down or prevent the flow of heat', 'an insulator makes things hotter', 'create cold', 'insulators "create cold'],
                  hint: 'Review the process of heat moving through solid objects (conduction).',
                  misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply restrict the transfer.' },
                { id: 'b', prompt: 'You are building a house in a very cold region. Would you prefer walls made of solid iron or walls made of wood and foam? Explain why.', answer: 'You should choose wood and foam',
                  options: ['You should choose wood and foam', 'create cold', 'insulators "create cold'],
                  hint: 'Review the process of heat moving through solid objects (conduction).',
                  misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply restrict the transfer.' },
                { id: 'c', prompt: 'Compare the behavior of a metal spoon and a wooden spoon when left in a bowl of hot soup. How does their material property affect their temperature?', answer: 'The metal spoon will become hot',
                  options: ['The metal spoon will become hot', 'create cold', 'insulators "create cold'],
                  hint: 'Review the process of heat moving through solid objects (conduction).',
                  misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply restrict the transfer.' }
          ],
            remediations: { 'insulators-create-cold': { steps: ['First, clarify that heat is the energy being moved, and cold is just the absence of high heat.', 'Ask the student: "If you take a hot potato and wrap it in a thick towel, does the towel make the potato cold, or does.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_025', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply.',
          parts: [
                { id: 'a', prompt: 'If a person claims that "air is a good conductor of heat," is this true? Defend your position.', answer: 'This claim is false',
                  options: ['This claim is false', 'create cold', 'insulators "create cold'],
                  hint: 'Review the process of heat moving through solid objects (conduction).',
                  misconception: 'Students often think insulators "create cold." This is incorrect; insulators do not produce coldness, they simply restrict the transfer.' }
          ],
            remediations: { 'insulators-create-cold': { steps: ['First, clarify that heat is the energy being moved, and cold is just the absence of high heat.', 'Ask the student: "If you take a hot potato and wrap it in a thick towel, does the towel make the potato cold, or does.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_026', difficulty: 'standard',
          question: 'Heat transfer in daily life refers to the natural movement of thermal energy.',
          hint: 'Review the definitions of conduction (solids), convection (fluids), and radiation.',
          misconception: 'Students often believe that "insulators" create cold or stop heat entirely.',
          parts: [
                { id: 'a', prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass from the sun?', answer: 'The process is radiation',
                  options: ['The process is radiation', 'conduction', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Review the definitions of conduction (solids), convection (fluids), and radiation (light/waves).',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' },
                { id: 'b', prompt: 'A metal spoon is placed in a bowl of hot dal. After one minute, the handle of the spoon becomes hot. Explain the movement of heat in this scenario.', answer: 'The heat moves through the spoon via conduction',
                  options: ['The heat moves through the spoon via conduction', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Review the definitions of conduction (solids), convection (fluids), and radiation (light/waves).',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' }
          ],
            remediations: { 'insulators-create-cold-or-stop': { steps: ['Ask the student: "If you put ice in a woollen mitten, does it melt faster or slower than on a table?" When they answer.', 'Explain that insulators are like "slow-motion" zones for heat transfer.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
