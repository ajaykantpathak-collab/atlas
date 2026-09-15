import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch14_p1: SimDef = {
    id: 'v3_c11_eng_w_ch14_p1',
    title: 'Mother Tongue (Poem) · Part 1/3',
    subtitle: 'Watch a request for a pen become a language\'s fight for its script.',
    classLevel: 11, subject: 'eng_w', topic: 'Mother Tongue (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch14'],
    nodeIds: ['c11_eng_w_cbse_14_001', 'c11_eng_w_cbse_14_002', 'c11_eng_w_cbse_14_003', 'c11_eng_w_cbse_14_004', 'c11_eng_w_cbse_14_005', 'c11_eng_w_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a petitioner negotiating with a reed for a quill', intro: '\'Give me a quill, quickly — she must be looking for me.\' The urgency is a whole language demanding to be written down.', goal: 'Read the poem\'s request-and-response structure as an allegory of script deprivation.' },
    discovery: {
        question: 'A poet begs a reed for a quill, and the reed cuts off its own hand to give one. What is the poem actually asking for?',
        options: ['A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it', 'A pen — the poet simply needs to write a poem', 'Ink — the reed produces writing fluid', 'Inspiration — the reed is a muse figure'],
        answer: 'A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it',
        hook: 'She serves \'a Shahni, not a Shah\' — the climax isn\'t the gift of the quill but the naming of who it\'s for: her mother tongue.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and background in literary analysis refers to the historical, cultural, linguistic, and biographical information surrounding a text that shapes its meaning; for a poem, this includes the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the six stanzas onto the dramatic arc, place the climax at the revelation of Dogri, and weigh what translation keeps and loses.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you hear a friend say, "I can\'t find the right words in my own language anymore." That frustration is exactly what this poem explores before you even.',
            decisions: [{ prompt: 'What is the Sharade script, and what is its historical relationship to the Dogri language?', options: [
                { text: 'The Sharade script evolved from Brahmi around the time Dogri developed and was once', outcome: 'The Sharade script evolved from Brahmi around the time Dogri developed and was once widely used.' },
                { text: 'Sharade is the current script of Dogri', outcome: 'Not quite — Students often think the poem is simply about a poet asking for a pen to write a poem, missing that.', reveals: 'the-poem-is-simply-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a strange dream where a plant talks back to you — you would naturally start with where you were, what you asked, how.',
            decisions: [{ prompt: 'What is the inciting incident in the poem "Mother Tongue"?', options: [
                { text: 'The inciting incident is the speaker approaching the reed and asking it for a quill to', outcome: 'The inciting incident is the speaker approaching the reed and asking it for a quill to write for.' },
                { text: 'the reed cutting its hand', outcome: 'Not quite — Students often believe narrative structure only exists in novels or long stories, so they treat the.', reveals: 'narrative-structure-only-exists-in' },
                { text: 'the speaker describing the Shahni', outcome: 'Not quite — Students often believe narrative structure only exists in novels or long stories, so they treat the.', reveals: 'narrative-structure-only-exists-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a room where someone is speaking passionately in a language you don\'t understand—you still feel the urgency in their voice.',
            decisions: [{ prompt: 'What is the physical location described in the opening lines of the poem "Mother Tongue"?', options: [
                { text: 'The opening lines describe the poet approaching "a stem / Swinging on a reed"—a natural,', outcome: 'The opening lines describe the poet approaching "a stem / Swinging on a reed"—a natural, waterside.' },
                { text: 'a study', outcome: 'Not quite — Students often treat "setting" in poetry as merely a physical backdrop (time/place) and.', reveals: 'students-often-treat-setting-in' },
                { text: 'a desk', outcome: 'Not quite — Students often treat "setting" in poetry as merely a physical backdrop (time/place) and.', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are trying to understand a friend who says, "I\'d do anything for my language." You\'d listen to their tone, notice what they sacrifice, and observe.',
            decisions: [{ prompt: 'What is the central symbol associated with the protagonist\'s request in the poem, and what does it represent literally?', options: [
                { text: 'The central symbol is the quill', outcome: 'The central symbol is the quill, which literally represents a writing instrument made from a reed\'s.' },
                { text: 'the quill represents freedom', outcome: 'Not quite — Students often think the protagonist is simply "the poet Padma Sachdev" and treat the poem.', reveals: 'the-protagonist-is-simply-the' },
                { text: 'the poet Padma Sachdev', outcome: 'Not quite — Students often think the protagonist is simply "the poet Padma Sachdev" and treat the poem.', reveals: 'the-protagonist-is-simply-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you open your grandmother\'s old recipe book and find the handwriting fading, the script no longer taught in schools — you feel a sudden urgency to copy.',
            decisions: [{ prompt: 'What is the central symbol of the quill in "Mother Tongue," and what does it represent in the context of the Dogri language?', options: [
                { text: 'The quill symbolises the Sharade script', outcome: 'The quill symbolises the Sharade script — the native writing system of Dogri that evolved from.' },
                { text: 'the quill is just a pen', outcome: 'Not quite — Students often think the "Shahni" is a real historical queen or the poet\'s literal employer.', reveals: 'the-shahni-is-a-real' },
                { text: 'Shahni', outcome: 'Not quite — Students often think the "Shahni" is a real historical queen or the poet\'s literal employer.', reveals: 'the-shahni-is-a-real' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your linguistics club is preparing a stall on endangered scripts. A junior suggests Padma Sachdev\'s Dogri poem about the reed but summarises it as \'a poet asks a plant for a pen so she can write.\' You know the stakes are bigger than stationery.',
            decisions: [{ prompt: 'What\'s the right interpretation to put on the stall poster?', options: [
                { text: 'Frame it as a language claiming its right to be written: Dogri lost its own script (Sharade) and survives in borrowed scripts, so the reed\'s violent generosity — cutting off its own hand to become the poet\'s quill — allegorises what a script-less language demands. The climax isn\'t the gift of the pen but the revelation \'That Shahni is my mother tongue / Dogri.\'', outcome: 'The poster now explains the allegory: the quill is the script itself, and the reed\'s sacrifice mirrors a community adapting to keep its language alive.' },
                { text: 'Keep the junior\'s summary — it\'s a charming request for a pen, which suits a stationery-themed corner of the stall.', outcome: 'The literal reading erases the poem\'s subject: a whole language\'s deprivation, not one poet\'s need for a writing tool.', reveals: 'literally-about-a-pen' },
                { text: 'Present it as an environmental poem — the reed is harmed, so it\'s about plants suffering for human art.', outcome: 'The reed offers itself willingly; the wound serves the allegory of a mother tongue demanding written form, not a conservation message.', reveals: 'reed-poem-is-environmental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'The reed refuses until it hears the mistress\'s name — a language without a script is a servant asking to be written.',
            decisions: [{ prompt: 'What comes next? Mother Tongue (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mother Tongue (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_001', difficulty: 'standard',
          question: 'Context and background in literary analysis refers to the historical, cultural.',
          hint: 'Review the definition and examples of personification from Class 8 poetry.',
          misconception: 'Students often think the poem is simply about a poet asking for a pen to write a poem, missing that the "quill".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Context and background in literary analysis refers to the historical, cultural,',
                  options: ['Context and background in literary analysis refers to the historical, cultural,', 'Plot and narrative structure in a poem refers to the sequence of events, actions, and', 'Setting in poetry refers to the imagined time, place, and social environment where the', 'Character analysis of the protagonist in a poem involves examining the speaker\'s persona,'],
                  hint: 'Review the definition and examples of personification from Class 8 poetry (c8_engl_ch4_15) and the.',
                  misconception: 'Students often think the poem is simply about a poet asking for a pen to write a poem, missing that the "quill" represents the script.' }
          ],
            remediations: { 'the-poem-is-simply-about': { steps: ['If a student gives a literal reading, guide them through three steps: (1) Reread the reed\'s question — "Are you.', '(2) Contrast "Shah" with "Shahni" — why does the poet choose a female authority figure?', '(3) Connect to the NCERT note: Dogri lost its native script Sharade; the reed cutting its hand is the script.', 'Have them rewrite their interpretation using this allegorical lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a poem refers to the sequence of events.',
          hint: 'Review the definition and examples of narrative poetry from Class 6 (c6_english_u1_006).',
          misconception: 'Students often believe narrative structure only exists in novels or long stories, so they treat the poem as a static.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the reed initially refuses to give the speaker a quill.', answer: 'The reed refuses',
                  options: ['The reed refuses', 'the reed is angry at the speaker', 'the reed does not like the mother tongue'],
                  hint: 'Review the definition and examples of narrative poetry from Class 6 (c6_english_u1_006) and the.',
                  misconception: 'Students often believe narrative structure only exists in novels or long stories, so they treat the poem as a static description.' },
                { id: 'b', prompt: 'Compare the narrative structure of "Mother Tongue" with that of "King Bruce and the Spider" (Class 7). How does the conflict differ in nature and resolution?', answer: '"King Bruce and the Spider" has an external conflict (king vs',
                  options: ['"King Bruce and the Spider" has an external conflict (king vs', 'both have a king and a spider/reed'],
                  hint: 'Review the definition and examples of narrative poetry from Class 6 (c6_english_u1_006) and the.',
                  misconception: 'Students often believe narrative structure only exists in novels or long stories, so they treat the poem as a static description.' }
          ],
            remediations: { 'narrative-structure-only-exists-in': { steps: ['If the student cannot map the plot stages, ask them to retell the poem as a 30-second story to a younger sibling.', 'then I told it I work for Dogri...', 'then it gave me its hand." Have them number the sentences 1-6.', 'Then match each sentence to a stanza.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the imagined time, place, and social environment.',
          hint: 'Review the allegory: Reed = Sharade script; Shahni = Dogri language; Quill = writing.',
          misconception: 'Students often treat "setting" in poetry as merely a physical backdrop (time/place) and "atmosphere" as a simple.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet chooses a reed as the setting for her request, rather than a shop or a desk.', answer: 'The reed is the organic source of a quill',
                  options: ['The reed is the organic source of a quill', 'reeds are where quills come from'],
                  hint: 'Review the allegory: Reed = Sharade script; Shahni = Dogri language; Quill = writing instrument.',
                  misconception: 'Students often treat "setting" in poetry as merely a physical backdrop (time/place) and "atmosphere" as a simple adjective (happy/sad).' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Reread the poem aloud, pausing after each speaker change.', 'Draw a two-column table: label columns "Reed\'s Words" and "Poet\'s Words." Fill in key phrases.', 'Explain aloud: "The reed is the Sharade script; cutting its hand means giving up its form to serve Dogri." 5.', 'Rewrite the atmosphere shift in one sentence: "The mood moves from annoyance to holy sacrifice because the script.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "setting" in poetry as merely a physical backdrop (time/place) and "atmosphere" as a simple.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the metaphorical setting (poet-reed dialogue) strengthens or weakens the poem\'s emotional appeal to the reader.', answer: 'It strengthens the appeal',
                  options: ['It strengthens the appeal', 'childish', 'confusing'],
                  hint: 'Review the allegory: Reed = Sharade script; Shahni = Dogri language; Quill = writing instrument.',
                  misconception: 'Students often treat "setting" in poetry as merely a physical backdrop (time/place) and "atmosphere" as a simple adjective (happy/sad).' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Reread the poem aloud, pausing after each speaker change.', 'Draw a two-column table: label columns "Reed\'s Words" and "Poet\'s Words." Fill in key phrases.', 'Explain aloud: "The reed is the Sharade script; cutting its hand means giving up its form to serve Dogri." 5.', 'Rewrite the atmosphere shift in one sentence: "The mood moves from annoyance to holy sacrifice because the script.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the.',
          hint: 'Review "persona vs. poet" using a simple example: in Robert Frost\'s "The Road Not Taken,".',
          misconception: 'Students often think the protagonist is simply "the poet Padma Sachdev" and treat the poem as autobiography.',
          parts: [
                { id: 'a', prompt: 'What is the central symbol associated with the protagonist\'s request in the poem, and what does it represent literally?', answer: 'The central symbol is the quill',
                  options: ['The central symbol is the quill', 'the quill represents freedom', 'the poet Padma Sachdev'],
                  hint: 'Review "persona vs. poet" using a simple example: in Robert Frost\'s "The Road Not Taken," the.',
                  misconception: 'Students often think the protagonist is simply "the poet Padma Sachdev" and treat the poem as autobiography.' },
                { id: 'b', prompt: 'Explain in your own words why the reed is initially irritated with the protagonist.', answer: 'The reed is irritated',
                  options: ['The reed is irritated', 'the reed is angry', 'the poet Padma Sachdev'],
                  hint: 'Review "persona vs. poet" using a simple example: in Robert Frost\'s "The Road Not Taken," the.',
                  misconception: 'Students often think the protagonist is simply "the poet Padma Sachdev" and treat the poem as autobiography.' }
          ],
            remediations: { 'the-protagonist-is-simply-the': { steps: ['If the student confuses poet and persona: 1) Ask them to list three things the speaker says about herself that Padma.', '2) Have them replace "I" with "the speaker" in their notes.', '3) Show how the accountant comparison is a rhetorical strategy, not a biographical fact.', '4) Practice writing one analytical sentence using "the speaker" or "the protagonist" correctly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves examining how.',
          hint: 'Review personification in c11_eng_w_cbse_14_008 and protagonist analysis.',
          misconception: 'Students often read "Shahni" as a literal historical queen or noblewoman because of the feudal vocabulary (Shah.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters in poetry involves examining how personified',
                  options: ['Character analysis of supporting characters in poetry involves examining how personified', 'Context and background in literary analysis refers to the historical, cultural,', 'Plot and narrative structure in a poem refers to the sequence of events, actions, and', 'Setting in poetry refers to the imagined time, place, and social environment where the'],
                  hint: 'Review personification in c11_eng_w_cbse_14_008 and protagonist analysis in c11_eng_w_cbse_14_004.',
                  misconception: 'Students often read "Shahni" as a literal historical queen or noblewoman because of the feudal vocabulary (Shah, Shahni, servants.' }
          ],
            remediations: { 'students-often-read-shahni-as': { steps: ['Re-read the "About the Poet" note: Dogri lost its native Sharade script to Persian/Devanagari — this *is* the Reed\'s.', 'Circle every feudal term (Shah, Shahni, servant, accountant, bidding) and write the linguistic equivalent beside each.', 'Draw a two-column table: "Reed = Script (Sharade)" vs "Shahni = Language (Dogri)".', 'Fill with: perishable/eternal, instrumental/sovereign, one/many servants.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that emerges from the.',
          hint: 'If stuck, review c11_eng_w_cbse_14_002 (Plot and Narrative Structure) and practise.',
          misconception: 'Students often think the "Shahni" is a real historical queen or the poet\'s literal employer, missing that "Shahni" is.',
          parts: [
                { id: 'a', prompt: 'What is the central symbol of the quill in "Mother Tongue," and what does it represent in the context of the Dogri language?', answer: 'The quill symbolises the Sharade script',
                  options: ['The quill symbolises the Sharade script', 'the quill is just a pen', 'Shahni'],
                  hint: 'If stuck, review c11_eng_w_cbse_14_002 (Plot and Narrative Structure) and practise writing.',
                  misconception: 'Students often think the "Shahni" is a real historical queen or the poet\'s literal employer, missing that "Shahni" is a metaphorical.' },
                { id: 'b', prompt: 'Analyse how the shift from "Shah" to "Shahni" in the speaker\'s reply restructures the power dynamic in the poem and what this reveals about the theme.', answer: 'The shift replaces a patriarchal, commercial master (Shah) with a nurturing,',
                  options: ['The shift replaces a patriarchal, commercial master (Shah) with a nurturing,', 'Shahni'],
                  hint: 'If stuck, review c11_eng_w_cbse_14_002 (Plot and Narrative Structure) and practise writing.',
                  misconception: 'Students often think the "Shahni" is a real historical queen or the poet\'s literal employer, missing that "Shahni" is a metaphorical.' }
          ],
            remediations: { 'the-shahni-is-a-real': { steps: ['Re-read the "About the Poet" box in the textbook and underline "bemoans the deprivation of Dogri of its native script.', 'Re-read the poem replacing every "Shahni" with "Dogri" and every "servant" with "speaker/poet" to see the allegory.', 'Write a two-sentence paraphrase: "The poet serves Dogri.', 'The old script (reed) recognises this service and sacrifices itself to help." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
