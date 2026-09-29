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
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_001', title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-1 खोलिए और पाठ 05 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "Rajasthan ki Jatir Kahaniyan" and what is his primary contribution to Hindi literature that makes him uniquely.', options: [
                { text: 'The author is Vishnu Prabhakar (1948–2016), a historian and litterateur renowned for his', outcome: 'The author is Vishnu Prabhakar (1948–2016), a historian and litterateur renowned for his extensive.' },
                { text: 'context', outcome: 'Not quite — Students believe "context" means memorizing the author\'s birth/death dates and a list of his other.', reveals: 'context-means-memorizing-the-author' },
                { text: 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan', outcome: 'Not quite — Students believe "context" means memorizing the author\'s birth/death dates and a list of his other.', reveals: 'context-means-memorizing-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_002', title: 'पाठ 5 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 5\' का क्रम: शुरुआत वितान-भाग-1-—-पाठ-5 से, घटनाएँ बढ़ती हैं, अंत \'वितान भाग-1 पर।',
            decisions: [{ prompt: 'Define \'exposition\' in the context of plot structure and state its primary function in a narrative.', options: [
                { text: 'Exposition is the opening section of a story that introduces the setting, characters, and', outcome: 'Exposition is the opening section of a story that introduces the setting, characters, and initial.' },
                { text: '\'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e', outcome: 'Not quite — Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering.', reveals: 'plot-is-just-a-summary' }
            ] }] } },
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
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and.',
          misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student cannot move beyond biographical trivia, do this 3-step remediation: 1) Give them two 50-word excerpts—one.', 'Ask them to list three differences in perspective, language, and values.', '2) Have them interview a grandparent about a family story passed down orally, then compare it to any written record.', '3) Return to the textbook\'s \'Before You Read\' section and co-construct a "Context-to-Text" bridge: for each contextual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Reading the \'Context and Background\' section is optional; the stories speak for themselves." Defend your position with reference to the.', answer: 'The claim is false',
                  options: ['The claim is false', 'context', 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' },
                { id: 'b', prompt: 'Create a \'Context Map\' for this chapter: list four contextual elements (historical, geographical, linguistic, cultural) and for each, write one question you.', answer: 'A strong answer includes: 1',
                  options: ['A strong answer includes: 1', 'context', 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student cannot move beyond biographical trivia, do this 3-step remediation: 1) Give them two 50-word excerpts—one.', 'Ask them to list three differences in perspective, language, and values.', '2) Have them interview a grandparent about a family story passed down orally, then compare it to any written record.', '3) Return to the textbook\'s \'Before You Read\' section and co-construct a "Context-to-Text" bridge: for each contextual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_002', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ।.',
          hint: 'Review the five-stage plot pyramid (Freytag\'s Pyramid) and practice labeling events in.',
          misconception: 'Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e.g., flashbacks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का',
                  options: ['\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'Review the five-stage plot pyramid (Freytag\'s Pyramid) and practice labeling events in a known.',
                  misconception: 'Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e.g., flashbacks, parallel plots).' }
          ],
            remediations: { 'plot-is-just-a-summary': { steps: ['If a student cannot distinguish plot stages, have them: (1) List all major events in chronological order.', '(2) Map each to the plot pyramid.', '(3) Identify where the narrative order differs from chronological order.', '(4) Discuss why the author reordered them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_003', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटका हुआ महसूस करें तो \'कथानक और आख्यान-संरचना\' (c11_hin_v_cbse_05_002) के \'कथानक के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'परिवेश\' को स्थैतिक (static) पृष्ठभूमि मानते हैं और \'वातावरण\' को केवल \'मूड\' (mood) समझकर रुक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका हुआ महसूस करें तो \'कथानक और आख्यान-संरचना\' (c11_hin_v_cbse_05_002) के \'कथानक के चरण\' भाग.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'परिवेश\' को स्थैतिक (static) पृष्ठभूमि मानते हैं और \'वातावरण\' को केवल \'मूड\' (mood) समझकर रुक जाते हैं। वे यह.' }
          ],
            remediations: { 'static-mood': { steps: ['**चरण 1:** छात्र को एक परिचित स्थान (अपना कमरा/स्कूल का बरामदा) चुनने को कहें — उससे पूछें: "यहाँ अभी क्या गंध है?', 'कौन-सी आवाज़ सबसे तीखी है?', 'दीवार का तापमान कैसा है?" — इन्हें लिखवाएँ। **चरण 2:** अब पूछें: "यहीं बैठकर तुम्हें कोई बुरी खबर मिले तो ये विवरण कैसे.', 'अच्छी खबर मिले तो?" — छात्र स्वयं महसूस करेगा कि **भौतिक परिवेश वही है, वातावरण बदल गया**। **चरण 3:** पाठ के किसी अंश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_004', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_v_cbse_05_002)** के \'उत्कर्ष (Climax)\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का चित्रण करने का अर्थ है उसके **गुणों (Traits) की सूची** बनाना — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'वितान भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_v_cbse_05_002)** के \'उत्कर्ष (Climax)\' और \'पतन.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का चित्रण करने का अर्थ है उसके **गुणों (Traits) की सूची** बनाना — जैसे: "नायक साहसी, ईमानदार.' }
          ],
            remediations: { 'traits': { steps: ['**PEEL संरचना का अभ्यास कराएँ:** एक गुण चुनें (Point) → पाठ से सटीक उद्धरण/प्रसंग दें (Evidence) → समझाएँ कि यह प्रसंग.', '**\'क्यों\' की सीढ़ी चढ़ाएँ:** छात्र से एक गुण लिखवाएँ, फिर पूछें "पाठ में कहाँ?" → "यह प्रसंग गुण कैसे दर्शाता है?" →.', '**विरोधाभासी गुण ढूँढवाएँ:** नायक में एक साथ मौजूद दो विरोधी लक्षण (जैसे: क्रोधी परंतु दयालु) पहचानने को कहें — इससे.', '**मॉडल उत्तर दिखाएँ:** एक कमजोर उत्तर (सूची मात्र) और एक सशक्त उत्तर (PEEL युक्त) साथ रखकर तुलना कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_005', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_05_004 (नायक का चरित्र-चाप)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि "सहायक पात्र का महत्त्व केवल नायक के साथ उसके संबंध में है" — वे पात्र के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'वितान भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_05_004 (नायक का चरित्र-चाप)** और **c11_hin_v_cbse_05_002.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि "सहायक पात्र का महत्त्व केवल नायक के साथ उसके संबंध में है" — वे पात्र के **स्वतंत्र उपकथानक.' }
          ],
            remediations: { 'independent-subplot': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 5 खोलें और उस सहायक पात्र के **केवल वही दृश्य/पृष्ठ** चिह्नित करें जहां नायक **उपस्थित.', 'किससे टकरा रहा है?" — उत्तर लिखवाएं। **चरण 3:** फिर पूछें: "अगर ये दृश्य हटा दिए जाएं, तो पाठ का कौन-सा विषय (theme).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_006', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' का मुख्य विषय — \'वितान भाग-1 — पाठ 5\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो \'कथानक संरचना\' (नोड 002) के \'चरमोत्कर्ष\' (climax) और \'पतन क्रिया\' (falling.',
          misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं — जैसे "बड़ों का सम्मान करो" या "सपने पूरे करो"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' का मुख्य विषय — \'वितान भाग-1 — पाठ 5\' का केंद्रीय भाव और संदेश',
                  options: ['\'वितान भाग-1 — पाठ 5\' का मुख्य विषय — \'वितान भाग-1 — पाठ 5\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो \'कथानक संरचना\' (नोड 002) के \'चरमोत्कर्ष\' (climax) और \'पतन क्रिया\' (falling action) भाग.',
                  misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं — जैसे "बड़ों का सम्मान करो" या "सपने पूरे करो"। यह भ्रम इसलिए होता.' }
          ],
            remediations: { 'moral-lesson-10-11-open': { steps: ['छात्र से कहें: "पाठ के तीन प्रसंग चुनो जहां नायक को \'चुनना\' पड़ता है — प्रत्येक में वह क्या चुनता है, क्या छोड़ता है.', 'फिर पूछें: "इन तीनों प्रसंगों में कॉमन पैटर्न क्या है?', 'उसे एक वाक्य में लिखो — वही विषय है।" 3.', 'अंत में: "लेखक ने नायक को अंत में \'सफल\' दिखाया या \'संघर्षरत\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
