import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch07_p3: SimDef = {
    id: 'v3_c8_hin_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'यह नोड पाठ 7 के संदर्भ में विश्लेषण और व्याख्या की उच्च-क्रम सोच कौशल (Higher Order.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c8_hin_ch07'],
    nodeIds: ['c8_hin_cbse_07_013', 'c8_hin_cbse_07_014', 'c8_hin_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'क्या आपने कभी कोई फिल्म दो बार देखी है और दूसरी बार ऐसी छोटी-छोटी बातें नोटिस कीं जो पहली बार छूट गई थीं.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 7 के एक चर्चा-बिंदु पर विचार करें: *"क्या सहायक पात्र का बलिदान अनावश्यक था?"* इस प्रश्न का उत्तर देने के लिए आप टेक्स्ट से किन **दो विशिष्ट प्रसंगों** को.',
        options: ['**Correct Answer (Sample Steps):** 1', 'unnecessary', 'when he cried'],
        answer: '**Correct Answer (Sample Steps):** 1',
        hook: 'Students believe **"चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं"** (There is one correct answer to.',
    },
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की प्रक्रिया है जिसमें पाठ के तथ्यों, भाषा-शैली, पात्रों के निर्णयों और विषय-वस्तु को तार्किक आधार पर जाँचा-परखा जाता है ताकि.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_015', title: 'पाठ 7 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: 'Think about the last time you tried to convince your parents to let you go on a school trip — you didn\'t just say "please," you gave reasons: "The fees are.',
            decisions: [{ prompt: 'पाठ 7 के संदर्भ में \'चर्चा-बिंदु\' और \'बोध-प्रश्न\' में मूलभूत अंतर क्या है? संक्षेप में बताइए।', options: [
                { text: '**Correct Answer:** बोध-प्रश्न (Comprehension questions) टेक्स्ट में दी गई जानकारी को याद', outcome: '**Correct Answer:** बोध-प्रश्न (Comprehension questions) टेक्स्ट में दी गई जानकारी को याद करने या.' },
                { text: ')। **Wrong Answer Reveals:** If', outcome: 'Not quite — Students believe **"चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं"** (There is one.', reveals: 'there-is-one-correct-answer' },
                { text: 'चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं', outcome: 'Not quite — Students believe **"चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं"** (There is one.', reveals: 'there-is-one-correct-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की.',
          hint: 'यदि फँस जाएँ तो c8_hin_cbse_07_009 (विरोधाभास और प्रतीक) और c8_hin_cbse_07_006 (मुख्य.',
          misconception: 'छात्र प्रायः \'विश्लेषण\' (analysis) को \'वर्णन\' (description) या \'भावार्थ\' (paraphrase) समझ बैठते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की प्रक्रिया है',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की प्रक्रिया है', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि फँस जाएँ तो c8_hin_cbse_07_009 (विरोधाभास और प्रतीक) और c8_hin_cbse_07_006 (मुख्य विषय) पर वापस.',
                  misconception: 'छात्र प्रायः \'विश्लेषण\' (analysis) को \'वर्णन\' (description) या \'भावार्थ\' (paraphrase) समझ बैठते हैं। वे लिखते हैं: "लेखक ने बरगद के पेड़ का.' }
          ],
            remediations: { 'analysis-description-paraphrase': { steps: ['छात्र को एक छोटा प्रसंग (3-4 पंक्तियाँ) दें और केवल तीन प्रश्न पूछने को कहें: (क) यहाँ कौन-सी साहित्यिक युक्ति प्रयुक्त.', '(ख) इसका शाब्दिक अर्थ क्या है?', '(ग) इसका गहरा अर्थ (connotative meaning) क्या है?', 'फिर कहें: "अब इन तीनों उत्तरों को जोड़कर एक वाक्य लिखो जो बताए कि लेखक ने यह युक्ति *यहाँ* और *इस रूप में* क्यों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/पद्य) के प्रश्न का.',
          hint: 'यदि अटके तो **कक्षा ७ पाठ ७ — लेखन कौशल: पाठ-आधारित (c7_hin_cbse_07_014)** के PEEL अभ्यास.',
          misconception: 'छात्र समझते हैं कि **"पाठ की बातें याद करके लिख देना ही पाठ-आधारित लेखन है"**。 वास्तव में परीक्षक **आपकी सोच की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/पद्य) के प्रश्न का उत्तर **PEEL',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/पद्य) के प्रश्न का उत्तर **PEEL', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटके तो **कक्षा ७ पाठ ७ — लेखन कौशल: पाठ-आधारित (c7_hin_cbse_07_014)** के PEEL अभ्यास दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि **"पाठ की बातें याद करके लिख देना ही पाठ-आधारित लेखन है"**。 वास्तव में परीक्षक **आपकी सोच की प्रक्रिया** देखता है: आप.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र से कहें — "अपना उत्तर पढ़ो और बताओ: यहाँ पाठ की कौन-सी **ठीक-ठीक पंक्ति** तुम्हारे दावे को सहारा देती.', 'अपने शब्दों में बोलो।" जो बोला वही Explanation है — लिखवा दें। **चरण ४:** अंत में कहें — "अब एक वाक्य लिखो जो इस दावे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) are structured prompts or open-ended questions.',
          hint: 'If stuck, review **c8_hin_cbse_07_013 (आलोचनात्मक चिंतन)** — specifically the worked.',
          misconception: 'Students believe **"चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं"** (There is one correct answer to.',
          parts: [
                { id: 'a', prompt: 'पाठ 7 के एक चर्चा-बिंदु पर विचार करें: *"क्या सहायक पात्र का बलिदान अनावश्यक था?"* इस प्रश्न का उत्तर देने के लिए आप टेक्स्ट से किन **दो विशिष्ट प्रसंगों** को.', answer: '**Correct Answer (Sample Steps):** 1',
                  options: ['**Correct Answer (Sample Steps):** 1', 'unnecessary', 'when he cried', 'चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं'],
                  hint: 'If stuck, review **c8_hin_cbse_07_013 (आलोचनात्मक चिंतन)** — specifically the worked examples.',
                  misconception: 'Students believe **"चर्चा-बिंदु का एक ही सही उत्तर होता है जो शिक्षक जानते हैं"** (There is one correct answer to a discussion point known.' }
          ],
            remediations: { 'there-is-one-correct-answer': { steps: ['**Normalize Ambiguity:** Explicitly state: "इस प्रश्न का एक \'सही\' उत्तर नहीं है। दो विपरीत उत्तर भी सही हो सकते हैं अगर.', 'Two opposite answers can both be right if both have textual proof.) 2.', '**Model "Evidence Sandwich":** Practice the **Stand → Evidence → Explanation** structure orally in pairs using.', '**Use "Devil\'s Advocate" Cards:** Give students cards saying "Agree," "Disagree," "Add Evidence," "Ask for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
