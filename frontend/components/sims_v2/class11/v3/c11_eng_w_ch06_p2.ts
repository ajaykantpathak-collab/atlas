import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch06_p2: SimDef = {
    id: 'v3_c11_eng_w_ch06_p2',
    title: 'The Third and Final Continent (Short Story) · Part 2/3',
    subtitle: 'See a moon landing become the handshake between an old Yankee and a new immigrant.',
    classLevel: 11, subject: 'eng_w', topic: 'The Third and Final Continent (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch06'],
    nodeIds: ['c11_eng_w_cbse_06_007', 'c11_eng_w_cbse_06_008', 'c11_eng_w_cbse_06_009', 'c11_eng_w_cbse_06_010', 'c11_eng_w_cbse_06_011', 'c11_eng_w_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an immigrant measuring three continents of displacement', intro: 'Calcutta to a London boarding house to a Boston room with a centenarian landlady — the rent was inconceivable; so was staying.', goal: 'Read the three-continent structure as cumulative growth and evaluate the circular frame.' },
    discovery: {
        question: 'The story is set in 1969 — is the moon landing just a date stamp for flavour?',
        options: ['No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant', 'Yes — it only fixes the year for exam purposes', 'No — but only because Lahiri herself watched it', 'Yes — it\'s a metaphor with no function in the plot'],
        answer: 'No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant',
        hook: 'The narrator isn\'t Lahiri, and the moon isn\'t trivia — both are deliberate architecture: a flag on the moon lets two strangers share a country.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, often interwoven ideas in a literary work that support, complicate, or contrast with the primary theme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order India, London and Boston as one continuous preparation — then place the climax where the narrator\'s two worlds finally meet over \'Splendid!\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are the narrator, standing on Massachusetts Avenue thirty years later, pointing out Mrs. Croft\'s house to your son.',
            decisions: [{ prompt: 'Identify one secondary theme in the story and quote a single line of dialogue or narration that signals this theme.', options: [
                { text: 'One secondary theme is the dignity of aging, signaled by Mrs', outcome: 'One secondary theme is the dignity of aging, signaled by Mrs. Croft\'s declaration: "There is.' },
                { text: 'There is an American flag on the moon!', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing,".', reveals: 'students-often-treat-secondary-themes' },
                { text: 'Say \'splendid\'!', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing,".', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re sitting in your board exam and the question asks: *"How does Lahiri use imagery and metaphor to convey the narrator\'s emotional journey from.',
            decisions: [{ prompt: 'Define "extended metaphor" and give one example from "The Third and Final Continent" without quoting more than five words from the text.', options: [
                { text: '**Correct answer:** An extended metaphor is a comparison sustained across multiple', outcome: '**Correct answer:** An extended metaphor is a comparison sustained across multiple sentences or.' },
                { text: 'the library was a fort', outcome: 'Not quite — **Students believe "imagery = adjectives" and "metaphor = any comparison."** Specifically: (1) They.', reveals: 'students-believe-imagery-adjectives-and' },
                { text: 'imagery = adjectives', outcome: 'Not quite — **Students believe "imagery = adjectives" and "metaphor = any comparison."** Specifically: (1) They.', reveals: 'students-believe-imagery-adjectives-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are telling a friend about the old lady who makes you say "Splendid!" about a flag on the moon every night — it sounds absurd, yet it becomes.',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Third and Final Continent" where the outcome of a situation is the opposite of what.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is starkly different from', outcome: 'Situational irony occurs when the actual outcome of a situation is starkly different from what was.' },
                { text: 'it\'s ironic that she is old', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that it rained.', reveals: 'students-often-confuse-irony-with' },
                { text: 'It\'s ironic that it rained on my wedding day', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that it rained.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the story and encounter the phrase "Grundig reel-to-reel" in the London house scene.',
            decisions: [{ prompt: 'What does the phrase "Grundig reel-to-reel" refer to in the context of the narrator\'s life in Finsbury Park, and which specific textual.', options: [
                { text: 'It refers to a brand of tape recorder/player used for playing music (Mukesh songs)', outcome: 'It refers to a brand of tape recorder/player used for playing music (Mukesh songs).' },
                { text: 'a type of radio', outcome: 'Not quite — Students often treat "vocabulary in context" as "find a synonym that fits the blank" rather than.', reveals: 'students-often-treat-vocabulary-in' },
                { text: 'a kitchen appliance', outcome: 'Not quite — Students often treat "vocabulary in context" as "find a synonym that fits the blank" rather than.', reveals: 'students-often-treat-vocabulary-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are listening to a friend who has just moved from a small town in India to a bustling city abroad.',
            decisions: [{ prompt: 'Identify the narrative tense predominantly used in the story and name the grammatical term for the tense used when the narrator recalls his.', options: [
                { text: 'The predominant narrative tense is the simple past (e.g., "I left," "I lived," "I', outcome: 'The predominant narrative tense is the simple past (e.g., "I left," "I lived," "I attended").' },
                { text: 'past continuous', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech (nouns, verbs).', reveals: 'language-usage-means-only-identifying' },
                { text: 'present perfect', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech (nouns, verbs).', reveals: 'language-usage-means-only-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see a question: "Why did the narrator feel \'mortified\' when he learned Mrs Croft\'s age?" You might panic because.',
            decisions: [{ prompt: 'What is the basic difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "Where did the', outcome: 'A literal question asks for information directly stated in the text (e.g., "Where did the narrator.' },
                { text: 'questions about the story', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal feeling.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a \'migration narratives\' exhibit your class curates \'The Third and Final Continent\'. A volunteer writes the placard: \'A man moves from India to London to America — a travel story about three addresses, ending happily.\'',
            decisions: [{ prompt: 'What does the placard flatten?', options: [
                { text: 'The diasporic arc: 1969 anchors it — the same week a Bengali immigrant watches a century-old landlady\'s ordinary rigor while men walk on the moon; personal settlement and epochal change are deliberately interleaved. It\'s about learning to belong across three continents — arranged marriage ripening into love — not a checklist of cities.', outcome: 'Lahiri braids the mundane and the monumental; reading it as travelogue misses how small domestic rituals carry the weight of historic transition.' },
                { text: 'The placard is fine — the title literally counts continents, so it\'s a journey story.', outcome: 'The \'third and final\' is about settlement and belonging, not itinerary — the moon landing is juxtaposed to frame a private milestone as epochal.', reveals: 'continents-are-just-stops' },
                { text: 'It\'s mainly about the landlady\'s eccentricity — a comic character sketch.', outcome: 'Mrs Croft\'s stern rituals matter as the immigrant\'s first American curriculum — her eccentricity teaches belonging; she\'s instrument, not subject.', reveals: 'landlady-is-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'Three continents aren\'t three stories — each one trains him for the next, and the last frame drives his son past the street where America began for him.',
            decisions: [{ prompt: 'What comes next? The Third and Final Continent (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Third and Final Continent (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, often interwoven ideas in a literary work.',
          hint: 'If stuck, review node 06_006 (Primary Theme) and node 06_002 (Plot) to re-anchor the.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing," "Mrs.',
          parts: [
                { id: 'a', prompt: 'Identify one secondary theme in the story and quote a single line of dialogue or narration that signals this theme.', answer: 'One secondary theme is the dignity of aging, signaled by Mrs',
                  options: ['One secondary theme is the dignity of aging, signaled by Mrs', 'There is an American flag on the moon!', 'Say \'splendid\'!', 'the narrator moves to America'],
                  hint: 'If stuck, review node 06_006 (Primary Theme) and node 06_002 (Plot) to re-anchor the narrative arc.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing," "Mrs.' },
                { id: 'b', prompt: 'Apply the concept of "secondary theme" to the narrator\'s observation of the Indian woman struggling with her sari and the dog on Massachusetts Avenue (p. 76).', answer: 'This moment activates the theme of **protective responsibility in marriage**',
                  options: ['This moment activates the theme of **protective responsibility in marriage**', 'A secondary theme is the moon landing'],
                  hint: 'If stuck, review node 06_006 (Primary Theme) and node 06_002 (Plot) to re-anchor the narrative arc.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing," "Mrs.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of themes, use the "Topic → Theme" ladder: 1) Pick a recurring topic (e.g., the rent.', '2) Ask: "What does the story *say* about this topic?" (e.g., "Rituals of payment create order and dignity in chaos").', '3) Phrase as a universal statement: "The theme is the human need for ritual to impose dignity on transactional.', '(Rent envelope, bench routine, flag ritual, Mala\'s knitting).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing," "Mrs.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The arranged marriage between the narrator and Mala is a secondary theme that ultimately fails to achieve emotional depth." Defend.', answer: 'Refute',
                  options: ['Refute', 'A secondary theme is the moon landing'],
                  hint: 'If stuck, review node 06_006 (Primary Theme) and node 06_002 (Plot) to re-anchor the narrative arc.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" (e.g., "the moon landing," "Mrs.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of themes, use the "Topic → Theme" ladder: 1) Pick a recurring topic (e.g., the rent.', '2) Ask: "What does the story *say* about this topic?" (e.g., "Rituals of payment create order and dignity in chaos").', '3) Phrase as a universal statement: "The theme is the human need for ritual to impose dignity on transactional.', '(Rent envelope, bench routine, flag ritual, Mala\'s knitting).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_008', difficulty: 'standard',
          question: '**Imagery** is the use of vivid, sensory language that appeals to the five.',
          hint: 'If stuck, review **c11_eng_w_cbse_06_003 (Setting and Atmosphere)** — specifically the.',
          misconception: '**Students believe "imagery = adjectives" and "metaphor = any comparison."** Specifically: (1) They underline.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of **patterned imagery** to the motif of **food** in the story (egg curry, cornflakes and milk, bananas, tea, soup).', answer: '**Correct answer:** The food imagery follows a sensory arc: **tactile-gustatory',
                  options: ['**Correct answer:** The food imagery follows a sensory arc: **tactile-gustatory', 'he eats cornflakes then Mala cooks curry', 'imagery = adjectives', 'metaphor = any comparison'],
                  hint: 'If stuck, review **c11_eng_w_cbse_06_003 (Setting and Atmosphere)** — specifically the "sensory.',
                  misconception: '**Students believe "imagery = adjectives" and "metaphor = any comparison."** Specifically: (1) They underline descriptive words ("beige.' }
          ],
            remediations: { 'students-believe-imagery-adjectives-and': { steps: ['** Give the student a single paragraph (e.g., the YMCA noise passage). Ask: *"Which sense does each verb appeal to?', '** Provide two columns: **Image** | **What it does**. Student fills: "furious drone of engine" | "links ship noise.', '** For metaphor, use the **"X is Y but not literally"** test. Write: "The piano killed her hands." Ask: *Is the piano.', '** Assign a **micro-essay (150 words)**: "Trace the \'milk\' imagery from London to the apartment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contradiction between expectation.',
          hint: 'Review the Class 10 irony node (c10_engl_cbse_01_007) for situational irony structure.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that it rained on my wedding day".',
          parts: [
                { id: 'a', prompt: 'Apply your understanding of symbolism: The piano in Mrs. Croft\'s parlour is described as having its "top down, piled with papers" and its bench missing (used.', answer: 'The piano symbolizes Mrs',
                  options: ['The piano symbolizes Mrs', 'It\'s ironic that it rained on my wedding day'],
                  hint: 'Review the Class 10 irony node (c10_engl_cbse_01_007) for situational irony structure, and the.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that it rained on my wedding day" — that\'s coincidence.' },
                { id: 'b', prompt: 'Analyze how the recurring "flag on the moon" ritual functions as both situational irony and a symbol. What thematic tension does it embody?', answer: 'The ritual is situationally ironic',
                  options: ['The ritual is situationally ironic', 'It\'s ironic that it rained on my wedding day'],
                  hint: 'Review the Class 10 irony node (c10_engl_cbse_01_007) for situational irony structure, and the.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that it rained on my wedding day" — that\'s coincidence.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student conflates irony with coincidence: 1) Have them complete the sentence frame: "I expected ___, but ___.', 'Croft: "I expected a 103-year-old to be helpless, but she commands the narrator, which is opposite because age usually.', '4) Practice with the piano: appearances (first visit, nightly ritual, Helen\'s explanation, final scene) + condition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If stuck, review the "Context Clue Types" chart (Definition, Synonym, Antonym, Example.',
          misconception: 'Students often treat "vocabulary in context" as "find a synonym that fits the blank" rather than "analyze how the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the precise meaning of unfamiliar words',
                  options: ['Vocabulary in Context is the skill of determining the precise meaning of unfamiliar words', '"Before You Read: Context and Background" provides the essential historical, cultural,', 'Plot is the sequence of causally linked events that form the narrative arc of a story,', 'Setting in literature refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the "Context Clue Types" chart (Definition, Synonym, Antonym, Example, Inference).',
                  misconception: 'Students often treat "vocabulary in context" as "find a synonym that fits the blank" rather than "analyze how the author\'s specific word.' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['Have the student re-read the *exact paragraph* containing the word, not just the sentence.', 'Ask: "What is happening physically/emotionally in this scene?', 'What is the narrator feeling?" 3.', 'Identify the *clue type*: Is there a definition ("a flask, he informed me, was used to store whiskey")?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'Review Class 10 reported speech rules (backshifting of tenses, pronoun changes.',
          misconception: 'Students often think "language usage" means only identifying parts of speech (nouns, verbs) or listing British/American.',
          parts: [
                { id: 'a', prompt: 'In the dialogue with Mrs Croft, she says: "Fasten the chain and firmly press that button on the knob!" Identify the sentence type, the verb forms, and the.', answer: 'Sentence type: compound imperative (two coordinate clauses)',
                  options: ['Sentence type: compound imperative (two coordinate clauses)', 'She ordered me to fasten the chain and to press the button on the knob firmly', 'told me fasten', ') or changes'],
                  hint: 'Review Class 10 reported speech rules (backshifting of tenses, pronoun changes, time/place shifts).',
                  misconception: 'Students often think "language usage" means only identifying parts of speech (nouns, verbs) or listing British/American word pairs.' }
          ],
            remediations: { 'language-usage-means-only-identifying': { steps: ['If a student cannot move beyond labeling, guide them through a "grammar-to-meaning" drill: 1) Pick one sentence (e.g.', '2) Change the tense to simple past ("I did not think of her...").', '(The past perfect emphasizes the duration of not-thinking up to the moment of the obituary; the simple past makes it.', 'Repeat with imperative vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'If stuck, review "Identifying Main Ideas and Supporting Details" from Class 10 reading.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any personal feeling is valid.',
          parts: [
                { id: 'a', prompt: 'In the story, the narrator says, "I was mortified. I had assumed Mrs Croft was in her eighties...', answer: 'The narrator felt mortified (deeply embarrassed/shameful)',
                  options: ['The narrator felt mortified (deeply embarrassed/shameful)', 'It was widowhood that had driven my own mother insane', 'That this person was a widow who lived alone mortified me further still'],
                  hint: 'If stuck, review "Identifying Main Ideas and Supporting Details" from Class 10 reading.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal feeling is valid.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this new question: "What did the narrator eat for his first meal in America?" Identify the question type and.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'egg curry'],
                  hint: 'If stuck, review "Identifying Main Ideas and Supporting Details" from Class 10 reading.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal feeling is valid.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['1) Show the student a two-column table: Column A = Textual Evidence (quote/detail), Column B = Inference Drawn.', '2) Practice with a clear example: Evidence — "Mrs Croft slapped the bench and commanded \'Sit down!\'" → Inference — "She.', '4) Reinforce: "No evidence, no inference."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
