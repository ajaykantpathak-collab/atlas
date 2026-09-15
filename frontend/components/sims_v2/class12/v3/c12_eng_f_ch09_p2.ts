import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch09_p2: SimDef = {
    id: 'v3_c12_eng_f_ch09_p2',
    title: 'My Mother at Sixty-six (Poem) · Part 2/3',
    subtitle: 'A mother dozes, the trees sprint — and the daughter looks away',
    classLevel: 12, subject: 'eng_f', topic: 'My Mother at Sixty-six (Poem) · Part 2/3',
    chapters: ['c12_eng_f_ch09'],
    nodeIds: ['c12_eng_f_cbse_09_007', 'c12_eng_f_cbse_09_008', 'c12_eng_f_cbse_09_009', 'c12_eng_f_cbse_09_010', 'c12_eng_f_cbse_09_011', 'c12_eng_f_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry reader', intro: 'One airport drive holds every goodbye you\'ve ever feared. Kamala Das wrote it down so we could recognise it.', goal: 'Read My Mother at Sixty-six as confessional poetry where suppressed fear of loss erupts through imagery and irony.' },
    discovery: {
        question: 'Outside the car window: sprinting trees, spilling children. Beside the poet: a mother \'ashen like a corpse.\' Why does Kamala Das put motion next to stillness?',
        options: ['Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief', 'Just scenery — poems need images', 'The children are her siblings', 'Traffic was simply heavy that day'],
        answer: 'Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief',
        hook: 'The poem\'s engine isn\'t the airport drive — it\'s the thought she \'put away.\' Confessional poetry runs on suppression and eruption: the old familiar ache, the smile that says \'see you soon\' while fearing otherwise. Kerala\'s matrilineal bond is the cultural weight under every line.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, complementary ideas in a literary work that support and enrich the primary theme, often revealing deeper layers of human experience such as the passage of time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Ride that Friday-morning drive inside the poem: track the ashen face, the sprinting trees, the put-away thought, and the final smiling goodbye that costs the daughter everything.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are sitting beside an elderly parent at a railway station, watching the world rush by while time seems to slow down for them — this poem captures.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in poetry, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding depth and.' },
                { text: 'less important themes', outcome: 'Not quite — Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'Secondary themes are trees, children, and moon', outcome: 'Not quite — Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a car watching your grandmother doze off beside you — her skin paper-thin, colour drained, mouth slightly open.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from everyday language (not from the poem).', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "The kitchen smelled of frying cumin and', outcome: 'Imagery: Language appealing to senses (e.g., "The kitchen smelled of frying cumin and onions".' },
                { text: 'her face *looked like* a corpse', outcome: 'Not quite — Students believe "imagery" means only visual description (pictures in the mind) and that any.', reveals: 'imagery-means-only-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students believe "imagery" means only visual description (pictures in the mind) and that any.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are at a railway station saying goodbye to a grandparent; you smile and wave, but inside you fear it might be the last time.',
            decisions: [{ prompt: 'What is the basic definition of irony as a literary device?', options: [
                { text: 'Irony is a literary device where there is a contradiction between what is said or', outcome: 'Irony is a literary device where there is a contradiction between what is said or expected and what.' },
                { text: 'irony is a funny coincidence', outcome: 'Not quite — Students often think the poet\'s smile is genuine happiness or relief, missing that it is.', reveals: 'the-poet-s-smile-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Start by asking the student to read the poem aloud and notice how the entire poem flows as one long sentence.',
            decisions: [{ prompt: 'What is the overall sentence structure of "My Mother at Sixty-six," and how is it punctuated?', options: [
                { text: 'The poem is written as a single sentence punctuated only by commas and ending with an', outcome: 'The poem is written as a single sentence punctuated only by commas and ending with an ellipsis.' },
                { text: 'multiple sentences', outcome: 'Not quite — Students often think "grammar in poetry" means finding errors or labeling parts of speech.', reveals: 'grammar-in-poetry-means-finding' },
                { text: 'uses full stops', outcome: 'Not quite — Students often think "grammar in poetry" means finding errors or labeling parts of speech.', reveals: 'grammar-in-poetry-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see the question: "Why does the poet \'smile and smile and smile\'?" Your first instinct might be to write "because.',
            decisions: [{ prompt: 'What is the defining characteristic of a literal comprehension question?', options: [
                { text: 'A literal comprehension question asks for information that is explicitly stated in the', outcome: 'A literal comprehension question asks for information that is explicitly stated in the text and can.' },
                { text: 'It asks for the main idea', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and write personal feelings ("I think.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'ashen like that of a corpse', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and write personal feelings ("I think.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Driving to the airport for your first hostel term, you notice how old your mother suddenly looks, and a childhood fear of losing her rises in your throat.',
            decisions: [{ prompt: 'What does Kamala Das\'s poem counsel?', options: [
                { text: 'Acknowledge the ache but answer with love and forward motion — the poem ends \'see you soon, Amma\': stay deliberately connected, keep living, don\'t pretend you felt nothing.', outcome: 'The poet puts the thought away only to return to it honestly; love expressed beats fear suppressed.' },
                { text: 'Suppress it — busy yourself with the new term and never look back.', outcome: 'The \'old familiar ache\' returns precisely because it was suppressed; denial postpones the feeling, it doesn\'t resolve it.', reveals: 'suppressing-grief' },
                { text: 'Cancel the plan — staying home forever is the only way to never lose her.', outcome: 'The poem accepts separation as part of life; surrendering your own future is guilt, not love.', reveals: 'guilt-cancels-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a twelve-line drive as a lifetime of love and dread — and see how poets say the unsayable by looking out the window.',
            decisions: [{ prompt: 'What comes next? My Mother at Sixty-six (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — My Mother at Sixty-six (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, complementary ideas in a literary work.',
          hint: 'If stuck, return to c12_eng_f_cbse_09_006 and practice the "Theme-Evidence-Explanation".',
          misconception: 'Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g., "trees, children.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to analyze the significance of the simile "wan, pale as a late winter\'s moon" in the poem.', answer: 'Step 1: Identify the image',
                  options: ['Step 1: Identify the image', 'mother looks pale', 'Secondary themes are trees, children, and moon'],
                  hint: 'If stuck, return to c12_eng_f_cbse_09_006 and practice the "Theme-Evidence-Explanation" table for.',
                  misconception: 'Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g., "trees, children, airport, moon") rather.' },
                { id: 'b', prompt: 'Compare the secondary theme of "unspoken emotion" in "My Mother at Sixty-six" with its treatment in another Class 12 Flamingo poem (e.g., "Aunt Jennifer\'s.', answer: 'In "My Mother at Sixty-six," silence is **protective**',
                  options: ['In "My Mother at Sixty-six," silence is **protective**', 'all three poems show women suffering in silence', 'Secondary themes are trees, children, and moon'],
                  hint: 'If stuck, return to c12_eng_f_cbse_09_006 and practice the "Theme-Evidence-Explanation" table for.',
                  misconception: 'Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g., "trees, children, airport, moon") rather.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish images from themes: (1) Have them complete this sentence frame for each image: "The.', '(3) Label each cluster with a thematic statement (not a noun).', '(4) Verify each thematic statement connects to the primary theme (aging/separation).', 'Remediation node: c12_eng_f_cbse_09_006 (Primary Theme) — revisit how the primary theme was derived from textual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g., "trees, children.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of childhood fear (\'my childhood\'s fear\') is merely a biographical detail and does not contribute to the poem\'s.', answer: 'Refute',
                  options: ['Refute', 'biographical origin', 'thematic function', 'Secondary themes are trees, children, and moon'],
                  hint: 'If stuck, return to c12_eng_f_cbse_09_006 and practice the "Theme-Evidence-Explanation" table for.',
                  misconception: 'Students often treat secondary themes as a "list of other topics mentioned in the poem" (e.g., "trees, children, airport, moon") rather.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish images from themes: (1) Have them complete this sentence frame for each image: "The.', '(3) Label each cluster with a thematic statement (not a noun).', '(4) Verify each thematic statement connects to the primary theme (aging/separation).', 'Remediation node: c12_eng_f_cbse_09_006 (Primary Theme) — revisit how the primary theme was derived from textual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If unable to separate imagery from metaphor, return to c6_english_u1_005 and.',
          misconception: 'Students believe "imagery" means only visual description (pictures in the mind) and that any comparison using "like/as".',
          parts: [
                { id: 'a', prompt: 'In the poem, the poet writes: "her face ashen like that of a corpse". Is this a metaphor or a simile?', answer: 'It is a **simile**',
                  options: ['It is a **simile**', 'imagery', 'like/as'],
                  hint: 'If unable to separate imagery from metaphor, return to c6_english_u1_005 and c7_engl_ch01_008;.',
                  misconception: 'Students believe "imagery" means only visual description (pictures in the mind) and that any comparison using "like/as" is *only* a simile.' },
                { id: 'b', prompt: 'Apply the concept of "kinetic imagery" (imagery of movement) to the phrase "Young Trees sprinting".', answer: '"Young Trees sprinting" is kinetic imagery',
                  options: ['"Young Trees sprinting" is kinetic imagery', 'imagery', 'like/as'],
                  hint: 'If unable to separate imagery from metaphor, return to c6_english_u1_005 and c7_engl_ch01_008;.',
                  misconception: 'Students believe "imagery" means only visual description (pictures in the mind) and that any comparison using "like/as" is *only* a simile.' },
                { id: 'c', prompt: 'Analyse how the single-sentence structure of the poem (punctuated only by commas) interacts with the imagery and metaphor to create a specific psychological.', answer: 'The single sentence mimics a continuous, unbroken stream of consciousness',
                  options: ['The single sentence mimics a continuous, unbroken stream of consciousness', 'imagery', 'like/as'],
                  hint: 'If unable to separate imagery from metaphor, return to c6_english_u1_005 and c7_engl_ch01_008;.',
                  misconception: 'Students believe "imagery" means only visual description (pictures in the mind) and that any comparison using "like/as" is *only* a simile.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Revisit c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c7_engl_ch01_008 (Literary Devices.', 'Do a "sense-hunt" exercise: take any paragraph from the newspaper, highlight every word appealing to sight, sound.', 'Practice converting 5 similes into metaphors by deleting "like/as" and adjusting the verb (e.g., "Her smile *was*.', 'Re-read the poem *only* for the mother\'s images — list them in order.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality, where the.',
          hint: 'If stuck, review the irony/symbolism definitions in c11_eng_h_cbse_01_009 and the imagery.',
          misconception: 'Students often think the poet\'s smile is genuine happiness or relief, missing that it is a deliberate mask.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why the poet\'s repeated smile at the end of the poem is an example of irony.', answer: 'The smile is ironic',
                  options: ['The smile is ironic', 'the smile shows she is happy'],
                  hint: 'If stuck, review the irony/symbolism definitions in c11_eng_h_cbse_01_009 and the imagery analysis.',
                  misconception: 'Students often think the poet\'s smile is genuine happiness or relief, missing that it is a deliberate mask.' }
          ],
            remediations: { 'the-poet-s-smile-is': { steps: ['Re-read the poem aloud, pausing at each comma to note the speaker\'s shifting focus.', 'Make a two-column table: left column "Outward Action/Words", right column "Inner Feeling" — fill it for the smile, the.', 'For each symbol (moon, trees, children), write the literal meaning and the abstract idea it evokes.', 'Re-attempt Diagnostic Questions 2 and 3; if still stuck, revisit Class 11 node c11_eng_h_cbse_01_009 on irony and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review **c11_eng_h_cbse_01_010 Worked Example 2** (Substitution Test on "The.',
          misconception: '**Misconception:** "Learning vocabulary for this poem means memorizing the NCERT glossary meanings (sprinting = short.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in context refers to the skill of determining the precise meaning,', '"Before You Read: Context and Background" is a pre-reading strategy that prepares', 'Plot and narrative structure in poetry refers to the sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poem'],
                  hint: 'If stuck, review **c11_eng_h_cbse_01_010 Worked Example 2** (Substitution Test on "The Road Not.',
                  misconception: '**Misconception:** "Learning vocabulary for this poem means memorizing the NCERT glossary meanings (sprinting = short fast race, wan.' }
          ],
            remediations: { 'misconception-learning-vocabulary-for-this': { steps: ['**Revisit c11_eng_h_cbse_01_010 / c11_eng_h_cbse_02_010 (Class 11 Vocabulary nodes):** Re-learn the.', '**Re-read the poem aloud** focusing **only on the 11 key words**.', 'For each, ask: "If I change this word to a synonym, what specific picture/feeling disappears?" 3.', '**Do the Substitution Test (Diagnostic Q3)** for *ashen, sprinting, spilling, wan, smile* — write 3 synonyms each and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to analyzing how the poet\'s.',
          hint: 'Review participle phrases in c11_eng_h_cbse_02_011 (Grammar: Language Usage - Tense and.',
          misconception: 'Students often think "grammar in poetry" means finding errors or labeling parts of speech.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to analyzing how the poet\'s grammatical',
                  options: ['Grammar: Language Usage in the Text refers to analyzing how the poet\'s grammatical', '"Before You Read: Context and Background" is a pre-reading strategy that prepares', 'Plot and narrative structure in poetry refers to the sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poem'],
                  hint: 'Review participle phrases in c11_eng_h_cbse_02_011 (Grammar: Language Usage - Tense and Aspect).',
                  misconception: 'Students often think "grammar in poetry" means finding errors or labeling parts of speech.' }
          ],
            remediations: { 'grammar-in-poetry-means-finding': { steps: ['Have the student read the poem aloud three times, marking every comma and line break with a slash (/).', 'Ask them to circle all -ing words and label each as participle or gerund.', 'Have them rewrite the poem as normal sentences (with full stops) and compare the emotional effect.', 'Revisit c11_eng_h_cbse_01_011 (Class 11 Grammar: Language Usage) for participle phrases and single-sentence structures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'If stuck, re-read the poem aloud focusing on sound and rhythm, then revisit.',
          misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the poet is sad").',
          parts: [
                { id: 'a', prompt: 'In your own words, explain the difference between a literal and an inferential question using one example from "My Mother at Sixty-six" for each type.', answer: 'Literal: "Where was the poet driving?"',
                  options: ['Literal: "Where was the poet driving?"', 'ashen like that of a corpse', 'her face looked grey', 'gives two literal examples shows the student cannot distinguish explicit vs'],
                  hint: 'If stuck, re-read the poem aloud focusing on sound and rhythm, then revisit c12_eng_f_cbse_09_008.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the poet is sad") without textual.' },
                { id: 'b', prompt: 'Apply the Clue-Claim-Connect method to answer: "Why has the mother been compared to the \'late winter\'s moon\'?" Show all three steps.', answer: 'Step 1 (Clue): Image = "wan, pale as a late winter\'s moon"',
                  options: ['Step 1 (Clue): Image = "wan, pale as a late winter\'s moon"', 'Because the moon is beautiful', 'ashen like that of a corpse', 'her face looked grey'],
                  hint: 'If stuck, re-read the poem aloud focusing on sound and rhythm, then revisit c12_eng_f_cbse_09_008.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the poet is sad") without textual.' },
                { id: 'c', prompt: 'Analyze the question: "Why are the young trees described as \'sprinting\'?" Break down the inferential reasoning required to answer it fully.', answer: 'The verb "sprinting" transfers the car\'s speed to the trees (personification)',
                  options: ['The verb "sprinting" transfers the car\'s speed to the trees (personification)', 'sprinting', 'ashen like that of a corpse', 'her face looked grey'],
                  hint: 'If stuck, re-read the poem aloud focusing on sound and rhythm, then revisit c12_eng_f_cbse_09_008.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the poet is sad") without textual.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Have the student list all questions from the NCERT "Think it out" box and label each L (literal) or I (inferential).', 'For every I-question, make a two-column table: Column A = exact words/phrases from poem used as evidence; Column.', 'Practice writing one PEEL paragraph per inferential question using only Column A evidence.', 'Re-attempt Diagnostic Questions 3-5 after 24 hours.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
