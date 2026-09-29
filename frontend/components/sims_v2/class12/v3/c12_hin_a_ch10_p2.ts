import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p2: SimDef = {
    id: 'v3_c12_hin_a_ch10_p2',
    title: 'प्रेमघन की छाया-स्मृति · Part 2/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'प्रेमघन की छाया-स्मृति · Part 2/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_007', 'c12_hin_a_cbse_10_008', 'c12_hin_a_cbse_10_009', 'c12_hin_a_cbse_10_010', 'c12_hin_a_cbse_10_011', 'c12_hin_a_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'प्रेमघन की छाया-स्मृति — गौण विषय', text: '\'जयशंकर प्रसाद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['प्रेमघन की छाया-स्मृति —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_008', title: 'प्रेमघन की छाया-स्मृति — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'जयशंकर प्रसाद\' में बिंब ढूँढिए — जयशंकर-प्रसाद — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रात्मकता) in the context of Hindi prose.', options: [
                { text: '**Correct Answer:** Imagery is the use of descriptive language appealing to the five', outcome: '**Correct Answer:** Imagery is the use of descriptive language appealing to the five senses.' },
                { text: 'description', outcome: 'Not quite — **Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any.', reveals: 'misconception-imagery-is-just-flowery' },
                { text: 'picture-making', outcome: 'Not quite — **Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any.', reveals: 'misconception-imagery-is-just-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_010', title: 'प्रेमघन की छाया-स्मृति — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'जयशंकर प्रसाद\' के मुख्य शब्द: जयशंकर-प्रसाद — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of a word in context?', options: [
                { text: 'The primary strategy is to examine the surrounding sentences', outcome: 'The primary strategy is to examine the surrounding sentences — context clues such as synonyms.' },
                { text: 'look it up in a dictionary immediately', outcome: 'Not quite — Students often treat the glossary meanings as fixed definitions and apply them mechanically.', reveals: 'students-often-treat-the-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'What comes next? प्रेमघन की छाया-स्मृति · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — प्रेमघन की छाया-स्मृति · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_007', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि छात्र मुख्य विषय को स्पष्ट रूप से नहीं पहचान पा रहा है, तो c12_hin_a_cbse_10_006.',
          misconception: 'छात्र अक्सर गौण विषयों को केवल कहानी में आने वाले छोटे-छोटे घटनाक्रमों (जैसे कि किसी पात्र का रोना, कोई बातचीत) के रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' के गौण विषय',
                  options: ['\'जयशंकर प्रसाद\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र मुख्य विषय को स्पष्ट रूप से नहीं पहचान पा रहा है, तो c12_hin_a_cbse_10_006 (मुख्य विषय और.',
                  misconception: 'छात्र अक्सर गौण विषयों को केवल कहानी में आने वाले छोटे-छोटे घटनाक्रमों (जैसे कि किसी पात्र का रोना, कोई बातचीत) के रूप में देखते हैं, बिना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से तीन ऐसे क्षण चुनने के लिए कहिए जो भावनात्मक रूप से मजबूत लगे हों — फिर प्रत्येक क्षण के लिए.', 'क्या यह घटना दोहराई गई है?', 'क्या यह मुख्य प्रेम के त्याग के विषय को समझाने में मदद करती है?" यदि छात्र केवल घटना का वर्णन करता है, तो उसे बताइए कि.', 'क्या यह उसके त्याग के निर्णय को दर्शाता है या बस एक प्रतिक्रिया है?" इससे वह घटना से विषय की ओर सोचना सीखेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_008', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on metaphor analysis: Review the **Tenor-Vehicle-Ground** framework.',
          misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor.".',
          parts: [
                { id: 'a', prompt: 'In the text, Shukla writes: "पंडित जी के यहाँ पुस्तकों का एक बड़ा संग्रह था... वह मेरे लिए एक मंदिर के समान था।" Identify the figure of speech.', answer: '**Correct Answer:** It is a **simile (उपमा)**, not a metaphor',
                  options: ['**Correct Answer:** It is a **simile (उपमा)**, not a metaphor', 'metaphor'],
                  hint: 'If stuck on metaphor analysis: Review the **Tenor-Vehicle-Ground** framework (उपमेय-उपमान-साधारण.',
                  misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor." **Why it persists:**.' },
                { id: 'b', prompt: '**APPLY:** The text describes Shukla\'s first visit to the Nagari Pracharini Sabha library: "वहाँ पुस्तकों की गंध, पुराने कागज की गंध, धूल की गंध...', answer: '**Correct Answer:** Dominant imagery: **Olfactory (घ्राण)**',
                  options: ['**Correct Answer:** Dominant imagery: **Olfactory (घ्राण)**', 'visual'],
                  hint: 'If stuck on metaphor analysis: Review the **Tenor-Vehicle-Ground** framework (उपमेय-उपमान-साधारण.',
                  misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor." **Why it persists:**.' },
                { id: 'c', prompt: '**ANALYZE:** Shukla writes about his intellectual transformation: "मेरे ज्ञान-चक्षु खुल गए" (my eyes of knowledge opened) and "अज्ञान का अंधकार छंट गया".', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'अज्ञान का अंधकार'],
                  hint: 'If stuck on metaphor analysis: Review the **Tenor-Vehicle-Ground** framework (उपमेय-उपमान-साधारण.',
                  misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor." **Why it persists:**.' }
          ],
            remediations: { 'misconception-imagery-is-just-flowery': { steps: ['**Revisit Class 11 Node:** `c11_hin_ar_cbse_10_008` (Literary Devices: Imagery and Metaphor in Class 11 Antra Chapter.', 'Re-do the worked examples there focusing on *prose* passages, not poems.', '**Sensory Walk Exercise:** Take a 5-minute walk (real or imagined).', 'Write 1 sentence per sense (5 sentences) describing *only* raw sensation (no interpretation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor.".',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** A student writes in their board answer: "लेखक ने \'ज्ञान-चक्षु\' रूपक का प्रयोग किया है क्योंकि यह सुंदर लगता है और पाठक को अच्छा लगता है।".', answer: '**Correct Critique:** The answer is **superficial and subjective**',
                  options: ['**Correct Critique:** The answer is **superficial and subjective**', 'appreciation', 'analysis'],
                  hint: 'If stuck on metaphor analysis: Review the **Tenor-Vehicle-Ground** framework (उपमेय-उपमान-साधारण.',
                  misconception: '**Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any comparison is a metaphor." **Why it persists:**.' }
          ],
            remediations: { 'misconception-imagery-is-just-flowery': { steps: ['**Revisit Class 11 Node:** `c11_hin_ar_cbse_10_008` (Literary Devices: Imagery and Metaphor in Class 11 Antra Chapter.', 'Re-do the worked examples there focusing on *prose* passages, not poems.', '**Sensory Walk Exercise:** Take a 5-minute walk (real or imagined).', 'Write 1 sentence per sense (5 sentences) describing *only* raw sensation (no interpretation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_009', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि छात्र इन युक्तियों को पहचानने में भ्रमित है, तो कक्षा 11 के किसी भी पाठ के नोड.',
          misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही मान लेते हैं और किसी भी विपरीत चित्रण को प्रतीक कह देते हैं (जैसे "लाल गुलाब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' में विरोधाभास',
                  options: ['\'जयशंकर प्रसाद\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र इन युक्तियों को पहचानने में भ्रमित है, तो कक्षा 11 के किसी भी पाठ के नोड.',
                  misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही मान लेते हैं और किसी भी विपरीत चित्रण को प्रतीक कह देते हैं (जैसे "लाल गुलाब = प्रेमी का प्रतीक".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह पहले वाक्य पढ़े और पूछे: "क्या यहाँ दो शब्द ऐसे हैं जिनके अर्थ एक-दूसरे को नकार रहे हैं?" यदि हाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_010', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five.',
          misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of a word in context?', answer: 'The primary strategy is to examine the surrounding sentences',
                  options: ['The primary strategy is to examine the surrounding sentences', 'look it up in a dictionary immediately'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unपरिचित.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'b', prompt: 'In the phrase "pkSèkjh lkgc osQ O;fDrRo dks crkus osQ fy, ikB esa oqQN e”ksnkj okD; vk, gSa", what does "e”ksnkj" likely mean, and which context clue helps you.', answer: '"e”ksnkj" means "descriptive" or "illustrative"',
                  options: ['"e”ksnkj" means "descriptive" or "illustrative"', 'difficult'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unपरिचित.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'c', prompt: 'The word "fpÙkkd"kZd" appears in the sentence: "jkr dks izk;% jkepfjrekul vkSj jkepafnzdk] ?kj osQ lc yksxksa dks ,d=k djosQ cM+s fpÙkkd"kZd <ax ls i<+k djrs.', answer: '"fpÙkkd"kZd" means "heart-touching" or "emotionally moving"',
                  options: ['"fpÙkkd"kZd" means "heart-touching" or "emotionally moving"', 'misses the emotional cue'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unपरिचित.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'd', prompt: 'Compare the use of "oØrk" in the glossary ("Vs<+kiu] oqQfVyrk") with its likely contextual meaning in a sentence like "mudh ckrphr dk <ax muosQ ys[kksa osQ <ax.', answer: 'The glossary gives "restlessness, instability"',
                  options: ['The glossary gives "restlessness, instability"', 'restlessness', 'fujkyk'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unपरिचित.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' }
          ],
            remediations: { 'students-often-treat-the-glossary': { steps: ['Have the student re-read the specific paragraph where the word appears, highlighting all adjectives and verbs within.', 'Ask: "What feeling or action is the author describing right here?" 3.', 'Match that feeling to the glossary option that fits best.', 'Practice by writing two sentences: one using the word in the chapter\'s sense, one using a different sense (if possible).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_011', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि फंसे हों तो Class 11 के किसी भी पाठ के \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या अलंकारों की पहचान करना है — जैसे कि वे \'रूपक\' या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' में भाषा-प्रयोग',
                  options: ['\'जयशंकर प्रसाद\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों तो Class 11 के किसी भी पाठ के \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या अलंकारों की पहचान करना है — जैसे कि वे \'रूपक\' या \'अनुप्रास\' जैसे शब्दों को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ से पाँच ऐसे वाक्य चुनने को कहिए जहाँ शब्द दोहराए गए हों या विशेषण असामान्य हों (जैसे "तपती धूप".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_012', difficulty: 'standard',
          question: '\'जयशंकर प्रसाद\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक नोड (c11_hin_a_cbse_10_012).',
          misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों के लिए पाठ में सीधे लिखे गए वाक्यों की पुनरावृत्ति पर्याप्त है, जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जयशंकर प्रसाद\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'जयशंकर प्रसाद\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जयशंकर प्रसाद\' का कथानक', '\'जयशंकर प्रसाद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक नोड (c11_hin_a_cbse_10_012) की दोबारा.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों के लिए पाठ में सीधे लिखे गए वाक्यों की पुनरावृत्ति पर्याप्त है, जैसे "प्रेमघन उदासीन था" लिखकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि प्रेमघन की चुप्पी, उसके काम न करना, और घर की ओर देखना लेकिन न जाना - ये तीन व्यवहार एक साथ उदासीनता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
