import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p3',
    title: 'छोटा मेरा खेत, बगुलों के पंख · Part 3/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'छोटा मेरा खेत, बगुलों के पंख · Part 3/3',
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
        { title: 'छोटा मेरा खेत, बगुलों के पंख — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'आरोह भाग-2 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_014', title: 'छोटा मेरा खेत, बगुलों के पंख — परीक्षा-उत्तर लेखन कौशल',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the poem in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'link to theme', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the poem in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_015', title: 'छोटा मेरा खेत, बगुलों के पंख — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
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
          question: '\'आरोह भाग-2 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'अगर बिंब/प्रतीक में उलझे हो तो c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) का \'बिंब बनाम.',
          misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण में \'कठिन शब्दों के अर्थ\' लिखने से अंक मिलते हैं — इसलिए वे \'पदावली\' रटते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-2 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर बिंब/प्रतीक में उलझे हो तो c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) का \'बिंब बनाम प्रतीक\'.',
                  misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण में \'कठिन शब्दों के अर्थ\' लिखने से अंक मिलते हैं — इसलिए वे \'पदावली\' रटते हैं और परीक्षा में वही उगल देते.' }
          ],
            remediations: { 'cbse-2023-24-0': { steps: ['चरण 1: छात्र को c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ) और c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) दोबारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_014', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (Imagery and Metaphor) and re-do the "device →.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Conclusion', 'link to theme', 'writing skills based on the chapter'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (Imagery and Metaphor) and re-do the "device → effect".',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all poetic devices they.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a device-list answer: (1) Return it ungraded with one comment: "Where is the *effect* of each.', '(3) Have them redo *only one stanza* filling all three columns.', '(4) Next session, give a fresh 4-mark question and require a full PEEL paragraph — if they revert to listing, repeat.', 'Mastery is reached when they produce two consecutive PEEL paragraphs without prompting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all.',
          parts: [
                { id: 'a', prompt: 'A student\'s critical appreciation of "NksVk esjk [ksr" spends 80% of the word count summarizing the poem stanza-by-stanza and 20% listing devices.', answer: 'This approach will score 1-2/6',
                  options: ['This approach will score 1-2/6', 'comprehension', 'appreciation', 'writing skills based on the chapter'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_09_008 (Imagery and Metaphor) and re-do the "device → effect".',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the poem in their own words* or *listing all poetic devices they.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a device-list answer: (1) Return it ungraded with one comment: "Where is the *effect* of each.', '(3) Have them redo *only one stanza* filling all three columns.', '(4) Next session, give a fresh 4-mark question and require a full PEEL paragraph — if they revert to listing, repeat.', 'Mastery is reached when they produce two consecutive PEEL paragraphs without prompting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_015', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
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
