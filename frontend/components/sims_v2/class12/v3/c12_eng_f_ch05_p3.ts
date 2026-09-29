import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch05_p3: SimDef = {
    id: 'v3_c12_eng_f_ch05_p3',
    title: 'Indigo · Part 3/3',
    subtitle: 'The court case Gandhi lost on purpose — and won a movement',
    classLevel: 12, subject: 'eng_f', topic: 'Indigo · Part 3/3',
    chapters: ['c12_eng_f_ch05'],
    nodeIds: ['c12_eng_f_cbse_05_013', 'c12_eng_f_cbse_05_014', 'c12_eng_f_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical biographer', intro: 'A sharecropper walked to Lucknow to fetch a lawyer. What came back was a method that would free a nation.', goal: 'Understand the Champaran satyagraha\'s economic roots and Gandhi\'s discovery that fearlessness precedes law.' },
    discovery: {
        question: 'Gandhi arrives in Champaran, disobeys a court order, pleads guilty — and the case collapses. Students call him \'a brilliant courtroom strategist.\' What did he actually discover?',
        options: ['Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom', 'Exactly — he won on a legal technicality', 'The judge was bribed', 'The peasants hired better lawyers'],
        answer: 'Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom',
        hook: 'Champaran began as humanitarian relief — peasants forced to grow indigo on 3/20 of their land, then charged compensation when synthetic dye made it worthless — and became political only under repression. It was a satyagraha template, not a lawsuit.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Indigo\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the first satyagraha: decode the tinkathia trap and the synthetic-indigo squeeze, weigh the professor who dared shelter Gandhi, then watch fearlessness — not litigation — bend an empire.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Indigo\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary difference between literal comprehension and critical analysis when studying a historical narrative like "Indigo"?', options: [
                { text: 'Literal comprehension retrieves facts (who, what, where, when)', outcome: 'Literal comprehension retrieves facts (who, what, where, when); critical analysis interrogates.' },
                { text: 'finding hidden meanings', outcome: 'Not quite — Students believe critical analysis means "finding hidden meanings" or "giving your opinion.".', reveals: 'critical-analysis-means-finding-hidden' },
                { text: 'giving your opinion', outcome: 'Not quite — Students believe critical analysis means "finding hidden meanings" or "giving your opinion.".', reveals: 'critical-analysis-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Indigo\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the correct format for a CBSE Class 12 article writing task based on a literature chapter, and what are the three mandatory.', options: [
                { text: 'Correct format: Headline (centered, catchy), Byline (name/designation), Body', outcome: 'Correct format: Headline (centered, catchy), Byline (name/designation), Body (Introduction with.' },
                { text: 'just write paragraphs about the story', outcome: 'Not quite — Students believe "writing based on the chapter" means retelling the story in their own words.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe "writing based on the chapter" means retelling the story in their own words.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Indigo\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the TWO discussion prompts given under "Talking about the text" in the NCERT chapter "Indigo"?', options: [
                { text: 'The two prompts are: (1) "Freedom from fear is more important than legal justice for the', outcome: 'The two prompts are: (1) "Freedom from fear is more important than legal justice for the poor.' },
                { text: 'and (2)', outcome: 'Not quite — Students believe "Speaking and Listening" means *informal chatting* about the story — sharing.', reveals: 'speaking-and-listening-means-informal' },
                { text: 'A wrong answer (e.g., listing comprehension questions like', outcome: 'Not quite — Students believe "Speaking and Listening" means *informal chatting* about the story — sharing.', reveals: 'speaking-and-listening-means-informal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning in a village, you\'re asked by sharecroppers to draft and file their entire grievance for them — \'you\'re educated, you handle it\'.',
            decisions: [{ prompt: 'What would the Champaran lesson say?', options: [
                { text: 'Coach them to organise and represent themselves — Gandhi\'s real win at Champaran was curing the peasants\' fear and dependency, not merely the refund he negotiated.', outcome: 'Doing it for them leaves the helplessness intact; self-reliance was the point of the satyagraha, not the settlement.' },
                { text: 'File it yourself — they need results, and you write better petitions.', outcome: 'That wins a case but not freedom; they remain dependent on the next educated outsider.', reveals: 'dependency-not-empowerment' },
                { text: 'Tell them to wait until a strong leader comes along.', outcome: 'Champaran began because ordinary people acted — waiting for saviours is the very fear the episode broke.', reveals: 'waiting-for-savior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue why Champaran mattered more than a courtroom win — it manufactured courage. Fischer\'s biography reads like a field manual for moral resistance.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking on \'Indigo\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, return to c12_eng_f_cbse_05_012 and redo the "inferential questions" exercise.',
          misconception: 'Students believe critical analysis means "finding hidden meanings" or "giving your opinion." In reality, literary.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between literal comprehension and critical analysis when studying a historical narrative like "Indigo"?', answer: 'Literal comprehension retrieves facts (who, what, where, when)',
                  options: ['Literal comprehension retrieves facts (who, what, where, when)', 'finding hidden meanings', 'giving your opinion', 'interpretation'],
                  hint: 'If stuck, return to c12_eng_f_cbse_05_012 and redo the "inferential questions" exercise — practice.',
                  misconception: 'Students believe critical analysis means "finding hidden meanings" or "giving your opinion." In reality, literary analysis.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['If a student conflates summary with analysis: (1) Give them a 3-sentence summary of the Motihari court scene.', '(2) Ask: "Which sentence could be proven by a photograph?', 'Which requires reading Gandhi\'s mind?" (3) Have them rewrite the opinion sentence using only observable textual.', '(4) Practice with the 25% settlement: list 3 facts, then 3 analytical claims each tied to a specific quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe critical analysis means "finding hidden meanings" or "giving your opinion." In reality, literary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Gandhi\'s acceptance of a 25% refund (instead of 50% or 100%) was a tactical compromise that weakened the peasants\' material victory but.', answer: 'The claim is largely defensible',
                  options: ['The claim is largely defensible', 'learned courage', 'saw that he had rights and defenders', 'they lost 75%!'],
                  hint: 'If stuck, return to c12_eng_f_cbse_05_012 and redo the "inferential questions" exercise — practice.',
                  misconception: 'Students believe critical analysis means "finding hidden meanings" or "giving your opinion." In reality, literary analysis.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['If a student conflates summary with analysis: (1) Give them a 3-sentence summary of the Motihari court scene.', '(2) Ask: "Which sentence could be proven by a photograph?', 'Which requires reading Gandhi\'s mind?" (3) Have them rewrite the opinion sentence using only observable textual.', '(4) Practice with the 25% settlement: list 3 facts, then 3 analytical claims each tied to a specific quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_014', difficulty: 'standard',
          question: 'Writing skills from \'Indigo\' — using the text as a model or springboard for.',
          hint: 'If stuck, return to c12_eng_f_cbse_05_013 (Critical Thinking) and re-do the "Talking.',
          misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.',
          parts: [
                { id: 'a', prompt: 'What is the correct format for a CBSE Class 12 article writing task based on a literature chapter, and what are the three mandatory structural components?', answer: 'Correct format: Headline (centered, catchy), Byline (name/designation), Body',
                  options: ['Correct format: Headline (centered, catchy), Byline (name/designation), Body', 'just write paragraphs about the story', 'writing based on the chapter', 'comprehension'],
                  hint: 'If stuck, return to c12_eng_f_cbse_05_013 (Critical Thinking) and re-do the "Talking about the.',
                  misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.' },
                { id: 'b', prompt: 'A student writes: "Gandhi was a great leader because he helped the poor farmers in Champaran." Why is this insufficient for a Class 12 board answer, and how.', answer: 'The statement is a vague claim without evidence or analysis',
                  options: ['The statement is a vague claim without evidence or analysis', 'Gandhi\'s leadership emerged from empowering others, not directing them', 'Explanation —', 'Link —'],
                  hint: 'If stuck, return to c12_eng_f_cbse_05_013 (Critical Thinking) and re-do the "Talking about the.',
                  misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.' },
                { id: 'c', prompt: 'Write the opening paragraph (40-50 words) of a speech on "Self-reliance: The Real Freedom" based on Gandhi\'s refusal to let C.F. Andrews stay in Champaran.', answer: '"Respected Principal, teachers, and dear friends',
                  options: ['"Respected Principal, teachers, and dear friends', 'writing based on the chapter', 'comprehension', 'composition'],
                  hint: 'If stuck, return to c12_eng_f_cbse_05_013 (Critical Thinking) and re-do the "Talking about the.',
                  misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student cannot move beyond plot summary: (1) Give them a specific prompt: "Write a speech on \'Leadership is about.', '(3) For each, write one PEEL paragraph on a separate sheet.', '(4) Assemble into speech format with address and conclusion.', '(5) Re-diagnose: ask them to highlight where each paragraph uses "Point," "Evidence," "Explanation," "Link" — if any.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_015', difficulty: 'standard',
          question: 'Discussion points on \'Indigo\' — speaking and listening around the text.',
          hint: 'If stuck on textual evidence retrieval: Revisit **c12_eng_f_cbse_05_012** (Comprehension).',
          misconception: 'Students believe "Speaking and Listening" means *informal chatting* about the story — sharing whether they "liked".',
          parts: [
                { id: 'a', prompt: 'You are leading a group discussion on Prompt 1: "Freedom from fear vs legal justice." A peer argues: "Legal justice *creates* freedom from fear, so they\'re not.', answer: '**Rebuttal structure:** (1) Concede: "Yes, the 25% refund settlement *legally*',
                  options: ['**Rebuttal structure:** (1) Concede: "Yes, the 25% refund settlement *legally*', '(3) Evidence', '(4) Synthesis', 'Speaking and Listening'],
                  hint: 'If stuck on textual evidence retrieval: Revisit **c12_eng_f_cbse_05_012** (Comprehension) for.',
                  misconception: 'Students believe "Speaking and Listening" means *informal chatting* about the story — sharing whether they "liked" Gandhi or found the.' }
          ],
            remediations: { 'speaking-and-listening-means-informal': { steps: ['If a student cannot move beyond opinion to evidence-based argument: (1) Assign a "Text-to-Talk" scaffold: Give them.', '(2) Have them practice *only* the "Evidence → Explanation" link for 3 prompts using the sentence stem: "The text states.', 'If still stuck, revisit **c12_eng_f_cbse_05_006** (Primary Theme) and **c12_eng_f_cbse_05_013** (Critical Thinking).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
