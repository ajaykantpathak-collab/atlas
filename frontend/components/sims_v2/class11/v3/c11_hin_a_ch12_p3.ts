import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch12_p3: SimDef = {
    id: 'v3_c11_hin_a_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'अंतरा\' भाग 1 के पाठ 12 के संदर्भ में आलोचनात्मक विश्लेषण और व्याख्या.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c11_hin_a_ch12'],
    nodeIds: ['c11_hin_a_cbse_12_013', 'c11_hin_a_cbse_12_014', 'c11_hin_a_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'क्या हुआ\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'क्या हुआ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — आलोचनात्मक', 'पाठ 12 — लेखन', 'पाठ 12 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'क्या हुआ\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'क्या हुआ\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_12_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_013', difficulty: 'standard',
          question: '\'क्या हुआ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_12_008 (बिंब और रूपक) और c11_hin_a_cbse_12_011.',
          misconception: 'छात्र प्रायः मानते हैं कि आलोचनात्मक चिंतन = \'दोष निकालना\' (Fault-finding) या \'नकारात्मक टिप्पणी करना\'। इसके विपरीत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' का आलोचनात्मक चिंतन',
                  options: ['\'क्या हुआ\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_12_008 (बिंब और रूपक) और c11_hin_a_cbse_12_011.',
                  misconception: 'छात्र प्रायः मानते हैं कि आलोचनात्मक चिंतन = \'दोष निकालना\' (Fault-finding) या \'नकारात्मक टिप्पणी करना\'। इसके विपरीत, आलोचनात्मक चिंतन का.' }
          ],
            remediations: { 'fault-finding': { steps: ['**सूक्ष्म पाठ (Close Reading) का दैनिक अभ्यास:** छात्र को रोज़ पाठ की 3-4 पंक्तियाँ देकर केवल *एक* भाषिक विशेषता (जैसे.', '**PEEL ढाँचे का जबरन उपयोग:** हर उत्तर PEEL शीर्षकों के साथ लिखवाएँ, भले ही कच्चा हो; धीरे-धीरे शीर्षक हटाएँ, संरचना रह.', '**प्रतिप्रश्न तकनीक (Counter-Questioning):** छात्र के हर कथन पर पूछें — "पाठ में इसकी क्या निशानी है?" "यदि लेखक इसके.', '**तुलनात्मक विश्लेषण:** उसी विषय पर दो लेखकों के अंश देकर पूछें — "दोनों ने दुख दिखाया, पर *ढंग* कैसे भिन्न है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_014', difficulty: 'standard',
          question: '\'क्या हुआ\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटका हुआ महसूस हो तो: पहले c11_hin_a_cbse_12_006 (मुख्य विषय) और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ से उद्धरण देना" (quoting) ही Evidence है, और उद्धरण जितना लंबा होगा, उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' पर पाठ-आधारित लेखन',
                  options: ['\'क्या हुआ\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: पहले c11_hin_a_cbse_12_006 (मुख्य विषय) और c11_hin_a_cbse_12_004 (नायक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ से उद्धरण देना" (quoting) ही Evidence है, और उद्धरण जितना लंबा होगा, उत्तर उतना अच्छा।.' }
          ],
            remediations: { 'quoting-evidence': { steps: ['**मॉडलिंग दिखाएँ:** एक ही प्रश्न के दो उत्तर साथ रखें — एक \'पाठ-चिपकाने वाला\' (C-grade), एक \'PEEL-विश्लेषणात्मक\'.', '**माइक्रो-अभ्यास कराएँ:** केवल Evidence एम्बेड करने का अभ्यास दें — दें: Point + कच्चा उद्धरण → छात्र लिखे: एम्बेडेड.', '**रंग-कोडिंग कराएँ:** छात्र अपने उत्तर में Point (लाल), Evidence (नीला), Explanation (हरा), Link (पीला) हाइलाइट करे.', '**फीडबैक लूप:** प्रत्येक अभ्यास उत्तर पर केवल PEEL-विशिष्ट टिप्पणी दें: "Evidence सटीक है लेकिन Explanation में \'कैसे\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_015', difficulty: 'standard',
          question: '\'क्या हुआ\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
          hint: 'यदि अटकें तो **c11_hin_a_cbse_12_012 (बोध-प्रश्न)** दोहराएँ — वहाँ सीखी गई "पाठ से उत्तर.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"चर्चा-बिंदु = पाठ का सारांश (समरी) बोलना"** — इसलिए वे कथानक दोहराते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'क्या हुआ\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो **c11_hin_a_cbse_12_012 (बोध-प्रश्न)** दोहराएँ — वहाँ सीखी गई "पाठ से उत्तर ढूँढ़ना".',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"चर्चा-बिंदु = पाठ का सारांश (समरी) बोलना"** — इसलिए वे कथानक दोहराते हैं, विश्लेषण नहीं करते। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग**: शिक्षक एक छोटे अंश (५० शब्द) पर **लाइव चर्चा-बिंदु बनाकर दिखाए** — सोचने की प्रक्रिया **वाचाल.', '**संयुक्त अभ्यास**: छात्र जोड़े में **एक ही अंश पर स्वतंत्र बिंदु बनाएँ**, फिर **तुलना करें** — क्या साक्ष्य अलग हैं?', '**चेकलिस्ट स्व-मूल्यांकन**: प्रत्येक बिंदु के लिए ४-प्रश्न चेकलिस्ट दें — (क) क्या पाठ्य साक्ष्य है?', '(घ) क्या प्रतिप्रश्न का उत्तर दे सकते हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
