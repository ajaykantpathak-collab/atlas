import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p3: SimDef = {
    id: 'v3_c6_hin_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक चिंतन तक सीमित है — लेखन/चर्चा अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_013', 'c6_hin_cbse_04_014', 'c6_hin_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'विश्लेषण: (1) शक्ति — क्षमा की जीत दिखाना (करुणा > बल); (2) शक्ति — \'हार की जीत\' का विरोधाभासिक विषय; (3).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन — क्या बाबा की प्रार्थना \'विश्वास बचाओ\' यथार्थ में संभव है? क्या खड्गसिंह का परिवर्तन विश्वसनीय है? क्या \'हार की जीत\' आज भी प्रासंगिक है?', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — लेखन-कौशल — कथा के अंत का विस्तार (खड्गसिंह की प्रतिक्रिया जब उसने बाबा को रोते देखा), या.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वाचन-चर्चा — \'क्या क्षमा बल से बड़ी है?\' पर समूह-बहस; \'क्या बाबा की प्रार्थना उचित थी?\'.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 4 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन — क्या बाबा की प्रार्थना \'विश्वास बचाओ\' यथार्थ में संभव है?',
          hint: 'यदि अटका हुआ महसूस हो तो: एक बात जो आपको अच्छी लगी (शक्ति) और एक जो अविश्वसनीय लगी (सीमा).',
          misconception: 'छात्र खड्गसिंह के परिवर्तन को \'अविश्वसनीय\' कहकर कथा खारिज कर देते हैं — बाबा के \'ऊँचे विचार\' का प्रभाव मानकर संभव है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन',
                  options: ['आलोचनात्मक चिंतन', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक बात जो आपको अच्छी लगी (शक्ति) और एक जो अविश्वसनीय लगी (सीमा) — दोनों.',
                  misconception: 'छात्र खड्गसिंह के परिवर्तन को \'अविश्वसनीय\' कहकर कथा खारिज कर देते हैं — बाबा के \'ऊँचे विचार\' का प्रभाव मानकर संभव है; परिवर्तन धीमा नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) \'आलोचना\' का अर्थ समझाओ — शक्ति + सीमा, केवल निन्दा नहीं। (2) खड्गसिंह के परिवर्तन को दो दृष्टियों से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_014', difficulty: 'standard',
          question: 'लेखन-कौशल — कथा के अंत का विस्तार (खड्गसिंह की प्रतिक्रिया जब उसने बाबा को रोते.',
          hint: 'यदि अटका हुआ महसूस हो तो: खड्गसिंह की दृष्टि से अंत सोचिए — उसने बाबा को रोते देखा क्या.',
          misconception: 'छात्र कहानी दोहराते हैं — लेखन में अपनी दृष्टि, अपना अनुभव या अपना विश्लेषण जोड़ना है; केवल उद्धरण लेखन नहीं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-कौशल — कथा के अंत का विस्तार (खड्गसिंह की प्रतिक्रिया जब उसने बाबा को रोते देखा), या',
                  options: ['लेखन-कौशल — कथा के अंत का विस्तार (खड्गसिंह की प्रतिक्रिया जब उसने बाबा को रोते देखा), या', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: खड्गसिंह की दृष्टि से अंत सोचिए — उसने बाबा को रोते देखा क्या सोचा होगा.',
                  misconception: 'छात्र कहानी दोहराते हैं — लेखन में अपनी दृष्टि, अपना अनुभव या अपना विश्लेषण जोड़ना है; केवल उद्धरण लेखन नहीं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) अंत-विस्तार की विधि समझाओ — दृष्टि-परिवर्तन। (2) \'मेरी क्षमा-घटना\' के 4 चरण लिखवाओ। (3) चरित्र-लेख में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_015', difficulty: 'standard',
          question: 'वाचन-चर्चा — \'क्या क्षमा बल से बड़ी है?\' पर समूह-बहस; \'क्या बाबा की प्रार्थना.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'क्षमा बनाम बल\' पर एक तर्क पक्ष और एक विपक्ष लिखिए — चर्चा की.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा = सुनना + प्रमाण + दूसरे का सम्मान; \'एक सही उत्तर\' खोजना गलत है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा — \'क्या क्षमा बल से बड़ी है?\' पर समूह-बहस',
                  options: ['वाचन-चर्चा — \'क्या क्षमा बल से बड़ी है?\' पर समूह-बहस', 'मुंशी प्रेमचंद (1880–1936)', 'कथानक — बाबा भारती घोड़े सुलतान से प्रेम करते हैं (\'इसके बिना मैं रह न सकूँगा\')', 'पाठ्य-परिवेश — गाँव-जीवन: बाबा भारती का छोटा-सा मंदिर गाँव से बाहर, असतबल (घुड़साल) जहाँ'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'क्षमा बनाम बल\' पर एक तर्क पक्ष और एक विपक्ष लिखिए — चर्चा की शुरुआत।',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा = सुनना + प्रमाण + दूसरे का सम्मान; \'एक सही उत्तर\' खोजना गलत है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) चर्चा-नियम समझाओ — सुनो, प्रमाण दो, सम्मान करो। (2) \'क्षमा बनाम बल\' पर दो पक्ष लिखवाओ। (3) \'हार की जीत\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
