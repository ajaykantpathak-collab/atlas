import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p3',
    title: 'èkeZohj Hkkjrh · Part 3/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'èkeZohj Hkkjrh · Part 3/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_013', 'c12_hin_ar_cbse_10_014', 'c12_hin_ar_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text beyond its surface meaning by questioning authorial choices, evaluating evidence from the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you get a board exam question: "HkfDru\'s dignity is the central theme of the chapter.',
            decisions: [{ prompt: 'What are the four components of the PEEL structure for writing analytical answers in literature?', options: [
                { text: 'PEEL stands for **Point** (clear topic sentence), **Evidence** (direct quote or precise', outcome: 'PEEL stands for **Point** (clear topic sentence), **Evidence** (direct quote or precise textual.' },
                { text: 'Introduction, Body, Conclusion', outcome: 'Not quite — Students believe "good writing" in literature answers means using flowery vocabulary, long.', reveals: 'good-writing-in-literature-answers' },
                { text: 'good writing', outcome: 'Not quite — Students believe "good writing" in literature answers means using flowery vocabulary, long.', reveals: 'good-writing-in-literature-answers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in the ASL (Assessment of Speaking and Listening) exam room — the examiner hands you a prompt card: "HkfDru never learns to write her name, yet.',
            decisions: [{ prompt: 'What is the primary purpose of \'Speaking and Listening: Discussion Points\' in the CBSE Class 12 Hindi Aroh assessment framework?', options: [
                { text: 'The primary purpose is to assess a student\'s ability to articulate critical,', outcome: 'The primary purpose is to assess a student\'s ability to articulate critical, evidence-based.' },
                { text: 'to test if students read the chapter', outcome: 'Not quite — Students treat discussion points as **\'speech topics\'** — preparing a memorized monologue covering.', reveals: 'students-treat-discussion-points-as' },
                { text: 'to check pronunciation', outcome: 'Not quite — Students treat discussion points as **\'speech topics\'** — preparing a memorized monologue covering.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'If stuck on "Interrogate" step: Return to c12_hin_ar_cbse_10_009 (Irony) and trace *one*.',
          misconception: '**Misconception:** "Critical analysis means finding faults in the text or criticizing the author." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Compare the portrayal of HkfDru\'s relationship with her *own* daughter (who dies) versus her relationship with the narrator\'s children.', answer: 'HkfDru\'s biological daughter dies neglected',
                  options: ['HkfDru\'s biological daughter dies neglected', 'sadness'],
                  hint: 'If stuck on "Interrogate" step: Return to c12_hin_ar_cbse_10_009 (Irony) and trace *one* ironic.',
                  misconception: '**Misconception:** "Critical analysis means finding faults in the text or criticizing the author." **Why it\'s wrong:** Students equate.' }
          ],
            remediations: { 'misconception-critical-analysis-means-finding': { steps: ['If a student cannot move beyond summary or moral judgment: 1.', '**Revisit** c12_hin_ar_cbse_10_004 (Character Analysis) and c12_hin_ar_cbse_10_009 (Irony and Symbolism) — identify.', 'Now What?" template on a single paragraph: *What* does the text say?', '*So what* does it imply about power?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_10_012 (Comprehension) to practice finding evidence.',
          misconception: 'Students believe "good writing" in literature answers means using flowery vocabulary, long sentences, and generic.',
          parts: [
                { id: 'a', prompt: 'Two students answer: "HkfDru\'s name reflects her identity. Discuss." **Student A:** "HkfDru hides her name because she is proud.', answer: '**Student B** demonstrates higher-order analysis',
                  options: ['**Student B** demonstrates higher-order analysis', 'good writing', 'beautifully written', 'heart-touching'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_10_012 (Comprehension) to practice finding evidence, and.',
                  misconception: 'Students believe "good writing" in literature answers means using flowery vocabulary, long sentences, and generic praise ("beautifully.' }
          ],
            remediations: { 'good-writing-in-literature-answers': { steps: ['If a student submits a summary instead of analysis: 1.', '**Highlight** every sentence in their answer: **Yellow** = plot summary, **Green** = analytical claim, **Blue**.', '**Ask:** "Which yellow sentences can be deleted?', 'Which green sentence is your main Point?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "HkfDru" are structured oral.',
          hint: 'If stuck, revisit **c12_hin_ar_cbse_10_013 (Critical Thinking)** for analytical.',
          misconception: 'Students treat discussion points as **\'speech topics\'** — preparing a memorized monologue covering plot summary + moral.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of \'Speaking and Listening: Discussion Points\' in the CBSE Class 12 Hindi Aroh assessment framework?', answer: 'The primary purpose is to assess a student\'s ability to articulate critical,',
                  options: ['The primary purpose is to assess a student\'s ability to articulate critical,', 'to test if students read the chapter', 'to check pronunciation'],
                  hint: 'If stuck, revisit **c12_hin_ar_cbse_10_013 (Critical Thinking)** for analytical frameworks and.',
                  misconception: 'Students treat discussion points as **\'speech topics\'** — preparing a memorized monologue covering plot summary + moral lesson.' },
                { id: 'b', prompt: 'A student says: "HkfDru is a tragic character because she is poor and uneducated." Identify the analytical gap in this statement and explain what textual.', answer: 'The statement reduces HkfDru to a victim of circumstances (poverty/illiteracy)',
                  options: ['The statement reduces HkfDru to a victim of circumstances (poverty/illiteracy)', 'hath ka kaam', 'HkfDru ne mujhe jeena sikhaya'],
                  hint: 'If stuck, revisit **c12_hin_ar_cbse_10_013 (Critical Thinking)** for analytical frameworks and.',
                  misconception: 'Students treat discussion points as **\'speech topics\'** — preparing a memorized monologue covering plot summary + moral lesson.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student defaults to monologue mode: **Step 1** — Stop them at 60 seconds.', 'Mujhe yeh sawal hai: \'HkfDru ne kabhi apni jaati nahi batayi.', 'Kyun?\' Ab jawab do." **Step 2** — If they stall, model: "Text mein jaati ka seedha zikr nahi, lekin \'neech jaat\'.', 'Yeh chhupana Verma ki strategy hai — jaati ko *structure* dikhana, nahi *label*." **Step 3** — Have them practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
