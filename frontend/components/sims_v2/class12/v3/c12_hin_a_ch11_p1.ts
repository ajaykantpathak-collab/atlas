import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch11_p1: SimDef = {
    id: 'v3_c12_hin_a_ch11_p1',
    title: 'iafMr panzèkj \'kekZ xqysjh · Part 1/3',
    subtitle: 'Three stories, one evolving conscience',
    classLevel: 12, subject: 'hin_a', topic: 'iafMr panzèkj \'kekZ xqysjh · Part 1/3',
    chapters: ['c12_hin_a_ch11'],
    nodeIds: ['c12_hin_a_cbse_11_001', 'c12_hin_a_cbse_11_002', 'c12_hin_a_cbse_11_003', 'c12_hin_a_cbse_11_004', 'c12_hin_a_cbse_11_005', 'c12_hin_a_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Premchand scholar', intro: 'A village schoolteacher who resigned for the nation wrote India\'s conscience in three registers — hope, grit and moral courage.', goal: 'Situate Lajwanti, Kafan and Maine Kaha Tha within Premchand\'s creative periods and nationalist arc.' },
    discovery: {
        question: 'One author writes \'Lajwanti,\' \'Kafan\' and \'Maine Kaha Tha\' — reformist hope in one, bitter disillusion in another. What changed between them?',
        options: ['His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing', 'Different ghostwriters', 'He aged, nothing more', 'Stories vary randomly'],
        answer: 'His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing',
        hook: 'Reading all three as \'social reform tales\' flattens his evolution — Kafan\'s Ghisu-Madhav aren\'t just poor, they\'re a verdict on a system. And his nine-language reach lives inside the prose: rustic village speech beside Sanskritised commentary is strategy, not inconsistency.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading section that provides essential biographical, historical, and literary information about the author (Premchand) and his works to prepare.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Premchand across his own evolution: separate the reformer\'s hope from the disillusioned analyst, weigh resignation as authorial act, and test whether education alone transforms material life.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a movie but you don\'t know the director, the era it\'s set in, or why it was made — you\'d miss half the meaning.',
            decisions: [{ prompt: 'Who was Premchand, and what are the four major creative periods of his literary career as outlined in the textbook?', options: [
                { text: 'Premchand (1883–1922), born Dhanpat Rai in Lamhi village near Varanasi, was a seminal', outcome: 'Premchand (1883–1922), born Dhanpat Rai in Lamhi village near Varanasi, was a seminal Hindi-Urdu.' },
                { text: 'Godaan period', outcome: 'Not quite — Students treat "Before You Read" as optional background reading — something to skim or skip.', reveals: 'students-treat-before-you-read' },
                { text: 'only "Godaan period" or confusing with other writers', outcome: 'Not quite — Students treat "Before You Read" as optional background reading — something to skim or skip.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are describing a Bollywood movie to a friend who hasn\'t seen it — you don\'t just list scenes randomly; you structure it: "First the hero.',
            decisions: [{ prompt: 'Define \'plot\' and \'narrative structure\' in your own words, and give one example of how they differ in any story you know.', options: [
                { text: 'Plot is the chronological sequence of events (what happens)', outcome: 'Plot is the chronological sequence of events (what happens); narrative structure is the author\'s.' },
                { text: 'plot is the structure of the story', outcome: 'Not quite — Students treat "plot summary" as "structure analysis". They write: "First this happened, then that.', reveals: 'students-treat-plot-summary-as' },
                { text: 'equates the two (e', outcome: 'Not quite — Students treat "plot summary" as "structure analysis". They write: "First this happened, then that.', reveals: 'students-treat-plot-summary-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re telling a friend about a strict older sibling who lectures you endlessly about studying hard, stays up all night memorizing textbooks, fails.',
            decisions: [{ prompt: 'Identify the protagonist of "बड़े भाई साहब" and state his primary role in the narrative structure.', options: [
                { text: 'The protagonist is बड़े भाई साहब (the elder brother)', outcome: 'The protagonist is बड़े भाई साहब (the elder brother). His primary role is to embody the tragic.' },
                { text: 'narrator', outcome: 'Not quite — Students consistently confuse **बड़े भाई साहब\'s sermons** (उपदेश) with **hypocrisy** (कपट).', reveals: 'students-consistently-confuse-s-sermons' },
                { text: 'protagonist', outcome: 'Not quite — Students consistently confuse **बड़े भाई साहब\'s sermons** (उपदेश) with **hypocrisy** (कपट).', reveals: 'students-consistently-confuse-s-sermons' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are reading "ckyd cp x;k" and you wonder why the father slaps the boy immediately after the inspector leaves — what does that moment tell us about.',
            decisions: [{ prompt: 'In "ckyd cp x;k", who is the inspector (vè;kid) and what single question does he repeatedly ask the boy?', options: [
                { text: 'The inspector is a school official conducting an examination', outcome: 'The inspector is a school official conducting an examination; he repeatedly asks the boy "rw D;k.' },
                { text: 'he is the boy\'s father', outcome: 'Not quite — Students treat supporting characters as "background decoration" and only describe their physical.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked: "What is Premchand really trying to tell us through these three very different stories?" Start by recalling the core conflict in each.',
            decisions: [{ prompt: 'Define "primary theme" in your own words and give one example from any story you have read previously.', options: [
                { text: 'A primary theme is the central, overarching idea that runs through an entire work,', outcome: 'A primary theme is the central, overarching idea that runs through an entire work, expressed as.' },
                { text: 'education', outcome: 'Not quite — Students often think "theme = moral" and write "The theme is: we should respect children" or "The.', reveals: 'theme-moral-and-write-the' },
                { text: 'a boy runs away from school', outcome: 'Not quite — Students often think "theme = moral" and write "The theme is: we should respect children" or "The.', reveals: 'theme-moral-and-write-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school internship, a tribal scholarship boy refuses to recite the expected answers or name the textbook he was handed — he just says he belongs to the wild and slips away. The staff room has already filed him as \'difficult, unteachable.\'',
            decisions: [{ prompt: 'What does the story \'बालक बच गया\' read in his refusal?', options: [
                { text: 'A climax of self-keeping — the boy\'s defiant \'I am a wild one\' is the peak the questioning was building toward, and his \'Yaw\' and escape release it; the file on him reads defiance where the story reads a child refusing to be renamed by the institution.', outcome: 'The chapter\'s structural point: the struggle scenes rise toward the refusal, not the obedience — so \'unteachable\' records the school\'s failure to see what his refusal was protecting.' },
                { text: 'Side with the staff — he won\'t answer, so the verdict of \'unteachable\' is a fair label.', outcome: 'The story treats the interrogation itself as the problem: the adults\' questions measure him against a script he never agreed to, so his silence is evidence of the script\'s failure, not his.', reveals: 'noncompliance-equals-inability' },
                { text: 'Coach him to give the expected answers so he can get through and leave.', outcome: 'That\'s the assimilation route the story\'s climax rejects — his escape with identity intact is the \'bach gaya\' the title means; coaching him to recite would be the institution winning after all.', reveals: 'compliance-equals-survival' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now track a writer\'s changing lens across a career — and hear the difference between reforming a society and indicting it.',
            decisions: [{ prompt: 'What comes next? iafMr panzèkj \'kekZ xqysjh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — iafMr panzèkj \'kekZ xqysjh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading section that.',
          hint: 'If stuck, review `c11_hin_ar_cbse_11_001` (Premchand introduction in Class 11 "Godaan".',
          misconception: 'Students treat "Before You Read" as optional background reading — something to skim or skip — because it doesn\'t.',
          parts: [
                { id: 'a', prompt: 'Compare the textbook\'s description of Premchand\'s early period (*Lekhak*, 1903–06) with his *Madhuri* period (1920–22).', answer: 'Early period: idealistic, reformist, didactic (e.g., "Lajwanti" focuses on widow',
                  options: ['Early period: idealistic, reformist, didactic (e.g., "Lajwanti" focuses on widow', 'social reform tales', 'critical appreciation'],
                  hint: 'If stuck, review `c11_hin_ar_cbse_11_001` (Premchand introduction in Class 11 "Godaan" chapter).',
                  misconception: 'Students treat "Before You Read" as optional background reading — something to skim or skip — because it doesn\'t contain the "actual.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot answer Diagnostic Questions 2, 4, or 5: (1) Have them re-read the "Before You Read" section with.', '(2) Ask them to write one sentence per highlighted fact: "This fact might explain why the story shows ______." (3) Then.', 'If still stuck, direct them to Class 11 node `c11_hin_ar_cbse_11_001` (Premchand context in "Godaan" chapter) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the organized sequence of events (plot).',
          hint: 'Review Freytag\'s Pyramid using a known Class 11 story (e.g., "The Portrait of a Lady".',
          misconception: 'Students treat "plot summary" as "structure analysis". They write: "First this happened, then that happened" and call.',
          parts: [
                { id: 'a', prompt: 'Define \'plot\' and \'narrative structure\' in your own words, and give one example of how they differ in any story you know.', answer: 'Plot is the chronological sequence of events (what happens)',
                  options: ['Plot is the chronological sequence of events (what happens)', 'plot is the structure of the story', 'equates the two (e'],
                  hint: 'Review Freytag\'s Pyramid using a known Class 11 story (e.g., "The Portrait of a Lady" from.',
                  misconception: 'Students treat "plot summary" as "structure analysis". They write: "First this happened, then that happened" and call it structure.' }
          ],
            remediations: { 'students-treat-plot-summary-as': { steps: ['If a student cannot separate plot from structure: 1.', 'Have them draw two timelines for "ckyd cp x;k": Timeline A = events in story-world chronological order (boy wakes →.', 'Timeline B = events in text order (identical here — linear).', 'Then do the same for "?kM+h osQ iq”ksZ": Timeline A = narrator arrives → sees watchmaker → hears lecture → leaves.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_003', difficulty: 'standard',
          question: 'Setting and Atmosphere refers to the time, place, social context, and emotional.',
          hint: 'Revisit c11_hin_ar_cbse_11_008 for imagery taxonomy and c11_hin_ar_cbse_11_003 for.',
          misconception: 'Students confuse \'setting description\' with \'atmosphere analysis\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting and Atmosphere refers to the time, place, social context, and emotional mood',
                  options: ['Setting and Atmosphere refers to the time, place, social context, and emotional mood', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'Revisit c11_hin_ar_cbse_11_008 for imagery taxonomy and c11_hin_ar_cbse_11_003 for pathetic fallacy.',
                  misconception: 'Students confuse \'setting description\' with \'atmosphere analysis\'.' }
          ],
            remediations: { 'students-confuse-setting-description-with': { steps: ['Have student re-read only the opening paragraph of "ckyd cp x;k" and highlight every sensory word (visual, auditory.', 'For each highlighted word, ask: "What does this make the READER feel? What does it tell us about the BOY?"', 'Practice the sentence frame: "The [sensory detail] creates a [mood] atmosphere that reveals [character state/theme]."', 'Apply same to one paragraph from "?kM+h osQ iq"ksZ" and "<sys pqu yks".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If unable to list 5 indirect characterization moments, revisit c12_hin_a_cbse_11_002.',
          misconception: 'Students consistently confuse **बड़े भाई साहब\'s sermons** (उपदेश) with **hypocrisy** (कपट).',
          parts: [
                { id: 'a', prompt: 'Identify the protagonist of "बड़े भाई साहब" and state his primary role in the narrative structure.', answer: 'The protagonist is बड़े भाई साहब (the elder brother)',
                  options: ['The protagonist is बड़े भाई साहब (the elder brother)', 'narrator', 'protagonist', 'the narrator as protagonist'],
                  hint: 'If unable to list 5 indirect characterization moments, revisit c12_hin_a_cbse_11_002 (Plot) and.',
                  misconception: 'Students consistently confuse **बड़े भाई साहब\'s sermons** (उपदेश) with **hypocrisy** (कपट).' },
                { id: 'b', prompt: 'Compare बड़े भाई साहब\'s attitude toward education in his first sermon (after narrator fails Class 9) versus his final admission ("मैं तो खुद ही फेल हूँ").', answer: 'Initially, he weaponizes education as moral authority',
                  options: ['Initially, he weaponizes education as moral authority', 'hypocrisy'],
                  hint: 'If unable to list 5 indirect characterization moments, revisit c12_hin_a_cbse_11_002 (Plot) and.',
                  misconception: 'Students consistently confuse **बड़े भाई साहब\'s sermons** (उपदेश) with **hypocrisy** (कपट).' }
          ],
            remediations: { 'students-consistently-confuse-s-sermons': { steps: ['If a student writes "hypocrite" or "flat character": Step 1 — Have them re-read the kite-flying scene (पतंग उड़ाना) and.', 'Does he *stop believing* in hard work?" Step 2 — Map a 2-column table: Column A = His Sermons (quotes), Column B = His.', 'Step 3 — Ask: "Where is the *gap* between A and B?', 'Is it dishonesty or systemic betrayal?" Step 4 — Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters are figures in a narrative who are not the central.',
          hint: 'If unable to list characters, re-read the stories with a highlighter marking every new.',
          misconception: 'Students treat supporting characters as "background decoration" and only describe their physical traits or plot.',
          parts: [
                { id: 'a', prompt: 'In "ckyd cp x;k", who is the inspector (vè;kid) and what single question does he repeatedly ask the boy?', answer: 'The inspector is a school official conducting an examination',
                  options: ['The inspector is a school official conducting an examination', 'he is the boy\'s father'],
                  hint: 'If unable to list characters, re-read the stories with a highlighter marking every new name/role.',
                  misconception: 'Students treat supporting characters as "background decoration" and only describe their physical traits or plot actions.' },
                { id: 'b', prompt: 'Explain in your own words why the narrator says "ckyd cp x;k" (the boy ran away) at the end of the first story, linking it to the boy\'s answer "eSa ;koTtUe.', answer: 'The boy\'s answer',
                  options: ['The boy\'s answer', 'he physically ran out of the room'],
                  hint: 'If unable to list characters, re-read the stories with a highlighter marking every new name/role.',
                  misconception: 'Students treat supporting characters as "background decoration" and only describe their physical traits or plot actions.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond description, assign this 3-step remediation: (1) Re-read c11_hin_ar_cbse_11_005 (Class.', '(2) For each supporting character in the three stories, complete a 4-row table: Character | Key Action/Dialogue |.', '(3) Write a 100-word paragraph for one character using the PEEL structure (Point, Evidence, Explanation, Link to theme).', 'Re-diagnose with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat supporting characters as "background decoration" and only describe their physical traits or plot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to make the three fruits in "<sys pqu yks" speak in first person. Does this strengthen or weaken the allegory?', answer: 'It strengthens the allegory',
                  options: ['It strengthens the allegory', 'it\'s just a story device'],
                  hint: 'If unable to list characters, re-read the stories with a highlighter marking every new name/role.',
                  misconception: 'Students treat supporting characters as "background decoration" and only describe their physical traits or plot actions.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond description, assign this 3-step remediation: (1) Re-read c11_hin_ar_cbse_11_005 (Class.', '(2) For each supporting character in the three stories, complete a 4-row table: Character | Key Action/Dialogue |.', '(3) Write a 100-word paragraph for one character using the PEEL structure (Point, Evidence, Explanation, Link to theme).', 'Re-diagnose with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea —.',
          hint: 'If stuck, revisit the "Character Analysis: Protagonist" node (c12_hin_a_cbse_11_004) and.',
          misconception: 'Students often think "theme = moral" and write "The theme is: we should respect children" or "The theme is: don\'t waste.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea',
                  options: ['The primary theme of a literary work is its central, unifying idea', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting and Atmosphere refers to the time, place, social context, and emotional mood'],
                  hint: 'If stuck, revisit the "Character Analysis: Protagonist" node (c12_hin_a_cbse_11_004) and.',
                  misconception: 'Students often think "theme = moral" and write "The theme is: we should respect children" or "The theme is: don\'t waste time." This.' }
          ],
            remediations: { 'theme-moral-and-write-the': { steps: ['If a student cannot synthesize the primary theme, guide them through this 3-step remediation: (1) Re-read the "Before.', '(2) Use the character analysis nodes (c12_hin_a_cbse_11_004, 005) to list each protagonist\'s core conflict.', '(3) Complete a "Theme Triangle" worksheet: vertex A = conflict in story 1, vertex B = conflict in story 2, vertex.', 'Then re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
