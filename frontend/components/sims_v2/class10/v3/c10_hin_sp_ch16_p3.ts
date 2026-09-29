import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch16_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch16_p3',
    title: 'साखी · Part 3/3',
    subtitle: 'यह नोड **केवल** कबीर की साखियों के **आशय-स्पष्टीकरण और विश्लेषण लेखन कौशल** पर केंद्रित.',
    classLevel: 10, subject: 'hin_sp', topic: 'साखी · Part 3/3',
    chapters: ['c10_hin_sp_ch16'],
    nodeIds: ['c10_hin_sp_cbse_16_013', 'c10_hin_sp_cbse_16_014', 'c10_hin_sp_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'स्पर्श भाग-2 — पाठ 16\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'साखी — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'स्पर्श भाग-2 — पाठ 16\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['साखी — आशय-स्पष्टीकरण और', 'साखी — परीक्षा-उत्तर लेखन', 'साखी — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_16_014', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['पहले दोहे का विषय एक वाक्य में।', 'फिर उसका भाव — कबीर क्या कह रहे हैं।', 'फिर संदेश — आज के लिए क्या मान्य।', 'तीनों को जोड़कर छोटा पैरा — प्रश्न के अनुरूप।'], answer: 'पहले दोहे का विषय एक वाक्य में। फिर उसका भाव — कबीर क्या कह रहे हैं। फिर संदेश — आज के लिए क्या मान्य। तीनों को जोड़कर छोटा पैरा — प्रश्न के अनुरूप।' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'You finished साखी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_013', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 16\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_16_002 (भावार्थ)** और **c10_hin_sp_cbse_16_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + एक-दो प्रतीक**। वे **प्रसंग (कौन, किससे, कब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 16\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'स्पर्श भाग-2 — पाठ 16\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = संत कबीरदास का जीवन-दर्शन, निर्गुण भक्ति-शाखा', '\'स्पर्श भाग-2 — पाठ 16\' का कथानक — \'स्पर्श भाग-2 — पाठ 16\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 16\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_16_002 (भावार्थ)** और **c10_hin_sp_cbse_16_007 (प्रतीक/बिंब)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + एक-दो प्रतीक**। वे **प्रसंग (कौन, किससे, कब, क्यों)** और **केंद्रीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल उत्तर दिखाएँ:** बोर्ड के **नमूना उत्तर (Sample Answer)** और **टॉपर उत्तर** साथ रखें — अंतर चिह्नित करें (प्रसंग.', '**टेम्पलेट दें:** एक **4-कॉलम शीट** दें: पंक्ति | प्रसंग | गूढ़ार्थ+प्रतीक | केंद्रीय भाव/अलंकार — 5 साखियों पर अभ्यास.', '**लाइव मॉडलिंग:** कक्षा में एक पंक्ति लें, **सोचते हुए बोलकर** चारों चरण लिखें — छात्र देखें कि शिक्षक **कैसे सोचता.', '**पीयर रिव्यू:** छात्र एक-दूसरे के उत्तर जाँचें — **चेकलिस्ट** दें: "क्या प्रसंग है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_014', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 16\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि छात्र फंसें तो c10_hin_sp_cbse_16_004 (साखी — केंद्रीय भाव और रस) और.',
          misconception: 'छात्र अक्सर साखी के उत्तर में केवल कविता की भावधारा लिख देते हैं (जैसे "शांति दिखाती है") लेकिन प्रश्न के विशिष्ट घटक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 16\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'स्पर्श भाग-2 — पाठ 16\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = संत कबीरदास का जीवन-दर्शन, निर्गुण भक्ति-शाखा', '\'स्पर्श भाग-2 — पाठ 16\' का कथानक — \'स्पर्श भाग-2 — पाठ 16\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 16\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि छात्र फंसें तो c10_hin_sp_cbse_16_004 (साखी — केंद्रीय भाव और रस) और c10_hin_sp_cbse_16_006.',
                  misconception: 'छात्र अक्सर साखी के उत्तर में केवल कविता की भावधारा लिख देते हैं (जैसे "शांति दिखाती है") लेकिन प्रश्न के विशिष्ट घटक (जैसे अलंकार की पहचान.' }
          ],
            remediations: { 'effect': { steps: ['छात्र को दिखाइए कि एक प्रश्न के सभी घटकों को कैसे पहचाना जाए: पहले प्रश्न को शब्द-शब्द तोड़िए (जैसे "रूपक अलंकार".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_015', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 16\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_16_002 (भावार्थ) और c10_hin_sp_cbse_16_007.',
          misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा\' का अर्थ \'शिक्षक के प्रश्नों का उत्तर देना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 16\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'स्पर्श भाग-2 — पाठ 16\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = संत कबीरदास का जीवन-दर्शन, निर्गुण भक्ति-शाखा', '\'स्पर्श भाग-2 — पाठ 16\' का कथानक — \'स्पर्श भाग-2 — पाठ 16\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 16\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_16_002 (भावार्थ) और c10_hin_sp_cbse_16_007 (प्रतीक-बिंब).',
                  misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा\' का अर्थ \'शिक्षक के प्रश्नों का उत्तर देना\' है। वास्तव में वाचन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी से कहो — \'पद को तीन तरह से पढ़ो: (क) केवल शब्द, (ख) अर्थ पर बल देकर, (ग) भाव में डूबकर। अंतर महसूस.', 'क्यों?\' चरण 3: चर्चा के लिए \'प्रश्न-त्रिकोण\' दो — शब्दार्थ, भावार्थ, प्रसंगिकता — और कहो: \'प्रत्येक कोने से एक प्रश्न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
