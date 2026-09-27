import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch11_p1: SimDef = {
    id: 'v3_c6_hin_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'यह नोड केवल पृष्ठभूमि (ऐतिहासिक/सामाजिक/सांस्कृतिक संदर्भ) और रचनाकार के जीवन-परिचय व.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c6_hin_ch11'],
    nodeIds: ['c6_hin_cbse_11_001', 'c6_hin_cbse_11_002', 'c6_hin_cbse_11_003', 'c6_hin_cbse_11_004', 'c6_hin_cbse_11_005', 'c6_hin_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने दादी से एक पुरानी कहानी सुनी — "बचपन में हमारे गाँव में बिजली नहीं थी, हम लालटेन में पढ़ते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी साहित्यिक कृति के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ (पृष्ठभूमि) और रचनाकार के जीवन की प्रमुख घटनाएँ, विचारधारा तथा लेखन शैली (रचनाकार परिचय) को समझना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित.', answer: '11 -', options: ['11 -', '11 -'] },
            { id: 's2', label: '11 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय.', answer: '11 -', options: ['11 -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी साहित्यिक कृति के लिखे जाने का.',
          hint: 'अगर छात्र अटका है, तो उसे पाठ्यपुस्तक के पिछले अध्यायों (जैसे पाठ 1-10) के शुरुआती पन्ने.',
          misconception: 'छात्र अक्सर समझते हैं कि \'रचनाकार परिचय\' का अर्थ केवल लेखक का जन्म-वर्ष, मृत्यु-वर्ष, प्रसिद्ध रचनाएँ और पुरस्कार रट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र (विशेषकर'],
                  hint: 'अगर छात्र अटका है, तो उसे पाठ्यपुस्तक के पिछले अध्यायों (जैसे पाठ 1-10) के शुरुआती पन्ने खोलकर.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'रचनाकार परिचय\' का अर्थ केवल लेखक का जन्म-वर्ष, मृत्यु-वर्ष, प्रसिद्ध रचनाएँ और पुरस्कार रट लेना है। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "चलो एक खेल खेलते हैं — तुम अपने किसी दोस्त के बारे में तीन बातें बताओ जो केवल तुम जानते हो (जैसे: उसे.', 'फिर पूछो: "अगर वही दोस्त एक कहानी लिखे जिसमें एक बच्चा अंधेरे कमरे में डरता है, बाएँ हाथ से चिट्ठी लिखता है, और दादी की.', 'अब समझाओ: "ठीक ऐसे ही रचनाकार के जीवन की खास बातें उसकी रचना में \'छुपी\' होती हैं। रचनाकार परिचय पढ़ते समय केवल तथ्य मत.', 'अभ्यास के लिए पाठ 11 के रचनाकार की एक जीवन-घटना चुनो और पाठ से एक प्रसंग मिलाकर दिखाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में.',
          hint: 'यदि अटका हो तो \'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय\' दोहराकर पात्र-सूची और केंद्रीय.',
          misconception: 'छात्र समझते हैं कि **\'कथानक\' का अर्थ केवल \'घटनाओं की सूची (List of Events)\' है**। उदाहरण: "पहला राम वन गया, फिर सीता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र (विशेषकर'],
                  hint: 'यदि अटका हो तो \'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय\' दोहराकर पात्र-सूची और केंद्रीय संघर्ष लिख लें।',
                  misconception: 'छात्र समझते हैं कि **\'कथानक\' का अर्थ केवल \'घटनाओं की सूची (List of Events)\' है**। उदाहरण: "पहला राम वन गया, फिर सीता हरी गई, फिर युद्ध हुआ.' }
          ],
            remediations: { 'list-of-events': { steps: ['छात्र को एक अत्यंत सरल दैनिक घटना दें (जैसे: \'अलार्म बजा → उठे → बस पकड़ी → देर से पहुँचे → डाँट पड़ी\')। 2.', 'उससे पूछें: "अगर अलार्म न बजा होता, तो क्या बस पकड़ते?', 'अगर बस पकड़ लेते, तो क्या डाँट पड़ती?" 3.', 'तीर (→) खींचकर **कारण-परिणाम श्रृंखला** बनवाएं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'कथानक और आख्यान-संरचना\' (c6_hin_cbse_11_002)** दोहराएँ.',
          misconception: 'छात्र अक्सर **\'परिवेश\' (setting) को केवल \'स्थान\' (place) समझ लेते हैं** — जैसे "कहानी गाँव में घटती है" लिखकर पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय',
                  options: ['पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र (विशेषकर'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'कथानक और आख्यान-संरचना\' (c6_hin_cbse_11_002)** दोहराएँ — विशेष रूप से.',
                  misconception: 'छात्र अक्सर **\'परिवेश\' (setting) को केवल \'स्थान\' (place) समझ लेते हैं** — जैसे "कहानी गाँव में घटती है" लिखकर पूरा उत्तर मान लेते हैं। वे.' }
          ],
            remediations: { 'setting-place': { steps: ['**पहला कदम:** छात्र को एक परिचित दृश्य (स्कूल का मैदान, घर की रसोई, बाज़ार) दें और कहें: *"आँखें बंद करो और बताओ.', '**दूसरा कदम:** किसी छोटे पाठ अंश (3-4 वाक्य) में **स्थान/समाज/समय/माहौल के शब्दों को अलग-अलग रंग से घेरना** सिखाएँ.', '**तीसरा कदम:** पूछें: *"अगर यह कहानी पहाड़ के गाँव के बजाय शहर के फ्लैट में होती, तो पात्र का व्यवहार कैसे बदलता?"*.', '**चौथा कदम:** छात्र से **एक वाक्य में उत्तर लिखवाएँ**: "इस कहानी का परिवेश ______ है, जो पात्र को ______ करने के लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र.',
          hint: 'यदि अटका हुआ लगे तो **कथानक आरेख (plot diagram)** पर लौटकर नायक के तीन प्रमुख.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "नायक अच्छा/बहादुर/सुंदर होता है" — यह **रूढ़िबद्ध सोच (stereotyping)** है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र (विशेषकर',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विधा है जिसमें कहानी के किसी पात्र (विशेषकर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटका हुआ लगे तो **कथानक आरेख (plot diagram)** पर लौटकर नायक के तीन प्रमुख निर्णय-बिंदु चिह्नित.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "नायक अच्छा/बहादुर/सुंदर होता है" — यह **रूढ़िबद्ध सोच (stereotyping)** है, पात्र-चित्रण नहीं। वे नायक.' }
          ],
            remediations: { 'stereotyping': { steps: ['**मॉडलिंग:** एक परिचित पात्र (जैसे \'पंचतंत्र\' का शेर या \'चंदामामा\' का चरित्र) लेकर शिक्षक स्वयं दो चित्रण लिखे — एक.', '**रंग-कोडिंग:** छात्रों को पाठ दें और तीन रंगों से चिह्नित करने को कहें: पीला = बाह्य विवरण, हरा = संवाद/क्रिया प्रमाण.', '**\'क्यों\' का खेल:** हर गुण के बाद छात्र से पूछें "पाठ में कहाँ लिखा है?" — जब तक वह विशिष्ट पंक्ति न दिखा दे, गुण.', '**तुलना अभ्यास:** दो विरोधी पात्रों (नायक-खलनायक या नायक-सहायक) का समानांतर चित्रण करवाएँ ताकि अंतर स्पष्ट हो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके तो नोड 004 के \'पात्र-विश्लेषण चेकलिस्ट\' (गुण, दोष, संवाद, कार्य, विचार, संबंध).',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'सहायक पात्र\' = \'कम महत्त्वपूर्ण पात्र\'। वे यह नहीं देख पाते कि सहायक पात्र कथानक का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटके तो नोड 004 के \'पात्र-विश्लेषण चेकलिस्ट\' (गुण, दोष, संवाद, कार्य, विचार, संबंध) को दोहराएँ.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'सहायक पात्र\' = \'कम महत्त्वपूर्ण पात्र\'। वे यह नहीं देख पाते कि सहायक पात्र कथानक का **इंजन** होते हैं: वे नायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "अपनी प्रिय फ़िल्म का कोई दृश्य चुनो जहाँ नायक अकेला हो — अब कल्पना करो कि वहाँ सहायक पात्र आ जाता है।.', 'फिर पाठ से एक सहायक पात्र चुनकर उसके **केवल तीन संवाद/कार्य** ढूँढने को कहो जो नायक के बारे में कुछ नया बताते हों। 3.', 'अंत में पूछो: "अगर यह पात्र हटा दिया जाए तो कहानी का अंत कैसे बदलेगा?" — इस \'क्या-अगर\' (counterfactual) प्रश्न से पात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_006', difficulty: 'standard',
          question: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी.',
          hint: 'यदि अटके तो **कथानक आरेख** (Story Map) बनाएँ: शुरुआत → मध्य (संघर्ष) → अंत → प्रत्येक चरण.',
          misconception: 'छात्र समझते हैं कि **शीर्षक** (Title) या **नैतिक शिक्षा** (Moral) ही मुख्य विषय है। उदाहरण: कहानी "शेर और चूहे" का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी कहानी/कविता में',
                  options: ['मुख्य विषय (Main Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी कहानी/कविता में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटके तो **कथानक आरेख** (Story Map) बनाएँ: शुरुआत → मध्य (संघर्ष) → अंत → प्रत्येक चरण में नायक.',
                  misconception: 'छात्र समझते हैं कि **शीर्षक** (Title) या **नैतिक शिक्षा** (Moral) ही मुख्य विषय है। उदाहरण: कहानी "शेर और चूहे" का शीर्षक पढ़कर वे विषय.' }
          ],
            remediations: { 'title-moral': { steps: ['छात्र को एक परिचित कहानी (जैसे "प्यासा कौआ") दें और पूछें: "कहानी में कौआ क्या-क्या करता है?" (घटनाएँ सूचीबद्ध करवाएँ)।.', 'फिर पूछें: "कौए की कौन-सी आदत बार-बार दिखी?" (पुनरावृत्ति: प्रयास करना, उपाय खोजना)। 3.', 'अब कहें: "इस आदत को एक शब्द/वाक्य में बताओ" → "धैर्य और बुद्धि से समस्या हल होती है" = विषय। 4.', 'अंत में कहें: "तुम्हारे जीवन में इसका क्या उपयोग है?" → "हार मत मानो, उपाय खोजो" = संदेश। इस **घटना → पैटर्न → विषय →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
