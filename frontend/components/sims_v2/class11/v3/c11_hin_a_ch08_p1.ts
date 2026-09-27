import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch08_p1: SimDef = {
    id: 'v3_c11_hin_a_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'इस नोड में केवल पृष्ठभूमि के प्रकार (ऐतिहासिक/सामाजिक/सांस्कृतिक) और रचनाकार परिचय के.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c11_hin_a_ch08'],
    nodeIds: ['c11_hin_a_cbse_08_001', 'c11_hin_a_cbse_08_002', 'c11_hin_a_cbse_08_003', 'c11_hin_a_cbse_08_004', 'c11_hin_a_cbse_08_005', 'c11_hin_a_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें कि आपको किसी अनजान शहर में एक पुरानी इमारत दिखाई देती है — आप उसे ठीक से तभी समझ पाएंगे जब आपको.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ (Context) है जो रचना के विषय, पात्रों और घटनाओं को आकार देता है; रचनाकार परिचय (Author Introduction) लेखक के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है.', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_001', difficulty: 'standard',
          question: 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक.',
          hint: 'यदि अटका महसूस हो तो **\'इतिहास और साहित्य का संबंध\' (Relationship between History and.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल **परीक्षा में पूछे जाने वाले तथ्यात्मक प्रश्नों** (जैसे जन्मतिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ',
                  options: ['पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के प्रमुख'],
                  hint: 'यदि अटका महसूस हो तो **\'इतिहास और साहित्य का संबंध\' (Relationship between History and Literature)**.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल **परीक्षा में पूछे जाने वाले तथ्यात्मक प्रश्नों** (जैसे जन्मतिथि, कृतियों के नाम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ 8 के किसी एक पात्र का कोई एक निर्णय चुनो (जैसे: गाँव छोड़कर शहर जाना)। अब बताओ: **कौन-सी.', 'यदि पृष्ठभूमि बदल दें (जैसे आज का शहर), तो क्या वह वही निर्णय लेगा?" चरण 2: रचनाकार के जीवन की **एक ऐसी घटना** खोजने को.', 'उनके जीवन के किस अनुभव ने यह शब्द दिया?" — यह \'तथ्य\' से \'व्याख्या\' की यात्रा है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता.',
          hint: 'यदि अटके: किसी परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) को लें, घटनाएँ कालानुक्रम में.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः मानते हैं कि "कथानक = घटनाओं का क्रम" और "आख्यान-संरचना = अध्यायों का विभाजन"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के प्रमुख'],
                  hint: 'यदि अटके: किसी परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) को लें, घटनाएँ कालानुक्रम में लिखें, फिर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः मानते हैं कि "कथानक = घटनाओं का क्रम" और "आख्यान-संरचना = अध्यायों का विभाजन"। वे **कारण-कार्य श्रृंखला.' }
          ],
            remediations: { 'causal-chain-chronology-a-b': { steps: ['**पुनर्निर्माण अभ्यास:** छात्र को कहानी की घटनाएँ **कालानुक्रम में** सूचीबद्ध करने को कहें (कथानक पुनर्निर्माण)। 2.', '**तुलना तालिका:** दो कॉलम बनाएँ — कॉलम 1: कालानुक्रमिक क्रम, कॉलम 2: पाठ-क्रम। अंतर चिह्नित करें। 3.', '**प्रश्न पूछें:** "लेखक ने घटना X को Y से पहले क्यों रखा?', 'पाठक पर क्या प्रभाव पड़ा?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो तो \'बिंब और रूपक\' (c11_hin_a_cbse_08_008) के मूलभूत उदाहरण दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'वातावरण\' केवल मौसम या प्रकाश का वर्णन है (जैसे: "अँधेरा था इसलिए डरावना वातावरण")। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है', 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के प्रमुख'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'बिंब और रूपक\' (c11_hin_a_cbse_08_008) के मूलभूत उदाहरण दोहराएँ — विशेषकर.',
                  misconception: 'छात्र समझते हैं कि \'वातावरण\' केवल मौसम या प्रकाश का वर्णन है (जैसे: "अँधेरा था इसलिए डरावना वातावरण")। वास्तव में वातावरण लेखक के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक ही दृश्य के दो संस्करण पढ़वाएँ — केवल विशेषण/क्रिया बदलकर (उदाहरण: \'हवा बह रही थी\' बनाम \'हवा फुसफुसा.', 'दृश्य वही, अनुभूति कैसे बदली?" चरण 2: उसे तीन संवेदी स्तंभ (दृश्य, श्रव्य, स्पर्श) बनाने को कहें और प्रत्येक में 2-2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के.',
          hint: 'यदि अटके हुए हैं, तो **\'पाठ्य-परिवेश और वातावरण\' (c11_hin_a_cbse_08_003)** के नोट्स.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"नायक का चरित्र-चित्रण = नायक के गुणों की सूची (List of Traits) + पाठ से 1-2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के प्रमुख',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक कथानक के प्रमुख', 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है'],
                  hint: 'यदि अटके हुए हैं, तो **\'पाठ्य-परिवेश और वातावरण\' (c11_hin_a_cbse_08_003)** के नोट्स दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"नायक का चरित्र-चित्रण = नायक के गुणों की सूची (List of Traits) + पाठ से 1-2 उद्धरण"**। **गलत.' }
          ],
            remediations: { 'list-of-traits-1-2': { steps: ['**लक्षित सुधार (चरणबद्ध):** 1.', '**\'लेबलिंग\' बंद करें, \'साक्ष्य-खोज\' शुरू करें:** छात्र को कहें — "अगली बार पढ़ते समय पेन से **कोई विशेषण (Adjective) न.', '**\'क्यों\' की श्रृंखला बनाएँ:** हर कार्य के लिए 3 बार \'क्यों\' पूछें। (उदाहरण: उसने झूठ बोला -> क्यों?', 'क्योंकि पिता ने कहा था \'बेटा झूठ नहीं बोलता\' -> **आंतरिक द्वंद्व: पिता की छवि बनाम अपनी कमज़ोरी**)। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_08_004 (नायक-चित्रण)** के अपने नोट्स दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि सहायक पात्र का विश्लेषण करते समय **"वह नायक की मदद करता है/नहीं करता"** ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे बढ़ाने,',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे बढ़ाने,', 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_08_004 (नायक-चित्रण)** के अपने नोट्स दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि सहायक पात्र का विश्लेषण करते समय **"वह नायक की मदद करता है/नहीं करता"** ही पर्याप्त कथन है। वे.' }
          ],
            remediations: { 'function-role-class-10-descriptive': { steps: ['**मॉडल दिखाएँ:** पाठ 8 के एक सहायक पात्र का **दो संस्करण** लिखें — (क) वर्णनात्मक: "X नायक का मित्र है, सहायक है।" (ख).', '**अंतर स्पष्ट करें:** पूछें — "पहले संस्करण से पाठक को क्या *नया* पता चला?', 'दूसरे से क्या?" — विद्यार्थी स्वयं देखेगा कि पहला **पुनरावृत्ति (redundant)** है, दूसरा **व्याख्यात्मक (explanatory)**।.', '**अभ्यास दें:** "पाठ के किन्हीं दो सहायक पात्रों के लिए **केवल कार्यात्मक कथन (functional statements)** लिखें — विशेषण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_08_002 (कथानक)** और **c11_hin_a_cbse_08_004 (नायक चित्रण)**.',
          misconception: 'विद्यार्थी **\'विषय\' को \'कहानी का सारांश\' (summary) समझ लेते हैं** — जैसे लिख देते हैं: "यह कहानी एक लड़के की है जो शहर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में व्याप्त रहता',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में व्याप्त रहता', 'पृष्ठभूमि (Background) किसी रचना का वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक संदर्भ', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का वह भौतिक, सामाजिक, सांस्कृतिक और ऐतिहासिक संदर्भ है'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_08_002 (कथानक)** और **c11_hin_a_cbse_08_004 (नायक चित्रण)** दोहराएँ.',
                  misconception: 'विद्यार्थी **\'विषय\' को \'कहानी का सारांश\' (summary) समझ लेते हैं** — जैसे लिख देते हैं: "यह कहानी एक लड़के की है जो शहर जाता है, माँ मर जाती.' }
          ],
            remediations: { 'summary': { steps: ['**पहला कदम:** विद्यार्थी से कहें — "पाठ के **तीन सबसे मार्मिक प्रसंग** छाँटो। प्रत्येक के सामने लिखो: यहाँ **क्या हो.', '**दूसरा कदम:** तीनों प्रसंगों के \'भाव\' कॉलम में **सामान्य शब्द** ढूँढो (जैसे: उपेक्षा, पश्चाताप, मौन, दूरी) — वही.', '**तीसरा कदम:** अब लिखो: "लेखक इन कीवर्ड्स के ज़रिए हमें **क्या समझाना** चाहता है?" — उत्तर में \'चाहिए/नहीं चाहिए\' न आए.', '**चौथा कदम:** इस प्रक्रिया को **दो अपरिचित गद्यांशों** पर दोहराएँ — तब तक जब तक विद्यार्थी स्वतः \'घटना→भाव→विषय→संदेश\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
