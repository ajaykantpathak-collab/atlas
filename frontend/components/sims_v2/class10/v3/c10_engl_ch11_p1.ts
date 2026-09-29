import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch11_p1: SimDef = {
    id: 'v3_c10_engl_ch11_p1',
    title: 'The Thief\'s Story · Part 1/2',
    subtitle: 'Decide what a thief does when someone finally trusts him',
    classLevel: 10, subject: 'engl', topic: 'The Thief\'s Story · Part 1/2',
    chapters: ['c10_engl_ch11'],
    nodeIds: ['c10_engl_cbse_11_001', 'c10_engl_cbse_11_002', 'c10_engl_cbse_11_003', 'c10_engl_cbse_11_004', 'c10_engl_cbse_11_005', 'c10_engl_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young thief at a crossroads', intro: 'You are Hari Singh: charming, quick, and honest about only one thing — that you steal. Then you meet Anil, who hands you his money, his kitchen and his time without asking questions.', goal: 'Analyse how trust and education can reform where punishment cannot.' },
    discovery: {
        question: 'Hari Singh, a skilled 15-year-old thief, steals ₹600 from Anil — the one man who trusted him and was teaching him to read and write. Hours later he secretly returns the money. Why would a professional thief give back a successful theft?',
        options: ['He realised education and Anil\'s trust could change his life in ways stolen money never could', 'He was afraid the police had already been informed', 'The notes were wet and damaged, so they were worthless', 'He planned to steal a bigger amount later'],
        answer: 'He realised education and Anil\'s trust could change his life in ways stolen money never could',
        hook: 'The most valuable thing Anil gave Hari wasn\'t money — it was being treated as someone worth teaching. Stealing from a man who trusted him cost more than ₹600.',
    },
    teaching: [
        { title: 'Hari Singh: A Fifteen-Year-Old Thief and His Methods', text: 'Hari Singh is the fifteen-year-old first-person narrator and protagonist of "The Thief\'s Story" — a skilled, habitual thief who uses charm, adaptability, and changing identities to gain trust and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step inside the mind of a boy who survives by lying: weigh the thrill of an easy theft against the slow reward of learning to write your own name, and decide what to do at the railway station.',
        labels: ['Hari Singh: A Fifteen-Year-Old', 'Anil: A Kind, Trusting', 'Hari\'s Temptation: Stealing Anil\'s', 'Hari\'s Return: Why He', 'The Power of Education', 'Theme: Trust, Redemption'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_001', title: 'Hari Singh: A Fifteen-Year-Old Thief and His Methods',
          caseStudy: { intro: 'Imagine you meet a new classmate who seems friendly and helpful but you later discover they\'ve been taking small things from others\' bags — how would you.',
            decisions: [{ prompt: 'What is the very first sentence of the story, and what does it immediately establish about Hari Singh\'s narrative perspective?', options: [
                { text: 'The first sentence is "I was still a thief when I met Anil." It establishes Hari as a', outcome: 'The first sentence is "I was still a thief when I met Anil." It establishes Hari as a first-person.' },
                { text: 'Hari is a good person who helps Anil cook', outcome: 'Not quite — Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good.', reveals: 'students-often-treat-hari-s' },
                { text: 'I knew that if I could cook well, I could get a job anywhere', outcome: 'Not quite — Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good.', reveals: 'students-often-treat-hari-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_002', title: 'Anil: A Kind, Trusting Young Man Who Teaches Hari',
          caseStudy: { intro: 'Imagine you\'re describing a teacher who changed your life not by scolding but by trusting you when you didn\'t deserve it.',
            decisions: [{ prompt: 'REMEMBER: List three specific actions Anil takes in the story that demonstrate his kindness toward Hari.', options: [
                { text: 'Correct actions: (1) Employing Hari despite knowing he is a thief (implied by Hari\'s name', outcome: 'Correct actions: (1) Employing Hari despite knowing he is a thief (implied by Hari\'s name changes).' },
                { text: 'he was nice', outcome: 'Not quite — Students often write: "Anil is foolish because he trusts a thief." This error comes from reading.', reveals: 'students-often-write-anil-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_003', title: 'Hari\'s Temptation: Stealing Anil\'s Money and the Internal Conflict',
          caseStudy: { intro: 'Imagine you find a wallet full of cash on a deserted street — your heart races, your mind calculates what you could buy, but a quiet voice asks, "What would.',
            decisions: [{ prompt: 'What is the exact amount of money Hari Singh steals from Anil, and where does Anil keep it?', options: [
                { text: 'Hari steals 600 rupees', outcome: 'Hari steals 600 rupees, which Anil keeps under the mattress. A wrong answer (e.g., "500 rupees".' },
                { text: '500 rupees', outcome: 'Not quite — Students often claim Hari\'s internal conflict is simply "fear of being caught" or "greed vs.', reveals: 'students-often-claim-hari-s' },
                { text: 'from Anil\'s pocket', outcome: 'Not quite — Students often claim Hari\'s internal conflict is simply "fear of being caught" or "greed vs.', reveals: 'students-often-claim-hari-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_004', title: 'Hari\'s Return: Why He Brings the Money Back',
          caseStudy: { intro: 'Imagine you have just done something you know is wrong — perhaps copied in an exam or lied to a friend who trusts you completely.',
            decisions: [{ prompt: 'What is the immediate physical setting when Hari decides to return the money, and what two sensory details does the author emphasize?', options: [
                { text: 'The setting is the deserted railway platform at night in heavy rain', outcome: 'The setting is the deserted railway platform at night in heavy rain.' },
                { text: 'morning at Anil\'s house', outcome: 'Not quite — Students often believe Hari returns the money *because Anil would have caught him* or *because.', reveals: 'hari-returns-the-money-because' },
                { text: 'inside the train', outcome: 'Not quite — Students often believe Hari returns the money *because Anil would have caught him* or *because.', reveals: 'hari-returns-the-money-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_005', title: 'The Power of Education: Anil Teaching Hari to Write',
          caseStudy: { intro: 'Imagine you are Hari, a fifteen-year-old thief who has never held a pen for anything except signing a false name.',
            decisions: [{ prompt: 'What are the two specific things Anil teaches Hari to write, in the order they appear in the story?', options: [
                { text: 'Anil first teaches Hari to write his name ("Hari Singh"), and later teaches him to write', outcome: 'Anil first teaches Hari to write his name ("Hari Singh"), and later teaches him to write whole.' },
                { text: 'teaches him to read', outcome: 'Not quite — Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g.', reveals: 'anil-teaches-hari-to-write' },
                { text: 'teaches him to sign cheques', outcome: 'Not quite — Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g.', reveals: 'anil-teaches-hari-to-write' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_006', title: 'Theme: Trust, Redemption and the Transformative Power of Education',
          caseStudy: { intro: 'Imagine you are Hari Singh, holding a bundle of stolen notes at the railway station, the train to Lucknow about to leave — yet you turn back. Why?',
            decisions: [{ prompt: 'What is the central message about trust that the story conveys through Anil\'s behaviour toward Hari?', options: [
                { text: 'The story shows that trust, even when seemingly naive, can catalyse moral transformation;', outcome: 'The story shows that trust, even when seemingly naive, can catalyse moral transformation; Anil\'s.' },
                { text: 'Anil is foolish to trust a thief', outcome: 'Not quite — Students often write that Hari returns the money solely because he fears Anil will discover the.', reveals: 'students-often-write-that-hari' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbourhood teenager is caught shoplifting. Most residents want him banned from their doors; one shopkeeper instead offers him small paid errands and teaches him to keep accounts. People call the shopkeeper a fool for trusting a thief.',
            decisions: [{ prompt: 'In light of \'The Thief\', what is the wisest reading of the shopkeeper\'s gamble?', options: [
                { text: 'It is the Anil approach — Hari Singh stole from a man who trusted him, taught him to cook and write, and paid him with respect; it was precisely that trust, and the glimpse of what an educated life could bring, that pulled Hari back to return the money. Trust is not naivety here; it is the only thing in the story that changes anyone.', outcome: 'The chapter argues that reform comes from being treated as worth trusting — punishment alone would have made Hari merely a more careful thief.' },
                { text: 'The shopkeeper is indeed a fool — once a thief, always a thief, and trust just gives the boy easier targets.', outcome: 'Hari literally returned under the weight of the trust he was shown; writing off every young offender guarantees the prediction comes true.', reveals: 'once-a-thief-always' },
                { text: 'Trust only works if combined with a strict warning and watching his every move for months.', outcome: 'Anil never watched or warned — it was his deliberate, open-handed trust and the gift of education that did the work; surveillance would have taught the boy only to hide better.', reveals: 'trust-needs-surveillance' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Trust turned out to be the thing Hari couldn\'t steal — he could only lose it or earn it. He chose to earn it.',
            decisions: [{ prompt: 'What comes next? The Thief\'s Story · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Thief\'s Story · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_001', difficulty: 'standard',
          question: 'Hari Singh is the fifteen-year-old first-person narrator and protagonist.',
          hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and practice.',
          misconception: 'Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good person who helps Anil.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how Hari Singh selects and approaches his victims, using two specific strategies he mentions in the story.', answer: 'Hari targets people who appear simple, trusting, or in need of help',
                  options: ['Hari targets people who appear simple, trusting, or in need of help', 'he steals from anyone', 'he uses force', 'Hari is a good person who helps Anil cook'],
                  hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and practice identifying when.',
                  misconception: 'Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good person who helps Anil cook" instead.' }
          ],
            remediations: { 'students-often-treat-hari-s': { steps: ['Have the student re-read the paragraph where Hari says "I knew that if I could cook well..." and underline the phrase.', 'Ask: "If Hari truly liked cooking, why does he say \'I could get a job *anywhere*\'?" Guide them to see the instrumental.', 'Practice writing one PEEL paragraph contrasting *action* (cooking) vs. *motive* (employability/theft access).', 'Compare with a Class 6 character (e.g., Suraj) where action=motive, to cement the Class 10 shift to analyzing subtext.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good person who helps Anil.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Ruskin Bond\'s choice to make a thief the first-person narrator.', answer: 'It creates *both* sympathy and dramatic irony',
                  options: ['It creates *both* sympathy and dramatic irony', 'Hari is a good person who helps Anil cook', 'I knew that if I could cook well, I could get a job anywhere', 'The Tunnel'],
                  hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and practice identifying when.',
                  misconception: 'Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good person who helps Anil cook" instead.' },
                { id: 'b', prompt: 'Rewrite the opening scene from Anil\'s third-person perspective, showing Hari\'s arrival and offer to cook, but *without* revealing Hari\'s inner thoughts.', answer: 'A lean boy of fifteen stood at the doorway, smiling',
                  options: ['A lean boy of fifteen stood at the doorway, smiling', 'Hari is a good person who helps Anil cook', 'I knew that if I could cook well, I could get a job anywhere', 'The Tunnel'],
                  hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and practice identifying when.',
                  misconception: 'Students often treat Hari\'s charm and helpfulness as genuine kindness, writing "Hari is a good person who helps Anil cook" instead.' }
          ],
            remediations: { 'students-often-treat-hari-s': { steps: ['Have the student re-read the paragraph where Hari says "I knew that if I could cook well..." and underline the phrase.', 'Ask: "If Hari truly liked cooking, why does he say \'I could get a job *anywhere*\'?" Guide them to see the instrumental.', 'Practice writing one PEEL paragraph contrasting *action* (cooking) vs. *motive* (employability/theft access).', 'Compare with a Class 6 character (e.g., Suraj) where action=motive, to cement the Class 10 shift to analyzing subtext.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_002', difficulty: 'standard',
          question: 'From \'The Thief\': the skill or concept this node teaches, applied to the actual.',
          hint: 'If stuck, review PEEL structure from c9_engl_ch1_2 and re-read the three key Anil scenes.',
          misconception: 'Students often write: "Anil is foolish because he trusts a thief." This error comes from reading the story as.',
          parts: [
                { id: 'a', prompt: 'APPLY: Given this new scenario — "A shopkeeper catches a street child stealing an apple.', answer: 'Traits: (1) Kindness/Compasion',
                  options: ['Traits: (1) Kindness/Compasion', 'honesty', 'strictness'],
                  hint: 'If stuck, review PEEL structure from c9_engl_ch1_2 and re-read the three key Anil scenes: hiring.',
                  misconception: 'Students often write: "Anil is foolish because he trusts a thief." This error comes from reading the story as a realistic crime report.' },
                { id: 'b', prompt: 'ANALYZE: Compare Anil\'s trust with the trust Hari initially exploits. How does the *nature* of their trust differ?', answer: 'Correct analysis: Hari\'s trust is conditional',
                  options: ['Correct analysis: Hari\'s trust is conditional', 'both trust each other'],
                  hint: 'If stuck, review PEEL structure from c9_engl_ch1_2 and re-read the three key Anil scenes: hiring.',
                  misconception: 'Students often write: "Anil is foolish because he trusts a thief." This error comes from reading the story as a realistic crime report.' }
          ],
            remediations: { 'students-often-write-anil-is': { steps: ['If a student calls Anil "foolish," do this 3-step fix: (1) Ask: "Does Anil *know* Hari steals the 1 rupee daily?" (Yes.', '(2) Ask: "If he knows and still trusts, is it foolishness or a choice?" (Choice).', '(3) Have them rewrite the trait as "deliberately trusting" and find the line where Anil says "we\'ll start writing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_003', difficulty: 'standard',
          question: 'This topic examines the pivotal moment in "The Thief\'s Story" when Hari Singh.',
          hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and practice separating "what.',
          misconception: 'Students often claim Hari\'s internal conflict is simply "fear of being caught" or "greed vs.',
          parts: [
                { id: 'a', prompt: 'What is the exact amount of money Hari Singh steals from Anil, and where does Anil keep it?', answer: 'Hari steals 600 rupees',
                  options: ['Hari steals 600 rupees', '500 rupees', 'from Anil\'s pocket'],
                  hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and practice separating "what the.',
                  misconception: 'Students often claim Hari\'s internal conflict is simply "fear of being caught" or "greed vs.' }
          ],
            remediations: { 'students-often-claim-hari-s': { steps: ['Re-read the station scene aloud, pausing at every sentence starting with "I thought," "I realized," "I knew." 2.', 'Highlight two columns: "Thief Hari" (habit, excitement, skill) vs.', '"Learner Hari" (trust, education, future).', 'Write one PEEL paragraph using only the "Learner Hari" column to prove the conflict is about identity, not fear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_004', difficulty: 'standard',
          question: 'Hari\'s return refers to the pivotal moment in Ruskin Bond\'s "The Thief\'s Story".',
          hint: 'If stuck, review c10_engl_cbse_11_003 (the theft scene) and c9_engl_ch1_7 (first-person.',
          misconception: 'Students often believe Hari returns the money *because Anil would have caught him* or *because he missed the train*.',
          parts: [
                { id: 'a', prompt: 'What is the immediate physical setting when Hari decides to return the money, and what two sensory details does the author emphasize?', answer: 'The setting is the deserted railway platform at night in heavy rain',
                  options: ['The setting is the deserted railway platform at night in heavy rain', 'morning at Anil\'s house', 'inside the train'],
                  hint: 'If stuck, review c10_engl_cbse_11_003 (the theft scene) and c9_engl_ch1_7 (first-person narrative).',
                  misconception: 'Students often believe Hari returns the money *because Anil would have caught him* or *because he missed the train*.' },
                { id: 'b', prompt: 'Hari thinks, "I had forgotten about the rain and the night and the loneliness." Explain in your own words what this sentence reveals about his state of mind.', answer: 'It reveals that Hari\'s internal conflict',
                  options: ['It reveals that Hari\'s internal conflict', 'he was wet', 'he missed the train'],
                  hint: 'If stuck, review c10_engl_cbse_11_003 (the theft scene) and c9_engl_ch1_7 (first-person narrative).',
                  misconception: 'Students often believe Hari returns the money *because Anil would have caught him* or *because he missed the train*.' }
          ],
            remediations: { 'hari-returns-the-money-because': { steps: ['Re-read the platform scene (paras starting "The train had gone..." to "I crept back into the room") with a highlighter.', 'Ask aloud: "Does any thought mention fear of police or Anil waking up?" (No.)', 'Write two columns: "What he loses by returning" (money, freedom) vs "What he gains" (education, trust, self-respect).', 'Draft a one-sentence thesis: "Hari returns because he chooses his future self over his past habit." This shifts focus.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_005', difficulty: 'standard',
          question: 'The power of education in "The Thief\'s Story" refers to the transformative.',
          hint: 'Review the character sketches of Hari and Anil (nodes c10_engl_cbse_11_001 and.',
          misconception: 'Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g., forge documents.',
          parts: [
                { id: 'a', prompt: 'Why does Anil decide to teach Hari to write? Choose the best answer: (a) So Hari can forge signatures for future thefts, (b) Because Anil believes everyone.', answer: 'Because Anil believes everyone deserves literacy and a chance to change, (',
                  options: ['Because Anil believes everyone deserves literacy and a chance to change, (', 'Anil teaches Hari to write *so that Hari can become a better thief* (e'],
                  hint: 'Review the character sketches of Hari and Anil (nodes c10_engl_cbse_11_001 and.',
                  misconception: 'Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g., forge documents, write ransom notes).' },
                { id: 'b', prompt: 'Apply the concept of "literacy as agency" to a new situation: If Hari, after leaving Anil, writes a letter to a potential employer explaining his skills.', answer: 'Strong answers will select phrases like "I knew how to write my name now" (shows',
                  options: ['Strong answers will select phrases like "I knew how to write my name now" (shows', 'Anil teaches Hari to write *so that Hari can become a better thief* (e'],
                  hint: 'Review the character sketches of Hari and Anil (nodes c10_engl_cbse_11_001 and.',
                  misconception: 'Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g., forge documents, write ransom notes).' },
                { id: 'c', prompt: 'Analyze the contrast between Hari\'s attitude toward writing *before* he meets Anil (when he uses fake names) and *after* he learns to write his real name.', answer: 'Before: writing is a tool for deception (fake signatures, false identities)',
                  options: ['Before: writing is a tool for deception (fake signatures, false identities)', 'Anil teaches Hari to write *so that Hari can become a better thief* (e'],
                  hint: 'Review the character sketches of Hari and Anil (nodes c10_engl_cbse_11_001 and.',
                  misconception: 'Students often believe Anil teaches Hari to write *so that Hari can become a better thief* (e.g., forge documents, write ransom notes).' }
          ],
            remediations: { 'anil-teaches-hari-to-write': { steps: ['Re-read the two paragraphs where Anil teaches Hari (the name-writing scene and the sentence-writing scene).', 'Highlight every verb that describes Anil\'s actions (e.g., "taught," "smiled," "never asked").', 'Ask: "Does any verb suggest Anil suspects Hari?" 4.', 'Write one sentence: "Anil teaches because ______." This forces the student to articulate Anil\'s actual motive from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_006', difficulty: 'standard',
          question: 'Theme is the central idea or underlying message that a literary work conveys.',
          hint: 'If stuck, re-watch the scene-summary videos for nodes 003 (theft), 004 (return), and 005.',
          misconception: 'Students often write that Hari returns the money solely because he fears Anil will discover the theft, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Theme is the central idea or underlying message that a literary work conveys about human',
                  options: ['Theme is the central idea or underlying message that a literary work conveys about human', 'Hari Singh is the fifteen-year-old first-person narrator and protagonist of "The Thief\'s', 'From \'The Thief\': the skill or concept this node teaches, applied to the actual text', 'This topic examines the pivotal moment in "The Thief\'s Story" when Hari Singh, a habitual'],
                  hint: 'If stuck, re-watch the scene-summary videos for nodes 003 (theft), 004 (return), and 005.',
                  misconception: 'Students often write that Hari returns the money solely because he fears Anil will discover the theft, ignoring the textual evidence that.' }
          ],
            remediations: { 'students-often-write-that-hari': { steps: ['Re-read the final two paragraphs aloud, highlighting every verb that shows Anil\'s awareness (knew, smiled, handed).', 'List three things Hari *gains* by returning (education, trust, self-respect) vs.', 'what he *loses* (money, escape).', 'Practice writing one PEEL paragraph for each theme using the "wet notes" evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
