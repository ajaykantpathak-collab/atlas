import type { SimDef } from '../../engine/types';

/** v3 generated — c7_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_chem_ch02_p1: SimDef = {
    id: 'v3_c7_chem_ch02_p1',
    title: 'Changes Around Us: Physical and Chemical · Part 1/2',
    subtitle: 'This node covers the observation, identification, and initial classification of everyday.',
    classLevel: 7, subject: 'chemistry', topic: 'Changes Around Us: Physical and Chemical · Part 1/2',
    chapters: ['c7_chem_ch02'],
    nodeIds: ['c7_chem_ch02_001', 'c7_chem_ch02_002', 'c7_chem_ch02_003', 'c7_chem_ch02_004', 'c7_chem_ch02_005', 'c7_chem_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Step into an Indian kitchen in the morning: you see water boiling on a stove, dough being kneaded into.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In one busy morning, sugar vanishes into tea, milk sours into curd, and paper burns to ash. All three look dramatic — but only some can never be undone. What is the real test?',
        options: ['Ask if a new substance was born — dissolved sugar can be recovered by evaporation, but curd and ash can never turn back', 'Ask how big the change looks — dramatic changes are always chemical', 'Ask if heat was involved — heat always means chemical', 'Ask if it happened in a kitchen — kitchen changes are reversible'],
        answer: 'Ask if a new substance was born — dissolved sugar can be recovered by evaporation, but curd and ash can never turn back',
        hook: 'Looks deceive. Tearing paper, boiling water, and dissolving salt feel drastic but stay physical — the same stuff in a new form. Even heat is no proof: melting ice absorbs heat yet stays water.',
    },
    teaching: [
        { title: 'Identifying Changes in Everyday Life', text: 'Identifying changes in everyday life is the systematic process of observing, recording, and categorizing natural and man-made transformations—such as the melting of ice, the burning of wood, or the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_chem_ch02_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Run a home change-detective log — boiling water, a ripening banana, dissolved salt, a cooked egg — and label each physical or chemical using only evidence you can see.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c7_chem_ch02_001', title: 'Identifying Changes in Everyday Life',
          caseStudy: { intro: 'Step into an Indian kitchen in the morning: you see water boiling on a stove, dough being kneaded into chapatis, milk turning into curd, and iron griddles.',
            decisions: [{ prompt: 'Which of the following processes represents a change where no new substance is formed: dissolving sugar in water, burning paper, rusting.', options: [
                { text: 'Dissolving sugar in water is a change where no new substance is formed', outcome: 'Dissolving sugar in water is a change where no new substance is formed because the sugar molecules.' },
                { text: 'rusting of an iron nail', outcome: 'Not quite — Students often assume that any change involving a drastic change in appearance, size, or state.', reveals: 'any-change-involving-a-drastic' },
                { text: 'the original object is gone and cannot be easily put back together', outcome: 'Not quite — Students often assume that any change involving a drastic change in appearance, size, or state.', reveals: 'any-change-involving-a-drastic' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_003', title: 'Chemical Changes: New Substance Formed',
          caseStudy: { intro: 'When a Class 7 student observes a shiny iron nail turn reddish-brown after being left outside in the monsoon air, they are witnessing the birth of a brand-new.',
            decisions: [{ prompt: 'What is the primary characteristic that distinguishes a chemical change from a physical change?', options: [
                { text: 'The formation of one or more entirely new substances with different properties', outcome: 'The formation of one or more entirely new substances with different properties.' },
                { text: 'looks different', outcome: 'Not quite — Students often think that any visible change—such as a change in size, shape, or state (like.', reveals: 'any-visible-change-such-as' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_004', title: 'Distinguishing Physical and Chemical Changes',
          caseStudy: { intro: 'Observe what happens when ice melts on your kitchen counter versus when a piece of paper burns completely to ash during a Diwali celebration.',
            decisions: [{ prompt: 'Which of the following describes a key characteristic that uniquely identifies a chemical change rather than a physical change?', options: [
                { text: 'C', outcome: 'The correct answer is C. A chemical change always results in the creation of new substances with.' },
                { text: 'something looks different', outcome: 'Not quite — Students often assume that any change involving a change in appearance—such as melting, dissolving.', reveals: 'any-change-involving-a-change' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_006', title: 'Combustion: A Chemical Change with Heat and Light',
          caseStudy: { intro: 'When a candle burns during Diwali or a matchstick is struck in the kitchen, we immediately notice the warmth and glow.',
            decisions: [{ prompt: 'What are the three essential requirements for combustion to take place?', options: [
                { text: 'The three essential requirements are fuel, oxygen (air), and ignition temperature (heat)', outcome: 'The three essential requirements are fuel, oxygen (air), and ignition temperature (heat).' },
                { text: 'just wood and fire', outcome: 'Not quite — Students often believe that fire or heat is a physical substance that gets added to the fuel during.', reveals: 'fire-or-heat-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two mysteries at home: the camphor in the wardrobe has vanished completely over the month, and the copper vessel in the courtyard has grown a dull green coat. A student calls both \'chemical changes — stuff reacting and disappearing.\'',
            decisions: [{ prompt: 'Are the two changes really the same type?', options: [
                { text: 'No — the camphor simply sublimed: solid turned to vapour and drifted away with no new substance, a physical change. The green copper is different — the metal reacted with moist air over months into a new compound, which is chemical. Vanishing is not the test; whether a new substance formed is.', outcome: 'The contrast teaches the real criterion — the wardrobe lost its camphor to the air unchanged chemically, while the copper gained a genuinely new material on its surface.' },
                { text: 'The student is right — both are chemical because both changed over time without anyone touching them.', outcome: 'Time and disappearance do not decide the type — camphor subliming makes no new substance, while copper\'s green coat does.', reveals: 'disappearing-is-chemical' },
                { text: 'Both are physical — nothing \'new\' is ever created by air or time alone.', outcome: 'The green layer is a genuinely new compound formed by copper reacting with moist air — air and time together are quite capable of chemistry.', reveals: 'air-cant-cause-chemistry' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every change answers to one question: is the original still hiding inside? If you can win it back, nothing new was truly born.',
            decisions: [{ prompt: 'What comes next? Changes Around Us: Physical and Chemical · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Changes Around Us: Physical and Chemical · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch02_001', difficulty: 'standard',
          question: 'Identifying changes in everyday life is the systematic process of observing.',
          hint: 'Review Class 6 concepts on physical changes and simple mixture separation before.',
          misconception: 'Students often assume that any change involving a drastic change in appearance, size, or state (such as tearing paper.',
          parts: [
                { id: 'a', prompt: 'Which of the following processes represents a change where no new substance is formed: dissolving sugar in water, burning paper, rusting of an iron nail,.', answer: 'Dissolving sugar in water is a change where no new substance is formed',
                  options: ['Dissolving sugar in water is a change where no new substance is formed', 'rusting of an iron nail', 'the original object is gone and cannot be easily put back together'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixture separation before attempting.',
                  misconception: 'Students often assume that any change involving a drastic change in appearance, size, or state (such as tearing paper into tiny shreds.' }
          ],
            remediations: { 'any-change-involving-a-drastic': { steps: ['To correct this, take a sample of common salt and dissolve it in water until it disappears completely.', 'Ask the student if the salt is gone forever; then, heat the saltwater solution in a flat dish until all the water.', 'Emphasize that because the original substance can be recovered through simple physical methods, no new chemical.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that any change involving a drastic change in appearance, size, or state (such as tearing paper.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All changes that involve a release of heat are chemical changes, and all changes that absorb heat are physical changes." Is this.', answer: 'This statement is invalid',
                  options: ['This statement is invalid', 'the original object is gone and cannot be easily put back together'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixture separation before attempting.',
                  misconception: 'Students often assume that any change involving a drastic change in appearance, size, or state (such as tearing paper into tiny shreds.' }
          ],
            remediations: { 'any-change-involving-a-drastic': { steps: ['To correct this, take a sample of common salt and dissolve it in water until it disappears completely.', 'Ask the student if the salt is gone forever; then, heat the saltwater solution in a flat dish until all the water.', 'Emphasize that because the original substance can be recovered through simple physical methods, no new chemical.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_002', difficulty: 'standard',
          question: 'A physical change is a temporary alteration in the physical properties of.',
          hint: 'Review Grade 6 concepts on physical changes and state transitions from.',
          misconception: 'Students frequently confuse any change that alters appearance, size, or shape (such as tearing paper, cutting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A physical change is a temporary alteration in the physical properties of a',
                  options: ['A physical change is a temporary alteration in the physical properties of a', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A chemical change is a process in', 'Distinguishing physical and chemical changes involves comparing whether a process alters'],
                  hint: 'Review Grade 6 concepts on physical changes and state transitions from c6_chemistry_ch05_001.',
                  misconception: 'Students frequently confuse any change that alters appearance, size, or shape (such as tearing paper, cutting vegetables, or breaking.' }
          ],
            remediations: { 'students-frequently-confuse-any-change': { steps: ['Take a sheet of paper and tear it into small pieces.', 'Ask the student: "What is each piece made of?" (Paper).', 'Ask: "Did paper turn into wood or plastic?" (No, it is still paper).', 'Show that while the shape and size changed, no new chemical substance was formed, and the chemical nature of cellulose.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_003', difficulty: 'standard',
          question: 'A chemical change is a process in which one or more substances interact to form.',
          hint: 'Review Class 6 concepts on physical changes and simple mixing, specifically noting.',
          misconception: 'Students often think that any visible change—such as a change in size, shape, or state (like melting ice or boiling.',
          parts: [
                { id: 'a', prompt: 'What is the primary characteristic that distinguishes a chemical change from a physical change?', answer: 'The formation of one or more entirely new substances with different properties',
                  options: ['The formation of one or more entirely new substances with different properties', 'looks different'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixing, specifically noting whether original.',
                  misconception: 'Students often think that any visible change—such as a change in size, shape, or state (like melting ice or boiling water)—must be.' },
                { id: 'b', prompt: 'When magnesium ribbon burns in air with a dazzling white light, a white powdery ash is formed.', answer: 'Magnesium reacts with oxygen in the air to form magnesium oxide',
                  options: ['Magnesium reacts with oxygen in the air to form magnesium oxide', 'looks different'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixing, specifically noting whether original.',
                  misconception: 'Students often think that any visible change—such as a change in size, shape, or state (like melting ice or boiling water)—must be.' },
                { id: 'c', prompt: 'If you mix vinegar and baking soda in a test tube, you observe brisk effervescence (bubbling) and the test tube feels cooler.', answer: 'The bubbling indicates the formation of carbon dioxide gas',
                  options: ['The bubbling indicates the formation of carbon dioxide gas', 'looks different'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixing, specifically noting whether original.',
                  misconception: 'Students often think that any visible change—such as a change in size, shape, or state (like melting ice or boiling water)—must be.' },
                { id: 'd', prompt: 'Analyze the process of setting milk into curd. Is it possible to get the original milk back from the curd by cooling or heating?', answer: 'No, milk cannot be converted back into curd through simple physical reversal',
                  options: ['No, milk cannot be converted back into curd through simple physical reversal', 'looks different', 'changes involving liquids or food are temporary or easily reversible'],
                  hint: 'Review Class 6 concepts on physical changes and simple mixing, specifically noting whether original.',
                  misconception: 'Students often think that any visible change—such as a change in size, shape, or state (like melting ice or boiling water)—must be.' }
          ],
            remediations: { 'any-visible-change-such-as': { steps: ['To fix this, guide the student to perform a substance-recovery test.', 'Have them collect the steam from boiling water by cooling it on a plate to show that liquid water is recovered.', 'Contrast this with burning a paper or magnesium ribbon where the ash cannot be turned back into the original material.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_004', difficulty: 'standard',
          question: 'Distinguishing physical and chemical changes involves comparing whether.',
          hint: 'Review the definitions of new substance formation and reversibility in nodes.',
          misconception: 'Students often assume that any change involving a change in appearance—such as melting, dissolving, or boiling—is.',
          parts: [
                { id: 'a', prompt: 'Which of the following describes a key characteristic that uniquely identifies a chemical change rather than a physical change?', answer: 'Formation of one or more new substances with different properties',
                  options: ['Formation of one or more new substances with different properties', 'something looks different'],
                  hint: 'Review the definitions of new substance formation and reversibility in nodes c7_chem_ch02_002 and.',
                  misconception: 'Students often assume that any change involving a change in appearance—such as melting, dissolving, or boiling—is a chemical change because.' },
                { id: 'b', prompt: 'A student dissolves 10 grams of common salt (sodium chloride) in a beaker of water and then heats the solution until all water evaporates completely, leaving.', answer: 'Identify the process: dissolving salt in water and recovering it by evaporation',
                  options: ['Identify the process: dissolving salt in water and recovering it by evaporation', 'something looks different'],
                  hint: 'Review the definitions of new substance formation and reversibility in nodes c7_chem_ch02_002 and.',
                  misconception: 'Students often assume that any change involving a change in appearance—such as melting, dissolving, or boiling—is a chemical change because.' },
                { id: 'c', prompt: 'Compare the melting of solid candle wax and the burning of candle wick thread with wax vapor.', answer: 'Melting the wax is a physical change (state chang',
                  options: ['Melting the wax is a physical change (state chang', 'something looks different'],
                  hint: 'Review the definitions of new substance formation and reversibility in nodes c7_chem_ch02_002 and.',
                  misconception: 'Students often assume that any change involving a change in appearance—such as melting, dissolving, or boiling—is a chemical change because.' }
          ],
            remediations: { 'any-change-involving-a-change': { steps: ['To correct this misconception, perform a simple recovery experiment: dissolve salt in water, show that the salt seems.', 'Point out that the white solid remaining is identical in taste and properties to the original salt, proving that no new.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_005', difficulty: 'standard',
          question: 'Rusting is a slow chemical change in which iron reacts with both oxygen (from.',
          hint: 'Review c7_chem_ch02_003 to reinforce what defines a chemical change before analyzing the.',
          misconception: 'Students often believe that water alone is enough to cause rusting, forgetting that dissolved or atmospheric oxygen.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rusting is a slow chemical change in',
                  options: ['Rusting is a slow chemical change in', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review c7_chem_ch02_003 to reinforce what defines a chemical change before analyzing the specific.',
                  misconception: 'Students often believe that water alone is enough to cause rusting, forgetting that dissolved or atmospheric oxygen is equally critical.' }
          ],
            remediations: { 'water-alone-is-enough-to': { steps: ['To fix this misconception, guide the student through a comparative check of the three-tube experiment: show that when.', 'Emphasize that the chemical formula for rust ($Fe_2O_3 \\cdot xH_2O$) explicitly contains atoms from both oxygen and.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_006', difficulty: 'standard',
          question: 'Combustion is a chemical change in which a substance reacts with oxygen.',
          hint: 'Review c7_chem_ch02_003 to reinforce how chemical changes create entirely new substances.',
          misconception: 'Students often believe that fire or heat is a physical substance that gets added to the fuel during burning, rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Combustion is a chemical change in',
                  options: ['Combustion is a chemical change in', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review c7_chem_ch02_003 to reinforce how chemical changes create entirely new substances with.',
                  misconception: 'Students often believe that fire or heat is a physical substance that gets added to the fuel during burning, rather than recognizing heat.' }
          ],
            remediations: { 'fire-or-heat-is-a': { steps: ['To fix this misconception, guide the student to trace the mass and identity of atoms before and after burning.', 'Have them touch a cold metal spoon briefly above a candle flame to observe soot (carbon particles) depositing, proving.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
