import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch11_p3: SimDef = {
    id: 'v3_c12_hin_a_ch11_p3',
    title: 'सुमरिनिी के मनके · Part 3/3',
    subtitle: 'Three stories, one evolving conscience',
    classLevel: 12, subject: 'hin_a', topic: 'सुमरिनिी के मनके · Part 3/3',
    chapters: ['c12_hin_a_ch11'],
    nodeIds: ['c12_hin_a_cbse_11_013', 'c12_hin_a_cbse_11_014', 'c12_hin_a_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Premchand scholar', intro: 'A village schoolteacher who resigned for the nation wrote India\'s conscience in three registers — hope, grit and moral courage.', goal: 'Situate Lajwanti, Kafan and Maine Kaha Tha within Premchand\'s creative periods and nationalist arc.' },
    discovery: {
        question: 'One author writes \'Lajwanti,\' \'Kafan\' and \'Maine Kaha Tha\' — reformist hope in one, bitter disillusion in another. What changed between them?',
        options: ['His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing', 'Different ghostwriters', 'He aged, nothing more', 'Stories vary randomly'],
        answer: 'His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing',
        hook: 'Reading all three as \'social reform tales\' flattens his evolution — Kafan\'s Ghisu-Madhav aren\'t just poor, they\'re a verdict on a system. And his nine-language reach lives inside the prose: rustic village speech beside Sanskritised commentary is strategy, not inconsistency.',
    },
    teaching: [
        { title: 'सुमरिनिी के मनके — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अंतरा भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Premchand across his own evolution: separate the reformer\'s hope from the disillusioned analyst, weigh resignation as authorial act, and test whether education alone transforms material life.',
        labels: ['सुमरिनिी के मनके —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_013', title: 'सुमरिनिी के मनके — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 11\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension answer and a critical analysis answer for a question about "?kM+h osQ.', options: [
                { text: 'A literal comprehension answer retells what the narrator says about clocks (e.g., "The', outcome: 'A literal comprehension answer retells what the narrator says about clocks (e.g., "The narrator.' },
                { text: 'critical analysis', outcome: 'Not quite — Students think "critical analysis" means *finding faults* in the story or *expressing personal.', reveals: 'critical-analysis-means-finding-faults' },
                { text: 'I feel the author is wrong about clocks', outcome: 'Not quite — Students think "critical analysis" means *finding faults* in the story or *expressing personal.', reveals: 'critical-analysis-means-finding-faults' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_014', title: 'सुमरिनिी के मनके — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 11\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point (clear topic sentence), Evidence (textual detail or quote),', outcome: 'PEEL stands for Point (clear topic sentence), Evidence (textual detail or quote), Explanation.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_015', title: 'सुमरिनिी के मनके — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 11\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'Which of the three pieces in the chapter uses a folk‑tale framework to explore the value of labour and choice?', options: [
                { text: 'Correct answer: "<sys pqu yks" (तीसरा टुकड़ा)', outcome: 'Correct answer: "<sys pqu yks" (तीसरा टुकड़ा). A wrong answer (e.g., "ckyd cp x;k" or "?कM+h osQ.' },
                { text: 'ckyd cp x;k', outcome: 'Not quite — Students treat "discussion points" as a memory test: they memorise the NCERT end‑of‑chapter.', reveals: 'students-treat-discussion-points-as' },
                { text: '?कM+h osQ iq”ksZ', outcome: 'Not quite — Students treat "discussion points" as a memory test: they memorise the NCERT end‑of‑chapter.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school internship, a tribal scholarship boy refuses to recite the expected answers or name the textbook he was handed — he just says he belongs to the wild and slips away. The staff room has already filed him as \'difficult, unteachable.\'',
            decisions: [{ prompt: 'What does the story \'बालक बच गया\' read in his refusal?', options: [
                { text: 'A climax of self-keeping — the boy\'s defiant \'I am a wild one\' is the peak the questioning was building toward, and his \'Yaw\' and escape release it; the file on him reads defiance where the story reads a child refusing to be renamed by the institution.', outcome: 'The chapter\'s structural point: the struggle scenes rise toward the refusal, not the obedience — so \'unteachable\' records the school\'s failure to see what his refusal was protecting.' },
                { text: 'Side with the staff — he won\'t answer, so the verdict of \'unteachable\' is a fair label.', outcome: 'The story treats the interrogation itself as the problem: the adults\' questions measure him against a script he never agreed to, so his silence is evidence of the script\'s failure, not his.', reveals: 'noncompliance-equals-inability' },
                { text: 'Coach him to give the expected answers so he can get through and leave.', outcome: 'That\'s the assimilation route the story\'s climax rejects — his escape with identity intact is the \'bach gaya\' the title means; coaching him to recite would be the institution winning after all.', reveals: 'compliance-equals-survival' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You can now track a writer\'s changing lens across a career — and hear the difference between reforming a society and indicting it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_013', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, return to node c12_hin_a_cbse_11_009 (Irony and Symbolism) and practice.',
          misconception: 'Students think "critical analysis" means *finding faults* in the story or *expressing personal opinions* ("I feel the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-2 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 11\' का कथानक — \'अंतरा भाग-2 — पाठ 11\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, return to node c12_hin_a_cbse_11_009 (Irony and Symbolism) and practice identifying *one*.',
                  misconception: 'Students think "critical analysis" means *finding faults* in the story or *expressing personal opinions* ("I feel the author is wrong about.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['If a student cannot move beyond summary/opinion: 1.', 'Give them a one-paragraph summary of "ckyd cp x;k" and a model analytical paragraph on the same paragraph.', 'Ask them to highlight every sentence in the model that *does not appear in the summary* (these are the analytical.', 'Practice the "So what?" drill: After every evidence quote, write "This shows that..." and "This matters because...".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_014', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck on Evidence: re-do node c12_hin_a_cbse_11_012 (Comprehension) exercises on "find.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'Rewrite the following weak answer into a PEEL-structured response (30–40 words): "The story \'?kM+h osQ iq”ksZ\' says time is important.', answer: '**Point:** The author critiques society\'s casual attitude toward time',
                  options: ['**Point:** The author critiques society\'s casual attitude toward time', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence: re-do node c12_hin_a_cbse_11_012 (Comprehension) exercises on "find the line.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Compare the writing demands of a 3-mark short answer (30–40 words) and a 6-mark long answer (100–120 words) for this chapter.', answer: 'In a 3-mark answer, PEEL is compressed: one sharp Point, one precise Evidence,',
                  options: ['In a 3-mark answer, PEEL is compressed: one sharp Point, one precise Evidence,', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence: re-do node c12_hin_a_cbse_11_012 (Comprehension) exercises on "find the line.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['If a student cannot produce a PEEL response: (1) Give them a 2-mark question and a model PEEL answer; ask them to label.', '(2) Have them write *only* the Point for three different questions — drill the skill of framing an argument, not.', '(3) Revisit node c12_hin_a_cbse_11_012 (Comprehension) to practice extracting precise Evidence, then node.', 'Re-diagnose with a fresh 3-mark question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Creative writing tasks (diary entry, letter) based on the chapter don\'t need textual evidence because they are imaginative.".', answer: 'Refute',
                  options: ['Refute', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If stuck on Evidence: re-do node c12_hin_a_cbse_11_012 (Comprehension) exercises on "find the line.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['If a student cannot produce a PEEL response: (1) Give them a 2-mark question and a model PEEL answer; ask them to label.', '(2) Have them write *only* the Point for three different questions — drill the skill of framing an argument, not.', '(3) Revisit node c12_hin_a_cbse_11_012 (Comprehension) to practice extracting precise Evidence, then node.', 'Re-diagnose with a fresh 3-mark question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_015', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, revisit c12_hin_a_cbse_11_012 (Comprehension) for evidence‑location practice.',
          misconception: 'Students treat "discussion points" as a memory test: they memorise the NCERT end‑of‑chapter questions and recite them.',
          parts: [
                { id: 'a', prompt: 'Which of the three pieces in the chapter uses a folk‑tale framework to explore the value of labour and choice? (Only the title of the piece is required.)', answer: 'Correct answer: "<sys pqu yks" (तीसरा टुकड़ा)',
                  options: ['Correct answer: "<sys pqu yks" (तीसरा टुकड़ा)', 'ckyd cp x;k', '?कM+h osQ iq”ksZ'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_11_012 (Comprehension) for evidence‑location practice and.',
                  misconception: 'Students treat "discussion points" as a memory test: they memorise the NCERT end‑of‑chapter questions and recite them verbatim.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student pick *one* piece and read it aloud twice — once for flow, once to underline two sentences that struck.', 'Ask them to explain *why* those sentences mattered in their own words (no textbook language).', 'Pair them with a peer; the peer asks one "Why?" question.', 'The student must answer using the underlined sentences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
