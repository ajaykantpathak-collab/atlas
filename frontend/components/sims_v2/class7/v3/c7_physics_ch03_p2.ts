import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch03_p2: SimDef = {
    id: 'v3_c7_physics_ch03_p2',
    title: 'Heat Transfer in Nature · Part 2/2',
    subtitle: 'Covers the comparison of conditions, media, and mechanisms for conduction, convection.',
    classLevel: 7, subject: 'physics', topic: 'Heat Transfer in Nature · Part 2/2',
    chapters: ['c7_physics_ch03'],
    nodeIds: ['c7_physics_ch03_007', 'c7_physics_ch03_008', 'c7_physics_ch03_009', 'c7_physics_ch03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine standing near a bonfire on a chilly winter evening in North India.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Which holds more heat — a tiny cup of boiling tea or a whole swimming pool of lukewarm water? Most people pick the cup and get it wrong.',
        options: ['The pool — it holds far more water, so its total heat energy dwarfs the cup despite the lower temperature', 'The cup — higher temperature always means more heat', 'Neither — heat and temperature are the same thing', 'They are equal — water is water'],
        answer: 'The pool — it holds far more water, so its total heat energy dwarfs the cup despite the lower temperature',
        hook: 'Temperature measures how fast particles move — the degree of hotness — while heat is the total energy on the move. Heat always flows from higher temperature to lower until both sides balance.',
    },
    teaching: [
        { title: 'Comparing Conduction, Convection and Radiation', text: 'Comparing conduction, convection, and radiation involves analyzing how thermal energy moves through solids, fluids (liquids and gases), and empty space (vacuum) based on the requirement of a material.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch03_007', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Mix one litre of boiling water with one litre of cool tap water, then imagine five litres boiling instead — predict which mix ends hotter and defend it using total heat, not just temperature.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch03_008', title: 'Water Cycle and Heat Transfer',
          caseStudy: { intro: 'Imagine putting a wet plate out in the hot afternoon sun in your courtyard; within an hour, the water disappears because solar radiation heats the water.',
            decisions: [{ prompt: 'Which method of heat transfer is primarily responsible for the Sun heating the Earth\'s oceans to start the water cycle?', options: [
                { text: 'Radiation is responsible for transferring heat from the Sun through the vacuum of space', outcome: 'Radiation is responsible for transferring heat from the Sun through the vacuum of space to the.' },
                { text: 'conduction', outcome: 'Not quite — Students often believe that clouds are filled with hot steam or gas because they see "rising.', reveals: 'clouds-are-filled-with-hot' },
                { text: 'convection', outcome: 'Not quite — Students often believe that clouds are filled with hot steam or gas because they see "rising.', reveals: 'clouds-are-filled-with-hot' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_009', title: 'Seepage of Water Beneath the Ground',
          scaffold: { problem: 'In a school geography experiment in Jaipur, $300\\text{ mL}$ of water is poured into a cylindrical container of cross-sectional area.',
            steps: [
            { text: 'Identify given quantities with units: Volume $V = 300\\text{ mL}$, Area $A = 0.02\\text{ m}^2$, Time $t = 150\\text{ s}$.' },
            { text: 'Convert volume from milliliters to cubic meters: $1\\text{ L} = 1000\\text{ mL}$ and $1\\text{ m}^3 = 1000\\text{ L}$,.' },
            { text: 'Identify the infiltration formula: $v = \\frac{V}{A \\times t}$.' },
            { text: 'Substitute the values with units into the formula: $v = \\frac{0.0003\\text{ m}^3}{0.02\\text{ m}^2 \\times 150\\text{ s}}$.' },
            { text: 'Compute the denominator and divide: Denominator $= 0.02 \\times 150 = 3.0\\text{ m}^2\\cdot\\text{s}$.', faded: true, blankAnswer: '$0.0001\\text{ m/s}$ (or $1 \\times 10^{-4}\\text{ m/s}$)' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch03_010', title: 'Applications of Heat Transfer in Everyday Life',
          caseStudy: { intro: 'Observe how a pressure cooker is made: its metal body gets hot quickly by conduction to cook food fast, while its handle is made of plastic or ebonite, which.',
            decisions: [{ prompt: 'Which method of heat transfer is primarily responsible for the handle of a metal frying pan staying relatively cool or being made.', options: [
                { text: 'Conduction', outcome: 'Conduction. The metal pan body conducts heat efficiently from the stove to the food, but a bad.' },
                { text: 'radiation', outcome: 'Not quite — Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our.', reveals: 'materials-like-woolen-sweaters-or' },
                { text: 'produce', outcome: 'Not quite — Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our.', reveals: 'materials-like-woolen-sweaters-or' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school picnic, Gopi warns everyone: \'Don\'t stand near that big tub of warm bath water — the tiny steel glass of boiling tea in my hand has way more heat, so it\'s harmless compared to the tub.\'',
            decisions: [{ prompt: 'Has he got heat and temperature straight?', options: [
                { text: 'No — the tea has the higher temperature (faster average particle motion, so it scalds on contact), but the huge tub holds vastly more water molecules and therefore far more total thermal energy; temperature is hotness, heat is total energy — they are different quantities.', outcome: 'This keeps the two concepts separate: temperature decides burn intensity and the direction of heat flow, while total heat depends on mass as well.' },
                { text: 'He is right — whatever is hotter contains more heat, so the cup outweighs the tub in heat.', outcome: 'Heat content scales with the number of particles; a lukewarm swimming pool stores far more joules than a boiling cup.', reveals: 'temperature-is-heat' },
                { text: 'He is half right — the tub has more heat, so it must also be at a higher temperature than the tea.', outcome: 'More total energy does not mean higher temperature; the tub\'s energy is spread over far more particles, so each particle moves slower than in the tea.', reveals: 'more-heat-hotter' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch03_010', title: 'You made it',
          caseStudy: { intro: 'A spark can be hotter than a bonfire and still hold less heat. Temperature is the intensity; heat is the crowd.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch03_007', difficulty: 'standard',
          question: 'Comparing conduction, convection, and radiation involves analyzing how thermal.',
          hint: 'Review nodes c7_physics_ch03_002, c7_physics_ch03_004, and c7_physics_ch03_006.',
          misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via.',
          parts: [
                { id: 'a', prompt: 'Compare how heat reaches the upper layers of water in a vessel when heated from the bottom versus how heat reaches the bottom if heated from the top.', answer: 'When heated from the bottom, hot water at the base becomes less dense and rises',
                  options: ['When heated from the bottom, hot water at the base becomes less dense and rises', 'convection currents can push heat downward against buoyancy forces'],
                  hint: 'Review nodes c7_physics_ch03_002, c7_physics_ch03_004, and c7_physics_ch03_006 to reinforce.',
                  misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via convection.' }
          ],
            remediations: { 'heat-transfer-methods-occur-in': { steps: ['To fix this, guide the student through a structured comparison chart exercise: 1.', 'Ask them to list the three modes and write down the medium required for each (Solid only, Fluid only, None/Vacuum).', 'Have them test a candle flame: feel the heat sideways/upwards (radiation and convection), hold a wire in.', 'Emphasize that radiation does not need the air to travel, even though air is present.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_008', difficulty: 'standard',
          question: 'The water cycle is the continuous movement of water on, above, and below the.',
          hint: 'Review c7_physics_ch03_004 for convection currents and c7_physics_ch03_006 for how.',
          misconception: 'Students often believe that clouds are filled with hot steam or gas because they see "rising vapor," leading them.',
          parts: [
                { id: 'a', prompt: 'Why does warm water vapor rise into the upper atmosphere after evaporating from the sea?', answer: 'Warm water vapor rises',
                  options: ['Warm water vapor rises', 'light things always float upward without any force or heat', 'rising vapor', 'clouds float entirely due to high temperature'],
                  hint: 'Review c7_physics_ch03_004 for convection currents and c7_physics_ch03_006 for how radiant energy.',
                  misconception: 'Students often believe that clouds are filled with hot steam or gas because they see "rising vapor," leading them to think clouds float.' }
          ],
            remediations: { 'clouds-are-filled-with-hot': { steps: ['To fix this, take a lid off a boiling pot of water or observe steam coming off hot tea: notice how the steam.', 'Explain that what we see as clouds are tiny liquid droplets formed after cooling, not hot gas.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that clouds are filled with hot steam or gas because they see "rising vapor," leading them.',
          parts: [
                { id: 'a', prompt: 'A student claims that clouds float in the sky because they are made of gas that is naturally lighter than air.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'rising vapor', 'clouds float entirely due to high temperature'],
                  hint: 'Review c7_physics_ch03_004 for convection currents and c7_physics_ch03_006 for how radiant energy.',
                  misconception: 'Students often believe that clouds are filled with hot steam or gas because they see "rising vapor," leading them to think clouds float.' }
          ],
            remediations: { 'clouds-are-filled-with-hot': { steps: ['To fix this, take a lid off a boiling pot of water or observe steam coming off hot tea: notice how the steam.', 'Explain that what we see as clouds are tiny liquid droplets formed after cooling, not hot gas.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_009', difficulty: 'standard',
          question: 'The seepage of water beneath the ground refers to the process by which.',
          hint: 'Review the properties of liquids and convection currents in fluids before examining.',
          misconception: 'Students often think that underground water is stored in vast underground lakes or flowing subterranean rivers like.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical force responsible for the downward seepage of water through soil layers?', answer: 'Gravity is the primary force pulling water downward through soil spaces',
                  options: ['Gravity is the primary force pulling water downward through soil spaces', 'wind pressure'],
                  hint: 'Review the properties of liquids and convection currents in fluids before examining downward.',
                  misconception: 'Students often think that underground water is stored in vast underground lakes or flowing subterranean rivers like surface rivers.' }
          ],
            remediations: { 'underground-water-is-stored-in': { steps: ['To correct this misconception, take a dry kitchen sponge and slowly pour water over it, observing how the water fills.', 'Explain that underground soil and rock act exactly like this sponge, holding water in microscopic spaces rather than.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_010', difficulty: 'standard',
          question: 'Applications of heat transfer involve using the principles of conduction.',
          hint: 'Review c7_physics_ch03_007 to reinforce how conduction, convection, and radiation operate.',
          misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.',
          parts: [
                { id: 'a', prompt: 'Which method of heat transfer is primarily responsible for the handle of a metal frying pan staying relatively cool or being made of insulating plastic?', answer: 'Conduction',
                  options: ['Conduction', 'radiation', 'produce'],
                  hint: 'Review c7_physics_ch03_007 to reinforce how conduction, convection, and radiation operate.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' },
                { id: 'b', prompt: 'Explain why chimneys in factories and traditional kitchens are built very tall and placed high up near the roof.', answer: 'Chimneys are placed high up',
                  options: ['Chimneys are placed high up', 'produce'],
                  hint: 'Review c7_physics_ch03_007 to reinforce how conduction, convection, and radiation operate.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' },
                { id: 'c', prompt: 'Compare the effectiveness of a white-painted corrugated metal roof versus a black-painted corrugated metal roof on a house in a hot Indian summer.', answer: 'The white-painted roof keeps the rooms cooler',
                  options: ['The white-painted roof keeps the rooms cooler', 'produce', 'dark colors repel heat'],
                  hint: 'Review c7_physics_ch03_007 to reinforce how conduction, convection, and radiation operate.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' }
          ],
            remediations: { 'materials-like-woolen-sweaters-or': { steps: ['To correct this, have the student touch a woolen blanket and a piece of iron kept in the same room.', 'Explain that both feel at room temperature because neither produces heat, but the iron feels colder because it conducts.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
