import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch07_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch07_p2',
    title: 'fQjkd xksj[kiqjh · Part 2/3',
    subtitle: 'He wrote the Ramayana where everyone could reach it',
    classLevel: 12, subject: 'hin_ar', topic: 'fQjkd xksj[kiqjh · Part 2/3',
    chapters: ['c12_hin_ar_ch07'],
    nodeIds: ['c12_hin_ar_cbse_07_007', 'c12_hin_ar_cbse_07_008', 'c12_hin_ar_cbse_07_009', 'c12_hin_ar_cbse_07_010', 'c12_hin_ar_cbse_07_011', 'c12_hin_ar_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-poetry scholar', intro: 'Four hundred years ago, a saint decided God\'s story belonged in the marketplace tongue. Hindi was never the same.', goal: 'Place Tulsidas in the Bhakti movement and read his five chhands as form fitted to feeling.' },
    discovery: {
        question: 'In 16th-century India, scripture lived only in Sanskrit — until Tulsidas retold the Ramayana in everyday Awadhi. What made that one language choice revolutionary?',
        options: ['It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature', 'Awadhi was more poetic', 'Sanskrit was forgotten', 'He didn\'t know Sanskrit'],
        answer: 'It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature',
        hook: 'His five forms here aren\'t experiments — they\'re classical metres mastered and matched to mood: चप्पय\'s even matras for philosophy, दोहा\'s rolling asymmetry for narrative. Variety is discipline, not rebellion; form follows function.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, or concerns that run parallel to the primary theme in a literary text, enriching its texture by exploring complementary dimensions of human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Bhakti workshop: place Tulsidas among the saints, learn what each chhand is built to carry, and weigh how a \'simple\' language shift levelled a hierarchy.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the first poem (fdlch fdlku...) aloud and you stumble over \'fHk[kkjh\' and \'pkdj\' — the verb endings feel unfamiliar and the word order.',
            decisions: [{ prompt: 'What is the defining matra structure of pkSikbZ chhand as described in the chapter, and where does the yati (caesura) fall?', options: [
                { text: 'pkSikbZ chhand has four quarters (charan) of 16 matras each, with a yati after the 8th', outcome: 'pkSikbZ chhand has four quarters (charan) of 16 matras each, with a yati after the 8th matra.' },
                { text: '16 matras total', outcome: 'Not quite — Students treat chhand as a labeling exercise ("this is pkSikbZ") rather than a scanning skill.', reveals: 'students-treat-chhand-as-a' },
                { text: 'yati after 10', outcome: 'Not quite — Students treat chhand as a labeling exercise ("this is pkSikbZ") rather than a scanning skill.', reveals: 'students-treat-chhand-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see a question: "According to the poet, why do the poor suffer?" You might panic because the poem doesn\'t say "the.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is explicitly stated in the text (e.g., "What does the poet', outcome: 'A literal question\'s answer is explicitly stated in the text (e.g., "What does the poet compare the.' },
                { text: 'literal questions are easy and inferential are hard', outcome: 'Not quite — Students believe inferential questions allow any personal opinion ("I think the poet means...").', reveals: 'inferential-questions-allow-any-personal' },
                { text: 'I think the poet means', outcome: 'Not quite — Students believe inferential questions allow any personal opinion ("I think the poet means...").', reveals: 'inferential-questions-allow-any-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re cutting a farewell video for a beloved coach. A teammate says the interview clips where the players hesitate before thanking him \'break the flow\' and should be dropped so the highlight reel stays \'propulsive.\'',
            decisions: [{ prompt: 'What would Tulsidas\'s design of the Guha episode argue?', options: [
                { text: 'Keep the hesitations — Tulsidas plants a doha where Guha pauses before letting Rama touch his feet precisely because the pause enacts his inner conflict; the interludes are where character interiority lives, not flow-breakers.', outcome: 'The chapter shows each poetic form sits at a deliberate narrative position — ask \'what would be lost if this were removed\'; in the video, what would be lost is the players\' love made visible as speech-failure.' },
                { text: 'Drop them — momentum is structure; pauses are where viewers swipe away.', outcome: 'That treats the poems in the Manas as decoration between plot points; the chapter\'s test is that the doha does narrative work prose can\'t — it performs devotion rather than describing it.', reveals: 'pauses-are-dead-air' },
                { text: 'Keep the clips but move them all to the end as an \'emotional section\' so they don\'t interrupt the action.', outcome: 'Tulsidas interleaves forms inside the episode rather than appending them — interiority must punctuate the action to mean anything; quarantined at the end it becomes a credits-roll extra.', reveals: 'emotion-belongs-at-the-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Tulsidas as both devotion and democratisation — metre chosen with a craftsman\'s ear, language chosen with a leveller\'s heart.',
            decisions: [{ prompt: 'What comes next? fQjkd xksj[kiqjh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — fQjkd xksj[kiqjh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, or concerns that run.',
          hint: 'If stuck, revisit Class 11 Chapter 7 (c11_hin_ar_cbse_07_007) where secondary themes were.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'गौण विषय\' का अर्थ है \'कम महत्वपूर्ण विषय\' या \'केवल उल्लिखित प्रसंग\'। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas, motifs, or concerns that run parallel to the',
                  options: ['Secondary themes are the supporting ideas, motifs, or concerns that run parallel to the', '"Before You Read: Context and Background" for Chapter 7 (fQjkd xksj[kiqjh) is the', 'Plot and Narrative Structure in this chapter refers to the organization of events in the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit Class 11 Chapter 7 (c11_hin_ar_cbse_07_007) where secondary themes were.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'गौण विषय\' का अर्थ है \'कम महत्वपूर्ण विषय\' या \'केवल उल्लिखित प्रसंग\'। वे गौण विषयों को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** विद्यार्थी से कहें: "पाठ के तीनों पदों और गद्यांश को फिर से पढ़ें, केवल उन वाक्यों/पंक्तियों को रेखांकित.', 'दो गौण विषय पहचानें और उनके साक्ष्य दें।"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_008', difficulty: 'standard',
          question: 'Imagery (fp=k.k) is the use of vivid, sensory language that appeals to the five.',
          hint: 'If stuck on vehicle/tenor: practice with 10 Hindi proverbs (e.g., "haath kangan ko aarsi.',
          misconception: 'Students treat imagery and metaphor as identification tasks: "Find the metaphor in stanza 2" → underline "isV dh vkx" →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery (fp=k.k) is the use of vivid, sensory language that appeals to the five senses',
                  options: ['Imagery (fp=k.k) is the use of vivid, sensory language that appeals to the five senses', '"Before You Read: Context and Background" for Chapter 7 (fQjkd xksj[kiqjh) is the', 'Plot and Narrative Structure in this chapter refers to the organization of events in the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck on vehicle/tenor: practice with 10 Hindi proverbs (e.g., "haath kangan ko aarsi kya".',
                  misconception: 'Students treat imagery and metaphor as identification tasks: "Find the metaphor in stanza 2" → underline "isV dh vkx" → done.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Re-read c11_hin_ar_cbse_07_008 (Class 11 Imagery & Metaphor) focusing ONLY on the \'vehicle/tenor\' distinction table and.', 'Take Poem 1, stanza 1. Circle 5 sensory words. For each, write: Sense → Concrete Noun → Abstract Idea it carries.', 'Find the central metaphor. Fill a 2-column table: Vehicle (concrete farming term) | Tenor (abstract life concept) |.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, the gap is \'abstraction from concrete\' — practice with 5 daily-life.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat imagery and metaphor as identification tasks: "Find the metaphor in stanza 2" → underline "isV dh vkx" →.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The extended metaphor of \'jke\' (Rama) as \'isV\' (harvest/life) in the third poem (èkwr dgkS) is more effective for a modern urban reader.', answer: 'Correct evaluation: Refute',
                  options: ['Correct evaluation: Refute', 'urban readers relate to Rama as ideal'],
                  hint: 'If stuck on vehicle/tenor: practice with 10 Hindi proverbs (e.g., "haath kangan ko aarsi kya".',
                  misconception: 'Students treat imagery and metaphor as identification tasks: "Find the metaphor in stanza 2" → underline "isV dh vkx" → done.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Re-read c11_hin_ar_cbse_07_008 (Class 11 Imagery & Metaphor) focusing ONLY on the \'vehicle/tenor\' distinction table and.', 'Take Poem 1, stanza 1. Circle 5 sensory words. For each, write: Sense → Concrete Noun → Abstract Idea it carries.', 'Find the central metaphor. Fill a 2-column table: Vehicle (concrete farming term) | Tenor (abstract life concept) |.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, the gap is \'abstraction from concrete\' — practice with 5 daily-life.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning.',
          hint: 'If stuck on "symbol vs metaphor," review **c12_hin_ar_cbse_07_008 WORKED_EXAMPLE_2**.',
          misconception: '**Misconception:** "Irony and symbolism are separate devices — irony is for prose/criticism, symbolism is for.',
          parts: [
                { id: 'a', prompt: 'In the *doha* "isV gh oQks ipr] cspr csVk&csVdh" (तीर ही को पार, चस्पा चस्पा चस्पा), explain why the arrow (तीर) is a **symbol** and not merely a metaphor.', answer: '**Correct Answer:** A metaphor is a direct comparison ("A is B")',
                  options: ['**Correct Answer:** A metaphor is a direct comparison ("A is B")', 'metaphor for devotion'],
                  hint: 'If stuck on "symbol vs metaphor," review **c12_hin_ar_cbse_07_008 WORKED_EXAMPLE_2** (metaphor.',
                  misconception: '**Misconception:** "Irony and symbolism are separate devices — irony is for prose/criticism, symbolism is for poems/beauty." **Why it\'s.' }
          ],
            remediations: { 'misconception-irony-and-symbolism-are': { steps: ['If the student cannot integrate irony and symbolism: 1.', '**Re-read** the three poems and prose *only for contrasts* — highlight every "but/그러나/परंतु" moment (e.g., king becomes.', '**Make a two-column table**: Column A = Concrete Object (arrow, dust, forest, bow, fire); Column B = Abstract Meaning.', '**Practice the "So what?" drill**: For each entry, ask "How does the *irony* deepen this symbol?" — e.g., "Dust.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the ability to determine the precise meaning.',
          hint: 'If stuck on a word\'s contextual meaning: (1) Locate its *exact line* in the poem/prose.',
          misconception: '**Misconception:** "Vocabulary in context means memorizing the \'shabdarth\' (word-meanings) list at the end of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the ability to determine the precise meaning,',
                  options: ['Vocabulary in Context refers to the ability to determine the precise meaning,', '"Before You Read: Context and Background" for Chapter 7 (fQjkd xksj[kiqjh) is the', 'Plot and Narrative Structure in this chapter refers to the organization of events in the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck on a word\'s contextual meaning: (1) Locate its *exact line* in the poem/prose.',
                  misconception: '**Misconception:** "Vocabulary in context means memorizing the \'shabdarth\' (word-meanings) list at the end of the chapter for the board.' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['**Revisit the shabdarth list** (NCERT pg 45-46) and for *each* word, write: (a) Dictionary meaning, (b).', '**Re-read c12_hin_ar_cbse_07_008 (Imagery/Metaphor)** and c12_hin_ar_cbse_07_009 (Irony/Symbolism) — vocabulary *is*.', 'Identify 3 words that function as metaphors (e.g., \'isV dh vkx\' = separation\'s pain).', '**Practice:** Take 5 words from the list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_011', difficulty: 'standard',
          question: 'This node covers the grammatical and linguistic features of Tulsidas\'s poems.',
          hint: 'If stuck on matra counting, revisit the laghu/guru rule with the \'kṣaṇ\' example: \'kṣa\'.',
          misconception: 'Students treat chhand as a labeling exercise ("this is pkSikbZ") rather than a scanning skill.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node covers the grammatical and linguistic features of Tulsidas\'s poems in Chapter',
                  options: ['This node covers the grammatical and linguistic features of Tulsidas\'s poems in Chapter', '"Before You Read: Context and Background" for Chapter 7 (fQjkd xksj[kiqjh) is the', 'Plot and Narrative Structure in this chapter refers to the organization of events in the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck on matra counting, revisit the laghu/guru rule with the \'kṣaṇ\' example: \'kṣa\' (conjunct).',
                  misconception: 'Students treat chhand as a labeling exercise ("this is pkSikbZ") rather than a scanning skill.' }
          ],
            remediations: { 'students-treat-chhand-as-a': { steps: ['Return to the chhand definitions at the end of the chapter (pkSikbZ, nksgk, etc.) and write them as flashcards: name.', 'Practice matra counting on 5 lines from the poems using the laghu/guru rule: say each word aloud, clap once for short.', 'Make a two-column table: Braj form (from poem) → Modern Hindi equivalent → grammatical category (verb, postposition.', 'Re-attempt Diagnostic Question 3 with the table and flashcards.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers that are directly stated in the.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_07_012 (Class 11 Comprehension) and practice with its.',
          misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet means...").',
          parts: [
                { id: 'a', prompt: 'Read this question: "In the first poem of the chapter, the poet describes the sun rising. Is this a literal or inferential question? Explain your reasoning."', answer: 'This is a literal question',
                  options: ['This is a literal question', 'describes', 'I think the poet means', 'reading between the lines'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_07_012 (Class 11 Comprehension) and practice with its worked.',
                  misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet means...").' },
                { id: 'b', prompt: 'Based on the second poem in the chapter (which depicts a conversation between a poor farmer and a rich landlord), answer: (a) Literal: What does the farmer say.', answer: 'Literal: What does the farmer say about his crops?',
                  options: ['Literal: What does the farmer say about his crops?', 'he is angry', 'I think the poet means', 'reading between the lines'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_07_012 (Class 11 Comprehension) and practice with its worked.',
                  misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet means...").' },
                { id: 'c', prompt: 'Compare these two inferential questions about the third poem: (i) "Why does the poet repeat the phrase \'राम नाम\'?" (ii) "How does the repetition of \'राम नाम\'.', answer: 'Question (ii) requires deeper inference',
                  options: ['Question (ii) requires deeper inference', 'I think the poet means', 'reading between the lines', 'bringing outside ideas'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_07_012 (Class 11 Comprehension) and practice with its worked.',
                  misconception: 'Students believe inferential questions allow any personal opinion ("I think the poet means...").' }
          ],
            remediations: { 'inferential-questions-allow-any-personal': { steps: ['Give the student a short 4-line poem (unseen).', 'Ask them to write one literal and one inferential question with answers.', 'For the inferential answer, require them to highlight the exact words in the poem that support their inference.', 'If they cannot highlight words, have them re-read the poem and list all adjectives/verbs/metaphors — then rebuild the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
