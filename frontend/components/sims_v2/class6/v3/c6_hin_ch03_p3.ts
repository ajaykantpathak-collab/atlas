import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p3: SimDef = {
    id: 'v3_c6_hin_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक चिंतन तक सीमित है — लेखन/चर्चा अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_013', 'c6_hin_cbse_03_014', 'c6_hin_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'विश्लेषण: (1) शक्ति — \'पहली बूँद\' को \'अमृत-सी\' जीवन-दान बनाना; (2) शक्ति — आवृत्ति से भाव-केंद्र; (3) शक्ति.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन — कविता सफल है क्योंकि \'पहली बूँद\' को \'अमृत-सी\' जीवन-दान बनाकर धरती को पात्र बनाती है; \'पहली बूँद\' की आवृत्ति भाव-केंद्र बनाती है; मानवीकरण (धरती के अधर, आकाश के नयन) प्रकृति को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — लेखन-कौशल — कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव); अपने क्षेत्र की.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — वाचन-चर्चा — कविता को लय में वाचन; \'मिलकर करें मिलान\' (पंक्तियों को भाव से जोड़ना — \'पहली.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 3 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन — कविता सफल है क्योंकि \'पहली बूँद\' को \'अमृत-सी\' जीवन-दान बनाकर.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति जो आपको अच्छी लगी (शक्ति) और एक जो ज्यादा लगी (सीमा).',
          misconception: '1. छात्र \'आलोचना\' को \'केवल प्रशंसा\' मानते हैं — आलोचना शक्ति + सीमा; दोनों पक्ष। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन',
                  options: ['आलोचनात्मक चिंतन', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति जो आपको अच्छी लगी (शक्ति) और एक जो ज्यादा लगी (सीमा) — दोनों.',
                  misconception: '1. छात्र \'आलोचना\' को \'केवल प्रशंसा\' मानते हैं — आलोचना शक्ति + सीमा; दोनों पक्ष। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'आलोचना\' का अर्थ समझाओ — शक्ति + सीमा, केवल कमी नहीं। (2) \'अमृत-सी\' को उपमा बनाम अतिशयोक्ति से देखो। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_014', difficulty: 'standard',
          question: 'लेखन-कौशल — कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव); अपने.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए.',
          misconception: '1. छात्र भावार्थ में पंक्ति दोहरा देते हैं — भावार्थ = शब्द-अर्थ + भाव + अपना वाक्य; केवल उद्धरण नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-कौशल — कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव)',
                  options: ['लेखन-कौशल — कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव)', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए — भावार्थ.',
                  misconception: '1. छात्र भावार्थ में पंक्ति दोहरा देते हैं — भावार्थ = शब्द-अर्थ + भाव + अपना वाक्य; केवल उद्धरण नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) भावार्थ-विधि समझाओ — शब्द→अर्थ→भाव→उदाहरण। (2) एक पंक्ति का भावार्थ साथ लिखो। (3) अपने क्षेत्र की वर्षा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_015', difficulty: 'standard',
          question: 'वाचन-चर्चा — कविता को लय में वाचन; \'मिलकर करें मिलान\' (पंक्तियों को भाव से.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, ताली से लय बजाइए, फिर \'पहली बूँद\' का अपना.',
          misconception: '1. छात्र \'करुणा-विगलित अश्रु\' को \'सच्चा आँसू\' मानते हैं — काव्य-कल्पना है; वर्षा को करुणा-अश्रु कहा; मानवीकरण। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा — कविता को लय में वाचन',
                  options: ['वाचन-चर्चा — कविता को लय में वाचन', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, ताली से लय बजाइए, फिर \'पहली बूँद\' का अपना अनुभव बोलिए.',
                  misconception: '1. छात्र \'करुणा-विगलित अश्रु\' को \'सच्चा आँसू\' मानते हैं — काव्य-कल्पना है; वर्षा को करुणा-अश्रु कहा; मानवीकरण। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) चर्चा-नियम समझाओ — सुनो, प्रमाण दो, सम्मान करो। (2) \'चिर-प्यास\' का अर्थ बताओ। (3) \'पहली बूँद\' का अपना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
