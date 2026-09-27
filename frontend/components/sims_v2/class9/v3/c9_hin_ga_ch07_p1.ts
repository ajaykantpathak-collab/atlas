import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch07_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'This node covers **only** the author\'s biographical details relevant to their writing.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c9_hin_ga_ch07'],
    nodeIds: ['c9_hin_ga_cbse_07_001', 'c9_hin_ga_cbse_07_002', 'c9_hin_ga_cbse_07_003', 'c9_hin_ga_cbse_07_004', 'c9_hin_ga_cbse_07_005', 'c9_hin_ga_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Think about your favorite movie — don\'t you understand the hero\'s anger better if you know the director grew.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical, cultural, and literary context** in which a text was written, alongside the **author\'s biography, literary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक.', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_001', difficulty: 'standard',
          question: '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the.',
          hint: 'If stuck, review the **Class 8 Hindi textbook\'s \'रचनाकार परिचय\' sections** of any two.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "रचनाकार परिचय" का अर्थ है — लेखक का **जन्मवर्ष, मृत्युवर्ष, शिक्षा, प्रसिद्ध.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,',
                  options: ['"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख'],
                  hint: 'If stuck, review the **Class 8 Hindi textbook\'s \'रचनाकार परिचय\' sections** of any two chapters.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "रचनाकार परिचय" का अर्थ है — लेखक का **जन्मवर्ष, मृत्युवर्ष, शिक्षा, प्रसिद्ध पुस्तकें, पुरस्कार**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तथ्य → कारण की छलांग लगवाएँ:** छात्र से कहें — "लेखक की एक जीवनीय घटना चुनो (जैसे: जैनेंद्र का मानसिक अवसाद)। अब.', '(उत्तर: अंतर्मुखी नायक, मनोवैज्ञानिक द्वंद्व, संवाद से अधिक मोनोलॉग)।" 2.', '**पाठ से जोड़ो:** "पाठ 7 के किस प्रसंग में यह पैटर्न दिखता है?', '**तुलना करवाएँ:** "इसी लेखक की किसी अन्य रचना में यह पैटर्न कैसे अलग रूप में आता है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा.',
          hint: 'अगर फँसें तो \'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय\' (c9_hin_ga_cbse_07_001) दोबारा पढ़ें.',
          misconception: 'छात्र प्रायः मानते हैं कि \'कथानक का क्रम\' और \'आख्यान का क्रम\' सदैव समान होते हैं; इसलिए वे फ्लैशबैक, फ्लैश-फॉरवर्ड या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख'],
                  hint: 'अगर फँसें तो \'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय\' (c9_hin_ga_cbse_07_001) दोबारा पढ़ें, विशेषकर.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'कथानक का क्रम\' और \'आख्यान का क्रम\' सदैव समान होते हैं; इसलिए वे फ्लैशबैक, फ्लैश-फॉरवर्ड या मीडिया रेस को \'लेखक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल कहानी (जैसे \'खरगोश और कछुआ\') दें और कहें: "घटनाएँ जैसी घटीं वैसी लिखो (कथानक), फिर जैसी सुनाना चाहो.', 'दोनों सूचियों में अंतर चिह्नित करवाएँ। 3.', 'पूछें: "कछुआ की जीत अंत में बताने से क्या असर पड़ा?', 'इस अभ्यास से कंटेंट vs फॉर्म का भेद स्पष्ट हो जाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक.',
          hint: 'यदि अटका हुआ महसूस हो तो "कथानक और आख्यान-संरचना" (c9_hin_ga_cbse_07_002) के नोट्स.',
          misconception: 'छात्र "पाठ्य-परिवेश" को केवल "कहानी कहाँ और कब हुई" (Where and When) तक सीमित कर देते हैं, और यह भूल जाते हैं कि परिवेश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक', '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', 'पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटका हुआ महसूस हो तो "कथानक और आख्यान-संरचना" (c9_hin_ga_cbse_07_002) के नोट्स दोहराएँ और कहानी.',
                  misconception: 'छात्र "पाठ्य-परिवेश" को केवल "कहानी कहाँ और कब हुई" (Where and When) तक सीमित कर देते हैं, और यह भूल जाते हैं कि परिवेश में.' }
          ],
            remediations: { 'where-and-when': { steps: ['चरण 1: छात्र को एक परिचित लघु कथा (जैसे "ईदगाह" या "बड़े भाई साहब") का एक पैराग्राफ दें और कहें: "इसमें समय, स्थान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के.',
          hint: 'यदि अटके: **कथानक आरेख (plot diagram)** बनाएँ — x-अक्ष पर कथानक के चरण, y-अक्ष पर नायक के.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **सूची (list of traits)** + पाठ से **उद्धरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक संरचित साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख', '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके: **कथानक आरेख (plot diagram)** बनाएँ — x-अक्ष पर कथानक के चरण, y-अक्ष पर नायक के गुण/भाव।.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **सूची (list of traits)** + पाठ से **उद्धरण (quotes)**। वे लिखते हैं.' }
          ],
            remediations: { 'list-of-traits-quotes': { steps: ['**मॉडल दिखाएँ**: एक ही पात्र के दो उत्तर रखें — पहला केवल गुण+उद्धरण (कम अंक वाला), दूसरा पूर्ण PEEL (पूरे अंक वाला)।.', '**\'क्यों/कैसे\' का अभ्यास**: प्रत्येक गुण के लिए छात्र से तीन बार पूछें — "यह गुण यहाँ कैसे दिखा?', 'पाठ की कौन सी पंक्ति सिद्ध करती है?', 'इस गुण के बिना कहानी कैसे बदलती?" — उत्तर लिखवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या सहयोगी भूमिका.',
          hint: 'यदि अटका हुआ महसूस हो तो: कथानक संरचना (Node 002) के \'मोड़ बिंदु\' (turning points) दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे शब्द \'सहायक\' को \'गौण/मामूली\' (minor/insignificant) समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या सहयोगी भूमिका निभाते हुए',
                  options: ['सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या सहयोगी भूमिका निभाते हुए', '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कथानक संरचना (Node 002) के \'मोड़ बिंदु\' (turning points) दोबारा देखें और.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे शब्द \'सहायक\' को \'गौण/मामूली\' (minor/insignificant) समझ लेते हैं, जबकि.' }
          ],
            remediations: { 'minor-insignificant': { steps: ['छात्र से कहो: "पाठ के किन्हीं 3 दृश्य चुनो जहां नायक अकेला है — फिर पूछो: क्या ये दृश्य संभव होते यदि सहायक पात्र न.', 'फिर उनसे कहो: "सहायक पात्र का एक संवाद हटाओ और देखो कि नायक का निर्णय कैसे बदलता है।" 3.', 'अंत में: "सहायक पात्र की अपनी एक इच्छा/भय लिखो जो नायक से स्वतंत्र हो।" यह क्रम उन्हें \'उपकरण\' से \'स्वतंत्र सत्ता\' की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह सार्वभौमिक केंद्रीय विचार या अवधारणा है जिसे लेखक.',
          hint: 'यदि अटके तो **कथानक के तीन मोड़ (turning points)** दोबारा लिखें और प्रत्येक पर पूछें.',
          misconception: '**विषय = कथानक का सारांश** — छात्र अक्सर लिख देते हैं: "पाठ 7 का विषय है कि नायक को कुएं से पानी नहीं भरने दिया गया और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह सार्वभौमिक केंद्रीय विचार या अवधारणा है जिसे लेखक अपनी रचना',
                  options: ['मुख्य विषय (Central Theme) वह सार्वभौमिक केंद्रीय विचार या अवधारणा है जिसे लेखक अपनी रचना', '"पृष्ठभूमि और रचनाकार परिचय" refers to the systematic study of the **socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) से बंधा क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके तो **कथानक के तीन मोड़ (turning points)** दोबारा लिखें और प्रत्येक पर पूछें: "यहां लेखक.',
                  misconception: '**विषय = कथानक का सारांश** — छात्र अक्सर लिख देते हैं: "पाठ 7 का विषय है कि नायक को कुएं से पानी नहीं भरने दिया गया और वह स्कूल भी नहीं जा.' }
          ],
            remediations: { '7': { steps: ['छात्र से कहें: "पाठ की तीन बड़ी घटनाएं लिखो।" (वह लिखेगा)। 2.', 'अब पूछें: "इन तीनों में **कॉमन पैटर्न** क्या है?', 'लेखक बार-बार **किस एक बात** को अलग-अलग तरीके से दिखा रहा है?" (उसे \'भेदभाव\', \'अपमान\', \'वंचना\' जैसे शब्द मिलेंगे)। 3.', 'कहें: "इस पैटर्न को एक **पूर्ण वाक्य** में बदलो जिसमें **कारण-परिणाम** हो।" (उदाहरण: \'जातिगत घमंड के कारण दलितों को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
