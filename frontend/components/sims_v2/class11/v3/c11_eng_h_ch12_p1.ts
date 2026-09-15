import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch12_p1: SimDef = {
    id: 'v3_c11_eng_h_ch12_p1',
    title: 'Father to Father (Poem) · Part 1/3',
    subtitle: 'Read a generational silence as structure, not as a missing scene.',
    classLevel: 11, subject: 'eng_h', topic: 'Father to Father (Poem) · Part 1/3',
    chapters: ['c11_eng_h_ch12'],
    nodeIds: ['c11_eng_h_cbse_12_001', 'c11_eng_h_cbse_12_002', 'c11_eng_h_cbse_12_003', 'c11_eng_h_cbse_12_004', 'c11_eng_h_cbse_12_005', 'c11_eng_h_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic weighing a poem that ends without a handshake', intro: 'Same house, same blood, no words — a father watches his son become someone he can\'t reach.', goal: 'Analyse narrative structure in lyric poetry and defend the open denouement.' },
    discovery: {
        question: 'A classmate calls the ending \'weak\' — father and son never speak or reconcile on the page. Is a silent ending a failed one?',
        options: ['No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken', 'Yes — a story owes its readers explicit reconciliation', 'Yes — silence means nothing happened', 'No — but only because a sequel was planned'],
        answer: 'No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken',
        hook: 'Resolution of plot and resolution of tension aren\'t the same — a shared silence can close a poem better than dialogue.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to approach the poem "Father to Father" by Elizabeth Jennings, including the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Treat each stanza as a film scene, find where enjambment rushes the climax, and test whether biography explains the tight quatrains holding emotional chaos.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re sitting at dinner with your father and you both want to say something important, but the words won\'t come — you\'ve lived in the same house for.',
            decisions: [{ prompt: 'Who was Elizabeth Jennings and which literary group was she associated with in the 1950s?', options: [
                { text: 'Elizabeth Jennings (1926–2001) was a prominent English poet associated with The Movement,', outcome: 'Elizabeth Jennings (1926–2001) was a prominent English poet associated with The Movement, a group.' },
                { text: 'context', outcome: 'Not quite — Students assume "context" means memorising dates and names for exams, not a lens for reading.', reveals: 'context-means-memorising-dates-and' },
                { text: 'the Romantics, Modernists, or Beat poets', outcome: 'Not quite — Students assume "context" means memorising dates and names for exams, not a lens for reading.', reveals: 'context-means-memorising-dates-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a short film with no dialogue—only visual scenes separated by fade-to-black transitions. Each scene advances the story.',
            decisions: [{ prompt: 'Define "narrative arc" in the context of a narrative poem and name its five standard stages in order.', options: [
                { text: 'A narrative arc is the structural framework that shapes a poem\'s story progression', outcome: 'A narrative arc is the structural framework that shapes a poem\'s story progression through five.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students believe narrative structure in poetry is simply "what happens in order" (plot summary) and.', reveals: 'narrative-structure-in-poetry-is' },
                { text: 'what happens in order', outcome: 'Not quite — Students believe narrative structure in poetry is simply "what happens in order" (plot summary) and.', reveals: 'narrative-structure-in-poetry-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your grandfather\'s room at dusk: the air is thick with the smell of old books and medicine, the light is fading, and he sits silent in his.',
            decisions: [{ prompt: 'What is the primary physical setting described in the poem "Father to Father," and which specific sensory detail (sight, sound, or touch).', options: [
                { text: 'The primary physical setting is a quiet domestic interior, likely the father\'s room,', outcome: 'The primary physical setting is a quiet domestic interior, likely the father\'s room, during the.' },
                { text: 'a garden at noon', outcome: 'Not quite — Students often treat "setting" and "atmosphere" as interchangeable synonyms for "background." They.', reveals: 'students-often-treat-setting-and' },
                { text: 'Father to Father', outcome: 'Not quite — Students often treat "setting" and "atmosphere" as interchangeable synonyms for "background." They.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you overhear your father talking to himself late at night: "I don\'t understand my own child.',
            decisions: [{ prompt: 'What is the central conflict the protagonist (the father) articulates in the first stanza of "Father to Son"?', options: [
                { text: 'The father grieves that despite biological connection ("The seed I spent or sown it where', outcome: 'The father grieves that despite biological connection ("The seed I spent or sown it where / The.' },
                { text: 'The father is angry at his son\'s disobedience', outcome: 'Not quite — Students conflate the *speaker* with the *poet* (Elizabeth Jennings), assuming the father\'s grief.', reveals: 'students-conflate-the-speaker-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are trying to understand a friend who barely speaks during a conversation — you learn about them from what the other person says, the pauses, and.',
            decisions: [{ prompt: 'In the poem "Father to Son," the son never speaks directly. What is the primary textual source through which the reader learns about the.', options: [
                { text: 'The son\'s character is revealed exclusively through the father\'s first-person narration', outcome: 'The son\'s character is revealed exclusively through the father\'s first-person narration — his.' },
                { text: 'the son\'s actions described by a third-person narrator', outcome: 'Not quite — Students often treat the son as a flat, silent prop rather than a character whose *absence.', reveals: 'students-often-treat-the-son' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you overhear a father telling a friend, "My son lives in my house but I don\'t know him at all." That ache of strangers sharing a roof is the heartbeat.',
            decisions: [{ prompt: 'What is the primary theme of the poem "Father to Son" as revealed through the father\'s perspective in the opening stanza?', options: [
                { text: 'The primary theme is the painful emotional distance and lack of understanding between', outcome: 'The primary theme is the painful emotional distance and lack of understanding between father and.' },
                { text: 'the theme is about a father\'s love', outcome: 'Not quite — Students often conflate the *subject* (father-son relationship) with the *theme* (the specific.', reveals: 'students-often-conflate-the-subject' },
                { text: 'the theme is growing up', outcome: 'Not quite — Students often conflate the *subject* (father-son relationship) with the *theme* (the specific.', reveals: 'students-often-conflate-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a poetry-recitation contest you must defend your choice of Elizabeth Jennings\'s \'Father to Son\' against a judge who asks: \'Why did you pick something so plain and restrained? Great emotion deserves dramatic, free-flowing verse.\'',
            decisions: [{ prompt: 'What\'s the strongest defence of the poem\'s plainness?', options: [
                { text: 'The restraint IS the meaning: Jennings was a Movement poet — clarity, formal control, everyday subjects — and the regular quatrains mirror the father\'s emotional lockdown; a man who cannot reach his son speaks in controlled, measured lines. The gap between tidy form and aching content is the poem\'s engine, and context (Movement aesthetics) is what lets you see it.', outcome: 'Form mirrors feeling here: tight stanzas enact the very inarticulateness the poem grieves — dramatic free verse would contradict the subject.' },
                { text: 'Concede — plain form means plain feeling; pick a more passionate poem.', outcome: 'That misreads the aesthetic: the controlled surface contains more grief because it visibly cannot overflow — restraint is the signature, not the defect.', reveals: 'plain-form-plain-feeling' },
                { text: 'Recite it dramatically anyway — performance can add the emotion the text lacks.', outcome: 'Overplaying breaks the poem\'s logic: the father-and-son distance is felt through what\'s withheld; declaiming it erases the silence between them.', reveals: 'perform-the-missing-emotion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'Movement poets put chaos in controlled stanzas — the form is the father trying to hold himself together.',
            decisions: [{ prompt: 'What comes next? Father to Father (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Father to Father (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'Review Class 10 "Nelson Mandela" (c10_engl_cbse_02_001) for how apartheid context shapes.',
          misconception: 'Students assume "context" means memorising dates and names for exams, not a lens for reading.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what The Movement poets reacted against and what they valued in poetry.', answer: 'The Movement poets reacted against the obscurity, mythological allusions, and',
                  options: ['The Movement poets reacted against the obscurity, mythological allusions, and', 'context', '"context" means memorising dates and names for exams, not a lens for reading'],
                  hint: 'Review Class 10 "Nelson Mandela" (c10_engl_cbse_02_001) for how apartheid context shapes textual.',
                  misconception: 'Students assume "context" means memorising dates and names for exams, not a lens for reading.' }
          ],
            remediations: { 'context-means-memorising-dates-and': { steps: ['If a student cannot use context predictively: (1) Give them two unseen Movement poems and two confessional poems.', '(2) Have them rewrite a confessional-style family poem in Movement style (regular metre, restraint, irony) and discuss.', '(3) Return to "Father to Father" and annotate one stanza together, explicitly linking each formal choice (caesura.', 'This moves context from recall to analytical instrument.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students assume "context" means memorising dates and names for exams, not a lens for reading.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Knowing the poet\'s biography and literary movement is irrelevant; a poem should stand entirely on its own without external context.".', answer: 'Refute',
                  options: ['Refute', 'context', '"context" means memorising dates and names for exams, not a lens for reading'],
                  hint: 'Review Class 10 "Nelson Mandela" (c10_engl_cbse_02_001) for how apartheid context shapes textual.',
                  misconception: 'Students assume "context" means memorising dates and names for exams, not a lens for reading.' }
          ],
            remediations: { 'context-means-memorising-dates-and': { steps: ['If a student cannot use context predictively: (1) Give them two unseen Movement poems and two confessional poems.', '(2) Have them rewrite a confessional-style family poem in Movement style (regular metre, restraint, irony) and discuss.', '(3) Return to "Father to Father" and annotate one stanza together, explicitly linking each formal choice (caesura.', 'This moves context from recall to analytical instrument.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'If stuck, review "story vs. plot" distinction using the Class 10 "The Ball Poem".',
          misconception: 'Students believe narrative structure in poetry is simply "what happens in order" (plot summary) and that identifying.',
          parts: [
                { id: 'a', prompt: 'In "Father to Father," the first stanza establishes a quiet domestic scene.', answer: 'Exposition *is* plot—it establishes the "before" state against',
                  options: ['Exposition *is* plot—it establishes the "before" state against', 'what happens in order'],
                  hint: 'If stuck, review "story vs. plot" distinction using the Class 10 "The Ball Poem".',
                  misconception: 'Students believe narrative structure in poetry is simply "what happens in order" (plot summary) and that identifying the sequence of events.' }
          ],
            remediations: { 'narrative-structure-in-poetry-is': { steps: ['Give the student a 5-stanza narrative poem (unfamiliar) with stanza numbers removed.', 'Ask them to physically cut the stanzas apart and reorder them into the "most logical narrative sequence." 3.', 'Have them defend each placement using the terms exposition/rising action/climax/falling action/resolution.', 'Reveal the poet\'s actual order and discuss *why* the poet chose that specific sequence—what tension is gained/lost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment where the.',
          hint: 'If stuck, review the "sensory imagery" exercises from c9_engl_ch04_005 (The Tunnel.',
          misconception: 'Students often treat "setting" and "atmosphere" as interchangeable synonyms for "background." They write: "The setting.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the poem\'s atmosphere differs from its setting.', answer: 'Setting is the *where* and *when* (the room, the evening)',
                  options: ['Setting is the *where* and *when* (the room, the evening)', 'the chair is old', 'Father to Father', 'The setting is the father\'s sadness'],
                  hint: 'If stuck, review the "sensory imagery" exercises from c9_engl_ch04_005 (The Tunnel atmosphere) and.',
                  misconception: 'Students often treat "setting" and "atmosphere" as interchangeable synonyms for "background." They write: "The setting is sad" or "The.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['**Isolate the physical:** Have the student draw a quick sketch of the room described in the poem, labeling only nouns.', '**Label the feeling:** Next to each object, write the *emotion* it evokes (clock → anxiety/urgency; dim light → fading.', '**Define the terms aloud:** "Setting = the chair.', 'Atmosphere = the loneliness the chair represents." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the.',
          hint: 'Review c11_eng_h_cbse_12_002 (Plot) to re-establish the dramatic situation: who.',
          misconception: 'Students conflate the *speaker* with the *poet* (Elizabeth Jennings), assuming the father\'s grief is autobiographical.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the protagonist\'s use of agricultural imagery ("seed", "land", "sown") in stanza 1 reveals his self-perception as a father.', answer: 'The imagery frames fatherhood as a biological transaction',
                  options: ['The imagery frames fatherhood as a biological transaction', 'he planted crops'],
                  hint: 'Review c11_eng_h_cbse_12_002 (Plot) to re-establish the dramatic situation: who is speaking, where.',
                  misconception: 'Students conflate the *speaker* with the *poet* (Elizabeth Jennings), assuming the father\'s grief is autobiographical.' }
          ],
            remediations: { 'students-conflate-the-speaker-with': { steps: ['Re-read the poem *only* as the father\'s monologue — cover the title, pretend you don\'t know the poet\'s gender/name.', 'Highlight every "I" statement in one color, every "he/him" in another, every "we/our" in a third.', 'Write one sentence per stanza: "In this stanza, the father feels ___ because ___." 4.', 'Compare your stanza 1 and stanza 4 sentences — articulate the *exact* emotional distance travelled.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_005', difficulty: 'standard',
          question: 'Supporting character analysis in poetry involves examining a secondary figure.',
          hint: 'Review the "Character Analysis: Protagonist" node (c11_eng_h_cbse_12_004) and the "Before.',
          misconception: 'Students often treat the son as a flat, silent prop rather than a character whose *absence of voice* is a deliberate.',
          parts: [
                { id: 'a', prompt: 'The father says, "I do not understand this child / Though we have lived together now / In the same house for years." Explain in your own words what this.', answer: 'The lines reveal emotional estrangement despite physical proximity',
                  options: ['The lines reveal emotional estrangement despite physical proximity', 'living together'],
                  hint: 'Review the "Character Analysis: Protagonist" node (c11_eng_h_cbse_12_004) and the "Before You Read.',
                  misconception: 'Students often treat the son as a flat, silent prop rather than a character whose *absence of voice* is a deliberate, powerful.' }
          ],
            remediations: { 'students-often-treat-the-son': { steps: ['Ask the student to list every pronoun referring to the son ("he," "him," "his," "this child").', 'For each, note the verb: what is the son *doing* or *being*?', '(e.g., "he speaks," "he has his own world," "he is prodigal").', 'Have the student infer: if someone "has their own world," what trait does that show?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or insight about.',
          hint: 'Review c10_engl_cbse_17_007 (Theme: Education as Empowerment) — practice converting plot.',
          misconception: 'Students often conflate the *subject* (father-son relationship) with the *theme* (the specific nature of the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the father says "I do not understand this child" even though they have lived together for years.', answer: 'The father\'s statement reveals that physical proximity and shared history do not',
                  options: ['The father\'s statement reveals that physical proximity and shared history do not', 'the son is difficult', 'the father is neglectful'],
                  hint: 'Review c10_engl_cbse_17_007 (Theme: Education as Empowerment) — practice converting plot points.',
                  misconception: 'Students often conflate the *subject* (father-son relationship) with the *theme* (the specific nature of the disconnect: silence as.' },
                { id: 'b', prompt: 'The father describes the son as having "made his own world." Apply the concept of "world-making" to analyze how this phrase functions as evidence for the.', answer: 'The phrase "made his own world" signifies the son\'s psychological separation',
                  options: ['The phrase "made his own world" signifies the son\'s psychological separation', 'the son is independent', 'the son has friends'],
                  hint: 'Review c10_engl_cbse_17_007 (Theme: Education as Empowerment) — practice converting plot points.',
                  misconception: 'Students often conflate the *subject* (father-son relationship) with the *theme* (the specific nature of the disconnect: silence as.' }
          ],
            remediations: { 'students-often-conflate-the-subject': { steps: ['Have the student list every instance of "silence," "speak," "understand," "know," and "world" in the poem.', 'Who is *spoken about* but not *spoken to*?" 3.', 'Map the father\'s journey: observation → realization → direct address.', 'Co-construct a thematic statement using the template: "The poem shows that [specific human behaviour] leads.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
