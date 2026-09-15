import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch13_p1: SimDef = {
    id: 'v3_c12_hin_a_ch13_p1',
    title: 'Hkh"e lkguh · Part 1/3',
    subtitle: '1938: the revolutionaries who still knew how to laugh',
    classLevel: 12, subject: 'hin_a', topic: 'Hkh"e lkguh · Part 1/3',
    chapters: ['c12_hin_a_ch13'],
    nodeIds: ['c12_hin_a_cbse_13_001', 'c12_hin_a_cbse_13_002', 'c12_hin_a_cbse_13_003', 'c12_hin_a_cbse_13_004', 'c12_hin_a_cbse_13_005', 'c12_hin_a_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Freedom-era memoir reader', intro: 'Before Quit India, there were the quiet years — and a memoirist who remembered the people inside the movement.', goal: 'Read the memoir through its 1938 setting — nationalism as lived relationship, not marble statue.' },
    discovery: {
        question: 'Nagpur, 1938: a revolutionary editor jokes through clandestine work while a provisional government forms in shadow. What makes this memoir different from a freedom-fighter hagiography?',
        options: ['Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons', 'It names real people', 'It\'s more recent', 'Memoirs are always accurate'],
        answer: 'Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons',
        hook: 'The year is precise — 1938, pre-Quit India, not the famous 1942. And the language carries the era: Marathi-inflected Hindi, short colloquial sentences, dialogue over description. Personal memory and national history are woven on the same loom.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides essential historical, biographical, and literary context for Chapter 13 "Hkh\'e lkguh" — a memoir by Hkh\'e lkguh (1915–2003) recounting personal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in a 1938 Nagpur room: weigh Sakharam\'s warmth against his revolution, separate the provisional government\'s claim from the British one, and hear how colloquial prose carries lived history.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a film set in 1938 India — you\'d want to know: Who\'s ruling? What\'s the mood on the streets? Who are the freedom fighters?',
            decisions: [{ prompt: 'What is the specific historical year anchored in the introductory note of "Hkh\'e lkguh," and which nationalist publication was Sakharam.', options: [
                { text: 'The introductory note explicitly states "lu~ 1938 osQ vklikl dh ckr gS" (this is about', outcome: 'The introductory note explicitly states "lu~ 1938 osQ vklikl dh ckr gS" (this is about 1938) and.' },
                { text: 'Quite India Movement', outcome: 'Not quite — Students treat the "Before You Read" section as skimmable trivia — memorizing the author\'s birth.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a film that keeps jumping between the present, the 1930s, and a folk tale — that\'s exactly what this chapter does.',
            decisions: [{ prompt: 'Identify the three distinct time periods/locations that form the narrative framework of "Hkh\'e lkguh" and state which one serves as the.', options: [
                { text: 'The three time-frames are: (1) 1938', outcome: 'The three time-frames are: (1) 1938 — lsokxzke workplace where the narrator meets xkaèkh, (2) Early.' },
                { text: 'The plot is the author meets xkaèkh, then usg: th, then Quit India happens', outcome: 'Not quite — Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle.', reveals: 'students-treat-plot-as-what' },
                { text: '1938 as the frame', outcome: 'Not quite — Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle.', reveals: 'students-treat-plot-as-what' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are walking through the lanes of old Lucknow in 1938 — the smell of kebabs, the sound of Urdu poetry from a nearby mushaira, the tension of.',
            decisions: [{ prompt: 'Identify the three primary physical settings in "Hkh\'e lkguh" and the approximate time period associated with each.', options: [
                { text: 'The three primary settings are: (1) Lucknow (lsokxzke)', outcome: 'The three primary settings are: (1) Lucknow (lsokxzke) — 1938, pre-World War II; (2) Delhi (ve`rlj.' },
                { text: 'Lucknow and Delhi', outcome: 'Not quite — Students often treat "setting" as a static list of places (Lucknow, Delhi, Varanasi) and.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you’re facing a 5‑mark board question: “Analyze the role of usg: th in shaping the narrator’s worldview.” You remember the protagonist xkaèkh, but usg.',
            decisions: [{ prompt: 'List three supporting characters in "Hkh\'e lkguh" and give one defining trait for each, based solely on the text.', options: [
                { text: 'Correct answer: (1) usg: th – intellectual nationalist (edits “yksVl”, uses allegory to', outcome: 'Correct answer: (1) usg: th – intellectual nationalist (edits “yksVl”, uses allegory to teach.' },
                { text: 'usg: th is a friend', outcome: 'Not quite — Students often treat supporting characters as mere “helpers” to the protagonist, listing their.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'merely names characters without textual traits (e', outcome: 'Not quite — Students often treat supporting characters as mere “helpers” to the protagonist, listing their.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior who documented a student protest movement now calls it \'my movement, my story\' — editing out the grassroots workers whose songs and sacrifices built it, and ending every retelling on his own reflection.',
            decisions: [{ prompt: 'What does Bhisham Sahni\'s memoir structure say to that?', options: [
                { text: 'Hand the ending to the collective — the chapter deliberately closes on the revolutionary\'s \'they are not just yours, they are ours too,\' surrendering the writer\'s \'I\' to the movement\'s \'we\'; a witness holds the story in trust, not ownership.', outcome: 'The memoir\'s architecture is the argument: embedded voices — Nehru\'s sparrow tale, the child\'s song — exist so the writer never owns history, only testifies to it.' },
                { text: 'Let him own it — he wrote it down, so the narrative is his by right.', outcome: 'The chapter\'s ending exists to refute that claim: the narrator who steps back for the revolutionary\'s voice enacts the truth that recording isn\'t owning — the movement\'s people are co-owners of its telling.', reveals: 'writer-owns-the-story' },
                { text: 'Cut the folk and domestic episodes from the retelling — keep only the political events so it stays \'serious.\'', outcome: 'The memoir\'s power is the weave — the sparrow story and the child\'s song structurally foreshadow sacrifice; stripping them leaves a chronology without the argument that private life feeds public courage.', reveals: 'politics-over-domestic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a memoir as national history told in a personal voice — where revolutionaries joke, worry and persist.',
            decisions: [{ prompt: 'What comes next? Hkh"e lkguh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkh"e lkguh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides essential historical.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_13_001\'s worked example on "how to mine an introductory.',
          misconception: 'Students treat the "Before You Read" section as skimmable trivia — memorizing the author\'s birth year (1915) but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" provides essential historical, biographical,',
                  options: ['"Before You Read: Context and Background" provides essential historical, biographical,', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting and atmosphere in prose refer to the physical, temporal, and social environment', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_13_001\'s worked example on "how to mine an introductory note for.',
                  misconception: 'Students treat the "Before You Read" section as skimmable trivia — memorizing the author\'s birth year (1915) but missing the *functional*.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot name three style markers from the note (e.g., "mnwZ \'kCnksa dk iz;ksx," "NksVs&NksVs okD;,".', '(2) Convert each marked phrase into a "style card" (e.g., "Short sentences → urgency, realism").', '(3) Predict how each style card will appear in the main text (e.g., "Short sentences → dialogue scenes with Sakharam").', '(4) Verify predictions in c12_hin_a_cbse_13_002 (Plot and Narrative Structure).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events (plot).',
          hint: 'If stuck, review Class 11 "Plot and Narrative Structure" (c11_hin_ar_cbse_13_002).',
          misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this.',
          parts: [
                { id: 'a', prompt: 'Identify the three distinct time periods/locations that form the narrative framework of "Hkh\'e lkguh" and state which one serves as the primary \'frame\' (the.', answer: 'The three time-frames are: (1) 1938',
                  options: ['The three time-frames are: (1) 1938', 'The plot is the author meets xkaèkh, then usg: th, then Quit India happens', '1938 as the frame'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) — specifically.',
                  misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this chapter, they list events.' },
                { id: 'b', prompt: 'The sparrow story (ck”khxj aur ekrk efj;e) is told *by usg: th* to the narrator *within* the narrative.', answer: '**Narrative levels:** Level 1 (Primary)',
                  options: ['**Narrative levels:** Level 1 (Primary)', 'just a story usg: told', 'The plot is the author meets xkaèkh, then usg: th, then Quit India happens'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) — specifically.',
                  misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this chapter, they list events.' }
          ],
            remediations: { 'students-treat-plot-as-what': { steps: ['If the student cannot distinguish fabula from syuzhet: (1) Have them draw two parallel timelines on paper — one labeled.', '(2) Plot 5 key events on each using textual markers (e.g., "1938 lsokxzke", "usg: th tells sparrow story", "v[kckj.', '(3) Ask: "Why does the text show the sparrow story *before* the v[kckj episode, even though both happen in the 1940s?".', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — if they now explain the embedding levels, the concept has landed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s decision to end the chapter with ;kLlsj vjkI+kQkr\'s statement: "os vkiosQ gh ugha, gekjs Hkh usrk gSa.', answer: 'Ending with ;kLlsj vjkI+kQkr\'s voice',
                  options: ['Ending with ;kLlsj vjkI+kQkr\'s voice', 'it\'s a nice quote to end on', 'The plot is the author meets xkaèkh, then usg: th, then Quit India happens'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) — specifically.',
                  misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this chapter, they list events.' },
                { id: 'b', prompt: 'Create a **narrative timeline diagram** for the chapter showing: (a) Chronological order of events (1938 → 1942 → writing present), (b) Narrative order (as.', answer: '**Expected diagram (verbal description acceptable):** - **Chronological:** 1938',
                  options: ['**Expected diagram (verbal description acceptable):** - **Chronological:** 1938', 'The plot is the author meets xkaèkh, then usg: th, then Quit India happens'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) — specifically.',
                  misconception: 'Students treat "plot" as "what happens in order" and "narrative structure" as "beginning, middle, end." In this chapter, they list events.' }
          ],
            remediations: { 'students-treat-plot-as-what': { steps: ['If the student cannot distinguish fabula from syuzhet: (1) Have them draw two parallel timelines on paper — one labeled.', '(2) Plot 5 key events on each using textual markers (e.g., "1938 lsokxzke", "usg: th tells sparrow story", "v[kckj.', '(3) Ask: "Why does the text show the sparrow story *before* the v[kckj episode, even though both happen in the 1940s?".', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — if they now explain the embedding levels, the concept has landed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_003', difficulty: 'standard',
          question: 'Setting and atmosphere in prose refer to the physical, temporal, and social.',
          hint: 'If stuck, review Class 11 "Setting and Atmosphere" nodes (c11_hin_ar_cbse_13_003) for the.',
          misconception: 'Students often treat "setting" as a static list of places (Lucknow, Delhi, Varanasi) and "atmosphere" as a single.',
          parts: [
                { id: 'a', prompt: 'Identify the three primary physical settings in "Hkh\'e lkguh" and the approximate time period associated with each.', answer: 'The three primary settings are: (1) Lucknow (lsokxzke)',
                  options: ['The three primary settings are: (1) Lucknow (lsokxzke)', 'Lucknow and Delhi'],
                  hint: 'If stuck, review Class 11 "Setting and Atmosphere" nodes (c11_hin_ar_cbse_13_003) for the basic.',
                  misconception: 'Students often treat "setting" as a static list of places (Lucknow, Delhi, Varanasi) and "atmosphere" as a single adjective ("nostalgic,".' },
                { id: 'b', prompt: 'The author writes: "\'kke dks izkFkZuk lHkk esa tk igq¡prk] tgk¡ lHkh vkJeoklh rFkk dLrwjck ,d vksj dks ikyFkh ekjs vkSj nksuksa gkFk xksn esa j[ks cSBh gksrha.', answer: 'The scene uses sensory overload',
                  options: ['The scene uses sensory overload', 'fcyoqQy', 'ikyFkh ekjs', 'gkFk xksn'],
                  hint: 'If stuck, review Class 11 "Setting and Atmosphere" nodes (c11_hin_ar_cbse_13_003) for the basic.',
                  misconception: 'Students often treat "setting" as a static list of places (Lucknow, Delhi, Varanasi) and "atmosphere" as a single adjective ("nostalgic,".' },
                { id: 'c', prompt: 'Compare the atmosphere of the Varanasi visit during Emergency (described in the "lnjeqdke" section) with the Lucknow coffee house atmosphere of 1938.', answer: 'The 1938 coffee house is open, cacophonous, and idealistic',
                  options: ['The 1938 coffee house is open, cacophonous, and idealistic', 'one was free, one was not'],
                  hint: 'If stuck, review Class 11 "Setting and Atmosphere" nodes (c11_hin_ar_cbse_13_003) for the basic.',
                  misconception: 'Students often treat "setting" as a static list of places (Lucknow, Delhi, Varanasi) and "atmosphere" as a single adjective ("nostalgic,".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot distinguish layered atmospheres within one setting: (1) Have them re-read the coffee house.', '(2) Ask them to complete a three-column table: Sensory Detail | Historical Marker | Narrator\'s Feeling.', '(3) Then have them write two sentences: "The coffee house feels ___ because ___" and "But for Shrikant Verma it feels.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If stuck on "who is the protagonist?", return to c12_hin_a_cbse_13_001 (biographical.',
          misconception: 'Students consistently mistake the *observed character* (xkaèkh) for the *protagonist* because xkaèkh dominates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves systematically examining the central',
                  options: ['Character analysis of the protagonist involves systematically examining the central', '"Before You Read: Context and Background" provides essential historical, biographical,', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting and atmosphere in prose refer to the physical, temporal, and social environment'],
                  hint: 'If stuck on "who is the protagonist?", return to c12_hin_a_cbse_13_001 (biographical context) and.',
                  misconception: 'Students consistently mistake the *observed character* (xkaèkh) for the *protagonist* because xkaèkh dominates descriptive passages (his.' }
          ],
            remediations: { 'students-consistently-mistake-the-observed': { steps: ['Have the student list every "eSa" (I) sentence in the first 3 pages — this forces recognition of the narrating "I".', 'For each "eSa" sentence, ask: *What does this action/reaction reveal about the person doing it?* (e.g., "eSa nsj jkr.', 'Re-read the xkaèkh description passages and ask: *Why does the narrator choose THESE details?* (e.g., describing.', 'Re-attempt Diagnostic Question 4 — if the private/public contrast emerges, the misconception is broken.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'If stuck, revisit the PEEL paragraph structure from Class 11 (c11_hin_ar_cbse_13_005) and.',
          misconception: 'Students often treat supporting characters as mere “helpers” to the protagonist, listing their actions without linking.',
          parts: [
                { id: 'a', prompt: 'Compare the methods of nationalism represented by usg: th and ;kLlsj vjkI+kQkr. How do their approaches differ in the story?', answer: 'Correct answer: usg: th practices intellectual nationalism',
                  options: ['Correct answer: usg: th practices intellectual nationalism', 'freedom fighters'],
                  hint: 'If stuck, revisit the PEEL paragraph structure from Class 11 (c11_hin_ar_cbse_13_005) and the.',
                  misconception: 'Students often treat supporting characters as mere “helpers” to the protagonist, listing their actions without linking them to theme.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re‑read the three key scenes: usg: th at the press (pp.', '90‑91), usg: th’s storytelling at the restaurant (pp.', '94‑95), and ;kLlsj vjkI+kQkr’s prison meeting (pp.', 'Create a two‑column table: Column A = exact quote/action; Column B = what it reveals about nationalism.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, re-read the "v[kckj okyh ?kVuk" scene (farmer feeding mother his flesh) and.',
          misconception: '**Misconception:** "The theme is just the moral of the story, like \'be kind\' or \'Partition was bad.\'" **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" provides essential historical, biographical,', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting and atmosphere in prose refer to the physical, temporal, and social environment'],
                  hint: 'If stuck, re-read the "v[kckj okyh ?kVuk" scene (farmer feeding mother his flesh) and xkaèkh\'s.',
                  misconception: '**Misconception:** "The theme is just the moral of the story, like \'be kind\' or \'Partition was bad.\'" **Why it\'s wrong:** This reduces.' }
          ],
            remediations: { 'misconception-the-theme-is-just': { steps: ['If a student cannot move beyond plot summary or slogan themes: 1.', '**Revisit plot node (c12_hin_a_cbse_13_002)** and list 5 key events.', 'For each, ask: "What does this event *show* about how humans respond to loss?" 2.', '**Re-read character nodes (004, 005)** focusing on xkaèkh\'s actions — not his traits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
