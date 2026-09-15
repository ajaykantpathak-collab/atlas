import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch02_p2: SimDef = {
    id: 'v3_c9_engl_ch02_p2',
    title: 'The Pot Maker · Part 2/2',
    subtitle: 'A potter\'s daughter vs. a mother\'s fear',
    classLevel: 9, subject: 'engl', topic: 'The Pot Maker · Part 2/2',
    chapters: ['c9_engl_ch02'],
    nodeIds: ['c9_engl_ch2_6', 'c9_engl_ch2_7', 'c9_engl_ch2_8', 'c9_engl_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer condensing a life story', intro: 'A girl wants to spin clay like her grandfather; her mother wants a salary slip. Tell the whole story in 150 words — without losing the cultural stakes or the mother\'s very real worry.', goal: 'Write a structured summary of \'The Pot Maker\' — Sentila\'s dream, the conflict with Arenla, secret practice, exhibition and resolution — selecting plot-critical events over every detail.' },
    discovery: {
        question: 'Sentila\'s mother blocks her from learning pottery — not because she hates the craft, but for a reason many parents would recognise. What is it?',
        options: ['She wants the security of formal education and a government job — pottery looks like a low-income dead end, not a career', 'She thinks pots are unlucky', 'She wants Sentila to marry instead', 'She doesn\'t want her copying the grandfather'],
        answer: 'She wants the security of formal education and a government job — pottery looks like a low-income dead end, not a career',
        hook: 'The conflict isn\'t love vs hate — it\'s security vs calling. Arenla\'s worry is economic, not emotional. And the story resolves not by argument but by proof: the village exhibition makes Sentila\'s talent undeniable.',
    },
    teaching: [
        { title: 'Cultural Context: Pot Making as a Community Craft', text: 'Cultural context in literature refers to the social, historical, and traditional background that shapes characters\' values, conflicts, and choices; in "The Pot Maker," it specifically means.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch2_6', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compress Sentila\'s story into a board-ready summary: the Naga village setting, the education-vs-tradition conflict, the secret practice with her grandfather\'s tools, the exhibition triumph — ordered, compressed, no copied sentences.',
        labels: ['Cultural Context: Pot Making', 'Literary Device: Descriptive Language', 'Vocabulary in Context: Words', 'Conflict: Individual Desire'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch2_7', title: 'Literary Device: Descriptive Language for Craft Process',
          caseStudy: { intro: 'Imagine you are visiting a potter\'s workshop in a village near Kohima.',
            decisions: [{ prompt: 'Define "descriptive language for craft process" in your own words, listing the four key components it relies on.', options: [
                { text: 'Descriptive language for craft process uses sensory imagery, precise technical', outcome: 'Descriptive language for craft process uses sensory imagery, precise technical vocabulary, strong.' },
                { text: 'adjectives', outcome: 'Not quite — Students believe descriptive language in craft writing is primarily a list of adjectives (e.g.', reveals: 'descriptive-language-in-craft-writing' },
                { text: 'describing words', outcome: 'Not quite — Students believe descriptive language in craft writing is primarily a list of adjectives (e.g.', reveals: 'descriptive-language-in-craft-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_8', title: 'Vocabulary in Context: Words Related to Pottery',
          caseStudy: { intro: 'Imagine you are watching a potter at work in a village in Nagaland and hear words like "wedging" and "bisque" – you wouldn\'t carry a dictionary, so how would.',
            decisions: [{ prompt: 'What is the primary context clue type used in this sentence from the text: "Sentila learned **wedging**, the process of kneading clay.', options: [
                { text: 'The primary context clue is **definition/explanation** (signaled by the comma and the', outcome: 'The primary context clue is **definition/explanation** (signaled by the comma and the phrase "the.' },
                { text: 'synonym', outcome: 'Not quite — Students believe **\'firing\' and \'baking\' are interchangeable** because both involve heat.', reveals: 'firing-and-baking-are-interchangeable' },
                { text: 'example', outcome: 'Not quite — Students believe **\'firing\' and \'baking\' are interchangeable** because both involve heat.', reveals: 'firing-and-baking-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_9', title: 'Conflict: Individual Desire vs Family and Community Pressure',
          caseStudy: { intro: 'Imagine you are a Class 9 student who wants to take up music but your parents insist you focus only on science for a "safe" career.',
            decisions: [{ prompt: 'What is the core definition of "individual desire vs. family/community pressure" as a literary conflict?', options: [
                { text: 'The core definition is a struggle where a character\'s personal passion or goal opposes', outcome: 'The core definition is a struggle where a character\'s personal passion or goal opposes the.' },
                { text: 'it\'s just a fight between mother and daughter', outcome: 'Not quite — Students often think the conflict is only between Sentila and her mother, overlooking the.', reveals: 'the-conflict-is-only-between' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Asked to summarise \'Sentila\'s Pursuit of Pot Making,\' a student writes: \'Sentila wants to make pots. Her mother says no. She practices secretly. There is a fair. Her pots win. Mother is happy.\'',
            decisions: [{ prompt: 'What is missing from this summary?', options: [
                { text: 'The substance: the Naga village setting, why Arenla objects — she sees a government job as security and pottery as an uncertain craft — the grandfather\'s legacy behind Sentila\'s passion, and the exhibition where public admiration finally turns the mother. Plot points without stakes are not a summary.', outcome: 'This restores the conflict\'s reasons and the cultural context that make the resolution meaningful — the difference between a gist and a board-level summary.' },
                { text: 'Nothing — it is short, in order, and hits every event, which is all a summary requires.', outcome: 'It omits the setting, the mother\'s actual reasoning and the craft\'s significance; brevity without the conflict\'s cause is just a chopped plot list.', reveals: 'short-is-summary' },
                { text: 'The summary fails only because it never says whether pottery or education was the better choice.', outcome: 'A summary does not adjudicate; it reports the conflict and its resolution — the verdict belongs to the story, not the student.', reveals: 'summary-must-judge' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_9', title: 'You made it',
          caseStudy: { intro: 'A summary selects and compresses — it isn\'t every paragraph shrunk. Keep the five elements (character, setting, conflict, key events, resolution) and let the minor scenes go.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch2_6', difficulty: 'standard',
          question: 'Cultural context in literature refers to the social, historical, and.',
          hint: 'If stuck, review c9_engl_ch2_5 to re-activate the "tradition as theme" lens, then re-read.',
          misconception: 'Students treat cultural context as "extra information" or "setting details" rather than the invisible system that.',
          parts: [
                { id: 'a', prompt: 'Find two textual details showing pottery knowledge is transmitted communally (not individually).', answer: 'Detail 1: Elders teaching young girls at the riverbank',
                  options: ['Detail 1: Elders teaching young girls at the riverbank', 'collective memory'],
                  hint: 'If stuck, review c9_engl_ch2_5 to re-activate the "tradition as theme" lens, then re-read the story.',
                  misconception: 'Students treat cultural context as "extra information" or "setting details" rather than the invisible system that generates the plot\'s.' }
          ],
            remediations: { 'students-treat-cultural-context-as': { steps: ['Have student list 5 textual details about pottery (clay digging, teaching, firing, selling, rituals).', 'For each, ask: "If this detail disappeared, would Sentila\'s conflict change? How?"', 'Guide them to see that removing *communal teaching* makes Arenla\'s opposition irrational; removing *collective firing*.', 'Co-write a PEEL paragraph where the Point is "Cultural context creates the conflict," Evidence is a specific detail.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_7', difficulty: 'standard',
          question: 'Descriptive language for craft process refers to the deliberate use of sensory.',
          hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice.',
          misconception: 'Students believe descriptive language in craft writing is primarily a list of adjectives (e.g., "wet clay", "hot kiln".',
          parts: [
                { id: 'a', prompt: 'Define "descriptive language for craft process" in your own words, listing the four key components it relies on.', answer: 'Descriptive language for craft process uses sensory imagery, precise technical',
                  options: ['Descriptive language for craft process uses sensory imagery, precise technical', 'adjectives', 'describing words', 'wet clay'],
                  hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice verb-centred.',
                  misconception: 'Students believe descriptive language in craft writing is primarily a list of adjectives (e.g., "wet clay", "hot kiln", "round pot").' },
                { id: 'b', prompt: 'In the sentence "Sentila\'s fingers found the centre, coaxing the reluctant clay upward," identify the sense appealed to, the precise verb, and the figurative.', answer: 'The sentence appeals to touch (tactile imagery)',
                  options: ['The sentence appeals to touch (tactile imagery)', 'fingers', 'wet clay', 'hot kiln'],
                  hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice verb-centred.',
                  misconception: 'Students believe descriptive language in craft writing is primarily a list of adjectives (e.g., "wet clay", "hot kiln", "round pot").' }
          ],
            remediations: { 'descriptive-language-in-craft-writing': { steps: ['Give the student a 3-sentence "weak description" of a craft step (e.g., weaving: "She put the thread over and under.', 'Ask them to highlight the verbs and nouns—note they are generic.', 'Provide a "strong description" of the same step from the text or a mentor text.', 'Co-construct a two-column table: Weak Verb/Noun → Strong Verb/Noun + Sensory Effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe descriptive language in craft writing is primarily a list of adjectives (e.g., "wet clay", "hot kiln".',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: *"The descriptive language in \'The Pot Maker\' is just there to make the story pretty.', answer: 'Refute',
                  options: ['Refute', 'wet clay', 'hot kiln', 'round pot'],
                  hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice verb-centred.',
                  misconception: 'Students believe descriptive language in craft writing is primarily a list of adjectives (e.g., "wet clay", "hot kiln", "round pot").' }
          ],
            remediations: { 'descriptive-language-in-craft-writing': { steps: ['Give the student a 3-sentence "weak description" of a craft step (e.g., weaving: "She put the thread over and under.', 'Ask them to highlight the verbs and nouns—note they are generic.', 'Provide a "strong description" of the same step from the text or a mentor text.', 'Co-construct a two-column table: Weak Verb/Noun → Strong Verb/Noun + Sensory Effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_8', difficulty: 'standard',
          question: 'Vocabulary in context refers to the strategy of determining the meaning.',
          hint: 'Review the "Context Clue Types" anchor chart from Class 8 (node c8_engl_ch4_9) and.',
          misconception: 'Students believe **\'firing\' and \'baking\' are interchangeable** because both involve heat.',
          parts: [
                { id: 'a', prompt: 'Read this new sentence: "After the first firing, the **bisque** ware was porous and ready for glazing." Using context clues, write the meaning of \'bisque\' and.', answer: 'Meaning: **Pottery that has been fired once but not yet glazed.** Clue type:',
                  options: ['Meaning: **Pottery that has been fired once but not yet glazed.** Clue type:', '**\'firing\' and \'baking\' are interchangeable**'],
                  hint: 'Review the "Context Clue Types" anchor chart from Class 8 (node c8_engl_ch4_9) and practice.',
                  misconception: 'Students believe **\'firing\' and \'baking\' are interchangeable** because both involve heat.' },
                { id: 'b', prompt: 'Compare how the author introduces **\'centering\'** (described as "the hardest skill: forcing the clay to spin perfectly still in the middle of the wheel").', answer: '\'Centering\' is more accessible',
                  options: ['\'Centering\' is more accessible', '**\'firing\' and \'baking\' are interchangeable**'],
                  hint: 'Review the "Context Clue Types" anchor chart from Class 8 (node c8_engl_ch4_9) and practice.',
                  misconception: 'Students believe **\'firing\' and \'baking\' are interchangeable** because both involve heat.' }
          ],
            remediations: { 'firing-and-baking-are-interchangeable': { steps: ['**Isolate the error**: Ask the student to list all heat-related words in the chapter (firing, kiln, temperature, glaze.', '**Contrast definitions**: Have them write dictionary definitions of \'firing\' (pottery) and \'baking\' (food) side-by-side.', '**Text-evidence hunt**: Find the sentence where the author describes what happens *inside* the kiln (e.g., "clay turns.', '**Re-write**: Replace \'firing\' with \'baking\' in that sentence and discuss why it sounds wrong (trivializes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_9', difficulty: 'standard',
          question: 'Conflict between individual desire and family/community pressure refers to the.',
          hint: 'Review c9_engl_ch2_2 and c9_engl_ch2_3 for character motivation charts.',
          misconception: 'Students often think the conflict is only between Sentila and her mother, overlooking the community\'s role as a silent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conflict between individual desire and family/community pressure refers to the struggle a',
                  options: ['Conflict between individual desire and family/community pressure refers to the struggle a', 'A story summary is a concise retelling of the narrative\'s essential elements—main', 'Perseverance in "The Pot Maker" is the sustained effort to master a difficult craft', 'Character analysis is the systematic examination of a literary character\'s traits,'],
                  hint: 'Review c9_engl_ch2_2 and c9_engl_ch2_3 for character motivation charts.',
                  misconception: 'Students often think the conflict is only between Sentila and her mother, overlooking the community\'s role as a silent antagonist.' }
          ],
            remediations: { 'the-conflict-is-only-between': { steps: ['Re-read the three key scenes: (a) Sentila at her grandfather\'s wheel, (b) the kitchen argument about the pottery wheel.', 'Draw a three-column table: Column 1 = Sentila\'s desire (quote), Column 2 = Arenla\'s pressure (quote), Column 3.', 'For each row, write one sentence: "This shows conflict because..." 4.', 'Use this table to draft a PEEL paragraph answering: "How does the author portray the pressure from the community?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
