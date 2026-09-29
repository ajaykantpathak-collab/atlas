import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_013', 'c11_hin_ar_cbse_11_014', 'c11_hin_ar_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_014', title: 'पाठ 11 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Language', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_015', title: 'पाठ 11 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion based on a poem like "Ghar ki Yaad" in a Class 11 assessment context?', options: [
                { text: 'The primary purpose is to demonstrate analytical thinking by collaboratively exploring', outcome: 'The primary purpose is to demonstrate analytical thinking by collaboratively exploring the poem\'s.' },
                { text: 'to share what we liked about the poem', outcome: 'Not quite — Students believe a good literary discussion means "everyone shares their interpretation and.', reveals: 'a-good-literary-discussion-means' },
                { text: 'everyone shares their interpretation and we respect all views', outcome: 'Not quite — Students believe a good literary discussion means "everyone shares their interpretation and.', reveals: 'a-good-literary-discussion-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_013', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_11_008) तथा \'विरोधाभास और प्रतीक\'.',
          misconception: 'छात्र प्रायः मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या \'लेखक से असहमत होना\'। उदाहरण: पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_11_008) तथा \'विरोधाभास और प्रतीक\'.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या \'लेखक से असहमत होना\'। उदाहरण: पाठ 11 में यदि नायक चुप.' }
          ],
            remediations: { '11': { steps: ['छात्र से कहें: "पाठ का कोई एक वाक्य चुनो जो तुम्हें अटपटा लगे। उस वाक्य के शब्द-दर-शब्द विकल्प सोचो — लेखक ने यही शब्द.', 'फिर कहें: "इस वाक्य को हटा दो — पाठ का अर्थ कैसे बदलता है?" (यह \'संरचनात्मक अनिवार्यता\' दर्शाता है)। 3.', 'अंत में: "अब इस वाक्य को पाठ के आरंभिक/मध्य/अंतिम भाग से जोड़ो — कौन-सा पैटर्न उभरता है?" (यह \'समग्र व्याख्या\' की ओर ले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_014', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Language', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008 (Imagery and.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "What does the father\'s silence represent in the poem?" Use the father\'s description in the later stanzas.', answer: 'Point: The father\'s silence embodies stoic endurance of displacement',
                  options: ['Point: The father\'s silence embodies stoic endurance of displacement', 'father had no flaw', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008 (Imagery and.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'c', prompt: 'Compare two student responses to "Analyse the use of irony in the poem." Response A: "It is ironic that the poet calls the house \'not a home\'." Response.', answer: 'Response B demonstrates analysis',
                  options: ['Response B demonstrates analysis', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008 (Imagery and.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['Show the student a side-by-side comparison: a 2/5 answer (flowery, no quotes) vs a 5/5 answer (plain language, two line.', 'Give them a highlighter and ask: "Mark every claim in the 5/5 answer that is backed by a line from the poem." 3.', 'Have them rewrite the 2/5 answer by inserting two concrete references from the poem (e.g., "the line \'pkj HkkbZ pkj.', 'Repeat with a new question until they self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s free verse form weakens its emotional impact because it lacks rhythmic discipline." Defend or refute using evidence from the.', answer: 'Refute',
                  options: ['Refute', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008 (Imagery and.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Create a new exam-style question on "?kj dh ;kn" that requires the examinee to connect the mother\'s portrayal to the theme of unacknowledged labour.', answer: 'Question: "How does the poet use the mother\'s domestic actions to highlight the',
                  options: ['Question: "How does the poet use the mother\'s domestic actions to highlight the', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_012 (Comprehension) and c11_hin_ar_cbse_11_008 (Imagery and.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['Show the student a side-by-side comparison: a 2/5 answer (flowery, no quotes) vs a 5/5 answer (plain language, two line.', 'Give them a highlighter and ask: "Mark every claim in the 5/5 answer that is backed by a line from the poem." 3.', 'Have them rewrite the 2/5 answer by inserting two concrete references from the poem (e.g., "the line \'pkj HkkbZ pkj.', 'Repeat with a new question until they self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'Return to c11_hin_ar_cbse_11_008 and c11_hin_ar_cbse_11_009 — practice device.',
          misconception: 'Students believe a good literary discussion means "everyone shares their interpretation and we respect all views.".',
          parts: [
                { id: 'a', prompt: 'Compare the function of the refrain "bahut ikuh phij jag gaya" in stanzas 1, 6, and 12. What does its shifting context reveal about the speaker\'s emotional arc?', answer: 'In stanza 1, the refrain establishes physical distance ("vkt ikuh phij jag gS")',
                  options: ['In stanza 1, the refrain establishes physical distance ("vkt ikuh phij jag gS")', 'everyone shares their interpretation and we respect all views'],
                  hint: 'Return to c11_hin_ar_cbse_11_008 and c11_hin_ar_cbse_11_009 — practice device identification and.',
                  misconception: 'Students believe a good literary discussion means "everyone shares their interpretation and we respect all views." In senior secondary.' }
          ],
            remediations: { 'a-good-literary-discussion-means': { steps: ['Give the student a single stanza (e.g., stanza 4) and ask them to write three discussion questions that cannot.', 'Model a 2-minute "think-aloud" where you take a peer\'s vague comment ("It\'s sad") and transform it into an analytical.', 'The \'cfgu vkbZ cki osQ ?kj\' in stanza 3?', 'Have them practice the "Evidence → Inference → Question" loop in pairs for 10 minutes daily until they spontaneously.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
