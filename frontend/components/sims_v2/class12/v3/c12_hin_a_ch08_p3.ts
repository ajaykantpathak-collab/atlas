import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch08_p3: SimDef = {
    id: 'v3_c12_hin_a_ch08_p3',
    title: 'वद्यिापति · Part 3/3',
    subtitle: 'A weaver taught God to speak the market\'s language',
    classLevel: 12, subject: 'hin_a', topic: 'वद्यिापति · Part 3/3',
    chapters: ['c12_hin_a_ch08'],
    nodeIds: ['c12_hin_a_cbse_08_013', 'c12_hin_a_cbse_08_014', 'c12_hin_a_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Nirgun Bhakti reader', intro: 'In Kashi\'s weaving lanes, a poet stitched four tongues into one — and aimed it at both temples and mosques.', goal: 'Read Kabir through Nirgun Bhakti, Sadhukkari language and the weaver\'s world as spiritual metaphor.' },
    discovery: {
        question: 'A weaver from Kashi writes verses in Sadhukkari — a mongrel tongue mixing Braj, Avadhi, Persian and Arabic — while priests guarded Sanskrit. What was Kabir really refusing?',
        options: ['The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion', 'Elite languages are hard', 'He only knew dialect', 'Nothing — language is neutral'],
        answer: 'The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion',
        hook: 'Don\'t confuse simple words with simple thought — his loom, his market, his courtyard are dense metaphysics in a worker\'s vocabulary. Life is cloth on the loom of time; see the weaving before it\'s finished. The weaver\'s craft is the epistemology.',
    },
    teaching: [
        { title: 'वद्यिापति — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'अंतरा भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit at Kabir\'s loom: trace how a julaha\'s tools became metaphysical vocabulary, weigh Nirgun devotion against both orthodoxies, and hear a marketplace tongue carry the sublime.',
        labels: ['वद्यिापति — आशय-स्पष्टीकरण और', 'वद्यिापति — परीक्षा-उत्तर लेखन', 'वद्यिापति — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_014', title: 'वद्यिापति — परीक्षा-उत्तर लेखन कौशल',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 8\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Language', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_015', title: 'वद्यिापति — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 8\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a literature speaking‑listening activity?', options: [
                { text: 'A discussion point is a focused, evidence‑based observation or question about the text', outcome: 'A discussion point is a focused, evidence‑based observation or question about the text that invites.' },
                { text: 'It is a summary of the poem', outcome: 'Not quite — Students believe a discussion point is just "saying what you feel about the poem." They therefore.', reveals: 'a-discussion-point-is-just' },
                { text: 'saying what you feel about the poem', outcome: 'Not quite — Students believe a discussion point is just "saying what you feel about the poem." They therefore.', reveals: 'a-discussion-point-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s mother has been sinking into helpless waiting since her husband\'s posting abroad — she watches the gate all day and does nothing else. In the chapter\'s three-stanza poem, the separated woman ends by turning to the lamp and commanding it to stay lit so he can find his way home.',
            decisions: [{ prompt: 'What does that final stanza suggest your friend could offer her?', options: [
                { text: 'A ritual of agency — the poem\'s turn is from passive watching (the path) to doing something (keeping the lamp); helping her convert waiting into a nightly act — a lit lamp, a call scheduled, a task kept — changes despair into participation.', outcome: 'The stanza\'s climax is the moment she stops describing pain and acts on the world she can reach; the lamp becomes a collaborator, not just a symbol.' },
                { text: 'Reassure her that waiting itself is love enough — she shouldn\'t need to do anything.', outcome: 'The poem shows static watching is the anguish, not the answer — stanza 2 is exactly that passive night; the relief arrives only when she takes hold of a ritual.', reveals: 'waiting-is-enough' },
                { text: 'Distract her entirely — get her to stop thinking about him altogether.', outcome: 'The poem neither abandons the longing nor dissolves it in distraction — it channels it into a small commanded act; forgetting isn\'t the resolution, agency within the wait is.', reveals: 'distraction-equals-relief' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Kabir\'s \'simple\' words as surgical philosophy — and see language choice as the heart of his defiance.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_013', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि छात्र कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) और.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को शब्दशः अनुवाद या पाठ का सारांश मान लेते हैं, जैसे कि "कवि ने कहा कि नदी बह रही है" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) और.',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को शब्दशः अनुवाद या पाठ का सारांश मान लेते हैं, जैसे कि "कवि ने कहा कि नदी बह रही है" को पर्याप्त उत्तर मान लेते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल वाक्य दें: "वह रो रहा था।" पहले पूछें: "इसका शब्दशः अर्थ क्या है?" फिर पूछें: "इससे क्या भाव प्रकट हो.', 'इस स्थिति में कौन सी मानवीय दशा दिख सकती है?" इस प्रकार शब्दशः अर्थ से भाव और संदर्भ की ओर ले जाकर, उन्हें दिखाएँ कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_014', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Language', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'A student writes: "In the first poem, the gopis are very sad because Krishna left.', answer: 'Weakness 1: No textual evidence',
                  options: ['Weakness 1: No textual evidence', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'c', prompt: 'Compare the effectiveness of two sample opening sentences for a critical appreciation of the second poem: (A) "This poem is about the gopis missing Krishna.".', answer: '(B) is stronger',
                  options: ['(B) is stronger', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['Have the student pick one 3-mark question from the chapter\'s exercise.', 'Ask them to highlight every adjective in their draft — if >30% of words are adjectives, they are describing, not.', 'Force-replace each adjective cluster with a PEEL cycle: delete the adjectives, insert a quoted phrase, name the device.', 'Re-mark using the CBSE 3-mark rubric (1 mark point, 1 mark evidence, 1 mark explanation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "In Phir Koi Khushboo\'s poems, the Braj/Awadhi dialect is merely a decorative choice; the same themes could be expressed in standard Hindi.', answer: 'Refute',
                  options: ['Refute', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Create a 4-sentence PEEL paragraph answering: "Explain the significance of the \'unlit lamp\' image in the first poem." Invent a plausible textual detail.', answer: 'Point: The unlit lamp symbolises the gopis\' extinguished hope of union',
                  options: ['Point: The unlit lamp symbolises the gopis\' extinguished hope of union', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence step, return to Comprehension node (c12_hin_a_cbse_08_012) and re-do the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['Have the student pick one 3-mark question from the chapter\'s exercise.', 'Ask them to highlight every adjective in their draft — if >30% of words are adjectives, they are describing, not.', 'Force-replace each adjective cluster with a PEEL cycle: delete the adjectives, insert a quoted phrase, name the device.', 'Re-mark using the CBSE 3-mark rubric (1 mark point, 1 mark evidence, 1 mark explanation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_015', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review c12_hin_a_cbse_08_012 (Comprehension) for evidence‑location drills and.',
          misconception: 'Students believe a discussion point is just "saying what you feel about the poem." They therefore offer vague.',
          parts: [
                { id: 'a', prompt: 'You are preparing a discussion point on the third poem. The line "त्यौं त्यौं निस दिन देखत रहत" appears.', answer: 'Step 1: Translate/understand the line',
                  options: ['Step 1: Translate/understand the line', 'saying what you feel about the poem', 'a discussion point is just "saying what you feel about the poem'],
                  hint: 'If stuck, review c12_hin_a_cbse_08_012 (Comprehension) for evidence‑location drills and.',
                  misconception: 'Students believe a discussion point is just "saying what you feel about the poem." They therefore offer vague likes/dislikes or plot.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['Revisit c12_hin_a_cbse_08_012 (Comprehension) to practise locating exact lines for a given theme.', 'Use c12_hin_a_cbse_08_013 (Critical Thinking) to convert each located line into an analytical statement using the.', 'Pair up and do a 5‑minute micro‑discussion on one poem, each turn must quote a line.', 'Record the discussion and self‑assess: Did I cite evidence?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
