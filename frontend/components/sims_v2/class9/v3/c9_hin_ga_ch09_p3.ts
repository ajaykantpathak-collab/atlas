import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch09_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'यह नोड कक्षा 9 स्तर पर गद्य/पद्य दोनों में आलोचनात्मक विश्लेषण की प्रक्रिया सिखाता है.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c9_hin_ga_ch09'],
    nodeIds: ['c9_hin_ga_cbse_09_013', 'c9_hin_ga_cbse_09_014', 'c9_hin_ga_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'तुलसीदास के दोहे\' का विश्लेषण — गोस्वामी तुलसीदास का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'तुलसीदास के दोहे\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'तुलसीदास के दोहे\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'तुलसीदास के दोहे\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_09_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_013', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँसें तो: नोड 008 (बिंब/रूपक प्रभाव) और 009 (विरोधाभास/प्रतीक) पर लौटें — ये \'भाषा.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक चिंतन = "अपनी राय देना" या "लेखक से असहमत होना"। वे लिखते हैं: "मुझे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' का आलोचनात्मक चिंतन',
                  options: ['\'तुलसीदास के दोहे\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो: नोड 008 (बिंब/रूपक प्रभाव) और 009 (विरोधाभास/प्रतीक) पर लौटें — ये \'भाषा कैसे अर्थ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक चिंतन = "अपनी राय देना" या "लेखक से असहमत होना"। वे लिखते हैं: "मुझे यह पसंद नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**राय vs विश्लेषण छाँटना:** छात्र को 5 वाक्य दें — 3 राय, 2 विश्लेषण। उसे पहचानने को कहें: "कौन-सा वाक्य पाठ के शब्दों.', 'कौन-सा केवल मन की बात कहता है?" 2.', '**\'क्यों\' की श्रृंखला:** छात्र के हर दावे पर पूछें: "पाठ में *कहाँ* लिखा है जो यह सिद्ध करता है?" — जब तक वह.', '**मिनी-विश्लेषण अभ्यास:** 3-4 पंक्ति का अंश दें; केवल *एक* साहित्यिक युक्ति (जैसे विरोधाभास) का प्रभाव 3 वाक्यों में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_014', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review **c9_hin_ga_cbse_09_013 (आलोचनात्मक चिंतन)** — specifically the "Theme.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना (paraphrasing the plot)।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' पर पाठ-आधारित लेखन',
                  options: ['\'तुलसीदास के दोहे\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c9_hin_ga_cbse_09_013 (आलोचनात्मक चिंतन)** — specifically the "Theme tracing.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना (paraphrasing the plot)।"* **गलत तर्क:** छात्र.' }
          ],
            remediations: { 'paraphrasing-the-plot-narration-argumentative': { steps: ['**पहचान कराएँ:** छात्र को उसका लिखा एक उत्तर और एक मॉडल PEEL उत्तर साथ रखकर पूछें: *"कौन-सा उत्तर प्रश्न का.', '**Evidence खोज का अभ्यास:** एक प्रश्न दें (जैसे "नायक की ईमानदारी") और कहें: *"पाठ से **एक** ऐसा वाक्य/प्रसंग ढूंढो जो.', '**PEEL टेम्पलेट भरवाएँ:** रिक्त PEEL शीट दें (P:__, E:__, E:__, L:__) और कहें: *"केवल इस शीट में लिखो, पूरा उत्तर.', '**स्व-मूल्यांकन:** अगले उत्तर में छात्र स्वयं अपने PEEL भागों को हाइलाइट करे (पीला-P, हरा-E, नीला-E, गुलाबी-L) — दृश्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_015', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श.',
          hint: 'If stuck, review **c9_hin_ga_cbse_09_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु" का अर्थ है **कहानी का सारांश (summary) बोलना** या **अपनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'तुलसीदास के दोहे\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c9_hin_ga_cbse_09_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** — specifically.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु" का अर्थ है **कहानी का सारांश (summary) बोलना** या **अपनी पसंद/नापसंद बताना** — और वे.' }
          ],
            remediations: { 'summary-6-8': { steps: ['**चरण 1 — आदत बदलें:** छात्र से कहें: "अगली तीन चर्चाओं के लिए, **बोलने से पहले 5 मिनट पाठ के साथ बैठो**। हर.', 'क्या व्याख्या साक्ष्य से जुड़ी?', 'क्या लिंक विषय तक पहुँचा?" **चरण 3 — सहकर्मी प्रतिक्रिया (peer feedback):** जोड़ी बनाओ; एक बोले, दूसरा **चेकलिस्ट**.', '— फिर भूमिका बदलो। **चरण 4 — शिक्षक मॉडलिंग:** शिक्षक एक **कमज़ोर मौखिक उत्तर** और एक **मज़बूत मौखिक उत्तर** (एक ही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
