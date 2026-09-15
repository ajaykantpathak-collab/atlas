import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch01_p1: SimDef = {
    id: 'v3_c12_eng_f_ch01_p1',
    title: 'The Last Lesson · Part 1/3',
    subtitle: 'The day grammar became a nation\'s last stand',
    classLevel: 12, subject: 'eng_f', topic: 'The Last Lesson · Part 1/3',
    chapters: ['c12_eng_f_ch01'],
    nodeIds: ['c12_eng_f_cbse_01_001', 'c12_eng_f_cbse_01_002', 'c12_eng_f_cbse_01_003', 'c12_eng_f_cbse_01_004', 'c12_eng_f_cbse_01_005', 'c12_eng_f_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary analyst', intro: 'A language dies quietly — in a classroom, on a Tuesday. See the history hiding in one boy\'s unfinished homework.', goal: 'Connect the Franco-Prussian decree to every character\'s behaviour and read the story as cultural resistance.' },
    discovery: {
        question: 'Franz almost skips school to dodge a grammar test — on the very morning his language is outlawed forever. Why does that childish impulse make the tragedy sharper, not smaller?',
        options: ['A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation', 'It shows Franz was simply lazy', 'It proves the decree wasn\'t important', 'It tells us school was optional'],
        answer: 'A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation',
        hook: 'The Franco-Prussian War isn\'t background trivia — it IS the plot. Berlin\'s decree banning French drives every detail: the bulletin board, the villagers\' guilt, M. Hamel\'s Sunday clothes. Read the history as the conflict, not the décor.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and cultural framework required to comprehend Alphonse Daudet\'s "The Last Lesson." It encompasses the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk into that last classroom as a witness: decode how the language decree turns grammar into resistance, and trace what the pigeons, the primer and \'Vive la France!\' are really saying.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine your school principal announces tomorrow that Hindi/English will be replaced by a language you\'ve never studied — how would you feel during that final.',
            decisions: [{ prompt: 'What was the immediate administrative order from Berlin that forms the historical backdrop of "The Last Lesson"?', options: [
                { text: 'The order mandated that only German be taught in the schools of Alsace and Lorraine,', outcome: 'The order mandated that only German be taught in the schools of Alsace and Lorraine, effectively.' },
                { text: 'the order closed all schools', outcome: 'Not quite — Students frequently treat the Franco-Prussian War as mere "background information" — a date.', reveals: 'students-frequently-treat-the-franco' },
                { text: 'the order expelled French teachers', outcome: 'Not quite — Students frequently treat the Franco-Prussian War as mere "background information" — a date.', reveals: 'students-frequently-treat-the-franco' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re Franz walking into that silent classroom — the story begins with your dread of a scolding, but the real conflict isn\'t about participles.',
            decisions: [{ prompt: 'What is the narrative point of view in "The Last Lesson," and who is the narrator?', options: [
                { text: 'The story uses first-person retrospective narration with Franz as the narrator', outcome: 'The story uses first-person retrospective narration with Franz as the narrator — he recounts events.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students confuse the *announcement* of the last lesson (rising action) with the *climax*.', reveals: 'students-confuse-the-announcement-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your classroom on the last day of school before it closes forever — the desks are the same, but the air feels different, heavy with.',
            decisions: [{ prompt: 'What are the three specific time markers in "The Last Lesson" that anchor the story historically and structurally?', options: [
                { text: 'The three time markers are: (1) the Franco-Prussian War period (1870-1871) establishing', outcome: 'The three time markers are: (1) the Franco-Prussian War period (1870-1871) establishing historical.' },
                { text: 'the last day of school', outcome: 'Not quite — Students treat setting as a static list of "where and when" facts (Alsace, 1870, schoolroom) rather.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re Franz sitting in that silent classroom, suddenly realizing your language is being taken away — what would you notice first?',
            decisions: [{ prompt: 'What is the narrative point of view in "The Last Lesson," and how does it limit or expand our understanding of Franz\'s character?', options: [
                { text: 'The story uses first-person narration from Franz\'s perspective', outcome: 'The story uses first-person narration from Franz\'s perspective.' },
                { text: 'third person omniscient', outcome: 'Not quite — Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing.', reveals: 'students-treat-franz-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a play where the main actor is silent; the supporting cast carries the emotional weight.',
            decisions: [{ prompt: 'List the supporting characters in "The Last Lesson" and give one defining trait for each, based on the text.', options: [
                { text: 'Supporting characters include: M', outcome: 'Supporting characters include: M. Hamel (dedicated, patriotic, transformative), old Hauser.' },
                { text: 'Wachter mocks him', outcome: 'Not quite — Students often treat supporting characters as mere background, listing traits without linking.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine waking up to a government order announcing that from tomorrow your mother tongue will be banned in schools and replaced by the conqueror\'s language.',
            decisions: [{ prompt: 'What is the exact phrasing of the primary theme as given in the "About the Unit" section of the NCERT textbook for "The Last Lesson"?', options: [
                { text: 'Correct answer: "The pain that is inflicted on the people of a territory by its', outcome: 'Correct answer: "The pain that is inflicted on the people of a territory by its conquerors.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — **Misconception:** "The primary theme is \'regret for not studying\' or \'the last day of school\'.".', reveals: 'misconception-the-primary-theme-is' },
                { text: 'It\'s about the Franco-Prussian War', outcome: 'Not quite — **Misconception:** "The primary theme is \'regret for not studying\' or \'the last day of school\'.".', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_001', title: 'A real-world call',
          caseStudy: { intro: 'A writer must choose between writing in English — reaching a global audience, earning more — or in their mother tongue — preserving a language, reaching a smaller home audience.',
            decisions: [{ prompt: 'Does reach justify abandoning your own language?', options: [
                { text: 'Write in English — ideas matter more than the vessel', outcome: 'The reach argument; every writer who chooses this makes the home language\'s literature a little thinner.' },
                { text: 'Write in the mother tongue — a language dies by desertion', outcome: 'The preservation argument; the smaller audience is real, and so is what only that language can say.' },
                { text: 'Write in both — translate yourself', outcome: 'The dual answer — doubles the work, keeps both doors open; the rarest choice because it\'s the hardest.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A district orders all schools to teach only in a new official language from tomorrow; elders crowd the notice board while a child shrugs, \'it\'s just a subject switch\'.',
            decisions: [{ prompt: 'Is it just a subject switch?', options: [
                { text: 'No — Daudet\'s point in \'The Last Lesson\' is that language carries identity and freedom; banning the mother tongue is cultural amputation, which is why the villagers treat the last class as a shared loss.', outcome: 'A decree about \'just a language\' lands as the loss of a community\'s voice — the story\'s whole weight comes from that difference.' },
                { text: 'Yes — grammar is grammar; swapping which language is taught changes nothing essential.', outcome: 'That reads the decree as administrative detail and misses how the war\'s terms reach into every villager\'s sense of self.', reveals: 'language-is-just-a-subject' },
                { text: 'Sad, but attachment to one\'s language is nostalgia — practicality says move on.', outcome: 'The villagers\' guilt and Hamel\'s ceremony show the attachment isn\'t sentimentality but belonging — dismissing it erases what was actually lost.', reveals: 'pragmatism-erases-identity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a quiet classroom scene and hear an empire fall. Daudet teaches you to find the enormous inside the ordinary — the skill every literature answer is secretly grading.',
            decisions: [{ prompt: 'What comes next? The Last Lesson · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Last Lesson · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'If unable to connect the decree to the classroom scene, re-read the textbook\'s first.',
          misconception: 'Students frequently treat the Franco-Prussian War as mere "background information" — a date to memorise — rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" provides the essential historical,',
                  options: ['"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If unable to connect the decree to the classroom scene, re-read the textbook\'s first three.',
                  misconception: 'Students frequently treat the Franco-Prussian War as mere "background information" — a date to memorise — rather than the *active engine*.' }
          ],
            remediations: { 'students-frequently-treat-the-franco': { steps: ['Re-read the textbook\'s introductory paragraph and "About the author" box aloud.', 'Watch a 5-minute animated map of the Franco-Prussian War (search "Franco-Prussian War 1870 map animation").', 'List the Treaty of Frankfurt\'s three key terms: territory, indemnity, language.', 'Re-attempt Diagnostic Question 4 — if still unable to explain the bulletin-board\'s shifting role, revisit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently treat the Franco-Prussian War as mere "background information" — a date to memorise — rather than.',
          parts: [
                { id: 'a', prompt: 'Evaluate the pedagogical significance of M. Hamel wearing his "beautiful green coat, frilled shirt, and little black silk cap" — clothes reserved for.', answer: 'It is authentic respect transformed into performative dignity',
                  options: ['It is authentic respect transformed into performative dignity', 'showing off', 'ignores the text\'s explicit statement'],
                  hint: 'If unable to connect the decree to the classroom scene, re-read the textbook\'s first three.',
                  misconception: 'Students frequently treat the Franco-Prussian War as mere "background information" — a date to memorise — rather than the *active engine*.' }
          ],
            remediations: { 'students-frequently-treat-the-franco': { steps: ['Re-read the textbook\'s introductory paragraph and "About the author" box aloud.', 'Watch a 5-minute animated map of the Franco-Prussian War (search "Franco-Prussian War 1870 map animation").', 'List the Treaty of Frankfurt\'s three key terms: territory, indemnity, language.', 'Re-attempt Diagnostic Question 4 — if still unable to explain the bulletin-board\'s shifting role, revisit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the organized sequence of events in.',
          hint: 'Review Class 11 Hornbill Chapter 1 (c11_eng_h_cbse_01_002) plot analysis section and.',
          misconception: 'Students confuse the *announcement* of the last lesson (rising action) with the *climax*.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view in "The Last Lesson," and who is the narrator?', answer: 'The story uses first-person retrospective narration with Franz as the narrator',
                  options: ['The story uses first-person retrospective narration with Franz as the narrator', 'third-person omniscient'],
                  hint: 'Review Class 11 Hornbill Chapter 1 (c11_eng_h_cbse_01_002) plot analysis section and Class 10 "The.',
                  misconception: 'Students confuse the *announcement* of the last lesson (rising action) with the *climax*. They write: "The climax is when M.' }
          ],
            remediations: { 'students-confuse-the-announcement-of': { steps: ['If a student misidentifies the climax, have them re-read paragraphs 14-16 (writing lesson) and 20-22 (resolution).', 'Ask: "Where does the tension become unbearable?', 'Where does the community act as one body?" Then have them trace the emotional arc: anxiety → puzzlement → shock →.', 'The peak is the collective defiance (writing lesson), not the shock (announcement).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, review "atmosphere through sensory details" from c7_engl_ch04_005 and "setting.',
          misconception: 'Students treat setting as a static list of "where and when" facts (Alsace, 1870, schoolroom) rather than a dynamic.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "setting as character" to the village schoolroom in "The Last Lesson." Identify three physical details of the room that take on symbolic.', answer: 'Three details: (1) the walnut trees grown taller over forty years',
                  options: ['Three details: (1) the walnut trees grown taller over forty years', 'the blackboard'],
                  hint: 'If stuck, review "atmosphere through sensory details" from c7_engl_ch04_005 and "setting.',
                  misconception: 'Students treat setting as a static list of "where and when" facts (Alsace, 1870, schoolroom) rather than a dynamic force that changes.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student reread only the descriptive passages (skip dialogue) and highlight every sensory word — sound, sight.', 'Make a two-column table: "Physical Detail" | "Atmospheric Effect" for 5 details.', 'Revisit c12_eng_f_cbse_01_001 (Context) to confirm historical setting, then c12_eng_f_cbse_01_002 (Plot) to map.', 'Re-attempt Diagnostic Question 4 — if still unable to link sound to phase, practice with a familiar scene (exam hall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck on narrative perspective, review c11_eng_h_cbse_01_004 (Class 11 Protagonist.',
          misconception: 'Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing answers like "Franz.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view in "The Last Lesson," and how does it limit or expand our understanding of Franz\'s character?', answer: 'The story uses first-person narration from Franz\'s perspective',
                  options: ['The story uses first-person narration from Franz\'s perspective', 'third person omniscient'],
                  hint: 'If stuck on narrative perspective, review c11_eng_h_cbse_01_004 (Class 11 Protagonist Analysis).',
                  misconception: 'Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing answers like "Franz changed because the.' },
                { id: 'b', prompt: 'Explain why Franz\'s initial reaction to the bulletin-board crowd ("What can be the matter now?") is dramatically ironic, and what this reveals about his.', answer: 'It is dramatically ironic',
                  options: ['It is dramatically ironic', 'situational irony'],
                  hint: 'If stuck on narrative perspective, review c11_eng_h_cbse_01_004 (Class 11 Protagonist Analysis).',
                  misconception: 'Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing answers like "Franz changed because the.' },
                { id: 'c', prompt: 'Apply the concept of "dynamic character" to Franz: identify the exact moment his internal change begins, and cite two textual actions that prove this change.', answer: 'The change begins at M',
                  options: ['The change begins at M', 'say that dreadful rule'],
                  hint: 'If stuck on narrative perspective, review c11_eng_h_cbse_01_004 (Class 11 Protagonist Analysis).',
                  misconception: 'Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing answers like "Franz changed because the.' },
                { id: 'd', prompt: 'Analyze how Franz\'s perception of M. Hamel shifts across the story, and explain what this shift reveals about the relationship between teacher and student in.', answer: 'Initially, Franz sees Hamel as a threat ("terrible iron ruler," "cranky")',
                  options: ['Initially, Franz sees Hamel as a threat ("terrible iron ruler," "cranky")', 'he was kind then strict'],
                  hint: 'If stuck on narrative perspective, review c11_eng_h_cbse_01_004 (Class 11 Protagonist Analysis).',
                  misconception: 'Students treat Franz as a passive victim who "suddenly realizes" the importance of French, writing answers like "Franz changed because the.' }
          ],
            remediations: { 'students-treat-franz-as-a': { steps: ['If a student writes "Franz changed because M.', 'Hamel scolded him," do NOT re-teach the plot.', 'Instead: (1) Have them re-read the recitation scene (paragraph starting "While I was thinking of all this, I heard.', '(2) Ask: "What does Franz DO that no one told him to do?" (3) Assign a 50-word rewrite: "Franz\'s transformation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining their traits.',
          hint: 'If stuck, re-read the scenes where M. Hamel addresses the class and the villagers are.',
          misconception: 'Students often treat supporting characters as mere background, listing traits without linking to theme or protagonist\'s.',
          parts: [
                { id: 'a', prompt: 'List the supporting characters in "The Last Lesson" and give one defining trait for each, based on the text.', answer: 'Supporting characters include: M',
                  options: ['Supporting characters include: M', 'Wachter mocks him'],
                  hint: 'If stuck, re-read the scenes where M. Hamel addresses the class and the villagers are introduced.',
                  misconception: 'Students often treat supporting characters as mere background, listing traits without linking to theme or protagonist\'s development.' },
                { id: 'b', prompt: 'Explain why the villagers sit at the back benches on the day of the last lesson. What does their presence signify?', answer: 'The villagers sit at the back to honor M',
                  options: ['The villagers sit at the back to honor M', 'they came to watch', 'Wachter mocks him', 'says "they came to watch" misses the emotional and thematic weight'],
                  hint: 'If stuck, re-read the scenes where M. Hamel addresses the class and the villagers are introduced.',
                  misconception: 'Students often treat supporting characters as mere background, listing traits without linking to theme or protagonist\'s development.' },
                { id: 'c', prompt: 'Read this short passage about a new character, the village priest, who enters the classroom during the last lesson: "The priest stood at the door, his hands.', answer: 'Trait: The priest is solemn and supportive of the French cause',
                  options: ['Trait: The priest is solemn and supportive of the French cause', 'religious', 'Wachter mocks him'],
                  hint: 'If stuck, re-read the scenes where M. Hamel addresses the class and the villagers are introduced.',
                  misconception: 'Students often treat supporting characters as mere background, listing traits without linking to theme or protagonist\'s development.' },
                { id: 'd', prompt: 'Compare M. Hamel\'s attitude and behavior at the start of the story (as remembered by Franz) with his attitude during the last lesson.', answer: 'Initially, M',
                  options: ['Initially, M', 'he becomes nice', 'Wachter mocks him', 'only lists differences without interpreting the thematic significance (e'],
                  hint: 'If stuck, re-read the scenes where M. Hamel addresses the class and the villagers are introduced.',
                  misconception: 'Students often treat supporting characters as mere background, listing traits without linking to theme or protagonist\'s development.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot link character to theme, guide them to: 1) Re-read the scene where M.', 'Hamel speaks about French as "the key to their prison." 2) Note the villagers\' primer and tears.', '3) Use the PEEL template: Point (character represents X), Evidence (quote), Explanation (connect to theme), Link (to.', 'Have them practice with one character first, then expand.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of "The Last Lesson" is the profound pain and cultural.',
          hint: 'If unable to separate theme from plot, re-read the NCERT "Understanding the text" Q1 and.',
          misconception: '**Misconception:** "The primary theme is \'regret for not studying\' or \'the last day of school\'." **Why it happens:**.',
          parts: [
                { id: 'a', prompt: 'What is the exact phrasing of the primary theme as given in the "About the Unit" section of the NCERT textbook for "The Last Lesson"?', answer: 'Correct answer: "The pain that is inflicted on the people of a territory by its',
                  options: ['Correct answer: "The pain that is inflicted on the people of a territory by its', 'A wrong answer (e.g', 'It\'s about the Franco-Prussian War'],
                  hint: 'If unable to separate theme from plot, re-read the NCERT "Understanding the text" Q1 and "Talking.',
                  misconception: '**Misconception:** "The primary theme is \'regret for not studying\' or \'the last day of school\'." **Why it happens:** Students latch onto.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['Re-read the **"About the Unit" box** (last page of the chapter) and copy the exact "Theme" sentence.', 'Re-read the **three "Understanding the text" questions** at the end of the story; note how Q1 ("people suddenly realise.', 'Complete this **micro-task**: List 4 phrases from the story that directly reference language loss (e.g., "teach only.', 'Re-attempt **Diagnostic Question 2** and **4** with this lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
