import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch07_p1: SimDef = {
    id: 'v3_c6_physics_ch07_p1',
    title: 'Heat: Conduction, Convection, Radiation · Part 1/2',
    subtitle: 'This node covers the definition of heat as energy and the three modes of transfer.',
    classLevel: 6, subject: 'physics', topic: 'Heat: Conduction, Convection, Radiation · Part 1/2',
    chapters: ['c6_physics_ch07'],
    nodeIds: ['c6_physics_ch07_019', 'c6_physics_ch07_020', 'c6_physics_ch07_021', 'c6_physics_ch07_022', 'c6_physics_ch07_023', 'c6_physics_ch07_024'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed that a metal spoon left in a hot cup of tea becomes hot to touch?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You hold an ice cube and your friend announces that cold is flowing into your hand. What is actually moving — and in which direction?',
        options: ['Heat flows out of your warm hand into the ice — cold is just the absence of heat, not a thing that travels', 'Cold flows from the ice into your hand, exactly as your friend said', 'Nothing moves — the feeling is imaginary', 'Heat and cold swap places and trade spots'],
        answer: 'Heat flows out of your warm hand into the ice — cold is just the absence of heat, not a thing that travels',
        hook: 'Heat is energy that always runs downhill from hot to cold until both match. It moves three ways — through solids by conduction, through air and water by convection, and through empty space by radiation.',
    },
    teaching: [
        { title: 'What is Heat and How It Flows', text: 'Heat is a form of energy that moves from a region or object with a higher temperature to a region or object with a lower temperature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch07_019', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Track three heat journeys — a spoon in hot tea, warm air rising off a heater, and sunlight crossing space — and name which mode of transfer each one uses.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch07_019', title: 'What is Heat and How It Flows',
          caseStudy: { intro: 'Have you ever noticed that a metal spoon left in a hot cup of tea becomes hot to touch?',
            decisions: [{ prompt: 'In which direction does heat always flow between two objects of different temperatures?', options: [
                { text: 'Heat always flows from the hotter object to the cooler object', outcome: 'Heat always flows from the hotter object to the cooler object.' },
                { text: 'cold to hot', outcome: 'Not quite — Students often believe "cold" is a substance that travels, rather than understanding that "cold".', reveals: 'cold-is-a-substance-that' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_020', title: 'Conduction: Heat Through Solids',
          caseStudy: { intro: 'Have you ever noticed how the handle of a metal spoon gets hot when left in a bowl of hot soup?',
            decisions: [{ prompt: 'What is the primary mechanism by which heat moves through a metal rod?', options: [
                { text: 'Heat moves by the direct contact and vibration of neighboring atoms', outcome: 'Heat moves by the direct contact and vibration of neighboring atoms, which pass energy along the.' },
                { text: 'transfer of energy', outcome: 'Not quite — Students often believe that the atoms themselves travel from the hot end to the cold end of the.', reveals: 'the-atoms-themselves-travel-from' },
                { text: 'transfer of matter', outcome: 'Not quite — Students often believe that the atoms themselves travel from the hot end to the cold end of the.', reveals: 'the-atoms-themselves-travel-from' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_021', title: 'Convection: Heat Through Liquids and Gases',
          caseStudy: { intro: 'Have you ever noticed how the water at the top of a pot starts swirling even before it bubbles?',
            decisions: [{ prompt: 'In which states of matter does convection occur?', options: [
                { text: 'Convection occurs in fluids', outcome: 'Convection occurs in fluids, which are liquids and gases. A wrong answer (like "solids") shows the.' },
                { text: 'solids', outcome: 'Not quite — Students often think "heat rises" as a magical property of heat itself, rather than understanding.', reveals: 'heat-rises-as-a-magical' },
                { text: 'heat rises', outcome: 'Not quite — Students often think "heat rises" as a magical property of heat itself, rather than understanding.', reveals: 'heat-rises-as-a-magical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_022', title: 'Radiation: Heat Without a Medium',
          caseStudy: { intro: 'Have you ever felt the warmth of a bonfire on your face even though you aren\'t touching the fire or standing in the rising smoke?',
            decisions: [{ prompt: 'What makes radiation different from conduction and convection?', options: [
                { text: 'Radiation does not require a medium (like solid, liquid, or gas) to travel, while', outcome: 'Radiation does not require a medium (like solid, liquid, or gas) to travel, while conduction and.' },
                { text: 'radiation only happens in space', outcome: 'Not quite — Students often think radiation only happens in space. They struggle to realize that radiation.', reveals: 'radiation-only-happens-in-space' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_023', title: 'The Water Cycle and Heat Transfer',
          caseStudy: { intro: 'Have you ever wondered how a puddle disappears on a sunny day, or how rain clouds form high up in the sky?',
            decisions: [{ prompt: 'What is the primary source of energy that drives the entire water cycle?', options: [
                { text: 'The Sun', outcome: 'The Sun. A wrong answer here suggests the student does not understand that the water cycle requires.' },
                { text: 'disappears', outcome: 'Not quite — Students often believe that water "disappears" or vanishes into thin air during evaporation, rather.', reveals: 'water-disappears-or-vanishes-into' },
                { text: 'holding', outcome: 'Not quite — Students often believe that water "disappears" or vanishes into thin air during evaporation, rather.', reveals: 'water-disappears-or-vanishes-into' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_024', title: 'Heat vs Temperature: Understanding the Difference',
          caseStudy: { intro: 'Have you ever wondered why a small cup of tea feels hot enough to burn your tongue, but a giant swimming pool of warm water feels comfortable, even though the.',
            decisions: [{ prompt: 'What is the primary device used to measure the temperature of an object?', options: [
                { text: 'A thermometer', outcome: 'A thermometer. Answering "a calorimeter" or "a heater" suggests a confusion between devices that.' },
                { text: 'a calorimeter', outcome: 'Not quite — Students often confuse temperature with heat because they assume "higher temperature" always equals.', reveals: 'students-often-confuse-temperature-with' },
                { text: 'a heater', outcome: 'Not quite — Students often confuse temperature with heat because they assume "higher temperature" always equals.', reveals: 'students-often-confuse-temperature-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_019', title: 'Use it in the wild',
          caseStudy: { intro: 'Standing a few metres from a bonfire on a cold evening, a student feels her face grow hot even though the air around her stays chilly. \'The hot air must be reaching my face,\' she says — but the wind is blowing sideways, away from her.',
            decisions: [{ prompt: 'How is the heat actually reaching her?', options: [
                { text: 'By radiation — the fire sends heat directly through the air like light rays, no air current needed. Conduction needs touching and convection needs moving warm air, but her face warms across open space with the breeze blowing the wrong way, which is the signature of radiant heat.', outcome: 'The three modes carry heat differently — through solids by conduction, through fluids by convection, and straight through empty air by radiation, which is the bonfire-to-face route.' },
                { text: 'She is right — heat always travels through air, so the wind direction doesn\'t matter.', outcome: 'Moving air is convection — with the wind carrying warmth sideways, the heat reaching her face must be travelling without air, which is radiation.', reveals: 'heat-needs-air' },
                { text: 'Her face warms because the fire is big — distance and wind cannot affect heat.', outcome: 'Fire size affects intensity, not the mode — the interesting fact is that the heat crosses cool air at all, which only radiation explains.', reveals: 'size-beats-mode' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_024', title: 'The bigger picture',
          caseStudy: { intro: 'There is no such thing as a flow of cold. Every chill you feel is heat leaving you for somewhere cooler.',
            decisions: [{ prompt: 'What comes next? Heat: Conduction, Convection, Radiation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Heat: Conduction, Convection, Radiation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch07_019', difficulty: 'standard',
          question: 'Heat is a form of energy that moves from a region or object with a higher.',
          hint: 'Review the section on "Temperature" in Chapter 7 to understand how we measure the degree.',
          misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state.',
          parts: [
                { id: 'a', prompt: 'In which direction does heat always flow between two objects of different temperatures?', answer: 'Heat always flows from the hotter object to the cooler object',
                  options: ['Heat always flows from the hotter object to the cooler object', 'cold to hot'],
                  hint: 'Review the section on "Temperature" in Chapter 7 to understand how we measure the degree of hotness.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' },
                { id: 'b', prompt: 'If you hold an ice cube in your hand, why does your hand feel cold?', answer: 'Your hand feels cold',
                  options: ['Your hand feels cold', 'the cold moves into my hand'],
                  hint: 'Review the section on "Temperature" in Chapter 7 to understand how we measure the degree of hotness.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' },
                { id: 'c', prompt: 'A metal rod is held over a candle flame. After a few minutes, the other end becomes hot. What is this mode of heat transfer called?', answer: 'This is called conduction',
                  options: ['This is called conduction', 'convection'],
                  hint: 'Review the section on "Temperature" in Chapter 7 to understand how we measure the degree of hotness.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' }
          ],
            remediations: { 'cold-is-a-substance-that': { steps: ['Ask the student to define what "heat" is (energy) and what "cold" is (a lack of energy).', 'Use the analogy of a bank account: if you have 100 rupees and your friend has 0, money moves from you to them; you.', 'Re-examine the ice cube example: emphasize that the ice cube is gaining energy (melting) while the hand is losing.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_020', difficulty: 'standard',
          question: 'Conduction is the process of heat transfer through a solid material caused.',
          hint: 'Review the basic particle model of solids.',
          misconception: 'Students often believe that the atoms themselves travel from the hot end to the cold end of the rod.',
          parts: [
                { id: 'a', prompt: 'What is the primary mechanism by which heat moves through a metal rod?', answer: 'Heat moves by the direct contact and vibration of neighboring atoms',
                  options: ['Heat moves by the direct contact and vibration of neighboring atoms', 'transfer of energy', 'transfer of matter', 'the atoms themselves travel from the hot end to the cold end of the rod'],
                  hint: 'Review the basic particle model of solids.',
                  misconception: 'Students often believe that the atoms themselves travel from the hot end to the cold end of the rod.' },
                { id: 'b', prompt: 'If you hold a plastic ruler over a candle, why does the end in your hand stay cool longer than the end of a metal spoon would?', answer: 'Plastic is a poor conductor, meaning its atoms do not pass the vibration energy',
                  options: ['Plastic is a poor conductor, meaning its atoms do not pass the vibration energy', 'plastic doesn\'t have heat', 'transfer of energy', 'transfer of matter'],
                  hint: 'Review the basic particle model of solids.',
                  misconception: 'Students often believe that the atoms themselves travel from the hot end to the cold end of the rod.' }
          ],
            remediations: { 'the-atoms-themselves-travel-from': { steps: ['Ask the student to stand in a line with friends.', 'Tell them to pass a ball down the line without moving their feet.', 'Explain that the ball is like the "heat energy" and their stationary bodies are the "atoms" in a solid.', 'Emphasize that the energy moves, but the atoms (the students) do not change their spot.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_020', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the atoms themselves travel from the hot end to the cold end of the rod.',
          parts: [
                { id: 'a', prompt: 'If you were to design a handle for a frying pan, would you choose metal or wood? Justify your answer using the concept of conduction.', answer: 'You should choose wood',
                  options: ['You should choose wood', 'transfer of energy', 'transfer of matter', 'the atoms themselves travel from the hot end to the cold end of the rod'],
                  hint: 'Review the basic particle model of solids.',
                  misconception: 'Students often believe that the atoms themselves travel from the hot end to the cold end of the rod.' }
          ],
            remediations: { 'the-atoms-themselves-travel-from': { steps: ['Ask the student to stand in a line with friends.', 'Tell them to pass a ball down the line without moving their feet.', 'Explain that the ball is like the "heat energy" and their stationary bodies are the "atoms" in a solid.', 'Emphasize that the energy moves, but the atoms (the students) do not change their spot.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_021', difficulty: 'standard',
          question: 'Convection is the process of heat transfer in liquids and gases where the.',
          hint: 'Review the concept of density; revisit why objects float or sink in water.',
          misconception: 'Students often think "heat rises" as a magical property of heat itself, rather than understanding that the *fluid*.',
          parts: [
                { id: 'a', prompt: 'In which states of matter does convection occur?', answer: 'Convection occurs in fluids',
                  options: ['Convection occurs in fluids', 'solids', 'heat rises'],
                  hint: 'Review the concept of density; revisit why objects float or sink in water.',
                  misconception: 'Students often think "heat rises" as a magical property of heat itself, rather than understanding that the *fluid* moves because of density.' },
                { id: 'b', prompt: 'When water is heated in a beaker, why does the hot water rise to the top?', answer: 'The hot water rises',
                  options: ['The hot water rises', 'it rises because heat is light', 'heat rises'],
                  hint: 'Review the concept of density; revisit why objects float or sink in water.',
                  misconception: 'Students often think "heat rises" as a magical property of heat itself, rather than understanding that the *fluid* moves because of density.' }
          ],
            remediations: { 'heat-rises-as-a-magical': { steps: ['Ask the student to visualize the fluid as a crowd in a room: when one area gets too crowded (dense), people move to.', 'Explain that "hot" fluid is like the crowd spreading out to take up more space, which forces the "cold" (more compact).', 'Use the analogy of a balloon rising in air to explain how lower density causes movement.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_022', difficulty: 'standard',
          question: 'Radiation is the process by which heat energy travels through space in the form.',
          hint: 'Review the basic particle model of matter (solids vs. fluids).',
          misconception: 'Students often think radiation only happens in space. They struggle to realize that radiation is happening all around.',
          parts: [
                { id: 'a', prompt: 'Why are the insides of some modern solar water heaters painted black?', answer: 'Dark and rough surfaces are excellent absorbers of radiation',
                  options: ['Dark and rough surfaces are excellent absorbers of radiation', 'radiation only happens in space'],
                  hint: 'Review the basic particle model of matter (solids vs. fluids).',
                  misconception: 'Students often think radiation only happens in space. They struggle to realize that radiation is happening all around them, including from.' }
          ],
            remediations: { 'radiation-only-happens-in-space': { steps: ['Ask the student to touch a cold metal table and then sit near a lamp.', 'Explain that the table warmth is conduction, but the lamp warmth is radiation.', 'Clarify that radiation happens everywhere, not just in the "void" of space.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_023', difficulty: 'standard',
          question: 'The water cycle is the continuous movement of water on Earth through the.',
          hint: 'Review the definitions of radiation and convection from Chapter 7.',
          misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state.',
          parts: [
                { id: 'a', prompt: 'What is the primary source of energy that drives the entire water cycle?', answer: 'The Sun',
                  options: ['The Sun', 'disappears', 'holding'],
                  hint: 'Review the definitions of radiation and convection from Chapter 7.',
                  misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state into an invisible.' },
                { id: 'b', prompt: 'If you place a bowl of water in the shade versus in direct sunlight, which will evaporate faster? Why?', answer: 'The bowl in direct sunlight will evaporate faster',
                  options: ['The bowl in direct sunlight will evaporate faster', 'disappears', 'holding'],
                  hint: 'Review the definitions of radiation and convection from Chapter 7.',
                  misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state into an invisible.' }
          ],
            remediations: { 'water-disappears-or-vanishes-into': { steps: ['Ask the student to place a lid on a pot of boiling water and observe the droplets on the underside.', 'Explain that the steam is the water vapour, and when it hits the cooler lid, it turns back into liquid water, proving.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_024', difficulty: 'standard',
          question: 'Heat is a form of energy related to the total motion of molecules in.',
          hint: 'Review the concept that all matter is made of tiny, moving particles.',
          misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They.',
          parts: [
                { id: 'a', prompt: 'What is the primary device used to measure the temperature of an object?', answer: 'A thermometer',
                  options: ['A thermometer', 'a calorimeter', 'a heater', 'higher temperature'],
                  hint: 'Review the concept that all matter is made of tiny, moving particles.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' },
                { id: 'b', prompt: 'If you have a cup of hot coffee and a giant lake, both at 60°C, which one has more heat? Why?', answer: 'The lake has more heat',
                  options: ['The lake has more heat', 'the cup', 'temperature', 'higher temperature'],
                  hint: 'Review the concept that all matter is made of tiny, moving particles.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' },
                { id: 'c', prompt: 'If you touch a metal spoon that has been sitting in a bowl of hot soup, the spoon gets hot. What is actually moving from the soup into the spoon?', answer: 'Heat (energy) is moving into the spoon',
                  options: ['Heat (energy) is moving into the spoon', 'higher temperature', 'more heat', '"higher temperature" always equals "more heat'],
                  hint: 'Review the concept that all matter is made of tiny, moving particles.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' },
                { id: 'd', prompt: 'Two containers of water are at 40°C. If you combine them into one larger container, does the temperature change? Does the heat change?', answer: 'The temperature remains 40°C, but the total heat doubles',
                  options: ['The temperature remains 40°C, but the total heat doubles', 'higher temperature', 'more heat', '"higher temperature" always equals "more heat'],
                  hint: 'Review the concept that all matter is made of tiny, moving particles.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' }
          ],
            remediations: { 'students-often-confuse-temperature-with': { steps: ['Ask the student to draw a diagram with two boxes: one with 2 dots and one with 20 dots.', 'Assign each dot a "speed" (energy value) of 5.', 'Ask them to calculate the "average" (temperature) and the "total" (heat) for both boxes.', 'They will see that while the average is the same (5), the total is vastly different (10 vs 100), clarifying that.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
