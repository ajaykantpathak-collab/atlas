import type { SimDef } from '../../engine/types';
import C6_BiologyPlantAnimalCellSim from '../../../simulations/c6_12/C6_BiologyPlantAnimalCellSim';

/** v3 wrapped master — C6_BiologyPlantAnimalCellSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_biologyplantanimalcellsim: SimDef = {
    id: 'v3w_c6_biologyplantanimalcellsim',
    title: 'Plant Animal Cell',
    subtitle: 'This node covers the fundamental concept that plants perform gas exchange for.',
    classLevel: 6, subject: 'biology', topic: 'Do Plants Respire? Gas Exchange in Plants',
    chapters: [],
    nodeIds: ['c6_biology_ch10_004', 'c6_biology_ch10_007', 'c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_005', 'c6_biology_ch09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered if a tree "breathes" while you are sleeping at night?', goal: 'Master Plant Animal Cell.' },
    discovery: {
        question: 'Why does the body need accessory organs like the liver and pancreas if we already have a long muscular tube?',
        options: ['The tube holds the food, but the accessory organs provide essential juices that', 'digestion', '"digestion" only happens in the stomach'],
        answer: 'The tube holds the food, but the accessory organs provide essential juices that',
        hook: 'Students often believe that "digestion" only happens in the stomach.',
    },
    teaching: [
        { title: 'Plant respiration is the process by which.', text: 'Plant respiration is the process by which all living plant cells take in oxygen and release carbon dioxide to break down food and release energy required for survival.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_biology_ch10_004', title: 'Plant respiration is the process by.',
          scaffold: { problem: 'A gardener waters a potted plant so heavily that the soil remains completely waterlogged for a week.',
            steps: [
            { text: 'Identify the main issue—the air pockets in the soil are replaced by water.' },
            { text: 'Recall that roots need oxygen from soil air pockets to respire.' },
            { text: 'Conclude that without oxygen, root cells cannot release energy from food.' },
            { text: 'Explain that without energy, the root cells die and cannot absorb nutrients.' },
            { text: 'Relate this to the wilting of the plant.', faded: true, blankAnswer: 'The plant wilts because the roots are suffocating from a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch10_007', title: 'Plant response is the process by which.',
          scaffold: { problem: 'A science student, Rohan, places a sprout in a dark box with a small hole on the left side. Where will the shoot grow after 5 days?',
            steps: [
            { text: 'Identify the stimulus (light coming through the hole).' },
            { text: 'Identify the plant part (shoot).' },
            { text: 'Apply the rule that shoots grow toward light.' },
            { text: 'Determine the growth direction (left, toward the hole).', faded: true, blankAnswer: 'The shoot will grow toward the hole on the left.' }
            ] } },
        { type: 'case', nodeId: 'c6_biology_ch09_001', title: 'The digestive system is a biological.',
          caseStudy: { intro: 'Imagine you just ate your favourite snack—how does that bite of bread actually become the energy you use to run or study?',
            decisions: [{ prompt: 'What is the primary function of the digestive system?', options: [
                { text: 'The primary function is to break down large, complex food into simpler substances that', outcome: 'The primary function is to break down large, complex food into simpler substances that the body can.' },
                { text: 'chewing', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' },
                { text: 'eating', outcome: 'Not quite — Students often believe that "digestion" only happens in the stomach.', reveals: 'digestion-only-happens-in-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch09_002', title: 'Animals are classified into three main.',
          scaffold: { problem: 'A bird eats seeds from a sunflower (plant) and also catches small worms (animal) in the soil. Categorize the bird.',
            steps: [
            { text: 'Identify the food sources mentioned (seeds and worms).' },
            { text: 'Determine if seeds are plant-based (Yes) and if worms are animal-based (Yes).' },
            { text: 'Apply the rule: Plant only = Herbivore; Animal only = Carnivore; Both = Omnivore.' },
            { text: 'Since both are present, classify as Omnivore.', faded: true, blankAnswer: 'The bird is an omnivore.' }
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
        { type: 'scaffold', nodeId: 'c6_biology_ch09_008', title: 'The circulatory system acts as the.',
          scaffold: { problem: 'A runner is sprinting. Explain the 4 steps of how oxygen from their last breath reaches their leg muscles to keep them running.',
            steps: [
            { text: 'Oxygen moves from lungs into the bloodstream.' },
            { text: 'The oxygenated blood is collected and sent to the heart.' },
            { text: 'The heart pumps this blood into the arteries.' },
            { text: 'Arteries branch into tiny vessels that reach the muscle cells.', faded: true, blankAnswer: 'The oxygen is transported via the blood, pumped by the.' }
            ] } }
    ],
    explore: { component: C6_BiologyPlantAnimalCellSim, prompt: 'Explore the interactive — Plant Animal Cell' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch10_004', difficulty: 'standard',
          question: 'Plant respiration is the process by which all living plant cells take in oxygen.',
          hint: 'Review the concept that all living cells, regardless of being in a plant or animal,.',
          misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always.',
          parts: [
                { id: 'a', prompt: 'If a plant is kept in a sealed dark box, will it still release carbon dioxide? Why?', answer: 'Yes, the plant will release carbon dioxide',
                  options: ['Yes, the plant will release carbon dioxide', 'respiration is dependent on light or photosynthesis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always and uses oxygen).' }
          ],
            remediations: { 'students-often-confuse-photosynthesis-which': { steps: ['Ask the student to list what they do to get energy (eat food and breathe).', 'Explain that plants also "eat" (make food) but must "breathe" (respire) to turn that food into usable energy.', 'Draw a diagram showing a single cell in a root and a single cell in a leaf, labeling the intake of Oxygen and release.', 'Emphasize that "Living = Respiration" for every organism on Earth.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_007', difficulty: 'standard',
          question: 'Plant response is the process by which a plant adjusts its growth direction or.',
          hint: 'Review the function of roots and stems from Chapter 10.',
          misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.',
          parts: [
                { id: 'a', prompt: 'What is the general direction in which a plant shoot grows compared to the direction of a light source?', answer: 'The shoot grows toward the light source',
                  options: ['The shoot grows toward the light source', 'because they are thirsty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' }
          ],
            remediations: { 'plants-move-because-they-want': { steps: ['Ask the student to identify a non-living object that responds to stimuli (like a thermometer).', 'Explain that plants, like the thermometer, have a built-in "reaction" to change, not a "thought" process.', 'Use the example of a sunflower: it doesn\'t "choose" to turn, it is "pulled" into that shape by its growth process.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.',
          parts: [
                { id: 'a', prompt: 'Does a plant\'s response to light mean it "sees" the light like an animal? Why or why not?', answer: 'No, it does not "see" or "think"',
                  options: ['No, it does not "see" or "think"', 'because they are thirsty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' },
                { id: 'b', prompt: 'Design a simple experiment to prove that a plant responds to gravity. What would you do?', answer: 'Criteria: Place a germinating seed horizontally in a container with moist cotton',
                  options: ['Criteria: Place a germinating seed horizontally in a container with moist cotton', 'because they are thirsty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' }
          ],
            remediations: { 'plants-move-because-they-want': { steps: ['Ask the student to identify a non-living object that responds to stimuli (like a thermometer).', 'Explain that plants, like the thermometer, have a built-in "reaction" to change, not a "thought" process.', 'Use the example of a sunflower: it doesn\'t "choose" to turn, it is "pulled" into that shape by its growth process.'] } } },
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
        { type: 'subpart', nodeId: 'c6_biology_ch09_002', difficulty: 'standard',
          question: 'Animals are classified into three main groups based on their dietary habits:.',
          hint: 'Review the "Components of Food" chapter to identify which foods come from plants versus.',
          misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant.',
          parts: [
                { id: 'a', prompt: 'What is the primary food source for an animal classified as a herbivore?', answer: 'Herbivores eat only plant material',
                  options: ['Herbivores eat only plant material', 'herbivores only eat grass', 'carnivores only hunt large mammals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits,.' },
                { id: 'b', prompt: 'If an animal eats both fruits and small insects, how would you classify its dietary habit?', answer: 'It is an omnivore',
                  options: ['It is an omnivore', 'herbivores only eat grass', 'carnivores only hunt large mammals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits,.' },
                { id: 'c', prompt: 'A deer only eats grass, and a lion only eats deer. If we removed all the grass from the forest, what would happen to the deer and the lion?', answer: 'First, the deer would lose its food source and perish',
                  options: ['First, the deer would lose its food source and perish', 'herbivores only eat grass', 'carnivores only hunt large mammals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "herbivores only eat grass" or "carnivores only hunt large mammals." They forget that plant material includes fruits,.' }
          ],
            remediations: { 'herbivores-only-eat-grass-or': { steps: ['Review your list of foods.', 'Ask yourself: "Is this from a plant (like wheat, rice, or leaves) or from an animal (like meat, egg, or milk)?" If the.'] } } },
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
            remediations: { 'breathing-is-the-same-as': { steps: ['Ask the student: "If you want to send a letter to a friend in another city, does it fly there by itself or does it go.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
