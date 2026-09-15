import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch26_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch26_p2: SimDef = {
    id: 'v3_c11_eng_w_ch26_p2',
    title: 'Bridges (Essay) · Part 2/3',
    subtitle: 'Read a dancer\'s memoir where every wound becomes raw material for art.',
    classLevel: 11, subject: 'eng_w', topic: 'Bridges (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch26'],
    nodeIds: ['c11_eng_w_cbse_26_007', 'c11_eng_w_cbse_26_008', 'c11_eng_w_cbse_26_009', 'c11_eng_w_cbse_26_010', 'c11_eng_w_cbse_26_011', 'c11_eng_w_cbse_26_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer mapping a dancer\'s detours', intro: 'Boarding school in 1944 Lahore, a mother\'s death, a college of twenty-nine boys and one girl — every detour later becomes choreography.', goal: 'Analyse the essay\'s episodic structure and its theme of art built from lived bridges.' },
    discovery: {
        question: 'People say Kumudini Lakhia was \'born to dance.\' She calls that a \'dubious assertion.\' What is her counter-thesis?',
        options: ['Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard', 'Dance talent is inherited and simply needs polishing', 'Only the guru-shishya lineage can transmit dance', 'She denies being a dancer at all'],
        answer: 'Talent is cultivated through disciplined struggle — \'to dance means to struggle,\' technique first, then throw it overboard',
        hook: 'The title is the thesis: her life episodes — a mother\'s death, an agriculture college, a guru\'s advice — are bridges she builds into her art.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are subordinate ideas that run alongside the primary theme, emerging through recurring motifs, contrasts, or subsidiary arguments in the text; they enrich the central message.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_26_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Connect each life episode to the choreography it later fed, then test whether \'Bridges\' or \'The Reluctant Dancer\' names the real theme.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are reading "Bridges" and notice the author repeatedly contrasts old stone bridges with modern steel ones, and also describes how festivals bring.',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes a secondary theme from a mere supporting detail in an essay?', options: [
                { text: 'A secondary theme is a recurring idea that appears in multiple sections of the text and', outcome: 'A secondary theme is a recurring idea that appears in multiple sections of the text and offers.' },
                { text: 'a secondary theme is just a minor detail', outcome: 'Not quite — Students often think any recurring topic (e.g., "rivers" or "construction materials") is.', reveals: 'any-recurring-topic-e' },
                { text: 'rivers', outcome: 'Not quite — Students often think any recurring topic (e.g., "rivers" or "construction materials") is.', reveals: 'any-recurring-topic-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are trying to explain a complex idea—like "time" or "story structure"—to a friend who finds abstract talk boring.',
            decisions: [{ prompt: 'What is the primary difference between a simile and a metaphor, and which one does Forster use when he writes, "It runs like a backbone—or.', options: [
                { text: 'A simile uses "like" or "as" to compare two things', outcome: 'A simile uses "like" or "as" to compare two things; a metaphor states one thing *is* another.' },
                { text: 'backbone', outcome: 'Not quite — Students often treat imagery and metaphor as **decorative "add-ons"**—pretty language that makes.', reveals: 'students-often-treat-imagery-and' },
                { text: 'tape-worm', outcome: 'Not quite — Students often treat imagery and metaphor as **decorative "add-ons"**—pretty language that makes.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading Forster\'s essay and notice he calls the story a "tape-worm" — a parasite — yet also calls it the "highest factor common to all novels.".',
            decisions: [{ prompt: 'Define verbal irony and situational irony in your own words, giving one example from Forster\'s essay for each.', options: [
                { text: 'Verbal irony: Forster says "I respect and admire the first speaker" (the vague motor-bus', outcome: 'Verbal irony: Forster says "I respect and admire the first speaker" (the vague motor-bus driver).' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students equate irony with "unexpected outcome" or "sarcasm" and treat symbols as fixed codes.', reveals: 'students-equate-irony-with-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading Forster\'s essay and encounter "atavistic form" describing the story—you\'ve never seen this word before, but the sentence says "I wish.',
            decisions: [{ prompt: 'Define the term "atavistic" as used in Forster\'s phrase "low atavistic form" and identify which contextual clue (contrast, tone,.', options: [
                { text: 'Atavistic means relating to ancestral characteristics reappearing after generations', outcome: 'Atavistic means relating to ancestral characteristics reappearing after generations; primitive.' },
                { text: 'modern', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the dictionary definition from nearby words".', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'sophisticated', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the dictionary definition from nearby words".', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re in the board exam and see a question: "According to Forster, why does Scheherazade survive?" Your heart races—is this asking for a direct quote.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What three types of voices does Forster describe responding to the.', options: [
                { text: 'This is a LITERAL question', outcome: 'This is a LITERAL question. The answer is directly stated in the first paragraph: the good-tempered.' },
                { text: 'personal opinion', outcome: 'Not quite — Students believe inferential questions allow "personal opinion" answers without textual evidence.', reveals: 'inferential-questions-allow-personal-opinion' },
                { text: 'inferential questions allow "personal opinion" answers without textual evidence', outcome: 'Not quite — Students believe inferential questions allow "personal opinion" answers without textual evidence.', reveals: 'inferential-questions-allow-personal-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is analysing a thriller that opens with the hero\'s death, then rewinds. Someone says: \'Forster would call this a great story because the plot keeps you hooked — and its values are its moral message about crime not paying.\'',
            decisions: [{ prompt: 'What has the speaker scrambled from Forster\'s \'The Story\'?', options: [
                { text: 'Untangle the terms: for Forster, \'story\' is the bare chronological tape-worm — events in time order, held together only by \'what happens next?\' (the Scheherazade suspense that kept the king listening). The film\'s shuffled order is \'plot\' — causal arrangement — and \'life by values\' means moments of emotional intensity that break clock-time, not moral lessons.', outcome: 'The club gains a precise toolkit: story = time sequence, plot = causality, values = intensity — and the film\'s opening flash-forward is revealed as plot, not story.' },
                { text: 'Agree — story and plot are the same thing, and the film\'s moral values are its strength.', outcome: 'Forster separates exactly these: story is raw chronology, plot is causal structure, and \'values\' means aesthetic intensity, not ethics.', reveals: 'story-plot-same-values-moral' },
                { text: 'Dismiss Forster — the essay is just an informal talk, so its definitions can\'t be rigorous.', outcome: 'The Clark Lectures\' conversational tone is deliberate method, not sloppiness; the colloquial style is how Forster gets at the novel\'s \'secrets\'.', reveals: 'informal-means-not-rigorous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_26_012', title: 'The bigger picture',
          caseStudy: { intro: 'The essay isn\'t \'how she became a dancer\' — it\'s how a self metabolises loss, discipline and history into movement.',
            decisions: [{ prompt: 'What comes next? Bridges (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bridges (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_007', difficulty: 'standard',
          question: 'Secondary themes are subordinate ideas that run alongside the primary theme.',
          hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_26_006) and re-read the essay.',
          misconception: 'Students often think any recurring topic (e.g., "rivers" or "construction materials") is a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Given a new paragraph from "Bridges" where the author contrasts the silent endurance of an old bridge with the noisy efficiency of a new flyover, apply the.', answer: 'The secondary theme is tradition versus modernity',
                  options: ['The secondary theme is tradition versus modernity', 'contrast', 'rivers', 'construction materials'],
                  hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_26_006) and re-read the essay marking every.',
                  misconception: 'Students often think any recurring topic (e.g., "rivers" or "construction materials") is a secondary theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student to list five recurring concrete images in "Bridges" (e.g., stone, river, festival, commuters, carvings).', 'For each image, ask: "What abstract idea does this image suggest?" (e.g., stone → endurance).', 'Group the abstract ideas into clusters that appear in at least two distinct sections.', 'Have the student write a one-sentence thematic statement for each cluster.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any recurring topic (e.g., "rivers" or "construction materials") is a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Critique the following student statement: "The secondary themes in \'Bridges\' are less important than the primary theme, so they can be ignored in an exam.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'rivers', 'construction materials', 'any recurring topic (e'],
                  hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_26_006) and re-read the essay marking every.',
                  misconception: 'Students often think any recurring topic (e.g., "rivers" or "construction materials") is a secondary theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student to list five recurring concrete images in "Bridges" (e.g., stone, river, festival, commuters, carvings).', 'For each image, ask: "What abstract idea does this image suggest?" (e.g., stone → endurance).', 'Group the abstract ideas into clusters that appear in at least two distinct sections.', 'Have the student write a one-sentence thematic statement for each cluster.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review **c11_eng_w_cbse_26_006 (Theme: Primary Theme and Message)**.',
          misconception: 'Students often treat imagery and metaphor as **decorative "add-ons"**—pretty language that makes the essay.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a simile and a metaphor, and which one does Forster use when he writes, "It runs like a backbone—or may I say.', answer: 'A simile uses "like" or "as" to compare two things',
                  options: ['A simile uses "like" or "as" to compare two things', 'backbone', 'tape-worm'],
                  hint: 'If stuck, review **c11_eng_w_cbse_26_006 (Theme: Primary Theme and Message)** — specifically the.',
                  misconception: 'Students often treat imagery and metaphor as **decorative "add-ons"**—pretty language that makes the essay "beautiful"—rather than.' },
                { id: 'b', prompt: 'Apply the concept of "vehicle" and "tenor" (from I.A. Richards) to Forster\'s metaphor: **"The novelist droned on and, as soon as the audience guessed what.', answer: 'Tenor: The novelist/storyteller',
                  options: ['Tenor: The novelist/storyteller', 'the vehicle is the audience'],
                  hint: 'If stuck, review **c11_eng_w_cbse_26_006 (Theme: Primary Theme and Message)** — specifically the.',
                  misconception: 'Students often treat imagery and metaphor as **decorative "add-ons"**—pretty language that makes the essay "beautiful"—rather than.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Re-read Paragraph 3 aloud** with a pencil: circle every noun/verb appealing to senses (shock-heads, gaping, campfire.', 'Ask: "If I delete these words, does Forster\'s *argument* about suspense survive?" (No—the biological urgency vanishes).', '**Map the Tape-Worm** on paper: Draw a segmented worm.', 'Label segments: "Arbitrary Start," "Breakfast," "Dinner," "Tuesday," "Death," "Decay," "Arbitrary End." Write Forster\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'Review c11_eng_w_cbse_26_008 Worked Example 2 on metaphor identification; then re-read.',
          misconception: 'Students equate irony with "unexpected outcome" or "sarcasm" and treat symbols as fixed codes (e.g., "dove = peace").',
          parts: [
                { id: 'a', prompt: 'Forster writes: "It runs like a backbone — or may I say a tape-worm." Explain why this is a symbol and not merely a metaphor, and what abstract idea the.', answer: 'A metaphor makes a direct comparison ("A is B"); a symbol operates recursively',
                  options: ['A metaphor makes a direct comparison ("A is B"); a symbol operates recursively', 'Forster compares story to tape-worm'],
                  hint: 'Review c11_eng_w_cbse_26_008 Worked Example 2 on metaphor identification; then re-read Forster.',
                  misconception: 'Students equate irony with "unexpected outcome" or "sarcasm" and treat symbols as fixed codes (e.g., "dove = peace").' },
                { id: 'b', prompt: 'Analyze how the symbol of the "clock" functions differently in daily life versus in the novel, according to Forster.', answer: 'In daily life, the clock is resistible: "we do not know',
                  options: ['In daily life, the clock is resistible: "we do not know', 'clock represents time in both'],
                  hint: 'Review c11_eng_w_cbse_26_008 Worked Example 2 on metaphor identification; then re-read Forster.',
                  misconception: 'Students equate irony with "unexpected outcome" or "sarcasm" and treat symbols as fixed codes (e.g., "dove = peace").' }
          ],
            remediations: { 'students-equate-irony-with-unexpected': { steps: ['Return to the three voices (paragraph 1) and have the student read them aloud, noting tone shifts.', 'Ask: "Which voice does Forster *actually* inhabit?" Guide them to see he occupies the third voice *while criticizing.', 'Trace the tape-worm/backbone image across three paragraphs (2, 3, 4).', 'Have the student underline every occurrence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If stuck, re-read the "three voices" opening (paragraphs 1-3) and the Scheherazade.',
          misconception: 'Students treat "vocabulary in context" as "guess the dictionary definition from nearby words" rather than "reconstruct.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the precise meaning, connotation, and',
                  options: ['Vocabulary in Context is the skill of determining the precise meaning, connotation, and', '"Before You Read: Context and Background" provides essential preparatory knowledge about', 'Plot is the logical and causal arrangement of events in a narrative, distinct from the', 'Setting and Atmosphere in a non-fiction literary essay refers to the physical, temporal,'],
                  hint: 'If stuck, re-read the "three voices" opening (paragraphs 1-3) and the Scheherazade passage.',
                  misconception: 'Students treat "vocabulary in context" as "guess the dictionary definition from nearby words" rather than "reconstruct the author\'s precise.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student locate the target word in the text and read the *entire sentence* aloud, then the *preceding and.', 'Ask: "What grammatical role does this word play?', '(Adverb modifying \'replied\'?', 'Adjective modifying \'form\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_011', difficulty: 'standard',
          question: 'Language usage in the text refers to the author\'s deliberate grammatical and.',
          hint: 'Review Class 6-8 grammar nodes on pronouns (c6_english_u1_008), sentence structure.',
          misconception: 'Students often think \'language usage\' means only vocabulary meanings (like \'atavistic\', \'ingenious\') and overlook.',
          parts: [
                { id: 'a', prompt: 'Rewrite the following spoken-style sentence from Forster into formal academic register: \'I respect and admire the first speaker. I detest and fear the second.', answer: 'Formal rewrite: \'The first speaker merits respect and admiration',
                  options: ['Formal rewrite: \'The first speaker merits respect and admiration', 'only changes vocabulary (e'],
                  hint: 'Review Class 6-8 grammar nodes on pronouns (c6_english_u1_008), sentence structure.',
                  misconception: 'Students often think \'language usage\' means only vocabulary meanings (like \'atavistic\', \'ingenious\') and overlook *grammatical* choices.' }
          ],
            remediations: { 'language-usage-means-only-vocabulary': { steps: ['Give the student two short extracts: one from Forster\'s essay (paragraph 1) and one from a formal literary criticism.', 'Ask them to circle every \'I, you, we, let\'s, it\'s, so to speak\' in Forster and note their absence in the formal text.', 'Have them rewrite one Forster sentence into formal style, then articulate *what was lost* (immediacy, character voice.', 'Finally, return to the Note and ask: \'Which style does Forster say the novel prefers?\' to close the loop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_26_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review c11_eng_w_cbse_26_002 (Plot and Narrative Structure) to re-read.',
          misconception: 'Students believe inferential questions allow "personal opinion" answers without textual evidence.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What three types of voices does Forster describe responding to the question \'What does.', answer: 'This is a LITERAL question',
                  options: ['This is a LITERAL question', 'personal opinion', 'inferential questions allow "personal opinion" answers without textual evidence'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_002 (Plot and Narrative Structure) to re-read Forster\'s key.',
                  misconception: 'Students believe inferential questions allow "personal opinion" answers without textual evidence.' },
                { id: 'b', prompt: 'APPLY: Using the text, answer this inferential question: "Why does Forster say the story is \'the lowest and simplest of literary organisms\' yet \'the highest.', answer: 'Step 1: Locate the paradox in paragraph 3 ("lowest and simplest',
                  options: ['Step 1: Locate the paradox in paragraph 3 ("lowest and simplest', 'personal opinion', 'inferential questions allow "personal opinion" answers without textual evidence'],
                  hint: 'If stuck, review c11_eng_w_cbse_26_002 (Plot and Narrative Structure) to re-read Forster\'s key.',
                  misconception: 'Students believe inferential questions allow "personal opinion" answers without textual evidence.' }
          ],
            remediations: { 'inferential-questions-allow-personal-opinion': { steps: ['Show them a 2-mark board answer—highlight how every sentence begins with "The text states..." or "Forster writes...".', 'Give them a literal question disguised as inferential ("Why does Forster call the story a tape-worm?") and have them.', 'Practice the "Evidence → Inference → Explanation" three-column table until they automatically hunt for textual anchors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
