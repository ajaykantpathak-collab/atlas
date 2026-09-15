import type { SimDef } from '../../engine/types';

/** v3 generated — c7_chem_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_chem_ch01_p1: SimDef = {
    id: 'v3_c7_chem_ch01_p1',
    title: 'The World of Metals and Non-metals · Part 1/2',
    subtitle: 'Covers the identification, basic categorization, and common examples of metals and.',
    classLevel: 7, subject: 'chemistry', topic: 'The World of Metals and Non-metals · Part 1/2',
    chapters: ['c7_chem_ch01'],
    nodeIds: ['c7_chem_ch01_001', 'c7_chem_ch01_002', 'c7_chem_ch01_003', 'c7_chem_ch01_004', 'c7_chem_ch01_005', 'c7_chem_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When walking through your school kitchen or examining household utensils in India, you notice that pressure.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A shiny grey pencil lead gets stamped metal for its shine, while an old unpolished gold bangle gets stamped non-metal for looking dull. What single test would sort them honestly?',
        options: ['Strike them — metals like iron flatten under a hammer while non-metals like coal shatter to powder', 'Weigh them — metals are always heavier', 'Taste them — metals taste salty', 'Freeze them — only metals survive cold'],
        answer: 'Strike them — metals like iron flatten under a hammer while non-metals like coal shatter to powder',
        hook: 'Shine lies — graphite and iodine crystals gleam yet are non-metals. And the rules have rebels: mercury is a metal that flows liquid at room temperature, while bromine is a liquid non-metal.',
    },
    teaching: [
        { title: 'Introduction to Metals and Non-metals: Examples', text: 'Metals are naturally occurring chemical elements that are typically lustrous, malleable, ductile, and good conductors of heat and electricity (such as iron, copper, and aluminium), whereas non-metals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_chem_ch01_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Raid a kitchen for suspects — iron spoon, chalk, copper wire, coal — and run the shine test, the hammer test, and the wiring test to file each under metal or non-metal.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c7_chem_ch01_001', title: 'Introduction to Metals and Non-metals: Examples',
          caseStudy: { intro: 'When walking through your school kitchen or examining household utensils in India, you notice that pressure cookers are made of shiny, heavy aluminium.',
            decisions: [{ prompt: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?', options: [
                { text: 'Bromine is the correct answer', outcome: 'Bromine is the correct answer. A student who answers "Mercury" is confusing a liquid metal.' },
                { text: 'Mercury', outcome: 'Not quite — Students often assume that all shiny materials are metals and all dull materials are non-metals.', reveals: 'all-shiny-materials-are-metals' },
                { text: 'all shiny materials are metals and all dull materials are non-metals', outcome: 'Not quite — Students often assume that all shiny materials are metals and all dull materials are non-metals.', reveals: 'all-shiny-materials-are-metals' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_002', title: 'Malleability: Property of Metals Being Beaten into Sheets',
          caseStudy: { intro: 'Every day in Indian households, we see silver foil (*vark*) adorning sweets like *kaju katli*, and we wrap our school tiffin rotis in shiny aluminium foil.',
            decisions: [{ prompt: 'What term is used to describe the property of metals that allows them to be beaten into thin sheets?', options: [
                { text: 'The property is called malleability', outcome: 'The property is called malleability. A student who answers "ductility" is confusing the ability.' },
                { text: 'ductility', outcome: 'Not quite — Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten.', reveals: 'students-often-confuse-hardness-with' },
                { text: 'hardness', outcome: 'Not quite — Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten.', reveals: 'students-often-confuse-hardness-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_003', title: 'Ductility: Property of Metals Being Drawn into Wires',
          caseStudy: { intro: 'When you look at the electric wiring inside your house in India, you notice thin, flexible copper or aluminium cords supplying power to your fans and lights.',
            decisions: [{ prompt: 'What is the term used to describe the physical property of metals that allows them to be drawn into thin wires?', options: [
                { text: 'The property is called ductility', outcome: 'The property is called ductility. A student who answers "malleability" is confusing the property.' },
                { text: 'malleability', outcome: 'Not quite — Students often confuse ductility with malleability, assuming that any material that can be hammered.', reveals: 'students-often-confuse-ductility-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a science lab quiz, a student holds a grey, shiny pencil \'lead\' (graphite) and declares: \'It shines AND conducts electricity — it must be a metal.\'',
            decisions: [{ prompt: 'Is the student right?', options: [
                { text: 'No — classification needs several properties, not two convenient ones. Graphite is carbon: it shines and conducts, but it is brittle rather than malleable and lacks the metallic bond structure, so it stays a non-metal. Exceptions like this are exactly why scientists check a whole list of properties before labelling an element.', outcome: 'The pencil lead is the famous counterexample — one or two \'metal-like\' traits cannot overrule the rest; malleability and metallic bonding are absent.' },
                { text: 'The student is right — shininess plus conductivity are the metal test, so graphite qualifies.', outcome: 'Those two properties are necessary but not sufficient — graphite fails malleability and ductility, keeping it in the non-metal column.', reveals: 'two-properties-make-metal' },
                { text: 'Graphite is neither metal nor non-metal — exceptions fall outside the classification entirely.', outcome: 'Every element classifies — graphite is a non-metal with unusual properties, not a classless anomaly.', reveals: 'exceptions-are-unclassifiable' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Never judge an element by its glitter. Bend it, strike it, run a current through it — behaviour reveals what appearance hides.',
            decisions: [{ prompt: 'What comes next? The World of Metals and Non-metals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The World of Metals and Non-metals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'standard',
          question: 'Metals are naturally occurring chemical elements that are typically lustrous.',
          hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?', answer: 'Bromine is the correct answer',
                  options: ['Bromine is the correct answer', 'Mercury', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre, hardness, and.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Classify the following elements into metals and non-metals: Iron, Carbon, Oxygen, Aluminium.', answer: 'Iron and Aluminium are metals',
                  options: ['Iron and Aluminium are metals', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre, hardness, and.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All metals are solid at room temperature." Is this statement scientifically accurate? Justify your reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre, hardness, and.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Design a simple classification test using everyday kitchen items to distinguish between an iron spoon (metal) and a piece of chalk (non-metal/calcium.', answer: 'A good answer proposes: 1',
                  options: ['A good answer proposes: 1', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre, hardness, and.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_002', difficulty: 'standard',
          question: 'Malleability is the physical property of a substance that allows it to.',
          hint: 'Review c7_chem_ch01_001 to solidify the difference between metal and non-metal examples.',
          misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe the property of metals that allows them to be beaten into thin sheets?', answer: 'The property is called malleability',
                  options: ['The property is called malleability', 'ductility', 'hardness', 'malleability'],
                  hint: 'Review c7_chem_ch01_001 to solidify the difference between metal and non-metal examples before.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' },
                { id: 'b', prompt: 'A student takes a lump of sulfur and beats it with a hammer to make a thin sheet for a science project.', answer: 'Steps for prediction: 1',
                  options: ['Steps for prediction: 1', 'hardness', 'malleability'],
                  hint: 'Review c7_chem_ch01_001 to solidify the difference between metal and non-metal examples before.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' },
                { id: 'c', prompt: 'Analyze the following materials: Aluminium rod, Sulfur lump, Copper coin, Pencil lead (graphite).', answer: 'Malleable group: Aluminium rod and Copper coin',
                  options: ['Malleable group: Aluminium rod and Copper coin', 'hardness', 'malleability'],
                  hint: 'Review c7_chem_ch01_001 to solidify the difference between metal and non-metal examples before.',
                  misconception: 'Students often confuse "hardness" with "malleability," assuming that any hard object can be beaten into a sheet.' }
          ],
            remediations: { 'students-often-confuse-hardness-with': { steps: ['To correct this misconception, guide the student through a two-step comparison.', 'First, remind them of the Class 6 concept of hardness (resistance to scratching).', 'Second, demonstrate or explain that hardness measures resistance to surface scratching, whereas malleability measures.', 'Ask them to contrast diamond (hardest, brittle) with gold (softer than diamond, highly malleable) to reinforce that.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_003', difficulty: 'standard',
          question: 'Ductility is the physical property of a metal that allows it to be drawn.',
          hint: 'Review the physical characteristics of metals and non-metals from c6_chemistry_ch04_002.',
          misconception: 'Students often confuse ductility with malleability, assuming that any material that can be hammered into a sheet can.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe the physical property of metals that allows them to be drawn into thin wires?', answer: 'The property is called ductility',
                  options: ['The property is called ductility', 'malleability'],
                  hint: 'Review the physical characteristics of metals and non-metals from c6_chemistry_ch04_002 and the.',
                  misconception: 'Students often confuse ductility with malleability, assuming that any material that can be hammered into a sheet can also be automatically.' }
          ],
            remediations: { 'students-often-confuse-ductility-with': { steps: ['Clarify the difference using everyday household items: point out that aluminium foil used for packing lunch is formed.', 'Have students list 3 items made of metal wires (ductility) and 2 items made of metal sheets (malleability) to anchor.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_004', difficulty: 'standard',
          question: 'Sonority is the physical property of certain materials, particularly metals.',
          hint: 'Review basic material properties in c6_chemistry_ch04_008 to reinforce how metals differ.',
          misconception: 'Students often confuse hardness with sonority, assuming that any hard substance (such as diamond, glass, or hard.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sonority is the physical property of certain materials, particularly metals, that causes',
                  options: ['Sonority is the physical property of certain materials, particularly metals, that causes', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review basic material properties in c6_chemistry_ch04_008 to reinforce how metals differ.',
                  misconception: 'Students often confuse hardness with sonority, assuming that any hard substance (such as diamond, glass, or hard plastic) must be sonorous.' }
          ],
            remediations: { 'students-often-confuse-hardness-with': { steps: ['To fix this misconception, have the student gently tap a glass tumbler with a plastic pen, and then gently tap a steel.', 'Notice how glass gives a sharp click that stops instantly, while steel rings.', 'Explain that rigidity and hardness affect scratching, but sonority specifically requires the orderly, tightly bound.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_005', difficulty: 'standard',
          question: 'Thermal conduction is the process by which heat energy is transferred through.',
          hint: 'Review basic examples of metals (iron, copper, aluminium) and non-metals (sulfur, carbon.',
          misconception: 'Students often confuse thermal conductivity with electrical conductivity or general hardness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Thermal conduction is the process by',
                  options: ['Thermal conduction is the process by', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review basic examples of metals (iron, copper, aluminium) and non-metals (sulfur, carbon, wood).',
                  misconception: 'Students often confuse thermal conductivity with electrical conductivity or general hardness.' }
          ],
            remediations: { 'students-often-confuse-thermal-conductivity': { steps: ['To fix this misconception, perform a direct comparative demonstration: Take a copper wire and a wooden or graphite.', 'Gently warm one end of both with a low flame while holding the other end.', 'Students will immediately feel the heat reach their fingers through the copper wire within seconds, while the graphite.', 'Emphasize that thermal conduction relies on how thermal energy is passed particle-to-particle through the material\'s.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_006', difficulty: 'standard',
          question: 'Metals are good conductors of electricity, allowing electric current to pass.',
          hint: 'Review simple electrical circuits and the basic physical properties of metals versus.',
          misconception: 'Students often believe that all solid non-metals are insulators under all conditions, completely forgetting about.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Metals are good conductors of electricity, allowing electric current to pass through them',
                  options: ['Metals are good conductors of electricity, allowing electric current to pass through them', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review simple electrical circuits and the basic physical properties of metals versus non-metals.',
                  misconception: 'Students often believe that all solid non-metals are insulators under all conditions, completely forgetting about graphite.' }
          ],
            remediations: { 'all-solid-non-metals-are': { steps: ['To fix this misconception, have the student take an ordinary wooden pencil sharpened at both ends, break the wooden.', 'Observe that the bulb lights up, proving that some non-metals (like graphite) conduct electricity.', 'Then, discuss how heat transfer and electron flow are two different physical processes.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
