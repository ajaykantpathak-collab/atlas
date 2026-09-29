import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p3',
    title: 'पाठ 14 · Part 3/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 3/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_013', 'c11_hin_ar_cbse_14_014', 'c11_hin_ar_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 14\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — आलोचनात्मक', 'पाठ 14 — लेखन', 'पाठ 14 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_014', title: 'पाठ 14 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 14\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Essay.' },
                { text: 'Paragraph, Essay, Explain, List', outcome: 'Not quite — Students believe "writing a good answer" means writing a detailed summary of the poem.', reveals: 'writing-a-good-answer-means' },
                { text: 'writing a good answer', outcome: 'Not quite — Students believe "writing a good answer" means writing a detailed summary of the poem.', reveals: 'writing-a-good-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_015', title: 'पाठ 14 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 14\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion point in the CBSE Class 11 Hindi Aroh assessment framework?', options: [
                { text: 'The primary purpose is to evaluate', outcome: 'The primary purpose is to evaluate a student\'s ability to orally analyze literary elements (theme.' },
                { text: 'to test memory of the poem summary', outcome: 'Not quite — Students believe "discussion points" means preparing 5-6 memorized answers to likely questions.', reveals: 'discussion-points-means-preparing-5' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" means preparing 5-6 memorized answers to likely questions.', reveals: 'discussion-points-means-preparing-5' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_013', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि छात्र विश्लेषण में फंस जाए, तो उसे साहित्यिक युक्तियों की पहचान (नोड 008 और 009) और.',
          misconception: 'कविता के आलोचनात्मक विश्लेषण में छात्र अक्सर यह मान लेते हैं कि यदि वे एक साहित्यिक युक्ति (जैसे रूपक या प्रतीक) की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र विश्लेषण में फंस जाए, तो उसे साहित्यिक युक्तियों की पहचान (नोड 008 और 009) और विषय की समझ.',
                  misconception: 'कविता के आलोचनात्मक विश्लेषण में छात्र अक्सर यह मान लेते हैं कि यदि वे एक साहित्यिक युक्ति (जैसे रूपक या प्रतीक) की पहचान कर लेते हैं, तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि साहित्यिक युक्ति की पहचान करना जैसे रसोई में मसाला पहचानना है — बस इसे नाम देना पर्याप्त नहीं है.', 'यदि मुस्कान एक फूल नहीं होती, तो कैसा अंतर पड़ता?" **चरण 3**: छात्र को उत्तर देने के लिए प्रेरित कीजिए — यदि वे फिसल.', 'क्या यह मुस्कान को नाजुक बनाता है?" **चरण 4**: अंत में, इन अवलोकनों को कविता के बड़े विषय (जैसे सुंदरता की अस्थायित्व.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_014', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review "Theme: Primary Theme and Message" (c11_hin_ar_cbse_14_006) and.',
          misconception: 'Students believe "writing a good answer" means writing a detailed summary of the poem in chronological order.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Essay, Explain, List', 'writing a good answer'],
                  hint: 'If stuck, review "Theme: Primary Theme and Message" (c11_hin_ar_cbse_14_006) and "Literary Devices.',
                  misconception: 'Students believe "writing a good answer" means writing a detailed summary of the poem in chronological order.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "Explain the significance of the word \'pjkpj\' (flutter/wings) in the first poem." Write only the Point and Evidence steps.', answer: 'Point: The onomatopoeic word \'pjkpj\' (vks pjkpj!',
                  options: ['Point: The onomatopoeic word \'pjkpj\' (vks pjkpj!', 'writing a good answer'],
                  hint: 'If stuck, review "Theme: Primary Theme and Message" (c11_hin_ar_cbse_14_006) and "Literary Devices.',
                  misconception: 'Students believe "writing a good answer" means writing a detailed summary of the poem in chronological order.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['Give the student a 3-mark question and a model PEEL answer.', 'Color-code the model: Point (Blue), Evidence (Green), Explanation (Yellow), Link (Red).', 'Ask them to highlight the same colors in their own answer.', 'If a color is missing, they rewrite only that component.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing a good answer" means writing a detailed summary of the poem in chronological order.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The second poem weakens the feminist message because the woman prays to a male God (pUuefYydktqZu) for freedom instead of breaking the.', answer: 'Refute',
                  options: ['Refute', 'writing a good answer'],
                  hint: 'If stuck, review "Theme: Primary Theme and Message" (c11_hin_ar_cbse_14_006) and "Literary Devices.',
                  misconception: 'Students believe "writing a good answer" means writing a detailed summary of the poem in chronological order.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['Give the student a 3-mark question and a model PEEL answer.', 'Color-code the model: Point (Blue), Evidence (Green), Explanation (Yellow), Link (Red).', 'Ask them to highlight the same colors in their own answer.', 'If a color is missing, they rewrite only that component.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review c11_hin_ar_cbse_14_013\'s worked examples on converting textual.',
          misconception: 'Students believe "discussion points" means preparing 5-6 memorized answers to likely questions (e.g., "theme of the.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a literary discussion point in the CBSE Class 11 Hindi Aroh assessment framework?', answer: 'The primary purpose is to evaluate',
                  options: ['The primary purpose is to evaluate', 'to test memory of the poem summary', 'discussion points', 'theme of the poem'],
                  hint: 'If stuck, review c11_hin_ar_cbse_14_013\'s worked examples on converting textual observation into.',
                  misconception: 'Students believe "discussion points" means preparing 5-6 memorized answers to likely questions (e.g., "theme of the poem," "character.' }
          ],
            remediations: { 'discussion-points-means-preparing-5': { steps: ['Have the student record a 2-minute solo talk on one poem, then play it back—ask: "Where did you sound like a textbook?', 'Practice "पैराफ्रेज़-फिर-जोड़ें" (paraphrase-then-add) drills: Partner states a point; student must rephrase it in own.', 'Give them a "discussion menu" card with sentence stems: "पंक्ति X से लगता है कि...", "आपके बिंदु से सहमत हूं.', 'Simulate timed group discussions (4 students, 10 minutes) with observer feedback on: evidence use, listening markers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
