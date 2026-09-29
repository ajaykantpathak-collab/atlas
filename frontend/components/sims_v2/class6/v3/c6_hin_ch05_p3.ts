import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p3: SimDef = {
    id: 'v3_c6_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक चिंतन तक सीमित है — लेखन/चर्चा अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_013', 'c6_hin_cbse_05_014', 'c6_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'विश्लेषण: (1) शक्ति — दो पंक्तियों में पूरी नीति (संक्षिप्त-गहराई); (2) शक्ति — दैनिक प्रतीकों से सीख (तरुवर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन — क्या \'बडेन को लघु कसौटि न करै\' आज की \'मूल्यांकन-संस्कृति\' में प्रासंगिक है? क्या \'तरुवर\' की निस्वार्थ-नीति व्यावहारिक है?', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — लेखन-कौशल — किसी दोहे का भावार्थ लिखना (शब्द-अर्थ + भाव + उदाहरण); अपने जीवन का एक अनुभव.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — वाचन-चर्चा — दोहों को दोहा-लय में वाचन; \'मिलकर करें मिलान\' (दोहे को नीति से जोड़ना.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन — क्या \'बडेन को लघु कसौटि न करै\' आज की \'मूल्यांकन-संस्कृति\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा जो आपको अच्छा लगा (शक्ति) और एक जो अति-आदर्श लगा (सीमा).',
          misconception: 'छात्र दोहों को \'पुरानी नीति\' कहकर खारिज कर देते हैं — नीति कालातीत है; भाषा पुरानी पर सीख आज भी प्रासंगिक।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन',
                  options: ['आलोचनात्मक चिंतन', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा जो आपको अच्छा लगा (शक्ति) और एक जो अति-आदर्श लगा (सीमा) — दोनों.',
                  misconception: 'छात्र दोहों को \'पुरानी नीति\' कहकर खारिज कर देते हैं — नीति कालातीत है; भाषा पुरानी पर सीख आज भी प्रासंगिक।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) \'आलोचना\' का अर्थ समझाओ — शक्ति + सीमा। (2) \'तरुवर\' की निस्वार्थ-नीति को आदर्श बनाम व्यावहारिक से देखो।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_014', difficulty: 'standard',
          question: 'लेखन-कौशल — किसी दोहे का भावार्थ लिखना (शब्द-अर्थ + भाव + उदाहरण); अपने जीवन का.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए.',
          misconception: 'छात्र भावार्थ में दोहा दोहरा देते हैं — भावार्थ = शब्द-अर्थ + कवि का आशय + अपना उदाहरण; केवल उद्धरण भावार्थ नहीं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-कौशल — किसी दोहे का भावार्थ लिखना (शब्द-अर्थ + भाव + उदाहरण)',
                  options: ['लेखन-कौशल — किसी दोहे का भावार्थ लिखना (शब्द-अर्थ + भाव + उदाहरण)', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए — भावार्थ.',
                  misconception: 'छात्र भावार्थ में दोहा दोहरा देते हैं — भावार्थ = शब्द-अर्थ + कवि का आशय + अपना उदाहरण; केवल उद्धरण भावार्थ नहीं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) भावार्थ-विधि समझाओ — शब्द→अर्थ→भाव→उदाहरण। (2) एक दोहे का भावार्थ साथ लिखो। (3) \'चाबी\' या \'दीया\' से नया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-चर्चा — दोहों को दोहा-लय में वाचन; \'मिलकर करें मिलान\' (दोहे को नीति से.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, ताली से लय बजाइए — \'तरुवर\' से \'निस्वार्थ\' का.',
          misconception: 'छात्र \'रहिमन\' को \'केवल नाम\' मानते हैं — यह \'हे रहीम\' का आत्म-संबोधन है; कवि पहले स्वयं को सीख देता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा — दोहों को दोहा-लय में वाचन',
                  options: ['वाचन-चर्चा — दोहों को दोहा-लय में वाचन', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, ताली से लय बजाइए — \'तरुवर\' से \'निस्वार्थ\' का मिलान कीजिए.',
                  misconception: 'छात्र \'रहिमन\' को \'केवल नाम\' मानते हैं — यह \'हे रहीम\' का आत्म-संबोधन है; कवि पहले स्वयं को सीख देता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) चर्चा-नियम समझाओ — सुनो, प्रमाण दो, सम्मान करो। (2) \'रहिमन\' का आत्म-संबोधन बताओ। (3) \'तरुवर\' से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
