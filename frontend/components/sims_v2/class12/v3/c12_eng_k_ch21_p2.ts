import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch21_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch21_p2: SimDef = {
    id: 'v3_c12_eng_k_ch21_p2',
    title: 'Broken Images (Drama) · Part 2/3',
    subtitle: 'Her bestselling self walked off the screen — to cross-examine her',
    classLevel: 12, subject: 'eng_k', topic: 'Broken Images (Drama) · Part 2/3',
    chapters: ['c12_eng_k_ch21'],
    nodeIds: ['c12_eng_k_cbse_21_007', 'c12_eng_k_cbse_21_008', 'c12_eng_k_cbse_21_009', 'c12_eng_k_cbse_21_010', 'c12_eng_k_cbse_21_011', 'c12_eng_k_cbse_21_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian drama critic', intro: 'A writer sits for an interview and gets interrogated by her own televised image. Karnad turns language politics into theatre.', goal: 'Read Broken Images through bilingual identity, media\'s mirror and the English-vs-mother-tongue debate.' },
    discovery: {
        question: 'A Kannada writer\'s English novel wins global fame — and her own televised image walks off the screen to accuse her of betrayal. What is the Image really prosecuting?',
        options: ['Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image', 'Plagiarism — the Image combs the English novel for passages lifted from Kannada', 'The channel\'s editing bias — the accusation is manufactured by producers\' framing', 'Stage fright dramatised — the walking image is only her nerves before broadcast'],
        answer: 'Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image',
        hook: 'Karnad lived both tongues — Jnanpith laureate in Kannada and English — so the play\'s real debate is deeper than language: money, envy and who owns \'authentic Indian-ness.\' The studio\'s plasma screens aren\'t décor; the mediated self is the stage. Eliot\'s \'heap of broken images\' is the thesis.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in a literary work are the subordinate but significant thematic strands that run parallel to the primary theme, enriching the text by exploring complementary human experiences.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_21_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the interrogation Manjula can\'t escape: weigh the announcer\'s roll-call of bilingual Kannada greats, decode what the Image wants, and judge whether writing in English is betrayal — or inheritance.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are watching a talk show where a celebrity gives a polished, rehearsed speech — but then the broadcast ends, the camera *supposedly* turns off, and.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a literary text, and why can a play have multiple secondary themes.', options: [
                { text: 'A primary theme is the central, unifying idea that structures the entire work', outcome: 'A primary theme is the central, unifying idea that structures the entire work — every major plot.' },
                { text: 'secondary themes are less important so we can ignore them', outcome: 'Not quite — Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a play where the only "action" is a woman talking to a TV screen — and then the screen talks back.',
            decisions: [{ prompt: 'Define "organic imagery" and give one example from Manjula\'s description of her sister Malini\'s illness in the play.', options: [
                { text: 'Organic imagery describes internal bodily sensations (hunger, thirst, nausea, pain,', outcome: 'Organic imagery describes internal bodily sensations (hunger, thirst, nausea, pain, fatigue).' },
                { text: 'wheel-chair', outcome: 'Not quite — Students often treat *every* descriptive phrase as "imagery" and *every* comparison as "metaphor.".', reveals: 'students-often-treat-every-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine watching a celebrity interview where the star claims "I don\'t care about fame" while checking their phone for Twitter mentions.',
            decisions: [{ prompt: 'Define **dramatic irony** and give one example from *Broken Images* where the audience knows something that Manjula does not initially.', options: [
                { text: 'Dramatic irony occurs when the audience possesses information that a character lacks', outcome: 'Dramatic irony occurs when the audience possesses information that a character lacks.' },
                { text: 'dramatic irony', outcome: 'Not quite — Students often treat the "Image" as a supernatural ghost or a sci-fi glitch rather than.', reveals: 'students-often-treat-the-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re watching Manjula\'s TV interview — she speaks in polished, complete sentences with rhetorical flourishes ("The advance she received...',
            decisions: [{ prompt: 'Identify the grammatical term for the sentence structure in Manjula\'s line: "My speech will last exactly ten minutes. I have timed it...', options: [
                { text: 'The structure exemplifies **ellipsis** (omission of understood words) and **fragmented', outcome: 'The structure exemplifies **ellipsis** (omission of understood words) and **fragmented syntax**.' },
                { text: 'simple sentences', outcome: 'Not quite — Students often believe "language usage in a play" means identifying figures of speech (metaphor.', reveals: 'language-usage-in-a-play' },
                { text: 'language usage in a play', outcome: 'Not quite — Students often believe "language usage in a play" means identifying figures of speech (metaphor.', reveals: 'language-usage-in-a-play' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re watching Manjula Nayak on television — she says she "loves her sister" but her Image on screen asks, "Was it love or guilt?" How do you answer.',
            decisions: [{ prompt: 'Identify the two question types: "What reason does Manjula give for writing her novel in English?" and "Why does the playwright make.', options: [
                { text: 'First question is literal (text states: "it burst out in English', outcome: 'First question is literal (text states: "it burst out in English... surprised even me").' },
                { text: 'inferential', outcome: 'Not quite — Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous".', reveals: 'students-treat-inferential-as-guessing' },
                { text: 'guessing', outcome: 'Not quite — Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous".', reveals: 'students-treat-inferential-as-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An Indian novelist wins a big English-language prize and starts publicly disowning her earlier vernacular books as \'practice work in a smaller language\'.',
            decisions: [{ prompt: 'What would Karnad\'s Broken Images say?', options: [
                { text: 'That English success is legitimate but the denial fractures the self — the play interrogates a bilingual writer who must hold both languages without ranking one as the betrayal and the other as the coronation.', outcome: 'The \'broken images\' are the selves she can\'t integrate; prestige in one tongue doesn\'t require disowning the other.' },
                { text: 'She\'s right — the English prize proves which language mattered.', outcome: 'That\'s the hierarchy the play dismantles; conflating market prestige with literary worth is the wound, not the win.', reveals: 'english-equals-prestige' },
                { text: 'She\'s a traitor — writing in English at all is the betrayal.', outcome: 'Karnad lists a whole tradition of bilingual Indian writers; the guilt-trip is as false as the triumphalism.', reveals: 'english-is-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a TV studio as a courtroom for the bilingual self — and see India\'s language politics staged as one woman\'s argument with her own image.',
            decisions: [{ prompt: 'What comes next? Broken Images (Drama) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Broken Images (Drama) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_007', difficulty: 'standard',
          question: 'Secondary themes in a literary work are the subordinate but significant.',
          hint: 'If stuck, revisit the "Topic vs. Theme" mini-lesson in c11_eng_h_cbse_01_007 and practise.',
          misconception: 'Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather than *thematic.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a primary theme and a secondary theme in a literary text, and why can a play have multiple secondary themes but only one primary.', answer: 'A primary theme is the central, unifying idea that structures the entire work',
                  options: ['A primary theme is the central, unifying idea that structures the entire work', 'secondary themes are less important so we can ignore them'],
                  hint: 'If stuck, revisit the "Topic vs. Theme" mini-lesson in c11_eng_h_cbse_01_007 and practise.',
                  misconception: 'Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather than *thematic arguments* the play makes.' },
                { id: 'b', prompt: 'Apply the concept of "artistic appropriation" to Manjula\'s novel *The River Has No Memories*.', answer: 'Step 1: Identify the claim',
                  options: ['Step 1: Identify the claim', 'it\'s fine because she dedicated it to her', 'narrative necessity… a villain as a counterpoint'],
                  hint: 'If stuck, revisit the "Topic vs. Theme" mini-lesson in c11_eng_h_cbse_01_007 and practise.',
                  misconception: 'Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather than *thematic arguments* the play makes.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish topic from theme, assign this 3-step remediation: (1) Re-read the Image–Manjula.', '232–233 (Malini\'s "best of everything" vs.', 'Manjula\'s "reconciled to being second best").', '(2) Complete a two-column table: Column A = "What the play *shows* about disability/family" (evidence), Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather than *thematic.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Pramod Murty is portrayed as the ideal supportive husband, and his absence in the US at the novel\'s launch is irrelevant to the play\'s.', answer: 'Refute',
                  options: ['Refute', 'supportive'],
                  hint: 'If stuck, revisit the "Topic vs. Theme" mini-lesson in c11_eng_h_cbse_01_007 and practise.',
                  misconception: 'Students often treat "secondary themes" as a *list of topics* (disability, marriage, fame) rather than *thematic arguments* the play makes.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot distinguish topic from theme, assign this 3-step remediation: (1) Re-read the Image–Manjula.', '232–233 (Malini\'s "best of everything" vs.', 'Manjula\'s "reconciled to being second best").', '(2) Complete a two-column table: Column A = "What the play *shows* about disability/family" (evidence), Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review the "sensory modality checklist" (V/A/T/O/G) from c7_engl_ch01_008 and.',
          misconception: 'Students often treat *every* descriptive phrase as "imagery" and *every* comparison as "metaphor." In *Broken Images*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" is a preparatory section that equips students', 'Plot and narrative structure in "Broken Images" refers to the deliberate arrangement of', 'Setting in drama refers to the time, place, and physical environment where the action'],
                  hint: 'If stuck, review the "sensory modality checklist" (V/A/T/O/G) from c7_engl_ch01_008 and practice.',
                  misconception: 'Students often treat *every* descriptive phrase as "imagery" and *every* comparison as "metaphor." In *Broken Images*, "I was a long jump.' }
          ],
            remediations: { 'students-often-treat-every-descriptive': { steps: ['Re-read the opening stage directions and Manjula\'s first speech.', 'Highlight **only** words triggering sight/sound/touch/smell/taste/internal sensation.', 'For each highlighted word, label the sense modality (V/A/T/O/G).', 'Revisit c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) and c7_engl_ch01_008 (Literary Devices: Imagery and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_009', difficulty: 'standard',
          question: 'Irony in *Broken Images* is a literary device where the intended meaning.',
          hint: 'If stuck, revisit the definition of dramatic irony in Class 11 Hornbill Chapter 1 (node.',
          misconception: 'Students often treat the "Image" as a supernatural ghost or a sci-fi glitch rather than a **dramatized symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in *Broken Images* is a literary device where the intended meaning of words or',
                  options: ['Irony in *Broken Images* is a literary device where the intended meaning of words or', '"Before You Read: Context and Background" is a preparatory section that equips students', 'Plot and narrative structure in "Broken Images" refers to the deliberate arrangement of', 'Setting in drama refers to the time, place, and physical environment where the action'],
                  hint: 'If stuck, revisit the definition of dramatic irony in Class 11 Hornbill Chapter 1 (node.',
                  misconception: 'Students often treat the "Image" as a supernatural ghost or a sci-fi glitch rather than a **dramatized symbol of Manjula\'s divided self**.' }
          ],
            remediations: { 'students-often-treat-the-image': { steps: ['Re-read the "Thinking about the Play" questions in the textbook (pp.', '237-238), focusing on Q1 (genuineness of love) and Q3 (Image\'s comment on Malini).', 'Review node **c12_eng_k_cbse_21_004** (Protagonist analysis) to re-establish Manjula\'s psychology.', 'Watch a 5-minute clip of the NSD staging (YouTube: "Broken Images Girish Karnad") to see the Image performed as.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the ability to determine the meaning.',
          hint: 'If stuck, return to c12_eng_k_cbse_21_002 (Plot) and map the 5 key vocabulary words.',
          misconception: 'Students often treat "Vocabulary in Context" as **memorizing definitions of difficult words** (e.g., "meningomyelocele.',
          parts: [
                { id: 'a', prompt: 'Manjula says: "The advance I received for my novel... helped me resign my job and concentrate on writing.', answer: '**Correct Answer:** "Jealousy" connotes a personal, emotional resentment',
                  options: ['**Correct Answer:** "Jealousy" connotes a personal, emotional resentment', 'negative feeling about success'],
                  hint: 'If stuck, return to c12_eng_k_cbse_21_002 (Plot) and map the 5 key vocabulary words to the 5.',
                  misconception: 'Students often treat "Vocabulary in Context" as **memorizing definitions of difficult words** (e.g., "meningomyelocele = spinal defect").' },
                { id: 'b', prompt: 'Analyze the word "halcyon" in Manjula\'s line: "Those were the happiest days of my life!', answer: '**Correct Answer:** "Halcyon" denotes a period of peace and happiness, but its',
                  options: ['**Correct Answer:** "Halcyon" denotes a period of peace and happiness, but its', 'peaceful'],
                  hint: 'If stuck, return to c12_eng_k_cbse_21_002 (Plot) and map the 5 key vocabulary words to the 5.',
                  misconception: 'Students often treat "Vocabulary in Context" as **memorizing definitions of difficult words** (e.g., "meningomyelocele = spinal defect").' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['**Re-read the play** marking every word that feels "heavy," "foreign," or "deliberate" (not just unknown words — also.', '**For each marked word**, write: (a) Dictionary meaning, (b) What the *character* means by it in that moment, (c) What.', '**Revisit node c12_eng_k_cbse_21_009 (Irony and Symbolism)** and c12_eng_k_cbse_21_006 (Primary Theme) to see how.', '**Re-diagnostic:** Take Diagnostic Questions 2, 4, and 5 again — they test the exact shift from definition to dramatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the specific grammatical patterns.',
          hint: 'If stuck on register analysis, revisit c11_eng_h_cbse_01_011 (Portrait of a Lady — formal.',
          misconception: 'Students often believe "language usage in a play" means identifying figures of speech (metaphor, irony) and overlook.',
          parts: [
                { id: 'a', prompt: 'Analyze how the stage direction "(Laughs.)" functions grammatically and pragmatically when it appears mid-utterance versus at utterance-end.', answer: 'Mid-utterance "(Laughs.)" acts as a **parenthetical discourse marker** signaling',
                  options: ['Mid-utterance "(Laughs.)" acts as a **parenthetical discourse marker** signaling', 'stage directions', 'language usage in a play'],
                  hint: 'If stuck on register analysis, revisit c11_eng_h_cbse_01_011 (Portrait of a Lady — formal vs.',
                  misconception: 'Students often believe "language usage in a play" means identifying figures of speech (metaphor, irony) and overlook **syntax.' }
          ],
            remediations: { 'language-usage-in-a-play': { steps: ['If the student cannot distinguish register shift from mere "tone change," have them: (1) Transcribe 5 lines each from.', '(2) Color-code: passive verbs (blue), imperatives (red), first-person pronouns (green), contractions (yellow), Kannada.', '(3) Count frequencies per speaker.', '(4) Write one claim per color: "The Announcer uses 4 passives; Manjula uses 0 in her monologue → institutional vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck on inferential leaps, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) — the.',
          misconception: 'Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous" without anchoring in the.',
          parts: [
                { id: 'a', prompt: 'Identify the two question types: "What reason does Manjula give for writing her novel in English?" and "Why does the playwright make Manjula\'s Image challenge.', answer: 'First question is literal (text states: "it burst out in English',
                  options: ['First question is literal (text states: "it burst out in English', 'inferential', 'guessing', 'I feel Manjula is jealous'],
                  hint: 'If stuck on inferential leaps, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) — the Image\'s.',
                  misconception: 'Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous" without anchoring in the Image\'s line "What.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "How does the Announcer\'s introduction establish the central conflict of language politics before Manjula speaks?" Provide.', answer: 'Point: The Announcer frames Manjula\'s English novel as "betrayal" of Kannada',
                  options: ['Point: The Announcer frames Manjula\'s English novel as "betrayal" of Kannada', 'textual evidence', 'inferential', 'guessing'],
                  hint: 'If stuck on inferential leaps, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) — the Image\'s.',
                  misconception: 'Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous" without anchoring in the Image\'s line "What.' },
                { id: 'c', prompt: 'Analyze how the stage direction "The red light switches off. She smiles contentedly. Whew! That\'ll get them. Good.', answer: 'Literal: Manjula is relieved the broadcast ended',
                  options: ['Literal: Manjula is relieved the broadcast ended', 'inferential', 'guessing', 'I feel Manjula is jealous'],
                  hint: 'If stuck on inferential leaps, revisit c12_eng_k_cbse_21_009 (Irony and Symbolism) — the Image\'s.',
                  misconception: 'Students treat "inferential" as "guessing" and write opinions like "I feel Manjula is jealous" without anchoring in the Image\'s line "What.' }
          ],
            remediations: { 'students-treat-inferential-as-guessing': { steps: ['If a student cannot separate literal from inferential: Step 1 — Give them the Announcer\'s speech (lines 1-30).', 'Ask: "Highlight every FACT (literal) in yellow, every OPINION/ACCUSATION (inferential trigger) in pink." Step 2 — For.', 'Step 3 — Model answering one using only yellow highlights as evidence.', 'Step 4 — Assign node c12_eng_k_cbse_21_002 (Plot) and c12_eng_k_cbse_21_004 (Protagonist) for re-study, then re-attempt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
