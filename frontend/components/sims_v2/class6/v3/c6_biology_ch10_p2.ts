import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch10_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch10_p2: SimDef = {
    id: 'v3_c6_biology_ch10_p2',
    title: 'Life Processes -- Plant Growth and Transport · Part 2/2',
    subtitle: 'What does a sleeping seed need before it dares to grow?',
    classLevel: 6, subject: 'biology', topic: 'Life Processes -- Plant Growth and Transport · Part 2/2',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a gardener with two bean seeds and one wet paper towel', intro: 'Two identical seeds, two bowls — one dry, one damp. In three days only one has sprouted. What secret did the water whisper?', goal: 'Discover what germination really needs, and bust the myth that baby plants eat soil.' },
    discovery: {
        question: 'A dry chickpea sits unchanged in a cupboard for months. The same chickpea wrapped in a wet cloth sprouts in three days. The cupboard had air and warmth too — so what did the wet cloth unlock?',
        options: ['Water woke the seed — it swells, cracks its coat, and spends its stored food to grow', 'The cloth gave the seed special food the cupboard lacked', 'The cupboard was too dark — seeds need light before they can sprout', 'The wet cloth was warmer, and heat alone made it sprout'],
        answer: 'Water woke the seed — it swells, cracks its coat, and spends its stored food to grow',
        hook: 'Seeds don\'t \'eat\' the soil. A sprouting seed runs on a packed lunch — food stored in its cotyledons — until its own leaves open for business.',
    },
    teaching: [
        { title: 'Plant Responses: How Plants React to Light, Touch, and Gravity', text: 'Plant response is the process by which a plant adjusts its growth direction or physical state in reaction to environmental stimuli like light, gravity, or touch to improve its chances of survival.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch10_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Wake a sleeping seed yourself — give it exactly what it needs, then watch the root dive down and the shoot climb up toward light.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch10_007', title: 'Plant Responses: How Plants React to Light, Touch, and Gravity',
          caseStudy: { intro: 'Have you ever noticed a houseplant sitting on a windowsill leaning toward the glass?',
            decisions: [{ prompt: 'What is the general direction in which a plant shoot grows compared to the direction of a light source?', options: [
                { text: 'The shoot grows toward the light source', outcome: 'The shoot grows toward the light source. A wrong answer here suggests the student confuses the.' },
                { text: 'because they are thirsty', outcome: 'Not quite — Students often think plants move "because they want to" or "because they are thirsty," implying.', reveals: 'plants-move-because-they-want' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A child sprouts a bean seed on a wet paper towel on the windowsill — no soil at all — and shows it proudly. Her grandmother objects: \'Impossible. Plants need soil; that sprout must be fake.\'',
            decisions: [{ prompt: 'What does the sprouting seed really prove?', options: [
                { text: 'That germination needs water, air and warmth — not soil. The seed drank the moisture, swelled, and the embryo inside woke up and began growing on the food stored inside the seed itself. Soil matters later for minerals and support, but the first sprout runs entirely on the seed\'s own provisions.', outcome: 'The paper-towel sprout is real biology: a seed is a baby plant packed with its own lunchbox, and water is the trigger that starts it growing.' },
                { text: 'Grandmother is right — without soil\'s nutrients no seed can germinate, so the sprout must have been faked.', outcome: 'Seeds carry stored food precisely so they can sprout before roots reach soil — moisture alone is enough to start germination.', reveals: 'seeds-need-soil' },
                { text: 'It sprouted only because of sunlight — the paper towel\'s dampness had nothing to do with it.', outcome: 'Seeds can germinate in a dark cupboard if kept moist — water is the trigger; light becomes important once the shoot needs to make its own food.', reveals: 'germination-needs-sunlight' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch10_007', title: 'You made it',
          caseStudy: { intro: 'A seed is a packed suitcase: food inside, instructions inside, waiting only for water to say \'go\'. Soil comes later — the first meal is homemade.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch10_007', difficulty: 'standard',
          question: 'Plant response is the process by which a plant adjusts its growth direction.',
          hint: 'Review the function of roots and stems from Chapter 10.',
          misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.',
          parts: [
                { id: 'a', prompt: 'What is the general direction in which a plant shoot grows compared to the direction of a light source?', answer: 'The shoot grows toward the light source',
                  options: ['The shoot grows toward the light source', 'because they are thirsty'],
                  hint: 'Review the function of roots and stems from Chapter 10.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' }
          ],
            remediations: { 'plants-move-because-they-want': { steps: ['Ask the student to identify a non-living object that responds to stimuli (like a thermometer).', 'Explain that plants, like the thermometer, have a built-in "reaction" to change, not a "thought" process.', 'Use the example of a sunflower: it doesn\'t "choose" to turn, it is "pulled" into that shape by its growth process.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.',
          parts: [
                { id: 'a', prompt: 'Does a plant\'s response to light mean it "sees" the light like an animal? Why or why not?', answer: 'No, it does not "see" or "think"',
                  options: ['No, it does not "see" or "think"', 'because they are thirsty'],
                  hint: 'Review the function of roots and stems from Chapter 10.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' },
                { id: 'b', prompt: 'Design a simple experiment to prove that a plant responds to gravity. What would you do?', answer: 'Criteria: Place a germinating seed horizontally in a container with moist cotton',
                  options: ['Criteria: Place a germinating seed horizontally in a container with moist cotton', 'because they are thirsty'],
                  hint: 'Review the function of roots and stems from Chapter 10.',
                  misconception: 'Students often think plants move "because they want to" or "because they are thirsty," implying conscious intent.' }
          ],
            remediations: { 'plants-move-because-they-want': { steps: ['Ask the student to identify a non-living object that responds to stimuli (like a thermometer).', 'Explain that plants, like the thermometer, have a built-in "reaction" to change, not a "thought" process.', 'Use the example of a sunflower: it doesn\'t "choose" to turn, it is "pulled" into that shape by its growth process.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
