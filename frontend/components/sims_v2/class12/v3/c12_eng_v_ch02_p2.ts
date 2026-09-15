import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch02_p2: SimDef = {
    id: 'v3_c12_eng_v_ch02_p2',
    title: 'The Tiger King · Part 2/3',
    subtitle: 'Ninety-nine tigers couldn\'t kill him — a wooden one did',
    classLevel: 12, subject: 'eng_v', topic: 'The Tiger King · Part 2/3',
    chapters: ['c12_eng_v_ch02'],
    nodeIds: ['c12_eng_v_cbse_02_007', 'c12_eng_v_cbse_02_008', 'c12_eng_v_cbse_02_009', 'c12_eng_v_cbse_02_010', 'c12_eng_v_cbse_02_011', 'c12_eng_v_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'A newborn growls \'Let tigers beware!\' A state reorganises itself around a prophecy. Satire at full pounce.', goal: 'Read The Tiger King as political satire on princely arrogance, colonial paramountcy and the delusion of mastering fate.' },
    discovery: {
        question: 'A Maharaja kills 99 real tigers to cheat a prophecy — and dies from a wooden toy tiger\'s splinter. Why does the smallest tiger win?',
        options: ['That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear', 'Luck — fate is random', 'The toy was actually alive', 'The astrologer lied'],
        answer: 'That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear',
        hook: 'The fable is double-barrelled satire: a prince who marries for tiger access mocks princely despotism, while a British officer\'s photo-op safaris skewer the Raj. The nonsense initials in his absurd title parody imperial honours — read the laughter as indictment.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, or messages that run alongside the primary theme in a literary work.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the hunt and the hubris: unpack the talking-infant prophecy, weigh paramountcy\'s leash on the Maharaja, and trace how a splinter completes what ninety-nine tigers couldn\'t.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re asked in a board exam: "The story is a satire on the conceit of those in power.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a short story and give one example from "The Tiger King" with a brief textual reference.', options: [
                { text: 'A secondary theme is a subordinate idea that supports or contrasts with the primary', outcome: 'A secondary theme is a subordinate idea that supports or contrasts with the primary theme, adding.' },
                { text: 'secondary themes', outcome: 'Not quite — Students often think "secondary themes" are just "subplots" or "minor events." They list the.', reveals: 'secondary-themes-are-just-subplots' },
                { text: 'subplots', outcome: 'Not quite — Students often think "secondary themes" are just "subplots" or "minor events." They list the.', reveals: 'secondary-themes-are-just-subplots' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a movie adaptation of "The Tiger King" — the director must decide how to *show* the Maharaja\'s obsession without a narrator explaining.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words. Give one example of each from "The Tiger King" without looking at the text.', options: [
                { text: '**Correct answer:** Imagery = language appealing to senses (e.g., "tiny slivers of wood', outcome: '**Correct answer:** Imagery = language appealing to senses (e.g., "tiny slivers of wood stood.' },
                { text: 'like a tiger', outcome: 'Not quite — Students often think **imagery = only visual description** and **metaphor = any comparison**.', reveals: 'imagery-only-visual-description-and' },
                { text: '**imagery = only visual description** and **metaphor = any comparison**', outcome: 'Not quite — Students often think **imagery = only visual description** and **metaphor = any comparison**.', reveals: 'imagery-only-visual-description-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the opening paragraph and hit the word "indomitable" describing the Tiger King\'s courage.',
            decisions: [{ prompt: 'Define "context clue" and name the four main types taught in Class 11-12 English.', options: [
                { text: 'A context clue is a hint within the surrounding text that helps deduce a word\'s meaning', outcome: 'A context clue is a hint within the surrounding text that helps deduce a word\'s meaning.' },
                { text: 'looking in a dictionary', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the blank.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the blank.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp forward that sounds formal but is actually mocking someone — you\'d notice the mismatch between the fancy words and the.',
            decisions: [{ prompt: 'Identify the narrative perspective used in "The Tiger King" and quote the first sentence that establishes it.', options: [
                { text: 'The story uses a first-person narrative perspective ("I have come forward to tell you why', outcome: 'The story uses a first-person narrative perspective ("I have come forward to tell you why he came.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech (nouns, verbs).', reveals: 'language-usage-means-only-identifying' },
                { text: 'language usage', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech (nouns, verbs).', reveals: 'language-usage-means-only-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE Board exam hall, staring at a 3-mark question: "Why did the Maharaja ban tiger hunting by anyone except himself?" Your heart.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is explicitly stated in the text (e.g., "How many tigers did', outcome: 'A literal question\'s answer is explicitly stated in the text (e.g., "How many tigers did the.' },
                { text: 'questions answered from the text', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds reasonable.', reveals: 'inferential-questions-allow-any-opinion' },
                { text: 'any opinion', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds reasonable.', reveals: 'inferential-questions-allow-any-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior\'s horoscope once \'warned\' he\'d fail at his hundredth venture, so he\'s obsessively raced through 99 small projects and is now engineering the hundredth to be bulletproof — while ignoring a trivial, silly flaw in it.',
            decisions: [{ prompt: 'What does \'The Tiger King\' suggest here?', options: [
                { text: 'Watch for the wooden tiger — the Maharaja survives 99 real tigers but is killed by a sliver from a toy; obsession with defeating a prophecy blinds you to the absurd, insignificant thing that actually fulfils it.', outcome: 'The story\'s situational irony is that the prophecy arrives disguised as a birthday gift; treating the threat as a tiger-shaped contest is exactly the blindness that gets the Maharaja.' },
                { text: 'Help him make project number hundred genuinely flawless so the prediction can\'t bite.', outcome: 'That\'s the Maharaja\'s own logic — hunting the 100th tiger harder; the dewan\'s planted, half-dead tiger already shows the real danger isn\'t the one you\'re staging.', reveals: 'perfect-the-hundredth' },
                { text: 'Tell him prophecies are nonsense, so project hundred carries no special risk at all.', outcome: 'The story doesn\'t disprove the prophecy — it fulfils it through the least respected object in the tale; dismissing the warning entirely misses that anxiety about the wrong target is itself the hazard.', reveals: 'prophecy-is-nonsense' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read absurdity as critique — Kalki\'s laughing fable about power, prophecy and the splinter that topples kings.',
            decisions: [{ prompt: 'What comes next? The Tiger King · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Tiger King · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, or messages that run.',
          hint: 'If stuck, re-read Section III (British officer) and Section V (wooden tiger) — these are.',
          misconception: 'Students often think "secondary themes" are just "subplots" or "minor events." They list the dewan\'s marriage joke.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, motifs, or messages that run alongside the',
                  options: ['Secondary themes are the underlying ideas, motifs, or messages that run alongside the', 'The "Before You Read: Context and Background" section for "The Tiger King" provides', 'Plot and narrative structure refer to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'If stuck, re-read Section III (British officer) and Section V (wooden tiger) — these are dense with.',
                  misconception: 'Students often think "secondary themes" are just "subplots" or "minor events." They list the dewan\'s marriage joke or the prince\'s birthday.' }
          ],
            remediations: { 'secondary-themes-are-just-subplots': { steps: ['If the student confuses events with themes: 1) Have them list 5 major events in the story.', '2) For each, ask: "What idea about society/human nature does this event *illustrate*?" 3) Group similar ideas into 3-4.', '4) Practice writing: "The event where X happens shows the theme of Y because..." Use node c12_eng_v_cbse_02_006.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary themes" are just "subplots" or "minor events." They list the dewan\'s marriage joke.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The dewan and the hunters are more responsible for the Maharaja\'s downfall than the astrologer\'s prophecy." Use evidence from the.', answer: 'The prophecy only predicted death by a tiger',
                  options: ['The prophecy only predicted death by a tiger', 'secondary themes', 'subplots', 'minor events'],
                  hint: 'If stuck, re-read Section III (British officer) and Section V (wooden tiger) — these are dense with.',
                  misconception: 'Students often think "secondary themes" are just "subplots" or "minor events." They list the dewan\'s marriage joke or the prince\'s birthday.' }
          ],
            remediations: { 'secondary-themes-are-just-subplots': { steps: ['If the student confuses events with themes: 1) Have them list 5 major events in the story.', '2) For each, ask: "What idea about society/human nature does this event *illustrate*?" 3) Group similar ideas into 3-4.', '4) Practice writing: "The event where X happens shows the theme of Y because..." Use node c12_eng_v_cbse_02_006.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review Class 6 node c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) for.',
          misconception: 'Students often think **imagery = only visual description** and **metaphor = any comparison**.',
          parts: [
                { id: 'a', prompt: 'Explain why the description "The tiger launched its satyagraha and refused to get out of the car" is a metaphor, not just a humorous sentence.', answer: '**Correct answer:** Tenor = the old tiger\'s stubborn refusal to move',
                  options: ['**Correct answer:** Tenor = the old tiger\'s stubborn refusal to move', 'it\'s a metaphor because the tiger didn\'t really do satyagraha', '**imagery = only visual description** and **metaphor = any comparison**'],
                  hint: 'If stuck, review Class 6 node c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) for basic.',
                  misconception: 'Students often think **imagery = only visual description** and **metaphor = any comparison**.' },
                { id: 'b', prompt: 'Compare the metaphor "The Tiger King" (title/identity) with the metaphor "The hundredth tiger took its final revenge" (closing line).', answer: '**Correct answer:** "The Tiger King" is an *identity metaphor*',
                  options: ['**Correct answer:** "The Tiger King" is an *identity metaphor*', 'just metaphors about tigers', '**imagery = only visual description** and **metaphor = any comparison**'],
                  hint: 'If stuck, review Class 6 node c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) for basic.',
                  misconception: 'Students often think **imagery = only visual description** and **metaphor = any comparison**.' }
          ],
            remediations: { 'imagery-only-visual-description-and': { steps: ['**Revisit sensory listing:** Take the wooden tiger scene (para 16-17).', 'Have the student close eyes and list *only* what they can see, hear, touch, smell, taste — no plot words.', '**Metaphor surgery:** Give the sentence "The hundredth tiger took its final revenge." Ask: "What is the tiger *really*?', 'What is \'revenge\' *really*?" Force separation of tenor/vehicle.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck on irony classification, return to c12_eng_v_cbse_02_008 and practice converting.',
          misconception: 'Students often conflate *coincidence* with *irony*. They write: "It is ironic that the king died from a wooden tiger.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between situational irony and verbal irony using two distinct examples from the story.', answer: 'Situational irony: outcome contradicts expectation',
                  options: ['Situational irony: outcome contradicts expectation', 'verbal irony', 'swaps the examples (e'],
                  hint: 'If stuck on irony classification, return to c12_eng_v_cbse_02_008 and practice converting 5.',
                  misconception: 'Students often conflate *coincidence* with *irony*. They write: "It is ironic that the king died from a wooden tiger because he killed real.' }
          ],
            remediations: { 'students-often-conflate-coincidence-with': { steps: ['Revisit c12_eng_v_cbse_02_002 (Plot) and map the Maharaja\'s *intent* vs. *outcome* at each hunt in a two-column table.', 'Re-read the wooden tiger scene (para 16-17) and annotate: what does the king *think* the toy represents?', 'Practice classifying 5 events from the story as verbal/situational/dramatic irony using the definition checklist: (a).', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the precise meaning.',
          hint: 'Review the "Context Clue Types" table in Class 11 Hornbill Chapter 1 vocabulary node.',
          misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the blank.',
          parts: [
                { id: 'a', prompt: 'The text says: "The tiger population became extinct in the forests of Pratibandapuram.', answer: 'Context clues: "extinct," "birth control," and the rhetorical question imply',
                  options: ['Context clues: "extinct," "birth control," and the rhetorical question imply', 'running away', 'vocabulary in context', '"vocabulary in context" means finding a synonym that fits the blank'],
                  hint: 'Review the "Context Clue Types" table in Class 11 Hornbill Chapter 1 vocabulary node.',
                  misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the blank. They ignore connotation, tone, and authorial purpose.' },
                { id: 'b', prompt: 'Compare the connotations of "vow" (Paragraph III) and "pledge" (not in text, but a synonym).', answer: '"Vow" carries solemn, almost religious weight, binding the speaker morally',
                  options: ['"Vow" carries solemn, almost religious weight, binding the speaker morally', 'vocabulary in context', '"vocabulary in context" means finding a synonym that fits the blank'],
                  hint: 'Review the "Context Clue Types" table in Class 11 Hornbill Chapter 1 vocabulary node.',
                  misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the blank. They ignore connotation, tone, and authorial purpose.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Re-read the three paragraphs containing the misdiagnosed word.', 'Use a three-column table: Word | Context Clues (quote phrases) | Inferred Meaning + Connotation.', 'Check dictionary; note differences.', 'Re-attempt Diagnostic Questions 2-4 focusing only on the missed words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_011', difficulty: 'standard',
          question: 'Language usage in a text refers to the specific grammatical structures.',
          hint: 'Review Class 11 Grammar node (c11_eng_h_cbse_01_011) on register analysis and syntactic.',
          misconception: 'Students often think "language usage" means only identifying parts of speech (nouns, verbs) or defining literary.',
          parts: [
                { id: 'a', prompt: 'Explain how the sentence structure in the opening paragraph — specifically the long list of titles separated by commas — contributes to the story\'s satirical.', answer: 'The cumulative sentence structure piles up grandiose titles ("His Highness',
                  options: ['The cumulative sentence structure piles up grandiose titles ("His Highness', 'it shows his greatness', 'language usage'],
                  hint: 'Review Class 11 Grammar node (c11_eng_h_cbse_01_011) on register analysis and syntactic patterning.',
                  misconception: 'Students often think "language usage" means only identifying parts of speech (nouns, verbs) or defining literary devices (metaphor, irony).' }
          ],
            remediations: { 'language-usage-means-only-identifying': { steps: ['If the student cannot connect grammar to meaning: (1) Have them read two paragraphs aloud — one from the coronation.', '(2) Give them a "translation" exercise: rewrite the Maharaja\'s "Let tigers beware!" in three registers (bureaucratic.', '(3) Revisit c11_eng_h_cbse_01_011 (Class 11 Grammar: Language Usage) for foundational register analysis practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to locate and retrieve.',
          hint: 'If stuck on inference, return to c12_eng_v_cbse_02_002 (Plot) and create a 10-event.',
          misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.',
          parts: [
                { id: 'a', prompt: 'In the story, the text states: "The Maharaja vowed he would attend to all other matters only after killing the hundred tigers." A student writes: "The Maharaja.', answer: 'This is an INVALID inferential answer',
                  options: ['This is an INVALID inferential answer', 'any opinion', 'inferential questions allow "any opinion" as long'],
                  hint: 'If stuck on inference, return to c12_eng_v_cbse_02_002 (Plot) and create a 10-event timeline — then.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.' }
          ],
            remediations: { 'inferential-questions-allow-any-opinion': { steps: ['If a student cannot distinguish literal from inferential, or produces unsupported inferences: (1) Have them re-read.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
