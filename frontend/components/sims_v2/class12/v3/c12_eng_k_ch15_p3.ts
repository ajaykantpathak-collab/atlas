import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch15_p3: SimDef = {
    id: 'v3_c12_eng_k_ch15_p3',
    title: 'The Mark on the Wall (Non-fiction) · Part 3/3',
    subtitle: 'A snail-shaped thought: the essay where the plot refuses to show up',
    classLevel: 12, subject: 'eng_k', topic: 'The Mark on the Wall (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch15'],
    nodeIds: ['c12_eng_k_cbse_15_013', 'c12_eng_k_cbse_15_014', 'c12_eng_k_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist essay reader', intro: 'One smudge on a wall detonates a whole philosophy of mind. Virginia Woolf at her freest.', goal: 'Read The Mark on the Wall as stream of consciousness — where association, not plot, is the architecture.' },
    discovery: {
        question: 'A narrator stares at a mark on the wall and thinks of Shakespeare, snails and the meaning of knowledge — for pages. Where did the plot go?',
        options: ['Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one', 'It got lost — bad writing', 'The mark is a murder mystery clue', 'It\'s a diary, not an essay'],
        answer: 'Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one',
        hook: 'Woolf believed life is \'a luminous halo,\' not a chain of episodes — so stream of consciousness isn\'t first-person rambling but the deliberate music of a mind moving. The mark, the fire, the tree are just launchpads; the real action is thought itself.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Mark on the Wall\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_15_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Surrender the plot and follow the mind: ride one small mark through memories, mockeries of Sunday luncheons and Whitaker\'s precedency, to Woolf\'s larger question — what can anyone actually know?',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Mark on the Wall\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary narrative technique Virginia Woolf employs in "The Mark on the Wall," and how does it differ from a conventional linear.', options: [
                { text: 'The primary technique is stream of consciousness', outcome: 'The primary technique is stream of consciousness, which presents thoughts as they arise.' },
                { text: 'first-person narration', outcome: 'Not quite — Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning".', reveals: 'the-essay-is-about-the' },
                { text: 'flashback', outcome: 'Not quite — Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning".', reveals: 'the-essay-is-about-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Mark on the Wall\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the primary narrative technique Virginia Woolf employs in "The Mark on the Wall," and how does it differ from traditional linear.', options: [
                { text: 'The primary technique is **stream of consciousness**', outcome: 'The primary technique is **stream of consciousness** — a modernist mode that presents thoughts.' },
                { text: 'first-person narration', outcome: 'Not quite — **Students treat "Writing Skills" as "summarizing the story in their own words."** They write.', reveals: 'students-treat-writing-skills-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Mark on the Wall\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the four key discussion stems used to build on a peer\'s idea in a literary discussion, and why is each necessary for.', options: [
                { text: 'The four key stems are: "I agree with X because..." (forces evidence), "Building on X\'s', outcome: 'The four key stems are: "I agree with X because..." (forces evidence), "Building on X\'s point...".' },
                { text: 'I agree', outcome: 'Not quite — Students think "discussion" means sharing personal opinions about the story ("I liked the tree.', reveals: 'discussion-means-sharing-personal-opinions' },
                { text: 'I think', outcome: 'Not quite — Students think "discussion" means sharing personal opinions about the story ("I liked the tree.', reveals: 'discussion-means-sharing-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Reviewing an experiment, the team spots an odd mark in the data and someone demands \'classify it now and move on\'.',
            decisions: [{ prompt: 'What would Woolf\'s mark on the wall suggest?', options: [
                { text: 'Sit with it first — the essay\'s whole method is resisting the reflex to label; let perception roam before deciding, because the premature category decides what you\'re allowed to see.', outcome: 'The mark turns out to be a snail — but the thinking it provoked was the real content; observation before classification is the skill.' },
                { text: 'Label it immediately — a mystery is just a task awaiting a tag.', outcome: 'That\'s the habit Woolf is unweaving: the instant category closes perception and you never see what the thing actually is.', reveals: 'label-first-perception' },
                { text: 'Skip it — if it ends up trivial like a snail, the reflection was wasted anyway.', outcome: 'Judging the process by the triviality of the answer misses that the noticing itself was the point.', reveals: 'process-equals-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You can now read \'nothing happening\' as everything happening — modernism\'s great trade of event for consciousness. This essay rewires how you measure a text.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Mark on the Wall\' — analysing the text to reach.',
          hint: 'If the thought-clusters feel like a blur, return to c12_eng_k_cbse_15_012 (Comprehension).',
          misconception: 'Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning" behind the object.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative technique Virginia Woolf employs in "The Mark on the Wall," and how does it differ from a conventional linear narrative?', answer: 'The primary technique is stream of consciousness',
                  options: ['The primary technique is stream of consciousness', 'first-person narration', 'flashback', 'hidden meaning'],
                  hint: 'If the thought-clusters feel like a blur, return to c12_eng_k_cbse_15_012 (Comprehension) and.',
                  misconception: 'Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning" behind the object.' }
          ],
            remediations: { 'the-essay-is-about-the': { steps: ['If a student cannot move beyond plot summary: (1) Have them re-read only the first three paragraphs and list every noun.', '(2) Ask: "What do these have in common?" (They are all triggered *by* the mark but are not the mark.) (3) Direct them.', '(4) Assign a 5-minute free-writing exercise: stare at a spot on the wall and write *exactly* what comes to mind without.', 'Compare the result to Woolf\'s moves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning" behind the object.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: Is the revelation that the mark is a snail an effective ending?', answer: 'Yes, it is effective precisely',
                  options: ['Yes, it is effective precisely', 'hidden meaning', 'confusing', 'disorganized'],
                  hint: 'If the thought-clusters feel like a blur, return to c12_eng_k_cbse_15_012 (Comprehension) and.',
                  misconception: 'Students believe the essay is *about* the mark (or the snail) and hunt for a "hidden meaning" behind the object.' }
          ],
            remediations: { 'the-essay-is-about-the': { steps: ['If a student cannot move beyond plot summary: (1) Have them re-read only the first three paragraphs and list every noun.', '(2) Ask: "What do these have in common?" (They are all triggered *by* the mark but are not the mark.) (3) Direct them.', '(4) Assign a 5-minute free-writing exercise: stare at a spot on the wall and write *exactly* what comes to mind without.', 'Compare the result to Woolf\'s moves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_014', difficulty: 'standard',
          question: 'Writing skills from \'The Mark on the Wall\' — using the text as a model.',
          hint: 'If stuck on writing analytical claims, revisit **c12_eng_k_cbse_15_013 (Critical.',
          misconception: '**Students treat "Writing Skills" as "summarizing the story in their own words."** They write: "First the narrator sees.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative technique Virginia Woolf employs in "The Mark on the Wall," and how does it differ from traditional linear storytelling?', answer: 'The primary technique is **stream of consciousness**',
                  options: ['The primary technique is **stream of consciousness**', 'first-person narration'],
                  hint: 'If stuck on writing analytical claims, revisit **c12_eng_k_cbse_15_013 (Critical Thinking)** and.',
                  misconception: '**Students treat "Writing Skills" as "summarizing the story in their own words."** They write: "First the narrator sees a mark.' },
                { id: 'b', prompt: 'In the essay, the narrator says: "I want to think quietly, calmly, spaciously, never to be interrupted...', answer: '"The surface" represents **external, imposed reality**',
                  options: ['"The surface" represents **external, imposed reality**', 'flow together like a stream', 'surface', 'the wall'],
                  hint: 'If stuck on writing analytical claims, revisit **c12_eng_k_cbse_15_013 (Critical Thinking)** and.',
                  misconception: '**Students treat "Writing Skills" as "summarizing the story in their own words."** They write: "First the narrator sees a mark.' },
                { id: 'c', prompt: 'Compare the function of the "mark on the wall" in this essay with the function of the "cherry tree" in the Class 8 prose "The Cherry Tree" (node.', answer: 'In "The Mark on the Wall," the mark is a **catalyst for associative divergence**',
                  options: ['In "The Mark on the Wall," the mark is a **catalyst for associative divergence**', 'both are symbols of nature', 'both start the story'],
                  hint: 'If stuck on writing analytical claims, revisit **c12_eng_k_cbse_15_013 (Critical Thinking)** and.',
                  misconception: '**Students treat "Writing Skills" as "summarizing the story in their own words."** They write: "First the narrator sees a mark.' }
          ],
            remediations: { 'students-treat-writing-skills-as': { steps: ['If a student submits a summary instead of analysis: 1.', '**Highlight** every sentence that merely recounts content (e.g., "She thinks of the fire," "She remembers the.', '**Ask**: "What is the *function* of this detail in Woolf\'s argument about thought?" 3.', '**Model** the conversion: "She remembers the fire" → "The fire\'s \'steady film of yellow light\' anchors the narrator.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_015', difficulty: 'standard',
          question: 'Discussion points on \'The Mark on the Wall\' — speaking and listening around the.',
          hint: 'If stuck, review c12_eng_k_cbse_15_013 (Critical Thinking) for analysis models and.',
          misconception: 'Students think "discussion" means sharing personal opinions about the story ("I liked the tree part").',
          parts: [
                { id: 'a', prompt: 'Design a 3-round fishbowl discussion structure for the question: "Does the snail ending trivialise the narrator\'s philosophical reflections?" Specify roles.', answer: 'Round 1 (inner circle, 5 min): 4-5 students debate using ≥2 textual quotes each',
                  options: ['Round 1 (inner circle, 5 min): 4-5 students debate using ≥2 textual quotes each', 'collaborative problem-solving', 'discussion', 'I liked the tree part'],
                  hint: 'If stuck, review c12_eng_k_cbse_15_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students think "discussion" means sharing personal opinions about the story ("I liked the tree part").' },
                { id: 'b', prompt: 'Compare how two different discussion formats (Socratic seminar vs formal debate) would differently illuminate the theme of "gender and authority" in the.', answer: 'Socratic seminar: Collaborative exploration',
                  options: ['Socratic seminar: Collaborative exploration', 'discuss', 'critically evaluate', 'discussion'],
                  hint: 'If stuck, review c12_eng_k_cbse_15_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students think "discussion" means sharing personal opinions about the story ("I liked the tree part").' }
          ],
            remediations: { 'discussion-means-sharing-personal-opinions': { steps: ['If student gives opinion-only responses: (1) Model evidence-based turn: "In paragraph 12, Woolf writes \'the slow.', '(3) Use stem cards: "The text shows...", "This connects to...", "I\'m wondering whether...".', '(4) Re-assess with Diagnostic Question 2.', 'If still stuck, revisit c12_eng_k_cbse_15_013 (Critical Thinking) for analysis models and c11_eng_h_cbse_01_015 for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
