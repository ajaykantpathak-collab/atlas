import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch13_p1: SimDef = {
    id: 'v3_c12_eng_k_ch13_p1',
    title: 'A River (Poem) · Part 1/3',
    subtitle: 'The house she left keeps dying in every town she reaches',
    classLevel: 12, subject: 'eng_k', topic: 'A River (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch13'],
    nodeIds: ['c12_eng_k_cbse_13_001', 'c12_eng_k_cbse_13_002', 'c12_eng_k_cbse_13_003', 'c12_eng_k_cbse_13_004', 'c12_eng_k_cbse_13_005', 'c12_eng_k_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Confessional poetry reader', intro: 'A feminist poet returns, in verse, to the feudal house that made her — and asks what her blood remembers that she\'d rather forget.', goal: 'Read Kamala Das\'s Blood as a confessional meditation on matrilineal inheritance, female agency and unresolved guilt.' },
    discovery: {
        question: 'A great-grandmother boasts her blood is \'the oldest blood in the world — thin and clear and fine,\' while the poor bleed \'thick as gruel.\' Is the poem endorsing her pride?',
        options: ['No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'', 'Yes — aristocratic blood is real', 'It\'s about literal blood types', 'The grandmother is simply right'],
        answer: 'No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'',
        hook: '\'Blood\' is confessional poetry — a feminist voice interrogating her own inheritance. The decaying tharavad and the dying matriarch are one body; the speaker flees, feels the betrayal, and still hears \'the rattle of its death\' from every town she lives in. Inheritance is a haunting, not a keepsake.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Blood\' (Kaleidoscope, ch. 13) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the ancestral house of South Malabar: map the poem\'s three timeframes, weigh the great-grandmother\'s devotion against the speaker\'s flight, and decide if the ending offers closure — or a haunting that rides on.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Blood\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the literary term for a poem that draws directly on the poet\'s personal life, family history, and emotional conflicts, often using.', options: [
                { text: 'The term is **confessional poetry**', outcome: 'The term is **confessional poetry**. A wrong answer (e.g., "autobiographical poetry," "narrative.' },
                { text: 'autobiographical poetry', outcome: 'Not quite — Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house**.', reveals: 'students-often-read-blood-as' },
                { text: 'narrative poetry', outcome: 'Not quite — Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house**.', reveals: 'students-often-read-blood-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Blood\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "Blood" as established in the first stanza?', options: [
                { text: 'The primary physical setting is an ancestral house in South Malabar, Kerala, described as', outcome: 'The primary physical setting is an ancestral house in South Malabar, Kerala, described as three.' },
                { text: 'a modern city house', outcome: 'Not quite — Students often treat setting as a static list of places (house, sands, sea) and atmosphere as.', reveals: 'students-often-treat-setting-as' },
                { text: 'a temple', outcome: 'Not quite — Students often treat setting as a static list of places (house, sands, sea) and atmosphere as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Blood\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist/speaker in Kamala Das\'s poem "Blood," and what is their relationship to the great-grandmother?', options: [
                { text: 'The protagonist is the poet-speaker ("I"), the great-grandmother\'s great-granddaughter,', outcome: 'The protagonist is the poet-speaker ("I"), the great-grandmother\'s great-granddaughter, who.' },
                { text: 'the great-grandmother is the protagonist', outcome: 'Not quite — Students consistently identify the great-grandmother as the protagonist because she dominates the.', reveals: 'students-consistently-identify-the-great' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Blood\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Identify the two supporting characters explicitly named or referenced in the poem "Blood" by Kamala Das.', options: [
                { text: 'The two supporting characters are the great-grandmother and the speaker\'s brother', outcome: 'The two supporting characters are the great-grandmother and the speaker\'s brother.' },
                { text: 'the prince, the rats, or the snake-gods', outcome: 'Not quite — Students often treat the great-grandmother as a mere "storyteller" who provides background.', reveals: 'students-often-treat-the-great' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Blood\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the childhood promise the speaker makes to her great-grandmother in the first section of the poem?', options: [
                { text: 'The speaker promises: "When I grow old, / And very very rich / I shall rebuild the fallen', outcome: 'The speaker promises: "When I grow old, / And very very rich / I shall rebuild the fallen walls.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students consistently confuse the *great-grandmother\'s* aristocratic nostalgia with the *poem\'s*.', reveals: 'students-consistently-confuse-the-great' },
                { text: 'she promises to pray for the house', outcome: 'Not quite — Students consistently confuse the *great-grandmother\'s* aristocratic nostalgia with the *poem\'s*.', reveals: 'students-consistently-confuse-the-great' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A daughter is told she must keep the crumbling ancestral house and \'the oldest blood in the world\' — abandon her career in the city to guard the lineage.',
            decisions: [{ prompt: 'What does Kamala Das\'s \'Blood\' make of that demand?', options: [
                { text: 'It backs her break — the poem loves the house yet shows \'blood\' pride as a script that cages women; she can honour the inheritance and still refuse the role it assigns her.', outcome: 'The speaker stays haunted but leaves anyway — loyalty to memory doesn\'t mean submission to the lineage\'s demands.' },
                { text: 'She must stay — bloodline duty outranks any individual life.', outcome: 'The poem reports the great-grandmother\'s claim ironically, exposing how \'oldest blood\' talk serves the feudal order, not her.', reveals: 'tradition-outranks-person' },
                { text: 'She should go and feel nothing — attachment to an old house is irrational.', outcome: 'The poem refuses that easy exit too; the haunting is real, and denying it just hides the cost rather than paying it honestly.', reveals: 'heritage-is-irrational' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a family home as an argument about lineage, gender and guilt — and hear an ellipsis where a resolution should be.',
            decisions: [{ prompt: 'What comes next? A River (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A River (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_001', difficulty: 'standard',
          question: '\'Blood\' (Kaleidoscope, ch. 13) — the context and background to this text: who.',
          hint: 'If stuck, revisit Class 11 "Literary Devices: Imagery and Metaphor".',
          misconception: 'Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house** — missing its sharp.',
          parts: [
                { id: 'a', prompt: 'What is the literary term for a poem that draws directly on the poet\'s personal life, family history, and emotional conflicts, often using a first-person.', answer: 'The term is **confessional poetry**',
                  options: ['The term is **confessional poetry**', 'autobiographical poetry', 'narrative poetry', 'lyric poetry'],
                  hint: 'If stuck, revisit Class 11 "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_01_008) and.',
                  misconception: 'Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house** — missing its sharp critique of **caste.' }
          ],
            remediations: { 'students-often-read-blood-as': { steps: ['If a student cannot distinguish the great-grandmother\'s worldview from the poem\'s critique, do this 3-step remediation.', 'How do you know?" (Answer: "She told us" — it\'s reported speech.) (2) **List all verbs associated with the.', 'Compare agency: she *receives* and *narrates*; the speaker *acts*, *fails*, *leaves*, *haunted*, *judges herself*.', '(3) **Write a two-sentence defense of the speaker** using only poem evidence — e.g., "She tried to grow rich to save.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house** — missing its sharp.',
          parts: [
                { id: 'a', prompt: 'The poem ends with the speaker hearing the house\'s death sounds "From every town I live in" and listing what her blood remembers: "All the gems and all the.', answer: 'It is **perpetual haunting**, not closure',
                  options: ['It is **perpetual haunting**, not closure', 'closure', 'seeks forgiveness'],
                  hint: 'If stuck, revisit Class 11 "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_01_008) and.',
                  misconception: 'Students often read "Blood" as a **simple nostalgic poem about a grandmother and a decaying house** — missing its sharp critique of **caste.' }
          ],
            remediations: { 'students-often-read-blood-as': { steps: ['If a student cannot distinguish the great-grandmother\'s worldview from the poem\'s critique, do this 3-step remediation.', 'How do you know?" (Answer: "She told us" — it\'s reported speech.) (2) **List all verbs associated with the.', 'Compare agency: she *receives* and *narrates*; the speaker *acts*, *fails*, *leaves*, *haunted*, *judges herself*.', '(3) **Write a two-sentence defense of the speaker** using only poem evidence — e.g., "She tried to grow rich to save.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Blood\' — what happens, in what order, and why the.',
          hint: 'Review narrative poetry features (c6_english_u1_006) and practice identifying time shifts.',
          misconception: 'Students often read “Blood” as a simple linear autobiography from childhood to adulthood, missing the embedded.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Blood\'',
                  options: ['The plot/narrative arc of \'Blood\'', '\'Blood\' (Kaleidoscope, ch', 'The setting of \'Blood\'', 'Character analysis in \'Blood\''],
                  hint: 'Review narrative poetry features (c6_english_u1_006) and practice identifying time shifts in "King.',
                  misconception: 'Students often read “Blood” as a simple linear autobiography from childhood to adulthood, missing the embedded flashback of the.' }
          ],
            remediations: { 'students-often-read-blood-as': { steps: ['Have the student create a three‑column timeline: Column A = Stanza/Section, Column B = Time Period (Childhood.', 'Ask them to retell the poem in strict chronological order (great‑grandmother’s youth → childhood listening → death →.', 'Compare the chronological retelling with the poem’s actual order to highlight the structural reordering.', 'Re‑read the poem aloud, pausing at each voice shift, and annotate the pronouns and verb tenses that signal the change.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_003', difficulty: 'standard',
          question: 'The setting of \'Blood\' — the place, time and atmosphere the text creates.',
          hint: 'Review Class 11 poetry nodes on imagery and atmosphere (e.g., c11_eng_h_cbse_01_008.',
          misconception: 'Students often treat setting as a static list of places (house, sands, sea) and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the atmosphere changes from the great-grandmother\'s recollections to the poet\'s adult perspective.', answer: 'The atmosphere begins with a nostalgic, almost regal pride',
                  options: ['The atmosphere begins with a nostalgic, almost regal pride', 'wearied by compromise', 'rattle of death', 'plucked your soul / Like a pip from a fruit'],
                  hint: 'Review Class 11 poetry nodes on imagery and atmosphere (e.g., c11_eng_h_cbse_01_008.',
                  misconception: 'Students often treat setting as a static list of places (house, sands, sea) and atmosphere as a single adjective ("sad").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read the poem with three coloured pens: one for physical setting details, one for temporal markers.', 'Ask them to draw a simple timeline of the house\'s life and mark the atmosphere at each stage.', 'Then assign a focused re-diagnostic: "Pick one stanza and explain how its sensory details create a specific atmosphere.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_004', difficulty: 'standard',
          question: 'Character analysis in \'Blood\' — the central figure(s), their traits, and how.',
          hint: 'Review c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) — the "A Photograph".',
          misconception: 'Students consistently identify the great-grandmother as the protagonist because she dominates the middle stanzas with.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "unreliable narrator" or "persona" to this poem: Is the speaker\'s childhood promise to rebuild the house sincere, performative,.', answer: 'The promise is sincerely naive',
                  options: ['The promise is sincerely naive', 'ignores the great-grandmother\'s reaction ('],
                  hint: 'Review c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) — the "A Photograph" speaker.',
                  misconception: 'Students consistently identify the great-grandmother as the protagonist because she dominates the middle stanzas with vivid storytelling.' }
          ],
            remediations: { 'students-consistently-identify-the-great': { steps: ['Have the student reread only the first-person lines ("When we were children," "When I grow old," "I looked deep," "I.', 'Ask: "Whose consciousness holds the poem together?" 3.', 'Compare with c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) where the speaker in "A Photograph" is similarly.', 'Re-attempt DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_005', difficulty: 'standard',
          question: 'Supporting characters in \'Blood\' — the secondary figures who move the story.',
          hint: 'If stuck, review the "Character Analysis: Supporting Characters" node from Class 11.',
          misconception: 'Students often treat the great-grandmother as a mere "storyteller" who provides background information, missing that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Blood\'',
                  options: ['Supporting characters in \'Blood\'', '\'Blood\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Blood\'', 'The setting of \'Blood\''],
                  hint: 'If stuck, review the "Character Analysis: Supporting Characters" node from Class 11.',
                  misconception: 'Students often treat the great-grandmother as a mere "storyteller" who provides background information, missing that she *is* the.' }
          ],
            remediations: { 'students-often-treat-the-great': { steps: ['Reread the poem focusing *only* on lines spoken by or about the great-grandmother.', 'Mark each line with "G" and ask: What does this reveal about her values, her blindness, her power?', 'Do the same for the brother (mark "B").', 'Notice how few marks exist — then infer why the poet chose that silence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of \'Blood\' — the central idea the whole text returns to.',
          hint: 'If stuck on speaker vs poet: revisit c11_eng_w_cbse_01_006 (Theme: Primary Theme and.',
          misconception: 'Students consistently confuse the *great-grandmother\'s* aristocratic nostalgia with the *poem\'s* primary theme.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "thematic anchor" to the image of the elephant ride. How does this single memory support the primary theme of aristocratic loss?', answer: 'Step 1: Locate the elephant ride in stanza 3',
                  options: ['Step 1: Locate the elephant ride in stanza 3', 'she went to temple on an elephant'],
                  hint: 'If stuck on speaker vs poet: revisit c11_eng_w_cbse_01_006 (Theme: Primary Theme and Message.',
                  misconception: 'Students consistently confuse the *great-grandmother\'s* aristocratic nostalgia with the *poem\'s* primary theme.' }
          ],
            remediations: { 'students-consistently-confuse-the-great': { steps: ['Re-read only the first and last stanzas aloud — ignore the middle. Ask: "Who is speaking? What do they feel?"', 'List every "I" statement in the poem. Sort them: childhood "I" vs adult "I".', 'Write one sentence: "The poem is about ______ realising ______." Fill blanks with the speaker\'s name and the specific.', 'Compare this sentence to the great-grandmother\'s stories. The gap between them IS the theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
