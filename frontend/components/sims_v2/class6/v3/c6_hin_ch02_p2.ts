import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p2: SimDef = {
    id: 'v3_c6_hin_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों तक सीमित है — बिंब/विरोध अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_007', 'c6_hin_cbse_02_008', 'c6_hin_cbse_02_009', 'c6_hin_cbse_02_010', 'c6_hin_cbse_02_011', 'c6_hin_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'गौण-मानचित्र: सैन्य-संस्कृति (1933 की कठोरता) → मनोयुद्ध (\'बदला\' से घबराहट) → क्षमा (\'शर्मिंदा\') →.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय — (1) 1933 की सैन्य-संस्कृति (धक्का-मुक्की स्वाभाविक); (2) मनोवैज्ञानिक युद्ध (\'बदला\' की धमकी से प्रतिपक्षी का घबराना); (3) क्षमा की महिमा (\'शर्मिंदा हुआ\'); (4) निस्वार्थता/टीम-भाव (गोल का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — भाषा-प्रयोग — सरल संस्मरण-शैली: प्रथम-पुरुष वर्णन (\'मैं पंजाब रेजिमेंट की ओर से खेला करता.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) वर्ष 1933, पंजाब रेजिमेंट बनाम सैंपर्स एंड.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय — (1) 1933 की सैन्य-संस्कृति (धक्का-मुक्की स्वाभाविक); (2).',
          hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी घटनाएँ जो अलग भाव देती हैं — वही.',
          misconception: '1. छात्र \'बुरा काम करने वाला डरता है\' को \'डर अच्छा है\' मानते हैं — यह अंतरात्मा-सत्य है; बुराई करने वाला अंदर से डरता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय — (1) 1933 की सैन्य-संस्कृति (धक्का-मुक्की स्वाभाविक)',
                  options: ['गौण विषय — (1) 1933 की सैन्य-संस्कृति (धक्का-मुक्की स्वाभाविक)', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी घटनाएँ जो अलग भाव देती हैं — वही गौण विषय।',
                  misconception: '1. छात्र \'बुरा काम करने वाला डरता है\' को \'डर अच्छा है\' मानते हैं — यह अंतरात्मा-सत्य है; बुराई करने वाला अंदर से डरता है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) मुख्य विषय से गौण विषय अलग करो। (2) \'घबराहट\' का मनोवैज्ञानिक कारण बताओ। (3) \'शर्मिंदा\' से क्षमा की महिमा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_008', difficulty: 'standard',
          question: 'बिंब — \'सिर पर हॉकी स्टिक\' (चोट-दृश्य), \'पट्टी बाँधकर मैदान में आना\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दृश्य चुनिए (जैसे पट्टी बाँधकर वापसी), आँखें बंद करके देखिए.',
          misconception: '1. छात्र \'झटपट\' को \'जल्दबाज़ी\' मानते हैं — \'झटपट छह गोल\' = बिना रुके, एक के बाद एक; गति-भाव। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब — \'सिर पर हॉकी स्टिक\' (चोट-दृश्य), \'पट्टी बाँधकर मैदान में आना\' (साहस-दृश्य), \'झटपट',
                  options: ['बिंब — \'सिर पर हॉकी स्टिक\' (चोट-दृश्य), \'पट्टी बाँधकर मैदान में आना\' (साहस-दृश्य), \'झटपट', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दृश्य चुनिए (जैसे पट्टी बाँधकर वापसी), आँखें बंद करके देखिए — भाव आएगा।',
                  misconception: '1. छात्र \'झटपट\' को \'जल्दबाज़ी\' मानते हैं — \'झटपट छह गोल\' = बिना रुके, एक के बाद एक; गति-भाव। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) पाँच बिंब सूची बनवाओ — चोट, पट्टी, गोल, थपथपाहट, श्रेय। (2) हर बिंब का भाव लिखो। (3) दृश्य को क्रम से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_009', difficulty: 'standard',
          question: 'विरोधाभास — \'बदला\' का वादा क्षमा में बदलता है; चोट (हानि) जीत का कारण बनती है.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'बदला\' शब्द की यात्रा लिखिए — पहले धमकी, फिर कौशल, अंत में.',
          misconception: '1. छात्र \'बदला\' को एक ही अर्थ मानते हैं — कथा में \'बदला\' का अर्थ बदलता है: धमकी (प्रतिशोध) → गोल (कौशल-जीत); श्लेष-सा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास — \'बदला\' का वादा क्षमा में बदलता है',
                  options: ['विरोधाभास — \'बदला\' का वादा क्षमा में बदलता है', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'बदला\' शब्द की यात्रा लिखिए — पहले धमकी, फिर कौशल, अंत में क्षमा; विरोध.',
                  misconception: '1. छात्र \'बदला\' को एक ही अर्थ मानते हैं — कथा में \'बदला\' का अर्थ बदलता है: धमकी (प्रतिशोध) → गोल (कौशल-जीत); श्लेष-सा प्रयोग। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) विरोधाभास का अर्थ समझाओ — उलटी बात से सत्य। (2) \'बदला\' की यात्रा दिखाओ — शब्द→कर्म। (3) चोट→जीत का विरोध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_010', difficulty: 'standard',
          question: 'पदावली — मुख्य शब्द: धक्का-मुक्की (टकराव), नोंक-झोंक (नोक-झोंक/बहस-टकराव), झटपट.',
          hint: 'यदि अटका हुआ महसूस हो तो: शब्द को संदर्भ में देखिए — \'रेजिमेंट की ओर से खेला\' = सेना की.',
          misconception: '1. छात्र \'रेजिमेंट\' को \'रेजिमेंट का नाम\' (एक टीम) मानते हैं — रेजिमेंट = सेना-दल; \'फ़र्स्ट ब्राह्मण\' उसमें एक का नाम।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — मुख्य शब्द: धक्का-मुक्की (टकराव), नोंक-झोंक (नोक-झोंक/बहस-टकराव), झटपट (तेज़ी',
                  options: ['पदावली — मुख्य शब्द: धक्का-मुक्की (टकराव), नोंक-झोंक (नोक-झोंक/बहस-टकराव), झटपट (तेज़ी', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: शब्द को संदर्भ में देखिए — \'रेजिमेंट की ओर से खेला\' = सेना की टीम; अर्थ.',
                  misconception: '1. छात्र \'रेजिमेंट\' को \'रेजिमेंट का नाम\' (एक टीम) मानते हैं — रेजिमेंट = सेना-दल; \'फ़र्स्ट ब्राह्मण\' उसमें एक का नाम। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) सैन्य-शब्द (रेजिमेंट, छावनी) का अर्थ बताओ। (2) \'धक्का-मुक्की\' और \'नोंक-झोंक\' का अंतर दिखाओ। (3) संदर्भ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग — सरल संस्मरण-शैली: प्रथम-पुरुष वर्णन (\'मैं पंजाब रेजिमेंट की ओर से.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक संवाद पढ़िए (\'दोस्त, खेल में इतना गुस्सा अच्छा नहीं\'), उसका.',
          misconception: '1. छात्र आत्मकथा की \'मैं\' को \'काल्पनिक नायक\' मानते हैं — \'मैं\' = लेखक स्वयं (ध्यानचंद); सच्ची घटनाएँ। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग — सरल संस्मरण-शैली: प्रथम-पुरुष वर्णन (\'मैं पंजाब रेजिमेंट की ओर से खेला करता',
                  options: ['भाषा-प्रयोग — सरल संस्मरण-शैली: प्रथम-पुरुष वर्णन (\'मैं पंजाब रेजिमेंट की ओर से खेला करता', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक संवाद पढ़िए (\'दोस्त, खेल में इतना गुस्सा अच्छा नहीं\'), उसका भाव बोलिए.',
                  misconception: '1. छात्र आत्मकथा की \'मैं\' को \'काल्पनिक नायक\' मानते हैं — \'मैं\' = लेखक स्वयं (ध्यानचंद); सच्ची घटनाएँ। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) प्रथम-पुरुष और संवाद का प्रभाव दिखाओ। (2) \'दोस्त\' संबोधन का भाव समझाओ। (3) सैन्य-शब्द की सूची बनवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) वर्ष 1933, पंजाब रेजिमेंट बनाम.',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'1933\') पाठ में खोजिए — उत्तर वहीं.',
          misconception: '1. छात्र 1933 और 1936 मिला देते हैं — 1933 = मैच (छह गोल), 1936 = बर्लिन ओलंपिक (स्वर्ण); अलग वर्ष। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न',
                  options: ['वस्तुनिष्ठ प्रश्न', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'1933\') पाठ में खोजिए — उत्तर वहीं है।',
                  misconception: '1. छात्र 1933 और 1936 मिला देते हैं — 1933 = मैच (छह गोल), 1936 = बर्लिन ओलंपिक (स्वर्ण); अलग वर्ष। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) तथ्य-प्रश्न पाठ से निकलवाओ। (2) 1933/1936 का अंतर समझाओ। (3) \'रेजिमेंट\' और \'छावनी\' का अर्थ बताओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
