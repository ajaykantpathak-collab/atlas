import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch02_p1: SimDef = {
    id: 'v3_c11_hin_a_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड केवल CBSE कक्षा 11 हिंदी अंतरा के पाठ 2 के रचनाकार एवं उसकी पृष्ठभूमि तक सीमित है.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c11_hin_a_ch02'],
    nodeIds: ['c11_hin_a_cbse_02_001', 'c11_hin_a_cbse_02_002', 'c11_hin_a_cbse_02_003', 'c11_hin_a_cbse_02_004', 'c11_hin_a_cbse_02_005', 'c11_hin_a_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें कि आपको एक पुराना पत्र मिला है जिसमें कोई पता-ठिकाना नहीं, केवल बातें लिखी हैं — आप कैसे जानेंगे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनैतिक परिस्थितियाँ, जबकि \'रचनाकार परिचय\' में लेखक के जीवनवृत्त, साहित्यिक योगदान, विचारधारा और उसकी विशिष्ट.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान.', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस करें, तो **\'रचनाकार की विचारधारा\' (ideology)** और **\'साहित्यिक धारा\'.',
          misconception: '**"पृष्ठभूमि और रचनाकार परिचय = तथ्यों की सूची (नाम, तिथि, पुरस्कार)।"** छात्र समझते हैं कि इस खंड को \'याद\' करना है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और',
                  options: ['\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **\'रचनाकार की विचारधारा\' (ideology)** और **\'साहित्यिक धारा\' (literary.',
                  misconception: '**"पृष्ठभूमि और रचनाकार परिचय = तथ्यों की सूची (नाम, तिथि, पुरस्कार)।"** छात्र समझते हैं कि इस खंड को \'याद\' करना है, \'समझना\' नहीं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "रचनाकार की जीवनी के 5 वाक्य लिखो, फिर हर वाक्य के आगे तीर खींचकर लिखो: **\'इसका पाठ में कहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा.',
          hint: 'यदि अटका हुआ महसूस हो तो **"कहानी के आरंभ, मध्य, अंत" (Beginning, Middle, End)** की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आख्यान-संरचना केवल घटनाओं का क्रम बदलना है" (Reordering Events)** — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक',
                  options: ['कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो तो **"कहानी के आरंभ, मध्य, अंत" (Beginning, Middle, End)** की पारंपरिक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आख्यान-संरचना केवल घटनाओं का क्रम बदलना है" (Reordering Events)** — जैसे फ्लैशबैक डाल देना या.' }
          ],
            remediations: { 'reordering-events-decoration': { steps: ['**मिनी-लेसन (Mini-Lesson):** छात्र को एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) दें और कहें: *"इसे तीन तरह से लिखो.', '**तुलना तालिका (Comparison Table):** तीनों संस्करणों के सामने लिखवाएँ: "पाठक क्या महसूस करता है?', '**स्पष्टीकरण:** दिखाएँ कि (ब) में **भाग्यवाद (Fatalism)** उभरता है, (स) में **सत्य की बहुलता (Plurality of Truth)**। ४.', '**अभ्यास:** पाठ्य-पुस्तक के पाठ से एक फ्लैशबैक पहचानकर पूछें: *"अगर यह दृश्य कालक्रमानुसार आता तो क्या फर्क पड़ता?"*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल.',
          hint: 'अगर अटके तो **\'कथानक और आख्यान-संरचना\' (c11_hin_a_cbse_02_002)** के उस भाग को दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **\'परिवेश = स्थान वर्णन\' (setting = description of place)**। वे लिखते हैं: "कहानी गाँव में घटित होती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,',
                  options: ['पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है जिसमें'],
                  hint: 'अगर अटके तो **\'कथानक और आख्यान-संरचना\' (c11_hin_a_cbse_02_002)** के उस भाग को दोहराएँ जहाँ घटनाओं.',
                  misconception: 'छात्र समझते हैं कि **\'परिवेश = स्थान वर्णन\' (setting = description of place)**। वे लिखते हैं: "कहानी गाँव में घटित होती है जहाँ खेत, कुआँ.' }
          ],
            remediations: { 'setting-description-of-place': { steps: ['1) **पहला कदम:** छात्र से कहें — "पाठ का कोई एक पात्र चुनो। लिखो: इस पात्र ने जो तीन बड़े फैसले लिए, उनमें से प्रत्येक.', '(उदाहरण: मीरा ने स्कूल छोड़ दिया क्योंकि...', 'पंचायत का फरमान था / पिता की बीमारी थी / गाँव में लड़कियों का स्कूल नहीं था)।" 2) **दूसरा कदम:** उसी पात्र के लिए.', 'क्यों/क्यों नहीं?" — इससे परिवेश की **कारणात्मक शक्ति (causal power)** स्पष्ट होगी। 3) **तीसरा कदम:** पाठ से **तीन बिंब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है.',
          hint: 'यदि अटके तो: पाठ 2 को दोबारा पढ़कर केवल नायक के **संवादों (dialogues)** और **एकांत चिंतन.',
          misconception: 'विद्यार्थी अक्सर **\'पात्र-वर्णन\' (character description)** और **\'पात्र-चित्रण\' (character sketch/analysis)** को समान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है जिसमें',
                  options: ['पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक विधि (analytical method) है जिसमें', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके तो: पाठ 2 को दोबारा पढ़कर केवल नायक के **संवादों (dialogues)** और **एकांत चिंतन.',
                  misconception: 'विद्यार्थी अक्सर **\'पात्र-वर्णन\' (character description)** और **\'पात्र-चित्रण\' (character sketch/analysis)** को समान मान लेते हैं। वे नायक.' }
          ],
            remediations: { 'character-description-character-sketch-analysis': { steps: ['**चरण 1:** विद्यार्थी से कहें: "नायक के बारे में जो तीन बातें तुमने लिखीं हैं, उनमें से प्रत्येक के लिए पाठ से **एक-एक.', 'उस गुण का नाम दो।" **चरण 3:** अब कहें: "यह गुण कहानी के मुख्य विषय (जैसे: व्यक्तिगत स्वतंत्रता बनाम सामाजिक दायित्व) से.', 'एक वाक्य में लिखो।" **चरण 4:** इस प्रक्रिया को तीन-चार गुणों के लिए दोहराएं — यही PEEL संरचना का व्यावहारिक अभ्यास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके हों, तो **कथानक संरचना (c11_hin_a_cbse_02_002)** के \'उत्कर्ष/क्लाइमेक्स\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का विश्लेषण करते समय **"वे नायक की मदद करते हैं"** या **"वे नायक के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके हों, तो **कथानक संरचना (c11_hin_a_cbse_02_002)** के \'उत्कर्ष/क्लाइमेक्स\' और \'पतन/फॉलिंग.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का विश्लेषण करते समय **"वे नायक की मदद करते हैं"** या **"वे नायक के दोस्त/दुश्मन हैं"** जैसे.' }
          ],
            remediations: { 'social-emotional-description': { steps: ['**चरण 1 (पहचान):** छात्र से पूछें: "इस पात्र को कहानी से **हटा दें**। अब बताओ — नायक का चरित्र कैसे अधूरा रह जाएगा?', 'कथानक का कौन सा मोड़ गायब हो जाएगा?', 'विषय (Theme) कैसे कमज़ोर पड़ जाएगा?" यदि छात्र "कुछ फर्क नहीं पड़ेगा" या "कहानी छोटी हो जाएगी" कहे, तो पात्र का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या सार है जो पूरी.',
          hint: 'यदि अटके तो **नोड 002 (कथानक)** और **नोड 004 (नायक-चित्रण)** के \'महत्वपूर्ण मोड़\' और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "पाठ का शीर्षक ही मुख्य विषय होता है" या "नायक का अंतिम संवाद ही संदेश होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या सार है जो पूरी रचना में',
                  options: ['**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या सार है जो पूरी रचना में', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके तो **नोड 002 (कथानक)** और **नोड 004 (नायक-चित्रण)** के \'महत्वपूर्ण मोड़\' और \'आंतरिक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "पाठ का शीर्षक ही मुख्य विषय होता है" या "नायक का अंतिम संवाद ही संदेश होता है"। **वास्तविकता**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** — केवल शीर्षक/अंतिम पृष्ठ नहीं, **पूरा पाठ** तीन बार: पहली बार कथानक के लिए, दूसरी बार विषय-संकेतों.', '**विषय-ट्रैकिंग शीट बनाएँ** — एक कॉलम में प्रसंग, दूसरे में उससे उभरता विचार। देखें कौन-सा विचार 3+ बार आया। 3.', '**PEEL का अभ्यास** — पुराने बोर्ड प्रश्न उठाएँ, केवल Point और Evidence लिखें, फिर शिक्षक से Explanation और Link.', '**संवाद करें** — सहपाठी को 2 मिनट में विषय और संदेश अलग-अलग समझाएँ; यदि वह भ्रमित हो, तो अपनी समझ में कमी है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
