import type { SimDef } from '../../engine/types';

/** v3 generated — c7_chem_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_chem_ch01_p2: SimDef = {
    id: 'v3_c7_chem_ch01_p2',
    title: 'The World of Metals and Non-metals · Part 2/2',
    subtitle: 'This node covers the specific chemical reaction of iron with air and water to form rust.',
    classLevel: 7, subject: 'chemistry', topic: 'The World of Metals and Non-metals · Part 2/2',
    chapters: ['c7_chem_ch01'],
    nodeIds: ['c7_chem_ch01_007', 'c7_chem_ch01_008', 'c7_chem_ch01_009', 'c7_chem_ch01_010', 'c7_chem_ch01_011', 'c7_chem_ch01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Walk past any iron balcony rail or discarded bicycle chain in an Indian courtyard during the humid monsoon.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A shiny grey pencil lead gets stamped metal for its shine, while an old unpolished gold bangle gets stamped non-metal for looking dull. What single test would sort them honestly?',
        options: ['Strike them — metals like iron flatten under a hammer while non-metals like coal shatter to powder', 'Weigh them — metals are always heavier', 'Taste them — metals taste salty', 'Freeze them — only metals survive cold'],
        answer: 'Strike them — metals like iron flatten under a hammer while non-metals like coal shatter to powder',
        hook: 'Shine lies — graphite and iodine crystals gleam yet are non-metals. And the rules have rebels: mercury is a metal that flows liquid at room temperature, while bromine is a liquid non-metal.',
    },
    teaching: [
        { title: 'Effect of Air and Water on Metals: Rusting of Iron', text: 'The rusting of iron is a chemical process in which iron metal reacts in the presence of both oxygen ($O_2$) and moisture ($H_2O$) to form a reddish-brown, flaky, hydrated iron(III) oxide, commonly.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_chem_ch01_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Raid a kitchen for suspects — iron spoon, chalk, copper wire, coal — and run the shine test, the hammer test, and the wiring test to file each under metal or non-metal.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c7_chem_ch01_008', title: 'Corrosion: Process and Prevention Methods',
          caseStudy: { intro: 'Every monsoon in India, iron gates, window grills, and bicycle chains develop a reddish-brown flaky coating if left unprotected.',
            decisions: [{ prompt: 'What are the two essential environmental factors required for the rusting of iron to occur?', options: [
                { text: 'The two essential factors are oxygen (from the air) and moisture (water)', outcome: 'The two essential factors are oxygen (from the air) and moisture (water).' },
                { text: 'or only', outcome: 'Not quite — Students often believe that "rust" is a general term for any kind of metal damage or dirt on any.', reveals: 'rust-is-a-general-term' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_010', title: 'Are Non-metals Essential in Daily Life?',
          caseStudy: { intro: 'Every time you take a deep breath, you inhale oxygen gas, a non-metal that powers your body\'s energy production.',
            decisions: [{ prompt: 'Which essential non-metal gas makes up about 78% of Earth\'s atmosphere and is crucial for plant growth through compounds in fertilizers?', options: [
                { text: 'Nitrogen ($N_2$)', outcome: 'Nitrogen ($N_2$). A wrong answer such as "oxygen" reveals a confusion between the gas we breathe.' },
                { text: 'oxygen', outcome: 'Not quite — Students often think that "non-metals" are completely useless or inactive because they are poor.', reveals: 'non-metals-are-completely-useless' },
                { text: 'non-metals', outcome: 'Not quite — Students often think that "non-metals" are completely useless or inactive because they are poor.', reveals: 'non-metals-are-completely-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_012', title: 'Reactivity of Metals with Oxygen, Water and Acids',
          caseStudy: { intro: 'When you leave an iron tawa or spade out in the humid courtyard during the monsoon, you notice a reddish-brown flaky coating forming on its surface.',
            decisions: [{ prompt: 'What gas is typically released when a reactive metal like zinc reacts with a dilute acid such as hydrochloric acid?', options: [
                { text: 'Hydrogen gas is released', outcome: 'Hydrogen gas is released. A student who answers "oxygen" or "carbon dioxide" is confusing the gas.' },
                { text: 'oxygen', outcome: 'Not quite — Students often memorize that "all metals react with acids and water to produce hydrogen gas,".', reveals: 'students-often-memorize-that-all' },
                { text: 'carbon dioxide', outcome: 'Not quite — Students often memorize that "all metals react with acids and water to produce hydrogen gas,".', reveals: 'students-often-memorize-that-all' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a science lab quiz, a student holds a grey, shiny pencil \'lead\' (graphite) and declares: \'It shines AND conducts electricity — it must be a metal.\'',
            decisions: [{ prompt: 'Is the student right?', options: [
                { text: 'No — classification needs several properties, not two convenient ones. Graphite is carbon: it shines and conducts, but it is brittle rather than malleable and lacks the metallic bond structure, so it stays a non-metal. Exceptions like this are exactly why scientists check a whole list of properties before labelling an element.', outcome: 'The pencil lead is the famous counterexample — one or two \'metal-like\' traits cannot overrule the rest; malleability and metallic bonding are absent.' },
                { text: 'The student is right — shininess plus conductivity are the metal test, so graphite qualifies.', outcome: 'Those two properties are necessary but not sufficient — graphite fails malleability and ductility, keeping it in the non-metal column.', reveals: 'two-properties-make-metal' },
                { text: 'Graphite is neither metal nor non-metal — exceptions fall outside the classification entirely.', outcome: 'Every element classifies — graphite is a non-metal with unusual properties, not a classless anomaly.', reveals: 'exceptions-are-unclassifiable' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch01_012', title: 'You made it',
          caseStudy: { intro: 'Never judge an element by its glitter. Bend it, strike it, run a current through it — behaviour reveals what appearance hides.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch01_007', difficulty: 'standard',
          question: 'The rusting of iron is a chemical process in which iron metal reacts in the.',
          hint: 'Review the definition of chemical changes and recall how oxygen interacts with substances.',
          misconception: 'Students frequently believe that iron rusts simply because it gets wet with water, ignoring the essential role.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rusting of iron is a chemical process in',
                  options: ['The rusting of iron is a chemical process in', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review the definition of chemical changes and recall how oxygen interacts with substances during.',
                  misconception: 'Students frequently believe that iron rusts simply because it gets wet with water, ignoring the essential role of oxygen gas from the air.' }
          ],
            remediations: { 'students-frequently-believe-that-iron': { steps: ['To fix this, guide the student through a two-tube comparative check: place one nail in a test tube with ordinary tap.', 'Have them observe the difference after 48 hours to physically witness that water alone does not cause rust.', 'Explicitly emphasize that rust is an *oxide*, meaning oxygen from the air must chemically bond with the iron along with.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_008', difficulty: 'standard',
          question: 'Corrosion is the gradual destruction or degradation of metals through chemical.',
          hint: 'Review c7_chem_ch01_007 to reinforce how oxygen and water interact with iron surfaces.',
          misconception: 'Students often believe that "rust" is a general term for any kind of metal damage or dirt on any metal surface.',
          parts: [
                { id: 'a', prompt: 'What are the two essential environmental factors required for the rusting of iron to occur?', answer: 'The two essential factors are oxygen (from the air) and moisture (water)',
                  options: ['The two essential factors are oxygen (from the air) and moisture (water)', 'or only'],
                  hint: 'Review c7_chem_ch01_007 to reinforce how oxygen and water interact with iron surfaces before.',
                  misconception: 'Students often believe that "rust" is a general term for any kind of metal damage or dirt on any metal surface.' }
          ],
            remediations: { 'rust-is-a-general-term': { steps: ['To correct this, guide the student to examine three different tarnished or corroded items: a rusted iron nail, an old.', 'Have them write down the distinct colors and chemical names for each product: hydrated iron oxide for iron, basic.', 'Emphasize that "rusting" is exclusively reserved for iron and steel.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_009', difficulty: 'standard',
          question: 'Metalloids are a special group of elements that possess properties intermediate.',
          hint: 'Review basic properties of metals and non-metals, particularly how luster and electrical.',
          misconception: 'Students frequently assume that any element with a shiny, lustrous appearance must be a metal and therefore a good.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Metalloids are a special group of elements that possess properties intermediate between',
                  options: ['Metalloids are a special group of elements that possess properties intermediate between', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review basic properties of metals and non-metals, particularly how luster and electrical.',
                  misconception: 'Students frequently assume that any element with a shiny, lustrous appearance must be a metal and therefore a good conductor of electricity.' }
          ],
            remediations: { 'students-frequently-assume-that-any': { steps: ['To fix this misconception, guide the student through a physical property checklist: check luster (shiny or dull), check.', 'Show them an actual silicon wafer: point out its metallic shine, but demonstrate how easily it snaps under pressure.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_010', difficulty: 'standard',
          question: 'Non-metals are essential chemical elements—such as oxygen, carbon, nitrogen.',
          hint: 'Review Class 6 concepts on non-metals and respiration to see how oxygen and carbon.',
          misconception: 'Students often think that "non-metals" are completely useless or inactive because they are poor conductors of heat and.',
          parts: [
                { id: 'a', prompt: 'Which essential non-metal gas makes up about 78% of Earth\'s atmosphere and is crucial for plant growth through compounds in fertilizers?', answer: 'Nitrogen ($N_2$)',
                  options: ['Nitrogen ($N_2$)', 'oxygen', 'non-metals'],
                  hint: 'Review Class 6 concepts on non-metals and respiration to see how oxygen and carbon dioxide sustain.',
                  misconception: 'Students often think that "non-metals" are completely useless or inactive because they are poor conductors of heat and electricity compared.' },
                { id: 'b', prompt: 'A greenhouse farmer in Pune wants to increase plant yield. Which non-metal element, when added as a soluble nitrate or phosphate salt, directly promotes leaf.', answer: 'Nitrogen (for leaves/stems) and phosphorus (for roots)',
                  options: ['Nitrogen (for leaves/stems) and phosphorus (for roots)', 'non-metals'],
                  hint: 'Review Class 6 concepts on non-metals and respiration to see how oxygen and carbon dioxide sustain.',
                  misconception: 'Students often think that "non-metals" are completely useless or inactive because they are poor conductors of heat and electricity compared.' }
          ],
            remediations: { 'non-metals-are-completely-useless': { steps: ['Review the elemental composition of the human body (which is roughly 99% non-metals like oxygen, carbon, hydrogen.', 'Emphasize that water ($H_2O$) and air ($O_2, CO_2$) are entirely made of non-metals, proving their daily biological.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "non-metals" are completely useless or inactive because they are poor conductors of heat and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since non-metals are poor conductors of electricity, they have no electrical use in our daily lives." Is this valid?', answer: 'The statement is invalid',
                  options: ['The statement is invalid', 'non-metals'],
                  hint: 'Review Class 6 concepts on non-metals and respiration to see how oxygen and carbon dioxide sustain.',
                  misconception: 'Students often think that "non-metals" are completely useless or inactive because they are poor conductors of heat and electricity compared.' }
          ],
            remediations: { 'non-metals-are-completely-useless': { steps: ['Review the elemental composition of the human body (which is roughly 99% non-metals like oxygen, carbon, hydrogen.', 'Emphasize that water ($H_2O$) and air ($O_2, CO_2$) are entirely made of non-metals, proving their daily biological.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_011', difficulty: 'standard',
          question: 'Physical properties comparison of metals and non-metals involves systematically.',
          hint: 'Review the definitions of malleability, ductility, and electrical conductivity from.',
          misconception: 'Students often assume that all non-metals are gases and all metals are hard solids, failing to remember physical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical properties comparison of metals and non-metals involves systematically',
                  options: ['Physical properties comparison of metals and non-metals involves systematically', 'Metals are naturally occurring chemical elements that are typically lustrous, malleable,', 'Malleability is the physical property of a substance that allows it to be beaten, rolled,', 'Ductility is the physical property of a metal that allows it to be drawn or stretched'],
                  hint: 'Review the definitions of malleability, ductility, and electrical conductivity from earlier nodes.',
                  misconception: 'Students often assume that all non-metals are gases and all metals are hard solids, failing to remember physical exceptions like liquid.' }
          ],
            remediations: { 'all-non-metals-are-gases': { steps: ['To fix this misconception, have students examine a physical property comparison table that explicitly highlights.', 'Conduct a quick physical demonstration: show a piece of sodium metal being cut easily with a butter knife, and show.', 'Emphasize that classification is based on the *majority* of physical properties taken together, not just a single.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_012', difficulty: 'standard',
          question: 'The reactivity of metals refers to how easily and vigorously a metal undergoes.',
          hint: 'Review c6_chemistry_ch05_003 on rusting as a chemical change.',
          misconception: 'Students often memorize that "all metals react with acids and water to produce hydrogen gas," leading them to write.',
          parts: [
                { id: 'a', prompt: 'What gas is typically released when a reactive metal like zinc reacts with a dilute acid such as hydrochloric acid?', answer: 'Hydrogen gas is released',
                  options: ['Hydrogen gas is released', 'oxygen', 'carbon dioxide'],
                  hint: 'Review c6_chemistry_ch05_003 on rusting as a chemical change.',
                  misconception: 'Students often memorize that "all metals react with acids and water to produce hydrogen gas," leading them to write balanced equations for.' }
          ],
            remediations: { 'students-often-memorize-that-all': { steps: ['To fix this misconception, have the student perform a physical comparison test in the lab or review a reactivity series.', 'Show them that copper turnings added to dilute hydrochloric acid produce no bubbles at all, proving that position.', 'Emphasize that chemical equations can only be written for reactions that actually take place in nature.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
