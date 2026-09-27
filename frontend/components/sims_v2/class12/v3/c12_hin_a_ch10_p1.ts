import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p1: SimDef = {
    id: 'v3_c12_hin_a_ch10_p1',
    title: 'प्रेमघन की छाया-स्मृति · Part 1/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'प्रेमघन की छाया-स्मृति · Part 1/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_001', 'c12_hin_a_cbse_10_002', 'c12_hin_a_cbse_10_003', 'c12_hin_a_cbse_10_004', 'c12_hin_a_cbse_10_005', 'c12_hin_a_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'प्रेमघन की छाया-स्मृति — पृष्ठभूमि और रचनाकार परिचय', text: 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत अनुभव, सामाजिक-आर्थिक परिस्थितियों और साहित्यिक उद्देश्यों का विश्लेषण करना जो उनकी कहानी लेखन को आकार देते हैं.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['प्रेमघन की छाया-स्मृति —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_a_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'प्रेमघन की छाया-स्मृति · Part 1/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — **कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य.', answer: '- -', options: ['- -', '- -'] },
            { id: 's2', label: '- -', prompt: 'Which idea is this? — पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक.', answer: '- -', options: ['- -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'What comes next? प्रेमघन की छाया-स्मृति · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — प्रेमघन की छाया-स्मृति · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_001', difficulty: 'standard',
          question: 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के.',
          hint: 'यदि छात्र रचनाकार के जीवन और कहानी के विषय के बीच संबंध नहीं देख पा रहा है, तो उसे कक्षा.',
          misconception: 'छात्र अक्सर मानते हैं कि प्रेमचंद की कहानियों में सामाजिक विषय (जैसे गरीबी, शोषण) केवल इसलिए मौजूद हैं क्योंकि लेखक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत',
                  options: ['प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार, संवाद,'],
                  hint: 'यदि छात्र रचनाकार के जीवन और कहानी के विषय के बीच संबंध नहीं देख पा रहा है, तो उसे कक्षा 11 के.',
                  misconception: 'छात्र अक्सर मानते हैं कि प्रेमचंद की कहानियों में सामाजिक विषय (जैसे गरीबी, शोषण) केवल इसलिए मौजूद हैं क्योंकि लेखक स्वयं उन परिस्थितियों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले प्रेमचंद के जीवन की दो विशिष्ट घटनाओं (जैसे उनके शिक्षक के पद से इस्तीफा देना और ग्रामीण क्षेत्र में जीवन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_002', difficulty: 'standard',
          question: '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो.',
          hint: 'यदि भ्रम हो तो c11_hin_a_cbse_01_002 (कक्षा ११ अंतरा पाठ १ का कथानक-संरचना नोड) पर लौटें.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ "कहानी क्या है" समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य',
                  options: ['**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार, संवाद,'],
                  hint: 'यदि भ्रम हो तो c11_hin_a_cbse_01_002 (कक्षा ११ अंतरा पाठ १ का कथानक-संरचना नोड) पर लौटें — वहाँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ "कहानी क्या है" समझते हैं। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र से कहें: "पाठ की १० प्रमुख घटनाएं कागज़ पर **कालानुक्रम में** लिखो (१.', 'गुरु-देहावसान)।" — यह **कथानक** निकाल देगा। **चरण २:** अब पाठ खोलकर देखें: "लेखक ने इन १० घटनाओं को **किस क्रम में**.', 'घटना ३ और ७ एक साथ आईं?" — यह **संरचना** उजागर करेगा। **चरण ३:** दोनों सूचियों को साथ रखकर पूछें: "लेखक ने क्रम क्यों.', 'क्या प्रभाव पड़ा?" — यही **विश्लेषण** है। **पुनः निदान:** यदि अभी भी भ्रम रहे, तो c11_hin_a_cbse_01_002 (कक्षा ११ का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई.',
          hint: 'अगर फंसे हुए महसूस हो तो वर्ग 11 के पाठ्य-परिवेश और वातावरण के नोड.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण एक ही बात हैं— जैसे दोनों को सिर्फ "कहानी कहाँ और कब होती है" के रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक',
                  options: ['पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार, संवाद,'],
                  hint: 'अगर फंसे हुए महसूस हो तो वर्ग 11 के पाठ्य-परिवेश और वातावरण के नोड (c11_hin_a_cbse_10_003) को.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण एक ही बात हैं— जैसे दोनों को सिर्फ "कहानी कहाँ और कब होती है" के रूप में परिभाषित करते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले दो रंग के हाइलाइटर देने हैं— एक पाठ्य-परिवेश के लिए (ऐतिहासिक/सामाजिक तथ्य: जैसे "1947 में विभाजन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार.',
          hint: 'यदि फंसें तो प्रेमघन की छाया-स्मृति के पृष्ठभूमि और कथानक (nodes c12_hin_a_cbse_10_001 और.',
          misconception: 'प्रेमघन की छाया-स्मृति के प्रमुख पात्र के पात्र-चित्रण में छात्र सबसे częściej केवल उसके एक प्रमुख गुण (जैसे कि त्याग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार, संवाद,',
                  options: ['पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक वर्णन, व्यवहार, संवाद,', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फंसें तो प्रेमघन की छाया-स्मृति के पृष्ठभूमि और कथानक (nodes c12_hin_a_cbse_10_001 और.',
                  misconception: 'प्रेमघन की छाया-स्मृति के प्रमुख पात्र के पात्र-चित्रण में छात्र सबसे częściej केवल उसके एक प्रमुख गुण (जैसे कि त्याग या दुःख) पर ध्यान.' }
          ],
            remediations: { 'cz-ciej': { steps: ['पाठ से प्रमुख पात्र के सभी उल्लेख सूचीबद्ध करें जहाँ उसके不同な गुण दिखाई देते हैं (जैसे कि एक scènes में त्याग दिखाना.', 'प्रत्येक गुण को उसके context में रखकर विश्लेषण करें - पूछें कि क्या यह गुण situational है या पात्र के core का हिस्सा है.', 'विपरीत गुणों के बीच के तनाव की पहचान करें जो पात्र को मानवीय बनाते हैं (जैसे कि त्याग और स्व-संरक्षण) -', 'इस संतुलन को पात्र के विकास और कहानी के केंद्रीय विषय से जोड़कर बताएं कि कैसे ये विरोधाभासी गुण मिलकर एक यथार्थवादी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो मुख्य कहानी को चलाने में मदद करते हैं, मुख्य पात्र.',
          hint: 'यदि फंसे हों तो प्रेमघन की छाया-स्मृति में मुख्य पात्र प्रेम के चरित्र-चित्रण.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र से बात करते हैं या scene में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो मुख्य कहानी को चलाने में मदद करते हैं, मुख्य पात्र के विकास',
                  options: ['सहायक पात्र वे पात्र हैं जो मुख्य कहानी को चलाने में मदद करते हैं, मुख्य पात्र के विकास', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फंसे हों तो प्रेमघन की छाया-स्मृति में मुख्य पात्र प्रेम के चरित्र-चित्रण.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र से बात करते हैं या scene में उपस्थित हैं—उदाहरण के.' }
          ],
            remediations: { 'scene': { steps: ['छात्र को बताइए कि पहले वह प्रेमघन की छाया-स्मृति में किसी एक scene को चुनिए जहां प्रेम किसी से बात कर रहा है। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या भाव है जिसके चारों.',
          hint: 'यदि अटके तो c12_hin_a_cbse_10_004 (नायक चित्रण) के \'आंतरिक संघर्ष\' खंड को दोबारा पढ़ें.',
          misconception: '**सबसे घातक भ्रांति:** छात्र "विषय" और "संदेश" को एक ही समझते हैं और परीक्षा में दोनों के लिए एक जैसा उत्तर लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरा',
                  options: ['मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरा', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि अटके तो c12_hin_a_cbse_10_004 (नायक चित्रण) के \'आंतरिक संघर्ष\' खंड को दोबारा पढ़ें — वहीं विषय.',
                  misconception: '**सबसे घातक भ्रांति:** छात्र "विषय" और "संदेश" को एक ही समझते हैं और परीक्षा में दोनों के लिए एक जैसा उत्तर लिख देते हैं। **वास्तविक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पठन:** पाठ के तीन प्रमुख प्रसंग (राजपाट त्याग, जोगी वेश, छाया-स्मृति संवाद) दोबारा पढ़ें और प्रत्येक के सामने.', '**अंतर स्पष्टीकरण:** एक शीट पर दो कॉलम बनाएं — बाएं "विषय (क्या है)", दाएं "संदेश (क्या सीखा)" — पाठ के 3-3 बिंदु भरें।.', '**लिखित अभ्यास:** 50-60 शब्दों में विषय लिखें, फिर 50-60 शब्दों में संदेश — दोनों में **एक भी शब्द समान न हो**। इसे.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 5 फिर से हल करें — अब उत्तर में अंतर स्पष्ट दिखना चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
