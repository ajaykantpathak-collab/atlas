import type { SimDef } from '../../engine/types';
import C6_ScienceSeparationOfSubstancesSim from '../../../simulations/c6_12/C6_ScienceSeparationOfSubstancesSim';

/** v3 wrapped master — C6_ScienceSeparationOfSubstancesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_scienceseparationofsubstancessim: SimDef = {
    id: 'v3w_c6_scienceseparationofsubstancessim',
    title: 'Separation Of Substances',
    subtitle: 'This node covers the definition and observable signs of chemical changes (e.g., color.',
    classLevel: 6, subject: 'science', topic: 'Chemical Changes: New Substances Are Born',
    chapters: [],
    nodeIds: ['c6_chemistry_ch05_002', 'c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_009', 'c6_physics_ch02_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why a piece of paper turns into ash when it burns, but simply turns into smaller.', goal: 'Master Separation Of Substances.' },
    discovery: {
        question: 'What are the two essential characteristics that define anything as "matter"?',
        options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
        answer: 'Matter must occupy space (volume) and have mass',
        hook: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
    },
    teaching: [
        { title: 'A chemical change is a process in which one.', text: 'A chemical change is a process in which one or more substances undergo a transformation to create entirely new substances with different properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_chemistry_ch05_002', title: 'A chemical change is a process in which.',
          caseStudy: { intro: 'Have you ever wondered why a piece of paper turns into ash when it burns, but simply turns into smaller pieces when you rip it?',
            decisions: [{ prompt: 'What is the most important sign that a chemical change has occurred?', options: [
                { text: 'The formation of a new substance with different properties is the key sign', outcome: 'The formation of a new substance with different properties is the key sign.' },
                { text: 'a change in shape', outcome: 'Not quite — Students often believe that any change in appearance (like color) or any change involving heat is a.', reveals: 'any-change-in-appearance-like' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'Materials are substances used to create.',
          caseStudy: { intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass? To understand this, start by listing every object in your room.',
            decisions: [{ prompt: 'What are the two essential characteristics that define anything as "matter"?', options: [
                { text: 'Matter must occupy space (volume) and have mass', outcome: 'Matter must occupy space (volume) and have mass. A wrong answer—such as "it must be solid"—reveals.' },
                { text: 'it must be solid', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' },
                { text: 'transparent', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_002', title: 'Materials are substances used to create.',
          scaffold: { problem: 'You have a sugar cube, a stone, and a piece of chalk. You place each in separate beakers of water and stir.',
            steps: [
            { text: 'Identify the materials given (sugar, stone, chalk).' },
            { text: 'Define solubility as the ability of a substance to dissolve (disappear) in water.' },
            { text: 'Predict the outcome for each: sugar dissolves, stone and chalk do not.' },
            { text: 'Conclude that sugar is soluble, while stone and chalk are insoluble.' },
            { text: 'Verify by noting that "soluble" means the substance mixes completely with the water.', faded: true, blankAnswer: 'Sugar is soluble; stone and chalk are insoluble.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_006', title: 'Non-metals are materials that are.',
          scaffold: { problem: 'A student has a list of items: Iron nail, Oxygen gas, Gold ring, Carbon-based sugar, Copper wire.',
            steps: [
            { text: 'Examine the function of each item.' },
            { text: 'Identify Iron, Gold, and Copper as metals used for building or tools.' },
            { text: 'Identify Oxygen and Carbon (in sugar) as items required for biological energy and structure.' },
            { text: 'Group them based on these two categories.', faded: true, blankAnswer: 'Structural: Iron nail, Gold ring, Copper wire;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_009', title: 'Corrosion is the gradual, harmful.',
          scaffold: { problem: 'A farmer has an iron plough worth 500 rupees. He notices small brown spots on it.',
            steps: [
            { text: 'Identify the loss of value (if the plough rusts, it may become unusable, costing 500 rupees).' },
            { text: 'Identify the cost of prevention (50 + 100 = 150 rupees).' },
            { text: 'Compare 150 rupees to the potential loss of 500 rupees.' },
            { text: 'Determine if 150 is less than 500.' },
            { text: 'Conclude that spending 150 to save 500 is an economic necessity.', faded: true, blankAnswer: 'Yes, it is worth it as it saves 350 rupees in potential.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch02_008', title: 'Natural indicators are substances.',
          scaffold: { problem: 'You have a solution of soap (base) and a solution of vinegar (acid). You have turmeric paper. Describe the results of testing both.',
            steps: [
            { text: 'Identify the substances (Soap = Base, Vinegar = Acid).' },
            { text: 'Recall the indicator rule (Turmeric turns red-brown in base, no change in acid).' },
            { text: 'Test soap solution: Apply soap to turmeric paper.' },
            { text: 'Result: The paper turns red-brown.' },
            { text: 'Test vinegar: Apply vinegar to turmeric paper.' },
            { text: 'Result: The paper remains yellow.', faded: true, blankAnswer: 'Soap turns turmeric red-brown; Vinegar leaves turmeric.' }
            ] } }
    ],
    explore: { component: C6_ScienceSeparationOfSubstancesSim, prompt: 'Explore the interactive — Separation Of Substances' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_002', difficulty: 'standard',
          question: 'A chemical change is a process in which one or more substances undergo a.',
          hint: 'Review the properties of matter (solid, liquid, gas) and physical changes.',
          misconception: 'Students often believe that any change in appearance (like color) or any change involving heat is a chemical change.',
          parts: [
                { id: 'a', prompt: 'What is the most important sign that a chemical change has occurred?', answer: 'The formation of a new substance with different properties is the key sign',
                  options: ['The formation of a new substance with different properties is the key sign', 'a change in shape'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any change in appearance (like color) or any change involving heat is a chemical change.' }
          ],
            remediations: { 'any-change-in-appearance-like': { steps: ['Ask the student: "If you change the shape or state of an object, can you get the original back?" Explain that if the.', 'If the answer is \'no\' (like burnt paper), it is chemical because the identity of the material has changed forever.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_001', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and matter is anything that.',
          hint: 'Review the definitions of adjectives describing physical appearance and texture.',
          misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
          parts: [
                { id: 'a', prompt: 'What are the two essential characteristics that define anything as "matter"?', answer: 'Matter must occupy space (volume) and have mass',
                  options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' },
                { id: 'b', prompt: 'If you have a steel spoon and a wooden spoon, why might you classify them differently in a "shiny vs. dull" test?', answer: 'Steel is lustrous (shiny), whereas wood is non-lustrous (dull)',
                  options: ['Steel is lustrous (shiny), whereas wood is non-lustrous (dull)', 'appearance', 'lustre'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' }
          ],
            remediations: { 'students-often-confuse-transparent-with': { steps: ['First, ask the student to look through a piece of colored cellophane paper at a light source.', 'Ask: "Can you see the light even though it is colored?" Explain that if light passes through, it is transparent,.', 'Then, have them compare this to a piece of wood, which blocks all light, to solidify the difference between transparent.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_002', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and they are classified based.',
          hint: 'Review the activity of listing objects around you and identifying the material they are.',
          misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.',
          parts: [
                { id: 'a', prompt: 'What do we call a material that has a shiny surface when light falls on it?', answer: 'Such a material is called lustrous',
                  options: ['Such a material is called lustrous', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'b', prompt: 'If you can easily press a material with your fingers, how would you describe its hardness?', answer: 'The material is described as soft',
                  options: ['The material is described as soft', 'non-lustrous', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'c', prompt: 'You have a glass of water. You add a spoonful of sand to it and stir. Will the sand disappear? Why or why not?', answer: 'The sand will not disappear',
                  options: ['The sand will not disappear', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' }
          ],
            remediations: { 'if-a-material-is-hard': { steps: ['Ask the student to find a piece of metal that is soft (like a thin aluminum foil) and a non-metal that is hard (like a.', 'Have them press the foil and try to scratch the wood.', 'Explain that properties like "hard" or "soft" are specific to the material\'s reaction to force, not whether it is a.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.',
          parts: [
                { id: 'a', prompt: 'Your friend wants to make a boat out of paper, but you want to make one out of metal. Which material is more suitable for staying in water for a long time?', answer: 'The metal boat is more suitable',
                  options: ['The metal boat is more suitable', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' },
                { id: 'b', prompt: 'Imagine a new material that is opaque, very hard, and insoluble in water. Suggest one object you could make with it.', answer: 'An example would be a construction brick or a heavy-duty hammer head',
                  options: ['An example would be a construction brick or a heavy-duty hammer head', 'if a material is hard, it must be metal, or if it is soft, it cannot be a metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if a material is hard, it must be metal, or if it is soft, it cannot be a metal.' }
          ],
            remediations: { 'if-a-material-is-hard': { steps: ['Ask the student to find a piece of metal that is soft (like a thin aluminum foil) and a non-metal that is hard (like a.', 'Have them press the foil and try to scratch the wood.', 'Explain that properties like "hard" or "soft" are specific to the material\'s reaction to force, not whether it is a.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_006', difficulty: 'standard',
          question: 'Non-metals are materials that are essential for supporting biological life.',
          hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
          misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
          parts: [
                { id: 'a', prompt: 'Name two non-metals that are absolutely essential for keeping an animal alive.', answer: 'Oxygen and carbon',
                  options: ['Oxygen and carbon', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'b', prompt: 'Why would a human be unable to survive for more than a few minutes without oxygen?', answer: 'Oxygen is required for cells to perform respiration and extract energy from food',
                  options: ['Oxygen is required for cells to perform respiration and extract energy from food', 'it keeps us cool', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'c', prompt: 'If you were to analyze the "backbone" of a human cell, which non-metal would you find at the center of every protein and DNA strand?', answer: 'Carbon',
                  options: ['Carbon', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' }
          ],
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say that "metals are more important than non-metals because we build houses with them"? Why or why not?', answer: 'No, it is inaccurate',
                  options: ['No, it is inaccurate', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' }
          ],
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_009', difficulty: 'standard',
          question: 'Corrosion is the gradual, harmful chemical reaction of a metal surface with its.',
          hint: 'Review the section on "Lustrous appearance" in the textbook.',
          misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.',
          parts: [
                { id: 'a', prompt: 'What is the specific name for the common process where iron turns into a reddish-brown, flaky substance when exposed to air and water?', answer: 'The process is called rusting',
                  options: ['The process is called rusting', 'burning', 'melting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.' },
                { id: 'b', prompt: 'You want to protect a new iron garden chair from the rain. If you have paint, a thin cloth, and a sponge, which would be the best choice and how would you.', answer: 'You should use paint',
                  options: ['You should use paint', 'corrosion is just "dirt" or "dust" accumulating on the metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.' }
          ],
            remediations: { 'corrosion-is-just-dirt-or': { steps: ['First, ask the student to scratch the "rust" off a piece of old iron.', 'Point out that the metal underneath looks different or thinner, proving the surface has changed.', 'Explain that cleaning is not enough; the barrier (like paint) must be replaced to prevent the chemical reaction from.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Because gold jewelry does not rust, it must not be a metal." Is this correct? Why or why not?', answer: 'This is incorrect',
                  options: ['This is incorrect', '"metal" is defined only by the ability to rust', 'corrosion is just "dirt" or "dust" accumulating on the metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.' }
          ],
            remediations: { 'corrosion-is-just-dirt-or': { steps: ['First, ask the student to scratch the "rust" off a piece of old iron.', 'Point out that the metal underneath looks different or thinner, proving the surface has changed.', 'Explain that cleaning is not enough; the barrier (like paint) must be replaced to prevent the chemical reaction from.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_008', difficulty: 'standard',
          question: 'Natural indicators are substances derived from plants that change their colour.',
          hint: 'Review the properties of acids and bases in the basic science chapter.',
          misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").',
          parts: [
                { id: 'a', prompt: 'What colour does turmeric powder turn when it comes in contact with a basic substance like soap solution?', answer: 'Turmeric turns red-brown in a basic solution',
                  options: ['Turmeric turns red-brown in a basic solution', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'b', prompt: 'If you dip a piece of blue litmus paper into lemon juice, what change do you expect to see, and what does this tell you about the lemon juice?', answer: 'The blue litmus paper will turn red, indicating that lemon juice is an acid',
                  options: ['The blue litmus paper will turn red, indicating that lemon juice is an acid', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'c', prompt: 'You have a mystery liquid that turns red cabbage juice from purple to green. Is this liquid an acid or a base?', answer: 'The liquid is a base',
                  options: ['The liquid is a base', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' }
          ],
            remediations: { 'all-natural-indicators-change-to': { steps: ['First, provide a table listing the indicator and its specific reaction to acids and bases.', 'Second, ask the student to perform a "blind test" using three cups: one with vinegar, one with soap water, and one with.', 'Have them record the results in a notebook to visually reinforce that different indicators react differently to the.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").',
          parts: [
                { id: 'a', prompt: 'Imagine you are at a picnic and spill vinegar (an acid) on your white shirt which has a turmeric stain.', answer: 'The stain will remain yellow',
                  options: ['The stain will remain yellow', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' }
          ],
            remediations: { 'all-natural-indicators-change-to': { steps: ['First, provide a table listing the indicator and its specific reaction to acids and bases.', 'Second, ask the student to perform a "blind test" using three cups: one with vinegar, one with soap water, and one with.', 'Have them record the results in a notebook to visually reinforce that different indicators react differently to the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
