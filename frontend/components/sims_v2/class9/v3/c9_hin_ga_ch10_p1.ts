import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch10_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch10_p1',
    title: 'पाठ 10 · Part 1/3',
    subtitle: 'This node covers only the contextual framing (author\'s biography, historical period.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 10 · Part 1/3',
    chapters: ['c9_hin_ga_ch10'],
    nodeIds: ['c9_hin_ga_cbse_10_001', 'c9_hin_ga_cbse_10_002', 'c9_hin_ga_cbse_10_003', 'c9_hin_ga_cbse_10_004', 'c9_hin_ga_cbse_10_005', 'c9_hin_ga_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Think about the last time you watched a movie set in a village — did you wonder why characters speak.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय', text: '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary circumstances surrounding the creation of a text, while "रचनाकार परिचय" (Author Introduction) encompasses the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — पृष्ठभूमि', 'पाठ 10 — कथानक', 'पाठ 10 — पाठ्य-परिवेश', 'पाठ 10 — पात्र-चित्रण', 'पाठ 10 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 1/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है.', answer: '10 -', options: ['10 -', '10 -'] },
            { id: 's2', label: '10 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान.', answer: '10 -', options: ['10 -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_10_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_001', difficulty: 'standard',
          question: '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural.',
          hint: 'If stuck, review Class 8 "लेखक परिचय" format and practice placing 5 Indian authors on.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पृष्ठभूमि" का अर्थ केवल **ऐतिहासिक तथ्य** (तारीखें, युद्ध, राजा) रटना है, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary',
                  options: ['"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'If stuck, review Class 8 "लेखक परिचय" format and practice placing 5 Indian authors on a 1850-1950.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पृष्ठभूमि" का अर्थ केवल **ऐतिहासिक तथ्य** (तारीखें, युद्ध, राजा) रटना है, और "रचनाकार परिचय" का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 10 के लेखक की **एक** ऐसी मान्यता बताओ जो उस समय **विवादास्पद** थी (जैसे.', '**चरण 2:** उसी मान्यता को लेकर पूछें: "कहानी में **कौन-सा पात्र** इस मान्यता का प्रतिनिधि है और **कौन-सा** उसका.', '**चरण 3:** छात्र से एक वाक्य लिखवाएँ: "लेखक की ___ मान्यता के कारण कहानी में ___ पात्र का ___ व्यवहार समझ में आता है।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति.',
          hint: 'यदि \'संघर्ष के प्रकार\' (मनुष्य बनाम मनुष्य, मनुष्य बनाम समाज, मनुष्य बनाम स्वयं, मनुष्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'चरमोत्कर्ष\' (Climax)** को कहानी का **"सबसे रोमांचक/एक्शन वाला दृश्य"** मानते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,',
                  options: ['कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि \'संघर्ष के प्रकार\' (मनुष्य बनाम मनुष्य, मनुष्य बनाम समाज, मनुष्य बनाम स्वयं, मनुष्य बनाम.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'चरमोत्कर्ष\' (Climax)** को कहानी का **"सबसे रोमांचक/एक्शन वाला दृश्य"** मानते हैं, जबकि संरचनात्मक परिभाषा है.' }
          ],
            remediations: { 'climax': { steps: ['**चरण 1 (अवधारणा स्पष्टीकरण):** छात्र से पूछें: "अगर कहानी यहीं रुक जाए, तो क्या संघर्ष हल हो गया?" अगर हाँ → वह.', '**चरण 2 (तुलनात्मक अभ्यास):** दो छोटे पैराग्राफ दें: एक में \'एक्शन पीक\' (लड़ाई), दूसरे में \'निर्णय पीक\' (माफी मांगना)।.', '**चरण 3 (पाठ-आधारित अनुप्रयोग):** पाठ्यपुस्तक के किसी पाठ (जैसे \'दुख का अधिकार\' या \'एवरेस्ट: मेरी शिखर यात्रा\') का.', '**चरण 4 (लेखन अभ्यास):** एक स्थिति दें (परीक्षा में नकल करते पकड़ा गया)। छात्र से दो अंत लिखवाएं: एक जहां चरमोत्कर्ष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 8 की पाठ्यपुस्तक \'वसंत\' के किसी कहानी पाठ (जैसे \'टोपी.',
          misconception: 'छात्र प्रायः मान लेते हैं कि **\'परिवेश केवल पृष्ठभूमि है, कथा का सक्रिय भाग नहीं\'** — इसलिए वे परिवेश का वर्णन करते समय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 8 की पाठ्यपुस्तक \'वसंत\' के किसी कहानी पाठ (जैसे \'टोपी शुक्ला\' या \'बस.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि **\'परिवेश केवल पृष्ठभूमि है, कथा का सक्रिय भाग नहीं\'** — इसलिए वे परिवेश का वर्णन करते समय केवल \'क्या था\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — इंद्रिय-लॉग बनाएँ:** पाठ 10 के किसी एक पृष्ठ को लेकर चार कॉलम बनाएँ: देखना, सुनना, सूँघना, छूना — प्रत्येक.', '**चरण 2 — शब्द-चयन की शल्य-क्रिया करें:** पूछें — "लेखक ने \'अंधेरा\' क्यों नहीं लिखा, \'अँधियारा\' क्यों लिखा?', '\'चुप्पी\' की जगह \'निस्तब्धता\' क्यों?" — प्रत्येक चयन के पीछे **भावनात्मक भार** (emotional weight) खोजें। 3.', '**चरण 3 — परिवेश→वातावरण→पात्र का त्रिकोण पूरा करें:** एक तीर खींचें: *विशिष्ट भौतिक विवरण → उत्पन्न वातावरण → नायक की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के.',
          hint: 'अगर अटके तो **कथानक-सारांश (plot summary) को घटना-क्रम (event sequence) में बदलें**.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = नायक के **गुणों की सूची (list of traits)** बनाना है (जैसे: ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'अगर अटके तो **कथानक-सारांश (plot summary) को घटना-क्रम (event sequence) में बदलें** — प्रत्येक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = नायक के **गुणों की सूची (list of traits)** बनाना है (जैसे: ईमानदार, बहादुर, दयालु)। वे.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**मॉडलिंग (5 मिनट):** एक परिचित पात्र (जैसे: \'नमक का दारोगा\' के मुंशी वंशीधर) लें और बोर्ड पर दो संस्करण लिखें.', '**साक्ष्य-खोज अभ्यास (10 मिनट):** पाठ से 3 प्रसंग दें; छात्र से कहें: "प्रत्येक प्रसंग से **एक गुण** निकालकर लिखो और.', '**PEEL ढांचा सिखाएं (5 मिनट):** Point (गुण), Evidence (प्रमाण), Explanation (कैसे सिद्ध होता है), Link (विषय/कथानक से.', '**स्व-मूल्यांकन चेकलिस्ट:** अगले अभ्यास के लिए दें: ☐ विषय-वाक्य ☐ 2+ प्रमाण ☐ व्याख्या ☐ विषय से लिंक।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक के साथ रहकर कथानक के.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक चित्रण) के \'WORKED_EXAMPLE_1\' को दोहराएँ और नायक.',
          misconception: 'छात्र समझते हैं कि **\'सहायक पात्र = कम महत्त्वपूर्ण पात्र\'**। वे लिखते हैं: "रामू नायक का दोस्त था, वह उसकी मदद करता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक के साथ रहकर कथानक के विकास में',
                  options: ['सहायक पात्र (Supporting Character) वह पात्र है जो नायक के साथ रहकर कथानक के विकास में', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक चित्रण) के \'WORKED_EXAMPLE_1\' को दोहराएँ और नायक के तीन.',
                  misconception: 'छात्र समझते हैं कि **\'सहायक पात्र = कम महत्त्वपूर्ण पात्र\'**। वे लिखते हैं: "रामू नायक का दोस्त था, वह उसकी मदद करता था।" यह **विवरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ से **तीन ऐसे दृश्य चुनो जहाँ नायक अकेला है** और **तीन जहाँ सहायक पात्र साथ है**। दोनों सूचियों में.', 'फिर पूछें: "अगर सहायक पात्र हटा दिया जाए तो कौन-सी **घटनाएँ घट ही नहीं सकतीं**?" 3.', 'अंत में: "सहायक पात्र के **मुख्य गुण** को एक शब्द में लिखो (जैसे: व्यावहारिक, नैतिक, हास्य, विश्वासपात्र) और सिद्ध करो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** किसी रचना का **केंद्रीय विचार (Central Idea)** होता.',
          hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_10_002 (कथानक)** और **c9_hin_ga_cbse_10_004.',
          misconception: '**विषय = एक शब्द (जैसे "देशभक्ति", "त्याग", "प्रकृति")** — यह कक्षा 6-8 की आदत है। **कक्षा 9 की बोर्ड अपेक्षा:** विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Main Theme)** किसी रचना का **केंद्रीय विचार (Central Idea)** होता है जो',
                  options: ['**मुख्य विषय (Main Theme)** किसी रचना का **केंद्रीय विचार (Central Idea)** होता है जो', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_10_002 (कथानक)** और **c9_hin_ga_cbse_10_004.',
                  misconception: '**विषय = एक शब्द (जैसे "देशभक्ति", "त्याग", "प्रकृति")** — यह कक्षा 6-8 की आदत है। **कक्षा 9 की बोर्ड अपेक्षा:** विषय **हमेशा एक पूर्ण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान कराएँ:** छात्र से कहें — "पाठ की 3 सबसे महत्वपूर्ण पंक्तियाँ उठाओ जो तुम्हें लगीं कि \'यही बात लेखक कहना चाहता.', '**वाक्य बनवाएँ:** उन पंक्तियों को जोड़कर **एक \'क्यों/कैसे\' वाला वाक्य** बनाने को कहें — "लेखक कह रहा है कि ______.', '**सार्वभौमिकता जाँचें:** पूछें — "क्या यह वाक्य किसी दूसरे पाठ/फिल्म/जीवन पर भी लागू होता है?" यदि हाँ → विषय तैयार। 4.', '**अभ्यास:** रोज़ एक अनदेखा पैराग्राफ देकर **केवल विषय वाक्य लिखने** का 5-मिनट ड्रिल कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
