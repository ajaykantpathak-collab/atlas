import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch03_p1: SimDef = {
    id: 'v3_c7_physics_ch03_p1',
    title: 'Heat Transfer in Nature · Part 1/2',
    subtitle: 'Covers the foundational definitions of heat and temperature, the distinction between.',
    classLevel: 7, subject: 'physics', topic: 'Heat Transfer in Nature · Part 1/2',
    chapters: ['c7_physics_ch03'],
    nodeIds: ['c7_physics_ch03_001', 'c7_physics_ch03_002', 'c7_physics_ch03_003', 'c7_physics_ch03_004', 'c7_physics_ch03_005', 'c7_physics_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Observe how a large bucket of warm bathwater feels warm, just like a small cup of hot tea, even though the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Which holds more heat — a tiny cup of boiling tea or a whole swimming pool of lukewarm water? Most people pick the cup and get it wrong.',
        options: ['The pool — it holds far more water, so its total heat energy dwarfs the cup despite the lower temperature', 'The cup — higher temperature always means more heat', 'Neither — heat and temperature are the same thing', 'They are equal — water is water'],
        answer: 'The pool — it holds far more water, so its total heat energy dwarfs the cup despite the lower temperature',
        hook: 'Temperature measures how fast particles move — the degree of hotness — while heat is the total energy on the move. Heat always flows from higher temperature to lower until both sides balance.',
    },
    teaching: [
        { title: 'Heat and Temperature: Introduction', text: 'Heat is a form of energy that transfers from a region of higher temperature to a region of lower temperature, measured in joules (J), while temperature is a measure of the average kinetic energy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch03_001', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Mix one litre of boiling water with one litre of cool tap water, then imagine five litres boiling instead — predict which mix ends hotter and defend it using total heat, not just temperature.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_001', title: 'Heat and Temperature: Introduction',
          scaffold: { problem: 'A vessel containing water in a school laboratory absorbs 4200 Joules of heat energy.',
            steps: [
            { text: 'Identify given values: $Q = 4200 \\text{ J}$, mass $m = 0.5 \\text{ kg}$, specific heat capacity $c = 4200 \\text{.' },
            { text: 'State the formula linking these variables: $Q = m \\times c \\times \\Delta T$, which rearranges to $\\Delta T = \\frac{Q}{m.' },
            { text: 'Substitute the given values with units into the rearranged formula: $\\Delta T = \\frac{4200 \\text{ J}}{0.5 \\text{ kg}.' },
            { text: 'Compute the denominator: $0.5 \\times 4200 = 2100 \\text{ J/°C}$, then divide numerator by denominator.' },
            { text: 'Verify the final answer is physically reasonable: a temperature rise of 2°C for a moderate water sample absorbing.', faded: true, blankAnswer: '2 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_002', title: 'Conduction of Heat: Transfer Through Solids',
          scaffold: { problem: 'In a school laboratory experiment in Delhi, a brass rod transfers heat at a constant rate of 30 Joules per second.',
            steps: [
            { text: 'Identify given values: rate of heat transfer $P = 30\\text{ J/s}$, time $t = 2\\text{ minutes}$.' },
            { text: 'Convert time into SI units (seconds): $t = 2 \\times 60\\text{ s} = 120\\text{ s}$.' },
            { text: 'Identify the correct formula linking heat, rate of heat transfer, and time: $Q = P \\times t$.' },
            { text: 'Substitute values into the equation: $Q = 30\\text{ J/s} \\times 120\\text{ s}$.' },
            { text: 'Compute the final value and cancel units: $Q = 3600\\text{ J}$ (Joules).', faded: true, blankAnswer: '3600 J' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch03_003', title: 'Good and Bad Conductors of Heat: Examples',
          caseStudy: { intro: 'Imagine touching a steel spoon and a wooden spoon that have both been sitting inside a hot vessel of dal on your kitchen stove in India.',
            decisions: [{ prompt: 'Which of the following common kitchen items is classified as a good conductor of heat?', options: [
                { text: 'C', outcome: 'The correct answer is C. Stainless steel is a metal alloy, and metals are good conductors of heat.' },
                { text: 'produce', outcome: 'Not quite — Students often think that bad conductors (insulators) actually "produce" cold or actively block.', reveals: 'bad-conductors-insulators-actually-produce' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch03_005', title: 'Land and Sea Breeze: Convection in Nature',
          caseStudy: { intro: 'Imagine standing on a beach in Goa during a hot sunny afternoon, feeling a cool wind blowing from the sea toward your face.',
            decisions: [{ prompt: 'What is the primary physical process responsible for the formation of land and sea breezes?', options: [
                { text: 'The primary process is convection', outcome: 'The primary process is convection. A wrong answer like "conduction" or "radiation" reveals.' },
                { text: 'conduction', outcome: 'Not quite — Students frequently believe that water is inherently cold and land is inherently hot, thinking that.', reveals: 'students-frequently-believe-that-water' },
                { text: 'radiation', outcome: 'Not quite — Students frequently believe that water is inherently cold and land is inherently hot, thinking that.', reveals: 'students-frequently-believe-that-water' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school picnic, Gopi warns everyone: \'Don\'t stand near that big tub of warm bath water — the tiny steel glass of boiling tea in my hand has way more heat, so it\'s harmless compared to the tub.\'',
            decisions: [{ prompt: 'Has he got heat and temperature straight?', options: [
                { text: 'No — the tea has the higher temperature (faster average particle motion, so it scalds on contact), but the huge tub holds vastly more water molecules and therefore far more total thermal energy; temperature is hotness, heat is total energy — they are different quantities.', outcome: 'This keeps the two concepts separate: temperature decides burn intensity and the direction of heat flow, while total heat depends on mass as well.' },
                { text: 'He is right — whatever is hotter contains more heat, so the cup outweighs the tub in heat.', outcome: 'Heat content scales with the number of particles; a lukewarm swimming pool stores far more joules than a boiling cup.', reveals: 'temperature-is-heat' },
                { text: 'He is half right — the tub has more heat, so it must also be at a higher temperature than the tea.', outcome: 'More total energy does not mean higher temperature; the tub\'s energy is spread over far more particles, so each particle moves slower than in the tea.', reveals: 'more-heat-hotter' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'A spark can be hotter than a bonfire and still hold less heat. Temperature is the intensity; heat is the crowd.',
            decisions: [{ prompt: 'What comes next? Heat Transfer in Nature · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Heat Transfer in Nature · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch03_001', difficulty: 'standard',
          question: 'Heat is a form of energy that transfers from a region of higher temperature.',
          hint: 'Review Class 6 concepts on how heat flows and the basic difference between temperature.',
          misconception: 'Students often think that a larger object always has a higher temperature than a smaller object if both are exposed.',
          parts: [
                { id: 'a', prompt: 'Two identical iron blocks, Block A at 80°C and Block B at 40°C, are placed in contact.', answer: 'Heat flows from Block A to Block B',
                  options: ['Heat flows from Block A to Block B', 'temperature', '"temperature" and "heat" are the exact same physical quantity'],
                  hint: 'Review Class 6 concepts on how heat flows and the basic difference between temperature scales and.',
                  misconception: 'Students often think that a larger object always has a higher temperature than a smaller object if both are exposed to the same sun,.' },
                { id: 'b', prompt: 'A metallic rod of mass 2 kg is heated until its temperature increases by 25°C.', answer: 'Given: Heat energy ($Q$) = 2200 J, Temperature change ($\\Delta T$) = 25°C',
                  options: ['Given: Heat energy ($Q$) = 2200 J, Temperature change ($\\Delta T$) = 25°C', 'temperature', '"temperature" and "heat" are the exact same physical quantity'],
                  hint: 'Review Class 6 concepts on how heat flows and the basic difference between temperature scales and.',
                  misconception: 'Students often think that a larger object always has a higher temperature than a smaller object if both are exposed to the same sun,.' }
          ],
            remediations: { 'a-larger-object-always-has': { steps: ['To fix this, have the student perform a simple tactile comparison: take a large bucket of tap water and a small cup.', 'Explain that both have the exact same temperature, but the bucket contains vastly more water molecules and thus more.', 'Emphasize that temperature tells us *how hot* something feels (average speed of particles), while heat tells us *how.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a larger object always has a higher temperature than a smaller object if both are exposed.',
          parts: [
                { id: 'a', prompt: 'A student claims that a large swimming pool of lukewarm water contains less heat than a boiling cup of tea because the cup of tea has a higher temperature.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'temperature', '"temperature" and "heat" are the exact same physical quantity'],
                  hint: 'Review Class 6 concepts on how heat flows and the basic difference between temperature scales and.',
                  misconception: 'Students often think that a larger object always has a higher temperature than a smaller object if both are exposed to the same sun,.' }
          ],
            remediations: { 'a-larger-object-always-has': { steps: ['To fix this, have the student perform a simple tactile comparison: take a large bucket of tap water and a small cup.', 'Explain that both have the exact same temperature, but the bucket contains vastly more water molecules and thus more.', 'Emphasize that temperature tells us *how hot* something feels (average speed of particles), while heat tells us *how.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_002', difficulty: 'standard',
          question: 'Conduction is the process of heat transfer through solid materials from.',
          hint: 'Review c6_physics_ch07_020 to reinforce the basics of particle vibration and heat.',
          misconception: 'Students often believe that heat travels through solids because the atoms themselves physically travel from the hot end.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conduction is the process of heat transfer through solid materials from particle to',
                  options: ['Conduction is the process of heat transfer through solid materials from particle to', 'Heat is a form of energy that transfers from a region of higher temperature to a region', 'Good and bad conductors of heat are classifications of materials based on how easily', 'Convection is the transfer of heat energy through the actual movement of fluid particles'],
                  hint: 'Review c6_physics_ch07_020 to reinforce the basics of particle vibration and heat transfer through.',
                  misconception: 'Students often believe that heat travels through solids because the atoms themselves physically travel from the hot end to the cold end.' }
          ],
            remediations: { 'heat-travels-through-solids-because': { steps: ['To fix this, use the analogy of a line of people passing a bucket of water (or playing a vibration game where students.', 'Emphasize that the individual students (atoms) stay in their places while only the energy or message travels down the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_003', difficulty: 'standard',
          question: 'Good and bad conductors of heat are classifications of materials based on how.',
          hint: 'Review c6_physics_ch07_025 to re-examine how insulators prevent heat transfer before.',
          misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering.',
          parts: [
                { id: 'a', prompt: 'Which of the following common kitchen items is classified as a good conductor of heat?', answer: 'Stainless steel frying pan',
                  options: ['Stainless steel frying pan', 'produce'],
                  hint: 'Review c6_physics_ch07_025 to re-examine how insulators prevent heat transfer before attempting.',
                  misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering, rather than simply.' }
          ],
            remediations: { 'bad-conductors-insulators-actually-produce': { steps: ['To correct this, guide the student to measure the temperature of a woollen blanket and a metal chair inside.', 'Explain that the metal chair feels colder because it is a good conductor that rapidly draws heat away from your warm.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_004', difficulty: 'standard',
          question: 'Convection is the transfer of heat energy through the actual movement of fluid.',
          hint: 'Review density differences and particle spacing in fluids from earlier chapters before.',
          misconception: 'Students often believe that heat rises on its own as an invisible substance, rather than understanding that the *heated.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Convection is the transfer of heat energy through the actual movement of fluid particles',
                  options: ['Convection is the transfer of heat energy through the actual movement of fluid particles', 'Heat is a form of energy that transfers from a region of higher temperature to a region', 'Conduction is the process of heat transfer through solid materials from particle to', 'Good and bad conductors of heat are classifications of materials based on how easily'],
                  hint: 'Review density differences and particle spacing in fluids from earlier chapters before studying.',
                  misconception: 'Students often believe that heat rises on its own as an invisible substance, rather than understanding that the *heated fluid* rises.' }
          ],
            remediations: { 'heat-rises-on-its-own': { steps: ['To fix this misconception, perform a simple density comparison activity: take a bottle of coloured warm water and.', 'Observe that the warm water instantly floats to the top because of buoyancy, while cold water sinks.', 'Emphasize that the fluid doesn\'t move because "heat likes to go up," but because gravity pulls denser cold fluid down.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_005', difficulty: 'standard',
          question: 'Land and sea breeze are natural convection currents occurring in coastal.',
          hint: 'Review how uneven heating of fluids creates circular convection currents in Class 7.',
          misconception: 'Students frequently believe that water is inherently cold and land is inherently hot, thinking that land and sea.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical process responsible for the formation of land and sea breezes?', answer: 'The primary process is convection',
                  options: ['The primary process is convection', 'conduction', 'radiation'],
                  hint: 'Review how uneven heating of fluids creates circular convection currents in Class 7 Convection.',
                  misconception: 'Students frequently believe that water is inherently cold and land is inherently hot, thinking that land and sea breezes are caused by the.' }
          ],
            remediations: { 'students-frequently-believe-that-water': { steps: ['To fix this, guide the student through a simple tactile experiment touching sand and water left under the sun for 30.', 'Remind them that temperature differences drive density changes in the air above them, creating the pressure gradients.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_006', difficulty: 'standard',
          question: 'Radiation is the process of heat transfer through empty space or transparent.',
          hint: 'Review c7_physics_ch03_001 to recall basic heat flow concepts and c7_physics_ch03_004 for.',
          misconception: 'Students often think that radiation requires air or wind to carry heat from one place to another, or they confuse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Radiation is the process of heat transfer through empty space or transparent mediums',
                  options: ['Radiation is the process of heat transfer through empty space or transparent mediums', 'Heat is a form of energy that transfers from a region of higher temperature to a region', 'Conduction is the process of heat transfer through solid materials from particle to', 'Good and bad conductors of heat are classifications of materials based on how easily'],
                  hint: 'Review c7_physics_ch03_001 to recall basic heat flow concepts and c7_physics_ch03_004 for.',
                  misconception: 'Students often think that radiation requires air or wind to carry heat from one place to another, or they confuse it with convection.' }
          ],
            remediations: { 'radiation-requires-air-or-wind': { steps: ['Perform a simple thought experiment or demonstration: hold your hand underneath a hot iron or a glowing bulb without.', 'Explain that the heat rays (infrared radiation) travel like light beams straight through the air without needing the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
