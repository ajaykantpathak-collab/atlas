import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch07_p3: SimDef = {
    id: 'v3_c11_hin_a_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'आलोचनात्मक चिंतन\' कौशल तक सीमित है: पाठ के आंतरिक साक्ष्य (internal.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c11_hin_a_ch07'],
    nodeIds: ['c11_hin_a_cbse_07_013', 'c11_hin_a_cbse_07_014', 'c11_hin_a_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'मान लीजिए आपने एक समाचार शीर्षक पढ़ा: *"शिक्षकों की हड़ताल से लाखों बच्चों का भविष्य अंधकारमय।"* पहला कदम.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के घटकों (भाषा, संरचना, तर्क, पूर्वाग्रह) को **विश्लेषण** (Analysis) करके उनके पारस्परिक संबंधों को समझा जाता है और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_07_013', title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: 'मान लीजिए आपने एक समाचार शीर्षक पढ़ा: *"शिक्षकों की हड़ताल से लाखों बच्चों का भविष्य अंधकारमय।"* पहला कदम: **रुकें और पूछें** — "किसके दृष्टिकोण से \'अंधकारमय\'?',
            decisions: [{ prompt: '\'विश्लेषण\' (Analysis) और \'व्याख्या\' (Interpretation) में मूलभूत अंतर क्या है? एक-एक वाक्य में लिखिए।', options: [
                { text: '**सही उत्तर:** विश्लेषण पाठ को उसके अवयवों (शब्द, वाक्य, बिंब, तर्क) में विघटित कर उनके', outcome: '**सही उत्तर:** विश्लेषण पाठ को उसके अवयवों (शब्द, वाक्य, बिंब, तर्क) में विघटित कर उनके **आंतरिक.' },
                { text: 'अर्थ समझाना', outcome: 'Not quite — **विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ **पाठ में कमियाँ निकालना**.', reveals: 'fault-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 7 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_07_008 (बिंब-रूपक)** और **c11_hin_a_cbse_07_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ **पाठ में कमियाँ निकालना** (fault-finding) या **लेखक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के', 'पृष्ठभूमि (Background) का अर्थ है पाठ की रचना के समय की **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) घटनाओं का वह तार्किक और कारणात्मक क्रम है जो कथावस्तु (Story) को कलात्मक ढंग', 'पाठ्य-परिवेश वह सामाजिक, ऐतिहासिक और सांस्कृतिक पृष्ठभूमि है जिसमें कोई पाठ लिखा गया है,'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_07_008 (बिंब-रूपक)** और **c11_hin_a_cbse_07_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ **पाठ में कमियाँ निकालना** (fault-finding) या **लेखक से असहमत होना** है।.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1 — भाषा बदलें:** छात्र से कहें: "आलोचना नहीं, **विवेचन** (examination) करो। जैसे कोई मैकेनिक इंजन खोलकर देखता है.', '"नायक स्वार्थी है" → "नायक के संवाद/कृत्य उसकी स्वार्थपरता को कैसे रचते हैं?") **चरण 3 — साक्ष्य-आधारित पुनर्लेखन:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_07_013 (आलोचनात्मक चिंतन)** के कार्य-उदाहरण दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित प्रश्न में पाठ की अधिक-से-अधिक बातें लिख देने से अंक मिलते हैं — जितना लंबा उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ (गद्य/पद्य)',
                  options: ['पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें शिक्षार्थी किसी दिए गए साहित्यिक पाठ (गद्य/पद्य)', 'पृष्ठभूमि (Background) का अर्थ है पाठ की रचना के समय की **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) घटनाओं का वह तार्किक और कारणात्मक क्रम है जो कथावस्तु (Story) को कलात्मक ढंग', 'पाठ्य-परिवेश वह सामाजिक, ऐतिहासिक और सांस्कृतिक पृष्ठभूमि है जिसमें कोई पाठ लिखा गया है,'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_07_013 (आलोचनात्मक चिंतन)** के कार्य-उदाहरण दोहराएँ — विशेषतः.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित प्रश्न में पाठ की अधिक-से-अधिक बातें लिख देने से अंक मिलते हैं — जितना लंबा उत्तर, उतने अच्छे अंक।"*.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से पूछें — *"प्रश्न का कौन-सा शब्द तय करता है कि उत्तर कैसा होना चाहिए?"* यदि वह निर्देशात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक रणनीति है जिसमें पाठ के गहन अध्ययन के.',
          hint: 'यदि अटके, तो **c11_hin_a_cbse_07_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें.',
          misconception: '**भ्रांति:** "चर्चा-बिंदु का मतलब है अपनी राय (opinion) देना — जो मन में आए बोल दो, गलत नहीं हो सकता।" **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक रणनीति है जिसमें पाठ के गहन अध्ययन के बाद, छात्रों',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक रणनीति है जिसमें पाठ के गहन अध्ययन के बाद, छात्रों', 'पृष्ठभूमि (Background) का अर्थ है पाठ की रचना के समय की **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) घटनाओं का वह तार्किक और कारणात्मक क्रम है जो कथावस्तु (Story) को कलात्मक ढंग', 'पाठ्य-परिवेश वह सामाजिक, ऐतिहासिक और सांस्कृतिक पृष्ठभूमि है जिसमें कोई पाठ लिखा गया है,'],
                  hint: 'यदि अटके, तो **c11_hin_a_cbse_07_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें — यह.',
                  misconception: '**भ्रांति:** "चर्चा-बिंदु का मतलब है अपनी राय (opinion) देना — जो मन में आए बोल दो, गलत नहीं हो सकता।" **वास्तविकता:** यह **सबसे घातक.' }
          ],
            remediations: { 'opinion': { steps: ['**चरण 1 — राय vs विश्लेषण का भेद स्पष्ट करें:** छात्र को दो वाक्य दें — (क) "मुझे अंत बुरा लगा।" (ख) "अंत में नायक की.', 'वह क्या कर रहा है?"* — जब तक छात्र स्वयं साक्ष्य न दे दे। **चरण 3 — मॉडल उत्तर दिखाएं:** उसी चर्चा-बिंदु पर एक **कमजोर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
