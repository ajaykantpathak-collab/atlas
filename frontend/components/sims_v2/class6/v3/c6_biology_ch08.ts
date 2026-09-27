import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch08 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch08: SimDef = {
    id: 'v3_c6_biology_ch08',
    title: 'Nature\'s Treasures',
    subtitle: 'This node covers air composition and water as natural resources, plus simple.',
    classLevel: 6, subject: 'biology', topic: 'Nature\'s Treasures',
    chapters: ['c6_biology_ch08'],
    nodeIds: ['c6_biology_ch08_001', 'c6_biology_ch08_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Hold your breath for ten seconds — uncomfortable, right? That invisible stuff you just missed is air, and the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is air made of, and which gas do living things need for breathing?',
        options: ['Air is a mixture of gases', 'air is just oxygen', 'air is empty space'],
        answer: 'Air is a mixture of gases',
        hook: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight.',
    },
    teaching: [
        { title: 'Air, water, and soil as treasures', text: 'Air is the mixture of gases around the Earth — mainly nitrogen and oxygen with small amounts of carbon dioxide and other gases — that all living things need for respiration and plants need for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch08_001', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch08_001', title: 'Air, water, and soil as treasures',
          caseStudy: { intro: 'Hold your breath for ten seconds — uncomfortable, right? That invisible stuff you just missed is air, and the part your body wants is oxygen.',
            decisions: [{ prompt: 'What is air made of, and which gas do living things need for breathing?', options: [
                { text: 'Air is a mixture of gases', outcome: 'Air is a mixture of gases — mainly nitrogen and oxygen with small amounts of carbon dioxide and.' },
                { text: 'air is just oxygen', outcome: 'Not quite — Students often think "air is empty space" and "there is water everywhere." Air is a real mixture.', reveals: 'air-is-empty-space-and' },
                { text: 'air is empty space', outcome: 'Not quite — Students often think "air is empty space" and "there is water everywhere." Air is a real mixture.', reveals: 'air-is-empty-space-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch08_002', title: 'Forests, fossil fuels, and conserving resources',
          caseStudy: { intro: 'Start with a forest — not just a pretty place of trees, but a treasure house.',
            decisions: [{ prompt: 'Name three things forests provide us.', options: [
                { text: 'Forests provide wood, medicines from plants, oxygen, and shelter for wildlife', outcome: 'Forests provide wood, medicines from plants, oxygen, and shelter for wildlife — plus they conserve.' },
                { text: 'coal and petrol are just things we dig up, like stones', outcome: 'Not quite — Students often think coal and petrol are just things we dig up, like stones.', reveals: 'coal-and-petrol-are-just' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch08_002', title: 'Identify each idea',
          dissect: { specimen: 'Nature\'s Treasures', spots: [
            { id: 's1', label: 'Air water and soil as treasures', prompt: 'Which idea is this? — Air is the mixture of gases around the Earth — mainly nitrogen and oxygen with small.', answer: 'Air water and soil as treasures', options: ['Air water and soil as treasures', 'Forests fossil fuels and conserving resources'] },
            { id: 's2', label: 'Forests fossil fuels and conserving resources', prompt: 'Which idea is this? — Forests are large areas covered with trees that provide wood, medicines, oxygen, and.', answer: 'Forests fossil fuels and conserving resources', options: ['Forests fossil fuels and conserving resources', 'Air water and soil as treasures'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch08_002', title: 'You made it',
          caseStudy: { intro: 'You finished Nature\'s Treasures — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch08_001', difficulty: 'standard',
          question: 'Air is the mixture of gases around the Earth — mainly nitrogen and oxygen with.',
          hint: 'If stuck, revisit "Habitat and Adaptation" — the home that supplies every need.',
          misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight.',
          parts: [
                { id: 'a', prompt: 'What is air made of, and which gas do living things need for breathing?', answer: 'Air is a mixture of gases',
                  options: ['Air is a mixture of gases', 'air is just oxygen', 'air is empty space', 'there is water everywhere'],
                  hint: 'If stuck, revisit "Habitat and Adaptation" — the home that supplies every need.',
                  misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight and force, and most.' },
                { id: 'b', prompt: 'Name three sources of fresh water.', answer: 'Rain, rivers, and groundwater (from wells and pumps)',
                  options: ['Rain, rivers, and groundwater (from wells and pumps)', 'air is empty space', 'there is water everywhere', '"air is empty space" and "there is water everywhere'],
                  hint: 'If stuck, revisit "Habitat and Adaptation" — the home that supplies every need.',
                  misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight and force, and most.' }
          ],
            remediations: { 'air-is-empty-space-and': { steps: ['Link each resource to a physical sense — air: feel it move when you fan yourself; water: try a day counting every drop.', 'Ask "what would happen if this ran out tomorrow?" for each — the dependency becomes vivid.', 'End with one conservation action the student can take this week (fix a tap, water plants with leftover water).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight.',
          parts: [
                { id: 'a', prompt: 'Name two ways air gets polluted and one effect it has on us.', answer: 'Air is polluted by smoke from vehicles and factories and by dust and burning',
                  options: ['Air is polluted by smoke from vehicles and factories and by dust and burning', 'air is empty space', 'there is water everywhere', '"air is empty space" and "there is water everywhere'],
                  hint: 'If stuck, revisit "Habitat and Adaptation" — the home that supplies every need.',
                  misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight and force, and most.' },
                { id: 'b', prompt: 'Suggest two actions to conserve water at home or school.', answer: 'Fix leaking taps and collect rainwater for gardens (rainwater harvesting)',
                  options: ['Fix leaking taps and collect rainwater for gardens (rainwater harvesting)', 'air is empty space', 'there is water everywhere', '"air is empty space" and "there is water everywhere'],
                  hint: 'If stuck, revisit "Habitat and Adaptation" — the home that supplies every need.',
                  misconception: 'Students often think "air is empty space" and "there is water everywhere." Air is a real mixture of gases with weight and force, and most.' }
          ],
            remediations: { 'air-is-empty-space-and': { steps: ['Link each resource to a physical sense — air: feel it move when you fan yourself; water: try a day counting every drop.', 'Ask "what would happen if this ran out tomorrow?" for each — the dependency becomes vivid.', 'End with one conservation action the student can take this week (fix a tap, water plants with leftover water).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch08_002', difficulty: 'standard',
          question: 'Forests are large areas covered with trees that provide wood, medicines.',
          hint: 'If stuck, revisit "Air and Water" — the first two treasures this node extends.',
          misconception: 'Students often think coal and petrol are just things we dig up, like stones.',
          parts: [
                { id: 'a', prompt: 'Name three things forests provide us.', answer: 'Forests provide wood, medicines from plants, oxygen, and shelter for wildlife',
                  options: ['Forests provide wood, medicines from plants, oxygen, and shelter for wildlife', 'coal and petrol are just things we dig up, like stones'],
                  hint: 'If stuck, revisit "Air and Water" — the first two treasures this node extends.',
                  misconception: 'Students often think coal and petrol are just things we dig up, like stones.' }
          ],
            remediations: { 'coal-and-petrol-are-just': { steps: ['Anchor each treasure to one image — forests = a sponge holding soil and water; soil = the skin where food grows; fossil.', 'Ask "how long did it take to make vs how fast are we using it?" — the timescale gap is what makes it precious.', 'End with one conservation habit the student can start — switching off a light, planting a seedling.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
