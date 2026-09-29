import type { SimDef } from '../../engine/types';
import C7_PhysicsPressureFluidsliquidsSim from '../../../simulations/c6_12/C7_PhysicsPressureFluidsliquidsSim';

/** v3 wrapped master — C7_PhysicsPressureFluidsliquidsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicspressurefluidsliquidssim: SimDef = {
    id: 'v3w_c7_physicspressurefluidsliquidssim',
    title: 'Convection: Heat Transfer in Liquids and Gases',
    subtitle: 'Covers heat transfer through bulk movement in liquids and gases (convection) and the.',
    classLevel: 7, subject: 'physics', topic: 'Convection: Heat Transfer in Liquids and Gases',
    chapters: [],
    nodeIds: ['c7_physics_ch03_004', 'c7_physics_ch03_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Observe what happens when water is heated in a steel vessel on a kitchen stove: the water at the bottom gets.', goal: 'Master Convection: Heat Transfer in Liquids and Gases.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Convection is the transfer of heat energy.', text: 'Convection is the transfer of heat energy through the actual movement of fluid particles (liquids and gases) from a region of higher temperature to a region of lower temperature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch03_004', title: 'Convection is the transfer of heat.',
          scaffold: { problem: 'A beaker filled with 500 mL of cold water at 20 °C is heated uniformly from the bottom using a Bunsen burner in a school laboratory in New.',
            steps: [
            { text: 'Identify initial conditions: Volume V = 500 mL, Initial Temperature $T_i$ = 20 °C, Final Target Temperature $T_f$ = 60.' },
            { text: 'Determine heat transfer mode at the solid-liquid boundary: The base of the glass beaker conducts heat to the immediate.' },
            { text: 'Analyze particle response and density shift: Water molecules at the bottom absorb thermal energy, increase in kinetic.' },
            { text: 'Track fluid displacement and convection current formation: Less dense warm water rises due to buoyancy, while denser.' },
            { text: 'Verify equilibrium: Continuous circulation ensures thermal energy distributes throughout the 500 mL volume until every.', faded: true, blankAnswer: 'Thermal equilibrium is achieved at 60 °C through steady.' }
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
        { type: 'dissect', nodeId: 'c7_physics_ch03_007', title: 'Identify each idea',
          dissect: { specimen: 'Convection: Heat Transfer in Liquids and Gases', spots: [
            { id: 's1', label: 'Convection is the transfer of', prompt: 'Which idea is this? — Convection is the transfer of heat energy through the actual movement of fluid particles.', answer: 'Convection is the transfer of', options: ['Convection is the transfer of', 'Comparing conduction convection and radiation'] },
            { id: 's2', label: 'Comparing conduction convection and radiation', prompt: 'Which idea is this? — Comparing conduction, convection, and radiation involves analyzing how thermal energy.', answer: 'Comparing conduction convection and radiation', options: ['Comparing conduction convection and radiation', 'Convection is the transfer of'] }
          ] } }
    ],
    explore: { component: C7_PhysicsPressureFluidsliquidsSim, prompt: 'Explore the interactive — Convection: Heat Transfer in Liquids and Gases' },
    challenges: [
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
            remediations: { 'heat-transfer-methods-occur-in': { steps: ['To fix this, guide the student through a structured comparison chart exercise: 1.', 'Ask them to list the three modes and write down the medium required for each (Solid only, Fluid only, None/Vacuum).', 'Have them test a candle flame: feel the heat sideways/upwards (radiation and convection), hold a wire in it.', 'Emphasize that radiation does not need the air to travel, even though air is present.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
