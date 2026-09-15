import type { SimDef } from '../../engine/types';
import C7_PhysicsOhmsSim from '../../../simulations/c6_12/C7_PhysicsOhmsSim';

/** v3 wrapped master — C7_PhysicsOhmsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicsohmssim: SimDef = {
    id: 'v3w_c7_physicsohmssim',
    title: 'Ohms',
    subtitle: 'Covers mechanical toggle, slide, and push-button switches in simple direct current (DC).',
    classLevel: 7, subject: 'physics', topic: 'Electric Switch: Opening and Closing a Circuit',
    chapters: [],
    nodeIds: ['c7_physics_ch02_007', 'c7_physics_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you walk into your classroom and press the wall switch to turn on the ceiling fan, you hear a click and.', goal: 'Master Ohms.' },
    discovery: {
        question: 'A circuit contains a 3V battery, an open switch, and a small electric lamp connected in series.',
        options: ['When the switch is open, the current is 0 A', 'stores', 'consumes'],
        answer: 'When the switch is open, the current is 0 A',
        hook: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity.',
    },
    teaching: [
        { title: 'An electric switch is a simple mechanical or.', text: 'An electric switch is a simple mechanical or electronic device used to open or close an electric circuit safely, thereby controlling the flow of electric current without needing to disconnect wires.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch02_007', title: 'An electric switch is a simple.',
          scaffold: { problem: 'In a school science lab in Delhi, a student connects a 4.5V battery pack, an open knife-edge switch, and a small torch bulb in series using.',
            steps: [
            { text: 'Identify initial state: The switch is open, meaning there is an air gap between the metal contact blade and the.' },
            { text: 'Identify physical action: Pushing the knife-edge switch down brings the movable copper blade into firm physical and.' },
            { text: 'Analyze material property: Copper blade and copper terminal are electrical conductors; pressing them together bridges.' },
            { text: 'Evaluate circuit status: The circuit loop is now complete from the battery\'s positive terminal, through the switch,.' },
            { text: 'Conclude outcome: Electric current flows instantly through the complete loop, causing the bulb to light up.', faded: true, blankAnswer: 'The circuit becomes a closed loop, current flows, and the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch02_010', title: 'Electrical insulators are materials.',
          scaffold: { problem: 'In an Indian household wiring repair, an electrician wraps a bare copper wire carrying a current with a PVC (plastic) tape of resistance.',
            steps: [
            { text: 'Identify given values: Voltage $V = 220 \\text{ V}$, Resistance $R = 2,000,000 \\ \\Omega$.' },
            { text: 'Identify the relevant formula from Ohm\'s Law rearranged for current: $I = \\frac{V}{R}$.' },
            { text: 'Substitute values with units into the formula: $I = \\frac{220 \\text{ V}}{2,000,000 \\ \\Omega}$.' },
            { text: 'Compute the value and track unit cancellation ($\\frac{\\text{V}}{\\Omega} = \\text{A}$): $I = 0.00011 \\text{ A}$ ($0.11.' },
            { text: 'Verify the answer: The leakage current is extremely small ($0.11 \\text{ milliamperes}$), proving PVC is an excellent.', faded: true, blankAnswer: '0.00011 A (or 0.11 mA)' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch02_010', title: 'Identify each idea',
          dissect: { specimen: 'Ohms', spots: [
            { id: 's1', label: 'An electric switch is a', prompt: 'Which idea is this? — An electric switch is a simple mechanical or electronic device used to open or close an.', answer: 'An electric switch is a', options: ['An electric switch is a', 'Electrical insulators are materials that'] },
            { id: 's2', label: 'Electrical insulators are materials that', prompt: 'Which idea is this? — Electrical insulators are materials that completely block the flow of electric current.', answer: 'Electrical insulators are materials that', options: ['Electrical insulators are materials that', 'An electric switch is a'] }
          ] } }
    ],
    explore: { component: C7_PhysicsOhmsSim, prompt: 'Explore the interactive — Ohms' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch02_007', difficulty: 'standard',
          question: 'An electric switch is a simple mechanical or electronic device used to open or.',
          hint: 'Review c7_physics_ch02_006 to reinforce how a complete circuit is structured before.',
          misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity.',
          parts: [
                { id: 'a', prompt: 'A circuit contains a 3V battery, an open switch, and a small electric lamp connected in series.', answer: 'When the switch is open, the current is 0 A',
                  options: ['When the switch is open, the current is 0 A', 'stores', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of a.' },
                { id: 'b', prompt: 'Analyze a circuit diagram where a switch is placed *after* the lamp relative to the positive terminal of the battery.', answer: 'Yes, the lamp will light up when the switch is closed',
                  options: ['Yes, the lamp will light up when the switch is closed', 'used up', 'stores'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of a.' }
          ],
            remediations: { 'a-switch-stores-or-consumes': { steps: ['To fix this, guide the student to build a simple circuit with a battery, bulb, and homemade switch using a paper clip.', 'Have them disconnect the wire returning from the bulb to the negative terminal of the battery while the switch is.', 'Then explain that electricity always requires a complete round-trip loop, and a switch simply acts as a movable.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement made by a classmate: "A switch uses up electricity when it is open to stop the bulb from glowing." Is this statement correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'stores', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of a.' },
                { id: 'b', prompt: 'Analyze a circuit diagram where a switch is placed *after* the lamp relative to the positive terminal of the battery.', answer: 'Yes, the lamp will light up when the switch is closed',
                  options: ['Yes, the lamp will light up when the switch is closed', 'used up', 'stores', 'consumes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a switch "stores" or "consumes" electricity when turned off, or they think that electricity flows out of a.' }
          ],
            remediations: { 'a-switch-stores-or-consumes': { steps: ['To fix this, guide the student to build a simple circuit with a battery, bulb, and homemade switch using a paper clip.', 'Have them disconnect the wire returning from the bulb to the negative terminal of the battery while the switch is.', 'Then explain that electricity always requires a complete round-trip loop, and a switch simply acts as a movable.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
