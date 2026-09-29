import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch03_p2: SimDef = {
    id: 'v3_c7_bio_ch03_p2',
    title: 'Life Processes in Plants · Part 2/2',
    subtitle: 'Covers the structure, function, and mechanism of stomata in land plants for gas exchange.',
    classLevel: 7, subject: 'biology', topic: 'Life Processes in Plants · Part 2/2',
    chapters: ['c7_bio_ch03'],
    nodeIds: ['c7_bio_ch03_007', 'c7_bio_ch03_008', 'c7_bio_ch03_009', 'c7_bio_ch03_010', 'c7_bio_ch03_011', 'c7_bio_ch03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you take a deep breath after running across the school playground, your lungs expand to take in oxygen.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A money plant thrives on a sunny balcony, but its twin in a dark cupboard turns pale and stops growing — even with plenty of water and the richest soil. What did the cupboard steal?',
        options: ['Sunlight — without it the plant cannot make its own food, no matter how much water and soil it has', 'Nothing — the plant was just sleeping', 'Fresh air only — plants suffocate in cupboards', 'Fertilizer — dark rooms drain nutrients'],
        answer: 'Sunlight — without it the plant cannot make its own food, no matter how much water and soil it has',
        hook: 'Plants do not eat soil. Weigh a pot before planting and months later — the soil barely shrinks. Soil lends minerals and an anchor; sunlight powers the kitchen where the plant actually cooks its food.',
    },
    teaching: [
        { title: 'Gas Exchange in Plants: Stomata and Their Function', text: 'Gas exchange in plants occurs primarily through microscopic pores called stomata (singular: stoma) found mostly on the epidermis of leaves, allowing carbon dioxide to enter for photosynthesis and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch03_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Set up a fair test with two identical seedlings — one in light, one in darkness, same water and soil — and read the pale leaves to prove which factor is missing.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch03_007', title: 'Gas Exchange in Plants: Stomata and Their Function',
          caseStudy: { intro: 'When you take a deep breath after running across the school playground, your lungs expand to take in oxygen and release carbon dioxide, but have you ever.',
            decisions: [{ prompt: 'What are the specialized cells that surround and control the opening of a stoma in a plant leaf?', options: [
                { text: 'A', outcome: 'The correct answer is A. Guard cells are specialized kidney-shaped cells that change shape to open.' },
                { text: 'breathe in carbon dioxide and breathe out oxygen', outcome: 'Not quite — Students often believe that plants "breathe in carbon dioxide and breathe out oxygen" during the.', reveals: 'plants-breathe-in-carbon-dioxide' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_008', title: 'Transport in Plants: Xylem and Water Movement',
          caseStudy: { intro: 'When you water a potted hibiscus plant in your school courtyard, the dry soil becomes moist, and within a few hours, the drooping leaves stand crisp and.',
            decisions: [{ prompt: 'What is the primary substance transported upward through the xylem tissue in plants?', options: [
                { text: 'Water and dissolved minerals from the soil', outcome: 'Water and dissolved minerals from the soil. A wrong answer like "prepared food" or "glucose".' },
                { text: 'prepared food', outcome: 'Not quite — Students often think that water is "pumped" upward by the roots like a mechanical water pump.', reveals: 'water-is-pumped-upward-by' },
                { text: 'glucose', outcome: 'Not quite — Students often think that water is "pumped" upward by the roots like a mechanical water pump.', reveals: 'water-is-pumped-upward-by' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_009', title: 'Transport in Plants: Phloem and Food Transport',
          caseStudy: { intro: 'When you bite into a sweet mango or a juicy carrot, you are tasting the sugars that were manufactured in the plant\'s leaves and transported to the fruit.',
            decisions: [{ prompt: 'What is the primary substance transported by the phloem tissue in plants?', options: [
                { text: 'The primary substance transported by phloem is dissolved sugar (glucose/food) produced', outcome: 'The primary substance transported by phloem is dissolved sugar (glucose/food) produced during.' },
                { text: 'water and minerals', outcome: 'Not quite — Students often believe that plant food (glucose) travels only downwards from the leaves to the.', reveals: 'plant-food-glucose-travels-only' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_010', title: 'Do Plants Respire: Cellular Respiration in Plants',
          caseStudy: { intro: 'When you walk past a potted Hibiscus plant in your courtyard during the hot afternoon, you might notice it leaves looking fresh, but did you know that deep.',
            decisions: [{ prompt: 'What is the primary purpose of cellular respiration in plant cells?', options: [
                { text: 'to release stored chemical energy (ATP) from food molecules so the plant can carry out', outcome: 'The correct answer is to release stored chemical energy (ATP) from food molecules so the plant can.' },
                { text: 'to make food', outcome: 'Not quite — Students frequently believe that plants only perform photosynthesis and do not respire, or that.', reveals: 'students-frequently-believe-that-plants' },
                { text: 'to take in oxygen', outcome: 'Not quite — Students frequently believe that plants only perform photosynthesis and do not respire, or that.', reveals: 'students-frequently-believe-that-plants' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_011', title: 'Factors Affecting Plant Growth: Experiment Design',
          caseStudy: { intro: 'Every time you water a potted money plant on your balcony in Delhi, you might wonder if giving it *more* water or placing it in direct sunlight makes it grow.',
            decisions: [{ prompt: 'What is the term for the single factor that a researcher deliberately changes or manipulates in a plant growth experiment?', options: [
                { text: 'the independent variable', outcome: 'The correct answer is the independent variable. A student who answers "dependent variable".' },
                { text: 'dependent variable', outcome: 'Not quite — Students often believe that changing multiple conditions at once in an experiment (like giving more.', reveals: 'changing-multiple-conditions-at-once' },
                { text: 'controlled variable', outcome: 'Not quite — Students often believe that changing multiple conditions at once in an experiment (like giving more.', reveals: 'changing-multiple-conditions-at-once' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch03_008', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes in Plants · Part 2/2', spots: [
            { id: 's1', label: 'Gas Exchange in Plants Stomata and Their Function', prompt: 'Which idea is this? — Gas exchange in plants occurs primarily through microscopic pores called stomata.', answer: 'Gas Exchange in Plants Stomata and Their Function', options: ['Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Xylem and Water Movement', 'Transport in Plants Phloem and Food Transport', 'Do Plants Respire Cellular Respiration in Plants'] },
            { id: 's2', label: 'Transport in Plants Xylem and Water Movement', prompt: 'Which idea is this? — Xylem is a specialized, tube-like vascular tissue in plants that transports water and.', answer: 'Transport in Plants Xylem and Water Movement', options: ['Transport in Plants Xylem and Water Movement', 'Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Phloem and Food Transport', 'Do Plants Respire Cellular Respiration in Plants'] },
            { id: 's3', label: 'Transport in Plants Phloem and Food Transport', prompt: 'Which idea is this? — Phloem is a specialized plant vascular tissue responsible for transporting dissolved.', answer: 'Transport in Plants Phloem and Food Transport', options: ['Transport in Plants Phloem and Food Transport', 'Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Xylem and Water Movement', 'Do Plants Respire Cellular Respiration in Plants'] },
            { id: 's4', label: 'Do Plants Respire Cellular Respiration in Plants', prompt: 'Which idea is this? — Cellular respiration in plants is the biochemical process by which plant cells break down.', answer: 'Do Plants Respire Cellular Respiration in Plants', options: ['Do Plants Respire Cellular Respiration in Plants', 'Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Xylem and Water Movement', 'Transport in Plants Phloem and Food Transport'] },
            { id: 's5', label: 'Factors Affecting Plant Growth Experiment Design', prompt: 'Which idea is this? — The systematic process of setting up scientific tests to determine how specific.', answer: 'Factors Affecting Plant Growth Experiment Design', options: ['Factors Affecting Plant Growth Experiment Design', 'Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Xylem and Water Movement', 'Transport in Plants Phloem and Food Transport'] },
            { id: 's6', label: 'Differences Between Photosynthesis and Respiration', prompt: 'Which idea is this? — Photosynthesis and respiration are two fundamental, complementary biochemical processes.', answer: 'Differences Between Photosynthesis and Respiration', options: ['Differences Between Photosynthesis and Respiration', 'Gas Exchange in Plants Stomata and Their Function', 'Transport in Plants Xylem and Water Movement', 'Transport in Plants Phloem and Food Transport'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A gardener moves a row of potted plants behind a tall wall for decoration. Weeks later, watered and fertilised exactly like the others, the shaded plants are pale and stunted. \'More fertiliser will fix it,\' the gardener decides.',
            decisions: [{ prompt: 'Will extra fertiliser rescue the shaded plants?', options: [
                { text: 'No — the missing input is light, not nutrients. Photosynthesis makes the plant\'s food using light energy, so shaded plants starve even in rich, well-watered soil; paleness shows they cannot build enough chlorophyll and sugar. Moving them into the light fixes what fertiliser cannot — a nutrient cannot substitute for the energy source.', outcome: 'This is the farmer\'s shaded-wheat problem: same water, same feed, weaker plants — because the wall stole the sunlight that powers food-making.' },
                { text: 'Yes — fertiliser is plant food, so extra food compensates for the missing sunlight.', outcome: 'Fertiliser supplies minerals, not energy — the plant still needs light to convert carbon dioxide and water into its actual food.', reveals: 'fertilizer-replaces-light' },
                { text: 'The plants are stunted because the wall blocks their water, so deeper watering is the fix.', outcome: 'The scenario says watering was identical — the wall blocks light, and that is the input photosynthesis cannot do without.', reveals: 'walls-block-water' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_012', title: 'You made it',
          caseStudy: { intro: 'Sunlight is the stove, water the delivery truck, soil the pantry shelf. Remove the stove and the finest pantry still serves nothing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch03_007', difficulty: 'standard',
          question: 'Gas exchange in plants occurs primarily through microscopic pores called.',
          hint: 'Review c7_bio_ch03_003 to examine leaf structure and how cells are arranged inside a leaf.',
          misconception: 'Students often believe that plants "breathe in carbon dioxide and breathe out oxygen" during the day, and do the.',
          parts: [
                { id: 'a', prompt: 'What are the specialized cells that surround and control the opening of a stoma in a plant leaf? A) Guard cells B) Xylem vessels C) Root hairs D) Phloem cells', answer: 'Guard cells',
                  options: ['Guard cells', 'breathe in carbon dioxide and breathe out oxygen'],
                  hint: 'Review c7_bio_ch03_003 to examine leaf structure and how cells are arranged inside a leaf.',
                  misconception: 'Students often believe that plants "breathe in carbon dioxide and breathe out oxygen" during the day, and do the reverse at night, viewing.' },
                { id: 'b', prompt: 'During a hot sunny afternoon in a garden in Rajasthan, why is it advantageous for a plant\'s stomata to remain partially or fully closed?', answer: 'To prevent excessive loss of water vapor through transpiration',
                  options: ['To prevent excessive loss of water vapor through transpiration', 'breathe in carbon dioxide and breathe out oxygen'],
                  hint: 'Review c7_bio_ch03_003 to examine leaf structure and how cells are arranged inside a leaf.',
                  misconception: 'Students often believe that plants "breathe in carbon dioxide and breathe out oxygen" during the day, and do the reverse at night, viewing.' },
                { id: 'c', prompt: 'A student applies a thin layer of transparent nail polish to the lower surface of a potted balsam leaf, blocking all the stomata on that side.', answer: 'Identify that stomata are the main entry points for carbon dioxide into the leaf',
                  options: ['Identify that stomata are the main entry points for carbon dioxide into the leaf', 'breathe in carbon dioxide and breathe out oxygen'],
                  hint: 'Review c7_bio_ch03_003 to examine leaf structure and how cells are arranged inside a leaf.',
                  misconception: 'Students often believe that plants "breathe in carbon dioxide and breathe out oxygen" during the day, and do the reverse at night, viewing.' }
          ],
            remediations: { 'plants-breathe-in-carbon-dioxide': { steps: ['1) Review the dual role of plant leaves: making food via photosynthesis and breaking down food via cellular respiration.', '2) Draw two parallel columns on a paper: Day (Sunlight present: Photosynthesis > Respiration) and Night (Darkness: Only.', '3) Trace the movement of oxygen and carbon dioxide through the stomata for each condition separately to show that gas.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_008', difficulty: 'standard',
          question: 'Xylem is a specialized, tube-like vascular tissue in plants that transports.',
          hint: 'Review node c7_bio_ch03_001 to reinforce why plants need water and how roots interact.',
          misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into.',
          parts: [
                { id: 'a', prompt: 'What is the primary substance transported upward through the xylem tissue in plants?', answer: 'Water and dissolved minerals from the soil',
                  options: ['Water and dissolved minerals from the soil', 'prepared food', 'glucose', 'pumped'],
                  hint: 'Review node c7_bio_ch03_001 to reinforce why plants need water and how roots interact with soil.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' },
                { id: 'b', prompt: 'If a potted plant is placed inside a sealed, transparent polythene bag under bright sunlight, tiny water droplets appear on the inner surface of the bag.', answer: 'Water droplets form',
                  options: ['Water droplets form', 'pumped'],
                  hint: 'Review node c7_bio_ch03_001 to reinforce why plants need water and how roots interact with soil.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' }
          ],
            remediations: { 'water-is-pumped-upward-by': { steps: ['To correct this, take a dry straw dipped in water and suck from the top to feel how suction pulls liquid upward from.', 'Then, explain that leaves act like that suction force when water evaporates from their surface, pulling a continuous.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into.',
          parts: [
                { id: 'a', prompt: 'A student claims that if all the leaves are removed from a balsam plant, water will travel up the stem much faster because there is less resistance.', answer: 'The claim is false',
                  options: ['The claim is false', 'pumped'],
                  hint: 'Review node c7_bio_ch03_001 to reinforce why plants need water and how roots interact with soil.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' }
          ],
            remediations: { 'water-is-pumped-upward-by': { steps: ['To correct this, take a dry straw dipped in water and suck from the top to feel how suction pulls liquid upward from.', 'Then, explain that leaves act like that suction force when water evaporates from their surface, pulling a continuous.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_009', difficulty: 'standard',
          question: 'Phloem is a specialized plant vascular tissue responsible for transporting.',
          hint: 'Review c7_bio_ch03_003 (Leaves: The Food Factories of Plants) and c7_bio_ch03_008.',
          misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved',
                  options: ['Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'The autotrophic mode of nutrition is a physiological process in', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Review c7_bio_ch03_003 (Leaves: The Food Factories of Plants) and c7_bio_ch03_008 (Transport.',
                  misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water flowing down a drain.' }
          ],
            remediations: { 'plant-food-glucose-travels-only': { steps: ['To fix this, draw a tall neem tree with leaves at the top, flowers in the middle, and roots at the bottom.', 'Ask: "How do the flowers get their food if they are above the leaves?" Guide the student to trace arrows going both.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_010', difficulty: 'standard',
          question: 'Cellular respiration in plants is the biochemical process by which plant cells.',
          hint: 'Review c7_bio_ch03_004 (Photosynthesis) to understand how glucose is made, and.',
          misconception: 'Students frequently believe that plants only perform photosynthesis and do not respire, or that they "breathe in carbon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cellular respiration in plants is the biochemical process by',
                  options: ['Cellular respiration in plants is the biochemical process by', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'The autotrophic mode of nutrition is a physiological process in', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Review c7_bio_ch03_004 (Photosynthesis) to understand how glucose is made, and c7_bio_ch03_007 (Gas.',
                  misconception: 'Students frequently believe that plants only perform photosynthesis and do not respire, or that they "breathe in carbon dioxide and breathe.' }
          ],
            remediations: { 'students-frequently-believe-that-plants': { steps: ['To fix this, guide the student through a two-step remediation: First, remind them that just like a human body needs.', 'Second, have them examine a germinating seed experiment in total darkness: point out that since there is no light for.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_011', difficulty: 'standard',
          question: 'The systematic process of setting up scientific tests to determine how specific.',
          hint: 'Review c7_bio_ch03_001 to solidify which external factors are vital for plant survival.',
          misconception: 'Students often believe that changing multiple conditions at once in an experiment (like giving more water *and* moving.',
          parts: [
                { id: 'a', prompt: 'What is the term for the single factor that a researcher deliberately changes or manipulates in a plant growth experiment?', answer: 'the independent variable',
                  options: ['the independent variable', 'dependent variable', 'controlled variable', 'overall plant health'],
                  hint: 'Review c7_bio_ch03_001 to solidify which external factors are vital for plant survival before.',
                  misconception: 'Students often believe that changing multiple conditions at once in an experiment (like giving more water *and* moving a plant to a sunnier.' },
                { id: 'b', prompt: 'A student wants to test if adding a specific nitrogen-rich fertilizer helps tomato seedlings grow taller.', answer: 'no, it is not a fair test',
                  options: ['no, it is not a fair test', 'overall plant health'],
                  hint: 'Review c7_bio_ch03_001 to solidify which external factors are vital for plant survival before.',
                  misconception: 'Students often believe that changing multiple conditions at once in an experiment (like giving more water *and* moving a plant to a sunnier.' }
          ],
            remediations: { 'changing-multiple-conditions-at-once': { steps: ['Remediate this by breaking down a daily cooking or baking example: ask the student if they change both the amount.', 'Connect this back to biology by emphasizing that living systems respond to many individual factors, so a scientist must.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_012', difficulty: 'standard',
          question: 'Photosynthesis and respiration are two fundamental, complementary biochemical.',
          hint: 'Review c7_bio_ch03_004 for photosynthesis reactants and c7_bio_ch03_010 for cellular.',
          misconception: 'Students frequently believe that "plants breathe in carbon dioxide and breathe out oxygen during the day, and do the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Photosynthesis and respiration are two fundamental, complementary biochemical processes',
                  options: ['Photosynthesis and respiration are two fundamental, complementary biochemical processes', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'The autotrophic mode of nutrition is a physiological process in', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Review c7_bio_ch03_004 for photosynthesis reactants and c7_bio_ch03_010 for cellular respiration.',
                  misconception: 'Students frequently believe that "plants breathe in carbon dioxide and breathe out oxygen during the day, and do the exact opposite.' }
          ],
            remediations: { 'students-frequently-believe-that-plants': { steps: ['To fix this misconception, guide the student through a step-by-step decoupling exercise: First, remind them that every.', 'Second, explain that during daylight, photosynthesis happens so fast that it produces more oxygen than respiration.', 'Third, explain that at night, photosynthesis stops, so only respiration continues, creating a net *inflow* of oxygen.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
