import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch22_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch22_p3: SimDef = {
    id: 'v3_c11_eng_w_ch22_p3',
    title: 'Tribal Verse (Essay) · Part 3/3',
    subtitle: 'Defend a literature with no script, no author and centuries of memory.',
    classLevel: 11, subject: 'eng_w', topic: 'Tribal Verse (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch22'],
    nodeIds: ['c11_eng_w_cbse_22_013', 'c11_eng_w_cbse_22_014', 'c11_eng_w_cbse_22_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a literature student arguing orality counts', intro: 'A Munda song, a Kondh song, an Adi song — none ever written down, all carried for centuries. Decide if that disqualifies them.', goal: 'Evaluate orality as literature and analyse the essay\'s inductive structure.' },
    discovery: {
        question: '\'Tribal songs are just folklore — no fixed form, no real authorship, no depth.\' Devy\'s counterargument?',
        options: ['Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality', 'Correct — without a script there can be no literature', 'Correct — anonymity means no aesthetic intent exists', 'Partly — they only gain depth once translated into print'],
        answer: 'Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality',
        hook: 'The bias is print\'s, not the songs\' — a living library carried in voice and memory is still literature, just one our syllabus forgot.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'My Three Passions\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_22_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the three tribal songs as evidence, then the \'Painted Words\' theory — and explain why the argument puts examples before analysis.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'My Three Passions\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary difference between analyzing a written lyric poem and analyzing an oral tribal verse in terms of authorial intention.', options: [
                { text: 'A written lyric poem has a fixed text and a single identifiable author whose intention', outcome: 'A written lyric poem has a fixed text and a single identifiable author whose intention can.' },
                { text: 'primitive', outcome: 'Not quite — Students often assume that because tribal verse uses simple vocabulary and repetition, it.', reveals: 'because-tribal-verse-uses-simple' },
                { text: 'unsophisticated', outcome: 'Not quite — Students often assume that because tribal verse uses simple vocabulary and repetition, it.', reveals: 'because-tribal-verse-uses-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'My Three Passions\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure for writing an analytical paragraph, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., confusing Evidence with.' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students often think "writing skills based on the chapter" means reproducing summaries or memorized.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing your university personal statement, you open Russell\'s \'My Three Passions\' for a model. A friend skims it and says: \'Useless — he doesn\'t even tell his life story, just three abstract feelings. And ending with “I\'d live it again” is plain optimism.\'',
            decisions: [{ prompt: 'Why does Russell\'s structure actually work as a model?', options: [
                { text: 'Show the genre: it\'s an intellectual autobiography — a map of inner geography, not a chronological travelogue. Three passions (love, knowledge, pity) are \'great winds\' blowing him across an \'ocean of anguish\'; each gets a paragraph, and the circular ending mirrors the opening. And context hardens the close: a pacifist jailed in WWI who faced the abyss earned \'I would gladly live it again\' as a verdict, not a platitude.', outcome: 'Your friend sees the craft: select governing passions, unify them with metaphor, close the circle — exactly what a personal statement should do.' },
                { text: 'Agree it\'s a weak model — a real autobiography should narrate events year by year.', outcome: 'In reflective essays structure serves argument, not chronology; the \'plot\' is thesis → each passion → synthesis.', reveals: 'autobiography-must-be-chronological' },
                { text: 'Take the ending at face value — Russell was simply a cheerful optimist about life.', outcome: 'Without the context — prison for pacifism, activism, a logician\'s view of suffering — the verdict reads as optimism; with it, it\'s a hard-won existential choice.', reveals: 'russell-ending-is-platitude' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_015', title: 'You made it',
          caseStudy: { intro: 'The songs come first so you meet the literature before you\'re allowed to theorise it — induction is the essay\'s politics.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_013', difficulty: 'standard',
          question: 'Critical thinking on \'My Three Passions\' — analysing the text to reach.',
          hint: 'Review the concept of "formulaic epithet" and "theme" in oral literature using the.',
          misconception: 'Students often assume that because tribal verse uses simple vocabulary and repetition, it is "primitive".',
          parts: [
                { id: 'a', prompt: 'Given a tribal verse that describes a river as "the vein of the earth" and repeats this metaphor in three stanzas with slight variations, apply the concept.', answer: 'Step 1: Identify the fixed formula ("vein of the earth")',
                  options: ['Step 1: Identify the fixed formula ("vein of the earth")', 'primitive', 'unsophisticated'],
                  hint: 'Review the concept of "formulaic epithet" and "theme" in oral literature using the example of the.',
                  misconception: 'Students often assume that because tribal verse uses simple vocabulary and repetition, it is "primitive" or "unsophisticated" compared.' }
          ],
            remediations: { 'because-tribal-verse-uses-simple': { steps: ['Have the student listen to a recorded performance of a tribal song (e.g., from the IGNCA archive) without reading the.', 'Provide a side-by-side comparison of two variants of the same oral verse to demonstrate fluidity.', 'Assign a micro-analysis: pick one formulaic phrase from the textbook verse and trace its three occurrences, noting.', 'Discuss how the verse\'s "simplicity" is a technology for memory and resistance.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_014', difficulty: 'standard',
          question: 'Writing skills from \'My Three Passions\' — using the text as a model.',
          hint: 'If stuck, review the distinction between \'content knowledge\' (what the essay says) and.',
          misconception: 'Students often think "writing skills based on the chapter" means reproducing summaries or memorized answers.',
          parts: [
                { id: 'a', prompt: 'What is the PEEL structure for writing an analytical paragraph, and what does each letter stand for?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'writing skills based on the chapter'],
                  hint: 'If stuck, review the distinction between \'content knowledge\' (what the essay says) and \'writing.',
                  misconception: 'Students often think "writing skills based on the chapter" means reproducing summaries or memorized answers.' },
                { id: 'b', prompt: 'Compare the function of \'oral tradition\' in tribal verse (from the essay) with the function of \'written tradition\' in mainstream literature.', answer: 'Similarities: Both transmit values across generations',
                  options: ['Similarities: Both transmit values across generations', 'writing skills based on the chapter', 'only lists features without comparing functions shows lack of analytical depth'],
                  hint: 'If stuck, review the distinction between \'content knowledge\' (what the essay says) and \'writing.',
                  misconception: 'Students often think "writing skills based on the chapter" means reproducing summaries or memorized answers.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a summary instead of analysis: 1) Highlight every sentence that merely retells content.', '2) Ask: "What is the argument this paragraph is making?" 3) Have them rewrite the paragraph starting with a clear.', '4) Practice with three different prompts until the PEEL structure becomes automatic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_015', difficulty: 'standard',
          question: 'Discussion points on \'My Three Passions\' — speaking and listening around the.',
          hint: 'If stuck, re-read the essay\'s sections on \'The Crisis of Language\' and \'Translation\'.',
          misconception: 'Students treat \'discussion points\' as a list of opinions to memorize rather than argumentative positions to defend.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'My Three Passions\'',
                  options: ['Discussion points on \'My Three Passions\'', '\'My Three Passions\' (Woven Words, ch', 'The plot/narrative arc of \'My Three Passions\'', 'The setting of \'My Three Passions\''],
                  hint: 'If stuck, re-read the essay\'s sections on \'The Crisis of Language\' and \'Translation\' while filling.',
                  misconception: 'Students treat \'discussion points\' as a list of opinions to memorize rather than argumentative positions to defend.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student highlight every claim Devy makes in the essay (e.g., \'Tribal languages are not dialects\', \'Print kills.', 'Convert each highlight into a debate motion: \'This House agrees that...\'.', 'Practice the \'Claim-Evidence-Reasoning\' frame orally: "Devy claims X [claim].', 'In paragraph 3 he writes Y [evidence].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
