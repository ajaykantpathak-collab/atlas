import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch14_p3: SimDef = {
    id: 'v3_c12_eng_k_ch14_p3',
    title: 'Chasing the Rainbow (Non-fiction) · Part 3/3',
    subtitle: 'Two essays, one word \'freedom,\' opposite wars',
    classLevel: 12, subject: 'eng_k', topic: 'Chasing the Rainbow (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch14'],
    nodeIds: ['c12_eng_k_cbse_14_013', 'c12_eng_k_cbse_14_014', 'c12_eng_k_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Essayist-critic', intro: 'A socialist playwright and a man who refused to be anyone\'s guru both wrote about freedom — and meant entirely different things.', goal: 'Contrast Shaw\'s socio-economic freedom with Krishnamurti\'s psychological freedom, and the historical moments that shaped each.' },
    discovery: {
        question: 'Shaw says discipline can enslave; Krishnamurti says discipline is a prison. A student concludes \'they agree — both hate discipline.\' What\'s flattened?',
        options: ['Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all', 'Nothing — same word, same idea', 'Shaw actually loves discipline', 'Krishnamurti wants stricter schools'],
        answer: 'Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all',
        hook: 'Same word, different war: a Fabian socialist in Depression-era Britain fights \'wage slavery\' with structural reform; a teacher who rejected guruhood fights \'conditioning\' in the mind. Freedom for Shaw is fair distribution; for Krishnamurti it\'s self-awakened intelligence. History wrote their definitions.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Freedom\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_14_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run two definitions of freedom side by side: trace Shaw\'s natural vs unnatural slavery and his jab at voting between \'two rich friends,\' then test Krishnamurti\'s claim that discipline and freedom can\'t share a mind.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Freedom\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary difference between a summary and a critical analysis of a non-fiction text?', options: [
                { text: 'A summary restates the text\'s main points in condensed form without evaluation, while a', outcome: 'A summary restates the text\'s main points in condensed form without evaluation, while a critical.' },
                { text: 'finding faults', outcome: 'Not quite — Students often believe "critical thinking" means criticizing the author or disagreeing with the.', reveals: 'critical-thinking-means-criticizing-the' },
                { text: 'giving an opinion', outcome: 'Not quite — Students often believe "critical thinking" means criticizing the author or disagreeing with the.', reveals: 'critical-thinking-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Freedom\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure for writing analytical paragraphs, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point = the main argument or topic sentence.' },
                { text: 'Point, Example, Elaboration, Conclusion', outcome: 'Not quite — Students believe "using quotes" means dropping a quotation into a paragraph without introduction.', reveals: 'using-quotes-means-dropping-a' },
                { text: 'Explanation', outcome: 'Not quite — Students believe "using quotes" means dropping a quotation into a paragraph without introduction.', reveals: 'using-quotes-means-dropping-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Freedom\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Recall the two "Stop and Think" questions from Shaw\'s text on pages 123 and 127 of the NCERT. State them verbatim.', options: [
                { text: 'Correct answers: (1) "What are the links between natural jobs, labour and slavery?" and', outcome: 'Correct answers: (1) "What are the links between natural jobs, labour and slavery?" and "What ought.' },
                { text: 'What are the links between natural jobs, labour and slavery?', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than.', reveals: 'students-treat-discussion-points-as' },
                { text: 'What causes the master class to be more deluded than the enslaved classes?', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A firm advertises \'total freedom at work\' while wages force everyone into overtime obedience; meanwhile a visiting guru sells \'inner liberation\' workshops to the same exhausted staff.',
            decisions: [{ prompt: 'Shaw and Krishnamurti would diagnose this how?', options: [
                { text: 'Two different cages — Shaw\'s \'wage slavery\' names the economic chain, Krishnamurti\'s \'conditioning\' names the psychological one; fix the pay structure AND the mind, neither talk alone liberates.', outcome: 'Outer constraint and inner conditioning are separate problems; a mindfulness seminar can\'t shorten a workday.' },
                { text: 'The guru is right — freedom is an inner state, so circumstances don\'t matter.', outcome: 'That\'s Krishnamurti without Shaw; the wage chain binds regardless of how free the mind feels.', reveals: 'inner-freedom-fixes-outer-chains' },
                { text: 'Only the law matters — pass rules and freedom follows automatically.', outcome: 'Shaw himself mocks that faith; conditioning survives rulebooks, which is why both diagnoses are needed.', reveals: 'rules-create-freedom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue freedom on two axes — the economic and the psychological — and spot when identical words hide opposite arguments.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_013', difficulty: 'standard',
          question: 'Critical thinking on \'Freedom\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, revisit the "Stop and Think" questions embedded in the chapter — they are.',
          misconception: 'Students often believe "critical thinking" means criticizing the author or disagreeing with the text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Freedom\'',
                  options: ['Critical thinking on \'Freedom\'', '\'Freedom\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Freedom\'', 'The setting of \'Freedom\''],
                  hint: 'If stuck, revisit the "Stop and Think" questions embedded in the chapter — they are designed.',
                  misconception: 'Students often believe "critical thinking" means criticizing the author or disagreeing with the text.' }
          ],
            remediations: { 'critical-thinking-means-criticizing-the': { steps: ['If a student conflates criticism with analysis: (1) Have them re-read the "Appreciation" question 1 in the textbook.', 'Neither is \'right\' — they\'re different rhetorical strategies for different purposes." (3) Assign a focused exercise.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_4 to check if they can now compare strategies without value judgments.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_014', difficulty: 'standard',
          question: 'Writing skills from \'Freedom\' — using the text as a model or springboard for.',
          hint: 'Review Class 11 Writing Skills nodes (c11_eng_w_cbse_01_014) for PEEL refresher and quote.',
          misconception: 'Students believe "using quotes" means dropping a quotation into a paragraph without introduction or analysis (the.',
          parts: [
                { id: 'a', prompt: 'What is the PEEL structure for writing analytical paragraphs, and what does each letter stand for?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Elaboration, Conclusion', 'Explanation', 'using quotes'],
                  hint: 'Review Class 11 Writing Skills nodes (c11_eng_w_cbse_01_014) for PEEL refresher and quote.',
                  misconception: 'Students believe "using quotes" means dropping a quotation into a paragraph without introduction or analysis (the "quote sandwich" error).' },
                { id: 'b', prompt: 'Read this student response: "Shaw thinks freedom is about having leisure time. He says we are slaves to nature.', answer: 'Weakness 1: No direct textual evidence',
                  options: ['Weakness 1: No direct textual evidence', 'using quotes', 'quote sandwich'],
                  hint: 'Review Class 11 Writing Skills nodes (c11_eng_w_cbse_01_014) for PEEL refresher and quote.',
                  misconception: 'Students believe "using quotes" means dropping a quotation into a paragraph without introduction or analysis (the "quote sandwich" error).' },
                { id: 'c', prompt: 'Analyze this prompt: "Both texts discuss freedom. Comment on the difference in the style of treatment of the topic in them." What are the *three* distinct.', answer: 'A high-scoring answer must address: (1) **Tone and persona**',
                  options: ['A high-scoring answer must address: (1) **Tone and persona**', 'using quotes', 'quote sandwich'],
                  hint: 'Review Class 11 Writing Skills nodes (c11_eng_w_cbse_01_014) for PEEL refresher and quote.',
                  misconception: 'Students believe "using quotes" means dropping a quotation into a paragraph without introduction or analysis (the "quote sandwich" error).' }
          ],
            remediations: { 'using-quotes-means-dropping-a': { steps: ['Have the student rewrite three "floating quote" sentences using the **Quote Sandwich** method: [Context sentence].', 'Practice with Krishnamurti\'s rhetorical questions — convert "He asks \'Are you free?\'" to "Krishnamurti demands.', 'Assign a timed 150-word response using at least two integrated quotes from each author; grade *only* on quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_015', difficulty: 'standard',
          question: 'Discussion points on \'Freedom\' — speaking and listening around the text.',
          hint: 'If a student cannot generate a discussion point, have them pick one "Talking about the.',
          misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the fundamental disagreement between Shaw and Krishnamurti on what "freedom" actually means.', answer: 'Shaw defines freedom negatively as "leisure"',
                  options: ['Shaw defines freedom negatively as "leisure"', 'both want freedom', 'freedom to inquire', 'freedom to do whatever I want'],
                  hint: 'If a student cannot generate a discussion point, have them pick one "Talking about the Text".',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based argumentation* anchored.' },
                { id: 'b', prompt: 'A peer claims: "Krishnamurti would agree with Shaw that the vote is a sham because both think ordinary people are deluded." Using specific textual evidence.', answer: 'The claim is partially true but misleading',
                  options: ['The claim is partially true but misleading', 'freedom to inquire', 'freedom to do whatever I want'],
                  hint: 'If a student cannot generate a discussion point, have them pick one "Talking about the Text".',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based argumentation* anchored.' },
                { id: 'c', prompt: 'Compare how each author uses rhetorical questions. Identify one rhetorical question from Shaw and one from Krishnamurti, then analyze how their *purposes*.', answer: 'Shaw: "What good is the vote?"',
                  options: ['Shaw: "What good is the vote?"', 'both use questions to persuade', 'freedom to inquire', 'freedom to do whatever I want'],
                  hint: 'If a student cannot generate a discussion point, have them pick one "Talking about the Text".',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based argumentation* anchored.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student re-read the "Talking about the Text" questions on NCERT page 131 — these are the *author-designed*.', 'For each question, require the student to write a 2-sentence answer *using only words from the text* (no "I think").', 'Pair the student with a peer who can model textual citation; have them do a 2-minute "quote tennis" — each volley must.', 'Re-assess using Diagnostic Question 3 — if they still conflate the authors\' diagnoses, assign a Venn-diagram exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based.',
          parts: [
                { id: 'a', prompt: 'Defend or refute: "For a Class 12 student preparing for CUET, Krishnamurti\'s concept of freedom is more immediately actionable than Shaw\'s." Provide two.', answer: 'Defensible position: Krishnamurti is more actionable *now*',
                  options: ['Defensible position: Krishnamurti is more actionable *now*', 'freedom to inquire', 'freedom to do whatever I want'],
                  hint: 'If a student cannot generate a discussion point, have them pick one "Talking about the Text".',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel freedom means...") rather than *evidence-based argumentation* anchored.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student re-read the "Talking about the Text" questions on NCERT page 131 — these are the *author-designed*.', 'For each question, require the student to write a 2-sentence answer *using only words from the text* (no "I think").', 'Pair the student with a peer who can model textual citation; have them do a 2-minute "quote tennis" — each volley must.', 'Re-assess using Diagnostic Question 3 — if they still conflate the authors\' diagnoses, assign a Venn-diagram exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
