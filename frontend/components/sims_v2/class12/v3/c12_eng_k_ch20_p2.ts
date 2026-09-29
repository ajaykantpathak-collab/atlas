import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch20_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch20_p2: SimDef = {
    id: 'v3_c12_eng_k_ch20_p2',
    title: 'The Open Window (Drama) · Part 2/3',
    subtitle: 'She was told she was human — and tried to own the man who said it',
    classLevel: 12, subject: 'eng_k', topic: 'The Open Window (Drama) · Part 2/3',
    chapters: ['c12_eng_k_ch20'],
    nodeIds: ['c12_eng_k_cbse_20_007', 'c12_eng_k_cbse_20_008', 'c12_eng_k_cbse_20_009', 'c12_eng_k_cbse_20_010', 'c12_eng_k_cbse_20_011', 'c12_eng_k_cbse_20_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama scholar', intro: 'A Buddhist legend, a Nobel poet\'s scalpel, and a question nobody asks: what happens the day after liberation?', goal: 'Read Chandalika as a tragedy of awakened selfhood — where liberation overshoots into possessiveness.' },
    discovery: {
        question: 'Ananda asks an \'untouchable\' girl for water; she tastes equality for the first time — then uses her mother\'s magic to bind him. Is Chandalika a social reform play?',
        options: ['It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession', 'Yes — caste is wrong, end of story', 'No — it\'s a romance', 'It\'s about Buddhist magic'],
        answer: 'It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession',
        hook: 'Tagore rewrote a crude legend of magic and lust into \'a psychological drama of intense spiritual conflict.\' Prakriti — named for nature\'s raw life-force — gets her humanity in Act I; Act II is the danger: freedom that hasn\'t learned to love without grasping. Self-humiliation, he wrote, is a sin worse than self-murder.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'s devotion but from selfless love that respects the other\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_20_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stage the collision: weigh the earth-spell against the monk\'s sadhana, track how gratitude curdles into possession, and judge who pays the price of a consciousness that overreached.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'s devotion but from selfless love that respects the other\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports or complements the primary theme,', outcome: 'A secondary theme is a subordinate idea that supports or complements the primary theme, exploring.' },
                { text: 'secondary themes are just \'subplots\' or minor stories', outcome: 'Not quite — Students often think secondary themes are just \'subplots\' or minor stories.', reveals: 'secondary-themes-are-just-subplots' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'s devotion but from selfless love that respects the other\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from *Chandalika* Act I.', options: [
                { text: 'Imagery: language appealing to senses (e.g., "the very crows on the amloki branches are', outcome: 'Imagery: language appealing to senses (e.g., "the very crows on the amloki branches are gasping for.' },
                { text: 'imagery is just pictures', outcome: 'Not quite — Students often treat imagery as "descriptive writing" and metaphor as "fancy comparison," missing.', reveals: 'students-often-treat-imagery-as' },
                { text: 'Give me water', outcome: 'Not quite — Students often treat imagery as "descriptive writing" and metaphor as "fancy comparison," missing.', reveals: 'students-often-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'s devotion but from selfless love that respects the other\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define **situational irony** and give one example from *Chandalika* Act I where the outcome contradicts the character’s intention.', options: [
                { text: 'Situational irony occurs when actions produce an outcome opposite to what was intended', outcome: 'Situational irony occurs when actions produce an outcome opposite to what was intended.' },
                { text: 'bad luck', outcome: 'Not quite — Students often treat irony as synonymous with “unfortunate coincidence” (e.g., “It’s ironic that.', reveals: 'students-often-treat-irony-as' },
                { text: 'coincidence', outcome: 'Not quite — Students often treat irony as synonymous with “unfortunate coincidence” (e.g., “It’s ironic that.', reveals: 'students-often-treat-irony-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'s devotion but from selfless love that respects the other\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the sentence type of Prakriti\'s line: "Give me water, give me water." (Act I) Is it declarative, interrogative, imperative,.', options: [
                { text: 'Imperative', outcome: 'Imperative. The line is a direct command/request addressed to the monk, repeated for emotional.' },
                { text: 'repetition makes it a statement rather than a persistent demand', outcome: 'Not quite — Students treat grammar analysis as labeling parts of speech (noun, verb, tense) rather than.', reveals: 'students-treat-grammar-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'s devotion but from selfless love that respects the other\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What does Prakriti\'s mother fear will happen if she works a spell.', options: [
                { text: 'This is a **literal** question', outcome: 'This is a **literal** question because the answer is directly stated in the text: Mother says, "I.' },
                { text: 'inference', outcome: 'Not quite — Students often treat inferential questions as "guessing games" and write vague responses like "It.', reveals: 'students-often-treat-inferential-questions' },
                { text: 'opinion', outcome: 'Not quite — Students often treat inferential questions as "guessing games" and write vague responses like "It.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A long-excluded teammate is suddenly given real authority on the project — and immediately uses it to control and belittle the others.',
            decisions: [{ prompt: 'What does Tagore\'s Chandalika caution?', options: [
                { text: 'That being recognised as human and learning to wield freedom are different steps — Prakriti\'s awakening curdles into possessive power because liberation arrived without maturity; coach her, don\'t just crown or strip her.', outcome: 'The play\'s tragedy is the gap between dignity granted and self-command learned — neither pure empowerment nor revoked authority is the answer.' },
                { text: 'Empowerment alone was the fix — oppression ends the moment power changes hands.', outcome: 'Act II exists precisely to disprove that; freedom without maturity can reproduce the very domination it escaped.', reveals: 'recognition-equals-maturity' },
                { text: 'Take the authority back — this proves the marginalised can\'t handle power.', outcome: 'Tagore\'s point is the opposite: it\'s the long denial of humanity that deforms the first use of it, not unfitness.', reveals: 'failure-proves-unfitness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the play past its \'caste reform\' surface into Tagore\'s real subject — the dangerous adolescence of a newly freed self.',
            decisions: [{ prompt: 'What comes next? The Open Window (Drama) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Open Window (Drama) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_007', difficulty: 'standard',
          question: 'Secondary themes in \'s devotion but from selfless love that respects the other\'.',
          hint: 'Review the primary theme node (006) and the Class 11 secondary theme nodes.',
          misconception: 'Students often think secondary themes are just \'subplots\' or minor stories.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'s devotion but from selfless love that respects the other\'',
                  options: ['Secondary themes in \'s devotion but from selfless love that respects the other\'', '\'s devotion but from selfless love that respects the other\' (Kaleidoscope, ch', 'The plot/narrative arc of \'s devotion but from selfless love that respects the other\'', 'The setting of \'s devotion but from selfless love that respects the other\''],
                  hint: 'Review the primary theme node (006) and the Class 11 secondary theme nodes (c11_eng_h_cbse_01_007.',
                  misconception: 'Students often think secondary themes are just \'subplots\' or minor stories.' }
          ],
            remediations: { 'secondary-themes-are-just-subplots': { steps: ['If the student cannot distinguish secondary themes, have them re-read Act I focusing only on the mother\'s speeches.', 'Ask: \'What concerns does the mother voice that are not Prakriti\'s main desire for Ananda?\' List them (caste purity.', 'Then map each to a secondary theme.', 'Next, re-do Diagnostic 4 with this list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think secondary themes are just \'subplots\' or minor stories.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: \'The mother\'s death is a necessary narrative device to resolve the secondary theme of maternal sacrifice.\' Defend or critique with.', answer: 'The mother\'s death is necessary',
                  options: ['The mother\'s death is necessary', 'calls it \'just sad\' or \'unnecessary\' misses the thematic function', 'secondary themes are just \'subplots\' or minor stories'],
                  hint: 'Review the primary theme node (006) and the Class 11 secondary theme nodes (c11_eng_h_cbse_01_007.',
                  misconception: 'Students often think secondary themes are just \'subplots\' or minor stories.' }
          ],
            remediations: { 'secondary-themes-are-just-subplots': { steps: ['If the student cannot distinguish secondary themes, have them re-read Act I focusing only on the mother\'s speeches.', 'Ask: \'What concerns does the mother voice that are not Prakriti\'s main desire for Ananda?\' List them (caste purity.', 'Then map each to a secondary theme.', 'Next, re-do Diagnostic 4 with this list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_008', difficulty: 'standard',
          question: 'Imagery in \'s devotion but from selfless love that respects the other\' — the.',
          hint: 'If unable to separate sensory imagery from metaphor, revisit Class 11 node.',
          misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "fancy comparison," missing that in *Chandalika*.',
          parts: [
                { id: 'a', prompt: 'In Act II, the Mother says: "The fire of his suffering burnt into my soul, till I thought I could bear no more." Identify the metaphor, the two things being.', answer: 'Metaphor: suffering = fire',
                  options: ['Metaphor: suffering = fire', 'imagery only', 'religious', 'calls this "imagery only" misses the structural equation'],
                  hint: 'If unable to separate sensory imagery from metaphor, revisit Class 11 node c11_eng_h_cbse_01_008.',
                  misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "fancy comparison," missing that in *Chandalika* both are structural.' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Re-read Act I, highlighting every sensory word in three colours: heat/dust (oppression), water/coolness (liberation).', 'List the five explicit metaphors Prakriti speaks (e.g., "flower sprung from poison-plant," "Ganges mingles with Jumna").', 'For each, write: tenor (subject), vehicle (image), and thematic function.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_009', difficulty: 'standard',
          question: 'Irony and paradox in \'s devotion but from selfless love that respects the.',
          hint: 'If stuck, review the “Imagery and Metaphor” worked examples in c12_eng_k_cbse_20_008.',
          misconception: 'Students often treat irony as synonymous with “unfortunate coincidence” (e.g., “It’s ironic that Mother dies”) and.',
          parts: [
                { id: 'a', prompt: 'Analyse the **symbol of water** across both acts. How does its meaning evolve from Act I to Act II?', answer: 'In Act I, water symbolises purification, equality, and the “new birth” Prakriti',
                  options: ['In Act I, water symbolises purification, equality, and the “new birth” Prakriti', 'purity', 'treats water as a static symbol of “purity” fails to track its dynamic evolution'],
                  hint: 'If stuck, review the “Imagery and Metaphor” worked examples in c12_eng_k_cbse_20_008 to practice.',
                  misconception: 'Students often treat irony as synonymous with “unfortunate coincidence” (e.g., “It’s ironic that Mother dies”) and symbolism as a simple.' }
          ],
            remediations: { 'students-often-treat-irony-as': { steps: ['Re-read Act I focusing only on Prakriti’s speeches: highlight every phrase where she describes water, fire, or her “new.', 'Re-read Act II’s mirror sequences: note what the mirror *shows* vs.', 'what Prakriti *says* she sees.', 'Use the table below to map each symbol’s Act I meaning vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_010', difficulty: 'standard',
          question: 'Key vocabulary of \'s devotion but from selfless love that respects the other\'.',
          hint: 'If stuck, return to c12_eng_k_cbse_20_002 (Plot) and map the top 10 recurring nouns/verbs.',
          misconception: 'Students often treat vocabulary questions as "give the dictionary meaning" tasks.',
          parts: [
                { id: 'a', prompt: 'The Mother warns: "Their spells can make a changeling of the very soul itself." Using context clues, determine the meaning of "changeling" here and explain why.', answer: '"Changeling" traditionally means a child secretly substituted by fairies',
                  options: ['"Changeling" traditionally means a child secretly substituted by fairies', 'changeling'],
                  hint: 'If stuck, return to c12_eng_k_cbse_20_002 (Plot) and map the top 10 recurring nouns/verbs across.',
                  misconception: 'Students often treat vocabulary questions as "give the dictionary meaning" tasks.' }
          ],
            remediations: { 'students-often-treat-vocabulary-questions': { steps: ['If a student cannot move beyond dictionary definitions: (1) Have them re-read Act I, highlighting every occurrence.', '(2) For each, write two columns: "Literal Meaning" vs.', '"What the Character *Means*." (3) Practice one 100-word answer: "How does the meaning of \'chandalini\' change from.', 'This builds the habit of tracking semantic shift — a skill tested in both board long-answers and CUET critical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_011', difficulty: 'standard',
          question: 'Language and style in \'s devotion but from selfless love that respects the.',
          hint: 'Review c6_english_u4_038 (Sentence Structure and Types of Sentences) with practice.',
          misconception: 'Students treat grammar analysis as labeling parts of speech (noun, verb, tense) rather than investigating how syntactic.',
          parts: [
                { id: 'a', prompt: 'Identify the sentence type of Prakriti\'s line: "Give me water, give me water." (Act I) Is it declarative, interrogative, imperative, or exclamatory?', answer: 'Imperative',
                  options: ['Imperative', 'repetition makes it a statement rather than a persistent demand'],
                  hint: 'Review c6_english_u4_038 (Sentence Structure and Types of Sentences) with practice exercises.',
                  misconception: 'Students treat grammar analysis as labeling parts of speech (noun, verb, tense) rather than investigating how syntactic choices *perform*.' },
                { id: 'b', prompt: 'Explain in your own words why Mother uses conditional structures like "If the clouds come, they come: if they don\'t, they don\'t" instead of direct statements.', answer: 'Mother\'s conditionals express fatalistic acceptance of social hierarchy',
                  options: ['Mother\'s conditionals express fatalistic acceptance of social hierarchy', 'she is unsure'],
                  hint: 'Review c6_english_u4_038 (Sentence Structure and Types of Sentences) with practice exercises.',
                  misconception: 'Students treat grammar analysis as labeling parts of speech (noun, verb, tense) rather than investigating how syntactic choices *perform*.' },
                { id: 'c', prompt: 'Compare the pronoun usage in Prakriti\'s "I want him, mother, I want him beyond all measure" and Mother\'s "We only churn up the mud." What does the shift from.', answer: 'Prakriti\'s \'I\' asserts individual desire and new-born subjectivity',
                  options: ['Prakriti\'s \'I\' asserts individual desire and new-born subjectivity', 'sees only \'first person vs first person plural\' misses the ideological contrast'],
                  hint: 'Review c6_english_u4_038 (Sentence Structure and Types of Sentences) with practice exercises.',
                  misconception: 'Students treat grammar analysis as labeling parts of speech (noun, verb, tense) rather than investigating how syntactic choices *perform*.' }
          ],
            remediations: { 'students-treat-grammar-analysis-as': { steps: ['Revisit c12_eng_k_cbse_20_010 (Vocabulary) to recall key words like \'spell\', \'chant\', \'caste\'.', 'Re-read Act I focusing only on punctuation marks — highlight every ?, !, .', 'Complete a table: Speaker | Sentence Type | Frequency | Thematic Implication.', 'Write one PEEL paragraph using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_012', difficulty: 'standard',
          question: 'Literal comprehension of \'s devotion but from selfless love that respects the.',
          hint: 'If stuck, re-read Act I focusing on Prakriti\'s dialogue with Mother — highlight every.',
          misconception: 'Students often treat inferential questions as "guessing games" and write vague responses like "It shows she is sad".',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What does Prakriti\'s mother fear will happen if she works a spell on Ananda?"', answer: 'This is a **literal** question',
                  options: ['This is a **literal** question', 'inference', 'opinion'],
                  hint: 'If stuck, re-read Act I focusing on Prakriti\'s dialogue with Mother — highlight every line where.',
                  misconception: 'Students often treat inferential questions as "guessing games" and write vague responses like "It shows she is sad" without anchoring.' },
                { id: 'b', prompt: 'Using the "evidence → inference" method, answer: "How does the mirror function as a dramatic device in Act II?" Provide two pieces of textual evidence and the.', answer: '**Evidence 1:** Mother says, "you shall take it in your hand and dance',
                  options: ['**Evidence 1:** Mother says, "you shall take it in your hand and dance', 'inference', 'opinion'],
                  hint: 'If stuck, re-read Act I focusing on Prakriti\'s dialogue with Mother — highlight every line where.',
                  misconception: 'Students often treat inferential questions as "guessing games" and write vague responses like "It shows she is sad" without anchoring.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Revisit **c12_eng_k_cbse_20_002** (Plot and Narrative Structure) to re-familiarise with the sequence of events.', 'Re-read **c12_eng_k_cbse_20_004** and **c12_eng_k_cbse_20_005** (Character Analyses) to recall character motivations.', 'Practice the "evidence → inference" template on five literal questions from the NCERT "Thinking about the Play".', 'Self-check: For each inferential answer, highlight the textual evidence in yellow and the logical connector in green.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
