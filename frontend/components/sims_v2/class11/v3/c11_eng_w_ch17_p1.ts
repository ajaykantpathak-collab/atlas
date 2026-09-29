import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch17_p1: SimDef = {
    id: 'v3_c11_eng_w_ch17_p1',
    title: 'Refugee Blues (Poem) · Part 1/3',
    subtitle: 'Hear a passport expire inside a song that won\'t stop dancing.',
    classLevel: 11, subject: 'eng_w', topic: 'Refugee Blues (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch17'],
    nodeIds: ['c11_eng_w_cbse_17_001', 'c11_eng_w_cbse_17_002', 'c11_eng_w_cbse_17_003', 'c11_eng_w_cbse_17_004', 'c11_eng_w_cbse_17_005', 'c11_eng_w_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a refugee with a passport no country honours', intro: '1939: citizenship revoked by decree, every border closed, and a refrain that keeps repeating \'my dear\' as if love could hold a border open.', goal: 'Situate the poem in the 1930s refugee crisis and evaluate the blues form\'s ironic force.' },
    discovery: {
        question: 'Auden sets a Jewish refugee\'s despair to a jaunty blues tune with a lilting refrain. Inappropriate — or the sharpest choice he could make?',
        options: ['Sharpest — the song-form turns one couple\'s agony into a collective lament, and the cheery rhythm makes the horror land harder', 'Inappropriate — grief demands a solemn form', 'Sharpest — but only because blues was fashionable in 1939', 'Inappropriate — the refrain \'my dear\' softens the politics'],
        answer: 'Sharpest — the song-form turns one couple\'s agony into a collective lament, and the cheery rhythm makes the horror land harder',
        hook: 'The blues was born of dispossession — Auden borrows Black America\'s form to sing a statelessness Europe invented.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Refugee Blues\' (Woven Words, ch. 17) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_17_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the speaker station to station — consul, committee, harbour, plain — and hear \'my dear\' grow more desperate with each refrain, up to the soldiers\' march.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Refugee Blues\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the poet of "Refugee Blues" and in which decade was the poem written?', options: [
                { text: 'W.H', outcome: 'W.H. Auden, written in 1939 (1930s). A wrong answer (e.g., naming a different poet or dating.' },
                { text: 'a different poet or dating it post-WWII', outcome: 'Not quite — Students often think "blues" refers only to the color blue or general sadness, not a defined.', reveals: 'blues-refers-only-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Refugee Blues\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary setting established in the first stanza of "Refugee Blues," and what social contrast does it immediately introduce?', options: [
                { text: 'The first stanza establishes a large city ("ten million souls") with a stark social', outcome: 'The first stanza establishes a large city ("ten million souls") with a stark social contrast: "Some.' },
                { text: 'ten million souls', outcome: 'Not quite — Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe.', reveals: 'students-often-treat-setting-in' },
                { text: 'Some are living in mansions, some are living in holes', outcome: 'Not quite — Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe.', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Refugee Blues\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist of "Refugee Blues," and what does the repeated address "my dear" reveal about their relationship to the listener?', options: [
                { text: 'The protagonist is the first-person speaker, a German Jewish refugee addressing an', outcome: 'The protagonist is the first-person speaker, a German Jewish refugee addressing an intimate.' },
                { text: 'the poet Auden', outcome: 'Not quite — Students often confuse the *poet* (Auden, a British-American intellectual who left Germany.', reveals: 'students-often-confuse-the-poet' },
                { text: 'a generic narrator', outcome: 'Not quite — Students often confuse the *poet* (Auden, a British-American intellectual who left Germany.', reveals: 'students-often-confuse-the-poet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Refugee Blues\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List every supporting character or group the speaker encounters or observes in "Refugee Blues," in the order they appear.', options: [
                { text: 'The consul (stanza 4), the committee (stanza 5), the speaker at the public meeting', outcome: 'The consul (stanza 4), the committee (stanza 5), the speaker at the public meeting (stanza 6).' },
                { text: 'supporting characters', outcome: 'Not quite — Students believe "supporting characters" in poetry must be named individuals with dialogue and.', reveals: 'supporting-characters-in-poetry-must' },
                { text: 'my dear', outcome: 'Not quite — Students believe "supporting characters" in poetry must be named individuals with dialogue and.', reveals: 'supporting-characters-in-poetry-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Refugee Blues\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "Refugee Blues" as distinct from its subject matter? Answer in one sentence.', options: [
                { text: 'The primary theme is the **systematic stripping of legal personhood from a specific group', outcome: 'The primary theme is the **systematic stripping of legal personhood from a specific group (German.' },
                { text: 'the suffering of refugees', outcome: 'Not quite — Students often conflate the **historical context** (Nazi persecution of Jews) with the **universal.', reveals: 'students-often-conflate-the-historical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a human-rights day assembly, your team picks Auden\'s \'Refugee Blues\'. A classmate objects: \'It\'s a 1939 poem about German Jews — too old and too foreign for our refugee crisis today. And why is a sad poem set to a jaunty blues rhythm?\'',
            decisions: [{ prompt: 'How do you justify the poem and explain the form?', options: [
                { text: 'Explain the specific 1939 moment — Jews stripped of citizenship by the Nuremberg Laws, \'officially dead\' while still alive, every consul and committee turning them away — then show the craft: Auden borrows the 12-bar blues\' AAB pattern, and the repeating \'my dear\' grows more desperate each refrain. The jaunty rhythm against horrific content is deliberate irony: it makes bureaucratic erasure feel personal and endless — which is exactly what makes it speak to any stateless person today.', outcome: 'The form becomes your argument: cyclical blues structure mirrors cyclical rejection — the poem isn\'t dated, it\'s diagnostic.' },
                { text: 'Concede — swap it for a recent news article about refugees, since the poem is about a historical event.', outcome: 'Dating it misses the point: the poem\'s power is that bureaucratic statelessness — passports no country honours — is a recurring reality, not a closed chapter.', reveals: 'historical-poem-is-dated' },
                { text: 'Tell the classmate the blues label just means the poem is sad — the rhythm is incidental decoration.', outcome: '\'Blues\' is a defined musical form with 12-bar structure and refrain; the clash between its swing and the despairing words is the poem\'s central irony, not decoration.', reveals: 'blues-just-means-sad' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ten thousand soldiers looking for \'you and me\' — the poem refuses closure because the refugees never got one.',
            decisions: [{ prompt: 'What comes next? Refugee Blues (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Refugee Blues (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_001', difficulty: 'standard',
          question: '\'Refugee Blues\' (Woven Words, ch. 17) — the context and background to this.',
          hint: 'Review the Class 10 chapter on Anne Frank (c10_engl_cbse_04_001) for Holocaust background.',
          misconception: 'Students often think "blues" refers only to the color blue or general sadness, not a defined musical/poetic form with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Refugee Blues\' (Woven Words, ch',
                  options: ['\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'The setting of \'Refugee Blues\'', 'Character analysis in \'Refugee Blues\''],
                  hint: 'Review the Class 10 chapter on Anne Frank (c10_engl_cbse_04_001) for Holocaust background.',
                  misconception: 'Students often think "blues" refers only to the color blue or general sadness, not a defined musical/poetic form with a 12-bar structure.' }
          ],
            remediations: { 'blues-refers-only-to-the': { steps: ['Play a 12-bar blues recording; have students clap the rhythm and label the AAB lyric lines.', 'Build a timeline: 1933 Hitler chancellor → 1935 Nuremberg Laws → 1938 Kristallnacht & Evian Conference → 1939 poem.', 'Contrast Auden\'s biography (British citizen, chose to leave) with the speaker\'s statelessness.', 'Assign a mini-research on the Evian Conference to concretize "committee / return next year."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Refugee Blues\' — what happens, in what order, and.',
          hint: 'If stuck, review "Poetry Form: Narrative Poetry and Its Features" (c6_english_u1_006) and.',
          misconception: 'Students often treat each stanza as an isolated image rather than a linked scene in a continuous narrative.',
          parts: [
                { id: 'a', prompt: 'The poem uses the ballad form. Apply your knowledge of ballad conventions to explain why Auden chose a simple AAB rhyme scheme and four-line stanzas for this.', answer: 'Ballads traditionally use simple quatrains and repetition to tell stories orally',
                  options: ['Ballads traditionally use simple quatrains and repetition to tell stories orally', 'rhyme makes it sound nice'],
                  hint: 'If stuck, review "Poetry Form: Narrative Poetry and Its Features" (c6_english_u1_006) and the.',
                  misconception: 'Students often treat each stanza as an isolated image rather than a linked scene in a continuous narrative.' }
          ],
            remediations: { 'students-often-treat-each-stanza': { steps: ['Have the student draw a two-column timeline: left column = stanza number, right column = physical setting and speaker\'s.', 'Ask them to read only the last line of each stanza aloud in sequence to hear the refrain\'s escalating desperation.', 'Prompt: "If this were a film, what would the camera show in each stanza?" This forces narrative visualization.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_003', difficulty: 'standard',
          question: 'The setting of \'Refugee Blues\' — the place, time and atmosphere the text.',
          hint: 'If stuck, return to node 001 (Context and Background) and node 002 (Plot and Narrative.',
          misconception: 'Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe in the 1930s") rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Refugee Blues\'',
                  options: ['The setting of \'Refugee Blues\'', '\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'Character analysis in \'Refugee Blues\''],
                  hint: 'If stuck, return to node 001 (Context and Background) and node 002 (Plot and Narrative Structure).',
                  misconception: 'Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe in the 1930s") rather than recognizing.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Have the student physically map the poem: draw 12 boxes (one per stanza) and sketch or label the setting of each.', 'Ask them to write one adjective for the atmosphere of each box (e.g., "indifferent," "mocking," "cold," "polite,".', 'Guide them to see the pattern: human settings grow increasingly hostile; natural settings offer freedom but remain.', 'Re-read the poem aloud, pausing at each stanza to name the setting and its atmosphere aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe in the 1930s") rather.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the dream setting in stanza 10 ("a building with a thousand floors") in conveying the refugees\' hopelessness.', answer: 'The dream setting is more powerful',
                  options: ['The dream setting is more powerful', 'more real', 'more powerful'],
                  hint: 'If stuck, return to node 001 (Context and Background) and node 002 (Plot and Narrative Structure).',
                  misconception: 'Students often treat "setting" in this poem as a single backdrop (e.g., "Nazi Germany" or "Europe in the 1930s") rather than recognizing.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Have the student physically map the poem: draw 12 boxes (one per stanza) and sketch or label the setting of each.', 'Ask them to write one adjective for the atmosphere of each box (e.g., "indifferent," "mocking," "cold," "polite,".', 'Guide them to see the pattern: human settings grow increasingly hostile; natural settings offer freedom but remain.', 'Re-read the poem aloud, pausing at each stanza to name the setting and its atmosphere aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_004', difficulty: 'standard',
          question: 'Character analysis in \'Refugee Blues\' — the central figure(s), their traits.',
          hint: 'If stuck on protagonist\'s identity: Review c11_eng_w_cbse_17_001 (Context) for the.',
          misconception: 'Students often confuse the *poet* (Auden, a British-American intellectual who left Germany voluntarily in 1930s) with.',
          parts: [
                { id: 'a', prompt: 'Compare the protagonist\'s observation of animals (poodle, cat, fish, birds) in stanzas 7-9 with their own condition.', answer: 'The protagonist notes animals have shelter, freedom, and ease',
                  options: ['The protagonist notes animals have shelter, freedom, and ease', 'the protagonist envies animals'],
                  hint: 'If stuck on protagonist\'s identity: Review c11_eng_w_cbse_17_001 (Context) for the historical.',
                  misconception: 'Students often confuse the *poet* (Auden, a British-American intellectual who left Germany voluntarily in 1930s) with the *persona* (a.' }
          ],
            remediations: { 'students-often-confuse-the-poet': { steps: ['Have the student re-read only the first and last stanzas aloud, noting the identical refrain framing a journey that.', 'Ask: "If you lost your passport today, who would you call \'my dear\'?', 'What would that word carry?" 3.', 'Create a two-column table: "What the protagonist DOES" vs "What is DONE TO them" — populate from each stanza.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_005', difficulty: 'standard',
          question: 'Supporting characters in \'Refugee Blues\' — the secondary figures who move the.',
          hint: 'Review the protagonist analysis (node 004) and re-read the poem marking every new.',
          misconception: 'Students believe "supporting characters" in poetry must be named individuals with dialogue and personality, like in.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Refugee Blues\'',
                  options: ['Supporting characters in \'Refugee Blues\'', '\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'The setting of \'Refugee Blues\''],
                  hint: 'Review the protagonist analysis (node 004) and re-read the poem marking every new "character".',
                  misconception: 'Students believe "supporting characters" in poetry must be named individuals with dialogue and personality, like in a novel.' }
          ],
            remediations: { 'supporting-characters-in-poetry-must': { steps: ['If a student lists only 2-3 characters: (1) Have them re-read the poem with a highlighter, marking every new "who".', '(2) Ask: "Stanza 5—who speaks?', 'Stanza 8—what does the speaker see?', 'Stanza 11—who marches?" (3) Group the encounters: bureaucratic (consul, committee), political (speaker, Hitler).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_006', difficulty: 'standard',
          question: 'The primary theme of \'Refugee Blues\' — the central idea the whole text returns.',
          hint: 'If stuck, review **c11_eng_w_cbse_17_002 (Plot and Narrative Structure)** to map the.',
          misconception: 'Students often conflate the **historical context** (Nazi persecution of Jews) with the **universal theme**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'Refugee Blues\'',
                  options: ['The primary theme of \'Refugee Blues\'', '\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'The setting of \'Refugee Blues\''],
                  hint: 'If stuck, review **c11_eng_w_cbse_17_002 (Plot and Narrative Structure)** to map the speaker\'s.',
                  misconception: 'Students often conflate the **historical context** (Nazi persecution of Jews) with the **universal theme** (statelessness as a structural.' }
          ],
            remediations: { 'students-often-conflate-the-historical': { steps: ['**Re-read stanzas 1-7 without stanza 8-9**: Ask "Who is \'we\'?', 'What specific crime have they committed?" — Answer: None.', '**Map the "Ten Million" contrast**: Draw a two-column table: Column A = "Ten million souls / mansions / holes" (city.', 'Column B = "No place for us" (exclusion).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
