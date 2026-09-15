import type { SimDef } from '../../engine/types';

/** v3 generated — c8_chem_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_chem_ch03_p2: SimDef = {
    id: 'v3_c8_chem_ch03_p2',
    title: 'Nature of Matter: Elements, Compounds, and Mixtures · Part 2/2',
    subtitle: 'Separate what physics can undo from what only chemistry made',
    classLevel: 8, subject: 'chemistry', topic: 'Nature of Matter: Elements, Compounds, and Mixtures · Part 2/2',
    chapters: ['c8_chem_ch03'],
    nodeIds: ['c8_chem_ch3_4', 'c8_chem_ch3_5', 'c8_chem_ch3_6', 'c8_chem_ch3_7', 'c8_chem_ch3_8', 'c8_chem_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a separation scientist in a busy lab', intro: 'Your bench is covered with chaos: salt in water, iron in sulphur, sand in rice. Some of it yields to sieves and magnets; some refuses everything except chemistry. Learn to tell which is which.', goal: 'Differentiate elements, compounds and mixtures, and choose the right physical separation method for a given mixture.' },
    discovery: {
        question: 'Iron filings and sulphur powder sit mixed in a dish — a magnet pulls the iron right out, unchanged. Heat them together and no magnet can recover the iron. What did the heating actually do?',
        options: ['It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means', 'It melted the iron into a liquid alloy', 'It evaporated the sulphur leaving pure iron', 'It magnetised the sulphur permanently'],
        answer: 'It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means',
        hook: 'A mixture is a crowd — each substance keeps its identity and can be picked out. A compound is a marriage — new substance, new properties, no going back with a magnet.',
    },
    teaching: [
        { title: 'Separation of Mixtures: Filtration and Sedimentation', text: 'Filtration and sedimentation are physical methods used to separate insoluble solid particles from a liquid in a heterogeneous mixture.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_chem_ch3_4', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Sort the material world: separate mixtures by magnet, sieve, evaporation and distillation; then distinguish elements, compounds and mixtures by whether chemistry — not physics — made them.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c8_chem_ch3_5', title: 'Separation of Mixtures: Evaporation and Condensation',
          caseStudy: { intro: 'Think about how salt is harvested from seawater in the salt pans of Gujarat or Tamil Nadu.',
            decisions: [{ prompt: 'Name the physical change of state that occurs when water vapor turns back into liquid water droplets on a cold glass plate.', options: [
                { text: 'Condensation', outcome: 'Condensation. *What a wrong answer reveals:* If a student writes "evaporation" or "melting," they.' },
                { text: 'evaporation', outcome: 'Not quite — A very common misconception is that when a solution is heated, the dissolved solute (like salt).', reveals: 'a-very-common-misconception-is' },
                { text: 'melting', outcome: 'Not quite — A very common misconception is that when a solution is heated, the dissolved solute (like salt).', reveals: 'a-very-common-misconception-is' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_6', title: 'Separation of Mixtures: Distillation',
          caseStudy: { intro: 'When you boil salt water in a kitchen vessel to dry it up completely, the water escapes as steam into the air, leaving only the salt behind—this is simple.',
            decisions: [{ prompt: 'What is the primary physical property of components in a mixture that allows them to be separated by simple distillation?', options: [
                { text: 'The primary property is a significant difference in their boiling points', outcome: 'The primary property is a significant difference in their boiling points.' },
                { text: 'solubility', outcome: 'Not quite — Students often believe that during distillation, liquid turns directly into gas and then instantly.', reveals: 'during-distillation' },
                { text: 'magnetic susceptibility', outcome: 'Not quite — Students often believe that during distillation, liquid turns directly into gas and then instantly.', reveals: 'during-distillation' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_8', title: 'Elements: Definition and Examples (Iron, Copper, Gold, Oxygen)',
          caseStudy: { intro: 'To understand elements, look at a copper vessel (*lota*) used in Indian households or a gold ornament (*jhumka*).',
            decisions: [{ prompt: 'Define an "element" in terms of its constituent atoms. Can a pure sample of copper be broken down into simpler substances by heating.', options: [
                { text: 'An element is a pure substance made up of only one kind of atom', outcome: 'An element is a pure substance made up of only one kind of atom.' },
                { text: 'elements', outcome: 'Not quite — Students often confuse "elements" with "single, unbonded atoms." They believe that because oxygen.', reveals: 'students-often-confuse-elements-with' },
                { text: 'single, unbonded atoms', outcome: 'Not quite — Students often confuse "elements" with "single, unbonded atoms." They believe that because oxygen.', reveals: 'students-often-confuse-elements-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_4', title: 'Use it in the wild',
          caseStudy: { intro: 'In the school lab, Kabir stirs grey iron filings with yellow sulfur powder and gets a speckled blend. His partner writes \'new compound formed\' in the record book because two elements are now touching.',
            decisions: [{ prompt: 'Is the record entry justified?', options: [
                { text: 'No — it is a mixture: no chemical reaction occurred, the proportions were arbitrary, and dragging a magnet through the blend pulls the iron out unchanged, proving each part kept its own properties. Only heating it would make the compound iron sulfide.', outcome: 'This applies the mixture test: components that keep their properties and separate physically never bonded chemically.' },
                { text: 'The partner is right — whenever two elements share a container, a compound with new properties results.', outcome: 'Compounds need chemical bonding in fixed proportions; a magnet still lifts the iron out, so no new substance exists here.', reveals: 'touching-is-bonding' },
                { text: 'It cannot be a mixture because mixtures are only liquids like salt water — two solids together must be a compound.', outcome: 'Mixtures can be solid-solid too, like bhel or this powder blend; the test is retained properties and physical separability, not state.', reveals: 'mixtures-are-liquids' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Air, sea water and salad are mixtures — you can unmix them. Water and iron sulphide are compounds — chemistry fused them. The difference decides how you separate anything.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch3_4', difficulty: 'standard',
          question: 'Filtration and sedimentation are physical methods used to separate insoluble.',
          hint: 'Review c6_chemistry_ch04_002 to reinforce the property of solubility and what happens.',
          misconception: 'Students often believe that filtration separates dissolved solids (like sugar or salt from water) just like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Filtration and sedimentation are physical methods used to separate insoluble solid',
                  options: ['Filtration and sedimentation are physical methods used to separate insoluble solid', 'A mixture is a physical combination of two or more substances (elements or compounds) in', 'A mixture is a substance formed by physically mixing two or more substances together such', 'An alloy is a homogeneous mixture of two or more metals, or a metal and a non-metal,'],
                  hint: 'Review c6_chemistry_ch04_002 to reinforce the property of solubility and what happens when.',
                  misconception: 'Students often believe that filtration separates dissolved solids (like sugar or salt from water) just like it separates insoluble solids.' }
          ],
            remediations: { 'filtration-separates-dissolved-solids-like': { steps: ['Remind the student of the particle model of matter: dissolved substances break down into tiny individual molecules.', 'Demonstrate by showing that salt water passes straight through filter paper leaving no residue, whereas sand leaves.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_5', difficulty: 'standard',
          question: 'Evaporation is the physical process by which a liquid solvent transitions into.',
          hint: 'If you are struggling, review the differences between soluble and insoluble substances.',
          misconception: 'A very common misconception is that when a solution is heated, the dissolved solute (like salt) evaporates along with.',
          parts: [
                { id: 'a', prompt: 'Name the physical change of state that occurs when water vapor turns back into liquid water droplets on a cold glass plate.', answer: 'Condensation',
                  options: ['Condensation', 'evaporation', 'melting', 'the steam coming off a boiling salt-water pot must taste salty'],
                  hint: 'If you are struggling, review the differences between soluble and insoluble substances, and recall.',
                  misconception: 'A very common misconception is that when a solution is heated, the dissolved solute (like salt) evaporates along with the solvent, or that.' }
          ],
            remediations: { 'a-very-common-misconception-is': { steps: ['To correct this misconception, perform a simple "steam taste-test" demonstration.', 'Boil a highly concentrated salt-water solution in a beaker.', 'Place a clean, cold glass lid diagonally over the beaker to collect the condensed steam.', 'Collect the dripping condensate in a clean spoon and let the student taste it once cooled.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'A very common misconception is that when a solution is heated, the dissolved solute (like salt) evaporates along with.',
          parts: [
                { id: 'a', prompt: 'A student wants to recover both pure water and dry salt from a salt-water mixture.', answer: 'No, they have only partially succeeded',
                  options: ['No, they have only partially succeeded', 'Yes, the method is correct', 'the steam coming off a boiling salt-water pot must taste salty'],
                  hint: 'If you are struggling, review the differences between soluble and insoluble substances, and recall.',
                  misconception: 'A very common misconception is that when a solution is heated, the dissolved solute (like salt) evaporates along with the solvent, or that.' }
          ],
            remediations: { 'a-very-common-misconception-is': { steps: ['To correct this misconception, perform a simple "steam taste-test" demonstration.', 'Boil a highly concentrated salt-water solution in a beaker.', 'Place a clean, cold glass lid diagonally over the beaker to collect the condensed steam.', 'Collect the dripping condensate in a clean spoon and let the student taste it once cooled.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_6', difficulty: 'standard',
          question: 'Distillation is an advanced separation technique used to separate the.',
          hint: 'Review c8_chem_ch3_5 to master individual evaporation and condensation steps before.',
          misconception: 'Students often believe that during distillation, liquid turns directly into gas and then instantly disappears into the.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical property of components in a mixture that allows them to be separated by simple distillation?', answer: 'The primary property is a significant difference in their boiling points',
                  options: ['The primary property is a significant difference in their boiling points', 'solubility', 'magnetic susceptibility', '"solubility" or "magnetic susceptibility"'],
                  hint: 'Review c8_chem_ch3_5 to master individual evaporation and condensation steps before tackling.',
                  misconception: 'Students often believe that during distillation, liquid turns directly into gas and then instantly disappears into the atmosphere.' }
          ],
            remediations: { 'during-distillation': { steps: ['To fix this, demonstrate a physical condensation experiment: boil water in a kettle with a cold plate held over the.', 'Then emphasize that miscible liquids have different boiling points, meaning the thermometer will pause at the boiling.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_7', difficulty: 'standard',
          question: 'Magnetic separation is a physical method used to separate magnetic components.',
          hint: 'Review c6_chemistry_ch04_002 to reinforce how distinct physical properties differentiate.',
          misconception: 'Students often assume that all metals (like aluminum foil, copper coins, and iron nails) are attracted to a magnet.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Magnetic separation is a physical method used to separate magnetic components of a',
                  options: ['Magnetic separation is a physical method used to separate magnetic components of a', 'A mixture is a physical combination of two or more substances (elements or compounds) in', 'A mixture is a substance formed by physically mixing two or more substances together such', 'An alloy is a homogeneous mixture of two or more metals, or a metal and a non-metal,'],
                  hint: 'Review c6_chemistry_ch04_002 to reinforce how distinct physical properties differentiate various.',
                  misconception: 'Students often assume that all metals (like aluminum foil, copper coins, and iron nails) are attracted to a magnet, leading them to predict.' }
          ],
            remediations: { 'all-metals-like-aluminum-foil': { steps: ['To fix this misconception, perform a quick demonstration using a bar magnet, an iron nail, an aluminum wrapper, and.', 'Show that only the iron nail jumps to the magnet, proving that magnetism is a specific property unique to certain.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_8', difficulty: 'standard',
          question: 'An element is a pure substance consisting of only one type of atom that cannot.',
          hint: 'If stuck, review `c7_chem_ch01_011` to recall physical properties of metals and.',
          misconception: 'Students often confuse "elements" with "single, unbonded atoms." They believe that because oxygen gas is written.',
          parts: [
                { id: 'a', prompt: 'Define an "element" in terms of its constituent atoms. Can a pure sample of copper be broken down into simpler substances by heating it strongly in a closed.', answer: 'An element is a pure substance made up of only one kind of atom',
                  options: ['An element is a pure substance made up of only one kind of atom', 'elements', 'single, unbonded atoms'],
                  hint: 'If stuck, review `c7_chem_ch01_011` to recall physical properties of metals and non-metals, and.',
                  misconception: 'Students often confuse "elements" with "single, unbonded atoms." They believe that because oxygen gas is written as $O_2$, it must be.' },
                { id: 'b', prompt: 'An artist has a block of pure gold ($Au$) and a block of brass (an alloy made of copper and zinc).', answer: 'Gold is an element',
                  options: ['Gold is an element', 'elements', 'single, unbonded atoms'],
                  hint: 'If stuck, review `c7_chem_ch01_011` to recall physical properties of metals and non-metals, and.',
                  misconception: 'Students often confuse "elements" with "single, unbonded atoms." They believe that because oxygen gas is written as $O_2$, it must be.' }
          ],
            remediations: { 'students-often-confuse-elements-with': { steps: ['Draw a molecular-scale diagram on the board.', 'Draw Box A containing pairs of identical red spheres joined together (representing $O_2$).', 'Draw Box B containing single, unbonded grey spheres (representing $Fe$ atoms in a metal lattice).', 'Draw Box C containing one black sphere joined to two red spheres (representing $CO_2$).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_9', difficulty: 'standard',
          question: 'A compound is a pure substance composed of two or more different elements.',
          hint: 'Review c8_chem_ch3_8 to reinforce the definition of elements before studying how they.',
          misconception: 'Students often think that because a compound contains certain elements, it will exhibit the properties of those.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A compound is a pure substance composed of two or more different elements chemically',
                  options: ['A compound is a pure substance composed of two or more different elements chemically', 'A mixture is a physical combination of two or more substances (elements or compounds) in', 'A mixture is a substance formed by physically mixing two or more substances together such', 'An alloy is a homogeneous mixture of two or more metals, or a metal and a non-metal,'],
                  hint: 'Review c8_chem_ch3_8 to reinforce the definition of elements before studying how they combine into.',
                  misconception: 'Students often think that because a compound contains certain elements, it will exhibit the properties of those elements.' }
          ],
            remediations: { 'because-a-compound-contains-certain': { steps: ['Remind the student that chemical combination creates an entirely new substance with completely new properties.', 'Demonstrate or explain how sodium (a reactive metal) and chlorine (a toxic gas) react to form harmless, edible salt.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
