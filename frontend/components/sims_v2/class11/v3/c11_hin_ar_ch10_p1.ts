import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p1',
    title: 'tSusanz dekj · Part 1/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'tSusanz dekj · Part 1/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_001', 'c11_hin_ar_cbse_10_002', 'c11_hin_ar_cbse_10_003', 'c11_hin_ar_cbse_10_004', 'c11_hin_ar_cbse_10_005', 'c11_hin_ar_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and background refer to the historical, social, cultural, and biographical circumstances surrounding a literary work and its creator.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine meeting a new classmate who speaks in metaphors about "weaving" and "threads" – you\'d understand them better if you knew they came from a family.',
            decisions: [{ prompt: 'Who was Kabir, and what was his primary profession according to the textbook introduction?', options: [
                { text: 'Kabir (c', outcome: 'Kabir (c. 1498–1546) was a prominent saint-poet of the Nirguna Bhakti tradition whose primary.' },
                { text: 'he was a king', outcome: 'Not quite — Students treat "Context and Background" as a list of static facts (dates, birthplace, book names).', reveals: 'students-treat-context-and-background' },
                { text: 'he wrote in Sanskrit', outcome: 'Not quite — Students treat "Context and Background" as a list of static facts (dates, birthplace, book names).', reveals: 'students-treat-context-and-background' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you watched, but you only have 30 seconds — you wouldn\'t list every scene; you\'d give the turning points: "First.',
            decisions: [{ prompt: 'What is the primary difference between analyzing plot in a short story and analyzing narrative structure in a lyric poem like Meera\'s pad?', options: [
                { text: 'In a short story, plot follows external events with clear cause-effect chains (exposition', outcome: 'In a short story, plot follows external events with clear cause-effect chains (exposition → rising.' },
                { text: 'poems don\'t have plots', outcome: 'Not quite — Students often believe a poem must tell a chronological story with characters and events (like.', reveals: 'a-poem-must-tell-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting in a quiet temple courtyard at dusk, hearing a bhajan that makes your heart ache with a sweet pain — that ache is the atmosphere the.',
            decisions: [{ prompt: 'What is the primary setting of Meera Bai\'s poem "Mere to Giridhar Gopal" — a physical location or an internal state? Answer in one sentence.', options: [
                { text: 'The primary setting is the speaker\'s internal spiritual consciousness centred on Krishna,', outcome: 'The primary setting is the speaker\'s internal spiritual consciousness centred on Krishna, not.' },
                { text: 'The setting is Chittor fort where Meera lived', outcome: 'Not quite — Students often treat "setting" in poetry as only the physical backdrop (Vrindavan, palace, forest).', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a play where the main actor (Kabir) stands alone on stage—but every time a friend, enemy, or student enters, the spotlight shifts and.',
            decisions: [{ prompt: 'Name three supporting characters mentioned in the biographical introduction of the Kabir chapter and state one factual detail about each.', options: [
                { text: 'Correct answer: (1) Guru Ramanand – Kabir\'s guru who initiated him into Bhakti', outcome: 'Correct answer: (1) Guru Ramanand – Kabir\'s guru who initiated him into Bhakti; (2) Sultan Sikandar.' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students often think "supporting character analysis" means writing a mini-biography of each person.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'What comes next? tSusanz dekj · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — tSusanz dekj · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_001', difficulty: 'standard',
          question: 'Context and background refer to the historical, social, cultural, and.',
          hint: 'If stuck on "Nirguna vs Saguna" or "Bhakti vs Sufi," review Class 10 History Chapter.',
          misconception: 'Students treat "Context and Background" as a list of static facts (dates, birthplace, book names) to memorize for.',
          parts: [
                { id: 'a', prompt: 'Who was Kabir, and what was his primary profession according to the textbook introduction?', answer: 'Kabir (c',
                  options: ['Kabir (c', 'he was a king', 'he wrote in Sanskrit'],
                  hint: 'If stuck on "Nirguna vs Saguna" or "Bhakti vs Sufi," review Class 10 History Chapter "Bhakti-Sufi.',
                  misconception: 'Students treat "Context and Background" as a list of static facts (dates, birthplace, book names) to memorize for 1-mark questions.' }
          ],
            remediations: { 'students-treat-context-and-background': { steps: ['**Re-read the introduction as a "user manual" for the poem:** Annotate every biographical detail with a marginal.', '**Build a "Context-to-Text" prediction table:** Column A: Context Fact (e.g., "rejected Vedas/Quran authority").', 'Column B: Predicted Poetic Evidence (e.g., "verses mocking pandit/mullah").', '**Verify predictions while reading the poem (Node 002):** Tick off predictions that appear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'Review c11_hin_ar_cbse_10_001\'s "Before You Read" section on Meera\'s life and the bhakti.',
          misconception: 'Students often believe a poem must tell a chronological story with characters and events (like a mini-novel) to have.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "rising action" to Meera\'s poem: identify the specific images in the middle stanza that escalate the speaker\'s renunciation of worldly.', answer: 'The middle stanza progresses from internal state to external markers: "valqou ty',
                  options: ['The middle stanza progresses from internal state to external markers: "valqou ty', 'she looks sick and removes jewelry', 'lists images without showing *progression* (e'],
                  hint: 'Review c11_hin_ar_cbse_10_001\'s "Before You Read" section on Meera\'s life and the bhakti movement\'s.',
                  misconception: 'Students often believe a poem must tell a chronological story with characters and events (like a mini-novel) to have a "plot." They miss.' }
          ],
            remediations: { 'a-poem-must-tell-a': { steps: ['Have the student read the poem aloud *three times*: first for sound, second to mark every concrete image (body.', 'Draw a 4-box storyboard: Box 1 = Speaker + Addressee; Box 2 = Internal State; Box 3 = Physical Proof; Box 4 = Final.', 'Fill each with one Hindi phrase from the poem.', 'Ask: "If this were a film scene, what would the camera show in each box?" This forces visualization of narrative beats.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a poem must tell a chronological story with characters and events (like a mini-novel) to have.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Meera\'s poem has no real narrative because nothing happens — she just says she loves Krishna." Is this a valid critique of the.', answer: 'Invalid critique',
                  options: ['Invalid critique', 'external plot events', 'narrative structure of consciousness'],
                  hint: 'Review c11_hin_ar_cbse_10_001\'s "Before You Read" section on Meera\'s life and the bhakti movement\'s.',
                  misconception: 'Students often believe a poem must tell a chronological story with characters and events (like a mini-novel) to have a "plot." They miss.' }
          ],
            remediations: { 'a-poem-must-tell-a': { steps: ['Have the student read the poem aloud *three times*: first for sound, second to mark every concrete image (body.', 'Draw a 4-box storyboard: Box 1 = Speaker + Addressee; Box 2 = Internal State; Box 3 = Physical Proof; Box 4 = Final.', 'Fill each with one Hindi phrase from the poem.', 'Ask: "If this were a film scene, what would the camera show in each box?" This forces visualization of narrative beats.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the spatial, temporal, and emotional backdrop.',
          hint: 'If stuck, review the distinction between *narrative setting* (where/when a story happens).',
          misconception: 'Students often treat "setting" in poetry as only the physical backdrop (Vrindavan, palace, forest) because prose.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the line "valqou ty lhafp&lhafp, izse&csfy cks;h" (tears flow continuously, night passes in separation) contributes to the poem\'s.', answer: 'The line establishes an atmosphere of relentless, physicalised longing',
                  options: ['The line establishes an atmosphere of relentless, physicalised longing', 'The setting is Chittor fort where Meera lived'],
                  hint: 'If stuck, review the distinction between *narrative setting* (where/when a story happens) and.',
                  misconception: 'Students often treat "setting" in poetry as only the physical backdrop (Vrindavan, palace, forest) because prose fiction trains them.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Ask the student to close their eyes and recall a moment of intense prayer or longing — "Where were *you* in that moment?', 'In the room or inside the feeling?" 2.', 'Have them underline every spatial word in the poem (xksiky, nwljks, laru, valqou, izse, nwèk) and classify each.', 'Guide them to rewrite the first stanza replacing all metaphorical spatial markers with physical ones — the absurdity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the poet\'s persona.',
          hint: 'If stuck, review "Tone and Mood in Poetry" (c11_hin_ar_cbse_10_003) and practice.',
          misconception: 'Students often treat Kabir\'s "I" in the poem as a generic devotee rather than the historical Kabir—missing that his.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the poet\'s persona as revealed',
                  options: ['Character analysis of the protagonist involves examining the poet\'s persona as revealed', 'Context and background refer to the historical, social, cultural, and biographical', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the spatial, temporal, and emotional backdrop against'],
                  hint: 'If stuck, review "Tone and Mood in Poetry" (c11_hin_ar_cbse_10_003) and practice identifying.',
                  misconception: 'Students often treat Kabir\'s "I" in the poem as a generic devotee rather than the historical Kabir—missing that his low-caste weaver.' }
          ],
            remediations: { 'students-often-treat-kabir-s': { steps: ['Have the student re-read the biographical note and underline every word describing Kabir\'s social position (julaha.', 'In the poem, circle every first-person pronoun ("esjs", "esjks", "nkfl ehjka") and ask: "Who is speaking?', 'Guide them to write one sentence linking the two: "Because Kabir was a weaver considered low-caste, his claim \'my Lord.', 'Assign a fresh PEEL paragraph using this link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'Review the "Character Analysis: Protagonist" node (c11_hin_ar_cbse_10_004) and re-read.',
          misconception: 'Students often think "supporting character analysis" means writing a mini-biography of each person (birth, death.',
          parts: [
                { id: 'a', prompt: 'Name three supporting characters mentioned in the biographical introduction of the Kabir chapter and state one factual detail about each from the text.', answer: 'Correct answer: (1) Guru Ramanand – Kabir\'s guru who initiated him into Bhakti',
                  options: ['Correct answer: (1) Guru Ramanand – Kabir\'s guru who initiated him into Bhakti', 'supporting character analysis'],
                  hint: 'Review the "Character Analysis: Protagonist" node (c11_hin_ar_cbse_10_004) and re-read the.',
                  misconception: 'Students often think "supporting character analysis" means writing a mini-biography of each person (birth, death, achievements).' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['If a student writes biographical summaries, stop them and say: "Close the book.', 'Look at the question: \'How does this character reveal Kabir?\' Now, find ONE interaction between them in the text.', 'Write that interaction down.', 'Now complete this sentence: \'This shows that Kabir is _____ because _____.\' Repeat for two more characters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea that the author explores.',
          hint: 'Review the \'Character Analysis: Protagonist\' node (c11_hin_ar_cbse_10_004) focusing.',
          misconception: 'Students conflate \'theme\' with \'moral lesson\' or \'social issue.\' They write: "The theme is caste discrimination".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme is the central, unifying idea that the author explores throughout the',
                  options: ['The primary theme is the central, unifying idea that the author explores throughout the', 'Context and background refer to the historical, social, cultural, and biographical', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the spatial, temporal, and emotional backdrop against'],
                  hint: 'Review the \'Character Analysis: Protagonist\' node (c11_hin_ar_cbse_10_004) focusing on the \'Kabir\'s.',
                  misconception: 'Students conflate \'theme\' with \'moral lesson\' or \'social issue.\' They write: "The theme is caste discrimination" or "The message is.' }
          ],
            remediations: { 'students-conflate-theme-with-moral': { steps: ['**Re-anchor**: Ask student to complete this sentence frame: "Kabir argues that because ______ (theological claim: God.', '**Color-code**: Give the prose intro and poem; use two highlighters: Yellow for \'Social Reality words\' (julaha, pandit.', '**Synthesize**: Student writes one paragraph: "The Green words *resolve* the tension created by the Yellow words by...".', '**Terminology Drill**: Practice writing "Nirguna Bhakti" and "Prem-marg" in three sentences until fluent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
