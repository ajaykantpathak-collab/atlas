import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch03_p3: SimDef = {
    id: 'v3_c11_hin_a_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'अंतरा\' पाठ्यक्रम के पाठ 3 के संदर्भ में **आलोचनात्मक विश्लेषण और.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c11_hin_a_ch03'],
    nodeIds: ['c11_hin_a_cbse_03_013', 'c11_hin_a_cbse_03_014', 'c11_hin_a_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आपने एक फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — आप कहते हैं "अच्छी थी" (यह.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ (text) के तथ्यों, तर्कों, साक्ष्यों और अंतर्निहित पूर्वधारणाओं (assumptions) का व्यवस्थित परीक्षण करके उनके तार्किक औचित्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह भाषाई दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_03_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ (text).',
          hint: 'यदि अटके हों तो **c11_hin_a_cbse_03_008 (बिंब/रूपक)** और **c11_hin_a_cbse_03_009.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' = \'कमियाँ निकालना\' (finding faults)** या **\'असहमति जताना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ (text) के तथ्यों,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ (text) के तथ्यों,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-काल की ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Causal Sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (textual environment) refers to the physical, social, cultural, and'],
                  hint: 'यदि अटके हों तो **c11_hin_a_cbse_03_008 (बिंब/रूपक)** और **c11_hin_a_cbse_03_009.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' = \'कमियाँ निकालना\' (finding faults)** या **\'असहमति जताना\' (disagreeing)**। **गलत.' }
          ],
            remediations: { 'finding-faults-disagreeing-criticism-negative': { steps: ['**चरण 1 — शब्द स्पष्टीकरण:** छात्र से कहें: "\'आलोचनात्मक\' का मूल \'आलोक\' (light) है — वस्तु पर प्रकाश डालना, न कि उस पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह भाषाई दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक.',
          hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_03_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ में जो लिखा है, उसे अपने शब्दों में दोहरा देना (paraphrasing).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह भाषाई दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ',
                  options: ['पाठ-आधारित लेखन कौशल वह भाषाई दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-काल की ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Causal Sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (textual environment) refers to the physical, social, cultural, and'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_03_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के कार्यित.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ में जो लिखा है, उसे अपने शब्दों में दोहरा देना (paraphrasing) — बस भाषा बदलनी है, नया.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**\'क्या vs क्यों\' अभ्यास (What vs Why Drill):** छात्र को पाठ के 5 वाक्य दें। प्रत्येक के आगे दो कॉलम बनवाएँ: \'पाठ क्या.', '**PEEL टेम्पलेट अनिवार्यीकरण:** प्रत्येक उत्तर-लेखन अभ्यास में छात्र को पहले रफ शीट पर PEEL ग्रिड भरना होगा — तभी फेयर.', '**\'एक उद्धरण, तीन व्याख्या\' खेल:** एक ही उद्धरण (जैसे: "मैं तुम्हारे यहाँ नौकर नहीं हूँ") देकर छात्र से तीन भिन्न कोणों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_03_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"चर्चा-बिंदु" का अर्थ है "सबकी राय सुनकर बहुमत से निष्कर्ष निकालना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-काल की ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का कारण-कार्य संबंध (Causal Sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (textual environment) refers to the physical, social, cultural, and'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_03_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"चर्चा-बिंदु" का अर्थ है "सबकी राय सुनकर बहुमत से निष्कर्ष निकालना" (Consensus-building)**। **गलत.' }
          ],
            remediations: { 'consensus-building-debate-voting': { steps: ['**चरण 1 — स्पष्टीकरण (Clarify):** छात्र से कहें: *"चर्चा में \'सही/गलत\' नहीं, \'सिद्ध/असिद्ध\' होता है। तुम्हारी राय तभी.', 'क्या पाठ में ऐसा कुछ है जो दोनों को समेट ले?"* — यह **आलोचनात्मक परिपक्वता (Critical Maturity)** विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
