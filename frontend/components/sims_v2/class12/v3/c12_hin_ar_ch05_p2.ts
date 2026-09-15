import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p2',
    title: 'lw;Zdkar f=ikBh ^fujkyk · Part 2/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'lw;Zdkar f=ikBh ^fujkyk · Part 2/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_007', 'c12_hin_ar_cbse_05_008', 'c12_hin_ar_cbse_05_009', 'c12_hin_ar_cbse_05_010', 'c12_hin_ar_cbse_05_011', 'c12_hin_ar_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, or underlying concerns that run parallel to the primary theme in a literary work, enriching its texture and offering multiple layers of meaning;.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are standing in a vast cornfield at harvest time — the dry stalks rustling, the wind carrying the scent of earth, the farmer\'s sickle flashing.',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes a secondary theme from the primary theme in a poem?', options: [
                { text: 'A secondary theme supports, complicates, or runs parallel to the primary theme without', outcome: 'A secondary theme supports, complicates, or runs parallel to the primary theme without being the.' },
                { text: 'minor topics', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" that can be listed like items (e.g., "1.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'less important ideas', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" that can be listed like items (e.g., "1.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you wake up on a December morning in Delhi: the air bites your fingers (touch), the world is a white blur (sight), a caw breaks the silence (sound).',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words. Give one example of each from daily life (not from the poem).', options: [
                { text: '**Correct answer**: Imagery = language appealing to senses (e.g., "The sizzling *pakora*', outcome: '**Correct answer**: Imagery = language appealing to senses (e.g., "The sizzling *pakora* batter hit.' },
                { text: 'exam is *like* a mountain', outcome: 'Not quite — **"Imagery = only visual description."** Students underline "jk[k", "fly", "jax" and stop.', reveals: 'imagery-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are standing on a Delhi terrace at 7 a.m. in January: the fog is so thick you can\'t see the next building, your breath freezes, and the sun is just.',
            decisions: [{ prompt: 'Define \'irony\' (व्यंग्य/विडंबना) and \'symbolism\' (प्रतीकवाद) in your own words, giving one example from daily life (not from the poem) for.', options: [
                { text: '**Correct answer:** Irony', outcome: '**Correct answer:** Irony — a situation where the outcome is opposite to what was expected (e.g.,.' },
                { text: 'it rained on my wedding day', outcome: 'Not quite — **Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor.', reveals: 'misconception-irony-and-symbolism-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you hear a street vendor in Varanasi calling out "मक्का भून रहा हूँ, भुट्टा ले लो!" — the word "मक्का" instantly conjures smell, sound, winter.',
            decisions: [{ prompt: 'What is the primary difference between the denotative meaning of "मक्का" (corn/maize) and its function in the opening line of Kedarnath.', options: [
                { text: 'The denotative meaning refers to the grain crop (maize), but in the poem\'s opening, "क\'अ"', outcome: 'The denotative meaning refers to the grain crop (maize), but in the poem\'s opening, "क\'अ" (ka-a).' },
                { text: 'only as', outcome: 'Not quite — Students believe "vocabulary in context" means "find the dictionary meaning of difficult words.', reveals: 'vocabulary-in-context-means-find' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "find the dictionary meaning of difficult words.', reveals: 'vocabulary-in-context-means-find' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the poem "m"kk" aloud and you stumble over the line "jk[k ls yhik gqvk pkSdk" — the word order feels unusual, almost like a painting.',
            decisions: [{ prompt: 'In the opening stanza of "m"kk", the poet writes "jk[k ls yhik gqvk pkSdk (vHkh xhyk iM+k gS)".', options: [
                { text: '**Correct Answer:** The verb phrase "yhik gqvk" is in **past perfect passive** (bhutakal', outcome: '**Correct Answer:** The verb phrase "yhik gqvk" is in **past perfect passive** (bhutakal.' },
                { text: 'simple past', outcome: 'Not quite — **Misconception:** "Grammar in poetry is just about identifying parts of speech (kriya, sarvanam.', reveals: 'misconception-grammar-in-poetry-is' },
                { text: 'present perfect', outcome: 'Not quite — **Misconception:** "Grammar in poetry is just about identifying parts of speech (kriya, sarvanam.', reveals: 'misconception-grammar-in-poetry-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see Question 1: "कवि ने साँझ को दुल्हन क्यों कहा है?" and Question 2: "साँझ के समय आसमान का रंग कैसा है?" The.',
            decisions: [{ prompt: 'Define the difference between a literal comprehension question and an inferential comprehension question in one sentence each.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What color is', outcome: 'A literal question asks for information directly stated in the text (e.g., "What color is the.' },
                { text: 'Inferential questions have no right answer', outcome: 'Not quite — **Misconception:** "Inferential questions have no right answer — you can write whatever you feel.".', reveals: 'misconception-inferential-questions-have-no' },
                { text: 'swaps the definitions reveals the student cannot distinguish explicit vs', outcome: 'Not quite — **Misconception:** "Inferential questions have no right answer — you can write whatever you feel.".', reveals: 'misconception-inferential-questions-have-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'What comes next? lw;Zdkar f=ikBh ^fujkyk · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — lw;Zdkar f=ikBh ^fujkyk · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, or underlying concerns that.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_05_006 (Primary Theme) and create a stanza-map: for.',
          misconception: 'Students often treat secondary themes as "sub-topics" that can be listed like items (e.g., "1. Nature 2. Labor 3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas, motifs, or underlying concerns that run',
                  options: ['Secondary themes are the supporting ideas, motifs, or underlying concerns that run', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_05_006 (Primary Theme) and create a stanza-map: for each stanza.',
                  misconception: 'Students often treat secondary themes as "sub-topics" that can be listed like items (e.g., "1. Nature 2. Labor 3.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of analyzing thematic function: Step 1 — Have them re-read the poem and underline.', 'Step 2 — Ask: "What does this motif *do* each time it appears?', 'Does it connect two things?" Step 3 — Guide them to write a "theme statement" in the format: "[Motif] functions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If the student cannot distinguish tenor from vehicle, or misses non-visual imagery.',
          misconception: '**"Imagery = only visual description."** Students underline "jk[k", "fly", "jax" and stop.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If the student cannot distinguish tenor from vehicle, or misses non-visual imagery, immediately.',
                  misconception: '**"Imagery = only visual description."** Students underline "jk[k", "fly", "jax" and stop.' }
          ],
            remediations: { 'imagery-only-visual-description': { steps: ['**Revisit definitions**: Use node c11_hin_ar_cbse_05_008 (Class 11 Imagery & Metaphor) — re-read the "Types of Imagery".', '**Sensory walk**: Take the student outside (or to a window) for 3 minutes.', 'Ask them to write one sentence per sense: what they see, hear, smell, touch, feel inside (heartbeat, hunger).', '**Metaphor surgery**: Give three similes ("The classroom is *like* a furnace").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning.',
          hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008.',
          misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both.".',
          parts: [
                { id: 'a', prompt: 'Define \'irony\' (व्यंग्य/विडंबना) and \'symbolism\' (प्रतीकवाद) in your own words, giving one example from daily life (not from the poem) for each.', answer: '**Correct answer:** Irony',
                  options: ['**Correct answer:** Irony', 'it rained on my wedding day'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'In "मेघ", the sun is called "लाल गेंद" (red ball) in stanza 2. Explain why this description is **both** symbolic **and** ironic.', answer: '**Correct answer:** Symbolic',
                  options: ['**Correct answer:** Symbolic', 'it represents hope'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'Apply the concept: In the line "धुंध की चादर / जैसे किसी ने खींच ली हो" (the fog-sheet as if someone pulled it away), identify the symbol and explain the irony.', answer: '**Correct answer:** Symbol',
                  options: ['**Correct answer:** Symbol', 'like a sheet'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-irony-and-symbolism-are': { steps: ['**Revisit node c11_hin_ar_cbse_05_009** (Class 11 Irony & Symbolism) — re-read the definitions and the worked example.', '**Do a micro-drill:** Take any newspaper headline (e.g., "Traffic Police Chief Fined for Speeding").', 'Identify: (a) the expectation, (b) the reality, (c) the irony.', 'Then pick an object in the room (e.g., a cracked cup) and write one sentence making it a symbol of "resilience".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010.',
          misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these.',
          parts: [
                { id: 'a', prompt: 'In the line "पसई लिस्व पड आँखिन ल्यस पडक डकफेक उन्य त्य", the word "लिस्व" (lisva) is a dialect form.', answer: '"लिस्व" carries the tactile, oral texture of Awadhi/Bhojpuri speech',
                  options: ['"लिस्व" carries the tactile, oral texture of Awadhi/Bhojpuri speech', 'vocabulary in context', 'find the dictionary meaning of difficult words in the poem'],
                  hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010 (Nirala\'s.',
                  misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these poems, the *most.' },
                { id: 'b', prompt: 'The poem "हक्का बक्सा" uses the invented compound "हक्का-बक्सा" (Hakka-Baksa).', answer: '"हक्का-बक्सा" leans toward *chaos* with an undercurrent of absurd laughter',
                  options: ['"हक्का-बक्सा" leans toward *chaos* with an undercurrent of absurd laughter', 'it sounds like laughing', 'vocabulary in context', 'find the dictionary meaning of difficult words in the poem'],
                  hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010 (Nirala\'s.',
                  misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these poems, the *most.' },
                { id: 'c', prompt: 'Compare how "फगुन" (Phalgun) in "मक्का" and "चरह" (charah) in "हक्का बक्सा" function as temporal markers.', answer: '"फगुन" in "मक्का" *expands* the moment',
                  options: ['"फगुन" in "मक्का" *expands* the moment', 'time words', 'vocabulary in context', 'find the dictionary meaning of difficult words in the poem'],
                  hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010 (Nirala\'s.',
                  misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these poems, the *most.' }
          ],
            remediations: { 'vocabulary-in-context-means-find': { steps: ['**Re-read both poems aloud** — slowly, exaggerating every consonant cluster (क्क्, फ्क्, ड्फ़).', 'Listen for which sounds feel "oily", "crackling", "choking", "expansive".', '**Revisit node c11_hin_ar_cbse_05_010** (Class 11 Vocabulary in Context) — specifically the section on *sound symbolism.', 'Re-do the "phonestheme mapping" exercise there with 5 words from "मक्का".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The words in \'हक्का बक्सा\' are meaningless nonsense — they don\'t have definitions, so vocabulary analysis is impossible." Evaluate this.', answer: 'The claim is false',
                  options: ['The claim is false', 'vocabulary', 'dictionary entries', 'vocabulary in context'],
                  hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010 (Nirala\'s.',
                  misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these poems, the *most.' },
                { id: 'b', prompt: 'Create a 4-line "sound-poem" using only 5 words from "मक्का" (repeated, fragmented, reordered) that evokes the *smell of roasting corn* without naming it.', answer: '**Poem:** उह्यक क\'अ क\'अ',
                  options: ['**Poem:** उह्यक क\'अ क\'अ', 'vocabulary in context', 'find the dictionary meaning of difficult words in the poem'],
                  hint: 'If stuck on phonesthemes: review the "sound symbolism" exercise in c11_hin_ar_cbse_08_010 (Nirala\'s.',
                  misconception: 'Students believe "vocabulary in context" means "find the dictionary meaning of difficult words in the poem." In these poems, the *most.' }
          ],
            remediations: { 'vocabulary-in-context-means-find': { steps: ['**Re-read both poems aloud** — slowly, exaggerating every consonant cluster (क्क्, फ्क्, ड्फ़).', 'Listen for which sounds feel "oily", "crackling", "choking", "expansive".', '**Revisit node c11_hin_ar_cbse_05_010** (Class 11 Vocabulary in Context) — specifically the section on *sound symbolism.', 'Re-do the "phonestheme mapping" exercise there with 5 words from "मक्का".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_011', difficulty: 'standard',
          question: 'Language usage in the text refers to the deliberate grammatical structures.',
          hint: 'If stuck, revisit **c11_hin_ar_cbse_05_011** (Class 11 Grammar node) and practice.',
          misconception: '**Misconception:** "Grammar in poetry is just about identifying parts of speech (kriya, sarvanam, visheshan) — if I can.',
          parts: [
                { id: 'a', prompt: '**ANALYZE:** Compare the use of the present participle (vartaman kriya visheshan) in these two lines from the referenced poems: (a) "tknw VwVrk gS bl m"kk.', answer: '**Correct Answer:** In (a) "gks jgk gS" (is becoming)',
                  options: ['**Correct Answer:** In (a) "gks jgk gS" (is becoming)', 'vartaman kal'],
                  hint: 'If stuck, revisit **c11_hin_ar_cbse_05_011** (Class 11 Grammar node) and practice identifying.',
                  misconception: '**Misconception:** "Grammar in poetry is just about identifying parts of speech (kriya, sarvanam, visheshan) — if I can label them, I\'ve.' }
          ],
            remediations: { 'misconception-grammar-in-poetry-is': { steps: ['** Give them a single line (e.g., "jk[k ls yhik gqvk pkSdk"). Ask: "Draw what you see *before* the verb, *during* the.', '** Have them rewrite the line in 3 ways: (a) standard prose, (b) future tense, (c) active voice.', '** Assign a **micro-writing task**: "Describe your classroom at this moment using ONLY present participles and no main.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'If stuck on classification, return to Imagery node (c12_hin_ar_cbse_05_008) and list.',
          misconception: '**Misconception:** "Inferential questions have no right answer — you can write whatever you feel." **Why it happens:**.',
          parts: [
                { id: 'a', prompt: 'Read this line from the poem: "लाल-लाल बादल / अग्नि-सी दमकते". A student frames a question: "बादल किस रंग के हैं?" Is this literal or inferential?', answer: 'It is a **literal** question',
                  options: ['It is a **literal** question', 'अग्नि-सी', 'Inferential questions have no right answer'],
                  hint: 'If stuck on classification, return to Imagery node (c12_hin_ar_cbse_05_008) and list every concrete.',
                  misconception: '**Misconception:** "Inferential questions have no right answer — you can write whatever you feel." **Why it happens:** Students confuse.' },
                { id: 'b', prompt: 'Answer this literal question from the poem using the 3-step protocol (Classify → Evidence-hunt → Structure): "कवि ने साँझ का वर्णन करते हुए किन दो रंगों का.', answer: '**Step 1 Classify:** Literal',
                  options: ['**Step 1 Classify:** Literal', 'लाल और पीला', 'reading too fast', 'Inferential questions have no right answer'],
                  hint: 'If stuck on classification, return to Imagery node (c12_hin_ar_cbse_05_008) and list every concrete.',
                  misconception: '**Misconception:** "Inferential questions have no right answer — you can write whatever you feel." **Why it happens:** Students confuse.' },
                { id: 'c', prompt: 'Analyze the following inferential question: "‘मक्क’ कविता में साँझ को दुल्हन के रूप में प्रस्तुत करने का क्या अभिप्राय है?" Break down the inference chain.', answer: '**Evidence 1:** "लाल-लाल बादल" → bride\'s red bridal veil/lehenga',
                  options: ['**Evidence 1:** "लाल-लाल बादल" → bride\'s red bridal veil/lehenga', 'because it looks beautiful', 'चिता की लकड़ी', 'Inferential questions have no right answer'],
                  hint: 'If stuck on classification, return to Imagery node (c12_hin_ar_cbse_05_008) and list every concrete.',
                  misconception: '**Misconception:** "Inferential questions have no right answer — you can write whatever you feel." **Why it happens:** Students confuse.' }
          ],
            remediations: { 'misconception-inferential-questions-have-no': { steps: ['**Revisit evidence-hunting:** Take the poem\'s vH;kl (exercise) questions 1–3.', 'Highlight every word/phrase that *directly answers* Q1 (literal) vs.', 'the *clues* you must combine for Q2 (inferential).', '**Build inference chains:** For each inferential question, draw a 3-column table: **Textual Clue** |.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
