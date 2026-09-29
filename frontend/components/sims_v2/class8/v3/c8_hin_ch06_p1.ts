import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p1: SimDef = {
    id: 'v3_c8_hin_ch06_p1',
    title: 'एक टोकरी भर मट्टिी · Part 1/3',
    subtitle: 'यह नोड \'गरीब वृद्धा और ज़मींदार\' (मल्हार कक्षा 6, (सामाजिक कथा)) के इस पहलू तक सीमित है.',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 1/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_001', 'c8_hin_cbse_06_002', 'c8_hin_cbse_06_003', 'c8_hin_cbse_06_004', 'c8_hin_cbse_06_005', 'c8_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (सामाजिक कथा)। फिर काल और परिवेश। फिर \'गरीब वृद्धा और ज़मींदार\' का विषय — गरीबी और अत्याचार.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — पृष्ठभूमि और रचनाकार परिचय', text: '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय — (सामाजिक कथा) द्वारा रचित कहानी। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c8_hin_cbse_06_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['रचनाकार (सामाजिक कथा) का काल/परिचय।', 'पाठ का विषय गरीबी और अत्याचार — ज़मींदार के महल के पास.', 'जुड़ाव — कवि का अनुभव पाठ में झलकता है।'], answer: 'रचनाकार (सामाजिक कथा) का काल/परिचय। पाठ का विषय गरीबी और अत्याचार — ज़मींदार के महल के पास. जुड़ाव — कवि का अनुभव पाठ में झलकता है।' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through एक टोकरी भर मट्टिी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? एक टोकरी भर मट्टिी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — एक टोकरी भर मट्टिी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_001', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय — (सामाजिक कथा) द्वारा.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'गरीब वृद्धा और ज़मींदार\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश', '\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'गरीब वृद्धा और ज़मींदार\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_002', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ — श्रीमान ज़मींदार अपने महल का अहाता.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'गरीब वृद्धा और ज़मींदार\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश', '\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'गरीब वृद्धा और ज़मींदार\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_003', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_004', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार — वृद्धा मुख्य पात्र/अवधारणा.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'गरीब वृद्धा और ज़मींदार\' में वृद्धा पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का पात्र/केंद्रीय विचार', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'गरीब वृद्धा और ज़मींदार\' में वृद्धा पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_005', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' के सहायक पात्र/तत्व — ज़मींदार, पोती मुख्य के साथ.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' के सहायक पात्र/तत्व',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' के सहायक पात्र/तत्व', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_006', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का मुख्य विषय — गरीबी और अत्याचार — ज़मींदार के महल.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'गरीब वृद्धा और ज़मींदार\' की घटनाएँ कथानक हैं, गरीबी और अत्याचार विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का मुख्य विषय',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का मुख्य विषय', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'गरीब वृद्धा और ज़मींदार\' की घटनाएँ कथानक हैं, गरीबी और अत्याचार विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
