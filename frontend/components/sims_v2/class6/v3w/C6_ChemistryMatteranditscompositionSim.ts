import type { SimDef } from '../../engine/types';
import C6_ChemistryMatteranditscompositionSim from '../../../simulations/c6_12/C6_ChemistryMatteranditscompositionSim';

/** v3 wrapped master — C6_ChemistryMatteranditscompositionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_chemistrymatteranditscompositionsim: SimDef = {
    id: 'v3w_c6_chemistrymatteranditscompositionsim',
    title: 'Matteranditscomposition',
    subtitle: 'Covers the definition of materials/matter and the logic of classification based on.',
    classLevel: 6, subject: 'chemistry', topic: 'What Are Materials and Why We Classify Them',
    chapters: [],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_010', 'c6_chemistry_ch05_001', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass?', goal: 'Master Matteranditscomposition.' },
    discovery: {
        question: 'What are the two essential characteristics that define anything as "matter"?',
        options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
        answer: 'Matter must occupy space (volume) and have mass',
        hook: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
    },
    teaching: [
        { title: 'Materials are substances used to create.', text: 'Materials are substances used to create objects, and matter is anything that occupies space (volume) and has mass.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'Materials are substances used to create.',
          caseStudy: { intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass? To understand this, start by listing every object in your room.',
            decisions: [{ prompt: 'What are the two essential characteristics that define anything as "matter"?', options: [
                { text: 'Matter must occupy space (volume) and have mass', outcome: 'Matter must occupy space (volume) and have mass. A wrong answer—such as "it must be solid"—reveals.' },
                { text: 'it must be solid', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' },
                { text: 'transparent', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_010', title: 'Matter is defined as anything that.',
          caseStudy: { intro: 'Start by looking at the water bottle on your desk; why is it made of plastic rather than paper?',
            decisions: [{ prompt: 'What are the two requirements for something to be classified as "matter"?', options: [
                { text: 'To be matter, an object must occupy space (have volume) and possess mass', outcome: 'To be matter, an object must occupy space (have volume) and possess mass.' },
                { text: 'matter', outcome: 'Not quite — Students often think that "hardness" means "cannot be broken." They confuse hardness with strength.', reveals: 'hardness-means-cannot-be-broken' },
                { text: 'weight', outcome: 'Not quite — Students often think that "hardness" means "cannot be broken." They confuse hardness with strength.', reveals: 'hardness-means-cannot-be-broken' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_chemistry_ch05_001', title: 'A physical change is a change in the.',
          scaffold: { problem: 'A shopkeeper has a 5 kg block of ice. He cuts it into 5 smaller pieces, each weighing 1 kg. Has the substance changed?',
            steps: [
            { text: 'Identify initial state (5 kg ice).' },
            { text: 'Identify process (cutting).' },
            { text: 'Identify final state (five 1 kg pieces of ice).' },
            { text: 'Compare substance identity (ice remains ice).' },
            { text: 'Conclude it is a physical change.', faded: true, blankAnswer: 'No, it is still ice; therefore, it is a physical change.' }
            ] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_008', title: 'Slow natural changes are gradual.',
          caseStudy: { intro: 'Have you ever wondered why old iron gates turn reddish-brown or why mountain surfaces look rough and crumbly?',
            decisions: [{ prompt: 'Name two examples of natural changes that happen very slowly.', options: [
                { text: 'Weathering and rusting are examples', outcome: 'Weathering and rusting are examples. A wrong answer (like "burning paper") confuses chemical.' },
                { text: 'burning paper', outcome: 'Not quite — Students often think that because a change is "natural," it must be happening quickly (like a.', reveals: 'because-a-change-is-natural' },
                { text: 'natural', outcome: 'Not quite — Students often think that because a change is "natural," it must be happening quickly (like a.', reveals: 'because-a-change-is-natural' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_010', title: 'Cooking, spoilage, and preservation are.',
          caseStudy: { intro: 'Have you ever noticed how a fresh piece of bread turns moldy after a few days, or how a raw egg changes completely when you fry it?',
            decisions: [{ prompt: 'What is the difference between a physical change and a chemical change in food?', options: [
                { text: 'A physical change alters the state or shape of food without changing its identity, while', outcome: 'A physical change alters the state or shape of food without changing its identity, while a chemical.' },
                { text: 'cooking', outcome: 'Not quite — Students often think that "cooking" is only a physical change because the food just gets "softer".', reveals: 'cooking-is-only-a-physical' },
                { text: 'softer', outcome: 'Not quite — Students often think that "cooking" is only a physical change because the food just gets "softer".', reveals: 'cooking-is-only-a-physical' }
            ] }] } }
    ],
    explore: { component: C6_ChemistryMatteranditscompositionSim, prompt: 'Explore the interactive — Matteranditscomposition' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_010', difficulty: 'standard',
          question: 'Matter is defined as anything that occupies space (having volume) and possesses.',
          hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
          misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.',
          parts: [
                { id: 'a', prompt: 'What are the two requirements for something to be classified as "matter"?', answer: 'To be matter, an object must occupy space (have volume) and possess mass',
                  options: ['To be matter, an object must occupy space (have volume) and possess mass', 'matter', 'weight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' },
                { id: 'b', prompt: 'If you can see through a glass window clearly, but you cannot see through a wooden door, how would you classify these two materials?', answer: 'The glass is transparent, and the wood is opaque',
                  options: ['The glass is transparent, and the wood is opaque', 'hardness', 'cannot be broken'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' },
                { id: 'c', prompt: 'You have a sugar cube and a pebble. You place both in separate glasses of water and stir. What happens, and what property does this demonstrate?', answer: 'The sugar dissolves (soluble), while the pebble remains unchanged (insoluble)',
                  options: ['The sugar dissolves (soluble), while the pebble remains unchanged (insoluble)', 'hardness', 'cannot be broken'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' }
          ],
            remediations: { 'hardness-means-cannot-be-broken': { steps: ['Ask the student to take a metal key and try to scratch a piece of wood, a piece of chalk, and a stone.', 'Explain that "hardness" specifically refers to the resistance of a material to being scratched or compressed, not how.', 'Repeat the test with an eraser versus a piece of wood to show that even if an object is solid, it has a relative level.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.',
          parts: [
                { id: 'a', prompt: 'If you were asked to design a new type of umbrella, what properties would you look for in a material?', answer: 'The material must be opaque, insoluble in water, and likely flexible',
                  options: ['The material must be opaque, insoluble in water, and likely flexible', 'hardness', 'cannot be broken', '"hardness" means "cannot be broken'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' }
          ],
            remediations: { 'hardness-means-cannot-be-broken': { steps: ['Ask the student to take a metal key and try to scratch a piece of wood, a piece of chalk, and a stone.', 'Explain that "hardness" specifically refers to the resistance of a material to being scratched or compressed, not how.', 'Repeat the test with an eraser versus a piece of wood to show that even if an object is solid, it has a relative level.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_001', difficulty: 'standard',
          question: 'A physical change is a change in the form, shape, size, or state of a substance.',
          hint: 'Review the properties of solids and liquids from the chapter on matter.',
          misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.',
          parts: [
                { id: 'a', prompt: 'If you stretch a rubber band, is it still a rubber band?', answer: 'Yes, it is still a rubber band',
                  options: ['Yes, it is still a rubber band', 'shape change', 'substance change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' },
                { id: 'b', prompt: 'When you dissolve salt in water, does the salt disappear and become a new substance, or does it stay as salt?', answer: 'The salt stays as salt, it just changes its state (by mixing/dissolving)',
                  options: ['The salt stays as salt, it just changes its state (by mixing/dissolving)', 'permanent', 'drastic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' }
          ],
            remediations: { 'if-a-change-is-permanent': { steps: ['Ask the student to name the material before and after the change (e.g., "Glass before, glass after").', 'Remind them that a physical change is about the *identity* of the stuff, not whether it is easy to put back together.', 'Use the example of a jigsaw puzzle: cutting the picture into pieces is a physical change because it is still the same.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.',
          parts: [
                { id: 'a', prompt: 'If a boy breaks a glass bottle, is this a physical change? Justify your answer.', answer: 'Yes, it is a physical change',
                  options: ['Yes, it is a physical change', 'destruction', 'damage', 'chemical change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' },
                { id: 'b', prompt: 'Think of a real-world object in your kitchen. Describe how you could perform a physical change on it.', answer: 'An example would be crushing a dry biscuit into crumbs',
                  options: ['An example would be crushing a dry biscuit into crumbs', 'permanent', 'drastic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' }
          ],
            remediations: { 'if-a-change-is-permanent': { steps: ['Ask the student to name the material before and after the change (e.g., "Glass before, glass after").', 'Remind them that a physical change is about the *identity* of the stuff, not whether it is easy to put back together.', 'Use the example of a jigsaw puzzle: cutting the picture into pieces is a physical change because it is still the same.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_008', difficulty: 'standard',
          question: 'Slow natural changes are gradual transformations in the environment, such as.',
          hint: 'Review the definitions of "Physical" and "Chemical" changes.',
          misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a.',
          parts: [
                { id: 'a', prompt: 'Name two examples of natural changes that happen very slowly.', answer: 'Weathering and rusting are examples',
                  options: ['Weathering and rusting are examples', 'burning paper', 'natural'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all if.' },
                { id: 'b', prompt: 'If you see a statue change color after ten years, why is this called a "slow change"?', answer: 'It is slow because the change is not visible in a single moment or day',
                  options: ['It is slow because the change is not visible in a single moment or day', 'natural', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all if.' },
                { id: 'c', prompt: 'Compare rusting to the movement of a swing. Which one is a "slow change" and why?', answer: 'Rusting is a slow change',
                  options: ['Rusting is a slow change', 'motion', 'material change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all if.' }
          ],
            remediations: { 'because-a-change-is-natural': { steps: ['Ask the student to watch a piece of iron wool left in a damp place for three days.', 'Point out the color change on Day 1, Day 2, and Day 3.', 'Explain that "slow" just means it requires more time to become visible, not that it isn\'t happening.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_010', difficulty: 'standard',
          question: 'Cooking, spoilage, and preservation are processes that involve changes in food;.',
          hint: 'Review the definitions of physical and chemical changes in the context of common.',
          misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They.',
          parts: [
                { id: 'a', prompt: 'If milk turns into yogurt (curd), is this a physical or chemical change? Explain why.', answer: 'It is a chemical change',
                  options: ['It is a chemical change', 'white and soft', 'cooking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' },
                { id: 'b', prompt: 'You have cooked rice. If you leave it on the counter for two days, it spoils. Is this spoilage a physical or chemical change? Why?', answer: 'It is a chemical change',
                  options: ['It is a chemical change', 'cooking', 'softer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' },
                { id: 'c', prompt: 'Why do we put pickles or jams in jars and seal them tightly?', answer: 'We seal them to stop air and microbes from entering',
                  options: ['We seal them to stop air and microbes from entering', 'cooking', 'softer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' }
          ],
            remediations: { 'cooking-is-only-a-physical': { steps: ['Ask the student: "If you take a piece of raw dough and bake it into bread, can you turn the bread back into dough by.', 'Then, ask them to list one change they can reverse (like freezing water) and one they cannot (like burning toast) to.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They.',
          parts: [
                { id: 'a', prompt: 'If you boil water to make tea, the steam is a physical change, but the brewing of tea leaves is a chemical change. Do you agree? Why?', answer: 'Yes, boiling water only changes the state of water (liquid to gas)',
                  options: ['Yes, boiling water only changes the state of water (liquid to gas)', 'cooking', 'softer', 'warmer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' }
          ],
            remediations: { 'cooking-is-only-a-physical': { steps: ['Ask the student: "If you take a piece of raw dough and bake it into bread, can you turn the bread back into dough by.', 'Then, ask them to list one change they can reverse (like freezing water) and one they cannot (like burning toast) to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
