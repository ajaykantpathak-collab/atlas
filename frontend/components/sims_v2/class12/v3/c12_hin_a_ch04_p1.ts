import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p1: SimDef = {
    id: 'v3_c12_hin_a_ch04_p1',
    title: 'बनारस, दशिा · Part 1/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'बनारस, दशिा · Part 1/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_001', 'c12_hin_a_cbse_04_002', 'c12_hin_a_cbse_04_003', 'c12_hin_a_cbse_04_004', 'c12_hin_a_cbse_04_005', 'c12_hin_a_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'बनारस, दशिा — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['बनारस, दशिा — कवि', 'बनारस, दशिा — पद्यांश-वार', 'बनारस, दशिा — काव्य-संरचना', 'बनारस, दशिा — केंद्रीय', 'बनारस, दशिा — छंद', 'बनारस, दशिा — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_001', title: 'बनारस, दशिा — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 04 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of "cukjl" and which literary tendency in modern Hindi poetry is he most associated with?', options: [
                { text: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*', outcome: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad* (Experimentalism) and.' },
                { text: 'a *Chhayavaad* poet like Nirala or a *Pragativad* poet like Nagarjun', outcome: 'Not quite — Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_002', title: 'बनारस, दशिा — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 4\' का क्रम: शुरुआत अंतरा-भाग-2-—-पाठ-4 से, घटनाएँ बढ़ती हैं, अंत \'अंतरा भाग-2 पर।',
            decisions: [{ prompt: 'Define "narrative arc" in the context of a narrative poem. List its five standard stages in order.', options: [
                { text: 'A narrative arc is the structural framework of a story comprising five stages: (1)', outcome: 'A narrative arc is the structural framework of a story comprising five stages: (1) Exposition.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students believe narrative poems *must* have named characters, dialogue, and linear chronology.', reveals: 'narrative-poems-must-have-named' },
                { text: 'beginning, middle, end" or confusing with thematic progression', outcome: 'Not quite — Students believe narrative poems *must* have named characters, dialogue, and linear chronology.', reveals: 'narrative-poems-must-have-named' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'What comes next? बनारस, दशिा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बनारस, दशिा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "cukjl" and which literary tendency in modern Hindi poetry is he most associated with?', answer: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*',
                  options: ['The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*', 'a *Chhayavaad* poet like Nirala or a *Pragativad* poet like Nagarjun'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' },
                { id: 'b', prompt: 'Explain in your own words why knowing the poet\'s birth year (1934) and the phrase "आधुनिक हिंदी कविता में प्रयोग" matters for reading "cukjl".', answer: '1934 places the poet\'s formative years in the 1950s–60s',
                  options: ['1934 places the poet\'s formative years in the 1950s–60s', 'it helps understand the poet\'s life'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' },
                { id: 'c', prompt: 'You are given an unseen poem titled "फ्लाईओवर के नीचे" by a poet born in 1965, described in the textbook as "समकालीन कविता के प्रमुख हस्ताक्षर, नगरीय यथार्थ के.', answer: 'Step 1: Identify period',
                  options: ['Step 1: Identify period', 'beautiful description of nature', 'rhyming couplets'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot convert the poet\'s intro into reading predictions: (1) Have them re-read *only* the NCERT intro for.', '(2) For each adjective, write one question they will ask the poem (e.g., "चित्रात्मक" → "Which three images are most.', '(3) Read the poem *only* to answer those questions.', '(4) Debrief: "Which prediction held?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_002', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ।.',
          hint: 'If stuck on mapping stanzas to stages, review "narrative arc in poetry" from.',
          misconception: 'Students believe narrative poems *must* have named characters, dialogue, and linear chronology to have a "plot." They.',
          parts: [
                { id: 'a', prompt: 'Given this 4-line excerpt from an unseen narrative poem: "पहले आया सन्नाटा, फिर पदचाप / फिर दरवाज़ा खुला, फिर कोई न आया / फिर धूप झुकी दीवार पर, फिर छाया / फिर.', answer: 'Line 1: Exposition (establishes silence/emptiness)',
                  options: ['Line 1: Exposition (establishes silence/emptiness)', 'climax', 'label line 2 as "climax" confuse surprise with structural peak'],
                  hint: 'If stuck on mapping stanzas to stages, review "narrative arc in poetry" from c11_hin_ar_cbse_01_002.',
                  misconception: 'Students believe narrative poems *must* have named characters, dialogue, and linear chronology to have a "plot." They read चुकजल as.' }
          ],
            remediations: { 'narrative-poems-must-have-named': { steps: ['Have the student watch a 2-minute silent short film (e.g., "The Red Balloon" clip) and draw a 5-box storyboard labeling.', 'Map the same 5 boxes onto चुकजל\'s stanzas — well activity = rising action, reflection = climax, stillness = resolution.', 'Repeat for फ्नेक using the child\'s *changing understanding* as the "character."', 'Re-attempt Diagnostic Questions 2 and 4. If confusion persists, revisit c11_hin_ar_cbse_01_002 (Class 11 Plot and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि एनजैम्बमेंट/केशिया स्पष्ट नहीं, तो c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि "काव्य-संरचना" = "पदों की गिनती + पंक्तियों की गिनती"। वे एनजैम्बमेंट को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि एनजैम्बमेंट/केशिया स्पष्ट नहीं, तो c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना) के.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि "काव्य-संरचना" = "पदों की गिनती + पंक्तियों की गिनती"। वे एनजैम्बमेंट को केवल \'पंक्ति बिना विराम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें — केवल सुनें नहीं:** कविता को जोर से पढ़ें, हर पंक्ति-अंत पर 2 सेकंड रुकें, फिर बिना रुके पढ़ें — अंतर.', '**पेंसिल से चिह्नित करें:** हर एनजैम्बमेंट (→), हर केशिया (|), हर पद-रिक्ति (//) को मार्क करें। 3.', '**एक पद को \'हटाकर\' देखें:** पद 4 हटा दें — कविता का भाव कैसे बदलता है?', '**पुनः-निदान:** DIAGNOSTIC_QUESTION_4 को दोबारा हल करें — अब चरणों में \'कार्य\' (function) लिखें, केवल \'विषय\' नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'अगर अटके: **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस)** पर लौटें.',
          misconception: '**सबसे आम भ्रम**: छात्र समझते हैं कि **\'करुण रस\' = केवल दुःख/रोना**। वे लिखते हैं: "कवि रो रहा है इसलिए करुण रस है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके: **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस)** पर लौटें — वहाँ.',
                  misconception: '**सबसे आम भ्रम**: छात्र समझते हैं कि **\'करुण रस\' = केवल दुःख/रोना**। वे लिखते हैं: "कवि रो रहा है इसलिए करुण रस है।" **क्यों गलत है**: करुण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — कविता की **कोई 5 पंक्तियाँ** चुनो जहाँ कवि \'पहले\' और \'अब\' की तुलना करता हो। उन्हें कागज पर.', '**चरण 2**: प्रत्येक पंक्ति के लिए पूछो — "यहाँ कवि को क्या **महसूस** हो रहा है?', '(अनुभाव) उसके मन में कौन-से **भाव** आ-जा रहे हैं?', '**चरण 3**: अब **रस-निष्पत्ति का चार्ट** बनवाओ: आलम्बन → उद्दीपन → अनुभाव → संचारी → स्थायी भाव → **रस**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_005', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि मात्रा-गणना में अटके तो c11_hin_a_cbse_13_005 के \'मात्रा-गणना चेकलिस्ट\' और \'गुरु-लघु.',
          misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' = \'तुक ढूँढना\' (अंत्य-अक्षर मिलान)। असल में हिंदी के मात्रिक छंदों में तुक अनिवार्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मात्रा-गणना में अटके तो c11_hin_a_cbse_13_005 के \'मात्रा-गणना चेकलिस्ट\' और \'गुरु-लघु अभ्यास.',
                  misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' = \'तुक ढूँढना\' (अंत्य-अक्षर मिलान)। असल में हिंदी के मात्रिक छंदों में तुक अनिवार्य नहीं; गुरु-लघु क्रम और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और लय-विधान) और c11_hin_a_cbse_14_005 (बादल को घरिते देखा है.', 'उससे 5 सरल पंक्तियों की मात्रा-गणना करवाएँ (अनुस्वार/दीर्घ/ह्रस्व नियम चेकलिस्ट के साथ)। 3.', 'फिर \'बनारस, दशिा\' की पहली दो पंक्तियों पर वही प्रक्रिया दुहराएँ। 4.', 'अंत में यति-स्थल बोलकर पढ़कर चिह्नित करने का अभ्यास कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_006', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 4\' का केंद्रीय भाव और.',
          hint: 'Review Class 11 Antra Chapter 1 (c11_hin_ar_cbse_01_006) worked example on thematic.',
          misconception: 'Students consistently write: \'The theme of the poem is the drying pond\' or \'The message is that water is precious.\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 4\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 4\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review Class 11 Antra Chapter 1 (c11_hin_ar_cbse_01_006) worked example on thematic statement.',
                  misconception: 'Students consistently write: \'The theme of the poem is the drying pond\' or \'The message is that water is precious.\' This error arises.' }
          ],
            remediations: { 'students-consistently-write-the-theme': { steps: ['If a student cannot distinguish subject from theme: (1) Give them three परिचित texts (e.g., \'The Road Not Taken\'.', '(2) Use the formula: Subject = What happens (noun phrase); Theme = What it means about [life/humanity/time] (complete.', '(3) Have them re-read stanza 3 of \'cukjl\' and complete: \'The pond is not just a pond; the pond is a ______ of ______.\'.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
