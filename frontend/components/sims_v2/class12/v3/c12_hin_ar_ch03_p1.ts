import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p1',
    title: 'j?kqohj lgk; · Part 1/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'j?kqohj lgk; · Part 1/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_001', 'c12_hin_ar_cbse_03_002', 'c12_hin_ar_cbse_03_003', 'c12_hin_ar_cbse_03_004', 'c12_hin_ar_cbse_03_005', 'c12_hin_ar_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory literary skill where students examine the author\'s biography, historical period, literary movement, and thematic concerns before engaging.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are meeting a new friend — you\'d want to know where they grew up, what shaped their thinking, and what matters to them before you truly understand.',
            decisions: [{ prompt: 'Name the literary movement associated with Jaishankar Prasad and identify its one defining characteristic that distinguishes it from.', options: [
                { text: 'Jaishankar Prasad is associated with Nayi Kavita (New Poetry), specifically the Prayogvad', outcome: 'Jaishankar Prasad is associated with Nayi Kavita (New Poetry), specifically the Prayogvad.' },
                { text: 'Chhayavad', outcome: 'Not quite — Students treat "context" as a static list of facts (birth date, awards, movement name) to.', reveals: 'students-treat-context-as-a' },
                { text: 'Pragativad', outcome: 'Not quite — Students treat "context" as a static list of facts (birth date, awards, movement name) to.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are reading "ckr lh/h Fkh ij" and feel the poem jumps suddenly from a word slipping away to the poet chasing it like a mischievous child — you.',
            decisions: [{ prompt: 'What is the primary structural difference between a linear narrative poem and a lyrical poem like "dfork ds cgkus" in terms of how.', options: [
                { text: 'A linear narrative poem follows a chronological cause-effect sequence (exposition →', outcome: 'A linear narrative poem follows a chronological cause-effect sequence (exposition → climax →.' },
                { text: 'both have a beginning, middle, end', outcome: 'Not quite — Students believe **\'narrative structure\' only applies to story-poems with clear characters and.', reveals: 'narrative-structure-only-applies-to' },
                { text: 'dfork ds cgkus', outcome: 'Not quite — Students believe **\'narrative structure\' only applies to story-poems with clear characters and.', reveals: 'narrative-structure-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re listening to a friend describe a vivid dream where objects talk and abstract ideas take human form — you\'d naturally ask, "Who else was there?',
            decisions: [{ prompt: 'In "Poetry\'s Shore" (dfork ds cgkus), which entity is explicitly described as the one for whom poetry is a \'mother\'s lap\' (mM+ku) and.', options: [
                { text: 'The poem states poetry is a mother\'s lap for the \'old\' (fpfM+;k) and a game for', outcome: 'The poem states poetry is a mother\'s lap for the \'old\' (fpfM+;k) and a game for \'children\' (cPps).' },
                { text: 'poems lack \'characters\'', outcome: 'Not quite — Students believe poems lack \'characters\' because no names or dialogues exist.', reveals: 'poems-lack-characters-because-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are trying to explain to a younger sibling why poetry matters — not just as a school subject, but as something humans do from infancy to old age.',
            decisions: [{ prompt: 'What is the central metaphor used in the first poem ("dfork ds cgkus") to describe poetry\'s role across the human lifespan?', options: [
                { text: 'The central metaphor is poetry as a physical support/play structure that changes with', outcome: 'The central metaphor is poetry as a physical support/play structure that changes with age: a cradle.' },
                { text: 'poetry is a teacher', outcome: 'Not quite — Students often treat the two poems as separate, unrelated pieces — writing one paragraph on "poetry.', reveals: 'students-often-treat-the-two' },
                { text: 'poetry is a weapon', outcome: 'Not quite — Students often treat the two poems as separate, unrelated pieces — writing one paragraph on "poetry.', reveals: 'students-often-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? j?kqohj lgk; · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — j?kqohj lgk; · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory literary skill where.',
          hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node.',
          misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Compare the treatment of "language" in the two poems: "कविता के गुस्से" (where words are playthings) and "बात लह/ख थी" (where language fails to capture.', answer: 'In "कविता के गुस्से", language is material to mould',
                  options: ['In "कविता के गुस्से", language is material to mould', 'about language'],
                  hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark question.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Have the student re-read the NCERT "वककजसग" (introductory note) and underline every phrase linking Prasad\'s *life*.', 'For each underlined phrase, ask: "Which line in the poem does this explain?" — force a textual match.', 'Assign a 3-sentence writing task: "Explain how Prasad\'s journalism shapes the dialogue structure in \'बात लह/ख थी\'."', 'Re-diagnose using Diagnostic Question 2 — the student must now produce a historically grounded prediction, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Jaishankar Prasad\'s \'बात लह/ख थी\' is a poem about the impossibility of communication." Support your judgement with two textual reasons.', answer: 'The claim is *partially true but incomplete*',
                  options: ['The claim is *partially true but incomplete*', 'yes, it\'s about impossibility', 'no, they communicate'],
                  hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark question.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Have the student re-read the NCERT "वककजसग" (introductory note) and underline every phrase linking Prasad\'s *life*.', 'For each underlined phrase, ask: "Which line in the poem does this explain?" — force a textual match.', 'Assign a 3-sentence writing task: "Explain how Prasad\'s journalism shapes the dialogue structure in \'बात लह/ख थी\'."', 'Re-diagnose using Diagnostic Question 2 — the student must now produce a historically grounded prediction, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in poetry refers to the organized sequence.',
          hint: 'If stuck, review the Class 11 poem "ckrsa" (c11_hin_v_cbse_01_002) — it has a clear.',
          misconception: 'Students believe **\'narrative structure\' only applies to story-poems with clear characters and events** — so they.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of *narrative perspective* to "ckr lh/h Fkh ij": Who is the narrator, and how does the shift from third-person observation ("ckr lh/h Fkh.', answer: 'The poem begins with a *detached, almost folkloric narrator* ("ckr lh/h Fkh ij")',
                  options: ['The poem begins with a *detached, almost folkloric narrator* ("ckr lh/h Fkh ij")', 'dfork ds cgkus'],
                  hint: 'If stuck, review the Class 11 poem "ckrsa" (c11_hin_v_cbse_01_002) — it has a clear narrative arc.',
                  misconception: 'Students believe **\'narrative structure\' only applies to story-poems with clear characters and events** — so they dismiss "dfork ds cgkus".' }
          ],
            remediations: { 'narrative-structure-only-applies-to': { steps: ['**Revisit the two poems with a structural lens only** — ignore theme, imagery, vocabulary.', 'Use a 3-column table: *Stanza/Section | Narrative Phase (Exposition/Rising/Climax/etc.) | Function (What does this.', '**Map "dfork ds cgkus" as a 3-step argument**: Proposition (poetry = mother\'s lap) → Expansion (poetry = elders\' play).', 'Notice each stanza *adds a subject* (mother → elders → children) — that *addition* is the narrative engine.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment — whether.',
          hint: 'Review Class 11 poem analysis (c11_hin_ar_cbse_03_003) focusing on how setting.',
          misconception: 'Students often treat setting as merely "where the poem happens" and atmosphere as a simple adjective like "sad".',
          parts: [
                { id: 'a', prompt: 'Identify two concrete images from "ckr lh/h Fkh ij" that establish the setting of "bhasha ke dar par" (at the door of language).', answer: 'Images: (1) "Bhasha ke paddh mein" (at language\'s door)',
                  options: ['Images: (1) "Bhasha ke paddh mein" (at language\'s door)', 'vichar', 'picks abstract nouns (e'],
                  hint: 'Review Class 11 poem analysis (c11_hin_ar_cbse_03_003) focusing on how setting is established.',
                  misconception: 'Students often treat setting as merely "where the poem happens" and atmosphere as a simple adjective like "sad" or "happy".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Revisit Class 11 node c11_hin_ar_cbse_03_003 (Setting and Atmosphere) and re-do the graphic organizer: column 1.', 'Pick a simple Hindi poem (e.g., from Class 10) and practice the 4-step aloud reading: (a) mark place/time words, (b).', 'Return to this node and re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the.',
          hint: 'If stuck, revisit the distinction between \'poet\' and \'speaker\' using the Class 11 node.',
          misconception: 'Students often treat the poet-speaker as either (a) a fully fictional character like in a story, ignoring that the \'I\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the speaker\'s persona',
                  options: ['Character analysis of the protagonist in poetry involves examining the speaker\'s persona', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and Narrative Structure in poetry refers to the organized sequence of events, ideas,', 'Setting in poetry refers to the time, place, and social environment'],
                  hint: 'If stuck, revisit the distinction between \'poet\' and \'speaker\' using the Class 11 node.',
                  misconception: 'Students often treat the poet-speaker as either (a) a fully fictional character like in a story, ignoring that the \'I\' is a deliberate.' }
          ],
            remediations: { 'students-often-treat-the-poet': { steps: ['Have the student re-read both poems *only* marking first-person statements ("मैं", "मेरे", implied "I") and.', 'Ask: "If you didn\'t know the poet\'s name, what kind of person would you imagine from these words alone?" List 5.', 'Practice the PEEL structure on one trait using the worked example as a template.', 'Re-attempt Diagnostic Question 4 to test if the shift from external to internal is now visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in poetry are personified entities, metaphorical figures.',
          hint: 'If stuck, review Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_005) where Nirala\'s poems.',
          misconception: 'Students believe poems lack \'characters\' because no names or dialogues exist.',
          parts: [
                { id: 'a', prompt: 'In "Poetry\'s Shore" (dfork ds cgkus), which entity is explicitly described as the one for whom poetry is a \'mother\'s lap\' (mM+ku) and a \'game\' ([ksy)?', answer: 'The poem states poetry is a mother\'s lap for the \'old\' (fpfM+;k) and a game for',
                  options: ['The poem states poetry is a mother\'s lap for the \'old\' (fpfM+;k) and a game for', 'poems lack \'characters\''],
                  hint: 'If stuck, review Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_005) where Nirala\'s poems use clouds.',
                  misconception: 'Students believe poems lack \'characters\' because no names or dialogues exist.' },
                { id: 'b', prompt: 'Apply the \'Removal Test\' to the Snake (isap) in "On the Half-baked Word": If the snake were deleted from the poem, what specific consequence would the.', answer: 'Without the snake, the speaker\'s violent rejection (gkj dj',
                  options: ['Without the snake, the speaker\'s violent rejection (gkj dj', 'poems lack \'characters\''],
                  hint: 'If stuck, review Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_005) where Nirala\'s poems use clouds.',
                  misconception: 'Students believe poems lack \'characters\' because no names or dialogues exist.' }
          ],
            remediations: { 'poems-lack-characters-because-no': { steps: ['Have the student read both poems aloud, circling every noun that performs a verb (e.g., \'ckr us [ksy jgh Fkh\', \'isap.', 'For each circled noun, ask: "Does this thing have a choice?', 'Does it change the speaker?" 3.', 'Revisit Class 11 node c11_hin_ar_cbse_03_005 (Character Analysis: Supporting Characters) to review personification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, return to c12_hin_ar_cbse_03_002 (narrative structure) and map each poem\'s.',
          misconception: 'Students often treat the two poems as separate, unrelated pieces — writing one paragraph on "poetry as play" and.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why the poet says "dfork Hkh \'kCnksa dk [ksy gS" (poetry is also a game of words) and what "lhekvksa osQ ca/u [kqn&c&[kqn VwV tkrs.', answer: 'The poet calls poetry a "game of words"',
                  options: ['The poet calls poetry a "game of words"', 'entertainment'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_03_002 (narrative structure) and map each poem\'s "turn".',
                  misconception: 'Students often treat the two poems as separate, unrelated pieces — writing one paragraph on "poetry as play" and another on "language.' }
          ],
            remediations: { 'students-often-treat-the-two': { steps: ['If a student cannot synthesize the two poems, guide them through this 3-step remediation: (1) Re-read the introductory.', 'lhekvksa osQ ca/u [kqn&c&[kqn VwV tkrs gSa" — have the student underline every word that appears in both poems (e.g.', '(2) Create a two-column table: Column A = images/actions from Poem 1 (cradle, swing, game, players), Column.', '(3) Ask: "Which column shows the *attempt* and which shows the *release*?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
