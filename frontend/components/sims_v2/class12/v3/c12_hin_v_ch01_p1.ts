import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch01_p1: SimDef = {
    id: 'v3_c12_hin_v_ch01_p1',
    title: 'सल्विर वैडिंग · Part 1/3',
    subtitle: 'He built the home that would replace him',
    classLevel: 12, subject: 'hin_v', topic: 'सल्विर वैडिंग · Part 1/3',
    chapters: ['c12_hin_v_ch01'],
    nodeIds: ['c12_hin_v_cbse_01_001', 'c12_hin_v_cbse_01_002', 'c12_hin_v_cbse_01_003', 'c12_hin_v_cbse_01_004', 'c12_hin_v_cbse_01_005', 'c12_hin_v_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Domestic-fiction reader', intro: 'A story where nothing violent happens — except a father funding the place where he\'ll wait to be forgotten.', goal: 'Read Silver Wedding through the joint-to-nuclear transition — \'log kya kahenge\' versus the ethics of old age.' },
    discovery: {
        question: 'An old man builds a retirement home with his own hands — not for himself, but so his children\'s guilt never has to show. Passive victim, or something else?',
        options: ['Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world', 'Passive — things happen to him', 'Cruel manipulation', 'Just retirement planning'],
        answer: 'Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world',
        hook: 'The villain isn\'t poverty — it\'s prosperity: \'log kya kahenge\' replaces love with performance, and the silver wedding of marriage becomes a silver waiting room for the parents. Vanaprastha was chosen withdrawal; the retirement home is bureaucratic deposit — that\'s the modernity critique.',
    },
    teaching: [
        { title: 'सल्विर वैडिंग — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की सामाजिक-सांस्कृतिक-राजनीतिक परिस्थितियों (पृष्ठभूमि) तथा रचनाकार के जीवनानुभव, विचारधारा, भाषा-शैली एवं रचनात्मक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the silver wedding of abandonment: weigh \'log kya kahenge\' as a governing force, separate chosen renunciation from deposited old age, and read the quiet defiance inside \'jo hoga hoga.\'',
        labels: ['सल्विर वैडिंग — पृष्ठभूमि', 'सल्विर वैडिंग — कथानक', 'सल्विर वैडिंग — पाठ्य-परिवेश', 'सल्विर वैडिंग — पात्र-चित्रण', 'सल्विर वैडिंग — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at an old-age home, you find one resident, Shyam Lal, drifting mid-sentence into stories of his dead friend Phunkun whenever a train whistle sounds. The coordinator wants him \'redirected to the present\' every time.',
            decisions: [{ prompt: 'What does the story\'s dual-timeline structure say about that redirection?', options: [
                { text: 'Don\'t snap the thread — the story shows memory triggered by sound and sight is how he survives the present; the flashbacks aren\'t confusion but the architecture of a self, and dragging him \'back\' severs the only continuity he has.', outcome: 'The chapter\'s point: the non-linear present-past weave enacts memory-as-survival — what remains when everything else fades isn\'t the present but the friendship the present keeps summoning.' },
                { text: 'Support the redirection — dwelling in the past is unhealthy and the present is where he should live.', outcome: 'The story deliberately refuses that framing: the past isn\'t escape from his life, it IS the substance of it — the old-age home is bare precisely because the memories are full.', reveals: 'present-over-memory' },
                { text: 'Let him wander but treat the stories as symptoms of decline to be managed.', outcome: 'The chapter\'s ending is a spiral, not a circle — he returns to the same road and tree irreversibly changed; reading the returns as symptoms misses that each repetition carries accumulated meaning, not deterioration.', reveals: 'memory-is-symptom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a family story as a verdict on prosperity — where the eldest generation builds the very institution that will erase it.',
            decisions: [{ prompt: 'What comes next? सल्विर वैडिंग · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सल्विर वैडिंग · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल.',
          hint: 'यदि अटके: कक्षा 11 वितान पाठ 1 (c11_hin_v_cbse_01_001) का \'रचनाकार परिचय → रचना संबंध\'.',
          misconception: 'छात्र अक्सर मानते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार की जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के प्रमुख पात्र'],
                  hint: 'यदि अटके: कक्षा 11 वितान पाठ 1 (c11_hin_v_cbse_01_001) का \'रचनाकार परिचय → रचना संबंध\' खंड दोहराएँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार की जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकों की सूची और पुरस्कार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "विष्णु प्रभाकर की जीवनी के 5 मुख्य बिंदु लिखो।" फिर पूछें — "इनमें से कौन सा बिंदु सल्विर.', 'जोड़कर दिखाओ।" चरण 2: यदि जोड़ न बना पाएँ, तो उन्हें c11_hin_v_cbse_01_001 (कक्षा 11 वितान पाठ 1 का पृष्ठभूमि नोड) पर.', 'एक पैराग्राफ में लिखो।" यह \'अनुप्रयोग-आधारित पुनरावृत्ति\' (application-based revision) है, केवल पठन नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_002', difficulty: 'standard',
          question: '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि.',
          hint: 'यदि फ्रीटैग पिरामिड या फ्लैशबैक स्पष्ट न हो, तो **c11_hin_v_cbse_01_002** के \'कथानक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "अध्याय क्रम = कथानक क्रम"। वे **अध्याय 5 को फ्लैशबैक** मानते हैं क्योंकि वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि',
                  options: ['**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के प्रमुख पात्र'],
                  hint: 'यदि फ्रीटैग पिरामिड या फ्लैशबैक स्पष्ट न हो, तो **c11_hin_v_cbse_01_002** के \'कथानक विश्लेषण\' खंड.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "अध्याय क्रम = कथानक क्रम"। वे **अध्याय 5 को फ्लैशबैक** मानते हैं क्योंकि वह अतीत में जाता है, पर.' }
          ],
            remediations: { '5': { steps: ['**चरण 1:** छात्र से कहो — "पाठ के 5 प्रमुख घटनाक्रम कालानुक्रमिक क्रम में लिखो" (कथानक पुनर्निर्माण)। **चरण 2:** फिर.', 'प्रत्येक अध्याय-सीमा पर क्या **लाभ/हानि** हुई?" **चरण 3:** यदि अटके, तो **c11_hin_v_cbse_01_002** (कक्षा 11 वितान पाठ 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और.',
          hint: 'अगर फँस जाएँ तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'नमक का दरोगा\', \'अपू के साथ ढाई साल\').',
          misconception: 'छात्र \'परिवेश\' (Setting) और \'वातावरण\' (Atmosphere) को एक ही मान लेते हैं — वे लिखते हैं: \'कहानी पहाड़ों पर घटती है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के प्रमुख पात्र'],
                  hint: 'अगर फँस जाएँ तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'नमक का दरोगा\', \'अपू के साथ ढाई साल\') का.',
                  misconception: 'छात्र \'परिवेश\' (Setting) और \'वातावरण\' (Atmosphere) को एक ही मान लेते हैं — वे लिखते हैं: \'कहानी पहाड़ों पर घटती है, इसलिए वातावरण ठंडा है।\'.' }
          ],
            remediations: { 'setting-atmosphere': { steps: ['चरण 1: छात्र से कहें — \'आँख बंद करो और दो दृश्य कल्पना करो: (अ) तुम्हारा अपना कमरा दोपहर में, (ब) वही कमरा आधी रात में.', 'अंतर लिखो।\' चरण 2: अब \'सल्विर वैडिंग\' के दो पैराग्राफ दें — एक जहाँ सल्विर सुबह नदी किनारे खड़ा है (शांत/पवित्र), दूसरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के.',
          hint: 'यदि छात्र नायक के संवाद और वर्णन में अंतर नहीं कर पाता, तो **कक्षा ११, नोड.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है — पात्र के गुणों की **सूची (List)** बनाना: "वह बहादुर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Character Sketch) वह साहित्यिक विश्लेषण है जिसमें किसी कृति के प्रमुख पात्र', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'यदि छात्र नायक के संवाद और वर्णन में अंतर नहीं कर पाता, तो **कक्षा ११, नोड c11_hin_v_cbse_01_004**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है — पात्र के गुणों की **सूची (List)** बनाना: "वह बहादुर था, ईमानदार था, गरीब.' }
          ],
            remediations: { 'list': { steps: ['**चरणबद्ध उपचार:** (१) छात्र को पाठ के **केवल नायक-संबंधी अंश** (संवाद, वर्णन, कार्य) अलग कागज पर उतारने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे.',
          hint: 'यदि अटके: c12_hin_v_cbse_01_003 (पाठ्य-परिवेश) दोबारा पढ़ें — परिवेश ही सहायक पात्रों की.',
          misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों का चित्रण करते समय उनके **व्यक्तिगत गुण-दोष (traits)** गिनाना ही पर्याप्त है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे बढ़ाने,',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक की कथा-यात्रा को आगे बढ़ाने,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'यदि अटके: c12_hin_v_cbse_01_003 (पाठ्य-परिवेश) दोबारा पढ़ें — परिवेश ही सहायक पात्रों की.',
                  misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों का चित्रण करते समय उनके **व्यक्तिगत गुण-दोष (traits)** गिनाना ही पर्याप्त है — जैसे \'पुजारी लालची था\'.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र को c11_hin_v_cbse_01_005 (कक्षा 11 का सहायक पात्र नोड) पुनः पढ़ने को कहें — विशेषतः "पात्र का.', '**चरण 2:** पाठ *सल्विर वैडिंग* से **एक सहायक पात्र** (जैसे पुजारी) चुनें और छात्र से पूछें: "इस पात्र को हटा दें तो कथा.', '**चरण 3:** यदि उत्तर अभी भी "गुणों की सूची" है, तो **PEEL संरचना** (Point-Evidence-Explanation-Link) का मॉडल उत्तर.', '**पुनः निदान:** चरण 2 का प्रश्न दोहराएँ — अब उत्तर में "कार्य/प्रतीक" होना चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र.',
          hint: 'यदि अटके तो कक्षा 11 वितान पाठ 1, 2, 3 के \'मुख्य विषय और संदेश\' नोड्स.',
          misconception: 'विद्यार्थी **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं — वे लिखते हैं "विषय: सल्विर टोकरी बुनता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'यदि अटके तो कक्षा 11 वितान पाठ 1, 2, 3 के \'मुख्य विषय और संदेश\' नोड्स (c11_hin_v_cbse_01_006.',
                  misconception: 'विद्यार्थी **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं — वे लिखते हैं "विषय: सल्विर टोकरी बुनता है, गाँव वाले मज़ाक उड़ाते.' }
          ],
            remediations: { 'theme-plot': { steps: ['विद्यार्थी से कहें: "पाठ के **तीन सबसे मार्मिक प्रसंग** चुनो जहाँ तुम्हें लगा \'यह बात लेखक के मन की है\'।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यहाँ लेखक **क्या प्रश्न** उठा रहा है?" (जैसे: क्या श्रम का मूल्य वेतन से तय होता है?).', 'तीनों प्रश्नों में **साझा शब्द** ढूँढ़वाएँ (श्रम, गरिमा, अस्मिता) — वही **मुख्य विषय** है। 4.', 'अब पूछें: "इस विषय से तुम अपने जीवन के लिए **एक सीख** क्या लोगे?" — वही **संदेश** है। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
