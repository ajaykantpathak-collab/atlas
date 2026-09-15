import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p2: SimDef = {
    id: 'v3_c12_hin_v_ch03_p2',
    title: 'vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 2/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 2/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_007', 'c12_hin_v_cbse_03_008', 'c12_hin_v_cbse_03_009', 'c12_hin_v_cbse_03_010', 'c12_hin_v_cbse_03_011', 'c12_hin_v_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate ideas or motifs in a literary work that support, contrast with, or enrich the primary theme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are walking through Old Delhi today: you see a Mughal-era haveli with a metro pillar right next to it. That clash — the planned past vs.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a prose chapter like "वखत खि अगवत्स-नमकस और गालिब की पूर्व".', options: [
                { text: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme', outcome: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme but is not.' },
                { text: 'Ghalib\'s house', outcome: 'Not quite — Students think "secondary theme" means "less important theme" and therefore treat it as optional.', reveals: 'secondary-theme-means-less-important' },
                { text: 'secondary theme', outcome: 'Not quite — Students think "secondary theme" means "less important theme" and therefore treat it as optional.', reveals: 'secondary-theme-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing amid the dusty mounds of Harappa today — what do you *actually* see? Broken bricks, shards of pottery, a dry riverbed.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor, and which one does the author use when describing the Great Bath as "flaèkq ?kkVh.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "the ruins *are like* a book")', outcome: 'A simile compares two things using "like" or "as" (e.g., "the ruins *are like* a book"); a metaphor.' },
                { text: '*any* descriptive detail is imagery', outcome: 'Not quite — Students consistently confuse **imagery** with **description** — they think *any* descriptive.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are an archaeologist reading a 2,000-year-old site report written in a language where half the technical terms have no modern equivalent — that.',
            decisions: [{ prompt: 'Identify the semantic field (category of meaning) to which the word "लरवि" belongs in the context of this chapter, and quote the specific.', options: [
                { text: 'Correct answer: "लरवि" belongs to the architectural/urban planning semantic field', outcome: 'Correct answer: "लरवि" belongs to the architectural/urban planning semantic field.' },
                { text: 'historical period', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'cultural practice', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re an archaeologist reading a site report — you notice the writer uses "किया गया" (was done) instead of "किया" (did) when describing excavations.',
            decisions: [{ prompt: 'Identify the predominant verb voice used in the descriptive passages of the chapter (e.g., "खुदाई की गई", "अवशेष मिले") and state its.', options: [
                { text: 'The predominant voice is कर्मण्य प्रयोग (passive voice), formed with past participle +', outcome: 'The predominant voice is कर्मण्य प्रयोग (passive voice), formed with past participle + auxiliary.' },
                { text: 'कर्तृ प्रयोग', outcome: 'Not quite — Students treat "language usage" as merely identifying word meanings or spotting figures of speech.', reveals: 'students-treat-language-usage-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re an archaeologist examining a shard of pottery from Mohenjo-daro: the shard\'s color and material are literal facts you can see, but its trade.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What is the', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What is the length.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing based on personal opinion." They write answers like.', reveals: 'inferential-means-guessing-based-on' },
                { text: 'guessing based on personal opinion', outcome: 'Not quite — Students believe "inferential" means "guessing based on personal opinion." They write answers like.', reveals: 'inferential-means-guessing-based-on' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'What comes next? vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate ideas or motifs in a literary work that.',
          hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient.',
          misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.',
          parts: [
                { id: 'a', prompt: 'The chapter describes the ancient city\'s layout ("उज्जैन के समान योजनाबद्ध", "चौक-चौराहे", "नालियों की व्यवस्था") and then contrasts it with modern Agra\'s.', answer: 'The contrast develops the secondary theme of **"planned civilization vs',
                  options: ['The contrast develops the secondary theme of **"planned civilization vs', 'the author likes old cities', 'secondary theme', 'less important theme'],
                  hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient vs.',
                  misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.' },
                { id: 'b', prompt: 'Apply the concept of "secondary theme" to a new context: In the passage where the narrator says "यहाँ की हवा में आज भी गालिब की ग़ज़लों की खुशबू बसी है".', answer: 'The secondary theme is **"memory/nostalgia as a living presence"**',
                  options: ['The secondary theme is **"memory/nostalgia as a living presence"**', 'architectural grandeur', 'literary memory', 'secondary theme'],
                  hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient vs.',
                  misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.' },
                { id: 'c', prompt: 'Analyze how the chapter uses the **Yamuna river** as a secondary theme.', answer: 'The Yamuna functions as the **"silent witness / constant amid change"** theme',
                  options: ['The Yamuna functions as the **"silent witness / constant amid change"** theme', 'secondary theme', 'less important theme'],
                  hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient vs.',
                  misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student cannot identify secondary themes: (1) Give them a **theme-tracking table** with columns: "Passage (para.', '(2) Assign: "Find 5 paragraphs where the author contrasts old vs.', 'Fill the table." (3) Then ask: "Group rows with the same Abstract Idea.', 'Each group = a secondary theme." (4) Re-diagnostic: Ask them to write one paragraph explaining the "river as witness".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of \'communal harmony\' (हिंदू-मुस्लिम एकता) is weakly developed because the chapter only mentions it once when.', answer: 'Refute',
                  options: ['Refute', 'secondary theme', 'less important theme'],
                  hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient vs.',
                  misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.' },
                { id: 'b', prompt: 'Create a 4-line poem (in Hindi or English) that captures ONE secondary theme of this chapter without naming any proper noun (Agra, Ghalib, Yamuna, Taj).', answer: '*Example for "planned past vs',
                  options: ['*Example for "planned past vs', 'secondary theme', 'less important theme'],
                  hint: 'If stuck, review the "Contrast Table" from node 003 (Setting) where you listed ancient vs.',
                  misconception: 'Students think "secondary theme" means "less important theme" and therefore treat it as optional for exams.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student cannot identify secondary themes: (1) Give them a **theme-tracking table** with columns: "Passage (para.', '(2) Assign: "Find 5 paragraphs where the author contrasts old vs.', 'Fill the table." (3) Then ask: "Group rows with the same Abstract Idea.', 'Each group = a secondary theme." (4) Re-diagnostic: Ask them to write one paragraph explaining the "river as witness".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, return to Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_008) and re-do the.',
          misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.',
          parts: [
                { id: 'a', prompt: 'The author writes: "ekSle tkM+s dk Fkk ij nqigj dh èkwi cgqr dM+h FkhA lkjs vkye dks tSls ,d iQhosQ jax esa jaxus dh dksf\'k\'k djrh gqbZ" (The evening sun.', answer: '**Visual imagery** dominates',
                  options: ['**Visual imagery** dominates', 'tactile', 'auditory', 'explain the effect'],
                  hint: 'If stuck, return to Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_008) and re-do the "sense-mapping".',
                  misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['**Re-teach the sense-test**: Give the student 5 sentences from the text (e.g., "nwljh eaf"ky ij f[kM+fd;k¡" — visual.', 'Ask: *Which sense organ receives this?* If they cannot name the organ, it\'s not imagery.', '**Metaphor surgery**: Take a simile from the text ("tSls lqcg yksx" — like naked people) and convert it to metaphor.', 'Ask: *What changed in meaning?* The shift from comparison to identity is the lesson.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_009', difficulty: 'standard',
          question: 'Irony in this chapter is the deliberate contrast between what appears on the.',
          hint: 'If stuck, re-read the "Before You Read" context (node c12_hin_v_cbse_03_001) and the.',
          misconception: 'Students often confuse irony with mere coincidence or sadness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in this chapter is the deliberate contrast between what appears on the surface and',
                  options: ['Irony in this chapter is the deliberate contrast between what appears on the surface and', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'यह शिक्षण-नोड c12_hin_v_cbse_03_002', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'If stuck, re-read the "Before You Read" context (node c12_hin_v_cbse_03_001) and the "Setting and.',
                  misconception: 'Students often confuse irony with mere coincidence or sadness.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the opening and closing paragraphs of the chapter aloud; mark every phrase that contrasts past and present.', 'For each marked phrase, ask: "Is there a contradiction between expectation (from the name, original purpose, or past.', 'List every physical object described in detail (stupa, pillars, lion capital, museum, pathways).', 'For each, write one abstract noun it could represent (e.g., stupa → continuity; broken pillar → fragility of empire).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on a word, apply the "Modifier Hunt" technique: locate the word in the text.',
          misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write single-word synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'यह शिक्षण-नोड c12_hin_v_cbse_03_002', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'If stuck on a word, apply the "Modifier Hunt" technique: locate the word in the text, copy the full.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write single-word synonyms (e.g., लरवि = किला).' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the "लरवि" paragraph (page 39) and physically underline every adjective, verb, and.', 'Ask them to sort these modifiers into "physical description" vs. "functional significance" columns.', 'Model the inference: "Because the text says \'लरवि के दोनों ओर द्वार हैं...', 'Assign the same exercise for "ओककक" and "खखखख" as homework; require a 3-sentence justification per word citing specific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck on participle identification, review Class 11 Vitan grammar nodes.',
          misconception: 'Students treat "language usage" as merely identifying word meanings or spotting figures of speech.',
          parts: [
                { id: 'a', prompt: 'Explain why the author uses तत्सम (Sanskrit-derived) compounds like "पुरातात्त्विक", "ऐतिहासिक", "सांस्कृतिक" instead of their तद्भव or देशज equivalents in the.', answer: 'These तत्सम words establish an academic, authoritative register appropriate for',
                  options: ['These तत्सम words establish an academic, authoritative register appropriate for', 'they sound more difficult', 'the author wanted to show off vocabulary'],
                  hint: 'If stuck on participle identification, review Class 11 Vitan grammar nodes (c11_hin_v_cbse_01_011.',
                  misconception: 'Students treat "language usage" as merely identifying word meanings or spotting figures of speech.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['Have the student highlight every verb in two paragraphs — color-code: red for passive, blue for active, green for.', 'Ask: "Who does the action in red verbs?', 'Read a colloquial version of the same paragraph aloud — have them list *exact* grammatical differences (tense, voice.', 'Revisit c11_hin_v_cbse_01_011 (Class 11 Grammar node) for participle identification drill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension involves retrieving information directly stated in the.',
          hint: 'If stuck, re-read the chapter with a highlighter: mark every factual statement (dates.',
          misconception: 'Students believe "inferential" means "guessing based on personal opinion." They write answers like "I think the people.',
          parts: [
                { id: 'a', prompt: 'The text states: "The streets were straight and crossed at right angles." An exam question asks: "What does the street layout suggest about the city\'s.', answer: 'Point: The grid layout suggests a strong, centralized administrative authority',
                  options: ['Point: The grid layout suggests a strong, centralized administrative authority', 'streets were straight', 'inferential', 'guessing based on personal opinion'],
                  hint: 'If stuck, re-read the chapter with a highlighter: mark every factual statement (dates.',
                  misconception: 'Students believe "inferential" means "guessing based on personal opinion." They write answers like "I think the people were happy because.' }
          ],
            remediations: { 'inferential-means-guessing-based-on': { steps: ['If a student cannot distinguish literal vs.', 'inferential or produces unsupported inferences: (1) Give them a 5-sentence paragraph from the chapter; ask them.', '(2) For each green highlight, require them to write the yellow facts that support it.', '(3) Practice converting 5 literal questions into inferential ones by adding "What does this suggest about...?" (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
