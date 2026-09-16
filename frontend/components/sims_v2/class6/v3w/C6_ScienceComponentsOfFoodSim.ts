import type { SimDef } from '../../engine/types';
import C6_ScienceComponentsOfFoodSim from '../../../simulations/c6_12/C6_ScienceComponentsOfFoodSim';

/** v3 wrapped master — C6_ScienceComponentsOfFoodSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencecomponentsoffoodsim: SimDef = {
    id: 'v3w_c6_sciencecomponentsoffoodsim',
    title: 'Components Of Food',
    subtitle: 'This node covers the definition and components of a balanced diet within the context of.',
    classLevel: 6, subject: 'science', topic: 'What is a Balanced Diet?',
    chapters: [],
    nodeIds: ['c6_biology_ch09_007', 'c6_biology_ch09_001', 'c6_biology_ch09_003', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Think about how you feel after eating a heavy meal of just sweets versus a meal with dal, roti, and.', goal: 'Master Components Of Food.' },
    discovery: {
        question: 'Why is it important to eat fruits and vegetables in their raw or lightly cooked state when possible?',
        options: ['Cooking at high heat can destroy sensitive nutrients like Vitamin C', 'because it tastes better', 'balanced'],
        answer: 'Cooking at high heat can destroy sensitive nutrients like Vitamin C',
        hook: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
    },
    teaching: [
        { title: 'A balanced diet is a daily food pattern that.', text: 'A balanced diet is a daily food pattern that provides the body with the right proportions of energy-giving carbohydrates and fats, body-building proteins, and protective vitamins and minerals, along.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_biology_ch09_007', title: 'A balanced diet is a daily food pattern.',
          scaffold: { problem: 'A student eats 3 rotis (150g), 1 bowl of dal (100g), and 1 bowl of green vegetables (100g).',
            steps: [
            { text: 'List the food items: Roti, Dal, Green Vegetables.' },
            { text: 'Assign nutrient roles: Roti (Carbs), Dal (Protein), Green Veg (Vitamins/Minerals/Fibre).' },
            { text: 'Check for variety: Are all major groups present? Yes.' },
            { text: 'Evaluate balance: Does it provide energy, building blocks, and protection? Yes.' },
            { text: 'Interpretation: This is a balanced start because it covers all three major nutrient categories.', faded: true, blankAnswer: 'This is a balanced meal as it contains Carbohydrates.' }
            ] } },
        { type: 'case', nodeId: 'c6_biology_ch09_001', title: 'The digestive system is a biological.',
          caseStudy: { intro: 'Imagine you just ate your favourite snack—how does that bite of bread actually become the energy you use to run or study?',
            decisions: [{ prompt: 'What is the primary function of the digestive system?', options: [
                { text: 'The primary function is to break down large, complex food into simpler substances that', outcome: 'The primary function is to break down large, complex food into simpler substances that the body can.' },
                { text: 'chewing', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' },
                { text: 'eating', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_003', title: 'Digestion is the biological process of.',
          scaffold: { problem: 'A student eats a piece of bread. Trace the state of the bread from the moment it enters the mouth until it leaves the stomach.',
            steps: [
            { text: 'In the mouth, teeth grind bread into small particles.' },
            { text: 'Saliva chemically begins breaking down starch in the bread.' },
            { text: 'The tongue shapes it into a bolus for easy swallowing.' },
            { text: 'The oesophagus uses rhythmic contractions to move the bolus down.' },
            { text: 'The stomach receives the bolus and mixes it with acid to continue digestion.', faded: true, blankAnswer: 'The bread changes from a solid piece to a ground mixture,.' }
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
        { type: 'case', nodeId: 'c6_chemistry_ch05_004', title: 'Combustion is a chemical change where a.',
          caseStudy: { intro: 'Have you ever wondered why a candle flame glows or why a wood fire keeps us warm on a winter night?',
            decisions: [{ prompt: 'What are the two forms of energy released during the process of combustion?', options: [
                { text: 'The two forms of energy released are heat and light', outcome: 'The two forms of energy released are heat and light. A wrong answer here suggests the student is.' },
                { text: 'combustion is merely "fire," rather than a chemical reaction involving oxygen', outcome: 'Not quite — Students often believe that combustion is merely "fire," rather than a chemical reaction involving.', reveals: 'combustion-is-merely-fire' }
            ] }] } }
    ],
    explore: { component: C6_ScienceComponentsOfFoodSim, prompt: 'Explore the interactive — Components Of Food' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'standard',
          question: 'A balanced diet is a daily food pattern that provides the body with the right.',
          hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A balanced diet is a daily food pattern that provides the body with the right proportions',
                  options: ['A balanced diet is a daily food pattern that provides the body with the right proportions', 'The digestive system is a biological network of organs, including a long muscular tube', 'Digestion is the biological process of breaking down large, complex food molecules into', 'Cellular respiration is the process where cells break down digested food (like simple'],
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
            remediations: { 'balanced-means-eating-the-same': { steps: ['Review the function of "Protective Nutrients" versus "Energy-giving Foods." Explain that while we need large amounts of.', 'Use the analogy of a car: you need a full tank of fuel (carbs) to drive, but only a tiny drop of oil (vitamins) to keep.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_001', difficulty: 'standard',
          question: 'The digestive system is a biological network of organs, including a long.',
          hint: 'Review the "Components of Food" chapter to identify what exactly needs to be broken down.',
          misconception: 'Students often believe that "digestion" only happens in the stomach.',
          parts: [
                { id: 'a', prompt: 'Why does the body need accessory organs like the liver and pancreas if we already have a long muscular tube?', answer: 'The tube holds the food, but the accessory organs provide essential juices that',
                  options: ['The tube holds the food, but the accessory organs provide essential juices that', 'digestion', '"digestion" only happens in the stomach'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "digestion" only happens in the stomach.' }
          ],
            remediations: { 'digestion-only-happens-in-the': { steps: ['Ask the student: "Does the bread you chew turn into mush in your mouth or your stomach?" 2.', 'Explain that the mouth is the first station of the factory.', 'Show a diagram highlighting that digestion is a journey, not a single destination.', 'Re-emphasize that the stomach is just one room in a large, multi-room building.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "digestion" only happens in the stomach.',
          parts: [
                { id: 'a', prompt: 'Is it more efficient for the body to have one long tube or many separate, disconnected parts for digestion?', answer: 'One connected tube is more efficient',
                  options: ['One connected tube is more efficient', 'digestion', '"digestion" only happens in the stomach'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "digestion" only happens in the stomach.' }
          ],
            remediations: { 'digestion-only-happens-in-the': { steps: ['Ask the student: "Does the bread you chew turn into mush in your mouth or your stomach?" 2.', 'Explain that the mouth is the first station of the factory.', 'Show a diagram highlighting that digestion is a journey, not a single destination.', 'Re-emphasize that the stomach is just one room in a large, multi-room building.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_003', difficulty: 'standard',
          question: 'Digestion is the biological process of breaking down large, complex food.',
          hint: 'Review the "Components of Food" chapter to understand what needs to be broken down.',
          misconception: 'Students often think digestion happens all at once in the stomach.',
          parts: [
                { id: 'a', prompt: 'What is the name of the tube that carries food from the mouth to the stomach?', answer: 'The tube is called the oesophagus',
                  options: ['The tube is called the oesophagus', 'windpipe', 'throat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think digestion happens all at once in the stomach.' }
          ],
            remediations: { 'digestion-happens-all-at-once': { steps: ['First, ask the student to trace the path of a bite of chapati using a diagram.', 'Point out that the mouth is the "first station" where chemical action starts, not just a place to chew.', 'Have them explain what saliva does to starches compared to what the stomach does to mix food with acid, reinforcing.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think digestion happens all at once in the stomach.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Digestion is only about making food small enough to swallow." Why is this incomplete?', answer: 'This is incomplete',
                  options: ['This is incomplete', 'digestion happens all at once in the stomach'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think digestion happens all at once in the stomach.' },
                { id: 'b', prompt: 'Imagine a food item that is not chewed properly. Based on what you know about digestion, what might happen to the effectiveness of the stomach\'s work?', answer: 'The stomach will have to work much harder to break down the large chunks',
                  options: ['The stomach will have to work much harder to break down the large chunks', 'digestion happens all at once in the stomach'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think digestion happens all at once in the stomach.' }
          ],
            remediations: { 'digestion-happens-all-at-once': { steps: ['First, ask the student to trace the path of a bite of chapati using a diagram.', 'Point out that the mouth is the "first station" where chemical action starts, not just a place to chew.', 'Have them explain what saliva does to starches compared to what the stomach does to mix food with acid, reinforcing.'] } } },
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
            remediations: { 'combustion-is-merely-fire': { steps: ['First, explain that in chemistry, "matter is never destroyed, only transformed." Use the candle example: point out that.', 'Ask the student: "If the wax just vanished, where did the energy come from?" Guide them to see that the change is the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
