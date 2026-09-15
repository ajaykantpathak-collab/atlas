import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p3',
    title: 'vejdkar · Part 3/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'vejdkar · Part 3/3',
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
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves systematically examining a text\'s components—plot, character, theme, language, and structure—to interpret deeper meanings, evaluate the author\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you watch a news debate where a panelist says, "The system is broken," but offers no proof. You\'d dismiss it as opinion.',
            decisions: [{ prompt: 'What is the fundamental difference between an *inferential comprehension answer* and a *critical interpretation* of the same textual detail?', options: [
                { text: 'Inferential comprehension deduces unstated facts *within* the story world (e.g., "The', outcome: 'Inferential comprehension deduces unstated facts *within* the story world (e.g., "The teacher.' },
                { text: 'correct', outcome: 'Not quite — Students believe critical interpretation means finding **the single "correct" hidden meaning** the.', reveals: 'critical-interpretation-means-finding-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit for your Class 11 Hindi board exam and see a 6-mark question: "fe;k¡ ulh#íhu dk charitra chitran kijiye" — your mind goes blank despite knowing.',
            decisions: [{ prompt: '"vejdkar" adhyay se sambandhit kisi bhi prashn ka uttar likhte samay PEEL vidhi ke \'P\' (Point) chरण में क्या लिखना अनिवार्य है?', options: [
                { text: 'Point chरण में प्रश्न के सीधे उत्तर के रूप में एक स्पष्ट, वाद-विवाद योग्य कथन (claim)', outcome: 'Point chरण में प्रश्न के सीधे उत्तर के रूप में एक स्पष्ट, वाद-विवाद योग्य कथन (claim) लिखना होता है.' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college seminar where the professor asks, "What does the author really think about education — does he value degrees or wisdom?" You freeze.',
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
          question: 'Critical thinking in literary analysis involves systematically examining.',
          hint: 'If stuck, return to the Literary Devices nodes (c11_hin_ar_cbse_02_008.',
          misconception: 'Students believe critical interpretation means finding **the single "correct" hidden meaning** the author intended.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves systematically examining a text\'s',
                  options: ['Critical thinking in literary analysis involves systematically examining a text\'s', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, return to the Literary Devices nodes (c11_hin_ar_cbse_02_008, c11_hin_ar_cbse_02_009) and.',
                  misconception: 'Students believe critical interpretation means finding **the single "correct" hidden meaning** the author intended.' }
          ],
            remediations: { 'critical-interpretation-means-finding-the': { steps: ['**Deconstruct the "Riddle Mindset":** Give the student the teacher\'s final line.', 'Ask: "List 3 *different* reasons a person might say this.', 'Find text evidence for *each*." 2.', '**Evidence Mapping:** Create a two-column table: Column A: "Interpretation Claim." Column B: "Exact Line/Action from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe critical interpretation means finding **the single "correct" hidden meaning** the author intended.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the **blindness motif** (literal and metaphorical) in conveying the story\'s message.', answer: 'The motif is subverted, not clichéd',
                  options: ['The motif is subverted, not clichéd', 'correct'],
                  hint: 'If stuck, return to the Literary Devices nodes (c11_hin_ar_cbse_02_008, c11_hin_ar_cbse_02_009) and.',
                  misconception: 'Students believe critical interpretation means finding **the single "correct" hidden meaning** the author intended.' }
          ],
            remediations: { 'critical-interpretation-means-finding-the': { steps: ['**Deconstruct the "Riddle Mindset":** Give the student the teacher\'s final line.', 'Ask: "List 3 *different* reasons a person might say this.', 'Find text evidence for *each*." 2.', '**Evidence Mapping:** Create a two-column table: Column A: "Interpretation Claim." Column B: "Exact Line/Action from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "vejdkar" refers to the ability.',
          hint: 'If stuck, review c11_hin_ar_cbse_02_013 (Critical Thinking) — specifically the worked.',
          misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted.',
          parts: [
                { id: 'a', prompt: '"vejdkar" पाठ में fe;k¡ ulh#íhu ke "rkyhe dh rkyhe gh cM+h ph”k gksrh gS" kथन ka theme se kya sambandh hai? Apne shabdon mein samjhayein.', answer: 'यह कथन पाठ के केंद्रीय विषय',
                  options: ['यह कथन पाठ के केंद्रीय विषय', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_013 (Critical Thinking) — specifically the worked example.',
                  misconception: 'Students believe that "writing skills based on the chapter" means memorising 3-4 readymade answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['**Diagnose the gap:** Ask the student to write a 60-word answer to "fe;k¡ ulh#íhu ne \'rkyhe\' shabd ka dvigun prayog.', 'If they paraphrase the story instead of analysing the *word*, the gap is evidence-use.', '**Micro-drill:** Give them 3 specific quotes from the chapter (e.g., "v[kckjuohl", "uxhuklk”k", "rkyhe dh rkyhe gh cM+h.', '**Scaffolded PEEL:** Provide a half-written PEEL frame (P and E filled) for a new question; student completes E and L.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
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
