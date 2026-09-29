import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p1: SimDef = {
    id: 'v3_c6_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड केवल लेखक-परिचय और विधा (संस्मरण) तक सीमित है — कथा-विवरण अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_001', 'c6_hin_cbse_02_002', 'c6_hin_cbse_02_003', 'c6_hin_cbse_02_004', 'c6_hin_cbse_02_005', 'c6_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कवि-परिचय: ध्यानचंद (1905, प्रयाग) — साधारण परिवार, 16 साल में \'फर्स्ट ब्राह्मण रेजिमेंट\' में सिपाही, हॉकी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'मेजर ध्यानचंद (1905–1979) — भारत के महानतम हॉकी खिलाड़ी, \'हॉकी का जादूगर\'; 1936 बर्लिन ओलंपिक में भारतीय टीम के कप्तान, स्वर्ण पदक विजेता। \'गोल\' उनका आत्मकथात्मक संस्मरण है — 1933 की एक घटना और उनके.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम.', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_001', difficulty: 'standard',
          question: 'मेजर ध्यानचंद (1905–1979) — भारत के महानतम हॉकी खिलाड़ी, \'हॉकी का जादूगर\'; 1936.',
          hint: 'यदि अटका हुआ महसूस हो तो: ध्यानचंद के 4 जीवन-तथ्य लिखिए — जन्म, रेजिमेंट, उपाधि, ओलंपिक.',
          misconception: '1. छात्र \'गोल\' को केवल \'गोल मारना\' मानते हैं — आत्मकथा में \'गोल\' की दोहरी परतें हैं: वह 1933 मैच (छह गोल) और जीवन का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मेजर ध्यानचंद (1905–1979)',
                  options: ['मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम', 'मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर खेल से'],
                  hint: 'यदि अटका हुआ महसूस हो तो: ध्यानचंद के 4 जीवन-तथ्य लिखिए — जन्म, रेजिमेंट, उपाधि, ओलंपिक; क्रम से।',
                  misconception: '1. छात्र \'गोल\' को केवल \'गोल मारना\' मानते हैं — आत्मकथा में \'गोल\' की दोहरी परतें हैं: वह 1933 मैच (छह गोल) और जीवन का लक्ष्य। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) ध्यानचंद के जीवन-तथ्य लिखवाओ — 1905 प्रयाग, 16 साल रेजिमेंट, 1936 ओलंपिक। (2) संस्मरण बनाम कहानी का अंतर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_002', difficulty: 'standard',
          question: 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच.',
          hint: 'यदि अटका हुआ महसूस हो तो: दो भागों को अलग लिखिए — 1933 की घटना और जीवन-यात्रा; क्रम से।',
          misconception: '1. छात्र \'बदला\' को शारीरिक प्रतिशोध मानते हैं — असली बदला छह गोल था; \'बदला\' का अर्थ ही बदल जाता है कथा में। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी',
                  options: ['कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'मेजर ध्यानचंद (1905–1979)', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम', 'मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर खेल से'],
                  hint: 'यदि अटका हुआ महसूस हो तो: दो भागों को अलग लिखिए — 1933 की घटना और जीवन-यात्रा; क्रम से।',
                  misconception: '1. छात्र \'बदला\' को शारीरिक प्रतिशोध मानते हैं — असली बदला छह गोल था; \'बदला\' का अर्थ ही बदल जाता है कथा में। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) दो भागों को अलग करो — 1933 घटना बनाम जीवन-यात्रा। (2) \'बदला\' का दोहरा अर्थ समझाओ — धमकी बनाम गोल। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_003', difficulty: 'standard',
          question: 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब.',
          hint: 'यदि अटका हुआ महसूस हो तो: 1933 की घटना का स्थान (मैदान) और जीवन-यात्रा के 4 स्थान.',
          misconception: '1. छात्र \'प्रयाग\' को \'झाँसी\' मानते हैं — जन्म प्रयाग में, बसने का स्थान झाँसी; दोनों अलग शहर। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम',
                  options: ['परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर खेल से'],
                  hint: 'यदि अटका हुआ महसूस हो तो: 1933 की घटना का स्थान (मैदान) और जीवन-यात्रा के 4 स्थान (प्रयाग, झाँसी.',
                  misconception: '1. छात्र \'प्रयाग\' को \'झाँसी\' मानते हैं — जन्म प्रयाग में, बसने का स्थान झाँसी; दोनों अलग शहर। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) दो परिवेश अलग करो — 1933 मैदान बनाम जीवन-यात्रा। (2) \'रेजिमेंट\' और \'छावनी\' का अर्थ बताओ। (3) 1933 बनाम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_004', difficulty: 'standard',
          question: 'मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर.',
          hint: 'यदि अटका हुआ महसूस हो तो: ध्यानचंद के 4 गुण लिखिए, फिर हर गुण की पंक्ति पाठ में खोजिए.',
          misconception: '1. छात्र \'बदला\' की धमकी को \'झूठ\' या \'क्रोध\' मानते हैं — यह रणनीतिक शब्द था; मनोवैज्ञानिक दबाव, असली बदला खेल से। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर खेल से',
                  options: ['मुख्य पात्र — मेजर ध्यानचंद स्वयं: चोट खाकर भी टूटे नहीं, \'बदला\' की धमकी दी पर खेल से', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: ध्यानचंद के 4 गुण लिखिए, फिर हर गुण की पंक्ति पाठ में खोजिए — चरित्र तब.',
                  misconception: '1. छात्र \'बदला\' की धमकी को \'झूठ\' या \'क्रोध\' मानते हैं — यह रणनीतिक शब्द था; मनोवैज्ञानिक दबाव, असली बदला खेल से। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) ध्यानचंद के 4 गुण सूची बनवाओ — साहस, संयम, कौशल, क्षमा। (2) हर गुण की पंक्ति खोजो। (3) \'बदला\' का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र — प्रतिपक्षी खिलाड़ी (गुस्सैल, स्टिक मारने वाला, फिर घबराने वाला.',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रतिपक्षी के 3 भाव-चरण लिखिए — गुस्सा, घबराहट, शर्म; फिर नायक.',
          misconception: '1. छात्र \'सुबेदार मेजर तिवारी\' को \'कोच\' मानते हैं — सेना का अधिकारी/गुरु थे; \'कोच\' आधुनिक शब्द, पर भूमिका प्रोत्साहन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र — प्रतिपक्षी खिलाड़ी (गुस्सैल, स्टिक मारने वाला, फिर घबराने वाला, अंत में',
                  options: ['सहायक पात्र — प्रतिपक्षी खिलाड़ी (गुस्सैल, स्टिक मारने वाला, फिर घबराने वाला, अंत में', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रतिपक्षी के 3 भाव-चरण लिखिए — गुस्सा, घबराहट, शर्म; फिर नायक से तुलना।',
                  misconception: '1. छात्र \'सुबेदार मेजर तिवारी\' को \'कोच\' मानते हैं — सेना का अधिकारी/गुरु थे; \'कोच\' आधुनिक शब्द, पर भूमिका प्रोत्साहन की। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) प्रतिपक्षी के 3 चरण लिखवाओ — गुस्सा, घबराहट, शर्म। (2) \'बदला\' सुनकर घबराहट का मनोवैज्ञानिक कारण बताओ।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_006', difficulty: 'standard',
          question: 'मुख्य विषय — खेल-भावना जीत से ऊपर है: \'मैंने तो अपना बदला ले ही लिया है...',
          hint: 'यदि अटका हुआ महसूस हो तो: अंतिम संवाद (\'दोस्त, खेल में इतना गुस्सा अच्छा नहीं\') पढ़िए.',
          misconception: '1. छात्र विषय को \'हॉकी-कौशल\' मानते हैं — कौशल माध्यम है; केंद्रीय विषय क्षमा और टीम-भाव है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय — खेल-भावना जीत से ऊपर है: \'मैंने तो अपना बदला ले ही लिया है',
                  options: ['मुख्य विषय — खेल-भावना जीत से ऊपर है: \'मैंने तो अपना बदला ले ही लिया है', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: अंतिम संवाद (\'दोस्त, खेल में इतना गुस्सा अच्छा नहीं\') पढ़िए — विषय वहीं.',
                  misconception: '1. छात्र विषय को \'हॉकी-कौशल\' मानते हैं — कौशल माध्यम है; केंद्रीय विषय क्षमा और टीम-भाव है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'दोस्त, खेल में इतना गुस्सा अच्छा नहीं\' पढ़वाओ — विषय-केंद्र। (2) \'बदला\' का कौशल-अर्थ समझाओ। (3) \'देश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
