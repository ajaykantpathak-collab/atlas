import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch06 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch06: SimDef = {
    id: 'v3_c6_biology_ch06',
    title: 'Testing What We Eat — Nutrients, Millets & Food Miles',
    subtitle: 'What is really hiding inside your food?',
    classLevel: 6, subject: 'biology', topic: 'Mindful Eating — Testing Our Food',
    chapters: ['c6_biology_ch06'],
    nodeIds: ['c6_biology_ch06_001', 'c6_biology_ch06_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a food detective with a drop of iodine', intro: 'Your plate looks simple — rice, dal, a little ghee — but every bite hides nutrients you cannot see. Time to make the invisible visible.', goal: 'Test foods for starch, fat, and protein — and pick grains that feed you better and travel less.' },
    discovery: {
        question: 'A shopkeeper secretly mixed cheap starch powder into expensive gram flour. A visiting science student drops iodine on the flour and it turns blue-black. What just happened?',
        options: ['The flour is adulterated — starch betrays itself to iodine', 'The flour is burnt — blue-black means spoilt', 'The flour is pure — colour change means nothing', 'The iodine was bad — real gram flour would turn it red'],
        answer: 'The flour is adulterated — starch betrays itself to iodine',
        hook: 'One drop of iodine is a detective — starch cannot hide from it. Blue-black is the tell that gives the trick away.',
    },
    teaching: [
        { title: 'Testing food for starch, fat, and protein', text: 'The components of food can be detected by simple chemical tests.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch06_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Play food detective — test rice, butter, and dal for hidden starch, fat, and protein, then design a lunch that packs more nutrition into fewer miles travelled.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch06_001', title: 'Testing food for starch, fat, and protein',
          caseStudy: { intro: 'A plate of rice and a bowl of dal look different — but what is actually inside them? Tests answer it.',
            decisions: [{ prompt: 'Describe the iodine test for starch and its positive result.', options: [
                { text: 'A few drops of iodine solution are added to the food sample; if starch is present the', outcome: 'A few drops of iodine solution are added to the food sample; if starch is present the food turns.' },
                { text: 'turns black', outcome: 'Not quite — Students often think the blue-black colour means the food is "bad" or "burned." The colour is just.', reveals: 'the-blue-black-colour-means' },
                { text: 'burned', outcome: 'Not quite — Students often think the blue-black colour means the food is "bad" or "burned." The colour is just.', reveals: 'the-blue-black-colour-means' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_002', title: 'Millets and food miles',
          caseStudy: { intro: 'Ask at home: did your grandparents eat rice and wheat every day? Probably not — they ate ragi roti, bajra khichdi, and jowar bhakri.',
            decisions: [{ prompt: 'What are millets? Name any two.', options: [
                { text: 'Millets are small-seeded cereal crops that are nutritious and grow in dry conditions', outcome: 'Millets are small-seeded cereal crops that are nutritious and grow in dry conditions — examples.' },
                { text: 'rice and wheat are the only "real" grains and millets are poor people\'s food', outcome: 'Not quite — Students often think rice and wheat are the only "real" grains and millets are poor people\'s food.', reveals: 'rice-and-wheat-are-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch06_002', title: 'Identify each idea',
          dissect: { specimen: 'Mindful Eating — Testing Our Food', spots: [
            { id: 's1', label: 'Testing food for starch fat and protein', prompt: 'Which idea is this? — The components of food can be detected by simple chemical tests.', answer: 'Testing food for starch fat and protein', options: ['Testing food for starch fat and protein', 'Millets and food miles'] },
            { id: 's2', label: 'Millets and food miles', prompt: 'Which idea is this? — Millets are small-seeded cereal crops — such as ragi (finger millet), jowar (sorghum).', answer: 'Millets and food miles', options: ['Millets and food miles', 'Testing food for starch fat and protein'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the Class 6 photo, three friends who all turned twelve this year look wildly different — one looks fifteen, one looks twelve, one still looks ten. A visiting relative whispers that somebody must be lying about their age.',
            decisions: [{ prompt: 'What is really going on?', options: [
                { text: 'Nothing is wrong — adolescence and its growth spurt start on each body\'s own schedule, somewhere in the early teens, so same-age classmates can look years apart. Bodies are not products off an assembly line with a fixed finish date; each has its own timetable.', outcome: 'The chapter\'s key idea: adolescence is a window, not a birthday — entering it at eleven or thirteen are both normal, and the height differences even out over time.' },
                { text: 'The relative is right — children of the same age should look the same, so someone is lying.', outcome: 'Same age does not mean same stage — growth spurts begin at different ages for different children, which is exactly what the photo shows.', reveals: 'same-age-same-growth' },
                { text: 'The shorter children must be sick or underfed, since healthy children always grow at the same rate.', outcome: 'A later growth spurt is not illness — healthy children simply enter adolescence at different ages within the normal window.', reveals: 'short-means-sick' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_002', title: 'You made it',
          caseStudy: { intro: 'A drop of iodine, a piece of paper, a colour change — that\'s how you find out what food is really made of. And ragi that grew next door beats rice that crossed a country.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch06_001', difficulty: 'standard',
          question: 'The components of food can be detected by simple chemical tests.',
          hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
          misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with.',
          parts: [
                { id: 'a', prompt: 'How do you test a food sample for fat?', answer: 'Rub the food on a piece of paper',
                  options: ['Rub the food on a piece of paper', 'burned', 'the blue-black colour means the food is "bad" or "burned'],
                  hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
                  misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with starch — it is.' },
                { id: 'b', prompt: 'A food sample turns blue-black on adding iodine. Which nutrient does it contain, and name one such food.', answer: 'It contains starch',
                  options: ['It contains starch', 'burned', 'the blue-black colour means the food is "bad" or "burned'],
                  hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
                  misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with starch — it is.' },
                { id: 'c', prompt: 'Butter rubbed on paper leaves a greasy see-through patch. What does this show?', answer: 'It shows butter contains fat',
                  options: ['It shows butter contains fat', 'butter is wet', 'burned', 'the blue-black colour means the food is "bad" or "burned'],
                  hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
                  misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with starch — it is.' }
          ],
            remediations: { 'the-blue-black-colour-means': { steps: ['Link each test to its picture — starch → blue-black drop, fat → see-through grease mark, protein → violet colour.', 'If possible run one real test at home with rice (iodine) and butter (paper) — the visible result fixes the memory.', 'Then quiz the other way: show a result and ask which nutrient it proves.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with.',
          parts: [
                { id: 'a', prompt: 'Why can you not rely on taste to find out which nutrients a food contains?', answer: 'Taste cannot tell nutrients apart',
                  options: ['Taste cannot tell nutrients apart', 'burned', 'the blue-black colour means the food is "bad" or "burned'],
                  hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
                  misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with starch — it is.' },
                { id: 'b', prompt: 'Which nutrient group would you expect in dal and egg, and how would a test confirm it?', answer: 'Dal and egg are rich in proteins',
                  options: ['Dal and egg are rich in proteins', 'burned', 'the blue-black colour means the food is "bad" or "burned'],
                  hint: 'If stuck, revisit "Components of Food" — the nutrient team and its jobs.',
                  misconception: 'Students often think the blue-black colour means the food is "bad" or "burned." The colour is just iodine reacting with starch — it is.' }
          ],
            remediations: { 'the-blue-black-colour-means': { steps: ['Link each test to its picture — starch → blue-black drop, fat → see-through grease mark, protein → violet colour.', 'If possible run one real test at home with rice (iodine) and butter (paper) — the visible result fixes the memory.', 'Then quiz the other way: show a result and ask which nutrient it proves.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_002', difficulty: 'standard',
          question: 'Millets are small-seeded cereal crops — such as ragi (finger millet), jowar.',
          hint: 'If stuck, revisit "Balanced Diet" — the idea that food quality matters beyond quantity.',
          misconception: 'Students often think rice and wheat are the only "real" grains and millets are poor people\'s food.',
          parts: [
                { id: 'a', prompt: 'Why are low food miles better for the environment?', answer: 'Low food miles mean the food needed less transport, fuel, and packaging',
                  options: ['Low food miles mean the food needed less transport, fuel, and packaging', 'it is cheaper', 'rice and wheat are the only "real" grains and millets are poor people\'s food'],
                  hint: 'If stuck, revisit "Balanced Diet" — the idea that food quality matters beyond quantity.',
                  misconception: 'Students often think rice and wheat are the only "real" grains and millets are poor people\'s food.' }
          ],
            remediations: { 'rice-and-wheat-are-the': { steps: ['Anchor each idea to one word — millets = nutritious tough grains (ragi/jowar/bajra); food miles = travel distance.', 'Do a home exercise: list three foods on tonight\'s plate and guess their food miles.', 'Then compare a roti of rice with one of bajra on protein — the numbers make the point.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
