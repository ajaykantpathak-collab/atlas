import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch05_p1: SimDef = {
    id: 'v3_c12_eng_k_ch05_p1',
    title: 'One Centimetre (Short Story) · Part 1/3',
    subtitle: 'One centimetre short — and the gatekeeper reached for Paris',
    classLevel: 12, subject: 'eng_k', topic: 'One Centimetre (Short Story) · Part 1/3',
    chapters: ['c12_eng_k_ch05'],
    nodeIds: ['c12_eng_k_cbse_05_001', 'c12_eng_k_cbse_05_002', 'c12_eng_k_cbse_05_003', 'c12_eng_k_cbse_05_004', 'c12_eng_k_cbse_05_005', 'c12_eng_k_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fiction-in-translation reader', intro: 'A mother keeps every rule perfectly — and a wrongly drawn line on a temple wall still finds a way to shame her.', goal: 'Read One Centimetre through its Chinese blue-collar context and its critique of performative, petty authority.' },
    discovery: {
        question: 'A temple guard invokes the platinum International Standard Metre in Paris to shut down a factory cook over one centimetre. What\'s really happening at that gate?',
        options: ['Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong', 'Science keeping order', 'The guard is simply right', 'Tickets must be enforced, always'],
        answer: 'Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong',
        hook: 'One centimetre is the gap between a mother\'s dignity and the world\'s crooked rulers — and Bi Shu-min writes it with a doctor\'s clinical eye. Even the old woman\'s dishonest \'fitness scales\' that flatter height are satire: the only character honest about the racket is the one running it.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'One Centimetre\' (Kaleidoscope, ch. 5) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Measure the measurers: compare the bus\'s peeling paint line and the temple\'s \'earthworm\' mark, weigh Tao Ying\'s flawless motherhood against the system\'s small corruptions, and decide what a centimetre can hold.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'One Centimetre\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Bi Shu-min, and what two professional identities does she hold that inform her writing perspective?', options: [
                { text: 'Bi Shu-min is a contemporary Chinese writer born in 1952 who has worked as a doctor for', outcome: 'Bi Shu-min is a contemporary Chinese writer born in 1952 who has worked as a doctor for over twenty.' },
                { text: 'she is only a writer', outcome: 'Not quite — Students treat "context" as a list of memorizable facts (author birth year, awards, publication.', reveals: 'students-treat-context-as-a' },
                { text: 'she is a teacher', outcome: 'Not quite — Students treat "context" as a list of memorizable facts (author birth year, awards, publication.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'One Centimetre\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the inciting incident that sets the main plot of "One Centimetre" in motion?', options: [
                { text: 'The inciting incident is Tao Ying receiving a free temple ticket from her colleague Lao', outcome: 'The inciting incident is Tao Ying receiving a free temple ticket from her colleague Lao Chiang.' },
                { text: 'the bus incident', outcome: 'Not quite — Students often think "plot" and "narrative structure" are the same thing.', reveals: 'plot-and-narrative-structure-are' },
                { text: 'the guard stopping them', outcome: 'Not quite — Students often think "plot" and "narrative structure" are the same thing.', reveals: 'plot-and-narrative-structure-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'One Centimetre\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'List the four primary physical settings in "One Centimetre" and state one sensory detail associated with each.', options: [
                { text: 'The four primary settings are: (1) the bus', outcome: 'The four primary settings are: (1) the bus — smell of petrol, sound of doors shutting, sight.' },
                { text: 'bus and temple', outcome: 'Not quite — Students often think "setting = where and when" and "atmosphere = mood," treating them as static.', reveals: 'setting-where-and-when-and' },
                { text: 'crowded', outcome: 'Not quite — Students often think "setting = where and when" and "atmosphere = mood," treating them as static.', reveals: 'setting-where-and-when-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'One Centimetre\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Tao Ying\'s occupation, and how does it influence her attitude toward money in the opening scene of the story?', options: [
                { text: 'Tao Ying works as a cook in a factory canteen, baking wheat cakes over an open fire', outcome: 'Tao Ying works as a cook in a factory canteen, baking wheat cakes over an open fire.' },
                { text: 'she is a teacher', outcome: 'Not quite — Students often think Tao Ying\'s ticket-buying inconsistency (sometimes buying, sometimes not) makes.', reveals: 'tao-ying-s-ticket-buying' },
                { text: 'she doesn\'t care about money', outcome: 'Not quite — Students often think Tao Ying\'s ticket-buying inconsistency (sometimes buying, sometimes not) makes.', reveals: 'tao-ying-s-ticket-buying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'One Centimetre\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "One Centimetre" in one complete thematic statement (not a topic like "motherhood" or "honesty", but a full.', options: [
                { text: '**Correct answer:** The primary theme is the conflict between a parent\'s desire to model', outcome: '**Correct answer:** The primary theme is the conflict between a parent\'s desire to model perfect.' },
                { text: 'Honesty is the best policy', outcome: 'Not quite — Students confuse **theme** with **plot summary** or **moral lesson**.', reveals: 'students-confuse-theme-with-plot' },
                { text: 'Mothers love their children', outcome: 'Not quite — Students confuse **theme** with **plot summary** or **moral lesson**.', reveals: 'students-confuse-theme-with-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a temple counter your daughter measures one centimetre over the free-entry height. The attendant waves you through anyway; she\'s watching you decide.',
            decisions: [{ prompt: 'Pay or take the free pass?', options: [
                { text: 'Pay — \'One Centimetre\' is about integrity measured in millimetres and watched by a child; the ticket is cheap, the lesson about rules and dignity is the real purchase.', outcome: 'Tao Ying\'s struggle shows the smallness of the money and the largeness of what a parent models — the centimetre is where character gets measured.' },
                { text: 'Take the pass — it\'s a centimetre; rules this trivial don\'t bind anyone.', outcome: 'That teaches her that rules apply only when inconvenient to you — the exact erosion the story dissects.', reveals: 'small-cheats-dont-count' },
                { text: 'Take it — money saved is money spent on her later, which is more honest love.', outcome: 'Ends can\'t launder means a child is watching; she\'ll remember the shrug, not the arithmetic.', reveals: 'ends-justify-dishonesty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a height check as a battle over dignity — and spot how institutions hide behind standards they don\'t even honour.',
            decisions: [{ prompt: 'What comes next? One Centimetre (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — One Centimetre (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_001', difficulty: 'standard',
          question: '\'One Centimetre\' (Kaleidoscope, ch. 5) — the context and background to this.',
          hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001).',
          misconception: 'Students treat "context" as a list of memorizable facts (author birth year, awards, publication date) rather than.',
          parts: [
                { id: 'a', prompt: 'Compare the two measurement scenes: the bus conductor\'s "pale finger" pointing at "1.10 m" on peeling paint, and the temple guard\'s "red line on the wall which.', answer: 'The bus marker is a painted finger on peeling paint',
                  options: ['The bus marker is a painted finger on peeling paint', 'so what?'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) — specifically the.',
                  misconception: 'Students treat "context" as a list of memorizable facts (author birth year, awards, publication date) rather than an interpretive.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['If a student reduces context to factoids: (1) Assign a 3-column table: Column A = Contextual Fact (e.g., "author is.', '(2) Have them complete it for 3 facts from the story.', '(3) Re-diagnose with Question 2: "Now explain how Tao Ying\'s factory job shapes her reaction to the twenty-cent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'One Centimetre\' — what happens, in what order, and.',
          hint: 'Review "plot vs. narrative structure" using Class 11 Hornbill Chapter 1 ("The Portrait.',
          misconception: 'Students often think "plot" and "narrative structure" are the same thing.',
          parts: [
                { id: 'a', prompt: 'Why does the author include the flashback about Tao Ying scolding Xiao Ye for imitating her watermelon-eating habit?', answer: 'The flashback shows Tao Ying\'s fierce determination to model perfect behavior,',
                  options: ['The flashback shows Tao Ying\'s fierce determination to model perfect behavior,', 'it shows she loves watermelon', 'it\'s just a cute memory', 'narrative structure'],
                  hint: 'Review "plot vs. narrative structure" using Class 11 Hornbill Chapter 1 ("The Portrait of a Lady").',
                  misconception: 'Students often think "plot" and "narrative structure" are the same thing. They list events in chronological order and call it structure.' }
          ],
            remediations: { 'plot-and-narrative-structure-are': { steps: ['If the student conflates plot and structure: (1) Have them draw two timelines — one chronological (bus → temple →.', '(2) Ask: "Why did the author show the bus incident *after* the temple guard confrontation?" (3) Guide them to see that.', '(4) Re-test with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "plot" and "narrative structure" are the same thing.',
          parts: [
                { id: 'a', prompt: 'Write a 3-sentence alternative ending where Tao Ying accepts the officials\' offer of two free tickets, and explain in one sentence how this changes the story\'s.', answer: 'Example: "Tao Ying accepts the two tickets with a grateful smile',
                  options: ['Example: "Tao Ying accepts the two tickets with a grateful smile', 'narrative structure', '"plot" and "narrative structure" are the same thing'],
                  hint: 'Review "plot vs. narrative structure" using Class 11 Hornbill Chapter 1 ("The Portrait of a Lady").',
                  misconception: 'Students often think "plot" and "narrative structure" are the same thing. They list events in chronological order and call it structure.' }
          ],
            remediations: { 'plot-and-narrative-structure-are': { steps: ['If the student conflates plot and structure: (1) Have them draw two timelines — one chronological (bus → temple →.', '(2) Ask: "Why did the author show the bus incident *after* the temple guard confrontation?" (3) Guide them to see that.', '(4) Re-test with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_003', difficulty: 'standard',
          question: 'The setting of \'One Centimetre\' — the place, time and atmosphere the text.',
          hint: 'If unable to separate setting from atmosphere, revisit Class 11 Hornbill/Snapshots.',
          misconception: 'Students often think "setting = where and when" and "atmosphere = mood," treating them as static labels.',
          parts: [
                { id: 'a', prompt: 'List the four primary physical settings in "One Centimetre" and state one sensory detail associated with each.', answer: 'The four primary settings are: (1) the bus',
                  options: ['The four primary settings are: (1) the bus', 'bus and temple', 'crowded', 'setting = where and when'],
                  hint: 'If unable to separate setting from atmosphere, revisit Class 11 Hornbill/Snapshots "Setting and.',
                  misconception: 'Students often think "setting = where and when" and "atmosphere = mood," treating them as static labels.' },
                { id: 'b', prompt: 'Explain in your own words how the atmosphere on the bus differs from the atmosphere at the temple gate, and identify one narrative technique Bi Shu-min uses.', answer: 'The bus atmosphere is mundane, slightly cynical, and routine',
                  options: ['The bus atmosphere is mundane, slightly cynical, and routine', 'earthworm', 'fishes swarming towards a bright light', 'bus is happy, temple is sad'],
                  hint: 'If unable to separate setting from atmosphere, revisit Class 11 Hornbill/Snapshots "Setting and.',
                  misconception: 'Students often think "setting = where and when" and "atmosphere = mood," treating them as static labels.' }
          ],
            remediations: { 'setting-where-and-when-and': { steps: ['If the student conflates setting with plot or treats atmosphere as a single adjective: (1) Have them reread the bus.', '(2) Ask: "What does the narrator show you (sight/sound/smell) vs.', 'what does Tao Ying feel?" (3) Create a two-column chart: Column A = sensory details quoted from text; Column.', '(4) Practice with the home measurement scene: highlight every sensory word (yellow tape, white wall, soap, armpits) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis in \'One Centimetre\' — the central figure(s), their traits.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 protagonist analysis (c11_eng_h_cbse_01_004).',
          misconception: 'Students often think Tao Ying\'s ticket-buying inconsistency (sometimes buying, sometimes not) makes her hypocritical.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Tao Ying buys two tickets on the bus when the conductor says Xiao Ye is "one centimetre short" of requiring a ticket, even though.', answer: 'Tao Ying buys the ticket',
                  options: ['Tao Ying buys the ticket', 'she wanted to avoid trouble'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 protagonist analysis (c11_eng_h_cbse_01_004) for the.',
                  misconception: 'Students often think Tao Ying\'s ticket-buying inconsistency (sometimes buying, sometimes not) makes her hypocritical or morally weak.' }
          ],
            remediations: { 'tao-ying-s-ticket-buying': { steps: ['If a student labels Tao Ying "hypocritical," have them reread the bus scene (paragraphs 1-3) and temple scene.', 'Ask: "When alone, what does 20 cents mean to her?', 'When with Xiao Ye, what does 20 cents buy?" Guide them to list: Alone = 3 bunches of radishes/4 days spinach (survival).', 'With son = promise kept, self-esteem, trust (motherhood).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_005', difficulty: 'standard',
          question: 'Supporting characters in \'One Centimetre\' — the secondary figures who move the.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 5 (The Ailing Planet) supporting character.',
          misconception: 'Students treat supporting characters as \'minor\' and therefore less important for exams.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'One Centimetre\'',
                  options: ['Supporting characters in \'One Centimetre\'', '\'One Centimetre\' (Kaleidoscope, ch', 'The plot/narrative arc of \'One Centimetre\'', 'The setting of \'One Centimetre\''],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 5 (The Ailing Planet) supporting character analysis.',
                  misconception: 'Students treat supporting characters as \'minor\' and therefore less important for exams.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond plot-summary descriptions: (1) Assign a \'Character Function Chart\' — columns: Character.', '(2) Have them re-read ONLY the temple scene (pp.', '75-80) and highlight every line spoken by the guard — then ask: "What does each line DO to Tao Ying?" (3) Practice one.', '(4) Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of \'One Centimetre\' — the central idea the whole text returns.',
          hint: 'If stuck on thematic statement, revisit **node 004** and list 5 things Tao Ying *does*.',
          misconception: 'Students confuse **theme** with **plot summary** or **moral lesson**.',
          parts: [
                { id: 'a', prompt: 'Explain why Tao Ying buys two bus tickets when alone she often rides without one. What does this choice reveal about the story\'s central conflict?', answer: '**Correct answer:** Tao Ying buys tickets',
                  options: ['**Correct answer:** Tao Ying buys tickets', 'perfect mother', '**Why wrong answers fail:** Saying'],
                  hint: 'If stuck on thematic statement, revisit **node 004** and list 5 things Tao Ying *does* to.',
                  misconception: 'Students confuse **theme** with **plot summary** or **moral lesson**.' }
          ],
            remediations: { 'students-confuse-theme-with-plot': { steps: ['Re-read the **bus ticket scene** (paragraphs 1-3) and **temple gate scene** (paragraphs starting "Today she is taking.', 'List Tao Ying\'s *internal thoughts* vs *external actions* in each.', 'Identify the **three measurements**: bus door (1.10 m finger), temple wall (earthworm line), home tape (1.09 m).', 'Ask: *Who controls each measurement?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
