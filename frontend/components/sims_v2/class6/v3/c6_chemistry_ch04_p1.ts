import type { SimDef } from '../../engine/types';

/** v3 generated — c6_chemistry_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_chemistry_ch04_p1: SimDef = {
    id: 'v3_c6_chemistry_ch04_p1',
    title: 'Materials: Properties and Reactions · Part 1/2',
    subtitle: 'Why is your bottle plastic and your window glass?',
    classLevel: 6, subject: 'chemistry', topic: 'Materials: Properties and Reactions · Part 1/2',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials detective sorting a jumbled storeroom', intro: 'A pile of objects — keys, chalk, cloth, glass, salt — all mixed up. Each one is hiding clues in its shine, hardness and see-through-ness.', goal: 'Group materials by their properties and explain why coloured glass is still transparent.' },
    discovery: {
        question: 'Your school bag is cloth, your bottle is plastic, your window is glass — yet nobody makes windows from cloth or bags from glass. What test is everyone secretly running?',
        options: ['They match the material\'s properties — hardness, flexibility, transparency — to the job it must do', 'They simply use whichever material is cheapest that day', 'It\'s pure tradition — bags have always been cloth', 'They pick whichever material is most colourful'],
        answer: 'They match the material\'s properties — hardness, flexibility, transparency — to the job it must do',
        hook: 'Every material has a \'personality\' — shine, hardness, see-through-ness. Choosing materials is really matchmaking between properties and purpose.',
    },
    teaching: [
        { title: 'What Are Materials and Why We Classify Them', text: 'Materials are substances used to create objects, and matter is anything that occupies space (volume) and has mass.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_chemistry_ch04_001', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Sort a messy storeroom of mystery objects — test each for shine, hardness, solubility and transparency — then decide what each is fit to become.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'What Are Materials and Why We Classify Them',
          caseStudy: { intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass? To understand this, start by listing every object in your room.',
            decisions: [{ prompt: 'What are the two essential characteristics that define anything as "matter"?', options: [
                { text: 'Matter must occupy space (volume) and have mass', outcome: 'Matter must occupy space (volume) and have mass. A wrong answer—such as "it must be solid"—reveals.' },
                { text: 'it must be solid', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' },
                { text: 'transparent', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_002', title: 'Properties of Materials: Appearance, Hardness, Solubility',
          caseStudy: { intro: 'Have you ever wondered why your water bottle is made of plastic or metal instead of cloth? To understand this, look at the objects on your desk and touch them.',
            decisions: [{ prompt: 'What do we call a material that has a shiny surface when light falls on it?', options: [
                { text: 'Such a material is called lustrous', outcome: 'Such a material is called lustrous. A wrong answer like "hard" reveals the student is confusing the.' },
                { text: 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal', outcome: 'Not quite — Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be.', reveals: 'if-a-material-is-hard' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_003', title: 'Effect of Air and Water on Iron: Rusting',
          caseStudy: { intro: 'Have you ever noticed that an old iron gate left out in the monsoon rains starts turning brown and gets a powdery layer?',
            decisions: [{ prompt: 'What are the two substances that must be present for iron to rust?', options: [
                { text: 'The substances are oxygen (from the air) and water (or moisture)', outcome: 'The substances are oxygen (from the air) and water (or moisture).' },
                { text: 'old age', outcome: 'Not quite — Students often believe that "rust" is just a layer of dirt that can be washed off.', reveals: 'rust-is-just-a-layer' },
                { text: 'rust is simply dirt or "old age" rather than a specific chemical reaction', outcome: 'Not quite — Students often believe that "rust" is just a layer of dirt that can be washed off.', reveals: 'rust-is-just-a-layer' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_004', title: 'Effect of Air and Water on Other Metals: Copper, Aluminium, Gold',
          caseStudy: { intro: 'Have you ever noticed that old copper coins turn green, or why a gold ring stays shiny even after years of wearing it?',
            decisions: [{ prompt: 'What is the green coating that forms on copper objects exposed to air for a long time called?', options: [
                { text: 'It is called patina', outcome: 'It is called patina. A wrong answer (like "rust") suggests the student is confusing all metal color.' },
                { text: 'all metals rust', outcome: 'Not quite — Students often believe "all metals rust." They confuse "rusting" (which is specific to iron) with.', reveals: 'all-metals-rust' },
                { text: 'rusting', outcome: 'Not quite — Students often believe "all metals rust." They confuse "rusting" (which is specific to iron) with.', reveals: 'all-metals-rust' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_005', title: 'Non-metals and Their Properties',
          caseStudy: { intro: 'Have you ever wondered why the handle of a pressure cooker is made of plastic while the body is metal?',
            decisions: [{ prompt: 'Name two physical properties that distinguish most non-metals from metals.', options: [
                { text: 'Non-metals are generally dull (lack lustre) and are poor conductors of heat and', outcome: 'Non-metals are generally dull (lack lustre) and are poor conductors of heat and electricity.' },
                { text: 'non-metals are hard and shiny', outcome: 'Not quite — Students often believe that if a material is solid and hard, it must be a metal.', reveals: 'if-a-material-is-solid' },
                { text: 'hardness', outcome: 'Not quite — Students often believe that if a material is solid and hard, it must be a metal.', reveals: 'if-a-material-is-solid' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_006', title: 'Are Non-metals Essential for Life?',
          caseStudy: { intro: 'Have you ever wondered why we can build a house out of iron, but our own bodies are made of something completely different?',
            decisions: [{ prompt: 'Name two non-metals that are absolutely essential for keeping an animal alive.', options: [
                { text: 'Oxygen and carbon', outcome: 'Oxygen and carbon. If a student only names one or confuses them with metals like iron, it reveals.' },
                { text: 'more important', outcome: 'Not quite — Students often assume that because metals are hard, shiny, and used for construction, they are.', reveals: 'because-metals-are-hard' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting classroom objects for a \'properties of materials\' display, a student declares a rule: \'Anything hard is automatically opaque — you can tell both properties at once.\'',
            decisions: [{ prompt: 'Does one property really predict the other?', options: [
                { text: 'No — a glass pane or a diamond is hard yet transparent, and butter paper is soft but translucent. Hardness and transparency are independent properties, which is the whole point of classifying materials: each property must be tested on its own, and one tells you nothing about the other.', outcome: 'The glass counterexample breaks the rule instantly — materials are grouped by separate, measurable properties, and assuming they travel together misleads the sorting.' },
                { text: 'The student is right — hard things block light and soft things let it through, so the properties always agree.', outcome: 'Glass is the standing counterexample — hard enough to scratch many materials yet perfectly transparent, so the two properties clearly vary independently.', reveals: 'hard-equals-opaque' },
                { text: 'It is actually the reverse — transparent things are always hard and opaque things are always soft.', outcome: 'Neither pairing holds — rubber is opaque and soft, glass is transparent and hard; each property stands alone.', reveals: 'properties-always-linked' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Glass for windows, cloth for bags — nothing is random. Once you can read a material\'s properties, every object in the room starts making sense.',
            decisions: [{ prompt: 'What comes next? Materials: Properties and Reactions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Materials: Properties and Reactions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_001', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and matter is anything that.',
          hint: 'Review the definitions of adjectives describing physical appearance and texture.',
          misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
          parts: [
                { id: 'a', prompt: 'What are the two essential characteristics that define anything as "matter"?', answer: 'Matter must occupy space (volume) and have mass',
                  options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent', 'colorless'],
                  hint: 'Review the definitions of adjectives describing physical appearance and texture.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' },
                { id: 'b', prompt: 'If you have a steel spoon and a wooden spoon, why might you classify them differently in a "shiny vs. dull" test?', answer: 'Steel is lustrous (shiny), whereas wood is non-lustrous (dull)',
                  options: ['Steel is lustrous (shiny), whereas wood is non-lustrous (dull)', 'appearance', 'lustre', 'transparent'],
                  hint: 'Review the definitions of adjectives describing physical appearance and texture.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' }
          ],
            remediations: { 'students-often-confuse-transparent-with': { steps: ['First, ask the student to look through a piece of colored cellophane paper at a light source.', 'Ask: "Can you see the light even though it is colored?" Explain that if light passes through, it is transparent.', 'Then, have them compare this to a piece of wood, which blocks all light, to solidify the difference between transparent.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_002', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and they are classified based.',
          hint: 'Review the activity of listing objects around you and identifying the material they are.',
          misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.',
          parts: [
                { id: 'a', prompt: 'What do we call a material that has a shiny surface when light falls on it?', answer: 'Such a material is called lustrous',
                  options: ['Such a material is called lustrous', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'b', prompt: 'If you can easily press a material with your fingers, how would you describe its hardness?', answer: 'The material is described as soft',
                  options: ['The material is described as soft', 'non-lustrous', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'c', prompt: 'You have a glass of water. You add a spoonful of sand to it and stir. Will the sand disappear? Why or why not?', answer: 'The sand will not disappear',
                  options: ['The sand will not disappear', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'd', prompt: 'Compare a piece of iron and a piece of rubber. Which one is harder, and how do you know?', answer: 'Iron is harder than rubber',
                  options: ['Iron is harder than rubber', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' }
          ],
            remediations: { 'if-a-material-is-hard': { steps: ['Ask the student to find a piece of metal that is soft (like a thin aluminum foil) and a non-metal that is hard (like.', 'Have them press the foil and try to scratch the wood.', 'Explain that properties like "hard" or "soft" are specific to the material\'s reaction to force, not whether it is.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.',
          parts: [
                { id: 'a', prompt: 'Your friend wants to make a boat out of paper, but you want to make one out of metal. Which material is more suitable for staying in water for a long time?', answer: 'The metal boat is more suitable',
                  options: ['The metal boat is more suitable', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'b', prompt: 'Imagine a new material that is opaque, very hard, and insoluble in water. Suggest one object you could make with it.', answer: 'An example would be a construction brick or a heavy-duty hammer head',
                  options: ['An example would be a construction brick or a heavy-duty hammer head', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Review the activity of listing objects around you and identifying the material they are made of.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' }
          ],
            remediations: { 'if-a-material-is-hard': { steps: ['Ask the student to find a piece of metal that is soft (like a thin aluminum foil) and a non-metal that is hard (like.', 'Have them press the foil and try to scratch the wood.', 'Explain that properties like "hard" or "soft" are specific to the material\'s reaction to force, not whether it is.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_003', difficulty: 'standard',
          question: 'Rusting is a chemical change where iron reacts with oxygen and water to form.',
          hint: 'Review the section on properties of materials (lustre and hardness).',
          misconception: 'Students often believe that "rust" is just a layer of dirt that can be washed off.',
          parts: [
                { id: 'a', prompt: 'What are the two substances that must be present for iron to rust?', answer: 'The substances are oxygen (from the air) and water (or moisture)',
                  options: ['The substances are oxygen (from the air) and water (or moisture)', 'old age', 'rust is simply dirt or "old age" rather than a specific chemical reaction', '"rust" is just a layer of dirt that can be washed off'],
                  hint: 'Review the section on properties of materials (lustre and hardness).',
                  misconception: 'Students often believe that "rust" is just a layer of dirt that can be washed off.' },
                { id: 'b', prompt: 'Why does a shiny iron nail lose its shine after being left in a humid garden for a week?', answer: 'The iron has reacted with oxygen and water to form iron oxide',
                  options: ['The iron has reacted with oxygen and water to form iron oxide', '"rust" is just a layer of dirt that can be washed off'],
                  hint: 'Review the section on properties of materials (lustre and hardness).',
                  misconception: 'Students often believe that "rust" is just a layer of dirt that can be washed off.' },
                { id: 'c', prompt: 'Is rusting a surface change or a chemical reaction? Explain why.', answer: 'It is a chemical reaction',
                  options: ['It is a chemical reaction', 'surface change', '"rust" is just a layer of dirt that can be washed off'],
                  hint: 'Review the section on properties of materials (lustre and hardness).',
                  misconception: 'Students often believe that "rust" is just a layer of dirt that can be washed off.' }
          ],
            remediations: { 'rust-is-just-a-layer': { steps: ['Have the student take a piece of steel wool (which is iron).', 'Ask them to rub the reddish-brown flakes off a rusted object and compare the texture of the flakes to the original.', 'Explain that the metal has "changed" into this powder and cannot turn back into iron just by cleaning.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_004', difficulty: 'standard',
          question: 'Metals react with air and moisture at different rates: some form protective.',
          hint: 'Review the "Lustrous appearance" section in Chapter 6.',
          misconception: 'Students often believe "all metals rust." They confuse "rusting" (which is specific to iron) with any surface change.',
          parts: [
                { id: 'a', prompt: 'What is the green coating that forms on copper objects exposed to air for a long time called?', answer: 'It is called patina',
                  options: ['It is called patina', 'all metals rust', 'rusting', '"all metals rust'],
                  hint: 'Review the "Lustrous appearance" section in Chapter 6.',
                  misconception: 'Students often believe "all metals rust." They confuse "rusting" (which is specific to iron) with any surface change.' }
          ],
            remediations: { 'all-metals-rust': { steps: ['Ask the student to rub the green surface of a copper item and compare it to the flaky, orange-brown flakes of a rusted.', 'Explain that "rust" is the specific name for the damage iron suffers.', 'Tell them: "Iron\'s surface is like a crumbling wall, but copper\'s surface is like a coat of paint that protects the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_005', difficulty: 'standard',
          question: 'Non-metals are materials that generally lack metallic properties such.',
          hint: 'Review the section on lustre and conductivity in Chapter 6.',
          misconception: 'Students often believe that if a material is solid and hard, it must be a metal.',
          parts: [
                { id: 'a', prompt: 'Name two physical properties that distinguish most non-metals from metals.', answer: 'Non-metals are generally dull (lack lustre) and are poor conductors of heat and',
                  options: ['Non-metals are generally dull (lack lustre) and are poor conductors of heat and', 'non-metals are hard and shiny', 'hardness', 'metallic nature'],
                  hint: 'Review the section on lustre and conductivity in Chapter 6.',
                  misconception: 'Students often believe that if a material is solid and hard, it must be a metal.' },
                { id: 'b', prompt: 'If you have a piece of sulfur and a piece of iron, how can you test which one is a metal?', answer: 'First, observe if it is shiny (lustre)',
                  options: ['First, observe if it is shiny (lustre)', 'hardness', 'metallic nature', 'if a material is solid and hard, it must be a metal'],
                  hint: 'Review the section on lustre and conductivity in Chapter 6.',
                  misconception: 'Students often believe that if a material is solid and hard, it must be a metal.' }
          ],
            remediations: { 'if-a-material-is-solid': { steps: ['Ask the student to compare a piece of coal (non-metal) and a coin (metal).', 'Tell them to rub both on sandpaper and observe the surface; the coin will show a metallic shine, while the coal will.', 'Explain that hardness is a separate property, and they must check for shine and conductivity to confirm if something.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_006', difficulty: 'standard',
          question: 'Non-metals are materials that are essential for supporting biological life.',
          hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
          misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
          parts: [
                { id: 'a', prompt: 'Name two non-metals that are absolutely essential for keeping an animal alive.', answer: 'Oxygen and carbon',
                  options: ['Oxygen and carbon', 'more important'],
                  hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'b', prompt: 'Why would a human be unable to survive for more than a few minutes without oxygen?', answer: 'Oxygen is required for cells to perform respiration and extract energy from food',
                  options: ['Oxygen is required for cells to perform respiration and extract energy from food', 'it keeps us cool', 'more important'],
                  hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'c', prompt: 'If you were to analyze the "backbone" of a human cell, which non-metal would you find at the center of every protein and DNA strand?', answer: 'Carbon',
                  options: ['Carbon', 'more important'],
                  hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' }
          ],
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
