import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p2: SimDef = {
    id: 'v3_c12_hin_a_ch10_p2',
    title: 'vlxj otkgr · Part 2/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'vlxj otkgr · Part 2/3',
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
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate yet significant thematic threads that run parallel to the primary theme, enriching the narrative by exploring complementary human experiences, social contexts,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to your grandfather describe his childhood — he doesn\'t just tell one story; alongside the main tale of becoming a teacher,.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of narrative function?', options: [
                { text: 'A secondary theme is a subordinate thematic thread that supports, contrasts, or enriches', outcome: 'A secondary theme is a subordinate thematic thread that supports, contrasts, or enriches the.' },
                { text: 'secondary theme means less important theme', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" or "minor topics" — listing them like.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'less important', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" or "minor topics" — listing them like.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading Shukla\'s description of his childhood home in Kashi: the "narrow lanes," the "smell of damp earth," the "sound of temple bells." You.',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रात्मकता) in the context of Hindi prose.', options: [
                { text: '**Correct Answer:** Imagery is the use of descriptive language appealing to the five', outcome: '**Correct Answer:** Imagery is the use of descriptive language appealing to the five senses.' },
                { text: 'description', outcome: 'Not quite — **Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any.', reveals: 'misconception-imagery-is-just-flowery' },
                { text: 'picture-making', outcome: 'Not quite — **Misconception:** "Imagery is just flowery description / Metaphor is only for poetry / Any.', reveals: 'misconception-imagery-is-just-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading a story where a famous, award-winning author is described as sitting on a broken cot in a modest house, wearing simple clothes, while.',
            decisions: [{ prompt: 'Define verbal irony, situational irony, and dramatic irony with one example each from everyday life (not from the textbook).', options: [
                { text: 'Verbal irony: saying "What beautiful weather!" during a violent storm', outcome: 'Verbal irony: saying "What beautiful weather!" during a violent storm — the speaker means the.' },
                { text: 'the room smelled of old paper and ink', outcome: 'Not quite — Students consistently confuse **symbolism** with **imagery** — they think any vivid description.', reveals: 'students-consistently-confuse-symbolism-with' },
                { text: 'any vivid description (e', outcome: 'Not quite — Students consistently confuse **symbolism** with **imagery** — they think any vivid description.', reveals: 'students-consistently-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a Hindi newspaper editorial and encounter the word "viHkza\'k". You don\'t have a dictionary handy. How do you figure out what it means?',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of a word in context?', options: [
                { text: 'The primary strategy is to examine the surrounding sentences', outcome: 'The primary strategy is to examine the surrounding sentences — context clues such as synonyms.' },
                { text: 'look it up in a dictionary immediately', outcome: 'Not quite — Students often treat the glossary meanings as fixed definitions and apply them mechanically.', reveals: 'students-often-treat-the-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading Prasad\'s childhood memory of hiding from Bharatendu Harishchandra\'s house — the sentences feel heavy, layered, almost like a classical.',
            decisions: [{ prompt: 'Identify the grammatical term for the underlined construction in this sentence from the text: "मुझे याद है कि जब भारतेंदु हरिश्चंद्र के घर.', options: [
                { text: 'The underlined "गुजरता था" is a **habitual past imperfective verb form** (अभ्यस्त', outcome: 'The underlined "गुजरता था" is a **habitual past imperfective verb form** (अभ्यस्त भूतकालिक अपूर्ण.' },
                { text: 'simple past', outcome: 'Not quite — Students equate "language usage analysis" with **vocabulary listing** — they highlight difficult.', reveals: 'students-equate-language-usage-analysis' },
                { text: 'perfective', outcome: 'Not quite — Students equate "language usage analysis" with **vocabulary listing** — they highlight difficult.', reveals: 'students-equate-language-usage-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing an unseen passage or the Chapter 10 memoir.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is directly stated in the text (e.g., "Where was the author', outcome: 'A literal question\'s answer is directly stated in the text (e.g., "Where was the author born?" →.' },
                { text: ') reveals the student cannot distinguish explicit vs', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion".', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'giving your opinion', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion".', reveals: 'inferential-means-guessing-or-giving' }
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
            decisions: [{ prompt: 'What comes next? vlxj otkgr · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vlxj otkgr · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate yet significant thematic threads that run.',
          hint: 'If stuck, revisit c12_hin_a_cbse_10_006 and rewrite the primary theme statement until.',
          misconception: 'Students often treat secondary themes as "sub-topics" or "minor topics" — listing them like inventory items (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the subordinate yet significant thematic threads that run parallel',
                  options: ['Secondary themes are the subordinate yet significant thematic threads that run parallel', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and Narrative Structure refers to the sequence of events (plot) and the technique', 'Setting and Atmosphere in literature refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_10_006 and rewrite the primary theme statement until.',
                  misconception: 'Students often treat secondary themes as "sub-topics" or "minor topics" — listing them like inventory items (e.g., "family, language.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot move beyond listing topics, do this 3-step remediation: (1) Give them a two-column table: Column.', '(2) Have them highlight every paragraph where *language choice* (Hindi/Sanskrit/English) is explicitly discussed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_008', difficulty: 'standard',
          question: 'Imagery (चित्रात्मकता) refers to the use of vivid, sensory language that.',
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
            remediations: { 'misconception-imagery-is-just-flowery': { steps: ['**Revisit Class 11 Node:** `c11_hin_ar_cbse_10_008` (Literary Devices: Imagery and Metaphor in Class 11 Antra Chapter.', 'Re-do the worked examples there focusing on *prose* passages, not poems.', '**Sensory Walk Exercise:** Take a 5-minute walk (real or imagined).', 'Write 1 sentence per sense (5 sentences) describing *only* raw sensation (no interpretation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
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
            remediations: { 'misconception-imagery-is-just-flowery': { steps: ['**Revisit Class 11 Node:** `c11_hin_ar_cbse_10_008` (Literary Devices: Imagery and Metaphor in Class 11 Antra Chapter.', 'Re-do the worked examples there focusing on *prose* passages, not poems.', '**Sensory Walk Exercise:** Take a 5-minute walk (real or imagined).', 'Write 1 sentence per sense (5 sentences) describing *only* raw sensation (no interpretation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck on symbol identification, review the "Image-to-Symbol Ladder" exercise.',
          misconception: 'Students consistently confuse **symbolism** with **imagery** — they think any vivid description (e.g., "the room.',
          parts: [
                { id: 'a', prompt: 'Define verbal irony, situational irony, and dramatic irony with one example each from everyday life (not from the textbook).', answer: 'Verbal irony: saying "What beautiful weather!" during a violent storm',
                  options: ['Verbal irony: saying "What beautiful weather!" during a violent storm', 'the room smelled of old paper and ink', 'any vivid description (e'],
                  hint: 'If stuck on symbol identification, review the "Image-to-Symbol Ladder" exercise.',
                  misconception: 'Students consistently confuse **symbolism** with **imagery** — they think any vivid description (e.g., "the room smelled of old paper and.' },
                { id: 'b', prompt: 'In the chapter, the narrator describes Premchand\'s house as having a "broken cot" (टूटी खाट) and "modest surroundings" while also noting he was a celebrated.', answer: 'It is situational irony',
                  options: ['It is situational irony', 'just a fact about his poverty', 'the room smelled of old paper and ink', 'any vivid description (e'],
                  hint: 'If stuck on symbol identification, review the "Image-to-Symbol Ladder" exercise.',
                  misconception: 'Students consistently confuse **symbolism** with **imagery** — they think any vivid description (e.g., "the room smelled of old paper and.' },
                { id: 'c', prompt: 'The narrator mentions the term "फुल्लनसग" (phullansag) used by the literary circle to describe themselves.', answer: 'This is verbal irony',
                  options: ['This is verbal irony', 'they called themselves useless', 'the room smelled of old paper and ink', 'takes the label literally (e'],
                  hint: 'If stuck on symbol identification, review the "Image-to-Symbol Ladder" exercise.',
                  misconception: 'Students consistently confuse **symbolism** with **imagery** — they think any vivid description (e.g., "the room smelled of old paper and.' },
                { id: 'd', prompt: 'Analyze the "broken cot" (टूटी खाट) as a symbol in the chapter. What does it literally represent, and what three abstract ideas does it symbolize?', answer: 'Literally: a damaged, low-quality sleeping cot in Premchand\'s house',
                  options: ['Literally: a damaged, low-quality sleeping cot in Premchand\'s house', 'the room smelled of old paper and ink', 'any vivid description (e'],
                  hint: 'If stuck on symbol identification, review the "Image-to-Symbol Ladder" exercise.',
                  misconception: 'Students consistently confuse **symbolism** with **imagery** — they think any vivid description (e.g., "the room smelled of old paper and.' }
          ],
            remediations: { 'students-consistently-confuse-symbolism-with': { steps: ['Re-read the chapter *only* for concrete objects (cot, dictionary, pen, chair, room, clothes). List them.', 'For each, ask: "What *idea* does this object carry beyond its function?" Write the idea in one phrase (e.g., cot →.', 'Verify each with a textual anchor — find the sentence where the narrator *reflects* on the object, not just describes.', 'Revisit node **c12_hin_a_cbse_10_008** (Imagery and Metaphor) and complete its Diagnostic Questions 3 and 4 — the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five.',
          misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of a word in context?', answer: 'The primary strategy is to examine the surrounding sentences',
                  options: ['The primary strategy is to examine the surrounding sentences', 'look it up in a dictionary immediately'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unfamiliar.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'b', prompt: 'In the phrase "pkSèkjh lkgc osQ O;fDrRo dks crkus osQ fy, ikB esa oqQN e”ksnkj okD; vk, gSa", what does "e”ksnkj" likely mean, and which context clue helps you.', answer: '"e”ksnkj" means "descriptive" or "illustrative"',
                  options: ['"e”ksnkj" means "descriptive" or "illustrative"', 'difficult'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unfamiliar.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'c', prompt: 'The word "fpÙkkd"kZd" appears in the sentence: "jkr dks izk;% jkepfjrekul vkSj jkepafnzdk] ?kj osQ lc yksxksa dks ,d=k djosQ cM+s fpÙkkd"kZd <ax ls i<+k djrs.', answer: '"fpÙkkd"kZd" means "heart-touching" or "emotionally moving"',
                  options: ['"fpÙkkd"kZd" means "heart-touching" or "emotionally moving"', 'misses the emotional cue'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unfamiliar.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' },
                { id: 'd', prompt: 'Compare the use of "oØrk" in the glossary ("Vs<+kiu] oqQfVyrk") with its likely contextual meaning in a sentence like "mudh ckrphr dk <ax muosQ ys[kksa osQ <ax.', answer: 'The glossary gives "restlessness, instability"',
                  options: ['The glossary gives "restlessness, instability"', 'restlessness', 'fujkyk'],
                  hint: 'Review the "Context Clue Types" table from c11_hin_ar_cbse_01_010 and practice on five unfamiliar.',
                  misconception: 'Students often treat the glossary meanings as fixed definitions and apply them mechanically to every occurrence.' }
          ],
            remediations: { 'students-often-treat-the-glossary': { steps: ['Have the student re-read the specific paragraph where the word appears, highlighting all adjectives and verbs within.', 'Ask: "What feeling or action is the author describing right here?" 3.', 'Match that feeling to the glossary option that fits best.', 'Practice by writing two sentences: one using the word in the chapter\'s sense, one using a different sense (if possible).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If clause identification fails, revisit Class 11 **c11_hin_ar_cbse_10_011** worked.',
          misconception: 'Students equate "language usage analysis" with **vocabulary listing** — they highlight difficult words (उद्भव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of grammatical patterns,',
                  options: ['Language Usage in the Text refers to the systematic analysis of grammatical patterns,', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and Narrative Structure refers to the sequence of events (plot) and the technique', 'Setting and Atmosphere in literature refers to the time, place, and social environment in'],
                  hint: 'If clause identification fails, revisit Class 11 **c11_hin_ar_cbse_10_011** worked examples.',
                  misconception: 'Students equate "language usage analysis" with **vocabulary listing** — they highlight difficult words (उद्भव, संवेदनशीलता) and define.' }
          ],
            remediations: { 'students-equate-language-usage-analysis': { steps: ['If a student cannot move beyond vocabulary listing: (1) Give them a single sentence from the text and ask: "How many.', 'What does each subordinate clause *do*?" — force clause-mapping before meaning.', '(2) Provide a "syntax transformation" exercise: rewrite a complex Prasad sentence as 3 simple sentences, then ask.', '(3) Use the Class 11 node **c11_hin_ar_cbse_10_011** (Grammar: Language Usage in the Text) which introduces clause-type.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'If stuck on labeling a question L/I, re-read the specific paragraph referenced in the.',
          misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".',
          parts: [
                { id: 'a', prompt: 'In the memoir, the author writes: "esjh lwjr esa ,slh D;k ckr Fkh] ;g bl le; ugha dg ldrkA" (I don\'t know what was in my mind then).', answer: 'It is an inferential question',
                  options: ['It is an inferential question', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck on labeling a question L/I, re-read the specific paragraph referenced in the question —.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer this inferential question from the chapter: "Why did the author\'s father stop him from reading English novels?" (Textual.', answer: '**Point:** The father wanted to protect his son\'s Hindi linguistic roots',
                  options: ['**Point:** The father wanted to protect his son\'s Hindi linguistic roots', '¯gnh dk cM+k \'kkSd gSA', 'inferential', 'guessing'],
                  hint: 'If stuck on labeling a question L/I, re-read the specific paragraph referenced in the question —.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['Have the student take any 5 questions from the chapter\'s "iz\'u&vH;kl" and label each L or I.', 'For each I-question, force them to write **three separate textual quotes** that collectively support the inference —.', 'Then rewrite the answer using PEEL: Point (inference), Evidence (3 quotes), Explanation (logical bridge), Link (theme).', 'Re-diagnose: give a fresh inferential question from an unseen passage; if they still skip Evidence step, repeat with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
