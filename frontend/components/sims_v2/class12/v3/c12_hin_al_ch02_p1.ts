import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p1: SimDef = {
    id: 'v3_c12_hin_al_ch02_p1',
    title: 'fcLdksgj dh ekVh · Part 1/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'fcLdksgj dh ekVh · Part 1/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_001', 'c12_hin_al_cbse_02_002', 'c12_hin_al_cbse_02_003', 'c12_hin_al_cbse_02_004', 'c12_hin_al_cbse_02_005', 'c12_hin_al_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares students to engage with the autobiographical sketch by providing essential information about the author (Upendranath.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a diary page from your great‑grandmother describing her village childhood — you’d want to know who she was, where she lived, and what.',
            decisions: [{ prompt: 'Who is the author of "फुलचंद की एकवह" and what is his primary literary identity?', options: [
                { text: 'Correct answer: Upendranath Ashk (उपेन्द्रनाथ अश्क), a prominent Hindi writer known for', outcome: 'Correct answer: Upendranath Ashk (उपेन्द्रनाथ अश्क), a prominent Hindi writer known for short.' },
                { text: 'Premchand or guessing a poet', outcome: 'Not quite — Students often treat the "Before You Read" section as optional background trivia and skip.', reveals: 'students-often-treat-the-before' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about your childhood village, but you don’t start at the beginning — you begin with the smell of rain on dry earth, which.',
            decisions: [{ prompt: 'What is the narrative perspective (point of view) used in "fcLdksgj dh ekVh"?', options: [
                { text: 'The story is told in first‑person retrospective narration (“मैं”) where the adult', outcome: 'The story is told in first‑person retrospective narration (“मैं”) where the adult narrator looks.' },
                { text: 'third‑person omniscient', outcome: 'Not quite — Students often confuse *plot* (what happens) with *narrative structure* (how it is told).', reveals: 'students-often-confuse-plot-what' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing at the edge of your ancestral village pond during the first monsoon rain — what do you smell, hear, feel on your skin?',
            decisions: [{ prompt: 'What are the three core components of \'setting\' in a narrative, and which component is most emphasized in the opening section of "fcLdksgj.', options: [
                { text: 'The three core components are time (when), place (where), and physical environment', outcome: 'The three core components are time (when), place (where), and physical environment (sensory world).' },
                { text: 'village', outcome: 'Not quite — Students treat setting as a static "where/when" label (e.g., "village, past") rather than a dynamic.', reveals: 'students-treat-setting-as-a' },
                { text: 'childhood', outcome: 'Not quite — Students treat setting as a static "where/when" label (e.g., "village, past") rather than a dynamic.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are asked to describe your younger self to a friend using only your most vivid childhood memories — what moments would you pick, and what would.',
            decisions: [{ prompt: 'What is the narrative point of view used in "fcLdksgj dh ekVh", and who is the protagonist?', options: [
                { text: 'The memoir is written in first-person point of view ("I" narrator), and the protagonist', outcome: 'The memoir is written in first-person point of view ("I" narrator), and the protagonist is the.' },
                { text: 'third person', outcome: 'Not quite — Students often confuse the *title character* (fcLdksgj, the mother) with the *protagonist* (the.', reveals: 'students-often-confuse-the-title' },
                { text: 'the mother is the protagonist', outcome: 'Not quite — Students often confuse the *title character* (fcLdksgj, the mother) with the *protagonist* (the.', reveals: 'students-often-confuse-the-title' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are flipping through an old family photo album: the main photo is you, but the people standing beside you — your sister pulling a face, your mother.',
            decisions: [{ prompt: 'Name any three supporting characters from "fcLdksgj dh ekVh" and state one defining trait for each based on the text.', options: [
                { text: 'Correct answer: (1) fclukFk', outcome: 'Correct answer: (1) fclukFk — the narrator\'s elder sister, protective and playful, e.g., she saves.' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students believe "supporting character analysis" means writing a short biography of each character.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'What comes next? fcLdksgj dh ekVh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — fcLdksgj dh ekVh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह).',
          hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1.',
          misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares',
                  options: ['"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares', 'Plot refers to the sequence of events that make up a story, while narrative structure is', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves examining the narrator\'s personality,'],
                  hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1 introduction).',
                  misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text will explain.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the textbook’s पाठ परिचय and लेखक परिचय boxes aloud.', 'Make a 3‑column table: Author Facts | Genre Features | Setting Details.', 'Revisit Class 11 node c11_hin_ar_cbse_01_001 (Before You Read for Chapter 1) to recall how context was used there.', 'Write a 50‑word paragraph predicting the chapter’s mood using your table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Knowing the author’s life history is more important than understanding the genre conventions for appreciating this chapter." Defend your position.', answer: 'Correct evaluation: Disagree',
                  options: ['Correct evaluation: Disagree', 'life = text'],
                  hint: 'If stuck, review the genre definition of रेखाचित्र in Class 11 textbook (Chapter 1 introduction).',
                  misconception: 'Students often treat the "Before You Read" section as optional background trivia and skip it, assuming the chapter text will explain.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the textbook’s पाठ परिचय and लेखक परिचय boxes aloud.', 'Make a 3‑column table: Author Facts | Genre Features | Setting Details.', 'Revisit Class 11 node c11_hin_ar_cbse_01_001 (Before You Read for Chapter 1) to recall how context was used there.', 'Write a 50‑word paragraph predicting the chapter’s mood using your table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_002', difficulty: 'standard',
          question: 'Plot refers to the sequence of events that make up a story, while narrative.',
          hint: 'If stuck, review the Class 11 node “Plot and Narrative Structure”.',
          misconception: 'Students often confuse *plot* (what happens) with *narrative structure* (how it is told).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot refers to the sequence of events that make up a story, while narrative structure is',
                  options: ['Plot refers to the sequence of events that make up a story, while narrative structure is', '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves examining the narrator\'s personality,'],
                  hint: 'If stuck, review the Class 11 node “Plot and Narrative Structure” (c11_hin_ar_cbse_01_002) and.',
                  misconception: 'Students often confuse *plot* (what happens) with *narrative structure* (how it is told).' }
          ],
            remediations: { 'students-often-confuse-plot-what': { steps: ['Re‑read the Class 11 node on narrative structure (c11_hin_ar_cbse_01_002) focusing on the definitions of linear vs.', 'Take a simple linear story (e.g., a Panchatantra tale) and deliberately rewrite it using two flashbacks triggered.', 'Return to "fcLdksgj dh ekVh" and highlight every sensory trigger (underline in one colour) and every time‑shift marker.', 'Re‑attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_02_003 "Sensory Detail Marking" exercise — practice.',
          misconception: 'Students treat setting as a static "where/when" label (e.g., "village, past") rather than a dynamic sensory ecosystem.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the author uses the monsoon season to create atmosphere in the first half of the chapter.', answer: 'The monsoon acts as an emotional catalyst',
                  options: ['The monsoon acts as an emotional catalyst', 'rainy season background'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_02_003 "Sensory Detail Marking" exercise — practice circling.',
                  misconception: 'Students treat setting as a static "where/when" label (e.g., "village, past") rather than a dynamic sensory ecosystem.' },
                { id: 'b', prompt: 'In the scene where the narrator describes his mother (fclukFk) feeding him by the pond, identify two specific sensory details and explain how each contributes.', answer: 'Detail 1: "ek¡ dk nwèk" (mother\'s lap)',
                  options: ['Detail 1: "ek¡ dk nwèk" (mother\'s lap)', 'mother gave food'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_02_003 "Sensory Detail Marking" exercise — practice circling.',
                  misconception: 'Students treat setting as a static "where/when" label (e.g., "village, past") rather than a dynamic sensory ecosystem.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student read aloud only the first paragraph, circling every verb related to senses (lxj, [kk, lquk, ns[k.', 'Ask "What is the pond DOING in this paragraph?" — force agency onto the setting.', 'Rewrite one sentence replacing static nouns with sensory verbs.', 'Re-attempt Diagnostic Q3 with this verb-focused lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'If stuck, re-read the chapter marking every "मैं" (I) passage — this isolates the.',
          misconception: 'Students often confuse the *title character* (fcLdksgj, the mother) with the *protagonist* (the narrator).',
          parts: [
                { id: 'a', prompt: 'Find two passages where the narrator reveals his sensitivity to nature.', answer: 'Example 1: The monsoon arrival',
                  options: ['Example 1: The monsoon arrival', 'he likes nature'],
                  hint: 'If stuck, re-read the chapter marking every "मैं" (I) passage — this isolates the narrator\'s direct.',
                  misconception: 'Students often confuse the *title character* (fcLdksgj, the mother) with the *protagonist* (the narrator).' }
          ],
            remediations: { 'students-often-confuse-the-title': { steps: ['Have the student list every paragraph where "I" (the narrator) appears.', 'For each, note: What is the narrator doing?', 'Group these into 4-5 trait clusters (e.g., "observant", "emotionally dependent", "imaginative", "reflective").', 'Write one sentence per cluster with a quote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'If stuck, review the "Character Function Checklist" from Class 11 (node.',
          misconception: 'Students believe "supporting character analysis" means writing a short biography of each character: name, age, role.',
          parts: [
                { id: 'a', prompt: 'Name any three supporting characters from "fcLdksgj dh ekVh" and state one defining trait for each based on the text.', answer: 'Correct answer: (1) fclukFk',
                  options: ['Correct answer: (1) fclukFk', 'supporting character analysis'],
                  hint: 'If stuck, review the "Character Function Checklist" from Class 11 (node c11_hin_ar_cbse_01_005).',
                  misconception: 'Students believe "supporting character analysis" means writing a short biography of each character: name, age, role, one trait.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['Have the student re-read only the passages where fclukFk, ek¡, and cÙk[k appear (use text search for these names).', 'For each passage, ask: "What is the *narrator feeling* right now?', 'Make a three-column table: Character | Action/Dialogue | Narrator\'s Feeling Revealed.', 'Add a fourth column: "Thematic Function" (e.g., safety, fear, loss, wonder).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If unable to abstract theme from events, return to **c11_hin_ar_cbse_01_006** and re-do.',
          misconception: 'Students often confuse the *primary theme* with the *plot summary* or a *secondary theme*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares', 'Plot refers to the sequence of events that make up a story, while narrative structure is', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If unable to abstract theme from events, return to **c11_hin_ar_cbse_01_006** and re-do the "Topic.',
                  misconception: 'Students often confuse the *primary theme* with the *plot summary* or a *secondary theme*.' }
          ],
            remediations: { 'students-often-confuse-the-primary': { steps: ['Have the student re-read the story\'s first and last three paragraphs side-by-side.', 'What has stayed the same?" 3.', 'Guide them to list 5 sensory memories from the middle sections.', 'Together, formulate a one-sentence theme statement using the template: "The story suggests that [abstract human.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
