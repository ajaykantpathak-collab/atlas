import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch03_p1: SimDef = {
    id: 'v3_c12_eng_k_ch03_p1',
    title: 'A Wedding in Brownsville (Short Story) · Part 1/3',
    subtitle: 'At a Brooklyn wedding, the dead take a seat',
    classLevel: 12, subject: 'eng_k', topic: 'A Wedding in Brownsville (Short Story) · Part 1/3',
    chapters: ['c12_eng_k_ch03'],
    nodeIds: ['c12_eng_k_cbse_03_001', 'c12_eng_k_cbse_03_002', 'c12_eng_k_cbse_03_003', 'c12_eng_k_cbse_03_004', 'c12_eng_k_cbse_03_005', 'c12_eng_k_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Jewish literature scholar', intro: 'A Yiddish Nobel laureate sends a tired doctor to a wedding where the guest list includes the dead.', goal: 'Read A Wedding in Brownsville through Holocaust memory, landsmanshaft culture and Singer\'s purposeful surrealism.' },
    discovery: {
        question: 'Dr. Margolin goes to a landsman\'s wedding in Brownsville and meets Raizel — the love he watched die in the Holocaust. A student calls it \'just a dream sequence, doesn\'t count.\' What\'s the flaw?',
        options: ['In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available', 'None — it was clearly all a dream', 'Raizel survived secretly', 'Weddings cause hallucinations'],
        answer: 'In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available',
        hook: 'The wedding is no celebration — for a community of shtetl survivors it\'s \'a feast of poisons,\' a ritual of memory. And the landsmanshaft matters: when your town was erased, the people from it become your only family. Surrealism is the only form big enough for what they carry.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides the historical, cultural, biographical, and literary framework necessary to understand a text before engaging with its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Senciminer wedding as an outsider-turned-insider: decode the landsman ties, weigh Margolin\'s survivor\'s guilt against the community\'s defiant noise, and follow the taxi into the World of Twilight.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a film set in 1940s Kolkata during the famine — you\'d need to know about the war, colonial policy, and Bengali culture to truly.',
            decisions: [{ prompt: 'Who was Isaac Bashevis Singer, and what are three key biographical facts relevant to understanding his fiction?', options: [
                { text: 'Isaac Bashevis Singer (1902–1991) was a Polish-born Jewish American writer who wrote in', outcome: 'Isaac Bashevis Singer (1902–1991) was a Polish-born Jewish American writer who wrote in Yiddish.' },
                { text: 'He wrote in English', outcome: 'Not quite — Students often treat "context" as a list of facts to memorize (author birth/death, year.', reveals: 'students-often-treat-context-as' },
                { text: 'He lived in Israel', outcome: 'Not quite — Students often treat "context" as a list of facts to memorize (author birth/death, year.', reveals: 'students-often-treat-context-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a film that starts at a chaotic wedding, keeps cutting to black-and-white memories of a Polish shtetl, and ends in a white room where.',
            decisions: [{ prompt: 'Identify the three distinct narrative layers in "A Wedding in Brownsville" and give one textual marker (phrase or sentence) that signals.', options: [
                { text: 'The three layers are: (1) Present reality', outcome: 'The three layers are: (1) Present reality — the wedding night in Brownsville, marked by "Dr Solomon.' },
                { text: 'ghost story twist', outcome: 'Not quite — Students treat "plot" as a simple chronological summary: "Margolin goes to a wedding, meets his.', reveals: 'students-treat-plot-as-a' },
                { text: 'only two layers or citing random quotes', outcome: 'Not quite — Students treat "plot" as a simple chronological summary: "Margolin goes to a wedding, meets his.', reveals: 'students-treat-plot-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re watching a film where the lighting, background music, and weather change to signal what the character is feeling inside — that\'s atmosphere.',
            decisions: [{ prompt: 'List the four distinct physical settings Dr. Margolin moves through in the story, in chronological order.', options: [
                { text: 'The four settings are: (1) Dr', outcome: 'The four settings are: (1) Dr. Margolin\'s apartment on the sixteenth floor (Central Park area), (2).' },
                { text: 'setting', outcome: 'Not quite — Students often treat "setting" and "atmosphere" as synonyms, writing "the setting is sad" or "the.', reveals: 'students-often-treat-setting-and' },
                { text: 'atmosphere', outcome: 'Not quite — Students often treat "setting" and "atmosphere" as synonyms, writing "the setting is sad" or "the.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re a detective trying to understand a person who says one thing but feels another — Dr.',
            decisions: [{ prompt: 'What is Dr. Margolin\'s profession and what is his professional reputation in New York?', options: [
                { text: 'Dr', outcome: 'Dr. Margolin is a doctor with an office on West End Avenue, wealthy patients, and respect from.' },
                { text: 'he is a rabbi', outcome: 'Not quite — Students treat Dr. Margolin\'s "agnosticism" and "atheism" as simple labels and miss the paradox:.', reveals: 'students-treat-dr' },
                { text: 'he is unemployed', outcome: 'Not quite — Students treat Dr. Margolin\'s "agnosticism" and "atheism" as simple labels and miss the paradox:.', reveals: 'students-treat-dr' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re at a family wedding where every relative reminds you of a past you\'ve tried to forget — that\'s Dr. Margolin\'s experience.',
            decisions: [{ prompt: 'Name three supporting characters in "A Wedding in Brownsville" and state one key detail about each from the text.', options: [
                { text: 'Correct answer: Gretl (Margolin\'s wife, former Berlin nurse, does all housework herself,', outcome: 'Correct answer: Gretl (Margolin\'s wife, former Berlin nurse, does all housework herself, has burial.' },
                { text: 'the wife', outcome: 'Not quite — Students often treat supporting characters as mere "background" or "plot devices" — e.g., "Gretl.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a therapist listening to Dr. Margolin\'s recurring nightmare: a wedding where the dead dance, the food is poison, and your lost love appears.',
            decisions: [{ prompt: 'State the primary theme of "A Wedding in Brownsville" in one complete thematic sentence (not a single word like "trauma" or "memory").', options: [
                { text: '**Correct answer:** The primary theme is the inescapable psychological devastation of', outcome: '**Correct answer:** The primary theme is the inescapable psychological devastation of Holocaust.' },
                { text: 'The theme is the Holocaust', outcome: 'Not quite — Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?', reveals: 'students-often-treat-the-raizel' },
                { text: 'The theme is memory', outcome: 'Not quite — Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?', reveals: 'students-often-treat-the-raizel' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family wedding, an uncle who survived a violent displacement years ago freezes mid-dance, seeing faces that aren\'t there. Relatives hiss, \'it\'s been decades — move on.\'',
            decisions: [{ prompt: 'What does Singer\'s survivor-wedding story suggest instead?', options: [
                { text: 'Acknowledge it gently — \'A Wedding in Brownsville\' shows the dead return uninvited at celebrations; trauma intrudes on joy, and recognition helps more than \'get over it\'.', outcome: 'Survivor memory isn\'t a malfunction to suppress — the story treats the apparition as real grief doing its work.' },
                { text: 'They\'re right — decades should have healed it; the freeze is self-indulgence.', outcome: 'Time doesn\'t auto-delete trauma; the story\'s whole point is that annihilated worlds stay present at the feast.', reveals: 'time-heals-trauma-automatically' },
                { text: 'Whisk him away and never mention it — silence is kindest.', outcome: 'Pretending it didn\'t happen isolates the survivor further; the enclave exists precisely because shared memory needs company.', reveals: 'silence-as-care' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read surrealism as testimony — the form Singer needed because the Holocaust broke reality itself. Few chapters reward close reading like this one.',
            decisions: [{ prompt: 'What comes next? A Wedding in Brownsville (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Wedding in Brownsville (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Hornbill chapter (e.g.',
          misconception: 'Students often treat "context" as a list of facts to memorize (author birth/death, year of Holocaust) rather than as.',
          parts: [
                { id: 'a', prompt: 'Compare the "American Judaism" Margolin criticizes (Anglicised Yiddish, rabbis aping Christian ministers) with the world of the Senciminers at the wedding.', answer: 'The contrast reveals a fracture between assimilation and preservation',
                  options: ['The contrast reveals a fracture between assimilation and preservation', 'wedding venue'],
                  hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Hornbill chapter (e.g.',
                  misconception: 'Students often treat "context" as a list of facts to memorize (author birth/death, year of Holocaust) rather than as an interpretive tool.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['If the student cannot connect context to text: (1) Re-read the textbook\'s "Before You Read" box and underline every.', '(2) Create a two-column table: left column = context fact (e.g., "Sencimin destroyed"), right column = textual evidence.', '(3) Watch a 10-minute documentary clip on *landsmanshaftn* or Yiddish in New York.', '(4) Re-attempt Diagnostic Question 3 — now write the answer using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "context" as a list of facts to memorize (author birth/death, year of Holocaust) rather than as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The surreal elements in the story (the taxi ride, the encounter with Raizel, the final revelation) are just a dream sequence — they don\'t.', answer: 'This claim is flawed',
                  options: ['This claim is flawed', 'wedding venue'],
                  hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Hornbill chapter (e.g.',
                  misconception: 'Students often treat "context" as a list of facts to memorize (author birth/death, year of Holocaust) rather than as an interpretive tool.' },
                { id: 'b', prompt: 'Write a 100-word "Context Card" for a classmate who hasn\'t read the story yet.', answer: 'Isaac Bashevis Singer, Nobel laureate, wrote in Yiddish about Polish Jewry',
                  options: ['Isaac Bashevis Singer, Nobel laureate, wrote in Yiddish about Polish Jewry', 'wedding venue'],
                  hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Hornbill chapter (e.g.',
                  misconception: 'Students often treat "context" as a list of facts to memorize (author birth/death, year of Holocaust) rather than as an interpretive tool.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['If the student cannot connect context to text: (1) Re-read the textbook\'s "Before You Read" box and underline every.', '(2) Create a two-column table: left column = context fact (e.g., "Sencimin destroyed"), right column = textual evidence.', '(3) Watch a 10-minute documentary clip on *landsmanshaftn* or Yiddish in New York.', '(4) Re-attempt Diagnostic Question 3 — now write the answer using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_002', difficulty: 'standard',
          question: 'Plot is the sequence of causally connected events that form the story\'s.',
          hint: 'If unable to separate textual vs. chronological order, practice with "The Necklace".',
          misconception: 'Students treat "plot" as a simple chronological summary: "Margolin goes to a wedding, meets his dead lover, realizes.',
          parts: [
                { id: 'a', prompt: 'Identify the three distinct narrative layers in "A Wedding in Brownsville" and give one textual marker (phrase or sentence) that signals the transition into.', answer: 'The three layers are: (1) Present reality',
                  options: ['The three layers are: (1) Present reality', 'ghost story twist', 'only two layers or citing random quotes'],
                  hint: 'If unable to separate textual vs. chronological order, practice with "The Necklace" (Class 10).',
                  misconception: 'Students treat "plot" as a simple chronological summary: "Margolin goes to a wedding, meets his dead lover, realizes he\'s dead." They miss.' },
                { id: 'b', prompt: 'Explain in your own words why Singer places the taxi ride *before* the wedding hall scene instead of starting directly at the wedding.', answer: 'The taxi ride functions as a liminal corridor',
                  options: ['The taxi ride functions as a liminal corridor', 'it sets the scene', 'shows he\'s tired', 'ghost story twist'],
                  hint: 'If unable to separate textual vs. chronological order, practice with "The Necklace" (Class 10).',
                  misconception: 'Students treat "plot" as a simple chronological summary: "Margolin goes to a wedding, meets his dead lover, realizes he\'s dead." They miss.' }
          ],
            remediations: { 'students-treat-plot-as-a': { steps: ['Reread only paragraphs 25-27 (taxi ride) and 33-34 (chapel realization) with a highlighter: mark every phrase that.', 'Draw a three-column timeline: Left = textual order, Middle = chronological order, Right = psychological order.', 'Re-attempt Diagnostic Question 3.', 'If still stuck, revisit c11_eng_h_cbse_01_002 (Class 11 Hornbill Plot and Narrative Structure) for frame narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_003', difficulty: 'standard',
          question: 'Setting is the time, place, and social environment in which a story occurs.',
          hint: 'If unable to separate setting from atmosphere, return to Class 11 Hornbill Chapter 3.',
          misconception: 'Students often treat "setting" and "atmosphere" as synonyms, writing "the setting is sad" or "the atmosphere.',
          parts: [
                { id: 'a', prompt: 'List the four distinct physical settings Dr. Margolin moves through in the story, in chronological order.', answer: 'The four settings are: (1) Dr',
                  options: ['The four settings are: (1) Dr', 'setting', 'atmosphere', 'the setting is sad'],
                  hint: 'If unable to separate setting from atmosphere, return to Class 11 Hornbill Chapter 3 "Setting and.',
                  misconception: 'Students often treat "setting" and "atmosphere" as synonyms, writing "the setting is sad" or "the atmosphere is Brownsville." The precise.' },
                { id: 'b', prompt: 'In the taxi scene, Singer writes: "Snow was sifting down gently, bringing a winter peace to the world, just as it had in the past — forty years ago, a thousand.', answer: 'The sensory details',
                  options: ['The sensory details', 'it shows he\'s thinking', 'setting', 'atmosphere'],
                  hint: 'If unable to separate setting from atmosphere, return to Class 11 Hornbill Chapter 3 "Setting and.',
                  misconception: 'Students often treat "setting" and "atmosphere" as synonyms, writing "the setting is sad" or "the atmosphere is Brownsville." The precise.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['If the student conflates setting and atmosphere: (1) Have them draw a two-column table for each scene: Column A = "What.', '(2) Use the opening paragraph: "grey and dreary as dusk" → Column A: winter morning, snow; Column B: grey, dreary.', '(3) Then trace the taxi scene: Column A: taxi, bridge, snow, traffic accident; Column B: "sifting down gently," "winter.', '(4) Re-attempt Diagnostic Question 4 with this table method.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist involves examining the central character\'s.',
          hint: 'If stuck, review c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) for the.',
          misconception: 'Students treat Dr. Margolin\'s "agnosticism" and "atheism" as simple labels and miss the paradox: he rejects religious.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of a protagonist involves examining the central character\'s traits,',
                  options: ['Character analysis of a protagonist involves examining the central character\'s traits,', '"Before You Read: Context and Background" is a preparatory section that provides the', 'Plot is the sequence of causally connected events that form the story\'s backbone, while', 'Setting is the time, place, and social environment in'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) for the 5-category.',
                  misconception: 'Students treat Dr. Margolin\'s "agnosticism" and "atheism" as simple labels and miss the paradox: he rejects religious doctrine but lives.' }
          ],
            remediations: { 'students-treat-dr': { steps: ['Have the student reread paragraphs 2-3 (agnosticism vs.', 'Seders, community roles) and 7-8 (prodigy past vs.', 'Ask: "If he truly didn\'t believe, why does he care what the Senciminers think?', 'Why does he wear a skullcap at the wedding?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in "A Wedding in Brownsville" are the secondary figures.',
          hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Hornbill.',
          misconception: 'Students often treat supporting characters as mere "background" or "plot devices" — e.g., "Gretl is just the wife who.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in "A Wedding in Brownsville" are the secondary figures',
                  options: ['Supporting characters in "A Wedding in Brownsville" are the secondary figures', '"Before You Read: Context and Background" is a preparatory section that provides the', 'Plot is the sequence of causally connected events that form the story\'s backbone, while', 'Setting is the time, place, and social environment in'],
                  hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Hornbill (c11_eng_h_cbse_01_005).',
                  misconception: 'Students often treat supporting characters as mere "background" or "plot devices" — e.g., "Gretl is just the wife who stays home" or "The.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot distinguish supporting characters\' thematic functions: (1) Have them re-read the wedding hall scene.', '27-30) and highlight every name mentioned + the fate attached to it.', '(2) Create a two-column table: Character | What they represent to Margolin.', '(3) Practice writing one PEEL paragraph on Gretl as foil to Raizel using the template: Point → Evidence (quote) →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck on thematic statement formulation, revisit c11_eng_h_cbse_01_006 (Theme: Primary.',
          misconception: 'Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?',
          parts: [
                { id: 'a', prompt: 'Explain why Dr. Margolin\'s professional success (West End Avenue office, wealthy patients, community leadership) fails to alleviate his sense of failure.', answer: '**Correct answer:** His success is external and communal',
                  options: ['**Correct answer:** His success is external and communal', 'He is depressed because he is old', 'He misses his old life'],
                  hint: 'If stuck on thematic statement formulation, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and.',
                  misconception: 'Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?' },
                { id: 'b', prompt: 'Apply the "pressure cooker" metaphor: Identify three specific sensory details at the wedding hall (pp. 27-29) that trigger Dr.', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'the music was loud'],
                  hint: 'If stuck on thematic statement formulation, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and.',
                  misconception: 'Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?' },
                { id: 'c', prompt: 'Analyze the function of the Raizel encounter. Is it a supernatural event, a hallucination, or a literary device? Justify using the story\'s surrealist technique.', answer: '**Correct answer:** It is a literary device',
                  options: ['**Correct answer:** It is a literary device', 'ghosts exist', 'the dead are more alive in the survivor than the living', 'a ghost story'],
                  hint: 'If stuck on thematic statement formulation, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and.',
                  misconception: 'Students often treat the Raizel encounter as a *plot mystery to be solved* ("Was she real?' }
          ],
            remediations: { 'students-often-treat-the-raizel': { steps: ['**Re-read the "Stop and Think" boxes** on pages 25, 29, 32, 34 — they are the author\'s signposts for theme.', '**Map the "two weddings":** Create a two-column table: Column A = Brownsville wedding details (sensory, chaotic.', 'The theme lives in the *arrows* between columns.', '**Write a 3-sentence thematic statement** using this template: "The story argues that ________; it demonstrates this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
