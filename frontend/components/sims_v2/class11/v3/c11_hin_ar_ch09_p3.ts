import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_013', 'c11_hin_ar_cbse_09_014', 'c11_hin_ar_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_014', title: 'पाठ 9 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 9\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "Writing Skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' },
                { text: 'Writing Skills', outcome: 'Not quite — Students believe "Writing Skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_015', title: 'पाठ 9 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 9\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a literature class?', options: [
                { text: 'A discussion point is a specific, text-based observation or question that', outcome: 'A discussion point is a specific, text-based observation or question that a student raises.' },
                { text: 'to share my personal feelings about the poem', outcome: 'Not quite — Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic.', reveals: 'a-good-discussion-point-is' },
                { text: 'I think caste is wrong', outcome: 'Not quite — Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic.', reveals: 'a-good-discussion-point-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_013', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँसें, तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"छिपा हुआ अर्थ" (Hidden Meaning)** ढूँढ़ना होता है जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-1 — पाठ 9\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें, तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"छिपा हुआ अर्थ" (Hidden Meaning)** ढूँढ़ना होता है जो लेखक ने *जानबूझकर*.' }
          ],
            remediations: { 'hidden-meaning-fixed-entity': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई एक वाक्य चुनो जो तुम्हें \'अजीब\' या \'महत्वपूर्ण\' लगा — *नहीं* वह जो शिक्षक ने.', 'कौन-सा विषय कमजोर पड़ता है?" (यह **कार्यात्मक विश्लेषण / Functional Analysis** सिखाता है)। **चरण 3:** दो सहपाठियों की.', 'किसकी व्याख्या पाठ के *अन्य* भागों से टकराती नहीं?" (यह **साक्ष्य-भार (Evidence Weight)** और **संगतता (Coherence)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_014', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'Review c11_hin_ar_cbse_09_008 (Literary Devices) and c11_hin_ar_cbse_09_012.',
          misconception: 'Students believe "Writing Skills" means memorizing model answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'Writing Skills', '"Writing Skills" means memorizing model answers for predicted questions'],
                  hint: 'Review c11_hin_ar_cbse_09_008 (Literary Devices) and c11_hin_ar_cbse_09_012 (Comprehension).',
                  misconception: 'Students believe "Writing Skills" means memorizing model answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['**Deconstruct the Prompt:** Give the student 3 past board questions.', 'Have them highlight *command words* (analyze, discuss, justify) and *content words* (irony, Dinkar, nationalism) in two.', '**Evidence Hunt:** For one question, set a 5-minute timer to find 3 exact textual references (line numbers/paraphrases).', '**Oral PEEL:** Student explains the answer *orally* using PEEL steps while you scribe.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme.',
          misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a \'discussion point\' in a literature class?', answer: 'A discussion point is a specific, text-based observation or question that',
                  options: ['A discussion point is a specific, text-based observation or question that', 'to share my personal feelings about the poem', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' },
                { id: 'b', prompt: 'You are preparing a discussion point on the metaphor of the \'burden\' (टोकरी) in the poem.', answer: 'Locate the exact lines with the metaphor',
                  options: ['Locate the exact lines with the metaphor', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' },
                { id: 'c', prompt: 'Compare two discussion points: A) "The poem is against caste." B) "In stanza 2, the poet equates the burden with birth-based identity, using the word \'जाति\'.', answer: 'Point B is more valuable',
                  options: ['Point B is more valuable', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' }
          ],
            remediations: { 'a-good-discussion-point-is': { steps: ['Give the student a printed copy of the poem with three key metaphors highlighted.', 'Ask them to write one sentence for each metaphor following the template: "In line X, the poet uses [metaphor].', 'Have them read each sentence aloud and ask: "Which word in the line proves your claim?" 4.', 'Finally, ask them to turn one sentence into a question for the group.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'Create a discussion question for your group that connects Dharmraj\'s metaphor of the \'clean/dirty\' distinction to a current social issue, without mentioning.', answer: 'Example: "The poem contrasts \'clean\' and \'dirty\' work assigned by birth',
                  options: ['Example: "The poem contrasts \'clean\' and \'dirty\' work assigned by birth', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' }
          ],
            remediations: { 'a-good-discussion-point-is': { steps: ['Give the student a printed copy of the poem with three key metaphors highlighted.', 'Ask them to write one sentence for each metaphor following the template: "In line X, the poet uses [metaphor].', 'Have them read each sentence aloud and ask: "Which word in the line proves your claim?" 4.', 'Finally, ask them to turn one sentence into a question for the group.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
