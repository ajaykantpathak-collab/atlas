import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p1: SimDef = {
    id: 'v3_c12_hin_a_ch10_p1',
    title: 'प्रेमघन की छाया-स्मृति · Part 1/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'प्रेमघन की छाया-स्मृति · Part 1/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_001', 'c12_hin_a_cbse_10_002', 'c12_hin_a_cbse_10_003', 'c12_hin_a_cbse_10_004', 'c12_hin_a_cbse_10_005', 'c12_hin_a_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'प्रेमघन की छाया-स्मृति — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['प्रेमघन की छाया-स्मृति —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_001', title: 'प्रेमघन की छाया-स्मृति — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 10 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'What are the three pillars of Jaishankar Prasad\'s literary identity as described in the NCERT background note, and which literary movement.', options: [
                { text: 'The three pillars are: (1) his mastery of Sanskrit, Prakrit, Persian, and modern Hindi', outcome: 'The three pillars are: (1) his mastery of Sanskrit, Prakrit, Persian, and modern Hindi allowing.' },
                { text: 'poet of Kamayani', outcome: 'Not quite — Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book.', reveals: 'students-treat-before-you-read' },
                { text: 'writer of plays', outcome: 'Not quite — Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_004', title: 'प्रेमघन की छाया-स्मृति — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'जयशंकर प्रसाद\' में जयशंकर-प्रसाद से पात्र उभरता है।',
            decisions: [{ prompt: 'Identify the narrator of the essay "Izse?ku dh Nk;k Le`fr" and state his relationship to the protagonist Jaishankar Prasad.', options: [
                { text: 'The narrator is Dr', outcome: 'The narrator is Dr. Nagendra (the essayist), who recounts his childhood and youthful encounters.' },
                { text: 'Prasad is the narrator', outcome: 'Not quite — Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad.', reveals: 'students-conflate-the-narrator-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'What comes next? प्रेमघन की छाया-स्मृति · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — प्रेमघन की छाया-स्मृति · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book titles, movement name).',
          parts: [
                { id: 'a', prompt: 'The NCERT text states Prasad "gave a new turn to the history of Hindi literature and established a new form of Hindi poetry." Explain in your own words what.', answer: '"New form" refers to **Chhayavad\'s poetic idiom**',
                  options: ['"New form" refers to **Chhayavad\'s poetic idiom**', 'he wrote emotional poems', 'author\'s contribution'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do the.',
                  misconception: 'Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book titles, movement name).' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot move beyond fact-listing: 1.', '**Re-read the NCERT background with a highlighter** — mark every phrase showing *cause-effect* (e.g., "classical.', '**Build a 3-row table**: Row 1 = Biographical Fact (from text), Row 2 = Historical Context (freedom movement, language.', '**Re-diagnostic**: Ask the student to explain *one* row orally — "Why would Prasad\'s eye disease make the story\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_002', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' का कथानक — \'जयशंकर प्रसाद\' — अंतरा भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'यदि भ्रम हो तो c11_hin_a_cbse_01_002 (कक्षा ११ अंतरा पाठ १ का कथानक-संरचना नोड) पर लौटें.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ "कहानी क्या है" समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' का कथानक',
                  options: ['\'जयशंकर प्रसाद\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)', '\'जयशंकर प्रसाद\' का पात्र-चित्रण'],
                  hint: 'यदि भ्रम हो तो c11_hin_a_cbse_01_002 (कक्षा ११ अंतरा पाठ १ का कथानक-संरचना नोड) पर लौटें — वहाँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ "कहानी क्या है" समझते हैं। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र से कहें: "पाठ की १० प्रमुख घटनाएं कागज़ पर **कालानुक्रम में** लिखो (१.', 'गुरु-देहावसान)।" — यह **कथानक** निकाल देगा। **चरण २:** अब पाठ खोलकर देखें: "लेखक ने इन १० घटनाओं को **किस क्रम में**.', 'घटना ३ और ७ एक साथ आईं?" — यह **संरचना** उजागर करेगा। **चरण ३:** दोनों सूचियों को साथ रखकर पूछें: "लेखक ने क्रम क्यों.', 'क्या प्रभाव पड़ा?" — यही **विश्लेषण** है। **पुनः निदान:** यदि अभी भी भ्रम रहे, तो c11_hin_a_cbse_01_002 (कक्षा ११ का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_003', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'अगर फंसे हुए महसूस हो तो वर्ग 11 के पाठ्य-परिवेश और वातावरण के नोड.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण एक ही बात हैं— जैसे दोनों को सिर्फ "कहानी कहाँ और कब होती है" के रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)',
                  options: ['\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पात्र-चित्रण'],
                  hint: 'अगर फंसे हुए महसूस हो तो वर्ग 11 के पाठ्य-परिवेश और वातावरण के नोड (c11_hin_a_cbse_10_003) को.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण एक ही बात हैं— जैसे दोनों को सिर्फ "कहानी कहाँ और कब होती है" के रूप में परिभाषित करते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले दो रंग के हाइलाइटर देने हैं— एक पाठ्य-परिवेश के लिए (ऐतिहासिक/सामाजिक तथ्य: जैसे "1947 में विभाजन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_004', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If unable to separate narrator\'s voice from Prasad\'s actions, review the "Indirect.',
          misconception: 'Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad was great because the.',
          parts: [
                { id: 'a', prompt: 'Identify the narrator of the essay "Izse?ku dh Nk;k Le`fr" and state his relationship to the protagonist Jaishankar Prasad.', answer: 'The narrator is Dr',
                  options: ['The narrator is Dr', 'Prasad is the narrator'],
                  hint: 'If unable to separate narrator\'s voice from Prasad\'s actions, review the "Indirect.',
                  misconception: 'Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad was great because the narrator says so".' }
          ],
            remediations: { 'students-conflate-the-narrator-s': { steps: ['Re-read the essay marking every sentence where Prasad *acts* or *speaks* (not where the narrator praises him).', 'Categorize these into: habits, decisions, interactions, crises.', 'For each category, write one trait + one quote.', 'Re-attempt Diagnostic Question 4 using only this evidence table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_005', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि फंसे हों तो प्रेमघन की छाया-स्मृति में मुख्य पात्र प्रेम के चरित्र-चित्रण.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र से बात करते हैं या scene में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' के सहायक पात्र',
                  options: ['\'जयशंकर प्रसाद\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों तो प्रेमघन की छाया-स्मृति में मुख्य पात्र प्रेम के चरित्र-चित्रण.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र से बात करते हैं या scene में उपस्थित हैं—उदाहरण के.' }
          ],
            remediations: { 'scene': { steps: ['छात्र को बताइए कि पहले वह प्रेमघन की छाया-स्मृति में किसी एक scene को चुनिए जहां प्रेम किसी से बात कर रहा है। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_006', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' का मुख्य विषय — \'जयशंकर प्रसाद\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो c12_hin_a_cbse_10_004 (नायक चित्रण) के \'आंतरिक संघर्ष\' खंड को दोबारा पढ़ें.',
          misconception: '**सबसे घातक भ्रांति:** छात्र "विषय" और "संदेश" को एक ही समझते हैं और परीक्षा में दोनों के लिए एक जैसा उत्तर लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' का मुख्य विषय',
                  options: ['\'जयशंकर प्रसाद\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c12_hin_a_cbse_10_004 (नायक चित्रण) के \'आंतरिक संघर्ष\' खंड को दोबारा पढ़ें — वहीं विषय.',
                  misconception: '**सबसे घातक भ्रांति:** छात्र "विषय" और "संदेश" को एक ही समझते हैं और परीक्षा में दोनों के लिए एक जैसा उत्तर लिख देते हैं। **वास्तविक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पठन:** पाठ के तीन प्रमुख प्रसंग (राजपाट त्याग, जोगी वेश, छाया-स्मृति संवाद) दोबारा पढ़ें और प्रत्येक के सामने.', '**अंतर स्पष्टीकरण:** एक शीट पर दो कॉलम बनाएं — बाएं "विषय (क्या है)", दाएं "संदेश (क्या सीखा)" — पाठ के 3-3 बिंदु भरें।.', '**लिखित अभ्यास:** 50-60 शब्दों में विषय लिखें, फिर 50-60 शब्दों में संदेश — दोनों में **एक भी शब्द समान न हो**। इसे.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 5 फिर से हल करें — अब उत्तर में अंतर स्पष्ट दिखना चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
