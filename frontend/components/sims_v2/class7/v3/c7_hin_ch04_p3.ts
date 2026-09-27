import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch04_p3: SimDef = {
    id: 'v3_c7_hin_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड पाठ के विश्लेषण और व्याख्या पर केंद्रित है—जैसे कि विषय, संदेश, पात्र के प्रेरणा.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c7_hin_ch04'],
    nodeIds: ['c7_hin_cbse_04_013', 'c7_hin_cbse_04_014', 'c7_hin_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना कीजिए आप अपनी कक्षा में एक कहानी पढ़ रहे हैं जहाँ मुख्य पात्र साइकिल चोरी करके अपने बीमार भाई की दवा.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ की सतही जानकारी से आगे बढ़कर उसके अर्थ, उद्देश्य, लेखक के दृष्टिकोण और पाठक पर प्रभाव का विश्लेषण करते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या दृष्टिकोण होते हैं जो किसी पाठ.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_04_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ की सतही जानकारी से आगे.',
          hint: 'मुख्य विषय और संदेश (c7_hin_cbse_04_006) की समीक्षा करें—यदि आप नहीं बता सकते कि पाठ क्या.',
          misconception: 'छात्र अक्सर सोचते हैं कि आलोचनात्मक चिंतन का मतलब है पाठ में जो बुरा या गलत है उसे खोजकर criticize करना—जैसे कहना कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ की सतही जानकारी से आगे बढ़कर उसके',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ की सतही जानकारी से आगे बढ़कर उसके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'मुख्य विषय और संदेश (c7_hin_cbse_04_006) की समीक्षा करें—यदि आप नहीं बता सकते कि पाठ क्या कहना.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आलोचनात्मक चिंतन का मतलब है पाठ में जो बुरा या गलत है उसे खोजकर criticize करना—जैसे कहना कि "पात्र मूर्ख था" या.' }
          ],
            remediations: { 'criticize': { steps: ['छात्र से पूछिए: "अगर आप उस पात्र की जगह होते, तो क्या आप भी ऐसा ही करते?', 'क्यों या क्यों नहीं?" इससे उसे पात्र के संदर्भ को समझने में मदद मिलेगी। फिर कहिए: "अब सोचिए, लेखक ने इस व्यवहार को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (कहानी, कविता, निबंध) को.',
          hint: 'यदि अटके, तो **\'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c7_hin_cbse_04_012)** और **\'मुख्य.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ-आधारित उत्तर" का अर्थ "पाठ का सारांश (Summary) लिखना" या "पाठ से लाइनें.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके, तो **\'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c7_hin_cbse_04_012)** और **\'मुख्य विषय और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ-आधारित उत्तर" का अर्थ "पाठ का सारांश (Summary) लिखना" या "पाठ से लाइनें कॉपी करना" है।** **गलत.' }
          ],
            remediations: { 'summary': { steps: ['**पहचान:** छात्र से पूछो: "तुमने जो लिखा, क्या वह **तुम्हारी अपनी बात (Point)** है या **पाठ की कहानी (Story)**?" यदि वह.', '**मॉडलिंग:** उसी प्रश्न का एक **कमजोर उत्तर (केवल सारांश)** और एक **मजबूत उत्तर (PEEL)** साथ-साथ दिखाओ। अंतर हाइलाइट.', '**संयुक्त अभ्यास:** एक नया सरल प्रश्न दो। पहले **केवल Point और Evidence** लिखवाओ। फिर **Explanation** जोड़वाओ। अंत में.', '**चेकलिस्ट द दो:** PEEL चेकलिस्ट (P?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या दृष्टिकोण होते हैं जो.',
          hint: 'यदि फँस जाएँ तो **c7_hin_cbse_04_013 (आलोचनात्मक चिंतन)** के \'प्रमाण-आधारित तर्क\' और.',
          misconception: 'छात्र अक्सर मान लेते हैं कि चर्चा-बिंदु का मतलब है **"अपनी राय जोर-शोर से रखना और दूसरों को मनवाना"**। वे चर्चा को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या दृष्टिकोण होते हैं जो किसी पाठ',
                  options: ['चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या दृष्टिकोण होते हैं जो किसी पाठ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि फँस जाएँ तो **c7_hin_cbse_04_013 (आलोचनात्मक चिंतन)** के \'प्रमाण-आधारित तर्क\' और \'विपरीत.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि चर्चा-बिंदु का मतलब है **"अपनी राय जोर-शोर से रखना और दूसरों को मनवाना"**। वे चर्चा को वाद-विवाद (debate) समझ.' }
          ],
            remediations: { 'debate-4': { steps: ['**मॉडल चर्चा दिखाओ:** शिक्षक दो छात्रों (या एक छात्र और खुद) के साथ 2 मिनट की एक आदर्श चर्चा का **रोल-प्ले** करे — जहाँ.', '**\'सुनने का नियम\' लागू करो:** अगली चर्चा में नियम बनाओ — "बोलने से पहले, पिछले वक्ता की बात अपने शब्दों में दोहराओ।".', '**चर्चा-बिंदु कार्ड बाँटो:** तैयार कार्ड (जैसे DIAGNOSTIC_QUESTION_6 में बना) दें ताकि संरचना स्पष्ट रहे — खुला प्रश्न.', '**प्रतिबिंबन (Reflection) कराओ:** चर्चा के बाद प्रत्येक बच्चे से पूछो: "तुम्हारी सोच में क्या बदला?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
