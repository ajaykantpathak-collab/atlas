import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch02_p1: SimDef = {
    id: 'v3_c12_eng_k_ch02_p1',
    title: 'Eveline (Short Story) · Part 1/3',
    subtitle: 'The ship waited. The railing won.',
    classLevel: 12, subject: 'eng_k', topic: 'Eveline (Short Story) · Part 1/3',
    chapters: ['c12_eng_k_ch02'],
    nodeIds: ['c12_eng_k_cbse_02_001', 'c12_eng_k_cbse_02_002', 'c12_eng_k_cbse_02_003', 'c12_eng_k_cbse_02_004', 'c12_eng_k_cbse_02_005', 'c12_eng_k_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist fiction reader', intro: 'A young woman must choose between a sailor and her dead mother\'s promise — and history has already chosen for her.', goal: 'Read Eveline through Dubliners\' paralysis, Joycean epiphany and the colonial-economic forces behind her freeze.' },
    discovery: {
        question: 'A boat to Buenos Aires waits, Frank holds her hand — and Eveline grips the iron railing instead. A classmate blames \'her abusive father.\' What bigger forces does that verdict miss?',
        options: ['Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect', 'Nothing — the father is the sole cause', 'She simply didn\'t love Frank', 'The ship left without her'],
        answer: 'Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect',
        hook: 'Joyce\'s epiphany isn\'t a joyful aha — it\'s bleak clarity: the organ tune carries her mother\'s fate, and Eveline sees escape as another trap. Modernism\'s move is interiority — \'evening invade the avenue\' — her paralysis is the real plot.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Eveline\' (Kaleidoscope, ch. 2) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit at that window in 1904 Dublin: weigh the dusty cretonne, the seven shillings, the deathbed promise and Frank\'s tales — and judge whether Eveline\'s stillness is failure or colonised fate.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Eveline\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary narrative point of view used in "Eveline," and how does it differ from first-person narration?', options: [
                { text: 'The story uses third-person limited narration with free indirect discourse', outcome: 'The story uses third-person limited narration with free indirect discourse.' },
                { text: 'first person because we hear her thoughts', outcome: 'Not quite — Students believe "plot" and "narrative structure" are synonyms and that listing events in order.', reveals: 'plot-and-narrative-structure-are' },
                { text: 'narrative structure', outcome: 'Not quite — Students believe "plot" and "narrative structure" are synonyms and that listing events in order.', reveals: 'plot-and-narrative-structure-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Eveline\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" in fiction. How do they differ from each other?', options: [
                { text: 'Setting is the spatiotemporal and social context of a narrative (when, where, and under', outcome: 'Setting is the spatiotemporal and social context of a narrative (when, where, and under what.' },
                { text: 'where and when', outcome: 'Not quite — Students consistently treat setting as a static "background" — listing where scenes happen (house.', reveals: 'students-consistently-treat-setting-as' },
                { text: 'how it feels', outcome: 'Not quite — Students consistently treat setting as a static "background" — listing where scenes happen (house.', reveals: 'students-consistently-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Eveline\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the name of the protagonist in James Joyce\'s "Eveline," and what is her approximate age as stated in the text?', options: [
                { text: 'The protagonist is Eveline Hill, and she is "over nineteen" years old', outcome: 'The protagonist is Eveline Hill, and she is "over nineteen" years old.' },
                { text: 'Frank would save her', outcome: 'Not quite — Students often believe Eveline *chooses* to stay out of love for her father or home, citing her.', reveals: 'eveline-chooses-to-stay-out' },
                { text: 'Frank or giving an incorrect age', outcome: 'Not quite — Students often believe Eveline *chooses* to stay out of love for her father or home, citing her.', reveals: 'eveline-chooses-to-stay-out' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Eveline\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the precise thematic statement (not a single word) that captures the primary theme of "Eveline"? Write it in one sentence.', options: [
                { text: 'Correct answer: "The primary theme of \'Eveline\' is the psychological paralysis that', outcome: 'Correct answer: "The primary theme of \'Eveline\' is the psychological paralysis that results from.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students consistently write "The theme of Eveline is paralysis" or "The theme is duty" — treating.', reveals: 'students-consistently-write-the-theme' },
                { text: 'The theme is paralysis', outcome: 'Not quite — Students consistently write "The theme of Eveline is paralysis" or "The theme is duty" — treating.', reveals: 'students-consistently-write-the-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Offered a scholarship abroad, a student freezes: a dying promise at home pulls one way, escape the other. Weeks pass and she hasn\'t answered the offer at all.',
            decisions: [{ prompt: 'What does \'Eveline\' warn about this limbo?', options: [
                { text: 'That paralysis is itself a choice — Joyce\'s Eveline stays not because duty won but because habit and guilt froze her; decide deliberately or the indecision decides for you.', outcome: 'The story\'s tragedy is that Eveline never chooses — she defaults. Naming the trade-off and choosing is the way out of paralysis.' },
                { text: 'Stay — duty to family always outranks personal freedom.', outcome: 'Joyce doesn\'t crown duty; he shows a mind so colonised by obligation it can\'t move — that\'s the disease, not the answer.', reveals: 'duty-paralysis' },
                { text: 'Let the deadline lapse — whatever happens without deciding was meant to be.', outcome: 'Defaulting is choosing by other means; Eveline \'chose\' to stay precisely by failing to choose.', reveals: 'avoidance-as-choice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a girl frozen at a railing as a whole country\'s paralysis. Joyce teaches that the hardest prisons are built of duty, memory and fear.',
            decisions: [{ prompt: 'What comes next? Eveline (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Eveline (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_001', difficulty: 'standard',
          question: '\'Eveline\' (Kaleidoscope, ch. 2) — the context and background to this text: who.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1\'s "Before You Read" (c11_eng_h_cbse_01_001).',
          misconception: 'Students often treat "context" as a decorative preamble — a few dates and names to memorize — rather than the.',
          parts: [
                { id: 'a', prompt: 'Compare the social constraints on Eveline (a 19-year-old Dublin shop girl in 1904) with those on the grandmother in Class 9\'s "How I Taught My Grandmother.', answer: 'Similarity: Both women are denied autonomy by patriarchal structures',
                  options: ['Similarity: Both women are denied autonomy by patriarchal structures', 'treats both as simply "old vs'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1\'s "Before You Read" (c11_eng_h_cbse_01_001) for the.',
                  misconception: 'Students often treat "context" as a decorative preamble — a few dates and names to memorize — rather than the *analytical key* that unlocks.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['Re-read the textbook\'s "Before You Read" page (p.', '12) aloud, underlining every proper noun (Joyce, Dubliners, 1914, epiphany, Blessed Margaret Mary Alacoque).', 'Watch a 5-minute video on "Joyce and Dubliners" (e.g., BBC\'s *In Our Time* excerpt).', 'With a partner, explain *in your own words* why the story\'s first sentence ("evening invade the avenue") is modernist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Eveline\' — what happens, in what order, and why the.',
          hint: 'Review Freytag\'s pyramid and point-of-view definitions in c11_eng_h_cbse_01_002; practice.',
          misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative point of view used in "Eveline," and how does it differ from first-person narration?', answer: 'The story uses third-person limited narration with free indirect discourse',
                  options: ['The story uses third-person limited narration with free indirect discourse', 'first person because we hear her thoughts', 'narrative structure'],
                  hint: 'Review Freytag\'s pyramid and point-of-view definitions in c11_eng_h_cbse_01_002; practice.',
                  misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.' },
                { id: 'b', prompt: 'Map the five stages of Freytag\'s pyramid onto "Eveline" by identifying the specific textual moment for each stage: exposition, rising action, climax, falling.', answer: 'Exposition: Opening paragraph',
                  options: ['Exposition: Opening paragraph', 'narrative structure'],
                  hint: 'Review Freytag\'s pyramid and point-of-view definitions in c11_eng_h_cbse_01_002; practice.',
                  misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.' },
                { id: 'c', prompt: 'Compare the narrative structure of "Eveline" with a conventional linear short story (e.g., O. Henry\'s "The Gift of the Magi").', answer: 'Linear stories present events in causal order: A → B → C → D',
                  options: ['Linear stories present events in causal order: A → B → C → D', 'narrative structure'],
                  hint: 'Review Freytag\'s pyramid and point-of-view definitions in c11_eng_h_cbse_01_002; practice.',
                  misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.' }
          ],
            remediations: { 'plot-and-narrative-structure-are': { steps: ['Have them reread the first three paragraphs and highlight every verb phrase describing Eveline\'s internal state ("was.', 'Give them a two-column table: left column = present-time sensory details (cretonne, footsteps, organ), right column.', 'Ask them to rewrite the dock scene in first person ("I gripped the iron") then in omniscient third ("The narrator knew.', 'Re-attempt Diagnostic Question 3 with the table as scaffold. If still stuck, revisit c11_eng_h_cbse_01_002 (Class 11.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The narrative structure of \'Eveline\' manipulates the reader into sympathizing with Eveline\'s passivity rather than judging it." Support.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'we feel sorry for her', 'narrative structure'],
                  hint: 'Review Freytag\'s pyramid and point-of-view definitions in c11_eng_h_cbse_01_002; practice.',
                  misconception: 'Students believe "plot" and "narrative structure" are synonyms and that listing events in order constitutes analysis.' }
          ],
            remediations: { 'plot-and-narrative-structure-are': { steps: ['Have them reread the first three paragraphs and highlight every verb phrase describing Eveline\'s internal state ("was.', 'Give them a two-column table: left column = present-time sensory details (cretonne, footsteps, organ), right column.', 'Ask them to rewrite the dock scene in first person ("I gripped the iron") then in omniscient third ("The narrator knew.', 'Re-attempt Diagnostic Question 3 with the table as scaffold. If still stuck, revisit c11_eng_h_cbse_01_002 (Class 11.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_003', difficulty: 'standard',
          question: 'The setting of \'Eveline\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck, review the "sensory imagery mapping" exercise from c11_eng_h_cbse_01_008.',
          misconception: 'Students consistently treat setting as a static "background" — listing where scenes happen (house, avenue, station).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Eveline\'',
                  options: ['The setting of \'Eveline\'', '\'Eveline\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Eveline\'', 'Character analysis in \'Eveline\''],
                  hint: 'If stuck, review the "sensory imagery mapping" exercise from c11_eng_h_cbse_01_008 — practice.',
                  misconception: 'Students consistently treat setting as a static "background" — listing where scenes happen (house, avenue, station) — and atmosphere as.' }
          ],
            remediations: { 'students-consistently-treat-setting-as': { steps: ['If the student cannot move beyond "setting = place," do this 3-step remediation: (1) Revisit c11_eng_h_cbse_01_003.', '(2) Practice with a micro-text: give the student a 3-sentence description of a room and ask them to rewrite it three.', '(3) Return to "Eveline" and have the student trace ONE sensory thread (e.g., dust) from first paragraph to last, noting.', 'Re-diagnose with DIAGNOSTIC_QUESTION_4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis in \'Eveline\' — the central figure(s), their traits, and how.',
          hint: 'If stuck on distinguishing Eveline\'s voice from Joyce\'s narration, revisit.',
          misconception: 'Students often believe Eveline *chooses* to stay out of love for her father or home, citing her memories of his.',
          parts: [
                { id: 'a', prompt: 'What is the name of the protagonist in James Joyce\'s "Eveline," and what is her approximate age as stated in the text?', answer: 'The protagonist is Eveline Hill, and she is "over nineteen" years old',
                  options: ['The protagonist is Eveline Hill, and she is "over nineteen" years old', 'Frank would save her', 'Frank or giving an incorrect age'],
                  hint: 'If stuck on distinguishing Eveline\'s voice from Joyce\'s narration, revisit c12_eng_k_cbse_02_002.',
                  misconception: 'Students often believe Eveline *chooses* to stay out of love for her father or home, citing her memories of his kindness (the ghost story.' },
                { id: 'b', prompt: 'Explain in your own words why Eveline reviews the familiar objects in her room (the yellowing photograph, the broken harmonium, the print of the promises).', answer: 'Eveline reviews these objects',
                  options: ['Eveline reviews these objects', 'she is nostalgic', 'she likes the objects', 'Frank would save her'],
                  hint: 'If stuck on distinguishing Eveline\'s voice from Joyce\'s narration, revisit c12_eng_k_cbse_02_002.',
                  misconception: 'Students often believe Eveline *chooses* to stay out of love for her father or home, citing her memories of his kindness (the ghost story.' },
                { id: 'c', prompt: 'Apply the concept of "internal conflict" to Eveline: identify two specific, opposing forces pulling her in different directions, and quote one phrase for each.', answer: 'Force 1 (Stay): Filial duty and fear',
                  options: ['Force 1 (Stay): Filial duty and fear', 'Frank would save her'],
                  hint: 'If stuck on distinguishing Eveline\'s voice from Joyce\'s narration, revisit c12_eng_k_cbse_02_002.',
                  misconception: 'Students often believe Eveline *chooses* to stay out of love for her father or home, citing her memories of his kindness (the ghost story.' }
          ],
            remediations: { 'eveline-chooses-to-stay-out': { steps: ['Re-read the final three paragraphs (from "She stood up in a sudden impulse of terror" to the end) aloud, marking every.', 'Create a two-column table: "Memories pulling her back" vs "Reasons to leave" — fill with exact phrases.', 'Re-attempt Diagnostic Question 5, now using only the verbs and phrases from step 1 as evidence.', 'If still stuck, revisit node c12_eng_k_cbse_02_002 (Plot) to confirm the sequence of events, then c12_eng_k_cbse_02_003.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters in \'Eveline\' — the secondary figures who move the story.',
          hint: 'If stuck, re-read the \'Stop and Think\' questions in the NCERT text — they are designed.',
          misconception: 'Students often treat supporting characters as \'less important\' and write vague summaries like \'Frank is nice and wants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Eveline\'',
                  options: ['Supporting characters in \'Eveline\'', '\'Eveline\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Eveline\'', 'The setting of \'Eveline\''],
                  hint: 'If stuck, re-read the \'Stop and Think\' questions in the NCERT text — they are designed by the.',
                  misconception: 'Students often treat supporting characters as \'less important\' and write vague summaries like \'Frank is nice and wants to save her\'.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot move beyond personality descriptions: 1) Have them reread the two \'Stop and Think\' sections in the.', '2) Assign a two-column table: Column A = Character, Column B = What this character represents *inside Eveline\'s mind*.', '3) Re-diagnose with Diagnostic Question 3 (foil exercise) — if they still describe traits instead of symbolic contrast.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of \'Eveline\' — the central idea the whole text returns to.',
          hint: 'If stuck on thematic statement construction, revisit c11_eng_h_cbse_01_006 worked.',
          misconception: 'Students consistently write "The theme of Eveline is paralysis" or "The theme is duty" — treating a *theme topic*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'Eveline\'',
                  options: ['The primary theme of \'Eveline\'', '\'Eveline\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Eveline\'', 'The setting of \'Eveline\''],
                  hint: 'If stuck on thematic statement construction, revisit c11_eng_h_cbse_01_006 worked examples and the.',
                  misconception: 'Students consistently write "The theme of Eveline is paralysis" or "The theme is duty" — treating a *theme topic* (noun) as a *thematic.' }
          ],
            remediations: { 'students-consistently-write-the-theme': { steps: ['Have the student reread the "Stop and Think" questions in the NCERT text (pages 14, 16, 17) — they are designed.', 'Ask them to complete this sentence frame: "In \'Eveline,\' James Joyce suggests that when ________, the result.', 'Compare their sentence to the worked example in WORKED_EXAMPLE_1.', 'Re-attempt DIAGNOSTIC_QUESTION_1. If still stuck, revisit c11_eng_h_cbse_01_006 (Class 11 Hornbill Chapter 1 Theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
