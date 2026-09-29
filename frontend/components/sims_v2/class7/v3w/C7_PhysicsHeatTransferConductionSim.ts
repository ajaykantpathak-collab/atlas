import type { SimDef } from '../../engine/types';
import C7_PhysicsHeatTransferConductionSim from '../../../simulations/c6_12/C7_PhysicsHeatTransferConductionSim';

/** v3 wrapped master — C7_PhysicsHeatTransferConductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicsheattransferconductionsim: SimDef = {
    id: 'v3w_c7_physicsheattransferconductionsim',
    title: 'Conduction of Heat: Transfer Through Solids',
    subtitle: 'Covers heat transfer through solid objects via direct contact and molecular vibration.',
    classLevel: 7, subject: 'physics', topic: 'Conduction of Heat: Transfer Through Solids',
    chapters: [],
    nodeIds: ['c7_physics_ch03_002', 'c7_physics_ch03_003', 'c7_physics_ch03_004', 'c7_physics_ch03_006', 'c7_physics_ch03_007', 'c7_physics_ch03_010', 'c7_physics_ch03_001', 'c7_physics_ch03_008', 'c7_physics_ch03_005', 'c7_physics_ch01_006', 'c7_physics_ch01_007', 'c7_physics_ch01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine touching a steel spoon left inside a hot bowl of dal—your hand immediately feels the heat.', goal: 'Master Conduction of Heat: Transfer Through Solids.' },
    discovery: {
        question: 'Which method of heat transfer is primarily responsible for the handle of a metal frying pan staying relatively cool or being made of insulating plastic?',
        options: ['Conduction', 'radiation', 'produce'],
        answer: 'Conduction',
        hook: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.',
    },
    teaching: [
        { title: 'Conduction is the process of heat transfer.', text: 'Conduction is the process of heat transfer through solid materials from particle to particle without the actual movement of the particles themselves, measured in Joules (J) or Watts (W) for rate of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch03_002', title: 'Conduction is the process of heat.',
          scaffold: { problem: 'In a school laboratory experiment in Delhi, a brass rod transfers heat at a constant rate of 30 Joules per second.',
            steps: [
            { text: 'Identify given values: rate of heat transfer $P = 30\\text{ J/s}$, time $t = 2\\text{ minutes}$.' },
            { text: 'Convert time into SI units (seconds): $t = 2 \\times 60\\text{ s} = 120\\text{ s}$.' },
            { text: 'Identify the correct formula linking heat, rate of heat transfer, and time: $Q = P \\times t$.' },
            { text: 'Substitute values into the equation: $Q = 30\\text{ J/s} \\times 120\\text{ s}$.' },
            { text: 'Compute the final value and cancel units: $Q = 3600\\text{ J}$ (Joules).', faded: true, blankAnswer: '3600 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_003', title: 'Good and bad conductors of heat are.',
          scaffold: { problem: 'In a school kitchen science lab in Mumbai, four rods of identical dimensions made of copper, iron, glass, and wood are coated with wax at.',
            steps: [
            { text: 'Identify given values with units: Time taken by copper ($t_{\\text{copper}}$) = 15 s; Time taken by glass.' },
            { text: 'Identify what to find: The time difference ($\\Delta t$) between glass and copper.' },
            { text: 'Set up the subtraction equation: $\\Delta t = t_{\\text{glass}} - t_{\\text{copper}}$.' },
            { text: 'Substitute values with units: $\\Delta t = 300\\text{ s} - 15\\text{ s}$.' },
            { text: 'Compute and verify units: $\\Delta t = 285\\text{ s}$, which is physically reasonable since glass is a much worse.', faded: true, blankAnswer: '285 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_004', title: 'Convection is the transfer of heat.',
          scaffold: { problem: 'A beaker filled with 500 mL of cold water at 20 °C is heated uniformly from the bottom using a Bunsen burner in a school laboratory in New.',
            steps: [
            { text: 'Identify initial conditions: Volume V = 500 mL, Initial Temperature $T_i$ = 20 °C, Final Target Temperature $T_f$ = 60.' },
            { text: 'Determine heat transfer mode at the solid-liquid boundary: The base of the glass beaker conducts heat to the immediate.' },
            { text: 'Analyze particle response and density shift: Water molecules at the bottom absorb thermal energy, increase in kinetic.' },
            { text: 'Track fluid displacement and convection current formation: Less dense warm water rises due to buoyancy, while denser.' },
            { text: 'Verify equilibrium: Continuous circulation ensures thermal energy distributes throughout the 500 mL volume until every.', faded: true, blankAnswer: 'Thermal equilibrium is achieved at 60 °C through steady.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_006', title: 'Radiation is the process of heat.',
          scaffold: { problem: 'Two identical metal plates, one painted matte black and the other polished silver, are placed under the afternoon sun in Jaipur.',
            steps: [
            { text: 'Identify given values: temperature increase of black plate $\\Delta T_{\\text{black}} = 12^\\circ\\text{C}$, temperature.' },
            { text: 'Identify what to find: the ratio $\\Delta T_{\\text{black}} : \\Delta T_{\\text{silver}}$.' },
            { text: 'Substitute values into the ratio expression: $\\frac{12^\\circ\\text{C}}{4^\\circ\\text{C}}$.' },
            { text: 'Simplify the fraction, tracking unit cancellation ($\\circ\\text{C}$ units cancel out): $\\frac{12}{4} = 3$.' },
            { text: 'Verify the physical reason: dark surfaces absorb more radiation than shiny surfaces, making the ratio $3:1$, which is.', faded: true, blankAnswer: '3:1' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_007', title: 'Comparing conduction, convection, and.',
          scaffold: { problem: 'A traditional Indian clay pot (matka) keeps water cool. Compare how heat enters the water from the outside hot summer air through the.',
            steps: [
            { text: 'Identify the barrier and states of matter involved: solid clay wall separating outside air and inside water.' },
            { text: 'Analyze heat transfer across the solid clay wall: direct physical contact causes heat to travel via conduction.' },
            { text: 'Analyze heat transfer within the air surrounding the pot: warm air circulates around the pot via convection currents.' },
            { text: 'Account for evaporation and cooling: moisture seeps through pores and evaporates, carrying away latent heat while.' },
            { text: 'Summarize dominant modes: Conduction dominates through the solid clay body, convection dominates in the surrounding air.', faded: true, blankAnswer: 'Conduction through the solid clay, convection in the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch03_010', title: 'Applications of heat transfer involve.',
          scaffold: { problem: 'A pressure cooker base is made of aluminum with a thickness of 4 mm and a cross-sectional area of $0.03\\text{ m}^2$.',
            steps: [
            { text: 'Identify given temperatures: inner temperature $T_1 = 120\\text{ °C}$, outer temperature $T_2 = 140\\text{ °C}$.' },
            { text: 'Identify what needs to be found: the temperature difference ($\\Delta T$) across the aluminum base.' },
            { text: 'Set up the subtraction expression: $\\Delta T = T_2 - T_1$.' },
            { text: 'Substitute the values with units: $\\Delta T = 140\\text{ °C} - 120\\text{ °C}$.' },
            { text: 'Compute the final value with units: $\\Delta T = 20\\text{ °C}$, which represents the thermal driving force for.', faded: true, blankAnswer: '20 °C' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch03_003', title: 'Identify each idea',
          dissect: { specimen: 'Conduction of Heat: Transfer Through Solids', spots: [
            { id: 's1', label: 'Conduction is the process of', prompt: 'Which idea is this? — Conduction is the process of heat transfer through solid materials from particle to.', answer: 'Conduction is the process of', options: ['Conduction is the process of', 'Good and bad conductors of', 'Convection is the transfer of', 'Radiation is the process of'] },
            { id: 's2', label: 'Good and bad conductors of', prompt: 'Which idea is this? — Good and bad conductors of heat are classifications of materials based on how easily.', answer: 'Good and bad conductors of', options: ['Good and bad conductors of', 'Conduction is the process of', 'Convection is the transfer of', 'Radiation is the process of'] },
            { id: 's3', label: 'Convection is the transfer of', prompt: 'Which idea is this? — Convection is the transfer of heat energy through the actual movement of fluid particles.', answer: 'Convection is the transfer of', options: ['Convection is the transfer of', 'Conduction is the process of', 'Good and bad conductors of', 'Radiation is the process of'] },
            { id: 's4', label: 'Radiation is the process of', prompt: 'Which idea is this? — Radiation is the process of heat transfer through empty space or transparent mediums.', answer: 'Radiation is the process of', options: ['Radiation is the process of', 'Conduction is the process of', 'Good and bad conductors of', 'Convection is the transfer of'] },
            { id: 's5', label: 'Comparing conduction convection and radiation', prompt: 'Which idea is this? — Comparing conduction, convection, and radiation involves analyzing how thermal energy.', answer: 'Comparing conduction convection and radiation', options: ['Comparing conduction convection and radiation', 'Conduction is the process of', 'Good and bad conductors of', 'Convection is the transfer of'] },
            { id: 's6', label: 'Applications of heat transfer involve', prompt: 'Which idea is this? — Applications of heat transfer involve using the principles of conduction, convection, and.', answer: 'Applications of heat transfer involve', options: ['Applications of heat transfer involve', 'Conduction is the process of', 'Good and bad conductors of', 'Convection is the transfer of'] }
          ] } }
    ],
    explore: { component: C7_PhysicsHeatTransferConductionSim, prompt: 'Explore the interactive — Conduction of Heat: Transfer Through Solids' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch03_002', difficulty: 'standard',
          question: 'Conduction is the process of heat transfer through solid materials from.',
          hint: 'Review c6_physics_ch07_020 to reinforce the basics of particle vibration and heat.',
          misconception: 'Students often believe that heat travels through solids because the atoms themselves physically travel from the hot end.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conduction is the process of heat transfer through solid materials from particle to',
                  options: ['Conduction is the process of heat transfer through solid materials from particle to', 'Good and bad conductors of heat are classifications of materials based on how easily', 'Convection is the transfer of heat energy through the actual movement of fluid particles', 'Radiation is the process of heat transfer through empty space or transparent mediums'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that heat travels through solids because the atoms themselves physically travel from the hot end to the cold end of.' }
          ],
            remediations: { 'heat-travels-through-solids-because': { steps: ['To fix this, use the analogy of a line of people passing a bucket of water (or playing a vibration game where students.', 'Emphasize that the individual students (atoms) stay in their places while only the energy or message travels down the.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_003', difficulty: 'standard',
          question: 'Good and bad conductors of heat are classifications of materials based on how.',
          hint: 'Review c6_physics_ch07_025 to re-examine how insulators prevent heat transfer before.',
          misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering,.',
          parts: [
                { id: 'a', prompt: 'Which of the following common kitchen items is classified as a good conductor of heat?', answer: 'Stainless steel frying pan',
                  options: ['Stainless steel frying pan', 'produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering, rather than simply.' }
          ],
            remediations: { 'bad-conductors-insulators-actually-produce': { steps: ['To correct this, guide the student to measure the temperature of a woollen blanket and a metal chair inside an.', 'Explain that the metal chair feels colder because it is a good conductor that rapidly draws heat away from your warm.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Air is a good conductor of heat because heat travels through the atmosphere from the Sun to the Earth." Is this statement scientifically.', answer: 'The statement is scientifically inaccurate',
                  options: ['The statement is scientifically inaccurate', 'produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that bad conductors (insulators) actually "produce" cold or actively block cold from entering, rather than simply.' }
          ],
            remediations: { 'bad-conductors-insulators-actually-produce': { steps: ['To correct this, guide the student to measure the temperature of a woollen blanket and a metal chair inside an.', 'Explain that the metal chair feels colder because it is a good conductor that rapidly draws heat away from your warm.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_004', difficulty: 'standard',
          question: 'Convection is the transfer of heat energy through the actual movement of fluid.',
          hint: 'Review density differences and particle spacing in fluids from earlier chapters before.',
          misconception: 'Students often believe that heat rises on its own as an invisible substance, rather than understanding that the *heated.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Convection is the transfer of heat energy through the actual movement of fluid particles',
                  options: ['Convection is the transfer of heat energy through the actual movement of fluid particles', 'Conduction is the process of heat transfer through solid materials from particle to', 'Good and bad conductors of heat are classifications of materials based on how easily', 'Radiation is the process of heat transfer through empty space or transparent mediums'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that heat rises on its own as an invisible substance, rather than understanding that the *heated fluid* rises.' }
          ],
            remediations: { 'heat-rises-on-its-own': { steps: ['To fix this misconception, perform a simple density comparison activity: take a bottle of coloured warm water and.', 'Observe that the warm water instantly floats to the top because of buoyancy, while cold water sinks.', 'Emphasize that the fluid doesn\'t move because "heat likes to go up," but because gravity pulls denser cold fluid down,.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_006', difficulty: 'standard',
          question: 'Radiation is the process of heat transfer through empty space or transparent.',
          hint: 'Review c7_physics_ch03_001 to recall basic heat flow concepts and c7_physics_ch03_004 for.',
          misconception: 'Students often think that radiation requires air or wind to carry heat from one place to another, or they confuse it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Radiation is the process of heat transfer through empty space or transparent mediums',
                  options: ['Radiation is the process of heat transfer through empty space or transparent mediums', 'Conduction is the process of heat transfer through solid materials from particle to', 'Good and bad conductors of heat are classifications of materials based on how easily', 'Convection is the transfer of heat energy through the actual movement of fluid particles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that radiation requires air or wind to carry heat from one place to another, or they confuse it with convection.' }
          ],
            remediations: { 'radiation-requires-air-or-wind': { steps: ['Perform a simple thought experiment or demonstration: hold your hand underneath a hot iron or a glowing bulb without.', 'Explain that the heat rays (infrared radiation) travel like light beams straight through the air without needing the.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_007', difficulty: 'standard',
          question: 'Comparing conduction, convection, and radiation involves analyzing how thermal.',
          hint: 'Review nodes c7_physics_ch03_002, c7_physics_ch03_004, and c7_physics_ch03_006 to.',
          misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via.',
          parts: [
                { id: 'a', prompt: 'Compare how heat reaches the upper layers of water in a vessel when heated from the bottom versus how heat reaches the bottom if heated from the top.', answer: 'When heated from the bottom, hot water at the base becomes less dense and rises',
                  options: ['When heated from the bottom, hot water at the base becomes less dense and rises', 'convection currents can push heat downward against buoyancy forces'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via convection.' }
          ],
            remediations: { 'heat-transfer-methods-occur-in': { steps: ['To fix this, guide the student through a structured comparison chart exercise: 1.', 'Ask them to list the three modes and write down the medium required for each (Solid only, Fluid only, None/Vacuum).', 'Have them test a candle flame: feel the heat sideways/upwards (radiation and convection), hold a wire in it.', 'Emphasize that radiation does not need the air to travel, even though air is present.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via.',
          parts: [
                { id: 'a', prompt: 'Compare how heat reaches the upper layers of water in a vessel when heated from the bottom versus how heat reaches the bottom if heated from the top.', answer: 'When heated from the bottom, hot water at the base becomes less dense and rises',
                  options: ['When heated from the bottom, hot water at the base becomes less dense and rises', 'convection currents can push heat downward against buoyancy forces'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that heat transfer methods occur in total isolation or that a material can conduct heat via convection.' }
          ],
            remediations: { 'heat-transfer-methods-occur-in': { steps: ['To fix this, guide the student through a structured comparison chart exercise: 1.', 'Ask them to list the three modes and write down the medium required for each (Solid only, Fluid only, None/Vacuum).', 'Have them test a candle flame: feel the heat sideways/upwards (radiation and convection), hold a wire in it.', 'Emphasize that radiation does not need the air to travel, even though air is present.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch03_010', difficulty: 'standard',
          question: 'Applications of heat transfer involve using the principles of conduction,.',
          hint: 'Review c7_physics_ch03_007 to reinforce how conduction, convection, and radiation operate.',
          misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.',
          parts: [
                { id: 'a', prompt: 'Which method of heat transfer is primarily responsible for the handle of a metal frying pan staying relatively cool or being made of insulating plastic?', answer: 'Conduction',
                  options: ['Conduction', 'radiation', 'produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' },
                { id: 'b', prompt: 'Explain why chimneys in factories and traditional kitchens are built very tall and placed high up near the roof.', answer: 'Chimneys are placed high up',
                  options: ['Chimneys are placed high up', 'produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' },
                { id: 'c', prompt: 'Compare the effectiveness of a white-painted corrugated metal roof versus a black-painted corrugated metal roof on a house in a hot Indian summer.', answer: 'The white-painted roof keeps the rooms cooler',
                  options: ['The white-painted roof keeps the rooms cooler', 'produce', 'dark colors repel heat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that materials like woolen sweaters or quilts "produce" heat to keep our bodies warm in winter.' }
          ],
            remediations: { 'materials-like-woolen-sweaters-or': { steps: ['To correct this, have the student touch a woolen blanket and a piece of iron kept in the same room.', 'Explain that both feel at room temperature because neither produces heat, but the iron feels colder because it conducts.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
