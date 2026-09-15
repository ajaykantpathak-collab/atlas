import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch06_p1: SimDef = {
    id: 'v3_c12_eng_f_ch06_p1',
    title: 'Poets and Pancakes · Part 1/3',
    subtitle: 'Truckloads of make-up and a poet nobody understood',
    classLevel: 12, subject: 'eng_f', topic: 'Poets and Pancakes · Part 1/3',
    chapters: ['c12_eng_f_ch06'],
    nodeIds: ['c12_eng_f_cbse_06_001', 'c12_eng_f_cbse_06_002', 'c12_eng_f_cbse_06_003', 'c12_eng_f_cbse_06_004', 'c12_eng_f_cbse_06_005', 'c12_eng_f_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cultural satirist', intro: 'A clerk files newspaper cuttings at India\'s biggest film studio — and quietly writes its sharpest satire.', goal: 'Situate Poets and Pancakes in its 1950s film-studio world and decode its irony-laden portrait of literary pretension.' },
    discovery: {
        question: 'Gemini Studios\' make-up room was run by a Bengali, a Maharashtrian, a Kannadiga, an Andhra, a Christian, an Anglo-Burmese and Tamils — \'national integration,\' the author says, in a department that turns people into \'hideous crimson monsters.\' What\'s the joke really doing?',
        options: ['Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast', 'Praising the government\'s integration programmes', 'Just describing staff diversity factually', 'Mocking South Indian actors specifically'],
        answer: 'Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast',
        hook: 'Every detail in this memoir is irony under a flat tone — a failed-actor office boy lecturing a real writer about \'wasted talent\', truckloads of Pancake, a visiting English poet nobody understood. Context turns confusion into comedy; miss the era and the jokes evaporate.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading activity that provides historical, cultural, and authorial context to help students understand the setting, themes, and significance of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Go behind the scenes of 1950s Gemini Studios: place the Pancake make-up, the MRA visit and the office boy\'s ambitions in their Congress-era, khadi-clad milieu — and read Asokamitran\'s straight-faced satire.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a behind-the-scenes documentary about a famous old film studio.',
            decisions: [{ prompt: 'Who was Asokamitran and what was his job at Gemini Studios?', options: [
                { text: 'Asokamitran (1931–2017) was a Tamil writer who worked at Gemini Studios in the 1950s', outcome: 'Asokamitran (1931–2017) was a Tamil writer who worked at Gemini Studios in the 1950s; his duty was.' },
                { text: 'he was an actor', outcome: 'Not quite — Students often think "Before You Read" is just a summary of the story.', reveals: 'before-you-read-is-just' },
                { text: 'he directed films', outcome: 'Not quite — Students often think "Before You Read" is just a summary of the story.', reveals: 'before-you-read-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re flipping through an old photo album where each picture sparks a story that leads to another — that\'s exactly how Asokamitran structures this.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "Poets and Pancakes," and how does it shape the reader\'s access to events at Gemini.', options: [
                { text: 'The text uses a first-person retrospective narrative ("I worked in a cubicle," "I was', outcome: 'The text uses a first-person retrospective narrative ("I worked in a cubicle," "I was praying for.' },
                { text: 'omniscient narrator', outcome: 'Not quite — Students assume "rambling" means "unstructured" and look for a hidden chronological plot.', reveals: 'rambling-means-unstructured-and-look' },
                { text: 'rambling', outcome: 'Not quite — Students assume "rambling" means "unstructured" and look for a hidden chronological plot.', reveals: 'rambling-means-unstructured-and-look' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking onto a film set where the lights are so hot they melt the make-up off your face, yet everyone around you is sipping coffee and discussing.',
            decisions: [{ prompt: 'Name the building that housed the make-up department of Gemini Studios and the historical figure associated with it in local legend.', options: [
                { text: 'The make-up department was located upstairs in a building believed to have been Robert', outcome: 'The make-up department was located upstairs in a building believed to have been Robert Clive\'s.' },
                { text: 'the main studio building', outcome: 'Not quite — Students often treat setting as a static backdrop ("Gemini Studios, 1950s") and atmosphere as.', reveals: 'students-often-treat-setting-as' },
                { text: 'a modern office', outcome: 'Not quite — Students often treat setting as a static backdrop ("Gemini Studios, 1950s") and atmosphere as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Have you ever felt like an invisible observer in a room full of people who seem to belong?',
            decisions: [{ prompt: 'What is the protagonist\'s official job at Gemini Studios, and where does he perform it?', options: [
                { text: 'The protagonist works in a cubicle tearing up newspapers and filing clippings', outcome: 'The protagonist works in a cubicle tearing up newspapers and filing clippings.' },
                { text: 'he works in the make-up department', outcome: 'Not quite — Students often confuse the protagonist with Subbu because Subbu dominates the middle section.', reveals: 'students-often-confuse-the-protagonist' },
                { text: 'he is a poet', outcome: 'Not quite — Students often confuse the protagonist with Subbu because Subbu dominates the middle section.', reveals: 'students-often-confuse-the-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are at a chaotic Indian wedding where every relative has a distinct personality — the interfering aunt, the philosophical uncle, the cousin who.',
            decisions: [{ prompt: 'Identify the supporting character in "Poets and Pancakes" who is described as having "the ability to look cheerful at all times even after.', options: [
                { text: 'Correct answer: Kothamangalam Subbu', outcome: 'Correct answer: Kothamangalam Subbu. A wrong answer (e.g., "The Office Boy" or "The Legal Adviser").' },
                { text: 'The Office Boy', outcome: 'Not quite — Students treat supporting characters as mere "background information" to memorize (e.g., "Subbu was.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'The Legal Adviser', outcome: 'Not quite — Students treat supporting characters as mere "background information" to memorize (e.g., "Subbu was.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are watching a behind-the-scenes documentary of a 1950s film studio: you see glamorous stars, but also a make-up boy slathering pancake on crowd.',
            decisions: [{ prompt: 'What is the difference between a "subject" and a "theme" in literature? Give an example from "Poets and Pancakes."', options: [
                { text: 'A subject is the topic (e.g., "Gemini Studios" or "make-up department"), while a theme is', outcome: 'A subject is the topic (e.g., "Gemini Studios" or "make-up department"), while a theme is the.' },
                { text: 'The theme is the make-up department', outcome: 'Not quite — Students often think the primary theme is "Gemini Studios" or "the film industry" — i.e., they.', reveals: 'the-primary-theme-is-gemini' },
                { text: 'Gemini Studios', outcome: 'Not quite — Students often think the primary theme is "Gemini Studios" or "the film industry" — i.e., they.', reveals: 'the-primary-theme-is-gemini' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a film-set internship you watch one staffer quietly solve everyone\'s crises — scripts, schedules, egos — while credits and praise flow to others. As the team lead you can act.',
            decisions: [{ prompt: 'What\'s the fair call?', options: [
                { text: 'Name his contribution and formalise the role — Subbu at Gemini Studios in \'Poets and Pancakes\' shows how indispensable problem-solvers get consumed while staying invisible.', outcome: 'Asokamitran\'s satire lands here: institutions run on unacknowledged fixers, and fairness means making that labour seen.' },
                { text: 'Keep loading him — someone that useful doesn\'t need titles.', outcome: 'That\'s exactly how studios spent Subbu; usefulness without recognition is quiet exploitation.', reveals: 'utility-equals-value' },
                { text: 'Resent him — he must be angling for the boss\'s chair.', outcome: 'The office-poet jealousy in the story shows how suspicion of a capable colleague says more about the insecure observer.', reveals: 'competence-read-as-threat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear the joke under the deadpan — context is the punchline. This chapter trains the rarest reading skill: detecting irony without a single wink.',
            decisions: [{ prompt: 'What comes next? Poets and Pancakes · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poets and Pancakes · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading activity that.',
          hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) to practice.',
          misconception: 'Students often think "Before You Read" is just a summary of the story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a pre-reading activity that provides',
                  options: ['"Before You Read: Context and Background" is a pre-reading activity that provides', 'Plot and narrative structure in "Poets and Pancakes" refers to the author Asokamitran\'s', 'Setting refers to the time, place, and physical environment where a narrative unfolds', 'Character analysis of the protagonist involves examining the narrator\'s personality'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) to practice extracting.',
                  misconception: 'Students often think "Before You Read" is just a summary of the story. They read the context box and assume they now know the plot.' }
          ],
            remediations: { 'before-you-read-is-just': { steps: ['If the student conflates context with plot, have them re-read the "About the author" and "Notice these words" boxes.', 'Then ask: "List three things you know about Gemini Studios before the story starts, and three things you still don\'t.', 'Next, direct them to node c11_eng_h_cbse_01_001 (Class 11 Before You Read) to see how context differs from story.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Before You Read" is just a summary of the story.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s statement: "The great prose-writers of the world may not admit it, but my conviction grows stronger day after day that prose-writing.', answer: 'The author argues prose requires patient, persistent drudgery (rejection slips,',
                  options: ['The author argues prose requires patient, persistent drudgery (rejection slips,', 'Before You Read', '"Before You Read" is just a summary of the story'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) to practice extracting.',
                  misconception: 'Students often think "Before You Read" is just a summary of the story. They read the context box and assume they now know the plot.' },
                { id: 'b', prompt: 'Create a brief diary entry (50-60 words) from the perspective of the office boy on a day when crowd-shooting saves him from lecturing the author.', answer: '"Thank god for crowd-shooting today!',
                  options: ['"Thank god for crowd-shooting today!', 'Before You Read', '"Before You Read" is just a summary of the story'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) to practice extracting.',
                  misconception: 'Students often think "Before You Read" is just a summary of the story. They read the context box and assume they now know the plot.' }
          ],
            remediations: { 'before-you-read-is-just': { steps: ['If the student conflates context with plot, have them re-read the "About the author" and "Notice these words" boxes.', 'Then ask: "List three things you know about Gemini Studios before the story starts, and three things you still don\'t.', 'Next, direct them to node c11_eng_h_cbse_01_001 (Class 11 Before You Read) to see how context differs from story.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_002', difficulty: 'standard',
          question: 'Plot and narrative structure in "Poets and Pancakes" refers to the author.',
          hint: 'Review Class 11 "The Portrait of a Lady" (c11_eng_h_cbse_06_002) — how Khushwant Singh.',
          misconception: 'Students assume "rambling" means "unstructured" and look for a hidden chronological plot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in "Poets and Pancakes" refers to the author Asokamitran\'s',
                  options: ['Plot and narrative structure in "Poets and Pancakes" refers to the author Asokamitran\'s', '"Before You Read: Context and Background" is a pre-reading activity that provides', 'Setting refers to the time, place, and physical environment where a narrative unfolds', 'Character analysis of the protagonist involves examining the narrator\'s personality'],
                  hint: 'Review Class 11 "The Portrait of a Lady" (c11_eng_h_cbse_06_002) — how Khushwant Singh uses.',
                  misconception: 'Students assume "rambling" means "unstructured" and look for a hidden chronological plot.' }
          ],
            remediations: { 'rambling-means-unstructured-and-look': { steps: ['If the student cannot map transitions, have them: (1) re-read only the first sentence of each paragraph and list the.', 'Then re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment where a narrative.',
          hint: 'If stuck, revisit Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for the.',
          misconception: 'Students often treat setting as a static backdrop ("Gemini Studios, 1950s") and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and physical environment where a narrative unfolds',
                  options: ['Setting refers to the time, place, and physical environment where a narrative unfolds', '"Before You Read: Context and Background" is a pre-reading activity that provides', 'Plot and narrative structure in "Poets and Pancakes" refers to the author Asokamitran\'s', 'Character analysis of the protagonist involves examining the narrator\'s personality'],
                  hint: 'If stuck, revisit Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for the basic.',
                  misconception: 'Students often treat setting as a static backdrop ("Gemini Studios, 1950s") and atmosphere as a single adjective ("funny" or "nostalgic").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Re-read the text marking every location change with a sticky note.', 'For each location, list 3 sensory details (sight, sound, smell, touch).', 'Write one sentence naming the dominant feeling that location evokes.', 'Check node c12_eng_f_cbse_06_002 (Plot and Narrative Structure) to see how setting shifts drive the narrative flow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'Review Class 11 character analysis steps in c11_eng_h_cbse_01_004: (1) collect direct.',
          misconception: 'Students often confuse the protagonist with Subbu because Subbu dominates the middle section.',
          parts: [
                { id: 'a', prompt: 'What is the protagonist\'s official job at Gemini Studios, and where does he perform it?', answer: 'The protagonist works in a cubicle tearing up newspapers and filing clippings',
                  options: ['The protagonist works in a cubicle tearing up newspapers and filing clippings', 'he works in the make-up department', 'he is a poet'],
                  hint: 'Review Class 11 character analysis steps in c11_eng_h_cbse_01_004: (1) collect direct quotes, (2).',
                  misconception: 'Students often confuse the protagonist with Subbu because Subbu dominates the middle section.' },
                { id: 'b', prompt: 'Analyze the contrast between the office boy\'s frustration and the protagonist\'s reaction to it.', answer: 'The office boy externalizes blame (on Subbu)',
                  options: ['The office boy externalizes blame (on Subbu)', 'passive'],
                  hint: 'Review Class 11 character analysis steps in c11_eng_h_cbse_01_004: (1) collect direct quotes, (2).',
                  misconception: 'Students often confuse the protagonist with Subbu because Subbu dominates the middle section.' }
          ],
            remediations: { 'students-often-confuse-the-protagonist': { steps: ['Re-read the first five paragraphs highlighting every "I" statement.', 'List what the narrator explicitly says about himself vs.', 'what others say about him.', 'Compare with the office boy\'s monologue (paragraph 6) to see the contrast in agency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck on satirical tone: Re-read the first two paragraphs of the chapter (make-up.',
          misconception: 'Students treat supporting characters as mere "background information" to memorize (e.g., "Subbu was No.',
          parts: [
                { id: 'a', prompt: 'Identify the supporting character in "Poets and Pancakes" who is described as having "the ability to look cheerful at all times even after having had a hand.', answer: 'Correct answer: Kothamangalam Subbu',
                  options: ['Correct answer: Kothamangalam Subbu', 'The Office Boy', 'The Legal Adviser'],
                  hint: 'If stuck on satirical tone: Re-read the first two paragraphs of the chapter (make-up room, Robert.',
                  misconception: 'Students treat supporting characters as mere "background information" to memorize (e.g., "Subbu was No. 2," "Legal Adviser wore pants").' },
                { id: 'b', prompt: 'Explain in your own words why the author says the make-up department was an example of "national integration long before A.I.R.', answer: 'Correct answer: The make-up department was headed by a Bengali, succeeded by a',
                  options: ['Correct answer: The make-up department was headed by a Bengali, succeeded by a', 'They all wore khadi', 'They were all poets'],
                  hint: 'If stuck on satirical tone: Re-read the first two paragraphs of the chapter (make-up room, Robert.',
                  misconception: 'Students treat supporting characters as mere "background information" to memorize (e.g., "Subbu was No. 2," "Legal Adviser wore pants").' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond description to analysis: (1) Have them re-read the Office Boy section and list every.', '(2) Ask: "What does this cluster of verbs reveal about his AGENCY?" (Answer: almost N/A — he acts ON others or WISHES.', '(3) Repeat for Subbu (inspired, came out with, turned, composed, recreated, performed, loved, fed).', '(4) Contrast: Office Boy = passive resentment; Subbu = active service.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review the "Subject + Insight = Theme" formula with a simpler text (e.g.,.',
          misconception: 'Students often think the primary theme is "Gemini Studios" or "the film industry" — i.e., they confuse the.',
          parts: [
                { id: 'a', prompt: 'Read this short passage: "The IT company\'s \'innovation lab\' had bean bags, a foosball table, and inspirational quotes on the walls.', answer: 'Theme: Corporate culture often masks mundane reality with superficial perks',
                  options: ['Theme: Corporate culture often masks mundane reality with superficial perks', 'The theme is the innovation lab', 'Gemini Studios', 'the film industry'],
                  hint: 'If stuck, review the "Subject + Insight = Theme" formula with a simpler text (e.g., a fable.',
                  misconception: 'Students often think the primary theme is "Gemini Studios" or "the film industry" — i.e., they confuse the *setting/subject* with the.' },
                { id: 'b', prompt: 'Compare the portrayal of the "poet in a film studio" in "Poets and Pancakes" with the portrayal of the artist in R.K.', answer: 'Both use situational irony: Asokamitran\'s poets are reduced to cutting newspaper',
                  options: ['Both use situational irony: Asokamitran\'s poets are reduced to cutting newspaper', 'Gemini Studios', 'the film industry', 'the primary theme is "Gemini Studios" or "the film industry"'],
                  hint: 'If stuck, review the "Subject + Insight = Theme" formula with a simpler text (e.g., a fable.',
                  misconception: 'Students often think the primary theme is "Gemini Studios" or "the film industry" — i.e., they confuse the *setting/subject* with the.' }
          ],
            remediations: { 'the-primary-theme-is-gemini': { steps: ['Revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message from Hornbill) to practice distinguishing subject vs.', 'theme using the "Subject + Insight = Theme" formula.', 'Re-read the chapter *only* for the narrator\'s commentary (ignore plot) and highlight every sentence where the narrator.', 'Write three thematic statements using the formula; pick the one that covers the most textual evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
