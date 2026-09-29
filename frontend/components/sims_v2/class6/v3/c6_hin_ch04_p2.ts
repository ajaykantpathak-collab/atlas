import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p2: SimDef = {
    id: 'v3_c6_hin_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों तक सीमित है — बिंब/विरोध अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_007', 'c6_hin_cbse_04_008', 'c6_hin_cbse_04_009', 'c6_hin_cbse_04_010', 'c6_hin_cbse_04_011', 'c6_hin_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'गौण-मानचित्र: प्रेम (\'बिना रह न सकूँगा\') → मोह-त्याग (सब छोड़ा) → लालच-संतोष (खड्गसिंह-बाबा) → पश्चाताप (रात.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय — (1) प्रेम की निर्भीकता (\'मैं सुलतान के बिना नहीं रह सकूँगा\'); (2) मोह-त्याग (सब कुछ छोड़कर मंदिर में); (3) लालच बनाम संतोष (खड्गसिंह बनाम बाबा); (4) पश्चाताप की शक्ति (रात में वापसी); (5).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — भाषा-प्रयोग — प्रेमचंद की सरल, लोक-हिंदी: तृतीय-पुरुष वर्णन (\'बाबा भारती उसे सुलतान कहकर.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) लेखक प्रेमचंद; (2) बाबा भारती का घोड़ा.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय — (1) प्रेम की निर्भीकता (\'मैं सुलतान के बिना नहीं रह सकूँगा\'); (2).',
          hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी घटनाएँ जो अलग भाव देती हैं — वही.',
          misconception: 'छात्र बाबा के \'सब छोड़ने\' को \'मजबूरी\' मानते हैं — वह मोह-त्याग/वैराग्य था; प्रेम केवल सुलतान पर केंद्रित।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय — (1) प्रेम की निर्भीकता (\'मैं सुलतान के बिना नहीं रह सकूँगा\')',
                  options: ['गौण विषय — (1) प्रेम की निर्भीकता (\'मैं सुलतान के बिना नहीं रह सकूँगा\')', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी घटनाएँ जो अलग भाव देती हैं — वही गौण विषय।',
                  misconception: 'छात्र बाबा के \'सब छोड़ने\' को \'मजबूरी\' मानते हैं — वह मोह-त्याग/वैराग्य था; प्रेम केवल सुलतान पर केंद्रित।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) मुख्य विषय से गौण विषय अलग करो। (2) \'मोह-त्याग\' का अर्थ समझाओ। (3) \'लोग गरीबों पर विश्वास न करेंगे\' का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_008', difficulty: 'standard',
          question: 'बिंब — \'मोर घटा को देखकर नाच रहा हो\' (सुलतान की चाल), \'बकरा कसाई की ओर देखता.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — \'मोर-नाच\' या.',
          misconception: 'छात्र \'साँप लोट गया\' को \'सच्चा साँप\' मानते हैं — यह मानसिक बिंब है; खड्गसिंह के हृदय में लालच का साँप-सा घेराव।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब — \'मोर घटा को देखकर नाच रहा हो\' (सुलतान की चाल), \'बकरा कसाई की ओर देखता है\' (बाबा की',
                  options: ['बिंब — \'मोर घटा को देखकर नाच रहा हो\' (सुलतान की चाल), \'बकरा कसाई की ओर देखता है\' (बाबा की', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — \'मोर-नाच\' या \'बकरा-कसाई\' का दृश्य.',
                  misconception: 'छात्र \'साँप लोट गया\' को \'सच्चा साँप\' मानते हैं — यह मानसिक बिंब है; खड्गसिंह के हृदय में लालच का साँप-सा घेराव।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) पाँच बिंब सूची बनवाओ। (2) \'साँप लोटना\' का मानसिक अर्थ समझाओ। (3) \'बकरा-कसाई\' का भय-भाव दिखाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_009', difficulty: 'standard',
          question: 'विरोधाभास — \'हार की जीत\' (शीर्षक ही विरोध); बाबा घोड़ा हारकर भी जीते; खड्गसिंह.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'हार की जीत\' का दोहरा अर्थ लिखिए — बाबा हारा-जीता, खड्गसिंह.',
          misconception: 'छात्र \'हार की जीत\' को \'हारने वाले की जीत\' समझते हैं — यह \'हार के भीतर छिपी जीत\' है; हारने वाला भी जीत सकता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास — \'हार की जीत\' (शीर्षक ही विरोध)',
                  options: ['विरोधाभास — \'हार की जीत\' (शीर्षक ही विरोध)', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'हार की जीत\' का दोहरा अर्थ लिखिए — बाबा हारा-जीता, खड्गसिंह जीता-हारा.',
                  misconception: 'छात्र \'हार की जीत\' को \'हारने वाले की जीत\' समझते हैं — यह \'हार के भीतर छिपी जीत\' है; हारने वाला भी जीत सकता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) \'हार की जीत\' का दोहरा अर्थ समझाओ। (2) बाबा हारा-जीता और खड्गसिंह जीता-हारा का विरोध दिखाओ। (3) \'बकरा\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_010', difficulty: 'standard',
          question: 'पदावली — मुख्य शब्द: असतबल (घुड़साल), ललचाई (लालसा/इच्छा), खरहरा करना (घोड़े को.',
          hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'असतबल\' = अश्व-स्थल = घुड़साल.',
          misconception: 'छात्र \'पश्चाताप\' को \'पश्चिम\' से जोड़ते हैं — \'पश्चाताप\' = पछतावा/अपराध-भाव; \'पश्चिम\' से अलग शब्द।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — मुख्य शब्द: असतबल (घुड़साल), ललचाई (लालसा/इच्छा), खरहरा करना (घोड़े को खुरचना),',
                  options: ['पदावली — मुख्य शब्द: असतबल (घुड़साल), ललचाई (लालसा/इच्छा), खरहरा करना (घोड़े को खुरचना),', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'असतबल\' = अश्व-स्थल = घुड़साल; \'पश्चाताप\'.',
                  misconception: 'छात्र \'पश्चाताप\' को \'पश्चिम\' से जोड़ते हैं — \'पश्चाताप\' = पछतावा/अपराध-भाव; \'पश्चिम\' से अलग शब्द।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) घोड़े-शब्द (असतबल, खरहरा, बाँका, हिनहिनाना) का अर्थ बताओ। (2) \'पश्चाताप\' बनाम \'पश्चिम\' का अंतर दिखाओ।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग — प्रेमचंद की सरल, लोक-हिंदी: तृतीय-पुरुष वर्णन (\'बाबा भारती उसे.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक संवाद पढ़िए (\'मुझ पर दया करो\'), उसका भाव बोलिए — भाषा का असर.',
          misconception: 'छात्र \'मुझ पर दया करो\' को \'सच्ची प्रार्थना\' मानते हैं — यह वेष की किरदारी है; खड्गसिंह ने दया का दुरुपयोग किया।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग — प्रेमचंद की सरल, लोक-हिंदी: तृतीय-पुरुष वर्णन (\'बाबा भारती उसे सुलतान कहकर',
                  options: ['भाषा-प्रयोग — प्रेमचंद की सरल, लोक-हिंदी: तृतीय-पुरुष वर्णन (\'बाबा भारती उसे सुलतान कहकर', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक संवाद पढ़िए (\'मुझ पर दया करो\'), उसका भाव बोलिए — भाषा का असर समझ आएगा।',
                  misconception: 'छात्र \'मुझ पर दया करो\' को \'सच्ची प्रार्थना\' मानते हैं — यह वेष की किरदारी है; खड्गसिंह ने दया का दुरुपयोग किया।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) प्रत्यक्ष संवाद के 3 उदाहरण दिखाओ। (2) \'दया करो\' का वेष-भाव समझाओ। (3) \'बकरा-कसाई\' जैसी उपमा का कार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) लेखक प्रेमचंद; (2) बाबा भारती का.',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'अपाहिज\') पाठ में खोजिए — उत्तर वहीं.',
          misconception: 'छात्र \'अपाहिज\' को \'बूढ़ा\' या \'बीमार\' मानते हैं — यहाँ \'अपाहिज\' = लंगड़ा; खड्गसिंह ने लंगड़े का वेष धरा था।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न',
                  options: ['वस्तुनिष्ठ प्रश्न', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'अपाहिज\') पाठ में खोजिए — उत्तर वहीं है.',
                  misconception: 'छात्र \'अपाहिज\' को \'बूढ़ा\' या \'बीमार\' मानते हैं — यहाँ \'अपाहिज\' = लंगड़ा; खड्गसिंह ने लंगड़े का वेष धरा था।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) तथ्य-प्रश्न पाठ से निकलवाओ। (2) \'अपाहिज\' = लंगड़ा बताओ। (3) \'घटना प्रकट न करना\' का उद्देश्य समझाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
