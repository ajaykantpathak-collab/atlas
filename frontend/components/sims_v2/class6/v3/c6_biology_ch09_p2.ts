import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch09_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch09_p2: SimDef = {
    id: 'v3_c6_biology_ch09_p2',
    title: 'Life Processes -- Animal Nutrition and Respiration · Part 2/2',
    subtitle: 'Trace a bite of food through the body\'s longest assembly line',
    classLevel: 6, subject: 'biology', topic: 'Life Processes -- Animal Nutrition and Respiration · Part 2/2',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_007', 'c6_biology_ch09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tiny food inspector riding through the digestive system', intro: 'A bite of aloo paratha is about to take the longest journey of its life — through a muscular tube where organs take turns breaking it down.', goal: 'Map every station of the digestive system and see why removing even one helper organ changes everything.' },
    discovery: {
        question: 'Rohan is sure digestion happens in the stomach — \'that\'s why it growls!\' His grandmother insists digestion starts the moment food enters the mouth. Who should win this argument?',
        options: ['Grandmother — chewing and saliva begin digestion in the mouth; the stomach is just one stop', 'Rohan — the stomach does all the digesting; the mouth only cuts food smaller', 'Both are wrong — digestion happens only in the intestines', 'Neither — food turns straight into energy inside the blood'],
        answer: 'Grandmother — chewing and saliva begin digestion in the mouth; the stomach is just one stop',
        hook: 'Digestion is an assembly line, not a single machine. Mouth, stomach, intestine, liver and pancreas each add something before food can become energy.',
    },
    teaching: [
        { title: 'What is a Balanced Diet?', text: 'A balanced diet is a daily food pattern that provides the body with the right proportions of energy-giving carbohydrates and fats, body-building proteins, and protective vitamins and minerals, along.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch09_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Escort a bite of roti from the first chew through the whole food-factory — past the acid bath of the stomach and the \'chemists\' liver and pancreas — until it\'s absorbed.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch09_007', title: 'What is a Balanced Diet?',
          caseStudy: { intro: 'Think about how you feel after eating a heavy meal of just sweets versus a meal with dal, roti, and vegetables.',
            decisions: [{ prompt: 'What are the three main roles that nutrients play in our body?', options: [
                { text: 'Nutrients provide energy, support body-building (growth/repair), and protect the body', outcome: 'Nutrients provide energy, support body-building (growth/repair), and protect the body from.' },
                { text: 'balanced', outcome: 'Not quite — Students often think "balanced" means eating the same amount (equal grams) of every food type.', reveals: 'balanced-means-eating-the-same' },
                { text: '"balanced" means eating the same amount (equal grams) of every food type', outcome: 'Not quite — Students often think "balanced" means eating the same amount (equal grams) of every food type.', reveals: 'balanced-means-eating-the-same' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_008', title: 'Respiration and Circulation: How Oxygen Reaches Cells',
          caseStudy: { intro: 'Imagine you are waiting for a delivery of a parcel at your home.',
            decisions: [{ prompt: 'What is the primary role of the heart in the context of oxygen transport?', options: [
                { text: 'The heart acts as a muscular pump that contracts to move blood through the body', outcome: 'The heart acts as a muscular pump that contracts to move blood through the body.' },
                { text: 'makes air', outcome: 'Not quite — Students often think breathing *is* the same as oxygen reaching the cells.', reveals: 'breathing-is-the-same-as' },
                { text: 'stores oxygen', outcome: 'Not quite — Students often think breathing *is* the same as oxygen reaching the cells.', reveals: 'breathing-is-the-same-as' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch09_008', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes -- Animal Nutrition and Respiration · Part 2/2', spots: [
            { id: 's1', label: 'What is a Balanced Diet', prompt: 'Which idea is this? — A balanced diet is a daily food pattern that provides the body with the right proportions.', answer: 'What is a Balanced Diet', options: ['What is a Balanced Diet', 'Respiration and Circulation How Oxygen Reaches Cells'] },
            { id: 's2', label: 'Respiration and Circulation How Oxygen Reaches Cells', prompt: 'Which idea is this? — The circulatory system acts as the body\'s transport highway, using the heart as a pump.', answer: 'Respiration and Circulation How Oxygen Reaches Cells', options: ['Respiration and Circulation How Oxygen Reaches Cells', 'What is a Balanced Diet'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school lunch conversation, a student asks why the digestive system is a long, winding tube that takes food on a whole journey — \'wouldn\'t a short, wide pouch be a simpler design?\'',
            decisions: [{ prompt: 'What does the long tube actually accomplish that a pouch could not?', options: [
                { text: 'Digestion is a staged process, and the length buys both time and surface — food is broken down step by step (mouth, stomach, then the long intestine), and the intestine\'s huge surface area is what lets digested nutrients actually pass into the blood. A short wide pouch would dump food through before it was fully digested or absorbed.', outcome: 'The tube\'s shape is the function: each section does a different job, and the intestine\'s length exists for absorption — a pouch would leave nutrients unharvested.' },
                { text: 'The student has a point — the tube is long mainly to store more food so we can go days between meals.', outcome: 'The gut is a processing line, not a storage tank — its length exists for the stages of digestion and the surface area needed to absorb nutrients.', reveals: 'gut-is-storage' },
                { text: 'The pouch design would work equally well — length is just leftover anatomy with no purpose.', outcome: 'Every part of the tract has a role — churning, acid breakdown, enzyme action and absorption happen in sequence along the length.', reveals: 'gut-length-is-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch09_008', title: 'You made it',
          caseStudy: { intro: 'Your body never asks one organ to do a whole job. Digestion is a relay — and the race starts in your mouth, not your stomach.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'standard',
          question: 'A balanced diet is a daily food pattern that provides the body with the right.',
          hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A balanced diet is a daily food pattern that provides the body with the right proportions',
                  options: ['A balanced diet is a daily food pattern that provides the body with the right proportions', 'The digestive system is a biological network of organs, including a long muscular tube', 'Animals are classified into three main groups based on their dietary habits: herbivores', 'Digestion is the biological process of breaking down large, complex food molecules into'],
                  hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
                  misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.' }
          ],
            remediations: { 'balanced-means-eating-the-same': { steps: ['Review the function of "Protective Nutrients" versus "Energy-giving Foods." Explain that while we need large amounts.', 'Use the analogy of a car: you need a full tank of fuel (carbs) to drive, but only a tiny drop of oil (vitamins) to keep.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.',
          parts: [
                { id: 'a', prompt: 'Why is it important to eat fruits and vegetables in their raw or lightly cooked state when possible?', answer: 'Cooking at high heat can destroy sensitive nutrients like Vitamin C',
                  options: ['Cooking at high heat can destroy sensitive nutrients like Vitamin C', 'because it tastes better', 'balanced', '"balanced" means eating the same amount (equal grams) of every food type'],
                  hint: 'Review the "Components of Food" chart (Fig 3.5 in text).',
                  misconception: 'Students often think "balanced" means eating the same amount (equal grams) of every food type.' }
          ],
            remediations: { 'balanced-means-eating-the-same': { steps: ['Review the function of "Protective Nutrients" versus "Energy-giving Foods." Explain that while we need large amounts.', 'Use the analogy of a car: you need a full tank of fuel (carbs) to drive, but only a tiny drop of oil (vitamins) to keep.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_008', difficulty: 'standard',
          question: 'The circulatory system acts as the body\'s transport highway, using the heart.',
          hint: 'Review the concept of lungs and how they exchange gas with the blood.',
          misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.',
          parts: [
                { id: 'a', prompt: 'What is the primary role of the heart in the context of oxygen transport?', answer: 'The heart acts as a muscular pump that contracts to move blood through the body',
                  options: ['The heart acts as a muscular pump that contracts to move blood through the body', 'makes air', 'stores oxygen', 'breathing *is* the same as oxygen reaching the cells'],
                  hint: 'Review the concept of lungs and how they exchange gas with the blood.',
                  misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.' },
                { id: 'b', prompt: 'A red blood cell is currently in the lung. Describe its journey to a muscle cell in your leg.', answer: 'Step 1: The cell picks up oxygen in the lungs',
                  options: ['Step 1: The cell picks up oxygen in the lungs', 'breathing *is* the same as oxygen reaching the cells'],
                  hint: 'Review the concept of lungs and how they exchange gas with the blood.',
                  misconception: 'Students often think breathing *is* the same as oxygen reaching the cells.' }
          ],
            remediations: { 'breathing-is-the-same-as': { steps: ['Ask the student: "If you want to send a letter to a friend in another city, does it fly there by itself or does it.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
