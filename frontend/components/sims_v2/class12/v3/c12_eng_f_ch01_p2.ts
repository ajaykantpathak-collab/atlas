import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch01_p2: SimDef = {
    id: 'v3_c12_eng_f_ch01_p2',
    title: 'The Last Lesson · Part 2/3',
    subtitle: 'The day grammar became a nation\'s last stand',
    classLevel: 12, subject: 'eng_f', topic: 'The Last Lesson · Part 2/3',
    chapters: ['c12_eng_f_ch01'],
    nodeIds: ['c12_eng_f_cbse_01_007', 'c12_eng_f_cbse_01_008', 'c12_eng_f_cbse_01_009', 'c12_eng_f_cbse_01_010', 'c12_eng_f_cbse_01_011', 'c12_eng_f_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary analyst', intro: 'A language dies quietly — in a classroom, on a Tuesday. See the history hiding in one boy\'s unfinished homework.', goal: 'Connect the Franco-Prussian decree to every character\'s behaviour and read the story as cultural resistance.' },
    discovery: {
        question: 'Franz almost skips school to dodge a grammar test — on the very morning his language is outlawed forever. Why does that childish impulse make the tragedy sharper, not smaller?',
        options: ['A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation', 'It shows Franz was simply lazy', 'It proves the decree wasn\'t important', 'It tells us school was optional'],
        answer: 'A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation',
        hook: 'The Franco-Prussian War isn\'t background trivia — it IS the plot. Berlin\'s decree banning French drives every detail: the bulletin board, the villagers\' guilt, M. Hamel\'s Sunday clothes. Read the history as the conflict, not the décor.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Last Lesson\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk into that last classroom as a witness: decode how the language decree turns grammar into resistance, and trace what the pigeons, the primer and \'Vive la France!\' are really saying.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Last Lesson\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in literature and name any two secondary themes present in "The Last Lesson" with one-line textual evidence for.', options: [
                { text: 'A secondary theme is a supporting thematic thread that enriches the primary theme by', outcome: 'A secondary theme is a supporting thematic thread that enriches the primary theme by exploring.' },
                { text: 'forty years of faithful service', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor events." They list things like.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'sadness', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor events." They list things like.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Last Lesson\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'List three examples of visual imagery from the first five paragraphs of "The Last Lesson" and state what each reveals about the setting.', options: [
                { text: 'Correct answer: (1) "birds were chirping at the edge of the woods"', outcome: 'Correct answer: (1) "birds were chirping at the edge of the woods" — establishes peaceful, warm.' },
                { text: 'It was so warm, so bright!', outcome: 'Not quite — Students think "imagery" only means visual description (pictures in the mind) and miss auditory.', reveals: 'imagery-only-means-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students think "imagery" only means visual description (pictures in the mind) and miss auditory.', reveals: 'imagery-only-means-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Last Lesson\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one generic example for each (not from the text).', options: [
                { text: 'Irony: A contrast between expectation and reality (e.g., a fire station burning down)', outcome: 'Irony: A contrast between expectation and reality (e.g., a fire station burning down).' },
                { text: 'rain on your wedding day', outcome: 'Not quite — Students often think **any unexpected event is irony** (e.g., "It\'s ironic that Franz was late").', reveals: 'any-unexpected-event-is-irony' },
                { text: 'It\'s ironic that Franz was late', outcome: 'Not quite — Students often think **any unexpected event is irony** (e.g., "It\'s ironic that Franz was late").', reveals: 'any-unexpected-event-is-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Last Lesson\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What does the expression "in great dread of" mean as used in the opening sentence of "The Last Lesson"?', options: [
                { text: 'Correct answer: It means "feeling intense fear or anxiety about something that might', outcome: 'Correct answer: It means "feeling intense fear or anxiety about something that might happen.".' },
                { text: 'feeling intense fear or anxiety about something that might happen', outcome: 'Not quite — Students often think "vocabulary in context" means guessing the meaning of a word from its.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'or misreading the preposition', outcome: 'Not quite — Students often think "vocabulary in context" means guessing the meaning of a word from its.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Last Lesson\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Define the past perfect tense and state its primary function in a narrative already told in the simple past tense.', options: [
                { text: '**Correct Answer:** Past perfect tense is formed with "had + past participle" (e.g., "had', outcome: '**Correct Answer:** Past perfect tense is formed with "had + past participle" (e.g., "had come".' },
                { text: 'it shows an action that happened a long time ago', outcome: 'Not quite — **Misconception:** "Past perfect is just a more formal/polite version of simple past, used.', reveals: 'misconception-past-perfect-is-just' },
                { text: 'it is just the past of past', outcome: 'Not quite — **Misconception:** "Past perfect is just a more formal/polite version of simple past, used.', reveals: 'misconception-past-perfect-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Last Lesson\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define literal comprehension and inferential comprehension in your own words.', options: [
                { text: '**Correct answer:** Literal comprehension is understanding information directly stated in', outcome: '**Correct answer:** Literal comprehension is understanding information directly stated in the text.' },
                { text: 'literal means reading between the lines', outcome: 'Not quite — Students treat inferential answers as unsupported guesses. They write "I think Franz is sad".', reveals: 'students-treat-inferential-answers-as' },
                { text: 'Franz hated school', outcome: 'Not quite — Students treat inferential answers as unsupported guesses. They write "I think Franz is sad".', reveals: 'students-treat-inferential-answers-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_007', title: 'A real-world call',
          caseStudy: { intro: 'A writer must choose between writing in English — reaching a global audience, earning more — or in their mother tongue — preserving a language, reaching a smaller home audience.',
            decisions: [{ prompt: 'Does reach justify abandoning your own language?', options: [
                { text: 'Write in English — ideas matter more than the vessel', outcome: 'The reach argument; every writer who chooses this makes the home language\'s literature a little thinner.' },
                { text: 'Write in the mother tongue — a language dies by desertion', outcome: 'The preservation argument; the smaller audience is real, and so is what only that language can say.' },
                { text: 'Write in both — translate yourself', outcome: 'The dual answer — doubles the work, keeps both doors open; the rarest choice because it\'s the hardest.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A district orders all schools to teach only in a new official language from tomorrow; elders crowd the notice board while a child shrugs, \'it\'s just a subject switch\'.',
            decisions: [{ prompt: 'Is it just a subject switch?', options: [
                { text: 'No — Daudet\'s point in \'The Last Lesson\' is that language carries identity and freedom; banning the mother tongue is cultural amputation, which is why the villagers treat the last class as a shared loss.', outcome: 'A decree about \'just a language\' lands as the loss of a community\'s voice — the story\'s whole weight comes from that difference.' },
                { text: 'Yes — grammar is grammar; swapping which language is taught changes nothing essential.', outcome: 'That reads the decree as administrative detail and misses how the war\'s terms reach into every villager\'s sense of self.', reveals: 'language-is-just-a-subject' },
                { text: 'Sad, but attachment to one\'s language is nostalgia — practicality says move on.', outcome: 'The villagers\' guilt and Hamel\'s ceremony show the attachment isn\'t sentimentality but belonging — dismissing it erases what was actually lost.', reveals: 'pragmatism-erases-identity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a quiet classroom scene and hear an empire fall. Daudet teaches you to find the enormous inside the ordinary — the skill every literature answer is secretly grading.',
            decisions: [{ prompt: 'What comes next? The Last Lesson · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Last Lesson · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Last Lesson\' — the supporting ideas and motifs that.',
          hint: 'If stuck, review the "Understanding the text" Q1 in NCERT: "The people in this story.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the theme of "procrastination and regret" operates differently for Franz versus M. Hamel in the story.', answer: 'For Franz, procrastination is youthful carelessness',
                  options: ['For Franz, procrastination is youthful carelessness', 'put off learning till tomorrow', 'secondary themes', 'subplots'],
                  hint: 'If stuck, review the "Understanding the text" Q1 in NCERT: "The people in this story suddenly.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late" or "the beetles.' },
                { id: 'b', prompt: 'ANALYZE: Compare how the "community guilt" theme is conveyed through the villagers\' SILENCE versus their PHYSICAL PRESENCE in the classroom.', answer: 'The villagers\' physical presence',
                  options: ['The villagers\' physical presence', 'they were sad', 'they respected the teacher', 'secondary themes'],
                  hint: 'If stuck, review the "Understanding the text" Q1 in NCERT: "The people in this story suddenly.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late" or "the beetles.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes: Step 1 — Revisit node c12_eng_f_cbse_01_006 (Primary Theme) and.', 'Step 2 — Label each Column B item with a universal idea (e.g., "Franz chooses birds\' eggs" → Procrastination; "Hauser.', 'Step 3 — Practice writing one PEEL paragraph per Column B label using the WORKED_EXAMPLE_1 structure.', 'Re-diagnostic: Ask student to explain how "M.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late".',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "M. Hamel\'s self-blame (\'I\'ve been to blame also\') strengthens the story\'s critique of authoritarian education systems." Defend or challenge this.', answer: 'CHALLENGE: M',
                  options: ['CHALLENGE: M', 'secondary themes', 'subplots', 'minor events'],
                  hint: 'If stuck, review the "Understanding the text" Q1 in NCERT: "The people in this story suddenly.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late" or "the beetles.' },
                { id: 'b', prompt: 'CREATE: Write a 6-line diary entry from old Hauser\'s perspective that night, weaving in the secondary themes of (a) community guilt, (b) latent value.', answer: 'Sample answer: "June 15, 1870',
                  options: ['Sample answer: "June 15, 1870', 'secondary themes', 'subplots', 'minor events'],
                  hint: 'If stuck, review the "Understanding the text" Q1 in NCERT: "The people in this story suddenly.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor events." They list things like "Franz being late" or "the beetles.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes: Step 1 — Revisit node c12_eng_f_cbse_01_006 (Primary Theme) and.', 'Step 2 — Label each Column B item with a universal idea (e.g., "Franz chooses birds\' eggs" → Procrastination; "Hauser.', 'Step 3 — Practice writing one PEEL paragraph per Column B label using the WORKED_EXAMPLE_1 structure.', 'Re-diagnostic: Ask student to explain how "M.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_008', difficulty: 'standard',
          question: 'Imagery in \'The Last Lesson\' — the vivid, sensory language that creates.',
          hint: 'Review the "Metaphor Anatomy" table exercise in c11_eng_h_cbse_01_008 Worked Example 2.',
          misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss auditory, tactile, olfactory.',
          parts: [
                { id: 'a', prompt: 'List three examples of visual imagery from the first five paragraphs of "The Last Lesson" and state what each reveals about the setting or mood.', answer: 'Correct answer: (1) "birds were chirping at the edge of the woods"',
                  options: ['Correct answer: (1) "birds were chirping at the edge of the woods"', 'It was so warm, so bright!', 'imagery'],
                  hint: 'Review the "Metaphor Anatomy" table exercise in c11_eng_h_cbse_01_008 Worked Example 2.',
                  misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory images.' },
                { id: 'b', prompt: 'Explain in your own words the metaphor "when a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison.".', answer: 'Correct answer: Tenor = enslaved people retaining their language',
                  options: ['Correct answer: Tenor = enslaved people retaining their language', 'language is a key', 'imagery'],
                  hint: 'Review the "Metaphor Anatomy" table exercise in c11_eng_h_cbse_01_008 Worked Example 2.',
                  misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory images.' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Re-read the text with a highlighter — use five colors for five senses. Mark every sensory phrase.', 'For each metaphor, draw a two-column table: Tenor (abstract idea) | Vehicle (concrete image).', 'Re-attempt Diagnostic Questions 2 and 4 using this table method.', 'If still stuck, revisit node c11_eng_h_cbse_01_008 (Class 11 Literary Devices: Imagery and Metaphor) for the basic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Last Lesson\' — where opposite things are both true.',
          hint: 'If unable to spot irony, re-read the opening paragraphs (Franz\'s dread, the.',
          misconception: 'Students often think **any unexpected event is irony** (e.g., "It\'s ironic that Franz was late").',
          parts: [
                { id: 'a', prompt: 'Explain the irony in the blacksmith Wachter calling out to Franz, "Don\'t go so fast, bub; you\'ll get to your school in plenty of time!" (Paragraph 4).', answer: 'Wachter knows the order from Berlin has made this the *last* French lesson',
                  options: ['Wachter knows the order from Berlin has made this the *last* French lesson', 'Wachter is being kind', 'It\'s ironic that Franz was late', '**any unexpected event is irony** (e'],
                  hint: 'If unable to spot irony, re-read the opening paragraphs (Franz\'s dread, the bulletin-board.',
                  misconception: 'Students often think **any unexpected event is irony** (e.g., "It\'s ironic that Franz was late").' },
                { id: 'b', prompt: 'Identify ONE symbol in the story (other than the pigeons) and explain its deeper meaning using a specific textual detail.', answer: 'The new writing copies',
                  options: ['The new writing copies', 'They looked like little flags floating everywhere in the school-room', 'writing practice', 'It\'s ironic that Franz was late'],
                  hint: 'If unable to spot irony, re-read the opening paragraphs (Franz\'s dread, the bulletin-board.',
                  misconception: 'Students often think **any unexpected event is irony** (e.g., "It\'s ironic that Franz was late").' }
          ],
            remediations: { 'any-unexpected-event-is-irony': { steps: ['Re-read the story marking every moment where a character says/thinks one thing but the situation means the opposite.', 'For each, write: "Literal meaning: ___ | Contextual meaning: ___ | Device: ___".', 'Re-attempt Diagnostic Questions 2 and 3 using this table.', 'If still stuck, review **c12_eng_f_cbse_01_002** (Plot) to re-establish the sequence of events that creates the ironic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Last Lesson\' — the words and phrases you must know.',
          hint: 'If stuck, review the "Context and Background" node (c12_eng_f_cbse_01_001) to refresh the.',
          misconception: 'Students often think "vocabulary in context" means guessing the meaning of a word from its dictionary definition that.',
          parts: [
                { id: 'a', prompt: 'In the sentence "lessons repeated in unison, very loud, with our hands over our ears to understand better," what does "in unison" tell us about the classroom.', answer: 'Correct answer: "In unison" means "all together, at the same time." It shows the',
                  options: ['Correct answer: "In unison" means "all together, at the same time." It shows the', 'one by one', 'quietly', 'very loud'],
                  hint: 'If stuck, review the "Context and Background" node (c12_eng_f_cbse_01_001) to refresh the.',
                  misconception: 'Students often think "vocabulary in context" means guessing the meaning of a word from its dictionary definition that seems to fit.' },
                { id: 'b', prompt: 'Apply the context-clue strategy to determine the meaning of "counted on" in this sentence from the story: "I had counted on the commotion to get to my desk.', answer: 'Correct answer: "counted on" means "relied on" or "depended on"',
                  options: ['Correct answer: "counted on" means "relied on" or "depended on"', 'I had relied on the commotion to get to my desk without being seen', 'calculated', 'numbered'],
                  hint: 'If stuck, review the "Context and Background" node (c12_eng_f_cbse_01_001) to refresh the.',
                  misconception: 'Students often think "vocabulary in context" means guessing the meaning of a word from its dictionary definition that seems to fit.' },
                { id: 'c', prompt: 'Analyze the phrase "a great bustle" in the context of the story.', answer: 'Correct answer: "A great bustle" refers to noisy, energetic activity',
                  options: ['Correct answer: "A great bustle" refers to noisy, energetic activity', 'vocabulary in context'],
                  hint: 'If stuck, review the "Context and Background" node (c12_eng_f_cbse_01_001) to refresh the.',
                  misconception: 'Students often think "vocabulary in context" means guessing the meaning of a word from its dictionary definition that seems to fit.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot infer meanings from context, have them: (1) Re-read the specific paragraph containing the target.', '(2) Highlight all words/phrases within 2 sentences before and after the target.', '(3) Ask: "What is the speaker feeling?', 'What is happening physically?" (4) Match the target expression to one of the highlighted clues.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_011', difficulty: 'standard',
          question: 'Language and style in \'The Last Lesson\' — how the writer chose words, sentences.',
          hint: 'If stuck on backshifting, revisit **c11_eng_h_cbse_01_011** (Class 11 Hornbill Grammar.',
          misconception: '**Misconception:** "Past perfect is just a more formal/polite version of simple past, used in stories to sound.',
          parts: [
                { id: 'a', prompt: 'Compare the two sentences from the text: (A) "The order **has come** from Berlin to teach only German." (B) "The order **came** from Berlin to teach only.', answer: '**Correct Answer:** (A) uses **present perfect passive** ("has come")',
                  options: ['**Correct Answer:** (A) uses **present perfect passive** ("has come")', 'both mean the same', 'passive is more formal'],
                  hint: 'If stuck on backshifting, revisit **c11_eng_h_cbse_01_011** (Class 11 Hornbill Grammar: reported.',
                  misconception: '**Misconception:** "Past perfect is just a more formal/polite version of simple past, used in stories to sound literary." **Why it\'s.' }
          ],
            remediations: { 'misconception-past-perfect-is-just': { steps: ['**Timeline Drill:** Draw a horizontal line.', 'Mark "NOW" (Franz at school).', 'Place "Hamel\'s warning" left of "Franz starts for school".', 'Place "Order from Berlin" left of "Hamel\'s announcement".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Last Lesson\' — questions answered straight from.',
          hint: 'If stuck, re-read the story focusing on M. Hamel\'s speech about language (paragraph.',
          misconception: 'Students treat inferential answers as unsupported guesses. They write "I think Franz is sad" without citing evidence.',
          parts: [
                { id: 'a', prompt: 'In the first paragraph of "The Last Lesson," Franz thinks of running away. What does this literally tell us? What can we infer about his feelings toward school?', answer: '**Correct answer:** Literal: Franz considered skipping school',
                  options: ['**Correct answer:** Literal: Franz considered skipping school', 'Franz hates school', 'What did Franz notice unusual?', 'He felt sad'],
                  hint: 'If stuck, re-read the story focusing on M. Hamel\'s speech about language (paragraph starting "Then.',
                  misconception: 'Students treat inferential answers as unsupported guesses. They write "I think Franz is sad" without citing evidence: "My books...' }
          ],
            remediations: { 'students-treat-inferential-answers-as': { steps: ['Have the student re-read the first two pages of the story and highlight every sentence that states a fact (literal).', 'Practice converting each blue-highlighted sentence into an inferential question and answering it using PEEL (Point.', 'Re-attempt Diagnostic Questions 2 and 4 with this color-coded text, explicitly labeling each step of PEEL.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
