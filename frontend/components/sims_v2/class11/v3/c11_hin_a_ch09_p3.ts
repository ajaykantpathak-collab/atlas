import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch09_p3: SimDef = {
    id: 'v3_c11_hin_a_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'अंतरा\' पाठ्यपुस्तक के पाठ 9 पर केंद्रित आलोचनात्मक विश्लेषण और.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c11_hin_a_ch09'],
    nodeIds: ['c11_hin_a_cbse_09_013', 'c11_hin_a_cbse_09_014', 'c11_hin_a_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 9\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अंतरा भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_013', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँसें तो: c11_hin_a_cbse_09_012 (बोध-प्रश्न) पर लौटें और सुनिश्चित करें कि पाठ का.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में \'कमियाँ निकालना\' (Finding faults) या लेखक से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो: c11_hin_a_cbse_09_012 (बोध-प्रश्न) पर लौटें और सुनिश्चित करें कि पाठ का अक्षरशः अर्थ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में \'कमियाँ निकालना\' (Finding faults) या लेखक से \'असहमत होना\'.' }
          ],
            remediations: { 'finding-faults-disagreeing': { steps: ['**शब्दकोश सुधार:** छात्र से कहें — "आलोचना (Criticism) और आलोचनात्मक चिंतन (Critical Thinking) में अंतर लिखो। पहले का.', '**मॉडलिंग:** पाठ 9 के एक विवादास्पद प्रसंग (जैसे नायक का चुप रह जाना) लें और दो उत्तर दिखाएं: (क) नैतिक निर्णय — "नायक.', '**अभ्यास:** छात्र को पाठ 9 के तीन प्रसंग दें और केवल \'विश्लेषणात्मक प्रश्न\' बनाने को कहें (जिनका उत्तर \'हाँ/नहीं\' न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_014', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit **c11_hin_a_cbse_09_013 (आलोचनात्मक चिंतन)** — specifically the worked.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन का अर्थ है पाठ की कहानी को अपने शब्दों में दोहराना (paraphrasing the plot), बस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit **c11_hin_a_cbse_09_013 (आलोचनात्मक चिंतन)** — specifically the worked examples.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन का अर्थ है पाठ की कहानी को अपने शब्दों में दोहराना (paraphrasing the plot), बस थोड़े \'फैंसी शब्द\'.' }
          ],
            remediations: { 'paraphrasing-the-plot': { steps: ['**निदान:** छात्र से एक 5-अंक का पुराना उत्तर मँगवाएँ। उसे दो रंगों से हाइलाइट करवाएँ: **पीला** = कथानक सारांश (what.', '**मॉडलिंग:** उसी प्रश्न का एक PEEL-आधारित मॉडल उत्तर दिखाएँ। साथ-साथ रखें। पूछें: "कौन-सा उत्तर \'पाठ का उपयोग\' करता है.', '**अभ्यास:** एक *नया* लघु प्रसंग (2-3 वाक्य) दें। कहें: "इससे केवल *एक* विशेषण (trait) चुनकर PEEL पैराग्राफ लिखो — कथानक.', '**आंतरिकीकरण:** छात्र को स्वयं का \'चेकलिस्ट\' बनाने को कहें: ☐ Point थीम से जुड़ा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_015', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि फँस जाएँ तो **\'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या\' (c11_hin_a_cbse_09_013)** के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'चर्चा-बिंदु\' का अर्थ \'पाठ का सारांश (Summary)\' या \'अपनी राय (Opinion)\' देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **\'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या\' (c11_hin_a_cbse_09_013)** के **\'द्वंद्व.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'चर्चा-बिंदु\' का अर्थ \'पाठ का सारांश (Summary)\' या \'अपनी राय (Opinion)\' देना है**। वे लिखते हैं.' }
          ],
            remediations: { 'summary-opinion': { steps: ['**लक्षित सुधार (Targeted Remediation)**: 1.', '**\'साक्ष्य-खोज अभ्यास\' (Evidence-Hunting Drill)**: छात्र को पाठ-9 का कोई भी पैराग्राफ दें और कहें — *"इस पैरा से **केवल.', '**\'PEEL टेम्पलेट अनिवार्यीकरण\' (Mandatory PEEL Template)**: हर चर्चा-बिंदु के लिए **4-पंक्ति टेम्पलेट** भरवाएँ: **P.', '**\'श्रवण-लॉग (Listening Log)\' बनवाएँ**: चर्चा के दौरान छात्र **बोलने के बजाय** एक कागज़ पर लिखे — *"सहपाठी X ने बिंदु.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
