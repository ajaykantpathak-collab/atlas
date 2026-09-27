import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch10_p1: SimDef = {
    id: 'v3_c6_biology_ch10_p1',
    title: 'Life Processes -- Plant Growth and Transport · Part 1/2',
    subtitle: 'What does a sleeping seed need before it dares to grow?',
    classLevel: 6, subject: 'biology', topic: 'Life Processes -- Plant Growth and Transport · Part 1/2',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a gardener with two bean seeds and one wet paper towel', intro: 'Two identical seeds, two bowls — one dry, one damp. In three days only one has sprouted. What secret did the water whisper?', goal: 'Discover what germination really needs, and bust the myth that baby plants eat soil.' },
    discovery: {
        question: 'A dry chickpea sits unchanged in a cupboard for months. The same chickpea wrapped in a wet cloth sprouts in three days. The cupboard had air and warmth too — so what did the wet cloth unlock?',
        options: ['Water woke the seed — it swells, cracks its coat, and spends its stored food to grow', 'The cloth gave the seed special food the cupboard lacked', 'The cupboard was too dark — seeds need light before they can sprout', 'The wet cloth was warmer, and heat alone made it sprout'],
        answer: 'Water woke the seed — it swells, cracks its coat, and spends its stored food to grow',
        hook: 'Seeds don\'t \'eat\' the soil. A sprouting seed runs on a packed lunch — food stored in its cotyledons — until its own leaves open for business.',
    },
    teaching: [
        { title: 'How Do Plants Grow? From Seed to Tree', text: 'Plant growth is the biological process where a seed absorbs water, splits its coat, and develops into a mature plant by pushing roots downward and a shoot upward to reach light.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch10_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Wake a sleeping seed yourself — give it exactly what it needs, then watch the root dive down and the shoot climb up toward light.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch10_001', title: 'How Do Plants Grow? From Seed to Tree',
          caseStudy: { intro: 'Have you ever wondered how a tiny, dry chickpea in your kitchen cupboard can turn into a leafy green plant if left in a wet cloth?',
            decisions: [{ prompt: 'What are the three main things a seed needs to begin the process of growing into a plant?', options: [
                { text: 'A seed needs moisture, warmth, and air', outcome: 'A seed needs moisture, warmth, and air. Answering only "water" reveals the student ignores the.' },
                { text: 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy', outcome: 'Not quite — Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s.', reveals: 'plants-eat-the-soil-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_002', title: 'How Do Plants Make Food? Understanding Photosynthesis',
          caseStudy: { intro: 'Have you ever wondered why you need to eat lunch to have energy to play, but the tree in your garden just stands there without ever eating a meal?',
            decisions: [{ prompt: 'What are the three main things a plant needs to carry out the process of photosynthesis?', options: [
                { text: 'A plant needs sunlight, water, and carbon dioxide', outcome: 'A plant needs sunlight, water, and carbon dioxide. A wrong answer (like "soil" or "fertilizer").' },
                { text: 'fertilizer', outcome: 'Not quite — Students often think that plants get their "food" from the soil, treating roots like mouths that.', reveals: 'plants-get-their-food-from' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_003', title: 'Transport in Plants: How Water and Nutrients Travel',
          caseStudy: { intro: 'Have you ever wondered how a tall tree gets water to its highest leaves, even though it doesn\'t have a pump like a house?',
            decisions: [{ prompt: 'What is the main function of the specialized conducting tissues found in a plant\'s stem?', options: [
                { text: 'These tissues act as a pipeline system to transport water and minerals upward and food', outcome: 'These tissues act as a pipeline system to transport water and minerals upward and food (sugars).' },
                { text: 'plants "drink" water through their leaves like a sponge', outcome: 'Not quite — Students often believe that plants "drink" water through their leaves like a sponge.', reveals: 'plants-drink-water-through-their' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_005', title: 'Plant Reproduction: From Flowers to Seeds',
          caseStudy: { intro: 'Have you ever wondered why a bright, colourful flower eventually disappears and a small fruit or seed pod appears in its place?',
            decisions: [{ prompt: 'What is the name of the fine, dust-like substance produced by the male part of a flower?', options: [
                { text: 'It is called pollen', outcome: 'It is called pollen. If a student answers "seed" or "nectar," they are confusing the reproductive.' },
                { text: 'nectar', outcome: 'Not quite — Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid.', reveals: 'the-dust-pollen-is-dirt' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_006', title: 'Seed Germination: What Triggers Growth',
          caseStudy: { intro: 'Have you ever wondered why a dry bean from your kitchen cupboard doesn\'t grow into a plant, even though it looks perfectly fine?',
            decisions: [{ prompt: 'What are the three essential environmental conditions required for a seed to begin the process of germination?', options: [
                { text: 'The three conditions are water, oxygen, and a suitable temperature', outcome: 'The three conditions are water, oxygen, and a suitable temperature.' },
                { text: 'fertilizer', outcome: 'Not quite — Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of.', reveals: 'seeds-need-soil-to-germinate' },
                { text: 'nursery', outcome: 'Not quite — Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of.', reveals: 'seeds-need-soil-to-germinate' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch10_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes -- Plant Growth and Transport · Part 1/2', spots: [
            { id: 's1', label: 'How Do Plants Grow From Seed to Tree', prompt: 'Which idea is this? — Plant growth is the biological process where a seed absorbs water, splits its coat, and.', answer: 'How Do Plants Grow From Seed to Tree', options: ['How Do Plants Grow From Seed to Tree', 'How Do Plants Make Food Understanding Photosynthesis', 'Transport in Plants How Water and Nutrients Travel', 'Do Plants Respire Gas Exchange in Plants'] },
            { id: 's2', label: 'How Do Plants Make Food Understanding Photosynthesis', prompt: 'Which idea is this? — Photosynthesis is the process by which green plants use sunlight, water, and carbon.', answer: 'How Do Plants Make Food Understanding Photosynthesis', options: ['How Do Plants Make Food Understanding Photosynthesis', 'How Do Plants Grow From Seed to Tree', 'Transport in Plants How Water and Nutrients Travel', 'Do Plants Respire Gas Exchange in Plants'] },
            { id: 's3', label: 'Transport in Plants How Water and Nutrients Travel', prompt: 'Which idea is this? — Transport in plants is the process by which water and minerals are moved from roots.', answer: 'Transport in Plants How Water and Nutrients Travel', options: ['Transport in Plants How Water and Nutrients Travel', 'How Do Plants Grow From Seed to Tree', 'How Do Plants Make Food Understanding Photosynthesis', 'Do Plants Respire Gas Exchange in Plants'] },
            { id: 's4', label: 'Do Plants Respire Gas Exchange in Plants', prompt: 'Which idea is this? — Plant respiration is the process by which all living plant cells take in oxygen and.', answer: 'Do Plants Respire Gas Exchange in Plants', options: ['Do Plants Respire Gas Exchange in Plants', 'How Do Plants Grow From Seed to Tree', 'How Do Plants Make Food Understanding Photosynthesis', 'Transport in Plants How Water and Nutrients Travel'] },
            { id: 's5', label: 'Plant Reproduction From Flowers to Seeds', prompt: 'Which idea is this? — Plant sexual reproduction is the process in flowering plants where male and female parts.', answer: 'Plant Reproduction From Flowers to Seeds', options: ['Plant Reproduction From Flowers to Seeds', 'How Do Plants Grow From Seed to Tree', 'How Do Plants Make Food Understanding Photosynthesis', 'Transport in Plants How Water and Nutrients Travel'] },
            { id: 's6', label: 'Seed Germination What Triggers Growth', prompt: 'Which idea is this? — Seed germination is the process by which a dormant seed absorbs water, softens its outer.', answer: 'Seed Germination What Triggers Growth', options: ['Seed Germination What Triggers Growth', 'How Do Plants Grow From Seed to Tree', 'How Do Plants Make Food Understanding Photosynthesis', 'Transport in Plants How Water and Nutrients Travel'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A child sprouts a bean seed on a wet paper towel on the windowsill — no soil at all — and shows it proudly. Her grandmother objects: \'Impossible. Plants need soil; that sprout must be fake.\'',
            decisions: [{ prompt: 'What does the sprouting seed really prove?', options: [
                { text: 'That germination needs water, air and warmth — not soil. The seed drank the moisture, swelled, and the embryo inside woke up and began growing on the food stored inside the seed itself. Soil matters later for minerals and support, but the first sprout runs entirely on the seed\'s own provisions.', outcome: 'The paper-towel sprout is real biology: a seed is a baby plant packed with its own lunchbox, and water is the trigger that starts it growing.' },
                { text: 'Grandmother is right — without soil\'s nutrients no seed can germinate, so the sprout must have been faked.', outcome: 'Seeds carry stored food precisely so they can sprout before roots reach soil — moisture alone is enough to start germination.', reveals: 'seeds-need-soil' },
                { text: 'It sprouted only because of sunlight — the paper towel\'s dampness had nothing to do with it.', outcome: 'Seeds can germinate in a dark cupboard if kept moist — water is the trigger; light becomes important once the shoot needs to make its own food.', reveals: 'germination-needs-sunlight' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_006', title: 'The bigger picture',
          caseStudy: { intro: 'A seed is a packed suitcase: food inside, instructions inside, waiting only for water to say \'go\'. Soil comes later — the first meal is homemade.',
            decisions: [{ prompt: 'What comes next? Life Processes -- Plant Growth and Transport · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Life Processes -- Plant Growth and Transport · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch10_001', difficulty: 'standard',
          question: 'Plant growth is the biological process where a seed absorbs water, splits its.',
          hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
          misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a seed needs to begin the process of growing into a plant?', answer: 'A seed needs moisture, warmth, and air',
                  options: ['A seed needs moisture, warmth, and air', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' },
                { id: 'b', prompt: 'If you plant a seed upside down, in which direction will the root grow? Why?', answer: 'The root will still grow downward',
                  options: ['The root will still grow downward', 'the root just follows the seed\'s orientation', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' }
          ],
            remediations: { 'plants-eat-the-soil-or': { steps: ['Ask the student: "If the seed is in the soil, how does it get food before it has leaves?" Guide them to dissect.', 'Explain that the soil only provides support and water, not the energy for the very first sprout.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.',
          parts: [
                { id: 'a', prompt: 'Is a seed "alive" while it is sitting in a bag of grains? Justify your answer.', answer: 'Yes, it is "dormant" or alive but inactive',
                  options: ['Yes, it is "dormant" or alive but inactive', 'growth is the only sign of life', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' },
                { id: 'b', prompt: 'Design an experiment to prove that a seed needs water to grow. What would you do?', answer: 'Place two sets of seeds in identical containers with soil and warmth',
                  options: ['Place two sets of seeds in identical containers with soil and warmth', 'plants "eat" the soil or that the soil is the source of the seed\'s growth energy'],
                  hint: 'Review the anatomy of a seed to understand why it has a "storage" section.',
                  misconception: 'Students often believe that plants "eat" the soil or that the soil is the source of the seed\'s growth energy.' }
          ],
            remediations: { 'plants-eat-the-soil-or': { steps: ['Ask the student: "If the seed is in the soil, how does it get food before it has leaves?" Guide them to dissect.', 'Explain that the soil only provides support and water, not the energy for the very first sprout.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_002', difficulty: 'standard',
          question: 'Photosynthesis is the process by which green plants use sunlight, water, and.',
          hint: 'Review the function of roots vs. leaves in plant anatomy.',
          misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a plant needs to carry out the process of photosynthesis?', answer: 'A plant needs sunlight, water, and carbon dioxide',
                  options: ['A plant needs sunlight, water, and carbon dioxide', 'fertilizer'],
                  hint: 'Review the function of roots vs. leaves in plant anatomy.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating.' },
                { id: 'b', prompt: 'If a plant is kept in a completely dark room for a long time, why does it struggle to survive?', answer: 'The plant cannot perform photosynthesis',
                  options: ['The plant cannot perform photosynthesis', 'thirsty', 'needs space'],
                  hint: 'Review the function of roots vs. leaves in plant anatomy.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating.' }
          ],
            remediations: { 'plants-get-their-food-from': { steps: ['First, ask the student what happens if they keep a slice of bread in the soil—does it grow?', 'Then, explain that roots are like straws for water, but the leaf is the "kitchen." Ask them to trace the path.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_003', difficulty: 'standard',
          question: 'Transport in plants is the process by which water and minerals are moved from.',
          hint: 'Review the function of roots and leaves in the plant\'s life cycle.',
          misconception: 'Students often believe that plants "drink" water through their leaves like a sponge.',
          parts: [
                { id: 'a', prompt: 'If a plant\'s leaves produce sugar, why does the plant need to transport that sugar to the roots?', answer: 'The roots cannot make their own food',
                  options: ['The roots cannot make their own food', 'plants "drink" water through their leaves like a sponge'],
                  hint: 'Review the function of roots and leaves in the plant\'s life cycle.',
                  misconception: 'Students often believe that plants "drink" water through their leaves like a sponge.' },
                { id: 'b', prompt: 'Imagine a plant where the "upward" conducting tubes are blocked. What will happen to the leaves?', answer: 'The leaves will wilt or stop growing',
                  options: ['The leaves will wilt or stop growing', 'plants "drink" water through their leaves like a sponge'],
                  hint: 'Review the function of roots and leaves in the plant\'s life cycle.',
                  misconception: 'Students often believe that plants "drink" water through their leaves like a sponge.' }
          ],
            remediations: { 'plants-drink-water-through-their': { steps: ['Ask the student: "If you pour water on a dry leaf, does it reach the roots?" 2.', 'Explain that roots have specialized structures to pull water from the soil.', 'Have them draw a simple plant with arrows showing water going up from the roots and food going from the leaves to the.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_004', difficulty: 'standard',
          question: 'Plant respiration is the process by which all living plant cells take in oxygen.',
          hint: 'Review the concept that all living cells, regardless of being in a plant or animal.',
          misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always.',
          parts: [
                { id: 'a', prompt: 'If a plant is kept in a sealed dark box, will it still release carbon dioxide? Why?', answer: 'Yes, the plant will release carbon dioxide',
                  options: ['Yes, the plant will release carbon dioxide', 'respiration is dependent on light or photosynthesis'],
                  hint: 'Review the concept that all living cells, regardless of being in a plant or animal, require energy.',
                  misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always and uses oxygen).' }
          ],
            remediations: { 'students-often-confuse-photosynthesis-which': { steps: ['Ask the student to list what they do to get energy (eat food and breathe).', 'Explain that plants also "eat" (make food) but must "breathe" (respire) to turn that food into usable energy.', 'Draw a diagram showing a single cell in a root and a single cell in a leaf, labeling the intake of Oxygen and release.', 'Emphasize that "Living = Respiration" for every organism on Earth.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_005', difficulty: 'standard',
          question: 'Plant sexual reproduction is the process in flowering plants where male and.',
          hint: 'Review the "Diversity in Plants" section regarding identifying flower features.',
          misconception: 'Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid of, rather than.',
          parts: [
                { id: 'a', prompt: 'What is the name of the fine, dust-like substance produced by the male part of a flower?', answer: 'It is called pollen',
                  options: ['It is called pollen', 'nectar'],
                  hint: 'Review the "Diversity in Plants" section regarding identifying flower features.',
                  misconception: 'Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid of, rather than a vital component for.' }
          ],
            remediations: { 'the-dust-pollen-is-dirt': { steps: ['Take the student to observe a flower and point out the pollen again.', 'Explain that just as a baby animal needs a parent to grow, a seed needs the pollen to "start" its growth process.', 'Ask them to imagine the pollen as a "message" that must be delivered to the female part of the flower to trigger seed.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_006', difficulty: 'standard',
          question: 'Seed germination is the process by which a dormant seed absorbs water, softens.',
          hint: 'Review the structure of a dicot seed (cotyledons) to understand where the "stored food".',
          misconception: 'Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of a plant (which needs soil.',
          parts: [
                { id: 'a', prompt: 'What are the three essential environmental conditions required for a seed to begin the process of germination?', answer: 'The three conditions are water, oxygen, and a suitable temperature',
                  options: ['The three conditions are water, oxygen, and a suitable temperature', 'fertilizer', 'nursery', 'germination'],
                  hint: 'Review the structure of a dicot seed (cotyledons) to understand where the "stored food" comes from.',
                  misconception: 'Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of a plant (which needs soil for nutrients) with.' },
                { id: 'b', prompt: 'If you place a dry seed in a sealed, air-tight container with plenty of water and keep it at room temperature, it does not germinate. Why?', answer: 'It lacks oxygen',
                  options: ['It lacks oxygen', 'nursery', 'germination', 'seeds need soil to germinate'],
                  hint: 'Review the structure of a dicot seed (cotyledons) to understand where the "stored food" comes from.',
                  misconception: 'Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of a plant (which needs soil for nutrients) with.' },
                { id: 'c', prompt: 'A student places a seed in a freezer and provides water and air. Will it germinate? Why or why not?', answer: 'No, it will not germinate',
                  options: ['No, it will not germinate', 'nursery', 'germination', 'seeds need soil to germinate'],
                  hint: 'Review the structure of a dicot seed (cotyledons) to understand where the "stored food" comes from.',
                  misconception: 'Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of a plant (which needs soil for nutrients) with.' },
                { id: 'd', prompt: 'Compare a dormant seed to a germinating seed. What is the most visible physical change the seed undergoes when it absorbs water?', answer: 'The seed swells up and its hard outer coat softens',
                  options: ['The seed swells up and its hard outer coat softens', 'nursery', 'germination', 'seeds need soil to germinate'],
                  hint: 'Review the structure of a dicot seed (cotyledons) to understand where the "stored food" comes from.',
                  misconception: 'Students often believe that seeds need soil to germinate. They confuse the "nursery" stage of a plant (which needs soil for nutrients) with.' }
          ],
            remediations: { 'seeds-need-soil-to-germinate': { steps: ['First, ask the student to look at a chickpea seed and find the cotyledons.', 'Explain that these are the "packed lunch" the plant carries with it.', 'Tell them to try sprouting a seed on a damp cotton ball to see that no soil is needed to get the initial sprout.', 'Finally, emphasize that soil is for *later* growth, not the initial trigger.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
