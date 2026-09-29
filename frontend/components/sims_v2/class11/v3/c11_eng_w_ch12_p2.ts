import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch12_p2: SimDef = {
    id: 'v3_c11_eng_w_ch12_p2',
    title: 'Telephone Conversation (Poem) · Part 2/3',
    subtitle: 'Hear a rental call become a colour inspection — answered with devastating politeness.',
    classLevel: 11, subject: 'eng_w', topic: 'Telephone Conversation (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch12'],
    nodeIds: ['c11_eng_w_cbse_12_007', 'c11_eng_w_cbse_12_008', 'c11_eng_w_cbse_12_009', 'c11_eng_w_cbse_12_010', 'c11_eng_w_cbse_12_011', 'c11_eng_w_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a caller pricing a flat in 1960s London', intro: 'Price, location — agreed. Then one confession turns a transaction into an interrogation about melanin.', goal: 'Analyse the poem\'s dramatic structure and evaluate satire as a response to racism.' },
    discovery: {
        question: 'Asked \'HOW DARK?\' on a phone call about a flat, the speaker answers with jokes — \'plain or milk chocolate?\' Does the wit weaken the protest?',
        options: ['It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity', 'It weakens it — jokes trivialise discrimination', 'Neither — the humour is separate from the politics', 'It weakens it — satire can\'t confront real prejudice'],
        answer: 'It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity',
        hook: 'The telephone strips away everything but voice — so the only place racism can operate is a question about shade, and the poem dismantles it there.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Telephone Conversation\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Find the pivot where a housing call becomes a racial negotiation, read the silences and capitals as structure, and judge the open ending.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Telephone Conversation\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding depth and.' },
                { text: 'minor topics', outcome: 'Not quite — Students often confuse secondary themes with "examples of the primary theme." For instance, they.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse secondary themes with "examples of the primary theme." For instance, they.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Telephone Conversation\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from everyday language (not from the poem).', options: [
                { text: 'Imagery: Language that appeals to the senses (e.g., "The kitchen smelled of frying onions', outcome: 'Imagery: Language that appeals to the senses (e.g., "The kitchen smelled of frying onions and.' },
                { text: 'Time is like a thief', outcome: 'Not quite — Students often treat every colour word as "just description" and miss that Soyinka *clusters*.', reveals: 'students-often-treat-every-colour' },
                { text: 'Imagery is description', outcome: 'Not quite — Students often treat every colour word as "just description" and miss that Soyinka *clusters*.', reveals: 'students-often-treat-every-colour' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Telephone Conversation\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define verbal irony and give one example from the poem where the speaker uses words that mean the opposite of what he feels.', options: [
                { text: 'Verbal irony occurs when a speaker says one thing but means the opposite, often to', outcome: 'Verbal irony occurs when a speaker says one thing but means the opposite, often to critique.' },
                { text: 'HOW DARK?', outcome: 'Not quite — Students often believe the landlady\'s questions ("HOW DARK?", "ARE YOU LIGHT OR VERY DARK?") are.', reveals: 'the-landlady-s-questions-how' },
                { text: 'ARE YOU LIGHT OR VERY DARK?', outcome: 'Not quite — Students often believe the landlady\'s questions ("HOW DARK?", "ARE YOU LIGHT OR VERY DARK?") are.', reveals: 'the-landlady-s-questions-how' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Telephone Conversation\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the lines in the poem where capital letters are used for entire words or phrases.', options: [
                { text: 'Capitalized phrases include "HOW DARK ?", "ARE YOU LIGHT OR VERY DARK ?", "Button B', outcome: 'Capitalized phrases include "HOW DARK ?", "ARE YOU LIGHT OR VERY DARK ?", "Button B.' },
                { text: 'it shows the landlady is polite', outcome: 'Not quite — Students often treat the poem\'s non-standard grammar (fragments, capitalization, missing verbs).', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Telephone Conversation\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'Literal questions have answers directly stated in the text', outcome: 'Literal questions have answers directly stated in the text; inferential questions require drawing.' },
                { text: 'literal means easy, inferential means hard', outcome: 'Not quite — Students often think inferential questions have no "right" answer because they are "just opinions.".', reveals: 'inferential-questions-have-no-right' },
                { text: 'inferential questions have no "right" answer', outcome: 'Not quite — Students often think inferential questions have no "right" answer because they are "just opinions.".', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class debate on \'Does racism still exist in polite society?\', a teammate wants to use Soyinka\'s \'Telephone Conversation\' but plans to present it as \'a true story about one rude landlady in Africa.\' You suspect both parts of that framing are wrong.',
            decisions: [{ prompt: 'What\'s the strongest way to deploy the poem in the debate?', options: [
                { text: 'Present it as a 1960s London incident — legal \'No Blacks\' rental ads, pre-Race Relations Act Britain — where the telephone strips away everything but voice, so racism must operate through a single question: \'HOW DARK?\' The poem\'s power is how a Nobel laureate\'s intellect gets reduced to a colour swatch, and how the silences and capitalised words turn prejudice\'s absurdity into structure.', outcome: 'Setting plus form become your evidence: systemic racism in \'polite\' Britain, exposed line by line until the speaker seizes control — \'wouldn\'t you rather see for yourself?\'' },
                { text: 'Go with the teammate\'s version — it\'s about one landlady\'s bad manners, so treat it as an anecdote about individual rudeness.', outcome: 'Individualising it loses the argument: the poem documents a legal, systemic rental market where \'HOW DARK?\' was a normal question to ask.', reveals: 'racism-is-one-rude-person' },
                { text: 'Use it as an \'African literature\' example since Soyinka is Nigerian — the landlady represents colonial attitudes back home.', outcome: 'The setting is London, not Africa; misplacing it geographically hides that the poem targets British racism experienced by an African abroad.', reveals: 'nigerian-poet-means-africa-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: '\'Wouldn\'t you rather see for yourself?\' — he ends the call by refusing the category, leaving the door open and the verdict with her.',
            decisions: [{ prompt: 'What comes next? Telephone Conversation (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Telephone Conversation (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_007', difficulty: 'standard',
          question: 'Secondary themes in \'Telephone Conversation\' — the supporting ideas and motifs.',
          hint: 'Review node 006 (Primary Theme) and node 004 (Protagonist Analysis) — specifically the.',
          misconception: 'Students often confuse secondary themes with "examples of the primary theme." For instance, they list "the landlady\'s.',
          parts: [
                { id: 'a', prompt: 'In the poem, the speaker describes his palms and soles as "peroxide blonde" and his bottom as "raven black" due to friction.', answer: 'The description is a deliberate satirical device: by fragmenting his body into',
                  options: ['The description is a deliberate satirical device: by fragmenting his body into', 'examples of the primary theme', 'the landlady\'s question about skin shade'],
                  hint: 'Review node 006 (Primary Theme) and node 004 (Protagonist Analysis) — specifically the speaker\'s.',
                  misconception: 'Students often confuse secondary themes with "examples of the primary theme." For instance, they list "the landlady\'s question about skin.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Have the student re-read the poem and highlight every moment the speaker *responds* (not just what the landlady does).', 'For each response, ask: "What idea is the speaker introducing here that isn\'t just \'racism is bad\'?" (e.g., when.', 'Group these ideas into 3-4 clusters.', 'Name each cluster with a noun phrase (e.g., "linguistic inadequacy," "bodily absurdity," "performative politeness").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_008', difficulty: 'standard',
          question: 'Imagery in \'Telephone Conversation\' — the vivid, sensory language that creates.',
          hint: 'Review the "Poetic Devices" nodes from Class 6-8 (especially c6_english_u1_005 and.',
          misconception: 'Students often treat every colour word as "just description" and miss that Soyinka *clusters* colours to build opposing.',
          parts: [
                { id: 'a', prompt: 'Identify one auditory image and one tactile image in the poem. For each, explain what physical sensation the reader is meant to feel.', answer: 'Auditory: "Silence',
                  options: ['Auditory: "Silence', 'Red booth', 'gold-rolled', 'like plain or milk chocolate'],
                  hint: 'Review the "Poetic Devices" nodes from Class 6-8 (especially c6_english_u1_005 and c8_engl_ch4_15).',
                  misconception: 'Students often treat every colour word as "just description" and miss that Soyinka *clusters* colours to build opposing symbolic systems.' }
          ],
            remediations: { 'students-often-treat-every-colour': { steps: ['Give the student a colour-coded highlighter task: pink for red-cluster words, yellow for gold-cluster, blue for.', 'Have them read only the highlighted words aloud in clusters to *hear* the contrasting soundscapes.', 'Ask: "Which cluster feels like a prison?', 'Which feels like a real body?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every colour word as "just description" and miss that Soyinka *clusters* colours to build opposing.',
          parts: [
                { id: 'a', prompt: 'The metaphor "spectroscopic / Flight of fancy" describes the landlady\'s mental process.', answer: 'Spectroscopy analyses light spectra',
                  options: ['Spectroscopy analyses light spectra', 'it\'s accurate because she examines him closely', 'like plain or milk chocolate', 'spectroscopic flight of fancy'],
                  hint: 'Review the "Poetic Devices" nodes from Class 6-8 (especially c6_english_u1_005 and c8_engl_ch4_15).',
                  misconception: 'Students often treat every colour word as "just description" and miss that Soyinka *clusters* colours to build opposing symbolic systems.' },
                { id: 'b', prompt: 'Write a four-line stanza that uses a metaphor and at least two sensory images to describe a moment when you felt judged by your appearance.', answer: 'Example: "The mirror is a courtroom, cold and bright, / Its gavel clicks',
                  options: ['Example: "The mirror is a courtroom, cold and bright, / Its gavel clicks', 'like plain or milk chocolate', 'spectroscopic flight of fancy'],
                  hint: 'Review the "Poetic Devices" nodes from Class 6-8 (especially c6_english_u1_005 and c8_engl_ch4_15).',
                  misconception: 'Students often treat every colour word as "just description" and miss that Soyinka *clusters* colours to build opposing symbolic systems.' }
          ],
            remediations: { 'students-often-treat-every-colour': { steps: ['Give the student a colour-coded highlighter task: pink for red-cluster words, yellow for gold-cluster, blue for.', 'Have them read only the highlighted words aloud in clusters to *hear* the contrasting soundscapes.', 'Ask: "Which cluster feels like a prison?', 'Which feels like a real body?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Telephone Conversation\' — where opposite things are both.',
          hint: 'Review the "Irony in \'A Letter to God\'" (c10_engl_cbse_01_007) and "Symbolism in \'Two.',
          misconception: 'Students often believe the landlady\'s questions ("HOW DARK?", "ARE YOU LIGHT OR VERY DARK?") are merely insensitive.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of dramatic irony to the moment the speaker describes his body parts as different colours ("Palm of my hand, soles of my feet / Are.', answer: 'Dramatic irony occurs when the audience knows more than a character',
                  options: ['Dramatic irony occurs when the audience knows more than a character', 'descriptive', 'HOW DARK?', 'ARE YOU LIGHT OR VERY DARK?'],
                  hint: 'Review the "Irony in \'A Letter to God\'" (c10_engl_cbse_01_007) and "Symbolism in \'Two Stories About.',
                  misconception: 'Students often believe the landlady\'s questions ("HOW DARK?", "ARE YOU LIGHT OR VERY DARK?") are merely insensitive curiosity, missing that.' }
          ],
            remediations: { 'the-landlady-s-questions-how': { steps: ['Re-read the poem *only* for capitalised words and colour words; list them in two columns.', 'For each capitalised phrase, write: "Literal question: ___ | Actual implication: ___" to expose the verbal irony.', 'For each colour, ask: "Who assigns this colour?', 'Who is reduced by it?" to reveal symbolism as imposed labelling.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Telephone Conversation\' — the words and phrases you must.',
          hint: 'Review c11_eng_w_cbse_12_009\'s worked examples on irony detection, focusing on the.',
          misconception: 'Students treat "raven black" as a simple colour intensifier ("very black") and miss that "raven" carries cultural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'Telephone Conversation\'',
                  options: ['Key vocabulary of \'Telephone Conversation\'', '\'Telephone Conversation\' (Woven Words, ch', 'The plot/narrative arc of \'Telephone Conversation\'', 'The setting of \'Telephone Conversation\''],
                  hint: 'Review c11_eng_w_cbse_12_009\'s worked examples on irony detection, focusing on the "good-breeding".',
                  misconception: 'Students treat "raven black" as a simple colour intensifier ("very black") and miss that "raven" carries cultural baggage: in Western.' }
          ],
            remediations: { 'students-treat-raven-black-as': { steps: ['Have the student re-read lines 25–26 aloud, stressing "raven" as a noun, not an adjective.', 'Ask: "What bird is a raven?', 'What stories know this bird?" 3.', 'Provide two 30-second micro-lectures: (a) Poe\'s raven = "Nevermore" / death omen in Gothic tradition; (b) Yoruba / West.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_011', difficulty: 'standard',
          question: 'Language and style in \'Telephone Conversation\' — how the writer chose words.',
          hint: 'Review sentence classification (c6_english_u4_038) and active/passive transformations.',
          misconception: 'Students often treat the poem\'s non-standard grammar (fragments, capitalization, missing verbs) as "mistakes".',
          parts: [
                { id: 'a', prompt: 'The poem is written predominantly in the present tense ("The price seemed reasonable", "The landlady swore", "Voice, when it came, / Lipstick coated...").', answer: 'Rewritten: "The price had seemed reasonable, location / Had been indifferent',
                  options: ['Rewritten: "The price had seemed reasonable, location / Had been indifferent', 'no change'],
                  hint: 'Review sentence classification (c6_english_u4_038) and active/passive transformations.',
                  misconception: 'Students often treat the poem\'s non-standard grammar (fragments, capitalization, missing verbs) as "mistakes" or "informal speech" rather.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Give the student a two-column table: Column A – "Standard Grammar Version" (teacher provides corrected sentences).', 'Ask them to read both aloud and note differences in sound, speed, and feeling.', 'Guide them to label each difference (e.g., "capitalization = volume", "fragment = gasp", "inversion = shock").', 'Have them write one sentence explaining why the poet chose the "incorrect" version.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Telephone Conversation\' — questions answered straight.',
          hint: 'If stuck, review the definitions of irony and symbolism (node c11_eng_w_cbse_12_009) and.',
          misconception: 'Students often think inferential questions have no "right" answer because they are "just opinions." They fail to see.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', answer: 'Literal questions have answers directly stated in the text',
                  options: ['Literal questions have answers directly stated in the text', 'literal means easy, inferential means hard', 'inferential questions have no "right" answer'],
                  hint: 'If stuck, review the definitions of irony and symbolism (node c11_eng_w_cbse_12_009) and practice.',
                  misconception: 'Students often think inferential questions have no "right" answer because they are "just opinions." They fail to see that inferences must.' },
                { id: 'b', prompt: 'Given the line "Silence. Silenced transmission of / Pressurised good-breeding.", write a literal comprehension question and an inferential comprehension.', answer: 'Literal: What does the speaker hear after he reveals he is African?',
                  options: ['Literal: What does the speaker hear after he reveals he is African?', 'inferential questions have no "right" answer'],
                  hint: 'If stuck, review the definitions of irony and symbolism (node c11_eng_w_cbse_12_009) and practice.',
                  misconception: 'Students often think inferential questions have no "right" answer because they are "just opinions." They fail to see that inferences must.' },
                { id: 'c', prompt: 'Compare the landlady\'s two questions: "ARE YOU DARK? OR VERY LIGHT?" and "WHAT\'S THAT?" (after "West African sepia").', answer: 'The first question uses capitalisation and binary options to dehumanise',
                  options: ['The first question uses capitalisation and binary options to dehumanise', 'inferential questions have no "right" answer'],
                  hint: 'If stuck, review the definitions of irony and symbolism (node c11_eng_w_cbse_12_009) and practice.',
                  misconception: 'Students often think inferential questions have no "right" answer because they are "just opinions." They fail to see that inferences must.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Show the student the line "Her assent was clinical, crushing in its light / Impersonality." 2.', 'Ask: "What words show her attitude?" (clinical, crushing, impersonality).', 'Guide them to connect these words to the inference of cold prejudice.', 'Practice writing a PEEL paragraph: Point (landlady is prejudiced), Evidence ("clinical, crushing"), Explanation (words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
