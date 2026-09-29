import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch09_p1: SimDef = {
    id: 'v3_c7_hin_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'यह नोड \'चिड़िया\' (मल्हार कक्षा 6, (कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ पर.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c7_hin_ch09'],
    nodeIds: ['c7_hin_cbse_09_001', 'c7_hin_cbse_09_002', 'c7_hin_cbse_09_003', 'c7_hin_cbse_09_004', 'c7_hin_cbse_09_005', 'c7_hin_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'पहले रचनाकार: (कविता)। फिर काल और परिवेश। फिर \'चिड़िया\' का विषय — चिड़िया की प्रेम-रीति — स्वतंत्रता और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'चिड़िया\' का कथानक/पाठ — कविता में चिड़िया प्रेम-प्रीति सिखाती है — बंदी मानव को.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — \'चिड़िया\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_001', difficulty: 'standard',
          question: '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता। रचनाकार का.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'चिड़िया\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पाठ्य-परिवेश', '\'चिड़िया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'चिड़िया\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_002', difficulty: 'standard',
          question: '\'चिड़िया\' का कथानक/पाठ — कविता में चिड़िया प्रेम-प्रीति सिखाती है — बंदी मानव.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'चिड़िया\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' का कथानक/पाठ',
                  options: ['\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का पाठ्य-परिवेश', '\'चिड़िया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'चिड़िया\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_003', difficulty: 'standard',
          question: '\'चिड़िया\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' का पाठ्य-परिवेश',
                  options: ['\'चिड़िया\' का पाठ्य-परिवेश', '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_004', difficulty: 'standard',
          question: '\'चिड़िया\' का पात्र/केंद्रीय विचार — चिड़िया मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'चिड़िया\' में चिड़िया पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' का पात्र/केंद्रीय विचार',
                  options: ['\'चिड़िया\' का पात्र/केंद्रीय विचार', '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'चिड़िया\' में चिड़िया पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_005', difficulty: 'standard',
          question: '\'चिड़िया\' के सहायक पात्र/तत्व — मानव, आसमान मुख्य के साथ रहकर पाठ को आगे बढ़ाते.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' के सहायक पात्र/तत्व',
                  options: ['\'चिड़िया\' के सहायक पात्र/तत्व', '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_006', difficulty: 'standard',
          question: '\'चिड़िया\' का मुख्य विषय — चिड़िया की प्रेम-रीति — स्वतंत्रता और सामूहिकता का.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'चिड़िया\' की घटनाएँ कथानक हैं, चिड़िया की प्रेम-रीति विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'चिड़िया\' का मुख्य विषय',
                  options: ['\'चिड़िया\' का मुख्य विषय', '\'चिड़िया\' का पृष्ठभूमि और रचनाकार परिचय', '\'चिड़िया\' का कथानक/पाठ', '\'चिड़िया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'चिड़िया\' की घटनाएँ कथानक हैं, चिड़िया की प्रेम-रीति विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
