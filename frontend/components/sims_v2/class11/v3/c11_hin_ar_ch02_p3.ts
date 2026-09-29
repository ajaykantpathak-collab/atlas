import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_013', 'c11_hin_ar_cbse_02_014', 'c11_hin_ar_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'फेंकू उल्हनिहु\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_014', title: 'पाठ 2 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: '"vejdkar" adhyay se sambandhit kisi bhi prashn ka uttar likhte samay PEEL vidhi ke \'P\' (Point) chरण में क्या लिखना अनिवार्य है?', options: [
                { text: 'Point chरण में प्रश्न के सीधे उत्तर के रूप में एक स्पष्ट, वाद-विवाद योग्य कथन (claim)', outcome: 'Point chरण में प्रश्न के सीधे उत्तर के रूप में एक स्पष्ट, वाद-विवाद योग्य कथन (claim) लिखना होता है.' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_015', title: 'पाठ 2 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a "textual evidence anchor" in a literary discussion, and how does it differ from a personal opinion?', options: [
                { text: 'A textual evidence anchor is a specific quote, scene, or narrative detail from the story', outcome: 'A textual evidence anchor is a specific quote, scene, or narrative detail from the story used.' },
                { text: 'Evidence is just a quote you like', outcome: 'Not quite — Students believe "discussion points" are just a list of topics to talk about (e.g., "theme.', reveals: 'discussion-points-are-just-a' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" are just a list of topics to talk about (e.g., "theme.', reveals: 'discussion-points-are-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_013', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके: **पाठ 2 को पुनः पढ़ें** और एक पृष्ठ पर **माइंड-मैप (mind-map)** बनाएँ — केंद्र.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' का आलोचनात्मक चिंतन',
                  options: ['\'फेंकू उल्हनिहु\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **पाठ 2 को पुनः पढ़ें** और एक पृष्ठ पर **माइंड-मैप (mind-map)** बनाएँ — केंद्र में \'मुख्य.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या **अपनी निजी पसंद/नापसंद.' }
          ],
            remediations: { 'finding-faults-personal-likes-dislikes': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**शब्द स्पष्टीकरण:** छात्र से पूछें — "आलोचना" और "विश्लेषण" में क्या अंतर है?', 'दो कॉलम बनवाएँ: आलोचना (निर्णय, भावनात्मक, व्यक्तिगत) vs विश्लेषण (तर्क, साक्ष्य, अवैयक्तिक)। 2.', '**मॉडलिंग:** पाठ 2 का एक छोटा अंश लें। **दो उत्तर दिखाएँ** — (क) व्यक्तिगत प्रतिक्रिया: "यह दृश्य मुझे बोरिंग लगा।" (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_014', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review c11_hin_ar_cbse_02_013 (Critical Thinking) — specifically the worked.',
          misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted.',
          parts: [
                { id: 'a', prompt: '"vejdkar" पाठ में fe;k¡ ulh#íhu ke "rkyhe dh rkyhe gh cM+h ph”k gksrh gS" kथन ka theme se kya sambandh hai? Apne shabdon mein samjhayein.', answer: 'यह कथन पाठ के केंद्रीय विषय',
                  options: ['यह कथन पाठ के केंद्रीय विषय', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_013 (Critical Thinking) — specifically the worked example.',
                  misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['**Diagnose the gap:** Ask the student to write a 60-word answer to "fe;k¡ ulh#íhu ne \'rkyhe\' shabd ka dvigun prayog.', 'If they paraphrase the story instead of analysing the *word*, the gap is evidence-use.', '**Micro-drill:** Give them 3 specific quotes from the chapter (e.g., "v[kckjuohl", "uxhuklk”k", "rkyhe dh rkyhe gh cM+h.', '**Scaffolded PEEL:** Provide a half-written PEEL frame (P and E filled) for a new question; student completes E and L.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted.',
          parts: [
                { id: 'a', prompt: 'Kya "vejdkar" ke ant mein fe;k¡ ulh#íhu ka clerk ko "dgkor" (dacoit) kehna uchit thha?', answer: '**Rai:** Haan, ye uchit thha kyunki clerk \'kanoon ke rakshak\' hokar \'kanoon ka',
                  options: ['**Rai:** Haan, ye uchit thha kyunki clerk \'kanoon ke rakshak\' hokar \'kanoon ka', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_013 (Critical Thinking) — specifically the worked example.',
                  misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['**Diagnose the gap:** Ask the student to write a 60-word answer to "fe;k¡ ulh#íhu ne \'rkyhe\' shabd ka dvigun prayog.', 'If they paraphrase the story instead of analysing the *word*, the gap is evidence-use.', '**Micro-drill:** Give them 3 specific quotes from the chapter (e.g., "v[kckjuohl", "uxhuklk”k", "rkyhe dh rkyhe gh cM+h.', '**Scaffolded PEEL:** Provide a half-written PEEL frame (P and E filled) for a new question; student completes E and L.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_015', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'If stuck, return to node 013 (Critical Thinking) and redo the.',
          misconception: 'Students believe "discussion points" are just a list of topics to talk about (e.g., "theme of education," "character.',
          parts: [
                { id: 'a', prompt: 'During a discussion, a peer claims: "fe;k¡ ulh#íhu is just an uneducated fool who gets lucky." Using the "Listen-Quote-Build" protocol, formulate a spoken.', answer: 'Step 1 (Listen): "You\'re saying fe;k¡\'s success comes from luck, not wisdom',
                  options: ['Step 1 (Listen): "You\'re saying fe;k¡\'s success comes from luck, not wisdom', 'discussion points', 'theme of education', 'character of fe;k¡'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and redo the "evidence-to-interpretation" ladder.',
                  misconception: 'Students believe "discussion points" are just a list of topics to talk about (e.g., "theme of education," "character of fe;k¡").' },
                { id: 'b', prompt: 'Compare the discussion potential of these two questions about the ending: (A) "Did fe;k¡ win in the end?" (B) "How does the final image of fe;k¡ teaching.', answer: 'Question B is superior',
                  options: ['Question B is superior', 'discussion points', 'theme of education', 'character of fe;k¡'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and redo the "evidence-to-interpretation" ladder.',
                  misconception: 'Students believe "discussion points" are just a list of topics to talk about (e.g., "theme of education," "character of fe;k¡").' }
          ],
            remediations: { 'discussion-points-are-just-a': { steps: ['If a student falls into the "topic list" trap: (1) Hand them a transcript of a model 3-minute discussion on a different.', '(2) Assign a 5-minute "silent listening" exercise: they must paraphrase a peer\'s claim before speaking, using the stem.', 'Practice with low-stakes topics (e.g., "best street food") before returning to the text.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
