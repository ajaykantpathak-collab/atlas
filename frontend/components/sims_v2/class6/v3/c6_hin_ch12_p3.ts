import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p3: SimDef = {
    id: 'v3_c6_hin_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक-चिंतन तक सीमित है — लेखन अगले नोड में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_013', 'c6_hin_cbse_12_014', 'c6_hin_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '**तुम्हारे लिए:** इस नोड में तुम पुस्तक के बड़े प्रश्नों पर सोचोगे — पार्क-चिड़ियाघर, भारतीय-ताकत, नाम-कारण।.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक — (1) नेशनल-पार्क बनाम चिड़ियाघर (पुस्तक \'सोच-विचार\'): \'नैरोबी का नेशनल पार्क चिड़ियाघर नहीं है — नेशनल पार्क और चिड़ियाघर में क्या अंतर है?\' — पार्क = खुला-जंगल (जानवर आज़ाद, गाड़ी से.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — आलोचनात्मक', 'पाठ 12 — लेखन', 'पाठ 12 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'यात्रा वृत्तांत — मॉरिशस की ओर\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'यात्रा वृत्तांत — मॉरिशस की ओर\' पर वाचन-श्रवण और चर्चा — गद्य को सुनने, पढ़ने और उस पर.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 12 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_013', difficulty: 'standard',
          question: 'आलोचनात्मक — (1) नेशनल-पार्क बनाम चिड़ियाघर (पुस्तक \'सोच-विचार\'): \'नैरोबी का.',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन सवाल — \'पार्क-चिड़ियाघर?\' (खुला-बंद), \'असली ताकत कैसे?\'.',
          misconception: 'छात्र \'सिंह-उपेक्षा\' को \'सिंह-डर\' मानते हैं — सिंहों ने पर्यटकों के आदी-होकर उपेक्षा की (\'तुच्छातितुच्छ\') — डरे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक — (1) नेशनल-पार्क बनाम चिड़ियाघर (पुस्तक \'सोच-विचार\'): \'नैरोबी का नेशनल पार्क',
                  options: ['आलोचनात्मक — (1) नेशनल-पार्क बनाम चिड़ियाघर (पुस्तक \'सोच-विचार\'): \'नैरोबी का नेशनल पार्क', '\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन सवाल — \'पार्क-चिड़ियाघर?\' (खुला-बंद), \'असली ताकत कैसे?\'.',
                  misconception: 'छात्र \'सिंह-उपेक्षा\' को \'सिंह-डर\' मानते हैं — सिंहों ने पर्यटकों के आदी-होकर उपेक्षा की (\'तुच्छातितुच्छ\') — डरे नहीं; सीखी-आदत-उपेक्षा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) पार्क-चिड़ियाघर — खुला-बंद। (2) \'असली ताकत\' — ऊख-सफलता + बिना-असंभव। (3) तीन-कारण — धर्म-डटना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_014', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_015', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' पर वाचन-श्रवण और चर्चा — गद्य को सुनने, पढ़ने.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
