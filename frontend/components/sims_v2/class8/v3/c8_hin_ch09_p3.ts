import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch09_p3: SimDef = {
    id: 'v3_c8_hin_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'इस नोड में कक्षा 8 के पाठ 9 के आधार पर विश्लेषण-व्याख्या की **प्रक्रिया** (process) और.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c8_hin_ch09'],
    nodeIds: ['c8_hin_cbse_09_013', 'c8_hin_cbse_09_014', 'c8_hin_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने एक नया मोबाइल गेम खेला और तुम्हें रिव्यू (review) लिखना है — तुम सिर्फ़ "मज़ेदार है" नहीं.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के अवयवों (कथानक, पात्र, भाषा, शैली) को अलग-अलग करके उनकी अंतर्संबंध (interconnection) समझना, लेखक के उद्देश्य की पहचान करना और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए पाठ (गद्य या पद्य) के.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — चर्चा-बिंदु पाठ पर आधारित संरचित संवाद प्रक्रिया है जिसमें छात्र पढ़े/सुने गए पाठ के.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के अवयवों (कथानक.',
          hint: 'यदि छात्र अटक जाए तो c8_hin_cbse_09_008 (बिंब-रूपक) और c8_hin_cbse_09_009.',
          misconception: 'छात्र समझते हैं कि **आलोचनात्मक चिंतन = नकारात्मक आलोचना (criticism/fault-finding)** — वे "विश्लेषण" शब्द सुनते ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के अवयवों (कथानक, पात्र, भाषा,',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के अवयवों (कथानक, पात्र, भाषा,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि छात्र अटक जाए तो c8_hin_cbse_09_008 (बिंब-रूपक) और c8_hin_cbse_09_009 (विरोधाभास-प्रतीक).',
                  misconception: 'छात्र समझते हैं कि **आलोचनात्मक चिंतन = नकारात्मक आलोचना (criticism/fault-finding)** — वे "विश्लेषण" शब्द सुनते ही कमियाँ गिनाने लगते हैं.' }
          ],
            remediations: { 'criticism-fault-finding': { steps: ['**पुनः परिभाषित करें:** छात्र से कहें — "आलोचनात्मक चिंतन का अर्थ \'बुराई निकालना\' नहीं, \'गहराई से समझना\' है — जैसे.', '**मॉडल दिखाएँ:** एक ही अंश का दो विश्लेषण दें — (क) सतही: "अच्छा लिखा है" (ख) गहरा: PEEL संरचना में — और पूछें "कौन-सा.', '**अभ्यास कराएँ:** छोटे अंश (3-4 वाक्य) दें और केवल **एक** साहित्यिक युक्ति पर PEEL लिखने को कहें — धीरे-धीरे दो-तीन.', '**प्रतिपुष्टि (feedback) दें:** हर प्रयास पर बताएँ — Point स्पष्ट था?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए पाठ (गद्य या.',
          hint: 'यदि अटके तो कक्षा 7 के \'लेखन कौशल: पाठ-आधारित\' (c7_hin_cbse_09_014) के PEEL उदाहरणों और.',
          misconception: 'विद्यार्थी समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ की घटनाओं को अपने शब्दों में दोहराना (paraphrasing)। वे प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए पाठ (गद्य या पद्य) के',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए पाठ (गद्य या पद्य) के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि अटके तो कक्षा 7 के \'लेखन कौशल: पाठ-आधारित\' (c7_hin_cbse_09_014) के PEEL उदाहरणों और सरल पाठांश.',
                  misconception: 'विद्यार्थी समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ की घटनाओं को अपने शब्दों में दोहराना (paraphrasing)। वे प्रश्न के \'निर्देश शब्द\'.' }
          ],
            remediations: { 'paraphrasing-analyze': { steps: ['चरण 1: विद्यार्थी को एक छोटा पाठांश (4-5 पंक्तियाँ) दें और एक सरल प्रश्न पूछें: \'लेखक दुखी क्यों है?\' चरण 2: उससे मौखिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु पाठ पर आधारित संरचित संवाद प्रक्रिया है जिसमें छात्र पढ़े/सुने गए.',
          hint: 'यदि फँस जाएँ तो c8_hin_cbse_09_013 के "तर्क-निर्माण" अभ्यास दोहराएँ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि चर्चा-बिंदु का अर्थ है "शिक्षक प्रश्न पूछे, छात्र उत्तर दें" — यह कक्षा 6-7 की आदत है जहाँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु पाठ पर आधारित संरचित संवाद प्रक्रिया है जिसमें छात्र पढ़े/सुने गए पाठ के',
                  options: ['चर्चा-बिंदु पाठ पर आधारित संरचित संवाद प्रक्रिया है जिसमें छात्र पढ़े/सुने गए पाठ के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि फँस जाएँ तो c8_hin_cbse_09_013 के "तर्क-निर्माण" अभ्यास दोहराएँ — विशेषकर.',
                  misconception: 'छात्र समझते हैं कि चर्चा-बिंदु का अर्थ है "शिक्षक प्रश्न पूछे, छात्र उत्तर दें" — यह कक्षा 6-7 की आदत है जहाँ बोध-प्रश्न हावी रहते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को स्पष्ट करो कि "चर्चा में कोई गलत उत्तर नहीं होता, केवल असमर्थित विचार होते हैं" — उसे पाठ खोलकर एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
