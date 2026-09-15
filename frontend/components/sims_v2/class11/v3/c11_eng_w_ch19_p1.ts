import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch19_p1: SimDef = {
    id: 'v3_c11_eng_w_ch19_p1',
    title: 'Ode to a Nightingale (Poem) · Part 1/3',
    subtitle: 'Follow a mind into the bird\'s timelessness and the violent fall back.',
    classLevel: 11, subject: 'eng_w', topic: 'Ode to a Nightingale (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch19'],
    nodeIds: ['c11_eng_w_cbse_19_001', 'c11_eng_w_cbse_19_002', 'c11_eng_w_cbse_19_003', 'c11_eng_w_cbse_19_004', 'c11_eng_w_cbse_19_005', 'c11_eng_w_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener half-seduced by an immortal song', intro: 'A 24-year-old who has watched his brother die sits in a garden at night — and a bird sings as if hunger had never existed.', goal: 'Distinguish the speaker\'s mortality from the song\'s immortality and evaluate the ambiguous ending.' },
    discovery: {
        question: 'With \'Lethe,\' \'fade away\' and \'rich to die\' everywhere, many read the nightingale as a symbol of death. What does the bird actually carry?',
        options: ['Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades', 'Death — the poem\'s whole drift is the wish to die', 'The poet\'s dying brother, straightforwardly', 'A hallucination with no symbolic weight'],
        answer: 'Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades',
        hook: 'The death-wish is the speaker\'s, not the bird\'s — the poem\'s engine is the gap between a mortal who aches and a song that outlives him.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to interpret John Keats\'s "Ode to a Nightingale." It covers the Romantic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_19_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Label each of the eight stanzas by mental state — numbness to escape to ecstasy to ejection — then decide whether \'Do I wake or sleep?\' fails or finishes the arc.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you hear a bird singing outside your window at night—its song feels timeless, making your own worries seem small.',
            decisions: [{ prompt: 'Define the term "ode" as a poetic form and name the two main types (Pindaric and Horatian).', options: [
                { text: 'An ode is a lyric poem of elevated style, formally addressing a subject', outcome: 'An ode is a lyric poem of elevated style, formally addressing a subject.' },
                { text: 'fade away', outcome: 'Not quite — Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe".', reveals: 'the-nightingale-represents-death-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you put on noise-cancelling headphones and a song transports you completely — you forget your homework, the noise outside, even time — but when the.',
            decisions: [{ prompt: 'What is the primary structural difference between a narrative poem (like "The Rime of the Ancient Mariner") and a lyric ode (like "Ode to.', options: [
                { text: 'A narrative poem follows an external sequence of events with characters, setting, and a', outcome: 'A narrative poem follows an external sequence of events with characters, setting, and.' },
                { text: 'both tell a story', outcome: 'Not quite — Students treat the poem as a sequence of *descriptions* (forest, wine, bird, Ruth, fairy lands).', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting in a dense Indian garden at twilight, hearing a koel\'s call, and suddenly your own worries feel distant—then a mosquito bites, and.',
            decisions: [{ prompt: 'What is the specific physical location of the nightingale described in the first stanza, and which two nouns establish its visual.', options: [
                { text: 'The nightingale sings in a "melodious plot / Of beechen green, and shadows numberless."', outcome: 'The nightingale sings in a "melodious plot / Of beechen green, and shadows numberless." The nouns.' },
                { text: 'a forest', outcome: 'Not quite — Students treat "setting" as a static backdrop (e.g., "the poem is set in a forest") and.', reveals: 'students-treat-setting-as-a' },
                { text: 'a tree', outcome: 'Not quite — Students treat "setting" as a static backdrop (e.g., "the poem is set in a forest") and.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re listening to a friend describe a vivid dream where they tried to escape their problems by flying away with a bird—only to wake up unsure if.',
            decisions: [{ prompt: 'What is the poetic term for a lyric poem in which the speaker directly addresses an absent or non-human entity (like a nightingale) as.', options: [
                { text: 'The term is **apostrophe**', outcome: 'The term is **apostrophe**. A wrong answer (e.g., "personification" or "address") reveals the.' },
                { text: 'personification', outcome: 'Not quite — Students conflate the *speaker/persona* with *John Keats the historical person*, assuming every "I".', reveals: 'students-conflate-the-speaker-persona' },
                { text: 'address', outcome: 'Not quite — Students conflate the *speaker/persona* with *John Keats the historical person*, assuming every "I".', reveals: 'students-conflate-the-speaker-persona' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are sitting in a noisy classroom before an exam, feeling overwhelmed, and suddenly you hear a beautiful flute melody from the music room — for.',
            decisions: [{ prompt: 'What is the definition of a primary theme in poetry, and how does it differ from a subject or topic?', options: [
                { text: 'A primary theme is the central insight about life or human nature that the poem', outcome: 'A primary theme is the central insight about life or human nature that the poem communicates.' },
                { text: 'The theme is the nightingale', outcome: 'Not quite — Students often believe the poem celebrates the nightingale\'s immortality as a triumph, missing that.', reveals: 'the-poem-celebrates-the-nightingale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature circle, a friend presents \'Ode to a Nightingale\' as \'Keats\'s death poem — the bird is the afterlife calling him, and he wants to die.\' Others nod along. You\'re asked for your reading.',
            decisions: [{ prompt: 'What\'s the nightingale, and what is the poem\'s real arc?', options: [
                { text: 'Separate the speaker\'s longing from the bird\'s meaning: the nightingale is undying art — \'No hungry generations tread thee down\' — a song heard by emperors and Ruth alike. The speaker\'s \'rich to die\' is a death-wish the poem tests and rejects; the real plot is psychological: his mind escapes into the bird\'s world across the stanzas and is violently ejected back by \'forlorn\'.', outcome: 'Context does its work — a 24-year-old nursing a dying brother worshipping beauty as truth — and the ode reads as a journey into imagination and back, not a suicide note.' },
                { text: 'Support the friend\'s reading — \'Lethe\', \'fade away\', and \'rich to die\' all point to death, so the bird is death\'s messenger.', outcome: 'That conflates the speaker\'s mood with the symbol: the bird is precisely what does NOT die — living immortality through song, contrasted with mortal longing.', reveals: 'nightingale-means-death' },
                { text: 'Read it as a nature description — Keats catalogues the forest, wine, flowers, and Ruth as beautiful images.', outcome: 'The stanzas are decisions, not descriptions: \'I cannot see what flowers are at my feet\' is the speaker deliberately constructing a darkness he prefers over painful reality.', reveals: 'ode-is-nature-catalogue' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'The song flees and the ache returns — but the speaker has been somewhere, and the unanswered question is the souvenir.',
            decisions: [{ prompt: 'What comes next? Ode to a Nightingale (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ode to a Nightingale (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'Review Class 9–10 poetry nodes on form and devices: c7_engl_ch01_012 (rhyme scheme).',
          misconception: 'Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe" and "fade away".',
          parts: [
                { id: 'a', prompt: 'Define the term "ode" as a poetic form and name the two main types (Pindaric and Horatian). Which type does Keats use in "Ode to a Nightingale"?', answer: 'An ode is a lyric poem of elevated style, formally addressing a subject',
                  options: ['An ode is a lyric poem of elevated style, formally addressing a subject', 'fade away'],
                  hint: 'Review Class 9–10 poetry nodes on form and devices: c7_engl_ch01_012 (rhyme scheme).',
                  misconception: 'Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe" and "fade away" imagery.' },
                { id: 'b', prompt: 'Analyze how the background information about Keats\'s nursing of his brother Tom (who died of tuberculosis in 1818) and his own failing health shapes the.', answer: 'Keats witnessed prolonged, wasting death firsthand',
                  options: ['Keats witnessed prolonged, wasting death firsthand', 'fade away'],
                  hint: 'Review Class 9–10 poetry nodes on form and devices: c7_engl_ch01_012 (rhyme scheme).',
                  misconception: 'Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe" and "fade away" imagery.' }
          ],
            remediations: { 'the-nightingale-represents-death-or': { steps: ['Re-read the "About the Poet" section in the textbook and list three biographical facts that directly echo in stanza 3.', 'Create a two-column table: left column = classical allusion (Lethe, Dryad, Hippocrene, Ruth), right column = what the.', 'Watch a 5-minute video on "Romanticism vs.', 'Enlightenment" (e.g., from NCERT\'s official channel) and note one way Keats rejects Enlightenment rationality in this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe" and "fade away".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The nightingale\'s immortality in the poem (\'Thou wast not born for death, immortal Bird!\') is a romantic illusion that the poet ultimately.', answer: 'The claim is partially true but reductive',
                  options: ['The claim is partially true but reductive', 'rejection', 'fade away'],
                  hint: 'Review Class 9–10 poetry nodes on form and devices: c7_engl_ch01_012 (rhyme scheme).',
                  misconception: 'Students often believe the nightingale represents *death* or *the afterlife* because of the "Lethe" and "fade away" imagery.' }
          ],
            remediations: { 'the-nightingale-represents-death-or': { steps: ['Re-read the "About the Poet" section in the textbook and list three biographical facts that directly echo in stanza 3.', 'Create a two-column table: left column = classical allusion (Lethe, Dryad, Hippocrene, Ruth), right column = what the.', 'Watch a 5-minute video on "Romanticism vs.', 'Enlightenment" (e.g., from NCERT\'s official channel) and note one way Keats rejects Enlightenment rationality in this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_002', difficulty: 'standard',
          question: 'Narrative structure in a lyric poem like "Ode to a Nightingale" refers to the.',
          hint: 'Review the difference between narrative and lyric poetry using the "King Bruce" poem.',
          misconception: 'Students treat the poem as a sequence of *descriptions* (forest, wine, bird, Ruth, fairy lands) rather than a sequence.',
          parts: [
                { id: 'a', prompt: 'Compare the structural role of the bird\'s song in Stanza 1 ("Singest of summer in full-throated ease") with its role in Stanza 7 ("The voice I hear this.', answer: 'In Stanza 1, the song is a *catalyst*',
                  options: ['In Stanza 1, the song is a *catalyst*', 'beautiful description'],
                  hint: 'Review the difference between narrative and lyric poetry using the "King Bruce" poem.',
                  misconception: 'Students treat the poem as a sequence of *descriptions* (forest, wine, bird, Ruth, fairy lands) rather than a sequence of *decisions*.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student reread only the first and last lines of each stanza aloud, ignoring the middle.', 'Ask: "What *verb* shows the speaker\'s agency in each stanza?" (e.g., Stanza 2: "drink, and leave"; Stanza 4: "I will.', 'Plot these verbs on a timeline: they reveal the narrative engine.', 'Finally, ask the student to retell the poem as "A person who feels X, decides Y, tries Z, fails because W, and ends.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_003', difficulty: 'standard',
          question: 'In poetry, **setting** refers to the time, place, and physical environment.',
          hint: 'Review "Imagery and Sensory Details" from Class 8 (c8_engl_ch4_7) or Class 7.',
          misconception: 'Students treat "setting" as a static backdrop (e.g., "the poem is set in a forest") and "atmosphere" as a single label.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In poetry, **setting** refers to the time, place, and physical environment where the',
                  options: ['In poetry, **setting** refers to the time, place, and physical environment where the', '"Before You Read: Context and Background" provides the essential historical,', 'Narrative structure in a lyric poem like "Ode to a Nightingale" refers to the organized', 'Character analysis of the protagonist in a lyric poem involves examining the speaker\'s'],
                  hint: 'Review "Imagery and Sensory Details" from Class 8 (c8_engl_ch4_7) or Class 7 (c7_engl_ch03_014).',
                  misconception: 'Students treat "setting" as a static backdrop (e.g., "the poem is set in a forest") and "atmosphere" as a single label ("it\'s sad").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['**Map the Journey**: Have the student draw a 6-box flowchart on paper.', 'Box 1: "Poet\'s Chair" (Stanza 1).', 'Box 2: "Bird\'s Grove" (Stanza 1).', 'Box 3: "Wine Forest" (Stanzas 2–3).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a lyric poem involves examining the.',
          hint: 'If stuck: review c10_engl_cbse_04_002 (Anne\'s diary as constructed voice) and.',
          misconception: 'Students conflate the *speaker/persona* with *John Keats the historical person*, assuming every "I" is autobiographical.',
          parts: [
                { id: 'a', prompt: 'What is the poetic term for a lyric poem in which the speaker directly addresses an absent or non-human entity (like a nightingale) as if it were present and.', answer: 'The term is **apostrophe**',
                  options: ['The term is **apostrophe**', 'personification', 'address'],
                  hint: 'If stuck: review c10_engl_cbse_04_002 (Anne\'s diary as constructed voice) and c11_eng_w_cbse_19_001.',
                  misconception: 'Students conflate the *speaker/persona* with *John Keats the historical person*, assuming every "I" is autobiographical confession (e.g.' }
          ],
            remediations: { 'students-conflate-the-speaker-persona': { steps: ['Have the student list every "I" statement in the poem (14+ instances) and classify each: physical sensation, desire.', 'Ask: "If this were Keats\'s diary, why would he use \'Dryad,\' \'Hippocrene,\' \'Ruth,\' \'faery lands\'?" —highlighting the.', 'Compare with a genuinely autobiographical poem (e.g., "When I Have Fears") to distinguish persona from person.', 'Re-read stanza 8: the speaker *questions* his state—autobiography rarely ends with epistemological uncertainty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_005', difficulty: 'standard',
          question: 'In a lyric poem like "Ode to a Nightingale," supporting characters are not.',
          hint: 'Review the "Character Analysis: Protagonist" node (c11_eng_w_cbse_19_004) focusing on the.',
          misconception: 'Students treat the Nightingale as a *character* with feelings who "comforts" the poet, and they treat.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a lyric poem like "Ode to a Nightingale," supporting characters are not narrative',
                  options: ['In a lyric poem like "Ode to a Nightingale," supporting characters are not narrative', '"Before You Read: Context and Background" provides the essential historical,', 'Narrative structure in a lyric poem like "Ode to a Nightingale" refers to the organized', 'In poetry, **setting** refers to the time, place, and physical environment where the'],
                  hint: 'Review the "Character Analysis: Protagonist" node (c11_eng_w_cbse_19_004) focusing on the poet\'s.',
                  misconception: 'Students treat the Nightingale as a *character* with feelings who "comforts" the poet, and they treat Ruth/Emperor/Clown as *historical.' }
          ],
            remediations: { 'students-treat-the-nightingale-as': { steps: ['Have the student re-read stanzas 1, 3, 7, 8 with a single question: "What does this figure *represent* to the poet.', 'Create a two-column table: Column A = Figure (Nightingale, Ruth, Fancy, etc.), Column B = What the poet *wants* this.', 'Force the distinction: "The bird is a symbol the poet *uses*; it is not a friend who *helps*." 4.', 'Practice writing one sentence per figure using the template: "The poet invokes [Figure] to represent [Abstract Idea].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that emerges from the.',
          hint: 'If stuck, review c11_eng_w_cbse_19_002 (narrative structure) to map the speaker\'s.',
          misconception: 'Students often believe the poem celebrates the nightingale\'s immortality as a triumph, missing that the speaker\'s final.',
          parts: [
                { id: 'a', prompt: 'What is the definition of a primary theme in poetry, and how does it differ from a subject or topic?', answer: 'A primary theme is the central insight about life or human nature that the poem',
                  options: ['A primary theme is the central insight about life or human nature that the poem', 'The theme is the nightingale'],
                  hint: 'If stuck, review c11_eng_w_cbse_19_002 (narrative structure) to map the speaker\'s journey, and.',
                  misconception: 'Students often believe the poem celebrates the nightingale\'s immortality as a triumph, missing that the speaker\'s final state is one.' },
                { id: 'b', prompt: 'The speaker tries three distinct methods of escape in the poem: wine (stanza 2), "viewless wings of Poesy" (stanza 4), and "easeful Death" (stanza 6).', answer: 'Wine fails because its effect is physical and temporary',
                  options: ['Wine fails because its effect is physical and temporary', 'the dull brain perplexes and retards', 'leave the world unseen', 'forest dim'],
                  hint: 'If stuck, review c11_eng_w_cbse_19_002 (narrative structure) to map the speaker\'s journey, and.',
                  misconception: 'Students often believe the poem celebrates the nightingale\'s immortality as a triumph, missing that the speaker\'s final state is one.' }
          ],
            remediations: { 'the-poem-celebrates-the-nightingale': { steps: ['Have the student create a two-column table: left column "Escape Attempt" (wine, poesy, death), right column "Why.', 'Ask them to read aloud only the first and last stanzas, noting the shift from "heart aches" to "Do I wake or sleep?" 3.', 'Guide them to write one sentence answering: "Does the speaker stay with the bird?" — the answer "No" forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
