import type { SimDef } from '../../engine/types';
import C6_ScienceFoodWhereDoesItComeSim from '../../../simulations/c6_12/C6_ScienceFoodWhereDoesItComeSim';

/** v3 wrapped master — C6_ScienceFoodWhereDoesItComeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencefoodwheredoesitcomesim: SimDef = {
    id: 'v3w_c6_sciencefoodwheredoesitcomesim',
    title: 'Food Where Does It Come',
    subtitle: 'This node covers the definition, requirements (fuel, oxygen, heat), and products of.',
    classLevel: 6, subject: 'science', topic: 'Combustion: Burning and Its Characteristics',
    chapters: [],
    nodeIds: ['c6_chemistry_ch05_004', 'c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_chemistry_ch05_010', 'c6_chemistry_ch05_001', 'c6_chemistry_ch05_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why a candle flame glows or why a wood fire keeps us warm on a winter night?', goal: 'Master Food Where Does It Come.' },
    discovery: {
        question: 'Is it possible to have combustion if you have plenty of fuel and oxygen, but no way to provide initial heat? Justify your answer.',
        options: ['No, combustion will not occur', 'combustion happens spontaneously without an ignition source', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
        answer: 'No, combustion will not occur',
        hook: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.',
    },
    teaching: [
        { title: 'Combustion is a chemical change where a.', text: 'Combustion is a chemical change where a substance reacts rapidly with oxygen, releasing energy in the form of heat and light.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_chemistry_ch05_004', title: 'Combustion is a chemical change where a.',
          caseStudy: { intro: 'Have you ever wondered why a candle flame glows or why a wood fire keeps us warm on a winter night?',
            decisions: [{ prompt: 'What are the two forms of energy released during the process of combustion?', options: [
                { text: 'The two forms of energy released are heat and light', outcome: 'The two forms of energy released are heat and light. A wrong answer here suggests the student is.' },
                { text: 'combustion is merely "fire," rather than a chemical reaction involving oxygen', outcome: 'Not quite — Students often believe that combustion is merely "fire," rather than a chemical reaction involving.', reveals: 'combustion-is-merely-fire' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch10_001', title: 'Plant growth is the biological process.',
          scaffold: { problem: 'A student plants 20 gram-seeds in a pot. After 5 days, only 15 seeds have sprouted.',
            steps: [
            { text: 'Identify total seeds (20) and sprouted seeds (15).' },
            { text: 'Use the percentage formula: (Part/Whole) * 100.' },
            { text: '(15 / 20) = 0.75.' },
            { text: '0.75 * 100 = 75%.' },
            { text: 'Interpretation: 75% germinated; 25% failed due to lack of water, bad seed quality, or temperature.', faded: true, blankAnswer: '75% of seeds germinated.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch10_002', title: 'Photosynthesis is the process by which.',
          scaffold: { problem: 'A farmer has two identical tomato plants. Plant A is placed in a sunny window and watered daily.',
            steps: [
            { text: 'Identify inputs for Plant A (Sunlight + Water + CO2).' },
            { text: 'Identify inputs for Plant B (Only Water + CO2, no Sunlight).' },
            { text: 'Compare the ability of each plant to perform photosynthesis.' },
            { text: 'Conclude that Plant A will produce food while Plant B will fail to produce food.', faded: true, blankAnswer: 'Plant A will grow, but Plant B will wither because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_005', title: 'Cellular respiration is the process.',
          scaffold: { problem: 'Medu eats a bowl of rice (carbohydrates) for lunch. Trace the path of this energy from his plate to his arm muscles moving a cricket bat.',
            steps: [
            { text: 'Digestion breaks the rice into simple sugars.' },
            { text: 'These sugars enter the bloodstream and travel to the cells.' },
            { text: 'Oxygen (from breathing) also travels via the blood to the cells.' },
            { text: 'Inside the cells, cellular respiration uses oxygen to break down sugars and release energy.' },
            { text: 'This energy powers the muscle contraction, allowing Medu to swing the bat.', faded: true, blankAnswer: 'The energy is transferred from food to the cell, converted.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_006', title: 'A food chain is a linear sequence.',
          scaffold: { problem: 'A farmer grows wheat. A rat eats the wheat. A snake eats the rat. Identify the links and the direction of energy flow.',
            steps: [
            { text: 'Identify the producer (Wheat).' },
            { text: 'Identify the primary consumer (Rat).' },
            { text: 'Identify the secondary consumer (Snake).' },
            { text: 'Draw arrows showing energy flow: Wheat -> Rat -> Snake.', faded: true, blankAnswer: 'Wheat (Producer) -> Rat (Primary Consumer) -> Snake.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_007', title: 'A balanced diet is a daily food pattern.',
          scaffold: { problem: 'A student eats 3 rotis (150g), 1 bowl of dal (100g), and 1 bowl of green vegetables (100g).',
            steps: [
            { text: 'List the food items: Roti, Dal, Green Vegetables.' },
            { text: 'Assign nutrient roles: Roti (Carbs), Dal (Protein), Green Veg (Vitamins/Minerals/Fibre).' },
            { text: 'Check for variety: Are all major groups present? Yes.' },
            { text: 'Evaluate balance: Does it provide energy, building blocks, and protection? Yes.' },
            { text: 'Interpretation: This is a balanced start because it covers all three major nutrient categories.', faded: true, blankAnswer: 'This is a balanced meal as it contains Carbohydrates.' }
            ] } }
    ],
    explore: { component: C6_ScienceFoodWhereDoesItComeSim, prompt: 'Explore the interactive — Food Where Does It Come' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_004', difficulty: 'standard',
          question: 'Combustion is a chemical change where a substance reacts rapidly with oxygen,.',
          hint: 'Review the properties of chemical changes (new substances formed).',
          misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.',
          parts: [
                { id: 'a', prompt: 'What are the two forms of energy released during the process of combustion?', answer: 'The two forms of energy released are heat and light',
                  options: ['The two forms of energy released are heat and light', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' },
                { id: 'b', prompt: 'If you cover a burning candle with a glass jar, the flame eventually goes out. Why does this happen?', answer: 'The flame goes out',
                  options: ['The flame goes out', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' },
                { id: 'c', prompt: 'Compare the burning of a candle to the melting of an ice cube; which one is a chemical change and why?', answer: 'Burning a candle is a chemical change',
                  options: ['Burning a candle is a chemical change', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' }
          ],
            remediations: { 'combustion-is-merely-fire': { steps: ['First, explain that in chemistry, "matter is never destroyed, only transformed." Use the candle example: point out that.', 'Ask the student: "If the wax just vanished, where did the energy come from?" Guide them to see that the change is the.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.',
          parts: [
                { id: 'a', prompt: 'Is it possible to have combustion if you have plenty of fuel and oxygen, but no way to provide initial heat? Justify your answer.', answer: 'No, combustion will not occur',
                  options: ['No, combustion will not occur', 'combustion happens spontaneously without an ignition source', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' },
                { id: 'b', prompt: 'Design a simple experiment to prove that air is necessary for combustion.', answer: 'Place a candle on a plate and light it',
                  options: ['Place a candle on a plate and light it', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' }
          ],
            remediations: { 'combustion-is-merely-fire': { steps: ['First, explain that in chemistry, "matter is never destroyed, only transformed." Use the candle example: point out that.', 'Ask the student: "If the wax just vanished, where did the energy come from?" Guide them to see that the change is the.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_001', difficulty: 'standard',
          question: 'Plant growth is the biological process where a seed absorbs water, splits its.',
          hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
          misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a seed needs to begin the process of growing into a plant?', answer: 'A seed needs moisture, warmth, and air',
                  options: ['A seed needs moisture, warmth, and air', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' },
                { id: 'b', prompt: 'If you plant a seed upside down, in which direction will the root grow? Why?', answer: 'The root will still grow downward',
                  options: ['The root will still grow downward', 'the root just follows the seed\'s orientation', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' }
          ],
            remediations: { 'plants-eat-the-soil-or': { steps: ['Ask the student: "If the seed is in the soil, how does it get food before it has leaves?" Guide them to dissect a.', 'Explain that the soil only provides support and water, not the energy for the very first sprout.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.',
          parts: [
                { id: 'a', prompt: 'Is a seed "alive" while it is sitting in a bag of grains? Justify your answer.', answer: 'Yes, it is "dormant" or alive but inactive',
                  options: ['Yes, it is "dormant" or alive but inactive', 'growth is the only sign of life', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' },
                { id: 'b', prompt: 'Design an experiment to prove that a seed needs water to grow. What would you do?', answer: 'Place two sets of seeds in identical containers with soil and warmth',
                  options: ['Place two sets of seeds in identical containers with soil and warmth', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' }
          ],
            remediations: { 'plants-eat-the-soil-or': { steps: ['Ask the student: "If the seed is in the soil, how does it get food before it has leaves?" Guide them to dissect a.', 'Explain that the soil only provides support and water, not the energy for the very first sprout.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_002', difficulty: 'standard',
          question: 'Photosynthesis is the process by which green plants use sunlight, water, and.',
          hint: 'Review the function of roots vs. leaves in plant anatomy.',
          misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a plant needs to carry out the process of photosynthesis?', answer: 'A plant needs sunlight, water, and carbon dioxide',
                  options: ['A plant needs sunlight, water, and carbon dioxide', 'fertilizer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating a.' },
                { id: 'b', prompt: 'If a plant is kept in a completely dark room for a long time, why does it struggle to survive?', answer: 'The plant cannot perform photosynthesis',
                  options: ['The plant cannot perform photosynthesis', 'thirsty', 'needs space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating a.' }
          ],
            remediations: { 'plants-get-their-food-from': { steps: ['First, ask the student what happens if they keep a slice of bread in the soil—does it grow?', 'Then, explain that roots are like straws for water, but the leaf is the "kitchen." Ask them to trace the path of.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_005', difficulty: 'standard',
          question: 'Cellular respiration is the process where cells break down digested food (like.',
          hint: 'Review the "Components of Food" section regarding carbohydrates and energy.',
          misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the.',
          parts: [
                { id: 'a', prompt: 'Why is cellular respiration considered a "controlled" reaction rather than just "burning"?', answer: '"Burning" would release all energy as heat instantly',
                  options: ['"Burning" would release all energy as heat instantly', 'because it happens in the lungs', 'respiration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the energy release.' }
          ],
            remediations: { 'respiration-is-the-same-thing': { steps: ['Explain that breathing is like a delivery truck (transporting oxygen).', 'Ask the student: "If the truck delivers the package, but no one opens it to use the contents, does the work get done?".', 'Clarify that the "package" is oxygen, and the "work" (releasing energy) only happens inside the cell factory.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the.',
          parts: [
                { id: 'a', prompt: 'Why is cellular respiration considered a "controlled" reaction rather than just "burning"?', answer: '"Burning" would release all energy as heat instantly',
                  options: ['"Burning" would release all energy as heat instantly', 'because it happens in the lungs', 'respiration', 'breathing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the energy release.' }
          ],
            remediations: { 'respiration-is-the-same-thing': { steps: ['Explain that breathing is like a delivery truck (transporting oxygen).', 'Ask the student: "If the truck delivers the package, but no one opens it to use the contents, does the work get done?".', 'Clarify that the "package" is oxygen, and the "work" (releasing energy) only happens inside the cell factory.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_006', difficulty: 'standard',
          question: 'A food chain is a linear sequence showing how energy flows from one organism to.',
          hint: 'Review the process of how plants make food using sunlight.',
          misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.',
          parts: [
                { id: 'a', prompt: 'What do we call the first organism in any food chain that makes its own food using sunlight?', answer: 'They are called producers',
                  options: ['They are called producers', 'consumer', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' },
                { id: 'b', prompt: 'If a deer eats grass and a lion eats the deer, explain why the grass is not a consumer.', answer: 'The grass is a producer',
                  options: ['The grass is a producer', 'anything living that is eaten is a consumer', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' },
                { id: 'c', prompt: 'In a chain: Plant -> Rabbit -> Fox, if the number of plants suddenly decreases, what happens to the energy available for the fox?', answer: 'The energy available for the fox decreases',
                  options: ['The energy available for the fox decreases', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' }
          ],
            remediations: { 'the-food-chain-is-a': { steps: ['First, ask the student to draw a single line on paper.', 'Tell them the arrow represents the "flow of energy." Instruct them to draw a plant at the start and point an arrow from.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'standard',
          question: 'A balanced diet is a daily food pattern that provides the body with the right.',
          hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A balanced diet is a daily food pattern that provides the body with the right proportions',
                  options: ['A balanced diet is a daily food pattern that provides the body with the right proportions', 'Combustion is a chemical change where a substance reacts rapidly with oxygen, releasing', 'Plant growth is the biological process where a seed absorbs water, splits its coat, and', 'Photosynthesis is the process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.' }
          ],
            remediations: { 'balanced-means-eating-the-same': { steps: ['Review the function of "Protective Nutrients" versus "Energy-giving Foods." Explain that while we need large amounts of.', 'Use the analogy of a car: you need a full tank of fuel (carbs) to drive, but only a tiny drop of oil (vitamins) to keep.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Why is it important to eat fruits and vegetables in their raw or lightly cooked state when possible?', answer: 'Cooking at high heat can destroy sensitive nutrients like Vitamin C',
                  options: ['Cooking at high heat can destroy sensitive nutrients like Vitamin C', 'because it tastes better', 'balanced', '"balanced" means eating the same amount (equal grams) of every food type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.' }
          ],
            remediations: { 'balanced-means-eating-the-same': { steps: ['Review the function of "Protective Nutrients" versus "Energy-giving Foods." Explain that while we need large amounts of.', 'Use the analogy of a car: you need a full tank of fuel (carbs) to drive, but only a tiny drop of oil (vitamins) to keep.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
