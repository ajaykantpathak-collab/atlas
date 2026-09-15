import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch05_p3: SimDef = {
    id: 'v3_c11_eng_w_ch05_p3',
    title: 'Pigeons at Daybreak (Short Story) · Part 3/3',
    subtitle: 'Read the pigeons as the story\'s structural heartbeat, not its wallpaper.',
    classLevel: 11, subject: 'eng_w', topic: 'Pigeons at Daybreak (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch05'],
    nodeIds: ['c11_eng_w_cbse_05_013', 'c11_eng_w_cbse_05_014', 'c11_eng_w_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracking a motif through one morning routine', intro: 'An old man, a rooftop of pigeons, a son\'s visit that cracks the routine — watch the birds mirror what he can\'t say.', goal: 'Distinguish plot summary from structural analysis and read a recurring motif.' },
    discovery: {
        question: 'Are the pigeons in \'Pigeons at Daybreak\' just set dressing while the real story is a father and son?',
        options: ['No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end', 'Yes — the title is decorative and the plot is the son\'s visit', 'No — the pigeons are the literal antagonists of the story', 'Yes — the birds only establish that the man is old'],
        answer: 'No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end',
        hook: 'A motif that returns at exposition, climax and resolution isn\'t decoration — it\'s the story\'s pulse.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text beyond its surface narrative to uncover implicit meanings, evaluate authorial choices, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace the pigeon motif through the arc\'s nodes and show how the resumed morning ritual has quietly changed by the end.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "The moth in the story is not just an insect; it is a metaphor for Pappachi\'s fractured ego." How would you begin?',
            decisions: [{ prompt: 'Define "dramatic irony" as it operates in "Pappachi\'s Moth" and give one precise example from the text where the reader knows more than.', options: [
                { text: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks,', outcome: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks, creating.' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means finding *one* hidden meaning the author "intended".', reveals: 'critical-analysis-means-finding-one' },
                { text: 'intended', outcome: 'Not quite — Students believe "critical analysis" means finding *one* hidden meaning the author "intended".', reveals: 'critical-analysis-means-finding-one' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are staring at a 6-mark question: "How does the author succeed in raising crucial social issues not through open criticism but through subtle.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing a good answer" means retelling the story in order — "First Pappachi.', reveals: 'writing-a-good-answer-means' },
                { text: 'writing a good answer', outcome: 'Not quite — Students believe "writing a good answer" means retelling the story in order — "First Pappachi.', reveals: 'writing-a-good-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where everyone has read "Pappachi\'s Moth" but disagrees on whether Chacko\'s physical intervention was justified or.',
            decisions: [{ prompt: 'What are the three specific discussion prompts listed under "TALKING ABOUT THE TEXT" in the NCERT textbook for "Pappachi\'s Moth"?', options: [
                { text: 'The three prompts are: (1) Chacko\'s firmness in dealing with the irrational behaviour of', outcome: 'The three prompts are: (1) Chacko\'s firmness in dealing with the irrational behaviour of his.' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means sharing personal opinions ("I feel bad for Mammachi") rather.', reveals: 'discussion-means-sharing-personal-opinions' },
                { text: 'I feel bad for Mammachi', outcome: 'Not quite — Students believe "discussion" means sharing personal opinions ("I feel bad for Mammachi") rather.', reveals: 'discussion-means-sharing-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a family-fiction unit your class reads \'Pappachi\'s Moth\' — an Imperial Entomologist whose new moth is named after someone else, and whose wife\'s pickle business out-earns him. A student says: \'It\'s a sad story about a bitter old man; the science and Kerala details are background flavour.\'',
            decisions: [{ prompt: 'Why do the entomology and setting details matter?', options: [
                { text: 'Because Pappachi\'s wound is professional, not vague: an Imperial Entomologist\'s life\'s honour is a named species, and the \'taxonomic reshuffle\' that denies him the moth is a public, official erasure — inside a rigid post-colonial Kerala hierarchy where rank defines a man. His violence spikes precisely when Mammachi\'s success and his obscurity collide; the moth is the symbol of stolen credit, not set-dressing.', outcome: 'Context — scientific prestige culture plus Kerala\'s hierarchies — turns domestic bitterness into a study of wounded patriarchal pride.' },
                { text: 'The student is right — it\'s a domestic drama; the moth could be any hobby disappointment.', outcome: 'An unnamed-moth discovery is a career-defining honour in taxonomy; swapping it for \'a hobby\' shrinks a public humiliation into a private sulking.', reveals: 'moth-is-just-a-hobby' },
                { text: 'Read it as a feminist triumph only — Mammachi\'s business succeeding is the whole story.', outcome: 'Her success matters, but as a trigger inside a status system: the chapter studies how a man\'s rage feeds on her competence — flattening it to triumph misses the violence.', reveals: 'story-is-only-triumph' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'He feeds the pigeons again at daybreak — same gesture, different man; the motif records what the plot can\'t say.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'Review c11_eng_w_cbse_05_009 (Irony and Symbolism) — re-do the "match device to effect".',
          misconception: 'Students believe "critical analysis" means finding *one* hidden meaning the author "intended" (e.g., "the moth.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "symbolic resonance" to the skyblue Plymouth.', answer: 'Scene 1: Pappachi buys the Plymouth from an Englishman in Munnar',
                  options: ['Scene 1: Pappachi buys the Plymouth from an Englishman in Munnar', 'critical analysis', 'intended', 'the moth = death'],
                  hint: 'Review c11_eng_w_cbse_05_009 (Irony and Symbolism) — re-do the "match device to effect" exercise.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden meaning the author "intended" (e.g., "the moth = death").' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces symbols to single meanings: (1) Give them a 3-column table: Column A = textual detail.', '(2) Model with the moth: Detail = "named after Acting Director he disliked" → Context = professional betrayal →.', '(3) Require them to find 2 details for *each* of 3 symbols (moth, Plymouth, violin) that support *different* readings.', '(4) Have them write one paragraph synthesizing the tension: "While the moth initially represents X, its posthumous.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means finding *one* hidden meaning the author "intended" (e.g., "the moth.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Ammu\'s statement — \'human beings were creatures of habit, and it was amazing the kind of things they could get used to\' — is the moral.', answer: 'The claim is defensible but incomplete',
                  options: ['The claim is defensible but incomplete', 'critical analysis', 'intended', 'the moth = death'],
                  hint: 'Review c11_eng_w_cbse_05_009 (Irony and Symbolism) — re-do the "match device to effect" exercise.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden meaning the author "intended" (e.g., "the moth = death").' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces symbols to single meanings: (1) Give them a 3-column table: Column A = textual detail.', '(2) Model with the moth: Detail = "named after Acting Director he disliked" → Context = professional betrayal →.', '(3) Require them to find 2 details for *each* of 3 symbols (moth, Plymouth, violin) that support *different* readings.', '(4) Have them write one paragraph synthesizing the tension: "While the moth initially represents X, its posthumous.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, review c8_engl_ch1_17 (PEEL method for poems) and c11_eng_w_cbse_05_009.',
          misconception: 'Students believe "writing a good answer" means retelling the story in order — "First Pappachi retired, then Mammachi.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'writing a good answer', 'First Pappachi retired, then Mammachi made pickles, then he beat her'],
                  hint: 'If stuck, review c8_engl_ch1_17 (PEEL method for poems) and c11_eng_w_cbse_05_009 (irony/symbolism.',
                  misconception: 'Students believe "writing a good answer" means retelling the story in order — "First Pappachi retired, then Mammachi made pickles, then.' },
                { id: 'b', prompt: 'Compare these two openings for the question "Discuss the contrast between outward elegance and private behaviour in Pappachi." Which is stronger and why?', answer: 'Opening B is stronger',
                  options: ['Opening B is stronger', 'writing a good answer', 'First Pappachi retired, then Mammachi made pickles, then he beat her'],
                  hint: 'If stuck, review c8_engl_ch1_17 (PEEL method for poems) and c11_eng_w_cbse_05_009 (irony/symbolism.',
                  misconception: 'Students believe "writing a good answer" means retelling the story in order — "First Pappachi retired, then Mammachi made pickles, then.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['Show the student a side-by-side comparison: a 2-mark narrative answer vs a 6-mark analytical answer on the *same.', 'Highlight every sentence in the strong answer as P, E, E, or L.', 'Give them a "PEEL template" with sentence starters: "The author suggests that...', '[Point] This is seen when...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review c11_eng_w_cbse_05_012 (literal/inferential comprehension) to rebuild.',
          misconception: 'Students believe "discussion" means sharing personal opinions ("I feel bad for Mammachi") rather than textual analysis.',
          parts: [
                { id: 'a', prompt: 'During a discussion on "outward elegance vs. private behaviour," a peer argues Pappachi\'s suits and Plymouth car prove he truly valued dignity.', answer: 'Valid counter-argument: "The suits and Plymouth do project elegance',
                  options: ['Valid counter-argument: "The suits and Plymouth do project elegance', 'discussion', 'I feel bad for Mammachi'],
                  hint: 'If stuck, review c11_eng_w_cbse_05_012 (literal/inferential comprehension) to rebuild.',
                  misconception: 'Students believe "discussion" means sharing personal opinions ("I feel bad for Mammachi") rather than textual analysis ("The text shows.' },
                { id: 'b', prompt: 'Analyse how the discussion prompt "Approval from the outside world and approval within the family" connects to the obituary clipping Mammachi pastes in the.', answer: 'The obituary lists public honours',
                  options: ['The obituary lists public honours', 'discussion', 'I feel bad for Mammachi'],
                  hint: 'If stuck, review c11_eng_w_cbse_05_012 (literal/inferential comprehension) to rebuild.',
                  misconception: 'Students believe "discussion" means sharing personal opinions ("I feel bad for Mammachi") rather than textual analysis ("The text shows.' }
          ],
            remediations: { 'discussion-means-sharing-personal-opinions': { steps: ['If a student offers only opinion: 1) Pause and ask "Which line in the story makes you say that?" 2) Wait for them.', '3) If they cannot, model it: "When I argue Mammachi is resilient, I point to paragraph 2 where she \'decided to persist.', 'Repeat until they self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
