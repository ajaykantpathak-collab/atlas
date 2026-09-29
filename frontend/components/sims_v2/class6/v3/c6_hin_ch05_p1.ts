import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p1: SimDef = {
    id: 'v3_c6_hin_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड केवल कवि-परिचय और दोहा-विधा तक सीमित है — दोहों का पाठ अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_001', 'c6_hin_cbse_05_002', 'c6_hin_cbse_05_003', 'c6_hin_cbse_05_004', 'c6_hin_cbse_05_005', 'c6_hin_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कवि-परिचय: रहीम दास (1556–1627) — अकबर का नवरत्न, \'रहीम\' उपनाम; दोहा-विधा — दो पंक्तियों में गहरी सीख; विषय.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627) — अकबर के नौ रत्नों में से एक, सुलेमान वंश के सरदार; \'रहीम\' उपनाम से हिंदी दोहों के प्रसिद्ध कवि। उनके दोहे जीवन-ज्ञान, साधना और नीति से भरे हैं — \'रहिम.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो; (2).', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे; सुई.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_001', difficulty: 'standard',
          question: 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627) — अकबर के नौ रत्नों में से एक.',
          hint: 'यदि अटका हुआ महसूस हो तो: रहीम के 3 तथ्य लिखिए — नाम, काल, दरबार; \'दोहा\' की परिभाषा लिखिए।',
          misconception: 'छात्र \'दोहा\' को \'दोहराना\' मानते हैं — \'दोहा\' छंद है जिसकी पहली पंक्ति उल्टी होती है; \'दोहराना\' से अलग।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)',
                  options: ['रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे', 'मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि'],
                  hint: 'यदि अटका हुआ महसूस हो तो: रहीम के 3 तथ्य लिखिए — नाम, काल, दरबार; \'दोहा\' की परिभाषा लिखिए।',
                  misconception: 'छात्र \'दोहा\' को \'दोहराना\' मानते हैं — \'दोहा\' छंद है जिसकी पहली पंक्ति उल्टी होती है; \'दोहराना\' से अलग।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) रहीम-परिचय पढ़वाओ — नाम, काल, दरबार। (2) \'दोहा\' की संरचना बताओ — दो पंक्तियाँ, उल्टी-सीधी। (3) \'रहिमन\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_002', difficulty: 'standard',
          question: 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा उठाइए, उसके 3 शब्दों का अर्थ लिखिए, फिर भाव जोड़िए.',
          misconception: 'छात्र \'धागा प्रेम का\' को \'सूत\' या \'रस्सी\' समझते हैं — यह प्रेम-बंधन का प्रतीक है; टूटने पर फिर नहीं जुड़ता।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो',
                  options: ['दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे', 'मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा उठाइए, उसके 3 शब्दों का अर्थ लिखिए, फिर भाव जोड़िए — दोहा-पद्धति।',
                  misconception: 'छात्र \'धागा प्रेम का\' को \'सूत\' या \'रस्सी\' समझते हैं — यह प्रेम-बंधन का प्रतीक है; टूटने पर फिर नहीं जुड़ता।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) 7 दोहे क्रम से पढ़वाओ। (2) कठिन शब्द (बडेन, कसौटि, तरुवर, सरवर, जिह्वा, सगुन) का अर्थ लिखवाओ। (3) हर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न.',
          hint: 'यदि अटका हुआ महसूस हो तो: दो प्रतीक लिखिए — एक दरबारी (बडेन), एक लोक (सुई); फिर उनका.',
          misconception: 'छात्र \'कसौटि\' को \'पत्थर\' मानते हैं — यह सोने को परखने का औज़ार है; \'लघु कसौटि\' = छोटी परीक्षा।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे',
                  options: ['पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि'],
                  hint: 'यदि अटका हुआ महसूस हो तो: दो प्रतीक लिखिए — एक दरबारी (बडेन), एक लोक (सुई); फिर उनका \'काम\'।',
                  misconception: 'छात्र \'कसौटि\' को \'पत्थर\' मानते हैं — यह सोने को परखने का औज़ार है; \'लघु कसौटि\' = छोटी परीक्षा।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) दो परिवेश अलग करो — दरबारी बनाम लोक-जीवन। (2) \'कसौटि\' का अर्थ बताओ — परीक्षण-औज़ार। (3) प्रतीकों को उनके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_004', difficulty: 'standard',
          question: 'मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि; दरबारी.',
          hint: 'यदि अटका हुआ महसूस हो तो: रहीम के 3 गुण लिखिए, फिर हर गुण का प्रमाण दोहे में खोजिए.',
          misconception: 'छात्र \'रहिमन\' को \'पूरा नाम\' मानते हैं — यह \'हे रहीम\' का आत्म-संबोधन है; कवि पहले स्वयं को सीख देता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि',
                  options: ['मुख्य \'पात्र\' — रहीम स्वयं: \'रहिमन\' कहकर स्वयं को संबोधित करने वाले कवि', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: रहीम के 3 गुण लिखिए, फिर हर गुण का प्रमाण दोहे में खोजिए — \'रहिमन\'.',
                  misconception: 'छात्र \'रहिमन\' को \'पूरा नाम\' मानते हैं — यह \'हे रहीम\' का आत्म-संबोधन है; कवि पहले स्वयं को सीख देता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) रहीम के 3 गुण सूची बनवाओ — नीति-ज्ञान, आत्म-संबोधन, आशावाद। (2) \'रहिमन\' का भाव समझाओ — \'हे रहीम\'। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_005', difficulty: 'standard',
          question: 'सहायक प्रतीक — तरुवर (पेड़ — निस्वार्थ सेवा), सरवर (तालाब — निस्वार्थ), धागा.',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन प्रतीक लिखिए — तरुवर, धागा, सुई; फिर हर एक का \'काम\' (नीति).',
          misconception: 'छात्र \'सुई\' को \'केवल सुई\' मानते हैं — यहाँ सुई = कुशलता का प्रतीक; \'जहाँ काम आवे सुई\' = सही औज़ार।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक प्रतीक — तरुवर (पेड़ — निस्वार्थ सेवा), सरवर (तालाब — निस्वार्थ), धागा (प्रेम-बंधन',
                  options: ['सहायक प्रतीक — तरुवर (पेड़ — निस्वार्थ सेवा), सरवर (तालाब — निस्वार्थ), धागा (प्रेम-बंधन', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन प्रतीक लिखिए — तरुवर, धागा, सुई; फिर हर एक का \'काम\' (नीति) लिखिए।',
                  misconception: 'छात्र \'सुई\' को \'केवल सुई\' मानते हैं — यहाँ सुई = कुशलता का प्रतीक; \'जहाँ काम आवे सुई\' = सही औज़ार।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) सहायक प्रतीकों की सूची बनवाओ — तरुवर, धागा, सुई, कसौटि, जिह्वा। (2) हर प्रतीक का \'काम\' लिखो। (3) \'सुई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_006', difficulty: 'standard',
          question: 'मुख्य विषय — जीवन-नीति का समग्र ज्ञान: 7 दोहे मिलकर जीवन-कला सिखाते हैं.',
          hint: 'यदि अटका हुआ महसूस हो तो: 7 दोहों का सूत्र लिखिए — हर दोहे का एक शब्द (सम्मान.',
          misconception: 'छात्र विषय को \'केवल नीति\' या \'केवल प्रेम\' मानते हैं — असली विषय जीवन-नीति का समग्र ज्ञान है; 7 दोहे मिलकर जीवन-कला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय — जीवन-नीति का समग्र ज्ञान: 7 दोहे मिलकर जीवन-कला सिखाते हैं — महानता की',
                  options: ['मुख्य विषय — जीवन-नीति का समग्र ज्ञान: 7 दोहे मिलकर जीवन-कला सिखाते हैं — महानता की', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: 7 दोहों का सूत्र लिखिए — हर दोहे का एक शब्द (सम्मान, निस्वार्थ...); समग्र.',
                  misconception: 'छात्र विषय को \'केवल नीति\' या \'केवल प्रेम\' मानते हैं — असली विषय जीवन-नीति का समग्र ज्ञान है; 7 दोहे मिलकर जीवन-कला सिखाते हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) 7 दोहों का सूत्र लिखवाओ — सम्मान, निस्वार्थ, संबंध, कुशलता, संरक्षण, वाणी, आशावाद। (2) \'तरुवर\' से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
