import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch08_p1: SimDef = {
    id: 'v3_c11_eng_w_ch08_p1',
    title: 'The Luncheon (Short Story) · Part 1/3',
    subtitle: 'Watch a month\'s budget get eaten course by course — and revenge arrive twenty years late.',
    classLevel: 11, subject: 'eng_w', topic: 'The Luncheon (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch08'],
    nodeIds: ['c11_eng_w_cbse_08_001', 'c11_eng_w_cbse_08_002', 'c11_eng_w_cbse_08_003', 'c11_eng_w_cbse_08_004', 'c11_eng_w_cbse_08_005', 'c11_eng_w_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a diarist dissecting a ruinous lunch in 1920s Paris', intro: 'Eighty francs was survival money for a month — and the lady \'never minds\' caviare.', goal: 'Analyse the retrospective frame and the escalating structure of Maugham\'s anecdote.' },
    discovery: {
        question: 'Ruined by a luncheon he couldn\'t refuse, the narrator ends with a joke: \'I\'ll eat nothing for dinner tonight.\' Is that growth?',
        options: ['No — it\'s performative deflection; twenty years later the telling itself is his cold revenge', 'Yes — humour shows he finally matured past the humiliation', 'Yes — he learned to say no to women', 'No — because he never paid the bill'],
        answer: 'No — it\'s performative deflection; twenty years later the telling itself is his cold revenge',
        hook: 'He still couldn\'t say no in the restaurant — the only \'revenge\' available was narrating her into twenty-one stone, two decades on.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory literary analysis skill that equips students to activate prior knowledge, research historical-authorial context, identify genre conventions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the twenty-years-later frame from the flashback, rank the escalating orders from salmon to peaches, and place the true climax at the bill.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re telling a friend about a disastrous date where you spent your entire month\'s allowance on someone else\'s meal—would you start with the bill.',
            decisions: [{ prompt: 'What is the narrative point of view in "The Luncheon," and what tense shift signals the transition from frame to flashback?', options: [
                { text: 'The story uses first-person retrospective narration', outcome: 'The story uses first-person retrospective narration. The frame (opening and closing) is in present.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often treat the luncheon as a simple chronological anecdote and miss that the *entire.', reveals: 'students-often-treat-the-luncheon' },
                { text: 'the climax is when he orders the mutton chop', outcome: 'Not quite — Students often treat the luncheon as a simple chronological anecdote and miss that the *entire.', reveals: 'students-often-treat-the-luncheon' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are a student in Delhi with ₹500 for the week, and a senior invites you to a five-star hotel where a single dish costs ₹400.',
            decisions: [{ prompt: 'What is the primary physical setting of the luncheon in the story?', options: [
                { text: 'The primary physical setting is Foyot\'s, an expensive restaurant in Paris frequented by', outcome: 'The primary physical setting is Foyot\'s, an expensive restaurant in Paris frequented by French.' },
                { text: 'the narrator\'s apartment', outcome: 'Not quite — Students often think setting is only the geographical location (Paris) and ignore the specific.', reveals: 'setting-is-only-the-geographical' },
                { text: 'a café', outcome: 'Not quite — Students often think setting is only the geographical location (Paris) and ignore the specific.', reveals: 'setting-is-only-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re at a restaurant with a friend who keeps ordering expensive dishes while claiming they "never eat much"—you\'d feel the same panic and dark humour.',
            decisions: [{ prompt: 'Identify the two main supporting characters in "The Luncheon" and state one key trait each displays through direct textual evidence.', options: [
                { text: 'The woman (lady friend) displays hypocrisy/gluttony masked as moderation—evidenced by her', outcome: 'The woman (lady friend) displays hypocrisy/gluttony masked as moderation—evidenced by her claim "I.' },
                { text: 'generous', outcome: 'Not quite — Students equate "supporting character" with "minor character" and assume limited dialogue = limited.', reveals: 'students-equate-supporting-character-with' },
                { text: 'helpful', outcome: 'Not quite — Students equate "supporting character" with "minor character" and assume limited dialogue = limited.', reveals: 'students-equate-supporting-character-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re telling a friend about a funny but awkward lunch date where someone pretends to diet while eating expensive food, leaving you broke.',
            decisions: [{ prompt: 'State the primary theme of "The Luncheon" in one complete thematic sentence (not a single word or phrase).', options: [
                { text: 'Correct answer: "The primary theme is the hypocrisy of performative self-denial masking', outcome: 'Correct answer: "The primary theme is the hypocrisy of performative self-denial masking gluttony.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students confuse "theme" with "topic" (e.g., "The theme is lunch/irony/money") or with "moral".', reveals: 'students-confuse-theme-with-topic' },
                { text: 'a fancy lunch', outcome: 'Not quite — Students confuse "theme" with "topic" (e.g., "The theme is lunch/irony/money") or with "moral".', reveals: 'students-confuse-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your finance-and-fiction workshop reads Maugham\'s \'The Luncheon\' — a poor young writer takes a flattering lady admirer to Foyot\'s in Paris, and she orders caviare, salmon and champagne \'just a little something\'. A member misses the stakes: \'It\'s a nice lunch; why does the narrator panic over a restaurant bill?\'',
            decisions: [{ prompt: 'What makes the meal an ordeal?', options: [
                { text: 'Purchasing power plus performance: 1920s Paris, eighty-odd francs is the narrator\'s entire month\'s survival budget, and Foyot\'s is a senators\' restaurant — every \'little thing\' she orders is a week\'s rent to him. His politeness trap — too proud to confess poverty — and her hypocrisy (\'I never eat more than one thing\') are the comedy; the economics make it an ordeal.', outcome: 'Context — the franc\'s real value and the social rule that a gentleman can\'t say \'I can\'t afford this\' — converts lunch into slow-motion financial ruin.' },
                { text: 'He\'s just stingy — the panic is a character flaw, not economics.', outcome: 'The numbers are explicit: the meal costs roughly his monthly means; it\'s arithmetic dread under a code of manners, not miserliness.', reveals: 'narrator-is-just-stingy' },
                { text: 'She\'s unaware — the lady doesn\'t know restaurants cost money, so it\'s accidental.', outcome: 'She knows exactly what she\'s doing: \'I never eat anything for luncheon\' while ordering the costliest items is performed innocence — the hypocrisy is the joke\'s point.', reveals: 'lady-is-innocent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Each dish she \'never minds\' is a step deeper into his panic — the menu is the rising action.',
            decisions: [{ prompt: 'What comes next? The Luncheon (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Luncheon (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory literary analysis.',
          hint: 'Review Class 10 "A Letter to God" irony analysis (c10_engl_cbse_01_007) and "The.',
          misconception: 'Students treat "Before You Read" as a skippable formality—glancing at the author blurb and vocabulary box—because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a preparatory literary analysis skill that',
                  options: ['"Before You Read: Context and Background" is a preparatory literary analysis skill that', 'Plot is the sequence of causally linked events that form the story\'s backbone, while', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves examining the narrator\'s personality'],
                  hint: 'Review Class 10 "A Letter to God" irony analysis (c10_engl_cbse_01_007) and "The Necklace" tragic.',
                  misconception: 'Students treat "Before You Read" as a skippable formality—glancing at the author blurb and vocabulary box—because they equate "context".' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the biography-setting-vocabulary-theory connection, assign this 3-step remediation: (1).', '(2) Convert eighty 1920s francs to modern purchasing power using historical inflation data—make the abstract concrete.', '(3) For each preview word, locate its exact sentence in the story and write one sentence explaining how that word.', 'Review only after all three steps are complete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Before You Read" as a skippable formality—glancing at the author blurb and vocabulary box—because they.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The \'Look for these expressions\' vocabulary box in the NCERT edition functions as a thematic roadmap, not just a glossary." Support your.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'difficult words'],
                  hint: 'Review Class 10 "A Letter to God" irony analysis (c10_engl_cbse_01_007) and "The Necklace" tragic.',
                  misconception: 'Students treat "Before You Read" as a skippable formality—glancing at the author blurb and vocabulary box—because they equate "context".' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the biography-setting-vocabulary-theory connection, assign this 3-step remediation: (1).', '(2) Convert eighty 1920s francs to modern purchasing power using historical inflation data—make the abstract concrete.', '(3) For each preview word, locate its exact sentence in the story and write one sentence explaining how that word.', 'Review only after all three steps are complete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_002', difficulty: 'standard',
          question: 'Plot is the sequence of causally linked events that form the story\'s backbone.',
          hint: 'Review "first-person narrative perspective" (c9_engl_ch1_7) and "plot mapping with.',
          misconception: 'Students often treat the luncheon as a simple chronological anecdote and miss that the *entire story* is a framed.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view in "The Luncheon," and what tense shift signals the transition from frame to flashback?', answer: 'The story uses first-person retrospective narration',
                  options: ['The story uses first-person retrospective narration', 'third-person omniscient', 'the climax is when he orders the mutton chop', 'the theme is don\'t lend money'],
                  hint: 'Review "first-person narrative perspective" (c9_engl_ch1_7) and "plot mapping with Freytag\'s.',
                  misconception: 'Students often treat the luncheon as a simple chronological anecdote and miss that the *entire story* is a framed flashback.' },
                { id: 'b', prompt: 'Map the luncheon scene (from entering Foyot\'s to paying the bill) onto Freytag\'s Pyramid, labeling each stage with the specific event that marks its transition.', answer: 'Exposition: narrator meets woman at Foyot\'s (financial constraint established)',
                  options: ['Exposition: narrator meets woman at Foyot\'s (financial constraint established)', 'the climax is when he orders the mutton chop', 'the theme is don\'t lend money'],
                  hint: 'Review "first-person narrative perspective" (c9_engl_ch1_7) and "plot mapping with Freytag\'s.',
                  misconception: 'Students often treat the luncheon as a simple chronological anecdote and miss that the *entire story* is a framed flashback.' }
          ],
            remediations: { 'students-often-treat-the-luncheon': { steps: ['Have the student physically draw two timelines: one for *story time* (1920s luncheon) and one for *discourse time*.', 'Colour-code the frame paragraphs (present tense) vs.', 'Ask: "If you cut the first and last paragraphs, what is lost?" Guide them to see the frame provides the ironic.', 'Re-map Freytag\'s Pyramid including the frame as exposition/resolution.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a story.',
          hint: 'Review the definitions of setting and atmosphere in c7_engl_ch04_005 and c8_engl_ch4_1.',
          misconception: 'Students often think setting is only the geographical location (Paris) and ignore the specific venue (Foyot\'s) and the.',
          parts: [
                { id: 'a', prompt: 'Explain how the description of the restaurant\'s prices creates atmosphere in the opening scene.', answer: 'The high prices establish an atmosphere of anxiety and foreboding',
                  options: ['The high prices establish an atmosphere of anxiety and foreboding', 'the prices are high'],
                  hint: 'Review the definitions of setting and atmosphere in c7_engl_ch04_005 and c8_engl_ch4_1.',
                  misconception: 'Students often think setting is only the geographical location (Paris) and ignore the specific venue (Foyot\'s) and the temporal setting.' },
                { id: 'b', prompt: 'Compare the atmosphere before the bill arrives with the atmosphere after the narrator pays. How does the shift reflect the story\'s structure?', answer: 'Before the bill, the atmosphere is tense and panic-stricken',
                  options: ['Before the bill, the atmosphere is tense and panic-stricken', 'describes only one atmosphere misses the structural analysis'],
                  hint: 'Review the definitions of setting and atmosphere in c7_engl_ch04_005 and c8_engl_ch4_1.',
                  misconception: 'Students often think setting is only the geographical location (Paris) and ignore the specific venue (Foyot\'s) and the temporal setting.' }
          ],
            remediations: { 'setting-is-only-the-geographical': { steps: ['If a student cannot separate setting from atmosphere, have them list all sensory details in the restaurant scene (sight.', 'Then ask: "Which details belong to the setting (objective facts) and which create the atmosphere (subjective mood)?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'If stuck, review the \'mutton chop\' and \'asparagus\' scenes in the text and practice the.',
          misconception: 'Students often confuse the narrator\'s politeness with weakness or passivity, labeling him a \'pushover\' who lets the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the narrator\'s personality',
                  options: ['Character analysis of the protagonist involves examining the narrator\'s personality', '"Before You Read: Context and Background" is a preparatory literary analysis skill that', 'Plot is the sequence of causally linked events that form the story\'s backbone, while', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, review the \'mutton chop\' and \'asparagus\' scenes in the text and practice the two-column.',
                  misconception: 'Students often confuse the narrator\'s politeness with weakness or passivity, labeling him a \'pushover\' who lets the woman exploit him.' }
          ],
            remediations: { 'students-often-confuse-the-narrator': { steps: ['Re-read the \'mutton chop\' scene: highlight every internal thought (in italics or brackets) versus spoken dialogue.', 'Make a two-column table: Column A = what he says/does; Column B = what he thinks/feels.', 'Identify three rows where Column B contradicts Column A — this proves he is performing politeness, not genuinely.', 'Write one paragraph explaining how this performance is a form of agency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_08_004) focusing on the.',
          misconception: 'Students equate "supporting character" with "minor character" and assume limited dialogue = limited analytical value.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters examines how secondary figures function as',
                  options: ['Character analysis of supporting characters examines how secondary figures function as', '"Before You Read: Context and Background" is a preparatory literary analysis skill that', 'Plot is the sequence of causally linked events that form the story\'s backbone, while', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_08_004) focusing on the narrator\'s.',
                  misconception: 'Students equate "supporting character" with "minor character" and assume limited dialogue = limited analytical value.' }
          ],
            remediations: { 'students-equate-supporting-character-with': { steps: ['Have the student highlight every line spoken by the woman in one colour, every narrator line in another.', 'Count words: she dominates.', 'Ask: "Whose eyes do we see through?" (Narrator\'s.) 3.', 'Explain: Supporting ≠ less speech; supporting = not the narrative consciousness.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck on "what is the theme?", return to the escalating courses: list each dish, what.',
          misconception: 'Students confuse "theme" with "topic" (e.g., "The theme is lunch/irony/money") or with "moral" (e.g., "The theme.',
          parts: [
                { id: 'a', prompt: 'Explain why the narrator\'s statement "I was too young to have learned to say no to a woman" is essential to establishing the primary theme, not just a plot.', answer: 'Correct answer: This line establishes the power dynamic (youth/inexperience vs',
                  options: ['Correct answer: This line establishes the power dynamic (youth/inexperience vs', 'he was polite'],
                  hint: 'If stuck on "what is the theme?", return to the escalating courses: list each dish, what she *said*.',
                  misconception: 'Students confuse "theme" with "topic" (e.g., "The theme is lunch/irony/money") or with "moral" (e.g., "The theme is don\'t be greedy").' }
          ],
            remediations: { 'students-confuse-theme-with-topic': { steps: ['If a student gives a topic/moral instead of a thematic statement: 1) Ask them to complete: "Maugham shows that when.', '3 things she *does* — the pattern reveals the theme.', '3) Ask: "Why does Maugham make the narrator funny instead of angry?" — the answer (comic distance enables thematic.', '4) Require them to rewrite their answer as a universal claim about human nature, not story-specific advice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
