import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch21_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch21_p3: SimDef = {
    id: 'v3_c12_eng_k_ch21_p3',
    title: 'Broken Images (Drama) · Part 3/3',
    subtitle: 'Her bestselling self walked off the screen — to cross-examine her',
    classLevel: 12, subject: 'eng_k', topic: 'Broken Images (Drama) · Part 3/3',
    chapters: ['c12_eng_k_ch21'],
    nodeIds: ['c12_eng_k_cbse_21_013', 'c12_eng_k_cbse_21_014', 'c12_eng_k_cbse_21_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian drama critic', intro: 'A writer sits for an interview and gets interrogated by her own televised image. Karnad turns language politics into theatre.', goal: 'Read Broken Images through bilingual identity, media\'s mirror and the English-vs-mother-tongue debate.' },
    discovery: {
        question: 'A Kannada writer\'s English novel wins global fame — and her own televised image walks off the screen to accuse her of betrayal. What is the Image really prosecuting?',
        options: ['Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image', 'Plagiarism', 'The TV channel\'s bias', 'Stage fright'],
        answer: 'Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image',
        hook: 'Karnad lived both tongues — Jnanpith laureate in Kannada and English — so the play\'s real debate is deeper than language: money, envy and who owns \'authentic Indian-ness.\' The studio\'s plasma screens aren\'t décor; the mediated self is the stage. Eliot\'s \'heap of broken images\' is the thesis.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s explicit and implicit meanings, questioning authorial choices, evaluating evidence from the text, and forming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_21_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the interrogation Manjula can\'t escape: weigh the announcer\'s roll-call of bilingual Kannada greats, decode what the Image wants, and judge whether writing in English is betrayal — or inheritance.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine watching a celebrity interview where the guest presents a polished, rehearsed persona — but the moment the camera stops rolling, their mask slips and.',
            decisions: [{ prompt: 'What is the primary dramatic function of the "Image" in *Broken Images*?', options: [
                { text: 'The Image functions as an externalized conscience / alter ego that remains on screen', outcome: 'The Image functions as an externalized conscience / alter ego that remains on screen after the.' },
                { text: 'a ghost', outcome: 'Not quite — Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost,.', reveals: 'students-frequently-treat-the-image' },
                { text: 'a technical glitch', outcome: 'Not quite — Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost,.', reveals: 'students-frequently-treat-the-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: *"How does the Image function as a dramatic device to reveal Manjula\'s inner conflict?"* You know the.',
            decisions: [{ prompt: 'Define the PEEL structure for literature answer writing and state the purpose of each component in one sentence.', options: [
                { text: 'PEEL stands for Point (a clear topic sentence answering the question), Evidence (a', outcome: 'PEEL stands for Point (a clear topic sentence answering the question), Evidence (a specific textual.' },
                { text: 'Point, Example, Explain, Link', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means *summarizing* the story in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'explaining the quote', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means *summarizing* the story in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle discussing why Manjula\'s televised speech feels rehearsed yet her private conversation with the Image feels raw.',
            decisions: [{ prompt: 'What is the primary dramatic device Karnad uses to turn Manjula\'s monologue into a dialogue, and what does this device literally represent.', options: [
                { text: 'The primary device is the "Image"', outcome: 'The primary device is the "Image" — Manjula\'s televised projection on the plasma screen that.' },
                { text: 'the announcer', outcome: 'Not quite — Students think "discussion points" means summarizing the plot or listing themes.', reveals: 'discussion-points-means-summarizing-the' },
                { text: 'the lapel mike', outcome: 'Not quite — Students think "discussion points" means summarizing the plot or listing themes.', reveals: 'discussion-points-means-summarizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_013', title: 'Use it in the wild',
          caseStudy: { intro: 'An Indian novelist wins a big English-language prize and starts publicly disowning her earlier vernacular books as \'practice work in a smaller language\'.',
            decisions: [{ prompt: 'What would Karnad\'s Broken Images say?', options: [
                { text: 'That English success is legitimate but the denial fractures the self — the play interrogates a bilingual writer who must hold both languages without ranking one as the betrayal and the other as the coronation.', outcome: 'The \'broken images\' are the selves she can\'t integrate; prestige in one tongue doesn\'t require disowning the other.' },
                { text: 'She\'s right — the English prize proves which language mattered.', outcome: 'That\'s the hierarchy the play dismantles; conflating market prestige with literary worth is the wound, not the win.', reveals: 'english-equals-prestige' },
                { text: 'She\'s a traitor — writing in English at all is the betrayal.', outcome: 'Karnad lists a whole tradition of bilingual Indian writers; the guilt-trip is as false as the triumphalism.', reveals: 'english-is-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a TV studio as a courtroom for the bilingual self — and see India\'s language politics staged as one woman\'s argument with her own image.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, return to the T-chart exercise in ON_FAILURE and re-read Manjula\'s speech.',
          misconception: 'Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost, AI glitch,.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "unreliable narrator" to Manjula Nayak. Is she reliable? Cite two specific moments where her credibility fractures.', answer: 'Manjula is an unreliable narrator',
                  options: ['Manjula is an unreliable narrator', 'honest because she admits flaws', 'it burst out in English'],
                  hint: 'If stuck, return to the T-chart exercise in ON_FAILURE and re-read Manjula\'s speech (pp.226-229).',
                  misconception: 'Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost, AI glitch, or doppelgänger) rather than.' }
          ],
            remediations: { 'students-frequently-treat-the-image': { steps: ['Re-read the transition at p.230: "The light turns red...', 'I have taken enough shit from them." — This is the mask slipping.', 'Revisit node **c12_eng_k_cbse_21_009** (Irony and Symbolism) to review how dramatic irony operates here.', 'Complete a T-chart: Column A = Manjula\'s televised claims; Column B = Image\'s counters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost, AI glitch,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the play\'s satire on the Indian literary establishment.', answer: 'Karnad satirizes *both*',
                  options: ['Karnad satirizes *both*', 'betrayal', 'genuine Indian feel', 'You can\'t win!'],
                  hint: 'If stuck, return to the T-chart exercise in ON_FAILURE and re-read Manjula\'s speech (pp.226-229).',
                  misconception: 'Students frequently treat the "Image" as a supernatural or science-fiction element (a ghost, AI glitch, or doppelgänger) rather than.' }
          ],
            remediations: { 'students-frequently-treat-the-image': { steps: ['Re-read the transition at p.230: "The light turns red...', 'I have taken enough shit from them." — This is the mask slipping.', 'Revisit node **c12_eng_k_cbse_21_009** (Irony and Symbolism) to review how dramatic irony operates here.', 'Complete a T-chart: Column A = Manjula\'s televised claims; Column B = Image\'s counters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "Broken Images" refers to the ability.',
          hint: 'If stuck on Evidence selection: Revisit c12_eng_k_cbse_21_008 (Imagery/Metaphor) and.',
          misconception: 'Students believe "Writing Skills based on the chapter" means *summarizing* the story in their own words.',
          parts: [
                { id: 'a', prompt: 'Compare these two answers to the question *"Discuss the significance of the title \'Broken Images\'."* Which is stronger and why?', answer: '**Answer B is stronger.** It demonstrates: (1) **Textual range**',
                  options: ['**Answer B is stronger.** It demonstrates: (1) **Textual range**', 'Writing Skills based on the chapter'],
                  hint: 'If stuck on Evidence selection: Revisit c12_eng_k_cbse_21_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means *summarizing* the story in their own words. They write: *"Manjula is a writer.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a narrative recount: 1.', '**Diagnose:** Highlight every sentence that is plot summary (yellow) vs.', '**Model:** Take their first plot point ("Manjula wrote in English") and convert it to PEEL: *Point: Language choice.', 'Evidence: "Intellectuals...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) to re-learn how the Image.',
          misconception: 'Students think "discussion points" means summarizing the plot or listing themes.',
          parts: [
                { id: 'a', prompt: 'What is the primary dramatic device Karnad uses to turn Manjula\'s monologue into a dialogue, and what does this device literally represent on stage?', answer: 'The primary device is the "Image"',
                  options: ['The primary device is the "Image"', 'the announcer', 'the lapel mike', 'discussion points'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) to re-learn how the Image functions.',
                  misconception: 'Students think "discussion points" means summarizing the plot or listing themes.' }
          ],
            remediations: { 'discussion-points-means-summarizing-the': { steps: ['If a student offers only plot summary: (1) Stop them and ask: "What is the *tension* in that scene?" (2) Have them find.', '"I have committed the cardinal sin of writing in English").', '(3) Ask: "Can both be true?', 'Why does Karnad put them in the same character?" (4) Assign re-reading of the Image\'s first appearance (pp.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
