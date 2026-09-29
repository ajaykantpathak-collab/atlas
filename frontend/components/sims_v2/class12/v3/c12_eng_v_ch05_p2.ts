import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch05_p2: SimDef = {
    id: 'v3_c12_eng_v_ch05_p2',
    title: 'On the Face of It · Part 2/3',
    subtitle: 'A tin leg, a burned face, and a garden with no locked gate',
    classLevel: 12, subject: 'eng_v', topic: 'On the Face of It · Part 2/3',
    chapters: ['c12_eng_v_ch05'],
    nodeIds: ['c12_eng_v_cbse_05_007', 'c12_eng_v_cbse_05_008', 'c12_eng_v_cbse_05_009', 'c12_eng_v_cbse_05_010', 'c12_eng_v_cbse_05_011', 'c12_eng_v_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama reader', intro: 'Two people the world keeps misreading meet in a garden. One afternoon is enough to change what a face means.', goal: 'Read On the Face of It as a study of alienation and connection — disability as circumstance, not subject.' },
    discovery: {
        question: 'An old man with a tin leg and a boy with a burned face meet in a garden. \'It\'s a play about disability,\' says a classmate. What\'s the truer subject?',
        options: ['Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at', 'Correct — disability is the theme', 'The garden is the theme', 'It\'s about growing apples'],
        answer: 'Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at',
        hook: 'The \'before you read\' label calls Derry \'defiant\' — yet his first lines are pure panic. Hold context lightly: the play isn\'t about a tin leg or a scar, it\'s about the loneliness both carried into the garden and the friendship neither expected.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'On the Face of It\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in Mr Lamb\'s garden through one afternoon: track how crab-apple talk, bees and open gates dismantle a boy\'s defences — and decide what the title\'s \'face of it\' really judges.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'On the Face of It\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a play, and distinguish it from the primary theme using one example from "On the Face of It."', options: [
                { text: 'A secondary theme is a recurring idea that supports or runs parallel to the primary theme', outcome: 'A secondary theme is a recurring idea that supports or runs parallel to the primary theme but.' },
                { text: 'disability', outcome: 'Not quite — Students often treat "loneliness," "disability," and "friendship" as themes themselves.', reveals: 'students-often-treat-loneliness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'On the Face of It\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, then identify ONE example of each from the opening of Scene One (before Derry speaks about.', options: [
                { text: 'Imagery: "occasional sound of birdsong and of tree leaves rustling" (auditory), "long', outcome: 'Imagery: "occasional sound of birdsong and of tree leaves rustling" (auditory), "long grass".' },
                { text: 'empty house', outcome: 'Not quite — Students confuse imagery with metaphor, treating ANY descriptive language as metaphor.', reveals: 'students-confuse-imagery-with-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'On the Face of It\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give ONE example from "On the Face of It" where the outcome is the opposite of what the characters or audience.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to what was.' },
                { text: 'Derry\'s face is ugly so people stare', outcome: 'Not quite — Students often confuse *symbolism* with *metaphor* and treat every object as a symbol.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'something sad or unfair', outcome: 'Not quite — Students often confuse *symbolism* with *metaphor* and treat every object as a symbol.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'On the Face of It\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define the term "connotation" and give one example from the play where a word\'s connotation differs from its dictionary definition.', options: [
                { text: 'Connotation is the emotional, cultural, or associative meaning a word carries beyond its', outcome: 'Connotation is the emotional, cultural, or associative meaning a word carries beyond its literal.' },
                { text: 'windfalls just means fallen apples', outcome: 'Not quite — **Misconception**: "Vocabulary in context means guessing the meaning from surrounding words — like.', reveals: 'misconception-vocabulary-in-context-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'On the Face of It\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the punctuation mark used repeatedly in the play to indicate pauses, hesitation, or trailing thoughts in Derry\'s speech, and give.', options: [
                { text: 'The ellipsis (…) is used repeatedly to show Derry\'s hesitation, emotional pauses, and', outcome: 'The ellipsis (…) is used repeatedly to show Derry\'s hesitation, emotional pauses, and incomplete.' },
                { text: 'I....there....I thought this was an empty place', outcome: 'Not quite — Students believe "grammar in literature" means finding errors or labeling parts of speech (noun.', reveals: 'grammar-in-literature-means-finding' },
                { text: 'grammar in literature', outcome: 'Not quite — Students believe "grammar in literature" means finding errors or labeling parts of speech (noun.', reveals: 'grammar-in-literature-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'On the Face of It\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What does Mr Lamb say about the gate to his garden?" Explain your.', options: [
                { text: 'This is a **literal** question', outcome: 'This is a **literal** question because it asks for a direct quotation or paraphrase of Mr Lamb\'s.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion".', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'guessing', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion".', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A new teammate with a facial scar always sits alone at lunch and skips group events. You\'ve had one warm conversation with her and promised \'I\'ll sit with you tomorrow\' — then your own friends pull you to their table.',
            decisions: [{ prompt: 'What does \'On the Face of It\' say about your promise?', options: [
                { text: 'Keep it — actually go back. Mr Lamb\'s bitter aside \'They never do come back\' exists because kindness without return is the pattern; Derry\'s return matters precisely because everyone else failed to, and the tragedy is arriving after the chance is gone.', outcome: 'The play\'s three-scene arc builds everything on whether Derry returns; the garden means nothing as a one-visit kindness and everything as a chosen connection — your table tomorrow is the point, not your sympathy today.' },
                { text: 'She probably prefers being left alone anyway, like Derry claims to.', outcome: 'That\'s the misreading the play dismantles — Derry\'s \'I don\'t care\' is armour built from others\' stares, not preference; Mr Lamb reads the withdrawal as a wound to be answered with welcome, not respected as a wish.', reveals: 'withdrawal-equals-preference' },
                { text: 'One kind conversation already counts — you showed her someone cares.', outcome: 'The off-stage fall makes the point brutally: single visits don\'t save anyone, and the window is short; the play measures connection by the return, not the first approach.', reveals: 'one-visit-is-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a one-act play for its bond, not its plot — and spot how other people\'s staring does the actual damage.',
            decisions: [{ prompt: 'What comes next? On the Face of It · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — On the Face of It · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes in \'On the Face of It\' — the supporting ideas and motifs that.',
          hint: 'If stuck, return to c12_eng_v_cbse_05_006 (Primary Theme) and c12_eng_v_cbse_05_004/005.',
          misconception: 'Students often treat "loneliness," "disability," and "friendship" as themes themselves. These are TOPICS.',
          parts: [
                { id: 'a', prompt: 'Apply the secondary theme of "choice between withdrawal and engagement" to Derry\'s decision at the end of Scene 1.', answer: 'Derry initially enters the garden by climbing the wall (secretive, withdrawn)',
                  options: ['Derry initially enters the garden by climbing the wall (secretive, withdrawn)', 'Derry leaves so he\'s still withdrawn'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_006 (Primary Theme) and c12_eng_v_cbse_05_004/005 (Character.',
                  misconception: 'Students often treat "loneliness," "disability," and "friendship" as themes themselves. These are TOPICS.' },
                { id: 'b', prompt: 'Analyze how the secondary theme of "loneliness disguised as independence" operates in Mr Lamb\'s character.', answer: 'Mr Lamb claims "Friends everywhere',
                  options: ['Mr Lamb claims "Friends everywhere', 'hundreds of friends'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_006 (Primary Theme) and c12_eng_v_cbse_05_004/005 (Character.',
                  misconception: 'Students often treat "loneliness," "disability," and "friendship" as themes themselves. These are TOPICS.' }
          ],
            remediations: { 'students-often-treat-loneliness': { steps: ['If a student cannot distinguish topic from theme: 1) Give them three topics from the play (loneliness, appearance.', '2) Ask them to write one opinion sentence about each that Susan Hill might agree with.', '3) Have them find two pieces of evidence per sentence.', 'If they miss stage-direction themes: 1) Photocopy Scene 3\'s stage directions only.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "loneliness," "disability," and "friendship" as themes themselves. These are TOPICS.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The secondary theme of \'Beauty and the Beast\' in the play is ultimately subverted because Derry does not transform physically." Defend.', answer: 'The statement should be refuted',
                  options: ['The statement should be refuted', 'the theme fails because he\'s still burned'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_006 (Primary Theme) and c12_eng_v_cbse_05_004/005 (Character.',
                  misconception: 'Students often treat "loneliness," "disability," and "friendship" as themes themselves. These are TOPICS.' }
          ],
            remediations: { 'students-often-treat-loneliness': { steps: ['If a student cannot distinguish topic from theme: 1) Give them three topics from the play (loneliness, appearance.', '2) Ask them to write one opinion sentence about each that Susan Hill might agree with.', '3) Have them find two pieces of evidence per sentence.', 'If they miss stage-direction themes: 1) Photocopy Scene 3\'s stage directions only.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_008', difficulty: 'standard',
          question: 'Imagery in \'On the Face of It\' — the vivid, sensory language that creates.',
          hint: 'If stuck on metaphor identification, review the "Thing A is Thing B because Shared.',
          misconception: 'Students confuse imagery with metaphor, treating ANY descriptive language as metaphor.',
          parts: [
                { id: 'a', prompt: 'Mr. Lamb says: "Why is one green, growing plant called a weed and another \'flower\'? Where\'s the difference. It\'s all life... growing.', answer: 'The metaphor compares plants (weeds vs',
                  options: ['The metaphor compares plants (weeds vs', 'he thinks weeds and flowers are the same', 'he compares Derry to a weed', 'says "he compares Derry to a weed" reverses the metaphor\'s direction'],
                  hint: 'If stuck on metaphor identification, review the "Thing A is Thing B because Shared Quality" frame.',
                  misconception: 'Students confuse imagery with metaphor, treating ANY descriptive language as metaphor.' },
                { id: 'b', prompt: 'In Scene One, Mr. Lamb describes his bees: "Some hear bees and they say, bees buzz. But when you listen to bees for a long while, they humm...', answer: 'Step 1: Identify the two auditory images',
                  options: ['Step 1: Identify the two auditory images', 'as synonyms misses the metaphorical redefinition', 'only lists "buzz" and "hum" as synonyms misses the metaphorical redefinition', 'ignores "listen" vs'],
                  hint: 'If stuck on metaphor identification, review the "Thing A is Thing B because Shared Quality" frame.',
                  misconception: 'Students confuse imagery with metaphor, treating ANY descriptive language as metaphor.' }
          ],
            remediations: { 'students-confuse-imagery-with-metaphor': { steps: ['Have the student list 10 sensory details from Scene One (sight, sound, touch, smell, taste) — label each "I" for.', 'Have them find 5 comparisons where Thing A is described AS Thing B — label each "M" for metaphor.', 'For each "M," complete the frame: "_____ (Thing A) is _____ (Thing B) because _____ (shared quality)."', 'Re-read the "weeds/flowers" and "bees/sing" passages and complete the frame aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_009', difficulty: 'standard',
          question: 'Irony and paradox in \'On the Face of It\' — where opposite things are both true.',
          hint: 'If stuck, return to **c12_eng_v_cbse_05_004** (Derry\'s character) and.',
          misconception: 'Students often confuse *symbolism* with *metaphor* and treat every object as a symbol.',
          parts: [
                { id: 'a', prompt: 'ANALYZE: Compare the symbolic function of Mr Lamb\'s tin leg and Derry\'s burned face.', answer: 'Mr Lamb\'s tin leg is visible but concealed by trousers',
                  options: ['Mr Lamb\'s tin leg is visible but concealed by trousers', 'Both have disabilities so they understand each other'],
                  hint: 'If stuck, return to **c12_eng_v_cbse_05_004** (Derry\'s character) and **c12_eng_v_cbse_05_005** (Mr.',
                  misconception: 'Students often confuse *symbolism* with *metaphor* and treat every object as a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If the student cannot distinguish irony from coincidence or symbolism from arbitrary association: 1.', 'Revisit **c12_eng_v_cbse_05_008** (Imagery and Metaphor) — practice identifying *literal* vs *figurative* language.', 'Use the "Irony Triangle" tool: For any moment, write (a) What is expected?', '(b) What actually happens?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_010', difficulty: 'standard',
          question: 'Key vocabulary of \'On the Face of It\' — the words and phrases you must know.',
          hint: 'If unsure how a word functions thematically, return to **c12_eng_v_cbse_05_006 (Theme.',
          misconception: '**Misconception**: "Vocabulary in context means guessing the meaning from surrounding words — like.',
          parts: [
                { id: 'a', prompt: 'In Scene One, Mr Lamb says: "Some call them weeds. If you like, then....a weed garden, that. There\'s fruit and there are flowers, and trees and herbs.', answer: '"Weed" connotes **unwanted, invasive, worthless**',
                  options: ['"Weed" connotes **unwanted, invasive, worthless**', 'A wrong answer (e.g'],
                  hint: 'If unsure how a word functions thematically, return to **c12_eng_v_cbse_05_006 (Theme: Primary.',
                  misconception: '**Misconception**: "Vocabulary in context means guessing the meaning from surrounding words — like a fill-in-the-blank." **Why it\'s.' },
                { id: 'b', prompt: 'Compare the words "**peculiar**" (used by Derry: "You\'re....peculiar.', answer: '- **Peculiar**: Connotes **unusual, distinctive, intriguing**',
                  options: ['- **Peculiar**: Connotes **unusual, distinctive, intriguing**', 'they mean the same'],
                  hint: 'If unsure how a word functions thematically, return to **c12_eng_v_cbse_05_006 (Theme: Primary.',
                  misconception: '**Misconception**: "Vocabulary in context means guessing the meaning from surrounding words — like a fill-in-the-blank." **Why it\'s.' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['If a student cannot distinguish denotation/connotation or link words to themes: 1.', '**Revisit c12_eng_v_cbse_05_004 (Character Analysis: Protagonist)** — trace Derry\'s key speeches; highlight 5 words.', '**Revisit c12_eng_v_cbse_05_008 (Literary Devices: Imagery and Metaphor)** — identify 3 metaphors where word choice.', '**Re-diagnostic**: Give the student Mr Lamb\'s "weed" speech (Scene One) and ask: "List 3 words whose connotation shifts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_011', difficulty: 'standard',
          question: 'Language and style in \'On the Face of It\' — how the writer chose words.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Grammar: Language Usage in the Text".',
          misconception: 'Students believe "grammar in literature" means finding errors or labeling parts of speech (noun, verb, tense).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how Mr Lamb\'s use of imperative sentences ("Mind the apples," "Look over there") differs in function from Derry\'s use.', answer: 'Mr Lamb\'s imperatives guide attention outward',
                  options: ['Mr Lamb\'s imperatives guide attention outward', 'grammar in literature'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Grammar: Language Usage in the Text".',
                  misconception: 'Students believe "grammar in literature" means finding errors or labeling parts of speech (noun, verb, tense).' }
          ],
            remediations: { 'grammar-in-literature-means-finding': { steps: ['Have the student read aloud Derry\'s first 10 speeches — physically hearing the fragments and ellipses makes the pattern.', 'Give them a "translated" version where all fragments are corrected to standard sentences; ask them to compare emotional.', 'Assign: "Find three places where a character interrupts their own sentence with \'...\' and explain what the character.', 'Re-test with Diagnostic Question 3 (rewrite task) — if they still only fix grammar, repeat step 2 with a new passage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension of \'On the Face of It\' — questions answered straight from.',
          hint: 'If stuck on "where is this in the text?", return to c12_eng_v_cbse_05_002 (Plot) and.',
          misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What does Mr Lamb say about the gate to his garden?" Explain your reasoning in one sentence.', answer: 'This is a **literal** question',
                  options: ['This is a **literal** question', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck on "where is this in the text?", return to c12_eng_v_cbse_05_002 (Plot) and rebuild the.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this new question: "What evidence in Scene One shows Mr Lamb is not frightened by Derry\'s appearance?" Provide two.', answer: '**Literal quote**: Mr Lamb says, "Not the whole of you',
                  options: ['**Literal quote**: Mr Lamb says, "Not the whole of you', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck on "where is this in the text?", return to c12_eng_v_cbse_05_002 (Plot) and rebuild the.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".' },
                { id: 'c', prompt: 'Analyse the following student answer to the NCERT question "In which section does Mr Lamb display signs of loneliness?" and identify *two* specific weaknesses.', answer: 'Weakness 1: **Contradictory evidence used as proof**',
                  options: ['Weakness 1: **Contradictory evidence used as proof**', 'reference-to-context', 'inferential', 'guessing'],
                  hint: 'If stuck on "where is this in the text?", return to c12_eng_v_cbse_05_002 (Plot) and rebuild the.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion".' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['If a student cannot distinguish question types or builds inferences without textual anchors: 1.', '**Revisit c12_eng_v_cbse_05_002 (Plot) and c12_eng_v_cbse_05_004 (Protagonist)** — map every major event to the exact.', '**Practice the "Three-Column Drill"**: Column A = Question, Column B = Literal Quote(s), Column C = Inference Chain.', 'Do this for all 4 NCERT "Reading with Insight" questions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
