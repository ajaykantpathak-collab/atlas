import type { SimDef } from '../../engine/types';
import C6_ScienceBodyMovementsSim from '../../../simulations/c6_12/C6_ScienceBodyMovementsSim';

/** v3 wrapped master — C6_ScienceBodyMovementsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencebodymovementssim: SimDef = {
    id: 'v3w_c6_sciencebodymovementssim',
    title: 'Respiration and Circulation: How Oxygen Reaches Cells',
    subtitle: 'This node covers the transport of oxygen via the circulatory system.',
    classLevel: 6, subject: 'science', topic: 'Respiration and Circulation: How Oxygen Reaches Cells',
    chapters: [],
    nodeIds: ['c6_biology_ch09_008', 'c6_biology_ch09_001', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_007', 'c6_physics_ch12_049', 'c6_physics_ch07_019', 'c6_physics_ch07_020', 'c6_physics_ch07_022', 'c6_physics_ch07_021', 'c6_physics_ch12_048', 'c6_physics_ch07_024'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are waiting for a delivery of a parcel at your home.', goal: 'Master Respiration and Circulation: How Oxygen Reaches Cells.' },
    discovery: {
        question: 'What is the primary role of the heart in the context of oxygen transport?',
        options: ['The heart acts as a muscular pump that contracts to move blood through the body', 'makes air', 'stores oxygen'],
        answer: 'The heart acts as a muscular pump that contracts to move blood through the body',
        hook: 'Students often think breathing *is* the same as oxygen reaching the cells.',
    },
    teaching: [
        { title: 'The circulatory system acts as the body\'s.', text: 'The circulatory system acts as the body\'s transport highway, using the heart as a pump to move blood through vessels to deliver oxygen from the lungs to every individual cell.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_biology_ch09_008', title: 'The circulatory system acts as the.',
          scaffold: { problem: 'A runner is sprinting. Explain the 4 steps of how oxygen from their last breath reaches their leg muscles to keep them running.',
            steps: [
            { text: 'Oxygen moves from lungs into the bloodstream.' },
            { text: 'The oxygenated blood is collected and sent to the heart.' },
            { text: 'The heart pumps this blood into the arteries.' },
            { text: 'Arteries branch into tiny vessels that reach the muscle cells.', faded: true, blankAnswer: 'The oxygen is transported via the blood, pumped by the.' }
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
        { type: 'case', nodeId: 'c6_biology_ch09_004', title: 'Breathing is the mechanical action of.',
          caseStudy: { intro: 'Have you ever noticed how your chest moves when you take a deep breath after running?',
            decisions: [{ prompt: 'What is the primary function of the diaphragm during breathing?', options: [
                { text: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into', outcome: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into the lungs.' },
                { text: 'it filters the air', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up.', reveals: 'the-lungs-themselves-pull-the' },
                { text: 'the lungs themselves "pull" the air in, similar to a sponge soaking up water', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up.', reveals: 'the-lungs-themselves-pull-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_005', title: 'Cellular respiration is the process.',
          scaffold: { problem: 'Medu eats a bowl of rice (carbohydrates) for lunch. Trace the path of this energy from his plate to his arm muscles moving a cricket bat.',
            steps: [
            { text: 'Digestion breaks the rice into simple sugars.' },
            { text: 'These sugars enter the bloodstream and travel to the cells.' },
            { text: 'Oxygen (from breathing) also travels via the blood to the cells.' },
            { text: 'Inside the cells, cellular respiration uses oxygen to break down sugars and release energy.' },
            { text: 'This energy powers the muscle contraction, allowing Medu to swing the bat.', faded: true, blankAnswer: 'The energy is transferred from food to the cell, converted.' }
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
    explore: { component: C6_ScienceBodyMovementsSim, prompt: 'Explore the interactive — Respiration and Circulation: How Oxygen Reaches Cells' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch09_008', difficulty: 'standard',
          question: 'The circulatory system acts as the body\'s transport highway, using the heart as.',
          hint: 'Review the concept of lungs and how they exchange gas with the blood.',
          misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.',
          parts: [
                { id: 'a', prompt: 'What is the primary role of the heart in the context of oxygen transport?', answer: 'The heart acts as a muscular pump that contracts to move blood through the body',
                  options: ['The heart acts as a muscular pump that contracts to move blood through the body', 'makes air', 'stores oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.' },
                { id: 'b', prompt: 'A red blood cell is currently in the lung. Describe its journey to a muscle cell in your leg.', answer: 'Step 1: The cell picks up oxygen in the lungs',
                  options: ['Step 1: The cell picks up oxygen in the lungs', 'breathing *is* the same as oxygen reaching the cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.' }
          ],
            remediations: { 'breathing-is-the-same-as': { steps: ['Ask the student: "If you want to send a letter to a friend in another city, does it fly there by itself or does it go.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.',
          parts: [
                { id: 'a', prompt: 'Why is it impossible for a cell deep inside your body to get oxygen directly from the air you breathe?', answer: 'Cells are too far from the lungs for oxygen to move through the body on its own',
                  options: ['Cells are too far from the lungs for oxygen to move through the body on its own', 'oxygen travels like a gas through the whole body independently', 'breathing *is* the same as oxygen reaching the cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.' }
          ],
            remediations: { 'breathing-is-the-same-as': { steps: ['Ask the student: "If you want to send a letter to a friend in another city, does it fly there by itself or does it go.'] } } },
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
        { type: 'subpart', nodeId: 'c6_biology_ch09_004', difficulty: 'standard',
          question: 'Breathing is the mechanical action of moving air into and out of the lungs to.',
          hint: 'Review the skeletal system and muscle movement in the body.',
          misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
          parts: [
                { id: 'a', prompt: 'When you inhale, the diaphragm moves downward. What do you think happens to the diaphragm when you exhale?', answer: 'It moves upward, pushing against the lungs to help squeeze the air out',
                  options: ['It moves upward, pushing against the lungs to help squeeze the air out', 'stays the same', 'moves down again'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' },
                { id: 'b', prompt: 'Compare the chest movement of a person who is resting versus someone who has just finished a race. Why does the difference occur?', answer: 'The chest moves faster and deeper after a race',
                  options: ['The chest moves faster and deeper after a race', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' }
          ],
            remediations: { 'the-lungs-themselves-pull-the': { steps: ['If a student thinks the lungs pull air, ask them to hold a deflated balloon and try to make it expand without blowing.', 'Explain that the lungs are like those balloons—they need the diaphragm to "pull" on the chest cavity space to create a.', 'Use a syringe analogy: pulling the plunger (diaphragm) creates space for liquid/air to enter, just as the diaphragm.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
          parts: [
                { id: 'a', prompt: 'Compare the chest movement of a person who is resting versus someone who has just finished a race. Why does the difference occur?', answer: 'The chest moves faster and deeper after a race',
                  options: ['The chest moves faster and deeper after a race', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' }
          ],
            remediations: { 'the-lungs-themselves-pull-the': { steps: ['If a student thinks the lungs pull air, ask them to hold a deflated balloon and try to make it expand without blowing.', 'Explain that the lungs are like those balloons—they need the diaphragm to "pull" on the chest cavity space to create a.', 'Use a syringe analogy: pulling the plunger (diaphragm) creates space for liquid/air to enter, just as the diaphragm.'] } } },
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
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'standard',
          question: 'A balanced diet is a daily food pattern that provides the body with the right.',
          hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A balanced diet is a daily food pattern that provides the body with the right proportions',
                  options: ['A balanced diet is a daily food pattern that provides the body with the right proportions', 'The circulatory system acts as the body\'s transport highway, using the heart as a pump to', 'The digestive system is a biological network of organs, including a long muscular tube', 'Digestion is the biological process of breaking down large, complex food molecules into'],
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
