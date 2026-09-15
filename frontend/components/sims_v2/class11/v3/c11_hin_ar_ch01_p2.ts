import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p2',
    title: 'izsepan · Part 2/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'izsepan · Part 2/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_007', 'c11_hin_ar_cbse_01_008', 'c11_hin_ar_cbse_01_009', 'c11_hin_ar_cbse_01_010', 'c11_hin_ar_cbse_01_011', 'c11_hin_ar_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate thematic threads that run parallel to the primary theme, enriching the narrative by exploring specific social, psychological, or philosophical dimensions through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a news report about a government office where a clerk demands a bribe from a poor farmer — you notice the main story is corruption, but.',
            decisions: [{ prompt: 'What is the precise literary definition of a "secondary theme" as distinct from a "primary theme" in prose fiction?', options: [
                { text: 'A secondary theme is a subordinate thematic thread that supports, complicates, or runs', outcome: 'A secondary theme is a subordinate thematic thread that supports, complicates, or runs parallel.' },
                { text: 'it\'s just a less important theme', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" — listing them like.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'less important', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" — listing them like.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a movie scene where the camera zooms in on a farmer\'s cracked heels, you hear the squelch of wet mud, and smell the sharp tang of urea.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from *Ued ka Naksha* (do not use the examples from the.', options: [
                { text: '**Correct Answer:** Imagery is language appealing to the five senses to create a concrete', outcome: '**Correct Answer:** Imagery is language appealing to the five senses to create a concrete.' },
                { text: 'memories *like* a creeper', outcome: 'Not quite — **Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat.', reveals: 'students-believe-imagery-descriptive-writing' },
                { text: 'descriptive writing', outcome: 'Not quite — **Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat.', reveals: 'students-believe-imagery-descriptive-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you spend weeks preparing a project honestly, but a classmate copies last-minute and gets higher marks — that bitter gap between effort and outcome.',
            decisions: [{ prompt: 'Define situational irony and give one example from daily life (not from the story).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'irony is just a coincidence', outcome: 'Not quite — Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha.', reveals: 'students-often-treat-every-unexpected' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha.', reveals: 'students-often-treat-every-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial about rural unemployment and encounter the word "agrarian" in the sentence: "The agrarian crisis deepened.',
            decisions: [{ prompt: 'Define "context clue" and name the six standard types taught at senior secondary level.', options: [
                { text: 'A context clue is a hint within the same sentence or surrounding sentences that helps a', outcome: 'A context clue is a hint within the same sentence or surrounding sentences that helps a reader.' },
                { text: 'synonym and antonym', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you receive two messages about the same event: one from a friend on WhatsApp full of slang, emojis, and sentence fragments, and another from your.',
            decisions: [{ prompt: 'What is the grammatical term for the verb form "कराए गए" in the sentence "कागज़ात जमा कराए गए", and what does it indicate about agency.', options: [
                { text: 'The form "कराए गए" is a **causative passive** construction (कर्मवाच्य + causative)', outcome: 'The form "कराए गए" is a **causative passive** construction (कर्मवाच्य + causative).' },
                { text: 'language usage', outcome: 'Not quite — Students believe "language usage" only means identifying difficult words or listing idioms.', reveals: 'language-usage-only-means-identifying' },
                { text: '"language usage" only means identifying difficult words or listing idioms', outcome: 'Not quite — Students believe "language usage" only means identifying difficult words or listing idioms.', reveals: 'language-usage-only-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in your Class 11 Hindi exam and see a question: "Why does Vyakti Singh ultimately help the strikers?" Your first instinct might be.',
            decisions: [{ prompt: 'Identify whether the following question about "Udd Ka Naukri" is literal or inferential: "What specific action does Vyakti Singh take when.', options: [
                { text: '**Correct Answer: Literal.** The text explicitly states: "Vyakti Singh gave his savings', outcome: '**Correct Answer: Literal.** The text explicitly states: "Vyakti Singh gave his savings to the.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "subjective interpretation where any answer is valid if you.', reveals: 'inferential-means-subjective-interpretation-wher' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'What comes next? izsepan · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — izsepan · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate thematic threads that run parallel to the.',
          hint: 'If stuck, review node 004 (Vyaksihnhu\'s internal conflicts) and node 006 (how to write.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing them like inventory (e.g., "poverty,".',
          parts: [
                { id: 'a', prompt: 'Compare how the secondary theme of "paternal sacrifice" operates through Oakha (Vyaksihnhu\'s father) versus the unnamed peasant father who loses his son to the.', answer: 'Oakha\'s sacrifice is conscious and articulate',
                  options: ['Oakha\'s sacrifice is conscious and articulate', 'sacrificing parents'],
                  hint: 'If stuck, review node 004 (Vyaksihnhu\'s internal conflicts) and node 006 (how to write a primary.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing them like inventory (e.g., "poverty," "education,".' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student lists themes without evidence: (1) Give them a three-column table: Column A = Theme Statement, Column.', '(2) Model filling one row together: "Idealism vs Survival" | Vyaksihnhu saying "नौकरी कर लूंगा" after father\'s death (p.', '12) | Internal monologue + situational irony.', '(3) Assign: complete 3 rows for 3 different secondary themes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_008', difficulty: 'standard',
          question: '**Imagery (चित्रात्मकता)** refers to the use of vivid, sensory language that.',
          hint: 'If stuck, review **c11_hin_ar_cbse_01_006 (Primary Theme)** — specifically the.',
          misconception: '**Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat both as *optional.',
          parts: [
                { id: 'a', prompt: 'In the passage where IafMr Vyavsaya says "gekjs ljdkj rks vki gh gSa" (Our government *is* you), identify the tenor and vehicle.', answer: '**Correct Answer:** Tenor = the colonial contractor/bureaucrat (the oppressor)',
                  options: ['**Correct Answer:** Tenor = the colonial contractor/bureaucrat (the oppressor)', 'beauty of language', 'descriptive writing', 'flowery language'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_01_006 (Primary Theme)** — specifically the distinction between.',
                  misconception: '**Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat both as *optional decorations* added for.' },
                { id: 'b', prompt: '**Analyze:** Compare the **olfactory imagery** in two scenes: (a) the opening udad field ("mQijh vk; cgrk gqvk lzksr...") and (b) the auction morning.', answer: '**Correct Answer:** Scene (a)',
                  options: ['**Correct Answer:** Scene (a)', 'descriptive writing', 'flowery language', 'imagery = "descriptive writing" and metaphor = "flowery language'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_01_006 (Primary Theme)** — specifically the distinction between.',
                  misconception: '**Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat both as *optional decorations* added for.' }
          ],
            remediations: { 'students-believe-imagery-descriptive-writing': { steps: ['**Sensory Walk:** Take the student outside (or to a kitchen).', 'Ask them to close eyes and name **only** smells, sounds, textures for 2 minutes.', 'This breaks "visual-only" habit.', '**Tenor-Vehicle Surgery:** Give a metaphor from the text ("U;k; vkSj uhfr lc y{eh osQ gh f[kykSus gSa").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat both as *optional.',
          parts: [
                { id: 'a', prompt: '**Evaluate:** A critic claims: "Premchand\'s metaphor \'/eZ us /u dks iSjksa rys oqQpy Mkyk\' (Death covered Life with a sheet) is **sentimental melodrama** that.', answer: '**Correct Answer (Refute):** The metaphor is **not sentimental**',
                  options: ['**Correct Answer (Refute):** The metaphor is **not sentimental**', 'metaphor', 'unrealistic/emotional', 'descriptive writing'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_01_006 (Primary Theme)** — specifically the distinction between.',
                  misconception: '**Students believe imagery = "descriptive writing" and metaphor = "flowery language."** They treat both as *optional decorations* added for.' }
          ],
            remediations: { 'students-believe-imagery-descriptive-writing': { steps: ['**Sensory Walk:** Take the student outside (or to a kitchen).', 'Ask them to close eyes and name **only** smells, sounds, textures for 2 minutes.', 'This breaks "visual-only" habit.', '**Tenor-Vehicle Surgery:** Give a metaphor from the text ("U;k; vkSj uhfr lc y{eh osQ gh f[kykSus gSa").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening.',
          misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance").',
          parts: [
                { id: 'a', prompt: 'In "Udd ka Naksha," Vyasingh frames Eka Okha to secure him a government job. Explain why this is situational irony, not just a plot twist.', answer: 'It is situational irony',
                  options: ['It is situational irony', 'it\'s ironic because Vyasingh is bad', 'turban'],
                  hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening (Vyasingh\'s.',
                  misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance") or misfortune ("Eka Okha.' },
                { id: 'b', prompt: 'Identify the central symbol in the story\'s title "Udd ka Naksha" and explain what abstract concept it represents, using one textual detail.', answer: 'The "map of the heart" (udd ka naksha) symbolises moral orientation',
                  options: ['The "map of the heart" (udd ka naksha) symbolises moral orientation', 'it\'s just a map of the village', 'turban'],
                  hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening (Vyasingh\'s.',
                  misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance") or misfortune ("Eka Okha.' }
          ],
            remediations: { 'students-often-treat-every-unexpected': { steps: ['**Isolate the expectation**: Have the student write two columns — "What characters/readers expect" vs.', '"What actually happens" — for three key scenes.', '**Symbol autopsy**: Pick one object (the map, the turban, the job letter).', 'Ask: "If this object could speak, what abstract truth would it tell?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the analytical skill of determining the precise.',
          hint: 'If stuck on clause parsing → review Class 10 Hindi Grammar "vakya vishleshan" (sentence.',
          misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the sentence it sits in.',
          parts: [
                { id: 'a', prompt: 'Apply the *contrast clue* strategy to determine the meaning of *vykSfdd* in the phrase *"vykSfdd ohjrk"* (from the sentence: *¯drq /eZ vykSfdd ohjrk osQ lkFk.', answer: 'The contrast phrase is *"vfopfyr [kM+k"* (paid/fixed salary)',
                  options: ['The contrast phrase is *"vfopfyr [kM+k"* (paid/fixed salary)', 'difficult', 'vocabulary in context'],
                  hint: 'If stuck on clause parsing → review Class 10 Hindi Grammar "vakya vishleshan" (sentence analysis).',
                  misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the sentence it sits in.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Isolate the clause**: Have the student copy the exact sentence containing the target word and bracket the main clause.', '**Hunt for signals**: Highlight conjunctions (*ysfdu, blhfy, ;fn, tSls*), punctuation (dashes, commas), and repeated.', '**Map the semantic field**: List all words in the paragraph related to the target word\'s domain (e.g., for *vjnyh*.', '**Write a "context definition"**: Not a dictionary gloss, but a sentence: "*vjnyh* means the state of being trapped.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal.',
          misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.',
          parts: [
                { id: 'a', prompt: 'Rewrite the clerk\'s line "आपको नक्शा दिखाना पड़ेगा" into the peasant\'s register using appropriate pronoun, verb agreement, and dialect marker.', answer: 'Peasant register: "तुझको नक्शा देखब पड़ै"',
                  options: ['Peasant register: "तुझको नक्शा देखब पड़ै"', 'पड़ेगा', 'language usage', '"language usage" only means identifying difficult words or listing idioms'],
                  hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal pronouns) from.',
                  misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.' },
                { id: 'b', prompt: 'Compare the sentence structure of the narrator\'s opening description ("इज्सेपन/3" paragraph) with the clerk\'s first spoken line.', answer: 'The narrator uses long, hypotactic sentences with multiple subordinate clauses',
                  options: ['The narrator uses long, hypotactic sentences with multiple subordinate clauses', 'language usage', '"language usage" only means identifying difficult words or listing idioms'],
                  hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal pronouns) from.',
                  misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.' }
          ],
            remediations: { 'language-usage-only-means-identifying': { steps: ['Give the student two parallel sentences: "अफसर ने फाइल मँगवाई" (active) vs "फाइल मँगवाई गई" (passive).', 'Ask: "Who is responsible in each?', 'Which protects the अफसर?" 2.', 'Provide a three-column table: Standard Hindi | Avadhi form in text | Grammatical difference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension involves extracting explicitly stated information from.',
          hint: 'Review the "Character Analysis: Protagonist" node (01004) and re-read pages 6-16 with.',
          misconception: 'Students believe "inferential" means "subjective interpretation where any answer is valid if you can argue for it.".',
          parts: [
                { id: 'a', prompt: 'Compare these two student answers to the same inferential question: "Why does Vyakti Singh\'s father remain silent when his son resigns?" - **Answer A:**.', answer: '**Correct Analysis:** Answer B demonstrates deeper analytical reasoning',
                  options: ['**Correct Analysis:** Answer B demonstrates deeper analytical reasoning', 'inferential'],
                  hint: 'Review the "Character Analysis: Protagonist" node (01004) and re-read pages 6-16 with a focus.',
                  misconception: 'Students believe "inferential" means "subjective interpretation where any answer is valid if you can argue for it." In reality, senior.' }
          ],
            remediations: { 'inferential-means-subjective-interpretation-wher': { steps: ['If a student cannot distinguish literal from inferential or writes unsupported inferences: 1.', '**Color-code the text:** Give them a photocopy of a key passage (e.g., pages 14-16).', 'Have them highlight **explicit facts** in yellow (literal) and **implied meanings** in green (inferential) — physically.', '**Play "Evidence or Opinion?":** Read 5 student sentences aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
