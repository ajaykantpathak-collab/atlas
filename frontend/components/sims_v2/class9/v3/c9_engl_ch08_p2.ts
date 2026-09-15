import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch08_p2: SimDef = {
    id: 'v3_c9_engl_ch08_p2',
    title: 'Follow That Dream · Part 2/2',
    subtitle: 'A letter where the anecdote IS the argument',
    classLevel: 9, subject: 'engl', topic: 'Follow That Dream · Part 2/2',
    chapters: ['c9_engl_ch08'],
    nodeIds: ['c9_engl_ch8_6', 'c9_engl_ch8_7', 'c9_engl_ch8_8', 'c9_engl_ch8_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a letter analyst', intro: 'A mother who gave up dancing writes to a daughter standing at her own crossroads. Your task: extract the advice, the proof and the promise — without turning her metaphor into a tragedy.', goal: 'Summarise an epistolary text by extracting the writer\'s purpose, central advice, supporting anecdote and tone — in objective reported speech, not personal reaction.' },
    discovery: {
        question: 'A mother writes: \'I didn\'t become the dancer I dreamed of, but I choreograph my life every day.\' A student summarises: \'The mother regrets not becoming a dancer.\' What did they misread?',
        options: ['Everything — she isn\'t mourning the lost dream; she\'s showing how dreams transform into new purpose', 'Nothing — regret is exactly what she means', 'The word \'choreograph\' is just a spelling error', 'She actually became a famous dancer'],
        answer: 'Everything — she isn\'t mourning the lost dream; she\'s showing how dreams transform into new purpose',
        hook: 'A letter isn\'t a story with a plot — it\'s an argument: claim → personal evidence → warning → reassurance. Summarise it as \'first she said X, then Y\' and you miss that the dance anecdote exists to PROVE the advice, not to fill a timeline.',
    },
    teaching: [
        { title: 'Character Study: The Mother\'s Wisdom and Guidance', text: 'A character study of the mother in "Follow That Dream" examines how the writer uses the epistolary voice to reveal a persona who combines nurturing empathy with hard-won realism, guiding her daughter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch8_6', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Distil a mother\'s letter to her daughter into 80-100 words: who writes to whom, the core advice (pursue the dream, skip the shortcuts), the dance-dream anecdote as evidence, and the supportive-but-realistic closing — all in reported speech.',
        labels: ['Character Study: The Mother\'s', 'Literary Device: Metaphor', 'Vocabulary in Context: Words', 'Values: Perseverance, Support Networks'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch8_6', title: 'Character Study: The Mother\'s Wisdom and Guidance',
          caseStudy: { intro: 'Imagine you receive a long WhatsApp voice note from your mother late at night — she\'s not scolding you, but sharing stories of her own youth, the dreams she.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "Follow That Dream," and how does it shape our understanding of the mother\'s character?', options: [
                { text: 'The letter uses first-person epistolary perspective ("I write to you," "my experience")', outcome: 'The letter uses first-person epistolary perspective ("I write to you," "my experience"), which.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students equate "mother\'s wisdom" with *traditional moralizing* — expecting sermons on duty.', reveals: 'students-equate-mother-s-wisdom' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_8', title: 'Vocabulary in Context: Words of Aspiration and Determination',
          caseStudy: { intro: 'Imagine you are reading a motivational speech by an Indian athlete like Neeraj Chopra or PV Sindhu.',
            decisions: [{ prompt: 'Define "connotation" and give one example from the mother\'s letter where a word\'s connotation is stronger than its denotation.', options: [
                { text: 'Connotation is the emotional or cultural association a word carries beyond its literal', outcome: 'Connotation is the emotional or cultural association a word carries beyond its literal meaning.' },
                { text: 'connotation is just a synonym', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary meaning* from.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary meaning* from.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_9', title: 'Values: Perseverance, Support Networks and Realistic Goal-Setting',
          caseStudy: { intro: 'Imagine you want to become a doctor but your family cannot afford coaching classes. You feel stuck.',
            decisions: [{ prompt: 'Define \'perseverance\' in the context of pursuing a long-term dream, using one phrase from the mother\'s letter that illustrates it.', options: [
                { text: 'Perseverance is continuing to work toward a goal despite obstacles', outcome: 'Perseverance is continuing to work toward a goal despite obstacles; the phrase "small, steady.' },
                { text: 'never giving up', outcome: 'Not quite — Students think realistic goal-setting means lowering ambitions.', reveals: 'realistic-goal-setting-means-lowering' },
                { text: 'the mother tells her daughter to dream less', outcome: 'Not quite — Students think realistic goal-setting means lowering ambitions.', reveals: 'realistic-goal-setting-means-lowering' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising a mother\'s letter to her daughter about chasing a dream, a student writes: \'First she says she loves her daughter. Then she talks about her own dance dream. Then she warns about shortcuts. It was heartfelt and I felt inspired.\'',
            decisions: [{ prompt: 'How should this reflective letter be summarised instead?', options: [
                { text: 'As an argument, not an event list: \'The mother urges her daughter to pursue her dream with conviction; her own abandoned dance ambition shows that unfulfilled dreams get rechoreographed into new purpose, she warns against shortcuts, and closes by affirming family support\' — claim, evidence, warning, reassurance, reported without \'I felt.\'', outcome: 'This maps the letter\'s logic — the anecdote supports the advice — and keeps the summary objective, which is what epistolary summarising demands.' },
                { text: 'The draft stands — a letter is a small story, so \'first… then… then\' plus a reaction is a fair summary.', outcome: 'A reflective letter is persuasive, not narrative; sequencing its paragraphs like scenes misses that each part serves the advice, and \'I felt inspired\' belongs to a personal response.', reveals: 'letter-is-story' },
                { text: 'Fix it by naming the emotion properly — call the tone \'heartfelt and touching\' since the letter is emotional.', outcome: 'Describing tone is fine, but only objectively — \'encouraging yet realistic\'; adjectives of your own feeling are your response, not her letter.', reveals: 'my-feelings-are-tone' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_9', title: 'You made it',
          caseStudy: { intro: 'Summarising a letter means distilling its argument, not its timeline. Report the advice and the evidence for it — and keep \'heartfelt\' and \'I felt inspired\' out; your feelings aren\'t the text.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch8_6', difficulty: 'standard',
          question: 'A character study of the mother in "Follow That Dream" examines how the writer.',
          hint: 'If stuck, return to c9_engl_ch8_1 and annotate: "Every time the mother says \'I,\'.',
          misconception: 'Students equate "mother\'s wisdom" with *traditional moralizing* — expecting sermons on duty, obedience, or "practical".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A character study of the mother in "Follow That Dream" examines how the writer uses the',
                  options: ['A character study of the mother in "Follow That Dream" examines how the writer uses the', 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s', 'Balancing Dreams with Practical Realities is the critical life skill of evaluating', 'Epistolary form is a literary technique where a narrative is presented through a series'],
                  hint: 'If stuck, return to c9_engl_ch8_1 and annotate: "Every time the mother says \'I,\' highlight it.',
                  misconception: 'Students equate "mother\'s wisdom" with *traditional moralizing* — expecting sermons on duty, obedience, or "practical" career choices.' }
          ],
            remediations: { 'students-equate-mother-s-wisdom': { steps: ['Have the student list *every* direct quote where the mother mentions her own past — categorize each as "failure,".', 'Ask: "Which quote shows she *regrets* her past?', 'Which shows she *uses* it?" — force distinction between emotion and utility.', 'Give a 2-column table: Column A = "Stereotypical Mother Advice" (e.g., "Get a government job"), Column B = "This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "mother\'s wisdom" with *traditional moralizing* — expecting sermons on duty, obedience, or "practical".',
          parts: [
                { id: 'a', prompt: 'A Class 9 student writes: "The mother is a perfect role model because she sacrificed everything for her family." Evaluate this claim using evidence from the.', answer: 'The claim is *reductive*',
                  options: ['The claim is *reductive*', 'mother'],
                  hint: 'If stuck, return to c9_engl_ch8_1 and annotate: "Every time the mother says \'I,\' highlight it.',
                  misconception: 'Students equate "mother\'s wisdom" with *traditional moralizing* — expecting sermons on duty, obedience, or "practical" career choices.' }
          ],
            remediations: { 'students-equate-mother-s-wisdom': { steps: ['Have the student list *every* direct quote where the mother mentions her own past — categorize each as "failure,".', 'Ask: "Which quote shows she *regrets* her past?', 'Which shows she *uses* it?" — force distinction between emotion and utility.', 'Give a 2-column table: Column A = "Stereotypical Mother Advice" (e.g., "Get a government job"), Column B = "This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_7', difficulty: 'standard',
          question: 'A metaphor is a figure of speech that directly equates two unlike things.',
          hint: 'Review c6_english_u1_005 (metaphor basics) and c7_engl_ch05_008 (epistolary first-person.',
          misconception: 'Students treat metaphor and anecdote as decorative "language features" rather than structural argument components.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A metaphor is a figure of speech that directly equates two unlike things by stating one',
                  options: ['A metaphor is a figure of speech that directly equates two unlike things by stating one', 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s', 'Balancing Dreams with Practical Realities is the critical life skill of evaluating', 'Epistolary form is a literary technique where a narrative is presented through a series'],
                  hint: 'Review c6_english_u1_005 (metaphor basics) and c7_engl_ch05_008 (epistolary first-person voice).',
                  misconception: 'Students treat metaphor and anecdote as decorative "language features" rather than structural argument components.' }
          ],
            remediations: { 'students-treat-metaphor-and-anecdote': { steps: ['Give student two highlighters: one for metaphors (mark tenor/vehicle), one for anecdotes (bracket the narrative).', 'For each highlight, complete: "This metaphor makes abstract idea X concrete by comparing it to Y because..." and "This.', 'Practice with a non-text example: a coach\'s halftime speech.', 'Require oral explanation before written analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_8', difficulty: 'standard',
          question: 'Vocabulary in Context: Words of Aspiration and Determination refers to the.',
          hint: 'If stuck, re-read the letter (c9_engl_ch8_1) and highlight every word related.',
          misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary meaning* from surrounding sentences.',
          parts: [
                { id: 'a', prompt: 'In the sentence "Your **endeavor** will require sacrifice," identify the part of speech of "endeavor" and explain how its morphological family (endeavor.', answer: '"Endeavor" is a noun here (verb: to endeavor)',
                  options: ['"Endeavor" is a noun here (verb: to endeavor)', 'it\'s a verb', 'vocabulary in context'],
                  hint: 'If stuck, re-read the letter (c9_engl_ch8_1) and highlight every word related to striving.',
                  misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary meaning* from surrounding sentences.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Give the student a two-column table: Column A = word from letter (e.g., steadfast), Column B = near-synonym (e.g.', 'Ask: "What does Column A suggest that Column B does not?', 'Find evidence in the letter\'s context (obstacles, time, emotion)." 3.', 'Model one: "Steadfast implies *loyalty to a promise over years*; firm only means *not easily changed*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_9', difficulty: 'standard',
          question: 'Perseverance is the sustained effort to achieve a goal despite difficulties.',
          hint: 'Re-read the letter focusing only on sentences with verbs like \'walk\', \'climb\', \'build\'.',
          misconception: 'Students think realistic goal-setting means lowering ambitions.',
          parts: [
                { id: 'a', prompt: 'Define \'perseverance\' in the context of pursuing a long-term dream, using one phrase from the mother\'s letter that illustrates it.', answer: 'Perseverance is continuing to work toward a goal despite obstacles',
                  options: ['Perseverance is continuing to work toward a goal despite obstacles', 'never giving up', 'the mother tells her daughter to dream less', 'each step builds the next'],
                  hint: 'Re-read the letter focusing only on sentences with verbs like \'walk\', \'climb\', \'build\', \'hold\'.',
                  misconception: 'Students think realistic goal-setting means lowering ambitions.' },
                { id: 'b', prompt: 'Compare how perseverance and support networks function differently in the letter.', answer: 'Perseverance is internal: "you must walk the path yourself"',
                  options: ['Perseverance is internal: "you must walk the path yourself"', 'help from others', 'the mother tells her daughter to dream less', 'each step builds the next'],
                  hint: 'Re-read the letter focusing only on sentences with verbs like \'walk\', \'climb\', \'build\', \'hold\'.',
                  misconception: 'Students think realistic goal-setting means lowering ambitions.' }
          ],
            remediations: { 'realistic-goal-setting-means-lowering': { steps: ['Re-read the paragraph where the mother says "today\'s mountain, tomorrow\'s peak."', 'Draw a ladder: bottom rung = join academy (realistic now), top rung = play for India (dream).', 'Explain that each rung is a realistic goal; the ladder is the big dream.', 'Have the student write one personal goal as a 3-rung ladder.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
