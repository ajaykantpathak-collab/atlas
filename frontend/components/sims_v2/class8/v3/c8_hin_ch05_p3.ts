import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p3: SimDef = {
    id: 'v3_c8_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड कक्षा 8 के स्तर पर पाठ के **अंतर्निहित अर्थ** (Implied Meaning), **लेखकीय.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_013', 'c8_hin_cbse_05_014', 'c8_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो कि तुम्हें एक पुराना पत्र मिला है जिसमें केवल लिखा है: "बारिश हो रही है, खिड़की बंद कर देना।" तुम.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें पाठ के विभिन्न अवयवों (कथानक, पात्र, भाषा, शैली) को **विश्लेषण** (Analysis) द्वारा अलग-अलग समझा जाता है और फिर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — Text-based writing (पाठ-आधारित लेखन) is the skill of constructing analytical responses.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का मौन/सस्वर.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन अध्ययन की वह प्रक्रिया है.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c8_hin_cbse_05_008 (बिंब और रूपक)** और **c8_hin_cbse_05_009.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (Fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें पाठ',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें पाठ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c8_hin_cbse_05_008 (बिंब और रूपक)** और **c8_hin_cbse_05_009 (विरोधाभास.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (Fault-finding) या **लेखक से असहमत होना**।.' }
          ],
            remediations: { 'fault-finding-5': { steps: ['**मॉडलिंग (Modeling)**: शिक्षक एक छोटा गद्यांश लेकर \'आलोचना\' (Criticism) और \'आलोचनात्मक विश्लेषण\' (Critical Analysis).', '**साक्ष्य-एंकरिंग (Evidence Anchoring)**: छात्र से कहें: "हर व्याख्या-वाक्य के आगे कोष्ठक में पाठ की पंक्ति संख्या/शब्द.', '**दृष्टिकोण-अदलाबदली (Perspective Swapping)**: वही प्रसंग दो बार लिखवाएँ — एक बार \'नायक की आँख से\', दूसरी बार \'विरोधी.', 'कौन-सा भाव उभरा/दबा?" — इससे \'दृष्टिकोण अर्थ बनाता है\' स्पष्ट होता है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_014', difficulty: 'standard',
          question: 'Text-based writing (पाठ-आधारित लेखन) is the skill of constructing analytical.',
          hint: 'यदि अटके, तो कक्षा 7 के PEEL अभ्यास (c7_hin_cbse_05_014) के मॉडल उत्तर दोबारा पढ़ें और.',
          misconception: '**छात्र मानते हैं कि \'पाठ से उद्धरण कॉपी कर देना\' ही साक्ष्य (Evidence) देना है।** वे 2-3 लंबी पंक्तियाँ ज्यों की त्यों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Text-based writing (पाठ-आधारित लेखन) is the skill of constructing analytical responses',
                  options: ['Text-based writing (पाठ-आधारित लेखन) is the skill of constructing analytical responses', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटके, तो कक्षा 7 के PEEL अभ्यास (c7_hin_cbse_05_014) के मॉडल उत्तर दोबारा पढ़ें और प्रत्येक चरण.',
                  misconception: '**छात्र मानते हैं कि \'पाठ से उद्धरण कॉपी कर देना\' ही साक्ष्य (Evidence) देना है।** वे 2-3 लंबी पंक्तियाँ ज्यों की त्यों लिख देते हैं और.' }
          ],
            remediations: { 'evidence-2-3': { steps: ['**मॉडलिंग:** बोर्ड पर एक कमजोर उत्तर लिखें (केवल उद्धरण, बिना व्याख्या) और पूछें: "यहाँ क्या गायब है?" — छात्रों से.', '**साक्ष्य छँटाई अभ्यास:** एक प्रश्न दें, पाठ से 5 वाक्य दें, छात्रों से कहें: "केवल **दो** सबसे मजबूत वाक्य चुनो और.', '**PEEL कार्ड खेल:** कागज के चार कार्ड बनाएँ (P, E, E, L)। छात्रों को समूह में दें; एक वाक्य पढ़ें, वे सही क्रम में.', '**साप्ताहिक \'एक अनुच्छेद\' गृहकार्य:** हर सप्ताह एक साहित्य प्रश्न पर केवल **एक** PEEL अनुच्छेद लिखवाएँ, जाँचें, और केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का.',
          hint: 'यदि अटका हो तो **c8_hin_cbse_05_013 (आलोचनात्मक चिंतन)** के \'पाठ-प्रश्नांकन\' अभ्यास पर.',
          misconception: 'छात्र मानते हैं कि **चर्चा-बिंदु = प्रश्न सूची**। वे पाठ पढ़कर 10-15 प्रश्न लिख लाते हैं (कौन? क्या? कब?',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का मौन/सस्वर',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का मौन/सस्वर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटका हो तो **c8_hin_cbse_05_013 (आलोचनात्मक चिंतन)** के \'पाठ-प्रश्नांकन\' अभ्यास पर लौटें — वही.',
                  misconception: 'छात्र मानते हैं कि **चर्चा-बिंदु = प्रश्न सूची**। वे पाठ पढ़कर 10-15 प्रश्न लिख लाते हैं (कौन? क्या? कब?' }
          ],
            remediations: { '10-15': { steps: ['छात्र को **एक छोटा अनुच्छेद** दें जिसमें स्पष्ट अंतर्विरोध हो (जैसे: कोई पात्र मुस्कुरा रहा है पर पीड़ा में है)। 2.', 'पूछें: "यहाँ क्या अटपटा लगा?', 'उसके वाक्य को **चर्चा-बिंदु में बदलें**: "क्यों/कैसे" से शुरू करके, पाठ-साक्ष्य माँगते हुए। 4.', 'अभ्यास कराएँ: **तीन अलग-अलग पाठों** पर यही प्रक्रिया दोहराएँ जब तक वह \'प्रश्न\' और \'चर्चा-बिंदु\' में अंतर **महसूस** न कर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
