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
        { title: 'सल्विर वैडिंग — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the silver wedding of abandonment: weigh \'log kya kahenge\' as a governing force, separate chosen renunciation from deposited old age, and read the quiet defiance inside \'jo hoga hoga.\'',
        labels: ['सल्विर वैडिंग — पृष्ठभूमि', 'सल्विर वैडिंग — कथानक', 'सल्विर वैडिंग — पाठ्य-परिवेश', 'सल्विर वैडिंग — पात्र-चित्रण', 'सल्विर वैडिंग — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_001', title: 'सल्विर वैडिंग — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-2 खोलिए और पाठ 01 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "flYoj oSfMax" and what is their primary literary concern as reflected in the Hindi Vitan textbook\'s introduction.', options: [
                { text: 'The author is euksgj \';ke tks\'kh, a prominent Hindi writer known for dissecting the moral', outcome: 'The author is euksgj \';ke tks\'kh, a prominent Hindi writer known for dissecting the moral and.' },
                { text: 'Hindi writer', outcome: 'Not quite — Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story.".', reveals: 'students-treat-before-you-read' },
                { text: 'Before You Read', outcome: 'Not quite — Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story.".', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_002', title: 'सल्विर वैडिंग — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 1\' का क्रम: शुरुआत वितान-भाग-2-—-पाठ-1 से, घटनाएँ बढ़ती हैं, अंत \'वितान भाग-2 पर।',
            decisions: [{ prompt: 'What is the primary narrative structure of "flYoj oSfMax" — linear, non-linear with flashbacks, epistolary, or frame narrative?', options: [
                { text: 'The primary narrative structure is **non-linear with flashbacks**', outcome: 'The primary narrative structure is **non-linear with flashbacks**.' },
                { text: 'linear', outcome: 'Not quite — Students think "plot" = "what happens in order" and "narrative structure" = "beginning, middle.', reveals: 'plot-what-happens-in-order' },
                { text: 'narrative technique', outcome: 'Not quite — Students think "plot" = "what happens in order" and "narrative structure" = "beginning, middle.', reveals: 'plot-what-happens-in-order' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_003', title: 'सल्विर वैडिंग — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 1\' का परिवेश: \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्त — स्थान और समय मिलकर माहौल बनाते.',
            decisions: [{ prompt: 'What is the primary physical setting of the narrator\'s visit in the opening section of the text, and what specific sensory detail.', options: [
                { text: 'The primary physical setting is a refugee colony in Delhi (specifically near', outcome: 'The primary physical setting is a refugee colony in Delhi (specifically near Jangpura/Okhla area).' },
                { text: 'a house', outcome: 'Not quite — Students often treat setting as a *static list* (time: 1960s, place: Delhi colony) and atmosphere.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
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
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on "legkm baçkij" as social mechanism: revisit Class 11 Aroh Chapter 3 "Before.',
          misconception: 'Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story." The specific error.',
          parts: [
                { id: 'a', prompt: 'Compare the portrayal of "flYoj oSfMax" (retirement home) in this chapter\'s context with the traditional Indian concept of "vanaprastha ashram" (वनप्रस्थ.', answer: 'Vanaprastha was a *chosen*, spiritually framed withdrawal',
                  options: ['Vanaprastha was a *chosen*, spiritually framed withdrawal', 'both are for old people', 'Before You Read', 'I\'ll understand when I read the story'],
                  hint: 'If stuck on "legkm baçkij" as social mechanism: revisit Class 11 Aroh Chapter 3 "Before You Read".',
                  misconception: 'Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story." The specific error: they confuse *plot.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the author\'s concern or the "legkm baçkij" mechanism after this node: (1) Have them.', '(2) Ask: "Whose voice is *absent* in these paragraphs?" (Answer: ;\'kksèkj ckcw\'s own unfiltered thought).', '(3) Assign a 5-minute free-write: "Describe a time you did something only because \'people would say otherwise\' — then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story." The specific error.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The protagonist ;\'kksèkj ckcw is passive — things happen *to* him; he never makes a real choice." Defend or refute using at least two.', answer: 'Refute',
                  options: ['Refute', 'passive', 'Before You Read', 'I\'ll understand when I read the story'],
                  hint: 'If stuck on "legkm baçkij" as social mechanism: revisit Class 11 Aroh Chapter 3 "Before You Read".',
                  misconception: 'Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story." The specific error: they confuse *plot.' },
                { id: 'b', prompt: 'Write a 60-word diary entry from ;\'kksèkj ckcw\'s perspective on the night he signs the retirement home papers, using the phrase "tks gqvk gksxk" exactly once.', answer: 'A strong entry: "Signed the papers today',
                  options: ['A strong entry: "Signed the papers today', 'Before You Read', 'I\'ll understand when I read the story'],
                  hint: 'If stuck on "legkm baçkij" as social mechanism: revisit Class 11 Aroh Chapter 3 "Before You Read".',
                  misconception: 'Students treat "Before You Read" as optional skimming — "I\'ll understand when I read the story." The specific error: they confuse *plot.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the author\'s concern or the "legkm baçkij" mechanism after this node: (1) Have them.', '(2) Ask: "Whose voice is *absent* in these paragraphs?" (Answer: ;\'kksèkj ckcw\'s own unfiltered thought).', '(3) Assign a 5-minute free-write: "Describe a time you did something only because \'people would say otherwise\' — then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_002', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ।.',
          hint: 'If confused, review Class 11 "Namak ka Daroga" (Aaroh Ch 1) — identify its single.',
          misconception: 'Students think "plot" = "what happens in order" and "narrative structure" = "beginning, middle, end." They miss that.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative structure of "flYoj oSfMax" — linear, non-linear with flashbacks, epistolary, or frame narrative?', answer: 'The primary narrative structure is **non-linear with flashbacks**',
                  options: ['The primary narrative structure is **non-linear with flashbacks**', 'linear', 'narrative technique', 'what happens in order'],
                  hint: 'If confused, review Class 11 "Namak ka Daroga" (Aaroh Ch 1) — identify its single flashback, then.',
                  misconception: 'Students think "plot" = "what happens in order" and "narrative structure" = "beginning, middle, end." They miss that **structure is the.' },
                { id: 'b', prompt: 'Explain in your own words how the author uses specific sensory triggers to transition between the present timeline and flashbacks.', answer: 'The author uses sensory triggers',
                  options: ['The author uses sensory triggers', 'memories happen', 'analyze narrative technique', 'what happens in order'],
                  hint: 'If confused, review Class 11 "Namak ka Daroga" (Aaroh Ch 1) — identify its single flashback, then.',
                  misconception: 'Students think "plot" = "what happens in order" and "narrative structure" = "beginning, middle, end." They miss that **structure is the.' }
          ],
            remediations: { 'plot-what-happens-in-order': { steps: ['Have the student draw a **two-column timeline** (Present | Past) and place 8-10 key scenes from the chapter in the.', 'For each flashback, ask: "What *exact* sensory detail in the present triggers this memory?" — force them to quote the.', 'Ask: "If we reorder these columns chronologically, what emotional effect is lost?" — make them articulate the.', 'Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_003', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If stuck, re-read the "colony description" passage (pages 3-4 of NCERT text) and list 10.',
          misconception: 'Students often treat setting as a *static list* (time: 1960s, place: Delhi colony) and atmosphere as a *single.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical setting of the narrator\'s visit in the opening section of the text, and what specific sensory detail establishes the atmosphere.', answer: 'The primary physical setting is a refugee colony in Delhi (specifically near',
                  options: ['The primary physical setting is a refugee colony in Delhi (specifically near', 'a house'],
                  hint: 'If stuck, re-read the "colony description" passage (pages 3-4 of NCERT text) and list 10 sensory.',
                  misconception: 'Students often treat setting as a *static list* (time: 1960s, place: Delhi colony) and atmosphere as a *single adjective* (mood.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond listing setting details, do this 3-step remediation: (1) **Re-read the colony.', 'Ask: "Which of these details *changes* during the story?" (e.g., the vacant plot becomes a hospital site).', '(2) **Draw a two-column table**: Column A = "Setting Detail", Column B = "What it *does* to a character or mood".', 'Fill 5 rows from the text (e.g., "Bulldozer sound" → "Interrupts conversation, forces fd\'kunk to admit fear").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_004', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि छात्र नायक के संवाद और वर्णन में अंतर नहीं कर पाता, तो **कक्षा ११, नोड.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है — पात्र के गुणों की **सूची (List)** बनाना: "वह बहादुर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'वितान भाग-2 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र नायक के संवाद और वर्णन में अंतर नहीं कर पाता, तो **कक्षा ११, नोड c11_hin_v_cbse_01_004**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है — पात्र के गुणों की **सूची (List)** बनाना: "वह बहादुर था, ईमानदार था, गरीब.' }
          ],
            remediations: { 'list': { steps: ['**चरणबद्ध उपचार:** (१) छात्र को पाठ के **केवल नायक-संबंधी अंश** (संवाद, वर्णन, कार्य) अलग कागज पर उतारने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_005', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके: c12_hin_v_cbse_01_003 (पाठ्य-परिवेश) दोबारा पढ़ें — परिवेश ही सहायक पात्रों की.',
          misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों का चित्रण करते समय उनके **व्यक्तिगत गुण-दोष (traits)** गिनाना ही पर्याप्त है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'वितान भाग-2 — पाठ 1\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: c12_hin_v_cbse_01_003 (पाठ्य-परिवेश) दोबारा पढ़ें — परिवेश ही सहायक पात्रों की.',
                  misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों का चित्रण करते समय उनके **व्यक्तिगत गुण-दोष (traits)** गिनाना ही पर्याप्त है — जैसे \'पुजारी लालची था\'.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र को c11_hin_v_cbse_01_005 (कक्षा 11 का सहायक पात्र नोड) पुनः पढ़ने को कहें — विशेषतः "पात्र का.', '**चरण 2:** पाठ *सल्विर वैडिंग* से **एक सहायक पात्र** (जैसे पुजारी) चुनें और छात्र से पूछें: "इस पात्र को हटा दें तो कथा.', '**चरण 3:** यदि उत्तर अभी भी "गुणों की सूची" है, तो **PEEL संरचना** (Point-Evidence-Explanation-Link) का मॉडल उत्तर.', '**पुनः निदान:** चरण 2 का प्रश्न दोहराएँ — अब उत्तर में "कार्य/प्रतीक" होना चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_006', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' का मुख्य विषय — \'वितान भाग-2 — पाठ 1\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो कक्षा 11 वितान पाठ 1, 2, 3 के \'मुख्य विषय और संदेश\' नोड्स.',
          misconception: 'विद्यार्थी **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं — वे लिखते हैं "विषय: सल्विर टोकरी बुनता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' का मुख्य विषय — \'वितान भाग-2 — पाठ 1\' का केंद्रीय भाव और संदेश',
                  options: ['\'वितान भाग-2 — पाठ 1\' का मुख्य विषय — \'वितान भाग-2 — पाठ 1\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो कक्षा 11 वितान पाठ 1, 2, 3 के \'मुख्य विषय और संदेश\' नोड्स (c11_hin_v_cbse_01_006.',
                  misconception: 'विद्यार्थी **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं — वे लिखते हैं "विषय: सल्विर टोकरी बुनता है, गाँव वाले मज़ाक उड़ाते.' }
          ],
            remediations: { 'theme-plot': { steps: ['विद्यार्थी से कहें: "पाठ के **तीन सबसे मार्मिक प्रसंग** चुनो जहाँ तुम्हें लगा \'यह बात लेखक के मन की है\'।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यहाँ लेखक **क्या प्रश्न** उठा रहा है?" (जैसे: क्या श्रम का मूल्य वेतन से तय होता है?).', 'तीनों प्रश्नों में **साझा शब्द** ढूँढ़वाएँ (श्रम, गरिमा, अस्मिता) — वही **मुख्य विषय** है। 4.', 'अब पूछें: "इस विषय से तुम अपने जीवन के लिए **एक सीख** क्या लोगे?" — वही **संदेश** है। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
