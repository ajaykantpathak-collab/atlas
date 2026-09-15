import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch09_p2: SimDef = {
    id: 'v3_c11_eng_w_ch09_p2',
    title: 'The Peacock (Poem) · Part 2/3',
    subtitle: 'Read a diaspora poem where distance is the subject, not the defect.',
    classLevel: 11, subject: 'eng_w', topic: 'The Peacock (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch09'],
    nodeIds: ['c11_eng_w_cbse_09_007', 'c11_eng_w_cbse_09_008', 'c11_eng_w_cbse_09_009', 'c11_eng_w_cbse_09_010', 'c11_eng_w_cbse_09_011', 'c11_eng_w_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader catching a blue shadow at the edge of a page', intro: 'A veranda, a book, a hush — the peacock is announced by everything except its own body.', goal: 'Evaluate diasporic perspective and read the poem\'s sensory progression as structure.' },
    discovery: {
        question: 'Sujata Bhatt writes India\'s national bird while living in Germany. A critic calls it \'a foreigner\'s exotic view — not an authentic Indian poem.\' Fair?',
        options: ['No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity', 'Yes — only residents can write national symbols authentically', 'Yes — her Gujarati is too rusty to claim the subject', 'No — because peacocks also exist in European zoos'],
        answer: 'No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity',
        hook: 'The poem doesn\'t pretend the peacock is in the room — it\'s a \'blue shadow\' falling on someone reading, glimpsed across a gap the poem refuses to hide.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement the primary theme by adding layers of meaning, exploring related concepts, or providing alternative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Order the sensory signals that announce the bird — shadow, wind, silenced bees, stretching cat — then judge whether free verse mimics its darting.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are sitting on a veranda with your favourite book, completely absorbed, when suddenly the world around you shifts — the wind turns, insects fall.',
            decisions: [{ prompt: 'List three specific sensory details from the poem that change when the peacock approaches, and state what each detail literally describes.', options: [
                { text: 'Correct answer: (1) "The wind will change direction"', outcome: 'Correct answer: (1) "The wind will change direction" — literal shift in air current; (2) "The.' },
                { text: 'patience reveals beauty', outcome: 'Not quite — Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas.', reveals: 'students-often-confuse-motifs-recurring' },
                { text: 'art frames nature', outcome: 'Not quite — Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas.', reveals: 'students-often-confuse-motifs-recurring' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re sitting on a veranda reading a book when suddenly the air goes quiet — bees stop humming, a cat stretches, a shadow crosses your page.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from daily life (not from the poem).', options: [
                { text: 'Imagery: Language that appeals to senses, e.g., "The aroma of frying onions made my', outcome: 'Imagery: Language that appeals to senses, e.g., "The aroma of frying onions made my stomach growl".' },
                { text: 'Imagery is just description', outcome: 'Not quite — Students often think "imagery" means only visual description and "metaphor" means any poetic.', reveals: 'imagery-means-only-visual-description' },
                { text: 'Metaphor uses like/as', outcome: 'Not quite — Students often think "imagery" means only visual description and "metaphor" means any poetic.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a nature article and encounter: "The bird\'s **iridescent** feathers flashed **emerald** and **azure**." You don\'t know \'iridescent\'.',
            decisions: [{ prompt: 'What does the word \'turquoise\' refer to in the line "Then, a flash of turquoise in the pipal tree"?', options: [
                { text: 'Correct answer: \'Turquoise\' refers to a bright blue-green colour, specifically describing', outcome: 'Correct answer: \'Turquoise\' refers to a bright blue-green colour, specifically describing the.' },
                { text: 'a type of bird', outcome: 'Not quite — Students often think \'turquoise\' is just a colour name without realising it specifically describes.', reveals: 'turquoise-is-just-a-colour' },
                { text: 'a sound', outcome: 'Not quite — Students often think \'turquoise\' is just a colour name without realising it specifically describes.', reveals: 'turquoise-is-just-a-colour' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are describing a lightning strike to a friend: you\'d use present tense ("It flashes!") to make it feel like it\'s happening *now*, not past tense.',
            decisions: [{ prompt: 'Identify the tense and mood of the verb phrase "have to sit" in the line "you have to sit in the veranda".', options: [
                { text: 'The verb phrase "have to sit" is in the present tense, semi-modal structure expressing', outcome: 'The verb phrase "have to sit" is in the present tense, semi-modal structure expressing external.' },
                { text: 'past tense', outcome: 'Not quite — Students treat grammar as a labeling exercise ("This is present tense", "This is a preposition").', reveals: 'students-treat-grammar-as-a' },
                { text: 'imperative mood', outcome: 'Not quite — Students treat grammar as a labeling exercise ("This is present tense", "This is a preposition").', reveals: 'students-treat-grammar-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in your veranda reading your favorite novel, just like the poem describes.',
            decisions: [{ prompt: 'Identify one literal detail from the poem about the peacock\'s physical appearance that is explicitly stated.', options: [
                { text: 'The poem explicitly states "a flash of turquoise" and "dark glowing eyes, violet fringed', outcome: 'The poem explicitly states "a flash of turquoise" and "dark glowing eyes, violet fringed with.' },
                { text: 'a flash of turquoise', outcome: 'Not quite — Students treat "inferential" as "guessing" — they offer personal opinions ("I think the peacock.', reveals: 'students-treat-inferential-as-guessing' },
                { text: 'dark glowing eyes, violet fringed with golden amber', outcome: 'Not quite — Students treat "inferential" as "guessing" — they offer personal opinions ("I think the peacock.', reveals: 'students-treat-inferential-as-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At the school\'s World Poetry Day you introduce Sujata Bhatt\'s \'The Peacock\'. A co-host announces: \'It\'s a nature poem about India\'s national bird — pretty description of feathers and colours, by an Indian poet.\'',
            decisions: [{ prompt: 'What\'s the crucial context that changes how you hear it?', options: [
                { text: 'The diasporic lens: Bhatt writes from Germany — distance turns the familiar bird into concentrated memory and identity. Every detail (the colour flaring, the sudden disappearance, the tail\'s closure) works as recall made visible; the peacock is a cultural signifier of a homeland seen from afar, not an ornithology sketch.', outcome: 'Same bird, different charge: for the diaspora poet the peacock condenses longing — reading it as plain description misses the poem\'s ache.' },
                { text: 'The intro is right — national bird, national pride; read it as celebration of Indian wildlife.', outcome: 'Celebration isn\'t the register: the poem is steeped in remembering and loss — the bird\'s vanishing enacts how the homeland survives in flashes of memory.', reveals: 'peacock-is-wildlife-celebration' },
                { text: 'It\'s a mythological poem — the peacock stands for the gods, so read it as religious verse.', outcome: 'Myth and art enrich the symbol but the poem\'s engine is diasporic memory — the bird as homeland made luminous and then gone.', reveals: 'peacock-is-only-mythology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'The poem\'s ragged lines move the way the bird does — appearing, vanishing, leaving only the very end of a tail.',
            decisions: [{ prompt: 'What comes next? The Peacock (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Peacock (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'Review node 006\'s worked examples on primary theme formulation; practice converting.',
          misconception: 'Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas like "patience.',
          parts: [
                { id: 'a', prompt: 'List three specific sensory details from the poem that change when the peacock approaches, and state what each detail literally describes.', answer: 'Correct answer: (1) "The wind will change direction"',
                  options: ['Correct answer: (1) "The wind will change direction"', 'patience reveals beauty', 'art frames nature'],
                  hint: 'Review node 006\'s worked examples on primary theme formulation; practice converting topics.',
                  misconception: 'Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas like "patience reveals beauty" or "art.' },
                { id: 'b', prompt: 'Apply the concept of "secondary theme" to the poem: choose ONE environmental cue (wind, bees, cat) and trace how it develops a theme *other than* the peacock\'s.', answer: 'Correct answer example for bees: Point',
                  options: ['Correct answer example for bees: Point', 'patience reveals beauty', 'art frames nature'],
                  hint: 'Review node 006\'s worked examples on primary theme formulation; practice converting topics.',
                  misconception: 'Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas like "patience reveals beauty" or "art.' }
          ],
            remediations: { 'students-often-confuse-motifs-recurring': { steps: ['If a student lists images instead of themes: (1) Have them write each image on a sticky note.', '(2) Ask: "What does this image *say* about life, perception, or art?" (3) Guide them to complete the sentence: "The.', 'Repeat for three images to yield three secondary themes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas like "patience.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s secondary theme of \'literature as preparation for nature\' is more important than its theme of \'the elusiveness of beauty\'.".', answer: 'Correct evaluation: Refute',
                  options: ['Correct evaluation: Refute', 'more important', 'patience reveals beauty', 'art frames nature'],
                  hint: 'Review node 006\'s worked examples on primary theme formulation; practice converting topics.',
                  misconception: 'Students often confuse *motifs* (recurring images like colours, eyes, books) with *themes* (ideas like "patience reveals beauty" or "art.' }
          ],
            remediations: { 'students-often-confuse-motifs-recurring': { steps: ['If a student lists images instead of themes: (1) Have them write each image on a sticky note.', '(2) Ask: "What does this image *say* about life, perception, or art?" (3) Guide them to complete the sentence: "The.', 'Repeat for three images to yield three secondary themes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) from.',
          misconception: 'Students often think "imagery" means only visual description and "metaphor" means any poetic comparison.',
          parts: [
                { id: 'a', prompt: 'In the poem, the speaker says "A blue shadow will fall over you." Is this imagery, metaphor, or both? Explain your reasoning.', answer: 'Both',
                  options: ['Both', 'only imagery', 'only metaphor', 'imagery'],
                  hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) from c7_engl_ch01_015 and.',
                  misconception: 'Students often think "imagery" means only visual description and "metaphor" means any poetic comparison.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Have the student close eyes and listen to a 30-second audio of a garden; list every sense triggered.', 'Give two sentences: "The exam was a nightmare" vs "The exam was like a nightmare"; ask which is metaphor and why.', 'Return to the poem: circle every sensory word, then draw arrows from each metaphor\'s vehicle to tenor.', 'Ask: "If we replaced \'blue shadow\' with \'the peacock appeared,\' what is lost?" Forces attention to function over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'Review the irony in "The Necklace" (c10_engl_cbse_16_008) and the symbolism of the cherry.',
          misconception: 'Students often confuse the peacock\'s "eyes" on its tail as literal eyes and miss the symbolic paradox.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'In poetry, narrative structure refers to the organized sequence of events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'Review the irony in "The Necklace" (c10_engl_cbse_16_008) and the symbolism of the cherry tree.',
                  misconception: 'Students often confuse the peacock\'s "eyes" on its tail as literal eyes and miss the symbolic paradox.' }
          ],
            remediations: { 'students-often-confuse-the-peacock': { steps: ['Ask the student to list the literal events in the poem (speaker sits, reads, peacock appears).', 'For each event, ask "What is the opposite of what you\'d expect?" to surface irony.', 'For each striking image (blue shadow, tail eyes, changed wind), ask "What could this stand for beyond itself?".', 'Have them write one PEEL paragraph on one device, using the template: Point (device), Evidence (lines), Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'Review context-clue strategies from Class 10 (c10_engl_cbse_02_009) and re-read the poem.',
          misconception: 'Students often think \'turquoise\' is just a colour name without realising it specifically describes the blue-green flash.',
          parts: [
                { id: 'a', prompt: 'Using context clues from the poem, determine the meaning of \'fringed\' in "Violet fringed with golden amber."', answer: 'Correct answer: \'Fringed\' means edged or bordered with a decorative trim',
                  options: ['Correct answer: \'Fringed\' means edged or bordered with a decorative trim', 'coloured'],
                  hint: 'Review context-clue strategies from Class 10 (c10_engl_cbse_02_009) and re-read the poem summary.',
                  misconception: 'Students often think \'turquoise\' is just a colour name without realising it specifically describes the blue-green flash of the peacock\'s.' }
          ],
            remediations: { 'turquoise-is-just-a-colour': { steps: ['Re-read the exact lines containing the target word.', 'Identify the word\'s part of speech (noun, verb, adjective).', 'Circle the words immediately before and after it – these are your primary clues.', 'Substitute a simple synonym (e.g., \'blue-green\' for \'turquoise\', \'shoots\' for \'darts\') and check if the sentence still.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the analysis of how specific.',
          hint: 'Review Class 10 grammar workbook exercises on conditional sentences (Type 0, 1) and.',
          misconception: 'Students treat grammar as a labeling exercise ("This is present tense", "This is a preposition") and stop there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the analysis of how specific grammatical',
                  options: ['Grammar: Language Usage in the Text refers to the analysis of how specific grammatical', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'In poetry, narrative structure refers to the organized sequence of events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'Review Class 10 grammar workbook exercises on conditional sentences (Type 0, 1) and article usage.',
                  misconception: 'Students treat grammar as a labeling exercise ("This is present tense", "This is a preposition") and stop there.' }
          ],
            remediations: { 'students-treat-grammar-as-a': { steps: ['Give the student a "grammar swap" exercise: rewrite stanza 2 entirely in past tense ("You had to sit...', 'Ask: "Does the peacock feel more or less alive?', 'Guide them to notice past tense makes it a memory; present/conditional makes it a repeatable recipe.', 'Have them annotate the original with "FUNCTION" arrows: e.g., "present simple → immediate sensory evidence".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'Review c11_eng_w_cbse_09_008 (Imagery and Metaphor) to recognize how figurative language.',
          misconception: 'Students treat "inferential" as "guessing" — they offer personal opinions ("I think the peacock is shy") without.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what the phrase "the moment you begin to live inside the book" suggests about the reader\'s state of mind.', answer: 'It suggests deep absorption and loss of self-consciousness',
                  options: ['It suggests deep absorption and loss of self-consciousness', 'the person starts reading', 'live inside', 'His loud sharp call / seems to come from nowhere'],
                  hint: 'Review c11_eng_w_cbse_09_008 (Imagery and Metaphor) to recognize how figurative language creates.',
                  misconception: 'Students treat "inferential" as "guessing" — they offer personal opinions ("I think the peacock is shy") without anchoring in textual cues.' }
          ],
            remediations: { 'students-treat-inferential-as-guessing': { steps: ['Have student highlight every explicit fact in the poem in one colour (literal).', 'In another colour, mark every clause starting with "seems," "might," "if you look up in time" — these signal inference.', 'Practice converting each literal fact into an inferential question: "The bees stop humming" → "What does the silence.', 'Require written answers to follow: "The text says ____, which suggests ____ because ____."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
