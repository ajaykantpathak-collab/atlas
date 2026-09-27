import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p2: SimDef = {
    id: 'v3_c12_hin_al_ch02_p2',
    title: 'बस्किोहर की माटी · Part 2/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'बस्किोहर की माटी · Part 2/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_007', 'c12_hin_al_cbse_02_008', 'c12_hin_al_cbse_02_009', 'c12_hin_al_cbse_02_010', 'c12_hin_al_cbse_02_011', 'c12_hin_al_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'बस्किोहर की माटी — गौण विषय', text: 'गौण विषय वे अवधारणाएँ हैं जो मुख्य विषय का समर्थन करती हैं, कहानी की गहराई बढ़ाती हैं, और पात्रों या घटनाओं के माध्यम से अप्रत्यक्ष रूप से संदेश पहुंचाती हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['बस्किोहर की माटी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_al_cbse_02_009', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['आंतरिक संकेत का विश्लेषण करें — मुट्ठियों का खुलना-बंद होना.', 'निष्कर्ष निकालें कि यह विरोधाभास है क्योंकि बाहरी रूप से.', 'दिए गए वाक्य को पढ़कर मुख्य बिंदु पहचानें — युवक की शारीरिक.', 'विरोधाभास की परिभाषा याद रखें — जब बाहरी व्यवहार और आंतरिक.', 'बाहरी व्यवहार की पहचान करें — सिर झुकाना सम्मान या समर्पण.'], answer: 'दिए गए वाक्य को पढ़कर मुख्य बिंदु पहचानें — युवक की शारीरिक. विरोधाभास की परिभाषा याद रखें — जब बाहरी व्यवहार और आंतरिक. बाहरी व्यवहार की पहचान करें — सिर झुकाना सम्मान या समर्पण. आंतरिक संकेत का विश्लेषण करें — मुट्ठियों का खुलना-बंद होना. निष्कर्ष निकालें कि यह विरोधाभास है क्योंकि बाहरी रूप से.' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'What comes next? बस्किोहर की माटी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बस्किोहर की माटी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय वे अवधारणाएँ हैं जो मुख्य विषय का समर्थन करती हैं, कहानी की गहराई.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो नोड c12_hin_al_cbse_02_006 (मुख्य विषय और.',
          misconception: 'छात्र अक्सर मानते हैं कि गौण विषय merely \'extra details\' हैं जो मुख्य कहानी को लंबा करने के लिए जोड़े गए हैं, और उनका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वे अवधारणाएँ हैं जो मुख्य विषय का समर्थन करती हैं, कहानी की गहराई बढ़ाती हैं, और',
                  options: ['गौण विषय वे अवधारणाएँ हैं जो मुख्य विषय का समर्थन करती हैं, कहानी की गहराई बढ़ाती हैं, और', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो नोड c12_hin_al_cbse_02_006 (मुख्य विषय और संदेश) की.',
                  misconception: 'छात्र अक्सर मानते हैं कि गौण विषय merely \'extra details\' हैं जो मुख्य कहानी को लंबा करने के लिए जोड़े गए हैं, और उनका मुख्य विषय से कोई.' }
          ],
            remediations: { 'merely-extra-details': { steps: ['छात्र को पाठ से दो विशिष्ट अंश देने कीजिए: एक जहाँ मुख्य पात्र अपनी इच्छा के खिलाफ काम कर रहा है (उदाहरण: पिता के खेत.', 'क्या दूसरी बिना पहली के समझ में आएगी?" इससे उन्हें दिखाइए कि गौण विषय कैसे मुख्य विषय की गहराई लाते हैं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_008', difficulty: 'standard',
          question: 'बिंब एक ऐसी छवि या प्रतीक है जो भावनात्मक या आध्यात्मिक अर्थ व्यक्त करती है.',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ से बिंब और रूपक के उदाहरणों को दोबारा देखिए, जैसे.',
          misconception: 'छात्र अक्सर बिंब और रूपक को एक ही मान लेते हैं और किसी भी तुलनात्मक भाषा को रूपक कहते हैं, जैसे "उसकी हँसी फूलों जैसी".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब एक ऐसी छवि या प्रतीक है जो भावनात्मक या आध्यात्मिक अर्थ व्यक्त करती है, जबकि रूपक दो',
                  options: ['बिंब एक ऐसी छवि या प्रतीक है जो भावनात्मक या आध्यात्मिक अर्थ व्यक्त करती है, जबकि रूपक दो', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ से बिंब और रूपक के उदाहरणों को दोबारा देखिए, जैसे.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को एक ही मान लेते हैं और किसी भी तुलनात्मक भाषा को रूपक कहते हैं, जैसे "उसकी हँसी फूलों जैसी" को केवल रूपक मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से दो वाक्य दीजिए: एक में स्पष्ट तुलना ("जैसे") और एक में प्रतीकात्मक उपयोग ("माटी की खुशबू")।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_009', difficulty: 'standard',
          question: 'विरोधाभास एक ऐसी स्थिति या कथन है जिसमें दो विरोधी तत्व एक साथ मौजूद होते हैं.',
          hint: 'यदि फँसें तो c12_hin_al_cbse_02_008 (बिंब और रूपक) पर फिर से जाएँ — विशेष रूप से वह भाग.',
          misconception: 'छात्र अक्सर विरोधाभास को केवल उन वाक्यों में देखते हैं जहां स्पष्ट रूप से विपरीत शब्द आए हों, जैसे "वह खुश था लेकिन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास एक ऐसी स्थिति या कथन है जिसमें दो विरोधी तत्व एक साथ मौजूद होते हैं, जिससे गहरा',
                  options: ['विरोधाभास एक ऐसी स्थिति या कथन है जिसमें दो विरोधी तत्व एक साथ मौजूद होते हैं, जिससे गहरा', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'यदि फँसें तो c12_hin_al_cbse_02_008 (बिंब और रूपक) पर फिर से जाएँ — विशेष रूप से वह भाग जहाँ चरित्र.',
                  misconception: 'छात्र अक्सर विरोधाभास को केवल उन वाक्यों में देखते हैं जहां स्पष्ट रूप से विपरीत शब्द आए हों, जैसे "वह खुश था लेकिन दुखी भी" — लेकिन वे उन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पहले छात्र से कहें कि वे पाठ के किसी दृश्य को पढ़ें जहाँ चरित्र बोल रहा हो। फिर उनसे पूछें: "इस वाक्य के शब्द क्या कह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_010', difficulty: 'standard',
          question: '"पदावली: मुख्य शब्द" refers to the curated glossary of key lexical items.',
          hint: 'If stuck on contextual meaning: re-read the **paragraph before and after** the target.',
          misconception: '**विशिष्ट भ्रांति:** "पदावली का अर्थ है कठिन शब्दों की सूची बनाकर उनके शब्दकोशीय अर्थ रट लेना।" **वास्तविकता:** इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पदावली: मुख्य शब्द" refers to the curated glossary of key lexical items (words, phrases,',
                  options: ['"पदावली: मुख्य शब्द" refers to the curated glossary of key lexical items (words, phrases,', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'If stuck on contextual meaning: re-read the **paragraph before and after** the target word — 90%.',
                  misconception: '**विशिष्ट भ्रांति:** "पदावली का अर्थ है कठिन शब्दों की सूची बनाकर उनके शब्दकोशीय अर्थ रट लेना।" **वास्तविकता:** इस अध्याय में 70% प्रमुख.' }
          ],
            remediations: { '70': { steps: ['**पुनः पाठ पढ़ें** केवल "शब्द-शिकारी" की तरह: हर वाक्य में 1 ऐसा शब्द छाँटें जिसका अर्थ आप *संदेह* के साथ जानते हों। 2.', '**तीन-स्तरीय तालिका बनाएँ** (शब्द | शाब्दिक अर्थ | पाठ में लाक्षणिक अर्थ | व्यंजक अर्थ) — कम से कम 10 शब्दों के लिए। 3.', '**पीयर-टेस्ट:** किसी सहपाठी को अपना शब्द दें, उससे पूछें "इस शब्द से तुझे क्या *महसूस* होता है पाठ पढ़कर?" — यदि वह.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 फिर से हल करें — इस बार 3 के बजाय 5 प्रसंग दीजिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा कथानक, पात्र और परिवेश को सजीव बनाने.',
          hint: 'अगर अटका हुआ महसूस हो तो कक्षा 11 के किसी भी \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
          misconception: 'विद्यार्थी समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' या \'मुहावरों की सूची बनाना\' है; जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा कथानक, पात्र और परिवेश को सजीव बनाने के लिए',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा कथानक, पात्र और परिवेश को सजीव बनाने के लिए', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'अगर अटका हुआ महसूस हो तो कक्षा 11 के किसी भी \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
                  misconception: 'विद्यार्थी समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' या \'मुहावरों की सूची बनाना\' है; जबकि वास्तव में बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: पाठ के किसी एक पृष्ठ से 5 देशज शब्द, 3 मुहावरे, 2 अलंकार छाँट कर अलग कागज़ पर लिखें। चरण 2: प्रत्येक के सामने.', 'चरण 3: अपने उत्तर को मॉडल उत्तर (शिक्षक/NCERT समाधान) से मिलाएँ; जहाँ अंतर दिखे, वहाँ \'क्यों\' पूछें। चरण 4: एक सप्ताह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_012', difficulty: 'standard',
          question: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, तथ्य, तर्क एवं भाषा-शैली की.',
          hint: 'यदि प्रसंग पहचानने में अटके → c12_hin_al_cbse_02_002 (कथानक) और c12_hin_al_cbse_02_003.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है — **पाठ की पंक्तियों का हिंदी अनुवाद/सारांश** लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, तथ्य, तर्क एवं भाषा-शैली की समझ की',
                  options: ['बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, तथ्य, तर्क एवं भाषा-शैली की समझ की', 'बस्किोहर की माटी के पृष्ठभूमि और रचनाकार परिचय में लेखक रामधारी सिंह दिनकर के व्यक्तिगत,', 'कथानक (Plot) किसी कहानी की मुख्य घटनाओं का अनुक्रमिक विकास है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौगोलिक, सामाजिक, सांस्कृतिक एवं प्राकृतिक'],
                  hint: 'यदि प्रसंग पहचानने में अटके → c12_hin_al_cbse_02_002 (कथानक) और c12_hin_al_cbse_02_003 (परिवेश).',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है — **पाठ की पंक्तियों का हिंदी अनुवाद/सारांश** लिख देना। वास्तव में.' }
          ],
            remediations: { 'cbse-2023-24-independent-interpretation': { steps: ['**निदान**: छात्र से कहें — "पाठ का कोई एक पैराग्राफ पढ़कर **एक वाक्य में उसका आशय** बताओ, पाठ के शब्द न दोहराओ।" यदि वह.', '**मॉडलिंग**: शिक्षक उसी पैरा का PEEL उत्तर **बोलकर** दिखाए — Point, Evidence, Explanation, Link चरण अलग-अलग बोलें। 3.', '**अभ्यास**: छात्र को 3 अलग प्रसंग दें; प्रत्येक पर **केवल Point लिखने** को कहें (पहला चरण)। फिर Evidence जोड़ें। फिर.', '**पुनः निदान**: अगले कक्षा में अनदेखा अंश देकर वही प्रक्रिया दोहराएँ — समय सीमा 5 मिनट।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
