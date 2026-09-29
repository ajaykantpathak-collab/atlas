import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_013', 'c11_hin_ar_cbse_06_014', 'c11_hin_ar_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 6\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_013', title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 6\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary dramatic function of the character \'Director\' (फुंस\'क) in the play "जतूह"? State in one sentence.', options: [
                { text: 'The Director represents institutional authority that perpetuates a contradictory system:', outcome: 'The Director represents institutional authority that perpetuates a contradictory system:.' },
                { text: 'He is the villain who hates students', outcome: 'Not quite — Students equate "critical analysis" with "finding faults" in characters or plot.', reveals: 'students-equate-critical-analysis-with' },
                { text: 'Jatuh is rude to the Director', outcome: 'Not quite — Students equate "critical analysis" with "finding faults" in characters or plot.', reveals: 'students-equate-critical-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_014', title: 'पाठ 6 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 6\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What are the four essential components of a character sketch written for a board exam answer?', options: [
                { text: 'The four components are: (1) a clear topic sentence stating the dominant trait, (2)', outcome: 'The four components are: (1) a clear topic sentence stating the dominant trait, (2) textual.' },
                { text: 'introduction, body, conclusion', outcome: 'Not quite — Students often treat writing tasks as plot summary, listing events in chronological order without.', reveals: 'students-often-treat-writing-tasks' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_013', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, review node 012 (Comprehension) and practice converting three inferential.',
          misconception: 'Students equate "critical analysis" with "finding faults" in characters or plot.',
          parts: [
                { id: 'a', prompt: 'Analyze the significance of the stage direction "नक़ल...नक़ल...नक़ल" (repeated thrice) in the tuition scene.', answer: 'Literally: students mindlessly copy',
                  options: ['Literally: students mindlessly copy', 'Jatuh is rude to the Director', 'The play is unrealistic'],
                  hint: 'If stuck, review node 012 (Comprehension) and practice converting three inferential answers into.',
                  misconception: 'Students equate "critical analysis" with "finding faults" in characters or plot.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Ask the student to list three things Jatuh *does* (not says) that challenge the system.', 'For each action, identify the stage direction or dialogue that shows the system\'s reaction.', 'Have them complete this sentence frame: "When Jatuh does X, the play reveals Y about the education system, because Z.".', 'Practice converting one frame into a PEEL paragraph.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_014', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review node 06_012 (Comprehension) and 06_013 (Critical Thinking) for.',
          misconception: 'Students often treat writing tasks as plot summary, listing events in chronological order without analysis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review node 06_012 (Comprehension) and 06_013 (Critical Thinking) for evidence-gathering.',
                  misconception: 'Students often treat writing tasks as plot summary, listing events in chronological order without analysis.' }
          ],
            remediations: { 'students-often-treat-writing-tasks': { steps: ['Show the student a side-by-side comparison: a plot-summary paragraph vs.', 'a PEEL-structured character sketch on the same character.', 'Highlight the four PEEL components in color (Point, Evidence, Explanation, Link).', 'Have the student practice by taking one trait ("idealistic") and finding two quotes from the play, then writing the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review c11_hin_ar_cbse_06_006 (Primary Theme) to re-anchor in the play\'s.',
          misconception: 'Students conflate "discussion points" with "opinions about the story" — they treat the play as a source of debatable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review c11_hin_ar_cbse_06_006 (Primary Theme) to re-anchor in the play\'s systemic thesis.',
                  misconception: 'Students conflate "discussion points" with "opinions about the story" — they treat the play as a source of debatable topics (e.g., "Should.' }
          ],
            remediations: { 'students-conflate-discussion-points-with': { steps: ['If a student offers opinion untethered from text: (1) Pause and ask "Which line or stage direction makes you say that?".', '(2) If they cannot cite, direct them to the relevant page cluster (e.g., "Look at pages 79-81 where the Principal and.', '(3) Then ask: "What does the Principal mean by \'नियम\'?', 'What does Jtuh mean?" — forcing semantic analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
