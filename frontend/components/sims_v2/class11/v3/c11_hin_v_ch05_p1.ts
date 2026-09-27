import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p1: SimDef = {
    id: 'v3_c11_hin_v_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_001', 'c11_hin_v_cbse_05_002', 'c11_hin_v_cbse_05_003', 'c11_hin_v_cbse_05_004', 'c11_hin_v_cbse_05_005', 'c11_hin_v_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश तथा रचनाकार के जीवनानुभव, विचारधारा एवं रचनात्मक दृष्टि का वह विश्लेषणात्मक अध्ययन है जो पाठ के अंतर्निहित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict).', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटकें, तो **कक्षा 10 इतिहास (भारत और समकालीन विश्व-II) के अध्याय \'स्वातंत्र्योत्तर.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार की **जन्म-तिथि, मृत्यु-तिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटकें, तो **कक्षा 10 इतिहास (भारत और समकालीन विश्व-II) के अध्याय \'स्वातंत्र्योत्तर भारत\'** तथा.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार की **जन्म-तिथि, मृत्यु-तिथि, पुरस्कारों की सूची.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार**: (1) **तालिका बनाएँ**: दो कॉलम — बाएँ कॉलम में रचनाकार के जीवन के **3-4 ठोस अनुभव** लिखें (जैसे: गाँव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष.',
          hint: 'यदि अटके: E.M. फॉर्स्टर का प्रसिद्ध उदाहरण ("The king died and then the queen died" बनाम.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'कथानक के सोपान\' (plot stages) को \'घटनाओं के बराबर भाग\' (equal segments) मान लेते हैं — जैसे १०.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)',
                  options: ['कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटके: E.M. फॉर्स्टर का प्रसिद्ध उदाहरण ("The king died and then the queen died" बनाम "The king.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'कथानक के सोपान\' (plot stages) को \'घटनाओं के बराबर भाग\' (equal segments) मान लेते हैं — जैसे १० घटनाएँ हैं तो.' }
          ],
            remediations: { 'plot-stages-equal-segments': { steps: ['**दृश्य सुधार:** छात्र को एक जानी-पहचानी फिल्म (जैसे *शोले* या *दंगल*) का कथानक-आरेख बनाने को कहें, परंतु **समय-रेखा.', '**कारण-कार्य तीर:** हर घटना के लिए "इसलिए" (therefore) बनाम "फिर" (and then) का परीक्षण कराएँ — केवल "इसलिए" वाले तीर.', '**लघु-कथा अभ्यास:** ६ वाक्यों की कहानी लिखवाएँ जहाँ प्रत्येक वाक्य एक सोपान हो — इससे सोपानों की *कार्यात्मक भिन्नता*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल.',
          hint: 'यदि अटका हुआ महसूस करें तो \'कथानक और आख्यान-संरचना\' (c11_hin_v_cbse_05_002) के \'कथानक के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'परिवेश\' को स्थैतिक (static) पृष्ठभूमि मानते हैं और \'वातावरण\' को केवल \'मूड\' (mood) समझकर रुक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक',
                  options: ['पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस करें तो \'कथानक और आख्यान-संरचना\' (c11_hin_v_cbse_05_002) के \'कथानक के चरण\' भाग.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'परिवेश\' को स्थैतिक (static) पृष्ठभूमि मानते हैं और \'वातावरण\' को केवल \'मूड\' (mood) समझकर रुक जाते हैं। वे यह.' }
          ],
            remediations: { 'static-mood': { steps: ['**चरण 1:** छात्र को एक परिचित स्थान (अपना कमरा/स्कूल का बरामदा) चुनने को कहें — उससे पूछें: "यहाँ अभी क्या गंध है?', 'कौन-सी आवाज़ सबसे तीखी है?', 'दीवार का तापमान कैसा है?" — इन्हें लिखवाएँ। **चरण 2:** अब पूछें: "यहीं बैठकर तुम्हें कोई बुरी खबर मिले तो ये विवरण कैसे.', 'अच्छी खबर मिले तो?" — छात्र स्वयं महसूस करेगा कि **भौतिक परिवेश वही है, वातावरण बदल गया**। **चरण 3:** पाठ के किसी अंश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_v_cbse_05_002)** के \'उत्कर्ष (Climax)\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का चित्रण करने का अर्थ है उसके **गुणों (Traits) की सूची** बनाना — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_v_cbse_05_002)** के \'उत्कर्ष (Climax)\' और \'पतन.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का चित्रण करने का अर्थ है उसके **गुणों (Traits) की सूची** बनाना — जैसे: "नायक साहसी, ईमानदार.' }
          ],
            remediations: { 'traits': { steps: ['**PEEL संरचना का अभ्यास कराएँ:** एक गुण चुनें (Point) → पाठ से सटीक उद्धरण/प्रसंग दें (Evidence) → समझाएँ कि यह प्रसंग.', '**\'क्यों\' की सीढ़ी चढ़ाएँ:** छात्र से एक गुण लिखवाएँ, फिर पूछें "पाठ में कहाँ?" → "यह प्रसंग गुण कैसे दर्शाता है?" →.', '**विरोधाभासी गुण ढूँढवाएँ:** नायक में एक साथ मौजूद दो विरोधी लक्षण (जैसे: क्रोधी परंतु दयालु) पहचानने को कहें — इससे.', '**मॉडल उत्तर दिखाएँ:** एक कमजोर उत्तर (सूची मात्र) और एक सशक्त उत्तर (PEEL युक्त) साथ रखकर तुलना कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_005', difficulty: 'standard',
          question: 'सहायक पात्र वे गौण चरित्र हैं जो कथानक में नायक के समानांतर या उसके संपर्क में.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_05_004 (नायक का चरित्र-चाप)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि "सहायक पात्र का महत्त्व केवल नायक के साथ उसके संबंध में है" — वे पात्र के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे गौण चरित्र हैं जो कथानक में नायक के समानांतर या उसके संपर्क में रहकर कथा',
                  options: ['सहायक पात्र वे गौण चरित्र हैं जो कथानक में नायक के समानांतर या उसके संपर्क में रहकर कथा', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_05_004 (नायक का चरित्र-चाप)** और **c11_hin_v_cbse_05_002.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि "सहायक पात्र का महत्त्व केवल नायक के साथ उसके संबंध में है" — वे पात्र के **स्वतंत्र उपकथानक.' }
          ],
            remediations: { 'independent-subplot': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 5 खोलें और उस सहायक पात्र के **केवल वही दृश्य/पृष्ठ** चिह्नित करें जहां नायक **उपस्थित.', 'किससे टकरा रहा है?" — उत्तर लिखवाएं। **चरण 3:** फिर पूछें: "अगर ये दृश्य हटा दिए जाएं, तो पाठ का कौन-सा विषय (theme).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या सार्वभौमिक सत्य है जो.',
          hint: 'यदि अटके तो \'कथानक संरचना\' (नोड 002) के \'चरमोत्कर्ष\' (climax) और \'पतन क्रिया\' (falling.',
          misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं — जैसे "बड़ों का सम्मान करो" या "सपने पूरे करो"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण रचना',
                  options: ['मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण रचना', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटके तो \'कथानक संरचना\' (नोड 002) के \'चरमोत्कर्ष\' (climax) और \'पतन क्रिया\' (falling action) भाग.',
                  misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं — जैसे "बड़ों का सम्मान करो" या "सपने पूरे करो"। यह भ्रम इसलिए होता.' }
          ],
            remediations: { 'moral-lesson-10-11-open': { steps: ['छात्र से कहें: "पाठ के तीन प्रसंग चुनो जहां नायक को \'चुनना\' पड़ता है — प्रत्येक में वह क्या चुनता है, क्या छोड़ता है.', 'फिर पूछें: "इन तीनों प्रसंगों में कॉमन पैटर्न क्या है?', 'उसे एक वाक्य में लिखो — वही विषय है।" 3.', 'अंत में: "लेखक ने नायक को अंत में \'सफल\' दिखाया या \'संघर्षरत\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
