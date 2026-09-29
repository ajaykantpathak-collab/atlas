import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch08_p3: SimDef = {
    id: 'v3_c11_hin_a_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'इस नोड में **पाठ 8** के कथ्य, शिल्प, भाषा-प्रयोग और अंतर्निहित मान्यताओं का समग्र.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c11_hin_a_ch08'],
    nodeIds: ['c11_hin_a_cbse_08_013', 'c11_hin_a_cbse_08_014', 'c11_hin_a_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'व्यक्तित्व-निर्माण\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'व्यक्तित्व-निर्माण\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'व्यक्तित्व-निर्माण\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'व्यक्तित्व-निर्माण\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_013', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके तो c11_hin_a_cbse_08_008 और c11_hin_a_cbse_08_009 (साहित्यिक युक्तियाँ) पर लौटें.',
          misconception: 'छात्र मानते हैं कि **\'आलोचनात्मक\' = \'नकारात्मक/दोष निकालना\'**। इसलिए वे पाठ की कमियाँ गिनाने लगते हैं (भाषा कठिन है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' का आलोचनात्मक चिंतन',
                  options: ['\'व्यक्तित्व-निर्माण\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_08_008 और c11_hin_a_cbse_08_009 (साहित्यिक युक्तियाँ) पर लौटें.',
                  misconception: 'छात्र मानते हैं कि **\'आलोचनात्मक\' = \'नकारात्मक/दोष निकालना\'**। इसलिए वे पाठ की कमियाँ गिनाने लगते हैं (भाषा कठिन है, कथानक धीमा है) बजाय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शब्द-प्रतिस्थापन अभ्यास:** \'आलोचनात्मक\' के स्थान पर \'विवेचनात्मक\' (analytical) लिखकर 5 वाक्य बनाएँ — इससे.', '**\'क्यों\' की सीढ़ी:** पाठ 8 के किसी एक चयन (शब्द/बिंब/संरचना) पर लगातार 3 बार "लेखक ने *यही* क्यों चुना?" पूछें — तीसरे.', '**साक्ष्य-तर्क-लिंक तालिका:** तीन कॉलम बनाएँ — (साक्ष्य) पाठ का उद्धरण | (तर्क) युक्ति का प्रभाव | (लिंक) विषय से संबंध.', '**पीयर-रिव्यू:** सहपाठी की व्याख्या में \'क्या\' और \'क्यों\' अलग-अलग रंग से रेखांकित करवाएँ — जहाँ \'क्यों\' न हो, वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_014', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review **c11_hin_a_cbse_08_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)**.',
          misconception: '**विशिष्ट भ्रांति:** *"अच्छा उत्तर = पाठ की अधिकतम बातें लिख डालना"* — छात्र मानते हैं कि **लंबाई = गुणवत्ता**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' पर पाठ-आधारित लेखन',
                  options: ['\'व्यक्तित्व-निर्माण\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c11_hin_a_cbse_08_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** — specifically.',
                  misconception: '**विशिष्ट भ्रांति:** *"अच्छा उत्तर = पाठ की अधिकतम बातें लिख डालना"* — छात्र मानते हैं कि **लंबाई = गुणवत्ता**। वे 5-अंकीय उत्तर में पूरी.' }
          ],
            remediations: { '5': { steps: ['**\'क्या vs कैसे\' अभ्यास:** छात्र को 5 प्रश्न दें — प्रत्येक के लिए केवल **\'क्या\' (घटना)** और **\'कैसे\' (विश्लेषण)** दो.', '**PEEL रंग-कोडिंग:** छात्र के पुराने उत्तर लें — Point (लाल), Evidence (नीला), Explanation (हरा), Link (पीला) से.', '**\'एक वाक्य में उत्तर\' ड्रिल:** हर प्रश्न का उत्तर पहले **एक वाक्य** में लिखवाएं (बाध्यकारी विषय-वाक्य), फिर विस्तार.', '**मॉडल उत्तर विच्छेदन:** बोर्ड के टॉपर उत्तर दिखाकर PEEL चरण पहचानने का अभ्यास कराएं — फिर छात्र स्वयं लिखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_015', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_08_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
          misconception: 'छात्र प्रायः मान लेते हैं कि **\'चर्चा-बिंदु = पहले से तैयार उत्तरों की सूची\' (list of ready-made answers)** होती है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'व्यक्तित्व-निर्माण\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_08_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के \'पाठ-विश्लेषण.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि **\'चर्चा-बिंदु = पहले से तैयार उत्तरों की सूची\' (list of ready-made answers)** होती है। वे सोचते हैं: "अगर.' }
          ],
            remediations: { 'list-of-ready-made-answers': { steps: ['**चरण 1 — भ्रम तोड़ें:** छात्र से कहें: "एक मिनट में पाठ-8 का कोई प्रसंग पढ़ो और **केवल 3 \'क्यों\' वाले प्रश्न** लिखो.', 'क्या बोला?" (ब) चर्चा-बिंदु: "नायक ने वापस लौटने का निर्णय कैसे लिया?', 'उसकी चुप्पी क्या कहती है?" — छात्र से पूछें: "कौन-सी सूची बेहतर चर्चा चलाएगी?" **चरण 3 — अभ्यास कराएँ:** नया प्रसंग.', 'क्या श्रवण-उद्देश्य विश्लेषणात्मक हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
