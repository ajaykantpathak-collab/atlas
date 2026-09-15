import type { SimDef } from '../../engine/types';

/** v3 generated — c8_chem_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_chem_ch03_p1: SimDef = {
    id: 'v3_c8_chem_ch03_p1',
    title: 'Nature of Matter: Elements, Compounds, and Mixtures · Part 1/2',
    subtitle: 'Separate what physics can undo from what only chemistry made',
    classLevel: 8, subject: 'chemistry', topic: 'Nature of Matter: Elements, Compounds, and Mixtures · Part 1/2',
    chapters: ['c8_chem_ch03'],
    nodeIds: ['c8_chem_ch3_1', 'c8_chem_ch3_10', 'c8_chem_ch3_11', 'c8_chem_ch3_12', 'c8_chem_ch3_2', 'c8_chem_ch3_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a separation scientist in a busy lab', intro: 'Your bench is covered with chaos: salt in water, iron in sulphur, sand in rice. Some of it yields to sieves and magnets; some refuses everything except chemistry. Learn to tell which is which.', goal: 'Differentiate elements, compounds and mixtures, and choose the right physical separation method for a given mixture.' },
    discovery: {
        question: 'Iron filings and sulphur powder sit mixed in a dish — a magnet pulls the iron right out, unchanged. Heat them together and no magnet can recover the iron. What did the heating actually do?',
        options: ['It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means', 'It melted the iron into a liquid alloy', 'It evaporated the sulphur leaving pure iron', 'It magnetised the sulphur permanently'],
        answer: 'It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means',
        hook: 'A mixture is a crowd — each substance keeps its identity and can be picked out. A compound is a marriage — new substance, new properties, no going back with a magnet.',
    },
    teaching: [
        { title: 'Mixtures: Definition and Components', text: 'A mixture is a physical combination of two or more substances (elements or compounds) in any proportion, where each component retains its individual chemical properties and can be separated.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_chem_ch3_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Sort the material world: separate mixtures by magnet, sieve, evaporation and distillation; then distinguish elements, compounds and mixtures by whether chemistry — not physics — made them.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c8_chem_ch3_1', title: 'Mixtures: Definition and Components',
          caseStudy: { intro: 'When you stir a spoonful of sugar into a glass of lemon shikanji, you are making a mixture of water, sugar, lemon juice, and salt.',
            decisions: [{ prompt: 'Which of the following best defines a mixture in chemistry? A) A substance formed by the chemical combination of two or more elements in.', options: [
                { text: 'B', outcome: 'The correct answer is B. A mixture consists of two or more different substances physically combined.' },
                { text: 'disappears', outcome: 'Not quite — Students often think that when a solid dissolves in a liquid (like sugar in water), a chemical.', reveals: 'when-a-solid-dissolves-in' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_10', title: 'Difference Between Mixtures and Compounds',
          caseStudy: { intro: 'Think about what happens when you make a glass of *Nimbu Pani* (lemonade) in your kitchen versus what happens when an iron nail rusts in the damp monsoon air.',
            decisions: [{ prompt: 'State two key differences between a physical mixture of iron filings and sulphur powder, and the chemical compound iron sulphide.', options: [
                { text: 'In a mixture of iron and sulphur, you can see distinct yellow sulphur particles and grey', outcome: 'In a mixture of iron and sulphur, you can see distinct yellow sulphur particles and grey iron.' },
                { text: 'it contains iron', outcome: 'Not quite — Students often assume that because a mixture is uniform and clear (like a sugar solution or salt.', reveals: 'because-a-mixture-is-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_11', title: 'Alloys: Mixtures of Metals (Bronze, Brass, Steel)',
          caseStudy: { intro: 'When walking through an old temple in India, you might notice ancient statues made of bronze that have survived centuries without rusting away completely.',
            decisions: [{ prompt: 'What type of matter is an alloy classified as?', options: [
                { text: 'An alloy is classified as a homogeneous mixture', outcome: 'An alloy is classified as a homogeneous mixture. A student who answers "compound" misunderstands.' },
                { text: 'compound', outcome: 'Not quite — Students often believe that alloys are pure substances or chemical compounds because they look.', reveals: 'alloys-are-pure-substances-or' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_2', title: 'Uniform vs Non-Uniform Mixtures: Homogeneous and Heterogeneous',
          caseStudy: { intro: 'Imagine pouring a spoonful of sugar into a glass of water and stirring it until it completely disappears; notice how every sip tastes equally sweet.',
            decisions: [{ prompt: 'What term is used to describe a mixture that has a uniform composition throughout?', options: [
                { text: 'A homogeneous mixture', outcome: 'A homogeneous mixture. A wrong answer like "heterogeneous" indicates confusion between uniform and.' },
                { text: 'heterogeneous', outcome: 'Not quite — Students often think that if a mixture is liquid, it must automatically be homogeneous.', reveals: 'if-a-mixture-is-liquid' },
                { text: 'if a mixture is liquid, it must automatically be homogeneous', outcome: 'Not quite — Students often think that if a mixture is liquid, it must automatically be homogeneous.', reveals: 'if-a-mixture-is-liquid' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_chem_ch3_3', title: 'Air as a Mixture: Composition and Properties',
          scaffold: { problem: 'A science laboratory in Chennai collects a 250 L sample of dry air in a container.',
            steps: [
            { text: 'Identify the total volume of dry air, which is 250 L, and the percentage values for nitrogen (78%) and argon (0.9%).' },
            { text: 'Set up the formula for finding the component volume: (Percentage / 100) * Total Volume.' },
            { text: 'Calculate the volume of nitrogen: (78 / 100) * 250 L = 0.78 * 250 = 195 L.' },
            { text: 'Calculate the volume of argon: (0.9 / 100) * 250 L = 0.009 * 250 = 2.25 L.' },
            { text: 'Verify the results by ensuring the individual volumes reflect their relative proportions in the mixture.', faded: true, blankAnswer: 'Nitrogen = 195 L, Argon = 2.25 L' }
            ] } },
        { type: 'case', nodeId: 'c8_chem_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In the school lab, Kabir stirs grey iron filings with yellow sulfur powder and gets a speckled blend. His partner writes \'new compound formed\' in the record book because two elements are now touching.',
            decisions: [{ prompt: 'Is the record entry justified?', options: [
                { text: 'No — it is a mixture: no chemical reaction occurred, the proportions were arbitrary, and dragging a magnet through the blend pulls the iron out unchanged, proving each part kept its own properties. Only heating it would make the compound iron sulfide.', outcome: 'This applies the mixture test: components that keep their properties and separate physically never bonded chemically.' },
                { text: 'The partner is right — whenever two elements share a container, a compound with new properties results.', outcome: 'Compounds need chemical bonding in fixed proportions; a magnet still lifts the iron out, so no new substance exists here.', reveals: 'touching-is-bonding' },
                { text: 'It cannot be a mixture because mixtures are only liquids like salt water — two solids together must be a compound.', outcome: 'Mixtures can be solid-solid too, like bhel or this powder blend; the test is retained properties and physical separability, not state.', reveals: 'mixtures-are-liquids' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch3_3', title: 'The bigger picture',
          caseStudy: { intro: 'Air, sea water and salad are mixtures — you can unmix them. Water and iron sulphide are compounds — chemistry fused them. The difference decides how you separate anything.',
            decisions: [{ prompt: 'What comes next? Nature of Matter: Elements, Compounds, and Mixtures · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nature of Matter: Elements, Compounds, and Mixtures · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch3_1', difficulty: 'standard',
          question: 'A mixture is a physical combination of two or more substances (elements.',
          hint: 'Review physical changes and properties of matter in c6_chemistry_ch05_001.',
          misconception: 'Students often think that when a solid dissolves in a liquid (like sugar in water), a chemical reaction has occurred.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A mixture is a physical combination of two or more substances (elements or compounds) in',
                  options: ['A mixture is a physical combination of two or more substances (elements or compounds) in', 'A mixture is a substance formed by physically mixing two or more substances together such', 'An alloy is a homogeneous mixture of two or more metals, or a metal and a non-metal,', 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical'],
                  hint: 'Review physical changes and properties of matter in c6_chemistry_ch05_001.',
                  misconception: 'Students often think that when a solid dissolves in a liquid (like sugar in water), a chemical reaction has occurred to form a new.' }
          ],
            remediations: { 'when-a-solid-dissolves-in': { steps: ['To fix this, guide the student to perform a simple kitchen experiment: dissolve sugar in water, taste the solution.', 'Emphasize that because the sugar did not change its chemical identity and can be physically recovered, it was always.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_10', difficulty: 'standard',
          question: 'A mixture is a substance formed by physically mixing two or more substances.',
          hint: 'Work step by step.',
          misconception: 'Students often assume that because a mixture is uniform and clear (like a sugar solution or salt solution), a chemical.',
          parts: [
                { id: 'a', prompt: 'You are given two jars. Jar A contains a mixture of Hydrogen gas and Oxygen gas in a $2:1$ volume ratio. Jar B contains water vapour ($\\text{H}_2\\text{O}$).', answer: '- **Step 1:** Analyze Jar A (mixture)',
                  options: ['- **Step 1:** Analyze Jar A (mixture)', 'it contains hydrogen'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often assume that because a mixture is uniform and clear (like a sugar solution or salt solution), a chemical reaction must have.' }
          ],
            remediations: { 'because-a-mixture-is-uniform': { steps: ['To correct this misconception, guide the student through a simple physical reclamation experiment: 1.', 'Have the student dissolve $5\\text{ g}$ of common salt ($\\text{NaCl}$) in $50\\text{ mL}$ of water.', 'Ask: "Can you see the salt?" (No, it is homogeneous).', 'Ask: "Does it still taste like salt?" (Yes, the chemical property of saltiness is retained).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that because a mixture is uniform and clear (like a sugar solution or salt solution), a chemical.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since brass (an alloy of copper and zinc) has a uniform golden colour throughout and cannot be separated into copper and zinc by simple.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'uniform appearance', 'difficulty of mechanical separation'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often assume that because a mixture is uniform and clear (like a sugar solution or salt solution), a chemical reaction must have.' }
          ],
            remediations: { 'because-a-mixture-is-uniform': { steps: ['To correct this misconception, guide the student through a simple physical reclamation experiment: 1.', 'Have the student dissolve $5\\text{ g}$ of common salt ($\\text{NaCl}$) in $50\\text{ mL}$ of water.', 'Ask: "Can you see the salt?" (No, it is homogeneous).', 'Ask: "Does it still taste like salt?" (Yes, the chemical property of saltiness is retained).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_11', difficulty: 'standard',
          question: 'An alloy is a homogeneous mixture of two or more metals, or a metal and.',
          hint: 'Review c8_chem_ch3_1 (Mixtures: Definition and Components) and c8_chem_ch3_2 (Homogeneous.',
          misconception: 'Students often believe that alloys are pure substances or chemical compounds because they look uniform (homogeneous).',
          parts: [
                { id: 'a', prompt: 'What type of matter is an alloy classified as?', answer: 'An alloy is classified as a homogeneous mixture',
                  options: ['An alloy is classified as a homogeneous mixture', 'compound'],
                  hint: 'Review c8_chem_ch3_1 (Mixtures: Definition and Components) and c8_chem_ch3_2 (Homogeneous Mixtures).',
                  misconception: 'Students often believe that alloys are pure substances or chemical compounds because they look uniform (homogeneous) and have fixed.' }
          ],
            remediations: { 'alloys-are-pure-substances-or': { steps: ['To fix this, remind the student that alloys are prepared by physically melting substances together in liquid form.', 'Have them compare the fixed mass ratio of elements in a compound like carbon dioxide with the variable percentage.', 'Emphasize that because the proportions can change while the metals retain their metallic bonding, it remains a mixture.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_12', difficulty: 'standard',
          question: 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital.',
          hint: 'Review the definition of compounds in c8_chem_ch3_9 and revisit how chemical bonding.',
          misconception: 'Students often think that carbon dioxide is poisonous because it suffocates living beings, leading them to classify.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical',
                  options: ['Water ($H_2O$) and carbon dioxide ($CO_2$) are two of the most common and vital chemical', 'A mixture is a physical combination of two or more substances (elements or compounds) in', 'A mixture is a substance formed by physically mixing two or more substances together such', 'An alloy is a homogeneous mixture of two or more metals, or a metal and a non-metal,'],
                  hint: 'Review the definition of compounds in c8_chem_ch3_9 and revisit how chemical bonding creates.',
                  misconception: 'Students often think that carbon dioxide is poisonous because it suffocates living beings, leading them to classify it as a toxic chemical.' }
          ],
            remediations: { 'carbon-dioxide-is-poisonous-because': { steps: ['To correct this misconception, guide the student through a controlled investigation: remind them that we exhale carbon.', 'Demonstrate that when $CO_2$ dissolves in water under pressure, opening the cap releases the gas back out physically.', 'Emphasize the difference between suffocation due to lack of oxygen versus direct cellular poisoning.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_2', difficulty: 'standard',
          question: 'A homogeneous mixture has a uniform composition throughout, meaning its.',
          hint: 'Review basic solubility properties from Class 6 materials properties chapters before.',
          misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe a mixture that has a uniform composition throughout?', answer: 'A homogeneous mixture',
                  options: ['A homogeneous mixture', 'heterogeneous', 'if a mixture is liquid, it must automatically be homogeneous'],
                  hint: 'Review basic solubility properties from Class 6 materials properties chapters before analyzing.',
                  misconception: 'Students often think that if a mixture is liquid, it must automatically be homogeneous.' }
          ],
            remediations: { 'if-a-mixture-is-liquid': { steps: ['To fix this, take a clear glass of water and mix a spoonful of turmeric powder or chalk dust into it.', 'Shine a flashlight through the glass to show light scattering (Tyndall effect) and let it sit for a few minutes to show.', 'Emphasize that if you can see distinct parts, floating bits, or cloudiness due to undissolved matter, the mixture.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch3_3', difficulty: 'standard',
          question: 'Air is a homogeneous mixture of various gases, primarily nitrogen (approx.',
          hint: 'Review c8_chem_ch3_1 to reinforce the core characteristics of mixtures before studying.',
          misconception: 'Students often think that because air is invisible and homogeneous, it must be a chemical compound (like water, H2O).',
          parts: [
                { id: 'a', prompt: 'What is the approximate percentage by volume of nitrogen gas in clean, dry air?', answer: 'Nitrogen makes up approximately 78% of clean, dry air by volume',
                  options: ['Nitrogen makes up approximately 78% of clean, dry air by volume', '21%—confuses nitrogen with oxygen'],
                  hint: 'Review c8_chem_ch3_1 to reinforce the core characteristics of mixtures before studying air.',
                  misconception: 'Students often think that because air is invisible and homogeneous, it must be a chemical compound (like water, H2O) rather than a mixture.' }
          ],
            remediations: { 'because-air-is-invisible-and': { steps: ['Remind students of the definition of a compound, where elements combine in fixed mass ratios to form a brand new.', 'Contrast this with air, where oxygen and nitrogen can be separated by simply liquefying air and boiling it off.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
