import type { SimDef } from '../../engine/types';
import C7_ScienceTheWorldOfMetalsAndSim from '../../../simulations/c6_12/C7_ScienceTheWorldOfMetalsAndSim';

/** v3 wrapped master — C7_ScienceTheWorldOfMetalsAndSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_sciencetheworldofmetalsandsim: SimDef = {
    id: 'v3w_c7_sciencetheworldofmetalsandsim',
    title: 'Introduction to Metals and Non-metals: Examples',
    subtitle: 'Covers the identification, basic categorization, and common examples of metals and.',
    classLevel: 7, subject: 'science', topic: 'Introduction to Metals and Non-metals: Examples',
    chapters: [],
    nodeIds: ['c7_chem_ch01_001', 'c7_chem_ch01_008', 'c7_chem_ch01_002', 'c7_chem_ch01_003', 'c7_chem_ch01_004', 'c7_chem_ch01_005', 'c7_chem_ch01_006', 'c7_chem_ch01_007', 'c7_chem_ch01_009', 'c7_chem_ch01_010', 'c7_chem_ch01_011', 'c7_chem_ch01_012', 'c7_physics_ch01_004', 'c7_physics_ch01_008', 'c7_physics_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When walking through your school kitchen or examining household utensils in India, you notice that pressure.', goal: 'Master Introduction to Metals and Non-metals: Examples.' },
    discovery: {
        question: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?',
        options: ['Bromine is the correct answer', 'Mercury', 'all shiny materials are metals and all dull materials are non-metals'],
        answer: 'Bromine is the correct answer',
        hook: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
    },
    teaching: [
        { title: 'Metals are naturally occurring chemical.', text: 'Metals are naturally occurring chemical elements that are typically lustrous, malleable, ductile, and good conductors of heat and electricity (such as iron, copper, and aluminium), whereas non-metals.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_chem_ch01_001', title: 'Metals are naturally occurring chemical.',
          scaffold: { problem: 'A student collects four unknown substances from the laboratory: Substance A (shiny grey solid, bends without breaking), Substance B (yellow.',
            steps: [
            { text: 'Examine the physical state and appearance of Substance A (shiny grey solid, bends).' },
            { text: 'Conclude that Substance A is a metal because it is malleable and lustrous.' },
            { text: 'Examine Substances B, C, and D: B is a brittle yellow powder (sulfur), C is a liquid metal (mercury - wait, let\'s look.' },
            { text: 'Group Substance A (metal), Substance B (non-metal), Substance C (metal - mercury), and Substance D (non-metal).' },
            { text: 'Verify classifications against standard chemical properties (lustre, state, malleability).', faded: true, blankAnswer: 'Substance A: Metal, Substance B: Non-metal, Substance C:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_008', title: 'Corrosion is the gradual destruction or.',
          scaffold: { problem: 'A farmer in Punjab wants to protect his iron plough from corroding during the monsoon season.',
            steps: [
            { text: 'Identify the destructive agents causing corrosion on the iron plough: atmospheric oxygen ($O_2$) and moisture ($H_2O$).' },
            { text: 'Write the target chemical reaction equation for rust formation: $4Fe + 3O_2 + xH_2O \\rightarrow 2Fe_2O_3 \\cdot xH_2O$.' },
            { text: 'Evaluate paint and grease: Both act as physical surface barriers preventing contact with air and water, but grease can.' },
            { text: 'Evaluate galvanization: Coating iron with a thin layer of zinc provides both a physical barrier and electrochemical.' },
            { text: 'Conclude the best method: Galvanization or heavy-duty epoxy painting with regular maintenance offers the most robust.', faded: true, blankAnswer: 'Galvanization or protective epoxy coating combined with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_002', title: 'Malleability is the physical property.',
          scaffold: { problem: 'A kitchen worker in a hotel in Mumbai wants to flatten a thick block of silver to make decorative confectionery foil (*vark*).',
            steps: [
            { text: 'Identify the material (silver) and its classification as a metal.' },
            { text: 'Recall the key physical property of metals that permits permanent deformation under compressive force (malleability).' },
            { text: 'Apply mechanical force using a clean hammer or roller on the silver block, noting that the metal layers slide over one.' },
            { text: 'Verify the final result: the silver block transforms into an extremely thin, flexible sheet of foil suitable for food.', faded: true, blankAnswer: 'The silver block successfully converts into thin foil due.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_003', title: 'Ductility is the physical property of a.',
          scaffold: { problem: 'An artisan in Jaipur has a thick block of pure silver weighing 50 grams and wants to convert it into a decorative silver wire for.',
            steps: [
            { text: 'Identify that silver is a metal known for high ductility and lustre, making it suitable for fine wire drawing.' },
            { text: 'Recognize that the process requires applying a pulling (tensile) force rather than a compressive hammering force.' },
            { text: 'Heat the silver block slightly to increase its workability and reduce internal stress.' },
            { text: 'Pull the silver through a series of progressively smaller holes in a steel plate (drawplate) to elongate it into a wire.' },
            { text: 'Verify that the final product is a continuous, flexible silver wire, confirming the property of ductility.', faded: true, blankAnswer: 'A continuous silver wire formed through the tensile pulling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_004', title: 'Sonority is the physical property of.',
          scaffold: { problem: 'A brass musical instrument maker in Moradabad is testing two raw rods—one made of brass (an alloy of copper and zinc) and one made of.',
            steps: [
            { text: 'Suspend each rod freely by a light thread to ensure air-damping is minimized.' },
            { text: 'Strike each rod gently with a small wooden mallet using equal force.' },
            { text: 'Listen closely to the acoustic output and measure how long the sound reverberates.' },
            { text: 'Observe that the brass rod produces a high-pitched, sustained ringing sound, while the graphite rod produces a dull,.' },
            { text: 'Conclude that the brass rod is sonorous due to its metallic alloy composition, making it suitable for cymbals.', faded: true, blankAnswer: 'The brass rod is sonorous and suitable for cymbals because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_005', title: 'Thermal conduction is the process by.',
          scaffold: { problem: 'An engineer in Pune is designing a solar water heater storage tank.',
            steps: [
            { text: 'Identify the two parts of the system requiring thermal property management: the inner container (needs high heat.' },
            { text: 'Recall the thermal properties of the candidate materials: aluminium is a metal and an excellent thermal conductor; cork.' },
            { text: 'Match the requirement of the inner container (efficient heat transfer to water) with aluminium\'s high thermal.' },
            { text: 'Match the requirement of the outer jacket (preventing heat escape into the surrounding air) with cork\'s property as a.' },
            { text: 'Conclude that aluminium should be used for the inner container and cork for the outer jacket.', faded: true, blankAnswer: 'Aluminium for the inner container (thermal conductor) and.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_chem_ch01_008', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Metals and Non-metals: Examples', spots: [
            { id: 's1', label: 'Metals are naturally occurring chemical', prompt: 'Which idea is this? — Metals are naturally occurring chemical elements that are typically lustrous, malleable,.', answer: 'Metals are naturally occurring chemical', options: ['Metals are naturally occurring chemical', 'Corrosion is the gradual destruction', 'Malleability is the physical property', 'Ductility is the physical property'] },
            { id: 's2', label: 'Corrosion is the gradual destruction', prompt: 'Which idea is this? — Corrosion is the gradual destruction or degradation of metals through chemical or.', answer: 'Corrosion is the gradual destruction', options: ['Corrosion is the gradual destruction', 'Metals are naturally occurring chemical', 'Malleability is the physical property', 'Ductility is the physical property'] },
            { id: 's3', label: 'Malleability is the physical property', prompt: 'Which idea is this? — Malleability is the physical property of a substance that allows it to be beaten, rolled,.', answer: 'Malleability is the physical property', options: ['Malleability is the physical property', 'Metals are naturally occurring chemical', 'Corrosion is the gradual destruction', 'Ductility is the physical property'] },
            { id: 's4', label: 'Ductility is the physical property', prompt: 'Which idea is this? — Ductility is the physical property of a metal that allows it to be drawn or stretched.', answer: 'Ductility is the physical property', options: ['Ductility is the physical property', 'Metals are naturally occurring chemical', 'Corrosion is the gradual destruction', 'Malleability is the physical property'] },
            { id: 's5', label: 'Sonority is the physical property', prompt: 'Which idea is this? — Sonority is the physical property of certain materials, particularly metals, that causes.', answer: 'Sonority is the physical property', options: ['Sonority is the physical property', 'Metals are naturally occurring chemical', 'Corrosion is the gradual destruction', 'Malleability is the physical property'] },
            { id: 's6', label: 'Thermal conduction is the process', prompt: 'Which idea is this? — Thermal conduction is the process by which heat energy is transferred through a substance.', answer: 'Thermal conduction is the process', options: ['Thermal conduction is the process', 'Metals are naturally occurring chemical', 'Corrosion is the gradual destruction', 'Malleability is the physical property'] }
          ] } }
    ],
    explore: { component: C7_ScienceTheWorldOfMetalsAndSim, prompt: 'Explore the interactive — Introduction to Metals and Non-metals: Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'standard',
          question: 'Metals are naturally occurring chemical elements that are typically lustrous,.',
          hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre,.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?', answer: 'Bromine is the correct answer',
                  options: ['Bromine is the correct answer', 'Mercury', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Classify the following elements into metals and non-metals: Iron, Carbon, Oxygen, Aluminium.', answer: 'Iron and Aluminium are metals',
                  options: ['Iron and Aluminium are metals', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All metals are solid at room temperature." Is this statement scientifically accurate? Justify your reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Design a simple classification test using everyday kitchen items to distinguish between an iron spoon (metal) and a piece of chalk (non-metal/calcium.', answer: 'A good answer proposes: 1',
                  options: ['A good answer proposes: 1', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_008', difficulty: 'standard',
          question: 'Corrosion is the gradual destruction or degradation of metals through chemical.',
          hint: 'Review c7_chem_ch01_007 to reinforce how oxygen and water interact with iron surfaces.',
          misconception: 'Students often believe that "rust" is a general term for any kind of metal damage or dirt on any metal surface.',
          parts: [
                { id: 'a', prompt: 'What are the two essential environmental factors required for the rusting of iron to occur?', answer: 'The two essential factors are oxygen (from the air) and moisture (water)',
                  options: ['The two essential factors are oxygen (from the air) and moisture (water)', 'or only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "rust" is a general term for any kind of metal damage or dirt on any metal surface.' }
          ],
            remediations: { 'rust-is-a-general-term': { steps: ['To correct this, guide the student to examine three different tarnished or corroded items: a rusted iron nail, an old.', 'Have them write down the distinct colors and chemical names for each product: hydrated iron oxide for iron, basic.', 'Emphasize that "rusting" is exclusively reserved for iron and steel.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_002', difficulty: 'standard',
          question: 'Malleability is the physical property of a substance that allows it to be.',
          hint: 'Review c7_chem_ch01_001 to solidify the difference between metal and non-metal examples.',
          misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe the property of metals that allows them to be beaten into thin sheets?', answer: 'The property is called malleability',
                  options: ['The property is called malleability', 'ductility', 'hardness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' },
                { id: 'b', prompt: 'A student takes a lump of sulfur and beats it with a hammer to make a thin sheet for a science project.', answer: 'Steps for prediction: 1',
                  options: ['Steps for prediction: 1', 'hardness', 'malleability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' },
                { id: 'c', prompt: 'Analyze the following materials: Aluminium rod, Sulfur lump, Copper coin, Pencil lead (graphite).', answer: 'Malleable group: Aluminium rod and Copper coin',
                  options: ['Malleable group: Aluminium rod and Copper coin', 'hardness', 'malleability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' }
          ],
            remediations: { 'students-often-confuse-hardness-with': { steps: ['To correct this misconception, guide the student through a two-step comparison.', 'First, remind them of the Class 6 concept of hardness (resistance to scratching).', 'Second, demonstrate or explain that hardness measures resistance to surface scratching, whereas malleability measures.', 'Ask them to contrast diamond (hardest, brittle) with gold (softer than diamond, highly malleable) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All solid materials found in nature can be beaten into thin sheets if enough force is applied." Is this scientifically correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'hardness', 'malleability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' }
          ],
            remediations: { 'students-often-confuse-hardness-with': { steps: ['To correct this misconception, guide the student through a two-step comparison.', 'First, remind them of the Class 6 concept of hardness (resistance to scratching).', 'Second, demonstrate or explain that hardness measures resistance to surface scratching, whereas malleability measures.', 'Ask them to contrast diamond (hardest, brittle) with gold (softer than diamond, highly malleable) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_003', difficulty: 'standard',
          question: 'Ductility is the physical property of a metal that allows it to be drawn or.',
          hint: 'Review the physical characteristics of metals and non-metals from c6_chemistry_ch04_002.',
          misconception: 'Students often confuse ductility with malleability, assuming that any material that can be hammered into a sheet can.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe the physical property of metals that allows them to be drawn into thin wires?', answer: 'The property is called ductility',
                  options: ['The property is called ductility', 'malleability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse ductility with malleability, assuming that any material that can be hammered into a sheet can also be automatically.' }
          ],
            remediations: { 'students-often-confuse-ductility-with': { steps: ['Clarify the difference using everyday household items: point out that aluminium foil used for packing lunch is formed.', 'Have students list 3 items made of metal wires (ductility) and 2 items made of metal sheets (malleability) to anchor.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_004', difficulty: 'standard',
          question: 'Sonority is the physical property of certain materials, particularly metals,.',
          hint: 'Review basic material properties in c6_chemistry_ch04_008 to reinforce how metals differ.',
          misconception: 'Students often confuse hardness with sonority, assuming that any hard substance (such as diamond, glass, or hard.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sonority is the physical property of certain materials, particularly metals, that causes',
                  options: ['Sonority is the physical property of certain materials, particularly metals, that causes', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Corrosion is the gradual destruction or degradation of metals through chemical or', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse hardness with sonority, assuming that any hard substance (such as diamond, glass, or hard plastic) must be sonorous.' }
          ],
            remediations: { 'students-often-confuse-hardness-with': { steps: ['To fix this misconception, have the student gently tap a glass tumbler with a plastic pen, and then gently tap a steel.', 'Notice how glass gives a sharp click that stops instantly, while steel rings.', 'Explain that rigidity and hardness affect scratching, but sonority specifically requires the orderly, tightly bound.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_005', difficulty: 'standard',
          question: 'Thermal conduction is the process by which heat energy is transferred through a.',
          hint: 'Review basic examples of metals (iron, copper, aluminium) and non-metals (sulfur, carbon,.',
          misconception: 'Students often confuse thermal conductivity with electrical conductivity or general hardness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Thermal conduction is the process by',
                  options: ['Thermal conduction is the process by', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Corrosion is the gradual destruction or degradation of metals through chemical or', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse thermal conductivity with electrical conductivity or general hardness.' }
          ],
            remediations: { 'students-often-confuse-thermal-conductivity': { steps: ['To fix this misconception, perform a direct comparative demonstration: Take a copper wire and a wooden or graphite.', 'Gently warm one end of both with a low flame while holding the other end.', 'Students will immediately feel the heat reach their fingers through the copper wire within seconds, while the graphite.', 'Emphasize that thermal conduction relies on how thermal energy is passed particle-to-particle through the material\'s.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
