import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch04_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड पाठ 4 के प्रसंगों, पात्रों, प्रतीकों और भाषा-शैली के **गहन विश्लेषण और बहु-स्तरीय.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c9_hin_ga_ch04'],
    nodeIds: ['c9_hin_ga_cbse_04_013', 'c9_hin_ga_cbse_04_014', 'c9_hin_ga_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'साँवले सपनों की याद\' का विश्लेषण — महात्मा गांधी (आत्मकथा) का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'साँवले सपनों की याद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_04_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_013', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_04_008 (बिंब-रूपक) और c9_hin_ga_cbse_04_009.',
          misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **अपनी पसंद-नापसंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' का आलोचनात्मक चिंतन',
                  options: ['\'साँवले सपनों की याद\' का आलोचनात्मक चिंतन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_04_008 (बिंब-रूपक) और c9_hin_ga_cbse_04_009.',
                  misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **अपनी पसंद-नापसंद बताना** (personal.' }
          ],
            remediations: { 'fault-finding-personal-opinion': { steps: ['**शब्द बदलो:** \'आलोचनात्मक\' के स्थान पर \'गहन\' (deep) या \'विवेचनात्मक\' (analytical) शब्द सोचो — नकारात्मकता हटेगी। 2.', '**तीन प्रश्न पूछो हर अंश पर:** (क) यहाँ क्या लिखा है?', '— तीसरा प्रश्न ही व्याख्या का द्वार खोलता है। 3.', '**साक्ष्य-अर्थ जोड़ी बनाओ:** कॉपी में दो कॉलम बनाओ — बायाँ: "पाठ से वाक्य/शब्द"; दायाँ: "यह क्या कर रहा है?" — जब तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_014', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_04_013 (आलोचनात्मक चिंतन: विश्लेषण और.',
          misconception: '**भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की अधिक से अधिक पंक्तियाँ उद्धृत कर देने से पूरे अंक मिल जाते हैं।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' पर पाठ-आधारित लेखन',
                  options: ['\'साँवले सपनों की याद\' पर पाठ-आधारित लेखन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_04_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
                  misconception: '**भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की अधिक से अधिक पंक्तियाँ उद्धृत कर देने से पूरे अंक मिल जाते हैं।"* **वास्तविकता:** यह **मध्य.' }
          ],
            remediations: { '6-8-9-your-thinking': { steps: ['**चरण 1 — निदान (Diagnose):** छात्र से कहें: *"अपना लिखा उत्तर पढ़ो और हर वाक्य के आगे P / E / E / L लिखो — कौन-सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_015', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review "बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक" (c9_hin_ga_cbse_04_012) for.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि चर्चा-बिंदु का उत्तर देते समय "अपनी राय" (Personal Opinion) देनी है, और "पाठ से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'साँवले सपनों की याद\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review "बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक" (c9_hin_ga_cbse_04_012) for evidence-location.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि चर्चा-बिंदु का उत्तर देते समय "अपनी राय" (Personal Opinion) देनी है, और "पाठ से प्रमाण" (Textual.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**पहचान:** छात्र से पूछें — "तुम्हारे इस दावे के लिए पाठ की कौन-सी पंक्ति गवाह है?" — यदि वह पंक्ति नहीं बता पाता, तो.', '**मॉडलिंग:** उसी चर्चा-बिंदु पर शिक्षक एक \'कमजोर उत्तर\' (राय-आधारित) और एक \'मजबूत उत्तर\' (साक्ष्य-आधारित) साथ-साथ लिखकर.', '**अभ्यास:** छात्र को केवल **Evidence Hunting** का कार्य दें — "इस चर्चा-बिंदु के लिए पाठ से 3 साक्ष्य ढूंढो, अभी उत्तर.', '**फीडबैक:** अगले प्रयास में PEEL संरचना पर ही अंक दें, सामग्री पर नहीं — संरचना सही होगी तो सामग्री स्वतः सुधरेगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
