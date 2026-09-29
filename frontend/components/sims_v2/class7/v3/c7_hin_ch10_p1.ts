import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch10_p1: SimDef = {
    id: 'v3_c7_hin_ch10_p1',
    title: 'मीरा के पद · Part 1/3',
    subtitle: 'यह नोड \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' (मल्हार कक्षा 6, मीराबाई) के इस पहलू तक.',
    classLevel: 7, subject: 'hin', topic: 'मीरा के पद · Part 1/3',
    chapters: ['c7_hin_ch10'],
    nodeIds: ['c7_hin_cbse_10_001', 'c7_hin_cbse_10_002', 'c7_hin_cbse_10_003', 'c7_hin_cbse_10_004', 'c7_hin_cbse_10_005', 'c7_hin_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'पहले रचनाकार: मीराबाई। फिर काल और परिवेश। फिर \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का विषय — कृष्ण-भक्ति.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'मीरा के पद — कवि परिचय और पृष्ठभूमि', text: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय — मीराबाई द्वारा रचित कविता (पद)। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मीरा के पद —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c7_hin_cbse_10_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['रचनाकार मीराबाई का काल/परिचय।', 'पाठ का विषय कृष्ण-भक्ति — नंदलाल की मोहिनी मूरत और सावन की.', 'जुड़ाव — कवि का अनुभव पाठ में झलकता है।'], answer: 'रचनाकार मीराबाई का काल/परिचय। पाठ का विषय कृष्ण-भक्ति — नंदलाल की मोहिनी मूरत और सावन की. जुड़ाव — कवि का अनुभव पाठ में झलकता है।' } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मीरा के पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मीरा के पद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मीरा के पद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_001', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय — मीराबाई.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_002', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ — मीरा के पद में कृष्ण की.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_003', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश — कविता (पद) किस स्थान.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_004', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार — मीरा (भक्त).',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में मीरा (भक्त) पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पात्र/केंद्रीय विचार', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में मीरा (भक्त) पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_005', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के सहायक पात्र/तत्व — कृष्ण/नंदलाल.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के सहायक पात्र/तत्व',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के सहायक पात्र/तत्व', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_006', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का मुख्य विषय — कृष्ण-भक्ति — नंदलाल की.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' की घटनाएँ कथानक हैं, कृष्ण-भक्ति विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का मुख्य विषय',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का मुख्य विषय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' की घटनाएँ कथानक हैं, कृष्ण-भक्ति विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
