import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch04_p1: SimDef = {
    id: 'v3_c12_eng_f_ch04_p1',
    title: 'The Rattrap · Part 1/3',
    subtitle: 'A wire rattrap, a stolen thirty kronor, and a philosophy tested',
    classLevel: 12, subject: 'eng_f', topic: 'The Rattrap · Part 1/3',
    chapters: ['c12_eng_f_ch04'],
    nodeIds: ['c12_eng_f_cbse_04_001', 'c12_eng_f_cbse_04_002', 'c12_eng_f_cbse_04_003', 'c12_eng_f_cbse_04_004', 'c12_eng_f_cbse_04_005', 'c12_eng_f_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary critic', intro: 'A vagabond believes the whole world is a trap baited with cheese. One Christmas, someone refuses to snap it shut.', goal: 'Read The Rattrap as moral allegory — genre, symbol and the redemption arc — rather than literal realism.' },
    discovery: {
        question: '\'Once upon a time there was a man who went around selling small rattraps of wire.\' What does that fairy-tale opening secretly license the story to do?',
        options: ['Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws', 'Nothing — openings don\'t matter', 'Promise a true crime account', 'Signal a children\'s story with no depth'],
        answer: 'Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws',
        hook: 'Read this as realism and the plot looks contrived — a stranger mistaken for an old comrade, a crofter who shows his money. Read it as fable and everything locks in: a Nobel laureate\'s belief that love awakens human goodness, bait and trap as the human condition.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Rattrap\' (Flamingo, ch. 4) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the trap: follow the peddler from his cynical philosophy — the world as a rattrap baited with comforts — through the forest \'prison\' to the Christmas-Eve kindness that springs him free.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Rattrap\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'Identify the narrative point of view used in "The Rattrap" and name the specific fairy-tale convention the opening line "Once upon a time.', options: [
                { text: 'The story uses third-person omniscient narration (the narrator knows the peddler\'s', outcome: 'The story uses third-person omniscient narration (the narrator knows the peddler\'s thoughts, the.' },
                { text: 'first-person', outcome: 'Not quite — Students treat "plot" as a mere list of events ("first this happened, then that") and "structure".', reveals: 'students-treat-plot-as-a' },
                { text: 'limited third-person', outcome: 'Not quite — Students treat "plot" as a mere list of events ("first this happened, then that") and "structure".', reveals: 'students-treat-plot-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Rattrap\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'Name the five distinct physical settings the peddler moves through in "The Rattrap" in chronological order, and state the time of year the.', options: [
                { text: 'Correct answer: (1) Open road/forest where he plods and philosophizes, (2) Crofter\'s', outcome: 'Correct answer: (1) Open road/forest where he plods and philosophizes, (2) Crofter\'s cottage by the.' },
                { text: 'only 3 settings or missing the chronological order', outcome: 'Not quite — Students often treat "setting" as just a list of places (cottage, forge, manor) and "atmosphere".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Rattrap\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the peddler\'s central philosophical metaphor, and what specific life experience led him to formulate it?', options: [
                { text: 'The peddler conceives the world as a giant rattrap that offers baits (riches, joys,', outcome: 'The peddler conceives the world as a giant rattrap that offers baits (riches, joys, shelter, food).' },
                { text: 'dreary ploddings', outcome: 'Not quite — Students treat the peddler\'s "rattrap philosophy" as a static character trait rather than.', reveals: 'students-treat-the-peddler-s' },
                { text: 'keep body and soul together', outcome: 'Not quite — Students treat the peddler\'s "rattrap philosophy" as a static character trait rather than.', reveals: 'students-treat-the-peddler-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Rattrap\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name the five supporting characters in "The Rattrap" and state each one\'s primary relationship to the peddler (e.g., host, mistaken.', options: [
                { text: 'The five supporting characters are: (1) The Crofter', outcome: 'The five supporting characters are: (1) The Crofter — lonely host who trusts the peddler with food.' },
                { text: 'the peddler, or missing the Valet', outcome: 'Not quite — Students treat supporting characters as a list to memorize ("Crofter = lonely, Ironmaster = rich.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Rattrap\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "The Rattrap" in one sentence using the central metaphor of the story.', options: [
                { text: '**Correct answer:** The primary theme is that the world is a giant rattrap that lures', outcome: '**Correct answer:** The primary theme is that the world is a giant rattrap that lures people with.' },
                { text: 'The theme is that stealing is wrong', outcome: 'Not quite — **Misconception:** "The rattrap metaphor means the world is *evil* and *deliberately* traps.', reveals: 'misconception-the-rattrap-metaphor-means' },
                { text: 'Kindness is important', outcome: 'Not quite — **Misconception:** "The rattrap metaphor means the world is *evil* and *deliberately* traps.', reveals: 'misconception-the-rattrap-metaphor-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A dhaba owner catches a hungry runaway boy pocketing bread. The staff want him handed to the police; the owner remembers how \'The Rattrap\' turns.',
            decisions: [{ prompt: 'What does the story suggest she do?', options: [
                { text: 'Meet him with dignity — food, shelter and honest trust first; Lagerlöf\'s point is that goodness awakened by kindness rehabilitates where punishment hardens.', outcome: 'The peddler became an honest man because Edla treated him like a captain, not a thief — trust is the lever that changes people.' },
                { text: 'Call the police at once — a thief is a thief, whatever his story.', outcome: 'That treats circumstance as character; the story shows the \'rattrap\' of poverty made the man, and kindness unmade it.', reveals: 'circumstance-equals-character' },
                { text: 'Slip him some money and send him on his way — problem solved without drama.', outcome: 'Cash without dignity leaves the trap shut; what changed the peddler was being trusted, not being tipped.', reveals: 'help-without-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now switch reading modes — realist to allegorist — and watch the same story become a different machine. That flexibility is what top literature marks are made of.',
            decisions: [{ prompt: 'What comes next? The Rattrap · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rattrap · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_001', difficulty: 'standard',
          question: '\'The Rattrap\' (Flamingo, ch. 4) — the context and background to this text: who.',
          hint: 'If stuck, revisit Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001).',
          misconception: 'Students treat "Before You Read" as a passive reading of the author blurb and a quick glossary lookup for the listed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'The Rattrap\' (Flamingo, ch',
                  options: ['\'The Rattrap\' (Flamingo, ch', 'The plot/narrative arc of \'The Rattrap\'', 'The setting of \'The Rattrap\'', 'Character analysis in \'The Rattrap\''],
                  hint: 'If stuck, revisit Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) where the.',
                  misconception: 'Students treat "Before You Read" as a passive reading of the author blurb and a quick glossary lookup for the listed expressions.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot generate a coherent pre-reading prediction (Diagnostic Q6), guide them through this 4-step repair.', '(2) Take each "Notice these expressions" phrase and ask: "What story situation would make someone say/feel this?".', '(3) Cluster the scenarios: which ones group around poverty?', '(4) Draft a 3-sentence prediction using one keyword from step 1, one cluster from step 3, and the rattrap as the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Rattrap\' — what happens, in what order, and why.',
          hint: 'If stuck on identifying the climax: reread the forest scene (para starting "It was late.',
          misconception: 'Students treat "plot" as a mere list of events ("first this happened, then that") and "structure" as invisible.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'The Rattrap\'',
                  options: ['The plot/narrative arc of \'The Rattrap\'', '\'The Rattrap\' (Flamingo, ch', 'The setting of \'The Rattrap\'', 'Character analysis in \'The Rattrap\''],
                  hint: 'If stuck on identifying the climax: reread the forest scene (para starting "It was late.',
                  misconception: 'Students treat "plot" as a mere list of events ("first this happened, then that") and "structure" as invisible.' }
          ],
            remediations: { 'students-treat-plot-as-a': { steps: ['If a student cannot map events to Freytag\'s stages or explain the circular frame: 1.', 'Have them draw a horizontal line and mark 5 points: Start, Problem, Peak, Aftermath, End.', 'Give them 5 index cards with the diagnostic Q3 events; ask them to place each on the line and justify aloud.', 'Then ask: "Where does the story *begin* thematically?" (rattrap philosophy) and "Where does it *end*?" (letter signed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_003', difficulty: 'standard',
          question: 'The setting of \'The Rattrap\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck on sensory extraction, practice on a single paragraph: the forge description.',
          misconception: 'Students often treat "setting" as just a list of places (cottage, forge, manor) and "atmosphere" as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Rattrap\'',
                  options: ['The setting of \'The Rattrap\'', '\'The Rattrap\' (Flamingo, ch', 'The plot/narrative arc of \'The Rattrap\'', 'Character analysis in \'The Rattrap\''],
                  hint: 'If stuck on sensory extraction, practice on a single paragraph: the forge description ("The big.',
                  misconception: 'Students often treat "setting" as just a list of places (cottage, forge, manor) and "atmosphere" as a single adjective ("dark,".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot distinguish setting from atmosphere or link them to the peddler\'s arc: Step 1 — Re-read the.', 'Step 2 — Make a two-column table: Column A = sensory details (quote phrases), Column B = emotion/mood each detail.', 'Step 3 — Draw an arrow from each Column B entry to the peddler\'s internal state at that moment.', 'Step 4 — Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "setting" as just a list of places (cottage, forge, manor) and "atmosphere" as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Ramsjö Ironworks setting is the moral center of the story — it is where the peddler\'s physical journey and philosophical journey.', answer: 'Correct answer: Defend',
                  options: ['Correct answer: Defend', 'Nils Olof'],
                  hint: 'If stuck on sensory extraction, practice on a single paragraph: the forge description ("The big.',
                  misconception: 'Students often treat "setting" as just a list of places (cottage, forge, manor) and "atmosphere" as a single adjective ("dark,".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot distinguish setting from atmosphere or link them to the peddler\'s arc: Step 1 — Re-read the.', 'Step 2 — Make a two-column table: Column A = sensory details (quote phrases), Column B = emotion/mood each detail.', 'Step 3 — Draw an arrow from each Column B entry to the peddler\'s internal state at that moment.', 'Step 4 — Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis in \'The Rattrap\' — the central figure(s), their traits, and.',
          hint: 'If unable to separate plot from psychology, revisit c11_eng_h_cbse_01_004 (Character.',
          misconception: 'Students treat the peddler\'s "rattrap philosophy" as a static character trait rather than an evolving coping mechanism.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'The Rattrap\'',
                  options: ['Character analysis in \'The Rattrap\'', '\'The Rattrap\' (Flamingo, ch', 'The plot/narrative arc of \'The Rattrap\'', 'The setting of \'The Rattrap\''],
                  hint: 'If unable to separate plot from psychology, revisit c11_eng_h_cbse_01_004 (Character Analysis.',
                  misconception: 'Students treat the peddler\'s "rattrap philosophy" as a static character trait rather than an evolving coping mechanism.' }
          ],
            remediations: { 'students-treat-the-peddler-s': { steps: ['Re-read the three encounter scenes (crofter, forge, manor) with a two-column chart: Column A = what the peddler.', 'Highlight every occurrence of "rattrap," "bait," "trap," "captain," "cheese," "pork" — map their shifting connotations.', 'Write one PEEL paragraph answering: "How does the meaning of \'rattrap\' change from paragraph 2 to the final letter?" 4.', 'Re-attempt Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Rattrap\' — the secondary figures who move the.',
          hint: 'Review foil definition and practice with a familiar story (e.g., Harry Potter: Draco vs.',
          misconception: 'Students treat supporting characters as a list to memorize ("Crofter = lonely, Ironmaster = rich, Edla = kind") rather.',
          parts: [
                { id: 'a', prompt: 'Name the five supporting characters in "The Rattrap" and state each one\'s primary relationship to the peddler (e.g., host, mistaken identity, redeemer).', answer: 'The five supporting characters are: (1) The Crofter',
                  options: ['The five supporting characters are: (1) The Crofter', 'the peddler, or missing the Valet'],
                  hint: 'Review foil definition and practice with a familiar story (e.g., Harry Potter: Draco vs.',
                  misconception: 'Students treat supporting characters as a list to memorize ("Crofter = lonely, Ironmaster = rich, Edla = kind") rather than as a *system.' },
                { id: 'b', prompt: 'The Crofter and Edla both show kindness to the peddler, yet the peddler betrays the Crofter but is transformed by Edla.', answer: 'The Crofter\'s kindness is transactional',
                  options: ['The Crofter\'s kindness is transactional', 'calls both "kind" without distinguishing conditional vs'],
                  hint: 'Review foil definition and practice with a familiar story (e.g., Harry Potter: Draco vs.',
                  misconception: 'Students treat supporting characters as a list to memorize ("Crofter = lonely, Ironmaster = rich, Edla = kind") rather than as a *system.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student gives trait-list answers: (1) Have them reread the three encounters (cottage, forge, manor) and mark every.', '(2) Ask: "What did the peddler *expect* from this person?', 'What did he *learn*?" (3) Map the three encounters on a triangle: Crofter (trust → betrayal), Ironmaster (status →.', '(4) Re-do Diagnostic Q2 and Q4 as written practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of \'The Rattrap\' — the central idea the whole text returns to.',
          hint: 'If stuck, review "How to track a central metaphor across a narrative" from Class 10 "The.',
          misconception: '**Misconception:** "The rattrap metaphor means the world is *evil* and *deliberately* traps people." **Why students.',
          parts: [
                { id: 'a', prompt: 'The peddler initially *enjoys* thinking of the world as a rattrap ("It gave him unwonted joy to think ill of it").', answer: '**Correct answer:** The peddler projects his own powerlessness onto the world',
                  options: ['**Correct answer:** The peddler projects his own powerlessness onto the world', 'cherished pastime', 'caught', 'He is bitter'],
                  hint: 'If stuck, review "How to track a central metaphor across a narrative" from Class 10 "The Necklace".',
                  misconception: '**Misconception:** "The rattrap metaphor means the world is *evil* and *deliberately* traps people." **Why students make this error:** The.' },
                { id: 'b', prompt: 'ANALYZE how the story uses *two different physical settings* (the forest and the forge/manor) to represent two stages of the rattrap metaphor.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'forest is dark, manor is bright', 'The rattrap metaphor means the world is *evil* and *deliberately* traps people', 'The world had never existed for any other purpose than to set baits'],
                  hint: 'If stuck, review "How to track a central metaphor across a narrative" from Class 10 "The Necklace".',
                  misconception: '**Misconception:** "The rattrap metaphor means the world is *evil* and *deliberately* traps people." **Why students make this error:** The.' }
          ],
            remediations: { 'misconception-the-rattrap-metaphor-means': { steps: ['**Re-read the "About the author" note** (NCERT, before story): "A universal theme runs through all of them — a belief.', '**Trace the metaphor\'s three stages** in the text: (a) Peddler\'s theory (world = rattrap), (b) Peddler\'s experience.', 'Mark each with a sticky note.', '**Re-do Diagnostic Question 4** (setting analysis) with the metaphor stages in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
