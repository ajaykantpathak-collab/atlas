import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p2: SimDef = {
    id: 'v3_c8_hin_ch06_p2',
    title: 'एक टोकरी भर मट्टिी · Part 2/3',
    subtitle: 'यह नोड \'गरीब वृद्धा और ज़मींदार\' (मल्हार कक्षा 6, (सामाजिक कथा)) के इस पहलू तक सीमित है.',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 2/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_007', 'c8_hin_cbse_06_008', 'c8_hin_cbse_06_009', 'c8_hin_cbse_06_010', 'c8_hin_cbse_06_011', 'c8_hin_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'गरीब वृद्धा और ज़मींदार\' में ज़मींदार, झोंपड़ी गौण विषय हैं — वे मुख्य विषय गरीबी और अत्याचार को पूरक करते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — गौण विषय', text: '\'गरीब वृद्धा और ज़मींदार\' के गौण विषय — ज़मींदार, झोंपड़ी जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c8_hin_cbse_06_008', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['उसमें छिपा दृश्य।', 'भाव पर असर।', 'पंक्ति — किसी श्रीमान ज़मींदार के महल के पास एक गरीब, अनाथ.'], answer: 'पंक्ति — किसी श्रीमान ज़मींदार के महल के पास एक गरीब, अनाथ. उसमें छिपा दृश्य। भाव पर असर।' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through एक टोकरी भर मट्टिी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? एक टोकरी भर मट्टिी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — एक टोकरी भर मट्टिी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_007', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' के गौण विषय — ज़मींदार, झोंपड़ी जैसे सहायक विचार.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' के गौण विषय',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' के गौण विषय', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_008', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' में बिंब/चित्रण — (सामाजिक कथा) ने वृद्धा, ज़मींदार.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' में बिंब/चित्रण',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' में बिंब/चित्रण', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_009', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' में विरोधाभास/विशेष युक्तियाँ', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_010', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' की पदावली — मुख्य शब्द वृद्धा, ज़मींदार, झोंपड़ी, महल.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' की पदावली',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' की पदावली', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_011', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' में भाषा-प्रयोग — (सामाजिक कथा) ने कहानी के अनुरूप.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' में भाषा-प्रयोग',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' में भाषा-प्रयोग', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_012', difficulty: 'standard',
          question: 'भाषा-प्रयोग — 4-व्याकरण-कसरत.',
          hint: 'यदि अटका हुआ महसूस हो तो: कि/की-3 + बाल-4 + काल-3 — 3-परीक्षण, 4-मुहावरे, 3-टेल; तीन मिले.',
          misconception: 'छात्र कि/की को \'उच्चारण-समान-तो-वर्तनी-समान\' समझते हैं — कार्य-अंतर-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग — 4-व्याकरण-कसरत:',
                  options: ['भाषा-प्रयोग — 4-व्याकरण-कसरत:', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कि/की-3 + बाल-4 + काल-3 — 3-परीक्षण, 4-मुहावरे, 3-टेल; तीन मिले तो भाषा.',
                  misconception: 'छात्र कि/की को \'उच्चारण-समान-तो-वर्तनी-समान\' समझते हैं — कार्य-अंतर-अर्थ: कि-संयोजक-की-संबंध-2-नौकरी-ई-कारी-ही-अंतर-परीक्षण-that/of-से-पता.' }
          ],
            remediations: { '2-that-of-2-that': { steps: ['**उपचार**: (1) कि/की-3 — that-अनुवाद-of-अनुवाद-हटाओ-परख-3-परीक्षण। (2) बाल-4 — खाल-बाल-बाल-बंका-पकड़-4-मुहावरे-1-मीटर।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
