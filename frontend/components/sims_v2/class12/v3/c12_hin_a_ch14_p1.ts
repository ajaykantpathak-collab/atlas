import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p1: SimDef = {
    id: 'v3_c12_hin_a_ch14_p1',
    title: 'vlxj otkgr · Part 1/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'vlxj otkgr · Part 1/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_001', 'c12_hin_a_cbse_14_002', 'c12_hin_a_cbse_14_003', 'c12_hin_a_cbse_14_004', 'c12_hin_a_cbse_14_005', 'c12_hin_a_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'This node provides the essential biographical, historical, and literary context for the chapter "vlxj otkgr" (Chapter 14, Hindi Antra, Class 12).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are a film editor given raw footage of four different movies — one a mystery, one a political satire, one a folk tale, and one a comedy.',
            decisions: [{ prompt: 'Define the five elements of Freytag\'s Pyramid (plot diagram) in the correct order.', options: [
                { text: 'The five elements are: 1) Exposition (introduction of setting, characters, situation), 2)', outcome: 'The five elements are: 1) Exposition (introduction of setting, characters, situation), 2) Rising.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative.', reveals: 'students-often-confuse-plot-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re watching a film where the opening scene shows a dimly lit, narrow alley with dripping water and distant sirens — before any character speaks.',
            decisions: [{ prompt: 'In the story \'ksj, what physical details does the author provide about the \'ksj structure and its immediate surroundings in the opening.', options: [
                { text: 'The author describes the \'ksj as having a "dry face" ([kqyk eq¡g), a raised platform', outcome: 'The author describes the \'ksj as having a "dry face" ([kqyk eq¡g), a raised platform (>kM+h) with.' },
                { text: 'a building', outcome: 'Not quite — Students often treat setting as a static "where and when" label (e.g., "village," "old times").', reveals: 'students-often-treat-setting-as' },
                { text: 'a place', outcome: 'Not quite — Students often treat setting as a static "where and when" label (e.g., "village," "old times").', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are writing a character reference for a college application — you would cite specific incidents that reveal the person\'s true nature, not just.',
            decisions: [{ prompt: 'Define "protagonist" and name the protagonist of each of the four stories in this chapter.', options: [
                { text: 'A protagonist is the central character who drives the narrative\'s primary conflict and', outcome: 'A protagonist is the central character who drives the narrative\'s primary conflict and undergoes.' },
                { text: 'most pages', outcome: 'Not quite — Students consistently identify the narrator of "कसज" as the protagonist because the story.', reveals: 'students-consistently-identify-the-narrator' },
                { text: 'protagonist', outcome: 'Not quite — Students consistently identify the narrator of "कसज" as the protagonist because the story.', reveals: 'students-consistently-identify-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine watching a cricket match where the captain (protagonist) gets all the attention, but the match turns because of a brilliant catch by a fielder or.',
            decisions: [{ prompt: 'List the supporting characters in the story \'ksj (The Crow) and state the single most important action each performs that affects the.', options: [
                { text: 'Correct: (1) Narrator', outcome: 'Correct: (1) Narrator — observes the crow and questions its beak, initiating the inquiry.' },
                { text: 'the child, the woman, the old man', outcome: 'Not quite — Students think "supporting character analysis" means writing a character sketch (appearance.', reveals: 'supporting-character-analysis-means-writing' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students think "supporting character analysis" means writing a character sketch (appearance.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "What is the central message of the four stories in this chapter?" Many students simply retell the plots.',
            decisions: [{ prompt: 'State the primary theme of the chapter "vlxj otkgr" in one sentence.', options: [
                { text: 'The primary theme is the abuse of power and the systemic exploitation of the weak by the', outcome: 'The primary theme is the abuse of power and the systemic exploitation of the weak by the strong.' },
                { text: 'The stories are about animals and kings', outcome: 'Not quite — Students often think "theme" means "the topic of the story" (e.g., "birds," "kings," "horses") and.', reveals: 'theme-means-the-topic-of' },
                { text: 'horses', outcome: 'Not quite — Students often think "theme" means "the topic of the story" (e.g., "birds," "kings," "horses") and.', reveals: 'theme-means-the-topic-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? vlxj otkgr · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vlxj otkgr · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_001', difficulty: 'standard',
          question: 'This node provides the essential biographical, historical, and literary context.',
          hint: 'If stuck, revisit the Class 11 Antra Chapter 14 "Before You Read".',
          misconception: 'Students often treat the "Before You Read" section as optional background reading to be skimmed or skipped, believing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node provides the essential biographical, historical, and literary context for the',
                  options: ['This node provides the essential biographical, historical, and literary context for the', 'Plot and Narrative Structure refers to the deliberate arrangement of events in a story', 'Setting and atmosphere refer to the time, place, physical environment, and emotional mood', 'Character analysis of the protagonist is the systematic examination of the central'],
                  hint: 'If stuck, revisit the Class 11 Antra Chapter 14 "Before You Read" (c11_hin_ar_cbse_14_001) and.',
                  misconception: 'Students often treat the "Before You Read" section as optional background reading to be skimmed or skipped, believing the real learning.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['If a student cannot answer the diagnostic questions, do not re-read the section passively.', 'Instead: (1) Have them create a 3-column table: Author Detail | Story Element It Illuminates | Evidence from Summary.', '(2) Ask them to match each vocabulary word to the story summary where it fits best and explain why.', '(3) Have them orally retell the central conflict of each story in one sentence using the words "power", "resistance".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the deliberate arrangement of events.',
          hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice.',
          misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the.',
          parts: [
                { id: 'a', prompt: 'Given the following micro-story summary, map its events onto the five-stage plot diagram: "A farmer finds a magical pot that doubles anything put inside.', answer: 'Exposition: Farmer finds magical doubling pot',
                  options: ['Exposition: Farmer finds magical doubling pot', 'rising action', 'climax'],
                  hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice labeling each.',
                  misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the order in which the.' }
          ],
            remediations: { 'students-often-confuse-plot-the': { steps: ['**Re-teach the distinction**: Use a familiar Bollywood movie (e.g., *Andhadhun* or *Drishyam*) — ask the student.', 'The difference is narrative structure.', '**Re-read \'ksj\' with a highlighter**: Mark every paragraph as E (Exposition), R (Rising), C (Climax), F (Falling),.', '**Peer discussion**: Pair with a student who grasped it; have them explain why the author chose first-person limited.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the.',
          parts: [
                { id: 'a', prompt: 'Evaluate which story\'s narrative structure most effectively delivers its central theme. Justify your choice with specific structural evidence.', answer: '\'ksj\' is most effective',
                  options: ['\'ksj\' is most effective', 'I liked the message of \'igpku\''],
                  hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice labeling each.',
                  misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the order in which the.' }
          ],
            remediations: { 'students-often-confuse-plot-the': { steps: ['**Re-teach the distinction**: Use a familiar Bollywood movie (e.g., *Andhadhun* or *Drishyam*) — ask the student.', 'The difference is narrative structure.', '**Re-read \'ksj\' with a highlighter**: Mark every paragraph as E (Exposition), R (Rising), C (Climax), F (Falling),.', '**Peer discussion**: Pair with a student who grasped it; have them explain why the author chose first-person limited.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_003', difficulty: 'standard',
          question: 'Setting and atmosphere refer to the time, place, physical environment, and.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_14_003\'s worked example on sensory mapping — practice.',
          misconception: 'Students often treat setting as a static "where and when" label (e.g., "village," "old times") rather than a dynamic.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the atmosphere in the \'ksj story shifts from the narrator\'s first visit to the later conversation with the \'ksj keeper.', answer: 'Initially, the atmosphere is curious and observational',
                  options: ['Initially, the atmosphere is curious and observational', 'the mood changes'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_003\'s worked example on sensory mapping — practice converting.',
                  misconception: 'Students often treat setting as a static "where and when" label (e.g., "village," "old times") rather than a dynamic system of sensory.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student reread the first two paragraphs of \'ksj and underline every sensory word (sight: [kqyk, >kM+h, ph"k.', 'Ask: "If this were a film, what would the camera show in the first 10 seconds?" — force visual translation.', 'Assign micro-task: rewrite one paragraph replacing all sensory words with neutral ones ("a building," "some steps").', 'Re-diagnose using DIAGNOSTIC_QUESTION_1 — student must now cite three specific sensory phrases.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist is the systematic examination of the.',
          hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s.',
          misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his.',
          parts: [
                { id: 'a', prompt: 'Using the King in "इगपुकु," explain the difference between a flat and a round character. Is the King flat or round? Justify with two textual details.', answer: 'A flat character embodies a single trait and does not change',
                  options: ['A flat character embodies a single trait and does not change', 'flat because he is a symbol'],
                  hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s "show don\'t.',
                  misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his observations ("मैंने.' },
                { id: 'b', prompt: 'Read this new paragraph: "The village headman announced a new tax. The farmers whispered but paid. Next month he doubled it. The farmers sold jewelry.', answer: 'Trait 1: Exploitative',
                  options: ['Trait 1: Exploitative', 'he is bad'],
                  hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s "show don\'t.',
                  misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his observations ("मैंने.' }
          ],
            remediations: { 'students-consistently-identify-the-narrator': { steps: ['Re-read the opening of "कसज" (node c12_hin_a_cbse_14_002) and list every character mentioned in the first three.', 'Count textual references: how many paragraphs focus on the narrator\'s actions vs.', 'कसज\'s neck as the site of action?', 'Ask: "If this character were removed, would the plot exist?" Apply to both narrator and कसज.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_005', difficulty: 'standard',
          question: 'A supporting character is a fictional figure who interacts with the protagonist.',
          hint: 'If stuck, re-read the \'ksj\' dialogue between narrator and old man (mYyw) — it is the.',
          misconception: 'Students think "supporting character analysis" means writing a character sketch (appearance, personality, background).',
          parts: [
                { id: 'a', prompt: 'List the supporting characters in the story \'ksj (The Crow) and state the single most important action each performs that affects the protagonist (the crow).', answer: 'Correct: (1) Narrator',
                  options: ['Correct: (1) Narrator', 'the child, the woman, the old man', 'supporting character analysis'],
                  hint: 'If stuck, re-read the \'ksj\' dialogue between narrator and old man (mYyw) — it is the clearest.',
                  misconception: 'Students think "supporting character analysis" means writing a character sketch (appearance, personality, background) like for the.' },
                { id: 'b', prompt: 'In \'igpku\', the king issues four sequential orders (cover ears, cover eyes, cover mouths, stand on heads).', answer: 'Correct: The three ministers never dissent',
                  options: ['Correct: The three ministers never dissent', 'wisdom', 'supporting character analysis'],
                  hint: 'If stuck, re-read the \'ksj\' dialogue between narrator and old man (mYyw) — it is the clearest.',
                  misconception: 'Students think "supporting character analysis" means writing a character sketch (appearance, personality, background) like for the.' },
                { id: 'c', prompt: 'In \'pkj gkFk\', the feudal lady (fey ekfyd) summons experts (oSKkfudksa) to attach four legs to laborers.', answer: 'Correct: The experts are failed catalysts',
                  options: ['Correct: The experts are failed catalysts', 'started the process', 'supporting character analysis'],
                  hint: 'If stuck, re-read the \'ksj\' dialogue between narrator and old man (mYyw) — it is the clearest.',
                  misconception: 'Students think "supporting character analysis" means writing a character sketch (appearance, personality, background) like for the.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['If a student writes descriptive sketches, assign this 3-step remediation: (1) Re-read \'ksj\' and highlight every line.', '(2) For each, write one sentence: "This character exists in the story to ______." (3) Compare answers with the board.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, re-read the "igpku" story focusing only on the king\'s three orders and the.',
          misconception: 'Students often think "theme" means "the topic of the story" (e.g., "birds," "kings," "horses") and write a plot summary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', 'This node provides the essential biographical, historical, and literary context for the', 'Plot and Narrative Structure refers to the deliberate arrangement of events in a story', 'Setting and atmosphere refer to the time, place, physical environment, and emotional mood'],
                  hint: 'If stuck, re-read the "igpku" story focusing only on the king\'s three orders and the subjects\'.',
                  misconception: 'Students often think "theme" means "the topic of the story" (e.g., "birds," "kings," "horses") and write a plot summary instead of the.' }
          ],
            remediations: { 'theme-means-the-topic-of': { steps: ['Have the student list the four protagonists and the four authority figures side by side in a two-column table.', 'Ask them to write one sentence describing what each authority figure wants (control, profit, obedience, entertainment).', 'Ask them to write one sentence describing what each protagonist loses (voice, dignity, life, freedom).', 'Guide them to complete the sentence: "The chapter shows that when ______ goes unchecked, ______ suffers." This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
