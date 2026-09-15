import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch09_p1: SimDef = {
    id: 'v3_c6_biology_ch09_p1',
    title: 'Life Processes -- Animal Nutrition and Respiration · Part 1/2',
    subtitle: 'Trace a bite of food through the body\'s longest assembly line',
    classLevel: 6, subject: 'biology', topic: 'Life Processes -- Animal Nutrition and Respiration · Part 1/2',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tiny food inspector riding through the digestive system', intro: 'A bite of aloo paratha is about to take the longest journey of its life — through a muscular tube where organs take turns breaking it down.', goal: 'Map every station of the digestive system and see why removing even one helper organ changes everything.' },
    discovery: {
        question: 'Rohan is sure digestion happens in the stomach — \'that\'s why it growls!\' His grandmother insists digestion starts the moment food enters the mouth. Who should win this argument?',
        options: ['Grandmother — chewing and saliva begin digestion in the mouth; the stomach is just one stop', 'Rohan — the stomach does all the digesting; the mouth only cuts food smaller', 'Both are wrong — digestion happens only in the intestines', 'Neither — food turns straight into energy inside the blood'],
        answer: 'Grandmother — chewing and saliva begin digestion in the mouth; the stomach is just one stop',
        hook: 'Digestion is an assembly line, not a single machine. Mouth, stomach, intestine, liver and pancreas each add something before food can become energy.',
    },
    teaching: [
        { title: 'Nutrition in Animals: The Digestive System', text: 'The digestive system is a biological network of organs, including a long muscular tube (the alimentary canal) and accessory organs like the liver and pancreas, which work together to break down.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch09_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Escort a bite of roti from the first chew through the whole food-factory — past the acid bath of the stomach and the \'chemists\' liver and pancreas — until it\'s absorbed.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch09_001', title: 'Nutrition in Animals: The Digestive System',
          caseStudy: { intro: 'Imagine you just ate your favourite snack—how does that bite of bread actually become the energy you use to run or study?',
            decisions: [{ prompt: 'What is the primary function of the digestive system?', options: [
                { text: 'The primary function is to break down large, complex food into simpler substances that', outcome: 'The primary function is to break down large, complex food into simpler substances that the body can.' },
                { text: 'chewing', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' },
                { text: 'eating', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_002', title: 'Types of Nutrition: Herbivores, Carnivores, Omnivores',
          caseStudy: { intro: 'Have you ever wondered why a cow spends all day chewing grass while a tiger only hunts for meat?',
            decisions: [{ prompt: 'What is the primary food source for an animal classified as a herbivore?', options: [
                { text: 'Herbivores eat only plant material', outcome: 'Herbivores eat only plant material. An answer stating they eat both plants and meat reveals.' },
                { text: 'herbivores only eat grass', outcome: 'Not quite — Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They.', reveals: 'herbivores-only-eat-grass-or' },
                { text: 'carnivores only hunt large mammals', outcome: 'Not quite — Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They.', reveals: 'herbivores-only-eat-grass-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_003', title: 'The Digestion Process: From Mouth to Absorption',
          caseStudy: { intro: 'Have you ever wondered how a crunchy apple you eat for a snack becomes the energy that helps you run during games?',
            decisions: [{ prompt: 'What is the name of the tube that carries food from the mouth to the stomach?', options: [
                { text: 'The tube is called the oesophagus', outcome: 'The tube is called the oesophagus. A student who says "windpipe" or "throat" confuses the digestive.' },
                { text: 'windpipe', outcome: 'Not quite — Students often think digestion happens all at once in the stomach.', reveals: 'digestion-happens-all-at-once' },
                { text: 'throat', outcome: 'Not quite — Students often think digestion happens all at once in the stomach.', reveals: 'digestion-happens-all-at-once' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_004', title: 'Respiration in Animals: How Breathing Works',
          caseStudy: { intro: 'Have you ever noticed how your chest moves when you take a deep breath after running?',
            decisions: [{ prompt: 'What is the primary function of the diaphragm during breathing?', options: [
                { text: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into', outcome: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into the lungs.' },
                { text: 'it filters the air', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking.', reveals: 'the-lungs-themselves-pull-the' },
                { text: 'the lungs themselves "pull" the air in, similar to a sponge soaking up water', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking.', reveals: 'the-lungs-themselves-pull-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_005', title: 'Cellular Respiration: How Cells Extract Energy',
          caseStudy: { intro: 'Think about why you feel tired after a long game of tag—it\'s because your "fuel tank" is running low.',
            decisions: [{ prompt: 'What is the primary purpose of cellular respiration in a living cell?', options: [
                { text: 'The purpose is to release energy from food so the cell can perform its activities', outcome: 'The purpose is to release energy from food so the cell can perform its activities.' },
                { text: 'to breathe', outcome: 'Not quite — Students often think "respiration" is the same thing as "breathing." They see the lungs moving and.', reveals: 'respiration-is-the-same-thing' },
                { text: 'respiration', outcome: 'Not quite — Students often think "respiration" is the same thing as "breathing." They see the lungs moving and.', reveals: 'respiration-is-the-same-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_006', title: 'The Food Chain: Energy Flow in Nature',
          caseStudy: { intro: 'Have you ever wondered why you feel energized after eating a lunch of rice and dal?',
            decisions: [{ prompt: 'What do we call the first organism in any food chain that makes its own food using sunlight?', options: [
                { text: 'They are called producers', outcome: 'They are called producers. A wrong answer (like "consumer") reveals the student does not understand.' },
                { text: 'consumer', outcome: 'Not quite — Students often think the food chain is a circular loop or that humans are always the top link.', reveals: 'the-food-chain-is-a' },
                { text: 'the food chain is a circular loop or that humans are always the top link', outcome: 'Not quite — Students often think the food chain is a circular loop or that humans are always the top link.', reveals: 'the-food-chain-is-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch09_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes -- Animal Nutrition and Respiration · Part 1/2', spots: [
            { id: 's1', label: 'Nutrition in Animals The Digestive System', prompt: 'Which idea is this? — The digestive system is a biological network of organs, including a long muscular tube.', answer: 'Nutrition in Animals The Digestive System', options: ['Nutrition in Animals The Digestive System', 'Types of Nutrition Herbivores Carnivores Omnivores', 'The Digestion Process From Mouth to Absorption', 'Respiration in Animals How Breathing Works'] },
            { id: 's2', label: 'Types of Nutrition Herbivores Carnivores Omnivores', prompt: 'Which idea is this? — Animals are classified into three main groups based on their dietary habits: herbivores.', answer: 'Types of Nutrition Herbivores Carnivores Omnivores', options: ['Types of Nutrition Herbivores Carnivores Omnivores', 'Nutrition in Animals The Digestive System', 'The Digestion Process From Mouth to Absorption', 'Respiration in Animals How Breathing Works'] },
            { id: 's3', label: 'The Digestion Process From Mouth to Absorption', prompt: 'Which idea is this? — Digestion is the biological process of breaking down large, complex food molecules into.', answer: 'The Digestion Process From Mouth to Absorption', options: ['The Digestion Process From Mouth to Absorption', 'Nutrition in Animals The Digestive System', 'Types of Nutrition Herbivores Carnivores Omnivores', 'Respiration in Animals How Breathing Works'] },
            { id: 's4', label: 'Respiration in Animals How Breathing Works', prompt: 'Which idea is this? — Breathing is the mechanical action of moving air into and out of the lungs to exchange.', answer: 'Respiration in Animals How Breathing Works', options: ['Respiration in Animals How Breathing Works', 'Nutrition in Animals The Digestive System', 'Types of Nutrition Herbivores Carnivores Omnivores', 'The Digestion Process From Mouth to Absorption'] },
            { id: 's5', label: 'Cellular Respiration How Cells Extract Energy', prompt: 'Which idea is this? — Cellular respiration is the process where cells break down digested food (like simple.', answer: 'Cellular Respiration How Cells Extract Energy', options: ['Cellular Respiration How Cells Extract Energy', 'Nutrition in Animals The Digestive System', 'Types of Nutrition Herbivores Carnivores Omnivores', 'The Digestion Process From Mouth to Absorption'] },
            { id: 's6', label: 'The Food Chain Energy Flow in Nature', prompt: 'Which idea is this? — A food chain is a linear sequence showing how energy flows from one organism to another.', answer: 'The Food Chain Energy Flow in Nature', options: ['The Food Chain Energy Flow in Nature', 'Nutrition in Animals The Digestive System', 'Types of Nutrition Herbivores Carnivores Omnivores', 'The Digestion Process From Mouth to Absorption'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school lunch conversation, a student asks why the digestive system is a long, winding tube that takes food on a whole journey — \'wouldn\'t a short, wide pouch be a simpler design?\'',
            decisions: [{ prompt: 'What does the long tube actually accomplish that a pouch could not?', options: [
                { text: 'Digestion is a staged process, and the length buys both time and surface — food is broken down step by step (mouth, stomach, then the long intestine), and the intestine\'s huge surface area is what lets digested nutrients actually pass into the blood. A short wide pouch would dump food through before it was fully digested or absorbed.', outcome: 'The tube\'s shape is the function: each section does a different job, and the intestine\'s length exists for absorption — a pouch would leave nutrients unharvested.' },
                { text: 'The student has a point — the tube is long mainly to store more food so we can go days between meals.', outcome: 'The gut is a processing line, not a storage tank — its length exists for the stages of digestion and the surface area needed to absorb nutrients.', reveals: 'gut-is-storage' },
                { text: 'The pouch design would work equally well — length is just leftover anatomy with no purpose.', outcome: 'Every part of the tract has a role — churning, acid breakdown, enzyme action and absorption happen in sequence along the length.', reveals: 'gut-length-is-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Your body never asks one organ to do a whole job. Digestion is a relay — and the race starts in your mouth, not your stomach.',
            decisions: [{ prompt: 'What comes next? Life Processes -- Animal Nutrition and Respiration · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Life Processes -- Animal Nutrition and Respiration · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch09_001', difficulty: 'standard',
          question: 'The digestive system is a biological network of organs, including a long.',
          hint: 'Review the "Components of Food" chapter to identify what exactly needs to be broken down.',
          misconception: 'Students often believe that "digestion" only happens in the stomach.',
          parts: [
                { id: 'a', prompt: 'Why does the body need accessory organs like the liver and pancreas if we already have a long muscular tube?', answer: 'The tube holds the food, but the accessory organs provide essential juices that',
                  options: ['The tube holds the food, but the accessory organs provide essential juices that', 'digestion', '"digestion" only happens in the stomach'],
                  hint: 'Review the "Components of Food" chapter to identify what exactly needs to be broken down.',
                  misconception: 'Students often believe that "digestion" only happens in the stomach.' }
          ],
            remediations: { 'digestion-only-happens-in-the': { steps: ['Ask the student: "Does the bread you chew turn into mush in your mouth or your stomach?" 2.', 'Explain that the mouth is the first station of the factory.', 'Show a diagram highlighting that digestion is a journey, not a single destination.', 'Re-emphasize that the stomach is just one room in a large, multi-room building.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "digestion" only happens in the stomach.',
          parts: [
                { id: 'a', prompt: 'Is it more efficient for the body to have one long tube or many separate, disconnected parts for digestion?', answer: 'One connected tube is more efficient',
                  options: ['One connected tube is more efficient', 'digestion', '"digestion" only happens in the stomach'],
                  hint: 'Review the "Components of Food" chapter to identify what exactly needs to be broken down.',
                  misconception: 'Students often believe that "digestion" only happens in the stomach.' }
          ],
            remediations: { 'digestion-only-happens-in-the': { steps: ['Ask the student: "Does the bread you chew turn into mush in your mouth or your stomach?" 2.', 'Explain that the mouth is the first station of the factory.', 'Show a diagram highlighting that digestion is a journey, not a single destination.', 'Re-emphasize that the stomach is just one room in a large, multi-room building.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_002', difficulty: 'standard',
          question: 'Animals are classified into three main groups based on their dietary habits.',
          hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus.',
          misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant.',
          parts: [
                { id: 'a', prompt: 'What is the primary food source for an animal classified as a herbivore?', answer: 'Herbivores eat only plant material',
                  options: ['Herbivores eat only plant material', 'herbivores only eat grass', 'carnivores only hunt large mammals', '"herbivores only eat grass" or "carnivores only hunt large mammals'],
                  hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus animals.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits.' },
                { id: 'b', prompt: 'If an animal eats both fruits and small insects, how would you classify its dietary habit?', answer: 'It is an omnivore',
                  options: ['It is an omnivore', 'herbivores only eat grass', 'carnivores only hunt large mammals', '"herbivores only eat grass" or "carnivores only hunt large mammals'],
                  hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus animals.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits.' },
                { id: 'c', prompt: 'A deer only eats grass, and a lion only eats deer. If we removed all the grass from the forest, what would happen to the deer and the lion?', answer: 'First, the deer would lose its food source and perish',
                  options: ['First, the deer would lose its food source and perish', 'herbivores only eat grass', 'carnivores only hunt large mammals', '"herbivores only eat grass" or "carnivores only hunt large mammals'],
                  hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus animals.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits.' },
                { id: 'd', prompt: 'Compare the diet of a sparrow and a cow; why are they in different categories?', answer: 'A cow is a herbivore',
                  options: ['A cow is a herbivore', 'herbivores only eat grass', 'carnivores only hunt large mammals', '"herbivores only eat grass" or "carnivores only hunt large mammals'],
                  hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus animals.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits.' }
          ],
            remediations: { 'herbivores-only-eat-grass-or': { steps: ['Review your list of foods.', 'Ask yourself: "Is this from a plant (like wheat, rice, or leaves) or from an animal (like meat, egg, or milk)?" If the.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_003', difficulty: 'standard',
          question: 'Digestion is the biological process of breaking down large, complex food.',
          hint: 'Review the "Components of Food" chapter to understand what needs to be broken down.',
          misconception: 'Students often think digestion happens all at once in the stomach.',
          parts: [
                { id: 'a', prompt: 'What is the name of the tube that carries food from the mouth to the stomach?', answer: 'The tube is called the oesophagus',
                  options: ['The tube is called the oesophagus', 'windpipe', 'throat', 'digestion happens all at once in the stomach'],
                  hint: 'Review the "Components of Food" chapter to understand what needs to be broken down.',
                  misconception: 'Students often think digestion happens all at once in the stomach.' }
          ],
            remediations: { 'digestion-happens-all-at-once': { steps: ['First, ask the student to trace the path of a bite of chapati using a diagram.', 'Point out that the mouth is the "first station" where chemical action starts, not just a place to chew.', 'Have them explain what saliva does to starches compared to what the stomach does to mix food with acid, reinforcing.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_004', difficulty: 'standard',
          question: 'Breathing is the mechanical action of moving air into and out of the lungs.',
          hint: 'Review the skeletal system and muscle movement in the body.',
          misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
          parts: [
                { id: 'a', prompt: 'When you inhale, the diaphragm moves downward. What do you think happens to the diaphragm when you exhale?', answer: 'It moves upward, pushing against the lungs to help squeeze the air out',
                  options: ['It moves upward, pushing against the lungs to help squeeze the air out', 'stays the same', 'moves down again', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Review the skeletal system and muscle movement in the body.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' },
                { id: 'b', prompt: 'Compare the chest movement of a person who is resting versus someone who has just finished a race. Why does the difference occur?', answer: 'The chest moves faster and deeper after a race',
                  options: ['The chest moves faster and deeper after a race', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Review the skeletal system and muscle movement in the body.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' }
          ],
            remediations: { 'the-lungs-themselves-pull-the': { steps: ['If a student thinks the lungs pull air, ask them to hold a deflated balloon and try to make it expand without blowing.', 'Explain that the lungs are like those balloons—they need the diaphragm to "pull" on the chest cavity space to create.', 'Use a syringe analogy: pulling the plunger (diaphragm) creates space for liquid/air to enter, just as the diaphragm.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_005', difficulty: 'standard',
          question: 'Cellular respiration is the process where cells break down digested food (like.',
          hint: 'Review the "Components of Food" section regarding carbohydrates and energy.',
          misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the.',
          parts: [
                { id: 'a', prompt: 'Why is cellular respiration considered a "controlled" reaction rather than just "burning"?', answer: '"Burning" would release all energy as heat instantly',
                  options: ['"Burning" would release all energy as heat instantly', 'because it happens in the lungs', 'respiration', 'breathing'],
                  hint: 'Review the "Components of Food" section regarding carbohydrates and energy.',
                  misconception: 'Students often think "respiration" is the same thing as "breathing." They see the lungs moving and think that *is* the energy release.' }
          ],
            remediations: { 'respiration-is-the-same-thing': { steps: ['Explain that breathing is like a delivery truck (transporting oxygen).', 'Ask the student: "If the truck delivers the package, but no one opens it to use the contents, does the work get done?".', 'Clarify that the "package" is oxygen, and the "work" (releasing energy) only happens inside the cell factory.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_006', difficulty: 'standard',
          question: 'A food chain is a linear sequence showing how energy flows from one organism.',
          hint: 'Review the process of how plants make food using sunlight.',
          misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.',
          parts: [
                { id: 'a', prompt: 'What do we call the first organism in any food chain that makes its own food using sunlight?', answer: 'They are called producers',
                  options: ['They are called producers', 'consumer', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Review the process of how plants make food using sunlight.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' },
                { id: 'b', prompt: 'If a deer eats grass and a lion eats the deer, explain why the grass is not a consumer.', answer: 'The grass is a producer',
                  options: ['The grass is a producer', 'anything living that is eaten is a consumer', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Review the process of how plants make food using sunlight.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' },
                { id: 'c', prompt: 'In a chain: Plant -> Rabbit -> Fox, if the number of plants suddenly decreases, what happens to the energy available for the fox?', answer: 'The energy available for the fox decreases',
                  options: ['The energy available for the fox decreases', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Review the process of how plants make food using sunlight.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' },
                { id: 'd', prompt: 'Analyze the role of a carnivore in a food chain. Why can\'t a carnivore be the first link?', answer: 'A carnivore cannot be the first link',
                  options: ['A carnivore cannot be the first link', 'the food chain is a circular loop or that humans are always the top link'],
                  hint: 'Review the process of how plants make food using sunlight.',
                  misconception: 'Students often think the food chain is a circular loop or that humans are always the top link.' }
          ],
            remediations: { 'the-food-chain-is-a': { steps: ['First, ask the student to draw a single line on paper.', 'Tell them the arrow represents the "flow of energy." Instruct them to draw a plant at the start and point an arrow from.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
