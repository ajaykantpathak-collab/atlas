import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch10_p1: SimDef = {
    id: 'v3_c11_hin_a_ch10_p1',
    title: 'पाठ 10 · Part 1/3',
    subtitle: 'इस नोड में कक्षा 11 हिंदी अंतरा के पाठ 10 के रचनाकार के जीवन परिचय, साहित्यिक योगदान.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 10 · Part 1/3',
    chapters: ['c11_hin_a_ch10'],
    nodeIds: ['c11_hin_a_cbse_10_001', 'c11_hin_a_cbse_10_002', 'c11_hin_a_cbse_10_003', 'c11_hin_a_cbse_10_004', 'c11_hin_a_cbse_10_005', 'c11_hin_a_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आपको किसी अनजान व्यक्ति का लिखा एक भावुक पत्र पढ़ने को मिले — क्या आप बिना जाने कि वह कौन था.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक यात्रा, रचनाकालीन सामाजिक-सांस्कृतिक-राजनीतिक परिस्थितियों तथा उस कृति की रचना-प्रक्रिया एवं प्रकाशन-इतिहास.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — पृष्ठभूमि', 'पाठ 10 — कथानक', 'पाठ 10 — पाठ्य-परिवेश', 'पाठ 10 — पात्र-चित्रण', 'पाठ 10 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 1/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — **कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect).', answer: '10 -', options: ['10 -', '10 -'] },
            { id: 's2', label: '10 -', prompt: 'Which idea is this? — **पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक.', answer: '10 -', options: ['10 -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी.',
          hint: 'अगर अटके तो \'आधुनिक काल की पृष्ठभूमि\' (भारतेन्दु युग, द्विवेदी युग, छायावाद, प्रगतिवाद.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार का **बायोडेटा** (जन्म.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'अगर अटके तो \'आधुनिक काल की पृष्ठभूमि\' (भारतेन्दु युग, द्विवेदी युग, छायावाद, प्रगतिवाद, प्रयोगवाद).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार का **बायोडेटा** (जन्म, मृत्यु, शिक्षा, नौकरी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार:** (1) **पृथक्करण (Unlearn):** छात्र से कहें — "रचनाकार की जन्मतिथि भूल जाइए; मुझे बताइए उनके जीवन की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_002', difficulty: 'standard',
          question: '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause →.',
          hint: 'यदि फंसे तो: c11_hin_a_cbse_10_001 का \'रचनाकार परिचय\' खंड पुनः पढ़ें — विशेषतः प्रेमचंद.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'घटनाक्रम\' (sequence of events)** को **\'संरचना\' (structure)** मान लेते हैं क्योंकि NCERT.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),',
                  options: ['**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि फंसे तो: c11_hin_a_cbse_10_001 का \'रचनाकार परिचय\' खंड पुनः पढ़ें — विशेषतः प्रेमचंद का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'घटनाक्रम\' (sequence of events)** को **\'संरचना\' (structure)** मान लेते हैं क्योंकि NCERT पाठ्यपुस्तकें प्रायः.' }
          ],
            remediations: { 'sequence-of-events-structure-ncert': { steps: ['**चरण 1 (भेद स्पष्ट करें):** छात्र से कहें: "एक ही घटनाक्रम को दो तरह से सुनाओ — पहले सीधे (रैखिक), फिर अंत से शुरू.', 'रूप** का भेद अनुभवजन्य बनाता है। 2.', '**चरण 2 (फ्रेटाग पिरामिड अनुप्रयोग):** \'नमक का दारोगा\' के 5 प्रमुख बिंदु छात्र से बुलवाकर बोर्ड पर फ्रेटाग पिरामिड पर.', 'तो संरचना क्या कहलाएगी?" — **वृत्ताकार संरचना** स्वयं उभरेगी। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_10_002 (कथानक संरचना)** के \'चरम बिंदु\' वाले भाग को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'परिवेश वर्णन\' का अर्थ केवल स्थान का चित्र खींचना है** (जैसे — \'गाँव में कुआँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक',
                  options: ['**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_10_002 (कथानक संरचना)** के \'चरम बिंदु\' वाले भाग को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'परिवेश वर्णन\' का अर्थ केवल स्थान का चित्र खींचना है** (जैसे — \'गाँव में कुआँ था, मंदिर था, पीपल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — *"पाठ का कोई एक पैराग्राफ चुनो जहाँ केवल स्थान का वर्णन हो। अब बताओ: यदि यह कुआँ/पहाड़/सड़क.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें.',
          hint: 'यदि फँसें तो: **पाठ का पुनर्वाचन (re-reading)** करें और नायक के हर प्रवेश/संवाद/उल्लेख पर.',
          misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण में पात्र के **सभी गुणों** को क्रमवार सूचीबद्ध करना होता है — जितने अधिक गुण, उतने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि फँसें तो: **पाठ का पुनर्वाचन (re-reading)** करें और नायक के हर प्रवेश/संवाद/उल्लेख पर.',
                  misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण में पात्र के **सभी गुणों** को क्रमवार सूचीबद्ध करना होता है — जितने अधिक गुण, उतने अधिक अंक।" **गलत तर्क.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट करें:** "गुण गिनाना नहीं, **एक गुण को गहराई से खोदना** है — जैसे पुरातत्वविद् एक ही मिट्टी की परत को बार-बार.', '**अभ्यास कराएँ:** पाठ से **एक ही गुण** चुनकर उसके **तीन प्रसंग** ढूँढ़ने को कहें — फिर प्रत्येक के लिए PEEL पैराग्राफ़.', '**तुलना दिखाएँ:** दो नमूना उत्तर रखें — एक \'गुण-सूची\' वाला (कम अंक), एक \'गहन विश्लेषण\' वाला (पूरे अंक) — छात्र को स्वयं.', '**आदत बनाएँ:** हर चित्रण लेखन से पहले **\'गुण-प्रमाण तालिका\' (Trait-Evidence Table)** बनाना अनिवार्य करें — कॉलम: गुण |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो प्रमुख पात्र.',
          hint: 'यदि अटका हुआ महसूस हो, तो **नोड 004 (पात्र-चित्रण: नायक)** के \'कार्यित उदाहरण\' (worked.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का विश्लेषण\' का अर्थ है — उस पात्र का **अलग से चरित्र-चित्रण लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका)',
                  options: ['सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका)', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **नोड 004 (पात्र-चित्रण: नायक)** के \'कार्यित उदाहरण\' (worked examples).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का विश्लेषण\' का अर्थ है — उस पात्र का **अलग से चरित्र-चित्रण लिख देना** (उसका स्वभाव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अवधारणा स्पष्ट करें:** छात्र से पूछें: *"यदि नायक अकेला होता, तो पाठक उसके मन की बात कैसे जानता?"* → उत्तर.', 'पाठ से 1 संवाद/प्रसंग दो।"* **चरण 3 — टेम्पलेट दें:** बोर्ड उत्तर का ढांचा: **(1) भूमिका नाम दें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** is the central, universal idea or insight about.',
          hint: 'If stuck, review **पात्र-चित्रण: नायक (c11_hin_a_cbse_10_004)** — focus on the \'character.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी अक्सर मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट रूप से लिखा हुआ एक वाक्य** होता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Main Theme)** is the central, universal idea or insight about human',
                  options: ['**मुख्य विषय (Main Theme)** is the central, universal idea or insight about human', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के रचनाकार के जीवन-परिचय, उनकी साहित्यिक', '**कथानक (Plot)** is the logical, causal sequence of events in a story (cause → effect),', '**पाठ्य-परिवेश (Textual Setting)** किसी रचना में वर्णित स्थान, काल, सामाजिक-सांस्कृतिक'],
                  hint: 'If stuck, review **पात्र-चित्रण: नायक (c11_hin_a_cbse_10_004)** — focus on the \'character choice →.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी अक्सर मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट रूप से लिखा हुआ एक वाक्य** होता है जिसे बस ढूँढ़कर निकालना.' }
          ],
            remediations: { 'implied': { steps: ['**पुनः पढ़ें (Re-read with lens):** विद्यार्थी से कहें — "पाठ 10 के केवल **तीन निर्णायक क्षण** (turning points) चुनो.', '**प्रश्न पूछो (Interrogate):** प्रत्येक क्षण पर पूछें — "पात्र ने *यह* रास्ता क्यों चुना?', 'इससे मनुष्य/समाज के बारे में क्या पता चलता है?" (यह \'क्या हुआ\' से \'क्या अर्थ\' पर लाता है)। 3.', '**पैटर्न ढूंढो (Find pattern):** तीनों उत्तरों में कौन-सा शब्द/विचार दोहराया जा रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
