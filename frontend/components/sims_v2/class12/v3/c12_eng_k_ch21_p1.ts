import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch21_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch21_p1: SimDef = {
    id: 'v3_c12_eng_k_ch21_p1',
    title: 'Broken Images (Drama) · Part 1/3',
    subtitle: 'Her bestselling self walked off the screen — to cross-examine her',
    classLevel: 12, subject: 'eng_k', topic: 'Broken Images (Drama) · Part 1/3',
    chapters: ['c12_eng_k_ch21'],
    nodeIds: ['c12_eng_k_cbse_21_001', 'c12_eng_k_cbse_21_002', 'c12_eng_k_cbse_21_003', 'c12_eng_k_cbse_21_004', 'c12_eng_k_cbse_21_005', 'c12_eng_k_cbse_21_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian drama critic', intro: 'A writer sits for an interview and gets interrogated by her own televised image. Karnad turns language politics into theatre.', goal: 'Read Broken Images through bilingual identity, media\'s mirror and the English-vs-mother-tongue debate.' },
    discovery: {
        question: 'A Kannada writer\'s English novel wins global fame — and her own televised image walks off the screen to accuse her of betrayal. What is the Image really prosecuting?',
        options: ['Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image', 'Plagiarism — the Image combs the English novel for passages lifted from Kannada', 'The channel\'s editing bias — the accusation is manufactured by producers\' framing', 'Stage fright dramatised — the walking image is only her nerves before broadcast'],
        answer: 'Her fractured self — the split between the mother tongue that made her and the English that markets her; the interview becomes an interrogation by her own image',
        hook: 'Karnad lived both tongues — Jnanpith laureate in Kannada and English — so the play\'s real debate is deeper than language: money, envy and who owns \'authentic Indian-ness.\' The studio\'s plasma screens aren\'t décor; the mediated self is the stage. Eliot\'s \'heap of broken images\' is the thesis.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Broken Images\' (Kaleidoscope, ch. 21) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_21_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run the interrogation Manjula can\'t escape: weigh the announcer\'s roll-call of bilingual Kannada greats, decode what the Image wants, and judge whether writing in English is betrayal — or inheritance.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Broken Images\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Girish Karnad and what are two major awards he received?', options: [
                { text: 'Girish Karnad (1938–2019) was a renowned Indian playwright, actor, and film director who', outcome: 'Girish Karnad (1938–2019) was a renowned Indian playwright, actor, and film director who wrote.' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'only one award or confusing him with another writer', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Broken Images\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What are the two distinct structural phases of "Broken Images," and what triggers the transition between them?', options: [
                { text: 'The two phases are: (1) a public monologue', outcome: 'The two phases are: (1) a public monologue — Manjula\'s televised speech about her novel and.' },
                { text: 'the play is a monologue throughout', outcome: 'Not quite — Students often treat the Image as a literal technical glitch ("the tape got stuck") or.', reveals: 'students-often-treat-the-image' },
                { text: 'the transition happens when the Announcer speaks', outcome: 'Not quite — Students often treat the Image as a literal technical glitch ("the tape got stuck") or.', reveals: 'students-often-treat-the-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Broken Images\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'List three specific stage-direction details from the opening of *Broken Images* that establish the television studio setting.', options: [
                { text: 'Correct answer: (1) "A big plasma screen hangs on one side," (2) "a chair and a typically', outcome: 'Correct answer: (1) "A big plasma screen hangs on one side," (2) "a chair and a typically \'telly\'.' },
                { text: 'A big plasma screen hangs on one side', outcome: 'Not quite — Students often treat setting as a static "background" and atmosphere as a synonym for "mood.".', reveals: 'students-often-treat-setting-as' },
                { text: 'a chair and a typically \'telly\' table', outcome: 'Not quite — Students often treat setting as a static "background" and atmosphere as a synonym for "mood.".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Broken Images\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Manjula Nayak\'s profession and what significant career change does she announce in her TV interview?', options: [
                { text: 'Manjula Nayak was a lecturer in English in Bangalore and a Kannada short-story writer;', outcome: 'Manjula Nayak was a lecturer in English in Bangalore and a Kannada short-story writer; she.' },
                { text: 'she was a Kannada lecturer who wrote a novel in Kannada', outcome: 'Not quite — Students often read Manjula as either a villain (calculating betrayer of Kannada for money/fame).', reveals: 'students-often-read-manjula-as' },
                { text: 'betrayal', outcome: 'Not quite — Students often read Manjula as either a villain (calculating betrayer of Kannada for money/fame).', reveals: 'students-often-read-manjula-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Broken Images\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List all the supporting characters referenced in *Broken Images*, distinguishing between those who appear physically/on-screen and those.', options: [
                { text: '**On-screen/physical:** The Image (Manjula\'s televised reflection), Announcer (voice', outcome: '**On-screen/physical:** The Image (Manjula\'s televised reflection), Announcer (voice only), Raza.' },
                { text: 'aren\'t in the play', outcome: 'Not quite — Students believe "supporting character analysis" means writing a biography of each character.', reveals: 'supporting-character-analysis-means-writing' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students believe "supporting character analysis" means writing a biography of each character.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Broken Images\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the central conflict that the "image" device externalizes in "Broken Images"?', options: [
                { text: 'The "image" device externalizes Manjula\'s internal conflict between her public persona', outcome: 'The "image" device externalizes Manjula\'s internal conflict between her public persona (the.' },
                { text: 'Kannada vs English', outcome: 'Not quite — Students often think the primary theme is ONLY the "Kannada vs English" language debate because.', reveals: 'the-primary-theme-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An Indian novelist wins a big English-language prize and starts publicly disowning her earlier vernacular books as \'practice work in a smaller language\'.',
            decisions: [{ prompt: 'What would Karnad\'s Broken Images say?', options: [
                { text: 'That English success is legitimate but the denial fractures the self — the play interrogates a bilingual writer who must hold both languages without ranking one as the betrayal and the other as the coronation.', outcome: 'The \'broken images\' are the selves she can\'t integrate; prestige in one tongue doesn\'t require disowning the other.' },
                { text: 'She\'s right — the English prize proves which language mattered.', outcome: 'That\'s the hierarchy the play dismantles; conflating market prestige with literary worth is the wound, not the win.', reveals: 'english-equals-prestige' },
                { text: 'She\'s a traitor — writing in English at all is the betrayal.', outcome: 'Karnad lists a whole tradition of bilingual Indian writers; the guilt-trip is as false as the triumphalism.', reveals: 'english-is-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_21_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a TV studio as a courtroom for the bilingual self — and see India\'s language politics staged as one woman\'s argument with her own image.',
            decisions: [{ prompt: 'What comes next? Broken Images (Drama) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Broken Images (Drama) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_001', difficulty: 'standard',
          question: '\'Broken Images\' (Kaleidoscope, ch. 21) — the context and background to this.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_001 and practice: "How does the epigraph in \'The.',
          misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and awards list.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Broken Images\' (Kaleidoscope, ch',
                  options: ['\'Broken Images\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Broken Images\'', 'The setting of \'Broken Images\'', 'Character analysis in \'Broken Images\''],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 and practice: "How does the epigraph in \'The Portrait of.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and awards list.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student cannot connect the epigraph to the language debate, have them: (1) re-read the epigraph and underline.', 'Then re-attempt Diagnostic Question 2.', 'If they still struggle, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 "Before You Read") to practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Broken Images\' — what happens, in what order, and.',
          hint: 'Review the plot diagram (Freytag\'s pyramid) and the definitions of monologue vs.',
          misconception: 'Students often treat the Image as a literal technical glitch ("the tape got stuck") or a supernatural ghost, missing.',
          parts: [
                { id: 'a', prompt: 'What are the two distinct structural phases of "Broken Images," and what triggers the transition between them?', answer: 'The two phases are: (1) a public monologue',
                  options: ['The two phases are: (1) a public monologue', 'the play is a monologue throughout', 'the transition happens when the Announcer speaks'],
                  hint: 'Review the plot diagram (Freytag\'s pyramid) and the definitions of monologue vs.',
                  misconception: 'Students often treat the Image as a literal technical glitch ("the tape got stuck") or a supernatural ghost, missing that it is.' },
                { id: 'b', prompt: 'Explain the narrative function of the three coloured lights (yellow, green, red) in the TV studio.', answer: 'Yellow = standby/preparation (Manjula counts down, rehearses)',
                  options: ['Yellow = standby/preparation (Manjula counts down, rehearses)', 'the lights are just stage decoration', 'the dialogue starts during the green light'],
                  hint: 'Review the plot diagram (Freytag\'s pyramid) and the definitions of monologue vs.',
                  misconception: 'Students often treat the Image as a literal technical glitch ("the tape got stuck") or a supernatural ghost, missing that it is.' }
          ],
            remediations: { 'students-often-treat-the-image': { steps: ['Re-read the transition moment (pp.', '230-231 in NCERT): light turns red → Manjula leans back → Image speaks.', 'Draw a two-column timeline: left column = Monologue events (with green light), right column = Dialogue events (with red.', 'For each secret revealed in the dialogue (Malini\'s attractiveness, Pramod\'s departure, Manjula\'s guilt), trace its.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_003', difficulty: 'standard',
          question: 'The setting of \'Broken Images\' — the place, time and atmosphere the text.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (or c11_eng_s_cbse_01_003.',
          misconception: 'Students often treat setting as a static "background" and atmosphere as a synonym for "mood." In *Broken Images*, the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Broken Images\'',
                  options: ['The setting of \'Broken Images\'', '\'Broken Images\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Broken Images\'', 'Character analysis in \'Broken Images\''],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (or c11_eng_s_cbse_01_003 / c11_eng_w_cbse_01_003) and.',
                  misconception: 'Students often treat setting as a static "background" and atmosphere as a synonym for "mood." In *Broken Images*, the studio setting.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot distinguish setting from atmosphere or track atmospheric shifts: (1) Have them re-read *only* the.', '(2) Ask them to draw a timeline with four columns: Pre-broadcast / On-air / Post-broadcast (red light off).', '(3) Assign a micro-writing task: "Describe the studio in 50 words as if you\'re the lighting designer explaining the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static "background" and atmosphere as a synonym for "mood." In *Broken Images*, the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the dramatic effectiveness of using a television studio — rather than a writer\'s study, a hospital room, or a university office — as the sole setting.', answer: 'Correct answer: The studio is brilliantly effective',
                  options: ['Correct answer: The studio is brilliantly effective', 'just a backdrop', 'calls it "just a backdrop" fails to see setting as active dramatic metaphor'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (or c11_eng_s_cbse_01_003 / c11_eng_w_cbse_01_003) and.',
                  misconception: 'Students often treat setting as a static "background" and atmosphere as a synonym for "mood." In *Broken Images*, the studio setting.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot distinguish setting from atmosphere or track atmospheric shifts: (1) Have them re-read *only* the.', '(2) Ask them to draw a timeline with four columns: Pre-broadcast / On-air / Post-broadcast (red light off).', '(3) Assign a micro-writing task: "Describe the studio in 50 words as if you\'re the lighting designer explaining the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_004', difficulty: 'standard',
          question: 'Character analysis in \'Broken Images\' — the central figure(s), their traits.',
          hint: 'If stuck, revisit c12_eng_k_cbse_21_002 (Plot and Narrative Structure) to map the.',
          misconception: 'Students often read Manjula as either a villain (calculating betrayer of Kannada for money/fame) or a victim.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'Broken Images\'',
                  options: ['Character analysis in \'Broken Images\'', '\'Broken Images\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Broken Images\'', 'The setting of \'Broken Images\''],
                  hint: 'If stuck, revisit c12_eng_k_cbse_21_002 (Plot and Narrative Structure) to map the.',
                  misconception: 'Students often read Manjula as either a villain (calculating betrayer of Kannada for money/fame) or a victim (misunderstood writer hounded.' }
          ],
            remediations: { 'students-often-read-manjula-as': { steps: ['If the student cannot hold Manjula\'s contradictions, do this 3-step remediation: (1) Re-read the TV interview (pp.', '226-229) and highlight every claim Manjula makes about herself.', '(2) Re-read the Image confrontation (pp.', '230-237) and highlight every contradiction the Image raises.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_005', difficulty: 'standard',
          question: 'Supporting characters in \'Broken Images\' — the secondary figures who move the.',
          hint: 'Review the "Character Analysis: Supporting Characters" node from Class 11 Hornbill.',
          misconception: 'Students believe "supporting character analysis" means writing a biography of each character.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the Image functions as a supporting character. Is it merely a stage device, or does it have independent dramatic agency?', answer: 'The Image is Manjula\'s externalised subconscious',
                  options: ['The Image is Manjula\'s externalised subconscious', 'symbol of conscience', 'supernatural element', 'supporting character analysis'],
                  hint: 'Review the "Character Analysis: Supporting Characters" node from Class 11 Hornbill.',
                  misconception: 'Students believe "supporting character analysis" means writing a biography of each character.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['Re-read the play *only* for dialogue about other characters.', 'Highlight every mention of Malini, Pramod, parents, Lucy, Announcer, Raza, Director, Akademi President, pundit.', 'Make a two-column table: **Speaker** (Manjula / Image / Announcer) | **What they say about X**.', 'For each character, ask: "Do the accounts agree?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_21_006', difficulty: 'standard',
          question: 'The primary theme of \'Broken Images\' — the central idea the whole text returns.',
          hint: 'If stuck, return to node 002 (Plot) and map the 5 key beats of the Image confrontation.',
          misconception: 'Students often think the primary theme is ONLY the "Kannada vs English" language debate because it dominates the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the play\'s title "Broken Images" (referencing T.S. Eliot\'s "The Waste Land") is an appropriate metaphor for Manjula\'s situation.', answer: 'The title "Broken Images" reflects how Manjula\'s identity exists as fragmented,',
                  options: ['The title "Broken Images" reflects how Manjula\'s identity exists as fragmented,', 'Kannada vs English'],
                  hint: 'If stuck, return to node 002 (Plot) and map the 5 key beats of the Image confrontation: (1) Image.',
                  misconception: 'Students often think the primary theme is ONLY the "Kannada vs English" language debate because it dominates the TV speech and the NCERT.' }
          ],
            remediations: { 'the-primary-theme-is-only': { steps: ['If a student reduces the theme to "language politics," guide them through this 3-step remediation: (1) Re-read the.', '230-237) and highlight every revelation that has NOTHING to do with language (Malini\'s attractiveness/intelligence.', '(2) Create a two-column table: "TV Speech Claims" vs "Image Revelations" — fill it with 5+ rows.', '(3) Ask: "What connects all these fractures?" The answer — the gap between performance and truth — IS the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
