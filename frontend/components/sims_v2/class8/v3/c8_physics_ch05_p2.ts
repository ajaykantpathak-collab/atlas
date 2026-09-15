import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch05_p2: SimDef = {
    id: 'v3_c8_physics_ch05_p2',
    title: 'The Amazing World of Solutes, Solvents, and Solutions · Part 2/2',
    subtitle: 'The invisible mixing that makes salt \'disappear\'',
    classLevel: 8, subject: 'physics', topic: 'The Amazing World of Solutes, Solvents, and Solutions · Part 2/2',
    chapters: ['c8_physics_ch05'],
    nodeIds: ['c8_physics_ch5_6', 'c8_physics_ch5_7', 'c8_physics_ch5_8', 'c8_physics_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a kitchen chemist', intro: 'Sugar vanishes in water, alloys hide inside metals, and the air you breathe is secretly a solution. Learn to spot who\'s dissolving whom — by amount, not by state.', goal: 'Understand solutions as homogeneous mixtures — identify solute and solvent by relative amount across solid, liquid and gas examples.' },
    discovery: {
        question: 'Air is a solution too — so which gas is the \'solvent\' of the atmosphere?',
        options: ['Nitrogen — the solvent is simply the component present in the largest amount (~78%), not the most important one', 'Oxygen — because we breathe it', 'Carbon dioxide — because it\'s the most reactive', 'Air can\'t be a solution — solutions must be liquid'],
        answer: 'Nitrogen — the solvent is simply the component present in the largest amount (~78%), not the most important one',
        hook: 'Solute vs solvent isn\'t about solid vs liquid — it\'s about quantity. Brass is a solid solution of zinc in copper; air is a gas solution. And true solutions never scatter light — if you can see a beam through it, it\'s not a solution.',
    },
    teaching: [
        { title: 'Saturated and Unsaturated Solutions', text: 'A saturated solution is one in which no more solute can dissolve at a given temperature and pressure; any additional solute added will remain undissolved as a solid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch5_6', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Interrogate everyday mixtures: nimbu pani, iodine tincture, brass, the air itself. Name the solute and solvent in each, and prove a solution is homogeneous by splitting it in half and testing both glasses.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch5_6', title: 'Saturated and Unsaturated Solutions',
          caseStudy: { intro: 'Imagine adding spoonfuls of sugar to a glass of cold water while stirring — at first the sugar disappears completely, but after several spoons you see granules.',
            decisions: [{ prompt: 'What is the defining characteristic of a saturated solution at a given temperature?', options: [
                { text: 'A saturated solution contains the maximum amount of solute that can dissolve at that', outcome: 'A saturated solution contains the maximum amount of solute that can dissolve at that temperature.' },
                { text: 'a solution with a lot of solute', outcome: 'Not quite — Students often think a saturated solution is simply "a solution with a lot of solute" or "a very.', reveals: 'a-saturated-solution-is-simply' },
                { text: 'a concentrated solution', outcome: 'Not quite — Students often think a saturated solution is simply "a solution with a lot of solute" or "a very.', reveals: 'a-saturated-solution-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_7', title: 'Concentration of Solutions: Qualitative Description',
          caseStudy: { intro: 'Observe three glasses of nimbu pani (lemonade) made by your mother: one with just a pinch of sugar (barely sweet), one with two spoons (nicely sweet), and one.',
            decisions: [{ prompt: 'A student adds one spoon of salt to a glass of water and stirs until it disappears. She adds a second spoon, it dissolves.', options: [
                { text: 'The solution is **unsaturated** (or "concentrated but unsaturated")', outcome: 'The solution is **unsaturated** (or "concentrated but unsaturated").' },
                { text: 'saturated', outcome: 'Not quite — Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are.', reveals: 'concentrated-and-saturated-are-synonyms' },
                { text: 'solute added', outcome: 'Not quite — Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are.', reveals: 'concentrated-and-saturated-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_8', title: 'Water as a Universal Solvent: Properties and Examples',
          caseStudy: { intro: 'Begin by showing a glass of tap water and adding a spoon of salt (NaCl) and a spoon of sugar (sucrose) – both disappear.',
            decisions: [{ prompt: 'What is the scientific reason water is called a "universal solvent"?', options: [
                { text: 'Water\'s polar covalent bonds give it partial positive charges on hydrogen atoms and a', outcome: 'Water\'s polar covalent bonds give it partial positive charges on hydrogen atoms and a partial.' },
                { text: 'water is everywhere', outcome: 'Not quite — Students often think "universal solvent" means water dissolves *every* substance.', reveals: 'universal-solvent-means-water-dissolves' },
                { text: 'water dissolves everything', outcome: 'Not quite — Students often think "universal solvent" means water dissolves *every* substance.', reveals: 'universal-solvent-means-water-dissolves' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_9', title: 'Separation of Solutions: Evaporation and Distillation',
          caseStudy: { intro: 'Imagine you have a glass of saltwater from the Arabian Sea and you want to get both the salt and the water back separately.',
            decisions: [{ prompt: 'What is the main difference between evaporation and distillation in terms of what is collected at the end of the process?', options: [
                { text: 'In evaporation, only the solid solute is collected as residue', outcome: 'In evaporation, only the solid solute is collected as residue; the solvent vaporizes into the air.' },
                { text: 'both collect the solvent', outcome: 'Not quite — Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water.', reveals: 'distillation-separates-any-mixture' },
                { text: 'distillation separates *any* mixture, e', outcome: 'Not quite — Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water.', reveals: 'distillation-separates-any-mixture' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Mixing nimbu pani for guests, Tara dissolves 20 g of sugar in 100 g of water. Her cousin labels the diagram: \'Sugar is the solvent because it is the solid; water is the solute because it is the liquid.\'',
            decisions: [{ prompt: 'Is the labelling correct?', options: [
                { text: 'No — solvent and solute are decided by amount, not state: water at 100 g is the larger component, so water is the solvent and sugar the solute. The mixture is a true solution because the sugar particles are uniformly spread at molecular level and never settle out.', outcome: 'This uses the amount-based definition and the homogeneity test rather than judging by which ingredient started solid.' },
                { text: 'The cousin is right — the solid ingredient is always the solvent and the liquid always the solute.', outcome: 'State does not assign the roles; quantity does — the bigger share is always the solvent, whatever phase it is.', reveals: 'solid-is-solvent' },
                { text: 'Neither is right — nimbu pani is not a solution at all because you can still taste the sugar.', outcome: 'Taste proves the sugar\'s properties survived, which is normal for mixtures; a solution is defined by uniform molecular distribution, which this clear liquid has.', reveals: 'tasteable-not-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_9', title: 'You made it',
          caseStudy: { intro: 'A solution is a mixture so uniform that particles never settle and light passes clean through. Whatever\'s there in the largest amount is the solvent — everything else just dissolves into its crowd.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch5_6', difficulty: 'standard',
          question: 'A saturated solution is one in which no more solute can dissolve at a given.',
          hint: 'Review c8_physics_ch5_4 (solubility definition) and c8_physics_ch5_5 (temperature effect.',
          misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated.',
          parts: [
                { id: 'a', prompt: 'You have two beakers of salt water at room temperature. In Beaker A, a pinch of salt added dissolves completely.', answer: 'Beaker B contains the saturated solution',
                  options: ['Beaker B contains the saturated solution', 'looks saltier', 'a solution with a lot of solute', 'a very concentrated solution'],
                  hint: 'Review c8_physics_ch5_4 (solubility definition) and c8_physics_ch5_5 (temperature effect.',
                  misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated solution." They fail.' },
                { id: 'b', prompt: 'A student prepares a saturated solution of potassium nitrate (KNO₃) in 100 g of water at 40°C. The solubility of KNO₃ at 40°C is 64 g per 100 g water.', answer: 'Step 1: At 40°C, maximum dissolved KNO₃ = 64 g in 100 g water',
                  options: ['Step 1: At 40°C, maximum dissolved KNO₃ = 64 g in 100 g water', 'a solution with a lot of solute', 'a very concentrated solution'],
                  hint: 'Review c8_physics_ch5_4 (solubility definition) and c8_physics_ch5_5 (temperature effect.',
                  misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated solution." They fail.' },
                { id: 'c', prompt: 'Two students test different solutions for saturation by adding a single crystal of the same solute. Student X observes the crystal dissolves completely.', answer: 'Student X\'s solution is unsaturated (crystal dissolves)',
                  options: ['Student X\'s solution is unsaturated (crystal dissolves)', 'the crystal grew', 'a solution with a lot of solute', 'a very concentrated solution'],
                  hint: 'Review c8_physics_ch5_4 (solubility definition) and c8_physics_ch5_5 (temperature effect.',
                  misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated solution." They fail.' }
          ],
            remediations: { 'a-saturated-solution-is-simply': { steps: ['Have the student prepare two solutions: (a) add 5 g salt to 100 mL water (unsaturated), (b) add 40 g salt to 100.', 'Ask them to add 1 g salt to each and observe.', 'Guide them to record: "Solution A: salt dissolves → unsaturated.', 'Solution B: salt remains → saturated." 4.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "If you heat a saturated solution, it will always become unsaturated." Evaluate this statement. Is it always true? Give a reason.', answer: 'The statement is generally true for most solid solutes (like salt, sugar)',
                  options: ['The statement is generally true for most solid solutes (like salt, sugar)', 'always true because heat makes things dissolve faster', 'a solution with a lot of solute', 'a very concentrated solution'],
                  hint: 'Review c8_physics_ch5_4 (solubility definition) and c8_physics_ch5_5 (temperature effect.',
                  misconception: 'Students often think a saturated solution is simply "a solution with a lot of solute" or "a very concentrated solution." They fail.' }
          ],
            remediations: { 'a-saturated-solution-is-simply': { steps: ['Have the student prepare two solutions: (a) add 5 g salt to 100 mL water (unsaturated), (b) add 40 g salt to 100.', 'Ask them to add 1 g salt to each and observe.', 'Guide them to record: "Solution A: salt dissolves → unsaturated.', 'Solution B: salt remains → saturated." 4.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_7', difficulty: 'standard',
          question: 'Concentration of a solution qualitatively describes the relative amount.',
          hint: 'Revisit c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and perform the "add spoon.',
          misconception: 'Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are synonyms.',
          parts: [
                { id: 'a', prompt: 'A student adds one spoon of salt to a glass of water and stirs until it disappears. She adds a second spoon, it dissolves. A third spoon settles at the bottom.', answer: 'The solution is **unsaturated** (or "concentrated but unsaturated")',
                  options: ['The solution is **unsaturated** (or "concentrated but unsaturated")', 'saturated', 'solute added', 'solute dissolved'],
                  hint: 'Revisit c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and perform the "add spoon until.',
                  misconception: 'Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are synonyms.' },
                { id: 'b', prompt: 'Two beakers contain salt solutions at room temperature. Beaker A has undissolved salt crystals at the bottom. Beaker B is clear with no crystals.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'concentrated', 'saturated', 'dilute'],
                  hint: 'Revisit c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and perform the "add spoon until.',
                  misconception: 'Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are synonyms.' },
                { id: 'c', prompt: 'Rahul makes three solutions at 30°C: Solution X (saturated salt water), Solution Y (unsaturated salt water with same volume as X), Solution Z (saturated sugar.', answer: '**Ranking: X > Z > Y** (assuming similar molar solubility',
                  options: ['**Ranking: X > Z > Y** (assuming similar molar solubility', 'more water', 'clearer', 'concentrated'],
                  hint: 'Revisit c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and perform the "add spoon until.',
                  misconception: 'Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are synonyms.' },
                { id: 'd', prompt: 'A teacher shows two test tubes: Tube 1 contains a pale blue copper sulfate solution. Tube 2 contains a deep blue copper sulfate solution.', answer: 'The student\'s argument is **flawed**',
                  options: ['The student\'s argument is **flawed**', 'concentrated', 'saturated', 'dilute'],
                  hint: 'Revisit c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and perform the "add spoon until.',
                  misconception: 'Students believe "concentrated" and "saturated" are synonyms, and "dilute" and "unsaturated" are synonyms.' }
          ],
            remediations: { 'concentrated-and-saturated-are-synonyms': { steps: ['Show three glasses of water with 1, 3, and 6 spoons of salt (at room temp, 6 spoons saturates).', 'Label them: Glass 1 (dilute, unsaturated), Glass 3 (saturated).', 'Ask "What is Glass 2?" Guide them: It has more solute than Glass 1 (so not dilute), but less than max (so not.', 'Introduce term "concentrated unsaturated."'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_8', difficulty: 'standard',
          question: 'Water is called a universal solvent because its polar molecular structure.',
          hint: 'Review the water molecule structure and polarity from Class 7 chemistry (or science).',
          misconception: 'Students often think "universal solvent" means water dissolves *every* substance.',
          parts: [
                { id: 'a', prompt: 'Compare how water dissolves oxygen gas (O₂) from the air versus how it dissolves hydrogen chloride gas (HCl).', answer: 'Water\'s polarity allows it to dissolve both',
                  options: ['Water\'s polarity allows it to dissolve both', 'both just mix', 'universal solvent', 'Water is called universal, so it should dissolve anything'],
                  hint: 'Review the water molecule structure and polarity from Class 7 chemistry (or science) – specifically.',
                  misconception: 'Students often think "universal solvent" means water dissolves *every* substance.' }
          ],
            remediations: { 'universal-solvent-means-water-dissolves': { steps: ['Show a demo: Add oil to water – it forms a layer.', 'Ask: "If water dissolves everything, why doesn\'t the oil disappear?" 2.', 'Have students draw water molecules (δ+ H, δ– O) and oil molecules (long C–H chains with no charge separation).', 'Guide them to see that water\'s poles have nothing to attract in oil.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_9', difficulty: 'standard',
          question: 'Evaporation is a separation technique where a soluble solid is recovered from.',
          hint: 'Review c8_physics_ch5_1 and c8_physics_ch5_2 for solution components, and.',
          misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled.',
          parts: [
                { id: 'a', prompt: 'What is the main difference between evaporation and distillation in terms of what is collected at the end of the process?', answer: 'In evaporation, only the solid solute is collected as residue',
                  options: ['In evaporation, only the solid solute is collected as residue', 'both collect the solvent', 'distillation separates *any* mixture, e', 'a mixture of sand and water can be distilled to get pure water and sand'],
                  hint: 'Review c8_physics_ch5_1 and c8_physics_ch5_2 for solution components, and c7_physics_ch03_008 for.',
                  misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to get pure water and.' },
                { id: 'b', prompt: 'A student has 250 mL of a copper sulphate solution with a concentration of 16 g per 100 mL. She heats it to complete evaporation.', answer: 'Step 1: Identify given: volume = 250 mL, concentration = 16 g/100 mL',
                  options: ['Step 1: Identify given: volume = 250 mL, concentration = 16 g/100 mL', 'distillation separates *any* mixture, e', 'a mixture of sand and water can be distilled to get pure water and sand'],
                  hint: 'Review c8_physics_ch5_1 and c8_physics_ch5_2 for solution components, and c7_physics_ch03_008 for.',
                  misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to get pure water and.' }
          ],
            remediations: { 'distillation-separates-any-mixture': { steps: ['Show a demo: Boil muddy water in a test tube with a delivery tube into a cool test tube.', 'Ask: "Where did the mud go?" (It\'s in the first tube).', 'Contrast with filtration: Filter muddy water — same result but faster.', 'Then boil saltwater with same setup — collect clear liquid, taste (safe) or test with conductivity.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
