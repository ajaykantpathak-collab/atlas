import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch10_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'यह नोड कविता के पद्यांश के भाव और संदेश के स्पष्टीकरण पर केंद्रित है, विशेषकर साहित्यिक.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 10 · Part 3/3',
    chapters: ['c10_hin_ks_ch10'],
    nodeIds: ['c10_hin_ks_cbse_10_013', 'c10_hin_ks_cbse_10_014', 'c10_hin_ks_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — आशय-स्पष्टीकरण', 'पाठ 10 — परीक्षा-उत्तर', 'पाठ 10 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 3/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — \'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का आलोचनात्मक चिंतन — विश्लेषण करके.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 10 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_013', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का आलोचनात्मक चिंतन — विश्लेषण करके.',
          hint: 'यदि फंसे हुए महसूस हो, तो c10_hin_ks_cbse_10_002 (पद्यांश-वार भावार्थ) और.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे कविता की पंक्ति को दोहरा दें या उसके शाब्दिक अर्थ को बताएं (जैसे "वह रो रही है" का अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का आलोचनात्मक चिंतन',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हुए महसूस हो, तो c10_hin_ks_cbse_10_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_10_006.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे कविता की पंक्ति को दोहरा दें या उसके शाब्दिक अर्थ को बताएं (जैसे "वह रो रही है" का अर्थ "वह आंसू बहा रही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर ("वह दुखी है") को कैसे विश्लेषणात्मक बनाया जाए: पहले पूछिए कि "दुखी क्यों?" फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_014', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर पाठ-आधारित लेखन — पाठ से प्रमाण.',
          hint: 'यदि छात्र PEEL में Link चरण से कठिनाई महसूस कर रहा है, तो उसे पाठ 10 के केंद्रीय भाव और.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा के उत्तर में लंबा लिखने से अधिक अंक मिलते हैं, इसलिए वे अनावश्यक दोहराव, सामान्य ज्ञान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर पाठ-आधारित लेखन',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र PEEL में Link चरण से कठिनाई महसूस कर रहा है, तो उसे पाठ 10 के केंद्रीय भाव और रस.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा के उत्तर में लंबा लिखने से अधिक अंक मिलते हैं, इसलिए वे अनावश्यक दोहराव, सामान्य ज्ञान या पाठ से संबंधित.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि दो उत्तर लिखिए: एक लंबा लेकिन vague उत्तर (जैसे "पर्यावरण बहुत महत्वपूर्ण है और हमें इसे बचाना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_015', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर वाचन-श्रवण और चर्चा-बिंदु.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_ks_cbse_10_004 (केंद्रीय भाव) और c10_hin_ks_cbse_10_005.',
          misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल शब्दों का शुद्ध उच्चारण है और \'चर्चा-बिंदु\' का अर्थ कविता का सारांश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_ks_cbse_10_004 (केंद्रीय भाव) और c10_hin_ks_cbse_10_005 (छंद-लय).',
                  misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल शब्दों का शुद्ध उच्चारण है और \'चर्चा-बिंदु\' का अर्थ कविता का सारांश लिखना है। वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता का एक पद देकर कहें: "इसे तीन तरह से पढ़ो — (क) सपाट, (ख) केवल विराम चिह्नों पर रुककर, (ग) भावानुकूल.', 'चर्चा के लिए एक \'चर्चा-मानचित्र\' (discussion map) दें जिसमें चार खाने हों: केंद्रीय भाव, दो कलात्मक युक्तियाँ, एक.', 'अगले चरण में छात्र स्वयं किसी अन्य पद पर यही प्रक्रिया दोहराए। 4.', 'अंत में छात्र को 2 मिनट का मौखिक वाचन + 3 मिनट की चर्चा रिकॉर्ड कराकर स्व-मूल्यांकन करने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
