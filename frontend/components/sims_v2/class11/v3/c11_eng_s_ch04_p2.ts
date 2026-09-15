import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch04_p2: SimDef = {
    id: 'v3_c11_eng_s_ch04_p2',
    title: 'Birth · Part 2/3',
    subtitle: 'Find why the story\'s climax is a gasp, not a birth.',
    classLevel: 11, subject: 'eng_s', topic: 'Birth · Part 2/3',
    chapters: ['c11_eng_s_ch04'],
    nodeIds: ['c11_eng_s_cbse_04_007', 'c11_eng_s_cbse_04_008', 'c11_eng_s_cbse_04_009', 'c11_eng_s_cbse_04_010', 'c11_eng_s_cbse_04_011', 'c11_eng_s_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young doctor fighting a stillborn case at midnight', intro: 'A miner\'s cottage, no equipment, a stillborn child and a fading mother — and a doctor who arrived doubting his own profession.', goal: 'Place the true climax and explain why the resolution follows Andrew\'s arc, not the Morgans\'.' },
    discovery: {
        question: 'The baby is delivered at last — and lies lifeless. Many readers call the birth the climax. Where does the true turning point fall?',
        options: ['The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs', 'The delivery — biggest event equals climax', 'The injection that saves the mother', 'Walking home at dawn — the quiet ending resolves everything'],
        answer: 'The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs',
        hook: 'The delivery creates a crisis instead of ending one — climax is the turn, not the title event.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas that run parallel to the primary theme, enriching the narrative by exploring complementary human experiences, conflicts, or social realities.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map injection, resuscitation, first cry and the dawn walk onto the arc, and defend an ending that skips the mother\'s recovery.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a medical drama where the doctor saves a patient, but the camera keeps cutting to the doctor\'s trembling hands, the anxious family.',
            decisions: [{ prompt: 'Identify ONE secondary theme in "Birth" and quote a single line from the text that signals its presence.', options: [
                { text: 'One secondary theme is the conflict between textbook medicine and practical experience', outcome: 'One secondary theme is the conflict between textbook medicine and practical experience.' },
                { text: 'A wrong answer would name a literary device (e.g', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and therefore treat it.', reveals: 'secondary-theme-means-less-important' },
                { text: ') or a plot event (e.g', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and therefore treat it.', reveals: 'secondary-theme-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are Andrew Manson, exhausted after a long night, watching a lifeless baby and a collapsing mother — you feel total defeat.',
            decisions: [{ prompt: 'Define situational irony and give one example from "Birth" where the outcome of the night call is the opposite of what Andrew anticipated.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is starkly different from', outcome: 'Situational irony occurs when the actual outcome of a situation is starkly different from what was.' },
                { text: 'he had no premonition that this night call would prove unusual', outcome: 'Not quite — Students often confuse *symbolism* with *imagery*, thinking any vivid description (e.g., "the child.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'done something real at last', outcome: 'Not quite — Students often confuse *symbolism* with *imagery*, thinking any vivid description (e.g., "the child.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re watching a medical drama and hear "The patient is tachycardic and hypotensive" — you don\'t know the words, but the beeping monitors and the.',
            decisions: [{ prompt: 'Identify the part of speech and write a one-sentence dictionary-style definition for "premonition" as used in: "He had no premonition that.', options: [
                { text: 'Premonition (noun): a strong feeling that something is about to happen, especially', outcome: 'Premonition (noun): a strong feeling that something is about to happen, especially something.' },
                { text: 'a memory of the past', outcome: 'Not quite — Students believe "context clues" means only looking for a nearby synonym or definition.', reveals: 'context-clues-means-only-looking' },
                { text: 'and the context', outcome: 'Not quite — Students believe "context clues" means only looking for a nearby synonym or definition.', reveals: 'context-clues-means-only-looking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are a doctor reading a case notes vs. a novelist writing a scene: the case notes use passive voice ("The patient was administered...") for.',
            decisions: [{ prompt: 'Identify the tense and voice of the verb phrase "had been placed" in the sentence: "She had placed it beneath the bed." (Note: The text.', options: [
                { text: 'Correct: Past perfect passive', outcome: 'Correct: Past perfect passive. The structure is \'had been\' + past participle.' },
                { text: 'past perfect active', outcome: 'Not quite — Students believe "passive voice = weak writing" and "active voice = strong writing" as absolute.', reveals: 'passive-voice-weak-writing-and' },
                { text: 'past simple passive', outcome: 'Not quite — Students believe "passive voice = weak writing" and "active voice = strong writing" as absolute.', reveals: 'passive-voice-weak-writing-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are watching a medical drama where a doctor saves a newborn.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is directly stated in the text (e.g., "What did the old woman', outcome: 'A literal question\'s answer is directly stated in the text (e.g., "What did the old woman offer.' },
                { text: 'inferential questions are just harder', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal guess.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature-and-society seminar you\'re asked to modernise \'Birth\' — a young doctor resuscitating a stillborn baby in a 1920s Welsh mining cottage — \'just change the date to 2025, keep everything else identical\'. A classmate agrees: \'A birth is a birth; the decade doesn\'t change the drama.\'',
            decisions: [{ prompt: 'Would transplanting the story unchanged work?', options: [
                { text: 'No — the drama is built from 1920s Welsh mining conditions: no NHS, a doctor\'s fee a miner must weigh, no antibiotics, chloroform risks, the midwife\'s authority, a family that has already buried children. Cronin was himself a doctor writing from that world; move the date and every pressure that drives the scene evaporates.', outcome: 'Context is the living environment shaping each choice — poverty dictates the medical stakes; \'a birth is a birth\' erases why this one was a miracle.' },
                { text: 'The classmate is right — medical drama is timeless; resuscitation tension needs no period.', outcome: 'The tension came from scarcity — waiting on a \'company doctor\', paying for a midwife, working without modern equipment; 2025 changes all of it.', reveals: 'medical-drama-is-timeless' },
                { text: 'Context just means knowing Cronin was a doctor — the mining-town poverty is set dressing.', outcome: 'Biography alone explains authenticity, not stakes; the miner\'s wages, the absent safety net and infant mortality are what make the all-night fight to save the baby urgent.', reveals: 'context-is-author-bio-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Andrew walks home having \'done something real at last\' — the arc belonged to the doctor, not the delivery.',
            decisions: [{ prompt: 'What comes next? Birth · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Birth · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas that run parallel to the primary.',
          hint: 'Review c11_eng_s_cbse_04_006 (Primary Theme) and c9_engl_ch1_004/005 (Theme tracing.',
          misconception: 'Students often think "secondary theme" means "less important theme" and therefore treat it as optional or minor.',
          parts: [
                { id: 'a', prompt: 'Analyze how the secondary theme of "professional isolation versus communal belonging" structures the story\'s beginning and ending.', answer: 'Beginning: Andrew walks alone in "cool and deep" night air, "dull and listless,"',
                  options: ['Beginning: Andrew walks alone in "cool and deep" night air, "dull and listless,"', 'secondary theme', 'less important theme'],
                  hint: 'Review c11_eng_s_cbse_04_006 (Primary Theme) and c9_engl_ch1_004/005 (Theme tracing in Class 9).',
                  misconception: 'Students often think "secondary theme" means "less important theme" and therefore treat it as optional or minor.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student conflates secondary themes with plot points or literary devices: 1) Give them a two-column table: Column.', '2) Have them fill Column A with 5 events (e.g., "Andrew recalls Bramwell\'s marriage").', '3) Guide them to Column B by asking "What human experience does this event *represent*?" (e.g., "Disillusionment with.', '4) Show how multiple Column A events map to the same Column B entry — that recurrence *is* the theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "less important theme" and therefore treat it as optional or minor.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of \'textbook versus experience\' is resolved when Andrew succeeds; therefore, the story privileges practical wisdom.', answer: 'The claim is partially valid but reductive',
                  options: ['The claim is partially valid but reductive', 'yes, experience wins', 'no, he used the textbook', 'secondary theme'],
                  hint: 'Review c11_eng_s_cbse_04_006 (Primary Theme) and c9_engl_ch1_004/005 (Theme tracing in Class 9).',
                  misconception: 'Students often think "secondary theme" means "less important theme" and therefore treat it as optional or minor.' },
                { id: 'b', prompt: 'Create a 4-line poetic fragment from the perspective of the midwife that captures the secondary theme of "despair transformed by witnessed miracle."', answer: 'I laid the limp form down, certain death had won, "For mercy\'s sake, Doctor," I',
                  options: ['I laid the limp form down, certain death had won, "For mercy\'s sake, Doctor," I', 'secondary theme', 'less important theme'],
                  hint: 'Review c11_eng_s_cbse_04_006 (Primary Theme) and c9_engl_ch1_004/005 (Theme tracing in Class 9).',
                  misconception: 'Students often think "secondary theme" means "less important theme" and therefore treat it as optional or minor.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student conflates secondary themes with plot points or literary devices: 1) Give them a two-column table: Column.', '2) Have them fill Column A with 5 events (e.g., "Andrew recalls Bramwell\'s marriage").', '3) Guide them to Column B by asking "What human experience does this event *represent*?" (e.g., "Disillusionment with.', '4) Show how multiple Column A events map to the same Column B entry — that recurrence *is* the theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review c6_english_u1_005 (Poetic Devices: Metaphor and Imagery) for the.',
          misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "decoration," missing that in senior secondary.',
          parts: [
                { id: 'a', prompt: 'Locate the metaphor "His thoughts were heavy, muddled" in the text.', answer: 'Source domain: physical substances (weight, viscosity/turbidity)',
                  options: ['Source domain: physical substances (weight, viscosity/turbidity)', 'muddled'],
                  hint: 'If stuck, review c6_english_u1_005 (Poetic Devices: Metaphor and Imagery) for the foundational.',
                  misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "decoration," missing that in senior secondary texts these devices.' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Have the student reread the resuscitation scene (from "An hour elapsed" to "the child\'s cry") with a highlighter.', 'Ask: "Which sense does each marked word trigger?', 'What does that sensation *make you feel* as a reader?" 3.', 'Then reread for comparisons: "Find every \'like,\' \'as,\' or direct equation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'Review the "metaphor vs. symbol" distinction in c11_eng_s_cbse_04_008 worked examples.',
          misconception: 'Students often confuse *symbolism* with *imagery*, thinking any vivid description (e.g., "the child was white and soft.',
          parts: [
                { id: 'a', prompt: 'Identify the type of irony present when the old grandmother says, "Susan said not to give her the chloroform if it would harm the baby.', answer: 'This is dramatic irony',
                  options: ['This is dramatic irony', 'the child was white and soft as tallow'],
                  hint: 'Review the "metaphor vs. symbol" distinction in c11_eng_s_cbse_04_008 worked examples; practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery*, thinking any vivid description (e.g., "the child was white and soft as tallow") is.' },
                { id: 'b', prompt: 'Compare the symbolic function of the "oil lamp" in the bedroom at the start of the delivery with the "dawn" that appears when the child is born.', answer: 'The oil lamp represents the dim, confined, anxious atmosphere of the old order',
                  options: ['The oil lamp represents the dim, confined, anxious atmosphere of the old order', 'the child was white and soft as tallow'],
                  hint: 'Review the "metaphor vs. symbol" distinction in c11_eng_s_cbse_04_008 worked examples; practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery*, thinking any vivid description (e.g., "the child was white and soft as tallow") is.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Re-read the delivery scene (from "An hour elapsed..." to "It\'s come alive") and annotate every concrete noun.', 'For each, ask: "Does this represent an idea beyond itself?" — if yes, it\'s a symbol.', 'List Andrew\'s expectations before entering the house vs.', 'Identify where the text shows a character knowing less than the reader (dramatic irony) or where outcome contradicts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the precise meaning.',
          hint: 'Review "Parts of Speech Identification in Complex Sentences" (Class 9/10 grammar) — focus.',
          misconception: 'Students believe "context clues" means only looking for a nearby synonym or definition.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context is the skill of determining the precise meaning, connotation, and',
                  options: ['Vocabulary in context is the skill of determining the precise meaning, connotation, and', 'Context and background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review "Parts of Speech Identification in Complex Sentences" (Class 9/10 grammar) — focus.',
                  misconception: 'Students believe "context clues" means only looking for a nearby synonym or definition.' }
          ],
            remediations: { 'context-clues-means-only-looking': { steps: ['Have the student reread the paragraph containing the target word aloud, emphasizing tone.', 'Ask: "What is the character feeling/doing right here?" 3.', 'Guide them to classify the clue: definition (apposition), synonym (or/that is), antonym (but/however), example.', 'Practice with two more words using this checklist until they self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the analytical study of how grammatical.',
          hint: 'Review Class 10 reported speech backshifting rules (c10_engl_cbse_04_007) and the tense.',
          misconception: 'Students believe "passive voice = weak writing" and "active voice = strong writing" as absolute rules.',
          parts: [
                { id: 'a', prompt: 'Identify the tense and voice of the verb phrase "had been placed" in the sentence: "She had placed it beneath the bed." (Note: The text actually reads "She had.', answer: 'Correct: Past perfect passive',
                  options: ['Correct: Past perfect passive', 'past perfect active', 'past simple passive', 'passive voice = weak writing'],
                  hint: 'Review Class 10 reported speech backshifting rules (c10_engl_cbse_04_007) and the tense timeline.',
                  misconception: 'Students believe "passive voice = weak writing" and "active voice = strong writing" as absolute rules.' }
          ],
            remediations: { 'passive-voice-weak-writing-and': { steps: ['Give the student two columns: "Clinical Report" vs.', '"Dramatic Scene." Ask them to convert "Andrew injected the medicine" (active) to "The medicine was injected" (passive).', 'Provide three sentences from the text with the agent restored (e.g., "The nurse heard the voice" vs "The voice was.', 'Have them read aloud and judge which builds more tension.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review c11_eng_s_cbse_04_002 (Plot and Narrative Structure) to refresh event.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require answers directly stated in the text, while',
                  options: ['Literal comprehension questions require answers directly stated in the text, while', 'Context and background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review c11_eng_s_cbse_04_002 (Plot and Narrative Structure) to refresh event sequence.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Have the student highlight every factual detail in the text that relates to the question (e.g., all descriptions.', 'Ask them to write a one-sentence inference for each highlighted detail.', 'Show how to combine two inferences into a coherent answer using the phrase "This suggests that..." 4.', 'Practice with a new inferential question, requiring the student to cite at least two highlighted details.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
