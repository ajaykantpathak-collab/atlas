import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch03_p1: SimDef = {
    id: 'v3_c7_bio_ch03_p1',
    title: 'Life Processes in Plants · Part 1/2',
    subtitle: 'This node covers the fundamental requirements of sunlight, water, and soil for overall.',
    classLevel: 7, subject: 'biology', topic: 'Life Processes in Plants · Part 1/2',
    chapters: ['c7_bio_ch03'],
    nodeIds: ['c7_bio_ch03_001', 'c7_bio_ch03_002', 'c7_bio_ch03_003', 'c7_bio_ch03_004', 'c7_bio_ch03_005', 'c7_bio_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you water a potted money plant kept near your sunny Indian balcony, you notice its leaves look fresh and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A money plant thrives on a sunny balcony, but its twin in a dark cupboard turns pale and stops growing — even with plenty of water and the richest soil. What did the cupboard steal?',
        options: ['Sunlight — without it the plant cannot make its own food, no matter how much water and soil it has', 'Nothing — the plant was just sleeping', 'Fresh air only — plants suffocate in cupboards', 'Fertilizer — dark rooms drain nutrients'],
        answer: 'Sunlight — without it the plant cannot make its own food, no matter how much water and soil it has',
        hook: 'Plants do not eat soil. Weigh a pot before planting and months later — the soil barely shrinks. Soil lends minerals and an anchor; sunlight powers the kitchen where the plant actually cooks its food.',
    },
    teaching: [
        { title: 'How Do Plants Grow: Need for Sunlight, Water, Soil', text: 'The growth of a plant is the permanent increase in size, mass, and complexity of its body, driven by the essential external factors of sunlight, water, and soil nutrients.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch03_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Set up a fair test with two identical seedlings — one in light, one in darkness, same water and soil — and read the pale leaves to prove which factor is missing.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch03_001', title: 'How Do Plants Grow: Need for Sunlight, Water, Soil',
          caseStudy: { intro: 'When you water a potted money plant kept near your sunny Indian balcony, you notice its leaves look fresh and new stems sprout rapidly over a few weeks.',
            decisions: [{ prompt: 'What is the primary role of sunlight in plant growth?', options: [
                { text: 'Sunlight provides the light energy required for the plant to produce its own food through', outcome: 'Sunlight provides the light energy required for the plant to produce its own food through.' },
                { text: 'sunlight keeps the plant warm so it doesn\'t freeze', outcome: 'Not quite — Students often think that soil acts as the "food" for plants, similar to how animals eat food.', reveals: 'soil-acts-as-the-food' },
                { text: 'soil acts as the "food" for plants, similar to how animals eat food', outcome: 'Not quite — Students often think that soil acts as the "food" for plants, similar to how animals eat food.', reveals: 'soil-acts-as-the-food' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_002', title: 'Nutrition in Plants: Autotrophic Mode of Nutrition',
          caseStudy: { intro: 'When you watch a potted money plant sitting on your windowsill in your Mumbai apartment, it doesn\'t need a single bite of your dal and rice to grow taller and.',
            decisions: [{ prompt: 'What is the literal meaning of the term \'autotrophic\', and which group of living organisms primarily uses this mode of nutrition?', options: [
                { text: '\'Auto\' means self, and \'troph\' means nourishment or feeding', outcome: '\'Auto\' means self, and \'troph\' means nourishment or feeding; green plants primarily use this mode.' },
                { text: 'eating other plants', outcome: 'Not quite — Students frequently believe that plants "feed" on soil nutrients in the same way animals eat food.', reveals: 'students-frequently-believe-that-plants' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_003', title: 'Leaves: The Food Factories of Plants',
          caseStudy: { intro: 'When you look at a potted hibiscus plant or a neem tree in your school courtyard during a sunny afternoon, notice how its leaves are broad, flat, and arranged.',
            decisions: [{ prompt: 'What is the primary biological function of a leaf in an autotrophic plant?', options: [
                { text: 'The primary function of a leaf is to act as the site of food production (photosynthesis)', outcome: 'The primary function of a leaf is to act as the site of food production (photosynthesis) for the.' },
                { text: 'breathe', outcome: 'Not quite — Students often think that leaves are merely passive green decorations on a plant, or that they.', reveals: 'leaves-are-merely-passive-green' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_004', title: 'Photosynthesis: Process and Raw Materials',
          caseStudy: { intro: 'When you sit under a shady neem tree on a hot afternoon in an Indian courtyard, you notice how the leaves filter the blazing sunlight and feel cool.',
            decisions: [{ prompt: 'What are the primary raw materials required by a green plant to perform photosynthesis?', options: [
                { text: 'Carbon dioxide and water are the primary raw materials', outcome: 'Carbon dioxide and water are the primary raw materials. A wrong answer—such as stating that plants.' },
                { text: 'breathe out', outcome: 'Not quite — Students often think that plants "breathe in" carbon dioxide and "breathe out" oxygen in a way that.', reveals: 'plants-breathe-in-carbon-dioxide' },
                { text: 'this gas exchange stops at night', outcome: 'Not quite — Students often think that plants "breathe in" carbon dioxide and "breathe out" oxygen in a way that.', reveals: 'plants-breathe-in-carbon-dioxide' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_006', title: 'Role of Air (CO2) in Food Preparation by Plants',
          caseStudy: { intro: 'When you sit under a shady neem tree on a warm afternoon in Delhi, you feel the cool air around you, but you might not realize that the leaves above are.',
            decisions: [{ prompt: 'What is the primary source from which terrestrial plants obtain carbon dioxide for food preparation?', options: [
                { text: 'Terrestrial plants obtain carbon dioxide directly from the atmosphere, where it is', outcome: 'Terrestrial plants obtain carbon dioxide directly from the atmosphere, where it is present as.' },
                { text: 'from the soil', outcome: 'Not quite — Students often think that plants only take in carbon dioxide and never release it, or conversely.', reveals: 'plants-only-take-in-carbon' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch03_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes in Plants · Part 1/2', spots: [
            { id: 's1', label: 'How Do Plants Grow Need for Sunlight Water Soil', prompt: 'Which idea is this? — The growth of a plant is the permanent increase in size, mass, and complexity of its.', answer: 'How Do Plants Grow Need for Sunlight Water Soil', options: ['How Do Plants Grow Need for Sunlight Water Soil', 'Nutrition in Plants Autotrophic Mode of Nutrition', 'Leaves The Food Factories of Plants', 'Photosynthesis Process and Raw Materials'] },
            { id: 's2', label: 'Nutrition in Plants Autotrophic Mode of Nutrition', prompt: 'Which idea is this? — The autotrophic mode of nutrition is a physiological process in which organisms.', answer: 'Nutrition in Plants Autotrophic Mode of Nutrition', options: ['Nutrition in Plants Autotrophic Mode of Nutrition', 'How Do Plants Grow Need for Sunlight Water Soil', 'Leaves The Food Factories of Plants', 'Photosynthesis Process and Raw Materials'] },
            { id: 's3', label: 'Leaves The Food Factories of Plants', prompt: 'Which idea is this? — Leaves act as the primary food-producing organs of a plant, containing specialized green.', answer: 'Leaves The Food Factories of Plants', options: ['Leaves The Food Factories of Plants', 'How Do Plants Grow Need for Sunlight Water Soil', 'Nutrition in Plants Autotrophic Mode of Nutrition', 'Photosynthesis Process and Raw Materials'] },
            { id: 's4', label: 'Photosynthesis Process and Raw Materials', prompt: 'Which idea is this? — Photosynthesis is the biochemical process by which green plants utilize solar energy.', answer: 'Photosynthesis Process and Raw Materials', options: ['Photosynthesis Process and Raw Materials', 'How Do Plants Grow Need for Sunlight Water Soil', 'Nutrition in Plants Autotrophic Mode of Nutrition', 'Leaves The Food Factories of Plants'] },
            { id: 's5', label: 'Role of Chlorophyll in Photosynthesis', prompt: 'Which idea is this? — Chlorophyll is a green pigment located inside the chloroplasts of plant cells that.', answer: 'Role of Chlorophyll in Photosynthesis', options: ['Role of Chlorophyll in Photosynthesis', 'How Do Plants Grow Need for Sunlight Water Soil', 'Nutrition in Plants Autotrophic Mode of Nutrition', 'Leaves The Food Factories of Plants'] },
            { id: 's6', label: 'Role of Air CO2 in Food Preparation by Plants', prompt: 'Which idea is this? — Carbon dioxide ($\\text{CO}_2$) is an essential gaseous raw material absorbed from the air.', answer: 'Role of Air CO2 in Food Preparation by Plants', options: ['Role of Air CO2 in Food Preparation by Plants', 'How Do Plants Grow Need for Sunlight Water Soil', 'Nutrition in Plants Autotrophic Mode of Nutrition', 'Leaves The Food Factories of Plants'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A gardener moves a row of potted plants behind a tall wall for decoration. Weeks later, watered and fertilised exactly like the others, the shaded plants are pale and stunted. \'More fertiliser will fix it,\' the gardener decides.',
            decisions: [{ prompt: 'Will extra fertiliser rescue the shaded plants?', options: [
                { text: 'No — the missing input is light, not nutrients. Photosynthesis makes the plant\'s food using light energy, so shaded plants starve even in rich, well-watered soil; paleness shows they cannot build enough chlorophyll and sugar. Moving them into the light fixes what fertiliser cannot — a nutrient cannot substitute for the energy source.', outcome: 'This is the farmer\'s shaded-wheat problem: same water, same feed, weaker plants — because the wall stole the sunlight that powers food-making.' },
                { text: 'Yes — fertiliser is plant food, so extra food compensates for the missing sunlight.', outcome: 'Fertiliser supplies minerals, not energy — the plant still needs light to convert carbon dioxide and water into its actual food.', reveals: 'fertilizer-replaces-light' },
                { text: 'The plants are stunted because the wall blocks their water, so deeper watering is the fix.', outcome: 'The scenario says watering was identical — the wall blocks light, and that is the input photosynthesis cannot do without.', reveals: 'walls-block-water' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sunlight is the stove, water the delivery truck, soil the pantry shelf. Remove the stove and the finest pantry still serves nothing.',
            decisions: [{ prompt: 'What comes next? Life Processes in Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Life Processes in Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch03_001', difficulty: 'standard',
          question: 'The growth of a plant is the permanent increase in size, mass, and complexity.',
          hint: 'Review Class 6 concepts on how plants absorb water from soil and how seeds sprout into.',
          misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.',
          parts: [
                { id: 'a', prompt: 'A potted hibiscus plant is placed in a bright room, but its soil is kept completely dry. Over two weeks, the plant stops growing and its leaves droop.', answer: 'Step 1: Identify the missing factor as water',
                  options: ['Step 1: Identify the missing factor as water', 'soil acts as the "food" for plants, similar to how animals eat food'],
                  hint: 'Review Class 6 concepts on how plants absorb water from soil and how seeds sprout into seedlings.',
                  misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.' }
          ],
            remediations: { 'soil-acts-as-the-food': { steps: ['To fix this misconception, have the student weigh a dry pot of soil before planting a seed, and weigh the soil again.', 'The soil weight remains nearly the same, proving the plant did not "eat" the soil.', 'Explain that soil is merely an anchor and a supply store for minerals and water, not a source of food.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.',
          parts: [
                { id: 'a', prompt: 'A student claims that plants can grow taller and healthier in a dark room as long as they are given plenty of water and rich soil.', answer: 'The claim is false',
                  options: ['The claim is false', 'soil contains ready-made food that the plant absorbs directly to grow', 'soil acts as the "food" for plants, similar to how animals eat food'],
                  hint: 'Review Class 6 concepts on how plants absorb water from soil and how seeds sprout into seedlings.',
                  misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.' }
          ],
            remediations: { 'soil-acts-as-the-food': { steps: ['To fix this misconception, have the student weigh a dry pot of soil before planting a seed, and weigh the soil again.', 'The soil weight remains nearly the same, proving the plant did not "eat" the soil.', 'Explain that soil is merely an anchor and a supply store for minerals and water, not a source of food.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_002', difficulty: 'standard',
          question: 'The autotrophic mode of nutrition is a physiological process in which.',
          hint: 'Review c7_bio_ch03_001 to understand how sunlight and water support fundamental plant.',
          misconception: 'Students frequently believe that plants "feed" on soil nutrients in the same way animals eat food, assuming that.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the term \'autotrophic\', and which group of living organisms primarily uses this mode of nutrition?', answer: '\'Auto\' means self, and \'troph\' means nourishment or feeding',
                  options: ['\'Auto\' means self, and \'troph\' means nourishment or feeding', 'eating other plants'],
                  hint: 'Review c7_bio_ch03_001 to understand how sunlight and water support fundamental plant survival.',
                  misconception: 'Students frequently believe that plants "feed" on soil nutrients in the same way animals eat food, assuming that fertilizers or soil.' }
          ],
            remediations: { 'students-frequently-believe-that-plants': { steps: ['To fix this, take a small pinch of table salt (minerals) and a glass of water (water), taste them separately, and note.', 'Explain that plants take in similar raw minerals from soil, but they act like master chefs in a kitchen, using sunlight.', 'Emphasize that soil is the grocery store providing raw ingredients, while autotrophic nutrition is the actual cooking.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_003', difficulty: 'standard',
          question: 'Leaves act as the primary food-producing organs of a plant, containing.',
          hint: 'Review c7_bio_ch03_002 to reinforce how plants obtain nutrition before studying leaf.',
          misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Leaves act as the primary food-producing organs of a plant, containing specialized green',
                  options: ['Leaves act as the primary food-producing organs of a plant, containing specialized green', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'The autotrophic mode of nutrition is a physiological process in', 'Photosynthesis is the biochemical process by'],
                  hint: 'Review c7_bio_ch03_002 to reinforce how plants obtain nutrition before studying leaf anatomy.',
                  misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the exact same way human.' }
          ],
            remediations: { 'leaves-are-merely-passive-green': { steps: ['To fix this misconception, guide the student through a hands-on observation using a fresh leaf dropped in warm water.', 'Explain that unlike human lungs that only exchange respiratory gases, leaf cells use sunlight to actively synthesize.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_004', difficulty: 'standard',
          question: 'Photosynthesis is the biochemical process by which green plants utilize solar.',
          hint: 'Review c7_bio_ch03_003 to reinforce how leaf structure is specialized for gathering light.',
          misconception: 'Students often think that plants "breathe in" carbon dioxide and "breathe out" oxygen in a way that is identical.',
          parts: [
                { id: 'a', prompt: 'What are the primary raw materials required by a green plant to perform photosynthesis?', answer: 'Carbon dioxide and water are the primary raw materials',
                  options: ['Carbon dioxide and water are the primary raw materials', 'breathe out', 'this gas exchange stops at night'],
                  hint: 'Review c7_bio_ch03_003 to reinforce how leaf structure is specialized for gathering light and gases.',
                  misconception: 'Students often think that plants "breathe in" carbon dioxide and "breathe out" oxygen in a way that is identical to human breathing organs.' }
          ],
            remediations: { 'plants-breathe-in-carbon-dioxide': { steps: ['To fix this, guide the student to compare human lungs with plant stomata using a simple table: lungs use muscular.', 'Next, emphasize that cellular respiration happens 24 hours a day in every living plant cell, but photosynthesis only.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_005', difficulty: 'standard',
          question: 'Chlorophyll is a green pigment located inside the chloroplasts of plant cells.',
          hint: 'Review node c7_bio_ch03_004 to solidify the basic inputs and outputs of photosynthesis.',
          misconception: 'Students often think that chlorophyll itself is the food that plants manufacture, or they believe that chlorophyll.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Chlorophyll is a green pigment located inside the chloroplasts of plant cells that',
                  options: ['Chlorophyll is a green pigment located inside the chloroplasts of plant cells that', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'The autotrophic mode of nutrition is a physiological process in', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Review node c7_bio_ch03_004 to solidify the basic inputs and outputs of photosynthesis.',
                  misconception: 'Students often think that chlorophyll itself is the food that plants manufacture, or they believe that chlorophyll absorbs green light.' }
          ],
            remediations: { 'chlorophyll-itself-is-the-food': { steps: ['Remind students of how colored filters work in physics or optics: an object looks a certain color because it reflects.', 'Have them recall that leaves look green because green light is reflected away, meaning it is not absorbed; therefore.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_006', difficulty: 'standard',
          question: 'Carbon dioxide ($\\text{CO}_2$) is an essential gaseous raw material absorbed.',
          hint: 'Review c7_bio_ch03_004 to re-familiarize yourself with the general equation and raw.',
          misconception: 'Students often think that plants only take in carbon dioxide and never release it, or conversely, that they "breathe.',
          parts: [
                { id: 'a', prompt: 'A potted hibiscus plant is placed inside a sealed glass bell jar next to a dish of potassium hydroxide ($\\text{KOH}$), a chemical that absorbs all carbon.', answer: 'The leaf will NOT turn blue-black',
                  options: ['The leaf will NOT turn blue-black', 'sunlight and water alone are enough to make food without carbon dioxide'],
                  hint: 'Review c7_bio_ch03_004 to re-familiarize yourself with the general equation and raw materials.',
                  misconception: 'Students often think that plants only take in carbon dioxide and never release it, or conversely, that they "breathe in" oxygen like.' }
          ],
            remediations: { 'plants-only-take-in-carbon': { steps: ['To fix this, guide the student through a two-part timeline of a plant\'s day: first, explain that during bright.', 'Second, explain that at night, photosynthesis stops because there is no light, but respiration continues, meaning the.', 'Use a balance scale analogy where photosynthesis is a heavy weight on one side during the day, and respiration is.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
