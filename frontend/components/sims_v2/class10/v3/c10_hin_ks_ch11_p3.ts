import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch11_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'यह नोड केवल **पद्यांश-आधारित** आशय-स्पष्टीकरण व विश्लेषण पर केंद्रित है (गद्यांश नहीं).',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c10_hin_ks_ch11'],
    nodeIds: ['c10_hin_ks_cbse_11_013', 'c10_hin_ks_cbse_11_014', 'c10_hin_ks_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'क्षितिज भाग-2 — पाठ 11\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'क्षितिज भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — आशय-स्पष्टीकरण', 'पाठ 11 — परीक्षा-उत्तर', 'पाठ 11 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 11 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_013', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_11_006 (अलंकार) और c10_hin_ks_cbse_11_007 (प्रतीक-बिंब) के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-स्पष्टीकरण\' = \'शब्दार्थ + भावार्थ\' और \'विश्लेषण\' = \'अलंकारों की सूची\'।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'क्षितिज भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 11\' का कथानक — \'क्षितिज भाग-2 — पाठ 11\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_11_006 (अलंकार) और c10_hin_ks_cbse_11_007 (प्रतीक-बिंब) के \'पहचान.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-स्पष्टीकरण\' = \'शब्दार्थ + भावार्थ\' और \'विश्लेषण\' = \'अलंकारों की सूची\'। **क्यों होती है:**.' }
          ],
            remediations: { '9': { steps: ['**मॉडल उत्तर दिखाएँ:** उसी पंक्ति का कमज़ोर उत्तर (केवल पहचान) और सशक्त उत्तर (PEEL+भाव-प्रभाव) साथ रखें; छात्र से अंतर.', '**\'क्यों\' का अभ्यास:** हर पहचानी गई युक्ति के बाद छात्र से पूछें — "इससे पाठक को क्या **महसूस/समझ** होता है?".', '**रंग-कोडिंग:** आशय वाले वाक्य नीले पेन से, विश्लेषण वाले हरे से — दृश्य विभाजन स्पष्ट करेगा कि दोनों भाग अनिवार्य हैं।.', '**समयबद्ध अभ्यास:** 5 मिनट में एक पद्यांश का पूरा उत्तर (आशय+विश्लेषण) लिखवाएँ; फिर मार्किंग स्कीम से स्वयं जँचवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_014', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि छात्र फंस रहा है, तो केंद्रीय भाव और अलंकार की पहचान (नोड्स c10_hin_ks_cbse_11_004 और.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा में उत्तर लिखने का मतलब सिर्फ पाठ से वाक्य दोहराना या युक्तियों के नाम लिखना है, जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'क्षितिज भाग-2 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 11\' का कथानक — \'क्षितिज भाग-2 — पाठ 11\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि छात्र फंस रहा है, तो केंद्रीय भाव और अलंकार की पहचान (नोड्स c10_hin_ks_cbse_11_004 और.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा में उत्तर लिखने का मतलब सिर्फ पाठ से वाक्य दोहराना या युक्तियों के नाम लिखना है, जैसे "उपमा uży गई है" या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर ("कवि ने उपमा का उपयोग किया है") को कैसे PEEL के साथ सुधारा जाए: primero, उनसे पूछिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_015', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_11_004 (केंद्रीय भाव और रस) और c10_hin_ks_cbse_11_005 (छंद और.',
          misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' (loud reading) है और \'चर्चा-बिंदु\' का अर्थ \'कविता का सारांश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'क्षितिज भाग-2 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 11\' का कथानक — \'क्षितिज भाग-2 — पाठ 11\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_11_004 (केंद्रीय भाव और रस) और c10_hin_ks_cbse_11_005 (छंद और लय-विधान).',
                  misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' (loud reading) है और \'चर्चा-बिंदु\' का अर्थ \'कविता का सारांश बताना\'। वे भाव-समन्वय.' }
          ],
            remediations: { 'loud-reading-expression': { steps: ['चरण १: छात्र को कविता का एक पद्यांश तीन तरह से पढ़ने को कहें — (अ) सपाट, (ब) केवल विराम चिह्नों के साथ, (स) पूर्ण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
