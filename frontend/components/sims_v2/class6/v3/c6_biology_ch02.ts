import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch02 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch02: SimDef = {
    id: 'v3_c6_biology_ch02',
    title: 'Mindful Eating — Food Components',
    subtitle: 'This node covers the nutrient groups and their functions at an introductory level.',
    classLevel: 6, subject: 'biology', topic: 'Mindful Eating — Food Components',
    chapters: ['c6_biology_ch02'],
    nodeIds: ['c6_biology_ch02_001', 'c6_biology_ch02_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Look at an ordinary plate: rice, dal, a little ghee, cucumber salad, a glass of water.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Which nutrient group is mainly responsible for growth and repair of the body?',
        options: ['Proteins — they build muscles, skin, and blood and heal damaged tissue', 'carbohydrates', 'fat is simply "bad" and should be avoided'],
        answer: 'Proteins — they build muscles, skin, and blood and heal damaged tissue',
        hook: 'Students often think fat is simply "bad" and should be avoided.',
    },
    teaching: [
        { title: 'Nutrients: carbohydrates, proteins, fats, vitamins, minerals', text: 'Nutrients are the components of food that the body uses for specific functions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch02_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch02_001', title: 'Nutrients: carbohydrates, proteins, fats, vitamins, minerals',
          caseStudy: { intro: 'Look at an ordinary plate: rice, dal, a little ghee, cucumber salad, a glass of water. That plate secretly holds an entire nutrient team doing different jobs.',
            decisions: [{ prompt: 'Name the five nutrient groups and the main job of each.', options: [
                { text: 'Carbohydrates and fats give energy', outcome: 'Carbohydrates and fats give energy; proteins build and repair the body; vitamins and minerals.' },
                { text: 'fat is simply "bad" and should be avoided', outcome: 'Not quite — Students often think fat is simply "bad" and should be avoided.', reveals: 'fat-is-simply-bad-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch02_002', title: 'Balanced diet and deficiency diseases',
          caseStudy: { intro: 'Think of your body as a cricket team that needs every position filled — fuel players (carbohydrates and fats), builder players (proteins), and protector.',
            decisions: [{ prompt: 'What is a balanced diet?', options: [
                { text: 'A balanced diet is a diet containing all the nutrients', outcome: 'A balanced diet is a diet containing all the nutrients — carbohydrates, proteins, fats, vitamins.' },
                { text: 'healthy food', outcome: 'Not quite — Students often think "more food means healthier." Balance is about variety and proportion, not.', reveals: 'more-food-means-healthier' },
                { text: 'more food means healthier', outcome: 'Not quite — Students often think "more food means healthier." Balance is about variety and proportion, not.', reveals: 'more-food-means-healthier' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch02_002', title: 'Identify each idea',
          dissect: { specimen: 'Mindful Eating — Food Components', spots: [
            { id: 's1', label: 'Nutrients carbohydrates proteins fats vitamins minerals', prompt: 'Which idea is this? — Nutrients are the components of food that the body uses for specific functions.', answer: 'Nutrients carbohydrates proteins fats vitamins minerals', options: ['Nutrients carbohydrates proteins fats vitamins minerals', 'Balanced diet and deficiency diseases'] },
            { id: 's2', label: 'Balanced diet and deficiency diseases', prompt: 'Which idea is this? — A balanced diet is one that contains all the nutrients — carbohydrates, proteins, fats.', answer: 'Balanced diet and deficiency diseases', options: ['Balanced diet and deficiency diseases', 'Nutrients carbohydrates proteins fats vitamins minerals'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch02_002', title: 'You made it',
          caseStudy: { intro: 'You finished Mindful Eating — Food Components — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch02_001', difficulty: 'standard',
          question: 'Nutrients are the components of food that the body uses for specific functions.',
          hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
          misconception: 'Students often think fat is simply "bad" and should be avoided.',
          parts: [
                { id: 'a', prompt: 'Name the five nutrient groups and the main job of each.', answer: 'Carbohydrates and fats give energy',
                  options: ['Carbohydrates and fats give energy', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' },
                { id: 'b', prompt: 'Which nutrient group is mainly responsible for growth and repair of the body?', answer: 'Proteins — they build muscles, skin, and blood and heal damaged tissue',
                  options: ['Proteins — they build muscles, skin, and blood and heal damaged tissue', 'carbohydrates', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' },
                { id: 'c', prompt: 'Classify rice, dal, ghee, cucumber, and water by their main nutrient role.', answer: 'Rice is rich in carbohydrates (energy)',
                  options: ['Rice is rich in carbohydrates (energy)', 'energy food', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' },
                { id: 'd', prompt: 'Why is eating only rice every day called an unbalanced diet?', answer: 'Rice supplies mostly carbohydrates',
                  options: ['Rice supplies mostly carbohydrates', 'rice is filling so it is enough', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' }
          ],
            remediations: { 'fat-is-simply-bad-and': { steps: ['Draw a dinner plate and place one real food in each nutrient group together — rice for fuel, dal for building, salad.', 'Play a sorting game: call out ten foods and let the student drop each into fuel, bricks, or guards.', 'Repeat until the groups sort themselves in the student\'s head without prompting.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think fat is simply "bad" and should be avoided.',
          parts: [
                { id: 'a', prompt: 'Which nutrient gives the most energy per gram — carbohydrate or fat?', answer: 'Fat gives more energy per gram than carbohydrate',
                  options: ['Fat gives more energy per gram than carbohydrate', 'says carbohydrate confuses the everyday fuel with the concentrated reserve', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' },
                { id: 'b', prompt: 'What is roughage and why is it needed?', answer: 'Roughage is dietary fibre',
                  options: ['Roughage is dietary fibre', 'not digested', 'fat is simply "bad" and should be avoided'],
                  hint: 'If stuck, revisit "Sources of Food" — where every meal ingredient begins.',
                  misconception: 'Students often think fat is simply "bad" and should be avoided.' }
          ],
            remediations: { 'fat-is-simply-bad-and': { steps: ['Draw a dinner plate and place one real food in each nutrient group together — rice for fuel, dal for building, salad.', 'Play a sorting game: call out ten foods and let the student drop each into fuel, bricks, or guards.', 'Repeat until the groups sort themselves in the student\'s head without prompting.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch02_002', difficulty: 'standard',
          question: 'A balanced diet is one that contains all the nutrients — carbohydrates.',
          hint: 'If stuck, revisit "Components of Food" — the jobs each nutrient does.',
          misconception: 'Students often think "more food means healthier." Balance is about variety and proportion, not quantity — eating huge.',
          parts: [
                { id: 'a', prompt: 'What is a balanced diet?', answer: 'A balanced diet is a diet containing all the nutrients',
                  options: ['A balanced diet is a diet containing all the nutrients', 'healthy food', 'more food means healthier', '"more food means healthier'],
                  hint: 'If stuck, revisit "Components of Food" — the jobs each nutrient does.',
                  misconception: 'Students often think "more food means healthier." Balance is about variety and proportion, not quantity — eating huge amounts of only rice.' },
                { id: 'b', prompt: 'Match the deficiency to the disease: iron, vitamin D, vitamin C.', answer: 'Iron deficiency → anaemia (tiredness, pale skin)',
                  options: ['Iron deficiency → anaemia (tiredness, pale skin)', 'more food means healthier', '"more food means healthier'],
                  hint: 'If stuck, revisit "Components of Food" — the jobs each nutrient does.',
                  misconception: 'Students often think "more food means healthier." Balance is about variety and proportion, not quantity — eating huge amounts of only rice.' },
                { id: 'c', prompt: 'Name one cheap, common food that protects against vitamin A deficiency and one against iron deficiency.', answer: 'Carrot or leafy vegetables supply vitamin A',
                  options: ['Carrot or leafy vegetables supply vitamin A', 'more food means healthier', '"more food means healthier'],
                  hint: 'If stuck, revisit "Components of Food" — the jobs each nutrient does.',
                  misconception: 'Students often think "more food means healthier." Balance is about variety and proportion, not quantity — eating huge amounts of only rice.' }
          ],
            remediations: { 'more-food-means-healthier': { steps: ['Build a three-row table together — missing nutrient, body signal, fixing food — and fill it for iron, vitamin C, and.', 'Play "doctor": give a symptom (tired, pale → iron; bleeding gums → vitamin C; bent bones → vitamin D) and let the.', 'End by planning one balanced day menu from foods they actually eat.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
