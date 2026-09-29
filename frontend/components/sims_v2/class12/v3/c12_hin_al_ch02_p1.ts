import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p1: SimDef = {
    id: 'v3_c12_hin_al_ch02_p1',
    title: 'बस्किोहर की माटी · Part 1/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'बस्किोहर की माटी · Part 1/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_001', 'c12_hin_al_cbse_02_002', 'c12_hin_al_cbse_02_003', 'c12_hin_al_cbse_02_004', 'c12_hin_al_cbse_02_005', 'c12_hin_al_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'बस्किोहर की माटी — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['बस्किोहर की माटी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_001', title: 'बस्किोहर की माटी — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतराल भाग-2 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "फुलचंद की एकवह" and what is his primary literary identity?', options: [
                { text: 'Correct answer: Upendranath Ashk (उपेन्द्रनाथ अश्क), a prominent Hindi writer known for', outcome: 'Correct answer: Upendranath Ashk (उपेन्द्रनाथ अश्क), a prominent Hindi writer known for short.' },
                { text: 'Premchand or guessing a poet', outcome: 'Not quite — Students often treat the "Before You Read" section as optional background trivia and skip.', reveals: 'students-often-treat-the-before' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'What comes next? बस्किोहर की माटी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बस्किोहर की माटी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1.',
          misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)', '\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1 introduction).',
                  misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text will explain.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the textbook’s पाठ परिचय and लेखक परिचय boxes aloud.', 'Make a 3‑column table: Author Facts | Genre Features | Setting Details.', 'Revisit Class 11 node c11_hin_ar_cbse_01_001 (Before You Read for Chapter 1) to recall how context was used there.', 'Write a 50‑word paragraph predicting the chapter’s mood using your table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Knowing the author’s life history is more important than understanding the genre conventions for appreciating this chapter." Defend your position.', answer: 'Correct evaluation: Disagree',
                  options: ['Correct evaluation: Disagree', 'life = text'],
                  hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1 introduction).',
                  misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text will explain.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the textbook’s पाठ परिचय and लेखक परिचय boxes aloud.', 'Make a 3‑column table: Author Facts | Genre Features | Setting Details.', 'Revisit Class 11 node c11_hin_ar_cbse_01_001 (Before You Read for Chapter 1) to recall how context was used there.', 'Write a 50‑word paragraph predicting the chapter’s mood using your table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_002', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' का कथानक — \'फणीश्वरनाथ रेणु की\' — अंतराल भाग-2 का पाठ। पाठ.',
          hint: 'यदि छात्र कथानक और आख्यान-संरचना के बीच भ्रम में है, तो उसे c11_hin_a_cbse_02_002 (कक्षा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कहानी में घटनाओं का उल्लेख है, तो उसका कथानक समझ लिया गया है — वे आख्यान-संरचना को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' का कथानक',
                  options: ['\'फणीश्वरनाथ रेणु की\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)', '\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण'],
                  hint: 'यदि छात्र कथानक और आख्यान-संरचना के बीच भ्रम में है, तो उसे c11_hin_a_cbse_02_002 (कक्षा 11 में.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कहानी में घटनाओं का उल्लेख है, तो उसका कथानक समझ लिया गया है — वे आख्यान-संरचना को केवल \'कठिन भाषा\' या \'अजीब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह कहानी के तीन क्षणों को चुनें जहाँ वक्त में अचानक उलटफेर हो (जैसे वर्तमान से अतीत में जाना), फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_003', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि \'सक्रिय परिवेश\' समझ न आए, तो कक्षा 11 के नोड c11_hin_al_cbse_02_003 (आवारा मसीहा.',
          misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को \'वर्णनात्मक अंश\' (descriptive passages) मानकर रट लेते हैं — जैसे \'कोसी नदी का वर्णन\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)',
                  options: ['\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण'],
                  hint: 'यदि \'सक्रिय परिवेश\' समझ न आए, तो कक्षा 11 के नोड c11_hin_al_cbse_02_003 (आवारा मसीहा.',
                  misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को \'वर्णनात्मक अंश\' (descriptive passages) मानकर रट लेते हैं — जैसे \'कोसी नदी का वर्णन\', \'गाँव का दृश्य\' — और.' }
          ],
            remediations: { 'descriptive-passages': { steps: ['चरण 1: पाठ के पहले 5 पृष्ठ फिर से पढ़ें, केवल उन वाक्यों को रेखांकित करें जहाँ परिवेश (नदी, मौसम, पेड़, पर्व) किसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_004', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फंस रहे हैं तो कक्षा 11 के c11_hin_a_cbse_02_004 नोड पर वापस जाएँ जहाँ चरित्र-चित्रण.',
          misconception: 'छात्र अक्सर नायक के चरित्र-चित्रण को केवल उनके सकारात्मक कार्यों तक सीमित रखते हैं, मानते हुए कि यदि कोई पात्र अच्छा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण',
                  options: ['\'फणीश्वरनाथ रेणु की\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंस रहे हैं तो कक्षा 11 के c11_hin_a_cbse_02_004 नोड पर वापस जाएँ जहाँ चरित्र-चित्रण की आधारभूत.',
                  misconception: 'छात्र अक्सर नायक के चरित्र-चित्रण को केवल उनके सकारात्मक कार्यों तक सीमित रखते हैं, मानते हुए कि यदि कोई पात्र अच्छा काम करता है तो वह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वे अपने किसी दोस्त के चरित्र का वर्णन कैसे करेंगे — क्या वे केवल उनकी अच्छी आदतों का उल्लेख करेंगे.', 'फिर बताइए कि ठीक वैसे ही एक साहित्यिक नायक भी: उनके सकारात्मक गुणों के साथ उनकी कमजोरियों और संघर्षों को दिखाना आवश्यक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_005', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि नायक के द्वंद्व या कथानक के मोड़ स्पष्ट न हों, तो c12_hin_al_cbse_02_004 (नायक.',
          misconception: '**सबसे आम भ्रम**: छात्र सहायक पात्रों को \'कहानी में भरने वाले\' (fillers) मानते हैं और परीक्षा में केवल उनके नाम, जाति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' के सहायक पात्र',
                  options: ['\'फणीश्वरनाथ रेणु की\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि नायक के द्वंद्व या कथानक के मोड़ स्पष्ट न हों, तो c12_hin_al_cbse_02_004 (नायक चित्रण) और.',
                  misconception: '**सबसे आम भ्रम**: छात्र सहायक पात्रों को \'कहानी में भरने वाले\' (fillers) मानते हैं और परीक्षा में केवल उनके नाम, जाति, व्यवसाय लिखकर 5-6.' }
          ],
            remediations: { 'fillers': { steps: ['**पुनः पाठ पढ़ें**: केवल उन पृष्ठों को चिह्नित करें जहाँ रामधनी किसी सहायक पात्र से बोलता/सुनता है (पंडित जी: पृष्ठ.', '**तालिका बनाएं**: स्तंभ — पात्र का नाम | प्रसंग/संवाद (उद्धृत/सार) | नायक पर प्रभाव | विषय में योगदान। 3.', '**लिखित अभ्यास**: किसी एक पात्र पर 100 शब्दों में उत्तर लिखें, फिर शिक्षक/सहपाठी से जंचवाएं — क्या प्रसंग उद्धृत किया?', '**पुनः निदान**: उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 को दोबारा हल करें — यदि अब भी प्रसंग नहीं दे पा रहे, तो नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_006', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' का मुख्य विषय — \'फणीश्वरनाथ रेणु की\' का केंद्रीय भाव और.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो कथानक और पात्र-चित्रण (नोड्स.',
          misconception: 'छात्र अक्सर बस्किोहर की माटी के मुख्य विषय को सिर्फ नायक के एक विशिष्ट गुण (जैसे "नायक की ईमानदारी") या एकल घटना (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' का मुख्य विषय',
                  options: ['\'फणीश्वरनाथ रेणु की\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो कथानक और पात्र-चित्रण (नोड्स c12_hin_al_cbse_02_002 और.',
                  misconception: 'छात्र अक्सर बस्किोहर की माटी के मुख्य विषय को सिर्फ नायक के एक विशिष्ट गुण (जैसे "नायक की ईमानदारी") या एकल घटना (जैसे "खेत जोतने की.' }
          ],
            remediations: { 'scena': { steps: ['छात्र को कहानी के तीन प्रमुख मोड़ों (प्रारंभिक संघर्ष, मध्य में चुनौती, अंतिम समाधान) की सूची बनाने के लिए कहिए। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
