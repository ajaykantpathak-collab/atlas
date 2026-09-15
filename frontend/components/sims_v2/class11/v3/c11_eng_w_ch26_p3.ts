import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch26_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch26_p3: SimDef = {
    id: 'v3_c11_eng_w_ch26_p3',
    title: 'Bridges (Essay) · Part 3/3',
    subtitle: 'Read a dancer\'s memoir where every wound becomes raw material for art.',
    classLevel: 11, subject: 'eng_w', topic: 'Bridges (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch26'],
    nodeIds: ['c11_eng_w_cbse_26_013', 'c11_eng_w_cbse_26_014', 'c11_eng_w_cbse_26_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer mapping a dancer\'s detours', intro: 'Boarding school in 1944 Lahore, a mother\'s death, a college of twenty-nine boys and one girl — every detour later becomes choreography.', goal: 'Analyse the essay\'s episodic structure and its theme of art built from lived bridges.' },
    discovery: {
        question: 'People say Kumudini Lakhia was \'born to dance.\' She calls that a \'dubious assertion.\' What is her counter-thesis?',
        options: ['Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard', 'Dance talent is inherited and simply needs polishing', 'Only the guru-shishya lineage can transmit dance', 'She denies being a dancer at all'],
        answer: 'Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard',
        hook: 'The title is the thesis: her life episodes — a mother\'s death, an agriculture college, a guru\'s advice — are bridges she builds into her art.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation in the context of Forster\'s "The Story" is the disciplined process of deconstructing the essay\'s argumentative structure, evaluating the validity of its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_26_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Connect each life episode to the choreography it later fed, then test whether \'Bridges\' or \'The Reluctant Dancer\' names the real theme.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are reading a novel and feel bored by the plot but moved by a single paragraph — that tension is exactly what Forster diagnoses.',
            decisions: [{ prompt: 'What are the three distinct "voices" or reader responses Forster describes in the opening paragraph, and which one does he identify with?', options: [
                { text: 'The three voices are: (1) the vague, good-tempered man who sees the novel as merely', outcome: 'The three voices are: (1) the vague, good-tempered man who sees the novel as merely telling.' },
                { text: 'low atavistic form', outcome: 'Not quite — Students often think Forster *hates* story and wants novels without plots.', reveals: 'forster-hates-story-and-wants' },
                { text: 'Forster agrees with the second voice', outcome: 'Not quite — Students often think Forster *hates* story and wants novels without plots.', reveals: 'forster-hates-story-and-wants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are asked in a board exam: "How does Forster use the Scheherazade analogy to explain the primacy of story in the novel?" A struggling student often.',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing analytical paragraphs for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Point, Example.' },
                { text: 'Point, Example, Explanation, Conclusion', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarizing the chapter\'s content.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarizing the chapter\'s content.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a book club meeting where everyone has read Forster\'s essay but opinions differ on whether a novel is just a story.',
            decisions: [{ prompt: 'State the three discussion prompts given in the "Talking about the Text" section of Forster\'s essay "The Story".', options: [
                { text: 'The three prompts are: (1) "What does a novel do?" (2) "Our daily life reflects a double', outcome: 'The three prompts are: (1) "What does a novel do?" (2) "Our daily life reflects a double allegiance.' },
                { text: 'What does a novel do?', outcome: 'Not quite — Students treat "discussion" as turn-based summarizing: each person paraphrases the essay and the.', reveals: 'students-treat-discussion-as-turn' },
                { text: 'The description of novels as organisms', outcome: 'Not quite — Students treat "discussion" as turn-based summarizing: each person paraphrases the essay and the.', reveals: 'students-treat-discussion-as-turn' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is analysing a thriller that opens with the hero\'s death, then rewinds. Someone says: \'Forster would call this a great story because the plot keeps you hooked — and its values are its moral message about crime not paying.\'',
            decisions: [{ prompt: 'What has the speaker scrambled from Forster\'s \'The Story\'?', options: [
                { text: 'Untangle the terms: for Forster, \'story\' is the bare chronological tape-worm — events in time order, held together only by \'what happens next?\' (the Scheherazade suspense that kept the king listening). The film\'s shuffled order is \'plot\' — causal arrangement — and \'life by values\' means moments of emotional intensity that break clock-time, not moral lessons.', outcome: 'The club gains a precise toolkit: story = time sequence, plot = causality, values = intensity — and the film\'s opening flash-forward is revealed as plot, not story.' },
                { text: 'Agree — story and plot are the same thing, and the film\'s moral values are its strength.', outcome: 'Forster separates exactly these: story is raw chronology, plot is causal structure, and \'values\' means aesthetic intensity, not ethics.', reveals: 'story-plot-same-values-moral' },
                { text: 'Dismiss Forster — the essay is just an informal talk, so its definitions can\'t be rigorous.', outcome: 'The Clark Lectures\' conversational tone is deliberate method, not sloppiness; the colloquial style is how Forster gets at the novel\'s \'secrets\'.', reveals: 'informal-means-not-rigorous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_015', title: 'You made it',
          caseStudy: { intro: 'The essay isn\'t \'how she became a dancer\' — it\'s how a self metabolises loss, discipline and history into movement.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation in the context of Forster\'s "The.',
          hint: 'If stuck, review c11_eng_w_cbse_26_006 (Primary Theme) and re-read the "daily life".',
          misconception: 'Students often think Forster *hates* story and wants novels without plots.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Forster calls the story a "tape-worm" and a "backbone" — what does each metaphor convey about his view of narrative?', answer: '"Backbone" suggests structural necessity',
                  options: ['"Backbone" suggests structural necessity', 'Forster *hates* story and wants novels without plots'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_006 (Primary Theme) and re-read the "daily life" paragraph.',
                  misconception: 'Students often think Forster *hates* story and wants novels without plots.' }
          ],
            remediations: { 'forster-hates-story-and-wants': { steps: ['Re-read the paragraph where Forster says "I respect and admire the first speaker.', 'I detest and fear the second.', 'And the third is myself." 2.', 'Highlight every adjective he applies to "story" (fundamental, highest factor, low, atavistic, backbone, tape-worm.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Forster *hates* story and wants novels without plots.',
          parts: [
                { id: 'a', prompt: 'Evaluate Forster\'s claim that "the basis of a novel is a story and a story is a narrative of events in time sequence" — is this definition sufficient for.', answer: 'Forster\'s definition is necessary but not sufficient for high modernism',
                  options: ['Forster\'s definition is necessary but not sufficient for high modernism', 'Forster *hates* story and wants novels without plots'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_006 (Primary Theme) and re-read the "daily life" paragraph.',
                  misconception: 'Students often think Forster *hates* story and wants novels without plots.' },
                { id: 'b', prompt: 'Create a 4-line dialogue between Forster\'s "third voice" and a modernist novelist (e.g., Virginia Woolf) debating whether the "tape-worm" can be replaced.', answer: 'Third Voice: "The tape-worm is the backbone',
                  options: ['Third Voice: "The tape-worm is the backbone', 'Forster *hates* story and wants novels without plots'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_006 (Primary Theme) and re-read the "daily life" paragraph.',
                  misconception: 'Students often think Forster *hates* story and wants novels without plots.' }
          ],
            remediations: { 'forster-hates-story-and-wants': { steps: ['Re-read the paragraph where Forster says "I respect and admire the first speaker.', 'I detest and fear the second.', 'And the third is myself." 2.', 'Highlight every adjective he applies to "story" (fundamental, highest factor, low, atavistic, backbone, tape-worm.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_014', difficulty: 'standard',
          question: 'Analytical essay writing based on a literary essay involves constructing.',
          hint: 'If stuck, review c11_eng_w_cbse_26_013 (Critical Thinking) to re-learn how to break down.',
          misconception: 'Students believe that "writing skills based on the chapter" means summarizing the chapter\'s content in essay form.',
          parts: [
                { id: 'a', prompt: 'What is the full form of PEEL in the context of writing analytical paragraphs for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Explanation, Conclusion', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_013 (Critical Thinking) to re-learn how to break down Forster\'s.',
                  misconception: 'Students believe that "writing skills based on the chapter" means summarizing the chapter\'s content in essay form.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Give the student a 150-word summary of the chapter and a 150-word analytical response to the same prompt.', 'Ask them to highlight every sentence in the analytical piece that makes a *claim* (not a fact).', 'Have them convert each claim into a PEEL paragraph using a template: "Forster argues that ___ [Point].', 'He writes, \'___\' [Evidence].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, re-read the "Talking about the Text" box on page 187 and annotate each prompt.',
          misconception: 'Students treat "discussion" as turn-based summarizing: each person paraphrases the essay and the group moves on.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral activity where',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral activity where', '"Before You Read: Context and Background" provides essential preparatory knowledge about', 'Plot is the logical and causal arrangement of events in a narrative, distinct from the', 'Setting and Atmosphere in a non-fiction literary essay refers to the physical, temporal,'],
                  hint: 'If stuck, re-read the "Talking about the Text" box on page 187 and annotate each prompt with one.',
                  misconception: 'Students treat "discussion" as turn-based summarizing: each person paraphrases the essay and the group moves on.' }
          ],
            remediations: { 'students-treat-discussion-as-turn': { steps: ['If a student falls into summarizing, interrupt gently: "That\'s what Forster says — now what do *you* think about it?', 'Do you agree that a novel\'s only job is to make us ask \'what happens next\'?" Model a disagreeing stance: "I actually.', 'Repeat until they produce an original claim with textual support.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
