import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch18_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch18_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch18_p3',
    title: 'मनुष्यता · Part 3/3',
    subtitle: 'इस नोड में **केवल** \'मनुष्यता\' कविता के पद्यांशों पर आधारित आशय-स्पष्टीकरण लेखन का अभ्यास.',
    classLevel: 10, subject: 'hin_sp', topic: 'मनुष्यता · Part 3/3',
    chapters: ['c10_hin_sp_ch18'],
    nodeIds: ['c10_hin_sp_cbse_18_013', 'c10_hin_sp_cbse_18_014', 'c10_hin_sp_cbse_18_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'अर्थ लिखिए\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'मनुष्यता — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'अर्थ लिखिए\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_18_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मनुष्यता — आशय-स्पष्टीकरण और', 'मनुष्यता — परीक्षा-उत्तर लेखन', 'मनुष्यता — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_18_015', title: 'You made it',
          caseStudy: { intro: 'You finished मनुष्यता — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_013', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_18_002 (भावार्थ)** और **c10_hin_sp_cbse_18_006/007.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि आशय-स्पष्टीकरण में **\'कठिन शब्दों के अर्थ\' लिखना ही काफी है**। वे प्रसंग नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' का आलोचनात्मक चिंतन',
                  options: ['\'अर्थ लिखिए\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_18_002 (भावार्थ)** और **c10_hin_sp_cbse_18_006/007.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि आशय-स्पष्टीकरण में **\'कठिन शब्दों के अर्थ\' लिखना ही काफी है**। वे प्रसंग नहीं देते, अलंकार/बिंब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** विद्यार्थी को एक छोटा पद्यांश दें और केवल **प्रसंग पहचानने** को कहें — "यह कविता के किस भाग से है?', 'पहले/मध्य/अंत?" — जब तक वह 3/3 सही न करे। 2.', '**दूसरा कदम:** उसी पद्यांश पर **कथन लिखवाएँ** — "सरल भाषा में बताओ कवि क्या कह रहा है?" — शब्दार्थ न लिखने दें। 3.', '**तीसरा कदम:** **एक अलंकार/बिंब चुनकर** उसकी भूमिका समझाएँ — "यहाँ \'ज्योति\' क्यों आई?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_014', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँसें तो c10_hin_sp_cbse_18_008 (मुख्य भाव) और c10_hin_sp_cbse_18_013.',
          misconception: 'विद्यार्थी समझते हैं कि \'उत्तर लिखना\' = \'पाठ्य-पुस्तक की पंक्तियाँ नकल करना\' या \'रटे हुए वाक्य लिखना\'। वास्तव में बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' पर पाठ-आधारित लेखन',
                  options: ['\'अर्थ लिखिए\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c10_hin_sp_cbse_18_008 (मुख्य भाव) और c10_hin_sp_cbse_18_013 (आशय-स्पष्टीकरण) दोहराएं.',
                  misconception: 'विद्यार्थी समझते हैं कि \'उत्तर लिखना\' = \'पाठ्य-पुस्तक की पंक्तियाँ नकल करना\' या \'रटे हुए वाक्य लिखना\'। वास्तव में बोर्ड परीक्षक PEEL ढांचे.' }
          ],
            remediations: { 'peel-5-3-1': { steps: ['चरण 1: विद्यार्थी को एक कमजोर उत्तर (केवल पंक्तियाँ नकल) और एक सशक्त उत्तर (PEEL) साथ रखकर दिखाएं — अंतर स्पष्ट करें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_015', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि अटका हुआ लगे: c10_hin_sp_cbse_18_002 (भावार्थ) और c10_hin_sp_cbse_18_004 (केंद्रीय.',
          misconception: 'छात्र समझते हैं कि **वाचन-पाठ = केवल सही उच्चारण** और **चर्चा = शिक्षक के प्रश्नों का उत्तर देना**। वास्तव में: वाचन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'अर्थ लिखिए\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे: c10_hin_sp_cbse_18_002 (भावार्थ) और c10_hin_sp_cbse_18_004 (केंद्रीय भाव) को.',
                  misconception: 'छात्र समझते हैं कि **वाचन-पाठ = केवल सही उच्चारण** और **चर्चा = शिक्षक के प्रश्नों का उत्तर देना**। वास्तव में: वाचन में **भाव-लय-विराम**.' }
          ],
            remediations: { 'c10-hin-sp-cbse-18': { steps: ['छात्र को **कविता की ऑडियो रिकॉर्डिंग** (NCERT/शिक्षक की) सुनवाओ — उसे **लय-भाव** का अंतर महसूस कराओ। 2.', 'उसे **एक पद्यांश का मौन पाठ** कराकर **तीन प्रश्न लिखने** को कहो — "क्यों?", "कैसे?", "तो क्या?"। 3.', 'कक्षा में **सोच-विचार जोड़ी (Think-Pair-Share)** कराओ: साथी के साथ चर्चा कर फिर पूरे वर्ग में साझा करो। 4.', 'अंत में **स्व-मूल्यांकन चेकलिस्ट** दो: "क्या मैंने लय पकड़ी?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
