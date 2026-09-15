import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p2: SimDef = {
    id: 'v3_c12_hin_a_ch07_p2',
    title: 'iafMr panzèkj \'kekZ xqysjh · Part 2/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'iafMr panzèkj \'kekZ xqysjh · Part 2/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_007', 'c12_hin_a_cbse_07_008', 'c12_hin_a_cbse_07_009', 'c12_hin_a_cbse_07_010', 'c12_hin_a_cbse_07_011', 'c12_hin_a_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, or messages that run parallel to the primary theme of a literary work, enriching the text by adding layers of meaning, highlighting contrasts, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting by a window during the first heavy monsoon shower — the smell of wet earth (mitti ki khushboo), the sound of droplets on tin roofs, the.',
            decisions: [{ prompt: 'Define \'imagery\' (बिंब/प्रतिबिंब) and \'metaphor\' (रूपक) in your own words, giving one example from daily life for each (not from the poem).', options: [
                { text: 'Imagery: Language that appeals to the senses (e.g., "The kitchen smelled of frying cumin', outcome: 'Imagery: Language that appeals to the senses (e.g., "The kitchen smelled of frying cumin and ghee".' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students treat every comparison in the poem as a metaphor. In "ckjgeklk", lines like *fcjg ckf<.', reveals: 'students-treat-every-comparison-in' },
                { text: 'lists only visual imagery reveals a narrow sensory understanding', outcome: 'Not quite — Students treat every comparison in the poem as a metaphor. In "ckjgeklk", lines like *fcjg ckf<.', reveals: 'students-treat-every-comparison-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re standing at your window in June — the sun is brutal, the air shimmers with heat, and you\'re desperate for rain.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, and give one example of each from daily life (not from the poem).', options: [
                { text: '**Correct answer:** Irony = contrast between expectation and reality (e.g., a fire', outcome: '**Correct answer:** Irony = contrast between expectation and reality (e.g., a fire station burning.' },
                { text: 'coincidence', outcome: 'Not quite — **Misconception:** "Irony is just sarcasm or saying the opposite of what you mean." **Why it\'s.', reveals: 'misconception-irony-is-just-sarcasm' },
                { text: 'raining on my wedding day', outcome: 'Not quite — **Misconception:** "Irony is just sarcasm or saying the opposite of what you mean." **Why it\'s.', reveals: 'misconception-irony-is-just-sarcasm' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp message from your grandmother in your mother tongue — you understand each word, but the *feeling* behind "थक गई हूँ" hits.',
            decisions: [{ prompt: 'What is the primary reason the poet uses dialect words like *nsol*, *fufl*, and *lhÅ* instead of standard Hindi equivalents like *din*.', options: [
                { text: 'Correct answer: To authentically capture the rural speaker\'s voice, cultural rootedness,', outcome: 'Correct answer: To authentically capture the rural speaker\'s voice, cultural rootedness, and.' },
                { text: 'to make the poem difficult', outcome: 'Not quite — Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them.', reveals: 'students-memorize-the-ncert-glossary' },
                { text: 'because old Hindi was different', outcome: 'Not quite — Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them.', reveals: 'students-memorize-the-ncert-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you open the textbook and see the poem *कचजगेळक* — the words look like Hindi but the endings are unfamiliar: *nsol, fufl, nwHkj, fg;k*.',
            decisions: [{ prompt: 'Identify the standard Modern Hindi equivalents of the following Braj Bhasha words from the poem: *nsol, fufl, nwHkj, fg;k, tukok*.', options: [
                { text: 'Correct: *nsol → fnol* (day), *fufl → jkf=k* (burning), *nwHkj → dfBu* (deep/intense),', outcome: 'Correct: *nsol → fnol* (day), *fufl → jkf=k* (burning), *nwHkj → dfBu* (deep/intense), *fg;k → ân;*.' },
                { text: 'old language', outcome: 'Not quite — Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct".', reveals: 'students-treat-braj-bhasha-forms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE exam hall and see Question 1: "vxgu ekl dh fo\'ks"krk crkrs gq, fojfg.kh (ukxerh) dh O;Fkk&dFkk dk fp=k.k vius \'kCnksa esa.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question in the CBSE Hindi.', options: [
                { text: 'A literal question asks for information explicitly written in the text (e.g., "What does', outcome: 'A literal question asks for information explicitly written in the text (e.g., "What does the.' },
                { text: 'both question types are answered by copying lines', outcome: 'Not quite — **Misconception:** "Inferential questions are just \'harder literal questions\' — if I read the text.', reveals: 'misconception-inferential-questions-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'What comes next? iafMr panzèkj \'kekZ xqysjh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — iafMr panzèkj \'kekZ xqysjh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, or messages that run.',
          hint: 'If stuck, review the primary theme of "ckjgeklk" (spiritual liberation through Guru\'s.',
          misconception: 'Students often think secondary themes are just \'sub-topics\' or \'less important topics\' that can be listed without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, motifs, or messages that run parallel to the',
                  options: ['Secondary themes are the underlying ideas, motifs, or messages that run parallel to the', '"Before You Read: Context and Background" is a preparatory step where students gather', 'Plot and narrative structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere in poetry refers to the time, place, and sensory environment'],
                  hint: 'If stuck, review the primary theme of "ckjgeklk" (spiritual liberation through Guru\'s grace) and.',
                  misconception: 'Students often think secondary themes are just \'sub-topics\' or \'less important topics\' that can be listed without analysis.' }
          ],
            remediations: { 'secondary-themes-are-just-sub': { steps: ['If a student cannot distinguish primary vs secondary themes or cannot trace a theme across stanzas: (1) Have them.', '(2) Ask: "Which of these does Kabir return to most?', 'Which one solves the problem?" — that\'s the primary theme.', '(3) For each other color, write one sentence: "This theme shows ___ and it pushes the seeker toward ___." (4) Practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_008', difficulty: 'standard',
          question: 'Imagery (प्रतिबिंब/बिंब) refers to the use of vivid, sensory language that.',
          hint: 'If stuck on vehicle/tenor, review the "Time is a thief" drill from Class 11.',
          misconception: 'Students treat every comparison in the poem as a metaphor. In "ckjgeklk", lines like *fcjg ckf<+ Hkk nk#u lhmQ* ("rain.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'vehicle\' and \'tenor\' to the metaphor in stanza 3: *rqEg fcuq oaQrk èkfu g#bZ] ru fruqoj Hkk Mksy*.', answer: 'Tenor: The beloved\'s dark tresses (*oaQrk èkfu* / *ckjg*)',
                  options: ['Tenor: The beloved\'s dark tresses (*oaQrk èkfu* / *ckjg*)', 'The beloved\'s tresses *are* black monsoon clouds', 'similarity', 'tress *like* clouds'],
                  hint: 'If stuck on vehicle/tenor, review the "Time is a thief" drill from Class 11.',
                  misconception: 'Students treat every comparison in the poem as a metaphor. In "ckjgeklk", lines like *fcjg ckf<+ Hkk nk#u lhmQ* ("rain falls heavily, very.' }
          ],
            remediations: { 'students-treat-every-comparison-in': { steps: ['Physically underline every verb.', 'Ask: "Is this verb describing weather or a human action?" 2.', 'Make a two-column table: Column A = Nature word (e.g., *iou*), Column B = Human word (e.g., *ckjg*).', 'Draw arrows only where the text *equates* them (metaphor) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_009', difficulty: 'standard',
          question: 'Irony (वयंग्य/विडंबना) is a literary device where the intended meaning of words.',
          hint: 'If stuck on "what does X symbolize?", return to c12_hin_a_cbse_07_008 and ask: "What does.',
          misconception: '**Misconception:** "Irony is just sarcasm or saying the opposite of what you mean." **Why it\'s wrong:** Verbal irony.',
          parts: [
                { id: 'a', prompt: 'In stanza 1 of "ckjgeklk," the speaker describes the intense summer heat before the rain arrives.', answer: '**Correct answer:** Stanza 1 alone is literal description',
                  options: ['**Correct answer:** Stanza 1 alone is literal description', 'ironic', 'it\'s hot but they want rain'],
                  hint: 'If stuck on "what does X symbolize?", return to c12_hin_a_cbse_07_008 and ask: "What does this.',
                  misconception: '**Misconception:** "Irony is just sarcasm or saying the opposite of what you mean." **Why it\'s wrong:** Verbal irony (sarcasm) is only *one.' }
          ],
            remediations: { 'misconception-irony-is-just-sarcasm': { steps: ['**Re-read c12_hin_a_cbse_07_008 (Imagery and Metaphor)** — identify the 3 central images (sun, cloud, peacock) and.', 'Irony and symbolism *depend* on those transformations.', '**Map the poem\'s emotional arc on paper:** Draw a line graph with stanzas 1–4 on X-axis and "intensity of relief/joy".', 'Mark where the curve *reverses direction* — that reversal point *is* the structural irony.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_07_010 (Vocabulary in Context: Key Words).',
          misconception: 'Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them in exams as \'meanings\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning of words and',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning of words and', '"Before You Read: Context and Background" is a preparatory step where students gather', 'Plot and narrative structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere in poetry refers to the time, place, and sensory environment'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_07_010 (Vocabulary in Context: Key Words).',
                  misconception: 'Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them in exams as \'meanings\'.' }
          ],
            remediations: { 'students-memorize-the-ncert-glossary': { steps: ['If a student cannot move beyond glossary meanings: (1) Give them stanza 1 only.', 'What picture comes to mind with *nsol* that *din* erases?" (2) Have them replace each dialect word with its standard.', '(3) Assign: "Find 3 words in your home language that have no exact Hindi/English equivalent.', 'Write what they *feel* like." Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of the.',
          hint: 'If stuck, review the "शब्द रूप" table in the NCERT chapter\'s *शब्दार्थ* section and.',
          misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct" them in exams (e.g.',
          parts: [
                { id: 'a', prompt: 'In the line *fi; lkSa dgsgq l¡nslM+k] ,s Hk¡ojk ,s dkxA*, identify the case (कारक) of *lkSa* and *dgsgq*.', answer: '*lkSa* = संबंध कारक (genitive) → *के*',
                  options: ['*lkSa* = संबंध कारक (genitive) → *के*', 'old language'],
                  hint: 'If stuck, review the "शब्द रूप" table in the NCERT chapter\'s *शब्दार्थ* section and practice the.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct" them in exams (e.g., writing *nsol*.' },
                { id: 'b', prompt: 'Compare the verb forms *Hkk* (stanza 1) and *gksb* (stanza 2). What tense/aspect does each represent in Braj?', answer: '*Hkk* = habitual present / general truth (*होता है*)',
                  options: ['*Hkk* = habitual present / general truth (*होता है*)', 'old language'],
                  hint: 'If stuck, review the "शब्द रूप" table in the NCERT chapter\'s *शब्दार्थ* section and practice the.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct" them in exams (e.g., writing *nsol*.' }
          ],
            remediations: { 'students-treat-braj-bhasha-forms': { steps: ['Revisit **c12_hin_a_cbse_07_010** (Vocabulary in Context) to re-learn the Braj-Hindi word pairs with grammatical labels.', 'Practice the **three-step mapping drill**: (a) underline the Braj word, (b) write standard Hindi equivalent, (c) name.', 'Take the re-diagnostic: convert stanza 2 line *iwl tkM+ FkjFkj ru dk¡ik* fully to standard Hindi with case labels.', 'If >1 error, repeat drill with stanza 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct" them in exams (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Braj Bhasha in *कचजगेळक* is merely decorative; the same meaning could be conveyed in standard Hindi without loss." Defend your.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'old language'],
                  hint: 'If stuck, review the "शब्द रूप" table in the NCERT chapter\'s *शब्दार्थ* section and practice the.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" and try to "correct" them in exams (e.g., writing *nsol*.' }
          ],
            remediations: { 'students-treat-braj-bhasha-forms': { steps: ['Revisit **c12_hin_a_cbse_07_010** (Vocabulary in Context) to re-learn the Braj-Hindi word pairs with grammatical labels.', 'Practice the **three-step mapping drill**: (a) underline the Braj word, (b) write standard Hindi equivalent, (c) name.', 'Take the re-diagnostic: convert stanza 2 line *iwl tkM+ FkjFkj ru dk¡ik* fully to standard Hindi with case labels.', 'If >1 error, repeat drill with stanza 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck on vocabulary, revisit **node 010\'s glossary** for "l¡nslM+k", "nxèk", "ekjx".',
          misconception: '**Misconception:** "Inferential questions are just \'harder literal questions\' — if I read the text five times, the.',
          parts: [
                { id: 'a', prompt: 'In the poem "ckjgeklk" (first stanza), the line "vxgu nsol ?kVk fufl ck<+hA" appears.', answer: 'This is a **literal** response',
                  options: ['This is a **literal** response', 'inferential', 'dew drying', '"dew drying" is an interpretation'],
                  hint: 'If stuck on vocabulary, revisit **node 010\'s glossary** for "l¡nslM+k", "nxèk", "ekjx", "ikmA".',
                  misconception: '**Misconception:** "Inferential questions are just \'harder literal questions\' — if I read the text five times, the answer will appear.".' }
          ],
            remediations: { 'misconception-inferential-questions-are-just': { steps: ['If a student cannot distinguish question types or writes literal answers for inferential questions: 1.', '**Diagnose:** Give them 5 questions from the chapter\'s exercise (iz\'u&vH;kl) and ask them to label each L (literal).', '**Remediate:** For every "I" question, force them to complete this table: `Textual Clue 1 + Textual Clue 2 →.', 'Example: Clue 1: "ukf;dk fojg esa \'ka[k osQ leku gks xbZ gSA" (fog-woman\'s hair became equal to the sky) + Clue 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
