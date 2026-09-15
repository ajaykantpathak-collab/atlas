import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch26_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch26_p1: SimDef = {
    id: 'v3_c11_eng_w_ch26_p1',
    title: 'Bridges (Essay) · Part 1/3',
    subtitle: 'Read a dancer\'s memoir where every wound becomes raw material for art.',
    classLevel: 11, subject: 'eng_w', topic: 'Bridges (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch26'],
    nodeIds: ['c11_eng_w_cbse_26_001', 'c11_eng_w_cbse_26_002', 'c11_eng_w_cbse_26_003', 'c11_eng_w_cbse_26_004', 'c11_eng_w_cbse_26_005', 'c11_eng_w_cbse_26_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer mapping a dancer\'s detours', intro: 'Boarding school in 1944 Lahore, a mother\'s death, a college of twenty-nine boys and one girl — every detour later becomes choreography.', goal: 'Analyse the essay\'s episodic structure and its theme of art built from lived bridges.' },
    discovery: {
        question: 'People say Kumudini Lakhia was \'born to dance.\' She calls that a \'dubious assertion.\' What is her counter-thesis?',
        options: ['Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard', 'Dance talent is inherited and simply needs polishing', 'Only the guru-shishya lineage can transmit dance', 'She denies being a dancer at all'],
        answer: 'Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard',
        hook: 'The title is the thesis: her life episodes — a mother\'s death, an agriculture college, a guru\'s advice — are bridges she builds into her art.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides essential preparatory knowledge about the author (E.M.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_26_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Connect each life episode to the choreography it later fed, then test whether \'Bridges\' or \'The Reluctant Dancer\' names the real theme.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a masterclass by a famous director, but first you need to know: who is this director, why are they speaking informally, and what.',
            decisions: [{ prompt: 'Who was E.M. Forster and what is the source of the essay "The Story" in Woven Words?', options: [
                { text: 'E.M', outcome: 'E.M. Forster (1879–1970) was an English novelist, short story writer, and critic, best known for.' },
                { text: 'and informal phrasing', outcome: 'Not quite — Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured.', reveals: 'students-often-confuse-forster-s' },
                { text: '(causal, structured sequence) or assume', outcome: 'Not quite — Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured.', reveals: 'students-often-confuse-forster-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you watched. You might say, "First this happened, then that happened" — that\'s the story (chronological).',
            decisions: [{ prompt: 'According to E.M. Forster in "The Story", what is the fundamental difference between a \'story\' and the \'finer growths\' of a novel?', options: [
                { text: 'A story is a narrative of events arranged in their time-sequence (e.g., dinner after', outcome: 'A story is a narrative of events arranged in their time-sequence (e.g., dinner after breakfast.' },
                { text: 'story is the theme', outcome: 'Not quite — Students confuse "story" (Forster\'s term for raw chronological sequence) with "plot".', reveals: 'students-confuse-story-forster-s' },
                { text: 'story includes character', outcome: 'Not quite — Students confuse "story" (Forster\'s term for raw chronological sequence) with "plot".', reveals: 'students-confuse-story-forster-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a lecture hall in 1927 Cambridge: wooden benches, dust motes in sunlight, a don at the podium speaking conversationally about novels.',
            decisions: [{ prompt: 'Identify the two primary layers of setting in Forster\'s essay "The Story" and state the temporal location of the literal lecture setting.', options: [
                { text: 'The two primary layers are: (1) the literal setting of the 1927 Clark Lectures at Trinity', outcome: 'The two primary layers are: (1) the literal setting of the 1927 Clark Lectures at Trinity College.' },
                { text: 'talkative', outcome: 'Not quite — Students conflate "setting in a novel" (fictional world-building) with "setting in a literary.', reveals: 'students-conflate-setting-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re listening to a podcast where the host says, "I hate people who only want plot twists—but honestly, I\'m just like them." That contradiction makes.',
            decisions: [{ prompt: 'Identify the three "voices" Forster constructs in the opening of "The Story" and state the one-word attitude each displays toward the.', options: [
                { text: 'The three voices are: (1) the good-tempered, vague motor-bus driver who replies "placidly"', outcome: 'The three voices are: (1) the good-tempered, vague motor-bus driver who replies "placidly"; (2) the.' },
                { text: 'placidly', outcome: 'Not quite — Students treat Forster\'s three voices as real people he interviewed, not as rhetorical constructs.', reveals: 'students-treat-forster-s-three' },
                { text: 'Yes—oh dear yes', outcome: 'Not quite — Students treat Forster\'s three voices as real people he interviewed, not as rhetorical constructs.', reveals: 'students-treat-forster-s-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are writing an essay arguing that "social media distorts reality".',
            decisions: [{ prompt: 'Identify the three distinct voices Forster presents in the opening paragraph and state the attitude toward the novel each voice represents.', options: [
                { text: 'The three voices are: (1) the good-tempered, vague man driving a motor-bus who sees the', outcome: 'The three voices are: (1) the good-tempered, vague man driving a motor-bus who sees the novel as.' },
                { text: 'supporting characters', outcome: 'Not quite — Students often believe "supporting characters" only exist in fictional narratives with plot and.', reveals: 'supporting-characters-only-exist-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re trying to explain to a friend why you couldn\'t put down a thriller novel even though the writing wasn\'t "literary"—Forster would say you were.',
            decisions: [{ prompt: 'What is the single merit and single fault a story can have, according to Forster?', options: [
                { text: 'Correct answer: The only merit is making the audience want to know what happens next', outcome: 'Correct answer: The only merit is making the audience want to know what happens next; the only.' },
                { text: 'good characters', outcome: 'Not quite — Students often think Forster *dislikes* stories and wants novels without plots.', reveals: 'forster-dislikes-stories-and-wants' },
                { text: 'beautiful language', outcome: 'Not quite — Students often think Forster *dislikes* stories and wants novels without plots.', reveals: 'forster-dislikes-stories-and-wants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is analysing a thriller that opens with the hero\'s death, then rewinds. Someone says: \'Forster would call this a great story because the plot keeps you hooked — and its values are its moral message about crime not paying.\'',
            decisions: [{ prompt: 'What has the speaker scrambled from Forster\'s \'The Story\'?', options: [
                { text: 'Untangle the terms: for Forster, \'story\' is the bare chronological tape-worm — events in time order, held together only by \'what happens next?\' (the Scheherazade suspense that kept the king listening). The film\'s shuffled order is \'plot\' — causal arrangement — and \'life by values\' means moments of emotional intensity that break clock-time, not moral lessons.', outcome: 'The club gains a precise toolkit: story = time sequence, plot = causality, values = intensity — and the film\'s opening flash-forward is revealed as plot, not story.' },
                { text: 'Agree — story and plot are the same thing, and the film\'s moral values are its strength.', outcome: 'Forster separates exactly these: story is raw chronology, plot is causal structure, and \'values\' means aesthetic intensity, not ethics.', reveals: 'story-plot-same-values-moral' },
                { text: 'Dismiss Forster — the essay is just an informal talk, so its definitions can\'t be rigorous.', outcome: 'The Clark Lectures\' conversational tone is deliberate method, not sloppiness; the colloquial style is how Forster gets at the novel\'s \'secrets\'.', reveals: 'informal-means-not-rigorous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_006', title: 'The bigger picture',
          caseStudy: { intro: 'The essay isn\'t \'how she became a dancer\' — it\'s how a self metabolises loss, discipline and history into movement.',
            decisions: [{ prompt: 'What comes next? Bridges (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bridges (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides essential preparatory.',
          hint: 'If stuck, review the concept of "narrative voice" from Class 10 diary/letter texts.',
          misconception: 'Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured sequence) or assume.',
          parts: [
                { id: 'a', prompt: 'Apply Forster\'s distinction between "life in time" and "life by values" to this sentence: "I only saw her for five minutes, but it was worth it." Identify.', answer: '"Five minutes" reflects the life in time (chronological, measurable duration)',
                  options: ['"Five minutes" reflects the life in time (chronological, measurable duration)', '(causal, structured sequence) or assume', '"story" includes character and theme'],
                  hint: 'If stuck, review the concept of "narrative voice" from Class 10 diary/letter texts.',
                  misconception: 'Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured sequence) or assume "story" includes.' }
          ],
            remediations: { 'students-often-confuse-forster-s': { steps: ['Have the student reread the first three paragraphs and physically underline the three voices, labeling each: "vague,".', 'Ask them to list the "finer growths" Forster names (descriptions, judgements, incidents, morality, character.', 'Draw a two-column table: "Life in Time" (chronological, measurable) vs.', '"Life by Values" (intensity, pinnacles, not chronological) and place five daily-life examples in each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured sequence) or assume.',
          parts: [
                { id: 'a', prompt: 'Evaluate Forster\'s claim that "it is never possible for a novelist to deny time inside the fabric of his novel" by considering Emily Brontë (Wuthering.', answer: 'They confirm it',
                  options: ['They confirm it', '(causal, structured sequence) or assume', '"story" includes character and theme'],
                  hint: 'If stuck, review the concept of "narrative voice" from Class 10 diary/letter texts.',
                  misconception: 'Students often confuse Forster\'s "story" (bare time-sequence) with "plot" (causal, structured sequence) or assume "story" includes.' }
          ],
            remediations: { 'students-often-confuse-forster-s': { steps: ['Have the student reread the first three paragraphs and physically underline the three voices, labeling each: "vague,".', 'Ask them to list the "finer growths" Forster names (descriptions, judgements, incidents, morality, character.', 'Draw a two-column table: "Life in Time" (chronological, measurable) vs.', '"Life by Values" (intensity, pinnacles, not chronological) and place five daily-life examples in each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_002', difficulty: 'standard',
          question: 'Plot is the logical and causal arrangement of events in a narrative, distinct.',
          hint: 'Review Class 10 "Narrative Technique: First-Person Point of View" (c10_engl_cbse_03_006).',
          misconception: 'Students confuse "story" (Forster\'s term for raw chronological sequence) with "plot" (causal/logical structure) and.',
          parts: [
                { id: 'a', prompt: 'Forster compares the story to a "backbone — or may I say a tape-worm." Analyze this metaphor: what does each comparison suggest about the nature of story in.', answer: '"Backbone" suggests structural necessity',
                  options: ['"Backbone" suggests structural necessity', 'both mean the same', 'Forster is discussing plot when he defines story'],
                  hint: 'Review Class 10 "Narrative Technique: First-Person Point of View" (c10_engl_cbse_03_006) and "Diary.',
                  misconception: 'Students confuse "story" (Forster\'s term for raw chronological sequence) with "plot" (causal/logical structure) and think Forster.' }
          ],
            remediations: { 'students-confuse-story-forster-s': { steps: ['Re-read Forster\'s explicit definition: "A narrative of events arranged in their time-sequence."', 'Draw a timeline of a known story (e.g., *Cinderella*) — that\'s the story.', 'Now map the same tale as a plot: "Because her mother died, Cinderella was mistreated; because she was kind, the fairy.', 'Identify one "value-moment" (the ball) where clock-time stops mattering. Practice this split on two more texts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_003', difficulty: 'standard',
          question: 'Setting and Atmosphere in a non-fiction literary essay refers to the physical.',
          hint: 'Review "rhetorical situation" (speaker, audience, purpose, context) from Class 10 writing.',
          misconception: 'Students conflate "setting in a novel" (fictional world-building) with "setting in a literary essay" (rhetorical.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the Neolithic campfire scene functions as a rhetorical setting rather than a narrative setting.', answer: 'The Neolithic campfire is a rhetorical setting',
                  options: ['The Neolithic campfire is a rhetorical setting', 'Forster telling a story about cavemen', 'atavistic'],
                  hint: 'Review "rhetorical situation" (speaker, audience, purpose, context) from Class 10 writing skills.',
                  misconception: 'Students conflate "setting in a novel" (fictional world-building) with "setting in a literary essay" (rhetorical staging).' },
                { id: 'b', prompt: 'Apply the concept of "atmosphere as argument" to the Scheherazade bedroom scene.', answer: 'Three details: (1) "crack of dawn" / "morning appearing"',
                  options: ['Three details: (1) "crack of dawn" / "morning appearing"', 'she told stories to stay alive'],
                  hint: 'Review "rhetorical situation" (speaker, audience, purpose, context) from Class 10 writing skills.',
                  misconception: 'Students conflate "setting in a novel" (fictional world-building) with "setting in a literary essay" (rhetorical staging).' }
          ],
            remediations: { 'students-conflate-setting-in-a': { steps: ['If the student cannot distinguish the essay\'s setting layers: (1) Have them physically mark the text with two colored.', '(2) Ask: "In which setting does Forster speak as himself?', 'In which does he speak as a literary historian?" (3) Have them rewrite one paragraph replacing the evoked setting with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a non-fiction essay examines the.',
          hint: 'Review c9_engl_ch1_2 (grandmother as narrator) and c10_engl_cbse_17_001 (Bholi\'s.',
          misconception: 'Students treat Forster\'s three voices as real people he interviewed, not as rhetorical constructs he *invented*.',
          parts: [
                { id: 'a', prompt: 'Analyze how Forster uses Scheherazade as a character analogue for the novelist.', answer: 'Forster lists Scheherazade\'s gifts: exquisite descriptions, tolerant judgements,',
                  options: ['Forster lists Scheherazade\'s gifts: exquisite descriptions, tolerant judgements,', 'incidental'],
                  hint: 'Review c9_engl_ch1_2 (grandmother as narrator) and c10_engl_cbse_17_001 (Bholi\'s transformation).',
                  misconception: 'Students treat Forster\'s three voices as real people he interviewed, not as rhetorical constructs he *invented* to stage a debate.' }
          ],
            remediations: { 'students-treat-forster-s-three': { steps: ['Return to the opening paragraph: highlight "I visualise," "he says," "the third is myself"—Forster *announces* the.', 'Have the student rewrite the three voices as deliberate caricatures: "Forster creates X to represent Y attitude." 3.', 'Ask: "If these were real people, why would Forster need to \'visualise\' them?" 4.', 'Connect to the essay\'s final note: Forster calls his lectures "talkative," "informal," using "I, you, one, we"—the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in a non-fiction essay involves.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_26_004) to re-establish.',
          misconception: 'Students often believe "supporting characters" only exist in fictional narratives with plot and dialogue.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Forster chooses Scheherazade as his central supporting figure rather than a modern novelist or a generic storyteller.', answer: 'Forster selects Scheherazade',
                  options: ['Forster selects Scheherazade', 'supporting characters'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_26_004) to re-establish Forster\'s.',
                  misconception: 'Students often believe "supporting characters" only exist in fictional narratives with plot and dialogue.' }
          ],
            remediations: { 'supporting-characters-only-exist-in': { steps: ['If the student cannot distinguish the three opening voices, have them re-read paragraph 1 and highlight every adjective.', 'Then ask: "Which voice does Forster say \'I respect and admire\'?', 'Which does he \'detest and fear\'?', 'Which is \'myself\'?" Next, create a three-column table: Voice | Attitude toward Novel | Forster\'s Judgment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_006', difficulty: 'standard',
          question: 'The primary theme of Forster\'s essay "The Story" is the fundamental.',
          hint: 'If stuck, re-read the "From Aspects of the Novel: A Note" section to grasp Forster\'s.',
          misconception: 'Students often think Forster *dislikes* stories and wants novels without plots.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Forster says the story is "the lowest and simplest of literary organisms" yet "the highest factor common to all novels."', answer: 'Correct answer: The story is "lowest"',
                  options: ['Correct answer: The story is "lowest"', 'complex', 'Forster *dislikes* stories and wants novels without plots'],
                  hint: 'If stuck, re-read the "From Aspects of the Novel: A Note" section to grasp Forster\'s intentional.',
                  misconception: 'Students often think Forster *dislikes* stories and wants novels without plots.' }
          ],
            remediations: { 'forster-dislikes-stories-and-wants': { steps: ['If the student holds this misconception: (1) Have them re-read the paragraph starting "We are like Scheherazade\'s.', '(2) Ask: "If Forster hated story, why does he say Emily Brontë only *tried to hide* her clock, and Sterne only *turned.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
