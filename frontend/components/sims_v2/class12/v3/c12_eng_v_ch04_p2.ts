import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch04_p2: SimDef = {
    id: 'v3_c12_eng_v_ch04_p2',
    title: 'The Enemy · Part 2/3',
    subtitle: 'The scalpel or the state — a doctor\'s wartime third option',
    classLevel: 12, subject: 'eng_v', topic: 'The Enemy · Part 2/3',
    chapters: ['c12_eng_v_ch04'],
    nodeIds: ['c12_eng_v_cbse_04_007', 'c12_eng_v_cbse_04_008', 'c12_eng_v_cbse_04_009', 'c12_eng_v_cbse_04_010', 'c12_eng_v_cbse_04_011', 'c12_eng_v_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'War-fiction analyst', intro: 'An enemy soldier bleeds on a Japanese doorstep. Everything the doctor knows says save him; everything his nation demands says hand him over.', goal: 'Read The Enemy inside its WWII context — medical ethics versus treason, and the moral agency that escapes the binary.' },
    discovery: {
        question: '1944 Japan: a wounded American POW washes up at Dr. Sadao\'s door. Treating him is treason under military law — yet the Geneva Convention requires it. The \'doctor or patriot\' framing hides what?',
        options: ['A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely', 'Nothing — it\'s genuinely two options', 'Treason is always wrong', 'Medicine outranks everything'],
        answer: 'A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely',
        hook: 'Pearl S. Buck wrote this DURING the war — an American raised in China who could see both sides without caricature. Judging Sadao by peacetime logic (\'just call the police\') misses that the police meant execution; the dilemma only works inside its history.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas or motifs in a literary work that support, contrast with, or add complexity to the primary theme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand in Sadao\'s surgery under wartime law: weigh the oath against the statute, watch Hana and the servants choose sides, and test whether a man can be patriot, doctor and human at once.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are a doctor in a war zone and an injured enemy soldier is brought to you.',
            decisions: [{ prompt: 'Define "secondary theme" in literature and name one secondary theme from "The Enemy" other than the primary theme of duty vs.', options: [
                { text: 'A secondary theme is a recurring idea that supports or complicates the main theme', outcome: 'A secondary theme is a recurring idea that supports or complicates the main theme.' },
                { text: 'the theme is war', outcome: 'Not quite — Students often treat secondary themes as a random list of topics ("war," "love," "family") rather.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'the theme is love', outcome: 'Not quite — Students often treat secondary themes as a random list of topics ("war," "love," "family") rather.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are a film director adapting "The Enemy" into a movie.',
            decisions: [{ prompt: 'Define imagery and metaphor. Give one example of each from "The Enemy".', options: [
                { text: 'Imagery: descriptive language appealing to senses', outcome: 'Imagery: descriptive language appealing to senses. Example: "The surf beyond the beach was spiked.' },
                { text: 'Those islands yonder, they are the stepping stones to the future for Japan', outcome: 'Not quite — Students often think imagery is only visual description. They miss auditory, tactile, olfactory.', reveals: 'imagery-is-only-visual-description' },
                { text: 'stepping stones', outcome: 'Not quite — Students often think imagery is only visual description. They miss auditory, tactile, olfactory.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the scene where Sadao operates on the American soldier and encounter the word **"stanch"**: *"his trained hands seemed of their own.',
            decisions: [{ prompt: '**REMEMBER:** List any four words from "The Enemy" that are specific to Japanese culture or setting (e.g., clothing, architecture, customs).', options: [
                { text: '**Correct Answer:** 1', outcome: '**Correct Answer:** 1. **haori** – a loose outer garment worn over the kimono (explicitly defined.' },
                { text: 'surgeon', outcome: 'Not quite — **Misconception:** "Vocabulary in Context means memorizing the dictionary definition of difficult.', reveals: 'misconception-vocabulary-in-context-means' },
                { text: 'operation', outcome: 'Not quite — **Misconception:** "Vocabulary in Context means memorizing the dictionary definition of difficult.', reveals: 'misconception-vocabulary-in-context-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are writing a diary entry as Dr Sadao the night he finds the wounded soldier.',
            decisions: [{ prompt: 'Identify the tense used in the sentence: "He had been sent at twenty-two to America to learn all that could be learned of surgery and.', options: [
                { text: 'Past perfect passive: "had been sent"', outcome: 'Past perfect passive: "had been sent". It indicates an action completed before another past time.' },
                { text: 'was sent', outcome: 'Not quite — Students often think "should" in conditionals always means advice (e.g., "You should study").', reveals: 'should-in-conditionals-always-means' },
                { text: 'should', outcome: 'Not quite — Students often think "should" in conditionals always means advice (e.g., "You should study").', reveals: 'should-in-conditionals-always-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE exam hall holding the "The Enemy" extract: Sadao finds the wounded American on the shore.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What was the nationality of the wounded man washed ashore?" Explain.', options: [
                { text: 'This is a LITERAL question', outcome: 'This is a LITERAL question. The text explicitly states: "A white man!" and "A sailor...' },
                { text: 'finding details', outcome: 'Not quite — Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind").', reveals: 'inferential-guesswork-and-write-personal' },
                { text: 'interpreting details', outcome: 'Not quite — Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind").', reveals: 'inferential-guesswork-and-write-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re a first-aid volunteer at a zonal tournament. An opposing team\'s player — who earlier got your teammate fouled out and is widely hated by your side — collapses near your post, bleeding and alone. Your teammates mutter \'let their own people handle him.\'',
            decisions: [{ prompt: 'What would Sadao\'s choice in \'The Enemy\' prescribe?', options: [
                { text: 'Treat him first and quietly — Sadao operates on the American POW because the surgeon\'s duty to a bleeding human overrides the wartime label \'enemy\'; afterwards you can let the officials sort out the politics, as Sadao lets the General\'s system handle the rest.', outcome: 'The story\'s climax is the surgery itself — \'My friend\' murmured to an enemy under the knife — and its resolution is deliberately quiet: doing the human thing without needing to be seen as a hero or a traitor.' },
                { text: 'Call his side\'s medical tent and wait — he\'s their responsibility.', outcome: 'That\'s the servants\' and Yumi\'s position in the story — the refusal that makes Sadao act alone; the chapter treats deferring to the group as the failure, not the safe middle path.', reveals: 'their-problem-not-mine' },
                { text: 'Treat him but report him to the organisers afterwards to stay safe.', outcome: 'That reverses the story\'s architecture — Sadao provides the boat and signal code instead of the General\'s assassins; the chapter\'s point is that professional mercy isn\'t complete until the person is out of danger, not merely bandaged.', reveals: 'mercy-then-report' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hold an ethical dilemma inside its historical moment — and spot when a binary question is built to exclude the answer that matters.',
            decisions: [{ prompt: 'What comes next? The Enemy · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Enemy · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas or motifs in a literary work that.',
          hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c12_eng_v_cbse_04_006) and.',
          misconception: 'Students often treat secondary themes as a random list of topics ("war," "love," "family") rather than as *arguments.',
          parts: [
                { id: 'a', prompt: 'Analyze how the secondary theme of **individual conscience vs. societal pressure** is dramatized through Hana\'s transformation from fear to action.', answer: 'Hana\'s arc: (1) Initial fear/prejudice: "He was the first she had seen',
                  options: ['Hana\'s arc: (1) Initial fear/prejudice: "He was the first she had seen', 'she helps him', 'A secondary theme is family'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c12_eng_v_cbse_04_006) and practice.',
                  misconception: 'Students often treat secondary themes as a random list of topics ("war," "love," "family") rather than as *arguments the text makes* about.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish primary/secondary themes or write theme statements: (1) Have them re-read the "Reading.', '(2) Give them a 3-column table: Column A = Topic (e.g., Prejudice), Column B = Textual Evidence (quote + page), Column.', '(3) Model one row together: Topic: Racial Hatred | Evidence: Yumi\'s "I have never washed a white man" (p.31) |.', '(4) Assign them to complete two rows independently, then peer-review using the rubric: "Does Column C express.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as a random list of topics ("war," "love," "family") rather than as *arguments.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line poetic stanza or a 50-word micro-fiction piece that captures the secondary theme of **the dehumanizing effect of war on ordinary people**.', answer: '*Micro-fiction example:* "The gardener pinched a chrysanthemum bud',
                  options: ['*Micro-fiction example:* "The gardener pinched a chrysanthemum bud', 'A secondary theme is family'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c12_eng_v_cbse_04_006) and practice.',
                  misconception: 'Students often treat secondary themes as a random list of topics ("war," "love," "family") rather than as *arguments the text makes* about.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish primary/secondary themes or write theme statements: (1) Have them re-read the "Reading.', '(2) Give them a 3-column table: Column A = Topic (e.g., Prejudice), Column B = Textual Evidence (quote + page), Column.', '(3) Model one row together: Topic: Racial Hatred | Evidence: Yumi\'s "I have never washed a white man" (p.31) |.', '(4) Assign them to complete two rows independently, then peer-review using the rubric: "Does Column C express.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
          hint: 'Review the definitions and examples of imagery (all five senses) and metaphor (direct.',
          misconception: 'Students often think imagery is only visual description. They miss auditory, tactile, olfactory, and gustatory imagery.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor. Give one example of each from "The Enemy".', answer: 'Imagery: descriptive language appealing to senses',
                  options: ['Imagery: descriptive language appealing to senses', 'Those islands yonder, they are the stepping stones to the future for Japan', 'stepping stones', 'imagery is only visual description'],
                  hint: 'Review the definitions and examples of imagery (all five senses) and metaphor (direct comparison).',
                  misconception: 'Students often think imagery is only visual description. They miss auditory, tactile, olfactory, and gustatory imagery.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['If the student cannot identify non-visual imagery, have them reread the operation scene (pages 32-35) and list every.', 'For metaphor confusion, give them a T-chart: Column A "Literal term", Column B "Compared to", Column C "Meaning".', 'Practice with "stepping stones", "cardinal sin", "sea caught him".', 'Then re-attempt diagnostic question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review c12_eng_v_cbse_04_004 for Sadao\'s dual identity (Japanese patriot.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', 'The "Before You Read" context provides the historical, cultural, and ethical framework', 'Plot and narrative structure refers to the deliberate arrangement of story events', 'Setting in "The Enemy" refers to the specific time (World War II), place (Japanese'],
                  hint: 'If stuck, review c12_eng_v_cbse_04_004 for Sadao\'s dual identity (Japanese patriot.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony types or identify symbols with evidence: (1) Have them create a three-column.', '(2) Re-read only the General-Sadao dialogue (pages 39-40) and the escape scene (pages 42-44) with a highlighter.', '(3) Practice with a simpler text first — use the Class 10 "Letter to God" node (c10_engl_cbse_01_007) where Lencho\'s.', '(4) Return to this node and re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on Step 3 (Analyze Modifiers), review **c9_engl_ch1_008** (Class 9 "Vocabulary.',
          misconception: '**Misconception:** "Vocabulary in Context means memorizing the dictionary definition of difficult words listed in the.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** List any four words from "The Enemy" that are specific to Japanese culture or setting (e.g., clothing, architecture, customs) and give their.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'surgeon', 'operation', 'bullet'],
                  hint: 'If stuck on Step 3 (Analyze Modifiers), review **c9_engl_ch1_008** (Class 9 "Vocabulary in Context.',
                  misconception: '**Misconception:** "Vocabulary in Context means memorizing the dictionary definition of difficult words listed in the textbook glossary.".' },
                { id: 'b', prompt: '**ANALYZE:** Compare the connotations of **"stanch"** (para 10) and **"staunch"** (a common confusion).', answer: '**Correct Answer:** "Stanch" (verb) = to stop/check flow (blood, tears)',
                  options: ['**Correct Answer:** "Stanch" (verb) = to stop/check flow (blood, tears)', 'language usage'],
                  hint: 'If stuck on Step 3 (Analyze Modifiers), review **c9_engl_ch1_008** (Class 9 "Vocabulary in Context.',
                  misconception: '**Misconception:** "Vocabulary in Context means memorizing the dictionary definition of difficult words listed in the textbook glossary.".' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['**Immediate:** Re-read the "Walkthrough" 5-step protocol (Locate → Object/Subject → Modifiers → Infer → Verify).', '**Targeted Practice:** Take the 12 key words from the *Worked Examples* below.', 'For each, write: (a) the exact sentence from the text, (b) the part of speech in that sentence, (c) the contextual.', '**Re-diagnostic:** Attempt **Diagnostic Question 3** and **4** again without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how grammatical.',
          hint: 'If stuck, review Class 11 grammar nodes on conditionals and reported speech.',
          misconception: 'Students often think "should" in conditionals always means advice (e.g., "You should study").',
          parts: [
                { id: 'a', prompt: 'Identify the tense used in the sentence: "He had been sent at twenty-two to America to learn all that could be learned of surgery and medicine." Name the tense.', answer: 'Past perfect passive: "had been sent"',
                  options: ['Past perfect passive: "had been sent"', 'was sent', 'should', 'You should study'],
                  hint: 'If stuck, review Class 11 grammar nodes on conditionals and reported speech (c11_eng_h_cbse_01_011.',
                  misconception: 'Students often think "should" in conditionals always means advice (e.g., "You should study").' },
                { id: 'b', prompt: 'Rewrite the following direct speech from the text into reported speech: Hana said, "I cannot bear for you to touch him." Then explain the changes in tense.', answer: 'Hana said that she could not bear for him to touch him',
                  options: ['Hana said that she could not bear for him to touch him', 'cannot', 'should', 'You should study'],
                  hint: 'If stuck, review Class 11 grammar nodes on conditionals and reported speech (c11_eng_h_cbse_01_011.',
                  misconception: 'Students often think "should" in conditionals always means advice (e.g., "You should study").' }
          ],
            remediations: { 'should-in-conditionals-always-means': { steps: ['Review the three conditional types with emphasis on second conditional using "should/would" for hypothetical.', 'Locate all conditionals in the text (there are several) and classify them.', 'Practice converting direct speech to reported speech using the text\'s dialogues.', 'Re-attempt diagnostic questions 2 and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck, review c11_eng_h_cbse_01_012 (Class 11 Hornbill Comprehension) — specifically.',
          misconception: 'Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind") instead.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What was the nationality of the wounded man washed ashore?" Explain your classification.', answer: 'This is a LITERAL question',
                  options: ['This is a LITERAL question', 'finding details', 'interpreting details', 'inferential = guesswork'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_012 (Class 11 Hornbill Comprehension) — specifically the.',
                  misconception: 'Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind") instead of text-anchored deductions.' },
                { id: 'b', prompt: 'Classify this question and justify: "Why did the old gardener say, \'If the master heals what the gun did and what the sea did they will take revenge on us\'?".', answer: 'This is an INFERENTIAL question',
                  options: ['This is an INFERENTIAL question', 'prejudice masquerading as tradition', 'inferential = guesswork', 'I think Sadao is kind'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_012 (Class 11 Hornbill Comprehension) — specifically the.',
                  misconception: 'Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind") instead of text-anchored deductions.' },
                { id: 'c', prompt: 'ANALYZE the difference in inferential depth between these two questions on the same scene (Sadao operating): A) "What instrument did Sadao use to locate the.', answer: 'Question A is LITERAL (answer: "exploring instrument" / probe)',
                  options: ['Question A is LITERAL (answer: "exploring instrument" / probe)', 'inferential = guesswork', 'I think Sadao is kind', 'Sadao is kind") instead of text-anchored deductions'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_012 (Class 11 Hornbill Comprehension) — specifically the.',
                  misconception: 'Students believe "inferential = guesswork" and write personal opinions ("I think Sadao is kind") instead of text-anchored deductions.' }
          ],
            remediations: { 'inferential-guesswork-and-write-personal': { steps: ['If a student misclassifies ≥2 of the 6 diagnostics: (1) Have them re-read the "Reading with Insight" questions at the.', '(2) Use the colour-coding drill: yellow highlighter for explicit facts in the NCERT text, blue for implied meanings.', '(3) Practice 5 mixed questions from c11_eng_h_cbse_01_012 (Class 11 Hornbill comprehension node) with the 3-step.', '(4) Re-attempt DIAGNOSTIC_QUESTION_3 and 4 as a paired exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
