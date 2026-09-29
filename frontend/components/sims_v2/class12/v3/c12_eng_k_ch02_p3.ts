import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch02_p3: SimDef = {
    id: 'v3_c12_eng_k_ch02_p3',
    title: 'Eveline (Short Story) · Part 3/3',
    subtitle: 'The ship waited. The railing won.',
    classLevel: 12, subject: 'eng_k', topic: 'Eveline (Short Story) · Part 3/3',
    chapters: ['c12_eng_k_ch02'],
    nodeIds: ['c12_eng_k_cbse_02_013', 'c12_eng_k_cbse_02_014', 'c12_eng_k_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist fiction reader', intro: 'A young woman must choose between a sailor and her dead mother\'s promise — and history has already chosen for her.', goal: 'Read Eveline through Dubliners\' paralysis, Joycean epiphany and the colonial-economic forces behind her freeze.' },
    discovery: {
        question: 'A boat to Buenos Aires waits, Frank holds her hand — and Eveline grips the iron railing instead. A classmate blames \'her abusive father.\' What bigger forces does that verdict miss?',
        options: ['Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect', 'Nothing — the father is the sole cause', 'She simply didn\'t love Frank', 'The ship left without her'],
        answer: 'Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect',
        hook: 'Joyce\'s epiphany isn\'t a joyful aha — it\'s bleak clarity: the organ tune carries her mother\'s fate, and Eveline sees escape as another trap. Modernism\'s move is interiority — \'evening invade the avenue\' — her paralysis is the real plot.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Eveline\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit at that window in 1904 Dublin: weigh the dusty cretonne, the seven shillings, the deathbed promise and Frank\'s tales — and judge whether Eveline\'s stillness is failure or colonised fate.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Eveline\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What narrative technique does James Joyce primarily use to present Eveline\'s thoughts and feelings in the story?', options: [
                { text: 'Free indirect discourse (also called free indirect style), where the third-person', outcome: 'Free indirect discourse (also called free indirect style), where the third-person narrator adopts.' },
                { text: 'first-person narration', outcome: 'Not quite — Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos.', reveals: 'eveline-s-paralysis-is-caused' },
                { text: 'stream of consciousness', outcome: 'Not quite — Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos.', reveals: 'eveline-s-paralysis-is-caused' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Eveline\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Point, Example.' },
                { text: 'Point, Example, Explanation, Language', outcome: 'Not quite — Students believe "writing skills" for literature means memorising sample answers for predicted.', reveals: 'writing-skills-for-literature-means' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" for literature means memorising sample answers for predicted.', reveals: 'writing-skills-for-literature-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Eveline\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List the two discussion questions given in the NCERT "Talking about the Text" section for *Eveline*.', options: [
                { text: 'The two questions are: 1) "Deciding between filial duty and the right to personal', outcome: 'The two questions are: 1) "Deciding between filial duty and the right to personal happiness.' },
                { text: 'A wrong answer (e.g., recalling plot questions like', outcome: 'Not quite — Students believe a literary discussion is just sharing opinions ("I think Eveline should have.', reveals: 'a-literary-discussion-is-just' },
                { text: 'I think Eveline should have left', outcome: 'Not quite — Students believe a literary discussion is just sharing opinions ("I think Eveline should have.', reveals: 'a-literary-discussion-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Offered a scholarship abroad, a student freezes: a dying promise at home pulls one way, escape the other. Weeks pass and she hasn\'t answered the offer at all.',
            decisions: [{ prompt: 'What does \'Eveline\' warn about this limbo?', options: [
                { text: 'That paralysis is itself a choice — Joyce\'s Eveline stays not because duty won but because habit and guilt froze her; decide deliberately or the indecision decides for you.', outcome: 'The story\'s tragedy is that Eveline never chooses — she defaults. Naming the trade-off and choosing is the way out of paralysis.' },
                { text: 'Stay — duty to family always outranks personal freedom.', outcome: 'Joyce doesn\'t crown duty; he shows a mind so colonised by obligation it can\'t move — that\'s the disease, not the answer.', reveals: 'duty-paralysis' },
                { text: 'Let the deadline lapse — whatever happens without deciding was meant to be.', outcome: 'Defaulting is choosing by other means; Eveline \'chose\' to stay precisely by failing to choose.', reveals: 'avoidance-as-choice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a girl frozen at a railing as a whole country\'s paralysis. Joyce teaches that the hardest prisons are built of duty, memory and fear.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_013', difficulty: 'standard',
          question: 'Critical thinking on \'Eveline\' — analysing the text to reach evidence-based.',
          hint: 'Review c12_eng_k_cbse_02_008 (Imagery and Metaphor) for symbol tracking and.',
          misconception: 'Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos Aires, Frank\'s true.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "paralysis" (a central theme in *Dubliners*) to Eveline\'s physical grip on the iron railing at the dock.', answer: 'Step 1: Identify the moment',
                  options: ['Step 1: Identify the moment', 'clutched', 'blackthorn stick', 'odour of dusty cretonne'],
                  hint: 'Review c12_eng_k_cbse_02_008 (Imagery and Metaphor) for symbol tracking and c12_eng_k_cbse_02_009.',
                  misconception: 'Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos Aires, Frank\'s true character).' }
          ],
            remediations: { 'eveline-s-paralysis-is-caused': { steps: ['Re-read the three "Stop and Think" questions embedded in the NCERT text — they are Joyce\'s own signposts for the.', 'Go to sibling node c12_eng_k_cbse_02_009 (Literary Devices: Irony and Symbolism) and re-do the exercise on the.', 'Practice identifying free indirect discourse: take the paragraph beginning "She had consented to go away..." and.', 'Write a 150-word answer to Diagnostic Question 5 using the PEEL structure (Point, Evidence, Explanation, Link) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos Aires, Frank\'s true.',
          parts: [
                { id: 'a', prompt: 'Judge whether Eveline\'s final passivity — "She set her white face to him, passive, like a helpless animal" — is a failure of courage or a conscious choice.', answer: 'It is a conscious choice of duty, not mere cowardice',
                  options: ['It is a conscious choice of duty, not mere cowardice', 'weakness', 'odour of dusty cretonne', 'pitiful vision of her mother\'s life'],
                  hint: 'Review c12_eng_k_cbse_02_008 (Imagery and Metaphor) for symbol tracking and c12_eng_k_cbse_02_009.',
                  misconception: 'Students often believe Eveline\'s paralysis is caused solely by fear of the unknown (the sea, Buenos Aires, Frank\'s true character).' }
          ],
            remediations: { 'eveline-s-paralysis-is-caused': { steps: ['Re-read the three "Stop and Think" questions embedded in the NCERT text — they are Joyce\'s own signposts for the.', 'Go to sibling node c12_eng_k_cbse_02_009 (Literary Devices: Irony and Symbolism) and re-do the exercise on the.', 'Practice identifying free indirect discourse: take the paragraph beginning "She had consented to go away..." and.', 'Write a 150-word answer to Diagnostic Question 5 using the PEEL structure (Point, Evidence, Explanation, Link) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills from \'Eveline\' — using the text as a model or springboard for.',
          hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text (pages 13, 15, 17).',
          misconception: 'Students believe "writing skills" for literature means memorising sample answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Explanation, Language', 'writing skills'],
                  hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text (pages 13, 15, 17) — they are.',
                  misconception: 'Students believe "writing skills" for literature means memorising sample answers for predicted questions.' },
                { id: 'b', prompt: 'Compare these two openings for an answer on "Eveline\'s conflict between duty and desire". Which is stronger and why?', answer: 'Opening B is stronger',
                  options: ['Opening B is stronger', 'writing skills'],
                  hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text (pages 13, 15, 17) — they are.',
                  misconception: 'Students believe "writing skills" for literature means memorising sample answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['If a student cannot produce a coherent PEEL paragraph under timed conditions: (1) Return to c12_eng_k_cbse_02_012.', '(2) Practice the "PEEL skeleton" drill: given a prompt, write only the Point and Link sentences in 2 minutes; then add.', '(3) Re-attempt a 6-mark question with the skeleton, then expand.', '(4) If still stuck, revisit c11_eng_h_cbse_01_014 (Class 11 Writing Skills) for the foundational PEEL workshop.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_015', difficulty: 'standard',
          question: 'Discussion points on \'Eveline\' — speaking and listening around the text.',
          hint: 'If stuck, revisit c12_eng_k_cbse_02_013 (Critical Thinking) for analytical frameworks and.',
          misconception: 'Students believe a literary discussion is just sharing opinions ("I think Eveline should have left") without textual.',
          parts: [
                { id: 'a', prompt: 'During a discussion, a classmate says, "Eveline is weak because she didn\'t board the ship." Using textual evidence, how would you respond to extend the.', answer: 'Acknowledge their view ("I see why you\'d say that',
                  options: ['Acknowledge their view ("I see why you\'d say that', 'Could her paralysis be a response to the weight of her mother\'s promise?', 'No, she\'s not weak, she\'s just scared', 'I think Eveline should have left'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_02_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students believe a literary discussion is just sharing opinions ("I think Eveline should have left") without textual anchoring, or that.' }
          ],
            remediations: { 'a-literary-discussion-is-just': { steps: ['If a student cannot move beyond opinion: 1) Have them re-read the NCERT "Appreciation" questions (symbolism, narrative.', '2) Practice the "Evidence Sandwich" orally: Claim → Quote a phrase → Explain significance.', '3) Do a timed think-pair-share where each partner must use one piece of evidence.', '4) Debrief: "What did your partner\'s evidence add to your view?" This builds the habit of evidence-based talk.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
