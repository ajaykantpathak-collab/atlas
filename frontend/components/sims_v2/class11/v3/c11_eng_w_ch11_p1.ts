import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch11_p1: SimDef = {
    id: 'v3_c11_eng_w_ch11_p1',
    title: 'Coming (Poem) · Part 1/3',
    subtitle: 'Hear a thrush interrupt a suburb — and a poet who refuses to worship it.',
    classLevel: 11, subject: 'eng_w', topic: 'Coming (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch11'],
    nodeIds: ['c11_eng_w_cbse_11_001', 'c11_eng_w_cbse_11_002', 'c11_eng_w_cbse_11_003', 'c11_eng_w_cbse_11_004', 'c11_eng_w_cbse_11_005', 'c11_eng_w_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener catching spring arrive over brickwork', intro: 'A bare garden, an evening, one bird — and a grown man suddenly feeling like a child who walked in on something unexplained.', goal: 'Situate Larkin in The Movement and read the poem\'s shift from observation to inner recognition.' },
    discovery: {
        question: '\'Coming\' describes a thrush singing in a garden — so Larkin is a nature poet like Wordsworth, right?',
        options: ['No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb', 'Yes — any poem about a bird is Romantic', 'Yes — the garden makes it a nature poem by definition', 'No — Larkin only ever wrote about libraries'],
        answer: 'No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb',
        hook: 'Even the song is \'fresh-peeled\' — a kitchen verb, raw and domestic, not \'melodious\'; Larkin refuses the poetic word on purpose.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Coming\' (Woven Words, ch. 11) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the poem from houses at dusk to the thrush to a childhood memory, and explain the final simile of a child stumbling on \'adult reconciling.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Coming\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who was Philip Larkin and which literary movement is he most closely associated with in mid-20th century English poetry?', options: [
                { text: 'Philip Larkin (1922–1985) was an English poet and librarian born in Coventry, best known', outcome: 'Philip Larkin (1922–1985) was an English poet and librarian born in Coventry, best known as.' },
                { text: 'the Romantics or Confessional poets', outcome: 'Not quite — Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.', reveals: 'context-means-memorizing-larkin-s' },
                { text: '\'context\' means memorizing Larkin\'s birth/death dates and book titles', outcome: 'Not quite — Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.', reveals: 'context-means-memorizing-larkin-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Coming\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary narrative movement in the first stanza of "Coming"? Describe it in one sentence.', options: [
                { text: 'The first stanza presents a static visual observation: evening light bathing house', outcome: 'The first stanza presents a static visual observation: evening light bathing house fronts.' },
                { text: 'the bird sings', outcome: 'Not quite — Students often believe narrative structure only exists in prose stories with clear characters and.', reveals: 'narrative-structure-only-exists-in' },
                { text: 'the speaker remembers childhood', outcome: 'Not quite — Students often believe narrative structure only exists in prose stories with clear characters and.', reveals: 'narrative-structure-only-exists-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Coming\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting described in the first stanza of "Coming"?', options: [
                { text: 'The first stanza describes a suburban street on a lengthening early spring evening, where', outcome: 'The first stanza describes a suburban street on a lengthening early spring evening, where "Light.' },
                { text: 'Light, chill and yellow', outcome: 'Not quite — Students often treat setting and atmosphere as separate labels: "Setting = evening, garden.', reveals: 'students-often-treat-setting-and' },
                { text: 'serene Foreheads of houses', outcome: 'Not quite — Students often treat setting and atmosphere as separate labels: "Setting = evening, garden.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Coming\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist in the poem "Coming," and how does the poem establish their perspective in the first stanza?', options: [
                { text: 'The protagonist is the speaker/persona', outcome: 'The protagonist is the speaker/persona — an adult consciousness observing a spring evening.' },
                { text: 'Philip Larkin is the protagonist', outcome: 'Not quite — Students consistently confuse the *poet* (Philip Larkin, a 20th-century English librarian-poet.', reveals: 'students-consistently-confuse-the-poet' },
                { text: 'The thrush is the protagonist', outcome: 'Not quite — Students consistently confuse the *poet* (Philip Larkin, a 20th-century English librarian-poet.', reveals: 'students-consistently-confuse-the-poet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Coming\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Identify the two supporting characters in the poem "Coming" and state one human quality attributed to each.', options: [
                { text: 'The supporting characters are the thrush (given a "fresh-peeled voice" that "astonishes"', outcome: 'The supporting characters are the thrush (given a "fresh-peeled voice" that "astonishes" the.' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" must be human or speak dialogue; they miss that.', reveals: 'supporting-characters-must-be-human' },
                { text: '"supporting characters" must be human or speak dialogue', outcome: 'Not quite — Students often think "supporting characters" must be human or speak dialogue; they miss that.', reveals: 'supporting-characters-must-be-human' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Coming\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of Philip Larkin\'s poem "Coming"? State it in one sentence.', options: [
                { text: 'The primary theme is the sudden, unearned, and inexplicable arrival of joy (signaled by', outcome: 'The primary theme is the sudden, unearned, and inexplicable arrival of joy (signaled by spring).' },
                { text: 'The poem is about a bird announcing spring', outcome: 'Not quite — Students conflate the *bird\'s announcement* ("It will be spring soon") with the *poem\'s theme*.', reveals: 'students-conflate-the-bird-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry evening a senior performs Larkin\'s \'Coming\' and introduces it as \'a nature poem in the tradition of Wordsworth — spring arrives and the poet\'s soul is uplifted.\' You\'re asked to respond, and you know Larkin led The Movement, which rejected exactly that kind of romantic uplift.',
            decisions: [{ prompt: 'How should you frame what the poem is actually doing?', options: [
                { text: 'Correct the intro using context as a lens: Larkin and The Movement rejected romantic nature worship for clear, empirical verse about ordinary life. The thrush\'s song doesn\'t uplift — it \'astonishes the brickwork\', a small epiphany that triggers a private memory of \'adult reconciling\' and an unexplained happiness, not transcendence.', outcome: 'Context stops being trivia: knowing The Movement\'s anti-romantic stance is what lets you hear the poem\'s restrained, disenchanted register.' },
                { text: 'Let the intro stand — a bird announcing spring is a nature poem, and nature poems uplift the soul.', outcome: 'That\'s the exact reading Movement poetry was written against; it misses that nature here is a neutral backdrop for human psychology, not a spiritual force.', reveals: 'coming-is-romantic-nature-poem' },
                { text: 'Focus on Larkin\'s biography instead — the poem is really about his childhood in Coventry.', outcome: 'Biography is a lens, not the content: the poem uses a childhood memory but its point is the structural movement from boredom to sudden, inexplicable joy.', reveals: 'context-means-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'The bird announces spring; the speaker feels like a child who can\'t name the happiness — incomprehension is the point.',
            decisions: [{ prompt: 'What comes next? Coming (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coming (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_001', difficulty: 'standard',
          question: '\'Coming\' (Woven Words, ch. 11) — the context and background to this text: who.',
          hint: 'Review the distinction between Modernist difficulty (Eliot, Pound) and Movement.',
          misconception: 'Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.',
          parts: [
                { id: 'a', prompt: 'A student claims: \'Larkin is a nature poet like Wordsworth because "Coming" describes a thrush singing in a garden.\' Using your knowledge of The Movement\'s.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', '\'context\' means memorizing Larkin\'s birth/death dates and book titles'],
                  hint: 'Review the distinction between Modernist difficulty (Eliot, Pound) and Movement accessibility.',
                  misconception: 'Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.' }
          ],
            remediations: { 'context-means-memorizing-larkin-s': { steps: ['If a student reduces context to fact-recall: (1) Give them two identical \'Coming\' analysis paragraphs — one written.', 'Ask: \'Which explains the "fresh-peeled voice" better?', 'Why?\' (2) Have them rewrite a Romantic nature description (e.g., \'The joyful bird sings gloriously\') in Larkin\'s style.', '(3) Assign a micro-essay: \'How does knowing Larkin worked in a university library for 30 years change your reading.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.',
          parts: [
                { id: 'a', prompt: 'Critique the following interpretation: \'The phrase "fresh-peeled voice" in "Coming" is merely a vivid sensory image describing the bird\'s song.\' What does this.', answer: 'The interpretation overlooks the metaphor\'s violence and domesticity',
                  options: ['The interpretation overlooks the metaphor\'s violence and domesticity', '\'context\' means memorizing Larkin\'s birth/death dates and book titles'],
                  hint: 'Review the distinction between Modernist difficulty (Eliot, Pound) and Movement accessibility.',
                  misconception: 'Students often believe \'context\' means memorizing Larkin\'s birth/death dates and book titles.' }
          ],
            remediations: { 'context-means-memorizing-larkin-s': { steps: ['If a student reduces context to fact-recall: (1) Give them two identical \'Coming\' analysis paragraphs — one written.', 'Ask: \'Which explains the "fresh-peeled voice" better?', 'Why?\' (2) Have them rewrite a Romantic nature description (e.g., \'The joyful bird sings gloriously\') in Larkin\'s style.', '(3) Assign a micro-essay: \'How does knowing Larkin worked in a university library for 30 years change your reading.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Coming\' — what happens, in what order, and why the.',
          hint: 'If stuck, review c6_english_u1_006 (Narrative Poetry and Its Features) to recall how.',
          misconception: 'Students often believe narrative structure only exists in prose stories with clear characters and events.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Coming\'',
                  options: ['The plot/narrative arc of \'Coming\'', '\'Coming\' (Woven Words, ch', 'The setting of \'Coming\'', 'Character analysis in \'Coming\''],
                  hint: 'If stuck, review c6_english_u1_006 (Narrative Poetry and Its Features) to recall how poems like.',
                  misconception: 'Students often believe narrative structure only exists in prose stories with clear characters and events.' }
          ],
            remediations: { 'narrative-structure-only-exists-in': { steps: ['Have the student reread the poem three times, each time labeling what "happens" in each stanza (Stanza 1: camera pans.', 'Draw a simple storyboard: three boxes showing the visual/emotional shift.', 'Ask: "If this were a 30-second film, what would the camera do in each shot?" This forces recognition of narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_003', difficulty: 'standard',
          question: 'The setting of \'Coming\' — the place, time and atmosphere the text creates.',
          hint: 'Review "Imagery of Nature" (c8_engl_ch4_7) and practice listing sensory details with.',
          misconception: 'Students often treat setting and atmosphere as separate labels: "Setting = evening, garden.',
          parts: [
                { id: 'a', prompt: 'Compare the atmosphere of the first two stanzas (setting description) with the atmosphere of the final stanza (speaker\'s reflection).', answer: 'The first two stanzas establish a quiet, observant, detached atmosphere: "serene',
                  options: ['The first two stanzas establish a quiet, observant, detached atmosphere: "serene', 'both are happy', 'both are calm'],
                  hint: 'Review "Imagery of Nature" (c8_engl_ch4_7) and practice listing sensory details with their.',
                  misconception: 'Students often treat setting and atmosphere as separate labels: "Setting = evening, garden.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['Ask the student to list every sensory detail in the poem under two columns: Visual (light, yellow, serene foreheads.', 'Have them circle the adjectives modifying each noun (chill, yellow, serene, deep, bare, fresh-peeled, astonishing).', 'Guide them to trace the progression: visual stillness (stanza 1) → auditory intrusion (stanza 2) → internal feeling.', 'Ask: "Which single detail surprises you most?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis in \'Coming\' — the central figure(s), their traits, and how.',
          hint: 'Review "poet vs. persona" using Class 10 diary entry analysis (Anne Frank) where the.',
          misconception: 'Students consistently confuse the *poet* (Philip Larkin, a 20th-century English librarian-poet known for pessimism).',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist in the poem "Coming," and how does the poem establish their perspective in the first stanza?', answer: 'The protagonist is the speaker/persona',
                  options: ['The protagonist is the speaker/persona', 'Philip Larkin is the protagonist', 'The thrush is the protagonist'],
                  hint: 'Review "poet vs. persona" using Class 10 diary entry analysis (Anne Frank) where the diarist.',
                  misconception: 'Students consistently confuse the *poet* (Philip Larkin, a 20th-century English librarian-poet known for pessimism) with the *persona* (the.' },
                { id: 'b', prompt: 'Analyze the relationship between the thrush\'s "fresh-peeled voice" and the speaker\'s "unusual laughter." How does the bird\'s song function as both catalyst and.', answer: 'The thrush\'s song',
                  options: ['The thrush\'s song', 'bird = spring'],
                  hint: 'Review "poet vs. persona" using Class 10 diary entry analysis (Anne Frank) where the diarist.',
                  misconception: 'Students consistently confuse the *poet* (Philip Larkin, a 20th-century English librarian-poet known for pessimism) with the *persona* (the.' }
          ],
            remediations: { 'students-consistently-confuse-the-poet': { steps: ['Have the student read the poem aloud twice: first in a flat "Larkin voice" (world-weary), then in a voice of genuine.', 'Ask which reading makes the simile "Feel like a child" work.', 'Mask the poet\'s name and present the poem as "Anonymous, 1955." Ask: "Does the speaker sound like someone faking.', 'Return to the text: underline every word suggesting irony (none exist).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters in \'Coming\' — the secondary figures who move the story.',
          hint: 'Review c9_engl_ch1_004 (river as character) to see how nature is given voice and.',
          misconception: 'Students often think "supporting characters" must be human or speak dialogue; they miss that in poetry, personified.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Coming\'',
                  options: ['Supporting characters in \'Coming\'', '\'Coming\' (Woven Words, ch', 'The plot/narrative arc of \'Coming\'', 'The setting of \'Coming\''],
                  hint: 'Review c9_engl_ch1_004 (river as character) to see how nature is given voice and intention.',
                  misconception: 'Students often think "supporting characters" must be human or speak dialogue; they miss that in poetry, personified natural objects.' }
          ],
            remediations: { 'supporting-characters-must-be-human': { steps: ['Have the student list every verb and adjective attached to the thrush and the houses in a two-column table.', 'Ask: "Which of these words describe human actions or feelings?" 3.', 'Guide them to replace each with a human subject (e.g., "The thrush astonishes" → "The singer astonishes").', 'Have them write one sentence stating how each entity changes the speaker\'s mood, using the table as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of \'Coming\' — the central idea the whole text returns to.',
          hint: 'Return to Class 10 "Dust of Snow" (First Flight) and practice the "Topic vs.',
          misconception: 'Students conflate the *bird\'s announcement* ("It will be spring soon") with the *poem\'s theme*.',
          parts: [
                { id: 'a', prompt: 'Why does the speaker describe his childhood as "a forgotten boredom" rather than a time of happiness or trauma?', answer: '"Forgotten boredom" establishes a neutral, featureless baseline against',
                  options: ['"Forgotten boredom" establishes a neutral, featureless baseline against', 'He had a sad childhood'],
                  hint: 'Return to Class 10 "Dust of Snow" (First Flight) and practice the "Topic vs.',
                  misconception: 'Students conflate the *bird\'s announcement* ("It will be spring soon") with the *poem\'s theme*.' }
          ],
            remediations: { 'students-conflate-the-bird-s': { steps: ['Ask the student to underline every verb in the final stanza ("feel", "comes", "can understand", "starts to be happy").', 'Ask: "Who is the *subject* of these verbs?', 'Guide them to see the speaker is the grammatical and thematic center.', 'Have them rewrite the theme starting with "The poem shows how a person..." This shifts focus from plot to psychological.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
