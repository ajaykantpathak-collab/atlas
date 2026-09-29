import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p1: SimDef = {
    id: 'v3_c6_hin_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'यह नोड केवल कवि-परिचय तक सीमित है — पाठ का भाव अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_001', 'c6_hin_cbse_03_002', 'c6_hin_cbse_03_003', 'c6_hin_cbse_03_004', 'c6_hin_cbse_03_005', 'c6_hin_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कवि-परिचय: कौल (1923–2007) — बाल-साहित्यकार; विषय — देश-प्रेम, प्रकृति, जीव-जंतु; \'हम कुछ सीखें\' — \'देश हमें.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'गोपालकृष्ण कौल (1923–2007) — बाल-साहित्यकार जिन्होंने देश-प्रेम, प्रकृति और जीव-जंतुओं से जुड़ी मनोरम कविताएँ लिखीं; उनकी कविता \'हम कुछ सीखें\' में है — \'देश हमें देता है सब कुछ, हम भी तो कुछ देना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_001', difficulty: 'standard',
          question: 'गोपालकृष्ण कौल (1923–2007) — बाल-साहित्यकार जिन्होंने देश-प्रेम, प्रकृति और.',
          hint: 'यदि अटका हुआ महसूस हो तो: कवि के 3 तथ्य लिखिए — नाम, काल, विषय; \'पावस\' का अर्थ बताइए।',
          misconception: '1. छात्र \'कौल\' को \'कौल साहब\' (उपाधि) मानते हैं — गोपालकृष्ण कौल कवि का नाम है; \'कौल\' उपनाम। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गोपालकृष्ण कौल (1923–2007)',
                  options: ['गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,', 'मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\' (फिर हरी बनने'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कवि के 3 तथ्य लिखिए — नाम, काल, विषय; \'पावस\' का अर्थ बताइए।',
                  misconception: '1. छात्र \'कौल\' को \'कौल साहब\' (उपाधि) मानते हैं — गोपालकृष्ण कौल कवि का नाम है; \'कौल\' उपनाम। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) कवि-परिचय पढ़वाओ — नाम, काल, विषय। (2) \'पावस\' का अर्थ बताओ। (3) \'हम कुछ सीखें\' की पंक्ति से देश-प्रेम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_002', difficulty: 'standard',
          question: 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक छंद उठाइए, उसके 4 पंक्तियों का शब्द-अर्थ लिखिए, फिर भाव.',
          misconception: '1. छात्र \'अँगड़ाई\' को \'आँगन\' या \'अँगना\' मानते हैं — \'अँगड़ाई\' = अँगड़ाई लेना; अंकुर का उठना/तानना। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,',
                  options: ['कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'गोपालकृष्ण कौल (1923–2007)', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,', 'मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\' (फिर हरी बनने'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक छंद उठाइए, उसके 4 पंक्तियों का शब्द-अर्थ लिखिए, फिर भाव जोड़िए।',
                  misconception: '1. छात्र \'अँगड़ाई\' को \'आँगन\' या \'अँगना\' मानते हैं — \'अँगड़ाई\' = अँगड़ाई लेना; अंकुर का उठना/तानना। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) छंद-खंड क्रम से पढ़वाओ। (2) कठिन शब्द (पावस, अंकुर, अधर, वसुंधरा, जलधर, शस्य-श्यामला) का अर्थ लिखवाओ।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम.',
          hint: 'यदि अटका हुआ महसूस हो तो: आसमान के 3 तत्व (बादल, बिजली, नगाड़े) और धरती के 3 (अधर, अंकुर.',
          misconception: '1. छात्र \'सूखे अधर\' को \'सूखे होंठ\' (मानव) मानते हैं — धरती के होठ; मानवीकरण, सच्चे होंठ नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,',
                  options: ['पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\' (फिर हरी बनने'],
                  hint: 'यदि अटका हुआ महसूस हो तो: आसमान के 3 तत्व (बादल, बिजली, नगाड़े) और धरती के 3 (अधर, अंकुर, दूब).',
                  misconception: '1. छात्र \'सूखे अधर\' को \'सूखे होंठ\' (मानव) मानते हैं — धरती के होठ; मानवीकरण, सच्चे होंठ नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) आसमान और धरती के दो परिवेश अलग करो। (2) \'उड़ता सागर\' का बादल-रूपक बताओ। (3) \'सूखे अधर\' से प्यासी धरती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_004', difficulty: 'standard',
          question: 'मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: धरती के 3 गुण लिखिए, फिर हर गुण की पंक्ति खोजिए — \'सूखे अधर\'.',
          misconception: '1. छात्र \'जवान होकर\' को \'युवा आदमी\' मानते हैं — बूँद जवान हुई; मानवीकरण, व्यक्ति नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\' (फिर हरी बनने',
                  options: ['मुख्य \'पात्र\' — धरती/वसुंधरा: वह \'बूढ़ी\' है पर \'शस्य-श्यामला बनने को ललचाई\' (फिर हरी बनने', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: धरती के 3 गुण लिखिए, फिर हर गुण की पंक्ति खोजिए — \'सूखे अधर\' = प्यासी.',
                  misconception: '1. छात्र \'जवान होकर\' को \'युवा आदमी\' मानते हैं — बूँद जवान हुई; मानवीकरण, व्यक्ति नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) धरती के 3 गुण सूची बनवाओ — प्यासी, ललचाई, तृप्त। (2) \'सूखे अधर\' का मानवीकरण दिखाओ। (3) \'बूढ़ी\' का भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_005', difficulty: 'standard',
          question: 'सहायक तत्व — पहली बूँद (\'अमृत-सी\', \'जीवन-दान\'), अंकुर (\'फूट पड़ा धरती से\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: सहायक तत्वों की सूची बनाइए (बूँद, अंकुर, दूब, बादल), फिर हर एक.',
          misconception: '1. छात्र \'जलधर\' को \'नदी\' मानते हैं — जलधर = जल धारण करने वाला = बादल; \'काली पुतली-से जलधर\'। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक तत्व — पहली बूँद (\'अमृत-सी\', \'जीवन-दान\'), अंकुर (\'फूट पड़ा धरती से\', \'नव-जीवन\'),',
                  options: ['सहायक तत्व — पहली बूँद (\'अमृत-सी\', \'जीवन-दान\'), अंकुर (\'फूट पड़ा धरती से\', \'नव-जीवन\'),', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: सहायक तत्वों की सूची बनाइए (बूँद, अंकुर, दूब, बादल), फिर हर एक का \'काम\'.',
                  misconception: '1. छात्र \'जलधर\' को \'नदी\' मानते हैं — जलधर = जल धारण करने वाला = बादल; \'काली पुतली-से जलधर\'। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) सहायक तत्वों की सूची बनवाओ — बूँद, अंकुर, दूब, बादल, बिजली। (2) हर एक का \'काम\' लिखो। (3) बूँद का \'अमृत\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_006', difficulty: 'standard',
          question: 'मुख्य विषय — वर्षा का नव-जीवन-दान: पहली बूँद से धरती में जीवन आता है — \'अंकुर.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'नव-जीवन की ले अँगड़ाई\' पढ़िए — विषय वहीं है; वर्षा से नया जीवन।',
          misconception: '1. छात्र विषय को \'वर्षा-वर्णन\' मानते हैं — वर्षा माध्यम है; केंद्रीय भाव नव-जीवन/करुणा है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय — वर्षा का नव-जीवन-दान: पहली बूँद से धरती में जीवन आता है — \'अंकुर फूट पड़ा\',',
                  options: ['मुख्य विषय — वर्षा का नव-जीवन-दान: पहली बूँद से धरती में जीवन आता है — \'अंकुर फूट पड़ा\',', 'गोपालकृष्ण कौल (1923–2007)', 'कविता का पाठ — चार छंद-खंड: (1) पावस के पहले दिन पहली बूँद धरा पर आई, अंकुर फूट पड़ा,', 'पाठ्य-परिवेश — वर्षा के प्रथम दिवस का दृश्य: आसमान में बादलों का सागर, स्वर्णिम बिजलियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'नव-जीवन की ले अँगड़ाई\' पढ़िए — विषय वहीं है; वर्षा से नया जीवन।',
                  misconception: '1. छात्र विषय को \'वर्षा-वर्णन\' मानते हैं — वर्षा माध्यम है; केंद्रीय भाव नव-जीवन/करुणा है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'नव-जीवन\' शब्द पढ़वाओ — विषय-केंद्र। (2) \'चिर-प्यास\' का अर्थ समझाओ — अनंत प्यास। (3) \'शस्य-श्यामला\' से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
