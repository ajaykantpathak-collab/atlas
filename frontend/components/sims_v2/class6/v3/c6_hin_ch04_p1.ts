import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p1: SimDef = {
    id: 'v3_c6_hin_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड केवल लेखक-परिचय तक सीमित है — कथा-विवरण अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_001', 'c6_hin_cbse_04_002', 'c6_hin_cbse_04_003', 'c6_hin_cbse_04_004', 'c6_hin_cbse_04_005', 'c6_hin_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'लेखक-परिचय: प्रेमचंद (1880–1936) — हिंदी-उर्दू के महान कथाकार; विषय — समाज, गरीबी, मानवता; रचनाएँ — \'गोदान\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'मुंशी प्रेमचंद (1880–1936) — हिंदी के महानतम कथाकार; समाज, मानवता और नैतिकता की कहानियाँ (\'गोदान\', \'इदगाह\', \'पूस की रात\')। \'हार की जीत\' उनकी प्रसिद्ध कहानी — साधु बाबा भारती और डाकू खड्गसिंह के बीच.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\'); डाकू.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ.', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_001', difficulty: 'standard',
          question: 'मुंशी प्रेमचंद (1880–1936) — हिंदी के महानतम कथाकार; समाज, मानवता और नैतिकता की.',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रेमचंद के 3 तथ्य लिखिए — नाम, काल, एक रचना; फिर दो पात्रों का.',
          misconception: 'छात्र \'हार की जीत\' को \'हारने वाले की जीत\' समझते हैं — यह \'हार के भीतर छिपी जीत\' है; बाबा भारती घोड़ा हारकर भी जीते।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुंशी प्रेमचंद (1880–1936)',
                  options: ['मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ', 'मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं सुलतान के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रेमचंद के 3 तथ्य लिखिए — नाम, काल, एक रचना; फिर दो पात्रों का परिचय।',
                  misconception: 'छात्र \'हार की जीत\' को \'हारने वाले की जीत\' समझते हैं — यह \'हार के भीतर छिपी जीत\' है; बाबा भारती घोड़ा हारकर भी जीते।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) प्रेमचंद-परिचय पढ़वाओ — नाम, काल, विषय। (2) \'हार की जीत\' का अर्थ समझाओ — हार में छिपी जीत। (3) दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_002', difficulty: 'standard',
          question: 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न.',
          hint: 'यदि अटका हुआ महसूस हो तो: कथा के 6 चरण लिखिए — प्रेम, आगमन, चोरी, प्रार्थना, वापसी.',
          misconception: 'छात्र बाबा की प्रार्थना को \'डर\' मानते हैं — वह डर नहीं, दूरदर्शिता थी; लोगों का विश्वास बचाना था, अपनी सुरक्षा नहीं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')',
                  options: ['कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'मुंशी प्रेमचंद (1880–1936)', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ', 'मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं सुलतान के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कथा के 6 चरण लिखिए — प्रेम, आगमन, चोरी, प्रार्थना, वापसी, पुनर्मिलन; क्रम.',
                  misconception: 'छात्र बाबा की प्रार्थना को \'डर\' मानते हैं — वह डर नहीं, दूरदर्शिता थी; लोगों का विश्वास बचाना था, अपनी सुरक्षा नहीं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) कथा के 6 चरण सूची बनवाओ। (2) \'अपाहिज-वेष\' की योजना समझाओ। (3) बाबा की प्रार्थना का उद्देश्य बताओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल.',
          hint: 'यदि अटका हुआ महसूस हो तो: 4 परिवेश-स्थान लिखिए — मंदिर, असतबल, रामावाला, रात; फिर उनका.',
          misconception: 'छात्र \'असतबल\' को \'खेत\' या \'बाड़ा\' समझते हैं — यह घुड़साल है, घोड़े का घर; \'रामावाला\' भी गाँव है, शहर नहीं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ',
                  options: ['पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं सुलतान के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: 4 परिवेश-स्थान लिखिए — मंदिर, असतबल, रामावाला, रात; फिर उनका \'काम\'।',
                  misconception: 'छात्र \'असतबल\' को \'खेत\' या \'बाड़ा\' समझते हैं — यह घुड़साल है, घोड़े का घर; \'रामावाला\' भी गाँव है, शहर नहीं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) परिवेश-स्थानों की सूची बनवाओ — मंदिर, असतबल, संध्या, रामावाला, रात। (2) \'असतबल\' का अर्थ बताओ। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_004', difficulty: 'standard',
          question: 'मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं.',
          hint: 'यदि अटका हुआ महसूस हो तो: बाबा के 4 गुण लिखिए, फिर हर गुण की पंक्ति/कर्म पाठ में खोजिए.',
          misconception: 'छात्र बाबा की प्रार्थना को \'डर\' या \'कमज़ोरी\' मानते हैं — वह दूरदर्शिता थी; उन्होंने अपने घोड़े से ऊपर समाज का विश्वास.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं सुलतान के',
                  options: ['मुख्य पात्र — बाबा भारती: साधु जो घोड़े सुलतान से माता-सा प्रेम करते हैं (\'मैं सुलतान के', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: बाबा के 4 गुण लिखिए, फिर हर गुण की पंक्ति/कर्म पाठ में खोजिए — चरित्र.',
                  misconception: 'छात्र बाबा की प्रार्थना को \'डर\' या \'कमज़ोरी\' मानते हैं — वह दूरदर्शिता थी; उन्होंने अपने घोड़े से ऊपर समाज का विश्वास रखा।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) बाबा के 4 गुण सूची बनवाओ — प्रेम, कर्तव्य, दूरदर्शिता, क्षमा। (2) \'घटना प्रकट न करना\' का उद्देश्य समझाओ।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र — खड्गसिंह (प्रसिद्ध डाकू, प्रारंभ में लालची और हठी, अंत में.',
          hint: 'यदि अटका हुआ महसूस हो तो: खड्गसिंह के 3 चरण लिखिए — लालच, हठ, पश्चाताप; फिर उसके बदलाव का.',
          misconception: 'छात्र खड्गसिंह को \'पूरा बुरा\' मानते हैं — वह परिवर्तन-शील है; बाबा की प्रार्थना ने उसके अंतरात्मा को जगा दिया।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र — खड्गसिंह (प्रसिद्ध डाकू, प्रारंभ में लालची और हठी, अंत में पश्चातापी —',
                  options: ['सहायक पात्र — खड्गसिंह (प्रसिद्ध डाकू, प्रारंभ में लालची और हठी, अंत में पश्चातापी —', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: खड्गसिंह के 3 चरण लिखिए — लालच, हठ, पश्चाताप; फिर उसके बदलाव का कारण।',
                  misconception: 'छात्र खड्गसिंह को \'पूरा बुरा\' मानते हैं — वह परिवर्तन-शील है; बाबा की प्रार्थना ने उसके अंतरात्मा को जगा दिया।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) खड्गसिंह के 3 चरण लिखवाओ — लालच, हठ, पश्चाताप। (2) \'ऊँचे विचार\' वाली पंक्ति पढ़वाओ। (3) सुलतान की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय — विश्वास और करुणा की जीत: बाबा भारती घोड़ा हारकर भी जीते — उनकी.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'घटना प्रकट न करना\' पढ़िए — विषय वहीं है; विश्वास बचाने की.',
          misconception: 'छात्र विषय को \'घोड़े की कहानी\' मानते हैं — असली विषय विश्वास-करुणा की जीत है; घोड़ा माध्यम है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय — विश्वास और करुणा की जीत: बाबा भारती घोड़ा हारकर भी जीते — उनकी क्षमा और',
                  options: ['मुख्य विषय — विश्वास और करुणा की जीत: बाबा भारती घोड़ा हारकर भी जीते — उनकी क्षमा और', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'घटना प्रकट न करना\' पढ़िए — विषय वहीं है; विश्वास बचाने की प्रार्थना।',
                  misconception: 'छात्र विषय को \'घोड़े की कहानी\' मानते हैं — असली विषय विश्वास-करुणा की जीत है; घोड़ा माध्यम है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) \'घटना प्रकट न करना\' पढ़वाओ — विषय-केंद्र। (2) \'हार की जीत\' का अर्थ समझाओ। (3) खड्गसिंह का परिवर्तन से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
