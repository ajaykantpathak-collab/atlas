import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch07_p1: SimDef = {
    id: 'v3_c12_eng_k_ch07_p1',
    title: 'Poems by Milton (Poem) · Part 1/3',
    subtitle: 'The blind poet wrote these poems with perfect sight',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Milton (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch07'],
    nodeIds: ['c12_eng_k_cbse_07_001', 'c12_eng_k_cbse_07_002', 'c12_eng_k_cbse_07_003', 'c12_eng_k_cbse_07_004', 'c12_eng_k_cbse_07_005', 'c12_eng_k_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Renaissance poetry scholar', intro: 'Before the blindness, before the epic — a young Milton was already picking fights with Time itself.', goal: 'Read Milton\'s On Time and On Shakespeare through the right context — a young classicist\'s defiance, not a blind seer\'s hindsight.' },
    discovery: {
        question: 'Milton, the blind poet who dictated Paradise Lost — surely his blindness is the key to \'On Time\' and \'On Shakespeare.\' Is it?',
        options: ['No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview', 'Yes — blindness explains everything Milton wrote', 'Only for On Time', 'His blindness was partial anyway'],
        answer: 'No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview',
        hook: 'Biography traps readers who don\'t check dates. These are a sighted 22-year-old\'s poems: Time as \'envious\' Cronos devouring its children, hours dragged by a clock\'s \'heavy plummets,\' and Shakespeare needing no monument because his \'easie numbers\' live in readers\' hearts — merit over marble.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'On Time\' (Kaleidoscope, ch. 7) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Milton young: feel time crawl in leaden plummet-steps, hear why the poem calls Time envious, and weigh the claim that a writer\'s true pyramid is built inside his readers.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'On Time\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Recall the three languages, besides English, that Milton read extensively after Cambridge, as mentioned in the textbook’s introductory note.', options: [
                { text: 'Latin, Greek, and Italian', outcome: 'Latin, Greek, and Italian. A wrong answer (e.g., “French, German, Spanish”) shows the student has.' },
                { text: 'French, German, Spanish', outcome: 'Not quite — Students often believe “On Shakespeare” was written *after* Milton’s blindness because they.', reveals: 'on-shakespeare-was-written-after' },
                { text: 'On Shakespeare', outcome: 'Not quite — Students often believe “On Shakespeare” was written *after* Milton’s blindness because they.', reveals: 'on-shakespeare-was-written-after' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'On Time\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary structural difference between a narrative poem (like "The Rime of the Ancient Mariner") and a lyric argument poem (like.', options: [
                { text: 'A narrative poem follows a chronological story with characters, events, and settings', outcome: 'A narrative poem follows a chronological story with characters, events, and settings unfolding.' },
                { text: 'lyric poems have no plot', outcome: 'Not quite — Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s.', reveals: 'students-treat-plot-in-poetry' },
                { text: 'and conclude lyric poems like Milton\'s', outcome: 'Not quite — Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s.', reveals: 'students-treat-plot-in-poetry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'On Time\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary setting of Milton\'s poem "On Time" — is it a physical location, a temporal concept, or a metaphysical realm?', options: [
                { text: 'The primary setting of "On Time" is a metaphysical realm where Time is personified as a', outcome: 'The primary setting of "On Time" is a metaphysical realm where Time is personified as a cosmic.' },
                { text: 'the passage of hours', outcome: 'Not quite — Students often think "setting" in poetry only means a physical place (like a forest or city) and.', reveals: 'setting-in-poetry-only-means' },
                { text: 'setting', outcome: 'Not quite — Students often think "setting" in poetry only means a physical place (like a forest or city) and.', reveals: 'setting-in-poetry-only-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'On Time\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'In "On Time," the speaker addresses Time as "envious" and "greedy." What does this personification reveal about the SPEAKER\'S character.', options: [
                { text: 'The speaker reveals himself as morally discerning and spiritually confident', outcome: 'The speaker reveals himself as morally discerning and spiritually confident — he sees through.' },
                { text: 'Time is jealous', outcome: 'Not quite — Students consistently confuse the POEM\'S SUBJECT (Time, Shakespeare) with the PROTAGONIST (the.', reveals: 'students-consistently-confuse-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'On Time\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the supporting personified figures in Milton\'s "On Time" and briefly state what each represents.', options: [
                { text: 'Correct answer: The "lazy leaden-stepping hours" (slow, heavy passage of time), the', outcome: 'Correct answer: The "lazy leaden-stepping hours" (slow, heavy passage of time), the "heavy Plummets.' },
                { text: 'Plummets pace', outcome: 'Not quite — Students think "supporting characters" must be human figures with dialogue.', reveals: 'supporting-characters-must-be-human' },
                { text: 'supporting characters', outcome: 'Not quite — Students think "supporting characters" must be human figures with dialogue.', reveals: 'supporting-characters-must-be-human' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'On Time\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of Milton\'s poem "On Time"?', options: [
                { text: 'The primary theme of "On Time" is the **conflict between the fleeting, destructive nature', outcome: 'The primary theme of "On Time" is the **conflict between the fleeting, destructive nature of Time.' },
                { text: 'envious', outcome: 'Not quite — **Misconception:** "The theme of a poem is its topic — so \'On Time\' is about Time, and \'On.', reveals: 'misconception-the-theme-of-a' },
                { text: 'false and vain', outcome: 'Not quite — **Misconception:** "The theme of a poem is its topic — so \'On Time\' is about Time, and \'On.', reveals: 'misconception-the-theme-of-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A school\'s board debates an expensive marble statue for a beloved retiring teacher versus funding the reading programme she built her life around.',
            decisions: [{ prompt: 'Which honours her — the marble or the work?', options: [
                { text: 'The work — Milton\'s \'On Shakespeare\' argues the true monument is built in transformed readers\' minds; fund what she changed, not what commemorates her.', outcome: 'Shakespeare needs no tomb because his books are the sepulchre; a legacy lives in continued effect, not in stone.' },
                { text: 'The statue — a lasting monument is the only real proof of legacy.', outcome: 'Milton\'s point is precisely that marble is the weaker memorial; people who carry the teaching are the monument.', reveals: 'monument-equals-legacy' },
                { text: 'Neither — legacies are vanity; dissolve the programme and move on.', outcome: 'That confuses humility with erasure; sustaining her work honours her without feeding ego.', reveals: 'legacy-is-vanity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now match the man to the moment — and avoid the exam\'s favourite biographical trap. Milton\'s early poems carry republican fire before the darkness came.',
            decisions: [{ prompt: 'What comes next? Poems by Milton (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Milton (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_001', difficulty: 'standard',
          question: '\'On Time\' (Kaleidoscope, ch. 7) — the context and background to this text: who.',
          hint: 'If stuck, review the “Before You Read” section of any Class 11 Hornbill chapter (e.g.',
          misconception: 'Students often believe “On Shakespeare” was written *after* Milton’s blindness because they associate all Milton poems.',
          parts: [
                { id: 'a', prompt: 'Recall the three languages, besides English, that Milton read extensively after Cambridge, as mentioned in the textbook’s introductory note.', answer: 'Latin, Greek, and Italian',
                  options: ['Latin, Greek, and Italian', 'French, German, Spanish', 'On Shakespeare'],
                  hint: 'If stuck, review the “Before You Read” section of any Class 11 Hornbill chapter (e.g.',
                  misconception: 'Students often believe “On Shakespeare” was written *after* Milton’s blindness because they associate all Milton poems with his later.' },
                { id: 'b', prompt: 'Apply the concept of “Plummets” (the lead weight regulating a clock) to the line “Whose speed is but the heavy Plummets pace”.', answer: 'The plummet’s slow, mechanical descent mirrors the “lazy leaden‑stepping hours”',
                  options: ['The plummet’s slow, mechanical descent mirrors the “lazy leaden‑stepping hours”', 'On Shakespeare'],
                  hint: 'If stuck, review the “Before You Read” section of any Class 11 Hornbill chapter (e.g.',
                  misconception: 'Students often believe “On Shakespeare” was written *after* Milton’s blindness because they associate all Milton poems with his later.' }
          ],
            remediations: { 'on-shakespeare-was-written-after': { steps: ['Re‑read the textbook’s opening paragraph (p.', '94) and underline every date.', 'Construct a timeline: 1608 birth → 1629 Cambridge → 1630 “On Shakespeare” → 1640s Civil War → 1652 blindness → 1667.', 'Re‑attempt Diagnostic Question 5, explicitly referencing the timeline.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'On Time\' — what happens, in what order, and why the.',
          hint: 'Review c11_eng_h_cbse_01_002 (prose plot structure) and c7_engl_ch01_011 (King Bruce.',
          misconception: 'Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s "have no plot." They.',
          parts: [
                { id: 'a', prompt: 'In "On Time," Milton writes: "Fly envious Time, till thou run out thy race / Call on the lazy leaden-stepping hours." Explain how the imperative mood in the.', answer: 'The imperative "Fly" and "Call on" positions the speaker as commanding Time, not',
                  options: ['The imperative "Fly" and "Call on" positions the speaker as commanding Time, not', 'it shows the speaker is angry', 'and conclude lyric poems like Milton\'s', 'They then write answers like'],
                  hint: 'Review c11_eng_h_cbse_01_002 (prose plot structure) and c7_engl_ch01_011 (King Bruce narrative.',
                  misconception: 'Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s "have no plot." They then write answers.' },
                { id: 'b', prompt: 'Compare the structural pacing of "On Time" (14 lines) and "On Shakespeare" (16 lines).', answer: '"On Time" uses 14 lines (sonnet-like compression) with no stanza breaks',
                  options: ['"On Time" uses 14 lines (sonnet-like compression) with no stanza breaks', 'both are short', 'and conclude lyric poems like Milton\'s', 'They then write answers like'],
                  hint: 'Review c11_eng_h_cbse_01_002 (prose plot structure) and c7_engl_ch01_011 (King Bruce narrative.',
                  misconception: 'Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s "have no plot." They then write answers.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['If the student cannot identify the volta or map the argument progression: (1) Have them number each line of "On Time".', 'Line 9?" (3) Use color-coding: red for anti-Time, green for pro-Eternity in "On Time"; blue for anti-monument, gold for.', '(5) Re-attempt Diagnostic Question 3 with the color-coded text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s "have no plot." They.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Milton\'s \'On Time\' follows a classical three-part structure: complaint (lines 1-8), vision (lines 9-12), triumph (lines 13-14)." Is this.', answer: 'Partially accurate but oversimplified',
                  options: ['Partially accurate but oversimplified', 'in line 9 is the structural hinge', 'and conclude lyric poems like Milton\'s', 'They then write answers like'],
                  hint: 'Review c11_eng_h_cbse_01_002 (prose plot structure) and c7_engl_ch01_011 (King Bruce narrative.',
                  misconception: 'Students treat "plot" in poetry as synonymous with "story" and conclude lyric poems like Milton\'s "have no plot." They then write answers.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['If the student cannot identify the volta or map the argument progression: (1) Have them number each line of "On Time".', 'Line 9?" (3) Use color-coding: red for anti-Time, green for pro-Eternity in "On Time"; blue for anti-monument, gold for.', '(5) Re-attempt Diagnostic Question 3 with the color-coded text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_003', difficulty: 'standard',
          question: 'The setting of \'On Time\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) and.',
          misconception: 'Students often think "setting" in poetry only means a physical place (like a forest or city) and "atmosphere" only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'On Time\'',
                  options: ['The setting of \'On Time\'', '\'On Time\' (Kaleidoscope, ch', 'The plot/narrative arc of \'On Time\'', 'Character analysis in \'On Time\''],
                  hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) and.',
                  misconception: 'Students often think "setting" in poetry only means a physical place (like a forest or city) and "atmosphere" only means "happy or sad.".' }
          ],
            remediations: { 'setting-in-poetry-only-means': { steps: ['If a student cannot distinguish metaphysical setting from physical setting, have them re-read the Class 11 node.', 'Next, have them re-do DIAGNOSTIC_QUESTION_3 with a think-aloud: "What does \'live-long Monument\' literally mean?', 'What does it metaphorically mean?" Finally, assign a short writing task: describe the setting of your favourite song.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_004', difficulty: 'standard',
          question: 'Character analysis in \'On Time\' — the central figure(s), their traits, and how.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_008 (Literary Devices: Imagery and Metaphor) and.',
          misconception: 'Students consistently confuse the POEM\'S SUBJECT (Time, Shakespeare) with the PROTAGONIST (the speaker).',
          parts: [
                { id: 'a', prompt: 'In "On Time," the speaker addresses Time as "envious" and "greedy." What does this personification reveal about the SPEAKER\'S character, not Time\'s?', answer: 'The speaker reveals himself as morally discerning and spiritually confident',
                  options: ['The speaker reveals himself as morally discerning and spiritually confident', 'Time is jealous'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_008 (Literary Devices: Imagery and Metaphor) and.',
                  misconception: 'Students consistently confuse the POEM\'S SUBJECT (Time, Shakespeare) with the PROTAGONIST (the speaker).' }
          ],
            remediations: { 'students-consistently-confuse-the-poem': { steps: ['Have the student read both poems aloud, marking every first-person pronoun ("I," "my," "our," "us") and imperative verb.', 'Ask: "Who is doing the speaking?', 'Who is doing the judging?" 3.', 'Create a two-column table: Column A = "What the speaker SAYS about Time/Shakespeare"; Column B = "What this REVEALS.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_005', difficulty: 'standard',
          question: 'Supporting characters in \'On Time\' — the secondary figures who move the story.',
          hint: 'Review "Personification as Character" in c11_eng_h_cbse_01_008 (Literary Devices: Imagery.',
          misconception: 'Students think "supporting characters" must be human figures with dialogue.',
          parts: [
                { id: 'a', prompt: 'In "On Shakespeare," Milton calls the pyramid and stones "weak witness of thy name." Explain why the poet considers stone monuments weak compared.', answer: 'Correct answer: Stone monuments decay and are passive',
                  options: ['Correct answer: Stone monuments decay and are passive', 'stones break but poems don\'t', 'live-long Monument', 'supporting characters'],
                  hint: 'Review "Personification as Character" in c11_eng_h_cbse_01_008 (Literary Devices: Imagery and.',
                  misconception: 'Students think "supporting characters" must be human figures with dialogue.' },
                { id: 'b', prompt: 'Compare the function of "Eternity" in "On Time" with the function of "Fame" in "On Shakespeare." How does each serve as a thematic resolution for its poem?', answer: 'Correct answer: Eternity is the *destination*',
                  options: ['Correct answer: Eternity is the *destination*', 'rewards', 'Fame is for Shakespeare, Eternity is for us', 'our bliss'],
                  hint: 'Review "Personification as Character" in c11_eng_h_cbse_01_008 (Literary Devices: Imagery and.',
                  misconception: 'Students think "supporting characters" must be human figures with dialogue.' }
          ],
            remediations: { 'supporting-characters-must-be-human': { steps: ['Have the student re-read both poems and highlight every capitalized noun that performs a verb (e.g.', 'For each, fill a 3-column table: Figure | Action | Relationship to Protagonist.', 'Re-attempt Diagnostic Question 1.', 'If still missing figures, assign c12_eng_k_cbse_07_008 (Literary Devices: Imagery and Metaphor) to review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_006', difficulty: 'standard',
          question: 'The primary theme of \'On Time\' — the central idea the whole text returns to.',
          hint: 'If stuck, review c10_engl_cbse_08_006 (Buddha\'s sermon on impermanence) — its "topic.',
          misconception: '**Misconception:** "The theme of a poem is its topic — so \'On Time\' is about Time, and \'On Shakespeare\' is about.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "volta" (structural turn) to both poems. Identify the exact line where each poem shifts from describing the temporal/physical to asserting.', answer: '**On Time:** The turn occurs at line 9: **"For when as each thing bad thou hast',
                  options: ['**On Time:** The turn occurs at line 9: **"For when as each thing bad thou hast', 'the theme changes'],
                  hint: 'If stuck, review c10_engl_cbse_08_006 (Buddha\'s sermon on impermanence) — its "topic.',
                  misconception: '**Misconception:** "The theme of a poem is its topic — so \'On Time\' is about Time, and \'On Shakespeare\' is about Shakespeare." **Why.' }
          ],
            remediations: { 'misconception-the-theme-of-a': { steps: ['**Revisit the distinction:** Use c6_english_u1_004 (King Bruce poem — Meaning and Message) to review how a poem\'s.', '**Practice the "Topic → Theme" ladder:** Take 3 familiar poems (e.g., "The Road Not Taken," "Ozymandias," "On Killing.', '**Re-read both Milton poems with a two-column note sheet:** Left column = "Images of the Temporal/Physical"; Right.', '**Re-diagnostic:** Answer Diagnostic Question 2 again, but this time explicitly label which words in your answer refer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
