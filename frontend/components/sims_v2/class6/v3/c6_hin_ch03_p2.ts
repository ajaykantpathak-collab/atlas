import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p2: SimDef = {
    id: 'v3_c6_hin_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों तक सीमित है — बिंब/अलंकार अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_007', 'c6_hin_cbse_03_008', 'c6_hin_cbse_03_009', 'c6_hin_cbse_03_010', 'c6_hin_cbse_03_011', 'c6_hin_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'गौण-मानचित्र: करुणा (\'करुणा-विगलित अश्रु\') → जीवन-चक्र (\'फिर से ललचाई\') → उत्सव (\'नगाड़े जगा रहे\', \'स्वर्णिम.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय — (1) प्रकृति की करुणा (\'करुणा-विगलित अश्रु\'); (2) जीवन-चक्र/पुनरुत्थान (बूढ़ी धरती फिर ललचाई); (3) प्रकृति का उत्सव (नगाड़े, बिजली); (4) निःशुष्क से समृद्धि (सूखे अधर से शस्य-श्यामला).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — भाषा-प्रयोग — संस्कृत-मिश्रित मधुर हिंदी: छंद-बद्ध चार-पंक्ति छंद-खंड (\'पावस का प्रथम.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) कवि गोपालकृष्ण कौल (1923–2007); (2) \'पावस\'.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय — (1) प्रकृति की करुणा (\'करुणा-विगलित अश्रु\'); (2).',
          hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी पंक्तियाँ जो अलग भाव देती हैं.',
          misconception: '1. छात्र \'करुणा-विगलित\' को \'रोना\' मानते हैं — \'विगलित\' = पिघला; करुणा पिघलकर अश्रु बनी; भाव-द्रवीकरण। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय — (1) प्रकृति की करुणा (\'करुणा-विगलित अश्रु\')',
                  options: ['गौण विषय — (1) प्रकृति की करुणा (\'करुणा-विगलित अश्रु\')', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी पंक्तियाँ जो अलग भाव देती हैं — वही गौण विषय।',
                  misconception: '1. छात्र \'करुणा-विगलित\' को \'रोना\' मानते हैं — \'विगलित\' = पिघला; करुणा पिघलकर अश्रु बनी; भाव-द्रवीकरण। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) मुख्य विषय से गौण विषय अलग करो। (2) \'करुणा-विगलित अश्रु\' का भाव समझाओ। (3) \'नगाड़े\' का उत्सव-भाव दिखाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_008', difficulty: 'standard',
          question: 'बिंब — \'आसमान में उड़ता सागर\' (बादल-दृश्य), \'स्वर्णिम पर\' बिजली (प्रकाश-दृश्य).',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — क्या दिखता है, क्या.',
          misconception: '1. छात्र \'नयन\' को \'नयन\' (नाम) मानते हैं — \'नयन\' = नेत्र/आँख; \'नीले नयनों-सा अंबर\' = नीली आँखों-सा आकाश। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब — \'आसमान में उड़ता सागर\' (बादल-दृश्य), \'स्वर्णिम पर\' बिजली (प्रकाश-दृश्य), \'बजा',
                  options: ['बिंब — \'आसमान में उड़ता सागर\' (बादल-दृश्य), \'स्वर्णिम पर\' बिजली (प्रकाश-दृश्य), \'बजा', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — क्या दिखता है, क्या सुनाई देता.',
                  misconception: '1. छात्र \'नयन\' को \'नयन\' (नाम) मानते हैं — \'नयन\' = नेत्र/आँख; \'नीले नयनों-सा अंबर\' = नीली आँखों-सा आकाश। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) पाँच इंद्रियों की सूची बनवाओ। (2) हर बिंब को इंद्रिय से जोड़ो — नगाड़े = श्रवण, अधर = स्पर्श। (3) \'उड़ता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_009', difficulty: 'standard',
          question: 'अलंकार/युक्तियाँ — रूपक (\'उड़ता सागर\' = बादल, \'जलधर\' = बादल, \'तरुणाई\' = बादल).',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर कविता से उदाहरण खोजिए — \'सी\'.',
          misconception: '1. छात्र \'नयनों-सा\' को \'रूपक\' कहते हैं — \'-सा\' उपमा-सूचक है; उपमा, रूपक नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार/युक्तियाँ',
                  options: ['अलंकार/युक्तियाँ', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर कविता से उदाहरण खोजिए — \'सी\' देखकर.',
                  misconception: '1. छात्र \'नयनों-सा\' को \'रूपक\' कहते हैं — \'-सा\' उपमा-सूचक है; उपमा, रूपक नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) उपमा बनाम रूपक का अंतर — \'सी\' सूचक देखो। (2) \'अधर\', \'ललचाई\' का मानवीकरण दिखाओ। (3) \'चिर-प्यास\' का श्लेष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_010', difficulty: 'standard',
          question: 'पदावली — मुख्य शब्द: पावस (वर्षा), अंकुर (नया पौधा/कोपल), अँगड़ाई (शरीर को.',
          hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'जल-धर\' = जल धारण करने वाला.',
          misconception: '1. छात्र \'अंबर\' को \'कपड़ा\' या \'रंग\' मानते हैं — \'अंबर\' = आकाश; \'अम्बर\' रंग से अलग। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — मुख्य शब्द: पावस (वर्षा), अंकुर (नया पौधा/कोपल), अँगड़ाई (शरीर को',
                  options: ['पदावली — मुख्य शब्द: पावस (वर्षा), अंकुर (नया पौधा/कोपल), अँगड़ाई (शरीर को', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'जल-धर\' = जल धारण करने वाला = बादल; संदर्भ.',
                  misconception: '1. छात्र \'अंबर\' को \'कपड़ा\' या \'रंग\' मानते हैं — \'अंबर\' = आकाश; \'अम्बर\' रंग से अलग। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) कठिन शब्दों की सूची बनवाओ — पावस, अंकुर, अधर, वसुंधरा, जलधर। (2) संदर्भ से अर्थ निकालो (\'जलधर\' = जल धारण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग — संस्कृत-मिश्रित मधुर हिंदी: छंद-बद्ध चार-पंक्ति छंद-खंड (\'पावस का.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक छंद पढ़िए, ताली से लय बजाइए — \'पहली बूँद\' की आवृत्ति सुनिए.',
          misconception: '1. छात्र \'गरज-गरज\' को \'केवल शब्द-दोहराव\' मानते हैं — अनुकरण-ध्वनि है; \'गरज\' से गरज की आवाज़ सुनाई देती है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग — संस्कृत-मिश्रित मधुर हिंदी: छंद-बद्ध चार-पंक्ति छंद-खंड (\'पावस का प्रथम',
                  options: ['भाषा-प्रयोग — संस्कृत-मिश्रित मधुर हिंदी: छंद-बद्ध चार-पंक्ति छंद-खंड (\'पावस का प्रथम', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक छंद पढ़िए, ताली से लय बजाइए — \'पहली बूँद\' की आवृत्ति सुनिए; भाषा का लय.',
                  misconception: '1. छात्र \'गरज-गरज\' को \'केवल शब्द-दोहराव\' मानते हैं — अनुकरण-ध्वनि है; \'गरज\' से गरज की आवाज़ सुनाई देती है; श्रुति-अलंकार। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) छंद-खंड की संरचना दिखाओ (4 पंक्तियाँ)। (2) \'-सी\' उपमा-सूचक के 3 उदाहरण दिखाओ। (3) \'पहली बूँद\' की आवृत्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) कवि गोपालकृष्ण कौल (1923–2007); (2).',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'जलधर\') पाठ में खोजिए — उत्तर वहीं.',
          misconception: '1. छात्र \'नव-जीवन की ले अँगड़ाई\' का उत्तर \'बूँद\' देते हैं — पाठ के प्रश्न का उत्तर अंकुर है; अँगड़ाई अंकुर लेता है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न',
                  options: ['वस्तुनिष्ठ प्रश्न', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'जलधर\') पाठ में खोजिए — उत्तर वहीं है; \'जल-धर\'.',
                  misconception: '1. छात्र \'नव-जीवन की ले अँगड़ाई\' का उत्तर \'बूँद\' देते हैं — पाठ के प्रश्न का उत्तर अंकुर है; अँगड़ाई अंकुर लेता है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) तथ्य-प्रश्न पाठ से निकलवाओ। (2) \'जलधर\' = बादल बताओ — \'जल-धर\'। (3) \'पावस\', \'अधर\', \'अंकुर\' का अर्थ रटवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
