import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch10_p2: SimDef = {
    id: 'v3_c12_eng_f_ch10_p2',
    title: 'An Elementary School Classroom in a Slum (Poem) · Part 2/3',
    subtitle: 'The map on the wall is the lie the classroom tells',
    classLevel: 12, subject: 'eng_f', topic: 'An Elementary School Classroom in a Slum (Poem) · Part 2/3',
    chapters: ['c12_eng_f_ch10'],
    nodeIds: ['c12_eng_f_cbse_10_007', 'c12_eng_f_cbse_10_008', 'c12_eng_f_cbse_10_009', 'c12_eng_f_cbse_10_010', 'c12_eng_f_cbse_10_011', 'c12_eng_f_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social critic', intro: 'A socialist poet who fought fascism walks into a slum school and sees the education system itself as the enemy.', goal: 'Read Spender\'s poem as a critique of systemic inequality, not a sentimental portrait of poverty.' },
    discovery: {
        question: 'Shakespeare\'s head and a world map hang on a slum classroom\'s wall — and Spender calls them \'wicked.\' Why would pictures of a bigger world be cruel?',
        options: ['They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education', 'They\'re just ugly pictures', 'Shakespeare is too hard for children', 'Maps are outdated'],
        answer: 'They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education',
        hook: 'This isn\'t a sad poem about poor kids — it\'s an indictment of a system that uses education to reinforce the class wall. \'History is theirs whose language is the sun\': control language and you control who gets written into history. Sentimental pity is the reading the poem rejects.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'An Elementary School Classroom in a Slum\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand inside that fog-dimmed classroom: weigh the rootless-weeds children against the civilised dome on the wall, then judge Spender\'s closing appeal to governor and inspector — real demand or rhetorical dare?',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'An Elementary School Classroom in a Slum\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a complementary idea that supports, extends, or complicates the', outcome: 'A secondary theme is a complementary idea that supports, extends, or complicates the primary theme.' },
                { text: 'minor themes', outcome: 'Not quite — Students often confuse "secondary themes" with "examples of the primary theme" — they list.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "examples of the primary theme" — they list.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'An Elementary School Classroom in a Slum\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the literal difference between an image and a metaphor in poetry? Give one example of each from the poem.', options: [
                { text: 'An image is a sensory description (e.g., "rootless weeds"', outcome: 'An image is a sensory description (e.g., "rootless weeds" — visual/tactile image of the children\'s.' },
                { text: 'rootless weeds', outcome: 'Not quite — Students routinely treat every comparison as a metaphor, missing that Spender\'s most powerful.', reveals: 'students-routinely-treat-every-comparison' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'An Elementary School Classroom in a Slum\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'List five key words from the poem that directly relate to the theme of poverty and neglect, and give their literal meanings.', options: [
                { text: 'Correct answers include: slag heap (waste mound from mining), catacombs (underground', outcome: 'Correct answers include: slag heap (waste mound from mining), catacombs (underground burial.' },
                { text: 'governor', outcome: 'Not quite — Students treat "vocabulary in context" as memorising dictionary definitions of difficult words.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'An Elementary School Classroom in a Slum\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical mood of the verbs in the opening stanza ("let\'s not speak," "let\'s stop," "not move") and state its primary.', options: [
                { text: 'The verbs are in the **imperative mood** (specifically, first-person plural imperative', outcome: 'The verbs are in the **imperative mood** (specifically, first-person plural imperative "let\'s".' },
                { text: 'subjunctive', outcome: 'Not quite — Students treat "grammar analysis" as **labeling parts of speech** (e.g., " \'still\' is.', reveals: 'students-treat-grammar-analysis-as' },
                { text: 'indicative', outcome: 'Not quite — Students treat "grammar analysis" as **labeling parts of speech** (e.g., " \'still\' is.', reveals: 'students-treat-grammar-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'An Elementary School Classroom in a Slum\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What number', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What number does the.' },
                { text: 'inferential questions are just harder', outcome: 'Not quite — Students believe inferential questions allow any personal opinion ("I think the poet feels sad").', reveals: 'inferential-questions-allow-any-personal' },
                { text: 'I think the poet feels sad', outcome: 'Not quite — Students believe inferential questions allow any personal opinion ("I think the poet feels sad").', reveals: 'inferential-questions-allow-any-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at a slum school, you propose bright wall maps and storybooks of green valleys \'to inspire them\'. Spender\'s poem would ask harder questions.',
            decisions: [{ prompt: 'Do the decorations fix anything?', options: [
                { text: 'Not by themselves — the poem calls the map \'wicked\' when it pictures a world the children can\'t reach; real help is systemic: nutrition, safe space, open pathways out of the slum.', outcome: 'Images of a world that excludes them only taunt; the poem demands changed conditions, not prettier walls.' },
                { text: 'Yes — showing them beautiful worlds is the first step out.', outcome: 'That\'s the poem\'s exact critique: windows that open onto unreachable worlds are cruelty, not education.', reveals: 'tokenism-as-reform' },
                { text: 'Neither — their fate is sealed by birth, so effort is wasted.', outcome: 'Spender writes against that determinism: the classroom fails them because society lets it, which is changeable.', reveals: 'poverty-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a classroom as a political argument — and hear the difference between sympathy and a demand to break the walls.',
            decisions: [{ prompt: 'What comes next? An Elementary School Classroom in a Slum (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — An Elementary School Classroom in a Slum (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes in \'An Elementary School Classroom in a Slum\' — the supporting.',
          hint: 'If stuck, revisit node c12_eng_f_cbse_10_006 and write the primary theme as a complete.',
          misconception: 'Students often confuse "secondary themes" with "examples of the primary theme" — they list instances of inequality.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "secondary theme" to a new context: In a hypothetical poem about a rural health clinic, the primary theme is "systemic healthcare.', answer: 'Secondary theme 1: "The stethoscope as a cold, foreign object"',
                  options: ['Secondary theme 1: "The stethoscope as a cold, foreign object"', 'poverty', 'sadness', 'secondary themes'],
                  hint: 'If stuck, revisit node c12_eng_f_cbse_10_006 and write the primary theme as a complete argument.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme" — they list instances of inequality (poor children, bad.' },
                { id: 'b', prompt: 'Analyze how the secondary theme of "physical and mental stunting" (evident in "rootless weeds," "twisted bones," "slag heap") interacts with the secondary.', answer: 'The stunting imagery establishes the *bodily* cost of poverty',
                  options: ['The stunting imagery establishes the *bodily* cost of poverty', 'secondary themes', 'examples of the primary theme'],
                  hint: 'If stuck, revisit node c12_eng_f_cbse_10_006 and write the primary theme as a complete argument.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme" — they list instances of inequality (poor children, bad.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes from primary theme illustrations: (1) Have them re-read node.', '(2) Use a two-column table: Column A = "Primary Theme Claim" (e.g., "Education system fails slum children"), Column.', '(3) Assign a re-diagnostic: "Explain why \'the map of the world\' is not just an example of inequality but a *thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "examples of the primary theme" — they list instances of inequality.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The final stanza\'s appeal to the \'governor, inspector, visitor\' to \'break O break open\' the windows shifts the poem from descriptive.', answer: 'Refute: The shift is not a weakness but a necessary thematic culmination',
                  options: ['Refute: The shift is not a weakness but a necessary thematic culmination', 'preachy', 'didactic', 'secondary themes'],
                  hint: 'If stuck, revisit node c12_eng_f_cbse_10_006 and write the primary theme as a complete argument.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme" — they list instances of inequality (poor children, bad.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes from primary theme illustrations: (1) Have them re-read node.', '(2) Use a two-column table: Column A = "Primary Theme Claim" (e.g., "Education system fails slum children"), Column.', '(3) Assign a re-diagnostic: "Explain why \'the map of the world\' is not just an example of inequality but a *thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_008', difficulty: 'standard',
          question: 'Imagery in \'An Elementary School Classroom in a Slum\' — the vivid, sensory.',
          hint: 'If the student cannot separate image from metaphor, return to c11_eng_h_cbse_10_008 and.',
          misconception: 'Students routinely treat every comparison as a metaphor, missing that Spender\'s most powerful metaphors are *extended*.',
          parts: [
                { id: 'a', prompt: 'What is the literal difference between an image and a metaphor in poetry? Give one example of each from the poem.', answer: 'An image is a sensory description (e.g., "rootless weeds"',
                  options: ['An image is a sensory description (e.g., "rootless weeds"', 'rootless weeds'],
                  hint: 'If the student cannot separate image from metaphor, return to c11_eng_h_cbse_10_008 and do the "X.',
                  misconception: 'Students routinely treat every comparison as a metaphor, missing that Spender\'s most powerful metaphors are *extended* (the map as awarder.' }
          ],
            remediations: { 'students-routinely-treat-every-comparison': { steps: ['Have the student re-read the poem with three coloured pencils: one for visual, one for tactile/kinesthetic, one for.', 'Ask them to physically act out "rootless weeds", "paper-seeming", "twisted bones" — feel the brittleness.', 'For metaphors, use the "X is Y" test: rewrite each comparison as "The window *is* a catacomb" and ask "What does the.', 'Re-attempt Diagnostic Questions 3 and 4 verbally before writing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_009', difficulty: 'standard',
          question: 'Irony and paradox in \'An Elementary School Classroom in a Slum\' — where.',
          hint: 'Review c12_eng_f_cbse_10_008 Worked Example 2 (metaphor analysis of "fog") and practice.',
          misconception: 'Students often confuse irony with coincidence or mere sadness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'An Elementary School Classroom in a Slum\'',
                  options: ['Irony and paradox in \'An Elementary School Classroom in a Slum\'', '\'An Elementary School Classroom in a Slum\' (Flamingo, ch', 'The plot/narrative arc of \'An Elementary School Classroom in a Slum\'', 'The setting of \'An Elementary School Classroom in a Slum\''],
                  hint: 'Review c12_eng_f_cbse_10_008 Worked Example 2 (metaphor analysis of "fog") and practice splitting 3.',
                  misconception: 'Students often confuse irony with coincidence or mere sadness.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor) to strengthen the concept of "vehicle and tenor" — symbolism.', 'Use a T-chart: Column A = literal object in poem (map, slag heap, catacombs, Shakespeare\'s head, sun); Column.', 'Re-read the poem aloud, pausing at each object to ask: "What is the *gap* between what this object promises and what.', 'Write one PEEL paragraph on the map as symbol, using the T-chart notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_010', difficulty: 'standard',
          question: 'Key vocabulary of \'An Elementary School Classroom in a Slum\' — the words and.',
          hint: 'Review the poem\'s imagery and symbolism in nodes c12_eng_f_cbse_10_008 and.',
          misconception: 'Students treat "vocabulary in context" as memorising dictionary definitions of difficult words.',
          parts: [
                { id: 'a', prompt: 'Compare the connotations of "governor," "inspector," and "visitor" in stanza 3. How does their grouping reflect the poet\'s attitude toward authority?', answer: 'These titles denote officials who hold power over the slum school',
                  options: ['These titles denote officials who hold power over the slum school', 'a governor administers a state', 'defines each title literally (e'],
                  hint: 'Review the poem\'s imagery and symbolism in nodes c12_eng_f_cbse_10_008 and c12_eng_f_cbse_10_009.',
                  misconception: 'Students treat "vocabulary in context" as memorising dictionary definitions of difficult words.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the poem and underline every word they cannot explain in context.', 'For each underlined word, write: (a) literal meaning, (b) the line it appears in, (c) the image or idea it connects.', 'Compare their notes with the glossary in the NCERT textbook ("Think it out" section).', 'Practice answering a 3-mark board-style question: "Analyse the use of the word \'slag heap\' in conveying the children\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_011', difficulty: 'standard',
          question: 'Language and style in \'An Elementary School Classroom in a Slum\' — how the.',
          hint: 'If stuck on mood identification, review c6_english_u4_038 (sentence types) and practice.',
          misconception: 'Students treat "grammar analysis" as **labeling parts of speech** (e.g., " \'still\' is an adjective," " \'twelve\' is.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the conditional structure in the lines "If we were not so single-minded / about keeping our lives moving, / and for once could.', answer: 'The conditional ("If we were not',
                  options: ['The conditional ("If we were not', 'future possibility', 'were not'],
                  hint: 'If stuck on mood identification, review c6_english_u4_038 (sentence types) and practice converting.',
                  misconception: 'Students treat "grammar analysis" as **labeling parts of speech** (e.g., " \'still\' is an adjective," " \'twelve\' is a numeral") rather than.' },
                { id: 'b', prompt: 'In the stanza beginning "Those who prepare green wars," the poet writes: "would put on clean clothes / and walk about with their / brothers / in the shade.', answer: 'Rewritten: "Those who prepare green wars',
                  options: ['Rewritten: "Those who prepare green wars', 'tense doesn\'t matter', 'it\'s just past tense'],
                  hint: 'If stuck on mood identification, review c6_english_u4_038 (sentence types) and practice converting.',
                  misconception: 'Students treat "grammar analysis" as **labeling parts of speech** (e.g., " \'still\' is an adjective," " \'twelve\' is a numeral") rather than.' }
          ],
            remediations: { 'students-treat-grammar-analysis-as': { steps: ['**Revisit mood identification**: Have the student convert each imperative in stanza 1 to indicative ("We do not speak").', '**Map conditionals physically**: Draw a two-column table: "If-clause (condition)" vs "Main clause (projected result)".', '**Negation hunt**: Give a fresh short text (e.g., a news headline) and ask the student to rewrite it using three.', '**Re-diagnostic**: Ask Diagnostic Question 2 again with a new conditional from an unseen poem.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension of \'An Elementary School Classroom in a Slum\' — questions.',
          hint: 'If stuck, re-read the NCERT "Think it out" questions and model answers in the textbook.',
          misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet feels sad") and treat literal.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "Fishermen in the cold sea would not harm whales" appears.', answer: 'This is an inferential response',
                  options: ['This is an inferential response', 'literal', 'would not', 'I think the poet feels sad'],
                  hint: 'If stuck, re-read the NCERT "Think it out" questions and model answers in the textbook — they are.',
                  misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet feels sad") and treat literal questions as trivial.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this question: "Which two groups of people are mentioned in the third stanza who prepare wars?" Identify the.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'politicians and soldiers', 'I think the poet feels sad', 'just copy the line'],
                  hint: 'If stuck, re-read the NCERT "Think it out" questions and model answers in the textbook — they are.',
                  misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet feels sad") and treat literal questions as trivial.' }
          ],
            remediations: { 'inferential-questions-allow-any-personal': { steps: ['Have the student re-read the poem and label each line as "explicit fact" (literal) or "implied idea" (inferential).', 'Practice with the NCERT "Think it out" questions: Q1 and Q4 are inferential; Q2 and Q3 are literal/inferential mixes.', 'For each, write a one-sentence answer followed by the exact line numbers that support it.', 'Re-diagnose using Diagnostic Questions 2 and 3 — if the student still mislabels, revisit c12_eng_f_cbse_10_008 (Imagery.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
