import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch10_p3: SimDef = {
    id: 'v3_c11_hin_a_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'यह नोड **केवल** पाठ 10 के संदर्भ में विश्लेषण और व्याख्या की **प्रक्रिया** और **लेखन.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 10 · Part 3/3',
    chapters: ['c11_hin_a_ch10'],
    nodeIds: ['c11_hin_a_cbse_10_013', 'c11_hin_a_cbse_10_014', 'c11_hin_a_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए बोर्ड परीक्षा में प्रश्न आया: *"पाठ 10 में प्रयुक्त \'अंधेरे\' के प्रतीक की व्याख्या कीजिए।"*.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी साहित्यिक पाठ के घटकों (कथानक, पात्र, भाषा, शिल्प) का **विश्लेषण** (Analysis) करके उनके पारस्परिक संबंधों और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — आलोचनात्मक', 'पाठ 10 — लेखन', 'पाठ 10 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 3/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the structured ability to compose.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक पाठ.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 10 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 और 009** (साहित्यिक युक्तियाँ) दोबारा पढ़ें और पाठ में.',
          misconception: '**भ्रांति:** *"आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'।"* **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 और 009** (साहित्यिक युक्तियाँ) दोबारा पढ़ें और पाठ में.',
                  misconception: '**भ्रांति:** *"आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'।"* **वास्तविकता:** \'Critical\' का मूल लैटिन.' }
          ],
            remediations: { 'critical-criticus': { steps: ['**शब्द स्पष्टीकरण:** छात्र से कहें: *"\'Critical\' का अर्थ \'निंदा\' नहीं, \'सूक्ष्म परीक्षण\' (Scrutiny) है। जैसे डॉक्टर.', '**मॉडल उत्तर दिखाएँ:** एक ही प्रश्न के दो उत्तर दें — एक \'निंदा-शैली\' में, दूसरा \'विवेचन-शैली\' में (PEEL संरचना में)।.', '**अभ्यास दें:** पाठ 10 के किसी एक छोटे अंश (4-5 पंक्तियाँ) दें और कहें: *"इसका \'आलोचनात्मक विश्लेषण\' कीजिए — अर्थात्.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the structured ability.',
          hint: 'यदि फँसें तो: **c11_hin_a_cbse_10_013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ दिए गए.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन में \'अच्छा उत्तर\' वही है जिसमें पाठ के अधिकतम उद्धरण (quotes) ठूँस दिए जाएँ।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the structured ability to compose',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the structured ability to compose', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि फँसें तो: **c11_hin_a_cbse_10_013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ दिए गए विश्लेषणात्मक.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन में \'अच्छा उत्तर\' वही है जिसमें पाठ के अधिकतम उद्धरण (quotes) ठूँस दिए जाएँ।" **गलत तर्क:** छात्र.' }
          ],
            remediations: { 'quotes-class-10-class-11': { steps: ['**मॉडलिंग:** छात्र को एक ही प्रश्न के दो उत्तर दिखाएँ — एक \'केवल उद्धरण\' वाला (कम अंक), एक \'PEEL संरचित\' वाला (पूरे.', '**संयुक्त अभ्यास:** एक छोटा प्रसंग दें (4-5 पंक्तियाँ)। कहें: "इससे नायक की \'निर्णयहीनता\' सिद्ध करने के लिए **केवल एक**.', '**फीडबैक लूप:** उनके Explanation में \'विश्लेषणात्मक क्रियाविशेषण\' (analytical adverbs) गिनें — \'केवल\', \'मात्र\', \'वास्तव.', '**स्व-मूल्यांकन चेकलिस्ट:** दें: □ Point प्रश्न का सीधा उत्तर?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_10_013 (आलोचनात्मक चिंतन: विश्लेषण और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'चर्चा-बिंदु\' = \'पाठ से प्रश्न बनाना\' (question-framing from text)** — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक पाठ',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक पाठ', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_10_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'चर्चा-बिंदु\' = \'पाठ से प्रश्न बनाना\' (question-framing from text)** — जैसे परीक्षा में पूछे जाने.' }
          ],
            remediations: { 'question-framing-from-text': { steps: ['**भेद स्पष्ट करें**: छात्र के सामने **परीक्षा-प्रश्न** और **चर्चा-बिंदु** के 5-5 उदाहरण साथ रखें — उसे **स्वयं अंतर.', '**\'क्यों/कैसे\' का अभ्यास**: उसे किसी भी पाठ-अंश से **केवल \'क्यों/कैसे\' से शुरू होने वाले 5 प्रश्न** बनाने को कहें जिनका.', '**श्रेणी-आधारित निर्माण**: उसे **6 श्रेणी-कार्ड** दें (थीम, शिल्प, भाषा, पात्र, प्रतीक, सरोकार) — प्रत्येक कार्ड से.', '**मॉडरेशन अभ्यास**: तीन छात्रों का समूह बनाएँ — एक **प्रस्तुतकर्ता**, एक **प्रतिपक्षी**, एक **मॉडरेटर** — 10 मिनट की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
