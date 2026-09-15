import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p1',
    title: 'tSusanz dekj · Part 1/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'tSusanz dekj · Part 1/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_001', 'c12_hin_ar_cbse_09_002', 'c12_hin_ar_cbse_09_003', 'c12_hin_ar_cbse_09_004', 'c12_hin_ar_cbse_09_005', 'c12_hin_ar_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading section that introduces the author Mekhala Thakur (born 1911), her literary significance in modern Hindi poetry, the historical backdrop.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you open your Hindi textbook to Chapter 9 and see two poems with strange titles: "Nakshe" and "Chitrakala".',
            decisions: [{ prompt: 'Who is the author of the poems "Nakshe" and "Chitrakala" in Class 12 Hindi Aroh Chapter 9, and what is her birth year and place of birth.', options: [
                { text: 'The author is Mekhala Thakur (mek\'kadj tks\'kh), born in 1911 in Lyallpur (xqtjkr)', outcome: 'The author is Mekhala Thakur (mek\'kadj tks\'kh), born in 1911 in Lyallpur (xqtjkr), which is now.' },
                { text: 'a different poet like Nirala or Mahadevi Verma, or giving the wrong birth year', outcome: 'Not quite — Students treat the "Before You Read" box as optional background trivia and skip it, believing the.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re given a poem that doesn\'t tell a story with characters but instead builds a map of the poet\'s mind — how would you find its "plot"?',
            decisions: [{ prompt: 'In the poem "नक्शे मेरे घर", what does the "map" (नक्शा) primarily function as in the poem\'s narrative structure?', options: [
                { text: 'The map functions as an extended metaphor for the poetic draft', outcome: 'The map functions as an extended metaphor for the poetic draft — a provisional, evolving blueprint.' },
                { text: 'it shows the poet\'s actual house layout', outcome: 'Not quite — Students treat poetic "narrative structure" as identical to prose plot (exposition → rising action.', reveals: 'students-treat-poetic-narrative-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your grandmother\'s kitchen during a monsoon afternoon — the smell of frying pakoras, the sound of rain on the tin roof, the dim yellow.',
            decisions: [{ prompt: 'In the poem "नक्षत्र मेरा घर", the line "dkx”k dk ,d iÂk] dksbZ vaèkM+ dgha ls vk;k" uses the word "iÂk" (corner/nook).', options: [
                { text: 'The word "iÂk" establishes the **spatial intimacy and smallness** of the physical setting', outcome: 'The word "iÂk" establishes the **spatial intimacy and smallness** of the physical setting —.' },
                { text: 'it shows the time is night', outcome: 'Not quite — Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate.', reveals: 'students-treat-setting-as-a' },
                { text: 'it creates a scary atmosphere', outcome: 'Not quite — Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are reading "नक्षत्र मेरा सिर" for the first time and you ask: "Who is this \'मैं\' who feels a meteor strike their head and then watches words rise.',
            decisions: [{ prompt: 'In "नक्षत्र मेरा सिर," what is the very first action the poetic persona describes experiencing?', options: [
                { text: 'Correct answer: "कोई उल्का कहीं से आया / सिर का चाँद वहाँ टिका हुआ था"', outcome: 'Correct answer: "कोई उल्का कहीं से आया / सिर का चाँद वहाँ टिका हुआ था" — the persona experiences.' },
                { text: 'the poet writes a poem', outcome: 'Not quite — Students routinely equate the poetic persona with the historical poet Muktibodh, writing answers.', reveals: 'students-routinely-equate-the-poetic' },
                { text: 'words emerge', outcome: 'Not quite — Students routinely equate the poetic persona with the historical poet Muktibodh, writing answers.', reveals: 'students-routinely-equate-the-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a play where the main actor (the poet) talks to a seed and a flock of birds as if they were co-actors — they reply, resist, and.',
            decisions: [{ prompt: 'In "NksVk esjk [ksr", which non-human entity is explicitly described as being sown like a seed in the poet\'s head, and what does.', options: [
                { text: 'The entity is a "cht" (seed/sprout)', outcome: 'The entity is a "cht" (seed/sprout) which grows into a "fo\'ks"k" (poem/creative work).' },
                { text: 'the poet\'s thought', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in stories.', reveals: 'character-analysis-only-applies-to' },
                { text: 'an idea', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in stories.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the question asks: "What is the central idea of the chapter \'NksVk esjk [ksr\'?" Most students panic and write.',
            decisions: [{ prompt: 'What is the central metaphor in the first poem "NksVk esjk [ksr" and what does it represent?', options: [
                { text: 'The central metaphor is the seed (poem) growing in the field (poet\'s mind) through the', outcome: 'The central metaphor is the seed (poem) growing in the field (poet\'s mind) through the agency of.' },
                { text: 'the poem is about farming', outcome: 'Not quite — Students conflate *theme* with *subject* or *summary*. For this chapter, they write: "The theme.', reveals: 'students-conflate-theme-with-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'What comes next? tSusanz dekj · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — tSusanz dekj · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading section that.',
          hint: 'If stuck, review the "Before You Read" section of Class 11 Chapter 12.',
          misconception: 'Students treat the "Before You Read" box as optional background trivia and skip it, believing the poems are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a pre-reading section that introduces the',
                  options: ['"Before You Read: Context and Background" is a pre-reading section that introduces the', 'Plot and narrative structure in poetry refers to the organized sequence of images, ideas,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s', 'Character analysis of the protagonist in poetry refers to the systematic examination of'],
                  hint: 'If stuck, review the "Before You Read" section of Class 11 Chapter 12 (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat the "Before You Read" box as optional background trivia and skip it, believing the poems are self-contained.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['Have the student re-read *only* the grey box (not the poems) and underline three proper nouns: Mekhala Thakur, 1947.', 'Ask: "What does each noun tell you about the poet\'s world?" 3.', 'Map answers to the two titles: Partition → "Nakshe" (lost geography); Hamsun\'s hunger → "Chitrakala" (art as survival).', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'Review "extended metaphor as structural backbone" in c11_hin_ar_cbse_01_002 (Class 11.',
          misconception: 'Students treat poetic "narrative structure" as identical to prose plot (exposition → rising action → climax →.',
          parts: [
                { id: 'a', prompt: 'In the poem "नक्शे मेरे घर", what does the "map" (नक्शा) primarily function as in the poem\'s narrative structure?', answer: 'The map functions as an extended metaphor for the poetic draft',
                  options: ['The map functions as an extended metaphor for the poetic draft', 'it shows the poet\'s actual house layout'],
                  hint: 'Review "extended metaphor as structural backbone" in c11_hin_ar_cbse_01_002 (Class 11 Poetry.',
                  misconception: 'Students treat poetic "narrative structure" as identical to prose plot (exposition → rising action → climax → resolution) and force the.' }
          ],
            remediations: { 'students-treat-poetic-narrative-structure': { steps: ['Have the student re-read only the first poem, numbering stanzas 1–6.', 'Ask: "What *action* happens in each stanza?" (Answer: mapping, interruption, brick-laying, word-forging.', 'Draw a 6-box flowchart labeling each stanza\'s *function in the metaphor*, not its plot event.', 'Re-attempt Diagnostic Question 5 with the flowchart.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment where the.',
          hint: 'If unable to separate sensory detail from emotional label, revisit Class 11 "Imagery and.',
          misconception: 'Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate adjective** (sad.',
          parts: [
                { id: 'a', prompt: 'Both poems open with a repeated phrase: "NksVk esjk [ksr" (six times) and "cxqyksa d ia[k" (five times).', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'yes, it only emphasizes setting'],
                  hint: 'If unable to separate sensory detail from emotional label, revisit Class 11 "Imagery and Metaphor".',
                  misconception: 'Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate adjective** (sad, happy, scary) they.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['**Re-read both poems aloud** with a pencil, marking **only sensory words** (see/hear/smell/touch/taste) — ignore.', '**Sort the marked words** into two columns: "Physical Detail" (e.g., "cknyksa", "iQy", "NkbZ") and "Emotional Charge".', 'Draw arrows from each physical detail to the emotional charge it carries.', '**Revisit Class 11 node c11_hin_ar_cbse_09_008 (Imagery and Metaphor)** — re-do the "sensory clustering" exercise there.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry refers to the systematic.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_09_004 (Character Analysis: Protagonist) and practice.',
          misconception: 'Students routinely equate the poetic persona with the historical poet Muktibodh, writing answers like "Muktibodh feels.',
          parts: [
                { id: 'a', prompt: 'In "नक्षत्र मेरा सिर," what is the very first action the poetic persona describes experiencing? Answer in one sentence using the poem\'s exact phrasing.', answer: 'Correct answer: "कोई उल्का कहीं से आया / सिर का चाँद वहाँ टिका हुआ था"',
                  options: ['Correct answer: "कोई उल्का कहीं से आया / सिर का चाँद वहाँ टिका हुआ था"', 'the poet writes a poem', 'words emerge'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_09_004 (Character Analysis: Protagonist) and practice on.',
                  misconception: 'Students routinely equate the poetic persona with the historical poet Muktibodh, writing answers like "Muktibodh feels a meteor hit his.' }
          ],
            remediations: { 'students-routinely-equate-the-poetic': { steps: ['If a student conflates poet and persona: Step 1 — Have them list 5 facts about Muktibodh\'s life (Marxist, professor.', 'Step 2 — Ask: "Which list appears in the poem?" Only the second.', 'Step 3 — Assign a 5-minute free-write: "Write a poem where \'I\' am a tree.', 'Why did you choose that metaphor?" Step 4 — Re-read both poems marking every metaphor the *speaker chooses* about.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves identifying.',
          hint: 'Review "personification vs. metaphor" distinction from Class 11 Literary Devices node.',
          misconception: 'Students believe "character analysis" only applies to human figures in stories.',
          parts: [
                { id: 'a', prompt: 'In "NksVk esjk [ksr", which non-human entity is explicitly described as being sown like a seed in the poet\'s head, and what does it eventually become?', answer: 'The entity is a "cht" (seed/sprout)',
                  options: ['The entity is a "cht" (seed/sprout)', 'the poet\'s thought', 'an idea', 'character analysis'],
                  hint: 'Review "personification vs. metaphor" distinction from Class 11 Literary Devices node.',
                  misconception: 'Students believe "character analysis" only applies to human figures in stories.' },
                { id: 'b', prompt: 'Analyze the relationship between the wind (lk¡>) and the birds (cxqyks) in "cxqyksa d ia[k".', answer: 'The wind plays a "flute" (lrst \'osr)',
                  options: ['The wind plays a "flute" (lrst \'osr)', 'wind comforts birds', 'gkSys gkSys tkrh eq>s ck¡èk fut ek;k ls', 'character analysis'],
                  hint: 'Review "personification vs. metaphor" distinction from Class 11 Literary Devices node.',
                  misconception: 'Students believe "character analysis" only applies to human figures in stories.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['Revisit c12_hin_ar_cbse_09_004 (Protagonist Analysis) to recall how the speaker is characterized through actions — then.', 'Reread both poems marking every verb attached to the seed/birds/wind (e.g., "cks;k", "xy x;k", "ia[k", "Nk;k", "dk;k").', 'For each verb, ask: "If a human did this, what would it reveal about them?" Write one sentence per verb.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and 4 using this verb-list method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "character analysis" only applies to human figures in stories.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The supporting characters in both poems are merely metaphors for the poet\'s emotions; they have no independent agency." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'character analysis', '"character analysis" only applies to human figures in stories'],
                  hint: 'Review "personification vs. metaphor" distinction from Class 11 Literary Devices node.',
                  misconception: 'Students believe "character analysis" only applies to human figures in stories.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['Revisit c12_hin_ar_cbse_09_004 (Protagonist Analysis) to recall how the speaker is characterized through actions — then.', 'Reread both poems marking every verb attached to the seed/birds/wind (e.g., "cks;k", "xy x;k", "ia[k", "Nk;k", "dk;k").', 'For each verb, ask: "If a human did this, what would it reveal about them?" Write one sentence per verb.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and 4 using this verb-list method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, revisit "Literary Devices: Imagery and Metaphor" (c11_hin_ar_cbse_09_008) and.',
          misconception: 'Students conflate *theme* with *subject* or *summary*. For this chapter, they write: "The theme is a poet writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" is a pre-reading section that introduces the', 'Plot and narrative structure in poetry refers to the organized sequence of images, ideas,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, revisit "Literary Devices: Imagery and Metaphor" (c11_hin_ar_cbse_09_008) and practice.',
                  misconception: 'Students conflate *theme* with *subject* or *summary*. For this chapter, they write: "The theme is a poet writing a poem" or "The theme.' }
          ],
            remediations: { 'students-conflate-theme-with-subject': { steps: ['If the student cannot distinguish theme from summary: 1) Have them reread the first stanza of Poem 1 and ask: "Is the.', 'What is the *real* subject?" 2) Give them three one-sentence statements — one summary, one subject, one theme — and ask.', '3) Assign node c11_hin_ar_cbse_09_006 (Class 11 Theme node) for review of the theme-statement formula: "Topic + Poet\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
