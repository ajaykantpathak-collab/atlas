import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p2: SimDef = {
    id: 'v3_c12_hin_v_ch03_p2',
    title: 'अतीत में दबे पाँव · Part 2/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 2/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_007', 'c12_hin_v_cbse_03_008', 'c12_hin_v_cbse_03_009', 'c12_hin_v_cbse_03_010', 'c12_hin_v_cbse_03_011', 'c12_hin_v_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो पाठ के मुख्य विषय के समानांतर चलता हुआ, उसे स्पष्ट, समृद्ध या विस्तारित करता है, परंतु स्वतंत्र रूप से पाठ का केंद्रीय संदेश नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'What comes next? अतीत में दबे पाँव · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अतीत में दबे पाँव · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो पाठ के मुख्य विषय के.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c12_hin_v_cbse_03_006 (मुख्य विषय और संदेश)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति:** "गौण विषय = कम अंक वाला विषय / वैकल्पिक विषय / केवल प्रसंगों की सूची।" **वास्तविकता:** CBSE बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो पाठ के मुख्य विषय के समानांतर चलता',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो पाठ के मुख्य विषय के समानांतर चलता', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c12_hin_v_cbse_03_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को.',
                  misconception: '**विशिष्ट भ्रांति:** "गौण विषय = कम अंक वाला विषय / वैकल्पिक विषय / केवल प्रसंगों की सूची।" **वास्तविकता:** CBSE बोर्ड में गौण विषय पर.' }
          ],
            remediations: { 'cbse-4-6': { steps: ['**पुनः पठन (Re-read):** पाठ के वे 3-4 प्रसंग चिह्नित करें जो मुख्य कथानक (लेखक की स्मृति-यात्रा) से सीधे नहीं जुड़े.', '**तालिका बनाएं:** तीन कॉलम — (क) गौण विषय का नाम, (ख) पाठ्य-साक्ष्य (पंक्ति/प्रसंग), (ग) मुख्य विषय से संबंध.', '**PEEL अभ्यास:** प्रत्येक गौण विषय के लिए एक PEEL अनुच्छेद लिखें। 4.', '**पुनः निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 और 4 को दोबारा हल करें — यदि अब उत्तर में \'कार्यात्मक विश्लेषण\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 11 का नोड **c11_hin_v_cbse_03_008** (बिंब और रूपक) दोबारा.',
          misconception: 'छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = सजावटी भाषा (ornamental language)**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 11 का नोड **c11_hin_v_cbse_03_008** (बिंब और रूपक) दोबारा पढ़ें, विशेषकर.',
                  misconception: 'छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = सजावटी भाषा (ornamental language)**। **वास्तविकता:** बिंब.' }
          ],
            remediations: { 'visual-description-ornamental-language': { steps: ['छात्र से कहें: "आँख बंद करो। मैं \'बारिश\' कहूँगा — तुम्हें क्या **सूँघाई** देता है?', 'त्वचा पर क्या **महसूस** होता है?" — पाँचों इंद्रियों के बिंब अलग-अलग लिखवाएँ। 2.', 'रूपक के लिए: दो असंबद्ध वस्तुएँ दें (जैसे: \'समय\' और \'नदी\') — छात्र से कहें **"समय नदी है" लिखकर 3 समानताएँ निकालो**.', 'पुनः निदान: Diagnostic Q2 और Q5 दोहराएँ — अब छात्र उपमान/उपमेय क्रम और रूपक/उपमा भेद सही कर पाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_009', difficulty: 'standard',
          question: 'विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने.',
          hint: 'यदि अटके तो Class 11 वितान पाठ-3 के नोड **c11_hin_v_cbse_03_009** के कार्य-उदाहरण (Worked.',
          misconception: 'विद्यार्थी प्रायः **विरोधाभास को \'विरोधाभासी कथन\' (Contradictory statement) मान लेते हैं** — जैसे \'वह रोता हुआ हँस रहा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या',
                  options: ['विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि अटके तो Class 11 वितान पाठ-3 के नोड **c11_hin_v_cbse_03_009** के कार्य-उदाहरण (Worked Examples).',
                  misconception: 'विद्यार्थी प्रायः **विरोधाभास को \'विरोधाभासी कथन\' (Contradictory statement) मान लेते हैं** — जैसे \'वह रोता हुआ हँस रहा था\' — और समझते हैं.' }
          ],
            remediations: { 'contradictory-statement': { steps: ['विद्यार्थी को पाठ के **तीन विशिष्ट अंश** दें जहाँ विरोधाभास स्पष्ट हो (जैसे: घर का आकार, नीम का पेड़, चाबी-ताला) और.', 'तीसरी कौन-सी बात उभरती है जो दोनों से बड़ी है?" 2.', 'प्रतीक के लिए: एक **प्रतीक-मानचित्र** (Symbol Map) बनवाएँ — केंद्र में वस्तु (नीम), चार दिशाओं में: भौतिक गुण.', 'पुनः निदान: DIAGNOSTIC_QUESTION_3 और 4 फिर से करवाएँ; यदि अब भी \'सतही अर्थ\' पर अटका है, तो Class 11 के नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary/Glossary) refers to the set of key domain-specific words.',
          hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 11 वितान के "पदावली: मुख्य शब्द" नोड.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पदावली प्रश्नों में "शब्दार्थ" (dictionary meaning) लिख देना पर्याप्त है — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary/Glossary) refers to the set of key domain-specific words, technical',
                  options: ['पदावली (Vocabulary/Glossary) refers to the set of key domain-specific words, technical', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 11 वितान के "पदावली: मुख्य शब्द" नोड (c11_hin_v_cbse_03_010) के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पदावली प्रश्नों में "शब्दार्थ" (dictionary meaning) लिख देना पर्याप्त है — वे *संदर्भगत प्रकार्य*.' }
          ],
            remediations: { 'dictionary-meaning-contextual-function': { steps: ['**पुनः पाठ-पठन (Re-reading):** छात्र को पाठ के वे 5-6 पैराग्राफ पढ़ने को कहें जहाँ प्रमुख पदावली प्रयुक्त हुई हैं.', '**तुलनात्मक सारणी (Comparative Table):** एक सारणी बनाएँ: स्तंभ 1 = पद, स्तंभ 2 = शब्दकोश अर्थ, स्तंभ 3 = पाठ में.', '**लघु-लेखन (Micro-writing):** प्रत्येक पद के लिए 2-3 वाक्यों में लिखें: "लेखक ने ______ शब्द क्यों चुना?', '______ जैसे सरल शब्द से क्या भिन्न प्रभाव पड़ता?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा अपने विचारों, भावों और परिवेश को.',
          hint: 'यदि पद-परिचय या वाक्य-भेद पहचानने में अटकें, तो कक्षा 10/11 की हिंदी व्याकरण पुस्तक के.',
          misconception: 'छात्र प्रायः मानते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों की पहचान\' या \'अलंकारों की सूची बनाना\' है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा अपने विचारों, भावों और परिवेश को व्यक्त',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा अपने विचारों, भावों और परिवेश को व्यक्त', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि पद-परिचय या वाक्य-भेद पहचानने में अटकें, तो कक्षा 10/11 की हिंदी व्याकरण पुस्तक के \'पद-परिचय\'.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों की पहचान\' या \'अलंकारों की सूची बनाना\' है। वे \'दबे पाँव\' को मुहावरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पाठ के पहले दो अनुच्छेद जोर से पढ़वाएँ और पूछें: \'कौन-से शब्द तुम्हारे कानों को अलग लगे?', 'क्यों?\' — इससे ध्वनि-बोध जगेगा। चरण 2: शीर्षक \'अतीत में दबे पाँव\' को बोर्ड पर लिखें; \'दबे\' और \'पाँव\' को अलग-अलग रंग से.', 'यदि "पाँव" हट जाए तो?\' — इससे पदबंध-कार्य स्पष्ट होगा। चरण 3: एक वाक्य लें: \'इतिहास दबे पाँव आता है।\' इसे कर्मणी वाच्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_012', difficulty: 'standard',
          question: 'बोध-प्रश्न पाठ की समझ जांचने के दो प्रकार के प्रश्न होते हैं: **वस्तुनिष्ठ.',
          hint: 'यदि छात्र आशय-सूचक प्रश्नों में \'क्या\' (What) और \'क्यों\' (Why) का अंतर नहीं कर पा रहा, तो.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्नों का उत्तर पाठ की पंक्तियों को ज्यों-का-त्यों उद्धृत (Quote).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न पाठ की समझ जांचने के दो प्रकार के प्रश्न होते हैं: **वस्तुनिष्ठ प्रश्न**',
                  options: ['बोध-प्रश्न पाठ की समझ जांचने के दो प्रकार के प्रश्न होते हैं: **वस्तुनिष्ठ प्रश्न**', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्नों में \'क्या\' (What) और \'क्यों\' (Why) का अंतर नहीं कर पा रहा, तो तुरंत.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्नों का उत्तर पाठ की पंक्तियों को ज्यों-का-त्यों उद्धृत (Quote) करके या उनका हिंदी.' }
          ],
            remediations: { 'quote-inferential-evidence': { steps: ['**चरणबद्ध उपचार (Remediation Path):** 1.', '**निदान (Diagnose):** छात्र से एक आशय-सूचक प्रश्न पूछें और उसका उत्तर लिखवाएँ। यदि वह पंक्तियाँ कॉपी करता है या केवल.', '**स्पष्टीकरण (Clarify):** उसे समझाएँ — "पाठ = कच्चा माल (Raw Material), तुम्हारा दिमाग = फैक्ट्री, उत्तर = तैयार माल.', '**अभ्यास (Guided Practice):** पाठ के 3-4 छोटे अंश दें। प्रत्येक के लिए कहें: (क) एक वस्तुनिष्ठ प्रश्न बनाओ, (ख) एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
