import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch24_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch24_p2: SimDef = {
    id: 'v3_c11_eng_w_ch24_p2',
    title: 'Science and the Sense of Wonder (Essay) · Part 2/3',
    subtitle: 'See why explained light is more wonderful, not less.',
    classLevel: 11, subject: 'eng_w', topic: 'Science and the Sense of Wonder (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch24'],
    nodeIds: ['c11_eng_w_cbse_24_007', 'c11_eng_w_cbse_24_008', 'c11_eng_w_cbse_24_009', 'c11_eng_w_cbse_24_010', 'c11_eng_w_cbse_24_011', 'c11_eng_w_cbse_24_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader defending wonder against the \'science kills magic\' charge', intro: 'A star is \'just\' a nuclear furnace millions of kilometres away — Asimov asks how that could possibly make it less wondrous.', goal: 'Evaluate Asimov\'s argument that scientific understanding deepens rather than exhausts wonder.' },
    discovery: {
        question: 'A friend says learning the optics of a rainbow \'kills the magic.\' What is Asimov\'s actual position?',
        options: ['Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition', 'Agreed — explanation drains mystery permanently', 'Wonder and knowledge are enemies that must be kept apart', 'Science explains everything, so wonder is finished'],
        answer: 'Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition',
        hook: 'Asimov\'s claim is the inverse of the cliché — each breakthrough opens vistas of wonder the uninformed can\'t even reach.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Tribal Verse\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_24_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test Asimov\'s thesis against the star and rainbow examples, then evaluate the claim that scientific literacy is a prerequisite for deep wonder.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Tribal Verse\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in literary analysis and list three secondary themes from Devy\'s "Tribal Verse" essay (excluding the primary theme.', options: [
                { text: 'A secondary theme is a recurring idea that supports, complicates, or runs parallel to the', outcome: 'A secondary theme is a recurring idea that supports, complicates, or runs parallel to the primary.' },
                { text: 'nature', outcome: 'Not quite — Students often treat "secondary themes" as just "other topics mentioned in the text" — e.g.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'rituals', outcome: 'Not quite — Students often treat "secondary themes" as just "other topics mentioned in the text" — e.g.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Tribal Verse\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor? Give one example of each from everyday language.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "Her smile is like sunshine"),', outcome: 'A simile compares two things using "like" or "as" (e.g., "Her smile is like sunshine"), while.' },
                { text: 'similes use \'like\', metaphors don\'t', outcome: 'Not quite — Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors").', reveals: 'students-often-treat-imagery-and' },
                { text: 'The cowshed was depleted', outcome: 'Not quite — Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors").', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Tribal Verse\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define verbal irony and give one example from everyday conversation (not from the essay).', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean, often for', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean, often for humorous.' },
                { text: 'just the author being sarcastic', outcome: 'Not quite — Students often think irony in non-fiction essays is "just the author being sarcastic" and miss that.', reveals: 'irony-in-non-fiction-essays' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Tribal Verse\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the meaning of \'marginalisation of communities\' as used in the introductory paragraph of the Tribal Verse chapter?', options: [
                { text: 'The phrase refers to the process by', outcome: 'The phrase refers to the process by which tribal communities are pushed to the edges of society.' },
                { text: '\'vocabulary in context\' means guessing a word\'s meaning from a single sentence', outcome: 'Not quite — Students often think \'vocabulary in context\' means guessing a word\'s meaning from a single.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Tribal Verse\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical term for words like "marginalisation," "urbanisation," and "conservation" formed from verbs by adding suffixes.', options: [
                { text: 'The term is **nominalization** (forming nouns from verbs/adjectives)', outcome: 'The term is **nominalization** (forming nouns from verbs/adjectives).' },
                { text: 'they are just difficult words', outcome: 'Not quite — Students often think "grammar analysis" means labeling every word with a part-of-speech tag (noun.', reveals: 'grammar-analysis-means-labeling-every' },
                { text: 'grammar analysis', outcome: 'Not quite — Students often think "grammar analysis" means labeling every word with a part-of-speech tag (noun.', reveals: 'grammar-analysis-means-labeling-every' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Tribal Verse\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the key difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (answer is directly', outcome: 'A literal question asks for information explicitly stated in the text (answer is directly.' },
                { text: 'literal questions are easy and inferential questions are hard', outcome: 'Not quite — Students often think inferential questions are "opinion questions" where any personal view.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students often think inferential questions are "opinion questions" where any personal view.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class must curate a \'Literature of India\' exhibition. A classmate vetoes the tribal songs section: \'The Munda and Kondh songs have no named poet and weren\'t even written down — they\'re folklore, not literature. The printed translations can\'t be the real thing.\'',
            decisions: [{ prompt: 'How do you argue for including them?', options: [
                { text: 'Make Devy\'s argument your own: orality isn\'t pre-literature, it\'s literature in its most resilient form — communities like the Munda, Kondh and Adi have carried songs for birth, death, healing and harvest for centuries without scripts. Tribal creativity works within strict conventions, \'adhering to the past while slightly subverting it.\' The veto itself is the print-culture bias the chapter exists to dismantle.', outcome: 'The section stays: the classmate\'s objection — no author, no fixed text — is precisely the assumption Devy exposes as bias.' },
                { text: 'Accept the veto — without a written original and a named poet, the songs are raw material, not literature.', outcome: 'That equates literature with print and authorship — the very bias that erased a massive share of Indian literature from syllabi.', reveals: 'oral-is-not-literature' },
                { text: 'Include them but label the display \'primitive folklore from India\'s tribal past\' to be accurate.', outcome: 'Framing them as a vanished past is doubly wrong: these are living cultures, and \'primitive\' repeats the hierarchy the essay argues against.', reveals: 'tribal-verse-is-primitive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_012', title: 'The bigger picture',
          caseStudy: { intro: 'Wonder isn\'t built on ignorance — \'isn\'t it pretty?\' is the shallow end; \'isn\'t it astonishing that...?\' is where science swims.',
            decisions: [{ prompt: 'What comes next? Science and the Sense of Wonder (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Science and the Sense of Wonder (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_007', difficulty: 'standard',
          question: 'Secondary themes in \'Tribal Verse\' — the supporting ideas and motifs that.',
          hint: 'If stuck, review c11_eng_w_cbse_24_006 (Primary Theme) and practice converting topics.',
          misconception: 'Students often treat "secondary themes" as just "other topics mentioned in the text" — e.g., listing "nature,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Tribal Verse\'',
                  options: ['Secondary themes in \'Tribal Verse\'', '\'Tribal Verse\' (Woven Words, ch', 'The plot/narrative arc of \'Tribal Verse\'', 'The setting of \'Tribal Verse\''],
                  hint: 'If stuck, review c11_eng_w_cbse_24_006 (Primary Theme) and practice converting topics like.',
                  misconception: 'Students often treat "secondary themes" as just "other topics mentioned in the text" — e.g., listing "nature," "rituals," "songs," "tribes".' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Give them the formula: "Theme = Topic + Author\'s Stance on Topic." (2).', '"Memory traps communities in the past").', '(3) Ask them to find one piece of evidence from Devy\'s essay for each statement.', '(4) Show that only the statement Devy actually supports is a theme; the other is a counter-theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_008', difficulty: 'standard',
          question: 'Imagery in \'Tribal Verse\' — the vivid, sensory language that creates.',
          hint: 'Review the "Metaphor and Symbolism" node from Class 10 (c10_engl_cbse_03_007) and the.',
          misconception: 'Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors") rather than.',
          parts: [
                { id: 'a', prompt: 'The Adi chant says: "I tie this Ridin creeper / To fasten your soul to your body." Identify the metaphor here.', answer: 'Metaphor: The Ridin creeper *is* a spiritual binding agent',
                  options: ['Metaphor: The Ridin creeper *is* a spiritual binding agent', 'fastening', 'symbolism'],
                  hint: 'Review the "Metaphor and Symbolism" node from Class 10 (c10_engl_cbse_03_007) and the "Poetic.',
                  misconception: 'Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors") rather than *interpretive keys*.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Have the student re-read *only* the Munda song and the Kondh song side-by-side.', 'Ask: "If you had to explain Munda gender values to an outsider using *only* the cowshed image, what would you say?".', 'For the Adi chant, give them the note about Miri Agom vs.', 'Ask: "Why would a community need a *separate language* for healing metaphors?" Guide them to see that metaphor here.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors") rather than.',
          parts: [
                { id: 'a', prompt: 'G.N. Devy writes: "In tribal stories, oceans fly in the sky as birds, mountains swim in the water as fish." Evaluate whether this description applies to the.', answer: 'Yes, the description applies',
                  options: ['Yes, the description applies', 'no, these are realistic songs'],
                  hint: 'Review the "Metaphor and Symbolism" node from Class 10 (c10_engl_cbse_03_007) and the "Poetic.',
                  misconception: 'Students often treat imagery and metaphor as *identification exercises* ("Find three metaphors") rather than *interpretive keys*.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Have the student re-read *only* the Munda song and the Kondh song side-by-side.', 'Ask: "If you had to explain Munda gender values to an outsider using *only* the cowshed image, what would you say?".', 'For the Adi chant, give them the note about Miri Agom vs.', 'Ask: "Why would a community need a *separate language* for healing metaphors?" Guide them to see that metaphor here.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Tribal Verse\' — where opposite things are both true,.',
          hint: 'Review c11_eng_w_cbse_24_008 for literal/figurative distinction and c10_engl_cbse_01_005.',
          misconception: 'Students often think irony in non-fiction essays is "just the author being sarcastic" and miss that structural irony.',
          parts: [
                { id: 'a', prompt: 'The essay uses the prism as a symbol. Explain what the prism literally does and what it symbolically represents in the author\'s argument.', answer: 'Literally, a prism refracts white light into its constituent colors',
                  options: ['Literally, a prism refracts white light into its constituent colors', 'just the author being sarcastic'],
                  hint: 'Review c11_eng_w_cbse_24_008 for literal/figurative distinction and c10_engl_cbse_01_005 for.',
                  misconception: 'Students often think irony in non-fiction essays is "just the author being sarcastic" and miss that structural irony (e.g., the essay\'s.' }
          ],
            remediations: { 'irony-in-non-fiction-essays': { steps: ['Have the student list 5 common beliefs about science (e.g., "science is cold," "science explains everything") and then.', 'Give them a 3-column table: Object | Literal Role in Essay | Abstract Idea It Could Represent.', 'Fill it for prism, night sky, equation, rainbow.', 'Ask: "Which two objects appear in both the first and last paragraph?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Tribal Verse\' — the words and phrases you must know to read.',
          hint: 'Review the \'context clue types\' (definition, synonym, antonym, example, general sense).',
          misconception: 'Students often think \'vocabulary in context\' means guessing a word\'s meaning from a single sentence.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of \'marginalisation of communities\' as used in the introductory paragraph of the Tribal Verse chapter?', answer: 'The phrase refers to the process by',
                  options: ['The phrase refers to the process by', '\'vocabulary in context\' means guessing a word\'s meaning from a single sentence'],
                  hint: 'Review the \'context clue types\' (definition, synonym, antonym, example, general sense) from Class.',
                  misconception: 'Students often think \'vocabulary in context\' means guessing a word\'s meaning from a single sentence.' },
                { id: 'b', prompt: 'The text states: \'A vast number of Indian languages have yet remained only spoken, with the result that literary compositions in these languages are not.', answer: '\'Canonized\' means officially recognized, accepted, or sanctioned as part of the',
                  options: ['\'Canonized\' means officially recognized, accepted, or sanctioned as part of the', '\'vocabulary in context\' means guessing a word\'s meaning from a single sentence'],
                  hint: 'Review the \'context clue types\' (definition, synonym, antonym, example, general sense) from Class.',
                  misconception: 'Students often think \'vocabulary in context\' means guessing a word\'s meaning from a single sentence.' },
                { id: 'c', prompt: 'Compare the use of \'repository\' in \'rich repository of folk songs\' and \'repository of folk songs that is an expression of the tribal vision of life\'.', answer: 'In the first, \'repository\' emphasizes abundance and storage (a treasure house)',
                  options: ['In the first, \'repository\' emphasizes abundance and storage (a treasure house)', '\'vocabulary in context\' means guessing a word\'s meaning from a single sentence'],
                  hint: 'Review the \'context clue types\' (definition, synonym, antonym, example, general sense) from Class.',
                  misconception: 'Students often think \'vocabulary in context\' means guessing a word\'s meaning from a single sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot trace a term\'s evolving meaning, guide them through a \'word map\' exercise: 1) Write the term in the.', '2) Draw arrows to each paragraph where it appears or is implied.', '3) Note the specific context each time (e.g., \'marginalisation of communities\' -> \'marginalisation of languages\' ->.', '4) Synthesize: \'The author uses marginalisation to show a cascading exclusion—first social, then linguistic, then.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_011', difficulty: 'standard',
          question: 'Language and style in \'Tribal Verse\' — how the writer chose words, sentences.',
          hint: 'Review "Sentence Structure: Simple, Compound, Complex" and "Active vs.',
          misconception: 'Students often think "grammar analysis" means labeling every word with a part-of-speech tag (noun, verb, adjective).',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for words like "marginalisation," "urbanisation," and "conservation" formed from verbs by adding suffixes, and state one effect.', answer: 'The term is **nominalization** (forming nouns from verbs/adjectives)',
                  options: ['The term is **nominalization** (forming nouns from verbs/adjectives)', 'they are just difficult words', 'grammar analysis'],
                  hint: 'Review "Sentence Structure: Simple, Compound, Complex" and "Active vs.',
                  misconception: 'Students often think "grammar analysis" means labeling every word with a part-of-speech tag (noun, verb, adjective).' }
          ],
            remediations: { 'grammar-analysis-means-labeling-every': { steps: ['**Re-teach the metalanguage**: Use a two-column table: "Form" (nominalization, passive, hypotaxis) vs.', '"Function in Academic Writing" (condensation, impersonality, logical subordination).', 'Give 2 examples from the essay for each.', '**Contrastive drill**: Take one essay sentence and one song line.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Tribal Verse\' — questions answered straight from the.',
          hint: 'If stuck, re-read the "Introduction" and "Notes on the Songs" sections, highlighting.',
          misconception: 'Students often think inferential questions are "opinion questions" where any personal view is acceptable.',
          parts: [
                { id: 'a', prompt: 'In the essay "Tribal Verse", Devy writes: "A vast number of Indian languages have yet remained only spoken, with the result that literary compositions in these.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'opinion questions'],
                  hint: 'If stuck, re-read the "Introduction" and "Notes on the Songs" sections, highlighting every claim.',
                  misconception: 'Students often think inferential questions are "opinion questions" where any personal view is acceptable.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer this inferential question based on the essay: "How does Devy suggest that tribal arts are dynamic rather than static?".', answer: 'Point: Devy argues tribal arts are dynamic',
                  options: ['Point: Devy argues tribal arts are dynamic', 'opinion questions'],
                  hint: 'If stuck, re-read the "Introduction" and "Notes on the Songs" sections, highlighting every claim.',
                  misconception: 'Students often think inferential questions are "opinion questions" where any personal view is acceptable.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['If a student treats inferential questions as opinion questions: 1) Show them a side-by-side comparison: a text-based.', '2) Give them a short paragraph and ask: "What does the author imply about X?" Have them highlight the exact words that.', '3) Practice the "Evidence → Inference" two-column note: left column = quoted phrases, right column = what it suggests.', '4) Insist that every inferential answer in practice must include at least one direct textual reference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
