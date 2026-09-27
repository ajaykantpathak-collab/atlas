import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch08_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'यह नोड पाठ 8 के संदर्भ में विश्लेषण (Analysis) और व्याख्या (Interpretation) के कौशल पर.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c9_hin_ga_ch08'],
    nodeIds: ['c9_hin_ga_cbse_08_013', 'c9_hin_ga_cbse_08_014', 'c9_hin_ga_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'मान लो तुमने कोई फिल्म देखी और दोस्त पूछे "कैसी लगी?" — तुम कहोगे "अच्छी थी" (निर्णय/Judgment)। लेकिन अगर वह.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-शैली और अंतर्निहित मान्यताओं की गहन जाँच-परख करके एक सुविचारित, साक्ष्य-आधारित व्याख्या (Interpretation) प्रस्तुत करने की बौद्धिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को głos में पढ़कर उसकी सामग्री को समझना, फिर उसके.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-शैली और.',
          hint: 'यदि फँस जाएँ, तो तुरंत नोड 006 (मुख्य विषय और संदेश) और नोड 009 (विरोधाभास और प्रतीक) पर.',
          misconception: '**भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' (Finding Faults) या लेखक से \'असहमत होना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-शैली और अंतर्निहित',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-शैली और अंतर्निहित', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the analytical study', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Cause-Effect Chain) है जो कहानी को तार्किक गति', 'पाठ्य-परिवेश (Setting) कथा में वर्णित **स्थान, काल और सामाजिक परिस्थितियों का भौतिक'],
                  hint: 'यदि फँस जाएँ, तो तुरंत नोड 006 (मुख्य विषय और संदेश) और नोड 009 (विरोधाभास और प्रतीक) पर लौटें — ये.',
                  misconception: '**भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' (Finding Faults) या लेखक से \'असहमत होना\' (Disagreeing)।" **वास्तविकता और.' }
          ],
            remediations: { 'finding-faults-disagreeing-critical-criticize': { steps: ['**चरण 1 - शब्दार्थ स्पष्टीकरण:** छात्र के साथ बैठकर \'Critical\' के दो अर्थ समझाएँ: (क) दैनिक जीवन: निंदा करना। (ख).', 'पाठ के किस उद्देश्य की पूर्ति करता है?" **चरण 4 - फीडबैक लूप:** यदि छात्र फिर से \'पसंद/नापसंद\' पर आए, तो तुरंत रोककर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी.',
          hint: 'यदि अटकें तो **c9_hin_ga_cbse_08_006 (मुख्य विषय)** और **c9_hin_ga_cbse_08_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ की अधिक से अधिक पंक्तियाँ उद्धृत (Quote) कर देने से अंक बढ़ते हैं।"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the analytical study', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Cause-Effect Chain) है जो कहानी को तार्किक गति', 'पाठ्य-परिवेश (Setting) कथा में वर्णित **स्थान, काल और सामाजिक परिस्थितियों का भौतिक'],
                  hint: 'यदि अटकें तो **c9_hin_ga_cbse_08_006 (मुख्य विषय)** और **c9_hin_ga_cbse_08_004 (नायक चित्रण)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ की अधिक से अधिक पंक्तियाँ उद्धृत (Quote) कर देने से अंक बढ़ते हैं।"** इसके विपरीत, बोर्ड.' }
          ],
            remediations: { 'quote': { steps: ['**चरण 1 (Diagnose):** छात्र से कहें: "अपना लिखा उत्तर देखो — हर Point के आगे ✅ लगाओ जहाँ तुमने पाठ की **ठीक वही 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को głos में पढ़कर उसकी सामग्री को समझना.',
          hint: 'यदि फँसें तो पाठ के मुख्य विषय (c9_hin_ga_cbse_08_006) और कथानक संरचना.',
          misconception: 'छात्रों में यह गलतफहमी होती है कि चर्चा-बिंदु तैयार करने के लिए केवल पाठ का सारांश देना suficiente है — जैसे कहना कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को głos में पढ़कर उसकी सामग्री को समझना, फिर उसके',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को głos में पढ़कर उसकी सामग्री को समझना, फिर उसके', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the analytical study', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Cause-Effect Chain) है जो कहानी को तार्किक गति', 'पाठ्य-परिवेश (Setting) कथा में वर्णित **स्थान, काल और सामाजिक परिस्थितियों का भौतिक'],
                  hint: 'यदि फँसें तो पाठ के मुख्य विषय (c9_hin_ga_cbse_08_006) और कथानक संरचना (c9_hin_ga_cbse_08_002) की.',
                  misconception: 'छात्रों में यह गलतफहमी होती है कि चर्चा-बिंदु तैयार करने के लिए केवल पाठ का सारांश देना suficiente है — जैसे कहना कि "पत्र में दोस्त ने मदद.' }
          ],
            remediations: { 'suficiente': { steps: ['छात्र को दिखाइए कि सारांश और विश्लेषण में अंतर कैसे है — उदाहरण के लिए, सारांश: "राजा ने कर बढ़ा दिए" बनाम विश्लेषण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
