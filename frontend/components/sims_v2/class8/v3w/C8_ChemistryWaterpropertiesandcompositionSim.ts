import type { SimDef } from '../../engine/types';
import C8_ChemistryWaterpropertiesandcompositionSim from '../../../simulations/c6_12/C8_ChemistryWaterpropertiesandcompositionSim';

/** v3 wrapped master — C8_ChemistryWaterpropertiesandcompositionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_chemistrywaterpropertiesandcompositionsim: SimDef = {
    id: 'v3w_c8_chemistrywaterpropertiesandcompositionsim',
    title: 'Properties of Common Compounds: Water, Carbon Dioxide',
    subtitle: 'Covers the physical properties (boiling point, freezing point, appearance, solubility).',
    classLevel: 8, subject: 'chemistry', topic: 'Properties of Common Compounds: Water, Carbon Dioxide',
    chapters: [],
    nodeIds: ['c8_chem_ch3_12', 'c8_chem_ch3_2', 'c8_chem_ch3_3', 'c8_chem_ch3_9', 'c8_chem_ch3_4', 'c8_chem_ch2_4', 'c8_chem_ch3_1', 'c8_chem_ch3_10', 'c8_chem_ch3_11', 'c8_chem_ch2_1', 'c8_chem_ch3_5', 'c8_chem_ch3_8', 'c8_chem_ch2_2'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'When you open a cold bottle of a fizzy soft drink in summer, you see bubbles escaping; that gas is carbon.', goal: 'Master Properties of Common Compounds: Water, Carbon Dioxide.' },
    discovery: {
        question: 'What term is used to describe a mixture that has a uniform composition throughout?',
        options: ['A homogeneous mixture', 'heterogeneous', 'if a mixture is liquid, it must automatically be homogeneous'],
        answer: 'A homogeneous mixture',
        hook: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.',
    },
    teaching: [
        { title: 'Water ($H_2O$) and carbon dioxide ($CO_2$).', text: 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical compounds on Earth.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_chem_ch3_12', title: 'Water ($H_2O$) and carbon dioxide.',
          scaffold: { problem: 'A student collects a gas produced during the action of dilute hydrochloric acid on marble chips ($CaCO_3$).',
            steps: [
            { text: 'Identify the reactants in the reaction producing the gas: marble chips ($CaCO_3$) react with hydrochloric acid ($HCl$).' },
            { text: 'Write the formula for the test reagent, which is limewater, chemically known as calcium hydroxide solution:.' },
            { text: 'Formulate the chemical equation for the reaction between the evolved gas and limewater: $Ca(OH)_2(aq) + CO_2(g).' },
            { text: 'Interpret the visual change based on the products formed: the white solid formed is insoluble calcium carbonate.', faded: true, blankAnswer: 'The gas is carbon dioxide ($CO_2$), and the observation is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch3_2', title: 'A homogeneous mixture has a uniform.',
          scaffold: { problem: 'A student mixes 5 g of iron filings with 20 g of sulfur powder in a china dish at room temperature.',
            steps: [
            { text: 'Identify the components mixed together: iron filings (solid element) and sulfur powder (solid element).' },
            { text: 'Examine the physical appearance under magnification as stated in the problem.' },
            { text: 'Check if the components have blended into a single uniform phase throughout the container.' },
            { text: 'Conclude that individual particles remain distinct and can be separated mechanically.' },
            { text: 'Assign the correct classification as a heterogeneous mixture based on non-uniform composition.', faded: true, blankAnswer: 'Heterogeneous mixture because iron and sulfur particles are.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch3_3', title: 'Air is a homogeneous mixture of various.',
          scaffold: { problem: 'A science laboratory in Chennai collects a 250 L sample of dry air in a container.',
            steps: [
            { text: 'Identify the total volume of dry air, which is 250 L, and the percentage values for nitrogen (78%) and argon (0.9%).' },
            { text: 'Set up the formula for finding the component volume: (Percentage / 100) * Total Volume.' },
            { text: 'Calculate the volume of nitrogen: (78 / 100) * 250 L = 0.78 * 250 = 195 L.' },
            { text: 'Calculate the volume of argon: (0.9 / 100) * 250 L = 0.009 * 250 = 2.25 L.' },
            { text: 'Verify the results by ensuring the individual volumes reflect their relative proportions in the mixture.', faded: true, blankAnswer: 'Nitrogen = 195 L, Argon = 2.25 L' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch3_9', title: 'A compound is a pure substance composed.',
          scaffold: { problem: 'Pure water ($H_2O$) is decomposed in a laboratory experiment by electrolysis into hydrogen gas ($H_2$) and oxygen gas ($O_2$).',
            steps: [
            { text: 'Identify total mass of the compound starting the reaction ($18\\text{ g}$ of $H_2O$).' },
            { text: 'Identify the mass of one product obtained from decomposition ($2\\text{ g}$ of $H_2$).' },
            { text: 'Apply the Law of Conservation of Mass to find the missing product mass: $\\text{Mass of } O_2 = \\text{Total mass of }.' },
            { text: 'Calculate mass of oxygen: $18\\text{ g} - 2\\text{ g} = 16\\text{ g}$ of $O_2$.' },
            { text: 'Express the mass ratio of hydrogen to oxygen: $2\\text{ g} : 16\\text{ g}$, which simplifies to $1:8$.', faded: true, blankAnswer: '$16\\text{ g}$ of oxygen gas; mass ratio of hydrogen to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch3_4', title: 'Filtration and sedimentation are.',
          scaffold: { problem: 'A science teacher gives a student 250 mL of muddy well water containing 15 g of suspended clay particles and asks them to recover the dry.',
            steps: [
            { text: 'Pour the muddy water into a tall beaker and let it stand undisturbed for 30 minutes to allow sedimentation.' },
            { text: 'Carefully pour off the top clear liquid (supernatant) into another container without disturbing the settled mud at the.' },
            { text: 'Collect the concentrated mud slurry left at the bottom along with a small amount of water.' },
            { text: 'Prepare a funnel with filter paper, wet it slightly with distilled water, and pour the mud slurry through the filter.' },
            { text: 'Collect the wet clay residue on the filter paper, dry it in the sun or oven, and weigh to recover the dry clay.', faded: true, blankAnswer: '15 g of dry clay recovered on the filter paper.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch2_4', title: 'A molecule is a group of two or more.',
          scaffold: { problem: 'A sample of pure water taken from a kitchen tap in Mumbai contains hydrogen and oxygen.',
            steps: [
            { text: 'Identify the constituent atoms per molecule from the problem description: 2 Hydrogen (H) atoms and 1 Oxygen (O) atoms.' },
            { text: 'Write the chemical formula for a single molecule by combining the symbols with their respective subscripts: $H_2O$.' },
            { text: 'Calculate the total number of atoms in one molecule: 2 (from hydrogen) + 1 (from oxygen) = 3 atoms per molecule.' },
            { text: 'Multiply the atoms per molecule by the total number of molecules given (3 molecules): 3 molecules $\\times$ 3.' },
            { text: 'Verify the calculation and state the final result clearly with appropriate units.', faded: true, blankAnswer: 'Chemical formula is $H_2O$; total number of atoms in 3.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_chem_ch3_2', title: 'Identify each idea',
          dissect: { specimen: 'Properties of Common Compounds: Water, Carbon Dioxide', spots: [
            { id: 's1', label: 'Water H_2O and carbon dioxide', prompt: 'Which idea is this? — Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical.', answer: 'Water H_2O and carbon dioxide', options: ['Water H_2O and carbon dioxide', 'A homogeneous mixture has a', 'Air is a homogeneous mixture', 'A compound is a pure'] },
            { id: 's2', label: 'A homogeneous mixture has a', prompt: 'Which idea is this? — A homogeneous mixture has a uniform composition throughout, meaning its components are.', answer: 'A homogeneous mixture has a', options: ['A homogeneous mixture has a', 'Water H_2O and carbon dioxide', 'Air is a homogeneous mixture', 'A compound is a pure'] },
            { id: 's3', label: 'Air is a homogeneous mixture', prompt: 'Which idea is this? — Air is a homogeneous mixture of various gases, primarily nitrogen (approx.', answer: 'Air is a homogeneous mixture', options: ['Air is a homogeneous mixture', 'Water H_2O and carbon dioxide', 'A homogeneous mixture has a', 'A compound is a pure'] },
            { id: 's4', label: 'A compound is a pure', prompt: 'Which idea is this? — A compound is a pure substance composed of two or more different elements chemically.', answer: 'A compound is a pure', options: ['A compound is a pure', 'Water H_2O and carbon dioxide', 'A homogeneous mixture has a', 'Air is a homogeneous mixture'] },
            { id: 's5', label: 'Filtration and sedimentation are physical', prompt: 'Which idea is this? — Filtration and sedimentation are physical methods used to separate insoluble solid.', answer: 'Filtration and sedimentation are physical', options: ['Filtration and sedimentation are physical', 'Water H_2O and carbon dioxide', 'A homogeneous mixture has a', 'Air is a homogeneous mixture'] },
            { id: 's6', label: 'A molecule is a group', prompt: 'Which idea is this? — A molecule is a group of two or more atoms chemically combined together in a fixed ratio,.', answer: 'A molecule is a group', options: ['A molecule is a group', 'Water H_2O and carbon dioxide', 'A homogeneous mixture has a', 'Air is a homogeneous mixture'] }
          ] } }
    ],
    explore: { component: C8_ChemistryWaterpropertiesandcompositionSim, prompt: 'Explore the interactive — Properties of Common Compounds: Water, Carbon Dioxide' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch3_12', difficulty: 'standard',
          question: 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital.',
          hint: 'Review the definition of compounds in c8_chem_ch3_9 and revisit how chemical bonding.',
          misconception: 'Students often think that carbon dioxide is poisonous because it suffocates living beings, leading them to classify it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical',
                  options: ['Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A homogeneous mixture has a uniform composition throughout, meaning its components are', 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx', 'A compound is a pure substance composed of two or more different elements chemically'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that carbon dioxide is poisonous because it suffocates living beings, leading them to classify it as a toxic chemical.' }
          ],
            remediations: { 'carbon-dioxide-is-poisonous-because': { steps: ['To correct this misconception, guide the student through a controlled investigation: remind them that we exhale carbon.', 'Demonstrate that when $CO_2$ dissolves in water under pressure, opening the cap releases the gas back out physically.', 'Emphasize the difference between suffocation due to lack of oxygen versus direct cellular poisoning.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_2', difficulty: 'standard',
          question: 'A homogeneous mixture has a uniform composition throughout, meaning its.',
          hint: 'Review basic solubility properties from Class 6 materials properties chapters before.',
          misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe a mixture that has a uniform composition throughout?', answer: 'A homogeneous mixture',
                  options: ['A homogeneous mixture', 'heterogeneous', 'if a mixture is liquid, it must automatically be homogeneous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.' }
          ],
            remediations: { 'if-a-mixture-is-liquid': { steps: ['To fix this, take a clear glass of water and mix a spoonful of turmeric powder or chalk dust into it.', 'Shine a flashlight through the glass to show light scattering (Tyndall effect) and let it sit for a few minutes to show.', 'Emphasize that if you can see distinct parts, floating bits, or cloudiness due to undissolved matter, the mixture is.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether muddy water collected from a puddle after rain can be classified as a homogeneous mixture if it is left undisturbed for five minutes.', answer: 'Muddy water remains heterogeneous even after standing',
                  options: ['Muddy water remains heterogeneous even after standing', 'if a mixture is liquid, it must automatically be homogeneous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.' }
          ],
            remediations: { 'if-a-mixture-is-liquid': { steps: ['To fix this, take a clear glass of water and mix a spoonful of turmeric powder or chalk dust into it.', 'Shine a flashlight through the glass to show light scattering (Tyndall effect) and let it sit for a few minutes to show.', 'Emphasize that if you can see distinct parts, floating bits, or cloudiness due to undissolved matter, the mixture is.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_3', difficulty: 'standard',
          question: 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx.',
          hint: 'Review c8_chem_ch3_1 to reinforce the core characteristics of mixtures before studying.',
          misconception: 'Students often think that because air is invisible and homogeneous, it must be a chemical compound (like water, H2O).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx',
                  options: ['Air is a homogeneous mixture of various gases, primarily nitrogen (approx', 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A homogeneous mixture has a uniform composition throughout, meaning its components are', 'A compound is a pure substance composed of two or more different elements chemically'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because air is invisible and homogeneous, it must be a chemical compound (like water, H2O) rather than a mixture.' }
          ],
            remediations: { 'because-air-is-invisible-and': { steps: ['Remind students of the definition of a compound, where elements combine in fixed mass ratios to form a brand new.', 'Contrast this with air, where oxygen and nitrogen can be separated by simply liquefying air and boiling it off at.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_9', difficulty: 'standard',
          question: 'A compound is a pure substance composed of two or more different elements.',
          hint: 'Review c8_chem_ch3_8 to reinforce the definition of elements before studying how they.',
          misconception: 'Students often think that because a compound contains certain elements, it will exhibit the properties of those.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A compound is a pure substance composed of two or more different elements chemically',
                  options: ['A compound is a pure substance composed of two or more different elements chemically', 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A homogeneous mixture has a uniform composition throughout, meaning its components are', 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because a compound contains certain elements, it will exhibit the properties of those elements.' }
          ],
            remediations: { 'because-a-compound-contains-certain': { steps: ['Remind the student that chemical combination creates an entirely new substance with completely new properties.', 'Demonstrate or explain how sodium (a reactive metal) and chlorine (a toxic gas) react to form harmless, edible salt.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_4', difficulty: 'standard',
          question: 'Filtration and sedimentation are physical methods used to separate insoluble.',
          hint: 'Review c6_chemistry_ch04_002 to reinforce the property of solubility and what happens.',
          misconception: 'Students often believe that filtration separates dissolved solids (like sugar or salt from water) just like it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Filtration and sedimentation are physical methods used to separate insoluble solid',
                  options: ['Filtration and sedimentation are physical methods used to separate insoluble solid', 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A homogeneous mixture has a uniform composition throughout, meaning its components are', 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that filtration separates dissolved solids (like sugar or salt from water) just like it separates insoluble solids.' }
          ],
            remediations: { 'filtration-separates-dissolved-solids-like': { steps: ['Remind the student of the particle model of matter: dissolved substances break down into tiny individual molecules or.', 'Demonstrate by showing that salt water passes straight through filter paper leaving no residue, whereas sand leaves a.'] } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_4', difficulty: 'standard',
          question: 'A molecule is a group of two or more atoms chemically combined together in a.',
          hint: 'Review node c8_chem_ch2_3 to reinforce what an individual atom is before attempting to.',
          misconception: 'Students often confuse the subscript number in a chemical formula with the number of molecules, thinking that $2H_2O$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A molecule is a group of two or more atoms chemically combined together in a fixed ratio,',
                  options: ['A molecule is a group of two or more atoms chemically combined together in a fixed ratio,', 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A homogeneous mixture has a uniform composition throughout, meaning its components are', 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the subscript number in a chemical formula with the number of molecules, thinking that $2H_2O$ means two separate.' }
          ],
            remediations: { 'students-often-confuse-the-subscript': { steps: ['To fix this error, use visual particle cards: draw one large oxygen circle bonded to two small hydrogen circles to.', 'Next, compare $H_2O$ (water) with $H_2O_2$ (hydrogen peroxide) to demonstrate how changing the subscript completely.', 'Have the student physically count the atoms in diagrams for $O_2$, $H_2O$, and $CO_2$ multiple times until the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
