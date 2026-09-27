import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p1: SimDef = {
    id: 'v3_c12_hin_v_ch03_p1',
    title: 'अतीत में दबे पाँव · Part 1/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 1/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_001', 'c12_hin_v_cbse_03_002', 'c12_hin_v_cbse_03_003', 'c12_hin_v_cbse_03_004', 'c12_hin_v_cbse_03_005', 'c12_hin_v_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — पृष्ठभूमि और रचनाकार परिचय', text: '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir essay) है जिसमें लेखक अपने बाल्यकाल, ग्रामीण परिवेश, लोक-संस्कृति और परंपराओं को आत्मीयता और कलात्मकता के साथ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'What comes next? अतीत में दबे पाँव · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अतीत में दबे पाँव · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_001', difficulty: 'standard',
          question: '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध**.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_al_cbse_01_001 (हुसैन की कहानी अपनी ज़बानी.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि \'अतीत में दबे पाँव\' **कुबेरनाथ राय की आत्मकथा** है और इसे पढ़कर उनके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir',
                  options: ['\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र के **बाह्य'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_al_cbse_01_001 (हुसैन की कहानी अपनी ज़बानी — पृष्ठभूमि)** और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि \'अतीत में दबे पाँव\' **कुबेरनाथ राय की आत्मकथा** है और इसे पढ़कर उनके **संपूर्ण जीवन** की.' }
          ],
            remediations: { '1': { steps: ['**पुनर्पठन (Re-read):** छात्र से कहें कि वह निबंध के **प्रथम दो अनुच्छेद** और **अंतिम अनुच्छेद** दोबारा पढ़े — वहाँ.', '**तुलनात्मक तालिका (Comparative table):** कक्षा में या नोटबुक में बनवाएं: | विशेषता | आत्मकथा | स्मृति-चित्र (यह निबंध).', '**पुनर्निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_2 को दोबारा हल करने को कहें — अब सही उत्तर मिलना चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_002', difficulty: 'standard',
          question: 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास.',
          hint: 'यदि कथानक-विश्लेषण कठिन लगे तो पहले घटनाओं की समय-रेखा बनाएँ — फिर प्रत्येक पर \'क्यों\' का.',
          misconception: 'छात्र मान लेते हैं कि कथानक केवल \'क्या हुआ\' की सूची है। सटीक गलत कदम: वे घटनाओं को कारण-परिणाम से जोड़े बिना क्रम में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि',
                  options: ['कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र के **बाह्य'],
                  hint: 'यदि कथानक-विश्लेषण कठिन लगे तो पहले घटनाओं की समय-रेखा बनाएँ — फिर प्रत्येक पर \'क्यों\' का प्रश्न.',
                  misconception: 'छात्र मान लेते हैं कि कथानक केवल \'क्या हुआ\' की सूची है। सटीक गलत कदम: वे घटनाओं को कारण-परिणाम से जोड़े बिना क्रम में लिख देते हैं — जिससे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['घटना-कार्ड बनवाएँ — प्रत्येक पर \'क्या हुआ\' + \'क्यों हुआ\' + \'इससे क्या बदला\' लिखवाएँ। 2.', 'समय-रेखा चार्ट बनवाएँ — घटनाओं को क्रम में रखकर प्रत्येक को अगले से जोड़वाएँ। 3.', 'दो संरचना-शैलियों की तुलना करवाएँ — रैखिक बनाम स्मृति-प्रवाह — और प्रभाव का अंतर पूछें। 4.', 'पाठ का एक अंश दें — प्रथम-पुरुष वाचन के संकेत शब्द पहचानवाएँ (\'मैं\', \'मुझे\', \'मेरे\')। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका महसूस हो तो c11_hin_v_cbse_03_003 (कक्षा 11 वितान पाठ 3 का परिवेश-वातावरण) का.',
          misconception: 'छात्र अक्सर \'परिवेश\' को केवल स्थान (जहाँ) और समय (कब) तक सीमित कर देते हैं, जबकि NCERT में परिवेश में सामाजिक संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और',
                  options: ['पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र के **बाह्य'],
                  hint: 'यदि अटका महसूस हो तो c11_hin_v_cbse_03_003 (कक्षा 11 वितान पाठ 3 का परिवेश-वातावरण) का.',
                  misconception: 'छात्र अक्सर \'परिवेश\' को केवल स्थान (जहाँ) और समय (कब) तक सीमित कर देते हैं, जबकि NCERT में परिवेश में सामाजिक संरचना (जाति, वर्ग, लिंग).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पाठ के पहले पृष्ठ के केवल संज्ञा-शब्द (स्थान, वस्तु, व्यक्ति) छाँटने को कहें — ये \'परिवेश\' के बिल्डिंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र.',
          hint: 'यदि फँस जाएँ तो **कक्षा ११ आरोह पाठ १ या २ के नायक-चरित्र-चित्रण (c11_hin_a_cbse_01_004.',
          misconception: '**विशिष्ट भ्रांति:** *"बड़े बाबू का मौन = उदासीनता / अवसाद / संवादहीनता"* **क्यों गलत है:** पाठ स्पष्ट करता है कि उनका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र के **बाह्य',
                  options: ['पात्र-चित्रण (Character Sketch) का अर्थ है किसी साहित्यिक कृति के प्रमुख पात्र के **बाह्य', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि फँस जाएँ तो **कक्षा ११ आरोह पाठ १ या २ के नायक-चरित्र-चित्रण (c11_hin_a_cbse_01_004.',
                  misconception: '**विशिष्ट भ्रांति:** *"बड़े बाबू का मौन = उदासीनता / अवसाद / संवादहीनता"* **क्यों गलत है:** पाठ स्पष्ट करता है कि उनका मौन **\'भाषा की सीमा\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (३ चरणों में):** 1.', '**पुनर्पाठ (Re-read) विशिष्ट प्रसंग:** छात्र से कहें — *"पाठ के वे ३ प्रसंग ढूँढ़ो जहाँ बड़े बाबू कुछ नहीं बोलते, फिर.', '**तुलनात्मक विश्लेषण:** उनसे पूछें — *"अगर बड़े बाबू यहाँ बोल देते (\'मालती, तुम्हारे हाथ कितने खुरदुरे हैं\'), तो चरित्र.', '**लेखन अभ्यास:** **PEEL संरचना** में एक पैराग्राफ लिखवाएँ: **Point:** "बड़े बाबू का मौन सक्रिय प्रतिरोध है।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_005', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) सहायक पात्रों के लिए वह विश्लेषणात्मक प्रक्रिया.',
          hint: 'यदि फँस जाएँ तो c12_hin_v_cbse_03_004 (नायक चित्रण) के \'कार्यात्मक विश्लेषण\' खंड को.',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों का चित्रण लिखते समय उनकी **\'विशेषताओं\' (traits) की सूची** बना देते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) सहायक पात्रों के लिए वह विश्लेषणात्मक प्रक्रिया है जिसमें',
                  options: ['पात्र-चित्रण (Character Sketch) सहायक पात्रों के लिए वह विश्लेषणात्मक प्रक्रिया है जिसमें', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि फँस जाएँ तो c12_hin_v_cbse_03_004 (नायक चित्रण) के \'कार्यात्मक विश्लेषण\' खंड को दोहराएँ — वही.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों का चित्रण लिखते समय उनकी **\'विशेषताओं\' (traits) की सूची** बना देते हैं — जैसे "माँ दयालु है, दाई.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र को c12_hin_v_cbse_03_004 (नायक चित्रण) पुनः पढ़ने को कहें — वहाँ नायक के गुणों को कथानक-कार्य से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_006', difficulty: 'standard',
          question: '"अतीत में दबे पाँव" का **मुख्य विषय** है: **व्यक्तिगत और सामाजिक स्मृति का.',
          hint: 'यदि अटक जाएँ तो **c12_hin_v_cbse_03_002 (कथानक)** के "प्रमुख मोड़" खंड को दोबारा पढ़ें और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "लेखक क्या कहना चाहता है"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"अतीत में दबे पाँव" का **मुख्य विषय** है: **व्यक्तिगत और सामाजिक स्मृति का वर्तमान पर',
                  options: ['"अतीत में दबे पाँव" का **मुख्य विषय** है: **व्यक्तिगत और सामाजिक स्मृति का वर्तमान पर', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि अटक जाएँ तो **c12_hin_v_cbse_03_002 (कथानक)** के "प्रमुख मोड़" खंड को दोबारा पढ़ें और वहाँ से.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "लेखक क्या कहना चाहता है"। **वास्तविकता:** विषय (theme).' }
          ],
            remediations: { 'theme': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के तीन प्रसंग चुनो जहाँ अतीत अचानक वर्तमान में घुसा। प्रत्येक के लिए लिखो: (क) अतीत का.', '(ख) वह वर्तमान में कैसे घुसा?', '(ग) नायक पर तत्काल प्रभाव क्या पड़ा?" **चरण 2:** इन तीनों को मिलाकर एक वाक्य में **पैटर्न** लिखवाएँ: "हर बार अतीत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
