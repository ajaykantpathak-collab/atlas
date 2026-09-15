import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch02_p2: SimDef = {
    id: 'v3_c11_eng_s_ch02_p2',
    title: 'The Address · Part 2/3',
    subtitle: 'Read a doorstep rejection as the machinery of dispossession, not a quarrel over furniture.',
    classLevel: 11, subject: 'eng_s', topic: 'The Address · Part 2/3',
    chapters: ['c11_eng_s_ch02'],
    nodeIds: ['c11_eng_s_cbse_02_007', 'c11_eng_s_cbse_02_008', 'c11_eng_s_cbse_02_009', 'c11_eng_s_cbse_02_010', 'c11_eng_s_cbse_02_011', 'c11_eng_s_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a survivor returning to claim a stolen past', intro: 'Number 46 still stands, the tablecloth is hers, the burn mark familiar — yet the room feels like a stranger\'s house.', goal: 'Situate the story in occupied Holland and analyse how its two-visit structure delivers disillusionment.' },
    discovery: {
        question: 'Mrs. Dorling \'safekeeps\' a Jewish family\'s belongings and later won\'t let the daughter in. Simple greed — or something larger?',
        options: ['Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty', 'Simple greed — a neighbour exploiting a friendship', 'Neither — she was protecting the items from damage', 'Larger — she was a paid government custodian by law'],
        answer: 'Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty',
        hook: 'Reading her as merely greedy shrinks systemic dispossession into personal villainy — the law itself made the theft respectable.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas or motifs that support and enrich the primary theme of a literary work.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the story into its pre-war and post-war timeframes, place the flashbacks as structural pillars, and defend the choice to \'forget the address.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you find an old photograph album in your grandparents\' house.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that enriches the main (primary) theme but is not', outcome: 'A secondary theme is a supporting idea that enriches the main (primary) theme but is not the.' },
                { text: 'the narrator visits Marconi Street', outcome: 'Not quite — Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.', reveals: 'any-recurring-topic-e' },
                { text: 'mother', outcome: 'Not quite — Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.', reveals: 'any-recurring-topic-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you walk into a relative\'s house after years away and everything smells different — musty, unfamiliar — yet you spot your mother\'s favourite teacup.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "The Address" without looking at the text.', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "A musty smell emerged"', outcome: 'Imagery: Language appealing to senses (e.g., "A musty smell emerged" — olfactory imagery).' },
                { text: 'Imagery is just description', outcome: 'Not quite — Students often treat imagery and metaphor as *decoration* — "beautiful language" — rather than.', reveals: 'students-often-treat-imagery-and' },
                { text: 'Metaphor uses \'like\'', outcome: 'Not quite — Students often treat imagery and metaphor as *decoration* — "beautiful language" — rather than.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine returning to your grandparents\' house years after they passed away, only to find a stranger living there using your grandmother\'s favourite teacup for.',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Address" without quoting the text directly.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse symbolism with metaphor, treating every described object as a symbol (e.g.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'the train symbolizes her journey', outcome: 'Not quite — Students often confuse symbolism with metaphor, treating every described object as a symbol (e.g.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading "The Address" and encounter the sentence: "The objects that are linked in your memory with the familiar life of former times instantly.',
            decisions: [{ prompt: 'Define "contextual meaning" and explain how it differs from "dictionary meaning" using the word "Liberation" from the text as your example.', options: [
                { text: 'Contextual meaning is the specific significance a word acquires within a particular', outcome: 'Contextual meaning is the specific significance a word acquires within a particular textual.' },
                { text: 'freedom from oppression', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'What does the word X suggest in this context?', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a diary entry from 1945 where the writer switches between "I remember" and "I had remembered"—why does the tense change?',
            decisions: [{ prompt: 'Identify the tense of the verb phrase "had given" in the sentence: "It had been in the first half of the War.', options: [
                { text: 'The verb phrase "had given" is in the past perfect tense', outcome: 'The verb phrase "had given" is in the past perfect tense. It indicates an action completed before.' },
                { text: 'past simple', outcome: 'Not quite — Students often treat "grammar in literature" as merely labeling parts of speech (e.g., "this is.', reveals: 'students-often-treat-grammar-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see the question: "Why did the narrator want to forget the address?" Your mind goes blank because the answer isn\'t.',
            decisions: [{ prompt: 'What is the definition of a literal comprehension question?', options: [
                { text: 'A literal comprehension question asks for information explicitly stated in the text,', outcome: 'A literal comprehension question asks for information explicitly stated in the text, requiring.' },
                { text: 'a question that asks for your opinion', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no right answer, so they write.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no right answer, so they write.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a Remembrance Week display your class presents \'The Address\'. The caption reads: \'A story about a selfish woman who kept a neighbour\'s furniture — a lesson in greed.\' A visitor who knows the history frowns at the caption.',
            decisions: [{ prompt: 'What does the caption get wrong?', options: [
                { text: 'It shrinks systemic dispossession to personal greed: Mrs Dorling\'s holding the family\'s things sits inside the Holocaust-era \'Aryanisation\' of Jewish property — ~75% of Dutch Jews were murdered, belongings \'safeguarded\' or seized, and the objects at 46 Marconi Street are the only remaining witnesses to erased lives. The narrator doesn\'t reclaim them because they\'re now \'uncanny\' — arranged in a stranger\'s room, they\'ve lost their meaning.', outcome: 'The address is about ruptured continuity, not bad manners; the objects testify to a family the state wiped out.' },
                { text: 'The caption is fine — at heart it\'s a morality tale about not taking other people\'s things.', outcome: 'That reads it as universal \'theft\' and misses the specific mechanism — state-sanctioned dispossession under occupation — and why the daughter walks away rather than demand her inheritance back.', reveals: 'address-is-about-greed' },
                { text: 'Reframe it as triumph — the daughter should have taken everything back to honour her mother.', outcome: 'That misses the ending\'s point: seeing her mother\'s cardigan worn as ordinary utility broke the link; reclaiming objects can\'t restore the erased world they came from.', reveals: 'reclaiming-is-the-lesson' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'The objects were real; the life they belonged to was not reclaimable — forgetting the address is the only honest resolution left.',
            decisions: [{ prompt: 'What comes next? The Address · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Address · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas or motifs that support and enrich the.',
          hint: 'If stuck, review the primary theme node (c11_eng_s_cbse_02_006) and the character.',
          misconception: 'Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.',
          parts: [
                { id: 'a', prompt: 'Analyze how the contrast between the narrator\'s two visits to Marconi Street (first visit: door slammed; second visit: invited in but feels oppressed) develops.', answer: 'The first visit shows the past actively rejected (Mrs',
                  options: ['The first visit shows the past actively rejected (Mrs', 'mother', 'silver', 'A secondary theme is war'],
                  hint: 'If stuck, review the primary theme node (c11_eng_s_cbse_02_006) and the character analysis of Mrs.',
                  misconception: 'Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student: "Complete this sentence: \'The story shows that war...\'" Push until they form a full sentence with.', 'Give them a T-chart: Left column = Object (cardigan, candle-holder, table-cloth, silver).', 'Right column = What it *meant* then vs.', 'Have them write one thematic statement per object using the frame: "The [object] represents how [abstract idea]." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate the narrator\'s decision to "forget the address" as a resolution to the secondary theme of "betrayal of trust." Is forgetting an act of weakness.', answer: 'Forgetting the address is an act of strength',
                  options: ['Forgetting the address is an act of strength', 'running away', 'instantly lose their value', 'a small rented room'],
                  hint: 'If stuck, review the primary theme node (c11_eng_s_cbse_02_006) and the character analysis of Mrs.',
                  misconception: 'Students often think any recurring topic (e.g., "war," "mother," "silver") is a theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student: "Complete this sentence: \'The story shows that war...\'" Push until they form a full sentence with.', 'Give them a T-chart: Left column = Object (cardigan, candle-holder, table-cloth, silver).', 'Right column = What it *meant* then vs.', 'Have them write one thematic statement per object using the frame: "The [object] represents how [abstract idea]." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) for practice.',
          misconception: 'Students often treat imagery and metaphor as *decoration* — "beautiful language" — rather than as *structural engines*.',
          parts: [
                { id: 'a', prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "The Address" without looking at the text.', answer: 'Imagery: Language appealing to senses (e.g., "A musty smell emerged"',
                  options: ['Imagery: Language appealing to senses (e.g., "A musty smell emerged"', 'Imagery is just description', 'Metaphor uses \'like\''],
                  hint: 'If stuck, review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) for practice isolating.',
                  misconception: 'Students often treat imagery and metaphor as *decoration* — "beautiful language" — rather than as *structural engines* of meaning in this.' },
                { id: 'b', prompt: 'Compare the imagery of Mrs. Dorling\'s "broad back" (first visit) with the daughter\'s "broad back" (second visit).', answer: 'The "broad back" visually embodies the physical burden of carrying stolen lives',
                  options: ['The "broad back" visually embodies the physical burden of carrying stolen lives', 'they look alike'],
                  hint: 'If stuck, review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) for practice isolating.',
                  misconception: 'Students often treat imagery and metaphor as *decoration* — "beautiful language" — rather than as *structural engines* of meaning in this.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Have the student re-read *only* the second visit scene (from "I followed the girl along the passage" to "I resolved.', 'Ask: "If you removed all sensory words, what would the narrator *know* vs.', 'Give a template: "The [image] appeals to [sense].', 'It makes the narrator feel [emotion] because [context]." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review c11_eng_s_cbse_02_002 (Plot and Narrative Structure) to re-sequence the.',
          misconception: 'Students often confuse symbolism with metaphor, treating every described object as a symbol (e.g., "the train.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of dramatic irony to the narrator\'s first encounter with Mrs. Dorling. What does the reader know that the narrator momentarily doubts?', answer: 'The reader knows the woman at the door is Mrs',
                  options: ['The reader knows the woman at the door is Mrs', 'the train symbolizes her journey'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_002 (Plot and Narrative Structure) to re-sequence the visits.',
                  misconception: 'Students often confuse symbolism with metaphor, treating every described object as a symbol (e.g., "the train symbolizes her journey").' },
                { id: 'b', prompt: 'Analyze how the Hanukkah candle-holder and the woollen table-cloth function as interconnected symbols of the narrator\'s lost heritage.', answer: 'The candle-holder, once reserved for a sacred annual ritual ("We never used it',
                  options: ['The candle-holder, once reserved for a sacred annual ritual ("We never used it', 'the train symbolizes her journey'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_002 (Plot and Narrative Structure) to re-sequence the visits.',
                  misconception: 'Students often confuse symbolism with metaphor, treating every described object as a symbol (e.g., "the train symbolizes her journey").' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Have the student create a two-column table: Column A = "Object/Event in Past Context" (e.g., candle-holder used once.', 'Ask: "What does the shift from Column A to Column B *represent* about the narrator\'s world?" 3.', 'For irony, give three clear definitions with non-literary examples (situational: a fire station burns down; dramatic.', 'Map each definition to a specific story moment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If stuck, review c11_eng_s_cbse_02_002 (Plot and Narrative Structure) to re-anchor each.',
          misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'In the sentence "I had waited a long time to go there. Initially after the Liberation I was absolutely not interested in all that stored stuff, and naturally.', answer: '"Stored stuff" uses the vague, diminutive noun "stuff" combined with the passive',
                  options: ['"Stored stuff" uses the vague, diminutive noun "stuff" combined with the passive', 'things kept in storage', 'How does the writer\'s language convey the narrator\'s state of mind?', 'vocabulary in context'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_002 (Plot and Narrative Structure) to re-anchor each vocabulary.',
                  misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Have the student select ONE word from the text (e.g., "poignant") and write three sentences: (a) dictionary definition.', 'Use a two-column table: Column A = word in isolation; Column B = word in full sentence with 5 words before/after.', 'Ask: "If the author changed this word to [synonym], what would be lost?" Require written answer referencing tone.', 'Repeat with 3 more words until the student spontaneously discusses connotation, not just definition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'Review Class 10 reported speech rules (backshifting) and Class 8 tense revision (past.',
          misconception: 'Students often treat "grammar in literature" as merely labeling parts of speech (e.g., "this is a past perfect verb").',
          parts: [
                { id: 'a', prompt: 'Identify the tense of the verb phrase "had given" in the sentence: "It had been in the first half of the War.', answer: 'The verb phrase "had given" is in the past perfect tense',
                  options: ['The verb phrase "had given" is in the past perfect tense', 'past simple'],
                  hint: 'Review Class 10 reported speech rules (backshifting) and Class 8 tense revision (past perfect for.',
                  misconception: 'Students often treat "grammar in literature" as merely labeling parts of speech (e.g., "this is a past perfect verb") without explaining.' }
          ],
            remediations: { 'students-often-treat-grammar-in': { steps: ['Give the student a two-column table: Column A = grammatical feature (e.g., past perfect), Column B = narrative function.', 'Have them find 3 examples in the text and fill Column B by asking: "What time period does this verb place us in?', 'What does the narrator feel about that time?" 3.', 'Model one think-aloud: "When Minco writes \'I had remembered it,\' the past perfect shows the remembering happened.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, re-read the two visit scenes (first and second) and list every concrete detail.',
          misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I.',
          parts: [
                { id: 'a', prompt: 'Two students answer: "Why did Mrs. Dorling refuse to see the narrator the first time?" Student A: "Because she was wearing the narrator\'s mother\'s cardigan and.', answer: 'Student B\'s answer is better',
                  options: ['Student B\'s answer is better', 'opinion questions', 'I think she was sad', 'she was sad") instead of evidence-based deductions'],
                  hint: 'If stuck, re-read the two visit scenes (first and second) and list every concrete detail the.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I think she was sad").' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Give the student a short, unfamiliar paragraph and ask them to write one literal and one inferential question with.', 'For the inferential answer, require them to highlight the exact words/phrases used as evidence.', 'Ask: "If this word were removed, would your inference still hold?" This forces them to see the dependency on textual.', 'Practice with the "burn mark" scene: list three explicit details, then build one inference step by step.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
