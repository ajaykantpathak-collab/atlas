import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch27_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch27_p1: SimDef = {
    id: 'v3_c11_eng_w_ch27_p1',
    title: 'My Watch (Essay) · Part 1/3',
    subtitle: 'Watch a perfect watch get repaired to death, one expert at a time.',
    classLevel: 11, subject: 'eng_w', topic: 'My Watch (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch27'],
    nodeIds: ['c11_eng_w_cbse_27_001', 'c11_eng_w_cbse_27_002', 'c11_eng_w_cbse_27_003', 'c11_eng_w_cbse_27_004', 'c11_eng_w_cbse_27_005', 'c11_eng_w_cbse_27_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader charting a comedy of accumulated incompetence', intro: 'Eighteen months of perfect timekeeping — then one regulation too many, and seven specialists standing between a man and the correct time.', goal: 'Analyse the essay\'s episodic structure and the satiric work of its open ending.' },
    discovery: {
        question: 'Seven watchmakers \'fix\' Twain\'s watch and each leaves it worse. Where does this escalating farce actually climax?',
        options: ['At the seventh — a former steamboat engineer who destroys the watch completely', 'At the first repair — the original mistake that starts it all', 'There is none — episodes merely repeat', 'At the purchase of the cheap new watch'],
        answer: 'At the seventh — a former steamboat engineer who destroys the watch completely',
        hook: 'It\'s episodic, not linear — the same disaster loops with variations, and the comedy is that expertise itself becomes the hazard.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that equips students with the historical, cultural, biographical, and literary framework necessary to access an autobiographical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_27_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Chart the repair-hope-failure episodes, place the steamboat engineer\'s finale, and defend why buying a cheap watch beats a \'fixed\' ending.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine opening your textbook to an essay titled "Bridges" by Kumudini Lakhia.',
            decisions: [{ prompt: 'What is the primary purpose of a "Before You Read" section for an autobiographical essay like "Bridges"?', options: [
                { text: 'The primary purpose is to provide the historical, cultural, biographical, and literary', outcome: 'The primary purpose is to provide the historical, cultural, biographical, and literary context that.' },
                { text: 'to summarize the story', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia rather than an interpretive lens.', reveals: 'students-treat-before-you-read' },
                { text: 'to give away the ending', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia rather than an interpretive lens.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a disastrous visit to a mechanic where your car came back worse each time – you\'d naturally structure it as a series.',
            decisions: [{ prompt: 'What is the inciting incident in the plot of "My Watch"?', options: [
                { text: 'The inciting incident is the narrator letting his watch run down after 18 months of', outcome: 'The inciting incident is the narrator letting his watch run down after 18 months of perfect.' },
                { text: 'the watch being bought', outcome: 'Not quite — Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has.', reveals: 'students-often-confuse-chronological-order' },
                { text: 'the seventh watchmaker', outcome: 'Not quite — Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has.', reveals: 'students-often-confuse-chronological-order' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a watch-repair shop: the smell of oil, the ticking of dozens of clocks, a craftsman peering through a magnifying glass.',
            decisions: [{ prompt: 'What is the primary setting of the opening paragraph of "My Watch," and what atmosphere does it establish?', options: [
                { text: 'The opening paragraph is set in the narrator\'s private space (his room) where he proudly', outcome: 'The opening paragraph is set in the narrator\'s private space (his room) where he proudly possesses.' },
                { text: 'a watch shop', outcome: 'Not quite — Students often think "setting" only means "where and when" and treat atmosphere as a separate label.', reveals: 'setting-only-means-where-and' },
                { text: 'a chaotic mood', outcome: 'Not quite — Students often think "setting" only means "where and when" and treat atmosphere as a separate label.', reveals: 'setting-only-means-where-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re describing your best friend to someone who\'s never met them — you wouldn\'t just say "she\'s nice"; you\'d give examples: "she stayed up all night.',
            decisions: [{ prompt: 'What is the primary difference between a character trait and a character feeling in literary analysis?', options: [
                { text: 'A character trait is an enduring quality that defines personality (e.g., Kumudini\'s', outcome: 'A character trait is an enduring quality that defines personality (e.g., Kumudini\'s curiosity).' },
                { text: 'sadness', outcome: 'Not quite — Students often treat autobiographical protagonists as "just the author telling their life story".', reveals: 'students-often-treat-autobiographical-protagonis' },
                { text: 'excitement', outcome: 'Not quite — Students often treat autobiographical protagonists as "just the author telling their life story".', reveals: 'students-often-treat-autobiographical-protagonis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Think about a time when a difficult experience — like moving schools or losing a loved one — later helped you understand something important about yourself.',
            decisions: [{ prompt: 'What is the difference between a plot summary and a theme statement in an autobiographical essay?', options: [
                { text: 'A plot summary recounts *what happens* in chronological order (e.g., "Lakhia\'s mother', outcome: 'A plot summary recounts *what happens* in chronological order (e.g., "Lakhia\'s mother forced her.' },
                { text: 'Kumudini Lakhia\'s journey to becoming a famous dancer', outcome: 'Not quite — Students often believe the primary theme is simply "Kumudini Lakhia\'s journey to becoming a famous.', reveals: 'the-primary-theme-is-simply' },
                { text: 'the importance of dance in her life', outcome: 'Not quite — Students often believe the primary theme is simply "Kumudini Lakhia\'s journey to becoming a famous.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a memoir-writing workshop you\'re comparing two essays from your syllabus: Lakhia\'s \'Bridges\', where a Kathak dancer turns life episodes into choreography, and Twain\'s \'My Watch\', where each repair makes the watch worse. A fellow participant calls both \'just chronological life stories with a beginning, middle and end.\'',
            decisions: [{ prompt: 'What\'s a sharper description of how these essays are built?', options: [
                { text: 'Name the real structures: \'Bridges\' is reflective autobiography — episodes selected because they become choreographic material, linking guru-shishya discipline to artistic creation. \'My Watch\' is episodic and circular — a repeating loop of hope → repair → brief success → worse failure, where the pile-up of the same disaster IS the humour and the trapped frustration.', outcome: 'Chronology is the raw material, not the structure: one essay builds bridges between life and art, the other spins in a comic trap of repetition.' },
                { text: 'Agree — both run in time order, so both have a linear plot.', outcome: 'Time order isn\'t linear structure: \'My Watch\' repeats circular episodes that don\'t build to a single climax — the repetition is the design.', reveals: 'chronological-equals-linear' },
                { text: 'Focus on facts instead — Lakhia\'s birth year and awards, Twain\'s biography — since structure is too subtle to discuss.', outcome: 'Context is a lens, not data: knowing Lakhia choreographed Umrao Jaan explains the essay\'s cinematic eye; a birth year explains nothing.', reveals: 'context-is-trivia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_006', title: 'The bigger picture',
          caseStudy: { intro: 'He ends not with a repaired watch but a cheap new one — the open ending seals the satire: incompetence wins, resignation is the punchline.',
            decisions: [{ prompt: 'What comes next? My Watch (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — My Watch (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that equips.',
          hint: 'Review Class 10 "Diary as a Literary Form" (c10_engl_cbse_04_007) focusing on Anne.',
          misconception: 'Students treat "Before You Read" as optional background trivia rather than an interpretive lens.',
          parts: [
                { id: 'a', prompt: 'Using the vocabulary list (infraction, demeanour, dubious assertion, synergy), write one sentence for each word that demonstrates its meaning in the context.', answer: 'Infraction: "The principal summoned me for an infraction',
                  options: ['Infraction: "The principal summoned me for an infraction', 'Demeanour', 'Dubious assertion', 'Synergy'],
                  hint: 'Review Class 10 "Diary as a Literary Form" (c10_engl_cbse_04_007) focusing on Anne Frank\'s.',
                  misconception: 'Students treat "Before You Read" as optional background trivia rather than an interpretive lens.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate how context shapes reading expectations: 1.', 'Assign a 5-minute "Context-to-Text" exercise: give them one contextual fact (e.g., "Lakhia was the only girl among 29.', 'Model think-aloud: "Because I know Partition displaced her Lahore friends, I expect the essay to treat \'home\'.', 'Have them re-read the first two paragraphs with this lens, annotating every phrase that echoes the predicted themes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the organized sequence of events in.',
          hint: 'Review Freytag\'s Pyramid using a familiar story (e.g., "The Necklace" from Class 10) and.',
          misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the narrative structure of "My Watch" is described as episodic rather than strictly linear.', answer: 'The structure is episodic',
                  options: ['The structure is episodic', 'linear because it goes in time order', 'chronological order', 'linear plot structure'],
                  hint: 'Review Freytag\'s Pyramid using a familiar story (e.g., "The Necklace" from Class 10) and practice.',
                  misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot because events happen.' },
                { id: 'b', prompt: 'Apply Freytag\'s Pyramid to "My Watch" by labeling the paragraph numbers (or key moments) for: Exposition, Rising Action (list 3 episodes), Climax, Falling.', answer: 'Exposition: Para 1 (watch runs perfectly for 18 months)',
                  options: ['Exposition: Para 1 (watch runs perfectly for 18 months)', 'chronological order', 'linear plot structure', 'My Watch'],
                  hint: 'Review Freytag\'s Pyramid using a familiar story (e.g., "The Necklace" from Class 10) and practice.',
                  misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot because events happen.' },
                { id: 'c', prompt: 'Analyze how the first-person narrative perspective contributes to the humour of the plot structure. Use two specific textual details.', answer: 'The first-person perspective traps the reader inside the narrator\'s escalating',
                  options: ['The first-person perspective traps the reader inside the narrator\'s escalating', 'we know his feelings', 'chronological order', 'linear plot structure'],
                  hint: 'Review Freytag\'s Pyramid using a familiar story (e.g., "The Necklace" from Class 10) and practice.',
                  misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot because events happen.' }
          ],
            remediations: { 'students-often-confuse-chronological-order': { steps: ['Draw a visual plot diagram on paper: a straight line (linear) vs.', 'a staircase of repeated up-down loops (episodic).', 'Map each watchmaker visit as one loop: label "Hope" at the top, "Failure" at the bottom.', 'Ask: "Does the tension *increase* each time, or does it *reset*?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the essay\'s open ending (buying a cheap watch) versus a closed ending where the watch is finally fixed.', answer: 'The open ending is more effective',
                  options: ['The open ending is more effective', 'chronological order', 'linear plot structure', 'My Watch'],
                  hint: 'Review Freytag\'s Pyramid using a familiar story (e.g., "The Necklace" from Class 10) and practice.',
                  misconception: 'Students often confuse "chronological order" with "linear plot structure" and claim "My Watch" has a linear plot because events happen.' }
          ],
            remediations: { 'students-often-confuse-chronological-order': { steps: ['Draw a visual plot diagram on paper: a straight line (linear) vs.', 'a staircase of repeated up-down loops (episodic).', 'Map each watchmaker visit as one loop: label "Hope" at the top, "Failure" at the bottom.', 'Ask: "Does the tension *increase* each time, or does it *reset*?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_003', difficulty: 'standard',
          question: 'Setting in a prose essay refers to the time, place, and social environment.',
          hint: 'Review the plot summary (node 002) and create a timeline of locations with one quoted.',
          misconception: 'Students often think "setting" only means "where and when" and treat atmosphere as a separate label (e.g., "the mood.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "social setting" to the essay: what does the narrator\'s interaction with the first watchmaker reveal about the social atmosphere.', answer: 'The social setting exposes a false hierarchy: the watchmaker performs authority',
                  options: ['The social setting exposes a false hierarchy: the watchmaker performs authority', 'setting', 'where and when', 'the mood is funny'],
                  hint: 'Review the plot summary (node 002) and create a timeline of locations with one quoted phrase per.',
                  misconception: 'Students often think "setting" only means "where and when" and treat atmosphere as a separate label (e.g., "the mood is funny").' }
          ],
            remediations: { 'setting-only-means-where-and': { steps: ['Have the student re-read only the first and last paragraphs, highlighting every noun that names a place or object.', 'Ask: "What feeling does each object give you?" and list them.', 'Draw a two-column table: left column = physical detail (quote), right column = emotional effect.', 'Model one row together (e.g., "the watchmaker\'s magnifying glass" → "mock gravity, pretending science").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'Review PEEL structure from c10_engl_cbse_04_009 (Anne Frank character analysis) and.',
          misconception: 'Students often treat autobiographical protagonists as "just the author telling their life story" and list events.',
          parts: [
                { id: 'a', prompt: 'In "Bridges," Kumudini says: "I was always a curious child and I wanted to know and understand what I was doing.', answer: 'This reveals intellectual independence and a need for logical reasoning',
                  options: ['This reveals intellectual independence and a need for logical reasoning', 'she is curious', 'perfect the technique, then throw it overboard'],
                  hint: 'Review PEEL structure from c10_engl_cbse_04_009 (Anne Frank character analysis) and trait/feeling.',
                  misconception: 'Students often treat autobiographical protagonists as "just the author telling their life story" and list events chronologically instead.' }
          ],
            remediations: { 'students-often-treat-autobiographical-protagonis': { steps: ['Have the student create a two-column table: Column A = "Events Kumudini chooses to narrate" (e.g., guava incident.', 'Ask: "Why does she include the guava incident with Liaquat Ali but not her brother\'s perspective?', 'What does her focus on the *mali\'s* face reveal about her political awareness?" 3.', 'Guide them to rewrite one chronological summary paragraph into an analytical paragraph using the PEEL structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_005', difficulty: 'standard',
          question: 'Supporting characters in a narrative are secondary figures who interact with.',
          hint: 'Review the plot summary in node 002 (Text: Plot and Narrative Structure) focusing on the.',
          misconception: 'Students often treat supporting characters in humorous essays as mere "plot devices" or "flat stereotypes" with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in a narrative are secondary figures who interact with the',
                  options: ['Supporting characters in a narrative are secondary figures who interact with the', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refer to the organized sequence of events in a story (plot)', 'Setting in a prose essay refers to the time, place, and social environment where the'],
                  hint: 'Review the plot summary in node 002 (Text: Plot and Narrative Structure) focusing on the \'episodic.',
                  misconception: 'Students often treat supporting characters in humorous essays as mere "plot devices" or "flat stereotypes" with no individuality, missing.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student lists repairers but cannot explain their thematic function: 1) Have them create a two-column table: Column.', '2) Ask: "What word describes the gap between Column A and B?" (Irony/Hubris).', '3) Guide them to see each row as a mini-satire of a profession.', '4) Finally, ask: "If you remove all repairers, what happens to the essay\'s message about time and control?" This forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_006', difficulty: 'standard',
          question: 'The primary theme of an autobiographical essay is the central, universal.',
          hint: 'If stuck, review the "Understanding the Text" Q3 and Q4 in the textbook — they directly.',
          misconception: 'Students often believe the primary theme is simply "Kumudini Lakhia\'s journey to becoming a famous dancer" or "the.',
          parts: [
                { id: 'a', prompt: 'The title "Bridges" is a metaphor. Explain what two realms the author says she bridges, and give one example from the text where she explicitly describes this.', answer: 'Lakhia bridges her *life experiences* and her *work in dance/choreography*',
                  options: ['Lakhia bridges her *life experiences* and her *work in dance/choreography*', 'I can see clear bridges between my life experiences and my work in dance', 'she bridges India and the West', 'she bridges tradition and modernity'],
                  hint: 'If stuck, review the "Understanding the Text" Q3 and Q4 in the textbook — they directly ask for.',
                  misconception: 'Students often believe the primary theme is simply "Kumudini Lakhia\'s journey to becoming a famous dancer" or "the importance of dance.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['Have the student list 5 key events in the essay.', 'Next to each, write what Lakhia *learned* or *how she used it later* (e.g., boarding school → British discipline →.', 'Ask: "What word describes the *process* of turning these events into dance?" Guide them to "bridge," "transform,".', 'Co-construct a theme statement using the formula: "The essay argues that [universal human experience] is [author\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
