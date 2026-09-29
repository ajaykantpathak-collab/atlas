import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p1',
    title: 'पाठ 13 · Part 1/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 13 · Part 1/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_001', 'c11_hin_ar_cbse_13_002', 'c11_hin_ar_cbse_13_003', 'c11_hin_ar_cbse_13_004', 'c11_hin_ar_cbse_13_005', 'c11_hin_ar_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'पाठ 13 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['पाठ 13 — पृष्ठभूमि', 'पाठ 13 — कथानक', 'पाठ 13 — पाठ्य-परिवेश', 'पाठ 13 — पात्र-चित्रण', 'पाठ 13 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_001', title: 'पाठ 13 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 13 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of the poem discussed in Chapter 13, and what is the title of the collection from which this poem is taken?', options: [
                { text: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"', outcome: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा".' },
                { text: 'Context and Background', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'another poet like Kedarnath Singh or a wrong collection', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the "पाठ से पहले" section of any Class 10 Hindi poem (e.g., Chapter 1.',
          misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and list of works for.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of the poem discussed in Chapter 13, and what is the title of the collection from which this poem is taken?', answer: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"',
                  options: ['The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"', 'Context and Background', 'another poet like Kedarnath Singh or a wrong collection'],
                  hint: 'If stuck, review the "पाठ से पहले" section of any Class 10 Hindi poem (e.g., Chapter 1 of Kshitij).',
                  misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and list of works for a 1-mark question.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['Have the student re-read only the introductory note (pages 130-131) with a highlighter, marking every adjective that.', 'Ask them to write one sentence per highlighted word explaining what that quality promises in the poem.', 'Then match those promises to the poet\'s bio: e.g., "गहन भावस्थिति" links to his peasant activism; "चमत्कारिक प्रयोग".', 'Finally, have them predict the poem\'s tone (satirical?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_002', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' का कथानक — \'लकीरें खींचते हुए\' — आरोह भाग-1 का पाठ। पाठ का.',
          hint: 'यदि अटका लगे: **\'कथासार लेखन\' (Summary Writing)** का अभ्यास करें — पहले 5-6 वाक्यों में.',
          misconception: 'विद्यार्थी मानते हैं कि **\'कथानक = घटनाओं की सूची\' और \'संरचना = अध्याय/अनुच्छेद विभाजन\'**। वे फ्लैशबैक को केवल \'अतीत की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' का कथानक',
                  options: ['\'लकीरें खींचते हुए\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)', '\'लकीरें खींचते हुए\' का पात्र-चित्रण'],
                  hint: 'यदि अटका लगे: **\'कथासार लेखन\' (Summary Writing)** का अभ्यास करें — पहले 5-6 वाक्यों में पूरी कहानी.',
                  misconception: 'विद्यार्थी मानते हैं कि **\'कथानक = घटनाओं की सूची\' और \'संरचना = अध्याय/अनुच्छेद विभाजन\'**। वे फ्लैशबैक को केवल \'अतीत की जानकारी देना\' समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी से कहें: "पाठ की **पहली और अंतिम घटना** लिखो। फिर पूछो: **\'क्या कहानी की दुनिया में भी यही पहली और अंतिम.', 'एक **टाइमलाइन** बनवाएँ: बाएँ कॉलम में \'कहानी-काल क्रम\' (1,2,3...), दाएँ में \'पाठ-क्रम\' (A,B,C...)। तीर खींचकर मिलान.', 'प्रत्येक विचलन के लिए एक प्रश्न पूछें: **"लेखक ने *यहाँ* क्रम क्यों बदला?', 'पाठक क्या *महसूस* करता जो कालक्रम में न होता?"** — इससे युक्ति का कार्य (Function) समझ में आता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_003', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके, तो \'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_13_002) के \'घटना-परिवेश.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' को **स्थैतिक पृष्ठभूमि (static backdrop)** मानते हैं — जैसे नाटक का सेट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)',
                  options: ['\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पात्र-चित्रण'],
                  hint: 'यदि अटके, तो \'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_13_002) के \'घटना-परिवेश अंतर्संबंध\' खंड को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' को **स्थैतिक पृष्ठभूमि (static backdrop)** मानते हैं — जैसे नाटक का सेट (stage set) जो दृश्य.' }
          ],
            remediations: { 'static-backdrop-stage-set': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें: "परिवेश को \'कहानी का एक अदृश्य पात्र\' मानें जो बोलता नहीं, लेकिन हर दृश्य में.', '**माइक्रो-व्यायाम:** एक परिचित दृश्य लें (जैसे: परीक्षा से पहले की रात)। छात्र से कहें: भौतिक (मेज पर किताबें, घड़ी).', '**पाठ पर लागू करें:** अब पाठ्य-अंश लें और वही प्रक्रिया दोहराएं। छात्र से पूछें: "अगर घड़ी की आवाज़ न होती, तो क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_004', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके: **\'पाठ को एनोटेट (Annotate) करना\'** सीखें/दोहराएं — विशेष रूप से नायक के.',
          misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण का अर्थ पात्र के **गुणों की सूची (List of Traits)** बनाना है — जैसे: ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' का पात्र-चित्रण',
                  options: ['\'लकीरें खींचते हुए\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **\'पाठ को एनोटेट (Annotate) करना\'** सीखें/दोहराएं — विशेष रूप से नायक के **संवाद, एकालाप.',
                  misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण का अर्थ पात्र के **गुणों की सूची (List of Traits)** बनाना है — जैसे: ईमानदार, बहादुर, दयालु, मेहनती।".' }
          ],
            remediations: { 'list-of-traits': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 - अवधारणा स्पष्टीकरण (5 मिनट):** छात्र को समझाएं: "विशेषण (Adjective) = दावा (Claim); पाठगत साक्ष्य.', '**चरण 2 - अभ्यास (10 मिनट):** एक परिचित पात्र (जैसे: \'बड़े भाई साहब\' का बड़ा भाई) लें। छात्र से कहें: "केवल 3 विशेषण.', '**चरण 3 - मॉडल उत्तर दिखाएं (5 मिनट):** एक कमजोर उत्तर (केवल विशेषणों की सूची) और एक सशक्त उत्तर (PEEL युक्त) साथ रखकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_005', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो **नोड 004 (पात्र-चित्रण: नायक/प्रमुख पात्र)** के \'कार्यविश्लेषण तालिका\' खंड.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **\'सहायक पात्र = नायक का मित्र/सहयोगी\' (helper/friend only)**। वे सहायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' के सहायक पात्र',
                  options: ['\'लकीरें खींचते हुए\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 004 (पात्र-चित्रण: नायक/प्रमुख पात्र)** के \'कार्यविश्लेषण तालिका\' खंड को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **\'सहायक पात्र = नायक का मित्र/सहयोगी\' (helper/friend only)**। वे सहायक पात्र के.' }
          ],
            remediations: { 'helper-friend-only-antagonist-rival': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "साहित्य में \'सहायक\' का अर्थ \'मददगार\' नहीं, **\'कथानक/नायक को सहारा देने वाला.', '**वर्गीकरण तालिका बनवाएँ:** 4 कॉलम: (क) पात्र नाम, (ख) प्रकार (फॉयल/कॉन्फिडेंट/एंटागोनिस्ट/सिंबॉलिक), (ग) नायक से.', '**विपरीत-उदाहरण दें:** \'गोदान\' के मि.', 'खन्ना (सहायक पात्र, नायक होरी के **वर्ग-शत्रु/विपरीत**) — पूछें: "क्या खन्ना होरी की मदद करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_006', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' का मुख्य विषय — \'लकीरें खींचते हुए\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके, तो **पाठ 13 के अंतिम 3 पैराग्राफ** दोबारा पढ़ें — प्रायः लेखक अंत में विषय को.',
          misconception: 'छात्र अक्सर **\'विषय\' (theme) को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं** — जैसे "झूठ मत बोलो" विषय नहीं, नैतिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' का मुख्य विषय',
                  options: ['\'लकीरें खींचते हुए\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके, तो **पाठ 13 के अंतिम 3 पैराग्राफ** दोबारा पढ़ें — प्रायः लेखक अंत में विषय को.',
                  misconception: 'छात्र अक्सर **\'विषय\' (theme) को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं** — जैसे "झूठ मत बोलो" विषय नहीं, नैतिक शिक्षा है; विषय होगा.' }
          ],
            remediations: { 'theme-moral-lesson': { steps: ['छात्र से कहें: "पाठ के 3 प्रमुख मोड़ (turning points) पहचानो — प्रत्येक में नायक ने क्या चुना और क्यों?" 2.', 'फिर पूछें: "इन तीनों चुनावों में कौन-सा **एक समान तत्व (common thread)** है?" — वही विषय है। 3.', 'अब कहें: "लेखक इस समान तत्व के माध्यम से पाठक से क्या कहना चाहता है?" — वही संदेश है। 4.', 'अभ्यास के लिए **दो-स्तरीय सारणी (two-column table)** बनवाएँ: बाएँ कॉलम में \'प्रसंग/संवाद\', दाएँ में \'यह विषय को कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
