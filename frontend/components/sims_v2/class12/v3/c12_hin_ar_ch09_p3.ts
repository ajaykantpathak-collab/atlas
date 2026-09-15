import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p3',
    title: 'tSusanz dekj · Part 3/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'tSusanz dekj · Part 3/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_013', 'c12_hin_ar_cbse_09_014', 'c12_hin_ar_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in poetry analysis is the systematic process of examining a poem\'s structural elements (form, imagery, symbolism, rhythm) and thematic layers to construct an evidence-based.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "How does the poet use the image of the \'map\' and the \'birds\' courtyard\' to critique colonial land.',
            decisions: [{ prompt: 'What is the primary difference between *literal comprehension* (node 012) and *critical interpretation* of a poem?', options: [
                { text: 'Literal comprehension answers "what happens in the poem?" (plot, surface meaning)', outcome: 'Literal comprehension answers "what happens in the poem?" (plot, surface meaning).' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means finding *more* literary devices (simile, metaphor.', reveals: 'critical-analysis-means-finding-more' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit down to write a 6-mark answer on "How does the poet use the forest metaphor to depict the creative process in \'NksVk esjk [ksr\'?" and your mind.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the poem in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'link to theme', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the poem in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a CUET group discussion where the prompt is: "Both poems in Chapter 9 use bird imagery but convey opposite emotional states — discuss." You.',
            decisions: [{ prompt: 'What is the fundamental difference in how bird imagery functions in "NksVk esjk [ksr" versus "cxqyksa d ia[k"?', options: [
                { text: 'Correct answer: In "NksVk esjk [ksr" the poem itself is metaphorically a bird (the', outcome: 'Correct answer: In "NksVk esjk [ksr" the poem itself is metaphorically a bird (the creative work.' },
                { text: 'both poems use birds as symbols of freedom', outcome: 'Not quite — Students believe "discussion points" means preparing a monologue of memorized thematic points and.', reveals: 'discussion-points-means-preparing-a' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" means preparing a monologue of memorized thematic points and.', reveals: 'discussion-points-means-preparing-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_013', difficulty: 'standard',
          question: 'Critical thinking in poetry analysis is the systematic process of examining.',
          hint: 'If stuck on device identification: revisit node 008 (imagery) and 009 (symbolism) with.',
          misconception: 'Students believe "critical analysis" means finding *more* literary devices (simile, metaphor, alliteration) and listing.',
          parts: [
                { id: 'a', prompt: 'Compare the symbol of "land" in both poems. How does the shift from "खेत" (field) in Poem 1 to "आँगन" (courtyard) in Poem 2 reframe the concept of belonging?', answer: '"खेत" is public, productive, contested terrain',
                  options: ['"खेत" is public, productive, contested terrain', 'critical analysis'],
                  hint: 'If stuck on device identification: revisit node 008 (imagery) and 009 (symbolism) with.',
                  misconception: 'Students believe "critical analysis" means finding *more* literary devices (simile, metaphor, alliteration) and listing them.' }
          ],
            remediations: { 'critical-analysis-means-finding-more': { steps: ['If the student defaults to device-listing: Step 1 — Give them a 6-mark board answer written in device-list style and.', 'Step 2 — Have them rewrite the device-list answer by adding "This suggests..." after every device mention, forcing.', 'Step 3 — Assign a micro-task: analyze *only* the first stanza of "नक्शा मेरा खेत" using PEEL, focusing on *one* device.', 'Step 4 — Re-diagnose with Diagnostic Question 4 (comparative symbol analysis) to verify they can now synthesize across.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means finding *more* literary devices (simile, metaphor, alliteration) and listing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student thesis: "Makhanlal Chaturvedi\'s poems are primarily about nature\'s beauty." Defend or refute using evidence from both poems.', answer: 'Refute',
                  options: ['Refute', 'critical analysis'],
                  hint: 'If stuck on device identification: revisit node 008 (imagery) and 009 (symbolism) with.',
                  misconception: 'Students believe "critical analysis" means finding *more* literary devices (simile, metaphor, alliteration) and listing them.' },
                { id: 'b', prompt: 'Create a 4-line stanza in Hindi that uses *one* device from Poem 1 (repetition/anaphora) and *one* device from Poem 2 (onomatopoeia/kinetic imagery) to express.', answer: '**Sample:** मेरा आँगन, मेरा आँगन',
                  options: ['**Sample:** मेरा आँगन, मेरा आँगन', 'critical analysis'],
                  hint: 'If stuck on device identification: revisit node 008 (imagery) and 009 (symbolism) with.',
                  misconception: 'Students believe "critical analysis" means finding *more* literary devices (simile, metaphor, alliteration) and listing them.' }
          ],
            remediations: { 'critical-analysis-means-finding-more': { steps: ['If the student defaults to device-listing: Step 1 — Give them a 6-mark board answer written in device-list style and.', 'Step 2 — Have them rewrite the device-list answer by adding "This suggests..." after every device mention, forcing.', 'Step 3 — Assign a micro-task: analyze *only* the first stanza of "नक्शा मेरा खेत" using PEEL, focusing on *one* device.', 'Step 4 — Re-diagnose with Diagnostic Question 4 (comparative symbol analysis) to verify they can now synthesize across.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (Imagery and Metaphor) and re-do the "device →.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Conclusion', 'link to theme', 'writing skills based on the chapter'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (Imagery and Metaphor) and re-do the "device → effect".',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all poetic devices they.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a device-list answer: (1) Return it ungraded with one comment: "Where is the *effect* of each.', '(3) Have them redo *only one stanza* filling all three columns.', '(4) Next session, give a fresh 4-mark question and require a full PEEL paragraph — if they revert to listing, repeat.', 'Mastery is reached when they produce two consecutive PEEL paragraphs without prompting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (imagery) and c12_hin_ar_cbse_09_013 (critical.',
          misconception: 'Students believe "discussion points" means preparing a monologue of memorized thematic points and reciting them.',
          parts: [
                { id: 'a', prompt: 'During a discussion, a peer claims: "The line \'dYiuk osQ jlk;uksa dks ih / cht xy x;k fu%\'ks"k_\' proves the poet sees creativity as effortless inspiration.".', answer: 'Correct response: "I hear you',
                  options: ['Correct response: "I hear you', 'discussion points'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (imagery) and c12_hin_ar_cbse_09_013 (critical thinking).',
                  misconception: 'Students believe "discussion points" means preparing a monologue of memorized thematic points and reciting them sequentially.' }
          ],
            remediations: { 'discussion-points-means-preparing-a': { steps: ['If a student exhibits the monologue misconception: (1) Play a 60-second video of a Band 5 ASL discussion (available.', '(2) Give the student a "Discussion Move Menu" card with 5 sentence stems: "Building on [name]\'s point about X...", "I.', '(4) Debrief: "Which stem felt most unnatural?', 'That\'s your growth edge — practice it 5 times before the next session."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
