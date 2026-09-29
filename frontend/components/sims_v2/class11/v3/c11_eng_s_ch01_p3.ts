import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch01_p3: SimDef = {
    id: 'v3_c11_eng_s_ch01_p3',
    title: 'The Summer of the Beautiful White Horse · Part 3/3',
    subtitle: 'Test a boy\'s loophole logic against a tribe\'s absolute honesty.',
    classLevel: 11, subject: 'eng_s', topic: 'The Summer of the Beautiful White Horse · Part 3/3',
    chapters: ['c11_eng_s_ch01'],
    nodeIds: ['c11_eng_s_cbse_01_013', 'c11_eng_s_cbse_01_014', 'c11_eng_s_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader untangling a childhood memory from its excuses', intro: 'A stolen horse ridden at dawn by a boy who swears it isn\'t theft — the adult telling the story knows better, and so does the tribe.', goal: 'Analyse the retrospective frame and evaluate the boys\' moral reasoning against the Garoghlanian code.' },
    discovery: {
        question: 'Mourad has the neighbour\'s missing horse but insists it isn\'t stealing — \'it wouldn\'t become stealing until we offered to sell.\' By his own tribe\'s code, is he right?',
        options: ['No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation', 'Yes — borrowing for joy isn\'t theft in any moral system', 'Yes — the code only forbids selling stolen goods', 'No — but only because John Byro actually recognised the horse'],
        answer: 'No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation',
        hook: '\'Proud first, honest next\' — the boys\' loophole collapses the moment Mourad himself snaps, \'Are you inviting a member of the Garoghlanian family to steal?\'',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Summer of the Beautiful White Horse\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the adult narrator\'s nostalgia from nine-year-old Aram\'s excuses, order the events chronologically, and place the real moment of moral reckoning.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Summer of the Beautiful White Horse\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "narrative irony" as it operates in first-person retrospective narration, and give one example from the story\'s opening paragraph.', options: [
                { text: 'Narrative irony occurs when the narrating "I" (adult Aram) possesses knowledge or', outcome: 'Narrative irony occurs when the narrating "I" (adult Aram) possesses knowledge or perspective that.' },
                { text: 'I think Mourad is crazy like his uncle', outcome: 'Not quite — Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy.', reveals: 'students-consistently-confuse-interpretation-wit' },
                { text: 'analysis', outcome: 'Not quite — Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy.', reveals: 'students-consistently-confuse-interpretation-wit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Summer of the Beautiful White Horse\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'Define the PEEL structure for analytical paragraph writing and state one reason why it is required in Class 11 board exam answers.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual detail or', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual detail or quote).' },
                { text: 'what happens', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means *retelling the story in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'why it matters', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means *retelling the story in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Summer of the Beautiful White Horse\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List three distinct thematic tensions in the story that could sustain a 10-minute group discussion, and for each, provide one specific.', options: [
                { text: 'Correct answer: (1) Honesty vs', outcome: 'Correct answer: (1) Honesty vs. Desire — Aram\'s rationalization: "If you were crazy about horses...' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" are just personal reactions ("I liked the horse part").', reveals: 'discussion-points-are-just-personal' },
                { text: 'I liked the horse part', outcome: 'Not quite — Students believe "discussion points" are just personal reactions ("I liked the horse part").', reveals: 'discussion-points-are-just-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading circle is adapting \'The Summer of the Beautiful White Horse\' into a short play. The scriptwriter adds a police chase and a courtroom verdict scene: \'A stolen horse needs a crime plot — someone\'s got to arrest Mourad.\'',
            decisions: [{ prompt: 'Does the story support a police-case climax?', options: [
                { text: 'No — the conflict is internal, not legal: the Garoghlanian tribe\'s creed (\'proud first, honest next\') means the real drama is Aram struggling to square \'no Garoghlanian could be a thief\' with the horse standing in front of him. The resolution is the tribe\'s values quietly reasserting themselves — not a court.', outcome: 'Context is the key: an Armenian immigrant community in California whose honour code makes the horse\'s presence a paradox, not a police file.' },
                { text: 'The chase works — theft is theft, and every stolen-horse story needs law and order stakes.', outcome: 'That imports a generic crime plot; the story\'s tension is moral — a boy reconciling tribal honesty with longing — and the horse is returned without any authority involved.', reveals: 'internal-conflict-needs-police' },
                { text: 'Set it in Armenia — the tribe\'s homeland is the natural stage for the horse story.', outcome: 'The story is set in California\'s San Joaquin Valley; the diaspora setting and the idealised Garoghlanian identity are essential context, not decoration.', reveals: 'story-set-in-armenia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'The horse goes back not because anyone was caught, but because the tribe\'s name couldn\'t survive being caught.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Summer of the Beautiful White Horse\' — analysing the.',
          hint: 'Review "first-person retrospective narration" in c11_eng_s_cbse_01_002 (Plot and.',
          misconception: 'Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy like his uncle".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Summer of the Beautiful White Horse\'',
                  options: ['Critical thinking on \'The Summer of the Beautiful White Horse\'', '\'The Summer of the Beautiful White Horse\' (Snapshots, ch', 'The plot/narrative arc of \'The Summer of the Beautiful White Horse\'', 'The setting of \'The Summer of the Beautiful White Horse\''],
                  hint: 'Review "first-person retrospective narration" in c11_eng_s_cbse_01_002 (Plot and Narrative.',
                  misconception: 'Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy like his uncle" instead of "The text.' }
          ],
            remediations: { 'students-consistently-confuse-interpretation-wit': { steps: ['Show the student two paragraphs on the same claim (e.g., "Mourad is wild")—one opinion-based ("I feel Mourad is wild.', 'Have them label each sentence as "claim," "evidence," or "explanation" to visualize the missing architecture.', 'Assign a micro-task: find three textual details that *show* (don\'t tell) Aram\'s fear during his solo ride, then write.', 'Reinforce: every interpretive claim must carry its own textual warrant.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy like his uncle".',
          parts: [
                { id: 'a', prompt: 'Evaluate the interpretation that Mourad returns the horse *solely* because John Byro\'s grace ("I would swear it is my horse if I didn\'t know your parents").', answer: 'This reading is incomplete',
                  options: ['This reading is incomplete', 'I think Mourad is crazy like his uncle', 'analysis'],
                  hint: 'Review "first-person retrospective narration" in c11_eng_s_cbse_01_002 (Plot and Narrative.',
                  misconception: 'Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy like his uncle" instead of "The text.' },
                { id: 'b', prompt: 'Create a 150-word analytical paragraph arguing that the story\'s true climax occurs not at the horse\'s return but at the moment Aram falls from the horse in the.', answer: 'The vineyard fall constitutes the story\'s psychological climax',
                  options: ['The vineyard fall constitutes the story\'s psychological climax', 'I think Mourad is crazy like his uncle', 'analysis'],
                  hint: 'Review "first-person retrospective narration" in c11_eng_s_cbse_01_002 (Plot and Narrative.',
                  misconception: 'Students consistently confuse *interpretation* with *opinion*—they write "I think Mourad is crazy like his uncle" instead of "The text.' }
          ],
            remediations: { 'students-consistently-confuse-interpretation-wit': { steps: ['Show the student two paragraphs on the same claim (e.g., "Mourad is wild")—one opinion-based ("I feel Mourad is wild.', 'Have them label each sentence as "claim," "evidence," or "explanation" to visualize the missing architecture.', 'Assign a micro-task: find three textual details that *show* (don\'t tell) Aram\'s fear during his solo ride, then write.', 'Reinforce: every interpretive claim must carry its own textual warrant.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills from \'The Summer of the Beautiful White Horse\' — using the text.',
          hint: 'If stuck, return to c11_eng_s_cbse_01_012 (Comprehension) and practice "Quote → Infer →.',
          misconception: 'Students believe that "writing skills based on the chapter" means *retelling the story in their own words*.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Aram is happy to ride the horse but feels guilty because stealing is wrong." Identify two specific textual details from the chapter that.', answer: 'Two precise textual details: (1) Aram says, "I couldn\'t believe what I saw',
                  options: ['Two precise textual details: (1) Aram says, "I couldn\'t believe what I saw', 'it wasn\'t stealing', 'writing skills based on the chapter'],
                  hint: 'If stuck, return to c11_eng_s_cbse_01_012 (Comprehension) and practice "Quote → Infer → Explain".',
                  misconception: 'Students believe that "writing skills based on the chapter" means *retelling the story in their own words* or *memorising a sample answer*.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['**Diagnose the gap:** Ask the student to underline every textual reference in their answer.', 'If zero — they\'re summarising.', 'If vague ("the horse scene") — they\'re not anchoring.', '**Model one PEEL cycle together:** Pick a micro-claim ("Mourad understands horses better than people").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_015', difficulty: 'standard',
          question: 'Discussion points on \'The Summer of the Beautiful White Horse\' — speaking and.',
          hint: 'If stuck, review c11_eng_s_cbse_01_013 (Critical Thinking) for analysis models and.',
          misconception: 'Students believe "discussion points" are just personal reactions ("I liked the horse part") or comprehension questions.',
          parts: [
                { id: 'a', prompt: 'List three distinct thematic tensions in the story that could sustain a 10-minute group discussion, and for each, provide one specific textual moment that.', answer: 'Correct answer: (1) Honesty vs',
                  options: ['Correct answer: (1) Honesty vs', 'discussion points', 'I liked the horse part', 'Why did Aram fall off?'],
                  hint: 'If stuck, review c11_eng_s_cbse_01_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students believe "discussion points" are just personal reactions ("I liked the horse part") or comprehension questions ("Why did Aram fall.' },
                { id: 'b', prompt: 'A group member claims: "John Byro is naive — he lets the boys off the hook because he\'s lonely." Using the Discussion Point Structure (Claim + Evidence.', answer: 'Step 1: Counter-claim',
                  options: ['Step 1: Counter-claim', 'discussion points', 'I liked the horse part', 'Why did Aram fall off?'],
                  hint: 'If stuck, review c11_eng_s_cbse_01_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students believe "discussion points" are just personal reactions ("I liked the horse part") or comprehension questions ("Why did Aram fall.' },
                { id: 'c', prompt: 'Compare the discussion potential of two scenes: (A) Aram\'s first ride behind Mourad (para 4) and (B) Aram\'s solo ride where the horse leaps vines and throws.', answer: 'Scene B is richer',
                  options: ['Scene B is richer', 'discussion points', 'I liked the horse part', 'Why did Aram fall off?'],
                  hint: 'If stuck, review c11_eng_s_cbse_01_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students believe "discussion points" are just personal reactions ("I liked the horse part") or comprehension questions ("Why did Aram fall.' }
          ],
            remediations: { 'discussion-points-are-just-personal': { steps: ['Show a 2-minute video transcript of a "weak" discussion (opinions, interruptions, no text) vs.', 'a "strong" one (claims, citations, building on peers).', 'Give students 5 plot moments; have them convert each into a discussion point using the Claim-Evidence-Question-Theme.', 'Peer review: "Does this question have a \'right answer\' in the text?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
