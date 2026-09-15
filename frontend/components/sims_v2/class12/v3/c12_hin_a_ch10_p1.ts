import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p1: SimDef = {
    id: 'v3_c12_hin_a_ch10_p1',
    title: 'vlxj otkgr · Part 1/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'vlxj otkgr · Part 1/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_001', 'c12_hin_a_cbse_10_002', 'c12_hin_a_cbse_10_003', 'c12_hin_a_cbse_10_004', 'c12_hin_a_cbse_10_005', 'c12_hin_a_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory literary skill where students systematically gather and organize information about the author\'s life, the historical-social milieu, the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are visiting Prayagraj in 1925 and walk into a gathering where a young Jaishankar Prasad is reading a new story — you\'d want to know who he is, why.',
            decisions: [{ prompt: 'What are the three pillars of Jaishankar Prasad\'s literary identity as described in the NCERT background note, and which literary movement.', options: [
                { text: 'The three pillars are: (1) his mastery of Sanskrit, Prakrit, Persian, and modern Hindi', outcome: 'The three pillars are: (1) his mastery of Sanskrit, Prakrit, Persian, and modern Hindi allowing.' },
                { text: 'poet of Kamayani', outcome: 'Not quite — Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book.', reveals: 'students-treat-before-you-read' },
                { text: 'writer of plays', outcome: 'Not quite — Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked to summarize this chapter in five sentences but find yourself jumping between the author\'s childhood, his father\'s library, meetings with.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "izse?ku dh Nk;k&Le`fr"?', options: [
                { text: 'The primary narrative perspective is first-person autobiographical ("esjs", "eSa", "esjh")', outcome: 'The primary narrative perspective is first-person autobiographical ("esjs", "eSa", "esjh").' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often assume "plot" means "what happens in order" and therefore try to force this text.', reveals: 'plot-means-what-happens-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into your grandmother\'s kitchen during monsoon — the smell of frying pakoras, the sound of rain on tin roof, steam fogging the windows, the.',
            decisions: [{ prompt: 'Define \'setting\' and \'atmosphere\' in prose fiction. Give one example of each from the Chapter 10 text (do not quote — describe the detail.', options: [
                { text: 'Setting = the where and when (physical location, time period, social milieu)', outcome: 'Setting = the where and when (physical location, time period, social milieu).' },
                { text: 'setting is the plot', outcome: 'Not quite — Students treat \'setting\' as a static list of place/time facts (e.g., "fetkZiqj, 1920s") and.', reveals: 'students-treat-setting-as-a' },
                { text: 'atmosphere is the weather', outcome: 'Not quite — Students treat \'setting\' as a static list of place/time facts (e.g., "fetkZiqj, 1920s") and.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are writing a reference letter for a literary giant like Jaishankar Prasad — what specific incidents would you cite to prove his greatness?',
            decisions: [{ prompt: 'Identify the narrator of the essay "Izse?ku dh Nk;k Le`fr" and state his relationship to the protagonist Jaishankar Prasad.', options: [
                { text: 'The narrator is Dr', outcome: 'The narrator is Dr. Nagendra (the essayist), who recounts his childhood and youthful encounters.' },
                { text: 'Prasad is the narrator', outcome: 'Not quite — Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad.', reveals: 'students-conflate-the-narrator-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are writing a character reference letter for a friend\'s college application — you would select specific incidents that reveal their personality.',
            decisions: [{ prompt: 'Name any three supporting characters from the chapter "Izse?ku" and state one dominant trait for each.', options: [
                { text: 'Correct answer: (1) The narrator\'s father (firk th)', outcome: 'Correct answer: (1) The narrator\'s father (firk th) — authoritative and tradition-bound; (2) The.' },
                { text: 'strict', outcome: 'Not quite — Students often treat supporting characters as static plot devices — listing their actions but not.', reveals: 'students-often-treat-supporting-characters' },
                { text: ': calling the poet', outcome: 'Not quite — Students often treat supporting characters as static plot devices — listing their actions but not.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "What is the central message of \'jkepanz \'kqDy\'?" Many students freeze because they confuse *plot summary* with.',
            decisions: [{ prompt: 'What is the definition of "primary theme" in a prose text, and how does it differ from the plot summary?', options: [
                { text: 'The primary theme is the central insight about life or human nature conveyed through the', outcome: 'The primary theme is the central insight about life or human nature conveyed through the narrative.' },
                { text: 'the author\'s biography', outcome: 'Not quite — Students believe the primary theme is "the author\'s biography" or "history of Hindi literature".', reveals: 'the-primary-theme-is-the' },
                { text: 'history of Hindi literature', outcome: 'Not quite — Students believe the primary theme is "the author\'s biography" or "history of Hindi literature".', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'What comes next? vlxj otkgr · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vlxj otkgr · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory literary skill where.',
          hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book titles, movement name).',
          parts: [
                { id: 'a', prompt: 'The NCERT text states Prasad "gave a new turn to the history of Hindi literature and established a new form of Hindi poetry." Explain in your own words what.', answer: '"New form" refers to **Chhayavad\'s poetic idiom**',
                  options: ['"New form" refers to **Chhayavad\'s poetic idiom**', 'he wrote emotional poems', 'author\'s contribution'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do the.',
                  misconception: 'Students treat "Before You Read" as a **fact-memorization checklist** (birth/death dates, book titles, movement name).' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot move beyond fact-listing: 1.', '**Re-read the NCERT background with a highlighter** — mark every phrase showing *cause-effect* (e.g., "classical.', '**Build a 3-row table**: Row 1 = Biographical Fact (from text), Row 2 = Historical Context (freedom movement, language.', '**Re-diagnostic**: Ask the student to explain *one* row orally — "Why would Prasad\'s eye disease make the story\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the sequence of events (plot) and the.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative.',
          misconception: 'Students often assume "plot" means "what happens in order" and therefore try to force this text into a straight.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and Narrative Structure refers to the sequence of events (plot) and the technique',
                  options: ['Plot and Narrative Structure refers to the sequence of events (plot) and the technique', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Setting and Atmosphere in literature refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure" for the.',
                  misconception: 'Students often assume "plot" means "what happens in order" and therefore try to force this text into a straight timeline.' }
          ],
            remediations: { 'plot-means-what-happens-in': { steps: ['Re-read the text **only for time markers** (underline every phrase indicating time: "lu~ 1884", "lu~ 1905", "16 o"kZ".', 'Make a two-column table: Column A = Event, Column B = Time marker in text.', 'Sort Column B by actual historical date; compare with the order in the text.', 'Write one sentence explaining *why* the author placed the committee episode first (hint: it establishes his public.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume "plot" means "what happens in order" and therefore try to force this text into a straight.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the non-linear structure in conveying the central theme: "the making of a Hindi writer." Is the fragmentation a strength or.', answer: 'Strength',
                  options: ['Strength', 'confusing'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure" for the.',
                  misconception: 'Students often assume "plot" means "what happens in order" and therefore try to force this text into a straight timeline.' }
          ],
            remediations: { 'plot-means-what-happens-in': { steps: ['Re-read the text **only for time markers** (underline every phrase indicating time: "lu~ 1884", "lu~ 1905", "16 o"kZ".', 'Make a two-column table: Column A = Event, Column B = Time marker in text.', 'Sort Column B by actual historical date; compare with the order in the text.', 'Write one sentence explaining *why* the author placed the committee episode first (hint: it establishes his public.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_003', difficulty: 'standard',
          question: 'Setting and Atmosphere in literature refers to the time, place, and social.',
          hint: 'If unable to separate imagery from abstraction, practice with c11_hin_ar_cbse_01_003.',
          misconception: 'Students treat \'setting\' as a static list of place/time facts (e.g., "fetkZiqj, 1920s") and \'atmosphere\' as a single.',
          parts: [
                { id: 'a', prompt: 'Define \'setting\' and \'atmosphere\' in prose fiction. Give one example of each from the Chapter 10 text (do not quote — describe the detail in your own words).', answer: 'Setting = the where and when (physical location, time period, social milieu)',
                  options: ['Setting = the where and when (physical location, time period, social milieu)', 'setting is the plot', 'atmosphere is the weather'],
                  hint: 'If unable to separate imagery from abstraction, practice with c11_hin_ar_cbse_01_003 exercises.',
                  misconception: 'Students treat \'setting\' as a static list of place/time facts (e.g., "fetkZiqj, 1920s") and \'atmosphere\' as a single adjective (e.g.' },
                { id: 'b', prompt: 'The text describes Pandit Sitaram\'s house: "uhps dk cjkenk [kkyh Fkk.', answer: 'The lower floor\'s darkness ("uhps dk cjkenk [kkyh") suggests obscurity, lack of',
                  options: ['The lower floor\'s darkness ("uhps dk cjkenk [kkyh") suggests obscurity, lack of', 'old house', 'dark rooms'],
                  hint: 'If unable to separate imagery from abstraction, practice with c11_hin_ar_cbse_01_003 exercises.',
                  misconception: 'Students treat \'setting\' as a static list of place/time facts (e.g., "fetkZiqj, 1920s") and \'atmosphere\' as a single adjective (e.g.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['If the student cannot distinguish setting details from atmospheric effect: Step 1 — Give them a 3-column table: Column.', 'Step 2 — Have them fill 5 rows from the Chapter 10 text.', 'Step 3 — Ask: "Which detail in Column A *causes* which feeling in Column C?" Step 4 — Rewrite one PEEL paragraph using.', 'Step 5 — Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If unable to separate narrator\'s voice from Prasad\'s actions, review the "Indirect.',
          misconception: 'Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad was great because the.',
          parts: [
                { id: 'a', prompt: 'Identify the narrator of the essay "Izse?ku dh Nk;k Le`fr" and state his relationship to the protagonist Jaishankar Prasad.', answer: 'The narrator is Dr',
                  options: ['The narrator is Dr', 'Prasad is the narrator'],
                  hint: 'If unable to separate narrator\'s voice from Prasad\'s actions, review the "Indirect.',
                  misconception: 'Students conflate the *narrator\'s admiration* with *objective character traits*, writing "Prasad was great because the narrator says so".' }
          ],
            remediations: { 'students-conflate-the-narrator-s': { steps: ['Re-read the essay marking every sentence where Prasad *acts* or *speaks* (not where the narrator praises him).', 'Categorize these into: habits, decisions, interactions, crises.', 'For each category, write one trait + one quote.', 'Re-attempt Diagnostic Question 4 using only this evidence table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the roles.',
          hint: 'If stuck, revisit the protagonist analysis node (c12_hin_a_cbse_10_004) and the.',
          misconception: 'Students often treat supporting characters as static plot devices — listing their actions but not analyzing why the.',
          parts: [
                { id: 'a', prompt: 'Name any three supporting characters from the chapter "Izse?ku" and state one dominant trait for each.', answer: 'Correct answer: (1) The narrator\'s father (firk th)',
                  options: ['Correct answer: (1) The narrator\'s father (firk th)', 'strict', ': calling the poet'],
                  hint: 'If stuck, revisit the protagonist analysis node (c12_hin_a_cbse_10_004) and the plot/structure node.',
                  misconception: 'Students often treat supporting characters as static plot devices — listing their actions but not analyzing why the author crafted them.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a short paragraph analyzing how the teacher ia- osQnkjukFk th\'s invitation to the narrator to visit his home reveals the.', answer: 'Correct answer: Point',
                  options: ['Correct answer: Point', ': calling the poet'],
                  hint: 'If stuck, revisit the protagonist analysis node (c12_hin_a_cbse_10_004) and the plot/structure node.',
                  misconception: 'Students often treat supporting characters as static plot devices — listing their actions but not analyzing why the author crafted them.' },
                { id: 'c', prompt: 'Compare the narrative functions of the father and the poet Mikè;k; cnjhukjk;.k pkSèkjh. How does each advance the protagonist\'s development differently?', answer: 'Correct answer: The father acts as a restraining force',
                  options: ['Correct answer: The father acts as a restraining force', 'influential', ': calling the poet'],
                  hint: 'If stuck, revisit the protagonist analysis node (c12_hin_a_cbse_10_004) and the plot/structure node.',
                  misconception: 'Students often treat supporting characters as static plot devices — listing their actions but not analyzing why the author crafted them.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If the student exhibits this misconception: (1) Have them re-read only the scenes where the father, poet, and teacher.', '(2) Create a three-column chart: Character | Textual Evidence (quote/paraphrase) | Inferred Trait | Thematic Link.', '(3) Practice writing one PEEL paragraph for each character using the chart.', '(4) Re-attempt Diagnostic Question 4 as a check — the answer must distinguish *how* each character\'s influence operates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of a prose text is the central, unifying idea or insight.',
          hint: 'If stuck, return to c11_hin_ar_cbse_10_006 (Class 11 Theme node) and re-do its Worked.',
          misconception: 'Students believe the primary theme is "the author\'s biography" or "history of Hindi literature" because the text.',
          parts: [
                { id: 'a', prompt: 'In the first two paragraphs of "jkepanz \'kqDy", the author describes his father\'s love for Hindi poetry and his own childhood exposure to it.', answer: 'It establishes the *foundational influence*',
                  options: ['It establishes the *foundational influence*', 'it introduces the father', 'the author\'s biography', 'history of Hindi literature'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_10_006 (Class 11 Theme node) and re-do its Worked Example 1.',
                  misconception: 'Students believe the primary theme is "the author\'s biography" or "history of Hindi literature" because the text *contains* biographical.' },
                { id: 'b', prompt: 'The author writes: "esjs lgikBh ia- y{ehukjk;.k pkScs... ^mnwZ csxe* uke dh ,d cM+h gh fouksniw.kZ iqLrd fy[kh Fkh" (My maternal uncle...', answer: 'Step 1: Identify the detail',
                  options: ['Step 1: Identify the detail', 'the author\'s biography', 'history of Hindi literature'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_10_006 (Class 11 Theme node) and re-do its Worked Example 1.',
                  misconception: 'Students believe the primary theme is "the author\'s biography" or "history of Hindi literature" because the text *contains* biographical.' },
                { id: 'c', prompt: 'Compare the author\'s description of Premchand\'s house ("Hkkjrsanq th dk ?kj") with the earlier description of his own home\'s literary atmosphere.', answer: 'Own home: intimate, familial, oral (recitations)',
                  options: ['Own home: intimate, familial, oral (recitations)', 'one had a library, the other didn\'t', 'the author\'s biography', 'history of Hindi literature'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_10_006 (Class 11 Theme node) and re-do its Worked Example 1.',
                  misconception: 'Students believe the primary theme is "the author\'s biography" or "history of Hindi literature" because the text *contains* biographical.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['Re-read the chapter marking only *turning points* in the narrator\'s literary awareness (father\'s recitation → uncle\'s.', 'For each turning point, write one sentence: "This shows the narrator\'s literary identity deepening from X to Y." 3.', 'Combine the three sentences into one theme statement using "from...', 'Verify against the text: does every major paragraph support this arc?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
